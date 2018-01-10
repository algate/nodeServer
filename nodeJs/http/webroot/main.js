function init(){
    var canvas=document.getElementById("canvas");
    var can=canvas.getContext("2d");
    var s=window.screen;//获取屏幕
    var w=canvas.width=s.width;//获取屏幕宽度
    var h=canvas.height=s.height;//获取屏幕高度
    //创建一个Worker对象，并向它传递将在新线程中执行的脚本url
    var worker = new Worker('MatrixWorker.js');
    //接收worker传递过来的数据
    worker.postMessage("Go to Worker");
    worker.onmessage = function(info){
        function draw(){
            console.log(info);
            //can.fillRect()画一个实心矩形:坐标x，坐标y，矩形宽，举行高
            can.fillStyle='rgba(0,0,0,0.04)'; //返回填充形状的当前风格，能被设置以用来改变当前的填充风格
            can.fillRect(0,0,w,h); // 用当前的填充风格填充给定的区域
            can.fillStyle=color();
            // can.fillStyle = "#000";
            info.data.words.map(function(y,n){
                var text=String.fromCharCode(Math.ceil(65+Math.random()*57)); //转换为键盘上值
                x = n*10;
                can.fillText(text,x,y);
                info.data.words[n]=( y > 900 + Math.random()*484 ? 0:y+10 );
                // console.log(words[n]);
            });//数组元素的一个映射
        }
        setInterval(draw,50);
    };
    var color = function(){
        return "#" + (function(color){
            return new Array(7-color.length).join("0")+color;
            //神奇的方法，总共字符串有6位，如果只产生了3位，则前面应该补三个0，在长度为7-3=4的空数组中利用join插入0，则为['',0,'',0,'',0,''],刚好三个0补在前面
        })((Math.random()*0x1000000 << 0).toString(16))
    };
};
init();