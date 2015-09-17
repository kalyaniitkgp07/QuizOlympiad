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
      <div className="header">
        <div className="container">
          <div className="header-nav">
            <nav className="navbar navbar-default">
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle collapsed"
                  data-toggle="collapse"
                  data-target="#bs-example-navbar-collapse-1"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="/"><i className="fa fa-rocket" aria-hidden="true"></i><span> D</span>affodils</a>
              </div>
              <div className="collapse navbar-collapse nav-wil" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">
                  <li className="hvr-bounce-to-bottom" data-toggle="collapse" data-target=".navbar-collapse">
                    <Link to="games">Games</Link>
                  </li>
                  <li className="hvr-bounce-to-bottom" data-toggle="collapse" data-target=".navbar-collapse">
                    <Link to="about">About</Link>
                  </li>
                  <li className="hvr-bounce-to-bottom" data-toggle="collapse" data-target=".navbar-collapse">
                    <Link to="scores">Scores</Link>
                  </li>
                  <li className="hvr-bounce-to-bottom" data-toggle="collapse" data-target=".navbar-collapse">
                    <Link to="contact">Contact</Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Header;
