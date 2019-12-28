var express = require('express');
var app = express();
const path = require('path')
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var fs = require('fs');
var pg = require('pg');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set( 'port', ( process.env.PORT || 3000 ));

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));

const indexRouter = require('./routes/index');

app.use('/', indexRouter);




app.listen(app.get('port'), function() {
    console.log('Listening on ', app.get('port'));
});
