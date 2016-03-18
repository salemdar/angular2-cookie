/*eslint-disable */

// Turn on full stack traces in errors to help debugging
Error.stackTraceLimit = Infinity;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 100;

// Cancel Karma's synchronous start,
// we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function () {
};
/*eslint-enable */

function onlySpecFiles(path) {
  return /[\.|_]spec\.js$/.test(path);
}

// Normalize paths to module names.
function file2moduleName(filePath) {
  return filePath.replace(/\\/g, '/');
}

System.config({
  packages: {
    'base/src': {
      defaultJSExtensions: true,
    },
    'base/test-built/src': {
      defaultJSExtensions: true,
    },
  },
});

System.import('angular2/platform/browser').then((browser) => {
  browser.BrowserDomAdapter.makeCurrent();
}).then(() =>
  Promise.all(
    Object.keys(window.__karma__.files) // All files served by Karma.
    .filter(onlySpecFiles)
    .map(file2moduleName)
    .map((path) =>
      System.import(path).then((module) => {
        if (module.hasOwnProperty('main')) {
          module.main();
        } else {
          throw new Error(`Module ${path} does not implement main() method.`);
        }
      })
    ))
)
.then(() => {
  /*eslint-disable */
  __karma__.start();
}, (error) => {
  console.error(error.stack || error);
  __karma__.start();
  /*eslint-enable */
});
