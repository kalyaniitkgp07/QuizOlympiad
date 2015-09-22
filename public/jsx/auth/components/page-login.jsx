import React 								from 'react';
import { Router, History }	from 'react-router';
import AuthStore 						from '../stores/stores.jsx';
import AuthActions					from '../actions/actions.jsx';
import ApiUtils							from '../../shared/api.jsx';

let LoginContainer = React.createClass({
	mixins: [History],

	_doLogin: function(event) {
		event.preventDefault();
		let
			username = React.findDOMNode(this.refs.username).value,
			password = React.findDOMNode(this.refs.password).value
		;
		AuthActions.doLogin(username, password);
	},

	_getAuthStore: function() {
		return ({
			loginStatus : AuthStore.getLoginStatus(),
			loginError	: AuthStore.getLoginError(),
		});
	},

	getInitialState: function() {
		return this._getAuthStore();
	},

	componentDidMount: function() {
		AuthStore.addChangeListener(this._onAuthChange);
	},

	componentDidUpdate: function() {
		if(AuthStore.isLoggedIn()) {
			var { location } = this.props;
		
      if (location.state && location.state.nextState) {
        this.history.replaceState(null, location.state.nextState);
      } else {
        this.history.replaceState(null, '/contact');
      }
		}
	},

	componentWillUnmount: function() {
		AuthStore.removeChangeListener(this._onAuthChange);
	},

	_onAuthChange: function() {
		this.setState(this._getAuthStore());
	},	

	render: function() {
		let errors = null;
		switch(this.state.loginStatus) {
			case ApiUtils.LOADING_STATE.LOADING:
				errors = 'loading...';
				break;
			case ApiUtils.LOADING_STATE.FAILURE:
				errors = this.state.loginError;
				break;
			case ApiUtils.LOADING_STATE.SUCCESS:
				errors = 'You are logged in';
				break;
		}
		return (
      <div>
        <form onSubmit={this._doLogin}>
          <label><input ref="username" placeholder="username"/></label><br/>
          <label><input ref="password" placeholder="password" type="password"/></label><br/>
          <button type="submit">login</button>
          {errors}
        </form>
      </div>
		);
	},
});

module.exports = LoginContainer;