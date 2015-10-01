import React from 'react';
import { Router, History }  from 'react-router';
import { MenuItem, LeftNav, Styles } from 'material-ui';

const { Colors, Spacing, Typography } = Styles;

const menuItems = [
  { route: '/dashboard', text: 'Dashboard' },
  { route: '/tournaments', text: 'Tournaments' },
  { route: '/leaderboards', text: 'Leader Boards' },
];


const AppLeftNav = React.createClass({
  mixins: [History],

  render() {

    return (
      <LeftNav
        ref="leftNav"
        docked={false}
        isInitiallyOpen={false}
        menuItems={menuItems}
        onChange={this._onLeftNavChange} />
    );
  },

  toggle() {
    this.refs.leftNav.toggle();
  },

  _onLeftNavChange(e, key, payload) {
    this.history.replaceState(null, payload.route);
  },

});

module.exports = AppLeftNav;