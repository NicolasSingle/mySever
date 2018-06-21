// var canvas = document.getElementById('canvas');
// if (canvas.getContext) {
//     console.log('你的浏览器支持Canvas!');
// } else {
//     console.log('你的浏览器不支持Canvas!');
// }

function draw () {
    // 获取canvas元素
    var canvas = document.getElementById("canvas");
    
    var clientWidth = document.documentElement.clientWidth;
    var clientHeight = document.documentElement.clientHeight;

    canvas.width = clientWidth;
    canvas.height = clientHeight;

    // 海报背景
    var firstDraw = new Promise((resolve, reject) => {
        // console.log("Bj success");
        var imgBj = new Image();
        imgBj.crossOrigin="anonymous"; //解决跨域

        imgBj.src = "image/poster_back_Iceland.jpg";
        // imgBj.src = "http://img2.imgtn.bdimg.com/it/u=3588772980,2454248748&fm=27&gp=0.jpg";
        imgBj.onload = function () { // 待图片加载完后，将其显示在canvas上
            var context = canvas.getContext('2d');
            context.drawImage(this, 0, 0, clientWidth, clientHeight); //this即是imgBj,位置0,0, 改变图片的大小到屏幕宽高
        }

        setTimeout(resolve, 10);
    })
    // 二维码
    firstDraw.then(() => {
        // console.log("code success");
        var imgCode = new Image();
        imgCode.crossOrigin="anonymous"; //解决跨域
        imgCode.src = "image/poster_code.png";
        // imgCode.src = "http://img2.imgtn.bdimg.com/it/u=3588772980,2454248748&fm=27&gp=0.jpg";
        imgCode.onload = function () {
            var context = canvas.getContext('2d');
            context.drawImage(this, 615, 890);
        }
    }).then(() => {
        // console.log("declaration success");
        // 宣言
        var imgDeclaration = new Image();
        imgDeclaration.crossOrigin="anonymous"; //解决跨域        
        imgDeclaration.src = "image/poster_declaration__TwobackRipening.png";
        // imgDeclaration.src = "http://img2.imgtn.bdimg.com/it/u=3588772980,2454248748&fm=27&gp=0.jpg";
        imgDeclaration.onload = function () {
            var context = canvas.getContext('2d');
            context.drawImage(this, 0, 1024);
            
            var dataURL = canvas.toDataURL("image/jpeg", 1.0);
            console.log(dataURL);
            
        }
    }).catch((err) => {
        console.log(err);
    })

}

window.onload = draw;