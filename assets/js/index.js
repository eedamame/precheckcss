var selectorList;

var xhr = new XMLHttpRequest();
xhr.open("GET","/api/css/selector");
xhr.addEventListener("load", function(e){
  selectorList = JSON.parse(xhr.response);

  var precheck = new Vue({
    el: '#app-precheck',
    data: {
      selectorList: selectorList
    }
  });

});
xhr.send();
