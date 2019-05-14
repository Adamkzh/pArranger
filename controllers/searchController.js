// const db = require('monk')('localhost:27017/pArranger');
const db = require('monk')('mongodb://root:a00000@ds155596.mlab.com:55596/parranger');
const panelCollection = db.get('panelDB');
const mongodb = require('mongodb');

// All methods returns a promise
var exports = module.exports = {};

/**
 * Regex Search using Monk , can only match string fields.
 * Expected param: req.body.keyword [string]
 * Returns: List of user objects as JSON LIST
 */
exports.search = function(req, res) {
    console.info(req.body);
    const keyword = req.body.keyword;
    if (!keyword) {
        res.send("Error: keyword is empty");
    }

    var regx = new RegExp(keyword, 'i');
    panelCollection.find({ $or: [{_id: regx}, {username: regx}, {email: regx}, {address: regx}, {mountType: regx}]}, {},
        function(err, docs) {
            if (err) {
                res.send(err);
            } else {
                console.info({"docs": docs});
                res.send(JSON.stringify(docs));
            }
    });
};


