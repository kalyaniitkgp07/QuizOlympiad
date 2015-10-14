'use strict'
var Game         = require('../../../models/games');
var Tournament 	 = require('../../../models/tournaments');
var ContestUtils = require('../../utils/contest');

module.exports = {
	getMethod: function(req, res) {
		var
			globalGameList = []
		;
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
				GameContestants	: 1,
				Unsupervised		: 1,
			}
		;

		Game.find(query, projection)
			.then(function(gameList) {
				globalGameList = gameList;
				return Tournament.find();
			})
			.then(function(tournamentList) {
				// tournament list to object
				var tournamentObjList = {};
				tournamentList.forEach(function(tournament) {
					var tournamentObj = tournament.toObject();
					tournamentObjList[tournamentObj.TournamentIdName] = tournamentObj;
				});
				var userId = req.session.userId ? req.session.userId.toString() : null;
				var resGameList = [];
				globalGameList.forEach(function(game) {
					var gameObj = game.toObject();
					gameObj.IsInGame = ContestUtils.isInContest(gameObj.GameContestants, userId);
					if(!(
						gameObj.Unsupervised
						&&
						!tournamentObjList[gameObj.TournamentInfo.TournamentName].Unsupervised
						&&
						!gameObj.IsInGame
					)) {
						resGameList.push(gameObj);
					}
				});

				res.json({
					status	: true,
					error		: null,
					result	: {gameList: resGameList}, 
				});
			})
			.then(null, function(err) {
				console.log('ERROR:::', err);
				res.json({
					status	: false,
					error		: err,
					result	: null, 
				});
			});
	}
}