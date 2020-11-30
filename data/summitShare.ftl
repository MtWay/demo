<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
		<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">
		<title>倾慕信</title>
		<link rel="stylesheet" type="text/css" href="http://auto.hx2car.com/static/css/bootstrap/css/bootstrap.min.css" />
		<link rel="stylesheet" href="${staticServer}/web/mobpages/css/common/wapCommon.css">
		<link rel="stylesheet" href="${staticServer}/web/help/style/global.css">
		<style type="text/css">
			.box {
				font-size: 1.4rem;
				padding: 2rem;
				line-height: 2;
				color: #333;
			}
			
			.box h3 {
				font-weight: bold;
			}
			.box p {
				text-indent:3rem;
			}
			.hide {
				display: none;
			}
			
			form {
				padding: 2rem;
				margin-bottom: 3rem;
			}
			
			#shareTxt {
				border: 1px solid #f60;
				height: 3.5rem;
				line-height: 3.5rem;
				padding: 0.5rem;
				margin-right: 0.2rem;
				width: 55%;
				box-sizing: border-box;
				-webkit-box-sizing: border-box;
			}
			
			#shareBtn {
				height: 3.5rem;
				width: 30%;
				background: #f60;
				color: #fff;
				text-align: center;
				float: right;
				line-height: 3.5rem;
				font-size: 1.5rem;
			}
		</style>
		<script src="${staticServer}/web/common/js/jquery/jquery.min.js" type="text/javascript"></script>
	</head>

	<body>
		<div class="box hide">
			<h3>我感慨道：这世间最想在第九届华夏峰会见到的是<span class="change">你</span></h3> 这世间最想见到的，是
			<span class="change">你</span>。<br /> 古人说，一日不见如隔三秋。去年还同聚一堂把酒言欢，细细算来已经有快一年没有见了。
			<br /> 从天光乍破走到暮雪白头，踏碎这纷繁的红尘，穿越这时间的洪流，只因想见。
			<br /> 如果可以，愿面朝大海、春暖花开。
			<br /> 如果可以，愿如星如月、流光皎洁。
			<br /> 如果可以，愿一帘幽梦、十里深情。
			<br /> 萧萧十月菊，耿耿照白草。
			<br /> 在这世间最想见到，就是
			<span class="change">你</span>。
		</div>
		<div class="box hide">
			<h3>
				厉害了我的哥！我每年都来杭州，竟然只是为能见<span class="change">你</span>一面！
			</h3>
			<p>今天，又是一年一度的二手车行业盛会，来自全国各地的二手车人齐聚杭州，共襄盛举，参加华夏第九届二手车企业家峰会！</p>

			<p>在这个属于二手车人的重要的日子里，成千上万的车商，从各地赶来，赴一场只属于二手车人的约会！穿上一身帅气西装，现场相当火爆，大家相谈甚欢，天南地北地聊着当年的那些幽默事儿。</p>

			<p>站在人群中的<span class="change">你</span>显得格外引人注目，笔直的西装、噌亮的皮鞋、与众不同的气质，让他看上去是那么的不凡。然而，他却在沉思着，好像在等待着什么，嘴里怔怔有词。</p>

			<p>这时，峰会主持人上台了“下面有请我们行业里的大师级二手车人<span class="change">你</span>上台演讲，为大家讲讲他的经营之道”！伴随着雷鸣般的掌声，行业大佬<span class="change">你</span>气定神闲地走上舞台中央，开始了发言，“大家好，很高兴今天能站在这里和大家见面.....”</p>

			<p>而此时，我站在台下早已经激动得泪流满面，不停地鼓掌。据悉，为了见到这位传说中的行业大佬、心中的偶像，我可谓是排除万难也要来峰会现场哇！</p>

			<p>而<span class="change">你</span>之所以能成为偶像，大概是因为这几年赚的太多，传言他已经跻身于福布斯中国财富榜，仅次于阿里巴巴马云！</p>

		</div>
		<div class="box hide">
			<h3>万水千山总是情，我要见你行不行！我在华夏峰会约“撩”<span class="change">你</span>！</h3>
			 只因为在人群中多看了你一眼，就再也不能忘记你容颜....
			<br /> 想你时你在脑海，见你时你在峰会现场！

			<br /> 一次遇见，一生执念！

			<br /> 那一年，我和

			<span class="change">你</span>初识在美丽的杭州，<br /> 最动人的风景不是西湖边的垂柳，而是我身边的你，

			<br /> 说起二手车头头是道的你，说起经营之道神采飞扬的你！

			<br /> 都说前世的500次回眸，才换来今生的的一次擦肩而过...

			<br /> 但这一次，我不想再错过你了！

			<br /> 万水千山总是情，我要见你行不行！

			<br />

		</div>

		<form action="" method="post">

			<input type="text" value="" placeholder="请输入您要分享的人的姓名" id="shareTxt" /><span id="shareBtn">修改</span>
		</form>
		<div class="warp">

				<div class="tj_cars  col-md-12  col-md-3 side">
					<p class="tj_cars_title  col-md-12">推荐车源</p>
					<ul></ul>
			</div>
		</div>
		<script>
			var url = 'https://www.hx2car.com/site/carListJsonp.htm?oname=3092bfe669853dbd0640b89cace0f99a&pageSize=8';
			$.ajax({
				url: url,
				dataType: 'jsonp',
				processData: false,
				type: 'get',
				jsonp: "callback",
				jsonpCallback: "success_jsonpCallback",
				success: function(data) {
					if(data) {
						var str = '';
						$.each(data, function(i, n) {
							str += '<li class="carlog col-xs-6 col-md-12" data-id="' + n.id + '">' +
								'<a href="https://www.hx2car.com/details/' + n.id + '" target="_blank"><img src="' + n.firstSmallPic + '" alt="' +
								n.title + '图片"></a>' +
								'<p class="title"><a href="https://www.hx2car.com/details/' + n.id + '" target="_blank" title="[' + n.location +
								']' + n.title + '">' + n.title + '</a></p>' +
								'<p class="content"><span class="diqu">' + n.location + '</span><span class="jiage">' + n.price + '</p>' +
								'</li>'
						})
					}
					$('.tj_cars ul').html(str);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert(XMLHttpRequest.status);
					alert(XMLHttpRequest.readyState);
					alert(textStatus);
				}
			});
		</script>

		<script type="text/javascript">
			$(function() {
				var rang = getQueryString("rang") || Math.floor(Math.random() * $(".box").length);
				$(".box").eq(rang).removeClass("hide");
				var change = getQueryString("change") || "你";
//				change = decodeURI(decodeURI(change));
				change = classObj.UnUnicode(change);
				console.log(change)
				$('.change').text(change);
				document.title = $(".box").eq(rang).find("h3").text();

				$("#shareBtn").click(function() {
					var txt = $("#shareTxt").val() || change;
				console.log(txt);
//					change = encodeURI(encodeURI(txt));
					change = classObj.ToUnicode(txt);
					var str = window.location.href.split("?")[0];
					str = str + "?change=" + change + "&rang=" + rang;
					window.location.href = str;
				})

			})

			//获取url参数
			function getQueryString(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg);
				if(r != null) return unescape(r[2]);
				return null;
			}
			
//			转换汉字编码
			var classObj=
     {
       ToUnicode:function(str) 
       {
        return escape(str).replace(/%/g,"\\").toLowerCase();
       },
       UnUnicode:function(str)
       {
        return unescape(str.replace(/\\/g, "%"));
       }
    }
		</script>

	</body>

</html>