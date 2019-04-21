var rp = require('request-promise');

// All methods returns a promise
var exports = module.exports = {};

let baseURL = "https://api.solcast.com.au/";
let apiKey = "cD18YD7J15mKr9PXKzC56NIP_-uUNiNT";

let cityCoordinateMapping = {
    "SAN_JOSE": {"lat": 37.368386, "lon": -121.927544},
    "SUNNYVALE": {"lat": 37.376666, "lon": -122.028602},
    "PALO_ALTO": {"lat": 37.435871, "lon": -122.132429},
};

exports.getSolarPvPower = function(city, capacity) {
    let coordinate = coordinateForCity(city);
    if (!coordinate) {
        return Promise.reject("Invalid city name, please use a valid city");
    }
    if (!capacity || isNaN(capacity) || capacity < 0) {
        return Promise.reject("Invalid capacity, please use a number in watts");
    }
    var getHistory = {
        method: "GET",
        uri: baseURL + "pv_power/estimated_actuals",
        qs: {
            latitude: coordinate.lat,
            longitude: coordinate.lon,
            api_key: apiKey,
            format: "json",
            capacity: capacity
        },
        json: true
    };

    var getFuture = {...getHistory};
    getFuture.uri = baseURL + "pv_power/forecasts";

    let promises = [
        rp(getHistory),
        rp(getFuture)
    ];
    return Promise.all(promises)
        .then(function ([getHistoryResult, getFutureResult]) {
            return Promise.resolve({...getFutureResult, ...getHistoryResult});
        });
};

exports.getSolarRadiation = function(city) {
    let coordinate = coordinateForCity(city);
    if (!coordinate) {
        return Promise.reject("Invalid city name, please use a valid city");
    }

    var getHistory = {
        method: "GET",
        uri: baseURL + "radiation/estimated_actuals",
        qs: {
            latitude: coordinate.lat,
            longitude: coordinate.lon,
            api_key: apiKey,
            format: "json"
        },
        json: true
    };

    var getFuture = {...getHistory};
    getFuture.uri = baseURL + "radiation/forecasts";

    let promises = [
        rp(getHistory),
        rp(getFuture)
    ];
    return Promise.all(promises)
        .then(function ([getHistoryResult, getFutureResult]) {
            return Promise.resolve({...getFutureResult, ...getHistoryResult});
        });
};


function coordinateForCity(city) {
    return cityCoordinateMapping[city];
}