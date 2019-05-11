var solcastController = require('../controllers/solcastController.js');
var dbController = require('../controllers/databaseController.js');

// All methods returns a promise
var exports = module.exports = {};
let sanJoseZipcodes = ["95101", "95110", "95111", "95112", "95113", "95116",
    "95117", "95118", "95119", "95120", "95121", "95122",
    "95123", "95124", "95125", "95126", "95127", "95128",
    "95129", "95130", "95131", "95132", "95133", "95134",
    "95135", "95136", "95138", "95139", "95140", "95141",
    "95148"];
let sunnyvaleZipcodes = ["94085", "94086", "94087", "94089"];
let paloAltoZipcodes = ["94301", "94303", "94304", "94305", "94306"];
let sanJoseTotalHH = 102300;
let paloAltoTotalHH = 67082;
let sunnyvaleTotalHH = 15156;
const electricityPriceSanJose = 0.45, electricityPriceSunnyvale = 0.47, electricityPricePaloAlto = 0.49;

let electricityConversionRateFromPannelCapacity = 0.35;


exports.getAllData = function () {
    return dbController.getUsers(999)
        .then(function (result) {
            if (!result.data) {
                return Promise.reject("Unable to find user data");
            }

            var sanJoseTotalSolarCapacity = 0.0;
            var paloAltoTotalSolarCapacity = 0.0;
            var sunnyvaleTotalSolarCapacity = 0.0;

            var sanJoseSolarCapacityAdded = 0.0;
            var paloAltoSolarCapacityAdded = 0.0;
            var sunnyvaleSolarCapacityAdded = 0.0;

            var sanJoseHouseholdAdded = 0.0;
            var paloAltoHouseholdAdded = 0.0;
            var sunnyvaleHouseholdAdded = 0.0;

            for (var i = 0; i < result.data.length; i++) {
                let user = result.data[i];
                if (!user.zipcode) {
                    continue;
                }
                if (!user.watts) {
                    continue;
                }
                if (!user.updatedDate) {
                    continue;
                }

                if (sanJoseZipcodes.includes(user.zipcode)) {
                    sanJoseTotalSolarCapacity += (user.watts / 1000.0);
                    if (numDaysBetween(new Date(), user.updatedDate) <= 30) {
                        sanJoseSolarCapacityAdded += (user.watts / 1000.0);
                        sanJoseHouseholdAdded += 1;
                    }
                } else if (paloAltoZipcodes.includes(user.zipcode)) {
                    paloAltoTotalSolarCapacity += (user.watts / 1000.0);
                    if (numDaysBetween(new Date(), user.updatedDate) <= 30) {
                        paloAltoSolarCapacityAdded += (user.watts / 1000.0);
                        paloAltoHouseholdAdded += 1;
                    }
                } else if (sunnyvaleZipcodes.includes(user.zipcode)) {
                    sunnyvaleTotalSolarCapacity += (user.watts / 1000.0);
                    if (numDaysBetween(new Date(), user.updatedDate) <= 30) {
                        sunnyvaleSolarCapacityAdded += (user.watts / 1000.0);
                        sunnyvaleHouseholdAdded += 1;
                    }
                }
            }

            let totalSolarCapacity = makeBarChartObject(
                sanJoseTotalSolarCapacity,
                paloAltoTotalSolarCapacity,
                sunnyvaleTotalSolarCapacity
            );

            return {
                citiesDetailData: getGrowthOfSolarCapacity(result.data)
            };
        });

};


