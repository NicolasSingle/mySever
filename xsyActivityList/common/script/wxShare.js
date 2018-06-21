// 微信分享功能
function shareHandle (dataConfig) {
  var domain = 'http://activity.xishaoye.com';
  var appkey = 'C7C90874E9A9FDE4'
  // 获取时间戳
  let timestamp = UnixtimeStamp();
  // var title = '瓜分10000个泡椒牛肉夹馍'
  // var link = 'http://activity.xishaoye.com/Init/InitBullKingActive';
  // var desc = '集结最强战队 西少爷请你“吃馍”';
  // var imgUrl = domain + '/xsyActivityList/comeBeefBuns/image/gaotaotao.jpg';
   var title = '积分赢奖品！快来帮我踢一脚'
  var link = 'http://activity.xishaoye.com/Init/InitBullKingActive';
  var desc = '点击帮TA助力，或开启自己的赛事赢取奖品';
  var imgUrl = domain + '/xsyActivityList/comeBeefBuns/image/gaotaotao.jpg';
  var img_width = '200'
  var img_height = '200'
  // 页面注册配置
  var data = {page:window.location.href};
  $.ajax({
   url: domain + '/api/WeiXin/GetJsSdkSignature?appkey=' + appkey + '&timestamp=' + timestamp + '&sign=' + computedSign(data, 'get', timestamp),
    // url: "http://api.message.xishaoye.com/api/WxManager/GetJsSdkSignature",
    type: 'get',
    data: data,
    dataType: 'json',
    success: function (res) {
      if (res.Code == 0) {
        wx.config({
          debug: false,
          appId: res.Data.appId,
          timestamp: res.Data.timeStamp,
          nonceStr: res.Data.nonceStr,
          signature: res.Data.signature,
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
        })
      }
    }
  })

  // 通过ready接口处理成功验证
  wx.ready(function () {
    // 基础接口
    wx.checkJsApi({
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'],
      success: function (res) {}
    })

    // 分享到朋友圈
    wx.onMenuShareTimeline({
      title: title,
      link: link,
      desc: desc,
      imgUrl: imgUrl,
      img_width: img_width,
      img_height: img_height,
      success: function () {
        // 用户分享后执行的回调函数
        $('.share-page').css('display','none');
      },
      cancel: function () {
        // 用户取消后执行的回调函数
        $('.share-page').css('display','none');
      }
    })

    // 分享给朋友
    wx.onMenuShareAppMessage({
      title: title,
      link: link,
      desc: desc,
      imgUrl: imgUrl,
      img_width: img_width,
      img_height: img_height,
      success: function () {
        // 用户分享后执行的回调函数
        $('.share-page').css('display','none');
      },
      cancel: function () {
        // 用户取消后执行的回调函数
        $('.share-page').css('display','none');
      }
    })

    // 分享到QQ
    wx.onMenuShareQQ({
      title: title,
      link: link,
      desc: desc,
      imgUrl: imgUrl,
      img_width: img_width,
      img_height: img_height,
      success: function () {
        // 用户分享后执行的回调函数

      },
      cancel: function () {
        // 用户取消后执行的回调函数
      }
    })
    wx.onMenuShareWeibo({
      title: title,
      link: link,
      desc: desc,
      imgUrl: imgUrl,
      img_width: img_width,
      img_height: img_height,
      success: function () {
        // 用户分享后执行的回调函数

      },
      cancel: function () {
        // 用户取消后执行的回调函数
      }
    })

    // 分享到QQ空间
    wx.onMenuShareQZone({
      title: title,
      link: link,
      desc: desc,
      imgUrl: imgUrl,
      img_width: img_width,
      img_height: img_height,
      success: function () {
        // 用户分享后执行的回调函数

      },
      cancel: function () {
        // 用户取消后执行的回调函数
      }
    })
  })
}



  $(function(){
    // 阻止蒙版后页面滑动
    if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    //移动端
        $(".modal").on('touchmove',function(e){
            e.stopPropagation();
            e.preventDefault();
            $('.p').click(function(){
                $(this).parent().hide();       
            })
        })
    } else {
        //PC端
        var flag=true;
        $('.p').click(function(){
            $(this).parent().hide();
            $('body').css({    "overflow":'visible'});
            flag=false;     
        })
        if(flag)
            $('body').css({    "overflow":'hidden' });
    }

    // 阻止蒙版后页面滑动
    if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    //移动端
        $(".prestop-modal").on('touchmove',function(e){
            e.stopPropagation();
            e.preventDefault();
            $('.p').click(function(){
                $(this).parent().hide();       
            })
        })
    } else {
        //PC端
        var flag=true;
        $('.p').click(function(){
            $(this).parent().hide();
            $('body').css({    "overflow":'visible'});
            flag=false;     
        })
        if(flag)
            $('body').css({    "overflow":'hidden' });
    }

    // 阻止蒙版后页面滑动
    if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    //移动端
        $(".success-modal").on('touchmove',function(e){
            e.stopPropagation();
            e.preventDefault();
            $('.p').click(function(){
                $(this).parent().hide();       
            })
        })
    } else {
        //PC端
        var flag=true;
        $('.p').click(function(){
            $(this).parent().hide();
            $('body').css({    "overflow":'visible'});
            flag=false;     
        })
        if(flag)
            $('body').css({    "overflow":'hidden' });
    }
})

