'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs'),
    Grid = require('gridfs-stream'),
    mongoose = require('mongoose');

exports.getFile = function (req, res) {
    var fileId = req.param('id');
    var fileBsonId = mongoose.Types.ObjectId(fileId);
    Grid.mongo = mongoose.mongo;
    var connection = mongoose.connection;
    var gfs = Grid(connection.db);

    gfs.findOne({_id: fileBsonId}, function (err, file) {
        if (err) {
            res.json(err);
        }
        if (file) {
            res.set('Content-Type', file.metadata.orignalMimeType);
            var read_stream = gfs.createReadStream({filename: file.filename});
            read_stream.pipe(res);
        } else {
            res.json('File Not Found');
        }
    });
};

exports.getFiles = function(req, res){
    Grid.mongo = mongoose.mongo;
    var connection = mongoose.connection;
    var gfs = Grid(connection.db);

    gfs.files.find().toArray(function (err, files) {
        if (err) {
            res.json(err);
        }
        if (files.length > 0) {
            res.send(files);
        } else {
            res.send('File Not Found');
        }
    });
}

exports.postFile = function (req, res) {
    var originalname = req.files.file.originalname;
    var path = req.files.file.path;
    var type = req.files.file.mimetype;
    var filePath = './' + path;
    var read_stream = fs.createReadStream('./' + path);
    var metadata = {metadata: null};

    //Grace is your love, handle it will all care
    try {
        Grid.mongo = mongoose.mongo;
        var connection = mongoose.connection;
        var gfs = Grid(connection.db);
        metadata.orignalMimeType = type;
        metadata.metadata = req.body;

        var writestream = gfs.createWriteStream({
            filename: originalname,
            metadata: metadata
        });
        read_stream.pipe(writestream);
    }
    catch (err) {
        res.send(err);
    }
    finally {
        fs.unlinkSync(filePath);
        res.send(originalname)
    }
};
