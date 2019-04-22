var solcastController = require('../controllers/solcastController.js');

// All methods returns a promise
var exports = module.exports = {};

var chargeCompare = [{"month":"JAN","solar":200,"average":590},{"month":"FEB","solar":400,"average":675},{"month":"MAR","solar":638,"average":874},{"month":"APR","solar":629,"average":900},{"month":"MAY","solar":688,"average":1065},{"month":"JUN","solar":977,"average":1602},{"month":"JUL","solar":1102,"average":1799},{"month":"AUG","solar":1206,"average":2300},{"month":"SEP","solar":1000,"average":1765},{"month":"OCT","solar":500,"average":1300},{"month":"NOV","solar":400,"average":896},{"month":"DEC","solar":300,"average":680}];
var dailyPowerGeneration = [{"date":"2019-3-1","SanJose":4000,"PaloAlto":6400,"Sunnyvale":2400},{"date":"2019-3-2","SanJose":3000,"PaloAlto":7398,"Sunnyvale":2210},{"date":"2019-3-3","SanJose":2000,"PaloAlto":6800,"Sunnyvale":2290},{"date":"2019-3-4","SanJose":2780,"PaloAlto":6908,"Sunnyvale":2000},{"date":"2019-3-5","SanJose":1890,"PaloAlto":6800,"Sunnyvale":2181},{"date":"2019-3-6","SanJose":2390,"PaloAlto":7800,"Sunnyvale":2500},{"date":"2019-3-7","SanJose":3490,"PaloAlto":5300,"Sunnyvale":2100}];
var differentPower = [{"year":"2014","HYDRO":259.367,"SOLAR":28.924,"BIOMASS":63.989,"WIND":181.655},{"year":"2015","HYDRO":249.08,"SOLAR":39.032,"BIOMASS":63.632,"WIND":190.719},{"year":"2016","HYDRO":267.812,"SOLAR":77.276,"BIOMASS":62.76,"WIND":226.993},{"year":"2017","HYDRO":300.333,"SOLAR":77.276,"BIOMASS":62.762,"WIND":254.303},{"year":"2018","HYDRO":291.724,"SOLAR":96.147,"BIOMASS":62.765,"WIND":274.952}];
var solarRadiance = [{"time":"5:00","GHI":200},{"time":"6:00","GHI":310},{"time":"7:00","GHI":320},{"time":"8:00","GHI":350},{"time":"9:00","GHI":410},{"time":"10:00","GHI":420},{"time":"11:00","GHI":510},{"time":"12:00","GHI":520},{"time":"13:00","GHI":527},{"time":"14:00","GHI":520},{"time":"15:00","GHI":510},{"time":"16:00","GHI":410},{"time":"17:00","GHI":370},{"time":"18:00","GHI":310},{"time":"19:00","GHI":200},{"time":"20:00","GHI":20},{"time":"21:00","GHI":0}];
var numberOfSolarPanels = [{"Month":"Oct 2018","SanJose":1000,"SantaClara":2400,"MountainView":2400},{"Month":"Nov 2018","SanJose":1200,"SantaClara":2600,"MountainView":2800},{"Month":"Dec 2018","SanJose":1300,"SantaClara":2900,"MountainView":3000},{"Month":"Jan 2019","SanJose":1350,"SantaClara":3000,"MountainView":3000},{"Month":"Feb 2019","SanJose":1500,"SantaClara":3400,"MountainView":3200},{"Month":"Mar 2019","SanJose":1800,"SantaClara":3600,"MountainView":3400}];

exports.getChatringData = function() {
    let result = {
        chargeCompare: chargeCompare,
        dailyPowerGeneration: dailyPowerGeneration,
        differentPower: differentPower,
        solarRadiance: solarRadiance,
        numberOfSolarPanels: numberOfSolarPanels
    };
    // TODO - Add in real data
    // solcastController

    return Promise.resolve(result);
};
