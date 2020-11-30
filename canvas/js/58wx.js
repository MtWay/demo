var svn_revision = 9253;
define("mod/common/global", [], function() {
    var global = {};
    try {
        global = $.extend({}, global, window.____global)
    } catch (err) {}
    return global
});
define("mod/common/util", [], function() {
    function alertShowWrite(mes_title, message, button_num, button_left, button_right, leftbut_fn, rightbut_fn) {
        if (!$("#alertbg_write").length) {
            var alertHtml = "<div id='alertbg_write' style=\" width: 100%; position: fixed; top:0px; left: 0px; z-index: 2000;  font-family: '黑体';background: rgba(102,102,102,.5) \"></div>" + '<div id="alertbox_write">' + '<div id="alert_title">标题信息</div>' + '<div id="alert_content">信息内容</div>' + '<div id="butdiv_write">' + "</div></div>";
            $("body").append(alertHtml);
            var body_height = $(".body_div").css("height");
            $("#alertbg_write").css("height", body_height)
        } else {
            $("#butdiv_write").empty()
        }
        $("#alert_title").text(mes_title);
        $("#alert_content").text(message);
        if (button_num == "1") {
            $("#butdiv_write").show();
            var leftbut = '<div id="button1">' + button_left + "</div>";
            $("#butdiv_write").append(leftbut);
            $("#button1").css("width", "100%");
            $("#button1").bind("click", function() {
                leftbut_fn()
            })
        }
        if (button_num == "2") {
            $("#butdiv_write").show();
            var ttbut = '<div id="button1">' + button_left + '</div><div id="button2">' + button_right + "</div>";
            $("#butdiv_write").append(ttbut);
            $("#button1").bind("click", function() {
                leftbut_fn()
            });
            $("#button2").bind("click", function() {
                $("#alert_bg").remove();
                $("#alert_box").remove();
                rightbut_fn()
            })
        }
        if (typeof button_num == "undefined") {
            $("#butdiv_write").hide()
        }
        $("#alertbg_write").show();
        $("#alertbox_write").show();
        var y = parseInt($("#alertbox_write").get().clientHeight) / 2;
        $("#alertbox_write").css("margin-top", -y + "px");
        $("#butdiv_write > div").bind("touchstart", function() {
            $(this).addClass("but_hover")
        });
        $("#but_div > div").bind("touchmove", function() {
            $(this).removeClass("but_hover")
        });
        $("#but_div > div").bind("touchend", function() {
            $(this).removeClass("but_hover")
        });
        $("#alert_bg").bind("touchmove", function(e) {
            e.preventDefault()
        });
        $("#alert_box").bind("touchmove", function(e) {
            e.preventDefault()
        })
    }
    function alertShow(meg, but_num, but_left, but_right, left_fn, right_fn) {
        if (!$("#alert_bg").length) {
            var alertHtml = "<div id='alert_bg' style=\" width: 100%; position: absolute; top:0px; left: 0px; z-index: 2000; background: rgba(0, 0, 0, 0.1)\"></div>" + '<div id="alert_box" style="z-index: 2001">' + '<div id="show_mes">信息</div>' + '<div id="but_div">' + "</div></div>";
            $("body").append(alertHtml);
            var body_height = $(".body_div").css("height");
            $("#alert_bg").css("height", body_height)
        } else {
            $("#but_div").empty()
        }
        $("#show_mes").text(meg);
        if (but_num == "1") {
            $("#but_div").show();
            var lebut = '<div id="but01">' + but_left + "</div>";
            $("#but_div").append(lebut);
            $("#but01").css("width", "100%");
            $("#but01").bind("click", function() {
                left_fn()
            })
        }
        if (but_num == "2") {
            $("#but_div").show();
            var ttbut = '<div id="but01">' + but_left + '</div><div id="but02">' + but_right + "</div>";
            $("#but_div").append(ttbut);
            $("#but01").bind("click", function() {
                left_fn()
            });
            $("#but02").bind("click", function() {
                $("#alert_bg").remove();
                $("#alert_box").remove();
                right_fn()
            })
        }
        if (typeof but_num == "undefined") {
            $("#but_div").hide()
        }
        $("#alert_bg").show();
        $("#alert_box").show();
        var y = parseInt($("#alert_box").get().clientHeight) / 2;
        $("#alert_box").css("margin-top", -y + "px");
        $("#but_div > div").bind("touchstart", function() {
            $(this).addClass("but_hover")
        });
        $("#but_div > div").bind("touchmove", function() {
            $(this).removeClass("but_hover")
        });
        $("#but_div > div").bind("touchend", function() {
            $(this).removeClass("but_hover")
        });
        $("#alert_bg").bind("touchmove", function(e) {
            e.preventDefault()
        });
        $("#alert_box").bind("touchmove", function(e) {
            e.preventDefault()
        })
    }
    function exit_58() {
        window.location.href = "/logout/"
    }
    function cancel_but() {
        $("#alert_bg").hide();
        $("#alert_box").hide()
    }
    function cancel_button() {
        $("#alertbg_write").hide();
        $("#alertbox_write").hide()
    }
    function a_init() {
        $("a").bind("touchstart", function() {
            if (!$(this).hasClass("disabled")) {
                $(this).addClass("hover1")
            }
        });
        $("a").bind("touchmove", function() {
            $(this).removeClass("hover1")
        });
        $("a").bind("touchend", function() {
            $(this).removeClass("hover1")
        });
        $("a").bind("touchcancel", function() {
            $(this).removeClass("hover1")
        })
    }
    function is_weixin() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true
        } else {
            return false
        }
    }
    function GetURLString(name) {
        var regex = new RegExp("[?&]" + encodeURIComponent(name) + "\\=([^&#]+)");
        var value = (location.search.match(regex) || ["", ""])[1];
        return decodeURIComponent(value)
    }
    window.alertShowWrite = alertShowWrite;
    window.cancel_button = cancel_button;
    window.alertShow = alertShow;
    window.cancel_but = cancel_but;
    window.exit_58 = exit_58;
    window.a_init = a_init;
    window.is_weixin = is_weixin;
    return {
        cancel_button: cancel_button,
        alertShowWrite: alertShowWrite,
        alertShow: alertShow,
        cancel_but: cancel_but,
        exit_58: exit_58,
        a_init: a_init,
        is_weixin: is_weixin,
        GetURLString: GetURLString
    }
});
define("mod/job/job_rd_util", ["../common/util"], function(util) {
    var _jlRootDomain = "jianli.m.58.com";
    var _fromurl = escape(encodeURIComponent(document.location.href));
    function closewin() {
        $(".bgWin").css("display", "none");
        $(".winWap").css("display", "none");
        $("#winWap").html("")
    }
    function setauto(rid) {
        clickLog("from=fucengshezhiweituo");
        closewin();
        $.ajax({
            type: "get",
            dataType: "jsonp",
            url: "//" + _jlRootDomain + "/m/ajax/createDelegate/" + rid,
            success: function(data) {
                var isSuccess = data.isSuccess;
                if (isSuccess) {
                    util.alertShow("开启委托投递成功！", undefined, "", "", "", "");
                    setTimeout(function() {
                        util.cancel_but()
                    }, 1e3)
                } else {
                    util.alertShow("开启委托投递失败！", "1", "确定", "", util.cancel_but, "")
                }
            },
            error: function() {
                util.alertShow("开启委托投递失败！", "1", "确定", "", util.cancel_but, "")
            }
        })
    }
    function closeSetAuto() {
        closewin();
        setCookie("close_auto_delivery", "1", 10 * 24 * 3600 * 1e3)
    }
    function setdefaultresume(rid) {
        clickLog("from=fucengshezhimoren");
        closewin();
        $.ajax({
            type: "get",
            dataType: "jsonp",
            url: "//" + _jlRootDomain + "/m/ajax/setdefaultresume/?id=" + rid + "&prvid=0",
            success: function(data) {
                var isSuccess = data.isSuccess;
                if (isSuccess) {
                    util.alertShow("设置默认简历成功！", undefined, "", util.cancel_but, "", "");
                    setTimeout(util.cancel_but, 1e3)
                } else {
                    util.alertShow("设置默认简历失败！", "1", "确定", "", util.cancel_but, "")
                }
            },
            error: function() {
                util.alertShow("设置默认简历失败,请稍后再试", "1", "确定", "", util.cancel_but, "")
            }
        })
    }
    function addarea(rid, city) {
        clickLog("from=M_makesureTOaddcity");
        closewin();
        $.ajax({
            type: "get",
            dataType: "jsonp",
            url: "//" + _jlRootDomain + "/m/ajax/addareacity?rid=" + rid + "&areaid=" + city,
            success: function(data) {
                var isSuccess = data.isSuccess;
                if (isSuccess) {
                    util.alertShow("添加成功！", undefined, "", "", "", "");
                    setTimeout(util.cancel_but, 1e3)
                } else {
                    util.alertShow("添加失败！", "1", "确定", "", util.cancel_but, "")
                }
            },
            error: function() {
                util.alertShow("添加失败！", "1", "确定", "", util.cancel_but, "")
            }
        })
    }
    function setCookie(name, value, time) {
        var exp = new Date;
        exp.setTime(exp.getTime() + time);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";domain=.58.com;path=/"
    }
    function getCookie(name) {
        var arr = []
          , reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2])
        }
        return ""
    }
    window.closewin = closewin;
    window.setauto = setauto;
    window.closeSetAuto = closeSetAuto;
    window.setdefaultresume = setdefaultresume;
    window.addarea = addarea;
    window.setCookie = setCookie;
    window.getCookie = getCookie;
    return {
        jldomain: _jlRootDomain,
        fromurl: _fromurl,
        closewin: closewin,
        setauto: setauto,
        closeSetAuto: closeSetAuto,
        setdefaultresume: setdefaultresume,
        addarea: addarea,
        setCookie: setCookie,
        getCookie: getCookie
    }
});
define("mod/job/busi.common.login", ["../common/global", "./job_rd_util"], function(global, rd_util) {
    var isLogin = global.isLogin;
    var _jlRootDomain = rd_util.jldomain;
    var fromUrl = rd_util.fromurl;
    var isMicro = !location.pathname.match("common");
    $(function() {
        if (isLogin) {
            $(".login").hide();
            $(".my58").show()
        } else {
            $(".login").show();
            $(".my58").hide()
        }
        $("#r_login_btn").bind("click", function() {
            try {
                $("input[name=remember]")[0].checked = true;
                $("input[name=remember]")[1].checked = true
            } catch (e) {}
            if ($(this).hasClass("showLogin")) {
                $("#job_login").show();
                $("#job_reg").hide();
                $(".login_txt").hide();
                $("#r_login_btn").removeClass("showLogin").hide();
                $("#r_reg_btn").show();
                $(".r_tle").hide();
                if ("function" === typeof window.clickLog)
                    window.clickLog(isMicro ? "from=wjl_zhucezhuandenglu" : "from=jl_zhucezhuandenglu")
            } else {
                if ("function" === typeof window.clickLog)
                    window.clickLog(isMicro ? "from=jianli_post_fillout_micro_login" : "from=jianli_post_fillout_normal_login");
                if (isMicro) {
                    window.location.href = "//m.m.58.com/login/?path=//" + _jlRootDomain + "/m/createResumeLogin/?f=" + escape(encodeURIComponent(fromUrl)) + "&r=" + escape(encodeURIComponent(window.location.href))
                } else {
                    window.location.href = "//m.m.58.com/login/?path=" + window.location.href
                }
            }
        });
        $("#r_reg_btn").bind("click", function() {
            $(".login_txt").show();
            $("#r_login_btn").addClass("showLogin");
            $("#r_login_btn").show();
            $("#r_reg_btn").hide();
            $("#job_login").hide();
            $("#job_reg").show();
            $(".r_tle").html("验证手机号后即可申请该职位，并为您推荐更多高薪好工作！").show();
            if ("function" === typeof window.clickLog)
                window.clickLog(isMicro ? "from=wjl_dengluzhuanzhuce" : "from=jl_dengluzhuanzhuce")
        });
        $(".log_tab span").bind("click", function() {
            $(this).addClass("cur").siblings().removeClass("cur");
            if ($(this).html() == "手机登录") {
                $("#shoujidenglu").show();
                $("#zhanghaodenglu").hide();
                if ("function" === typeof window.clickLog)
                    window.clickLog(isMicro ? "from=wjl_shoujidenlgu" : "from=jl_shoujidenlgu")
            } else {
                $("#shoujidenglu").hide();
                $("#zhanghaodenglu").show();
                if ("function" === typeof window.clickLog)
                    window.clickLog(isMicro ? "from=wjl_zhanghaodenglu" : "from=jl_zhanghaodenglu")
            }
        });
        $("#passport_mobileauthlogin_resend_btn").bind("click", function() {
            if ("function" === typeof window.clickLog)
                window.clickLog(isMicro ? "from=wjl_huitianma" : "from=jl_huitianma")
        });
        $("#passport_mobileauthlogin_submit").bind("click", function() {
            if ("function" === typeof window.clickLog)
                window.clickLog(isMicro ? "from=wjl_zhucequeding" : "from=jl_zhucequeding")
        });
        $("#regButton").bind("click", function() {
            if ("function" === typeof window.clickLog)
                window.clickLog(isMicro ? "from=wjl_youxiangzhuce" : "from=jl_youxiangzhuce")
        });
        $("#loginButton").bind("click", function() {
            if ("function" === typeof window.clickLog)
                window.clickLog(isMicro ? "from=wjl_zdengluqueding" : "from=jl_zdengluqueding")
        });
        $(".rc_th").bind("mousedown", function() {
            var inp = $(this).siblings(".rc_td").find("input");
            if (inp.length) {
                inp.get(0).focus();
                return false
            }
        });
        $(".loginDiv").delegate("ul li", "mousedown", function() {
            var inp = $(this).find("input[type=text]");
            if (inp.length) {
                var btnId = $(this).find("input[type=button]").attr("id");
                if (btnId && btnId === "passport_mobileauthlogin_resend_btn" || btnId === "passport_mobilereglogin_resend_btn ") {
                    return
                } else {
                    inp.get(0).focus();
                    return false
                }
            }
        })
    })
});
define("mod/common/cookie", [], function() {
    $.cookie = {
        get: function(name, encode) {
            var arg = name + "=";
            var alen = arg.length;
            var clen = document.cookie.length;
            var i = 0;
            var j = 0;
            while (i < clen) {
                j = i + alen;
                if (document.cookie.substring(i, j) == arg)
                    return this.getCookieVal(j, encode);
                i = document.cookie.indexOf(" ", i) + 1;
                if (i == 0)
                    break
            }
            return null
        },
        getname: function(cookie_name, name) {
            var cookie_val = this.get(cookie_name);
            var regex = new RegExp("[?&]" + encodeURIComponent(name) + "\\=([^&#]+)");
            var value = (cookie_val.match(regex) || ["", ""])[1];
            return decodeURIComponent(value)
        },
        set: function(name, value, expires, path, domain, secure) {
            var argv = arguments;
            var argc = arguments.length;
            var now = new Date;
            var expires = argc > 2 ? argv[2] : new Date(now.getFullYear(),now.getMonth() + 1,now.getUTCDate());
            var path = argc > 3 ? argv[3] : "/";
            var domain = argc > 4 ? argv[4] : ".58.com";
            var secure = argc > 5 ? argv[5] : false;
            document.cookie = name + "=" + escape(value) + (expires == null ? "" : "; expires=" + expires.toGMTString()) + (path == null ? "" : "; path=" + path) + (domain == null ? "" : "; domain=" + domain) + (secure == true ? "; secure" : "")
        },
        remove: function(name) {
            if (this.get(name))
                this.set(name, "", new Date(1970,1,1))
        },
        getCookieVal: function(offset, encode) {
            var endstr = document.cookie.indexOf(";", offset);
            if (endstr == -1) {
                endstr = document.cookie.length
            }
            if (encode == false)
                return document.cookie.substring(offset, endstr);
            else
                return unescape(document.cookie.substring(offset, endstr))
        }
    }
});
define("mod/job/util.58timeTrak", ["../common/cookie"], function(cookie) {
    var timeTrak = window.timeTrak ? window.timeTrak : {};
    timeTrak.creatSrcipt = function() {
        var city = $.cookie.get("mcity") || "bj";
        var src = "//status.58.com/zhaopin?bp_time=" + timeTrak.bp_time + "&sp_time=" + timeTrak.sp_time + "&cz_time=" + timeTrak.cz_time + "&pagetype=" + timeTrak.pagetype + "&template_type=" + timeTrak.template_type + "&net_type=" + timeTrak.net_type + "&load_time=" + timeTrak.load_time + "&net_speed=" + timeTrak.net_speed + "&cdn_time=" + timeTrak.cdn_time + "&city=" + city;
        var x = document.createElement("SCRIPT");
        x.src = src;
        document.getElementsByTagName("body")[0].appendChild(x)
    }
    ;
    timeTrak.getStatus = function() {
        var connection = timeTrak.connection;
        if (connection) {
            if (connection.bandwidth > 10) {
                connection.type = "wifi"
            } else if (connection.bandwidth > 2) {
                connection.type = "3g"
            } else if (connection.bandwidth > 0) {
                connection.type = "2g"
            } else if (connection.bandwidth == 0) {
                connection.type = "none"
            } else {
                connection.type = "unknown"
            }
        } else {
            connection.type = "unknown"
        }
        return connection.type
    }
    ;
    timeTrak.imgLoad = function() {
        var imgNullSrc = "//nocdn.58cdn.com.cn/net_small.png"
          , imgSrc = "//nocdn.58cdn.com.cn/net_big.png"
          , imgSize = 22.6
          , timeLine = ""
          , imgNull_node = document.createElement("img")
          , imgNode = document.createElement("img");
        imgNode.onload = function() {
            var netTime = timeTrak.gettime() - timeLine;
            timeTrak.net_speed = (imgSize * 1e3 / netTime).toFixed(2);
            timeTrak.net_type = timeTrak.getStatus();
            timeTrak.creatSrcipt()
        }
        ;
        imgNull_node.onload = function() {
            timeLine = timeTrak.gettime();
            imgNode.src = imgSrc
        }
        ;
        imgNull_node.src = imgNullSrc
    }
});
define("mod/common/touchStyle", [], function() {
    var touchStyle = function(obj, hover) {
        $(obj).bind("touchstart", function() {
            $(this).addClass(hover)
        });
        $(obj).bind("touchmove", function() {
            $(this).removeClass(hover)
        });
        $(obj).bind("touchend", function() {
            $(this).removeClass(hover)
        });
        $(obj).bind("touchcancel", function() {
            $(this).removeClass(hover)
        })
    };
    return touchStyle
});
define("mod/job/core.EXIF", [], function() {
    var EXIF = {};
    (function() {
        var bDebug = false;
        EXIF.Tags = {
            36864: "ExifVersion",
            40960: "FlashpixVersion",
            40961: "ColorSpace",
            40962: "PixelXDimension",
            40963: "PixelYDimension",
            37121: "ComponentsConfiguration",
            37122: "CompressedBitsPerPixel",
            37500: "MakerNote",
            37510: "UserComment",
            40964: "RelatedSoundFile",
            36867: "DateTimeOriginal",
            36868: "DateTimeDigitized",
            37520: "SubsecTime",
            37521: "SubsecTimeOriginal",
            37522: "SubsecTimeDigitized",
            33434: "ExposureTime",
            33437: "FNumber",
            34850: "ExposureProgram",
            34852: "SpectralSensitivity",
            34855: "ISOSpeedRatings",
            34856: "OECF",
            37377: "ShutterSpeedValue",
            37378: "ApertureValue",
            37379: "BrightnessValue",
            37380: "ExposureBias",
            37381: "MaxApertureValue",
            37382: "SubjectDistance",
            37383: "MeteringMode",
            37384: "LightSource",
            37385: "Flash",
            37396: "SubjectArea",
            37386: "FocalLength",
            41483: "FlashEnergy",
            41484: "SpatialFrequencyResponse",
            41486: "FocalPlaneXResolution",
            41487: "FocalPlaneYResolution",
            41488: "FocalPlaneResolutionUnit",
            41492: "SubjectLocation",
            41493: "ExposureIndex",
            41495: "SensingMethod",
            41728: "FileSource",
            41729: "SceneType",
            41730: "CFAPattern",
            41985: "CustomRendered",
            41986: "ExposureMode",
            41987: "WhiteBalance",
            41988: "DigitalZoomRation",
            41989: "FocalLengthIn35mmFilm",
            41990: "SceneCaptureType",
            41991: "GainControl",
            41992: "Contrast",
            41993: "Saturation",
            41994: "Sharpness",
            41995: "DeviceSettingDescription",
            41996: "SubjectDistanceRange",
            40965: "InteroperabilityIFDPointer",
            42016: "ImageUniqueID"
        };
        EXIF.TiffTags = {
            256: "ImageWidth",
            257: "ImageHeight",
            34665: "ExifIFDPointer",
            34853: "GPSInfoIFDPointer",
            40965: "InteroperabilityIFDPointer",
            258: "BitsPerSample",
            259: "Compression",
            262: "PhotometricInterpretation",
            274: "Orientation",
            277: "SamplesPerPixel",
            284: "PlanarConfiguration",
            530: "YCbCrSubSampling",
            531: "YCbCrPositioning",
            282: "XResolution",
            283: "YResolution",
            296: "ResolutionUnit",
            273: "StripOffsets",
            278: "RowsPerStrip",
            279: "StripByteCounts",
            513: "JPEGInterchangeFormat",
            514: "JPEGInterchangeFormatLength",
            301: "TransferFunction",
            318: "WhitePoint",
            319: "PrimaryChromaticities",
            529: "YCbCrCoefficients",
            532: "ReferenceBlackWhite",
            306: "DateTime",
            270: "ImageDescription",
            271: "Make",
            272: "Model",
            305: "Software",
            315: "Artist",
            33432: "Copyright"
        };
        EXIF.GPSTags = {
            0: "GPSVersionID",
            1: "GPSLatitudeRef",
            2: "GPSLatitude",
            3: "GPSLongitudeRef",
            4: "GPSLongitude",
            5: "GPSAltitudeRef",
            6: "GPSAltitude",
            7: "GPSTimeStamp",
            8: "GPSSatellites",
            9: "GPSStatus",
            10: "GPSMeasureMode",
            11: "GPSDOP",
            12: "GPSSpeedRef",
            13: "GPSSpeed",
            14: "GPSTrackRef",
            15: "GPSTrack",
            16: "GPSImgDirectionRef",
            17: "GPSImgDirection",
            18: "GPSMapDatum",
            19: "GPSDestLatitudeRef",
            20: "GPSDestLatitude",
            21: "GPSDestLongitudeRef",
            22: "GPSDestLongitude",
            23: "GPSDestBearingRef",
            24: "GPSDestBearing",
            25: "GPSDestDistanceRef",
            26: "GPSDestDistance",
            27: "GPSProcessingMethod",
            28: "GPSAreaInformation",
            29: "GPSDateStamp",
            30: "GPSDifferential"
        };
        EXIF.StringValues = {
            ExposureProgram: {
                0: "Not defined",
                1: "Manual",
                2: "Normal program",
                3: "Aperture priority",
                4: "Shutter priority",
                5: "Creative program",
                6: "Action program",
                7: "Portrait mode",
                8: "Landscape mode"
            },
            MeteringMode: {
                0: "Unknown",
                1: "Average",
                2: "CenterWeightedAverage",
                3: "Spot",
                4: "MultiSpot",
                5: "Pattern",
                6: "Partial",
                255: "Other"
            },
            LightSource: {
                0: "Unknown",
                1: "Daylight",
                2: "Fluorescent",
                3: "Tungsten (incandescent light)",
                4: "Flash",
                9: "Fine weather",
                10: "Cloudy weather",
                11: "Shade",
                12: "Daylight fluorescent (D 5700 - 7100K)",
                13: "Day white fluorescent (N 4600 - 5400K)",
                14: "Cool white fluorescent (W 3900 - 4500K)",
                15: "White fluorescent (WW 3200 - 3700K)",
                17: "Standard light A",
                18: "Standard light B",
                19: "Standard light C",
                20: "D55",
                21: "D65",
                22: "D75",
                23: "D50",
                24: "ISO studio tungsten",
                255: "Other"
            },
            Flash: {
                0: "Flash did not fire",
                1: "Flash fired",
                5: "Strobe return light not detected",
                7: "Strobe return light detected",
                9: "Flash fired, compulsory flash mode",
                13: "Flash fired, compulsory flash mode, return light not detected",
                15: "Flash fired, compulsory flash mode, return light detected",
                16: "Flash did not fire, compulsory flash mode",
                24: "Flash did not fire, auto mode",
                25: "Flash fired, auto mode",
                29: "Flash fired, auto mode, return light not detected",
                31: "Flash fired, auto mode, return light detected",
                32: "No flash function",
                65: "Flash fired, red-eye reduction mode",
                69: "Flash fired, red-eye reduction mode, return light not detected",
                71: "Flash fired, red-eye reduction mode, return light detected",
                73: "Flash fired, compulsory flash mode, red-eye reduction mode",
                77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
                79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
                89: "Flash fired, auto mode, red-eye reduction mode",
                93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
                95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
            },
            SensingMethod: {
                1: "Not defined",
                2: "One-chip color area sensor",
                3: "Two-chip color area sensor",
                4: "Three-chip color area sensor",
                5: "Color sequential area sensor",
                7: "Trilinear sensor",
                8: "Color sequential linear sensor"
            },
            SceneCaptureType: {
                0: "Standard",
                1: "Landscape",
                2: "Portrait",
                3: "Night scene"
            },
            SceneType: {
                1: "Directly photographed"
            },
            CustomRendered: {
                0: "Normal process",
                1: "Custom process"
            },
            WhiteBalance: {
                0: "Auto white balance",
                1: "Manual white balance"
            },
            GainControl: {
                0: "None",
                1: "Low gain up",
                2: "High gain up",
                3: "Low gain down",
                4: "High gain down"
            },
            Contrast: {
                0: "Normal",
                1: "Soft",
                2: "Hard"
            },
            Saturation: {
                0: "Normal",
                1: "Low saturation",
                2: "High saturation"
            },
            Sharpness: {
                0: "Normal",
                1: "Soft",
                2: "Hard"
            },
            SubjectDistanceRange: {
                0: "Unknown",
                1: "Macro",
                2: "Close view",
                3: "Distant view"
            },
            FileSource: {
                3: "DSC"
            },
            Components: {
                0: "",
                1: "Y",
                2: "Cb",
                3: "Cr",
                4: "R",
                5: "G",
                6: "B"
            }
        };
        function findEXIFinJPEG(oFile) {
            var aMarkers = [];
            if (oFile.getByteAt(0) != 255 || oFile.getByteAt(1) != 216) {
                return false
            }
            var iOffset = 2;
            var iLength = oFile.getLength();
            while (iOffset < iLength) {
                if (oFile.getByteAt(iOffset) != 255) {
                    if (bDebug)
                        console.log("Not a valid marker at offset " + iOffset + ", found: " + oFile.getByteAt(iOffset));
                    return false
                }
                var iMarker = oFile.getByteAt(iOffset + 1);
                if (iMarker == 22400) {
                    if (bDebug)
                        console.log("Found 0xFFE1 marker");
                    return readEXIFData(oFile, iOffset + 4, oFile.getShortAt(iOffset + 2, true) - 2);
                    iOffset += 2 + oFile.getShortAt(iOffset + 2, true)
                } else if (iMarker == 225) {
                    if (bDebug)
                        console.log("Found 0xFFE1 marker");
                    return readEXIFData(oFile, iOffset + 4, oFile.getShortAt(iOffset + 2, true) - 2)
                } else {
                    iOffset += 2 + oFile.getShortAt(iOffset + 2, true)
                }
            }
        }
        function readTags(oFile, iTIFFStart, iDirStart, oStrings, bBigEnd) {
            var iEntries = oFile.getShortAt(iDirStart, bBigEnd);
            var oTags = {};
            for (var i = 0; i < iEntries; i++) {
                var iEntryOffset = iDirStart + i * 12 + 2;
                var strTag = oStrings[oFile.getShortAt(iEntryOffset, bBigEnd)];
                if (!strTag && bDebug)
                    console.log("Unknown tag: " + oFile.getShortAt(iEntryOffset, bBigEnd));
                oTags[strTag] = readTagValue(oFile, iEntryOffset, iTIFFStart, iDirStart, bBigEnd)
            }
            return oTags
        }
        function readTagValue(oFile, iEntryOffset, iTIFFStart, iDirStart, bBigEnd) {
            var iType = oFile.getShortAt(iEntryOffset + 2, bBigEnd);
            var iNumValues = oFile.getLongAt(iEntryOffset + 4, bBigEnd);
            var iValueOffset = oFile.getLongAt(iEntryOffset + 8, bBigEnd) + iTIFFStart;
            switch (iType) {
            case 1:
            case 7:
                if (iNumValues == 1) {
                    return oFile.getByteAt(iEntryOffset + 8, bBigEnd)
                } else {
                    var iValOffset = iNumValues > 4 ? iValueOffset : iEntryOffset + 8;
                    var aVals = [];
                    for (var n = 0; n < iNumValues; n++) {
                        aVals[n] = oFile.getByteAt(iValOffset + n)
                    }
                    return aVals
                }
                break;
            case 2:
                var iStringOffset = iNumValues > 4 ? iValueOffset : iEntryOffset + 8;
                return oFile.getStringAt(iStringOffset, iNumValues - 1);
                break;
            case 3:
                if (iNumValues == 1) {
                    return oFile.getShortAt(iEntryOffset + 8, bBigEnd)
                } else {
                    var iValOffset = iNumValues > 2 ? iValueOffset : iEntryOffset + 8;
                    var aVals = [];
                    for (var n = 0; n < iNumValues; n++) {
                        aVals[n] = oFile.getShortAt(iValOffset + 2 * n, bBigEnd)
                    }
                    return aVals
                }
                break;
            case 4:
                if (iNumValues == 1) {
                    return oFile.getLongAt(iEntryOffset + 8, bBigEnd)
                } else {
                    var aVals = [];
                    for (var n = 0; n < iNumValues; n++) {
                        aVals[n] = oFile.getLongAt(iValueOffset + 4 * n, bBigEnd)
                    }
                    return aVals
                }
                break;
            case 5:
                if (iNumValues == 1) {
                    return oFile.getLongAt(iValueOffset, bBigEnd) / oFile.getLongAt(iValueOffset + 4, bBigEnd)
                } else {
                    var aVals = [];
                    for (var n = 0; n < iNumValues; n++) {
                        aVals[n] = oFile.getLongAt(iValueOffset + 8 * n, bBigEnd) / oFile.getLongAt(iValueOffset + 4 + 8 * n, bBigEnd)
                    }
                    return aVals
                }
                break;
            case 9:
                if (iNumValues == 1) {
                    return oFile.getSLongAt(iEntryOffset + 8, bBigEnd)
                } else {
                    var aVals = [];
                    for (var n = 0; n < iNumValues; n++) {
                        aVals[n] = oFile.getSLongAt(iValueOffset + 4 * n, bBigEnd)
                    }
                    return aVals
                }
                break;
            case 10:
                if (iNumValues == 1) {
                    return oFile.getSLongAt(iValueOffset, bBigEnd) / oFile.getSLongAt(iValueOffset + 4, bBigEnd)
                } else {
                    var aVals = [];
                    for (var n = 0; n < iNumValues; n++) {
                        aVals[n] = oFile.getSLongAt(iValueOffset + 8 * n, bBigEnd) / oFile.getSLongAt(iValueOffset + 4 + 8 * n, bBigEnd)
                    }
                    return aVals
                }
                break
            }
        }
        function readEXIFData(oFile, iStart, iLength) {
            if (oFile.getStringAt(iStart, 4) != "Exif") {
                if (bDebug)
                    console.log("Not valid EXIF data! " + oFile.getStringAt(iStart, 4));
                return false
            }
            var bBigEnd;
            var iTIFFOffset = iStart + 6;
            if (oFile.getShortAt(iTIFFOffset) == 18761) {
                bBigEnd = false
            } else if (oFile.getShortAt(iTIFFOffset) == 19789) {
                bBigEnd = true
            } else {
                if (bDebug)
                    console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)");
                return false
            }
            if (oFile.getShortAt(iTIFFOffset + 2, bBigEnd) != 42) {
                if (bDebug)
                    console.log("Not valid TIFF data! (no 0x002A)");
                return false
            }
            if (oFile.getLongAt(iTIFFOffset + 4, bBigEnd) != 8) {
                if (bDebug)
                    console.log("Not valid TIFF data! (First offset not 8)", oFile.getShortAt(iTIFFOffset + 4, bBigEnd));
                return false
            }
            var oTags = readTags(oFile, iTIFFOffset, iTIFFOffset + 8, EXIF.TiffTags, bBigEnd);
            if (oTags.ExifIFDPointer) {
                var oEXIFTags = readTags(oFile, iTIFFOffset, iTIFFOffset + oTags.ExifIFDPointer, EXIF.Tags, bBigEnd);
                for (var strTag in oEXIFTags) {
                    switch (strTag) {
                    case "LightSource":
                    case "Flash":
                    case "MeteringMode":
                    case "ExposureProgram":
                    case "SensingMethod":
                    case "SceneCaptureType":
                    case "SceneType":
                    case "CustomRendered":
                    case "WhiteBalance":
                    case "GainControl":
                    case "Contrast":
                    case "Saturation":
                    case "Sharpness":
                    case "SubjectDistanceRange":
                    case "FileSource":
                        oEXIFTags[strTag] = EXIF.StringValues[strTag][oEXIFTags[strTag]];
                        break;
                    case "ExifVersion":
                    case "FlashpixVersion":
                        oEXIFTags[strTag] = String.fromCharCode(oEXIFTags[strTag][0], oEXIFTags[strTag][1], oEXIFTags[strTag][2], oEXIFTags[strTag][3]);
                        break;
                    case "ComponentsConfiguration":
                        oEXIFTags[strTag] = EXIF.StringValues.Components[oEXIFTags[strTag][0]] + EXIF.StringValues.Components[oEXIFTags[strTag][1]] + EXIF.StringValues.Components[oEXIFTags[strTag][2]] + EXIF.StringValues.Components[oEXIFTags[strTag][3]];
                        break
                    }
                    oTags[strTag] = oEXIFTags[strTag]
                }
            }
            if (oTags.GPSInfoIFDPointer) {
                var oGPSTags = readTags(oFile, iTIFFOffset, iTIFFOffset + oTags.GPSInfoIFDPointer, EXIF.GPSTags, bBigEnd);
                for (var strTag in oGPSTags) {
                    switch (strTag) {
                    case "GPSVersionID":
                        oGPSTags[strTag] = oGPSTags[strTag][0] + "." + oGPSTags[strTag][1] + "." + oGPSTags[strTag][2] + "." + oGPSTags[strTag][3];
                        break
                    }
                    oTags[strTag] = oGPSTags[strTag]
                }
            }
            return oTags
        }
        EXIF.readFromBinaryFile = function(oFile) {
            return findEXIFinJPEG(oFile)
        }
    }
    )();
    return EXIF
});
define("mod/job/core.BinaryFile", [], function() {
    var BinaryFile = function(strData, iDataOffset, iDataLength) {
        var data = strData;
        var dataOffset = iDataOffset || 0;
        var dataLength = 0;
        this.getRawData = function() {
            return data
        }
        ;
        if (typeof strData == "string") {
            dataLength = iDataLength || data.length;
            this.getByteAt = function(iOffset) {
                return data.charCodeAt(iOffset + dataOffset) & 255
            }
            ;
            this.getBytesAt = function(iOffset, iLength) {
                var aBytes = [];
                for (var i = 0; i < iLength; i++) {
                    aBytes[i] = data.charCodeAt(iOffset + i + dataOffset) & 255
                }
                return aBytes
            }
        } else if (typeof strData == "unknown") {
            dataLength = iDataLength || IEBinary_getLength(data);
            this.getByteAt = function(iOffset) {
                return IEBinary_getByteAt(data, iOffset + dataOffset)
            }
            ;
            this.getBytesAt = function(iOffset, iLength) {
                return new VBArray(IEBinary_getBytesAt(data, iOffset + dataOffset, iLength)).toArray()
            }
        }
        this.getLength = function() {
            return dataLength
        }
        ;
        this.getSByteAt = function(iOffset) {
            var iByte = this.getByteAt(iOffset);
            if (iByte > 127)
                return iByte - 256;
            else
                return iByte
        }
        ;
        this.getShortAt = function(iOffset, bBigEndian) {
            var iShort = bBigEndian ? (this.getByteAt(iOffset) << 8) + this.getByteAt(iOffset + 1) : (this.getByteAt(iOffset + 1) << 8) + this.getByteAt(iOffset);
            if (iShort < 0)
                iShort += 65536;
            return iShort
        }
        ;
        this.getSShortAt = function(iOffset, bBigEndian) {
            var iUShort = this.getShortAt(iOffset, bBigEndian);
            if (iUShort > 32767)
                return iUShort - 65536;
            else
                return iUShort
        }
        ;
        this.getLongAt = function(iOffset, bBigEndian) {
            var iByte1 = this.getByteAt(iOffset)
              , iByte2 = this.getByteAt(iOffset + 1)
              , iByte3 = this.getByteAt(iOffset + 2)
              , iByte4 = this.getByteAt(iOffset + 3);
            var iLong = bBigEndian ? (((iByte1 << 8) + iByte2 << 8) + iByte3 << 8) + iByte4 : (((iByte4 << 8) + iByte3 << 8) + iByte2 << 8) + iByte1;
            if (iLong < 0)
                iLong += 4294967296;
            return iLong
        }
        ;
        this.getSLongAt = function(iOffset, bBigEndian) {
            var iULong = this.getLongAt(iOffset, bBigEndian);
            if (iULong > 2147483647)
                return iULong - 4294967296;
            else
                return iULong
        }
        ;
        this.getStringAt = function(iOffset, iLength) {
            var aStr = [];
            var aBytes = this.getBytesAt(iOffset, iLength);
            for (var j = 0; j < iLength; j++) {
                aStr[j] = String.fromCharCode(aBytes[j])
            }
            return aStr.join("")
        }
        ;
        this.getCharAt = function(iOffset) {
            return String.fromCharCode(this.getByteAt(iOffset))
        }
        ;
        this.toBase64 = function() {
            return window.btoa(data)
        }
        ;
        this.fromBase64 = function(strBase64) {
            data = window.atob(strBase64)
        }
    };
    return BinaryFile
});
define("mod/job/util.cutImg", [], function() {
    var resizeableImage = function(that, image_target, afterCut, cancel, index) {
        var $container, imgWidth, imgHeight, maxTop, orig_src = new Image, image_target = $(image_target).get(0), event_state = {}, constrain = false, min_width = 60, min_height = 60, max_width = 800, max_height = 900, resize_canvas = document.createElement("canvas"), isWidthImg = false, marginTop = $(".img-top").height(), clientWidth = document.body.clientWidth, overlayTopCss = $(".overlay").css("top"), overlayTop = $(".overlay").offset().top;
        init = function() {
            orig_src.src = image_target.src;
            if ($(".resize-container").length == 0) {
                $(image_target).wrap('<div class="resize-container"></div>').before('<span class="resize-handle resize-handle-nw"></span>').before('<span class="resize-handle resize-handle-ne"></span>').after('<span class="resize-handle resize-handle-se"></span>').after('<span class="resize-handle resize-handle-sw"></span>');
                $(image_target).parent(".resize-container")
            }
            $container = $(".resize-container");
            orig_src.onload = function() {
                var nWidth = orig_src.width
                  , nHeight = orig_src.height;
                if (nHeight < nWidth) {
                    isWidthImg = true;
                    image_target.style.width = "auto";
                    image_target.style.height = $(".overlay").height() + "px";
                    $container.css("top", overlayTopCss)
                } else {
                    isWidthImg = false;
                    image_target.style.width = "100%";
                    image_target.style.height = "auto";
                    $container.css("left", 0)
                }
            }
            ;
            $container.off("mousedown touchstart", ".resize-handle");
            $container.off("mousedown touchstart", "img");
            $(".js_crop").off("tap");
            $(".btn_cancel").off("click");
            $container.on("mousedown touchstart", ".resize-handle", startResize);
            $container.on("mousedown touchstart", "img", startMoving);
            $(".js_crop").on("tap", crop);
            $(".btn_cancel").on("click", function() {
                cancel(that)
            })
        }
        ;
        startResize = function(e) {
            e.preventDefault();
            e.stopPropagation();
            saveEventState(e);
            $(document).on("mousemove touchmove", resizing);
            $(document).on("mouseup touchend", endResize)
        }
        ;
        endResize = function(e) {
            e.preventDefault();
            $(document).off("mouseup touchend", endResize);
            $(document).off("mousemove touchmove", resizing)
        }
        ;
        saveEventState = function(e) {
            event_state.container_width = $container.width();
            event_state.container_height = $container.height();
            event_state.container_left = $container.offset().left;
            event_state.container_top = $container.offset().top;
            event_state.mouse_x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft();
            event_state.mouse_y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop();
            if (typeof e.originalEvent.touches !== "undefined") {
                event_state.touches = [];
                $.each(e.originalEvent.touches, function(i, ob) {
                    event_state.touches[i] = {};
                    event_state.touches[i].clientX = 0 + ob.clientX;
                    event_state.touches[i].clientY = 0 + ob.clientY
                })
            }
            event_state.evnt = e
        }
        ;
        resizeImage = function(width, height) {
            resize_canvas.width = width;
            resize_canvas.height = height;
            resize_canvas.getContext("2d").drawImage(orig_src, 0, 0, width, height);
            $(image_target).attr("src", resize_canvas.toDataURL("image/png"))
        }
        ;
        startMoving = function(e) {
            e.preventDefault();
            e.stopPropagation();
            saveEventState(e);
            overlayTop = $(".overlay").offset().top;
            imgWidth = $("#resize-image").width();
            imgHeight = $("#resize-image").height();
            maxTop = clientWidth - imgHeight + overlayTop;
            $(document).on("mousemove touchmove", moving);
            $(document).on("mouseup touchend", endMoving)
        }
        ;
        endMoving = function(e) {
            e.preventDefault();
            $(document).off("mouseup touchend", endMoving);
            $(document).off("mousemove touchmove", moving)
        }
        ;
        moving = function(e) {
            var touches, mouse = {};
            e.preventDefault();
            e.stopPropagation();
            touches = e.touches;
            if (isWidthImg) {
                mouse.x = (e.clientX || e.pageX || touches[0].clientX) + $(window).scrollLeft();
                $container.offset({
                    left: mouse.x - (event_state.mouse_x - event_state.container_left),
                    top: marginTop
                });
                if ($container.offset().left > 0) {
                    $container.offset({
                        left: 0,
                        top: marginTop
                    })
                } else if ($container.offset().left < clientWidth - imgWidth) {
                    $container.offset({
                        left: clientWidth - imgWidth,
                        top: marginTop
                    })
                }
                $container.css("top", overlayTopCss)
            } else {
                mouse.y = (e.clientY || e.pageY || touches[0].clientY) + $(window).scrollTop();
                $container.offset({
                    left: 0,
                    top: mouse.y - (event_state.mouse_y - event_state.container_top)
                });
                if ($container.offset().top > overlayTop) {
                    $container.offset({
                        top: overlayTop
                    })
                } else if ($container.offset().top < maxTop) {
                    $container.offset({
                        top: maxTop + 2
                    })
                }
            }
            if (event_state.touches && event_state.touches.length > 1 && touches.length > 1) {
                var width = event_state.container_width
                  , height = event_state.container_height;
                var a = event_state.touches[0].clientX - event_state.touches[1].clientX;
                a = a * a;
                var b = event_state.touches[0].clientY - event_state.touches[1].clientY;
                b = b * b;
                var dist1 = Math.sqrt(a + b);
                a = e.originalEvent.touches[0].clientX - touches[1].clientX;
                a = a * a;
                b = e.originalEvent.touches[0].clientY - touches[1].clientY;
                b = b * b;
                var dist2 = Math.sqrt(a + b);
                var ratio = dist2 / dist1;
                width = width * ratio;
                height = height * ratio;
                resizeImage(width, height)
            }
        }
        ;
        crop = function() {
            var crop_canvas, left = 0, top = 0, width = $(".overlay").width(), height = $(".overlay").height() - 4, widthP = image_target.naturalWidth / clientWidth, heightP = image_target.naturalHeight / (clientWidth + 4);
            if (isWidthImg) {
                left = -$container.offset().left;
                left = left * heightP;
                width = width * heightP;
                height = height * heightP
            } else {
                top = overlayTop - $container.offset().top;
                top = top * widthP;
                width = width * widthP;
                height = height * widthP
            }
            crop_canvas = document.createElement("canvas");
            crop_canvas.width = width;
            crop_canvas.height = height;
            crop_canvas.getContext("2d").drawImage(image_target, left, top, width, height, 0, 0, width, height);
            afterCut(that, crop_canvas.toDataURL("image/jpeg", .9).substring(23), index);
        }
        ;
        init()
    };
    return resizeableImage
});
define("mod/job/util.ImgUpload", ["../common/util", "./core.EXIF", "./core.BinaryFile", "./util.cutImg"], function(util, EXIF, BinaryFile, cutImg) {
    function ImgUpload(cfg) {
        var _this = this;
        var _default = {
            url: "//postimage.58.com/upload",
            fileInput: null,
            container: null,
            maxNum: 8,
            countNum: null,
            scale: .8,
            name: "img",
            isShowUpLoad: true,
            isDelete: false,
            shape: "square",
            sort: "prepend",
            watchBigImg: false,
            bigImgContainer: null,
            liIndex: 0,
            getImgSize: "_200_200.jpg",
            uploadSuccessLog: "",
            progressfn: function(ev) {
                var sTemp = parseInt(ev.loaded / ev.total * 100, 10) + "%"
            },
            success: function(data, index, isCut) {
                if (data.code === 1) {
                    var isUC = navigator.userAgent.match(/UCBrowser[\/]?([\d.]+)/i);
                    if (_this.opt.shape == "circle" && isUC && $.os.android) {
                        isCut = true
                    }
                    if (isCut || _this.opt.shape == "square") {
                        $(_this.opt.container).find("#imgShow" + index).removeClass("loading_item");
                        $(_this.opt.container).find("#imgShow" + index).css({
                            background: "url(" + data.url + ") center center",
                            "background-size": "cover"
                        });
                        $(_this.opt.container).find("#imgShow" + index).find("img").attr("src", data.url).attr("url", data.origin);
                        _this.getItemCount();
                        if (isCut) {
                            $(".cut_container").addClass("hide");
                            $(".upload_success").removeClass("hide");
                            $("#picture").attr("src", data.url.replace(_this.opt.getImgSize, ".jpg"));
                            setTimeout(function() {
                                $(".upload_success").addClass("hide")
                            }, 2e3);
                            $("#resize-image").attr("src", "")
                        }
                        if (_this.opt.watchBigImg) {
                            $("#bigImage_list").children().last().find("img").attr("src", data.url.replace(_this.opt.getImgSize, ".jpg"))
                        }
                        if (_this.opt.uploadSuccessLog != "") {
                            window.clickLog && window.clickLog("from=" + _this.opt.uploadSuccessLog)
                        }
                    } else if (_this.opt.shape == "circle") {
                        document.activeElement.blur();
                        $(".resize-image").attr("src", data.url);
                        $(".resize-image").attr("id", "resize-image");
                        setTimeout(function() {
                            $(".cut_container").removeClass("hide")
                        }, 100);
                        $("body").addClass("overHidden");
                        cutImg(_this, $(".resize-image"), _this.afterCut, _this.cancelCut, index)
                    }
                } else {
                    util.alertShow(data.msg, 1, "关闭", "", util.cancel_but);
                    $(_this.opt.container).find("#imgShow" + index).remove();
                    _this.getItemCount()
                }
            },
            error: function(index) {
                util.alertShow("上传失败，请检查网络后再试试吧", 1, "关闭", "", util.cancel_but);
                if (_this.opt.shape == "circle") {
                    if ($(".toutu_list .upload_item").length != 0 && typeof _this.opt.oldToutu != "undefined") {
                        $(_this.opt.container).find(".upload_item").removeClass("loading_item");
                        $(_this.opt.container).find(".upload_item").css({
                            background: "url(" + _this.opt.oldToutu + ") center center",
                            "background-size": "cover"
                        });
                        $(_this.opt.container).find(".upload_item").find("img").attr("src", _this.opt.oldToutu).attr("url", _this.opt.oldToutu)
                    } else {
                        var uploadPicStr = '<li class="upload_action"><input type="file" accept="image/jpg,image/jpeg,image/png,image/gif" id="fileUpload"></li>';
                        $("#toutu_list").html(uploadPicStr);
                        $(".uploadHead_tip").removeClass("hide");
                        $(".upload_toutu").removeClass("hide")
                    }
                } else {
                    $(_this.opt.container).find("#imgShow" + index).remove()
                }
                _this.getItemCount()
            },
            timeoutfn: function(index) {
                util.alertShow("上传失败，请检查网络环境或压缩图片容量后上传", 1, "关闭", "", util.cancel_but);
                $(_this.opt.container).find("#imgShow" + index).remove();
                _this.getItemCount()
            },
            errFn: function(err) {
                util.alertShow(err, 1, "关闭", "", util.cancel_but)
            }
        };
        this.opt = $.extend({}, _default, cfg);
        this.init()
    }
    ImgUpload.prototype = {
        constructor: ImgUpload,
        liIndex: 0,
        init: function() {
            var _this = this;
            _this.liIndex = _this.opt.liIndex;
            _this.getItemCount();
            $(_this.opt.container).on("change", _this.opt.fileInput, function() {
                var _tar = this.files ? this.files : null;
                if (!_tar) {
                    return false
                }
                var rReg = /\.(jpg)|(jpeg)|(gif)|(png)$/i;
                var maxSize = 20 * 1024 * 1024;
                var err = "";
                var file = _tar[0];
                if (_this.opt.shape == "circle") {
                    _this.opt.oldToutu = $(".toutu_list .upload_item img").attr("src")
                }
                if (!file) {
                    return false
                }
                if (file.size > maxSize) {
                    err = "图片超过尺寸限制！"
                } else if (!rReg.test(file.name)) {
                    err = "请上传 jpg/jpeg/gif/png格式的图片！"
                }
                if (err) {
                    _this.opt.errFn && _this.opt.errFn(err);
                    return false
                }
                _this.liIndex += 1;
                var loadingStr = "";
                if (_this.opt.maxNum === 1 && !_this.opt.isDelete) {
                    loadingStr = '<li class="upload_item loading_item" id="imgShow' + _this.liIndex + '">' + '<img src="" class="upload_image loading_img" />' + '<input type="file" accept="image/jpg,image/jpeg,image/png,image/gif" id="' + _this.opt.fileInput.replace("#", "") + '" class="fileImage" name="">' + "</li>";
                    $(_this.opt.container).html(loadingStr)
                } else {
                    loadingStr = '<li class="upload_item loading_item" id="imgShow' + _this.liIndex + '">' + '<a href="javascript:void(0);" class="upload_delete" title="删除"></a>' + '<img src="" class="upload_image loading_img" /><br>' + "</li>";
                    if (_this.opt.sort == "append") {
                        $(".upload_action").before(loadingStr)
                    } else {
                        $(_this.opt.container).prepend(loadingStr)
                    }
                    if (_this.opt.watchBigImg) {
                        console.log(_this.liIndex);
                        var bigImgStr = "<li data-index=" + _this.liIndex + ">" + "<img src='' class='bigImage'>" + "</li>";
                        if (_this.opt.sort == "append") {
                            $(_this.opt.bigImgContainer).append(bigImgStr);
                            var clientWidth = document.documentElement.clientWidth;
                            $(".bigImage").css("height", clientWidth)
                        } else {
                            $(_this.opt.bigImgContainer).prepend(bigImgStr)
                        }
                    }
                    getItemSize();
                    _this.getItemCount()
                }
                if (_this.opt.shape == "circle") {
                    $(".uploadHead_tip").addClass("hide");
                    $(".upload_toutu").addClass("hide")
                } else {
                    $(".photo_mes").addClass("hide")
                }
                _this.zipImg({
                    files: _tar,
                    scale: _this.opt.scale,
                    callback: function(tar) {
                        if (tar.constructor != Array) {
                            tar = [tar]
                        }
                        _this.submit(tar, _this.liIndex)
                    }
                })
            });
            function getItemSize() {
                var uploadItem = $(".upload_item");
                var _width = uploadItem.css("width");
                uploadItem.css({
                    height: _width
                })
            }
            $(window).bind("orientationchange", function() {
                getItemSize()
            });
            $(_this.opt.container).on("click", ".upload_delete", function() {
                var par = $(this).closest(".upload_item");
                var uploadItem = "";
                if (_this.opt.watchBigImg) {
                    var index = $(_this.opt.container).find(".upload_item").index(par);
                    $(_this.opt.bigImgContainer).find("li").eq(index).remove()
                }
                par.remove();
                $(_this.opt.fileInput).val("");
                uploadItem = $(_this.opt.container).find(".upload_item");
                if (!uploadItem.length) {
                    $(".photo_mes").removeClass("hide")
                }
                _this.getItemCount()
            })
        },
        zipImg: function(cfg) {
            var _this = this;
            var options = cfg;
            [].forEach.call(options.files, function(v, k) {
                var fr = new FileReader;
                fr.onload = function(e) {
                    var oExif = EXIF.readFromBinaryFile(new BinaryFile(e.target.result)) || {};
                    var $img = document.createElement("img");
                    $img.onload = function() {
                        _this.fixDirect().fix($img, oExif, options.callback, options.scale)
                    }
                    ;
                    $img.src = window.webkitURL.createObjectURL(v)
                }
                ;
                fr.readAsBinaryString(v)
            })
        },
        fixDirect: function() {
            var r = {};
            var _this = this;
            r.fix = function(img, a, callback, scale) {
                var n = img.naturalHeight
                  , i = img.naturalWidth
                  , c = 1024
                  , o = document.createElement("canvas")
                  , s = o.getContext("2d");
                a = a || {};
                if (n > c || i > c) {
                    o.width = o.height = c
                } else {
                    o.width = i;
                    o.height = n
                }
                a.Orientation = a.Orientation || 1;
                r.detectSubSampling(img) && (i /= 2,
                n /= 2);
                var d, h;
                i > n ? (d = c,
                h = Math.ceil(n / i * c)) : (h = c,
                d = Math.ceil(i / n * c));
                var g = Math.max(o.width, o.height) / 2
                  , l = document.createElement("canvas");
                if (n > c || i > c) {
                    l.width = g,
                    l.height = g
                } else {
                    l.width = i;
                    l.height = n;
                    d = i;
                    h = n
                }
                var m = l.getContext("2d")
                  , u = r.detect(img, n) || 1;
                s.save();
                r.transformCoordinate(o, d, h, a.Orientation);
                var isUC = navigator.userAgent.match(/UCBrowser[\/]?([\d.]+)/i);
                if (isUC && $.os.android) {
                    s.drawImage(img, 0, 0, d, h)
                } else {
                    for (var f = g * d / i, w = g * h / n / u, I = 0, b = 0; n > I; ) {
                        for (var x = 0, C = 0; i > x; )
                            m.clearRect(0, 0, g, g),
                            m.drawImage(img, -x, -I),
                            s.drawImage(l, 0, 0, g, g, C, b, f, w),
                            x += g,
                            C += f;
                        I += g,
                        b += w
                    }
                }
                s.restore();
                a.Orientation = 1;
                img = document.createElement("img");
                img.onload = function() {
                    a.PixelXDimension = img.width;
                    a.PixelYDimension = img.height
                }
                ;
                callback && callback(o.toDataURL("image/jpeg", scale).substring(23))
            }
            ;
            r.detect = function(img, a) {
                var e = document.createElement("canvas");
                e.width = 1;
                e.height = a;
                var r = e.getContext("2d");
                r.drawImage(img, 0, 0);
                for (var n = r.getImageData(0, 0, 1, a).data, i = 0, c = a, o = a; o > i; ) {
                    var s = n[4 * (o - 1) + 3];
                    0 === s ? c = o : i = o,
                    o = c + i >> 1
                }
                var d = o / a;
                return 0 === d ? 1 : d
            }
            ;
            r.detectSubSampling = function(img) {
                var a = img.naturalWidth
                  , e = img.naturalHeight;
                if (a * e > 1048576) {
                    var r = document.createElement("canvas");
                    r.width = r.height = 1;
                    var n = r.getContext("2d");
                    return n.drawImage(img, -a + 1, 0),
                    0 === n.getImageData(0, 0, 1, 1).data[3]
                }
                return !1
            }
            ;
            r.transformCoordinate = function(img, a, e, r) {
                switch (r) {
                case 5:
                case 6:
                case 7:
                case 8:
                    img.width = e,
                    img.height = a;
                    break;
                default:
                    img.width = a,
                    img.height = e
                }
                var n = img.getContext("2d");
                switch (r) {
                case 2:
                    n.translate(a, 0),
                    n.scale(-1, 1);
                    break;
                case 3:
                    n.translate(a, e),
                    n.rotate(Math.PI);
                    break;
                case 4:
                    n.translate(0, e),
                    n.scale(1, -1);
                    break;
                case 5:
                    n.rotate(.5 * Math.PI),
                    n.scale(1, -1);
                    break;
                case 6:
                    n.rotate(.5 * Math.PI),
                    n.translate(0, -e);
                    break;
                case 7:
                    n.rotate(.5 * Math.PI),
                    n.translate(a, -e),
                    n.scale(-1, 1);
                    break;
                case 8:
                    n.rotate(-.5 * Math.PI),
                    n.translate(-a, 0)
                }
            }
            ;
            return r
        },
        getItemCount: function() {
            var _this = this;
            var uploadItem = $(_this.opt.container).find(".upload_item");
            var len = uploadItem.length;
            var uploadAction = $(_this.opt.container).find(".upload_action");
            if (len < _this.opt.maxNum && _this.opt.isShowUpLoad) {
                uploadAction.show()
            } else {
                uploadAction.hide()
            }
            if (len >= 0) {
                if ($(_this.opt.countNum).find(".leftNum"))
                    $(_this.opt.countNum).find(".leftNum").text(_this.opt.maxNum - len);
                if ($(_this.opt.countNum).find(".loadedNum"))
                    $(_this.opt.countNum).find(".loadedNum").text(len)
            }
        },
        afterCut: function(_this, tar, liIndex) {
            if (tar.constructor != Array) {
                tar = [tar]
            }
            _this.submit(tar, liIndex, true)
        },
        cancelCut: function(_this) {
            $(".resize-image").attr("src", "");
            if ($(".toutu_list .upload_item").length != 0 && typeof _this.opt.oldToutu != "undefined") {
                $(_this.opt.container).find(".upload_item").removeClass("loading_item");
                $(_this.opt.container).find(".upload_item").css({
                    background: "url(" + _this.opt.oldToutu + ") center center",
                    "background-size": "cover"
                });
                $(_this.opt.container).find(".upload_item").find("img").attr("src", _this.opt.oldToutu).attr("url", _this.opt.oldToutu)
            } else {
                var uploadPicStr = '<li class="upload_action"><input type="file" accept="image/jpg,image/jpeg,image/png,image/gif" id="fileUpload"></li>';
                $("#toutu_list").html(uploadPicStr);
                $(".uploadHead_tip").removeClass("hide");
                $(".upload_toutu").removeClass("hide")
            }
            $(".cut_container").addClass("hide");
            $("#overlay").removeClass("hide");
            $(".upload_toutu_type").slideUp("fast");
            if ($(".third_img").length) {
                window.clickLog && window.clickLog("from=post-jianli-disanfangshow")
            }
            $("body").removeClass("overHidden")
        },
        submit: function(files, index, isCut) {
            if (typeof isCut == "undefined") {
                isCut = false
            }
            var _this = this;
            var file = files[0];
            var paramObj = {
                PicPos: 1,
                filename: _this.opt.name
            };
            paramObj[_this.opt.name] = file;
            if (file == "") {
                util.alertShow("请升级浏览器或选择其他浏览器", 1, "关闭", "", util.cancel_but)
            } else {
                if (!isCut && _this.opt.shape == "circle") {
                    var paramObj = {
                        "Pic-Size": "0*0",
                        "Pic-Encoding": "base64",
                        "Pic-Path": "/nowater/jltx/",
                        "Pic-Data": file
                    };
                    var paramStr = JSON.stringify(paramObj);
                    $.ajax({
                        url: "//upload.58cdn.com.cn/json?rand=" + Math.random(),
                        type: "POST",
                        data: paramStr,
                        timeout: 4e4,
                        contentType: "text/plain",
                        dataType: "JSONP",
                        error: function() {
                            _this.opt.error && _this.opt.error(index)
                        },
                        success: function(filename) {
                            var data = {
                                code: 1
                            };
                            if (filename != "") {
                                data.url = "//t1.58cdn.com.cn/nowater/jltx/" + filename
                            }
                            _this.opt.success && _this.opt.success(data, index, isCut)
                        }
                    })
                } else {
                    $.ajax({
                        url: _this.opt.url + "?codetype=base64&random=" + Math.random(),
                        type: "POST",
                        data: paramObj,
                        timeout: 4e4,
                        error: function() {
                            _this.opt.error && _this.opt.error(index)
                        },
                        success: function(data) {
                            $("body").removeClass("overHidden");
                            var data = JSON.parse(data);
                            if (data.url && data.url.indexOf("jpg") != -1) {
                                data.origin = data.url;
                                data.url = data.url.replace(".jpg", _this.opt.getImgSize);
                                data.url = "//t1.58cdn.com.cn" + data.url
                            }
                            _this.opt.success && _this.opt.success(data, index, isCut)
                        }
                    })
                }
            }
        }
    };
    return ImgUpload
});
define("mod/job/busi.resume.postToutu", ["./util.ImgUpload", "../common/global"], function(ImgUpload, global) {
    $(function() {
        var checkedIcon = "<img class='checked' src='//img.58cdn.com.cn/m58/img/checked.png'>";
        if (global.userResumepic != "") {
            $(".uploadHead_tip, .upload_toutu").addClass("hide")
        }
        var clientWidth = document.documentElement.clientWidth
          , clientHeight = document.documentElement.clientHeight;
        if (clientWidth / clientHeight > .65) {
            $("#img_preview #picture").css({
                "margin-top": "1rem",
                "margin-bottom": "0.4rem"
            })
        }
        if (clientWidth / clientHeight > .7) {
            $(".overlay").css({
                top: "1rem"
            });
            $(".img-top").css({
                height: "1rem"
            });
            $(".img-bottom").css({
                top: "11.0433rem"
            })
        }
        var toutuPic = $(".toutu_list .upload_item img");
        if (toutuPic.length) {
            $("#picture").attr("src", toutuPic.attr("src").replace("_200_200.jpg", ".jpg").replace("_126.png", "_200.png"))
        }
        $(".toutu .rc_go").on("click", function(event) {
            event.preventDefault();
            document.activeElement.blur();
            var $uploadItem = $(".toutu_list .upload_item");
            if ($uploadItem.length && $uploadItem.hasClass("loading_item")) {
                return false
            } else if ($uploadItem.length) {
                setTimeout(function() {
                    window.clickLog && window.clickLog("from=post-jianli-touxiangshow");
                    $("#img_preview").css("height", window.innerHeight + 100);
                    window.scrollTo(0, 1);
                    $("#img_preview").css("height", window.innerHeight + 100);
                    $("#img_preview").removeClass("hide")
                }, 300)
            } else {
                $("#overlay").removeClass("hide");
                $(".upload_toutu_type").slideUp("fast");
                if ($(".third_img").length) {
                    window.clickLog && window.clickLog("from=post-jianli-disanfangshow")
                }
            }
        });
        $("#picture")[0].onload = function() {
            if ($("#picture")[0].naturalWidth < 9 * clientWidth / 20) {
                $("#picture").css({
                    width: clientWidth / 2,
                    height: clientWidth / 2,
                    margin: "2rem auto 1.4rem"
                })
            } else {
                if (clientWidth / clientHeight > .65) {
                    $("#img_preview #picture").css({
                        width: clientWidth,
                        height: clientWidth,
                        "margin-top": "1rem",
                        "margin-bottom": "0.4rem"
                    })
                } else {
                    $("#picture").css({
                        width: clientWidth,
                        height: clientWidth,
                        margin: "2.2133rem auto 1rem"
                    })
                }
            }
        }
        ;
        $(".cancel, #overlay").on("click", function(event) {
            event.preventDefault();
            $("#overlay").addClass("hide");
            $(".upload_toutu_type").removeClass("hide");
            $(".upload_toutu_type").slideDown("fast");
            $(".virtual").slideDown("fast");
            $(".virtual").addClass("hide");
            $(".virtual").css("bottom", 0)
        });
        $(".my_img").on("click", function(e) {
            var $toutuType = $(".upload_toutu_type");
            $toutuType.slideDown("fast");
            $("#overlay").addClass("hide");
            setTimeout(function() {
                $toutuType.css("bottom", -$toutuType.height());
                $("#fileUpload").trigger("click")
            }, 200);
            window.clickLog && window.clickLog("from=post-jianli-mypic")
        });
        $(".toutu_list").on("click", "#fileUpload", function(event) {
            event.stopPropagation()
        });
        $(".virtual_img").on("click", function(event) {
            window.clickLog && window.clickLog("from=post-jianli-xuni");
            var toutuPic = $(".toutu_list .upload_image");
            if (toutuPic.length > 0) {
                var toutuSrc = toutuPic.attr("src");
                $(".virtual_item .checked").remove();
                if (toutuSrc.indexOf("//img.58cdn.com.cn/m58/img") >= 0) {
                    $(".virtual_toutuList").find("img[src='" + toutuSrc + "']").parent().append(checkedIcon)
                }
            }
            $(".select_type_div").addClass("hide");
            $(".virtual").removeClass("hide")
        });
        $(".back").on("click", function(event) {
            event.preventDefault();
            if ($(".virtual_toutuList .checked").length == 0) {
                $(".virtual").addClass("hide");
                $(".select_type_div").removeClass("hide")
            } else {
                $("#overlay").click()
            }
        });
        $(".virtual_item>img").on("click", function(event) {
            event.preventDefault();
            if ($(this).siblings(".checked").length) {
                return false
            }
            $(".virtual_item .checked").remove();
            $(this).parent().append(checkedIcon);
            changeToutu(this)
        });
        $(".third_img img").on("click", function(event) {
            event.preventDefault();
            window.clickLog && window.clickLog("from=post-jianli-disanfangclick");
            $(".cancel").click();
            changeToutu(this)
        });
        $(".back_desc").on("click", function(event) {
            event.preventDefault();
            $("#img_preview").addClass("hide")
        });
        $("#change_toutu").on("click", function(event) {
            event.preventDefault();
            window.clickLog && window.clickLog("from=post-jianli-touxiangchange");
            $("#img_preview").addClass("hide");
            $("#overlay").removeClass("hide");
            $(".upload_toutu_type").slideUp("fast")
        })
    });
    function changeToutu(event) {
        var iconUrl = $(event).attr("src");
        toutuStr = '<li class="upload_item" id="imgShow1" style="background:url(' + iconUrl + ') center center / cover">' + '<img src="' + iconUrl + '" class="upload_image" />' + '<input type="file" accept="image/jpg,image/jpeg,image/png,image/gif" id="fileUpload" class="fileImage" name="">' + "</li>";
        $("#toutu_list").html(toutuStr);
        $(".uploadHead_tip").addClass("hide");
        $(".upload_toutu").addClass("hide");
        $("#picture").attr("src", iconUrl.replace("_126.png", "_200.png"));
        checkChange()
    }
    function checkChange() {
        if (!$(".toutu_list .upload_item").hasClass("loading_item")) {
            $(".upload_success").removeClass("hide");
            setTimeout(function() {
                $(".upload_success").addClass("hide")
            }, 2e3)
        }
    }
    $.fn.slideUp = function(duration) {
        var position = this.css("position");
        this.show();
        this.css({
            position: "absolute",
            visibility: "hidden"
        });
        var height = this.height();
        this.css({
            position: position,
            visibility: "visible",
            overflow: "hidden",
            bottom: -height
        });
        this.animate({
            bottom: 0
        }, duration)
    }
    ;
    $.fn.slideDown = function(duration) {
        var position = this.css("position");
        this.show();
        this.css({
            position: "absolute",
            visibility: "hidden"
        });
        var height = this.height();
        this.css({
            position: position,
            visibility: "visible",
            overflow: "hidden",
            bottom: 0
        });
        this.animate({
            bottom: -height
        }, duration)
    }
});
define("mod/job/util.stringUtils", [], function() {
    var Utility = {
        json2str: function(obj) {
            var S = [];
            for (var i in obj) {
                obj[i] = typeof obj[i] == "string" ? '"' + obj[i] + '"' : typeof obj[i] == "object" ? Utility.json2str(obj[i]) : obj[i];
                S.push(i + ":" + obj[i])
            }
            return "{" + S.join(",") + "}"
        },
        trimJS: function(str) {
            str = Utility.replacestr(str, "<", "&lt;");
            str = Utility.replacestr(str, ">", "&gt;");
            return str
        },
        replacestr: function(source, obj, target) {
            var reg = new RegExp(obj,"g");
            return source.replace(reg, target)
        },
        repLaceData: function(source) {
            if (source != "") {
                source = Utility.replacestr(source, "'", "");
                return source.replace(/]]>/g, "")
            } else {
                return ""
            }
        },
        encodeTxtBox: function(oriSource) {
            if (oriSource != null && oriSource.trim().length > 0) {
                oriSource = Utility.trimJS(oriSource);
                oriSource = oriSource.replace(" ", "&nbsp;")
            }
            return oriSource
        }
    };
    return Utility
});
define("mod/job/core.SimpleXhrFactory", [], function() {
    var SimpleXhrFactory = function() {
        var otherBrowser = {
            createXhrObject: function() {
                return new XMLHttpRequest
            }
        };
        var testObj;
        try {
            testObj = otherBrowser.createXhrObject();
            return otherBrowser
        } catch (err) {}
    }();
    return SimpleXhrFactory
});
define("mod/job/core.StringBuffer", [], function() {
    function StringBuffer() {
        this.__strings__ = []
    }
    StringBuffer.prototype.append = function(str) {
        this.__strings__.push(str)
    }
    ;
    StringBuffer.prototype.toString = function() {
        return this.__strings__.join("")
    }
    ;
    return StringBuffer
});
define("mod/job/util.xmlPost", ["./core.StringBuffer"], function(StringBuffer) {
    var xmlPost = function(jsonObjs, callback, xmlHttp, operate) {
        xmlHttp.onreadystatechange = callback;
        var sb = new StringBuffer;
        sb.append('<?xml version="1.0" encoding="UTF-8"?>');
        sb.append("<sendinfo>");
        sb.append("<operate>" + operate + "</operate>");
        $.each(jsonObjs, function(key, value) {
            if (key.indexOf("_") !== 0) {
                sb.append("<" + key + ">");
                if (typeof value == "string" && isNaN(value)) {
                    sb.append("<![CDATA[" + value + "]]>")
                } else {
                    sb.append(value)
                }
                sb.append("</" + key + ">")
            }
        });
        sb.append("</sendinfo>");
        var url = "//jianli.m.58.com/ajax/m_addnewresume";
        xmlHttp.open("POST", url, true);
        xmlHttp.setRequestHeader("Conent-Type", "text/xml");
        xmlHttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xmlHttp.send(sb.toString())
    };
    $.xmlPost = xmlPost;
    return xmlPost
});
define("mod/job/busi.resume.Highlights", [], function() {
    var Highlights = function() {
        return {
            pushad: function(type) {
                var seed = Math.random();
                $.ajax({
                    type: "get",
                    url: "//jianli.m.58.com/ajax/gethighlights",
                    data: {
                        rid: $("#hidresume").val(),
                        t: type,
                        time: seed
                    },
                    success: function(data) {}
                })
            }
        }
    }();
    return Highlights
});
define("mod/job/config.resume.postCommon", ["./util.stringUtils", "../common/util", "../common/global"], function(Utility, util, global) {
    var isShowCode = global.isShowCode;
    var spm = global.spm;
    var city = global.city;
    var utm_source = global.utm_source;
    var source_from = global.source_from;
    var source_id = global.source_id;
    var iqas_mcresult = global.iqas_mcresult;
    var wxlottery = global.wxlottery;
    var getPostConfig = function(callback) {
        var code = "";
        var trueName = Utility.repLaceData($("#txtUserName").val());
        var sex = $("[name='sexType']:checked").val();
        if (typeof sex == "undefined") {
            sex = 0
        }
        var year = $("#year").val();
        var birthday = year + "-1-1" + " 13:01:01";
        var workyears = $("#selWorked").val();
        var usermobile = Utility.repLaceData($("#phone").val().trim().replace(/\s+/g, ""));
        var areaId = $("#citys").val() || 0;
        var userJob = $("#jobs").val() || 0;
        var lights = "";
        var userNative = "0";
        var email = "0";
        var usercity = "0";
        var from = source_from;
        var sourceid = source_id;
        var valicode = $("#valicode").val() || "";
        if (typeof source_from == "undefined" || source_from === "") {
            from = "null"
        }
        if (typeof source_id == "undefined" || source_id === "") {
            sourceid = ""
        }
        var jobSalary = 0;
        var usereducation = -1;
        if (from == "null" || from == "busresume_wx") {
            jobSalary = $("#jobSalary").val();
            usereducation = $("#selEducation").val()
        }
        var myutm_source = utm_source;
        if (typeof utm_source == "undefined" || utm_source === "") {
            myutm_source = "null"
        }
        var myspm = spm;
        if (typeof spm == "undefined" || spm === "") {
            myspm = "null"
        }
        var mycity = city;
        if (typeof city == "undefined" || city === "") {
            mycity = "null"
        }
        var pstfrom = $("#pstfrom").val();
        if (typeof pstfrom == "undefined" || pstfrom === "") {
            pstfrom = 0
        }
        if (typeof wxlottery != "undefined" && wxlottery > 0) {
            pstfrom = 23
        }
        var isAutoRefresh = true;
        if (isAutoRefresh) {
            clickLog("from=M_JLpost_shuaxinToclick")
        }
        var picUrl = "";
        var $postfrom = $("#postfrom");
        var postfrom = $postfrom.size() > 0 ? $postfrom.val() : "";
        var postJsonObj = {
            resumeid: $("#hidresume").val(),
            birthday: birthday,
            truename: trueName,
            sex: sex,
            workyears: workyears,
            usereducation: usereducation,
            usermobile: usermobile,
            usercity: usercity,
            letter: lights,
            areaid: areaId,
            disCateIds: userJob,
            salary: jobSalary,
            position: userJob,
            authCode: valicode,
            mathresult: iqas_mcresult,
            iqasinvc: isShowCode,
            validatecode: code,
            "native": userNative,
            pstfrom: pstfrom,
            sourcefrom: from,
            utm_source: myutm_source,
            spm: myspm,
            city: mycity,
            sourceid: sourceid,
            autorefresh: isAutoRefresh,
            email: email,
            postfrom: postfrom,
            picUrl: picUrl
        };
        if ($(".upload_item").length !== 0) {
            var toutu = $("#toutu_list .upload_item:not(.loading_item)>img");
            if (toutu.length !== 0) {
                picUrl += toutu.attr("src");
                window.clickLog && window.clickLog("from=post-jianli-zhaopiansuccess")
            }
            if ($(".loading_item").length) {
                util.alertShow("图片未完成上传，是否停止上传图片完成发布", 2, "立即发布", "完成上传", function() {
                    util.alertShow("正在保存中", undefined, "", "", "", "");
                    postJsonObj.picUrl = picUrl;
                    if ("function" === typeof callback)
                        callback(postJsonObj)
                }, function() {
                    util.cancel_but()
                })
            } else {
                util.alertShow("正在保存中", undefined, "", "", "", "");
                postJsonObj.picUrl = picUrl;
                if ("function" === typeof callback)
                    callback(postJsonObj)
            }
        } else {
            util.alertShow("正在保存中", undefined, "", "", "", "");
            if ("function" === typeof callback)
                callback(postJsonObj)
        }
    };
    return getPostConfig
});
define("mod/job/util.urlSearch", [], function() {
    var loc = window.location;
    var search = loc.search;
    var reQueryAll = /([^=&?]+)=([^=&?]*)/g;
    return {
        query: function(name) {
            var reQuery, matches, cache;
            if (!search) {
                return null
            }
            reQuery = new RegExp(name + "=([^=&?]*)","g");
            cache = [];
            while (matches = reQuery.exec(search)) {
                cache.push(decodeURIComponent(matches[1]))
            }
            if (cache.length) {
                return cache.length === 1 ? cache[0] : cache
            }
            return null
        },
        queryAll: function() {
            var matches, key, value;
            var params = {};
            if (!search) {
                return null
            }
            while (matches = reQueryAll.exec(search)) {
                key = matches[1];
                value = decodeURIComponent(matches[2]);
                if (!params[key]) {
                    params[key] = value
                } else {
                    if (!Array.isArray(params[key])) {
                        params[key] = [params[key], value]
                    } else {
                        params[key].push(value)
                    }
                }
            }
            return params
        }
    }
});
define("mod/job/api.resume.postPrivacy", [], function() {
    var postPrivacy = function() {
        var companyID = $("#industryId").val()
          , industryID = $("#companyLookId").val();
        if (companyID == undefined) {
            companyID = ""
        }
        if (industryID == undefined) {
            industryID = ""
        }
        var postPrivacyStr = "showStatus=" + industryID + "&blockIndustry=" + companyID;
        console.log(postPrivacyStr + "yinsi");
        $.ajax({
            url: "//jianli.m.58.com/userprivacy/postprivacy",
            type: "post",
            async: false,
            data: postPrivacyStr,
            success: function(data) {
                if (!data.code) {
                    console.log("chenggong")
                }
            },
            error: function(e) {
                console.log(e)
            }
        })
    };
    return postPrivacy
});
define("mod/job/busi.resume.postCommon", ["../common/global", "./util.stringUtils", "./core.SimpleXhrFactory", "./util.xmlPost", "./busi.resume.Highlights", "./job_rd_util", "./config.resume.postCommon", "./util.urlSearch", "../common/util", "./api.resume.postPrivacy"], function(global, Utility, SimpleXhrFactory, xmlPost, Highlights, rd_util, getPostConfig, urlSearch, util, postPrivacy) {
    var isShowCode = global.isShowCode;
    var isMicroMsg = global.isMicroMsg;
    var isUnion = global.isUnion;
    var _jlRootDomain = rd_util.jldomain;
    var wxlottery = global.wxlottery;
    var urlMes = urlSearch.queryAll() || {};
    var to_resumelist = function() {
        cancel_but();
        document.location.href = "//" + _jlRootDomain + "/m_resumelist/?t=" + (new Date).valueOf()
    };
    var BasicResumeInfo = function() {
        var xmlHttp;
        var postJsonObj;
        var successUrl;
        return {
            addmoreSuccess: function() {
                if (xmlHttp.readyState == 4) {
                    if (xmlHttp.status == 200) {
                        util.cancel_but();
                        window.clickLog && window.clickLog("from=m_resume_post_success");
                        if (xmlHttp.responseText.indexOf("error:") != -1) {
                            var msg = xmlHttp.responseText.split(":")[1];
                            if (msg == "validatecode") {
                                $("#rsm_create").show();
                                $(".photos").show();
                                $(".loginDiv").hide();
                                $(".r_tle").html("只要30秒，快速填写求职信息！");
                                $("#codeshow").css("display", "block");
                                isShowCode = 1;
                                return
                            }
                            if (msg == "sensitive") {
                                var id = xmlHttp.responseText.split(":")[2];
                                $("#hidresume").val(id);
                                Highlights.pushad(1);
                                successUrl = "//" + _jlRootDomain + "/m_perfectresume?rid=" + id + "&authType=1";
                                if (isMicroMsg) {
                                    document.location.href = successUrl
                                } else if (isUnion) {
                                    var templateId = urlMes.code || 20;
                                    util.alertShow("创建成功！快去找好工作吧！", "1", "确定", "", function() {
                                        urlMes.from = urlMes.from || "//" + _jlRootDomain + "/m_finishcommonresumev2/?rid=" + id + "&-15=" + templateId;
                                        document.location.href = urlMes.from
                                    }, "")
                                } else {
                                    document.location.href = successUrl
                                }
                                return
                            }
                            util.alertShow(msg, "1", "确定", "", util.cancel_but, "")
                        } else if (xmlHttp.responseText != "0") {
                            $("#hidresume").val(xmlHttp.responseText);
                            try {
                                postPrivacy()
                            } catch (error) {
                                console.log("接口报错")
                            }
                            Highlights.pushad(1);
                            successUrl = "//" + _jlRootDomain + "/m_perfectresume?rid=" + xmlHttp.responseText + "&authType=1";
                            if (typeof wxlottery != "undefined" && wxlottery > 0) {
                                document.location.href = "//" + _jlRootDomain + "/microresumedeliveryfinish/?wxlottery=" + wxlottery + "&itype=0&rid=" + xmlHttp.responseText
                            } else if (isMicroMsg) {
                                document.location.href = successUrl
                            } else if (isUnion) {
                                var templateId = urlMes.code || 20;
                                urlMes.from = urlMes.from || "//" + _jlRootDomain + "/m_finishcommonresumev2/?rid=" + id + "&-15=" + templateId;
                                document.location.href = unescape(decodeURIComponent(urlMes.from))
                            } else if (urlMes.postsource && urlMes.postsource === "detail" || urlMes.postsource === "list") {
                                util.alertShow("创建成功！快去找好工作吧！", "1", "确定", "", function() {
                                    document.location.href = "//" + urlMes.url
                                }, "")
                            } else {
                                var isHidden = $("#chrTxt").attr("isHidden");
                                var rid = xmlHttp.responseText;
                                if (isHidden === "false") {
                                    var chrSendPush = 0;
                                    if (document.getElementById("chr").checked) {
                                        chrSendPush = 1;
                                        var url = "//jianli.58.com/chr/ajax/pushresource?callback=?&rid=" + rid;
                                        $.ajax({
                                            type: "get",
                                            dataType: "jsonp",
                                            url: url,
                                            success: function(data) {
                                                successUrl = successUrl + "&poptype=1"
                                            }
                                        })
                                    }
                                }
                                document.location.href = successUrl
                            }
                        } else {
                            $("#rsm_create").show();
                            $(".photos").show();
                            $(".loginDiv").hide();
                            $(".r_tle").html("只要30秒，快速填写求职信息！");
                            util.alertShow("简历创建失败!", "1", "确定", "", util.cancel_but, "")
                        }
                    }
                }
            },
            submitForm: function(obj) {
                global.opObj = obj;
                $(obj).attr("disabled", "disabled");
                setTimeout(function() {
                    $(obj).removeAttr("disabled")
                }, 1e3);
                this.subForm()
            },
            subForm: function() {
                var chr = $("#chr").filter(":checked").length;
                if (chr == 1) {
                    window.clickLog && window.clickLog("from=chr-post-tbdchr-m")
                } else {
                    window.clickLog && window.clickLog("from=chr-post-btbdchr-m")
                }
                if ($("#hidresume").val() !== "0") {
                    util.alertShow("想再次修改这封简历？您可以在简历管理页面继续完善哦！", "2", "确定", "取消", function() {
                        window.location.href = "//jianli.m.58.com/m_resumelist/"
                    }, util.cancel_but);
                    return false
                }
                xmlHttp = SimpleXhrFactory.createXhrObject();
                getPostConfig(function(postJsonObj) {
                    $.xmlPost(postJsonObj, BasicResumeInfo.addmoreSuccess, xmlHttp, "basicresume")
                })
            }
        }
    }();
    return BasicResumeInfo
});
define("mod/job/busi.resume.syncSelectText", [], function() {
    var syncSelectText = function() {
        var setSelectIndex = function() {
            if (this.options[this.selectedIndex].text.indexOf("-") > 3 || this.options[this.selectedIndex].text == "1000以下" || this.options[this.selectedIndex].text == "25000以上") {
                if ($(this.options[this.selectedIndex]).val() !== "-1") {
                    $(this).parent().find(".fl").html(this.options[this.selectedIndex].text + "元/月")
                }
            } else {
                if ($(this.options[this.selectedIndex]).val() !== "-1") {
                    $(this).parent().find(".fl").html(this.options[this.selectedIndex].text)
                }
            }
        };
        $("select").bind("change", function(e) {
            var $t = $(this);
            $t.removeClass("c_i");
            $t.parent(".rc_go").removeClass("c_i")
        });
        $(".sel_txt2").one("click", function(e) {
            setSelectIndex.call(this, e)
        });
        $(".sel_txt2").bind("change", function(e) {
            setSelectIndex.call(this, e)
        });
        $("select").each(function() {
            var $t = $(this), $text = $t.parent(".rc_go").find("span"), text = "", selectedText = "", isValid, selectedIndex;
            if ($text.size() > 0) {
                text = $text.text().trim();
                this.placeholder = text
            } else {
                return true
            }
            isValid = [].some.call(this.options, function(option, idx) {
                if (text === option.innerHTML) {
                    selectedIndex = idx;
                    return true
                }
                return false
            });
            if (text && isValid && text.indexOf("请选择") === -1) {
                this.selectedIndex = selectedIndex;
                $t.parent().removeClass("c_i")
            } else {
                this.selectedIndex = 0;
                $t.parent().addClass("c_i")
            }
            selectedText = this.placeholder;
            $t.closest(".rc_go").find("span.fl").text(selectedText)
        })
    };
    return syncSelectText
});
define("mod/job/busi.resume.birthYear", [], function() {
    var init_year = function(elem, birthYear) {
        birthYear = birthYear || (new Date).getFullYear;
        var options = "<option disabled='disabled' readonly='true' value='-1'>请选择您的出生年份</option>";
        var nowYear = (new Date).getFullYear();
        var startYear = nowYear - 16;
        var endYear = nowYear - 60;
        for (var year = startYear; year >= endYear; year--) {
            options += "<option value='" + year + (birthYear == year ? "' selected='selected'>" : "'>") + year + "</option>"
        }
        $(elem).html(options)
    };
    return init_year
});
define("mod/job/core.swipe", [], function() {
    var conSwipe = {
        doSwipe: function(obj) {
            var $ul = obj["list"];
            var y = obj["y"] || 0;
            $ul.on("touchstart", function(e) {
                this.startY = e.targetTouches[0].screenY;
                this.startTop = this.y || y;
                this.startTime = event.timeStamp;
                this.moved = false;
                this.scrollerHeight = this.offsetHeight;
                this.maxScrollY = obj["parent"][0].offsetHeight - this.scrollerHeight + 1;
                this._height = this._height || $(this).parent().height() - $(this).find("li").height() * $(this).find("li").length + 1;
                if (obj.isInteger) {
                    $(this).find(".selected").removeClass("selected")
                }
                if (this.isInTransition) {
                    var matrix = window.getComputedStyle(this, null);
                    matrix = matrix["webkitTransform"].split(")")[0].split(", ");
                    this.y = matrix[13] || matrix[5];
                    this.y = Math.round(this.y);
                    this.startTop = Math.round(this.y);
                    $(this).css({
                        "-webkit-transform": "translate3d(0," + this.y + "px, 0)",
                        "-webkit-transition-duration": "0"
                    });
                    this.isInTransition = false
                }
            });
            $ul.on("touchmove", function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.moved = true;
                this.y = e.targetTouches[0].screenY - this.startY + this.startTop;
                if (this.y > 0 || this.y < this.maxScrollY) {
                    var newY = this.y - (e.targetTouches[0].screenY - this.startY) * 2 / 3;
                    this.y = this.y > 0 ? 0 : this.maxScrollY;
                    if (newY > 0 || newY < this.maxScrollY) {
                        this.y = newY
                    }
                }
                $(this).css({
                    "-webkit-transform": "translate3d(0," + this.y + "px, 0)",
                    "-webkit-transition-duration": "0"
                });
                this.isInTransition = false;
                var timeStamp = event.timeStamp;
                if (timeStamp - this.startTime > 300) {
                    this.startTime = timeStamp;
                    this.startY = e.targetTouches[0].screenY;
                    this.startTop = this.y
                }
            });
            $ul.on("touchend", function(e) {
                var dist = e.changedTouches[0].screenY - this.startY;
                this.endTime = event.timeStamp;
                var duration = this.endTime - this.startTime;
                if (this.moved) {
                    e.preventDefault();
                    e.stopPropagation();
                    var newY = Math.round(e.changedTouches[0].screenY);
                    this.isInTransition = true;
                    if (this.y > 0 || this.y < this.maxScrollY) {
                        conSwipe.scrollTo(this, this.y, this.maxScrollY, 600, obj.isInteger);
                        return
                    }
                    if (duration < 300 || obj.isInteger) {
                        var move = conSwipe.calculateMoment(this.y, this.startTop, duration, this.maxScrollY, this.wrapH);
                        this.y = move.destination;
                        var time = move.duration;
                        if (obj.isInteger) {
                            this.y = Math.round(this.y / 30) * 30
                        }
                        $(this).css({
                            "-webkit-transform": "translate3d(0, " + this.y + "px, 0)",
                            "transition-timing-function": "cubic-bezier(0.1, 0.3, 0.5, 1)",
                            "-webkit-transition-duration": time + "ms"
                        })
                    }
                    if (obj.isInteger) {
                        if (time) {
                            $(this).one("webkitTransitionEnd", function() {
                                var pY = $(this).position().top;
                                var num = -(pY - 43 - 90) / 30;
                                $(this).find("li").eq(num).addClass("selected")
                            })
                        } else {
                            var pY = $(this).position().top;
                            var num = -(pY - 43 - 90) / 30;
                            $(this).find("li").eq(num).addClass("selected")
                        }
                    }
                    return
                } else {
                    if (obj.isInteger) {
                        this.y = this.y || e.changedTouches[0].screenY - this.startY + this.startTop;
                        if (this.y % 30) {
                            this.y = Math.round(this.y / 30) * 30;
                            $(this).css({
                                "-webkit-transform": "translate3d(0, " + this.y + "px, 0)",
                                "transition-timing-function": "cubic-bezier(0.1, 0.3, 0.5, 1)",
                                "-webkit-transition-duration": 0 + "ms"
                            })
                        }
                        var num = -(this.y - 90) / 30;
                        $(this).find("li").eq(num).addClass("selected");
                        return
                    }
                }
            })
        },
        scrollTo: function(obj, y, maxY, time, isInteger) {
            if (y > 0 || maxY > 0) {
                y = 0
            } else if (y < maxY) {
                y = maxY
            }
            if (isInteger) {
                y = Math.round(y / 30) * 30
            }
            obj.isInTransition = true;
            $(obj).css({
                "-webkit-transform": "translate3d(0, " + y + "px, 0)",
                "transition-timing-function": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                "-webkit-transition-duration": time + "ms"
            });
            if (isInteger) {
                $(obj).one("webkitTransitionEnd", function() {
                    var pY = $(obj).position().top;
                    var num = -(pY - 43 - 90) / 30;
                    $(obj).find("li").eq(num).addClass("selected")
                })
            }
        },
        calculateMoment: function(current, start, time, lowerMargin, wrapperSize) {
            var distance = current - start, speed = Math.abs(distance) / time, destination, duration;
            deceleration = 6e-4;
            destination = current + speed * speed / (2 * deceleration) * (distance < 0 ? -1 : 1);
            duration = speed / deceleration;
            if (destination < lowerMargin) {
                destination = wrapperSize ? lowerMargin - wrapperSize / 2.5 * (speed / 8) : lowerMargin;
                distance = Math.abs(destination - current);
                duration = distance / speed
            } else if (destination > 0) {
                destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
                distance = Math.abs(current) + destination;
                duration = distance / speed
            }
            return {
                destination: Math.round(destination),
                duration: duration
            }
        },
        initPos: function(obj) {
            var $ul = obj["list"];
            var moveNum = obj["num"];
            var y = -moveNum * 30;
            var selectObj = $ul.find(".selected");
            selectObj.length && selectObj.removeClass("selected");
            $ul.find("li").eq(moveNum + 3).addClass("selected");
            $ul.css({
                "-webkit-transform": "translate3d(0, " + y + "px, 0)",
                "transition-timing-function": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                "-webkit-transition-duration": 0 + "ms"
            })
        }
    };
    return conSwipe
});
define("mod/job/core.ListMove", [], function() {
    var ListMove = {
        moveX: 0,
        touch: function(id) {
            var obj = $(id);
            var startX, x = 0;
            var moveX = 0;
            var beforeLeft = obj.offset().left;
            obj.on("touchstart", function(event) {
                var touch = event.targetTouches[0];
                startX = touch.pageX;
                var transform = $(this).css("-webkit-transform");
                var translateX = parseInt(transform.split(/[(]|[,]|[)]/)[2], 10);
                x = translateX || ListMove.moveX
            });
            obj.on("touchmove", function(event) {
                event.preventDefault();
                var touch = event.targetTouches[0];
                ListMove.moveX = touch.pageX - startX + x;
                obj.css({
                    "-webkit-transition-duration": "0",
                    "-webkit-transform": "translate3d(" + ListMove.moveX + "px,0, 0)"
                })
            });
            obj.on("touchend", function(event) {
                ListMove.initPos(obj)
            })
        },
        initPos: function(id, type) {
            var obj = $(id);
            var afterLeft = obj.offset().left;
            var afterRight = obj.offset().right;
            var parentW = obj.parent().width();
            var thisW = obj.width();
            type = type || null;
            if (thisW > parentW) {
                if (parentW - thisW > ListMove.moveX || type == "end") {
                    ListMove.moveX = -(thisW - parentW) - 10
                }
                if (ListMove.moveX > 0) {
                    ListMove.moveX = 0
                }
            } else {
                ListMove.moveX = 0
            }
            obj.css({
                "-webkit-transition-duration": "300ms",
                "-webkit-transform": "translate3d(" + ListMove.moveX + "px,0, 0)"
            })
        }
    };
    return ListMove
});
define("mod/job/util.popSelect", ["./core.swipe", "./core.ListMove", "../common/util"], function(conSwipe, ListMove, util) {
    var noop = function() {};
    var makeItem = function(value, text) {
        return '<li data-id="' + value + '"><span>' + text + '<i class="delBtn"></i></span></li>'
    };
    var findBubbledLi = function(elem) {
        if (elem.tagName.toUpperCase() === "UL")
            return null;
        if (elem.tagName.toUpperCase() === "LI")
            return elem;
        return findBubbledLi(elem.parentNode)
    };
    var popSelect = {};
    popSelect.init = function(options, getDataFunc, getSubDataFunc) {
        var menu = new Menu(null,options);
        popSelect.instances.push(menu);
        return menu
    }
    ;
    popSelect.destroy = function(menu) {
        var index = popSelect.instances.indexOf(menu);
        popSelect.instances.splice(index, 1);
        menu.destroy();
        menu = null
    }
    ;
    popSelect.instances = [];
    var getDataFunc = function(handle) {
        handle([])
    };
    var getSubDataFunc = function(value, data, handle) {
        var subData = [];
        try {
            subData = data.filter(function(item) {
                return item.id.toString() === value.toString()
            })[0][value]
        } catch (err) {}
        handle(subData)
    };
    var defaults = {
        id: "",
        maxSize: 5,
        selectNum: 0,
        enableMulti: false,
        hasSubMenu: false,
        enableCancel: true,
        getDataFunc: getDataFunc,
        getSubDataFunc: getSubDataFunc,
        placeholder: "不能超过{maxSize}个！",
        maxTip: "不能超过{maxSize}个！",
        maxSizeLog: "",
        isHeader: true,
        defaultSelect: []
    };
    var Menu = function(elem, options) {
        options = $.extend({}, defaults, options);
        this.state = "none";
        this.selected = options.defaultSelect;
        this.parentId = -1;
        this.$input = $(options.input);
        this.$text = $(options.text);
        this.$button = $(options.button);
        this.$elem = $(elem);
        this.$mask = null;
        this.$container = null;
        this.$header = null;
        this.$area = null;
        this.$main = null;
        this.$list = null;
        this.$subList = null;
        this.data = null;
        this.subData = null;
        this.options = options;
        this.options.placeholder = this.options.placeholder.replace("{maxSize}", this.options.maxSize);
        this.options.maxTip = this.options.maxTip.replace("{maxSize}", this.options.maxSize);
        this.init()
    };
    Menu.EVENTS = {
        DATA: "menu_data",
        ERROR: "menu_error",
        CREATE: "menu_create",
        SELECT: "menu_select",
        CHANGE: "menu_change",
        SHOW: "menu_show",
        HIDE: "menu_hide"
    };
    Menu.prototype = {
        constructor: Menu,
        init: function() {
            var _t = this
              , getDataFunc = _t.options.getDataFunc
              , getInitialFunc = _t.options.getInitialFunc
              , initialValue = _t.$input.val()
              , selectedValues = [];
            if (_t.$elem.size() > 0) {
                _t.adjust()
            } else {
                $("body").append(_t.create(_t.options.isHeader))
            }
            _t.$elem.trigger(new Event(Menu.EVENTS.CREATE));
            if (initialValue)
                selectedValues = initialValue.split(",");
            if (typeof getDataFunc === "function") {
                getDataFunc(function(data) {
                    _t.data = data;
                    _t.$elem.trigger(new Event(Menu.EVENTS.DATA));
                    _t.setInitialSelect(selectedValues);
                    _t.createList(_t.selected)
                })
            } else {
                _t.data = getDataFunc;
                _t.createList(_t.selected)
            }
            conSwipe.doSwipe({
                list: _t.$list.find("ul"),
                parent: _t.$list
            });
            conSwipe.doSwipe({
                list: _t.$subList.find("ul"),
                parent: _t.$subList
            });
            _t.$button.on("click", function(e) {
                _t.show()
            });
            _t.$mask.on("click", function(e) {
                _t.hide()
            });
            _t.$header.find("a").on("click", function(e) {
                _t.hide()
            });
            _t.$list.on("click", function(e) {
                if (_t.options.hasSubMenu) {
                    _t.select(findBubbledLi(e.target))
                } else {
                    _t.select(findBubbledLi(e.target), true)
                }
            });
            _t.$subList.on("click", function(e) {
                _t.select(findBubbledLi(e.target), true)
            });
            if (_t.options.enableMulti) {
                ListMove.touch(_t.$area.find("ul"));
                _t.$area.on("click", "li", function(e) {
                    var $t = $(this)
                      , $item = $t.closest("li")
                      , dataId = $item.data("id");
                    $item.remove();
                    _t.$subList.find("li").filter('[data-id="' + dataId + '"]').removeClass("select");
                    _t.removeSelected(dataId)
                })
            }
        },
        create: function(isHeader) {
            var _t = this;
            var num = _t.options.maxSize - _t.options.selectNum;
            _t.$elem = $('<div class="popupWin" style="display: none;"></div');
            _t.$mask = $('<div class="popupBg"></div>');
            _t.$container = $('<div class="popupCon"></div>');
            _t.$header = $('<div class="popupHeader"><a href="javascript:void(0);">完成</a></div>');
            _t.$message = $('<span class="proMessage">还可以选择<i class="selectNum">' + _t.options.maxSize + "</i>项</span>");
            _t.$area = _t.options.enableMulti ? $('<div class="selectArea"><div class="pro_mes">' + _t.options.placeholder + "</div><ul></ul></div>") : "";
            _t.$main = $('<div class="popupMain"></div>');
            _t.$list = $('<div class="conLeft"><ul></ul></div>');
            _t.$subList = $('<div class="conRight" style="display: none;"><ul></ul></div>');
            _t.$elem.attr("id", _t.options.id).addClass(_t.options.className);
            _t.$elem.append(_t.$mask).append(_t.$container);
            _t.$header.prepend(_t.$message);
            if (isHeader) {
                _t.$container.append(_t.$header);
                _t.$container.append(_t.$area)
            }
            _t.$container.append(_t.$main);
            _t.$main.append(_t.$list, _t.$subList);
            return _t.$elem
        },
        adjust: function() {
            var _t = this;
            _t.$mask = _t.$elem.find(".popupBg");
            _t.$container = _t.$elem.find(".popupCon");
            _t.$header = _t.$container.find(".popupHeader");
            if (_t.options.enableMulti)
                _t.$area = _t.$container.find(".selectArea");
            _t.$main = _t.$container.find(".popupMain");
            _t.$list = _t.$main.find(".conLeft");
            _t.$subList = _t.$main.find(".conRight")
        },
        createList: function() {
            var _t = this
              , html = ""
              , parentId = ""
              , selectedValues = []
              , getSubDataFunc = _t.options.getSubDataFunc;
            selectedValues = _t.selected.map(function(item) {
                return item[_t.options.hasSubMenu ? "parent" : "id"].toString()
            });
            html = _t.data.map(function(item, idx) {
                if (selectedValues.length > 0) {
                    if (_t.options.hasSubMenu) {
                        return '<li data-id="' + item.id + (selectedValues.indexOf(item.id.toString()) > -1 ? '" class="selected">' : '">') + item.name + "</li>"
                    } else {
                        return '<li data-id="' + item.id + (selectedValues.indexOf(item.id.toString()) > -1 ? '" class="select">' : '">') + (_t.options.enableMulti ? '<span class="checkItem"><i class="icon"></i></span>' : "") + item.name + "</li>"
                    }
                } else {
                    return '<li data-id="' + item.id + (idx === 0 ? '" class="selected">' : '">') + item.name + "</li>"
                }
            }).join("");
            _t.$list.find("ul").append($(html));
            if (_t.options.hasSubMenu && _t.selected.length > 0) {
                parentId = _t.selected[0].parent;
                if (!_t.options.enableMulti) {
                    _t.$list.addClass("showRight");
                    _t.$subList.show();
                    getSubDataFunc(parentId, _t.data, function(subData) {
                        _t.subData = subData;
                        if (subData.length === 0) {
                            _t.$list.removeClass("showRight");
                            _t.$subList.hide();
                            _t.setSelected()
                        }
                        _t.createSubList()
                    })
                }
            }
        },
        createSubList: function() {
            var _t = this
              , html = ""
              , selectedValues = _t.selected.map(function(subItem) {
                return subItem.id.toString()
            })
              , $ul = _t.$subList.find("ul");
            html = _t.subData.map(function(item, idx) {
                return '<li data-id="' + item.id + (selectedValues.indexOf(item.id.toString()) > -1 ? '" class="select">' : '">') + (_t.options.enableMulti ? '<span class="checkItem"><i class="icon"></i></span>' : "") + item.name + "</li>"
            }).join("");
            $ul.hide().css({
                "-webkit-transform": "translate3d(0, 0, 0)",
                "-webkit-transition-duration": "0ms"
            });
            $ul.empty().append($(html)).show()
        },
        setInitialSelect: function(selected) {
            var _t = this;
            var selectedArray = [];
            if (_t.options.hasSubMenu) {
                _t.data.forEach(function(item) {
                    var id = item.id.toString();
                    var snippet = [];
                    snippet = item[id].filter(function(subItem) {
                        return selected.indexOf(subItem.id.toString()) > -1
                    }).map(function(subItem) {
                        return {
                            id: subItem.id.toString(),
                            name: subItem.name,
                            parent: id
                        }
                    });
                    selectedArray = selectedArray.concat(snippet)
                });
                _t.selected = selectedArray;
                if (_t.options.enableMulti) {
                    selectedArray.forEach(function(item) {
                        _t.appendAreaItem(item.id, item.name)
                    })
                }
            } else {
                if (_t.options.enableMulti) {
                    _t.selected.forEach(function(item) {
                        _t.appendAreaItem(item.id, item.name)
                    })
                }
            }
        },
        show: function() {
            var _t = this;
            _t.state = "shown";
            _t.$elem.show();
            _t.$elem.trigger(new Event(Menu.EVENTS.SHOW));
            _t.$input.trigger(new Event("focus"));
            _t.scrollToSelected(_t.$list, true);
            _t.scrollToSelected(_t.$subList);
            _t.scrollToSelected = noop
        },
        hide: function() {
            var _t = this;
            _t.state = "hidden";
            _t.$elem.hide();
            _t.$elem.trigger(new Event(Menu.EVENTS.HIDE));
            _t.$input.trigger(new Event("blur"))
        },
        select: function(elem, isSub) {
            var _t = this
              , $el = $(elem)
              , getSubDataFunc = _t.options.getSubDataFunc
              , dataId = $el.data("id")
              , isSelected = $el.hasClass("select")
              , text = $el.text();
            if (!isSub) {
                _t.$list.addClass("showRight").find("li").removeClass("selected");
                _t.$subList.show();
                $el.addClass("selected");
                _t.parentId = dataId;
                if (_t.options.hasSubMenu) {
                    if (typeof getSubDataFunc === "function") {
                        getSubDataFunc(dataId, _t.data, function(subData) {
                            _t.subData = subData;
                            if (subData.length === 0) {
                                _t.$list.removeClass("showRight");
                                _t.$subList.hide();
                                _t.setSelected()
                            }
                            _t.createSubList(_t.selected)
                        })
                    }
                }
            } else {
                if (!_t.options.enableCancel) {
                    if (isSelected)
                        return false
                }
                if (!_t.options.enableMulti) {
                    $el.siblings().removeClass("select");
                    $el.addClass("select");
                    _t.setSelected(dataId, text);
                    _t.$elem.trigger(new Event(Menu.EVENTS.SELECT));
                    _t.hide()
                } else {
                    if (isSelected) {
                        $el.removeClass("select");
                        _t.removeSelected(dataId)
                    } else {
                        if (_t.setSelected(dataId, text)) {
                            $el.addClass("select")
                        }
                    }
                    _t.$elem.trigger(new Event(Menu.EVENTS.SELECT))
                }
            }
        },
        setSelected: function(value, text) {
            var _t = this
              , selectedObj = {}
              , selectedText = ""
              , selectedValue = "";
            selectedObj.id = value;
            selectedObj.name = text;
            if (_t.options.hasSubMenu)
                selectedObj.parent = _t.parentId;
            if (_t.options.enableMulti) {
                if (_t.selected.length >= _t.options.maxSize) {
                    util.alertShow(_t.options.maxTip);
                    if (_t.options.maxSizeLog) {
                        window.clickLog && window.clickLog("from=" + _t.options.maxSizeLog)
                    }
                    setTimeout(util.cancel_but, 1e3);
                    return false
                } else {
                    _t.selected.push(selectedObj);
                    _t.appendAreaItem(value, text);
                    selectedText = _t.selected.map(function(item) {
                        return item.name
                    }).join(" ");
                    selectedValue = _t.selected.map(function(item) {
                        return item.id
                    });
                    _t.setText(selectedText);
                    _t.setInput(selectedValue);
                    _t.$elem.trigger(new Event(Menu.EVENTS.CHANGE));
                    return true
                }
            } else {
                _t.selected[0] = selectedObj;
                _t.setText(text);
                _t.setInput(value);
                _t.$elem.trigger(new Event(Menu.EVENTS.CHANGE));
                return true
            }
        },
        removeSelected: function(value) {
            var _t = this
              , index = -1
              , selectedText = ""
              , selectedValue = "";
            value += "";
            if (_t.options.enableMulti) {
                _t.selected.forEach(function(item, idx) {
                    if (item.id == value) {
                        index = idx
                    }
                });
                if (index === -1)
                    return false;
                _t.selected.splice(index, 1);
                _t.removeAreaItem(value);
                selectedText = _t.selected.map(function(item) {
                    return item.name
                }).join(" ");
                selectedValue = _t.selected.map(function(item) {
                    return item.id
                });
                _t.setText(selectedText);
                _t.setInput(selectedValue);
                _t.$elem.trigger(new Event(Menu.EVENTS.CHANGE))
            } else {
                _t.selected = [];
                _t.setText("");
                _t.setInput("");
                _t.$elem.trigger(new Event(Menu.EVENTS.CHANGE))
            }
        },
        setText: function(text) {
            var _t = this;
            _t.$text.text(text)
        },
        setInput: function(value) {
            var _t = this;
            _t.$input.val(value)
        },
        scrollToSelected: function($list, isParent) {
            var _t = this
              , dataId = 0
              , $el = null
              , offsetTop = 0
              , maxScrollY = $list.find("ul").get(0).offsetHeight - $list.get(0).offsetHeight;
            if (_t.selected.length === 0)
                return false;
            if (isParent) {
                dataId = _t.selected[0][_t.options.hasSubMenu ? "parent" : "id"]
            } else {
                dataId = _t.selected[0].id
            }
            $el = $list.find("li").filter('[data-id="' + dataId + '"]');
            if ($el.size() === 0)
                return false;
            offsetTop = Math.min($el.get(0).offsetTop, maxScrollY);
            $list.find("ul").css({
                "-webkit-transform": "translate3d(0, -" + offsetTop + "px, 0)",
                "-webkit-transition-duration": "0ms"
            }).attr("y", "-" + offsetTop)
        },
        appendAreaItem: function(value, text) {
            var _t = this;
            _t.$area.find("ul").append(makeItem(value, text));
            _t.options.selectNum = ++_t.options.selectNum;
            _t.$message.find(".selectNum").text(_t.options.maxSize - _t.options.selectNum);
            ListMove.initPos(_t.$area.find("ul"), "end");
            _t.$area.find(".pro_mes").hide()
        },
        removeAreaItem: function(value) {
            var _t = this
              , $el = _t.$area.find("li").filter('[data-id="' + value + '"]');
            $el.remove();
            _t.options.selectNum = --_t.options.selectNum;
            _t.$message.find(".selectNum").text(_t.options.maxSize - _t.options.selectNum);
            ListMove.initPos(_t.$area.find("ul"), "end");
            if (_t.selected.length === 0)
                _t.$area.find(".pro_mes").show();
            _t.$list.find("li").filter('[data-id="' + value + '"]').removeClass("select")
        }
    };
    return popSelect
});
define("mod/job/config.common.category", [], function() {
    var category = {};
    category.dataMap = {
        second: [{
            name: "销售",
            id: 13139
        }, {
            name: "客服",
            id: 13122
        }, {
            name: "人事/行政/后勤",
            id: 13126
        }, {
            name: "餐饮",
            id: 13136
        }, {
            name: "旅游",
            id: 38824
        }, {
            name: "酒店",
            id: 391123
        }, {
            name: "超市/百货/零售",
            id: 13803
        }, {
            name: "美容/美发",
            id: 13093
        }, {
            name: "保健按摩",
            id: 38829
        }, {
            name: "运动健身",
            id: 38830
        }, {
            name: "普工/技工",
            id: 13137
        }, {
            name: "生产管理/研发",
            id: 38825
        }, {
            name: "建筑",
            id: 13135
        }, {
            name: "物业管理",
            id: 38822
        }, {
            name: "房产中介",
            id: 38823
        }, {
            name: "家政保洁/安保",
            id: 13083
        }, {
            name: "司机",
            id: 13080
        }, {
            name: "物流/仓储",
            id: 13134
        }, {
            name: "贸易/采购",
            id: 13133
        }, {
            name: "汽车制造/服务",
            id: 13145
        }, {
            name: "淘宝职位",
            id: 38665
        }, {
            name: "美术/设计/创意",
            id: 38826
        }, {
            name: "市场/媒介/公关",
            id: 13125
        }, {
            name: "广告/会展/咨询",
            id: 13140
        }, {
            name: "娱乐/休闲",
            id: 13146
        }, {
            name: "教育培训",
            id: 13148
        }, {
            name: "财务/审计/统计",
            id: 13127
        }, {
            name: "法律",
            id: 13128
        }, {
            name: "翻译",
            id: 23197
        }, {
            name: "编辑/出版/印刷",
            id: 13147
        }, {
            name: "计算机/互联网/通信",
            id: 13129
        }, {
            name: "电子/电气",
            id: 13144
        }, {
            name: "机械/仪器仪表",
            id: 38828
        }, {
            name: "金融/银行/证券/投资",
            id: 23195
        }, {
            name: "保险",
            id: 13132
        }, {
            name: "医院/医疗/护理",
            id: 13141
        }, {
            name: "服装/纺织/食品",
            id: 24581
        }, {
            name: "环保",
            id: 24515
        }, {
            name: "制药/生物工程",
            id: 38827
        }, {
            name: "质控/安防",
            id: 24571
        }, {
            name: "高级管理",
            id: 13897
        }, {
            name: "农/林/牧/渔业",
            id: 24476
        }, {
            name: "其他职位",
            id: 13149
        }]
    };
    category.subData = {
        13139: [{
            name: "销售代表",
            id: 13349
        }, {
            name: "销售助理",
            id: 13350
        }, {
            name: "销售经理/主管",
            id: 13348
        }, {
            name: "销售总监",
            id: 23130
        }, {
            name: "电话销售",
            id: 13352
        }, {
            name: "销售支持",
            id: 13351
        }, {
            name: "汽车销售",
            id: 23115
        }, {
            name: "医药代表",
            id: 13384
        }, {
            name: "医疗器械销售",
            id: 23119
        }, {
            name: "网络销售",
            id: 23123
        }, {
            name: "区域销售",
            id: 13353
        }, {
            name: "渠道专员",
            id: 13354
        }, {
            name: "渠道经理/总监",
            id: 24412
        }, {
            name: "客户经理/主管",
            id: 13355
        }, {
            name: "大客户经理",
            id: 24413
        }, {
            name: "团购业务员/经理",
            id: 24416
        }, {
            name: "会籍顾问",
            id: 28712
        }],
        13122: [{
            name: "客服专员/助理",
            id: 13152
        }, {
            name: "客服经理/主管",
            id: 13151
        }, {
            name: "客服总监",
            id: 13150
        }, {
            name: "售前/售后服务",
            id: 13155
        }, {
            name: "电话客服",
            id: 13154
        }, {
            name: "客户关系管理",
            id: 13153
        }],
        13125: [{
            name: "市场专员/助理",
            id: 13180
        }, {
            name: "市场经理/总监",
            id: 23141
        }, {
            name: "市场拓展",
            id: 13189
        }, {
            name: "市场调研",
            id: 13181
        }, {
            name: "市场策划",
            id: 13182
        }, {
            name: "媒介专员/助理",
            id: 13186
        }, {
            name: "媒介经理/主管",
            id: 24429
        }, {
            name: "会务会展专员/经理",
            id: 13187
        }, {
            name: "品牌专员/经理",
            id: 13165
        }, {
            name: "公关专员/助理",
            id: 24431
        }, {
            name: "公关经理/主管",
            id: 24433
        }, {
            name: "企划经理/主管",
            id: 24435
        }],
        13126: [{
            name: "文员",
            id: 13196
        }, {
            name: "前台/总机/接待",
            id: 13198
        }, {
            name: "人事专员/助理",
            id: 13191
        }, {
            name: "人事经理/主管",
            id: 13190
        }, {
            name: "人事总监",
            id: 24418
        }, {
            name: "行政专员/助理",
            id: 23169
        }, {
            name: "行政经理/主管",
            id: 23173
        }, {
            name: "行政总监",
            id: 24420
        }, {
            name: "经理助理/秘书",
            id: 13197
        }, {
            name: "薪酬/绩效/员工关系",
            id: 13193
        }, {
            name: "猎头顾问",
            id: 23145
        }, {
            name: "后勤",
            id: 13200
        }, {
            name: "培训专员/助理",
            id: 24422
        }, {
            name: "培训经理/主管",
            id: 24424
        }, {
            name: "招聘专员/助理",
            id: 24426
        }, {
            name: "招聘经理/主管",
            id: 24608
        }],
        13127: [{
            name: "财务经理/主管",
            id: 24456
        }, {
            name: "财务总监",
            id: 13202
        }, {
            name: "会计/会计师",
            id: 13205
        }, {
            name: "财务/会计助理",
            id: 13204
        }, {
            name: "出纳",
            id: 13210
        }, {
            name: "审计专员/助理",
            id: 13208
        }, {
            name: "审计经理/主管",
            id: 24462
        }, {
            name: "统计员",
            id: 23181
        }, {
            name: "税务专员/助理",
            id: 23177
        }, {
            name: "税务经理/主管",
            id: 24471
        }, {
            name: "财务分析员",
            id: 13206
        }, {
            name: "成本管理员",
            id: 38857
        }],
        13128: [{
            name: "律师/法律顾问",
            id: 13215
        }, {
            name: "律师助理",
            id: 24474
        }, {
            name: "法务专员/主管",
            id: 13216
        }, {
            name: "产权/专利顾问",
            id: 23183
        }, {
            name: "合规管理",
            id: 23185
        }],
        13134: [{
            name: "物流专员/助理",
            id: 13280
        }, {
            name: "物流经理/主管",
            id: 13279
        }, {
            name: "物流总监",
            id: 24535
        }, {
            name: "调度员",
            id: 22435
        }, {
            name: "快递员",
            id: 13289
        }, {
            name: "仓库管理员",
            id: 13283
        }, {
            name: "仓库经理/主管",
            id: 24537
        }, {
            name: "装卸/搬运工",
            id: 13542
        }, {
            name: "供应链管理",
            id: 23153
        }, {
            name: "单证员",
            id: 23155
        }, {
            name: "国际货运",
            id: 28851
        }],
        13129: [{
            name: "技术总监/经理",
            id: 13222
        }, {
            name: "技术支持/维护",
            id: 13227
        }, {
            name: "技术专员/助理",
            id: 13235
        }, {
            name: "软件工程师",
            id: 13224
        }, {
            name: "程序员",
            id: 23543
        }, {
            name: "硬件工程师",
            id: 13223
        }, {
            name: "质量工程师",
            id: 23187
        }, {
            name: "测试工程师",
            id: 13234
        }, {
            name: "系统架构师",
            id: 13228
        }, {
            name: "数据库管理/DBA",
            id: 13225
        }, {
            name: "游戏设计/开发",
            id: 23189
        }, {
            name: "网页设计/制作",
            id: 13226
        }, {
            name: "语音/视频/图形",
            id: 13229
        }, {
            name: "项目经理/主管",
            id: 13167
        }, {
            name: "产品经理/专员",
            id: 13230
        }, {
            name: "网站运营",
            id: 23191
        }, {
            name: "网站编辑",
            id: 13231
        }, {
            name: "网站策划",
            id: 24567
        }, {
            name: "网络管理员",
            id: 13238
        }, {
            name: "网络与信息安全工程师",
            id: 23193
        }, {
            name: "实施工程师",
            id: 28726
        }, {
            name: "通信技术工程师",
            id: 13236
        }],
        13132: [{
            name: "保险经纪人",
            id: 13266
        }, {
            name: "储备经理人",
            id: 23176
        }, {
            name: "保险客户经理",
            id: 13264
        }, {
            name: "车险专员",
            id: 23163
        }, {
            name: "保险内勤",
            id: 23165
        }, {
            name: "保险培训师",
            id: 23172
        }, {
            name: "保险客服",
            id: 23168
        }, {
            name: "保险顾问",
            id: 23161
        }, {
            name: "保险项目经理",
            id: 23159
        }, {
            name: "保险精算师",
            id: 13263
        }, {
            name: "保险其他职位",
            id: 23179
        }],
        13133: [{
            name: "外贸专员/助理",
            id: 13270
        }, {
            name: "外贸经理/主管",
            id: 13269
        }, {
            name: "采购员",
            id: 13275
        }, {
            name: "采购助理",
            id: 24539
        }, {
            name: "采购经理/总监",
            id: 13274
        }, {
            name: "报关员",
            id: 13271
        }, {
            name: "商务专员/经理",
            id: 13273
        }, {
            name: "买手",
            id: 13276
        }],
        13135: [{
            name: "工程项目管理",
            id: 13314
        }, {
            name: "工程监理",
            id: 13313
        }, {
            name: "建筑工程师/总工",
            id: 13302
        }, {
            name: "土木/土建工程师",
            id: 13303
        }, {
            name: "造价师/预算师",
            id: 13312
        }, {
            name: "幕墙工程师",
            id: 13307
        }, {
            name: "安防工程师",
            id: 24573
        }, {
            name: "安全管理/安全员",
            id: 24575
        }, {
            name: "道路桥梁技术",
            id: 13304
        }, {
            name: "给排水/制冷/暖通",
            id: 13306
        }, {
            name: "测绘/测量",
            id: 13311
        }, {
            name: "园林/景观设计",
            id: 13310
        }, {
            name: "资料员",
            id: 24616
        }, {
            name: "市政工程师",
            id: 28734
        }, {
            name: "综合布线/弱电",
            id: 28736
        }],
        38822: [{
            name: "物业管理员",
            id: 13867
        }, {
            name: "物业维修",
            id: 13860
        }, {
            name: "物业经理/主管",
            id: 24577
        }, {
            name: "合同管理",
            id: 24579
        }, {
            name: "招商经理/主管",
            id: 24618
        }],
        38823: [{
            name: "房产经纪人",
            id: 13300
        }, {
            name: "置业顾问",
            id: 38858
        }, {
            name: "房产店员/助理",
            id: 38860
        }, {
            name: "房产店长/经理",
            id: 38859
        }, {
            name: "房产客服",
            id: 38861
        }, {
            name: "房产内勤",
            id: 38862
        }, {
            name: "房产评估师",
            id: 38863
        }, {
            name: "房地产开发/策划",
            id: 13296
        }, {
            name: "其他房产职位",
            id: 38864
        }],
        13136: [{
            name: "服务员",
            id: 13460
        }, {
            name: "送餐员",
            id: 36517
        }, {
            name: "厨师/厨师长",
            id: 13464
        }, {
            name: "后厨",
            id: 13471
        }, {
            name: "传菜员",
            id: 13463
        }, {
            name: "配菜/打荷",
            id: 13476
        }, {
            name: "洗碗工",
            id: 13466
        }, {
            name: "面点师",
            id: 13465
        }, {
            name: "茶艺师",
            id: 24523
        }, {
            name: "迎宾/接待",
            id: 13320
        }, {
            name: "大堂经理/领班",
            id: 13318
        }, {
            name: "学徒",
            id: 38865
        }, {
            name: "杂工",
            id: 38866
        }, {
            name: "咖啡师",
            id: 38867
        }, {
            name: "预订员",
            id: 38868
        }, {
            name: "餐饮管理",
            id: 13315
        }],
        38824: [{
            name: "订票员",
            id: 38873
        }, {
            name: "计调",
            id: 38874
        }, {
            name: "旅游顾问",
            id: 23137
        }, {
            name: "导游",
            id: 13321
        }, {
            name: "签证专员",
            id: 24527
        }, {
            name: "旅游产品/线路策划",
            id: 61685
        }],
        391123: [{
            name: "楼层经理",
            id: 391124
        }, {
            name: "洗衣房经理",
            id: 391125
        }, {
            name: "公共区域经理",
            id: 391126
        }, {
            name: "客房服务员",
            id: 391127
        }, {
            name: "房务部总监",
            id: 391128
        }, {
            name: "客房部经理",
            id: 391129
        }, {
            name: "预订经理",
            id: 391130
        }, {
            name: "预订员",
            id: 391131
        }, {
            name: "总机经理",
            id: 391132
        }, {
            name: "总机员工",
            id: 391133
        }, {
            name: "前厅部经理",
            id: 391134
        }, {
            name: "前台主管",
            id: 391135
        }, {
            name: "礼宾经理",
            id: 391136
        }, {
            name: "宾客关系主任",
            id: 391137
        }, {
            name: "前厅部员工",
            id: 391138
        }, {
            name: "大堂副理",
            id: 391139
        }, {
            name: "值班经理",
            id: 391140
        }, {
            name: "前台/接待",
            id: 391141
        }, {
            name: "救生员",
            id: 391142
        }, {
            name: "总经理",
            id: 391143
        }, {
            name: "总经理助理",
            id: 391144
        }, {
            name: "酒店店长",
            id: 391145
        }],
        13137: [{
            name: "普工",
            id: 13537
        }, {
            name: "综合维修工",
            id: 13329
        }, {
            name: "制冷/水暖工",
            id: 13556
        }, {
            name: "电工",
            id: 13545
        }, {
            name: "木工",
            id: 13491
        }, {
            name: "钳工",
            id: 13547
        }, {
            name: "切割/焊工",
            id: 13548
        }, {
            name: "钣金工",
            id: 13549
        }, {
            name: "油漆工",
            id: 13489
        }, {
            name: "缝纫工",
            id: 13552
        }, {
            name: "锅炉工",
            id: 13553
        }, {
            name: "水泥工",
            id: 38875
        }, {
            name: "钢筋工",
            id: 38876
        }, {
            name: "管道工",
            id: 38877
        }, {
            name: "瓦工",
            id: 38878
        }, {
            name: "组装工",
            id: 38879
        }, {
            name: "样衣工",
            id: 38880
        }, {
            name: "染工",
            id: 38881
        }, {
            name: "纺织工",
            id: 38882
        }, {
            name: "印花工",
            id: 38883
        }, {
            name: "压熨工",
            id: 38884
        }, {
            name: "车工/铣工",
            id: 13551
        }, {
            name: "铲车/叉车工",
            id: 23143
        }, {
            name: "铸造/注塑/模具工",
            id: 23147
        }, {
            name: "电梯工",
            id: 28857
        }, {
            name: "操作工",
            id: 13334
        }, {
            name: "包装工",
            id: 24517
        }, {
            name: "手机维修",
            id: 28724
        }],
        38825: [{
            name: "工艺设计",
            id: 13328
        }, {
            name: "化验/检验",
            id: 23149
        }, {
            name: "设备管理维护",
            id: 13325
        }, {
            name: "生产计划",
            id: 13331
        }, {
            name: "总工程师/副总工程师",
            id: 13323
        }, {
            name: "厂长/副厂长",
            id: 23151
        }, {
            name: "车间主任",
            id: 13330
        }, {
            name: "质量管理",
            id: 13173
        }, {
            name: "生产总监",
            id: 24509
        }, {
            name: "技术工程师",
            id: 13324
        }, {
            name: "维修工程师",
            id: 24511
        }, {
            name: "工业工程师",
            id: 24514
        }, {
            name: "材料工程师",
            id: 24519
        }, {
            name: "生产主管/组长",
            id: 13540
        }],
        13140: [{
            name: "广告文案",
            id: 13361
        }, {
            name: "广告创意",
            id: 13359
        }, {
            name: "创意指导/总监",
            id: 24437
        }, {
            name: "广告设计/制作",
            id: 13343
        }, {
            name: "会展策划/设计",
            id: 24441
        }, {
            name: "客户主管/专员",
            id: 38885
        }, {
            name: "企业策划",
            id: 38886
        }, {
            name: "媒介策划/管理",
            id: 38887
        }, {
            name: "婚礼策划",
            id: 38888
        }, {
            name: "咨询顾问",
            id: 13219
        }, {
            name: "咨询经理/主管",
            id: 24447
        }],
        38826: [{
            name: "平面设计",
            id: 13342
        }, {
            name: "美编/美术设计",
            id: 24439
        }, {
            name: "美术指导",
            id: 13360
        }, {
            name: "多媒体/动画设计",
            id: 23139
        }, {
            name: "店面/陈列/展览设计",
            id: 13345
        }, {
            name: "装修装潢设计",
            id: 13309
        }, {
            name: "家具/家居用品设计",
            id: 13341
        }, {
            name: "服装设计",
            id: 13339
        }, {
            name: "工艺/珠宝设计",
            id: 23135
        }, {
            name: "产品/包装设计",
            id: 24443
        }, {
            name: "CAD设计/制图",
            id: 24445
        }],
        13141: [{
            name: "医生",
            id: 13364
        }, {
            name: "保健医生",
            id: 28728
        }, {
            name: "心理医生",
            id: 13368
        }, {
            name: "护士/护理",
            id: 13375
        }, {
            name: "护理主任/护士长",
            id: 24610
        }, {
            name: "导医",
            id: 28730
        }, {
            name: "理疗师",
            id: 13366
        }, {
            name: "药剂师",
            id: 13370
        }, {
            name: "医药质检",
            id: 13371
        }, {
            name: "医疗管理",
            id: 13373
        }, {
            name: "美容整形师",
            id: 13365
        }, {
            name: "验光师",
            id: 23127
        }, {
            name: "营养师",
            id: 13369
        }, {
            name: "宠物护理/兽医",
            id: 13376
        }],
        38827: [{
            name: "临床研究/协调",
            id: 24612
        }, {
            name: "医药研发/生产/注册",
            id: 23133
        }, {
            name: "医疗器械研发/维修",
            id: 23131
        }, {
            name: "生物工程/生物制药",
            id: 24614
        }],
        13144: [{
            name: "自动化工程师",
            id: 23125
        }, {
            name: "电子/电气工程师",
            id: 13239
        }, {
            name: "电路工程师/技术员",
            id: 13249
        }, {
            name: "无线电工程师",
            id: 24620
        }, {
            name: "测试/可靠性工程师",
            id: 24622
        }, {
            name: "产品工艺/规划工程师",
            id: 24624
        }, {
            name: "音频/视频工程师",
            id: 24628
        }, {
            name: "灯光/照明设计工程师",
            id: 24630
        }, {
            name: "研发工程师",
            id: 24632
        }, {
            name: "电子/电器维修",
            id: 24634
        }],
        38828: [{
            name: "机电/机械工程师",
            id: 13396
        }, {
            name: "仪器/仪表/计量",
            id: 13401
        }, {
            name: "版图设计工程师",
            id: 24626
        }, {
            name: "机械工程师",
            id: 38889
        }, {
            name: "研发工程师",
            id: 38890
        }, {
            name: "测试/可靠性工程师",
            id: 38891
        }],
        13145: [{
            name: "汽车设计工程师",
            id: 23199
        }, {
            name: "装配工艺工程师",
            id: 23201
        }, {
            name: "汽车/摩托车修理",
            id: 13562
        }, {
            name: "汽车机械工程师",
            id: 23203
        }, {
            name: "汽车电子工程师",
            id: 23205
        }, {
            name: "4S店管理",
            id: 13410
        }, {
            name: "汽车检验/检测",
            id: 23207
        }, {
            name: "汽车美容",
            id: 13554
        }, {
            name: "二手车评估师",
            id: 13412
        }, {
            name: "发动机/总装工程师",
            id: 24543
        }, {
            name: "安全性能工程师",
            id: 24547
        }, {
            name: "理赔专员/顾问",
            id: 24551
        }, {
            name: "洗车工",
            id: 28716
        }, {
            name: "停车管理员",
            id: 28718
        }, {
            name: "加油站工作员",
            id: 28720
        }, {
            name: "轮胎工",
            id: 36518
        }],
        13146: [{
            name: "酒吧服务员",
            id: 13480
        }, {
            name: "娱乐厅服务员",
            id: 28871
        }, {
            name: "礼仪/迎宾",
            id: 13423
        }, {
            name: "主持人",
            id: 13421
        }, {
            name: "调酒师",
            id: 13475
        }, {
            name: "音效师",
            id: 13422
        }, {
            name: "灯光师",
            id: 28732
        }, {
            name: "摄影师/摄像师",
            id: 13419
        }, {
            name: "影视/后期制作",
            id: 13414
        }, {
            name: "配音员",
            id: 24529
        }, {
            name: "放映员",
            id: 24531
        }],
        13147: [{
            name: "总编/副总编/主编",
            id: 13427
        }, {
            name: "编辑/撰稿",
            id: 13429
        }, {
            name: "记者/采编",
            id: 24449
        }, {
            name: "出版/发行",
            id: 13433
        }, {
            name: "排版设计/制作",
            id: 13434
        }, {
            name: "印刷操作",
            id: 24451
        }, {
            name: "装订/烫金",
            id: 23122
        }],
        13148: [{
            name: "教师/助教",
            id: 13440
        }, {
            name: "家教",
            id: 23112
        }, {
            name: "幼教",
            id: 13443
        }, {
            name: "培训师/讲师",
            id: 13445
        }, {
            name: "培训策划",
            id: 24492
        }, {
            name: "培训助理",
            id: 24495
        }, {
            name: "教学/教务管理",
            id: 13442
        }, {
            name: "教育产品开发",
            id: 23113
        }, {
            name: "学术研究/科研",
            id: 13446
        }, {
            name: "招生/课程顾问",
            id: 24498
        }, {
            name: "校长",
            id: 24502
        }, {
            name: "野外拓展训练师",
            id: 28879
        }],
        13080: [{
            name: "商务司机",
            id: 13449
        }, {
            name: "客运司机",
            id: 13456
        }, {
            name: "货运司机",
            id: 13453
        }, {
            name: "出租车司机",
            id: 13450
        }, {
            name: "班车司机",
            id: 13451
        }, {
            name: "特种车司机",
            id: 13454
        }, {
            name: "驾校教练/陪练",
            id: 13457
        }],
        13083: [{
            name: "保洁",
            id: 13506
        }, {
            name: "保姆",
            id: 13500
        }, {
            name: "月嫂",
            id: 13502
        }, {
            name: "育婴师/保育员",
            id: 22441
        }, {
            name: "洗衣工",
            id: 13468
        }, {
            name: "钟点工",
            id: 13573
        }, {
            name: "保安",
            id: 13858
        }, {
            name: "护工",
            id: 28714
        }, {
            name: "送水工",
            id: 36516
        }],
        13093: [{
            name: "发型师",
            id: 13579
        }, {
            name: "美发助理/学徒",
            id: 13587
        }, {
            name: "洗头工",
            id: 13586
        }, {
            name: "美容师",
            id: 13580
        }, {
            name: "美容导师",
            id: 38892
        }, {
            name: "美容助理/学徒",
            id: 13593
        }, {
            name: "化妆师",
            id: 13583
        }, {
            name: "美甲师",
            id: 13589
        }, {
            name: "美容店长",
            id: 13591
        }, {
            name: "美容/瘦身顾问",
            id: 13592
        }, {
            name: "美体师",
            id: 38893
        }, {
            name: "宠物美容",
            id: 13600
        }, {
            name: "彩妆培训师",
            id: 24521
        }],
        38829: [{
            name: "针灸推拿",
            id: 38894
        }, {
            name: "搓澡工",
            id: 38895
        }, {
            name: "足疗保健",
            id: 13597
        }, {
            name: "推拿按摩",
            id: 13588
        }],
        38830: [{
            name: "健身教练",
            id: 13598
        }, {
            name: "瑜伽教练",
            id: 13599
        }, {
            name: "舞蹈老师",
            id: 38896
        }, {
            name: "游泳教练",
            id: 38897
        }, {
            name: "台球教练",
            id: 38898
        }, {
            name: "高尔夫球助理",
            id: 38899
        }],
        13803: [{
            name: "店员/营业员",
            id: 13845
        }, {
            name: "收银员",
            id: 13840
        }, {
            name: "促销/导购员",
            id: 13841
        }, {
            name: "理货员/陈列员",
            id: 13851
        }, {
            name: "防损员/内保",
            id: 23116
        }, {
            name: "店长/卖场经理",
            id: 13848
        }, {
            name: "招商经理/主管",
            id: 23117
        }, {
            name: "奢侈品业务",
            id: 24558
        }, {
            name: "品类管理",
            id: 24562
        }, {
            name: "食品加工/处理",
            id: 24564
        }, {
            name: "督导",
            id: 38901
        }],
        13897: [{
            name: "CEO/总裁/总经理",
            id: 24635
        }, {
            name: "首席运营官COO",
            id: 24660
        }, {
            name: "首席财务官CFO",
            id: 24661
        }, {
            name: "首席技术官CTO",
            id: 24662
        }, {
            name: "副总裁/副总经理",
            id: 24663
        }, {
            name: "总裁助理/总经理助理",
            id: 13899
        }, {
            name: "总监",
            id: 24664
        }, {
            name: "分公司经理",
            id: 24665
        }, {
            name: "合伙人",
            id: 24666
        }],
        23195: [{
            name: "证券/期货/外汇经纪人",
            id: 13257
        }, {
            name: "证券经理/总监",
            id: 23213
        }, {
            name: "证券分析/金融研究",
            id: 24583
        }, {
            name: "信用卡/银行卡业务",
            id: 24585
        }, {
            name: "银行经理/主任",
            id: 23220
        }, {
            name: "银行会计/柜员",
            id: 23223
        }, {
            name: "信贷管理/资信评估",
            id: 13261
        }, {
            name: "资产评估",
            id: 24590
        }, {
            name: "担保/拍卖/典当",
            id: 24601
        }, {
            name: "拍卖师",
            id: 24603
        }, {
            name: "外汇/基金/国债经理人",
            id: 23215
        }, {
            name: "投资/理财顾问",
            id: 13260
        }, {
            name: "融资专员",
            id: 24605
        }, {
            name: "融资经理/总监",
            id: 23218
        }, {
            name: "风险管理/控制",
            id: 23221
        }, {
            name: "股票交易员",
            id: 24607
        }],
        23197: [{
            name: "英语翻译",
            id: 13436
        }, {
            name: "日语翻译",
            id: 13437
        }, {
            name: "韩语翻译",
            id: 22439
        }, {
            name: "法语翻译",
            id: 23209
        }, {
            name: "俄语翻译",
            id: 13438
        }, {
            name: "德语翻译",
            id: 23211
        }, {
            name: "西班牙语翻译",
            id: 24480
        }, {
            name: "意大利语翻译",
            id: 24482
        }, {
            name: "葡萄牙语翻译",
            id: 24485
        }, {
            name: "阿拉伯语翻译",
            id: 24488
        }, {
            name: "小语种翻译",
            id: 13439
        }],
        24515: [{
            name: "污水处理工程师",
            id: 24542
        }, {
            name: "环境工程技术",
            id: 24546
        }, {
            name: "环境管理/保护",
            id: 24550
        }, {
            name: "环保技术",
            id: 24553
        }, {
            name: "EHS管理",
            id: 24555
        }, {
            name: "环保工程师",
            id: 24559
        }, {
            name: "环保检测",
            id: 24566
        }, {
            name: "水质检测员",
            id: 24569
        }, {
            name: "环境绿化",
            id: 28863
        }],
        24476: [{
            name: "饲料业务",
            id: 24484
        }, {
            name: "养殖人员",
            id: 24489
        }, {
            name: "农艺师",
            id: 24493
        }, {
            name: "畜牧师",
            id: 24499
        }, {
            name: "场长",
            id: 24503
        }, {
            name: "养殖部主管",
            id: 24505
        }, {
            name: "动物营养/饲料研发",
            id: 24508
        }],
        24581: [{
            name: "服装设计师",
            id: 24644
        }, {
            name: "纺织品设计师",
            id: 28722
        }, {
            name: "服装打样/制版",
            id: 24645
        }, {
            name: "生产管理",
            id: 24646
        }, {
            name: "样衣工",
            id: 24647
        }, {
            name: "食品/饮料研发/检验",
            id: 24648
        }, {
            name: "板房/底格出格师",
            id: 24649
        }, {
            name: "电脑放码员",
            id: 24650
        }, {
            name: "纸样师/车板工",
            id: 24651
        }],
        24571: [{
            name: "质量管理/测试经理",
            id: 24587
        }, {
            name: "质量检验员/测试员",
            id: 24591
        }, {
            name: "测试工程师",
            id: 24593
        }, {
            name: "安全消防",
            id: 24595
        }, {
            name: "认证工程师/审核员",
            id: 24597
        }, {
            name: "安全管理",
            id: 24599
        }],
        38665: [{
            name: "网店店长",
            id: 38666
        }, {
            name: "淘宝客服",
            id: 38667
        }, {
            name: "淘宝美工",
            id: 38668
        }, {
            name: "店铺文案编辑",
            id: 38669
        }, {
            name: "店铺推广",
            id: 38670
        }, {
            name: "活动策划",
            id: 38671
        }],
        13149: [{
            name: "其他职位",
            id: 13448
        }]
    };
    return category
});
define("mod/job/api.resume.matchCate", [], function() {
    var matchCate = function(cateId, degreeId) {
        if (!cateId || degreeId == "-1") {
            $("#chrTxt").hide();
            $("#chrTxt").attr("isHidden", true);
            return false
        }
        var url = "//jianli.58.com/chr/ajax/matchcate?callback=?&t=m&cateids=" + cateId + "&degreeid=" + degreeId;
        $.ajax({
            type: "get",
            dataType: "jsonp",
            url: url,
            success: function(data) {
                if (data.isSuccess) {
                    $("#chrTxt").show();
                    $("#chrTxt").attr("isHidden", false)
                } else {
                    $("#chrTxt").hide();
                    $("#chrTxt").attr("isHidden", true)
                }
            }
        })
    };
    return matchCate
});
define("mod/job/config.resume.industry", [], function() {
    var industryList = {
        lists: [{
            id: "269",
            name: "房地产/物业管理"
        }, {
            id: "253",
            name: "保险"
        }, {
            id: "251",
            name: "财务/审计"
        }, {
            id: "252",
            name: "金融/银行"
        }, {
            id: "295",
            name: "信托/拍卖"
        }, {
            id: "275",
            name: "教育/科研/培训"
        }, {
            id: "272",
            name: "中介/专业服务"
        }, {
            id: "3527",
            name: "人力资源服务"
        }, {
            id: "262",
            name: "医疗/保健/卫生/美容"
        }, {
            id: "277",
            name: "娱乐休闲/餐饮/服务"
        }, {
            id: "276",
            name: "旅游/酒店"
        }, {
            id: "278",
            name: "交通/运输/物流"
        }, {
            id: "261",
            name: "汽车/摩托车"
        }, {
            id: "244",
            name: "互联网/电子商务"
        }, {
            id: "245",
            name: "计算机软件"
        }, {
            id: "246",
            name: "计算机硬件"
        }, {
            id: "291",
            name: "游戏"
        }, {
            id: "254",
            name: "贸易/进出口"
        }, {
            id: "259",
            name: "办公用品及设备"
        }, {
            id: "255",
            name: "批发/零售"
        }, {
            id: "258",
            name: "服装/纺织/皮革"
        }, {
            id: "288",
            name: "陶瓷卫浴"
        }, {
            id: "289",
            name: "家具灯饰"
        }, {
            id: "256",
            name: "快速消费品(食品/饮料等)"
        }, {
            id: "257",
            name: "耐用消费品(家具/家电等)"
        }, {
            id: "296",
            name: "租赁服务"
        }, {
            id: "270",
            name: "建筑/建材"
        }, {
            id: "271",
            name: "家居/室内设计/装潢"
        }, {
            id: "260",
            name: "钢铁/机械/设备/重工"
        }, {
            id: "268",
            name: "出版/印刷/造纸"
        }, {
            id: "282",
            name: "原材料和加工"
        }, {
            id: "263",
            name: "生物/制药/医疗器械"
        }, {
            id: "248",
            name: "通信/电信"
        }, {
            id: "247",
            name: "IT服务/系统集成"
        }, {
            id: "249",
            name: "电子技术/半导体/集成电路"
        }, {
            id: "250",
            name: "仪器仪表/工业自动化"
        }, {
            id: "264",
            name: "广告/创意"
        }, {
            id: "265",
            name: "公关/市场推广/会展"
        }, {
            id: "266",
            name: "文体/影视/艺术"
        }, {
            id: "267",
            name: "媒体传播"
        }, {
            id: "280",
            name: "化工/采掘/冶炼"
        }, {
            id: "281",
            name: "能源(电力/水利/矿产"
        }, {
            id: "284",
            name: "环保"
        }, {
            id: "279",
            name: "航天/航空"
        }, {
            id: "283",
            name: "政府/非盈利机构"
        }, {
            id: "285",
            name: "农林牧渔"
        }, {
            id: "286",
            name: "多元化集团"
        }, {
            id: "273",
            name: "检测/认证"
        }, {
            id: "274",
            name: "法律/法务"
        }, {
            id: "294",
            name: "咨询/顾问"
        }, {
            id: "287",
            name: "其他行业"
        }]
    };
    return industryList
});
define("mod/job/busi.resume.privacyIndustrySet", ["./config.resume.industry", "./util.popSelect", "./config.common.category"], function(industryList, popSelect, category) {
    var privacyIndustrySet = function() {
        var getDataFuncs = function(handle) {
            var list = industryList.lists;
            if (typeof handle === "function")
                handle(list)
        };
        var selectIndustryId = $("#industryId").val()
          , selectIndustryText = $(".set-industry-text").text()
          , defaultSelect = []
          , item = "";
        if (selectIndustryId !== "0") {
            selectIndustryId = selectIndustryId.split(",");
            selectIndustryText = selectIndustryText.split("、");
            for (var i = 0; i < selectIndustryId.length; i++) {
                item = {
                    id: selectIndustryId[i],
                    name: selectIndustryText[i]
                };
                defaultSelect.push(item)
            }
        }
        var defaults = {
            className: "industryPopupWin",
            button: ".set-industry",
            text: ".set-industry-text",
            input: "#industryId",
            placeholder: "我不想让以下行业看到我的简历",
            maxTip: "最多选择5个行业哦",
            hasSubMenu: false,
            getDataFunc: getDataFuncs,
            enableMulti: true,
            maxSizeLog: "",
            defaultSelect: defaultSelect
        };
        var menu = popSelect.init(defaults);
        menu.$elem.on("menu_show", function(e) {
            window.clickLog && window.clickLog("from=m-postpingbihangyeclick")
        }).on("menu_hide", function(e) {
            if ($("#industryId").val() === "") {
                $("#industryId").val("0");
                $(".set-industry-text").text("无")
            }
        })
    };
    return privacyIndustrySet
});
define("mod/job/comp.select.position", ["./util.popSelect", "./config.common.category", "./api.resume.matchCate", "./busi.resume.privacyIndustrySet"], function(popSelect, category, matchCate, privacyIndustrySet) {
    var getDataFunc = function(handle) {
        var list = [];
        try {
            list = category.dataMap.second.map(function(item, idx) {
                var cateId = item.id;
                item.id = item.id + "";
                item[cateId] = category.subData[cateId];
                return item
            })
        } catch (err) {}
        if (typeof handle === "function")
            handle(list)
    };
    var initialize = function(options) {
        var defaults = {
            className: "jobPopupWin",
            button: ".job_input",
            text: ".job_input .rc_td .fl",
            input: ".job_input .rc_td input",
            getDataFunc: getDataFunc,
            hasSubMenu: true,
            placeholder: "请选择您的期望职位:",
            maxTip: "最多选择{maxSize}个类别哦",
            enableMulti: true,
            maxSizeLog: "post-jianli-qiwangzhiwei-dadaoshangxian"
        };
        options = $.extend({}, defaults, options);
        var menu = popSelect.init(options);
        menu.$elem.one("menu_show", function(e) {
            var $el = menu.$text.closest(".rc_go");
            if ($el.hasClass("c_i")) {
                menu.$text.text("");
                $el.removeClass("c_i")
            }
            privacyIndustrySet()
        }).on("menu_hide", function(e) {
            var industy = $(".jobPopupWin .conLeft .selected").attr("data-id");
            if (industy === "13139") {
                $(".set-industry").show();
                window.clickLog && window.clickLog("from=m-postpingbihangye")
            } else {
                $(".set-industry").hide()
            }
            var cateIds = menu.$input.val();
            var degreeid = $("#selEducation").val();
            matchCate(cateIds, degreeid)
        })
    };
    return initialize
});
define("mod/job/comp.select.applyRegion", ["./util.popSelect", "../common/cookie"], function(popSelect, cookie) {
    var getDataFunc = function(handle) {
        var city = $.cookie.get("mcity") || "bj";
        var url = "//jianli.m.58.com/getjobzones/?cityname=" + city + "&callback=?";
        $.ajax({
            url: url,
            dataType: "jsonp",
            success: function(result) {
                var data = JSON.parse(result.entity);
                if (typeof handle === "function")
                    handle(data)
            },
            error: function() {},
            timeout: 3e4
        })
    };
    var initialize = function(options) {
        var defaults = {
            className: "cityPopupWin",
            button: ".city_input",
            text: ".city_input .rc_td .fl",
            input: ".city_input .rc_td input",
            getDataFunc: getDataFunc,
            hasSubMenu: true,
            maxSize: 3,
            placeholder: "请选择您期望的求职区域:",
            maxTip: "最多选择{maxSize}个区域哦！",
            enableMulti: true,
            maxSizeLog: "post-jianli-qiuzhiquyu-dadaoshangxian"
        };
        options = $.extend({}, defaults, options);
        var menu = popSelect.init(options);
        menu.$elem.one("menu_show", function() {
            var $el = menu.$text.closest(".rc_go");
            if ($el.hasClass("c_i")) {
                menu.$text.text("");
                $el.removeClass("c_i")
            }
        })
    };
    return initialize
});
define("mod/job/busi.resume.textInput", [], function() {
    var inputText = function(id) {
        $(".tex_txt,.inp_txt").on("focus", function(e) {
            var $t = $(this);
            $t.removeClass("textRt").removeClass("c_i")
        })
    };
    return inputText
});
define("mod/job/busi.common.loginCaptcha", ["../common/util"], function(util) {
    var defaults = {
        obj: {},
        time: 60,
        voicetype: 0,
        tel: "",
        validcode: "",
        successCallback: function() {},
        errorCallback: function() {}
    };
    var options = {};
    var mobileLogin = new MobileLogin({
        source: "passport"
    });
    var loginCaptcha = {
        send: function(opts) {
            options = $.extend({}, defaults, opts);
            this._getCode()
        },
        loginCommit: function(mobile, mobilecode, successCallback, errorCallback) {
            mobileLogin.loginCommit({
                mobile: mobile,
                mobilecode: mobilecode,
                callback: function(res) {
                    if (res.code == 0) {
                        if (typeof successCallback === "function") {
                            successCallback()
                        }
                    } else {
                        util.alertShow(res.msg);
                        setTimeout(function() {
                            util.cancel_but()
                        }, 1e3);
                        if (typeof errorCallback === "function") {
                            errorCallback()
                        }
                    }
                }
            })
        },
        _getCode: function() {
            options.imgCode = $("#tkyzm_text").val() || "";
            mobileLogin.getCode({
                mobile: options.tel,
                voicetype: options.voicetype,
                validcode: options.imgCode,
                callback: function(res) {
                    if (res.code == 0) {
                        loginCaptcha._timer(options.obj, options.time);
                        if (typeof options.successCallback === "function") {
                            options.successCallback()
                        }
                    } else if (res.code == 785 || res.code == 786) {
                        loginCaptcha._createVCWin()
                    } else {
                        util.alertShow(res.msg);
                        if (typeof options.errorCallback === "function") {
                            options.errorCallback()
                        }
                        setTimeout(function() {
                            util.cancel_but()
                        }, 1e3)
                    }
                }
            })
        },
        _createVCWin: function() {
            var strHtml = '<div id="alert_bg_new" style="width: 100%; position: absolute; top: 0px; left: 0px; z-index: 1000; opacity: 0.7; height: 965px; background: rgb(148, 148, 148);"></div>';
            strHtml += '<div id="alert_box_new" class="new_alert_Box"><div id="show_mes_new">输入图片验证码<div id="yzm_tangkuang_li"><span id="freshyzm" class="freshyzm">点击验证码图片可刷新验证码</span><img src="//img.58cdn.com.cn/m58/m3/img/exit_yzm.jpg" class="exit_yzm"><input id="tkyzm_text" type="text" class="tkyzm_text" maxlength="6" placeholder="请输入图片验证码"><img id="yzm_img" src="' + mobileLogin.freshValidateCode() + '" class="yzm_img"></div></div><div id="but_div_new"><div class="but03" style="width: 100%;" id="vcphoto">验证并获取</div></div></div>';
            if ($("#alert_bg_new").length === 0) {
                $("body").append(strHtml);
                $("#yzm_img").bind("click", function() {
                    $("#tkyzm_text").val("");
                    $(this).attr("src", mobileLogin.freshValidateCode())
                });
                $(".exit_yzm").on("click", function() {
                    $("#freshyzm").text("点击验证码图片可刷新验证码");
                    $("#alert_bg_new").hide();
                    $("#alert_box_new").hide()
                });
                $("#vcphoto").on("click", function() {
                    options.imgCode = $("#tkyzm_text").val() || "";
                    if (options.imgCode.length > 3) {
                        $("#alert_bg_new").hide();
                        $("#alert_box_new").hide();
                        $("#freshyzm").text("点击验证码图片可刷新验证码");
                        loginCaptcha._getCode()
                    } else {
                        $("#tkyzm_text").val("");
                        $("#freshyzm").text("验证码错误,请重新输入!")
                    }
                })
            } else {
                $("#yzm_img").attr("src", mobileLogin.freshValidateCode());
                $("#freshyzm").text("验证码错误,请重新输入!");
                $("#alert_bg_new").show();
                $("#alert_box_new").show()
            }
        },
        _timer: function(obj, resendtime) {
            return sel = setInterval(function() {
                if (resendtime === 0) {
                    obj.removeAttr("disabled");
                    obj.val("获取验证码");
                    clearInterval(sel);
                    return
                }
                obj.attr("disabled", "disabled");
                obj.val(resendtime + " 秒");
                resendtime--
            }, 1e3)
        }
    };
    return loginCaptcha
});
define("mod/job/busi.resume.login", ["../common/util"], function(util) {
    var defaults = {
        source: "m-post-job",
        tel: "",
        authCode: "",
        imgCode: "",
        risktype: "",
        successCallback: function() {
            util.alertShow("登录成功", undefined, "", "", "", "");
            setTimeout(function() {
                util.cancel_but()
            }, 1e3)
        },
        errorCallback: function() {},
        timeout: 3e4
    };
    var options = {};
    var login = {
        init: function(opts) {
            var url = "";
            options = $.extend({}, defaults, opts);
            $("#valicode").val(options.authCode);
            url = "https://passport.58.com/mobileauthcodelogin/login?mobile=" + options.tel + "&mobilevcode=" + options.authCode + "&validatecode=" + options.imgCode + "&source=" + options.source + "&risktype=" + options.risktype + "&callback=?";
            this._send(url, options.successCallback, options.errorCallback, options.timeout)
        },
        _send: function(url, successCallback, errorCallback, timeout) {
            $.ajax({
                type: "GET",
                dataTpye: "json",
                url: url,
                success: function(result) {
                    if (result.code === 0) {
                        if (result.data.ppu) {
                            var exp = new Date;
                            var expires_time = exp.getTime() + 14 * 24 * 60 * 60 * 1e3;
                            $.cookie("PPU", result.data.ppu, {
                                path: result.data.path,
                                expires: expires_time
                            })
                        }
                        if (typeof successCallback === "function") {
                            successCallback()
                        }
                    } else if (result.code === 9) {
                        window.location.href = "//passport.58.com/warnuser"
                    } else {
                        util.alertShow(result.msg, undefined, "", "", "", "");
                        setTimeout(function() {
                            util.cancel_but()
                        }, 1e3);
                        errorCallback()
                    }
                },
                error: errorCallback,
                timeout: timeout
            })
        }
    };
    return login
});
define("mod/job/util.SimpleValidation", ["../common/util"], function(util) {
    var getValue = function(selector) {
        var $el = $(selector);
        if ($el.size() === 0)
            return null;
        return $el.val() || $el.text() || ""
    };
    var defaults = {
        onblur: false,
        enableScroll: true,
        inRcTd: false,
        showTipFunc: function(id, tip, inRcTd) {
            var $parentNode = $("#" + id).closest("li");
            var $append;
            if (!tip || $parentNode.size() === 0)
                return false;
            $parentNode.find(".wtip").remove();
            $append = inRcTd ? $parentNode.find(".rc_td") : $parentNode;
            $append.append('<span class="wtip action"><i class="icon-warning"></i>' + tip + "</span>");
            $append.find(".rc_td").removeClass("input-wrong")
        },
        hideTipFunc: function(id, tip) {
            var $parentNode = $("#" + id).closest("li");
            $parentNode.find(".wtip").remove()
        },
        showErrorFunc: function(id, message, inRcTd) {
            var $parentNode = $("#" + id).closest("li");
            var $append;
            if (!message || $parentNode.size() === 0)
                return false;
            $parentNode.find(".wtip").remove();
            $append = inRcTd ? $parentNode.find(".rc_td") : $parentNode;
            $append.append('<span class="wtip wrong"><i class="icon-error"></i>' + message + "</span>");
            $append.find(".rc_td").addClass("input-wrong")
        },
        hideErrorFunc: function(id) {
            var $parentNode = $("#" + id).closest("li");
            $parentNode.find(".wtip").remove()
        }
    };
    var Validation = function(config, options) {
        var _t = this;
        options = $.extend({}, defaults, options);
        _t.config = config;
        _t.isGroupValid = true;
        _t.validateOnBlur = options.onblur || false;
        _t.enableScroll = options.enableScroll || false;
        _t.showTipFunc = options.showTipFunc;
        _t.hideTipFunc = options.hideTipFunc;
        _t.showErrorFunc = options.showErrorFunc;
        _t.hideErrorFunc = options.hideErrorFunc;
        _t.invalidItems = [];
        _t.inRcTd = options.inRcTd;
        $(function() {
            _t.init()
        })
    };
    Validation.prototype = {
        constructor: Validation,
        init: function() {
            var _t = this;
            _t.config = _t.config.map(function(item) {
                var $el = $("#" + item.id);
                if (item.useDOMAttr) {
                    if (item.isSelect) {
                        $el = $el.closest(".rc_td").find(".rc_go span.fl");
                        item.required = $el.hasClass("must");
                        item.message = $el.attr("message") || ""
                    } else {
                        item.regex = $el.attr("regex") || "";
                        item.message = $el.attr("message") || "";
                        item.tip = $el.attr("tip") || "";
                        item.max = $el.attr("max") || "";
                        item.min = $el.attr("min") || ""
                    }
                }
                return item
            });
            _t.config.forEach(function(item, idx) {
                var $elem = $("#" + item.id);
                $elem.on("focus", function(e) {
                    _t.showTipFunc(item.id, item.tip, _t.inRcTd)
                }).on("blur", function(e) {
                    if (_t.validateOnBlur && !_t.validate(item)) {
                        if (window.clickLog && item.tongji) {
                            window.clickLog("from=" + item.tongji)
                        }
                    } else {
                        _t.hideTipFunc(item.id)
                    }
                })
            })
        },
        validateAll: function() {
            var _t = this;
            _t.isGroupValid = true;
            _t.invalidItems = [];
            _t.config.forEach(function(item, index) {
                if (!_t.validate(item)) {
                    if (window.clickLog && item.tongji) {
                        window.clickLog("from=" + item.tongji)
                    }
                    _t.invalidItems.push(item);
                    _t.isGroupValid = false;
                    return false
                }
            });
            if (_t.enableScroll)
                _t.scrollToInvalid();
            return _t.isGroupValid
        },
        validate: function(item) {
            var _t = this
              , isValid = true
              , regs = (item.regex || "").split("#")
              , msg = (item.message || "").split("#")
              , value = getValue("#" + item.id)
              , firstMsg = item.message.substr(0, item.message.indexOf("#")) || item.message;
            lastMsg = item.message.substr(item.message.indexOf("#") + 1);
            if (item.isSelect && value === "-1") {
                isValid = false;
                _t.showErrorFunc(item.id, lastMsg, _t.inRcTd);
                return false
            }
            if (null === value)
                return true;
            if (!value) {
                if (item.required) {
                    isValid = false;
                    _t.showErrorFunc(item.id, firstMsg, _t.inRcTd);
                    return false
                } else {
                    _t.hideErrorFunc(item.id);
                    return true
                }
            }
            if (item.min && value.length < item.min) {
                isValid = false;
                _t.showErrorFunc(item.id, lastMsg, _t.inRcTd);
                return false
            }
            if (item.max && value.length > item.max) {
                isValid = false;
                _t.showErrorFunc(item.id, lastMsg, _t.inRcTd);
                return false
            }
            if (typeof item.validateFunc === "function") {
                if (!item.validateFunc(value)) {
                    isValid = false;
                    _t.showErrorFunc(item.id, lastMsg, _t.inRcTd);
                    return false
                } else {
                    _t.hideErrorFunc(item.id);
                    return true
                }
            }
            regs.every(function(regStr, idx) {
                var reg = new RegExp(regStr.replace(/\\\\/g, "\\"));
                if (!item.hasSpace) {
                    value = value.trim();
                    value = value.replace(/[\s+]/g, "")
                }
                if (!reg.test(value)) {
                    isValid = false;
                    _t.showErrorFunc(item.id, msg[idx], _t.inRcTd);
                    return false
                } else {
                    _t.hideErrorFunc(item.id)
                }
                return true
            });
            return isValid
        },
        scrollToInvalid: function() {
            var _t = this
              , scrollTopArray = []
              , minScrollTop = 0
              , scrollTop = 0
              , bodyHeight = $("body").height();
            if (_t.invalidItems.length === 0)
                return false;
            scrollTopArray = _t.invalidItems.map(function(item) {
                var $el = $("#" + item.id);
                if ($el.size() === 0)
                    return bodyHeight;
                return $el.closest("li").offset().top
            });
            minScrollTop = Math.min.apply(null, scrollTopArray);
            setTimeout(function() {
                $(window).scrollTop(minScrollTop)
            }, 0)
        }
    };
    return Validation
});
define("mod/job/util.hasContact", [], function() {
    var isHasContact = function(text) {
        var regex = /([0-9０１２３４５６７８９零一二三四五六七八九壹贰叁肆伍陆柒捌玖]{7})/;
        var regObj = new RegExp(regex);
        var isMatch = regObj.test(text);
        if (!isMatch) {
            regex = /[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]{1,12}\.([a-zA-Z0-9_-]){2,4}/;
            regObj = new RegExp(regex);
            isMatch = regObj.test(text)
        }
        if (!isMatch) {
            regex = /(([qｑQＱ]+)(.?|.{1,5})(([0-9]|[０-９]|[零一二三四五六七八九]|[①-⑨]|[㈠-㈨])[-_@\~\#\$\%\^\&\*]*){5,13})|((([0-9]|[０-９]|[零一二三四五六七八九]|[①-⑨]|[㈠-㈨])[-_@\~\#\$\%\^\&\*]*){5,13}(.?|.{1,5})([qｑQＱ]+))/;
            regObj = new RegExp(regex);
            isMatch = regObj.test(text)
        }
        return isMatch
    };
    return isHasContact
});
define("mod/job/validation.resume.postCommon", ["./util.hasContact"], function(hasContact) {
    var validationConfig = [{
        title: "姓名",
        id: "txtUserName",
        tongji: "post-jianli-baocuo-xingming",
        required: true,
        useDOMAttr: false,
        tip: "请写真实姓名哦，2-4个汉字",
        regex: "^.+$#^[一-龥]{2,4}$",
        message: "忘记填写姓名啦#亲，2-4个汉字哦"
    }, {
        title: "出生年份",
        id: "year",
        tongji: "post-jianli-baocuo-birthday",
        useDOMAttr: false,
        isSelect: true,
        message: "请选择您的出生年份"
    }, {
        title: "最高学历",
        id: "selEducation",
        tongji: "post-jianli-baocuo-zuigaoxueli",
        useDOMAttr: false,
        isSelect: true,
        message: "请选择最高学历"
    }, {
        title: "工作经验",
        id: "selWorked",
        tongji: "post-jianli-baocuo-gongzuojingyan",
        useDOMAttr: false,
        isSelect: true,
        message: "请选择您的工作经验"
    }, {
        title: "手机号码",
        id: "phone",
        tongji: "post-jianli-baocuo-shoujihaoma",
        required: true,
        useDOMAttr: false,
        tip: "请填写真实手机号码哦~",
        regex: "^.+$#^(13[0-9]|15[0|1|2|5|3|6|7|8|9]|18[5|6|7|8|9|2|0|1|3|4]|17[0-9]|147)[0-9]{8}$",
        message: "忘记填写手机啦#手机号码不对啦~参考格式：138********"
    }, {
        title: "验证码",
        id: "authCode",
        tongji: "post-jianli-baocuo-yanzhengma",
        tip: "验证码为6数字哦",
        required: true,
        useDOMAttr: false,
        regex: "^.+$#^[0-9]{6}$",
        message: "忘记填写验证码啦#验证码不对啦"
    }, {
        title: "期望职位",
        id: "jobs",
        tongji: "post-jianli-baocuo-qiwangzhiwei",
        required: true,
        useDOMAttr: false,
        isSelect: true,
        message: "请选择期望职位类别"
    }, {
        title: "求职区域",
        id: "citys",
        tongji: "post-jianli-baocuo-qiuzhiquyu",
        required: true,
        useDOMAttr: false,
        isSelect: true,
        message: "请选择期望的求职区域",
        validateFunc: function(value) {
            return "0" !== value.toString()
        }
    }];
    return validationConfig
});
define("mod/job/showMessWin", [], function() {
    var noop = function() {};
    var win = {};
    var defaults = {
        html: "",
        inSection: false,
        title: "提示",
        content: "",
        wrapClassName: "",
        sectionClassName: "",
        width: 84,
        okBtn: "确定",
        cancelBtn: "取消",
        bindFn: null,
        readyFn: noop,
        okFn: noop,
        input: false,
        cancelFn: function(e) {
            win.close()
        }
    };
    win.close = function() {
        $("body").css("overflow", "auto").css("height", "auto");
        $(".bgWin,.winWap").hide()
    }
    ;
    function showMessWin(opts) {
        opts = $.extend({}, defaults, opts);
        var htmlStr = "";
        var $body = $("body");
        var $el = null;
        $("body").css("overflow", "hidden").css("height", "100%");
        $(".bgWin,.winWap").remove();
        $body.append('<div class="bgWin"></div>').append('<div class="winWap ' + opts.wrapClassName + '" id="winWap"></div>');
        var $parent = $("#winWap");
        var $mask = $(".bgWin");
        var title = "<h3>" + opts.title + "</h3>";
        var content = title + '<div class="winCon winTel">' + opts.content + "</div>";
        if (opts.input && opts.title === "") {
            title = "";
            content = '<div class="winCon windelete">' + title + opts.content + "</div>"
        } else if (opts.input && opts.title !== "") {
            content = '<div class="winCon winTel">' + title + opts.content + "</div>"
        }
        if (opts.html !== "") {
            if (opts.inSection) {
                htmlStr += '<section class="' + opts.sectionClassName + '">';
                htmlStr += title + '<div class="winCon winTel">';
                htmlStr += opts.html;
                htmlStr += "</div>";
                htmlStr += "</section>"
            } else {
                htmlStr = opts.html
            }
        } else {
            htmlStr += '<section class="' + opts.sectionClassName + '">';
            htmlStr += content;
            htmlStr += '<div class="btnWap">';
            htmlStr += opts.cancelBtn !== "" ? '<a href="javascript:void(0);" class="cancel">' + opts.cancelBtn + "</a>" : "";
            htmlStr += '<a href="javascript:void(0);" class="confirm">' + opts.okBtn + "</a>";
            htmlStr += "</div>";
            htmlStr += "</section>"
        }
        $parent.html(htmlStr).addClass("winRemin");
        $parent.find("section").css("padding", "0 " + (100 - opts.width) / 2 + "%");
        $parent.css("display", "table");
        $(".bgWin").show();
        win.winWap = $("#winWap");
        if (typeof opts.readyFn === "function")
            opts.readyFn.call(win);
        if (typeof opts.bindFn === "object" && opts.bindFn !== null) {
            var fns = Object.keys(opts.bindFn);
            fns.forEach(function(fn) {
                $el = $parent.find("." + fn);
                $el.on("click", opts.bindFn[fn].bind(win))
            })
        }
        $parent.find(".confirm").on("touchend", function(e) {
            e.preventDefault();
            opts.okFn.call(win, e);
            return false
        });
        $parent.find(".cancel").on("touchend", function(e) {
            e.preventDefault();
            opts.cancelFn.call(win, e);
            return false
        });
        return win
    }
    return showMessWin
});
define("mod/job/busi.resume.resumeNumMax", ["./showMessWin", "../common/global", "./util.urlSearch"], function(showMessWin, global, urlSearch) {
    var isUnion = global.isUnion;
    var urlMes = urlSearch.queryAll() || {};
    var requestResumeNum = function(userId, successFn, errorFn) {
        $.ajax({
            type: "GET",
            url: "//jianli.m.58.com/m/ajax/getresumecount",
            dataType: "JSON",
            success: function(data) {
                data = JSON.parse(data);
                if (data.entity && data.entity.ismaxcount) {
                    clickLog("from=post-jianli-shangxian-tanchuangzhanxian");
                    if (isUnion) {
                        showMessWin({
                            title: '提示<a href="javascript:;" class="close"></a>',
                            width: 84,
                            content: '<div style="margin: 0 auto;position: relative;"><div style="width: 48px;margin: 0 auto;margin-top:15px;margin-bottom: 12px;"><img style="height: 48px;width: 48px;"src="//img.58cdn.com.cn/m58/m3/img/m3.png" alt=""></div><div style="margin-bottom: 5px;"><p>最多只能创建6份简历哦~</p><p>您已达到上限，直接去找工作吧！</p></div></div>',
                            okBtn: "确定",
                            cancelBtn: "",
                            readyFn: function() {
                                var self = this;
                                $(".close").on("click", function(e) {
                                    window.clickLog && window.clickLog("from=post-jianli-shangxian-guanbi");
                                    self.close()
                                })
                            },
                            okFn: function() {
                                var templateId = urlMes.code || 20;
                                window.clickLog && window.clickLog("from=post-jianli-shangxian-chakanjianli");
                                document.location.href = "//jianli.m.58.com/m_finishcommonresumev2/?rid=&-15=" + templateId
                            }
                        })
                    } else {
                        showMessWin({
                            title: '提示<a href="javascript:;" class="close"></a>',
                            width: 84,
                            content: '<div style="margin: 0 auto;position: relative;"><div style="width: 48px;margin: 0 auto;margin-top:15px;margin-bottom: 12px;"><img style="height: 48px;width: 48px;"src="//img.58cdn.com.cn/m58/m3/img/m3.png" alt=""></div><div style="margin-bottom: 5px;"><p>您已经创建了6份简历，达到上限~</p><p>您可以去查看简历，或者查找适合的职位</p></div></div>',
                            okBtn: "查看简历",
                            cancelBtn: "查看职位",
                            readyFn: function() {
                                $(".winWap h3").css("width", "270px");
                                var self = this;
                                $(".close").on("click", function(e) {
                                    window.clickLog && window.clickLog("from=post-jianli-shangxian-guanbi");
                                    self.close()
                                })
                            },
                            okFn: function() {
                                window.clickLog && window.clickLog("from=post-jianli-shangxian-chakanjianli");
                                window.location.href = "//jianli.m.58.com/m_resumelist/"
                            },
                            cancelFn: function() {
                                window.clickLog && window.clickLog("from=post-jianli-shangxian-chakanzhiwei");
                                window.location.href = data.entity.url
                            }
                        })
                    }
                }
            },
            error: function() {},
            timeout: 1e4
        })
    };
    return requestResumeNum
});
define("mod/job/busi.resume.acphone", ["./util.SimpleValidation", "../common/util", "../common/global"], function(SimpleValidation, util, global) {
    var phoneAC = {
        acLog: [],
        pageType: 1,
        init: function(pagetype) {
            this.pageType = pagetype;
            this.$phone = $("#phone");
            this.initPhone()
        },
        initPhone: function() {
            this.eventPhoneInput()
        },
        initCode: function() {
            this.eventCodeBtn();
            this.eventCode()
        },
        clearCode: function() {
            $("#vcode").remove();
            $("#codeLine").remove()
        },
        clearAc: function() {
            $("#acok").remove()
        },
        lastValLength: 0,
        lastValue: "",
        clearAll: function() {
            this.validateStatus = false;
            this.clearAc();
            this.clearCode()
        },
        isAppleWebkitBug: /534\.30/.test(navigator.userAgent),
        eventPhoneInput: function() {
            var validationConfig = [{
                title: "手机号码",
                id: "phone",
                message: "忘记填写手机啦#手机号码不对啦。参考格式：138********",
                regex: "^.+$#^(13[0-9]|15[0|1|2|5|3|6|7|8|9]|18[5|6|7|8|9|2|0|1|3|4]|17[0-9]|147)[0-9]{8}$",
                tip: "请填写真实手机号码，以便企业与您联系哦",
                tongji: "post-jianli-baocuo-shoujihaoma",
                required: true,
                useDOMAttr: false
            }];
            var simpleValidation = new SimpleValidation(validationConfig);
            var $phone = this.$phone;
            var me = this;
            $phone.off("input propertychange");
            $phone.on("input propertychange", function() {
                phoneAC.validateStatus = false;
                phoneAC.clearAc();
                var arr;
                var isHeadSpace = false;
                var val = $(this).val().replace(/^\s+|\s+$/, function() {
                    isHeadSpace = true;
                    return ""
                });
                if (isHeadSpace) {
                    $(this).val(val);
                    isHeadSpace = false
                }
                var position = this.selectionStart;
                var currLength = val.length;
                var diff = currLength - phoneAC.lastValLength;
                if (val.length > 13) {
                    this.value = phoneAC.lastValue;
                    valid($(this)) && phoneAC.validate();
                    if (me.isAppleWebkitBug) {
                        setTimeout(function() {
                            this.setSelectionRange(position, position)
                        }
                        .bind(this), 0)
                    } else {
                        this.setSelectionRange(--position, position)
                    }
                    return
                }
                val = val.replace(/\s+/g, "");
                val = val.slice(0, 11);
                val = val.replace(/(\d{3})(\d)/g, "$1 $2");
                this.value = val;
                phoneAC.lastValLength = val.length;
                phoneAC.lastValue = val;
                if (val.length == 13) {
                    this.validateStatus = false;
                    if (simpleValidation.validate(validationConfig[0])) {
                        phoneAC.validate()
                    } else {
                        phoneAC.clearCode()
                    }
                } else {
                    phoneAC.clearCode()
                }
                if (me.isAppleWebkitBug && diff > 0) {
                    position++
                }
                if (position !== phoneAC.lastValLength) {
                    if (diff > 0) {
                        val.charAt(position - 1) === " " && position++
                    } else if (diff < 0) {
                        if (val.charAt(position - 1) === " ") {
                            position--
                        } else if (val.charAt(position) === " ") {
                            arr = val.split("");
                            arr.splice(--position, 1);
                            val = arr.join("");
                            val = val.replace(/\s+/g, "");
                            val = val.replace(/(\d{3})(\d)/g, "$1 $2");
                            this.value = val;
                            phoneAC.lastValLength = val.length;
                            phoneAC.lastValue = val
                        }
                    }
                    if (me.isAppleWebkitBug) {
                        setTimeout(function() {
                            this.setSelectionRange(position, position)
                        }
                        .bind(this), 0)
                    } else {
                        this.setSelectionRange(position, position)
                    }
                } else {
                    if (me.isAppleWebkitBug && diff > 0) {
                        setTimeout(function() {
                            this.setSelectionRange(val.length, val.length)
                        }
                        .bind(this), 0)
                    }
                }
            })
        },
        eventCodeBtn: function() {
            var me = this;
            var $phone = this.$phone;
            $("#vcode").off("click");
            $("#vcode").on("click", function() {
                var $vcode = $(this);
                me.validateStatus = false;
                window.clickLog && window.clickLog("from=M-clickyanzheng");
                var $code = $("#authCode");
                $code.val("");
                $("#authCode").parents("li").find(".wtip").remove();
                var phone = me.$phone.val().replace(/\s+/g, "");
                var $code = $("#authCode");
                $(".wtip", $code.parent()).remove();
                $.ajax({
                    url: "/m/ajax/getAuthKey?m=" + phone + "&callback=?",
                    dataType: "jsonp",
                    success: function(data) {
                        if (!data.isSuccess) {
                            util.alertShow("您今天短信发送次数已达到上限", "1", "确定", "", util.cancel_but, "");
                            return
                        }
                        $vcode.addClass("vcode-disabled");
                        $vcode.attr("disabled", "disabled");
                        timeout = me.timeDown(60, function(s) {
                            if (me.validateStatus) {
                                return false
                            }
                            if (!s) {
                                $vcode.removeClass("vcode-disabled");
                                $vcode.removeAttr("disabled", "disabled");
                                $vcode.removeClass("vcode-disabled").val("重新认证")
                            } else {
                                $vcode.val(s + " 秒")
                            }
                        })
                    }
                })
            })
        },
        eventCode: function() {
            var me = this;
            $(document).off("input propertychange");
            $(document).on("input propertychange", "#authCode", function() {
                var input = this;
                $("#authCode").parent().find("span").remove();
                if ($(this).val() == "") {
                    $("#authCode").parents("li").find(".wtip").remove()
                }
                if ($(this).val().length !== 6)
                    return;
                var phone = me.$phone.val().replace(/\s+/g, "");
                var code = $(this).val();
                $("#valicode").val(code);
                $(".wtip", $(this).parent()).remove();
                $.ajax({
                    url: "/m/ajax/chkAuthKey?m=" + phone + "&code=" + code + "&callback=?",
                    dataType: "jsonp",
                    success: function(data) {
                        var isSuccess = data.isSuccess;
                        if (!isSuccess) {
                            if ($("#authCode").parents("li").find(".wtip").length) {
                                $("#authCode").parents("li").find(".wtip").remove()
                            }
                            $(input).parents("li").append($('<span class="wtip wrong"><i></i>验证码输入错误</span>'));
                            $(".s_btn").attr("disabled", "disabled");
                            return
                        }
                        $(".s_btn").removeAttr("disabled");
                        me.clearAll();
                        me.validateStatus = true;
                        me.$phone.removeAttr("disabled");
                        me.$phone.parent().append($('<span class="acok" id="acok">认证成功</span>'));
                        me.acLog.push(phone);
                        window.clickLog && window.clickLog("from=M-showyanzhengchenggong")
                    }
                })
            })
        },
        validate: function() {
            var me = this;
            this.clearAll();
            if (this.acLog.indexOf(this.$phone.val().replace(/\s+/g, "")) > -1) {
                if (!$("#acok").length) {
                    $("#phone").parent().append($('<span class="acok" id="acok">已认证</span>'))
                }
                me.validateStatus = true;
                return
            }
            this.logValidate(function(pactlog) {
                if (pactlog) {
                    if (!$("#acok").length) {
                        $("#phone").parent().append($('<span class="acok" id="acok">已认证</span>'))
                    }
                    me.validateStatus = true
                } else {
                    if (!$("#vcode").length) {
                        $("#code").off("blur");
                        if ($("#codeLine").length) {
                            $("#codeLine").show()
                        } else {
                            $("#phone").parents(".ulwrap").append('<li id="codeLine" class="code"><div class="rc_th"><span>验&nbsp;证&nbsp;码</span><i>*</i></div><div class="rc_td"><input type="tel" maxlength="6" class="authCodeNum" id="authCode"  message="忘记填写验证码啦#验证码不对啦" regex="^.+$#^[0-9]{6}$" tip="验证码为6数字哦"><input type="button"  class="authCodeBtn" id="vcode" value="获取验证码"></span></div></li>')
                        }
                        window.clickLog && window.clickLog("from=M-showyanzhengma");
                        me.initCode();
                        $(document).on("blur", "#authCode", function() {
                            phoneAC.codeBlur(this)
                        });
                        $(document).on("focus", "#authCode", function() {
                            phoneAC.codeFocus(this)
                        })
                    }
                }
            })
        },
        initValidate: function() {
            var $phone = this.$phone;
            if (valid($phone, true)) {
                var val = $phone.val().replace(/\s+/g, "");
                val = val.replace(/(\d{3}|\d{7})(\d)/g, function(m0, m1, m2, index, val) {
                    return m1 + " " + m2
                });
                $phone.val(val);
                phoneAC.lastValLength = val.length;
                phoneAC.lastValue = val;
                this.validate()
            }
        },
        logValidate: function(func) {
            var phone = this.$phone.val().replace(/\s+/g, "");
            if (phone != "") {
                this.initPhone = phone;
                var jsonData = {
                    m: phone,
                    pageType: this.pageType
                };
                if (this.pageType == 0)
                    jsonData.rid = global.resumeId;
                $.ajax({
                    url: "/m/ajax/isNeedVery",
                    data: jsonData,
                    dataType: "json",
                    cache: false,
                    success: function(data) {
                        func(data.isSuccess)
                    },
                    error: function() {}
                })
            }
        },
        validateStatus: false,
        timeDown: function() {
            var timeout;
            return function(second, callback) {
                clearTimeout(timeout);
                second++;
                callback(--second);
                function callme() {
                    timeout = setTimeout(function() {
                        if (--second >= 0) {
                            if (callback(second) === false) {
                                clearTimeout(timeout)
                            } else {
                                callme()
                            }
                        }
                    }, 1e3)
                }
                callme()
            }
        }(),
        codeBlur: function() {
            var $code = $("#authCode");
            if ($code.val() == "") {
                if ($code.parents("li").find(".wtip").length) {
                    $code.parents("li").find(".wtip").remove()
                }
                $code.parents("li").append($('<span class="wtip wrong"><i></i>忘记填写验证码啦</span>'));
                window.clickLog && window.clickLog("from=M-baocuo-wangjitianyzm");
                return
            }
            if ($code.val().length <= 5) {
                if ($code.parents("li").find(".wtip").length) {
                    $code.parents("li").find(".wtip").remove()
                }
                $code.parents("li").append($('<span class="wtip wrong"><i></i>验证码输入错误</span>'));
                window.clickLog && window.clickLog("from=M-baocuo-youwuyzm");
                return
            }
        },
        codeFocus: function() {
            var $code = $("#authCode").parents("li").find(".wtip");
            if ($code.length) {
                $code.remove()
            }
        }
    };
    return phoneAC
});
var valid = function(input, isFirst) {
    if (input.val().substr(0, 1) == "请")
        input.val("");
    if (!input.attr("regex"))
        return 1;
    var regs = input.attr("regex").split("#")
      , msgs = input.attr("message").split("#")
      , value = input.val().trim()
      , index = 0
      , flag = 0;
    if (!input.attr("regex"))
        flag = 1;
    if (!flag) {
        flag = 1;
        if (input.attr("id") === "phone") {
            value = input.val().replace(/\s+/g, "")
        } else {
            input.val(value)
        }
        for (var i = 0, len = regs.length; i < len; i++) {
            var re = new RegExp(regs[i].replace(/\\\\/g, "\\"));
            if (!re.test(value)) {
                flag = 0;
                index = i;
                break
            }
        }
    }
    input.parent().find(".wtip").remove();
    if (!isFirst && flag != 1) {
        input.parent().append('<span class="wtip wrong"><i></i>' + msgs[index] + "</span>")
    }
    return flag
};
define("mod/job/busi.resume.privacyCompanySet", [], function() {
    var privacyCompanySet = function() {
        $(".set-company").on("click", function() {
            window.clickLog && window.clickLog("from=m-postshuikeyikandaoclick");
            var lookId = parseInt($("#companyLookId").val());
            if (!lookId) {
                $(".choose-company-item").removeClass("choose-company-active").eq(1).addClass("choose-company-active")
            }
            $(".choose-company-mask").removeClass("choose-company-mask-hide-out").show().addClass("choose-company-mask-show-in");
            $(".choose-company-box").removeClass("choose-company-mask-hide").show().addClass("choose-company-mask-show")
        });
        $(".choose-company-item").on("click", function() {
            $(".choose-company-item").removeClass("choose-company-active");
            $(this).addClass("choose-company-active");
            $(".set-company-text").text($(".choose-company-active .choose-company-text").text());
            $("#companyLookId").val($(this).attr("lookId"));
            maskHide()
        });
        $(".choose-company-cancel").on("click", function() {
            maskHide()
        });
        $(".choose-company-mask").on("click", function() {
            maskHide()
        });
        function maskHide() {
            $(".choose-company-mask").addClass("choose-company-mask-hide-out");
            $(".choose-company-box").addClass("choose-company-mask-hide");
            setTimeout(function() {
                $(".choose-company-mask").hide()
            }, 400)
        }
    };
    return privacyCompanySet
});
define("mod/job/api.resume.getPrivacySet", [], function() {
    var getPrivacyData = function() {
        $.ajax({
            url: "//jianli.m.58.com/userprivacy/getprivacy",
            type: "get",
            success: function(data) {
                console.log(data);
                if (!data.code) {
                    var entity = data.object
                      , lookText = "所有招聘方";
                    if (entity.showStatus === 0) {
                        lookText = "仅我投递的招聘方"
                    }
                    $(".set-company-text").text(lookText);
                    $("#companyLookId").val(entity.showStatus);
                    if (entity.blockIndustry === "") {
                        $("#industryId").val("0");
                        $(".set-industry-text").text("无")
                    } else {
                        $("#industryId").val(entity.blockIndustry);
                        $(".set-industry-text").text(entity.blockIndustryNames.replace(/,/g, "、"))
                    }
                } else {
                    $(".set-company-text").text("所有招聘方");
                    $("#companyLookId").val(1);
                    $("#industryId").val("0");
                    $(".set-industry-text").text("无")
                }
            },
            error: function(e) {
                console.log("请求失败");
                $(".set-company-text").text("所有招聘方");
                $("#companyLookId").val(1);
                $("#industryId").val("0");
                $(".set-industry-text").text("无")
            }
        })
    };
    return getPrivacyData
});
define("mod/job/busi.resume.privacySet", ["./busi.resume.privacyCompanySet", "./api.resume.getPrivacySet"], function(privacyCompanySet, getPrivacySet) {
    var companyMaskDom = '<div class="choose-company-mask">' + '<div class="choose-company-box">' + '<p class="choose-company-box-title">选择能看到这份简历的招聘方范围</p>' + "<ul>" + '<li class="choose-company-item choose-company-all choose-company-active" lookId="1"><span class="choose-company-text">所有招聘方</span>通过营业执照或法人等认证的招聘方</li>' + '<li class="choose-company-item" lookId="0"><span class="choose-company-text">仅我投递的招聘方</span>不会出现在简历库中，不会被非投递的招聘方邀约</li>' + "</ul>" + '<div class="choose-company-cancel">取消</div>' + "</div>" + "</div>";
    $("body").append(companyMaskDom);
    getPrivacySet();
    privacyCompanySet();
    window.clickLog && window.clickLog("from=m-postshuikeyikandao")
});
define("mod/job/comp.common.dialog", [], function() {
    var DEFAULTS = {
        title: "提示",
        custom: "",
        message: "请输入提示信息！",
        btns: [{
            id: "dialog-btn-cancel",
            text: "取消",
            event: function() {}
        }, {
            id: "dialog-btn-confirm",
            text: "确定",
            event: function() {}
        }]
    };
    var Dialog = function(options) {
        this.options = $.extend({}, DEFAULTS, options);
        this.init()
    };
    Dialog.prototype = {
        constructor: Dialog,
        init: function() {
            $("#comDialog").remove();
            this.render(this.options)
        },
        render: function() {
            $("body").append(this.getDom());
            this.addEvents()
        },
        addEvents: function() {
            var btn = ""
              , self = this;
            for (var i = 0, l = this.options.btns.length; i < l; i++) {
                var Btn = this.options.btns[i];
                if (Btn) {
                    (function(Btn) {
                        $("#" + Btn["id"]).bind("click", function() {
                            if ($(this).attr("disabled")) {
                                return
                            }
                            $(this).addClass("disabled");
                            self.hide();
                            Btn.event.call(this)
                        })
                    }
                    )(Btn)
                }
            }
            $("#comDialog").on("click touchmove", function() {
                self.hide()
            });
            $(".com-dialog-main").on("click touchmove", function(e) {
                e.stopPropagation()
            })
        },
        getDom: function() {
            var htmlStr = '<div class="com-dialog-warp" id="comDialog">' + '<div class="com-dialog-main">' + '<h5 class="com-dialog-title">' + this.options.title + "</h5>";
            if (this.options.message !== "") {
                htmlStr += '<p class="com-dialog-content">' + this.options.message + "</p>"
            }
            if (this.options.custom !== "") {
                htmlStr += '<p class="com-dialog-cus">' + this.options.custom + "</p>"
            }
            htmlStr += '<div class="com-dialog-footer">' + this.getBtnDom() + "</div>" + "</div>" + "</div>";
            return htmlStr
        },
        getBtnDom: function() {
            var btnsHtml = "";
            if (Object.prototype.toString.call(this.options.btns) !== "[object Array]") {
                return
            }
            for (var i = 0, l = this.options.btns.length; i < l; i++) {
                btnsHtml += '<a href="javascript:;" class="com-dialog-btn" id="' + this.options.btns[i].id + '">' + this.options.btns[i].text + "</a>"
            }
            return btnsHtml
        },
        show: function() {
            $("#comDialog").show()
        },
        hide: function() {
            $("#comDialog").remove()
        }
    };
    return {
        alert: function(options) {
            new Dialog({
                title: options.tips,
                custome: options.custom,
                message: options.message,
                type: "dialog-alert",
                btns: [options.btn || {
                    id: "dialog-btn-confirm",
                    text: "确定",
                    event: function() {}
                }]
            })
        },
        confirm: function(options) {
            options.type = "dialog-confirm";
            new Dialog(options)
        }
    }
});
define("mod/job/busi.resume.backAlert", ["./showMessWin", "./comp.common.dialog"], function(showMessWin, dialog) {
    function backAlert(souce) {
        window.history.replaceState({
            goback: true
        }, "", "");
        window.history.pushState({
            goback: true
        }, "", "");
        window.onpopstate = function(e) {
            if (e.state.goback) {
                window.clickLog && window.clickLog("from=jianli_post_tstc_" + souce);
                dialog.confirm({
                    message: "离好工作仅差一步，是否确认退出？",
                    title: "提示",
                    btns: [{
                        id: "dialog-btn-cancel",
                        text: "确定退出",
                        event: function() {
                            window.clickLog && window.clickLog("from=jianli_post_no_" + souce);
                            window.history.go(-1)
                        }
                    }, {
                        id: "dialog-btn-confirm",
                        text: "继续填写",
                        event: function() {
                            window.clickLog && window.clickLog("from=jianli_post_yes_" + souce);
                            window.history.pushState({}, "", "")
                        }
                    }]
                })
            }
        }
    }
    return backAlert
});
define("mod/job/main.resume.postCommon", ["../common/touchStyle", "../common/util", "./busi.resume.postToutu", "./busi.resume.postCommon", "./busi.resume.syncSelectText", "../common/global", "./busi.resume.birthYear", "./util.ImgUpload", "./comp.select.position", "./comp.select.applyRegion", "./busi.resume.textInput", "./busi.common.loginCaptcha", "./busi.resume.login", "./util.SimpleValidation", "./validation.resume.postCommon", "./busi.resume.resumeNumMax", "./busi.resume.acphone", "./api.resume.matchCate", "./showMessWin", "./busi.resume.privacySet", "./busi.resume.backAlert"], function(touchStyle, util, postToutu, resumePostCommon, syncSelectText, global, birthYear, ImgUpload, position_select, applyRegion_select, textInput, loginCaptcha, login, SimpleValidation, validationConfig, resumeNumMax, acphone, matchCate, showMessWin, privacySet, backAlert) {
    global._disId = 0;
    var isLogin = global.isLogin;
    window.successFunction = function() {
        resumePostCommon.submitForm(global.opObj)
    }
    ;
    $(function() {
        touchStyle($(".rc_go").parent().parent(), "hover");
        touchStyle($(".sav_btn input"), "hover");
        touchStyle($(".more_mes").parent(), "hover");
        touchStyle($(".authCodeBtn"), "hover");
        $(".sel_txt2").parent().parent().css("position", "static").parent().css("position", "relative");
        $(".inp_rad").bind("click", function() {
            $(this).parent().addClass("c_o").siblings().removeClass("c_o")
        })
    });
    $(function() {
        var simpleValidation = new SimpleValidation(validationConfig);
        textInput();
        $(".sav_btn input,.firstbtn").on("touchend", function(e) {
            var flag = simpleValidation.validateAll()
              , self = this
              , tel = $("#phone").val().replace(/\s+/g, "")
              , authCode = $("#authCode").val()
              , imgCode = $("#tkyzm_text").val() || "";
            window.clickLog && window.clickLog("from=m_resume_post_click");
            if (flag) {
                $(self).attr("disabled", "disabled");
                util.alertShow("正在保存中", undefined, "", "", "", "");
                window.clickLog && window.clickLog("from=m_resume_post_click_pass");
                if (isLogin) {
                    window.clickLog && window.clickLog("from=jl_baocun_chufajiekou");
                    resumePostCommon.submitForm(self)
                } else {
                    loginCaptcha.loginCommit(tel, authCode, function() {
                        window.clickLog && window.clickLog("from=jl_baocun_chufajiekou");
                        resumePostCommon.submitForm(self)
                    }, function() {
                        $(self).removeAttr("disabled")
                    })
                }
            }
        })
    });
    $(function() {
        var imgUpload = new ImgUpload({
            fileInput: "#fileUpload",
            container: "#toutu_list",
            scale: .6,
            isShowUpLoad: false,
            isDelete: false,
            maxNum: 1,
            shape: "circle",
            uploadSuccessLog: "post-jianli-zhaopiansuccess-pre"
        });
        $(".toutu .rc_go").on("click", function(e) {
            window.clickLog && window.clickLog("from=post-jianli-zhaopian");
        })
    });
    $(function() {
        var simpleValidation = new SimpleValidation(validationConfig,{
            onblur: true
        });
        $(".authCodeBtn").on("click", function() {
            var flag = simpleValidation.validate({
                title: "手机号码",
                id: "phone",
                message: "忘记填写手机啦#手机号码不对啦。参考格式：138********",
                regex: "^.+$#^(13[0-9]|15[0|1|2|5|3|6|7|8|9]|18[5|6|7|8|9|2|0|1|3|4]|17[0-9]|147)[0-9]{8}$",
                tip: "请填写真实手机号码，以便企业与您联系哦",
                tongji: "post-jianli-baocuo-shoujihaoma",
                required: true,
                useDOMAttr: false
            });
            var tel = $("#phone").val();
            if (flag) {
                loginCaptcha.send({
                    obj: $(this),
                    time: 60,
                    tel: tel,
                    successCallback: function() {
                        console.log("发送验证码成功")
                    },
                    errorCallback: function() {
                        console.log("发送验证码失败")
                    }
                })
            }
            window.clickLog && window.clickLog("from=post-jianli-huoquyanzhengma")
        })
    });
    $(function() {
        var cateId, degreeId;
        $("#selEducation").change(function() {
            cateId = $("#jobs").val();
            degreeId = $("#selEducation").val();
            matchCate(cateId, degreeId)
        })
    });
    $(function() {
        if (isLogin) {
            resumeNumMax();
            acphone.init(1);
            acphone.initValidate()
        }
        birthYear("#year", global.year);
        position_select({
            enableMulti: false,
            isHeader: false
        });
        applyRegion_select({
            enableMulti: false,
            isHeader: false
        });
        syncSelectText()
    });
    $(function() {
        $(".help").on("tap", function() {
            var telProtectObj = {
                title: "简历号码保护介绍",
                content: "<p>1、招聘方将无法获得您的真实手机号，只能通过系统提供的密号联系你</p>" + "<p>2、真实手机号不再被暴露，隐私更安全</p>",
                width: 90,
                okBtn: "确定",
                cancelBtn: "",
                okFn: function() {
                    this.close()
                }
            };
            showMessWin(telProtectObj)
        });
        $("#chr_tel").bind("click", function() {
            if ($(this).attr("checked") == "checked") {
                $(this).attr("checked", "")
            } else {
                $(this).attr("checked", "checked")
            }
        })
    });
    $(function() {
        backAlert("full")
    });
    window.onload = function() {
        $("body").one("click", "input,select", function() {
            window.clickLog && window.clickLog("from=m-quanzhi-fabu-caozuo")
        });
        window.clickLog && window.clickLog("from=m_resume_post_" + global.souce)
    }
});
define("pkg/job/job_resume_post_common", ["mod/job/busi.common.login", "mod/job/util.58timeTrak", "mod/job/main.resume.postCommon"], function(job_busi_common_login, job_util_58timeTrak, job_main_resume_postCommon) {});
