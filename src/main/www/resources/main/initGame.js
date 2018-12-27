var play_arr = []; // 存储当前玩法组所有的玩法

var curr_play_obj = null; // 存储当前玩法组的当前玩法

var loadingOpen_timer = null;

$(function() {
	require([ "view/header/Header", ], function(Header) {
		new Header();
	});
	initLottery("ssc/cq", "重庆时时彩");
	initsccList(); // 初始化时时彩数据
	$("#user_fandian").val($.session.get("fandian") || 0.12);
	// 彩种下拉列表菜单
	$(".caiz-more").click(function() {
		$(".move-cz").toggle();
	})

	$(".move-cz").mouseleave(function() {
		$(this).css({
			"display" : "none"
		})
	})

	$(".ef-caizxz dd ul li").click(function() {
		$(this).addClass("caiz-sty").siblings().removeClass("caiz-sty");
	});

	// 背景切换
	$(".pic-same").click(function() {
		$(this).addClass("cur").siblings().removeClass("cur");
	});

	$(".qiehuan").click(function() {
		$(".more-bj").show();
	});

	$(".more-bj").mouseleave(function() {
		$(".more-bj").css({
			"display" : "none"
		})
	});

	$(".qh1").click(function() {
		$(".game-bg").addClass("beijing1");
		$(".game-bg").removeClass("beijing2");
		$(".game-bg").removeClass("beijing3");
	});

	$(".qh2").click(function() {
		$(".game-bg").addClass("beijing2");
		$(".game-bg").removeClass("beijing3");
		$(".game-bg").removeClass("beijing1");
	});

	$(".qh3").click(function() {
		$(".game-bg").addClass("beijing3");
		$(".game-bg").removeClass("beijing2");
		$(".game-bg").removeClass("beijing1");

	});

	$("span.efmin").on("click", function() {
		var curTimes = eval(way.get('Lottery.times'));
		if (curTimes > 1) {
			way.set('Lottery.times', --curTimes);
			Play.getNumAndDetail();
		}
	});
	$("span.efadd").on("click", function() {
		var curTimes = eval(way.get('Lottery.times'));
		if (curTimes < 1000) {
			way.set('Lottery.times', ++curTimes);
			Play.getNumAndDetail();
		}
	});

	$('#lotteryTimes').on('input propertychange', function() {
		var _this= this;
		window.setTimeout(function() {
			var c = /^[0-9]*$/;
			var times = $(_this).val();
			if (!c.test(times)) {
				$(_this).val(1);
			}
			Play.getNumAndDetail();
		}, 100);
	});
	//
	moneySlider("slider-range", 0, (+$('#user_fandian').val()) * 100, 0,
			Play.slider);
	bindEvent();
	initLoadingOpen();
});

function moneySlider(id, mins, maxs, values, callback) {
	$("#" + id).slider({
		range : "min",
		min : mins,
		max : maxs,
		value : values,
		step : 0.1,
		slide : function(event, ui) {
			// 这里是回调函数
			(eval(callback))(ui.value);
		}
	});
};

// 绑定监听事件
function bindEvent() {
	$('#play-group-menus').delegate('li', 'click', function(e) {
		$(e.delegateTarget).find('li').removeClass('cur');
		$(this).addClass('cur');
		// 玩法组点击事件触发的条件
		Play.getPlaysByGroupId($(this).attr('data-value'));
	});
	$('#play-menus').delegate('li', 'click', function(e) {
		$(e.delegateTarget).find('li').removeClass('cur');
		$(this).addClass('cur');
		Play.getPlayByInfo().then(Play.reset);
	});
	$('#extraNums').delegate('.tabHd li', 'click', function(e) {
		$(e.delegateTarget).find('li').removeClass('cur');
		$(this).addClass('cur');
	});
	$('#game-panel').delegate('dd .sz-qiu li', 'click', function() {
		$(this).toggleClass('cur');
		Play.getNumAndDetail();
	});
	$('#cart-list').delegate('.xq a', 'click', function() {
		var orderNo = $(this).attr("data-value");
		var dd = $('#cart-list dd[data-value="' + orderNo + '"]');
		orderDetail(dd);
	});
	$('#cart-list').delegate('.sc a', 'click', function() {
		$(this).parent().parent().parent().remove();
		Play.cartMonitor();
	});
	Play.rightBtn();

	$("#game-panel").delegate('.xwInput input[name="position"]', 'click',
			function() {
				Play.getPlan(playsConf(curr_play_obj)['param'][2].length);
				Play.getNumAndDetail();
			});
	// 添加投注
	$("#delegate-content").delegate('#add-touzhu', 'click', function() {
		getUserInfo(function() {
			Play.addBet(false)
		})
	});
	// 一键投注
	$("#delegate-content").delegate('#fast-bet', 'click', function() {
		getUserInfo(function() {
			Play.fastBet()
		})
	});
	$("#touzhu-content").delegate('#btn-zhuihao', 'click', Play.appendBet);
	$("#touzhu-content").delegate('#btn-touzhu', 'click', Play.touzhu);
}

