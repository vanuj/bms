var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('MS-SEAT : Welcome to Seats microservice. Please start querying data based on params.');
});

module.exports = router;
