$(function(){
	// 禁止网页下拉
  stopDrop();
  var page = '/cardactivity/xsy.activity.index.html';
  var domain = "http://activity.xishaoye.com";
   //获取openid 
      var code = requestParam('code');
     var appkey = 'C7C90874E9A9FDE4'; 
     var address;   
    //获取时间戳
    let timestamp = UnixtimeStamp();
    var openid;
     var code = '061CE2ij1dnXTx0n72jj11Y4ij1CE2iV';
     var openid = 'oQfIG1G-TPLFSx1GDU0ENaAAU0ys';
     var access_token = "5_2A39rIXwMhnRwB_e3t0hDXQJLkO9DccMXNnT7KttCTDmZxSEQW-XZohUY2R1HT0K98n8dbE4sBekQxJ89jsi-A";
    var nextStatus = 0;
    var address;
    var bgWidth = $(".home-activity").css('height');
    if(bgWidth <= '1200px'){
      $('.bottom-home').css('bottom',0);
    }
   // 发起请求获取openid
  // $.ajax({
  //   url: domain + '/api/Weixin/GetOpenId?appkey=' + appkey + '&timestamp=' + timestamp + '&sign=' + computedSign({ code: code }, "get", timestamp),
  //   type: 'get',
  //   async: false,
  //   data: { 'code': code },
  //   dataType: 'json',
  //   success: function (res) {
  //     if (res.Code == 0) {
  //      openid = res.Data.openid;
  //     }else {
  //      window.location.href='http://activity.xishaoye.com/Init/InitCardActive';
  //     }
  //   },
  //   fail:function(){
  //     $(".homeTicket").hide();
  //     $('<img src="./image/complete.png" alt="">').appendTo($(".complete"));
  //     $(".complete").show();
  //   }
  // })

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
          jsApiList: ["getLocation"]
        }); 
      }
    }
  })

  // 检测是否关注
  $.ajax({
    url: domain + '/api/WeiXin/GetSubscribe?appkey=' + appkey + '&timestamp=' + timestamp + '&sign=' + computedSign({ openid: openid }, "get", timestamp),
    type: 'get',
    async: false,
    data: { 'openid': openid },
    dataType: 'json',
    success: function (res) {
      if (res.Code == 0) {
       var subscribe = res.Data.subscribe;
       if(subscribe != 1){
        $(".loading").hide();
        $(".homeTicket").hide();
        $('<img src="./image/share.png" alt="">').appendTo($(".complete"));
        $(".complete").show();
      }else {
         // 检测领取状态
         $.ajax({
          url: domain + '/api/CardManager/GetUserCard?appkey=' + appkey + '&timestamp=' + timestamp + '&sign=' + computedSign({ openId: openid }, "get", timestamp),
          type: 'get',
          async: false,
          data: { 'openId': openid },
          dataType: 'json',
          success: function (res) {
            if (res.Code == 0) {
             var dData = res.Data;
             var cardno = dData.cardno;
             if(cardno == ''){
               $(".homeTicket").show();
               // 检测地理位置
                wx.ready(function () {   
                wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {  
                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                address = getAddress(longitude,latitude,function(d){
                 if(d == '北京市'){                
                 // 获取卡券的数量
                $.ajax({
                 url: domain + '/api/CardManager/GetCardCount?appkey=' + appkey + '&timestamp=' + timestamp + '&sign=' + computedSign({}, "get", timestamp),
                 type: 'get',
                  async: false,
                     dataType: 'json',
                   success: function (res) {
                    if (res.Code == 0) {
                     var dData = res.Data;
                       if(dData.count > 0){ 
                             $(".homeTicket").show(); 
                             $(".complete").hide(); 
                             $(".success").hide();

                        }else {
                         $(".homeTicket").hide();
                         $('<img src="./image/complete.png" alt="">').appendTo($(".complete"));
                         $(".complete").show();
                        }
                      }else {
                        $(".homeTicket").hide();
                         $('<img src="./image/complete.png" alt="">').appendTo($(".complete"));
                         $(".complete").show();
                      }
                   }
                  });
                }else {
                   $(".homeTicket").hide();
                    $('<img src="./image/adress.png" alt="">').appendTo($(".complete"));
                    $(".complete").show();
                }          
               });
               },
               fail:function(res){
                $(".homeTicket").hide();
                 $('<img src="./image/complete.png" alt="">').appendTo($(".complete"));
                 $(".complete").show();
               },
               complete:function(res){
                $(".loading").hide();
               }
               });
               });
             }else {
              $(".loading").hide();
              $(".homeTicket").hide();
               $(".success").show();
               $(".success-card").text("兑换码："+cardno);
             }

           }
         }
       })
       }

     }
   }
 });
// 点击抢票按钮，进行抢票
$("#btnTicket").on("click",function(){  
  // 发放卡券
        $.ajax({
          url: domain + '/api/CardManager/SendCard?appkey=' + appkey + '&timestamp=' + timestamp + '&sign=' + computedSign({openId:openid}, "get", timestamp),
          type: 'get',
          data:{'openId':openid},
          async: false,
          dataType: 'json',
          success: function (res) {
            $(".loading").hide();
           if (res.Code == 0) {
            var dData = res.Data;
            var cardno = dData.cardno;
            $(".homeTicket").hide();
            $(".success").show();
            $(".success-card").text("兑换码："+cardno);                             
          }else if(res.Code == 10002){
            $(".homeTicket").hide();
            $('<img src="./image/complete.png" alt="">').appendTo($(".complete"));
            $(".complete").show();
          }else if(res.Code == 10003){
           $(".homeTicket").hide();
           $('<img src="./image/share.png" alt="">').appendTo($(".complete"));
           $(".complete").show();
         }else if(res.Code == 10001){
          $(".homeTicket").hide();
            $('<img src="./image/complete.png" alt="">').appendTo($(".complete"));
            $(".complete").show();
        }else{
         $(".homeTicket").hide();
            $('<img src="./image/complete.png" alt="">').appendTo($(".complete"));
            $(".complete").show();
       }
       }
       });
});
})



 