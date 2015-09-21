let
  EventEmitter    = require('events').EventEmitter,
  React           = require('react/addons'),
  Dispatcher      = require('../../dispatchers/app-dispatcher.jsx'),
  ActionConstatns = require('../actions/constants.jsx'),
  LocalStorage    = require('../../shared/local-storage.jsx'),
  STORAGE_KEYS    = require('../../shared/storage-keys.jsx'),
  ApiUtils        = require('../../shared/api.jsx')
;

let CHANGE_EVENT = "change";

let
  _loginStatus  = !!LocalStorage.get(STORAGE_KEYS.AUTH_TOKEN)
                    ? ApiUtils.LOADING_STATE.SUCCESS
                    : ApiUtils.LOADING_STATE.FAILURE,
  _loginError   = null,
  _authToken    = LocalStorage.get(STORAGE_KEYS.AUTH_TOKEN)
;

function _storeLoginData(response) {
  _loginStatus = response.status;
  _loginError  = response.error;
  _authToken   = response.result;
  if(ApiUtils.hasLoaded(response)) {
    LocalStorage.update(STORAGE_KEYS.AUTH_TOKEN, response.result);
  } else {
    LocalStorage.remove(STORAGE_KEYS.AUTH_TOKEN);
  }
}

let AuthStore = React.addons.update(EventEmitter.prototype, {$merge: {
  getLoginStatus: function() {
    return _loginStatus;  
  },

  getLoginError: function() {
    return _loginError;
  },

  getAuthToken: function() {
    return _authToken;
  },

  isLoggedIn: function() {
    return ApiUtils.hasLoaded({status: _loginStatus});
  },

  emitChange:function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener:function(callback){
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener:function(callback){
    this.removeListener(CHANGE_EVENT, callback)
  },

  dispatcherIndex:Dispatcher.register(function(payload){
    let action = payload.action;
    switch(action.actionType){
      case ActionConstatns.AUTH_LOG_IN:
        _storeLoginData({
          status  : ApiUtils.LOADING_STATE.LOADING,
          error   : null,
          result  : null,
        });
        break;
      case ActionConstatns.AUTH_LOG_IN_SUCCESS:
        _storeLoginData({
          status  : ApiUtils.LOADING_STATE.SUCCESS,
          error   : null,
          result  : action.data.token,
        });
        break;
      case ActionConstatns.AUTH_LOG_IN_FAILURE:
        _storeLoginData({
          status  : ApiUtils.LOADING_STATE.FAILURE,
          error   : action.data,
          result  : null,
        });
        break;
      case ActionConstatns.AUTH_LOG_OUT:
        _storeLoginData({
          status  : ApiUtils.LOADING_STATE.FAILURE,
          error   : null,
          result  : null,
        });
        break;
      default:
        return true;
    }
    AuthStore.emitChange();

    return true;
  })
}});

module.exports = AuthStore;