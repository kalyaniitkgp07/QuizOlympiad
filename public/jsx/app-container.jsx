import React 			from 'react';
import {Router}		from 'react-router';
import routes			from './routes.jsx';
import AppTheme 	from './template/components/theme.jsx';
import AuthStore 	from './auth/stores/stores.jsx';
import {Styles} 	from 'material-ui';
const	ThemeManager = Styles.ThemeManager;

const AppContainer = React.createClass({
	childContextTypes: {
		muiTheme  : React.PropTypes.object,
		authToken : React.PropTypes.object,
	},

	getChildContext() {
    // TODO: investigate why setState throws warning
    // component already unmounted
    return {
      muiTheme  : ThemeManager.getMuiTheme(AppTheme),
      authToken : AuthStore.getAuthToken(),
    };
  },

  render() {
		return (
			<Router>
				{routes}
			</Router>
		);
	},
});

module.exports = AppContainer;