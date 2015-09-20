var
  ActionConstants = require('./constants.jsx'),
  Dispatcher      = require('../../dispatchers/app-dispatcher.jsx'),
  CSRFToken       = require('../../shared/csrf.jsx'),
  Validator				= require('../../shared/validator.jsx')
;

var RegisterActions = {
	doRegister: function(regArgs) {
		var validateStatus = Validator.register(regArgs);
		if(validateStatus.status) {
	 		// sign up
	 		Dispatcher.handleAction({
	 			actionType: ActionConstants.USER_REGISTER,
	 		});
	 		$.ajax({
	 			url 			: '/api/register',
	 			data			: {
	 				username: regArgs.username,
	 				password: regArgs.password,
	 				_csrf		: CSRFToken.get()
	 			},
	 			dataType	: 'json',
	 			method		: 'post',
	 		}).done(function(response) {
	 			if(response.status) {
	 				Dispatcher.handleAction({
	 					actionType: ActionConstants.USER_REGISTER_SUCCESS,
	 					data			: response.result,
	 				});
	 			} else {
	 				Dispatcher.handleAction({
	 					actionType: ActionConstants.USER_REGISTER_FAILURE,
	 					data 			: response.error,
	 				});
	 			}
	 		}).fail(function() {
	 			Dispatcher.handleAction({
	 				actionType: ActionConstants.USER_REGISTER_FAILURE,
	 				data 			: 'Failed to sign up',
	 			});
	 		});
	 	} else {
	 		// fail sign up
	 		Dispatcher.handleAction({
	 			actionType: ActionConstants.USER_REGISTER_FAILURE,
	 			data			: validateStatus.error,
	 		});
	 	}
	},
};

module.exports = RegisterActions;