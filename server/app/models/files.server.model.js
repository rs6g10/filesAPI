'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Variable Schema
 */
var FilesSchema = new Schema({
        chunkSize: {type: Number},
        length: {type: Number},
        md5: {type: String, unique: true},
        uploadDate: {type: Date},
        filename: {type: String},
        orignalMimeType: {type: String}
   });

mongoose.model('Files', FilesSchema);
