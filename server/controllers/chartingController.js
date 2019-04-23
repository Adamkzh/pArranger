var solcastController = require('../controllers/solcastController.js');
var dbController = require('../controllers/databaseController.js');

// All methods returns a promise
var exports = module.exports = {};


exports.getChartingData = function() {
    return dbController.getChartingDataFromDB();
};
