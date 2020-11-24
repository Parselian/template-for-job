module.exports = () => {
  $.gulp.task('watch', () => {
    $.gulp.watch('./dist/scss/**/*.scss', $.gulp.series('sass'));
  });
}