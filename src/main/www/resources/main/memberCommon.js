var sf = [
    ["北京市", ["北京市"]],
    ["上海市", ["上海市"]],
    ["天津市", ["天津市"]],
    ["重庆市", ["重庆市", "涪陵市", "万州市"]],
    ["河北省", ["保定市", "沧州市", "承德市", "邯郸市", "衡水市", "廊坊市", "秦皇岛市", "石家庄市", "唐山市", "邢台市", "张家口市"]],
    ["山西省", ["长治市", "大同市", "晋城市", "晋中市", "临汾市", "吕梁市", "朔州市", "太原市", "忻州市", "阳泉市", "运城市"]],
    ["内蒙古自治区", ["阿拉善盟", "巴彦淖尔市", "包头市", "赤峰市", "鄂尔多斯市", "二连浩特市", "呼和浩特市", "呼伦贝尔市", "通辽市", "乌海市", "乌兰察布市", "锡林郭勒盟", "兴安盟"]],
    ["辽宁省", ["鞍山市", "本溪市", "朝阳市", "大连市", "丹东市", "抚顺市", "阜新市", "葫芦岛市", "锦州市", "辽阳市", "盘锦市", "沈阳市", "铁岭市", "营口市"]],
    ["吉林省", ["白城市", "白山市", "长春市", "吉林市", "辽源市", "四平市", "松原市", "通化市", "延边朝鲜族自治州"]],
    ["黑龙江省", ["大庆市", "大兴安岭地区", "哈尔滨市", "鹤岗市", "黑河市", "鸡西市", "佳木斯市", "牡丹江市", "七台河市", "齐齐哈尔市", "双鸭山市", "绥化市", "伊春市"]],
    ["江苏省", ["常州市", "淮安市", "靖江市", "连云港市", "南京市", "南通市", "苏州市", "宿迁市", "泰州市", "无锡市", "徐州市", "盐城市", "扬州市", "镇江市"]],
    ["浙江省", ["杭州市", "湖州市", "嘉兴市", "金华市", "丽水市", "宁波市", "绍兴市", "台州市", "温州市", "舟山市", "衢州市"]],
    ["安徽省", ["安庆市", "蚌埠市", "巢湖市", "池州市", "滁州市", "阜阳市", "合肥市", "淮北市", "淮南市", "黄山市", "六安市", "马鞍山市", "宿州市", "铜陵市", "芜湖市", "宣城市", "亳州市"]],
    ["福建省", ["福州市", "龙岩市", "南平市", "宁德市", "莆田市", "泉州市", "三明市", "厦门市", "漳州市","长乐市"]],
    ["江西省", ["抚州市", "赣州市","吉安市","景德镇市","九江市","南昌市","萍乡市","上饶市","新余市","宜春市","鹰潭市"]],
    ["山东省", ["滨州市", "德州市", "东营市", "菏泽市", "济南市", "济宁市", "莱芜市", "聊城市", "临沂市", "青岛市", "日照市", "寿光市", "泰安市", "威海市", "潍坊市", "烟台市", "枣庄市", "淄博市"]],
    ["河南省", ["安阳市", "鹤壁市", "焦作市", "开封市", "洛阳市", "南阳市", "平顶山市", "三门峡市", "商丘市", "新乡市", "信阳市", "许昌市", "郑州市", "周口市", "驻马店市", "漯河市", "濮阳市","济源市","省直辖县级行政区划"]],
    ["湖北省", ["鄂州市", "恩施土家族苗族自治州", "黄冈市", "黄石市", "荆门市", "荆州市", "潜江市", "神农架林区","天门市","仙桃市","十堰市", "随州市", "武汉市", "咸宁市", "襄樊市", "孝感市", "宜昌市","襄阳市","省直辖县级行政区划"]],
    ["湖南省", ["常德市", "长沙市", "郴州市", "衡阳市", "怀化市", "吉首市", "娄底市", "邵阳市", "湘潭市", "湘西土家族苗族自治州", "益阳市", "永州市", "岳阳市", "张家界市", "株洲市"]],
    ["广东省", ["潮州市", "东莞市", "佛山市", "广州市", "河源市", "惠州市", "江门市", "揭阳市", "茂名市", "梅州市", "清远市", "汕头市", "汕尾市", "韶关市", "深圳市", "顺德市", "阳江市", "云浮市", "湛江市", "肇庆市", "中山市", "珠海市"]],
    ["广西自治区", ["百色市", "北海市", "崇左市", "防城港市", "桂林市", "贵港市", "河池市", "贺州市", "来宾市", "柳州市", "南宁市", "钦州市", "梧州市", "玉林市"]],
    ["海南省", ["海口市", "三亚市","白沙黎族自治县","保亭黎族苗族自治县","昌江黎族自治县","澄迈县","儋州市","定安县","东方市","乐东黎族自治县","临高县","陵水黎族自治县","琼海市","琼中黎族苗族自治县","屯昌县","万宁市", "文昌市","五指山市","省直辖县级行政区划"]],
    ["四川省", ["阿坝藏族羌族自治州", "巴中市", "成都市", "达州市", "德阳市", "甘孜藏族自治州", "广安市", "广元市", "乐山市", "凉山彝族自治州", "眉山市", "绵阳市", "南充市", "内江市", "攀枝花市", "遂宁市", "雅安市", "宜宾市", "资阳市", "自贡市", "泸州市"]],
    ["贵州省", ["安顺市", "毕节市", "贵阳市", "六盘水市", "黔东南苗族侗族自治州", "黔江市", "黔南布依族苗族自治州", "黔南州", "黔西南布依族苗族自治州", "铜仁市", "遵义市"]],
    ["云南省", ["保山市", "楚雄彝族自治州", "大理白族自治州", "德宏傣族景颇族自治州", "迪庆藏族自治州", "红河哈尼族彝族自治州", "昆明市", "丽江市", "临沧市", "怒江傈僳族自治州", "普洱市", "曲靖市", "思茅市", "文山壮族苗族自治州", "西双版纳傣族自治州", "玉溪市", "昭通市"]],
    ["西藏自治区", ["阿里地区", "昌都地区","昌都市", "拉萨市", "林芝地区", "林芝市","那曲地区", "日喀则地区","日喀则市", "山南地区", "樟木口岸","自治区日喀则市"]],
    ["陕西省", ["安康市", "宝鸡市", "汉中市", "商洛市", "铜川市", "渭南市", "西安市", "咸阳市", "延安市", "榆林市"]],
    ["甘肃省", ["白银市", "定西市", "甘南藏族自治州", "嘉峪关市", "金昌市", "酒泉市", "兰州市", "临夏回族自治州", "陇南市", "平凉市", "庆阳市", "天水市", "武威市", "张掖市"]],
    ["宁夏自治区", ["固原市", "石嘴山市", "吴忠市", "银川市", "中卫市"]],
    ["青海省", ["果洛藏族自治州", "海北藏族自治州", "海东市","海东地区", "海南藏族自治州", "海西蒙古族藏族自治州", "黄南藏族自治州", "西宁市", "玉树藏族自治州"]],
    ["新疆自治区", ["阿克苏地区", "阿拉尔市", "阿勒泰地区", "巴音郭楞蒙古自治州", "博尔塔拉蒙古自治州", "昌吉回族自治州", "哈密地区", "和田地区", "喀什地区", "克拉玛依市", "克孜勒苏柯尔克孜自治州", "石河子市", "塔城地区", "图木舒克市", "吐鲁番地区", "吐鲁番市","五家渠市","乌鲁木齐市", "伊犁哈萨克自治州","自治区直辖县级行政区划"]],
    ["香港", ["香港"]],
    ["澳门", ["澳门"]],
    ["台湾省", ["台湾省"]]
];
// 切换省市联动
var changePre = function () {
    var citySel = $("#city"),
        pro = $("#province").val(),
        temp_html = "", // 临时拼接 html
        tmpcity = [];   // 循环中临时保持城市数据
    // 清空数据
    citySel.empty();
    temp_html += '<option value="">请选择</option>';
    // 循环遍历城市数据
    for (var i = 0; i < sf.length; i++) {
        if (pro == sf[i][0].toString()) {
            tmpcity = sf[i][1];
            for (var j = 0; j < tmpcity.length; j++) {
                temp_html += "<option >" + tmpcity[j] + "</option>";
            }
        }
    }
    citySel.append(temp_html);
};

