<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>${(titleall)!}</title>
	<meta http-equiv="X-UA-Compatible" content="IE=100,chrome=1">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<META name="description" content="${(descriptionall)!}">
	<META name="keywords" content="${(keywordall)!}">
    <link href="${staticServer}/web/gbpage/css/common/common.css?t=20170607" rel="stylesheet" type="text/css" />
    <link href="${staticServer}/web/gbpage/css/common/head.css?t=20170607" rel="stylesheet" type="text/css"/>
    <link href="${staticServer}/web/gbpage/css/carlist/cars.css?t=20170607" rel="stylesheet" type="text/css" />
	<link href="${staticServer}/web/gbpage/css/common/rightNav.css" rel="stylesheet" type="text/css" /> 
    <script type="text/javascript" src="${staticServer}/web/gbpage/js/common/jquery.min.js"></script>
	<script type="text/javascript" src="${staticServer}/web/gbpage/js/common/jquery.cookie.js" ></script>
	<script type="text/javascript" src="${staticServer}/web/gbpage/js/common/hx2carPages.js"></script>
	<script type="text/javascript" src="${staticServer}/web/gbpage/js/common/areacode.js"></script>
	<script type="text/javascript" src="${staticServer}/web/gbpage/js/common/LoginAndVerify.js"></script>
    <script type="text/javascript" src="${staticServer}/web/pc/common/pcPlug.js"></script>
    <script type="text/javascript" src="${staticServer}/web/gbpage/js/carlist/hxListCars.js?t=20170710"></script>
    <script type="text/javascript" src="${staticServer}/web/gbpage/js/carlist/hxList070612.js?t=20170710"></script>
    <script type="text/javascript" src="${staticServer}/web/gbpage/js/common/LoginAndVerify.min.js?t=20170710"></script>
    <script type="text/javascript" src="${staticServer}/web/advert/js/CarAll.js"></script>
  <#if searchVo.stationId??&&searchVo.stationId==4>
     <script type="text/javascript" src="http://www.hx2car.com/upload/ads/js/CarAll/4/${webutil.getNowYear()}/${webutil.getMonthDay()}.js"> </script>
    <#else>
    <script type="text/javascript" src="http://www.hx2car.com/upload/ads/js/CarAll/${webutil.getStatiionSer()}/${webutil.getNowYear()}/${webutil.getMonthDay()}.js"> </script>
    </#if>
    <script type="text/javascript" src="${staticServer}/web/gbpage/js/common/md5.js"></script>
    <script type="text/javascript">
	var STATICSERVER="${staticServer}";
	var CONTEXTPATH="${contextPath}";
	var CODE="${userareacode}";
	var cookieDomain="${cookieDomain}";
	var purl ="<#if  d_cars?? && (d_cars?size>1)><#if pinp??><#list pinp?keys as kind>${kind}</#list></#if><#else>t${(searchVo.brand)!''}</#if>d${(searchVo.door)!''}z${(searchVo.carProperty)!''}s${(searchVo.color)!''}e${(searchVo.standard)!''}j${(searchVo.priceInterval)!''}y${(searchVo.year)!''}c${(searchVo.country)!''}<#if chex??><#list chex?keys as kind>${kind}</#list><#else>k${(searchVo.carKind)!''}b${(searchVo.bigTypemore)!''}</#if>m${(searchVo.mileage)!''}g${(searchVo.gear)!''}";
	//侧边栏所需参数
    var state = <#if webutil.getUserLoginStatus() == 1>false<#else>true</#if>;
	</script>
</head>

<body class="">
<#import "/common/commonFunc.ftl" as common_func>
<#import "/common/indexMacro.ftl" as index_macro>
<#import "/common/pageMacro.ftl" as page_macro>
<#import "/common/searchMacro.ftl" as search_macro>
<#import "/common/carMacro.ftl" as car_macro>
<@index_macro.newIndexTop20170627 label="二手车信息"/>
<#assign addr = common_func.getCondition('/',searchVo.station!'quanguo')>
<#assign firstBrand = common_func.getCondition('/',searchVo.serfri!'')>
<#assign secondBrand = common_func.getCondition('/',searchVo.sersed!'')>
<#assign aSel = common_func.getCondition('a',searchVo.biaoqian!'')>
<#assign dSel = common_func.getCondition('d',searchVo.door!'')>
<#assign zSel = common_func.getCondition('z',searchVo.carProperty!'')>
<#assign sSel = common_func.getCondition('s',searchVo.color!'')>
<#assign eSel = common_func.getCondition('e',searchVo.standard!'')>
<#assign cSel = common_func.getCondition('c',searchVo.country!'')>
<#assign mSel = common_func.getCondition('m',searchVo.mileage!'')>
<#assign gSel = common_func.getCondition('g',searchVo.gear!'')>
<#assign jSel = common_func.getCondition('j',searchVo.priceInterval!'')>
<#assign ySel = common_func.getCondition('y',searchVo.year!'')>
<#assign aSel = common_func.getCondition('a',searchVo.biaoqian!'')>
<#assign tSel = ''>
<#if d_cars?? && (d_cars?size gt 1)>
    <#if pinp??>
        <#list pinp?keys as kind>
            <#assign tSel = tSel + kind>
        </#list>
    </#if>
<#else>
    <#assign tSel = common_func.getCondition('t',searchVo.brand!'')>
</#if>
<#if shengs?? && shengs?size gt 1>
    <#list shengs?keys as kind>
        <#assign lSel = lSel + kind>
    </#list>
</#if>
<#assign kbSel = ''>
<#if chex??>
    <#list chex?keys as kind>
        <#assign kbSel = kbSel + kind>
    </#list>
<#else>
    <#assign kSel = common_func.getCondition('k',searchVo.carKind!'')>
    <#assign kSel = common_func.getCondition('b',searchVo.bigTypemore!'')>
    <#assign kbSel = kSel + bSel>
