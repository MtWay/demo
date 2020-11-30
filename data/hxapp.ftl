<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>【华夏二手车APP下载】手机客户端下载-华夏二手车网</title>
<meta name="description" content="下载华夏二手车APP,轻松买卖二手车。华夏二手车网成立于2003,多年积累,市场影响力领先,二手车车源信息俱全,各种车型，各种价位满足市场90%用户购车需求。">
<meta name="keywords" content="华夏二手车APP下载">
<#import "/common/indexMacro.ftl" as index_macro>
<link href="${staticServer}/web/page/common.css?t=20170413" rel="stylesheet" type="text/css">
<link href="${staticServer}/web/ads/css/styles.css?t=20171212" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="${staticServer}/web/common/js/jquery/jquery.min.js" ></script>

</head>
<body >


<div class="banner">
	<div class="fixed_box">
		
	<div class="banner_head">
	<a href="https://www.hx2car.com/"><div class="banner_head_logo left">
		</div></a>
		<div class="banner_head_nav right">
			<ul> 
				<li>收车快人一步</li>
				<li>车辆记录查询</li>
				<li>车商朋友圈</li>
				<li>掌上同行通讯录</li>
				<li class="cur">更多精彩>></li>
			</ul>
		</div>
	</div>
	</div>
	<div class="banner_content">
		<img src="${staticServer}/web/ads/images/banner-phone.png" class="left phone"/>
		<div class="left">
			<div class="user_num">
				<h4>全国二手车人都在用华夏二手车APP</h4>
				<div><span class="left">使用人数：</span><span id="appNum" class="left">100,000 </span><sapn class="left">&nbsp;位</sapn></div>
			</div>
			<div class="code_box">
				<img src="${staticServer}/web/page/images/code/code-brief.png" class="left" width="206px" height="206px"/>
				<div class="code_right">
					<p class="title">扫码立即下载</p>
					<p>首次登录领<span class="cf60">88元新用户礼包</span></p>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="main">
  <div class="main1 section">
    <div class="m1">
      <div class="m1_left">
      	<div class="m1_title">收车快人一步</div>
        <div class="m1_js">
        	随手翻看<span class="cf60">批发车源</span>、<span class="cf60">新发布车源</span> 心仪车源发布，我马上通知您！
        </div>
      	
      </div>
      <div class="m1_right vhBox">
    	<img src="${staticServer}/web/ads/images/img1.png"/>	
      </div>
      <div class="clear"></div>
    </div>
  </div>
  <div class="main2 section">
    <div class="m2">
    	<div class="m2_left vhBox">
    	<img src="${staticServer}/web/ads/images/img2.png"/>	
    	</div>
    	<div class="m2_right">
      <div class="m2_title">车辆记录查询</div>
      <div class="m2_js">
      	<p>查询4s保养记录<span class="cf60">仅需5折</span>，</p>
      	<p> 查询车辆出险记录<span class="cf60">会员特价</span>。</p>
      </div>
    	</div>
    </div>
  </div>
  <div class="main1 section">
  <div class="m1">
      <div class="m1_left">
      	<div class="m1_title">车商朋友圈</div>
        <div class="m1_js">超过十万同行在此发布<span class="cf60">求购</span>信息 更有<span class="cf60">探讨车辆</span>，偷看<span class="cf60">车辆成交价</span></div>
      </div>
      <div class="m1_right vhBox">
    	<img src="${staticServer}/web/ads/images/img3.png"/>	
      </div>
      <div class="clear"></div>
    </div>
  </div>
  <div class="main2 section">
    <div class="m2">
    	<div class="m2_left vhBox">
    	<img src="${staticServer}/web/ads/images/img4.png"/>	
    	</div>
    	<div class="m2_right">
      <div class="m2_title">全国车商联系方式</div>
      <div class="m2_js">一个APP即可拥有<span class="cf60">最全的人脉关系</span> 与过去繁琐的找人say no</div>
    	</div>
    </div>
  </div>
  <div class="main1 section">
  <div class="m1">
      <div class="m1_left">
        <div class="m1_js">
        	<p class="w530">多图分享，朋友圈营销好帮手！ 车辆检测，车的过去我告诉你！购车<span class="cf60">资金</span>，<span class="cf60">银行存款转账</span>有保障！ 物流托运，一个电话板车开到家！ 更多精彩，立即呈现>></p>
        </div>
      </div>
      <div class="m1_right vhBox">
    	<img src="${staticServer}/web/ads/images/img5.png" style="margin-left: -70px;"/>	
      </div>
      <div class="clear"></div>
    </div>
  </div>
