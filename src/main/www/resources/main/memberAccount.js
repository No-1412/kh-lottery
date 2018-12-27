$(function() {
	//获取用户返水返点信息
	userRebate();
	//用户银行卡列表
	userBank();
	//是否满足提款要求
	isUserWithdrawLimit();
	//获取百家乐平台和用户是否开通信息
	platformList();
	// 获取账户总额
    initTotalBalance();
	//用户安全等级
	userSecurityLevel();
	//系统公告信息
	bulletinListMember();
	// 判断是否已绑定密保
	getQuestionPassword();
    //异地登录检测
    opendiffplacecheck();
    //openGoogle();
});


function getQuestionPassword(){
	jQuery.ajax({
		url: '/ct-data/user/userSecurityLevel',
		type: 'POST',
		dataType: 'json',
		success: function(data, textStatus, xhr) {
			if (data.sign) {
				if (data.isQuestion) {
                    // $('#szmmbh').find("div:first").hide();
                    $('#szmmbh').find(".dred").html('当前账号已绑定');
                    $("#szmmbh").find(".aar-but").find(".btn-mmbh").text('已绑定');
                    $("#szmmbh").find(".aar-but").find(".btn-mmbh").css("background", "#a6a6a6");
					$("#szmmbh").find(".aar-but").find(".btn-mmbh").removeAttr("onclick");
				}
			}else{
				popTips(data.message, "error");
			}
		},
		error: function(xhr, textStatus, errorThrown) {
		}
	});
}

function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
$(document).ready(function(){
	var pagenum = getQueryString("liCode");
	if(pagenum!= null){
		$(".tabHd").children().eq(pagenum).click();
	} 
})





//获取用户的返水返点
var userRebate = function() {
	jQuery.ajax({
		url: '/ct-data/user/userRebate',
		type: 'POST',
		dataType: 'json',
		success: function(data, textStatus, xhr) {
			if (data.sign) {
				way.set("user.rabate", (data.rebate * 100).toFixed(1));
				way.set("user.baccaratRebate", (data.baccaratRebate * 100).toFixed(2));
				way.set("user.peopleBackWater", (data.peopleBackWater * 100).toFixed(1));
				way.set("user.slotBackWater", (data.slotBackWater * 100).toFixed(1));
				way.set("user.sportBackWater", (data.sportBackWater * 100).toFixed(1));
				way.set("user.kenoRebate", (data.kenoRebate * 100).toFixed(1));
			} else {
				popTips(data.message, "error");
			}
		},
		error: function(xhr, textStatus, errorThrown) {

		}
	});
};


//获取用户银行卡信息
var haveBank = false;
var userBank = function() {
	// 我的银行卡列表
	var bdyhk = $(".m-bdyhk").find(".mar-lr16");
	// 我的银行卡弹窗里的银行卡列表
	var ckyinh = $("#ckyinh .tishik");
	
	jQuery.ajax({
		url: '/ct-data/userBank/userBankList',
		type: 'POST',
		dataType: 'json',
		success: function(data, textStatus, xhr) {
			if (data.sign) {
				bdyhk.empty();
				ckyinh.empty();
				// 是否需要提示“绑定银行卡送5元”
				var haveTitle = true;
				$.each(data.data, function(index, val) {
					
					var html = '<dd><div class="yhk" onclick="detailUserBank(\'' + val.id + '\');"><div class="img ym-gl">' +
						'<img src="../../resources/yiyou/images/member/yh/' + val.bankLogo + '" height="35" width="35" alt="">' +
						'</div><div class="xx ym-gl"><span>' + val.bankName + '</span>' +
						'<span>' + val.bankUserName + '&nbsp;&nbsp&nbsp;&nbsp' + val.bankCardNumber + '</span></div></div>';
					if(val.state == 1) {
						haveBank = true;
						haveTitle = false;
						html += '<div class="moren">';
						if (val.isDefault!=1) {
							html += '<label for = "'+val.id+'"><span> 默认 </span></label > ' +
							'<input id="'+val.id+'" name="'+val.id+'" type="radio" onchange= "defaultUserBankCard(\'' + val.id + '\')"';
						}else{
							html += '<label for = "'+val.id+'"><span> 默认 </span></label > ' +
							'<input id="'+val.id+'" name="'+val.id+'" type="radio" checked = "checked">';
						}
						html += '</div>';
					} else if(val.state == 2) {
						html += '<div class="moren">驳回</div>';
					} else if(val.state == 0) {
						haveTitle = false;
						html += '<div class="moren">审核中</div>';
					}
					html += '</dd>';
					bdyhk.append(html);

					if(!val.bankBranch){
						val.bankBranch = '';
					}
					var detailHtml = '';
					detailHtml += '<dl class="validate-form" id="ck_' + val.id + '" style="display:none;">';
					detailHtml += '<dt>';
					detailHtml += '<span class="tt">状态：</span>';
					if(val.state == 1) {
						detailHtml += '<span>可用</span>';
					} else if(val.state == 2) {
						detailHtml += '<span class="dred">驳回</span>';
					} else if(val.state == 0) {
						detailHtml += '<span class="dred">审核中...</span>';
					}
					detailHtml += '</dt>';
					detailHtml += '<dd>';
					detailHtml += '<span class="tt">持卡人姓名：</span>';
					detailHtml += '<span>' + val.bankUserName + '</span>';
					detailHtml += '</dd>';
					detailHtml += '<dd>';
					detailHtml += '<span class="tt">所属银行：</span>';
					detailHtml += '<span class="xzyh">' + val.bankName + '</span>';
					detailHtml += '</dd>';
					detailHtml += '<dd>';
					detailHtml += '<span class="tt">银行卡号：</span>';
					detailHtml += '<span>' + val.bankCardNumber + '</span>';
					detailHtml += '</dd>';
					detailHtml += '<dd>';
					detailHtml += '<span class="tt">开户行地址：</span>';
					detailHtml += '<span>' + val.bankAddress + '</span>';
					detailHtml += '</dd>';
					detailHtml += '<dd>';
					detailHtml += '<span class="tt">开户行网点：</span>';
					detailHtml += '<span>' + val.bankBranch + '</span>';
					detailHtml += '</dd>';
					detailHtml += '</dl>';
					ckyinh.append(detailHtml);
				});
                if (data.data.length > 0) {
                    var addHtml = "";
                    addHtml += '<dd class="addyhk" onclick="getUserSercurityConfig(\'bankCard\');">';
                    addHtml += '<span>解绑银行卡</span></dd>';
                    bdyhk.append(addHtml);
                }
				if(data.data.length < data.sysBankMaxNum) {
					var addHtml = '<dd class="addyhk" onclick="addUserBank();">';
					if (haveTitle) {
						addHtml += '<div class="hdtips">';
						addHtml += '<i class="bd-rmb"></i>';
						addHtml += '<div class="ts">';
						addHtml += '<h6>绑定我的银行卡</h6>';
						addHtml += '<p>成功绑定我的银行卡后您将享受充值提款等服务。<br/><em class="dred">此外，首次成功绑定您将获得5元任务奖励。</em></p>';
						addHtml += '</div>';
						addHtml += '</div>';
					}
					addHtml += '<span>添加银行卡</span></dd>';
					bdyhk.append(addHtml);
				}
			} else {
				popTips(data.message, "error");
			}
		},
		error: function(xhr, textStatus, errorThrown) {

		}
	});
};
// 查看银行卡
var detailUserBank = function(id) {
	closelayer();
	$("#delUserBankId").val(id);
	$("#ckyinh .tishik dl").hide();
	$("#ckyinh .tishik dl#ck_" + id).show();

	// 添加修改银行卡信息事件
	$('#updateBankInfoId').attr('onclick','updateBankInfo("'+id+'")');
	$('#updateBankInfoId').html('修改');
	$('#ckyinh_tips').html('查看银行卡');
	$('#ck_' + id).find('dd').eq(3).show();
	$('#ck_' + id).find('dd').eq(4).show();

	pop("ckyinh");
};
// 删除银行卡
var delUserBank = function() {
	var delUserBankId = $("#delUserBankId").val();
	jQuery.ajax({
		url: '/ct-data/',
		type: 'POST',
		dataType: 'json',
		data:{"delUserBankId":delUserBankId},
		success: function(msg) {
			if(msg.sign === true) {
				popTips(msg.message, "succeed");
			} else {
				popTips(msg.message, "error");
			}
		},
		error: function() {
			popTips("删除失败", "error");
		}
	});
};

