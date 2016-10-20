const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const config = require('./config');
const path = require('path');
const tsLintJson = require('../tslint.json');

gulp.task('tslint', () =>
  gulp.src([
    config.PATHS.tsSrcFiles,
    '!src/**/*.d.ts',
    '!node_modules',
  ])
  .pipe($.tslint({
    configuration: tsLintJson,
    formatter: 'verbose',
  })).pipe($.tslint.report())
);

gulp.task('eslint', () =>
  gulp.src(config.PATHS.jsFiles)
  .pipe($.eslint({
    rulePaths: [path.join(__dirname, '../')],
  }))
  .pipe($.eslint.format())
  .pipe($.eslint.failAfterError())
);

gulp.task('clang:check', () =>
  gulp.src(config.PATHS.tsSrcFiles)
  .pipe($.clangFormat.checkFormat('file', undefined, { verbose: true, fail: true }))
);

gulp.task('clang:format', () =>
  gulp.src(config.PATHS.tsSrcFiles)
  .pipe($.clangFormat.format('file'))
  .pipe(gulp.dest(config.PATHS.srcDir))
);

gulp.task('lint', ['clang:check', 'tslint', 'eslint']);

