	$(function(){
	
 	 $('#nav').parent().waypoint(function(event, direction) {
	 	  $(this).toggleClass('fixed', direction === "down");
	 	  event.stopPropagation();
	  });
	  
	  $('section').waypoint(function(event, direction) {
	    var $active = $(this);
	    var atr = $('a[href=#'+$active.attr('id')+']');
	    if (direction === "up") {
 	     $active = $active.prev();
 	   }
	    $('.active').removeClass('active');
	    $('a[href=#'+$active.attr('id')+']').addClass('active');
	  });
	  
/*
	  $('#about').waypoint(function(event, direction) {
	    $('.rocket').animate({right:0},2000,'easeOutQuad');
	    setTimeout(function(){
 	     setInterval(rotateimg, Interval);
	    }, 1200);
	  });
*/
	  
	  setInterval(rotateimg, Interval);
	  
   var rotateCont = $('#aRotation'),
       Interval = 100,
       animPosition = 10,
       animWidth = 200
   
   function rotateimg(){
     i = 1;
     var rotateEl = rotateCont.find('li');
     var el = rotateEl.eq(0);
      rotateCont.stop().animate({right: '+=' + animPosition + 'px' },animWidth); 
   }
	  
  	$('a[href*=#]').click(function() {
  		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
  			var $target = $(this.hash);
  				$target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
  			if ($target.length) {
  				var targetOffset = $target.offset().top;
  				$('html,body').animate({scrollTop: targetOffset}, {duration:500},'easeInOutExpo');
  				return false;
  			}
  		}
  	});
  	
	});
	
	$(window).on('load resize',function(){
		 var vH = $('#visual').height();
		 $('#header').css('height',vH);
	});
	$(window).on('load scroll',function(){
 	 var offset = $('#about h1').offset();
	});