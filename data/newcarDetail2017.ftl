<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
    <meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'/>
    <meta name="renderer" content="webkit">
<#import "/common/indexMacro.ftl" as index_macro>
<#import "/common/commonFunc.ftl" as common_func>
<title><#if simCar??>【${(common_func.formatLocation(simCar.shortAreaName))!''}二手车】${(simCar.usedate)!''}_二手${(simCar.title)!''}</#if>_价格<#if simCar?? && simCar.money gt 0>${(simCar.money)!''}万元<#else>面议</#if>_华夏二手车网</title>
<meta name="description" content="<#if carConfig.desc?length gt 50>${carConfig.desc?substring(0,50)}<#else>${(carConfig.desc)!''}</#if>" />
<meta name="keywords" content="买二手车，卖二手车  二手${(menu.firstMenu)!''} ${(menu.secondMenu)!''} ${(menu.threeMenu)!''}" />
<#--<link href="${staticServer}/web/dist/static/car/css/carDatedDetail.css?v=9af6e2c623?t=20180622" rel="stylesheet" type="text/css">-->
<link href="${staticServer}/web/dist/static/gbpage/css/common/common.css?t=20180905"  rel="stylesheet" type="text/css" >
<link href="${staticServer}/web/dist/static/gbpage/css/common/head.css?t=20170710" rel="stylesheet" type="text/css"/>
<link href="${staticServer}/web/dist/static/gbpage/css/cardetail/detail.css?t=20180905"  rel="stylesheet" type="text/css" >
<link href="${staticServer}/web/dist/static/member_new/css/wxpay.css" rel="stylesheet" type="text/css"/>
<link rel="stylesheet" href="${staticServer}/web/dist/static/gbpage/css/cardetail/idangerous.swiper.css">
<link href="${staticServer}/web/dist/static/gbpage/css/common/rightNav.css?t=20180703" rel="stylesheet" type="text/css" />
<link href="${staticServer}/web/dist/static/common/iconfont/iconfont.css" rel="stylesheet" type="text/css"/>
<script type="text/javascript" src="${staticServer}/web/dist/static/gbpage/js/common/jquery.min.js"></script>
<script type="text/javascript" src="${staticServer}/web/dist/static/gbpage/js/common/jquery.cookie.js"></script>
<script type="text/javascript" src="${staticServer}/web/dist/static/gbpage/js/cardetail/idangerous.swiper.min.js"></script>
<script type="text/javascript" src="${staticServer}/web/dist/static/mobpages/js/common/bigdata.js?t=20180829"></script>
<script type="text/javascript" src="${staticServer}/web/dist/static/gbpage/js/common/hx2carPages.js?t=20180703"></script>
<script type="text/javascript" src="${staticServer}/web/dist/static/gbpage/js/common/md5.js"></script>
<script type="text/javascript" src="${staticServer}/web/dist/static/gbpage/js/common/lazyload.js"></script>
<script type="text/javascript" src="${staticServer}/web/dist/static/gbpage/js/common/map.js"></script>
<script type="text/javascript" src="${staticServer}/web/dist/static/gbpage/js/common/LoginAndVerify.js?t=20180910"></script>
<script type="text/javascript" src="${staticServer}/web/dist/static/common/js/wxpay.js?t=20170710"></script>
<script type="text/javascript" src="${staticServer}/web/dist/static/common/js/qrcode.js"></script>
<script>
    var loginstate = <#if webutil.getLoginUserMobile()?? && webutil.getLoginUserMobile()!=''>true<#else>false</#if>
    var vipstate = '${isNoCar}';  //vip会员 1不是会员 2是会员
    var Login = '${webutil.getUserLoginStatus()}';  //1个人 2公司
</script>
<script type="text/javascript" src="${staticServer}/web/dist/static/gbpage/js/cardetail/cardetail.js?t=20180911"></script>
<#if datediff ?? && datediff ==0>
    <script type="text/javascript" src="${staticServer}/web/dist/static/gbpage/js/common/highcharts.js"></script>
    <script type="text/javascript" src="${staticServer}/web/dist/static/gbpage/js/cardetail/car_chart_cardetail.js?t=20180906"></script>
</#if>
    <script type="text/javascript">
        var state = <#if webutil.getUserLoginStatus() == 1>false<#else>true</#if>;
        var STATICSERVER = '${staticServer}';
        var CONTEXTPATH = "${contextPath}";
        var CODE = "${userareacode}";
        var cookieDomain = "${cookieDomain}";
        var dianzan = '${dianzan}';
        <#--//var cid ='${simCar.id}';-->
        var flag = '${flag}';
        <#--地图cardetail/cardetail.js-->
        var city = '${user.city!""}';
        var phone = "${(user.phone)!''}";
        var address = "${(user.address)!''}";
        var photo = "${common_func.getUserPic(user.photo)}";
        var car_price_range ='${InfoStr!""}';
        var car_areacode = "${(simCar.shortAreaName)!''}";
        var userId = ${(user.id)!''};
        var CODES = "${code}";
        var shoufu ="${moneytp}";
        <#--4s-->
        var F = {
            carId:'${simCar.id}',
            f4sVin : "${vin!''}",
            f4sBrandId : "${brandId!''}",//品牌id
            f4sVinImage : "${image!''}",//Vin图片
            actMobile :"${actmobile!''}",
            phoneNum:'${webutil.getLoginUserMobile()}',
            newCarConfig:'${jygjVehicleId}',
            contacts : '${contacts!''}',
            money: '${simCar.money!''}',
            newmoney:'<#if carConfigureGuidePrice ?? && carConfigureGuidePrice!="" && carConfigureGuidePrice!="未知" >${carConfigureGuidePrice!''}</#if>',
        	carSerial:'${simCar. carSerial!''}',
            assessPrice:'<#if assessPrice?? && assessPrice != 0>${assessPrice!""}</#if>',//二手车参考价
            isShowTGB:'<#if isShowTGB??>${isShowTGB!''}</#if>',//是否购买推广包
            isShowBDZD:'<#if isShowBDZD??>${isShowBDZD!''}</#if>'//是否购买地区推广
        };
        <#--评估-->
        var P = {
        	year :'${useYear!''}',
        	month :'${useMonth!''}',
        	areaCode :'${simCar.areaCode!''}',
        	mile :'${simCar.journey!''}',
        	serid :'${simCar.carSerial!''}',
        	carType :'${simCar.carType!''}',
        	keyword :'${simCar.title!''}',
            brand:'${carTag.brandTag}-${carTag.carSerialTag}'
        }
        $(function () {
            //$("#QRcode").boxShowHide(["#QRcodebg","#QRcodebox"], 0);
            $(".selectBox .Boutique_titles span").ShowTabChange("mouseenter", "on");
            $("#DTitle span").detailTabChange("click", "on");
            $("#CarbookBox .closed").closeBox(["#BG", "#CarbookBox"]);
            $("#CClose").closeBox(["#BG", "#Carcomplain"]);
            $("#TMap").ShowMap("DMap", "#IArea", "#ICompany", "#IPic img", "", "");
        <#if datediff ?? && datediff ==0 >
            <#if (isShowTGB?? && isShowTGB == 1) ||  (isShowBDZD?? && isShowBDZD == 1) >
                if( $('body').hasClass('w1130')){
                    $(["#car_top"]).scrollShowList(400);
                } else {
                    $(["#car_top"]).scrollShowList(450);
                }
            <#else>
                $(["#car_top"]).scrollShowList(890);
            </#if>
            // $(["#car_top"]).scrollShowList(890);
        </#if>
            $(".detail_pic  img").lazyload({
                effect: "fadeIn"
            });
        });
    	var mobilephone = '${webutil.getLoginUserMobile()!''}';
    </script>
</head>
<body>
<input type="hidden" id="phoneSub" value="">
<input id="user_id" type="hidden" value="${(webutil.getUserId())!''}"/>
<input id="simCarId" type="hidden" value="${(simCar.id)!''}"/>
<input id="kindH" type="hidden" value="<#if simCar.carKind == 0>${simCar.bigType!''}<#else>${simCar.carKind!''}</#if>"/>
<input id="dateH" type="hidden" value="${car.carDate!''}"/>
<input id="journey" type="hidden" value="${car.journey!''}"/>
<input id="areaCode" type="hidden" value="${simCar.areaCode!''}"/>
<input id="brandName_h" type="hidden"
       value="<#if carSerPinYin?? && carSerPinYin.title??>${carSerPinYin.title!''}</#if>"/>
<!--价格走势-->
<input id="car_brand" type="hidden" value="${(simCar.carSerial)!''}">
<input id="year" type="hidden" value="${(useYear)!''}">
<input id="serialName" type="hidden" value="<#if menu?exists>${(menu.threeMenu)!''}</#if>">
<!--价格走势-->
<input id="carpf" type="hidden" value="${(carpf)!''}">
<input id="carcreattime" type="hidden" value="${(creattime)!''}">
<input id="licensing_month" type="hidden" value="${(simCar.usedate)!''}">
<input id="message" type="hidden"
       value="<#if user.message??><#if user.message?length gt 22>${user.message?substring(0,20)?replace("<br>","")}<#else>${user.message?replace("<br>","")}</#if></#if>">
<input id="licensing_year" type="hidden"
       value="<#if simCar.usedate ?? && simCar.usedate?length gt 4>${((simCar.usedate)!'')?substring(0,4)}</#if>">
<input type="hidden" id="carMagess" name="carMagess"
       value="【${(common_func.formatLocation(simCar.shortAreaName))!''}】${(simCar.usedate)!''}&nbsp;${(simCar.title)!''}&nbsp;<#if car.color?exists && car.color !='10'>${(webutil.getCarColor(car.color))!''}</#if>&nbsp;<#if car.carAuto?exists>${(common_func.renderAuto(car.carAuto))!''}</#if>"/>
<input type="hidden" id="cardetail" name="cardetail"
       value="${(simCar.title)!''}&nbsp;<#if car.color?exists && car.color !='10'>${(webutil.getCarColor(car.color))!''}</#if>&nbsp;<#if car.carAuto?exists>${(common_func.renderAuto(car.carAuto))!''}</#if>"/>
<input type="hidden" id="phoNum" value="${(user.username)!''}，联系电话：${(user.phone)!''},${(user.mobile)!''}"/>
<input type="hidden" id="freetoask"/>
<div class="DATU_Page" id="pic" style="display:none;"></div>
<#if isNoCar == '2' && carpf??>
    <@index_macro.newIndexTop20170627 label="二手车批发"/>
<#else>
    <@index_macro.newIndexTop20170627 label="二手车信息"/>
</#if>
<div class="model"></div>
<div class="infoBox myModel">
    <div class="title">
        <span>申请购前检测</span>
        <i class="close"></i>
    </div>
    <!--<div class="closeIndfoBox"></div>
    <h3>申请购前检测</h3>-->
    <div class="infoTxt">
        <h4 class='txtTitle'>什么是购前检测?</h4>
        <p class="text1">专业的检测师，携带检测仪器上门，提供全面的二手车检测服务，呈现真实车况，出具检测报告，让消费者买车更放心，用车有保障！</p><br/>
        <p class="text2">服务包括：三大类（大事故车、火烧车、水泡车）排除，对车身外观、内饰、电器设配、底盘、发动机、路试等进行全面检测。</p><br/>
        <!--<p>分为：</p>-->
        <!--<p>1.陪同看车</p>
        <p>专业的检测师陪同，携带专业的检测仪器，面对面的指导你迅速掌握车况好坏。</p>
        <p>2.异地验车</p>
        <p>委托人跟被检测车主约定好，在车主同意的情况下，检测全权委托给我们。检测师替你上门，检测并出具报告。即便远在北京，亦能对广州的车况了如指掌。</p>-->
        <p class="jcPrice">检测价格：<span>368元</span></p>
    </div>
    <div class="infobtn">
        <input type="checkbox" id="noWarn"><label for="noWarn">不再提醒</label>
        <button class="confirmBtn">确定</button>
    </div>
</div>
<div class="path">
    <a href="/" class="index">首页</a>
<#if sfpinyin??>&gt;
    <a href="${contextPath}/${sfpinyin}"
       target="_blank">${webutil.getAreaNameByPinyin(sfpinyin)?replace('省','')?replace('市','')}二手车</a>
</#if>
<#if citypinyin ??>&gt;
    <a href="${contextPath}/${citypinyin}/soa1"
       target="_blank">${webutil.getAreaNameByPinyin(citypinyin)?replace('市','')}二手车报价</a>
</#if>
<#if carBigType ??>&gt;
    <a href="${contextPath}/<#if citypinyin ??>${citypinyin}/<#elseif sfpinyin??>${sfpinyin}/</#if>soa1b${carBigType}"
       target="_blank">二手${(webutil.getBigTypeMore(carBigType))}</a>
</#if>
<#if carBigSerPinYin ??>&gt;
    <a href="${contextPath}/<#if citypinyin ??>${citypinyin}/<#elseif sfpinyin??>${sfpinyin}/</#if>${carBigSerPinYin.dirname}/soa1t${carBigSerPinYin.id}"
       target="_blank">二手${carBigSerPinYin.title}</a>
    <#if carSerPinYin ??>&gt;
        <a href="${contextPath}/<#if citypinyin ??>${citypinyin}/<#elseif sfpinyin??>${sfpinyin}/</#if>${carBigSerPinYin.dirname}/${carSerPinYin.dirname}/soa1t${carSerPinYin.id}"
           target="_blank">二手${carSerPinYin.title}</a>
    </#if>
</#if>
    &gt;<span style="padding-left:6px;">详情</span>
</div>
<#if combologo?exists>
<div class="light_icon">
    <span>TA的车标</span>
    <div class="all_icon">
        <#list combologo as map>
            <#if user.website??&&user.website?index_of("vip")!=-1 >
            <a href="http://vip.hx2car.com/store/carlist.htm?oname=${(oname)!''}&keyword=${(common_func.encoder((map.title)))!''}"
               target="_blank">
            <#else>
            <a href="${(webutil.profilePath(user.id))!''}<#if actmobile??>/?actMobile=${actmobile}</#if>"
               target="_blank">
            </#if>
            <img src="${staticServerUpload}/brandlogo/${common_func.formatBrandLogo(map.logo)?if_exists}" width="55"
                 height="55"/></a>
        </#list>
    </div>
