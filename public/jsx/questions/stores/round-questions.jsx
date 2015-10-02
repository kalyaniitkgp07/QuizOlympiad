import {EventEmitter}   from 'events';
import React            from 'react/addons';
import ApiUtils         from '../../shared/api.jsx';
import Dispatcher       from '../../dispatchers/app-dispatcher.jsx';
import ActionConstants  from '../actions/constants.jsx';

const CHANGE_EVENT = "change";

let
  _fetchStatus  = ApiUtils.LOADING_STATE.NOT_REQUESTED,
  _fetchError   = null,
  _fetchResult  = null
;

function _storeQuestionsResponse(response) {
  if(response.status) {
    _fetchStatus = response.status;
  }
  if(response.error) {
    _fetchError = response.error;
  }
  if(response.result) {
    _fetchResult = response.result;
  }
}

const Store = React.addons.update(EventEmitter.prototype, { $merge: {
  getQuestionsResponse() {
    return ({
      status  : _fetchStatus,
      error   : _fetchError,
      result  : _fetchResult,
    });
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },

  dispatcherIndex: Dispatcher.register((payload) => {
    let action = payload.action;
    switch(action.actionType){
      case ActionConstants.FETCH_ROUND_QUESTIONS:
        _storeQuestionsResponse({
          status  : ApiUtils.LOADING_STATE.LOADING,
        });
        break;
      case ActionConstants.FETCH_ROUND_QUESTIONS_SUCCESS:
        _storeQuestionsResponse({
          status  : ApiUtils.LOADING_STATE.SUCCESS,
          result  : action.data,
        });
        break;
      case ActionConstants.FETCH_ROUND_QUESTIONS_FAILURE:
        _storeQuestionsResponse({
          status  : ApiUtils.LOADING_STATE.FAILURE,
          error   : action.data,
        });
        break;
      default:
      	return true;
    }
    Store.emitChange();

    return true;
  }),
}});

module.exports = Store;