var previousUrl = getCookie("previousUrl");
var currentUrl = window.location.pathname + window.location.search + window.location.hash;

/**
 * 此链接后面没有'/'，所以组合链接时需加上'/'
 */
var currentRootDirectory = window.location.protocol + '//' + window.location.host;

var user = null;
var dsFlushIndex = 0;
// 客服链接
var customerUrl = "";

// getUserInfo();
var getUserInfoTimeOutId;
getCurrentTime();

var WebpeConfig = {
    CID: 'on000013',
    uiLang: "zh-tw",
    siteCharset: "big5",
    Online88CustomerWebText: '',
    useStatic: false,
    iconDom: 'webpeiconDomid',
    online88IconPosition: 'right',
    //onlineIconUrl: 'your online ico n path',
    //offlineIconUrl:'your_offline_icon_path',
    swfFullPath: '/view/jsocket.swf',
    // serverHost: "https://chinacs168.com/",
    serverHost: "http://shunt1.chinacs168.com/",
    referer: document.referrer,
    referer_me: window.location.href,
    load: function () {
        document.write('<script charset="utf-8" language="javascript" src="' + this.serverHost + 'api/clientjs?CID=' + this.CID + '&lang=' + this.uiLang + '&siteCharset=' + this.siteCharset + '&referer=' + encodeURIComponent(this.referer) + '&Online88CustomerWebText=' + encodeURIComponent(this.Online88CustomerWebText) + '"></' + 'script>');
    },
    getWebpeConfig: function () {
        return this.serverHost + 'api/clientjs?CID=' + this.CID + '&lang=' + this.uiLang + '&siteCharset=' + this.siteCharset + '&referer=' + encodeURIComponent(this.referer_me) + '&Online88CustomerWebText=' + encodeURIComponent(this.Online88CustomerWebText);
    }
};

/**
 * 获取用户信息
 */
var initUser = false;

function getUserInfo() {
    clearTimeout(getUserInfoTimeOutId);
//  $.ajax({
//      url: "/ct-data/acegi/getLoginUser",
//      type: "post",
//      dataType: "json",
//      success: function (data) {
//          initUser = true;
//          if (data.sign === true) {
//              user = data.UserUser;
//              way.set("user", data.UserUser);
//
//              $.session.set("loginname", user.loginname);
//              $("#session_loginname").text(user.loginname);
//              if (!user.nickName) {
//                  way.set("user.nickName", user.loginname);
//              }
//
//              loginDiv();
//              dsFlushBalance();
//              setPublicCookieMin("previousUrl", currentUrl, 3);
//          } else {
//              user = null;
//              loginDiv();
//              gotoIndex(true);
//          }
//          var d_customerUrl = $.trim(data.customerUrl);
//          // d_customerUrl = "";
//          if (d_customerUrl) {
//              customerUrl = d_customerUrl;
//          } else {
//              customerUrl = "javascript:popTips(\"暂未开通客服系统\", \"error\")";
//          }
//          setTimeout(function () {
//              $('a.customer_url').attr('target', '_blank').attr('href', customerUrl);
//          }, 500);
//      },
//      error: function (XMLHttpRequest, textStatus, errorThrown) {
//          initUser = true;
//          getUserInfoTimeOutId = setTimeout(function () {
//              getUserInfo();
//          }, 3000);
//      }
//  });
}

var loginDiv = function () {
    if (!initUser) {
        setTimeout(function () {
            loginDiv();
        }, 100);
        return;
    }

    if (currentUrl.indexOf("login.html") == -1) {
        if ($(".login-yes").length < 1) {
            setTimeout(function () {
                loginDiv();
            }, 100);
            return;
        }
    }

    if (user) {
        if (currentUrl.indexOf("login.html") != -1) {
            window.location.href = "/index.html";
        } else {
            $(".login-yes").show();
            displayAgent();
            cleanPhoneLogin();
        }
    } else {
        if ($(".hb-icon-start").length > 0) {
            $(".hb-icon-start").remove();
            $("#hongbao").remove();
        }
        if ($('.hb-paihang').length > 0) {
            $('.hb-paihang').hide();
        }
        if (currentUrl.indexOf("login.html") == -1) {
            window.location.href = "/login.html";
        }
    }
};
//统一弹出框
var systemLayerIndex;
/**
 * 弹出提示
 * @param message 消息
 * @param level 等级:waring-提示 error-错误 succeed-成功
 * @param title 标题
 * @param callFunction 关闭弹窗回调函数
 */
function popTips(message, level, title, callFunction) {
    closeSystemLayer();
    way.set("tips.title", title ? title : '温馨提示');
    $("#tips .pop-text").html(message);
    var tipsObj = $('#tips .pop-title i');
    tipsObj.removeClass();
    tipsObj.addClass('ico-' + (level ? level : 'error'));
    var type = typeof callFunction === 'function';
    var end = null;
    if (type) {
        end = callFunction;
    }

    var contents = $("#tips");
    systemLayerIndex = layer.open({
        type: 1,
        title: false, //不显示标题
        content: contents,
        end: end
    });

    // $("#tips .aar-center .aar-but .confirm")[0].focus();
}
// 关闭弹框
function closeSystemLayer() {
    layer.close(systemLayerIndex);
}

/**
 * 刷新验证码
 */
function refreshValicode() {
    $(".valicodeimg").attr("src", "/ct-data/acegi/captcha?" + (new Date()).getTime());
}

/**
 * 用户登录
 */
function login() {
    var username = way.get("username");
    var password = way.get("password");
    var validateCode = way.get("validateCode");
    if (!username) {
        popTips('请输入用户名', 'waring');
        return;
    }
    if (!password) {
        popTips('请输入密码', 'waring');
        return;
    }
    if (!validateCode) {
        popTips('请输入验证码', 'waring');
        return;
    }

    $(".dla div.dl span").text("登录中...");
    $(".dla").removeAttr("onclick");
//  $.ajax({
//      url: "/ct-data/acegi/j_acegi_security_check",
//      type: "post",
//      dataType: "json",
//      async: false,
//      data: {
//          "j_username": username,
//          "j_password": password,
//          "ua": "web",
//          "validateCode": validateCode
//      },
//      success: function (data) {
//          if (data.sign === true) {
//              // var gaSwitch = data.isBindGa;
//              var userNameSwitch = data.isBindBank;
//              if (userNameSwitch == true) {//用户是否需要GA验证，是否需要银行卡验证
//                  var tipsContent = "";
//                  $("select option[value = 'ga']").remove();
//                  if (userNameSwitch) {
//                      $("select option[value = 'noSelect']").remove();
//                      $("select option[value = 'userName']").attr("selected", true);
//                      tipsContent = "输入银行卡姓名";
//                  } else {
//                      $("select option[value = 'userName']").remove();
//                  }
//                  $("#loginDifferentPlaceTips .aar-title").text(tipsContent);
//                  way.set('j_username', username);
//                  way.set('user_password', password);
//                  pop('loginDifferentPlaceTips');
//              } else {
//                  if (password === 'a123456') {
//                      popTips('您目前的登录密码是平台系统默认的初始密码。为了您的资金安全，请您马上修改！', 'error', '');
//                  }
//                  loginInitData(data);
//              }
//          } else {
//              var message = data.message;
//              if (data.errorCount) {
//                  message += "<br>您已经输错" + data.errorCount + "次密码"
//                      + "<br>错误6次将被冻结账户";
//              }
//              popTips(message, 'error');
//          }
//      },
//      error: function (XMLHttpRequest, textStatus, errorThrown) {
//          popTips('登录失败！', 'error');
//      },
//      complete: function (XMLHttpRequest, status) {
//          refreshValicode();
//          $(".dla div.dl span").text("登录");
//          $(".dla").attr("onclick", "login();");
//          if (status == 'timeout') { // 超时,status还有success,error等值的情况
//              ajaxTimeOut.abort(); // 取消请求
//              popTips('登录超时！', 'error');
//          }
//      }
//  });
}

//异地登录验证
function loginDifferentPlace() {
    var loginType = $("#loginDifferentPlaceCheckType").val();
    var j_password = $("#j_password").val();
    var j_username = way.get("j_username");
    if (loginType == null || loginType == '') {
        popTips('请选择验证类型', 'error');
        return;
    }
    if (j_password == null || j_password == '') {
        popTips('请填写验证码或银行卡姓名', 'error');
        return;
    }
    if (j_username == null || j_username == '') {
        return;
    }
//  jQuery.ajax({
//      url: '/ct-data/acegi/loginDifferentPlaceCheck',
//      dataType: 'json',
//      type: 'POST',
//      async: false,
//      data: {
//          loginType: loginType,
//          j_username: j_username,
//          j_password: j_password
//      },
//      success: function (data) {
//          if (data.sign) {
//              var user = data.UserUser;
//              var password = way.get('user_password');
//              if (password === 'a123456') {
//                  popTips('您目前的登录密码是平台系统默认的初始密码。为了您的资金安全，请您马上修改！', 'error', '', function () {
//                      loginInitData(data);
//                  });
//              } else {
//                  loginInitData(data)
//              }
//              if (getCookie("bcmm") == "yes") {
//                  delCookie("userinfo");
//                  setPublicCookie("userinfo", "username_" + username + "password_" + password, 365);
//              } else {
//                  delCookie("userinfo");
//              }
//          } else {
//              popTips('谷歌验证码或银行卡名错误，登录失败！', 'error', '', function () {
//                  logout();
//              });
//          }
//      }
//  });
}


/**
 * 会员在登录账号时，识别该登录密码是不是我们系统默认的密码a123456，如果识别是，则跳出提示框
 */
function loginInitData(data) {
    if (gotoPreviousUrl()) {
        return;
    }
    user = data.UserUser;
    initUser = true;
    $.session.set("loginname", user.loginname);
    way.set("user", user);
    dsFlushBalance();
    way.set("username", '');
    way.set("password", '');
    way.set("validateCode", '');
    loginDiv();
}


/**
 * 密码输入框按键监听
 * @param e 事件对象
 */
function loginEnter(e) {
    if (e.keyCode == 13) {
        login();
        if (window.event) {
            window.event.returnValue = false;
        } else {
            e.preventDefault();
        }
    }
}

/**
 * 用户退出
 */
