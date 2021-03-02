# ChongYouSign


小程序UI查看：[http://sign.zhangchuanjun.cn](http://sign.zhangchuanjun.cn)


**当代大学校园出行必备导航**
																						**——小程序《重邮指路牌》**

一. 产品定位 项目介绍

（1） 产品定义

《重邮指路牌》是一个旨在为全体校园师生以及校外游客精确的地图导航并附有街景图的校园导航小程序。并且采用自制手绘彩色地图，对每一条小路都清晰明了地展现出来，方便新生快速地对整个校园有个整体的方向感。其次针对校园老生，最常去的快递点，由于时常更换，小程序实时更新地点，方便老生快速找到。以及针对店铺店主，方便店主展示其店内装修效果和最新店铺信息。最后针对游客和校外人员，能快速让其了解校园情况，轻松便捷地逛重邮。吸引更多游客从而增加校园人气。

关键词：校园导航 街景图 实时更新 店铺展示 游客吸引

（2）产品方案

​	 1）针对新生和校外游客人员，本产品采用了分地点类别分页面展示相应地点并且点击图片即可查看街景图以及导航功能，采用了人性化的街景图片以及位置描述信息，解决了市面上导航软件最后一步的痛点。并且增加搜索框和手绘地图让用户快速查找所需要的地点的方案。

​	 2）针对老生，本产品采用了将上传地点权限交给该校全体师生，审核权限交给管理员的方案，使地点可以实时更新位置信息以及街景图。

​	3）针对店铺超市，本产品采用了把上传权限交给店主，审核权限交给管理员的方案，起到让其宣传自家商店以及最新信息的效果，管理员再对其进行推荐排序，让全校师生能享受更好的服务。





![https://sign-1259371307.file.myqcloud.com/1608308039422-express.jpg](https://sign-1259371307.file.myqcloud.com/1608308039422-express.jpg)



二、 需求分析 

1.用户需求

1）对于新入学的校园新生，对校园一无所知，最迫切的需求就是找到寝室，食堂，教学楼等地点。

2）对于校园老生，最迫切的需求是能够及时的找到校园更新的地点，诸如快递点，一卡通中心，学生管理中心等地点，如果发现了新的校园地点，需要及时上传地点让更多的人了解。

3）对于校外人员及游客，只能通过不断的问路才能找到校园地点，也无从知晓有哪些著名景点以及在何处。 

4）对于店铺超市，由于宣传手段有限，没有一个好的平台向目标用户发布最新的店铺宣传信息，需要一个能及时向目标用户发送宣传信息的平台。

![https://sign-1259371307.file.myqcloud.com/1608308039422-express.jpg](https://sign-1259371307.file.myqcloud.com/1608308039422-express.jpg)

2.系统功能需求：

（1） 上传实时更新

（2） 地点分类展示

（3） 管理员审核，控制上传地点是否通过

（4） 位置推荐排序和删除替换功能

（5） 留言过滤

（6） 校园手绘地图

![https://ae01.alicdn.com/kf/U488d6c1af33f4baf91e4af94e4384dc8g.jpg](https://ae01.alicdn.com/kf/U488d6c1af33f4baf91e4af94e4384dc8g.jpg)

（1）位置信息上传

主要上传字段有 上传的类型（必选），由用户选择制定好的几种类型，地点名称（必选），关于此位置的几张图片（必选），最后一个地点描述（必选），简单能大致说明该地点的位置方向。为了防止有用户恶意上传，需要逻辑处理。用户需要选择类型，填写完地点名称之后，才可以选择上传图片，最后只有当定位成功之后，以及所有必选字段填写完之后才可以上传。

针对上传图片功能，预览处理，预览图片可放大，以及限制用户上传图片的数量。用户上传成功后会预览出上传的几张图片，并且点击之后可放大。当用户上传3张图片以后，图片上传图标隐藏，当小于三张时，且又显示出来。

考虑服务器性能，我们对图片压缩，并且图片预览时的图片的地址是临时地址，最后点击上传时，才上传所有字段信息。

![s](https://ae01.alicdn.com/kf/U0c15302015e14448ac98f00298f25aa4T.jpg)



（2）地点分类分页展示

从前端获取从封面加载数据库中的已审核过的数据并展示在页面上，点击图片即可进入该地点的位置详细信息以及进入导航界面。并通过制作一个动画向右滑动或点击菜单按钮获取地点的分类信息，点击某一个地点类即可进入该类所有地点，并且将管理员按钮放在右滑界面，从封面获得的openid判断是否为管理员，并由判断结果决定是否显示管理员按钮，首页当中分为图片展示界面和搜索框和上传图片界面，下方导航栏分为导航和手绘地图，点击图标会变成彩色的图标，进入手绘地图页面点击图片就会预览超清大图，实现了放大功能。导航界面使用了官方的小程序路线规划插件，使得定位更加精准，功能更加多样化。

![https://img02.sogoucdn.com/app/a/100520146/cad9b0f0ab7831dc5eb697fef8ce6723](https://sign-1259371307.cos.ap-chongqing.myqcloud.com/1608308699801-contents.jpg)

（3）管理员审核功能
从数据库中获取未审核的地点信息，即status_l为零的地点信息，管理员查看后点击通过则通过update操作将该地点的status_l修改为1，即更改为用户可见信息，如果审核不通过为了不占用云存储资源：我们先通过当前名字得到当前记录的id,通过id找到其对应的图片json还然后通过循环它，删除其在云存储中的图片，图片删完之后，在将最初获得的json数据中对应的也删除该记录，从而前端会已经被审核的位置，通过remove()重数据库中删除东西。

![https://img04.sogoucdn.com/app/a/100520146/779e4cc5f58e92f32629b284b3b6291a](https://ae01.alicdn.com/kf/U279e5fd71ad34dfd87137f6a07ea2f34c.jpg)

（4）位置删除替换功能
从数据库中获取已经审核通过的地点信息，即status_l为1的位置，管理员查看后点击top则通过update操作将该地点的status_top修改为1，即为用户可在top页面见该条记录，如果该位置已经被被弃用管理员只需要点击替换，为了不占用云存储资源我们先通过当前名字得到当前记录的id,通过id找到其对应的图片json还然后通过循环它，删除其在云存储中的图片，图片删完之后，在将最初获得的json数据中对应的也删除该记录，从而前端会已经被审核的位置，通过remove()重数据库中删除东西。

![https://img04.sogoucdn.com/app/a/100520146/779e4cc5f58e92f32629b284b3b6291a](https://ae01.alicdn.com/kf/Ueb6cc715bea34d9baca81e1eb38c9462a.jpg)

举例：参观清华的非功能需求就是根据系统的实际要求，提出了关键的三个内容：一是性能，给出具体的量化指标；二是安全性，诸如身份证敏感信息等；三是可靠性，包括停电和断网问题、游客快速进入的问题等。 

（1） 留言过滤

针对每一个位置地点我们加入了留言功能，并且进行了机器过滤，过滤色情，恐怖，政治，辱骂，灌水类等信息，增加与用户的互动性。



3. 系统非功能需求

小程序便捷性，安全性，以及实用性。方便用户，一进小程序能直接了当找到想要去的地点，并且能精确地导航或指引至重点。小程序不获取用户任何隐私信息，包括不获取用户微信名称，微信头像，地点等信息。

 

 

4. 交互设计 

《重邮指路牌》整体配色以绿色为主，浅色背景色为辅，因为绿色象征生命、安全、快速，正是在校大学生青春的表现，与我校身处南山深处，被绿色植被覆盖相匹配，也是我校校徽的主要配色。整体设计原则从产品观、用户体验、小程序规则要求和小程序开发的基础框架出发，我们的小程序大部分面向在校大学生，因此页面设计的会青春洋溢一点，从用户体验方面，优化了数据加载的动画，使其更加自然和谐，不会感到僵硬和卡顿。从实用性出发，我们的小程序方便了全校师生，节约了出行时间，更是加入了人性化的街景图以及导航功能。



![https://img03.sogoucdn.com/app/a/100520146/8e43c6ccbb05d581fc0e23134125a2aa](https://sign-1259371307.file.myqcloud.com/1608308547071-startNavigate.jpg)

6.技术方案： 



技术选型/开发环境/框架/第三方组件：采用云开发，将数据都保存在云数据库中，前端后台均采用微信官方原生架构，使用微信开发者工具开发，采用了腾讯地图路线规划插件。

技术难点：

(1) 模糊搜索框算法设计：只需要搜索关键字即可弹出对应地点。

使用两种方法，第一种是使用文字相似度匹配算法，当搜索值与数据库中值相似性达到一定程度就返回相应数据。当第一种出现异常时，使用了二种JavaScript的数组中的indexof方法通过传入键盘键入的值作为参数，若是搜索到值，判断length是否大于0就能获取到数据库中地点对应的name，再通过name获取到每个地点对应的唯一的id就可直接跳转到该地点的导航界面。

(2) 突破云数据库20条查询限制：限制普通用户，使用本小程主要是进行查询，和小程序向他们展示数据，云开发时每次都能在数据库中检索前20条信息，实际运用时数据库中的记录远大于20条，我们使用了循环查询解决大于20记录的查询。为减少数据库的访问量，同时提高用户的体验感，我们在每次用户进入小程序是，就对数据库进行了查询，将满足要求的所有数据放入到一个数组中，每个页面按照每个地点的type值进行分类存入各自数组，给予了不同的全局变量。这样用户在进入到每个页面时可以直接通过全局变量得到该页的所有数据。使用全局变量的另一个好处是减少了setdata的使用。

(3) 动画函数复用性极低：而我们有多个页面需要用到不同的动画函数，因此我们将动画封装成一个函数放到app.js里面，将参数设置为（引用作用域，函数名称，位移量，透明度），以后可以将其制作成插件供开发者使用，这样在各个页面都能直接调用动画函数，还能将其改为不同的动画效果，减少了代码的冗杂性，增加了代码的复用性。

(4)微信小程序官方组件wx.previewImage预览放大图片安卓手机会有黑屏bug：需要将url格式改成https开头，并将图片压缩到2m以内，而其他格式无法满足要求，因此只有改为gif格式。

7. 运营和维护方案：

(1)在新生年级群里推广并介绍给辅导员让他大力宣传。

(2)抓住新媒体资源，比如在校园相应公众号、微博、今日头条、抖音等等对外推广，不仅让新生更了解校园，更是一个增加校园人气的机会。

(3)搜索优化，将小程序推销给店铺超市店主，通过推荐排序将最佳店铺排为top1。

(4)用户留存就使用用户可实时上传更新方案，让小程序永不过时，每一年都将有庞大的用户基数。

(5)维护通过管理员审核上传地点是否为正确位置以及非敏感图片地点，使小程序更纯净。

(6)导航插件可能将超出个人范畴，于是我们可以让学校申请资质使用或者另做一个导航系统。



### <a href="https://github.com/468336329Zc/ChongYouSign/blob/master/LICENSE" style='color:black'>许可证</a>
<a href="https://github.com/468336329Zc/ChongYouSign/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-Apache2.0-red" alt="license" data-canonical-src="https://img.shields.io/badge/license-Apache2.0-red" style="max-width:100%;"></a>
<blockquote>
<p>ChongYouSign使用 Apache license2.0 协议开源，请严格遵守开源协议。</p>
</blockquote>

