// 用户已开通账户
var allPlatform = {};
allPlatform.cpzh = "主账户";
// 所有账户
var allOpenPlatform = {};
allOpenPlatform.cpzh = "主账户";

var outPlatformCode = 'cpzh';
var transfersToCode = '';

// 提款页面网银充值是否仅有支付宝充值
var onlyAlipay = false;
//拆分手续费权限标识
var splitMoneySwitch=false;
var curBankCode;
/**
 * 获取已开通平台
 */
function openPlatformList() {
    $.ajax({
        url: '/ct-data/baccarat/platformList',
        type: 'POST',
        dataType: 'json',
        data: {"isHaveMoney": false},
        success: function (data, textStatus, xhr) {
            if (data.sign) {
                $.each(data.list, function (index, val) {
                    if (val.isOpen) {
                        allOpenPlatform[val.code] = val.value;
                    }
                    allPlatform[val.code] = val.value;
                });
            }
            // 初始化转账账户选择
            initTransfePlatformList();
        },
        error: function (xhr, textStatus, errorThrown) {
        }
    });
}
function initTransfePlatformList() {
    var outHtml = '';
    $.each(allOpenPlatform, function (k, v) {
        if (k == outPlatformCode) {
            outHtml = '<option value="' + k + '">' + v + '</option>' + outHtml;
        } else {
            outHtml += '<option value="' + k + '">' + v + '</option>';
        }
    });

    $("#Eslct0 select").html(outHtml);
    transfePlatformOutChange();
    transfePlatformInChange();
}
// 当前转出账户选项改变时触发
function transfePlatformOutChange() {
    var transfersFromCode = $("#Eslct0 select").val();
    outPlatformCode = transfersFromCode;

    var inHtml = '';
    $.each(allOpenPlatform, function (k, v) {
        if (k != transfersFromCode) {
            if (k == transfersToCode) {
                inHtml = '<option value="' + k + '">' + v + '</option>' + inHtml;
            } else {
                inHtml += '<option value="' + k + '">' + v + '</option>';
            }
        }
    });
    $("#Eslct1 select").html(inHtml);
}
//当前转入账户选项改变时触发
function transfePlatformInChange() {
    transfersToCode = $("#Eslct1 select").val();

    var outHtml = '';
    $.each(allOpenPlatform, function (k, v) {
        if (k != transfersToCode) {
            if (k == outPlatformCode) {
                outHtml = '<option value="' + k + '">' + v + '</option>' + outHtml;
            } else {
                outHtml += '<option value="' + k + '">' + v + '</option>';
            }
        }
    });

    $("#Eslct0 select").html(outHtml);
}


$(function () {
    userSecurityLevel();

    isUserWithdrawLimit();
    //获取百家乐平台和用户是否开通信息
    platformList(true);
    // 获取账户总额
    initTotalBalance();
//  getHasDivend();
    var searchStr = window.location.search;
//  outPlatformCode = getQueryString(searchStr.substr(1), "outCode");
    if (!outPlatformCode) {
        outPlatformCode = 'cpzh';
    }

//  var financeCode = getQueryString(searchStr.substr(1), "financeCode");
    /*if (!financeCode) {
        financeCode = 'cunk';
    }*/

    // 查询已开通平台
    openPlatformList();

    // 选中子菜单
//  $(".mem-fina-cen-bot ul.m-f-c-nav li").each(function () {
//      if ($(this).attr("code") == financeCode) {
//          $(this).addClass("cur");
//          return false;
//      }
//  });
//  init(financeCode);



});

