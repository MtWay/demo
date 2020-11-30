$(function(){
	var CHECK_URL = CONTEXTPATH+'/user/registerCheck.json';
	
	var password1="",password2="",password="",mobile="",username="",province="",city="",areaCode="",registerCode="",
		gender="",company="",shotintroduction="",address="",phone="";
	
	$("#login_name").click(function(){
		$("#loginnameMsg").removeClass();
		$("#loginnameMsg").addClass("tishi1");
		$("#loginnameMsg").html("4-20个字母或数字，一旦注册，登录名不可修改");
		$("#loginnameMsg").show();
	});
	$("#login_name").blur(function(){
		var loginname=$.trim($("#login_name").val());
		if(loginname == ""){
			$("#loginnameMsg").removeClass();
			$("#loginnameMsg").addClass("tishi2");
			$("#loginnameMsg").html("用户名不能为空");
			$("#login_name").val("");
		}else{
			var t=/^[A-Za-z0-9]+$/;
			if(loginname.length<4||loginname.length>20){
				$("#loginnameMsg").removeClass();
				$("#loginnameMsg").addClass("tishi2");
				$("#loginnameMsg").html("用户名长度应为4-20位字符");
				$("#login_name").val("");
			}else if(!t.test(loginname)){
				$("#loginnameMsg").removeClass();
				$("#loginnameMsg").addClass("tishi2");
				$("#loginnameMsg").html("不能包含数字和英文字母以外的字符");
				$("#login_name").val("");
			}else{
			jQuery.post(CHECK_URL,{checkType:1,loginname:loginname,_r:new Date().getTime()},function(data){
				if(data) {
					if(data.code==1){
						if(data.registerVo.isCheckPass==1){
							$("#loginnameMsg").removeClass();
							$("#loginnameMsg").html("<img src='"+STATICSERVER+"/web/user/images/user/icon_ok.gif' style='margin-top: 15px;'>");
							$("#login_name").val(loginname);
						}else{
							$("#loginnameMsg").removeClass();
							$("#loginnameMsg").addClass("tishi2");
							$("#loginnameMsg").html(data.registerVo.checkMessage);
							$("#login_name").val("");
						}
					}
				}
			});
		}
		}
	});
	
	$("#password1").focus(function(){
		$("#passwordMsg").removeClass();
		$("#passwordMsg").addClass("tishi1");
		$("#passwordMsg").html("密码由6-20个英文字母（区分大小写）或数字组成");
		$("#passwordMsg").show();
	});
	
	$("#password1").blur(function(){
		password1 = $.trim($("#password1").val());
		var t=/^[A-Za-z0-9]+$/;
		if(password1.length<6||password1.length>20){
			password="";
			$("#passwordMsg").removeClass();
			$("#passwordMsg").addClass("tishi2");
			$("#passwordMsg").html("密码长度应为6-20位字符");
			$("#passwordMsg").show();
		}else if(!t.test(password1)){
			password="";
			$("#passwordMsg").removeClass();
			$("#passwordMsg").addClass("tishi2");
			$("#passwordMsg").html("不能包含数字和英文字母以外的字符");
			$("#passwordMsg").show();
		}else{
			$("#passwordMsg").removeClass();
			$("#passwordMsg").html("<img src='"+STATICSERVER+"/web/user/images/user/icon_ok.gif' style='margin-top: 15px;'>");
			$("#passwordMsg").show();
		}
	});
	$("#password2").focus(function(){
		$("#passwordMsg2").removeClass();
		$("#passwordMsg2").addClass("tishi1");
		$("#passwordMsg2").html("记得再输一次密码");
		$("#passwordMsg2").show();
	});
	
	$("#password2").blur(function(){
		password2 = $.trim($("#password2").val());
		if(password2 != "" && password2 == password1){
			password=password1;
			$("#passwordMsg2").removeClass();
			$("#passwordMsg2").html("<img src='"+STATICSERVER+"/web/user/images/user/icon_ok.gif' style='margin-top: 15px;'>");
			$("#passwordMsg2").show();
		}else{
			$("#passwordMsg2").removeClass();
			$("#passwordMsg2").addClass("tishi2");
			$("#passwordMsg2").html("确认密码不一致");
			password="";
		}
	});
	
	$("#mobile").focus(function(){
		$("#phoneMsg").removeClass();
		$("#phoneMsg").addClass("tishi1");
		$("#phoneMsg").html("电话是客户和您联系的重要方式");
		$("#phoneMsg").show();
	});
	var checkinput=function(){
		var check=/^[0-9]+$/;
		if(!check.test(this.value)){
		$(this).val("");
		}
	};
	$("#mobile").keyup(checkinput);

$("#mobile").blur(function(){
		var mob=$.trim($("#mobile").val());
		if(checkUserPhoneNum(mob)){
			mobile=mob;
			$("#phoneMsg").removeClass();
			$("#phoneMsg").html("<img src='"+STATICSERVER+"/web/user/images/user/icon_ok.gif' style='margin-top: 15px;'>");
			$("#phoneMsg").show();
		}else{
			$("#phoneMsg").removeClass();
			$("#phoneMsg").addClass("tishi2");
			$("#phoneMsg").html("手机号码不正确");
			mobile="";
		}
	});
	$("#company").blur(function(){
		var company=$.trim($("#company").val());
		if(company !=""){
			$("#companyMsg").removeClass();
			$("#companyMsg").html("<img src='"+STATICSERVER+"/web/user/images/user/icon_ok.gif' style='margin-top: 15px;'>");
			$("#companyMsg").show();
		}else{
			$("#companyMsg").removeClass();
			$("#companyMsg").addClass("tishi2");
			company="";
		}
	});
	$("#company").focus(function(){
		$("#companyMsg").removeClass();
		$("#companyMsg").addClass("tishi1");
		$("#companyMsg").show();
	});
	
	
	
	$("#btn").click(function(){
		var verifyCode = $("#verifyCode").val();
		if(verifyCode==""){
			$("#verifyMsg").removeClass();
			$("#verifyMsg").addClass("tishi2");
			$("#verifyMsg").html("图片验证码不能为空！");
			$("#verifyMsg").show();
			return;
		}
		if(mobile != ""){
			$("#codeMsg").hide();
			$("#verifyMsg").hide();
			jQuery.post('/user/registerCode.json',{mobile:mobile,verifyCode:verifyCode},function(data){
				if(data.message){
					if(data.message=="短信发送已超过五条"){
						$("#verifyMsg").removeClass();
						$("#verifyMsg").addClass("tishi2");
						$("#verifyMsg").html("短信发送已超过五条！");
						$(".Button2 > img[onclick]").attr("src","/servlet/yzCode.jpg?rnd="+Math.random());
						$("#verifyMsg").show();
					}else{
						$("#codeMsg").removeClass();
						$("#codeMsg").addClass("tishi1");
						$("#codeMsg").html("短信验证码已发送,5分钟内有效！");
						$("#codeMsg").show();
						getWaitsecond();
					}
				}else{
					$("#verifyMsg").removeClass();
					$("#verifyMsg").addClass("tishi2");
					$("#verifyMsg").html("图片验证码错误！");
					$(".Button2 > img[onclick]").attr("src","/servlet/yzCode.jpg?rnd="+Math.random());
					$("#verifyMsg").show();
				}
			});
		}else{
			$("#phoneMsg").removeClass();
			$("#phoneMsg").addClass("tishi2");
			$("#phoneMsg").html("手机号码不正确");
			$("#phoneMsg").show();
		}
	});
	
	var i=60;
	function getWaitsecond(){
	$("#btn").hide();
	$("#showBtn").show();
	$("#showBtn").html(''+i+'秒后再发');
	i=i-1;
	if(i==-1){
		$("#btn").show();
		$("#showBtn").hide();i=60;
	}else{
		setTimeout(getWaitsecond,1000);}
	}

	$("#verifyCode").focus(function(){
		var temp = $("#verifyMsg").text();
		if(temp != "请填写图片验证码"){
			$("#verifyMsg").removeClass();
			$("#verifyMsg").addClass("tishi1");
			$("#verifyMsg").html("请填写图片验证码");
			$("#verifyMsg").show();
		}
	});
	
	$("#mobilecode").focus(function(){
		var temp = $("#codeMsg").text();
		if(temp != "短信验证码已发送,5分钟内有效！"){
			$("#codeMsg").removeClass();
			$("#codeMsg").addClass("tishi1");
			$("#codeMsg").html("请填写验证码");
			$("#codeMsg").show();
		}
	});
	$("#mobilecode").blur(function(){
		var mobilecode = $.trim($("#mobilecode").val());
		if(mobilecode != ""){
			registerCode = mobilecode;
			$("#mobile1").val(mobile);
			$("#codeMsg").removeClass();
			$("#codeMsg").hide();
		}else{
			$("#codeMsg").removeClass();
			$("#codeMsg").addClass("tishi2");
			$("#codeMsg").html("验证码不能为空！");
			$("#codeMsg").show();
			registerCode = "";
		}
	});
	
	$("#username").focus(function(){
		$("#userMsg").removeClass();
		$("#userMsg").addClass("tishi1");
		$("#userMsg").html("建议使用真实姓名，方便联系");
		$("#userMsg").show();
	});
	$("#username").blur(function(){
		var name=$.trim($("#username").val());
		if(name != ""){
			username=name;
			$("#userMsg").removeClass();
			$("#userMsg").html("<img src='"+STATICSERVER+"/web/user/images/user/icon_ok.gif' style='margin-top: 15px;'>");
			$("#userMsg").show();
		}else{
			username="";
			$("#userMsg").removeClass();
			$("#userMsg").addClass("tishi2");
			$("#userMsg").html("联系人不能为空");
			$("#userMsg").show();
		}
	});
	
	$("#inputpro").click(function(e){
		e.stopPropagation();
		$("#pro").show();
		$("#cy").hide();
		$("#ar").hide();
	});
	$("#pro p").click(function(){
		$("#pro p").removeClass("select");
		$(this).addClass("select");
		$("#province").html($(this).text());
		province=$(this).text();
		var areacode=$(this).attr("id");
		jQuery.post('/user/getChildrenAreasByCode.json',{province:areacode},function(data){
			if(data){
				$("#cy").html("");
				$("#city").html("选择城市");
				$("#pro").hide();
				$("#cy").show();
				var temp="";
				for(var i=0;i<data.areaList.length;i++){
					temp+=("<p id='"+data.areaList[i].area_code+"'>"+data.areaList[i].area_name+"</p>");
				}
				$("#cy").html(temp);
				$("#cy").find("p").click(selectCity);
			}
		});
		$("#areaMsg").removeClass();
		$("#areaMsg").addClass("tishi1");
		$("#areaMsg").html("请填写所在地！");
		$("#areaMsg").hide();
	});
	
	$("#inputcy").click(function(e){
		e.stopPropagation();
		$("#cy").show();
		$("#pro").hide();
		$("#ar").hide();
		$("#areaMsg").removeClass();
		$("#areaMsg").addClass("tishi1");
		$("#areaMsg").html("请填写所在地！");
		$("#areaMsg").hide();
	});
	
	selectCity = function(e){
		e.stopPropagation();
		$("#cy p").removeClass("select");
		$(this).addClass("select");
		$("#city").html($(this).text());
		city=$(this).text();
		areaCode=$(this).attr("id");
		jQuery.post('/user/getChildrenAreasByCode.json',{province:areaCode},function(data){
			if(data){
				$("#ar").html("");
				$("#area").html("选择地区");
				$("#cy").hide();
				$("#ar").show();
				var temp="";
				for(var i=0;i<data.areaList.length;i++){
					var area_name=data.areaList[i].area_name;
					if(area_name==""){
						area_name="市辖区";
					}
					temp+=("<p id='"+data.areaList[i].area_code+"'>"+area_name+"</p>");
				}
				$("#ar").html(temp);
				$("#ar").find("p").click(selectArea);
			}
		});
		$("#cy").hide();
	};
	
	selectArea = function(e){
		e.stopPropagation();
		$("#ar p").removeClass("select");
		$(this).addClass("select");
		$("#area").html($(this).text());
		areaCode=$(this).attr("id");
		$("#ar").hide();
	};
	
	$("#inputarea").click(function(e){
		e.stopPropagation();
		$("#ar").show();
		$("#cy").hide();
		$("#pro").hide();
		$("#areaMsg").removeClass();
		$("#areaMsg").addClass("tishi1");
		$("#areaMsg").html("请填写所在地！");
		$("#areaMsg").hide();
	});
	
	var k=5;
	function regWait(){
	$("#register").hide();
	$("#register1").show();
	k=k-1;
	if(k==-1){
		$("#register").show();$("#register1").hide();k=5;
	}else{
		setTimeout(regWait,1000);}
	}
	$("#checkbox1").click(function(){
		if($("#checkbox1").attr("checked")=="checked"){
			$("#register").show();$("#register1").hide();
		}else{
			$("#register").hide();$("#register1").show();
		}
	});
	
	$("#register").click(function(){
		mobile=$("#mobile1").val();
		if(mobile == ""){
			$("#phoneMsg").removeClass();
			$("#phoneMsg").addClass("tishi2");
			$("#phoneMsg").html("手机号不正确！");
			$("#phoneMsg").show();
			$("#mobile1").val("");
		}else if(registerCode==""){
			$("#codeMsg").removeClass();
			$("#codeMsg").addClass("tishi2");
			$("#codeMsg").html("验证码不能为空！");
			$("#codeMsg").show();
			registerCode = "";
		}else if(username==""){
			username="";
			$("#userMsg").removeClass();
			$("#userMsg").addClass("tishi2");
			$("#userMsg").html("联系人不能为空");
			$("#userMsg").show();
		}else {
				$("#flow1").addClass("hide");
					$("#flow2").removeClass("hide");
					$("#a2,#sp2").addClass("select");
		}
				$("#flow1").addClass("hide");
					$("#flow2").removeClass("hide");
					$("#a2,#sp2").addClass("select");
	})
	
	$("#btn2").click(function(){
		var login_name = $("#login_name").val();
		if(login_name==""){
			$("#loginnameMsg").removeClass();
			$("#loginnameMsg").addClass("tishi2");
			$("#loginnameMsg").html("用户名不正确！");
			$("#loginnameMsg").show();
			$("#login_name").val("");
		}else if(password1=="" && password==""){
			password="";
			$("#passwordMsg").removeClass();
			$("#passwordMsg").addClass("tishi2");
			$("#passwordMsg").html("密码不正确！");
			$("#passwordMsg").show();
		}else if(password2==""){
			password="";
			$("#passwordMsg2").removeClass();
			$("#passwordMsg2").addClass("tishi2");
			$("#passwordMsg2").html("确认密码不正确！");
			$("#passwordMsg2").show();
		}else if(company==""){
			$("#companyMsg").removeClass();
			$("#companyMsg").addClass("tishi2");
			$("#companyMsg").show();
		}else if(province == "" || city =="" || areaCode == ""){
			$("#areaMsg").removeClass();
			$("#areaMsg").addClass("tishi2");
			$("#areaMsg").html("请填写所在地！");
			$("#areaMsg").show();
		}else{
			regWait();
			jQuery.post('/user/newRegister.json',{loginname:login_name,password:hex_md5(password),mobile:mobile,registerCode:registerCode,username:username,province:province,city:city,areaCode:areaCode},
					function(data){
						if(!data.flag){
							alert(data.msg);
						}else{
							$("#a2").addClass("select");
							$("#sp2").addClass("select");
							$("#flow2").addClass("hide")
							$("#flow3").removeClass("hide");
						}
					});
		}
	});
	
	
	$(document).click(function(){
		$("#pro").hide();
		$("#cy").hide();
		$("#ar").hide();
	});
	checkUserPhoneNum = function(pho){
		 var two=/^((13[0-9])|(17[0-9])|(14[0-9])|(15([0-3]|[5-9]))|(18([0-3]|[5-9])))+\d{8}$/;
			if(!two.test(pho)){
				return false;
			}else{
				return true;
			}
	 };
	 
	 $("#btn2").click(function(){
		 var login_name=$("#login_name").val();
		 gender=$("input[name='gender']:checked").val();
		 company=$.trim($("#company").val());
		 shotintroduction=$.trim($("#introduction").val());
		 address=$.trim($("#address").val());
		 phone=$.trim($("#phone").val());
		jQuery.post('/user/updateRegister.json',{loginname:login_name,gender:gender,company:company,shotintroduction:shotintroduction,address:address,phone:phone},
			function(data){
			 	if(data.flag==-1){
			 		alert("信息更新失败！");
			 	}else{
			 		$("#a1").removeClass("select");
					$("#sp1").removeClass("select");
					$("#a2").removeClass("select");
					$("#sp2").removeClass("select");
					$("#a3").addClass("select");
					$("#sp3").addClass("select");
					
					$("#flow1").hide();
					$("#flow2").hide();
					$("#flow3").show();
					$("#logName").html(login_name);
			 	}
		 	});
	 });
	 
	 
//	 ////根据areacode定位所在地
//	 var proCode=(CODE.substr(0,2))+"0000",cityCode=(CODE.substr(0,4))+"00";
//	 $.each($("#pro p"),function(){
//		 if($(this).attr("id") == proCode){
//			 	$("#pro p").removeClass("select");
//				$(this).addClass("select");
//				$("#province").html($(this).text());
//				province=$(this).text();
//				jQuery.post('/user/getChildrenAreasByCode.json',{province:proCode},function(data){
//					if(data){
//						$("#cy").html("");
//						var temp="";
//						for(var i=0;i<data.areaList.length;i++){
//							if(data.areaList[i].area_code == cityCode){
//								temp+=("<p id='"+data.areaList[i].area_code+"' class='select'>"+data.areaList[i].area_name+"</p>");
//								$("#city").html(data.areaList[i].area_name);
//								city=data.areaList[i].area_name;
//							}else{
//								temp+=("<p id='"+data.areaList[i].area_code+"'>"+data.areaList[i].area_name+"</p>");
//							}
//						}
//						$("#cy").html(temp);
//						$("#cy").find("p").click(selectCity);
//					}
//				});
//				jQuery.post('/user/getChildrenAreasByCode.json',{province:cityCode},function(data){
//					if(data){
//						$("#ar").html("");
//						var temp="";
//						for(var i=0;i<data.areaList.length;i++){
//							var area_name=data.areaList[i].area_name;
//							if(area_name==""){
//								area_name="市辖区";
//							}
//							if(data.areaList[i].area_code == CODE){
//								temp+=("<p id='"+data.areaList[i].area_code+"' class='select'>"+area_name+"</p>");
//								$("#area").html(area_name);
//								areaCode=CODE;
//							}else{
//								temp+=("<p id='"+data.areaList[i].area_code+"'>"+area_name+"</p>");
//							}
//						}
//						$("#ar").html(temp);
//						$("#ar").find("p").click(selectArea);
//					}
//				});
//		 }
//	 });
});