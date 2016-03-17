const gulp = require('gulp');
const config = require('./config');

gulp.task('watch:srcFiles', () => {
  gulp.watch(config.PATHS.tsSrcFiles, ['scripts1:cjs', 'bundle:cjs']);
});

gulp.task('watch:testfiles', () => {
  gulp.watch(config.PATHS.tsTestFiles, ['scripts:test']);
});
