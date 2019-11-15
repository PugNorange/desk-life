var express = require('express');
var router = express.Router();
var pg = require('pg');
var fs = require('fs');
var postgres_config = require("./../postgres-config").database;

var config = new pg.Client({
  host: postgres_config.db,
  port: postgres_config.port,
  user: postgres_config.usrId,
  password: postgres_config.passwd,
  database: postgres_config.dbname,
  ssl: true
})


const pgClient = new pg.Client(config);
pgClient.connect(err => {if (err) throw err;});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index.ejs');
});

router.get('/face', function(req, res, next) {
  res.render('face.ejs');
});


router.get('/data_chart_demo', function(req, res, next) {
    console.log("check point");

    const query = `SELECT * FROM HEALTHINFO WHERE user_id=1;`;
    pgClient
        .query(query)
        .then((data, err) => {
            // console.log('Query successfully!', data.rows);
            var ch_data = JSON.stringify(data.rows);
            res.render('data_chart_demo', {chart_data: ch_data});
        })
        .catch((err) => {
            console.log(err)
            pgClient.end();
        });
});

router.get('/login', function(req, res, next){
    res.render('login.ejs');
});

router.post('/login', function(req, res, next){
    var email = req.body.email;
    var password = req.body.password;
    // Connect to DB and check if it matches.
    // pg.connect(link, function (err,connect) {
    //     if (err) return console.log(err);

        var q = `select * from Users WHERE email='${email}' AND passwd='${password}'`;
        console.log("check >> ", q);
        pgClient.query(q, function (err, data) {
            if (err){
                console.log("ERROR >> ", err);
                pgClient.end();
            }
            else {
                console.log("Success !! ", data);
                res.render('index.ejs');
            }
        });
    // });

});


module.exports = router;
