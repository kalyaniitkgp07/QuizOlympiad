'use strict'
var
	Game 			= require('../../../models/games'),
	Question 	= require('../../../models/questions')
;

module.exports = {
	getMethod: function(req, res) {
		var
			tidname	= req.params.tidname,
			gidname = req.params.gidname,
			ridname = req.params.ridname
		;

		var
			query = {
				'GameIdName': gidname,
				'TournamentInfo.TournamentName': tidname,
				'GameRounds.RoundIdName': ridname
			},
			projection = {
				'GameIdName'		: 1,
				'GameRounds.$'	: 1,
				_id							: 0
			}
		;
		Game.findOne(query, projection, function(err, roundQuestions) {
			if(err) {
				console.log('ERROR:::\n\tsrc: /questions/' + gidname + '/rounds/' + ridname + '\n\terror', err);
				res.json({
					status	: false,
					error		: err,
					result	: null
				});
			} else if(roundQuestions) {
				var
					qIds 							= [],
					roundQuestionsObj = roundQuestions.toObject(),
					qGrps 						= roundQuestionsObj.GameRounds[0].RoundQuestions
				;
				qGrps.forEach(function(qGrp) {
					qGrp.QuestionGroup.forEach(function(refObj) {
						qIds.push(refObj.QuestionRefId);
					});
				});
				
				var
					query	= {
						_id: {$in: qIds}
					},
					projection = {}
				;
				Question.find(query, projection, function(err, qDetails) {
					var 
						allQuesObj = {}
					;
					qDetails.forEach(function(ques) {
						var quesObj = ques.toObject();
						allQuesObj[quesObj._id] = quesObj;
					});
					qGrps.forEach(function(qGrp, qGrpIdx) {
						qGrp.QuestionGroup.forEach(function(refObj, refIdx) {
							if(allQuesObj.hasOwnProperty(refObj.QuestionRefId)) {
								var ques = allQuesObj[refObj.QuestionRefId];
								Object.keys(ques).forEach(function(qKey) {
									roundQuestionsObj.GameRounds[0].RoundQuestions[qGrpIdx].QuestionGroup[refIdx][qKey] = ques[qKey];	
								});
							}
						});
					});
					// TODO: remove AnswerIndices, AnswerMediaUrl, AnswerHintText
					// for non-admin if IsRoundPlayed = false 
					res.json({
						status	: true,
						error 	: null,
						result	: {roundQuestions : roundQuestionsObj}
					});
				});
			} else {
				res.json({
					status	: false,
					error 	: 'Bad request.',
					result	: null,
				});
			}
		});
	}
}