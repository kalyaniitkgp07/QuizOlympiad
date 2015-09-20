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
					error		: 'Failed to login.',
					result	: null,
				});
			} else {
				if(userList.length === 0) {
					res.json({
						status	: false,
						error		: 'User not found.',
						result	: null,
					});
				} else if(userList.length > 1) {
					res.json({
						status	: false,
						error		: 'More than one user found.',
						result	: null,
					});
				} else if(userList[0].toObject().Password !== password) {
					res.json({
						status	: false,
						error		: 'Wrong password.',
						result	: null,
					});
				} else {
					var 
						user = userList[0].toObject(),
						token = {
							username 	: user.UserName,
							userrole	: user.UserRole,
						}
					;
					res.json({
						status	: true,
						error 	: null,
						result 	: {
							token	: JSON.stringify(token),
						},
					});
				}
			}
		});
	},
};
