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