$(function(){

  var rotateCont = $('#aRotation'),
      Interval = 100,
      animPosition = 10,
      animWidth = 200

  setInterval(rotateimg, Interval);
  
  function rotateimg(){
    i = 1;
    var rotateEl = rotateCont.find('li');
    var el = rotateEl.eq(0);
     rotateCont.stop().animate({right: '+=' + animPosition + 'px' },animWidth); 
  }
  
});