var solcastController = require('./solcastController.js');
var dbController = require('./databaseController.js');

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
let sanJosePopulation = 1023031;
let paloAltoPopulation = 67082;
let sunnyvalePopulation = 151565;
let sanJoseSize = 177.51;
let paloAltoSize = 23.86;
let sunnyvaleSize = 21.98;

let solarConversionRate = 0.35;

exports.getChartingData = function() {
    return dbController.getChartingDataFromDB();
};


exports.getSummaryChartingData = function () {
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
            let solarCapacityPerCapita = makeBarChartObject(
                sanJoseTotalSolarCapacity * 1000 / sanJosePopulation,
                paloAltoTotalSolarCapacity * 1000 / paloAltoPopulation,
                sunnyvaleTotalSolarCapacity * 1000 / sunnyvalePopulation
            );
            let solarCapacityPerSurfaceArea = makeBarChartObject(
                sanJoseTotalSolarCapacity / sanJoseSize,
                paloAltoTotalSolarCapacity / paloAltoSize,
                sunnyvaleTotalSolarCapacity / sunnyvaleSize
            );
            let solarCapacityAddedIn30Days = makeBarChartObject(
                sanJoseSolarCapacityAdded,
                paloAltoSolarCapacityAdded,
                sunnyvaleSolarCapacityAdded
            );
            let electricityGeneratedBySolarLast30Days = makeBarChartObject(
                (sanJoseTotalSolarCapacity * solarConversionRate * 720) / 1000,
                (paloAltoTotalSolarCapacity * solarConversionRate * 720) / 1000,
                (sunnyvaleTotalSolarCapacity * solarConversionRate * 720) / 1000
            );
            let solarHouseholdAddedLast30Days = makeBarChartObject(
                sanJoseHouseholdAdded,
                paloAltoHouseholdAdded,
                sunnyvaleHouseholdAdded
            );
            return {
                totalSolarCapacity: totalSolarCapacity,
                solarCapacityPerCapita: solarCapacityPerCapita,
                solarCapacityPerSurfaceArea: solarCapacityPerSurfaceArea,
                solarCapacityAddedIn30Days: solarCapacityAddedIn30Days,
                electricityGeneratedBySolarLast30Days: electricityGeneratedBySolarLast30Days,
                solarHouseholdAddedLast30Days: solarHouseholdAddedLast30Days,
                growthOfSolarCapacity: getGrowthOfSolarCapacity(result.data),
                newInstallationIncentivesVsCost: newInstallationIncentivesVsCost
            };
        });

};

exports.getEffectAndImpactChartingData = function () {
    return dbController.getUsers(999)
        .then(function (result) {
            if (!result.data) {
                return Promise.reject("Unable to find user data");
            }

            var sanJoseTotalSolarCapacity = 0.0;
            var paloAltoTotalSolarCapacity = 0.0;
            var sunnyvaleTotalSolarCapacity = 0.0;

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
                } else if (paloAltoZipcodes.includes(user.zipcode)) {
                    paloAltoTotalSolarCapacity += (user.watts / 1000.0);
                } else if (sunnyvaleZipcodes.includes(user.zipcode)) {
                    sunnyvaleTotalSolarCapacity += (user.watts / 1000.0);
                }
            }

            var solarElectricityGeneratedHourly = [];
            for (var i = 0; i < solarEnergyConversionRate.length; i++) {
                var entry = {...solarEnergyConversionRate[i]};
                entry["San Jose"] = Math.round(entry["San Jose"] * sanJoseTotalSolarCapacity / 14) / 100;
                entry["Palo Alto"] = Math.round(entry["Palo Alto"] * paloAltoTotalSolarCapacity / 14) / 100;
                entry["Sunnyvale"] = Math.round(entry["Sunnyvale"] * sunnyvaleTotalSolarCapacity / 14) / 100;
                solarElectricityGeneratedHourly.push(entry);
            }


            return {
                growthOfSolarCapacity: getGrowthOfSolarCapacity(result.data),
                solarIncentiveSpending: solarIncentiveSpending,
                solarEnergyConversionRate: solarEnergyConversionRate,
                solarElectricityGeneratedHourly: solarElectricityGeneratedHourly,
                hourlyAllElectricLoad: hourlyAllElectricLoad,
                averageBillSavings: averageBillSavings
            };
        });

};


