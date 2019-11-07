var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/face', function(req, res, next) {
  res.render('face');
});

router.get('/data_chart_demo', function(req, res, next) {
  res.render('data_chart_demo');
});


module.exports = router;