function getGrowthOfSolarCapacity(data) {
    var sanJoseMonthlyAddedCapacity = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };
    var paloAltoMonthlyAddedCapacity = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };
    var sunnyvaleMonthlyAddedCapacity = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };

    var sanJoseMonthlyAddedHH = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };
    var paloAltoMonthlyAddedHH = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };
    var sunnyvaleMonthlyAddedHH = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };

    for (let i = 0; i < data.length; i++) {
        let user = data[i];
        if (!user.zipcode) {
            continue;
        }
        if (!user.watts) {
            continue;
        }
        if (!user.updatedDate) {
            continue;
        }

        if (sanJoseZipcodes.includes(user.zipcode)) {
            let monthKey = getKeyWithMonth(user.updatedDate);
            if (!monthKey) {
                continue;
            }
            sanJoseMonthlyAddedCapacity[monthKey] += user.watts;
            sanJoseMonthlyAddedHH[monthKey]++;

        } else if (paloAltoZipcodes.includes(user.zipcode)) {
            let monthKey = getKeyWithMonth(user.updatedDate);
            if (!monthKey) {
                continue;
            }
            paloAltoMonthlyAddedCapacity[monthKey] += user.watts;
            paloAltoMonthlyAddedHH[monthKey]++;
        } else if (sunnyvaleZipcodes.includes(user.zipcode)) {
            let monthKey = getKeyWithMonth(user.updatedDate);
            if (!monthKey) {
                continue;
            }
            sunnyvaleMonthlyAddedCapacity[monthKey] += user.watts;
            sunnyvaleMonthlyAddedHH[monthKey]++;
        }
    }


    let allCitiesAverageMonthlyCapacity = getAllCitiesAverageMonthlyCapacity(sanJoseMonthlyAddedCapacity, paloAltoMonthlyAddedCapacity, sunnyvaleMonthlyAddedCapacity);
    let monthlySolarCapacityJsonObject = formJsonObject(sanJoseMonthlyAddedCapacity, paloAltoMonthlyAddedCapacity, sunnyvaleMonthlyAddedCapacity, allCitiesAverageMonthlyCapacity);

    let monthlySolarCapacityPerHH = getAllCitiesAverageMonthlyCapacityPerHH(sanJoseMonthlyAddedCapacity, paloAltoMonthlyAddedCapacity, sunnyvaleMonthlyAddedCapacity, sanJoseMonthlyAddedHH, paloAltoMonthlyAddedHH, sunnyvaleMonthlyAddedHH);
    let monthlySolarCapacityPerHHJsonObject = formJsonObject(
            monthlySolarCapacityPerHH.sanJoseMonthlyAddedCapacityPerHH,
            monthlySolarCapacityPerHH.paloaltoMonthlyAddedCapacityPerHH,
            monthlySolarCapacityPerHH.sunnyvalueMonthlyAddedCapacityPerHH,
            monthlySolarCapacityPerHH.allCitiesMonthlyAddedCapacityPerHH
    );

    /**
     *
     * @type {{sanJoseMonthlyAddedCapacityCumulative, sunnyvalueMonthlyAddedCapacityCumulative, paloaltoMonthlyAddedCapacityCumulative, allCitiesMonthlyAddedCapacityCumulative, allCitiesMonthlyAddedHHCumulative, paloaltoMonthlyAddedHHCumulative, sanJoseMonthlyAddedHHCumulative, sunnyvaleMonthlyAddedHHCumulative}}
     */
    let x = getAllCitiesMonthlyCumulativeCapacityandHH(sanJoseMonthlyAddedCapacity, paloAltoMonthlyAddedCapacity, sunnyvaleMonthlyAddedCapacity, sanJoseMonthlyAddedHH, paloAltoMonthlyAddedHH, sunnyvaleMonthlyAddedHH);

    /**
     * @type {{sunnyvaleMonthlyElectricityGenerated: {apr19: number, feb19: number, dec18: number, mar19: number, jan19: number, nov18: number},
     * sanJoseMonthlyElectricityGenerated: {apr19: number, feb19: number, dec18: number, mar19: number, jan19: number, nov18: number},
     * allCitiesAvgMonthlyElectricityGenerated: {apr19: number, feb19: number, dec18: number, mar19: number, jan19: number, nov18: number},
     * paloaltoMonthlyElectricityGenerated: {apr19: number, feb19: number, dec18: number, mar19: number, jan19: number, nov18: number}}}
     */
    let y = getElecGeneratedMonthlyAndPerHH(x);
    let elecGeneratedMonthlyCompareToAllCitesAvgJsonObj = formJsonObject(y.sanJoseMonthlyElectricityGenerated, y.paloaltoMonthlyElectricityGenerated, y.sunnyvaleMonthlyElectricityGenerated, y.allCitiesAvgMonthlyElectricityGenerated);
    let elecGeneratedMonthlyPerHHCompareToAllCitesAvgJsonObj = formJsonObject(y.sanJoseMonthlyElectricityGeneratedPerHH, y.paloaltoMonthlyElectricityGeneratedPerHH, y.sunnyvaleMonthlyElectricityGeneratedPerHH, y.allCitiesAvgMonthlyElectricityGeneratedPerHH);

    let moneySavedPerHHMonthly = getMoneySavedMonthlyPerHH(y);

    let moneySavedPerHHMonthlyJsonObj = formJsonObject(moneySavedPerHHMonthly.sanJoseMonthlyElectricityBillSavingsPerHH,
        moneySavedPerHHMonthly.paloaltoMonthlyElectricityBillSavingsPerHH,
        moneySavedPerHHMonthly.sunnyvaleMonthlyElectricityBillSavingsPerHH,
        moneySavedPerHHMonthly.allCitiesAvgMonthlyElectricityBillSavingsPerHH);


    let sanJoseHHInstalled = x.sanJoseMonthlyAddedHHCumulative['apr19'];
    let sunnyvaleHHInstalled = x.sunnyvaleMonthlyAddedHHCumulative['apr19'];
    let paloaltoHHInstalled = x.paloaltoMonthlyAddedHHCumulative['apr19'];


    const totalElectAndMoneySavedYTDSanJose = getYTDElectricityGeneratedTotalAndMoneySavedTotal(y.sanJoseMonthlyElectricityGenerated, electricityPriceSanJose);
    const totalElectAndMoneySavedYTDSunnyvale = getYTDElectricityGeneratedTotalAndMoneySavedTotal(y.sunnyvaleMonthlyElectricityGenerated, electricityPriceSunnyvale);
    const totalElectAndMoneySavedYTDPaloAlto = getYTDElectricityGeneratedTotalAndMoneySavedTotal(y.paloaltoMonthlyElectricityGenerated, electricityPricePaloAlto);

    const elecLast6Days = getElectricityLast6Days(x.sanJoseMonthlyAddedCapacityCumulative['apr19'], x.sunnyvalueMonthlyAddedCapacityCumulative['apr19'], x.paloaltoMonthlyAddedCapacityCumulative['apr19']);

    return {
        SanJose: {
            numberOfSolarPanelsHistorySingleCity_data: monthlySolarCapacityJsonObject.sanjose,
            numberOfSolarPanelsPerHHSingleCity: monthlySolarCapacityPerHHJsonObject.sanjose,
            electricityGeneratedMonthlyCompareToCitiesAvgSingleCity: elecGeneratedMonthlyCompareToAllCitesAvgJsonObj.sanjose,
            totalElectricityGeneratedPerHHMonthly: elecGeneratedMonthlyPerHHCompareToAllCitesAvgJsonObj.sanjose,
            moneySavedMonthlyCompareToCitiesAvgSingleCity: moneySavedPerHHMonthlyJsonObj.sanjose,
            dailyPowerGenerationByCity: elecLast6Days.sanjose,
            totalHHInstalled: sanJoseHHInstalled,
            totalHHNotInstalled: sanJoseTotalHH - sanJoseHHInstalled,
            totalElectricityGeneratedYTD: totalElectAndMoneySavedYTDSanJose.totalElecYTD,
            totalMoneySavedYTD: totalElectAndMoneySavedYTDSanJose.totalMoneySavedYTD,
        },
        Sunnyvale: {
            numberOfSolarPanelsHistorySingleCity_data: monthlySolarCapacityJsonObject.sunnyvale,
            numberOfSolarPanelsPerHHSingleCity: monthlySolarCapacityPerHHJsonObject.sunnyvale,
            electricityGeneratedMonthlyCompareToCitiesAvgSingleCity: elecGeneratedMonthlyCompareToAllCitesAvgJsonObj.sunnyvale,
            totalElectricityGeneratedPerHHMonthly: elecGeneratedMonthlyPerHHCompareToAllCitesAvgJsonObj.sunnyvale,
            moneySavedMonthlyCompareToCitiesAvgSingleCity: moneySavedPerHHMonthlyJsonObj.sunnyvale,
            dailyPowerGenerationByCity: elecLast6Days.sunnyvale,
            totalHHInstalled: sunnyvaleHHInstalled,
            totalHHNotInstalled: sunnyvaleTotalHH - sunnyvaleHHInstalled,
            totalElectricityGeneratedYTD: totalElectAndMoneySavedYTDSunnyvale.totalElecYTD,
            totalMoneySavedYTD: totalElectAndMoneySavedYTDSunnyvale.totalMoneySavedYTD,
        },
        PaloAlto: {
            numberOfSolarPanelsHistorySingleCity_data: monthlySolarCapacityJsonObject.paloalto,
            numberOfSolarPanelsPerHHSingleCity: monthlySolarCapacityPerHHJsonObject.sunnyvale,
            electricityGeneratedMonthlyCompareToCitiesAvgSingleCity: elecGeneratedMonthlyCompareToAllCitesAvgJsonObj.paloalto,
            totalElectricityGeneratedPerHHMonthly: elecGeneratedMonthlyPerHHCompareToAllCitesAvgJsonObj.paloalto,
            moneySavedMonthlyCompareToCitiesAvgSingleCity: moneySavedPerHHMonthlyJsonObj.paloalto,
            dailyPowerGenerationByCity: elecLast6Days.paloalto,
            totalHHInstalled: paloaltoHHInstalled,
            totalHHNotInstalled: paloAltoTotalHH - paloaltoHHInstalled,
            totalElectricityGeneratedYTD: totalElectAndMoneySavedYTDPaloAlto.totalElecYTD,
            totalMoneySavedYTD: totalElectAndMoneySavedYTDPaloAlto.totalMoneySavedYTD,
        }
    };

}

