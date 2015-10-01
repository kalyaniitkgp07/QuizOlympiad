import React 			from 'react';
import {Route} 		from 'react-router';
import AuthStore 	from './auth/stores/stores.jsx';
import Master 		from './template/components/master.jsx';
import Games 			from './games/components/page-games.jsx';
import About 			from './about/components/page-about.jsx';
import Scores			from './scores/components/page-scores.jsx';
import Contact 		from './contact/components/page-contact.jsx';
import Login 			from './auth/components/page-login.jsx';
import Logout			from './auth/components/page-logout.jsx';
import Register		from './register/components/page-register.jsx';
import Tournaments	from './tournaments/components/page-tournaments.jsx';

function requiredAuth(nextState, replaceState) {
	if(!AuthStore.isLoggedIn()) {
		replaceState({nextState: nextState.location.pathname}, '/login');
	}
}

let routes = (
	<Route path="/" component={Master}>
		<Route path="register" component={Register} />
		<Route path="login" component={Login} />
  	<Route path="logout" component={Logout} />
  	<Route path="games" component={Games}/>
  	<Route path="about" component={About} />
  	<Route path="scores" component={Scores} onEnter={requiredAuth} />
  	<Route path="contact" component={Contact} />
  	<Route path="tournaments" component={Tournaments} />
  	
	</Route>
);

module.exports = routes;