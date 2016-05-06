const gulp = require('gulp');
const config = require('./config');
const path = require('path');
const $ = require('gulp-load-plugins')();
const Builder = require('systemjs-builder');

const bundleConfig = {
  baseURL: config.PATHS.dist.cjs,
  defaultJSExtensions: true,
  packageConfigPaths: [
    path.join('.', 'node_modules', '*', 'package.json'),
    path.join('.', 'node_modules', '@angular', '*', 'package.json'),
  ],
  paths: {
    'angular2-cookie/*': '*',
    '@angular/*': './node_modules/@angular/*',
    '*': './node_modules/*'
  },
  packages: {
    '@angular/core': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/compiler': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/common': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/platform-browser': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/platform-browser-dynamic': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/router-deprecated': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    'rxjs': {
      main: 'Rx.js',
      defaultExtension: 'js'
    }
  }

};

function bundle(moduleName, moduleBundleName, minify, done) {
  const outputConfig = {
    sourceMaps: true, minify,
  };
  const builder = new Builder(bundleConfig);
  // builder.config(bundleConfig);
  const outputFile =
    path.join(config.PATHS.dist.bundles, `${moduleBundleName}${(minify ? '.min' : '')}.js`);
  const bundlePromise =
    builder.bundle(`${moduleName}`, outputFile, outputConfig);

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
