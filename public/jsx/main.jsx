import React 		from 'react';
import {Router} from 'react-router';
import routes		from './routes.jsx';


React.render(
	<Router>
		{routes}
	</Router>,
	document.getElementById('mainContainer')
);