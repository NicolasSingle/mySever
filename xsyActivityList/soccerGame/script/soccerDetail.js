$(function () {
  // 进球特效
  // $('.socccer-football,.soccer-text').on('click', function () {
  //   $('.soccer-jiantou>img,.soccer-football-quily,.soccer-text>img').css('display', 'none');
  //   $('.fly-football').css('display', 'block')
  //   $('.fly-football').animate({bottom: '200px',height: '500px'}, 400, 'linear', function () {
  //     $('.fly-football').animate({bottom: '620px',height: '199px'}, 400, 'linear', function () {
  //       $('.fly-football').animate({bottom: '720px',left:'60px',width:'60px',height:'60px'}, 400, 'linear', function () {
  //         $('.fly-football').addClass('fly-football-small');
  //         $('.soccer-door').attr('src','./image/soccerDetail_isdoor.png');
  //       });
  //     });
  //   });
  // });
// 未进球特效
 $('.socccer-football,.soccer-text').on('click', function () {
   $('.fly-football').css({'transform':'rotate(20deg)'})
    $('.soccer-jiantou>img,.soccer-football-quily,.soccer-text>img').css('display', 'none');
    $('.fly-football').css('display', 'block')
    $('.fly-football').animate({bottom: '500px',left:'100px',height: '300px'}, 400, 'linear', function () {
      $('.fly-football').animate({bottom: '780px',left:'270px',height: '199px',width:'60px',height:'60px'}, 400, 'linear', function () {
        $('.fly-football').animate({bottom: '840px',left:'350px',width:'60px',height:'60px'}, 400, 'linear', function () {
          $('.fly-football').addClass('fly-football-small');
          // 未进球
        });
      });
    });
  });


});
