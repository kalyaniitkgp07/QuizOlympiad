'use strict'
var User = require('../../../models/users');

module.exports = {
	postMethod: function(req, res) {
		var
			username 	= req.body.username,
			password	= req.body.password
		;
		var
			query 			= {UserName: username},
			projection	= {}
		;
		User.find(query, projection, function(err, userList) {
			if(err) {
				res.json({
					status	: false,
					error		: 'Failed to sign up.',
					result	: null,
				});
			} else if(userList.length === 0) {
				// sign up
				var
					userCredentials = {
						UserName: username,
						Password: password,
						UserRole: 'AUDIENCE'
					},
					user = new User(userCredentials)
				;
				user.save(function(err) {
					if(err) {
						console.log('ERROR::::', err);
						res.json({
							status	: false,
							error 	: 'Failed to sign up.',
							result 	: null,
						});
					} else {
						var token = {
							username: username,
							userrole: 'AUDIENCE',
						};
						res.json({
							status	: true,
							error		: null,
							result 	: {token: JSON.stringify(token)},
						});
					}
				});
			} else {
				res.json({
					status	: false,
					error 	: 'Username already exists',
					result 	: null,
				});
			}
		});
	},
};
