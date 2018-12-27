function bulletinList()
{
	$.ajax({
		url : "/notice/pagingPageContent?pageIndex=1&pageSize=10&catalogId=4",
		method : 'GET',
		success : function(data) {
			if (data.retcode == 0) {
				$("#newgg").html( _.template($('#newgg_template').html(), {items:data.data.list}));
				pop("newgg"); 
				$('#newgg').delegate('li', 'click', function(e) {
					$(e.delegateTarget).find('li').removeClass('cur');
					$(this).addClass('cur'); 
					$("#pageContent").html($(this).attr("data-Content")); 
				}); 	
				$('#newgg li:eq(0)').trigger('click');
			} else {
				popTips("平台暂无最新公告！", "error");
			} 
		}
	}); 
} 
 

$(function() {    
	define('view/header/Header', [ 'template', 'text!view/header/headerTpl.html' ],
			function(template, headerTpl) {
				var Widget = function() {
					this.init();
				}; 
				
				Widget.prototype = {
					init : function() {
						this.buildHeader();
						// this.InitData();
						this.addEvents(); // 监听事件
					},
					addEvents : function() {
						var _self = this;
						setInterval(this.getnowtime, 1000);
						$('#login').livequery("click",
								_self.loginCallback.bind(this));
						$('#vimg').livequery(
								"click",
								function() {
									$("#vimg").attr("src",
											"/jcaptcha?random=" + Math.random())
								}); // 图像验证码 
						$('#logout').livequery("click", function() {
							$("#logoutConfrim").html( _.template($('#logout_template').html(), {}));
							pop("logoutConfrim");
						}); 
						$('#logOutBtnOk').livequery('click', function() { 
							closelayer();
							$.ajax({
								url : "/user/loginOut",
								method : 'GET',
								success : function(data) {
									if (data.retcode == 0) {
										$.session.remove("loginname");
										$.session.remove("balance");
										$.session.remove("fandian");
										window.initUser = false;
										_self.init(); 
										location.href = "/";
									} else {
										popTips(data.message, "error");
										$("#vimg").click();
									}
								}
							});
						});
					},
					buildHeader : function() {
						var render = template.compile(headerTpl);
						var _this = this;
						$.ajax({
							url : "/user/userInfo",
							method : 'GET',
							success : function(data) {
								if (data.retcode == 0) {
									var html = render({
										unLogin : false,
										userType : data.data.userType
									});
									$.session.set("loginname", data.data.userName)
									$.session.set("balance", data.data.coin);
									$.session.set("fandian", data.data.fandian);
									$("#user_fandian").val(data.data.fandian);
									if($("#slider-range").length>0){$("#slider-range").html("");moneySlider("slider-range",0,(+$('#user_fandian').val()) * 100,0,Play.slider);$("#slider-range").slider('value',0);Play.slider();};
									if (data.data.userType != 0) {
										$("#agentInfo").hide();
									}
									window.initUser = true;
								} else {
									var html = render({
										unLogin : true
									});
									$.session.remove("loginname");
									$.session.remove("balance");
									$.session.remove("fandian");
									window.initUser = false;
								}
								$('.top-bg').empty().append(html);
								_this.InitData();
							}
						});
					},

					InitData : function() {
						var _self = this;
						if ($.session.get("loginname")) {
							$("#session_loginname")
									.html($.session.get("loginname"));
						}
						if ($.session.get("balance")) {
							$("#session_balance").html($.session.get("balance"));
						}
						this.myAccountToggle();// 我的账户
						// this.lottGameHover();//彩种选择下拉翻转
					},

					myAccountToggle : function() {
						var _self = this;
						var len = $("#myAccount").length;
						if (len < 1) {
							setTimeout(_self.myAccountToggle, 100);
							return;
						}
						$("#myAccount").hover(function() {
							$(".wdzh").toggle();
						});
					},

					getnowtime : function() {
						var mytime = "";
						var myobj = new Date();
						mytime += myobj.getFullYear() + "-"
								+ (myobj.getMonth() + 1) + "-" + myobj.getDate()
								+ " " + myobj.getHours() + ":" + myobj.getMinutes()
								+ ":" + myobj.getSeconds()
						$("#nowtime").text(mytime);
					},

					loginCallback : function() {
						var _self = this;
						var username = $('#username').val();
						var password = $('#password').val();
						var code = $('#code').val();
						if (username == '' || username.length == 0) {
							return popTips("用户名不能为空！", "error");
						}
						if (password == '' || password.length == 0) {
							return popTips("密码不能为空！", "error");
						}
						if (code == '' || code.length == 0) {
							return popTips("验证码不能为空！", "error");
						}
						$.ajax({
							url : "/login",
							method : 'POST',
							data : {
								userName : username,
								userPwd : password,
								verification : code
							},
							success : function(data) {
								if (data.retcode == 0) {
									$.session.set("loginname", data.data.username)
									$.session.set("balance", data.data.balance);
									$.session.set("fandian", data.data.fandian);
									_self.init();
								} else {
									popTips(data.retmsg, "error");
									$("#vimg").click();
								}
							}
						});
					}

				};

				return Widget;
	});
	

});
