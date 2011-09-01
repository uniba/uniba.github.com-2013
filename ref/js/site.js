$(function(){
	var anchor = $("#anchor"),
		offset = anchor.offset(),
		topY = 48;
		
	$(window).scroll(function(){
		if ($(window).scrollTop() > offset.top ){
			anchor.stop().animate({
				top: $(window).scrollTop() - offset.top + anchor.height() + topY
			});
		} else {
			anchor.stop().animate({
				top: topY
			});
		}
	});
	
	$("a[href*='#']").easingScroll({
		easing: "easeOutExpo",
		duration: 600
	});
});