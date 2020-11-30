$(function(){
	jQuery.fn.detailTabChange = function(change,selected) {
		var list = $(this);
		var showId=function(){
			var tabindex = $(this).index();
			list.each(function() {
				$('#car_top span').removeClass('on');
				$(this).removeClass(selected);
				$(this.lang).hide();
			});
			var tabNow = this.lang;
			$(this).addClass(selected);
				$('#car_top span').eq(tabindex).addClass('on');
			$(tabNow).show();
		};
		$(this).unbind(). bind(change, showId);
	};
	
	$('#car_top span').click(function(){
		$tsindex = $('#car_top').find('span').index($(this));
			$('#DTitle span').eq($tsindex).click();
		$("html,body").animate({scrollTop:700},200);
	});
	
	var height = document.documentElement.clientHeight; 
	$(".unfold_PK").css("height",height-36);
	$("#A1").css("height",height);
	
	var showId=function(){
		var temp = list.parent().attr ('class') ;
		var listtab  ="";
		if(temp == "other_title2"){
			listtab = ".car_other .other_title li";
		}else{
			listtab = ".car_other .other_title2 li";
		}
		list.each(function() {
			$(this).removeClass(selected);
			$(this.lang).hide();
		});
		$(listtab).each(function() {
			$(this).removeClass(selected);
		});
		var index = $(this).index();
		var tabNow = this.lang;
		$(this).addClass(selected);
		$(listtab+":eq("+index+")").addClass(selected);
		if(tabNow!="#other_infor6"){
			$(tabNow).show();
		}
		window.location.href="#toup";
	$(this).unbind().bind(change, showId);
	};
	$(".car_other .other_title2 li").ShowTabChange("click","oth_title_on");
	$(".car_other .other_title li").ShowTabChange("click","oth_title_on");
	//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 车辆图片切换
	$("#TXiaotu li").on({
		mouseenter : function(){
			$("#TXiaotu li").removeClass("select");
			$(this).addClass("select");
			var Wimg = $(this).find("img")[0].src;
			$("#TDatu").find("img")[0].src = Wimg.replace("90_60","800_600");
		}
	});

	
	//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 加入对比
	/*$(".unfold_PK .unfold_PK_list .closed").on({
		click : function(e){
			e.stopPropagation();
    		$("#RAside").stop(true,false).animate({"right":250},300);
			$("#AUnfold>div").hide();
			$("#A3").show();
			$("#AUnfold").stop(true,false).animate({"right":0},300);

		}
    });$("#AUnfold .unfold_PK_list .closed").on({
		click : function(e){
			e.stopPropagation();
			//alert("");
    		$("#RAside").stop(true,false).animate({"right":250},300);
			$("#AUnfold>div").hide();
			$("#A3").show();
			$("#AUnfold").stop(true,false).animate({"right":0},300);
		}
    });
	*/
	

	
});



$(function() {
	
});

//、、
function getTop_on(){
	$(this).addClass("on");
};
$("#detail").bind("mouseover",getTop_on);

//足迹

	//联系人隐藏和显示
	$(function() {
		var bool = 0;
		var lxiren = document.getElementById("lxiren");
		var allren = document.getElementById("allren");
		if(lxiren!=null){
			lxiren.onclick=function(){
		    	if(bool == 0){
		    		allren.style.display = "block";
		        	bool = 1;
		    	}else{
		    		allren.style.display = "none";
		    		bool = 0;
		    	}
			};
		}
		
	}); 

