var mongoose = require('mongoose');

//create a schema for mongoose to play with
var GenericSchema = mongoose.Schema({
	name: String
});

//export it
var Generic = module.exports = mongoose.model('Generic', GenericSchema);
