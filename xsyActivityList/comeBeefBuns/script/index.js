$(function () {
  // 禁止网页下拉
  stopDrop()
  var page = '/cardactivity/html/load.html'
  var domain = 'http://activity.xishaoye.com'
  // 获取openid 
  var code = requestParam('code')
  var appkey = 'C7C90874E9A9FDE4'
  // 获取时间戳
  let timestamp = UnixtimeStamp()
  // var openid = 'oQfIG1G-TPLFSx1GDU0ENaAAU0ys'
  var openid
  var activityId = '537687A4-093E-456A-B5D8-F7D91C197266'
  // 发起请求获取openid
  $.ajax({
    url: domain + '/api/WeiXin/GetOpenId?appkey=' + appkey + '&timestamp=' + timestamp + '&sign=' + computedSign({ code: code }, 'get', timestamp),
    type: 'get',
    async: false,
    data: { code: code },
    dataType: 'json',
    success: function (res) {
      if (res.Code == 0) {
        openid = res.Data.openid
        voteHandle(openid)
      }else {
        $('.modal').css('display', 'block')
        $('.modal-content').text('获取失败（openid）,请稍候尝试！')
      }
    },
    fail: function () {
      $('.modal').css('display', 'block')
      $('.modal-content').text('检查网络,请稍候尝试！')
    }
  })

  function voteHandle (openid) {
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
          window.location.href = './main.html?openid=' + openid;
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
  // 点击错误提示确定按钮
  $('.modal-button').on('click', function () {
    $('.modal').css('display', 'none')
  })
})
