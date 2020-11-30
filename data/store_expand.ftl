<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>店铺推广——会员中心</title>
<link href="${staticServer}/web/member_new/css/member_common.css?t=20170628" rel="stylesheet" type="text/css"/>
<link href="${staticServer}/web/member_new/css/expand.css?t=20180628" rel="stylesheet" type="text/css"/>
<script type="text/javascript">
	var CONTEXTPATH = "${contextPath}";
	var STATICSERVERUPLOAD = "${staticServerUpload}";
</script>
<#--引入相关的JS-->
<script src="${staticServer}/web/common/js/jquery/jquery.min.js" type="text/javascript"></script>
<script type="text/javascript" src="${staticServer}/web/gbpage/js/common/hx2carPages.js?t=20170725"></script>
<script type="text/javascript" src="${staticServer}/web/common/js/jquery/ajaxfileupload.js"></script>
<script type="text/javascript" src="${staticServer}/web/pc/common/pcPlug.js"></script>

<script type="text/javascript">
    var STATICSERVER='${staticServer}';
    var CONTEXTPATH='${contextPath}';
    var UPLOADRESPATH='${staticServerUpload}';
</script>
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
  	 	<a href="/vip/myappad.htm?appadtype=caradd" class="cname">车源推广</a>
  	 	<a href="/vip/myappad.htm?appadtype=shopadd" class="cname select">店铺推广</a>
  	 	<a href="/vip/myappads.htm" class="cname">我的推广</a>
  	 </div>
  	 <div class="car_con" style="z-index:20;">
  	 	<span class="ctitle">推广地区：</span>
 	 	<#if id??>
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
	  	 	<div class="cbox" id="epro"><i class="xiala">∨</i>
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
	  	 	 <div class="cbox" id="ecity" style="<#if cArea?? && (pArea?? && p?index_of(pArea.area_name) == -1) >display:block;<#else>display:none;</#if>">
		  	 	<i class="xiala">∨</i>
				<#if cArea?? && (pArea?? && p?index_of(pArea.area_name) == -1) >
					<span class="ctext" data-city="${cArea.area_code}">${cArea.area_name}</span>
				<#else>
					<span class="ctext" data-city="">请选择市</span>
			 	</#if>
				 <div class="cdropDown" style="display:none;" id="hideCity"></div>
		  	 </div>
	  	 </div>
  	   </#if>
  	 	<div class="cicon" id="cicon" ></div>
  	    <span class="cPrompt" id="citext" style="display:none;">
  	 		在推广地区（如：杭州）默认车辆列表中，提供置顶展示位，最大程度曝光选择的推广车辆（除搜索其他品牌车辆外，一直置顶）。购买成功后,可在【我的推广】中更换推广车辆。
  	 	</span>

  	 </div>
  	 <div class="car_con" style="display:<#if id??>none<#else>block</#if>;">
  	 	<span class="ctitle">温馨提示：</span>
  	 	<span id="cmess" class="cwords">${message!''}</span>
  	 </div>
     <div class="store_con">
        <span class="stitle">推广（公司）头像：</span>
        <img src="<#if photo??>${photo!''}<#else>https://img.hx2car.com/upload/resource/web/car/images/car.jpg</#if>" alt="" class="cImg" id="compantImg"/>
        <div class="cupload">
          <input type="file" id="file" name="file" class="fileImg" size="3" tabindex="3" title="支持jpg、jpeg、gif、png格式，文件小于5M"  onchange="uploadPhoto('file');">
        </div>

     </div>
  	 <div class="car_con">
  	 	<span class="ctitle">公司名称：</span>
  	 	<span class="cwords" id="scompany">${company!''}</span>
  	 </div>

     <div class="car_con">
      <span class="ctitle">公司账号：</span>
      <span class="cwords" id="saccount">${loginame!''}</span>
     </div>
      <div class="store_con">
        <span class="stitle">推广（公司）介绍：</span>
        <textarea  class="stextarea" maxlength="200" id="sintroduce">${content!''}</textarea>
      </div>
     <div <#if areacode??>style="display:block;"<#else>style="display:none;"</#if> id="carea">
	  	 <div class="car_con">
	  	 	<span class="ctitle">开始时间：</span>
	  	 	<span class="cwords" id="etime">${create!''}</span>
	  	 </div>
	  	 <div class="car_con" id="edays">
	  	 	<span class="ctitle">推广天数：${overDays}</span>
	  	 	<#if id?? && overDays??>
	  	 	    <em <#if overDays == '1'> class="cdays select"<#else> class="cdisdays"</#if> data_num="1">1天</em>
		  	 	<em <#if overDays == '3'> class="cdays select"<#else> class="cdisdays"</#if> data_num="3">3天</em>
		  	 	<em <#if overDays == '5'> class="cdays select"<#else> class="cdisdays"</#if> data_num="5">5天</em>
		  	 	<em <#if overDays == '7'> class="cdays select"<#else> class="cdisdays"</#if> data_num="7">7天</em>
		  	 	<em <#if overDays == '15'> class="cdays select"<#else> class="cdisdays"</#if> data_num="15">15天</em>
		  	 	<em <#if overDays == '30'> class="cdays select"<#else> class="cdisdays"</#if> data_num="30">30天</em>
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
	  	 	<span class="cdtishi" id="cdtishi" style="display:none;">抱歉，此时间段已被预定完  。下次早点来哦！</span>
	  	 </div>
	  	 <div class="car_con">
	  	 	<span class="ctitle">付费金额：</span>
	  	 	<span class="cHuabi" id="ehuabi">300华币</span>
	  	 </div>
	     <div class="car_buttom">
	        <span class="cbuy"><#if id??>保存<#else>立即购买</#if></span>
	     </div>
     </div>

  </div>
