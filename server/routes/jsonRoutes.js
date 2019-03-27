var express = require('express');
var router = express.Router();
var dbController = require('../controllers/databaseController.js');

// See https://github.com/Adamkzh/pArranger/tree/master/server for documentation.

router.get('/api/v1/getUsers', function(req, res, next) {
    let limit = parseInt(req.query.limit);
    let sortOldToNew = req.query.oldToNew === 'true';
    var updatedBefore = null;
    var updatedAfter = null;

    if (req.query.updatedBefore)  {
        var date = convertEpochMilliStringToDate(req.query.updatedBefore);
        if (!date) {
            res.json(failed({"error": "\"updatedBefore\" must be a unix epoch date number in millisecond"}));
            return;
        }
        updatedBefore = date;
    }

    if (req.query.updatedAfter)  {
        var date = convertEpochMilliStringToDate(req.query.updatedAfter);
        if (!date) {
            res.json(failed({"error": "\"updatedAfter\" must be a unix epoch date number in millisecond"}));
            return;
        }
        updatedAfter = date;
    }

    dbController.getUsers(limit, sortOldToNew, updatedBefore, updatedAfter)
        .then(function (result) {
            res.json(success({"result": result}));
        })
        .catch(function (error) {
            res.json(failed({"error": error}));
        });
});

router.get('/api/v1/searchUsers', function(req, res, next) {
    let limit = parseInt(req.query.limit);
    let sortOldToNew = req.query.oldToNew === 'true';
    if (!req.query.q) {
        res.json(failed({"error": "Please specify a search term via q={keyword}"}));
    }

    dbController.searchUsers(req.query.q, limit, sortOldToNew)
        .then(function (result) {
            res.json(success({"result": result}));
        })
        .catch(function (error) {
            res.json(failed({"error": error}));
        });
});

router.get('/api/v1/getUser', function(req, res, next) {
    if (req.query.updatedDate)  {
        var date = convertEpochMilliStringToDate(req.query.updatedDate);
        if (!date) {
            res.json(failed({ "error": "\"updatedDate\" must be a unix epoch date number in millisecond"}));
            return;
        }
        req.query.updatedDate = date;
    }
    
    dbController.getUserForKeyValuePair(req.query)
        .then(function (result) {
            res.json(success({"result": result}));
        })
        .catch(function (error) {
            res.json(failed({"error": error}));
        });
});

router.post('/api/v1/addUser', function(req, res, next) {
    let contentType = req.headers['content-type'];
    if (contentType !== "application/json") {
        res.json(failed({"error": "Incoming request header's content-type is not application/json, this is a JSON only API"}));
        return;
    }
    if (!req.body.user) {
        res.json(failed({"error": "Please specify a \"user\" object" }));
        return;
    }
    dbController.addUser(req.body.user)
        .then(function (result) {
            res.json(success({"result": { "added": result}}));
        })
        .catch(function (error) {
            res.json(failed({"error": error}));
        });
});

router.post('/api/v1/updateUser', function(req, res, next) {
    let contentType = req.headers['content-type'];
    if (contentType !== "application/json") {
        res.json(failed({"error": "Incoming request header's content-type is not application/json, this is a JSON only API"}));
        return;
    }
    let user = req.body.updateUser;
    if (!user) {
        res.json(failed({"error": "Please specify a \"updateUser\" object" }));
        return;
    }
    let userId = user._id;
    if (!userId) {
        res.json(failed({"error": "Please specify an id under updateUser._id" }));
        return;
    }

    dbController.updateUser(userId, user)
        .then(function (result) {
            res.json(success({"result": { "updated": result}}));
        })
        .catch(function (error) {
            res.json(failed({"error": error}));
        });
});

router.post('/api/v1/removeUser', function(req, res, next) {
    let contentType = req.headers['content-type'];
    if (contentType !== "application/json") {
        res.json(failed({"error": "Incoming request header's content-type is not application/json, this is a JSON only API"}));
        return;
    }
    let user = req.body.removeUser;
    if (!user) {
        res.json(failed({"error": "Please specify a \"removeUser\" object" }));
        return;
    }
    let userId = user._id;
    if (!userId) {
        res.json(failed({"error": "Please specify an id under removeUser._id" }));
        return;
    }

    dbController.removeUser(userId)
        .then(function (result) {
            res.json(success({"result": result}));
        })
        .catch(function (error) {
            res.json(failed({"error": error}));
        });
});

function convertEpochMilliStringToDate(epochMilliString) {
    if (!epochMilliString) {
        return null;
    }
    var epochMilli = parseInt(epochMilliString);
    if (!epochMilli) {
        return null;
    }
    var date = new Date(epochMilli);
    if (!date) {
        return null;
    }
    return date;
}

function success(d) {
    d.success = true;
    return d;
}

function failed(d) {
    d.success = false;
    return d;
}

module.exports = router;
