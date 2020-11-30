<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=7,9,10,Edge"/>
<title>在售车辆——会员中心</title>
<link href="${staticServer}/web/member_new/css/member_common.css?t=20170628" rel="stylesheet" type="text/css"/>
<link href="${staticServer}/web/member_new/css/cars_onsell.css?t=20170703" rel="stylesheet" type="text/css"/>
<#--左侧导航条-->
<link href="${staticServer}/web/member_new/css/index.css" rel="stylesheet" type="text/css"/>
<#--打印样式-->
<link href="${staticServer}/web/member_new/css/print_panel.css?t=20170613" rel="stylesheet" type="text/css"/>
<script type="text/javascript">
	function showMsg(message){
			$(".SHARE").html(message);
			$(".SHARE").show();
			setTimeout(function () {
				$(".SHARE").fadeOut("slow");
		    }, 2000);
		}
	var STATICSERVER="${staticServer}";
	var CONTEXTPATH="${contextPath}";
	var staticServerUpload="${staticServerUpload}";
	var BDText = "";
	var BDDesc = "";
	var BDUrl = "";
	var BDPic = "";
	var UPDATE ={
		Notfreeuser:${Notfreeuser!'0'},
		updatesize :'<#if updateList??>${updateList?size}</#if>',
		carNum:50,
		updateSwitch:1,
		Updatetime :[],
		money:'${money!"1"}'
	}
	<#list updateList as li>
	UPDATE.Updatetime.push('${li.updatetime}');
	UPDATE.updateSwitch = ${li.updateSwitch};
	UPDATE.carNum = '${li.carNum}';
	</#list>
	var pArea = <#if pArea??>{area_name:'${pArea.area_name}',area_code:'${pArea.area_code}'}<#else>''</#if>
	var cArea = <#if cArea??>{area_name:'${cArea.area_name}',area_code:'${cArea.area_code}'}<#else>''</#if>
</script>
<#--引入相关的JS-->
<script type="text/javascript"  src="${staticServer}/web/common/js/areacode.js"></script>
<script src="${staticServer}/web/common/js/jquery/jquery.min.js" type="text/javascript"></script>
<script src="${staticServer}/web/common/js/jquery.blockUI.js" type="text/javascript"></script>
<script type="text/javascript" src="${staticServer}/web/gbpage/js/common/hx2carPages.js?t=20170725"></script>
<script src="${staticServer}/web/common/js/My97DatePicker/WdatePicker.js"></script>
<!--二维码及微信支付-->
<link href="${staticServer}/web/member_new/css/wxpay.css" rel="stylesheet" type="text/css"/>
<script src="${staticServer}/web/common/js/wxpay.js?t=20170609" type="text/javascript"></script>
<script src="${staticServer}/web/common/js/qrcode.js" type="text/javascript"></script>
<#--引入打印js-->
<script type="text/javascript" src="${staticServer}/web/common/js/jquery/jquery.jqprint.js?t=20170526"></script>
<#--上传图片的JS-->
<script type="text/javascript" src="${staticServer}/web/common/js/jquery/ajaxfileupload.js"></script>
<#--广告-->
<script type="text/javascript" src="${staticServer}/web/advert/js/MemberAds.js"> </script>
<script type="text/javascript" src="https://www.hx2car.com/upload/ads/js/MemberAds/${webutil.getStationId()}/${webutil.getNowYear()}/${webutil.getMonthDay()}.js"></script>
<#--车源管理的js-->
<script type="text/javascript" src="${staticServer}/web/member_new/js/vip_manager_onsell.js?t=20170731"></script>
<script type="text/javascript" src="${staticServer}/web/member_new/js/printCss.js?t=2017070301"></script>
</head>

<body>
	<#--用于分享的表单-->
	<input id="bdText" type="hidden" value=""/>
	<input id="bdDesc" type="hidden" value=""/>
	<input id="bdUrl"  type="hidden" value=""/>
	<input id="bdPic"  type="hidden" value=""/>
	<#--用于提交排序的表单-->
	<form id="search" name="search" method="get" >
		<input id="pageSize" name="pageSize" type="hidden" value="${(vo.pageSize)!}"/>
		<input id="currPage" name="currPage" type="hidden" value="${(vo.currPage)!}"/>
		<input id="orderCol" name="orderCol" type="hidden" value="${(vo.orderCol)!}"/>
		<input id="cartype" name="title" type="hidden" value="${(vo.title)!}"/>
		<input id="carcode" name="carCode" type="hidden" value="${(vo.carCode)!}"/>
		<input id="orderType" name="orderType" type="hidden" <#if vo.orderType??>value=${(vo.orderType)!} </#if> />
		<input id="order" name="order" type="hidden" <#if vo.order??>value=${(vo.order)!}</#if> />
		<input id="beginT" name="beginTime" type="hidden" value="${(vo.beginTime)!}"/>
		<input id="endT" name="endTime" type="hidden" value="${(vo.endTime)!}"/>
		<input id="beginP" name="beginPrice" type="hidden" value="${(vo.beginPrice)!}"/>
		<input id="endP" name="endPrice" type="hidden" value="${(vo.endPrice)!}"/>
		<input name="sale" id="sale" type="hidden" value="${(vo.sale)!}"/>
		<input name="hasPic" id="haspic" type="hidden" value="${(vo.hasPic)!}"/>
		<input name="recommend" id="recommend" type="hidden" value="${(vo.recommend)!}"/>
	</form>
	<#--小搜索框的提交表单-->
	<form id="little_search" name="little_search" method="post" >
		<input id="commit_sale" name="sale" type="hidden" value="${(vo.sale)!}"/>
		<input id="commit_hasPic" name="hasPic" type="hidden" value="${(vo.hasPic)!}"/>
		<input id="commit_recommend" name="recommend" type="hidden" value="${(vo.recommend)!}"/>

		<input id="commit_carCode" name="carCode" type="hidden" value="${(vo.carCode)!}"/>
		<input id="commit_title" name="title" type="hidden" value="${(vo.title)!}"/>

		<input id="commit_beginTime" name="beginTime" type="hidden" value="${(vo.beginTime)!}"/>
		<input id="commit_endTime" name="endTime" type="hidden" value="${(vo.endTime)!}"/>
		<input id="commit_beginPrice" name="beginPrice" type="hidden" value="${(vo.beginPrice)!}"/>
		<input id="commit_endPrice" name="endPrice" type="hidden" value="${(vo.endprice)!}"/>
	</form>
	<input id="carid" type="hidden" />
<div class="bg" style="display:none;"></div>
<#import "/common/indexMacro.ftl" as index_macro>
<#import "/common/memberMacro.ftl" as member_macro>
<#import "/common/commonFunc.ftl" as common_func>
<#import "/common/pageMacro.ftl" as page_macro>
<#assign userType=webutil.getUserType()>
<#assign getstar=webutil.getstar()>
<#--会员中心的顶部-->
<@index_macro.showVipIndexTop />
<#--广告
<div class="header_ad_frame" style="display:none;" id="membertopads">
</div>
<#--搜索-->
<@member_macro.showVipSearch />

