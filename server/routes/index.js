var express = require('express');
var router = express.Router();
var searchController = require('./searchController.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/search', searchController.search);

module.exports = router;
