// tools
const postcss = require('postcss');
const util = require('util');
const fs = require('fs');
const glob = require('glob');
const express = require('express');
const _ = require('underscore');

// server
const app = express();
const server = app.listen(3000, function() {
  console.log("Node.js is listening to PORT:" + server.address().port);
  console.log("check -> http://localhost:" + server.address().port);
});

// セレクタ情報突っ込む配列
var selectorList = [];
var numberingList = [];

const targetFiles = './precheckitem/*.css';

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
          for(var i = 0; i<splitSelectors.length; i++) {
            ruleItem = {
              'selector': splitSelectors[i].toString().trim(),
              'line': rule.source.start.line,
              'file': file,
              'atrule': thisAtRule,
              'repeatNum': 1
            }
            selectorList.push(ruleItem);
          }
        } else {
          ruleItem = {
            'selector': rule.selector.toString().trim(),
            'line': rule.source.start.line,
            'file': file,
            'atrule': thisAtRule,
            'repeatNum': 1
          }
          selectorList.push(ruleItem);
        }
      }
    });
  })


  //// selectorのアルファベット順にソート
  //selectorList.sort(function(a,b) {
  //  if(a.selector < b.selector) return -1;
  //  if(a.selector > b.selector) return 1;
  //  return 0;
  //});

  // セレクタ名でグルーピングしたオブジェクト
  var groupBySelector = _.groupBy(selectorList, 'selector')

  // ここでセレクタが重複するやつがあるかチェックして、repeatNumの値を調整する
  selectorList.forEach(function(listitem) {
    listitem.repeatNum = groupBySelector[listitem.selector].length;
    numberingList.push(listitem);
  });

});


/* =============================================================================
   API
============================================================================= */

// セレクターリストを取得するAPI
app.get("/api/css/selector", function(req, res, next){
    //res.json(selectorList);
    res.json(numberingList);
});


/* =============================================================================
   views
============================================================================= */

// View EngineにEJSを指定。
app.set('view engine', 'ejs');
// assetsディレクトリ内を静的ファイルとして使用する
app.use(express.static('assets'));

// "/"へのGETリクエストでindex.ejsを表示
app.get("/", function(req, res, next){
  res.render("index", {});
});

