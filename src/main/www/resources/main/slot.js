/**
 * 平台切换
 * @param platformCode 平台代码
 */
function initPlatform(platformCode) {
	$('#gameTypes').empty();
	$('.img-item').empty();
	$('.paging').empty();
	
	var gamesHtml = "";
	if(platformCode == 'collect') {
		// 设置游戏平台，以供搜索游戏使用
		$("#platformCode").val("collect");
		initCollectGame('', 1);
		return;
	} else if(platformCode == '0002') {
		$("#platformCode").val("0002");
		
		gamesHtml += '<li class="remen cur"><i class="rm"></i><p onclick="initList(1,24,\'\',\''+platformCode+'\',1,\'\',\'\',0);">热门</p></li>'
		gamesHtml += '<li class="sppk"><i class="sp"></i><p onclick="initList(1,24,\'01\',\''+platformCode+'\',null,\'\',\'\',1);">视频扑克</p></li>'
		gamesHtml += '<li class="zhy"><i class="zy"></i><p onclick="initList(1,24,\'02\',\''+platformCode+'\',null,\'\',\'\',2);">桌游</p></li>'
		gamesHtml += '<li class="lhj"><i class="lh"></i><p onclick="initList(1,24,\'03\',\''+platformCode+'\',null,\'\',\'\',3);">老虎机</p></li>'
		gamesHtml += '<li class="ggk"><i class="gg"></i><p onclick="initList(1,24,\'04\',\''+platformCode+'\',null,\'\',\'\',4);">刮刮卡</p></li>'
		gamesHtml += '<li class="xcyx"><i class="xc"></i><p onclick="initList(1,24,\'05\',\''+platformCode+'\',null,\'\',\'\',5);">现场游戏</p></li>'
		gamesHtml += '<li class="jjyx"><i class="jj"></i><p onclick="initList(1,24,\'06\',\''+platformCode+'\',null,\'\',\'\',6);">街机游戏</p></li>';

		gamesHtml += '<li class="azlhjxz"><i class="lhjxz"></i><a href="http://m.ld176888.com/download.html" target="_blank">安卓老虎机下载</a></li>';
		gamesHtml += '<li class="azzrxz"><i class="zrxz"></i><a href="http://m.ld176888.com/live/download.html" target="_blank">安卓真人下载</a></li>';

	} else if(platformCode == '0006') {
		$("#platformCode").val("0006");

		gamesHtml += '<li class="remen cur"><i class="rm"></i><p onclick="initList(1,24,\'\',\''+platformCode+'\',1,\'\',\'\',0);">热门</p></li>'
		gamesHtml += '<li class="sppk"><i class="sp"></i><p onclick="initList(1,24,\'01\',\''+platformCode+'\',null,\'\',\'\',1);">老虎机</p></li>'
		gamesHtml += '<li class="zhy"><i class="zy"></i><p onclick="initList(1,24,\'02\',\''+platformCode+'\',null,\'\',\'\',2);">刮刮卡</p></li>'
		gamesHtml += '<li class="lhj"><i class="lh"></i><p onclick="initList(1,24,\'03\',\''+platformCode+'\',null,\'\',\'\',3);">狙击枪</p></li>'
		gamesHtml += '<li class="ggk"><i class="gg"></i><p onclick="initList(1,24,\'04\',\''+platformCode+'\',null,\'\',\'\',4);">球桌</p></li>'
		gamesHtml += '<li class="xcyx"><i class="xc"></i><p onclick="initList(1,24,\'05\',\''+platformCode+'\',null,\'\',\'\',5);">扑克</p></li>'
		gamesHtml += '<li class="jjyx"><i class="jj"></i><p onclick="initList(1,24,\'06\',\''+platformCode+'\',null,\'\',\'\',6);">休闲游戏</p></li>';
	} else if(platformCode == '0007') {
		$("#platformCode").val("0007");

		gamesHtml += '<li class="remen cur"><i class="rm"></i><p onclick="initList(1,24,\'\',\''+platformCode+'\',1,\'\',\'\',0);">热门</p></li>'
		gamesHtml += '<li class="sppk"><i class="sp"></i><p onclick="initList(1,24,\'01\',\''+platformCode+'\',null,\'\',\'\',1);">老虎机</p></li>'
		gamesHtml += '<li class="zhy"><i class="zy"></i><p onclick="initList(1,24,\'02\',\''+platformCode+'\',null,\'\',\'\',2);">扑克</p></li>';

	} else if(platformCode == '0004') {
        $("#platformCode").val("0004");
        gamesHtml += '<li class="remen cur"><a href="javascript:;" onclick="initList(1,20,\'\',\''+platformCode+'\',1,\'\',\'\',0);">热门</a></li>';
        gamesHtml += '<li class="sppk"><a href="javascript:;" onclick="initList(1,20,\'\',\''+platformCode+'\',0,\'\',\'\',0);">AG</a></li>';
    } else if(platformCode == '0003'){
        $("#platformCode").val("0003");
        gamesHtml += '<li class="cur"><a href="javascript:;" onclick="initList(1,20,\'\',\''+platformCode+'\',1,\'\',\'\',0);">热门</a></li>';
        gamesHtml += '<li class=""><a href="javascript:;" onclick="initList(1,20,\'\',\''+platformCode+'\',\'\',\'\',\'\',1);">全部</a></li>';

    } else {
		$("#platformCode").val("");

		gamesHtml += '<li class="remen cur"><i class="rm"></i><p onclick="initList(1,24,\'\',\'\',1,\'\',\'\',0);">热门</p></li>'
		gamesHtml += '<li class="sppk"><i class="sp"></i><p onclick="initList(1,24,\'\',\'\',null,\'视频扑克\',\'\',1);">视频扑克</p></li>'
		gamesHtml += '<li class="zhy"><i class="zy"></i><p onclick="initList(1,24,\'\',\'\',null,\'桌游\',\'\',2);">桌游</p></li>'
		gamesHtml += '<li class="lhj"><i class="lh"></i><p onclick="initList(1,24,\'\',\'\',null,\'老虎机\',\'\',3);">老虎机</p></li>'
		gamesHtml += '<li class="ggk"><i class="gg"></i><p onclick="initList(1,24,\'\',\'\',null,\'刮刮卡\',\'\',4);">刮刮卡</p></li>'
		gamesHtml += '<li class="xcyx"><i class="xc"></i><p onclick="initList(1,24,\'\',\'\',null,\'现场游戏\',\'\',5);">现场游戏</p></li>'
		gamesHtml += '<li class="jjyx"><i class="jj"></i><p onclick="initList(1,24,\'\',\'\',null,\'街机游戏\',\'\',6);">街机游戏</p></li>';

	}
	$('#gameTypes').html(gamesHtml);
	initList(1, 24, '', platformCode, 1, '', '', 0);
}