//大图显示
var picsize = 0;
var picTime ="";
$(function(){
	var guanbi=function(){
		$("#pic").hide();
	};
	
	var showLargePic=function (){
		 picsize = $("#detail_pic img").length;
		if(picsize > 0){
			$("#pic").show();
			var picall="";
			var ptr="";
			var time=$("#carcreattime").val();
			if(time=="1"){
				picTime="800_600";
			}else{
				picTime="800_600";
			}
			for(var i=0;i<picsize;i++){
			 var imgurl = $("#detail_pic img:eq("+i+")").attr("data-original").replace(picTime,"90_60");
			 ptr+='<li id="focusimg_'+i+'" onclick="showimg('+i+');"><img src="'+imgurl+'"></li>';
			}
			var bigpic = $("#detail_pic img:eq(0)").attr("data-original").replace("90_60",picTime);
			
			picall='<div class="DATU_Page_cont">'+
	           '<div class="title">'+
	                '<p>'+$(".top_R h2").html()+'</p>'+
	                '<p>联系电话：'+$(".BOX_phone .num").html()+'</p>'+
	                '<span class="title_closed" id="title_closed"></span>'+
	           '</div>'+
	           '<div class="DATU">'+
			'<span class="DATUL" onclick="front();"></span>'+
			'<span class="DATU_pic" id="show_big">'+
			'<img src="'+bigpic+'"></span>'+
			'<span class="DATUR" onclick="next();"></span>'+
			'<p class="num"><em id="nowpage">1</em> / '+picsize+'</p></div>'+
	           '<div class="pic">'+
	                '<ul id="show_img">'+
	          ptr
			+'</ul></div></div>';
			$("#pic").html(picall);
			showimg(0);
			$("#title_closed").bind("click",guanbi);
		}
	};
//	$("#TDatu").bind("click",showLargePic);
	
	var showbigPic=function (){
		 var index = $(this).index();
		 $("#car_pic li").each(function(){
		 	if($(this).index() == index){
				$(this).addClass("select");
			}else{
				$(this).removeClass("select");	
			}
		 });
		 $('#big_pic img')[0].src = $("#"+this.id+" img")[0].src.replace("90_60","800_600").replace("uploadpic","bigpic");
	};
	$("#car_pic li").mouseover(showbigPic);
		
		
});

	function showimg(index){
			var ztr = $("#detail_pic img:eq("+index+")").attr("data-original");
			$('#show_big img')[0].src =ztr;
			$("#show_img li").removeClass("select");
			$("#show_img li:eq("+index+")").addClass("select");
			for(var i = 0;i<picsize;i++){
				if(Math.floor(index/8) == 0 && i< 8){
					$("#focusimg_"+i).show();
				}else if(Math.floor(index/8) == 1 && i>7 && i< 16){
					$("#focusimg_"+i).show();
				}else if(Math.floor(index/8) == 2 && i>15 && i< picsize){
					$("#focusimg_"+i).show();
				}else{
					$("#focusimg_"+i).hide();
				}
			}
			$("#nowpage").html(index+1);
	}
	function front(){
			var index = $("#show_img li").index($("#show_img li.select"));
			if(index < 1)
				return;
			index--;
			showimg(index);
	}
	function pagedown(){
		    if(picsize<=6)
				return; 
			var index = $("#show_img li").index($("#show_img li.select"));
			index=(Math.floor(index/6)+1)*6;
			if(index > picsize){
				index = picsize-1;
			}
			showimg(index);
	}
	function next(){
			var index = $("#show_img li").index($("#show_img li.select"));
			if(index > picsize-2)
				return;
			index++;
			showimg(index);
	}
	function pageup(){
			var index = $("#show_img li").index($("#show_img li.select"));
		    index=(Math.floor(index/6)-1)*6;
			if(index < 1){
				index = 0;
			}
			showimg(index);
	}
	
	
	//4s查询
	$(function(){
			$("#other_infor6").hide();
		   $("#fours .oth_title6 i").show();
		   
		    	$('body').allVerify({  //$(' ')为弹出框append位置
		            ifBtn: '#fours',  //完整的class或者id  是否需要点击弹出,默认‘’,无需点击
		            verifyCallback: getYanzCallback,  //回调函数：用户验证成功后
		            ifClosecall: false, //是否需要添加关闭回调函数
		            closeCallback: _closeCallback //回调函数：点击关闭无权限后
		        });
		    	
		    	$('body').allVerify({  //$(' ')为弹出框append位置
		            ifBtn: '.cx_4s',  //完整的class或者id  是否需要点击弹出,默认‘’,无需点击
		            verifyCallback: getYanzCallback,  //回调函数：用户验证成功后
		            ifClosecall: false, //是否需要添加关闭回调函数
		            closeCallback: _closeCallback //回调函数：点击关闭无权限后
		        });

		        //回调函数：用户验证成功后
		        function getYanzCallback(ts) {
					$(".model-4s,.model").show();
		            $("#_loginBox").hide();
		            $("#_warnShadow").hide();
		            $("#warnShadow").hide();
		            var carId=$("#simCarId").val();
				     jQuery.post('/fours/fouscarid.json',{carId:carId},function(data){
				        $("#mobile").hide();
				        $(".bg").hide();
				        $("#other_infor6").show();
				        $(".inquire_detail .list").show();
				        if(data.vin!="" && data.vin!=undefined && data.pic!=""&&data.pic!=undefined){
				          $("#vin").html('<span class="L">VIN</span><span style="line-height: 17px;height: 38px;padding-top: 10px;">'+data.vin+'</br><a id="zheng">查看原始行驶证</a></span>');
				          $("#mppic").html('<img src="'+data.pic+'"/>');
				        }
				        if(data.pic!="" && data.pic!=undefined){
				          $("#vin").html('<span class="L">VIN</span><span><a id="zheng">查看原始行驶证</a></span>');
				          $("#mppic").html('<img src="'+data.pic+'"/>');
				        }
				        if(data.vin!="" && data.vin!=undefined){
				          $("#vin").html('<span class="L">VIN</span><span>'+data.vin+'</span>');
				        }
				        
				        if(data.notify_time!=""){
				          $("#notify_time").html('<span class="L">查询日期</span><span>'+data.notify_time+'</span>');
				        }
				        if(data.car_brand!=""){
				          $("#cartype").html('<span class="L">车型</span><span>'+data.car_brand+'</span>');
				        }
				        if(data.number_of_accidents!="" &&data.number_of_accidents!="undefined"){
				          $("#number").html('<span class="L">事故维修次数</span><span>'+data.number_of_accidents+'</span>');
				        }else{
				           $("#number").html('<span class="L">事故维修次数</span><span>0</span>');
				        }
				        if(data.last_time_to_shop!="" && data.last_time_to_shop!=undefined){
				          $("#last_time").html('<span class="L">最后入店</span><span>'+data.last_time_to_shop+'</span>');
				        }
				        if(data.total_mileage!="" && data.total_mileage!=undefined){
				          $("#total_mileage").html('<span class="L">公里数</span><span>'+data.total_mileage+'</span>');
				        }else{
				          $("#total_mileage").html('<span class="L">公里数</span><span>0</span>');
				        }
				        if(data.result_description!=""){
				         $("#description").html(data.result_description);
				        }
				        if(data.pics!="" &&data.pics!=undefined){
				           var a = data.pics;
				           var listss=new Array();
				           listss=a.split(",");
				           for(var i=0;i<listss.length;i++){
				             if(listss[i]!=null && listss[i]!=""){ 
				               $("#fourspic").append('<li><img src="'+listss[i]+'"/></li>');
				             }
				           }
				        }else if(data.array!="" &&data.array!=undefined){
				        	var str = "",ln= data.array.length;
				        	for(var i = 0;i<ln;i++){
				        		var d = data.array[i];
				        		str = '<li class="fourList"><h4><span class="time">'+d.date+'</span><span class="klm">'+d.kilm+'公里</span><span class="remark">'+d.remark+'</span></h4><h5>项目</h5><ul>';
										for(var j=0;j<d.detail.length;j++){
											str+='<li>'+d.detail[j]+'</li>';
										}
										str+='</ul><h5>材料</h5><ul>';
										for(var k=0;k<d.cailiao.length;k++){
											str+='<li>'+d.cailiao[k]+'</li>';
										}
										str+='</ul></li>';
										$("#fourspic").append(str)
				        	}
				        }else{
				        $("#fourspic").append("抱歉，暂无原始记录！");
				        }
				     });
		        }
		        
		        //回调函数：点击关闭无权限后
		        function _closeCallback() {

		        }

		        //回调函数：点击关闭无权限后
		        function closeCallback(ts) {
		        }
		    	
		checkUserPhoneNum = function(pho){
				 var two=/^((13[0-9])|(17[0-9])|(14[0-9])|(15([0-3]|[5-9]))|(18([0-3]|[5-9])))+\d{8}$/;
					if(!two.test(pho)){
						return false;
					}else{
						return true;
					}
			};
			var checkinput=function(){
				var check=/^[0-9]+$/;
				if(!check.test(this.value)){
				$(this).val("");}};
			$("#checkcodes").keyup(checkinput);
			$("#phoNum").keyup(checkinput);
			
			$("#verifyCode").focus(function(){
		        $("#verifyCode").attr("value","");
				$("#t_yzm").css("color","#0CF");
				$("#t_yzm").show();
				$("#t_yzm").html("请填写验证码!");
				if($("#tishi").html()=="短信验证码发送成功!"){
					$("#btn").attr("disabled","disabled");
					$("#tishi").css("display","none");
				}else{
					$("#tishi").css("display","none");
					$("#fbtn").removeAttr("disabled");
				}
		});

		$("#shouji").focus(function(){
			if($("#tishi").html()=="短信验证码发送成功!"){
					$("#btn").attr("disabled","disabled");
					$("#tishi").css("display","none");
				}else{
					$("#tishi").css("display","none");
					$("#fbtn").removeAttr("disabled");
				}
			$("#unnum").show();
			$("#unnum").css("color","#0CF");
			$("#unnum").html("请填写电话号码！");
		});

		var mobile="";
		$("#shouji").blur(function(){
			var mob=$.trim($("#shouji").val());
			if(checkUserPhoneNum(mob)){
				mobile=mob;
				$("#unnum").show();
				$("#unnum").css("color","#f60");
				$("#unnum").html("<img src='"+STATICSERVER+"/web/user/images/user/icon_ok.gif' style='width: 15px;height: 15px;'>");
			}else{
				$("#unnum").show();
				$("#unnum").css("color","#737373");
				$("#unnum").html("手机号码不正确！");
				mobile="";
			}
		});

		$("#mclosed").click(function(){
		    $(".bg").hide();
			$("#mobile").hide();
			$("#other_infor6").hide(); 
		});
		$(".cancel").click(function(){
		    $(".bg").hide();
			$("#mobile").hide();
			$("#other_infor6").hide(); 
		});
		$("#mobilecode").focus(function(){
		    $("#jiaoyzm").show();
			$("#jiaoyzm").css("color","#0CF");
			$("#jiaoyzm").html("请填写校验码！");
			if($("#tishi").html()=="短信验证码发送成功!"){
					$("#btn").attr("disabled","disabled");
					$("#tishi").css("display","none");
				}else{
					$("#tishi").css("display","none");
					$("#fbtn").removeAttr("disabled");
				}
		    $("#mobilecode").attr("value","");
		});
		$("#mobilecode").blur(function(){
			$("#jiaoyzm").html("");
		});

		$("#fbtn").click(function(){
			var pho=$("#shouji").val();
			var verifyCode = $("#verifyCode").val();
			if(pho!=null && pho!="" && checkUserPhoneNum(pho)){
			  if(verifyCode!=null && verifyCode!=""){
				jQuery.post('/fours/foursCode.json',{mobile:pho,verifyCode:verifyCode},function(data){
					if(data.message=="短信验证码发送失败，您已超出5条!"){
						  $("#tishi").css("display","block");
						  $("#tishi").html(data.message);
						  $("#fbtn").removeAttr("disabled");
						}else if(data.message=="图片验证码错误!"){
						 $("#imgpic").click();
						 $("#t_yzm").show();
						 $("#t_yzm").html("请填写验证码!");
						 $("#t_yzm").css("color","#0CF");
						 $("#fbtn").removeAttr("disabled");
					   }else{
						  $("#tishi").css("display","block");
						  $("#tishi").html(data.message); 
						  $("#fbtn").attr("disabled","disabled");
					  }
				});
				}else{
					$("#imgpic").click();
					$("#t_yzm").show();
					$("#t_yzm").html("请填写验证码!");
					$("#t_yzm").css("color","#0CF");
					$("#fbtn").removeAttr("disabled");
			   }
			}else{
				$("#t_yzm").html("");
				$("#unnum").show();
				$("#unnum").html("请填写电话号码!");
				$("#unnum").css("color","#0CF");
				$("#fbtn").removeAttr("disabled");
			}
		});

		 $("#zheng").live("mouseover",function(){
		        $("#mppic").show();
		    }).live("mouseout",function(){
		       $("#mppic").hide();
		    });
	});
	
		
	$(function(){
		checkUserPhoneNum = function(pho){
			 var two=/^((13[0-9])|(17[0-9])|(14[0-9])|(15([0-3]|[5-9]))|(18([0-3]|[5-9])))+\d{8}$/;
				if(!two.test(pho)){
					return false;
				}else{
					return true;
				}
		};
		
		$("#getdaikuan").click(function(){
			var username = $("#x_m").val();
			var c_phone = $("#c_phone").val();
			var m_money = $("#m_money").val();
			if(username!="" && city!="" && phone!=""){
				if(checkUserPhoneNum(c_phone)){
					jQuery.post('/car/addwillloan.json',{name:username,mobile:c_phone,money:m_money},function(data){
						if(data){
							alert("贷款信息提交成功,请保持电话畅通，我们将会尽快与您取得联系");
						}else{
							alert("抱歉，系统繁忙");
						}
					});
				}else{
					alert("手机号格式不正确");
				}
			}else{
				alert("信息不能为空");
			}
			
		});
		
		$("#getdanbao").click(function(){
			var username = $("#d_m").val();
			var c_phone = $("#d_phone").val();
			var m_money = $("#d_money").val();
			if(username!="" && city!="" && phone!=""){
				if(checkUserPhoneNum(c_phone)){
					jQuery.post('/car/addwillinsurance.json',{name:username,mobile:c_phone,money:m_money},function(data){
						if(data){
							alert("担保信息提交成功,请保持电话畅通，我们将会尽快与您取得联系");
						}else{
							alert("抱歉，系统繁忙");
						}
					});
				}else{
					alert("手机号格式不正确");
				}
			}else{
				alert("信息不能为空");
			}
			
		});
	});
	
	var GiftQGFKZ=0;
	//大礼包展开或隐藏
	function GiftQGF(){
		if(GiftQGFKZ == 0){
			GiftQGFKZ=1;
			var phoneNum = $.cookie("phoneNum");
			if(null !=$.cookie("phoneNum") && $(".SList .LList .LPic span").html() != null){
				var str = '<p class="LNumber"><span>您的手机</span><input id="Codenumber" type="text" placeholder="请输入手机号" value="'+phoneNum+'"/><em style="display:none">号码错误</em></p><p class="LTip">抢购大礼包，3日内，购买车辆即可得到大礼包，礼包更替以等价礼品代替。</p><p class="LButton" id="GiftQG"  onclick="CodeYZM();">抢！抢！抢！</p>';
				$(".SList .LList").eq(0).html(str);
				$(".SList").css("height","290px");
			}
			$(".GShow .SList").eq(0).show();
		}else{
			$(".GShow .SList").eq(0).hide();
			GiftQGFKZ=0;
		}
		
	}
	//点击元素外使抢购大礼包隐藏
	$(document).bind("click",function(e){
		var target = $(e.target);
		$(".SList").attr("style");
		if(target.closest(".SList").length == 0 && target.closest(".GShow").length == 0){
			GiftQGFKZ=0;
			$(".SList").hide();
		}else{
			if(target.closest(".SList").length == 0 && target.closest(".GShow").length != 0){
				GiftQGF();
			}
		}
	});
	function GiftWCCZ(){
		$("#Codenumber").val($.cookie("phoneNum"));
		$(".GShow .SList").eq(1).hide();
		GiftQGFKZ=0;
	}
	
	$(function(){
		//判断验证是否通过
		$("#registerCodes").live("blur",function(){
			var registerCodes = $("#registerCodes").val();
			var giftid = $("#giftid").val();
			var carid = $("#simCarId").val();
			var Codenumber = $("#Codenumber").val();
			if(registerCodes != ''){
				jQuery.post('/car/registerCodes.json',{verifyCode:registerCodes,id:giftid,userid:carid,mobile:Codenumber},function(data){
					if(data){
						if(null !=data.value){
							var id = data.value;
							$("#giftvalueid_id").val(id);
						}
						if(data.message == true){
							$('.LList em').eq(1).hide();
						}else{
							$('.LList em').eq(1).show();
						}
		  			}
		  		});
			}else{
				$('.LList em').eq(1).show();
			}
		});
		$("#registerCodes").live("click",function(){
	  		$('.LList em').eq(1).hide();
	  	});
	  	$("#CodeYZM").live("click",function(){
	  		$('.LList em').eq(2).hide();
	  	});

		var num="";
		var complain=function(){
			num = getCookie('phoneNum');
			if(this.id=="huaxiahelp"){
				$("#help_huaxia").show();
				$("#input_help").val("");
			}else{$("#tousu_huaxia").show();
				    $("#input_tousu").val("");
			}
		    $(".check_all").attr("checked",false);
			$(".check_num").val(num);
			$(".warn_shadow").show();
		};
		$("#huaxiahelp").bind("click",complain);
		$("#tousu").bind("click",complain);
		$(".warn_title i").bind("click" ,function(){$("#tousu_huaxia").hide();$("#help_huaxia").hide();$(".warn_shadow").hide();});
		$(".think").bind("click",function(){$("#tousu_huaxia").hide();$("#help_huaxia").hide();$(".warn_shadow").hide();});
		
		var check_Num=function(){
			var check_one=/^[0-9]+$/;
			if(!check_one.test(this.value)){
				$(this).val("");}
		};
		$(".check_num").bind("keyup",check_Num);
		
		var input_comp=function(){
			if(this.style.color=="red"){
				$(this).val("");
				$(this).css("color","black");}
		};
		$("#input_tousu").bind("click",input_comp);
		$("#input_help").bind("click",input_comp);
		$("#mobile_num").bind("click",input_comp);
	});

		//验证手机验证码是否正确
	  	function CodeYZM(){
	  		var pho2=/^1[3|4|5|7|8]\d{9}$/;
	  		var Codenumber = $("#Codenumber").val();
	  		var CodeYZM = $("#CodeYZM").val();
	  		var id = $("#giftvalueid_id").val();
	  		var carid = $("#simCarId").val();
	  		var giftid = $("#giftid").val();
	  		if(pho2.test(Codenumber) && '' != CodeYZM){
	  			jQuery.post('/car/codeCheck.json',{registerCode:CodeYZM,mobile:Codenumber,id:id,carId:carid,giftid:giftid},function(data){
					if(data){
						if(data.message == true){
							$(".GShow .SList").hide();
							$(".GShow .SList").eq(1).show();
							$(".GShow .SList").eq(1).css("height","346px");
							$("#Codenumber").val("");
							$("#registerCodes").val("");
							$("#CodeYZM").val("");
						}else{
							$('.LList em').eq(2).show();
						}
		  			}
		  		});
	  		}
	  	}
	  	
	  	$(function(){
		//发送手机验证码
		$("#showbtn").live("click",function(){
			var pho2=/^1[3|4|5|7|8]\d{9}$/;
			$('.LList .LTel b').eq(0).html("获取验证码");
	  		var Codenumber = $("#Codenumber").val();
	  		var registerCodes = $("#registerCodes").val();
	  		if(pho2.test(Codenumber) && '' != registerCodes){
	  			jQuery.post('/car/Codemobiles.json',{verifyCode:registerCodes,mobile:Codenumber},function(data){
					if(data){
						if(data.message==true){
							getWaitsecond();
						}else{
							$('.LList .LTel b').eq(0).html("发送失败");
						}
		  			}
		  		});
	  		}else{
				$('.LList .LTel b').eq(0).html("发送失败");
	  		}
		});
	  	//短信
	  	var i=60;
		function getWaitsecond(){
			$('.LList .LTel b').eq(0).hide();
			$('.LList .LTel b').eq(1).show();
			$('.LList .LTel b').eq(1).html(''+i+'秒后再发');
			$('.LList .LTel b').eq(1).css("background-color","#b4b4b4");
			i=i-1;
			if(i==-1){
				$('.LList .LTel b').eq(0).show();
				$('.LList .LTel b').eq(1).hide();
				$('.LList .LTel b').eq(1).css("background-color","#50A5D4");
				i=60;
			}else{
				setTimeout(getWaitsecond,1000);
			}
		}
		$("#Codenumber").live("blur",function(){
			var pho2=/^1[3|4|5|7|8]\d{9}$/;
			var Codenumber = $("#Codenumber").val();
			if(Codenumber != $.cookie("phoneNum") && $(".SList .LList .LPic span").html() == null){
				var str = '<p class="LNumber"><span>您的手机</span><input id="Codenumber" type="text" placeholder="请输入手机号" value="'+Codenumber+'"/><em style="display:none">号码错误</em></p><p class="LPic"><span>图片验证码</span><input id="registerCodes" type="text" placeholder="请输入验证码" /><em style="display:none">错误</em><b><img title="点击刷新" style="height: 26px;width: 75px;" src="/servlet/yzCode.jpg" onclick="javascript:this.src=&quot;/servlet/yzCode.jpg?rnd=&quot;+Math.random();"></b></p><p class="LTel"><span>手机验证码</span><input id="CodeYZM" type="text" placeholder="请输入验证码" /><em style="display:none">错误</em><b id="showbtn" style="display:black;">获取验证码</b><b style="display:none;">0秒后再次发送</b></p><p class="LTip">抢购大礼包，3日内，购买车辆即可得到大礼包，礼包更替以等价礼品代替。</p><p class="LButton" id="GiftQG"  onclick="CodeYZM();">抢！抢！抢！</p>';
				$(".SList").css("height","346px");
				$(".SList .LList").eq(0).html(str);
			}else if(Codenumber == $.cookie("phoneNum")){
				var str = '<p class="LNumber"><span>您的手机</span><input id="Codenumber" type="text" placeholder="请输入手机号" value="'+Codenumber+'"/><em style="display:none">号码错误</em></p><p class="LTip">抢购大礼包，3日内，购买车辆即可得到大礼包，礼包更替以等价礼品代替。</p><p class="LButton" id="GiftQG"  onclick="CodeYZM();">抢！抢！抢！</p>';
				$(".SList").css("height","290px");
				$(".SList .LList").eq(0).html(str);
			}
			if(!pho2.test(Codenumber)){
				$('.LList em').eq(0).show();
			}else{
				$('.LList em').eq(0).hide();
			}
		});
	});
	  	
