// 禁止微信浏览器下拉
function stopDrop() {
    var lastY;//最后一次y坐标点
    $(document.body).on('touchstart', function(event) {
        lastY = event.originalEvent.changedTouches[0].clientY;//点击屏幕时记录最后一次Y度坐标。
    });
    $(document.body).on('touchmove', function(event) {
        var y = event.originalEvent.changedTouches[0].clientY;
        var st = $(this).scrollTop(); //滚动条高度  
        if (y >= lastY && st <= 10) {//如果滚动条高度小于0，可以理解为到顶了，且是下拉情况下，阻止touchmove事件。
            lastY = y;
            event.preventDefault();
        }
        lastY = y;
 
    });
}

//获取url参数
  var requestParam = function (paras){   
         var url = location.href; 
        var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");   
        var paraObj = {}   
        for (i=0; j=paraString[i]; i++){   
            paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);   
        }   
        var returnValue = paraObj[paras.toLowerCase()];   
        if(typeof(returnValue)=="undefined"){   
            return "";   
        }else{   
            return returnValue;   
        }   
}  

// 获取地理位置
function getAddress(longitude,latitude,fun){
var address;
//通过baiduMap API获取街道名称
var map = new BMap.Map("allmap");
var point = new BMap.Point(longitude,latitude);
var gc = new BMap.Geocoder();
return gc.getLocation(point, function(rs){
   var addComp = rs.addressComponents;
    fun(addComp.city);
});

}