/**
获取用户银行账户是否绑定
获取密码保护问题是否绑定
获取google认证是否绑定
*/
var widthLevel = 0;
var isBankUserName = false;
var isPhone = false;
var phone = "";
var isTradePassword = false;
var isAlipayName = false;
var isGoogle = false;
var userEmail = "";
var bindOrder = [];
var userSecurityLevel = function() {
	widthLevel = 0;
	jQuery.ajax({
		url: '/ct-data/user/userSecurityLevel',
		type: 'POST',
		dataType: 'json',
		success: function(data, textStatus, xhr) {
			if (data.sign) {
				bindOrder["trapswd"] = {"order":data.trapswdOrder,"isBind":data.isTradePassword};
				bindOrder["phone"] = {"order":data.phoneOrder,"isBind":data.isPhoneCert};
				bindOrder["ga"] = {"order":data.gaOrder,"isBind":data.isGoogle};
				bindOrder["bank"] = {"order":data.bankOrder};
				bindOrder["email"] = {"order":data.emailOrder,"isBind":data.isEmailCert};
				bindOrder["question"] = {"order":data.questionOrder,"isBind":data.isQuestion};
                bindOrder["alipayName"] = {"isBind":data.isAlipayName};
				if (data.isBankUserName) {
					isBankUserName = true;
					var bankUserName = data.bankUserName;
					$("#userBankName").text(bankUserName);
					$(".rz").find(".xm").addClass("cur");
					$("#isUserbankName").find('div').eq(2).find('span').removeAttr("onclick");
					$("#isUserbankName").find('div').eq(2).find('span').removeClass("no").addClass("yes");
					$("#isUserbankName").find('div').eq(2).find('span').text('已绑定');
					$("#isUserbankName").find('div').eq(0).removeClass('wkt').addClass('ykt');
					widthLevel += 20;
				} else {
					$(".rz").find(".xm").removeClass("cur");
					$("#isUserbankName").find('div').eq(2).find('span').attr("onclick", "addUserBankName();");
					$("#isUserbankName").find('div').eq(2).find('span').removeClass("yes").addClass("no");
					$("#isUserbankName").find('div').eq(2).find('span').text('绑定');
					$("#isUserbankName").find('div').eq(0).removeClass('ykt').addClass('wkt');
				}
                isAlipayName = data.isAlipayName;
				$("#inputAlipayName").val(data.alipayName)
                if(data.isAlipayName){
                    $("#addAlipayName").hide();
                    $("#resetAlipayName").show();
                    $("#hide_twd").hide();
                    $("#inputAlipayPassword").val('');
                    $("#inputAlipayName").attr('disabled','disabled')
                    widthLevel += 20;
                }else {
                    $("#addAlipayName").show();
                    $("#resetAlipayName").hide();
                    $("#hide_twd").show();
                    $("#inputAlipayPassword").val('');
                    $("#inputAlipayName").removeAttr('disabled')
                }
				if (data.isPhone) {
					phone = data.phone;
					$("#xiugsj input.inp-sty-1").val('');
					var phoneHtml = '<span class="no" onclick="openPhoneCertPage();">激活</span>&nbsp;&nbsp;';
					phoneHtml += '<span class="no" onclick="openPhonePage();">修改</span>';
					$("#isPhone").find(".bdan").html(phoneHtml);
					$("#isPhone").find('div').eq(0).removeClass('wkt').addClass('ykt');
				} else {
					$("#isPhone").find(".bdan").html('<span class="no" onclick="openPhonePage();">绑定</span>');
					$("#isPhone").find('div').eq(0).removeClass('ykt').addClass('wkt');
				}
				if (data.isPhoneCert) {
					$(".rz").find(".sj").addClass("cur");
					$("#isPhone").find(".bdan").html('<span class="yes">已绑定</span>');
					$("#isPhone").find('div').eq(0).removeClass('wkt').addClass('ykt');
					widthLevel += 20;
				}

				var emailHtmlTips = '<div class="hdtips">';
				emailHtmlTips += '<i class="bd-rmb"></i>';
				emailHtmlTips += '<div class="ts">';
				emailHtmlTips += '<h6>绑定邮箱</h6>';
				emailHtmlTips += '<p>成功绑定邮箱验证后您将享受登入密码找回，更换密码保护等安全服务。<br/><em class="dred">此外，您将获得2元任务奖励。</em></p>';
				emailHtmlTips += '</div>';
				emailHtmlTips += '</div>';
				if (data.isEmail) {
					userEmail = data.email;
					$(".rz").find(".yx").addClass("cur");
					$("#email").val(data.email);
					var emailHtml = '<span class="no" onclick="emailCert();">激活</span>&nbsp;&nbsp;';
					emailHtml += '<span class="no" onclick="openEmailPage()">修改</span>';
					emailHtml += emailHtmlTips;
					$("#isEmail").find(".bdan").html(emailHtml);
					$("#isEmail").find('div').eq(0).removeClass('wkt').addClass('ykt');
				} else {
					$("#isEmail").find(".bdan").html(emailHtmlTips + '<span class="no" onclick="openEmailPage()">绑定</span>');
					$("#isEmail").find('div').eq(0).removeClass('ykt').addClass('wkt');
				}
				if (data.isEmailCert) {
					$(".rz").find(".yx").addClass("cur");
					// $("#isEmail").find(".bdan").html('<span class="no" onclick="openUnEmailPage();">解除绑定</span>');
					
					$("#isEmail").find(".bdan").html('<span class="yes">已绑定</span>');
					$("#isEmail").find('div').eq(0).removeClass('wkt').addClass('ykt');
					
					$("#isEmail").removeAttr("title");
					
					widthLevel += 20;
				}
				
				if (data.isGoogle) {
					isGoogle = true;
					// $("#isGoogle").find('div').eq(2).find('span').removeClass("yes").addClass("no");
					// $("#isGoogle").find('div').eq(2).find('span').text('解除绑定');
					$("#isGoogle").find('div').eq(2).find('span').removeClass("no").addClass("yes");
					$("#isGoogle").find('div').eq(2).find('span').text('已绑定');
					$("#isGoogle").find('div').eq(2).find('span').removeAttr("onclick");
					
					$("#isGoogle").find('div').eq(0).removeClass('wkt').addClass('ykt');
					
					$("#isGoogle .hdtips").hide();
					
					widthLevel += 20;
				} else {
					$("#isGoogle").find('div').eq(2).find('span').attr("onclick", "openGoogle();");
					$("#isGoogle").find('div').eq(2).find('span').removeClass("yes").addClass("no");
					$("#isGoogle").find('div').eq(2).find('span').text('绑定');
					$("#isGoogle").find('div').eq(0).removeClass('ykt').addClass('wkt');
					
					$("#isGoogle .hdtips").show();
				}
				
				$("#isTradePassword").find('div').eq(2).find('span').attr("onclick", "openTradPwdPage();");
				if (data.isTradePassword) {
					isTradePassword = true;
					$("#validateTrad").find('dd').eq(0).show();
					$("#confirmBtn").text('修改');
                    $("#resetBtn").show();
                    widthLevel += 20;
				} else {
					$("#validateTrad").find('dd').eq(0).hide();
					$("#confirmBtn").text('设置');
                    $("#resetBtn").hide();
                }
				
				if (data.isQuestion) {
					$("#isQuestion").find('div').eq(2).find('span').removeAttr("onclick");
					$("#isQuestion").find('div').eq(2).find('span').removeClass("no").addClass("yes");
					$("#isQuestion").find('div').eq(2).find('span').text('已绑定');
					$("#isQuestion").find('div').eq(0).removeClass('wkt').addClass('ykt');
					
					$("#isQuestion .hdtips").hide();
					
					widthLevel += 20;
				} else {
					$("#isQuestion").find('div').eq(2).find('span').attr("onclick", "openQuestion();");
					$("#isQuestion").find('div').eq(2).find('span').removeClass("yes").addClass("no");
					$("#isQuestion").find('div').eq(2).find('span').text('绑定');
					$("#isQuestion").find('div').eq(0).removeClass('ykt').addClass('wkt');
					
					$("#isQuestion .hdtips").show();
				}
				
				changeWidthLevel();
			} else {
				popTips(data.message, "error");
			}
		},
		error: function(xhr, textStatus, errorThrown) {

		}
	});
};

