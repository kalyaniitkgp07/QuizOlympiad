import React 				from 'react';
import GamesStore		from '../stores/tour-games.jsx';
import Actions			from '../actions/actions.jsx';
import ApiUtils			from '../../shared/api.jsx';
import ParamUtils		from '../../shared/param.jsx';
import {FlatButton} from 'material-ui';

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
		return (
			<div>
				GAMES PAGE
				<FlatButton label="Default" />
			</div>
		);
	},
});

module.exports = GamesPage;