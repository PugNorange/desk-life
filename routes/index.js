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
// clientID for Google Signin
// const CLIENT_ID = "199579559715-n165q0hs5n5fc5r1vhk72t29n4sag7i8"
const {OAuth2Client} = require('google-auth-library');
var CLIENT_ID = require("./../ggl_cli_id").clientIdUrl;
/* GET home page. */
router.get('/', function(req, res, next) {
    const query = `SELECT * FROM HEALTHINFO WHERE user_id=2 ORDER BY start_time;`;
    pgClient
        .query(query)
        .then((data, err) => {
            // console.log('Query successfully!', data.rows);
            var ch_data = JSON.stringify(data.rows);
            res.render('index.ejs', {
                chart_data: ch_data,
                title: "home",
                clientIdUrl: CLIENT_ID
            });
        })
        .catch((err) => {
            console.log(err)
            pgClient.end();
    });
    // res.render('index.ejs');
});

// const {OAuth2Client} = require('google-auth-library');


router.post('/tokensignin', async (req, res, next) => {
    try {
        const client = new OAuth2Client(CLIENT_ID);
        const idToken = String(req.body.idtoken);
        // console.log("TOKEN >>> ", idToken);
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: idToken,
                audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            // If token is valid & email is verified, get the user information.
            const payload   = ticket.getPayload(); // Account information
            if (payload.email_verified === true) {
                console.log("check gID >> ", payload['sub']);
                const ggluserid    = payload['sub']; // constant usrid
                const email     = payload['email']; // email
                const username  = payload['name']; // user name
                //console.log("usrID: ", userid, " email: ", email, " user name: ", username);
                const query = `SELECT * FROM USERS WHERE gmail_token_id='${ggluserid}';`;
                pgClient
                    .query(query)
                    .then((data, err) => {
                        // console.log('Query successfully!', data.rows);
                        var usr_data = data.rows;
                        if (usr_data.length > 0) {
                            console.log("USER DATA >> ", usr_data[0]);
                            // If username or email is update, change it in db also.
                            if ((String(usr_data[0].user_name) != String(username))||(String(usr_data[0].email) != String(email)) ) {
                                console.log("Data not same");
                                var updateUserInfoQuery = `UPDATE USERS SET email = '${email}', user_name='${username}' WHERE gmail_token_id = '${ggluserid}';`;
                                pgClient
                                    .query(updateUserInfoQuery)
                                    .then((data, err) => {
                                        console.log("Data ?? ", data);
                                        console.log("update success!!");
                                        var userData = JSON.stringify({username: username, email: email});
                                        res.send(userData)
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                        pgClient.end();
                                });

                            }
                            else {
                                console.log("No user table update");
                                var userData = JSON.stringify({username: username, email: email});
                                res.send(userData)
                            }
                        }
                        // Create new user
                        else {
                            var createNewUsrQuery = `INSERT INTO Users(user_name, passwd, email, gmail_token_id) VALUES('${username}', 'passwdPlacehold', '${email}', '${ggluserid}');`;
                            pgClient
                                .query(createNewUsrQuery)
                                .then((data, err) => {
                                    console.log("Data ?? ", data);
                                    console.log("create new user success!!");
                                    var userData = JSON.stringify({username: username, email: email});
                                    res.send(userData)
                                })
                                .catch((err) => {
                                    console.log(err)
                                    pgClient.end();
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        pgClient.end();
                });
            }

        }
        verify().catch(console.error); // If token is invalid.

    // write query here

    // const query = `SELECT * FROM USERS WHERE gmail_token_id='faf824e5-5b81-4224-84b6-98687c0af9fe';`;
    // const query_two = `INSERT INTO Users(user_name, passwd, email, gmail_token_id)
// VALUES('demouser1', 'testtest1', 'test1@gmail.com', 'cd43de77-b669-4567-9428-b48e93956b78');`;



    // res.send("Hey success!!")


  } catch (e) {
    next(e);
  }
});


// router.post('/', function(req, res, next){
//     const token = req.body.idtoken;
//     const CLIENT_ID = "199579559715-n165q0hs5n5fc5r1vhk72t29n4sag7i8.apps.googleusercontent.com";
//     const client = new OAuth2Client(CLIENT_ID);
//
//     // console.log("CHECK IF GOOGLE LOGIN WORKIGN>>>>>");
//     // async function verify() {
//     //   const ticket = await client.verifyIdToken({
//     //       idToken: token,
//     //       audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
//     //       // Or, if multiple clients access the backend:
//     //       //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//     //   });
//       // const payload = ticket.getPayload();
//       // const userid = payload['sub'];
//       // const user = {};
//       // user.email = payload['email'];
//       // user.picture = payload['picture'];
//       // user = JSON.stringify(user);
//       // res.render('index.ejs', {user_data: user});
//       // res.send(user);
//       // If request specified a G Suite domain:
//       //const domain = payload['hd'];
//     }
//     verify().catch(console.error);
// })

// router.get('/face', function(req, res, next) {
//   res.render('face.ejs');
// });


router.get('/instructions', function(req, res, next) {
    res.render('instructions.ejs');
});

// router.get('/data_chart_demo', function(req, res, next) {
//     console.log("check point");
//
//     const query = `SELECT * FROM HEALTHINFO WHERE user_id=1;`;
//     pgClient
//         .query(query)
//         .then((data, err) => {
//             // console.log('Query successfully!', data.rows);
//             var ch_data = JSON.stringify(data.rows);
//             res.render('data_chart_demo', {chart_data: ch_data});
//         })
//         .catch((err) => {
//             console.log(err)
//             pgClient.end();
//     });
// });

// router.get('/login', function(req, res, next){
//     res.render('login.ejs');
// });

// router.post('/login', function(req, res, next){
//     var email = req.body.email;
//     var password = req.body.password;
//     // Connect to DB and check if it matches.
//     // pg.connect(link, function (err,connect) {
//     //     if (err) return console.log(err);
//
//         var q = `select * from Users WHERE email='${email}' AND passwd='${password}'`;
//         console.log("check >> ", q);
//         pgClient.query(q, function (err, data) {
//             if (err){
//                 console.log("ERROR >> ", err);
//                 pgClient.end();
//             }
//             else {
//                 console.log("Success !! ", data);
//                 res.render('index.ejs');
//             }
//         });
//     // });
//
// });


module.exports = router;