/**
 * 初使化游戏列表
 * @param jqueryGridPage	查询页码
 * @param jqueryGridRows	每页显示记录数
 * @param gameType			游戏类型
 * @param platformCode		平台代码
 * @param isRecommend		是否为推荐 0-否 1-是 为空不限制
 * @param gameTypeCn		游戏类型名称
 * @param gameName			游戏名称（模糊查询）
 * @param liIndex			当前菜单li标签在ul标签中的下标
 */
function initList(jqueryGridPage, jqueryGridRows, gameType, platformCode, isRecommend, gameTypeCn, gameName, liIndex){
	// 改变菜单样式
	$('#gameTypes').children().removeClass('cur');
	$('#gameTypes').children().eq(liIndex).addClass('cur');
	
	if(!platformCode) {
		platformCode = "";
	}
	// 设置游戏类型 或 游戏类型名称，搜索游戏时调用
	if(platformCode == 'collect') {
		$("#gameType").val("");
	} else if(platformCode == '0002' || platformCode == '0006' || platformCode == '0007') {
		$("#gameType").val(gameType);
	} else {
		$("#gameType").val(gameTypeCn);
	}
	
	queryGame(jqueryGridPage, jqueryGridRows, gameType, platformCode, isRecommend, gameTypeCn, gameName);
}