<#--打印显示框的div-->
<div id="print_panel" class="print_panel" style="display: none;">
	<div class="header">
		<div class="btn rt">
			<button class="printBtn">打印</button>
			<button class="closeBtn">关闭</button>
		</div>
	</div>
	<div class="content">
			<div class="cLeft">
			</div>
			<div class="addPanel" style="display:none">
                <div class="addTitle"><span>添加标签</span><i class="addPanelClose rt">x</i></div>
                <div class="box">
                    <p>请输入你想添加的标签名称，最多8个字</p>
                    <input type="text" class="addInput"><div class="numCount"><span class="count">0</span>/<span class="totalNum">8</span></div>
                    <button class="addBtn">确定</button>
                    <p class="waring" style="display:none; color:#f60;">配置超过20个，不能添加！请删除后再添加！</p>
                </div>
            </div>
			<div class="cRight">
				<div class="templateChoose">
					<div class="preFW lt"></div>
					<div class="templateImg lt">
						<ul class="lt">
							<li class="temImg"><div class="noModelBg"></div><img src="${staticServer}/web/member_new/images/template/formWork02.jpg"/><p>模板一</p></li>
							<li class="temImg"><div></div><img src="${staticServer}/web/member_new/images/template/formWork01.jpg"/><p>模板二</p></li>
							<li><div></div><img src="${staticServer}/web/member_new/images/template/formWork03.jpg"/><p>模板三</p></li>
							<li><div></div><img src="${staticServer}/web/member_new/images/template/formWork04.jpg"/><p>模板四</p></li>
						</ul>
						<div class="sortBtn">
							<span class="dot"></span>
							<span class="dot"></span>
							<span class="dot active"></span>
							<span class="dot"></span>
						</div>
					</div>
					<div class="nextFW lt"></div>
				</div>
				<div class="line"></div>
				<dl class="templateSet">
					<dt class="setTitle">模板设置</dt>
					<dd class="setColor">
						<div style="display: none;"><input type="button" class="disabled" onclick="changeBgColor(this,'#b87afd')" disabled="disabled"><span></span></div>
						<div><input type="button" class="orange" onclick="changeBgColor(this,'#f60')"><span>底色</span></div>
						<div><input type="button" class="red" onclick="changeBgColor(this,'#ed0b0b')"><span></span></div>
						<div><input type="button" class="green" onclick="changeBgColor(this,'#4acd93')"><span></span></div>
						<div><input type="button" class="blue" onclick="changeBgColor(this,'#3abbe5')"><span></span></div>
						<div><input type="button" class="purple" onclick="changeBgColor(this,'#b87afd')"><span></span></div>
					</dd>
					<dt class="setTitle">模板边框</dt>
					<dd class="setOption borderChoose">
						<div class="showOption">无</div>
						<ul class="chooseOption" style="display: none">
							<li>无</li>
							<li>单线</li>
							<li class="dubbleLine">双线</li>
							<li>纹理</li>
							<li>黑白无背景</li>
						</ul>
					</dd>
					<dt class="setTitle">模板头部</dt>
					<dd class="setOption headChoose">
						<div class="showOption">显示</div>
						<ul class="chooseOption" style="display: none">
							<li data-head="">显示</li>
							<li data-head="">隐藏</li>
							<li data-head="">只显示头部</li>
						</ul>
					</dd>
					<dt class="setTitle">店铺名称</dt>
					<dd class="setOption storeName">
						<input type="text" class="setInput" data-control='storeTitle'>
						<div class="numCount"><span class="count">0</span>/<span class="totalNum">18</span></div>
					</dd>
					<dt class="setTitle">店铺位置</dt>
					<dd class="setOption storePosition">
						<div class="showOption">置左(默认)</div>
						<ul class="chooseOption" style="display: none">
							<li>置左(默认)</li>
							<li>置中</li>
							<li>置右</li>
						</ul>
					</dd>
				</dl>
				<div class="line clear"></div>
				<dl class="templateSet">
					<dt class="setTitle">车辆编号</dt>
					<dd class="setOption carNum">
						<div class="showOption">系统给定</div>
						<ul class="chooseOption" style="display: none">
							<li>系统给定</li>
							<li>隐藏</li>
							<li>自定义</li>
						</ul>
						<div class="inputContainer" style="display: none">
							<input type="text" class="setInput" data-control='showCarNum'>
							<div class="numCount"><span class="count">0</span>/<span class="totalNum">16</span></div>
						</div>
					</dd>
					<dt class="setTitle">评估师</dt>
					<dd class="setOption appraiser">
						<div class="showOption">显示</div>
						<ul class="chooseOption" style="display: none">
							<li>显示</li>
							<li>隐藏</li>
						</ul>
						<div class="inputContainer">
							<input type="text" class="setInput" data-control='showAppraiser'>
							<div class="numCount"><span class="count">0</span>/<span class="totalNum">16</span></div>
						</div>
					</dd>
					<dt class="setTitle">车辆标题</dt>
					<dd class="setOption carTitle">
						<textarea class="setText" data-control='carInfoTitle'>请输入车辆标题</textarea>
						<div class="numCount"><span class="count">0</span>/<span class="totalNum">40</span></div>
					</dd>
				</dl>
				<div class="line clear"></div>
				<dl class="templateSet">
					<dt class="setTitle">价格类型</dt>
					<dd class="setOption priceStyle">
						<div class="showOption">标价</div>
						<ul class="chooseOption" style="display: none">
							<li>标价</li>
							<li>一口价</li>
							<li>面议</li>
						</ul>
						<div class="inputContainer">
							<input type="text" class="setInput" value="25.00" data-control='priceNum'>
							<div class="numCount">万元</div>
						</div>
					</dd>
					<dt class="setTitle">新车价</dt>
					<dd class="setOption newCarPrice">
						<div class="showOption">显示</div>
						<ul class="chooseOption" style="display: none">
							<li>显示</li>
							<li>隐藏</li>
						</ul>
						<div class="inputContainer">
							<input type="text" class="setInput" value="25.00" data-control='totlePrice'>
							<div class="numCount">万元</div>
						</div>
					</dd>
				</dl>
				<div class="line clear"></div>
				<dl class="templateSet">
					<dt class="checkTitle">基本信息 &nbsp;<span>最多可以选8个</span></dt>
					<dd class="basicInfo">
						<ul class="checkContainer">
							<li><input type="checkbox" id="year" data-class="basicYear"><label for="year">上牌年份</label></li>
							<li><input type="checkbox" id="oil" data-class="basicOil"><label for="oil">燃油</label></li>
							<li><input type="checkbox" id="mile" data-class="basicMile"><label for="mile">里程</label></li>
							<li><input type="checkbox" id="carType" data-class="basicCarType"><label for="carType">车辆种类</label></li>
							<li><input type="checkbox" id="gears" data-class="basicGears"><label for="gears">档位</label></li>
							<li><input type="checkbox" id="canLoan" data-class="basicCanLoan"><label for="canLoan">能否按揭</label></li>
							<li><input type="checkbox" id="canTransfer" data-class="basicCanTransfer"><label for="canTransfer">能否过户</label></li>
							<li><input type="checkbox" id="standard" data-class="basicStandard"><label for="standard">排放</label></li>
							<li><input type="checkbox" id="insuranceValid" data-class="basicInsuranceValid"><label for="insuranceValid">强险有效期</label></li>
							<li><input type="checkbox" id="yearValid" data-class="basicYearValide"><label for="yearValid">年审有效期</label></li>
						</ul>
					</dd>
					<dt class="checkTitle">车辆描述</dt>
					<dd class="checkContainer carDescribe">
						<textarea class="setText" data-control='showDescribe'>请输入车辆描述</textarea>
						<div class="numCount"><span class="count">7</span>/<span class="totalNum">100</span></div>
					</dd>
				</dl>
				<div class="line clear"></div>
				<dl class="templateSet">
					<dt class="checkTitle">车辆配置 &nbsp;<span>最多可以选20个</span><span class="add rt">+ 添加</span></dt>
					<dd class="carConfig">
						<ul class="deviceContainer">
						</ul>
					</dd>
				</dl>
				<div class="linee clear"></div>
				<dl class="templateSet">
					<dt class="checkTitle">限量信息</dt>
					<dt class="setTitle">二维码文案</dt>
					<dd class="setOption codeText">
						<input type="text" class="setInput" value="扫码查看车辆详情" data-control='showCodeText'>
						<div class="numCount"><span class="count">0</span>/<span class="totalNum">8</span></div>
					</dd>
					<dt class="setTitle">联系人</dt>
					<dd class="setOption contact">
						<div class="showOption">显示</div>
						<ul class="chooseOption" style="display: none">
							<li>显示</li>
							<li>隐藏</li>
						</ul>
						<div class="inputContainer">
							<input type="text" class="setInput" data-control='showContact'>
							<div class="numCount"><span class="count">0</span>/<span class="totalNum">6</span></div>
						</div>
					</dd>
					<dt class="setTitle">联系电话</dt>
					<dd class="setOption phoneNum">
						<div class="showOption">显示</div>
						<ul class="chooseOption" style="display: none">
							<li>显示</li>
							<li>隐藏</li>
						</ul>
						<div class="inputContainer">
							<input type="text" class="setInput" data-control='showphoneNum'>
							<div class="numCount"><span class="count">0</span>/<span class="totalNum">11</span></div>
						</div>
					</dd>
				</dl>
			</div>
	</div>
