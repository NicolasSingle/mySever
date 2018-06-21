
 
$(function () {
  // 禁止网页下拉
  stopDrop();
  var voteNum = 1;
  var domain = "http://activity.xishaoye.com";
  var check1;
  var check2;
  var id;
  var title = '为我喜欢的鸡肉馍投票，送你西少爷现金券！';
  var link = "http://activity.xishaoye.com/Init/InitActive";
  var desc = "咯咯咯，想被你吃掉！我不要离开。";
  var imgUrl = domain + '/vote/image/logo.png';
  var img_width = "200";
  var img_height = "200";
  var page = '/vote/index.html';
  //获取openid 
  var code = requestParam('code');
   var openid;
  
  // var openid = 'hdfudhfdbv';
  var appkey = 'C7C90874E9A9FDE4';

  //获取时间戳
  let timestamp = UnixtimeStamp();
  // 发起请求获取openid
  $.ajax({
    url: domain + '/api/Weixin/GetOpenId?appkey=' + appkey + '&timestamp=' + timestamp + '&sign=' + computedSign({ code: code }, "get", timestamp),
    type: 'get',
    async: false,
    data: { code: code },
    dataType: 'json',
    success: function (res) {
      if (res.Code == 0) {
       openid = res.Data.openid;
        //console.log(openid);

      }
    }
  })

  // 页面初始化
  var dataStart = { F_OpenId: openid, F_Page: page, F_ClickCount: 1 };
  $.ajax({
    url: domain + '/api/PageStatistic/VisitPage?appkey=' + appkey + '&timestamp=' + timestamp + '&sign=' + computedSign([dataStart, 'model'], "post", timestamp),
    type: 'post',
    async: false,
    data: dataStart,
    dataType: 'json',
    success: function (res) {
    }
  })

  //console.log(openid);
  //ios支持自动播放
  function audioAutoPlay(id){  
   var audio = document.getElementById(id),  
    _xplay = function(){  
      audio.play();  
      document.removeEventListener("touchstart",_xplay, false);  
    };  
    audio.play();  
     document.removeEventListener("WeixinJSBridgeReady",_xplay, false);  
    document.addEventListener("WeixinJSBridgeReady", _xplay, false);  
    document.removeEventListener("YixinJSBridgeReady",_xplay, false);  
    document.addEventListener('YixinJSBridgeReady', _xplay, false);  
    document.addEventListener("touchstart",_xplay, false);  
}  
 


// 切换音频方法
function createAudio(m,v)
  {
   if (m == "musicfx"){  
            $('#mc_play audio').get(0).pause();  
            $('#mc_play audio').get(1).play();  
        }else{  
            $('#mc_play audio').get(1).pause();  
            $('#mc_play audio').get(0).play();  
        }  
  }
  audioAutoPlay("musicfx1");

  // 发起请求获取票数
  var requestNum = function () {

    let timestamp = UnixtimeStamp();
    $.ajax({
      url: domain + '/api/VoteStatistic/GetVoteSum?appkey=' + appkey + '&timestamp=' + timestamp + '&sign=' + computedSign({}, "get", timestamp),
      type: 'get',
      async: false,
      dataType: 'json',
      success: function (res) {
        if (res.Code == 0) {
          $("#showResult").attr("index", 1);
          $("#showResult").addClass("into-bottom");
          $(".vote-item-wrapA>H4").text(res.Data[0].F_FoodName);
          $(".vote-item-wrapB>H4").text(res.Data[1].F_FoodName);
          check1 = res.Data[0].VoteCount;
          check2 = res.Data[1].VoteCount;
          $(".content-red").text('已有' + check1 + '人支持');
          $(".content-green").text('已有' + check2 + '人支持');
          // 音乐部分切换
          //$('.audioplay').remove();
           $('#musicfx1')[0].pause();  
            $('#musicfx2')[0].play(); 
          progressLine(check1, check2);
          if (res.Data[0].F_Id == id) {
            if (check1 > check2) {
              $("<img src='./image/red_big.gif' class='main-img'>").appendTo($("#showResult"))
            } else {
              $("<img src='./image/red_small.gif' class='main-img'>").appendTo($("#showResult"))
            }
          } else {
            if (check1 > check2) {
              $("<img src='./image/green_small.gif' class='main-img'>").appendTo($("#showResult"))
            } else {
              $("<img src='./image/green_big.gif' class='main-img'>").appendTo($("#showResult"))
            }
          }

        }
      }
    })
  }

  // 支持投票请求接口调取
  var agreeNum = function (data) {

    let timestamp = UnixtimeStamp();
    $.ajax({
      url: domain + '/api/VoteStatistic/AddVoteStatistic?appkey=' + appkey + '&timestamp=' + timestamp + '&sign=' + computedSign([data, 'model'], "post", timestamp),
      type: 'post',
      async: false,
      data: data,
      dataType: 'json',
      success: function (res) {
           
        if (res.Code == 0) {
          // 投票成功后获取投票数
          requestNum();
        } else {
                 layer.open({
                   content: "每天只有一次投票机会，明天再来哦，馍馍哒",
  style: 'background-color:#fff; border-radius:80px; font-size:26px; color:#000; border:none;' //自定风格
  ,time: 1  
}); 
                 setTimeout
  
          // alert(data.Message);
          setTimeout(function () {
            requestNum();
            //alert("每天只有一次投票机会，明天再来哦，馍馍哒");
          }, 1000);
        }
      }
    })
  }

  //分享成功请求 
  var shareSuccess = function () {
    let timestamp = UnixtimeStamp();
    var shareNum = 1;
    var signData = [{ F_OpenId: openid, F_ShareCount: shareNum }, 'model'];
    $.ajax({
      url: domain + '/api/ShareStatistic/UserShare?appkey=' + appkey + '&timestamp=' + timestamp + '&sign=' + computedSign(signData, "post", timestamp),
      type: 'post',
      data: { F_OpenId: openid, F_ShareCount: shareNum },
      dataType: 'json',
      success: function (data) {
        if (data.Code == 0) {
          //elert(data.Message);
          console.log(data.Message);
        }
      }
    })
  }


  // 页面注册配置
  var dataConfig = { page: page + '?code=' + code + '&state=xishaoye' };
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
          jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"]
        })
      }
    }
  })

  //通过ready接口处理成功验证
  wx.ready(function () {
    //基础接口
    wx.checkJsApi({
      jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"],
      success: function (res) {

      }
    });

    // 分享到朋友圈
    wx.onMenuShareTimeline({
      title: title,
      link: link,
      desc: desc,
      imgUrl: imgUrl,
      img_width: img_width,
      img_height: img_height,
      success: function () {
        //用户分享后执行的回调函数
        shareSuccess();
      },
      cancel: function () {
        // 用户取消后执行的回调函数
      }
    });

    // 分享给朋友
    wx.onMenuShareAppMessage({
      title: title,
      link: link,
      desc: desc,
      imgUrl: imgUrl,
      img_width: img_width,
      img_height: img_height,
      success: function () {
        //用户分享后执行的回调函数
        shareSuccess();
      },
      cancel: function () {
        // 用户取消后执行的回调函数
      }
    });

    // 分享到QQ
    wx.onMenuShareQQ({
      title: title,
      link: link,
      desc: desc,
      imgUrl: imgUrl,
      img_width: img_width,
      img_height: img_height,
      success: function () {
        //用户分享后执行的回调函数
        shareSuccess();
      },
      cancel: function () {
        // 用户取消后执行的回调函数
      }
    });
    wx.onMenuShareWeibo({
      title: title,
      link: link,
      desc: desc,
      imgUrl: imgUrl,
      img_width: img_width,
      img_height: img_height,
      success: function () {
        //用户分享后执行的回调函数
        shareSuccess();
      },
      cancel: function () {
        // 用户取消后执行的回调函数
      }
    });

    // 分享到QQ空间
    wx.onMenuShareQZone({
      title: title,
      link: link,
      desc: desc,
      imgUrl: imgUrl,
      img_width: img_width,
      img_height: img_height,
      success: function () {
        //用户分享后执行的回调函数
        shareSuccess();
      },
      cancel: function () {
        // 用户取消后执行的回调函数
      }
    });
  });


  
  //为红色的按钮绑定事件==========================
  $("#btnRed").bind("click", function () {

    id = 'e552f0ee-f756-45e7-87b2-k4d15c2dffaf';
    agreeNum({ F_OpenId: openid, F_FoodId: id, F_VoteNum: voteNum });

  });

  // 为绿色的按钮绑定点击事件
  $("#btnGreen").bind("click", function () {
    id = 'e552f0ee-f756-45e7-87bq-k4d15c2dffaf';
    agreeNum({ F_OpenId: openid, F_FoodId: id, F_VoteNum: voteNum });
  });

  // 点击第一个优惠券进行领取
  $('#cardA').on('click', function () {
    //出现分享弹幕
    setTimeout(function () {
    
           $(".share").show();
              $(".share").click(function () {
                $(".share").hide();
              })
     

            //alert("每天只有一次投票机会，明天再来哦，馍馍哒");
          }, 2000);
    let timestamp = UnixtimeStamp();
    $.ajax({
      url: domain + '/api/VoteStatistic/GetCardList?appkey=' + appkey + '&timestamp=' + timestamp + '&sign=' + computedSign({}, "get", timestamp),
      type: 'get',
      dataType: 'json',
      success: function (res) {
        var data = res.Data;
        if (res.Code == 0) {
          wx.addCard({
            cardList: [
              {
                cardId: data.cardId,
                cardExt: JSON.stringify(data.cardExt)
              }
            ],
            success: function (res) {
              // alert('已领取卡券：');
              $(".share").show();
              $(".share").click(function () {
                $(".share").hide();
              })
            }
          });
        }
      }
    });
  });

});

