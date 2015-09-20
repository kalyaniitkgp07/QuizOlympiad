'use strict';

var mongoose = require('mongoose');

var userModel = function() {
	var userSchema = mongoose.Schema(
		{},
		{
			collection: 'Users'
		}
	);

	return mongoose.model('User', userSchema);
};

module.exports = new userModel();