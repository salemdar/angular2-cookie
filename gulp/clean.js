const gulp = require('gulp');
const del = require('del');
const config = require('./config');

gulp.task('clean:dist', (done) => del([config.PATHS.dist.base], done));

gulp.task('clean:test', (done) => del([config.PATHS.testBuilt], done));

gulp.task('clean:readme', (done) => del(['./README.md'], done));
