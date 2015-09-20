var
	React 			= require('react'),
	Router 			= require('react-router'),
	AuthStore 	= require('../stores/stores.jsx'),
	AuthActions	= require('../actions/actions.jsx'),
	ApiUtils		= require('../../shared/api.jsx')
;

var LoginContainer = React.createClass({
	_doLogin: function(event) {
		event.preventDefault();
		var
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

	componentWillUnmount: function() {
		AuthStore.removeChangeListener(this._onAuthChange);
	},

	_onAuthChange: function() {
		this.setState(this._getAuthStore());
	},	

	render: function() {
		var errors = null;
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
          <label><input ref="password" placeholder="password"/></label><br/>
          <button type="submit">login</button>
          {errors}
        </form>
      </div>
		);
	},
});

module.exports = LoginContainer;