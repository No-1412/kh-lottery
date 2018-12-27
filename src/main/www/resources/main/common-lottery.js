;
(function(global) {
	var CGI = {
		GET_PLAYS : function() {
			return '/lottery/play?r=' + new Date().getTime()
		},
		LOTTERY_TIME : function() {
			return '/lottery/currenttime?r=' + new Date().getTime()
		}, // 获取倒计时时间
		SUBMIT_CODES : function() {
			return '/lottery/submit?r=' + new Date().getTime()
		},
		LOTTERY_HISTORY : function() {
			return '/lottery/history?r=' + new Date().getTime()
		}, // 获取最近十期投彩记录
		LOTTERY_DISTANCE : function() {
			return '/lottery/distance?r=' + new Date().getTime()
		}, // 判断当前时间是否在开奖间隔时间之内
		LOTTERY_APPENDBET : function() {
			return '/lottery/appendbet?r=' + new Date().getTime()
		}, // 查询追号
		CANCEL_ORDER : function() {
			return '/lottery/cancelLotteryBets?r=' + new Date().getTime()
		},// 撤单
		LOTTERY_BET_CHECK : function() {
			return '/lottery/betCheck?r=' + new Date().getTime()
		}, // 是否开奖，未开奖是0 已开奖是开奖数据
		LOTTERY_BET_DETAIL : function() {
			return '/lottery_bets/detail?r=' + new Date().getTime()
		}, // 是否开奖，未开奖是0 已开奖是开奖数据
		LOTTERY_HISTORY_DATA : function() {
			return '/lottery/queryHistoryLotteryData?r=' + new Date().getTime()
		}// 查询历史开奖记录
	};

	global.Play = {
		/**
		 * 奖金计算
		 * 奖金=最高奖金*(元[1]，角[0.1],分[0.01]})-(13%-个人返点数)*模式(元[2]，角[0.2],分[0.02]})*总注数
		 */
		bonusCalc : function(_maxBonus, _fd, _minBounus) {
			var fandian = (+$('#user_fandian').val()) * 100; // 从用户信息中取出的返点信息(等比例计算)
			var dc = 13 - fandian;
			var bonus = _maxBonus - ((_maxBonus - _minBounus) * dc / 13);
			return (bonus - (_maxBonus - _minBounus) * _fd / 13).toFixed(2);
		},
		/**
		 * 倒计时公共函数
		 * 
		 * @param {Date}
		 *            _currDate 服务器当前时间
		 * @param {Object}
		 *            _diff 倒计时终结点
		 * @param {Function}
		 *            _doFunc 正在倒计时的监听事件
		 * @param {Function}
		 *            _callBack 倒计时完成回调事件
		 * @return {[type]} [description]
		 */
		initDownTime : function(_currDate, _diff, _doFunc) {
			$('#countdown_dashboard').stopCountDown();
			$('#countdown_dashboard').countDown({
				nowTime : _currDate,
				doFunc : _doFunc,
				targetDate : {
					'day' : _diff.day,
					'month' : _diff.month,
					'year' : _diff.year,
					'hour' : _diff.hour,
					'min' : _diff.min,
					'sec' : _diff.sec
				}
			});
		},
		/**
		 * 右侧按钮控制
		 */
		rightBtn : function() {
			$('#game-panel').delegate(
					'dd .gongn li',
					'click',
					function() {
						var _jq_rbtn_parent = $(this).parent().parent().find(
								".sz-qiu");
						var _jq_digital = _jq_rbtn_parent.find('li');
						_jq_digital.removeClass('cur');
						var _flag = $(this).attr('data-flag') || '';
						switch (_flag) {
						case 'qing': // 清
							break;
						case 'shuang': // 双
							_jq_digital.each(function(index, domEle) {
								var _val = +$(domEle).html();
								if (_val % 2 == 0) {
									$(domEle).addClass('cur');
								}
							});
							break;
						case 'dan': // 单
							_jq_digital.each(function(index, domEle) {
								var _val = +$(domEle).html();
								if (_val % 2 == 1) {
									$(domEle).addClass('cur');
								}
							});
							break;
						case 'xiao': // 小
							var _digitalLen = _jq_digital.length;
							var _middle = Math.round(_digitalLen / 2) +(_digitalLen%2==0?parseInt($(_jq_digital[0]).html()):0);
							_jq_digital.each(function(index, domEle) {
								var _val = +$(domEle).html();
								if (_middle > _val) {
									$(domEle).addClass('cur');
								}
							});
							break;
						case 'da': // 大
							var _digitalLen = _jq_digital.length;
							var _middle = Math.round(_digitalLen / 2) + (_digitalLen%2==0?parseInt($(_jq_digital[0]).html()):0);
							_jq_digital.each(function(index, domEle) {
								var _val = +$(domEle).html();
								if (_middle <= _val) {
									$(domEle).addClass('cur');
								}
							});
							break;
						case 'quan': // 全
							_jq_digital.addClass('cur');
							break;
						}
						Play.getNumAndDetail();
					});
		},
		/**
		 * 拼装投注数字
		 */
		assemble : function() {
			var _totalArr = [];
			$('.sz-qiu').each(function(index, domEle) {
				var _trArr = [];
				$(domEle).find('.cur').each(function(posIdx, posEle) {
					_trArr.push($(posEle).html());
				});
				_totalArr.push(_trArr);
			});
			return _totalArr;
		},
		/**
		 * 获取投注总数和投注详情
		 */
		getNumAndDetail : function(evt, isDel) {
			var _conf = playsConf(curr_play_obj);
			if (evt) {
				_conf['param'][_conf['param'].length] = evt;
			}
			Play.slider();
			// 如果用户正在按删除键，就启用另一套算法
			var _num = 0;
			if (isDel) {
				_num = SSC.DAN_DEL.apply(null, _conf['param']);
			} else {
				_num = _conf['algo'].apply(null, _conf['param']);
			}
			if (isNaN(_num)) {
				if (/.*[\u4e00-\u9fa5]+.*$/.test(_num)) {
					$('#touzhuInfo').html(
							'<h2><em id="zhu">' + _num + '</em></h2>');
				} else {
					$('#touzhuInfo')
							.html(
									'<h2>共<em id="zhu">0</em>注，金额<em id="money">0.000</em>元</h2>');
				}
				return null;
			}
			$('#touzhuInfo')
					.html(
							'<h2>共<em id="zhu">0</em>注，金额<em id="money">0.000</em>元</h2>');
			var _detail = _conf['detail'];
			var _model = $(".ym-fbox-select").val();// +$('input[name="model"]:checked').val();
			var _times = way.get("Lottery.times");// +$('.pro-qty-int').val();
			var _money = (_num * _model * _times).toFixed(3);
			// $('#zhu').html(_num);
			// $('#money').html(_money);
			$("#itemcount").html(_num);
			$("#total").html(_money);
		},
		/**
		 * 获取方案
		 */
		getPlan : function(_n) {
			var _posLen = $('input[name="position"]:checked').length;
			$('#positioncount').html(_posLen);
			if (_posLen == 0) {
				$('#positioninfo').html(0);
			} else {
				$('#positioninfo').html(Math.Com(_posLen, _n));
			}
		},

		/**
		 * 数字复位
		 */
		reset : function() {
			$('#game-input').val('');
			Play.slider(); // 同步滑块数值
			$('#game-panel dd .sz-qiu li').removeClass('cur');
			$("#itemcount").html(0);
			$("#total").html("0.00");
		},
		/**
		 * 数字复位
		 */
		clear : function() {
			Play.reset();
			$('#cart-list').html("");
			$('#orderlistSumCount').html('0');
			$('#orderlistItemcount').html('0');
			$('#orderlistTotal').html('0.00');
			$('#Lottery.prize').html('0.00');
		},
		/**
		 * 解析投注数字,解析成购物车认识的格式
		 */
		parsing : function() {
			var _zhuStr = '';
			var _conf = playsConf(curr_play_obj);
			var _type = _conf['type'];
			if ('digital' == _type) { // 数字选择型的解析方式
				var xhlistLen = $('#game-panel dd .sz-qiu').length;
				$('#game-panel dd .sz-qiu')
						.each(
								function(index, domEle) {
									if (curr_play_obj['ruleFun'] === '2xz_rx2zxfs') { // 任二
										// 组选复式
										var pos_num_arr = [];
										$(domEle).find('.cur').each(
												function(sub_i, sub_d) {
													pos_num_arr.push($(sub_d)
															.html());
												});
										_zhuStr = pos_num_arr.join('');
									} else {
										var activeLen = $(domEle).find('.cur').length;
										$(domEle)
												.find('.cur')
												.each(
														function(sub_i, sub_d) {
															if (sub_i < ($(
																	domEle)
																	.find(
																			'.cur').length - 1)) {
																_zhuStr += $(
																		sub_d)
																		.html()
																		+ ' ';
															} else {
																_zhuStr += $(
																		sub_d)
																		.html();
															}
														});
										if (index < (xhlistLen - 1)
												&& activeLen > 0) {
											_zhuStr += ',';
										}
										// 如果当前位没有数字，就用*代替
										if (index < (xhlistLen - 1)
												&& activeLen === 0) {
											_zhuStr += '*,';
										} else if (index >= (xhlistLen - 1)
												&& activeLen === 0) {
											_zhuStr += '*';
										}
									}
								});
				_zhuStr = _zhuStr.replace(/,$/, '');
			} else if ('input' == _type) { // 手动输入型的解析方式
				var _pri_zhuStr = '';
				if (_conf.fRegular) {
					_pri_zhuStr = $('#game-input').val().replace(
							_conf.fRegular, '|');
				} else {
					_pri_zhuStr = $('#game-input').val().replace(/\s{1}/g, '|');
				}
				_pri_zhuStr = _pri_zhuStr.replace(/\|$/, '');
				_zhuStr = _pri_zhuStr;
			}
			return _zhuStr;
		},
		/**
		 * 购物车接收函数
		 */
		cart : function(_cart_obj) {
			if (!_cart_obj.playName) {
				popTips('亲，名称不能为空哦！', "error");
				return;
			}
			if (!_cart_obj.zhu) {
				return popTips('亲，投注数不能为0哈！', "error");
			}
			if (_cart_obj.total == "0" || _cart_obj.money == "0.00"
					|| !/^\d+$/.test(_cart_obj.total)) {
				return popTips('亲，请先下注哦！', "error");
			}
			if ((+curr_play_obj['maxCount']) < (+_cart_obj.total)) {
				return popTips('不能超过最大投注数：' + curr_play_obj['maxCount'] + '注！',
						"error");
			}
			if (!_cart_obj.times) {
				return popTips('亲，没有倍数！', "error");
			}
			if (!_cart_obj.model) {
				return popTips('亲，没有选择模式！', "error");
			}
			if (!_cart_obj.bonus) {
				return popTips('亲，没有中奖金额！', "error");
			}
			// 将原始数据备份起来
			_cart_obj['zhu_original'] = _cart_obj.zhu;
			// 注数长度超过11位就自动用...隐藏
			_cart_obj.zhu = _cart_obj.zhu.replace(/^(.{11})(.*)$/, function() {
				var _param = [].slice.apply(arguments);
				if (_param[2].length > 0) {
					return _param[1] + '...';
				}
				return _param[1];
			});
			_cart_obj['lotteryNo'] = way.get("showExpect.currExpect");
			_cart_obj['lotteryName'] = way.get("lottery_cn_name");
			_cart_obj['lotteryId'] = $("#lottery-id").val();
			_cart_obj['playgroupid'] = $('#play-group-menus').find("li.cur")
					.attr("data-value");
			_cart_obj['playid'] = $('#play-menus').find("li.cur").attr(
					"data-value");
			_cart_obj['lotteryType'] = $('#lottery_type').val();
			// 将“暂时没数据”的提示干掉
			// $('#cart-list').html("");
			if (!_cart_obj['fastBet']) {
				var _htmlStr = _.template($('#cart-template').html(), _cart_obj);
				$('#cart-list').prepend(_htmlStr);
				// $('#cart-list tr').fadeIn();
				this.cartMonitor();
				return;
			}
			return _cart_obj;
		},
		/**
		 * 购物车监控 如增减号码 会影响购物车总注数、总金额以及行样式的变动
		 */
		cartMonitor : function() {
			var _zhu_total = 0;
			$('#cart-list [data-flag="total"]').each(function(index, zhuEle) {
				_zhu_total += +($(zhuEle).attr("data-value"));
			});
			var _money_total = 0;
			$('#cart-list [data-flag="money"]').each(function(index, moneyEle) {
				_money_total += +($(moneyEle).attr("data-value"));
			});
			$("#orderlistItemcount").html(_zhu_total);
			$("#orderlistTotal").html(_money_total.toFixed(3));
			$("#orderlistSumCount").html(
					$('#cart-list [data-flag="total"]').length);
			// $('#cart-total-money').html(_money_total.toFixed(3));
		},
		/**
		 * 购物车数据
		 */
		cartData : function() {
			var _data = [];
			$('#cart-list dd')
					.each(
							function(index, ele) {
								// var ids =
								// $(ele).find('[data-flag="id"]').val().split('-');
								_data
										.push({
											betsIdentification : $(ele).attr(
													'data-value'), // 投注的唯一标识
											betsSrcIdent : $(ele).attr(
													'sub_orderNo')
													|| '', // 主单号的唯一标识
											betsData : $(ele).find('#zhu')
													.val(),
											playName : $(ele).find('#playName')
													.val(),
											betsNum : $(ele).find(
													'[data-flag="total"]')
													.attr("data-value"),
											betsAmount : parseFloat($(ele)
													.find('[data-flag="money"]')
													.attr("data-value")),
											betsBeishu : $(ele).find(
													'[data-flag="times"]')
													.attr("data-value"),
											betsMode : parseFloat($(ele).find(
													'#model_c').val()),
											betsBonusprop : parseFloat($(ele)
													.find('#bonus_c').val()),
											betsFandian : parseFloat($(ele)
													.find('#fandian').val()),
											lotteryPlaygroupid : $(ele).find(
													"#playgroupid").val(),
											lotteryPlayid : $(ele).find(
													"#playid").val(),
											lotteryId : $(ele).find(
													'#lotteryId').val(),
											lotteryNo : $(ele).find(
													'[data-flag="lotteryNo"]')
													.attr("data-value"),
											lotteryType : $('#lottery_type')
													.val(),
											betsZhuihao : parseInt($(ele).attr(
													'bets_zhuiHao') || 0),
											betsZhuihaomode : parseInt($(ele)
													.attr('bets_zhuiHaoMode') || 0),
											betsWeishu : $(ele).attr(
													'data-fangAn')
										});
							});
			return _data;
		},
		/**
		 * 滑块方法
		 */
		slider : function() {
			window.setTimeout(function() {
				var _currVal = +$("#slider-range").slider('value').toFixed(2);
				way.set("Lottery.bonus", Play.bonusCalc(
						+curr_play_obj['bonusProp'], _currVal,
						+curr_play_obj['bonusPropBase']));
				way.set("Lottery.fandian", _currVal.toFixed(2));
			}, 0);
		},

		/**
		 * show
		 */
		prize : {
			/**
			 * 为开奖和停止售奖添加音效功能
			 * 
			 * @param src
			 *            //音效地址
			 * @param domId
			 *            //音效元素id
			 */
			playVoice : function(src, domId) {
				var $dom = $('#' + domId);
				if ("0" === $.session.get('BL_02_MUSIC_VOICE')) {
					$dom.remove();
				} else {
					if (false && navigator.userAgent.indexOf('MSIE') >= 0
							&& !(/Trident\/7\./).test(navigator.userAgent)) {
						if ($dom.length) {
							$dom[0].src = src;
						} else {
							$('<bgsound>', {
								src : src,
								id : domId
							}).appendTo('body');
						}
					} else {
						if ($dom.length) {
							$dom[0].play();
						} else {
							$('<audio>', {
								src : src,
								id : domId
							}).appendTo('body')[0].play();
						}
					}
				}
			},
			// 判断当前时间是否在开奖间隔时间之内
			isTimeDistance : function(isInit) {
				var _this = this;
				var deferred = $.Deferred();
				$
						.ajax({
							url : CGI.LOTTERY_DISTANCE(),
							method : 'GET',
							data : "lotteryId=" + $('#lottery-id').val(),
							success : function(data) {
								var _diff = 0;
								var _continueBetVal = $(
										"#singleContinueBetting").val();// 封单是否可以继续投注
								// 如果是在间隔时间内
								if (0 == data.retcode && data.data.length > 0) {
									var _data = data.data[0];
									_this.loadOpening();
									// $('.game-result').css({'background-color'
									// : '#F8F8E4'});
									_diff = (+_data.datediff);
									_diff = _diff < 10 ? ('0' + _diff) : _diff;
									$('#diff').html('剩余' + _diff + "秒");
								}
								if (_continueBetVal == "Y")// 封单期间可以投注的彩种
								{
									_this
											.engine(function(_obj) {
												var wait_timer_func = function() {
													if (_diff <= 0)// 倒计时走完 //
																	// 拉取开奖数据
													{
														$('#diff').html(
																'正在开奖中，请稍候！！');
														clearInterval($(
																'#lottery-data')
																.data(
																		'wait_timer'));
														clearTimeout($(
																'.kj-hao:eq(0)')
																.data(
																		'kaijiang_timer'));
														closelayer();
														_this
																.queryLotteryOpenDataInfo(
																		_obj,
																		(isInit ? 40
																				: 60),
																		false); // modify
																				// //
																				// 60
														return false;
													} else {
														_diff--;
														_diff = _diff < 10 ? ('0' + _diff)
																: _diff;
														$('#diff').html(
																'剩余' + _diff
																		+ "秒");
														return true;
													}
												};
												// 是否往后执行定时器
												var isNextTimer = wait_timer_func();
												if (isNextTimer) {
													$('#lottery-data')
															.data(
																	'wait_timer',
																	setInterval(
																			wait_timer_func,
																			1000));
												}
											});
								} else {
									var wait_timer_func = function(_callback) {
										if (_diff <= 0)// 倒计时走完 拉取开奖数据
										{
											_this.loadOpening();
											clearInterval($('#lottery-data')
													.data('wait_timer'));
											clearTimeout($('.kj-hao:eq(0)')
													.data('kaijiang_timer'));
											_this.engine(function(_obj) {
												_this.queryLotteryOpenDataInfo(
														_obj,
														(isInit ? 40 : 60),
														false);
											}); // modify 60
											return false;
										} else {
											_diff--;
											_diff = _diff < 10 ? ('0' + _diff)
													: _diff;
											$('#diff').html('剩余' + _diff + "秒");
											return true;
										}
									};
									// 是否往后执行定时器
									var isNextTimer = wait_timer_func();
									if (isNextTimer) {
										$('#lottery-data').data(
												'wait_timer',
												setInterval(wait_timer_func,
														1000));
									}
								}
							}
						});
				return deferred.promise(); // 返回promise对象
			},
			/**
			 * 开奖失败布局
			 * 
			 * @return {[type]} [description]
			 */
			lottertyOpenDataFailureStyle : function() {
				// $('#opening').addClass('hide');
				// $('#open-result').removeClass('hide');
				// $('.game-result').css({'background-color' : ''});
				var _lotteryType = $('#lottery-type').val();
				if ('PK10' === _lotteryType) {
					$('.kj-hao').html($('#pk10-kaijiang-template').html());
				} else {
					$('.kj-hao').html($('#kaijiang-template').html());
				}
			},
			loadOpening : function() {
				// $('#opening').removeClass('hide');
				// $('#open-result').addClass('hide');
				$('#diff').html("开奖中，请稍候！");
				var _lotteryType = $('#lottery_type').val();
				if ('PK10' === _lotteryType) {
					$('#opening').html($('#pk10-kaijiang-template').html());
				} else {
					$('#opening').html($('#kaijiang-template').html());
				}
			},
			/**
			 * 获取开奖数据
			 * 
			 * @param {[type]}
			 *            _obj 彩种等数据
			 * @param {[type]}
			 *            loopScope load开奖数据的循环次数，超过这个次数不管有没有Load都视为开奖失败
			 * @param {[type]}
			 *            isInit 是否是初始化时去load的开奖数据
			 * 
			 * @return {[type]} [description]
			 */
			queryLotteryOpenDataInfo : function(_obj, loopScope, isInit) {
				var _this = this;
				var count = 0;
				var kaiJianFunc = function() {
					var _url = $
							.substitute(
									'/opendata/{lotteryId}/{lotteryId}_{lotteryNum}.html?r={currTime}',
									{
										lotteryId : _obj.lottery_id,
										lotteryNum : _this.getPrevLottery(_obj), // 获取上一期期数
										currTime : new Date().getTime()
									});
					$('.kj-hao')
							.load(
									_url,
									function(response, status, xhr) {
										if (!isNaN(xhr.status)) {
											var _status = +xhr.status;
											// 得到上一期的期数
											way.set("showExpect.lastExpect",
													_this.getPrevLottery(_obj));
											// ****** 北京PK10开奖布局 兼容IE8 start*** 
											// ****** 北京PK10开奖布局 兼容IE8 end***
											if (404 === _status) { // 没有取到开奖数据
												count++;
												clearTimeout($('.kj-hao:eq(0)')
														.data('kaijiang_timer'));
												if (count >= loopScope) {
													_this
															.lottertyOpenDataFailureStyle();
												} else {
													// $('#opening').removeClass(
													// 'hide');
													// $('#open-result').addClass(
													// 'hide');
													// $('.game-result').css({'background-color'
													// : '#F8F8E4'});
													// 没有取到开奖数据，就等5秒再去拉取
													$('.kj-hao:eq(0)')
															.data(
																	'kaijiang_timer',
																	setTimeout(
																			kaiJianFunc,
																			5000));
												}
												if ($("#opening").length <= 0) {
													$('.kj-hao').html("<div id ='opening'></div>");
													_this.loadOpening();
												}
												var _lotteryType = $('#lottery_type').val();
												var isPK10 = ('PK10' == _lotteryType);
												$('#opening li').each( function() {
																	if (isPK10) {
																		$(this)
																				.html(
																						parseInt(Math
																								.random() * 10));
																	} else {
																		$(this)
																				.find(
																						"span:eq(0)")
																				.html(
																						parseInt(Math
																								.random() * 9));
																	}
																});
											} else if (200 === _status) { // 取到了开奖数据
												// $('#opening').addClass('hide');
												// $('#open-result').removeClass(
												// 'hide');
												$('#diff').html("");
												Play.lotteryHistory(); 
												if ($("#session_balance").length > 0) {
													info();
													_this.queryBetProfit( $( "#lottery-id") .val(),_this.getPrevLottery(_obj));
												}  
												if (isInit && count === 0)
													return;
												_this.playVoice(
														'/media/kai-jiang.mp3',
														'music-kaijiang'); // 开奖音效
											}
										}
									});
				}
				kaiJianFunc();
			},
			// 获取上期开奖期数
			getPrevLottery : function(_obj) {
				var _prev = '';
				if ($("#lottery-id").val() == 12) { // pk10
					_prev = +_obj.lottery_no - 1;
				} else {
					var lotteryNum = +$('#lottery-num').val(); // 总期数
					var currLottery = _obj.lottery_no.split('-')[1]; // 当前期数
					var prevNum = (+currLottery - 1) + "";
					var lotteryDate = _obj.lottery_date; // 当前期 日期
					if (prevNum <= 0)// 当前第一期
					{
						lotteryDate = lotteryDate.replace(/-/g, '');
						prevNum = lotteryNum;
						// 时间减去一天
						var date = new Date(lotteryDate.substring(0, 4),
								lotteryDate.substring(4, 6) - 1, lotteryDate
										.substring(6, 8));
						date.setDate(date.getDate() - 1);
						lotteryDate = date.getFullYear()
								+ (date.getMonth() < 9 ? "0"
										+ (date.getMonth() + 1) : date
										.getMonth() + 1)
								+ (date.getDate() < 10 ? ("0" + date.getDate())
										: date.getDate());
					}
					var fillZeroNum = (currLottery.length - prevNum.length);
					var _zero = '';
					for (var i = 0; i < fillZeroNum; i++) {
						_zero += '0';
					}
					prevNum = _zero + prevNum;

					lotteryDate = lotteryDate.replace(/-/g, '');
					_prev = lotteryDate + '-' + prevNum;
				}
				return _prev;
			},
			queryBetProfit : function(lotteryId, _lotteryNo) {
				// 获取上一期期数
				var _param = $.substitute( 'lotteryId={lotteryId}&lotteryNo={lotteryNo}', { lotteryId : lotteryId, lotteryNo : _lotteryNo });
				if(!$.session.get(_param)){
					$.session.set(_param,_param);
					$.ajax({
						url : "/lottery/queryBetProfit",
						dataType : 'json',
						data : _param,
						contentType : 'application/json',
						success : function(data) {
							if (0 == data.retcode) {
								var _obj = data.data;
								if (_obj && _obj.length > 0) {
									var profit = _obj[0]["profit"];
									if (profit > 0)// 中奖
									{
										popTips('恭喜您，中奖啦！盈亏【' + profit.toFixed(2) + '】', "succeed");
									} else if (profit < 0)// 未中奖
									{
										popTips('很遗憾，加油！亏损【' + profit.toFixed(2) + '】', "succeed");
									}
								}
							}
						}
					});
				} 
			},
			// 倒计时 无限次循环
			__downTime : function(_obj) {
				var _this = this;
				var _lotteryDate = _obj.lottery_time.split(' ')[0];
				var _lotteryTime = _obj.lottery_time.split(' ')[1];
				var _date = _lotteryDate.split('-');
				var _time = _lotteryTime.split(':');
				var _currTime = new Date(_obj.curr_time);
				Play.initDownTime(_currTime, {
					year : _date[0],
					month : _date[1],
					day : _date[2],
					hour : _time[0],
					min : _time[1],
					sec : _time[2]
				},
						function(diffSecs) {
							if (5 == diffSecs) {
								_this.playVoice('/media/stop-time.mp3',
										'music-stoptime'); // 停止售奖音效
							} else if (0 >= diffSecs) {
								$('#countdown_dashboard').stopCountDown();
								// 停止 定时load开奖监控
								clearTimeout($('.kj-hao:eq(0)').data(
										'kaijiang_timer'));
								$('.digit').html('0');
								var reWork = function() {
									popTips('<h4 class="pop-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
											+ way.get("showExpect.currExpect") + '期已截止，<br> 请您购买下一期，投注时请注意期号！</h4>',
											"waring");
									_this.isTimeDistance(false); // 检查是否在间隔时间内
								};
								window.setTimeout(reWork, 1000);
							}
						});
			},
			// 开奖引擎
			engine : function(_callBack) {
				var _this = this;
				$.ajax({
					url : CGI.LOTTERY_TIME(),
					method : 'GET',
					data : "lotteryId=" + $('#lottery-id').val(),
					success : function(data) {
						if (0 == data.retcode) {
							var _obj = data.data;
							$('#no').html(
									_obj.lottery_no.substring(_obj.lottery_no
											.indexOf("-") + 1));
							way.set("showExpect.currExpect", _obj.lottery_no);
							$('#stop-time').html(_obj.lottery_time);
							_this.__downTime(_obj);
							_callBack && _callBack(_obj);
						} else {
							popTips(data.retmsg, "error");
						}
					}
				});
			}, // 封单可以继续投注的开奖引擎
			init : function() {
				var _this = this;
				_this.isTimeDistance(true); // 检查是否在间隔时间内
			}
		},
		/**
		 * 最近十期投彩记录
		 */
		lotteryHistory : function() {
			$.ajax({
				url : "/lottery/queryHistoryLotteryData?r= "
						+ new Date().getTime(),
				dataType : 'json',
				data : "lotteryId=" + $('#lottery-id').val(),
				contentType : 'application/json',
				success : function(data) {
					if (data.retcode == 0) {
						$('.ef-kj-lishi .ym-hr').html(
								_.template($('#kj-lishi-template').html(), {
									items : data.data
								}));
					} else {
						popTips(data.message, "error");
					}
				}
			});
		},
		touzhu : function() {
			var _data_arr = Play.cartData();
			if (_data_arr.length == 0) {
				return popTips("无投注数据不能提交！", "error");
			}
			var lotteryNo = way.get("showExpect.currExpect");
			$.ajax({
				url : CGI.LOTTERY_BET_CHECK(),
				method : 'GET',
				data : {
					"id" : $('#lottery-id').val(),
					"lotteryNo" : lotteryNo
				},
				success : function(disData) {
					if (disData && disData.retcode != 0) {
						return popTips(lotteryNo + "已过销售期，请您购买下一期。", "error");
					}
					$("#qrtouzhu").html(
							_.template($('#qrtouzhu-template').html(), {
								lotteryNo : lotteryNo,
								itemcount : $("#orderlistItemcount").html(),
								ordercount : $("#orderlistSumCount").html(),
								total : $("#orderlistTotal").html()
							}));
					$("#qrtouzhu").undelegate( "[data-flag='btnOk']", "click");
					pop("qrtouzhu");
					$("#qrtouzhu").delegate( "[data-flag='btnOk']", "click",
							function() {
								closelayer();
								var _data = Play.handlerBetsData(_data_arr);// JSON.stringify(_data_arr);
								// $.jCryption.encrypt($.base64.encode(data),
								// keys, function(encryptedData) {
								if(!$.session.get(_data))
								{
									$.session.set(_data,1);
									$.ajax({
										url : CGI.SUBMIT_CODES(),
										type : 'POST',
										dataType : 'json',
										data : {
											betsData : $.base64.encode(_data)
										},
										success : function(data) {
											$.session.remove(_data);
											var retcode = data.retcode;
											if (retcode != "0") {
												return popTips(data.retmsg || data.retcode, 'error');
											}
											Play.clear();
											info(); 
											return popTips('投注成功！', 'succeed');
										}
									});
								} 
								console.log("重复提交！！");
							});
				}
			})
		},
		appendBet : function() {
			if ($('#cart-list dd').length == 0) {
				return popTips('请先添加投注内容！', "error");
			}
			if ($('#cart-list dd').length > 1) {
				return popTips('只能针对一个方案发起追号！', "error");
			}
			$
					.ajax({
						url : CGI.LOTTERY_APPENDBET(),
						dataType : 'json',
						data : "lotteryId=" + $('#lottery-id').val()
								+ "&lotteryNo="
								+ way.get("showExpect.currExpect"),
						contentType : 'application/json',
						success : function(data) {
							var model = $("#cart-list dd li[data-flag='model']")
									.attr("data-value");
							var model_c = $("#cart-list #model_c").val();
							var total = $("#cart-list dd li[data-flag='total']")
									.attr("data-value");
							$("#extraNums").html(
									_.template($('#appendbet-template').html(),
											{
												items : data.data,
												model : model,
												model_c : model_c,
												total : total
											}));
							pop("extraNums");
							$('#appendbet_lottery_no').click(function() {
								var bol = this.checked;
								$('[name="sppendbet"]').each(function(i, ele) {
									ele.checked = bol;
								});
							});
							$('#zhuihaoBtn')
									.click(
											function(e) {
												var bets_zhuiHaoMode = $(
														'#stop-append').is(
														":checked") ? 1 : 0;
												var _firstTr = $(
														'#cart-list dd')
														.first();
												var _orderNo = _firstTr
														.attr('data-value');
												$('#appendbetbody tr')
														.each(
																function() {
																	var _this = $(this);
																	if ($(
																			'input[name="sppendbet"]',
																			_this)
																			.is(
																					":checked")) {
																		var newBet = _firstTr
																				.clone();
																		var lotteryNo = $(
																				'[data-flag="sppend-lotteryNo"]',
																				_this)
																				.html();
																		var times = $(
																				'[data-flag="times"]',
																				_this)
																				.val();
																		var money = parseFloat($(
																				'[data-flag="money"]',
																				newBet)
																				.attr(
																						"data-value"))
																				/ parseInt($(
																						'[data-flag="times"]',
																						newBet)
																						.attr(
																								"data-value"))
																				* parseInt(times);

																		var lntr = $(
																				'[data-flag="lotteryNo"]',
																				newBet)
																				.html(
																						lotteryNo)
																				.attr(
																						"data-value",
																						lotteryNo);
																		$(
																				newBet)
																				.attr(
																						'bets_zhuiHao',
																						'1');
																		$(
																				newBet)
																				.attr(
																						'bets_zhuiHaoMode',
																						bets_zhuiHaoMode);
																		$(
																				newBet)
																				.attr(
																						'bets_srcOrder',
																						$(
																								'[data-flag="lotteryNo"]',
																								$(
																										'#cart-list tr')
																										.first())
																								.val());

																		$(
																				'[data-flag="times"]',
																				newBet)
																				.html(
																						times
																								+ "倍")
																				.attr(
																						"data-value",
																						times);
																		$(
																				'[data-flag="money"]',
																				newBet)
																				.html(
																						"￥"
																								+ money
																										.toFixed(2)
																								+ "元")
																				.attr(
																						"data-value",
																						money);

																		newBet
																				.attr(
																						'sub_orderNo',
																						_orderNo);
																		newBet
																				.attr(
																						'data-value',
																						createCustomOrderNo());
																		$(
																				'#cart-list')
																				.append(
																						newBet);
																	}
																});
												Play.cartMonitor(); // 购物车监控
												closelayer();
											});
							// 给复选框、全选、反选按钮绑定点击事件
							$('#appendbet_lottery_no,[name="sppendbet"]')
									.click(function() {
										Play.calcAppendNoAndMoney();
									});
							// 给倍数输入框绑定键盘按下事件
							$('#appendbetbody \
			    		[data-flag="times"]')
									.keydown(
											function() {
												var _this = $(this);
												window
														.setTimeout(
																function() {
																	var _val = _this
																			.val();
																	if (!/^\d+$/
																			.test(_val)) {
																		_this
																				.val(_val
																						.replace(
																								/\D/g,
																								''));
																		popTips(
																				"只能输入数字！",
																				"error");
																		return;
																	}
																	Play
																			.calcAppendNoAndMoney();
																}, 0);
											});
						}
					});
			return false;

		},
		/**
		 * 获得追号期数和追号总金额
		 */
		calcAppendNoAndMoney : function() {
			var count = 0;
			var sppendbet_arr = [];
			var money = 0;
			$('[name="sppendbet"]').each(
					function(i, ele) {
						var _parent = $(ele).parent().parent();
						if (ele.checked) {
							count++;
							_parent.fadeTo(50, 1);
							sppendbet_arr.push({
								id : ele.value,
								lotteryNo : _parent.find(
										'[data-flag="sppend-lotteryNo"]')
										.html(),
								times : _parent.find('[data-flag="times"]')
										.val(),
								money : _parent.attr("data-value")
										* _parent.attr("data-model")
							});
						} else {
							_parent.fadeTo(50, .5);
						}
					});
			for (var i = 0; i < sppendbet_arr.length; i++) {
				money += (+sppendbet_arr[i]['times'])
						* (+sppendbet_arr[i]['money']);
			}
			$('#append_total').html(count);
			$('#append_total_money').html(money.toFixed(2));
		},
		fastBet : function() {
			var cart_obj = Play.addBet(true);
			var _data = [];
			_data.push({
				betsIdentification : cart_obj.orderNo, // 投注的唯一标识
				betsSrcIdent : '', // 主单号的唯一标识
				betsData : cart_obj.zhu_original,
				playName : cart_obj.playName,
				betsNum : cart_obj.total,
				betsAmount : parseFloat(cart_obj.money),
				betsBeishu : cart_obj.times,
				betsMode : parseFloat(cart_obj.model_c),
				betsBonusprop : parseFloat(cart_obj.bonus_c),
				betsFandian : parseFloat(cart_obj.fandian),
				lotteryPlaygroupid : cart_obj.playgroupid,
				lotteryPlayid : cart_obj.playid,
				lotteryId : cart_obj.lotteryId,
				lotteryNo : cart_obj.lotteryNo,
				lotteryType : cart_obj.lotteryType,
				betsZhuihao : 0,
				betsZhuihaomode : 0,
				betsWeishu : cart_obj.fangAn
			});
			var lotteryNo = way.get("showExpect.currExpect");
			$.ajax({
				url : CGI.LOTTERY_BET_CHECK(),
				method : 'GET',
				data : {
					"id" : $('#lottery-id').val(),
					"lotteryNo" : lotteryNo
				},
				success : function(disData) {
					if (disData && disData.retcode != 0) {
						return popTips(lotteryNo + "已过销售期，请您购买下一期。", "error");
					}
					$("#qrtouzhu").html(
							_.template($('#qrtouzhu-template').html(), {
								lotteryNo : cart_obj.lotteryNo,
								itemcount : cart_obj.total,
								ordercount : 1,
								total : parseFloat(cart_obj.money).toFixed(2)
							}));
					$("#qrtouzhu").undelegate( "[data-flag='btnOk']", "click");
					pop("qrtouzhu");
					$("#qrtouzhu").delegate( "[data-flag='btnOk']", "click",
							function() {
								closelayer();
								var _betData = Play.handlerBetsData(_data);// JSON.stringify(_data_arr);
								// $.jCryption.encrypt($.base64.encode(data),
								// keys, function(encryptedData) {
								if (!$.session.get(_betData)) {
									$.session.set(_betData, 1);
									$.ajax({
										url : CGI.SUBMIT_CODES(),
										type : 'POST',
										dataType : 'json',
										data : {
											betsData : $.base64.encode(_betData)
										},
										success : function(data) {
											$.session.remove(_betData);
											var retcode = data.retcode;
											if (retcode != "0") {
												return popTips(data.retmsg
														|| data.retcode,
														'error');
											}
											Play.clear();
											info();
											return popTips('投注成功！', 'succeed');
										}
									});
								}
							});
				}
			})
		},
		addBet : function(fastBet) {
			var isFanAn = ('none' !== $('span[data-flag="position_area"]').css(
					'display')) ? true : false;
			var _check_arr = [];
			if (isFanAn) {
				var pos_conf = {
					'0' : '万',
					'1' : '千',
					'2' : '百',
					'3' : '十',
					'4' : '个'
				};
				$('input[name="position"]:checked').each(function(index, ele) {
					_check_arr.push(pos_conf[ele.getAttribute('value')]);
				});
			}
			// 向购物车推送投注数据
			var cart_obj = Play.cart({
				fastBet : (fastBet || false),
				orderNo : createCustomOrderNo(), // 创建自定义单号
				groupid : curr_play_obj['lottery_groupId'], // 玩法组id
				playid : curr_play_obj['id'], // 玩法id
				playName : curr_play_obj['name'], // 玩法名称
				zhu : Play.parsing(), // 投注明细
				total : $("#itemcount").html(), // 投注总数
				money : $("#total").html(), // 投注金额
				times : way.get("Lottery.times"), // 倍数
				model : $.modelToCHN(parseFloat($(".ym-fbox-select").val())),// 模式
				model_c : $(".ym-fbox-select").val(), // 模式(用来存储数据的)
				bonus : way.get("Lottery.bonus") + '-'
						+ way.get("Lottery.fandian"), // 奖金-返点
				bonus_c : way.get('Lottery.bonus'), // 奖金(用来存储数据的)
				fandian : way.get('Lottery.fandian'), // 返点(用来存储数据的)
				fangAn : _check_arr.join(",")
			// 方案
			});
			way.set("Lottery.times", 1);
			// $('.pro-qty-int').val('1');
			Play.reset();
			return cart_obj;
		},
		// 查询历史开奖数据
		handlerBetsData : function(cartData)// 转化追号数据
		{
			$(cartData).each(
					function(index, obj) {
						if ($(obj).attr("betsZhuihao") == 1) {
							$(obj).attr("betsData", "");
						}
						$(obj).attr(
								"checkSum",
								$.md5($.trim(_.template($(
										'#bets-signature-template').html(), {
									data : obj
								}))));
					});
			return JSON.stringify(cartData);
		},
		lotteryPageInit : function(playGroupList) {
			$.base64.utf8encode = true;
			/*getPlaysByGroupId(
					$('#play-group-menus li').first().attr('data-value')).then(
							Play.getPlayByInfo).then(function() {
			}).then(Play.slider).then(bindEvent);
			 *///Play.initLotteryBetCryption();
			//bindEvent(); 
			Play.prize.init();
			Play.lotteryHistory();
			$('.l-c-one').html(
					_.template($('#playGrouplist-template').html(), {
						playGroupList : playGroupList
					})).find("li").first().click();
			clearInterval($('#lottery-data').data('wait_timer'));
			clearTimeout($('.kj-hao:eq(0)').data('kaijiang_timer'));
			//jQuery("#percentPattern").css("display",(jQuery("#play-group-menus li").eq(0).attr('percent_pattern')=="Y"?"inline":"none"));
		},
		getPlaysByGroupId : function(_groupId) {
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
						$.exception(data.retcode, data.retmsg);
					}
				}
			});
			return deferred.promise(); // 返回promise对象
		},
		//厘模式处理
		handlerPercentPattern : function(_percentPattern) {
			$(".ym-fbox-select option[value='0.002']").remove();
			// 支持厘模式
			if (_percentPattern) {
				$(".ym-fbox-select").append("<option value='0.002'>厘</option>")
			}
		},
		getPlayByInfo : function() {
			var deferred = $.Deferred(), _play_id = $('#play-menus .cur').attr(
					'data-value')
					|| '', i = 0, playArrLen = play_arr.length;
			var percentPattern = true;
			var eventListener = function(signal, _callback) {
				var ss_timer = window.setInterval(function() {
					if (signal == 'yes') {
						window.clearInterval(ss_timer), ss_timer = null;
						signal = '';
						_callback && _callback();
					}
				}, 10);
			};
			for (; i < playArrLen; i++) {
				if (_play_id == play_arr[i]['id']) {
					curr_play_obj = play_arr[i]; // 将当前玩法存储
					Play.handlerPercentPattern(curr_play_obj["percentPattern"] == "Y");
					//console.log(percentPattern);
					var _conf = playsConf(play_arr[i]);
					var _tplName = _conf['template'];
					var _codeList = _conf['code_list'];
					var _html_obj = $.extend({
						items : _codeList
					}, _conf);
					var _html = _.template($('#' + _tplName).html(), _html_obj);
					$('#game-panel').html(_html);
					$('#example').html(play_arr[i]['example']);
					$('#info').html(play_arr[i]['info'] || '');
					$('#simpleInfo').html(play_arr[i]['simpleInfo']);
					$('#playBonus').html(play_arr[i]['bonusProp']);
					var isDel = false;
					var signal = 'yes'; // 信号
					// 监听键盘删除操作 如果用户是按的删除键，就不将当前的玩法值设置进输入框中了
					/*
					 * $('#game-input').detach('keydown').on('keydown' , function (evt){
					 * var _this = this; window.setTimeout(function (){ signal = 'yes';
					 * isDel = (evt.keyCode == 8 || evt.keyCode == 46) ? true : false;
					 * Play.getNumAndDetail(evt,true); },0); });
					 */
					// 如果是IE11
					/*
					 * if(false&&(/Trident\/7\./).test(navigator.userAgent)){ var
					 * _handler = function (evt){ window.setTimeout(function (){
					 * 
					 * eventListener(signal , function (){ if(!isDel){ evt = (evt) ? evt :
					 * window.event; Play.getNumAndDetail(evt); } });
					 * 
					 * },0); }; document.getElementById('game-input') && (function (){
					 * document.getElementById('game-input').
					 * removeEventListener('DOMAttrModified' , _handler,false);
					 * document.getElementById('game-input').
					 * addEventListener('DOMAttrModified' , _handler,false); })();
					 * }else{ //其他浏览器
					 */// 输入监控事件
					$('#game-input')
							.detach('input propertychange')
							.on(
									'input propertychange',
									function(evt) {
										isDel = (evt.keyCode == 8 || evt.keyCode == 46) ? true
												: false;
										var _this = this;
										window.setTimeout(function() {
											eventListener(signal, function() {
												if (!isDel) {
													evt = (evt) ? evt
															: window.event;
													Play.getNumAndDetail(evt);
												}
											});

										}, 0);
									});
					// }
					// 初始化输入型的位置选择
					if (_conf['isPosition']) {
						var _p_arr = _conf['param'][2];
						_p_arr
								&& (function() {
									for (var i = 0; i < _p_arr.length; i++) {
										$('#position_' + _p_arr[i]).attr(
												'checked', true);
									}
									  Play.getPlan(_p_arr.length);
									  Play.getNumAndDetail();
								})();
					}

					break;
				}
			}
			deferred.resolve(); // 改变deferred对象的执行状态
			return deferred.promise(); // 返回promise对象
		}
	};

})(window);