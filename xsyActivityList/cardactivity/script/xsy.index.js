$(function(){
	// 禁止网页下拉
  stopDrop();  
  var page = '/cardactivity/html/load.html';
  var domain = "http://activity.xishaoye.com";
   //获取openid 
     var code = requestParam('code');
     var appkey = 'C7C90874E9A9FDE4';   
    //获取时间戳
    let timestamp = UnixtimeStamp();
    var openid;
    // var nextStatus = 0;
    var bgWidth = $(".home-activity").css('height');
    if(bgWidth <= '1200px'){
      $('.bottom-home').css('bottom',0);
    }
  // 页面注册配置
  var dataConfig = { 'page': page + '?code=' + code + '&state=xishaoye' };
  $.ajax({
    url: domain + '/api/WeiXin/GetWXConfig?appkey=' + appkey + '&timestamp=' + timestamp + '&sign=' + computedSign(dataConfig, "get", timestamp),
    type: 'get',
    data: dataConfig,
    dataType: 'json',
    success: function (res) {
      if (res.Code == 0) {
        wx.config({
          debug: false,
          appId: res.Data.appId,
          timestamp: res.Data.timeStamp,
          nonceStr: res.Data.nonceStr,
          signature: res.Data.signature,
          jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage","getLocation"]
        });
      }
    }
  })
 // 获取地理位置的精度和纬度
  wx.ready(function () { 
  
    wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {  
         var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
         var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        // status=1---已领完   status=2---地区错误    status=3---没有关注
        var strData={ 'code': code ,'location':latitude+','+longitude};
        $.ajax({
        url: domain + '/api/CardManager/GetUserCard?appkey=' + appkey + '&timestamp=' + timestamp + '&sign=' + computedSign(strData, "get", timestamp),
          type: 'get',
          async: false,
          data: strData,
          dataType: 'json',
          success:function(res){
           if(res.Code == 0){
            openid = res.Data.openid;
            var cardno = res.Data.cardno;
            if(cardno == ''){
               location.href = "./home.html?openid="+openid;//location.href实现客户端页面的跳转
            }else {
               location.href = "./result.html?cardno="+cardno;
            }
          }else if(res.Code == 1){
            // 失败
            window.location.href = "./error.html?status=1";
                
          }else if(res.Code == 2){
                // 参数错误
             window.location.href='http://activity.xishaoye.com/Init/InitCardActive';
           }else if(res.Code == 10001){
            // openid 无效
              window.location.href = "./error.html?status=1";
           }else if(res.Code == 10002){
            // 奖品数量不足
            window.location.href = "./error.html?status=1";
           }else if(res.Code == 10003){
            // 未关注公众号
            window.location.href = "./error.html?status=3";
           }else if(res.Code == 10004){
            // code不能重用
            window.location.href='http://activity.xishaoye.com/Init/InitCardActive'; 
           }
           else if(res.Code == 10005){
             // 获取微信用户失败
             window.location.href = "./error.html?status=10005";
           }else if(res.Code == 10006){
             // 地理位置错误
              window.location.href = "./error.html?status=2";
           }else {
             window.location.href = "./error.html?status=1";  
           }
          }
        });
            }
      });
  });


})



