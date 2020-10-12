'use-strict';

global.$ = {
  gulp: require('gulp'),
  gp: require('gulp-load-plugins')(),
  browserSync: require('browser-sync').create(),
  autoprefixer: require('gulp-autoprefixer'),
  sass: require('gulp-sass'),


  projectDir: 'template-for-job/',
  path: {
    tasks: require('./gulp/path/tasks.js')
  }
};

$.path.tasks.forEach(taskPath => {
  require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
  'sass',
  $.gulp.parallel('watch', 'serve')
));

$.gulp.task('build', $.gulp.parallel('sass', 'img'));