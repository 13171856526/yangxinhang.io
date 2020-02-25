
/*底部切换*/
var backgrounds = [
    "img/icon/footer-01.png",
    "img/icon/footer-02.png",
    "img/icon/footer-03.png",
    "img/icon/footer-04.png",
    "img/icon/footer-05.png",
    "img/icon/footer-06.png",
    "img/icon/footer-07.png",
    "img/icon/footer-08.png",
    "img/icon/footer-09.png",
    "img/icon/footer-10.png",
];
var aLen = $("#footer a");
$("#footer a").tap(function () {
    $(this).addClass('active').siblings().removeClass('active');
    //遍历所有的a，找到span变成灰色
    aLen.each(function (i) {
        $(this).find('span').css('background-image', 'url(' + backgrounds[i + 4] + ')')
    })
    //点击哪个哪个变亮
    $(this).children('span').css('background-image', 'url(' + backgrounds[$(this).index()] + ')');
})
