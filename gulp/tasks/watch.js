var
  gulp = require('gulp'),
  config = require('../config'),
  flag = config.flag
;

gulp.task('watch', function(){
  gulp.watch(config.sass.src, ['sass']);
  gulp.watch(config.images.src, ['images']);
  gulp.watch(config.js.src, ['js']);

  if(flag.useEct) {
    gulp.watch(config.ect.src, ['markup']);
    gulp.watch(config.ect.temp, ['markup']);
  } else {
    gulp.watch(config.markup.src, ['markup']);
  }
});
