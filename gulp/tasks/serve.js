module.exports = () => {
  $.gulp.task('serve', () => {
    $.browserSync.init({
      proxy: {
        target: "template-for-job/"
      }
    });

    $.gulp.watch(['sass']);
    $.gulp.watch('./*.{html,php}').on('change', $.browserSync.reload);
  });
};