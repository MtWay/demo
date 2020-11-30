<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>车源推广——会员中心</title>
<link href="${staticServer}/web/member_new/css/member_common.css?t=20170628" rel="stylesheet" type="text/css"/>
<link href="${staticServer}/web/member_new/css/expand.css?t=20180628" rel="stylesheet" type="text/css"/>
<script type="text/javascript">
	var CONTEXTPATH = "${contextPath}";
	var STATICSERVERUPLOAD = "${staticServerUpload}";
</script>
<#--引入相关的JS-->
<script src="${staticServer}/web/common/js/jquery/jquery.min.js" type="text/javascript"></script>
<script type="text/javascript" src="${staticServer}/web/gbpage/js/common/hx2carPages.js?t=20170725"></script>
<script type="text/javascript" src="${staticServer}/web/pc/common/pcPlug.js"></script>

</head>
<#import "/common/commonFunc.ftl" as common_func>
<#import "/common/indexMacro.ftl" as index_macro>
<#import "/common/memberMacro.ftl" as member_macro>
<#import "/common/pageMacro.ftl" as page_macro>
<body>
<#--会员中心的顶部-->
<@index_macro.showVipIndexTop />
<#--广告
<div class="header_ad_frame" style="display:none;" id="membertopads">
</div>
<#--搜索-->
<@member_macro.showVipSearch />
<div class="vipcenter">
  <@member_macro.leftNav />
  <div class="carRight">
  	 <div class="cars_bar">
  	 	<a href="/vip/myappad.htm?appadtype=caradd" class="cname select">车源推广</a>
  	 	<a href="/vip/myappad.htm?appadtype=shopadd" class="cname">店铺推广</a>
  	 	<a href="/vip/myappads.htm" class="cname">我的推广</a>
  	 </div>
	 <div class="car_con" style="z-index:20;">
	  	<span class="ctitle">推广地区：</span>
	  	<#if id??  && overDays??>
	  	    <#if areaname_one?? && areaname_two??>
	  	       <div class="content">
		  	 	<div class="cbox">
					<input class="ctext" data-pro="" value="${areaname_one!''}" disabled="disabled"/>
			    </div>
				<div class="cbox">
					<input class="ctext" data-city="${areacode!''}" value="${areaname_two!''}" disabled="disabled"/>
			  	</div>
			  </div>
			<#elseif areaname_one??>
			   <div class="content">
				   <div class="cbox">
						<input class="ctext" data-pro="${areacode!''}" value="${areaname_one!''}" disabled="disabled"/>
				   </div>
			    </div>
			</#if>
  	   <#else>
  	      <div class="content">
	  	 	<div class="cbox" id="epro" ><i class="xiala">∨</i>
				<#if pArea??>
					<span class="ctext" data-pro="${pArea.area_code}" data-pro="">${pArea.area_name}</span>
				<#else>
					<span class="ctext" data-pro="" data-pro="">请选择省份</span>
				</#if>
				<div class="cdropDown" style="display:none;" id="hidePro">
					<span class="cdPro" data-pro="100000">全国</span>
					<span class="cdPro" data-pro="340000">安徽省</span>
					<span class="cdPro" data-pro="110000">北京市</span>
					<span class="cdPro" data-pro="500000">重庆市</span>
					<span class="cdPro" data-pro="350000">福建省</span>
					<span class="cdPro" data-pro="440000">广东省</span>
					<span class="cdPro" data-pro="450000">广西壮族自治区</span>
					<span class="cdPro" data-pro="620000">甘肃省</span>
					<span class="cdPro" data-pro="520000">贵州省</span>
					<span class="cdPro" data-pro="130000">河北省</span>
					<span class="cdPro" data-pro="410000">河南省</span>
					<span class="cdPro" data-pro="460000">海南省</span>
					<span class="cdPro" data-pro="420000">湖北省</span>
					<span class="cdPro" data-pro="430000">湖南省</span>
					<span class="cdPro" data-pro="230000">黑龙江省</span>
					<span class="cdPro" data-pro="220000">吉林省</span>
					<span class="cdPro" data-pro="320000">江苏省</span>
					<span class="cdPro" data-pro="360000">江西省</span>
					<span class="cdPro" data-pro="210000">辽宁省</span>
					<span class="cdPro" data-pro="150000">内蒙古自治区</span>
					<span class="cdPro" data-pro="640000">宁夏回族自治区</span>
					<span class="cdPro" data-pro="630000">青海省</span>
					<span class="cdPro" data-pro="310000">上海市</span>
					<span class="cdPro" data-pro="510000">四川省</span>
					<span class="cdPro" data-pro="370000">山东省</span>
					<span class="cdPro" data-pro="140000">山西省</span>
					<span class="cdPro" data-pro="610000">陕西省</span>
					<span class="cdPro" data-pro="120000">天津市</span>
					<span class="cdPro" data-pro="650000">新疆维吾尔自治区</span>
					<span class="cdPro" data-pro="540000">西藏自治区</span>
					<span class="cdPro" data-pro="530000">云南省</span>
					<span class="cdPro" data-pro="330000">浙江省</span>
				</div>
	  	 	</div>
				<#assign p = "全国,北京市,重庆市,上海市,天津市">
	  	 	    <div class="cbox" id="ecity" style="<#if cArea?? && (pArea?? && p?index_of(pArea.area_name) == -1)>display:block;<#else>display:none;</#if>">
		  	 	    <i class="xiala">∨</i>
					<#if cArea?? && (pArea?? && p?index_of(pArea.area_name) == -1)>
   				 		<span class="ctext" data-city="${cArea.area_code}">${cArea.area_name}</span>
   				    <#else>
	   				 	<span class="ctext" data-city="">请选择市</span>
	   			 	</#if>
					<div class="cdropDown" style="display:none;" id="hideCity"></div>
		  	 	</div>
	  	 </div>
  	   </#if>
  	 	<div class="cicon" id="cicon"></div>
  	    <span class="cPrompt" id="citext" style="display:none;">
  	 		在推广地区（如：杭州）默认车辆列表中，提供置顶展示位，最大程度曝光选择的推广车辆（除搜索其他品牌车辆外，一直置顶）。购买成功后,可在【我的推广】中更换推广车辆。
  	 	</span>
  	 </div>
  	 <div class="car_con">
  	 	<span class="ctitle">温馨提示：</span>
  	 	<span class="cwords" id="cmess">${message!''}</span>
  	 </div>
  	 <div class="car_con">
  	 	<span class="ctitle">推广车辆：</span>
  	 	<#if carlist??>
          <#list carlist as cars>
           <#if cars_index==0>
		  	 	<span class="carStyle" id="ecarTitle">${cars.title!''}</span>
		  	 	<span class="carPrice" id="ecarPrice">￥<#if cars.money??>${(common_func.formatPrice(cars.money))!''}<#else>暂无</#if></span>
		  	</#if>
           </#list>
        </#if>
  	 </div>

    <div class="car_list" id="car_list">
      <#if carlist??>
        <#list carlist as cars>
           <#if cars_index==0>
              <div class="cars select" data-cid="${cars.id!''}">
           <#else>
              <div class="cars" data-cid="${cars.id!''}">
           </#if>
	    		<div class="cimg">
	    			<img src="${common_func.getCarPic('${(cars.firstSmallPic)!}')}" alt="${cars.title!''}" />
	    		</div>
	    		<div class="cdetail">
	    			<span class="ctitle">${cars.title!''}</span>
	    			<span class="cdate">${cars.usedate!''}</span>
	    			<span class="cpublich">发布时间：${(cars.createTime)?string("yyyy-MM-dd")}</span>
	    		</div>
	    		<div class="cmoney">
	    			<span class="mprice"><#if cars.money??>￥<i class="big">${(common_func.formatPrice(cars.money))!''}</i><#else><i class="big">暂无</i></#if></span>
	    			<span class="cpifa">批发价：<#if cars.tradePrice?? && cars.tradePrice!="未知" && cars.tradePrice !="0">￥${cars.tradePrice!''}万<#else>未知</#if></span>
	    		</div>
	    	</div>
    	</#list>
      </#if>
    </div>

    <div <#if areacode??>style="display:block;"<#else>style="display:none;"</#if> id="carea">
	  	 <div class="car_con">
	  	 	<span class="ctitle">开始时间：</span>
	  	 	<span class="cwords" id="etime">${create!''}</span>
	  	 </div>
	  	 <div class="car_con" id="edays">
	  	 	<span class="ctitle">推广天数：</span>
	  	 	<#if id?? && overDays??>
	  	 	    <em class="<#if overDays?? && overDays==1>cdays select<#else>cdisdays</#if>" data_num="1">1天</em>
		  	 	<em class="<#if overDays?? && overDays==3>cdays select<#else>cdisdays</#if>" data_num="3">3天</em>
		  	 	<em class="<#if overDays?? && overDays==5>cdays select<#else>cdisdays</#if>" data_num="5">5天</em>
		  	 	<em class="<#if overDays?? && overDays==7>cdays select<#else>cdisdays</#if>" data_num="7">7天</em>
		  	 	<em class="<#if overDays?? && overDays==15>cdays select<#else>cdisdays</#if>" data_num="15">15天</em>
		  	 	<em class="<#if overDays?? && overDays==30>cdays select<#else>cdisdays</#if>" data_num="30">30天</em>
	  	 	<#elseif areacode?? && overDays??>
	  	 	    <em class="<#if overDays?? && overDays==1>select cdays<#else><#if overDay?? && overDay lt 1> cdisdays<#else> cdays</#if></#if>" data_num="1">1天</em>
		  	 	<em class="<#if overDays?? && overDays==3>select cdays<#else><#if overDay?? && overDay lt 3> cdisdays<#else> cdays </#if></#if>" data_num="3">3天</em>
		  	 	<em class="<#if overDays?? && overDays==5>select cdays<#else><#if overDay?? && overDay lt 5> cdisdays<#else> cdays</#if></#if>" data_num="5">5天</em>
		  	 	<em class="<#if overDays?? && overDays==7>select cdays<#else><#if overDay?? && overDay lt 7> cdisdays<#else> cdays</#if></#if>" data_num="7">7天</em>
		  	 	<em class="<#if overDays?? && overDays==15>select cdays<#else><#if overDay?? && overDay lt 15> cdisdays<#else> cdays</#if></#if>" data_num="15">15天</em>
		  	 	<em class="<#if overDays?? && overDays==30>select cdays<#else><#if overDay?? && overDay lt 30> cdisdays<#else> cdays</#if></#if>" data_num="30">30天</em>
	  	 	<#else>
		  	 	<em <#if overDay?? && overDay lt 1> class="cdisdays"<#else>class="cdays select"</#if> data_num="1">1天</em>
		  	 	<em <#if overDay?? && overDay lt 3> class="cdisdays"<#else>class="cdays"</#if> data_num="3">3天</em>
		  	 	<em <#if overDay?? && overDay lt 5> class="cdisdays"<#else>class="cdays"</#if> data_num="5">5天</em>
		  	 	<em <#if overDay?? && overDay lt 7> class="cdisdays"<#else>class="cdays"</#if> data_num="7">7天</em>
		  	 	<em <#if overDay?? && overDay lt 15> class="cdisdays"<#else>class="cdays"</#if> data_num="15">15天</em>
		  	 	<em <#if overDay?? && overDay lt 30> class="cdisdays"<#else>class="cdays"</#if> data_num="30">30天</em>
	  	 	</#if>
	  	 </div>
	  	 <div class="car_con">
	  	 	<span class="ctitle">付费金额：</span>
	  	 	<span class="cHuabi" id="ehuabi">${money!''}华币</span>
	  	 </div>
	  	 <div class="car_buttom">
	        <span class="cbuy"><#if id??>保存<#else>立即购买</#if></span>
	     </div>
	 </div>

  </div>
