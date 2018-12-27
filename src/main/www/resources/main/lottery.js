/** **********add by ian about lottery open differents balls*************** */
// 进入页面方法
// 开奖过程
var T10;
var T9;
var T8;
var T7;
var T6;
var T5;
var T4;
var T3;
var T2;
var T1;
function openLottery(ball, maxnum) {
	if (T10) {
		clearInterval(T10);
		way.set("showExpect.openCode10", " ");
	}
	if (T9) {
		clearInterval(T9);
		way.set("showExpect.openCode9", " ");
	}
	if (T8) {
		clearInterval(T8);
		way.set("showExpect.openCode8", " ");
	}
	if (T7) {
		clearInterval(T7);
		way.set("showExpect.openCode7", " ");
	}
	if (T6) {
		clearInterval(T6);
		way.set("showExpect.openCode6", " ");
	}
	if (T5) {
		clearInterval(T5);
		way.set("showExpect.openCode5", " ");
	}
	if (T4) {
		clearInterval(T4);
		way.set("showExpect.openCode4", " ");
	}
	if (T3) {
		clearInterval(T3);
		way.set("showExpect.openCode3", " ");
	}
	if (T2) {
		clearInterval(T2);
		way.set("showExpect.openCode2", " ");
	}
	if (T1) {
		clearInterval(T1);
		way.set("showExpect.openCode1", " ");
	}
	var qiuanimation3Div = $("#qiuanimation3");
	if(qiuanimation3Div.length > 0) {
		qiuanimation3Div.hide();
		qiuanimation3Div.find("div.bigone").empty();
		qiuanimation3Div.find("div.bigone").hide();
	}
	var qiuanimation5Div = $("#qiuanimation5");
	if(qiuanimation5Div.length > 0) {
		qiuanimation5Div.hide();
		qiuanimation5Div.find("div.bigone").empty();
		qiuanimation5Div.find("div.bigone").hide();
	}
	$(".kaijq").find('ul').hide();
	if (ball == 3) {
		$(".lotter-bigqiu3").show();
	} else if (ball == 5) {
		$(".lotter-bigqiu5").show();
	} else if (ball == 8) {
		$(".lotter-bigsmll8").show();
	} else if (ball == 10) {
		$(".lotter-bigsmll10").show();
	} 
	Lottery(ball, maxnum);

}
// // 开奖停止
// function stopLottery(opennums) {
// 	var len, numarray, flag;
// 	flag = opennums.indexOf(",");
// 	if (flag < 0) {
// 		stopLottery(1, opennums);
// 	} else {
// 		numarray = opennums.split(",");
// 		len = numarray.length;
// 		stopLottery(3, numarray);

// 	}

// }
// 页面加载完后5个球展示
function showLottery() {
	var kaijqPanel = $(".kaijq ul");
	if(kaijqPanel.eq(0).css('display')=='block'){
		kaijqPanel.eq(0).find('li').hide();
		kaijqPanel.eq(0).find('li').eq(0).fadeIn(800, function() {
			kaijqPanel.eq(0).find('li').eq(1).fadeIn(800, function() {
				kaijqPanel.eq(0).find('li').eq(2).fadeIn(800, function() {
					
				});
			});
		});
	}
	if(kaijqPanel.eq(1).css('display')=='block'){
		kaijqPanel.eq(1).find('li').hide();
		kaijqPanel.eq(1).find('li').eq(0).fadeIn(800, function() {
			kaijqPanel.eq(1).find('li').eq(1).fadeIn(800, function() {
				kaijqPanel.eq(1).find('li').eq(2).fadeIn(800, function() {
					kaijqPanel.eq(1).find('li').eq(3).fadeIn(800, function() {
						kaijqPanel.eq(1).find('li').eq(4).fadeIn(800, function() {
						});
					});
				});
			});
		});
	}
	if(kaijqPanel.eq(2).css('display')=='block'){
		kaijqPanel.eq(2).find('li').hide();
			kaijqPanel.eq(2).find('li').eq(0).fadeIn(800, function() {
			kaijqPanel.eq(2).find('li').eq(1).fadeIn(800, function() {
				kaijqPanel.eq(2).find('li').eq(2).fadeIn(800, function() {
					kaijqPanel.eq(2).find('li').eq(3).fadeIn(800, function() {
						kaijqPanel.eq(2).find('li').eq(4).fadeIn(800, function() {
							kaijqPanel.eq(2).find('li').eq(5).fadeIn(800, function() {
								kaijqPanel.eq(2).find('li').eq(6).fadeIn(800, function() {
									kaijqPanel.eq(2).find('li').eq(7).fadeIn(800, function() {
									});
								});
							});
						});
					});
				});
			});
		});
	}
	if(kaijqPanel.eq(3).css('display')=='block'){
		kaijqPanel.eq(3).find('li').hide();
			kaijqPanel.eq(3).find('li').eq(0).fadeIn(800, function() {
				kaijqPanel.eq(3).find('li').eq(1).fadeIn(800, function() {
					kaijqPanel.eq(3).find('li').eq(2).fadeIn(800, function() {
						kaijqPanel.eq(3).find('li').eq(3).fadeIn(800, function() {
							kaijqPanel.eq(3).find('li').eq(4).fadeIn(800, function() {
								kaijqPanel.eq(3).find('li').eq(5).fadeIn(800, function() {
									kaijqPanel.eq(3).find('li').eq(6).fadeIn(800, function() {
										kaijqPanel.eq(3).find('li').eq(7).fadeIn(800, function() {
											kaijqPanel.eq(3).find('li').eq(8).fadeIn(800, function() {
												kaijqPanel.eq(3).find('li').eq(9).fadeIn(800, function() {
											});
										});
									});
								});
							});
						});
					});
				});
			});
		});
	}
}
/** ***************************************************** */

