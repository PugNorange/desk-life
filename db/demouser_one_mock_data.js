var pg = require('pg');
var postgresConfig = require("./../postgres-config").database;

var config = new pg.Client({
  host: postgresConfig.db,
  port: postgresConfig.port,
  user: postgresConfig.usrId,
  password: postgresConfig.passwd,
  database: postgresConfig.dbname,
  ssl: true
})

// Connect to the DB
const pgClient = new pg.Client(config);
pgClient.connect(err => {
    if (err) throw err;
    else {
        console.log("Connect success demo");
        // Un-comment to insert demo data
        // insertDemoData(1);
    }
});


// Check if query user table data
function testConnection(){
    pgClient.query("select * from Users", (err, data)=>{
        if (err){console.log("ERROR >> ", err);}
        else {
            console.log("SUCCESS!! ", data.rows);
        }
    })
}


// Insert mock data for graph demo
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function insertDemoData(user_id){
    var eye_blink_count=0; // between 2 ~ 30 times
    var face_distance=0; // Between 10 ~ 18 inch (25.4 ~ 45.72 cm)
    var mock_time = '2019-11-14 08:00:00.000000'; // 8:00 am
    var start_time = '2019-11-14 08:00:00.000000'; // 8:00 am
    var end_time = '2019-11-14 16:00:00.000000';   // 4:00 pm

    // Loop 7 times (8am -3pm)
    for (var i = 0; i < 8; i++) {
        // Create mock data for every hour
        eye_blink_count = getRandomArbitrary(2, 30);
        face_distance   = getRandomArbitrary(10, 18);
        var modify_time = mock_time.split(" ");
        var day         = modify_time[0];
        var modify_hour = modify_time[1].split(":");
        var start_hour  = parseInt(modify_hour[0])+i;
        var end_hour    = parseInt(modify_hour[0])+i+1;
        var insert_start_time   = day+" "+start_hour.toString()+":"+modify_hour[1]+":"+modify_hour[2];
        var insert_end_time     = day+" "+end_hour.toString()+":"+modify_hour[1]+":"+modify_hour[2];
        var q=`INSERT INTO HEALTHINFO (user_id, eye_blink_count, face_distance, start_time, end_time) VALUES (${user_id}, ${eye_blink_count}, ${face_distance}, '${insert_start_time}', '${insert_end_time}');`

        pgClient.query(q, (err, data)=>{
            if (err){console.log("ERROR >> ", err);}
        })
    }

    pgClient.query("select * from HEALTHINFO", (err, data)=>{
        if (err){console.log("ERROR >> ", err);}
        else {
            console.log("SUCCESS !! ", data.rows);

        }
    })


}











//
