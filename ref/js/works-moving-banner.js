$(function(){
    var zIndexNumber = 1000;
    $('div').each(function() {
        $(this).css('zIndex', zIndexNumber);
        zIndexNumber = 1
    });
});


$(function(){
    $('.works-block.move-bottom').hover(function(){
		var $this = $(this);
		$this.css("z-index","10").addClass("active");
        $this.find(".works-detail").stop().animate({height:"160px"}, 200, function(){$this.find(".works-photo").addClass("active")}).animate({top:"-160px"}, 200);
		$this.find(".works-detail table tr td").css("display","block");
		$this.find(".works-detail table tr td p").css("display","block");
    }, function(){
		var $this = $(this);
		$this.css("z-index","1").removeClass("active");
        $this.find(".works-detail").stop().css("z-index","1").animate({height:"70px", top:"0px"}, 200);
		$this.find(".works-detail table tr td").css("display","none");
		$this.find(".works-detail table tr td p").css("display","none");
		$this.find(".works-photo").removeClass("active")
    });
});


$(function(){
    $('.works-block.move-right').hover(function(){
		var $this = $(this);
		$this.css("z-index","10").addClass("active");
        $this.find(".works-detail").stop().animate({height:"160px"}, 200, function(){$this.find(".works-photo").addClass("active")}).animate({right:"180px"}, 200);	
		$this.find(".works-detail table tr td").css("display","block");
		$this.find(".works-detail table tr td p").css("display","block");
    }, function(){
		var $this = $(this);
		$this.css("z-index","1").removeClass("active");
        $this.find(".works-detail").stop().animate({height:"70px", right:"0px"}, 200);
		$this.find(".works-detail table tr td").css("display","none");
		$this.find(".works-detail table tr td p").css("display","none");
		$this.find(".works-photo").removeClass("active")
    });
});