'use strict';

var mongoose = require('mongoose');

var gameModel = function() {
	var gameSchema = mongoose.Schema(
		{},
		{
			collection : 'Games',
			strict     : false
		}
	);

	return mongoose.model('Game', gameSchema);
};

module.exports = new gameModel();