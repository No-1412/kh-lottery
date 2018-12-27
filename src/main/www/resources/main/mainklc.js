$.ajaxSetup({
	cache: true,
	complete: function(XMLHttpRequest, textStatus) {
		var status = XMLHttpRequest.status;
		if (status == 401) {
			alert('您还未登录，或您的登录超时，或您的账号在其他地方已登录！');
			top.location.reload(true);
		}
		if (status == 403)
			alert('系统异常，请联系在线客服！');
	}
});
way.options.persistent = false;
way.options.timeoutInput = 50;
way.options.timeoutDOM = 500;

var flag = true;

/**
 *获取快乐彩彩种信息
 *type(xingyuncai,kuaileshifen,shishicai,shiyixuanwu,kuaisan,dipincai,jinuo)
 */
var loadLottery = function(type) {
	$.ajax({
		type: "post",
		url: "/ct-data/loadLottery",
		data: {
			"type": type
		},
		datatype: "json",
		success: function(msg) {
			if (msg.sign == true) {
				$.each(msg.list, function(idx, val) {
					if (val.state !== 0) {
						$("#" + val.shortName).show();
						loadOpenTimes(val.shortName);
						openCodeList(val.shortName);
					}
				});
			} else {
				popTips(msg.message, 'error');
			}
		}
	});
};
var format = {
	hours: '{hh}:',
	minutes: '{mm}:',
	seconds: '{ss}'
};
//快乐彩
var hglastFullExpect;
var bjlastFullExpect;
var azlastFullExpect;
var twlastFullExpect;
var jndbslastFullExpect;
var xdlkl8lastFullExpect;// 新德里
var sgkenolastFullExpect;// 新加坡
var djkl8lastFullExpect; // 东京
var jzdkl8lastFullExpect;
var ldkl8lastFullExpect;
var xhgkl8lastFullExpect;//新韩国快乐8
var xdjkl8lastFullExpect;//新东京快乐8

var isFirst = {};

function loadOpenTimes(shortName) {
	var ret = '';
	var retopen = {};
	$.ajax({
		type: "post",
		url: "/ct-data/loadOpenTime",
		data: {
			"shortName": shortName
		},
		datatype: "json",
		async: false,
		success: function(msg) {
			if (msg.sign ) {
				way.set(shortName + ".showExpect.currExpect", msg.currFullExpect);
				
				if (msg.remainTime&&eval(msg.remainTime) > 1) {
                    if (shortName == 'bjkl8') {
                        bjlastFullExpect = msg.lastFullExpect;
                    } else if (shortName == 'hgkl8') {
                        hglastFullExpect = msg.lastFullExpect;
                    } else if (shortName == 'azjn') {
                        azlastFullExpect = msg.lastFullExpect;
                    } else if (shortName == 'twbingo') {
                        twlastFullExpect = msg.lastFullExpect;
                    } else if (shortName == 'jndbs') {
                        jndbslastFullExpect = msg.lastFullExpect;
                    } else if (shortName == 'xdlkl8') {
                        xdlkl8lastFullExpect = msg.lastFullExpect;
                    } else if (shortName == 'sgkeno') {
                        sgkenolastFullExpect = msg.lastFullExpect;
                    } else if (shortName == 'djkl8') {
                        djkl8lastFullExpect = msg.lastFullExpect;
                    } else if (shortName == 'jzdkl8') {
                        jzdkl8lastFullExpect = msg.lastFullExpect;
                    } else if (shortName == 'ldkl8') {
                        ldkl8lastFullExpect = msg.lastFullExpect;
                    }else if (shortName == 'xhgkl8') {
						xhgkl8lastFullExpect = msg.lastFullExpect;
					}else if (shortName == 'xdjkl8') {
						xdjkl8lastFullExpect = msg.lastFullExpect;
					}else{
                    	return;
					}

					ret = msg.lastFullExpect;
					retopen = msg.openRemainTime;
					var dnow = new Date();
					Tictac.create("gametimes_" + shortName, {
						targetId: "gametimes_" + shortName,
						expires: dnow.getTime() + eval(msg.remainTime) * 1000,
						format: format,
						formatIgnore: false,
						timeout: function() {
							audioPlay(2);
							loadOpenTimes(shortName);
							openResult(shortName, msg.currFullExpect);
						}
					});
				} else {
					if (shortName=='jndbs' && msg.currFullExpect=="000000") {
						$("#"+shortName+" span.jishi").html('暂停下注 <em id="gametimes_jndbs"></em>');
						ret = msg.lastFullExpect;
					} else {
						setTimeout(function() {
							loadOpenTimes(shortName);
						}, 5000);
					}
				}
			} else {
				if (user) {
					popTips('获取开奖时间错误！', 'error');
				}
			}
		}
	});
	if (ret) {
		//隐藏开奖号码区域
		if (!isFirst || !isFirst[shortName]) {
			$("#" + shortName).find(".keno-fun-bar").find(".keno-playing").find(".k-play-qiu").hide();
			$("#" + shortName).find(".keno-fun-bar").find(".keno-playing").find(".k-play-lei").hide();
			$("#" + shortName).find("http://www.yugj881.com/resources/main/.keno-fun-bar .ddkj").show();
			isFirst[shortName] = true;
		}
		loadOpenCodes(shortName, ret);

	}
}
var bjTimeOut = [];