</div>
</div>
<@index_macro.showVipIndexFooter />
<script type="text/javascript">
	$(function(){
		function changeNews(areacode){
              $.post('/vip/getappday.json',{areacode:areacode},function(data){
                     if(data.message){
                         $("#cmess").html(data.message);
                     }
                     if(data.overDay){
                        $("#edays em").removeClass("cdisdays");
                        $("#edays em").addClass("cdays");
						$("#edays em").each(function(){
						   if($(this).html().split('天')[0] > data.overDay){
							  $(this).removeClass("cdays");
							  $(this).addClass("cdisdays");
						   }
						})
                     }
                     if(data.create){
                          $("#etime").html(data.create);
                     }
             });
        }
		function getCity(areacode,fload){
			$.post('/tools/getAreaByCityCode.json',{province:areacode},function(data){
				if(data.cityList!= null){
				   var city = '<span class="cdPro" data-city="'+areacode+'">全省</span>';
					  for (var  i = 0; i < data.cityList.length; i++) {
						   city += '<span class="cdPro" data-city="'+data.cityList[i].area_code+'">' + data.cityList[i].area_name + '</span>';
					  }
					   $('#hideCity').append(city);
					   $("#ecity").show();
					   fload !="1" && $("#hideCity").show();
					   $("#hideCity .cdPro").off().on("click",function(e){
							e.stopPropagation();
							var areacode=$(this).attr("data-city");
							$("#hideCity").hide();
							$("#ecity .ctext").html($(this).text());
							$("#ecity .ctext").attr("data-city",areacode);
							changeNews(areacode);
							if($(this).text()=="全省"){
								$("#ehuabi").html('200华币');
							}else{
								 $("#ehuabi").html('100华币');
							}
							$("#carea").show();
					   });
				}
			});
		}
		<#if !id??>
			<#assign p = "全国,北京市,重庆市,上海市,天津市">
			<#if (pArea?? && p?index_of(pArea.area_name) == -1) && cArea?? >
				changeNews(${cArea.area_code});
				getCity(${pArea.area_code},1);
				$("#ehuabi").html('100华币');
				$('#edays em').removeClass('select').eq(0).addClass('select');
				$("#carea").show();
			<#elseif pArea?? && p?index_of(pArea.area_name) != -1>
				changeNews(${pArea.area_name});
			    $("#ehuabi").html('200华币');
				$('#edays em').removeClass('select').eq(0).addClass('select');
				$("#carea").show();
			</#if>
		</#if>
       $("#cicon").hover(function(){
       		$("#citext").show();
       },function(){
       		$("#citext").hide();
       });
   <#--推广地区-->
       $("#epro").off().on("click",function(e){
          e.stopPropagation();
          $("#hideCity").hide();
          $("#hidePro").show();
       });

       $("#hidePro .cdPro").off().on("click",function(e){
           e.stopPropagation();
           $("#hidePro").hide();
           $("#epro .ctext").html($(this).html());
		   $("#ecity .ctext").html('').data('city','');
           var areacode=$(this).attr("data-pro");
           $("#edays em").removeClass("select");
           $("#edays em:first").addClass("select");
           if($(this).html()=="全国" || $(this).html()=="北京市" || $(this).html()=="重庆市" || $(this).html()=="上海市" || $(this).html()=="天津市"){
               $("#ecity").hide();
               $("#epro .ctext").attr("data-pro",areacode)
               changeNews(areacode);
               if($(this).html()=="全国"){
                  $("#ehuabi").html('600华币');
               }else{
                  $("#ehuabi").html('200华币');
               }
               $("#carea").show();
           }else{
              $("#carea").hide();
              $('#hideCity').html('');
              getCity(areacode,2);
           }
       });
       $("#ecity").off().on("click",function(e){
           e.stopPropagation();
           if($("#hideCity .cdPro").length>0){
              $("#hidePro").hide();
              $("#hideCity").show();
               $("#hideCity .cdPro").off().on("click",function(e){
				   e.stopPropagation();
				   $("#edays em").removeClass("select");
           		   $("#edays em:first").addClass("select");
				   var areacode=$(this).attr("data-city");
				   $("#hideCity").hide();
				   $("#ecity .ctext").html($(this).text());
				   changeNews(areacode);
				   if($(this).text()=="全省"){
						$("#ehuabi").html('200华币');
				   }else{
						$("#ehuabi").html('100华币');
				   }
				   $("#carea").show();
			  });
           }else{
              $("#hideCity").hide();
              $.alertMessage.call($(this), '请先选择省份');
              $("#hidePro").show();
			  return;
           }
       });

   <#--推广天数-->
	      $("#edays em").off().on("click",function(e){
	          e.stopPropagation();
	          if($(this).hasClass("cdays")){
	              $("#edays .cdays").removeClass("select");
		          $(this).addClass("select");
		          if($(this).html()=="1天"){
		             if($("#ecity").css("display")=="block" && $("#ecity .ctext").html()!="请选择市"){
		                if($("#ecity .ctext").html()=="全省"){
		                   $("#ehuabi").html('200华币');
		                }else{
		                    $("#ehuabi").html('100华币');
		                }
		             }else if($("#ecity").css("display")=="none" && $("#epro .ctext").html()!="请选择省份"){
		                if($("#epro .ctext").html()=="全国"){
		                   $("#ehuabi").html('600华币');
		                }else{
		                    $("#ehuabi").html('200华币');
		                }
		             }
		          }else if($(this).html()=="3天"){
		             if($("#ecity").css("display")=="block" && $("#ecity .ctext").html()!="请选择市"){
		                if($("#ecity .ctext").html()=="全省"){
		                   $("#ehuabi").html('588华币');
		                }else{
		                    $("#ehuabi").html('288华币');
		                }
		             }else if($("#ecity").css("display")=="none" && $("#epro .ctext").html()!="请选择省份"){
		                if($("#epro .ctext").html()=="全国"){
		                   $("#ehuabi").html('1788华币');
		                }else{
		                    $("#ehuabi").html('588华币');
		                }
		             }
		          }else if($(this).html()=="5天"){
		             if($("#ecity").css("display")=="block" && $("#ecity .ctext").html()!="请选择市"){
		                if($("#ecity .ctext").html()=="全省"){
		                   $("#ehuabi").html('950华币');
		                }else{
		                    $("#ehuabi").html('450华币');
		                }
		             }else if($("#ecity").css("display")=="none" && $("#epro .ctext").html()!="请选择省份"){
		                if($("#epro .ctext").html()=="全国"){
		                   $("#ehuabi").html('2980华币');
		                }else{
		                    $("#ehuabi").html('950华币');
		                }
		             }
		          }else if($(this).html()=="7天"){
		             if($("#ecity").css("display")=="block" && $("#ecity .ctext").html()!="请选择市"){
		                if($("#ecity .ctext").html()=="全省"){
		                   $("#ehuabi").html('1299华币');
		                }else{
		                    $("#ehuabi").html('599华币');
		                }
		             }else if($("#ecity").css("display")=="none" && $("#epro .ctext").html()!="请选择省份"){
		                if($("#epro .ctext").html()=="全国"){
		                   $("#ehuabi").html('4158华币');
		                }else{
		                    $("#ehuabi").html('1299华币');
		                }
		             }
		          }else if($(this).html()=="15天"){
		             if($("#ecity").css("display")=="block" && $("#ecity .ctext").html()!="请选择市"){
		                if($("#ecity .ctext").html()=="全省"){
		                   $("#ehuabi").html('2700华币');
		                }else{
		                    $("#ehuabi").html('1200华币');
		                }
		             }else if($("#ecity").css("display")=="none" && $("#epro .ctext").html()!="请选择省份"){
		                if($("#epro .ctext").html()=="全国"){
		                   $("#ehuabi").html('8888华币');
		                }else{
		                    $("#ehuabi").html('2700华币');
		                }
		             }

		          }else if($(this).html()=="30天"){
		             if($("#ecity").css("display")=="block" && $("#ecity .ctext").html()!="请选择市"){
		                if($("#ecity .ctext").html()=="全省"){
		                   $("#ehuabi").html('5299华币');
		                }else{
		                    $("#ehuabi").html('2299华币');
		                }
		             }else if($("#ecity").css("display")=="none" && $("#epro .ctext").html()!="请选择省份"){
		                if($("#epro .ctext").html()=="全国"){
		                   $("#ehuabi").html('17700华币');
		                }else{
		                    $("#ehuabi").html('5299华币');
		                }
		             }
		          }
	          }
	      });
	      $("#car_list .cars").off().on("click",function(e){
	         e.stopPropagation();
	         $("#car_list .cars").removeClass("select");
	         $(this).addClass("select");
	         $("#ecarTitle").html($(this).find('.ctitle').html());
	         $("#ecarPrice").html($(this).find('.mprice').html());
	      });
	 <#--购买-->
	 	//获取url参数
           function getQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]); return null;
            }
	      $(".cbuy").off().on("click",function(e){
	         e.stopPropagation();
	         var areacode="",id=0,car_id,start_time="",day,money;
	         if($("#epro .ctext").html()=="请选择省份" && $("#ecity .ctext").html()=="请选择市"){
	            $.alertMessage.call($(this), '请选择省份');
	            $(window).scrollTop(0)
	            $("#hidePro").show();
				return;
	         }else if($("#ecity").css("display")=="block" && $("#ecity .ctext").html()=="请选择市" && $("#epro .ctext").html()!="请选择省份"){
	            $.alertMessage.call($(this), '请选择市');
	            $(window).scrollTop(0)
	            $("#hideCity").show();
				return;
	         }else{
	            if($("#epro .ctext").html()=="请选择省份"){
	              	$.alertMessage.call($(this), '请选择省份');
		            $(window).scrollTop(0)
		            $("#hidePro").show();
					return;
	            }
	         }
	         if($("#ecity").css("display")=="block" && $("#ecity .ctext").html()!="请选择市"){
	            areacode=$("#ecity .ctext").attr("data-city");
	         }else if($("#ecity").css("display")=="none" && $("#epro .ctext").html()!="请选择省份"){
	            areacode=$("#epro .ctext").attr("data-pro");
	         }
	         car_id=Number($("#car_list").find(".select").attr("data-cid"));
	         day=Number($("#edays").find(".select").attr("data_num"));
	         start_time=$("#etime").html();
	         money=Number($("#ehuabi").html().replace("华币",""));
	         <#if id??>
	         	id=${id!''};
	         	$.post('/vip/payappad.json',{id:id,car_id:car_id,type:0},function(data){
	         		var appadtyp = getQueryString("appadtype");
	         		if(appadtyp == "caraddupdate"){
		         		if(data.message=="success"){
			                     var url='/vip/myappads.htm';
						    	 $.attributeLink(url,'_self');
			            }else{
			            	 $.alertMessage.call($(this), '修改失败');
			            }
	         		}else{
		         		if(data.message=="success"){
			                 if(data.pay_state==1){
			                     var url='/vip/myappads.htm';
						    	 $.attributeLink(url,'_self');
			                 }else if(data.pay_state==0){
			                     $.alertMessage.call($(this), '购买失败，请充值华币！');
					             var url='/vip/hbrecharge.htm';
								 $.attributeLink(url,'_self');
			                 }
			            }else{
			               $.alertMessage.call($(this), '购买失败，请充值华币！');
			               var url='/vip/hbrecharge.htm';
						   $.attributeLink(url,'_self');
			            }
		            }
	            });
	         <#else>
	            $.post('/vip/payappad.json',{id:id,areacode:areacode,car_id:car_id,type:0,start_time:start_time,day:day,money:money},function(data){
		            if(data.message=="success"){
		                if(data.pay_state==1){
		                     var url='/vip/myappads.htm';
					    	 $.attributeLink(url,'_self');
		                 }else if(data.pay_state==0){
		                     $.alertMessage.call($(this), '推广失败，请充值华币！');
				             var url='/vip/hbrecharge.htm';
							 $.attributeLink(url,'_self');
		                 }
		            }else{
		               $.alertMessage.call($(this), '推广失败，请充值华币！');
		               var url='/vip/hbrecharge.htm';
					   $.attributeLink(url,'_self');
		            }
	           });
	         </#if>

	      });

         $(document).click(function(e){
           e.stopPropagation();
		   if((!$(".cbuy").is(e.target) && $(".cbuy").has(e.target).length==0)&&(!$("#epro").is(e.target) && $("#epro").has(e.target).length==0) ) {
		       		 $("#hidePro").hide();
		   }
		   if((!$(".cbuy").is(e.target) && $(".cbuy").has(e.target).length==0)&&(!$("#epro").is(e.target) && $("#epro").has(e.target).length==0)&&(!$("#ecity").is(e.target) && $("#ecity").has(e.target).length==0)) {
		       		 $("#hideCity").hide();
		   }
        });
	});
</script>
</body>
</html>
