$(function() {
	// tab切换
	function tabs(tabTit, on, tabCon) {
		$(tabCon).each(function() {
			$(this).children().eq(0).addClass(on).show();
		});
		$(tabTit).children().click(function() {
			$(this).addClass(on).siblings().removeClass(on);
			var index = $(tabTit).children().index(this);
			$(tabCon).children().eq(index).show().siblings().hide();

			// if (currentUrl.indexOf("game-klc.html") != -1 &&
			// $(tabTit).attr('id') === 'gameMenus') {
			// var shortId = $(this).find('span').attr('class');
			// if (shortId && shortId != '') {
			// loadOpenTimes(shortId);
			// openCodeList(shortId);
			// $('#shortNameKlc').val(shortId);
			// getUserBetsListToday();// 初始化投注方案
			// }
			// }

		});
	}
	tabs(".hb-tabHd", "hb-cur", ".hb-tabBd");
	tabs(".tabHd", "cur", ".tabBd");
	// 单项选择样式
	$('.agenRadio label').click(
			function() {
				var radioId = $(this).attr('name');
				$('.agenRadio label').removeAttr('class')
						&& $(this).attr('class', 'checked');
				$('input[type="radio"].inradio').removeAttr('checked')
						&& $('#' + radioId).attr('checked', 'checked');
			});

	$('.zhangkai li').click(function() {
		//console.log(233);
		$(this).addClass('cur').siblings().removeClass('cur');
	});
	//
	$('.hf-an .hui').click(function() {
		$(this).parent().siblings().toggle()
	})

});

// 头部滚动固定
$(window).bind("scroll", function() {
	var sel = $("#J_m_nav");

	if ($(window).scrollTop() > 100) {
		sel.addClass("xs");
	}
	if ($(window).scrollTop() == 0) {
		sel.removeClass("xs");
	}
});

// 快速到账动画
$(document).ready(function() {
	$("#dztime i").animate({
		width : '65%'
	}, 400);
	$("#qktime i").animate({
		width : '50%'
	}, 1100);
	// 彩种选择
	$('.caizxz').click(function() {
		$('.move-cz').toggle();
	});
	// 玩法说明
	$('.cz-wanfa div.wf i').click(function() {
		$('div.sm-wfsm').toggle();
	});
	$('.cz-wanfa div.wf i').mouseover(function() {
		$('div.sm-wfsm').show();
	});
	$('.cz-wanfa div.wf i').mouseout(function() {
		$('div.sm-wfsm').hide();
	});
});


function GetUrlParam(paraName) {
　　　　var url = document.location.toString();
　　　　var arrObj = url.split("?");

　　　　if (arrObj.length > 1) {
　　　　　　var arrPara = arrObj[1].split("&");
　　　　　　var arr;

　　　　　　for (var i = 0; i < arrPara.length; i++) {
　　　　　　　　arr = arrPara[i].split("=");

　　　　　　　　if (arr != null && arr[0] == paraName) {
　　　　　　　　　　return arr[1];
　　　　　　　　}
　　　　　　}
　　　　　　return "";
　　　　}
　　　　else {
　　　　　　return "";
　　　　}
　　}


// //统一弹出框
var layerindex;

function pop(id) {
	if (!$("#" + id).is(":hidden")) {
		return;
	}
	var contents = $("#" + id);
	layer.open({
		type : 1,
		title : false, // 不显示标题
		content : contents
	});
	layerindex = window.layer.index;
}

// 弹框上再弹框layerindex会覆盖
var wjmmlayerindex;
function popWjmmDlg(id) {
	var contents = $("#" + id);
	layer.open({
		type : 1,
		title : false, // 不显示标题
		content : contents
	});
	wjmmlayerindex = window.layer.index;
}
// 关闭wjmm弹框
function closeWjmmLayer() {
	window.layer.close(wjmmlayerindex);
}

// 关闭弹框
function closelayer() {
	window.layer.close(layerindex);
}
// 屏蔽右键
function doNothing(e) {
	if (window.event) {
		window.event.returnValue = false;
	} else {
		e.preventDefault();
	}
}

