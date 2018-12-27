$(function() {

	require([ "view/header/Header", ], function(Header) {
		new Header();
		var tab = window.location.hash.replace("#","")||0;
		window.location.hash = tab;
		$('#menuBar li:eq('+tab+')').trigger('click');
		//$('#menuBar li:eq(0)').trigger('click');
	});
	// 菜单显示隐藏
	changeShow(); 
	$('#menuBar').delegate('li', 'click', function(e) {
		$(e.delegateTarget).find('li').removeClass('cur');
		$(this).addClass('cur');
		window.location.hash = $(this).index();
		// 玩法组点击事件触发的条件
		if($(this).attr("data-tabId")){
			  $(".mem-main-item").load("/view/account/" +  $(this).attr("data-tabId")+'?r=' + new Date().getTime());
              return ;
 		}
		popTips('亲，功能暂未开放，敬请期待！', "waring");
	}); 
});
// 菜单显示隐藏
function changeShow() {
	$('.nav-link li').on(
			'click',
			function() {
				$(this).addClass('cur').siblings().removeClass('cur');
				$('.mem-main-item .main-box-info').eq($(this).index()).show()
						.siblings().hide();
			})
}