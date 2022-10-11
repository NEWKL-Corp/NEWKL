;(function($){ //자기실행함수
  $(function(){

    $('#fullpage').fullpage({
      licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
      autoscolling: true, // automatic 스크롤 사용 유무
      scrollhHorizontally: true, // true일 경우 스크롤이 위 아래로 움직인다.
      scrollingSpeed: 1200, // 스크롤 속도 (기본값 : 700)
      navigation : true, // pager 사용 유무
      navigationPosition : 'right'
    });
    
  });
})(jQuery);