function getYTDElectricityGeneratedTotalAndMoneySavedTotal(monthlyElectricityGenerated, rate) {
    let totalElecYTD = 0, totalMoneySavedYTD = 0;
    const keys = Object.keys(monthlyElectricityGenerated);
    for (let i = 0; i < keys.length; i++) {
        const curKey = keys[i];
        if (curKey.indexOf('19') !== -1) {
            totalElecYTD += monthlyElectricityGenerated[curKey];
        }
    }
    return {
        totalElecYTD: Math.floor(totalElecYTD),
        totalMoneySavedYTD: Math.floor(totalElecYTD * rate)
    }
}

// {"date":"2019-3-1","PaloAlto":50,"AllCitiesAverage":50},
function getElectricityLast6Days(sanjoseCapacity, sunnyvaleCapacity, paloaltoCapacity) {
    const oneDayInMiliseconds = 1000 * 60 * 60 * 24;
    let today = new Date();

    let ElecGeneratedLast6DaysSanJose = [], ElecGeneratedLast6DaysSunnyvale = [], ElecGeneratedLast6DaysPaloAlto = [];
    let conversionRateInLast6Days = [0.9, 0.8, 0.9, 0.5, 0.5, 0.9];

    for (let i = 0; i < 6; i++) {
        let curDate = new Date(today - oneDayInMiliseconds * i);
        const sanJoseSingleDay = {'date': curDate.toISOString().substr(0, 10),
            'SanJose': Math.floor(sanjoseCapacity * electricityConversionRateFromPannelCapacity * conversionRateInLast6Days[i]),
            'AllCitiesAverage': Math.floor((sanjoseCapacity + sunnyvaleCapacity + paloaltoCapacity) / 3 * electricityConversionRateFromPannelCapacity * conversionRateInLast6Days[i])};
        ElecGeneratedLast6DaysSanJose.push(sanJoseSingleDay);

        const sunnyvaleSingleDay = {'date': curDate.toISOString().substr(0, 10),
            'Sunnyvale': Math.floor(sunnyvaleCapacity * electricityConversionRateFromPannelCapacity * conversionRateInLast6Days[i]),
            'AllCitiesAverage': Math.floor((sanjoseCapacity + sunnyvaleCapacity + paloaltoCapacity) / 3 * electricityConversionRateFromPannelCapacity * conversionRateInLast6Days[i])};
        ElecGeneratedLast6DaysSunnyvale.push(sunnyvaleSingleDay);

        const paloaltoSingleDay = {'date': curDate.toISOString().substr(0, 10),
            'PaloAlto': Math.floor(paloaltoCapacity * electricityConversionRateFromPannelCapacity * conversionRateInLast6Days[i]),
            'AllCitiesAverage': Math.floor((sanjoseCapacity + sunnyvaleCapacity + paloaltoCapacity) / 3 * electricityConversionRateFromPannelCapacity * conversionRateInLast6Days[i])};
        ElecGeneratedLast6DaysPaloAlto.push(paloaltoSingleDay);
    }
    return {sanjose: ElecGeneratedLast6DaysSanJose, sunnyvale: ElecGeneratedLast6DaysSunnyvale, paloalto: ElecGeneratedLast6DaysPaloAlto};

}


