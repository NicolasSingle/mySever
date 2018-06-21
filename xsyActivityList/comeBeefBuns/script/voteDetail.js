$(function () {

  if (window.history && window.history.pushState) {
            $(window).on('popstate', function () {
            window.history.pushState('forward', null, '');
            window.history.forward(1);
            });
        }
            window.history.pushState('forward', null, ''); //在IE中必须得有这两行
            window.history.forward(1);
            
  $('.mask').css('display', 'block')
  // 禁止网页下拉
  stopDrop()
  var domain = 'http://activity.xishaoye.com'
  var appkey = 'C7C90874E9A9FDE4'
  var openid = requestParam('openid')
  //var openid = 'oQfIG1G-TPLFSx1GDU0ENaAAU0ys'
  var activityId = '537687A4-093E-456A-B5D8-F7D91C197266'
  var foodId = ''
  // 微信分享功能
  var page = '/comeBeefBuns/voteDetail.html'
  var dataPage = {'page': page + '?openid=' + openid}
  shareHandle(dataPage);
  // 发起请求获取战队列表
  let timestamp = UnixtimeStamp()
  var strData = {'activityId': activityId}
  $.ajax({
    url: domain + '/api/Food/GetList?appkey=' + appkey + '&timestamp=' + timestamp + '&sign=' + computedSign(strData, 'get', timestamp),
    type: 'get',
    data: strData,
    dataType: 'json',
    success: function (res) {
      $('.mask').css('display', 'none')
      if (res.Code == 0) {
        var dData = res.Data
        var data = {list: dData}
        var html = template('test', data)
        $('#centerContent').html(html)
      }else {
        // 其他错误
        $('.modal').css('display', 'block')
        $('.modal-content').text('请检查网络后重新尝试')
      }
    },
    fail: function () {
      $('.mask').css('display', 'none')
    }
  })
  //  点击选择按钮，进行选择
  $('#centerContent').on('click', '.row-selected-img', function () {
    foodId = $(this).attr('id')
    $(this).find('img').attr('src', './image/selected.png')
    $('.row-selected-img').not($(this)).find('img').attr('src', './image/no_choose.png')
  })
  //  点击加入战队，进行投票
  $('.vote-btn').on('click', function () {
    $('.mask').css('display', 'block')
    if (foodId == '' || !foodId) {
      // 其他错误
      $('.modal').css('display', 'block')
      $('.modal-content').text('请选择您要加入的战队！')
    }else {
      var submitData = [{'F_OpenId': openid,'F_FoodId': foodId}, 'model']
      // console.log(submitData)
      let timestamp = UnixtimeStamp()
      $.ajax({
        url: domain + '/api/ShareStatistic/AddVoteStatistic?appkey=' + appkey + '&timestamp=' + timestamp + '&sign=' + computedSign(submitData, 'post', timestamp),
        type: 'post',
        data: {'F_OpenId': openid,'F_FoodId': foodId},
        dataType: 'json',
        success: function (res) {
          $('.mask').css('display', 'none')
          if (res.Code == 0) {
            //  投票成功，跳转到结果页
             $('.success-modal-content').text('投票成功！');
            $('.success-modal').css('display', 'block')
          }else if (res.Code == 20000) {
            $('.modal').css('display', 'block')
            $('.modal-content').text('活动太火爆啦，请重新尝试！（20000）')
          }else if (res.Code == 20002) {
            // 活动未开始
            window.location.href = './preheat.html'
          }else if (res.Code == 20003) {
            // 活动已中止
            $('.prestop-modal').css('display', 'block')
          }else if (res.Code == 20004) {
            //已投过票
            $('.success-modal-content').text('您已完成投票！');
           $('.success-modal').css('display', 'block')
          }else {
            $('.modal').css('display', 'block')
            $('.modal-content').text('活动太火爆啦，请重新尝试！')
          }
        },
        fail: function () {
          $('.mask').css('display', 'none')
        }         
      })
    }
  })

  // 点击确定跳转
  $('.success-modal-button').on('click', function () {
    $('.success-modal').css('display', 'none')
    window.location.href = './result.html?openid=' + openid;
  })
  // 点击错误提示确定按钮
  $('.modal-button').on('click', function () {
    $('.modal').css('display', 'none')
  })
  // 中止投票弹窗
  $('.prestop-modal-button').on('click', function () {
    $('.prestop-modal').css('display', 'none')
    window.location.href = './prestop.html?openid=' + openid
  })
})
