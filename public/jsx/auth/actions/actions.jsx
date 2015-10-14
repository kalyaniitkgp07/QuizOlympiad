import ActionConstants from './constants.jsx';
import Dispatcher      from '../../dispatchers/app-dispatcher.jsx';

let AuthActions = {
  doLogin: function(username, password) {
    Dispatcher.handleAction({
      actionType: ActionConstants.AUTH_LOG_IN,
    });
    $.ajax({
      url       : '/api/login',
      data      : {
        username: username,
        password: password,
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

  doLogout: function() {
    Dispatcher.handleAction({
      actionType  : ActionConstants.AUTH_LOG_OUT,
    });
    $.ajax({
      url       : '/api/logout',
      dataType  : 'json',
      method    : 'get',
    });
  },
};

module.exports = AuthActions;