// 复写settimetou方法
jQuery.fn.extend({
	afterTime : function(sec, callback) {
		that = $(this);
		setTimeout(function() {
			callback.call(that);
			return that;
		}, sec);
		return this;
	}
});

function Lottery(num, maxnum) {
	if (num >= 10) {
		T10 = window.setInterval(function() {
			openLottery10(maxnum);
		}, 50);
	}
	if (num >= 9) {
		T9 = window.setInterval(function() {
			openLottery9(maxnum);
		}, 50);
	}
	if (num >= 8) {
		T8 = window.setInterval(function() {
			openLottery8(maxnum);
		}, 50);
	}
	if (num >= 7) {
		T7 = window.setInterval(function() {
			openLottery7(maxnum);
		}, 50);
	}
	if (num >= 6) {
		T6 = window.setInterval(function() {
			openLottery6(maxnum);
		}, 50);
	}
	if (num >= 5) {
		T5 = window.setInterval(function() {
			openLottery5(maxnum);
		}, 50);
	}
	if (num >= 4) {
		T4 = window.setInterval(function() {
			openLottery4(maxnum);
		}, 50);
	}
	if (num >= 3) {
		T3 = window.setInterval(function() {
			openLottery3(maxnum);
		}, 50);
	}
	if (num >= 2) {
		T2 = window.setInterval(function() {
			openLottery2(maxnum);
		}, 50);
	}
	if (num >= 1) {
		T1 = window.setInterval(function() {
			openLottery1(maxnum);
		}, 50);
	}
}
function openLottery1(maxnum) {
	way.set("showExpect.openCode1", Math
			.round(Math.random() * (maxnum - 1) + 1));
}

function openLottery2(maxnum) {
	way.set("showExpect.openCode2", Math
			.round(Math.random() * (maxnum - 1) + 1));
}

function openLottery3(maxnum) {
	way.set("showExpect.openCode3", Math
			.round(Math.random() * (maxnum - 1) + 1));
}

function openLottery4(maxnum) {
	way.set("showExpect.openCode4", Math
			.round(Math.random() * (maxnum - 1) + 1));
}

function openLottery5(maxnum) {
	way.set("showExpect.openCode5", Math
			.round(Math.random() * (maxnum - 1) + 1));
}
function openLottery6(maxnum) {
	way.set("showExpect.openCode6", Math
			.round(Math.random() * (maxnum - 1) + 1));
}

function openLottery7(maxnum) {
	way.set("showExpect.openCode7", Math
			.round(Math.random() * (maxnum - 1) + 1));
}

