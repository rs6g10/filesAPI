/*jslint node: true */
'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var mocha = require('gulp-mocha');
var karma = require('gulp-karma');


var applicationTestFiles;

gulp.task('jshint', function() {
  gulp.src(['gulpFile.js', 'server.js', 'config/**/*.js', 'app/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('nodemon', function (done) {
  nodemon({ script: 'server.js', env: { 'NODE_ENV': 'development' }})
    .on('restart');
});

gulp.task('mochaTest', function () {
    process.env.NODE_ENV = 'test';
    gulp.src(['server.js','app/tests/**/*.js'])
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('karma', function () {
    gulp.src(applicationTestFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});

gulp.task('watch', function() {
  var server = livereload();
  gulp.watch(['gulpFile.js', 'server.js', 'config/**/*.js', 'app/**/*.js'], ['jshint']);

  gulp.watch(['gruntfile.js', 'server.js', 'config/**/*.js', 'app/**/*.js']).on('change', function(file) {
      server.changed(file.path);
  });
});

// Default task(s).
gulp.task('default', ['jshint', 'nodemon', 'watch']);

// Lint task(s).
gulp.task('lint', ['jshint']);

// Build task(s).
gulp.task('build', ['jshint']);

// Test task.
gulp.task('test', ['mochaTest', 'karma']);