function loadOpenCodes(shortName, expect) {
    var ret = false;
    $.ajax({
        type: "post",
        url: "/ct-data/loadOpenCode",
        data: {
            "shortName": shortName,
            "expect": expect
        },
        datatype: "json",
        timeout: 5000,
        success: function (msg) {
            if (msg.sign === true) {
                var lastExpect;
                if (msg.lastOpenCode.length > 0) {
                    //$("#" + shortName + "showLastExpect").show();
                    if (bjTimeOut[shortName]) {
                        clearInterval(bjTimeOut[shortName]);
                    }
                    $("#" + shortName).find(".keno-fun-bar").find(".keno-playing").find(".k-play-qiu").show();
                    $("#" + shortName).find(".keno-fun-bar").find(".keno-playing").find(".k-play-lei").show();
                    $("#" + shortName).find("http://www.yugj881.com/resources/main/.keno-fun-bar .ddkj").hide();
                    // lastExpect = way.get(shortName + ".showExpect.lastExpect");
                    way.set(shortName + ".showExpect.lastExpect", msg.expect);
                    if (bjlastFullExpect == expect || hglastFullExpect == expect ||
                        azlastFullExpect == expect || twlastFullExpect == expect ||
                        jndbslastFullExpect == expect || xdlkl8lastFullExpect == expect ||
                        sgkenolastFullExpect == expect || djkl8lastFullExpect == expect
                        || jzdkl8lastFullExpect == expect || ldkl8lastFullExpect == expect
						|| xhgkl8lastFullExpect == expect|| xdjkl8lastFullExpect == expect) {
                        openklc(msg.shortName, msg.lastOpenCode, expect);
                    }
                } else {
                    //$("#" + shortName + "showLastExpect").hide();;
                    if (bjlastFullExpect == expect || hglastFullExpect == expect ||
                        azlastFullExpect == expect || twlastFullExpect == expect ||
                        jndbslastFullExpect == expect || xdlkl8lastFullExpect == expect ||
                        sgkenolastFullExpect == expect || djkl8lastFullExpect == expect
                        || jzdkl8lastFullExpect == expect || ldkl8lastFullExpect == expect
						|| xhgkl8lastFullExpect == expect|| xdjkl8lastFullExpect == expect) {
                        if (bjTimeOut[shortName]) {
                            clearInterval(bjTimeOut[shortName]);
                        }
                        bjTimeOut[shortName] = setInterval(function () {
                            loadOpenCodes(shortName, expect);
                        }, 5 * 1000);
                    }
                }

            } else {
                popTips(msg.message, 'error');

            }
        }
    });
}
//构造玩法页面
var rulePage = function() {
	$.ajax({
		type: "post",
		url: "/ct-data/lotteryPlayRulesRate",
		data: {
			"ruleCode": "klcqw"
		},
		datatype: "json",
		success: function(msg) {
			if (msg.sign === true) {
				$.each(msg.rateList, function(idx, val) {
					way.set("klc_" + val.code, val.rate);
					way.set("klc_" + val.code + "_mixmoney", val.mixmoney);
					way.set("klc_" + val.code + "_maxmoney", val.maxmoney);
				});
			} else {

				popTips(msg.message, 'error');

			}
		}
	});
};
/**
 * 获取当天的开奖号码，加载路子页面
 */
