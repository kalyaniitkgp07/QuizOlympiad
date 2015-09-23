'use strict'
var
	LoginHandler	 					= require('./handlers/login'),
	LogoutHandler	 					= require('./handlers/logout'),
	RegisterHandler					= require('./handlers/register'),
	TournamentsHandler			= require('./handlers/tournaments'),
	TournamentsRulesHandler	= require('./handlers/tours-rules'),
	TournamentsGamesHandler	= require('./handlers/tours-games'),
	GamesDescHandler 				= require('./handlers/games-desc'),
	GamesRoundsHandler			= require('./handlers/games-rounds'),
	RoundsQuestionsHandler	= require('./handlers/rounds-ques'),
	QuestionsHandler 				= require('./handlers/questions')
;

module.exports = function(router) {
	router.post('/login', LoginHandler.postMethod);
	router.get('/logout', LogoutHandler.getMethod);
	router.post('/register', RegisterHandler.postMethod);

	// tournament, games, rounds, questions
	router.get('/tournaments/', TournamentsHandler.getMethod);
	router.get('/tournaments/:tidname/rules/', TournamentsRulesHandler.getMethod);
	router.get('/tournaments/:tidname/games/', TournamentsGamesHandler.getMethod);
	router.get('/tournaments/:tidname/games/:gidname/rounds/', GamesRoundsHandler.getMethod);
	router.get('/tournaments/:tidname/games/:gidname/rounds/:ridname/questions/', RoundsQuestionsHandler.getMethod);

	// admin handlers
	router.get('/admin/questions', QuestionsHandler.getMethod);	
}