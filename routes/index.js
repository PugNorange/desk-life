var express = require('express');
var router = express.Router();
var pg = require('pg');
var fs = require('fs');
var postgres_config = require("./../postgres-config").database;
var jstz = require('jstimezonedetect');
var tz = jstz.determine(); //timezone Detector
// Config for DB connection
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
// Authentication and client for Google Signin
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = "199579559715-n165q0hs5n5fc5r1vhk72t29n4sag7i8"
const client = new OAuth2Client(CLIENT_ID);


/* GET home page. */
router.get('/', function(req, res, next) {
    const query = `SELECT * FROM HEALTHINFO WHERE user_id=2 ORDER BY start_time;`;
    pgClient
        .query(query)
        .then((data, err) => {
            console.log('Query successfully!', data.rows);
            var ch_data = JSON.stringify(data.rows);
            res.render('index.ejs', {chart_data: ch_data});
        })
        .catch((err) => {
            console.log(err)
            pgClient.end();
    });
    // res.render('index.ejs');
});

router.post('/', function(req, res, next){
    console.log("CHECK IF GOOGLE LOGIN WORKIGN>>>>>");
    async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
          // Or, if multiple clients access the backend:
          //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      const userid = payload['sub'];
      // If request specified a G Suite domain:
      //const domain = payload['hd'];
    }
    verify().catch(console.error);
})

router.get('/face', function(req, res, next) {
  res.render('face.ejs');
});


router.get('/instructions', function(req, res, next) {
    res.render('instructions.ejs');
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
