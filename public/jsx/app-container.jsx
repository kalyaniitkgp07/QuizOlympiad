import React 		from 'react';
import {Router} from 'react-router';
import routes		from './routes.jsx';
import AppTheme from './template/components/theme.jsx';

import {Styles} from 'material-ui';
const	ThemeManager = Styles.ThemeManager;

const AppContainer = React.createClass({
	childContextTypes: {
		muiTheme: React.PropTypes.object,	
	},
	getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(AppTheme),
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