$(function(){function e(e,t,n){return e-Math.floor(n/t)%(e+1)}var t=$("#ground");$(function(){var e=$(window).width();e<1280?$(t).css({backgroundSize:"1280px"}):$(t).css({backgroundSize:"100%"})});window.onload=function(){window.onscroll=function(){var t=$(window).width(),n=document.documentElement.scrollTop?document.documentElement.scrollTop:window.pageYOffset,r=document.getElementById("ground"),i=e(1733,8,n);r.style.backgroundPosition="0 "+i+"px";t<1280?$(r).css({backgroundSize:"1280px"}):$(r).css({backgroundSize:"100%"})}};$(window).resize(function(){var e=$(window).width(),t=$(window).height();$("#ground").css({top:"0"});$("p5_canvas").css({width:e,height:t});var n=$("#ground");e<1280?$(n).css({backgroundSize:"1280px"}):$(n).css({backgroundSize:"100%"})});var n=$(".scroll-btn");$(n).click(function(){var e=$(n).index(this),t=$(".section").eq(e).offset().top-40;$("html,body").animate({scrollTop:t},"slow");return!1});var r=$(".logo-small");$(r).hide();$(window).scroll(function(){$(this).scrollTop()>750?$(r).fadeIn():$(r).fadeOut()})});