</div>
<@index_macro.showVipIndexFooter />
<script type="text/javascript">
	$(function(){
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
		function changeNews(areacode){
			  $.post('/vip/getStores.json',{areacode:areacode},function(data){
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
       <#--购买-->
	      $(".cbuy").off().on("click",function(e){
	         e.stopPropagation();
	         var areacode="",id=0,start_time="",day,money,explain="",photo="";
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
	         if($("#compantImg").attr("src")=="https://img.hx2car.com/upload/resource/web/car/images/car.jpg"){
	            $.alertMessage.call($(this), '请上传公司头像');
				return;
	         }
	         photo=$("#compantImg").attr("src");
	         explain=$("#sintroduce").val();
	         day=Number($("#edays").find(".select").attr("data_num"));
	         start_time=$("#etime").html();
	         money=Number($("#ehuabi").html().replace("华币",""));
	         id=${id!'0'};
	         $.post('/vip/payappad.json',{id:id,areacode:areacode,type:1,start_time:start_time,day:day,money:money,photo:photo,explain:explain},function(data){
	            if(data.message=="success"){
		              if(data.pay_state==0){
		                $.alertMessage.call($(this), '推广失败，请充值华币！');
				            var url='/vip/hbrecharge.htm';
						        $.attributeLink(url,'_self');
		             }else{
						<#if id?? && id!=0>
	                    	alert('修改成功！');
						<#else>
							alert('推广成功！');
						</#if>
	                    var url='/vip/myappads.htm';
	                    $.attributeLink(url,'_self');
                 }
	            }else{
	               $.alertMessage.call($(this), '推广失败，请充值华币！');
	               var url='/vip/hbrecharge.htm';
				         $.attributeLink(url,'_self');
	            }
	         });
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
   function uploadPhoto(id){
          $.ajaxFileUpload({
            url:CONTEXTPATH+'/weixin/upload.htm',//用于文件上传的服务器端请求地址
            secureuri:false,//一般设置为false
            fileElementId:id,//文件上传空间的id属性  <input type="file" id="file" name="file" />
            dataType: 'json',//返回值类型 一般设置为json
            success: function (data)  //服务器成功响应处理函数
            {
              var data = eval('('+data+')');
              //从服务器返回的json中取出message中的数据,其中message为在struts2中action中定义的成员变量
              if(id=='file'){
                $("#compantImg").attr("src",STATICSERVERUPLOAD+data.relativePath);
              }
            },
            error: function (data, status, e)//服务器响应失败处理函数
            {
              alert(e);
            }
      });
  }
</script>
</body>
</html>
