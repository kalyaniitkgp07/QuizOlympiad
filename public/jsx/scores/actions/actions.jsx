/** @jsx React.DOM */
var
	ActionConstants = require('./constants.jsx'),
	Dispatcher = require('../../dispatchers/app-dispatcher.jsx')
;

var Actions = {
  storeScore: function(data) {
  	Dispatcher.handleAction({
      actionType: ActionConstants.STORE_SCORE,
      data			: data,
    });
  },
}

module.exports = Actions;