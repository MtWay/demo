<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	
	<title>纷享详情--<#if appCarmanage??>${appCarmanage.title!''}</#if></title>
	<link rel="stylesheet" href="${staticServer}/web/mobpages/css/app/carfx.css">
	<script type="text/javascript" src="${staticServer}/web/mobpages/js/common/jquery.min.js"></script>
    <script type="text/javascript" src="${staticServer}/web/mobpages/js/common/jsPlug.min.js?t=20170630"></script>
</head>
<body>
	<div class="top"><i class="leftArrow" id="leftArrow"></i>纷享详情</div>
	<div class="title">
		<h3>【车纷享】2013年12月 保时捷E级 E200    coupe 1.8T的成交价</h3>
	</div>
	<div class="memberInfo">
		<div class="miHead"><img src="${staticServerUpload}${photo}" alt=""></div>
		<div class="miName">
			<div class="minName">
				${name!''}
				<#if vipState == 1>
				<span class="minnVip"></span>
				</#if>
				<span class="minnCredit">${credit!''}</span>
			</div>
			<p class="minCompany">${company!''}</p>
			<div class="date">
				2017-05-12
			</div>
		</div>
	</div>
	<div class="price">
		<i class="show"></i>
		<span class="">TA的车纷享已收入  <span class="cf60">${allmoney!"0"} </span> 元 </span>
		<span class="right btn jumpApp">点击查看</span>
	</div>
	<#if appCarmanage??>
	<div class="infoList">
		<p class="ilLine"><span>品牌型号</span>：${appCarmanage.title!''}</p>
		<p class="ilLine"><span>出厂日期</span>：${appCarmanage.produce_date!''}</p>
		<!--<p class="ilLine"><span>上牌日期</span>：${appCarmanage.usedate!''}</p>
		<p class="ilLine"><span>所在地</span>：${appCarmanage.area_code!''}</p>
		<p class="ilLine"><span>表显里程</span>：${appCarmanage.journey!''}万公里</p>
		<p class="ilLine"><span>车身颜色</span>：${appCarmanage.colorstr!''}</p>
		<p class="ilLine"><span>过户次数</span>：${appCarmanage.transfer!''}次</p>
		<p class="ilLine"><span>钥匙总数</span>：${appCarmanage.key_num!''}把</p>
		<p class="ilLine"><span>出售日期</span>：${appCarmanage.completion_date!''}</p>
		<p class="ilLine"><span>销售类型</span>：${appCarmanage.sale_type!''}</p>-->
		<!--<div class="ilState">
			<span class="ilsLook">${appCarmanage.visits!'0'}</span>
			<span class="ilsGood">${appCarmanage.approve!'0'}</span>
			<span class="ilsBad">${appCarmanage.tread!'0'}</span>
		</div>-->
	</div>
	<div class="infoBox">
		<h3>车辆信息</h3>
		<ul>
			<li><p>${appCarmanage.produce_date!''}</p><span>出厂日期</span></li>
			<li><p>${appCarmanage.usedate!''}</p><span>上牌日期</span></li>
			<li><p>${appCarmanage.completion_date!''}</p><span>出售日期</span></li>
			<li><p>${appCarmanage.journey!''}</p><span>表显里程</span></li>
			<li><p>
				<#if appCarmanage.car_auto??>
                           	<#if appCarmanage.car_auto == '1'>
                           		自动档
                           	<#elseif appCarmanage.car_auto == '2'>
                           		手动档
                           	<#elseif appCarmanage.car_auto == '3'>
                           		手自一体
                           	<#else>
                           		未知
                           	</#if>
                           	<#else>
                           			未知
                           	</#if>
				${appCarmanage.car_auto!''}
			</p><span>变速器</span></li>
			<li><p>${appCarmanage.colorstr!''}</p><span>车身颜色</span></li>
			<li><p>${appCarmanage.transfer!''}</p><span>过户次数</span></li>
			<li><p>${appCarmanage.key_num!''}</p><span>钥匙总数</span></li>
			<li><p>${appCarmanage.sale_type!''}</p><span>销售类型</span></li>
		</ul>
	</div>
	</#if>
	<div class="btnBox">
		<div class="btnY jumpApp" >
			赏
		</div>
		<div class="btnTk jumpApp">
			${money!'0'}元偷看成交价
		</div>		
	</div>
	<#list commentlist as li>
		<div class="reviewList">
		<div class="headBox">
			<img src="http://img.hx2cars.com/upload/newimg1/M03/15/02/Clo8w1h4foOAUvofAAHeFIfpFKw509_small_200_200.jpg"/>
		</div>
		<div class="detail">
			<h4>
				<span>${li.name!''}</span>
				<#if li.vipstate??><i class="minnVip"></i></#if>
				<i class="minnCredit">${li.credit!'0'}</i>
			</h4>
			<p class="company">${li.company!''}</p>
			<p class="remark">${li.comment!''}</p>
		</div>
		<div class="right_time">
			<i class="new <#if li_index !=0>hidden</#if>"></i>
			<div class="clear"></div>
			<p>${li.creatiTime!''}</p>
		</div>
	</div>
		</#list>
	<div class="reviewList">
		<div class="headBox">
			<img src="http://img.hx2cars.com/upload/newimg1/M03/15/02/Clo8w1h4foOAUvofAAHeFIfpFKw509_small_200_200.jpg"/>
		</div>
		<div class="detail">
			<h4>
				<span>郭美美</span>
				<i class="minnVip"></i>
				<i class="minnCredit">500</i>
			</h4>
			<p class="company">杭州协和名车行</p>
			<p class="remark">刚刚给你点了一个赞！</p>
		</div>
		<div class="right_time">
			<i class="new"></i>
			<div class="clear"></div>
			<p>2012-05-12</p>
		</div>
	</div>
	<div class="reviewList">
		<div class="headBox">
			<img src="http://img.hx2cars.com/upload/newimg1/M03/15/02/Clo8w1h4foOAUvofAAHeFIfpFKw509_small_200_200.jpg"/>
		</div>
		<div class="detail">
			<h4>
				<span>郭美美</span>
				<i class="minnVip"></i>
				<i class="minnCredit">500</i>
			</h4>
			<p class="company">杭州协和名车行</p>
			<p class="remark">刚刚给你点了一个赞！</p>
		</div>
		<div class="right_time">
			<i class="new hidden"></i>
			<div class="clear"></div>
			<p>2012-05-12</p>
		</div>
	</div>
	<!--<p class="fxTip">TA的价格不靠谱请及时<span>反馈</span>，经确认属实后，已支付款项将退回
到您的现金账户余额中。</p>-->
	<!--<p class="fxButton" id="fxButton"><span>打开华夏客户端</span></p>-->
</body>
<script>
	$(function(){
		//下载
	    $('#fxButton span,.jumpApp').click(function() {
	        $.hxWaptoapp();
	    });
	});
	var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?5b941f460f2ec63730c9f325ba44961f";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
</script>
</html>