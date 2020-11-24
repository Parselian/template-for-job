module.exports = () => {
  $.gulp.task('serve', () => {
    $.browserSync.init({
      proxy: {
        target: "./dist/"
      }
    });

    $.gulp.watch(['sass']);
    $.gulp.watch('./dist/*.{html,php}').on('change', $.browserSync.reload);
  });
};