</div>
<#--浏览器弹框-->
<div class="browserInfo hidden">
	<p class="browserTitle">提示信息</p>
	<div class="browserContent">
		<p>您的浏览器版本太低，不能使用，请下载最新版本的浏览器。<a href="${staticServer}/web/download/chrome_59.exe">点击下载</a></p>
	</div>
</div>
<#--3合1弹框 -->
<div class="models hide">
	<div class="black">
	</div>
	<div class="mondel-content">
		<div class="model-title">
			<ul>
				<li class="model-select">自动更新</li>
				<li>推荐到首页</li>
				<li>车源推广</li>
				<li>查看车辆排名</li>
			</ul>
			<i class=" icon-close">╳</i>
		</div>
		<div class="model-main">
			<div class="model1">
				<#if Notfreeuser==1>
				<p>每台车消耗2华币</p>
				<span>每天更新</span>
				<input id="allsale" class="salebutton" type="checkbox" name="sale" checked="checked" value="1"/>全部在售
				<input id="partsale" class="salebutton" type="checkbox" name="sale" value="2"/>最近在售<input class="carn" type="number" >辆
				<span class="warn_1">请输入1-999范围内</span>
				<div class="timelist">
					<p>每天自动更新时间点</p>
						<ul>
						<li class=" <#if money == 0 && money?? >not</#if>"><span>07:00 </span> <i>v</i><i class="icon-after add <#if money == 0 && money?? >hide</#if>"></i></li>
						<li class="hide <#if money == 0 && money?? >not</#if>"><span>07:00 </span> <i>v</i><i class="icon-after rem <#if money == 0 && money?? >hide</#if>"></i></li>
						<li class="hide <#if money == 0 && money?? >not</#if>"><span>07:00</span> <i>v</i><i class="icon-after rem <#if money == 0 && money?? >hide</#if>"></i></li>
						<li class="hide <#if money == 0 && money?? >not</#if>"><span>07:00</span> <i>v</i><i class="icon-after rem <#if money == 0 && money?? >hide</#if>"></i></li>
					</ul>
						<#else>
				<p class="msg-f">尊敬的会员，您已开通自动更新套餐</p>
				<p>每天自动更新在售车源前<span id='carNum'></span>辆</p>
				<div class="timelist">
					<p>每天自动更新时间点</p>
						<ul>
						<li class="hide"><span>08:30 </span> <i>v</i></li>
						<li class="hide"><span>10:30</span> <i>v</i></li>
						<li class="hide"><span>16:00</span> <i>v</i></li>
						<li class="hide"><span>22:00 </span> <i>v</i></li>
					</ul>
					</#if>
				</div>
				<div class="up_state">
					<span>当前状态：</span>
					<#if money == 0 && money?? >
					<div class="disable open">
						已开启
					</div>
					<div class="select_auto">
						已关闭
					</div>
					<#else>
					<div class="open <#if Notfreeuser != 1 >select_auto</#if>">
						已开启
					</div>
					<div class="<#if Notfreeuser == 1 >select_auto<#else>disable</#if>">
						已关闭
					</div>
						</#if>
				</div>
					<#if money == 0 && money?? >
				<p class="mag-f">提示：华币不足，无法开启自动更新，请充值</p>
						</#if>
				<div class="btn_box">
					<#if money == 0 && money?? >
					<div class="btn_update not" id="update_sub">
							<a href="hbrecharge.htm">充值</a>
							<#else>
					<div class="btn_update" id="update_sub">
						确定
						</#if>
					</div>
					<div class="btn_update close_update">
						取消
					</div>
				</div>
			</div>
		<!--推荐-->
			<div id="areas" class=" model2 hide" style="cursor:auto; z-index:13;">
				<div class="list">
					<!--<i>推荐到：</i>-->
					<!--<div id="recommand_area" style="float:left;width:360px;">
                 <em class="icon4" style="margin-right:10px; cursor:auto;">选择站点</em>
            </div>-->
				</div>
				<div class="SRegioncon">
					<em class="icon4" style="margin:10px 10px 0 0 ; cursor:auto;">选择站点</em>
					<#if stationsList?exists>
						<#list stationsList as stations>
							<dl class="RegionList <#if stations_index==0>hide </#if>">
								<#if stations?exists>
									<#list stations as station>
										<#if station_index==0>
											<#if station.id!=1>
												<dt>${station.firstWord?if_exists}</dt>
											</#if>
											<dd>
										</#if>
										<#if station.id!=1>
											<span>
												<input name="stationIds" type="checkbox" <#if station.id==1>checked disabled</#if> class="CheckB" value="${station.id?if_exists}" id="${station.id?if_exists}" /><label for="${station.id?if_exists}">${station.name?if_exists}</label>
											</span>
										</#if>
										<#if station.id==1>
											<div>
												<span>
												<input name="stationIds"  type="checkbox" <#if station.id==1>checked disabled</#if> class="CheckB" value="${station.id?if_exists}" id="${station.id?if_exists}" /><label  for="${station.id?if_exists}">${station.name?if_exists}</label>
												</span><br/>
											</div>
										</#if>
									</#list>
								</#if>
								</dd>
							</dl>
						</#list>
					</#if>
				</div>
				<p class="icon">
					<a class="commit_sure" id='commit_sure'>确定</a>
					<a class="closeModel">取消</a>
				</p>
			</div>
		<!--推广-->
		<div class="model3 hide">
			<div style="margin-bottom: 20px;">
				<span class="mleft" style="line-height: 37px;">
					推广地区：
				</span>
				<div class="mright">
					<div class="selectBox">
						<span class="toogles">
							<#if pArea??>
								<span class="address" id="province" data-val="${pArea.area_code}">${pArea.area_name}</span>
							<#else>
								<span class="address" id="province" data-val="100000">全国</span>
							</#if>
							<span class="right">V</span>
						</span>
						<div class="selectList hide">
							<ul>
								<li data-val = "100000">全国</li>
							</ul>
						</div>
					</div>
					<#assign p = "全国,北京市,重庆市,上海市,天津市">
					<div class="selectBox <#if cArea?? && (pArea?? && p?index_of(pArea.area_name) == -1)><#else>hide</#if>">
						<span class="toogles">
							<#if  cArea?? && (pArea?? && p?index_of(pArea.area_name) == -1)>
								<span class="address" id="province_city" data-val = "${cArea.area_code}">${cArea.area_name}</span>
							<#else>
								<span class="address" id="province_city" data-val="100000">全国</span>
							</#if>
							<span class="right">V</span>
						</span>
						<div class="selectList_city hide">
							<ul>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="clear">
			</div>
			<div class="mlist red">
				<span class="mleft">
					温馨提示：
				</span>
				<div class="mright inline">
					<span>还没有人购买此广告位</span>
				</div>
			</div>
			<div class="mlist">
				<span class="mleft">
					推广车辆：
				</span>
				<div class="mright">
					<span id="brand"></span><span class="red prices"></span>
				</div>
			</div>
			<div class="mlist">
				<span class="mleft">
					开始时间：
				</span>
				<div class="mright" id='etime'>

				</div>
			</div>
			<div class="mlist">
				<span class="mleft daysLeft">
					推广天数：
				</span>
				<div class="mright">
					<ul class="days">
						<li class="select">1天</li>
						<li>3天</li>
						<li>5天</li>
						<li>7天</li>
						<li>15天</li>
						<li style="margin: 0;">30天</li>
					</ul>
				</div>
			</div>
			<div class="mlist">
				<span class="mleft">
					付款金额：
				</span>
				<div class="mright">
					<span class="red"><span id="paynum">300</span>华币</span>
				</div>
			</div>
			<div class="paybox hide">
			<p class="msg-hb">华币不足，请充值<span class="red">300</span>华币！</p>
			<div class="mlist">
				<span class="mleft payLeft">
					支付方式：
				</span>
				<div class="mright " id="payState">
					<div class="icon-pay wechat select">
						<i></i>
					</div>
					<div class="icon-pay ali">
						<i></i>
					</div>
				</div>
			</div>
		</div>
			<p class="icon">
			<a class="commit_sure" id="generalizeSub">立即购买</a>
			<a class="closeModel">取消</a>
		</p>
		</div>
		<!--排名-->
		<div class="model4 hide">
			<div class="carDetail">
				<img src=""/>
				<div class="dright">
				</div>
			</div>
			<div class="clear">
			</div>
			<div class="ranking">
				<span class="sleft">地区排名：</span>
				<div class="selectBox">
						<span class="toogles">
							<#if pArea??>
								<span class="address" id="dprovince" data-val="${pArea.area_code}">${pArea.area_name}</span>
							<#else>
								<span class="address" id="dprovince" data-val="100000">全国</span>
							</#if>
							<span class="right">V</span>
						</span>
						<div class="selectList hide">
							<ul>
								<li data-val = "100000">全国</li>
							</ul>
						</div>
					</div>
					<div class="selectBox <#if cArea?? && (pArea?? && p?index_of(pArea.area_name) == -1)><#else>hide</#if>">
						<span class="toogles">
							<#if  cArea?? && (pArea?? && p?index_of(pArea.area_name) == -1)>
								<span class="address" id="dprovince_city" data-val = "${cArea.area_code}">${cArea.area_name}</span>
							<#else>
								<span class="address" id="dprovince_city" data-val="100000">全国</span>
							</#if>
							<span class="right">V</span>
						</span>
						<div class="selectList_city hide">
							<ul>
							</ul>
						</div>
					</div>
			</div>
			<div class="clear">
			</div>
			<p class="msg-r">
				<span class="haverank">该车辆在当前地区排名： <span class="red" id="rankNum"> 0 </span> <span id="rankNumAfter">位</span>
				<span class="msg-n hide">该车辆不在当前地区</span>
			</p>
			<p class="icon">
			<a class="commit_sure tomodel2">提高名次</a>
			<a class="closeModel">取消</a>
		</p>
		</div>
		</div>
	</div>
