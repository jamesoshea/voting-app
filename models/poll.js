const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
var PollSchema = mongoose.Schema({
	question: {
		type: String,
		index:true
	},
	owner: {
		type: String
	},
	options: {
		type: Array
	},
	voters: {
		type: Array
	}

});

var Poll = module.exports = mongoose.model('Poll', PollSchema);
