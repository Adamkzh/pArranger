var solcastController = require('../controllers/solcastController.js');

// All methods returns a promise
var exports = module.exports = {};

var chargeCompare = [{"month":"JAN","solar":500,"average":590},{"month":"FEB","solar":600,"average":675},{"month":"MAR","solar":738,"average":874},{"month":"APR","solar":829,"average":900},{"month":"MAY","solar":988,"average":1065},{"month":"JUN","solar":1002,"average":1102},{"month":"JUL","solar":1102,"average":1199},{"month":"AUG","solar":1206,"average":1300},{"month":"SEP","solar":1000,"average":1065},{"month":"OCT","solar":800,"average":967},{"month":"NOV","solar":754,"average":896},{"month":"DEC","solar":588,"average":680}];
var dailyPowerGeneration = [{"date":"2019-3-1","SanJose":4000,"PaloAlto":2400,"Sunnyvale":2400},{"date":"2019-3-2","SanJose":3000,"PaloAlto":1398,"Sunnyvale":2210},{"date":"2019-3-3","SanJose":2000,"PaloAlto":9800,"Sunnyvale":2290},{"date":"2019-3-4","SanJose":2780,"PaloAlto":3908,"Sunnyvale":2000},{"date":"2019-3-5","SanJose":1890,"PaloAlto":4800,"Sunnyvale":2181},{"date":"2019-3-6","SanJose":2390,"PaloAlto":3800,"Sunnyvale":2500},{"date":"2019-3-7","SanJose":3490,"PaloAlto":4300,"Sunnyvale":2100}];
var simpleBarChart = [{"Month":"Oct 2018","SanJose":1000,"SantaClara":2400,"MountainView":2400},{"Month":"Nov 2018","SanJose":1200,"SantaClara":2600,"MountainView":2800},{"Month":"Dec 2018","SanJose":1300,"SantaClara":2900,"MountainView":3000},{"Month":"Jan 2019","SanJose":1350,"SantaClara":3000,"MountainView":3000},{"Month":"Feb 2019","SanJose":1500,"SantaClara":3400,"MountainView":3200},{"Month":"Mar 2019","SanJose":1800,"SantaClara":3600,"MountainView":3400}];
var solarRadiance = [{"time":"12:00","GHI":200},{"time":"13:00","GHI":310},{"time":"14:00","GHI":410},{"time":"15:00","GHI":510},{"time":"16:00","GHI":310},{"time":"17:00","GHI":710},{"time":"18:00","GHI":810}];
var stackedBarChart = [{"year":"2014","HYDRO":259.367,"SOLAR":28.924,"BIOMASS":63.989,"WIND":181.655},{"year":"2015","HYDRO":249.08,"SOLAR":39.032,"BIOMASS":63.632,"WIND":190.719},{"year":"2016","HYDRO":267.812,"SOLAR":77.276,"BIOMASS":62.76,"WIND":226.993},{"year":"2017","HYDRO":300.333,"SOLAR":77.276,"BIOMASS":62.762,"WIND":254.303},{"year":"2018","HYDRO":291.724,"SOLAR":96.147,"BIOMASS":62.765,"WIND":274.952}];


exports.getChatringData = function() {
    let result = {
        chargeCompare: chargeCompare,
        dailyPowerGeneration: dailyPowerGeneration,
        simpleBarChart: simpleBarChart,
        solarRadiance: solarRadiance,
        stackedBarChart: stackedBarChart
    };
    // TODO - Add in real data
    // solcastController

    return Promise.resolve(result);
};
