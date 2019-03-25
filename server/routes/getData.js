var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient, assert = require('assert');

var url = 'mongodb://localhost:27017/pArranger';



/* GET user detail. */

var MongoClient = require('mongodb').MongoClient, assert = require('assert');


router.get('/api/get', function(req, res, next) {
    
     MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Connected correctly to server...");
        var db = client.db('panelDB');
        var id = req.query.ID;

        db.collection('userinfo').findOne( { _id: id }, function(err, result){
            if (err) throw err;
            res.send(result);
        } );

      });
});

module.exports = router;
 