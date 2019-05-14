var express = require('express');
var router = express.Router();
var multer = require("multer");
var MongoClient = require('mongodb').MongoClient, assert = require('assert');

var url = 'mongodb://localhost:27017/pArranger';

const upload = multer({

 }).single("mapImage");

/* POST save user detail. */

var MongoClient = require('mongodb').MongoClient, assert = require('assert');

// save specific user information 
router.post('/api/save', upload, (req, res) => {
    var imageData = "test";
	imageData = req.file.buffer;
    let document = {
        mapImage: imageData
    }
	console.log(req.file.buffer);

    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        var db = client.db('panelDB');
        // Insert a single document
        db.collection('tempImg').updateOne(
            {_id: req.body.id},
            {$set: document},
            { upsert: true },
            function(err, r) {
            assert.equal(null, err);
		    res.send("Save temp image successful!");
            });
    });
});

module.exports = router;
 
