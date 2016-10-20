const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const config = require('./config');
const merge = require('merge2');
const sourcemaps = require('gulp-sourcemaps');
const typeScript = require('typescript');

const banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

gulp.task('scripts:ts', () =>
  gulp.src(config.PATHS.tsSrcFiles)
  .pipe($.header(banner, { pkg: config.pkg }))
  .pipe(gulp.dest(config.PATHS.dist.ts))
);

gulp.task('scripts:es6', () => {
  const tsProject = $.typescript.createProject(config.PATHS.tsConfig, {
    module: 'ES6',
    target: 'ES6',
    moduleResolution: 'node',
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    typescript: typeScript,
  });
  // todo: this emit errors right now because of duplicate ES6 declarations.
  // should be fixed when https://github.com/angular/angular/issues/4882 is included a new Angular2 version.
  const tsResult = gulp.src(config.PATHS.tsSrcFiles)
  .pipe(sourcemaps.init())
  .pipe(tsProject($.typescript.reporter.nullReporter()));
  return tsResult.js.pipe(sourcemaps.write('.'))
  .pipe($.header(banner, { pkg: config.pkg }))
  .pipe(gulp.dest(config.PATHS.dist.es6));
});

// we create the the tsConfig outside the task for fast incremental compilations during a watch.
const tsProject = $.typescript.createProject(config.PATHS.tsConfig, {
  target: 'ES5',
  module: 'commonjs',
  moduleResolution: 'node',
  declaration: true,
  emitDecoratorMetadata: true,
  experimentalDecorators: true,
  typescript: typeScript,
});

gulp.task('scripts:cjs', () => {
  const tsResult = gulp.src([config.PATHS.tsSrcFiles])
  .pipe(sourcemaps.init())
  .pipe(tsProject());

  return merge([
    tsResult.dts.pipe($.header(banner, { pkg: config.pkg }))
    .pipe(gulp.dest(config.PATHS.dist.cjs)),
    tsResult.js.pipe($.header(banner, { pkg: config.pkg }))
    .pipe(sourcemaps.write('.')).pipe(gulp.dest(config.PATHS.dist.cjs)),
  ]);
});

gulp.task('scripts:test', () => {
  const tsResult = gulp.src(config.PATHS.tsTestFiles)
  .pipe(sourcemaps.init())
  .pipe(tsProject());

  // todo: figure out why gulp-typescript don't write to the defined root dir (test-built)
  function replaceTestDir(path) {
    /*eslint-disable */
    path.dirname = path.dirname.replace('test/', '');
    /*eslint-enable */
  }

  return merge([
    tsResult.dts
    .pipe($.header(banner, { pkg: config.pkg }))
    .pipe($.rename(replaceTestDir))
    .pipe(gulp.dest(config.PATHS.testBuilt)),
    tsResult.js
    .pipe($.rename(replaceTestDir))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.PATHS.testBuilt)),
  ]);
});

// gulp.task('scripts', ['scripts:cjs', 'scripts:es6', 'scripts:ts']);
gulp.task('scripts', ['scripts:cjs', 'scripts:es6', 'scripts:ts']);
