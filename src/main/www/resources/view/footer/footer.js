define('view/footer/footer',[
  'template',
  'text!view/footer/footerTpl.html'
],function(template,footerTpl){
  var Widget = function(){
    this.init();
  };

  Widget.prototype = {
    init:function(){
      this.buildHeader();
//    this.InitData();
    },

    buildHeader: function(){
      
      var render = template.compile(footerTpl);
      var html = render({
//      unLogin:unLogin
      });
      // $(html).appendTo(".top-bg");
      $(html).appendTo('footer');
    },
  };

  return Widget;
});