function getAllCitiesAverageMonthlyCapacity(sanJoseMonthlyAddedCapacity, paloAltoMonthlyAddedCapacity, sunnyvaleMonthlyAddedCapacity) {
    let allCitiesMonthlyAddedCapacity = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };
    const keys = Object.keys(sanJoseMonthlyAddedCapacity);
    for (let i = 0; i < keys.length; i++) {
        if (paloAltoMonthlyAddedCapacity.hasOwnProperty(keys[i]) && sunnyvaleMonthlyAddedCapacity.hasOwnProperty(keys[i])) {
            let sum = sanJoseMonthlyAddedCapacity[keys[i]] + sunnyvaleMonthlyAddedCapacity[keys[i]] + paloAltoMonthlyAddedCapacity[keys[i]];
            allCitiesMonthlyAddedCapacity[keys[i]] = Math.floor(sum / 3.0);
        }
    }
    return allCitiesMonthlyAddedCapacity;
}



function getAllCitiesMonthlyCumulativeCapacityandHH(sanJoseMonthlyAddedCapacity, paloAltoMonthlyAddedCapacity, sunnyvaleMonthlyAddedCapacity, sanJoseMonthlyAddedHH, paloAltoMonthlyAddedHH, sunnyvaleMonthlyAddedHH) {
    let sanJoseMonthlyAddedCapacityCumulative = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };
    let sunnyvalueMonthlyAddedCapacityCumulative = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };
    let paloaltoMonthlyAddedCapacityCumulative = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };
    let allCitiesMonthlyAddedCapacityCumulative = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };


    let sanJoseMonthlyAddedHHCumulative = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };
    let sunnyvaleMonthlyAddedHHCumulative = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };
    let paloaltoMonthlyAddedHHCumulative = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };
    let allCitiesMonthlyAddedHHCumulative = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };

    const keys = ['nov18', 'dec18', 'jan19', 'feb19', 'mar19', 'apr19'];
    const firstKey = 'nov18';

    sanJoseMonthlyAddedCapacityCumulative[firstKey] = sanJoseMonthlyAddedCapacity[firstKey];
    sunnyvalueMonthlyAddedCapacityCumulative[firstKey] = sunnyvaleMonthlyAddedCapacity[firstKey];
    paloaltoMonthlyAddedCapacityCumulative[firstKey] = paloAltoMonthlyAddedCapacity[firstKey];
    allCitiesMonthlyAddedCapacityCumulative[firstKey] = sanJoseMonthlyAddedCapacity[firstKey] + sunnyvaleMonthlyAddedCapacity[firstKey] + paloAltoMonthlyAddedCapacity[firstKey];

    for (let i = 1; i < keys.length; i++) {
        if (paloAltoMonthlyAddedCapacity.hasOwnProperty(keys[i]) && sunnyvaleMonthlyAddedCapacity.hasOwnProperty(keys[i]) && sanJoseMonthlyAddedCapacity.hasOwnProperty(keys[i])) {
            sanJoseMonthlyAddedCapacityCumulative[keys[i]] = sanJoseMonthlyAddedCapacityCumulative[keys[i - 1]] + sanJoseMonthlyAddedCapacity[keys[i]];
            sunnyvalueMonthlyAddedCapacityCumulative[keys[i]] = sunnyvalueMonthlyAddedCapacityCumulative[keys[i - 1]] + sunnyvaleMonthlyAddedCapacity[keys[i]];
            paloaltoMonthlyAddedCapacityCumulative[keys[i]] = paloaltoMonthlyAddedCapacityCumulative[keys[i - 1]] + paloAltoMonthlyAddedCapacity[keys[i]];
            allCitiesMonthlyAddedCapacityCumulative[keys[i]] = allCitiesMonthlyAddedCapacityCumulative[keys[i - 1]] +
                sanJoseMonthlyAddedCapacity[keys[i]] + sunnyvaleMonthlyAddedCapacity[keys[i]] + paloAltoMonthlyAddedCapacity[keys[i]];
        }
    }


    sanJoseMonthlyAddedHHCumulative[firstKey] = sanJoseMonthlyAddedHH[firstKey];
    sunnyvaleMonthlyAddedHHCumulative[firstKey] = sunnyvaleMonthlyAddedHH[firstKey];
    paloaltoMonthlyAddedHHCumulative[firstKey] = paloAltoMonthlyAddedHH[firstKey];
    allCitiesMonthlyAddedHHCumulative[firstKey] = sanJoseMonthlyAddedHH[firstKey] + sunnyvaleMonthlyAddedHH[firstKey] + paloAltoMonthlyAddedHH[firstKey];

    for (let i = 1; i < keys.length; i++) {
        if (sanJoseMonthlyAddedHH.hasOwnProperty(keys[i]) && sunnyvaleMonthlyAddedHH.hasOwnProperty(keys[i]) && paloAltoMonthlyAddedHH.hasOwnProperty(keys[i])) {
            sanJoseMonthlyAddedHHCumulative[keys[i]] = sanJoseMonthlyAddedHHCumulative[keys[i - 1]] + sanJoseMonthlyAddedHH[keys[i]];
            sunnyvaleMonthlyAddedHHCumulative[keys[i]] = sunnyvaleMonthlyAddedHHCumulative[keys[i - 1]] + sunnyvaleMonthlyAddedHH[keys[i]];
            paloaltoMonthlyAddedHHCumulative[keys[i]] = paloaltoMonthlyAddedHHCumulative[keys[i - 1]] + paloAltoMonthlyAddedHH[keys[i]];
            allCitiesMonthlyAddedHHCumulative[keys[i]] = sanJoseMonthlyAddedHHCumulative[keys[i]] + sunnyvaleMonthlyAddedHHCumulative[keys[i]] + paloaltoMonthlyAddedHHCumulative[keys[i]];
        }
    }

    return {sanJoseMonthlyAddedCapacityCumulative: sanJoseMonthlyAddedCapacityCumulative,
        sunnyvalueMonthlyAddedCapacityCumulative: sunnyvalueMonthlyAddedCapacityCumulative,
        paloaltoMonthlyAddedCapacityCumulative: paloaltoMonthlyAddedCapacityCumulative,
        allCitiesMonthlyAddedCapacityCumulative: allCitiesMonthlyAddedCapacityCumulative,
        sanJoseMonthlyAddedHHCumulative: sanJoseMonthlyAddedHHCumulative,
        sunnyvaleMonthlyAddedHHCumulative: sunnyvaleMonthlyAddedHHCumulative,
        paloaltoMonthlyAddedHHCumulative: paloaltoMonthlyAddedHHCumulative,
        allCitiesMonthlyAddedHHCumulative: allCitiesMonthlyAddedHHCumulative
    }
}

