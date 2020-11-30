//默认手机号码错误
var mobileError = true;
$(function(){
	var $mobile = $("#login_staff input:eq(0)");
	//获取验证码
	var $code = $("#login_staff input:eq(1)");
	//简单的判断输入的手机号正确
	$("#login_staff input:eq(0)").blur(function(){
		var regex = /^((13[0-9])|(17[0-9])|(14[0-9])|(15[0-9])|(18[0-9]))\d{8}$/;
		if(regex.test($mobile.val())){
			mobileError = false;
			clearError();
		}else {
			mobileError = true;
			showStaffError("您输入的手机号码有误。")
		}
	});
	//输入手机号码的时候清除错误提示
	$("#login_staff input:eq(0)").focus(function(){
		$("#login_staff .login_error:eq(0)").hide();
		$("#login_staff .login_error:eq(0)").html("");
		$("#gaincode").off("click").on("click", gainmsgcode);
		$("#gaincode").html("获取验证码");
		wait = 0;
	}).blur(function(){
		wait = 60;
		$("#gaincode").off("click").on("click", gainmsgcode);
	});
	$("#login_staff input:eq(1)").off("click").on("click",function(){clearError();});
	$("#login_staff input:eq(2)").off("click").on("click",function(){clearError();});
	$("#login_name").off("click").on("click",function(){$(".login_R_content .login_error").hide();});
	$("#password_m").off("click").on("click",function(){$(".login_R_content .login_error").hide();});
	$("#verify_code").off("click").on("click",function(){$(".login_R_content .login_error").hide();});
});

//对于获取手机验证码的点击事件
//$("#gaincode").on("click", gainmsgcode);
var wait = 60;
//重新获取验证码的等待时间
function waitTime(){
	if(wait > 0){
		$("#gaincode").html("重新获取("+wait+")");
		setTimeout(function(){
			wait = wait - 1;
			waitTime();
		},1000);
	} else {
		$("#gaincode").on("click", gainmsgcode);
		$("#gaincode").html("获取验证码");
		//更换验证码
		$("#login_staff .yzm2:eq(0)").click();
	}
}
//获取验证码的操作
function gainmsgcode(){
	var $mobile = $("#login_staff input:eq(0)");
	//获取验证码
	var $code = $("#login_staff input:eq(1)");
	//默认没有通过,不能进行验证码的发送
	if(mobileError){
		showStaffError("您输入的手机号码不正确！")
	}else if($code.val() == null || $code.val().length !=4){
		showStaffError("请填写正确的图片验证码！")
	}else {
		clearError();
		//发送请求进行判断能够进行发送验证码
		$.post(
			'/sys/getstaffcode.json',
			{
				phoNum : $mobile.val(),
				verifyCode : $code.val()
			},
			function(data){
				if(data.codeMsg){
					showStaffError("请填写正确的图片验证码！");
					$("#login_staff .yzm2:eq(0)").click();//更换验证码
				}else if(data.mobileMsg){
					showStaffError("你的手机号还没有绑定华夏账号！");
					$("#login_staff .yzm2:eq(0)").click();//更换验证码
					$("#gaincode").off("click");//禁止再次点击
				}else if(data.message == "success"){
					showStaffError("验证码已发送，您注意查收");
					$("#gaincode").off("click");
					wait = 60;
					waitTime();
				}else if(data.message == "fail"){
					showStaffError("你今天的短信次数已达上限，请明天再试!");
					$("#login_staff .yzm2:eq(0)").click();//更换验证码
				}
			}
		);
	}
}
//员工的点击登录的事件
function goStaffLogin(){
	var phoNum = $("#login_staff input:eq(0)").val();
	var code = $("#login_staff input:eq(2)").val();
	var save = 0;
	if($("#login_staff input:eq(3)").attr("checked") == "checked"){
		save = 1;
	}
	var regex = /^((13[0-9])|(17[0-9])|(14[0-9])|(15[0-9])|(18[0-9]))\d{8}$/;
	if(phoNum != null && code != null){
		$.post(
			'/sys/gostafflogin.json',
			{	
				redirectUrl	: REDIRECTURL,
				phoNum : phoNum,
				code : code,
				isSave : save
			},
			function(data){
				if(data.isLoginSuccess){
					window.location.href=data.url;
				}else {
					showStaffError("您手机号或手机验证码输入不正确！");
				}
				
			}	
		);
	}else {
		showStaffError("您手机号或手机验证码输入不正确！");
	}
}
/**
 * 选择登录的模式
 * @param index
 */
function chooseLogin(index){
	$(".login_R_top span").removeClass("select");
	$(".login_error").hide();
	$(".login_R_content").hide();
	$(".login_R_content:eq("+index+")").show();
	$(".login_R_top span:eq("+index+")").addClass("select");
}
/**
 *  登录的点击事件
 */
function userLogin(){
	var psw=$.trim($("#password_m").val());
	var salt="HKUUKOIIKJKLLI";
	$("#password").val(hex_md5(hex_md5(psw)+salt));
	if($("#isSave").attr("checked")=="checked"){
		$("#isSave").val("1");
	}else{
		$("#isSave").val("0");
	}
	$("#myform").submit();
}
$(document).keydown(function(e){
   if(e.keyCode == 13){
   	 userLogin();
   }
 });

function picCodeVerify(){
	var code=$.trim($("#verify_code").val());
	if(code.length==4){
		$(".login_error").remove();
		//全角to半角
		for (var i = 0; i < code.length; i++) {
			if (code.charCodeAt(i) == 0x3000) {
				code = code.replace(code.charAt(i),String.fromCharCode(0x20));
			}
			if (code.charCodeAt(i) > 0xFF01 && code.charCodeAt(i) < 0xFF5E) {
				code = code.replace(code.charAt(i),String.fromCharCode(code.charCodeAt(i) - 65248));
			}
		}
		$('#verify_code').val(code);
		//发送请求进行判断能够进行发送验证码
		$.post(
			'/sys/piccodeverify.json',
			{
				verifyCode : code
			},
			function(data){
				if(data.state==0){
					$(".login_R_content").prepend("<div class=\"login_error\">请填写正确的图片验证码！</div>");
				}
			}
		);
	}
}
/**
 * 清除错误提示
 */
function clearError(){
	$("#login_staff .login_error:eq(0)").hide();
	$("#login_staff .login_error:eq(0)").html("");
}
//进行员工登录的错误信息提示
function showStaffError(info){
	$("#login_staff .login_error:eq(0)").html(info);	
	$("#login_staff .login_error:eq(0)").show();
}
$(function(){
	$('#fiCode').keyup(function(){
		checkpiccode($(this));
	});
	$('#fiCode2').keyup(function(){
		checkpiccode($(this));
	});
	function checkpiccode(ts){
		var icode = $.trim($(ts).val());
		if(icode.length==4){
			//全角to半角
			for (var i = 0; i < icode.length; i++) {
				if (icode.charCodeAt(i) == 0x3000) {
					icode = icode.replace(icode.charAt(i),String.fromCharCode(0x20));
				}
				if (icode.charCodeAt(i) > 0xFF01 && icode.charCodeAt(i) < 0xFF5E) {
					icode = icode.replace(icode.charAt(i),String.fromCharCode(icode.charCodeAt(i) - 65248));
				}
			}
			$(ts).val(icode);
		}
	}
});