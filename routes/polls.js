const express = require('express');
var router = express.Router();

var Poll = require('../models/poll');
var User = require('../models/user');

//new poll page
router.get('/newpoll', ensureAuthenticated,  function(req, res) {
  res.render('newpoll');
});

//show all polls
router.get('/all',  function(req, res) {
  Poll.find(function(err, polls){
    res.render('all', {polls: polls});
  });
});

//show one poll
router.get('/:id', function(req, res){
  query = { _id: req.params.id }
  Poll.findOne(query, function(err, poll){
    var isOwner = false;
    var loggedIn = false;
    if(req.user) {
      loggedIn = true;
      if (req.user.id == poll.owner) {
        isOwner = true;
      }
    }
    poll.options.sort(function(a,b){
      return b.votes - a.votes;
    });
    res.render('poll', {poll: poll, isOwner: isOwner, loggedIn: loggedIn});
  });
});

//add an option to a poll
router.post('/:id/add', function(req, res){
  query = { _id: req.params.id }
  Poll.findOne(query, function(err, poll){
    poll.options.push({text: req.body.newOption, votes: 1});
    Poll.findOneAndUpdate(query, { $set: {options: poll.options}}, function(err, poll){
      if (err) throw err;
      res.redirect('/polls/' + req.params.id);
    });
  });
});

//vote up
router.get('/:id/:option/voteup', function(req, res){
  query = { _id: req.params.id }
  var i = req.params.option;
  Poll.findOne(query, function(err, poll){
    poll.options[i].votes++;
    poll.options.sort(function(a,b){
      return b.votes - a.votes;
    });
    Poll.findOneAndUpdate(query, { $set: { options: poll.options}, new: true}, function(err, poll){
      res.redirect('/polls/' + req.params.id);
    });
  });
});

//delete poll
router.get('/:id/delete', function(req, res){
  query = { _id: req.params.id };
  Poll.remove(query, function(err){
    if (err) throw err;
    res.redirect('../../')
  });
});

//create poll
router.post('/newpoll', ensureAuthenticated, function(req, res) {
  var question = req.body.question;
  var owner = req.user.id;
  var responses = req.body.responses.split(',');
  responses.forEach(function(response, index){
    responses[index] = { text: responses[index], votes: 0 };
  });

  //Validation
  req.checkBody('question', 'Name is required').notEmpty();
  req.checkBody('responses', 'Please add at least two choices').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    res.render('/', {errors: errors});
  } else {
    var newPoll = new Poll({
      question: question,
      owner: owner,
      options: responses
    });

    newPoll.save(function(err) {
      if (err) throw err;
    });

    req.flash('success_msg', 'Poll created.');
    res.redirect('/');
  }
});

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error_msg', 'You are not logged in');
    res.redirect('../users/login');
  }
}

module.exports = router;