function openLottery8(maxnum) {
	way.set("showExpect.openCode8", Math
			.round(Math.random() * (maxnum - 1) + 1));
}
function openLottery9(maxnum) {
	way.set("showExpect.openCode9", Math
			.round(Math.random() * (maxnum - 1) + 1));
}
function openLottery10(maxnum) {
	way.set("showExpect.openCode10", Math.round(Math.random() * (maxnum - 1) + 1));
}
// 停止开奖
function stopLottery(codes) {
	var nums = codes.split(',');
	if (nums.length >= 10) {
		setTimeout(function() {
			clearInterval(T10);
			way.set("showExpect.openCode10", nums[9] + "");
//			if(nums.length==10){
//				showLottery();
//			}
		}, 4000);
	}
	if (nums.length >= 9) {
		setTimeout(function() {
			clearInterval(T9);
			way.set("showExpect.openCode9", nums[8] + "");
//			if(nums.length==9){
//				showLottery();
//			}
		}, 4000);
	}
	if (nums.length >= 8) {
		setTimeout(function() {
			clearInterval(T8);
			way.set("showExpect.openCode8", nums[7] + "");
//			if(nums.length==8){
//				showLottery();
//			}
		}, 4000);
	}
	if (nums.length >= 7) {
		setTimeout(function() {
			clearInterval(T7);
			way.set("showExpect.openCode7", nums[6] + "");
//			if(nums.length==7){
//				showLottery();
//			}
		}, 3500);
	}
	if (nums.length >= 6) {
		setTimeout(function() {
			clearInterval(T6);
			way.set("showExpect.openCode6", nums[5] + "");
//			if(nums.length==6){
//				showLottery();
//			}
		}, 3000);
	}
	if (nums.length >= 5) {
		setTimeout(function() {
			clearInterval(T5);
			way.set("showExpect.openCode5", nums[4] + "");
			// if(nums.length==5){
			// 	showLottery();
			// }
		}, 2500);
	}
	if (nums.length >= 4) {
		setTimeout(function() {
			clearInterval(T4);
			way.set("showExpect.openCode4", nums[3] + "");
//			if(nums.length==4){
//				showLottery();
//			}
		}, 2000);
	}
	if (nums.length >= 3) {
		setTimeout(function() {
			clearInterval(T3);
			way.set("showExpect.openCode3", nums[2] + "");
//			if(nums.length==3){
//				showLottery();
//			}
		}, 1500);
	}
	if (nums.length >= 2) {
		setTimeout(function() {
			clearInterval(T2);
			way.set("showExpect.openCode2", nums[1] + "");
//			if(nums.length==2){
//				showLottery();
//			}
		}, 1000);
	}
	if (nums.length >= 1) {
		setTimeout(function() {
			clearInterval(T1);
			way.set("showExpect.openCode1", nums[0] + "");
//			if(nums.length==1){
//				showLottery();
//			}
		}, 200);
	}
}

//停止开奖
function stopLotteryBySourceCode(codes, sourceCodes) {
	var nums = codes.split(',');
	$("div.kaijq").find('ul').hide();
	switch(nums.length) {
		case 10:
			clearInterval(T10);
		case 9:
			clearInterval(T9);
		case 8:
			clearInterval(T8);
		case 7:
			clearInterval(T7);
		case 6:
			clearInterval(T6);
		case 5:
			clearInterval(T5);
		case 4:
			clearInterval(T4);
		case 3:
			clearInterval(T3);
		case 2:
			clearInterval(T2);
		case 1:
			clearInterval(T1);
		default:
	}
	
	var qiuanimationDiv;
	var liCount;
	if(nums.length == 3) {
		qiuanimationDiv = $("#qiuanimation3");
		liCount = 6;
	} else if(nums.length == 5) {
		qiuanimationDiv = $("#qiuanimation5");
		liCount = 4;
	} else {
		return false;
	}
	qiuanimationDiv.show();
	qiuanimationDiv.find('ul').show();
	qiuanimationDiv.find('li').attr("style", "");
	for(var i=0; i<silderchangeIndex.length; i++) {
		for(var j=0; j<silderchangeIndex[i].length; j++) {
			clearTimeout(silderchangeIndex[i][j]);
		}
	}
	for(var i=0; i<nums.length; i++) {
		qiuanimationDiv.find('.qiubig').eq(i).silderchange({obj:qiuanimationDiv,index:i,time:i,liCount:liCount});
	}
}

