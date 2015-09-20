'use strict';

var
	express = require('express'),
	kraken  = require('kraken-js'),
	app     = express(),
  options = require('./lib/spec')(app)
;


app.use(kraken(options));
/*
app.requestBeforeRoute = function requestBeforeRoute(server) {
    // Fired before routing occurs
    server.use(express.methodOverride());
};
*/

module.exports = app;
