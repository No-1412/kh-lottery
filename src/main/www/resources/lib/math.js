	/**
	 * Created by GusonYang on 1/28/15.
	 */
  function each(arr,f) {
		f = f || Function.K;
		var b = [];
		var c = Array.prototype.slice.call(arguments, 1);
		for (var e = 0; e < arr.length; e++) {
			var d = f.apply(arr, [arr[e], e].concat(c));
			if (d != null) {
				b.push(d)
			}
		}
		return b
	}
	
	function uniquelize(arr) {
		var b = new Array();
		for (var a = 0; a < arr.length; a++) {
			if (!contains(b,arr[a])) {
				b.push(arr[a])
			}
		}
		return b
	};
   
	function complement(d, c) {
		return minus(union(d, c), intersect(d, c))
	};
	
	function intersect(d, c) {
		return each(uniquelize(d),function(a) {
			return contains(c,a) ? a : null
		})
	};
    
	function minus(d, c) {
		return each(uniquelize(d),function(a) {
			return contains(c,a) ? null : a
		})
	};
	
	function union(d, c) {
		return uniquelize(d.concat(c))
	};
	
	 function contains(arr,b) {
		for (var a = 0; a < arr.length; a++) {
			if (arr[a] == b) {
				return true
			}
		}
		return false
	};

	
/**
 * Created by GusonYang on 1/28/15.
 */
Math.MoveStr = function (a){
	var h = "";
	var k = "01";
	var b = "";
	var f = "";
	var j = "";
	var g = false;
	var c = false;
	for (var e = 0; e < a.length; e++) {
		if (g == false) {
			h += a.substr(e, 1)
		}
		if (g == false && a.substr(e, 1) == "1") {
			c = true
		} else {
			if (g == false && c == true && a.substr(e, 1) == "0") {
				g = true
			} else {
				if (g == true) {
					b += a.substr(e, 1)
				}
			}
		}
	}
	h = h.substr(0, h.length - 2);
	for (var d = 0; d < h.length; d++) {
		if (h.substr(d, 1) == "1") {
			f += h.substr(d, 1)
		} else {
			if (h.substr(d, 1) == "0") {
				j += h.substr(d, 1)
			}
		}
	}
	h = f + j;
	return h + k + b
};


/**
 * @description 排列总数
 * @param {Int}
 *            n 总数
 * @param {Int}
 *            m 组合位数
 * 
 * @return {Int}
 * @example Math.C(6,5);
 * 
 */
Math.C = function (n, m){
	var n1 = 1, n2 = 1;
	for (var i = n, j = 1; j <= m; n1 *= i--, n2 *= j++) {
	}
	return n1 / n2;
};

/**
 * @description 组合总数
 * @param {Int}
 *            n 总数
 * @param {Int}
 *            m 组合位数
 * 
 * @return {Int}
 * @example Math.P(5,3); 60
 * 
 */
Math.P = function (n, m){
	var n1 = 1, n2 = 1;
	for (var i = n, j = 1; j <= m; n1 *= i--, n2 *= j++) {
	}
	return n1;
};

/**
 * @description 枚举数组算法
 * @param {Int}
 *            n 数组长度
 * @param {Int|Array}
 *            m 枚举位数
 * 
 * @return {Int}
 * @example Math.Cs(4,3); [[1,2,3],[1,2,4],[1,3,4],[2,3,4]]
 * 
 */
Math.Cs = function (len, num){
	var arr = [];
	if (typeof (len) == 'number') {
		for (var i = 0; i < len; i++) {
			arr.push(i + 1);
		}
	} else {
		arr = len;
	}
	var r = [];
	(function f(t, a, n) {
		if (n == 0)
			return r.push(t);
		for (var i = 0, l = a.length; i <= l - n; i++) {
			f(t.concat(a[i]), a.slice(i + 1), n - 1);
		}
	})([], arr, num);
	return r;
};


Math.NewN1 = function(codes, len){
	var arr = [];
	function cb(codes, code, idx){
		var codeArr = codes[idx];
		idx++;
		if(!codeArr || codeArr.length == 0) return;
		
		for(var i = 0; i < codeArr.length; i++){
			var newCode;
			if(!code){
				newCode = codeArr[i];
			}else{
				if(code.indexOf(codeArr[i]) != -1){
					continue;
				}
				newCode = code+' '+codeArr[i];
			}
			if(idx == len){
				arr.push(newCode);
			}
			cb(codes, newCode, idx);
		}
	}
	cb(codes, false, 0);
	return arr.length;
}

Math.DWD = function(codes){
    var index = 0;
	for(var i=0;i<codes.length;i++)
	{
		index += codes[i].length;
	} 
	return index;
}

/**
 * @description 获取竞彩N串1注数
 * @param {Array}
 *            spArr [2,2,1] 每一场选中的个数
 * @param {Int}
 *            n n串1
 * 
 * @return {Int}
 * @example Math.N1([2,2,1],3);
 * 
 */
Math.N1 = function (spArr, n){
	var zhushu = 0;
	var m = spArr.length; // 场次
	var arr = Math.Cs(m, n);
	for (var i = 0; i < arr.length; i++) {
		var iTotal = 1; // 每场注数
		for (var j = 0; j < arr[i].length; j++) {
			iTotal *= spArr[arr[i][j] - 1]
		}
		zhushu += iTotal
	}
	return zhushu;
};

/**
 * @description 获取竞彩N串1胆拖注数
 * @param {Array}
 *            spArrd [[3,3,3,1,2],[1,1,1,1,0]] 选中5场，4场胆拖
 * @param {Int}
 *            n n串1
 * 
 * @return {Int}
 * @example Math.N1d([[3,3,3,1,2],[1,1,1,1,0]],5); 选中5场，4场胆拖，5串1玩法 return 54
 * @example Math.N1d([[3,3,3,1,2],[1,0,0,0,0]],3); 选中5场，1场胆拖，3串1玩法 return 87
 * 
 */
Math.N1d = function (spArrd, n){
	var nArr = [], dArr = [];
	try {
		for (var i = 0; i < spArrd[1].length; i++) {
			if (spArrd[1][i] == 1) {
				dArr.push(spArrd[0][i]);
			} else {
				nArr.push(spArrd[0][i]);
			}
		}
	} catch (e) {
		return 0;
	}
	if (dArr.length <= n) {
		return Math.N1(nArr, n - dArr.length) * Math.N1(dArr, dArr.length);
	} else {
		return 0;
	}
};

/**
 * 根据数字选择和位数判断，得出注数
 * @param c
 * @param b
 * @returns
 */
Math.Com = function (c,b){
	b = parseInt(b);
	c = parseInt(c);
	if (b < 0 || c < 0) {
		return false
	}
	if (b == 0 || c == 0) {
		return 1
	}
	if (b > c) {
		return 0
	}
	if (b > c / 2) {
		b = c - b
	}
	var a = 0;
	for (i = c; i >= (c - b + 1); i--) {
		a += Math.log(i)
	}
	for (i = b; i >= 1; i--) {
		a -= Math.log(i)
	}
	a = Math.exp(a);
	return Math.round(a)
}; 
