'use strict';

var mongoose = require('mongoose');

var gameModel = function() {
	var gameSchema = mongoose.Schema(
		{
			GameIdName: String
		},
		{
			collection: 'Games'
		}
	);

	return mongoose.model('Game', gameSchema);
};

module.exports = new gameModel();