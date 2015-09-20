var
  EventEmitter    = require('events').EventEmitter,
  React           = require('react/addons'),
  Dispatcher      = require('../../dispatchers/app-dispatcher.jsx'),
  ActionConstatns = require('../actions/constants.jsx'),
  ApiUtils        = require('../../shared/api.jsx'),
  LocalStorage    = require('../../shared/local-storage.jsx'),
  STORAGE_KEYS    = require('../../shared/storage-keys.jsx')
;

var
	CHANGE_EVENT		= 'change',
	_registerStatus = ApiUtils.LOADING_STATE.NOT_REQUESTED,
	_registerError	= null,
	_authToken			= null
;

function _storeRegisterData(response) {
  _registerStatus = response.status;
  _registerError  = response.error;
  _authToken   		= response.result;
  if(ApiUtils.hasLoaded(response)) {
    LocalStorage.update(STORAGE_KEYS.AUTH_TOKEN, response.result);
  }
}

var RegisterStore = React.addons.update(EventEmitter.prototype, {$merge: {
  getRegisterStatus: function() {
    return _registerStatus;  
  },

  getRegisterError: function() {
    return _registerError;
  },

  getAuthToken: function() {
    return _authToken;
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

  dispatcherIndex:Dispatcher.register(function(payload) {
    var action = payload.action;
    switch(action.actionType) {
      case ActionConstatns.USER_REGISTER:
        _storeRegisterData({
          status  : ApiUtils.LOADING_STATE.LOADING,
          error   : null,
          result  : null,
        });
        break;
      case ActionConstatns.USER_REGISTER_SUCCESS:
        _storeRegisterData({
          status  : ApiUtils.LOADING_STATE.SUCCESS,
          error   : null,
          result  : action.data.token,
        });
        break;
      case ActionConstatns.USER_REGISTER_FAILURE:
        _storeRegisterData({
          status  : ApiUtils.LOADING_STATE.FAILURE,
          error   : action.data,
          result  : null,
        });
        break;
      default:
        return true;
    }
    RegisterStore.emitChange();

    return true;
  }),
}});

module.exports = RegisterStore;