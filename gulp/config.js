var
  dest = './assets',
  src = './src';

module.exports = {
  dest: dest,
  src: src,
  flag: {
    minifyCss: true,// cssをminifyするか
    useBrowsefify: true// browserify + babelify を使うか
  },
  clean: {
    dest: dest
  },
  sass: {
    src: src + "/sass/*.{sass,scss}",
    dest: dest + "/css"
  },
  images: {
    src: src + "/img/**",
    dest: dest + "/img"
  },
  js: {
    src: [src + "/js/app.js"],
    dest: dest + "/js"
  },
  eslint: {
    dev: src + "/**/*.js",
    prod: dest + "/**/*.js"
  },
  stylelint: {
    dev: src + "/**/*.scss",
    prod: dest + "/**/*.css"
  }
};
