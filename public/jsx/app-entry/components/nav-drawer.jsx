import React 	from 'react';
import {Link} from 'react-router';

let NavDrawer = React.createClass({
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
	render() {
		return (
      <div className="dqo-drawer mdl-layout__drawer">
        <header className="dqo-drawer-header mdl-color--green-900 mdl-color-text--green-50">
          <i className="material-icons dqo-avatar">account_circle</i>
          <div className="dqo-avatar-dropdown">
            <span>kalyan.sahoo@gmail.com</span>
            <div className="mdl-layout-spacer"></div>
            <button id="accbtn" className="mdl-button mdl-button--icon">
              <i className="material-icons" role="presentation">arrow_drop_down</i>
              <span className="visuallyhidden">Accounts</span>
            </button>
            <ul className="mdl-menu mdl-menu--bottom-right" htmlFor="accbtn">
              <li className="mdl-menu__item">Account</li>
              <li className="mdl-menu__item">Logout</li>
            </ul>
          </div>
        </header>
        <nav className="dqo-navigation mdl-navigation">
          <label className="dqo-navigation__group--overview-links">
            <Link className="mdl-navigation__link active" to="#">
            	<i className="dqo-navigation__icon material-icons" role="presentation">dashboard</i>
            	Dashboard
            </Link>
            <Link className="mdl-navigation__link" to="#">
            	<i className="dqo-navigation__icon fa fa-trophy" role="presentation"></i>
            	Tournaments
            </Link>
            <Link className="mdl-navigation__link" to="#">
            	<i className="dqo-navigation__icon fa fa-line-chart" role="presentation"></i>
            	Leader Boards
            </Link> 
          </label>
          <label className="dqo-navigation__group--daff-site">
            <hr />
            <Link className="mdl-navigation__link" to="#">
            	<i className="dqo-navigation__icon material-icons" role="presentation">label</i>
            	About
            </Link>
            <Link className="mdl-navigation__link" to="#">
            	<i className="dqo-navigation__icon material-icons" role="presentation">event</i>
            	Programme
            </Link>
            <Link className="mdl-navigation__link" to="#">
            	<i className="dqo-navigation__icon material-icons" role="presentation">feedback</i>
            	Feedback
            </Link>
          </label>
        </nav>
      </div>			
		);
	},
});

module.exports = NavDrawer;