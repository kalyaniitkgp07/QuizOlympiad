let React = require('react');
let Router = require('react-router');
//let Route = Router.Route;
//let RouteHandler = Router.RouteHandler;
//let auth = require('../../stores/app-auth'); // TODO / USE DISPATCHER & ACTIONS
//let Login = require('../auth/app-login');
//let AppActions = require('../../actions/app-actions.js');
//let AuthStore = require('../../stores/app-auth.js');
let Link = Router.Link;


let Header = React.createClass({
  /*
  getInitialState: function () {
    return AuthStore.getState();
  },
  setStateOnAuth: function (loggedIn) {
    this.setState(AuthStore.getState());`
  },
  componentWillMount: function () {
    AuthStore.authOnChangeHeader(this.setStateOnAuth);
  },
  */
  componentDidUpdate: function() {
    // This upgrades all upgradable components (i.e. with 'mdl-js-*' class)
    componentHandler.upgraderDom();

    // We could have done this manually for each component
    /*
     * var submitButton = this.refs.submit.getDOMNode();
     * componentHandler.upgradeElement(submitButton, "MaterialButton");
     * componentHandler.upgradeElement(submitButton, "MaterialRipple");
     */
  },
  render: function () {
    //let loginOrOut = this.state.loggedIn ?
    //  <Link to="logout">Log out</Link> :
    //  <Link to="login">Sign in</Link>;
    // TODO: setHeader title according to the pagee
    return (
      <header className="mdl-layout__header mdl-color-text--grey-100">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">Daffodils</span>
          <div className="mdl-layout-spacer"></div>
        </div>
      </header>
    );
  }
});

module.exports = Header;