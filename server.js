/*jslint node: true */
'use strict';
/**
 * Module dependencies.
 */
var config = require('./server/config/config'),
    mongoose = require('mongoose');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
var db = mongoose.connect(config.db);

// Init the express application
var app = require('./server/config/express')(db);


// Start the app by listening on <port>
app.listen(config.port);

// Expose app
var exports = module.exports = app;

// Logging initialization
console.log('Files API started on port ' + config.port);
