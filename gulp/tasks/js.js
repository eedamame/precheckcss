var
  gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  config = require('../config').js,
  flag = require('../config').flag,
  errorHandler = require('../util/handleErrors').flag,
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer')
;

gulp.task('js', function() {

  if(flag.useBrowsefify) { // browserify を使用する場合

    console.log('use browserify');

    browserify({
      entries: "src/js/app.js",
      transform: ['babelify']
    })
    .bundle()
    .pipe($.plumber({ errorHandler: errorHandler }))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe($.uglify({ preserveComments: 'license' }))
    .pipe(gulp.dest(config.dest));

  } else { // browserify を使用しない場合

    console.log('not use browserify');

    return gulp.src(config.src)  
      .pipe($.if(flag.minifyJs, $.uglify({preserveComments: 'some'})))  
      .pipe(gulp.dest(config.dest)) 

  }
});
