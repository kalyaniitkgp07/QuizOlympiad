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
		Tournament.find(query, projection, function(err, tournamentList) {
			if(err) {
				console.log('ERROR:::\n\tsrc: /tournaments/\n\terror', err);
				res.json({
					status	: false,
					error		: null,
					result	: null,
				});
			} else {
				res.json({
					status			: true,
					error				: null,
					result			: {
						tournamentList 	: tournamentList,
					},
				});
			}
		});
	}
}