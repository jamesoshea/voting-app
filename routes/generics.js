var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

var router = express.Router();

var Generic = require('../models/genmodel');

//get all of your generic things
router.get('/', function (req, res) {
  Generic.find({}, function(err, docs) {
    if (!err){
        res.json(docs);
    } else {
      throw err;
    }
  });
});

//get a specific generic thing
router.get('/:name', function (req, res) {
  Generic.findOne({ 'name': req.params.name }, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

//add a new generic thing
router.post('/add', function(req, res){
  var newGeneric = new Generic({ name: req.headers.name });
    newGeneric.save(function(err) {
    if (err) {
      res.send(err.message)
    } else {
      res.send('Success');
    }
  });
});

//update a thing
router.post('/:name/', function(req, res){
  Generic.findOneAndUpdate({ "name": req.params.name }, { "name": req.body.name }, function(err, result){
    if(err) throw err;
    res.send('Success');
  })
});

//delete a generic thing
router.delete('/:name', function(req, res){
  Generic.remove({'name': req.params.name }, function(err, result){
    if (err) throw err;
    res.send(req.params.name + ' deleted.');
  });
});

module.exports = router;
