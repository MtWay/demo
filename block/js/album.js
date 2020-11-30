$(function() {
	var u = navigator.userAgent,
		app = navigator.appVersion;
	var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if(isIOS) {
		$("#file1").attr("multiple", true); //如果是ios则可以多选,android不可用;
	}

	var cx = 0,
		dx = 0,
		showImg, isfirst = 0,
		x1, islast = 0;
	var lazyimg = "http://static.hx2cars.com/resource/web/mobpages/images/mcarlist/imglazyload.gif";
	var loadimg = "http://static.hx2cars.com/resource/web/mobpages/images/mindex/toplogo.png";
	var imgdata = [];
	var loginType = "";
	var loginState = false;
	if(PHONE) {
		loginState = true;
	}
	$("#mtMore").waplogin({
			loginState: loginState,
			redirectUrl: '/summit2017/meetingphotos.htm'
		})
		//登录
		//	$('#mtMore').blockFly({
		//			targetId: '.cpage',
		//			flyType: 2,
		//			ifShadow: false,
		//			beginLocation: '100%',
		//			targetLocation: '0%',
		//			closebuttonId: '#bottomArrow',
		//			//          closeCallback: hxclose,
		//			nextCallback: function() {
		//				$('html').addClass('noscroll');
		//			}
		//		})
		//手机号码验证
//	$('#mbSubmit').numberCheck({
//		mbPic: '#mbPic', //图片验证码输入框
//		picCode: '#mbcPiccode', //图片验证码
//		mbcInput: '#mbcInput', //手机验证码输入框
//		obtainCode: '#mbcObtain', //手机号码验证码获取按钮
//		numberInput: '#mbTel', //手机号码输入框
//		specialWay: false, //特殊情况
//		checkCallback: checkCallback
//	});
//
//	function checkCallback() {
//		var stel = $('#mbTel').val(),
//			scode = $('#mbcInput').val();
//		$.post('/wap/mobileCode.json', {
//			mobile: stel,
//			registerCode: scode
//		}, function(data) {
//			if(data.message === true) {
//				$("#bottomArrow").click();
//				PHONE = stel;
//				location.href = "/summit2017/meetingphotos.htm?flag=" + PHONE; //我的
//			} else {
//				$.alertMessage.call($(this), '短信验证码错误');
//			}
//		});
//	}

	$(".del").click(function(){
		var id = $(this).attr("data-id");
		$.getJSON("/summit2017/deletephoto.json?id="+id,function(data){
			if(data.result == "删除成功"){
				showImg.remove();
				$("#imgModel").addClass("vhide");
			}else{
				alert(data.result);
			}
		})
	})
	$(".tabList").click(function() {
		//		选项卡
		var index = $(this).index();
		if(index == 3) {
			if(!PHONE) {
				loginType = "myself";
				$('#mtMore').click();
				return false;
				//					location.href="/wap/personcenter.htm";
			}

		}
		$(".tabList").eq(index).addClass("select").siblings().removeClass("select");
		$(".tabList").eq(index + 4).addClass("select").siblings().removeClass("select");
		$(".section").eq(index).removeClass("hide").siblings(".section").addClass("hide");

		var scrolly = $("body").scrollTop() - 50;
		var tobot = $(".mark").offset().top;
		//两屏高 
		if(scrolly > (tobot - 2 * dh)) {
			fns[index](eval("currPage" + index));
		}
	})
	$("#showRule").click(function() {
		$("#rule").removeClass("vhide");
		$('html').addClass('noscroll');
	})

	$(".close").click(function() {
		$('html').removeClass('noscroll');
		$(".showBox").addClass("vhide");
	})

	$(".section").delegate("li", "click", function() {
		//	$(".section li").click(function() {
		showImg = $(this);
		var id = showImg.attr("id");
		addClick(id)
		changeImg(showImg);
		$('html').addClass('noscroll');
		$("#imgModel").removeClass("vhide");
	})

	$("#reast").click(function() {
		location.href = '/summit2017/meetingphotos.htm';
	})

	$("#update").click(function(e) {
		e.stopPropagation();
		if(!PHONE) {
			loginType = "update";
			$('#mtMore').click();
			return false;
			//					location.href="/wap/personcenter.htm";
		}
		//	else{
		//		$("#camera").addClass("zreo");
		//	}
	})

	$('.close_camera').click(function() {
		$("#camera").removeClass("zreo");
	})

	$(document).click(function() {
		$("#camera").removeClass("zreo");
	})

	//	wxcamera();
	//微信接口
	function wxcamera() {
		var url = location.href.split('#')[0];
		var carurl = url.indexOf('/');
		carurl = url.substring(carurl);
		$.post('/mobile/WeChartSign.json', {
			token: url
		}, function(data) {
			if(data) {
				var jdata = data.replace('[', '').replace(']', '').replace(/=/g, ':');
				var sdata = jdata.split(',');
				var i = 0;
				var ar = [];

				$.each(sdata, function(key, value) {
					var sop = sdata[key];
					var ind = sop.indexOf(':');
					ar[i] = sop.substr(ind + 1);
					i++;
				});
				var t2 = $.trim(ar[2]),
					t1 = $.trim(ar[1]),
					t4 = $.trim(ar[4]);
				var appId = "wxdbe3faf9f857d11d";
				if(location.host == "bd.2schome.net" || location.host == "m.2schome.net") {
					appId = "wx2c6c6082588a525d";
				}
				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					//										appId: 'wxdbe3faf9f857d11d', // 必填，公众号的唯一标识
					//					appId: 'wx2c6c6082588a525d', // 必填，公众号的唯一标识(测试用)
					appId: appId,
					timestamp: t2, // 必填，生成签名的时间戳
					nonceStr: t1, // 必填，生成签名的随机串
					signature: t4, // 必填，签名，见附录1
					jsApiList: ['chooseImage', 'previewImage', 'uploadImage', 'downloadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
				wx.ready(function() {
					$("#album").click(function(e) {
						e.stopPropagation();
						select(["album"]);
					})
					$("#photograph").click(function(e) {
						e.stopPropagation();
						select(["camera"]);
					})
                    wx.onMenuShareAppMessage({
                        title: '图片直击'+username+'在华夏第九届二手车企业家峰会现场', // 分享标题
                        desc: '', // 分享描述
                        link: 'http://m.hx2car.com/summit2017/meetingphotos.htm', // 分享链接
                        imgUrl: '' // 分享图标
                    });

                    wx.onMenuShareTimeline({
                        title: '图片直击'+username+'在华夏第九届二手车企业家峰会现场', // 分享标题
						link: 'http://m.hx2car.com/summit2017/meetingphotos.htm', // 分享链接
                        imgUrl: '' // 分享图标
                    });

				});
                wx.ready(function() {
                    if (ops.sWxmember) {
                        wx.onMenuShareAppMessage({
                            title: ops.sTitle, // 分享标题
                            desc: ops.sDesc, // 分享描述
                            link: ops.sLink, // 分享链接
                            imgUrl: ops.sImgurl // 分享图标
                        });
                    }
                    if (ops.sWxfriendround) {
                        wx.onMenuShareTimeline({
                            title: ops.sTitle, // 分享标题
                            link: ops.sLink, // 分享图标
                            imgUrl: ops.sImgurl // 分享图标
                        });
                    }
                });
			}
		});

	}

	function select(sel) {
		wx.chooseImage({
			count: 9, // 默认9
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: sel, // 可以指定来源是相册还是相机，默认二者都有
			success: function(res) {
				var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
				var len = localIds.length;
				var i = 0;
				//				$("p").append("<span>选择了" + len + "张图片</span><br />");
				$(".model-msg").removeClass("hide");
				$(".mwrap").text("本次选择" + len + "张图片，正在上传第1张图片");
				var serverIds = [];

				function upload() {
					wx.uploadImage({
						localId: localIds[i],
						isShowProgressTips: 0,
						success: function(res) {
							serverIds.push(res.serverId);
							$(".mwrap").text("正在上传" + (i + 1) + "/" + len + "张图片");
							i++;
							//							$("p").append("<span>正在上传第" + i + "张图片</span><br />");
							if(i < len) {
								upload();
							} else {
								for(var j = 0; j < serverIds.length; j++) {
									//									$("p").append("<span>" + serverIds[j] + "</span><br />");
									$.getJSON("/summit2017/imgupload.json?flag=" + serverIds[j], function(data) {
										var str = JSON.stringify(data);
										//											$(".mwrap").text("返回值"+str);
										if(j == (serverIds.length - 1)) {

										}
										//										$("p").append("<span>返回的图片是" + data.photo + "</span><br />")
										//										$("p").append("<span>返回的data是" + str + "</span><br />")
										//										$("body").append("<img src='http://img.hx2cars.com/upload/" + data.photo + "' />");
									})
								}
								$(".mwrap").text("上传完毕，本次共上传" + len + "张图片，请等待审核");
								$("#camera").removeClass("zreo");
								setTimeout(function() {
									$(".model-msg").addClass("hide");
								}, 2000)
							}
						},
						fail: function() {
							alert("upload fail please wait a moment and try again");
						}
					});

				}

				upload();

			}
		});
	}

	//展示滑动的３张图片
	function changeImg($li) {
		var imgs = [];
		isfirst = 0;
		islast = 0;

		var phone = $li.attr("data-phone");
		var name = $li.attr("data-name");
		if(name) {
			$(".bot_box a").attr("href", "/summit2017/mycarbarn.htm?name=" + phone);
			$("#upName").text(name);
		} else {
			$("#upName").text(phone);
			$(".bot_box a").attr("href", "/wap/fenghuicheliang.htm");
		}
		
		if($li.parents(".section").hasClass("section4")){
			$(".notDel").addClass("hide");
			$(".del").removeClass("hide").attr("data-id",$li.attr("id"));//展示删除按钮
			$(".bot_box p").addClass("hide");
		}else{
			$(".notDel").removeClass("hide");
			$(".del").addClass("hide");
			$(".bot_box p").removeClass("hide");//展示上传者
		}
		

		if(findprevLi($li)) {
			imgs.push(findprevLi($li).find("img").attr("data-original").replace("_small_200_150", ""));
		} else {
			//			点击的是第一张图
			isfirst = 1;
		}
		imgs.push($li.find("img").attr("data-original").replace("_small_200_150", ""));
		if(findnextLi($li)) {
			//如果图片未展示，则展示
			if(!findnextLi($li).hasClass("alreadyload")) {
				findnextLi($li).find("img").attr("src", findnextLi($li).find("img").attr("data-original")).addClass("alreadyload");
			}
			imgs.push(findnextLi($li).find("img").attr("data-original").replace("_small_200_150", ""));
		} else {
			//点击的是最后一张图
			var index = $(".tabList.select").index() % 4;
			fns[index](eval("currPage" + index));
			islast = 1;

		}

		$(".imgBox").removeClass("vhide")
		$(".imgBox").each(function(i, n) {
			if(imgs[i] == undefined) {
				$(n).addClass("vhide");
				return;
			}
			
			if(imgdata.indexOf(imgs[i]) >= 0) {
				$(n).find(".showImg").attr("src", imgs[i]);
			} else {
				var img = new Image();
				img.src = imgs[i];
				$(n).addClass("loding").find(".showImg").attr("src", '');
				img.onload = function() {
					imgdata.push(img.src);
					$(n).removeClass("loding").find(".showImg").attr("src", img.src);
				}
			}

			
		})
		if(isfirst) {
			showNum(0);
		} else {
			showNum(1);
		}
	}

	//找下一张图片
	function findnextLi($li) {
		if($li.next().length == 0) {
			return false;
		} else if($li.next("li").length == 0) {
			return findnextLi($li.next());
		} else {
			return $li.next();
		}
	}

	function findprevLi($li) {
		if($li.prev().length == 0) {
			return false;
		} else if($li.prev("li").length == 0) {
			return findprevLi($li.prev());
		} else {
			return $li.prev();
		}
	}

	//展示大图左右查看
	var kx = $(".imgBox").eq(1).offset().left; //初始偏移量
	function showNum(num) {
		$(".imgwrap").css("-webkit-transform", "translateX(" + (-kx * num) + "px)")
	}
	showNum(1);

	$(".imgwrap").on({
		"touchmove": function(e) {
			e.preventDefault();
			dx = e.originalEvent.changedTouches[0].clientX - cx;
			var wrap = $(".imgwrap")[0];
			var wt = wrap.style['-webkit-transform'],
				wts = wt.replace("translateX(", "").replace("px)", "");
			var x = dx + Number(wts);
			$(".imgwrap").css("-webkit-transform", "translateX(" + x + "px)");
			cx = e.originalEvent.changedTouches[0].clientX;
		},
		"touchstart": function(e) {
			x1 = cx = e.originalEvent.changedTouches[0].clientX;
		},
		"touchend": function(e) {
			var x2 = e.originalEvent.changedTouches[0].clientX;
			var dx = x2 - x1;
			var width = $(document).width();
			var index = 0;
			if(dx > width / 10) {
				//前一张
				index = 1;
			} else if(dx < (-width / 10)) {
				index = -1
			} else {
				index = 0;
			}

			//到底了
			$(".imgwrap").addClass("move");
			if(!findnextLi(showImg) && index == -1) {
				$(".imgwrap").css({
					"-webkit-transform": "translateX(" + (-kx) + "px)"
				})
				setTimeout(function() {
					$(".imgwrap").removeClass("move");
					changeImg(showImg);
				}, 300);
				return false;
			}
			if(index == 1) {
				if(findprevLi(showImg)) {
					showImg = findprevLi(showImg);
					var id = showImg.attr("id");
					addClick(id)
				}
			} else if(index == -1) {
				if(findnextLi(showImg)) {
					showImg = findnextLi(showImg);
					var id = showImg.attr("id");
					addClick(id)
				}
			}

			if(isfirst && index != 1) {
				index++;
			}

			$(".imgwrap").css({
				"-webkit-transform": "translateX(" + (kx * index - kx) + "px)"
			});
			setTimeout(function() {
				$(".imgwrap").removeClass("move");
				changeImg(showImg);
			}, 300)

		}
	})
	var sectiony = $(".section ").offset().top;
	var dh = $(window).height();
	$(document).scroll(function() {
		var scrolly = $("body").scrollTop() - 50;
		var tobot = $(".mark").offset().top;

		//导航吸顶
		if(scrolly > sectiony) {
			$("#topfix").addClass("fix");
		} else {
			$("#topfix").removeClass("fix");
		}

		//两屏高
		if(scrolly > (tobot - 2 * dh)) {
			var index = $(".tabList.select").last().index() % 4;
			fns[index](eval("currPage" + index));
		}
	})
	$(".section3").delegate(".showMore", "click", function() {
		if($(this).hasClass("ishowMore")) {
			return false;
		}
		$(this).addClass("ishowMore");
		var phone = $(this).attr("data-phone");
		var name = $(this).attr("data-name");
		var box = $(this).parents(".personal").next();
		//查看更多
		$.getJSON("/summit2017/showallphotos.json?flag=" + phone, function(data) {
			var str = "";
			var len = data.userPhotos.length;
			if(len > 6) {
				for(var i = 0; i < len; i++) {
					var value = data.userPhotos[i].value.replace(".jpg", "") + "_small_200_150.jpg";
					str += '<li id="' + data.userPhotos[i].key + '" ';
					str += 'data-phone="' + phone + '"data-name="' + name + '"';
					str += '><img data-original="http://img.hx2cars.com/upload/' + value + '" src = "' + lazyimg + '"/></li>';
				}
				box.empty().append(str);
				lazy();

			}
		})
	})
	var currPage0 = currPage1 = currPage2 = currPage3 = 1;
	var mark0 = mark1 = mark2 = mark3 = 1;
	//	var flag = getQueryString("flag");
	//	if(flag) {
	//		$(".section4").removeClass("hide").siblings(".section").addClass('hide');
	//		getdata3(flag);
	//	} else {
	getdata0(currPage0);
	//	}
	var fns = [getdata0, getdata1, getdata2, getdata3];
	//获取数据
	function getdata0(num) {
		if(mark0 == 0 && PHONE!="17706516536" ) {
			return false;
		}
		mark0 = 0;
		$.ajax({
			type: "get",
			url: "/summit2017/allphotos.json",
			data: {
				currPage: num
			},
			async: true,
			success: function(data) {
				$(".tabList").eq(0).addClass("select");
				$(".tabList").eq(4).addClass("select");
				var str = "";
				var length = data.photos.length;
				for(var i = 0; i < length; i++) {
					var value = data.photos[i].photo.replace(".jpg", "") + "_small_200_150.jpg";
					str += '<li id="' + data.photos[i].id + '" ';
					str += 'data-phone="' + data.photos[i].phone + '"';
					if(data.photos[i].name) {
						str += 'data-name="' + data.photos[i].name + '"';
					}
					str += '><img data-original="http://img.hx2cars.com/upload/' + value + '"  src = "' + lazyimg + '"/></li>';
				}
				$(".section1 ul").append(str);
				lazy();
				changeImg($(".section1 li").eq(0));
				if(length >= 300) {
					currPage0++;
					mark0 = 1;
				} else {
					mark0 = 0; //没有数据了
				}
			}

		});
	}

	function getdata1(num) {
		if(mark1 == 0) {
			return false;
		}
		mark1 = 0;
		$.ajax({
			type: "get",
			url: "/summit2017/timelinephotos.json",
			data: {
				currPage: num
			},
			async: true,
			success: function(data) {
				var str = "";
				var length = 0;

				for(var k in data.timelineInfo) { //遍历天
					if(k != $(".section2 h4").last().text()) {
						str += '<h4>' + k + '</h4>';
					}
					var tring = "";
					var prev = 0;
					for(var j in data.timelineInfo[k]) { //小时
						var ftr = "";
						var htr = j + ':00-' + (Number(j) + 1) + ':00';

						if(htr != $(".section2 p").last().text()) {
							ftr += '<p>' + htr + '</p>';
						}
						var len = data.timelineInfo[k][j].length;
						length += len;
						for(var l = 0; l < len; l++) { //图片
							var value = data.timelineInfo[k][j][l].photo.replace(".jpg", "") + "_small_200_150.jpg";
							ftr += '<li id="' + data.timelineInfo[k][j][l].id + '" ';
							ftr += 'data-phone="' + data.timelineInfo[k][j][l].phone + '"';
							if(data.timelineInfo[k][j][l].name) {
								ftr += 'data-name="' + data.timelineInfo[k][j][l].name + '"';
							}
							ftr += '><img data-original="http://img.hx2cars.com/upload/' + value + '"  src = "' + lazyimg + '"/></li>';
						}
						//判断后决定它放哪
						if(prev<j){
						tring = ftr + tring;
						}else{
						tring +=ftr ;
						}
						prev = j;
					}
					str += tring;

				}
				$(".section2 ul").append(str);
				lazy();
				if(length >= 300) {
					currPage1++;
					mark1 = 1;
				} else {
					mark1 = 0; //没有数据了
				}
			}

		});

	}

	function getdata2(num) {

		if(mark2 == 0) {
			return false;
		}
		mark2 = 0;
		$.ajax({
			type: "get",
			url: "/summit2017/characterphotos.json",
			data: {
				currPage: num
			},
			async: true,
			success: function(data) {
				var str = "";
				for(var k in data.usersPhotos) { //遍历人
					var len = data.usersPhotos[k].length;
					var name = data.usersPhotos[k][0].name || k;
					var msg = getDateDiff(data.usersPhotos[k][0].createTime);
					str += '<div class="personal"><span class="name">' + name + '</span><span class="right">最后上传' + msg + '';
					if(data.usersPhotos[k][0].company){
						name = data.usersPhotos[k][0].company+'--'+name;
					}
					if(len == 6) {
						str += '<span class="showMore" data-phone="' + k + '" data-name="' + name + '">查看更多</span>';
					}
					
					str += '</span></div><div class="personalBox">';
					for(var l = 0; l < len; l++) { //图片
						var value = data.usersPhotos[k][l].photo.replace(".jpg", "") + "_small_200_150.jpg";
						str += '<li id="' + data.usersPhotos[k][l].id + '" ';
						str += 'data-phone="' + k + '"';
						str += 'data-name="' + name + '"';
						str += '><img data-original="http://img.hx2cars.com/upload/' + value + '"  src = "' + lazyimg + '"/></li>';
					}
					str += '</div>';
				}
				$(".section3 ul").append(str);
				lazy();
				if(data.usersPhotos) {
					currPage2++;
					mark2 = 1;
				} else {
					mark2 = 0; //没有数据了
				}
			}

		});
	}

	function getdata3(num) {
		if(mark3 == 0) {
			return false;
		}
		mark3 = 0;
		$.ajax({
			type: "get",
			url: "/summit2017/myalbumphotos.json",
			data: {
				flag: num
			},
			async: true,
			success: function(data) {
				var str = '';
				var name = data.name;
				if(!name) {
					name = num;
				}
				//				if(data.isSelf) {
				//					$(".tabList").eq(3).addClass("select");
				//					$(".tabList").eq(7).addClass("select");
				//				} else {
				//					str += "<h4>" + name + "用户的峰会相册</h4>";
				//				}
				var length = 0;
				if(!data.userPhotos){
					$(".msg_my").removeClass("hide");
				}
				for(var k in data.userPhotos) { //遍历人
					var len = data.userPhotos[k].length;
					str += '<p>' + k + '</p>';
					for(var l = 0; l < len; l++) { //图片
						var value = data.userPhotos[k][l].value.replace(".jpg", "") + "_small_200_150.jpg";
						str += '<li id="' + data.userPhotos[k][l].key + '" ';
						str += 'data-phone="' + data.phone + '"';
						str += '><img data-original="http://img.hx2cars.com/upload/' + value + '"  src = "' + lazyimg + '"/></li>';
					}
				}
				$(".section4 ul").append(str);
				lazy();
				changeImg($(".section4 li").eq(0));
			}

		});
	}

	function lazy() {
		//lazyload
		$('.section img:not(.alreadyload)').lazyload({
			effect: "fadeIn",
			load: function() {
				$(this).addClass('alreadyload');
			}
		});
	}

	function getDateDiff(dateTimeStamp) {
		var dateTimeStamp = new Date(dateTimeStamp);
		var minute = 1000 * 60;
		var hour = minute * 60;
		var day = hour * 24;
		var halfamonth = day * 15;
		var month = day * 30;
		var now = new Date();
		var diffValue = now - dateTimeStamp;
		if(diffValue < 0) {
			return "未来";
		}
		var monthC = diffValue / month;
		var weekC = diffValue / (7 * day);
		var dayC = diffValue / day;
		var hourC = diffValue / hour;
		var minC = diffValue / minute;
		if(monthC >= 1) {
			result = "" + parseInt(monthC) + "月前";
		} else if(weekC >= 1) {
			result = "" + parseInt(weekC) + "周前";
		} else if(dayC >= 1) {
			result = "" + parseInt(dayC) + "天前";
		} else if(hourC >= 1) {
			result = "" + parseInt(hourC) + "小时前";
		} else if(minC >= 1) {
			result = "" + parseInt(minC) + "分钟前";
		} else
			result = "刚刚";
		return result;
	}

	//获取url参数
	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}

	function addClick(id) {
		$.ajax({
			type: "get",
			url: "/summit2017/addphotoclick.json",
			data: {
				id: id
			},
			success: function(data) {}
		});
	}

	var updateflag = 1;
	//原生图片上传
	$("#file1").change(function() {
			$("#loding").removeClass("vhide")
			var files = this.files,
				arr = [];
			var i = 0;
			var len = files.length;
			updateflag = len;
			loop();

			function loop() {
				if(i < len) {
					var src = handleFiles(files[i]);
					EXIF.getData(files[i], function() {
						var orientation = EXIF.getTag(this, 'Orientation');
						showimg(src, files[i].size, orientation, function(img) {
							upload(img);
							i++;
							loop();
						});
					});

				} else {}
			}
		})
		//圖片預覽地址
	function handleFiles(obj) {

		//	var files = obj.files;
		//	initSize = files[0].size;
		var img = new Image();
		img.src = window.URL.createObjectURL(obj); //创建一个object URL，并不是你的本地路径
		return img.src;
	}

	var successnum = 0;

	function upload(basestr) {
		var type = type || "image/jpeg";
		var text = window.atob(basestr.split(",")[1]);
		var buffer = new Uint8Array(text.length);
		var pecent = 0,
			loop = null;
		for(var i = 0; i < text.length; i++) {
			buffer[i] = text.charCodeAt(i);
		}
		var blob = getBlob([buffer], type);
		var xhr = new XMLHttpRequest();
		var formdata = getFormData();
		//  formdata.append('file1', blob);
		formdata.append('file', blob, "fenhui.png");
		xhr.open('post', '/summit2017/imgupload.json');
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4 && xhr.status == 200) {
				updateflag--;
				var data = JSON.parse(xhr.responseText);
				if(updateflag == 0) {
					location.href = "/summit2017/meetingphotos.htm?flag=" + PHONE; //我的

				}
			}
		};
		//		//数据发送进度，前50%展示该进度
		//		xhr.upload.addEventListener('progress', function(e) {
		//			if(loop) return;
		//			pecent = ~~(100 * e.loaded / e.total) / 2;
		//			$li.find(".jd-bg").css('width', pecent + "%");
		//			$li.find(".percentage").text("上传中" + pecent + "%");
		//
		//			if(pecent == 50) {
		//				mockProgress();
		//			}
		//		}, false);
		//		//数据后50%用模拟进度
		//		function mockProgress() {
		//			if(loop) return;
		//			loop = setInterval(function() {
		//				pecent++;
		//				$li.find(".jd-bg").css('width', pecent + "%");
		//				$li.find(".percentage").text("上传中" + pecent + "%");
		//				if(pecent == 100) {
		//					clearInterval(loop);
		//					$li.find(".percentage").text("上传成功");
		//				}
		//			}, 20)
		//		}
		xhr.send(formdata);
	}

	function getBlob(buffer, format) {
		try {
			return new Blob(buffer, {
				type: format
			});
		} catch(e) {
			var bb = new(window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
			buffer.forEach(function(buf) {
				bb.append(buf);
			});
			return bb.getBlob(format);
		}
	}

	/**
	 * 获取formdata
	 */
	function getFormData() {
		var isNeedShim = ~navigator.userAgent.indexOf('Android') &&
			~navigator.vendor.indexOf('Google') &&
			!~navigator.userAgent.indexOf('Chrome') &&
			navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534;
		return isNeedShim ? new FormDataShim() : new FormData()
	}

	function showimg(src, size, orientation, fn) {
		var canvas = $("<canvas></canvas>")[0];
		//		var canvas = $("#canvas")[0];
		var context = canvas.getContext("2d");
		var img = new Image();
		img.src = src;
		img.crossOrigin = 'anonymous'; //canvas跨域
		//					img.setAttribute('crossOrigin', 'anonymous');
		img.onload = function() {
			EXIF.getData(img, function() {
				var a = EXIF.getAllTags(this);
				var b = EXIF.getTag(this, 'Orientation');
			});
			var w = img.width;
			var h = img.height;
			resize({
				w: w,
				h: h,
				can: canvas
			});
			var cw = canvas.width;
			var ch = canvas.height;
			var x = 0,
				y = 0;
			//
			var sw = w / cw;
			var sh = h / ch;
			var s = sw > sh ? sw : sh;
			if(s < 1) {
				s = 1;
			}
			//        铺底色
			context.fillStyle = "#fff";
			context.fillRect(0, 0, w / s, h / s);
			context.drawImage(img, 0, 0, w / s, h / s);
			//旋转
			function rotate(deg, fn) {
				var cw = canvas.width;
				var ch = canvas.height;
				var ndata = canvas.toDataURL('image/jpeg', 1);
				var s = resize({
					w: ch,
					h: cw,
					can: canvas
				});
				cw = canvas.width;
				ch = canvas.height;
				//
				var img = new Image();
				img.src = ndata;
				//					//        铺底色
				context.fillStyle = "#fff";
				context.fillRect(0, 0, cw, ch);
				img.onload = function() {
					context.translate(cw / 2, ch / 2);
					context.rotate(deg * Math.PI / 180);
					context.translate(-ch / 2, -cw / 2);
					context.drawImage(img, 0, 0, ch, cw);
					if(typeof fn == "function") {
						fn()
					}
				}
			}

			function out() {
				var scale = 0.9;
				if(size) {
					scale = Math.floor(20000000 / size) / 10;
				}
				if(scale < 0.5) {
					scale = 0.5
				}
				if(scale > 1) {
					scale = 1;
				}

				var ndata = canvas.toDataURL('image/jpeg', scale);
				if(typeof fn == "function") {
					fn(ndata);
				}
			}
			switch(orientation) {
				case 6: //需要顺时针（向左）90度旋转  
					rotate(90, out);
					break;
				case 8: //需要逆时针（向右）90度旋转  
					rotate(-90, out);
					break;
				case 3: //需要180度旋转  
					rotate(90, function() {
						rotate(90, out); //转两次  
					}); //转两次
					break;
				default:
					out();
					break;
			}

			//			context.drawImage(img, 0, 0, w / s, h / s);

		}
	}

	//重置画布尺寸位置
	function resize(obj) {
		var defult = {
			w: 1600,
			h: 1200,
			can: $("#canvas"),
			maxWindth: 1600,
			maxHeight: 1200
		};

		var opt = $.extend(defult, obj);
		var k = 0.375; //画布像素宽与css宽比例

		var maxWidth = opt.maxWindth;
		var maxHeight = opt.maxHeight;
		var bw = $(opt.can).innerWidth();
		var bh = $(opt.can).innerHeight();
		var w = opt.w;
		var h = opt.h;

		var scale = w / maxWidth > h / maxHeight ? w / maxWidth : h / maxHeight;

		var aw = w / scale;
		var ah = h / scale;

		//图片小于最大尺寸
		if(scale < 1) {
			aw = w;
			ah = h
		}
		var ch = h / scale * k;
		var cw = w / scale * k;
		//图片小于容器
		if(scale < k) {
			ch = h;
			cw = w
		}
		var left = (bw - cw) / 2;
		var top = (bh - ch) / 2;
		$(opt.can).attr({
			width: aw,
			height: ah
		}).css({
			width: cw,
			height: ch,
			left: left,
			top: top
		});
	}

})