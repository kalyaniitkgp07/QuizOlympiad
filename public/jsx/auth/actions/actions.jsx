var
  ActionConstants = require('./constants.jsx'),
  Dispatcher      = require('../../dispatchers/app-dispatcher.jsx'),
  CSRFToken       = require('../../shared/csrf.jsx')
;


var AuthActions = {
  doLogin: function(username, password) {
    Dispatcher.handleAction({
      actionType: ActionConstants.AUTH_LOG_IN,
    });
    $.ajax({
      url       : '/api/login',
      data      : {
        username: username,
        password: password,
        _csrf   : CSRFToken.get()
      },
      dataType  : 'json',
      method    : 'post',
    }).done(function(response) {
      if(response.status) {
        Dispatcher.handleAction({
          actionType  : ActionConstants.AUTH_LOG_IN_SUCCESS,
          data        : response.result,
        });
      } else {
        Dispatcher.handleAction({
          actionType  : ActionConstants.AUTH_LOG_IN_FAILURE,
          data        : response.error,
        });
      }
    }).fail(function() {
      Dispatcher.handleAction({
        actionType  : ActionConstants.AUTH_LOG_IN_FAILURE,
        data        : 'Failed to login',
      });
    });
  },
}

module.exports = AuthActions;