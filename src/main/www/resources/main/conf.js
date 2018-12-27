var util_unique = function(v, reg, digit, itemsort, baohao) {
	if(digit==undefined || digit==null) {
		digit = 1;
	}
	//v = v.replace(/ /g, ',');
	var sszz = new Array();
	var titems = {};
	var titem;
	while((titem = reg.exec(v)) != null) {
		var key = titem[0];
		if(itemsort) {
			if(digit == 1) {
				key = key.match(/./g).sort().join('');
			} else if(digit == 2) {
				key = key.match(/.{2}/g).sort().join(' ');
			} else {
				key = key.match(/./g).sort().join('');
			}
		} else {
			if(digit == 2) {
				key = key.match(/.{2}/g).join(' ');
			}
		}
		if(!titems[key]) {
			if(baohao) {
				// 去除豹子号如222，用户前三 中三 后三 任选三混合组选
				if(!(key.charAt(0) == key.charAt(1) && key.charAt(0) == key.charAt(2) && key.charAt(1) == key.charAt(2))) {
					titems[key] = 1;
					sszz.push(key);
				}
			} else {
				titems[key] = 1;
				sszz.push(key);
			}
		}
	}
	return sszz;
};

var formatBall = function(ball, isPlaces) {
	var context = '';
	if(ball) {
		$.each(ball, function(kk, vv) {
			if (isPlaces == true) {
				switch (vv) {
					case '0':
						vv = '万位';
						break;
					case '1':
						vv = '千位';
						break;
					case '2':
						vv = '百位';
						break;
					case '3':
						vv = '十位';
						break;
					case '4':
						vv = '个位';
						break;
					default:
						;
				}
			}
			if (vv) {
				context = context + vv + ' ';
			}
		});
	}
	return context;
};