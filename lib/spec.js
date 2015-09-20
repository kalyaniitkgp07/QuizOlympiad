var
	db 							= require('./db'),
	sessions 				= require('client-sessions'),
	SESSION_CONFIG 	= require('../config/constants').SESSION_CONFIG
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
	app.use(sessions(SESSION_CONFIG));
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

