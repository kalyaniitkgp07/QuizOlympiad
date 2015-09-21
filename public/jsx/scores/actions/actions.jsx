let
	ActionConstants = require('./constants.jsx'),
	Dispatcher = require('../../dispatchers/app-dispatcher.jsx')
;

let Actions = {
  storeScore: function(data) {
  	Dispatcher.handleAction({
      actionType: ActionConstants.STORE_SCORE,
      data			: data,
    });
  },
}

module.exports = Actions;