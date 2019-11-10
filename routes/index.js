var express = require('express');
var router = express.Router();
var ibmdb = require('ibm_db');
var ibmdb2_config = require("./../ibmdb2-config").database;
var link = `DATABASE=${ibmdb2_config.db};HOSTNAME=${ibmdb2_config.hostname};UID=${ibmdb2_config.usrId};PWD=${ibmdb2_config.passwd};PORT=${ibmdb2_config.port};PROTOCOL=${ibmdb2_config.protocol}`;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs');
});

router.get('/face', function(req, res, next) {
  res.render('face.ejs');
});

router.get('/data_chart_demo', function(req, res, next) {
  res.render('data_chart_demo.ejs');
});

router.get('/login', function(req, res, next){
    res.render('login.ejs');
});

router.post('/login', function(req, res, next){
    var email = req.body.email;
    var password = req.body.password;
    // Connect to DB and check if it matches.
    ibmdb.open(link, function (err,connect) {
        if (err) return console.log(err);

        var q = `select * from Users WHERE email='${email}' AND passwd='${password}'`;
        console.log("check >> ", q);
        connect.query(q, function (err, data) {
            if (err){console.log("ERROR >> ", err);}
            else {
                console.log("Success !! ", data);
                res.render('index.ejs');
            }
            connect.close(function () {
                console.log('done');
            });
        });
    });

});


module.exports = router;