//点赞
$(function(){
	$("#zan").click(function(){
		jQuery.post('/car/dianzan.json',{carId:$("#simCarId").val()},function(data){
			if(data.message=="点赞成功"){
				dianzan = dianzan + 1;
				$("#zan_od").html(dianzan);
				$("#zan").hide();
				$("#zan_od").show();
			}
		});
		
	});
});

/*********placeholder问题*********/
$(function(){
	$('input').val();
    /*********placeholder问题*********/
    if (!placeholderSupport()) { // 判断浏览器是否支持 placeholder
        $('[placeholder]').focus(function() {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
                input.removeClass('placeholder');
            }
        }).blur(function() {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.addClass('placeholder');
                input.val(input.attr('placeholder'));
            }
        }).blur();
    }
});
/*placeholder*/
function placeholderSupport() {
    return 'placeholder' in document.createElement('input');
}

//我要订车
$(function(){
	var messageTitle = '出价';
	var price = $(".price span").html();
	if(price!=null){
		price=price.replace("万","");
	}
	messageContent = price,
	carId = $("#simCarId").val(),
	successSend = '我们会尽快与您联系，请耐心等待！';

	$('body').allMessage({
	    ifBtn: '#WBook',
		ifPiccode:state,
	    successOn: 'MOn', //发送成功后添加
	    successSend: successSend, //发送成功后提示内容
        successClose: 'successClose', //发送成功后关闭按钮
	    messageTitle: messageTitle, //信息标题
	    messageContent: messageContent, //信息内容
	    carId: carId,boxType :3,
	    verifyCallback: dcCallback,
	    ifClosecall: false, //是否需要添加关闭回调函数
	    closeCallback: null //回调函数：点击关闭无权限后
	});
	
	$('body').allMessage({
	    ifBtn: '#WBook2',
		ifPiccode:state,
	    successOn: 'MOn', //发送成功后添加
	    successSend: successSend, //发送成功后提示内容
        successClose: 'successClose', //发送成功后关闭按钮
	    messageTitle: messageTitle, //信息标题
	    messageContent: messageContent, //信息内容
	    carId: carId,boxType :3,
	    verifyCallback: dcCallback,
	    ifClosecall: false, //是否需要添加关闭回调函数
	    closeCallback: null //回调函数：点击关闭无权限后
	});

	//回调函数：发信息框点击提交
	function dcCallback(ts) {
	}
});