function haveUserBank() {
    var haveBank = false;
    $.ajax({
        url: '/ct-data/userBank/userBankList',
        type: 'POST',
        dataType: 'json',
        async: false,
        success: function (data, textStatus, xhr) {
            $("#noBankTipsPage").text("");
            if (data.sign) {
                $.each(data.data, function (index, val) {
                    if (val.state == 1) {
                        haveBank = true;
                        return false;
                    }
                });

                if (data.data.length < 1) {
                    $("#noBankTipsPage").text("请先绑定银行卡！");
                }
                if (!haveBank && data.data.length > 0) {
                    $("#noBankTipsPage").text("银行卡不可用！");
                }
            } else {
                $("#noBankTipsPage").text(data.message);
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $("#noBankTipsPage").text("获取银行卡信息失败！");
        },
        complete: function (XMLHttpRequest, status) {
            if (status == 'timeout') {//超时,status还有success,error等值的情况
                $("#noBankTipsPage").text("获取银行卡信息超时！");
            }
        }
    });

    return haveBank;
}

/**
 * 提款页面网银充值仅有支付宝时处理
 */
function changWordForAlipay(isAlipay) {
    var cunkPageDiv = $("#cunkPage");
    if(isAlipay === true) {
        cunkPageDiv.find(".c-bz-nav li:first").text("1、填写金额");
        cunkPageDiv.find(".c-bz-nav li:last").text("3、登录支付宝进行转账");
        // cunkPageDiv.find("table tr:first").hide();
        // cunkPageDiv.find("table tr:last th:first").text("支付宝账号：");
        cunkPageDiv.find(".zysx p:eq(2)").hide();
        cunkPageDiv.find(".zysx p:last").text("3.平台收款卡“不定时”更换，请每次转账前在本页面查看银行账号。如充值过期卡号，损失由客户自行承担");
        cunkPageDiv.find(".but-dlwy").text("登录支付宝");
    } else {
        cunkPageDiv.find(".c-bz-nav li:first").text("1、选择银行并填写金额");
        cunkPageDiv.find(".c-bz-nav li:last").text("3、登录银行进行转账");
        // cunkPageDiv.find("table tr:first").show();
        // cunkPageDiv.find("table tr:last th:first").text("银行卡号：");
        cunkPageDiv.find(".zysx p:eq(2)").show();
        cunkPageDiv.find(".zysx p:last").text("4.平台收款卡“不定时”更换，请每次转账前在本页面查看银行账号。如充值过期卡号，损失由客户自行承担。");
        cunkPageDiv.find(".but-dlwy").text("登录网银");
    }
}

/**
 * 锚点跳转到本页面并刷新
 */
function transferThenReload(financeCode) {
    window.location.href = currentRootDirectory + '/view/memberHome/memberFinance.html?financeCode=' + financeCode;
}
// var isUserWithdrawLimit_STATUS = false;
//验证是否可以提款
var isUserWithdrawLimit = function () {
    jQuery.ajax({
        url: '/ct-data/userAccount/isUserWithdrawLimit',
        type: 'POST',
        dataType: 'json',
        success: function (data, textStatus, xhr) {
            if (data.sign) {
                way.set('users.account.withdraw', way.get('useraccount.balance')?way.get('useraccount.balance'):$("#session_balance").text());
                $("#quk_explain_balance").val(way.get('useraccount.balance'));
                // $('#quk_explain_dividend').text(way.get("useraccount.dividend"));
            } else {
                // isUserWithdrawLimit_STATUS = true;
                way.set('users.account.withdraw', '0');
                $("#quk_explain_balance").val("0");
                // $('#quk_explain_dividend').text('0');
            }
        },
        error: function (xhr, textStatus, errorThrown) {
        }
    });
};

// 切换操作：充值、提款等
var initIndex;

function init(actionCode) {
    clearTimeout(initIndex);
//  if (!user) {
//      initIndex = setTimeout(function () {
//          init(actionCode);
//      }, 100);
//      return;
//  }
    var action = FinanceAction[actionCode];

    if(actionCode!=""){
        $(".zhgk").removeClass("cur");
        $(".mem-fina-cen-top").hide();
        $("#financeChildPage").show();
    }
    if(actionCode != 'cunk'){
        $("#cunkPage").hide();
    }
    if(actionCode != 'quk'){
        $("#qukPage").hide();
    }
    if(actionCode != 'ckjl'){
        $("#ckjlPage").hide();
        $("#noBankTipsPage").hide();
    }
    if(actionCode != 'qkjl'){
        $("#qkjlPage").hide();
        $("#noBankTipsPage").hide();
    }
    if(actionCode != 'zzjl'){
        $("#zzjlPage").hide();
        $("#noBankTipsPage").hide();
    }
    if (actionCode == 'cunk' || actionCode == "quk") {
        if (bindOrder["trapswd"] == undefined || bindOrder["trapswd"] == null) {
            $("#noBankTipsPage").html("获取安全信息失败，请刷新页面再次获取！");
            $("#noBankTipsPage").show();
            return false;
        }
        if (actionCode == "cunk") {
            if (bindOrder["trapswd"].recharge == "true" && bindOrder["trapswd"].isBind != true) {
                $("#noBankTipsPage").html('请先设置资金密码！前往<a href="http://www.yugj881.com/resources/main/memberAccount.html?liCode=3" class="dred">我的账户</a>设置');
                $("#noBankTipsPage").show();
                return false;
            }
            if (bindOrder["phone"].recharge == "true" && bindOrder["phone"].isBind != true) {
                $("#noBankTipsPage").html('请先绑定手机！前往<a href="http://www.yugj881.com/resources/main/memberAccount.html" class="dred">我的账户</a>绑定');
                $("#noBankTipsPage").show();
                return false;
            }
            if (bindOrder["ga"].recharge == "true" && bindOrder["ga"].isBind != true) {
                $("#noBankTipsPage").html('请先绑定谷歌验证！前往<a href="http://www.yugj881.com/resources/main/memberAccount.html?liCode=5" class="dred">我的账户</a>绑定');
                $("#noBankTipsPage").show();
                return false;
            }
            if (bindOrder["bank"].recharge == "true" && !haveUserBank()) {
                $("#noBankTipsPage").html('请先添加银行卡！前往<a href="http://www.yugj881.com/resources/main/memberAccount.html?liCode=1" class="dred">我的账户</a>添加');
                $("#noBankTipsPage").show();
                return false;
            }
            if (bindOrder["email"].recharge == "true" && bindOrder["email"].isBind != true) {
                $("#noBankTipsPage").html('请先绑定邮箱！前往<a href="http://www.yugj881.com/resources/main/memberAccount.html" class="dred">我的账户</a>绑定');
                $("#noBankTipsPage").show();
                return false;
            }
            if (bindOrder["question"].recharge == "true" && bindOrder["question"].isBind != true) {
                $("#noBankTipsPage").html('请先绑定密保问题！前往<a href="http://www.yugj881.com/resources/main/memberAccount.html?liCode=4" class="dred">我的账户</a>绑定');
                $("#noBankTipsPage").show();
                return false;
            }
        }
        if (actionCode == "quk") {
            if (isWithdrawFreeze() == false) {
                $("#noBankTipsPage").show();
                return false;
            }
            if (bindOrder["trapswd"].withdraw == "true" && bindOrder["trapswd"].isBind != true) {
                $("#noBankTipsPage").html('请先设置资金密码！前往<a href="http://www.yugj881.com/resources/main/memberAccount.html?liCode=3" class="dred">我的账户</a>设置');
                $("#noBankTipsPage").show();
                return false;
            }
            if (bindOrder["phone"].withdraw == "true" && bindOrder["phone"].isBind != true) {
                $("#noBankTipsPage").html('请先绑定手机！前往<a href="http://www.yugj881.com/resources/main/memberAccount.html" class="dred">我的账户</a>绑定');
                $("#noBankTipsPage").show();
                return false;
            }
            if (bindOrder["ga"].withdraw == "true" && bindOrder["ga"].isBind != true) {
                $("#noBankTipsPage").html('请先绑定谷歌验证！前往<a href="http://www.yugj881.com/resources/main/memberAccount.html?liCode=5" class="dred">我的账户</a>绑定');
                $("#noBankTipsPage").show();
                return false;
            }
            if (bindOrder["bank"].withdraw == "true" && !haveUserBank()) {
                $("#noBankTipsPage").html('请先添加银行卡！前往<a href="http://www.yugj881.com/resources/main/memberAccount.html?liCode=1" class="dred">我的账户</a>添加');
                $("#noBankTipsPage").show();
                return false;
            }
            if (bindOrder["email"].withdraw == "true" && bindOrder["email"].isBind != true) {
                $("#noBankTipsPage").html('请先绑定邮箱！前往<a href="http://www.yugj881.com/resources/main/memberAccount.html" class="dred">我的账户</a>绑定');
                $("#noBankTipsPage").show();
                return false;
            }
            if (bindOrder["question"].withdraw == "true" && bindOrder["question"].isBind != true) {
                $("#noBankTipsPage").html('请先绑定密保问题！前往<a href="http://www.yugj881.com/resources/main/memberAccount.html?liCode=4" class="dred">我的账户</a>绑定');
                $("#noBankTipsPage").show();
                return false;
            }
        }
    }

    if ($("#" + actionCode + "Page").html()) {
        if (actionCode == 'quk') {
            if (!isShowDividend) {
                $("#qukPage").html($("#qukPage").html().replace('<input class="inradio" type="radio" id="fhzh" name="sport" value="fhzh">&nbsp;<label  for="fhzh">分红账户</label>', ''));
            }
        }
        switch(actionCode) {
            case 'cunk':
                action.thirdPartyPaymentList();
                $("#cunkPage").show();
                break;
            case 'quk':
                $("#qukPage").show();
                action.getUserWithdrawLimit();
                action.getUserBankCardList();
                $('#qukPage .agenRadio .inradio').eq(0).click();
                //console.log("ddd");  //  bug 7451  搜狗浏览模式自动切换视图状态临时处理办法
                break;
            case 'ckjl':
                action.rechargeList();
                $("#ckjlPage").show();
                break;
            case 'qkjl':
                action.withdrawList();
                $("#qkjlPage").show();
                break;
            case 'zzjl':
                action.setTransferAccount();
                action.transferList();
                $("#zzjlPage").show();
                break;
            default :
                break;
        }
    } else {
        var html = "";
        if (actionCode == 'quk') {
            if (!isShowDividend) {
                html = action.pageHtml.replace('<input class="inradio" type="radio" id="fhzh" name="sport" value="fhzh">&nbsp;<label  for="fhzh">分红账户</label>', '');
            } else {
                html = action.pageHtml;
                $("#financeChildPage").children().eq(0).nextAll().hide();
            }
        } else if (actionCode != '') {
            html = action.pageHtml;
        }
        $("#financeChildPage").append(html);
        if (actionCode == "cunk") {
            copyData("copySpan0");
            copyData("copySpan1");
            copyData("copySpan2");
            copyData("copySpan3");

            action.thirdPartyPaymentList();
        } else if (actionCode == "quk") {
            if (!isTradePassword) {
                $("#enterQukPasswordDiv").hide();
                $("#tradQukPasswordDiv").show();
            }

            if (!isGoogle) {
                $("#enterQukGooglePwdDiv").hide();
                $("#tradQukGooglePwdDiv").show();
            }

            // 提款账户选择
            $("#qukPage .agenRadio").on("click",'.inradio',function() {
                var radioId = $(this).attr('id');
                $('#qukPage .agenRadio label').removeClass();
                $('#qukPage .agenRadio label').each(function () {
                    if ($(this).attr("name") == radioId) {
                        $(this).attr('class', 'checked');
                    }
                });
                // $('#qukPage .agenRadio input').removeAttr('checked');
                // $('#qukPage .agenRadio #' + radioId).attr('checked', 'checked');

                if ($(this).attr("id") == "zzh") {
                    $(".primary_account").show();
                    $(".bonus_account").hide();
                    action.getUserWithdrawLimit();
                    $("#quk_explain_dividend").hide();
                    $("#quk_explain_balance").show();

                    $("#quk_zzh_select").hide();
                } else {
                    $(".primary_account").hide();
                    $(".bonus_account").show();
                    $("#quk_explain_balance").hide();
                    $("#quk_explain_dividend").show();

                    $("#quk_zzh_select").show();
                }
            });
            // 提款银行卡选择
            $("body").on("click","#qukPage .m-bdyhk dl dd", function() {
                //$("#qukPage .m-bdyhk dl").delegate("dd", "click", function() {
                if ($(this).attr("id") == "addNewBank") {
                    return;
                }

                $("#qukPage .m-bdyhk dl dd").removeClass("cur");
                $(this).addClass("cur");
            });

            // 密码验证方式
            // $("#quk_authType li").on("click", function() {
            //     $("#qukPage #quk_authType li").removeClass();
            //     $(this).addClass("cur");
            //
            //     if ($("#qukPage #quk_authType li").eq(0).hasClass("cur")) {
            //         $("#qukPage .tabBd .srmm").eq(1).hide();
            //         $("#qukPage .tabBd .srmm").eq(0).show();
            //     } else {
            //         $("#qukPage .tabBd .srmm").eq(0).hide();
            //         $("#qukPage .tabBd .srmm").eq(1).show();
            //     }
            // });
            action.getUserWithdrawLimit();
            action.getUserBankCardList();
        } else if (actionCode == "ckjl") {
            $("#ckjl_search_startTime").val(laydate.now());
            $("#ckjl_search_endTime").val(laydate.now(1));
            action.rechargeList();
        } else if (actionCode == "qkjl") {
            $("#qkjl_search_startTime").val(laydate.now());
            $("#qkjl_search_endTime").val(laydate.now(1));
            action.withdrawList();
        } else if (actionCode == "zzjl") {
            $("#zzjl_search_startTime").val(laydate.now());
            $("#zzjl_search_endTime").val(laydate.now(1));
            action.setTransferAccount();
            action.transferList();
        }
    }
  /*  $("#financeChildPage>div").hide();
    $("#"+actionCode+"Page").show();*/
}

function changeTransferPlatform(outCode) {
    if (outCode != $("#Eslct0 select").val()) {
        outPlatformCode = outCode;
        initTransfePlatformList();
    }
}

/**
 * 复制
 * @param buttonId
 */
function copyData(buttonId) {
    var clip = new ZeroClipboard(document.getElementById(buttonId));
    clip.on("aftercopy", function (e) {
        popTips("复制成功", "succeed");
    });
    /*clip.on("error", function(e) {
     var message = "复制失败！";
     if(e.name === "flash-disabled") {
     message += "Flash被禁用或未安装！";
     } else if(e.name === "flash-outdated") {
     message += "Flash版本过低！";
     } else if(e.name === "flash-unavailable") {
     message += "无法与JS交互！";
     } else if(e.name === "flash-deactivated") {
     message += "Flash未激活！";
     } else if(e.name === "flash-overdue") {
     message += "加载Flash SWF超时！";
     }
     popTips(message, "error");
     });*/
}

/**
 * 转账
 */
function transfersMoney() {
    var transfersFrom = $("#Eslct0 select").val();
    var transfersTo = $("#Eslct1 select").val();

    if (!transfersFrom) {
        popTips("请选择转出账户", "waring");
        return;
    }

    if (!transfersTo) {
        popTips("请选择转入账户", "waring");
        return;
    }

    if (transfersFrom == transfersTo) {
        popTips("请选择不同的账户", "waring");
        return;
    }

    var money = $("#transfersMoney").val();
    if (!money) {
        popTips("请输入转账金额", "waring");
        return;
    }

    $('.me-zhuangz a').removeAttr('onclick');

    $.ajax({
        url: '/ct-data/userAccount/transfer',
        type: 'POST',
        dataType: 'json',
        data: {
            "incomeCode": transfersTo,
            "outCode": transfersFrom,
            "money": money
        },
        success: function (data, textStatus, xhr) {
            $('.me-zhuangz a').attr('onclick', "transfersMoney();");
            if (data.sign) {
                dsFlushBalance();
                isUserWithdrawLimit();
                platformList(true);
                popTips(data.message, "succeed");
            } else {
                popTips(data.message, "error");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $('.me-zhuangz a').attr('onclick', "transfersMoney();");
            popTips("转账失败", "error");
        }
    });
}

/**
 获取用户银行账户是否绑定
 获取密码保护问题是否绑定
 获取google认证是否绑定
 */
var isBankUserName = false;
var isTradePassword = false;
var isGoogle = false;
var bindOrder = [];
function userSecurityLevel() {
    $.ajax({
        url: '/ct-data/user/userSecurityLevel',
        type: 'POST',
        dataType: 'json',
        async: false,
        success: function (data, textStatus, xhr) {
            if (data.sign) {
                bindOrder["trapswd"] = {"recharge": data.rechargeTradpswd, "withdraw": data.withdrawTradpswd, "isBind": data.isTradePassword};
                bindOrder["phone"] = {"recharge": data.rechargePhone, "withdraw": data.withdrawPhone, "isBind": data.isPhoneCert};
                bindOrder["ga"] = {"recharge": data.rechargeGa, "withdraw": data.withdrawGa, "isBind": data.isGoogle};
                bindOrder["bank"] = {"recharge": data.rechargeBank, "withdraw": data.withdrawBank};
                bindOrder["email"] = {"recharge": data.rechargeEmail, "withdraw": data.withdrawEmail, "isBind": data.isEmailCert};
                bindOrder["question"] = {"recharge": data.rechargeQuestion, "withdraw": data.withdrawQuestion, "isBind": data.isQuestion};

                if (data.isBankUserName) {
                    isBankUserName = true;
                    $("#userBankName").text(data.bankUserName);
                }
                if (data.isGoogle) {
                    isGoogle = true;
                }
                if (data.isTradePassword) {
                    isTradePassword = true;
                }
            } else {
                popTips(data.message, "error");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
        }
    });
}

function addUserBank() {
    if (isBankUserName) {
        bankCardList();
        pop('addyinh');
    } else {
        popTips("请先绑定银行账户姓名！！", "waring");
    }
}
//获取系统银行卡列表
function bankCardList() {
    var sysBankCard = $("#sysBankCard");
    sysBankCard.empty();
	sysBankCard.append('<option value="">请选择</option>');
    $.ajax({
        type: "post",
        url: "/ct-data/bank/getBankTypeList",
        datatype: "json",
        async: false,
        success: function (msg) {
            if (msg.sign === true) {
                $.each(msg.list, function (idx, val) {
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
}

//保存银行卡
function saveUserBankCard() {
    var bankCode = $("#sysBankCard").val().trim();
    var bankCardNumber = $("#bankCardNum").val().trim();
    var regbankCardNumber = $("#regBankCardNum").val().trim();
    var province = $("#province").val().trim();
    var city = $("#city").val().trim();
    var bankTradPwd = $("#bankTradPwd").val().trim();
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
        bankAddress = province + "-" + city;
        $.ajax({
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
                    FinanceAction.quk.getUserBankCardList();
                    closelayer();
                    $("#province").val("");
                    $("#city").val("");
                    $("#bankCardNum").val("");
                    $("#regBankCardNum").val("");
                    $("#bankTradPwd").val("");
                    $("#bankBranch").val("");
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
}

//修改资金密码
function openTradPwdPage() {
    $("#oldPwd").val("");
    $("#newPwd").val("");
    $("#rePwd").val("");
    if (isTradePassword) {
        $("#xiugaizjmm").find('.validate-form').find('dd').eq(0).show();
    } else {
        $("#xiugaizjmm").find('.validate-form').find('dd').eq(0).hide();
    }
    $("#xiugaizjmm").find('.aar-title').find("span").text('修改资金密码');
    $("#xiugaizjmm").find('.dred').text('密码由6至16个字符组成');
    $("#xiugaizjmm").find('.aar-but a').attr("onclick", "editTradPwd()");
    pop('xiugaizjmm');
}

function editTradPwd() {
    var oldPwd = $("#oldPwd").val().trim();
    var newPwd = $("#newPwd").val().trim();
    var rePwd = $("#rePwd").val().trim();
    if (isTradePassword) {
        if (oldPwd.length < 6 || oldPwd.length > 20) {
            $("#xiugaizjmm").find('.dred').text('旧密码格式不正确(由6至16个字符组成)');
            return;
        }
    }
    if (newPwd.length < 6 || newPwd.length > 20) {
        $("#xiugaizjmm").find('.dred').text('新密码格式不正确(由6至16个字符组成)');
        return;
    }
    if (rePwd.length < 6 || rePwd.length > 20) {
        $("#xiugaizjmm").find('.dred').text('确认密码格式不正确(由6至16个字符组成)');
        return;
    }
    if (newPwd != rePwd) {
        $("#xiugaizjmm").find('.dred').text('新密码与确认密码不一致');
        return;
    }
    $.ajax({
        url: '/ct-data/user/updateTradePassword',
        type: 'POST',
        dataType: 'json',
        data: {
            oldPwd: oldPwd,
            newPwd: newPwd,
            rePwd: rePwd
        },
        success: function (data, textStatus, xhr) {
            if (data.sign) {
                closelayer();
                isTradePassword = true;
                popTips(data.message, "succeed");
                $("#tradQukPasswordDiv").hide();
                $("#enterQukPasswordDiv").show();
            } else {
                popTips(data.message, "error");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            //called when there is an error
            popTips("系统出现错误，请联系管理员", "error");
        }
    });
}

var gaKey = "";

function openGoogle() {
    $('#gaPassword').val("");
    $('#gatrPassword').val("");

    $("#googleyz").find(".ym-gl").children('li').eq(1).show();
    $.ajax({
        url: '/ct-data/user/getGAKey',
        type: 'POST',
        dataType: 'json',
        success: function (data, textStatus, xhr) {
            gaKey = data.gaKey;
            $("#googleyz").find(".erweima").find("img").attr("src", "/ct-data/user/generateGaImage?gaKey=" + gaKey);
        }
    });

    pop('googleyz');
};
//绑定google认证
function bindGoogle() {
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
    $.ajax({
        url: '/ct-data/user/bindGa',
        type: 'POST',
        dataType: 'json',
        data: {
            "gaKey": gaKey.trim(),
            "gaCode": gaCode.trim(),
            "password": loCode.trim()
        },
        success: function (data, textStatus, xhr) {
            //called when successful
            if (data.sign) {
                closelayer();
                isGoogle = true;
                popTips(data.message, "succeed");
                $("#tradQukGooglePwdDiv").hide();
                $("#enterQukGooglePwdDiv").show();
            } else {
                popTips(data.message, "error");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            //called when there is an error
            popTips("系统出现错误，请联系管理员", "error");
        }
    });
}

/**
 * 是否限制提款
 * @returns {Boolean}
 */
function isWithdrawFreeze() {
    var isWithdraw = false;
    $.ajax({
        type: "post",
        url: "/ct-data/userAccount/isWithdrawFreeze",
        datatype: "json",
        async: false,
        success: function (msg) {
            if (msg.sign === false) {
                $("#noBankTipsPage").text(msg.message);
            } else {
                isWithdraw = true;
            }
        },
        error: function () {
            $("#noBankTipsPage").text("获取提款信息失败！");
        }
    });
    return isWithdraw;
}
var thirdParty = [];
var payTypeIndex = 0;
/**
 * 账务中心，子页初始化
 */
var FinanceAction = {
    "cunk": {
        showName: "充值",
        pageCode: "cunk",
        rechargeInfo : "",
        pageHtml: '<div class="m-cun-tab c-tab-one tab mar-lr20" id="cunkPage">' +
        '<div class="m-c-hd  recharge-type"><h6>充值类型：</h6>' +
        '<ul class="tabHd"></ul>' +
        '</div>' +
        '<div class="m-c-hd third-platform"></div><!--  第三方充值渠道 -->' +
        '<input type="hidden" id="bankId" />' +
        '<input type="hidden" id="bankCode" />' +
        '<input type="hidden" id="rechargeType" />' +
        '<input type="hidden" id="feeScale" />' +
        '<input type="hidden" id="minFee" />' +
        '<div class="m-c-bd tabBd"><!-- 在线充值 -->' +
        '<div class="tb-imte" style="display:block;">' +
        '<div class="c-buzou tab">' +
        '<ul class="c-bz-nav">' +
        '<li class="cur">1、选择银行并填写金额</li><li>2、确定充值信息</li><li>3、登录银行进行转账</li>' +
        '</ul><!-- 第一步 -->' +
        '<div class="c-bz-c-one">' +
        '<div class="c-t-hzyh"><h6>合作银行：</h6><ul></ul></div>' +
        '<div class="c-t-czje"><h6>充值金额：</h6><div>' +
        '<input type="text" way-data="recharge.amount" placeholder="请输入充值金额" onkeyup="replaceAndSetPos(this,event,/[^\\d|^\\.]/,\'\');">' +
        '<span>元&nbsp;&nbsp;（充值金额必须在<span id="depositLimit"></span>元之间）</span>' +
        '</div></div>' +
        '<div class="c-t-czje c-t-czk" style="display: none">' +
        '<h6>充值卡号：</h6>' +
        '<div>' +
        '<input type="text" way-data="recharge.cardNum" placeholder="请输入卡号">' +
        '</div></div>' +
        '<div class="c-t-czje c-t-czk" style="display: none">' +
        '<h6>充值卡密：</h6>' +
        '<div>' +
        '<input type="text" way-data="recharge.cardPass" placeholder="请输入卡密">' +
        '</div></div>' +
        '<a class="but-xyb" href="javascript:;" onclick="FinanceAction.cunk.recharge(event);">下一步</a>' +
        '</div>' +
        '<!-- 在线充值 第二步 -->' +
        '<div class="c-bz-c-tow" style="display:none;">' +
        '<div class="c-b-tow-cen">' +
        '<ul class="mar-lr20">' +
        '<li>尊敬的客户您好，您的充值订单已经生成，请您在该页面继续完成充值。</li>' +
        '<li><h6>充值金额：</h6>' +
        '<span><em class="dred" way-data="bill.amount"></em>元</span></li>' +
        '<li><h6>订单编号：</h6><span way-data="bill.billNo"></span></li>' +
        '</ul>' +
        '</div>' +
        '<div><a class="but-dlwy" href="javascript:;">登录网银</a>' +
        '<a class="but-czjl" href="javascript:;" onclick="transferThenReload(\'ckjl\');">查看充值记录</a></div>' +
        '</div>' +
        '<!-- 网银充值 第二步 -->' +
        '<div class="c-bz-c-tow" style="display:none;">' +
        '<div class="c-b-tow-cen">' +
        '<ul class="mar-lr20">' +
        '<li>尊敬的客户您好，请根据以下信息进一步完成您的充值（如：以充值成功，请点击下方确认完成充值）</li>' +
        '<li>' +
        '<h6>充值银行：</h6>' +
        '<span class="tp"><img src="" height="24" width="128" alt=""></span>' +
        '</li>' +
        '</ul>' +
        '<table class="mar-lr20">' +
        '<tbody>' +
        '<tr>' +
        '<th>存入银行：</th>' +
        '<td way-data="onlineRecharge.shortName"></td>' +
        '<th></th>' +
        '<td></td>' +
        '</tr>' +
        '<tr>' +
        '<th>真实姓名：</th>' +
        '<td><span id="sp_bankUserName"></span><a class="dred" href="javascript:;" id="copySpan0" data-clipboard-target="sp_bankUserName">复制</a></td>' +
        '<th>存入金额：</th>' +
        '<td><span id="sp_recharge_money"></span><a class="dred" href="javascript:;" id="copySpan1" data-clipboard-target="sp_recharge_money">复制</a></td>' +
        '</tr>' +
        '<tr>' +
        '<th>银行卡号：</th>' +
        '<td><span id="sp_bankCardNumber"></span><a class="dred" href="javascript:;" id="copySpan2" data-clipboard-target="sp_bankCardNumber">复制</a></td>' +
        '<th>附言：</th>' +
        '<td><span id="sp_postscript"></span><a class="dred" href="javascript:;" id="copySpan3" data-clipboard-target="sp_postscript">复制</a></td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '<div class="zysx mar-lr20">' +
        '<span>充值注意事项：</span>' +
        '<p>1.您的“附言”是您唯一入账的凭证，不能泄露给任何人，包括您的上级代理。防止用您的“附言”为自己充值，切勿泄露，否则损失客户自行承担。</p>' +
        '<p>2.转账成功后，切记把“附言”复制到充值页面进行提交，否则充值无法自动到账。</p>' +
        '<p>3.充值平台只支持“网银同行汇款”，不支持任何“跨行转账”“ATM机转账”“手机银行”等，此类充值一律不给到账处理。</p>' +
        '<p>4.平台收款卡“不定时”更换，请每次转账前在本页面查看银行账号。如充值过期卡号，损失由客户自行承担。</p>' +
        '</div>' +
        '</div>' +
        '<div><a class="but-dlwy" href="javascript:;" target="_blank">登录网银</a>' +
        '<a class="but-czjl" href="javascript:;" onclick="transferThenReload(\'ckjl\');">查看充值记录</a></div>' +
        '</div>' +
        '</div></div></div></div>',
        thirdPartyPaymentList: function () {
            var cunkPage = $("#cunkPage");
            cunkPage.find("div.recharge-type ul.tabHd").empty();
            cunkPage.find("div.third-platform").html('<h6>第三方平台：</h6>');
            $.ajax({
                type: "post",
                url: "/ct-data/userAccount/rechargeMethodList",
                datatype: "json",
                success: function(msg) {
                    if (msg.sign === true && !msg.isRechargeMaintain) {
                        var html = '',thirdHtml = '',thirdName;
                        $.each(msg.methodList, function(idx, val) {
                            html += '<li><i></i>' + val.name + "</li>";
                            if(val.thirdList){
                                val.type = "third";
                                thirdHtml = '<ul>'
                                $.each(val.thirdList, function(index, value) {
                                    thirdName = value.titleName ? value.titleName : value.serviceName;
                                    thirdHtml += '<li id="'+value.id+'" serviceName="'+value.serviceName+'" code="'+value.type+'"><i></i>' + thirdName + '</li>';
                                });
                                thirdHtml += '</ul>';
                            } else{
                                val.type = "self";
                                thirdHtml = "<ul></ul>";
                            }
                            cunkPage.find("div.third-platform").append(thirdHtml);
                        });
                        thirdParty = msg.methodList;
                        cunkPage.find("div.recharge-type ul.tabHd").append(html);

                        // 第三方点击效果
                        $("#cunkPage .third-platform ul").delegate("li", "click", function() {
                            $(this).addClass("cur").siblings().removeClass("cur");
                            cunkPage.find("div.c-bz-c-tow").hide();
                            cunkPage.find("div.c-bz-c-one").show();

                            var id = $(this).attr("id");
                            var serviceName = $(this).attr("serviceName");
                            $("#bankCode").val($(this).attr("code"));
                            // 充值卡充值显示控制
                            if($(this).attr("code") == "Eypalcard"){
                                cunkPage.find("div.c-bz-c-one .c-t-czk").show();
                            } else{
                                cunkPage.find("div.c-bz-c-one .c-t-czk").hide();
                            }

                            var thirdPlaIndex = $(this).index();
                            FinanceAction.cunk.getBankCardList(payTypeIndex,thirdPlaIndex);
                        });
                    } else{
                        popTips(msg.message,"waring");
                    }
                },
                complete : function () {
                    cunkPage.find("div.recharge-type ul.tabHd li:first").trigger("click");
                    if(cunkPage.find("div.recharge-type ul.tabHd li").length == 1) {
                        FinanceAction.cunk.getBankCardList(0);
                    }
                }
            });
        },
        getThirdTypeList: function (thirdPartyId) {
            $("#cunkPage .c-t-hzyh").empty();
            $("#cunkPage .c-t-hzyh").html('<h6>合作银行：</h6><ul></ul>');
            var hzyh = $("#cunkPage .c-t-hzyh ul");

            $.ajax({
                type: "post",
                url: "/ct-data/bank/getThirdTypeList",
                datatype: "json",
                data: {"thirdPartyId": thirdPartyId},
                success: function (msg) {
                    if (msg.sign === true) {
                        var html = "";
                        $.each(msg.list, function(idx, val) {
                            html += '<li bankCode="' + val.bankCode + '" isDecimal="'+val.isDecimal+'">';
                            html += '<img src="../../resources/yiyou/images/member/hezyh/' + val.bankLogo + '" height="24" width="128" alt="' + val.bankName + '">';
                            html += '<i class="xz"></i></li>';
                        });
                        hzyh.html(html);
                        if (html.length > 0) {
                            hzyh.children().eq(0).addClass("cur");
                        }
                    }
                }
            });
        },
        getBankCardList: function (firstIndex,secondIndex) {
            $("#cunkPage .c-t-hzyh").empty();
            $("#cunkPage .c-t-hzyh").html('<h6>支付方式：</h6><ul></ul>');
            var thisPanel = $("#cunkPage .c-t-hzyh ul");
            thisPanel.empty();
            var html = "";
            if(typeof secondIndex != "undefined"){
                html = "";
                var selectedBack = thirdParty[firstIndex].thirdList[secondIndex];
                $("#bankId").val(selectedBack.id);
                $.each(selectedBack.list, function (idx, val) {
                    html += '<li bankCode="' + val.bankCode + '" isDecimal = "' + val.isDecimal + '">';
                    html += '<img min='+selectedBack.minMoney+' feeScale = '+ val.feeScale +' minFee = '+ val.minFee +' max='+selectedBack.maxMoney+' selectBankId='+selectedBack.id+'  src="../../resources/yiyou/images/member/hezyh/' + val.bankLogo + '" height="24" width="128" alt="' + val.bankName + '">';
                    html += '<i class="xz"></i></li>';
                });
                thisPanel.html(html);
            }else {
                html = "";
                var isAlipay = thirdParty[payTypeIndex].name.indexOf("支付宝") > -1; // 是否为支付宝转账
                if(isAlipay){
                    changWordForAlipay(true);
                } else{
                    changWordForAlipay();
                }
                $("#bankId").val(thirdParty[payTypeIndex].bankList[0].id);
                $.each(thirdParty[payTypeIndex].bankList, function (idx, val) {
                    html += '<li  bankCode="' + val.bankCode + '"   isDecimal = "' + val.isDecimal + '">';
                    if(isAlipay && (val.shortName == "工商银行" || val.shortName == "招商银行" || val.shortName == "民生银行")){
                        html += '<img min=' + val.minMoney + ' max=' + val.maxMoney + ' selectBankId='+val.id+' src="../../resources/yiyou/images/member/hezyh/' + val.images.split(".")[0] + "1.gif" + '" height="24" width="128" alt="' + val.shortName + '">';
                    }else {
                        html += '<img min=' + val.minMoney + ' max=' + val.maxMoney + ' selectBankId='+val.id+' src="../../resources/yiyou/images/member/hezyh/' + val.images + '" height="24" width="128" alt="' + val.shortName + '">';
                    }
                    html += '<i class="xz"></i></li>';
                });
                thisPanel.html(html);
            }
            $("#cunkPage div.c-t-hzyh ul li:first").trigger("click");
        },
        recharge: function (e) {
            var vMoney = way.get("recharge.amount");

            var rechargeListener = $(e.target);
            rechargeListener.attr("onclick", "");
            var depositLimit = $("#depositLimit").text().split("-");
            var mixMoney = parseFloat(depositLimit[0]);
            var maxMoney = parseFloat(depositLimit[1]);

            if (!vMoney || vMoney<mixMoney || vMoney>maxMoney) {
                popTips("充值金额必须在" + $("#depositLimit").text() + "元之间", "waring");
                rechargeListener.attr("onclick", "FinanceAction.cunk.recharge(event);");
                return;
            }
            // 网银充值除外 --- 充值金额不可为整数，不可为.00，必须携带有值的小数
            var isDecimal = $("#cunkPage .c-t-hzyh ul li.cur").attr("isDecimal");
            if (isDecimal=='true') {
                var tempMoney = parseFloat(vMoney);
                var reg = /^[0-9]*$/;
                if (reg.test(tempMoney)) {
                    popTips("充值金额必须携带非0小数，如12.6或100.08，请重新调整充值金额。", 'waring');
                    rechargeListener.attr("onclick", "FinanceAction.cunk.recharge(event);");
                    return;
                }
                var reg2 = /^[0-9]*[\.][0-9]{3,}$/;
                if (reg2.test(tempMoney)) {
                    popTips("充值金额最小单位为分，如12.6或100.08，请重新调整充值金额。", 'waring');
                    rechargeListener.attr("onclick", "FinanceAction.cunk.recharge(event);");
                    return;
                }
            }

            // 充值卡
            var thirdBankCode = $("#bankCode").val();
            if(thirdBankCode == "Eypalcard"){
                var cardNum = way.get("recharge.cardNum");
                var cardPass = way.get("recharge.cardPass");
                if(!cardNum){
                    popTips("请输入卡号", 'waring');
                    rechargeListener.attr("onclick", "FinanceAction.cunk.recharge(event);");
                    return;
                }
                if(!cardPass){
                    popTips("请输入卡密", 'waring');
                    rechargeListener.attr("onclick", "FinanceAction.cunk.recharge(event);");
                    return;
                }
            }

            var selectType = thirdParty[payTypeIndex].type

            if (selectType == "self") {
                var isAlipay = thirdParty[payTypeIndex].name.indexOf("支付宝") > -1; // 是否为支付宝转账

                var vId = $("#bankId").val();
                if(!vId) {
                    popTips("请选择支付方式", "waring");
                    rechargeListener.attr("onclick", "FinanceAction.cunk.recharge(event);");
                    return;
                }
                var requestUrl;
                if(isAlipay) {
                    requestUrl = "/ct-data/userAccount/showDetailAlipay";
                }else{
                    requestUrl = "/ct-data/userAccount/showDetail";
                }
                // 网银充值
                $.ajax({
                    type: "post",
                    url: requestUrl,
                    data: {
                        "id": vId,
                        "money": vMoney
                    },
                    dataType: "json",
                    success: function(msg) {
                        if (msg.sign === true) {
                            way.set("onlineRecharge.shortName", msg.shortName);
                            $("#sp_recharge_money").text(msg.d_money);
                            $("#sp_bankUserName").text(msg.bankUserName);
                            $("#sp_bankCardNumber").text(msg.bankCardNumber);
                            if(isAlipay){
                                $("#sp_postscript").text(msg.alipayName).next("a").hide();
                                $("#sp_postscript").parents("td").prev().text("支付宝姓名：");
                                if(msg.shortName == "工商银行" || msg.shortName == "招商银行") {
                                    $("#cunkPage .tabBd .c-bz-c-tow .tp img").attr("src", "../../resources/yiyou/images/member/hezyh/" + msg.bankLogo.split(".")[0] + "1.gif");
                                } else{
                                    $("#cunkPage .tabBd .c-bz-c-tow .tp img").attr("src", "../../resources/yiyou/images/member/hezyh/" + msg.bankLogo);
                                }
                                $("#cunkPage .tabBd .c-bz-c-tow .tp img").attr("alt", "支付宝");
                                $("#cunkPage .tabBd .c-bz-c-tow").eq(1).find("a.but-dlwy").attr("href", "https://shenghuo.alipay.com/transfer/index.htm");
                            } else{
                                $("#sp_postscript").text(msg.postscript).next("a").show();
                                $("#sp_postscript").parents("td").prev().text("附言：");
                                $("#cunkPage .tabBd .c-bz-c-tow .tp img").attr("src", "../../resources/yiyou/images/member/hezyh/" + msg.bankLogo);
                                $("#cunkPage .tabBd .c-bz-c-tow .tp img").attr("alt", msg.shortName);
                                $("#cunkPage .tabBd .c-bz-c-tow").eq(1).find("a.but-dlwy").attr("href", msg.bankUrl);
                            }

                            $("#cunkPage ul.c-bz-nav li").removeClass("cur");
                            $("#cunkPage ul.c-bz-nav li").eq(1).addClass("cur");

                            $("#cunkPage div.c-bz-c-one").hide();
                            $("#cunkPage div.c-bz-c-tow").eq(1).show();
                            way.set("recharge.amount", "");
                            if(!isAlipay) {
                                popTips('1、选择银行并填写金额<br>2、确定充值信息<br>3、登录银行进行转账(充值时一定要输入附言)<br>如果充值时不复制附言平台不负任何责任<br>' +
                                    '4、只支持PC端'+msg.shortName.substr(0,1)+'行转'+msg.shortName.substr(0,1)+'行', 'waring', '充值提示');
                            }
                            if(isAlipay){
                                popTips('1.先绑定充值支付宝的真实姓名 <br>2. 在支付充值点击生成订单 <br>3.使用绑定平台姓名的支付宝账号充值 <br>' +
                                    '<span style="color: red">4.支付充值到账是以实际充值到账的为准。</span><br>（非平台绑定支付宝姓名转账，不会自动到账）', 'waring', '充值提示');
                            }
                        } else {
                            popTips(msg.message, 'error');
                        }
                    },
                    error: function() {},
                    complete: function() {
                        rechargeListener.attr("onclick", "FinanceAction.cunk.recharge(event);");
                    }
                });
            } else {
                // 在线充值
                var vCode = $("#cunkPage .c-t-hzyh ul li.cur").attr("bankCode");
                var feePercentage = $("#cunkPage .c-t-hzyh ul li.cur img").attr("feeScale");
                var feeMin = $("#cunkPage .c-t-hzyh ul li.cur img").attr("minFee");
                var vName = $("#cunkPage div.c-t-hzyh li.cur img").attr("alt");
                var chargeTypeId = $("#bankId").val();
                // var type = $("#cunkPage ul.tabHd li.cur").attr("code");
                if (!vCode) {
                    vCode = '888';
                }
                if (!vName) {
                    vName = '888';
                }
                var isWindowOpen = false;

                var requestData = {
                    "amount": vMoney,
                    "thirdPartyId": chargeTypeId,
                    "bankCode": vCode,
                    "bankName": vName
                };
                if(thirdBankCode == "Eypalcard"){
                    requestData.cardNum = cardNum;
                    requestData.cardPass = cardPass;
                }

                $.ajax({
                    type: "post",
                    url: "/ct-data/thirdPartyPayment/pretreatment",
                    data: requestData,
                    dataType: "json",
                    async: false,
                    success: function(msg) {
                        if (msg.sign === true) {
                            feePercentage = feePercentage ? feePercentage : 0;
                            feeMin = feeMin ? feeMin : 0;
                            if (msg.scanCode) {
                                var base64_header = {
                                    "jpg": "data:image/jpg;base64,",
                                    "png": "data:image/png;base64,",
                                    "gif": "data:image/gif;base64,"
                                };
                                var curBankCode = $("#bankCode").val();
                                $("#codeTips").hide().html("");
                                if(feePercentage > 0 && feeMin > 0) {
                                    $("#codeTips").show().html("温馨提醒：使用此商户充值，需要会员承担"+ feePercentage +"%的手续费");
                                }
                                $("#qrcodeTips_img").attr("src", base64_header.jpg + msg.scanCode);
                                pop("qrcodeTips");
                            }else{
                                FinanceAction.cunk.rechargeInfo = "";
                                if(feePercentage > 0 && feeMin > 0){
                                    FinanceAction.cunk.rechargeInfo = msg;
                                    $("#feeTipsWord").html("温馨提醒：使用此商户充值，需要会员承担"+ feePercentage +"%的手续费");
                                    pop("feeTips");
                                }else {
                                    way.set("bill.amount", msg.amount);
                                    way.set("bill.billNo", msg.billNo);

                                    $("#cunkPage .tabBd .c-bz-c-one").hide();
                                    $("#cunkPage .tabBd .c-bz-c-tow").eq(0).show();

                                    $("#tppInput0").val(msg.promptInfo);
                                    $("#tppInput1").val(msg.param);
                                    $("#tppInput2").val(msg.key);
                                    $("#tppForm0").attr('action', msg.paymdomain);
                                    $('#tppForm0').submit();
                                    $("#cunkPage .tabBd .c-bz-c-tow").eq(0).find("a.but-dlwy").attr("onclick", "$('#tppForm0').submit();");

                                    way.set("recharge.amount", "");
                                    way.set("recharge.cardNum", "");
                                    way.set("recharge.cardPass", "");
                                    isWindowOpen = true;
                                }
                            }
                        } else {
                            msg.message = msg.message ? msg.message : "";
                            popTips(msg.message, 'error');
                        }
                    },
                    error: function() {},
                    complete: function() {

                        if (isWindowOpen === true) {
                            $("#tppForm0").submit();
                        }
                        rechargeListener.attr("onclick", "FinanceAction.cunk.recharge(event);");
                    }
                });

            }
        },
        showBankWeb : function(){
            closelayer();
            var msg = FinanceAction.cunk.rechargeInfo;
            way.set("bill.amount", msg.amount);
            way.set("bill.billNo", msg.billNo);

            $("#cunkPage .tabBd .c-bz-c-one").hide();
            $("#cunkPage .tabBd .c-bz-c-tow").eq(0).show();

            $("#tppInput0").val(msg.promptInfo);
            $("#tppInput1").val(msg.param);
            $("#tppInput2").val(msg.key);
            $("#tppForm0").attr('action', msg.paymdomain);
            $('#tppForm0').submit();
            $("#cunkPage .tabBd .c-bz-c-tow").eq(0).find("a.but-dlwy").attr("onclick", "$('#tppForm0').submit();");

            way.set("recharge.amount", "");
            way.set("recharge.cardNum", "");
            way.set("recharge.cardPass", "");
        }
    },
    "quk": {
        showName: "提款",
        pageCode: "quk",
        pageHtml: '<div id="qukPage"><div class="mar-lr20">' +
        '<h4><i>1</i>选择银行卡或提款账户</h4>' +
        '<div class="agenRadio">' +
        '<input class="inradio" type="radio" id="zzh" name="sport" value="zzh" checked="checked">&nbsp;<label  for="zzh">主账户</label>' +
        '<input class="inradio" type="radio" id="fhzh" name="sport" value="fhzh">&nbsp;<label  for="fhzh">分红账户</label>' +
        '</div>' +
        '<div class="m-bdyhk"><dl></dl></div>' +
        '</div>' +
        '<div class="m-f-qk-tow mar-lr20">' +
        '<h4><i>2</i>请输入提款金额</h4>' +
        '<div class="m-bdyhk ym-gl ym-g33">' +
        '<ul>' +
        '<li><span>提款金额：</span>' +
        '<input type="text" id="quk_withdraw_money" placeholder="请输入提款金额" onkeyup="FinanceAction.quk.verificationMoney();" maxlength="7"> ' +
        '<em>元</em>' +
        '</li>' +
        '<li><span>手续费：</span>' +
        '<input type="text" id="quk_fee" value="http://www.yugj881.com/resources/main/0.0000" readonly="true">' +
        '</li>' +
        '<li><span>实际到账：</span>' +
        '<input type="text" id="quk_ramount" value="http://www.yugj881.com/resources/main/0.0000" readonly="true">' +
        '</li>' +
        '<li><p>温馨提示：您今天还有<label id="quk_explain_freetimes"></label>次提款免手续费特权</p></li>' +
        '</ul>' +
        '</div>' +
        '<div class=" m-bdyhk ym-gl ym-g66">' +
        '<table>' +
        '<tbody>' +
        '<tr>' +
        '<th>可提金额</th><td><span id="quk_explain_balance"></span>' +
        '<span id="quk_explain_dividend"  way-data="useraccount.dividend" style="display:none;"></span>元</td>' +
        '<th>彩票所需消费量</th><td><span id="quk_explain_lottery" class="primary_account"></span><span class="bonus_account" style="display:none;">0/0</span>元</td>' +
        '</tr>' +
        '<tr>' +
        '<th>快乐彩所需消费量</th><td><span id="quk_explain_klc" class="primary_account"></span><span class="bonus_account" style="display:none;">0/0</span>元</td>' +
        '<th>百家乐所需消费量</th><td><span id="quk_explain_bjl" class="primary_account"></span><span class="bonus_account" style="display:none;">0/0</span>元</td>' +
        '</tr>' +
        '<tr>' +
        '<th>提款时间(24小时制)</th><td><span id="quk_explain_time">全天无限制</span></td>' +
        '<th>单笔限额</th><td><span id="quk_explain_minMoney"></span> - <span id="quk_explain_maxMoney"></span>元</td>' +
        '</tr>' +
        '<tr>' +
        '<th>每日限额</th><td colspan="3">提款总额：<span id="quk_explain_daymaxMoney"></span>元</td>' +
        '</tr>' +
        '<tr>' +
        '<th>手续费说明</th><td colspan="3">提款金额*<span id="quk_explain_feescale"></span>%,' +
        '最小手续费 <span id="quk_explain_minfee"></span>,最高手续费<span id="quk_explain_maxfee"></span></td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '</div>' +
        '<div class="m-f-qk-tow mar-lr20">' +
        '<h4><i>3</i>输入资金密码</h4>' +
        '<div class="m-cun-tab c-tab-one tab">' +
        '<div class="m-c-hd">' +
        '<ul class="tabHd" id="quk_authType">' +
        '<li class="cur"><i></i>资金密码</li><li style="display: none;"><i></i>Google验证码</li>' +
        '</ul>' +
        '</div>' +
        '<div class="m-c-bd tabBd">' +
        '<div class="srmm tb-imte" style="display:block;">' +
        '<div id="enterQukPasswordDiv">' +
        '<span>资金密码：</span><input type="password" value="" id="quk_withdraw_pwd">' +
        '<a href="javascript:;" style="display:none;">忘记资金密码？</a>' +
        '</div>' +
        '<div id="tradQukPasswordDiv" style="display:none;">' +
        '<span>未设置资金密码，</span>' +
        '<a href="javascript:;" onclick="openTradPwdPage();"><strong style="color:#f45152;">设置</strong></a>' +
        '</div>' +
        '</div>' +
        '<div class="srmm tb-imte" style="display:none;">' +
        '<div id="enterQukGooglePwdDiv">' +
        '<span>Google验证码：</span><input type="text" value="" id="quk_withdraw_googlepwd" onkeyup="replaceAndSetPos(this,event,/[^\\d]/g,\'\');" maxlength="6">' +
        '</div>' +
        '<div id="tradQukGooglePwdDiv" style="display:none;">' +
        '<span>未绑定Google，</span>' +
        '<a href="javascript:;" onclick="openGoogle();"><strong style="color:#f45152;">绑定</strong></a>' +
        '</div>' +
        '</div></div></div></div>' +
        '<a class="but-xyb" href="javascript:;" onclick="FinanceAction.quk.toApplyForWithdraw();">提款</a></div>',
        getUserWithdrawLimit: function () {
            $.ajax({
                type: "post",
                url: "/ct-data/userAccount/isUserWithdrawLimit",
                datatype: "json",
                success: function (msg) {
                    var freetimes = parseInt(msg.freetimes) - parseInt(msg.opTimes);
                    if (freetimes < 0) {
                        freetimes = 0;
                    }
                    if (msg.sign) {
                        // isUserWithdrawLimit_STATUS = true;
                        way.set('users.account.withdraw', way.get('useraccount.balance'));
                        $("#quk_explain_balance").text(way.get('useraccount.balance'));
                        // $('#quk_explain_dividend').text(way.get("useraccount.dividend"));
                    } else {
                        // isUserWithdrawLimit_STATUS = false;
                        way.set('users.account.withdraw', '0');
                        $("#quk_explain_balance").text("0");
                        // $('#quk_explain_dividend').text('0');
                    }
                    $("#quk_explain_dividend").text( way.get('useraccount.dividend'));
                    $("#quk_explain_freetimes").text(freetimes);
                    // if(msg.lottery && msg.lottery.needMoney - msg.lottery.realMoney >= 0 ){
                    //     $("#quk_explain_lottery").text(msg.lottery ? msg.lottery.needMoney - msg.lottery.realMoney : 0);
                    // }else{
                    //     $("#quk_explain_lottery").text(0);
                    // }
                    // $("#quk_explain_klc").text(msg.klc ? msg.klc.needMoney : 0);
                    // $("#quk_explain_bjl").text(msg.bjl ? msg.bjl.needMoney : 0);
                    $("#quk_explain_lottery").text(msg.lottery ? msg.lottery.needMoney+'/'+msg.lottery.realMoney : 0+'/'+0);
                    $("#quk_explain_klc").text(msg.klc ? msg.klc.needMoney+'/'+msg.klc.realMoney : 0+'/'+0);
                    $("#quk_explain_bjl").text(msg.bjl ? msg.bjl.needMoney+'/'+msg.bjl.realMoney : 0+'/'+0);
                    $("#quk_explain_minMoney").text(msg.minMoney ? msg.minMoney : 0);
                    $("#quk_explain_maxMoney").text(msg.maxMoney ? msg.maxMoney : 0);
                    $("#quk_explain_daymaxMoney").text(msg.daymaxMoney ? msg.daymaxMoney : 0);
                    $("#quk_explain_feescale").text(msg.feescale ? msg.feescale : 0);
                    $("#quk_explain_minfee").text(msg.minfee ? msg.minfee : 0);
                    $("#quk_explain_maxfee").text(msg.maxfee ? msg.maxfee : 0);
                    if (msg.starTime && msg.endTime) {
                        $("#quk_explain_time").text(msg.starTime + " - " + msg.endTime);
                    }
                    if(msg.splitMoneySwitch == undefined){ // 如果为空则 return
                        splitMoneySwitch = false;
                        return;
                    }
                    if(msg.splitMoneySwitch === "true" || msg.splitMoneySwitch === true){ // 如果有拆单权限 则调用Splitmoney()方法
                        splitMoneySwitch = true;
                        $("#quk_withdraw_money").attr("onkeyup","FinanceAction.quk.verificationSplitMoney();");  // 替换方法
                        $("#quk_ramount").parents("ul").find("li").last().remove();  //清除最后一个 温馨提示li-DOM节点 下面增加温馨提示
                        $("#quk_ramount").parents("ul").append("<li style='height:50px'><p style='line-height:23px;padding: 4px 10px;text-indent: 0px;'>\
						温馨提示：您今天还有<label id='quk_explain_freetimes'>"+freetimes+"</label>次提款免手续费特权<br><em style='color:red'>您当前提款可能产生拆单 \
						 <a href='javascript:void(0)' id='showchaidTab' style='padding:2px 2px;color:#fff;background:red;border-radius:6px;'>查看拆单</a></em></p></li>");
                        $("#showchaidTab").attr("onclick","FinanceAction.quk.showchaidtable();");
                    }
                }
            });
        },
        getUserBankCardList: function () {
            var thisPanel = $("#qukPage .m-bdyhk dl");
            thisPanel.empty();

            $.ajax({
                type: "post",
                url: "/ct-data/userBank/userBankList",
                datatype: "json",
                success: function (msg) {
                    if (msg.sign === true) {
                        var html = "";
                        $.each(msg.data, function (idx, val) {
                            var innerHtml = '';
                            if (val.state == 1) {
                                innerHtml += '<dd id="' + val.id + '">';
                                innerHtml += '<div class="img ym-gl"><img src="../../resources/yiyou/images/member/yh/' + val.bankLogo + '" height="35" width="35" alt="' + val.bankName + '"></div>';
                                innerHtml += '<div class="xx ym-gl">';
                                innerHtml += '<span>' + val.bankName + '</span>';
                                innerHtml += '<span>' + val.bankUserName + ' ' + val.bankCardNumber + '</span>';
                                innerHtml += '</div>';
                                innerHtml += '<div class="moren"></div>';
                                innerHtml += '</dd>';
                            }

                            if (val.isDefault == 1) {
                                html = innerHtml + html;
                            } else {
                                html += innerHtml;
                            }
                        });
                        thisPanel.html(html);
                    }

                    html = '<dd id="quk_zzh_select" style="display:none;">';
                    html += '<div class="img ym-gl"><img src="../yiyou/images/member/yiyouzzh.png"/*tpa=http://www.yugj881.com/resources/yiyou/images/member/yiyouzzh.png*/ height="35" width="35" alt=""></div>';
                    html += '<div class="xx ym-gl"><p>亿游国际主账户</p></div>';
                    html += '<div class="moren"></div>';
                    html += '</dd>';
                    if (eval(msg.sysBankMaxNum) > 0 && eval(msg.data.length) < 5) {
                        html += '<dd class="addyhk" id="addNewBank" onclick="addUserBank();"><span>添加银行卡</span></dd>';
                    }
                    thisPanel.append(html);

                    thisPanel.children().eq(0).addClass("cur");
                }
            });
        },
        //
        toApplyForWithdraw: function () {
            var actType = 3;
            if ($("#qukPage .agenRadio input:radio[name='sport']:checked").val() == 'zzh') {
                actType = 1;
            }
            var card = $("#qukPage .m-bdyhk dl dd.cur").attr("id");
            if (card == "quk_zzh_select") {
                card = '1';
                if (actType == 1) {
                    card = null;
                }
            }

            if (actType == 1) {
                var qukExplain = eval($("#quk_explain_balance").text());
                if (qukExplain == 0) {
                    popTips("余额不足，或用户消费量未满足，不可以提款", "error");
                    return;
                }
            } else {
                var qukExplain = eval($("#quk_explain_dividend").text());
                if (qukExplain == 0) {
                    popTips("余额不足，不可以提款", "error");
                    return;
                }
            }

            if (!card) {
                popTips("请选择银行卡", "error");
                return;
            }
            var money = parseFloat($("#quk_withdraw_money").val());
            if (!money) {
                popTips("请输入提款金额", "error");
                return;
            }
            var minMoney = parseFloat($("#quk_explain_minMoney").text());
            var maxMoney = parseFloat($("#quk_explain_maxMoney").text());
            // 判断当前是否能拆单 --> 当能拆单则有拆单详情按钮，因此判断其长度
            if($("#showchaidTab").length) {
                var shengyumoney = money % maxMoney;
                if (shengyumoney != 0 && shengyumoney < minMoney) {
                    popTips("拆单后每笔提款金额必须在" + minMoney + "-" + maxMoney + "元之间", "error");
                    return;
                }
            }else{
                if(money < minMoney||money>maxMoney){
                    popTips("提款金额必须在" + minMoney + "-" + maxMoney + "元之间", "error");
                    return;
                }
            }
            // if (money > maxMoney) {
            //     popTips("提款金额超过每日提款限额", "error");
            //     return;
            // }
            //
            // var freee_times=$("#quk_explain_freetimes").html();//免费提款次数
            // if(splitMoneySwitch){
            //     for(i=0;i<=freee_times;i++){
            //         if(((money-i*maxMoney)<minMoney&&(money-i*maxMoney)>0)||money < minMoney){
            //             popTips("提款金额拆分后必须在" + minMoney + "-" + maxMoney + "元之间", "error");
            //             return;
            //         }
            //     }
            // }else{
            //     if(money < minMoney||money>maxMoney){
            //         popTips("提款金额必须在" + minMoney + "-" + maxMoney + "元之间", "error");
            //         return;
            //     }
            // }

            var pwdType;
            var pwd;
            if ($("#qukPage #quk_authType li").eq(0).hasClass("cur")) {
                pwdType = 0;
                pwd = $("#qukPage #quk_withdraw_pwd").val();
            } else {
                pwdType = 1;
                pwd = $("#qukPage #quk_withdraw_googlepwd").val();
            }

            if (!pwd) {
                popTips("请输入资金密码", "error");
                return;
            }

            $("#qukPage a.but-xyb").removeAttr("onclick");
            $.ajax({
                type: "post",
                url: "/ct-data/userAccount/toApplyForWithdraw",
                datatype: "json",
                data: {
                    "actType": actType,
                    "card": card,
                    "money": money,
                    "pwd": pwd,
                    "pwdType": pwdType
                },
                success: function (msg) {
                    if (msg.sign === true) {
                        FinanceAction.quk.getUserWithdrawLimit();
                        dsFlushBalance();
                        isUserWithdrawLimit();
                        platformList(true);
                        $("#qukPage .m-bdyhk dl dd").removeClass("cur");
                        $("#quk_withdraw_money").val("");
                        $("#quk_fee").val("http://www.yugj881.com/resources/main/0.0000");
                        $("#quk_ramount").val("http://www.yugj881.com/resources/main/0.0000");
                        $("#qukPage #quk_withdraw_pwd").val("");
                        $("#qukPage #quk_withdraw_googlepwd").val("");
                        popTips(msg.message, "succeed");
                    } else {
                        $("#qukPage #quk_withdraw_pwd").val("");
                        $("#qukPage #quk_withdraw_googlepwd").val("");
                        popTips(msg.message, "error");
                    }
                },
                error: function () {
                    popTips("服务器连接失败", "error");
                },
                complete: function () {
                    $("#qukPage a.but-xyb").attr("onclick", "FinanceAction.quk.toApplyForWithdraw();");
                }
            });
        },
        verificationMoney: function () {
            var money = $("#quk_withdraw_money").val();
            money = eval(money.replace(/[^\d]/g, ''));
            $("#quk_withdraw_money").val(money);
            //单笔最大金额
            var maxMoney=$("#quk_explain_maxMoney").html();//日提款最大总额
            var minMoney=$("#quk_explain_minMoney").html();
            var freee_times=$("#quk_explain_freetimes").html();//免费提款次数
            var maxfee=$("#quk_explain_maxfee").text();//最高手续费
            var minfee = eval($("#quk_explain_minfee").text());
            //提款在最大值与最小值之间
            if(money<=maxMoney&&money>=minMoney){
                if (parseInt($("#quk_explain_freetimes").text()) > 0) {
                    $("#quk_fee").val('http://www.yugj881.com/resources/main/0.0000');
                    if (!money) {
                        money = 0;
                    }
                    $("#quk_ramount").val(money.toFixed(4));
                }else{
                    if(!minfee) {
                        minfee = 0;
                    }
                    var fee = parseFloat(money) * parseFloat($("#quk_explain_feescale").text() / 100);
                    if (!fee) {
                        fee = minfee;
                    } else if (fee < minfee) {
                        fee = minfee;
                    } else if (fee > 25) {
                        fee = 25;
                    }
                    fee = Math.floor(fee).toFixed(4);
                    $("#quk_fee").val(fee);
                    $("#quk_ramount").val((money - fee).toFixed(4));
                }
            }
            //提款在maxMonemy~ maxMonemy*2之间
            if(money>maxMoney&&money<=maxMoney*2){
                switch (freee_times){
                    case '0'://还剩0次免费取款
                        var fee=parseFloat(money) * parseFloat($("#quk_explain_feescale").text() / 100);
                        if (!fee) {
                            fee = minfee;
                        } else if(fee>=25){
                            fee=25;
                        }else if (fee < minfee) {
                            fee = minfee;
                        }
                        $("#quk_fee").val(fee);
                        $("#quk_ramount").val((money - fee).toFixed(4));
                        break;
                    case '1'://还剩1次免费取款
                        var fee=parseFloat(money-maxMoney) * parseFloat($("#quk_explain_feescale").text() / 100);
                        if (!fee) {
                            fee = minfee;
                        } else if(fee>=25){
                            fee=25;
                        }else if (fee < minfee) {
                            fee = minfee;
                        }
                        $("#quk_fee").val(fee);
                        $("#quk_ramount").val((money - fee).toFixed(4));
                        break;
                    case '2'://还剩2次免费取款
                        $("#quk_fee").val('http://www.yugj881.com/resources/main/0.0000');
                        if (!money) {
                            money = 0;
                        }
                        $("#quk_ramount").val(money.toFixed(4));
                        break;
                }
            }
            //提款在maxMonemy*2之外
            if(money>maxMoney*2){
                switch (freee_times){
                    case '0'://还剩0次免费取款
                        var fee=parseFloat(money) * parseFloat($("#quk_explain_feescale").text() / 100);
                        if (!fee) {
                            fee = minfee;
                        } else if(fee>=25){
                            fee=25;
                        }else if (fee < minfee) {
                            fee = minfee;
                        }
                        $("#quk_fee").val(fee);
                        $("#quk_ramount").val((money - fee).toFixed(4));
                        break;
                    case '1'://还剩1次免费取款
                        var fee=parseFloat(money-maxMoney) * parseFloat($("#quk_explain_feescale").text() / 100);
                        if (!fee) {
                            fee = minfee;
                        } else if(fee>=25){
                            fee=25;
                        }else if (fee < minfee) {
                            fee = minfee;
                        }
                        $("#quk_fee").val(fee);
                        $("#quk_ramount").val((money - fee).toFixed(4));
                        break;
                    case '2'://还剩2次免费取款
                        var fee=parseFloat(money-maxMoney*2) * parseFloat($("#quk_explain_feescale").text() / 100);
                        if (!fee) {
                            fee = minfee;
                        } else if(fee>=25){
                            fee=25;
                        }else if (fee < minfee) {
                            fee = minfee;
                        }
                        $("#quk_fee").val(fee);
                        $("#quk_ramount").val((money - fee).toFixed(4));
                        break;
                }
            }

            // if (parseInt($("#quk_explain_freetimes").text()) > 0) {
            //     $("#quk_fee").val('http://www.yugj881.com/resources/main/0.0000');
            //     if (!money) {
            //         money = 0;
            //     }
            //     $("#quk_ramount").val(money.toFixed(4));
            // } else {
            //     var minfee = eval($("#quk_explain_minfee").text());
            //     if (!minfee) {
            //         minfee = 0;
            //     }
            //     var fee = parseFloat(money) * parseFloat($("#quk_explain_feescale").text() / 100);
            //     if (!fee) {
            //         fee = minfee;
            //     } else if (fee < minfee) {
            //         fee = minfee;
            //     } else if (fee > 25) {
            //         fee = 25;
            //     }
            //     fee = Math.floor(fee).toFixed(4);
            //     $("#quk_fee").val(fee);
            //     $("#quk_ramount").val((money - fee).toFixed(4));
            // }
        },
        /**
         * 计算拆单手续费
         * @returns
         */
        verificationSplitMoney : function(){
            // 拆单金额方法
            var money = $("#quk_withdraw_money").val(); // 获取输入的金额
            var qukExplain = eval($("#quk_explain_dividend").text());
            money = eval(money.replace(/[^\d]/g, ''));
            $("#quk_withdraw_money").val(money);  //处理后的金额
            var minMoney = $("#quk_explain_minMoney").html(); //单笔最小限额
            var maxMoney = $("#quk_explain_maxMoney").html(); //单笔最大限额
            var time = money/maxMoney;  // 整除
            var cishu = Math.floor(time);  // 最小的次数
            var freetime = $("#quk_explain_freetimes").html(); // 免费提款次数
            var Moneybfb = $("#quk_explain_feescale").html(); // 手续费百分比
            var qukmin = parseFloat($("#quk_explain_minfee").html());  //最小手续费
            var qukmax = parseFloat($("#quk_explain_maxfee").html());  //最大手续费
            var sum = 0;
            var othercishu="";  //除免费次数意外的次数
            var shenyuk =0;   // 取模之后的余款
            if(!money){
                $("#quk_fee").val(sum.toFixed(4));
                $("#quk_ramount").val(sum.toFixed(4));
                return;
            }
            if( time <= freetime){
                $("#quk_fee").val(sum.toFixed(4));   // 手续费
                $("#quk_ramount").val(money.toFixed(4));  //实际到账
                if(time != cishu){
                    othercishu = money - cishu*maxMoney ;
                }
            }else{
                /*
                 如果手续费率*单笔最大金额/100 小于最大的手续费 时
                 单笔最大手续费标准  要以实际为准
                 */
                if(Moneybfb*maxMoney/100 < qukmax ){
                    qukmax = Moneybfb*maxMoney/100;
                }
                var moMoney = parseFloat((cishu-freetime)*qukmax); //需要收费的金额
                var shenyu = (money % maxMoney) * parseFloat(Moneybfb / 100); // 取模后金额的手续费
                shenyu = shenyu*1;
                if(shenyu == 0){
                    if(Moneybfb*maxMoney/100 < qukmax ){
                        shenyu = (money / maxMoney - freetime)*maxMoney*Moneybfb/100;
                    }else{
                        shenyu = (money / maxMoney - freetime)*qukmax;
                    }
                }else if(shenyu < qukmin){
                    shenyu = parseInt(moMoney) + parseInt(qukmin);
                    shenyuk = qukmin;
                }else if(shenyu > qukmax){
                    shenyu = moMoney*1+ qukmax;
                    shenyuk = qukmax*1;
                }else{
                    shenyuk = shenyu;
                    shenyu = moMoney*1 + shenyu*1;
                }
                $("#quk_fee").val((shenyu).toFixed(4));   // 手续费
                $("#quk_ramount").val((money-shenyu*1).toFixed(4));  //实际到账
            }
            shenyuk = shenyuk.toFixed(4);       $("#chaidanTable tbody").attr({
                "cishu-data" : cishu,   // 次数
                "shenyuf-data" : shenyuk,  // 剩余手续费
                "othercishu-data" : othercishu
            });
        },
        /**
         * 计算shoutable
         * @returns
         */
        showchaidtable : function(){
            //拆单详情
            var money = $("#quk_withdraw_money").val();
            var oneMax = $("#quk_explain_maxMoney").html();
            var oneMin = $("#quk_explain_minMoney").html();
            var quk_fee = $("#quk_fee").val();  // 手续费
            var balance = $("#quk_explain_dividend").val();
            var quk_feetime = $("#quk_explain_freetimes").html();
            var quk_Max = $("#quk_explain_maxfee").html();  //单笔手续费
            var Moneybfb = $("#quk_explain_feescale").html();  //百分比
            if(!money){
                popTips("请输入提款金额","error");
                return;
            }
            if(money < oneMin){
                popTips("单笔取款金额不能小于"+oneMin,"error");
                return;
            }
            var cishu = $("#chaidanTable tbody").attr("cishu-data");
            var shenyuf = $("#chaidanTable tbody").attr("shenyuf-data");
            var othercishu = $("#chaidanTable tbody").attr("othercishu-data");
            var html ="";
            if(Moneybfb*oneMax/100 < quk_Max ){
                quk_Max = Moneybfb*oneMax/100;
            }
            for(var i=0;i<cishu;i++){
                if(i+1 <= quk_feetime){
                    html += "<tr><td>"+(1+i)+"</td><td>"+oneMax+"</td><td>免费</td></tr>"
                }else{
                    html += "<tr><td>"+(1+i)+"</td><td>"+oneMax+"</td><td>"+quk_Max+"</td></tr>"
                }
            }
            if(shenyuf > 0){
                var yue = money - cishu*oneMax;
                html += "<tr><td>"+(cishu*1+1)+"</td><td>"+yue+"</td><td>"+shenyuf+"</td></tr>"
            }
            if(othercishu){
                var yue = money - cishu*oneMax;
                html += "<tr><td>"+(cishu*1+1)+"</td><td>"+othercishu+"</td><td>免费</td></tr>"
            }
            $("#chaidanTable tfoot .total").html(quk_fee);
            $("#chaidanTable tbody").html(html);
            pop("chaidanTable");
            $("#chaidanTable .confirm").focus();
        }
    },
    "ckjl": {
        showName: "充值记录",
        pageCode: "ckjl",
        pageHtml: '<div class="mar-lr20 pos-r" id="ckjlPage">' +
        '<table class="mem-biao">' +
        '<thead>' +
        '<tr>' +
        '<th colspan="9">' +
        '<span>充值时间：</span>' +
        '<input class="layriqi" type="text" id="ckjl_search_startTime" onclick="laydate({format:\'YYYY-MM-DD\',isclear:false})" readonly="true">' +
        '<span class="zhi">至</span>' +
        '<input class="layriqi" type="text" id="ckjl_search_endTime" onclick="laydate({format:\'YYYY-MM-DD\',isclear:false})" readonly="true">' +
        '<span>状态：</span>' +
        '<select id="ckjl_search_state">' +
        '<option value="">所有</option>' +
        '<option value="1">已提交</option>' +
        '<option value="2">已完成</option>' +
        '<option value="3">正在处理</option>' +
        '<option value="4">审核通过</option>' +
        '<option value="5">审核中</option>' +
        '<option  value="6">已审核</option>' +
        '<option value="-1">取消申请</option>' +
        '<option value="-2">拒绝</option>' +
        '<option value="-3">失败</option>' +
        '<option value="-4">异常</option>' +
        '<option value="-9">锁定</option>' +
        '</select>' +
        '<span>订单编号：</span>' +
        '<input class="in-tx-1" type="text" value="" id="ckjl_search_billNo">' +
        '<a href="javascript:;" class="butsty1" onclick="FinanceAction.ckjl.rechargeList();">查询</a>' +
        '</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody id="rechargeList"></tbody>' +
        '</table>' +
        '<div class="member-pag paging">' +
        '</div>' +
        '</div>',
        rechargeList: function () {
            var thisPanel = $("#rechargeList");
            var htmlTitle = '<tr><th>订单号</th><th>申请金额</th><th>手续费</th><th>实际金额</th>' +
                '<th>实际手续费</th><th>变更前金额</th><th>变更后金额</th><th>状态</th><th>操作</th></tr>';
            thisPanel.empty();
            thisPanel.append(htmlTitle);
            $('#ckjlPage .paging').empty();

            var jqueryGridPage = 1;
            var jqueryGridRows = 10;
            var billNo = $("#ckjl_search_billNo").val();
            var state = $("#ckjl_search_state").val();
            var startTime = $("#ckjl_search_startTime").val();
            var endTime = $("#ckjl_search_endTime").val();

            var pagination = $.pagination({
                render: '#ckjlPage .paging',
                pageSize: jqueryGridRows,
                pageLength: 7,
                ajaxType: 'post',
                hideInfos: false,
                hideGo: true,
                ajaxUrl: '/ct-data/payBankBackup/rechargeList',
                ajaxData: {
                    "billNo": billNo,
                    "jqueryGridPage": jqueryGridPage,
                    "jqueryGridRows": jqueryGridRows,
                    "state": state,
                    "startTime": startTime,
                    "endTime": endTime
                },
                complete: function () {
                },
                success: function (data) {
                    thisPanel.empty();
                    thisPanel.append(htmlTitle);
                    $.each(data, function (idx, val) {
                        var html = "<tr>";
                        html += "<td>" + (val.billNo) + "</td>";
                        html += "<td>" + (val.amount) + "</td>";
                        html += "<td>" + (val.fee ? val.fee : '') + "</td>";
                        html += "<td>" + (val.actualAmount ? val.actualAmount : '') + "</td>";
                        html += "<td>" + (val.actualFee ? val.actualFee : '') + "</td>";
                        html += "<td>" + (val.oldAccountMoney ? val.oldAccountMoney : '') + "</td>";
                        html += "<td>" + (val.newAccountMoney ? val.newAccountMoney : '') + "</td>";

                        var state = "未知";
                        if (val.state == 1) {
                            state = "已提交";
                        } else if (val.state == 2) {
                            state = "已完成";
                        } else if (val.state == 3) {
                            state = "正在处理";
                        } else if (val.state == 4) {
                            state = "审核通过";
                        }  else if (val.state == 5) {
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
                        html += "<td>" + state + "</td>";

                        var urgeHtml = '<td></td>';
                        // 创建时间差
                        var createTimes = (new Date()).getTime() - (new Date(Date.parse(val.createTime.replace(/-/g, "/")))).getTime();
                        // 催财时间差
                        var dunningTimes = (new Date()).getTime() - (new Date(Date.parse(val.dunningTime.replace(/-/g, "/")))).getTime();
                        if (val.state == 2) {
                            urgeHtml = '<td>已处理</td>';
                        } else {
                            if (createTimes < 24 * 3600 * 1000) {
                                if (val.dunningState == 0) {
                                    if ((createTimes) > 600 * 1000) {
                                        urgeHtml = '<td><span class="cdz" onclick="FinanceAction.ckjl.openUrgeRecharge(\'' + val.id + '\')">催到账</span></td>';
                                    } else {
                                        urgeHtml = '<td>处理中</td>';
                                    }
                                } else if (val.dunningState == 1) {
                                    if (dunningTimes > 3600 * 1000) {
                                        urgeHtml = '<td><span class="cdz" onclick="FinanceAction.ckjl.openUrgeRecharge(\'' + val.id + '\')">催到账</span></td>';
                                    } else {
                                        urgeHtml = '<td>催款中</td>';
                                    }
                                } else if (val.dunningState == 2) {
                                    urgeHtml = '<td>已处理</td>';
                                }
                            } else {
                                urgeHtml = '<td>已超时</td>';
                            }
                        }

                        html += urgeHtml;
                        html += "</tr>";
                        thisPanel.append(html);
                    });
                },
                pageError: function (response) {
                },
                emptyData: function () {
                }
            });
            pagination.init();
        },
        openUrgeRecharge: function (id) {
            $("#payBankBackupId").val(id);
            $("#bankBillNo").val("");
            $("#depositPayTime").val("");
            $("#depositMoney").val("");
            $("#depositBankName").val("");
            $("#depositBankUserName").val("");
            $("#depositBankCard").val("");
            $("#depositReceivingAccount").val("");
            $("#depositPayee").val("");
            $("#depositRemark").val("");
            pop('cuidaoz');
        },
        urgeRecharge: function () {
            var payBankBackupId = $("#payBankBackupId").val();
            var bankBillNo = $("#bankBillNo").val();
            var payTime = $("#depositPayTime").val();
            var money = $("#depositMoney").val();
            var bankName = $("#depositBankName").val();
            var bankUserName = $("#depositBankUserName").val();
            var bankCard = $("#depositBankCard").val();
            var receivingAccount = $("#depositReceivingAccount").val();
            var payee = $("#depositPayee").val();
            var remark = $("#depositRemark").val();

            if (!bankBillNo) {
                popTips("请填写银行订单号", "waring");
                return;
            }
            if (!payTime) {
                popTips("请填写支付成功时间", "waring");
                return;
            }
            if (!money) {
                popTips("请填写充值金额", "waring");
                return;
            }
            if (!bankName) {
                popTips("请填写支付银行名称", "waring");
                return;
            }
            if (!bankUserName) {
                popTips("请填写支付银行姓名", "waring");
                return;
            }
            if (!bankCard) {
                popTips("请填写支付银行卡号", "waring");
                return;
            }
            if (!receivingAccount) {
                popTips("请填写收款人账号", "waring");
                return;
            }
            if (!payee) {
                popTips("请填写收款人姓名", "waring");
                return;
            }
            closelayer();
            $.ajax({
                type: "post",
                url: "/ct-data/userAccount/dunning",
                datatype: "json",
                data: {
                    "payBankBackupId": payBankBackupId,
                    "bankBillNo": bankBillNo,
                    "payTime": payTime,
                    "money": money,
                    "bankName": bankName,
                    "bankUserName": bankUserName,
                    "bankCard": bankCard,
                    "receivingAccount": receivingAccount,
                    "payee": payee,
                    "remark": remark
                },
                success: function (msg) {
                    if (msg.sign === true) {
                        FinanceAction.ckjl.rechargeList();
                        popTips(msg.message, "succeed");
                    } else {
                        popTips(msg.message, "error");
                    }
                },
                error: function () {
                    popTips("服务器连接失败", "error");
                }
            });
        }
    },
    "qkjl": {
        showName: "提款记录",
        pageCode: "qkjl",
        pageHtml: '<div class="mar-lr20 pos-r" id="qkjlPage">' +
        '<table class="mem-biao">' +
        '<thead>' +
        '<tr>' +
        '<th colspan="10">' +
        '<span>提款时间：</span>' +
        '<input class="layriqi" type="text" id="qkjl_search_startTime" onclick="laydate({format:\'YYYY-MM-DD\',isclear:false})" readonly="true">' +
        '<span class="zhi">至</span>' +
        '<input class="layriqi" type="text" id="qkjl_search_endTime" onclick="laydate({format:\'YYYY-MM-DD\',isclear:false})" readonly="true">' +
        '<span>状态：</span>' +
        '<select id="qkjl_search_state">' +
        '<option value="">所有</option>' +
        '<option value="1">已提交</option>' +
        '<option value="2">已完成</option>' +
        '<option value="3">正在处理</option>' +
        '<option value="4">审核通过</option>' +
        '<option value="5">审核中</option>' +
        '<option  value="6">已审核</option>' +
        '<option value="-1">取消申请</option>' +
        '<option value="-2">拒绝</option>' +
        '<option value="-3">失败</option>' +
        '<option value="-4">异常</option>' +
        '<option value="-9">锁定</option>' +
        '</select>' +
        '<span>订单编号：</span>' +
        '<input class="in-tx-1" type="text" value="" id="qkjl_search_billNo">' +
        '<a href="javascript:;" class="butsty1" onclick="FinanceAction.qkjl.withdrawList();">查询</a>' +
        '</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody id="withdrawList"></tbody>' +
        '</table>' +
        '<div class="member-pag paging">' +
        '</div>' +
        '</div>',
        withdrawList: function () {
            var thisPanel = $("#withdrawList");
            var htmlTitle = '<tr><th>订单号</th><th>申请金额</th><th>手续费</th><th>实际金额</th>' +
                '<th>实际手续费</th><th>变更前金额</th><th>变更后金额</th><th>状态</th><th>原因</th></tr>';
            thisPanel.empty();
            thisPanel.append(htmlTitle);
            $('#qkjlPage .paging').empty();

            var jqueryGridPage = 1;
            var jqueryGridRows = 10;
            var billNo = $("#qkjl_search_billNo").val();
            var state = $("#qkjl_search_state").val();
            var startTime = $("#qkjl_search_startTime").val();
            var endTime = $("#qkjl_search_endTime").val();

            var pagination = $.pagination({
                render: '#qkjlPage .paging',
                pageSize: jqueryGridRows,
                pageLength: 7,
                ajaxType: 'post',
                hideInfos: false,
                hideGo: true,
                ajaxUrl: '/ct-data/payBankBackup/withdrawList',
                ajaxData: {
                    "billNo": billNo,
                    "jqueryGridPage": jqueryGridPage,
                    "jqueryGridRows": jqueryGridRows,
                    "state": state,
                    "startTime": startTime,
                    "endTime": endTime
                },
                complete: function () {
                },
                success: function (data) {
                    thisPanel.empty();
                    thisPanel.append(htmlTitle);
                    $.each(data, function (idx, val) {
                        var html = "<tr>";
                        html += "<td>" + (val.billNo) + "</td>";
                        html += "<td>" + (val.amount) + "</td>";
                        html += "<td>" + (val.fee ? val.fee : '') + "</td>";
                        html += "<td>" + (val.actualAmount ? val.actualAmount : '') + "</td>";
                        html += "<td>" + (val.actualFee ? val.actualFee : '') + "</td>";
                        html += "<td>" + (val.oldAccountMoney ? val.oldAccountMoney : '') + "</td>";
                        html += "<td>" + (val.newAccountMoney ? val.newAccountMoney : '') + "</td>";

                        var state = "未知";
                        if (val.state == 1) {
                            state = "已提交";
                        } else if (val.state == 2) {
                            state = "已完成";
                        } else if (val.state == 3) {
                            state = "正在处理";
                        } else if (val.state == 4) {
                            state = "审核通过";
                        } else if (val.state == -1) {
                            state = "取消申请";
                        } else if (val.state == -2) {
                            state = "拒绝";
                        } else if (val.state == -3) {
                            state = "失败";
                        } else if (val.state == -8) {
                            state = "删除";
                        } else if (val.state == -9) {
                            state = "锁定";
                        }
                        html += "<td>" + state + "</td>";
                        html += "<td>" + (val.backRemark ? val.backRemark : '') + "</td>";
                       // html += "<td>" + (val.operateRemark ? val.operateRemark : '') + "</td>";
                        html += "</tr>";
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
    },
    "zzjl": {
        showName: "转账记录",
        pageCode: "zzjl",
        pageHtml: '<div class="mar-lr20 pos-r" id="zzjlPage">' +
        '<table class="mem-biao">' +
        '<thead>' +
        '<tr>' +
        '<th colspan="8">' +
        '<span>转账时间：</span>' +
        '<input class="layriqi" type="text" id="zzjl_search_startTime" onclick="laydate({format:\'YYYY-MM-DD\',isclear:false})" readonly="true">' +
        '<span class="zhi">至</span>' +
        '<input class="layriqi" type="text" id="zzjl_search_endTime" onclick="laydate({format:\'YYYY-MM-DD\',isclear:false})" readonly="true">' +
        '<br/><br/><br/><span>转出账户：</span><select id="zzjl_search_transferFrom"></select>' +
        '<span>转入账户：</span><select id="zzjl_search_transferTo"></select>' +
        '<span>状态：</span>' +
        '<select id="zzjl_search_state"><option value="">所有</option><option value="1">成功</option><option value="0">失败</option><option value="-1">等待审核</option><option value="-2">审核驳回</option></select>' +
        '<a href="javascript:;" class="butsty1" onclick="FinanceAction.zzjl.transferList();">查询</a>' +
        '</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody id="transferList"></tbody>' +
        '</table>' +
        '<div class="member-pag paging">' +
        '</div>' +
        '</div>',
        setTransferAccount: function () {
            $.ajax({
                url: '/ct-data/baccarat/platformList',
                type: 'POST',
                dataType: 'json',
                data: {"isHaveMoney": false},
                success: function (data, textStatus, xhr) {
                    if (data.sign) {
                        // var html = '<option value="">所有</option><option value="cpzh">主账户</option>';
                        var fromAccountHtml = '<option value="">所有</option><option value="cpzh">主账户</option><option value="cpfdzh">返点账户</option>';
                        if(isShowDividend){
                            fromAccountHtml+='<option value="cpfhzh">分红账户</option>'
                        }
                        var toAccountHtml = '<option value="">所有</option><option value="cpzh">主账户</option><option value="cpfdzh">返点账户</option>';
                        $.each(data.list, function (index, val) {
                            //if (val.isOpen) {
                            if(val.value != 'MT4'){
                                // html += '<option value="' + val.code + '">' + val.value + '</option>';
                                fromAccountHtml += '<option value="' + val.code + '">' + val.value + '</option>';
                                toAccountHtml += '<option value="' + val.code + '">' + val.value + '</option>';
                            }
                        });
                        $("#zzjl_search_transferFrom").html(fromAccountHtml);
                        $("#zzjl_search_transferTo").html(toAccountHtml);
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                }
            });
        },
        transferList: function () {
            var thisPanel = $("#transferList");
            var htmlTitle = '<tr><th>订单号</th><th>金额</th><th>转出账户</th><th>转入账户</th><th>日期</th><th>状态</th><th>备注</th></tr>';
            thisPanel.empty();
            thisPanel.append(htmlTitle);
            $('#zzjlPage .paging').empty();

            var jqueryGridPage = 1;
            var jqueryGridRows = 10;
            var transferOut = $("#zzjl_search_transferFrom").val();
            var transferIn = $("#zzjl_search_transferTo").val();
            var state = $("#zzjl_search_state").val();
            var startTime = $("#zzjl_search_startTime").val();
            var endTime = $("#zzjl_search_endTime").val();

            var pagination = $.pagination({
                render: '#zzjlPage .paging',
                pageSize: jqueryGridRows,
                pageLength: 7,
                ajaxType: 'post',
                hideInfos: false,
                hideGo: true,
                ajaxUrl: '/ct-data/transferAccounts/transferAccountsList',
                ajaxData: {
                    "startTime": startTime,
                    "endTime": endTime,
                    "jqueryGridPage": jqueryGridPage,
                    "jqueryGridRows": jqueryGridRows,
                    "transferOut": transferOut,
                    "transferIn": transferIn,
                    "state": state
                },
                complete: function () {
                },
                success: function (data) {
                    thisPanel.empty();
                    thisPanel.append(htmlTitle);
                    $.each(data, function (idx, val) {
                        var html = "<tr>";
                        html += "<td>" + (val.billNo) + "</td>";
                        html += "<td>" + (val.money) + "</td>";

                        var transferOutName = '';
                        if (val.transferOut) {
                            if (val.transferOut == 'cpfhzh') {
                                transferOutName = '彩票分红账户';
                            } else if (val.transferOut == 'cpfdzh'){
                                transferOutName = '返点账户';
                            } else {
                                transferOutName = allPlatform[val.transferOut];
                            }
                        }
                        html += "<td>" + transferOutName + "</td>";

                        var transferInName = '';
                        if (val.transferIn) {
                            if (val.transferIn == 'cpfhzh') {
                                transferInName = '彩票分红账户';
                            } else if (val.transferIn == 'cpfdzh'){
                                transferInName = '返点账户';
                            } else {
                                transferInName = allPlatform[val.transferIn];
                            }
                        }
                        html += "<td>" + transferInName + "</td>";

                        html += "<td>" + (val.createDate ? val.createDate : '') + "</td>";

                        var state = "";
                        if (val.result == '1') {
                            state = "成功";
                        } else if (val.result == '0') {
                            state = "失败";
                        } else if (val.result == '-1') {
                            state = "等待审核";
                        } else if (val.result == '-2') {
                            state = "审核驳回";
                        }
                        html += "<td>" + state + "</td>";
                        html += "<td>" + (val.remark ? val.remark : '') + "</td>";
                        html += "</tr>";
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
    }
};