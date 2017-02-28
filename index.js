// tools
const postcss = require('postcss');
const util = require('util');
const fs = require('fs');
const glob = require('glob');

// セレクタ情報突っ込む配列
var check = [];

const targetFiles = './css/*.css';

glob( targetFiles, function(err, files) {
  files.forEach(function(file) {
    const css = fs.readFileSync(file);
    const root = postcss.parse(css);

    root.walk(function (rule) {

      const slct = rule.selector;
      if(slct) {
        var ruleItem;
        var thisAtRule = '';
        if(rule.parent.type === 'atrule') {
          thisAtRule = rule.parent.name + ' ' + rule.parent.params;// nameで、'media' とかが入る。params で、指定の内容が入る 'only screen and (min-width:768px)' とか
        }

        // 複数セレクタの場合は、分割する
        if(slct.match(/,/)) {
          const splitSelectors = slct.split(',');

          //console.log('splitSelectors', splitSelectors);
          for(var i = 0; i<splitSelectors.length; i++) {
            //console.log(splitSelectors[i])
            ruleItem = {
              'selector': splitSelectors[i],
              'line': rule.source.start.line,
              'file': file,
              'atrule': thisAtRule
            }
            //console.log('L35 ruleItem: ', ruleItem);
            check.push(ruleItem);
          }
        } else {
          ruleItem = {
            'selector': rule.selector,
            'line': rule.source.start.line,
            'file': file,
            'atrule': thisAtRule
          }
          //console.log('L43 ruleItem: ', ruleItem);
          check.push(ruleItem);
        }
      }
    });

  })

  // selectorのアルファベット順にソート
  check.sort(function(a,b) {
    if(a.selector < b.selector) return -1;
    if(a.selector > b.selector) return 1;
    return 0;
  });

  // ファイルに書き込み
  fs.writeFile('writetest.txt', util.inspect(check) , function (err) {
    console.log(err);
  });

});
