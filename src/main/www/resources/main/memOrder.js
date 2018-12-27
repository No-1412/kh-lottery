$(function() {
	require([ "view/header/Header", ], function(Header) {
		new Header();
		var tab = window.location.hash.replace("#","")||0;
		window.location.hash = tab;
		$('#menuBar li:eq('+tab+')').trigger('click');
	});
	changeShow();
	 
	$('#menuBar').delegate('li', 'click', function(e) {
		$(".paging").html("");
		$(e.delegateTarget).find('li').removeClass('cur');
		$(this).addClass('cur');
		window.location.hash = $(this).index();
		//window.location.href = "http://localhost:9000/view/memberOrder.html?tab=2"; 
		// 玩法组点击事件触发的条件
		if($(this).attr("data-tabId")){
			  $(".tabBd").load("/view/member/" +  $(this).attr("data-tabId")+'?r=' + new Date().getTime());
              return ;
 		}
		popTips('亲，功能暂未开放，敬请期待！', "waring");
	}); 
  
	// 菜单显示隐藏
	function changeShow() {
		$('.nav-link li').on(
				'click',
				function() {
					$(this).addClass('cur').siblings().removeClass('cur');
					$('.mem-main-item .main-box-info').eq($(this).index())
							.show().siblings().hide();
				});
		$('.pay-title ul li').on(
				'click',
				function() {
					$(this).addClass('cur').siblings().removeClass('cur');
					$('.pattern .pay-item').eq($(this).index()).show()
							.siblings().hide();
				});
	}  
}); 
 