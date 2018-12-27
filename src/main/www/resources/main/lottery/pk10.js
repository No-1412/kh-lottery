;(function(global) {
	//Play.lotteryPageInit();
	global.pk10 = {
		
		calculate : function(len, codes, playType) {
			
			var amount = 0;
			switch (playType) {
			//猜冠军
			case 'kjq1': // 猜冠军
				amount = codes[0].length;
				break;
			//定位胆选	
			case 'dwd10x': // 定位胆选	
				var count = 0;
				for(var i = 0; i < 10; i++){
					count += codes[i].length;
				}
				amount = count;
				break;
			//猜冠亚军	
			case 'kjq2': // 猜冠亚军
				amount = Math.NewN1(codes, 2);	
				//amount = Math.N1([codes[0].length, [codes[1].length]], 2);
				break;	
			}
			return amount;
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
			isOpposite : false
		};
		
		var _playType = _playObj['ruleFun'];
		switch (_playType) {
		
		//猜冠军
		case 'kjq1': // 猜冠军
			_conf['type'] = 'digital';
			_conf['code_list'] = [[ '冠&nbsp;&nbsp;&nbsp;军', '01|02|03|04|05|06|07|08|09|10' ]];
			break;
			
		//猜冠亚军	
		case 'kjq2': // 猜冠亚军
			_conf['type'] = 'digital';
			_conf['code_list'] = [[ '冠&nbsp;&nbsp;&nbsp;军', '01|02|03|04|05|06|07|08|09|10' ],
			                      [ '亚&nbsp;&nbsp;&nbsp;军', '01|02|03|04|05|06|07|08|09|10' ]];
			_conf['isOpposite'] = false;
			break;	
		
		//定位胆选	
		case 'dwd10x': // 定位胆选
			_conf['type'] = 'digital';
			_conf['code_list'] = [
			                      	[ '冠&nbsp;&nbsp;&nbsp;军', '01|02|03|04|05|06|07|08|09|10' ], 
			                      	[ '亚&nbsp;&nbsp;&nbsp;军', '01|02|03|04|05|06|07|08|09|10' ], 
			                      	[ '季&nbsp;&nbsp;&nbsp;军', '01|02|03|04|05|06|07|08|09|10' ], 
			                      	[ '第四名', '01|02|03|04|05|06|07|08|09|10' ], 
			                      	[ '第五名', '01|02|03|04|05|06|07|08|09|10' ], 
			                      	[ '第六名', '01|02|03|04|05|06|07|08|09|10' ], 
			                      	[ '第七名', '01|02|03|04|05|06|07|08|09|10' ], 
			                      	[ '第八名', '01|02|03|04|05|06|07|08|09|10' ], 
			                      	[ '第九名', '01|02|03|04|05|06|07|08|09|10' ], 
			                      	[ '第十名', '01|02|03|04|05|06|07|08|09|10' ]
			                      ];
			break;		
		}
		if ('digital' === _conf['type']) {
			_conf['template'] = 'digital-template'; // 采用通用的数字选择型模板
			if (null == _conf['algo']) {
				_conf['algo'] = pk10.calculate;
				_conf['param'] = [ _conf['code_list'].length, Play.assemble(),  _playType];
			}
		} else if ('input' === _conf['type']) {
			_conf['template'] = 'input-template'; // 采用通用的手动输入型模板
		}
		return _conf;
	}; 
})(window);