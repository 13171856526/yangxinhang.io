// -------------------------------------------------------------------------------------
//暂时设计每个slide大小需要一致
barwidth = 36 //导航粉色条的长度px
tSpeed = 300 //切换速度300ms
var navSwiper = new Swiper('#nav', {
    slidesPerView: 6,
    freeMode: true,
    on: {
        init: function () {
            navSlideWidth = this.slides.eq(0).css('width'); //导航字数需要统一,每个导航宽度一致
            bar = this.$el.find('.bar')
            bar.css('width', navSlideWidth)
            bar.transition(tSpeed)
            navSum = this.slides[this.slides.length - 1].offsetLeft //最后一个slide的位置

            clientWidth = parseInt(this.$wrapperEl.css('width')) //Nav的可视宽度
            navWidth = 0
            for (i = 0; i < this.slides.length; i++) {
                navWidth += parseInt(this.slides.eq(i).css('width'))
            }

            topBar = this.$el.parents('body').find('#top') //页头

        },

    },
});

var pageSwiper = new Swiper('#page', {
    watchSlidesProgress: true,
    resistanceRatio: 0,
    on: {
        touchMove: function () {
            progress = this.progress
            bar.transition(0)
            bar.transform('translateX(' + navSum * progress + 'px)')
            //粉色255,72,145灰色51,51,51
            for (i = 0; i < this.slides.length; i++) {
                slideProgress = this.slides[i].progress
                if (Math.abs(slideProgress) < 1) {
                    r = Math.floor((255 - 51) * (1 - Math.pow(Math.abs(slideProgress), 2)) + 51)
                    g = Math.floor((72 - 51) * (1 - Math.pow(Math.abs(slideProgress), 2)) + 51)
                    b = Math.floor((145 - 51) * (1 - Math.pow(Math.abs(slideProgress), 2)) + 51)
                    navSwiper.slides.eq(i).find('span').css('color', 'rgba(' + r + ',' + g + ',' + b +
                        ',1)')
                }
            }
        },
        transitionStart: function () {
            activeIndex = this.activeIndex
            activeSlidePosition = navSwiper.slides[activeIndex].offsetLeft
            //释放时导航粉色条移动过渡
            bar.transition(tSpeed)
            bar.transform('translateX(' + activeSlidePosition + 'px)')
            //释放时文字变色过渡
            navSwiper.slides.eq(activeIndex).find('span').transition(tSpeed)
            navSwiper.slides.eq(activeIndex).find('span').css('color', 'rgba(255,72,145,1)')
            if (activeIndex > 0) {
                navSwiper.slides.eq(activeIndex - 1).find('span').transition(tSpeed)
                navSwiper.slides.eq(activeIndex - 1).find('span').css('color', 'rgba(51,51,51,1)')
            }
            if (activeIndex < this.slides.length) {
                navSwiper.slides.eq(activeIndex + 1).find('span').transition(tSpeed)
                navSwiper.slides.eq(activeIndex + 1).find('span').css('color', 'rgba(51,51,51,1)')
            }
            //导航居中
            navActiveSlideLeft = navSwiper.slides[activeIndex].offsetLeft //activeSlide距左边的距离

            navSwiper.setTransition(tSpeed)
            if (navActiveSlideLeft < (clientWidth - parseInt(navSlideWidth)) / 2) {
                navSwiper.setTranslate(0)
            } else if (navActiveSlideLeft > navWidth - (parseInt(navSlideWidth) + clientWidth) / 2) {
                navSwiper.setTranslate(clientWidth - navWidth)
            } else {
                navSwiper.setTranslate((clientWidth - parseInt(navSlideWidth)) / 2 - navActiveSlideLeft)
            }

        },
    }
});

navSwiper.$el.on('touchstart', function (e) {
    e.preventDefault() //去掉按压阴影
})
navSwiper.on('tap', function (e) {

    clickIndex = this.clickedIndex
    clickSlide = this.slides.eq(clickIndex)
    pageSwiper.slideTo(clickIndex, 0);
    this.slides.find('span').css('color', 'rgba(51,51,51,1)');
    clickSlide.find('span').css('color', 'rgba(255,72,145,1)');
})



