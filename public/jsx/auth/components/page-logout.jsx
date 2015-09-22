import React 				from 'react';
import { History }	from 'react-router';
import AuthActions 	from '../actions/actions.jsx';

let Login = React.createClass({
	mixins: [ History ],
	
	componentDidMount: function() {
		AuthActions.doLogout();
		this.history.replaceState(null, '/login');
	},

	render: function() {
		return(
			<div/>
		);
	}
});

module.exports = Login;