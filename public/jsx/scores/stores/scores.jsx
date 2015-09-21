let Dispatcher = require('../../dispatchers/app-dispatcher.jsx');
let ActionConstants = require('../actions/constants.jsx');
let EventEmitter = require('events').EventEmitter;
let React = require('react/addons');

let CHANGE_EVENT = "change";


let _score = 30;

function _storeScore(scr){
  _score = scr;
}




let Store = React.addons.update(EventEmitter.prototype, { $merge: {
  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback)
  },

  getScore: function(){
    return _score;
  },

  dispatcherIndex: Dispatcher.register(function(payload){
    let action = payload.action; // this is our action from handleViewAction
    switch(action.actionType){
      case ActionConstants.STORE_SCORE:
      	_storeScore(action.data);
        break;
      default:
      	return true;
    }
    Store.emitChange();

    return true;
  }),
}});

module.exports = Store;