// //倍数填写下拉
function showAndHide(obj, types) {
	var Layer = window.document.getElementById(obj);
	switch (types) {
	case "show":
		Layer.style.display = "block";
		break;
	case "hide":
		Layer.style.display = "none";
		break;
	}
}

function getValue(obj, str) {
	var input = window.document.getElementById(obj);
	input.value = str;
}

// 弹框上再弹框layerindex会覆盖
var wjmmlayerindex;
function popWjmmDlg(id) {
	var contents = $("#" + id);
	layer.open({
		type : 1,
		title : false, // 不显示标题
		content : contents
	});
	wjmmlayerindex = window.layer.index;
}

// 关闭wjmm弹框
function closeWjmmLayer() {
	window.layer.close(wjmmlayerindex);
}

// 日期计算
function dateDiff(date1, date2) {
	var type1 = typeof date1, type2 = typeof date2;
	if (type1 == 'string')
		date1 = stringToTime(date1);
	else if (date1.getTime)
		date1 = date1.getTime();
	if (type2 == 'string')
		date2 = stringToTime(date2);
	else if (date2.getTime)
		date2 = date2.getTime();
	// alert((date1 - date2) / (1000*60*60));
	var diff = (date2 - date1) / (1000 * 60 * 60 * 24); // 结果是小时

	return eval(diff);
}

// 字符串转成Time(dateDiff)所需方法
function stringToTime(string) {
	var f = string.split(' ', 2);
	var d = (f[0] ? f[0] : '').split('-', 3);
	var t = (f[1] ? f[1] : '').split(':', 3);
	return (new Date(parseInt(d[0], 10) || null, (parseInt(d[1], 10) || 1) - 1,
			parseInt(d[2], 10) || null, parseInt(t[0], 10) || null, parseInt(
					t[1], 10)
					|| null, parseInt(t[2], 10) || null)).getTime();
}

/**
 * 日期检查(查询日期不能跨月, 并且时间间隔不能超过 7 天)
 */
function checkTowDate(dt1, dt2) {
	dt1 = new Date(dt1.replace(/-/g, "/"));
	dt2 = new Date(dt2.replace(/-/g, "/"));
	if ((dt1.getFullYear() == dt2.getFullYear() && dt1.getMonth() == dt2
			.getMonth())
			|| (dt1.getMonth() + 1 == dt2.getMonth() && dt2.getDate() == 1)
			|| (dt1.getMonth() == 11 && dt2.getDate() == 1)) {
		return true;
	}
	return false;
}

function getRs(o, c) {
	var l = o.length;
	var r = new Array();
	var f = new Array();
	if (c > l) {
		return r
	}
	if (c == 1) {
		return o
	}
	if (l == c) {
		r[0] = o.join(",");
		return r
	}
	var a = "";
	var b = "";
	var s = "";
	for (var g = 0; g < c; g++) {
		a += "1";
		b += "1"
	}
	for (var e = 0; e < l - c; e++) {
		a += "0"
	}
	for (var d = 0; d < c; d++) {
		s += o[d] + ","
	}
	r[0] = s.substr(0, s.length - 1);
	var h = 1;
	s = "";
	while (a.substr(a.length - c, c) != b) {
		a = Math.MoveStr(a);
		for (var d = 0; d < l; d++) {
			if (a.substr(d, 1) == "1") {
				s += o[d] + ","
			}
		}
		r[h] = s.substr(0, s.length - 1);
		s = "";
		h++
	}
	return r
}


/**
 * 创建客户端唯一的单号
 * @return {[type]} [description]
 */
function createCustomOrderNo(){
	return ""+Math.round((Math.random() * 1000000))+
		new Date().getTime()+Math.round((Math.random() * 10000000));
}

function info()
{
	$.ajax({
		url : "/user/userInfo",
		method : 'GET',
		success : function(data) {
			if (data.retcode == 0) {
				$.session.set("loginname",data.data.userName);
				$.session.set("balance",data.data.coin.toFixed(2));
				$.session.set("fandian",data.data.fandian);
				$("#session_loginname").text($.session.get("loginname"));
		        $("#session_balance").text($.session.get("balance"));
			} else {
				popTips(data.message||"您尚未登录或登录时间过长,请重新登录!", "error");
			}
		}
	});
}