function getUserInfo(fn) {
	$.ajax({
		url : "/user/userInfo",
		method : 'GET',
		success : function(data) {
			if (data.retcode == 0) {
				fn();
			} else {
				popTips(data.message || "您尚未登录或登录时间过长,请重新登录!", "error");
			}
		}
	});
}

/**
 * @desc 订单详情
 * @param dd
 */
function orderDetail(dd) {
	var lottery = {};
	lottery["zhu"] = $(dd).find("#zhu").val();
	lottery["playName"] = $(dd).find("#playName").val();
	lottery["times"] = $(dd).find("li[data-flag='times']").attr("data-value");
	lottery["total"] = $(dd).find("li[data-flag='total']").attr("data-value");
	lottery["money"] = $(dd).find("li[data-flag='money']").attr("data-value");
	lottery["lotteryNo"] = $(dd).find("li[data-flag='lotteryNo']").attr(
			"data-value");
	lottery["model"] = $(dd).find("li[data-flag='model']").attr("data-value");
	lottery["lotteryName"] = $(dd).find("li[data-flag='lotteryName']").attr(
			"data-value");
	$("#layerDiv")
			.html(_.template($('#order-detail-template').html(), lottery));
	pop("layerDiv");
}

// 初始化时时彩数据
function initsccList() {
	$.ajax({
		url : "/sscList",
		method : 'GET',
		success : function(data) {
			if (data.retcode == 0) {
				$('#ssc-list').html(_.template($('#ssclist-template').html(), {
					sscLists : data.data
				}));
			} else {
				popTips(data.message, "error");
			}
		}
	});
}

function initLottery(hash, name) {
	$.ajax({
		url : "/content/lottery/" + hash,
		method : 'GET',
		success : function(data) {
			if (data.retcode == 0) {
				var lottery = data.data.currentLottery;
				var playGroupList = data.data.lottery.playGroups;
				// initDownTime(lottery);
				// queryHistoryLotteryData(lottery.lottery_id);
				$("#lottery-id").val(data.data.currentLottery.lottery_id);
				$("#logo").attr("src",
						"/images/game/lottery/" + data.data.lottery.logo);
				way.set("lottery_cn_name", data.data.lottery.lottery_lname);
				$("#lottery_num").html(lottery.lottery_num);
				$("#lottery_type").val(data.data.lottery.lottery_type);
				$("#singleContinueBetting").val(
						data.data.lottery.singleContinueBetting || "N");
				$("#no").html(
						lottery.lottery_no.substring(lottery.lottery_no
								.indexOf("-") + 1));
				way.set("Lottery.times", 1);
				way.set("showExpect.currExpect", lottery.lottery_no);
				way.set("showExpect.lastExpect", lottery.lottery_no);
				$("#scriptDiv").load(
						"/view/" + data.data.lottery.template + ".html",
						function() {
							Play.lotteryPageInit(playGroupList, lottery);
						});
			} else {
				popTips(data.message, "error");
			}
		}
	});
}

/**
 * @desc 初始化计时器
 * @param _lottery
 */
function initDownTime(_lottery) {
	var endTime = new Date(_lottery.lottery_time.replace(/-/g, '/')).getTime(); // 下一期结束时间
	var curr = _lottery.curr_time; // 当前时间
	countdownTime((endTime - curr) / 1000, null, "当前时间");
}

/**
 * @desc 查询历史开奖数据
 * @param lottery_id
 */
function initPlayGroup(playGroupId) {
	$.ajax({
		url : "/lottery/play?groupId=" + playGroupId,
		method : 'GET',
		success : function(data) {
			if (data.retcode == 0) {
				$('.l-c-item').html(
						_.template($('#playlist-template').html(), {
							playList : data.data
						}));
			} else {
				popTips(data.message, "error");
			}
		}
	});
}

/**
 * 根据groupid查询所有玩法
 */
var getPlaysByGroupId = function(_groupId) {
	var deferred = $.Deferred();
	var dataStr = $.substitute('groupId={groupId}', {
		groupId : _groupId
	});
	$.ajax({
		url : '/lottery/play?r=' + new Date().getTime(),
		method : 'GET',
		data : dataStr,
		success : function(data) {
			if (0 == data.retcode) {
				play_arr = data.data; // 将玩法所有数据装入内存
				var _html = _.template($('#paly-template').html(), {
					items : data.data
				});
				$('#play-menus').html(_html);
				$('#play-menus li').first().click();
				deferred.resolve(); // 改变deferred对象的执行状态
			} else {
				popTips(data.retmsg, "error");
			}
		}
	});
	return deferred.promise(); // 返回promise对象
};

function initLoadingOpen() {
	if (loadingOpen_timer) {
		window.clearInterval(loadingOpen_timer)
	}
	if ($("#opening").length <= 0) {
		$('.kj-hao').html("<div id ='opening'></div>");
	}
	loadingOpen_timer = setInterval(function() {
		var _lotteryType = $('#lottery_type').val();
		var isPK10 = ('PK10' == _lotteryType);
		$('#opening li').each(function() {
			if (isPK10) {
				$(this).html(parseInt(Math.random() * 10));
			} else {
				$(this).find("span:eq(0)").html(parseInt(Math.random() * 9));
			}
		});
	}, 100);
}
