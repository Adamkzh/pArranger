var express = require('express');
var router = express.Router();
var searchController = require('../controllers/searchController.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("hello world");
});

/** POST request for fussy search
 *  Required request body: {keyword: "text"}
 */
router.post('/api/v1/search', searchController.search);

module.exports = router;