//降价通知
$(function(){
	var messageTitle = '降价通知',
	carMagess = $("#carMagess").val(),
	messageContent = "我对"+carMagess+"感兴趣，如果降价，请通知我。",
	carId = $("#simCarId").val(),
	successSend = '<img src="http://www.hx2car.com/resource/web/gbpage/images/common/messagealert.png" width="260" height="59">';

	$('body').allMessage({
	    ifBtn: '.tool_depreciate',
	    carId: carId,
	    boxType: 8,
		ifPiccode:state,
	    messageTitle: messageTitle, //信息标题
	    messageContent: messageContent, //信息内容
	    successOn: 'MOn', //发送成功后添加
        successSend: successSend, //发送成功后提示内容
        successClose: 'successClose', //发送成功后关闭按钮
	    verifyCallback: jiangjiaCallback,
	    ifClosecall: false, //是否需要添加关闭回调函数
	    closeCallback: null //回调函数：点击关闭无权限后
	});

	//回调函数：发信息框点击提交
	function jiangjiaCallback(ts) {
	}
});


//咨询底价
$(function(){
	var messageTitle = '咨询底价',
	messageContent = "亲，请您留下您的联系方式，我们收到后将在第一时间联系您！",
	carId = $("#simCarId").val(),
	successSend = '<img src="http://www.hx2car.com/resource/web/gbpage/images/common/messagealert.png" width="260" height="59">';

	$('body').allMessage({
	    ifBtn: '.tool_yuyue',
	    carId: carId,
	    boxType: 15,
        ifPiccode:state,
	    messageTitle: messageTitle, //信息标题
	    messageContent: messageContent, //信息内容
	    successOn: 'MOn', //发送成功后添加
        successSend: successSend, //发送成功后提示内容
        successClose: 'successClose', //发送成功后关闭按钮
	    verifyCallback: yyCallback,
	    ifClosecall: false, //是否需要添加关闭回调函数
	    closeCallback: null //回调函数：点击关闭无权限后
	});

	//回调函数：发信息框点击提交
	function yyCallback(ts) {
	}
});

