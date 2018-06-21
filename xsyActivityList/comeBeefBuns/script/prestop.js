$(function(){
  $('.mask').css('disply','block');
  // 禁止网页下拉
  stopDrop();
  var domain = 'http://activity.xishaoye.com'
  var appkey = 'C7C90874E9A9FDE4';
  var openid = requestParam('openid');
  //var openid = 'oQfIG1G-TPLFSx1GDU0ENaAAU0ys';
  var activityId = "537687A4-093E-456A-B5D8-F7D91C197266";
  var page = '/comeBeefBuns/prestop.html';
  // 微信分享功能
  var dataPage = {'page': page + '?openid=' + openid}
  shareHandle(dataPage);
//  获取商品列表
 let timestamp = UnixtimeStamp();
  var strData = {'activityId': activityId}
  $.ajax({
    url: domain + '/api/Food/GetList?appkey=' + appkey + '&timestamp=' + timestamp + '&sign=' + computedSign(strData, 'get', timestamp),
    type: 'get',
    data: strData,
    dataType: 'json',
    success: function (res) {
       $('.mask').css('display', 'none');
      if (res.Code == 0) {
        var dData = res.Data;
        //console.log(dData);
        for(var i = 0;i < dData.length;i++){
          dData[i].sumVote =  (dData[i].F_VirtualBallot)*1  +  (dData[i].VoteCount)*1;
        }
        var data={list:dData}
        var html = template('test', data);
         $('#prestopContent').html(html);
      }else {
        // 其他错误
        $('.modal').css('display', 'block')
        $('.modal-content').text('请检查网络后重新尝试！（scribe）')
      }
    },
    fail:function(res){
     $('.mask').css('display', 'none');
    }
  });

  // 点击错误提示确定按钮
    $('.modal-button').on('click',function(){
      $('.modal').css('display','none');
    })
    
});