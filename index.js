const postcss = require('postcss');
const util = require('util');
const fs = require('fs');
const Comb = require('csscomb');





//const css = fs.readFileSync('./css/matching.css');
var css = fs.readFileSync('./css/bootstrap.min.css');

var comb = new Comb('zen');
comb.processPath('./css');

const root = postcss.parse(css);

//console.log(util.inspect(root, false, null))

//console.log(root);

const check = [];

root.walk(function (rule) {
  //console.log('rule: ' + rule + '\n');
  //if(rule.selector) {
  //  console.log('selector: ' + rule.selector + ' ');
  //  console.log('line: ' + rule.source.start.line + '\n');
  //}

  const slct = rule.selector;

  if(slct) {
    var ruleItem;

    // 複数セレクタの場合は、分割する
    if(slct.match(/,/)) {
      const splitSelectors = slct.split(',');
      console.log('splitSelectors', splitSelectors);
      for(var i = 0; i<splitSelectors.length; i++) {
        console.log(splitSelectors[i])
        ruleItem = {
          'selector': splitSelectors[i],
          'line': rule.source.start.line
        }
        check.push(ruleItem);
      }
    } else {
      ruleItem = {
        'selector': rule.selector,
        'line': rule.source.start.line
      }
      check.push(ruleItem);
    }



    //check[rule.selector] = {};
    //check[rule.selector].selector = rule.selector;
    //check[rule.selector].line = rule.source.start.line;
  }
});

// selectorのアルファベット順にソート
check.sort(function(a,b) {
  if(a.selector < b.selector) return -1;
  if(a.selector > b.selector) return 1;
  return 0;
});
//console.log(check)


fs.writeFile('writetest.txt', util.inspect(check) , function (err) {
  console.log(err);
});

