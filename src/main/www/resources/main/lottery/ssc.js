;(function(global) { 
	
	//Play.lotteryPageInit();
	//判断是否是正常的方案
	var isOkPlan = function (_n){
		if($('span[data-flag="position_area"]').css('display') && 'none' !== $('span[data-flag="position_area"]').css('display')){
			var _posLen = $('input[name="position"]:checked').length;
			if(_posLen < _n){
				return false;
			}
		}
		return true;
	};
	//判断是否是豹子号
	isLeopard = function (Num , pos){
		var leo = Num;
		var temp_leo = '';
		var leo_i = 0;
		for(var m=0;m<leo.length;m++){
			if(m ==0){
				temp_leo = leo.substring(0,1);
			}
			if(temp_leo === leo.substring(m,(m+1)) ){
				leo_i++;
			}
		}
		if(pos == leo_i){
		   return true;
	    }
	    return false;
	};
	global.SSC = {
		/**
		 * 复式通用算法  通用：四星	四星一码
		 * 
		 * @param [Number]
		 *            max_place 位数 如：万 千 百 十 个
		 * @param [Array]
		 *            data_sel 各个位数选择的号，如从 万 千 百 十 个 中选择的数分别为1 2 3 4 5
		 *            那传过来的数组格式应该是这样：[["1"],["2"],["3"],["4"],["5"]]
		 */
		FU : function(max_place, data_sel) {
			var tn = 1;
			var i = 0;
			for (i = 0; i < max_place; i++) {
				if (data_sel[i].length == 0) {
					tn = 0;
					break;
				}
				tn *= data_sel[i].length;
			}
			return tn;
		},
		/**
		 * 通用： 五星：五星组合 ZH5 ;四星 四星组合 ZH4;后三 后三组合 ZH3;前三 前三组合 ZH3
		 * @param n		五星组合 输入 5  四星组合输入 4 依次类推
		 * @param max_place	位数 如：万 千 百 十 个
		 * @param data_sel 
		 * @returns {Number} 注数
		 */
		ZH : function (n , max_place , data_sel){
			var tmp_nums = 1;
			for (i = 0; i < max_place; i++) {
			    if (data_sel[i].length == 0) {
			        tmp_nums = 0;
			        break;
			    }
			    tmp_nums *= data_sel[i].length;
			}
			return tmp_nums * n;
		},
		/**
		 * 组选120
		 */
		ZU_120 : function(data_sel) {
			var nums = 0;
			var s = data_sel[0].length;
			if (s > 4) {
				nums += Math.Com(s, 5);
			}
			return nums;
		},
		/**
		 * 通用：五星组60 五星组30 五星组20 五星组10 五星组5
		 * 
		 * @param data_sel
		 *            data_sel data_sel[0] 二重号 如二重号为：2 那参数格式为 ["2"] data_sel
		 *            data_sel[1] 单号 如单号为：1 3 4 那参数格式为 ["1","3","4"]
		 * @param minchosen
		 *            玩法规则： 如五星组选：组选60 规则是：从“二重号”选择一个号码，“单号”中选择三个号码组成一注。
		 *            那传入的格式应该是这样：[1,3]
		 */
		ZU_60_30_20_10_5 : function(mname, data_sel, minchosen) {
			var tmp_nums = 1;
			var nums = 0;
			if (data_sel[0].length >= minchosen[0]
					&& data_sel[1].length >= minchosen[1]) {
				var h =  intersect(data_sel[0], data_sel[1]).length;
				tmp_nums = Math.Com(data_sel[0].length, minchosen[0])
						* Math.Com(data_sel[1].length, minchosen[1]);
				(h > 0)
						&& (function() {
							switch (mname) {
							case 'WXZU60': // 五星组选60
								tmp_nums -= Math.Com(h, 1)
										* Math.Com(data_sel[1].length - 1, 2);
								break;
							case 'WXZU30': // 五星组选30
								tmp_nums -= Math.Com(h, 2) * Math.Com(2, 1);
								if (data_sel[0].length - h > 0) {
									tmp_nums -= Math.Com(h, 1)
											* Math.Com(data_sel[0].length - h,
													1);
								}
								break;
							case 'WXZU20': // 五星组选20
								tmp_nums -= Math.Com(h, 1)
										* Math.Com(data_sel[1].length - 1, 1);
								break;
							case 'WXZU10': // 五星组选10
							case 'WXZU5': // 五星组选5
								tmp_nums -= Math.Com(h, 1);
								break;
							}
						})();
				nums += tmp_nums;
			}
			return nums;
		},
		/**
		 * 组选24
		 * 
		 * @param data_sel
		 * @returns {Number} 注数
		 */
		ZU_24 : function(data_sel) {
			var nums = 0;
			var s = data_sel[0].length;
			if (s > 3) {
				nums += Math.Com(s, 4);
			}
			return nums;
		},
		/**
		 * 组选6
		 * 
		 * @param data_sel
		 * @param minchosen
		 *            玩法规则： 如五星组选：组选60 规则是：从“二重号”选择一个号码，“单号”中选择三个号码组成一注。
		 *            那传入的格式应该是这样：[1,3]
		 * @returns {Number} 注数
		 */
		ZU_6 : function(data_sel, minchosen) {
			var nums = 0;
			if (data_sel[0].length >= minchosen[0]) {
				nums += Math.Com(data_sel[0].length, minchosen[0]);
			}
			return nums;
		},
		/**
		 * 通用：组选12 组选4
		 * 
		 * @param data_sel
		 * @param minchosen
		 *            玩法规则： 如五星组选：组选60 规则是：从“二重号”选择一个号码，“单号”中选择三个号码组成一注。
		 *            那传入的格式应该是这样：[1,3]
		 * @returns {Number} 注数
		 */
		ZU_12_4 : function(mname,data_sel, minchosen) {
			var nums = 0;
			var tmp_nums = 1;
			var lt_position_sel = [];
			if (data_sel[0].length >= minchosen[0]
					&& data_sel[1].length >= minchosen[1]) {
				var h =  intersect(data_sel[0], data_sel[1]).length;
				tmp_nums = Math.Com(data_sel[0].length, minchosen[0])
						* Math.Com(data_sel[1].length, minchosen[1]);
				(h > 0)
						&& (function() {
							switch (mname) {
							case 'ZU12':
								tmp_nums -= Math.Com(h, 1)
										* Math.Com(data_sel[1].length - 1, 1);
								break;
							case 'ZU4':
								tmp_nums -= Math.Com(h, 1);
								break;
							}
						})();
				nums += tmp_nums;
			}
			return nums;
		},
		/**
		 * 定位胆
		 */
		DWD : function (max_place , data_sel){
			var nums = 0;
			for (i = 0; i < max_place; i++) {
				nums += data_sel[i].length;
			}
			return nums;
		},
		/**
		 * 通用：直选和值 组选和值 直选跨度 SAN_ZXHZ_ZUXHZ_ZXKD
		 */
		ZXHZ_ZUXHZ_ZXKD : function(mname, max_place, data_sel) {
			var cc = null;
			switch (mname) {
			case 'ZXHZ': // 后三|前三|任选三 直选和值
				cc={0:1,1:3,2:6,3:10,4:15,5:21,6:28,7:36,8:45,9:55,10:63,11:69,12:73,13:75,14:75,15:73,16:69,17:63,18:55,19:45,20:36,21:28,22:21,23:15,24:10,25:6,26:3,27:1};
				break;
			case 'ZXHZ2':		//后二|前二|任选二 直选和值	
				cc={0:1,1:2,2:3,3:4,4:5,5:6,6:7,7:8,8:9,9:10,10:9,11:8,12:7,13:6,14:5,15:4,16:3,17:2,18:1};
				break;
			case 'ZUXHZ':	//后三|前三 组选和值
				cc={1:1,2:2,3:2,4:4,5:5,6:6,7:8,8:10,9:11,10:13,11:14,12:14,13:15,14:15,15:14,16:14,17:13,18:11,19:10,20:8,21:6,22:5,23:4,24:2,25:2,26:1};
				break;
			case 'ZUXHZ2':	//后二|前二 组选和值
				cc={0:0,1:1,2:1,3:2,4:2,5:3,6:3,7:4,8:4,9:5,10:4,11:4,12:3,13:3,14:2,15:2,16:1,17:1,18:0};
				break;
			case 'ZXKD': // 后三|前三 直选跨度
				cc={0:10,1:54,2:96,3:126,4:144,5:150,6:144,7:126,8:96,9:54};
				break;
			case 'ZXKD2': //后二|前二 直选跨度
				cc={0:10,1:18,2:16,3:14,4:12,5:10,6:8,7:6,8:4,9:2};
				break;
			}
			var nums = 0;
			for (i = 0; i < max_place; i++) {
				var s = data_sel[i].length;
				for (j = 0; j < s; j++) {
					nums += cc[parseInt(data_sel[i][j], 10)]
				}
			}
			return nums;
		},
		/**
		 * 后三|前三|任选三 组三复式
		 * 
		 * @param max_place
		 * @param data_sel
		 * @returns {Number}
		 */
		SAN_3_FU : function(max_place, data_sel) {
			var nums = 0;
			for (i = 0; i < max_place; i++) {
				var s = data_sel[i].length;
				if (s > 1) {
					nums += s * (s - 1)
				}
			}
			return nums;
		},
		/**
		 * 后三|前三 组六复式
		 * 
		 * @param max_place
		 * @param data_sel
		 * @returns {Number}
		 */
		SAN_6_FU : function(max_place, data_sel) {
			var nums = 0;
			var lt_position_sel = [];
			for (i = 0; i < max_place; i++) {
				var s = data_sel[i].length;
				if (s > 2) {
					nums += s * (s - 1) * (s - 2) / 6;
				}
			}
			return nums;
		},
		/**
		 * 后三|前三 组选包胆
		 */
		SAN_BD : function(data_sel) {
			return data_sel[0].length * 54;
		},
		/**
		 * 后二|前二|任二 组选复式 通用：后三二码、前三二码 四星二码 五星二码 算法
		 */
		ZU_2 : function (max_place,data_sel,position,_flag){
			var nums = 0;
			for (i = 0; i < max_place; i++) {
				var s = data_sel[i].length;
				if (s > 1) {
					nums += s * (s - 1) / 2
				}
			}
			if('2xz_rx2zxfs' === _flag){ //任选二组选
				if(!isOkPlan(position.length)){
					return '请选择规定的位置个数！';
				}
				var positionNum = +($('#positioninfo').html());
				if(!isNaN(positionNum) && positionNum > 0){
					return nums * positionNum;
				}
			}
			return nums;
		},
		/**
		 * 后二|前二 组选包胆
		 * @returns {Number}
		 */
		ZU_2_BD : function (data_sel){
			return data_sel[0].length * 9;
		},
		/**
		 * 五星 五星三码
		 * @param max_place @Number 位数  如：万 千 百 十 个
		 * @param data_sel @Array 各个位数选择的号，
		 *  如从 万 千 百 十 个 中选择的数分别为1 2 3 4 5 
		 那传过来的数组格式应该是这样：[["1"],["2"],["3"],["4"],["5"]]
		 */
		WXSM : function (max_place , data_sel){
			var nums = 0;
			for (i = 0; i < max_place; i++) {
				var s = data_sel[i].length;
				if (s > 2) {
					nums += Math.Com(data_sel[i].length, 3)
				}
			}
			return nums;
		},
		/**
		 * 通用：任四|任三|任二直选 直选复式
		 * @param max_place
		 * @param data_sel
		 * @returns
		 */
		RX_ZXFS : function (n,max_place,data_sel , mname){
			var _c = 0;
			var _dL = data_sel.length;
			for(var i =0;i<_dL;i++){
			    if(data_sel[i].length>0){
			        _c++;
			    }
			}
			switch(mname){
				case 'RX2FS':	//任选二复式 任选大小单双
					if(_c < 2) return '请选择2位以上数字！';
					break;
				case 'RX3FS':	//任选三复式
					if(_c < 3) return '请选择3位以上数字！';
					break;
				case 'RX4FS':	//任选四复式
					if(_c < 4) return '请选择4位以上数字！';
					break;
			}
			
			var aCodePosition = [];
			for (i = 0; i < max_place; i++) {
				var codelen = data_sel[i].length;
				if (codelen > 0) {
					aCodePosition.push(i)
				}
			}
			var sellen = n;
			var aPositionCombo = getRs(aCodePosition, sellen);

			var iComboLen = aPositionCombo.length;
			var aCombo = [];
			var iLen = 0;
			var tmpNums = 1;
			var nums = 0;
			for (j = 0; j < iComboLen; j++) {
				aCombo = aPositionCombo[j].split(",");
				iLen = aCombo.length;
				tmpNums = 1;
				for (h = 0; h < iLen; h++) {
					tmpNums *= data_sel[aCombo[h]].length
				}
				nums += tmpNums
			}
			return nums;
		},
		/**
		 * 手动输入型	单式 通用型
		 */
		DAN : function (jQ , _n ){
			var _lastParam = arguments[arguments.length-1];
			var isEvent = _lastParam['type'] && _lastParam['type'] == 'keydown';	//是否是键盘按下事件
			var isSame  = false;//arguments[arguments.length-2] === 'same' ? true : false;  //是否不允许豹子号
			var isDel = false;
			if(isEvent){
				var evt = arguments[arguments.length-1];
				isDel = (evt.keyCode == 8 || evt.keyCode == 46) ? true : false;
			}
			var _val = jQ.val();
			var _n_val = _val.replace(/[\n\t]+/g , ' ');
			var _n_val = _n_val.replace(/(\s){2,}/g,'$1');
			var _num = 0;
			var _nL = _n_val.length;
			//---第一轮校验，校验基本输入格式是否正确：1、中间是否有空格；2、是否有非数字字符出现
			if(_nL == _n){
				_num = 1;
				if(isSame&&isLeopard(_n_val ,_n)){
					_n_val = '';
				}else{
					_n_val += ' ';
				}
			}else if(_nL > _n){
				var _curInput = _n_val.substring(_n_val.lastIndexOf(' ')+1,_nL);
				if( _curInput.length >= _n ){
					_n_val += ' ';
				}
				//第二轮校验，校验每注数组是否满足玩法的规则
				var _n_arr = _n_val.split(' ');
				var _c_arr = [];
				
				var i =	0;
				var _n_arr_len = _n_arr.length;
				for(;i<_n_arr_len;i++){
					if(_n_arr[i].length == _n || i == (_n_arr.length-1)){
						if(_c_arr.indexOf(_n_arr[i])<0)
						   _c_arr.push(_n_arr[i]);
					}
				}
				_n_arr.length = 0;
				_c_arr = uniquelize(_c_arr);
				
				var _c_arr_len = _c_arr.length;
				i = 0;
				for(;i< _c_arr_len;i++){
					if(isSame && isLeopard(_c_arr[i] + '' , _n)){//不允许豹子号
						_c_arr.splice(i,1);
						_c_arr_len = _c_arr.length;
						i--;
						continue;
					}
					if(_n == _c_arr[i].length){
						_num++;
					}
				}
				_n_val = _c_arr.join(' ');
				if(_c_arr[_c_arr.length-1].length >0 && 
						_c_arr[_c_arr.length-1].length < _n){
					//jQ.val(_n_val);
					return '请输入'+_n+'位数字！';
				}
			}
			if(!isDel){	//如果用户是按的删除键，就不将当前的玩法值设置进输入框中了
				jQ.val(_n_val);
			}
			var _checkArr = _n_val.split(" ");
			for (var i = 0; i < _checkArr.length; i++) {
				if(/[^\d]+/.test(_checkArr[i])){
					return "投注数据含有非数字！";
				}
			};
			if(!isOkPlan(_n)){
				return '请选择规定的位置个数！';
			}
			if('none' !== $('span[data-flag="position_area"]').css('display')){
				var positionNum = +($('#positioninfo').html());
				if(!isNaN(positionNum) && positionNum > 0){
					return _num * positionNum;
				}
			}
			return _num;
		},
		/**
		 * 手动输入型	单式 通用型
		 */
		DAN_DEL : function (jQ , _n ){
			var isSame  = false;  //是否不允许豹子号
			var _val = jQ.val();
			var _n_val = _val;
			var _num = 0;
			var _nL = _n_val.length;
			//---第一轮校验，校验基本输入格式是否正确：1、中间是否有空格；2、是否有非数字字符出现
			if(_nL == _n){
				_num = 1;
			}else if(_nL > _n){
				var _curInput = _n_val.substring(_n_val.lastIndexOf(' ')+1,_nL);
				//第二轮校验，校验每注数组是否满足玩法的规则
				var _n_arr = _n_val.split(' ');
				var _c_arr = [];
				
				var i =	0;
				var _n_arr_len = _n_arr.length;
				for(;i<_n_arr_len;i++){
					if(_n_arr[i].length == _n || i == (_n_arr.length-1)){
						_c_arr.push(_n_arr[i]);
					}
				}
				_n_arr.length = 0;
				_c_arr = uniquelize(_c_arr);
				
				var _c_arr_len = _c_arr.length;
				i = 0;
				for(;i< _c_arr_len;i++){
					if(isSame && isLeopard(_c_arr[i] + '' , _n)){//不允许豹子号
						_c_arr.splice(i,1);
						_c_arr_len = _c_arr.length;
						i--;
						continue;
					}
					if(_n == _c_arr[i].length){
						_num++;
					}
				}
				_n_val = _c_arr.join(' ');
				if(_c_arr[_c_arr.length-1].length >0 && 
						_c_arr[_c_arr.length-1].length < _n){
					_num = '请输入'+_n+'位数字！';
				}
			}
			jQ.val(_n_val);
			var _checkArr = _n_val.split(" ");
			for (var i = 0; i < _checkArr.length; i++) {
				if(/[^\d]+/.test(_checkArr[i])){
					_num = "投注数据含有非数字！";
				}
			};
			if(!isOkPlan(_n)){
				_num = '请选择规定的位置个数！';
			}
			if('none' !== $('span[data-flag="position_area"]').css('display')){
				var positionNum = +($('#positioninfo').html());
				if(!isNaN(positionNum) && positionNum > 0){
					return _num * positionNum;
				}
			}
			return _num;
		}
	};
})(window); 