/**
 * 查询游戏列表
 * @param jqueryGridPage	查询页码
 * @param jqueryGridRows	每页显示记录数
 * @param gameType			游戏类型
 * @param platformCode		平台代码
 * @param isRecommend		是否为推荐 0-否 1-是 为空不限制
 * @param gameTypeCn		游戏类型名称
 * @param gameName			游戏名称（模糊查询）
 */
function queryGame(jqueryGridPage, jqueryGridRows, gameTypeCode, platformCode, isRecommend, gameTypeCn, gameName){
    $.ajax({
        type: "post",
        url: "/ct-data/baccarat/slot/query",
        data: {
            "jqueryGridPage" : jqueryGridPage,
            "jqueryGridRows" : jqueryGridRows,
            "gameTypeCode" : gameTypeCode,
            "platformCode" : platformCode,
            "isRecommend" : isRecommend,
            "gameTypeCn" : gameTypeCn,
            "gameName" : gameName,
            "isDisable": 0
        },
        datatype: "json",
        success:function(data) {
            if(data) {
                var page = data.page;// 当前页
                var total = data.total;// 总页数
                var records = data.records;// 总记录数
                var d = data.root;// 总页面数据

                $(".add-more").hide();// 先隐藏加载更多按钮
                var thisPanel = $(".img-item");
                if(jqueryGridPage == 1) {// 如果是第一页，先清空，否则在后面继续追加
                    thisPanel.empty();
                }
                var html = '';
                $.each(d, function(idx, val) {
                    var imgUrl = '/resources/main/yiyou/';
                    if (val.platformName == 'PT') {
                        imgUrl += 'ptimg/' + val.buttonImageName + '.jpg';
                    } else if(val.platformName == 'MG') {
                        imgUrl += 'mgimg/' + val.buttonImageName + '.png';
                    } else if(val.platformName == 'KBET') {
                        imgUrl += 'kbetimg/' + val.buttonImageName + '.png';
                    } else if(val.platformName == 'AG'){
                        imgUrl += 'agimg/' + val.ext1 + '.gif';
					} else if (val.platformName == 'BBIN'){
                        imgUrl += 'bbinimg/' + val.ext1 + '.gif';
                    }

                   /* html += '<li>'
                    html	+= '<img src="' + imgUrl + '">';
                    html	+= '<a class="btn-start"  href="javascript:;" onclick="playGame(\''+val.gameId+'\', \''+val.platformCode+'\');"><img src="../yuncai/images/slot/btn-start.png"/*tpa=http://www.yugj881.com/resources/yuncai/images/slot/btn-start.png*/></a>';
                    if(isInCookies('gamecookie'+val.gameId)) {
                        html	+= '<a class="btn-collect qxsc" href="javascript:;" onclick="collectGame(this,\''+val.gameId+'\',\''+imgUrl+'\',\''+val.gameNameCn+'\', \''+val.platformCode+'\');">';
                        html += '取消';
                    } else {
                        html	+= '<a class="btn-collect tjsc" href="javascript:;" onclick="collectGame(this,\''+val.gameId+'\',\''+imgUrl+'\',\''+val.gameNameCn+'\', \''+val.platformCode+'\');">';
                        html += '收藏';
                    }
                    html	+= '</a><span>' + val.gameNameCn + '</span></li>';*/

                    html += '<li><a href="javascript:;"><div class="jryx"><p onclick="playGame(\''+val.gameId+'\', \''+val.platformCode+'\');">进入游戏</p></div></a><img class="bn" src="'+imgUrl+'">';
                    html += '<p class="xjdz">' + val.gameNameCn + '</p>';
                    if(isInCookies('gamecookie'+val.gameId)) {
                        html += '<i class="icon-3 tjsc" onclick="collectGame(this,\''+val.gameId+'\',\''+imgUrl+'\',\''+val.gameNameCn+'\', \''+val.platformCode+'\');"></i>';
                    } else {
                        html += '<i class="icon-3 qxsc" onclick="collectGame(this,\''+val.gameId+'\',\''+imgUrl+'\',\''+val.gameNameCn+'\', \''+val.platformCode+'\');"></i>';
                    }
                    html += '</li>';

                });
                thisPanel.append(html);
                if(total > 1 && jqueryGridPage < total) {// 如果总页数大于1页，且当前页数小于总页数，则显示加载更多按钮
                    $(".add-more").attr("onclick", "queryGame("+(jqueryGridPage + 1)+", "+jqueryGridRows+", '', '"+platformCode+"', "+isRecommend+", '', '');");
                    $(".add-more").show();
                } else {
                    $(".add-more").removeAttr("onclick");
                    $(".add-more").hide();
                }
            } else {
                popTips('加载失败，请稍后再试', 'error');
                return;
            }
        }
    });

}


