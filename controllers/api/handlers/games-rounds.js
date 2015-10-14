'use strict'
var Game          = require('../../../models/games');
var User          = require('../../../models/users');
var Tournament    = require('../../../models/tournaments');
var ContestUtils  = require('../../utils/contest');
var UserRoleUtils = require('../../utils/user-role');

module.exports = {
	getMethod: function(req, res) {
		var
			globalRoundList = null,
			globalUserInfo = null
		;
		var
			gidname    = req.params.gidname,
			tidname    = req.params.tidname,
			query      = {
				GameIdName: gidname,
				'TournamentInfo.TournamentName': tidname
			},
			projection = {
				GameContestants               : 1,
				TournamentInfo                : 1,
				'GameRounds.RoundIdName'      : 1,
				'GameRounds.RoundDisplayName' : 1,
				'GameRounds.RoundRules'       : 1,
				'GameRounds.IsRoundPlayed'    : 1
			}
		;

		Game.find(query, projection)
			.then(function(roundList) {
				globalRoundList = roundList[0].toObject();
				return User.findOne({UserId: req.session.userId});
			})
			.then(function(userInfo) {
				globalUserInfo = userInfo.toObject();
				return Tournament.find();
			})
			.then(function(tournamentList) {
				// tournament list to object
				var tournamentObjList = {};
				tournamentList.forEach(function(tournament) {
					var tournamentObj = tournament.toObject();
					tournamentObjList[tournamentObj.TournamentIdName] = tournamentObj;
				});
				var
					userId       = req.session.userId ? req.session.userId.toString() : null,
					isInGame     = ContestUtils.isInContest(globalRoundList.GameContestants, userId),
					roundList    = globalRoundList.GameRounds,
					resRoundList = []
				;
				roundList.forEach(function(round) {
					if(!(
						(
							round.Unsupervised
							&&
							!tournamentObjList[globalRoundList.TournamentInfo.TournamentName].Unsupervised
							&&
							!isInGame
						)
						||
						(
							!round.IsRoundPlayed
							&&
							!(UserRoleUtils.isAdmin(globalUserInfo))
						)
					)) {
						resRoundList.push(round);
					}
				});
			
				globalRoundList.GameRounds = resRoundList;	
				res.json({
					status	: true,
					error		: null,
					result	: {roundList: globalRoundList},
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