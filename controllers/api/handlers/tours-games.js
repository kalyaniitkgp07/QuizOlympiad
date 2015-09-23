'use strict'
var Game = require('../../../models/games');

module.exports = {
	getMethod: function(req, res) {
		var
			tidname 	= req.params.tidname,
			query		= {
				'TournamentInfo.TournamentName'	: tidname, 
			},
			projection	= {
				GameIndex				: 1,
				GameIdName			: 1,
				GameDisplayName	: 1,
				GameDescription	: 1,
				TournamentInfo	: 1, 
			}
		;

		Game.find(query, projection, function(err, gameList) {
			if(err) {
				res.json({
					status	: false,
					error		: err,
					result	: null, 
				});
			} else {
				res.json({
					status	: true,
					error		: null,
					result	: {gameList: gameList}, 
				});
			}
		});
	}
}