/**
 *
 * @param data
 * @returns {{sunnyvaleMonthlyElectricityGenerated: {apr19: number, feb19: number, dec18: number, mar19: number, jan19: number, nov18: number},
 * sanJoseMonthlyElectricityGenerated: {apr19: number, feb19: number, dec18: number, mar19: number, jan19: number, nov18: number},
 * paloaltoMonthlyElectricityGeneratedPerHH: {apr19: number, feb19: number, dec18: number, mar19: number, jan19: number, nov18: number},
 * allCitiesAvgMonthlyElectricityGenerated: {apr19: number, feb19: number, dec18: number, mar19: number, jan19: number, nov18: number},
 * sunnyvaleMonthlyElectricityGeneratedPerHH: {apr19: number, feb19: number, dec18: number, mar19: number, jan19: number, nov18: number},
 * allCitiesAvgMonthlyElectricityGeneratedPerHH: {apr19: number, feb19: number, dec18: number, mar19: number, jan19: number, nov18: number},
 * paloaltoMonthlyElectricityGenerated: {apr19: number, feb19: number, dec18: number, mar19: number, jan19: number, nov18: number},
 * sanJoseMonthlyElectricityGeneratedPerHH: {apr19: number, feb19: number, dec18: number, mar19: number, jan19: number, nov18: number}}}
 */
