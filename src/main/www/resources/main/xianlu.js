var listTimes = [];
var list = [];
listTimes[0] = {};
listTimes[0].url = 'www.yugj881.com/';
listTimes[0].times = 0;
listTimes[1] = {};
listTimes[1].url = '98wnd.yugj881.com/';
listTimes[1].times = 0;
listTimes[2] = {};
listTimes[2].url = 'iuw.yugj881.com/';
listTimes[2].times = 0;
listTimes[3] = {};
listTimes[3].url = '09ds.yugj881.com/';
listTimes[3].times = 0;
listTimes[4] = {};
listTimes[4].url = 'www.yugj173.com/';
listTimes[4].times = 0;
listTimes[5] = {};
listTimes[5].url = 'a01.yugj173.com/';
listTimes[5].times = 0;
listTimes[6] = {};
listTimes[6].url = 'a02.yugj173.com/';
listTimes[6].times = 0;
listTimes[7] = {};
listTimes[7].url = 'a03.yugj173.com/';
listTimes[7].times = 0;




way.set("listTimes", listTimes);
var listTimesListener = function () {
    for (var i = 0; i < listTimes.length; i++) {
        list[i] = {};
        list[i].times = listTimes[i].times + "ms";
        list[i].url = listTimes[i].url;
    }
    list.sort(compare);
    way.set("list", list);
};

way.watch("listTimes", listTimesListener);
function getDateDiff() {
    for (var i = 0; i < listTimes.length; i++) {
        var xlurl = window.location.protocol + '//' + listTimes[i].url + "resources/yiyou/images/yiyouAPP.png";
        postUrl(xlurl, i);
    }
}

var postUrl = function (url, i) {
    var startTime = new Date().getTime();
    $("img.xianlut").eq(i).attr("src", url);
    $("img.xianlut").eq(i).get(0).onload = function () {
        var endTime = new Date().getTime();
        var diff = endTime - startTime;
        listTimes[i].times = diff;
        way.set("listTimes", listTimes);
    };
    way.set("listTimes", listTimes);
};

function compare(value1, value2) {
    if (parseInt(value1.times.replace("ms", '')) < parseInt(value2.times.replace("ms", ''))) {
        return -1;
    } else if (parseInt(value1.times.replace("ms", '')) > parseInt(value2.times.replace("ms", ''))) {
        return 1;
    } else {
        return 0;
    }
}

//屏蔽右键
function doNothing(e) {
    if (window.event) {
        window.event.returnValue = false;
    } else {
        e.preventDefault();
    }
}

var openUrl = function (i) {
    window.location.href = window.location.protocol + '//' + list[i].url + "index.html";
};