var
	React 				= require('react'),
	Router 				= require('react-router'),
	Route 				= Router.Route,
	RouteHandler 	= Router.RouteHandler,
	Link 					= Router.Link
;

var
	APP 		= require('./app-entry/components/app.jsx').APP,
	Games 	= require('./games/components/page-games.jsx'),
	About 	= require('./about/components/page-about.jsx'),
	Scores 	= require('./scores/components/page-scores.jsx'),
	Contact = require('./contact/components/page-contact.jsx')
;

var routes = (
  <Route handler={APP}>
    <Route name="games" handler={Games} />
    <Route name="about" handler={About} />
    <Route name="scores" handler={Scores} />
    <Route name="contact" handler={Contact} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById('mainContainer'));
});