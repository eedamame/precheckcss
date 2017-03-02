var xhr = new XMLHttpRequest();
xhr.open("GET","/api/css/selector");
xhr.addEventListener("load", function(e){

  selectorList = JSON.parse(xhr.response);

  var precheck = new Vue({
    el: '#app-precheck',
    data: {
      freetext: '',
      fileselect: '',
      filelist: selectorList.files,
      selectorList: selectorList.selectors
    },

    computed: {
      displayList: function() {
        var self = this;
        var fileteredList = self.selectorList.filter(function(item) {
          if(
            // セレクタのフリーワードフィルタ
            item.selector.indexOf(self.freetext) != -1
            // ファイルのフィルタ
            && item.file.indexOf(self.fileselect) != -1
          ) {
            return true;
          }
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
