import ActionConstants from './constants.jsx';
import Dispatcher      from '../../dispatchers/app-dispatcher.jsx';

const Actions = ({
	fetchTournamentGames(params) {
		Dispatcher.handleAction({
			actionType	: ActionConstants.FETCH_TOURNAMENT_GAMES,
		});
		$.ajax({
			url				: `/api/tournaments/${params.tidname}/games`,
			dataType	: 'json',
			method		: 'get',
		}).done((response) => {
			if(response.status) {
				Dispatcher.handleAction({
					actionType	: ActionConstants.FETCH_TOURNAMENT_GAMES_SUCCESS,
					data 				: response.result,
				})
			} else {
				Dispatcher.handleAction({
					actionType	: ActionConstants.FETCH_TOURNAMENT_GAMES_FAILURE,
					data 				: response.error,
				});
			}
		}).fail(() => {
			Dispatcher.handleAction({
				actionType	: ActionConstants.FETCH_TOURNAMENT_GAMES_FAILURE,
				data 				: 'Failed to load games.',
			});
		});
	},
});

module.exports = Actions;