</div>
<div class="right_fix">
	<div class="btn show_code">
		<div class="code_boxs hide">
			<img src="${staticServer}/web/page/images/code/code-brief.png"/>
			<p>扫码立即下载</p>
		</div>
	</div>
	<div class="btn to_top">
		
	</div>
</div>

<div class="footer">
	<div class="footer_center"><img src="${staticServer}/web/page/images/code/code-brief.png"/>扫码下载，收车快人一步</div>
</div>
<script type="text/javascript">
$(function(){
//	$("#appDownload").hover(function(){$(".download_ewm").show();},function(){$(".download_ewm").hide();});
//滚动到指定位置
$(".banner_head_nav li").click(function(){
	var index = $(this).index();
	var height = $(".section").eq(index).offset().top;
	$('html, body').animate({  
                    scrollTop: height  
    }, 500); 
})

//显示二维码
$(".show_code").hover(function(){
	$(".code_boxs").removeClass("hide");
},function(){
	$(".code_boxs").addClass("hide");
})

//回到顶部
$(".to_top").click(function(){
		$('html, body').animate({  
                    scrollTop: 0  
    }, 500); 
})

$(document).scroll(function(){
	var top = $("body").scrollTop();
	var height = $('.banner').height();
	var boxHeight = $(".main1").height();
	if(top>height){
		$('body').addClass("scroll");
	}else{
		$('body').removeClass("scroll");
	}
	
	var index = Math.round((top-height)/boxHeight);

	
	$(".banner_head_nav li").eq(index).addClass("cf60").siblings().removeClass("cf60");
	if(index<0){
		$(".banner_head_nav li").removeClass("cf60");
	}
})

	//根据屏幕宽度显示不同样式
	function getWidth() {
		var width = $(window).width();
		if(width < 1400) {
			$('body').addClass("w1130");
			// $('#datuad').Focus(false, 0);
		} else {
			$('body').removeClass("w1130");
			//$('#datuad').Focus(false, 0);
		}
	}
	getWidth();
	$(window).resize(getWidth);

//app下载数据
var appData={
    		appNum : 524695,
    		time:'2017.11.13',
    		year:2017,
    		moth:10,
    		day:13
    	};
    	//ie下直接new Date(string)会得到NAN
    	var dTime = (new Date())-(new Date(appData.year,appData.moth,appData.day));
    	
    	var day=(dTime/(24 * 60 * 60 * 1000)).toFixed(1);
    	var appNum = Math.floor(Math.pow(1.0001,day)*appData.appNum).toString().split("");
    	var len = appNum.length;
    	var str = '';
			$("#appNum").empty();
		for(var i = 0;i<len;i++){
    		if(i!=0 && (len-i)%3==0){
    			str+='<span>,</span>';	
    		}
			str+="<ul class='num'>";
			for(var j=0;j<10;j++){
				str+="<li>"+j+"</li>"
			}
			str+="</ul>";
    	}
		$("#appNum").append(str);
		setTimeout(function(){
			for(var i = 0;i<len;i++){
    			var num = appNum[i];
    			$("#appNum .num").eq(i).animate({"top":-num*43+"px"},2000);
    		}
		})
});
</script>
<!--<@index_macro.showBjIndexFooter type = 1/>-->
</body>
</html>
