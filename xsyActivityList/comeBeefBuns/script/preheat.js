$(function(){
  // 禁止网页下拉
  stopDrop();
  var domain = 'http://activity.xishaoye.com'
  var appkey = 'C7C90874E9A9FDE4'
  let timestamp = UnixtimeStamp()
  var openid = requestParam('openid');
  //var openid = 'oQfIG1G-TPLFSx1GDU0ENaAAU0ys';
  var activityId = "537687A4-093E-456A-B5D8-F7D91C197266";
  var page = '/comeBeefBuns/preheat.html';
  // 微信分享功能
  var dataPage = {'page': page + '?openid=' + openid}
  shareHandle(dataPage);
})