</div>
</#if>
${vipseta}
<div class="cardetail">

    <div class="cardetailT">
        <#if datediff ?? && datediff ==0 >
            <div class="top">
                <div class="top_L">
                    <p class="datu" id="TDatu" style="cursor:pointer;">
                        <#--<a  style="background-image: url(https://img.hx2car.com/upload/${simCar.getFirstSmallPic("800_600")});" href="javascript:;">-->
                        <a style="background-image: url(${common_func.getCarImageStr(simCar.getFirstSmallPic("800_600"))});" href="javascript:;">
                        ${(common_func.getCarImage(simCar.getFirstSmallPic("800_600") "${(simCar.title)}"))}
                        </a>
                    </p>
                    <div class="xtWarp">
                        <i class="leftBtn"><span></span></i>
                        <i class="rightBtn"><span></span></i>
                        <div class="xtbox">
                            <ul class="xiaotu" id="TXiaotu">
                                <#if simCar.getSmallPicList("400_300")?? && simCar.getSmallPicList("400_300")?size gt 0>
                                    <#list simCar.getSmallPicList("400_300") as pic>
                                        <#if pic_index >
                                            <input id="pic_index" type="hidden" value="${(pic_index)!''}">
                                            <li id="focusBigImg_${(pic_index)!''}"
                                                p_img="${(common_func.getCarPic(pic))!''}" <#if pic_index ==0>
                                                src="${(common_func.getCarPic(pic))!''}" class="select"</#if>>
                                                <img src="${(common_func.getCarPic(pic))!''}"/></li>
                                        </#if>
                                    </#list>
                                <#else>
                                    <li>
                                        <img src="${staticServer}/web/dist/static/car/images/car.jpg" width="75" height="50px"/><i></i>
                                    </li>
                                </#if>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="top_R">
                    <h2>
                        【${(common_func.formatLocation(simCar.shortAreaName))!''}】${(simCar.usedate)!''}&nbsp;<span class="B_title">${(simCar.title)!''}&nbsp;<#--<#if car.color?exists && car.color !='10'>${(webutil.getCarColor(car.color))!''}</#if>&nbsp;--><#if car.carAuto?exists>${(common_func.renderAuto(car.carAuto))!''}</#if></span>
                    </h2>
                    <div class="title_info">
                        <div class="title_infoL">
                            <span><i>更新：</i><i><#if simCar.modifiedTime??>${(simCar.modifiedTime?string('yyyy-MM-dd HH:mm:ss'))!''}</#if></i> </span><#--<span><i>点击:</i> <i>${(simCar.clickCount)!''}</i></span>-->
                        </div>
                        <div class="company_infoR" <#if user.personcar !=1 && user.company?? && user.company!=''>id="hoverCompanyBox"</#if>>
                            <div class="companyBoxTo">
                                <#if user.personcar !=1 && user.company?? && user.company!=''><span class="iconarrow"></span></#if>
                                <span class="companyTitle <#if user.personcar !=1 && user.company?? && user.company!='' && user.company?length gt 15>comOverText</#if>"><#if user.personcar !=1 && user.company?? && user.company!=''>${user.company!''}<#else>联系人：<a href="${contextPath}/profile/${(user.id)!''}<#if actmobile??>/?actMobile=${actmobile}</#if>">${(user.username)!''}</a></#if></span>
                                <#if user.userVipTime?? && user.userVipTime!=''><span class="iconyear"><span class="yearText">${user.userVipTime!''}年</span></span></#if>
                            </div>
                            <#--<dvi>-->
                                <div class="cardetailR_Host" id="companyBoxCont" style="display:none;">
                                <!-- *******新加任务********* -->
                                <div class="companyBoxTo">
                                    <span class="iconarrow"></span>
                                    <span class="companyTitle <#if user.personcar !=1 && user.company?? && user.company!='' && user.company?length gt 15>comOverText</#if>"><#if user.personcar !=1 && user.company?? && user.company!=''>${user.company!''}<#else>联系人：<a href="${contextPath}/profile/${(user.id)!''}<#if actmobile??>/?actMobile=${actmobile}</#if>">${(user.username)!''}</a></#if></span>
                                    <#if user.userVipTime?? && user.userVipTime!=''><span class="iconyear"><span class="yearText">${user.userVipTime!''}年</span></span></#if>
                                </div>
                                <div class="info_per">
                                    <#--<div class="name" title="<#if user.personcar !=1 && user.company?? && user.company!=''>${(user.company)!''}<#else>${(user.username)!''}</#if>"><#if user.personcar !=1 && user.company?? && user.company!=''>${(user.company)!''}<#else>${(user.username)!''}</#if></div>
                                    -->
                                    <div class="honor">
                                        <#if vipdata?? && vipdata.verifyState ==1 && user.personcar != 1>
                                            <i class="shang">认证车商</i>
                                        </#if>
                                        <#if user.status == 1 >&nbsp;&nbsp;<i class="verify_person" id='showicbc' title="工商认证信息">工商认证</i></#if>
                                        <#if vipdata?? && vipdata.comboType??>
                                            <i class="fvip fvip${vipdata.comboType}"
                                               title="<#if vipdata.comboType ==2>商务会员<#elseif vipdata.comboType ==3>白银会员<#elseif vipdata.comboType ==4>黄金会员<#elseif vipdata.comboType ==5><#elseif vipdata.comboType ==6>钻石会员<#elseif vipdata.comboType ==7>红冠会员<#elseif vipdata.comboType ==8>蓝冠会员<#elseif vipdata.comboType ==8>皇冠会员<#else>vip${vipdata.comboType}</#if>"></i>
                                        </#if>
                                    </div>
                                    <#if vipseta?? && vipseta==1>
                                        <img src="${staticServer}/web/dist/static/member_new/images/hx_vip.png" class="cpic " title="个人会员" style="display: none;">
                                    </#if>
                                </div>
                                <!-- *******新加任务********* end -->
                                <div class="intro">
                                    <#if user.website?? && user.website?index_of('vip')!=-1>
                                        <#if  user.usertype == 0 && user.score??&&user.score?number?int!=0>
                                            <div>
                                                <span class="info_title">评 &nbsp;&nbsp; 分：</span>
                                                <span class="info_content">
        			<#assign grade = user.score?number?int>
                                                    <#list 1..grade as list>
                                                        <i class="star sestar"></i>
                                                    </#list>
                                                    <#if grade lt user.score?number >
                                                        <i class="star halfstar"></i>
                                                        <#assign lost = 4 - grade>
                                                        <#if lost != 0>
                                                            <#list 1..lost as list>
                                                                <i class="star"></i>
                                                            </#list>
                                                        </#if>
                                                    <#else>
                                                        <#assign lost = 5 - grade>
                                                        <#if lost != 0>
                                                            <#list 1..lost as list>
                                                                <i class="star"></i>
                                                            </#list>
                                                        </#if>
                                                    </#if>
            	</span>
                                            </div>
                                        </#if>
                                    </#if>
                                    <#if user.personcar !=1 >
                                        <#if user.tuzhongcar != 1>
                                            <div>
                                                <span class="info_title">信 &nbsp;&nbsp; 誉：</span>
                                                <span class="info_content">
                                                    <#if user.credit &gt; 29>
                                                        <i class="credit">${(user.credit)!''}</i>
                                                    <#else>
                                                    ${(user.credit)!''}
                                                    </#if>
                        </span>
                                            </div>
                                        </#if>
                                    </#if>
                                    <#if user.personcar !=1 >
                                        <#if user.personcar != 1 && user.tuzhongcar != 1>
                                            <div class="sellState">
                                                <div>
                                                    <span class="info_title">在 &nbsp;&nbsp; 售：</span>
                                                    <span class="cf00"><#if vipdata??> ${vipdata.carOnSale!'0'}</#if></span>
                                                </div>
                                                <div>
                                                    <span class="info_title">已 &nbsp;&nbsp; 售：</span>
                                                    <span class="cf00"><#if vipdata??> ${vipdata.carHadSale!'0'}</#if></span>
                                                </div>
                                            </div>
                                        </#if>
                                    <#--<#if user.tuzhongcar != 1 >-->
                                    <#--<p><label>手 &nbsp;&nbsp; 机：</label><span>${(user.mobile)!''}</span></p>-->
                                    <#--</#if>-->
                                    </#if>
                                    <div>
                                        <span class="info_title">联系人：</span>
                                        <span class="info_content">
                <#if user.personcar !=1 && user.tuzhongcar !=1 ><a class="userlink"href="${contextPath}/profile/${(user.id)!''}<#if actmobile??>/?actMobile=${actmobile}</#if>" target="_blank"></#if>${(user.username)!''}<#if user.personcar !=1></a></#if>
                                            <#if appUserVerify == 1><i class="stafk" title="已通过个人实名认证"></i></#if>
            </span>
                                    </div>
                                    <#if user.personcar ==1 && webutil.getAllAreaName(user.areaCode)??>
                                        <div><span class="info_title">地 &nbsp;&nbsp;区：</span><span class="info_content">${(webutil.getAllAreaName(user.areaCode))!''}</span></div></#if>
                                    <#if (user.personcar !=1 || user.tuzhongcar =1) && user.address?? && user.address!=''>
                                        <div><span class="info_title">地 &nbsp;&nbsp;址：</span><span class="info_content" id="IArea" title="${(user.address)!''}">${(user.address)!''}<#if user.personcar !=1 && user.address ?? && user.address !=''>
                                            <a href="${contextPath}/user/showmap/${(user.id)!''}" rel="nofollow" target="_blank"
                                               class="gray14 goMap"></a></#if></span></div>
                                    </#if>
                                    <div calss="company_btns" style="text-align:center;">
                                        <#if user.usertype?? && user.usertype==1 && user.tuzhongcar!=1>
                                            <#if user.website?? && user.website!=''>
                                                <span class="intro_comment" data-track="PC详情页-点评" >点评商家</span>
                                                <a class="intro_shops" href="${(user.website)!''}" target="_blank">进入门店</a>
                                            <#else>
                                                <span class="intro_comment only" data-track="PC详情页-点评" >点评商家</span>
                                            </#if>
                                            <div class="commentsbox"><div class="comments">已与商家联系？马上评价商家服务</div><i class="icon-comments"></i></div>
                                        </#if>
                                        <#if user.tuzhongcar==1>
                                            <a class="intro_shop" href="/car/tuzhongarea.htm" target="_blank">进入门店</a>
                                        </#if>
                                    </div>
                                </div>
                            </div>
                           <#-- </dvi>-->
                        </div>
                        <div class="clear"></div>
                    </div>
                    <div class="car_info">
                        <div class="manyBox">
                            <div class="manyNum">
                                <span class="cf60 price">
                                    <#if simCar.money==0 || simCar.money=='' || simCar.money=='面议'>
                                        <span class="bigFont">面议</span>
                                    <#else>
                                        ￥<span class="bigFont" id="moneycar">
                                        <#if carpf?? && carpf!="">
                                            <#if isNoCar==null || isNoCar!=2>
                                                面议
                                            <#else>
                                            ${(common_func.formatPrice(simCar.tradePrice))?replace('万','')!''}
                                            </#if>
                                        <#else>
                                        ${simCar.money !'面议'}
                                        </#if>
                                        </span>万
                                    </#if><#--<a class="tool_yuyue" data-track="底价帮手"><i></i>底价帮手</a>-->
                                </span>
                                <span>
                                    <#if simCar.tradePrice?? || simCar.tradePrice != 0 || simCar.tradePrice != '' || simCar.tradePrice != '未知' || simCar.tradePrice != null>
                                        <span class="lookWholesale">查看批发价</span>
                                    </#if>
                                </span>
                                <span class="wholesale pf_check" style="display:none;">
                                    <#if simCar.tradePrice ?? && simCar.tradePrice!='' && simCar.tradePrice!='未知'>
                                        批发价：${simCar.tradePrice!''}万
                                    </#if>
                                </span>
                                    <#-- </span>-->
                            </div>
                            <div class="moneyOver">
                                <#--<p class="wholesale car_check" style="display:none;">
                                    <#if simCar.tradePrice ?? && simCar.tradePrice!='' && simCar.tradePrice!='未知'>
                                        批发价：${simCar.tradePrice!''}万
                                    </#if>
                                </p>-->
                                <p class="car_check"  style="display:none;">
                                    <#if isNoCar == '2'>原价：${car.money!''}万<#else>
                                        <#if carConfigureGuidePrice ?? && carConfigureGuidePrice!="" && carConfigureGuidePrice!="未知" >
                                            新车指导价：${carConfigureGuidePrice!''}万
                                        </#if>
                                    </#if>
                                </p>
                                <p class="assessData">
                                    <#if assessPrice?? && assessPrice != 0 && webutil.getAppUserMobile()?? && webutil.getAppUserMobile().vipState == 1>
                                        二手车参考价：<span id="assessData_num" class="assessData_num">${assessPrice!''}</span>万
                                    </#if>
                                    <a class="cblue" id="TTend" lang="#DTend" <#if zishupinpai=1>style="display:none"</#if>>查看价格趋势</a>
                                </p>
                            </div>

                        </div>
                        <ul class="detail">
                            <li>
                                <p>${(car.journey)!''}万公里</p>
                                <p class="tint">行驶公里</p>
                            </li>
                        <#--
                        <li>
                            <p>${car.carDate!'未上牌'}</p>
                            <p class="tint">上牌时间</p>
                        </li>
                        <li>
                            <p><i
                                class="diqu">${(webutil.getAllAreaName(user.areaCode))!''}</i><#if user.personcar !=1 && user.address ?? && user.address !=''>
                            <a href="${contextPath}/user/showmap/${(user.id)!''}" rel="nofollow" target="_blank"
                               class="gray14 dw"></a></#if></p>
                            <p class="tint">所在地</p>
                        </li>
                        <li>
                            <p>
                            <#if car.carAuto??>
                                <#if car.carAuto == '1'>
                                    自动档
                                <#elseif car.carAuto == '2'>
                                    手动档
                                <#elseif car.carAuto == '3'>
                                    手自一体
                                <#else>
                                    未知
                                </#if>
                            <#else>
                                未知
                            </#if>
                            </p>
                            <p class="tint">档位</p>
                        </li>
                        -->
                            <li>
                                <p>${(huaBao)!'未知'}</p>
                                <p class="tint">排放标准</p>
                            </li>
                            <li>
                                <p>${(common_func.renderCan(car.transfer))!'未知'}</p>
                                <p class="tint">能否过户</p>
                            </li>
                            <li>
                                <p>${(common_func.renderForuse(car.carForuse))!'未知'}</p>
                                <p class="tint">用途</p>
                            </li>
                        </ul>
                    </div>
                    <div id="erweima">
                        <div class="QR_code" id="QRcode">
                            <#if carpf?? && carpf!="">
                                <img src="/servlet/pcarQrCode/${car.id!''}.jpg"/>
                            <#else>
                                <img src="/servlet/carQrCode/${car.id!''}.jpg"/>
                            </#if>
                            <p><span>用华夏APP扫码</span><br /><span>查看批发价</span></p>

                        </div>
                    </div>
                    <div class="clear"></div>
                <#--<a class="dTest hide" data-track="检测"><span>检测新服务，买车更放心，最高赔付15万</span> <span class="right">立即检测>></span></a>-->
                    <div class="ioans_ass <#if user.personcar !=1 && moneytp??>diakuan</#if>">
                        <#if user.personcar !=1 && moneytp??>
                            <span class="ioans_ass_icon"></span><span class="lt">首付${moneytp}万，买车更划算！</span> <span class="goIoans" data-track="贷款">我要贷款>></span>
                        <#else>
                            <span class="ioans_ass_icon"></span><span class="lt">私人助理帮您砍价，协助您完成交易！</span> <span class="goAssistant" data-track="私人助理">立即申请>></span>
                        </#if>
                    </div>
                    <div class="clear">

                    </div>
                    <div class="BOX ">
                    	<div class="BOX_small">
                        		<h3>微信扫码拨打电话</h3>
                        		<img src="https://img.hx2car.com/upload/newimg2/M00/95/51/Clo8xFv-N4KAFCQdAABuqvD4vug614.jpg" id="BOX_code"/>
                        		<span class="BOX_small_msg">联系我时请说明是在华夏二手车看到的</span>		
                        </div>
                        <div class="BOX_phone">
                        	
                            <span class="num">
                                <input type="hidden" class="openVipBtn"/><#--openVipBtn 查看联系方式（非会员，且免费次数已满），会员充值弹框 绑定-->
                                <i class="icon-phone"></i>
                                <#if user.ourselfphone?? && user.ourselfphone == 1>
                                    <span class="getNum">
                                        ${user.phone!''}
                                            <#if user.mobile?? && user.phone != user.mobile>
                                                &nbsp;${user.mobile!''}
                                            </#if>
                                    </span>
                                <#elseif webutil.getUserLoginStatus() == '1'>
                                    <span class="look_num getNum " data-track="PC详情页-查看电话">点击查看联系方式&nbsp;</span>
                                <#else>
                                    <span class="getNum freeNum" data-track="PC详情页-查看电话">
                                        点击查看联系方式&nbsp;
                                    </span>
                                </#if>
                                <span class="numText"><br>提示：及时拨打电话，以免电话失效</span>
                            </span>
                            <#if aliRecordsuser?? &&aliRecordsuser!="">
                                <#if hadchange!=null && hadchange=="hadchange">
                                    <span class="danbaoinfo_car">此车已成交</span>
                                <#elseif canchage!=null && canchage=="canchage">
                                    <span class="button" id="WBook" data-name="我要砍价" data-track="我要砍价" title="点击进入订单页">我要砍价</span>
                                <#else>
                                    <span class="danbaoinfo_car">此车已预定</span>
                                </#if>
                            <#else>
                                <#if carpf?? && carpf!="">
                                    <span class="button" id="yypifa" data-track="预约批发">预约看车</span>
                                <#else>
                                    <span class="button" id="WBook" data-name="我要砍价" data-track="我要砍价">我要砍价</span>
                                </#if>
                            </#if>
                            <span class="freeConsult1 freeConsult" data-track="免费咨询车况">免费咨询</span>
                        </div>
                    </div>
                    <div class="tool">
                        <ul>
                            <li class="fristLi">
                                <div class="title_infoR">
                                    <span class="sc conllects_btn" id="ssscc" lang="${(simCar.id)!''}" car_name="${(common_func.formatLocation(simCar.shortAreaName))!''}${(simCar.usedate)!''}&nbsp;${(simCar.title)!''}" car_lang="${(common_func.formatPrice(simCar.money))!''}" data-track="收藏"><i></i>关注</span>
                                    <span class="isCollect" style="display: none;"><i></i>已关注</span>
                                    <#if collectionNum?? && collectionNum gt 0 >
                                        <div class="collests_cont">
                                            <div class="collests_conts">
                                                <i class="coll_arrow"></i>
                                                <p class="collestsText">共有<span>${collectionNum!''}</span>位用户关注了此车！</p>
                                                <i class="coll_colse"></i>
                                            </div>
                                        </div>
                                    </#if>
                                </div>
                            </li>
                        <#--<li class="tool_depreciate" data-track="降价提醒"><i></i>&nbsp;降价提醒</li>-->
                            <li class="tool_duibi TDuibi" id="TDuibi" piclang="${(car.photoAddress)!}" lang="${(simCar.id)!''}"
                                car_name="${(common_func.formatLocation(simCar.shortAreaName))!''}${(simCar.usedate)!''}&nbsp;${(simCar.title)!''}"
                                car_lang="${(common_func.formatPrice(simCar.money))!''}"><i></i>加入对比
                            </li>
                            <li class="tool_noteBox"><i></i>发送至手机
                                <div class="shareModel hide bdsharebuttonbox">
                                    <ul>
                                        <li><a class="showWx" data-track="PC分享-微信">微信</a></li>
                                        <li><a class="bds_tqq" data-cmd="sqq" data-track="PC分享-QQ">QQ</a></li>
                                        <li><a class="bds_qzone" data-cmd="qzone" data-track="PC分享-空间">QQ空间</a></li>
                                        <li><a class="bds_tsina" data-cmd="tsina" data-track="PC分享-微博">新浪微博</a></li>
                                    <#--<li class="tool_note" data-track="发送至手机" ><a>短信至手机</a></li>-->
                                    </ul>
                                </div>
                            </li>
                            <li class="tool_jb"><i></i>我要报错</li>
                        </ul>
                        <div class="clear"></div>
                    </div>
                <#--
                <div class="carState">
                    <ul>
                        <#if vipdata??&& vipdata.verifyState ==1 && user.personcar != 1>
                            <li><i class="sj"></i><span>商家车源</span></li>
                        </#if>
                        <#if car.zhunxinche == 'NEW'>
                            <li><i class="zxc"></i><span>准新车</span></li>
                        </#if>
                        <#if isNewCar == 1>
                            <li><i class="ys"></i><span>一手车源</span></li>
                        </#if >
                    </ul>
                </div>
                <div class="clear"></div>
                -->
                </div>
                <div class="clear"></div>
            </div>
        </#if>
    </div>

    <div class="jf">
        <span class="text1">安全提示：让您提前汇款需小心提防，认真查验车况及车辆所有证件后再进行交易，谨防受骗。</span><span class="text2" id="jfBtn">出现纠纷怎么办？>></span><#--暂时隐藏-->
    </div>

    <div class="cardetailB">
        <div class="cardetailL">
            <#if datediff ?? && datediff ==0 >
                <#--<div class="jf">
                    <span class="text1">安全提示：让您提前汇款需小心提防，认真查验车况及车辆所有证件后再进行交易，谨防受骗。</span><span class="text2" id="jfBtn">出现纠纷怎么办？>></span>&lt;#&ndash;暂时隐藏&ndash;&gt;
                </div>-->
                <div class="hxfw">
                    <span class="text1">华夏服务</span><span class="text2">Vehicle Condition</span>
                </div>
            <#--服务内容-->
                <div class="fwbox fwbox2">
                    <ul class="fwcont">
                        <li>
                            <div class="fwlist boxjc">
                                <i class="fwpic2"></i>
                                <div class="fwtext">
                                    <p>专业检测，还原真实车况</p>
                                    <a class="dTest" data-track="检测">申请检测</a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="fwlist boxht">
                                <i class="fwpic3"></i>
                                <div class="fwtext">
                                    <p>电子合同，告别繁琐等待</p>
                                    <a class="contract" data-track="电子合同">了解更多</a>
                                </div>
                            </div>
                        </li>
                        <li class="lastlist">
                            <div class="fwlist boxty">
                                <i class="fwpic4"></i>
                                <div class="fwtext">
                                    <p>华夏托运，让您告别奔波</p>
                                    <a id="" href="/tools/tycar.htm?code=${user.areaCode!''}&carserial=${simCar.carSerial!''}" target="_blank" data-track="托运">华夏托运</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            <#--服务内容 -->


            </#if>
                <div class="clear">
                </div>
            <#if datediff ?? && datediff ==0>
                <div class="cardetailL_content">
                <#--4s查询记录详情-->
                    <div class="Detail" id="DDetail">
                        <h4 class="Detail_title"><span class="ilogo lt">基本配置</span><#if carConfigure?? || jygjVehicleId??><a class="showStateBox">查看新车配置</a></#if>
                        </h4>
                        <ul class="deploy">
                            <li><label>编号：</label>${webutil.getCode(carIdNum,simCar.createTime?string('yyyy-MM-dd HH:mm:ss'))}
                            </li>
                            <li><label>车型：</label>${(webutil.getBigTypeMore(simCar.bigType))!''}</li>
                            <li><label>里程：</label>${(car.journey)!''}万公里</li>
                            <li><label>排放：</label>${(huaBao)!'未知'}</li>
                            <li>
                                <label>燃油：</label><#if car.oilWear?? && car.oilWear!=''>${common_func.renderOil(car.oilWear)!''}<#else>
                                未知</#if></li>
                            <li>
                                <label>用途：</label><#if car.carForuse?? && car.carForuse!=''>${common_func.renderForuse(car.carForuse)!''}<#else>
                                未知</#if></li>
                        <#--<li><label>发动机：</label>${carConfigure.engineModel}</li>
                        <li><label>驱动方式：</label>${carConfigure.qdfs!'未知'}</li>-->
                            <li>
                                <label>保险情况：</label><#if "${(webutil.getCarConfig(carConfig.insuranceYear))!''}"?matches("\\d+") && "${(webutil.getCarConfig(carConfig.insuranceMonth))!''}"?matches("\\d+")>
                            ${(webutil.getCarConfig(carConfig.insuranceYear))!''}
                                年${(webutil.getCarConfig(carConfig.insuranceMonth))!''}月
                            <#else>
                                未知
                            </#if></li>
                            <li>
                                <label>年审情况：</label><#if "${(webutil.getCarConfig(carConfig.inspectionYear))!''}"?matches("\\d+") && "${(webutil.getCarConfig(carConfig.inspectionMonth))!''}"?matches("\\d+")>
                            ${(webutil.getCarConfig(carConfig.inspectionYear))!''}
                                年${(webutil.getCarConfig(carConfig.inspectionMonth))!''}月
                            <#else>
                                未知
                            </#if></li>
                            <li><label>能否过户：</label>${(common_func.renderCan(car.transfer))!''}</li>
                            <#if user.personcar !=1>
                                <li><label>能否按揭：</label>${(common_func.renderMortgage(car.mortgage))!''}</li>
                            </#if>
                        </ul>
                        <#if spotshow?exists>
                            <div class="bright clearBoth">
                                <i>亮点配置：</i>
                                <div class="brightSpan">
                                    <#list spotshow as bright>
                                        <#if bright_index lt 10>
                                            <span>${bright}</span>
                                        </#if>
                                    </#list>
                                </div>
                            </div>
                        </#if>
                        <div class="pzbq">标签：
                            <#if carTag.brandTag?? && carTag.brandTag !=''>
                                <a href="/quanguo${brandpinyin!''}/soa1t${carTag.brandCode!''}"><span>${carTag.brandTag}</span></a>
                            </#if>
                            <#if carTag.carSerialTag?? && carTag.carSerialTag !=''>
                                <a href="/quanguo${brandpinyin!''}/soa1t${carTag.carSerialCode!''}"><span>${carTag.carSerialTag}</span></a>
                            </#if>
                            <#if carTag.autoTag?? && carTag.autoTag !=''>
                                <a href="/quanguo${brandpinyin!''}/soa1g${carTag.autoCode!''}"><span>${carTag.autoTag}</span></a>
                            </#if>
                            <#if carTag.colorTag?? && carTag.colorTag !=''>
                                <a href="/quanguo${brandpinyin!''}/soa1s${carTag.colorCode!''}"><span>${carTag.colorTag}</span></a>
                            </#if>
                            <#if carTag.huobaoTag?? && carTag.huobaoTag !=''>
                                <a href="/quanguo${brandpinyin!''}/soa1e${carTag.huobaoCode!''}"><span>${carTag.huobaoTag}</span></a>
                            </#if>
                            <#if carTag.mileageTag?? && carTag.mileageTag !=''>
                                <a href="/quanguo${brandpinyin!''}/soa1m${carTag.mileageCode!''}"><span>${carTag.mileageTag}</span></a>
                            </#if>
                            <#if  carTag.brandTag?? && carTag.brandTag !='' && simCar.money?? && simCar.money !='' && simCar.money != 0 && simCar.money != '面议'>
                                <em class="subscription" onclick="getJyTitle.subscription()">同类车上新通知我></em>
                            </#if>
                        </div>
                        <div class="codebox">
                            <img src=""/>
                        </div>
                    <#--<#if user.personcar !=1>-->
                    <#--<ul class="deploy2 hide">-->
                    <#--<#if carConfig.drivingLicense?exists>-->
                    <#--<li>-->
                    <#--<span class="deploy2_title">车辆手续：</span>-->
                    <#--<span class="deploy2R">-->
                    <#--登记证<em><#if carConfig.registration?exists>有</#if></em>-->
                    <#--行驶证<em><#if carConfig.drivingLicense?exists>有</#if></em>-->
                    <#--购置税证<em><#if carConfig.taxCertificate?exists>有</#if></em>-->
                    <#--原始发票<em><#if carConfig.taxCertificate?exists>有</#if></em>-->
                    <#--保养手册<em><#if carConfig.maintenance?exists>有</#if></em>-->
                    <#--</span>-->
                    <#--</li>-->
                    <#--</#if>-->
                    <#--<#if carConfig.carFnction?? >-->
                    <#--<li><span class="deploy2_title">功能配置：</span>-->
                    <#--<span class="deploy2R"><#if carConfig.carFnction?? >-->
                    <#--<div><span class="oth_infortitle">正面安全气囊<#else>无</#if></span></li>-->
                    <#--</#if>-->
                    <#--<#if carConfig.sound?? >-->
                    <#--<li><span class="deploy2_title" id="shushipz">舒适配置：</span><span class="deploy2R"-->
                    <#--id="shushipzspan">-->
                    <#--<#if carConfig.sound != '未知' && carConfig.sound != ''>-->
                    <#--音响<em>____${(webutil.getCarConfig(carConfig.sound))!''}___</em></#if>-->
                    <#--<#if carConfig.wheel != '未知' && carConfig.wheel != ''>-->
                    <#--方向盘<em>__${(webutil.getCarConfig(carConfig.wheel))!''}___</em></#if>-->
                    <#--<#if carConfig.dormer != '未知' && carConfig.dormer != ''>-->
                    <#--天窗<em>${(webutil.getCarConfig(carConfig.dormer))!''}</em></#if>-->
                    <#--<#if carConfig.window != '未知' && carConfig.window != ''>-->
                    <#--车窗<em>__${(webutil.getCarConfig(carConfig.window))!''}___</em></#if>-->
                    <#--<#if carConfig.chair != '未知' && carConfig.chair != ''>-->
                    <#--座椅<em>${(webutil.getCarConfig(carConfig.chair))!''}</em></#if>-->
                    <#--<#if carConfig.headlight != '未知' && carConfig.headlight != ''>-->
                    <#--车灯<em>${(webutil.getCarConfig(carConfig.headlight))!''}</em></#if>-->
                    <#--<#if carConfig.carSys != '未知' && carConfig.carSys != ''>-->
                    <#--导航<em>${(webutil.getCarConfig(carConfig.carSys))!''}</em></#if>-->
                    <#--<#if carConfig.conditioner != '未知' && carConfig.conditioner != ''>-->
                    <#--空调<em>__${(webutil.getCarConfig(carConfig.conditioner))!''}___</em></#if>-->
                    <#--<#if carConfig.wiper != '未知' && carConfig.wiper != ''>-->
                    <#--雨刷<em>__${(webutil.getCarConfig(carConfig.wiper))!''}___</em></#if>-->
                    <#--<#if carConfig.lock != '未知' && carConfig.lock != ''>-->
                    <#--车锁<em>__${(webutil.getCarConfig(carConfig.lock))!''}___</em></#if>-->
                    <#--<#if carConfig.carother != '未知' && carConfig.carother != ''>-->
                    <#--内饰<em>__${(webutil.getCarConfig(carConfig.carother))!''}___</em></#if></span></li>-->
                    <#--</#if>-->

                    <#--</ul>-->
                    <#--</#if>-->
                        <h4 class="Detail_title"><span class="ilogo lt">车辆描述</span>
                            <#if user.personcar !=1 && user.tuzhongcar !=1>
                                <button class="show_cheliao freeConsult" data-track="免费咨询车况">免费咨询车况</button>
                            </#if>
                        </h4>
                        <div class="describe desshow1 ">
                        <#--为了格式化描述所加-->
                            <#if carConfig.desc?length gt 110>
                            ${carConfig.desc?replace("\n","&nbsp;")?replace("/n","&nbsp;")?substring(0,100)!''}...
                                <span class="downdes">查看全部</span>
                            <#else>
                            ${carConfig.desc?replace("\n","<br />")?replace("/n","<br />")!''}
                            </#if>
                        </div>
                        <div class="describe desshow1 hide">
                        <#--为了格式化描述所加-->
                            <#if carConfig.desc>${carConfig.desc?replace("\n","<br />")?replace("/n","<br />")!''}</#if>
                            <span class="updes">收起</span>
                        </div>
                        <div class="describe desshow2">
                        <#--为了格式化描述所加-->
                            <#if carConfig.desc?length gt 135>
                            ${carConfig.desc?replace("\n","&nbsp;")?replace("/n","&nbsp;")?substring(0,120)!''}...
                                <span class="downdes">查看全部</span>
                            <#else>
                            ${carConfig.desc?replace("\n","<br />")?replace("/n","<br />")!''}
                            </#if>
                        </div>
                        <div class="describe desshow2 hide">
                        <#--为了格式化描述所加-->
                            <#if carConfig.desc>${carConfig.desc?replace("\n","<br />")?replace("/n","<br />")!''}</#if>
                            <span class="updes">收起</span>
                        </div>
                    </div>
                <#--私人助理入口-->
                    <div class="assistC">
                    <#--fourshow  有没有四s记录 --><#--foursvin  如果有vin，就通过vin去查询 -->
                        <#if fourshow?? && fourshow!="">
                            <i class="assistpic assistpic1"></i>
                            <div class="assitext">
                                <p class="aText1">对车况不了解？</p>
                                <p class="aText2">查看车辆保养情况，确保车况无忧 &nbsp;<a href="/help/inquire_model.htm" target="_blank" class="checkModel" data-track="PC详情-4s模板">查看报告模板</a></p>
                            </div>
                            <span class="openassi" id="fours" data-track="4S查询">查看报告</span>
                        <#elseif foursvin?? && foursvin!="" && msg == "success">
                            <i class="assistpic assistpic1"></i>
                            <div class="assitext">
                                <p class="aText1">4S店维修保养记录查询</p>
                                <p class="aText2">想了解详细车况？看看车辆保养维修记录，确保车况无忧&nbsp;<a href="/help/inquire_model.htm" target="_blank" class="checkModel" data-track="PC详情-4s模板">查看报告模板</a></p>
                            </div>
                            <span class="openassi" id="fours" data-track="4S查询">立即查询</span>
                        <#else>
                            <i class="assistpic assistpic2"></i>
                            <div class="assitext">
                                <p class="aText1">对车辆感兴趣？</p>
                                <p class="aText2">私人助理帮您砍价，协助您完成交易！</p>
                            </div>
                            <span class="openassi" id="assistant" data-track="私人助理">立即开通</span>
                        </#if>
                    </div>
                <#--私人助理入口 end -->
                    <div class="Detail" id="DDetail2">
                        <h4 class="Detail_title">
                            <span class="ilogo lt">车辆图片</span>
                        </h4>
                        <div id="detail_pic">
                            <#if photo ??>
                                <#list photo as bigpic>
                                    <p class="detail_pic">
                                        <img data-original="${(common_func.getCarPic(bigpic))!''}"
                                             src="${(common_func.getCarPic(bigpic))!''}" alt="${(simCar.title+'图片')!''}"/>
                                    </p>
                                </#list>
                            </#if>
                        </div>
                    <#-- <div class="describe">
                         <span> 对车辆感兴趣？ <br/>马上联系车主，说出您的心理价位！</span>
                         <div class="right">
                                  <span>${(user.phone)!''}&nbsp;&nbsp;
                                     <#if user.mobile ?? && user.mobile!="" && user.phone!=user.mobile>
                                     ${(user.mobile)!''}
                                     </#if></span>
                             <a class="tool_yuyue"  data-track="底价帮手">底价帮手</a>
                         </div>
                     </div>-->
                        <!--赞-->
                        <!--<div style="display:block;" id="zan" class="zan">${dianzan}</div>
                        <div style="display:none;" id="zan_od" class="zan_od">${dianzan}</div>-->
                        <!--赞-->
                    </div>
                <#--评价-->
                    <#if user.website?? && user.website?index_of('vip')!=-1>
                        <#if onereviewlist??>
                            <div class="comment">
                                <h4 class="Detail_title">
                                    <span class="ilogo lt">评价（${onereviewlist.size}）</span>
                                </h4>

                                <div class="commentbox">
                                    <div class="commentinfo">
                                        <img src="${common_func.getUserPic(onereviewlist.userphoto)}" class="headimg"/>
                                        <span class="commentcompany">${onereviewlist.uername}</span>
                                        <span class="commenttime">${onereviewlist.create_time}</span>
                                    </div>
                                    <div class="commentgrade">
                                        <#assign grade = onereviewlist.score?number?int>
                                        <#list 1..grade as list>
                                            <span class="mostar showstar"></span>
                                        </#list>
                                        <#assign lost = 5 - grade>
                                        <#if lost != 0 >
                                            <#list 1..lost as list>
                                                <span class="mostar"></span>
                                            </#list>
                                        </#if>
                                        <span class="gradenum">${onereviewlist.score}分</span>
                                    </div>
                                    <p class="commentdes">${onereviewlist.comment}</p>
                                </div>
                                <div class="showmore" data-track="PC详情页-查看评价">查看全部评价</div>

                            </div>
                        <#else>
                            <div class="comment">
                                <h4 class="Detail_title">
                                    <span class="ilogo lt">评价（0）</span>
                                </h4>

                                <div class="nocomment">
                                    <img src="${staticServer}/web/dist/static/gbpage/images/cardetail/nocomment.png" />
                                    <p class="nocommenttext">还没有人对商家进行评价，您的评价将第一时间被其他人看到哦！</p>
                                    <div class="commentbtn" data-track="PC详情页-马上评价">马上评价</div>
                                </div>

                            </div>
                        </#if>
                    </#if>
                <#--咨询低价 start -->
                <#--<#if user.personcar != 1>
                <div class="consult">
                    <#if simCar.getSmallPicList("400_300")?? && simCar.getSmallPicList("400_300")?size gt 0>
                        <#list simCar.getSmallPicList("400_300") as pic>
                            <img src="${(common_func.getCarPic(pic))!''}">
                            <#break>
                        </#list>
                    <#else>
                        <img src="${staticServer}/web/dist/static/car/images/car.jpg"/>
                    </#if>
                    <div class="right">
                        <div class="des_car_info">
                            <h4>
                                【${(common_func.formatLocation(simCar.shortAreaName))!''}】${(simCar.usedate)!''}&nbsp;${(simCar.title)!''}&nbsp;<#if car.color?exists && car.color !='10'>${(webutil.getCarColor(car.color))!''}</#if>&nbsp;<#if car.carAuto?exists>${(common_func.renderAuto(car.carAuto))!''}</#if>
                            </h4>
                            <div>
                                <p>
                                    车主报价：
                                    <#if simCar.money==0 || simCar.money=='' || simCar.money=='面议'>
                                        <span class="bigFont">面议</span>
                                    <#else>
                                        <#if carpf?? && carpf!="">
                                            <#if isNoCar==null && isNoCar!=2>
                                                面议
                                            <#else>
                                            ${(common_func.formatPrice(simCar.tradePrice))?replace('万','')!''}
                                            </#if>
                                        <#else>
                                            ${simCar.money !'面议'}
                                        </#if>万
                                    </#if>
                                </p>
                                <div class="light">对价格不满意？</div>
                            </div>
                        </div>
                        <a class="tool_yuyue" data-track="底价帮手">底价帮手</a>
                    </div>
                </div>
                </#if>-->

                <#--我要砍价 start -->
                    <#if user.personcar != 1>
                        <div class="consult">
                            <#if simCar.getSmallPicList("400_300")?? && simCar.getSmallPicList("400_300")?size gt 0>
                                <#list simCar.getSmallPicList("400_300") as pic>
                                    <img src="${(common_func.getCarPic(pic))!''}">
                                    <#break>
                                </#list>
                            <#else>
                                <img src="${staticServer}/web/dist/static/car/images/car.jpg"/>
                            </#if>
                            <div class="right">
                                <div class="des_car_info">
                                    <h4>
                                        【${(common_func.formatLocation(simCar.shortAreaName))!''}】${(simCar.usedate)!''}&nbsp;${(simCar.title)!''}&nbsp;<#if car.color?exists && car.color !='10'>${(webutil.getCarColor(car.color))!''}</#if>&nbsp;<#if car.carAuto?exists>${(common_func.renderAuto(car.carAuto))!''}</#if>
                                    </h4>
                                    <p class="text">对价格不满意？<span>90%</span>的车主接受议价哦！</p>
                                </div>
                                <div class="ri_right">
                                    <div class="pri_cont text_cont">
                                        <p class="text1">卖家报价</p>
                                    <#--<p class="text2">16.4万</p>-->
                                        <#if simCar.money==0 || simCar.money=='' || simCar.money=='面议'>
                                            <span class="text2 bigFont">面议</span>
                                        <#else>
                                            <span class="text2 bigFont">
                                                <#if carpf?? && carpf!="">
                                                    <#if isNoCar==null && isNoCar!=2>
                                                        面议
                                                    <#else>
                                                        ￥${(common_func.formatPrice(simCar.tradePrice))?replace('万','')!''}万
                                                    </#if>
                                                <#else>
                                                    ￥${simCar.money !'面议'}万
                                                </#if>
                                    </span>
                                        </#if>
                                    </div>
                                    <div class="pri_cont pri_val_cont">
                                        <input type="text" class="price" placeholder="输入您的心理价位" />
                                        <span>万</span>
                                    </div>
                                    <dvi class="pri_cont price_btn" id="WBook3" data-track="我要砍价">我要砍价</dvi>
                                </div>
                            </div>
                        </div>
                    </#if>
                <#--我要砍价 end-->

                    <!--地图-->
                    <div class="Map" id="DMap" style="display:none;"></div>
                    <!--地图-->

                    <!--价格走势-->
                    <!--<div class="Tend" id="DTend" style="display:block;">
                      <div class="TCharts" id="TCharts"></div>
                      <p id="info" style="margin-top:20px;"></p>
                    </div>-->
                    <!--价格走势-->


                </div>
            </#if>

            <#if datediff ?? && datediff ==0 >
                <#if user.personcar != 1 && (carlist?exists ||clickCarList?exists)>
                    <div class="Boutique_title">
                        <span class="wdck on" lang="#wdck"><span>他的车库</span></span>
                    </div>
                    <div class="tj_cars" style="display: block;" id="wdck">
                        <ul>
                            <#if carlist?exists>
                                <#list carlist as simcar>
                                    <#if simcar_index  lt 8>
                                        <li class="carlog" data-id="${(simcar.id)}" data-position="detailGarage">
                                            <a target="_blank" href="${(contextPath)}/details/${(simcar.id)}?style=8-0-1">
                                                <img src="${(common_func.getCarPic(simcar.getFirstSmallPic("400_300")))!''}"
                                                     alt="${(simcar.title+'图片')!''}"></a>
                                            <p class="title"><a target="_blank" href="${(contextPath)}/details/${(simcar.id)}"
                                                                title="[${(common_func.formatLocation(simcar.shortAreaName))!''}]&nbsp;${(simcar.usedate)!''}&nbsp;${(simcar.title)!''}">${(simcar.usedate)!''}
                                                &nbsp;${(simcar.title)!''}</a></p>
                                            <p>
                                            <span class="jiage">￥<span
                                                    class="bigFont">${(common_func.formatPrice(simcar.money))?replace("万",'')!''}</span> 万</span>
                                                <span class="diqu">${(common_func.formatLocation(simcar.shortAreaName))!''}</span>
                                            </p>
                                        </li>
                                    </#if>
                                </#list>
                            <#elseif clickCarList?exists>
                                <#list clickCarList as simcar>
                                    <li class="carlog" data-id="${(simcar.id)}">
                                        <a target="_blank" href="${(contextPath)}/details/${(simcar.id)}">
                                            <img src="${(common_func.getCarPic(simcar.getFirstSmallPic("400_300")))!''}"
                                                 alt="${(simcar.title+'图片')!''}"></a>
                                        <p class="title"><a target="_blank" href="${(contextPath)}/details/${(simcar.id)}"
                                                            title="[${(common_func.formatLocation(simcar.shortAreaName))!''}]&nbsp;${(simcar.usedate)!''}&nbsp;${(simcar.title)!''}">${(simcar.usedate)!''}
                                            &nbsp;${(simcar.title)!''}</a></p>
                                        <p>
                                            <span class="diqu">${(common_func.formatLocation(simcar.areaName))!''}</span>
                                            <span class="jiage">￥<span
                                                    class="bigFont">${(common_func.formatPrice(simcar.money))?replace('万','')!''}</span> 万</span>
                                        </p>
                                    </li>
                                </#list>
                            </#if>
                        </ul>
                        <div class="clear"></div>
                        <a href="${contextPath}/profile/${(user.id)!''}<#if actmobile??>/?actMobile=${actmobile}</#if>"
                           class="tj_cars_b" target="_blank">查看他的车库</a>
                    </div>
                </#if>
                <input type="hidden" name="oldSta" id="oldSta" value="1"/>
                <div class="selectBox">
                    <div class="Boutique_titles Boutique_title">
                        <span class="tpp on" lang="#tpp"><span>同品牌车源</span></span>
                        <span class="txh" lang="#txh"><span>同型号车源</span></span>
                        <span class="tnf" lang="#tnf"><span>同年份车源</span></span>
                        <span class="tjg" lang="#tjg"><span>同价位车源</span></span>
                    </div>
                    <div class="tj_cars" id="tnf">
                        <ul></ul>
                        <div class="clear"></div>
                        <a href="/quanguo/soa1y${caruseyear!'0'}-${caruseyear!'0'}" class="tj_cars_b tnf_a" target="_blank">更多同年份好车</a>
                    </div>
                    <div class="tj_cars" id="tpp" style="display: block;">
                        <ul></ul>
                        <div class="clear"></div>
                        <#if carBigSerPinYin ??>
                            <#assign brandpinyin = '/'+ carBigSerPinYin.dirname>
                            <#assign tbrand = 't' + carBigSerPinYin.id>
                            <#if carSerPinYin ??>
                                <#assign brandpinyin = '/'+ carBigSerPinYin.dirname + '/' +carSerPinYin.dirname>
                                <#assign tbrand = 't' + carSerPinYin.id>
                            </#if>
                        </#if>
                    <#--<a href="/quanguo/soa1?keyword=${(common_func.encoder(carSerial))!''}" class="tj_cars_b tpp_a" target="_blank">更多同品牌好车</a>-->
                        <a href="/quanguo${brandpinyin!''}/soa1${tbrand!''}" class="tj_cars_b tpp_a" target="_blank">更多同品牌好车</a>
                    </div>
                    <div class="tj_cars" id="tjg">
                        <ul></ul>
                        <div class="clear"></div>
                    <#--<a href="/quanguo/soa1?keyword=${(common_func.encoder(carSerial))!''}&startPrice=${webutil.getPrice(car.money,1)}&endPrice=${webutil.getPrice(car.money,2)}" class="tj_cars_b tjg_a" target="_blank">更多同价格好车</a>-->
                        <a href="/quanguo/soa1j${webutil.getPrice(car.money,1)}-${webutil.getPrice(car.money,2)}"
                           class="tj_cars_b tjg_a" target="_blank">更多同价格好车</a>
                    </div>
                    <div class="tj_cars" id="txh">
                        <ul></ul>
                        <div class="clear"></div>
                        <a href="/quanguo/soa1?keyword=${(common_func.encoder(carSerial))!''}<#if car.brandStr ?? && car.brandStr !=''>${(common_func.encoder((car.brandStr)))!''}<#else>${(common_func.encoder((carTitle)))!''}</#if>"
                           class="tj_cars_b txh_a" target="_blank">更多同型号好车</a>
                    </div>
                </div>
            </#if>
        </div>

        <div class="cardetailR">
            <div class="cardetailR_Hostcars">
                <p class="TAtitle">
                    推荐车辆
                </p>
                <ul class="tj_cars" style="width:auto;">
                <#if cars?exists>
                    <#list cars as simcar>
                        <li class="carlog" data-id="${(simcar.id)}" data-position="detailRight">
                            <a target="_blank" href="${(contextPath)}<#if simcar.bidding ?? && simcar.bidding==1>${(webutil.biddingPath(simcar.id))}<#else>${(webutil.detailsPath(simcar.id))}</#if>">
                                <img src="${(common_func.getCarPic(simcar.getFirstSmallPic("400_300")))!''}"
                                     alt="${(simcar.title+'图片')!''}"></a>
                            <p class="title"><a target="_blank" href="${(contextPath)}<#if simcar.bidding ?? && simcar.bidding==1>${(webutil.biddingPath(simcar.id))}<#else>${(webutil.detailsPath(simcar.id))}</#if>"
                                                title="[${(common_func.formatLocation(simcar.areaName))!''}]${(simcar.title)!''}">${(simcar.title)!''}</a>
                            </p>
                            <p>
                                <span class="diqu">${(common_func.formatLocation(simcar.areaName))!''}</span>
                                <span class="jiage">￥<span
                                        class="bigFont"><#if simcar.money ?? && simcar.money?length gt 5>${(common_func.formatPrice(simcar.money?substring(0,5))?replace('万',''))!''}<#else>${(common_func.formatPrice(simcar.money))?replace('万','')!''}</#if></span> 万</span>
                            </p>
                        </li>
                    </#list>
                </#if>

                </ul>
            </div>
        </div>
    </div>

    <div class="clear"></div>
