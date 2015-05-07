'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
	morgan = require('morgan'),
    multer = require('multer'),
	session = require('express-session'),
	compress = require('compression'),
	methodOverride = require('method-override'),
	cookieParser = require('cookie-parser'),
	helmet = require('helmet'),
	mongoStore = require('connect-mongo')({
		session: session
	}),
	flash = require('connect-flash'),
	config = require('./config'),
	consolidate = require('consolidate'),
	path = require('path');

module.exports = function(db) {
	// Initialize express app
	var app = express();
	// Globbing model files
	config.getGlobbedFiles('./server/app/models/**/*.js').forEach(function(modelPath) {
		require(path.resolve(modelPath));
	});

	// Setting application local variables
	app.locals.title = config.app.title;
	app.locals.description = config.app.description;
	app.locals.keywords = config.app.keywords;

	// Passing the request url to environment locals
	app.use(function(req, res, next) {
		res.locals.url = req.protocol + ':// ' + req.headers.host + req.url;
		next();
	});

	// Should be placed before express.static
	app.use(compress({
		filter: function(req, res) {
			return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
		},
		level: 9
	}));

	// Showing stack errors
	app.set('showStackError', true);

	// Set swig as the template engine
	app.engine('server.view.html', consolidate[config.templateEngine]);

	// Set views path and view engine
	app.set('view engine', 'server.view.html');
	app.set('views', './server/app/views');

	// Environment dependent middleware
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));

		// Disable views cache
		app.set('view cache', false);
	} else if (process.env.NODE_ENV === 'production') {
		app.locals.cache = 'memory';
	}

	app.use(multer({dest:'./uploads/'}));
    //app.use(busboy());

	app.use(methodOverride());

	// Enable jsonp
	app.enable('jsonp callback');

	// CookieParser should be above session
	app.use(cookieParser());

	// Express MongoDB session storage
	app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret,
		store: new mongoStore({
			db: db.connection.db,
			collection: config.sessionCollection
		})
	}));

	// connect flash for flash messages
	app.use(flash());

	// Use helmet to secure Express headers
	app.use(helmet.xframe());
	app.use(helmet.iexss());
	app.use(helmet.contentTypeOptions());
	app.use(helmet.ienoopen());
	app.disable('x-powered-by');
	
	// Globbing routing files
	config.getGlobbedFiles('./server/app/routes/**/*.js').forEach(function(routePath) {
		console.log('routePath: ', routePath);
        require(path.resolve(routePath))(app);
	});

	// Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
	app.use(function(err, req, res, next) {
		// If the error object doesn't exists
		if (!err) return next();

		// Log it
		console.error(err.stack);

		// Error page
		res.status(500).render('500', {
			error: err.stack
		});
	});

    //app.use(function(req, res) {
    //    if (req.busboy) {
    //        console.log('yes busboy!');
    //        req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    //            console.log('yo file!', filename, encoding, mimetype);
    //            //next();
    //        });
    //        req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
    //            console.log('yo field!');
    //        });
    //    }else{
    //        console.log('no busboy!');
    //    }
    //    // etc ...
    //});



	// Assume 404 since no middleware responded
	app.use(function(req, res) {
		res.status(404).render('404', {
			url: req.originalUrl,
			error: 'Not Found'
		});
	});

	return app;
};
