;
(function($){
	$.fn.countDown = function (options) {

		config = {};

		$.extend(config, options);

		diffSecs = this.setCountDown(config);
	
		if (config.onComplete)
		{
			$.data($(this)[0], 'callback', config.onComplete);
		}
		if (config.omitWeeks)
		{
			$.data($(this)[0], 'omitWeeks', config.omitWeeks);
		}
		$('#' + $(this).attr('id') + ' .digit').html('<div class="cttop"></div><div class="ctbottom"></div>');
		var clientTime = new Date();
		var c_s_diff = config.nowTime.getTime() - clientTime.getTime();	//服务器时间与客户端时间差 毫秒
		var _this = $(this);
		/*
		 测试结果：　
		　　在ie各个版本浏览器下，得到的alert结果大体为：14左后，区间为8~21毫秒之间； 
		　　chrome19，基本为1，区间为1~5之间，但是偶尔会是15左右 
		　　firefox12，基本为3，区间为2~7之间，但是偶尔也有15左右的值 
		　　safari5.1，基本为4，区间为1~7之间，但是偶尔也有15左右的值 
		　　opera11.5，基本为5，区间为2~8之间，但是偶尔有很大值 
		 */
		
		var time_delay = 0;
		//ie
		if(navigator.userAgent.indexOf("MSIE")>0){
			time_delay = 100;
		}
//		//chrome
//		if(window.google && window.chrome){
//			time_delay = 1;
//		}else
//		//Firefox
//		if(navigator.userAgent.toUpperCase().indexOf("Firefox")){
//			time_delay = 3;
//		}else
//		//Safari
//		if(userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") < 1){
//			time_delay = 4;
//		}else
//		//Opera
//		if(userAgent.indexOf("Opera") > -1){
//			time_delay = 5;
//		}
		time_delay = 1000 - time_delay;
		setTimeout(function (){
			_this.doCountDown(_this.attr('id'),c_s_diff, 800 ,config, config.doFunc , time_delay);
		},0);
		return this;
	};

	$.fn.stopCountDown = function () {
		clearTimeout($.data(this[0], 'timer'));
	};

	$.fn.startCountDown = function () {
		this.doCountDown($(this).attr('id'),$.data(this[0], 'diffSecs'), 500);
	};

	$.fn.setCountDown = function (options) {
		var targetTime = new Date();

		if (options.targetDate)
		{
			targetTime = new Date(options.targetDate.month + '/' + options.targetDate.day + '/' + options.targetDate.year + ' ' + options.targetDate.hour + ':' + options.targetDate.min + ':' + options.targetDate.sec + (options.targetDate.utc ? ' UTC' : ''));
		}
		
		diffSecs = Math.floor((targetTime.valueOf()-options.nowTime.valueOf())/1000);	//剩余时间 sec
		var nowTime = options.nowTime || new Date();

		$.data(this[0], 'diffSecs', diffSecs);
		return diffSecs;
	};

	$.fn.doCountDown = function (id,c_s_diff, duration ,config, _doFunc , time_delay) {
		var clientTime = new Date();
		clientTime.setTime(clientTime.valueOf() + c_s_diff);
		
		var serverTime = new Date(config.targetDate.year,config.targetDate.month-1 , config.targetDate.day,config.targetDate.hour,config.targetDate.min,config.targetDate.sec);
		
		var _diff = diffSecs = Math.floor((serverTime.getTime() - clientTime.getTime())/1000);
		var hours = Math.floor(_diff/60/60)%24;
		var mins = Math.floor(_diff/60)%60;
		var secs = _diff % 60;
		
		$this = $('#' + id);
		if (diffSecs <= 0)
		{
			diffSecs = 0;
			if ($.data($this[0], 'timer'))
			{
				clearTimeout($.data($this[0], 'timer'));
			}
		}
		
		if ($.data($this[0], 'omitWeeks') == true)
		{
			days = Math.floor(diffSecs/60/60/24);
			weeks = Math.floor(diffSecs/60/60/24/7);
		}
		else 
		{
			days = Math.floor(diffSecs/60/60/24)%7;
			weeks = Math.floor(diffSecs/60/60/24/7);
		}
		window.lwt = _diff;
		$this.dashChangeTo(id, 'seconds_dash', secs, duration ? duration : 800);
		$this.dashChangeTo(id, 'minutes_dash', mins, duration ? duration : 1200);
		$this.dashChangeTo(id, 'hours_dash', hours, duration ? duration : 1200);
		//$this.dashChangeTo(id, 'days_dash', days, duration ? duration : 1200);
		//$this.dashChangeTo(id, 'weeks_dash', weeks, duration ? duration : 1200);
		
		_doFunc && _doFunc(diffSecs);
		
		$.data($this[0], 'diffSecs', diffSecs);
		if (diffSecs > 0)
		{
			e = $this;
			t = setTimeout(function() { e.doCountDown(id, c_s_diff , duration ,config, _doFunc , time_delay) } , time_delay);
			$.data(e[0], 'timer', t);
		} 
		else if (cb = $.data($this[0], 'callback')) 
		{
			$.data($this[0], 'callback')();
		}
	};

	$.fn.dashChangeTo = function(id, dash, n, duration) {
		  $this = $('#' + id);
		 
		  for (var i=($this.find('.' + dash + ' .digit').length-1); i>=0; i--)
		  {
				var d = n%10;
				n = (n - d) / 10;
				$this.digitChangeTo('#' + $this.attr('id') + ' .' + dash + ' .digit:eq('+i+')', d, duration);
		  }
	};

	$.fn.digitChangeTo = function (digit, n, duration) {
		if (!duration)
		{
			duration = 800;
		}
		if ($(digit + ' div.cttop').html() != n + '')
		{

			$(digit + ' div.cttop').css({'display': 'none'});
			$(digit + ' div.cttop').html((n ? n : '0')).slideDown(duration);

			$(digit + ' div.ctbottom').animate({'height': ''}, duration, function() {
				$(digit + ' div.ctbottom').html($(digit + ' div.cttop').html());
				$(digit + ' div.ctbottom').css({'display': 'block', 'height': ''});
				$(digit + ' div.cttop').hide().slideUp(10);
			});
		}
	};

})(jQuery);


