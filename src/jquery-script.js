// 화면에 꽉 차도록
let innerheight = document.body;
innerheight.style.minHeight = Number(window.innerHeight) + 'px';

// 메인 풀 페이지 슬라이드
const swiper = new Swiper('#wrap', {
    direction: 'vertical', //수직으로 슬라이드
    mousewheel: true, //마우스휠을 사용하여 동작가능
    speed: 1200, //영역 전환속도
}); //end:wrapSwiper();

const swiper2 = new Swiper('#yt_slide', {
    // autoplay: {
    // 	delay: 4000,
    // 	disableOnInteraction: false,
    // },
    pagination: {
        el: '.swiper-pagination',
    },
    clickable: true,
    renderBullet: function (index, aaa) {
        return '<span class="' + aaa + '">' + (index + 1) + '</span>';
    },
});
