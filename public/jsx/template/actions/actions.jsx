import ActionConstants 	from './constants.jsx';
import Dispatcher 			from '../../dispatchers/app-dispatcher.jsx';

let Actions = {
  setHeaderTitle: function(title) {
  	Dispatcher.handleAction({
      actionType	: ActionConstants.SET_HEADER_TITLE,
      data				: title,
    });
  },
}

module.exports = Actions;