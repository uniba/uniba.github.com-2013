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
	  
	  $('.close').click(function(){
 	   $(this).parent().hide();
	  });
	  
   var $rotateCont = $('#aRotation'),
       $rotateChild = $rotateCont.children();
       $rotateWidth = $('#aRotation').children().width();
   
   console.log($rotateWidth);
   $rotateChild.clone().appendTo($rotateCont);
   
   function rotateimg () {
      $rotateCont.stop().animate({right: '+=' + 1 + 'px' },0); 
   }
   
   function startTimer () {
     timer = setInterval(rotateimg, 20);
   }
   
   function stopTimer () {
     clearInterval(timer);
   }
   
   $rotateCont.on({
     mouseenter: function () {
         stopTimer();
     },
     mouseleave: function () {
         startTimer();
     }
   });
   
   timer = setInterval(rotateimg, 20);
	  
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