//预约求购
$(function(){
	var messageTitle = '预约求购',
	carMagess = $("#carMagess").val(),
	messageContent = "我对"+carMagess+"感兴趣，若有同类车，请通知我。",
	carId = $("#simCarId").val(),
	successSend = '<img src="http://www.hx2car.com/resource/web/gbpage/images/common/messagealert.png" width="260" height="59">';


	$('body').allMessage({
	    ifBtn: '#yyqg',
	    carId: carId,
	    boxType: 9,
		ifPiccode:state,
	    messageTitle: messageTitle, //信息标题
	    messageContent: messageContent, //信息内容
	    successOn: 'MOn', //发送成功后添加
        successSend: successSend, //发送成功后提示内容
        successClose: 'successClose', //发送成功后关闭按钮
	    verifyCallback: qgCallback,
	    ifClosecall: false, //是否需要添加关闭回调函数
	    closeCallback: null //回调函数：点击关闭无权限后
	});

	//回调函数：发信息框点击提交
	function qgCallback(ts) {
	}
});

//预约批发
$(function(){
	var messageTitle = '预约批发',
	carMagess = $("#carMagess").val(),
	messageContent = "我对"+carMagess+"感兴趣，若有同类车，请通知我。",
	carId = $("#simCarId").val(),
	successSend = '<img src="http://www.hx2car.com/resource/web/gbpage/images/common/messagealert.png" width="260" height="59">';


	$('body').allMessage({
	    ifBtn: '#yypifa',
	    boxType: 11,
	    carId: carId,
		ifPiccode:state,
	    messageTitle: messageTitle, //信息标题
	    messageContent: messageContent, //信息内容
	    successOn: 'MOn', //发送成功后添加
        successSend: successSend, //发送成功后提示内容
        successClose: 'successClose', //发送成功后关闭按钮
	    verifyCallback: qgCallback,
	    ifClosecall: false, //是否需要添加关闭回调函数
	    closeCallback: null //回调函数：点击关闭无权限后
	});

	//回调函数：发信息框点击提交
	function qgCallback(ts) {
	}
});