</div>
<#--推荐的地区弹框
<div id="area" class="tuijian_modify" style="padding:20px 0 25px; display:none; cursor:auto; z-index:13;">
       <div class="list">
            <i>推荐到：</i>
            <div id="recommand_area" style="float:left;width:360px;">
                 <em class="icon4" style="margin-right:10px; cursor:auto;">选择站点</em>
            </div>
       </div>
       <div class="SRegioncon" >
       			<#if stationsList?exists>
						<#list stationsList as stations>
							<dl class="RegionList" <#if stations_index==0> style="display:none"</#if>>
								<#if stations?exists>
									<#list stations as station>
										<#if station_index==0>
											<#if station.id!=1>
												<dt>${station.firstWord?if_exists}</dt>
											</#if>
											<dd>
										</#if>
										<#if station.id!=1>
											<span>
												<input name="stationIds" type="checkbox" <#if station.id==1>checked disabled</#if> class="CheckB" value="${station.id?if_exists}" id="${station.id?if_exists}" /><label for="${station.id?if_exists}">${station.name?if_exists}</label>
											</span>
										</#if>
										<#if station.id==1>
											<div style="display:none">
												<span>
												<input name="stationIds" style="display:none" type="checkbox" <#if station.id==1>checked disabled</#if> class="CheckB" value="${station.id?if_exists}" id="${station.id?if_exists}" /><label style="display:none" for="${station.id?if_exists}">${station.name?if_exists}</label>
												</span><br/>
											</div>
										</#if>
									</#list>
								</#if>
									</dd>
							</dl>
						</#list>
				</#if>
       	</div>
        <p class="icon"><a id="commit_sure">确定</a><a>取消</a></p>