function getGrowthOfSolarCapacity(data) {
    var sanJoseMonthlyAddedCapacity = {
        nov18: 0,
        dec18: 0,
        jan19: 0,
        feb19: 0,
        mar19: 0,
        apr19: 0
    };
    var paloAltoMonthlyAddedCapacity = {
        nov18: 0,
        dec18: 0,
        jan19: 0,
        feb19: 0,
        mar19: 0,
        apr19: 0
    };
    var sunnyvaleMonthlyAddedCapacity = {
        nov18: 0,
        dec18: 0,
        jan19: 0,
        feb19: 0,
        mar19: 0,
        apr19: 0
    };

    for (var i = 0; i < data.length; i++) {
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
        } else if (paloAltoZipcodes.includes(user.zipcode)) {
            let monthKey = getKeyWithMonth(user.updatedDate);
            if (!monthKey) {
                continue;
            }
            paloAltoMonthlyAddedCapacity[monthKey] += user.watts;
        } else if (sunnyvaleZipcodes.includes(user.zipcode)) {
            let monthKey = getKeyWithMonth(user.updatedDate);
            if (!monthKey) {
                continue;
            }
            sunnyvaleMonthlyAddedCapacity[monthKey] += user.watts;
        }
    }

    let growthOfSolarCapacity = make6MonthLineChartObject(
        getGrowthRateFromAddedCapacity(sanJoseMonthlyAddedCapacity),
        getGrowthRateFromAddedCapacity(paloAltoMonthlyAddedCapacity),
        getGrowthRateFromAddedCapacity(sunnyvaleMonthlyAddedCapacity)
    );
    return growthOfSolarCapacity;
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

function getGrowthRateFromAddedCapacity(data) {
    let dec18Rate = Math.round(getGrowthRate(data.dec18, data.nov18) * 10000) / 100;
    let nov18Rate = dec18Rate;
    let jan19Rate = Math.round(getGrowthRate(data.jan19, data.dec18) * 10000) / 100;
    let feb19Rate = Math.round(getGrowthRate(data.feb19, data.jan19) * 10000) / 100;
    let mar19Rate = Math.round(getGrowthRate(data.mar19, data.feb19) * 10000) / 100;
    let apr19Rate = Math.round(getGrowthRate(data.apr19, data.mar19) * 10000) / 100;
    return {
        nov18: nov18Rate,
        dec18: dec18Rate,
        jan19: jan19Rate,
        feb19: feb19Rate,
        mar19: mar19Rate,
        apr19: apr19Rate
    };
}

function getGrowthRate(present, past) {
    if (!past) {
        return 0;
    }
    if (past === 0) {
        return 0;
    }
    return (present - past) / past;
}

function numDaysBetween(d1, d2) {
    var diff = Math.abs(d1.getTime() - d2.getTime());
    return diff / (1000 * 60 * 60 * 24);
}

let solarIncentiveSpending = [{
    "label": "San Jose",
    "(Dark) Claimed Incentives": 4800,
    "(Light) Remaining Budget": 12000
},{
    "label": "Palo Alto",
    "(Dark) Claimed Incentives": 6600,
    "(Light) Remaining Budget": 7500
},{
    "label": "Sunnyvale",
    "(Dark) Claimed Incentives": 3400,
    "(Light) Remaining Budget": 10000
}];

let newInstallationIncentivesVsCost = [{
    "label": "Nov 2018",
    "San Jose": "3000",
    "Palo Alto": "3000",
    "Sunnyvale": "3000",
    "Average Installation Cost": "25000"
},{
    "label": "Dec 2018",
    "San Jose": "3000",
    "Palo Alto": "3000",
    "Sunnyvale": "3000",
    "Average Installation Cost": "24500"
},{
    "label": "Jan 2019",
    "San Jose": "3000",
    "Palo Alto": "3000",
    "Sunnyvale": "3000",
    "Average Installation Cost": "23000"
},{
    "label": "Feb 2019",
    "San Jose": "8000",
    "Palo Alto": "10000",
    "Sunnyvale": "4000",
    "Average Installation Cost": "22500"
},{
    "label": "Mar 2019",
    "San Jose": "8000",
    "Palo Alto": "10000",
    "Sunnyvale": "4000",
    "Average Installation Cost": "29000"
},{
    "label": "Apr 2019",
    "San Jose": "8000",
    "Palo Alto": "10000",
    "Sunnyvale": "4000",
    "Average Installation Cost": "24500"
}];

