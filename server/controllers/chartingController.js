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
let sanJosePopulation = 1023031;
let paloAltoPopulation = 67082;
let sunnyvalePopulation = 151565;
let sanJoseSize = 177.51;
let paloAltoSize = 23.86;
let sunnyvaleSize = 21.98;

let solarConversionRate = 0.35;

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
                    let monthKey = getKeyWithMonth(user.updatedDate);
                    if (!monthKey) {
                        continue;
                    }
                    sanJoseMonthlyAddedCapacity[monthKey] += user.watts;
                } else if (paloAltoZipcodes.includes(user.zipcode)) {
                    paloAltoTotalSolarCapacity += (user.watts / 1000.0);
                    if (numDaysBetween(new Date(), user.updatedDate) <= 30) {
                        paloAltoSolarCapacityAdded += (user.watts / 1000.0);
                        paloAltoHouseholdAdded += 1;
                    }
                    let monthKey = getKeyWithMonth(user.updatedDate);
                    if (!monthKey) {
                        continue;
                    }
                    paloAltoMonthlyAddedCapacity[monthKey] += user.watts;
                } else if (sunnyvaleZipcodes.includes(user.zipcode)) {
                    sunnyvaleTotalSolarCapacity += (user.watts / 1000.0);
                    if (numDaysBetween(new Date(), user.updatedDate) <= 30) {
                        sunnyvaleSolarCapacityAdded += (user.watts / 1000.0);
                        sunnyvaleHouseholdAdded += 1;
                    }
                    let monthKey = getKeyWithMonth(user.updatedDate);
                    if (!monthKey) {
                        continue;
                    }
                    sunnyvaleMonthlyAddedCapacity[monthKey] += user.watts;
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
            let growthOfSolarCapacity = make6MonthLineChartObject(
                getGrowthRateFromAddedCapacity(sanJoseMonthlyAddedCapacity),
                getGrowthRateFromAddedCapacity(paloAltoMonthlyAddedCapacity),
                getGrowthRateFromAddedCapacity(sunnyvaleMonthlyAddedCapacity)
            )
            return {
                totalSolarCapacity: totalSolarCapacity,
                solarCapacityPerCapita: solarCapacityPerCapita,
                solarCapacityPerSurfaceArea: solarCapacityPerSurfaceArea,
                solarCapacityAddedIn30Days: solarCapacityAddedIn30Days,
                electricityGeneratedBySolarLast30Days: electricityGeneratedBySolarLast30Days,
                solarHouseholdAddedLast30Days: solarHouseholdAddedLast30Days,
                growthOfSolarCapacity: growthOfSolarCapacity,
                newInstallationIncentivesVsCost: newInstallationIncentivesVsCost
            };
        });

};


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

var numDaysBetween = function(d1, d2) {
    var diff = Math.abs(d1.getTime() - d2.getTime());
    return diff / (1000 * 60 * 60 * 24);
};