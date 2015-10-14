import React 					from 'react';
import GamesStore			from '../stores/tour-games.jsx';
import Actions				from '../actions/actions.jsx';
import ApiUtils				from '../../shared/api.jsx';
import SortUtils			from '../../shared/sort.jsx';
import ParamUtils			from '../../shared/param.jsx';
import GameDescCards 	from './GameDescCards.jsx';
import {
	CircularProgress} 	from 'material-ui';

let GamesPage = React.createClass({
	_getGamesStore() {
		return ({
			gamesResponse	: GamesStore.getGamesResponse(),
		});
	},

	getInitialState() {
		return this._getGamesStore();
	},

	componentDidMount() {
		GamesStore.addChangeListener(this._onGamesChange);
		Actions.fetchTournamentGames(this.props.params);
	},

	componentWillReceiveProps(newProps) {
		if(ParamUtils.hasChanged(this.props.params, newProps.params)) {
			Actions.fetchGameRounds(newProps.params);
		}
	},

	componentWillUnmount() {
		GamesStore.removeChangeListener(this._onGamesChange);
	},

	_onGamesChange() {
		this.setState(this._getGamesStore());
	},

	render() {
		const
			gamesResponse = this.state.gamesResponse
		;
		let renderHtml = null;
		if(ApiUtils.hasLoaded(gamesResponse)) {
			renderHtml = (
				<GameDescCards
					gameList = {gamesResponse.result.gameList}
				/>
			);
		} else if(ApiUtils.hasFailed(gamesResponse)) {
			// TODO-ALERT: 
		} else {
			renderHtml = (
				<div className="row center-xs">
					<CircularProgress mode="indeterminate" size={1.5} />
				</div>
			);
		}

		return (
			<div className="page-games">
				{renderHtml}
				<br />
				<br />			
			</div>
		);
	},
});

module.exports = GamesPage;