let solarEnergyConversionRate = [{
    "label": "12am",
    "San Jose": "0",
    "Palo Alto": "0",
    "Sunnyvale": "0"
},{
    "label": "1am",
    "San Jose": "0",
    "Palo Alto": "0",
    "Sunnyvale": "0"
},{
    "label": "2am",
    "San Jose": "0",
    "Palo Alto": "0",
    "Sunnyvale": "0"
},{
    "label": "3am",
    "San Jose": "0",
    "Palo Alto": "0",
    "Sunnyvale": "0"
},{
    "label": "4am",
    "San Jose": "0",
    "Palo Alto": "0",
    "Sunnyvale": "0"
},{
    "label": "5am",
    "San Jose": "0",
    "Palo Alto": "0",
    "Sunnyvale": "0"
},{
    "label": "6am",
    "San Jose": "0",
    "Palo Alto": "0",
    "Sunnyvale": "0"
},{
    "label": "7am",
    "San Jose": 1.46,
    "Palo Alto": 1.45,
    "Sunnyvale": 1.56
},{
    "label": "8am",
    "San Jose": 15.54,
    "Palo Alto": 14.35,
    "Sunnyvale": 15.89
},{
    "label": "9am",
    "San Jose": 34.6,
    "Palo Alto": 32.35,
    "Sunnyvale": 35.19
},{
    "label": "10am",
    "San Jose": 56.91,
    "Palo Alto": 56.19,
    "Sunnyvale": 55.05
},{
    "label": "11am",
    "San Jose": 71.9,
    "Palo Alto": 71.8,
    "Sunnyvale": 71.65
},{
    "label": "12pm",
    "San Jose": 80.69,
    "Palo Alto": 80.92,
    "Sunnyvale": 80.69
},{
    "label": "1pm",
    "San Jose": 84.28,
    "Palo Alto": 85.6,
    "Sunnyvale": 83.42
},{
    "label": "2pm",
    "San Jose": 78.97,
    "Palo Alto": 84.49,
    "Sunnyvale": 82.14
},{
    "label": "3pm",
    "San Jose": 71.81,
    "Palo Alto": 78.75,
    "Sunnyvale": 64.77
},{
    "label": "4pm",
    "San Jose": 69.8,
    "Palo Alto": 67.67,
    "Sunnyvale": 64.17
},{
    "label": "5pm",
    "San Jose": 51.36,
    "Palo Alto": 51.47,
    "Sunnyvale": 51.02
},{
    "label": "6pm",
    "San Jose": 30.62,
    "Palo Alto": 30.9,
    "Sunnyvale": 30.35
},{
    "label": "7pm",
    "San Jose": 9.49,
    "Palo Alto": 9.56,
    "Sunnyvale": 9.38
},{
    "label": "8pm",
    "San Jose": 0.46,
    "Palo Alto": 0.55,
    "Sunnyvale": 0.45
},{
    "label": "9pm",
    "San Jose": "0",
    "Palo Alto": "0",
    "Sunnyvale": "0"
},{
    "label": "10pm",
    "San Jose": "0",
    "Palo Alto": "0",
    "Sunnyvale": "0"
},{
    "label": "11pm",
    "San Jose": "0",
    "Palo Alto": "0",
    "Sunnyvale": "0"
},{
    "label": "12am",
    "San Jose": "0",
    "Palo Alto": "0",
    "Sunnyvale": "0"
}];

