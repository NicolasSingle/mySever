
 var Vote={};
Vote.ListShow=(function(){
    var longWidth;
    var percentArr=[];
    var shortWidth=[];
    var spanArr=[];
    
    /*初始化*/
    function init(o){
        voteId=o.id;
        longWidth=o.width;
        percentArr=o.percent;
        shortWidth=calWidth();
        spanArr=findSpans();
    }
    /*根据百分比计每个算span的实际宽度*/
    function calWidth(){
        var arr=[];
        for(var i=0;i<percentArr.length;i++){
            var tempLength=percentArr[i]*longWidth;
            arr.push(tempLength);
        }
        return arr;
    }
    /*将全部span存为一个数组*/
    function findSpans(){
        var litems=$("#"+voteId).find(".litem");
        var arr=[]
        for(var i=0;i<litems.length;i++){
            arr.push(litems[i].children[0]);
        }
        return arr;
    }
    /*每个span元素设置宽度*/
    function setWidth(){
        for(i=0;i<percentArr.length;i++){
            $(spanArr[i]).animate({width:shortWidth[i]+"px"},3000); 
        }
        
    }
    return {init:init,set:setWidth};
})();

// 禁止微信浏览器下拉
function stopDrop() {
    var lastY;//最后一次y坐标点
    $(document.body).on('touchstart', function(event) {
        lastY = event.originalEvent.changedTouches[0].clientY;//点击屏幕时记录最后一次Y度坐标。
    });
    $(document.body).on('touchmove', function(event) {
        var y = event.originalEvent.changedTouches[0].clientY;
        var st = $(this).scrollTop(); //滚动条高度  
        if (y >= lastY && st <= 10) {//如果滚动条高度小于0，可以理解为到顶了，且是下拉情况下，阻止touchmove事件。
            lastY = y;
            event.preventDefault();
        }
        lastY = y;
 
    });
}

 //比较num的大小
    function compare(num1,num2){
        if(num1 > num2){
            return num1;
        }else{
            return num2;
        }
    }
    // 计算出总数
    function test(num){
        var sum = 0;
        if(num <= 800){
            sum = 1000;
        }else {
            var temp = (num-800)/500;
            sum = 1000 + 500 * (Math.floor(temp) + 1);
        }
        return sum;
    } 


     // 投票滚动条
var progressLine = function(value1,value2){
  var sum = test(compare(value1,value2));
    var percent1 = (value1/sum).toFixed(2);
    var percent2 = (value2/sum).toFixed(2);
  /*调用*/
  // 当结果页显示的时候开始执行进度条动画
 if($("#showResult").attr("index") != "undefined"){
    setTimeout(function(){
      Vote.ListShow.init(
{
    id:'appVoteBox',
    width:498,
    percent:[percent1,percent2],
});
Vote.ListShow.set();
    },400)
}
} 

//获取url参数
  var requestParam = function (paras){   
        var url = location.href; 
        var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");   
        var paraObj = {}   
        for (i=0; j=paraString[i]; i++){   
            paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);   
        }   
        var returnValue = paraObj[paras.toLowerCase()];   
        if(typeof(returnValue)=="undefined"){   
            return "";   
        }else{   
            return returnValue;   
        }   
}  


