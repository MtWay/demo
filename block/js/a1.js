
var LoginOperation = (function () {
    var curDealerId = 0;
    var curMemberId = 0;
    var logintype = 0;//0登录页 1重新登陆弹层
    var geetecaptchaObjret;
    var geetecaptchaObj = null;
    var handlerEmbed = function (captchaObj) {

        $("#embed-submit").click(function (e) {
            var validate = captchaObj.getValidate();
            if (!validate) {
                setError("请先拖动验证码到相应位置", "error_vcode");
                e.preventDefault();
            }
            else {
                setError("");
            }
        });
        if ($("#embed-captcha").html().length == 0) {
            captchaObj.appendTo("#embed-captcha");
        }
        captchaObj.onReady(function () {
            $("#wait").hide();
        });
        geetecaptchaObj = captchaObj;
        captchaObj.onSuccess(
            function () {
                geetecaptchaObjret = captchaObj.getValidate();
                geetecaptchaObj = captchaObj;
                setError("");
            },
            function (data) {
                // 根据服务端二次验证的结果进行跳转等操作
                if (data.status === 'fail') {
                    geetecaptchaObj.reset(); // 调用该接口进行重置
                }
            })
    }

    var getcaptcha = function () {
        $.ajax({
            url: "/getcaptcha.aspx?t=" + (new Date()).getTime(), // 加随机数防止缓存
            type: "get",
            dataType: "json",
            success: function (data) {
                initGeetest({
                    gt: data.gt,
                    challenge: data.challenge,
                    product: "embed", //float，embed，popup。
                    offline: !data.success,
                    new_captcha: data.new_captcha,
                    width: "100%",
                    marginbottom: "15px",
                    height: "32px",
                }, handlerEmbed);
            }
        });
    }
    getcaptcha();

    /*QrLogin*/
    var clientid = '';
    var tflag;

    //扫码登录
    function QrLogin() {
        if ($(".by-password").is(":hidden")) {
            var ret = AjaxOperator.AjaxData("/Handler/Login/codelogin.ashx?action=login&cid=" + clientid, false, "get");
            var data = eval("(" + ret + ")");
            switch (data.status) {
                case "1":
                    $("#divQrLogin").show();
                    $("#divQrLogin").find(".entering").show();
                    $("#divQrLogin").find(".entering span").text("请在手机上确认登录");
                    $("#aQrReflush").hide();
                    break;
                case "2":
                    $("#divQrLogin").find(".entering span").text("扫描成功正在登录...");
                    $("#divQrLogin").show();
                    if (logintype == 0) {
                        location.href = "/index.html";
                    } else {
                        var value = carshowprotoclOp.IsShowBox();
                        var stage = parseInt(value / 100);
                        var status = value % 100;
                        if ((stage == 1 || stage == 2) && (status == 2 || status == 3)) //登录超时：登陆后判断用户是否需要弹车源展示服务协议窗口 如需要则跳转到首页
                            window.location.href = "/index.html?g=1";
                        else {
                            if (curDealerId == data.dealerid && curMemberId == data.memberid) {
                                $("#div_reloginbox").addClass("fn-hide");
                                clearInterval(tflag);
                            } else
                                window.location.reload();
                        }
                    }
                    break;
                case "3":
                    break;
                case "4":
                case "-1"://失效
                    $("#divQrLogin").show();
                    $("#divQrLogin").find(".entering").hide();
                    $("#aQrReflush").show();
                    clearInterval(tflag);
                    break;
                case "5"://取消
                    InitCode();
                    $("#divQrLogin").find(".entering").hide();
                    $("#aQrReflush").hide();
                    break;
                case "6"://返回
                    InitCode();
                    $("#divQrLogin").find(".entering").hide();
                    $("#aQrReflush").hide();
                    break;
            }
        }
    }

    //初始化二维码
    function InitCode() {
        var result = AjaxOperator.AjaxData("/Handler/Login/codelogin.ashx?action=init&cid=" + clientid + "&m=" + Math.random(), false, "get");
        var objResult = eval("(" + result + ")");
        clientid = objResult.cid;
        $("#imgQr").attr("src", "//cacheapi.che168.com/qrcode/qrcode.ashx?w=216&h=216&url=" + encodeURIComponent(objResult.url));
    }

    //刷新二维码点击事件
    $("#aQrReflush").click(function () {
        InitCode();
        $("#divQrLogin").find(".entering").hide();
        $("#aQrReflush").hide();
        tflag = setInterval(QrLogin, 2000);
    });

    //验证码发送
    var seedsSix = null;
    var secendSix = 60;
    var sendCount = 0;
    var flag = true;
    var LoginOp = {
        SendCode: function () {  //验证码发送
            var url = "/handler/login/login.ashx";
            var result = AjaxOperator.AjaxPostData(url, false, "post", {
                action: "sendmsg",
                username: $("#txtLoginUserName").val(),
                pwd: $("#txtLoginPwd").val(),
            });
            if (result.code == 100) {
                $('#btnSendCode').unbind("click");
                seedsSix = setInterval(LoginOp.BackSecendSix, 1000)
            } else {
                window.clearInterval(seedsSix);
            }
        },
        BackSecendSix: function () {  //倒计时
            if (--secendSix > 0) {
                $('#btnSendCode').text(secendSix + "S");
                //$("#btnSendCode").removeClass("m-active");
            }
            else {
                $('#btnSendCode').text("重新发送");
                window.clearInterval(seedsSix);
                seedsSix = null;
                secendSix = 60;
                //$("#btnSendCode").addClass("m-active");
                $('#btnSendCode').bind('click', LoginOp.SendCode);
            }
        }
    };

    return {
        CheckCodeIsLogin: function () {
            InitCode();
            tflag = setInterval(QrLogin, 2000);
        },
        Login: function () {
            logintype = 0;
            login();
        },
        ReLogin: function (dealerid, memberid) {
            logintype = 1;
            curDealerId = dealerid;
            curMemberId = memberid;
            setError("");
            geetecaptchaObj.reset();
            InitCode();
            $("#btnLogin").html("登录");
            $("#btnLogin").parent().removeClass("login-loading");
            $("#divQrLogin").find(".qr-ok").parent().hide();
            $("#divQrLogin").find(".qr-fail").parent().hide();
            $("#div_reloginbox").removeClass("fn-hide");
            $("#btnLogin").unbind("click").bind("click", login);
            clearInterval(tflag);
            tflag = setInterval(QrLogin, 2000);
        }
    };

    //登录
    function login() {
        var remember = 0;
        if ($("#chkRemember").attr("checked") == "checked") {
            remember = 1;
        }
        remember = logintype > 0 ? -1 : remember;
        setError("");
        if (validForm()) {
            $("#btnLogin").unbind("click");
            $("#btnLogin").html("<i class='usedfont used-tongbuzhong'></i>正在登录...")
            $("#btnLogin").parent().addClass("login-loading");
            $.post("/handler/login/login.ashx", {
                username: $("#txtLoginUserName").val(),
                pwd: $("#txtLoginPwd").val(),
                //  validcode: $("#txtValidCode").val(),
                challenge: $("input[name='geetest_challenge']").val(),
                validate: $("input[name='geetest_validate']").val(),
                seccode: $("input[name='geetest_seccode']").val(),
                remember: remember,
                loginpath: window.location.href,
                action: "login",
                mobilecode: $("#txtMobileCode").val(),
                flagmobile: $("#hidFlagMobile").val(),
                lgtype: logintype
            }, function (data) {
                if (data.code == 0) {
                    clearInterval(tflag);
                    if (logintype == 0) {
                        window.location.href = "/index.html?isloginpage=1";
                    } else {
                        var value = carshowprotoclOp.IsShowBox();
                        console.log(value);
                        var stage = parseInt(value / 100);
                        var status = value % 100;
                        if ((stage == 1 || stage == 2) && (status == 2 || status == 3)) //登录超时：登陆后判断用户是否需要弹车源展示服务协议窗口 如需要则跳转到首页
                            window.location.href = "/index.html?g=1";
                        else {
                            if (curDealerId == data.resultobj.dealerid && curMemberId == data.resultobj.memberid) {
                                $("#div_reloginbox").addClass("fn-hide");
                                clearInterval(tflag);
                            } else
                                window.location.href = "/index.html?isloginpage=1";
                            //window.location.reload();
                        }
                    }
                } else if (data.code == 2040015) {
                    //geetecaptchaObj.reset();
                    $("#btnLogin").html("登录");
                    $("#btnLogin").parent().removeClass("login-loading");
                    $("#divMobile").show();
                    $("#btnSendCode").bind("click", LoginOp.SendCode);
                    $("#hidFlagMobile").val(1);
                }
                else {
                    geetecaptchaObj.reset();
                    $("#btnLogin").html("登录");
                    $("#btnLogin").parent().removeClass("login-loading");
                    setError(data.message, "error_vcode");
                }
                $("#btnLogin").bind("click", login);
            }, "json")
        }
    }

    //表单验证
    function validForm() {
        var username = $("#txtLoginUserName").val();
        if (username.length < 1) {
            setError("请输入账号", "error_txtLoginUserName");
            return false;
        }
        if (username.length < 2 || username.length > 16) {
            setError("账号长度为2-16位", "error_txtLoginUserName");
            return false;
        }
        var pwd = $("#txtLoginPwd").val();
        if (pwd.length < 1) {
            setError("请输入密码", "error_txtLoginPwd");
            return false;
        }
        if (pwd.length < 6 || pwd.length > 32) {
            setError("密码长度为6-32位", "error_txtLoginPwd");
            return false;
        }
        if (logintype == 0) {
            if ($("#hidFlagMobile").val() == "1" && ($("#txtMobileCode").val() == undefined || $("#txtMobileCode").val().length == 0)) {
                setError("异地登录请输入手机验证码");
                $("#divMobile").show();
                return false;
            }
        }
        // 新的验证码 验证逻辑
        var challenge = $("input[name='geetest_challenge']").val();
        var validate = $("input[name='geetest_validate']").val();
        var seccode = $("input[name='geetest_seccode']").val();
        if (!geetecaptchaObjret) {
            setError("请先拖动验证码验证", "error_vcode");
            return false;
        }
        if (challenge.length == 0 || validate.length == 0 || seccode.length == 0) {
            setError("请先拖动验证码验证", "error_vcode");
            return false;
        }
        else {
            return true;
        }
        return true;
    }

    //错误提示
    function setError(msg, dom) {
        if (logintype == 0) {
            var obj = $("#divErrorTip");
            obj.html(msg)
            if (msg.length > 0) {
                obj.removeClass("fn-hide");
            }
            else {
                obj.addClass("fn-hide");
            }
        } else {
            if (msg.length > 0)
                $("#" + dom).removeClass("fn-hide").text(msg);
            else
                $("#div_reloginbox p[class='error-hint']").addClass("fn-hide");
        }
    }
})();

$(function () {
    var theUA = window.navigator.userAgent.toLowerCase();
    if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
        var ieVersion = theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] || theUA.match(/trident\s?\d+/)[0];
        if (ieVersion < 9) {
            $('.login-content').hide();
            $('.warning-box').show();
        }
    }
    $('.qr-btn').on('click', function () {
        $(this).hide();
        $('.login-password').hide();
        $('.pc-btn').show();
        $('.login-qr').show();
    });
    $('.pc-btn').on('click', function () {
        $(this).hide();
        $('.login-qr').hide();
        $('.qr-btn').show();
        $('.login-password').show();
    });
});