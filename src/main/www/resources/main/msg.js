$(function() {
	require([ "view/header/Header", ], function(Header) {
		new Header();
	}); 
	var pagination = $.pagination({
		render : '.paging',
		pageSize : 5,
		pageLength : 3,
		ajaxType : 'get',
		hideInfos : false,
		hideGo : true,
		ajaxUrl : '/notice/pagingPageContent?catalogId=4',
		ajaxData : { 
		},
		success : function(data) {
			$(".mess-ul-sty").html(
					_.template($('#notice-list-template').html(), {
						items : data
					}));
		}
	});
	pagination.init();
	
	$(".mess-ul-sty").delegate('li','click',function (e){
		$(e.delegateTarget).find('li').removeClass('cur');
		$(this).addClass('cur');
	});
});