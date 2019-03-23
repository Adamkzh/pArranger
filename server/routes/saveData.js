var express = require('express');
var router = express.Router();
var multer = require("multer");
var MongoClient = require('mongodb').MongoClient, assert = require('assert');

var url = 'mongodb://localhost:27017/pArranger';

const upload = multer({
    limits:{fileSize: 1000000},
 }).single("mapImage");

/* POST save user detail. */

var MongoClient = require('mongodb').MongoClient, assert = require('assert');


router.post('/api/save', function(req, res, next) {
    upload(req, res, (err) => {
        // console.log(req.body.mapImage);
        // console.log("Request body ---",  JSON.parse(req.body.data));
        var data = JSON.parse(req.body.data);
        var document = {
            _id: data.uuid,
            email: data.email,
            address: data.address,
            watts: data.watts,
            username: data.username,
            mountType: data.mountType,
            mapImage:req.body.mapImage
        }
        // console.log(document);
        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            console.log("Connected correctly to server...");
            var db = client.db('panelDB');
            // Insert a single document
            db.collection('userinfo').updateOne(
                {_id: data.uuid},
                {$set: document},
                function(err, r) {
                assert.equal(null, err);
              },
                { upsert: true });
          });




        if(!err)
           return res.sendStatus(200).end();
     });
});

module.exports = router;
 