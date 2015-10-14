'use strict'
var Tournament = require('../../../models/tournaments');

function _isTournamnetContestant(contestantIdList, userId) {
	if(userId === null){
		return false;
	}
	var contestantStrIdList = contestantIdList.map(function(objId) {
		return objId.toString();
	});
	return (contestantStrIdList.indexOf(userId) >= 0);
}
module.exports = {
	getMethod: function getTournamentDescHandler(req, res) {
		var userId = req.session.userId ? req.session.userId.toString() : null;
		var
			query 			= {},
			projection 	= {
				TournamentDescription	 : 1,
				TournamentIdName       : 1,
				TournamentDisplayName	 : 1,
				Unsupervised           : 1,
				TournamentContestants  : 1,
			}
		;
		Tournament.find(query, projection)
			.then(function(tournamentList) {
				var tourList = [];
				tournamentList.forEach(function(tournament, idx) {
					var tournamentObj = tournament.toObject();
					tournamentObj.IsInTournament = _isTournamnetContestant(tournamentObj.TournamentContestants, userId);
					tourList[idx] = tournamentObj;
				});
				res.json({
					status			: true,
					error				: null,
					result			: {
						tournamentList 	: tourList,
					},
				});
			}).then(null, function(err) {
				console.log('ERROR', err);
				res.json({
					status	: false,
					error		: err,
					result	: null,
				});
			});
	}
}