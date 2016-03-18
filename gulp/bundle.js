const gulp = require('gulp');
const config = require('./config');
const path = require('path');
const $ = require('gulp-load-plugins')();
const Builder = require('systemjs-builder');

const bundleConfig = {
  baseURL: config.PATHS.dist.cjs,
  defaultJSExtensions: true,
  paths: {
    'angular2-cookie/*': '*',
    'angular2/*': './node_modules/angular2/*',
    'rxjs/*': './node_modules/rxjs/*',
  },
};

function bundle(moduleName, moduleBundleName, minify, done) {
  const outputConfig = {
    sourceMaps: true, minify,
  };
  const builder = new Builder();
  builder.config(bundleConfig);
  const outputFile =
    path.join(config.PATHS.dist.bundles, `${moduleBundleName}${(minify ? '.min' : '')}.js`);
  const bundlePromise =
    builder.bundle(`${moduleName} - angular2/* - rxjs/*`, outputFile, outputConfig);

  if (!minify) {
    bundlePromise.then(() => {
      gulp.src(outputFile)
      .pipe($.connect.reload());
    });
  }
  return bundlePromise.then(() => {
    done();
  });
}

gulp.task('bundle:cjs', ['scripts:cjs'], (done) => {
  bundle('angular2-cookie/core', 'angular2-cookie', false, done);
});

gulp.task('bundle:cjs:min', ['scripts:cjs'], (done) => {
  bundle('angular2-cookie/core', 'angular2-cookie', true, done);
});

gulp.task('bundle', ['bundle:cjs', 'bundle:cjs:min']);
