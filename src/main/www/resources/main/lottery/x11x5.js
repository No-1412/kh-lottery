;(function(global) { 
    //Play.lotteryPageInit();
	global.x11x5 = {
		/**
		 * 计算注数 R 任选, Q 前直选, Z 前组选 (注意 Z1, 没有直选组选区分，更像任选)
		 * 
		 * @param plyid
		 *            玩法(Q2, R2, Z2)
		 * @param codes
		 *            号码组('02 03', '05 06,07 08', '04 05 06')
		 * @returns {number}
		 */
		calculate : function(len, codes, playType) {
			var amount = 0;
			switch (playType) {
			//前二
			case 'gd11x5Q2': // 前二直选
				amount = Math.NewN1(codes, 2);		
				//amount = Math.N1([codes[0].length, codes[1].length], 2);
				break;
			case 'gd11x5Q2z': // 前二组选
				amount = Math.C(codes[0].length, 2);
				break;
			//前三
			case 'gd11x5Q3': // 前三直选
				amount = Math.NewN1(codes, 3);	
				//amount = Math.N1([codes[0].length, codes[1].length, codes[2].length], 3);
				break;	
			case 'gd11x5Q3z': // 前三组选
				amount = Math.C(codes[0].length, 3);
				break;	
			//定位胆
			case 'gd11x5dwd': // 定位胆
				amount = Math.DWD(codes);	
				//amount = Math.N1([codes[0].length, codes[1].length, codes[2].length], 3);
				break;	
					
			//不定位
			case 'gd11x5bdw': // 不定位
				amount = Math.C(codes[0].length, 1);
				break;	
			//任选复试
			case 'gd11x5R1': // 任选一中一
				amount = Math.C(codes[0].length, 1);
				break;
			case 'gd11x5R2': // 任选二中二	
				amount = Math.C(codes[0].length, 2);
				break;
			case 'gd11x5R3': // 任选三中三	
				amount = Math.C(codes[0].length, 3);
				break;
			case 'gd11x5R4': // 任选四中四
				amount = Math.C(codes[0].length, 4);
				break;
			case 'gd11x5R5': // 任选五中五
				amount = Math.C(codes[0].length, 5);
				break;
			case 'gd11x5R6': // 任选六中五
				amount = Math.C(codes[0].length, 6);
				break;
			case 'gd11x5R7': // 任选七中五
				amount = Math.C(codes[0].length, 7);
				break;
			case 'gd11x5R8': // 任选八中五
				amount = Math.C(codes[0].length, 8);
				break;
			}
			return amount;
		},
		/**
		 * 手动输入型	单式 通用型
		 */
		DAN : function (jQ , _n){
			var isEvent = arguments[arguments.length-1]['type'] && 
				arguments[arguments.length-1]['type'] == 'keydown';	//是否是键盘按下事件
			var isDel = false;
			if(isEvent){
				var evt = arguments[arguments.length-1];
				isDel = (evt.keyCode == 8 || evt.keyCode == 46) ? true : false;
			}
			var _val = jQ.val();
			var _n_val = _val.replace(/[^\d\s,]*|\t*/g , '');
			_n_val = _n_val.replace(/(\s){2,}/g,'$1');
			
			var _zs = _n_val.split(',');
			var _newzs = [];
			for(var i = 0; i < _zs.length; i++){
			    var _cs = _zs[i].split(' ');
			    if(i == _zs.length - 1){
			        var end = false;
			        for (var j = 0; j < _cs.length; j++) {
			            var _code = parseInt(_cs[j]);

			            if(j == _cs.length - 1){
			                if(_code > 1){
			                    end = true;
			                }
			            }
			            if(end || j < (_cs.length - 1)){
			                if (_code > 0 && _code < 12){
			                    if(_code < 10){
			                        _cs[j] = '0'+ _code;
			                    }
			                }
			            }
			        }

			        if(end && _cs.length != _n){
			            _newzs.push(_cs.join(' ')+' ');
			        }else{
			            _newzs.push(_cs.join(' '));
			        }
			        if(end && _cs.length == _n){
			            _newzs.push('');
			        }
			    }else {
			        if (_cs.length == _n) {
			            for (var j = 0; j < _cs.length; j++) {
			                var _code = parseInt(_cs[j]);
			                if (_code > 0 && _code < 12){
			                    if(_code < 10){
			                        _cs[j] = '0'+ _code;
			                    }
			                }
			            }
			            _newzs.push(_cs.join(' '));
			        }
			    }
			}
			
			if(!isDel){	//如果用户是按的删除键，就不将当前的玩法值设置进输入框中了
				jQ.val(_newzs.join(','));
			}
			//检查是否正确
			for(var i = 0; i < _zs.length; i++){
				if(!_zs[i]){
					continue;
				}
			    var _cs = _zs[i].split(' ');
			    if(_cs.length != 0 && _cs.length != _n){
			        return '每注号码长度为'+_n+'！';
			    }
			    for (var j = 0; j < _cs.length; j++) {
			        var _code = parseInt(_cs[j]);
			        for(var k = j-1; k >= 0; k--){
			            if(_code == parseInt(_cs[k])){
			                return '每注不能有重复号码！';
			            }
			        }
			        if (_code < 1 || _code > 11){
			            return '号码必须是1至11！';
			        }
			    }
			}
			
			if($('#positioninfo').length){
				var value = parseInt($('#positioninfo').html());
				if(value > 0){
					return value*(_newzs.length - 1);
				}
			}
			
			return _newzs.length - 1;
		}
		,
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
			type : '',
			code_list : [],
			template : '',
			algo : null,
			param : null,
			detail : null,
			isRbtn : true,
			isQing : true,
			isShuang : true,
			isDan : true,
			isXiao : true,
			isDa : true,
			isQuan : true,
			isPosition : false,
			isOpposite : false,
			fRegular: /,{1}/g,
			isDoubleCode: true
		};
		
		var _playType = _playObj['ruleFun'];
		switch (_playType) {
		
		//前二
		case 'gd11x5Q2': // 前二直选
			_conf['type'] = 'digital';
			_conf['code_list'] = [ [ '个位', '01|02|03|04|05|06|07|08|09|10|11' ],
					[ '十位', '01|02|03|04|05|06|07|08|09|10|11' ]];
			_conf['isOpposite'] = false;
			break;
		case 'gd11x5Q2z': // 前二组选
			_conf['type'] = 'digital';
			_conf['code_list'] = [ [ '选择', '01|02|03|04|05|06|07|08|09|10|11' ] ];
			break;	
				
		//前三
		case 'gd11x5Q3': // 前三直选
			_conf['type'] = 'digital';
			_conf['code_list'] = [ [ '个位', '01|02|03|04|05|06|07|08|09|10|11' ],
					[ '十位', '01|02|03|04|05|06|07|08|09|10|11' ],
					[ '百位', '01|02|03|04|05|06|07|08|09|10|11' ]];
			_conf['isOpposite'] = false;
			break;		
		case 'gd11x5Q3z': // 前三组选
			_conf['type'] = 'digital';
			_conf['code_list'] = [ [ '选择', '01|02|03|04|05|06|07|08|09|10|11' ] ];
			break;
			
		//单式
		case 'rxwfQ2d': // 前二单式	
		case 'rxwfH2d': // 后二单式	
			_conf['type'] = 'input';
			_conf['param'] = [$('#game-input') , 2];
			break;
		case 'rxwfR2d': // 任选二单式	
			_conf['type'] = 'input';
			_conf['isPosition'] = true;
			_conf['param'] = [$('#game-input') , 2, [3,4]];
			break;	
		case '3x_q3ds': // 前三单式
		case 'sxwfH3d': // 后三单式
			_conf['type'] = 'input';
			_conf['param'] = [$('#game-input') , 3];
			break;			
			
		//定位胆
		case 'gd11x5dwd': // 定位胆
			_conf['type'] = 'digital';
			_conf['code_list'] = [ [ '第一位', '01|02|03|04|05|06|07|08|09|10|11' ],
					[ '第二位', '01|02|03|04|05|06|07|08|09|10|11' ],
					[ '第三位', '01|02|03|04|05|06|07|08|09|10|11' ]];
			_conf['isOpposite'] = false;
			break;
		//不定位
		case 'gd11x5bdw': // 不定位
			_conf['type'] = 'digital';
			_conf['code_list'] = [ [ '前三位', '01|02|03|04|05|06|07|08|09|10|11' ] ];
			break;
		//任选复试
		case 'gd11x5R1': // 任选一中一
		case 'gd11x5R2': // 任选二中二	
		case 'gd11x5R3': // 任选三中三	
		case 'gd11x5R4': // 任选四中四
		case 'gd11x5R5': // 任选五中五
		case 'gd11x5R6': // 任选六中五
		case 'gd11x5R7': // 任选七中五
		case 'gd11x5R8': // 任选八中五
			_conf['type'] = 'digital';
			_conf['code_list'] = [ [ '选择', '01|02|03|04|05|06|07|08|09|10|11' ] ];
			break;
		case 'gd11x5R1ds':	
			_conf['type'] = 'input';
			_conf['param'] = [$('#game-input') , 1];
			break;
		case 'gd11x5R2ds':	
			_conf['type'] = 'input';
			_conf['param'] = [$('#game-input') , 2];
			break;	
		case 'gd11x5R3ds':	
			_conf['type'] = 'input';
			_conf['param'] = [$('#game-input') , 3];
			break;	
		case 'gd11x5R4ds':	
			_conf['type'] = 'input';
			_conf['param'] = [$('#game-input') , 4];
			break;		
		case 'gd11x5R5ds':	
			_conf['type'] = 'input';
			_conf['param'] = [$('#game-input') , 5];
			break;
		case 'gd11x5R6ds':	
			_conf['type'] = 'input';
			_conf['param'] = [$('#game-input') , 6];
			break;	
		case 'gd11x5R7ds':	
			_conf['type'] = 'input';
			_conf['param'] = [$('#game-input') , 7];
			break;	
		case 'gd11x5R8ds':	
			_conf['type'] = 'input';
			_conf['param'] = [$('#game-input') , 8];
			break;		
		}
		
		if ('digital' === _conf['type']) {
			_conf['template'] = 'digital-template'; // 采用通用的数字选择型模板
			if (null == _conf['algo']) {
				_conf['algo'] = x11x5.calculate;
				_conf['param'] = [ _conf['code_list'].length, Play.assemble(),  _playType];
			}
		} else if ('input' === _conf['type']) {
			if (null == _conf['algo']) {
				_conf['algo'] = x11x5.DAN;//采用通用的单式算法
			}
			_conf['template'] = 'input-template'; // 采用通用的手动输入型模板
		}
		return _conf;
	}; 
	
})(window);