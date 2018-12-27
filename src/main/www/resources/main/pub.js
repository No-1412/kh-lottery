$(function(){ 
	addPublicTipsHtml() // 添加公共的弹窗
})

//统一弹出框
var systemLayerIndex;
/**
 * 弹出提示
 * @param message 消息
 * @param level 等级:waring-提示 error-错误 succeed-成功
 * @param title 标题
 * @param callFunction 关闭弹窗回调函数
 */
function popTips(message, level, title, callFunction) {
    closeSystemLayer();
    way.set("tips.title", title ? title : '温馨提示');
    $("#tips .pop-text").html(message);
    var tipsObj = $('#tips .pop-title i');
    tipsObj.removeClass();
    tipsObj.addClass('ico-' + (level ? level : 'error'));
    var type = typeof callFunction === 'function';
    var end = null;
    if (type) {
        end = callFunction;
    }

    var contents = $("#tips");
    systemLayerIndex = layer.open({
        type: 1,
        title: false, //不显示标题
        content: contents,
        end: end
    });

    // $("#tips .aar-center .aar-but .confirm")[0].focus();
}
// 关闭弹框
function closeSystemLayer() {
    layer.close(systemLayerIndex);
}
// 添加公共的弹窗html
function addPublicTipsHtml() {
    var len = $("#tips").length;
    for (var i = 0; i < len; i++) {
        $("#tip").remove();
    }
    var html = '<div id="tips" class="aar a-one" style="display:none;">'
        + '<div class="aar-center">'
        + '<div class="aar-title member-title"><span way-data="tips.title"></span><a class="aar-close" onclick="closeSystemLayer();"><i class="demo-icon icon-ios-close-empty member-close"></i></a></div>'
        + '<div class="member-tishik">'
        + '<div class="bd">'
        + '<div class="bd text-center">'
        + '<div class="pop-title">'
        + '<i class="ico-succeed"></i>'
        + '<h4 class="pop-text"></h4>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '<div class="aar-but"><a class="confirm" href="javascript:;" onclick="closeSystemLayer();">确认</a></div>'
        + '</div>'
        + '</div>';
    $("body").append(html);
    loadCss('./css/tips.css');
}

/**
 * 动态加载css文件
 */
function loadCss(filepath) {
    if (!filepath) {
        return;
    }
    var tipscss = false;
    var links = document.getElementsByTagName('head')[0].getElementsByTagName('link');
    for (var i = 0; i < links.length; i++) {
        var linksAttr = links[i].getAttribute('href');
        if (linksAttr.indexOf(filepath.substring(filepath.lastIndexOf("/") + 1)) != -1) {
            tipscss = true;
            break;
        }
    }
    if (!tipscss) {
        $("<link>").attr({rel: "stylesheet", type: "text/css", href: filepath}).appendTo("head");
    }
}


/**
 * 全局Ajax 响应状态监听
 * 403 登录超时或登录态失效都弹出提示框引导用户到登陆页
 * 
 * @param  {[type]} event          [description]
 * @param  {[type]} jqXHR          [description]
 * @param  {[type]} options){	var resData       [description]
 * @return {[type]}                [description]
 */
$(document).ajaxComplete( function(event, jqXHR, options){
	var resData = null;
    try{
      resData = JSON.parse(jqXHR.responseText);
    }catch(e){
    }
    if( (resData && resData.retcode && resData.retcode == 403)){
    	popTips('登录已超时或该账号已在其他终端登录，请重新登录！','error',"温馨提示",function(){location.href  = "/";});
    }
    if(!isNaN(jqXHR.status)){
    	var _status = +jqXHR.status;
    	if(_status >= 500 && _status < 600 ){ 
    		popTips('【'+jqXHR.status+'】'+'服务器错误，请稍后重试','error');
    	}else if(_status == 400 || _status == 405){ 
    		popTips('【'+jqXHR.status+'】'+'服务器无法理解此请求','error');
    	}
    }
});
