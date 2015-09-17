var Dispatcher = require('../../dispatchers/app-dispatcher.jsx');
var ActionConstants = require('../actions/constants.jsx');
var EventEmitter = require('events').EventEmitter;
var React = require('react/addons');

var CHANGE_EVENT = "change";


var _score = 30;

function _storeScore(scr){
  _score = scr;
}




var Store = React.addons.update(EventEmitter.prototype, { $merge: {
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
    var action = payload.action; // this is our action from handleViewAction
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