var silderchangeIndex = [];
$.fn.silderchange = function(slideroptions) {
	var slidervar = {
		obj : $('#qiuanimation5'),
		index : 0,
		time : 0,
		liCount : 4
	};
	var sliderval = $.extend(slidervar, slideroptions);
	var index = slidervar.index;
	var oul = slidervar.obj.find('.qiubig').eq(index);
	var oul1 = slidervar.obj.find('.qiubig').eq(index).find('.bigone');
	var time = sliderval.time;
	var liCount = sliderval.liCount;

	silderchangeIndex[index] = [];
	silderchangeIndex[index][0] = setTimeout(function() {
		if(liCount == 4) {
			silderchangeIndex[index][1] = setTimeout(function() {
				oul.find('li').eq(0).fadeIn(200);
			}, 500);
			silderchangeIndex[index][2] = setTimeout(function() {
				oul.find('li').eq(1).fadeIn(200);
			}, 1000);
			silderchangeIndex[index][3] = setTimeout(function() {
				oul.find('li').eq(2).fadeIn(200);
			}, 1500);
			silderchangeIndex[index][4] = setTimeout(function() {
				oul.find('li').eq(3).fadeIn(200);
			}, 2000);
		} else if(liCount == 6) {
			silderchangeIndex[index][1] = setTimeout(function() {
				oul.find('li').eq(0).fadeIn(200);
			}, 500);
			silderchangeIndex[index][2] = setTimeout(function() {
				oul.find('li').eq(1).fadeIn(200);
			}, 500);
			silderchangeIndex[index][3] = setTimeout(function() {
				oul.find('li').eq(2).fadeIn(200);
			}, 1000);
			silderchangeIndex[index][4] = setTimeout(function() {
				oul.find('li').eq(3).fadeIn(200);
			}, 1000);
			silderchangeIndex[index][5] = setTimeout(function() {
				oul.find('li').eq(4).fadeIn(200);
			}, 1500);
			silderchangeIndex[index][6] = setTimeout(function() {
				oul.find('li').eq(5).fadeIn(200);
			}, 1500);
		}

		silderchangeIndex[index][7] = setTimeout(function() {
			oul.find('li').eq(0).animate({
				'margin-left' : '-11px',
				'margin-top' : '-11px'
			}, 1000);
			oul.find('li').eq(1).animate({
				'margin-left' : '-11px',
				'margin-top' : '-11px'
			}, 1000);
			oul.find('li').eq(2).animate({
				'margin-left' : '-11px',
				'margin-top' : '-11px'
			}, 1000);
			oul.find('li').eq(3).animate({
				'margin-left' : '-11px',
				'margin-top' : '-11px'
			}, 1000);
			oul.find('li').eq(4).animate({
				'margin-left' : '-11px',
				'margin-top' : '-11px'
			}, 1000);
			oul.find('li').eq(5).animate({
				'margin-left' : '-11px',
				'margin-top' : '-11px'
			}, 1000);
			
			silderchangeIndex[index][8] = setTimeout(function() {
				oul1.fadeIn(100);
				oul1.animate({
					'width' : '44px',
					'height' : '44px',
					'top' : '0px',
					'left' : '0px'
				}, 300, function() {
					var tipHtml = '';
					var txt = 0;
					for(var i=0; i<liCount; i++) {
						var txtLi = oul.find('li').eq(i).text();
						txt += parseInt(txtLi);
						tipHtml += '<em>' + txtLi + '</em>+';
					}
					txt = txt.toString();
					var last = txt.substring(txt.length-1);
					var head = txt.substring(0, txt.length-1);
					if(tipHtml.length > 0) {
						tipHtml = tipHtml.substring(0, tipHtml.length-1);
						tipHtml += '=' + head + "<span style='color:red;'>" + last + '</span>';
					}
					oul.find('.jgtip').html(tipHtml);
					oul1.text(last);
				});
			}, 500);
		}, 2200);
	}, time * 2700);
};

/** **************************************************************************** */
// 倒计时定时器
var CDTime = null;
function countdownTime(leftSec, callback, shortName) {
	var h, m, s, t;
	if (CDTime) {
		clearInterval(CDTime);
	}
	var localCurrentTime = new Date();
	t = leftSec * 1000;
	var endTime = localCurrentTime.getTime() + t;
	if (t > 0) {
		h = Math.floor(t / 1000 / 60 / 60 % 24);
		if (h < 10) {
			h = "0" + h;
		}
		m = Math.floor(t / 1000 / 60 % 60);
		if (m < 10) {
			m = "0" + m;
		}
		s = Math.floor(t / 1000 % 60);
		if (s < 10) {
			s = "0" + s;
		}
		way.set("gametimes", h + ':' + m + ':' + s);
		way.set("gametimes.h", h);
		way.set("gametimes.m", m);
		way.set("gametimes.s", s);
		CDTime = setInterval(function() {
			t = endTime - (new Date()).getTime();
			if (t >= 0) {
				h = Math.floor(t / 1000 / 60 / 60 % 24);
				if (h < 10) {
					h = "0" + h;
				}
				m = Math.floor(t / 1000 / 60 % 60);
				if (m < 10) {
					m = "0" + m;
				}
				s = Math.floor(t / 1000 % 60);
				if (s < 10) {
					s = "0" + s;
				}
				way.set("gametimes", h + ':' + m + ':' + s);
				way.set("gametimes.h", h);
				way.set("gametimes.m", m);
				way.set("gametimes.s", s);
			} else {
				audioPlay(2);
				clearInterval(CDTime);
				(eval(callback))(shortName);

			}
		}, 500);

	} else {
		(eval(callback))(shortName);
	}
}