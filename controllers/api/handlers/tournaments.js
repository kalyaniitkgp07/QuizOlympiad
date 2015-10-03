'use strict'
var Tournament = require('../../../models/tournaments');

module.exports = {
	getMethod: function getTournamentDescHandler(req, res) {
		var
			query 			= {},
			projection 	= {
				TournamentDescription	: 1, 
				TournamentIdName			: 1,
				TournamentDisplayName	: 1
			}
		;
		Tournament.find(query, projection)
			.then(function(tournamentList) {
				res.json({
					status			: true,
					error				: null,
					result			: {
						tournamentList 	: tournamentList,
					},
				});
			}).then(null, function(err) {
				res.json({
					status	: false,
					error		: err,
					result	: null,
				});
			});
	}
}