</div>

    <#--右侧导航-->
    <@index_macro.rightNav/>
        <input id="chattarget" type="hidden" value=""/>
        <#if webutil.getCookieUser()?? && webutil.getCookieUser().flag==1 >
            <input id="cookieuser" type="hidden" value="${webutil.getCookieUser().id}"/>
        </#if>
        <div class="cheliao" id="cheliao" style="display:none;">
            <div class="cheliao_title">
                <div class="cheliao_titleL">
                    <#--<span class="on_line">在线</span>-->
                    <span id="targetInfo"></span>
                </div>
                <div class="cheliao_titleR">
                    <#--<span class="cheliao_mini" title="最小化" onclick="chatWindowClose();">&nbsp;</span>-->
                    <span class="cheliao_close" title="关闭" onclick="chatWindowClose();">&nbsp;</span>
                </div>
            </div>
            <div class="cheliaoL">
                <div class="message">
                    <div class="car" id="chatCar">

                    </div>
                    <div class="chatcont" id="chatMessage">

                    </div>
                </div>
                <div class="import">
                    <#--<div class="import_title">使用华夏APP签订电子合同，成交更方便快捷!<span>&gt;&gt;</span></div>-->
                    <div class="import_title"><p class="ssendBtn">快速发送 <i></i></p></div>
                    <div class="zidongInfo hidden">
                        <p>您好！车子最低价多少？</p>
                        <p>您好！车子还在吗？</p>
                        <p>好的，谢谢！</p>
                    </div>
                    <div class="import_cont"><textarea id="chattext" placeholder="点击输入您想询问的问题..."></textarea></div>
                </div>
                <div class="dowload">

                    <div class="dowloadL">
                        <p class="donwText"><a class="downappURL" target="_blank" href="/ads/hxapp.htm">下载华夏车聊手机端，随时查消息</a></p>
                        <p class="elehetong">使用华夏APP签订电子合同，成交更方便快捷!<span>&gt;&gt;</span></p>
                    </div>
                    <#--<div class="import_title">使用华夏APP签订电子合同，成交更方便快捷!<span>&gt;&gt;</span></div>-->
                    <div class="dowloadR"><a onclick="sendText();" class="dowloadR_icon">发 送</a></div>
                </div>
            </div>
            <div class="cheliaoR">
            </div>
        </div>
        <!-- 定制私人助理 弹框 -->
        <div class="assi_box">
            <div class="assi_title">
                <h2>定制私人助理</h2>
                <i class="icon close" id="close_assi"></i>
            </div>
            <ul>
                <li class="radio_li">
                    <input type="radio" id="assist" checked="checked" name="assist" value="协助了解车况">
                    <label name="assist" class="checked" for="assist">协助了解车况</label>
                </li>
                <li class="radio_li">
                    <input type="radio" id="assist2" name="assist" value="协助价格达成一致">
                    <label name="assist2" class="" for="assist2">协助价格达成一致</label>
                </li>
                <li class="radio_li">
                    <input type="radio" id="assist3" name="assist" value="协助交易">
                    <label name="assist3" class="" for="assist3">协助交易</label>
                </li>
                <li>
                    <input class="money" id="moeny" type="text" value="" oninput="value=value.replace(/[^(0-9)\.\.]/g,'')" placeholder="您期望的价格是" maxlength="18"/>
                    <span class="wan">万</span>
                </li>
                <li class="dis_li"><input type="tel" class="phoneNum" id="phoneNum" value=""
                                          onfocus="this.placeholder=''" onblur="this.placeholder='请输入手机号'"
                                          placeholder="请输入手机号"></li>
                <li class="dis_li">
                    <input class="inp_code validCode" id="validCode" type="text" name="" value="" placeholder="请输入图片验证码">
                    <img src="/servlet/yzCode.jpg" class="codePic pic_code" onclick="javascript:this.src='/servlet/yzCode.jpg?rnd=' + Math.random();"/>
                </li>
                <li class="dis_li"><input class="inp_code" id="phoneCodes" type="text" name="" value=""
                                          placeholder="请输入短信验证码">
                    <div class="button getPhoneCode" id="btn">获取验证码</div>
                </li>
                <li class="warnBox">
                    <div id="warn" class="warn">未填写</div>
                </li>
                <li class="apply" id="personalAssitant">
                    <button class="btn" type='button' id="assi_submit" data-track="PC私人助理-提交">申请助理</button>
                </li>
            </ul>
            <#--<p class="text">提交成功后，会有工作人员与您联系！</p>-->
        </div>
        <!-- 手机验证 -->
        <div class="verify">
            <div class="assi_title">
                <h2>手机验证<i class="line"></i></h2>
                <i class="icon close" id="verifyclose"></i>
            </div>
            <div class="assiTextCont">
                <p class="text">亲，您的手机号<span class="pho"> 15167167687 </span>还未开通个人会员哦</p>
                <p class="text">马上开通呼叫您的私人助理吧</p>
            </div>
            <div class="btn"><span class="open" data-track="pc-siren-vip-开通">马上开通</span><span class="re_login" data-track="pc-siren-vip-残忍拒绝">残忍拒绝</span></div>
        </div>
        <!-- 微信服务 -->
        <div class="wechat">
            <div class="assi_title">
                <h2>微信服务<i class="line"></i></h2>
                <i class="icon close" id="winXiclose"></i>
            </div>
            <p class="text">私人定制专享客服</p>
            <img class="weixin_codeimg" style="width:124px;height:124px;" src="">
            <#--<a class="look">查看个人会员权限</a>-->
            <p class="text2">您的私人助理已经定制成功，可以扫描直接联系我们！</p>
        </div>
        <!-- 个人会员 -->
        <div class="vip">
            <div class="assi_title">
                <h2>个人会员<i class="line"></i></h2>
                <i class="icon close" id="vipclose"></i>
            </div>
            <div class="buy_money">
                <p class="num" id="ao1" value="">购买号码：15167167687</p>
                <p class="months" value="299" id="vipMoney">299<i class="select_at"></i></p>
                <p class="member">年度会员</p>
                <a class="look">查看个人会员权限</a>
            </div>
            <div class="pay_way">
                <p class="way">请选择充值方式</p>
                <ol class="pay_con" id="zhifu">
                    <li class="select">
                        <p class="text1">微信</p>
                        <i class="select_at"></i>
                    </li>
                    <li class="" style="margin-left:25px;">
                        <p class="text1">支付宝</p>
                        <i class="select_at" style="display:none"></i>
                    </li>
                </ol>
            </div>
            <p class="recharge" id="openVip" data-track="pc-vip-立即充值">立即充值</p>
            <div id="service" class="Service" style="display: none;">
                <p><span>微信扫一扫支付</span><a id="wxclose">×</a></p>
                <img src="https://www.hx2car.com/servlet/WeChatQr.jpg?QRurl=weixin://wxpay/bizpayurl?pr=h39Fmhe"
                     id="wechatpay" width="157" height="157">
            </div>
        </div>

        <!-- 个人会员特权 -->
        <div class="personalNote" style="display:none;">
            <div class="pCenter">
                <div class="assi_title">
                    <h2>个人会员特权<i class="line"></i></h2>
                    <i class="icon close" id="memberInfo"></i>
                </div>
                <span class="cTitle">客户端特权</span>
                <div class="per_cont1">
                    <div class="pIntroduce">
                        <span class="iLeft">功能</span>
                        <span class="iCenter">普通用户</span>
                        <span class="iRight">个人会员</span>
                    </div>
                    <div class="pWhite">
                        <span class="iLeft">客户端4S保养记录查询</span>
                        <span class="iCenter">29元</span>
                        <span class="iRight">每次查询立减1元</span>
                    </div>
                    <div class="pWhite phui">
                        <span class="iLeft">客户端违章查询</span>
                        <span class="iCenter">每日5次</span>
                        <span class="iRight">每日20次</span>
                    </div>
                    <div class="pWhite">
                        <span class="iLeft">客户端车辆详情页</span>
                        <span class="iCenter">展示零售价、新车价</span>
                        <span class="iRight">展示批发价、零售价、收购参考价、 4S店新车底价、库存时间、预约批发</span>
                    </div>
                    <div class="pWhite phui">
                        <span class="iLeft">客户端华夏信用查询</span>
                        <span class="iCenter">不支持</span>
                        <span class="iRight">可查询对方的身份信息、公司信息、信用情况</span>
                    </div>
                    <div class="pWhite">
                        <span class="iLeft">客户端3000积分兑换4S查询券</span>
                        <span class="iCenter">每天可获得1000分</span>
                        <span class="iRight">每天可获得1500分，完成积分任务，积分翻倍</span>
                    </div>
                    <div class="pWhite phui">
                        <span class="iLeft">彰显身份的尊贵会员标识</span>
                        <span class="iCenter">普通昵称</span>
                        <span class="iRight">红色尊贵昵称，独特VIP后缀</span>
                    </div>
                    <div class="pWhite">
                        <span class="iLeft">查看批发车辆</span>
                        <span class="iCenter">不支持</span>
                        <span class="iRight">可查看批发车辆</span>
                    </div>
                </div>
                <!-- <span class="pTitle">个人会员特权</span> -->
                <span class="cTitle ptop">网页版特权</span>
                <div class="per_cont2">
                    <div class="pIntroduce">
                        <span class="iLeft">功能</span>
                        <span class="iCenter">普通用户</span>
                        <span class="iRight">个人会员</span>
                    </div>
                    <div class="pWhite">
                        <span class="iLeft">查看批发车辆</span>
                        <span class="iCenter">不支持</span>
                        <span class="iRight">可查看批发车辆</span>
                    </div>
                    <div class="pWhite phui">
                        <span class="iLeft">彰显身份的尊贵会员标识</span>
                        <span class="iCenter">无</span>
                        <span class="iRight">尊贵的个人VIP标识</span>
                    </div>
                </div>
                <span class="pClose">关闭</span>
            </div>
        </div>

        <script type="text/javascript"
                src="https://api.map.baidu.com/api?v=2.0&ak=044045f8467dd77bace4b173ef75f868"></script>
        <script type="text/javascript"
                src="${staticServer}/web/dist/static/gbpage/js/baidumap.js"></script>
        <link rel="stylesheet"
              href="${staticServer}/web/dist/static/gbpage/css/baidumap.css"/>
        <#--推广支付弹框 start-->
        <div class="tgPayModel hide">
            <div class="modelss"></div>
            <div class="myModel tgPayCont">
                <div class="title">
                    <span class="payText1">置顶支付</span>
                    <span class="payText2 hide">推广支付</span>
                    <i class="close closePayBox"></i>
                </div>
                <div class="payBox">
                    <div class="over">
                        <span class="stitle fl">支付金额：</span>
                        <div class="sfr fcolor fl">
                            ￥<span class="money" id="omoney2">200</span> 华币
                        </div>
                    </div>
                    <p class="tgText">（华币不足，需充值<span class="fcolor" id="money2">100</span>华币）</p>
                    <div class="over">
                        <span class="stitle fl">支付方式：</span>
                        <div class="sfr fl">
                            <div class="optionWay">
                                <span class="wixin select"><i></i></span>
                                <span class="ali"><i></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="boxss">
                        <div class="wxpay_sub">
                            <div id="codeImg2"></div>
                            <div class="textBox">
                                <i class="fl"></i>
                                <div class="fl">
                                    <p>请使用微信<span class="fcolor">扫一扫</span></p>
                                    <p>扫描二维码支付</p>
                                </div>
                            </div>
                        </div>
                        <div class="alipay_submit hide">
                            确定支付
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <#--推广支付弹框 -->

        <#--本地置顶 & 全站推广 -->
        <div class="tgTopCont hide">
            <#if (isShowBDZD?? && isShowBDZD == 1) || (isShowTGB?? && isShowTGB ==1)>
                <#--改成添加hide。是因为地区推广。isShowBDZD==1时。不一定会显示。开始购买日期必须是当前日期的后一天才显示。无奈-->
                <div class="tgcontModel <#--<#if (isShowBDZD?? && isShowBDZD != 1) && (isShowTGB?? && isShowTGB !=1) >hide</#if>-->">
                    <div class="tgmodel"></div>
                    <div class="tgBox">
                        <div class="tgCont fl">
                            <#if isShowBDZD?? && isShowBDZD == 1>
                            <#--本地置顶-->
                                <div class="tgC tgC1">
                                    <span class="fl tgTitle">本地<br>置顶</span>
                                    <div class="fl tgOptionCont">
                                        <p class="tgText1">马上使用推广，<span class="fcolor" id="startTime"></span> 到 <span class="fcolor" id="endTime"></span> 在 <span class="fcolor">${(common_func.formatLocation(simCar.shortAreaName))!''}</span> 置顶，为您的 <span class="fcolor">${TwoBrand!''}</span> 在带来巨大流量</p>
                                        <ul class="tgOptions">
                                            <li class="select" data-time="1" data-money="100" data-track="pc-detail-本地推广">
                                                <p class="pText1 day">1天</p>
                                                <p class="pText2 money">￥100华币</p>
                                            </li>
                                            <li data-time="3" data-money="288" data-track="pc-detail-本地推广">
                                                <p class="pText1 day" data-time="1">3天</p>
                                                <p class="pText2 money">￥288华币</p>
                                            </li>
                                            <li data-time="5" data-money="450" data-track="pc-detail-本地推广">
                                                <p class="pText1 day">5天</p>
                                                <p class="pText2 money">￥450华币</p>
                                            </li>
                                            <li data-time="7" data-money="590" data-track="pc-detail-本地推广">
                                                <p class="pText1 day">7天</p>
                                                <p class="pText2 money">￥590华币</p>
                                            </li>
                                            <li data-time="15" data-money="1200" data-track="pc-detail-本地推广">
                                                <p class="pText1 day">15天</p>
                                                <p class="pText2 money">￥1200华币</p>
                                            </li>
                                            <li data-time="30" data-money="2299" data-track="pc-detail-本地推广">
                                                <p class="pText1 day">30天</p>
                                                <p class="pText2 money">￥2299华币</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="fl payMoney">
                                        <p class="pageBtn"><em class="on" data-track="pc-detail-本地置顶-入口"></em><em data-track="pc-detail-全站推广-入口"></em></p>
                                        <p class="pText1">支付金额：<span class="fcolor">￥<span class="moneyTotal moneyTotal1">100</span> <span class="pText3">华币</span></span></p>
                                        <p class="pText2 hide">（华币不足，请充值<span class="fcolor payMOney1">100</span>华币）</p>
                                    </div>
                                    <span class="fr btns" id="openzd">马上置顶</span>
                                </div>
                            </#if>

                            <#if isShowTGB?? && isShowTGB == 1>
                            <#--全站推广-->
                                <div class="tgC tgC2 <#if isShowBDZD?? && isShowBDZD == 1>hide</#if>">
                                    <span class="fl tgTitle">全站<br>推广</span>
                                    <div class="fl tgOptionCont">
                                        <p class="tgText1">马上为您的 <span class="fcolor">${TwoBrand!''}</span>进行全站推广，<span class="fcolor" id="des">15天全网推广，预计产生30个以上的销售机会：</span></p>
                                        <ul class="tgOptions"></ul>
                                    </div>
                                    <div class="fl payMoney">
                                        <p class="pageBtn"><em class="on" data-track="pc-detail-本地置顶-入口"></em><em data-track="pc-detail-全站推广-入口"></em></p>
                                        <p class="pText1">支付金额：<span class="fcolor">￥<span class="moneyTotal moneyTotal2">750</span> <span class="pText3">华币</span></span></p>
                                        <p class="pText2 hide">（华币不足，请充值<span class="fcolor payMOney2">100</span>华币）</p>
                                    </div>
                                    <span class="fr btns" id="opentg">马上推广</span>
                                </div>
                            </#if>
                        </div>
                        <#if (isShowBDZD?? && isShowBDZD == 1) && (isShowTGB?? && isShowTGB ==1)>

                            <div class="pageBtnBox">
                                <p class="pageBtn"><em class="on" data-track="pc-detail-本地置顶-入口"></em><em data-track="pc-detail-全站推广-入口"></em></p>
                            </div>
                        </#if>
                        <div class="colseBox">
                            <i class="colseBtn iconfont icon-cha"></i>
                        </div>
                    </div>
                </div>
            </#if>
        </div>
        <#--本地置顶 & 全站推广 end -->

        <#if datediff ?? && datediff ==0 >
        <div class="title Float" id="car_top" style="display:none;">
            <div class="topContent <#if (isShowBDZD?? && isShowBDZD == 1) || (isShowTGB?? && isShowTGB ==1) >hide</#if>">
                <div class="Float_lianxi">
                    <div class="Float_lianxiL">
                        <p class="c_Title">
                            <#--新加的关注按钮-->
                            <#--<span class="sc conllects_btn" id="ssscc" lang="${(simCar.id)!''}" car_name="${(common_func.formatLocation(simCar.shortAreaName))!''}${(simCar.usedate)!''}&nbsp;${(simCar.title)!''}" car_lang="${(common_func.formatPrice(simCar.money))!''}"  data-track="关注"><i class="nocollepic"></i></span>
                            <span class="isCollect" style="display: none;"><i class="iscollepic"></i></span>-->
                            <#--新加的关注按钮 end-->
                            【${(common_func.formatLocation(simCar.shortAreaName))!''}】${(simCar.usedate)!''}&nbsp;${(simCar.title)!''}&nbsp;
                            <#--<#if car.color?exists && car.color !='10'>${(webutil.getCarColor(car.color))!''}</#if>&nbsp;-->
                            <#if car.carAuto?exists>${(common_func.renderAuto(car.carAuto))!''}</#if>
                        </p>
                        <p class="tel">联系人： <em class="name">${(user.username)!''}</em>
                            <#--${(user.phone)!''}&nbsp;&nbsp;-->
                            <#if user.ourselfphone?? && user.ourselfphone == 1>
                                <span class="getNum">
                                    ${user.phone!''}
                                        <#if user.mobile?? && user.phone != user.mobile>
                                            &nbsp;${user.mobile!''}
                                        </#if>
                                </span>
                            <#elseif webutil.getUserLoginStatus() == '1'>
                                <span class="look_num getNum num" data-track="PC详情页-查看电话">点击查看联系方式&nbsp;</span>
                            <#else>
                                <span class="getNum freeNum num" data-track="PC详情页-查看电话">
                                    点击查看联系方式&nbsp;
                                </span>
                            </#if>
                            <span class="numText">(提示：及时拨打电话，以免电话失效)</span>

                            <#--<#if webutil.getUserLoginStatus() == '0'>
                                <i class="num goLoginBtn">登录并查看电话</i>
                            </#if>-->
                            <#--任何时候，必须登录才可以查看电话-->
                            <#--<#if webutil.getUserLoginStatus() == '1'>
                                <i class="num">11111111</i>
                            <#else>&lt;#&ndash;data-num="${(user.phone)!''}"&ndash;&gt;
                                <i class="look_num num" data-track="查看联系方式">登录并查看电话</i>
                            </#if>-->
                            <#--<#if user.mobile ?? && user.mobile!="" && user.phone!=user.mobile> ${(user.mobile)!''}-->
                            <#--</#if>-->
                        </p>
                    </div>
                    <div class="right"style="float:right;">
                        <div class="moneyBox <#if user.personcar == 1>sp</#if>">
                                <p>车主报价</p>
                                <#if newtrade?? && newtrade!='' && newtrade!="未知">
                                    <span class='cf60'>
                                <#else>
                                    <span class='cf60  db'>
                                </#if>
                                <#if simCar.money==0 || simCar.money=='' || simCar.money=='面议'>
                                    <span class="bigFont">面议</span>
                                <#else>
                                    ￥ <span class="bigFont"><#if carpf?? && carpf!=""><#if isNoCar==null && isNoCar!=2>
                                    面议<#else>${(common_func.formatPrice(simCar.tradePrice))?replace('万','')!''}</#if><#else>${simCar.money !'面议'}</#if></span>
                                    万
                                </#if>
                            </span>
                            <br class="clear"/>
                            <#--<div>-->
                                <#--<#if carConfigure ?? && carConfigure!=""&& carConfigure.guide_price ?? && carConfigure.guide_price!="" && carConfigure.guide_price!="未知">-->
                                    <#--新车指导价：${carConfigure.guide_price!''}万-->
                                <#--<#else>-->
                                    <#--<#if newtrade?exists>-->
                                        <#--<#if newtrade!="未知" && newtrade!="0">-->
                                    <#--新车指导价：${newtrade}万-->
                                        <#--</#if>-->
                                    <#--</#if>-->
                                <#--</#if>-->
                            <#--</div>-->
                        </div>
						<#if user.personcar != 1>
	                        <#if !carpf?? || carpf=="">
	                        <div class="Float_lianxi_price">
	                            <input type="text" class="price" placeholder="输入您的心理价位">
	                            <span class="wan">万</span>
	                        </div>
	                        </#if>
	                        <#if carpf?? && carpf!="">
	                            <div class="Float_lianxiR" id="yypifa2" data-track="预约批发">预约批发</div>
	                        <#else>
	                            <div class="Float_lianxiR" id="WBook2" data-name="我要砍价" data-track="我要砍价">我要砍价</div>
	                        </#if>
	                        <#--<div class="Float_lianxiRs tool_yuyue" data-track="底价帮手">底价帮手</div>-->
                    	</#if>
                    </div>

                </div>
            </div>
        </div>
        </#if>

        <div class="costModel myModel hide">
            <div class="title">
                <span>价格趋势</span>
                <i class="close"></i>
            </div>
            <div class="Tend" id="DTend" style="display:block;">
            	<div id="info" style="margin-bottom:20px;"></div>
                <div class="TCharts" id="TCharts"></div>
                
                <!--<p class="addTextShow">本数据由<span>沙僧估价</span>提供数据支持</p>-->
                <div class="qspinggu" data-track="PC详情页-价格-评估">免费评估车辆</div>
            </div>
        </div>
        <div class="myModel model-4s hide">
            <div class="title">
                <span>4s报告</span>
                <i class="close"></i>
            </div>
        <#--4s查询记录详情-->
            <div class="inquire_detail" id="other_infor6" style="display:none;">
                <div class="list">
                    <div class="list_title"></div>
                    <ul class="cont1">
                        <li id="vin"><span class="L">VIN</span></li>
                        <li id="notify_time"><span class="L">查询日期</span></li>
                        <li id="cartype"><span class="L">车型</span></li>
                        <li id="number"><span class="L">事故维修次数</span></li>
                        <li id="last_time"><span class="L">最后入店</span></li>
                        <li id="total_mileage"><span class="L">公里数</span></li>
                    </ul>
                    <div class="mp" style="display:none;" id="mppic"></div>
                </div>
                <div class="list" >
                    <div class="list_title">结果描述</div>
                    <div class="cont3"><pre id="description"></pre></div>
                </div>
                <div class="list">
                    <div class="list_title">原始档案报告</div>
                    <ul class="cont2" id="fourspic">
                    </ul>
                </div>
            </div>
        </div>
        <#if business??>
        <div class="myModel model-icbc hide">
            <div class="title">
                <span>工商认证信息</span>
                <i class="close"></i>
            </div>
            <div class="icbcBox ">
                <div class="icbc-list">企业名称：${business.qiyename!''}</div>
                <div class="icbc-list">注册号：${business.registration!''}</div>
                <div class="icbc-list">法人代表：${business.legalperson!''}</div>
                <div class="icbc-list">成立日期：${business.cltime!''}</div>
                <div class="icbc-list">注册资本：${business.zcmoney!''}</div>
                <div class="icbc-list">企业类型：${business.qiyetype!''}</div>
                <div class="icbc-list">登记机关：${business.djjg!''}</div>
                <div class="icbc-list">登记状态：${business.djflag!''}</div>
                <div class="icbc-list row1">注册地址：${business.address!''}</div>
                <div class="clear"></div>
                <div class="icbc-remark">
                    经营范围：${business.scope!''}
                </div>
            </div>

        </div>
        </#if>
        <div class="myModel model-wx hide">
            <div class="title">
                <span>手机浏览</span>
                <i class="close"></i>
            </div>
            <div class="codeBox">
                <div id="dCode">
                </div>

                <p>打开微信，点击底部的“发现”，<br/> 使用“扫一扫”即可将网页分享至朋友圈。</p>
            </div>
        </div>

        <div class="model_4s"></div>
        <!--新 4s查询 弹框-->
        <div class="myModel query_4s" id="loginBox" style="display:none;">
            <div class="title">
                <span>提交订单</span>
                <i class="close"></i>
            </div>
            <div class="content_4s">
                <p class="text">4S报告包括了该车的事故维修、正常保养记录。</p>
                <ul class="login_4s">
                    <li class=""><input type="tel" class="phoneNum" id="phone_4s" value="" placeholder="请输入您的手机号码">
                    </li>
                    <li class="dis_list">
                        <input class="inp_code validCode" id="valid_code" type="text" name="" value=""
                               placeholder="请输入图片验证码">
                        <img src="/servlet/yzCode.jpg" class="codePic imgcode"
                             onclick="javascript:this.src='/servlet/yzCode.jpg?rnd=' + Math.random();"/>
                    </li>
                    <li class="dis_list">
                        <input class="inp_code" id="phone_code" type="text" name="" value="" placeholder="请输入短信验证码">
                        <div class="button getPhoneCode" id="btn_code">获取验证码</div>
                    </li>
                    <li class="warn_li">
                        <p class="warn2">验证码错误！</p>
                    </li>
                    <li class="next_li">
                        <p class="next" id="next_query">下一步</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="myModel query_4s qur2" id="queryBox" style="display:none;">
            <div class="title">
                <span>提交订单</span>
                <i class="close"></i>
            </div>
            <div class="content_4s">
                <p class="text pxcartitle">${(simCar.title)!''}&nbsp;</p>
                <ul class="pay_query">
                    <li><span class="mch">支付金额：</span>
                        <div class="mcont money">￥<span id="money4s">${price!''}</span></div>
                    </li>
                    <li class="pay_way">
                        <span class="mch zf">支付方式：</span>
                        <div class="mcont payCont">
                        <#--<#if moneystatus == 'success'> &lt;#&ndash; 如果现金账户有钱，优先使用现金账户 &ndash;&gt;-->
                            <#--<ol class="pay_con" id="hxpay">-->
                                <#--<li class="one">-->
                                    <#--<p class="tstex tstex2">华夏现金账户</p>-->
                                    <#--<p class="tstex">余额支付</p>-->
                                    <#--<i class="select_at"></i>-->
                                <#--</li>-->
                            <#--</ol>-->
                            <#--<ol class="pay_con" id="payMoney" style="display:none;">-->
                                <#--<li class="weixin selectOn">-->
                                    <#--<i class="select_at"></i>-->
                                <#--</li>-->
                                <#--<li class="zhifubao">-->
                                    <#--<i class="select_at" style="display:none;"></i>-->
                                <#--</li>-->
                            <#--</ol>-->
                        <#--&lt;#&ndash;<span class="paytype"><#if moneystatus == 'success'>使用现金账户余额支付<#else>使用其他支付方式</#if></span>&ndash;&gt;-->
                            <#--<#if moneystatus == 'success'>-->
                                <#--<span class="paytype"> 使用其他支付方式</span>-->
                                <#--<span class="paytype" style="display:none;">使用现金账户余额支付</span>-->
                            <#--</#if>-->
                        <#--<#else>-->
                            <ol class="pay_con" id="payMoney">
                                <li class="weixin selectOn">
                                    <i class="select_at"></i>
                                </li>
                                <li class="zhifubao">
                                    <i class="select_at" style="display:none;"></i>
                                </li>
                            </ol>
                        <#--</#if>-->
                        </div>
                    </li>
                    <li class="ph">
                        <span class="mch">联系方式：</span>
                        <div class="mcont phN" id="phoN4s">${webutil.getLoginUserMobile()!''}</div>
                    </li>
                    <li class="sumBtnQuery" id="sumBtnQuery">付款</li>
                    <li class="zhifut"><span class="mch zhu">注：</span>
                        <div class="mcont zhuCont">订单查询成功后，会以短信形式通知您。若
                            该车辆您已提交查询，可以前往4S查询查看
                        </div>
                    </li>
                    <li class="jilu"><a href="/fours/get4sHistory.htm " target="_Blank">历史记录</a></li>
                </ul>
            </div>
        </div>

        <div class="myModel query_4s qur3" id="check" style="display:none;">
            <div class="title">
                <span>提交订单</span>
                <i class="close"></i>
            </div>
            <div class="content_4s">
                <i class="reSuce"></i>
                <P class="tex">订单支付成功，报告查询成功后，</P>
                <P class="tex">会以短信形式通知您！</P>
                <div class="btnCont"><a class="queryHist" href="/fours/get4sHistory.htm">查看历史记录</a><a class="closeCheck">关
                    闭</a></div>
            </div>
        </div>
        <!--4s查询 弹框 end-->
        <!--降价通知 弹框-->
        <div class="myModel app4s" id="app4s" style="display: none;">
            <div class="title">
            	<span>降价通知</span>
                <i class="close_refresh"></i>
            </div>
            <p class="tit">已经设置成功，车辆降价会通知您！</p>
            <div class="content_4sapp">
               <img src="${staticServer}/web/dist/static/gbpage/images/common/hx2carAppCode.png"/>
               <p>下载app</p>
               <p>车辆降价快速通知您</p>
            </div>
        </div>
        <!--降价通知 弹框 end-->
        
		<#--免费咨询回调弹框-->
		<div class="freebackbox">
			<div class="title">
				<span>免费咨询</span>
				<i class="close"></i>
			</div>
			<div class="freetext">
				<span class="text-icon"></span>
				<span class="text-txt">卖家会尽快与您联系，请耐心等待！</span>
			</div>
			<div class="recommendcarbox">
				<p class="rctitle">好车推荐</p>
				<div class="rmcarbox swiper-container">
					<div class="swiper-wrapper">
						<#if cars?exists>
		                <#list cars as simcar>
		                	<#if simcar_index%4==0>
		                		<ul class="swiper-slide">
		                	</#if>
		                    <li class="carlog" data-id="${(simcar.id)}" data-position="detailRight">
		                        <a target="_blank" href="${(contextPath)}<#if simcar.bidding ?? && simcar.bidding==1>${(webutil.biddingPath(simcar.id))}<#else>${(webutil.detailsPath(simcar.id))}</#if>">
		                            <img src="${(common_func.getCarPic(simcar.getFirstSmallPic("400_300")))!''}"
		                                 alt="${(simcar.title+'图片')!''}"></a>
		                        <p class="title"><a target="_blank" href="${(contextPath)}<#if simcar.bidding ?? && simcar.bidding==1>${(webutil.biddingPath(simcar.id))}<#else>${(webutil.detailsPath(simcar.id))}</#if>"
		                                            title="[${(common_func.formatLocation(simcar.areaName))!''}]${(simcar.title)!''}">${(simcar.title)!''}</a>
		                        </p>
		                        <p>
		                            <span class="diqu">${(common_func.formatLocation(simcar.areaName))!''}</span>
		                            <span class="jiage">￥<span
		                                    class="bigFont"><#if simcar.money ?? && simcar.money?length gt 5>${(common_func.formatPrice(simcar.money?substring(0,5))?replace('万',''))!''}<#else>${(common_func.formatPrice(simcar.money))?replace('万','')!''}</#if></span> 万</span>
		                        </p>
		                    </li>
		                    <#if (simcar_index+1)%4==0>
		                		</ul>
		                	</#if>
		                </#list>
			            </#if>
                	</div>
                	<span class="goleft"></span>
            		<span class="goright"></span>
				</div>
			</div>
			<div class="rmcarcomfire">关闭</div>
		</div>
        
        
        <#--电子合同-->
        <div class="myModel elecontract">
            <div class="title">
                <span>电子合同</span>
                <i class="close"></i>
            </div>
            <div class="elecontractBox">
                <p class="elecontText">电子合同是华夏APP推出的一个面向所有用户的便捷功能，目前仅限在华夏APP上使用。</p>
                <div class="elecontractCont">
                    <img class="djhtpic" src="${staticServer}/web/dist/static/gbpage/images/cardetail/djht1.png" alt="">
                    <div class="codeConts">
                        <img class="djhtpic2" src="${staticServer}/web/dist/static/gbpage/images/cardetail/hxappcode_ht.jpg" alt="">
                        <#--<p class="codetext">扫码下载华夏APP</p>-->
                        <div class="codeimg">
                            <i class="codeleft"></i>
                            <div class="coderight">
                                <p class="codetext">扫码下载</p>
                                <p class="codetext2">华夏APP</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <#--卖家-->
            <div class="elecontractCont2" style="display:none;">
                <img class="djhtpic" src="${staticServer}/web/dist/static/gbpage/images/cardetail/djht2.jpg" alt="">
                <div class="codeConts codeCont2">
                    <img class="djhtpic2" src="/servlet/appqrCode.jpg?carids=${simCar.id}&flag=1" alt="">
                    <div class="codeimg">
                        <i class="codeleft"></i>
                        <div class="coderight">
                            <p class="codetext">使用华夏APP扫码</p>
                            <p class="codetext2">直接创建电子合同</p>
                        </div>
                    </div>
                </div>
            </div>
            <#--此功能暂放-->
            <p class="chjbtn">我是卖家，我要快速创建合同！</p>
        </div>
        <#--电子合同 end-->

        <#--交易仲裁-->
        <div class="myModel arbitra">
            <div class="title">
                <span>交易仲裁</span>
                <i class="close"></i>
            </div>
            <div class="arbitrabox">
                <img class="zhcpic" src="${staticServer}/web/dist/static/gbpage/images/cardetail/jyzhcpic.png" alt="">
                <div class="arbitraApp">
                    <img src="/servlet/appqrCode.jpg?carids=${simCar.id}&flag=2" alt="">
                    <#--<p>扫码下载华夏APP</p>-->
                    <div class="codeimg">
                        <i class="codeleft"></i>
                        <div class="coderight">
                            <p class="codetext">使用华夏APP扫码</p>
                            <p class="codetext2">直接发起仲裁</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <#--交易仲裁 -->
        <#--收藏成功-->
        <div class="myModel model_collect_succ hidden">
            <div class="model_title">
                <div class="text">加入关注</div>
                <div class="close_btn"></div>
            </div>

            <div class="model_codeCont">
                <img src="${staticServer}/web/dist/static/gbpage/images/cardetail/hxappcode_ht.jpg" class="app_img">
                <div class="gzhText">
                    <h6>关注成功！</h6>
                    <p class="text1">扫码下载华夏APP</p>
                    <p class="text2">获取车辆最新报价</p>
                </div>
            </div>

            <div class="model_banner">
                <h3>猜你喜欢</h3>
                <div class="banner_cont">
                    <ul class="banner">
                    </ul>
                    <div class="btnleft"></div>
                    <div class="btnright"></div>
                </div>
            </div>

            <div class="model_content">
                <div class="btns">
                    <button class="look_collect">查看收藏</button>
                    <button class="cancel">继续浏览</button>
                </div>
            </div>
        </div>
        <#--收藏成功-->

        <!--新车配置开始-->
        <div class="NewcarModel myModel hide">
            <div class="title">
                <span>新车配置</span>
                <i class="close newCarClose"></i>
            </div>
            <div class="pztitle">
            ${(simCar.title)!''}
                <span class="qsdb TDuibi" data-track="PC详情页-配置-对比"><em>+</em>&nbsp;加入对比</span>
                <span class="qszx goLoginBtn getNum" data-track="PC详情页-配置-电话">电话咨询</span>
            </div>
            <div class="Newcar <#if carConfigure?exists>hasConfig</#if>" id="DNewcar" style="display:block;">
            <#if carConfigure?exists>
            <#--<p class="what_car hide">-->
            <#--厂家：<span>${carConfigure.vender}</span>品牌：<span>${carConfigure.brand}</span>车系：<span>${carConfigure.series}</span>车型：<span>${carConfigure.models}</span>年款：<span>${carConfigure.model_year}</span>-->
            <#--</p>-->
                <div class="NewcarNav">
                    <ul>
                        <li class="s1 hover"><i></i><span>基本参数</span></li>
                        <li class="s2"><i></i><span>发动机</span></li>
                        <li class="s3"><i></i><span>车身</span></li>
                        <li class="s4"><i></i><span>安全装备</span></li>
                        <li class="s5"><i></i><span>车轮制动</span></li>
                        <li class="s6"><i></i><span>操控配置</span></li>
                        <li class="s7"><i></i><span>外部配置</span></li>
                        <li class="s8"><i></i><span>多媒体配置</span></li>
                        <li class="s9"><i></i><span>灯光配置</span></li>
                        <li class="s10"><i></i><span>高科技配置</span></li>
                    </ul>
                </div>
                <div class="NewcarBox">
                    <div class="sizes s1">
                        <p class="sizes_title">基本参数</p>
                        <ul>
                            <li><b>销售名称：</b><span>${carConfigure.sales_name}</span></li>
                            <li><b>排放标准：</b><span>${carConfigure.emission_standard}</span></li>
                            <li><b>车辆类型：</b><span>${carConfigure.car_type}</span></li>
                            <li><b>车辆级别：</b><span>${carConfigure.car_level}</span></li>
                            <li><b>指导价格：</b><span>${carConfigure.guide_price}</span></li>
                            <li><b>上市年月：</b><span>${carConfigure.listed_year}-${carConfigure.listed_month}</span></li>
                            <li><b>生产年份：</b><span>${carConfigure.produce_year}</span></li>
                            <li><b>停产年份：</b><span>${carConfigure.stop_produce_year}</span></li>
                            <li><b>生产状态：</b><span>${carConfigure.produce_status}</span></li>
                            <li><b>销售状态：</b><span>${carConfigure.sales_staus}</span></li>
                            <li><b>国别：</b><span>${carConfigure.country}</span></li>
                            <li><b>国产/合资/进口：</b><span>${carConfigure.joint_venture}</span></li>
                        </ul>
                    </div>
                    <div class="sizes s2">
                        <p class="sizes_title">发动机</p>
                        <ul>
                            <li><b>排量（升）：</b><span>${carConfigure.displacement}</span></li>
                            <li><b>进气形式：</b><span>${carConfigure.intake_from}</span></li>
                            <li><b>燃油标号：</b><span>${carConfigure.fuel}</span></li>
                            <li><b>最大马力（ps）：</b><span>${carConfigure.max_hors}</span></li>
                            <li><b>最大扭矩（N·m）：</b><span>${carConfigure.max_torque}</span></li>
                            <li><b>气缸数(个)：</b><span>${carConfigure.number_cylinders}</span></li>
                            <li><b>每缸气门数（个）：</b><span>${carConfigure.valve_number}</span></li>
                            <li><b>工信部综合油耗：</b><span>${carConfigure.z_fuel_consumption}</span></li>
                            <li><b>市区工况油耗：</b><span>${carConfigure.city_fuel_consumption}</span></li>
                            <li><b>市郊工况油耗：</b><span>${carConfigure.suburb_fuel_consumption}</span></li>
                            <li><b>加速时间（0-100km/h）：</b><span>${carConfigure.acceleration_time}</span></li>
                            <li><b>最高车速：</b><span>${carConfigure.max_speed}</span></li>
                            <li><b>变速器描述：</b><span>${carConfigure.tran_desc}</span></li>
                            <li><b>档位数：</b><span>${carConfigure.stalls_num}</span></li>
                            <li><b>前悬挂类型：</b><span>${carConfigure.front_suspen_type}</span></li>
                            <li><b>后悬挂类型：</b><span>${carConfigure.back_suspen_type}</span></li>
                            <li><b>助力类型：</b><span>${carConfigure.power_type}</span></li>
                            <li><b>最小离地间隙：</b><span>${carConfigure.min_clearance}</span></li>
                            <li><b>最小转弯半径：</b><span>${carConfigure.min_turning_raduis}</span></li>
                            <li><b>驱动方式：</b><span>${carConfigure.drive_model}</span></li>
                            <li><b>驱动形式：</b><span>${carConfigure.drive_from}</span></li>
                        </ul>
                    </div>
                    <div class="sizes s3">
                        <p class="sizes_title">车身</p>
                        <ul>
                            <li><b>长/宽/高(MM)：</b><span><#if carConfigure.long_s??> ${carConfigure.long_s}x${carConfigure.width_s}x${carConfigure.high_s}</#if></span></li>
                            <li><b>轴距(MM)：</b><span>${carConfigure.wheelbase}</span></li>
                            <li><b>前轮距(MM)：</b><span>${carConfigure.front_track}</span></li>
                            <li><b>后轮距(MM)：</b><span>${carConfigure.back_track}</span></li>
                            <li><b>整体质量(KG)：</b><span>${carConfigure.kerb_mass}</span></li>
                            <li><b>最大载重质量(KG)：</b><span>${carConfigure.max_load}</span></li>
                            <li><b>油箱容积(L)：</b><span>${carConfigure.fuel_tank_capacity}</span></li>
                            <li><b>行李厢容积(L)：</b><span>${carConfigure.lug_com_vol}</span></li>
                            <li><b>车门数：</b><span>${carConfigure.num_doors}</span></li>
                            <li><b>座位数：</b><span>${carConfigure.num_seats}</span></li>
                        </ul>
                    </div>
                    <div class="sizes s4">
                        <p class="sizes_title">车轮制动</p>
                        <ul>
                            <li><b>前轮胎规格：</b><span>${carConfigure.front_tire_spec}</span></li>
                            <li><b>后轮胎规格：</b><span>${carConfigure.back_tire_spec}</span></li>
                            <li><b>前轮毂规格：</b><span>${carConfigure.front_wheel_spec}</span></li>
                            <li><b>后轮毂规格：</b><span>${carConfigure.back_wheel_spec}</span></li>
                            <li><b>轮毂材料：</b><span>${carConfigure.wheel_material}</span></li>
                            <li><b>备胎规格：</b><span>${carConfigure.spare_tire_spec}</span></li>
                        </ul>
                    </div>
                    <div class="sizes s5">
                        <p class="sizes_title">安全装备</p>
                        <ul>
                            <li><b>驾驶座安全气囊：</b><span><#if carConfigure.driver_airbag =='无'>
                                --<#else>${carConfigure.driver_airbag}</#if></span></li>
                            <li><b>副驾驶安全气囊：</b><span><#if carConfigure.ass_driver_airbag =='无'>
                                --<#else>${carConfigure.ass_driver_airbag}</#if></span></li>
                            <li><b>前排侧气囊：</b><span><#if carConfigure.front_seat_airbag =='无'>
                                --<#else>${carConfigure.front_seat_airbag}</#if></span></li>
                            <li><b>后排侧气囊：</b><span><#if carConfigure.back_seat_airbag =='无'>
                                --<#else>${carConfigure.back_seat_airbag}</#if></span></li>
                            <li><b>前排头部气囊(气帘)：</b><span><#if carConfigure.front_airbag =='无'>
                                --<#else>${carConfigure.front_airbag}</#if></span></li>
                            <li><b>后排头部气囊(气帘)：</b><span><#if carConfigure.back_airbag =='无'>
                                --<#else>${carConfigure.back_airbag}</#if></span></li>
                            <li><b>膝部气囊：</b><span><#if carConfigure.knee_airbag =='无'>
                                --<#else>${carConfigure.knee_airbag}</#if></span></li>
                            <li><b>胎压监测装置：</b><span><#if carConfigure.tire_pre_mon_device =='无'>
                                --<#else>${carConfigure.tire_pre_mon_device}</#if></span></li>
                            <li><b>安全带未系提示：</b><span><#if carConfigure.safety_belt =='无'>
                                --<#else>${carConfigure.safety_belt}</#if></span></li>
                            <li><b>发动机电子防盗：</b><span><#if carConfigure.engine_electr =='无'>
                                --<#else>${carConfigure.engine_electr}</#if></span></li>
                            <li><b>中控锁：</b><span><#if carConfigure.cen_lock =='无'>
                                --<#else>${carConfigure.cen_lock}</#if></span></li>
                            <li><b>遥控钥匙：</b><span><#if carConfigure.remote_contry_key =='无'>
                                --<#else>${carConfigure.remote_contry_key}</#if></span></li>
                            <li><b>无钥匙启动系统：</b><span><#if carConfigure.keyless_start_sys =='无'>
                                --<#else>${carConfigure.keyless_start_sys}</#if></span></li>
                        </ul>
                    </div>
                    <div class="sizes s6">
                        <p class="sizes_title">操控配置</p>
                        <ul>
                            <li><b>ABS防抱死：</b><span><#if carConfigure.abs =='无'>
                                --<#else>${carConfigure.abs}</#if></span></li>
                            <li><b>制动力分配(EBD/CBC等)：</b><span><#if carConfigure.brake_force =='无'>
                                --<#else>${carConfigure.brake_force}</#if></span></li>
                            <li><b>刹车辅助(EBA/BAS/BA等)：</b><span><#if carConfigure.brake_asst =='无'>
                                --<#else>${carConfigure.brake_asst}</#if></span></li>
                            <li><b>牵引力控制(ASR/TCS/TRC等)：</b><span><#if carConfigure.tra_control =='无'>
                                --<#else>${carConfigure.tra_control}</#if></span></li>
                            <li><b>稳定控制(ESP/DSC/VSC等)：</b><span><#if carConfigure.vel_stab_control =='无'>
                                --<#else>${carConfigure.vel_stab_control}</#if></span></li>
                        </ul>
                    </div>
                    <div class="sizes s7">
                        <p class="sizes_title">外部配置</p>
                        <ul>
                            <li><b>电动后备厢：</b><span><#if carConfigure.ele_trunk =='无'>
                                --<#else>${carConfigure.ele_trunk}</#if></span></li>
                            <li><b>电动天窗：</b><span><#if carConfigure.ele_sunroof =='无'>
                                --<#else>${carConfigure.ele_sunroof}</#if></span></li>
                            <li><b>全景天窗：</b><span><#if carConfigure.pan_sunroof =='无'>
                                --<#else>${carConfigure.pan_sunroof}</#if></span></li>
                            <li><b>真皮座椅：</b><span><#if carConfigure.lea_seats =='无'>
                                --<#else>${carConfigure.lea_seats}</#if></span></li>
                            <li><b>座椅高低调节：</b><span><#if carConfigure.seat_height_adjust =='无'>
                                --<#else>${carConfigure.seat_height_adjust}</#if></span></li>
                            <li><b>腰部支撑调节：</b><span><#if carConfigure.lum_sup_adjustment =='无'>
                                --<#else>${carConfigure.lum_sup_adjustment}</#if></span></li>
                            <li><b>驾驶座座椅电动调节：</b><span><#if carConfigure.driver_seat_ele_adjustment =='无'>
                                --<#else>${carConfigure.driver_seat_ele_adjustment}</#if></span></li>
                            <li><b>副驾驶座座椅电动调节：</b><span><#if carConfigure.cop_driver_seat_ele_adjustment =='无'>
                                --<#else>${carConfigure.cop_driver_seat_ele_adjustment}</#if></span></li>
                            <li><b>电动座椅记忆：</b><span><#if carConfigure.ele_seat_memory =='无'>
                                --<#else>${carConfigure.ele_seat_memory}</#if></span></li>
                            <li><b>前排座椅加热：</b><span><#if carConfigure.heated_front_seats =='无'>
                                --<#else>${carConfigure.heated_front_seats}</#if></span></li>
                            <li><b>座椅通风：</b><span><#if carConfigure.seat_ven =='无'>
                                --<#else>${carConfigure.seat_ven}</#if></span></li>
                            <li><b>自动空调：</b><span><#if carConfigure.auto_air_conding =='无'>
                                --<#else>${carConfigure.auto_air_conding}</#if></span></li>
                            <li><b>后座出风口：</b><span><#if carConfigure.rear_air_out_let =='无'>
                                --<#else>${carConfigure.rear_air_out_let}</#if></span></li>
                            <li><b>温度分区控制：</b><span><#if carConfigure.temp_zoon_control =='无'>
                                --<#else>${carConfigure.temp_zoon_control}</#if></span></li>
                            <li><b>空气调节/花粉过滤：</b><span><#if carConfigure.poll_filter =='无'>
                                --<#else>${carConfigure.poll_filter}</#if></span></li>
                            <li><b>方向盘上下调节：</b><span><#if carConfigure.steering_wheel_reg =='无'>
                                --<#else>${carConfigure.steering_wheel_reg}</#if></span></li>
                            <li><b>方向盘前后调节：</b><span><#if carConfigure.steering_wheel_adjust =='无'>
                                --<#else>${carConfigure.steering_wheel_adjust}</#if></span></li>
                            <li><b>方向盘电动调节：</b><span><#if carConfigure.steering_wheel_ele =='无'>
                                --<#else>${carConfigure.steering_wheel_ele}</#if></span></li>
                            <li><b>多功能方向盘：</b><span><#if carConfigure.mult_steering_wheel =='无'>
                                --<#else>${carConfigure.mult_steering_wheel}</#if></span></li>
                            <li><b>定速巡航：</b><span><#if carConfigure.cruise_control =='无'>
                                --<#else>${carConfigure.cruise_control}</#if></span></li>
                            <li><b>倒车视频影像：</b><span><#if carConfigure.rev_vido_image =='无'>
                                --<#else>${carConfigure.rev_vido_image}</#if></span></li>
                            <li><b>行车电脑显示屏：</b><span><#if carConfigure.drivering_com_screen =='无'>
                                --<#else>${carConfigure.drivering_com_screen}</#if></span></li>
                        </ul>
                    </div>
                    <div class="sizes s8">
                        <p class="sizes_title">多媒体配置</p>
                        <ul>
                            <li><b>GPS导航：</b><span><#if carConfigure.gps =='无'>
                                --<#else>${carConfigure.gps}</#if></span></li>
                            <li><b>定位互动服务：</b><span><#if carConfigure.pos_inter_service =='无'>
                                --<#else>${carConfigure.pos_inter_service}</#if></span></li>
                            <li><b>内置硬盘：</b><span><#if carConfigure.bui_hard_driver =='无'>
                                --<#else>${carConfigure.bui_hard_driver}</#if></span></li>
                            <li><b>蓝牙车载电话：</b><span><#if carConfigure.blue_telephone =='无'>
                                --<#else>${carConfigure.blue_telephone}</#if></span></li>
                            <li><b>单碟CD：</b><span><#if carConfigure.singl_cd =='无'>
                                --<#else>${carConfigure.singl_cd}</#if></span></li>
                            <li><b>多碟CD：</b><span><#if carConfigure.mutil_cd =='无'>
                                --<#else>${carConfigure.mutil_cd}</#if></span></li>
                            <li><b>虚拟多碟CD：</b><span><#if carConfigure.vir_cd =='无'>
                                --<#else>${carConfigure.vir_cd}</#if></span></li>
                            <li><b>单碟DVD：</b><span><#if carConfigure.singl_dvd =='无'>
                                --<#else>${carConfigure.singl_dvd}</#if></span></li>
                            <li><b>多碟DVD：</b><span><#if carConfigure.mutil_dvd =='无'>
                                --<#else>${carConfigure.mutil_dvd}</#if></span></li>
                            <li><b>扬声器数量：</b><span><#if carConfigure.num_loudspeakers =='无'>
                                --<#else>${carConfigure.num_loudspeakers}</#if></span></li>
                        </ul>
                    </div>
                    <div class="sizes s9">
                        <p class="sizes_title">灯光配置</p>
                        <ul>
                            <li><b>氙气大灯：</b><span><#if carConfigure.xen_head =='无'>
                                --<#else>${carConfigure.xen_head}</#if></span></li>
                            <li><b>LED大灯：</b><span><#if carConfigure.led_head =='无'>
                                --<#else>${carConfigure.led_head}</#if></span></li>
                            <li><b>日间行车灯：</b><span><#if carConfigure.day_driver_light =='无'>
                                --<#else>${carConfigure.day_driver_light}</#if></span></li>
                            <li><b>前雾灯：</b><span><#if carConfigure.frout_fog_lamp =='无'>
                                --<#else>${carConfigure.frout_fog_lamp}</#if></span></li>
                            <li><b>大灯高度可调：</b><span><#if carConfigure.head_height_adjust =='无'>
                                --<#else>${carConfigure.head_height_adjust}</#if></span></li>
                            <li><b>大灯清洗装置：</b><span><#if carConfigure.head_driver_dev =='无'>
                                --<#else>${carConfigure.head_driver_dev}</#if></span></li>
                            <li><b>后风挡遮阳帘：</b><span><#if carConfigure.after_winds_sun_shade =='无'>
                                --<#else>${carConfigure.after_winds_sun_shade}</#if></span></li>
                            <li><b>遮阳板化妆镜：</b><span><#if carConfigure.vis_van_mirr =='无'>
                                --<#else>${carConfigure.vis_van_mirr}</#if></span></li>
                            <li><b>前电动车窗：</b><span><#if carConfigure.frout_prow_windows =='无'>
                                --<#else>${carConfigure.frout_prow_windows}</#if></span></li>
                            <li><b>后电动车窗：</b><span><#if carConfigure.back_prow_windows =='无'>
                                --<#else>${carConfigure.back_prow_windows}</#if></span></li>
                            <li><b>车窗防夹手功能：</b><span><#if carConfigure.car_windows_hand_fun =='无'>
                                --<#else>${carConfigure.car_windows_hand_fun}</#if></span></li>
                            <li><b>后视镜电动调节：</b><span><#if carConfigure.rear_mirr_ele_adjustment =='无'>
                                --<#else>${carConfigure.rear_mirr_ele_adjustment}</#if></span></li>
                            <li><b>后视镜加热：</b><span><#if carConfigure.rear_mirr_heating =='无'>
                                --<#else>${carConfigure.rear_mirr_heating}</#if></span></li>
                            <li><b>后视镜自动防眩目：</b><span><#if carConfigure.auto_anti_dazz_rear_mirror =='无'>
                                --<#else>${carConfigure.auto_anti_dazz_rear_mirror}</#if></span></li>
                            <li><b>后视镜电动折叠：</b><span><#if carConfigure.rear_mirr_folding =='无'>
                                --<#else>${carConfigure.rear_mirr_folding}</#if></span></li>
                            <li><b>后视镜记忆：</b><span><#if carConfigure.mirr_mem =='无'>
                                --<#else>${carConfigure.mirr_mem}</#if></span></li>
                            <li><b>后雨刷：</b><span><#if carConfigure.rear_wiper =='无'>
                                --<#else>${carConfigure.rear_wiper}</#if></span></li>
                            <li><b>感应雨刷：</b><span><#if carConfigure.sen_wipers =='无'>
                                --<#else>${carConfigure.sen_wipers}</#if></span></li>
                        </ul>
                    </div>
                    <div class="sizes s10">
                        <p class="sizes_title">高科技配置</p>
                        <ul>
                            <li><b>中控液晶屏分屏显示：</b><span><#if carConfigure.control_lcd =='无'>
                                --<#else>${carConfigure.control_lcd}</#if></span></li>
                            <li><b>自适应巡航：</b><span><#if carConfigure.ad_cur_control =='无'>
                                --<#else>${carConfigure.ad_cur_control}</#if></span></li>
                            <li><b>全景摄像头：</b><span><#if carConfigure.pan_camera =='无'>
                                --<#else>${carConfigure.pan_camera}</#if></span></li>
                            <li><b>倒车雷达：</b><span><#if carConfigure.reversing_rader =='无'>
                                --<#else>${carConfigure.reversing_rader}</#if></span></li>
                            <li><b>车载服务信息：</b><span><#if carConfigure.vehicel_information =='无'>
                                --<#else>${carConfigure.vehicel_information}</#if></span></li>
                        </ul>
                    </div>
                </div>
            </#if>
            </div>
        </div>
        <!--新车配置结束-->

        <#--充值 会员弹框-->
        <#--<div class="openvipModel" style="display:none;">-->
            <#--&lt;#&ndash;<div class="models"></div>&ndash;&gt;-->
            <#--<div class="openVipContainer">-->
                <#--<div class="vipBenefit">-->
                    <#--<div class="titleText">开通个人会员</div>-->
                    <#--<div class="BenefitTextContainer">-->
                        <#--<ul class="BenefitText">-->
                            <#--<li><i class=""></i><span>申请的私人助理仅限于对提交申请的该车辆进行协商成交</span></li>-->
                            <#--<li><i></i><span>协商不成功，我们将全款退回到您的付款账户</span></li>-->
                            <#--<li><i></i><span>提交成功后，会有工作人员与您取得联系</span></li>-->
                            <#--&lt;#&ndash;<li><i></i><span>4S查询5折优惠，低至6元！</span></li>&ndash;&gt;-->
                        <#--</ul>-->
                    <#--</div>-->
                <#--</div>-->
                <#--<div class="vipSetMeal">-->
                    <#--<i class="closeVip"></i>-->
                    <#--<p class="stext">请选择套餐：</p>-->
                    <#--<div class="vipType">-->
                        <#--<ul class="allType">-->
                            <#--<li>半年会员</li>-->
                            <#--<li class="select">特惠礼包<i></i></li>-->
                            <#--<li>年度会员</li>-->
                            <#--<li>至尊会员</li>-->
                        <#--</ul>-->
                        <#--<p class="explainText">六个月个人会员+20张4S免费券（有效期60天）</p>-->
                    <#--</div>-->
                    <#--<div class="paymentMoney">-->
                        <#--<p class="payMoney">实付金额：<span class="text1">￥<em class="moneyText">389</em>元</span><span class="text2">（已抵扣10元）</span></p>-->
                        <#--<p class="payText">请选择支付方式：</p>-->
                        <#--<ul class="RechargeType">-->
                            <#--<li class="wechats select"><i></i></li>-->
                            <#--<li class="alipay"></li>-->
                        <#--</ul>-->
                        <#--<p class="payMoneyBtn">立即支付</p>-->
                    <#--</div>-->
                <#--</div>-->
            <#--</div>-->
        <#--</div>-->

        <#--充值 会员弹框-->

        <#-- 查看电话1元弹框 -->
        <div class="myModel lookPhoneModel" style="display:none;">
            <div class="model_title">
                <div class="text">查看联系方式</div>
                <div class="close_btn"></div>
            </div>
            <div class="lookPhoneCont">
                <p class="lookText1">今日次数已达40次上限，继续查看需额外费用1元/次</p>
                <div class="lookpayBox">
                    <p class="lookTitle" style="float:left;">支付价格：</p>
                    <p style="float:left;color:#f60;margin-left:5px;">￥<em class="onceMoney">1</em>元</p>
                </div>
                <div class="payTypeBox" id="payOneMoney">
                    <p class="lookTitle">请选择支付方式：</p>
                    <div class="payBox">
                        <span class="wixinimg select"><i></i></span>
                        <span class="aliimg"><i></i></span>
                    </div>
                </div>
                <p class="goBuyOnce">确定</p>
            </div>
        </div>
        <#-- 查看电话1元弹框end -->

            <#--订阅-->
            <div id="CmdMaskDiv" style="display: none; background-color: #000; position: fixed; width: 100%; height: 100%; top: 0; left: 0px; opacity: 0.5;-ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=50);filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=50); z-index: 999999999; background-position: initial initial; background-repeat: initial initial;"></div>
                <#assign peicelict=[
                [346, "自主"],
                [347, "进口"],
                [348, "国产"],
                [349, "德国"],
                [350, "日本"],
                [351, "美国"],
                [352, "韩国"],
                [353, "法国"],
                [354, "英国"],
                [355, "意大利"],
                [357, "瑞典"],
                [356, "其他"]
                ]>
            <div id="custommcarsend" class=" layer-subscriber width455 subscriber" style="display: none; z-index: 999999999999; ">
                <div class="titlebox" style="text-align: left;">
                    <span class="title">条件订阅</span>
                    <span class="closed" id="closeNews"></span>
                </div>
                <div class="custommcarbox">
                    <div class="left_nav">
                        <p class="haschoose">已选条件：</p>
                        <div class="choosebox">
                            <#if carTag.brandTag?? && carTag.brandTag !='' && carTag.carSerialTag?? && carTag.carSerialTag !=''>
                                <span class="subBrand">${carTag.brandTag}-${carTag.carSerialTag}</span>
                            </#if>
                            <span id="subMoney"></span>
                        </div>
                        <p class="haschoose">联系方式：<span id="subPhone" class="telp">${webutil.getLoginUserMobile()}</span></p>
                        <p class="textnotice">您订阅的车源信息会通过华夏二手车app免费发送给您</p>
                        <div class="btnbox">
                            <a id="sendNews" class="confirmbtn" onclick="getJyTitle.getSubscription()">确定</a>
                            <a class="modifybtn" id="modificationSub" href="/quanguo/soa1?keyword=${simCar.title!''} ">修改订阅条件
                            </a>
                        </div>
                    </div>
                    <div class="right_nav">
                        <img src="${staticServer}/web/dist/static/page/images/hx2carAppCode4.png"/>
                        <p>扫描下载app</p>
                    </div>
                </div>
            </div>
            <#--订阅end-->

    <@index_macro.newIndexDown2017/>
