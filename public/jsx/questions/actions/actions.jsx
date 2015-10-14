import ActionConstants from './constants.jsx';
import Dispatcher      from '../../dispatchers/app-dispatcher.jsx';

const Actions = ({
	fetchRoundQuestions(params) {
		Dispatcher.handleAction({
			actionType	: ActionConstants.FETCH_ROUND_QUESTIONS,
		});
		$.ajax({
			url				: `/api/tournaments/${params.tidname}/games/${params.gidname}/rounds/${params.ridname}/questions`,
			dataType	: 'json',
			method		: 'get',
		}).done((response) => {
			if(response.status) {
				Dispatcher.handleAction({
					actionType	: ActionConstants.FETCH_ROUND_QUESTIONS_SUCCESS,
					data 				: response.result,
				})
			} else {
				Dispatcher.handleAction({
					actionType	: ActionConstants.FETCH_ROUND_QUESTIONS_FAILURE,
					data 				: response.error,
				});
			}
		}).fail(() => {
			Dispatcher.handleAction({
				actionType	: ActionConstants.FETCH_ROUND_QUESTIONS_FAILURE,
				data 				: 'Failed to load rounds.',
			});
		});
	},
});

module.exports = Actions;