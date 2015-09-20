'use strict'
var Game = require('../../../models/games');

module.exports = {
	getMethod: function getGameDescHandler(req, res) {
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
	}
}