function getElecGeneratedMonthlyAndPerHH(data) {
    // solarConversionRateFromCapacity
    let keys = Object.keys(data.sanJoseMonthlyAddedCapacityCumulative);
    // Calculate Electricity Generated Monthly for each city
    let sanJoseMonthlyElectricityGenerated = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };
    let sunnyvaleMonthlyElectricityGenerated = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };
    let paloaltoMonthlyElectricityGenerated = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };
    let allCitiesAvgMonthlyElectricityGenerated = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };

    for (let i = 0; i < keys.length; i++) {
        sanJoseMonthlyElectricityGenerated[keys[i]] = Math.floor(data.sanJoseMonthlyAddedCapacityCumulative[keys[i]] * electricityConversionRateFromPannelCapacity);
        sunnyvaleMonthlyElectricityGenerated[keys[i]] = Math.floor(data.sunnyvalueMonthlyAddedCapacityCumulative[keys[i]] * electricityConversionRateFromPannelCapacity);
        paloaltoMonthlyElectricityGenerated[keys[i]] = Math.floor(data.paloaltoMonthlyAddedCapacityCumulative[keys[i]] * electricityConversionRateFromPannelCapacity);
        allCitiesAvgMonthlyElectricityGenerated[keys[i]] = Math.floor(data.allCitiesMonthlyAddedCapacityCumulative[keys[i]] * electricityConversionRateFromPannelCapacity / 3.0);
    }


    // Calculate Electricity Generated Monthly Per HH for each city
    let sanJoseMonthlyElectricityGeneratedPerHH = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };
    let sunnyvaleMonthlyElectricityGeneratedPerHH = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };
    let paloaltoMonthlyElectricityGeneratedPerHH = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };
    let allCitiesAvgMonthlyElectricityGeneratedPerHH = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };

    for (let i = 0; i < keys.length; i++) {
        sanJoseMonthlyElectricityGeneratedPerHH[keys[i]] = Math.floor((data.sanJoseMonthlyAddedCapacityCumulative[keys[i]] / data.sanJoseMonthlyAddedHHCumulative[keys[i]]) * electricityConversionRateFromPannelCapacity);
        sunnyvaleMonthlyElectricityGeneratedPerHH[keys[i]] = Math.floor(data.sunnyvalueMonthlyAddedCapacityCumulative[keys[i]] * electricityConversionRateFromPannelCapacity / data.sunnyvaleMonthlyAddedHHCumulative[keys[i]]);
        paloaltoMonthlyElectricityGeneratedPerHH[keys[i]] = Math.floor(data.paloaltoMonthlyAddedCapacityCumulative[keys[i]] * electricityConversionRateFromPannelCapacity / data.paloaltoMonthlyAddedHHCumulative[keys[i]]);
        allCitiesAvgMonthlyElectricityGeneratedPerHH[keys[i]] = Math.floor(data.allCitiesMonthlyAddedCapacityCumulative[keys[i]] * electricityConversionRateFromPannelCapacity / data.allCitiesMonthlyAddedHHCumulative[keys[i]]);
    }

    return {
        sanJoseMonthlyElectricityGenerated: sanJoseMonthlyElectricityGenerated,
        sunnyvaleMonthlyElectricityGenerated: sunnyvaleMonthlyElectricityGenerated,
        paloaltoMonthlyElectricityGenerated: paloaltoMonthlyElectricityGenerated,
        allCitiesAvgMonthlyElectricityGenerated: allCitiesAvgMonthlyElectricityGenerated,
        sanJoseMonthlyElectricityGeneratedPerHH: sanJoseMonthlyElectricityGeneratedPerHH,
        sunnyvaleMonthlyElectricityGeneratedPerHH: sunnyvaleMonthlyElectricityGeneratedPerHH,
        paloaltoMonthlyElectricityGeneratedPerHH: paloaltoMonthlyElectricityGeneratedPerHH,
        allCitiesAvgMonthlyElectricityGeneratedPerHH: allCitiesAvgMonthlyElectricityGeneratedPerHH
    }
}


function getMoneySavedMonthlyPerHH(data) {
    // solarConversionRateFromCapacity
    let keys = Object.keys(data.sanJoseMonthlyElectricityGeneratedPerHH);
    // Calculate Electricity Generated Monthly for each city
    let sanJoseMonthlyElectricityBillSavingsPerHH = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };
    let sunnyvaleMonthlyElectricityBillSavingsPerHH = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };
    let paloaltoMonthlyElectricityBillSavingsPerHH = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };
    let allCitiesAvgMonthlyElectricityBillSavingsPerHH = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };

    for (let i = 0; i < keys.length; i++) {
        sanJoseMonthlyElectricityBillSavingsPerHH[keys[i]] = Math.floor(data.sanJoseMonthlyElectricityGeneratedPerHH[keys[i]] * electricityPriceSanJose);
        sunnyvaleMonthlyElectricityBillSavingsPerHH[keys[i]] = Math.floor(data.sunnyvaleMonthlyElectricityGeneratedPerHH[keys[i]] * electricityPriceSunnyvale);
        paloaltoMonthlyElectricityBillSavingsPerHH[keys[i]] = Math.floor(data.paloaltoMonthlyElectricityGeneratedPerHH[keys[i]] * electricityPricePaloAlto);
        allCitiesAvgMonthlyElectricityBillSavingsPerHH[keys[i]] = Math.floor(sanJoseMonthlyElectricityBillSavingsPerHH[keys[i]] + sunnyvaleMonthlyElectricityBillSavingsPerHH[keys[i]] + paloaltoMonthlyElectricityBillSavingsPerHH[keys[i]] / 3.0);
    }

    return {
        sanJoseMonthlyElectricityBillSavingsPerHH: sanJoseMonthlyElectricityBillSavingsPerHH,
        sunnyvaleMonthlyElectricityBillSavingsPerHH: sunnyvaleMonthlyElectricityBillSavingsPerHH,
        paloaltoMonthlyElectricityBillSavingsPerHH: paloaltoMonthlyElectricityBillSavingsPerHH,
        allCitiesAvgMonthlyElectricityBillSavingsPerHH: allCitiesAvgMonthlyElectricityBillSavingsPerHH,
    }
}



