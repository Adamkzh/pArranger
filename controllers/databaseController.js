// const db = require('monk')('localhost:27017/pArranger');
const db = require('monk')('mongodb://root:a00000@ds155596.mlab.com:55596/parranger');
const panelDB = db.get('panelDB');
const chartDB = db.get('chartDB');
const mongodb = require('mongodb');

var chargeCompare = [{"month":"JAN","solar":200,"average":590},{"month":"FEB","solar":400,"average":675},{"month":"MAR","solar":638,"average":874},{"month":"APR","solar":629,"average":900},{"month":"MAY","solar":688,"average":1065},{"month":"JUN","solar":977,"average":1602},{"month":"JUL","solar":1102,"average":1799},{"month":"AUG","solar":1206,"average":2300},{"month":"SEP","solar":1000,"average":1765},{"month":"OCT","solar":500,"average":1300},{"month":"NOV","solar":400,"average":896},{"month":"DEC","solar":300,"average":680}];
var dailyPowerGeneration = [{"date":"2019-3-1","SanJose":4000,"PaloAlto":6400,"Sunnyvale":2400},{"date":"2019-3-2","SanJose":3000,"PaloAlto":7398,"Sunnyvale":2210},{"date":"2019-3-3","SanJose":2000,"PaloAlto":6800,"Sunnyvale":2290},{"date":"2019-3-4","SanJose":2780,"PaloAlto":6908,"Sunnyvale":2000},{"date":"2019-3-5","SanJose":1890,"PaloAlto":6800,"Sunnyvale":2181},{"date":"2019-3-6","SanJose":2390,"PaloAlto":7800,"Sunnyvale":2500},{"date":"2019-3-7","SanJose":3490,"PaloAlto":5300,"Sunnyvale":2100}];
var differentPower = [{"year":"2014","HYDRO":259.367,"SOLAR":28.924,"BIOMASS":63.989,"WIND":181.655},{"year":"2015","HYDRO":249.08,"SOLAR":39.032,"BIOMASS":63.632,"WIND":190.719},{"year":"2016","HYDRO":267.812,"SOLAR":77.276,"BIOMASS":62.76,"WIND":226.993},{"year":"2017","HYDRO":300.333,"SOLAR":77.276,"BIOMASS":62.762,"WIND":254.303},{"year":"2018","HYDRO":291.724,"SOLAR":96.147,"BIOMASS":62.765,"WIND":274.952}];
var solarRadiance = [{"time":"5:00","GHI":200},{"time":"6:00","GHI":310},{"time":"7:00","GHI":320},{"time":"8:00","GHI":350},{"time":"9:00","GHI":410},{"time":"10:00","GHI":420},{"time":"11:00","GHI":510},{"time":"12:00","GHI":520},{"time":"13:00","GHI":527},{"time":"14:00","GHI":520},{"time":"15:00","GHI":510},{"time":"16:00","GHI":410},{"time":"17:00","GHI":370},{"time":"18:00","GHI":310},{"time":"19:00","GHI":200},{"time":"20:00","GHI":20},{"time":"21:00","GHI":0}];
var numberOfSolarPanels = [{"Month":"Oct 2018","SanJose":1000,"PaloAlto":2400,"Sunnyvale":2400},{"Month":"Nov 2018","SanJose":1200,"PaloAlto":2600,"Sunnyvale":2800},{"Month":"Dec 2018","SanJose":1300,"PaloAlto":2900,"Sunnyvale":3000},{"Month":"Jan 2019","SanJose":1350,"PaloAlto":3000,"MountainView":3000},{"Month":"Feb 2019","SanJose":1500,"PaloAlto":3400,"Sunnyvale":3200},{"Month":"Mar 2019","SanJose":1800,"PaloAlto":3600,"Sunnyvale":3400}];

let chartLookUp = { latestChartVersion: "1" };
let chartDefaultData = {
    ...chartLookUp,
    chartData: {
        chargeCompare: chargeCompare,
        dailyPowerGeneration: dailyPowerGeneration,
        differentPower: differentPower,
        solarRadiance: solarRadiance,
        numberOfSolarPanels: numberOfSolarPanels
    }
};

// Public functions
// All methods returns a promise
var exports = module.exports = {};
exports.getUsers = function(limit, oldToNew, updatedBefore, updatedAfter) {
    if (!limit) {
        limit = 20;
    }
    var sortOrder = oldToNew ? 1 : -1;

    if (!updatedBefore) {
        updatedBefore = new Date();
    }

    var updatedDateOption = null;
    if (updatedAfter) {
        updatedDateOption = { $lt: updatedBefore, $gt: updatedAfter };
    } else {
        updatedDateOption = { $lt: updatedBefore };
    }

    var getCount = panelDB.count({ updatedDate: updatedDateOption });
    var getDocs = panelDB.find({ updatedDate: updatedDateOption },
        { limit: limit, sort: { updatedDate: sortOrder} });
    const promises = [
        getCount,
        getDocs
    ];

    return Promise.all(promises)
        .then(function([count, docs]) {
            return {
                oldToNew: oldToNew ? true : false,
                limit: limit,
                count: count,
                updatedBefore: updatedBefore,
                updatedAfter: updatedAfter,
                data: docs
            };
    });
};

exports.searchUsers = function(keyword, limit, oldToNew) {
    if (!keyword) {
        return Promise.reject("Error: keyword is empty");
    }
    if (!limit) {
        limit = 5;
    }
    let sortOrder = oldToNew ? 1 : -1;
    let regx = new RegExp(keyword, 'i');

    return panelDB.find({ $or: [{_id: regx}, {username: regx}, {email: regx}, {address: regx}, {mountType: regx}]},
        { limit: limit, sort: { updatedDate: sortOrder} })
        .then(function(docs) {
            return {
                oldToNew: oldToNew ? true : false,
                limit: limit,
                searchTerm: keyword,
                data: docs
            }
        });
};

