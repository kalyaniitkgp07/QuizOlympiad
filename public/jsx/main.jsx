let
	React 				= require('react'),
	Router 				= require('react-router'),
	Route 				= Router.Route,
	RouteHandler 	= Router.RouteHandler,
	Link 					= Router.Link
;

let
	APP 			= require('./app-entry/components/app.jsx').APP,
	Games 		= require('./games/components/page-games.jsx'),
	About 		= require('./about/components/page-about.jsx'),
	Scores 		= require('./scores/components/page-scores.jsx'),
	Contact 	= require('./contact/components/page-contact.jsx'),
	Login			= require('./auth/components/page-login.jsx'),
	Logout		= require('./auth/components/page-logout.jsx'),
	Register	= require('./register/components/page-register.jsx')
;

let routes = (
  <Route handler={APP}>
    <Route name="games" handler={Games} />
    <Route name="about" handler={About} />
    <Route name="scores" handler={Scores} />
    <Route name="contact" handler={Contact} />
    <Route name="login" handler={Login} />
    <Route name="logout" handler={Logout} />
    <Route name="register" handler={Register} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById('mainContainer'));
});