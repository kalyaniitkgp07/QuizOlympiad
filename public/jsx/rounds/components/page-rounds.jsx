import React 				from 'react';
import RoundsStore	from '../stores/game-rounds.jsx';
import Actions			from '../actions/actions.jsx';
import ApiUtils			from '../../shared/api.jsx';
import ParamUtils		from '../../shared/param.jsx';
import {
	CircularProgress} from 'material-ui';

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
		const
			roundsResponse 	= this.state.roundsResponse
		;
		let renderHtml = null;
		if(ApiUtils.hasLoaded(roundsResponse)) {
			const allRounds	= roundsResponse.result.roundList[0].GameRounds;
			renderHtml = $.map(allRounds, (roundInfo) => {
				return(
					<div key={roundInfo.RoundIdName}>{roundInfo.RoundDisplayName}</div>
				);
			});
		} else if(ApiUtils.hasFailed(roundsResponse)) {
			// TODO-ALERT: 
		} else {
			renderHtml = <CircularProgress mode="indeterminate" size={1.5} />;
		}

		return (
			<div>
				{renderHtml}
			</div>
		);
	},
});

module.exports = RoundsPage;