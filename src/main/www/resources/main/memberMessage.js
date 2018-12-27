/**
 * 收件箱
 */
//function chatReceList() {
//	var thisPanl = $("#chatReceList ul.mess-ul-sty");
//	thisPanl.empty();
//	
//	var pagination = $.pagination({
//		render: '.paging',
//		pageSize: 10,
//		pageLength: 7,
//		ajaxType: 'post',
//		hideInfos: false,
//		hideGo: true,
//		infosHtml:'<div class="quanxuan ym-gl"><input type="checkbox" value="" onchange="delReceListCheckChange(this);"><a href="javascript:;" onclick="delReceListCheckd();">删除所选</a></div>',
//		ajaxUrl: "/ct-data/chatRece/chatReceList",
//		ajaxData: {
//			"jqueryGridPage": 1,
//			"jqueryGridRows": 10,
//		},
//		success: function(data) {
//          thisPanl.empty();
//			$.each(data, function(idx, val){
//				var chatname = val.sentname;
//				if(!chatname) {
//					chatname = '';
//				} if(chatname == "system") {
//					chatname = "客服";
//				}
//				var html = '';
//				html += '<li receId="' + val.id + '" srid="' + (val.srid?val.srid:'') + '" senttype="' + val.senttype + '" chatname="' + chatname + '">';
//				html += '<div class="m-titile mar-lr20 ' + (val.rececount==val.readcount?'yidu':'weidu') + '">';
//				html += '<div class="ym-gl"><input type="checkbox" name="chatReceCheck" value="' + val.id + '"><h2>' + val.senttitle + '</h2></div>';
//				html += '<div class="ym-gr">';
//				html += '<span>' + chatname + '</span>';
//				html += '<span class="">' + val.lastrecetimeName + '</span>';
//				html += '<a href="javascript:;" onclick="delMessageConfirm(\'' + val.id + '\', \'r\');">删除</a>';
//				html += '</div>';
//				html += '</div>';
//				html += '<div class="me-neir">';
//				if(val.senttype=='1') {
//					html += '<div class="hfnr mar-lr20"></div>';
//					html += '<div class="hf">';
//					html += '<div class="hf-an">';
//					html += '<a class="hui" href="javascript:;">回复</a>';
//					html += '<a class="clean" href="javascript:;">清空</a>';
//					html += '</div>';
//					html += '<div class="srk">';
//					html += '<span class="zishu">剩余可发 <em class="dred">800</em> 个字</span>';
//					html += '<textarea id="re_"' + val.id + '></textarea>';
//					html += '<a class="butsty2" href="javascript:;" title="Ctrl+Enter快捷发送">发送</a>';
//					html += '</div>';
//					html += '</div>';
//				} else {
//					html += '<div class="wz mar-lr20">';
//					html += '<p></p>';
//					html += '</div>';
//				}
//				html += '</div>';
//				html += '</li>';
//				
//				thisPanl.append(html);
//			});
//			
//			addListener("chatReceList", 'r');
//		},
//		error: function(XMLHttpRequest, textStatus, errorThrown) {}
//	});
//	pagination.init();
//}

// 添加事件监听
//function addListener(id, messbox) {
//	// 阅读或关闭信息
//	$("#" + id + " ul.mess-ul-sty li .m-titile .ym-gl h2").on("click", function(){
//		var obj = $(this).parent().parent().parent();
//		
//		if(obj.hasClass("cur")) {
//			$("#" + id + " ul.mess-ul-sty li").removeClass();
//			clearTimeout(readMessageIndex);
//			obj.find(".me-neir").hide();
//		} else {
//			$("#" + id + " ul.mess-ul-sty li").removeClass();
//			$("#" + id + " ul.mess-ul-sty li .me-neir").hide();
//			readMessage(obj, messbox);
//			obj.addClass("cur");
//			obj.find(".me-neir").show();
//		}
//	});
//	
//	// 回复按钮
//	$("#" + id + " ul.mess-ul-sty li .hf-an a.hui").on("click", function(){
//		var srk = $(this).parent().parent().find(".srk");
//		if(srk.is(':hidden')) {
//			srk.show();
//		} else {
//			srk.hide();
//		}
//	});
//	
//	// 清空按钮
//	$("#" + id + " ul.mess-ul-sty li .hf-an a.clean").on("click", function(){
//		$(this).parent().parent().find(".srk textarea").val('');
//		
//	});
//	
//	// 发送按钮
//	$("#" + id + " ul.mess-ul-sty li .hf a.butsty2").on("click", function(){
//		var obj = $(this).parent().parent().parent().parent();
//		
//		var id = obj.attr("receId");
//		if(!id || id.length<1) {
//			popTips("该消息不能回复", "waring");
//			return;
//		}
//		
//		var context = obj.find(".hf .srk textarea").val();
//		if(!context || context.length<1) {
//			popTips("请输入回复内容", "waring");
//			return;
//		}
//		
//		$.ajax({
//			url: "/ct-data/chatRece/replay",
//			type: "post",
//			dataType: "json",
//			data : {
//				"id" : id,
//				"context" : context,
//				"messbox" : messbox
//			},
//			success: function(msg) {
//				if(msg.sign === true) {
//					obj.find(".hf .srk textarea").val('');
//					obj.find(".hf .srk .zishu em").text('800');
//					readMessage(obj, messbox);
//				} else {
//					popTips(msg.message, "error");
//				}
//			},
//			error: function(XMLHttpRequest, textStatus, errorThrown) {
//				popTips('发送失败', "error");
//			}
//		});
//	});
//	
//	// 字数变动
//	$("#" + id + " ul.mess-ul-sty li .srk textarea").on("keyup", function(event){
//		if(event.ctrlKey && event.keyCode == 13) {
//			$(this).parent().find("a.butsty2").click();
//			return;
//		}
//		var parentObj = $(this).parent();
//		var content = $(this).val();
//		if(content.length > 800) {
//			content = content.substr(0, 800);
//			$(this).val(content);
//		}
//		
//		parentObj.find(".zishu em").text(800 - content.length);
//	});
//}

