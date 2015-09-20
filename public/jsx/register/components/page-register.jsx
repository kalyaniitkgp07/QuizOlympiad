var
	React 					= require('react'),
	//Router 				= require('react-router'),
	RegisterActions	= require('../actions/actions.jsx')
	RegisterStore 	= require('../stores/stores.jsx'),
	ApiUtils				= require('../../shared/api.jsx')
;

var RegisterContainer = React.createClass({
	 _doRegister: function(event) {
	 	event.preventDefault();
	 	var
	 		username 		= React.findDOMNode(this.refs.username).value,
	 		password 		= React.findDOMNode(this.refs.password).value,
	 		confirmpass = React.findDOMNode(this.refs.confirmpass).value
	 	;
	 	RegisterActions.doRegister({
	 		username,
	 		password,
	 		confirmpass,
	 	})
	},

	_getRegisterStore: function() {
	 	return ({
	 		registerStatus	: RegisterStore.getRegisterStatus(),
	 		registerError		: RegisterStore.getRegisterError(),
	 	});
	},

	getInitialState: function() {
	 	return this._getRegisterStore();
	},

	componentDidMount: function() {
		RegisterStore.addChangeListener(this._onRegisterChange);
	},

	componentWillUnmount: function() {
		RegisterStore.removeChangeListener(this._onRegisterChange);
	},

	_onRegisterChange: function() {
	 	this.setState(this._getRegisterStore());
	},	

	render: function() {
		var errors = null;
		switch(this.state.registerStatus) {
		 	case ApiUtils.LOADING_STATE.LOADING:
		 		errors = 'loading...';
		 		break;
		 	case ApiUtils.LOADING_STATE.FAILURE:
		 		errors = this.state.registerError;
		 		break;
		 	case ApiUtils.LOADING_STATE.SUCCESS:
		 		errors = 'You are logged in';
		 		break;
		}
		return (
      <div>
        <form onSubmit={this._doRegister}>
          <label><input ref="username" placeholder="username"/></label><br />
          <label><input ref="password" placeholder="password" type="password"/></label><br />
          <label><input ref="confirmpass" placeholder="confirm password" type="password"/></label><br />
          <button type="submit">Sign up</button>
          {errors}
        </form>
      </div>
		);
	},
});

module.exports = RegisterContainer;