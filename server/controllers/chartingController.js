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
                    }
                } else if (paloAltoZipcodes.includes(user.zipcode)) {
                    paloAltoTotalSolarCapacity += (user.watts / 1000.0);
                    if (numDaysBetween(new Date(), user.updatedDate) <= 30) {
                        paloAltoSolarCapacityAdded += (user.watts / 1000.0);
                    }
                } else if (sunnyvaleZipcodes.includes(user.zipcode)) {
                    sunnyvaleTotalSolarCapacity += (user.watts / 1000.0);
                    if (numDaysBetween(new Date(), user.updatedDate) <= 30) {
                        sunnyvaleSolarCapacityAdded += (user.watts / 1000.0);
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
            return {
                totalSolarCapacity: totalSolarCapacity,
                solarCapacityPerCapita: solarCapacityPerCapita,
                solarCapacityPerSurfaceArea: solarCapacityPerSurfaceArea,
                solarCapacityAddedIn30Days: solarCapacityAddedIn30Days
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

var numDaysBetween = function(d1, d2) {
    var diff = Math.abs(d1.getTime() - d2.getTime());
    return diff / (1000 * 60 * 60 * 24);
};