//内容滚动
var scrollSwiper = new Swiper('.scroll', {
    //65是头部的高
    //36是top地址和搜索的高

    slidesOffsetBefore: 82,
    direction: 'vertical',
    freeMode: true,
    slidesPerView: 'auto',

    mousewheel: {
        releaseOnEdges: true,
    },
    on: {
        touchMove: function () {

            if (this.translate > 72 - 36 && this.translate < 72) {
                topBar.transform('translateY(' + (this.translate - 72) + 'px)');
            }

        },
        touchStart: function () {
            startPosition = this.translate
        },
        touchEnd: function () {
            topBar.transition(tSpeed)
            if (this.translate > 36 && this.translate < 72 && this.translate < startPosition) {
                topBar.transform('translateY(-36px)');
                for (sc = 0; sc < scrollSwiper.length; sc++) {
                    if (scrollSwiper[sc].translate > 36) {
                        scrollSwiper[sc].setTransition(tSpeed);
                        scrollSwiper[sc].setTranslate(36)
                    }
                }
            }
            if (this.translate > 36 && this.translate < 72 && this.translate > startPosition) {
                topBar.transform('translateY(0px)');
                for (sc = 0; sc < scrollSwiper.length; sc++) {
                    if (scrollSwiper[sc].translate < 72 && scrollSwiper[sc].translate > 0) {
                        scrollSwiper[sc].setTransition(tSpeed);
                        scrollSwiper[sc].setTranslate(72)
                    }
                }

            }
        },

        transitionStart: function () {

            topBar.transition(tSpeed)
            if (this.translate < 72 - 36) {
                topBar.transform('translateY(-36px)');
                if (scrollSwiper) {
                    for (sc = 0; sc < scrollSwiper.length; sc++) {
                        if (scrollSwiper[sc].translate > 36) {
                            scrollSwiper[sc].setTransition(tSpeed);
                            scrollSwiper[sc].setTranslate(36)
                        }
                    }
                }

            } else {
                topBar.transform('translateY(0px)');

                if (scrollSwiper) {
                    for (sc = 0; sc < scrollSwiper.length; sc++) {
                        if (scrollSwiper[sc].translate < 72 && scrollSwiper[sc].translate > 0) {
                            scrollSwiper[sc].setTransition(tSpeed);
                            scrollSwiper[sc].setTranslate(72)
                        }
                    }
                }
            }
        },
    }

})


//轮播
var bannerSwiper = new Swiper('.banner', {
    loop: true,
    autoplay: true,
    pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
            return '<span class="' + currentClass + '"></span>' + '/' + '<span class="' + totalClass +
                '"></span>';
        },
    },
});
// -----------------------------------------------------------------------------------------
/*分类切换*/
var vtli = $(".left>ul>li"); //获取 点击那个登录方式
var vd = $(".main>div"); //获取  根据点击的 显示对应div
vtli.click(function () { //Zepto.js的tap事件
    var index = $(this).index(); //获取你要点击 那个 li
    console.log(index);

    vtli.removeClass("active");
    $(this).addClass("active");
    vd.hide(); //隐藏所有
    vd.eq(index).show();
});

var topfl = $(".top-fenlei");
var ycfl = $(".yincangfenlei");
var ycfla = $(".footer-a")
topfl.click(function () {
    ycfl.show().addClass('animated bounceInRight');
    setTimeout(function () {
        $('#jq22').removeClass('bounce');
    }, 1000);
})

ycfla.click(function () {
    ycfl.hide();
})

//屏幕滚动
function autoScroll(obj) {
    $(".scroll_screen ul").animate({
        marginTop: "-34px"
    }, 500, function () {
        $(this).css({
            marginTop: "0px"
        }).find("li:first").appendTo(this);
    })
}
$(function () {
    if ($(".scroll_screen ul li").length > 2) {
        setInterval('autoScroll(".scroll_screen")', 2000);
    }
})
// -----------------------------------------------------------------------------------------



// ------------------------------------------------------------------------------------
var intDiff = parseInt(2960); //倒计时总秒数量
function timer(intDiff) {
    window.setInterval(function () {
        var day = 0,
            hour = 0,
            minute = 0,
            second = 0; //时间默认值
        if (intDiff > 0) {

            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        $('#minute_show').html('<s></s>' + minute + '分');
        $('#second_show').html('<s></s>' + second + '秒');
        intDiff--;
    }, 1000);
}
$(function () {
    timer(intDiff);
});
// -------------------------------------------------------------------------------------

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
















