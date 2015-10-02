import ActionConstants from './constants.jsx';
import Dispatcher      from '../../dispatchers/app-dispatcher.jsx';

const Actions = ({
	fetchGameRounds(params) {
		Dispatcher.handleAction({
			actionType	: ActionConstants.FETCH_GAME_ROUNDS,
		});
		$.ajax({
			url				: `/api/tournaments/${params.tidname}/games/${params.gidname}/rounds`,
			dataType	: 'json',
			method		: 'get',
		}).done((response) => {
			if(response.status) {
				Dispatcher.handleAction({
					actionType	: ActionConstants.FETCH_GAME_ROUNDS_SUCCESS,
					data 				: response.result,
				})
			} else {
				Dispatcher.handleAction({
					actionType	: ActionConstants.FETCH_GAME_ROUNDS_FAILURE,
					data 				: response.error,
				});
			}
		}).fail(() => {
			Dispatcher.handleAction({
				actionType	: ActionConstants.FETCH_GAME_ROUNDS_FAILURE,
				data 				: 'Failed to load rounds.',
			});
		});
	},
});

module.exports = Actions;