var openCodeList = function(shortName) {
	var arrdaxiao = [];
	var arrdanshuang = [];
	var arrjiou = [];
	var arrshangxia = [];
	var arrhezhi = [];
	var arrwuxing = [];
	$.ajax({
		type: "post",
		url: "/ct-data/openCodeDayList",
		data: {
			"shortName": shortName
		},
		datatype: "json",
		success: function(msg) {
			if (msg.sign === true) {
				$.each(msg.openCodeList, function(idx, val) {
					var openCodes = val.openCode.split(",");
					var tatol = 0;
					var s = 0;
					var x = 0;
					var j = 0;
					var o = 0;
					$.each(openCodes, function(index, value) {
						tatol += parseInt(value);
						if (parseInt(value) < 41)
							s++;
						else x++;
						if (parseInt(value) % 2 === 0)
							o++;
						else j++;

					});
					if (tatol > 810)
						arrdaxiao.unshift("大");
					else if (tatol < 810)
						arrdaxiao.unshift("小");
					else arrdaxiao.unshift("和");
					if (s > x)
						arrshangxia.unshift("上");
					else if (s < x)
						arrshangxia.unshift("下");
					else arrshangxia.unshift("中");
					if (j > o)
						arrjiou.unshift("奇");
					else if (j < o)
						arrjiou.unshift("偶");
					else
						arrjiou.unshift("和");
					if (tatol % 2 === 0)
						arrdanshuang.unshift("双");
					else arrdanshuang.unshift("单");
					arrhezhi.unshift(tatol);
					if (tatol >= 210 && tatol <= 695)
						arrwuxing.unshift("金");
					else if (tatol >= 696 && tatol <= 763)
						arrwuxing.unshift("木");
					else if (tatol >= 764 && tatol <= 855)
						arrwuxing.unshift("水");
					else if (tatol >= 856 && tatol <= 923)
						arrwuxing.unshift("火");
					else
						arrwuxing.unshift("土");
				});
				patten(arrdaxiao, arrdanshuang, arrjiou, arrshangxia, arrhezhi, arrwuxing, shortName);
				tabs(".routelotHd", "cur", ".routelotBd", shortName);
			} else {
				popTips(msg.message, 'error');
			}
		}
	});
}

/**
 * 从cookies中获取自定义筹码
 */
function getBargainingChip() {
	var bargainingChip = [];
	bargainingChip[0] = getCookie("bargainingChip1") ? getCookie("bargainingChip1") : 50;
	bargainingChip[1] = getCookie("bargainingChip2") ? getCookie("bargainingChip2") : 100;
	bargainingChip[2] = getCookie("bargainingChip3") ? getCookie("bargainingChip3") : 500;
	bargainingChip[3] = getCookie("bargainingChip4") ? getCookie("bargainingChip4") : 1000;
	bargainingChip[4] = getCookie("bargainingChip5") ? getCookie("bargainingChip5") : 5000;

	$('.cm1').parents('li').find('span').text(bargainingChip[0]);
	$('.cm2').parents('li').find('span').text(bargainingChip[1]);
	$('.cm3').parents('li').find('span').text(bargainingChip[2]);
	$('.cm4').parents('li').find('span').text(bargainingChip[3]);
	$('.cm5').parents('li').find('span').text(bargainingChip[4]);

	for (var i = 0; i < bargainingChip.length; i++) {
		$('#bet .xz-wfcm li').eq(i).find('input').val(bargainingChip[i]);
	}
}