</div>-->
<#--管理出售信息-->
<div class="vipcenter">
  <@member_macro.leftNav />
  <div class="centerRight">
    <div class="cars_onsell">
        <div class="cars_onsell_search">
	     <div class="cars_onsell_title">
	          <a href="${contextPath}/vip/manageronsell.htm" target="_self"><span class="select">在售车辆</span></a>
	          <a href="${contextPath}/vip/manageronsell.htm?sale=2" target="_self"><span>下架车辆</span></a>
	          <a href="${contextPath}/vip/manageronsell.htm?sale=1" target="_self"><span>已售车辆</span></a>
	          <a href="${contextPath}/vip/timingjoblist.htm" target="_self"><span>定时管理</span></a>
	          <a class="icon5 add_staff" style="color:#fff;" href="${contextPath}/vip/publishcar.htm" target="_self">快速发车</a>
	     </div>
	     <div class="search">
	     	  <form id="searchcar" name="searchcar" method="get" >
	          <div class="choice" style="margin-left:5px;">
	              <span>是否推荐：</span>
	              <div id="input_tuijian" class="w68" style="z-index:11;">
	                  <input class="input_w45" type="text"  readonly="readonly" style="cursor:pointer" value="<#if vo.recommend==0>未推荐<#elseif  vo.recommend==1>已推荐<#else>全部</#if>" /><i class="xiala" title="亲，可以通过点击选择推荐哦" style="cursor:pointer">∨</i>
	                         <div class="tuijian" id="tuijian_box" style="width: 65px; display:none;">
	                         		<p>
										<a data-id="">全部</a>
										<a data-id="1">未推荐</a>
										<a data-id="0">已推荐</a>
								   </p>
	                         </div>
	              </div>
	         </div>
	          <div class="choice">
	                <span>品牌：</span>
	                <span id="input_title" style="z-index:11; position:relative;">
	                      <input class="input_w90" type="text" <#if vo.title??>value="${vo.title}"</#if> />
		                 <#--以前发车的品牌-->
	                     <div class="hx_sBrand">
	                        <p class="sBrand_num"><span>全部品牌</span>
	                               <#if titleMap??>
	                                   <#list titleMap?keys as title>
	                                   		<a >${title}</a>
	                                    </#list>
	                                </#if>
	                           </p>
	                           <#if titleMap??>
	                            <div id="ALlist" class="sBrand_all">
	                              <#list titleMap?keys as title>
		                           <div class="sBrand_list">
		                               <#list titleMap[title] as brand>
		                               		<div class="sBrand_name">${brand}</div>
		                               </#list>

		                           </div>
	                             </#list>
								</div>
	                         </#if>
	                     </div>
	                 </span>
	          </div>
	          <div class="choice">
	                <span>年份：</span>
	                <div id="input_beginTime" class="w68" style="z-index:11;">
	                         <input class="input_w45" type="text" placeholder="请选择" title="亲，可以通过点击选择年份哦" readonly="readonly" style="cursor:pointer" <#if vo.beginTime??>value="${vo.beginTime}"</#if> /><i class="xiala" title="亲，可以通过点击选择年份哦" style="cursor:pointer">∨</i>
	                         <div class="licensing_box" style="width: 65px; display:none;">
	                         		<p>
		                            <#if timeList??>
									<#list timeList as time>
										<a value=${time} <#if vo.beginTime??><#if vo.beginTime==time>selected</#if></#if>>${time}</a>
									</#list>
									</#if>
								   </p>
	                         </div>
	                </div>
	                <span>-</span>
	                <div id="input_endTime" class="w68" style="z-index:11;">
	                         <input class="input_w45" type="text" placeholder="请选择" title="亲，可以进行点击选择年份哦" readonly="readonly" style="cursor:pointer" <#if vo.endTime??>value="${vo.endTime}"</#if> /><i class="xiala" title="亲，可以进行点击选择年份哦" style="cursor:pointer">∨</i>
	                         <div class="licensing_box" style="width: 65px; display:none;">
		                            <p>
		                            <#if timeList??>
									<#list timeList as time>
										<a value=${time} <#if vo.endTime??><#if vo.endTime==time>selected</#if></#if>>${time}</a>
									</#list>
									</#if>
								   </p>
	                         </div>
	               </div>
	            </div>
	            <div class="choice">
	                <span>价格：</span>
	                <div id="input_beginPrice" class="w68" style="z-index:9;width:95px;">
	                    <input class="input_w45" type="text" <#if vo.beginPrice?? && vo.beginPrice != "">value="${vo.beginPrice}"</#if> /><span class="input_wan">万</span>
	                </div>
	                <span>-</span>
	                <div id="input_endPrice" class="w68" style="z-index:9;width:95px;">
	                    <input class="input_w45" type="text" <#if vo.endPrice?? && vo.endPrice != "">value="${vo.endPrice}"</#if>/><span class="input_wan">万</span>
	               </div>
	             </div>

	          </form>
	          <div class="icon4" onclick="searchmycar(0)" sytle="cursor:pointer;">搜索</div>
	       </div>
	   </div>
