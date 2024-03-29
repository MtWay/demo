$(function () {
    var $mobile = $("#mob");
    //获取验证码
    var $code = $("#yanzheng");
    //简单的判断输入的手机号正确

     $("#can").attr('width',($(".show-main").width()));
     $("#can").attr('height',($(".show-main").height()));
     
    var mobileError = true;
    $mobile
        .blur(function () {
            var regex = /^((13[0-9])|(17[0-9])|(14[0-9])|(15[0-9])|(18[0-9]))\d{8}$/;
            if (regex.test($mobile.val())) {
                mobileError = false;
                clearError();
            } else {
                mobileError = true;
                showStaffError("您输入的手机号码有误。")
            }
        });

    //提交

    $("#submit").click(function () {
        //验证
        if (validate()) {
            if (flag == "index")
                phonrCode()
            else
                $("#model-fir").removeClass("hide");
        }
        
    })

    $("#model-fir .confirm").click(function () {
        $("#model-fir").addClass("hide");
        submit();
    })

    $("#model-fir .close").click(function () {
        $("#model-fir").addClass("hide");
    })
    function waitTime() {
        if (wait > 0) {
            $("#keyCode").val("重新获取(" + wait + ")");
            setTimeout(function () {
                wait = wait - 1;
                waitTime();
            }, 1000);
        } else {
            $("#keyCode").on("click", gainmsgcode);
            $("#keyCode").val("获取验证码");
            //更换验证码
            $("#yanzheng").next().click();
        }
    }

    function clearError() {
        $("#error-text").text("").addClass("hide");
    }

    function showStaffError(a, cb) {
        $.alertMessage.call($(this), a);
        if (typeof cb == "function") {
            setTimeout(cb, 2000)
        }
        //$("#error-text").text(a).removeClass("hide");
    }

    $("#keyCode").click(gainmsgcode)
    //获取验证码的操作
    function gainmsgcode() {

        var regex = /^((13[0-9])|(17[0-9])|(14[0-9])|(15[0-9])|(18[0-9]))\d{8}$/;
        if (regex.test($mobile.val())) {
            mobileError = false;
            clearError();
        }
        //默认没有通过,不能进行验证码的发送
        if (mobileError) {
            showStaffError("您输入的手机号码不正确！")
        } else if ($code.val() == null || $code.val().length != 4) {
            showStaffError("请填写正确的图片验证码！")
        } else {
            clearError();
            //发送请求进行判断能够进行发送验证码
            $.post('/sys/getstaffcode.json', {
                phoNum: $mobile.val(),
                verifyCode: $code.val()
            }, function (data) {
                if (data.codeMsg) {
                    showStaffError("请填写正确的图片验证码！");
                    $("#yanzheng").next().click();//更换验证码
                } else if (data.mobileMsg) {
                    showStaffError("你的手机号还没有绑定华夏账号！");
                    $("#yanzheng").next().click();//更换验证码
                    $("#keyCode").off("click");//禁止再次点击
                } else if (data.message == "success") {
                    showStaffError("验证码已发送，您注意查收");
                    $("#keyCode").off("click");
                    wait = 60;
                    waitTime();
                } else if (data.message == "fail") {
                    showStaffError("你今天的短信次数已达上限，请明天再试!");
                    $("#yanzheng").next().click();//更换验证码
                }
            });
        }
    }

    function phonrCode() {
        if ($("#isRegist").hasClass("hide")) {
            submit()//如果已经登录不进行手机验证；
        } else {
            $.post('/wap/mobileCodeForpersoncar.json', {
                mobile: $mobile.val(),
                registerCode: $("#codeNum").val()
            }, function (data) {
                if (data.message) {
                    if(data.notpersoncar == 0) {
                        showStaffError('您已绑定华夏账号,请使用华夏帐号发车！');
                        location.href = "/personcarwap/notpersonwap.htm?flag=0";
                    } else {
                        if (data.fs == 1) {
                            showStaffError('您已有一辆在售车辆，不可重复提交！');
                            history.go(0);
                        } else {
                            // $("#model-fir").removeClass("hide");
                            submit();
                        }
                    }
                    
                } else {
                    showStaffError('手机验证码错误!');
                }
            })
        }
    }

    function submit() {
        //数据
        var transfer, carforuse, browser = '';
        if ($("#transfer-box .checked").length > 0) {
            transfer = $("#transfer").prop("checked") ? "1" : "2";
        }
        if ($("#carforuse-box .checked").length > 0) {
            carforuse = $("#carforuse").prop("checked") ? "2" : "1";
        }
        var useragent = window.navigator.userAgent;
        if (useragent.match(/MicroMessenger/i)) {
            browser = 'wx';
        }
        var datas = {
            id: Number($("#carId").val()),
            carimgs: '["' + data.img.join('","') + '"]',
            cartype: $("#choiceBrands").attr("cartype-val"),//车辆品牌
            carserial: $("#choiceBrands").attr("carserial-val"),
            carbigserial: $("#choiceBrands").attr("carbigserial-val"),
            carbigtype: $("#carType").attr("data-code"),
            journey: $("#journey").val(),
            userYear: $("#tagTimes").attr("data-code"),
            userMonth: $("#tagTimes").attr("data-month"),
            name: $("#name").val(),
            shangpai: $("#shangpai").prop("checked") ? "1" : "0",//上牌
            money: $("#money").val(),
            province: $("#address").attr("data-code"),
            city: $("#address").attr("data-month"),
            beizhu: $("#beizhu").val(),
            color: $("#color").attr("data-code"),
            transfer: transfer,
            carforuse: carforuse,
            inspectionYear: $("#annualVerification").attr("data-code"),//年审
            inspectionMonth: $("#annualVerification").attr("data-month"),
            insuranceYear: $("#sali").attr("data-code"),//保险
            insuranceMonth: $("#sali").attr("data-month"),
            flag: browser
        }, url = "/personcarwap/commitcarinfo.json";
        if (flag == "edit") {
            url = "/personcarwap/updatecar.json";
        }

        $.ajax({
            type: "post",
            url: url,
            async: true,
            data: datas,
            success: function (a) {
                switch (a.resultCode) {
                    case undefined:
                        showStaffError("发布成功", function () {
                            location.href = "personcarlist.htm";
                        });
                        break;
                    case 4:
                        showStaffError("车辆信息更新成功", function () {
                            location.href = "personcarlist.htm";
                        });
                        break;
                    case 1:
                        showStaffError("已有在售车辆");
                        break;
                    case 2:
                        showStaffError("没有匹配的车");
                        break;
                    case 3:
                        showStaffError("车辆信息更新失败");
                        break;
                    case 5:
                        showConfirm("车辆信息参数错误");
                        break;
                    case 6:
                       showStaffError("您已绑定华夏账号", function () {
                            location.href = "/personcarwap/notpersonwap.htm?flag=0";
                        }); 
                }
            }
        })
    }

    function validate() {
        if ($("#carType").hasClass("readonly")) {
            showStaffError("请选择车辆种类");
            return false;
        } else if ($("#choiceBrands").hasClass("readonly")) {
            showStaffError("请选择品牌车型");
            return false;
        } else if ($("#money").val() == "") {
            showStaffError("请输入期望售价");
            return false;
        } else if ($("#journey").val() == "") {
            showStaffError("请输入行驶里程");
            return false;
        } else if ($("#tagTimes").hasClass("readonly") && $("#shangpai").prop("checked")) {
            showStaffError("请选择上牌时间");
            return false;
        } else if ($("#address").hasClass("readonly")) {
            showStaffError("请选择所在地区");
            return false;
        } else if ($(".thumbnail").length == 0) {
            showStaffError("请添加车源图片");
            return false;
        } else if ($("#name").val() == "") {
            showStaffError("请输入您的姓名");
            return false;
        } else {
            $("#error-text").addClass("hide");
            return true;
        }
    }

    function showConfirm(msg, callback) {
        $("#model-show-msg").text(msg);
        $("#model-show").removeClass("hide").animate({
            opacity: 0
        }, 2000, function () {
            $("#model-show").addClass("hide").css({
                opacity: "1"
            });
            if (typeof callback == "function")
                callback();
        });
    }

    $("header .backArrow").click(function () {
        history.go(-1);
    })
    $(".radio input").change(function () {
        $(this).parents(".radio").addClass("checked");
        $(this).parents(".radio").siblings(".radio").removeClass("checked")
    })
    $(".tag").change(function () {
        $("#tagTime").removeClass("disabled");
        $("#tagTime input").attr("disabled", false);
    })
    $(".unTag").change(function () {
        $("#tagTime").addClass("disabled");
        $("#tagTime input").attr("disabled", true);
    })
    $("#more h3").click(function () {
        var bot = $(this).find(".bot-icon")
        if (bot.hasClass("top-icon")) {
            bot.removeClass("top-icon");
            $("#more").removeClass("more");
            $(".img-li").removeClass("bor");

        } else {
            bot.addClass("top-icon");
            $("#more").addClass("more");
            $(".img-li").addClass("bor")
        }

    })

    //品牌车型
    hx.MobileBrand({
        getFirstgradeId: '#choiceBrands',
        forthCallback: hxforbrandCallback
    });
    function hxforbrandCallback(title, foid, sid, fid) {
        $('#fgradeArrow').click();
        $('#choiceBrands').text(title).removeClass("readonly");
        $('#choiceBrands').attr("cartype-val", arguments[1]);
        $('#choiceBrands').attr("carserial-val", arguments[2]);
        $('#choiceBrands').attr("carbigserial-val", arguments[3]);
    }

    //右侧滑块
    var con = {
        id: "",
        data: "",
        code: ""
    };

    $(".select").not("#choiceBrands").blockFly({
        targetId: '#model',
        flyType: 2,
        ifShadow: true,
        preventDiv: '.ipage',
        beginLocation: '100%',
        targetLocation: '0%',
        closebuttonId: '#model .model-arrow',
        flyCallback: modelfly,
        // closeCallback: hxBrandclose,
        nextCallback: next,
    });
    //一级取消
    function hxBrandclose() {
        $('#sgradeArrow').click();
        $('#tgradeArrow').click();
    }

    function modelfly() {
        if ($(this).parent().hasClass("disabled")) {
            return false;
        }
        con.id = $(this).attr("id");
        con.data = "";
        var id = $(this).attr("id"), $li = "", need = data[id], code = dataCode[id], text = $(
            this).siblings(".left").text();
        $("#model li").remove();
        for (var i = 0; i < need.length; i++) {
            $li += '<li data-code=' + code[i] + '>' + need[i] + '</li>';
        }
        if (id == "tagTimes" || id == "sali" || id == "annualVerification"
            || id == "address") {
            if (id == "address") {
                $("#model .model-main").addClass("add");
            } else {
                $("#model .model-main").removeClass("add");
            }
            $("#model .model-main").addClass("next");
        } else {
            $("#model .model-main").removeClass("next").removeClass("add");
        }
        $(".model-title span").text(text)
        $("#model ul").append($li);
    }

    //有关时间的二级菜单
    function next() {

        $(".next li").blockFly({
            targetId: '#model-time',
            flyType: 2,
            ifShadow: true,
            preventDiv: '.ipage',
            beginLocation: '100%',
            targetLocation: '0%',
            closebuttonId: '#model-time .model-arrow',
            flyCallback: timeFly,
            // closeCallback: hxBrandclose,
            nextCallback: timeNext
        });

        //click事件需放在后面不然会被覆盖

        $("#model li").click(function () {
            con.data = $(this).text();
            con.code = $(this).attr("data-code");
            $("#" + con.id).attr("data-code", con.code);
            if (!$("#model .model-main").hasClass("next")) {
                $("#model .model-arrow").click();
                $("#" + con.id).text(con.data).removeClass("readonly");
            }
        })
    }

    function timeFly() {
        var month = data.month, codes = dataCode.month, $li = "", ind = $(this)
            .index(), dat = PCAC[ind + 1];
        if ($("#model .model-main").hasClass("add")) {
            month = [], codes = [];
            for (var i = 1; i < dat.length; i++) {
                month.push(dat[i].split(":")[1]);
                codes.push(dat[i].split(":")[0]);
            }
        }
        $("#model-time li").remove();
        for (var i = 0; i < month.length; i++) {
            $li += '<li data-code="' + codes[i] + '">' + month[i] + '</li>';
        }
        $("#model-time ul").append($li);
    }

    function timeNext() {
        $("#model-time li").click(function () {
            con.code = $(this).attr("data-code");
            $("#" + con.id).attr("data-month", con.code);
            con.data += ("," + $(this).text());
            $("#" + con.id).text(con.data).removeClass("readonly");
            $(".model-arrow").click();
        })
    }

    //解析matrix矩阵
    function getmatrix(a, b, c, d, e, f) {
        var aa = Math.round(180 * Math.asin(a) / Math.PI);
        var bb = Math.round(180 * Math.acos(b) / Math.PI);
        var cc = Math.round(180 * Math.asin(c) / Math.PI);
        var dd = Math.round(180 * Math.acos(d) / Math.PI);
        var deg = 0;
        if (aa == bb || -aa == bb) {
            deg = dd;
        } else if (-aa + bb == 180) {
            deg = 180 + cc;
        } else if (aa + bb == 180) {
            deg = 360 - cc || 360 - dd;
        }
        return deg >= 360 ? 0 : deg;
        //return (aa+','+bb+','+cc+','+dd);
    }

    //图片删除
    $("#delImg").click(function () {
        var id = $("#defaultCar").attr("gid");
        data.img.splice(id, 1);
        $(".thumbnail").eq(id).remove();

        if ($(".thumbnail").length == 0) {
            $(".hasImg").removeClass("hasImg")
        } else if ($(".first").length == 0) {
            $(".thumbnail").eq(0).addClass("first");
        }
        $(".model-arrow").click();
    })

    //图片旋转
    $(".rotate").click(
        function () {
//	 		ctx1.clearRect(0,0,10000,10000);
        	$(".show-main").toggleClass("col");
			rotate()
        	draw();
           // $("#showImg").removeClass("max");
//          var matrix = $("#showImg").css("-webkit-transform"), deg = eval('get'
//                  + matrix) + 90, size = {
//              boxw: $(".show-main").width(),
//              boxh: $(".show-main").height(),
//              maxh: $("#showImg").height(),
//              minw: 0,
//              minh: 0,
//          };
//        //  $("#showImg").addClass("max");
//
//          size.minh = $("#showImg").height();
//          size.minw = $("#showImg").width();
//          var scale = size.boxw / size.minh > size.boxh
//          / size.minw ? size.boxh / size.minw : size.boxw
//          / size.minh;
//          $("#showImg").css("-webkit-transform",
//              "rotate(" + deg + "deg)");
//          if (size.minw < size.boxw && scale > 1)
//              scale = 1;
//          if (deg % 180 != 0) {
//              $(".show-main").css("-webkit-transform",
//                  "scale(" + scale + ")");
//          } else {
//              $(".show-main")
//                  .css("-webkit-transform", "scale(1)");
//          }

        })

    //设为封面
    $("#defaultCar").click(function () {
        if ($(this).hasClass("gry")) {
            return false;
        }
        $(this).addClass("gry")
        var ind = $(this).attr("gid");
        $(".first").removeClass("first");
        var parent = $(".thumbnail").eq(ind);

        //parent.remove();
        //$("#filePicker ul").prepend(parent);
        parent.addClass("first");
        data.img.unshift(data.img.splice(ind, 1)[0])
    });

    $("#file_map").delegate("#file1", "change", function () {
        normalUploadPic()
    })
    var ctx1 = $("#can")[0].getContext('2d');
function imgFly() {
	ctx1.restore();
	ctx1.save();
	imgSrc = $(this).find("img").attr("src").replace('_small_400_300','');
	 ctx1.clearRect(-1000,-1000,10000,10000);
    if ($(this).hasClass("first")) {
        $("#defaultCar").addClass("gry");
    } else {
        $("#defaultCar").removeClass("gry");
    }
    var inde = $(this).index();
    //$("#showImg").attr("src", $(this).find("img").attr("src"));
 	 img = new Image();
    img.src=imgSrc;
//  ctx1.beginPath();
    img.onload = function() {
    	draw()
    	
//    // regular rotation about center
//    var xpos = $(".show-main").width();
//    var ypos = $(".show-main").height();
//    var bw = img.width;
//    var bh = img.height;
//    
////    ctx1.translate(xpos, ypos);
////    ctx1.rotate(90 * Math.PI / 180);//旋转47度
//      var  s = (xpos/bw)<(ypos/bh)?xpos/bw:ypos/bh;
//      if(s>1){
//      	s=1;
//      }
////      ctx1.scale(s,s);
//	  var ow = img.width*s;
//    var oh = bh*s;
//      ctx1.drawImage(img,(xpos-ow)/2,(ypos-oh)/2,ow,oh);
    }
    
    
   
    $("#defaultCar").attr("gid", inde);
}
function draw(){
    	var xpos = $(".show-main").width();
      var ypos = $(".show-main").height();
      var bw = img.width;
      var bh = img.height;
    	
    	var  s = (xpos/bw)<(ypos/bh)?xpos/bw:ypos/bh;
    	if($(".show-main").hasClass("col")){
    		//如果旋转为竖排则互换
    	var  s = (xpos/bh)<(ypos/bw)?xpos/bh:ypos/bw;
    	}
        if(s>1){
        	s=1;
        }
	  var ow = bw*s;
      var oh = bh*s;
        ctx1.drawImage(img,(xpos-ow)/2,(ypos-oh)/2,ow,oh);
        
    }

 function rotate(){
 	var canvas =$(".show-main");
            var x = $(".show-main").width()/2; //画布宽度的一半
            var y = $(".show-main").height()/2;//画布高度的一半
            ctx1.clearRect(-1000,-1000,10000,10000);//先清掉画布上的内容
            ctx1.translate(x,y);//将绘图原点移到画布中点
            ctx1.rotate((Math.PI/180)*90);//旋转角度
            ctx1.translate(-x,-y);//将画布原点移动
//          context.drawImage(image,0,0);//绘制图片     
        }

  function normalUploadPic() {
	console.log($("#file1").val());	
    var $li = $('<li class="file-item thumbnail loding"><img></li>');
    $("#file").before($li);
    var $img = $li.find('img');
    if ($(".first").length == 0) {
        $li.addClass("first");
    }
    if ($(".hasImg").length == 0) {
        $("#filePicker ul").addClass("hasImg");
    }
    if ($(".thumbnail").length >= 16) {
        $("#file").hide();
    }
    // $img.attr("src", '/resource/web/mobile/personal/img/upload.gif');
    var count = getUploadPicCount();
    if (count >= 16) {
        $("#file").hide();
        //alert("您不能上传更多的图片!");
    } else {
        $.ajaxFileUpload({
            url: CONTEXTPATH + '/car/upload2.htm',//用于文件上传的服务器端请求地址
            secureuri: false,//一般设置为false
            fileElementId: 'file1',//文件上传空间的id属性  <input type="file" id="file" name="file" />
            dataType: 'json',//返回值类型 一般设置为json
            success: function (dat) //服务器成功响应处理函数
            {
                dat = JSON.parse(dat);
                /*console.log(dat);*/
                
                data.img.push(dat.relativePath);
                var pic=dat.small_img_path.replace('300_200','400_300');
                $img.attr("src", pic);
                $('.loding').removeClass('loding');
                //弹窗
                $(".thumbnail").blockFly({
                    targetId: '#model-img',
                    flyType: 2,
                    ifShadow: true,
                    preventDiv: '.ipage',
                    beginLocation: '100%',
                    targetLocation: '0%',
                    closebuttonId: '#model-img .model-arrow',
                    flyCallback: imgFly,
                    // closeCallback: hxBrandclose,
                    //                 nextCallback: timeNext
                })
            },
            error: function (data, status, e)//服务器响应失败处理函数
            {
                alert(e);
            },
            beforeSend: function () {
                //	beginUp();
            }
        });
        $("#file1").remove();
        $("#file_map").html('<input type="file" id="file1" name="file1"/>');
    }
}  
    
/**
 * 上传图片张数
 */
function getUploadPicCount() {
    var lis = $(".thumbnail");
    var count = 0;
    if (lis != null) {
        count = lis.length;
    }
    return count;
} 
})






/*$(function(){
    $('#question').blockFly({
        targetId: '.questCont',
        flyType: 2,
        ifShadow: false,
        beginLocation: '100%',
        targetLocation: '0%',
    });
});
*/