/**
 * 读取信息
 * @param obj  li标签的jquery对象
 * @param messbox 'r'为收件箱，'s'为发件箱
 */
var readMessageIndex;
function readMessage(obj, messbox) {
	clearTimeout(readMessageIndex);
	$.ajax({
		url: "/ct-data/chatContext/read",
		type: "post",
		dataType: "json",
		data : {
			"id" : obj.attr("receId"),
			"srid" : obj.attr("srid"),
			"messbox" : messbox
		},
		success: function(msg) {
			if(msg.sign === true) {
				dsFlushBalance();
				obj.find(".m-titile").removeClass("weidu");
				obj.find(".m-titile").addClass("yidu");
				
				if(obj.attr("senttype")=='1') {
					var dataLength = msg.data.length;
					var ddlength = obj.find(".hfnr dl dd").length;
					if(dataLength > ddlength) {
						var html = '<dl>';
						$.each(msg.data, function(idx, val){
							var chatname = obj.attr("chatname");
							html += '<dd class="';
							if(user && user.id==val.sentid) {
								html += 'txle';
								chatname = val.sentname;
							} else {
								html += 'txri';
							}
							html += '">';
						
							/*if(val.senttime) {
								html += '<p>' + val.senttime + '</p>';
							}*/
							
							if(user && user.id==val.sentid) {
								html += '<p>' + (val.senttime?val.senttime:'') + '&nbsp;&nbsp;&nbsp;&nbsp;<em class="sty-h">' + chatname + '</em></p>';
							} else {
								html += '<p><em class="sty-h">' + obj.attr("chatname") + '</em>&nbsp;&nbsp;&nbsp;&nbsp;' + (val.senttime?val.senttime:'') + '</p>';
							}
							
							var setcontext = val.sentcontext;
							setcontext = setcontext.replace(new RegExp(/\n/g),'<br/>');
							
							html += '<span>' + setcontext + '</span>';
							html += '</dd>';
						});
						html += '</dl>';
					
						obj.find(".hfnr").html(html);
					
						var scrollTop = obj.find(".hfnr dl")[0].scrollHeight;
						obj.find(".hfnr dl").scrollTop(scrollTop); 
					}
					readMessageIndex = setTimeout(function(){readMessage(obj, messbox);}, 3000);
				} else {
					var setcontext = msg.data[0].sentcontext;
					setcontext = setcontext.replace(new RegExp(/\n/g),'<br/>');
					obj.find(".me-neir .wz p").html(setcontext);
				}
				obj.find(".me-neir").show();
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {}
	});
}

/**
 * 删除收件箱已选
 */
function delReceListCheckd() {
	var ids = '';
	var arrChk = $("input[name='chatReceCheck']:checked");
	$(arrChk).each(function() {
		ids += this.value + ',';
	});
	
	if(ids) {
		delMessageConfirm(ids, 'r');
	} else {
		popTips("请选择待删除项", "waring");
	}
}

/**
 * 删除发件箱已选
 */
function delSentListCheckd() {
	var ids = '';
	var arrChk = $("input[name='chatSentCheck']:checked");
	$(arrChk).each(function() {
		ids += this.value + ',';
	});
	
	if(ids) {
		delMessageConfirm(ids, 's');
	} else {
		popTips("请选择待删除项", "waring");
	}
}

/**
 * 删除提示
 * @param ids
 * @param messbox
 */
function delMessageConfirm(ids, messbox){
	closelayer();
	$("#deleteIds").val(ids);
	$("#deleteMessbox").val(messbox);
	pop("deleteTips");
}

/**
 * 删除信息
 */
function delMessage() {
	// 点击删除按钮的时候会触发阅读消息事件，所以这里先清除掉定时刷新消息内容事件
	setTimeout(function(){clearTimeout(readMessageIndex);}, 5000);
	
	closelayer();
	var ids = $("#deleteIds").val();
	var messbox = $("#deleteMessbox").val();

	if(!messbox) {
		popTips("删除失败", 'error');
		return;
	}
	var url;
	var data;
	if(messbox == 'r') {
		url = "/ct-data/chatRece/del";
		data = {"receid":ids};
	} else {
		url = "/ct-data/chatSent/del";
		data = {"sentid":ids};
	}
	
	$.ajax({
		url: url,
		type: "post",
		dataType: "json",
		data : data,
		success: function(msg) {
			if(msg.sign === true) {
				if(messbox == 'r') {
					chatReceList();
				} else {
					chatSentList();
				}
				
				popTips(msg.message, 'succeed');
			} else {
				popTips(msg.message, 'error');
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			popTips("删除失败", 'error');
		}
	});
}

/**
 * 发件箱
 */
//function chatSentList() {
//	var thisPanl = $("#chatSentList ul.mess-ul-sty");
//	thisPanl.empty();
//	
//	var pagination = $.pagination({
//		render: '.paging',
//		pageSize: 10,
//		pageLength: 7,
//		ajaxType: 'post',
//		hideInfos: false,
//		hideGo: true,
//		infosHtml:'<div class="quanxuan ym-gl"><input type="checkbox" value="" onchange="delSentListCheckChange(this);"><a href="javascript:;" onclick="delSentListCheckd();">删除所选</a></div>',
//		ajaxUrl: "/ct-data/chatSent/chatSentList",
//		ajaxData: {
//			"jqueryGridPage": 1,
//			"jqueryGridRows": 10,
//		},
//		success: function(data) {
//          thisPanl.empty();
//			$.each(data, function(idx, val){
//				var chatname = val.recename;
//				if(!chatname) {
//					chatname = '';
//				} if(chatname == "system") {
//					chatname = "客服";
//				} else if(chatname == "down") {
//					chatname = '所有下级';
//				}
//				
//				var html = '';
//				html += '<li receId="' + val.id + '" srid="' + (val.srid?val.srid:'') + '" senttype="' + val.senttype + '" chatname="' + chatname + '">';
//				html += '<div class="m-titile mar-lr20 ' + ((val.rececount==val.readcount||val.senttype!='1')?'yidu':'weidu') + '">';
//				html += '<div class="ym-gl"><input type="checkbox" name="chatSentCheck" value="' + val.id + '"><h2>' + val.senttitle + '</h2></div>';
//				html += '<div class="ym-gr">';
//				html += '<span>' + chatname + '</span>';
//				html += '<span class="">' + val.lasttimeName + '</span>';
//				html += '<a href="javascript:;" onclick="delMessageConfirm(\'' + val.id + '\', \'s\');">删除</a>';
//				html += '</div>';
//				html += '</div>';
//				html += '<div class="me-neir">';
//				if(val.senttype=='1') {
//					html += '<div class="hfnr mar-lr20"></div>';
//					html += '<div class="hf">';
//					html += '<div class="hf-an">';
//					html += '<a class="hui" href="javascript:;">回复</a>';
//					html += '<a class="clean" href="javascript:;">清空</a>';
//					html += '</div>';
//					html += '<div class="srk">';
//					html += '<span class="zishu">剩余可发 <em class="dred">800</em> 个字</span>';
//					html += '<textarea id="re_"' + val.id + '></textarea>';
//					html += '<a class="butsty2" href="javascript:;" title="Ctrl+Enter快捷发送">发送</a>';
//					html += '</div>';
//					html += '</div>';
//				} else {
//					html += '<div class="wz mar-lr20">';
//					html += '<p></p>';
//					html += '</div>';
//				}
//				html += '</div>';
//				html += '</li>';
//				
//				thisPanl.append(html);
//			});
//			
//			addListener("chatSentList", 's');
//		},
//		error: function(XMLHttpRequest, textStatus, errorThrown) {}
//	});
//	pagination.init();
//}

/**
 * 获取下级用户
 */
var downUserCount = 0;
function getDownUserList() {
	if($("#addxiaji tbody td").length>0){
		return;
	}
	
	var thisPanl = $("#addxiaji tbody");
	thisPanl.empty();
	
	$.ajax({
		url: "/ct-data/user/getDownUser",
		type: "post",
		dataType: "json",
		success: function(msg) {
			thisPanl.empty();
			var titleHtml = '<tr><th></th><th>用户名</th><th></th><th>用户名</th></tr>';
			thisPanl.html(titleHtml);
			if (msg.sign === true) {
				var users = msg.data;
				var html = '';
				
				downUserCount =  users.length;
				for(var i=0; i<users.length; i+=2){
					html += '<tr>';
					html += '<td><input type="checkbox" name="downUserCheck" value="' + users[i].id + '"></td>';
					html += '<td id="receiver_' + users[i].id + '">' + users[i].loginname + '</td>';
					
					if((i+1)<users.length) {
						html += '<td><input type="checkbox" name="downUserCheck" value="' + users[i+1].id + '"></td>';
						html += '<td id="receiver_' + users[i+1].id + '">' + users[i+1].loginname + '</td>';
					} else {
						html += '<td></td><td></td>';
					}
					
					html += '</tr>';
				}
				
				thisPanl.append(html);
			} else {
				downUserCount = 0;
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			downUserCount = 0;
		}
	});
}

/**
 * 设置收件人并隐藏
 */
function setReceiverUser(code) {
	$("#receiverUserList").hide();
	$("#sendMessageUsername").val('');
	$("#sendMessageUserId").val(code);
}

/**
 * 显示收件人，并弹出下级用户列表
 */
function showDownUserList() {
	$("#receiverUserList").show();
    pop('addxiaji');
	getDownUserList();
}

/**
 * 保存下级收件人
 */
function addReceiver() {
	closelayer();

	var ids = '';
	var users = '';

	var arrChk = $("input[name='downUserCheck']:checked");
	
	if(arrChk.length>0 && downUserCount==arrChk.length) {
		ids = 'down';
		users = '所有下级';
	} else {
		$(arrChk).each(function() {
			ids += this.value + ';';
			users += $("#receiver_" + this.value).text() + ';';
		});
	} 
	$("#sendMessageUserId").val(ids);
	$("#sendMessageUsername").val(users);
}

/**
 * 发送消息
 */
function sendMessage() {
	var userids = $("#sendMessageUserId").val();
	if(!userids || userids.length<1) {
		popTips("请选择收件人", "waring");
		return;
	}
	
	var title = $("#sendMessageTitle").val();
	if(!title || title.length<1) {
		popTips("请输入主题", "waring");
		return;
	}
	
	var context = $("#sendMessageContent").val();
	if(!context || context.length<1) {
		popTips("请输入内容", "waring");
		return;
	}
	
	$.ajax({
		url: "/ct-data/chatSent/sent",
		type: "post",
		dataType: "json",
		data : {
			"title" : title,
			"context" : context,
			"userids" : userids
		},
		success: function(msg) {
			if(msg.sign) {
				$(".agenRadio label").removeClass();
				$("#sendMessageUserId").val('');
				$("#sendMessageUsername").val('');
				$("#sendMessageTitle").val('');
				$("#sendMessageContent").val('');
				
				popTips(msg.message, "succeed");
			} else {
				popTips(msg.message, "error");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			popTips("发送失败", "error");
		}
	});
}

//收件箱全选
function delReceListCheckChange(thisObj) {
	if(thisObj.checked) {
		$("input[name='chatReceCheck']").prop("checked", true);
	} else {
		$("input[name='chatReceCheck']").prop("checked", false);
	}
}

//发件箱全选
function delSentListCheckChange(thisObj) {
	if(thisObj.checked) {
		$("input[name='chatSentCheck']").prop("checked", true);
	} else {
		$("input[name='chatSentCheck']").prop("checked", false);
	}
}

// 是否显示发送给下级
//function showDownUser() {
//	if (!initUser) {
//		setTimeout(function() {
//			showDownUser();
//		}, 100);
//		return;
//	}
//	
//	if(user && user.proxy==1) {
//		$(".agenRadio label").show();
//	}
//}

$(function() {
	setReceiverUser('');
	
//	chatReceList();
	
//	showDownUser();
	
	// 新消息->下级全选
	$("#allDownUser").on("change", function() {
		if(this.checked) {
			$("input[name='downUserCheck']").prop("checked", true);
		} else {
			$("input[name='downUserCheck']").prop("checked", false);
		}
	});
	
	$("#sendMessageContent").on("keyup", function(event){
		if(event.ctrlKey && event.keyCode == 13) {
			sendMessage();
			return;
		}
		var parentObj = $(this).parent().parent();
		var content = $(this).val();
		if(content.length > 800) {
			content = content.substr(0, 800);
			$(this).val(content);
		}
		
		parentObj.find(".zishu em").text(800 - content.length);
	});
});