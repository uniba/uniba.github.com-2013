$(function(){
	// アンカーリンク時は動作させない
	var hashName = location.hash;
	if(!hashName)
	{
		// スクロールに従って表示
		viewScroll();
	}
});

// スクロールに従って表示
function viewScroll()
{
	// 初期設定
	var name	= '.screenshots';	// 対象のクラス名
	var MSIE	= /*@cc_on!@*/false;
	var objFlg	= new Array();
	var objH	= new Array();
	var lastFlg	= false;
	
	$(name).each(function(i){
		// 表示判定用
		objFlg[i]	= false;
		
		// 高さ取得
		objH[i]	= $(this).offset().top;
	});
	// 消去
	$(name).hide();
	
	// スクロール前チェック
	viewCheck(name, MSIE, objFlg, objH);
	
	// スクロール毎チェック
	$(window).scroll(function()
	{
		// 表示判定
		if(!lastFlg)
		{
			viewCheck(name, MSIE, objFlg, objH);
		}
	});
	
	// アンカーリンク時
	if(!lastFlg)
	{
		$("a[href*=#]").click(function() {
			// 全て表示
			$(name).show();
			lastFlg = true;
		});
	}
}

// 表示判定
function viewCheck(name, MSIE, objFlg, objH)
{
	var winH;
	
	// スクロール量 取得
	if(MSIE)
	{
		winH = document.documentElement.clientHeight;
	}
	else
	{
		winH = innerHeight;
	}
	var scrTop = $(window).scrollTop() + winH;
	
	$(name).each(function(i){
		if ( scrTop >= objH[i] && !objFlg[i] )
		{
			objFlg[i] = true;
			// 最後まで表示されたか
			if( objFlg[objFlg.length-1] )
			{
				lastFlg = true;
			}
			$(this).fadeIn(300);
		}
	});
}

/*
$(function() {  
  $('.screenshots ul').live(
  	'mouseenter',function(){
  		  $(this).addClass('active');
  });
  $('.screenshots ul').live(
  	'mouseleave',function(){
  	    $(this).removeClass('active');
  });
});
*/

/*
$(function() {
  $('.screenshots img')
    .lazyload({
      threshold: 0,
      effect : "fadeIn",
      effectspeed: 100,
    })
});
*/

/*
$(function() {
  $('.screenshots').flickable();
});
*/
	
/*
// On window load. This waits until images have loaded which is essential
$(window).load(function(){
	
	// Fade in images so there isn't a color "pop" document load and then on window load
	$(".screenshots ul").fadeIn(500);
	
	// clone image
	$('.screenshots ul').each(function(){
		var el = $(this);
		el.css({"position":"absolute"}).wrap("<div class='img_wrapper' style='display: inline-block'>").clone().addClass('img_grayscale').css({"position":"absolute","z-index":"998","opacity":"0"}).insertBefore(el).queue(function(){
			var el = $(this);
			el.parent().css({"width":this.width,"height":this.height});
			el.dequeue();
		});
		this.src = grayscale(this.src);
	});
	
	// Fade image 
	$('.screenshots ul').mouseover(function(){
		$(this).parent().find('img:first').stop().animate({opacity:1}, 1000);
	})
	$('.img_grayscale').mouseout(function(){
		$(this).stop().animate({opacity:0}, 1000);
	});		
});

// Grayscale w canvas method
function grayscale(src){
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	var imgObj = new Image();
	imgObj.src = src;
	canvas.width = imgObj.width;
	canvas.height = imgObj.height; 
	ctx.drawImage(imgObj, 0, 0); 
	var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
	for(var y = 0; y < imgPixels.height; y++){
		for(var x = 0; x < imgPixels.width; x++){
			var i = (y * 4) * imgPixels.width + x * 4;
			var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
			imgPixels.data[i] = avg; 
			imgPixels.data[i + 1] = avg; 
			imgPixels.data[i + 2] = avg;
		}
	}
	ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
	return canvas.toDataURL();
  }
*/