let hourlyAllElectricLoad = [
    {
        "label": "12am",
        "San Jose": 175,
        "Palo Alto": 145.25,
        "Sunnyvale": 155.75
    },
    {
        "label": "1am",
        "San Jose": 165,
        "Palo Alto": 153.45,
        "Sunnyvale": 151.8
    },
    {
        "label": "2am",
        "San Jose": 160,
        "Palo Alto": 148.8,
        "Sunnyvale": 150.4
    },
    {
        "label": "3am",
        "San Jose": 155,
        "Palo Alto": 127.1,
        "Sunnyvale": 134.85
    },
    {
        "label": "4am",
        "San Jose": 160,
        "Palo Alto": 132.8,
        "Sunnyvale": 147.2
    },
    {
        "label": "5am",
        "San Jose": 175,
        "Palo Alto": 154,
        "Sunnyvale": 162.75
    },
    {
        "label": "6am",
        "San Jose": 200,
        "Palo Alto": 188,
        "Sunnyvale": 174
    },
    {
        "label": "7am",
        "San Jose": 190,
        "Palo Alto": 193,
        "Sunnyvale": 194.1
    },
    {
        "label": "8am",
        "San Jose": 160,
        "Palo Alto": 180.8,
        "Sunnyvale": 172.8
    },
    {
        "label": "9am",
        "San Jose": 145,
        "Palo Alto": 158.05,
        "Sunnyvale": 159.5
    },
    {
        "label": "10am",
        "San Jose": 120,
        "Palo Alto": 138,
        "Sunnyvale": 141.6
    },
    {
        "label": "11am",
        "San Jose": 105,
        "Palo Alto": 124.95,
        "Sunnyvale": 118.65
    },
    {
        "label": "12pm",
        "San Jose": 103,
        "Palo Alto": 123.6,
        "Sunnyvale": 109.18
    },
    {
        "label": "1pm",
        "San Jose": 100,
        "Palo Alto": 110,
        "Sunnyvale": 119
    },
    {
        "label": "2pm",
        "San Jose": 103,
        "Palo Alto": 123.6,
        "Sunnyvale": 121.54
    },
    {
        "label": "3pm",
        "San Jose": 125,
        "Palo Alto": 138.75,
        "Sunnyvale": 136.25
    },
    {
        "label": "4pm",
        "San Jose": 137.5,
        "Palo Alto": 145.75,
        "Sunnyvale": 158.125
    },
    {
        "label": "5pm",
        "San Jose": 153,
        "Palo Alto": 168.3,
        "Sunnyvale": 171.36
    },
    {
        "label": "6pm",
        "San Jose": 200,
        "Palo Alto": 176,
        "Sunnyvale": 170
    },
    {
        "label": "7pm",
        "San Jose": 225,
        "Palo Alto": 184.5,
        "Sunnyvale": 200.25
    },
    {
        "label": "8pm",
        "San Jose": 230,
        "Palo Alto": 209.3,
        "Sunnyvale": 211.6
    },
    {
        "label": "9pm",
        "San Jose": 225,
        "Palo Alto": 191.25,
        "Sunnyvale": 198
    },
    {
        "label": "10pm",
        "San Jose": 205,
        "Palo Alto": 176.3,
        "Sunnyvale": 192.7
    },
    {
        "label": "11pm",
        "San Jose": 190,
        "Palo Alto": 163.4,
        "Sunnyvale": 178.6
    },
    {
        "label": "12am",
        "San Jose": 175,
        "Palo Alto": 145.25,
        "Sunnyvale": 162.75
    }
];

let averageBillSavings = [{
    "label": "Nov 2018",
    "San Jose": "87",
    "Palo Alto": "85",
    "Sunnyvale": "89"
},{
    "label": "Dec 2018",
    "San Jose": "90",
    "Palo Alto": "90",
    "Sunnyvale": "91"
},{
    "label": "Jan 2019",
    "San Jose": "90",
    "Palo Alto": "95",
    "Sunnyvale": "85"
},{
    "label": "Feb 2019",
    "San Jose": "99",
    "Palo Alto": "93",
    "Sunnyvale": "97"
},{
    "label": "Mar 2019",
    "San Jose": "100",
    "Palo Alto": "96",
    "Sunnyvale": "98"
},{
    "label": "Apr 2019",
    "San Jose": "100",
    "Palo Alto": "110",
    "Sunnyvale": "105"
}];
