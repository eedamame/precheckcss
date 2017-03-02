var
  gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  flag = require('../config').flag
;

gulp.task('build', function(cb){
  if(flag.createSitemap) {
    $.sequence('clean', 'itemcopy', 'markup', 'sass', 'images', 'js', 'sitemap', cb)
  } else {
    $.sequence('clean', 'itemcopy', 'markup', 'sass', 'images', 'js', cb)
  }
});
