'use strict'
var
	bcrypt 			= require('bcryptjs'),
	User 				= require('../../../models/users'),
	USER_ROLES	= require('../../../config/constants').USER_ROLES
;

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
					passHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
					userCredentials = {
						UserName: username,
						Password: passHash,
						UserRole: USER_ROLES.DEFAULT,
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
							userrole: USER_ROLES.DEFAULT,
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