/**
 * 查询游戏列表
 * @param jqueryGridPage	查询页码
 * @param jqueryGridRows	每页显示记录数
 * @param gameType			游戏类型
 * @param platformCode		平台代码
 * @param isRecommend		是否为推荐 0-否 1-是 为空不限制
 * @param gameTypeCn		游戏类型名称
 * @param gameName			游戏名称（模糊查询）
 */
/*function queryGame(jqueryGridPage, jqueryGridRows, gameTypeCode, platformCode, isRecommend, gameTypeCn, gameName){
	var pagination = $.pagination({
		render: '.paging',
		pageSize: jqueryGridRows,
		pageLength: 7,
		ajaxType: 'post',
		hideInfos: true,
		hideGo: true,
		ajaxUrl: '/ct-data/baccarat/slot/query',
		ajaxData: {
			"jqueryGridPage" : jqueryGridPage,
			"jqueryGridRows" : jqueryGridRows,
			"gameTypeCode" : gameTypeCode,
			"platformCode" : platformCode,
			"isRecommend" : isRecommend,
			"gameTypeCn" : gameTypeCn,
			"gameName" : gameName
		},
		beforeSend: function() {
		},
		complete: function() {
		},
		success:function(data) {
			var thisPanel = $(".img-item");
			thisPanel.empty();
			var html = '';
			$.each(data, function(idx, val) {
				var imgUrl = '/resources/main/yiyou/';
				if (val.platformName == 'PT') {
					imgUrl += 'ptimg/' + val.buttonImageName + '.jpg';
				} else if(val.platformName == 'MG') {
					imgUrl += 'mgimg/' + val.buttonImageName + '.png';
				} else if(val.platformName == 'KBET') {
					imgUrl += 'kbetimg/' + val.buttonImageName + '.png';
				}
				/!*html += '<li><div><img src="' + imgUrl + '" height="219" width="188" alt=""></div>';
				html += '<div class="jryx">';
				html += '<a class="jr" href="javascript:;" onclick="playGame(\''+val.gameId+'\', \''+val.platformCode+'\');">进入游戏</a>';
				html += '<a href="javascript:;" onclick="collectGame(this,\''+val.gameId+'\',\''+imgUrl+'\',\''+val.gameNameCn+'\', \''+val.platformCode+'\');">';
				if(isInCookies('gamecookie'+val.gameId)) {
					html += '取消收藏';
				} else {
					html += '添加收藏';
				}
				html += '</a></div>';
				html += '<span>' + val.gameNameCn + '</span></li>';*!/

				html += '<li><a href="javascript:;"><div class="jryx"><p onclick="playGame(\''+val.gameId+'\', \''+val.platformCode+'\');">进入游戏</p></div></a><img class="bn" src="'+imgUrl+'">';
				html += '<p class="xjdz">' + val.gameNameCn + '<i class="icon-3" onclick="collectGame(this,\''+val.gameId+'\',\''+imgUrl+'\',\''+val.gameNameCn+'\', \''+val.platformCode+'\');"></i></p>';
				html += '</li>';

			});
			thisPanel.append(html);
		},
		pageError: function(response) {
		},
		emptyData: function() {
			$('.img-item').empty();
			$('.paging').empty();
		}
	});
	pagination.init();
}*/