<#--批量更新和分页-->
     <div class="cars_onsell_content">
       <div id="choice_function" class="cars_onsell_title3">
          <div class="tuijian_icon">
               <ul>
               		<#if  user.flag==1 || vipdata.verifyState==1>
	                   <div class="icons">
	                    	<span class="icons1 plgx" >批量更新</span>
		                    <span class="icons1 pltj" >批量推荐</span>
		               </div>
		             <!-- <div class="icons_line">|</div>
		               <div class="icons">
		                    <span class="icons1 dsgx" <#if vo.sale?? && vo.sale=="1">style="display:none"</#if> >定时更新
		                    	<#--定时更新的提交表单-->
		                          <div id="update_form" class="icons_box" style="display: none;">
		                               <p class="list_title" >定时更新</p>
		                               <p class="list">
		                               		<i>更新开始：</i>
		                               		<input id="begindate1" class="input_box" type="text" readonly="readonly" onfocus="WdatePicker({minDate:'%y-%M-%d',dateFmt:'yyyy-MM-dd'})"/>
		                               		<i>更新结束：</i>
		                               		<input id="todate1" class="input_box" type="text" readonly="readonly" onclick="dateStart()"/>
		                               	</p>
		                               <p class="list">
		                               		<i>时间点：</i>
		                               		<input id="oper_time" class="input_box" type="text" readonly="readonly" onclick="WdatePicker({onpicking:validate,dateFmt:'HH:mm:ss',alwaysUseStartDate:true})">
		                               	</p>
		                               <div id="time_way" class="list">
		                                   <i>定时方式：</i>
		                                   <ul style="float:left; width: 360px;">
		                                       <li datesign="1" value="0">周日</li>
		                                       <li datesign="1" value="1">周一</li>
		                                       <li datesign="1" value="2">周二</li>
		                                       <li datesign="1" value="3">周三</li>
		                                       <li datesign="1" value="4">周四</li>
		                                       <li datesign="1" value="5">周五</li>
		                                       <li datesign="1" value="6">周六</li>
		                                       <li style="border:0px;"><p style="float:left;line-height: 33px;">
		                                       <input id="choice_all" class="input_box2" name="choice_all" type="checkbox" /><label for="choice_all" style="float:left;">全选</label>
		                                       </p>
		                                       </li>
		                                   </ul>
		                               </div>
		                               <p class="icon"><a>确定</a><a>取消</a></p>
		                          </div>
		                    </span>
		                    <span class="icons1 dstj" <#if vo.sale?? && vo.sale=="1">style="display:none"</#if> >定时推荐
		                          <div id="recommand_form" class="icons_box" style="display: none;">
		                               <p class="list_title">定时推荐</p>
		                               <p class="list">
		                               		<i>推荐开始：</i>
		                               		<input id="begindate2" class="input_box" type="text" readonly="readonly" onfocus="WdatePicker({minDate:'%y-%M-%d',dateFmt:'yyyy-MM-dd'})"/>
		                               		<i>推荐结束：</i>
		                               		<input id="todate2" class="input_box" type="text" readonly="readonly" onclick="dateStart()"/>
		                               	</p>
		                               <p class="list">
		                               		<i>时间点：</i>
		                               		<input id="oper_time2" class="input_box" type="text" readonly="readonly" onclick="WdatePicker({onpicking:validate,time:'%H-%m-%s',dateFmt:'HH:mm:ss',alwaysUseStartDate:true})">
		                               	</p>
		                               <div class="list">
		                                   <i>定时方式：</i>
		                                   <ul style="float:left; width: 360px;">
		                                       <li datesign="1" value="0">周日</li>
		                                       <li datesign="1" value="1">周一</li>
		                                       <li datesign="1" value="2">周二</li>
		                                       <li datesign="1" value="3">周三</li>
		                                       <li datesign="1" value="4">周四</li>
		                                       <li datesign="1" value="5">周五</li>
		                                       <li datesign="1" value="6">周六</li>
		                                       <li style="border:0px;"><p style="float:left;line-height: 33px;">
		                                       	<input id="choice_all2" class="input_box2" type="checkbox" /><label for="choice_all2" style="float:left;">全选</label>
		                                       </p>
		                                       </li>
		                                   </ul>
		                               </div>

		                               <div class="list"><i>推荐到：</i><em class="icon4">华夏站点</em></div>
		                               <div class="SRegioncon" style="display: none;">
												<#if stationsList?exists>
														<#list stationsList as stations>
															<dl class="RegionList" <#if stations_index==0> style="display:none"</#if>>
																<#if stations?exists>
																	<#list stations as station>
																		<#if station_index==0>
																			<#if station.id!=1>
																				<dt>${station.firstWord?if_exists}</dt>
																			</#if>
																			<dd>
																		</#if>
																		<#if station.id!=1>
																			<span>
																				<input name="stationIds" type="checkbox" <#if station.id==1>checked disabled</#if> class="CheckB" value="${station.id?if_exists}" id="${station.id?if_exists}" /><label for="${station.id?if_exists}">${station.name?if_exists}</label>
																			</span>
																		</#if>
																		<#if station.id==1>
																			<div style="display:none">
																				<span>
																				<input name="stationIds" style="display:none" type="checkbox" <#if station.id==1>checked disabled</#if> class="CheckB" value="${station.id?if_exists}" id="${station.id?if_exists}" /><label style="display:none" for="${station.id?if_exists}">${station.name?if_exists}</label>
																				</span><br/>
																			</div>
																		</#if>
																	</#list>
																</#if>
																	</dd>
															</dl>
														</#list>
												</#if>
								       </div>
		                               <p class="icon"><a>确定</a><a>取消</a></p>
		                          </div>
		                    </span>
		               </div>
		               <div class="icons_line">|</div>-->
		               <div class="icons">
		                	<#--推荐宝
		                    <span class="icons1 tjb" <#if vo.sale?? && vo.sale=="1">style="display:none"</#if> >推荐包
		                         <div id="recommand_pack" class="tjbag" style="display:none;">
		                         	<a lang="1">2天推荐2次</a>
		                         	<a lang="2">2天推荐4次</a>
		                         	<a lang="3">2天推荐6次</a>
		                         	<a lang="4">3天推荐3次</a>
		                         	<a lang="5">3天推荐6次</a>
		                         	<a lang="6">3天推荐9次</a>
		                         </div>
		                    </span>-->
		                    <span class="icons1 yjcz" <#if vo.sale?? && vo.sale=="1">style="display:none"</#if> >一键操作
		                          <div id="onekey" class="yj" style="display:none;">
		                               <div class="yj_box">
		                                    <p><i>操作类型:</i><em class="on">推荐</em><em>更新</em></p>
		                                    <p><i>操作信息:</i><s>最近</s><input type="text" onkeyup="value=this.value.replace(/\D+/g,'')"><s>天以内的</s><input type="text" onkeyup="value=this.value.replace(/\D+/g,'')"><s>条信息</s></p>
		                                    <p class="icon"><a>确定</a><a>取消</a></p>
		                               </div>
		                               <div class="yj_box" style="display:none;">
		                               		<p>本次推荐4辆车，每10分钟操作10辆，实际执行后消耗40华币</p>
		                               		<p class="icon"><a>确定</a><a>取消</a></p>
		                               	</div>
		                          </div>
		                    </span>
		               </div>

                     <div class="icons" >
						   <span class="icons1 auto">自动更新</span>
						   <div id="autoPanel" class="yj" style="display:none;">
							   <div class="yj_box">
								   <p><strong>功能介绍:</strong></p>
								   <div>1、每天自动更新4个月内在售车辆；</div>
								   <p>2、每台车消耗2华币。</p>
								   <p><i>当前状态:</i><em class="on" data-val="1">已开启</em><em data-val="2">已关闭</em></p>
								   <p class="icon"><a>确定</a><a>取消</a></p>
							   </div>
						   </div>
                     </div>
		   			 </#if>
		             <div class="icons"><span class="icons1 del">批量删除</span></div>
		             <div class="icons"><span class="icons1 removes">批量下架</span></div>

          </div>
          <div class="page">
          		<@page_macro.showVipOnsellPage page/>
          </div>
     </div>
 <#--车辆导航条-->
     <div id="listtitle" class="cars_onsell_title2">
          <ul>
               <li class="all"><input id="all_check" type="checkbox" title="全选"><label for="all_check">全选</label></li>
               <li class="Bar_car">车源信息</li>
               <li class="Bar_price" id="money_a" onclick="order('money',4,0)" style="cursor:pointer;">价格<i class="down"></i></li>
               <!--<li class="Bar_function" >功能服务</li>-->
               <li class="Bar_click" id="clickCount_a" onclick="order('clickCount',2,0)" style="cursor:pointer;">点击量<i class="down"></i></li>
               <li class="Bar_update" id="modifiedTime_a" onclick="order('modifiedTime',3,0)" style="cursor:pointer;">更新时间<i class="down"></i></li>
               <li class="Bar_state">状态</li>
               <li class="Bar_operation">操作</li>
            <#if  user.flag==1 || vipdata.verifyState==1>
               <li class="Bar_operation">推广</li>
               </#if>
          </ul>
     </div>

     <#if carList?exists>
	 <#list carList as map>
     <div class="cars_list" id=${map.id?if_exists}>
          <div class="all"><input type="checkbox" name="delCheck" value="${map.id?if_exists}" /></div>
          <div class="Bar_car">
               <div class="pic">
               		<a href="${contextPath}${(webutil.detailsPath(map.id))!''}" target="_blank">
               			<img src="${(common_func.getCarPic(map.getListSmallPic("150_100")))!''}" />
               		</a>
               	</div>
               <div class="car_detail">
                    <div class="title">
                           <h4><a href="${contextPath}${(webutil.detailsPath(map.id))!''}" target="_blank">${(map.title)!''}</a></h4>
                           <p class="carslistmodel">${(map.usedate)!''}/${(map.carKindName)!''}</p>
                           <p  class="carslistmodel">发布时间:<span class="uptime"
                           	 data-val="${(map.createTime)?string("yyyy-MM-dd HH:mm:ss")}">${(map.createTime)?string("yyyy-MM-dd")}</span></p>

                    </div>
                    <div class="bototm">
                    	 <a href="${contextPath}/vip/getcompanylist.htm?carID=${(map.id)!''}&nationwide=1" target="_self">
                         	<div class="icon icon-padding icon-shop">出价最高的商家</div>
                         </a>
                         <#if map.modifiedTime?string("yyyyMMdd HH:mm:ss")?date("yyyyMMdd HH:mm:ss") gt '20131011 00:00:00'?date("yyyyMMdd HH:mm:ss")>
                         	<div class="print" title="打印" lang = "${map.id!''}">打印</div>
                         </#if>
                          <div class="Bar_function">
          	<#--4s提交成功还是失败或者没有点击-->
				<#if map.fourstyle==1>
					<a class="icon" lang="${(map.id)!''}">4S查询成功</a>
				<#elseif map.fourstyle==0>
					<a class="icon">4S查询中...</a>
				<#elseif map.fourstyle==-1>
					<a class="icon" href="${contextPath}/vip/hbrecharge.htm?carId=${map.id!''}" target="_blank">4S等待付款</a>
				<#elseif map.fourstyle==2>
					<a class="icon" title="驳回原因：1、可能是车辆名牌 / VIN码有误2、该车不存在" target="_blank" href="${contextPath}/fours/index.htm?carId=${map.id!''}">4S查询驳回</a>
				<#elseif map.fourstyle==4>
					<a class="icon">查询无记录</a>
				<#elseif map.fourstyle==3>
					<a class="icon">4s查询失败</a>
			   <#else>
			        <a class="icon" lang="${(map.id)!''}" brandStr="${(map.title)!''}" carSerial="${map.carSerial?if_exists}">4S记录查询</a>
			   </#if>

				<#--4s结束-->
				<#--
				<#if credit?? && credit gt 35 >
					<a class="icon" onclick="display_inquiry(${map.id?if_exists})">短信推广</a>
				</#if>
				-->
          </div>
             <#if  user.flag==1 || vipdata.verifyState==1>
                         <div class=" icon-padding icon-dat rank"  carid="${map.id!''}">查看排名</div>
			</#if>
                    </div>
               </div>
          </div>
          <div class="Bar_price" style="padding-top:15px;">
          	<p class="price"><#if map.money != "0"><em>￥</em></#if>${(common_func.formatPrice(map.money))!''}
          		<!--<em class="bt_bj" carid="${map.id!''}"></em></p>-->
          	<#if map.tradePrice?? && map.tradePrice !="未知" && map.tradePrice !="0">
          	<p class="pfprice">批发价：￥
          		<a href="${contextPath}/tradedetails/${(map.id)!''}" target="_blank">
          			${map.tradePrice}万
          		</a>
          	</p>
          	<#elseif getstar gt 0>
          		<p class="pfprice">批发价：未设置</p>
          	</#if>
          </div>

          <div class="Bar_click">
          		<p title="点击量逢十更新">${map.clickCount?if_exists + 10}次</p>
          </div>
          <div class="Bar_update" style="margin-top:22px;line-height:22px;">
	          	<p class="updateTime">${map.modifiedTime?string("yyyy-MM-dd HH:mm:ss")}</p>
	          	<!--<p>离下架还有${map.xjTime!''}天</p>-->
	          	<#assign day_num=webutil.getdatediff(map.createTime)>
	          	<#if map.orderedr ?? && map.orderedr==0><p style="color:#f60">已库存：${(day_num)!'0'}天</p></#if>
          </div>
          <div class="Bar_state">
             <#if  user.flag==1 || vipdata.verifyState==1>
				<#if map.recommend?? && map.recommend!="" >
					<#if map.recommend=="0" || webutil.getdatediff(map.modifiedTime) gt 0>
						<p id="recommend_${map.id?if_exists}">未推荐</p>
					<#else>
						<p class id="recommend_${map.id?if_exists}">已推荐</p>
					</#if>
				<#else>
					<p id="recommend_${map.id?if_exists}">未推荐</p>
				</#if>
				<#list onSellCarState as li>
					<#if map.id == li.id>
						<#if li.updateState ==0>
				<p id="deal_${map.id?if_exists}" >未更新</p>
				<#else>
				<p id="deal_${map.id?if_exists}" >已更新</p>
						</#if>
					</#if>
				</#list>
            <#else>
               <p >未审核</p>
          </#if>
          </div>

            <#if  user.flag==1 || vipdata.verifyState==1>
               <div class="Bar_operation">
		          	<a class="icon change_cost" lang="${map.id?if_exists}" carid="${map.id!''}">调整价格</a>
		          	<a class="icon" href="${contextPath}/vip/editcar.htm?id=${map.id?if_exists}" target="_blank">修改车源</a>
		          	<a class="icon remove_car" lang="${map.id?if_exists}" carid="${map.id!''}" >设为下架</a>
		          	<a class="icon bargain" lang="${map.id?if_exists}" >设置成交</a>

               </div>
               <div class="Bar_generalize">
		          	<a class="icon recommend" lang="${map.id?if_exists}" >推荐车辆</a>
		          	<a class="icon update_btn"  lang="${map.id?if_exists}" style="cursor:pointer">更新车辆</a>
		          	<a class="icon generalize" lang="${map.id?if_exists}" >车源推广</a>
		          	<div class="share" lang="${map.id?if_exists}">
                         	  <a >分享车源</a>
                              <div class="sharebox bdsharebuttonbox" style="display:none;">
                                   <div class="shareboxR">
                                        <a class="Weixin bds_twx" data-cmd="twx" carid="${map.id!''}">微信好友</a>
                                        <a class="Sina bds_tsina" data-cmd="tsina">新浪微博</a>
                                        <a class="QQ bds_tqq" data-cmd="sqq">QQ好友</a>
                                        <a class="Qzone bds_qzone" data-cmd="qzone">QQ空间</a>
                                   </div>
                              </div>
                         </div>
               </div>
	        <#else>
	           <div class="Bar_close">
		            <a href="${contextPath}/vip/verifybegin.htm" target="_blank">提交审核</a>
		            <a href="${contextPath}/vip/editcar.htm?id=${map.id?if_exists}" target="_blank">修改车源</a>
	            </div>
	        </#if>
     </div>
     </#list>
     </#if>
