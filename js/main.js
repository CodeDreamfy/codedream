$(function(){
  $header = $('header');
  
  /* nav hover */
  $header.find('.logo a').addClass('one')
  setTimeout(function(){
    $header.find('.logo a').removeClass('one');
  },1000);

})

+function (){
  var $sidebar = $('.sidebar'),
      $newslist = $('.newslist');
  if($newslist.children().attr('class') != 'home'){
    console.log('ssas')
    $('.sidebar').hide();
    $newslist.css({'width' : '940px', 'border-right' : 'none'});
  }
}()