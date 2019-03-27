const db = require('monk')('localhost:27017/pArranger');
const panelCollection = db.get('panelDB');
const mongodb = require('mongodb');

// All methods returns a promise
var exports = module.exports = {};

/**
 * Regex Search using Monk , can only match string fields.
 * @param req
 * @param res
 */
exports.search = function(req, res) {
    console.info(req.body);
    const keyword = req.body.keyword;
    if (!keyword) {
        res.send("Error: keywords is empty");
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


