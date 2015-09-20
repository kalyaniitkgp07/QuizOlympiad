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
			var response = {};
			if(err) {
				response = {
					status	: false,
					error		: 'Failed to login.',
					result	: null,
				};
			} else {
				if(userList.length === 0) {
					response = {
						status	: false,
						error		: 'User not found.',
						result	: null,
					};
				} else if(userList.length > 1) {
					response = {
						status	: false,
						error		: 'More than one user found.',
						result	: null,
					};
				} else if(userList[0].toObject().Password !== password) {
					response = {
						status	: false,
						error		: 'Wrong password.',
						result	: null,
					};
				} else {
					var 
						user = userList[0].toObject(),
						token = {
							username 	: user.UserName,
							userrole	: user.UserRole,
						}
					;
					response = {
						status	: true,
						error 	: null,
						result 	: {
							token	: JSON.stringify(token),
						},
					};
				}
			}
			res.json(response);
		});
	},
};
