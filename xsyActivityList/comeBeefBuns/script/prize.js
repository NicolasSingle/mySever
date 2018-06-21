$(function () {
  // 禁止网页下拉
  stopDrop()
  var domain = 'http://activity.xishaoye.com'
  var appkey = 'C7C90874E9A9FDE4'
  var openid = requestParam('openid')
   //var openid = 'oQfIG1G-TPLFSx1GDU0ENaAAU0ys'
  var activityId = '537687A4-093E-456A-B5D8-F7D91C197266'
  var page = '/comeBeefBuns/prize.html'
  $('.mask').css('display', 'block')
  // 微信分享功能
  var dataPage = {'page': page + '?openid=' + openid}
  shareHandle(dataPage)
  // 发起请求获取商品列表
  let timestamp = UnixtimeStamp()
  var strData = {'activityId': activityId};
  var bigNum;
  $.ajax({
    url: domain + '/api/Food/GetList?appkey=' + appkey + '&timestamp=' + timestamp + '&sign=' + computedSign(strData, 'get', timestamp),
    type: 'get',
    data: strData,
    dataType: 'json',
    success: function (res) {
      if (res.Code == 0) {
        var dData = res.Data
        for (var i = 0;i < dData.length;i++) {
          dData[i].sumVote = (dData[i].F_VirtualBallot) * 1 + (dData[i].VoteCount) * 1
        }
        var data = {list: dData}
        var html = template('test', data)
        $('#prizeList').html(html)
        bigNum = Math.round(10000 / (dData[0].sumVote))
        // console.log(bigNum)
        //  发起请求判断领奖状态
        checkUserWin(bigNum)
      }else {
        // 其他错误
        $('.mask').css('display', 'none')
        $('.modal').css('display', 'block')
        $('.modal-content').text('请检查网络后重新尝试！（scribe）')
      }
    }
  })
  // 判断用户是否中奖
  function checkUserWin (bigNum) {
    var dataParam = {'openId': openid,'activityId': activityId}
    $.ajax({
      url: domain + '/api/ShareStatistic/CheckUserWin?appkey=' + appkey + '&timestamp=' + timestamp + '&sign=' + computedSign(dataParam, 'get', timestamp),
      type: 'get',
      data: dataParam,
      dataType: 'json',
      success: function (res) {
        $('.mask').css('display', 'none')
        // console.log(res)
        if (res.Code == 0) {
          var dData = res.Data
          // 用户未中奖
          
          if (dData == 1) {
            $('.no-prize').css('display', 'block')
            $('.list-right-img-noprize').css('display', 'block')
          }else if (dData == 2) {
            // 用户已中奖未领奖
            $('.prize-bg').css('display', 'block')
            $('.prize-card-text').css('display', 'block')
            $('.list-right-img').css('display', 'block')
            $('.prize-btn').css('display', 'block')
            $('.list-right-img-noprize').css('display', 'none')
            var text = '您加入的战队夺冠，<br />每位战队成员瓜分到' + bigNum + '个泡椒牛肉夹馍~<br />快抱走你的肉夹馍！'
            $('.prize-center-text').html(text)
          }else if (dData == 3) {
            // 用户已中奖已领奖
            $('.prize-card-text').css('display', 'block')
            $('.prize-bg').css('display', 'block')
            $('.list-right-img').css('display', 'block')
            $('.noprize-btn').css('display', 'block')
            $('.list-right-img-noprize').css('display', 'none')
            var text = '恭喜您瓜分到' + bigNum + '个泡椒牛肉夹馍，<br />点击微信卡券查看兑换券'
            $('.prize-center-text').html(text)
          }
        }else {
          // 其他错误
          $('.modal').css('display', 'block')
          $('.modal-content').text('请检查网络后重新尝试！（scribe）')
        }
      },
      fail: function (res) {}
    })
  }
  // 点击领取奖品进行领奖
  $('#getCard').on('click', function () {
    $('.mask').css('display', 'block')
    let timestamp = UnixtimeStamp()
    // var cardData = {'activityId':activityId,'openId':openid}
    $.ajax({
      url: domain + '/api/WeiXin/GetCardListById?appkey=' + appkey + '&timestamp=' + timestamp + '&sign=' + computedSign({}, 'get', timestamp),
      type: 'get',
      dataType: 'json',
      success: function (res) {
        $('.mask').css('display', 'none');
        //console.log(bigNum);
        var data = res.Data
        // console.log(data)
        if (res.Code == 0) {
          wx.addCard({
            cardList: [
              {
                cardId: data.cardId,
                cardExt: JSON.stringify(data.cardExt)
              }
            ],
            success: function (res) {
              userCard();
              $('.noprize-btn').css('display', 'block')
              $('.prize-btn').css('display', 'none');
              //console.log(bigNum);
              var text = '恭喜您瓜分到' + bigNum + '个泡椒牛肉夹馍，<br />点击微信卡券查看兑换券';
              $('.prize-center-text').html(text);
            },
            
          })
        }else {
          // 其他错误
          $('.modal').css('display', 'block')
          $('.modal-content').text('请检查网络后重新尝试！（card）')
        }
      },
      fail: function () {
        // 其他错误
        $('.modal').css('display', 'block')
        $('.modal-content').text('请检查网络后重新尝试！（card）')
      }
    })
  })

  // 领取成功标识
   function userCard(){
      var cardData = {'activityId':activityId,'openId':openid}
    $.ajax({
      url: domain + '/api/ShareStatistic/UserGetCard?appkey=' + appkey + '&timestamp=' + timestamp + '&sign=' + computedSign(cardData, 'get', timestamp),
      type: 'get',
      data:cardData,
      dataType: 'json',
      success: function (res) {
        if(res.Code == 0){
          
        }else {

        }
      },
      fail:function(){

      }
    });
   };
  // 点击错误提示确定按钮
  $('.modal-button').on('click', function () {
    $('.modal').css('display', 'none')
  })
})
