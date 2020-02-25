
console.log($("main>div>div>div"))
function fenlei() {
    // 头部分类 精选 每日爆款 。。。
    // var vtli = $(".ma-headclassification li"); //获取需要点击的那个
    // var madiv = $("main>div>div>div");
    // vtli.tap(function () {
    //     var index = $(this).index();
    //     vtli.removeClass("active");
    //     $(this).addClass("active");
    //     madiv.hide();
    //     madiv.eq(index).show();
    // })
}

//轮播图
// function aa() {
//     var mySwiper = new Swiper('.swiper-container', {
//         loop: true, // 循环模式选项
//         // 如果需要分页器
//         pagination: {
//             el: '.swiper-pagination'
//         }
//     })
// }

function md() {


}


console.log(jingxuan)

var jingxuan = document.getElementById("#jingxuan")

touch.on(jingxuan,"swipeLeft",function(){//滑动时


    this.style.background="black"


});

// $("main").swiper(function () {
    // var index = $(this).index();
    // vtli.removeClass("active");
    // vtli.eq(index).addClass("active");

    // $(this).children().hide()

    // for (var i = 0; i < $(index); i++) {
    //     $(this).eq(index).show();
    // }
    // $(this).hide();
    // $("main>div").eq(index).show();
// })


function madiv() {

    for (var i = 0; i < $(index); i++) {
        var index = $(this).index();
        madiv.hide();
        madiv.eq(index).show();

    }
}