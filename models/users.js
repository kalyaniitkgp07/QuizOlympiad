'use strict';

var mongoose = require('mongoose');

var userModel = function() {
	var userSchema = mongoose.Schema({
			UserName 		: String,
			Password		: String,
			UserRole		: String,
			SessionIds	: [Number],
			FirstName		: String,
			LastName		: String,
			Phone				: Number,
		}, {
			collection: 'Users'
		});

	return mongoose.model('User', userSchema);
};

module.exports = new userModel();