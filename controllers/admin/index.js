'use strict';
var Question = require('../../models/questions');

module.exports = function(routes) {
	routes.get('/questions', function(req, res) {
		console.log('GET QUESTIONS');
		Question.find(function(err, quesList) {
			console.log('QUESLIST:::', quesList);
			if(err) {
				console.log(err);
			}

			var model = {
				quesList	: quesList
			};
			res.render('questions', {name: 'KJFFLOKSOLK'});
		});
	});
};