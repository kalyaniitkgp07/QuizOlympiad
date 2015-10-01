import React from 'react/addons';
import {Router} from 'react-router';

import 
	{	AppBar,
    AppCanvas,
    FontIcon,
    IconButton,
    EnhancedButton,
    Menu,
    Mixins,
    RaisedButton,
    Styles,
    Tab,
    Tabs,
    Paper
  } from 'material-ui';

const
	{ Colors, Spacing, Typography } = Styles,
	ThemeManager 										= Styles.ThemeManager,
	DefaultRawTheme 								= Styles.LightRawTheme
;
import AppLeftNav       from './left-nav.jsx';
import HeaderTitleStore from '../stores/header-title.jsx';
import AppTheme         from './theme.jsx'

const Master = React.createClass({
  _getAppHeader() {
    return (
      <AppBar
        onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap}
        title={this.state.headerTitle}
        zDepth={0}
        className="dqo-app-header" />
    );
  },

  _getMuiTheme() {
    return ({
      muiTheme: ThemeManager.getMuiTheme(AppTheme),
    });
  },

  _getHeaderTitleStore() {
    return ({
      headerTitle: HeaderTitleStore.getHeaderTitle(),
    });
  },

  getInitialState () {
    return ($.extend({},
      this._getMuiTheme(),
      this._getHeaderTitleStore()
    ));
  },

  childContextTypes : {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },
  
  componentDidMount() {
    HeaderTitleStore.addChangeListener(this._onHeaderTitleChange);
  },
  
  componentWillUnmount() {
    HeaderTitleStore.removeChangeListener(this._onHeaderTitleChange);
  },
  
  _onHeaderTitleChange() {
    this.setState(this._getHeaderTitleStore());
  },

  _onLeftIconButtonTouchTap() {
    this.refs.leftNav.toggle();
  },

	render() {
		return (
      <AppCanvas>
        <header>
          {this._getAppHeader()}
        </header>
        <main>
          {this.props.children}
        </main>
        <nav>
          <AppLeftNav ref="leftNav" />
        </nav>
      </AppCanvas>
    );
	},
});

module.exports = Master;
