$(function(){
	require([
	 		"view/header/Header",
	 	],function(Header){
	 		new Header();
	 		//console.log(getQueryString("tab"));
	 		var tab = (getQueryString("tab")||window.location.hash.replace("#",""))||0;
			window.location.hash = tab;
			$('#menuBar li:eq('+tab+')').trigger('click');
	 	});
	
	$('#menuBar').delegate('li', 'click', function(e) {
		$(e.delegateTarget).find('li').removeClass('cur');
		$(this).addClass('cur');
		window.location.hash = $(this).index();
		// 玩法组点击事件触发的条件
		if($(this).attr("data-tabId")){
			  $(".mem-main-item").load("/view/finance/" +  $(this).attr("data-tabId")+'?r=' + new Date().getTime());
              return ;
 		}
		popTips('亲，功能暂未开放，敬请期待！', "waring");
	}); 
	
	function getQueryString(name) { 
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
		var r = window.location.search.substr(1).match(reg); 
		if (r != null) return unescape(r[2]); return null; 
	} 
});