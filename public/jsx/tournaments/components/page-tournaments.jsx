import React 						from 'react';
import {Link}						from 'react-router';
import ApiUtils					from '../../shared/api.jsx';
import Actions					from '../actions/actions.jsx';
import {LEVELS}					from '../../shared/level-link.jsx';
import {
	getCardActionLabel,
	getCardActionLink}		from '../../shared/card-actions.jsx';
import TemplateActions	from '../../template/actions/actions.jsx';
import TournamentsStore from '../stores/tours-desc.jsx';

// import required material uis
import {
	Avatar,
	CircularProgress,
	Card,
	CardHeader,
	CardText,
	CardActions,
	FlatButton
}	from 'material-ui';

const TournamentsPage = React.createClass({
	contextTypes: {
		authToken: React.PropTypes.object,
	},

	_getCardActionInfo(tournament) {
		tournament.IsInLevel   			= tournament.IsInTournament;
		tournament.LevelType   			= LEVELS.TOURNAMENT;
		tournament.LevelLinkParams 	= [tournament.TournamentIdName];
		const
			label     = getCardActionLabel(tournament),
			link 	    = getCardActionLink(tournament)
		;
		
		return ({
			label,
			link
		})
	},

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
					<div className="row center-xs">
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
					const
						tourIcon      = tournament.TournamentDisplayName.charAt(0),
						avatar        = <Avatar>{tourIcon}</Avatar>,
						{label, link} = this._getCardActionInfo(tournament),
						linkElement   = <Link to={link} />
					;
					return (
						<div className="col-xs-12 col-sm-6 col-md-4" key={tournament.TournamentIdName}>
							<div className="box">
								<Card className="tournament-desc-card">
									<CardHeader
										className = "card-header"
										title     = {tournament.TournamentDisplayName}
										avatar    = {avatar}
									/>
									<CardText className="card-text">
										{tournament.TournamentDescription}
									</CardText>
									<CardActions className="card-actions">
										<FlatButton
											secondary        = {true}
											label            = {label}
											containerElement = {linkElement}
											linkButton       = {true}
										/>
									</CardActions>
								</Card>
							</div>
						</div>
					);
				});
				break;
		}

		return (
			<div className="page-tournaments row">
				{renderHtml}
				<br />
				<br />
			</div>
		);
	},
});

module.exports = TournamentsPage;