var changeWidthLevel = function() {
	if (widthLevel > 50) {
		$(".dj").find("em").attr("style", "background:#72F252;width:" + widthLevel + "%");
	} else {
		$(".dj").find("em").attr("style", "width:" + widthLevel + "%");
	}
 
	if (widthLevel >= 0 && widthLevel <= 40) {
		$(".di").empty();
		$(".di").html("低");
	}
	if(widthLevel > 40 && widthLevel <= 60) {
		$(".di").empty();
		$(".di").html("中");
	}
	if(widthLevel > 60) {
		$(".di").empty();
		$(".di").html("高");
	}
	$(".dj").find("div").text(widthLevel + "%");
}

//平台公告
var bulletinListMember = function() {
	jQuery.ajax({
		url: '/ct-data/article/bulletinList',
		type: 'POST',
		dataType: 'json',
		data: {
			firstResult: 0,
			maxResults: 5
		},
		success: function(data, textStatus, xhr) {
			$(".me-ptgg").find('ul').empty();
			if (data.sign) {
				$.each(data.bulletinList, function(index, val) {
					/* iterate through array or object */
					var html = '<li><a href="javascript:;" onclick="openAnnouncement(\'' + val.id + '\');">·&nbsp;';
					html += val.articleTitle + '<span>' + $.format.date(val.publishDate, "MM-dd") + '</span></a></li>';
					$(".me-ptgg").find('ul').append(html);

				});
			} else {
				popTips(data.message, "error");
			}
		},
		error: function(xhr, textStatus, errorThrown) {

		}
	});
};

var addUserBank = function() {
	if (!isBankUserName) {
		popTips("请先绑定银行账户姓名！！", "waring", "", function(){
			addUserBankName("addUserBank");
		});
		return;
	}
	if(!canBeBind("bank")) {
		return;
	}
	
	bankCardList();
	pop('addyinh');
};
//获取系统银行卡列表
var bankCardList = function() {
	var sysBankCard = $("#sysBankCard");
	sysBankCard.empty();
	sysBankCard.append('<option value="">请选择</option>');
	$.ajax({
		type: "post",
		url: "/ct-data/bank/getBankTypeList",
		datatype: "json",
		async: false,
		success: function(msg) {
			if (msg.sign === true) {
				$.each(msg.list, function(idx, val) {
					if(val.bankCode.indexOf("900") == 0) {
						return true;
					}
					if(val.bankCode.indexOf("800") == 0) {
						return true;
					}
					var html = '<option value="' + val.bankCode + '">' + val.bankName + '</option>';
					sysBankCard.append(html);
				});
			}
		}
	});
};

// ---------------------------------------解绑流程开始--------------------------

var gaSwitch = false;           // 系统解绑GA开关
var bankNamePwdSwitch = false;  // 系统解绑银行卡姓名和资金密码解绑

/**
 * 获取平台解绑开关
 * @param types bankCard-银行卡姓名和银行卡, tradePassword-资金密码, GA-解绑GA
 */
var getUserSercurityConfig = function (types) {
    jQuery.ajax({
        url: '/ct-data/user/getUserSercurityConfig',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            if (data.sign) {
                $("#btn-unband").off("click");
                gaSwitch = data.gaSwitch;
                bankNamePwdSwitch = data.bankNamePwdSwitch;
                var message = data.message;
                if (types == 'bankCard') { // 解绑银行卡
                    if (bankNamePwdSwitch) {
                        $("#unbindTitle").text("解绑银行卡");
                        pop("unbind");
                        $("#btn-unband").on('click', function () {
                            checkUnbindData('bankCard');
                        });
                    } else {
                        popTips("系统暂时没开通解绑银行卡功能", "waring");
                    }
                }
                if (types == 'tradePassword') { // 重置资金密码
                    if (bankNamePwdSwitch) {
                        $("#unbindTitle").text("重置资金密码");
                        pop("unbind");
                        $("#btn-unband").on('click', function () {
                            checkUnbindData('tradePassword');
                        });
                    } else {
                        popTips("系统暂时没开通解绑银行卡功能", "waring");
                    }
                }
                if (types == 'GA') { // 解绑 GA
                    if (gaSwitch) {
                        $("#unbindTitle").text("解绑 Google 身份验证器");
                        pop("unbind");
                        $("#btn-unband").on('click', function () {
                            checkUnbindData('GA');
                        });
                    } else {
                        popTips("系统暂时没开通此功能", "waring");
                    }
                }
                if (types == 'isAlipayName') { // 增加解绑姓名
                    if (bankNamePwdSwitch) {
                        $("#unbindTitle").text("清除支付宝姓名");
                        $("#btn-unband").text("确定清除");
                        pop("unbind");
                        $("#btn-unband").on('click', function () {
                            checkUnbindData('alipayName');  //传递解绑
                        });
                    } else {
                        popTips("系统暂时没开通解绑姓名功能", "waring");
                    }
                }
            }
        }
    });
};

// 解绑选择类型
var options_type = function () {
    var option_type = $("#options").val();
    $(".options_one").hide();
    $("#options_two").hide();
    $("#options_three").hide();
    $("#answer_One").val("");
    $("#answer_tow").val("");
    $("#answer_three").val("");
    if (option_type == '0') {
        $(".options_one").show();
        $("#answer_One").val("");
    }
    if (option_type == '1') {
        $("#options_two").show();
        $("#answer_tow").val("");
    }
    if (option_type == '2') {
        $("#options_three").show();
        $("#answer_three").val("");
    }
};

/**
 * @param type 解除绑定资料类型(bankCard-银行卡姓名和银行卡, tradePassword-资金密码, GA-解绑GA)
 */
var checkUnbindData = function (type) {
    var option_type     = $("#options").val();         // 选择类型
    var question_One    = $("#question_One").val();    // 选择密保
    var answer_One      = $("#answer_One").val();      // 密保答案
    var answer_tow      = $("#answer_tow").val();      // 资金密码
    var answer_three    = $("#answer_three").val();    // 银行卡姓名
    if (option_type == '0') {// 密保问题
        if (question_One && answer_One) {
            commitUnbind(type, question_One, answer_One, answer_tow, answer_three);
        } else {
            popTips("请先填写密保类型或者密保答案", "waring");
        }
    }
    if (option_type == '1') {// 资金密码
        if (answer_tow) {
            commitUnbind(type, question_One, answer_One, answer_tow, answer_three);
        } else {
            popTips("请先填写资金密码", "waring");
        }
    }
    if (option_type == '2') {// 银行卡姓名
        if (answer_three) {
            commitUnbind(type, question_One, answer_One, answer_tow, answer_three);
        } else {
            popTips("请先填写资金密码", "waring");
        }
    }
};


/**
 * 解绑信息提交
 * @param type 解除绑定资料类型(bankCard-银行卡姓名和银行卡, tradePassword-资金密码, GA-解绑GA)
 * @param questions 密保问题
 * @param answers 答案
 * @param pd 资金密码
 * @param bankName 银行卡姓名
 */
var commitUnbind = function (type, questions, answers, pd, bankName) {
    var urls = '';
    var datas = {};
    if (type == 'bankCard' || type == 'tradePassword' || type == 'bankName' ||type == 'alipayName') {
        if(type == 'bankName'){
            type = 'bankCard';  //因为没有独立解绑姓名则赋bankCard
        }
        urls = '/ct-data/user/unbindBankCardOrTradePassword';
        datas = {
            unbindType: type,
            question: questions,
            answer: answers,
            pwd: pd,
            userName: bankName
        }
    }
    if (type == 'GA') {
        urls = '/ct-data/user/unBindGa';
        datas = {
            question: questions,
            answer: answers,
            pwd: pd,
            userName: bankName
        }
    }
    jQuery.ajax({
        url: urls,
        type: 'POST',
        dataType: 'json',
        data: datas,
        success: function (data) {
            closelayer();
            if (data.sign) {
                popTips(data.message, "succeed");
                userSecurityLevel();
                if(type == 'bankCard'){
                	isBankUserName = false;
                    userBank();
                }else if(type == 'tradePassword'){
                    isTradePassword = false;
                }else if(type == 'GA'){
                    isGoogle = false;
                } else if(type == 'alipayName'){
                    isAlipayName = false;
                    $("#hide_twd").show();
                    $("#inputAlipayName").removeAttr('disabled');
                    $("#inputAlipayPassword").val('');
                 }
            } else {
                // 重置填写信息
                $("#options option").eq(0).prop("selected", true);
                $("#options").trigger("change");
                $("#question_One option").eq(0).prop("selected", true);
                $("#question_One").trigger("change");
                $("#answer_One").val("");
                $("#answer_tow").val("");
                $("#answer_three").val("");
                popTips(data.message, "waring");
            }
        },
        error: function () {
            popTips("解绑失败", "waring");
        }
    });
};

