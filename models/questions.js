'use strict';

var mongoose = require('mongoose');

var questionModel = function() {
	var questionSchema = mongoose.Schema(
		{},
		{
			collection: 'Questions'
		}
	);

	return mongoose.model('Question', questionSchema);
};

module.exports = new questionModel();