</#if>
<script type="text/javascript">
	//F为js中用到的freemaker变量
	var F = {
		addr:"${addr!''}",
		firstBrand:"${firstBrand!''}",
		keyword:"${keyword!''}",
		yearsel:"${yearsel!''}",
		pricesel:"${pricesel!''}",
		firstbrand : [<#list firstpinp as bbd>'${bbd}'<#if bbd_has_next>,</#if></#list>],
		carkind:[<#if chex??><#list chex?keys as kind>'${kind}'<#if kind_has_next>,</#if></#list></#if>],
		secondBrand : [<#if pinp??><#list pinp?keys as key>'${key}'<#if key_has_next>,</#if></#list></#if>],
		brandSerial : '<#list strSerial as bbd>${bbd},</#list>'.slice(0,-1).split(','),
		biarr : '<#list d_cars as bbd>#{bbd.id},</#list>'.slice(0,-1).split(','),
		ardds:[<#list areacodes as adsl>'${adsl!''}'<#if adsl_has_next>,</#if></#list>],
		begincondition:{<#list maps?keys as conkey>'${conkey!""}':'${maps[conkey]}'<#if conkey_has_next>,</#if></#list>},
		carAfter:'<#if appstoread??><div class="carsL_list">'+
            '<div class="pic">'+
                '<a target="_blank" nid="${(appstoread.id)!''}" href="http://${(appstoread.url)!}">'+
                  '<img class="lazy tgStoreImg" data-original="${common_func.getCarPic("${(appstoread.photo)!}")}" src="${staticServer}/web/common/images/more_load.gif" width="228" height="171" style="display: inline;" alt="${(appstoread.company+"图片")}">'+
                '</a>'+
           '</div>'+
           '<div class="carsL_list_L">'+
                '<div class="carsL_list_L_title">'+
                    '<a class="company_title" target="_blank" href="http://${(appstoread.url)!}" title="${(appstoread.company)}">${(appstoread.company)}</a>'+
                    '<p class="icons"><span class="icons_tgShop" title="推广商家"></span></p>'+
                '</div>'+
                '<p class="company_introduce">${appstoread.content}</p>'+
           '</div>'+
         '</div></#if>',
         datuCar:'<#if appstoread??><div class="Datu_car">'+
              '<div class="pic">'+
                  '<a target="_blank" nid="${(appstoread.id)!''}" href="http://${(appstoread.url)!}" title="${(appstoread.company)}">'+
                    '<img class="lazy tgStoreImg" data-original="${common_func.getCarPic("${(appstoread.photo)!}")}" src="${staticServer}/web/common/images/more_load.gif" alt="${(appstoread.company+"图片")}">'+
                  '</a>'+
             '</div>'+
             '<div class="car_border">'+
                  '<div class="shopTitle"><a target="_blank" href="http://${(appstoread.url)!}" title="${(appstoread.company)}">${(appstoread.company)}</a>'+
                  '</div>'+
                  '<div class="company_content">'+
                      '<div>${appstoread.content}</div>'+
                  '</div>'+
                  '<div class="enterShop"><a target="_blank" href="http://${(appstoread.url)!}" title="${(appstoread.company)}">访问店铺</a></div>'+
                  '<p class="icons"><span class="icons_tgShop" title="推广商家"></span></p>'+
             '</div>'+
          '</div></#if>'
	};
</script>
    <div class="cars">
        <div class="carsL" id="ListCar">
            <div class="carsL_search_float" id="CarsLSearchFloat" style="display:none;">
                <div class="cont_title">
                    <div class="cont">
                    <#--滑动上去的选择条件-->
                        <div class="L">已选条件：</div>
                        <div class="condition" id="FloatCon">
                           <#--品牌车系-->
                        <#if  d_cars?? && (d_cars?size>0)>
	                           <div class="Middle_list" id="pinp" style="z-index:30;">
					                    <p><#list d_cars as d_car> ${(d_car.title)!''}</#list></p>
                         				<a data-cl="${d_cars?size}"></a>
			                    		<div class="onbox" id="hx_pinpShow">
			                            	<p>已选品牌车系：</p>
			                            <#list d_cars as d_car>
			 								<span><a class="del" data-cl="${d_car_index}"></a><em> ${(d_car.title)!''}</em></span>
			                            </#list>
			                    		</div>
					            </div>
					    </#if>
                        	<#if searchVo.year != null && searchVo.year !="">
                            <span class="select" id="select_cl" style="z-index:28;">
                            	<a href="${contextPath}${(webutil.getSearchMulu(mulu,'y',''))}">${(searchVo.year)!''}年<i></i></a>
                            <#else>
                            <span style="z-index:28;">
                            	<em>车龄</em><i style="display:none;"></i>
                            </#if>
                              <div class="onbox">
		                         <a data-y='0-1' href="${contextPath}${(webutil.getSearchMulu(mulu,'y','0-1'))}">1年以内</a>
		                         <a data-y='0-2' href="${contextPath}${(webutil.getSearchMulu(mulu,'y','0-2'))}">2年以内</a>
		                         <a data-y='0-3' href="${contextPath}${(webutil.getSearchMulu(mulu,'y','0-3'))}">3年以内</a>
		                         <a data-y='0-4' href="${contextPath}${(webutil.getSearchMulu(mulu,'y','0-4'))}">4年以内</a>
		                         <a data-y='0-5' href="${contextPath}${(webutil.getSearchMulu(mulu,'y','0-5'))}">5年以内</a>
		                         <a data-y='1-3' href="${contextPath}${(webutil.getSearchMulu(mulu,'y','1-3'))}">1-3年</a>
		                         <a data-y='3-5' href="${contextPath}${(webutil.getSearchMulu(mulu,'y','3-5'))}">3-5年</a>
		                         <a data-y='5-10' href="${contextPath}${(webutil.getSearchMulu(mulu,'y','5-10'))}">5-10年</a>
                               </div>
                               <div class="line"></div>
                             </span>
                            <#if searchVo.country != null && searchVo.country !="">
                            	<span class="select" id="select_gb" style="z-index:26;">
                            	<a href="${contextPath}${(webutil.getSearchMulu(mulu,'c',''))}">${(webutil.getCountry(searchVo.country))!''}<i></i></a>
                            <#else>
                            	<span style="z-index:26;"><a>国别</a><i style="display:none;"></i>
                            </#if>
                            	<div class="onbox">
					                <a href="${contextPath}${(webutil.getSearchMulu(mulu,'c','348'))}" data-c="348">国产</a>
				                    <a href="${contextPath}${(webutil.getSearchMulu(mulu,'c','349'))}" data-c="349">德国</a>
				                    <a href="${contextPath}${(webutil.getSearchMulu(mulu,'c','350'))}" data-c="350">日本</a>
				                    <a href="${contextPath}${(webutil.getSearchMulu(mulu,'c','352'))}" data-c="352">韩国</a>
				                    <a href="${contextPath}${(webutil.getSearchMulu(mulu,'c','351'))}" data-c="351">美国</a>
				                    <a href="${contextPath}${(webutil.getSearchMulu(mulu,'c','354'))}" data-c="354">英国</a>
				                    <a href="${contextPath}${(webutil.getSearchMulu(mulu,'c','353'))}" data-c="353">法国</a>
				                    <a href="${contextPath}${(webutil.getSearchMulu(mulu,'c','355'))}" data-c="355">意大利</a>
				                    <a href="${contextPath}${(webutil.getSearchMulu(mulu,'c','357'))}" data-c="357">瑞典</a>
                                </div>
                                    <div class="line"></div>
                            	</span>
                            <#if searchVo.priceInterval != null && searchVo.priceInterval !="">
                            	<span class="select" id="select_jg" style="z-index:24;">
                            	<a href="${contextPath}${(webutil.getSearchMulu(mulu,'j',''))}">${(searchVo.priceInterval)!''}万<i></i></a>
                            <#else>
                            	<span style="z-index:24;"><a>价格</a><i style="display:none;"></i>
                            </#if>
                            	<div class="onbox">
									 <a data-j='0-3' href="${contextPath}${(webutil.getSearchMulu(mulu,'j','0-3'))}">3万以下</a>
			                         <a data-j='3-5' href="${contextPath}${(webutil.getSearchMulu(mulu,'j','3-5'))}">3-5万</a>
			                         <a data-j='5-8' href="${contextPath}${(webutil.getSearchMulu(mulu,'j','5-8'))}">5-8万</a>
			                         <a data-j='8-12' href="${contextPath}${(webutil.getSearchMulu(mulu,'j','8-12'))}">8-12万</a>
			                         <a data-j='12-24' href="${contextPath}${(webutil.getSearchMulu(mulu,'j','12-24'))}">12-24万</a>
			                         <a data-j='24-30' href="${contextPath}${(webutil.getSearchMulu(mulu,'j','24-30'))}">24-30万</a>
			                         <a data-j='30-40' href="${contextPath}${(webutil.getSearchMulu(mulu,'j','30-40'))}">30-40万</a>
			                         <a data-j='40-100' href="${contextPath}${(webutil.getSearchMulu(mulu,'j','40-100'))}">40-100万</a>
			                         <a data-j='100-999' href="${contextPath}${(webutil.getSearchMulu(mulu,'j','100-999'))}">100万以上</a>
                                 </div>
                                 <div class="line"></div>
                            </span>
		                            <#if carkind ?? && carkind?size gt 0 >
		                            	<span style="z-index:22;" class="select" id="select_cx"><a href="${contextPath}${(webutil.getSearchMulu(mulu,'b',''))}"><#list carkind as kind>${kind}</#list></a><i></i>
		                            <#else>
		                            	<span style="z-index:22;"><a>车型</a><i style="display:none;"></i>
		                            </#if>
		                                   <div class="onbox">
							                    <a data-b="7" href="${contextPath}${(webutil.getSearchMulu(mulu,'b','7'))}">SUV</a>
							                	<a data-k="365"  href="${contextPath}${(webutil.getSearchMulu(mulu,'k','365'))}">微型</a>
							                	<a data-k="366"  href="${contextPath}${(webutil.getSearchMulu(mulu,'k','366'))}"">小型</a>
							                    <a data-k="367"  href="${contextPath}${(webutil.getSearchMulu(mulu,'k','367'))}">紧凑型</a>
							                    <a data-k="368"  href="${contextPath}${(webutil.getSearchMulu(mulu,'k','368'))}">中型</a>
							                    <a data-k="369"  href="${contextPath}${(webutil.getSearchMulu(mulu,'k','369'))}">中大型</a>
							                    <a data-k="370"  href="${contextPath}${(webutil.getSearchMulu(mulu,'k','370'))}">豪华</a>
							                    <a data-b="1"  href="${contextPath}${(webutil.getSearchMulu(mulu,'b','1'))}">轿车</a>
							                    <a data-b="8"  href="${contextPath}${(webutil.getSearchMulu(mulu,'b','8'))}">跑车</a>
							                    <a data-b="9"  href="${contextPath}${(webutil.getSearchMulu(mulu,'b','9'))}">MPV</a>
							                    <a data-b="2"  href="${contextPath}${(webutil.getSearchMulu(mulu,'b','2'))}">客车</a>
							                    <a data-b="4"  href="${contextPath}${(webutil.getSearchMulu(mulu,'b','4'))}">皮卡</a>
							                    <a data-b="10"  href="${contextPath}${(webutil.getSearchMulu(mulu,'b','10'))}">面包车</a>
							                    <a data-b="3"  href="${contextPath}${(webutil.getSearchMulu(mulu,'b','3'))}">货车</a>
							                    <a data-b="6"  href="${contextPath}${(webutil.getSearchMulu(mulu,'b','6'))}">工程车</a>
		                                    </div>
		                                    <div class="line"></div>
		                            </span>

                            <#if searchVo.standard != null && searchVo.standard !="">
                            	<span class="select" id="select_pf" style="z-index:20;">
                            	<a href="${contextPath}${(webutil.getSearchMulu(mulu,'e',''))}">${searchVo.standardname!''}<i></i></a>
                             <#else>
                            	<span style="z-index:20;"><a>排放</a><i style="display:none;"></i>
                            </#if>
                            	<div class="onbox">
					                <a href="${contextPath}${(webutil.getSearchMulu(mulu,'e','1'))}" data-e="1">国一</a>
				                    <a href="${contextPath}${(webutil.getSearchMulu(mulu,'e','2'))}" data-e="2">国二</a>
				                    <a href="${contextPath}${(webutil.getSearchMulu(mulu,'e','3'))}" data-e="3">国三</a>
				                    <a href="${contextPath}${(webutil.getSearchMulu(mulu,'e','4'))}" data-e="4">国三+OBD</a>
				                    <a href="${contextPath}${(webutil.getSearchMulu(mulu,'e','5'))}" data-e="5">国四</a>
				                    <a href="${contextPath}${(webutil.getSearchMulu(mulu,'e','6'))}" data-e="6">国五</a>
                                </div>
                                <div class="line"></div>
                            </span>

                            <#if searchVo.mileage != null && searchVo.mileage !="">
                            	<span class="select" id="select_lc" style="z-index:18;">
                            	<a href="${contextPath}${(webutil.getSearchMulu(mulu,'m',''))}">${(searchVo.mileage)!''}万公里<i></i></a>
                             <#else>
                            	<span style="z-index:18;"><a>里程</a><i style="display:none;"></i>
                            </#if>
                            	<div class="onbox">
						                <a href="${contextPath}${(webutil.getSearchMulu(mulu,'m','0-1'))}" data-m="0-1">0-1万公里</a>
					                    <a href="${contextPath}${(webutil.getSearchMulu(mulu,'m','1-2'))}" data-m="1-2">1-2万公里</a>
					                    <a href="${contextPath}${(webutil.getSearchMulu(mulu,'m','2-3'))}" data-m="2-3">2-3万公里</a>
					                    <a href="${contextPath}${(webutil.getSearchMulu(mulu,'m','3-5'))}" data-m="3-5">3-5万公里</a>
					                    <a href="${contextPath}${(webutil.getSearchMulu(mulu,'m','5-10'))}" data-m="5-10">5-10万公里</a>
					                    <a href="${contextPath}${(webutil.getSearchMulu(mulu,'m','10-100'))}" data-m="10-100">10万公里以上</a>
             				    </div>
                                    <div class="line"></div>
                            	</span>

                            <#if searchVo.gear != null && searchVo.gear !="">
                            	<span class="select" id="select_dw" style="z-index:16;">
                            	<a href="${contextPath}${(webutil.getSearchMulu(mulu,'g',''))}">${(webutil.getAuto(searchVo.gear))!''}<i></i></a>
                             <#else>
                            	<span style="z-index:16;"><a>档位</a><i style="display:none;"></i>
                            </#if>
                            	<div class="onbox">
				                    <a href="${contextPath}${(webutil.getSearchMulu(mulu,'g','2'))}" data-g="2">手动档</a>
				                    <a href="${contextPath}${(webutil.getSearchMulu(mulu,'g','1'))}" data-g="1">自动档</a>
				                    <a href="${contextPath}${(webutil.getSearchMulu(mulu,'g','3'))}" data-g="3">手自一体</a>
							    </div>
                                    <div class="line"></div>
                            </span>
                            <#--多选省市-->
 							<#if  areacodes?? && (areacodes?size>1)>
					            <div class="Middle_list" id="hx_shengs" style="z-index:14;">
				                   <p><#list areacodes as area>${(common_func.formatLocation(webutil.getAreaName(area)))!''} </#list></p>
				                   <a data-cl="<#list areacodes as area>${('l'+area)!''}</#list>"></a>
				                    <div class="onbox" id="hx_shengShow">
				                         <p>已选省市：</p>
				                          <#list areacodes as area>
				 							<span><a class="del" data-cl="${'l'+area}"></a><em>${(common_func.formatLocation(webutil.getAreaName(area)))!''}</em></span>
				                         </#list>
				                    </div>
				                </div>
						    </#if>

                            <#if searchVo.color != null && searchVo.color !="">
                            	<span class="select" id="select_ys" style="z-index:12;">
                            	<a href="${contextPath}${(webutil.getSearchMulu(mulu,'s',''))}">${searchVo.colorname!''}<i></i></a>
                             <#else>
                            	<span style="z-index:12;"><a>颜色</a><i style="display:none;"></i>
                            </#if>
                            	<div class="onbox">
				                    <a href="${contextPath}${(webutil.getSearchMulu(mulu,'s','1'))}" data-s="1">黑色</a>
				                    <a href="${contextPath}${(webutil.getSearchMulu(mulu,'s','2'))}" data-s="2">红色</a>
				                    <a href="${contextPath}${(webutil.getSearchMulu(mulu,'s','3'))}" data-s="3">蓝色</a>
				                    <a href="${contextPath}${(webutil.getSearchMulu(mulu,'s','4'))}" data-s="4">白色</a>
				                    <a href="${contextPath}${(webutil.getSearchMulu(mulu,'s','5'))}" data-s="5">绿色</a>
				                    <a href="${contextPath}${(webutil.getSearchMulu(mulu,'s','6'))}" data-s="6">黄色</a>
				                    <a href="${contextPath}${(webutil.getSearchMulu(mulu,'s','7'))}" data-s="7">银灰</a>
				                    <a href="${contextPath}${(webutil.getSearchMulu(mulu,'s','8'))}" data-s="8">灰色</a>
				                    <a href="${contextPath}${(webutil.getSearchMulu(mulu,'s','9'))}" data-s="9">橙色</a>
				                    <a href="${contextPath}${(webutil.getSearchMulu(mulu,'s','11'))}" data-s="11">香槟</a>
                                 </div>
                                    <div class="line"></div>
                            </span>
                            <#if more !=null && more!="a1" >
	                        	<em><a href="${contextPath}/quanguo/soa1">清空搜索条件</a></em>
                        	</#if>
                        </div>
                        <div class="sort" id="PSort">排序</div>
                        <div class="sort_box" style="display:none;">
							<a href="${contextPath}${(webutil.getSearchMulu(mulu,'x','1-1'))}">车龄从高到低</a>
             	  			<a href="${contextPath}${(webutil.getSearchMulu(mulu,'x','1-0'))}">车龄从低到高</a>
                  			<a href="${contextPath}${(webutil.getSearchMulu(mulu,'x','2-1'))}">价格从高到低</a>
             	  			<a href="${contextPath}${(webutil.getSearchMulu(mulu,'x','2-0'))}">价格从低到高</a>
                  			<a href="${contextPath}${(webutil.getSearchMulu(mulu,'x','3-1'))}">信誉从高到低</a>
             	  			<a href="${contextPath}${(webutil.getSearchMulu(mulu,'x','3-0'))}">信誉从低到高</a>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
            <div class="carsL_search" id="now_search_result">
                <div class="cont">
                    <div class="cont_title">
                    <#--一进来的已选条件-->
                        <div class="L">已选条件：</div>
                        <div class="condition">
                        <#--多选车系-->
                        <#if  d_cars?? && (d_cars?size>0)>
	                           <div class="Middle_list" id="pinp" style="z-index:30;">
					                    <p><#list d_cars as d_car> ${(d_car.title)!''}</#list></p>
                         				<a data-cl="${d_cars?size}"></a>
			                    		<div class="onbox" id="hx_pinpShow">
			                            	<p>已选品牌车系：</p>
			                            <#list d_cars as d_car>
			 								<span><a class="del" data-cl="${d_car_index}"></a><em> ${(d_car.title)!''}</em></span>
			                            </#list>
			                    		</div>
					            </div>
					    </#if>
                    	<#if searchVo.year != null && searchVo.year !="" >
        					<span style="z-index:28;"><a href="${contextPath}${(webutil.getSearchMulu(mulu,'y',''))}">${(searchVo.year)!''}年<i></i></a></span>
        				</#if>
        				<#if searchVo.country != null && searchVo.country !="" >
        					<span style="z-index:26;"><a href="${contextPath}${(webutil.getSearchMulu(mulu,'c',''))}">${(webutil.getCountry(searchVo.country))!''}<i></i></a></span>
        				</#if>
        				<#if searchVo.priceInterval != null && searchVo.priceInterval !="" >
        					<span style="z-index:24;"><a href="${contextPath}${(webutil.getSearchMulu(mulu,'j',''))}">${(searchVo.priceInterval)!''}万<i></i></a></span>
        				</#if>
        				<#if carkind?? ><#list carkind as kind><span style="z-index:22;"><a href="${contextPath}${(webutil.getSearchMulu(mulu,'k',''))}">${(kind)!''}<i></i></a></span></#list></#if>
        				<#if searchVo.standard != null && searchVo.standard !="" >
        					<span style="z-index:20;"><a href="${contextPath}${(webutil.getSearchMulu(mulu,'e',''))}">${(searchVo.standardname)!''}<i></i></a></span>
        				</#if>
        				<#if searchVo.carProperty != null && searchVo.carProperty !="" >
        					<span style="z-index:18;"><a href="${contextPath}${(webutil.getSearchMulu(mulu,'z',''))}">${searchVo.carPropertyname!''}<i></i></a></span>
        				</#if>
        				<#if searchVo.door != null && searchVo.door !="" >
        					<span style="z-index:16;"><a href="${contextPath}${(webutil.getSearchMulu(mulu,'d',''))}">${searchVo.doorname!''}<i></i></a></span>
        				</#if>

        				<#if searchVo.mileage != null && searchVo.mileage !="" >
        					<span style="z-index:14;"><a href="${contextPath}${(webutil.getSearchMulu(mulu,'m',''))}">${(searchVo.mileage)!''}万公里<i></i></a></span>
        				</#if>
        				<#if searchVo.gear != null && searchVo.gear !="" >
        					<span style="z-index:12;"><a href="${contextPath}${(webutil.getSearchMulu(mulu,'g',''))}">${(webutil.getAuto(searchVo.gear))!''}<i></i></a></span>
        				</#if>
        				<#if searchVo.color != null && searchVo.color !="">
        					<span style="z-index:8;"><a href="${contextPath}${(webutil.getSearchMulu(mulu,'s',''))}">${(searchVo.colorname)!''}<i></i></a></span>
        				</#if>
        				<#if searchVo.keyword != null && searchVo.keyword !="">
        					<span style="z-index:6;"><a href="${contextPath}${(webutil.getSearchMulu(mulu,'t',''))}">${(searchVo.keyword)!''}<i></i></a></span>
        				</#if>
        				<#--多选省市-->
        					
				  		<#if  areacodes?? && (areacodes?size>0)>
				             <div class="Middle_list" id="shengs" style="z-index:10;">
				                   <p ><#list areacodes as area>${(common_func.formatLocation(webutil.getAreaName(area)))!''}  </#list></p>
				                   <a href="${contextPath}${(webutil.getSearchMulu(mulu,'station',''))}"></a>
				                    <div class="onbox" id="shengShow">
				                         <p>已选省市：</p>
				                          <#list areacodes as area>
				 							<span><a class="del" data-cl="${'l'+area}"></a><em> ${(common_func.formatLocation(webutil.getAreaName(area)))!''} </em></span> 
				                         </#list>
				                    </div>
				              </div>
						<#else>
							<span style="z-index:11;width:15px;"><a>全国</a></span>
						</#if>
        				<#if more !=null && more!="a1" >
                        	<em><a href="${contextPath}/quanguo/soa1" style="color:#f60">清空搜索条件</a></em>
                        	<em class="take" id="Condition">条件订阅</em>
                        </#if>
                        </div>
                    </div>
                    <@search_macro.newshowSearchHeader2017/>
                </div>
            </div>
            </div>
            <div class="carsL_cars">
                <div class="carsL_cars_title">
                    <div class="filter">
                        <ul>
            				<li <#if carFlag=="1">class="select"</#if>>
                                <a href="${contextPath}${(webutil.getSearchMulu(mulu,'a','1'))}">全部车辆</a>
                            </li>
        					<#--<#if webutil.getStationId() !=1 >
                            <li <#if carFlag=="2">class="select"</#if>>
                                <a href="${contextPath}${(webutil.getSearchMulu(mulu,'a','2'))}">全部二手车</a>
                            </li>
                        	</#if>-->
            				<li <#if carFlag=="3">class="select"</#if>>
                                <a href="${contextPath}${(webutil.getSearchMulu(mulu,'a','3'))}">精品二手车</a><i class="hot"></i>
                            </li>
            				<li <#if carFlag=="4">class="select"</#if>>
                                <a href="${contextPath}${(webutil.getSearchMulu(mulu,'a','4'))}">个人二手车</a>
                            </li>
                            <li <#if carFlag=='5'>class="select"</#if>>
                                <a href="${contextPath}${(webutil.getSearchMulu(mulu,'a','5'))}">商家二手车</a>
                            </li>
            				<li id="toTradecar">
                                <a href="/trade/tradeallcar.htm">批发二手车</a>
                            </li>
                        </ul>
                        <div class="keyword">
                            <input type="text" id="doSearch" value="" name="doSearch" placeholder="请输入关键字"/>
                            <span class="iconkeyword" onclick="searchAll();"></span>
                        </div>
						<#if web_listOrPic?? && web_listOrPic=="list">
                        	<div class="change_lb" id="" style="display: block"><a href="javascript:void(0)" title="切换到列表模式"></a></div>
            				<div class="change_dt change_dt_g" id="change_bpic" style="display:block"><a href="javascript:void(0)" title="切换到大图模式"></a></div>
            			<#else>
            			    <div class="change_lb change_lb_g" id="change_list" style="display: block"><a href="javascript:void(0)" title="切换到列表模式"></a></div>
            				<div class="change_dt" id="" style="display:block"><a href="javascript:void(0)" title="切换到大图模式"></a></div>
            			</#if>
                    </div>
                </div>
                <div class="carsL_cars_title">
                    <div class="filter2">
                      <div class="W">
          				<label>
                            <input type="checkbox"
                            <#if searchVo.filter3 != null && searchVo.filter3 == 1>
                                checked=true style="opacity: 1;"
                                onclick="location='${contextPath}${(webutil.getSearchMulu(mulu,'f','2-0'))}'"
                            <#else>
                                onclick="location='${contextPath}${(webutil.getSearchMulu(mulu,'f','2-1'))}'"
                            </#if>/>在售
                        </label>
          				<label>
                            <input type="checkbox"
                            <#if searchVo.filter4 != null && searchVo.filter4 == 1>
                                checked=true style="opacity: 1;"
                                onclick="location='${contextPath}${(webutil.getSearchMulu(mulu,'f','3-0'))}'"
                            <#else>
                                onclick="location='${contextPath}${(webutil.getSearchMulu(mulu,'f','3-1'))}'"
                            </#if>/>7天包退&nbsp;15天包换
                        </label>
          				<label>
                            <input type="checkbox"
                            <#if searchVo.filter5 != null && searchVo.filter5 == 1>
                                checked=true style="opacity: 1;"
                                onclick="location='${contextPath}${(webutil.getSearchMulu(mulu,'f','4-0'))}'"
                            <#else>
                                onclick="location='${contextPath}${(webutil.getSearchMulu(mulu,'f','4-1'))}'"
                            </#if>/>一手车
                        </label>
          				<label>
                            <input type="checkbox"
                            <#if searchVo.filter6 != null && searchVo.filter6 == 1>
                                checked=true style="opacity: 1;"
                                onclick="location='${contextPath}${(webutil.getSearchMulu(mulu,'f','5-0'))}'"
                            <#else>
                                onclick="location='${contextPath}${(webutil.getSearchMulu(mulu,'f','5-1'))}'"
                            </#if>/>峰会车辆
                        </label>
                        <label>
                            <input type="checkbox"
                            <#if searchVo.filter8 != null && searchVo.filter8 == 1>
                                checked=true style="opacity: 1;"
                                onclick="location='${contextPath}${(webutil.getSearchMulu(mulu,'f','7-0'))}'"
                            <#else>
                                onclick="location='${contextPath}${(webutil.getSearchMulu(mulu,'f','7-1'))}'"
                            </#if>/>可查询4s保养维修记录
                        </label>
                      </div>
                        <ul>
                            <li><a href="${contextPath}${(webutil.getSearchMulu(mulu,'x',''))}">默认排序</a></li>
                            <li>
                            	<#if searchVo.order=="1-0">
                            		<a href="${contextPath}${(webutil.getSearchMulu(mulu,'x','1-1'))}">车龄<i class="up"></i></a>
                            	<#elseif searchVo.order=="1-1">
                            		<a href="${contextPath}${(webutil.getSearchMulu(mulu,'x','1-0'))}">车龄<i class="down"></i></a>
                            	<#else>
                            		<a href="${contextPath}${(webutil.getSearchMulu(mulu,'x','1-0'))}"><i>车龄</i></a>
                            	</#if>
                            </li>

                            <li>
                            	<#if searchVo.order=="2-0">
                            		<a href="${contextPath}${(webutil.getSearchMulu(mulu,'x','2-1'))}">价格<i class="up"></i></a>
                            	<#elseif searchVo.order=="2-1">
                            		<a href="${contextPath}${(webutil.getSearchMulu(mulu,'x','2-0'))}">价格<i class="down"></i></a>
                            	<#else>
                            		<a href="${contextPath}${(webutil.getSearchMulu(mulu,'x','2-0'))}"><i>价格</i></a>
                            	</#if>
                            </li>

                            <li>
                            	<#if searchVo.order=="3-0">
                            		<a href="${contextPath}${(webutil.getSearchMulu(mulu,'x','3-1'))}">信誉值<i class="up"></i></a>
                            	<#elseif searchVo.order=="3-1">
                            		<a href="${contextPath}${(webutil.getSearchMulu(mulu,'x','3-0'))}">信誉值<i class="down"></i></a>
                            	<#else>
                            		<a href="${contextPath}${(webutil.getSearchMulu(mulu,'x','3-0'))}"><i>信誉值</i></a>
                            	</#if>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <#--切换大图显示-->
            <#if web_listOrPic?? && web_listOrPic=="list">
            <div class="Liebiao_list">
          		<#if carList??>
				<#list carList as car>
				<div class="carsL_list">
				   <#if car.youxiao ?? && car.youxiao==1>
                   	<div class="pic">
                        <a target="_blank" nid="${(car.old_id)!''}" href="${contextPath}${(webutil.detailsPath(car.old_id))}" title="[${(car.location)!''}]${(car.buyDate)!} ${(car.title)!} ${(common_func.formatPrice(car.price))!''}[${(car.company_name)!''}]">
                        <img class="smallpic lazy" data-original="${(car.photoAddress)!''}" src="${staticServer}/web/mobpages/images/mcarlist/imglazyload.gif"  alt="${(car.series)!} ${(car.brand)!}${(car.carStyle)!''}"></a>
                   </div>
                   <#else>
                   <div class="pic">
                        <a target="_blank" nid="${(car.old_id)!''}" href="${contextPath}${(webutil.detailsPath(car.old_id))}" title="[${(car.location)!''}]${(car.buyDate)!} ${(car.title)!} ${(common_func.formatPrice(car.price))!''}[${(car.company_name)!''}]">
                        <img class="smallpic lazy" data-original="${(car.photoAddress)!''}" src="${staticServer}/web/mobpages/images/mcarlist/imglazyload.gif" alt="${(car.series)!} ${(car.brand)!}${(car.carStyle)!''}"></a>
                        <div class="Soldbg">1</div>
                        <div class="Sold">
                            <p>已过期</p>
	                        <p>
	                        <#if car.series ?? && car.series!="" >
	                    		<a class="Sold_icon" href="/${webutil.getPinyin()}/soa1?keyword=${(common_func.encoder(car.series))!'' }+<#if car.brand ?? && car.brand!=''>${(common_func.encoder((car.brand)))!''}<#else>${(common_func.encoder((car.carStyle)))!''}</#if>" target="_blank">找相似</a>
	                    	<#else>
	                     		<a class="Sold_icon" href="/${webutil.getPinyin()}/soa1?keyword=${(common_func.encoder(car.brand))!''}+<#if car.brand ?? && car.brand!=''>${(common_func.encoder((car.brand)))!''}<#else>${(common_func.encoder((car.carStyle)))!''}</#if>" target="_blank">找相似</a>
	                    	</#if>
	                    	     <a class="Sold_icon" href="${contextPath}/car/findcar.htm?brands= ${(common_func.encoder(car.series))!''}<#if (car.factory)!?index_of('进口')gt-1>(进口)</#if><#if car.brand??>,${(common_func.encoder(car.brand))!''}</#if><#if car.carStyle??>,${(common_func.encoder(car.carStyle))}</#if>" target="_blank">帮我找车</a>
	                        </p>
                        </div>
                   </div>
                   </#if>
                   <div class="carsL_list_L">
                        <div class="carsL_list_L_title"><h2><a target="_blank" href="${contextPath}${(webutil.detailsPath(car.old_id))}" title="[${(car.location)!''}]${(car.buyDate)!} ${(car.title)!}  ${(common_func.formatPrice(car.price))!''}[${(car.company_name)!''}]">${(car.buyDate)!} ${(car.title)!} </a></h2>
                        <p>更新日期：${(car.publishDate)!}</p></div>
                        <div class="info">
                             <span>${(car.mileAge)!''}万公里</span>|
                             <span>${(car.standard)!''}</span>
                             <!--|
                             <span>${(car.gearshift)!''}</span>|
                             <span>${(car.changeOwner)!''}</span>-->
                             <p class="icons">
                             <#if car.tuiguang?? && car.tuiguang ==1>
                             <span class="icons_tgCar" title="推广车辆">推广车辆</span>
                             </#if>
                             <#if car.creditNum &gt; 79 && car.from ==2>
                             <span class="icons_jp" title="精品车"></span>
                             </#if>
                             <#if car.isLm ?? && car.isLm == 1>
                             <span class="icons_fh" title="峰会车"></span>
                             </#if>
                             <#if car.isDanbao == 1>
                             <span class="icons_db hide" title="担保车"></span>
                             </#if>
                             <#if car.is4s?? && car.is4s ==1>
                             <span class="icons_4s" title="有4S记录已查"></span>
                             </#if>
                             </p>
                        </div>
                        <p><span class="row1">${(car.carCondition)!'暂无'}</span></p>
                        <p class="price"><i><#if car.price?? && car.price!=0>￥</#if></i><span>${(common_func.newformatPrice(car.price))!''}<#if car.price?? && car.price!=0>万</#if></span></p>
                        <div class="carsL_list_owner">
                        	<#if car.personcar != 1><p><span class="Black"><a href="${contextPath}${(webutil.profilePath(car.user_id))}" target="_blank">${(car.owner)!''}</a></span><span><a target="_blank" href="${contextPath}${(webutil.detailsPath(car.old_id))}" class="name">联系电话</a></span></p></#if>
                            <p><span class="diqu" title="${(car.location)!''}">${(car.location)!''}</span></p>
                            <p><span>信誉值：</span><#if car.creditNum ?? && car.creditNum gt 29><span class="credit"><i>${(car.creditNum)!''}</i></span></#if></p>
                            <#if car.personcar != 1><p><span><#if car.webSite?? && car.webSite?index_of('vip')!=-1><a class="gs" href="${car.webSite}" target="_blank">${(car.company_name)!''}</a></#if></span></p></#if>
                             <a class="near_year" target="_blank" <#if car.level?? && car.level!=""><#if car.brandCode ?? && car.brandCode!=0>href="${contextPath}/trend/${(car.comparequery)!'603,2011'}"<#else>href="${contextPath}/search/compare.htm?keyword=${(common_func.encoder(car.brand))!''}&year=${webutil.getYear(car.buyDate)}"</#if>
              					<#else>href="${contextPath}/search/compare.htm?keyword1=${(start)!''}+<#if car.brand?? && car.brand?length gt 2>${(common_func.encoder((car.brand)?substring(0,2)+' '+(car.brand)?substring(2,(car.brand)?length)))!''}<#else>${(common_func.encoder(car.brand))!''}</#if>&keyword2=${(start1)!''}+<#if car.brand?? && car.brand?length gt 2>${(common_func.encoder((car.brand)?substring(0,2)+' '+(car.brand)?substring(2,(car.brand)?length)))!''}<#else>${(common_func.encoder(car.brand))!''}</#if>&keyword3=${(start2)!''}+<#if car.brand?? && car.brand?length gt 2>${(common_func.encoder((car.brand)?substring(0,2)+' '+(car.brand)?substring(2,(car.brand)?length)))!''}<#else>${(common_func.encoder(car.brand))!''}</#if>&keyword4=${(start3)!''}+<#if car.brand?? && car.brand?length gt 2>${(common_func.encoder((car.brand)?substring(0,2)+' '+(car.brand)?substring(2,(car.brand)?length)))!''}<#else>${(common_func.encoder(car.brand))!''}</#if>"</#if>>近几年同款车比较</a>
                        </div>
                   </div>
              	</div>
				</#list>
				</#if>
				</div>
          <#else>
          	<div class="Datu_list">
              <div class="Datu_cars">
              <#if carList??>
				<#list carList as car>
                   <div class="Datu_car">
                     <#if car.youxiao ?? && car.youxiao==1>
                   	    <div class="pic">
	                        <a target="_blank" nid="${(car.old_id)!''}" href="${contextPath}${(webutil.detailsPath(car.old_id))}" title="[${(car.location)!''}]${(car.buyDate)!} ${(car.series)!} ${(car.brand)!} ${(common_func.formatPrice(car.price))!''}[${(car.company_name)!''}]">
	                        <img  class="lazy" data-original="${(car.photoAddress)!''}" src="${staticServer}/web/mobpages/images/mcarlist/imglazyload.gif" alt="${(car.series+'图片')!} ${(car.brand)!} <#if car.carStyle??>${car.carStyle}</#if>"/>
                            </a>
                       </div>
                     <#else>
                   		<div class="pic">
	                        <a target="_blank" nid="${(car.old_id)!''}" href="${contextPath}${(webutil.detailsPath(car.old_id))}" title="[${(car.location)!''}]${(car.buyDate)!} ${(car.series)!} ${(car.brand)!} ${(common_func.formatPrice(car.price))!''}[${(car.company_name)!''}]">
	                        	<img  class="lazy" data-original="${(car.photoAddress)!''}" src="${staticServer}/web/mobpages/images/mcarlist/imglazyload.gif" alt="${(car.series+'图片')!} ${(car.brand)!} <#if car.carStyle??>${car.carStyle}</#if>"/>
	                        </a>
	                         <div class="Soldbg">2</div>
	                        <div class="Sold">
	                        	<p>已过期</p>
		                        <p>
			                        <#if car.series ?? && car.series!="" >
			                    		<a class="Sold_icon" href="/${webutil.getPinyin()}/soa1?keyword=${(common_func.encoder(car.series))!'' }+<#if car.brand ?? && car.brand!="">${(common_func.encoder((car.brand)))!''}<#else>${(common_func.encoder((car.carStyle)))!''}</#if>" target="_blank">找相似</a>
			                    	<#else>
			                     		<a class="Sold_icon" href="	/${webutil.getPinyin()}/soa1?keyword=${(common_func.encoder(car.brand))!''}+<#if car.brand ?? && car.brand!="">${(common_func.encoder((car.brand)))!''}<#else>${(common_func.encoder((car.carStyle)))!''}</#if>" target="_blank">找相似</a>
			                    	</#if>
			                    		<a class="Sold_icon" href="${contextPath}/car/findcar.htm?brands= ${(common_func.encoder(car.series))!''}<#if (car.factory)!?index_of("进口")&gt;-1>(进口)</#if><#if car.brand??>,${(common_func.encoder(car.brand))!''}</#if><#if car.carStyle??>,${(common_func.encoder(car.carStyle))}</#if>" target="_blank">帮我找车</a>
			                     </p>
	                        </div>
                  	    </div>
                     </#if>
                  	    <div class="car_border">
                  	        <div class="carTitle"><a target="_blank" href="${contextPath}${(webutil.detailsPath(car.old_id))}" title="[${(car.location)!''}]${(car.buyDate)!} ${(car.series)!} ${(car.brand)!} ${(common_func.formatPrice(car.price))!''}[${(car.company_name)!''}]">${(car.buyDate)!} ${(car.series)!} <#if (car.factory)!?index_of("进口")&gt;-1>(进口)</#if>${(car.brand)!} <#if car.carStyle??>${car.carStyle} </#if></a>
                  	        <p class="updateTime"><span class="icons_time">${(car.publishDate)!}</span></p>
                  	        </div>
                  	        <div class="carAddr_mile">
                  	        	<#if car.cityName?? && car.cityName!='' ><p class="carAddress"><span>${(car.cityName)!''}</span><i>|</i></p></#if>
                  	        	
		                        <p class="carMiles"><span>${(car.mileAge)!''}万公里</span><i>|</i></p>
		                        <p class="carNorm"><span>${(car.standard)!''}</span></p>
	                        </div>
	                        <div class="carPrice_user">
		                        <p class="price">
			                       <#if car.price?? && car.price?number!=0> <i>￥ </i><span>${(common_func.newformatPrice(car.price))!''}</span><i><#if car.price?? && car.price!=0> 万</#if><#else><span>面议</span></#if></i>
		                        </p>
		 						
		 						<p class="owner">
		 							<#if car.personcar!=1>
		 							<#if car.userVipTime??>
		 							<span class="vip_year">${car.userVipTime}年</span>
		 							<#else>
		 							<span class="vip_year_no"></span>
		 							</#if>
		 							<#if car.webSite?? && car.webSite!="" && car.company_name??>
		 								<a href="${car.webSite}" target="_blank" class="name">${(car.company_name)!''}</a>
		 							<#else>
		 								<a href="${contextPath}${(webutil.profilePath(car.user_id))}" target="_blank" class="name">${(car.owner)!''}</a>
		 							</#if>
	                        		<#if car.creditNum ?? && car.creditNum gt 29><i class="credit">${(car.creditNum)!''}</i></#if>
		 							</#if>
	                        	</p>
	                        	
		                    </div>
	                         <p class="icons">
	                         <#if car.tuiguang??&& car.tuiguang ==1>
	                   			<span class="icons_tgCar" title="推广车辆">推广车辆</span>
	                  		</#if>
	                        <#if car.isLm ?? && car.isLm == 1>
	                    		<span class="icons_fh" title="峰会车"></span>
	                   		</#if>
	                   		<#if car.isDanbao == 1>
	                   			<span class="icons_db" title="担保车"></span>
	                   		</#if>
	               			<#--<#if car.creditNum &gt; 79 && car.from ==1>
	                  			<span class="icons_yp hide" title="优品车"></span>
	                  		</#if>
	                  		<#if car.creditNum &gt; 79 && car.from ==2>
	                   			<span class="icons_jp hide" title="精品车"></span>
	                  		</#if>-->
	                  		<#if car.is4s??&& car.is4s ==1>
	                   			<span class="icons_4s" title="有4S记录已查"></span>
	                  		</#if>
	                   			<#if car.series ?? && car.series!="" >
		                  			<a href="${contextPath}/quanguo/soa1?keyword=${(common_func.encoder(car.series))!'' }+<#if car.brand ?? && car.brand!="">${(common_func.encoder((car.brand)))!''}<#else>${(common_func.encoder((car.carStyle)))!''}</#if>" target="_blank" class="icons_tk hide">找同款</a>
		                  			<#else>
		                  			<a href="${contextPath}/quanguo/soa1?keyword=${(common_func.encoder(car.brand))!''}+<#if car.brand ?? && car.brand!="">${(common_func.encoder((car.brand)))!''}<#else>${(common_func.encoder((car.carStyle)))!''}</#if>" target="_blank" class="icons_tk hide">找同款</a>
								</#if>
	                  		</p>
	                  	    </div>
                       </div>
                   </#list>
              </#if>
              </div>
          </div>
          <div class="msg_b">
          	亲，您还没找到合适的车源吗？试试   <span id="Conditions">条件订阅</span>   
          </div>
          	</#if>
            <#if carList_size?? && carList_size==0>
            	<#if sheng?? && sheng!="">
            	<div class="no_listcar">
               		<span class="icon"></span>
               		<span>
	               		<p>抱歉，${(webutil.getAreaName(searchVo.areaCode))!''}暂无车辆，请选择
	               		<a href="${contextPath}${addr}${firstBrand}${secondBrand}/so${tSel}${kbSel}${dSel}${zSel}${sSel}${eSel}${jSel}${ySel}${cSel}${mSel}${gSel}l${(sheng.area_code)!''}${(queryText)!''}#now_search_result">${(sheng.area_name)!''}</a>试试或提交
	               		<a <#--id="qiugou"--> href="/car/findcar.htm<#if searchVo.year??>?caryear=<#if searchVo.year=='0-1' || searchVo.year=='0-2' || searchVo.year=='0-3' || searchVo.year=='0-4' || searchVo.year=='0-5'><#if searchVo.year=='0-1'>1<#elseif searchVo.year=='0-2'>2<#elseif searchVo.year=='0-3'>3<#elseif searchVo.year=='0-4'>4<#elseif searchVo.year=='0-5'>5</#if>${(common_func.encoder('年以内'))}<#else>${(searchVo.year)!''}${(common_func.encoder('年'))}</#if></#if>" target="_blank">求购需求</a>
	               		</p>
	               	</span>
          		</div>
          		<#else>
          		<div class="no_listcar">
               		<span class="icon"></span>
               		<span>
               			<p>暂无相关车辆，请更改
               				<a href="#ListCar">筛选条件</a><br>或提交
               				<a <#--id="qiugou"--> href="/car/findcar.htm<#if searchVo.year??>?caryear=<#if searchVo.year=='0-1' || searchVo.year=='0-2' || searchVo.year=='0-3' || searchVo.year=='0-4' || searchVo.year=='0-5'><#if searchVo.year=='0-1'>1<#elseif searchVo.year=='0-2'>2<#elseif searchVo.year=='0-3'>3<#elseif searchVo.year=='0-4'>4<#elseif searchVo.year=='0-5'>5</#if>${(common_func.encoder('年以内'))}<#else>${(searchVo.year)!''}${(common_func.encoder('年'))}</#if></#if>" target="_blank">求购需求</a>
               			</p>
               		</span>
          		</div>
          		</#if>
            </#if>
            <div class="page">
                <@page_macro.newshowParmPage2017 page parmeterUrl />
            </div>
     </div>
     <div class="carsR" id="ad_carlist">
         <div class="ad" id="afterAreaTarget"></div>
         <div class="Business">
             <#list adlist as ad>
                 <#list ad as car >
                     <#if car_index==0>
                         <div class="Business_tj">
                             <div class="Business_tj_title">
                                 <p>
                                     <b class="crown_logo"><img src="${staticServerUpload}${car.url}"></b>
                                     <b class="crown_name"><a href="${car.href}" target="_blank">${car.company_name}</a></b>
                                 </p>
                                 <p>电话：${car.phoneNumber}<a href="${contextPath}/user/showmap/${car.user_id}" target="_blank">[地图]</a></p>
                             </div>
                             <div class="Business_tj_list">
                                 <a href="${contextPath}${(webutil.detailsPath(car.old_id))}" target="_blank">
                                     <img src="${car.photoAddress}"/>
                                     <div class="Business_tj_list_R">
                                         <p class="title">${car.title}</p>
                                         <p class="price">￥${car.price}万</p>
                                     </div>
                                 </a>
                             </div>
                         </div>
                     </#if>
                 </#list>
             </#list>
         </div>
         <#if imgad??>
             <#list imgad as map>
                 <a href="${(map.getHref())!''}" target="_blank">
                     <img style="margin-bottom:10px;" alt="" src="${(map.getUrl())!''}" width="199px">
                 </a>
             </#list>
         </#if>
         <div class="tj_cars">
             <p class="tj_cars_title">推荐车源</p>
             <ul>
                 <#if clickCarListN ??>
                     <#list clickCarListN as car>
                         <li>
                             <a href="${(webutil.detailsPath(car.id))!}" target="_blank">
                                 <img src="${(car.photo)!''}" alt="${(car.title+'图片')!''}">
                             </a>
                             <p class="title">
                                 <a href="${(webutil.detailsPath(car.id))!}" target="_blank"
                                    title="[${(car.areaName)}]${(car.usedate)!''} ${(car.title)!''} ${(common_func.formatPrice(car.money))!}">
                                     ${(car.usedate)!''}${(car.title)!''} &nbsp;${(common_func.formatPrice(car.money))!}
                                 </a>
                             </p>
                             <p class="content">
                                 <span class="diqu">${(car.areaName)!}</span>
                                 <span class="jiage">￥<strong>${(common_func.formatPrice(car.money))?replace('万','')!''}</strong>万</span>
                             </p>
                         </li>
                     </#list>
                 </#if>
             </ul>
         </div>
         <div class="hotBrandBox">
            <div class="hotTitle"><h5>热门车系</h5></div>
             <ul class="hotBarnd">
             	<li class="brand_nav">
	             	<span class="brand_num">排名</span>
	            	<span class="brand_name">品牌</span>
	            	<span class="brand_view">浏览量</span>
             	</li>
                 <#list HOTCARSER?keys as key>
                    <li><div class="num <#if key_index lt 3>numLight</#if>">${key_index+1}</div><a href="${contextPath}/quanguo/${HOTCARSER[key].ppinyin}/${HOTCARSER[key].pinyin}/soa1t${HOTCARSER[key].serid}">${key}</a>
	            	<span class="brand_view">123</span>
                    </li>
                 </#list>
             </ul>
         </div>
     </div>
    <div class="clear"></div>
    
<div id="CmdMaskDiv" style="display: none; background-color: #000; position: fixed; width: 100%; height: 100%; top: 0; left: 0px; opacity: 0.5;-ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=50);filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=50); z-index: 999999999; background-position: initial initial; background-repeat: initial initial;"></div>
<div id="custommcarsend" class=" layer-subscriber width455 myModel" style="display: none; z-index: 999999999999; ">
       <div class="title">
            		<span>条件订阅</span>
            		<i class="close icon16-close"></i>
        </div>
        <div class="layer-content">
            <div class="price-part1 font14">
                <span class="part1-l">已选条件：</span>
                <div id="filtershow_mcarsend" class="part1-r">
                <#if  areacodes?? && (areacodes?size>0)>
					       <#list areacodes as kind>
					       	    <p id="dAreaCode" data-id="${kind}">${(common_func.formatLocation(webutil.getAreaName(kind)))!''}</p>
					       </#list>
	           </#if>
                <#if  d_cars?? && (d_cars?size>0)>
					     <#list d_cars as kind>
					          <p id="dBrand" data-id="t${kind.id}">${kind.title!''}</p>
					      </#list>
                </#if>
                <#if searchVo.year != null && searchVo.year !="" >
                    <p id="dyear" data-id="${searchVo.year}">${(searchVo.year)!''}年</p>
                </#if>
                <#if searchVo.country != null && searchVo.country !="" >
                    <p id="dcountry" data-id="${searchVo.country}">${(webutil.getCountry(searchVo.country))!''}</p>
                </#if>
                <#if searchVo.priceInterval != null && searchVo.priceInterval !="" >
                    <p id="dpriceInterval" data-id="${searchVo.priceInterval}">${(searchVo.priceInterval)!''}万</p>
                </#if>
                <#if searchVo.carKind != null && searchVo.carKind !="" >
                	<p id="dcarKind" data-id="${searchVo.carKind}">${(webutil.getCarKindName(searchVo.carKind))!''}</p>
                </#if>
                <#if searchVo.bigTypemore != null && searchVo.bigTypemore !="" >
                    <p id="dbigTypemore" data-id="${searchVo.bigTypemore}">${(webutil.getBigTypeMore(searchVo.bigTypemore))!''}</p>
                </#if>
                <#if searchVo.standard != null && searchVo.standard !="" >
                    <p id="dstandard" data-id="${searchVo.standard}">${(searchVo.standardname)!''}</p>
                </#if>
                <#if searchVo.carProperty != null && searchVo.carProperty !="" >
                    <p id="dcarProperty" data-id="${searchVo.carProperty}">${searchVo.carPropertyname!''}</p>
                </#if>
                <#if searchVo.door != null && searchVo.door !="" >
                    <p id="ddoor" data-id="${searchVo.door}">${searchVo.doorname!''}</p>
                </#if>
            	<#if searchVo.mileage != null && searchVo.mileage !="" >
                    <p id="dmileage" data-id="${searchVo.mileage}">${(searchVo.mileage)!''}万公里</p>
                </#if>
                <#if searchVo.gear != null && searchVo.gear !="" >
                    <p id="dgear" data-id="${searchVo.gear}">${(webutil.getAuto(searchVo.gear))!''}</p>
                </#if>
                <#if searchVo.color != null && searchVo.color !="">
                    <p id="dcolor" data-id="${searchVo.color}">${(searchVo.colorname)!''}</p>
                </#if>
                <#if tiaojians?? && tiaojians==0>
                    <p id="dAreaCode" data-id="10000">全国</p>
                </#if>
                </div>
            </div>
            <div class="price-part2">
                <ul>
                    <li>
                        <span class="part2-l"><span class="red">*</span>我的手机：</span>
                        <div class="part2-r">
                            <input id="mobile" type="text" class="input-price1 input-price2" maxlength="11">
                            <span id="t_mobile" class="ml10 col99 fn-left">请填您的手机号码!</span>
                        </div>
                    </li>
                    <li>
                        <span class="part2-l"><span class="red">*</span>验证码：</span>
                        <div class="part2-r">
                            <input id="verifyCode" type="text" class="input-price1 verifyCode">
                            <img class="yzm" id="yzm" src="/servlet/yzCode.jpg" onclick="javascript:this.src='/servlet/yzCode.jpg?rnd='+Math.random();" title="点击刷新">
                            <span id="t_yzm" class="ml10 col99 fn-left">请输入图片验证码!</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="price-part3">
                <div class="mt10">
                    <span id="error">*提交订阅表示您愿意接受该免费车源推送服务,稍后为您推荐车辆！</span>
                </div>
            </div>

        </div>
        <div class="layer-bottom">
			<a id="sendNews" class="btn btn-org mr10">提交</a>
            <a class="btn btn-gray mr10" id="closeNews">取消</a></div>
        </div>
 <div class="cartype_nav">
  <div class="logo_nav" id="f_"><a></a>
  </div>
</div>

<div class="cartype_navOn">
  <div class="logo_nav" id="s_"><a></a>
  </div>
</div>
<div class="cartype_all">
      <p class="cartypenav_title">
        <span class="cartype_on" id="left">国内品牌</span>
        <span class="outcountry_car" id="right">国外品牌</span>
      </p>
      <div id="s_brand"></div>
</div>
</div>
<div class="hx_hotCity">
    <div class="hx_hContent">
    	 <div class="hx_code">
    	<img src="http://static.hx2cars.com/resource/web/page/images/appcode.png"/>
    	<p>扫描下载手机版</p>
    	</div>
    	<div class="hx_city">
    		<div class="hx_l">
		        <div class="hx_hpro" id="hx_pro">
		            <#if searchVo.station=="quanguo" >热门省份<#else>${webutil.getStationName()}二手车</#if>
		        </div>
		        <div class="hx_hcity" id="hx_city">
		        <#if searchVo.station!="quanguo" >
		                <#if hotArealist??>
		                    <#list hotArealist as hotArea>
		                    	<a href="${contextPath}/${hotArea.bxwName}${neilian.neilian}" target="_blank">${(common_func.formatLocation(webutil.getAreaName(hotArea.area_code)))!''}${neilian.neiliantitle}二手车</a>
		                    </#list>
		                </#if>
		        <#else>
		                <#if hotSF??>
		                    <#list hotSF?keys as key>
		                   		<a href="${contextPath}/${hotSF[key]}${neilian.neilian}" target="_blank">${key}${neilian.neiliantitle}二手车</a>
		                    </#list>
		                </#if>
		        </#if>
		        </div>
        	</div>
        <div class="hx_c">
	        <div class="hx_hpro" id="hx_hot">热门城市</div>
	        <div class="hx_hcity" id="hx_hotcity">
	            <#if hotCity??>
	                <#list hotCity?keys as key>
	                    <a href="${contextPath}/${hotCity[key]}${neilian.neilian}" target="_blank">${key}${neilian.neiliantitle}二手车</a>
	                </#list>
	            </#if>
	        </div>
        </div>
        
    </div>
    </div>
    
</div>
<@index_macro.rightNav/>
<@index_macro.newIndexOtherDown2015 />
<script src="${staticServer}/web/gbpage/js/carlist/newlist_brandtree.js" type="text/javascript"></script>
</body>
</html>
