import React 				from 'react';
import RoundsStore	from '../stores/game-rounds.jsx';
import Actions			from '../actions/actions.jsx';
import ApiUtils			from '../../shared/api.jsx';
import ParamUtils		from '../../shared/param.jsx';

let RoundsPage = React.createClass({
	_getRoundsStore() {
		return ({
			roundsResponse	: RoundsStore.getRoundsResponse(),
		});
	},

	getInitialState() {
		return this._getRoundsStore();
	},

	componentDidMount() {
		RoundsStore.addChangeListener(this._onRoundsChange);
		Actions.fetchGameRounds(this.props.params);
	},

	componentWillReceiveProps(newProps) {
		if(ParamUtils.hasChanged(this.props.params, newProps.params)) {
			Actions.fetchGameRounds(newProps.params);
		}
	},

	componentWillUnmount() {
		RoundsStore.removeChangeListener(this._onRoundsChange);
	},

	_onRoundsChange() {
		this.setState(this._getRoundsStore());
	},

	render() {
		return (
			<div>
				ROUNDS PAGE
			</div>
		);
	},
});

module.exports = RoundsPage;