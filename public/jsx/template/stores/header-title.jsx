import {EventEmitter}   from 'events';
import React            from 'react/addons';
import Dispatcher       from '../../dispatchers/app-dispatcher.jsx';
import ActionConstants  from '../actions/constants.jsx';

const CHANGE_EVENT = "change";

let _headerTitle = 'Daffodils';

function _storeHeaderTitle(title){
  _headerTitle = title;
}

const Store = React.addons.update(EventEmitter.prototype, { $merge: {
  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback)
  },

  getHeaderTitle: function(){
    return _headerTitle;
  },

  dispatcherIndex: Dispatcher.register(function(payload){
    let action = payload.action;
    switch(action.actionType){
      case ActionConstants.SET_HEADER_TITLE:
      	_storeHeaderTitle(action.data);
        break;
      default:
      	return true;
    }
    Store.emitChange();

    return true;
  }),
}});

module.exports = Store;