// 切换省市联动-修改
var changePreForUpdate = function () {
    var citySel = $("#city_update"),
        pro = $("#province_update").val(),
        temp_html = "", // 临时拼接 html
        tmpcity = [];   // 循环中临时保持城市数据
    // 清空数据
    citySel.empty();
    temp_html += '<option value="">请选择</option>';
    // 循环遍历城市数据
    for (var i = 0; i < sf.length; i++) {
        if (pro == sf[i][0].toString()) {
            tmpcity = sf[i][1];
            for (var j = 0; j < tmpcity.length; j++) {
                temp_html += "<option >" + tmpcity[j] + "</option>";
            }
        }
    }
    citySel.append(temp_html);
};

//验证是否可以提款
var isUserWithdrawLimit = function () {
    if (way.get('useraccount.balance')) {
        jQuery.ajax({
            url: '/ct-data/userAccount/isUserWithdrawLimit',
            type: 'POST',
            dataType: 'json',
            success: function (data, textStatus, xhr) {
                if (data.sign) {
                    way.set('users.account.withdraw', way.get('useraccount.balance'));
                } else {
                    way.set('users.account.withdraw', '0');
                }
            },
            error: function (xhr, textStatus, errorThrown) {
            }
        });
    } else {
        setTimeout(function () {
            isUserWithdrawLimit();
        }, 100);
    }
};