//担保批发
$(function(){
	var messageTitle = '订购车辆',
	carMagess = $("#carMagess").val(),
	messageContent = "如果您对"+carMagess+"感兴趣，为了方便我们联系您，请输入您的真实姓名和联系方式。",
	carId = $("#simCarId").val(),
	successSend = '<img src="http://www.hx2car.com/resource/web/gbpage/images/common/messagealert.png" width="260" height="59">';

	$('body').allMessage({
	    ifBtn: '#db_car',
	    boxType: 12,
	    carId: carId,
		ifPiccode:state,
	    messageTitle: messageTitle, //信息标题
	    messageContent: messageContent, //信息内容
	    successOn: 'MOn', //发送成功后添加
        successSend: successSend, //发送成功后提示内容
        successClose: 'successClose', //发送成功后关闭按钮
	    verifyCallback: qgCallback,
	    ifClosecall: false, //是否需要添加关闭回调函数
	    closeCallback: null //回调函数：点击关闭无权限后
	});

	//回调函数：发信息框点击提交
	function qgCallback(ts) {
	}
});


//车辆投诉
$(function(){
	var messageTitle = '我要报错',
	messageContent = "",
	carId = $("#simCarId").val(),
	successSend = '<img src="http://www.hx2car.com/resource/web/gbpage/images/common/messagealert.png" width="260" height="59">';

	$('body').allMessage({
	    ifBtn: '.tool_jb',
	    boxType: 6,
	    carId: carId,
		ifPiccode:state,
	    messageTitle: messageTitle, //信息标题
	    messageContent: messageContent, //信息内容
	    successOn: 'MOn', //发送成功后添加
        successSend: successSend, //发送成功后提示内容
        successClose: 'successClose', //发送成功后关闭按钮
	    verifyCallback: qgCallback,
	    ifClosecall: false, //是否需要添加关闭回调函数
	    closeCallback: null //回调函数：点击关闭无权限后
	});

	//回调函数：发信息框点击提交
	function qgCallback(ts) {
	}
});

//发送短信到手机
$(function(){
	var messageTitle = '发送短信到手机',
	carMagess = $("#carMagess").val(),
	messageContent = (carMagess.replace("【","")).replace("】","，")+$("#phoNum").val(),
	carId = $("#simCarId").val(),
	successSend = '<img src="http://www.hx2car.com/resource/web/gbpage/images/common/messagealert.png" width="260" height="59">';

	$('body').allMessage({
	    ifBtn: '.tool_note',
	    boxType: 13,
	    carId: carId,
		ifPiccode:state,
	    messageTitle: messageTitle, //信息标题
	    messageContent: messageContent, //信息内容
	    message:messageContent,
	    successOn: 'MOn', //发送成功后添加
        successSend: successSend, //发送成功后提示内容
        successClose: 'successClose', //发送成功后关闭按钮
	    verifyCallback: qgCallback,
	    ifClosecall: false, //是否需要添加关闭回调函数
	    closeCallback: null //回调函数：点击关闭无权限后
	});

	//回调函数：发信息框点击提交
	function qgCallback(ts) {
	}
})

//价格走势
$(function(){
	var getChart=function(){
		var brand=$("#car_brand").val();
		var year=$("#year").val();
		if($("#info").html()==null || $("#info").html()==""){
			//drawSerial(brand,year);
			drawhighchart(brand,year);
		}
	};
	$("#TTend").bind("click",getChart);
	
	$("#car_top .tend").bind("click",getChart);
});
/*购前检测*/
$(function(){
	$('.closeIndfoBox').click(function(){
		$('.model').hide();
		$('.infoBox').hide();
	});
	$('.dTest').click(function(){
		if($.cookie('nowarn')=='1'){
			window.location.href='/examine/index.htm?id='+cid;
		}else{
			$('.model').show();
			$('.infoBox').show();
		}
	});
	$('.confirmBtn').click(function(){
		if($('#noWarn').attr('checked')=='checked'){
			$.cookie('nowarn','1',{expires:7});
		}else{
			$.cookie('nowarn',null);
		}
		window.location.href='/examine/index.htm?id='+cid;
	})
	/*3.4*/
	$('.shang').mouseover(function(){
		$(this).next().show();
    }).mouseout(function(){
        $(this).next().hide();
    })
});

