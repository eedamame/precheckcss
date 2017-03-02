var
  gulp = require('gulp'),
  config = require('../config').eslint,
  eslint = require('eslint'),
  shell = require('gulp-shell')
;

gulp.task('eslint', shell.task([
  'eslint ' + config.prod
]));
gulp.task('eslint:dev', shell.task(
  'eslint ' + config.dev
));
