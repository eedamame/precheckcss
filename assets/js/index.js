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
      filteredList: function() {
        var self = this;

        // セレクタのフリーワードフィルタ
        return self.selectorList.filter(function(item) {
          return (item.selector.indexOf(self.freetext) != -1);
        })
      }
    }

  });

});
xhr.send();