exports.getUserForKeyValuePair = function(keyValuePair) {
    if (!keyValuePair || Object.keys(keyValuePair).length == 0) {
        return Promise.reject("Please specify a key value pair (e.g. { email: \"abc@def.com\"})");
    }

    if (keyValuePair.mongoId || keyValuePair._id || keyValuePair.id) {
        var id = keyValuePair.mongoId ? keyValuePair.mongoId : keyValuePair._id;
        id = id ? id : keyValuePair.id;
        if (!mongodb.ObjectID.isValid(id)) {
            return Promise.reject("The mongoId/_id/id you specified is invalid in format, please refer to mongodb for more");
        }
        delete keyValuePair.mongoId;
        delete keyValuePair.id;
        keyValuePair._id = id;
    }

    if (keyValuePair.acPower) {
        let number = parseInt(keyValuePair.acPower);
        if (!number) {
            return Promise.reject("\"acPower\" should be an integer");
        }
        keyValuePair.acPower = number;
    }

    if (keyValuePair.watts) {
        let number = parseInt(keyValuePair.watts);
        if (!number) {
            return Promise.reject("\"watts\" should be an integer");
        }
        keyValuePair.watts = number;
    }

    return panelDB.findOne(keyValuePair, {});
};

exports.addUser = function(user) {
    if (!user) {
        return Promise.reject("Please specify a user");
    }
    if (!user.address || !user.location || !user.email || !user.username
        || !user.mountType || !user.mapImage || !user.watts || !user.acPower) {
        return Promise.reject("Please make sure User object includes " +
                "(address, location, email, username, mountType, mapImage, watts and acPower) fields");
    }
    if (!parseInt(user.watts) || !parseInt(user.acPower)) {
        return Promise.reject("Please make sure User.watts and User.acPower is a number");
    }
    if (!user.location.lat || !user.location.lon) {
        return Promise.reject("Please make sure \"location\" object includes " +
                "(lat and lon) fields");
    }
    user.username = user.username.toLowerCase();
    user.email = user.email.toLowerCase();
    const promises = [
        exports.getUserForKeyValuePair({ username: user.username }),
        exports.getUserForKeyValuePair({ email: user.email })
    ];
    return Promise.all(promises)
        .then(function([existingUsername, existingEmail]) {
            if (!existingUsername && !existingEmail) {
                return Promise.resolve();
            } else if (existingUsername) {
                return Promise.reject("Username already registered");
            } else {
                return Promise.reject("Email already registered");
            }
        })
        .then(function() {
            delete user._id;
            user.updatedDate = new Date();
            return panelDB.insert(user);
        })
};

exports.updateUser = function(mongoId, user) {
    if (!mongoId || !mongodb.ObjectID.isValid(mongoId)) {
        return Promise.reject("Please specify a valid mongoDB id (_id) for user");
    }
    if ((user.watts && !parseInt(user.watts)) || (user.acPower && !parseInt(user.acPower))) {
        return Promise.reject("Please make sure User.watts and User.acPower is a number");
    }
    if (user.location && (!user.location.lat || !user.location.lon)) {
        return Promise.reject("Please make sure \"location\" object includes " +
                "(lat and lon) fields");
    }
    delete user._id;

    var promises = [];
    if (user.username) {
        user.username.toLowerCase();
        promises.push(exports.getUserForKeyValuePair({ username: user.username }));
    } else {
        delete user.username;
    }
    if (user.email) {
        user.email.toLowerCase();
        promises.push(exports.getUserForKeyValuePair({ email: user.email }));
    } else {
        delete user.email;
    }

    if (!user || Object.keys(user).length == 0) {
        return Promise.reject("Please specify a field to update");
    }

    user.updatedDate = new Date();

    var allPromises = null;
    if (promises.length > 0) {
        allPromises = Promise.all(promises)
            .then(function(results) {
                if (!user.username && !user.email) {
                    return Promise.reject("Unknown promise was executed");
                }
                let arrayLength = results.length;
                for (var i = 0; i < arrayLength; i++) {
                    if (results[i] && results[i]._id.toString() !== mongoId) {
                        return Promise.reject("Username/email already registered");
                    }
                }
                return panelDB.findOneAndUpdate({_id: mongoId}, { "$set": user});
            });
    }
    if (!allPromises) {
        allPromises = panelDB.findOneAndUpdate({_id: mongoId}, { "$set": user});
    }
    
    return allPromises.then(function(updatedDoc) {
            if (!updatedDoc) {
                return Promise.reject("No user found under specified mongoId (_id)")
            }
            return Promise.resolve(updatedDoc);
        });
};

exports.removeUser = function(mongoId) {
    if (!mongoId || !mongodb.ObjectID.isValid(mongoId)) {
        return Promise.reject("Please specify a valid mongoDB id (_id)");
    }
    return panelDB.remove({ _id: mongoId})
        .then(function(result) {
            if (result.result.ok !== 1) {
                return Promise.reject(result.result);
            }
            if (result.result.n === 0) {
                return Promise.reject("No user found under specified mongoId (_id)");
            }
            return Promise.resolve("success");
        });
};

exports.getChartingDataFromDB = function () {
    let initialData = chartDefaultData;
    let checkDB = chartDB.findOne(chartLookUp)
        .then(function (doc) {
            if (doc && Object.keys(doc).length > 0) {
                return doc;
            }

            return chartDB.drop()
                .then(function () {
                    return chartDB.insert(initialData)
                        .then(function() {
                            return initialData;
                        });
                });
        });

    return checkDB
        .then(function (result) {
            return result.chartData;
        });
};
