var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('default',
  gulpSequence('clean', 'itemcopy', 'sass', 'markup', 'images', 'js', 'browserSync', 'watch')
);
