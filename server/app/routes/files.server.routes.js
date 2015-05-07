'use strict';

/**
 * Module dependencies.
 */
var files = require('../controllers/files.server.controller.js');

module.exports = function(app) {
    app.route('/files/:id')
        .get(files.getFile);

    app.route('/files')
        .get(files.getFiles);


    app.route('/fileupload')
        .post(files.postFile);

};
