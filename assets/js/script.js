	$(function(){
	
	  $(window).on('load scroll',function () {
  	  if ($(this).scrollTop() > 1) {
  	    $('#navWrap').removeClass('fixFoot');
  	  } else {
  	    $('#navWrap').addClass('fixFoot'); 	  
  	  }
	  });
	
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
   
  var $controls = $('#filter li'),
      $list = $('#worksGrid'),
      $data = $list.clone();
    
  var $preferences = {
    duration: 800,
    easing: 'easeInOutQuad',
    adjustHeight: 'dynamic',
    useScaling: true,
    attribute: function(v) {
                return $(v).find('img').attr('src');
               }
  };
  
  $controls.each(function(i) {
    $(this).find('a').bind('click', function(e) {
      var $button = $(this);
      var $button_container = $button.parent();     

      $('#filter li').removeClass('selected');
      $button_container.addClass('selected');
      var sorting_kind = $button.data('value');
      
      if(!$button.hasClass('selected')){
        
      if (sorting_kind == 'all') {
        var $filtered_data = $data.find('li');
      } else {
        var $filtered_data = $data.find('li.' + sorting_kind);
      }
        
      $list.quicksand($filtered_data, $preferences);
      
      }
      
      e.preventDefault();
    });
  }); 

	  
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