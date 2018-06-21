$(function(){
  if (window.history && window.history.pushState) {
            $(window).on('popstate', function () {
            window.history.pushState('forward', null, '');
            window.history.forward(1);
            });
        }
            window.history.pushState('forward', null, ''); //在IE中必须得有这两行
            window.history.forward(1);
  $('.mask').css('display','block');
  shareHandle(dataPage);
  // 禁止网页下拉
  stopDrop()
  var domain = 'http://activity.xishaoye.com'
  var appkey = 'C7C90874E9A9FDE4'
  var openid = requestParam('openid');
  var pageCode = requestParam('pagecode');
  var openid = 'oQfIG1G-TPLFSx1GDU0ENaAAU0ys';
  var activityId = '537687A4-093E-456A-B5D8-F7D91C197266';
  var page = '/comeBeefBuns/result.html';
  // 微信分享功能
  var dataPage = {'page': page + '?openid=' + openid};
  // 拉取投票列表
  // 发起请求获取战队列表
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
        var arr = [];
        for(var i = 0;i < dData.length;i++){
          dData[i].sumVote =  (dData[i].F_VirtualBallot)*1  +  (dData[i].VoteCount)*1;
          dData[i].precent = ((dData[i].sumVote)/10000).toFixed(2);
          arr.push( dData[i].precent);
        }
        var data={list:dData}
        var html = template('test', data);
        var htmlBg = template('testBg', data);
         $('#reslutContent').html(html);
         $('#reslutBg').html(htmlBg);
        //console.log(arr);
         progressLine(arr);
      }else {
        // 其他错误
        $('.modal').css('display', 'block')
        $('.modal-content').text('请检查网络后重新尝试！（scribe）')
      }
    },
    fail:function(res){
     $('.mask').css('display', 'none');
    }
  })

// 点击分享按钮，引导分享模板
$('#showShareHandle').on('click',function(){
  //console.log(1111);
  $('.share-page').css('display','block');
})
// 点击蒙版关闭
$('.share-page').on('click',function(){
   $('.share-page').css('display','none');
});
// 获取屏幕的高度
var bodyHeight = $(window).height();
//console.log(bodyHeight);
if(bodyHeight > 1334){
   $('.result-bottom-show').css({'position':'fixed','bottom':0}); 
    $('.result-bottom-content').css({'position':'fixed','bottom':0}); 
}else {

}
})