// ---------------------------------------解绑流程结束--------------------------

//保存银行卡
var saveUserBankCard = function (e) {
    var bankCode = $("#sysBankCard").val().trim();
    var bankCardNumber = $("#bankCardNum").val().trim();
    var regbankCardNumber = $("#regBankCardNum").val().trim();
    var province = $("#province").val().trim();
    var city = $("#city").val().trim();
    var bankTradPwd = $("#bankTradPwd").val().trim();
    // 07-11 add 开户行网点
    var bankBranch = $("#bankBranch").val().trim();
    var reg = /[^\u4E00-\u9FA5]/g;

    if (bankCode.length < 1) {
        popTips("请选择银行卡", "error");
    } else if (province.length < 1 || city.length < 1) {
        popTips("请选择开户行", "error");
    } else if (bankBranch.length < 1 || reg.test(bankBranch)) {
        popTips("请填写开户行网点名称（只能输入文字）", "error");
    } else if(bankBranch.length>15) {
		popTips("请填写正确的开户行网点名称（长度不能超过15个字符）", "error")
	} else if (bankCardNumber.length < 1) {
        popTips("请输入银行卡号", "error");
    } else if (regbankCardNumber.length < 1) {
        popTips("请输入确认银行卡号", "error");
    } else if (regbankCardNumber != bankCardNumber) {
        popTips("两次卡号输入的不一致，请重新输入", "error");
    } else if (bankTradPwd.length < 1) {
        popTips("请输入资金密码", "error");
    } else {
        $(e.target).attr("onclick", "");
        bankAddress = province + "-" + city;
        jQuery.ajax({
            type: 'post',
            url: '/ct-data/userBank/toSaveCard',
            dataType: 'json',
            data: {
                "bankCardNumber": bankCardNumber,
                "bankAddress": bankAddress,
                "bankTradPwd": bankTradPwd,
                "bankCode": bankCode,
                "regbankCardNumber": regbankCardNumber,
                "bankBranch": bankBranch
            },
            success: function (data) {
                if (data.sign) {
                    closelayer();
                    popTips(data.message, "succeed");

                    userBank();
                    $("#province").val("");
                    $("#city").val("");
                    $("#bankCardNum").val("");
                    $("#regBankCardNum").val("");
                    $("#bankTradPwd").val("");
                    $(".m-bdyhk .hdtips").hide();
                    $("#bankBranch").val("");
                } else {
                    popTips(data.message, "error");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                popTips("系统出现错误，请联系管理员", "error");
            },
            complete: function () {
                $(e.target).attr("onclick", "saveUserBankCard(event);");
            }
        });
    }
};
//设置默认银行卡
var defaultUserBankCard = function(id) {
	jQuery.ajax({
		type: 'post',
		url: '/ct-data/userBank/defaultUserBankCard',
		dataType: 'json',
		data: {
			"id": id
		},
		success: function(data) {
			if (data.sign) {
				userBank();
				closelayer();
				popTips(data.message, "succeed");
			} else {
				popTips(data.message, "error");
			}
		},
		error: function(xhr, textStatus, errorThrown) {
			popTips("系统出现错误，请联系管理员", "error");
		}
	});
};

var addUserBankName = function(callbackName) {
	if(callbackName) {
		$("#addUserBankNameCallback").val(callbackName);
	} else {
		$("#addUserBankNameCallback").val("");
	}
	pop('yinhzhxm');
};


/**
 * 获取正确的银行卡名字
 * @param arryAll
 * @param userBankName
 * @returns {boolean}
 */
function getBankUserName(arryAll,userBankName){
	var flag = false;

	arryAll.forEach(function (e) {
		if (userBankName === e) {
			flag = true;
		}
	});

	return flag;
}

//添加银行卡姓名
var saveUserBankName = function() {
	var userBankName = $("#yinhzhxm").find("input.inp-sty-1").val();

	if (userBankName.length < 1) {
		popTips("请输入银行卡持卡姓名！", "error");
		return false;
	}

	// var reg = /^([\u4e00-\u9fa5.·]+|([a-zA-Z.·]+\s?)+)$/;
	var reg = /^([\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*)|([a-zA-Z]+((\s|.|·){1}[a-zA-Z]+)*)$/;

	var arryAll = userBankName.match(reg);

	var flag = false;
	if(arryAll != null) {
		var bankUserNameFlag = getBankUserName(arryAll,userBankName);

		if(bankUserNameFlag){
			if(userBankName.length > 10){
				popTips("不得填写数字，字数不得超过10位数", "error");
			}else{
				flag = true;
				jQuery.ajax({
					url: '/ct-data/user/addUserBankName',
					type: 'POST',
					dataType: 'json',
					data: {
						name: userBankName
					},
					success: function(data, textStatus, xhr) {
						if (data.sign) {
							closelayer();

							isBankUserName = true;
							userSecurityLevel();

							var callbackName = $("#addUserBankNameCallback").val();
							if (callbackName == "addUserBank") {
								addUserBank();
							} else {
								popTips(data.message, "succeed");
							}
						} else {
							isBankUserName = false;
							popTips(data.message, "error");
						}
					},
					error: function(xhr, textStatus, errorThrown) {
						popTips("系统出现错误，请联系管理员", "error");
					}
				});
			}
		}
	}

	if(!flag){
		popTips("请填写正确的格式，不得填写数字，字数不得超过10位数", "error");
	}
};
//添加支付宝姓名
var saveAlipayName = function() {
    if(!isTradePassword){
        popTips("请先绑定资金密码", "waring", "");
        return false
    }
    var userAlipayName = $("#inputAlipayName").val();
    var userAlipayPassword =  $("#inputAlipayPassword").val();

    if (userAlipayName.length < 1) {
        popTips("请输入支付宝姓名！", "error");
        return false;
    }else if(userAlipayPassword < 1){
        popTips("请输入资金密码！", "error");
        return false;
    }
    // var reg = /^([\u4e00-\u9fa5.·]+|([a-zA-Z.·]+\s?)+)$/;
    var reg = /^([\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*)|([a-zA-Z]+((\s|.|·){1}[a-zA-Z]+)*)$/;
    var arryAll = userAlipayName.match(reg);

    var flag = false;
    if(arryAll != null) {
        var AlipayNameFlag = getBankUserName(arryAll,userAlipayName);

        if(AlipayNameFlag){
            if(userAlipayName.length > 10){
                popTips("不得填写数字，字数不得超过10位数", "error");
            }else{
                flag = true;
                jQuery.ajax({
                    url: '/ct-data/user/saveUserAlipayName',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        name: userAlipayName,
                        tradPwd: userAlipayPassword
                    },
                    success: function(data, textStatus, xhr) {
                        //called when successful
                        if (data.sign) {
                            isAlipayName = true;
                            userSecurityLevel();
                            $("#addAlipayName").hide();
                            $("#resetAlipayName").show();
                            $("#hide_twd").hide();
                            $("#inputAlipayName").attr('disabled','disabled');
                            $("#inputAlipayPassword").val('');
                            popTips(data.message, "succeed");
                        } else {
                            isAlipayName = false;
                            popTips(data.message, "error");
                        }
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        popTips("系统出现错误，请联系管理员", "error");
                    }
                });
            }
        }
    }
    if(!flag){
        popTips("请填写正确的格式，不得填写数字，字数不得超过10位数", "error");
    }
};

// 绑定手机
var openPhonePage = function() {
	if(!canBeBind("phone")) {
		return;
	}
	
	$("#cellphoneArea").empty();
	
	$.ajax({
		url: '/ct-data/user/phoneCode',
		type: 'POST',
		dataType: 'json',
		success: function(data) {
			if (data.sign) {
				var html = '';
				$.each(data.phoneCode, function(idx, val){
					html += '<option value="'+val.value+'">'+val.name+' '+val.value+'</option>';
				});
				$("#cellphoneArea").append(html);
			}
		},
		error: function(xhr, textStatus, errorThrown) {}
	});
	
	pop('xiugsj');
};
// 更改绑定手机号码
var updatePhone = function(e) {
	var phoneNumber = $("#xiugsj .inp-sty-1").val().trim();
	if(!phoneNumber) {
		popTips("请输入手机号码", "waring");
		return;
	}
	if(phoneNumber.length < 5) {
		popTips("手机号码格式不正确", "waring");
		return;
	}
	$(e.target).removeAttr("onclick");
	$.ajax({
		url: '/ct-data/user/savePhone',
		type: 'POST',
		dataType: 'json',
		data: {
			"code": $("#cellphoneArea").val(),
			"phone": phoneNumber
		},
		success: function(data) {
			if (data.sign) {
				closelayer();
				userSecurityLevel();
				popTips(data.message, "succeed");
			} else {
				popTips(data.message, "error");
			}
		},
		error: function(xhr, textStatus, errorThrown) {
		},
		complete: function() {
			$(e.target).attr("onclick", "updatePhone(event);");
		}
	});
};
var getValicodeForCertPhone = function() {
	$("#jihuosj img").attr("src", "/ct-data/acegi/captcha?" + (new Date()).getTime());
};
// 获取验证码
var openPhoneCertPage = function() {
	getValicodeForCertPhone();
	$("#valicodeForPhone").val('');
	$("#jihuosj .inp-sty-1").val('');
	pop("jihuosj");
};
var getPhoneCertCode = function(e) {
	var valicode = $("#valicodeForPhone").val();
	if(valicode.length != 4) {
		popTips("验证码不正确", "waring");
		return;
	}
	$.ajax({
		type: "post",
		url: "/ct-data/user/phoneSendVali",
		data: {
			"type": $("#cellphoneSendType").val(),
			"validateCode": valicode
		},
		datatype: "json",
		success: function(data) {
			getValicodeForCertPhone();
			if (data.sign) {
				$(e.target).removeAttr("onclick").html("重新请求(<strong>60</strong>)");
				countdownObjTime($(e.target).find("strong"), 60, function(){
					$(e.target).text("发送手机验证码");
					$(e.target).attr("onclick", "getPhoneCertCode(event);");
				});
				popTips(data.message, "succeed");
			} else {
				popTips(data.message, "error");
			}
		},
		error: function(xhr, textStatus, errorThrown) {
			getValicodeForCertPhone();
			popTips("系统出现错误，请联系管理员", "error");
		}
	});
};

// 激活手机
var phoneCert = function() {
	var code = $("#jihuosj .inp-sty-1").val().trim();
	if(!code) {
		popTips("请输入手机验证码", "waring");
		return;
	}
	if(code.length < 4) {
		popTips("手机验证码不正确", "waring");
		return;
	}
	
	$.ajax({
		type: "post",
		url: "/ct-data/user/updatePhoneState",
		data: {
			"code": code
		},
		datatype: "json",
		success: function(data) {
			if (data.sign) {
				closelayer();
				userSecurityLevel();
				popTips(data.message, "succeed");
			} else {
				popTips(data.message, "error");
			}
		},
		error: function(xhr, textStatus, errorThrown) {
			popTips("系统出现错误，请联系管理员", "error");
		}
	});
};

//修改登录密码
var openPwdPage = function() {
	$("#oldPwd").val("");
	$("#newPwd").val("");
	$("#rePwd").val("");
	$("#xiugaizjmm").find('.aar-title').find("span").text('修改登录密码');
	$("#xiugaizjmm").find('.dred').text('密码由6至16个字符组成');
	$("#xiugaizjmm").find('.aar-but a').attr("onclick", "editPwd()");
	$("#xiugaizjmm").find('.validate-form').find('dd').eq(0).show();
	pop('xiugaizjmm');
};
var editPwd = function() {
	var oldPwd = $("#oldPwd").val().trim();
	var newPwd = $("#newPwd").val().trim();
	var rePwd = $("#rePwd").val().trim();
	if (oldPwd.length < 6 || oldPwd.length > 20) {
		$("#formPwd").find('.dred').text('旧密码格式不正确(由6至16个字符组成)');
		$("#formPwd").show();
		return;
	}
	if (newPwd.length < 6 || newPwd.length > 20) {
		$("#formPwd").find('.dred').text('新密码格式不正确(由6至16个字符组成)');
		$("#formPwd").show();
		return;
	}
	if (rePwd.length < 6 || rePwd.length > 20) {
		$("#formPwd").find('.dred').text('确认密码格式不正确(由6至16个字符组成)');
		$("#formPwd").show();
		return;
	}
	if (newPwd != rePwd) {
		$("#formPwd").find('.dred').text('新密码与确认密码不一致');
		$("#formPwd").show();
		return;
	}
	jQuery.ajax({
		url: '/ct-data/user/updatePassword',
		type: 'POST',
		dataType: 'json',
		data: {
			oldPwd: oldPwd,
			newPwd: newPwd,
			rePwd: rePwd
		},
		success: function(data, textStatus, xhr) {
			//called when successful
			if (data.sign) {
				closelayer();
				popTips(data.message, "succeed", '', getUserInfo);
			} else {
				popTips(data.message, "error");
			}
		},
		error: function(xhr, textStatus, errorThrown) {
			//called when there is an error
			popTips("系统出现错误，请联系管理员", "error");
		}
	});
};
//修改资金密码
/*var openTradPwdPage = function(callbackName) {
	if(!canBeBind("trapswd")) {
		return;
	}
	
	$("#oldPwd").val("");
	$("#newPwd").val("");
	$("#rePwd").val("");
	if (isTradePassword) {
		$("#validateTrad").find('.validate-form').find('dd').eq(0).show();
	} else {
		$("#validateTrad").find('.validate-form').find('dd').eq(0).hide();
	}
	/!*$("#xiugaizjmm").find('.aar-title').find("span").text('修改资金密码');
	$("#xiugaizjmm").find('.dred').text('密码由6至16个字符组成');
	$("#xiugaizjmm").find('.aar-but a').attr("onclick", "editTradPwd();");*!/
	if (oldPwd.length < 6 || oldPwd.length > 20) {
		$("#formTrad").find('.dred').text('旧密码格式不正确(由6至16个字符组成)');
		$("#formTrad").show();
		return;
	}
	if (newPwd.length < 6 || newPwd.length > 20) {
		$("#formTrad").find('.dred').text('新密码格式不正确(由6至16个字符组成)');
		$("#formTrad").show();
		return;
	}
	if (rePwd.length < 6 || rePwd.length > 20) {
		$("#formTrad").find('.dred').text('确认密码格式不正确(由6至16个字符组成)');
		$("#formTrad").show();
		return;
	}
	if (newPwd != rePwd) {
		$("#formTrad").find('.dred').text('新密码与确认密码不一致');
		$("#formTrad").show();
		return;
	}
	if(callbackName) {
		$("#setTradPwdCallback").val(callbackName);
	} else {
		$("#setTradPwdCallback").val("");
	}
	pop('xiugaizjmm');
};*/

var editTradPwd = function() {
	var oldPwd = $("#oldPwdTrad").val().trim();
	var newPwd = $("#newPwdTrad").val().trim();
	var rePwd = $("#rePwdTrad").val().trim();

	if(!oldPwd && $("#validateTrad").children().eq(1).css("display") !== 'none'){
		$("#formTrad").find('.dred').text('旧密码不能为空');
		$("#formTrad").show();
		return;
	}

	if (isTradePassword) {
		$("#validateTrad").find('.validate-form').find('dd').eq(0).show();
		if (newPwd.length < 6 || newPwd.length > 20) {
			//$("#xiugaizjmm").find('.dred').text('新密码格式不正确(由6至16个字符组成)');
			$("#formTrad").find('.dred').text('新密码格式不正确(由6至16个字符组成)');
			return;
		}
	} else {
		$("#validateTrad").find('.validate-form').find('dd').eq(0).hide();
	}

	if (newPwd.length < 6 || newPwd.length > 20) {
		$("#formTrad").find('.dred').text('新密码格式不正确(由6至16个字符组成)');
		$("#formTrad").show();
		return;
	}
	if (rePwd.length < 6 || rePwd.length > 20) {
		$("#formTrad").find('.dred').text('确认密码格式不正确(由6至16个字符组成)');
		$("#formTrad").show();
		return;
	}
	if (newPwd != rePwd) {
		$("#formTrad").find('.dred').text('新密码与确认密码不一致');
		$("#formTrad").show();
		return;
	}
	jQuery.ajax({
		url: '/ct-data/user/updateTradePassword',
		type: 'POST',
		dataType: 'json',
		data: {
			oldPwd: oldPwd,
			newPwd: newPwd,
			rePwd: rePwd
		},
		success: function(data, textStatus, xhr) {
			//called when successful
			if (data.sign) {
				closelayer();
				userSecurityLevel();
				
				var callbackName = $("#setTradPwdCallback").val();
				if(callbackName == "addUserBank") {
					popTips(data.message, "succeed", "", function(){
						addUserBank();
					});
				} else if(callbackName == "openQuestion") {
					popTips(data.message, "succeed", "", function(){
						openQuestion();
					});
				} else if(callbackName == "openGoogle") {
					popTips(data.message, "succeed", "", function(){
						openGoogle();
					});
				} else {
					popTips(data.message.split(",")[0], "succeed");

				}
				$("#oldPwdTrad").val("");
				$("#newPwdTrad").val("");
				$("#rePwdTrad").val("");
				if(!isTradePassword){
                    $("#validateTrad").find('.validate-form').find('dd').eq(0).hide();
				}
				$("#formTrad").find('.dred').text('密码由6至16个字符组成。');
			} else {
				popTips(data.message, "error");
				$("#oldPwdTrad").val("");
				$("#newPwdTrad").val("");
				$("#rePwdTrad").val("");
			}

		},
		error: function(xhr, textStatus, errorThrown) {
			//called when there is an error
			popTips("系统出现错误，请联系管理员", "error");
		}
	});
};

var openQuestion = function() {
	if(!canBeBind("question")) {
		return;
	}
	
	$("#questionOne").val("");
	$("#questionTwo").val("");
	$("#questionThree").val("");
	$("#answerOne").val("");
	$("#answerTwo").val("");
	$("#answerThree").val("");
	$("#tradePwd").val("");
	$("#questionOne").children('option').css("display", "block");
	$("#questionTwo").children('option').css("display", "block");
	$("#questionThree").children('option').css("display", "block");
	pop('szmmbh');
};
var changeQuestionOne = function() {
	var v = $("#questionOne").val();
	var v2 = $("#questionTwo").val();
	var v3 = $("#questionTwo").val();
	var option2 = $("#questionTwo").find('option');
	var option3 = $("#questionThree").find('option');
	var i;
	for (i = 0; i < option2.length; i++) {
		if (option2.eq(i).val() == v || option2.eq(i).val() == v2) {
			option2.eq(i).css("display", "none");
		} else {
			option2.eq(i).css("display", "block");
		}
	}
	for (i = 0; i < option3.length; i++) {
		if (option3.eq(i).val() == v || option2.eq(i).val() == v3) {
			option3.eq(i).css("display", "none");
		} else {
			option3.eq(i).css("display", "block");
		}
	}
};
var changeQuestionTwo = function() {
	var v = $("#questionOne").val();
	var v2 = $("#questionTwo").val();
	var v3 = $("#questionTwo").val();
	var option1 = $("#questionOne").find('option');
	var option3 = $("#questionThree").find('option');
	var i;
	for (i = 0; i < option1.length; i++) {
		if (option1.eq(i).val() == v2 || option1.eq(i).val() == v3) {
			option1.eq(i).css("display", "none");
		} else {
			option1.eq(i).css("display", "block");
		}
	}
	for (i = 0; i < option3.length; i++) {
		if (option3.eq(i).val() == v2 || option1.eq(i).val() == v) {
			option3.eq(i).css("display", "none");
		} else {
			option3.eq(i).css("display", "block");
		}
	}
};
var changeQuestionThree = function() {
	var v = $("#questionOne").val();
	var v2 = $("#questionTwo").val();
	var v3 = $("#questionThree").val();
	var option1 = $("#questionOne").find('option');
	var option2 = $("#questionTwo").find('option');
	var i;
	for (i = 0; i < option1.length; i++) {
		if (option1.eq(i).val() == v2 || option1.eq(i).val() == v3) {
			option1.eq(i).css("display", "none");
		} else {
			option1.eq(i).css("display", "block");
		}
	}
	for (i = 0; i < option2.length; i++) {
		if (option2.eq(i).val() == v || option1.eq(i).val() == v3) {
			option2.eq(i).css("display", "none");
		} else {
			option2.eq(i).css("display", "block");
		}
	}
};

//保存密保问题
var saveQuestion = function() {

	var v = $("#questionOne").val();
	var v2 = $("#questionTwo").val();
	var v3 = $("#questionThree").val();
	var answerOne = $("#answerOne").val();
	var answerTwo = $("#answerTwo").val();
	var answerThree = $("#answerThree").val();
	var tradePwd = $("#tradePwd").val();
	if (v.length < 1) {
		$("#szmmbh").find('.dred').text('请选择密保问题1！');
		return;
	}
	if (v2.length < 1) {
		$("#szmmbh").find('.dred').text('请选择密保问题2！');
		return;
	}
	if (v3.length < 1) {
		$("#szmmbh").find('.dred').text('请选择密保问题3！');
		return;
	}
	if (v == v2 || v == v3 || v2 == v3) {
		$("#szmmbh").find('.dred').text('密码问题不能重复！');
		return;
	}
	if (answerOne.length < 1) {
		$("#szmmbh").find('.dred').text('问题1答案不能为空！');
		return;
	}
	if (answerTwo.length < 1) {
		$("#szmmbh").find('.dred').text('问题2答案不能为空！');
		return;
	}
	if (answerThree.length < 1) {
		$("#szmmbh").find('.dred').text('问题3答案不能为空！');
		return;
	}
	if (answerOne == answerTwo || answerOne == answerThree || answerTwo == answerThree) {
		$("#szmmbh").find('.dred').text('密保答案不能相同！');
		return;
	}
	if (tradePwd.length < 1) {
		$("#szmmbh").find('.dred').text('资金密码不能为空！');
		return;
	}
	jQuery.ajax({
		url: '/ct-data/user/saveQuestion',
		type: 'POST',
		dataType: 'json',
		data: {
			"questionOne": v,
			"answerOne": answerOne,
			"questionTwo": v2,
			"answerTwo": answerTwo,
			"questionThree": v3,
			"answerThree": answerThree,
			"tradePwd": tradePwd
		},
		success: function(data, textStatus, xhr) {
			//called when successful
			if (data.sign) {
				closelayer();
				userSecurityLevel();
				getQuestionPassword();
				popTips(data.message, "succeed");
			} else {
				popTips(data.message, "error");
			}
		},
		error: function(xhr, textStatus, errorThrown) {
			//called when there is an error
			popTips("系统出现错误，请联系管理员", "error");
		}
	});

};

var openQuestion = function() {
	if(!canBeBind("question")) {
		return;
	}

	$("#questionOne").val("");
	$("#questionTwo").val("");
	$("#questionThree").val("");
	$("#answerOne").val("");
	$("#answerTwo").val("");
	$("#answerThree").val("");
	$("#tradePwd").val("");
	$("#questionOne").children('option').css("display", "block");
	$("#questionTwo").children('option').css("display", "block");
	$("#questionThree").children('option').css("display", "block");
	pop('szmmbh');
};
var changeQuestionFour = function() {
	var v = $("#questionFour").val();
	var v2 = $("#questionFive").val();
	var v3 = $("#questionFive").val();
	var option2 = $("#questionFive").find('option');
	var option3 = $("#questionSix").find('option');
	var i;
	for (i = 0; i < option2.length; i++) {
		if (option2.eq(i).val() == v || option2.eq(i).val() == v2) {
			option2.eq(i).css("display", "none");
		} else {
			option2.eq(i).css("display", "block");
		}
	}
	for (i = 0; i < option3.length; i++) {
		if (option3.eq(i).val() == v || option2.eq(i).val() == v3) {
			option3.eq(i).css("display", "none");
		} else {
			option3.eq(i).css("display", "block");
		}
	}
};
var changeQuestionFive = function() {
	var v = $("#questionFour").val();
	var v2 = $("#questionFive").val();
	var v3 = $("#questionFive").val();
	var option1 = $("#questionFour").find('option');
	var option3 = $("#questionSix").find('option');
	var i;
	for (i = 0; i < option1.length; i++) {
		if (option1.eq(i).val() == v2 || option1.eq(i).val() == v3) {
			option1.eq(i).css("display", "none");
		} else {
			option1.eq(i).css("display", "block");
		}
	}
	for (i = 0; i < option3.length; i++) {
		if (option3.eq(i).val() == v2 || option1.eq(i).val() == v) {
			option3.eq(i).css("display", "none");
		} else {
			option3.eq(i).css("display", "block");
		}
	}
};
var changeQuestionSix = function() {
	var v = $("#questionFour").val();
	var v2 = $("#questionFive").val();
	var v3 = $("#questionSix").val();
	var option1 = $("#questionOne").find('option');
	var option2 = $("#questionTwo").find('option');
	var i;
	for (i = 0; i < option1.length; i++) {
		if (option1.eq(i).val() == v2 || option1.eq(i).val() == v3) {
			option1.eq(i).css("display", "none");
		} else {
			option1.eq(i).css("display", "block");
		}
	}
	for (i = 0; i < option2.length; i++) {
		if (option2.eq(i).val() == v || option1.eq(i).val() == v3) {
			option2.eq(i).css("display", "none");
		} else {
			option2.eq(i).css("display", "block");
		}
	}
};

//保存密保问题
var saveQuestion2 = function() {
	var v = $("#questionFour").val();
	var v2 = $("#questionFive").val();
	var v3 = $("#questionSix").val();
	var answerOne = $("#answerFour").val();
	var answerTwo = $("#answerFive").val();
	var answerThree = $("#answerSix").val();
	var tradePwd = $("#tradePwd2").val();
	if (v.length < 1) {
		$("#szmmbh2").find('.dred').text('请选择密保问题1！');
		return;
	}
	if (v2.length < 1) {
		$("#szmmbh2").find('.dred').text('请选择密保问题2！');
		return;
	}
	if (v3.length < 1) {
		$("#szmmbh2").find('.dred').text('请选择密保问题3！');
		return;
	}
	if (v == v2 || v == v3 || v2 == v3) {
		$("#szmmbh2").find('.dred').text('密码问题不能重复！');
		return;
	}
	if (answerOne.length < 1) {
		$("#szmmbh2").find('.dred').text('问题1答案不能为空！');
		return;
	}
	if (answerTwo.length < 1) {
		$("#szmmbh2").find('.dred').text('问题2答案不能为空！');
		return;
	}
	if (answerThree.length < 1) {
		$("#szmmbh2").find('.dred').text('问题3答案不能为空！');
		return;
	}
	if (answerOne == answerTwo || answerOne == answerThree || answerTwo == answerThree) {
		$("#szmmbh2").find('.dred').text('密保答案不能相同！');
		return;
	}
	if (tradePwd.length < 1) {
		$("#szmmbh2").find('.dred').text('资金密码不能为空！');
		return;
	}
	jQuery.ajax({
		url: '/ct-data/user/saveQuestion',
		type: 'POST',
		dataType: 'json',
		data: {
			"questionOne": v,
			"answerOne": answerOne,
			"questionTwo": v2,
			"answerTwo": answerTwo,
			"questionThree": v3,
			"answerThree": answerThree,
			"tradePwd": tradePwd
		},
		success: function(data, textStatus, xhr) {
			//called when successful
			if (data.sign) {
				closelayer();
				userSecurityLevel();
				popTips(data.message, "succeed");
			} else {
				popTips(data.message, "error");
			}
		},
		error: function(xhr, textStatus, errorThrown) {
			//called when there is an error
			popTips("系统出现错误，请联系管理员", "error");
		}
	});

};
var gaKey = "";
var openGoogle = function() {
	if(!canBeBind("ga")) {
		return;
	}
	
	$('#gaPassword').val("");
	$('#gatrPassword').val("");
	if (isGoogle) {
		$("#googleyz").find(".ym-gl").find("a").text("解除绑定");
		$("#googleyz").find(".ym-gl").children('li').eq(0).children('p').text('输入谷歌动态密码和资金密码解除绑定');
		$("#googleyz").find(".ym-gl").find("a").attr("onclick", "unBindGoogle();");
	} else {
		$("#googleyz").find(".ym-gl").children('li').eq(0).children('p').text('绑定完毕后输入谷歌动态密码');
		$.ajax({
			url: '/ct-data/user/getGAKey',
			type: 'POST',
			dataType: 'json',
			async:false,
			success: function(data, textStatus, xhr) {
				gaKey = data.gaKey;
				$("#googleyz").find(".erweima").find("img").attr("src", "/ct-data/user/generateGaImage?gaKey=" + gaKey);
			}
		});
		$("#googleyz").find(".ym-gl").find("a").text("绑定账户");
		$("#googleyz").find(".ym-gl").find("a").attr("onclick", "bindGoogle();");
	}
	pop('googleyz');
};
//绑定google认证
var bindGoogle = function() {
	var gaCode = $('#gaPassword').val();
	var loCode = $('#gatrPassword').val();
	if (gaCode.length < 1) {
		popTips("请输入动态密码", "error");
		return;
	}
	if (loCode.length < 1) {
		popTips("请输入资金密码", "error");
		return;
	}
	jQuery.ajax({
		url: '/ct-data/user/bindGa',
		type: 'POST',
		dataType: 'json',
		data: {
			"gaKey": gaKey.trim(),
			"gaCode": gaCode.trim(),
			"password": loCode.trim()
		},
		success: function(data, textStatus, xhr) {
			//called when successful
			if (data.sign) {
				closelayer();
				userSecurityLevel();
				popTips(data.message, "succeed");
			} else {
				popTips(data.message, "error");
			}
		},
		error: function(xhr, textStatus, errorThrown) {
			//called when there is an error
			popTips("系统出现错误，请联系管理员", "error");
		}
	});
    openGoogle();
};
//解除google认证
var unBindGoogle = function() {
	var gaCode = $('#gaPassword').val();
	if (gaCode.length < 1) {
		popTips("请输入动态密码", "error");
		return;
	}
	
	var loCode = $('#gatrPassword').val();
	if (loCode.length < 1) {
		popTips("请输入资金密码", "error");
		return;
	}
	jQuery.ajax({
		url: '/ct-data/user/unBindGa',
		type: 'POST',
		dataType: 'json',
		data: {
			"password": loCode.trim(),
			"gaCode" : gaCode.trim()
		},
		success: function(data, textStatus, xhr) {
			//called when successful
			if (data.sign) {
				closelayer();
				isGoogle = false;
				popTips(data.message, "succeed");
				$("#isGoogle").find('div').eq(2).find('span').removeClass("yes").addClass("no");
				$("#isGoogle").find('div').eq(2).find('span').text('绑定');
				$("#isGoogle").find('div').eq(0).removeClass('wkt').addClass('ykt');
				widthLevel = widthLevel - 20;
				changeWidthLevel();
			} else {
				popTips(data.message, "error");
			}
		},
		error: function(xhr, textStatus, errorThrown) {
			//called when there is an error
			popTips("系统出现错误，请联系管理员", "error");
		}
	});
    openGoogle();
};

var openEmailPage = function() {
	if(!canBeBind("email")) {
		return;
	}
	
	$("#dianziyx").find("#email").val(userEmail);
	pop('dianziyx');
};
var emailReg = /^\s*\w+(?:\.{0,1}[\w-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\.[a-zA-Z]+\s*$/;
var bindEmail = function() {
	var email = $('#email').val().trim();
	if (email.length < 1) {
		popTips("请输入邮箱地址", "error");
		return;
	}
	if (!emailReg.test(email)) {
		popTips("邮箱地址格式不正确", "error");
		return;
	}
	jQuery.ajax({
		url: '/ct-data/user/bindEmail',
		type: 'POST',
		dataType: 'json',
		data: {
			"email": email
		},
		success: function(data, textStatus, xhr) {
			//called when successful
			if (data.sign) {
				closelayer();
				userSecurityLevel();
				popTips(data.message, "succeed");
			} else {
				popTips(data.message, "error");
			}
		},
		error: function(xhr, textStatus, errorThrown) {
			//called when there is an error
			popTips("系统出现错误，请联系管理员", "error");
		}
	});
};

var openUnEmailPage = function() {
	$('#emPassword').val("");
	pop('undianziyx');
};
var unBindEmail = function() {
	var emPassword = $('#emPassword').val().trim();
	if (emPassword.length < 1) {
		popTips("请输入资金密码", "error");
		return;
	}
	jQuery.ajax({
		url: '/ct-data/user/unBindEmail',
		type: 'POST',
		dataType: 'json',
		data: {
			"password": emPassword
		},
		success: function(data, textStatus, xhr) {
			//called when successful
			if (data.sign) {
				closelayer();
				userEmail = data.mail;
				$("#dianziyx").find("#email").val(data.mail);
				var emailHtmlTips = '<span class="no" onclick="emailCert();">激活</span>&nbsp;&nbsp;';
				emailHtmlTips += '<span class="no" onclick="openEmailPage()">修改</span>';
				emailHtmlTips += '<div class="hdtips">';
				emailHtmlTips += '<i class="bd-rmb"></i>';
				emailHtmlTips += '<div class="ts">';
				emailHtmlTips += '<h6>绑定邮箱</h6>';
				emailHtmlTips += '<p>成功绑定邮箱验证后您将享受登入密码找回，更换密码保护等安全服务。<br/><em class="dred">此外，您将获得2元任务奖励。</em></p>';
				emailHtmlTips += '</div>';
				emailHtmlTips += '</div>';
				$("#isEmail").find(".bdan").html(emailHtmlTips);
				$("#isEmail").find('div').eq(0).removeClass('ykt').addClass('wkt');
				popTips(data.message, "succeed");
			} else {
				popTips(data.message, "error");
			}
		},
		error: function(xhr, textStatus, errorThrown) {
			//called when there is an error
			popTips("系统出现错误，请联系管理员", "error");
		}
	});
};
//邮箱激活
var emailCert = function() {
	var url = window.location.protocol + '//'+location.host+'/view/gmail.html';
	jQuery.ajax({
		type: "post",
		url: "/ct-data/user/emailCert",
		data: {
			"url": url
		},
		datatype: "json",
		success: function(data, textStatus, xhr) {
			if (data.sign) {
				userSecurityLevel();
				popTips(data.message, "succeed");
			} else {
				popTips(data.message, "error");
			}
		},
		error: function(xhr, textStatus, errorThrown) {
			//called when there is an error
			popTips("系统出现错误，请联系管理员", "error");
		}
	});
};

var updateNickName = function(e) {
	var nickName = $("#xiugnc .inp-sty-1").val();
	if(!nickName) {
		popTips("请输入昵称！", "waring");
		return;
	}
	if(nickName == user.loginname) {
		popTips("昵称不能与用户名相同！", "waring");
		return;
	}
	if(nickName.replace(/[^\x00-\xff]/g,"01").length > 10) {
		popTips("5个中文字符或10个英文字符以内！", "waring");
		return;
	}
	
	$(e.target).removeAttr("onclick");
	
	$.ajax({
		type: "post",
		url: "/ct-data/user/updateNickName",
		data: {
			"nickName": nickName
		},
		datatype: "json",
		success: function(data) {
			if (data.sign) {
				closelayer();
				popTips(data.message, "succeed");
			} else {
				popTips(data.message, "error");
			}
		},
		error: function(xhr, textStatus, errorThrown) {
			//called when there is an error
			popTips("系统出现错误，请联系管理员", "error");
		},
		complete: function() {
			$(e.target).attr("onclick", "updateNickName(event);");
		}
	});
}

// 打开公告
var openAnnouncement = function(annoId) {
	window.location.href = "http://www.yugj881.com/resources/about/announcement.html?" + annoId;
};

/**
 * 能否绑定安全信息
 * @param code	trapswd\phone\ga\bank\email\question
 * @returns {Boolean}
 */
function canBeBind(code) {
	if(bindOrder[code].length < 1) {
		popTips("获取安全信息失败，请刷新页面再次获取", "waring");
		return false;
	}
	if(eval(bindOrder[code].order) > 1) {
		for(var order in bindOrder) {
			if(order == code) {
				continue;
			}
			if(bindOrder[order].order == "0") {
				continue;
			}
			if(eval(bindOrder[code].order) > eval(bindOrder[order].order)) {
				if(order == "bank") {
					if(haveBank == false) {
						popTips("请先添加银行卡", "waring", "", function(){
							addUserBank();
						});
						return false;
					}
				}
				if(bindOrder[order].isBind == false) {
					if(order == "phone") {
						popTips("请先绑定手机", "waring");
						return false;
					} else if(order == "email") {
						popTips("请先绑定邮箱", "waring");
						return false;
					} else if(order == "ga") {
						popTips("请先绑定 Google验证", "waring", "", function(){
							openGoogle();
						});
						return false;
					} else if(order == "question") {
						popTips("请先绑定密码保护", "waring", "", function(){
							openQuestion();
						});
						return false;
					} else if(order == "trapswd") {
						popTips("请先设置资金密码", "waring", "", function(){
							openTradPwdPage();
						});
						return false;
					}
				}
			}
		}
	}
	return true;
}

// 开启异地登录检查
function opendiffplacecheck() {
    $.ajax({
        url: '/ct-data/user/getDifferentPlaceCheckSwitch',
        type: 'POST',
        dataType: 'json',
        success: function (data, textStatus, xhr) {
            if (data.sign) {
                closelayer();
                var sysSwitch = data.sysSwitch;
                var gaSwitch = data.gaSwitch;
                var userNameSwitch = data.userNameSwitch;
                if (sysSwitch) {
                    $(".xiugainc").show();
                    $('#diffchkopenoption').attr('disabled', false);
                    if (gaSwitch) {
                        $('#gaswitch').html('已开启');
                        if (userNameSwitch) {
                            $('#banknameswitch').html('已开启');
                            $('#diffchkopenoption option[value = "all"]').attr("selected", true);
                        } else {
                            $('#diffchkopenoption option[value = "ga"]').attr("selected", true);
                            $('#banknameswitch').html('已关闭');
                        }
                    } else {
                        $('#gaswitch').html('已关闭');
                        if (userNameSwitch) {
                            $('#banknameswitch').html('已开启');
                            $('#diffchkopenoption option[value = "userName"]').attr("selected", true);
                        } else {
                            $('#banknameswitch').html('已关闭');
                            $('#diffchkopenoption option[value = "none"]').attr("selected", true);
                        }
                    }
                    // if (userNameSwitch) {
                    //     $('#banknameswitch').html('已开启');
                    // } else {
                    //     $('#banknameswitch').html('已关闭');
                    // }
                } else {
                    $('#gaswitch').html('已关闭');
                    $('#banknameswitch').html('已关闭');
                    $('#diffchkopenoption').attr('disabled', 'disabled');
                }
            } else {
                popTips(data.message, "error");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
//          popTips("系统出现错误，请联系管理员", "error");
        }
    });
}

// 修改异地登录检查
function updatediffplacecheck() {
    var value = $('#diffchkopenoption').val();
    if(!value) {
        popTips('请选择相关操作', 'error');
        return;
    }
    var data = {'value': value}
    $.ajax({
        url: '/ct-data/user/saveDifferentPlaceCheckSwitch',
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function (data, textStatus, xhr) {
            if (data.sign) {
                closelayer();
                opendiffplacecheck();
                popTips(data.message, "succeed");
            } else {
                popTips(data.message, "error");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            popTips("系统出现错误，请联系管理员", "error");
        }
    });
}