/*
 * JSON.js
 */
if (typeof JSON !== "object") {
	JSON = {}
}
(function() {
	function f(n) {
		return n < 10 ? "0" + n : n
	}
	if (typeof Date.prototype.toJSON !== "function") {
		Date.prototype.toJSON = function() {
			return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-"
					+ f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate())
					+ "T" + f(this.getUTCHours()) + ":"
					+ f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds())
					+ "Z" : null
		};
		String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
			return this.valueOf()
		}
	}
	var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
		"\b" : "\\b",
		"\t" : "\\t",
		"\n" : "\\n",
		"\f" : "\\f",
		"\r" : "\\r",
		'"' : '\\"',
		"\\" : "\\\\"
	}, rep;
	function quote(string) {
		escapable.lastIndex = 0;
		return escapable.test(string) ? '"'
				+ string.replace(escapable, function(a) {
					var c = meta[a];
					return typeof c === "string" ? c : "\\u"
							+ ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
				}) + '"' : '"' + string + '"'
	}
	function str(key, holder) {
		var i, k, v, length, mind = gap, partial, value = holder[key];
		if (value && typeof value === "object"
				&& typeof value.toJSON === "function") {
			value = value.toJSON(key)
		}
		if (typeof rep === "function") {
			value = rep.call(holder, key, value)
		}
		switch (typeof value) {
		case "string":
			return quote(value);
		case "number":
			return isFinite(value) ? String(value) : "null";
		case "boolean":
		case "null":
			return String(value);
		case "object":
			if (!value) {
				return "null"
			}
			gap += indent;
			partial = [];
			if (Object.prototype.toString.apply(value) === "[object Array]") {
				length = value.length;
				for (i = 0; i < length; i += 1) {
					partial[i] = str(i, value) || "null"
				}
				v = partial.length === 0 ? "[]" : gap ? "[\n" + gap
						+ partial.join(",\n" + gap) + "\n" + mind + "]" : "["
						+ partial.join(",") + "]";
				gap = mind;
				return v
			}
			if (rep && typeof rep === "object") {
				length = rep.length;
				for (i = 0; i < length; i += 1) {
					if (typeof rep[i] === "string") {
						k = rep[i];
						v = str(k, value);
						if (v) {
							partial.push(quote(k) + (gap ? ": " : ":") + v)
						}
					}
				}
			} else {
				for (k in value) {
					if (Object.prototype.hasOwnProperty.call(value, k)) {
						v = str(k, value);
						if (v) {
							partial.push(quote(k) + (gap ? ": " : ":") + v)
						}
					}
				}
			}
			v = partial.length === 0 ? "{}" : gap ? "{\n" + gap
					+ partial.join(",\n" + gap) + "\n" + mind + "}" : "{"
					+ partial.join(",") + "}";
			gap = mind;
			return v
		}
	}
	if (typeof JSON.stringify !== "function") {
		JSON.stringify = function(value, replacer, space) {
			var i;
			gap = "";
			indent = "";
			if (typeof space === "number") {
				for (i = 0; i < space; i += 1) {
					indent += " "
				}
			} else {
				if (typeof space === "string") {
					indent = space
				}
			}
			rep = replacer;
			if (replacer
					&& typeof replacer !== "function"
					&& (typeof replacer !== "object" || typeof replacer.length !== "number")) {
				throw new Error("JSON.stringify")
			}
			return str("", {
				"" : value
			})
		}
	}
	if (typeof JSON.parse !== "function") {
		JSON.parse = function(text, reviver) {
			var j;
			function walk(holder, key) {
				var k, v, value = holder[key];
				if (value && typeof value === "object") {
					for (k in value) {
						if (Object.prototype.hasOwnProperty.call(value, k)) {
							v = walk(value, k);
							if (v !== undefined) {
								value[k] = v
							} else {
								delete value[k]
							}
						}
					}
				}
				return reviver.call(holder, key, value)
			}
			text = String(text);
			cx.lastIndex = 0;
			if (cx.test(text)) {
				text = text.replace(cx, function(a) {
					return "\\u"
							+ ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
				})
			}
			if (/^[\],:{}\s]*$/
					.test(text
							.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
							.replace(
									/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
									"]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
				j = eval("(" + text + ")");
				return typeof reviver === "function" ? walk({
					"" : j
				}, "") : j
			}
			throw new SyntaxError("JSON.parse")
		}
	}
}());
;
$
		.extend({
			/**
			 * @function IE6-9
			 *           placeholder与textarea的maxlength修复，并提供值改变时的回调函数供实时捕捉用户输入
			 *           fixed oncontextmenu delete or cut and backspace
			 * @param id:
			 *            必选参数，元素的id
			 * @param fn:
			 *            可选参数，实时响应的回调函数
			 * @return 通过id获取的元素
			 * @note 原理说明：IE6-9动态生成另一个一样的背景透明的输入框叠加到本输入框下层，通过selectionchange、onpropertychange事件与keyup等事件实现实时捕捉，现代谷歌火狐内核的浏览器直接支持placeholder与maxlength，这里用input事件实现了实时输入捕捉
			 * @inadequate 不足：影响了页面结构，未实现事件代理，动态元素必须先插入文档之后再执行此函数实现动态添加的元素placeholder与maxlength修复；IE6-9
			 *             onpropertychange也能捕捉到js设置输入框值改变的事件，但现代谷歌火狐内核的浏览器捕捉不到
			 */
			iChange : function(id, fn) {
				var obj = id.nodeType == 1 ? id : document.getElementById(id), inputClone = document
						.createElement(obj.nodeName == 'INPUT' ? 'INPUT'
								: 'TEXTAREA'), advancedBrowser = 'placeholder' in inputClone;
				if (advancedBrowser) {
					obj.addEventListener("input", function(e) {
						fn && fn.call(this, e);
					}, false);
				} else {
					// IE6-9
					var docElem = document.documentElement, inpCloneStyle = inputClone.style, placeholder = obj
							.getAttributeNode('placeholder'), curstyle = obj.currentStyle;
					placeholder = placeholder ? placeholder.nodeValue : '';
					if (placeholder) {
						// 初始化inputClone
						inpCloneStyle.cssText = obj.style.cssText
								+ ';position:absolute;color:graytext;background-color:transparent;border-top-color:transparent;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent;';
						inputClone.className = obj.className;
						inputClone.disabled = true;
						if (obj.value === '' || obj.defaultValue === '') {
							inputClone.value = placeholder;
						}

						if (curstyle.position == 'static') {
							obj.style.position = 'relative';
						} else {
							if (typeof curstyle.zIndex == 'number'
									&& curstyle.zIndex > 0) {
								inpCloneStyle.zIndex = --curstyle.zIndex;
							} else {
								inpCloneStyle.zIndex = 0;
							}
						}
						inpCloneStyle.left = obj.offsetLeft + 'px';
						inpCloneStyle.top = obj.offsetTop + 'px';
					}
					var IEwatchChange = function(e) {
						var e = window.event || e, maxLen = obj
								.getAttributeNode('maxlength'), maxLen = maxLen
								&& parseInt(maxLen.nodeValue);
						if (e.type == 'selectionchange'
								|| e.propertyName == "value") {
							var objVal = obj.value;
							if (placeholder) {
								if (objVal === '')
									inputClone.value = placeholder;
								else
									inputClone.value = '';
							}
							// input的maxlength所有浏览器都支持，只有TEXTAREA不支持
							if (maxLen && obj.nodeName == 'TEXTAREA'
									&& objVal.length > maxLen) {
								obj.value = objVal.substring(0, maxLen);
							}
							fn && fn.call(obj, e);
						}
					};
					if (!window.XMLHttpRequest) {
						// IE6无法聚焦修复
						obj.attachEvent('onclick', function() {
							obj.focus();
						});
						inputClone.attachEvent('onclick', function() {
							obj.focus();
						});
					}
					// 现代型事件绑定
					obj.attachEvent("onfocus",
							function() {
								// 主要解决IE9中oncontextmenu delete or cut and
								// backspace事件在onpropertychange时不响应
								document.attachEvent("onselectionchange",
										IEwatchChange);
							});

					obj.attachEvent("onpropertychange", IEwatchChange);

					obj.attachEvent("onblur",
							function() {
								document.detachEvent("onselectionchange",
										IEwatchChange);
							});

					// 事件全部绑定后再插入，尽量减少对dom重复渲染
					if (placeholder) {
						obj.style.backgroundColor = 'transparent';
						// IE6,8,9 input在将输入框背景设成透明时无法聚焦bug修复
						obj.style.backgroundImage = 'url(about:blank)';
						obj.parentNode.insertBefore(inputClone, obj);
					}
				}
				return obj;
			},
			/**
			 * 获取这个数字的范围,如：5 返回 [0,1,2,3,4]
			 */
			range : function(n) {
				var i = 0;
				var arr = [];
				for (; i < n; i++) {
					arr.push(i);
				}
				return arr;
			},
			/**
			 * 参数替代
			 */
			substitute : function(_tmpl, _data) {
				return _tmpl.replace(/{([^{}]+)}/g, function(word) {
					return _data[word.replace(/({|})+/g, "")]
				});
			},
			/**
			 * 将金额模式改成中文模式
			 */
			modelToCHN : function(_model) {
				switch (_model) {
				case 2.00:
					_model = '元';
					break;
				case 0.20:
					_model = '角';
					break;
				case 0.02:
					_model = '分';
					break;
				case 0.002:
					_model = '厘';
					break;
				}
				return _model;
			}, 
			check : {
				isUserN : function(b) { // 用户名校验 （用户名由4-16位的字母或数字组成）
					var c = /^(\d|\w){4,16}$/;
					return c.test(b);
				},
				isNum : function(b) { // 银行卡，数字组成
					var c = /^[0-9]*$/;
					return c.test(b);
				},
				isPwd : function(b) { // 密码校验
					var c = /^.{4,16}$/;
					return c.test(b);
				},
				isUserZN : function(b) { // 用户名校验
					// var c = /^[\u4e00-\u9fa5]{2,8}$/mi;
					var c = /^.{3,8}$/mi;
					return c.test(b);
				},
				isMoney : function(b) { // 是否是金额
					var c = /^\d+((\.\d+)|)$/;
					return c.test(b);
				},
				isCN : function(b) { // 是否是中文
					var c = /^[\u4e00-\u9fa5]+$/mi;
					return c.test(b)
				},
				isTEL : function(b) { // 是否是家庭座机
					var c = /^(\+?\d{1,4})?([\- ]?\d{3,5})?([\- ]?\d{7,8})([\- ]?\d{3,5})?$/mi;
					return c.test(b)
				},
				isMobile : function(b) { // 是否是手机号码
					var c = /^1[34568]\d{9}$/mi;
					return c.test(b)
				},
				isEmail : function(b) { // 是否是电子邮件
					var c = /^[^\s\@]+\@[^\s\@]+$/mi;
					return c.test(b)
				},
				isCNID : function(d) { // 是否是中国大陆身份证
					var c = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4,
							2, 1 ];
					var g = [ 1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2 ];
					var b = [];
					var e = null;
					if (d.length != 15 && d.length != 18) {
						return false
					}

					function f(p) {
						var o = 0;
						var n = 0;
						var h = 0;
						if (p.length == 18) {
							p = p.substring(0, 17)
						}
						for (var m = 0; m < 17; m++) {
							h = p.substring(m, m + 1);
							b[m] = h * 1
						}
						for (var l = 0; l < 17; l++) {
							n += c[l] * b[l]
						}
						o = n % 11;
						return g[o]
					}
					if (d.length == 15) {
						e = d.substring(0, 6);
						e = e + "19";
						e = e + d.substring(6, 15);
						e = e + f(e);
						d = e
					}
					return (f(d) == d.substring(17, 18))
				},
				isHKID : function(l) { // 是否是香港身份证
					var b = {
						A : 1,
						B : 2,
						C : 3,
						D : 4,
						E : 5,
						F : 6,
						G : 7,
						H : 8,
						I : 9,
						J : 10,
						K : 11,
						L : 12,
						M : 13,
						N : 14,
						O : 15,
						P : 16,
						Q : 17,
						R : 18,
						S : 19,
						T : 20,
						U : 21,
						V : 22,
						W : 23,
						X : 24,
						Y : 25,
						Z : 26
					};
					var f = l.substring(0, 7);
					var k = f.split("");
					var m = null;
					var g = 0;
					var h = 0;
					var d = l.substring(8, 9) * 1;
					for (var e = 0, c = 8; e < 7; e++, c--) {
						m = b[k[e]] || k[e];
						g += m * c
					}
					h = g % 11 == 0 ? 0 : 11 - g % 11;
					return (d == h)
				},
				isQQ : function(b) { // 是否是QQ
					var c = /^[1-9]{1}\d{5,10}$/;
					return c.test(b)
				},
				isDatetime : function(c) { // 是否是时间
					var b = [ "%y%M%d", "%y-%M-%d", "%y.%M.%d", "%y年%M月%d日",
							"%y年%M月%d", "%M%d%y", "%M-%d-%y", "%M.%d.%y",
							"%M月%d日%y年", "%M月%d日%y", "%d%M%y", "%d-%M-%y",
							"%d.%M.%y", "%d日%M月%y年", "%d日%M月%y", "%M/%d, %w",
							"%d/%M, %w", "%M/%d, %W", "%d/%M, %W", "%M/%d, %a",
							"%d/%M, %a", "%M/%d, %A", "%d/%M, %A",
							"%y%M%d %h:%m:%s", "%y-%M-%d %h:%m:%s",
							"%y.%M.%d %h:%m:%s", "%y年%M月%d日 %h:%m:%s",
							"%y年%M月%d %h:%m:%s", "%M%d%y %h:%m:%s",
							"%M-%d-%y %h:%m:%s", "%M.%d.%y %h:%m:%s",
							"%M月%d日%y年 %h:%m:%s", "%M月%d日%y %h:%m:%s",
							"%d%M%y %h:%m:%s", "%d-%M-%y %h:%m:%s",
							"%d.%M.%y %h:%m:%s", "%d日%M月%y年 %h:%m:%s",
							"%d日%M月%y %h:%m:%s", "%M/%d %h:%m:%s, %w",
							"%d/%M %h:%m:%s, %w", "%M/%d %h:%m:%s, %W",
							"%d/%M %h:%m:%s, %W", "%M/%d %h:%m:%s, %a",
							"%d/%M %h:%m:%s, %a", "%M/%d %h:%m:%s, %A",
							"%d/%M %h:%m:%s, %A", "%y%M%d %h:%m",
							"%y-%M-%d %h:%m", "%y.%M.%d %h:%m",
							"%y年%M月%d日 %h:%m", "%y年%M月%d %h:%m",
							"%M%d%y %h:%m", "%M-%d-%y %h:%m", "%M.%d.%y %h:%m",
							"%M月%d日%y年 %h:%m", "%M月%d日%y %h:%m",
							"%d%M%y %h:%m", "%d-%M-%y %h:%m", "%d.%M.%y %h:%m",
							"%d日%M月%y年 %h:%m", "%d日%M月%y %h:%m",
							"%M/%d %h:%m, %w", "%d/%M %h:%m, %w",
							"%M/%d %h:%m, %W", "%d/%M %h:%m, %W",
							"%M/%d %h:%m, %a", "%d/%M %h:%m, %a",
							"%M/%d %h:%m, %A", "%d/%M %h:%m, %A", "%y%M%d %h",
							"%y-%M-%d %h", "%y.%M.%d %h", "%y年%M月%d日 %h",
							"%y年%M月%d %h", "%M%d%y %h", "%M-%d-%y %h",
							"%M.%d.%y %h", "%M月%d日%y年 %h", "%M月%d日%y %h",
							"%d%M%y %h", "%d-%M-%y %h", "%d.%M.%y %h",
							"%d日%M月%y年 %h", "%d日%M月%y %h", "%M/%d %h, %w",
							"%d/%M %h, %w", "%M/%d %h, %W", "%d/%M %h, %W",
							"%M/%d %h, %a", "%d/%M %h, %a", "%M/%d %h, %A",
							"%d/%M %h, %A" ];
					var e = b.length;
					var f = null;
					for (var d = 0; d < e; d++) {
						f = a.V._checkDate(c, b[d]);
						if (f) {
							return true
						}
					}
					return false
				}
			} 
		});


