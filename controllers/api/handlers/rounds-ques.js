'use strict'
var
	User       = require('../../../models/users'),
	Game       = require('../../../models/games'),
	Question   = require('../../../models/questions'),
	USER_ROLES = require('../../../config/constants').USER_ROLES
;

function _notGameContestant(contestantIdList, userId) {
	var contestantStrIdList = contestantIdList.map(function(objId) {
		return objId.toString();
	});
	return (contestantStrIdList.indexOf(userId) === -1);
}
function _generateRandomIndices(indicesLength, maxIndex) {
	var randomIndices = [], randomIndex;
	while(randomIndices.length < indicesLength) {
		randomIndex = Math.floor(Math.random() * (maxIndex + 1));
		if(randomIndices.indexOf(randomIndex) === -1) {
			randomIndices.push(randomIndex);
		}
	}
	return randomIndices;
}
function _hasUserPlayed(roundContestantQuestions, userId) {
	return (
		roundContestantQuestions
		&&
		roundContestantQuestions.hasOwnProperty(userId)
	);
}

module.exports = {
	getMethod: function(req, res) {
		// global vars
		var
			questionsGameObj = null,
			userInfo         = null
		;

		User.findOne({_id: req.session.userId})
			.then(function(user) {
				userInfo = user ? user.toObject() : null;
				var
					tidname	         = req.params.tidname,
					gidname          = req.params.gidname,
					ridname          = req.params.ridname
				;

				var
					query = {
						'GameIdName'                    : gidname,
						'TournamentInfo.TournamentName' : tidname,
						'GameRounds.RoundIdName'        : ridname
					},
					projection = {
						'GameIdName'      : 1,
						'GameRounds.$'    : 1,
						'GameContestants' : 1,
					}
				;
				return Game.findOne(query, projection);
			})		
			.then(function(questionsGame) {
				if(questionsGame === null) {
					throw new Error('Bad request for questions');
				} else {
					// storing the global variable
					// TODO: find a better method to pass paramets
					// instead of storing it in a global scope
					questionsGameObj = questionsGame.toObject();
					
					if(!questionsGameObj.GameRounds[0].Unsupervised) {
						// return all the questions in rqgrp
						if (
							!questionsGameObj.GameRounds[0].IsRoundPlayed
							&&
							!(userInfo && userInfo.UserRole === USER_ROLES.ADMIN)
						) {
							throw new Error('Auth failed');
						} else {
							var
								qGrps = questionsGameObj.GameRounds[0].RoundQuestions,
								qIds 	= []
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
							return Question.find(query, projection);
						}		
					} else {
						var userId = userInfo ? userInfo._id.toString() : null;
						if(userId === null) {
							throw new Error('Not logged in. Login to continue');
						} else if(_notGameContestant(questionsGameObj.GameContestants, userId)) {
							throw new Error('Not a contestant? Join.')
						} else if(_hasUserPlayed(questionsGameObj.GameRounds[0].RoundContestantQuestions, userId)) {
							// user has played already
							var	qIds = [];
							questionsGameObj.GameRounds[0].RoundContestantQuestions[userId].forEach(function(question) {
								qIds.push(question.QuestionRefId);
							});
							var
								query				= {
									_id: {$in: qIds}
								},
								projection	= {
									'QuestionText'     : 1,
									'Choices'          : 1,
									'QuestionMediaUrl' : 1,
									'QuestionHintText' : 1,
									'AnswerIndices'    : 1,
									'AnswerMediaUrl'   : 1,
									'AnswerHintText'   : 1,
								}
							;
							return Question.find(query, projection);
						} else {
							// user hasn't played the game
							var
								query 			= questionsGameObj.GameRounds[0].RoundQuestionRules
															? questionsGameObj.GameRounds[0].RoundQuestionRules
															: {},
								projection	= {
									'QuestionText'     : 1,
									'Choices'          : 1,
									'QuestionMediaUrl' : 1,
									'QuestionHintText' : 1,
								}
							;
							return Question.find(query, projection);
						}
					}
				}
			})
			.then(function(qDetails) {
				var userId = userInfo._id ? userInfo._id.toString() : null;
				if(!questionsGameObj.GameRounds[0].Unsupervised) {
					var 
						allQuesObj      = {},
						resQuestionInfo = [
							'QuestionText',
							'Choices',
							'QuestionMediaUrl',
							'QuestionHintText',
							'AnswerIndices',
							'AnswerMediaUrl',
							'AnswerHintText',
						],
						qGrps = questionsGameObj.GameRounds[0].RoundQuestions
					;
					qDetails.forEach(function(ques) {
						var
							quesObj = ques.toObject(),
							resQObj = {}
						;
						resQuestionInfo.forEach(function(fld) {
							if(quesObj.hasOwnProperty(fld)) {
								resQObj[fld] = quesObj[fld];
							}
						});
						allQuesObj[quesObj._id] = resQObj;
					});
					qGrps.forEach(function(qGrp, qGrpIdx) {
						qGrp.QuestionGroup.forEach(function(refObj, refIdx) {
							if(allQuesObj.hasOwnProperty(refObj.QuestionRefId)) {
								var ques = allQuesObj[refObj.QuestionRefId];
								resQuestionInfo.forEach(function(qKey) {
								 	questionsGameObj.GameRounds[0].RoundQuestions[qGrpIdx].QuestionGroup[refIdx][qKey] = ques[qKey];
								});
							}
						});
					});
					res.json({
						status	: true,
						error 	: null,
						result	: { roundQuestions : questionsGameObj},
					});
				} else if(_hasUserPlayed(questionsGameObj.GameRounds[0].RoundContestantQuestions, userId)) {
					questionsGameObj.GameRounds[0].RoundQuestions = qDetails.map(function(question, idx) {
						question.QuestionRefId = question._id;
						return ({
							QuestionGroup      : [question],
							QuestionGroupIndex : idx,
						});
					});
					res.json({
						status	: true,
						error 	: null,
						result	: { roundQuestions : questionsGameObj},
					});
				} else {
					var
						randomIndices = _generateRandomIndices(questionsGameObj.GameRounds[0].NumQuestionsPerUser, qDetails.length),
						quesRefList   = []
					;
					questionsGameObj.GameRounds[0].RoundQuestions = randomIndices.map(function(randomIndex, idx) {
						var question = qDetails[randomIndex].toObject();
						question.QuestionRefId = question._id;
						quesRefList.push({
							QuestionRefId : question._id,
						});
						return ({
							QuestionGroup      : [question],
							QuestionGroupIndex : idx,
						});
					});
					var
						tidname	 = req.params.tidname,
						gidname  = req.params.gidname,
						ridname  = req.params.ridname
					;
					var	updateInfo = {};
					updateInfo['GameRounds.$.RoundContestantQuestions.' + userId] = quesRefList;
					var
						query   = {
							'GameIdName'                    : gidname,
							'TournamentInfo.TournamentName' : tidname,
							'GameRounds.RoundIdName'        : ridname,
						},
						update = {$set : updateInfo},
						options = {
							upsert	: true,
						}
					;
					return Game.update(query, update, options);
				}				
			})
			.then(function(num) {
				res.json({
					status	: true,
					error 	: null,
					result	: { roundQuestions : questionsGameObj},
				});
			})
			.then(null, function(err) {
				console.log('ERROR:::', err);
				res.json({
					status	: false,
					error 	: err,
					result 	: null,
				});
			});
	}
}