//显示代理管理
var displayAgentMenuIndex;
function displayAgentMenu() {
    var pathname = window.location.pathname;
    clearTimeout(displayAgentMenuIndex);
//  if (!initUser) {
//      displayAgentMenuIndex = setTimeout(function () {
//          displayAgentMenu();
//      }, 100);
//      return;
//  }

    var html = '';
//  if (user) {
//      if (user.proxy && user.proxy == 1) {
//          html += '<li';
//          if (pathname.indexOf('http://www.yugj881.com/resources/main/memberAgent.html', 0) >= 0) {
//              html += ' class="cur"';
//          }
//          html += '><a href="http://www.yugj881.com/resources/main/memberAgent.html"><i class="icons-agency"></i>代理管理</a></li>';
//
//      }
//  }
//  html += '<li';
//  if (pathname.indexOf('http://www.yugj881.com/resources/main/memberMessage.html', 0) >= 0) {
//      html += ' class="cur"';
//  }
//  html += '><a href="http://www.yugj881.com/resources/main/memberMessage.html"><i class="icons-Message"></i>消息中心</a></li>';
//
//  $(".main .member-nav ul").append(html);
}

// 银行卡信息修改
var updateBankBranch = function (id) {
    var province = $("#province_update").val().trim();
    var city = $("#city_update").val().trim();

    // 07-11 add 开户行网点
    var bankBranch = $("#bankBranch_update").val().trim();
    var reg = /[^\u4E00-\u9FA5]/g;

    if (province.length < 1 || city.length < 1) {
        popTips("请选择开户行", "error");
    } else if (bankBranch.length < 1 || reg.test(bankBranch)) {
        popTips("请填写开户行网点名称（只能输入文字）", "error");
    } else if(bankBranch.length>15) {
        popTips("请填写正确的开户行网点名称（长度不能超过15个字符）", "error");
    } else {
        $('#updateBankInfoId').attr("onclick", "");
        bankAddress = province + "-" + city;
        jQuery.ajax({
            type: 'post',
            url: '/ct-data/userBank/updateBankBranch',
            dataType: 'json',
            data: {
                "id": id,
                "bankAddress": bankAddress,
                "bankBranch": bankBranch
            },
            success: function (data) {
                if (data.sign) {
                    closelayer();
                    popTips(data.message, "succeed");

                    userBank();

                } else {
                    popTips(data.message, "error");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                popTips("系统出现错误，请联系管理员", "error");
            },
            complete: function () {
                $('#updateBankInfoId').html("修改");
                $('#updateBankInfoId').attr("onclick", "updateBankBranch('" + id + "');");
            }
        });
    }
};
// 修改银行卡信息
function updateBankInfo(id) {

    $('#ck_' + id).find('dd').eq(3).hide();
    $('#ck_' + id).find('dd').eq(4).hide();
    var bankNode = $('#ck_' + id).find('dd').eq(4);

    $('#ckyinh_tips').html('修改银行卡');
    $('#updateBankInfoId').html('保存');
    // 切换保存事件
    $('#updateBankInfoId').attr('onclick', 'updateBankBranch("' + id + '")');

    var htmlVal = '<dd class="bankBranch_update_tag">' +
        '<span class="tt">开户行地址：</span>' +
        '<span class="khh">'
        + '<select name="" id="province_update" onchange="changePreForUpdate()">'
        + '<option value="">请选择</option>'
        + '<option>北京市</option>'
        + '<option>上海市</option>'
        + '<option>天津市</option>'
        + '<option>重庆市</option>'
        + '<option>河北省</option>'
        + '<option>山西省</option>'
        + '<option>内蒙古自治区</option>'
        + '<option>辽宁省</option>'
        + '<option>吉林省</option>'
        + '<option>黑龙江省</option>'
        + '<option>江苏省</option>'
        + '<option>浙江省</option>'
        + '<option>安徽省</option>'
        + '<option>福建省</option>'
        + '<option>江西省</option>'
        + '<option>山东省</option>'
        + '<option>河南省</option>'
        + '<option>湖北省</option>'
        + '<option>湖南省</option>'
        + '<option>广东省</option>'
        + '<option>广西自治区</option>'
        + '<option>海南省</option>'
        + '<option>四川省</option>'
        + '<option>贵州省</option>'
        + '<option>云南省</option>'
        + '<option>西藏自治区</option>'
        + '<option>陕西省</option>'
        + '<option>甘肃省</option>'
        + '<option>宁夏自治区</option>'
        + '<option>青海省</option>'
        + '<option>新疆自治区</option>'
        + '<option>香港</option>'
        + '<option>澳门</option>'
        + '<option>台湾省</option>'
        + '</select>'
        + '</span>'
        + '<span class="khh"><select name="" id="city_update"><option value="">请选择</option></select></span></dd>';

    htmlVal += '<dd class="bankBranch_update_tag">'
        + '<span class="tt">开户行网点：</span>'
        + '<span><input id="bankBranch_update" class="inp-sty-1" type="text" value=""></span>'
        + '</dd>';
    bankNode.after(htmlVal);

    // 回显信息
    var province = $('#ck_' + id).find('dd').eq(3).find('span').eq(1).html();
    var bankBranch = $('#ck_' + id).find('dd').eq(4).find('span').eq(1).html();
    if (province) {
        // 获取省份
        var province_val = province.substr(0, province.indexOf('-'));
        var city_val = province.substr(province.indexOf('-') + 1);
        $('#province_update').val(province_val);

        // 初始化省下面的市
        changePreForUpdate();
        $('#city_update').val(city_val);

    }
    $('#bankBranch_update').val(bankBranch);

}
// 修改银行信息关闭弹框
function closeBanklayer() {
    $('.bankBranch_update_tag').remove();
    window.layer.close(layerindex);
}

// 自定义 pop 方法
function pop_byself(id) {
    var commission = parseFloat(way.get("useraccount.commission"));
    if(commission >0){
        pop(id)
    } else {
        popTips("返点账户余额为 0 ", "waring")
    }
}

// 将返点账户余额全部转到主账户
function commissionTransfer() {
    // 关闭弹窗
    closelayer();
    $.ajax({
        url: "/ct-data/userAccount/commissionTransfer",
        type: "post",
        dataType: "json",
        success: function(data) {
            var message = data.message;
            if (data.sign === true) {
                popTips(message ? message : "转入成功", "succeed");
            } else {
                popTips(message ? message : "转入失败，请重试", "error");
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            popTips("请求失败，请刷新页面重试", "error")
        }
    })
}

$(function () {
    displayAgentMenu();
});