/**
 * 添加/取消收藏游戏
 * 保存至cookie中
 * @param thisATag 当前对象
 * @param gameId 游戏ID
 * @param imgUrl 游戏图片路径
 * @param gameNameCn 游戏名称
 * @param platformCode 平台代码
 */
function collectGame(thisATag, gameId, imgUrl, gameNameCn, platformCode) {
    if(isInCookies('gamecookie'+gameId)) {
        delCookie('gamecookie'+gameId);
        //thisATag.innerHTML="收藏";
        $(thisATag).removeClass("tjsc").addClass("qxsc");
    } else {
        // 保存的cookie name增加'gamecookie'前缀
        setCookie('gamecookie'+gameId, imgUrl+'_platformcode_'+platformCode+'_separator_'+gameNameCn, 365);
        ///thisATag.innerHTML="取消";
        $(thisATag).removeClass("qxsc").addClass("tjsc");
    }
}

/*
/!**
 * 添加/取消收藏游戏
 * 保存至cookie中
 * @param thisATag 当前对象
 * @param gameId 游戏ID
 * @param imgUrl 游戏图片路径
 * @param gameNameCn 游戏名称
 * @param platformCode 平台代码
 *!/
function collectGame(thisATag, gameId, imgUrl, gameNameCn, platformCode) {
	if(isInCookies('gamecookie'+gameId)) {
		delCookie('gamecookie'+gameId);
		thisATag.innerHTML="添加收藏";
	} else {
		// 保存的cookie name增加'gamecookie'前缀
		setCookie('gamecookie'+gameId, imgUrl+'_platformcode_'+platformCode+'_separator_'+gameNameCn, 365);
		thisATag.innerHTML="取消收藏";
	}
}*/

/**
 * 在收藏界面 取消收藏，刷新收藏的游戏列表
 * @param gameId 游戏ID
 * @param page 当前页
 */
function deleteCollectGame(gameId, page) {
	delCookie('gamecookie'+gameId);
	initCollectGame('', page);
}

/**
 * 判断当前游戏是否已保存在Cookies中
 * @param gameId 游戏ID
 * @returns 
 */
function isInCookies(cookieId){
	var cookieStr = document.cookie;
	if(cookieStr && cookieStr.length>0) {
		if(cookieStr.indexOf(cookieId) >= 0) {
			return true;
		}
	}
	
	return false;
}

/**
 * 查询收藏的游戏
 * @param name 游戏名称(模糊查询)
 * @param page 第几页
 */
