let
	React 			= require('react'),
	AuthActions = require('../actions/actions.jsx')
;

let Login = React.createClass({
	componentDidMount: function() {
		AuthActions.doLogout();
	},

	render: function() {
		return(
			<div/>
		);
	}
});

module.exports = Login;