/**
 * 计算投注盈利
 */
function countBetProfit() {
	// 赔率
	var odds = way.get("http://www.yugj881.com/resources/main/bet.odds");
	if (!odds) {
		odds = 0;
	}
	var total = way.get("bet.total");
	if (!total) {
		total = 0;
	}

	var maxmoney = way.get("bet.maxmoney");
	if (eval(total) >  eval(maxmoney)) {
		total = maxmoney;
		way.set("bet.total", total);
	}

	var profit = (parseFloat(odds) - 1) * parseFloat(total);
	way.set("bet.profit", profit.toFixed(4));
}

/**
 * 投注
 */
function klcBetting(e) {
	var shortName = way.get("bet.shortName");

	var currExpect = way.get(shortName + ".showExpect.currExpect");
	if (!currExpect) {
		popTips("当前没有待开奖期号", "waring");
		return;
	}

	var codes = way.get("bet.codes");

	var orderTotal = way.get("bet.total");
	var mixmoney = way.get("bet.mixmoney");
	var maxmoney = way.get("bet.maxmoney");
	if (!orderTotal) {
		popTips("请输入投注金额", "waring");
		return;
	}

	if (!mixmoney || !maxmoney) {
		popTips("请刷新后重试", "waring");
		return;
	}

	orderTotal = parseFloat(orderTotal);
	mixmoney = parseInt(mixmoney);
	maxmoney = parseInt(maxmoney);
	if (orderTotal < mixmoney || orderTotal > maxmoney) {
		popTips("当前投注限额为" + mixmoney + " ~ " + maxmoney, "waring");
		return;
	}

	$(e.target).attr("onclick", "");
	$.ajax({
		url: "/ct-data/userBets/klcbuy",
		type: "post",
		dataType: "json",
		data: {
			"shortName": shortName,
			"currExpect": currExpect,
			"codes": codes,
			"total": orderTotal
		},
		success: function(data) {
			if (data.sign) {
				closelayer();
				popTips(data.message, "succeed");
				dsFlushBalance();
                getUserBetsListToday();
			} else {
				popTips(data.message, "error");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {},
		complete: function() {
			$(e.target).attr("onclick", "klcBetting(event);");
		}
	});
}

Tictac.init({
	currentTime: new Date().getTime()
});
$(function() {
	rulePage();
	// loadLottery('klc');

	// ===========================彩票路单轮播==========================================================//
	$(".arrow-r").on("click", function() {
		var shortName = $(this).attr('data-common');
		var temp_index, max_len, diffvalue, max_size, arr = [],
			left_num;
		temp_index = $("#tag_" + shortName + " li.cur").index();
		left_num = $("#lotteryRoute_" + shortName + " div").eq(temp_index).children().eq(0).css("left");
		var i;
		for (i = 0; i < 6; i++) {
			arr.push($("#lotteryRoute_" + shortName + " div").eq(temp_index).children().eq(i).children().size());
		}
		for (i = 0; i < arr.length - 1; i++) {
			if (arr[i] <= arr[i + 1]) {
				max_size = arr[i + 1];
			}
		}
		max_len = -max_size * 19 + 815;
		left_num = parseInt(left_num.split("px")[0]);
		diffvalue = max_len - left_num; //移动的差值
		if ($(".arrow-r").hasClass("hei-r")) {
			if (diffvalue >= -815) {
				$("#lotteryRoute_" + shortName + " div").eq(temp_index).children().animate({
					left: max_len
				}, 500);
				$(".arrow-r").addClass('hui-r').removeClass('hei-r');
				$(".arrow-l").addClass('hei-l').removeClass('hui-l');
			} else {
				$("#lotteryRoute_" + shortName + " div").eq(temp_index).children().animate({
					left: left_num - 815
				}, 500);
				$(".arrow-r").addClass('hei-r').removeClass('hui-r');
				$(".arrow-l").addClass('hei-l').removeClass('hui-l');
			}
		}

	});
	$(".arrow-l").on("click", function() {
		var shortName = $(this).attr('data-common');
		var temp_index, temp_left, left_num;
		temp_index = $("#tag_" + shortName + " li.cur").index();
		left_num = $("#lotteryRoute_" + shortName + " div").eq(temp_index).children().eq(0).css("left");
		left_num = parseInt(left_num.split("px")[0]);
		if ($(".arrow-l").hasClass("hei-l")) {
			if (left_num >= -815) {
				$("#lotteryRoute_" + shortName + " div").eq(temp_index).children().animate({
					left: 0
				}, 500);
				$(".arrow-l").addClass('hui-l').removeClass('hei-l');
				$(".arrow-r").addClass('hei-r').removeClass('hui-r');
			} else {
				$("#lotteryRoute_" + shortName + " div").eq(temp_index).children().animate({
					left: left_num + 815
				}, 500);
				$(".arrow-l").addClass('hei-l').removeClass('hui-l');
				$(".arrow-r").addClass('hei-r').removeClass('hui-r');
			}
		}
	});

	// 下注弹框
	$(".lottery-square-big").on("click", function() {
		var shortName = $(this).parent().parent().parent().parent().parent().attr("id");
		way.set("bet.shortName", shortName);

		var currExpect = way.get(shortName + ".showExpect.currExpect");
		$("#bet .tishik").children().eq(0).children().eq(1).find('way').attr("way-data", shortName + ".showExpect.currExpect");
		$("#bet .tishik").children().eq(0).children().eq(1).find('way').text(currExpect);

		var codes = $(this).find(".text-middle").attr("way-data");
		if (codes) {
			codes = codes.substr(4);
		} else {
			popTips("请刷新后重试", "error");
			return;
		}
		var showHtml = $(this).find(".text-big").text();
		var odds = way.get("klc_" + codes); // 赔率
		showHtml = "<strong>" + showHtml + "</strong>x" + odds;
		$("#bet .tishik").children().eq(0).children().eq(2).html(showHtml);

		way.set("bet.codes", codes);
		way.set("http://www.yugj881.com/resources/main/bet.odds", odds);

		way.set("bet.total", "0");
		way.set("bet.profit", "http://www.yugj881.com/resources/main/0.0000");
		way.set("bet.mixmoney", way.get("klc_" + codes + "_mixmoney").toFixed(4));
		way.set("bet.maxmoney", way.get("klc_" + codes + "_maxmoney").toFixed(4));

		getBargainingChip();

		pop("bet");
		flag = true;
		userCustom();
	});

	// 筹码点击事件
	$('#bet .xz-wfcm em li').on("click", function() {

		if ($(this).parent().find('input').attr("disabled") != "disabled") {
			return;
		}

		var total = way.get('bet.total');
		if (!total) {
			total = 0;
		}
		var addMoney = $(this).parent().find('input').val();
		if (!addMoney) {
			addMoney = 0;
		}
		total = parseInt(total) + parseInt(addMoney);
		way.set('bet.total', total);

		countBetProfit();
	});

    getUserBetsListToday();// 初始化投注方案

});

function userCustom() {
	if (flag) {
		$('.cm1').parents('li').find('input').attr("disabled", true);
		$('.cm2').parents('li').find('input').attr("disabled", true);
		$('.cm3').parents('li').find('input').attr("disabled", true);
		$('.cm4').parents('li').find('input').attr("disabled", true);
		$('.cm5').parents('li').find('input').attr("disabled", true);

		$('.cm1').parents('li').find('input').attr("hidden", true);
		$('.cm2').parents('li').find('input').attr("hidden", true);
		$('.cm3').parents('li').find('input').attr("hidden", true);
		$('.cm4').parents('li').find('input').attr("hidden", true);
		$('.cm5').parents('li').find('input').attr("hidden", true);

		$('.cm1').parents('li').find('span').attr("hidden", false);
		$('.cm2').parents('li').find('span').attr("hidden", false);
		$('.cm3').parents('li').find('span').attr("hidden", false);
		$('.cm4').parents('li').find('span').attr("hidden", false);
		$('.cm5').parents('li').find('span').attr("hidden", false);

		$('.cm1').parents('li').find('span').show();
		$('.cm2').parents('li').find('span').show();
		$('.cm3').parents('li').find('span').show();
		$('.cm4').parents('li').find('span').show();
		$('.cm5').parents('li').find('span').show();

        getBargainingChip();

		$('#userBetDiv').show();
		$('#userCustomDiv').hide();

		flag = false;
	} else {

		$('.cm1').parents('li').find('input').attr("disabled", false);
		$('.cm2').parents('li').find('input').attr("disabled", false);
		$('.cm3').parents('li').find('input').attr("disabled", false);
		$('.cm4').parents('li').find('input').attr("disabled", false);
		$('.cm5').parents('li').find('input').attr("disabled", false);

		$('.cm1').parents('li').find('input').attr("hidden", false);
		$('.cm2').parents('li').find('input').attr("hidden", false);
		$('.cm3').parents('li').find('input').attr("hidden", false);
		$('.cm4').parents('li').find('input').attr("hidden", false);
		$('.cm5').parents('li').find('input').attr("hidden", false);

		$('.cm1').parents('li').find('span').attr("hidden", true);
		$('.cm2').parents('li').find('span').attr("hidden", true);
		$('.cm3').parents('li').find('span').attr("hidden", true);
		$('.cm4').parents('li').find('span').attr("hidden", true);
		$('.cm5').parents('li').find('span').attr("hidden", true);

		$('.cm1').parents('li').find('span').hide();
		$('.cm2').parents('li').find('span').hide();
		$('.cm3').parents('li').find('span').hide();
		$('.cm4').parents('li').find('span').hide();
		$('.cm5').parents('li').find('span').hide();

		getBargainingChip();

		$('#userBetDiv').hide();
		$('#userCustomDiv').show();
		flag = true;
	}
}

/**
 * 保存自定义筹码
 */
function saveUserCustomChips() {
	// 自定义筹码事件
	setCookie("bargainingChip1", $('.cm1').parents('li').find('input').val(), 365);
	setCookie("bargainingChip2", $('.cm2').parents('li').find('input').val(), 365);
	setCookie("bargainingChip3", $('.cm3').parents('li').find('input').val(), 365);
	setCookie("bargainingChip4", $('.cm4').parents('li').find('input').val(), 365);
	setCookie("bargainingChip5", $('.cm5').parents('li').find('input').val(), 365);

	$('.cm1').parents('li').find('span').text($('.cm1').parents('li').find('input').val());
	$('.cm2').parents('li').find('span').text($('.cm2').parents('li').find('input').val());
	$('.cm3').parents('li').find('span').text($('.cm3').parents('li').find('input').val());
	$('.cm4').parents('li').find('span').text($('.cm4').parents('li').find('input').val());
	$('.cm5').parents('li').find('span').text($('.cm5').parents('li').find('input').val());

	userCustom();
}

//异步去取上一次的开奖结果和中奖情况
function openResult(shortName, expect) {
	$.ajax({
		type: "post",
		url: "/ct-data/userBets/openResult",
		data: {
			"shortName": shortName,
			"expect": expect
		},
		datatype: "json",
		success: function(msg) {
			if (msg.sign) {
				if (msg.isOpen) {
					if (msg.money[0].prizeMoney > 0) {
						$(".touzhuzj ul").empty();
						var insertHtml = "<li>投注彩种：<span>" + msg.showName + "</span></li>";
						insertHtml += "<li>投注期号：<span>" + msg.expect + "</span></li>";
                        insertHtml += "<li>投注金额：<span>" + msg.money[0].totalMoney + "元</span></li>";
                        insertHtml += "<li>中奖金额：<span>" + msg.money[0].prizeMoney + "元</span></li>";
                        insertHtml += "<li>本次盈亏：<span>" + (eval(msg.money[0].prizeMoney) - eval(msg.money[0].totalMoney)).toFixed(4) + "元</span></li>";
						$(".touzhuzj ul").html(insertHtml);
						// pop('kjts','320px','250px');
						$(".touzhuzj").html($(".touzhuzj").html()).show(300).delay(30000).hide(300);
						audioPlay(1);
						// $("#kjts").html().show(300).delay(3000).hide(300);
					}
				} else {
					setTimeout(function() {
						openResult(shortName, expect);
					}, 5 * 1000);
				}
			} else {
				popTips(msg.message, "error");
			}
		}
	});
}


/**
 * 当天投注记录
 * @param shortName
 */
function getUserBetsListToday(shortName) {
    if(!shortName) {
        shortName = $('#shortNameKlc').val();
    }
    $("#userBetsListToday").empty();
    $.ajax({
        url : "/ct-data/userBets/userBetsListToday",
        type : "post",
        dataType : "json",
        data : {
            "shortName" : shortName
        },
        success : function(data) {
            if(data.sign === true) {
                var html = "";
                $.each(data.userbetList, function(idx, val){
                    html += '<tr>';
                    html += '<td><a href="javascript:getBillInfo(\'' + val.billno + '\')"><font color=grey>' + val.billno + '</font></a></td>';
//					html += '<td>' + val.billno + '</td>';
                    html += '<td>' + val.betsTimes + '</td>';
                    html += '<td>' + val.ruleName + '</td>';
                    html += '<td>' + val.expect + '</td>';
                    html += '<td>' + val.betsMoney + '</td>';
                    html += '<td>' +( val.prizeMoney? val.prizeMoney :0)+ '</td>';
                    html += '<td';
                    if("已中奖" === val.state) {
                        html += ' class="sty-yzj"';
                    } else if("已撤单" === val.state) {
                        html += ' class="sty-ycd"';
                    }
                    html += '>' + val.state + '</td>';
                    html += '</tr>';
                });
                $("#userBetsListToday").html(html);
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
        }
    });
}

/**
 * 当天投注盈亏
 * @param shortName
 */
function getUserBetsListProfitAndLossToday(shortName) {
    if(!shortName) {
        shortName = $('#shortNameKlc').val();
    }
    $("#userBetsListToday").empty();
    $.ajax({
        url : "/ct-data/userBets/userBetsListProfitAndLossToday",
        type : "post",
        dataType : "json",
        data : {
            "shortName" : shortName
        },
        success : function(data) {
            if(data.sign === true) {
                var html = "";
                $.each(data.userbetList, function(idx, val){
                    html += '<tr>';
                    html += '<td>' + val.billno + '</td>';
                    html += '<td>' + val.betsTimes + '</td>';
                    html += '<td>' + val.ruleName + '</td>';
                    html += '<td>' + val.expect + '</td>';
                    html += '<td>' + val.betsMoney + '</td>';
                    html += '<td>' +( val.prizeMoney? val.prizeMoney :0)+ '</td>';
                    html += '<td';
                    if("未中奖" === val.state) {
                        //html += ' class="red"';
                        html += ' class="sty-yzj"';
                    }
                    html += '>' + val.state + '</td>';
                    html += '</tr>';
                });
                $("#userBetsListToday").html(html);
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
        }
    });
}
