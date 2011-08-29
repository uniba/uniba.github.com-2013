var p5;

function processingInitComplete(){
    p5 = Processing.getInstanceById('logo');
    $(window).resize();
}

$(function() {

	var isiPad = navigator.userAgent.match(/iPad/i) != null;
	var isiPhone = navigator.userAgent.indexOf('iPhone') != -1;
			
	$(window).bind("resize", function(event){
		
		if( isiPad ) {
	
			//iPad用の処理
			var windowWidth = $(window).width()/2;
			if(Math.abs(window.orientation) === 90){
				//横向き
				var windowWidth = $(window).width()/2;
				var windowHeight = 374; //$(window).height();
				var windowScale = 0.3;
			}else{
				//縦向き
				var windowWidth = $(window).width()/2;
				var windowHeight = 374; //$(window).height();
				var windowScale = 0.3;
			}
			
		
		} else if (isiPhone) {
	
			//iPhone用の処理
			if(Math.abs(window.orientation) === 90){
				//横向き
				var windowWidth = $(window).width()/4;
				var windowHeight = 187; //$(window).height();
				var windowScale = 0.25;
			}else{
				//縦向き
				var windowWidth = $(window).width()/4;
				var windowHeight = 187; //$(window).height();
				var windowScale = 0.2;
			}
		
		} else {
	
			//iPad, iPhone以外の処理
			var windowWidth = $(window).width();
			var windowHeight = 748; //$(window).height();
			var windowScale = 1;
		
		}	
		if (p5) {
			p5.setStageSize(windowWidth, windowHeight, windowScale);
		}
			
	}).trigger("resize");
	
	$(window).bind("orientationchange", function(event){
		
		if( isiPad ) {
	
			//iPad用の処理
			var windowWidth = $(window).width()/2;
			if(Math.abs(window.orientation) === 90){
				//横向き
				var windowWidth = $(window).width()/2;
				var windowHeight = 374; //$(window).height();
				var windowScale = 0.3;
			}else{
				//縦向き
				var windowWidth = $(window).width()/2;
				var windowHeight = 374; //$(window).height();
				var windowScale = 0.5;
			}
			
		
		} else if (isiPhone) {
	
			//iPhone用の処理
			if(Math.abs(window.orientation) === 90){
				//横向き
				var windowWidth = $(window).width()/4;
				var windowHeight = 187; //$(window).height();
				var windowScale = 0.25;
			}else{
				//縦向き
				var windowWidth = $(window).width()/4;
				var windowHeight = 187; //$(window).height();
				var windowScale = 0.25;
			}
		
		} else {
	
			//iPad, iPhone以外の処理
			var windowWidth = $(window).width();
			var windowHeight = 748; //$(window).height();
			var windowScale = 1;
		
		}	
		if (p5) {
			p5.setStageSize(windowWidth, windowHeight, windowScale);
		}
			
	}).trigger("resize");
		
});