//私人助理	
$(function(){
	if(flag==9){
		$(".vip").show();
    }
	var $assi_box = $('.assi_box');
	$('#assistant').click(function(){
		if($.cookie("phoneNum")) {
			$('.dis_li').hide();
			var asheight = $assi_box.height();
			$assi_box.css("marginTop",-asheight/2);
			$('.model').fadeIn();
			$assi_box.fadeIn();
			$('#assi_submit').addClass('login_type');
		} else {
			$assi_box.fadeIn();
			$('.model').fadeIn();
		}
	});
	/***关闭***/
	$('#close_assi').click(function(){
		$('.model').fadeOut();
		$assi_box.fadeOut();
	});

	//申请
	$('#assi_submit').click(function(){
		$('#warn').hide();
		var moeny = $.trim($('#moeny').val());
		var radio_assi = $('input:radio[name="assist"]:checked').val();
		var validCode = $.trim($('#validCode').val());
		var phoneCode = $.trim($('#phoneCodes').val());
		var phoneNum = $.trim($('#phoneNum').val());
		var token = radio_assi+','+'您期望的价格是'+moeny+'万元';
		if(!radio_assi) {
    		showError('请选择单选!');
        }else if(!moeny) {
        	showError('请填写期望价格!');
        }else {
			if(!$(this).hasClass('login_type')) {
				if (!phoneNum){
					showError('请填写电话号码!');
				}else if (!validCode){
	        		showError('请填写图片验证码!');
		        }else if(!phoneCode) {
					showError('请填写手机验证码!');
		        }else{
		        	$.post('/code/codenum.json', { Number: phoneNum, Code: phoneCode}, function(data) {
				        if (data.message == '短信验证成功') {
				            $.post('/require/commonrequire.json',{
				            		Type : 20,
				            		CarId : cid,
				            		Msg : token,
				            		Price : moeny,
				            		Number : phoneNum
				            	},function(data){
								if(data.star == 2){//用户是会员
									$assi_box.hide();
									$('.wechat').fadeIn();
								}else if(data.star == 0) {//用户非会员
									$assi_box.hide();
									$('.verify').fadeIn();
									$('.pho').html($.cookie("phoneNum"));
								}
							});
				        } else {
				        	$("#warn").show();
				        	$("#warn").html('短信验证码错误');
				        }
				   });
		        }
		    } else {
		    	$.post('/require/commonrequire.json',{
		    		Type : 20,
            		CarId : cid,
            		Msg : token,
            		Price : moeny,
            		Number : $.cookie("phoneNum")
		    	},function(data){
					if(data.star == 2){//用户是会员
						$assi_box.hide();
						$('.wechat').fadeIn();
					}else if(data.star == 0) {//用户非会员
						$assi_box.hide();
						/*$('.wechat').fadeIn();*/
						$('.verify').fadeIn();
						$('.pho').html($.cookie("phoneNum"));
					}
				});
		    }
        }
	});
	
	//重新获取验证码的等待时间
	function waitTime(wait){
	    if(wait > 0){
	        $(".getPhoneCode").html("重新获取("+wait+")");
	        setTimeout(function(){
	            wait = wait - 1;
	            waitTime(wait);
	        },1000);
	    } else {
	        $(".getPhoneCode").on("click", getPhoneCode);
	        $(".getPhoneCode").html("获取验证码");
	        //更换验证码
	        $(".codePic").click();
	    }
	}


	$('.getPhoneCode').on("click", getPhoneCode);
	function showError(text){
	    $('#warn').html(text).show();
	}
	function getPhoneCode(){
	    var mobile = $.trim($('.phoneNum').val());
	    var validCode = $.trim($('.validCode').val());
	    if(!mobile || !/^1[3|4|5|7|8][0-9]\d{8}$/.test(mobile)){
	        showError('请填写正确的手机号!');
	    }else if(!validCode || validCode.length != 4){
	        showError('请填写正确的图片验证码!');
	    }else{
	        $.post(
	            '/code/codephones.json',
	            {
	                Number: mobile,
	                verifyCode: validCode
	            },
	            function(data){
	                if(data.message == "图片验证码错误!"){
	                    showError("请填写正确的图片验证码！");
	                    $(".codePic").click();//更换图片验证码
	                }else if(data.message == "短信发送成功"){
	                    showError("验证码已发送，您注意查收");
	                    $(".getPhoneCode").off("click");
	                    var wait = 60;
	                    waitTime(wait);
	                }else if(data.message == "短信验证码发送失败，您已超过五条!"){
	                    showError("你今天的短信次数已达上限，请明天再试!");
	                    $(".codePic").click();//更换图片验证码
	                }
	            }
	        )
	    }
	}
	//点击开通按钮
	$('.open').click(function(){
		$('#ao1').html("号码：" + $.cookie("phoneNum"));
        $('#ao1').attr("value", $.cookie("phoneNum"));
        $("#vipMoney").attr("value", 299);
        $('.vip').fadeIn();
		$('.verify').hide();
	});

	/******充值********/
	$("#zhifu li").each(function () {
        $(this).click(function () {
            $("#zhifu li").removeClass('select');
            $("#zhifu").find('i').hide();
            $(this).addClass('select');
            $(this).find('i').show();
        });
    });
	var acno = null;
	$("#openVip").click(function () {
		var sumb = 1;
        if (sumb == 1) {
            sumb = 0;
            var money = $.trim($('#vipMoney').val());
            var num = $.trim($('#ao1').attr('value'));
            var pho2 = /^1[3|4|5|7|8]\d{9}$/;
            if (pho2.test(num)) {
                var typeid = "";
                if (money == money) {
                    typeid = 12;
                } 
                if ($('#zhifu li').eq(0).attr("class") == "select") {
                    jQuery.post('/mobile/weixinQR.json', {
                        money: 299,
                        rechargetype: 1,
                        flag: "pc",
                        mobile: num,
                        childtype: "appvippersonal",
                        typeId: typeid
                    }, function (data) {
                        if (data) {
                            if (data.message != null) {
                                alert(data.message);
                                sumb = 1;
                                return false;
                            }
                            //微信支付弹窗 必要参数二维码地址及轮询id
								$(this).wxpay({
								code_url:data.code_url,
								prepay_id:data.prepay_id,
								acno:data.acno,
								intervalCallback:intervalCallback,
								showCallback:showCallback,
								closeCallback:closeCallback
								});
                            
                            //acno = data.acno;
//                          $("#wechatpay").attr("src", "http://www.hx2car.com/servlet/WeChatQr.jpg?QRurl=" + data.code_url);
//                          $("#service").show();
//                          $('.buy_money').hide();
//                          $('.pay_way').hide();
//                          getacno(data.aceo);
                        }
                    });
                }
                if ($('#zhifu li').eq(1).attr("class") == "select") {
                    window.location.href = "/money/submitmember.htm?money=" + money + "&rechargetype=1&childtype=personal,"+cid+"&mobile=" + num + "&typeId=" + typeid;
                }
            }
        }
    });

    function getacno(acno) {
        jQuery.post('/mobile/xjrechargeres.json', {out_trade_no: acno}, 
        	function (data) {
            if (data) {
                if (data.message == 'success') {
                    $(".vip").hide();
                    $(".wechat").show();//换成微信弹框
                } else {
                    setTimeout(getacno, 1000);
                }
            }
        });
    }
    function intervalCallback(acno){
    	jQuery.post('/mobile/xjrechargeres.json', {out_trade_no: acno}, 
        	function (data) {
            if (data) {
                if (data.message == 'success') {
                	$(".pay_close").click()
                    //$(".vip").hide();
                   $(".wechat").show();//换成微信弹框
                }
            }
        });
    }
    function closeCallback(){
    	$('.model').hide();
    }
    
    function showCallback(){
    	$(".vip").hide();
    }
    
    /***关闭微信支付窗口***/
    $('#winXiclose').click(function(){
    	$('.wechat').hide();
    	$('.vip').hide();
    	$('.model').fadeOut();
    });
    
	$('.re_login').click(function(){
		$('.verify').hide();
		$('.model').fadeOut();
	});

	$('.vip .assi_title .close').click(function(){
		$('.vip').hide();
		$('.model').fadeOut();
	});
	$('.verify .assi_title .close').click(function(){
		$('.verify').hide();
		$('.model').fadeOut();
	});
	$('.look').click(function(){
		$('.personalNote').show();
		$('.model').fadeIn();
		$('.vip').hide();
		$('.wechat').hide();
	});
	$('#memberInfo').click(function(){
		$('.personalNote').hide();
		$('.model').fadeOut();
	});
	$('.pClose').click(function(){
		$('.personalNote').hide();
		$('.model').fadeOut();
	});
	//小图箭头点击
	$(".leftBtn").click(function(){
		var i = $("#TXiaotu ").find(".select").removeClass("select").index("#TXiaotu li");
		i--;
		if(i<0)i=0;
		var $li = $("#TXiaotu li").eq(i).addClass("select");
		var Wimg = $li.find("img")[0].src;
		$("#TDatu").find("img")[0].src = Wimg.replace("90_60","800_600");
		var l = $li.offset().left;
		if(l>318)
		return false
		
		var left = $("#TXiaotu").position().left+116;
		if(left>0)left=0;
		 $("#TXiaotu").css("left",left+'px')
	})
	$(".rightBtn").click(function(){
		var length = $("#TXiaotu li").length;
		var i = $("#TXiaotu ").find(".select").removeClass("select").index("#TXiaotu li");
		i++;
		if(i>=length-1)i=length-1;
		var $li = $("#TXiaotu li").eq(i).addClass("select");
		var Wimg = $li.find("img")[0].src;
		$("#TDatu").find("img")[0].src = Wimg.replace("90_60","800_600");
		var l = $li.offset().left;
		if(l<782)
		return false		
	
		var left = $("#TXiaotu").position().left-116;
		if(left<(4-length)*116)
		left=(4-length)*116;
		if(length<=4)
		left=0;
		 $("#TXiaotu").css("left",left+'px');
	})
	$('.xtWarp i').hover(function(){
		$(this).addClass("xtHover");
	},function(){
		$(this).removeClass("xtHover");
	})
	
	//新车配置导航
	var height = $(window).height();
	if(height<800)$('body').addClass("h800");
	var NewcarNavT=[];
	$(".NewcarBox .sizes").each(function(){
		NewcarNavT.push($(this).offset().top);
	})
	$(".NewcarNav li").mouseenter(function(){
		$(this).addClass("hover").siblings().removeClass("hover");
		var i = $(this).index();
		var boxtop = $(".NewcarBox").offset().top;
		var top = NewcarNavT[i]-boxtop;
		$(".NewcarBox").stop().animate({
			scrollTop:top
		},200);
	})
	$('.myModel .close').click(function(){
		$(".myModel,.model").hide();
	});
	$('.showStateBox').click(function(){
		$(".NewcarModel,.model").show();
		NewcarNavT=[];
		$(".NewcarBox").scrollTop(0);
		$(".NewcarBox .sizes").each(function(){
		NewcarNavT.push($(this).offset().top);
	})
	});
	//价格趋势verify_person
	$('#TTend').click(function(){
		$(".costModel,.model").show();
	})
	
	//4s
//	$('#fours').click(function(){
//		$(".model-4s,.model").show();
//		
//	})
	
	//商家认证
	$('#showicbc').click(function(){
		$(".model-icbc,.model").show();
	})
	
	//wx分享
	$('.showWx').click(function(){
		$(".model-wx,.model").show();
	})
	
//	分享
$('.tool_noteBox').hover(function(){
	$(".shareModel").removeClass('hide').animate({height:'208px'},200);
},function(){
	$(".shareModel").animate({height:'0px'},200,function(){
		$(".shareModel").addClass('hide')
	});
})

	car_share();
//分享事件
function car_share(e) {
		//prevent_bubble(e);
		//	获取当前需要分享的相关内容
		var $car = $(this).parents(".cars_list");
		var bdDesc =  $('.top_R h2').text();
		BDDesc = bdDesc;
		var bdUrl = "http://www.hx2car.com/details/" + $('#simCarId').val();
		BDUrl = bdUrl;
		var bdPic = $("#TDatu img").attr("src");
		BDPic = bdPic;
		window._bd_share_config = {
			common: {
				//自定义分享内容
				bdText: BDDesc,
				//自定义分享摘要
				bdDesc: "",
				//自定义分享url地址
				bdUrl: BDUrl,
				//自定义分享图片
				bdPic: BDPic
			},
			share: [{
				"bdSize": 16
			}]
			
		}
		with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5)];
	}
