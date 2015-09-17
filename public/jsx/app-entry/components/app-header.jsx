/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
//var auth = require('../../stores/app-auth'); // TODO / USE DISPATCHER & ACTIONS
//var Login = require('../auth/app-login');
//var AppActions = require('../../actions/app-actions.js');
//var AuthStore = require('../../stores/app-auth.js');
var Link = Router.Link;


var Header = React.createClass({
  /*
  getInitialState: function () {
    return AuthStore.getState();
  },
  setStateOnAuth: function (loggedIn) {
    this.setState(AuthStore.getState());
  },
  componentWillMount: function () {
    AuthStore.authOnChangeHeader(this.setStateOnAuth);
  },
  */
  render: function () {
    //var loginOrOut = this.state.loggedIn ?
    //  <Link to="logout">Log out</Link> :
    //  <Link to="login">Sign in</Link>;
    return (
      <div>
        <ul className="nav nav-tabs">
          <li><Link to="games">Games</Link></li>
          <li><Link to="about">About</Link></li>
          <li><Link to="scores">Scores</Link></li>
          <li><Link to="contact">Contact</Link></li>
        </ul>
        <br/>
      </div>
    );
  }
});

module.exports = Header;