<#--4s-->
	     <div class="query_4S" style="display:none;">
	          <div class="box_4S_close1">╳</div>
	          <div class="box_4S_tj">
	                <em>选择查询的品牌：</em>
	                <p  id="relevant"> </p>
	          </div>
			  <div class="box_4S_title" style="display:none;">
				    <div class="brand" id="brand">
	                     <span style="float:left;">品牌</span>
	                     <div class="brand_box" ></div>
	                 </div>
				     <div class="VIN"><span style="float:left;">VIN码</span><input placeholder="请输入车辆识别码(VIN码)" maxlength="17" value=""></div>
				     <div class="icon">查 询</div>
			  </div>
			 <#--发动机号-->
             <div class="box_4S2" style="display:none;">
			     <div class="brand">
                     <span>选择品牌</span>
                     <div class="brand_box"></div>
                  </div>
			      <div class="VIN"><span>VIN码</span><input type="text" placeholder="请输入车辆识别码(VIN码)" maxlength="17" value=""></div>
                  <div class="Enum"><span>发动机号</span><input type="text" placeholder="请输入发动机号码" maxlength="10" value=""></div>
			      <div class="icon"><input type="test" id="query"/>查 询</div>
			 </div>
	     <#--<div class="box_4S_cont" style="display:none;">
				    <p>请输入VIN码 或 上传行驶证/车辆铭牌[单选]<span class="icon"><a>选择<input class="fileImg" id="file" name="file" title="仅支持jpg,png,gif" type="file" onchange="uploadPhoto('file');"></a></span><span class="choose" id="uploaded" style="display: none;">已上传</span></p>
	                <p class="xsz"><img src="${staticServer}/web/user/images/xsz.jpg"></p>
			  </div>-->
		 </div>
	     <div id="4s_query_success" class="box_4S" style="display:none;">
	          <div class="set">
	               <p class="set_cx">查询设置<span class="set_close">×</span></p>
	               <div class="set_title">
	                    <span class="bt"></span><span class="record">查看详细记录&gt;&gt;</span>
	               </div>
	               <div class="set_ts">
	               		<em>是否在车辆详情页显示？</em>
	               		<span><input id="4s_show" name="xs" type="radio" value="0" checked="checked"><label for="4s_show">显示</label></span>
	               		<span><input id="4s_noshow" name="xs" type="radio" value="1"><label for="4s_noshow">不显示</label></span>
	               	</div>
	               <div class="set_icon"><p>确 定</p></div>
	          </div>
	     </div>
	     <div class="reminder_box" style="display:none;">
	           <div class="reminder_title">您可能想要选择的品牌<span class="reminder_closed">×</span></div>
	           <div class="reminder">
	                <span class="reminder_icon"><img src="${staticServer}/web/user/images/tishi.png" /></span>
	                <div class="reminder_cont">抱歉！无法关联到您当前的车辆，<br>请到<a href="${contextPath}/fours/index.htm">4S记录查询首页</a>查询</div>
	           </div>
	     </div>
	     <div class="scan" style="display:none;">
	          <span class="scan_closed" onclick="scanClose();">×</span>
	          <p class="scan_tishi1" id="chjMessage"></p>
	          <p><img id="scanPic"></p>
	          <p class="scan_tishi1">恭喜您获得抽奖机会</p>
	          <p class="scan_tishi2">扫描二维码，发给到朋友圈,让他帮你抽大奖</p>
	     </div>
	     <#--成交的弹框-->
		 <div class="deal" style="display:none;">
		     <p class="deal_title"><span>成交</span><a>╳</a></p>
		     <div class="deal_cont">
		          <p class="list"><i>请输入成交价格：</i><input class="input_box" type="text">万元</p>
		          <p class="icon"><a>确定</a><a>取消</a></p>
		     </div>
		 </div>
		 <div id="modify_price" class="deal" style="display:none;">
			<input id="carId" type="hidden" />
	    	<p class="deal_title"><span>快速修改价格</span><a>╳</a></p>
	    	<div class="deal_cont">
            <p class="list"><i>请输入修改价格：</i><input class="input_box" type="text">万元</p>
            <p class="icon"><a>确定</a><a>取消</a></p>
	     </div>
     </div>
     <!--微信分享-->
     <div class="wxmodel hide">
     	<div class="wxback">
     	</div>
     	<div class="wx-main">
     		<div class="close-wx">

     		</div>
     		<div class="wx-box">
     		<div class="wx-icon">
     		</div>
     		<img src="" id="wxcode"/>
     		<p>扫描分享到微信好友<br />或微信朋友圈</p>
     		</div>

     	</div>
     </div>
    <input type="hidden" name="upde_code" id="upde_code" value="" />
    <!--更新推荐钱不够-->
    <div class="update_model hide">
	<h4><span class="var_update">更新</span>车辆</h4>
	<div class="main_auto">
		<p>您<span class="var_update">更新</span>车辆将消耗<span class="red xhnum">6</span>个华币，华币不足，需充值<span class="red quenum">6</span>华币</p>
		<p><span class="state_left">支付金额：</span><span class="red quenum">6 </span>元</p>
		<div class="pay-state-update">

			<span class="state_left">支付方式：</span>
					<div class="mright ">
					<div class="icon-pay wechat select">
						<i></i>
					</div>
					<div class="icon-pay ali">
						<i></i>
					</div>
				</div></div>
				<div class="clear">

				</div>
				<div class="btn_box_1">
					<input type="hidden" name="data-recordId" id="data-recordId" value="" />
					<div class="btn_update" id="updates_sub">
						确定
					</div>
					<div class="btn_update close_update1">
						取消
					</div>
				</div>
     	</div>
     </div>
     <!--自动更新-->
     <div class="page" style="margin:15px auto 25px auto; text-align: center;float: none;">
               <@page_macro.showVipOnsellPage page/>
     </div>
    </div>
  </div>
</div>
</div>
<@index_macro.showVipIndexFooter />
<script type="text/javascript">
$(function(){
   $(".centerLeft .clnList").find("a").each(function(){
      if($(this).html()=="车源管理"){
        $(this).addClass("leftNavon");
      }
   })
});
	var str = $('#orderCol').val();
	/**
	 *升序降序的图标显示图标的控制
	 */
	if ($('#order').val()==1){
			$('#'+str+'_a i').attr('class','up');
		}else{
			$('#'+str+'_a i').attr('class','down');
		}
	//批量更新的弹框
	function block(vv){
	  	$.blockUI({
						message: '<img src="${staticServer}/web/common/images/loading.gif" alt="" style="width: 32px;height:32px "> '+vv+'.....</img>',
						css: {
							width: "208px",   // 宽度小一点
							top: "50%",
							left: "50%"
						}
					});
	  }

	function unblock(){
	  	$.unblockUI();
	  }
</script>
</body>
</html>
