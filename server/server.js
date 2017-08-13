// define variables

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require( 'path' );
var port = 5000;
var list = require('./routes/list');

// routing handlers

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/list', list);

// listen

app.listen(port, function(){
  console.log('listening on port', port);
});
