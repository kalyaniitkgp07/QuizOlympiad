var
	//passport = require('passport'),
	db = require('./db')
	//auth = require('./auth')
;

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */

module.exports = function spec(app) {
	app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
	});
	/*
	app.on('middleware:after:session', function configPassport(eventArgs) {
	  //Tell passport to use our newly created local strategy for authentication
	  passport.use(auth.localStrategy());
	  //Give passport a way to serialize and deserialize a user. In this case, by the user's id.
	  passport.serializeUser(userLib.serialize);
	  passport.deserializeUser(userLib.deserialize);
	  app.use(passport.initialize());
	  app.use(passport.session());
	});
	*/
	return ({
  	onconfig: function (config, next) {
    	/*
     	 * Add any additional config setup or overrides here. `config` is an initialized
     	 * `confit` (https://github.com/krakenjs/confit/) configuration object.
       */
    	//Configure the database
  		db.config(config.get('databaseConfig'));
    	next(null, config);
  	}
	});
};

