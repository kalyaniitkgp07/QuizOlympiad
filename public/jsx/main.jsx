import React 		from 'react';
import {Router} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes		from './routes.jsx';

require('../less/styles.less');

injectTapEventPlugin();

React.render(
	<Router>
		{routes}
	</Router>,
	document.getElementById('mainContainer')
);