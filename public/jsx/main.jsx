import React 		from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppContainer from './app-container.jsx';

require('../less/styles.less');

injectTapEventPlugin();

React.render(
	<AppContainer />,
	document.getElementById('mainContainer')
);
