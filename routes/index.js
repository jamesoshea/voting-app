const express = require('express');
var router = express.Router();

var User = require('../models/user');
var Poll = require('../models/poll');

router.get('/', ensureAuthenticated, function(req, res) {
	User.findUserById(req.user.id, function() {
		var query = { owner: req.user.id };
		Poll.find(query, function(err, polls) {
			console.log(polls);
			res.render('index', { polls: polls });
		});
	});
});

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		req.flash('error_msg', 'You are not logged in');
		res.redirect('users/login');
	}
}
module.exports = router;
