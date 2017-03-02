var
  gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  config = require('../config'),
  flag = require('../config').flag
;

// Build bower scripts
gulp.task('bower:scripts', function () {
    var files = require('main-bower-files')({
        filter: '**/*.{js,jsx}'
    });

    return gulp.src(files)
        .pipe($.plumber())
        .pipe($.concat('vendor.js'))
        .pipe($.uglify({
          preserveComments: 'license'
        }))
        .pipe(gulp.dest(config.dest + '/js'));
});

// Build styles for development
gulp.task('bower:others', function () {
    return gulp.src(config.src + '/bower_components/**/*(*.eot|*.svg|*.ttf|*.woff|*.woff2)')
        .pipe(gulp.dest(config.dest + '/bower_components/'));
});
