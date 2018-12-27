/**
获取用户银行账户是否绑定
获取密码保护问题是否绑定
获取google认证是否绑定
*/
var isTradePassword = false;
var isQuestion = false;
function userSecurityLevel() {
	$.ajax({
		url: '/ct-data/user/userSecurityLevel',
		type: 'POST',
		dataType: 'json',
		success: function(data) {
			if (data.sign) {
				if (data.isTradePassword) {
					isTradePassword = true;
				}
				if (data.isQuestion) {
					isQuestion = true;
				}
			}
		},
		error: function(xhr, textStatus, errorThrown) {}
	});
}

/**
 * 获取团队人数
 */
function getDownUserNum() {
	$.ajax({
		url: "/ct-data/user/downUserNum",
		type: "post",
		dataType: "json",
		success: function(msg) {
			if (msg.sign === true) {
				var downUserNum = {};
				downUserNum.total = msg.data.totalNum;
				downUserNum.proxy = msg.data.proxyNum;
				downUserNum.noProxy = msg.data.noProxyNum;
				way.set("downUserNum", downUserNum);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {}
	});
}

/**
 * 获取团队余额(不包含自己)
 */
function getDownUserTotalMoney() {
	$.ajax({
		url: "/ct-data/userAccount/downUserTotalMoney",
		type: "post",
		dataType: "json",
		success: function(msg) {
			if (msg.sign === true) {
                if(msg.data){
                    for(var i=0;i<msg.data.length;i++){
                        if(msg.data[i].currency == 'rmb'){
                            way.set("downUser.totalMoney", msg.data[i].totalMoney);
                        }
                    }
                }

			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {}
	});
}

// 当前首页统计
var currentAccountType;
/**
 * 初始化代理首页统计
 * @param accountType
 */
function initStatistics(accountType) {
//	$("#indexStartDate").val(laydate.now());
//	$("#indexEndDate").val(laydate.now(1));

	currentAccountType = accountType;

	var html = '';
	if (accountType == "baccarat") {
		html += '<li><input type="radio" id="zr" value="zr" placeholder="" name="indexType" checked="checked"><label for="zr" class="checked">转入</label></li>';
		html += '<li><input type="radio" id="zc" value="zc" placeholder="" name="indexType"><label for="zc">转出</label></li>';
		html += '<li><input type="radio" id="tz" value="tz" placeholder="" name="indexType"><label for="tz">投注</label></li>';
		html += '<li><input type="radio" id="fd" value="fd" placeholder="" name="indexType"><label for="fd">返点</label></li>';
		html += '<li><input type="radio" id="fs" value="fs" placeholder="" name="indexType"><label for="fs">返水</label></li>';
	} else {
		html += '<li><input type="radio" id="cz" value="cz" placeholder="" name="indexType" checked="checked"><label for="cz" class="checked">充值</label></li>';
		html += '<li><input type="radio" id="tx" value="tx" placeholder="" name="indexType"><label for="tx">提现</label></li>';
		html += '<li><input type="radio" id="tz" value="tz" placeholder="" name="indexType"><label for="tz">投注</label></li>';
		html += '<li><input type="radio" id="fd" value="fd" placeholder="" name="indexType"><label for="fd">返点</label></li>';
		html += '<li><input type="radio" id="xz" value="xz" placeholder="" name="indexType"><label for="xz">新增用户</label></li>';
	}

	$("#indexAgent .dzxz ul").html(html);

	$("#indexAgent .dzxz ul li input").on('click', function() {
		if (accountType == "baccarat") {
			initEchartsBaccarat();
		} else {
			initEchartsLottery(accountType);
		}
	});

	searchStatistics(accountType);
}

/**
 * 查询
 * @param accountType
 * @returns
 */
function searchStatistics(accountType) {
	if (!accountType) {
		accountType = currentAccountType;
	}

	if (accountType == "baccarat") {
		initIndexBaccarat();
		initEchartsBaccarat();
	} else {
		initIndexLottery(accountType);
		initEchartsLottery(accountType);
	}
}

/**
 * 快速选择时间
 */
function indexQuickDate(days) {
	$("#indexStartDate").val(laydate.now(days));
	$("#indexEndDate").val(laydate.now(1));
	searchStatistics();
}

/**
 * 初始化代理首页彩票娱乐
 */
function initIndexLottery(accountType) {
	var startDate = $("#indexStartDate").val();
	var endDate = $("#indexEndDate").val();

	$.ajax({
		url: "/ct-data/lotteryReport/statistics",
		type: "post",
		dataType: "json",
		data: {
			"startDate": startDate,
			"endDate": endDate,
			"accountType": accountType
		},
		success: function(data) {
			if (data.sign === true) {
				var html = '<dd><span>充值量</span><br><b>' + data.dayDownRechargeMoney + '</b></dd>';
				html += '<dd><span>提现量</span><br><b>' + data.dayDownDrawMoney + '</b></dd>';
				html += '<dd><span>代购量</span><br><b>' + data.dayDownEnsureConsumpMoney + '</b></dd>';
				html += '<dd><span>派奖量</span><br><b>' + data.dayDownIncomeMoney + '</b></dd>';
				html += '<dd><span>返点</span><br><b>' + data.dayDownCommMoney + '</b></dd>';

				$("#indexAgent .ctsj dl").html(html);
			} else {
				popTips(data.message, "error");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {}
	});
}

/**
 * 图表
 * @param accountType
 */
function initEchartsLottery(accountType) {
	var endDate = $("#indexEndDate").val();
	var type = $('input[name="indexType"]:checked').val();

	$.ajax({
		type: "post",
		url: "/ct-data/lotteryReport/echarts",
		data: {
			"endDate": endDate,
			"type": type,
			"accountType": accountType
		},
		datatype: "json",
		success: function(msg) {
			if (msg.sign) {
				var tubiao = echarts.init(document.getElementById('tubiao'), 'macarons');
				var option = {
					title: {
						text: '',
						subtext: '              ' + msg.subtext
					},
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: [msg.text]
					},
					toolbox: {
						show: true,
						x: 'right',
						y: 'top',
						feature: {
							mark: {
								show: true
							},
							dataView: {
								show: true,
								readOnly: false
							},
							magicType: {
								show: true,
								type: ['line', 'bar']
							},
							restore: {
								show: true
							},
							saveAsImage: {
								show: true
							}
						}
					},
					calculable: true,
					grid: {
						x: 60
					},
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						data: msg.date
					}],
					yAxis: [{
						type: 'value',
						axisLabel: {
							formatter: '{value}'
						}
					}],
					series: [{
						name: msg.text,
						type: 'line',
						data: msg.data,
						markPoint: {
							data: [{
								type: 'max',
								name: '最大值'
							}, {
								type: 'min',
								name: '最小值'
							}]
						},
						markLine: {
							data: [{
								type: 'average',
								name: '平均值'
							}]
						}
					}]
				};
				tubiao.setOption(option);
			}
		}
	});
}

/**
 * 初始化代理首页彩票娱乐
 */
function initIndexBaccarat() {
	var startDate = $("#indexStartDate").val();
	var endDate = $("#indexEndDate").val();

	$.ajax({
		url: "/ct-data/baccaratReport/statistics",
		type: "post",
		dataType: "json",
		data: {
			"startDate": startDate,
			"endDate": endDate
		},
		success: function(data) {
			if (data.sign === true) {
				var html = '<dd><span>充值量</span><b>' + data.transferIn + '</b></dd>';
				html += '<dd><span>提现量</span><b>' + data.transferOut + '</b></dd>';
				html += '<dd><span>代购量</span><b>' + data.validAmount + '</b></dd>';
				html += '<dd><span>派奖量</span><b>' + data.payoutAmount + '</b></dd>';
				html += '<dd><span>返点</span><b>' + data.dayBackPoint + '</b></dd>';
				html += '<dd><span>返水</span><b>' + data.dayBackWater + '</b></dd>';

				$("#indexAgent .ctsj dl").html(html);
			} else {
				popTips(data.message, "error");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {}
	});
}

/**
 * 图表
 */
function initEchartsBaccarat() {
	var endDate = $("#indexEndDate").val();
	var type = $('input[name="indexType"]:checked').val();
	$.ajax({
		type: "post",
		url: "/ct-data/baccaratReport/echarts",
		data: {
			"endDate": endDate,
			"type": type
		},
		datatype: "json",
		success: function(msg) {
			if (msg.sign) {
				var tubiao = echarts.init(document.getElementById('tubiao'), 'macarons');
				var option = {
					title: {
						text: '',
						subtext: '              ' + msg.subtext
					},
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: [msg.text]
					},
					toolbox: {
						show: true,
						feature: {
							mark: {
								show: true
							},
							dataView: {
								show: true,
								readOnly: false
							},
							magicType: {
								show: true,
								type: ['line', 'bar']
							},
							restore: {
								show: true
							},
							saveAsImage: {
								show: true
							}
						}
					},
					calculable: true,
					grid: {
						x: 60
					},
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						data: msg.date
					}],
					yAxis: [{
						type: 'value',
						axisLabel: {
							formatter: '{value}'
						}
					}],
					series: [{
						name: msg.text,
						type: 'line',
						data: msg.data,
						markPoint: {
							data: [{
								type: 'max',
								name: '最大值'
							}, {
								type: 'min',
								name: '最小值'
							}]
						},
						markLine: {
							data: [{
								type: 'average',
								name: '平均值'
							}]
						}
					}]
				};
				tubiao.setOption(option);
			}
		}
	});
}

/**
 * 初始化开户中心
 */
function initAddUser() {
	
	$.ajax({
		url: "/ct-data/user/getUserRebateReg",
		type: "post",
		dataType: "json",
		success: function(data) {
			if (data.sign === true) {
				var maxLottery = (data.maxLottery * 100).toFixed(1);
				way.set("addUser.maxRebate", maxLottery);
				way.set("addUser.maxLotteryReg", data.maxLotteryReg);
				if (maxLottery >= 12) {
					$(".tianjzh .sty-h").show();
				}
			} else {
				popTips(data.message, "error");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {}
	});
}

/**
 * 检查用户名是否合法
 */
function checkAddUsername() {
	var username = way.get("addUser.username");
	if (!username || username.length < 1) {
		// $("#addUserGeneralTipsUsername").text("请输入用户名");
		$("#addUserGeneralTipsUsername").addClass("dred");
		return false;
	}
	var reg = /^[a-zA-Z][a-zA-Z\d]{4,9}$/;
	if (!reg.test(username)) {
		// $("#addUserGeneralTipsUsername").text("用户名格式不正确");
		$("#addUserGeneralTipsUsername").addClass("dred");
		return false;
	} else {
		// $("#addUserGeneralTipsUsername").text("正在验证用户名...");
		$("#addUserGeneralTipsUsername").removeClass("dred");
	}

	return true;
}
/**
 * 检查彩票返点是否合法
 */
function checkAddUserRebate() {
	var rebateid = way.get("addUser.rebateid");
	//rebateid = parseFloat(rebateid);
	var maxLotteryReg = eval('/' + way.get("addUser.maxLotteryReg") + '/');

	if (!maxLotteryReg.test(rebateid)) {
		// $("#addUserGeneralTipsUsername").text("用户名格式不正确");
		$("#addUserGeneralTipsRebate").addClass("dred");
		return false;
	} else {
		// $("#addUserGeneralTipsUsername").text("正在验证用户名...");
		$("#addUserGeneralTipsRebate").removeClass("dred");
	}

	return true;
}

/**
 * 添加用户
 */
function addUser() {
	if (!user) {
		popTips("用户未登录", "waring");
		return;
	}
	if (!checkAddUsername()) {
		popTips("请输入合法的用户名", "waring");
		return;
	}
	if (!checkAddUserRebate()) {
		popTips("请输入合法的彩票返点", "waring");
		return;
	}
	var userType = $('input[name="addUserGeneral"]:checked').val();
	if (!userType) {
		popTips("请选择开户类型", "waring");
		return;
	}
	var username = way.get("addUser.username");
	var rebateid = way.get("addUser.rebateid");

	$.ajax({
		url: "/ct-data/user/addDown",
		type: "post",
		dataType: "json",
		data: {
			"loginname": username,
			"rebate": rebateid,
			"isProxy": userType
		},
		success: function(data) {
			if (data.sign === true) {
				way.set("addUser.username", "");
				way.set("addUser.rebateid", "");
				popTips(data.message, 'succeed');
			} else {
				popTips(data.message, 'error');
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			popTips("添加用户失败", 'error');
		}
	});
}

/**
 * 检查彩票返点是否合法
 */
function checkAddSignuplinkRebate() {
	var rebateid = way.get("addSignuplink.rebateid");
	var maxLotteryReg = eval('/' + way.get("addUser.maxLotteryReg") + '/');

	if (!maxLotteryReg.test(rebateid)) {
		$("#addSignuplinkTipsRebate").addClass("dred");
		return false;
	} else {
		$("#addSignuplinkTipsRebate").removeClass("dred");
	}

	return true;
}

/**
 * 添加开户链接
 */
function addSignuplink() {
	if (!user) {
		popTips("用户未登录", "waring");
		return;
	}
	var times = way.get("addSignuplink.times");
	times = parseInt(times);
	if (!times || times < 1) {
		popTips("使用次数只能为正整数", "waring");
		return;
	}

	if (!checkAddSignuplinkRebate()) {
		popTips("请输入合法的彩票返点", "waring");
		return;
	}
	var userType = $('input[name="addSignuplink"]:checked').val();
	if (!userType) {
		popTips("请选择开户类型", "waring");
		return;
	}

	var addSignuplinkValid = $("#addSignuplinkValid").val();
	var rebateid = way.get("addSignuplink.rebateid");

	if (addSignuplinkValid) {
		addSignuplinkValid = parseInt(addSignuplinkValid) * 24;
	} else {
		addSignuplinkValid = 24;
	}

	$.ajax({
		url: "/ct-data/signup/addSignup",
		type: "post",
		dataType: "json",
		data: {
			"isProxy": userType,
			"validDays": addSignuplinkValid,
			"times": times,
			"rebate": rebateid
		},
		success: function(data) {
			if (data.sign === true) {
				way.set("addSignuplink.rebateid", "");
				way.set("addSignuplink.times", "");
				popTips(data.message, 'succeed');
			} else {
				popTips(data.message, 'error');
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			popTips("添加链接失败", 'error');
		}
	});
}

/**
 * 链接列表
 */
function signuplinkList() {
	var thisPanel = $("#signuplinkList table tbody");
	var htmlTitle = '<tr><th>用户类型</th><th>彩票返点</th><th>剩余/有效时间(H)</th>' +
		'<th>使用次数/总次数</th><th>创建时间</th><th>操作</th></tr>';
	thisPanel.empty();
	thisPanel.html(htmlTitle);
    $('#signuplinkList .paging').show();
	$('#signuplinkList .paging').empty();

	var jqueryGridPage = 1;
	var jqueryGridRows = 10;

	var pagination = $.pagination({
		render: '#signuplinkList .paging',
		pageSize: jqueryGridRows,
		pageLength: 7,
		ajaxType: 'post',
		hideInfos: false,
		hideGo: true,
		ajaxUrl: '/ct-data/signup/signupLinkList',
		ajaxData: {
			"jqueryGridPage": jqueryGridPage,
			"jqueryGridRows": jqueryGridRows
		},
		complete: function() {},
		success: function(data) {
			thisPanel.empty();
			thisPanel.html(htmlTitle);
			var registerUrl = currentRootDirectory + '/view/acegi/register.html?id=';
			$.each(data, function(idx, val) {
				var html = '';
				var data = new Date();
				var millTime = data.getTime() - Date.parse(val.createTime.replace(/-/g, '/'));
				var hours = Math.floor(millTime / (3600 * 1000));
				html += '<tr>';
				html += '<td>' + (val.userType ? '代理' : '普通用户') + '</td>';
				html += '<td>' + (val.rebate ? (val.rebate * 100).toFixed(1) : 0) + '</td>';
                html += '<td>' + ((val.validDays - hours) < 0 ? 0 : (val.validDays - hours)) + '/' + val.validDays + '</td>';
				html += '<td>' + val.useTimes + '/' + val.times + '</td>';
				html += '<td>' + val.createTime + '</td>';
				if (hours > val.validDays || (eval(val.times) - eval(val.useTimes)) < 1) {
					html += '<td>已失效&nbsp;';
				} else {
					html += '<td><a href="javascript:;" id="copy_' + val.id;
					html += '" data-clipboard-text="' + registerUrl + val.id + '">复制</a>&nbsp;';
				}
				html += '<a href="javascript:;" onclick="delSignuplinkConfirm(\'' + val.id + '\');">删除</a></td>';
				html += '</tr>';
				thisPanel.append(html);
				copySignuplink('copy_' + val.id);
			});
		},
		pageError: function(response) {},
		emptyData: function() {}
	});
	pagination.init();
}

/**
 * 复制链接
 * @param id
 */
function copySignuplink(id) {
	var clip = new ZeroClipboard(document.getElementById(id));

	clip.on("aftercopy", function(e) {
		popTips("复制成功", "succeed");
	});

	/*clip.on("error", function(e) {
		var message = "复制失败！";
		if (e.name === "flash-disabled") {
			message += "Flash被禁用或未安装！";
		} else if (e.name === "flash-outdated") {
			message += "Flash版本过低！";
		} else if (e.name === "flash-unavailable") {
			message += "无法与JS交互！";
		} else if (e.name === "flash-deactivated") {
			message += "Flash未激活！";
		} else if (e.name === "flash-overdue") {
			message += "加载Flash SWF超时！";
		}
		popTips(message, "error");
	});*/
}

/**
 * 删除提示
 */
function delSignuplinkConfirm(id) {
	$("#deleteId").val(id);
	pop("deleteTips");
}

/**
 * 删除链接
 */
function delSignuplink() {
	closelayer();
	var id = $("#deleteId").val();
	$.ajax({
		url: "/ct-data/signup/delSignup",
		type: "post",
		dataType: "json",
		data: {
			"id": id
		},
		success: function(data) {
			if (data.sign === true) {
				signuplinkList();
			}
			popTips(data.message, (data.sign ? 'succeed' : 'error'));
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			popTips("删除链接失败", 'error');
		}
	});
}

/**
 * 初始化查询条件
 */
function initUserList() {
	$("#userSearchStartTime").val(laydate.now());
	$("#userSearchEndTime").val(laydate.now(1));

	$("#userOnlineSearchStartTime").val(laydate.now());
	$("#userOnlineSearchEndTime").val(laydate.now(1));
}

/**
 * 会员管理 - 会员列表
 */
function allUserList(userId) {
	var thisPanel = $("#allUserList table tbody");
	var htmlTitle = '<tr><th>用户名</th><th>账户类型</th><th>账户总余额</th><th>彩票/快乐彩返点</th>' +
	'<th>百家乐返点/真人/体育/电子/棋牌返水(百分位)</th><th>最后登录时间</th><th>状态</th><th>操作</th></tr>';
	thisPanel.empty();
	thisPanel.append(htmlTitle);
	$('#allUserList .paging').empty();
	
	$("#allUserList thead .butsty1:eq(1)").remove();

	if (!userId) {
		userId = '';
	} else {
		$("#userSearchLoginname").val('');
	}

	var jqueryGridPage = 1;
	var jqueryGridRows = 10;

	var startTime = $("#userSearchStartTime").val();
	var endTime = $("#userSearchEndTime").val();
	var loginname = $("#userSearchLoginname").val();
	var minMoney = $("#userSearchMinMoney").val();
	var maxMoney = $("#userSearchMaxMoney").val();

	var pagination = $.pagination({
		render: '#allUserList .paging',
		pageSize: jqueryGridRows,
		pageLength: 7,
		ajaxType: 'post',
		hideInfos: false,
		hideGo: true,
		ajaxUrl: '/ct-data/user/memberList',
		ajaxData: {
			"jqueryGridPage": jqueryGridPage,
			"jqueryGridRows": jqueryGridRows,
			"startTime": startTime,
			"endTime": endTime,
			"loginname": loginname,
			"minMoney": minMoney,
			"maxMoney": maxMoney,
			"userId": userId
		},
		complete: function() {
			addOnClickListener();
		},
		success: function(data, pid, downRechargeLevel) {
			if(pid) {
				$("#allUserList thead th").append('<a href="javascript:;" class="butsty1" onclick="allUserList(\''+pid+'\');">返回上级</a>');
			}
			thisPanel.empty();
			thisPanel.append(htmlTitle);
			$.each(data, function(idx, val) {
				var html = '<tr>';
				if (val.proxy == 1) {
					html += '<td><a href="javascript:;" onclick="allUserList(\'' + val.id + '\');"><font color="red">' + val.loginname + '</font></a></td>';
				} else {
					html += '<td>' + val.loginname + '</td>';
				}
				html += '<td>' + (val.proxy == 1 ? '代理' : '普通用户') + '</td>';
				html += '<td>' + val.balanceFree + '</td>';
				html += '<td>' + (val.backPoint ? (val.backPoint * 100).toFixed(1) : '0') + '/' + (val.klcRebate ? (val.klcRebate * 100).toFixed(1) : '0') + '</td>';

				html += '<td>' + (val.userPlatform.backPoint ? (val.userPlatform.backPoint * 100).toFixed(2) : '0') + '/';
				html += (val.userPlatform.peopleBackWater ? (val.userPlatform.peopleBackWater * 100).toFixed(1) : '0') + '/';
				html += (val.userPlatform.sportBackWater ? (val.userPlatform.sportBackWater * 100).toFixed(1) : '0') + '/';
				html += (val.userPlatform.electronBackWater ? (val.userPlatform.electronBackWater * 100).toFixed(1) : '0') + '</td>';
                html += (val.userPlatform.chessBackWater ? (val.userPlatform.chessBackWater * 100).toFixed(2) : '0') + '</td>';

				html += '<td>' + val.lasttime + '</td>';
				html += '<td>' + val.isOnline + '</td>';
				html += '<td>';
				if (val.isDownUser === true) {
					html += '<a class="shend sty-h" href="javascript:;" onclick="loadDownUserInfo(\'' + val.id + '\');">管理</a>';
				}
                var downRechargeDividend = val.downRechargeDividend == true && isShowDividend == true;
				if(val.downRecharge===true || downRechargeDividend===true || val.downRechargeDayActivity===true) {
					if(downRechargeLevel==1) {
						if(val.isDownUser===true) {
							html += '<a class="sty-h" href="javascript:;" onclick="downUserRechargeTips(\'' + val.id + '\','+val.downRecharge+','+downRechargeDividend+','+val.downRechargeDayActivity+');">充值</a>';
						}
					} else if(downRechargeLevel==0) {
						html += '<a class="sty-h"  href="javascript:;" onclick="downUserRechargeTips(\'' + val.id + '\','+val.downRecharge+','+downRechargeDividend+','+val.downRechargeDayActivity+');">充值</a>';
					}
				}
				html += '&nbsp;</td>';

				html += '</tr>';
				thisPanel.append(html);
			});
		},
		pageError: function(response) {},
		emptyData: function() {}
	});
	pagination.init();
}

/**
 * 充值提示
 * @param userId  下级ID
 * @param downRecharge	普通转账
 * @param downRechargeDividend	分红转账
 * @param downRechargeDayActivity	工资转账
 */
function downUserRechargeTips(userid, downRecharge, downRechargeDividend, downRechargeDayActivity) {
	closelayer();
	if(isDownRechargeQuestion == true) {
		if(isQuestion != true){
			popTips('未设置密码保护问题<br>前往<a href="http://www.yugj881.com/resources/main/memberAccount.html" class="dred">我的账户</a>设置', 'waring');
			return;
		}
		$("#downUserRechargeTips dd:eq(3)").show();
		$("#downUserRechargeTips dd:eq(4)").show();
	} else {
		$("#downUserRechargeTips dd:eq(3)").hide();
		$("#downUserRechargeTips dd:eq(4)").hide();
	}
	var downUserRechargeType = $("#downUserRechargeType");
	downUserRechargeType.empty();
	downUserRechargeType.append('<option value="">--请选择--</option>');
	if(downRecharge) {
		downUserRechargeType.append('<option value="downRecharge">普通转账</option>');
	}
    if(downRechargeDividend && isShowDividend) {
		downUserRechargeType.append('<option value="downRechargeDividend">分红转账</option>');
	}
	if(downRechargeDayActivity) {
		downUserRechargeType.append('<option value="downRechargeDayActivity">工资转账</option>');
	}
	$("#downUserRechargeBal").text('');
	$("#downUserRechargeUserid").val(userid);
	pop("downUserRechargeTips");
	
}

/**
 * 给下级充值
 */
function downUserRecharge(e) {
	var userid = $("#downUserRechargeUserid").val();
	var type = $("#downUserRechargeType").val();
	var money = parseInt($("#downUserRechargeMoney").val());
	var password = $("#downUserRechargePassword").val().trim();
	var question = $("#downUserRechargeQuestion").val();
	var answer = $("#downUserRechargeAnswer").val().trim();
	//var bal = eval(way.get("users.account.withdraw"));
	
	if (!type) {
		popTips("请输入选择充值类型", "waring");
		return;
	}
	
	if (!money) {
		popTips("请输入充值金额", "waring");
		return;
	}

	/*if (money > bal) {
		popTips("您的可提款金额为：" + bal + "元", "error");
		return;
	}*/
	
	if(isDownRechargeQuestion == true) {
		if (question.length < 1) {
			popTips("请选择密保问题", "waring");
			return;
		}
		
		if (answer.length < 1) {
			popTips("请输入密保问题答案", "waring");
			return;
		}
	}

	if (!password || password.length < 6) {
		popTips("密码小于6位", "waring");
		return;
	}
	
	$(e.target).removeAttr("onclick");

	$.ajax({
		url: "/ct-data/userAccount/downRecharge",
		type: "post",
		dataType: "json",
		data: {
			"type": type,
			"userid": userid,
			"money": money,
			"question": question,
			"answer": answer,
			"tradePassword": password
		},
		success: function(msg) {
			if (msg.sign === true) {
				closelayer();
				dsFlushBalance();
				isUserWithdrawLimit();
				allUserList();
				allOnlineUserList();
				$("#downUserRechargeMoney").val('');
				$("#downUserRechargePassword").val('');
				$("#downUserRechargeQuestion").val('');
				$("#downUserRechargeAnswer").val(''); 
				popTips(msg.message, "succeed");
			} else {
				popTips(msg.message, "error");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			popTips("充值失败", "error");
		},
		complete: function(){
			$(e.target).attr("onclick", "downUserRecharge(event);");
		}
	});
}

/**
 * 会员管理 - 在线会员列表
 */
function allOnlineUserList(userId) {
	var thisPanel = $("#allOnlineUserList table tbody");
	var htmlTitle = '<tr><th>用户名</th><th>账户类型</th><th>账户总余额</th><th>彩票/快乐彩返点</th>' +
	'<th>百家乐返点/真人/体育/电子/棋牌返水(百分位)</th><th>最后登录时间</th><th>状态</th></tr>';
	thisPanel.empty();
	thisPanel.append(htmlTitle);
	$('#allOnlineUserList .paging').empty();

	if (!userId) {
		userId = '';
	}

	var jqueryGridPage = 1;
	var jqueryGridRows = 10;

	var startTime = $("#userOnlineSearchStartTime").val();
	var endTime = $("#userOnlineSearchEndTime").val();
	var loginname = $("#userOnlineSearchLoginname").val();
	var minMoney = $("#userOnlineSearchMinMoney").val();
	var maxMoney = $("#userOnlineSearchMaxMoney").val();

	var pagination = $.pagination({
		render: '#allOnlineUserList .paging',
		pageSize: jqueryGridRows,
		pageLength: 7,
		ajaxType: 'post',
		hideInfos: false,
		hideGo: true,
		ajaxUrl: '/ct-data/user/memberList',
		ajaxData: {
			"jqueryGridPage": jqueryGridPage,
			"jqueryGridRows": jqueryGridRows,
			"startTime": startTime,
			"endTime": endTime,
			"loginname": loginname,
			"minMoney": minMoney,
			"maxMoney": maxMoney,
			"userId": userId,
			"isOnline": 1
		},
		complete: function() {
			addOnClickListener();
		},
		success: function(data) {
			thisPanel.empty();
			thisPanel.append(htmlTitle);
			$.each(data, function(idx, val) {
				var html = '<tr>';
				html += '<td>' + val.loginname + '</td>';
				html += '<td>' + (val.proxy == 1 ? '代理' : '普通用户') + '</td>';
				html += '<td>' + val.balanceFree + '</td>';
				html += '<td>' + (val.backPoint ? (val.backPoint * 100).toFixed(1) : '0') + '/' + (val.klcRebate ? (val.klcRebate * 100).toFixed(1) : '0') + '</td>';

				html += '<td>' + (val.userPlatform.backPoint ? (val.userPlatform.backPoint * 100).toFixed(1) : '0') + '/';
				html += (val.userPlatform.peopleBackWater ? (val.userPlatform.peopleBackWater * 100).toFixed(1) : '0') + '/';
				html += (val.userPlatform.sportBackWater ? (val.userPlatform.sportBackWater * 100).toFixed(1) : '0') + '/';
				html += (val.userPlatform.electronBackWater ? (val.userPlatform.electronBackWater * 100).toFixed(1) : '0') + '</td>';
                html += (val.userPlatform.chessBackWater ? (val.userPlatform.chessBackWater * 100).toFixed(2) : '0') + '</td>';

				html += '<td>' + val.lasttime + '</td>';
				html += '<td>' + val.isOnline + '</td>';
				html += '</tr>';
				thisPanel.append(html);
			});

		},
		pageError: function(response) {},
		emptyData: function() {}
	});
	pagination.init();
}

/**
 * 注册点击事件
 */
function addOnClickListener() {
	$("a.shend").click(function() {
		$(".m-a-one").hide();
		$(".m-a-tow").show();
	});
	$("a.fanhui").click(function() {
		$(".m-a-tow").hide();
		$(".m-a-one").show();
	});
}

/**********************代理管理->会员管理 start*******************************/
/**
 * 加载下级用户信息
 * @param userId
 */


var bjlData = [];
function loadDownUserInfo(userId) {
	// 清空下级用户信息
	$("#downUserId").val(userId);

	way.set("downUser.loginname", "");
	way.set("downUser.rebate", "");
	way.set("downUser.totalFree", "");
	way.set("downUser.rebateKlc", "");

	way.set("downUser.backPoint.minBjl", "");
	way.set("downUser.backPoint.maxBjl", "");
	way.set("downUser.backWater.maxZr", "");
	way.set("downUser.backWater.maxTy", "");
	way.set("downUser.backWater.maxDz", "");

	$("#backpointQuotaList").empty();
	
	/*$("#backpointStandard").hide();
	$("#backpointStandard tr").show();
	$("#backpointKlcStandard").hide();
	$("#backpointKlcStandard tr").show();*/

	$("#downUserQuotaList").html('<tr><th>开户级别</th><th>我的剩余开户额</th><th>下级剩余开户额</th><th>增加下级开户额</th><th>回收下级开户额</th></tr>');

	if (!userId) {
		popTips('用户ID不存在', 'error');
		$(".m-a-tow").hide();
		$(".m-a-one").show();
		return;
	}

	$.ajax({
		url: "/ct-data/quota/quotaList",
		type: "post",
		dataType: "json",
		data: {"userId": userId},
		success: function(data) {
			if (data.sign === true) {
				var downUserRebate = eval((data.rebate * 100).toFixed(1));
				var pRebate = eval((data.pRebate * 100).toFixed(1));
				var downUserRebateKlc = eval((data.rebateKlc * 100).toFixed(1));
				var pRebateKlc = eval((data.pRebateKlc * 100).toFixed(1));

				way.set("downUser.loginname", data.loginname);
				way.set("downUser.rebate", downUserRebate);
				way.set("downUser.totalFree", (data.totalFree ? data.totalFree : '0'));
				way.set("downUser.rebateKlc", downUserRebateKlc);
				
				/*// 显示时时彩升点标准
				if(pRebate >= 12) {
					if(pRebate < 12.5){
						$("#backpointStandard tr:last").hide();
					}
					if(pRebate < 12.4){
						$("#backpointStandard tr:eq(5)").hide();
					}
					if(pRebate < 12.3){
						$("#backpointStandard tr:eq(4)").hide();
					}
					if(pRebate < 12.2){
						$("#backpointStandard tr:eq(3)").hide();
					}
					if(pRebate < 12.1){
						$("#backpointStandard tr:eq(2)").hide();
					}
					
					$("#backpointStandard").show();
				}
				// 显示快乐彩升点标准
				if(pRebateKlc >= 4.5) {
					if(pRebateKlc < 5){
						$("#backpointKlcStandard tr:last").hide();
					}
					if(pRebateKlc < 4.9){
						$("#backpointKlcStandard tr:eq(5)").hide();
					}
					if(pRebateKlc < 4.8){
						$("#backpointKlcStandard tr:eq(4)").hide();
					}
					if(pRebateKlc < 4.7){
						$("#backpointKlcStandard tr:eq(3)").hide();
					}
					if(pRebateKlc < 4.6){
						$("#backpointKlcStandard tr:eq(2)").hide();
					}
					
					$("#backpointKlcStandard").show();
				}*/

				// 开户级别
				var quotaLevelHtml = '';
				// 开户额
				var quotaHtml = '';
				$.each(data.quotaList, function(idx, val) {
					val.supSurplusQuota ? val.supSurplusQuota : val.supSurplusQuota = 0;
					if(val.minRebate<=downUserRebate) {
						quotaLevelHtml += '<span>开户级别：' + val.minRebate + '~' + val.maxRebate + '</span>';
						quotaLevelHtml += '<span>我的剩余开户额：' + val.supSurplusQuota + '</span>';
						quotaLevelHtml += '<span>下级剩余开户额：' + val.subSurplusQuota + '</span>';
	
						quotaHtml += '<tr subId="' + val.subId + '" supId="' + val.supId + '">';
						quotaHtml += '<td>' + val.minRebate + '-' + val.maxRebate + '</td>';
						quotaHtml += '<td>' + val.supSurplusQuota + '</td>';
						quotaHtml += '<td>' + val.subSurplusQuota + '</td>';
						quotaHtml += '<td>+&nbsp;<input class="inp-sty-1" type="text" value=""  onkeyup="replaceAndSetPos(this,event,/[^\\d]/g,\'\');"></td>';
						quotaHtml += '<td>-&nbsp;<input class="inp-sty-1" type="text" value=""  onkeyup="replaceAndSetPos(this,event,/[^\\d]/g,\'\');"></td>';
						quotaHtml += '</tr>';
					}
				});
				// 升点
				var backpointHtml = '';
				backpointHtml += '<span>升点类型：';
				backpointHtml += '<select name=""><option value="">配额升点</option></select>';
				backpointHtml += '</span>';
				backpointHtml += '<span>升点为：';
				backpointHtml += '<select id="downUserQuotaPoint">';
				var i;
				for (i = downUserRebate + 0.1; i <= pRebate; i += 0.1) {
					backpointHtml += '<option value="' + (i / 100).toFixed(3) + '">' + i.toFixed(1) + '</option>';
				}
				backpointHtml += '</select>';
				backpointHtml += '</span>';
				backpointHtml += '<a class="butsty1" href="javascript:;" onclick="saveBackpoint(\'lottery\');">确认</a>';
				$("#backpointQuotaList").html(quotaLevelHtml + backpointHtml);

				// 开户额
				$("#downUserQuotaList").append(quotaHtml);
				// 百家乐信息
				$.ajax({
					url: "/ct-data/user/getUserRebateReg",
					type: "post",
					dataType: "json",
					data: {"userId": userId},
					success: function(data) {
						if (data.sign === true) {
							bjlData = data;
							$("#type_bjl_form").html('');
							var  html1= '<dd><span class="tt">百家乐类型：</span><span><select id="checkPlatformcode"><option>请选择</option>';
							var  html2 = '';
							for(var i=0;i<bjlData.bjlData.length;i++){
                                html1+='<option value="'+bjlData.bjlData[i].platformcode+'">'+bjlData.bjlData[i].platform+'</option>'
								// if(bjlData.bjlData[i].platformcode == '0004'){
                                 //    html1+='<option selected="selected" value="'+bjlData.bjlData[i].platformcode+'">'+bjlData.bjlData[i].platform+'</option>'
								// 	html2+='<div id="bjl_xq_from"><dd> <span class="tt">百家乐返点(百分位)：</span>'
								// 	html2+='<span><input type="text" value="'+(bjlData.bjlData[i].minBjl*100)+'" id="downUserBackPointMaxBjl" data-type="'+bjlData.maxBjlReg+'"></span>'
								// 	html2+='<span>（可分配范围 '+(bjlData.bjlData[i].minBjl*100)+'~'+(bjlData.bjlData[i].maxBjl*100)+'）</span></dd>'
                                 //    html2+='<dd> <span class="tt">真人返水(千分位)：</span>'
								// 	html2+='<span><input type="text" value="'+(bjlData.bjlData[i].peopleBackWater*1000)+'" id="downUserBackPointMaxZr" data-type="'+bjlData.maxZrReg+'"></span>'
								// 	html2+='<span>（可分配范围 0~'+(bjlData.bjlData[i].maxZr*1000).toFixed(1)+'）</span></dd>'
								// 	html2+='<dd><span class="tt">体育返水(千分位)：</span>'
								// 	html2+='<span><input type="text" value="'+(bjlData.bjlData[i].sportBackWater*1000)+'" id="downUserBackPointMaxTy" data-type="'+bjlData.maxTyReg+'"></span>'
								// 	html2+='<span>（可分配范围 0~'+(bjlData.bjlData[i].maxTy*1000).toFixed(1)+'）</span></dd>'
								// 	html2+='<dd><span class="tt">电子返水(千分位)：</span>'
                                 //    html2+='<span><input type="text" value="'+(bjlData.bjlData[i].electronBackWater*1000)+'" id="downUserBackPointMaxDz" data-type="'+bjlData.maxDzReg+'"></span>'
                                 //    html2+='<span>（可分配范围 0~'+(bjlData.bjlData[i].maxDz*1000).toFixed(1)+'）</span></dd>'
                                 //    html2+='<dd><span class="tt">棋牌返水(千分位)：</span>'
                                 //    html2+='<span><input type="text" value="'+(bjlData.bjlData[i].chessBackWater*1000)+'" id="downUserBackPointMaxQp" data-type="'+bjlData.maxQpReg+'"></span>'
                                 //    html2+='<span>（可分配范围 0~'+(bjlData.bjlData[i].maxQp*1000).toFixed(1)+'）</span></dd></div>'
								// }else{
                                 //    html1+='<option value="'+bjlData.bjlData[i].platformcode+'">'+bjlData.bjlData[i].platform+'</option>'
								// }
							}
                            html2+='<div id="bjl_xq_from"><dd> <span class="tt">百家乐返点(百分位)：</span>'
                            html2+='<span><input type="text" value="0" id="downUserBackPointMaxBjl"></span>'
                            html2+='<span>（可分配范围 0~0）</span></dd>'
                            html2+='<dd> <span class="tt">真人返水(千分位)：</span>'
                            html2+='<span><input type="text" value="0" id="downUserBackPointMaxZr"></span>'
                            html2+='<span>（可分配范围 0~0）</span></dd>'
                            html2+='<dd><span class="tt">体育返水(千分位)：</span>'
                            html2+='<span><input type="text" value="0" id="downUserBackPointMaxTy"></span>'
                            html2+='<span>（可分配范围 0~0）</span></dd>'
                            html2+='<dd><span class="tt">电子返水(千分位)：</span>'
                            html2+='<span><input type="text" value="0" id="downUserBackPointMaxDz"></span>'
                            html2+='<span>（可分配范围 0~0）</span></dd>'
                            html2+='<dd><span class="tt">棋牌返水(千分位)：</span>'
                            html2+='<span><input type="text" value="0" id="downUserBackPointMaxQp"></span>'
                            html2+='<span>（可分配范围 0~0）</span></dd></div>'
							html1+='</select></span></dd>';
							$("#type_bjl_form").append(html1);
                            $("#type_bjl_form").append(html2);
                            $('#type_bjl_form').on('change','#checkPlatformcode',function () {
                                var  platformcode  =  $("#checkPlatformcode").val();
                                if(platformcode){
                                    if(bjlData){
                                        var  html2 = '';
                                        for(var i=0;i<bjlData.bjlData.length;i++){
                                            if(bjlData.bjlData[i].platformcode == platformcode){
                                            	var minBjl = bjlData.bjlData[i].minBjl?(bjlData.bjlData[i].minBjl*100).toFixed(2):0;
                                            	var maxBjl = bjlData.bjlData[i].maxBjl?(bjlData.bjlData[i].maxBjl*100).toFixed(2):0;
                                            	var peopleBackWater = bjlData.bjlData[i].peopleBackWater*1000?(bjlData.bjlData[i].peopleBackWater*1000).toFixed(1):0;
                                            	var sportBackWater = bjlData.bjlData[i].sportBackWater*1000?(bjlData.bjlData[i].sportBackWater*1000).toFixed(1):0;
												var electronBackWater = bjlData.bjlData[i].electronBackWater*1000?(bjlData.bjlData[i].electronBackWater*1000).toFixed(1):0;
												var chessBackWater = bjlData.bjlData[i].chessBackWater*1000?(bjlData.bjlData[i].chessBackWater*1000).toFixed(1):0;

												var maxZr = bjlData.bjlData[i].maxZr?(bjlData.bjlData[i].maxZr*1000).toFixed(1):0;
												var maxTy = bjlData.bjlData[i].maxTy?(bjlData.bjlData[i].maxTy*1000).toFixed(1):0;
												var maxDz = bjlData.bjlData[i].maxDz?(bjlData.bjlData[i].maxDz*1000).toFixed(1):0
												var maxQp = bjlData.bjlData[i].maxQp?(bjlData.bjlData[i].maxQp*1000).toFixed(1):0
                                                html2+='<dd> <span class="tt">百家乐返点(百分位)：</span>'
                                                html2+='<span><input type="text" value="'+minBjl+'" id="downUserBackPointMaxBjl" minBjl="'+minBjl+'" maxBjl="'+maxBjl+'"></span>'
                                                html2+='<span>（可分配范围<em id="bjl_minBjl"> '+minBjl+'</em>~'+maxBjl+'）</span></dd>'
                                                html2+='<dd> <span class="tt">真人返水(千分位)：</span>'
                                                html2+='<span><input type="text" value="'+peopleBackWater+'" id="downUserBackPointMaxZr" maxZr="'+maxZr+'"></span>'
                                                html2+='<span>（可分配范围 0~'+maxZr+'）</span></dd>'
                                                html2+='<dd><span class="tt">体育返水(千分位)：</span>'
                                                html2+='<span><input type="text" value="'+sportBackWater+'" id="downUserBackPointMaxTy" maxTy="'+maxTy+'"></span>'
                                                html2+='<span>（可分配范围 0~'+maxTy+'）</span></dd>'
                                                html2+='<dd><span class="tt">电子返水(千分位)：</span>'
                                                html2+='<span><input type="text" value="'+electronBackWater+'" id="downUserBackPointMaxDz" maxDz="'+maxDz+'"></span>'
                                                html2+='<span>（可分配范围 0~'+maxDz+'）</span></dd>'
                                                html2+='<dd><span class="tt">棋牌返水(千分位)：</span>'
                                                html2+='<span><input type="text" value="'+chessBackWater+'" id="downUserBackPointMaxQp" maxQp="'+maxQp+'"></span>'
                                                html2+='<span>（可分配范围 0~'+maxQp+'）</span></dd>'
                                            }
                                        }
                                        $("#bjl_xq_from").html('').html(html2);
                                    }
								}else{
                                    var html2 ='';
                                    html2+='<div id="bjl_xq_from"><dd> <span class="tt">百家乐返点(百分位)：</span>'
                                    html2+='<span><input type="text" value="0" id="downUserBackPointMaxBjl"></span>'
                                    html2+='<span>（可分配范围 0~0）</span></dd>'
                                    html2+='<dd> <span class="tt">真人返水(千分位)：</span>'
                                    html2+='<span><input type="text" value="0" id="downUserBackPointMaxZr"></span>'
                                    html2+='<span>（可分配范围 0~0）</span></dd>'
                                    html2+='<dd><span class="tt">体育返水(千分位)：</span>'
                                    html2+='<span><input type="text" value="0" id="downUserBackPointMaxTy"></span>'
                                    html2+='<span>（可分配范围 0~0）</span></dd>'
                                    html2+='<dd><span class="tt">电子返水(千分位)：</span>'
                                    html2+='<span><input type="text" value="0" id="downUserBackPointMaxDz"></span>'
                                    html2+='<span>（可分配范围 0~0）</span></dd>'
                                    html2+='<dd><span class="tt">棋牌返水(千分位)：</span>'
                                    html2+='<span><input type="text" value="0" id="downUserBackPointMaxQp"></span>'
                                    html2+='<span>（可分配范围 0~0）</span></dd></div>'
                                    $("#bjl_xq_from").html('').html(html2);
                                }

                            })
						}
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {}
				});

				var backpointKlcHtml = '';
				backpointKlcHtml += '<span>升点类型：';
				backpointKlcHtml += '<select name=""><option value="">配额升点</option></select>';
				backpointKlcHtml += '</span>';
				backpointKlcHtml += '<span>升点为：';
				backpointKlcHtml += '<select id="downUserQuotaPointKlc">';
				for (i = downUserRebateKlc + 0.1; i <= pRebateKlc; i += 0.1) {
					backpointKlcHtml += '<option value="' + (i / 100).toFixed(3) + '">' + i.toFixed(1) + '</option>';
				}
				backpointKlcHtml += '</select>';
				backpointKlcHtml += '</span>';
				backpointKlcHtml += '<a class="butsty1" href="javascript:;" onclick="saveBackpoint(\'klc\');">确认</a>';
				// 快乐彩升点
				$("#backpointKlcQuotaList").html(quotaLevelHtml + backpointKlcHtml);
			} else {
				popTips(data.message, 'error');
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			popTips('用户信息加载失败', 'error');
		}
	});
}





/**
 * 保存彩票和快乐彩升点
 */
function saveBackpoint(modifyType) {
	var userId = $("#downUserId").val();
	var modifyPoint;
	if (modifyType == 'lottery') {
		modifyPoint = $("#downUserQuotaPoint").val();
	} else {
		modifyPoint = $("#downUserQuotaPointKlc").val();
	}

	if (!modifyPoint) {
		popTips("请选择升点", "waring");
		return;
	}

	$.ajax({
		url: "/ct-data/user/modifyPoint",
		type: "post",
		dataType: "json",
		data: {
			"userId": userId,
			"modifyType": modifyType,
			"modifyPoint": modifyPoint
		},
		success: function(data) {
			if (data.sign === true) {
				loadDownUserInfo(userId);

				allUserList();
				allOnlineUserList();
				popTips(data.message, "succeed");
			} else {
				popTips(data.message, "error");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			popTips("保存失败", "error");
		}
	});
}

/**
 * 保存开户额
 */
function saveQuota() {
	var userId = $("#downUserId").val();
	var mdfJson = [];

	var i = 0;
	var isSameModify = true;
	var isModify = true;
	$("#downUserQuotaList tr").each(function() {
		var subId = $(this).attr("subId");
		if (subId) {
			var addQuota = parseInt($(this).find("input").eq(0).val());
			var minusQuota = parseInt($(this).find("input").eq(1).val());
			if (addQuota && minusQuota) {
				popTips("同开户级不能同时增加和回收", 'error');
				isSameModify = false;
				return true;
			}

			var quota = 0;
			var type = 'add';

			var supSurplusQuota = parseInt($(this).children().eq(1).text());
			var subSurplusQuota = parseInt($(this).children().eq(2).text());

			if (addQuota) {
				if (addQuota < 0 || addQuota > supSurplusQuota) {
					isModify = false;
					return true;
				}

				quota = addQuota;
				type = "add";
			} else if (minusQuota) {
				if (minusQuota < 0 || minusQuota > subSurplusQuota) {
					isModify = false;
					return true;
				}

				quota = minusQuota;
				type = "sub";
			}

			if (quota > 0) {
				mdfJson[i] = {};
				mdfJson[i].type = type;
				mdfJson[i].subId = subId;
				mdfJson[i].supId = $(this).attr("supId");
				mdfJson[i].quota = quota;
				i++;
			}
		}
	});

	if (!isSameModify) {
		return;
	}
	if (!isModify) {
		popTips("开户额不足", 'error');
		return;
	}

	if (mdfJson.length < 1) {
		popTips("未调整下级开户额", 'waring');
		return;
	}

	$.ajax({
		url: "/ct-data/quota/modifyQuota",
		type: "post",
		dataType: "json",
		data: {
			"userId": userId,
			"mdfJson": JSON.stringify(mdfJson)
		},
		success: function(data) {
			if (data.sign === true) {
				loadDownUserInfo(userId);
				popTips(data.message, "succeed");
			} else {
				popTips(data.message, "error");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			popTips("保存失败", "error");
		}
	});
}

/**
 * 保存百家乐信息
 */
function saveBaccarat() {
	var userId = $("#downUserId").val();

	var downUserBackPointMaxBjl = $("#downUserBackPointMaxBjl").val();
	var downUserBackPointMaxZr = $("#downUserBackPointMaxZr").val();
	var downUserBackPointMaxTy = $("#downUserBackPointMaxTy").val();
	var downUserBackPointMaxDz = $("#downUserBackPointMaxDz").val();
    var downUserBackPointMaxQp = $("#downUserBackPointMaxQp").val();
    var  platformcode  =  $("#checkPlatformcode").val();
	if (!downUserBackPointMaxBjl) {
		downUserBackPointMaxBjl = 0;
	}
	if (!downUserBackPointMaxZr) {
		downUserBackPointMaxZr = 0;
	}
	if (!downUserBackPointMaxTy) {
		downUserBackPointMaxTy = 0;
	}
	if (!downUserBackPointMaxDz) {
		downUserBackPointMaxDz = 0;
	}
    if (!downUserBackPointMaxQp) {
        downUserBackPointMaxQp = 0;
    }

    var minBjl = parseFloat($("#downUserBackPointMaxBjl").attr('minBjl'));
    var maxBjl = parseFloat($("#downUserBackPointMaxBjl").attr('maxBjl'));
    var maxZr = parseFloat($("#downUserBackPointMaxZr").attr('maxZr'));
    var maxTy = parseFloat($("#downUserBackPointMaxTy").attr('maxTy'));
    var maxDz = parseFloat($("#downUserBackPointMaxDz").attr('maxDz'));
    var maxQp = parseFloat($("#downUserBackPointMaxQp").attr('maxQp'));
    var reg = /^\d+(\.\d{1,2})?$/;
    var reg2 = /^\d+(\.\d{1,1})?$/;
    if (!platformcode) {
        popTips("请选择要设置的百家乐平台！", "warning");
        return;
    }
	if (!reg.test(downUserBackPointMaxBjl)) {
        popTips("请输入正确的百家乐"+$("#checkPlatformcode option:selected").text()+"返点", "waring")
		return;
	}
	if (downUserBackPointMaxBjl < minBjl) {
		popTips("百家乐返点不能小于"+minBjl, "waring");
		return;
	}
    if (downUserBackPointMaxBjl > maxBjl) {
        popTips("百家乐返点不能大于"+maxBjl, "waring");
        return;
    }
	if (!reg2.test(downUserBackPointMaxZr) || downUserBackPointMaxZr>maxZr) {
		popTips("请输入正确的真人返水", "waring");
		return;
	}
	if (!reg2.test(downUserBackPointMaxTy) || downUserBackPointMaxTy>maxTy) {
		popTips("请输入正确的体育返水", "waring");
		return;
	}
	if (!reg2.test(downUserBackPointMaxDz) || downUserBackPointMaxDz>maxDz) {
		popTips("请输入正确的电子返水", "waring");
		return;
	}
    if (!reg2.test(downUserBackPointMaxQp) || downUserBackPointMaxQp>maxQp) {
        popTips("请输入正确的棋牌返水", "waring");
        return;
    }

	$.ajax({
		url: "/ct-data/baccarat/editBaccarat",
		type: "post",
		dataType: "json",
		data: {
			"userid": userId,
			"platformcode":platformcode,
			"backPoint": downUserBackPointMaxBjl,
			"peopleBackWater": downUserBackPointMaxZr,
			"sportBackWater": downUserBackPointMaxTy,
			"electronBackWater": downUserBackPointMaxDz,
            "chessBackWater": downUserBackPointMaxQp,
		},
		success: function(data) {
			if (data.sign === true) {
				$("#bjl_minBjl").text(downUserBackPointMaxBjl)
                for(var i=0;i<bjlData.bjlData.length;i++) {
                    if (bjlData.bjlData[i].platformcode == platformcode) {
                        bjlData.bjlData[i].minBjl = Number(downUserBackPointMaxBjl) / 100;
                        bjlData.bjlData[i].peopleBackWater = Number(downUserBackPointMaxZr) / 1000;
                        bjlData.bjlData[i].sportBackWater = Number(downUserBackPointMaxTy) / 1000;
                        bjlData.bjlData[i].electronBackWater = Number(downUserBackPointMaxDz) / 1000;
                        bjlData.bjlData[i].chessBackWater = Number(downUserBackPointMaxQp) / 1000;
                    }
                }
				allUserList();
				allOnlineUserList();
				popTips(data.message, "succeed");
			} else {
				popTips(data.message, "error");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			popTips("保存失败", "error");
		}
	});
}
/**********************代理管理->会员管理 end*******************************/

/**
 * 初始化游戏纪录查询条件
 */
function initDownUserBetsList() {
//  $("#downUserBetsSearchStartTime").val(laydate.now());
    $("#downUserBetsSearchEndTime").val(laydate.now(1));
    $("#downUserBetsSearchLoginname").val("");
    $("#downUserBetsSearchShortName").empty();

    $("#wpdownUserBetsSearchStartTime").val(laydate.now());
    $("#wpdownUserBetsSearchEndTime").val(laydate.now(1));
    $("#wpdownUserBetsSearchLoginname").val("");
    $("#wpdownUserBetsSearchShortName").empty();
	// 初始化
//	lotteryData();
	if ($("#groupLotteryType").html().trim().length < 1) {
//		lotteryList('.groupLottery', 'lottery');
	}
	if ($("#downUserBetsSearchShortName").html().trim().length < 1) {
//		lotteryList('#downUserBetsSearchShortName', 'lottery');
	}
	if ($("#wpdownUserBetsSearchShortName").html().trim().length < 1) {
//		lotteryList('#wpdownUserBetsSearchShortName', 'wp');
	}
}

/**
 * 游戏纪录
 */
function allDownUserBetsList() {
	var thisPanel = $("#downUserBetsList table tbody");
	var htmlTitle = '<tr><th>用户名</th><th>彩票简称</th><th>期号</th><th>下单时间</th>' +
		'<th>金额</th><th>注数</th><th>倍数</th><th>玩法名称</th><th>奖金</th><th>状态</th></tr>';
	thisPanel.empty();
	thisPanel.append(htmlTitle);
	$('#downUserBetsList .paging').empty();

	var jqueryGridPage = 1;
	var jqueryGridRows = 10;

	var billno = $("#downUserBetsSearchBillno").val();
	var expect = $("#downUserBetsSearchExpect").val();
	var startTime = $("#downUserBetsSearchStartTime").val();
	var endTime = $("#downUserBetsSearchEndTime").val();

    if (!checkTowDate(startTime, endTime) || dateDiff(startTime, endTime) > 7) {
//      popTips('查询日期不能跨月，并且时间间隔不能超过7天', 'error');
        return false;
    } else if (dateDiff(startTime, endTime) < 0) {
//      popTips('查询结束日期要大于开始日期', 'error');
        return false;
    }

	var loginname = $("#downUserBetsSearchLoginname").val();
	var shortName = $("#downUserBetsSearchShortName").val();
    var userType  = $("#downUserBetsSearchUserType").val();
    var state     = $("#downUserBetsSearchState").val();

    if(userType == "inDirectDownLevel" && (loginname == null || loginname == "")){
        popTips('当选择查询所有下级游戏记录，要求必须输入用户名', 'error');
    }
    
	var pagination = $.pagination({
		render: '#downUserBetsList .paging',
		pageSize: jqueryGridRows,
		pageLength: 7,
		ajaxType: 'post',
		hideInfos: false,
		hideGo: true,
		ajaxUrl: '/ct-data/userBets/downUserBetsList',
		ajaxData: {
			"jqueryGridPage": jqueryGridPage,
			"jqueryGridRows": jqueryGridRows,
			"billno": billno,
			"expect": expect,
			"startTime": startTime,
			"endTime": endTime,
			"userName": loginname,
			"shortName": shortName,
            "userType": userType,
            "state": state
		},
		complete: function() {},
		success: function(data) {
			thisPanel.empty();
			thisPanel.append(htmlTitle);
			$.each(data, function(idx, val) {
				var billno  = val.billno?val.billno:'';
				var html = '<tr onclick="getBillInfo(\'' + billno + '\');">';
				html += '<td>' + val.userName + '</td>';
				html += '<td>' + val.showName + '</td>';
				html += '<td>' + val.expect + '</td>';
				html += '<td>' + val.betsTimes.split(" ")[1] + '</td>';
				html += '<td>' + val.betsMoney + '</td>';
				html += '<td>' + val.betsNumbers + '</td>';
				html += '<td>' + val.multiple + '</td>';
				html += '<td>' + val.ruleName + '</td>';
				html += '<td>' + (val.prizeMoney?val.prizeMoney :0)+ '</td>';
				if(val.state == "未中奖"){
					html += '<td class="noPrize">' + val.state + '</td>';
				}else if(val.state == "已中奖"){
					html += '<td class="prize">' + val.state + '</td>';
				}else{
					html += '<td>' + val.state + '</td>';
				}
				html += '</tr>';
				thisPanel.append(html);
			});
		},
		pageError: function(response) {},
		emptyData: function() {}
	});
	pagination.init();
}


function accountChange() {
	var thisPanel = $("#accountChange table tbody");
	var htmlTitle = "<tr><th>订单号</th><th>用户名</th><th>账变金额</th>" +
		"<th>操作前金额</th><th>操作后金额</th><th>操作日期</th><th>账变类型</th><th>备注</th></tr>";
	thisPanel.empty();
	thisPanel.append(htmlTitle);
	$('#accountChange .paging').empty();
	
	var jqueryGridPage = 1;
	var jqueryGridRows = 10;
	var loginname    = $("#accountChangeSearchLoginname").val();
	var starTime     = $("#accountChange").find(".starTime").val();
	var endTime      = $("#accountChange").find(".endTime").val();
    var sourceModule = $("#sourceModule").val();
    var userType     = $("#acSearchUserType").val();

    if (!checkTowDate(starTime, endTime) || dateDiff(starTime, endTime) > 7) {
        popTips('查询日期不能跨月，并且时间间隔不能超过7天', 'error');
        return false;
    } else if (dateDiff(starTime, endTime) < 0) {
        popTips('查询结束日期要大于开始日期', 'error');
        return false;
    }

    if (userType == "inDirectDownLevel" && (loginname == null || loginname == "")) {
        popTips('当选择查询所有下级游戏记录，要求必须输入用户名', 'error');
        return false;
    }

	var pagination = $.pagination({
		render: '#accountChange .paging',
		pageSize: jqueryGridRows,
		pageLength: 7,
		ajaxType: 'post',
		hideInfos: false,
		hideGo: true,
		ajaxUrl: '/ct-data/accountChange/downUserChangeList',
		ajaxData: {
			"jqueryGridPage": jqueryGridPage,
			"jqueryGridRows": jqueryGridRows,
			"startTime": starTime,
			"endTime": endTime,
			"sourceModule": sourceModule,
            "userType": userType,
            "userName": loginname
		},
		complete: function() {},
		success: function(data) {
			thisPanel.empty();
			thisPanel.append(htmlTitle);
			$.each(data, function(index, val) {
				// var html = '<tr onclick="javascript:getBillInfo(\'' + val.sourceCode + '\');">';

				var html = '<tr>';
				if ('代购' == val.sourceModuleName ||
					'撤单' == val.sourceModuleName ||
					'返奖' == val.sourceModuleName ||
					'返点' == val.sourceModuleName ||
					'后台撤单' == val.sourceModuleName) {
                    if(val.accountType == 'wp'){
                        html += '<td> <a href="javascript:getwpBillInfo(\'' + val.sourceCode + '\',\'changge\')">' + val.sourceCode + '</a></td>';
                    }else{
                        html += '<td> <a href="javascript:getBillInfo(\'' + val.sourceCode + '\',\'changge\')">' + val.sourceCode + '</a></td>';
                    }
				} else {
					html += '<td>' + val.sourceCode + '</td>';
				}

				html += '<td>' + val.userName + '</td>' +
					'<td>' + val.changeAccountMoney + '</td>' +
					'<td>' + val.oldAccountMoney + '</td>' +
					'<td>' + val.newAccountMoney + '</td>' +
					'<td>' + val.operateTime + '</td>';
				var remark = val.remark;
				if(val.sourceModule == "downrecharge") {
					remark = "上级充值";
				} else if (val.remark.indexOf("绑定") >= 0) {
					remark = remark.replace((/\d{4}-\d{2}-\d{2}/), "");
				}
				html += '<td>' + val.sourceModuleName + '</td>';
				html += '<td>' + remark + '</td>';
				html += '</tr>';
				thisPanel.append(html);
			});
		},
		pageError: function(response) {},
		emptyData: function() {}
	});
	pagination.init();
}

function initAccountChangeList() {
	$("#accountChangeStartTime").val(laydate.now());
	$("#accountChangeEndTime").val(laydate.now(1));
	$("#accountChangeSearchLoginname").val("");
}

function groupReport() {
	var loginname = $("#groupReportSearchLoginname").val();
	var starTime = $("#groupReport").find(".starTime").val();
	var endTime = $("#groupReport").find(".endTime").val();
	var accounttype = $("#accounttype").val();

	var tabs = $("#groupReport").find("tbody");
	var htmlTitle = "<tr><th>用户名</th><th>充值金额</th><th>提款金额</th><th>消费量</th>" +
		// "<th>下级投注人数</th>" +
		"<th>中奖</th><th>返点</th><th>返水</th><th>活动</th>";
//	if(isShowDividend) {
//		htmlTitle += "<th>分红</th>";
//	}
	htmlTitle += "<th>盈亏</th></tr>";
	tabs.empty();
	tabs.append(htmlTitle);
	$.ajax({
		type: "post",
		url: '/ct-data/lotteryReport/accountReportList',
		data: {
			"startTime": starTime,
			"endTime": endTime,
			"userName": loginname,
			"accounttype": accounttype
		},
		success: function(data) {
			tabs.empty();
			tabs.append(htmlTitle);
			$.each(data.data.root, function(index, val) {
				/* iterate through array or object */
				var userName = val.userName;
				if (index == 0) {
					userName = data.ploginame ? data.ploginame : '';
				}
				var dayEnsureConsumpMoney = eval(val.dayEnsureConsumpMoney);
				if (dayEnsureConsumpMoney < 0) {
					dayEnsureConsumpMoney = -dayEnsureConsumpMoney;
				}
				var html = '<tr>';
				html += '<td><a href="javascript:;" onclick="userQuery(\'' + userName + '\')">' + val.userName + '</a></td>' +
					'<td>' + val.dayRechargeMoney + '</td>' +
					'<td>' + val.dayDrawRechargeMoney + '</td>' +
					'<td>' + dayEnsureConsumpMoney + '</td>' +
					// '<td>' + val.dayConsumptionMoney + '</td>' +
                    // '<td>' + val.downBetCount + '</td>' +
					'<td>' + val.dayIncomeMoney + '</td>' +
					'<td>' + val.dayCommissionMoney + '</td>' +
					'<td>' + val.dayBackWater + '</td>' +
					'<td>' + val.dayActivitiesMoney + '</td>';
				if(isShowDividend) {
					html += '<td>' + val.dayDividendMoney + '</td>';
				}
				var profit = val.dayCommissionMoney + val.dayIncomeMoney + val.dayEnsureConsumpMoney + val.dayActivitiesMoney + val.dayBackWater;
				// if(isShowDividend) {
				// 	profit += val.dayDividendMoney;
				// }
				html += '<td>' + profit.toFixed(4) + '</td></tr>';

				tabs.append(html);
			});
			var sdata = data.data.params.sDATA[0];
			var totalEnsureConsumpMoney = eval(sdata.dayEnsureConsumpMoney);
			if (totalEnsureConsumpMoney < 0) {
				totalEnsureConsumpMoney = -totalEnsureConsumpMoney;
			}
			var shtml = '<td>总计</td>' +
				'<td>' + sdata.dayRechargeMoney.toFixed(4) + '</td>' +
				'<td>' + sdata.dayDrawRechargeMoney.toFixed(4) + '</td>' +
				'<td>' + totalEnsureConsumpMoney.toFixed(4) + '</td>' +
				//				'<td>' + sdata.dayConsumptionMoney + '</td>' +
                // '<td>' + sdata.downBetCount + '</td>' +
				'<td>' + sdata.dayIncomeMoney.toFixed(4) + '</td>' +
				'<td>' + sdata.dayCommissionMoney.toFixed(4) + '</td>' +
				'<td>' + sdata.dayBackWater.toFixed(4) + '</td>' +
				'<td>' + sdata.dayActivitiesMoney.toFixed(4) + '</td>';
			if(isShowDividend) {
				shtml += '<td>' + sdata.dayDividendMoney.toFixed(4) + '</td>';
			}
			var profits = sdata.dayCommissionMoney + sdata.dayIncomeMoney + sdata.dayEnsureConsumpMoney + sdata.dayActivitiesMoney + sdata.dayBackWater;
			// if(isShowDividend) {
			// 	profits += sdata.dayDividendMoney;
			// }
			shtml += '<td>' + profits.toFixed(4) + '</td></tr>';
			tabs.append(shtml);
		}
	});
}

// 团队彩票报表查询
function groupLotteryReport(superiorName) {
    var loginname;
    if(!superiorName) {
        loginname = $("#groupLotteryReportSearchLoginname").val();
    }else{
        loginname = superiorName;
        $("#groupLotteryReportSearchLoginname").val(superiorName)
    }
    var starTime = $("#groupLotteryReport").find(".starTime").val();
    var endTime = $("#groupLotteryReport").find(".endTime").val();
    var accounttype = $("#lotteryAccountType").val();
    var shortName = $("#groupLotteryType").val();

    var tabs = $("#groupLotteryReport").find("tbody");
    var tabsThead = $("#groupLotteryReportTh");
    var header = "<tr><th>用户名</th><th>游戏类别</th><th>代购额</th><th>确认代购额</th><th>撤单金额</th>" +
        "<th>奖金</th><th>返点</th><th>盈利</th></tr>";
    tabs.empty();
    tabsThead.empty();
    tabsThead.html(header);
    $("#groupLotteryReport thead #group_type").remove();
    $.ajax({
        type: "post",
        url: '/ct-data/lotteryReport/userGroupQueryPlayRule',
        data: {
            "startTime": starTime,
            "endTime": endTime,
            "userName": loginname,
            "accountType": accounttype,
            "shortName":shortName
        },
        success: function(data) {
            tabs.empty();
            // tabsThead.empty();
            // tabs.append(header);
            if(data.sign) {
                // if (data.data.root.length > 18) {
                //     tabsThead.addClass("width-auto");
                // } else {
                //     tabsThead.removeClass("width-auto");
                // }
                if (data.ploginame) {
                    $("#groupLotteryReport thead").find('tr').eq(0).find('th').append('<a href="javascript:;" class="butsty1 mart10" id="group_type" onclick="groupLotteryReport(\'' + data.ploginame + '\');">返回上级</a>');
                }
                if (data.data.root.length > 0 && data.data.params) {
                    $.each(data.data.root, function (index, val) {
                        var html = '<tr>';
                        html += '<td><a href="javascript:;" style="color: red;" onclick="groupLotteryReport(\'' + val.userName + '\')">' + val.userName + '</a></td>' +
                            '<td>' + val.showName + '</td>' +
                            '<td>' + Math.abs(val.dayConsumptionMoney) + '</td>' +
                            '<td>' + Math.abs(val.dayEnsureConsumpMoney) + '</td>' +
                            '<td>' + val.dayCancelOrderMoney + '</td>' +
                            '<td>' + val.dayIncomeMoney + '</td>' +
                            '<td>' + val.dayCommissionMoney + '</td>';
                        var profit = val.dayEnsureConsumpMoney + val.dayIncomeMoney + val.dayCommissionMoney;
                        html += '<td>' + profit.toFixed(4) + '</td></tr>';

                        tabs.append(html);
                    });
                    var sdata = data.data.params.sDATA[0];
                    var shtml = '<tr>	<td>总计</td><td></td>' +
                        '<td>' + Math.abs(sdata.dayConsumptionMoney) + '</td>' +
                        '<td>' + Math.abs(sdata.dayEnsureConsumpMoney) + '</td>' +
                        '<td>' + sdata.dayCancelOrderMoney + '</td>' +
                        '<td>' + sdata.dayIncomeMoney + '</td>' +
                        '<td>' + sdata.dayCommissionMoney + '</td>';
                    var profits = sdata.dayEnsureConsumpMoney + sdata.dayIncomeMoney + sdata.dayCommissionMoney;
                    shtml += '<td>' + profits.toFixed(4) + '</td></tr>';
                    tabs.append(shtml);
                }
            } else{
                popTips(data.message,"error")
            }
        }
    });
}

// 团队彩票报表初始数据
function initGroupLotteryReportList() {
	$("#groupLotteryReportStartTime").val(laydate.now());
	$("#groupLotteryReportEndTime").val(laydate.now(1));
	$("#groupLotteryReportSearchLoginname").val("");
	$("#lotteryAccountType").val("lottery");

	// 初始化
	lotteryData();
	if ($("#groupLotteryType").html().trim().length < 1) {
		lotteryList('.groupLottery', 'lottery');
	}
	// 报表类型切换
	$("#lotteryAccountType").change(function(){
		lotteryList('.groupLottery',$(this).val());
	});
	
}


function initGroupReportList() {
	$("#groupReportStartTime").val(laydate.now());
	$("#groupReportEndTime").val(laydate.now(1));
	$("#groupReportSearchLoginname").val("");
	$("#accounttype").val("lottery");
}

function baccaratReportQuery(userName) {
	$("#baccaratSearchLoginname").val(userName);
	baccaratReport();
}
//百家乐团队报表
function baccaratReport() {
	var loginname = $("#baccaratSearchLoginname").val();
	var starTime = $("#baccaratReport").find(".starTime").val();
	var endTime = $("#baccaratReport").find(".endTime").val();
	var platformCode = $("#baccaratPayment").val();
	var gameType = $("#baccaratReportGameType").val();
	
	var tabs = $("#baccaratReport").find("tbody");
	var htmlTitle = "<tr><th>用户名</th><th>转入</th><th>转出</th><th>消费量</th><th>总输款</th><th>中奖</th>" +
			"<th>返点</th><th>返水</th><th>活动</th><th>盈亏</th></tr>";
	tabs.empty();
	tabs.append(htmlTitle);
	$.ajax({
		type: "post",
		url: '/ct-data/baccaratReport/accountReportList',
		data: {
			"startTime": starTime,
			"endTime": endTime,
			"userName": loginname,
			"platformCode": platformCode,
			"gameType": gameType
		},
		success: function(data) {
			tabs.empty();
			tabs.append(htmlTitle);
			var html = "";
			$.each(data.data, function(idx, val) {
				var dayConsumptionMoney = eval(val.latestACS.dayConsumptionMoney);
				var dayDownConsumptionMoney = eval(val.latestACS.dayDownConsumptionMoney);
				if (dayConsumptionMoney < 0) {
					dayConsumptionMoney = -dayConsumptionMoney;
					dayDownConsumptionMoney = -dayDownConsumptionMoney;
				}
				var userName = val.userName;
				if (userName != '总计') {
					if ((!loginname && val.userName == user.loginname) || loginname == val.userName) {
						userName = val.ploginname ? val.ploginname : '';
					}
					userName = '<a href="javascript:;" onclick="baccaratReportQuery(\'' + userName + '\');">' + val.userName + '</a>';
				}
				var innerHtml =
					'<tr>' +
					'<td>' + userName + '</td>' +
					'<td>' + val.latestACS.dayRechargeMoney + '</td>' +
					'<td>' + val.latestACS.dayDrawRechargeMoney + '</td>' +
					'<td>' + (dayConsumptionMoney) + '</td>' +
					'<td>' + (val.latestACS.dayLossMoney) + '</td>' +
					'<td>' + (val.latestACS.dayIncomeMoney) + '</td>' +
					'<td>' + (val.latestACS.dayCommissionMoney).toFixed(2) + '</td>' +
					'<td>' + (val.latestACS.dayBackWater).toFixed(2) + '</td>' +
					'<td>' + (val.latestACS.dayActivitiesMoney).toFixed(2) + '</td>' +
					'<td>' + (val.latestACS.dayProfitLoss + val.latestACS.dayCommissionMoney + val.latestACS.dayBackWater + val.latestACS.dayActivitiesMoney ).toFixed(2) +
					'</td></tr>';
				if ((!loginname && val.userName == user.loginname) || loginname == val.userName) {
					html = innerHtml + html;
				} else {
					html = html + innerHtml;
				}
			});
			tabs.append(html);
		}
	});
}

function initBaccaratList() {
	$("#baccaratStartTime").val(laydate.now());
	$("#baccaratEndTime").val(laydate.now(1));
	$("#baccaratSearchLoginname").val("");
	platformList();

}

function groupDeposit() {
	var thisPanel = $("#groupDeposit tbody");
	var htmlTitle = "<tr><th>用户名</th><th>订单号</th><th>类型</th><th>申请金额</th><th>手续费</th>" +
		"<th>实际金额</th><th>实际手续费</th><th>变更前金额</th><th>变更后金额</th><th>申请时间</th><th>状态</th></tr>";
	thisPanel.empty();
	thisPanel.append(htmlTitle);
	$("#groupDeposit .paging").empty();
	
	var jqueryGridPage = 1;
	var jqueryGridRows = 10;
	var loginname = $("#groupDepositSearchLoginname").val();
	var billNo    = $("#groupDepositSearchBillNo").val();
	var starTime  = $("#groupDeposit").find(".starTime").val();
	var endTime   = $("#groupDeposit").find(".endTime").val();
	var type      = $("#groupDepositType").val();
	var state     = $("#groupDepositState").val();
    var userType  = $("#gdSearchUserType").val();

    if (!checkTowDate(starTime, endTime) || dateDiff(starTime, endTime) > 7) {
        popTips('查询日期不能跨月，并且时间间隔不能超过7天', 'error');
        return false;
    } else if (dateDiff(starTime, endTime) < 0) {
        popTips('查询结束日期要大于开始日期', 'error');
        return false;
    }

    if (userType == "inDirectDownLevel" && (loginname == null || loginname == "")) {
        popTips('当选择查询所有下级游戏记录，要求必须输入用户名', 'error');
        return false;
    }

    var pagination = $.pagination({
		render: '#groupDeposit .paging',
		pageSize: jqueryGridRows,
		pageLength: 7,
		ajaxType: 'post',
		hideInfos: false,
		hideGo: true,
		ajaxUrl: '/ct-data/payBankBackup/downUserRechargeAndWithdrawList',
		ajaxData: {
			"jqueryGridPage": jqueryGridPage,
			"jqueryGridRows": jqueryGridRows,
			"startTime": starTime,
			"endTime": endTime,
			"userName": loginname,
			"billNo": billNo,
			"type": type,
            "userType": userType,
            "state": state
		},
		complete: function() {},
		success: function(data) {
			thisPanel.empty();
			thisPanel.append(htmlTitle);
			$.each(data, function(index, val) {
				/* iterate through array or object */
				var state = val.state;
                if (val.state == 1) {
                    state = "已提交";
                } else if (val.state == 2) {
                    state = "已完成";
                } else if (val.state == 3) {
                    state = "正在处理";
                } else if (val.state == 4) {
                    state = "审核通过";
                } else if (val.state == 5) {
                    state = "审核中";
                } else if (val.state == 6) {
                    state = "已审核";
                } else if (val.state == -1) {
                    state = "取消申请";
                } else if (val.state == -2) {
                    state = "拒绝";
                } else if (val.state == -3) {
                    state = "失败";
                } else if (val.state == -4) {
                    state = "异常";
                } else if (val.state == -9) {
                    state = "锁定";
                }
				var html = '<tr>';
				html += '<td>' + val.userName + '</td>' +
					'<td>' + val.billNo + '</td>' +
					'<td>' + val.sourceModule + '</td>' +
					'<td>' + val.amount + '</td>' +
					'<td>' + val.fee + '</td>' +
					'<td>' + val.actualAmount + '</td>' +
					'<td>' + val.actualFee + '</td>' +
					'<td>' + val.oldAccountMoney + '</td>' +
					'<td>' + val.newAccountMoney + '</td>' +
					'<td>' + val.createTime + '</td>' +
					'<td>' + state + '</td>' +
					'</tr>';
				thisPanel.append(html);
			});
		},
		pageError: function(response) {},
		emptyData: function() {}
	});
	pagination.init();
}

function initGroupDepositList() {
	$("#groupDepositStartTime").val(laydate.now());
	$("#groupDepositEndTime").val(laydate.now(1));
	$("#groupDepositSearchLoginname").val("");
	$("#groupDepositSearchBillNo").val("");
}


//牛牛eg报表

function egReport(userName, type) {
    if (type == 3 || type == 2) {
        $("#egSearchLoginname").val('');
    }
    var jqueryGridPage = 1;
    var jqueryGridRows = 10;
    userName = userName ? userName : $("#egSearchLoginname").val();
    var starTime = $("#egReport").find(".starTime").val();
    var endTime = $("#egReport").find(".endTime").val();
    var tabs = $("#egReport tbody");
    var htmlTitle = "<tr><th>用户名</th><th>转入</th><th>转出</th><th>投注</th><th>活动</th><th>抽水</th><th>赢单总投注额</th>" +
        "<th>和单总投注额</th><th>输单总投注额</th><th>有效总投注额</th><th>赢总额</th><th>和总额</th><th>输总额</th></tr>";
    tabs.empty();
    tabs.append(htmlTitle);
    $("#egReport thead .butsty1:eq(1)").remove();
    var pagination = $.pagination({
        render: '#egReport .paging',
        pageSize: jqueryGridRows,
        pageLength: 7,
        ajaxType: 'post',
        hideInfos: false,
        hideGo: true,
        ajaxUrl: '/ct-data/lotteryReport/egReportGroupList',
        ajaxData: {
            "jqueryGridPage": jqueryGridPage,
            "jqueryGridRows": jqueryGridRows,
            "startTime": starTime,
            "endTime": endTime,
            "userName": userName
        },
        complete: function() {},
        success: function(data,pid,downRechargeLevel,ploginame) {
                tabs.empty();
                tabs.append(htmlTitle);
                if (ploginame && type == 2) {
                    $("#egReport thead th").append('<a href="javascript:;" class="butsty1" onclick="egReport(\'' + ploginame + '\',3);">返回上级</a>');
                }
                $.each(data, function (index, val) {
                    var html = '<tr>';
                    if (ploginame && type == 2) {
                        html += '<td><a href="javascript:;"><font color="red">' + val.userName + '</font></a></td>'
                    } else {
                        html += '<td><a href="javascript:;" onclick="egReport(\'' + val.userName + '\',2);"><font color="red">' + val.userName + '</font></a></td>';
                    }

                    // '<td>' + val.userName + '</td>' +
                    html += '<td>' + val.dayAmountIn + '</td>' +
                        '<td>' + val.dayAmountOut + '</td>' +
                        '<td>' + val.betAmount + '</td>' +
                        '<td>' + val.activityAmount + '</td>' +
                        '<td>' + val.commissionAmount + '</td>' +
                        '<td>' + val.betWinAmount + '</td>' +
                        '<td>' + val.betDrawAmount + '</td>' +
                        '<td>' + val.betLoseAmount + '</td>' +
                        '<td>' + val.betValidAmount + '</td>' +
                        // '<td>' + val.betInvalidAmount + '</td>' +
                        '<td>' + val.winAmount + '</td>' +
                        '<td>' + val.drawAmount + '</td>' +
                        '<td>' + val.loseAmount + '</td>';
                    tabs.append(html);
                });
        },
        pageError: function(response) {},
        emptyData: function() {}
    });
    pagination.init();
}

function initegList() {
    $("#egStartTime").val(laydate.now());
    $("#egEndTime").val(laydate.now(1));
    $("#egSearchLoginname").val("");
}
// 初始化代理分红
function initDividend() {
	if (!initUser) {
		setTimeout(function() {
			initDividend();
		}, 100);
		return;
	}

	if (!user) {
		popTips("用户未登录！", "error");
		return;
	}
	if (hasProxyDividend) {
		$.ajax({
			url: "/ct-data/userDividend/dividendInfo",
			type: "post",
			dataType: "json",
			success: function(data) {
				if (data.sign === true) {
					var html = '';
					html += '<table class="mem-biao">';
					html += '<tbody>';
					var titleHtml = '<tr><th>分红明细</th>';
					var noSettleHtml = '<tr><td>未结算盈亏</td>';
					var dividendMoneyHtml = '<tr><td>当前分红金额</td>';
					var startTimeHtml = '<tr><td>当前分红开始时间</td>';
					var stopTimeHtml = '<tr><td>当前分红结束时间</td>';
					var dividendScaleHtml = '<tr><td>分红比例</td>';
					var profitMoneyHtml = '<tr><td>已结算盈亏</td>';
					var totalSettleDividendHtml = '<tr><td>已分红总计</td>';
					var totalSettleQuantityHtml = '<tr><td>已结算次数</td>';

					var tfootHtml = '<tfoot><tr><td></td>';
					$.each(data.data, function(idx, val) {
						if (val.dividendType == "lottery") {
							titleHtml += '<th>彩票</th>';
						} else if (val.dividendType == "baccarat") {
							titleHtml += '<th>真人</th>';
						} else if (val.dividendType == "sport") {
							titleHtml += '<th>体育</th>';
						} else if (val.dividendType == "klc") {
							titleHtml += '<th>快乐彩</th>';
						} else if(val.dividendType == "wp"){
                            titleHtml += '<th>外盘</th>';
						}

						noSettleHtml += '<td>' + val.noSettle + '</td>';
						dividendMoneyHtml += '<td>' + val.dividendMoney + '</td>';
						startTimeHtml += '<td>' + val.startTime + '</td>';
						stopTimeHtml += '<td>' + val.stopTime + '</td>';
						dividendScaleHtml += '<td>' + val.dividendScale + '</td>';
						profitMoneyHtml += '<td>' + val.profitMoney + '</td>';
						totalSettleDividendHtml += '<td>' + val.totalSettleDividend + '</td>';
						totalSettleQuantityHtml += '<td>' + val.totalSettleQuantity + '</td>';
						if (val.state == 1 && val.receiveState != 1) {
							tfootHtml += '<td><a class="butsty3" href="javascript:;" onclick="recDividend(\'' + val.id + '\');">领取</a></td>';
						} else {
							tfootHtml += '<td></td>';
						}
					});

					titleHtml += '</tr>';
					noSettleHtml += '</tr>';
					dividendMoneyHtml += '</tr>';
					startTimeHtml += '</tr>';
					stopTimeHtml += '</tr>';
					dividendScaleHtml += '</tr>';
					profitMoneyHtml += '</tr>';
					totalSettleDividendHtml += '</tr>';
					totalSettleQuantityHtml += '</tr>';

					tfootHtml += '</tr></tfoot>';

					html += titleHtml + noSettleHtml + dividendMoneyHtml + startTimeHtml + stopTimeHtml;
					html += dividendScaleHtml + profitMoneyHtml + totalSettleDividendHtml + totalSettleQuantityHtml;

					html += '</tbody>';
					html += tfootHtml;
					html += '</table>';

					$("#dividendContent").html(html);
					$("#dividendContent").show().siblings().hide();
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {}
		});

		/*$("#navDividend").attr("onclick", "initDividend();");
		$("#navDividend").addClass("cur");
		$("#navDividend").html('<a href="javascript:;">代理分红</a><i></i>');
		$("#navDividend").show();*/
	}
}

// 领取代理分红
function recDividend(id) {
	$.ajax({
		url: "/ct-data/userDividend/recDividend",
		type: "post",
		dataType: "json",
		data: {
			"id": id
		},
		success: function(data) {
			initDividend();
			if (data.sign === true) {
				popTips(data.message, "succeed");
			} else {
				popTips(data.message, "error");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			popTips("领取失败", "error");
		}
	});
}

/**
 * 是否有权限访问代理页面
 */
function canBeVisitThisPage() {
//	if (!initUser) {
//		setTimeout(function() {
//			canBeVisitThisPage();
//		}, 100);
//		return;
//	}
	
//	if (!user || user.proxy!=1) {
//		gotoIndex(false, false);
//	}
}

/**
 * 下级充值是否需要回答密保问题
 */
var isDownRechargeQuestion = false;
function getIsDownRechargeQuestion() {
	$.ajax({
		url: '/ct-data/userAccount/isDownRechargeQuestion',
		type: 'POST',
		dataType: 'json',
		success: function(data) {
			isDownRechargeQuestion = data.sign;
			if(data.activityMoneys){
				if(data.activityMoneys.length>0){
					for(var i=0;i<data.activityMoneys.length;i++){
						if(data.activityMoneys[i].currency == 'rmb'){
                            way.set("activityMoney", "" +data.activityMoneys[i].money);
						}
					}
				}
			}else{
                way.set("activityMoney", "" +0);
			}

		},
		error: function(xhr, textStatus, errorThrown) {}
	});
}

function initAgentDiv(){
//	if (!initUser) {
//		setTimeout(function() {
//			initAgentDiv();
//		}, 100);
//		return;
//	}
//
//	if (!user) {
//		popTips("用户未登录！", "error");
//		return;
//	}
//	if(hasProxyDividend){
//		$("#navDividend").attr("onclick", "initDividend();");
//		$("#navDividend").html('<a href="javascript:;">代理分红</a><i></i>');
//		$("#navDividend").show();
//	}

}

$(function() {
	canBeVisitThisPage();
	isUserWithdrawLimit();
//  getHasDivend();
	$("#indexAgent .subTabHd li").on("click", function() {
		$("#indexAgent .subTabHd li").removeClass("cur");
		$(this).addClass("cur");
	});

	getDownUserNum();
	getDownUserTotalMoney();
	initStatistics("lottery");
	// initDividend();
	initAgentDiv();
//	getHasDivend();
	getDividendLimit();
	userSecurityLevel();
	getIsDownRechargeQuestion();
	
	$("#downUserRechargeType").on("change", function() {
		if(this.value == "downRecharge") {
			$("#downUserRechargeBal").text(eval(way.get("useraccount.balance")) + " 元");
		} else if(this.value == "downRechargeDividend") {
			$("#downUserRechargeBal").text(eval(way.get("useraccount.dividend")) + " 元");
		} else if(this.value == "downRechargeDayActivity") {
			$("#downUserRechargeBal").text(eval(way.get("activityMoney")) + " 元");
		} else {
			$("#downUserRechargeBal").text("");
		}
	});
	
});

function userQuery(userName) {
	$("#groupReportSearchLoginname").val(userName);
	groupReport();
}

function showUserQuota() {
	var tabs = $("#shenyupe .dd-xiangq").find("tbody");
	tabs.empty();
	$.ajax({
		url: "/ct-data/quota/userQuota",
		type: "post",
		dataType: "json",
		success: function(data) {
			var html = '<tr>' +
				'<th>区段</th>' +
				'<th>总额</th>' +
				'<th>使用</th>' +
				'<th>剩余</th>' +
				'</tr>';
			tabs.append(html);
			if (data.sign) {
				$.each(data.quotaList, function(index, val) {
					html = '<tr>';
					html += '<td>' + val.subRebate + '</td>';
					html += '<td>' + val.quota + '</td>';
					html += '<td>' + val.usedQuota + '</td>';
					html += '<td>' + val.restQuota + '</td>';
					html += '</tr>';
					tabs.append(html);
				});
				closelayer();
				pop('shenyupe');
			} else {
				popTips("没有剩余配额", 'error');
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			popTips("服务器连接失败", 'error');
		}
	});
}

var platformList = function() {
	$("#baccaratPayment").empty();
	jQuery.ajax({
		url: '/ct-data/baccarat/userPlatformList',
		type: 'POST',
		dataType: 'json',
		success: function(data, textStatus, xhr) {
			if (data.sign) {
				var html = '<option value="">全部</option>';
				$("#baccaratPayment").append(html);
				$.each(data.list, function(index, val) {
					var html = '<option value="' + val.code + '">' + val.value + '</option>';
					$("#baccaratPayment").append(html);
				});
				//baccaratReport();
			} else {
				popTips(data.message, 'error');
			}
		},
		error: function(xhr, textStatus, errorThrown) {}
	});
};

/**
 * 判断用户是否有分红权限
 */
var getDividendLimit = function() {
//	if (!user) {
//		setTimeout(function() {
//			getDividendLimit();
//		}, 100);
//		return;
//	}


//	$("#sourceModule option").each(function() {
//		if (this.value.indexOf("dividend") >= 0) {
//			if (isShowDividend) {
//				$(this).show();
//			} else {
//				$(this).remove();
//			}
//		}
//	});
};



// 外盘
var wpDownUserBetsList = function () {
    var thisPanel = $("#wpdownUserBetsList table tbody");
    var htmlTitle = '<tr><th>用户名</th><th>彩票简称</th><th>期号</th><th>下单时间</th>' +
        '<th>金额</th><th>玩法名称</th><th>奖金</th><th>状态</th></tr>';
    thisPanel.empty();
    thisPanel.append(htmlTitle);
    $('#wpdownUserBetsList .paging').empty();

    var jqueryGridPage = 1;
    var jqueryGridRows = 10;

    var billno = $("#wpdownUserBetsSearchBillno").val();
    var expect = $("#wpdownUserBetsSearchExpect").val();
    var startTime = $("#wpdownUserBetsSearchStartTime").val();
    var endTime = $("#wpdownUserBetsSearchEndTime").val();
    // console.log(startTime, endTime)
    if (!checkTowDate(startTime, endTime) || dateDiff(startTime, endTime) > 7) {
        popTips('查询日期不能跨月，并且时间间隔不能超过7天', 'error');
        return false;
    } else if (dateDiff(startTime, endTime) < 0) {
        popTips('查询结束日期要大于开始日期', 'error');
        return false;
    }

    var loginname = $("#wpdownUserBetsSearchLoginname").val();
    var shortName = $("#wpdownUserBetsSearchShortName").val();
    var userType = $("#wpdownUserBetsSearchUserType").val();
    var state = $("#wpdownUserBetsSearchState").val();

    if (userType == "inDirectDownLevel" && (loginname == null || loginname == "")) {
        popTips('当选择查询所有下级游戏记录，要求必须输入用户名', 'error');
    }

    var pagination = $.pagination({
        render: '#wpdownUserBetsList .paging',
        pageSize: jqueryGridRows,
        pageLength: 7,
        ajaxType: 'post',
        hideInfos: false,
        hideGo: true,
        ajaxUrl: '/ct-data/wpUserBets/wpDownUserBetsList',
        ajaxData: {
            "jqueryGridPage": jqueryGridPage,
            "jqueryGridRows": jqueryGridRows,
            "billno": billno,
            "expect": expect,
            "startTime": startTime,
            "endTime": endTime,
            "userName": loginname,
            "shortName": shortName,
            "userType": userType,
            "state": state
        },
        complete: function () {
        },
        success: function (data) {
            thisPanel.empty();
            thisPanel.append(htmlTitle);
            $.each(data, function (idx, val) {
                var billno = val.billno ? val.billno : '';
                var html = '<tr>';

                html += '<td><a href="javascript:;" onclick="getwpBillInfo(\''+ billno + '\',\'waipan\');">' + val.userName + '</a></td>';
                html += '<td>' + val.showName + '</td>';
                html += '<td>' + val.expect + '</td>';
                html += '<td>' + val.betsTimes.split(" ")[1] + '</td>';
                html += '<td>' + val.betsMoney + '</td>';
                // html += '<td>' + val.betsNumbers + '</td>';
                // html += '<td>' + val.multiple + '</td>';
                html += '<td>' + val.ruleName + '</td>';
                html += '<td>' +( val.prizeMoney? val.prizeMoney :0)+ '</td>';
                if (val.state == "未中奖") {
                    html += '<td class="noPrize" billno=' + billno + '>' + val.state + '</td>';
                } else if (val.state == "已中奖") {
                    html += '<td class="prize" billno=' + billno + '>' + val.state + '</td>';
                } else {
                    html += '<td billno=' + billno + '>' + val.state + '</td>';
                }
                html += '</tr>';
                thisPanel.append(html);
            });
        },
        pageError: function (response) {
        },
        emptyData: function () {
        }
    });
    pagination.init();
}