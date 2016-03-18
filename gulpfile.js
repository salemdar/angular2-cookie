require('require-dir')('./gulp');
const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('build', (done) => {
  runSequence(
    'clean:dist',
    'clang:format',
    ['readme',
      'readme:dist',
      'scripts',
      'bundle'],
    'copy-release-assets',
    'createPackageJson',
    done);
});

gulp.task('serve', ['connect', 'watch:srcFiles']);

gulp.task('test', (done) => {
  runSequence('clean:test', 'scripts:test', 'karma', done);
});

gulp.task('test:watch', ['scripts:test', 'watch:testfiles', 'watch:srcFiles', 'karma:watch']);

gulp.task('default', ['build']);
