let
	React = require('react'),
	ScoreStore = require('../stores/scores.jsx'),
	Actions	= require('../actions/actions.jsx')
;

let ScoresPage = React.createClass({
	_generateScore: function() {
		let scr = Math.random();
		Actions.storeScore(scr);
	},
	_getScoreStore: function() {
		return ({
			score: ScoreStore.getScore(),
		});
	},
	getInitialState: function() {
		return this._getScoreStore();
	},
	componentDidMount: function() {
		ScoreStore.addChangeListener(this._onScoreChange);
	},
	componentWillUnmount: function() {
		ScoreStore.removeChangeListener(this._onScoreChange);
	},
	_onScoreChange: function() {
		this.setState(this._getScoreStore());
	},
	render: function() {
		return (
			<div>
				SCORES PAGE
				<br />
				Current Score: {this.state.score}
				<br />
				<button type="button" className="btn btn-default" onClick={this._generateScore}>Generate Score</button>
			</div>
		);
	}
});

module.exports = ScoresPage;