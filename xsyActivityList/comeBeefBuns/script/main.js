$(function(){
  // 禁止网页下拉
  stopDrop();
  var domain = 'http://activity.xishaoye.com';
  var appkey = 'C7C90874E9A9FDE4';
  let timestamp = UnixtimeStamp()
  var openid = requestParam('openid');  
  var activityId = "537687A4-093E-456A-B5D8-F7D91C197266";
  var page = '/comeBeefBuns/main.html';
  // 微信分享功能
  var dataPage = {'page': page+ '?openid=' + openid };
  shareHandle(dataPage);
  getvoteHandle(openid);
  $('#toVoteBtnhandle').on('click',function(){
    $('.mask').css('display','block');
    // 点击投票按钮判断是否关注
    var strAttentionData = {'openid':openid};
     $.ajax({
    url: domain + '/api/WeiXin/GetSubscribe?appkey=' + appkey + '&timestamp=' + timestamp + '&sign=' + computedSign(strAttentionData, 'get', timestamp),
    type: 'get',
    data: strAttentionData,
    dataType: 'json',
    success: function (res) {
     //console.log(res);
     if(res.Code == 0){
       var dData = res.Data;
       if(dData.subscribe == 1){
         voteHandle();
       }else {
          $('.mask').css('display','none');
          window.location.href = "./attention.html";
       }
     }else {
        $('.mask').css('display','none');
       // 其他错误
        $('.modal').css('display','block');
        $('.modal-content').text('请检查网络后重新尝试！（scribe）');
     }
    },
    error:function(){
      $('.mask').css('display','none');
    }
     });
  });
  //  发起请求检测是否投票
  function voteHandle(){
    let timestamp = UnixtimeStamp();
    var strVoteData = {'activityId':activityId,'openId':openid};
    $.ajax({
     url: domain + '/api/ShareStatistic/CheckVoteStatistic?appkey=' + appkey + '&timestamp=' + timestamp + '&sign=' + computedSign(strVoteData, 'get', timestamp),
    type: 'get',
    data: strVoteData,
    dataType: 'json',
    success: function (res) {
     console.log(res);
     $('.mask').css('display','none');
     if(res.Code == 0){
      //  用户还未投票,跳转到投票页面
      window.location.href = "./voteDetail.html?openid="+openid+'&code=1';  
     }else if(res.Code == 20004){
      //  该用户已经投过票
      //console.log(1111);
       $('.modal-success').css('display', 'block');
     }
    },
    fail:function(){
       $('.mask').css('display','none');
    }
    });
  }
 // 点击错误提示确定按钮
    $('.modal-success-button').on('click',function(){
       $('.modal-success').css('display','none');
       window.location.href = "./result.html?openid="+openid;  
    }) ;

     function getvoteHandle (openid) {
    // 检验是否可以投票
    var strData = {'activityId': activityId}
    $.ajax({
      url: domain + '/api/Activitys/CheckActivitys?appkey=' + appkey + '&timestamp=' + timestamp + '&sign=' + computedSign(strData, 'get', timestamp),
      type: 'get',
      async: false,
      data: strData,
      dataType: 'json',
      success: function (res) {
        if (res.Code == 0) {
          
        }else if (res.Code == 20000) {
          $('.modal').css('display', 'block')
          $('.modal-content').text('活动不存在！（20000）')
        }else if (res.Code == 20001) {
          // 活动未开始
          window.location.href = './preheat.html?openid=' + openid;
        }else if (res.Code == 20002) {
          // 活动已结束
          window.location.href = './prize.html?openid=' + openid;
        }else if (res.Code == 20003) {
          // 活动已中止
          window.location.href = './prestop.html?openid=' + openid;
        }else {
          // 其他错误
          $('.modal').css('display', 'block')
          $('.modal-content').text('活动不存在！（20000）')
        }
      }
    })
  }
})