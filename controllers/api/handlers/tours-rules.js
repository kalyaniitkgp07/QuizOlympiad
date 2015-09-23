'use strict'
var Tournament = require('../../../models/tournaments');

module.exports = {
	getMethod: function getTournamentDescHandler(req, res) {
		var
			tidname 	= req.params.tidname,
			query 			= {
				TournamentIdName	: tidname,
			},
			projection 	= {
				TournamentRules				: 1, 
				TournamentIdName			: 1,
				TournamentDisplayName	: 1,
			}
		;
		Tournament.findOne(query, projection, function(err, tournamentRules) {
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
						tournamentRules	: tournamentRules,
					},
				});
			}
		});
	}
}