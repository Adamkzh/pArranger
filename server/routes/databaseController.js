const db = require('monk')('localhost:27017/pArranger');
const panelDB = db.get('panelDB');
const mongodb = require('mongodb');

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

exports.getUserForKeyValuePair = function (keyValuePair) {
    if (!keyValuePair || Object.keys(keyValuePair).length == 0) {
        return new Promise(function(resolve, reject){
            reject("Please specify a key value pair (e.g. { email: \"abc@def.com\"})");
        });
    }

    if (keyValuePair.mongoId || keyValuePair._id || keyValuePair.id) {
        var id = keyValuePair.mongoId ? keyValuePair.mongoId : keyValuePair._id;
        id = id ? id : keyValuePair.id;
        if (!mongodb.ObjectID.isValid(id)) {
            return new Promise(function(resolve, reject){
                reject("The mongoId/_id/id you specified is invalid in format, please refer to mongodb for more");
            });
        }
        delete keyValuePair.mongoId;
        delete keyValuePair.id;
        keyValuePair._id = id;
    }

    if (keyValuePair.acPower) {
        let number = parseInt(keyValuePair.acPower);
        if (!number) {
            return new Promise(function(resolve, reject){
                reject("\"acPower\" should be an integer");
            });
        }
        keyValuePair.acPower = number;
    }

    if (keyValuePair.watts) {
        let number = parseInt(keyValuePair.watts);
        if (!number) {
            return new Promise(function(resolve, reject){
                reject("\"watts\" should be an integer");
            });
        }
        keyValuePair.watts = number;
    }

    return panelDB.findOne(keyValuePair, {});
};

exports.addUser = function (user) {
    if (!user) {
        return new Promise(function(resolve, reject){
            reject("Please specify a user");
        });
    }
    if (!user.address || !user.location || !user.email || !user.username
        || !user.mountType || !user.mapImage || !user.watts || !user.acPower) {
        return new Promise(function(resolve, reject){
            reject("Please make sure User object includes " +
                "(address, location, email, username, mountType, mapImage, watts and acPower) fields");
        });
    }
    if (!parseInt(user.watts) || !parseInt(user.acPower)) {
        return new Promise(function(resolve, reject){
            reject("Please make sure User.watts and User.acPower is a number");
        });
    }
    if (!user.location.lat || !user.location.lon) {
        return new Promise(function(resolve, reject){
            reject("Please make sure \"location\" object includes " +
                "(lat and lon) fields");
        });
    }
    const promises = [
        exports.getUserForKeyValuePair({ username: user.username }),
        exports.getUserForKeyValuePair({ email: user.email })
    ];
    return Promise.all(promises)
        .then(function ([existingUsername, existingEmail]) {
            if (!existingUsername && !existingEmail) {
                return Promise.resolve();
            } else if (existingUsername) {
                return Promise.reject("Username already registered");
            } else {
                return Promise.reject("Email already registered");
            }
        })
        .then(function () {
            delete user._id;
            user.updatedDate = new Date();
            return panelDB.insert(user);
        })
};

exports.updateUser = function (mongoId, user) {
    if (!mongoId || !mongodb.ObjectID.isValid(mongoId)) {
        return new Promise(function(resolve, reject) {
            reject("Please specify a valid mongoDB id (_id) for user");
        });
    }
    if ((user.watts && !parseInt(user.watts)) || (user.acPower && !parseInt(user.acPower))) {
        return new Promise(function(resolve, reject){
            reject("Please make sure User.watts and User.acPower is a number");
        });
    }
    if (user.location && (!user.location.lat || !user.location.lon)) {
        return new Promise(function(resolve, reject){
            reject("Please make sure \"location\" object includes " +
                "(lat and lon) fields");
        });
    }
    delete user._id;

    var promises = [];
    if (user.username) {
        promises.push(exports.getUserForKeyValuePair({ username: user.username }));
    } else {
        delete user.username;
    }
    if (user.email) {
        promises.push(exports.getUserForKeyValuePair({ email: user.email }));
    } else {
        delete user.email;
    }

    if (!user || Object.keys(user).length == 0) {
        return new Promise(function(resolve, reject) {
            reject("Please specify a field to update");
        });
    }

    user.updatedDate = new Date();

    var allPromises = null;
    if (promises.length > 0) {
        allPromises = Promise.all(promises)
            .then(function (results) {
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
    
    return allPromises.then(function (updatedDoc) {
            if (!updatedDoc) {
                return Promise.reject("No user found under specified mongoId (_id)")
            }
            return Promise.resolve(updatedDoc);
        });
};

exports.removeUser = function (mongoId) {
    if (!mongoId || !mongodb.ObjectID.isValid(mongoId)) {
        return new Promise(function(resolve, reject) {
            reject("Please specify a valid mongoDB id (_id)");
        });
    }
    return panelDB.remove({ _id: mongoId})
        .then(function (result) {
            if (result.result.ok !== 1) {
                return Promise.reject(result.result);
            }
            if (result.result.n === 0) {
                return Promise.reject("No user found under specified mongoId (_id)");
            }
            return Promise.resolve("success");
        });
};
