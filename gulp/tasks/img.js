module.exports = () => {
  $.gulp.task('img', () => {
    return $.gulp.src('images/**/*.{png,webp,jpg}')
      .pipe($.gp.imagemin([
        $.gp.imagemin.mozjpeg({
          quality: 60,
          progressive: true
        }),
        $.gp.imagemin.optipng({
          optimizationLevel: 5
        })
      ]))
      .pipe($.gulp.dest('images/'));
  });
}