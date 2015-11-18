$(function(){
  var $header = $('header'),
      $indexWrap = $('.page-content .wrapper'),
      $postList = $('.home .post-list', $indexWrap),
      $sidebar = $('.sidebar', $indexWrap);
  
  /* nav hover */
  $header.find('.logo a').addClass('one')
  setTimeout(function(){
    $header.find('.logo a').removeClass('one');
  },1000);

  /* 首页日志hover动画 */
  $postList.on('mouseenter', 'li', function(){
    var $line = $(this).find('.line');
    $(this).css('background-color','#f1f1f1').children('a').css('color','#4285F4');
    $line.show().addClass('pagelist-animate');
  }).on('mouseleave', 'li', function(){
    var $line = $(this).find('.line');
    $(this).css('background','none').children('a').css('color','#111');
    $line.show().removeClass('pagelist-animate');
    $line.hide('slow');
  })
  /* 首页日期 */
  var date = new Date(),
      y = date.getFullYear()+'年',
      mon = date.getMonth()+1+'月',
      today = date.getDate();
  $sidebar.find('.date-time span').append(function(index){
    if(index == 0){
      return y+mon;
    }else {
      return today;
    }
  })

})

/* 判断是否是首页，设置newslist的宽度，显隐藏sidebar */
+function (){
  var $sidebar = $('.sidebar'),
      $newslist = $('.newslist'),
      Class = $newslist.children().attr('class'),
      newslistClass = 'null|home|category'.split('|');
  if( newslistClass.indexOf(Class) == '-1'){
    console.log('hehe')
    $sidebar.hide();
    $newslist.css({'width' : '940px', 'border-right' : 'none'});
  }else {
    console.log('bbb')
    $sidebar.show();
    $newslist.css({'width' : '689px', 'border-right' : '1px solid $grey-color-light'});
  }

}()