/*!
 * jquery.base64.js 0.1 - https://github.com/yckart/jquery.base64.js
 * Makes Base64 en & -decoding simpler as it is.
 *
 * Based upon: https://gist.github.com/Yaffle/1284012
 *
 * Copyright (c) 2012 Yannick Albert (http://yckart.com)
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
 * 2013/02/10
 **/
;(function($) {

    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        a256 = '',
        r64 = [256],
        r256 = [256],
        i = 0;

    var UTF8 = {

        /**
         * Encode multi-byte Unicode string into utf-8 multiple single-byte characters
         * (BMP / basic multilingual plane only)
         *
         * Chars in range U+0080 - U+07FF are encoded in 2 chars, U+0800 - U+FFFF in 3 chars
         *
         * @param {String} strUni Unicode string to be encoded as UTF-8
         * @returns {String} encoded string
         */
        encode: function(strUni) {
            // use regular expressions & String.replace callback function for better efficiency
            // than procedural approaches
            var strUtf = strUni.replace(/[\u0080-\u07ff]/g, // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
            function(c) {
                var cc = c.charCodeAt(0);
                return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f);
            })
            .replace(/[\u0800-\uffff]/g, // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
            function(c) {
                var cc = c.charCodeAt(0);
                return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3F, 0x80 | cc & 0x3f);
            });
            return strUtf;
        },

        /**
         * Decode utf-8 encoded string back into multi-byte Unicode characters
         *
         * @param {String} strUtf UTF-8 string to be decoded back to Unicode
         * @returns {String} decoded string
         */
        decode: function(strUtf) {
            // note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!
            var strUni = strUtf.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, // 3-byte chars
            function(c) { // (note parentheses for precence)
                var cc = ((c.charCodeAt(0) & 0x0f) << 12) | ((c.charCodeAt(1) & 0x3f) << 6) | (c.charCodeAt(2) & 0x3f);
                return String.fromCharCode(cc);
            })
            .replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, // 2-byte chars
            function(c) { // (note parentheses for precence)
                var cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f;
                return String.fromCharCode(cc);
            });
            return strUni;
        }
    };

    while(i < 256) {
        var c = String.fromCharCode(i);
        a256 += c;
        r256[i] = i;
        r64[i] = b64.indexOf(c);
        ++i;
    }

    function code(s, discard, alpha, beta, w1, w2) {
        s = String(s);
        var buffer = 0,
            i = 0,
            length = s.length,
            result = '',
            bitsInBuffer = 0;

        while(i < length) {
            var c = s.charCodeAt(i);
            c = c < 256 ? alpha[c] : -1;

            buffer = (buffer << w1) + c;
            bitsInBuffer += w1;

            while(bitsInBuffer >= w2) {
                bitsInBuffer -= w2;
                var tmp = buffer >> bitsInBuffer;
                result += beta.charAt(tmp);
                buffer ^= tmp << bitsInBuffer;
            }
            ++i;
        }
        if(!discard && bitsInBuffer > 0) result += beta.charAt(buffer << (w2 - bitsInBuffer));
        return result;
    }

    var Plugin = $.base64 = function(dir, input, encode) {
            return input ? Plugin[dir](input, encode) : dir ? null : this;
        };

    Plugin.btoa = Plugin.encode = function(plain, utf8encode) {
        plain = Plugin.raw === false || Plugin.utf8encode || utf8encode ? UTF8.encode(plain) : plain;
        plain = code(plain, false, r256, b64, 8, 6);
        return plain + '===='.slice((plain.length % 4) || 4);
    };

    Plugin.atob = Plugin.decode = function(coded, utf8decode) {
        coded = String(coded).split('=');
        var i = coded.length;
        do {--i;
            coded[i] = code(coded[i], true, r64, a256, 6, 8);
        } while (i > 0);
        coded = coded.join('');
        return Plugin.raw === false || Plugin.utf8decode || utf8decode ? UTF8.decode(coded) : coded;
    };
}(jQuery));