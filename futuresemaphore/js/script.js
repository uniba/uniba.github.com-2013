$(function() {

  function calcParallax(tileheight, speedratio, scrollposition) {
    //    by Brett Taylor http://inner.geek.nz/
    //    originally published at http://inner.geek.nz/javascript/parallax/
    //    usable under terms of CC-BY 3.0 licence
    //    http://creativecommons.org/licenses/by/3.0/
    return ((tileheight) - (Math.floor(scrollposition / speedratio) % (tileheight+1)));
  }

  window.onload = (function() {
    window.onscroll = (function() {
      var posY = (document.documentElement.scrollTop) ? document.documentElement.scrollTop : window.pageYOffset;

      var ground = document.getElementById('ground');
      var groundparallax = calcParallax(3020, 1.5, posY);
      ground.style.backgroundPosition = "0 " + groundparallax + "px";
    });
  });

  $(window).resize(function(){
    var bgWidth = $(window).width();
    var bgHeight = $(window).height();

    $("p5_canvas").css({width:bgWidth,height:bgHeight});

    var parallaxBg = $(".parallax-bg");
    if(bgWidth < 1280){
      $(parallaxBg).css({backgroundSize:"1280px"});
    }else{
      $(parallaxBg).css({backgroundSize:"100%"});
    }
  });

  //pagescroll
  var scrollBtn = $(".scroll-btn");
  $(scrollBtn).click(function () {
    var i = $(scrollBtn).index(this);
    var p = $(".section").eq(i).offset().top-40;
    $('html,body').animate({ scrollTop: p }, 'slow');
    return false;
  });

  //logo-small fade
  var fadeLogo = $(".logo-small");
  $(fadeLogo).hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 750) {
      $(fadeLogo).fadeIn();
    } else {
      $(fadeLogo).fadeOut();
    }
  });


});

