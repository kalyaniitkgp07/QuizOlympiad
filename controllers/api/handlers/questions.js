'use Strict'
var Question = require('../../../models/questions');

module.exports = {
	getMethod: function(req, res) {
		var
			query 			= {},
			projection	= {}
		;
		Question.find(query, projection, function(err, quesList) {
			if(err) {
				res.json({
					status	: false,
					error		: null,
					result	: null,
				});
			} else {
				res.json({
					status	: true,
					error 	: null,
					result 	: JSON.stringify({quesList: quesList}),
				});
			}
		});
	},
};