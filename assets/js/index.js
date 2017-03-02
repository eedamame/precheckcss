var selectorList;

var xhr = new XMLHttpRequest();
xhr.open("GET","/api/css/selector");
xhr.addEventListener("load", function(e){
  selectorList = JSON.parse(xhr.response);

  var precheck = new Vue({
    el: '#app-precheck',
    data: {
      freetext: '',
      selectorList: selectorList
    },

    filters: {
      filterPerson: function(name) {
        // 適当なfilter処理
        if (name == "hogetaro") {
          return name;
        }
      }
    },


    computed: {
      displayList: function() {
        var self = this;
        // セレクタのフリーワードフィルタ
        var fileteredList = self.selectorList.filter(function(item) {
          return (item.selector.indexOf(self.freetext) != -1);
        })
        // selectorのアルファベット順にソート
        var sortedList = fileteredList.sort(function(a,b) {
          if(a.selector < b.selector) {
            return -1;
          }
          if(a.selector > b.selector) {
            return 1;
          }
          return 0;
        });
        return sortedList;
      }
    }

  });

});
xhr.send();
