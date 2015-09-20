'use strict'
var
	LoginHandler	 			= require('./handlers/login'),
	LogoutHandler	 			= require('./handlers/logout'),
	RegisterHandler			= require('./handlers/register'),
	GamesDescHandler 		= require('./handlers/games-desc'),
	GamesRoundsHandler	= require('./handlers/games-rounds'),
	RoundsQuesHandler		= require('./handlers/rounds-ques'),
	QuestionsHandler 		= require('./handlers/questions')
;

module.exports = function(router) {
	router.post('/login', LoginHandler.postMethod);
	router.get('/logout', LogoutHandler.getMethod);
	router.post('/register', RegisterHandler.postMethod);
	router.get('/games/', GamesDescHandler.getMethod);
	router.get('/games/:idname/rounds/', GamesRoundsHandler.getMethod);
	router.get('/games/:gidname/rounds/:ridname/questions/', RoundsQuesHandler.getMethod);

	// admin handlers
	router.get('/admin/questions', QuestionsHandler.getMethod);	
}