'use strict';
var
	Game 			= require('../../../models/games'),
	Question 	= require('../../../models/questions')
;

module.exports = function(routes) {

	routes.get('/', function(req, res) {
		var
			query 			= {},
			projection 	= {
				GameDescription	: 1, 
				GameIdName			: 1,
				GameDisplayName	: 1
			}
		;
		Game.find(query, projection, function(err, gameList) {
			if(err) {
				console.log('ERROR:::\n\tsrc: /questions/\n\terror', err);
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
						gameList 	: gameList,
					},
				});
			}
		});
	});

	routes.get('/:idname/rounds/', function(req, res) {
		var
			idname 	= req.params.idname,
			query		= {
				GameIdName: idname 
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
	});

	routes.get('/:gidname/rounds/:ridname/questions/', function(req, res) {
		var
			gidname = req.params.gidname,
			ridname = req.params.ridname
		;

		var
			query = {
				'GameIdName': gidname,
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
			} else {
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
					res.json(roundQuestionsObj);
				});				
			}
		});
	});
};