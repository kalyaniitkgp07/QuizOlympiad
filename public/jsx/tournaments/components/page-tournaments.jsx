import React 						from 'react';
import ApiUtils					from '../../shared/api.jsx';
import Actions					from '../actions/actions.jsx';
import TemplateActions	from '../../template/actions/actions.jsx';
import TournamentsStore from '../stores/tours-desc.jsx';

// import required material uis
import {
	CircularProgress,
	Card,
	CardHeader,
	CardText
}	from 'material-ui';

const TournamentsPage = React.createClass({
	_getTournamentsStore() {
		return ({
			tournamentsResponse	: TournamentsStore.getTournamentsResponse(),
		});
	},

	getInitialState() {
		return this._getTournamentsStore();
	},

	componentDidMount() {
		TournamentsStore.addChangeListener(this._onTournamentsChange);
		TemplateActions.setHeaderTitle('Tournaments');
		Actions.fetchAllTournaments();
	},

	componentWillUnmount() {
		TournamentsStore.removeChangeListener(this._onTournamentsChange);
	},

	_onTournamentsChange() {
		this.setState(this._getTournamentsStore());
	},

	render() {
		const tournamentsResponse = this.state.tournamentsResponse;
		let renderHtml = null;
		switch(tournamentsResponse.status) {
			case ApiUtils.LOADING_STATE.LOADING:
				// loading
				renderHtml = (
					<div>
						<CircularProgress mode="indeterminate" size={1.5} />
					</div>
				);
				break;
			case ApiUtils.LOADING_STATE.FAILURE:
				// TODO: adopt some alert method
				break;
			case ApiUtils.LOADING_STATE.SUCCESS:
				// actual content
				renderHtml = $.map(tournamentsResponse.result.tournamentList, (tournament) => {
					return (
						<div className="col-xs-12 col-sm-6 col-md-4" key={tournament.TournamentIdName}>
							<div className="box">
								<Card>
									<CardHeader
										title = {tournament.TournamentDisplayName} />
									<CardText>
										{tournament.TournamentDescription}
									</CardText>
								</Card>
							</div>
						</div>
					);
				});
				break;
		}

		return (
			<div>
				{renderHtml}
			</div>
		);
	},
});

module.exports = TournamentsPage;