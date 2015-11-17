---
layout: post
title: 搭建自己的个人博客
---

#搭建自己的个人博客
***
我是按照阮一峰的博客走的流程

地址是：http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html

####预备动作：

首先使用ssh密钥来连接Github

参考地址：http://www.xuanfengge.com/using-ssh-key-link-github-photo-tour.html

好了，接下来就是按照阮一峰的博文走了。

最后提一点，用github提交的时候需要注意的几点：

1. .gitignore 是必须的，因为只有有了这个，我们提交文件的时候才不会连这个也上传上去；
2. 配置_config.yml文件很重要；

常用的提交代码：

	git add .   //选中要提交的文件
	git commit -m "注释"   //提交新增的文件到本地
	git commit -am "同上"  //提交只修改了的文件到本地
	git push origin gh-pages  //将本地的提交到gh-page分支下
	git pull origin gh-pages  //将github上的check下来


