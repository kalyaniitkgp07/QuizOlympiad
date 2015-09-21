let React = require('react');
let Router = require('react-router');
let Route = Router.Route;
let RouteHandler = Router.RouteHandler;
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
    this.setState(AuthStore.getState());
  },
  componentWillMount: function () {
    AuthStore.authOnChangeHeader(this.setStateOnAuth);
  },
  */
  render: function () {
    //let loginOrOut = this.state.loggedIn ?
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
                  <li className="hvr-bounce-to-bottom">
                    <Link to="games">Games</Link>
                  </li>
                  <li className="hvr-bounce-to-bottom">
                    <Link to="about">About</Link>
                  </li>
                  <li className="hvr-bounce-to-bottom">
                    <Link to="scores">Scores</Link>
                  </li>
                  <li className="hvr-bounce-to-bottom">
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