function initCollectGame(name, page) {
    $(".add-more").hide();
    if(page == 1) {
        $(".img-item").empty();
    }
    var list = getAllCollectGame(name);

    // 每页显示游戏数
    var size = 24;
    // 总行数
    var totalCount = list.length;
    if(totalCount < 1) {
        return;
    }
    // 总页数
    var pageCount = Math.ceil(totalCount/size);
    if(!page || page<1) {
        page = 1;
    } else if(page>pageCount) {
        page = pageCount;
    }

    var startGameIndex = (page-1)*size;
    var endGameIndex = startGameIndex + size;
    if(endGameIndex > totalCount) {
        endGameIndex = totalCount;
    }

    // 得到当前页游戏列表
    var html = "";
    for(var i=startGameIndex; i<endGameIndex; i++){
/*
        html += '<li>'
        html	+= '<img src="' + list[i].imgUrl + '">';
        html	+= '<a class="btn-start"  href="javascript:;" onclick="playGame(\''+list[i].gameId+'\', \''+list[i].platformCode+'\');"><img src="../yuncai/images/slot/btn-start.png"/*tpa=http://www.yugj881.com/resources/yuncai/images/slot/btn-start.png*/></a>';
        html	+= '<a class="btn-collect qxsc" href="javascript:;" onclick="deleteCollectGame(\''+list[i].gameId+'\','+page+');">';
        html += '取消';
        html	+= '</a><span>' + list[i].gameNameCn + '</span></li>';*/

        html += '<li><a href="javascript:;"><div class="jryx"><p onclick="playGame(\''+list[i].gameId+'\', \''+list[i].platformCode+'\');">进入游戏</p></div></a><img class="bn" src="'+list[i].imgUrl+'">';
        html += '<p class="xjdz">' + list[i].gameNameCn + '</p>';
        html += '<i class="icon-3 tjsc" onclick="deleteCollectGame(\''+list[i].gameId+'\','+page+');"></i>';
        html += '</li>';

    }
    $(".img-item").append(html);

    if(pageCount > 1 && page < pageCount) {// 如果总页数大于1页，且当前页数小于总页数，则显示加载更多按钮
        /*$(".add-more").click(function() {
         initCollectGame(name, page + 1);
         });*/
        $(".add-more").attr("onclick", "initCollectGame('"+name+"', "+(page + 1)+")");
        $(".add-more").show();
    } else {
        $(".add-more").removeAttr("onclick");
        $(".add-more").hide();
    }

}


/*/!**
 * 查询收藏的游戏
 * @param name 游戏名称(模糊查询)
 * @param page 第几页
 *!/
function initCollectGame(name, page) {
	$(".img-item").empty();
	$('.paging').empty();
	var list = getAllCollectGame(name);
	
	// 每页显示游戏数
	var size = 20;
	// 总行数
	var totalCount = list.length;
	if(totalCount < 1) {
		return;
	}
	// 总页数
	var pageCount = Math.ceil(totalCount/size);
	if(!page || page<1) {
		page = 1;
	} else if(page>pageCount) {
		page = pageCount;
	}
	
	var startGameIndex = (page-1)*size;
	var endGameIndex = startGameIndex + size;
	if(endGameIndex > totalCount) {
		endGameIndex = totalCount;
	}
	
	// 得到当前页游戏列表
	var html = "";
	for(var i=startGameIndex; i<endGameIndex; i++){
		html += '<li><div><img src="' + list[i].imgUrl + '" height="219" width="188" alt=""></div>';
		html += '<div class="jryx">';
		html += '<a class="jr" href="javascript:;" onclick="playGame(\''+list[i].gameId+'\', \''+list[i].platformcode+'\');">进入游戏</a>';
		html += '<a href="javascript:;" onclick="';
		html += 'deleteCollectGame(\''+list[i].gameId+'\','+page+');">取消收藏</a></div>';
		html += '<span>' + list[i].gameNameCn + '</span></li>';
	}
	$(".img-item").html(html);
	
	// 更新分页
	var pagination = $('<ul>');
	var pages = $('<div class="pages">');
	pages.append($('<li>').html($('<a class="prev">').html("上一页")));
	var topPage = $('<li>').html($('<a class="top">').html(1));
	if(page == 1) {
		topPage.addClass('cur');
	}
	pages.append(topPage);
	
	var pageLength = 7;
	if(pageCount < pageLength) {
		pageLength = pageCount;
	}
	if(pageCount > 2){
		var startPage = page - (Math.ceil(pageLength/2) - 1);
		var endPage = page + Math.floor(pageLength/2);
		if(startPage < 1) {
			startPage = 1;
			endPage = pageLength;
		}else if(endPage > pageCount) {
			startPage = pageCount - pageLength + 1;
			endPage = pageCount;
		}
		if(startPage == 1) {
			startPage = 2;
		} else if(startPage > 2) {
			pages.append($('<li>').html('...'));
		}
		if(endPage == pageCount) {
			endPage--;
		}
		for (i = startPage; i <= endPage; i++) {
			var thisPage = $('<li>').html($('<a class="page">').html(i));
			if(i == page) {
				thisPage.addClass('cur');
			}
			pages.append(thisPage);
		}
		if(endPage < pageCount-1) {
			pages.append($('<li>').html('...'));
		}
	}
	if(pageCount >= 2) {
		var endPages = $('<li>').html($('<a class="end">').html(pageCount));
		if(page == pageCount) {
			endPages.addClass('cur');
		}
		pages.append(endPages);
	}
	pages.append($('<li>').html($('<a class="next">').html("下一页")));
	pages.find('.page').click(function() {
		var idx = $(this).html();
		idx = parseInt(idx);
		if(idx != page) {
			page = idx;
			initCollectGame('', page);
		}
	});
	pages.find('.top').click(function() {
		if(page > 1) {
			page = 1;
			initCollectGame('', page);
		}
	});
	pages.find('.prev').click(function() {
		if(page > 1) {
			page--;
			initCollectGame('', page);
		}
	});
	pages.find('.end').click(function() {
		if(page < pageCount) {
			page = pageCount;
			initCollectGame('', page);
		}
	});
	pages.find('.next').click(function() {
		if(page < pageCount) {
			page++;
			initCollectGame('', page);
		}
	});
	pagination.append(pages);
	$('.paging').html(pagination);
}*/

