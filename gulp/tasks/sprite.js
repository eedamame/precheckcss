var
  gulp = require('gulp')
  $ = require('gulp-load-plugins')(),
  config = require('../config').sprite
;

gulp.task('sprite', function(){
  var spriteData = gulp.src('src/sprite/**/*.png')
    .pipe($.plumber())
    .pipe($.spritesmith({
      imgName: 'sprite.png',
      cssName: '_sprite.scss',
      imgPath: '../img/sprite.png'
      // retina画像も作る場合は下記を有効にする
      //,
      //retinaSrcFilter: 'src/sprite/**/*@2x.png',
      //retinaImgName: 'sprite@2x.png',
      //retinaImgPath: '../img/sprite@2x.png'
    }));
  spriteData.img.pipe(gulp.dest('src/img/'));
  spriteData.css.pipe(gulp.dest('src/sass/'));
});
