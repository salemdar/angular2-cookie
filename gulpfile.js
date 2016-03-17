require('require-dir')('./gulp');
const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('build', function build(done) {
  runSequence('clean:dist', 'clang:format', 'lint', ['readme', 'copy-release-assets', 'scripts', 'bundle'], 'createPackageJson', done);
});

gulp.task('serve', ['connect', 'watch:srcFiles']);

gulp.task('test', function testTask(done) {
  runSequence('clean:test', 'scripts:test', 'karma', done);
});

gulp.task('test:watch', ['scripts:test', 'watch:testfiles', 'watch:srcFiles', 'karma:watch']);

gulp.task('default', ['build']);
