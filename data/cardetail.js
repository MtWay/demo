var kjMoney='';  //砍价金额
var kjState=false;  //是否是砍价提交私人助理状态
	    //展示大图的中间区域
    function showbig($box,src){
    	var bw = $box.width();
    	var bh = $box.height();
    	var imgs = new Image();
    	imgs.src = src;
    	imgs.onload=function(){
//  		var iw = imgs.width;
//  		var ih = imgs.height;
//  		var width = iw/ih>bw/bh?(iw*bh/ih):bw;
//  		$box.find("img").attr("src",src).css({
//  			"width":width,
//  			"margin":"-"+bh/2+"px 0 0 -"+width/2+"px"
//  		})
			$box.find("img").attr("src",src)
    		$box.find("a").css("background-image","url("+src+")")
    	}
    }
$(function() {
	
//	showbig($("#TDatu"),$("#TDatu").find("img")[0].src);
    // 未登录点击查看电话号码
    $('.freeNum').click(function(){
        $.post('/car/cardealernumber.json',
            {
                id:F.carId
            },
            function(data){
                if(data.userPhone=='login'){
                    $(this).addClass('goLoginBtn');
                    $('.goLoginBtn').click();
                }
                else{
                    $('.freeNum').html('');
                    // 未登录时。电话是170，则显示。提示、
                    if(data.alimoboile === true){
                        $('.BOX_phone').addClass('BOX_phone_text');
                        $('.numText').show();
                    } else {
                        $('.BOX_phone').removeClass('BOX_phone_text');
                        $('.numText').hide();
                    }
                    if(data.mobile==data.phone){
                        $('.freeNum').html(data.mobile);
                        $('.freeNum').unbind('click');
                    }
                    else{
                        $('.freeNum').html(data.mobile+'&nbsp;'+data.phone);
                        $('.freeNum').unbind('click');
                    }
                }
            });
    });

	$(".close").click(function(){
		$(".myModel,.model").hide();
	})
    jQuery.fn.detailTabChange = function(change, selected) {
        var list = $(this);
        var showId = function() {
            var tabindex = $(this).index();
            list.each(function() {
                //$('#car_top span').removeClass('on');
                $(this).removeClass(selected);
                $(this.lang).hide();
            });
            var tabNow = this.lang;
            $(this).addClass(selected);
            //$('#car_top span').eq(tabindex).addClass('on');
            $(tabNow).show();
        };
        $(this).unbind().bind(change, showId);
    };

    // $('#car_top span').not('.isCollect , .conllects_btn').click(function() {
    //     $tsindex = $('#car_top').find('span').index($(this));
    //     $('#DTitle span').eq($tsindex).click();
    //     $("html,body").animate({
    //         scrollTop: 700
    //     }, 200);
    // });

    var height = document.documentElement.clientHeight;
    $(".unfold_PK").css("height", height - 36);
    $("#A1").css("height", height);

    var showId = function() {
        var temp = list.parent().attr('class');
        var listtab = "";
        if(temp == "other_title2") {
            listtab = ".car_other .other_title li";
        } else {
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
        $(listtab + ":eq(" + index + ")").addClass(selected);
        if(tabNow != "#other_infor6") {
            $(tabNow).show();
        }
        window.location.href = "#toup";
        $(this).unbind().bind(change, showId);
    };
    $(".car_other .other_title2 li").ShowTabChange("click", "oth_title_on");
    $(".car_other .other_title li").ShowTabChange("click", "oth_title_on");
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 车辆图片切换
    $("#TXiaotu li").on({
        mouseenter: function() {
            $("#TXiaotu li").removeClass("select");
            $(this).addClass("select");
            var Wimg = $(this).find("img")[0].src.replace('_small_400_300','_small_800_600');
         	showbig($("#TDatu"),Wimg)
//          $("#TDatu").find("img")[0].src = Wimg;
        }
    });

    //价格趋势评估跳转
    $('.qspinggu').click(function(){
        var pgurl = '/tools/assessDetail.htm?year='+P.year+'&month='+P.month+'&mile='+P.mile+'&areaCode='+P.areaCode+'&serid='+P.serid+'&keyword='+P.keyword+'&carType='+P.carType;
        window.open(pgurl);
    });

    //页面加载判断是否是对比车辆
    var carIds = F.carId;
    var allCarIds = new Array();
    var fks = $.cookie('carid');
    if (fks != null && fks != "") {
        allCarIds = fks.split(",");
    }
    var carflag = allCarIds.indexOf(carIds);
    if(carflag > 0 || carflag == 0){
        $('#TDuibi,.qsdb').addClass('tDuibi');
        $('#TDuibi').html("<i></i>取消对比");
        $('.qsdb').html("<em>-</em>&nbsp;取消对比");
    }
//	免费咨询回调弹框关闭
	$('.freebackbox .close,.rmcarcomfire').click(function(){
    	$('.freebackbox,#warnShadow').hide();
    });
    
    //查看电话展示小程序码
    $(".BOX_phone .num").hover(function(){
    	$(".BOX_small").addClass("BOX_small_show")
    },function(){
    	$(".BOX_small").removeClass("BOX_small_show")
    })
});

function getTop_on() {
    $(this).addClass("on");
}
$("#detail").bind("mouseover", getTop_on);

//大图显示
var picsize = 0;
var picTime = "";

function validNum(input) {
    /*********onpropertychange堆栈溢出************/
    if(input.addEventListener && !/MSIE 9/.test(window.navigator.userAgent)) {
        input.addEventListener("input", function() {
            var oldVal = this.value;
            this.value = oldVal.replace(/[^(0-9)\.\.]/g, '');
        }, false);
    } else { //IE6-8
        input.attachEvent("onfocus", function() {
            //旧版事件绑定
            input.onpropertychange = watchChange;
            //现代型事件绑定
            //input.attachEvent("onpropertychange", watchChange);
        });
        input.attachEvent("onblur", function() {
            //旧版事件解绑
            input.onpropertychange = null;
            //现代型事件解绑
            //input.detachEvent("onpropertychange", watchChange);
        });
    }

    function watchChange(e) {
        var e = window.event || e,
            _this = e.srcElement,
            oldVal = _this.value;
        if(e.propertyName == "value" && /[^(0-9)\.\.]/g.test(oldVal)) {
            _this.value = oldVal.replace(/[^(0-9)\.\.]/g, '');
        }
    }
}
$(function() {
    var showLargePic = function() {
        var picsize = $("#detail_pic img").length;
        if(picsize > 0) {
            $("#pic").show();
            var picall = "";
            var ptr = "";
            var time = $("#carcreattime").val();
            if(time == "1") {
                picTime = "800_600";
            } else {
                picTime = "800_600";
            }
            for(var i = 0; i < picsize; i++) {
                var imgurl = $("#detail_pic img:eq(" + i + ")").attr("data-original").replace(picTime, "90_60");
                ptr += '<li id="focusimg_' + i + '" onclick="showimg(' + i + ');"><img src="' + imgurl + '"></li>';
            }
            var bigpic = $("#detail_pic img:eq(0)").attr("data-original").replace("90_60", picTime);

            picall = '<div class="DATU_Page_cont">' +
                '<div class="title">' +
                '<p>' + $(".top_R h2").html() + '</p>' +
                '<p>联系电话：' + $(".BOX_phone .num").html() + '</p>' +
                '<span class="title_closed" id="title_closed"></span>' +
                '</div>' +
                '<div class="DATU">' +
                '<span class="DATUL" onclick="front();"></span>' +
                '<span class="DATU_pic" id="show_big">' +
                '<img src="' + bigpic + '"></span>' +
                '<span class="DATUR" onclick="next();"></span>' +
                '<p class="num"><em id="nowpage">1</em> / ' + picsize + '</p></div>' +
                '<div class="pic">' +
                '<ul id="show_img">' +
                ptr +
                '</ul></div></div>';
            $("#pic").html(picall);
            showimg(0);
            $("#title_closed").bind("click", function() {
                $("#pic").hide();
            });
        }
    };
    //	$("#TDatu").bind("click",showLargePic);

    var showbigPic = function() {
        var index = $(this).index();
        $("#car_pic li").each(function() {
            if($(this).index() == index) {
                $(this).addClass("select");
            } else {
                $(this).removeClass("select");
            }
        });
        $('#big_pic img')[0].src = $("#" + this.id + " img")[0].src.replace("90_60", "800_600").replace("uploadpic", "bigpic");
    };
    $("#car_pic li").mouseover(showbigPic);

});

function showimg(index) {
    var ztr = $("#detail_pic img:eq(" + index + ")").attr("data-original");
    $('#show_big img')[0].src = ztr;
    $("#show_img li").removeClass("select");
    $("#show_img li:eq(" + index + ")").addClass("select");
    for(var i = 0; i < picsize; i++) {
        if(Math.floor(index / 8) == 0 && i < 8) {
            $("#focusimg_" + i).show();
        } else if(Math.floor(index / 8) == 1 && i > 7 && i < 16) {
            $("#focusimg_" + i).show();
        } else if(Math.floor(index / 8) == 2 && i > 15 && i < picsize) {
            $("#focusimg_" + i).show();
        } else {
            $("#focusimg_" + i).hide();
        }
    }
    $("#nowpage").html(index + 1);
}

function front() {
    var index = $("#show_img li").index($("#show_img li.select"));
    if(index < 1)
        return;
    index--;
    showimg(index);
}

function pagedown() {
    if(picsize <= 6)
        return;
    var index = $("#show_img li").index($("#show_img li.select"));
    index = (Math.floor(index / 6) + 1) * 6;
    if(index > picsize) {
        index = picsize - 1;
    }
    showimg(index);
}

function next() {
    var index = $("#show_img li").index($("#show_img li.select"));
    if(index > picsize - 2)
        return;
    index++;
    showimg(index);
}

function pageup() {
    var index = $("#show_img li").index($("#show_img li.select"));
    index = (Math.floor(index / 6) - 1) * 6;
    if(index < 1) {
        index = 0;
    }
    showimg(index);
}

function checkUserPhoneNum(pho) {
    var two = /^1\d{10}$/;
    if(!two.test(pho)) {
        return false;
    } else {
        return true;
    }
}
//4s查询New
$(function() {
    //错误提示
    function showError(text) {
        $('.warn2').html(text).show();
    }

    //重新获取验证码的等待时间
    function waitTime4s(wait) {
        if(wait > 0) {
            $("#btn_code").html("重新获取(" + wait + ")");
            setTimeout(function() {
                wait = wait - 1;
                waitTime4s(wait);
            }, 1000);
        } else {
            $("#btn_code").html("获取验证码").on("click", getPhoneCode4s);
            //更换验证码
            $(".codePic").click();
        }
    }

    function getPhoneCode4s(e) {
        var mobile = $.trim($('#phone_4s').val());
        var validCode = $.trim($('#valid_code').val());
        if(!mobile || !/^1\d{10}$/.test(mobile)) {
            showError('请填写正确的手机号!');
        } else if(!validCode || validCode.length != 4) {
            showError('请填写正确的图片验证码!');
        } else {
            $.post(
                '/code/codephones.json', {
                    Number: mobile,
                    verifyCode: validCode
                },
                function(data) {
                    if(data.message == "图片验证码错误!") {
                        showError("请填写正确的图片验证码！");
                        $(e.target).parents('.dis_list').siblings('.dis_list').find('.codePic').click(); //更换图片验证码
                    } else if(data.message == "短信发送成功") {
                        showError("验证码已发送，您注意查收");
                        $("#btn_code").off("click");
                        var wait = 60;
                        waitTime4s(wait);
                    } else if(data.message == "短信验证码发送失败，您已超出5条!!") {
                        showError("你今天的短信次数已达上限，请明天再试!");
                        $(e.target).parents('.dis_list').siblings('.dis_list').find('.codePic').click(); //更换图片验证码
                    }
                }
            )
        }
    }

    function submit4sOrder(arg) {
        $.post('/mobile/place4sOrder.json', {
            appmobile: arg.phone,
            vin: arg.vin,
            from: arg.from,
            vinImg: arg.vinImg,
            carId: arg.carId,
            engineNumber: arg.engineNumber,
            brandId: arg.brandId
        }, function(data) {
            if(data.success == 'success') {
                $("#phoN4s").text(arg.phone);
                $("#money4s").text(data.policy.price);
                $('#sumBtnQuery').data('orderId4s', data.policy.id);
                $("#queryBox").show();
                $('.model').show();
            }
        })
    }

    //从详情页面入口
    $('#fours').click(function() {
        if(F.phoneNum) {
            submit4sOrder({
                phone: F.phoneNum,
                vin: F.f4sVin,
                from: 'web_detail',
                vinImg: F.f4sVinImage,
                carId: F.carId,
                engineNumber: '',
                brandId: F.f4sBrandId
            });
            //去统计4s销售线索

            $.get('/require/commonrequire.json', {
                type: 1,
                carId: F.carId,
                number: F.phoneNum,
                position: getQueryString("getQueryString"),
                style: getStyle(),
                msg: '4s查看'

            });
        } else {
            $("#loginBox").show();
            $('.model').show();
        }
    });
    $("#phone_4s").blur(function() {
        var phone = $.trim($(this).val());
        if(!phone || !/^1\d{10}$/.test(phone)) {
            showError('请填写正确的手机号码!');
        }
    });
    // 登录
    $("#next_query").click(function() {
        var phone_4s = $.trim($('#phone_4s').val());
        var valid_code = $.trim($('#valid_code').val());
        var phone_code = $.trim($('#phone_code').val());
        if(!phone_4s || !/^1\d{10}$/.test(phone_4s)) {
            showError('请填写手机号码!');
        } else if(!valid_code) {
            showError('请填写图片验证码!');
        } else if(!phone_code) {
            showError('请填写手机验证码!');
        } else {
            $.post('/code/codenum.json', {
                Number: phone_4s,
                Code: phone_code
            }, function(data) {
                if(data.message === '短信验证失败') {
                    showError('短信验证码错误');
                } else {
                    submit4sOrder({
                        phone: phone_4s,
                        vin: F.f4sVin,
                        from: 'web_detail',
                        vinImg: F.f4sVinImage,
                        carId: F.carId,
                        engineNumber: '',
                        brandId: F.f4sBrandId
                    })
                }
            });
        }
    });
    // 4s 弹框 关闭事件
    $('.query_4s .close').click(function(){
        $('.query_4s , .model').hide();
    });
    //手机短信验证
    $('#btn_code').on("click", getPhoneCode4s);
    /******支付方式 微信支付宝********/
    $("#payMoney li").click(function() {
        $("#payMoney li").removeClass('selectOn');
        $("#payMoney").find('i').hide();
        $(this).addClass('selectOn');
        $(this).find('i').show();
    });
    $("#sumBtnQuery").click(function() {
        var mobile = $("#phoN4s").text(),
            price = $("#money4s").text(),
            orderId4s = $(this).data('orderId4s');
        if($("#payMoney").find(".selectOn").hasClass('weixin')) {
            // giveMberMoney();
            jQuery.post('/mobile/weixinQR.json', {
                money: price,
                typeId: orderId4s,
                loginName: mobile,
                rechargetype: 1,
                childtype: '4schaxun'
            }, function(data) {
                if(data) {
                    if(data.message != null) {
                        alert(data.message);
                        //sumb = 1;
                        return false;
                    }
                    //微信支付弹窗 必要参数二维码地址及轮询id
                    $(this).wxpay({
                        code_url: data.code_url,
                        prepay_id: data.prepay_id,
                        acno: data.acno,
                        intervalCallback: back,
                        showCallback: showweixin,
                        closeCallback: closeCallback
                    });

                }
            });
        } else {
            // 使用支付宝账号支付
            window.location.href = '/money/submitRecharge.htm?childtype=4schaxun&rechargetype=1&loginName=' + mobile + '&money=' + price + '&typeId=' + orderId4s;
        }
        // 微信支付的回调函数
        function back(acno) {
            jQuery.post('/mobile/xjrechargeres.json', {
                    out_trade_no: acno
                },
                function(data) {
                    if(data) {
                        if(data.message == 'success') {
                            //支付成功后的一系列操作
                            $(".pay_close").click();
                            $("#check").show(); //换成微信弹框
                            $(".model").show();
                            $("#queryBox").hide();
                        }
                    }
                }
            );
        }

        function showweixin(acno) {
            $("#queryBox,#loginBox").hide();

        }

        function closeCallback() {
            $(".model").show();
            $("#queryBox").show();

        }
    });
    $('.closeCheck').click(function() {
        $('#check').hide();
        $('.model').hide();
    });
    $("#getdaikuan").click(function() {
        var username = $("#x_m").val();
        var c_phone = $("#c_phone").val();
        var m_money = $("#m_money").val();
        if(username != "" && city != "" && phone != "") {
            if(checkUserPhoneNum(c_phone)) {
                jQuery.post('/car/addwillloan.json', {
                    name: username,
                    mobile: c_phone,
                    money: m_money
                }, function(data) {
                    if(data) {
                        alert("贷款信息提交成功,请保持电话畅通，我们将会尽快与您取得联系");
                    } else {
                        alert("抱歉，系统繁忙");
                    }
                });
            } else {
                alert("手机号格式不正确");
            }
        } else {
            alert("信息不能为空");
        }

    });
    $("#getdanbao").click(function() {
        var username = $("#d_m").val();
        var c_phone = $("#d_phone").val();
        var m_money = $("#d_money").val();
        if(username != "" && city != "" && phone != "") {
            if(checkUserPhoneNum(c_phone)) {
                jQuery.post('/car/addwillinsurance.json', {
                    name: username,
                    mobile: c_phone,
                    money: m_money
                }, function(data) {
                    if(data) {
                        alert("担保信息提交成功,请保持电话畅通，我们将会尽快与您取得联系");
                    } else {
                        alert("抱歉，系统繁忙");
                    }
                });
            } else {
                alert("手机号格式不正确");
            }
        } else {
            alert("信息不能为空");
        }

    });
});
var GiftQGFKZ = 0;
//大礼包展开或隐藏
function GiftQGF() {
    if(GiftQGFKZ == 0) {
        GiftQGFKZ = 1;
        var phoneNum = F.phoneNum;
        if(null != F.phoneNum && $(".SList .LList .LPic span").html() != null) {
            var str = '<p class="LNumber"><span>您的手机</span><input id="Codenumber" type="text" placeholder="请输入手机号" value="' + phoneNum + '"/><em style="display:none">号码错误</em></p><p class="LTip">抢购大礼包，3日内，购买车辆即可得到大礼包，礼包更替以等价礼品代替。</p><p class="LButton" id="GiftQG"  onclick="CodeYZM();">抢！抢！抢！</p>';
            $(".SList .LList").eq(0).html(str);
            $(".SList").css("height", "290px");
        }
        $(".GShow .SList").eq(0).show();
    } else {
        $(".GShow .SList").eq(0).hide();
        GiftQGFKZ = 0;
    }

}
//点击元素外使抢购大礼包隐藏
$(document).bind("click", function(e) {
    var target = $(e.target);
    $(".SList").attr("style");
    if(target.closest(".SList").length == 0 && target.closest(".GShow").length == 0) {
        GiftQGFKZ = 0;
        $(".SList").hide();
    } else {
        if(target.closest(".SList").length == 0 && target.closest(".GShow").length != 0) {
            GiftQGF();
        }
    }
});

function GiftWCCZ() {
    $("#Codenumber").val(F.phoneNum);
    $(".GShow .SList").eq(1).hide();
    GiftQGFKZ = 0;
}

$(function() {
    //判断验证是否通过
    $("#registerCodes").live("blur", function() {
        var registerCodes = $("#registerCodes").val();
        var giftid = $("#giftid").val();
        var carid = $("#simCarId").val();
        var Codenumber = $("#Codenumber").val();
        if(registerCodes != '') {
            jQuery.post('/car/registerCodes.json', {
                verifyCode: registerCodes,
                id: giftid,
                userid: carid,
                mobile: Codenumber
            }, function(data) {
                if(data) {
                    if(null != data.value) {
                        var id = data.value;
                        $("#giftvalueid_id").val(id);
                    }
                    if(data.message == true) {
                        $('.LList em').eq(1).hide();
                    } else {
                        $('.LList em').eq(1).show();
                    }
                }
            });
        } else {
            $('.LList em').eq(1).show();
        }
    });
    $("#registerCodes").live("click", function() {
        $('.LList em').eq(1).hide();
    });
    $("#CodeYZM").live("click", function() {
        $('.LList em').eq(2).hide();
    });

    var num = "";
    var complain = function() {
        num = getCookie('phoneNum');
        if(this.id == "huaxiahelp") {
            $("#help_huaxia").show();
            $("#input_help").val("");
        } else {
            $("#tousu_huaxia").show();
            $("#input_tousu").val("");
        }
        $(".check_all").attr("checked", false);
        $(".check_num").val(num);
        $(".warn_shadow").show();
    };
    $("#huaxiahelp").bind("click", complain);
    $("#tousu").bind("click", complain);
    $(".warn_title i").bind("click", function() {
        $("#tousu_huaxia").hide();
        $("#help_huaxia").hide();
        $(".warn_shadow").hide();
    });
    $(".think").bind("click", function() {
        $("#tousu_huaxia").hide();
        $("#help_huaxia").hide();
        $(".warn_shadow").hide();
    });

    var check_Num = function() {
        var check_one = /^[0-9]+$/;
        if(!check_one.test(this.value)) {
            $(this).val("");
        }
    };
    $(".check_num").bind("keyup", check_Num);

    var input_comp = function() {
        if(this.style.color == "red") {
            $(this).val("");
            $(this).css("color", "black");
        }
    };
    $("#input_tousu").bind("click", input_comp);
    $("#input_help").bind("click", input_comp);
    $("#mobile_num").bind("click", input_comp);
});

//验证手机验证码是否正确
function CodeYZM() {
    var pho2 = /^1\d{10}$/;
    var Codenumber = $("#Codenumber").val();
    var CodeYZM = $("#CodeYZM").val();
    var id = $("#giftvalueid_id").val();
    var carid = $("#simCarId").val();
    var giftid = $("#giftid").val();
    if(pho2.test(Codenumber) && '' != CodeYZM) {
        jQuery.post('/car/codeCheck.json', {
            registerCode: CodeYZM,
            mobile: Codenumber,
            id: id,
            carId: carid,
            giftid: giftid
        }, function(data) {
            if(data) {
                if(data.message == true) {
                    $(".GShow .SList").hide();
                    $(".GShow .SList").eq(1).show();
                    $(".GShow .SList").eq(1).css("height", "346px");
                    $("#Codenumber").val("");
                    $("#registerCodes").val("");
                    $("#CodeYZM").val("");
                } else {
                    $('.LList em').eq(2).show();
                }
            }
        });
    }
}

$(function() {
    //发送手机验证码
    $("#showbtn").live("click", function() {
        var pho2 = /^1\d{10}$/;
        $('.LList .LTel b').eq(0).html("获取验证码");
        var Codenumber = $("#Codenumber").val();
        var registerCodes = $("#registerCodes").val();
        if(pho2.test(Codenumber) && '' != registerCodes) {
            jQuery.post('/car/Codemobiles.json', {
                verifyCode: registerCodes,
                mobile: Codenumber
            }, function(data) {
                if(data) {
                    if(data.message == true) {
                        getWaitsecond();
                    } else {
                        $('.LList .LTel b').eq(0).html("发送失败");
                    }
                }
            });
        } else {
            $('.LList .LTel b').eq(0).html("发送失败");
        }
    });
    //短信
    var i = 60;

    function getWaitsecond() {
        $('.LList .LTel b').eq(0).hide();
        $('.LList .LTel b').eq(1).show();
        $('.LList .LTel b').eq(1).html('' + i + '秒后再发');
        $('.LList .LTel b').eq(1).css("background-color", "#b4b4b4");
        i = i - 1;
        if(i == -1) {
            $('.LList .LTel b').eq(0).show();
            $('.LList .LTel b').eq(1).hide();
            $('.LList .LTel b').eq(1).css("background-color", "#50A5D4");
            i = 60;
        } else {
            setTimeout(getWaitsecond, 1000);
        }
    }

    $("#Codenumber").live("blur", function() {
        var pho2 = /^1\d{10}$/;
        var Codenumber = $("#Codenumber").val();
        if(Codenumber != F.phoneNum && $(".SList .LList .LPic span").html() == null) {
            var str = '<p class="LNumber"><span>您的手机</span><input id="Codenumber" type="tel" placeholder="请输入手机号" value="' + Codenumber + '"/><em style="display:none">号码错误</em></p><p class="LPic"><span>图片验证码</span><input id="registerCodes" type="text" placeholder="请输入验证码" /><em style="display:none">错误</em><b><img title="点击刷新" style="height: 26px;width: 75px;" src="/servlet/yzCode.jpg" onclick="javascript:this.src=&quot;/servlet/yzCode.jpg?rnd=&quot;+Math.random();"></b></p><p class="LTel"><span>手机验证码</span><input id="CodeYZM" type="text" placeholder="请输入验证码" /><em style="display:none">错误</em><b id="showbtn" style="display:black;">获取验证码</b><b style="display:none;">0秒后再次发送</b></p><p class="LTip">抢购大礼包，3日内，购买车辆即可得到大礼包，礼包更替以等价礼品代替。</p><p class="LButton" id="GiftQG"  onclick="CodeYZM();">抢！抢！抢！</p>';
            $(".SList").css("height", "346px");
            $(".SList .LList").eq(0).html(str);
        } else if(Codenumber == F.phoneNum) {
            var str = '<p class="LNumber"><span>您的手机</span><input id="Codenumber" type="tel" placeholder="请输入手机号" value="' + Codenumber + '"/><em style="display:none">号码错误</em></p><p class="LTip">抢购大礼包，3日内，购买车辆即可得到大礼包，礼包更替以等价礼品代替。</p><p class="LButton" id="GiftQG"  onclick="CodeYZM();">抢！抢！抢！</p>';
            $(".SList").css("height", "290px");
            $(".SList .LList").eq(0).html(str);
        }
        if(!pho2.test(Codenumber)) {
            $('.LList em').eq(0).show();
        } else {
            $('.LList em').eq(0).hide();
        }
    });
});

/*placeholder*/
function placeholderSupport() {
    return 'placeholder' in document.createElement('input');
}
$(function() {
    $('input').val();
    /*********placeholder问题*********/
    if(!placeholderSupport()) { // 判断浏览器是否支持 placeholder
        $('[placeholder]').focus(function() {
            var input = $(this);
            if(input.val() == input.attr('placeholder')) {
                input.val('');
                input.removeClass('placeholder');
            }
        }).blur(function() {
            var input = $(this);
            if(input.val() == '' || input.val() == input.attr('placeholder')) {
                input.addClass('placeholder');
                input.val(input.attr('placeholder'));
            }
        }).blur();
    }
    //免费咨询
    $('body').allMessage({
        phoneNum: F.phoneNum,
        ifBtn: '.freeConsult',
        ifPiccode: state,
        successOn: 'MOn', //发送成功后添加
        successSend: '我们会尽快与您联系，请耐心等待！', //发送成功后提示内容
        successClose: 'successClose', //发送成功后关闭按钮
        messageTitle: '免费咨询', //信息标题
        messageContent: '留下联系方式，商家会稍后联系您！', //信息内容
        carId: F.carId,
        carInfo: carInfo,
        boxType: 24,
        ifClosecall: true, //是否需要添加关闭回调函数
        closeCallback: null, //回调函数：点击关闭无权限后
				verifyCallback:function(){
					var label = '免费咨询pc提交';
					window._hmt && window._hmt.push(['_trackEvent', label, 'click']);
					$('#messageBox_').addClass('MOn');
					$('.optionType').hide();
					$('.freebackbox,#warnShadow').show();
					var mySwiper = new Swiper('.swiper-container', {
						autoplay: 5000,//可选选项，自动滑动
						loop:true
					});
					$('.goleft').click(function(){
						mySwiper.swipePrev();
					});
					$('.goright').click(function(){
						mySwiper.swipeNext();
					});
				}
    });
    //自动弹框为了不进百度统计
    $('body').allMessage({
        phoneNum: F.phoneNum,
        ifBtn: '#freetoask',
        ifPiccode: state,
        successOn: 'MOn', //发送成功后添加
        successSend: '我们会尽快与您联系，请耐心等待！', //发送成功后提示内容
        successClose: 'successClose', //发送成功后关闭按钮
        messageTitle: '免费咨询', //信息标题
        messageContent: '留下联系方式，商家会稍后联系您！', //信息内容
        carId: F.carId,
        carInfo: carInfo,
        boxType: 24,
        ifClosecall: true, //是否需要添加关闭回调函数
        closeCallback: null, //回调函数：点击关闭无权限后
        verifyCallback:function(){
					$('.freebackbox,#warnShadow').show();
					var mySwiper = new Swiper('.swiper-container', {
						autoplay: 5000,//可选选项，自动滑动
						loop:true
					});
					$('.goleft').click(function(){
						mySwiper.swipePrev();
					});
					$('.goright').click(function(){
						mySwiper.swipeNext();
					});
				}
    });

    //查看工商信息
    // $('body').allMessage({
    //     phoneNum: F.phoneNum,
    //     ifBtn: '.verify_person',
    //     ifPiccode: state,
    //     successOn: 'MOn', //发送成功后添加
    //     successSend: '我们会尽快与您联系，请耐心等待！', //发送成功后提示内容
    //     successClose: 'successClose', //发送成功后关闭按钮
    //     messageTitle: '查看工商信息', //信息标题
    //     messageContent: '提示：亲,手机登陆才能查看工商信息', //信息内容
    //     carId: F.carId,
    //     carInfo: carInfo,
    //     boxType: 26,
    //     ifClosecall: true, //是否需要添加关闭回调函数
    //     closeCallback: null //回调函数：点击关闭无权限后
    // });
    $('.verify_person').click(function(){
    	$('.model-icbc').show();
    	$('.model').show();
    });

    //点赞
    $("#zan").click(function() {
        jQuery.post('/car/dianzan.json', {
            carId: $("#simCarId").val()
        }, function(data) {
            if(data.message == "点赞成功") {
                dianzan = dianzan + 1;
                $("#zan_od").html(dianzan);
                $("#zan").hide();
                $("#zan_od").show();
            }
        });

    });
    var carInfo = $("#cardetail").val();
    var price = $.trim($(".price span").html());
    if(price != null) {
        price = price.replace("万", "");
    }
    price = [price, car_price_range];
    //取批量砍价车辆
    var strCar = '';
    var sflag = 0;
    $.ajax({
        type:"post",
        url:"/car/paidvehicle.json",
        async:false,
        data:{id:F.carId},
        success:function(data){
            if(data.carlist && data.carlist.length > 0){
            	var che = 'checked="checked"';
                strCar += '<p class="text">同时对以下车辆进行报价</p>'
                for(var i=0 ; i<data.carlist.length; i++){
                	
                    var carlist = data.carlist[i];
                    if(!carlist.firstSmallPic){
                        carlist.firstSmallPic = STATICSERVER+'/web/dist/static/car/images/car.jpg';
                    } else if(carlist.firstSmallPic.indexOf('http://img.hx2cars.com/upload') <= -1){
                        carlist.firstSmallPic = 'http://img.hx2cars.com/upload'+carlist.firstSmallPic
                    }
                    strCar += '<div class="kjCarCont">';
                    strCar +=     '<input class="kjC" name="kanjiaCheck" data-carId="'+carlist.id+'" type="checkbox" '+che+'/>';
                    strCar +=     '<div class="kjcarR">';
                    strCar +=         '<dvi class="carImg"><img class="carImg2" src="'+carlist.firstSmallPic+'" alt=""></dvi>';
                    strCar +=         '<div class="rightInfo">';
                    strCar +=              '<p class="kcaritle">'+carlist.title+'</p>';
                    strCar +=              '<p class="addr"><span class="address">'+carlist.areaName+'</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span class="">'+carlist.journey+'万公里</span></p>';
                    strCar +=              '<p class="carMoney">￥'+carlist.money+'万</p>';
                    strCar +=         '</div>';
                    strCar +=     '</div>';
                    strCar += '</div>';
                    che = "";
                }
                sflag = 1;
            }
        }
    });
    $('body').allMessage({
        phoneNum: F.phoneNum,
        ifBtn: '#WBook',
        ifPiccode: state,
        successOn: 'MOn', //发送成功后添加
        successSend: '我们会尽快与您联系，请耐心等待！', //发送成功后提示内容
        successClose: 'successClose', //发送成功后关闭按钮
        messageTitle: '我要砍价', //信息标题
        messageContent: price, //信息内容
        carId: F.carId,
        carInfo: carInfo,
        boxType: 3,
        verifyCallback: dcCallback,
        ifClosecall: true, //是否需要添加关闭回调函数
        //closeCallback: typeColse //回调函数：点击关闭无权限后
        closeCallback: null //回调函数：点击关闭无权限后
    });

    // 从我的关注页面点击我要砍价的事件
    var url = location.search;
    if(url.indexOf("?iskanjia") != -1) {
        $('#WBook').click();
        $('#closeBtn_,#successClose').click(function() {
            var newUrl = '/details/' + F.carId;
            url = newUrl;
            window.location.href = url;
        });
    }

    //回调函数：发信息框点击提交
    function dcCallback(type,otherEnter) {
        if($('#saleleads').prop('checked')) {
            $.post('/require/saveReservePC.json', {
                carId: F.carId,
                from: 'pc'
            }, null)
        }
        //弹框
        // 统计登录是否登录成功 点击
        verifyCallback(type);

        var isAssistant = $("input##AssistantC[type='checkbox']").is(':checked');
        var money= parseFloat($('#myPrice_title').html());
        F.phoneNum =$('#phoneBox_').val();
        kjMoney = money;
        kjState = true;
        if(isAssistant && !otherEnter){  //私人助理选中
            //私人助理接口数据
            getAssis();
            //百度统计
            verifyCallback(16);

        } else{
            //$('#nobox').after('<div class="kjText"><p class="kjImg"></p><p class="text1">砍价成功，稍后卖家会与您联系！</p><span class="successClose2">开通私人助理，华夏帮您协商价格</span><span class="successClose3">不用了，谢谢</span></div>')
            $('.kjText').remove();
            if(otherEnter){
                $('.warn_box,.warn_shadow').remove();//otherEnter 满足时。暂时必须先remove。
                $('body').append(
                    '<div class="warn_shadow" id="warnShadow"></div><div class="warn_box warn_box1 SMessage MOn" id="messageBox_2" style="display: block; margin-top: -232px;"><span class="think" id="closeBtn_"></span>' +
                    '<div class="kjText"><p class="kjImg"></p><p class="text1">砍价成功，稍后卖家会与您联系！</p><div class="kjCarInfo">'+strCar+'<p class="subBaojia">确定</p></div></div>' +
                    '</div>'
                );
                $(".think").bind("click", function() {
                    $(".warn_box,.warn_shadow").remove();
                });
            } else {
                $('#nobox').after('<div class="kjText"><p class="kjImg"></p><p class="text1">砍价成功，稍后卖家会与您联系！</p><div class="kjCarInfo">'+strCar+'<p class="subBaojia">确定</p></div></div>')
            }
            //$('#nobox').after('<div class="kjText"><p class="kjImg"></p><p class="text1">砍价成功，稍后卖家会与您联系！</p><div class="kjCarInfo">'+strCar+'<p class="subBaojia">确定</p></div></div>')
            $('#messageBox_').addClass('MOn').show();
            $('.successSend,.successClose').remove();
            if(sflag){
                $('.kjCarInfo').css({'borderTop':'1px solid #eee'});
                var hg = $('.warn_box1').outerHeight();
                $('.warn_box1').css({'margin-top': '-' + hg / 2 + 'px'});
            }
            // 对同价位车辆进行报价
            $('.kjText').delegate('.subBaojia','click',function(){
                $('#messageBox_').hide();
                // $('#warnShadow').hide();
                // $('.warn_box').hide();
                $('#warnShadow').remove();
                $('.warn_box').remove();
                $(':checkbox[name="kanjiaCheck"]:checked').each(function() {
                    var carid = $(this).attr('data-carId');
                    if($(this).prop('checked')){
                        clueFun(carid,F.phoneNum,3,'同车批量砍价',money);
                    }
                });
            });
            $('.successClose2').on('click',function(){getAssis();verifyCallback(17);})
        }
        function getAssis(){
            $.post('/personalAssitant/getAssitantInfo.json',function(data){
                if(data){
                    var p=data.personalAssitant;
                    $('#assi_submit').attr({'data-m':p.money,'data-type':p.childType,'data-title':p.tittle});
                }
            });
            $('#messageBox_').hide();
            $('#warnShadow').hide();
            $('.assi_box').show();
            $('#assi_submit').addClass('login_type');
            $('.assi_box li:eq(3)').hide();
            $('.assi_box li:eq(4)').hide();
            $('.assi_box li:eq(5)').hide();
            $('.assi_box li:eq(6)').hide();
            $('.model').show();
        }


    }
    // function TextCallback(){
    // 	var m= $('#messageBox_');
    // 	$('.successSend').remove();
    // 	$('.successSend').html('砍价成功，稍后卖家会与您联系！');
    // 	m.after('<p>11111</p>');
    // }

    if($('.Float_lianxi_price .price').length > 0) {
        validNum($('.Float_lianxi_price .price')[0]);
    }
    if($('.pri_val_cont .price').length > 0) {
        validNum($('.pri_val_cont .price')[0]);
    }

    $('#coupleBack').pchxLogin({
        loginState:loginstate,
        checkedCallback: loginsta
    });

    function loginsta(data){
        $.cookie("regPop",1);
        //window.location.href = location.href;
        pfcheckOpenvip(data);
    }

//批发价
    function wholesale(){
        var str=location.href;
        var wholesaleStr = (str.split('/'))[3];
        if(Login == 0){
            $('.lookWholesale').show();
            $('.car_check').show();
            $('.wholesale').hide();
        }else if(Login > 0 && vipstate == '2' && wholesaleStr == 'details'){
            $('.lookWholesale').hide();
            $('.car_check').hide();
            $('.wholesale').show();
        }else if(Login > 0 && vipstate == '2' && wholesaleStr == 'tradedetails'){
            $('.lookWholesale').hide();
            $('.car_check').show();
            $('.wholesale').hide();
        }else{
            $('.lookWholesale').show();
            $('.car_check').show();
            $('.wholesale').hide();
        }
    }
    wholesale();

    $('.lookWholesale').on('click',function(){
        if(Login !== '1'){
            $('#coupleBack').click();
        }else if(vipstate != 2) {
            // var phoNum = F.phoneNum;
            // var trackInfo = 'pc会员中心-开通vip充值';
            // $(this).pcBuyVips({
            //     childtype:'appvip',
            //     phoneNum:phoNum,
            //     trackInfo:trackInfo
            // });
            pfcheckOpenvip();
        }

    });

    // 查看二手车批发价。开通会员
    function pfcheckOpenvip (data){
        if(!F.phoneNum) {//解决  直接登录后，弹出充值框，得到手机号码。
            if(data.mobile){
                // 扫码登录
                F.phoneNum = data.mobile;
            } else if(data.codeVo.number) {
                // 手机验证
                F.phoneNum = data.codeVo.number;
            }
        }
        var trackInfo = 'pc详情查看批发价-开通vip充值';
        $(this).pcBuyVips({
            childtype:'appvip',
            phoneNum:F.phoneNum,
            trackInfo:trackInfo
        });
    }


    var regPop = $.cookie("regPop");
    if(regPop){
        $(".lookWholesale").click();
        $.cookie("regPop",null)
    }

    var pirce_val = '';
    //点击底部砍价
    $('#WBook2').click(function() {
        pirce_val = $('.Float_lianxi_price .price').val();
        if(pirce_val !='' || pirce_val !=undefined && pirce_val > 0){
            simmit(this);
            //dcCallback(3,true);//换成现在的回调 弹框
        }else{
            kanjiaFun();
        }
    });
    $('#WBook3').click(function() {
        pirce_val = $('.pri_val_cont .price').val();
        if(pirce_val !='' || pirce_val !=undefined && pirce_val > 0){
            simmit(this);
            //dcCallback(3,true);//换成现在的回调 弹框
        }else{
            kanjiaFun();
        }
    });
    //出价框有值直接提交！2018-06-22最新修改
    function simmit(_this){
        var pho = F.phoneNum,
            $carid = F.carId,
            $msg = '',
            $price = pirce_val,
            $type = 3;
        if(loginstate == true){
            $.ajax({
                url:'/require/commonrequire.json',
                type:'get',
                data:{
                    carId: $carid,
                    msg: '直接砍价',
                    number: pho,
                    type: $type,
                    Code: '',
                    position: getQueryString("getQueryString"),
                    style: getStyle(),
                    price: $price
                },
                success:function(data) {
                    dcCallback(3,true);//换成现在的回调 弹框
                    // $(_this).attr('disabled',false);
                    // if (data.message) {
                    //     $('.Float_lianxi_price .price').val('');
                    //     $('.pri_val_cont .price').val('');
                    //     $('body').append(
                    //         '<div class="warn_box warn_box1 SMessage MOn" id="messageBox_2" style="display: block; margin-top: -232px;">' +
                    //         '<p class="successSend">我们会尽快与您联系，请耐心等待！</p>' +
                    //         '<p class="successClose" id="successClose">关闭</p>' +
                    //         '<span class="think" id="closeBtn_"></span>' +
                    //         '</div><div class="warn_shadow" id="warnShadow2"></div>'
                    //     );
                    //     $('#closeBtn_2,#successClose').on('click',function(){
                    //         $('#messageBox_2').remove();
                    //         $('#warnShadow2').remove();
                    //     })
                    // }
                },error:function(){
                    $(_this).attr('disabled',false);
                }
            })
        }else{
            kanjiaFun();
        }
    }

    function kanjiaFun() {
        $('#WBook').click();
        if(pirce_val && parseFloat(pirce_val) > 0) {
            $('#myPrice_title').text(pirce_val + '万');
            //砍价框计算
            getJyTitle.dragPrice(
                parseFloat(pirce_val),
                $('#progress').width()-$('.pro_btn').width(),
                false
            )
        }
    }

    //降价通知
    $('body').allMessage({
        phoneNum: F.phoneNum,
        ifBtn: '.tool_depreciate',
        ifPiccode: state,
        successOn: 'MOn', //发送成功后添加
        successSend: '我们会尽快与您联系，请耐心等待！', //发送成功后提示内容
        successClose: 'successClose', //发送成功后关闭按钮
        messageTitle: '降价提醒', //信息标题
        messageContent: price, //信息内容
        carId: F.carId,
        carInfo: carInfo,
        boxType: 8,
        verifyCallback: jjtzCallBack,
        ifClosecall: true, //是否需要添加关闭回调函数
        closeCallback: null //回调函数：点击关闭无权限后
    });

    function jjtzCallBack(data) {
        $('#messageBox_,#warnShadow').hide();
        $('#app4s,.model').show();

    }

    //咨询底价
    $('body').allMessage({
        phoneNum: F.phoneNum,
        ifBtn: '.tool_yuyue',
        carId: F.carId,
        boxType: 15,
        ifPiccode: state,
        messageTitle: '咨询底价', //信息标题
        messageContent: '留下您的联系方式，及时获取车辆最低价', //信息内容
        successOn: 'MOn', //发送成功后添加
        successClose: 'successClose', //发送成功后关闭按钮
        ifClosecall: false, //是否需要添加关闭回调函数
        verifyCallback: verifyCallback,
        // closeCallback: typeColse //回调函数：点击关闭无权限后
        closeCallback: null //回调函数：点击关闭无权限后
    });
    //预约批发
    $('body').allMessage({
        phoneNum: F.phoneNum,
        ifBtn: '#yypifa',
        boxType: 11,
        carId: F.carId,
        ifPiccode: state,
        messageTitle: '预约批发', //信息标题
        messageContent: '我对' + carInfo + '感兴趣，若有同类车，请通知我。', //信息内容
        successOn: 'MOn', //发送成功后添加
        successClose: 'successClose', //发送成功后关闭按钮
        ifClosecall: false, //是否需要添加关闭回调函数
        verifyCallback: verifyCallback,
        closeCallback: null //回调函数：点击关闭无权限后
    });
    //担保批发
    $('body').allMessage({
        phoneNum: F.phoneNum,
        ifBtn: '#db_car',
        boxType: 12,
        carId: F.carId,
        ifPiccode: state,
        messageTitle: '订购车辆', //信息标题
        messageContent: '如果您对' + carInfo + '感兴趣，为了方便我们联系您，请输入您的真实姓名和联系方式。', //信息内容
        successOn: 'MOn', //发送成功后添加
        successClose: 'successClose', //发送成功后关闭按钮
        ifClosecall: false, //是否需要添加关闭回调函数
        closeCallback: null //回调函数：点击关闭无权限后
    });
    //预约求购
    $('body').allMessage({
        phoneNum: F.phoneNum,
        ifBtn: '#yyqg',
        carId: F.carId,
        boxType: 9,
        ifPiccode: state,
        messageTitle: '预约求购', //信息标题
        messageContent: '我对' + carInfo + '感兴趣，若有同类车，请通知我。', //信息内容
        successOn: 'MOn', //发送成功后添加
        successClose: 'successClose', //发送成功后关闭按钮
        ifClosecall: false, //是否需要添加关闭回调函数
        closeCallback: null //回调函数：点击关闭无权限后
    });
    //贷款
    $('body').allMessage({
        phoneNum: F.phoneNum,
        ifBtn: '.diakuan',
        carId: F.carId,
        boxType: 28,
        ifPiccode: state,
        messageTitle: '我要贷款', //信息标题
        //messageContent: '留下您的联系方式，商家将会及时与您联系！', //信息内容
        messageContent: price,
        successOn: 'MOn', //发送成功后添加
        successClose: 'successClose', //发送成功后关闭按钮
        ifClosecall: false, //是否需要添加关闭回调函数
        closeCallback: null //回调函数：点击关闭无权限后
    });
    //车辆投诉
    $('body').allMessage({
        phoneNum: F.phoneNum,
        ifBtn: '.tool_jb',
        boxType: 6,
        carId: F.carId,
        ifPiccode: state,
        messageTitle: '我要报错', //信息标题
        messageContent: '', //信息内容
        successOn: 'MOn', //发送成功后添加
        successClose: 'successClose', //发送成功后关闭按钮
        ifClosecall: false, //是否需要添加关闭回调函数
        closeCallback: null //回调函数：点击关闭无权限后
    });
    //收藏
    if(F.phoneNum) {
        $('.sc').click(function() {
            $.get('/require/commonrequire.json', {
                carId: F.carId,
                msg: '关注',
                number: F.phoneNum,
                type: 14,
                position: getQueryString("getQueryString"),
                style: getStyle(),
                price: ''
            }, shouchangCallback);
            //verifyCallback(14,false);
        })
    } else {
        $('body').allMessage({
            phoneNum: F.phoneNum,
            ifBtn: '.sc',
            boxType: 14,
            carId: F.carId,
            ifPiccode: state,
            messageTitle: '关注', //信息标题
            messageContent: '通过手机验证，即可收藏车辆', //信息内容
            successOn: 'MOn', //发送成功后添加
            successClose: 'successClose', //发送成功后关闭按钮
            verifyCallback: shouchangCallback,
            ifClosecall: false, //是否需要添加关闭回调函数
            closeCallback: null //回调函数：点击关闭无权限后
        });
    }

    function getpic(pic) {
        if(pic != null && pic.indexOf("http://") == -1) {
            return pic = "http://img.hx2cars.com/upload" + pic;
        } else {
            return pic;
        }
    }

    //回调函数：用户验证成功后
    function shouchangCallback() {
        $('.isCollect').show();
        $('.sc').hide();
        $('#chatCar .collect').removeClass('collect').addClass('collected');
        $('.model_collect_succ').removeClass('hidden');
        $('.model').show();
        $('.look_collect').click(function() {
            var phoneNum = F.phoneNum;
            var carid = $("#simCarId").val();
            if(null == phoneNum || phoneNum == '') {
                phoneNum = $("#phoneBox_").val();
            }
            jQuery.post('/require/showrequire.json', {
                number: phoneNum,
                type: 14
            }, function(data) {
                if(data) {
                    $("#shoucang_car").html("");
                    for(var i = 0, str = ''; i < data.list.length; i++) {
                        str += '<li id="' + data.list[i].id + '">' +
                            '<a href="/details/' + data.list[i].id + '" target="_blank"><img src="' + getpic(data.list[i].firstSmallPic) + '"></a>' +
                            '<div class="cont"><a href="/details/' + data.list[i].id + '" target="_blank"><p class="cont_title">' + '[' + data.list[i].shortAreaName + ']&nbsp;&nbsp;' + data.list[i].title + '</p></a><p class="cont_price">￥' + data.list[i].money + '万</p><div class="con_collect collect collected"><i></i><span>已关注</span></div></div>' +
                            '</li>';
                    }
                    $("#shoucang_car").append(str);
                    $(".loading").hide();
                    //$('.model_collect_succ .close_btn').click();
                    $('.model_collect_succ').addClass('hidden');
                    $('.model').hide();
                    $("#RAside").stop(true, false).animate({
                        "right": 300
                    }, 300);
                    $('#addfavorit_l').addClass('hover');
                    $("#AUnfold>div").hide();
                    $("#A1").show();
                    $("#AUnfold").stop(true, false).animate({
                        "right": 0
                    }, 300);
                    $(".aside li .shoucang").addClass("select");
                    $("#s_cang .more").css("display", "block");
                    $(".wsc").css("display", "none");
                }
            });
        });
        if(!F.phoneNum) {
            verifyCallback(14);
        } else {
            verifyCallback(14);
        }
        var car_brand_id = $('#car_brand').val();
        var areaCode = $('#areaCode').val();
        if($('.banner_cont .banner li').length <= 0) {
            $.post('/car/getRecommendCar2.json', {
                serialid: car_brand_id,
                areaCode: areaCode
            }, function(data) {
                var str = '';
                if(data) {
                    var carLength = data.carList.length;
                    carLength >= 8 ? carLength = 8 : carLength;
                    for(var i = 0; i < carLength; i++) {
                        str += '<li>';
                        str += '<a href="/details/' + data.carList[i].id + '" target="_blank"><img src="' + data.carList[i].firstSmallPic + '" alt="" /></a>';
                        str += '<p class="car_title"><a target="_blank" href="/details/' + data.carList[i].id + '">' + data.carList[i].title + '</a></p>';
                        str += '<p class="car_addr"><span class="comp_address">' + data.carList[i].shortAreaName + '</span><span class="car_money">￥' + data.carList[i].money + '万</span></p>';
                        str += '</li>';
                    }
                }
                $('.banner_cont .banner').append(str);
            });
        }
    }

    $('.model_collect_succ .close_btn,.model_collect_succ .cancel').click(function() {
		/* if(F.phoneNum){
		 $('.model_collect_succ').addClass('hidden');
		 $('.model').hide();
		 } else {
		 window.location.reload();
		 }*/

        $('.model_collect_succ').addClass('hidden');
        $('.model').hide();
        window.location.reload();
    });
    // 关注提示 关闭
    $('.coll_colse').click(function() {
        $('.collests_cont').addClass('hidden');
    });

    // $('.zixun').click(function (e) {
    //     var argsArray = $(this).data('args').split(',');
    //     $('#cheliao').addClass('movetop');
    //     chatWindowShow(argsArray[0], argsArray[1], argsArray[2], argsArray[3]);
    // });

    $('#yypifa2').click(function() {
        $('#yypifa').click();
    });
});

$(function() {
    // 收藏的猜你喜欢
    var i = 0;
    var $leftBtn = $('.banner_cont .btnleft');
    var $rightBtn = $('.banner_cont .btnright');
    var marginLeft = 0;

    $leftBtn.click(function() {
        if(i > 0) {
            marginLeft = 1;
        }
        if(marginLeft > 0) {
            $('.banner_cont .banner').animate({
                marginLeft: 0 + 'px'
            }, 300);
        }
    });
    $rightBtn.click(function() {
        if(marginLeft >= -1400) {
            $('.banner_cont .banner').animate({
                marginLeft: -700 + 'px'
            }, 300);
        }
        i++;
    });
});
//价格走势
$(function() {
    var getChart = function() {
        var brand = $("#car_brand").val();
        var year = $("#year").val();
        if($("#info").html() == null || $("#info").html() == "") {
            //drawSerial(brand,year);
            drawhighchart(brand, year);
        }
    };
    $("#TTend").bind("click", getChart);

    $("#car_top .tend").bind("click", getChart);
});
/*购前检测*/
$(function() {
    var diqu = $('.detail .diqu').text(),
        bxFlag = false;
    var onSiteData = {
        110100: '北京',
        310100: '上海',
        330100: '杭州',
        440100: '广州',
        320100: '南京',
        320500: '苏州',
        420100: '武汉',
        510100: '成都',
        440600: '佛山',
        410100: '郑州'
    };
    var carDate = $("#dateH").val().substr(0, 4);
    var journey = $("#journey").val();
    var carprice = $("#moneycar").html();
    var mydate = new Date();
    var year = mydate.getFullYear();
    $.each(onSiteData, function(i, n) {
        if(diqu.indexOf(n) > -1 && year - carDate <= 6 && journey <= 10 && carprice > 6 && carprice <= 50) { //判断条件
            bxFlag = true;
        }
    });
    if(bxFlag) {
        $(".dTest").show()
    }
    $('.closeIndfoBox').click(function() {
        $('.model').hide();
        $('.infoBox').hide();
    });
    $('.dTest').click(function() {
        if(bxFlag) {
            window.location.href = '/examineInsurance/index.htm?id=' + F.carId;
        } else {
            window.location.href = '/examine/index.htm?id=' + F.carId;
        }
    });
});

//私人助理
$(function() {
    if(flag == 9) {
        $(".vip").show();
    }
    var $assi_box = $('.assi_box');
    $('#assistant,.goAssistant').click(function() {
        //私人助理接口数据
        $.post('/personalAssitant/getAssitantInfo.json',function(data){
            if(data){
                var p=data.personalAssitant;
                $('#assi_submit').attr({'data-m':p.money,'data-type':p.childType,'data-title':p.tittle});
            }
        });
        if(F.phoneNum) {
            var asheight = $assi_box.height();
            $assi_box.css("marginTop", -asheight / 2);
            $('#assi_submit').addClass('login_type');
            if($.cookie('canSend') != '1') {
                $('#validCode').parent().addClass('hidden');
            }
            $('.model').show();
            $assi_box.fadeIn();
            $assi_box.find('li:eq(3)').show();
            $assi_box.find('li:eq(4)').hide();
            $assi_box.find('li:eq(5)').hide();
            $assi_box.find('li:eq(6)').hide();
        } else {
            $assi_box.fadeIn();
            $('.model').show();
        }
    });
    /***关闭***/
    $('#close_assi').click(function() {
        $('.model').hide();
        $assi_box.fadeOut();
        getJyTitle.clearStatus();
    });
    //申请
    $('#assi_submit').click(function() {
        var moeny='',phoneNum='';
        if(kjState){
            moeny=kjMoney;
            phoneNum =F.phoneNum;
        }else{
            moeny = $.trim($("#moeny").val());
            loginstate ? phoneNum = F.phoneNum : phoneNum = $.trim($("#phoneNum").val());
        }
        $('#warn').hide();
        var m=$('#assi_submit'),
            Smoney=m.attr('data-m'),
            Type=m.attr('data-type'),
            title=m.attr('data-title'),
            phoneCode = $.trim($('#phoneCodes').val()),
            radio_assi = $('input:radio[name="assist"]:checked').val(),
            token = radio_assi + ',' + '您期望的价格是' + moeny + '万元',
            assi_text ={
                type:Type,
                id:F.carId,
                money:Smoney,
                assiText:radio_assi,
                carMoney:moeny
            };
        if(!radio_assi) {
            showError('请选择单选!');
        } else if(!moeny) {
            showError('请填写期望价格!');
        } else {
            if(!$(this).hasClass('login_type')) {
                if(!phoneNum) {
                    showError('请填写电话号码!');
                } else if(!phoneCode) {
                    showError('请填写手机验证码!');
                } else {
                    $.post('/code/codenum.json', {
                        Number: phoneNum,
                        Code: phoneCode
                    }, function(data) {
                        if(data.message == '短信验证成功') {
                            GetBeg();
                        } else {
                            $("#warn").show();
                            $("#warn").html('短信验证码错误');
                        }
                    });
                }
            } else {
                GetBeg();
            }
        }

        function GetBeg(){
            $.get('/personalAssitant/subInfo.json', {
                carId: F.carId,
                msg: token,
                price: moeny,
                number: phoneNum,
                position:getQueryString("getQueryString"),
                style:getStyle()
            }, function(data) {
                var typeId = data.typeId;
                if(data.message == 'success') { //提交成功
                    if(data.open_status == 1){ //已开通私人助理
                        $('.assi_box').hide();
                        $('.wechat').show();
                        $('.model').show();
                    }else{
                        $assi_box.hide();
                        $('.model').hide();
                        $('.pho').html(F.phoneNum);
                        getJyTitle.pcBuyAssis({
                            phoneNum:phoneNum,
                            typeId: typeId,
                            trackInfo:"pc开通私人助理",
                            assi_text:assi_text,
                            title:'开通私人助理'
                        });
                    }
                }else{
                    if(data.open_status == 1){
                        $('.assi_box').hide();
                        $('.wechat').show();
                        $('.model').show();
                    }else{
                        alert('数据提交失败，请稍后重试！')
                    }
                }
            });
        };
    });

    //支付成功后回调函数
    function assisCallback(){
        alert(1);
    }

    function showError(text) {
        $('#warn').html(text).show();
    }

    function showError5(text) {
        $('#warn').html(text).css('background', 'none').show();
    }

    //重新获取验证码的等待时间
    function waitTime1(wait) {
        if(wait > 0) {
            $(".getPhoneCode").html("重新获取(" + wait + ")");
            setTimeout(function() {
                wait = wait - 1;
                waitTime1(wait);
            }, 1000);
        } else {
            $(".getPhoneCode").html("获取验证码").on("click", getPhoneCode);
            //更换验证码
            $(".codePic").click();
        }
    }

    function getPhoneCode(e) {
        var mobile = $.trim($('#phoneNum').val());
        if(!mobile || !/^1\d{10}$/.test(mobile)) {
            showError('请填写正确的手机号!');
        } else {
            var $picCode = $('#validCode').parent();
            if($picCode.hasClass('hidden') || $.cookie('canSend') != '1') {
                $.post('/login/validateCode.json', {
                    mobile: mobile
                }, function(data) {
                    if(data.message == 'success') {
                        showError5("验证码已发送，您注意查收");
                        $(".getPhoneCode").off("click");
                        var wait = 60;
                        waitTime1(wait);
                    } else if(data.message == 'fail') {
                        $picCode.removeClass('hidden');
                        showError('短信发送失败，请重试！');
                    }
                });
                $.cookie('canSend', '1', {
                    expires: 1
                })
            } else {
                if($picCode.hasClass('hidden')) {
                    $picCode.removeClass('hidden');
                    return;
                }
                var validCode = $.trim($('#validCode').val());
                if(!validCode || validCode.length != 4) {
                    showError('请填写正确的图片验证码!');
                } else {
                    $.post(
                        '/code/codephones.json', {
                            Number: mobile,
                            verifyCode: validCode
                        },
                        function(data) {
                            if(data.message == "图片验证码错误!") {
                                showError("请填写正确的图片验证码！");
                                $(e.target).parents('li').prev().find('.codePic').click(); //更换图片验证码
                            } else if(data.message == "短信发送成功") {
                                showError5("验证码已发送，您注意查收");
                                $(".getPhoneCode").off("click");
                                var wait = 60;
                                waitTime1(wait);
                            } else if(data.message == "短信验证码发送失败，您已超出5条!") {
                                showError("你今天的短信次数已达上限，请明天再试!");
                                $(e.target).parents('li').prev().find('.codePic').click(); //更换图片验证码
                            }
                        }
                    )
                }
            }
        }
    }

    $('.getPhoneCode').on("click", getPhoneCode);
    //点击开通按钮
    $('.open').click(function() {
        //判断是否有电话号码，如果没有号码，则通过获取输入框text值的方式来得到电话号码
        var phoneNum = $('.assiTextCont .pho').text();
//		if(F.phoneNum) {
//			$('#ao1').html("号码：" + F.phoneNum);
//			$('#ao1').attr("value", F.phoneNum);
//		} else {
//			$('#ao1').html("号码：" + phoneNum);
//			$('#ao1').attr("value", phoneNum);
//		}
//		$("#vipMoney").attr("value", 299);
//		$('.vip').fadeIn();
        $('.verify').hide();
        $(".model").hide();
        $(this).pcBuyVips({
            childtype:'appvip',
            phoneNum:phoneNum,
            trackInfo:"pc开通私人助理"
        });
    });

    /******充值********/
    $("#zhifu li").each(function() {
        $(this).click(function() {
            $("#zhifu li").removeClass('select');
            $("#zhifu").find('i').hide();
            $(this).addClass('select');
            $(this).find('i').show();
        });
    });
    var acno = null;
    $("#openVip").click(function() {
        var sumb = 1;
        if(sumb == 1) {
            sumb = 0;
            var money = $.trim($('#vipMoney').val());
            var num = $.trim($('#ao1').attr('value'));
            var pho2 = /^1\d{10}$/;
            if(pho2.test(num)) {
                var typeid = "";
                if(money == money) {
                    typeid = 12;
                }
                if($('#zhifu li').eq(0).attr("class") == "select") {
                    jQuery.post('/mobile/weixinQR.json', {
                        money: 299,
                        rechargetype: 1,
                        flag: "pc",
                        mobile: num,
                        childtype: "appvippersonal",
                        typeId: typeid
                    }, function(data) {
                        if(data) {
                            if(data.message != null) {
                                alert(data.message);
                                sumb = 1;
                                return false;
                            }
                            //微信支付弹窗 必要参数二维码地址及轮询id
                            $(this).wxpay({
                                code_url: data.code_url,
                                prepay_id: data.prepay_id,
                                acno: data.acno,
                                intervalCallback: intervalCallback,
                                showCallback: showCallback,
                                closeCallback: closeCallback
                            });

                        }
                    });
                }
                if($('#zhifu li').eq(1).attr("class") == "select") {
                    window.location.href = "/money/submitmember.htm?money=" + money + "&rechargetype=1&childtype=appvippersonal," + F.carId + "&mobile=" + num + "&typeId=" + typeid;
                }
            }
        }
    });

    function intervalCallback(acno) {
        jQuery.post('/mobile/xjrechargeres.json', {
                out_trade_no: acno
            },
            function(data) {
                if(data) {
                    if(data.message == 'success') {
                        $(".pay_close").click();
                        //$(".vip").hide();
                        $(".wechat").show(); //换成微信弹框
                    }
                }
            });
    }

    function closeCallback() {
        $('.model').show();
        $(".vip").show();
    }

    function showCallback() {
        $(".vip").hide();
    }

    /***关闭微信支付窗口***/
    $('#winXiclose').click(function() {
        $('.wechat').hide();
        $('.vip').hide();
        $('.model').fadeOut();
        getJyTitle.clearStatus();
    });

    $('.re_login').click(function() {
        $('.verify').hide();
        $('.model').fadeOut();
    });

    $('.vip .assi_title .close').click(function() {
        $('.vip').hide();
        $('.model').fadeOut();
    });
    $('.verify .assi_title .close').click(function() {
        $('.verify').hide();
        $('.model').fadeOut();
    });
    $('.look').click(function() {
        $('.personalNote').show();
        $('.model').fadeIn();
        $('.vip').hide();
        $('.wechat').hide();
    });
    $('#memberInfo').click(function() {
        $('.personalNote').hide();
        $('.model').fadeOut();
    });
    $('.pClose').click(function() {
        $('.personalNote').hide();
        $('.model').fadeOut();
    });
    //小图箭头点击
    var xtl = $("#TXiaotu").offset().left;
    $(".leftBtn").click(function() {
        var i = $("#TXiaotu ").find(".select").removeClass("select").index("#TXiaotu li");
        i--;
        if(i < 0) i = 0;
        var $li = $("#TXiaotu li").eq(i).addClass("select");
//      var w = $li.outerWidth(); 	
        var w = $(".xtbox").width()/5;
//      if(w > 100) {
//          w += 5;
//      } else {
//          w += 3;
//      }
//      var Wimg = $li.find("img")[0].src;
//      $("#TDatu").find("img")[0].src = Wimg.replace("300_225", "800_600");
        var Wimg = $li.find("img")[0].src.replace('_small_400_300','_small_800_600');
//       $("#TDatu").find("img")[0].src = Wimg
         showbig($("#TDatu"),Wimg)
        var l = $li.offset().left;
        l = l - xtl;
        if(l >= 0)
            return false

        var left = $("#TXiaotu").position().left + w;
        if(left > 0) left = 0;
        $("#TXiaotu").css("left", left + 'px')
    })

    $(".rightBtn").click(function() {
        var length = $("#TXiaotu li").length;
        var i = $("#TXiaotu ").find(".select").removeClass("select").index("#TXiaotu li");
        i++;
        if(i >= length - 1) i = length - 1;
        var $li = $("#TXiaotu li").eq(i).addClass("select");
//      var Wimg = $li.find("img")[0].src;
//      $("#TDatu").find("img")[0].src = Wimg.replace("300_225", "800_600");
        var Wimg = $li.find("img")[0].src.replace('_small_400_300','_small_800_600');
//       $("#TDatu").find("img")[0].src = Wimg;
         showbig($("#TDatu"),Wimg)
//		var w = $li.outerWidth();
        var w = $(".xtbox").width()/5;
        var l = $li.offset().left;
        l = l - xtl;
        if(l < 5 * w)
            return false

        var left = $("#TXiaotu").position().left - w;
        if(left < (5 - length) * w)
            left = (5 - length) * w;
        if(length <= 5)
            left = 0;
        $("#TXiaotu").css("left", left + 'px');
    })
    

    $('.xtWarp i').hover(function() {
        $(this).addClass("xtHover");
    }, function() {
        $(this).removeClass("xtHover");
    })
    //新车配置导航
    var height = $(window).height();
    if(height < 800) $('body').addClass("h800");
    $('.NewcarModel .newCarClose').click(function() {
        //$(".myModel,.model").hide();
        $(".model").hide();
//      $(".NewcarModel").hide();
 		$(".NewcarModel").hide()
    });
    $('.close_refresh').click(function() {
        window.location.reload();
    });
    if($('#DNewcar').hasClass('hasConfig')) {
        $(".NewcarNav li").click(function() {
            var className = this.className;
            $(this).addClass("hover").siblings().removeClass("hover");
            var top = 0;
            $.each($('.NewcarBox .' + className).prevAll(), function(i, n) {
                top += $(n).height();
            });
            $(".NewcarBox").stop().animate({
                scrollTop: top
            }, 200);
        });
        $(".NewcarBox").scroll(function(){
            var tops = $('.NewcarBox').offset().top;
            $('.NewcarBox .sizes').each(function(){
                var guns = $(this).offset().top;
                var guns2 = $(this).height() + guns
                if(guns<=tops && guns2>=tops){
                    var num = $(this).index()+1;
                    $('.NewcarNav .s'+num).addClass("hover").siblings().removeClass("hover");
                }
            });
            var divHeight = $(this).height();
            var nScrollHeight = $(this)[0].scrollHeight;
            var nScrollTop = $(this)[0].scrollTop;
            if(nScrollTop + divHeight >= nScrollHeight) {
                $('.NewcarNav .s10').addClass("hover").siblings().removeClass("hover");
            }
        });
    }
    $('.showStateBox').click(function() {
        clueFun(F.carId,F.phoneNum,35,'查看新车配置');
        if(F.newCarConfig && !$('#DNewcar').hasClass('hasConfig')) {
            $.get('/cartype/vehicleid.json', {
                flag: F.newCarConfig
            }, function(data) {
                var carConfig = data.jsonResult;
                if(carConfig) {
                    var navStr = '<div class="NewcarNav"><ul>';
                    var contentStr = '<div class="NewcarBox">';
                    var i = 1;
                    for(var key1 in carConfig) {
                        var obj = carConfig[key1];
                        navStr += '<li class="s' + i ;
                        if(i==1){
                            navStr += ' hover';
                        }
                        navStr += '"><i></i><span>' + key1 + '</span></li>';
                        contentStr += '<div class="sizes s' + i + '"><p class="sizes_title">' + key1 + '</p><ul>';
                        for(var key2 in obj) {
                            if(obj[key2]) {
                                contentStr += '<li><b>' + key2 + '</b><span>' + obj[key2] + '</span></li>';
                            }
                        }
                        contentStr += '</ul></div>';
                        i++;
                    }
                    navStr += '</ul></div>';
                    contentStr += '</div>';
                    $('#DNewcar').append(navStr + contentStr);
                    $(".NewcarNav li").click(function() {
                        var className = this.className;
                        $(this).addClass("hover").siblings().removeClass("hover");
                        var top = 0;
                        $.each($('.NewcarBox .' + className).prevAll(), function(i, n) {
                            top += $(n).height();
                        });
                        $(".NewcarBox").stop().animate({
                            scrollTop: top
                        }, 200);
                    });
                    $(".NewcarBox").scroll(function(){
                        var tops = $('.NewcarBox').offset().top;
                        $('.NewcarBox .sizes').each(function(){
                            var guns = $(this).offset().top;
                            var guns2 = $(this).height() + guns
                            if(guns<=tops && guns2>=tops){
                                var num = $(this).index()+1;
                                $('.NewcarNav .s'+num).addClass("hover").siblings().removeClass("hover");
                            }
                        });
                        var divHeight = $(this).height();
                        var nScrollHeight = $(this)[0].scrollHeight;
                        var nScrollTop = $(this)[0].scrollTop;
                        if(nScrollTop + divHeight >= nScrollHeight) {
                            $('.NewcarNav .s10').addClass("hover").siblings().removeClass("hover");
                        }
                    });
                    $(".NewcarModel").show();
                    $('.model').show();
                    $('#DNewcar').addClass('hasConfig');
                }
            })
        } else {
            $(".NewcarModel").show();
            $('.model').show();
        }
    });

    //价格趋势verify_person
    $('#TTend').click(function() {
        $(".costModel,.model").show();
        clueFun(F.carId,F.phoneNum,35,'查看价格趋势');
    })
    $(".costModel .close").click(function(){
        $(".costModel,.model").hide();
    })

    //wx分享
    var shoeWxflag = 0
    $('.showWx').click(function() {
    	if(shoeWxflag==0){
    		$.get('/car/smallprogramQR.json',
	    	{
	    		carid :F.carId,
	    		mobile:F.actMobile
	    	},
	    	function(data){
	    		if(data.photo!=''){
	    			var str = '';
	    			str +='<img src="data:image/jpeg;base64,'+data.photo+'">';
	    			$('.model-wx #dCode').append(str);
	    			shoeWxflag=1;
	    		}
	    	});
    	}
        $(".model-wx,.model").show();
    })

    //	分享
    $('.tool_noteBox').hover(function() {
        $(".shareModel").show().stop().animate({
            height: '166px'
        }, 200);
    }, function() {
        $(".shareModel").stop().animate({
            height: '0px'
        }, 200, function() {
            $(".shareModel").hide()
        });
    })

    car_share();
    //分享事件
    function car_share(e) {
        //prevent_bubble(e);
        //	获取当前需要分享的相关内容
        var $car = $(this).parents(".cars_list");
        var bdDesc = $('.top_R h2').text();
        BDDesc = bdDesc;
        var bdUrl = "https://www.hx2car.com/details/" + $('#simCarId').val();
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
//       0[(document.getElementsByTagName('head')[0] || document.body).appendChild(document.createElement('script')).src = '/resource/web/dist/static/mobpages/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5)];
	var shareScript = document.createElement('script');shareScript.src = '/resource/web/dist/static/mobpages/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5);(document.getElementsByTagName('head')[0] || document.body).appendChild(shareScript);
    }

    //根据屏幕宽度显示不同样式
    function getWidth() {
        var width = $(window).width();
        if(width < 1500) {
            $('body').addClass("w1130");
        } else {
            $('body').removeClass("w1130");
        }
    }

    getWidth();
    $(window).resize(getWidth);

    $(".jiage").each(function() {
        if($(this).text().indexOf("面议") > 0)
            $(this).html('<span class="bigFont">面议</span>');
    })

//  madeCode();

    function madeCode() {
        //生成二维码
        var DEFAULT_VERSION = "9.0";
        var ua = navigator.userAgent.toLowerCase();
        var isIE = ua.indexOf("msie") > -1;
        var safariVersion;
        var url = 'http://m.hx2car.com/details/' + $("#simCarId").val();
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
    if(oldSta) {
        $(window).scroll(function() {
            var range = $(document).scrollTop();
            var wh = $(window).height();
            var how = $(".selectBox").offset().top - wh;
            if(range > how && alikeFlag) {
                alikeFlag = 0;
                var money = $.trim($('.bigFont').eq(0).text());
                var year = $.trim($("#year").val());
                var brandStr = $.trim($("#car_brand").val());
                var kind = $.trim($("#kindH").val());
                getAlikeData('#tjg', {
                    money: money,
                    priceStr: 'money'
                }, '/car/getsimcar.json', 'carsmoney');
                getAlikeData('#tpp', {
                    title: brandStr,
                    brandStr: 'brand'
                }, '/car/getsimcar.json', 'carsbrand');
                getAlikeData('#txh', {
                    carKind: kind,
                    carKindStr: 'kind'
                }, '/car/getsimcar.json', 'carsserial');
                getAlikeData('#tnf', {
                    usedate: year,
                    yearStr: 'year'
                }, '/car/getsimcar.json', 'carsyear');
            }
        });
    }

    function getAlikeData(id, data, url, listname) {
        //根据listname对应的位置编号
        var positionObj = {
            carsbrand: {
            	style:'9-0-',
            	posi:'detailBrand'
            },
            carsserial: {
            	style:'9-1-',
            	posi:'detailSerial'
            },
            carsyear:  {
            	style:'9-2-',
            	posi:'detailYear'
            },
            carsmoney: {
            	style:'9-3-',
            	posi:'detailPrice'
            }
        }

        $.ajax({
            type: "get",
            url: url,
            data: data,
            async: true,
            success: function(dat) {
                var str = '';

                //如果没有推荐车辆隐藏
                if(dat[listname] == undefined || dat[listname].length==0){
                    $(id).remove();
                    $(id.replace("#",'.')).remove();
                }

                if(dat[listname] != undefined) {
                    var length = dat[listname].length;
                    for(var i = 0; i < length; i++) {
                        var d = dat[listname][i];
                        var src = d.firstSmallPic;
                        if(src.indexOf("img.hx2cars.com/upload")==-1){
                        	src = 'http://img.hx2cars.com/upload'+src
                        }
                        var money = d.money;
                        if(money == "" || money == 0 || money == "面议") {
                            money = '<span class="bigFont">面议</span>';
                        } else {
                            money = '￥<span class="bigFont">' + money + '</span>万'
                        }
                        str += '<li class="carlog" data-id="' + d.id + '" data-position="'+positionObj[listname].posi+'"><a target="_blank" href="/details/' + d.id + '?style='+(positionObj[listname].style + (d.vipStatus)) + '">'; //新加了position用来区别点几区域，style用来区别是不是公司会员车辆
                        str += '<img src="' + src + '" alt="' + d.title + '图片" /></a>';
                        str += '<p class="title"><a target="_blank" href="/details/' + d.id+ '?style='+(positionObj[listname].style + (d.vipStatus));
                        str += '"title="' + (d.areaName + d.title) + '">';
                        str += d.title + '</a></p>';
                        str += '<p><span class="diqu">' + d.location + '</span>';
                        str += '<span class="jiage">' + money + '</span></p></li>';
                    }
                    $(id).find('ul').append(str);
                    postData($(id).find('ul'))
					updatePosi($(id))
                    $(".Boutique_titles>span").eq(0).mouseenter()//重新选中第一个，因为有可能之前排在第一位的没有数据被移除了
                }
            }
        });
    }

    $(".goFindCar").click(function() {
        window.open('/car/findcar.htm');
    })

    postData();

    //	上传点击区域
    $("#wdck .carlog").click(function() {
        upArea.call(this, 8);
    })

    $(".selectBox").delegate(".carlog", 'click', function() {
        var index = $('.selectBox .on').index();
        upArea.call(this, 9 + '.' + index);
    })

    $("#tjg .carlog").off().click(function() {
        upArea.call(this, 9.3);
    })
    $("#tpp .carlog").off().click(function() {
        upArea.call(this, 9.0);
    })

    $(".cardetailR .carlog").click(function() {
        upArea.call(this, 10);
    })

    function upArea(position) {
        var pos = $(this).index();
        var data = {
            carid: $(this).attr("data-id"),
            date: Number(new Date()),
            position: position,
            pos: pos
        }
        data = JSON.stringify(data);
        $.post('/car/carlog.json', data);
    }

    //车辆描述打开收起
    if(!$('body').hasClass('w1130')){
        $('.desshow1').remove();
        $('.describe').removeClass('desshow2');
    }
    else{
        $('.desshow2').remove();
        $('.describe').removeClass('desshow1');
    }
    $('.downdes,.updes').click(function(){
        $('.describe').show();
        $(this).parent().hide();
    });
});
//	大数据
function postData(list) {
    var $list = $(list).find(".carlog"),
        arr = [];
    if(list == undefined) {
        $list = $(".carlog");
    }
    $list.each(function(i, n) {
        arr.push($(n).attr('data-id'));

    })
    $.post('/car/carlog.json', {
        "ids": arr.join(',')
    })
}

//获取url参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if(r != null) return unescape(r[2]);
    return null;

}

//获取style
function getStyle(){
    var styles = getQueryString("style")
    if(styles){
        var vip=Number(styles.substr(styles.length-1))+2;//2非会员，3会员
        styles = styles.substr(0,styles.length-1)+vip;
        return styles;
    }else{
        return ;
    }
}


//创建电子合同 交易仲裁
$(function() {
    $('.contract , .elehetong').click(function() {
        $('.elecontract').show();
        $('.model').show();
        if($(".elecontractBox").css("display") == "none") {
            $(".chjbtn").click();
        }
    });
    $(".chjbtn").toggle(
        function() {
            $('.elecontract .title span').html('创建电子合同');
            $('.elecontract .chjbtn').html('点击下载华夏APP');
            $('.elecontractBox').hide();
            $('.elecontractCont2').show();
        },
        function() {
            $('.elecontract .title span').html('电子合同');
            $('.elecontract .chjbtn').html('我是卖家，我要快速创建合同！');
            $('.elecontractBox').show();
            $('.elecontractCont2').hide();
        }
    );
	/*************************/
    $('#jfBtn').click(function() {
        $('.arbitra').show();
        $('.model').show();
    });

    //百度统计按钮点击
    $("[data-track]").on("click", function() {
        var label = $(this).data("track");
        window._hmt && window._hmt.push(['_trackEvent', label, 'click']);
    });

    // 暂时不需要，以后可能需要
    // function looknum($me) {
    //     $.post('/require/commonrequire.json', {
    //         msg: '查看手机号码',
    //         price: '',
    //         carId: F.carId,
    //         type: 27,
    //         number: F.phoneNum
    //     }, function (data) {
    //         $me.off();
    //     });
    // }

    $('.look_num').bind('click',function(e) {
        //$(this).unbind('click');
        if($(this).hasClass("not")){
            return false;
        }
        e.stopPropagation();
        $(this).addClass("not");
        //var num = $(this).data('num');
        var $me = $('.getNum');
        if($('.hxlogin').length == 1 && !F.phoneNum) {
            $(".hxlogin").show();
            $(".hxPhoneBg").show();
            cTarget = 3;
            return false;
        } else {
            var className = 'look_num';
            fotGetPhoneNum(className);
            //looknum($me);//以后可能需要
        }
    });


    // //会员充值弹框
    // $('.openVipBtn').pcBuyVip({
    //     childtype:'appvip_phone',
    //     phoneNum:F.phoneNum,
    // trackInfo:'pc查看联系方式',
    //     payUrl:'/details/'+F.carId,
    // id:F.carId
    // });
});



//指定类型的关闭统计点击数   暂时不需要
/*function typeColse (ts , optType){
 var label = '';
 if(optType == 3){
 label = '我要砍价关闭';
 } else if (optType == 15) {
 label = '咨询底价关闭';
 }
 window._hmt && window._hmt.push(['_trackEvent', label, 'click']);
 }*/

function verifyCallback(type) {
    var label = '';
    if(type == 3) {
        label = '我要砍价pc提交';
    } else if(type == 11) {
        label = '预约看车pc提交';
    } else if(type == 14) {
        label = '收藏pc提交';
    } else if(type == 15) {
        label = '咨询底价pc提交';
    } else if(type == 8) {
        label = '降价提醒pc提交';
    }else if(type == 16){
        label = 'PC砍价私人助理';
    }else if(type == 17){
        label = 'PC砍价成功-私人助理';
    }else if(type == 18){
        label = 'PC砍价成功-关闭';
    }
    window._hmt && window._hmt.push(['_trackEvent', label, 'click']);
}

$(function() {
    $(".import_title").toggle(
        function() {
            $('.zidongInfo').show();
            $('.ssendBtn').addClass('showClick');
        },
        function() {
            $('.zidongInfo').hide();
            $('.ssendBtn').removeClass('showClick');
        }
    );
    $('.zidongInfo p').click(function() {
        var zidongText = $(this).text();
        $('#chattext').val(zidongText);
        $(".import_title").click();
        sendText();
    });

    setInterval(function() {
        $('.donwText').toggleClass('hidden');
    }, 5000);

    $('.goLoginBtn').pchxLogin({
        loginState: loginstate,
        redirectPcUrl: '/details/' + F.carId,
        checkedCallback: checkedCallback
    });

    function checkedCallback(data) {
        var className = 'goLoginBtn';
        $('.hxlogin,.hxPhoneBg').hide();
        fotGetPhoneNum(className ,data);
    }

    // 会员 查看电话号码。超过40 ，查看电话号 花1 块查看 。
    $('#payOneMoney span').click(function (){
        $(this).addClass('select').siblings().removeClass('select');
    });

    var gBuyClassName = '';
    $('.goBuyOnce').click(function () {
        var money = $('.onceMoney').html();
        var flagId = $(this).attr('data-flagId');
        gBuyClassName = $(this).attr('data-cName');
        var childtype = 'buycarphone';
        //money = '0.02';
        if($('#payOneMoney .wixinimg').hasClass('select')) {
            //微信支付
            jQuery.post('/mobile/weixinQR.json', {
                money: money,
                rechargetype: 1,
                flag: "pc",
                mobile: F.phoneNum,
                childtype: childtype,
                typeId: flagId
            }, function (data) {
                if (data) {
                    if (data.message != null) {
                        alert(data.message);
                        sumb = 1;
                        return false;
                    }
                    //微信支付弹窗 必要参数二维码地址及轮询id
                    $(this).wxpay({
                        code_url: data.code_url,
                        prepay_id: data.prepay_id,
                        acno: data.acno,
                        intervalCallback: buyOnceMoneyCallBack
                    });
                }
            });
        } else {
            window.location.href = '/money/submitmember.htm?money=' + money + '&rechargetype=1&childtype=' + childtype +'&mobile=' + F.phoneNum + '&typeId=' + flagId ;
        }
    });
    // 微信支付 花1 块购买 ，查看电话 。
    function buyOnceMoneyCallBack(acno) {
        jQuery.post('/mobile/xjrechargeres.json', {out_trade_no: acno}, function (data) {
            if (data) {
                if (data.message == 'success') {
                    // 支付成功后，去得到号码。
                    $('.model_pay').remove();
                    fotGetPhoneNum(gBuyClassName);
                    $('.lookPhoneModel,.model').hide();
                }
            }
        });
    }

    $('.lookPhoneModel .close_btn').click(function () {
        $('.look_num').removeClass('not');
        $('.lookPhoneModel,.model').hide();
    });
});


function fotGetPhoneNum(className,datas) {
    if(!F.phoneNum) {//解决  直接登录后，弹出充值框，得到手机号码。
        //F.phoneNum = datas.codeVo.number;
        if(datas.mobile){
            // 扫码登录
            F.phoneNum = datas.mobile;
        } else if(datas.codeVo.number) {
            // 手机验证
            F.phoneNum = datas.codeVo.number;
        }
    }
    var $goLoginBtn = $('.getNum');
    var data = {
        'id': F.carId
    }
    if(F.actMobile !== '') {
        data['actMobile'] = F.actMobile;
    }

    $.post('/car/cardealernumber.json', data, function(data) {
        if(data.error && data.error=="abnormal"){
            alert("检测到帐号异常，请明天再试");
            return false;
        }
        // 直接登录，不是个人会员，直接开通个人会员 ****** 已经登录后，不是个人会员 且 免费用过20次，再次查看电话号码，需要开通个人会员
        if((data.vipStatus == '0' && datas !== undefined) || (data.vipStatus == '0' &&  data.message == 'noVip')){ //vipStatus=0非会员、1：会员
            $(this).pcBuyVips({
                childtype:'appvip_phone',
                phoneNum:F.phoneNum,
                trackInfo:'pc查看联系方式',
                payUrl:'/details/'+F.carId,
                id:F.carId
            });
        }  else {
            //查看电话
            if(data.message != 'vipnonumber'){
                if(data.mobile !== '' && data.phone !== '' && data.mobile !== data.phone) {
                    $goLoginBtn.removeClass(className).off().html(data.mobile + '&nbsp;' + data.phone);
                } else if(data.mobile !== '') {
                    $goLoginBtn.removeClass(className).off().html(data.mobile);
                } else if(data.phone !== '') {
                    $goLoginBtn.removeClass(className).off().html(data.phone);
                }
            } else {
                // 个人会员已满40次，1元购买继续查看。
                $.post('/car/paycarphone.json',{'id':F.carId},function (data) {
                    if(data.id){
                        $('.lookPhoneModel').show();
                        $('.model').show();
                        $('.goBuyOnce').attr('data-flagId',data.id);
                        $('.goBuyOnce').attr('data-cName',className);
                    } else {
                        alert('网络不好，请求有误！');
                    }
                });
            }
        }
    });
}
// 产生 线索的方法
function clueFun(carId,number,type,msg,price){
    if(price == undefined){
        price = '';
    }
    if(number != ''){
        $.post('/require/commonrequire.json',{'carId':carId,'number':number,'type':type,'msg':msg,'price':price},function(){
            //$.cookie('freeRequire','');
        });
    }
}
$(function() {
	//自动弹出免费咨询
    // setTimeout(function() {
     //    if($(".model").css("display") == 'none' && ($('.warn_shadow').css('display') == 'none' || $('.openvipModel').html()!=='')) {
     //        if($("#warnShadow").length > 0 && $("#warnShadow").css("display") == 'none') {
     //            $("#freetoask").click();
     //        } else if($("#warnShadow").length == 0) {
     //            $("#freetoask").click();
     //        }
     //    }
    // }, 60000);

    // 用户在1min内提交销售线索成功后，不会自动弹出免费咨询弹框。 freeRequire
    $.cookie('freeRequire', '', { expires: -1 });
    //自动弹出免费咨询
    var freeTimer = setInterval(function() {
        if($.cookie('freeRequire') == null ){
            if($(".model").css("display") == 'none' && ($('.warn_shadow').css('display') == 'none' || $('.openvipModel').html() !== null || $('.tgPayModel').css('display') == 'none')) {
                if(($("#warnShadow").length > 0 && $("#warnShadow").css("display") == 'none') || $("#warnShadow").length == 0) {
                    $("#freetoask").click();
                    clearInterval(freeTimer);
                }
            }
        } else {
            clearInterval(freeTimer);
        }
    }, 60000);

//	鼠标经过点评
	$('.intro_comment').on('mouseenter',function(){
		$('.commentsbox').show();
	});
	$('.intro_comment').on('mouseleave',function(){
		$('.commentsbox').hide();
	});

//	点评登陆
	var redirectPcUrl = '';
	$('.intro_comment,.commentbtn').pchxLogin({
        loginState: loginstate,
        redirectPcUrl: '/store/discuss.htm?carid='+F.carId,
        checkedCallback: checkedCallback
    });
	function checkedCallback(data){
        window.location.href = '/store/discuss.htm?carid='+F.carId;
		// $.post('/store/qualification.json',
		// {
		// 	carid:F.carId
		// },
		// function(data){
		// 	if(data.message==true){
		// 		window.location.href = '/store/discuss.htm?carid='+F.carId;
		// 	}
		// 	else{
		// 		alert('您还未与该商家取得联系，暂时无法进行评价');
		// 	}
		// });
	}
//	查看更多评价
	$('.showmore').click(function(){
        clueFun(F.carId,F.phoneNum,35,'查看评价');
		window.location.href = '/store/reviewlist.htm?carid='+F.carId;
	});
	// 分享 生成线索
    $('.shareModel ul li a').click(function(){
        clueFun(F.carId,F.phoneNum,35,'详情页面分享');
    });
    //查看他的车库
    $('.tj_cars_b').click(function(){
        clueFun(F.carId,F.phoneNum,35,'查看他的车库');
    });

    /*******************推广包推广，车源本地推广start*************************/
    var tg = {
        des : '',//推广包描述
        childType : '',//推广包type
        payMoney : '',//推广包需要支付的钱
        originalMoney : '',//推广包原价
        hb : '',//华币
        zdpayMoney :'', //此变量是马上置顶所支付价格
        zdorigMoney :'',//此变量是马上置顶原价
        zdDay:''
    };

    // 时间转化
    function format(time, format){
        var t = new Date(time);
        var tf = function(i){return (i < 10 ? '0' : '') + i};
        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
            switch(a){
                case 'yyyy':
                    return tf(t.getFullYear());
                    break;
                case 'MM':
                    return tf(t.getMonth() + 1);
                    break;
                case 'mm':
                    return tf(t.getMinutes());
                    break;
                case 'dd':
                    return tf(t.getDate());
                    break;
                case 'HH':
                    return tf(t.getHours());
                    break;
                case 'ss':
                    return tf(t.getSeconds());
                    break;
            }
        })
    }


//切换地区推广 推广包
    $('.pageBtn em').click(function(){
        $(this).addClass('on').siblings().removeClass('on');
        var index = $(this).index();
        if(index == 0){
            $('.tgCont .tgC1').show();
            $('.tgCont .tgC2').hide();
        } else {
            $('.tgCont .tgC2').show();
            $('.tgCont .tgC1').hide();
        }
    });

    $('.colseBox .colseBtn').click(function(){
        $('.tgcontModel').hide();
        $('.topContent').show();
    });

    /*$(".nextBtn").toggle(
        function () {
            $('.tgC2,.checkText2').fadeIn().show();
            $('.tgC1,.checkText1').fadeOut().hide();
        },
        function () {
            $('.tgC1,.checkText1').fadeIn().show();
            $('.tgC2,.checkText2').fadeOut().hide();
        }
    );*/

    //获取 华币
    function getHbNum(){
        $.ajax({
            type: "post",
            url: "/vip/gethbBalance.json",
            async: false,
            success: function(data) {
                money = data.isSuccess;
            }
        });
        return money;
    }
    if(F.isShowBDZD !== '1' && F.isShowTGB !== '1'){
        $('.tgcontModel').hide();
    }
    //推广值 初始化
    if(F.isShowBDZD === '1' || F.isShowTGB === '1'){
        tg.hb = getHbNum();
        // 延迟1 秒  （isShowBDZD==1 && 推广时间不是当前时间 的后一天，&& isShowTGB ==1 ）不然会一闪。
        setTimeout(function() {
            $('.tgTopCont').show();
        }, 1000);
    }
    if(F.isShowBDZD === '1'){
        $.ajax({
            type: "post",
            url: "/vip/getappday.json",
            async: false,
            data: {
                areacode: P.areaCode
            },
            success: function(data) {//data.create = '2018年09月23日';
                $('#startTime').text(data.create);
                var sTime = data.create.replace('年','/').replace('月','/').replace('日','');
                var fTime = new Date(sTime.replace(/-/,"/"));
                // 获取开始购买时间 须 -1
                fTime.setDate(fTime.getDate() - 1);
                var nowData = new Date();
                var mydate = nowData.getFullYear()+'/'+(Number(nowData.getMonth())+1)+'/'+nowData.getDate();
                var tdate = new Date(mydate.replace(/-/,"/"));
                if(tdate.getTime() != fTime.getTime()){
                    //console.log(1111);
                    if(F.isShowTGB === '1'){
                        $('.tgCont .tgC1').hide();
                        $('.tgCont .tgC2').show();
                        $('.pageBtnBox').hide();
                    } else {
                        $('.tgcontModel').hide();
                        $('.topContent').show();
                        $('#car_top').show();
                    }
                }
            }
        });
    }
    if(F.isShowTGB === '1' && $('.tgC2 .tgOptions').html() == ''){
        $.ajax({
            type: "post",
            url: "/vip/getextension.json",
            async:false,
            data:{'carid':F.carId},
            success: function(data){
                //status：0没有推广，1正在推过
                if(data.status == '1'){
                    $('.tgC2').hide();
                    $('.nextBtn').hide()
                } else {
                    var length = data.packagevip.length;
                    var str = '';
                    //if($('.tgC2 .tgOptions').html() == ''){
                        for(var i=0; i<length; i++){
                            var pack = data.packagevip[i];
                            if(i == 0){
                                str += '<li class="select" data-track="pc-detail-推广包" data-des="'+pack.des+'" data-childType="'+pack.childType+'_pcDetail" data-pmoney="'+pack.money+'" data-originalMoney="'+pack.originalMoney+'"> <p class="pText1 day">'+pack.title+'</p><p class="pText2 money">￥'+pack.originalMoney+'华币</p></li>'
                                $('#des').html(pack.des);
                                $('.moneyTotal2').html(pack.originalMoney);
                            } else {
                                str += '<li data-track="pc-detail-推广包" data-des="'+pack.des+'" data-childType="'+pack.childType+'_pcDetail" data-pmoney="'+pack.money+'" data-originalMoney="'+pack.originalMoney+'"> <p class="pText1 day">'+pack.title+'</p><p class="pText2 money">￥'+pack.originalMoney+'华币</p></li>'
                            }
                        }
                        $('.tgC2 .tgOptions').append(str);
                    //}
                }
            }
        });
    }

    // 本地置顶
    $('.tgC1 .tgOptions li').click(function(){
        $(this).addClass('select').siblings().removeClass('select');
        tg.zdDay = $(this).attr('data-time');//选择的天数。
        var startTime = $('#startTime').text();//开始时间
        var sTime = startTime.replace('年','/').replace('月','/').replace('日','')
        var fTime = new Date(sTime.replace(/-/,"/"));
        //计算结束时间
        fTime.setDate(fTime.getDate() + Number(tg.zdDay));
        var ltime = fTime.toLocaleDateString();
        if(isNaN(format(ltime, "yyyy"))) {//浏览器兼容
            $('#endTime').text(ltime);
        } else {
            var endTime = format(ltime, "yyyy年MM月dd日");
            $('#endTime').text(endTime);
        }
        tg.zdorigMoney = $(this).attr('data-money');
        $('.moneyTotal1').html(tg.zdorigMoney);
        if(tg.hb < Number(tg.zdorigMoney)){
            $('.tgC1 .payMoney .pText2').show();
            tg.zdpayMoney = (Number(tg.zdorigMoney) - tg.hb).toFixed(2);
        } else {
            $('.tgC1 .payMoney .pText2').hide();
            tg.zdpayMoney = tg.zdorigMoney;
        }
        $('.payMOney1').html(tg.zdpayMoney);
    });
    $('.tgC1 .tgOptions li').eq(1).click();

    // 推广包
    $('.tgC2 .tgOptions').delegate('li','click',function(){
        var label = '';
        $(this).addClass('select').siblings().removeClass('select');
        tg.des = $(this).attr('data-des');
        tg.childType = $(this).attr('data-childType');
        tg.payMoney = $(this).attr('data-pmoney');
        tg.payMoney = Number(tg.payMoney).toFixed(2)
        tg.originalMoney = $(this).attr('data-originalMoney');
        $('#des').html(tg.des);
        $('.moneyTotal2').html(tg.originalMoney);
        $('.payMOney2').html(tg.payMoney);
        if(tg.hb < Number(tg.originalMoney)){
            $('.tgC2 .payMoney .pText2').show();
        } else {
            $('.tgC2 .payMoney .pText2').hide();
        }
    });
    $('.tgC2 .tgOptions li').eq(0).click();


    var inte = null;
    //微信支付
    function wxpayFun(omoney,paymoney,childType,callback){
        $('#omoney2').html(omoney);
        $('#money2').html(paymoney);
        //微信支付
        jQuery.post('/mobile/weixinQR.json', {
            money: paymoney,
            rechargetype: 0,
            flag: "pc",
            //loginName: F.loginName,
            childtype: childType,
            typeId: F.carId
        }, function (data) {
            if (data) {
                var notInter = false; //只调用一次
                clearInterval(inte);
                $("#codeImg2").empty(); //二维码清除
                var nsecond = 0;
                if (data.message != null) {
                    alert(data.message);
                    return false;
                }
                if(data.code_url != "") {
                    //生成二维码
                    var DEFAULT_VERSION = "9.0";
                    var ua = navigator.userAgent.toLowerCase();
                    var isIE = ua.indexOf("msie") > -1;
                    var safariVersion;
                    if(isIE) {
                        safariVersion = ua.match(/msie ([\d.]+)/)[1];
                    }
                    if(safariVersion <= DEFAULT_VERSION) {
                        //ie8;
                        $("#codeImg2").empty().append('<img src="https://www.hx2car.com/servlet/WeChatQr.jpg?QRurl=' + data.code_url + '" />');
                    } else {
                        var qrcode = new QRCode('codeImg2', {
                            text: data.code_url,
                            width: 200,
                            height: 200,
                            correctLevel: QRCode.CorrectLevel.H
                        });
                    }
                    $('.tgPayModel').show();
                    $('.tgPayCont').show();
                }
                var recordId = data.recordId;
                if(!notInter) {
                    inte = setInterval(function() {
                        nsecond++;
                        if(nsecond > 150) {
                            clearInterval(inte);
                            $(".closePayBox").click();
                        }
                        getState(recordId,inte);
                    }, 2000);
                } else {
                    getState(recordId,inte);
                }
                function getState(recordId,inte) {
                    $.post('/weixin/callbackwithid.json', {
                        flag: recordId,
                        token: childType
                    }, function(data) {
                        if(data) {
                            if(data.isSuccess == 1) {
                                clearInterval(inte);
                                if(typeof callback === 'function'){
                                    callback();
                                }
                            }
                        }
                    });
                }
            }
        });
    }

    //获取支付宝的订单id
    function getrecordId(childtype, callback) {
        $.ajax({
            type: "post",
            url: "/weixin/getorderid.json",
            async: true,
            success: function(data) {
                if(data.id == 1) {
                    setTimeout(function() {
                        getrecordId(childtype, callback);
                    }, 1000);
                } else {
                    var recordId = data.id;
                    getStates2(childtype, callback,recordId)
                }
            }
        })
    }

    //获取支付状态
    var timer1 = '';
    function getStates2(token, cb, recordId) {
        $.post('/weixin/callbackwithid.json', {
            flag: recordId,
            token: token
        }, function(data) {
            if(data.isSuccess === 1) {
                clearTimeout(timer1);
                if(typeof(cb) == "function") {
                    cb()
                }
            } else {
                timer1 = setTimeout(function() {
                    getStates2(token, cb,recordId)
                }, 2000)
            }
        })
    }


    //支付窗口关闭
    $(".closePayBox").click(function() {
        $(".tgPayModel").hide();
        $(".tgPayCont").show();
        clearInterval(inte);
    });

    //马上推广 微信支付成功回调
    function goUrlFun() {
        location.href = '/vip/myappads.htm?type=4&state=';
    }

    //马上推广
    $('#opentg').click(function(){
        if((tg.childType).indexOf('extension1') !== -1){
            label = 'pc-detail-急卖包';
        } else if((tg.childType).indexOf('extension2') !== -1){
            label = 'pc-detail-特惠包';
        } else if((tg.childType).indexOf('extension3') !== -1){
            label = 'pc-detail-超值包';
        } else if((tg.childType).indexOf('extension4') !== -1){
            label = 'pc-detail-至尊包';
        }
        window._hmt && window._hmt.push(['_trackEvent', label, 'click']);
        if(tg.hb >= Number(tg.originalMoney) ){
            //华币支付
            $.post('/vip/buyextension.json',{typeStr:tg.childType,carid:F.carId,from:3},function(data){
                if(data.message = 'success'){
                    alert('购买成功！');
                    window.location.href = '/vip/myappads.htm?type=4&state=';
                }
            });
        } else {
            $('.payText2').show();
            $('.payText1').hide();
            $('.optionWay .wixin').addClass('select');
            $('.optionWay .ali').removeClass('select');
            $('.alipay_submit').hide();
            $('.wxpay_sub').show();
            //默认微信支付
            wxpayFun(tg.originalMoney,tg.payMoney,tg.childType,goUrlFun);
        }
    });

    //马上置顶 支付成功回调
    function generalizeFun() {
        var gdata = {
            car_id: F.carId,
            day: tg.zdDay,
            start_time: $("#startTime").html(),
            money: tg.zdorigMoney,
            areacode: P.areacode,
            id: 0,
            type: 0
        };
        $.ajax({
            type: "post",
            url: "/vip/payappad.json",
            async: true,
            data: gdata,
            success: function(data) {
                if(data.pay_state == "1") {
                    alert("推广成功");
                    $('.tgPayModel').hide();
                    window.location.href = "/vip/myappads.htm?type=0&state=";
                } else {
                    alert(data.message)
                }
            }
        });
    }

    //马上置顶
    $('#openzd').click(function(){
        window._hmt && window._hmt.push(['_trackEvent', 'pc详情-马上置顶', 'click']);
        if(tg.hb >= tg.zdorigMoney){
            generalizeFun();
        } else {
            $('.optionWay .wixin').addClass('select');
            $('.optionWay .ali').removeClass('select');
            $('.payText1').show();
            $('.payText2').hide();
            $('.alipay_submit').hide();
            $('.wxpay_sub').show();
            //默认微信支付
            wxpayFun(tg.zdorigMoney,tg.zdpayMoney,'areaPromotion',generalizeFun);
        }
    });

    //选择支付方式
    $('.optionWay span').click(function(){
        $(this).addClass('select').siblings().removeClass('select');
        var omoney = '';
        var paymoney = '';
        var childType = '';
        if($('.tgPayCont .payText1 ').css("display")=="none"){
            //推广包
            omoney = tg.originalMoney;
            paymoney = tg.payMoney;
            childType = tg.childType;
        } else {
            //地区推广
            omoney = tg.zdorigMoney;
            paymoney = tg.zdpayMoney;
            childType = 'areaPromotion';
        }
        if($(this).hasClass('wixin')){
            //调用微信
            if(childType === 'areaPromotion'){
                wxpayFun(omoney,paymoney,childType,generalizeFun);
            } else {
                wxpayFun(omoney,paymoney,childType,goUrlFun);
            }
            $('.wxpay_sub').show();
            $('.alipay_submit').hide();
        } else {
            $('.wxpay_sub').hide();
            $('.alipay_submit').show();
            //清除
            clearInterval(inte);
        }
    });
    // 推广包 & 地区推广 确定支付
    $('.alipay_submit').click(function(){
        if($('.tgPayCont .payText1 ').css("display")=="none"){
            //推广包
            window.location.href = '/money/submitRecharge.htm?money=' + tg.payMoney + '&rechargetype=0&childtype=' + tg.childType +/*'&loginName=' + F.loginName + */'&typeId=' + F.carId +'' ;
        } else {
            //地区推广
            //window.location.href = '/money/submitRecharge.htm?money=' + tg.zdpayMoney + '&rechargetype=0&childtype=areaPromotion' + /*'&loginName=' + F.loginName + */'&typeId=' + F.carId +'' ;
            window.open('/money/submitRecharge.htm?money=' + tg.zdpayMoney + '&rechargetype=0&childtype=areaPromotion' + /*'&loginName=' + F.loginName + */'&typeId=' + F.carId +'' );
            getrecordId('areaPromotion', generalizeFun);
        }
    });

    /*******************推广包推广，车源本地推广 end*************************/

    $('#hoverCompanyBox').hover(function(){
        $('#companyBoxCont').show();
    },function(){
        $('#companyBoxCont').hide();
    });

    $('#subscription').pchxLogin({
        loginState:loginstate,
        checkedCallback: getJyTitle.subscriptionCheckedCallback
    });


});
var getJyTitle={
    jyTi:function(){  //建议报价生成
        //输入框
        $('.offer_title .fr').on('click', function () {
            $('.offer_title').hide();
            $('.MContentclass .yourPrice').show();
            $('.MContentclass .yourPrice input').keyup(function () {
                var val =$(this).val();
                if (isNaN(val)) {
                    val = 0;
                    $('.pro_ed').css({'width': '0px'});
                    $('#pro_btn').css({'left': '0px'});
                }
                getJyTitle.dragPrice(
                    val,
                    $('#progress').width()-$('.pro_btn').width(),
                    false
                )
            });
        });

        var _jybj = $('#assessData_num').html(),
            guideM = '';
        var prices = F.assessPrice.split('-');
        var min = Number(prices[0]);
        var max = Number(prices[1]);
        if (_jybj == undefined && _jybj == null) {
            guideM = '';
        } else {
            guideM = $('#assessData_num').html().split('-');
        }
        var carMoney = (min + max) / 2; //二手车建议报价平均值
        this.dragPrice(carMoney, $('#progress').width(), true);
    },
    dragPrice:function(val,Pw,isFalse){
        var btn = $('#pro_btn'),
            left = $('.price_range .left'),
            right = $('.price_range .right'),
            lPrice = parseFloat(left.text().replace('万', '')),
            rPrice = parseFloat(right.text().replace('万', '')),
            width = (Pw / ((rPrice - lPrice).toFixed(2))) * (val - lPrice),
            jyCon = $('.pro_ed'), //报价线条
            jyTitle = $('.jyTiTle');

        $('#bidPrice_').val(val);
        if (isFalse) {
            if (val <= lPrice) {
                jyTitle.css({
                    'width': '100%'
                });
                jyCon.css({
                    'width': '100%'
                })
            } else if (val >= lPrice && val <= rPrice) {
                if (width < 80) {
                    jyTitle.css({
                        'width': 80
                    });
                    jyCon.css({
                        'width': 30
                    });
                } else {
                    jyTitle.css({
                        'width': width
                    });
                    jyCon.css({
                        'width': width
                    });
                }
            } else if (val == undefined || val == '' || isNaN(val)) {
                jyCon.hide();
                jyTitle.parent().remove();
            } else {
                jyCon.hide();
                jyTitle.parent().remove();
            }
        } else {
            if (val >= lPrice && val <= rPrice) {
                btn.css({
                    'left': width
                })
            } else if (val < lPrice) {
                btn.css({
                    'left': 0
                })
            } else {
                btn.css({
                    'left': Pw
                })
            }
        }
    },
    //生成支付弹框
    pcBuyAssis:function(obj) {
        var _this=this;
        var defaults = {
            title: obj.trackInfo,//默认-私人助理title
            // getAppVipJson: '/car/getappvip.json',//默认-充值个人会员套餐
            childtype: obj.assi_text.childtype,//充值时 传入的childtype
            phoneNum: '',//个人登录电话号码
            trackInfo: '',//百度统计描述信息
            payUrl: '',//支付成功后跳转的路径
            id: '',//支付宝，跳转时需要的参数
            successCallback: null // 支付成功后的回调
        }, opt;
        opt = $.extend(defaults, obj);
        // 支付框生成开始
        addHtml();

        function addHtml() {
            var m=opt.assi_text;
            var str = '';
            str += '<div class="openvipModel">';
            str += '<div class="models"></div>';//阴影层
            str += '<div class="openVipContainer">';
            str += '<div class="vipBenefit">';
            str += '<div class="titleText">' + opt.title + '</div>';
            str += '<div class="BenefitTextContainer">';
            str += '<ul class="BenefitText">' +
                '<li><i class=""></i><span>申请的私人助理仅限于对提交申请的该车辆进行协商成交</span></li>' +
                '<li><i></i><span>协商不成功，我们将全款退回到您的付款账户</span></li>' +
                '<li><i></i><span>提交成功后，会有工作人员与您取得联系</span></li></ul>';
            str += '</div>';
            str += '</div>';
            str += '<div class="vipSetMeal">';
            str += '<i class="closeVip"></i>';
            str += '<div class="assTYpe"><p>帮忙协助：<span><em>' + m.assiText + '</em></span></p><p>期望价格：<span><em>' + m.carMoney + '万</em></span></p></div>';
            str += '<div class="paymentMoney">';
            str += '<p class="payMoney">实付金额：<span class="text1">￥<em class="moneyText">' + m.money + '</em>元</span></p>';
            str += '<p class="payText">请选择支付方式：</p>';
            str += '<ul class="RechargeType">';
            str += '<li class="wechats select"><i></i></li>';
            str += '<li class="alipay"><i></i></li>';
            str += '</ul>';
            str += '<div><span class="payMoneyBtn">立即支付</span><span class="assiBack">返回上一步</span></div>';
            str += '</div>';
            str += '</div>';
            str += '</div>';
            str += '</div>';
            $('body').append(str);
            addFun();
        }

        function addFun(){
            $('.closeVip').click(function () {
                $('.look_num').removeClass('not');
                $('.openvipModel').remove();
               getJyTitle.clearStatus();
            });
            $('.RechargeType li').click(function(){
                $(this).addClass('select').siblings().removeClass('select');
            });

            $('.paymentMoney').delegate('.payMoneyBtn','click',function(){
                var T_m=opt.assi_text;
                var wechatSelect = $('.RechargeType .wechats').hasClass('select');
                window._hmt && window._hmt.push(['_trackEvent', opt.trackInfo, 'click']);
                _this.publicPay({
                    childtype:T_m.type,
                    typeId:opt.typeId,
                    money:T_m.money,
                    id:T_m.id,
                    carMoney:T_m.carMoney,
                    phoneNum:opt.phoneNum,
                    isWechat: wechatSelect,
                    successCallback:subCost
                })
            });
            $('.assiBack').on('click',function(){
                $('.openvipModel').remove();
                $('.model').show();
                $('.assi_box').show();
            });

            function intervalCallback(acno) {
                jQuery.post('/mobile/xjrechargeres.json', {out_trade_no: acno}, function (data) {
                    if (data) {
                        if (data.message == 'success') {
                            if(opt.payUrl !== ''){
                                window.location.href = opt.payUrl;
                            } else {
                                window.location.reload();
                            }
                        }
                    }
                });
            }

            //成功回调
            function subCost() {
                $('.openvipModel').remove();
                $('.wechat').show();
                $('.model').show();
            }


        }
    },
    // 微信、支付宝支付
    publicPay:function(obj){
        var defaults = {
            isWechat: true,
            intervalCallback: publicInter,
            successCallback: null,
            closeCallback: closeCallback
        };
        var opt=$.extend(defaults,obj),
            money = opt.money,
            childType=opt.childtype+'_'+opt.id;
        if(opt.isWechat){
            //微信支付
            jQuery.post('/mobile/weixinQR.json', {
                childtype:childType,
                rechargetype: 1,
                loginName:opt.phoneNum,
                money: money,
                typeId:opt.typeId
            }, function (data) {
                if (data) {
                    if (data.message != null) {
                        alert(data.message);
                        return false;
                    }
                    recordId = data.recordId
                    //微信支付弹窗 必要参数二维码地址及轮询id
                    $wx = $(this).wxpay({
                        code_url: data.code_url,
                        prepay_id: data.prepay_id,
                        acno: data.acno,
                        // intervalCallback: closeCallback
                        intervalCallback: opt.intervalCallback,
                        closeCallback: opt.closeCallback
                    });
                }
            });
        } else {
            window.open('/money/submitRecharge.htm?childtype='+opt.childtype+'_'+opt.id+'&rechargetype=1&loginName=' + opt.phoneNum + '&money='+opt.money+'&typeId='+opt.typeId);
            getIds(opt.childtype,opt.successCallback);
        }

        function publicInter(){
            $.post('/weixin/callbackwithid.json', {
                flag: recordId,
                token: opt.childtype
            }, function(data) {
                if(data) {
                    if(data.isSuccess == 1) {
                        $(this).clearInte();
                        opt.successCallback();
                        $('.model_pay').hide();

                    }
                }
            })
        }

        //成功回调
        function subCost() {
            alert(1);
            $('.openvipModel').remove();
            $('.wechat').show();
            $('.model').show();
        }

        //退出回调
        function closeCallback() {
            $(".models").show();
        };

        //获取支付宝id
        function getIds(childtype, callback) {
            //var childtype = $("#updates_sub").attr("childtype");
            $.ajax({
                type: "post",
                url: "/weixin/getorderidMobile.json",
                async: true,
                success: function(data) {
                    $("#data-recordId").val(data.id);
                    if(data.id == 1) {
                        setTimeout(function() {
                            getIds(childtype, callback);
                        }, 1000);
                    } else {
                        getStates(childtype, callback)
                    }
                }
            })
        }

        //获取支付状态
        var timer = '';
        var recordId = '';

        function getStates(token, cb) {
            var recordId = $("#data-recordId").val();
            $.post('/weixin/callbackwithid.json', {
                flag: recordId,
                token: token
            }, function(data) {
                if(data.isSuccess === 1) {
                    clearTimeout(timer);
                    if(typeof(cb) == "function") {
                        cb()
                    }
                } else {
                    timer = setTimeout(function() {
                        getStates(token, cb)
                    }, 2000)
                }
            })
        }

    },
    // 清除砍价金额、状态
    clearStatus:function(){
        kjState=false;
        kjMoney='';
    },

    // 详情页订阅开始
    subscription:function(){
        if(loginstate){
            this.subMoney();
        }else{
            $('#subscription').click();
        }
    },
    // 提交订阅
    getSubscription:function(){
        var _this = this;
        var brand =$('.subBrand').html();
        var money =_this.brandMoney().price;
        var carId = F.carId;
        $.post('/require/conditional.json', {
            id:carId,
            brand:brand,
            price:money
        }, function(data){
            if(data.message == 'success'){
                alert('您的信息已经提交，我们会定期为您推荐！');
            }else if(data.message == '您已经提交了相同的订阅'){
                alert('您已经提交了相同的订阅');
            }else if (data.message == '非会员最多只能添加5条需求。'){
                alert('非会员最多只能添加5条需求。');
            }else if(data.message == '最多只能添加10条需求。'){
                alert('最多只能添加10条需求。');
            }else{
                alert('添加失败，请检查参数。');
            }
            // window.location.reload();
            $("#CmdMaskDiv").hide();
            $("#custommcarsend").hide();
        })
    },
    subMoney:function(){
        $('#subMoney').html(this.brandMoney().text);
        $('#modificationSub').attr('href','/quanguo/soa1j'+this.brandMoney().price+'t'+P.serid)
        $('#CmdMaskDiv').show();
        $('#custommcarsend').show();
        this.subscriptionClose();

    },
    brandMoney:function(){
        var m = F.money,money={},
            list =[3,5,8,12,24,30,40,100];
        list.forEach(function(v,i){
            if(m <= 0){return ''}
            if(m<3){
                money.text='3万元以下';
                money.price='0-3';
            }else if(m<=v && m>=list[i-1]){
                money.text=list[i-1]+'-'+v+'万';
                money.price=list[i-1]+'-'+v;
            }else if(m>100){
                money.text= '100万以上';
                money.price= '100+';
            }
        })
        return money
    },
    // 订阅回调
    subscriptionCheckedCallback:function(){
        if(!loginstate){
            var phone = $('#phoneSub').val();
            $('#subPhone').html(phone)
        }
        getJyTitle.subMoney();
    },
    // 订阅框关闭
    subscriptionClose:function(){
        $("#closeNews").click(function () {
            $("#CmdMaskDiv").hide();
            $("#custommcarsend").hide();
            $("#t_mobile").html("");
        });
    }
    // 详情页订阅结束
}