function getElecGeneratedMonthlyPerHH(data) {
    // solarConversionRateFromCapacity
    let keys = Object.keys(data.sanJoseMonthlyAddedCapacityCumulative);
    let sanJoseMonthlyElectricityGenerated = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };
    let sunnyvaleMonthlyElectricityGenerated = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };
    let paloaltoMonthlyElectricityGenerated = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };
    let allCitiesAvgMonthlyElectricityGenerated = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };

    for (let i = 0; i < keys.length; i++) {
        sanJoseMonthlyElectricityGenerated[keys[i]] = Math.floor(data.sanJoseMonthlyAddedCapacityCumulative[keys[i]] * electricityConversionRateFromPannelCapacity);
        sunnyvaleMonthlyElectricityGenerated[keys[i]] = Math.floor(data.sunnyvalueMonthlyAddedCapacityCumulative[keys[i]] * electricityConversionRateFromPannelCapacity);
        paloaltoMonthlyElectricityGenerated[keys[i]] = Math.floor(data.paloaltoMonthlyAddedCapacityCumulative[keys[i]] * electricityConversionRateFromPannelCapacity);
        allCitiesAvgMonthlyElectricityGenerated[keys[i]] = Math.floor(data.allCitiesMonthlyAddedCapacityCumulative[keys[i]] * electricityConversionRateFromPannelCapacity);
    }
    return {
        sanJoseMonthlyElectricityGenerated: sanJoseMonthlyElectricityGenerated,
        sunnyvaleMonthlyElectricityGenerated: sunnyvaleMonthlyElectricityGenerated,
        paloaltoMonthlyElectricityGenerated: paloaltoMonthlyElectricityGenerated,
        allCitiesAvgMonthlyElectricityGenerated: allCitiesAvgMonthlyElectricityGenerated
    }
}

/**
 *
 * @param sanJoseMonthlyAddedCapacity
 * @param paloAltoMonthlyAddedCapacity
 * @param sunnyvaleMonthlyAddedCapacity
 * @param sanJoseMonthlyAddedHH
 * @param paloAltoMonthlyAddedHH
 * @param sunnyvaleMonthlyAddedHH
 * @returns {{allCitiesMonthlyAddedCapacityPerHH: {apr19: number, feb19: number, dec18: number, mar19: number, jan19: number, nov18: number}, sanJoseMonthlyAddedCapacityPerHH: {apr19: number, feb19: number, dec18: number, mar19: number, jan19: number, nov18: number}, sunnyvalueMonthlyAddedCapacityPerHH: {apr19: number, feb19: number, dec18: number, mar19: number, jan19: number, nov18: number}, paloaltoMonthlyAddedCapacityPerHH: {apr19: number, feb19: number, dec18: number, mar19: number, jan19: number, nov18: number}}}
 */