/**
 * 时时彩业务类
 * 
 * @author sherwynTang
 * @createTime 2015/02/01
 */
;
(function(global) {

	global.playsConf = function(_playObj) {
		var _conf = {
			type 		: '',
			code_list 	: [],
			template 	: '',
			algo 		: null,
			param 		: null,
			detail 		: null,
			isRbtn 		: true,
			isQing 		: true,
			isShuang	: true,
			isDan 		: true,
			isXiao 		: true,
			isDa 		: true,
			isQuan 		: true,
			isPosition	:false	//是否显示方案
		};

		var _playType = _playObj['ruleFun'];
		// type: digital 数字选择型
		switch (_playType) {
		case '5x_5xfs': // 五星复式
			_conf['type'] = 'digital';
			_conf['code_list'] = [ 
			        [ '万位', '0|1|2|3|4|5|6|7|8|9' ],
					[ '千位', '0|1|2|3|4|5|6|7|8|9' ],
					[ '百位', '0|1|2|3|4|5|6|7|8|9' ],
					[ '十位', '0|1|2|3|4|5|6|7|8|9' ],
					[ '个位', '0|1|2|3|4|5|6|7|8|9' ] ];
			break;
		case 'zx120'	: 	//组选120
				_conf['type']	   = 'digital';
				_conf['code_list'] = [
				    [_playObj['name'] , '0|1|2|3|4|5|6|7|8|9']
	 	        ];
				_conf['param'] 	= [Play.assemble()];
				_conf['detail'] = getRs($.range(_conf['code_list'].length),_conf['code_list'].length);
				_conf['algo'] 	   = SSC.ZU_120; 	//组选120算法
				break;

			case 'zx60' :						//组选60
			case 'zx30' :						//组选30
			case 'zx20' :						//组选20
			case 'zx10' :						//组选10
			case 'zx5' 	:						//组选5
				_conf['type']	   = 'digital';
				if('zx60'==_playType){
					_conf['code_list'] = [
    				    ['二重号' 			, '0|1|2|3|4|5|6|7|8|9'],
    				    ['单 &nbsp;&nbsp;号' 	, '0|1|2|3|4|5|6|7|8|9']
    	 	        ];
					_conf['param'] 	= ['WXZU60',Play.assemble() , [1,3] ];
				}
				else if('zx30' == _playType){
					_conf['code_list'] = [
    				    ['二重号' 		   	, '0|1|2|3|4|5|6|7|8|9'],
    				    ['单 &nbsp;&nbsp;号' 	, '0|1|2|3|4|5|6|7|8|9']
    	 	        ];
					_conf['param'] 	= ['WXZU30',Play.assemble() , [2,1] ];
				}
				else if('zx20' == _playType){
					_conf['code_list'] = [
    				    ['三重号' 		   	, '0|1|2|3|4|5|6|7|8|9'],
    				    ['单 &nbsp;&nbsp;号' 	, '0|1|2|3|4|5|6|7|8|9']
    	 	        ];
					_conf['param'] 	= ['WXZU20',Play.assemble() , [1,2] ];
				}
				else if('zx10' == _playType){
					_conf['code_list'] = [
    				    ['三重号' , '0|1|2|3|4|5|6|7|8|9'],
    		    				    ['二重号' , '0|1|2|3|4|5|6|7|8|9']
    	 	        ];
					_conf['param'] 	= ['WXZU10',Play.assemble() , [1,1] ];
				}
				else if('zx5' == _playType){
					_conf['code_list'] = [
    				    ['四重号' 			, '0|1|2|3|4|5|6|7|8|9'],
    				    ['单 &nbsp;&nbsp;号' 	, '0|1|2|3|4|5|6|7|8|9']
    	 	        ];
					_conf['param'] 	= ['WXZU5',Play.assemble() , [1,1] ];
				}
				_conf['detail'] = getRs($.range(_conf['code_list'].length),_conf['code_list'].length);
				_conf['algo'] 	= SSC.ZU_60_30_20_10_5;		
			break;
		case 'qwwfyffs': // 一帆风顺
		case 'qwwfhscs': // 好事成双
		case 'qwwfsxbx': // 三星报喜
		case 'qwwfsjfc': // 四季发财
			_conf['type'] = 'digital';
			_conf['code_list'] = [ [ _playObj['name'], '0|1|2|3|4|5|6|7|8|9' ] ];
			break;
		case '4x_q4fs':	//前四复式
			_conf['type'] = 'digital';
			_conf['code_list'] = [ 
		        [ '万位', '0|1|2|3|4|5|6|7|8|9' ],
				[ '千位', '0|1|2|3|4|5|6|7|8|9' ],
				[ '百位', '0|1|2|3|4|5|6|7|8|9' ],
				[ '十位', '0|1|2|3|4|5|6|7|8|9' ]];
			break;
		case '4x_h4fs': //后四复式
			_conf['type'] = 'digital';
			_conf['code_list'] = [ 
				[ '千位', '0|1|2|3|4|5|6|7|8|9' ],
				[ '百位', '0|1|2|3|4|5|6|7|8|9' ],
				[ '十位', '0|1|2|3|4|5|6|7|8|9' ],
				[ '个位', '0|1|2|3|4|5|6|7|8|9' ] ];
			break;
		case '3x_q3fs':	//三星玩法 前三复式
			_conf['type'] = 'digital';
			_conf['code_list'] = [ 
			    [ '万位', '0|1|2|3|4|5|6|7|8|9' ],
				[ '千位', '0|1|2|3|4|5|6|7|8|9' ],
				[ '百位', '0|1|2|3|4|5|6|7|8|9' ]];
			break;
		case '3x_z3fs':	//中三复式
			_conf['type'] = 'digital';
			_conf['code_list'] = [ 
				[ '千位', '0|1|2|3|4|5|6|7|8|9' ],
				[ '百位', '0|1|2|3|4|5|6|7|8|9' ],
				[ '十位', '0|1|2|3|4|5|6|7|8|9' ]];
			break;
		case '3x_h3fs':	//后三复式
			_conf['type'] = 'digital';
			_conf['code_list'] = [ 
				[ '百位', '0|1|2|3|4|5|6|7|8|9' ],
				[ '十位', '0|1|2|3|4|5|6|7|8|9' ],
				[ '个位', '0|1|2|3|4|5|6|7|8|9' ]];
			break;
		case '3xz_q3z3':	//前三组三
		case '3xz_z3z3':	//中三组三
		case '3xz_h3z3':	//后三组三
			_conf['type'] = 'digital';
			_conf['code_list'] = [ [ '组三', '0|1|2|3|4|5|6|7|8|9' ] ];
			_conf['param'] = [_conf['code_list'].length,
					Play.assemble() ];
			_conf['algo'] = SSC.SAN_3_FU;
			break;
		case '3xz_q3z6': //前三组六
		case '3xz_z3z6': //中三组六
		case '3xz_h3z6': //后三组六
			_conf['type'] = 'digital';
			_conf['code_list'] = [ [ '组六', '0|1|2|3|4|5|6|7|8|9' ] ];
			_conf['param'] = [_conf['code_list'].length,
					Play.assemble() ];
			_conf['algo'] = SSC.SAN_6_FU;
			break;
		case '2x_q2fs':	//前二复式
			_conf['type'] = 'digital';
			_conf['code_list'] = [ 
			    [ '万位', '0|1|2|3|4|5|6|7|8|9' ],
				[ '千位', '0|1|2|3|4|5|6|7|8|9' ]];
			break;
		case '2x_h2fs': //后二复式
			_conf['type'] = 'digital';
			_conf['code_list'] = [ 
			    [ '十位', '0|1|2|3|4|5|6|7|8|9' ],
				[ '个位', '0|1|2|3|4|5|6|7|8|9' ]];
			break;

		case '2x_rx2fs':	//任选二 复式
			_conf['type'] = 'digital';
			_conf['code_list'] = [ 
		        [ '万位', '0|1|2|3|4|5|6|7|8|9' ],
				[ '千位', '0|1|2|3|4|5|6|7|8|9' ],
				[ '百位', '0|1|2|3|4|5|6|7|8|9' ],
				[ '十位', '0|1|2|3|4|5|6|7|8|9' ],
				[ '个位', '0|1|2|3|4|5|6|7|8|9' ] 
		    ];
			_conf['param'] = [2,_conf['code_list'].length,Play.assemble() ,'RX2FS'];
			_conf['algo'] = SSC.RX_ZXFS;	//任选	直选复式通用算法
			_conf['detail'] = getRs($.range(_conf['code_list'].length),
				_conf['code_list'].length);
			break;
		case '2xz_q2zxfs': //前二 组选复式
		case '2xz_h2zxfs': //后二 组选复式
		case '2xz_rx2zxfs':	//任选二 组选复式
			_conf['type'] = 'digital';
			_conf['code_list'] = [ 
				[ '组选', '0|1|2|3|4|5|6|7|8|9' ]
			];
			if('2xz_rx2zxfs' === _playType){
				_conf['isPosition'] = true;
				_conf['param'] = [_conf['code_list'].length,Play.assemble(),[3,4],'2xz_rx2zxfs' ];
			}else{
				_conf['param'] = [_conf['code_list'].length,Play.assemble() ];
			}
			_conf['detail'] = getRs($.range(_conf['code_list'].length),
					_conf['code_list'].length);
			_conf['algo'] = SSC.ZU_2;
			break;	
			
		case 'dxds_rxdxds': //任选大小单双
			_conf['type'] = 'digital';
			_conf['code_list'] = [ 
				[ '万位', '大|小|单|双' ],
				[ '千位', '大|小|单|双' ],
				[ '百位', '大|小|单|双' ],
				[ '十位', '大|小|单|双' ],
				[ '个位', '大|小|单|双' ]
			];
			_conf['param'] = [2, _conf['code_list'].length,Play.assemble() , 'RX2FS'];
			_conf['algo'] = SSC.RX_ZXFS;	//任选	直选复式通用算法
			_conf['detail'] = getRs($.range(_conf['code_list'].length),
					_conf['code_list'].length);
			_conf['isShuang'] = _conf['isDan'] = 
				_conf['isXiao'] = _conf['isDa'] = 
					_conf['isQuan'] = _conf['isQing'] = false;
			break;
		case 'rxwf_rx3fs': //任选三复式
			_conf['type'] = 'digital';
			_conf['code_list'] = [ 
		        [ '万位', '0|1|2|3|4|5|6|7|8|9' ],
				[ '千位', '0|1|2|3|4|5|6|7|8|9' ],
				[ '百位', '0|1|2|3|4|5|6|7|8|9' ],
				[ '十位', '0|1|2|3|4|5|6|7|8|9' ],
				[ '个位', '0|1|2|3|4|5|6|7|8|9' ] 
		    ];
			_conf['param'] = [3,_conf['code_list'].length,Play.assemble() ,'RX3FS'];
			_conf['algo'] = SSC.RX_ZXFS;	//任选	直选复式通用算法
			_conf['detail'] = getRs($.range(_conf['code_list'].length),
				_conf['code_list'].length);
			break;
		case 'rxwf_rx4fs'://任选四复式
			_conf['type'] = 'digital';
			_conf['code_list'] = [ 
		        [ '万位', '0|1|2|3|4|5|6|7|8|9' ],
				[ '千位', '0|1|2|3|4|5|6|7|8|9' ],
				[ '百位', '0|1|2|3|4|5|6|7|8|9' ],
				[ '十位', '0|1|2|3|4|5|6|7|8|9' ],
				[ '个位', '0|1|2|3|4|5|6|7|8|9' ] 
		    ];
			_conf['param'] = [4,_conf['code_list'].length,Play.assemble() ,'RX4FS'];
			_conf['algo'] = SSC.RX_ZXFS;	//任选	直选复式通用算法
			_conf['detail'] = getRs($.range(_conf['code_list'].length),
				_conf['code_list'].length);
			break;
		case 'bdw_h31m':	//后三一码
		case 'bdw_q31m':	//前三一码
		case 'bdw_z31m':	//中三一码
		case 'bdw_4x1m':	//四星一码
			_conf['type'] = 'digital';
			_conf['code_list'] = [ 
				[ '不定位', '0|1|2|3|4|5|6|7|8|9' ]
			];	
			break;
		case 'bdw_h32m':	//后三二码
		case 'bdw_q32m':	//前三二码
		case 'bdw_4x2m':	//四星二码
		case 'bdw_5x2m':	//五星二码
			_conf['type'] = 'digital';
			_conf['code_list'] = [ 
				[ '不定位', '0|1|2|3|4|5|6|7|8|9' ]
			];
			_conf['param'] = [_conf['code_list'].length,Play.assemble() ];
			_conf['algo'] = SSC.ZU_2;
			break;
		case 'bdw_5x3m':	//五星三码
			_conf['type'] = 'digital';
			_conf['code_list'] = [ 
				[ '不定位', '0|1|2|3|4|5|6|7|8|9' ]
			];
			_conf['param'] = [_conf['code_list'].length,Play.assemble() ];
			_conf['algo'] = SSC.WXSM;
			break;
		case 'dxds_q2dxds': //前二大小单双
			_conf['type'] = 'digital';
			_conf['code_list'] = [ 
				[ '万位', '大|小|单|双' ],
				[ '千位', '大|小|单|双' ]
			];
			_conf['isShuang'] = _conf['isDan'] = 
				_conf['isXiao'] = _conf['isDa'] = 
					_conf['isQuan'] = _conf['isQing'] = false;
			break;
		case 'dxds_h2dxds': //后二大小单双
			_conf['type'] = 'digital';
			_conf['code_list'] = [ 
				[ '十位', '大|小|单|双' ],
				[ '个位', '大|小|单|双' ]
			];
			_conf['isShuang'] = _conf['isDan'] = 
				_conf['isXiao'] = _conf['isDa'] = 
					_conf['isQuan'] = _conf['isQing'] = false;
			break;
		case 'dxds_q3dxds': //前三大小单双
			_conf['type'] = 'digital';
			_conf['code_list'] = [ 
				[ '万位', '大|小|单|双' ],
				[ '千位', '大|小|单|双' ],
				[ '百位', '大|小|单|双' ]
			];
			_conf['isShuang'] = _conf['isDan'] = 
				_conf['isXiao'] = _conf['isDa'] = 
					_conf['isQuan'] = _conf['isQing'] = false;
			break;
		case 'dxds_h3dxds': //后三大小单双
			_conf['type'] = 'digital';
			_conf['code_list'] = [ 
			    [ '百位', '大|小|单|双' ],
				[ '十位', '大|小|单|双' ],
				[ '个位', '大|小|单|双' ]
			];
			_conf['isShuang'] = _conf['isDan'] = 
				_conf['isXiao'] = _conf['isDa'] = 
					_conf['isQuan'] = _conf['isQing'] = false;
			break;
		case 'dwd_wxdwd':	//定位胆 五星定位胆
			_conf['type'] = 'digital';
			_conf['code_list'] = [ 
		        [ '万位', '0|1|2|3|4|5|6|7|8|9' ],
				[ '千位', '0|1|2|3|4|5|6|7|8|9' ],
				[ '百位', '0|1|2|3|4|5|6|7|8|9' ],
				[ '十位', '0|1|2|3|4|5|6|7|8|9' ],
				[ '个位', '0|1|2|3|4|5|6|7|8|9' ] 
		    ];
			_conf['param'] = [_conf['code_list'].length, Play.assemble() ];
			_conf['detail'] = getRs($.range(_conf['code_list'].length),
					_conf['code_list'].length);
			_conf['algo'] = SSC.DWD;
			break;
			
		case '5x_5xds':	//五星单式
			_conf['type'] = 'input';
			_conf['param'] = [$('#game-input') , 5];
			break;
		case '4x_q4ds':	//前四单式
		case '4x_h4ds':	//后四单式
			_conf['type'] = 'input';
			_conf['param'] = [$('#game-input') , 4];
			break;
		case '3x_q3ds':	//前三单式
		case '3x_h3ds': //后三单式
		case '3x_z3ds':	//中三单式
			_conf['type'] = 'input';
			_conf['param'] = [$('#game-input') , 3];
			break;
		case '2x_q2ds':	//前二单式
		case '2x_h2ds':	//后二单式
			_conf['type'] = 'input';
			_conf['param'] = [$('#game-input') , 2];
			break;
		case '2x_rx2ds'://任选二单式
			_conf['type'] = 'input';
			_conf['isPosition'] = true;
			_conf['param'] = [$('#game-input') , 2 , [3,4]];
			break;
		case '2xz_q2zxds'://前二组选单式
		case '2xz_h2zxds'://后二组选单式
			_conf['type'] = 'input';
			_conf['param'] = [$('#game-input') , 2];
			break;
		case '2xz_rx2zxds'://任选二组选单式
			_conf['type'] = 'input';
			_conf['isPosition'] = true;
			_conf['param'] = [$('#game-input') , 2 , [3,4]];
			break;
		case 'rxwf_rx3ds'://任选三单式
			_conf['type'] = 'input';
			_conf['isPosition'] = true;
			_conf['param'] = [$('#game-input') , 3 , [2,3,4]];
			break;
		case 'sxzxR3h' 	 : //任选三混合组选
			_conf['type'] = 'input';
			_conf['isPosition'] = true;
			_conf['param'] = [$('#game-input') , 3 , [2,3,4] , 'same'];
			break;
		case 'rxwf_rx4ds'://任选四单式
			_conf['type'] = 'input';
			_conf['isPosition'] = true;
			_conf['param'] = [$('#game-input') , 4 , [1,2,3,4]];
			break;
		}
		if ('digital' === _conf['type']) {
			if (null == _conf['algo']) {
				_conf['param'] = [ _conf['code_list'].length, Play.assemble() ];
				_conf['detail'] = getRs(
						$.range(_conf['code_list'].length),
						_conf['code_list'].length);
				_conf['algo'] = SSC.FU; // 采用通用的复式算法
			}
			_conf['template'] = 'digital-template'; // 采用通用的数字选择型模板
		}else 
		if('input' === _conf['type']){
			if (null == _conf['algo']) {
				_conf['algo'] = SSC.DAN;//采用通用的单式算法
			}
			_conf['template'] = 'input-template'; // 采用通用的手动输入型模板
		}
		return _conf;
	};  
	
 
})(window);