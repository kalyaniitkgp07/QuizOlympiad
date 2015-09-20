'use strict'
var
	bcrypt 	= require('bcryptjs'),
	User 		= require('../../../models/users')
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
		User.findOne(query, projection, function(err, user) {
			if(err) {
				res.json({
					status	: false,
					error		: 'Failed to login.',
					result	: null,
				});
			} else if(!user) {
				res.json({
					status	: false,
					error		: 'User not found.',
					result	: null,
				});
			} else if(!bcrypt.compareSync(password, user.Password)) {
				res.json({
					status	: false,
					error		: 'Wrong password.',
					result	: null,
				});
			} else {
				var
					token = {
						username 	: user.UserName,
						userrole	: user.UserRole,
					}
				;
				req.session.userId = user._id;
				res.json({
					status	: true,
					error 	: null,
					result 	: {
						token	: JSON.stringify(token),
					},
				});
			}
		});
	},
};
