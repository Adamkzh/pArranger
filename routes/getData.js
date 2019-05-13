var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient, assert = require('assert');

var url = 'mongodb://localhost:27017/pArranger';



/* GET user detail. */

var MongoClient = require('mongodb').MongoClient, assert = require('assert');

// get a single user information 
router.get('/api/get', function(req, res, next) {
     MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        var db = client.db('panelDB');
        var id = req.query.ID;

        db.collection('tempImg').findOne( { _id: id }, (err, result) =>{
            if (err) throw err;
            var blob = result.mapImage;
            res.send(blob);
        } );
      });
});

module.exports = router;
 