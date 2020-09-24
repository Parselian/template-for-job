module.exports = () => {
  $.gulp.task('watch', () => {
    $.gulp.watch('./scss/**/*.scss', $.gulp.series('sass'));
  });
}