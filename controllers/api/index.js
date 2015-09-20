'use strict'
var
	LoginHandlers 			= require('./handlers/login'),
	GamesDescHandler 		= require('./handlers/games-desc'),
	GamesRoundsHandler	= require('./handlers/games-rounds'),
	RoundsQuesHandler		= require('./handlers/rounds-ques'),
	QuestionsHandler 		= require('./handlers/questions')
;

module.exports = function(router) {
	router.post('/login', LoginHandlers.postMethod);
	router.get('/games/', GamesDescHandler.getMethod);
	router.get('/games/:idname/rounds/', GamesRoundsHandler.getMethod);
	router.get('/games/:gidname/rounds/:ridname/questions/', RoundsQuesHandler.getMethod);

	// admin handlers
	router.get('/admin/questions', QuestionsHandler.getMethod);	
}