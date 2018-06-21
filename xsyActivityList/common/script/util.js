// 禁止微信浏览器下拉
function stopDrop() {
    var lastY; //最后一次y坐标点
    $(document.body).on('touchstart', function (event) {
        lastY = event.originalEvent.changedTouches[0].clientY; //点击屏幕时记录最后一次Y度坐标。
    });
    $(document.body).on('touchmove', function (event) {
        var y = event.originalEvent.changedTouches[0].clientY;
        var st = $(this).scrollTop(); //滚动条高度  
        if (y >= lastY && st <= 10) { //如果滚动条高度小于0，可以理解为到顶了，且是下拉情况下，阻止touchmove事件。
            lastY = y;
            event.preventDefault();
        }
        lastY = y;

    });
}

//获取url参数
var requestParam = function (paras) {
    var url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {}
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
}

var Vote = {};
Vote.ListShow = (function () {
    var longWidth;
    var percentArr = [];
    var shortWidth = [];
    var spanArr = [];

    /*初始化*/
    function init(o) {
        voteId = o.id;
        longWidth = o.width;
        percentArr = o.percent;
        shortWidth = calWidth();
        spanArr = findSpans();
    }
    /*根据百分比计每个算span的实际宽度*/
    function calWidth() {
        var arr = [];
        //console.log(percentArr);
        for (var i = 0; i < percentArr.length; i++) {
            var tempLength = percentArr[i] * longWidth;
            arr.push(tempLength);
            //console.log(arr);
        }
        return arr;
    }
    /*将全部span存为一个数组*/
    function findSpans() {
        var arr = $("#" + voteId).find(".voted-box-else");
        // console.log(litems);
        // var arr = []
        // for (var i = 0; i < litems.length; i++) {
        //     arr.push(litems[i].children[0]);
        // }
        return arr;
        //console.log(arr);
    }
    /*每个span元素设置宽度*/
    function setWidth() {
        for (i = 0; i < percentArr.length; i++) {
            if(shortWidth[i] >= 696){
              shortWidth[i] = 697; 
            }
            $(spanArr[i]).animate({
                width: (shortWidth[i] + 16) + "px"
            }, 1000);
        }

    }
    return {
        init: init,
        set: setWidth
    };
})();

// 投票滚动条
function progressLine(arr) {
    /*调用*/
    // 当结果页显示的时候开始执行进度条动画
    setTimeout(function () {
        Vote.ListShow.init({
            id: 'reslutBg',
            width: 696,
            percent: arr,
        });
        Vote.ListShow.set();
    }, 400)
};