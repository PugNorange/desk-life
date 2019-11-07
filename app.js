var express = require('express');
var app = express();
const path = require('path')
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var fs = require("fs");




// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(express.static("public"));


const indexRouter = require('./routes/index')

app.use('/', indexRouter)




app.listen(3000, function() {
  console.log('Listening on 3000');
});