</body>

<script>
    //给客服微信设置路径
    $('.weixin_codeimg').attr('src', '${staticServer}/web/dist/static/gbpage/images/cardetail/weixin_code.jpg');
    /***关闭微信支付窗口***/
    $('#wxclose').click(function () {
        $('.Service').hide();
        $('.buy_money').show();
        $('.pay_way').show();
        /*$('.vip').hide();*/
        /*$('.model').fadeOut();*/
    });
    if ($.trim($('#shushipzspan').html()) == '') {
        $('#shushipz').hide();
        $('#shushipzspan').hide();
    }

    window._bd_share_config = {
        "common": {
            "bdSnsKey": {},
            "bdText": "",
            "bdMini": "2",
            "bdMiniList": ["mshare", "sqq", "qzone", "weixin", "tsina", "tqq", "bdysc", "renren", "bdxc", "kaixin001", "tqf", "tieba", "douban", "bdhome", "thx", "copy"],
            "bdPic": "",
            "bdStyle": "0",
            "bdSize": "16"
        }, "share": {}
    };
    	var shareScript = document.createElement('script');shareScript.src = '${staticServer}/web/dist/static/mobpages/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5);(document.getElementsByTagName('head')[0] || document.body).appendChild(shareScript);

    var getquery = function () {
        var level = "${(level)!''}";
        if (level != null && level == "true") {
            var searh_flag = "1";
            var tf = "1";
            var key_word = "";
            var brandName = "${(menu.firstMenu)!''}";
            var childbrandName = "${(menu.threeMenu)!''}";
            var carTypeLabelName = "${(carTypes)!''}";
            if (carTypeLabelName == null || carTypeLabelName == "") {
                key_word = brandName + " " + childbrandName;
            } else {
                key_word = brandName + " " + childbrandName + "," + carTypeLabelName;
            }
            var carfId = "${(carfId)!''}";
            var carpId = "${(car.carSerial)!''}";
            var carAreacode = "${(area)!''}";
            var brad = brandName + childbrandName;
            var cSourse = "20";
            var licensing_year = $("#licensing_year").val();
            var carT = "${(car.carType)!''}";
            var Month = $("#licensing_month").val();
            var selectCardsMonth = Month.substring(5, Month.indexOf('月'));
            var selectPro = "${(simareaName)!''}";
            var selectcity = "${(simCar.shortAreaName)!''}";
            window.open(encodeURI('${contextPath}/tools/cheliangpingu.htm?search_flag=' + searh_flag + '&flag=' + tf + '&keyword=' + key_word + '&id=' + carfId + '&pid=' + carpId + '&areaCode=' + carAreacode + '&brabdStr=' + brad + '&carSources=' + cSourse + '&licensing_year=' + licensing_year + '&carType=' + carT + '&carTypeLabelName=' + carTypeLabelName + '&brandName=' + brandName + '&childbrandName=' + childbrandName + '&selectCardsMonth=' + selectCardsMonth + '&pro=' + selectPro + '&city=' + selectcity));
        } else {
            window.open('${contextPath}/tools/carassess.htm');
        }
    }
    $("#getAccess").bind("click", getquery);


    $(function () {
        //把车辆添加到cookie开始
        var fk = $.cookie('footmarks'); 
        var cookieCarid = "${(simCar.id)!''}";
        var footmarks = cookieCarid;
        $.cookie('footmarks', '', {expires: -1});
        $.cookie('footmarks', footmarks.toString(), {expires: 365, path: '/', domain: '${cookieDomain}'});
        //把车辆添加到cookie结束
    });
