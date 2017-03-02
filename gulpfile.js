var requireDir = require('require-dir');
var $ = require('gulp-load-plugins')();

requireDir('./gulp/tasks', { recurse: true });
