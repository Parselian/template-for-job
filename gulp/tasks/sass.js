module.exports = () => {
  $.gulp.task('sass', () => {
    return $.gulp.src('./dist/scss/**/*.scss')
      .pipe($.sass())
      .pipe($.gulp.dest('./dist/css'))
      .pipe($.browserSync.stream());
  });
};