</script>
<script type="text/javascript">
    //单选按钮
    $(function () {
        $('label').click(function () {
            var radioId = $(this).attr('name');
            $('label').removeAttr('class') && $(this).attr('class', 'checked');
            $('input[type="radio"]').removeAttr('checked') && $('#' + radioId).attr('checked', 'checked');
        });
    });
</script>
<script>
    // 公司门店。幻灯片
    // 获取第一个图片 节点对象
    var firstImg = $('.mdPicBig li').first().clone();
    // 放在 ul 的最后
    $('.mdPicBig').append(firstImg).width($('.mdPicBig li').length * $('.mdPicBig img').width());

    var i = 0;

    var timer;

    // 下一张
    $('.arrowL').click(function () {
        i++;
        moveImg(i);
    })


    // 上一张
    $('.arrowR').click(function () {
        i--;
        moveImg(i);
    })


    // auto play
    function autoPlay() {
        timer = setInterval(function () {
            i++;
            moveImg(i);
        }, 1000);
    }


    function moveImg(num) {
        // 如果是最后一张图片我们怎么办
        if (i == $('.mdPicBig li').length) {
            i = 1;
            $('.mdPicBig').css({left: 0});
        }

        // 是第一张
        if (i == -1) {
            i = $('.mdPicBig li').length - 2;
            $('.mdPicBig').css({left: ($('.mdPicBig li').length - 1) * -550});
        }

        // 移动图片
        $('.mdPicBig').stop().animate({left: i * (-550)}, 400);

        // 换小点的标记
        /*if(i==($('.mdPicBig li').length-1)){
            $('.mdPicBig li').eq(0).addClass('on').siblings().removeClass('on');
        }else{
            $('.mdPicBig li').eq(i).addClass('on').siblings().removeClass('on');
        }*/
    }


    /***********************/
    $('.closeMD').click(function () {
        $('.model').hide();
        $('.mdContBig').hide();
        $('.closeImg').hide();
    });

    $('.mdPic').click(function () {
        $('.model').fadeIn();
        $('.mdContBig').show();
    });
    $('.mdContBig').mouseover(function () {
        $('.arrowL').show();
        $('.arrowR').show();
    }).mouseout(function () {
        $('.arrowL').hide();
        $('.arrowR').hide();
    });
    
    //百度统计
	var _hmt =_hmt || [];
	(function() {
		var hm = document.createElement("script");
		hm.src = "//hm.baidu.com/hm.js?5b941f460f2ec63730c9f325ba44961f";
		var s = document.getElementsByTagName("script")[0];
		s.parentNode.insertBefore(hm, s);
	})();
</script>

</html>
