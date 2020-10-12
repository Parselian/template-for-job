module.exports = () => {
  $.gulp.task('sass', () => {
    return $.gulp.src('scss/**/*.scss')
      .pipe($.sass())
      .pipe($.gulp.dest('./css'))
      .pipe($.browserSync.stream());
  });
};