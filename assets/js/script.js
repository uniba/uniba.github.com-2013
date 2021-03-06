  /**
   * ready "fonts.com"
   */

 window.onload=function() {
     var mtiTracking = document.createElement('link');
     mtiTracking.type='text/css';
     mtiTracking.rel='stylesheet';
     mtiTracking.href=('https:'==document.location.protocol?'https:':'http:') + '//fast.fonts.com/t/1.css';
     (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild( mtiTracking );
}

/**
 * Rotation plugin.
 */

$.fn.rotator = function(options) {
  var animated
    , width = 0
    , rotator = new Rotator()
    , $cloned
    , $this = $(this);
  
  function Rotator($el) {
    this.$el = $el;
  }
  
  Rotator.prototype.start = function() {
    animated = true;
    (function() {
      if (animated) {
        if (parseInt($this.css('left'), 10) < -width) {
          $this.css({ left: (width + parseInt($cloned.css('left'))) - 5 });
        }
        if (parseInt($cloned.css('left'), 10) < -width) {
          $cloned.css({ left: (width + parseInt($this.css('left'))) - 5 });
        }
        $cloned.animate({ left: '-=600px' }, 10000, 'linear');
        $this.animate({ left: '-=600px' }, 10000, 'linear', arguments.callee);
      }
    })();
  };
  
  Rotator.prototype.stop = function() {
    animated = false;
  };
  
  $this.find('li img').each(function() {
    width += $(this).width();
  });
  
  $this.width(width);
  $cloned = $this.clone();
  
  /**
   * Clone list.
   */
  
  $cloned.css({ left: width }).appendTo($this.parent());
  
  
  rotator.start();
  
  return $this.data('rotator', rotator);
};


$(function() {

  /**
   * DOM dependencies.
   */

  var $window = $(window)
    , $nav = $('#nav')
    , $footer = $('#footer');

  /**
   * Fixed navigation.
   */

  $nav.parent().waypoint(function(event, direction) {
    $(this).toggleClass('fixed', direction === "down");
    $(this).toggleClass('nonfixed', direction === "up");
    event.stopPropagation(); 
  },{offset:-62});

  /**
   * Scroll spy.
   */

  $('section').waypoint(function(event, direction) {
    var $active = $(this);
    if (direction === "up") {
      $active = $active.prev();
    }
    $('.active').removeClass('active');
    $('a[href=#'+$active.attr('id')+']').addClass('active');
  },{offset:100});


  /**
   * Scaling transition on hover
   *
   * TODO: may be it is obtrusive script. should move to stylesheets.
   */

    $('.gMap a').hover(function(){
      $(this).prev().css('color','green');
    },function(){
      $(this).prev().css('color','black');
    });

    $('.close').click(function(){
      $(this).parent().hide();
    });
    $('.house').on('mouseenter',function(){
      $(this).animate({opacity:0.7},0,function(){
      $(this).animate({opacity:1},300);
      });
      
    });
  
  /**
   * Works category filtring.
   *
   * TODO: masonry plugin + css3 transition is much better?
   */

  var $controls = $('#filter li'),
      $list = $('.worksGrid'),
      $data = $list.clone();

  var $preferences = {
    duration: 600,
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

      if(!$button.hasClass('selected')) {
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

  /**
   * In-page anchor.
   */

  $('#nav a[href*=#]').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var $target = $(this.hash);
      $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
      if($(this).attr('href') == '#header'){
        var targetOffset = $target.offset().top;
      } else {
        var targetOffset = $target.offset().top + 20;
      }
      if ($target.length) {
        $('html,body').animate({scrollTop: targetOffset}, {duration:500},'easeOutExpo');
        return false;
      }
    }
  });

	 $('.worksGrid li').live(
			'mouseenter',function(){
			   $('.worksGrid').addClass('gridActive');
				  $(this).addClass('workActive');
	 });
	
		$('.worksGrid li').live(
			'mouseleave',function(){
			   $('.worksGrid').removeClass('gridActive');
			   $('.worksGrid li').removeClass('workActive');
		}); 
	
});

$(function() {  
    var theWindow = $(window),
    $bg = $("#exhibision2013"),
    aspectRatio = $bg.width() / $bg.height();
 
    function resizeBg() {
        if ( (theWindow.width() / theWindow.height()) < aspectRatio ) {
            $bg
                .removeClass()
                .addClass('bgheight');
        } else {
            $bg
                .removeClass()
                .addClass('bgwidth');
        }
    }
    theWindow.resize(function() {
        resizeBg();
    }).trigger("resize");
});

$(function() {
  var $nav = $('nav#nav')
    , $window = $(window);

  /**
   * Resize logo and background.
   */

  $window.on('resize orientationchange', function(e) {
    var width = $window.width()
      , height = $window.height();
      
    /**
     * Semaphore
     */
    $('#exhibision2013').height(height);

    /**
     * Half stage height for portrait view.
     */
    
    if ('orientation' in window && 0 === window.orientation) {
      height /= 2;
    }
    
    /**
     * FIXME: p5 stage height does not smaller than 600px. workaround :-P
     */
    
    if (height < 600) {
      height = 600;
    }
    
    /**
     * Apply size.
     */
    
    if (window.renderer) {
      window.renderer.setSize(width, height);
    }
    if (window.p5) {
      // TODO: avoid flicking.
      window.p5.setSize(width, height);
    }
  }).trigger('resize');
});

/**
 * Captures logo blended with background.
 */

$(window).on('keypress', function(e) {
  if (115 == e.charCode) {
    // on 's' key pressed
    var offscreenCanvas = document.createElement('canvas')
      , ctx = offscreenCanvas.getContext('2d')
      , logo = $('#webglcontainer').find('canvas').get(0)
      , background = $('#p5container').get(0);

    offscreenCanvas.width = background.width;
    offscreenCanvas.height = background.height;

    ctx.drawImage(background, 0, 0, background.width, background.height);
    ctx.drawImage(logo, 0, 0, logo.width, logo.height);
    window.open(offscreenCanvas.toDataURL());
  }
});

/**
 * Apply homebrew rotation plugin.
 */

$(function() {
  $('#aRotation').rotator({});
});

/**
 * Apply pageSlide plugin.
 */
 
$(function() {
  $('a.facebook').pageslide({ direction: 'left' });
});

/**
 * Gravatar.
 */

$(function() {
  var gravatar = require('gravatar-component/gravatar.js');
  
  $('[data-gravatar-id]').each(function(el, index) {
    var $this = $(this)
      , id = $this.data('gravatar-id')
      , avatar = gravatar.img(id);
    
    this.src = avatar.src;
  });
});