function getAllCitiesAverageMonthlyCapacityPerHH(sanJoseMonthlyAddedCapacity, paloAltoMonthlyAddedCapacity, sunnyvaleMonthlyAddedCapacity, sanJoseMonthlyAddedHH, paloAltoMonthlyAddedHH, sunnyvaleMonthlyAddedHH) {
    let sanJoseMonthlyAddedCapacityPerHH = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };
    let sunnyvalueMonthlyAddedCapacityPerHH = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };
    let paloaltoMonthlyAddedCapacityPerHH = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };
    let allCitiesMonthlyAddedCapacityPerHH = { nov18: 0, dec18: 0, jan19: 0, feb19: 0, mar19: 0, apr19: 0 };

    const keys = Object.keys(sanJoseMonthlyAddedCapacity);
    for (let i = 0; i < keys.length; i++) {
        if (paloAltoMonthlyAddedCapacity.hasOwnProperty(keys[i]) && sunnyvaleMonthlyAddedCapacity.hasOwnProperty(keys[i])) {
            let monthlyAddedCapacitySum = sanJoseMonthlyAddedCapacity[keys[i]] + sunnyvaleMonthlyAddedCapacity[keys[i]] + paloAltoMonthlyAddedCapacity[keys[i]];
            let monthlyAddedHHSum = sanJoseMonthlyAddedHH[keys[i]] + sunnyvaleMonthlyAddedHH[keys[i]] + paloAltoMonthlyAddedHH[keys[i]];
            allCitiesMonthlyAddedCapacityPerHH[keys[i]] = Math.floor(monthlyAddedCapacitySum / (1.0 * monthlyAddedHHSum));
            sanJoseMonthlyAddedCapacityPerHH[keys[i]] = Math.floor(sanJoseMonthlyAddedCapacity[keys[i]] / sanJoseMonthlyAddedHH[keys[i]]);
            sunnyvalueMonthlyAddedCapacityPerHH[keys[i]] = Math.floor(sunnyvaleMonthlyAddedCapacity[keys[i]] / sunnyvaleMonthlyAddedHH[keys[i]]);
            paloaltoMonthlyAddedCapacityPerHH[keys[i]] = Math.floor(paloAltoMonthlyAddedCapacity[keys[i]] / paloAltoMonthlyAddedHH[keys[i]]);
        }
    }


    return {sanJoseMonthlyAddedCapacityPerHH: sanJoseMonthlyAddedCapacityPerHH,
        sunnyvalueMonthlyAddedCapacityPerHH: sunnyvalueMonthlyAddedCapacityPerHH,
        paloaltoMonthlyAddedCapacityPerHH: paloaltoMonthlyAddedCapacityPerHH,
        allCitiesMonthlyAddedCapacityPerHH: allCitiesMonthlyAddedCapacityPerHH
    }
}



    function formJsonObject(sanJoseMonthlyAddedCapacity, paloAltoMonthlyAddedCapacity, sunnyvaleMonthlyAddedCapacity, allCitiesMonthlyAddedCapacity) {
        let sanJose = [], paloalto = [], sunnyvale = [];
        let keys = Object.keys(sanJoseMonthlyAddedCapacity);
        for (let i = 0; i < keys.length; i++) {
            let tmp = {"Month": keys[i], "SanJose": sanJoseMonthlyAddedCapacity[keys[i]], "AllCitiesAverage": allCitiesMonthlyAddedCapacity[keys[i]]};
            sanJose.push(tmp);
        }

        keys = Object.keys(paloAltoMonthlyAddedCapacity);
        for (let i = 0; i < keys.length; i++) {
            let tmp = {"Month": keys[i], "PaloAlto": paloAltoMonthlyAddedCapacity[keys[i]], "AllCitiesAverage": allCitiesMonthlyAddedCapacity[keys[i]]};
            paloalto.push(tmp);
        }

        keys = Object.keys(sunnyvaleMonthlyAddedCapacity);
        for (let i = 0; i < keys.length; i++) {
            let tmp = {"Month": keys[i], "Sunnyvale": sunnyvaleMonthlyAddedCapacity[keys[i]], "AllCitiesAverage": allCitiesMonthlyAddedCapacity[keys[i]]};
            sunnyvale.push(tmp);
        }
        return {
            sanjose: sanJose,
            paloalto: paloalto,
            sunnyvale: sunnyvale
        }
    }



function makeBarChartObject(sanJoseValue, paloAltoValue, sunnyvaleValue) {
    return [{
        "label": "San Jose",
        "value": Math.round(sanJoseValue)
    },{
        "label": "Palo Alto",
        "value": Math.round(paloAltoValue)
    },{
        "label": "Sunnyvale",
        "value": Math.round(sunnyvaleValue)
    }]
}

function make6MonthLineChartObject(sanJoseValue, paloAltoValue, sunnyvaleValue) {
    return [{
        "label": "Nov 2018",
        "San Jose": sanJoseValue.nov18,
        "Palo Alto": paloAltoValue.nov18,
        "Sunnyvale": sunnyvaleValue.nov18
    },{
        "label": "Dec 2018",
        "San Jose": sanJoseValue.dec18,
        "Palo Alto": paloAltoValue.dec18,
        "Sunnyvale": sunnyvaleValue.dec18
    },{
        "label": "Jan 2019",
        "San Jose": sanJoseValue.jan19,
        "Palo Alto": paloAltoValue.jan19,
        "Sunnyvale": sunnyvaleValue.jan19
    },{
        "label": "Feb 2019",
        "San Jose": sanJoseValue.feb19,
        "Palo Alto": paloAltoValue.feb19,
        "Sunnyvale": sunnyvaleValue.feb19
    },{
        "label": "Mar 2019",
        "San Jose": sanJoseValue.mar19,
        "Palo Alto": paloAltoValue.mar19,
        "Sunnyvale": sunnyvaleValue.mar19
    },{
        "label": "Apr 2019",
        "San Jose": sanJoseValue.apr19,
        "Palo Alto": paloAltoValue.apr19,
        "Sunnyvale": sunnyvaleValue.apr19
    }];
}

function getKeyWithMonth(date) {
    let monthKey;
    switch (date.getMonth()) {
        case 10:
            monthKey = 'nov18';
            break;
        case 11:
            monthKey = 'dec18';
            break;
        case 0:
            monthKey = 'jan19';
            break;
        case 1:
            monthKey = 'feb19';
            break;
        case 2:
            monthKey = 'mar19';
            break;
        case 3:
            monthKey = 'apr19';
            break;
    }
    return monthKey;
}



function numDaysBetween(d1, d2) {
    var diff = Math.abs(d1.getTime() - d2.getTime());
    return diff / (1000 * 60 * 60 * 24);
}

