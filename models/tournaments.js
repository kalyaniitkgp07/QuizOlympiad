'use strict';

var mongoose = require('mongoose');

var tournamentModel = function() {
	var tournamentSchema = mongoose.Schema(
		{},
		{
			collection: 'Tournaments'
		}
	);

	return mongoose.model('Tournament', tournamentSchema);
};

module.exports = new tournamentModel();