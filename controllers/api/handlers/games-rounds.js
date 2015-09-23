'use strict'
var Game = require('../../../models/games');

module.exports = {
	getMethod: function(req, res) {
		var
			gidname 	= req.params.gidname,
			tidname		= req.params.tidname,
			query		= {
				GameIdName: gidname,
				'TournamentInfo.TournamentName': tidname
			},
			projection	= {
				'GameRounds.RoundIdName'			: 1,
				'GameRounds.RoundDisplayName'	: 1,
				'GameRounds.RoundRules'				: 1
			}
		;

		Game.find(query, projection, function(err, roundList) {
			if(err) {
				console.log('ERROR:::\n\tsrc: /questions/' + idname + '/rounds/\n\terror:', err);
				res.json({
					status	: false,
					error		: err,
					result	: null, 
				});
			} else {
				res.json({
					status	: true,
					error		: null,
					result	: {roundList: roundList}, 
				});
			}
		});
	}
}