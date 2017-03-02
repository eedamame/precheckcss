var
  minimist = require('minimist')
;

minimistOption = {
  string: ['env'],
  boolean: [
    'production'
  ],
  alias: {
    p: 'production',
    e: 'env'
  },
  default: {
    production: false
  }
}

var argv = minimist(process.argv.slice(2), minimistOption);

var isProduction = false;
if(argv.env === 'production') {
  isProduction = true;
}

module.exports = {
  isProduction: isProduction
}
