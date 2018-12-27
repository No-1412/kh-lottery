		// banner
		$(function() {
			$('#slideshow').bjqs({
				height : 600,
				width : 1920,
				responsive : false
			});
		});

		//环形进度条方法
		$(window)
				.scroll(
						function() {
							if ($(window).scrollTop() > 966) {

								// 充提速度
								$(function() {
									if (!Function.prototype.bind) {
										Function.prototype.bind = function(
												oThis) {
											if (typeof this !== "function") {
												throw new TypeError(
														"Function.prototype.bind - what is trying to be bound is not callable");
											}
											var aArgs = Array.prototype.slice
													.call(arguments, 1), fToBind = this, fNOP = function() {
											}, fBound = function() {
												return fToBind
														.apply(
																this instanceof fNOP
																		&& oThis ? this
																		: oThis,
																aArgs
																		.concat(Array.prototype.slice
																				.call(arguments)));
											};

											fNOP.prototype = this.prototype;
											fBound.prototype = new fNOP();

											return fBound;
										};
									}
									var $chart = $('#chart1');
									$chart
											.easyPieChart({
												easing : 'easeOutElastic',
												delay : 3000,
												barColor : '#e44540', //#2dd16b 绿色
												scaleColor : false,
												lineWidth : 4,
												trackWidth : 4,
												lineCap : 'butt',
												onStep : function(from, to,
														percent) {
													this.el.children[0].innerHTML = Math
															.round(percent)
															+ "%";
												}
											});
									$("#chart1 canvas div").css('overflow', '');
								});

								//分红周期
								$(function() {
									if (!Function.prototype.bind) {
										Function.prototype.bind = function(
												oThis) {
											if (typeof this !== "function") {
												throw new TypeError(
														"Function.prototype.bind - what is trying to be bound is not callable");
											}
											var aArgs = Array.prototype.slice
													.call(arguments, 1), fToBind = this, fNOP = function() {
											}, fBound = function() {
												return fToBind
														.apply(
																this instanceof fNOP
																		&& oThis ? this
																		: oThis,
																aArgs
																		.concat(Array.prototype.slice
																				.call(arguments)));
											};

											fNOP.prototype = this.prototype;
											fBound.prototype = new fNOP();

											return fBound;
										};
									}
									var $chart = $('#chart2');
									$chart
											.easyPieChart({
												easing : 'easeOutElastic',
												delay : 3000,
												barColor : '#25779d', //#2dd16b 绿色
												scaleColor : false,
												lineWidth : 4,
												trackWidth : 4,
												lineCap : 'butt',
												onStep : function(from, to,
														percent) {
													this.el.children[0].innerHTML = Math
															.round(percent)
															+ "%";
												}
											});
									$("#chart2 canvas div").css('overflow', '');
								});

								//银行服务
								$(function() {
									if (!Function.prototype.bind) {
										Function.prototype.bind = function(
												oThis) {
											if (typeof this !== "function") {
												throw new TypeError(
														"Function.prototype.bind - what is trying to be bound is not callable");
											}
											var aArgs = Array.prototype.slice
													.call(arguments, 1), fToBind = this, fNOP = function() {
											}, fBound = function() {
												return fToBind
														.apply(
																this instanceof fNOP
																		&& oThis ? this
																		: oThis,
																aArgs
																		.concat(Array.prototype.slice
																				.call(arguments)));
											};

											fNOP.prototype = this.prototype;
											fBound.prototype = new fNOP();

											return fBound;
										};
									}
									var $chart = $('#chart3');
									$chart
											.easyPieChart({
												easing : 'easeOutElastic',
												delay : 3000,
												barColor : '#e44540', //#2dd16b 绿色
												scaleColor : false,
												lineWidth : 4,
												trackWidth : 4,
												lineCap : 'butt',
												onStep : function(from, to,
														percent) {
													this.el.children[0].innerHTML = Math
															.round(percent)
															+ "%";
												}
											});
									$("#chart3 canvas div").css('overflow', '');
								});
							}
						});