'use-strict';

global.$ = {
  gulp: require('gulp'),
  browserSync: require('browser-sync').create(),
  autoprefixer: require('gulp-autoprefixer'),
  sass: require('gulp-sass'),

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