function logout() {
    if (!user) {
        gotoIndex(true);
        return;
    }

    $.ajax({
        url: "/ct-data/acegi/j_acegi_logout",
        type: "post",
        dataType: "json",
        data: {},
        success: function (data) {
            if (data.sign === true) {
                $.session.remove("loginname");
                $.session.remove("balance");
                $.session.remove("messageCount");
                window.location.reload();
                gotoIndex(false);
                if ($(".hb-icon-start").length > 0) {
                    $(".hb-icon-start").remove();
                    $("#hongbao").remove();
                }
                if ($('.hb-paihang').length > 0) {
                    $('.hb-paihang').hide();
                }
            } else {
                popTips(data.message ? data.message : '退出失败', 'error');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            window.location.reload();
        }
    });
}

/**
 * 清空用户信息
 * @param isHideLoginDiv 是否隐藏用户登录窗口
 */
function cleanUserInfo(isHideLoginDiv) {
    var loginDiv = $(".loin");
    var loginYesDiv = $(".loin-yes");

    user = null;
    way.set("useraccount", null);
    way.set("user", null);
    way.set("username", '');
    way.set("password", '');
    way.set("validateCode", '');

    if (isHideLoginDiv) {
        loginDiv.hide();
    } else {
        loginDiv.show();
    }
    loginYesDiv.hide();

    clearTimeout(dsFlushIndex);
}

/**
 * 跳转到首页
 * @param isSaveUrlInCookie 是否保存当前链接
 * @param isHideLoginDiv    是否隐藏用户登录窗口
 */
function gotoIndex(isSaveUrlInCookie, isHideLoginDiv) {
    cleanUserInfo(isHideLoginDiv);
    if (isSaveUrlInCookie) {
        // alert("set cookie");
        if (currentUrl.indexOf("register.html") < 0 && currentUrl.indexOf("xianlu.html") < 0 && currentUrl.indexOf("404.html") < 0 && currentUrl.indexOf("500.html") < 0 && currentUrl.indexOf("IPlimit.html") < 0) {
            setPublicCookieMin("previousUrl", currentUrl, 3);
        }
    }
    if (currentUrl.indexOf("/game/") >= 0 || currentUrl.indexOf("/memberHome/") >= 0) {
        window.location.href = currentRootDirectory + "/index.html";
        return;
    }
    refreshValicode();
}

/**
 * 跳转到上一页
 * @returns true or false
 */
function gotoPreviousUrl() {
    var pathname = window.location.pathname;
    if (previousUrl && previousUrl.length > 0 && (!pathname || pathname.length <= 1 || pathname.indexOf('index.html') >= 0)) {
        delCookie("previousUrl");
        if (previousUrl.length <= 1) {
            window.location.href = currentRootDirectory + "/index.html";
            return true;
        }
        window.location.href = currentRootDirectory + previousUrl;
        return true;
    } else {
        window.location.href = currentRootDirectory + "/index.html";
    }
}

// 是否“显示”领取红包信息
var isShowRedpacket = true;


/**
 * 获取用户可用余额
 */
function dsFlushBalance() {
    clearTimeout(dsFlushIndex);
    if (!user) {
        gotoIndex(true);
        return;
    }

//  $.ajax({
//      url: "/ct-data/front/dsFlush",
//      type: "post",
//      dataType: "json",
//      success: function (msg) {
//          if (msg.sign) {
//              var useraccounts = '';
//              if (msg.useraccounts && msg.useraccounts.length > 0) {
//                  for (var i = 0; i < msg.useraccounts.length; i++) {
//                      if (msg.useraccounts[i].currency == 'rmb') {
//                          useraccounts = msg.useraccounts[i];
//                      }
//                  }
//              }
//              way.set("useraccount", useraccounts);
//              if (!way.get("totalBalance")) {
//                  way.set("totalBalance", (parseFloat(useraccounts.balance) + parseFloat(useraccounts.commission)).toFixed(4));
//              }
//              $.session.set("balance", useraccounts.balance);
//              $("#session_balance").text(msg.useraccounts.balance);
//              if ($.session.get("loginname")) {
//                  $("#session_loginname").text($.session.get("loginname"));
//              }
//
//              var oldMessageCount = way.get("messageCount");
//              if (!oldMessageCount) {
//                  oldMessageCount = 0;
//              }
//              way.set("messageSentCount", msg.countS);
//              way.set("messageReceCount", msg.countR);
//              var messageCount = parseInt(msg.countS) + parseInt(msg.countR);
//              way.set("messageCount", messageCount + "");
//
//              $.session.set("messageCount", messageCount + "");
//              $("#session_messageCount").text(messageCount);
//
//              if (messageCount > oldMessageCount) {
//                  audioPlay(3);
//              }
//
//              if ((isOpenRedMark == true || isOpenRedMark == 'true') && isShowRedpacket) {
//                  if (msg.redPacketlist && msg.redPacketlist.length > 0) {
//                      if ($("#redPacketDrag").length <= 0) {
//                          var html = '<div class="hongbao" id="hongbao" style="display: none"> <div class="hb-chai" > <p>恭喜发财，大吉大利</p> '
//                          html += '<input type="hidden" value="0" id="isClosedPop">'
//                          html += '<a class="hb-linqu" onclick ="getSendRedPacket(event,\'' + msg.redPacketlist[0] + '\')">立即领取</a></div><div class="hb-kai" style="display: none;">'
//                          html += '<p class="zi">恭喜您获得现金红包</p><p>￥<span id="prizeMoneys">50</span> <small>元</small></p></div>'
//                          html += '<a class="hb-close" href="javascript:;" onclick="closePop()"></a></div>'
//                          // <!--红包小图标-->
//                          $('body').append(html);
//                          $('body').append('<div id="redPacketDrag"> <div class="hb-icon-start">'
//                              + '<em class="closeem"></em>'
//                              + '</div></div> ');
//                      } else {
//                          if ($("#isClosedPop").val() == 1) {
//                              return;
//                          }
//                          $(".hb-chai").css("display", "block");
//                          $('.hb-kai').hide();
//                          $("#hongbao").find('.hb-linqu').attr('onclick', "getSendRedPacket(event,'" + msg.redPacketlist[0] + "')");
//                          $("#isClosedPop").val(0);
//                      }
//
//                      if (typeof $("#redPacketDrag").draggable == 'function') {
//                          // 2017-09-06 新增红包拖拽
//                          $("#redPacketDrag").draggable({
//                              containment: "document",
//                              zIndex: '999999',
//                              stop: function (event, ui) {
//                                  $("#redPacketDrag").css({'zIndex': '999999'});
//                                  $("#redPacketDrag .hb-icon-start").off('click');
//                              }
//                          });
//                      }
//
//                      $("body").on('click', '#redPacketDrag .closeem', function (event) {
//                          $("#redPacketDrag").hide();
//                          isShowRedpacket = false;
//                          event.stopPropagation();
//                      });
//
//                      $("body").on('click', '#redPacketDrag .hb-icon-start', function () {
//                          pop('hongbao');
//                      });
//
//                  } else {
//                      if ($("#redPacketDrag").length > 0) {
//                          $('#hongbao').remove();
//                          $("#redPacketDrag").remove();
//                          closelayer();
//                      }
//                  }
//              } else {
//                  if ($("#redPacketDrag").length > 0) {
//                      $('#hongbao').remove();
//                      $("#redPacketDrag").remove();
//                      closelayer();
//                  }
//              }
//              dsFlushIndex = setTimeout(function () {
//                  dsFlushBalance();
//              }, 10000);
//
//              if (msg.promp) {
//                  openPromp(msg.promp);
//              }
//          } else {
//              popTips('账户在其他地方登录，为保证账户安全，请及时更改密码', "error", '', function () {
//                  // getUserInfo();
//                  window.location.href = currentRootDirectory + "/login.html";
//              });
//          }
//      },
//      error: function () {
//          getUserInfo();
//      }
//  });
}


/********************************************* 红包 start***************************************************************/

var isOpenRedMark = '';
var redPacketPassword = '';
//获取是否开启红包活动
function isOpenRedPacket() {
//  $.ajax({
//      url: "/ct-data/front/redPacket/redPacketSwitch",
//      type: "post",
//      dataType: "json",
//      success: function (data) {
//          if (data.sign == true) {
//              if (data.redPacket == true) {
//                  isOpenRedMark = true;
//              } else {
//                  isOpenRedMark = false;
//              }
//              if (data.redPacketPassword == true) {
//                  redPacketPassword = true;
//              } else {
//                  redPacketPassword = false;
//              }
//          } else {
//              isOpenRedMark = false;
//              redPacketPassword = false;
//          }
//          checkProxy(isOpenRedMark, redPacketPassword);
//      },
//      error: function (XMLHttpRequest, textStatus, errorThrown) {
//          setTimeout(function () {
//              // isOpenRedPacket();
//          }, 3000);
//      }
//  });
}
//检测是否拥有权限进行发红包
function checkProxy(isOpenRedMark, redPacketPassword) {
//  $.ajax({
//      url: "/ct-data/acegi/getLoginUser",
//      type: "post",
//      dataType: "json",
//      success: function (data) {
//          if (data.sign == true) {
//              if (isOpenRedMark == true || isOpenRedMark == 'true') {
//                  $('.hb-paihang').show();
//                  user = data.UserUser;
//                  if (user.proxy == 1) {
//                      // 代理
//                      if ($("#sendredpacket_true_example").length > 0) {
//                          $("#sendredpacket_true_example").show();
//                      } else {
//                          $("#J_m_nav .login-yes li").eq(0).append('<a  class="header_a" id="sendredpacket_true_example" onclick="openHongbao()">发红包</a>');
//                      }
//
//                      if ($('#fahongbao').length > 0) {
//
//                      } else {
//                          var html = '<div id="fahongbao" class="aar" style="display:none;"><div class="aar-center">';
//                          html += '<div class="aar-title"><span>发红包</span><a class="aar-close" href="javascript:;" onclick="closelayer()"><i class="demo-icon icon-ios-close-empty member-close"></i></a></div>';
//                          html += ' <div class="tishik"><dl class="validate-form fahongbao"><dd><span class="tt">红包金额：</span> <span class="position_hb">';
//                          html += '<b class="dred">￥</b>'
//                          html += '<input onkeyup="replaceAndSetPos(this,event,/[^\\d|^\\.]/,\'\');" id="RedbagAmount" class="inp-sty-1" type="text" value="" placeholder="总金额"></span>';
//                          html += '</dd><dd><span class="tt">红包描述：</span><span><input  id="theme" class="inp-sty-1" type="text" value="恭喜发财，大吉大利。" placeholder="恭喜发财，大吉大利。" readonly="readonly" maxlength="30"></span>';
//                          html += '</dd><dd><span class="tt">红包类型：</span><div class="agenRadio ym-gl"><select class="redlist_type" onchange="changeRedTypeNav(this)">';
//                          html += '<option value="person">个人红包</option><option value="psq">群红包（拼手气）</option><option value="jf">群红包（均分）</option></select>';
//                          html += '</div> </dd><dd><div class="single_person"><span class="tt">下属名单：</span><div class="agenRadio ym-gl">';
//                          html += '<select class="redlist_user type" id="DownUser2"></select></div></div><div class="group_person" style="display:none;">';
//                          html += '<span class="tt">接收人群：</span><div class="agenRadio ym-gl"><select class="type"><option value="all">平台用户</option>';
//                          html += '<option value="down">下属用户</option></select></div></div></dd><dd class="group_person" style="display: none"><span class="tt">红包数量：</span>';
//                          html += '<span><input  id="red_count" onkeyup="replaceAndSetPos(this,event,/[^0-9]/g,\'\');"   class="inp-sty-1" type="text" value="" placeholder="请输入红包个数"></span>'
//                          html += '</dd><dd  style="display: none"><span class="tt">资金密码：</span><span>';
//                          html += ' <input  id="th_password"  class="inp-sty-1" type="password" value="" placeholder="请输入资金密码"></span></dd></dl></div>';
//                          html += '<div class="aar-but qr"><a class="btn-xgmm" href="javascript:;" onclick="sendRedPacket(event);">塞钱进红包</a></div></div></div>';
//                          $('body').append(html);
//                      }
//                      $("#redPacketReport").show();
//                      $("#redPacketSend").show();
//                  } else {
//                      $("#sendredpacket").hide();
//                      $("#redPacketSend").show();
//                      $("#redPacketReport").hide();
//                  }
//                  if (redPacketPassword == true || redPacketPassword == 'true') {
//                      $("#th_password").parent().parent().show();
//                  } else {
//                      $("#th_password").parent().parent().hide();
//                  }
//              } else {
//                  $('.hb-paihang').hide();
//                  $("#sendredpacket_true_example").hide();
//                  $("#redPacketReport").hide();
//                  $("#redPacketSend").hide();
//              }
//
//          }
//      }
//  });
}
function redEnvelope(rankType) {
//  var rankType = rankType ? rankType : 'day';
//  $.ajax({
//      url: "/ct-data/front/redPacket/redPacketRank",
//      type: "post",
//      dataType: "json",
//      data: {rankType: rankType},
//      success: function (data) {
//          if (data.sign == true) {
//              var html1 = '';
//              var html2 = '';
//              if (rankType == 'day') {
//                  if (data.data.sentData.length > 0) {
//                      for (var i = 0; i < data.data.sentData.length && i <= 9; i++) {
//                          var q = i + 1;
//                          html1 += '<li><i>' + q + '</i><span>' + data.data.sentData[i].sentName + '</span><em>￥' + data.data.sentData[i].amount + '</em></li>'
//                      }
//                      $(".send_envelope_day ul").html(html1);
//                  }
//                  if (data.data.receData.length > 0) {
//                      for (var i = 0; i < data.data.receData.length && i <= 9; i++) {
//                          var q = i + 1;
//                          html2 += '<li><i>' + q + '</i><span>' + data.data.receData[i].receName + '</span><em>￥' + data.data.receData[i].amount + '</em></li>'
//                      }
//                      $(".get_envelope_day ul").html(html2);
//                  }
//              }
//              if (rankType == 'all') {
//                  if (data.data.sentData.length > 0) {
//                      for (var i = 0; i < data.data.sentData.length && i <= 9; i++) {
//                          var q = i + 1;
//                          html1 += '<li><i>' + q + '</i><span>' + data.data.sentData[i].sentName + '</span><em>￥' + data.data.sentData[i].amount + '</em></li>'
//                      }
//                      $(".send_envelope_all ul").html(html1);
//                  }
//                  if (data.data.receData.length > 0) {
//                      for (var i = 0; i < data.data.receData.length && i <= 9; i++) {
//                          var q = i + 1;
//                          html2 += '<li><i>' + q + '</i><span>' + data.data.receData[i].receName + '</span><em>￥' + data.data.receData[i].amount + '</em></li>'
//                      }
//                      $(".get_envelope_all ul").html(html2);
//                  }
//              }
//          }
//      }
//  });
}
//领取红包
//var isHasredPacket;
function getSendRedPacket(e, id) {
 $(e.target).removeAttr("onclick");
//  $.ajax({
//      url: '/ct-data/front/redPacket/getRedPacket',
//      type: 'post',
//      dataType: 'json',
//      data: {id: id},
//      success: function (data) {
//          if (data.sign) {
//              $("#isClosedPop").val(1)
//              $("#prizeMoneys").text(data.amount ? data.amount : 0);
//              $(".hb-chai").hide();
//              $(".hb-kai").show();
//              clearTimeout(isHasredPacket);
//              isHasredPacket = setTimeout(function () {
//                  if ($("#isClosedPop").val() == 1) {
//                      closePop();
//                  }
//              }, 4000);
//          } else {
//              if (data.message.indexOf('关闭') > -1) {
//                  isOpenRedPacket();
//              }
//              popTips(data.message, "warning", '', function () {
//                  closePop();
//              });
//          }
//      },
//      error: function () {
//          $(e.target).attr("onclick", "getSendRedPacket(event,'" + id + "');");
//      }
//  })
}

/**
 * 获取红包下属列表
 */
//var downUserCount = 0;
//function gethbDownUserList(mark) {
//  var thisPanl = $("#DownUser");
//  var thisPanl2 = $("#DownUser2");
//  thisPanl.empty();
//  thisPanl2.empty();
//  $.ajax({
//      url: "/ct-data/user/getDownUser",
//      type: "post",
//      dataType: "json",
//      success: function (msg) {
//          thisPanl.empty();
//          if (msg.sign === true) {
//              var users = msg.data;
//              var html = '';
//              var html2 = '<option value="">全部</option>';
//
//              downUserCount = users.length;
//              for (var i = 0; i < users.length; i++) {
//                  html += '<option value="' + users[i].id + '">' + users[i].loginname + '</option>';
//                  html2 += '<option value="' + users[i].id + '">' + users[i].loginname + '</option>';
//              }
//              thisPanl2.html(html);
//              thisPanl.html(html2);
//          } else {
//              downUserCount = 0;
//          }
//      },
//      error: function (XMLHttpRequest, textStatus, errorThrown) {
//          downUserCount = 0;
//      }
//  });
//}

/**
 * 类型选择
 */
function changeRedTypeNav(dom) {
    var value = $(dom).val();
    if (value == "person" || value == 1) {
        $(".single_person").show();
        $('.single_person').find('.type').addClass('redlist_user');
        $(".group_person").hide();
        $('.group_person').find('.type').removeClass('redlist_user');
        $("#red_count").val('');
    } else {
        $(".single_person").hide();
        $('.single_person').find('.type').removeClass('redlist_user');
        $(".group_person").show();
        $('.group_person').find('.type').addClass('redlist_user')
    }
}

/**
 * 塞钱进红包
 */
function sendRedPacket(e) {
    var amount = $("#RedbagAmount").val();
    var theme = $("#theme").val();
    var receId = '';
    $(".redlist_user").each(function () {
        if ($(this).val() != '') {
            receId = $(this).val();
        }
    })
    var count = $("#red_count").val();
    var password = $("#th_password").val();
    var type = 0;
    if (!amount || amount.length < 1) {
        popTips("请输入红包金额", "waring");
        return;
    }
    if (amount > parseFloat(way.get('totalBalance'))) {
        popTips("余额不足", "waring");
        return;
    }
    var reg = /^[0-9]*[\.][0-9]{3,}$/;
    if (reg.test(amount)) {
        popTips("红包金额最小单位为分，如12.6或100.08，请重新调整红包金额。", 'waring');
        return;
    }
    if (!theme) {
        theme = "恭喜发财，大吉大利。";
    }
    if (theme.length > 30) {
        popTips("红包描述不能为空且不能超过30字", "waring");
        return;
    }
    if (!receId) {
        popTips("请选择接收人群或者下属", "waring");
        return;
    }
    if (receId != 'all' && receId != 'down') {
        type = 1;
    } else {
        var val = '';
        $(".redlist_type").each(function () {
            if ($(this).val() != '') {
                val = $(this).val();
            }
        })
        if (val == 'psq') {
            type = 3;
        } else if (val == 'jf') {
            type = 2;
        }
    }
    var sendData = {
        receId: receId,
        amount: amount,
        theme: theme,
        type: type,
    };
    if (type == 2 || type == 3) {
        if (!count || count < 0) {
            popTips("数量不能为空且不能小于0", "waring");
            return;
        }
        var r = /^[-+]?\d*$/;
        if (!r.test(count)) {
            popTips("数量只能为整数", "waring");
            return false;
        }
        sendData.count = count ? count : 1;
    } else {
        count = count ? count : 1;
    }
    if ($("#th_password").parent().parent().is(":visible")) {
        if (!password) {
            if (password.length < 6 || password.length > 12) {
                popTips("资金密码不能为空", "waring");
                return false;
            }
        }
        if (password.length < 6 || password.length > 12) {
            popTips("密码长度6-12位字符", "waring");
            return false;
        }
        sendData.password = password;
    }
    $(e.target).removeAttr("onclick");
//  $.ajax({
//      url: "/ct-data/front/redPacket/sendRedPacket",
//      type: "post",
//      dataType: "json",
//      data: sendData,
//      success: function (msg) {
//          if (msg.sign) {
//              closePop();
//              $("#RedbagAmount").val('');
//              $("#theme").val('');
//              $("#red_count").val('');
//              $("#th_password").val('');
//              popTips(msg.message, "succeed");
//          } else {
//              popTips(msg.message, "error");
//          }
//      },
//      error: function (XMLHttpRequest, textStatus, errorThrown) {
//          $(e.target).attr("onclick", "sendRedPacket(event);");
//          popTips("发送红包失败", "error");
//      },
//      complete: function () {
//          $(e.target).attr("onclick", "sendRedPacket(event);");
//      }
//  });
}
//关闭弹框
function closePop() {
    $("#isClosedPop").val(0);
    $(".hb-chai").hide();
    $(".hb-kai").hide();
    closelayer();
    if ($("#hongbao").is(":hidden") == false && $("#hongbao").length > 0) {
        closelayer();
    }
    dsFlushBalance();
}
function openHongbao() {
    gethbDownUserList();
    pop('fahongbao');
}

/********************************************* 红包 end***************************************************************/

// 弹出充值、提款成功或失败提示
var prompTipsHtml = [];
var prompTipsHtmlIndex = 0;
var delPrompTipsHtmlIndex = 0;

function openPromp(promp) {
    prompTipsHtmlIndex = 0;
    delPrompTipsHtmlIndex = 0;

    var prompArray = promp.split("&");

    for (var i = 0; i < prompArray.length; i++) {
        if ($("#prompCompleteTips" + i).length > 0) {
            $("#prompCompleteTips" + i).remove();
        }

        var promps = prompArray[i].split("^");

        var html = '';
        html += '<div id="prompCompleteTips' + i + '" class="touzhuzj" style="display:none;">';
        html += '<h2>' + promps[0] + '</h2>';
        html += '<ul>';
        if (promps[1]) {
            html += '<li>状态：<span>' + (promps[1] == 2 ? '成功' : '失败') + '</span></li>';
        }
        html += '<li>金额：<span>' + promps[2] + '元</span></li>';
        html += '<li>手续费：<span>' + promps[3] + '元</span></li>';
        html += '<li>时间：<span>' + promps[4] + '</span></li>';
        // if (promps[5]) {
        //     html += '<li>方式：<span>' + promps[5] + '</span></li>';
        // }
        if (promps[1] == -2 && promps[6]) {
            html += '<li>提示信息：<span>' + promps[6] + '</span></li>';
        }
        html += '</ul>';
        html += '</div>';

        $("body").append(html);

        setTimeout(function () {
            audioPlay(4);
            $("#prompCompleteTips" + prompTipsHtmlIndex).html($("#prompCompleteTips" + prompTipsHtmlIndex).html()).show(300).delay(10000).hide(300);
            setTimeout(function () {
                $("#prompCompleteTips" + delPrompTipsHtmlIndex).remove();
                delPrompTipsHtmlIndex++;
            }, 10600);
            prompTipsHtmlIndex++;
        }, 10600 * i);
    }
}

/**
 * 打开菜单链接
 * @param menuUrl 链接地址
 * @param isCheck 是否要检查用户登录与否
 * @param newWin 是否在新窗口打开
 */
function openMenuUrl(menuUrl, isCheck, newWin) {
    // if (isCheck === true && !initUser) {
    //     setTimeout(function () {
    //         openMenuUrl(menuUrl, isCheck, newWin);
    //     }, 100);
    //     return;
    // }
    // if (isCheck === true && !user) {
    //     popTips('用户未登录', 'error');
    //     setTimeout(function () {
    //         gotoIndex(true);
    //     }, 2000);
    //     return;
    // }

    if (newWin === true) {
        window.open(menuUrl);
    } else {
        window.location.href = menuUrl;
    }
}

/**
 * 写入当前页面cookies
 * @param name
 * @param value
 * @param days
 */
function setCookie(name, value, days) {
    var exp = new Date();
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

/**
 * 写入网站全局cookies
 * @param name
 * @param value
 * @param days
 */
function setPublicCookie(name, value, days) {
    setPublicCookieMin(name, value, days * 24 * 60);
}

/**
 * 写入网站全局cookies
 * @param name
 * @param value
 * @param mins
 */
function setPublicCookieMin(name, value, mins) {
    var exp = new Date();
    exp.setTime(exp.getTime() + mins * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}

/**
 * 读取cookies
 * @param name
 * @returns
 */
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    arr = document.cookie.match(reg);

    if (arr) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}

/**
 * 删除cookies
 * @param name
 */
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval) {
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}

/**
 * 获取当前时间
 */
function getCurrentTime() {
    var currentTime = $.format.date(new Date(), "yyyy-MM-dd HH:mm:ss");
    way.set("currentTime", "GMT +8 " + currentTime);
    $('#currentTime').html("GMT +8 " + currentTime + '&nbsp;|&nbsp;');
    setTimeout(function () {
        getCurrentTime();
    }, 1000);
}

/**
 * 进入账务中心
 * @param financeCode 账务中心子模块代码
 * @param outPlatformCode 转出账户代码
 */
function transferFinance(financeCode, outPlatformCode) {
    if (!initUser) {
        setTimeout(function () {
            transferFinance(financeCode, outPlatformCode);
        }, 100);
        return;
    }
    if (!user) {
        popTips('用户未登录', 'error');
        setTimeout(function () {
            gotoIndex(true);
        }, 2000);
        return;
    }

    var searchStr = "";
    if (outPlatformCode) {
        searchStr = "?outCode=" + outPlatformCode;
    }
    if (financeCode) {
        if (outPlatformCode) {
            searchStr += "&financeCode=" + financeCode;
        } else {
            searchStr = "?financeCode=" + financeCode;
        }
    }
    window.location.href = currentRootDirectory + '/view/memberHome/memberFinance.html' + searchStr;
}

/**
 * 加法函数，用来得到精确的加法结果
 * @param arg1 第一个加数
 * @param arg2 第二个加数
 * @param arg3 要保留的小数位数(默认: 2)
 * @return {number}
 */
function  addSum (arg1, arg2, arg3) {
    var arg1 = arg1.toString(),
        arg2 = arg2.toString();
    var arg1Arr = arg1.split("."), arg2Arr = arg2.split("."), d1 = arg1Arr.length == 2 ? arg1Arr[1] : "",
        d2 = arg2Arr.length == 2 ? arg2Arr[1] : "";
    var maxLen = Math.max(d1.length, d2.length);
    var m = Math.pow(10, maxLen);
    var result = Number(((arg1 * m + arg2 * m) / m).toFixed(maxLen));
    var d = (typeof arg3 === "undefined" ? 2 : arg3);
    return typeof d === "number" ? Number((result).toFixed(d)) : result;
}
var geting = false;
//订单详情
function getBillInfo(billNo, bill_type) {
    if (geting) {
        setTimeout(function () {
            geting = false;
        }, 500);
        return;
    }
    geting = true;
    var tabs = $(".zhdd").find("tbody");
    tabs.empty();
    var html = '<tr>' +
        '<th>订单号</th>' +
        '<th>期号</th>' +
        '<th>投注金额</th>' +
        '<th>倍数</th>' +
        '<th>状态</th>' +
        '<th>中奖金额</th>' +
        '<th>开奖号码</th>' +
        '<th>操作</th>' +
        '</tr>';
    var batchTag = false;
//  $.ajax({
//      url: "/ct-data/userBets/showDetails",
//      type: "post",
//      dataType: "json",
//      data: {
//          "billNo": billNo
//      },
//      success: function (data) {
//          if (data.sign === true) {
//              var tag = false;
//              var billno = data.data.billno;
//              var betsTimes = data.data.betsTimes; //	下单时间
//              var showName = data.data.showName; // 彩种名称
//              var ruleName = data.data.ruleName; //	玩法名称
//              var expect = data.data.expect; //	期号
//              var codes = data.data.codes; //	购买号码
//              var multiple = data.data.betsOdds; //	倍数
//              if (!multiple) {
//                  multiple = data.data.multiple;
//              }
//              var priceModel = data.data.priceModel; //	元角分模式
//              var prizeModel = data.data.prizeModel; //	奖金模式
//              var selectPoint = data.data.selectPoint; //	返点
//              var openCode = data.data.openCode; //	开奖号码
//              var betsMoney = data.data.betsMoney; //	金额
//              var stopChase = data.data.stopChase; //	中奖后是否停止追号
//              var chaseBillno = data.data.chaseBillno; //	追加单号
//              var prizeTime = data.data.prizeTime; //	追加期数
//              var prizeMoney = data.data.prizeMoney; //	奖金
//              var allowCancel = data.data.allowCancel; //	是否可以撤单
//              var shortName = data.data.shortName;
//              var state = data.data.state; //	状态
//              if (codes) {
//                  var index = codes.indexOf(' ');
//                  if (index > 0) {
//                      var str = codes.substring(0, index);
//                      if (str != null && str.indexOf(',') > 0) {
//                          str = codes.substring(0, str.indexOf(','));
//                      }
//                      if (str.length == 1) {
//                          //codes = codes.replace(/ /g, '');
//                      }
//                  }
//              }
//              if (allowCancel && user.id == data.data.userId) {
//                  $("#batchCancel1").show();
//                  $("#batchCancel1").empty();
//                  $("#batchCancel1").append('<a class="butsty1" href="javascript:void(0);" onclick="javascript:billCancel(\'' + billno + '\',\'order\',\'' + bill_type + '\')">撤销订单</a>');
//
//              } else {
//                  $("#batchCancel1").hide();
//              }
//
//              way.set("billno", billno);
//              way.set("betsTimes", betsTimes);
//              way.set("showName", showName);
//              way.set("ruleName", ruleName);
//              way.set("expect", expect);
//              way.set("codes", codes);
//              way.set("multiple", multiple);
//              way.set("priceModel", priceModel);
//              way.set("prizeModel", prizeModel);
//              $("#selectPoint").text(selectPoint);
//              $("#openCode").text(openCode);
//              way.set("betsMoney", betsMoney);
//              way.set("stopChase", stopChase);
//              way.set("chaseBillno", chaseBillno);
//              way.set("prizeTime", prizeTime);
//              $("#prizeMoney").text(prizeMoney);
//              way.set("allowCancel", allowCancel);
//              way.set("state", state);
//
//              var textareacode1 = $("#textareacode1");
//              textareacode1.empty();
//              textareacode1.append(codes);
//
//              if (typeof(chaseBillno) == "undefined") {
//                  way.set("chaseBillno", data.data[0].chaseBillno);
//                  way.set("betsTimes", data.data[0].betsTimes);
//                  way.set("showName", data.data[0].showName);
//                  way.set("ruleName", data.data[0].ruleName);
//                  way.set("prizeModel", data.data[0].prizeModel);
//                  way.set("selectPoint", "" + data.data[0].selectPoint);
//                  way.set("stopChase", data.data[0].stopChase);
//
//                  way.set("priceModel", data.data[0].priceModel);
//
//                  way.set("betsMoney", data.data[0].betsMoney);
//                  way.set("codes", data.data[0].codes);
//
//                  var textareacode2 = $("#textareacode2");
//                  textareacode2.empty();
//                  textareacode2.append(data.data[0].codes);
//                  var count = 0;
//                  var bmoney = 0;
//
//                  $.each(data.data, function (index, val) {
//
//                      var billno = val.billno;
//                      var betsTimes = val.betsTimes; //	下单时间
//                      var ruleName = val.ruleName; //	玩法名称
//                      var expect = val.expect; //	期号
//                      var codes = val.codes; //	购买号码
//                      var multiple = val.betsOdds; //	倍数
//                      if (!multiple) {
//                          multiple = val.multiple;
//                      }
//                      var priceModel = val.priceModel; //	元角分模式
//                      var prizeModel = val.prizeModel; //	奖金模式
//                      var selectPoint = val.selectPoint; //	返点
//                      var openCode = val.openCode; //	开奖号码
//                      var betsMoney = val.betsMoney; //	金额
//                      var stopChase = val.stopChase; //	中奖后是否停止追号
//                      var chaseBillno = val.chaseBillno; //	追加单号
//                      var prizeTime = val.prizeTime; //	追加期数
//                      var prizeMoney = val.prizeMoney; //	奖金
//                      var allowCancel = val.allowCancel; //	是否可以撤单
//                      var state = val.state;
//                      bmoney = addSum(bmoney,betsMoney,4);
//
//                      html += '<tr>';
//                      html += '<td>' + billno + '</td>';
//                      html += '<td>' + expect + '</td>';
//                      html += '<td>' + betsMoney + '</td>';
//                      html += '<td>' + multiple + '</td>';
//                      html += '<td class="state">' + state + '</td>';
//                      html += '<td>' + (prizeMoney ? prizeMoney : '0') + '</td>';
//                      html += '<td>' + openCode + '</td>';
//                      html += '<td>';
//                      if (allowCancel && user.id == val.userId) {
//                          html += '<a class="sty-h" href="javascript:void(0);" onclick="javascript:billCancel(\'' + billno + '\',\'order\',\'' + bill_type + '\')" >撤单</a>';
//                          batchTag = true;
//                      }
//                      html += '</td></tr>';
//                      count++;
//                  });
//                  way.set("betsMoney", bmoney);
//                  way.set("prizeTime", count);
//
//                  tabs.append(html);
//                  tag = true;
//
//                  if (batchTag) {
//                      $("#batchCancel").show();
//                      $("#batchCancel").empty();
//                      $("#batchCancel").append('<a class="butsty1" href="javascript:void(0);" onclick="javascript:billCancel(\'' + data.data[0].chaseBillno + '\',\'chase\',\'' + bill_type + '\')">撤销追号</a>');
//
//                  } else {
//                      $("#batchCancel").hide();
//                  }
//              }
//
//              closelayer();
//              if (tag) {
//                  pop('zhuihaoxqd');
//              } else {
//                  pop('dingdan2');
//              }
//              geting = false;
//          } else {
//              popTips("error", 'error');
//          }
//      },
//      error: function (XMLHttpRequest, textStatus, errorThrown) {
//          popTips(errorThrown, 'error');
//      }
//  });
}

//function billCancel(billNo, type, bill_type) {
//
//  $.ajax({
//      url: "/ct-data/userBets/cancel",
//      type: "post",
//      dataType: "json",
//      data: {
//          "billNo": billNo,
//          "type": type
//      },
//      success: function (data) {
//          popTips(data.message, (data.sign ? 'succeed' : 'error'));
//          if (data.sign) {
//              closelayer();
//              $(".butsty1:visible").click();
//          }
//
//
//      },
//      error: function (XMLHttpRequest, textStatus, errorThrown) {
//          popTips(errorThrown, 'error');
//      }
//  });
//}
var WPCode = {
    'shu': '鼠',
    'niu': '牛',
    'hu': '虎',
    'tu': '兔',
    'long': '龙',
    'she': '蛇',
    'ma': '马',
    'yang': '羊',
    'hou': '猴',
    'ji': '鸡',
    'gou': '狗',
    'zhu': '猪'
}

//订单详情
function getwpBillInfo(billNo, bill_type) {

    var tabs = $(".zhdd").find("tbody");
    tabs.empty();
    var html = '<tr>' +
        '<th>订单号</th>' +
        '<th>期号</th>' +
        '<th>投注金额</th>' +
        '<th>倍数</th>' +
        '<th>状态</th>' +
        '<th>中奖金额</th>' +
        '<th>开奖号码</th>' +
        '<th>操作</th>' +
        '</tr>';
    var batchTag = false;
//  $.ajax({
//      url: "/ct-data/wpUserBets/showWpDetails",
//      type: "post",
//      dataType: "json",
//      data: {
//          "billNo": billNo
//      },
//      success: function (data) {
//          if (data.sign === true) {
//              var tag = false;
//              var billno = data.data.billno;
//              var betsTimes = data.data.betsTimes; //	下单时间
//              var showName = data.data.showName; // 彩种名称
//              var ruleName = data.data.ruleName; //	玩法名称
//              var expect = data.data.expect; //	期号
//              var codes = data.data.codes; //	购买号码
//              var multiple = data.data.betsOdds; //	倍数
//              if (!multiple) {
//                  multiple = data.data.multiple;
//              }
//              var priceModel = data.data.priceModel; //	元角分模式
//              var prizeModel = data.data.prizeModel; //	奖金模式
//              var selectPoint = data.data.selectPoint; //	返点
//              var openCode = data.data.openCode; //	开奖号码
//              var betsMoney = data.data.betsMoney; //	金额
//              var stopChase = data.data.stopChase; //	中奖后是否停止追号
//              var chaseBillno = data.data.chaseBillno; //	追加单号
//              var prizeTime = data.data.prizeTime; //	追加期数
//              var prizeMoney = data.data.prizeMoney; //	奖金
//              var allowCancel = data.data.allowCancel; //	是否可以撤单
//              var shortName = data.data.shortName;
//              var state = data.data.state; //	状态
//
//              if (data.data.ruleCode.indexOf('xiao') > -1) {
//                  var c_codes = codes ? codes.split(' ') : [];
//                  var l_code = '';
//                  if (c_codes.length > 0) {
//                      for (var k = 0; k < c_codes.length; k++) {
//                          if (c_codes[k] != '') {
//                              l_code +=WPCode[c_codes[k]] + ' '
//                          }
//                      }
//                      codes = l_code
//                  }
//              } else {
//                  if (codes) {
//                      var index = codes.indexOf(' ');
//                      if (index > 0) {
//                          var str = codes.substring(0, index);
//                          if (str != null && str.indexOf(',') > 0) {
//                              str = codes.substring(0, str.indexOf(','));
//                          }
//                          if (str.length == 1) {
//                              //codes = codes.replace(/ /g, '');
//                          }
//                      }
//                  }
//              }
//              if (allowCancel && user.id == data.data.userId) {
//                  $("#batchwpCancel1").show().html('<a class="butsty1" href="#" onclick="billCanceltwo(\'' + billno + '\',\'waipan\',\'' + bill_type + '\')">撤销订单</a>');
//
//              } else {
//                  $("#batchwpCancel1").hide();
//              }
//              way.set("billno", billno);
//              way.set("betsTimes", betsTimes);
//              way.set("showName", showName);
//              way.set("ruleName", ruleName);
//              way.set("expect", expect);
//              way.set("codes", codes);
//              way.set("multiple", multiple);
//              way.set("priceModel", priceModel);
//              way.set("prizeModel", prizeModel);
//              $("#wpselectPoint").text(selectPoint);
//              $("#wpopenCode").text(openCode);
//              way.set("betsMoney", betsMoney);
//              way.set("stopChase", stopChase);
//              way.set("chaseBillno", chaseBillno);
//              way.set("prizeTime", prizeTime);
//              $("#wpprizeMoney").text(prizeMoney);
//              way.set("allowCancel", allowCancel);
//              way.set("state", state);
//              way.set("wpselectPoint", data.data.rate);
//              way.set("betsNumbers", data.data.betsNumbers?parseInt(data.data.betsNumbers):0);
//              codes = codes ? codes : '';
//              if(codes!='' && codes!=null && codes!=undefined){
//                  $('.wpcodes').html(codes);
//              }else{
//                  $('.wpcodes').html(data.data.rateName?data.data.rateName:'');
//              }
//
//              closelayer();
//              pop('waipanOrder');
//          } else {
//              popTips("error", 'error');
//          }
//      },
//      error: function (XMLHttpRequest, textStatus, errorThrown) {
//          popTips(errorThrown, 'error');
//      }
//  });
}

function billCanceltwo(billNo, waipan, bill_type) {
    var url, data;
    if (waipan == 'waipan') {
        url = '/ct-data/wpUserBets/wpCancel';
        data = {
            billNo: billNo
        }
    }
//  $.ajax({
//      url: url,
//      type: "post",
//      dataType: "json",
//      data: data,
//      success: function (data) {
//          popTips(data.message, (data.sign ? 'succeed' : 'error'));
//          if (data.sign) {
//              closelayer();
//              if (bill_type == 'changge') {
//                  accountChange();
//              } else {
//                  $('table tbody td[billno=' + billNo + ']').html('已撤单');
//              }
//          }
//      },
//      error: function (XMLHttpRequest, textStatus, errorThrown) {
//          popTips(errorThrown, 'error');
//      }
//  });
}
//显示代理管理
function displayAgent() {
    if (initUser !== true) {
        setTimeout(function () {
            displayAgent();
        }, 100);
        return;
    }

    if ($("#myAccount").length < 1) {
        setTimeout(function () {
            displayAgent();
        }, 100);
        return;
    }

    var myAccountNavHtml = '';
    myAccountNavHtml += '<li>' + $(".htlj ul li:eq(0)").html() + '</li>';
    myAccountNavHtml += '<li>' + $(".htlj ul li:eq(1)").html() + '</li>';
    myAccountNavHtml += '<li>' + $(".htlj ul li:eq(2)").html() + '</li>';

    if (user) {
        if (user.proxy && user.proxy == 1) {
            myAccountNavHtml += '<li><a href="javascript:;" onclick="openMenuUrl(\'';
            myAccountNavHtml += currentRootDirectory + '/view/memberHome/memberAgent.html\', true);">代理管理</a></li>';
        }
    }

    myAccountNavHtml += '<li class="tc"><a href="javascript:;" onclick="logout();">退出</a></li>';

    $(".htlj ul").html(myAccountNavHtml);
}

// 从Cookies中取出提示音开关状态
//function getLabaStatus(num) {
//  var audioStatus = getCookie("audioStatus" + num);
//  if (!audioStatus) {
//      audioStatus = "open";
//  }
//  return audioStatus;
//}

//在页面写入设置声音提示窗口
//function loadSettingAudio() {
//  var html = '<div id="sytips" class="aar" style="display:none;">';
//  html += '<div class="aar-center">';
//  html += '<div class="aar-title">声音设置</div>';
//  html += '<a class="aar-close" onclick="closelayer();"><i class="demo-icon"></i></a>';
//  html += '<div class="bd">';
//  html += '<div class="bd text-center">';
//  html += '<div class="pop-title sytisk">';
//  html += '<p><span><em>中奖提示音：</em><img src="' + currentRootDirectory + '/resources/yiyou/images/laba-' + getLabaStatus(1) + '.png" height="21" width="20" id="soundImage1" border="0" style="cursor: pointer;" onclick="audioMuted(1);">';
//  html += '<a class="bofang" onclick="audioPlay(1);" href="javascript:;" title="试听">播放</a></span></p>';
//  html += '<p><span><em>消息提示音：</em><img src="' + currentRootDirectory + '/resources/yiyou/images/laba-' + getLabaStatus(3) + '.png" height="21" width="20" id="soundImage3" border="0" style="cursor: pointer;" onclick="audioMuted(3);">';
//  html += '<a class="bofang" onclick="audioPlay(3);" href="javascript:;" title="试听">播放</a></span></p>';
//  html += '<p><span><em>账变提示音：</em><img src="' + currentRootDirectory + '/resources/yiyou/images/laba-' + getLabaStatus(4) + '.png" height="21" width="20" id="soundImage4" border="0" style="cursor: pointer;" onclick="audioMuted(4);">';
//  html += '<a class="bofang" onclick="audioPlay(4);" href="javascript:;" title="试听">播放</a></span></p>';
//  html += '<p><span><em>截至下注提示音：</em><img src="' + currentRootDirectory + '/resources/yiyou/images/laba-' + getLabaStatus(2) + '.png" height="21" width="20" id="soundImage2" border="0" style="cursor: pointer;" onclick="audioMuted(2);">';
//  html += '<a class="bofang" onclick="audioPlay(2);" href="javascript:;" title="试听">播放</a></span></p>';
//  html += '</div>';
//  html += '</div>';
//  html += '</div>';
//  html += '<div class="aar-but"><a href="javascript:;" onclick="closelayer();">确认</a></div>';
//  html += '</div>';
//  html += '</div>';
//
//  $("body").append(html);
//}

/**
 * 提示音资源加载
 * @param num
 *        中奖-1   截至下注就是倒计时-2   消息提示-3  充值、提款、都是、账变-4
 */
//function loadAudioSource(num) {
//  if ($("#audio" + num).length > 0) {
//      return;
//  }
//  var audioHtml = '<audio controls id="audio' + num + '" style="display:none;">' +
//      '<source src="' + currentRootDirectory + '/resources/yiyou/audio/' + num + '.mp3" type="audio/mpeg">' +
//      '<source src="' + currentRootDirectory + '/resources/yiyou/audio/' + num + '.wav" type="audio/x-wav">' +
//      '</audio>';
//  $("body").append(audioHtml);
//
//  if (getLabaStatus(num) == "close") {
//      var audio = document.getElementById("audio" + num);
//      audio.muted = true;
//  }
//}

// 打开或关闭声音提示
function audioMuted(num) {
    var audio = document.getElementById("audio" + num);
    var soundImage = $("#soundImage" + num);
    if (audio.muted) {
        audio.muted = false;
        setPublicCookie("audioStatus" + num, "open", 365);
        soundImage.attr("src", currentRootDirectory + "/resources/yiyou/images/laba-open.png")
    } else {
        audio.pause();
        audio.muted = true;
        setPublicCookie("audioStatus" + num, "close", 365);
        soundImage.attr("src", currentRootDirectory + "/resources/yiyou/images/laba-close.png")
    }
}

// 播放提示声音
function audioPlay(num) {
    var audio = document.getElementById("audio" + num);
    audio.play();
}

function getCursorPos(obj) {
    var caretPos = 0;
    if (document.selection) {
        // IE Support
        obj.focus();
        var sel = document.selection.createRange();
        sel.moveStart('character', -obj.value.length);
        caretPos = sel.text.length;
    } else if (obj.selectionStart || obj.selectionStart == '0') {
        // Firefox support
        caretPos = obj.selectionStart;
    }
    return caretPos;
}
/*
 * 定位光标
 */
function setCursorPos(obj, pos) {
    if (obj.setSelectionRange) {
        obj.focus();
        obj.setSelectionRange(pos, pos);
    } else if (obj.createTextRange) {
        var range = obj.createTextRange();
        range.collapse(true);
        // range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}

/*
 * 替换后定位光标在原处,可以这样调用onkeyup=replaceAndSetPos(this,event,/[^\d]/g,'');
 */
function replaceAndSetPos(obj, event, pattern, text) {
    var e = event ? event : (window.event ? window.event : null);
    var currKey = 0;
    currKey = e.keyCode || e.which || e.charCode;
    if (event.altKey || event.ctrlKey || currKey == 16 || currKey == 17 || currKey == 18 || (event.shiftKey && currKey == 36)) {
        return;
    }

    var pos = getCursorPos(obj); // 保存原始光标位置
    var temp = obj.value; // 保存原始值
    obj.value = temp.replace(pattern, text); // 替换掉非法值
    pos = pos - (temp.length - obj.value.length); //当前光标位置

    setCursorPos(obj, pos); //设置光标
}

/**
 * 根据name在str中取相应值
 * @param str : "id=123&code=aaa"
 * @param name
 * @returns
 */
function getQueryString(str, name) {
    if (!name) {
        return "";
    }
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = str.match(reg);
    if (r != null) {
        return (r[2]);
    }
    return "";
}

// 增加客服中心浮动窗
function addServicerHtml() {
    if (!initUser) {
        setTimeout(function () {
            addServicerHtml();
        }, 100);
        return;
    }

    var len = $(".kefu").length;
    if (len > 0) {
        for (var i = 0; i < len; i++) {
            $(".kefu").remove();
        }
    }
    var html = '<div class="kefu">'
        + '<ul>'
        + '<li class="lxkf"><a href="' + customerUrl + '" target="_blank">联系客服</a></li>'
        + '<li class="sjxz"><a href="http://mb.yugj337.com" target="_blank">手机下载</a></li>'
        + '<li class="gfwx"><a href="javascript:;">手机号码</a></li>'
        + '<li class="fhlj"><a href="../../resources/lib/DNS.xlsx" download="DNS防劫持.xlsx">防DNS劫持</a></li>'
        + '</ul>'
        + '</div>';

    $("body").append(html);
    $("li.gfwx").hover(function () {
            $(this).find('div').show();
        },
        function () {
            $(this).find('div').hide();
        });
}

/********************* 手机登录 开始 *****************************/
var indexAutoGetPhoneLoginInfo;
function addPhoneLoginHtml() {
    if ($("span.wjmm").length > 0 && $("#phoneLogin").length < 1) {
        var html = '<a class="dl sj-dl" href="javascript:" id="phoneLogin">'
            + '手机登录'
            + '<div class="dl-app-ewm">'
            + '<p>手机端扫描二维码登录</p>'
            + '<img src="" alt="二维码" width="120" height="120">'
            + '</div>'
            + '</a>';
        $("span.wjmm").after(html);

        $("#phoneLogin").on("mouseenter", function () {
            clearTimeout(indexAutoGetPhoneLoginInfo);
            getPhoneLoginQR();
            getPhoneLogin();
        });
        $("#phoneLogin").on("mouseleave", function () {
            indexAutoGetPhoneLoginInfo = setTimeout(function () {
                cleanPhoneLogin();
            }, 60000);
        });
    }
}
var phoneLoginUUid;
var indexPhoneLoginQR;
function getPhoneLoginQR() {
    clearTimeout(indexPhoneLoginQR);

    indexPhoneLoginQR = setTimeout(function () {
        phoneLoginUUid = null;
        getPhoneLoginQR();
    }, 60050);

    if (phoneLoginUUid) {
        return;
    }
    phoneLoginUUid = uuid();

    $("#phoneLogin img").attr("src", "https://chart.googleapis.com/chart?cht=qr&chs=120x120&choe=UTF-8&chld=L|1&chl=acegi/webLogin?phoneLoginId=" + phoneLoginUUid);
}
var indexPhoneLogin;
function getPhoneLogin() {
    clearTimeout(indexPhoneLogin);

//  $.ajax({
//      url: '/ct-data/acegi/phoneLogin',
//      type: 'POST',
//      dataType: 'json',
//      data: {"ua": "web", "phoneLoginId": phoneLoginUUid},
//      success: function (data) {
//          if (data.sign == true) {
//              getPhoneLoginQR();
//              getUserInfo();
//          } else {
//              indexPhoneLogin = setTimeout(function () {
//                  getPhoneLogin();
//              }, 1000);
//          }
//      },
//      error: function (xhr, textStatus, errorThrown) {
//      }
//  });
}
function cleanPhoneLogin() {
    clearTimeout(indexPhoneLogin);
    clearTimeout(indexPhoneLoginQR);
    phoneLoginUUid = null;
}
/********************* 手机登录 结束 *****************************/

// 忘记密码弹框
var checkWjmmTimes = 0;
function addRecoverPasswordHtml() {
    var wjmmPanel = $("span.wjmm");
    if (wjmmPanel.length < 1) {
        if (checkWjmmTimes > 30) {
            return;
        }
        checkWjmmTimes++;
        setTimeout(function () {
            addRecoverPasswordHtml();
        }, 100);
        return;
    }
    wjmmPanel.attr("onclick", "openDialogOfForgetPass();");

    var recoverPasswordHtml = '<div id="recoverPassword" class="aar" style="display:none;">'
        + '<div class="aar-center">'
        + '<div class="aar-title"><span>忘记密码</span><a class="aar-close" href="javascript:;" onclick="closelayer();"><i class="demo-icon"></i></a></div>'
        + '<div class="tishik">'
        + '<dl class="validate-form">'
        + '<dd>'
        + '<span class="tt">用户名：</span>'
        + '<span><input class="inp-sty-1" type="text" id="recover_username" value="" maxlength="12"></span>'
        + '</dd>'
        + '<dd>'
        + '<span class="tt">找回方式：</span>'
        + '<span class="xzyh">'
        + '<select id="recoverTypeRadio">'
        //+ '<option name="recover_type" value="1">邮箱找回</option>'
        + '<option name="recover_type" value="0">Google验证找回</option>'
        //+ '<option name="recover_type" value="2">手机短信找回</option>'
        //+ '<option name="recover_type" value="3">手机语音找回</option>'
        + '</select>'
        + '</span>'
        + '</dd>'
        + '<dd>'
        + '<span class="tt">绑定邮箱：</span>'
        + '<span><input class="inp-sty-1" type="text" id="recover_email" value=""></span>'
        + '</dd>'
        + '<dd style="display:none;">'
        + '<span class="tt">动态密码：</span>'
        + '<span><input class="inp-sty-1" type="text" id="recover_val" value="" maxlength="6" onkeyup="replaceAndSetPos(this,event,/[^\\d]/g,\'\');"></span>'
        + '</dd>'
        + '<dd style="display:none;">'
        + '<span class="tt">选择地区：</span>'
        + '<span class="xzyh"><select id="recover_cellphoneArea"></select></span>'
        + '</dd>'
        + '<dd style="display:none;">'
        + '<span class="tt">手机号码：</span>'
        + '<span class="khh"><input class="inp-sty-1" type="text" id="recover_phone" value="" maxlength="15" onkeyup="replaceAndSetPos(this,event,/[^\\d]/g,\'\');" style="width: 110px;"></span>'
        + '<span class="khh">'
        + '<input type="text" maxlength="4" id="recover_valicodeForPhone" placeholder="验证码" style="width: 50px; border:1px solid #e0e0e0; padding-left:5px;">'
        + '<img id="ef-forget-codeimg" src="" alt="验证码" title="点击刷新验证码" onclick="getValicodeForPhoneForgetPass();" >'
        + '<a href="javascript:;" onclick="getRecoverPhoneCode(event);">发送验证码</a>'
        + '</span>'
        + '</dd>'
        + '<dd style="display:none;">'
        + '<span class="tt">手机验证码：</span>'
        + '<span><input class="inp-sty-1" type="text" value="" maxlength="6" onkeyup="replaceAndSetPos(this,event,/[^\\d]/g,\'\');"></span>'
        + '</dd>'
        + '<dd style="display:none;">'
        + '<span class="tt">新密码：</span>'
        + '<span><input class="inp-sty-1" type="password" id="recover_newPas" value="" maxlength="16"></span>'
        + '</dd>'
        + '<dd style="display:none;">'
        + '<span class="tt">确认密码：</span>'
        + '<span><input class="inp-sty-1" type="password" id="recover_regPas" value="" maxlength="16"></span>'
        + '</dd>'
        + '</dl>'
        + '</div>'
        + '<div class="aar-but qr"><a href="javascript:;" onclick="forgetPass();">提交</a></div>'
        + '</div>'
        + '</div>';

    $("body").append(recoverPasswordHtml);

    var forgetPassDDEmail = $("#recoverPassword dd");
    forgetPassDDEmail.eq(2).hide();
    forgetPassDDEmail.eq(4).hide();
    forgetPassDDEmail.eq(5).hide();
    forgetPassDDEmail.eq(6).hide();
    forgetPassDDEmail.eq(3).show();
    forgetPassDDEmail.eq(7).show();
    forgetPassDDEmail.eq(8).show();

    $("#recoverTypeRadio").on("change", function () {
        var type = $('#recoverTypeRadio').val();
        var forgetPassDD = $("#recoverPassword dd");
        if (type == "0") {
            forgetPassDD.eq(2).hide();
            forgetPassDD.eq(4).hide();
            forgetPassDD.eq(5).hide();
            forgetPassDD.eq(6).hide();
            forgetPassDD.eq(3).show();
            forgetPassDD.eq(7).show();
            forgetPassDD.eq(8).show();
        } else if (type == "1") {
            forgetPassDD.eq(2).show().nextAll().hide();
        } else if (type == "2" || type == "3") {
            forgetPassDD.eq(2).hide();
            forgetPassDD.eq(3).hide().nextAll().show();
        }
    });
}

function openDialogOfForgetPass() {
    $("#recover_cellphoneArea").empty();

//  $.ajax({
//      url: '/ct-data/user/phoneCode',
//      type: 'POST',
//      dataType: 'json',
//      success: function (data) {
//
//          if (data.sign) {
//              var html = '';
//              $.each(data.phoneCode, function (idx, val) {
//                  html += '<option value="' + val.value + '">' + val.name + ' ' + val.value + '</option>';
//              });
//              $("#recover_cellphoneArea").append(html);
//          }
//      },
//      error: function (xhr, textStatus, errorThrown) {
//      }
//  });

    getValicodeForPhoneForgetPass();
    pop('recoverPassword');
}

function getValicodeForPhoneForgetPass() {
    $("#ef-forget-codeimg").attr("src", "/ct-data/acegi/captcha?" + (new Date()).getTime());
}

function getRecoverPhoneCode(e) {
    var username = $("#recover_username").val();
    var type = $('#recoverTypeRadio').val();
    var code = $("#recover_cellphoneArea").val();
    var phone = $("#recover_phone").val();
    var valicode = $("#recover_valicodeForPhone").val();

    var reg = /^[a-zA-Z][a-zA-Z\d]{4,9}$/;
    if (!username) {
        popTips("请输入用户名", "waring");
        return;
    } else if (!reg.test(username)) {
        popTips("用户名格式不正确", "waring");
        return;
    }
    if (!type) {
        popTips("请选择找回方式", "waring");
        return;
    } else if (type != "2" && type != "3") {
        popTips("找回方式不正确", "waring");
        retrun;
    }
    if (!code) {
        popTips("请选择地区", "waring");
        return;
    }
    if (!phone) {
        popTips("请输入手机号码", "waring");
        return;
    } else if (phone.length < 5) {
        popTips("手机号码格式不正确", "waring");
        return;
    }
    if (valicode.length != 4) {
        popTips("验证码格式不正确", "waring");
        return;
    }
//  $.ajax({
//      type: "post",
//      url: "/ct-data/user/phoneSendValiPass",
//      data: {
//          "username": username,
//          "type": type,
//          "code": code,
//          "phone": phone,
//          "validateCode": valicode
//      },
//      datatype: "json",
//      success: function (data) {
//          getValicodeForPhoneForgetPass();
//          if (data.sign) {
//              $(e.target).removeAttr("onclick").html("重新发送(<strong>60</strong>)");
//              countdownObjTime($(e.target).find("strong"), 60, function () {
//                  $(e.target).text("发送验证码");
//                  $(e.target).attr("onclick", "getRecoverPhoneCode(event);");
//              });
//              popTips(data.message, "succeed");
//          } else {
//              popTips(data.message, "error");
//          }
//      },
//      error: function (xhr, textStatus, errorThrown) {
//          getValicodeForCertPhone();
//          popTips("系统出现错误，请联系管理员", "error");
//      }
//  });
}

function forgetPass() {
    var username = $("#recover_username").val();
    var type = $('input[name="recover_type"]:checked').val();
    var email = $("#recover_email").val();
    var val = $("#recover_val").val();
    var newPas = $("#recover_newPas").val();
    var regPas = $("#recover_regPas").val();

    if (!username) {
        popTips("请输入用户名", "waring");
        return;
    }

    if (!type) {
        popTips("请选择找回方式", "waring");
        return;
    }

    if (type == '0') {
        if (!val || val.length != 6) {
            popTips("请输入正确的Google动态密码", "waring");
            return;
        }

        if (!newPas) {
            popTips("请输入新密码", "waring");
            return;
        }

        if (!regPas) {
            popTips("请输入确认密码", "waring");
            return;
        }

        if (newPas != regPas) {
            popTips("新密码与确认密码不一致", "waring");
            return;
        }
    } else {
        if (!email) {
            popTips("请输入邮箱", "waring");
            return;
        }
        val = email;
    }

    var recoverPasswordUrl = currentRootDirectory + "/view/acegi/newpassword.html";
//  $.ajax({
//      url: "/ct-data/user/forgetPass",
//      type: "post",
//      dataType: "json",
//      data: {
//          "username": username,
//          "type": type,
//          "val": val,
//          "newPas": newPas,
//          "regPas": regPas,
//          "url": recoverPasswordUrl
//      },
//      success: function (msg) {
//          if (msg.sign == true) {
//              closelayer();
//              popTips(msg.message, 'succeed');
//          } else {
//              popTips(msg.message, 'error');
//          }
//      },
//      error: function (XMLHttpRequest, textStatus, errorThrown) {
//          popTips("服务器连接失败", 'error');
//      }
//  });
}

/**
 * 往localStorage添加数据
 * @param name
 * @returns {Boolean}
 */
function setValueInLocalStorage(name, value) {
    if (localStorage) {
        localStorage[name] = value;
        return true
    } else {
        return false;
    }
}
/**
 * 从localStorage取出数据
 * @param name
 * @returns
 */
function getValueInLocalStorage(name) {
    var value = null;
    if (localStorage) {
        value = localStorage[name];
    }

    return value;
}
/**
 * 删除一条纪录数据
 * @param name
 * @returns {Boolean}
 */
function delValueInLocalStorage(name) {
    if (localStorage) {
        localStorage.removeItem(name);
        return true;
    }
    return false;
}

//倒计时定时器
var CDObjValiTime = null;
function countdownObjTime(obj, leftSec, callback) {
    var h, m, s, t;
    var h1, m1, s1;
    var h2, m2, s2;
    if (CDObjValiTime) {
        clearInterval(CDObjValiTime);
    }
    var localCurrentTime = new Date();
    t = leftSec * 1000;
    var endTime = localCurrentTime.getTime() + t;
    if (t > 0) {
        obj.text(Math.floor(t / 1000));
        /*h = Math.floor(t / 1000 / 60 / 60 % 24);
         if (h < 10) {
         h1 = "0";
         h2 = ""+ h;
         } else {
         h1 =  ""+ Math.floor(h/10);
         h2 =  ""+ h%10;
         }
         m = Math.floor(t / 1000 / 60 % 60);
         if (m < 10) {
         m1 = "0";
         m2 = ""+ m;
         } else {
         m1 =  ""+ Math.floor(m/10);
         m2 =  ""+ m%10;
         }
         s = Math.floor(t / 1000 % 60);
         if (s < 10) {
         s1 = "0";
         s2 = ""+ s;
         } else {
         s1 =  ""+ Math.floor(s/10);
         s2 =  ""+ s%10;
         }*/
        /*way.set("qianghongbtime", h1+h2 + ':' + m1+m2 + ':' + s1+s2);
         way.set("qianghongbtime.h1", h1);
         way.set("qianghongbtime.h2", h2);
         way.set("qianghongbtime.m1", m1);
         way.set("qianghongbtime.m2", m2);
         way.set("qianghongbtime.s1", s1);
         way.set("qianghongbtime.s2", s2);*/
        CDObjValiTime = setInterval(function () {
            t = endTime - (new Date()).getTime();
            if (t >= 0) {
                obj.text(Math.floor(t / 1000));
                /*h = Math.floor(t / 1000 / 60 / 60 % 24);
                 if (h < 10) {
                 h1 = "0";
                 h2 = ""+ h;
                 } else {
                 h1 =  ""+ Math.floor(h/10);
                 h2 =  ""+ h%10;
                 }
                 m = Math.floor(t / 1000 / 60 % 60);
                 if (m < 10) {
                 m1 = "0";
                 m2 = ""+ m;
                 } else {
                 m1 =  ""+ Math.floor(m/10);
                 m2 =  ""+ m%10;
                 }
                 s = Math.floor(t / 1000 % 60);
                 if (s < 10) {
                 s1 = "0";
                 s2 = ""+ s;
                 } else {
                 s1 =  ""+ Math.floor(s/10);
                 s2 =  ""+ s%10;
                 }*/
                /*way.set("qianghongbtime", h1+h2 + ':' + m1+m2 + ':' + s1+s2);
                 way.set("qianghongbtime.h1", h1);
                 way.set("qianghongbtime.h2", h2);
                 way.set("qianghongbtime.m1", m1);
                 way.set("qianghongbtime.m2", m2);
                 way.set("qianghongbtime.s1", s1);
                 way.set("qianghongbtime.s2", s2);*/
            } else {
                clearInterval(CDObjValiTime);
                (eval(callback))();
            }
        }, 500);
    } else {
        (eval(callback))();
    }
}

function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

function addLicaiTips(node, html) {
    node.empty();
    node.removeAttr('onclick');
    node.attr('href', 'http://jfzhongchou.com/');
    node.attr('target', '_blank');
    node.html(html);
}

// 添加公共的弹窗html
function addPublicTipsHtml() {
    var len = $("#tips").length;
    for (var i = 0; i < len; i++) {
        $("#tip").remove();
    }
    var html = '<div id="tips" class="aar a-one" style="display:none;">'
        + '<div class="aar-center">'
        + '<div class="aar-title member-title"><span way-data="tips.title"></span><a class="aar-close" onclick="closeSystemLayer();"><i class="demo-icon icon-ios-close-empty member-close"></i></a></div>'
        + '<div class="member-tishik">'
        + '<div class="bd">'
        + '<div class="bd text-center">'
        + '<div class="pop-title">'
        + '<i class="ico-succeed"></i>'
        + '<h4 class="pop-text"></h4>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '<div class="aar-but"><a class="confirm" href="javascript:;" onclick="closeSystemLayer();">确认</a></div>'
        + '</div>'
        + '</div>';
    $("body").append(html);
    loadCss('/resources/yiyou/css/tips.css');
}

/**
 * 动态加载css文件
 */
function loadCss(filepath) {
    if (!filepath) {
        return;
    }
    var tipscss = false;
    var links = document.getElementsByTagName('head')[0].getElementsByTagName('link');
    for (var i = 0; i < links.length; i++) {
        var linksAttr = links[i].getAttribute('href');
        if (linksAttr.indexOf(filepath.substring(filepath.lastIndexOf("/") + 1)) != -1) {
            tipscss = true;
            break;
        }
    }
    if (!tipscss) {
        $("<link>").attr({rel: "stylesheet", type: "text/css", href: filepath}).appendTo("head");
    }
}

/**
 * 如果当前页是登录页，判断是否登录，如果已经登录，跳到首页
 */
function islogin() {
    if (!initUser) {
        setTimeout(function () {
            islogin();
        }, 100);
        return;
    }
    if (user && currentUrl.indexOf("login.html") != -1) {
        popTips('您当前账号已登录，将自动为您跳转到首页！若您要切换账号，请先退出登录！', 'error', '', function () {
            window.location.href = "/index.html";
        });
    }
}


/**
 * 动态加载旋转js
 */
function loadRotateJs() {
    loadCss('/resources/yiyou/css/font-awesome.css');
    $.getScript('/resources/lib/jquery.rotate.min.js', function () {
        $("#refresh").rotate({
            bind: {
                click: function () {
                    $(this).rotate({angle: 0, animateTo: 360, easing: $.easing.easeInOutExpo})
                }
            }
        });
    });
}

// 添加公告的弹窗html
function addNoticeTipsHtml() {
    var len = $("#newgg").length;
    for (var i = 0; i < len; i++) {
        $("#newgg").remove();
    }
    var html = '<div id="newgg" class="ag-box a-one" style="display:none;">' +
        '<div class="ag-center">' +
        '<div class="aar-title ag-title">最新公告</div>' +
        '<a class="aar-close ag-close" onclick="closelayer()"><i class="demo-icon"></i></a>' +
        '<div class="bor"></div>' +
        '<div  class="new-main">' +
        '<div class="tab">' +
        '<div class="new-m-l ef-left">' +
        '<ul class="tabHd">' +
        '<li class="cur" style="display: none;"></li>' +
        '<li style="display: none;"></li>' +
        '<li style="display: none;"></li>' +
        '<li style="display: none;"></li>' +
        '<li style="display: none;"></li>' +
        '<li style="display: none;"></li>' +
        '<li style="display: none;"></li>' +
        '<li style="display: none;"></li>' +
        '<li style="display: none;"></li>' +
        '<li style="display: none;"></li>' +
        '<li style="display: none;"></li>' +
        '<li style="display: none;"></li>' +
        '<li style="display: none;"></li>' +
        '<li style="display: none;"></li>' +
        '<li style="display: none;"></li>' +
        '<li style="display: none;"></li>' +
        '<li style="display: none;"></li>' +
        '<li style="display: none;"></li>' +
        '<li style="display: none;"></li>' +
        '<li style="display: none;"></li>' +
        '</ul>' +
        ' </div>' +
        '<div class="new-m-r tabBd ym-gr ef-right">' +
        '<div class="tb-imte mar-lr20 cur" style="display:none;"></div>' +
        '<div class="tb-imte mar-lr20" style="display:none;"></div>' +
        '<div class="tb-imte mar-lr20" style="display:none;"></div>' +
        '<div class="tb-imte mar-lr20" style="display:none;"></div>' +
        '<div class="tb-imte mar-lr20" style="display:none;"></div>' +
        '<div class="tb-imte mar-lr20" style="display:none;"></div>' +
        '<div class="tb-imte mar-lr20" style="display:none;"></div>' +
        '<div class="tb-imte mar-lr20" style="display:none;"></div>' +
        '<div class="tb-imte mar-lr20" style="display:none;"></div>' +
        '<div class="tb-imte mar-lr20" style="display:none;"></div>' +
        '<div class="tb-imte mar-lr20" style="display:none;"></div>' +
        '<div class="tb-imte mar-lr20" style="display:none;"></div>' +
        '<div class="tb-imte mar-lr20" style="display:none;"></div>' +
        '<div class="tb-imte mar-lr20" style="display:none;"></div>' +
        '<div class="tb-imte mar-lr20" style="display:none;"></div>' +
        '<div class="tb-imte mar-lr20" style="display:none;"></div>' +
        '<div class="tb-imte mar-lr20" style="display:none;"></div>' +
        '<div class="tb-imte mar-lr20" style="display:none;"></div>' +
        '<div class="tb-imte mar-lr20" style="display:none;"></div>' +
        '<div class="tb-imte mar-lr20" style="display:none;"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    $("body").append(html);
    tabsNotice();
}

//tab切换
function tabsNotice() {
    $('#newgg').find('.tabBd').each(function () {
        $(this).children().eq(0).addClass('cur').show();
    });
    $('#newgg').find('.tabHd').children().unbind();
    $('#newgg').find('.tabHd').children().click(function () {
        $(this).addClass('cur').siblings().removeClass('cur');
        var index = $('#newgg').find('.tabHd').children().index(this);
        $('#newgg').find('.tabBd').children().eq(index).show().siblings().hide();
    });
}
var key = CryptoJS.enc.Utf8.parse("BAxFqleSjbXGhTyt");
var iv = CryptoJS.enc.Utf8.parse('8765432112345678');

function decrypt(word) {
    var encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    var decrypt = CryptoJS.AES.decrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}
function bulletinList() {
    if (!initUser) {
        setTimeout(function () {
            bulletinList();
        }, 100);
        return;
    }

    if (!user) {
        return false;
    }

    $("#newgg .tabHd li").hide();
    $("#newgg .tabHd li").empty();
    $("#newgg .tabBd .tb-imte").empty();
//  $.ajax({
//      url: '/ct-data/article/bulletinList',
//      type: 'POST',
//      dataType: 'json',
//      data: {
//          firstResult: 0,
//          maxResults: 20
//      },
//      success: function (data) {
//          if (data.sign) {
//              $.each(data.bulletinList, function (index, val) {
//                  val.articleTitle = decrypt(val.articleTitle);
//                  val.artContent = decrypt(val.artContent);
//                  openAnno(val.id, index, val.articleTitle, val.publishDate, val.artContent);
//                  $("#newgg .tabHd li").eq(index).append(val.articleTitle);
//                  $("#newgg .tabHd li").eq(index).show();
//              });
//              if (data.bulletinList.length > 0) {
//                  pop('newgg');
//              }
//          }
//      },
//      error: function (xhr, textStatus, errorThrown) {
//
//      }
//  });
}
function openAnno(annoId, index, title, date, content) {
    var html = '<h3 class="mar-lr20">' + title + '</h3>'
        + '<p class="n-time mar-lr20">发布时间：' + $.format.date(date, "yyyy年MM月dd日") + '</p>'
        + '<div class="n-c-main mar-lr20">'
        + content
        + '</div>';
    $("#newgg .tabBd .tb-imte").eq(index).html(html);
}

/**
 * 头部加载浮动公告
 */
// function loadFloltNotice() {
//     if(!initUser) {
//         setTimeout(function() {
//             loadFloltNotice();
//         }, 100);
//         return;
//     }
//     if(!user) {
//         return;
//     }
//
//     if($("#notice").length == 0) {
//         setTimeout(function() {
//             loadFloltNotice();
//         }, 100);
//         return;
//     }
//     $("#notice").empty();
//     $.ajax({
//         url: '/ct-data/article/bulletinList',
//         type: 'POST',
//         dataType: 'json',
//         data: {
//             firstResult: 0,
//             maxResults: 10
//         },
//         success: function(data) {
//             $("#notice").empty();
//             if (data.sign) {
//                 $.each(data.bulletinList, function(index, val) {
//                     var html = '<a href="javascript:void(0)" onclick="opennotice('+index+')">' + (index+1) + '.' + val.articleTitle + ';</a>&nbsp;&nbsp;';
//                     $('#notice').append(html);
//                 });
//             }
//         },
//         error: function(xhr, textStatus, errorThrown) {
//         }
//     });
// }
//
// function opennotice(index) {
//     bulletinList(index);
// }

// 加载用户输入谷歌验证码或银行卡姓名会话框html
function loadlogincheckhtml() {
    var len = $('#loginDifferentPlaceTips').length;
    if (len != 0) {
        $('#loginDifferentPlaceTips').remove();
    }
    var html = '<div id="loginDifferentPlaceTips" class="aar a-one" style="display:none;">';
    html += '<div class="aar-center">';
    html += '<div class="aar-title">输入银行卡姓名</div>';
    html += '<a class="aar-close" onclick="closelayer();">关闭</a>';
    html += '<div class="tishik" >';
    html += '<div class="bd">';
    html += '<div class="bd text-center">';
    html += '<div class="pop-title">';
    html += '<select id="loginDifferentPlaceCheckType" class="pop-sy">';
    // html += '<option value="noSelect" checked>请选择</option>';
    // html += '<option value="ga">谷歌验证码</option>';
    html += '<option value="userName" checked>银行卡姓名</option>';
    html += '</select>';
    html += '<!--<p class="pop-text">请输入谷歌验证码或银行卡姓名:</p>-->';
    html += '<input class="pop-text googleIdentifyCode" id="j_password" type="text" placeholder="请输入银行卡姓名:"  class="pop-st"/>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '<div class="aar-but">';
    html += '<a class="confirm" id="loginDifferentPlaceButton" href="javascript:;" onclick="loginDifferentPlace();">确定</a>&nbsp;&nbsp;';
    html += '<a class="confirm" href="javascript:;" onclick="closelayer();">取消</a>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    $("body").append(html);
}
// 加入拖拽脚本
function asyncLoadDrag() {
    var a = document.createElement("script");
    a.type = "text/javascript";
    a.src = "https://code.jquery.com/ui/1.12.1/jquery-ui.js";
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(a);
}
//更改分红判断条件问题
var isShowDividend = false;   //判断用户有无任意分红权限
var hasProxyDividend = false; //判断用户有无代理分红权限
function getHasDivend() {
//  $.ajax({
//      type: 'post',
//      url: '/ct-data/userDividend/hasDividend',
//      dataType: 'json',
//      async: false,
//      timeout: 10000,
//      success: function (data) {
//          if (data.sign) {
//              isShowDividend = true;//   判断用户是否有分红显示权限
//              hasProxyDividend = data.hasProxyDividend;
//          } else {
//              isShowDividend = false;
//              hasProxyDividend = false;
//          }
//      },
//      error: function () {
//          setTimeout(getHasDivend, 3000);
//      }
//  })
}

$(function () {
    // 加载拖拽脚本
    asyncLoadDrag();
    addNoticeTipsHtml();
    displayAgent();
    isOpenRedPacket();
    redEnvelope();
    addServicerHtml();
//  loadSettingAudio();
//  loadAudioSource(1);
//  loadAudioSource(2);
//  loadAudioSource(3);
//  loadAudioSource(4);

    loadRotateJs();// 动态加载旋转js
    // getHasDivend();
    addPhoneLoginHtml();
    addRecoverPasswordHtml();
    addPublicTipsHtml();// 添加公共弹窗
    //loadFloltNotice();// 头部加载浮动公告
    loadlogincheckhtml();


    //var node1 = $('.nav').find('.center').find('.ym-gr').find("ul").children().eq(3).find('a');
    //var html1 = '<img src="../../resources/yiyou/images/hot.gif" style="position: absolute;margin-top: -20px;margin-left: 15px;">理财<span>FINANCIAL</span>';
    //addLicaiTips(node1,html1);
    //var node2 = $('.top').find('.center').find('.n-m-xiala').find("ul").eq(1).children().eq(3).find('a');
    //var html2 = '理财';
    //addLicaiTips(node2,html2);

    // 加载外部客服脚本
    // console.log("加载外部 JavaScript 1 地址：" + WebpeConfig.getWebpeConfig());
    // $.getScript(WebpeConfig.getWebpeConfig(), function () {
    //     // console.log("外部 JavaScript 1 加载完成");
    //     var scriptStr = WebpeConfig.serverHost + "images/client.js?t=" + $.now();
    //     // console.log("加载外部 JavaScript 2 地址：" + scriptStr);
    //     $.getScript(scriptStr, function () {
    //         // console.log("外部 JavaScript 2 加载完成");
    //     })
    // });
    // var c_html = '<a href="http://shunt1.chinacs168.com/api/staticurl?lang=zh-tw&CID=on000013&vcode=870ed81486369370&t=1&Online88CustomerWebText=visitorinfo_json_urlencode_string" target="_blank">....</a>';
    // $("body").append(c_html);
});


var lotteryListData = {};
//获取彩种列表
var lotteryData = function () {
//  jQuery.ajax({
//      url: '/ct-data/lotteryList',
//      type: 'POST',
//      dataType: 'json',
//      async: false,
//      success: function (data, textStatus, xhr) {
//          if (data.sign) {
//              lotteryListData = data.list;
//          }
//      },
//      error: function (xhr, textStatus, errorThrown) {
//          //called when there is an error
//      }
//  });
};

// 快乐彩、彩票、外盘彩种分类
var lotteryList = function (className, lotteryType) {
    var appendDom = $(className);
    appendDom.empty();
    var html = '<option value="">全部</option>';
    appendDom.append(html);
    if (lotteryType == "lottery") {
        $.each(lotteryListData, function (index, val) {
            if (val.shortName.indexOf('kl8') == -1 && val.shortName.indexOf('klb') == -1 &&
                val.shortName.indexOf('xy28') == -1 && val.shortName != 'xglhc' && val.shortName != 'ffpks') {
                html = '<option value="' + val.shortName + '">' + val.showName + '</option>';
                appendDom.append(html);
            }
        });
    } else if (lotteryType == "klc") {
        $.each(lotteryListData, function (index, val) {
            if (val.shortName.indexOf('kl8') > -1 || val.shortName.indexOf('klb') > -1 || val.shortName.indexOf('xy28') > -1) {
                html = '<option value="' + val.shortName + '">' + val.showName + '</option>';
                appendDom.append(html);
            }
        });
    } else if (lotteryType == "wp") {
        $.each(lotteryListData, function (index, val) {
            if (val.shortName != 'ffpks') {
                html = '<option value="' + val.shortName + '">' + val.showName + '</option>';
                appendDom.append(html);
            }
        });
    } else {
        $.each(lotteryListData, function (index, val) {
            if (val.shortName != 'xglhc' && val.shortName != 'ffpks') {
                html = '<option value="' + val.shortName + '">' + val.showName + '</option>';
                appendDom.append(html);
            }
        });
    }
};