var
  gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  config = require('../config').stylelint
;

gulp.task('stylelint', function() {
  return gulp
    .src(config.dev)
    .pipe($.stylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }))
  }
);
gulp.task('stylelint:prod', function() {
  return gulp
    .src(config.prod)
    .pipe($.stylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }))
  }
);
