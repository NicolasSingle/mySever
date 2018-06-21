$(function () {
  // 禁止网页下拉
  stopDrop()
  $('.loading-qiu').animate({
    left: '360px'
  }, 2870)
  var domainCommon = new Domain()
  var domain = domainCommon.url
  // 获取openid 
  var code = requestParam('code')
  var appkey = domainCommon.appkey
  // 获取时间戳
  let timestamp = UnixtimeStamp()
  var openid = 'oQfIG1G-TPLFSx1GDU0ENaAAU0ys';
  isAttantion (openid);
  //  判断是否关注
  // 发起请求获取openid
  // $.ajax({
  //   url: domain + '/api/WeiXin/GetOpenId?appkey=' + appkey + '&timestamp=' + timestamp + '&sign=' + computedSign({ code: code }, 'get', timestamp),
  //   type: 'get',
  //   async: false,
  //   data: { code: code },
  //   dataType: 'json',
  //   success: function (res) {
  //     if (res.Code == 0) {
  //       openid = res.Data.openid
  //       isAttantion(openid)
  //     }else {
  //       $('.modal').css('display', 'block')
  //       $('.modal-content').text('获取失败（openid）,请稍候尝试！')
  //     }
  //   },
  //   fail: function () {
  //     $('.modal').css('display', 'block')
  //     $('.modal-content').text('检查网络,请稍候尝试！')
  //   }
  // })

  function isAttantion (openid) {
    // 检验是否关注
    var strData = {'openid': openid}
    $.ajax({
      url: domain + '/api/WeiXin/GetSubscribe?appkey=' + appkey + '&timestamp=' + timestamp + '&sign=' + computedSign(strData, 'get', timestamp),
      type: 'get',
      async: false,
      data: strData,
      dataType: 'json',
      success: function (res) {
        // console.log(res)
        if (res.Code == 0) {
          var dData = res.Data
          if (dData.subscribe == 1) {
            //  已经关注
            //voteHandle()
            // 判断是否是助力用户

          }else {
            // 未关注
            window.location.href = './attention.html';
          }
        }else {
          // 其他错误
          $('.modal').css('display', 'block')
          $('.modal-content').text('请检查网络后重新尝试！（scribe）')
        }
      },
      error: function () {
        $('.modal').css('display', 'block')
        $('.modal-content').text('请检查网络后重新尝试！（scribeError）')
      }
    })
  }
})
