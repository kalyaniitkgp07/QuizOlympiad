import ActionConstants from './constants.jsx';
import Dispatcher      from '../../dispatchers/app-dispatcher.jsx';

const Actions = {
	fetchAllTournaments() {
		Dispatcher.handleAction({
			actionType	: ActionConstants.FETCH_ALL_TOURNAMENTS,
		});
		$.ajax({
			url				: '/api/tournaments',
			dataType	: 'json',
			method		: 'get',
		}).done((response) => {
			if(response.status) {
				Dispatcher.handleAction({
					actionType	: ActionConstants.FETCH_ALL_TOURNAMENTS_SUCCESS,
					data 				: response.result,
				})
			} else {
				Dispatcher.handleAction({
					actionType	: ActionConstants.FETCH_ALL_TOURNAMENTS_FAILURE,
					data 				: response.error,
				});
			}
		}).fail(() => {
			Dispatcher.handleAction({
				actionType	: ActionConstants.FETCH_ALL_TOURNAMENTS_FAILURE,
				data 				: 'Failed to load tournaments.',
			});
		});
	},
};

module.exports = Actions;
