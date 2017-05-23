const express = require('express');
var router = express.Router();

var Poll = require('../models/poll');
var User = require('../models/user');

router.get('/newpoll', ensureAuthenticated,  function(req, res) {
  res.render('newpoll');
});

//show all polls
router.get('/all',  function(req, res) {
  Poll.find(function(err, polls){
    res.render('all', {polls: polls});
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
  console.log(req.body);

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
      console.log(newPoll);
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
