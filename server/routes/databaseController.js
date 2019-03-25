const db = require('monk')('localhost:27017/pArranger');
const panelDB = db.get('panelDB');
const mongodb = require('mongodb');

// Public functions
// All methods returns a promise
var exports = module.exports = {};
exports.getUsersUpdatedBeforeDate = function(date, limit) {
    if (!limit) {
        limit = 20;
    }
    if (!date) {
        date = new Date();
    }
    return panelDB.find({ updatedDate: { $lt: date } },
        { limit: limit, sort: {updatedDate: -1} });
};

exports.getUsersUpdatedAfterDate = function(date, limit) {
    if (!limit) {
        limit = 20;
    }

    if (!date) {
        return panelDB.find({},
            { limit: limit, sort: {updatedDate: 1} });
    } else {
        return panelDB.find({ updatedDate: { $gt: date } },
            { limit: limit, sort: {updatedDate: 1} });
    }
};

exports.getUserForMongoId = function (mongoId) {
    if (!mongoId || !mongodb.ObjectID.isValid(mongoId)) {
        return new Promise(function(resolve, reject){
            reject("Please specify a mongoId (_id)");
        });
    }
    return exports.getUserForKeyValuePair({ _id: mongoId });
};

exports.getUserForUsername = function (username) {
    if (!username) {
        return new Promise(function(resolve, reject){
            reject("Please specify a username");
        });
    }
    return exports.getUserForKeyValuePair({ username: username });
};

exports.getUserForEmail = function (email) {
    if (!email) {
        return new Promise(function(resolve, reject){
            reject("Please specify a username");
        });
    }
    return exports.getUserForKeyValuePair({ email: email });
};

exports.getUserForKeyValuePair = function (keyValuePair) {
    if (!keyValuePair) {
        return new Promise(function(resolve, reject){
            reject("Please specify a key value pair (e.g. { email: \"abc@def.com\"})");
        });
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
    if (!user.location.lat || !user.location.lon) {
        return new Promise(function(resolve, reject){
            reject("Please make sure \"location\" object includes " +
                "(lat and lon) fields");
        });
    }
    const promises = [
        exports.getUserForUsername(user.username),
        exports.getUserForEmail(user.email),
        panelDB.findOne({}, { sort: {id:-1} ,fields: { id: 1 } })
    ];
    return Promise.all(promises)
        .then(function (values) {
            if (!values[0] && !values[1]) {
                return values[2];
            } else if (values[0]) {
                return Promise.reject("Username already registered");
            } else {
                return Promise.reject("Email already registered");
            }
        })
        .then(function (doc) {
            delete user._id;
            data.updatedDate = new Date();
            return panelDB.insert(user);
        })
};

exports.updateUser = function (mongoId, data) {
    if (!mongoId || !mongodb.ObjectID.isValid(mongoId)) {
        return new Promise(function(resolve, reject) {
            reject("Please specify a valid mongoDB id (_id)");
        });
    }
    if (!data || Object.keys(data).length == 0) {
        return new Promise(function(resolve, reject) {
            reject("Please specify a data to update");
        });
    }
    delete data._id;
    data.updatedDate = new Date();
    return panelDB.findOneAndUpdate({_id: mongoId}, { "$set": data});
};

exports.removeUser = function (mongoId) {
    if (!mongoId || !mongodb.ObjectID.isValid(mongoId)) {
        return new Promise(function(resolve, reject) {
            reject("Please specify a valid mongoDB id (_id)");
        });
    }
    return panelDB.remove({ _id: mongoId});
};
