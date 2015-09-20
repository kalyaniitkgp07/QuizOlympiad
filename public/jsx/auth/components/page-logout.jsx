var
	React 			= require('react'),
	AuthActions = require('../actions/actions.jsx')
;

var Login = React.createClass({
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