//根据屏幕宽度显示不同样式
	function getWidth(){
		var  width = $(window).width();
		if(width<1500){
			$('body').addClass("w1130");
		}else{
			$('body').removeClass("w1130");
		}
	}
	getWidth();
	$(window).resize(getWidth);
	
	
	$(".jiage").each(function(){
		if($(this).text().indexOf("面议")>0)
		$(this).html('<span class="bigFont">面议</span>');
	})
	
	madeCode();
	function madeCode(){
		//生成二维码

				var DEFAULT_VERSION = "9.0";
				var ua = navigator.userAgent.toLowerCase();
				var isIE = ua.indexOf("msie") > -1;
				var safariVersion;
				var url = 'http://m.hx2car.com/details/'+$("#simCarId").val();
				if(isIE) {
					safariVersion = ua.match(/msie ([\d.]+)/)[1];
				}
				if(safariVersion <= DEFAULT_VERSION) {
					//ie8;
					$('.codeBox img').show();
				} else {
					$('#dCode').empty();
					var qrcode = new QRCode('dCode', {
						text: url,
						width: 185,
						height: 185,
						correctLevel: QRCode.CorrectLevel.H
					});
				}
	}
	
	//加载同类型车辆

	var alikeFlag = 1;
	var oldSta = $("#oldSta").val();
	if(oldSta){
		$(window).scroll(function() {
            var range = $(document).scrollTop();
            var how = $(".selectBox").offset().top-300;
           
            if (range > how  && alikeFlag ) {
            	alikeFlag=0;
            var money = $('.bigFont').eq(0).text();
            var year= $("#dateH").val();
            var brandStr = $("#brandStrH").val();
            var kind = $("#kindH").val();
			getAlikeData('#tjg',{money:money,priceStr:'money'},'/car/getsimcar.json','carsmoney');
			getAlikeData('#tpp',{titile:brandStr,brandStr:'brand'},'/car/getsimcar.json','carsbrand');
			getAlikeData('#txh',{carKind:kind,carKindStr:'kind'},'/car/getsimcar.json','carsserial');
			getAlikeData('#tnf',{usedate:year,yearStr:'year'},'/car/getsimcar.json','carsyear');
            }
        });
	}
	function getAlikeData(id,data,url,listname){
		$.ajax({
			type:"get",
			url:url,
			data:data,
			async:true,
			success:function(dat){
				var str = '';
				
				if(dat[listname]!=undefined){
				var length = dat[listname].length;
					for (var i=0;i<length;i++) {
						var d= dat[listname][i];
						var src = "http://img.hx2cars.com/upload"+(d.firstSmallPic || '/image/20170616/small/400_300.jpg').replace('90_60',"400_300");
						var money = d.money;
						if(money=="" || money==0 || money=="面议"){
							money = '<span class="bigFont">面议</span>';
						}else{
							money = '￥<span class="bigFont">'+money+'</span>万'
						}
							str += '<li><a target="_blank" href="/car/cardetail.htm?id=' + d.id+'">';
							str +='<img src="' + src + '" alt="' + d.title + '图片" /></a>';
							str += '<p class="title"><a target="_blank" href="/car/cardetail.htm?id=' + d.id;
							str += '"title="' + (d.areaName + d.usedate + d.title) + '">';
							str += d.usedate + d.title + '</a></p>';
							str += '<p><span class="diqu">' + d.location + '</span>';
							str += '<span class="jiage">' + money + '<span></p></li>';
                         
					}
					$(id).find('ul').append(str);
				}
			}
		});
	}
				
});

