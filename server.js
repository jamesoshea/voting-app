//export an object from config.js with a property called string.
//set that to your mLab URI with login details
var db = require('./config.js');

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//initialise app
var app = express();
//connect to db
mongoose.connect(db.string);

//routes
var generics = require('./routes/generics');

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/generics', generics);

// app.get('/', function (req, res) {
// add a homepage route if necessary
// });

//spin that server up!
app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
