$(function() {
	require([ "view/header/Header", "view/footer/footer", ], function(Header,
			footer) {
		new Header();
		new footer();
	});
 
	$(".nav-main").children().eq(3).removeClass("cur");
	$(".nav-main").children().eq(3).addClass("cur");

	$.ajax({
		url : "/notice/pagingPageContent?pageIndex=1&pageSize=5&catalogId=7",
		method : 'GET',
		success : function(data) {
			if (data.retcode == 0) {
				$("#hotPromotions").html(_.template($('#promotions_template').html(), {
					items : data.data.list
				})); 
			} else {
				popTips("平台暂无最新优惠活动！", "error");
			}
		}
	});
	  
	$('#hotPromotions').delegate('.hdnr .ef-right', 'click', function(e) { 
		$(this).addClass("cur").parent().siblings().find(".ef-right")
		.removeClass("cur");
		var dis = $(this).parent().find(".xfnr-2").css("display");
		$(this).parent().find(".xfnr-2").css("display",(dis==""||dis=="inline" || dis =="block")?"none":"");
	}); 
});