---
layout: post
title: 工作日志之星级评分
category: worklog
tags: jekyll
---

##工作日志之星级评分

>今天主要完成了几件事情：
1. 完成了博客标签的生成与链接，并且通过js实现了标签与文章使用同一个模板的需求，继续加油！
2. 接到了二手车的修改任务，虽然花了几乎一天的时间，但是好在在7点半左右完成了，所以心情很好，因为通过自己的努力，解决了问题，对自己的学习和自信是一个很好的促进作用。

废话不多说，开始今天的主题：星级评分
再翻看自己之前写的代码的时候，发现代码结构臃肿，而且多处判断是不对的，所以在调整完css的样式后开始重写了星级评分；
在制作css部分今天使用了一个非常好用的工具：csssprites,非常好用，而且方便的css雪碧图生成工具，省去了我一大把时间，接着就是关键的js部分了。

按照正常的星级评分来说需要做到：

1. 鼠标划到某颗星星，则该星星与之前的星星都会变亮，鼠标移出去恢复默认样式；
2. 点击某颗星后，该星以及之前的星星会亮。

####难点： 

1. 星星划上去后，左右移动的时候，鼠标之前的星星一直亮着不会变化；
2. 点击星星后，鼠标移出去会触发鼠标移出的事件与星星外div移出事件；
3. 每次点击后鼠标滑动离开后之前被点击到的星星依然亮着；

先放html结构：

  <div class="start-item">
       <a href="javascript:;"></a><!--
       --><a href="javascript:;"></a><!--
       --><a href="javascript:;"></a><!--
       --><a href="javascript:;"></a><!--
       --><a href="javascript:;" class="last-start"></a>
    </div>
    
###收获及总结：

1. 设想当鼠标滑到其中一个星星的时候如果往左滑动，会出现星星亮-灭-亮的过程，导致很不自然的过渡，开始我是给a标签加上了  `display: inline-block;`然后使用`padding`让所有星星挨着的，但是后来发现变成`inline-block`后，a标签之间的空格也会被算上距离，所有我给a标签加上了\<!---->用来注释掉之间的距离，从而达到了鼠标划伤去左右滑动不会闪烁的情况，其中有一个小插曲：使用setTimeout，通过给鼠标移出的事件加上这个然后在鼠标进入的时候判断定时器的id是否存在，来取消或者进行加减class。(ps:这种方式也可以用来给resize，scroll事件加上定时多少秒再次调用的功能)

{% highlight javascript %}

    var startStatus;//存储定时器的id
    xxx.mouseenter:
      if startStatus
        clearTimeout(startStatus)
    
    xxx.mouseout:
      this.removeClass('active')
      startStatus = setTimeout(function(){
        this.prevAll().removeClass('active')
      },200)
      
{% endhighlight %}
  
2. 当我点击的时候我本来是要让从点击的星星开始到其之前所有的星星都会亮，但是当鼠标划上去的时候又消失的，所有这个纠结了很久，试过好几种方法,使用过通过off来解绑的，但是都失败了，因为貌似绑定的事件对象不同，当我用on的时候是给所有的a加上了代理事件，当我click的时候，点击的是当前的a标签；我通过xxx.off('.removeStart',this)的方式来进行解绑，但是还是存在问题，事件要么是给所有的a标签解绑了还是只是当前的，但是这种走不通。
最后我通过看了网上的demo清楚了自己对需求理解的不到位，问题的冲突在于点击后同时触发了包裹层的鼠标出事件。
使用off无法解决后，使用了布尔值，但是第二次点击仍然有问题，最后误打误撞的写下了正确的想法。

其实是这样的，只需要给鼠标移处事件加上一个判断；
首先如何确定是第二次点击呢？所以我设置了三个全局变量：

{% highlight javascript %}
  var chose=false, //控制鼠标离开事件执行的函数
        startIndex, //存储点击后的index
        $startP;  //存储星星父级jquery对象
{% endhighlight %}  

其中chose就是用来开关的，
我在点击的时候存了startIndex和$startP两个变量；一个当前点击星星的序列，另一个是当前星星包裹层的jquery对象；
然后当我鼠标移出的时候，我判断chose是否为true，如果是的话说明已经点击了星星，那么，鼠标移出后，之前点击到的星星依旧会亮着，然后进而判断startIndex是否存在，如果存着说明已经点过了，然后亮起来星星，如果没有，则鼠标移出后删除所有a标签的class；

最后有一个问题是，什么时候重置那三个属性？

后来我在click事件里面加了一个判断，是否是第一次点击，条件是startIndex，如果startIndex存在的话说明已经点过一次了，重置startIndex和$startP，如果第一次点击的话，将chose默认为false，然后在点击下一题那里也是通过这个来判断的。

{% highlight javascript %}

  function holdStart(){
      $startP.children().each(function(index,elem){
        if(index < startIndex){
          $(elem).addClass('active');
        }else{
          $(elem).removeClass('active');
        }
      })
    }
  $dialog.on('click','.easy-test .container .step-base .start-item a',function(){ 
      if(!startIndex){
        chose = !chose;
      }
      $startP = '';
      startIndex = '';
      var $tips = $('.easy-test .container .tips');
      $tips.hide();
      flag = true;
      var _this = $(this);
      $startP = $(this).parent();
      startIndex = _this.index()+1;
      
      _this.prevAll().addClass('active');
      _this.addClass('active');

      
      console.log(chose);
    });

{% endhighlight %}    

其实通过写这篇文章主要是想要理清一下去解决一个问题的思路：首先是需要描述清楚需要达到的效果，然后分效果进行完成，说起来自己的逻辑思维能力太差劲了，有时候转不过弯来，做事太死板。为什么没有想到那种解决方案呢？

最关键的思路是在鼠标离开的时候进行判断。
