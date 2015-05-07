'use strict';

module.exports = {
	app: {
		title: 'FilesAPI',
		description: 'Express, MongoDb, Node',
		keywords: 'Node, Express, Mongo'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions'
};