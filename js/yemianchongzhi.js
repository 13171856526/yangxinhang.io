

function setFont(){
    // 设置ui设计稿的宽度
    var uiW = 750;// 以iphon6为标准(UI设计师为的宽度)乘以2倍
    // 设备宽度（视口宽度）
    var winW = document.documentElement.clientWidth;
    // 设置比例
    var rate = winW/uiW;
    // 设置字体大小
    document.documentElement.style.fontSize = rate*100+"px";
}
setFont();