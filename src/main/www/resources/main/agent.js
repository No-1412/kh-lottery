$(function(){
	require([
	 		"view/header/Header",
	 	],function(Header){
	 		new Header();
	 		var tab = window.location.hash.replace("#","")||0;
			window.location.hash = tab;
			$('#menuBar li:eq('+tab+')').trigger('click');
	 	});
	
	$('#menuBar').delegate('li', 'click', function(e) {
		$(".paging").html("");
		$(e.delegateTarget).find('li').removeClass('cur');
		$(this).addClass('cur');
		window.location.hash = $(this).index();
		// 玩法组点击事件触发的条件
		if($(this).attr("data-tabId")){
			  $(".mem-main-item").load("/view/agent/" +  $(this).attr("data-tabId")+'?r=' + new Date().getTime());
              return ;
 		}
		popTips('亲，功能暂未开放，敬请期待！', "waring");
	}); 
});