/**
 * 从Cookies中取出所有收藏的游戏ID和图片路径，并保存在数组中返回
 * 数组保存方式：key=游戏ID，value=图片路径
 * @param name 游戏名称(模糊查询),查询所有游戏请设置空字符串('')
 */
function getAllCollectGame(name) {
	var cookieStr = document.cookie;
	var list = [];
	if(cookieStr && cookieStr.length>0) {
		while(true) {
			var startIndex = cookieStr.indexOf('gamecookie');
			if(startIndex < 0) {
				break;
			}
			// 去掉cookieStr gamecookie之前的内容
			cookieStr = cookieStr.substr(startIndex);
			var cookieName = cookieStr.substring(0, cookieStr.indexOf('='));
			var game = {};
			game.gameId = cookieName.substr(10); // 去掉前缀gamecookie, 得到gameId
			var value = getCookie(cookieName);
			
			var indexOfPlatformcode = value.indexOf('_platformcode_');
			var indexOfSeparator = value.indexOf('_separator_');
			
			game.imgUrl = value.substring(0, indexOfPlatformcode);
			game.platformcode = value.substring(indexOfPlatformcode+14, indexOfSeparator);
			game.gameNameCn = value.substr(indexOfSeparator + 11);
			if(!name || name==='' || game.gameNameCn.indexOf(name)>=0) {
				list.push(game);
			}
			// 去掉cookieStr的 gamecookie字符串，进入下一次循环
			cookieStr = cookieStr.substr(10);
		}
	}
	return list;
}

/**
 * 搜索游戏
 */
function searchGameByName() {
	var jqueryGridPage = 1;
	var jqueryGridRows = 24;
	var gameType = $("#gameType").val();
	var platformCode = $("#platformCode").val();
	var isRecommend = null;
	var gameTypeCn = '';
	var gameName = way.get("searchGameName");
	
	if(!platformCode) {
		platformCode = "";
	}
	if(!(gameType && gameType.length>0)) {
		isRecommend = 1;
	}
	if(platformCode == 'collect') {
		initCollectGame(gameName, 1);
		return;
	} else if(platformCode == '0002' || platformCode == '0006' || platformCode == '0007') {
		
	} else {
		gameTypeCn = gameType;
		gameType = '';
	}
	
	queryGame(jqueryGridPage, jqueryGridRows, gameType, platformCode, isRecommend, gameTypeCn, gameName);
}

/**
 * 搜索输入框按键监听
 * @param e 事件对象
 */
function searchGameEnter(e) {
	if(e.keyCode == 13) {
		searchGameByName();
		if(window.event) {
			window.event.returnValue=false;
		} else {
			e.preventDefault();
		}
	}
}

$(function(){
	initPlatform('');
});