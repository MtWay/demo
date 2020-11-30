<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		 <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
		<title>签到奖励</title>
    	<link rel="stylesheet" href="${staticServer}/web/mobpages/css/app/qdNew.css?t=20170925">
   		<script type="text/javascript" src="${staticServer}/web/mobpages/js/common/jquery.min.js"></script>
    	<script type="text/javascript" src="${staticServer}/web/mobpages/js/common/WebViewJavascriptBridge.js"></script>
    	<script type="text/javascript" src="${staticServer}/web/mobpages/js/common/jsPlug.min.js?t=2017120801"></script>
		<script type="text/javascript">Array.prototype.contains = function(needle) {
	for(i in this) {
		if(this[i] == needle) return true;
	}
	return false;
}
$(function() {
				//判断ios加样式
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if(isiOS){
		$("body").addClass("ios");
	}
			//页面滚动时头部吸顶
	var fixHeight = $(".iscrollShow").innerHeight();
	$(document).scroll(function(){
		var scrolly =$("body").scrollTop();
		if(scrolly>fixHeight*2){
			var opa = (scrolly-fixHeight*2)/fixHeight;
			$(".iscrollShow").show();			
			$(".iscrollShow").css("opacity",opa);
		}else{
			$(".iscrollShow").hide();			
		}
	})
			var apptoken = getQueryString("apptoken");
			if(apptoken == null) {
				is_weixn();
				return false;
			}
			//获取url参数
			function getQueryString(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg);
				if(r != null) return unescape(r[2]);
				return null;
			}

			function is_weixn() {
				var ua = navigator.userAgent.toLowerCase();
				// alert(ua);
				var index = ua.indexOf("iphone os");
				var indexIpad = ua.indexOf("ipad")
				if(index == -1 && indexIpad == -1) {
					var ua = window.navigator.userAgent.toLowerCase();
					if(ua.match(/MicroMessenger/i) == 'micromessenger') {
						$("#bg1").show();
					} else {
						window.location.href = "myapp://www.hx2car.com";
					}
				} else {
					if(ua.match(/MicroMessenger/i) == 'micromessenger') {
						$("#bg2").show();
					} else {
						window.location.href = "myapp://www.hx2car.com";
					}
				}
			}

			var already ='${already!""}',
				gift=${gift!"0"},
				days='${days!"0"}',
//				days=15,
				ylq=Math.floor(days/7),
				residue=[7,15,21,30,30];
				if(days==14){
					ylq=1;
				}
				for(var i=0;i<ylq;i++){
//					$(".warp").eq(i).addClass("gray").find(".state").text("已领取");
					$(".jp li").eq(i).removeClass("gray");
					if(days>27 && days!=30){
						$('.jp li').eq(3).addClass("gray");
					}
				}
				var dateNumTxt = residue[ylq]-days;
				if(dateNumTxt<0)
				dateNumTxt = 0;
				$("#dateNum").text(dateNumTxt);
				$("#gift").text($(".gray").eq(0).find("p").text() || "神秘大奖")
//				gift=4;
				if(!already){
					$(".model").removeClass("hide");
					if(gift>0){
						$(".model-box1").addClass("hide");
						$(".model-box2").removeClass("hide");
						switch(gift){
							case 1:
//							$(".model-box2 .coin").addClass("day7-icon");
							$(".model-box2 .prize").html(' <span id="raf">7天会员</span>');
							break;
							case 2:
//							$(".model-box2 .coin").addClass("s4-icon");
							$(".model-box2 .prize").html('<span id="raf">20元个人会员劵</span>');
							
							break;
							case 3:
//							$(".model-box2 .coin").addClass("hb-icon");
							$(".model-box2 .prize").html('<span id="raf">4s查询券</span>');
							
							break;
							case 4:
							$(".model-box2 .prize").html('<span id="raf">88华币</span>');
//							$(".model-box2 .coin").addClass("box");
//							$(".model-box2 .model-msg ").addClass("hide");
//							$(".model-box2 #box1").removeClass("hide");
							
							break;
							case 5:
//							$(".model-box2").addClass("bound");
							$(".model-box2 .prize").html('<span id="raf">88华币</span>');
							$(".model-box2 .btn").removeClass("hide");
							$(".model-box2 .close-btn").addClass("hide")
							break;
							default:
							break;
						}
					}else{
						$(".model-box1").removeClass("hide");
					}
				}
				$(".confirm").click(function(){
					history.go(0);
				})
				$(".rest").click(function(){
					window.WebViewJavascriptBridge.callHandler('submitFromWeb', {'param':23}, function() {}); 
				})
			
				
				$(".model-box1 .close-btn").click(function(){
					$(".model").addClass("hide");
					history.go(0);
				})
				
				$(".model-box2 .close-btn").click(function(){
					$(".model").addClass("hide");
					$(".model-box2").addClass("hide");
					$(".model-box1").removeClass("hide");
					setTimeout(function(){
					history.go(0);
//						$(".model").removeClass("hide");
					},200)
				})
				
			var index = 0,arr = [],length=<#if numbersDay>${numbersDay!""}<#else>""</#if>,before=<#if startWeek>${startWeek!""}<#else>""</#if>;
			var str="";
			<#list day as li>
			arr.push(${li})
			</#list>
			
			Array.prototype.remove = function(val) {
			var index = this.indexOf(val);
			if (index > -1) {
			this.splice(index, 1);
			}
			};
			var date = new Date();
			var day = date.getDate();
			arr.remove(day)
			for(var i =0;i<before;i++){
				str+='<div class="datelist"></div>';
				index++;
			}
			for(var i=1;i<length+1;i++){
				index++;
				str+='<div class="datelist'
//				"><span class="list-day">'+i+'</span><i class="qd-icon';
				if(arr.contains(i)){
					str+=' yq-icon ';
					if(arr.contains(i+1) && index%7!=0)
					str+=' haveAfter ';
					if(arr.contains(i-1) && index%7!=1)
					str+=' haveBefore ';
				}
				if(day == i)
					str+=' today ';
				str+='"><span class="list-day">'+i+'</span></div>';
			}
			str+='<div class="clear"></div>'
			$(".day").append(str);		
			
			$(".today").removeClass("yq-icon").prev().removeClass("haveAfter");
			$(".today").next().removeClass("haveBefore");
			$(".back").click(function(){
				//调用本地java方法
            window.WebViewJavascriptBridge.callHandler('submitFromWeb', {'param': 13}, function() {} );  
			})
			
	//顶部下拉	
	var y1 = 0,height=$(".head").height(),mark=0;
	$(document)
      .on('touchstart', function(e){
		firstTouch = e.originalEvent.touches[0];
       y1 = firstTouch.pageY;
      	var scrolly = $("body").scrollTop();
      	if(scrolly<10){
      		mark=1;
      	}
       
      })
      .on('touchmove', function(e){
		firstTouch = e.originalEvent.touches[0];
      	var scale = 1;
        if(!mark){
      	 y1 = firstTouch.pageY;
      	 scale=1;
      	 var scrolly = $("body").scrollTop();
      	if(scrolly<10){
      		mark=1;
      	}
        }else{
        	var y2 = firstTouch.pageY;
        	var deltay = Math.floor(y2 - y1);
        	scale = (height+deltay*0.6)/height;
        	if(scale<1)scale=1;
        	if(scale>1.5)scale=1.5;
        	if(scale>1){
        	e.preventDefault();
        	}
        }
      })
      .on('touchend', function(e){
      	mark=0;
      	 var scale=1;
      })
			})
		</script>
	</head>
	<body>
		<#setting date_format="yyyy/MM/dd">
		<header class="hide">
			
		</header>
		<div class="main">
			<div class="head">
				<h2 class="isAndroid">
					<i class="icon-left back"></i>
					签到奖励
					<a id="share" class="hide">分享</a>
				</h2>
				<h2 class="isAndroid iscrollShow">
					<i class="icon-left back"></i>
					签到奖励
					<a id="share" class="hide">分享</a>
				</h2>
				<div class="btn qd-btn hide">
					签到
				</div>
				<div class="qdbox">
					<div class="btn qd-btn yq-btn ">
					已签到<br />
					<span>累计${days!"1"}天</span>
				</div>
				</div>
				
				<p >
					<span class="yq ">我的积分：<a id="score" href="newmygral.htm?appmobile=${appmobile}&apptoken=${apptoken}">${score!"0"}</a></span><br />
					<a id="toshop" href="newmygral.htm?appmobile=${appmobile}&apptoken=${apptoken}">前往商城>> </a>
				</p>
				
			</div>
			<h3><i></i><span></span> 累计签到有奖 <span></span><i></i></h3>
			<div class="jp">
				<ul>
					<li  class="gray">
						<div class="content">
							<div class="top">
								<span>07</span>
								<p>个人会员</p>
							</div>
							<div class="dlq bot ">
								待领取
							</div>
							<div class="ylq bot">
								领取成功
							</div>
						</div>
					</li>
					<li class="gray">
						<div class="content">
						<div class="top">
							<span>15</span>
							<p>个人会员劵</p>
						</div>
						<div class="dlq bot ">
							待领取
						</div>
						<div class="ylq bot ">
							领取成功
						</div>
						</div>
					</li>
					<li class="gray">
						<div class="content">
						<div class="top">
							<span>21</span>
							<p>4s查询劵</p>
						</div>
						<div class="dlq bot ">
							待领取
						</div>
						<div class="ylq bot">
							领取成功
						</div>
						</div>
					</li>
					<li class="gray">
						<div class="content">
						<div class="top">
							<span>30</span>
							<p>88华币</p>
						</div>
						<div class="dlq bot ">
							待领取
						</div>
						<div class="ylq bot">
							领取成功
						</div>
						</div>
					</li>
				</ul>
				<div class="clear">
					
				</div>
			</div>
			
			<div class="date">
				<div class="date-head ">
					<i class="date-icon"></i><span id="date-time">${.now?date}</span>
					<div class="right">再签到 <span id="dateNum" class="red"> <#if days>${30 - days}<#else>30</#if> </span> 天就能获得 <span class="red" id="gift">神秘大奖</span></div>
				</div>
				<div class="week">
					<ul>
						<li>日</li>
						<li>一</li>
						<li>二</li>
						<li>三</li>
						<li>四</li>
						<li>五</li>
						<li>六</li>
					</ul>
				</div>
				
				<div class="day">
					
					
				
				</div>
			</div>
		</div>
		
		<div class="model hide">
			<div class="black">
				
			</div>
			
			<div class="model-box model-box1 hide">
				<div class="warp">
					<h3>签到成功</h3>
				<div class="icon icon-close hide"></div>
				<div class="coin">积分+<#if vipData =="1">7<#else>5</#if></div>
				<p class="model-msg ">签到获得 <span class="prize"><span id="raf"><#if vipData =="1">7<#else>5</#if></span>积分</span></p>
				</div>
				<div class="close-btn">
					确定
				</div>
				
			</div>
			<div class="model-box model-box2 hide">
				<div class="warp">
					<h3>签到成功</h3>
					<div class="icon icon-close hide"></div>
				<div class="coin ">积分+<#if vipData =="1">7<#else>5</#if></div>
				<p class="model-msg ">签到获得 <span class="prize"></span></p>
				<p class="model-msg hide" id="box1">
					<br />
					<span class="prize">50元托运券*1</span><br />
					 <span class="prize">29元个人会员券*1</span><br />
					 <span class="prize">公司会员优惠券*1</span><br />
					    
				</p>
				</div>
				<div class="close-btn">
					确定
				</div>
				<div class="btn-box">
					
					<div class="btn confirm hide" id="btn">
						放弃领取
					</div>
					<div class="btn rest hide">
					绑定账号
					</div>
				</div>
				
				
			</div>
		</div>
		<div class="ctBody">
	<div id="bg1" class="bg" style="display: none;">
		<img src="${staticServer}/web/mobile/img/download_android2.png" width:221; height:171;/>
	</div>
	<div id="bg2" class="bg" style="display: none;">
		<img src="${staticServer}/web/mobile/img/download_ios2.png" width:221; height:171;/>
	</div>
</div>
	</body>
</html>
