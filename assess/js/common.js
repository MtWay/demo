hx = function() {
	return {
		// 聊天发言表情
		giveAFace: function(options) {
			var defaults = {
					// facePath: 'http://bd.2schome.net/resource/web/mobpages/images/facebox',
					facePath: 'http://static.hx2cars.com/resource/web/dist/static/mobpages/images/facebox',
					faceQuantity: 75,
					faceBox: 'faceBox',
					addWhere: '',
					showButton: '',
					input: '',
					closeButton: '',
					beforeCallback: null,
					showCallback: null,
					selectCallback: null,
					closeCallback: null
				},
				opt, faceMark = 'hx_';

			this.init = function(options) {
				opt = $.extend({}, defaults, options);
				var n = 0;
				// 添加表情到页面
				$(opt.showButton).blockFly({
					targetId: opt.addWhere,
					flyType: 3,
					ifShadow: false,
					beginLocation: '100%',
					targetLocation: '0%',
					closebuttonId: opt.closeButton,
					flyCallback: addFace,
					closeCallback: opt.closeCallback,
					nextCallback: opt.showCallback
				});
			};
			// 添加表情包
			function addFace() {
				if ($.type(opt.beforeCallback) == 'function') {
					opt.beforeCallback();
				}
				var str = '';
				if ($('#' + opt.faceBox).length == 0) {
					str += '<div class="' + opt.faceBox + '" id="' + opt.faceBox + '"><ul>'
					for (var i = 1; i < opt.faceQuantity + 1; i++) {
						str += '<li><img src="' + opt.facePath + '/' + i + '.gif" dmark="[' + faceMark + i + ']"></li>'
					}
					str += '</div></ul>';
				}
				$(opt.addWhere).append(str);
				// 表情选择功能
				$('#' + opt.faceBox + ' li').off().on({
					'click': function() {
						selectFace.call($(this));
					}
				});
			}
			// 选择表情
			function selectFace() {
				var whsay = $(opt.input).val();
				whsay = whsay + $(this).find('img').attr('dmark');
				$(opt.input).val(whsay);
				if ($.type(opt.selectCallback) == 'function') {
					opt.selectCallback();
				}
			}
			this.init(options);
		},
		// 移动端品牌四级联动
		MobileBrand: function(options) {
			var defaults = {
					getFirstgradeId: '',
					secondSp: false,
					thirdSp: false,
					flyCallback: null, //层弹出前回调函数
					secondCallback: null,
					forthCallback: null
				},
				opt, fid = '',
				sid = '',
				t1, t2, t3, toptitle = '',
				fH = [],
				fimg;

			this.init = function(options) {
				opt = $.extend({}, defaults, options);
				//添加html
				// addHTML();
				//弹出一级品牌
				$(opt.getFirstgradeId).blockFly({
					targetId: '.firstGrade',
					flyType: 2,
					ifShadow: true,
					preventDiv: '.ipage',
					beginLocation: '100%',
					targetLocation: '0%',
					closebuttonId: '#fgradeArrow',
					closeCallback: hxBrandclose,
					nextCallback: hxBrandshow
				});
			};
			//一级取消
			function hxBrandclose() {
				$('#sgradeArrow').click();
				$('#tgradeArrow').click();
			}

			function hxBrandshow() {
				opt.othis = $(this);
				//浏览历史
				// if ($.cookie('brdHis')) {
				//     var ckstr = $.cookie('brdHis');
				//     var carr = ckstr.split('|');
				//     var his = '';
				//     $('#fgHistory').show().find('#fghHis').html('');
				//     for (var i = 0; i < carr.length - 1; i++) {
				//         var cr = carr[i].split('&');
				//         his += '<li class="getSecondgrade" data-fid="' + cr[1] + '">';
				//         his += '<p class="fghhLogo"><img src="' + cr[2] + '" alt=""></p>';
				//         his += '<p class="fghhName">' + cr[0] + '</p></li>';
				//     }
				//     $('#fghHis').html(his);
				getbrand()
			}
			$(".tabList").off().click(function(){
				$(this).addClass("cur").siblings().removeClass("cur");
				getbrand()
			})
			
			function getbrand(){
				let lian = 'tCarSerial'
				if($(".cur").index()==1){
					lian = 'tTruckSerial'
				}
				// let url = 'http://test106.2schome.net/commons/'+lian+'/brands';
				$.ajax({
					headers: {
						'platform': 'web'
					},
					type: 'GET',
					url: 'http://test106.2schome.net/commons/'+lian+'/brands',
					success: function(data) {
						console.log(data)
						// 				}
						// 			})
				
						//                $.post('http://m.2schome.net/tools/getonelevelbrand.json', {}, function(data) {
						$('#fgList').html('');
						$('#letterNav').html('<span>#</span>');
						if (data) {
							var dl = Object.keys(data.data);
							var fstr = '',
								letterall = '';
							for (var i = 0; i < dl.length; i++) {
								fstr += '<div class="fglAlone">';
								fstr += '<p class="fglaLetter">' + dl[i] + '</p>';
								letterall += '<span>' + dl[i] + '</span>';
								var dlv = data.data[dl[i]];
								for (var n = 0; n < dlv.length; n++) {
									fstr += '<span class="getSecondgrade" data-fid="' + dlv[n].brandId +'">';
									if($(".cur").index()==0)
									fstr +='<img src="https://ssl-assets.che300.com/theme/images/brand/large/b'+dlv[n].brandId+'.jpg">' ;
									fstr += dlv[n].brandName +'</span>';
								}
								fstr += '</div>';
							}
							$('#fgList').append(fstr);
							$('#letterNav').append(letterall);
						}
						$('.firstGrade .getSecondgrade').blockFly({
							targetId: '.secondGrade',
							flyType: 2,
							ifShadow: false,
							beginLocation: '100%',
							targetLocation: '0%',
							closebuttonId: '#sgradeArrow',
							nextCallback: hxgetSecondgrade
						});
				
						if (opt.othis.hasClass('brandOne')) {
							var fid = $('#choiceBrands').attr('carbigserial-val');
							$('#fgList .getSecondgrade').each(function() {
								if ($(this).attr('data-fid') == fid) {
									$(this).click();
									$('#choiceBrands').removeClass('brandOne');
								}
							});
						}
						//右侧字母导航Y轴位置
						var itsheight = $('#letterNav').height();
						boxPoint = {
							y: $('#letterNav').offset().top
						};
						//右侧字母导航
						$('#letterNav').off('touchmove').on({
							'touchmove': function(e) {
								e.stopPropagation();
								e.preventDefault();
								//判断手指个数
								if (e.originalEvent.touches.length > 1) {
									$(this).off('touchmove').off('touchend');
									return;
								}
								var touchs = e.originalEvent.targetTouches[0];
								ltdragmove.call($(this), touchs);
							}
						});
						$('#letterNav span').off('touchmove').on({
							'touchstart': function() {
								var whindex = $(this).index();
								$('#preLetter').show().html($(this).html());
								leftGo(whindex);
							},
							'touchend': function() {
								$('#preLetter').hide().html('');
							}
						});
					}
				});
			}
			var movePoint, boxPoint;
			//左侧滚动
			function leftGo(index) {
				var sTop = 0;
				var t1h = $('#firstTitle').height();
				var t2h = $('#fgHistory:visible').height();
				if (index !== 0) {
					sTop = t1h + t2h;

					for (var i = 0; i < index - 1; i++) {
						sTop += $('#fgList .fglAlone').eq(i).height();
					}
				}
				$('.firstGrade .fGrade').animate({
					'scrollTop': sTop
				}, 0);
			}
			//dragmove
			function ltdragmove(touch) {
				movePoint = {
					y: touch.pageY
				};
				var ihei = $('#letterNav span').height();
				var touchar = movePoint.y - boxPoint.y;
				var which = parseInt((touchar - 5) / ihei, 10);
				if (which >= 0 && which < $('#letterNav span').length) {
					$('#preLetter').show().html($('#letterNav span').eq(which).html());
					leftGo(which);
				}
				//dragend
				$('#letterNav').off('touchend').on({
					'touchend': function(e) {
						$('#preLetter').hide().html('');
					}
				});
			}
			//1-2
			function hxgetSecondgrade() {
				t1 = $(this).text();
				toptitle = t1;
				fid = $(this).attr('data-fid');
				fimg = $(this).find('img').attr('src');
				//头部标题
				if ($('#allGrade').contents().length > 1) {
					$('#allGrade').contents().eq(0).remove();
				}
				$('#allGrade').prepend(toptitle);
				let lian = 'tCarSerial'
				if($(".cur").index()==1){
					lian = 'tTruckSerial'
				}
				$.ajax({
					headers: {
						'platform': 'web'
					},
					type: 'GET',
					url: 'http://test106.2schome.net/commons/'+lian+'/series/'+fid,
					success: function(data) {
						console.log(data)
				// 	}
				// })
				// $.post('http://m.2schome.net/mobile/appMatchRequire/getCarSerialByParentIdJson.json', {
				// 	pids: fid
				// }, function(data) {
					if (opt.secondSp) {
						$('#getThirdgrade').html('<span data-sid="' + fid + '">不限</span>');
					} else {
						$('#getThirdgrade').html('');
					}

					if (data) {
						var brd = data.data;
						var str = '';
						for (var ikey in brd) {
							str += '<p class="sglTheme">' + ikey + '</p>';
							for (var i = 0; i < brd[ikey].length; i++) {
								str += '<span data-sid="' + (brd[ikey][i].seriesId) + '" data-btype ="' + brd[ikey][i].seriesId + '">' + brd[ikey][i]
									.seriesName + '</span>';
							}
						}
						$('#getThirdgrade').append(str);
					}
					//品牌二级取三级
					$('#getThirdgrade span').blockFly({
						targetId: '.thirdGrade',
						flyType: 2,
						ifShadow: false,
						beginLocation: '100%',
						targetLocation: '0%',
						closebuttonId: '#tgradeArrow',
						flyCallback: hxsecondSp,
						nextCallback: hxgetThirdgrade
					});
					}
				});
			}
			//二级不限
			function hxsecondSp() {
				var stext = $(this).text();
				if (stext == '不限') {
					fid = $(this).attr('data-sid');
					if ($.type(opt.secondCallback) == 'function') {
						opt.secondCallback(toptitle, fid);
					}
					return false;
				}
			}
			//2-3
			function hxgetThirdgrade() {
				t2 = $(this).html();
				toptitle = t1 + ' ' + t2;
				sid = $(this).attr('data-sid') ;
				if ($('#allGrade2').contents().length > 1) {
					$('#allGrade2').contents().eq(0).remove();
				}
				$('#allGrade2').prepend(toptitle);
				let lian = 'tCarType'
				if($(".cur").index()==1){
					lian = 'tTruckType'
				}
				$.ajax({
					headers: {
						'platform': 'web'
					},
					type: 'GET',
					url: 'http://test106.2schome.net/commons/'+lian+'/filter',
					data:{
						serialId :sid
					},
					success: function(data) {
						console.log(data)
				// 	}
				// })
				
				// $.post('http://m.2schome.net/car/getCarTypeByParentIdJson.json', {
				// 	parentId: sid
				// }, function(data) {
					if (opt.thirdSp) {
						$('#tglForthgrade').html('<span class="tghrFourgrade" data-foid="' + sid + '">不限</span>');
					} else {
						$('#tglForthgrade').html('');
					}
					$('#getForthgrade').html('');
					if (data) {
						var lefurl = '';
						// var dt = data.titles;
						// //3
						// for (var i = 0; i < dt.length; i++) {
						// 	lefurl += '<span>' + dt[i] + '</span>';
						// }
						// $('#getForthgrade').append(lefurl);
						var rigurl = '';
						var dmv = data.data.carTypeVoList;
						//4
						// for (var n = 0; n < dm.length; n++) {
						// 	rigurl += '<span class="tghrYear">' + dm[n].key + '</span>';
						// 	var dmv = dm[n].value;
							for (var m = 0; m < dmv.length; m++) {
								rigurl += '<span class="tghrFourgrade" data-time="' + 1 + '" data-foid="' + dmv[m].modelId + '">' + dmv[
									m].modelName + '</span>';
							}
						// }
						$('#tglForthgrade').append(rigurl);
					}
					//三级取四级
					$('#getForthgrade span').off().on({
						'click': function() {
							$('#getForthgrade span').removeClass('thirdOn');
							$(this).addClass('thirdOn');
							var thirdgrade = $(this).html();
							hxgetForthgrade(thirdgrade);
						}
					});
					//四级点击跳转
					$('#tglForthgrade .tghrFourgrade').off().on({
						'click': function() {
							hxgetBrand.call($(this), opt);
						}
					});
					}
				});
			}
			//四级跳转
			function hxgetBrand(ops) {
				t3 = $(this).html();
				if (t3 == "不限") {
					toptitle = t1 + ' ' + t2;
				} else {
					toptitle = t1 + ' ' + t2 + ' ' + t3;
				}
				foid = $(this).attr('data-foid');
				var ck = t1 + '&' + fid + '&' + fimg;
				$.setCookie({
					cName: 'brdHis', //name
					cValue: ck, //value
					ifAdd: true,
					addLength: 8,
					cDomain: '.hx2car.com'
				});
				if ($.type(ops.forthCallback) == 'function') {
					ops.forthCallback(toptitle, foid, sid, fid, opt.othis);
				}
			}
			//3-4
			function hxgetForthgrade(tts) {
				$.post('http://m.2schome.net/car/getCarTypeByParentIdKuanxin.json', {
					parentId: sid,
					title: tts
				}, function(data) {
					$('#tglForthgrade').html('');
					if (data) {
						var rigurl = '';
						var dm = data.maps;
						for (var n = 0; n < dm.length; n++) {
							rigurl += '<span class="tghrYear">' + dm[n].key + '</span>';
							var dmv = dm[n].value;
							for (var m = 0; m < dmv.length; m++) {
								rigurl += '<span class="tghrFourgrade" data-foid="' + dmv[m].id + '" data-time="' + dmv[m].years + '">' +
									dmv[m].subject + '</span>';
							}
						}
						$('#tglForthgrade').append(rigurl);
					}
					$('#tglForthgrade .tghrFourgrade').off().on({
						'click': function() {
							hxgetBrand.call($(this), opt);
						}
					});
				});
			}

			//添加html
			function addHTML() {
				var str =
					'<section class="fourgradeBrand"><div class="firstGrade" style="display:none;"><div class="fGrade"><div class="fgTitle" id="firstTitle">选择品牌<i id="fgradeArrow"></i></div><div class="fgHistory" id="fgHistory"><p class="fghTitle">浏览历史<span id="deleteHis">删除历史</span></p><ul class="fghHis" id="fghHis"></ul></div><div class="fgList" id="fgList"></div></div><div class="letterNav" id="letterNav"></div><div class="preLetter" id="preLetter" style="display:none;"></div></div><div class="secondGrade" style="display:none;"><div class="fgTitle" id="allGrade"><i id="sgradeArrow"></i></div><div class="sgList" id="getThirdgrade"></div></div><div class="thirdGrade" style="display:none;"><div class="fgTitle" id="allGrade2" style="position:absolute;top:0;"><i id="tgradeArrow"></i></div><div class="tgList"><div class="tglLeft" id="getForthgrade"></div><div class="tglRight" id="tglForthgrade"></div></div></div></section>';
				$('body').append(str);
				if (!$.cookie('brdHis')) {
					$('#fgHistory').hide();
				}
				//删除历史
				$('#deleteHis').off().on('click', function() {
					if ($.cookie('brdHis')) {
						$.cookie('brdHis', '', {
							expires: -1,
							domain: '.hx2car.com',
							path: '/'
						});
						$('#fgHistory').hide().find('#fghHis').html('');
					}
				});
			}

			this.init(options);
		},
		mphoneNumCheck: function(options) {
			var defaults = {
					checkedCallback: null
				},
				opt;

			this.init = function() {
				opt = $.extend({}, defaults, options);
				//添加验证页
				addHtml();
				addFunc();
			};
			//添加页面
			function addHtml() {
				var str = '<section class="cpage" id="phoneNumcheckpage" style="display:none;">';
				str += '<div class="mmTop"><i class="mmtBack" id="bottomArrow"></i>手机验证</div>';
				str += '<div class="introduce"><p class="iPic"></p><p class="iTip"></p></div>';
				str += '<div class="mobcheck"><div class="mBox">';
				str += '<div class="mbTel"><input type="tel" placeholder="请输入手机号码" id="mbTel"></div>';
				str +=
					'<div class="mbCode"><input type="number" placeholder="请输入图片验证码" id="mbPic"><span class="mbcPiccode"><img title="点击刷新" id="mbcPiccode" src="/servlet/yzCode.jpg" onclick="javascript:this.src=&quot;/servlet/yzCode.jpg?rnd=&quot;+Math.random();"></span></div>';
				str +=
					'<div class="mbCode"><input type="number" placeholder="请输入手机验证码" id="mbcInput"><span id="mbcObtain">获取验证码</span></div>';
				str += '</div><div class="mBtn"><a id="mbSubmit">确 定</a></div></div></section>';
				$('body').append(str);
			}
			//添加功能
			function addFunc() {
				//手机号码验证
				$('#mbSubmit').numberCheck({
					mbPic: '#mbPic', //图片验证码输入框
					picCode: '#mbcPiccode', //图片验证码
					mbcInput: '#mbcInput', //手机验证码输入框
					obtainCode: '#mbcObtain', //手机号码验证码获取按钮
					numberInput: '#mbTel', //手机号码输入框
					checkCallback: checkCallback
				});
			}

			function checkCallback(data) {
				if ($.type(opt.checkedCallback) == 'function') {
					opt.checkedCallback(data);
				} else {
					location.reload();
				}
			}
			this.init(options);
		},
		Chat: function(options) {
			var defaults = {
					carid: '',
					targetPhoto: '',
					targetName: '',
					targetHxid: options.targetHxid
					//targetConn: null
				},
				opt, ctuser = null,
				lastmsg = null,
				tsobj = this,
				//defaultPhoto = '';
				defaultPhoto = 'http://static.hx2cars.com/resource/web/dist/static/mobpages/images/carchat/default_photo.png';

			ctuser = JSON.parse($.cookie('hxuser'));
			var conn = new Easemob.im.Connection();
			//gethxNumber();

			// jjj
			conn.init({
				onOpened: function() {
					tsobj.chatInit(options);
					conn.setPresence();
					// conn.getRoster({
					//     success : function(roster) {
					//            // 获取当前登录人的好友列表
					//            for ( var i in roster) {
					//              var ros = roster[i]; //好友的对象
					//              alert(ros);
					//            //ros.name为好友名称
					//            }
					//      }
					//  });
				},
				//收到消息
				onTextMessage: function(message) {
					console.log(message);
					var fromid = message.from;
					var messageContent = '';
					// 如果有title则取title,否则取message.data
					var title = message.ext.title;
					if (title != undefined) {
						messageContent = message.ext.title;
					} else {
						messageContent = message.data || message.ext.gonggaoneirong;
					}
					var carid = message.ext.carID;
					tsobj.acMessage(fromid, messageContent, '', carid);
				},
				//收到图片信息
				onPictureMessage: function(message) {
					var fromid = message.from;
					tsobj.acMessage(fromid, '[图片]', 'Notext');
				},
				//收到语音信息
				onAudioMessage: function(message) {
					var fromid = message.from;
					tsobj.acMessage(fromid, '[语音]', 'Notext');
				},
				onLocationMessage: function(message) {
					var fromid = message.from;
					tsobj.acMessage(fromid, '[车行位置]', 'Notext');
				}
			});

			//判断是否注册
			var hxuse = JSON.stringify(ctuser);
			var unique_cookie = $.cookie('unique_cookie');
			if (hxuse != 'null') {
				if (hxuse.length > 1200) {
					ctuser.contacts = null;
					$.cookie('hxuser', JSON.stringify(ctuser), {
						expires: 365,
						path: '/',
						domain: ''
					});
				}
				conn.open({
					user: ctuser.username,
					pwd: ctuser.password,
					appKey: 'hx2car#hx2car',
				});
				// 去拿离线消息
				// 拿到登录账号密码。 
				// var mobileSell = getQueryString("mobile");
				// getlixianMes(mobileSell,ctuser.username);
			} else if (unique_cookie !== null && unique_cookie !== "") {
				//登录环信
				gethxNumber();
				// $.post('http://m.2schome.net/chat/gethxyouke.json', {}, function(data) {
				//     conn.open({
				//         user: data.username,
				//         pwd: data.password,
				//         appKey: 'hx2car#hx2car'
				//     });
				//     ctuser = new tsobj.chat.aduser(data.username, data.password, null, null, defaultPhoto);
				//     //$.cookie('hxuser', JSON.stringify(ctuser), { expires: 365, path: '/', domain: '.hx2car.com' });
				//     $.cookie('hxuser', JSON.stringify(ctuser), { expires: 365, path: '/', domain: '.bda.2schome.net' });
				// });


				// 拿到登录账号密码。 
				// var mobileSell = getQueryString("mobile");
				// $.post('http://m.2schome.net/wap/getHxInfoByMobile.json', {mobile:mobileSell}, function(data) {
				//     if(data.isSuccess){
				//         conn.open({
				//             user: data.hxInfo.hxid,
				//             pwd: data.hxInfo.password,
				//             appKey: 'hx2car#hx2car'
				//         });
				//         ctuser = new tsobj.chat.aduser(data.hxInfo.hxid, data.hxInfo.password, null, null, defaultPhoto);
				//         //$.cookie('hxuser', JSON.stringify(ctuser), { expires: 365, path: '/', domain: '.hx2car.com' });
				//         $.cookie('hxuser', JSON.stringify(ctuser), { expires: 365, path: '/', domain: '.bda.2schome.net' });
				//     }
				// });
			} else {
				$.alertMessage.call($(this), '对不起，您的浏览器不支持该服务！');
			}

			//暂时去掉
			// function getlixianMes(mobileSell,hxid){
			//     var buyrmsg = getQueryString("buyrmsg");
			//     if(buyrmsg){
			//         var token = getQueryString("token");
			//         // 有消息时，才请求发送 得到离线消息
			//         $.post('http://m.2schome.net/wap/sendCarTalkHxMsg.json',{hxIdSell:hxid,hxIdPurchase:token,talkMsg:buyrmsg},function(data){
			//             if((getQueryString("buyrmsg") != null) && window.history.pushState) {
			//                 //诸多操作完成后还原url
			//                 var url = 'http://' + window.location.host + '/chat/mobilechat.htm?token='+token+'&mobile='+mobileSell;
			//                 window.history.pushState({}, 0, url);
			//             }
			//         });
			//     }
			// }
			function gethxNumber() {
				// 拿到登录账号密码。 
				var mobileSell = getQueryString("mobile");
				$.post('http://m.2schome.net/wap/getHxInfoByMobile.json', {
					mobile: mobileSell
				}, function(data) {
					if (data.isSuccess) {
						conn.open({
							user: data.hxInfo.hxid,
							pwd: data.hxInfo.password,
							appKey: 'hx2car#hx2car',
						});
						// conn.open({
						//     user: 'hx1575026340133736890',
						//     pwd: '6f103c3c809ade0ca7b424013efe1aa1',
						//     appKey: 'hx2car#hx2car',
						// });
						//ctuser = new tsobj.chat.aduser('hx1575026340133736890', '6f103c3c809ade0ca7b424013efe1aa1', null, null, defaultPhoto);
						ctuser = new tsobj.chat.aduser(data.hxInfo.hxid, data.hxInfo.password, null, null, defaultPhoto, []);
						console.log(ctuser)
						$.cookie('hxuser', JSON.stringify(ctuser), {
							expires: 365,
							path: '/',
							domain: ''
						});
						//$.cookie('hxuser', JSON.stringify(ctuser), { expires: 365, path: '/', domain: '.bda.2schome.net' });
						// 去拿离线消息。
						//getlixianMes(mobileSell,data.hxInfo.hxid);
					} else {
						$.alertMessage.call($(this), '登录失败无发送消息');
						return false;
					}
				});
			}
			//初始化
			this.chatInit = function(options) {
				ctuser = JSON.parse($.cookie('hxuser'));
				opt = $.extend({}, defaults, options);
				// && ctuser.state == 1
				if (opt.carid !== null && opt.carid !== '') {
					this.chat.sendcar();
					this.chat.savecar();
				}
				var chat_contacts = ctuser.contacts;
				//是否有头像
				var chat_photo = ctuser.photo ? ctuser.photo :
					'http://static.hx2cars.com/resource/web/dist/static/mobpages/images/carchat/default_photo.png';

				var hasu = 0;
				if (chat_contacts !== null) {
					for (var i = 0; i < chat_contacts.length; i++) {
						if (opt.targetHxid == chat_contacts[i].username) { //opt.targetHxid
							hasu = 1;
							var chat_contact_msg = chat_contacts[i].msg;
							var msgstr = '';

							if (chat_contact_msg !== null) {
								$('#cmTip').hide();
								for (var j = 0; j < chat_contact_msg.length; j++) {
									switch (chat_contact_msg[j].type) {
										case 0:
											msgstr += '<div class="cmbMe">';
											msgstr += '<div class="cmbmTell"><span class="cmbmtSay">' + chat_contact_msg[j].msg +
												'</span><span class="cmbmtArrow"><b></b></span></div>';
											msgstr += '<div class="cmbmHead"><img src="' + chat_photo + '"></div>';
											msgstr += '</div>';
											break;
										case 1:
											msgstr += '<div class="cmbYou">';
											msgstr += '<div class="cmbmTell">';
											var reg = /^\[[\u4e00-\u9fa5]{0,4}\]$/;
											if (reg.test(chat_contact_msg[j].msg)) {
												msgstr += '<span class="cmbmtSay goAppDown">' + chat_contact_msg[j].msg +
													'请打开华夏APP查看！</span><span class="cmbmtArrow"><b></b></span>';
											} else if (chat_contact_msg[j].id !== '' && chat_contact_msg[j].id !== undefined) {
												msgstr += '<a class="cmbmtSay" href="/details/' + chat_contact_msg[j].id + '">' + chat_contact_msg[j].msg +
													'</a><span class="cmbmtArrow"><b></b></span>';
											} else {
												msgstr += '<span class="cmbmtSay">' + chat_contact_msg[j].msg +
													'</span><span class="cmbmtArrow"><b></b></span>';
											}
											msgstr += '</div>';
											if (chat_contacts[i].photo) {
												msgstr += '<div class="cmbmHead"><img src="' + chat_contacts[i].photo + '"></div>';
											} else {
												msgstr +=
													'<div class="cmbmHead"><img src="http://static.hx2cars.com/resource/web/dist/static/mobpages/images/carchat/default_photo.png"></div>';
											}
											msgstr += '</div>';
											break;
										case 2:
											msgstr += '<div class="cmbTime">' + chat_contact_msg[j].msg + '</div>';
											break;
									}
								}
								$('#cmBox').append(msgstr);
								goApp();
							}
						}
					}
				} else {
					chat_contacts = [];
				}
				if (hasu === 0) {
					var newcontact = new this.chat.adcontact(opt.targetName, opt.targetHxid, 0, opt.targetPhoto, null);
					chat_contacts.unshift(newcontact);
				}
				if (chat_contacts.length > 10) {
					chat_contacts.pop();
				}
				ctuser.contacts = chat_contacts;
				$.cookie('hxuser', JSON.stringify(ctuser), {
					expires: 365,
					path: '/',
					domain: ''
				});

				//页面随之滚动
				var allscroll = $('body')[0].scrollHeight + 300;
				$('html,body').stop(true, false).animate({
					scrollTop: allscroll
				});

			};


			this.chat = {
				sendcar: function() {
					$.post('http://m.2schome.net/chat/savechatcar.json', {
						token: ctuser.username,
						phoneNo: ctuser.mobile,
						userId: ctuser.userid,
						carid: opt.carid
					}, function(data) {});
				},
				savecar: function() {
					$.post("/chat/sendcarinfo.json", {
						id: opt.carid,
						loginName: opt.targetHxid + "," + ctuser.username
					}, function(data) {});
				},
				aduser: function(username, password, contacts, mobile, photo, unreadMesArr) {
					this.username = username;
					this.password = password;
					this.contacts = contacts;
					//this.userid = userid;
					this.mobile = mobile;
					//this.state = state;
					this.photo = photo;
					this.unreadMesArr = unreadMesArr;
				},
				addmsg: function(type, msg, time, id) {
					this.type = type;
					this.msg = msg;
					this.time = time;
					this.id = id;
				},
				adcontact: function(name, username, carid, photo, msg) {
					this.name = name;
					this.username = username;
					this.carid = carid;
					this.photo = photo;
					this.msg = msg;
					console.log(this);
				}
			};
			//发送信息
			this.sendmessage = function(pt) {
				var smsg = $('#cibpMessage').val();
				if ($.trim(smsg) === '') {
					$.alertMessage.call($(this), '发送内容不能为空');
					return;
				}

				if (ctuser == null) {
					gethxNumber();
				}

				//5分钟添加时间戳
				var msgTime;
				if (lastmsg !== null) {
					if (new Date().getTime() - lastmsg.time > 1000 * 60 * 5) {
						msgTime = '<div class="cmbTime">' + $.timeFormat(new Date(), 'yyyy/MM/dd HH:mm:ss') + '</div>';
						$("#cmBox").append(msgTime);
					}
				}

				var msghtml = '';
				msghtml += '<div class="cmbMe">';
				msghtml += '<div class="cmbmTell"><span class="cmbmtSay">' + smsg +
					'</span><span class="cmbmtArrow"><b></b></span></div>';

				if (pt !== '' && pt != undefined) {
					//存头像
					ctuser.photo = pt;
					$.cookie('hxuser', JSON.stringify(ctuser), {
						expires: 365,
						path: '/',
						domain: ''
					});
				} else {
					ctuser.photo = 'http://static.hx2cars.com/resource/web/dist/static/mobpages/images/carchat/defaultphoto.png';
				}
				msghtml += '<div class="cmbmHead"><img src="' + ctuser.photo + '"></div>';
				msghtml += '</div>';

				$('#cmBox').append(msghtml);
				$('#cibpMessage').val('');
				$('#cmTip').hide();

				//页面随之滚动
				var allscroll = $('body')[0].scrollHeight + 100;
				$('html,body').stop(true, false).animate({
					scrollTop: allscroll
				});

				conn.sendTextMessage({
					to: opt.targetHxid,
					msg: smsg,
					type: 'chat'
				});

				lastmsg = new this.chat.addmsg(0, smsg, new Date().getTime());
				addcookiemsg.call(this, opt.targetHxid, smsg, 0);
			};


			//收信息
			this.acMessage = function(acid, actext, infoType, carId) {

				// conn.getRoster({
				//     success : function(roster) {
				//            // 获取当前登录人的好友列表
				//            for ( var i in roster) {
				//              var ros = roster[i]; //好友的对象
				//              alert(ros);
				//            //ros.name为好友名称
				//            }
				//      }
				//  });


				//5分钟添加时间戳
				var msgTime;
				if (lastmsg !== null) {
					if (new Date().getTime() - lastmsg.time > 1000 * 60 * 5) {
						msgTime = '<div class="cmbTime">' + $.timeFormat(new Date(), 'yyyy/MM/dd HH:mm:ss') + '</div>';
						$("#cmBox").append(msgTime);
					}
				}

				if ($.cookie('buyhxid') == '') {
					$.cookie('buyhxid', acid, {
						path: '/',
						expires: ''
					});
				}
				// 环信id，每次相同，代表，是接收到的同一个人的消息。则要展示在页面。
				if ($.cookie('buyhxid') != '' && $.cookie('buyhxid') == acid) {
					$('.newFlag').addClass('hide');
					var msghtml = '';
					var carid = ''
					msghtml += '<div class="cmbYou">';
					msghtml += '<div class="cmbmTell">';
					if (infoType == '' && actext == '[名片]') {
						msghtml += '<span class="cmbmtSay goAppDown">' + actext +
							'请打开华夏APP查看！</span><span class="cmbmtArrow"><b></b></span>';
					} else if (carId !== '' && carId !== undefined) {
						msghtml += '<a class="cmbmtSay" href="/details/' + carId + '">' + actext +
							'</a><span class="cmbmtArrow"><b></b></span>';
						carid = carId;
					} else if (infoType == 'Notext') {
						msghtml += '<span class="cmbmtSay goAppDown">' + actext +
							'请打开华夏APP查看！</span><span class="cmbmtArrow"><b></b></span>';
					} else {
						msghtml += '<span class="cmbmtSay">' + actext + '</span><span class="cmbmtArrow"><b></b></span>';
					}
					msghtml += '</div>';
					if (opt.targetPhoto !== '') {
						msghtml += '<div class="cmbmHead"><img src="' + opt.targetPhoto + '"></div>';
					} else {
						msghtml +=
							'<div class="cmbmHead"><img src="http://static.hx2cars.com/resource/web/dist/static/mobpages/images/carchat/default_photo.png"></div>';
					}
					msghtml += '</div>';

					$('#cmBox').append(msghtml);
					//页面随之滚动
					var allscroll = $('body')[0].scrollHeight + 100;
					$('html,body').stop(true, false).animate({
						scrollTop: allscroll
					});

					goApp();

					lastmsg = new this.chat.addmsg(1, actext, new Date().getTime());

					addcookiemsg.call(this, acid, actext, 1, carid);
				} else {
					//接收其他的消息时处理。
					// 要获取 hx 好友 列表里的 username。
					var hxid = JSON.parse($.cookie('hxuser'));
					hxcontent = hxid.contacts;
					var iszhuce = 1; //
					//$.cookie('iszhuce',  1,{ path: '/', expires:''});
					if (hxcontent) {
						hxcontent.map(function(val) {
							var id = val.username;
							if (id == acid) {
								// 从好友列表里找到相册的id,代表已存过。不需要重存。
								iszhuce = 0;
							}
						});
					}
					if (iszhuce == 1) {
						// 好友列表没有人时。直接加入。
						var msgarr = [];
						var newxhid = '';
						msgarr[0] = actext;
						var ss = new this.chat.addmsg(1, actext, new Date().getTime());
						console.log('第三种');
						console.log(ss);
						var neaa = [];
						neaa.push(ss);

						newxhid = new this.chat.adcontact('', acid, 0,
							'http://static.hx2cars.com/resource/web/dist/static/mobpages/images/carchat/defaultphoto.png', neaa);
						ctuser.contacts.push(newxhid);
					} else {
						addcookiemsg.call(this, acid, actext, 1, carid);
					}



					//var unmes = [];
					// 存入未读消息。
					ctuser.unreadMesArr.push(acid);
					ctuser.unreadMesArr = ctuser.unreadMesArr;
					var unreadhxidArr = [];
					for (var i = 0; i < ctuser.unreadMesArr.length; i++) {
						if (unreadhxidArr.indexOf(ctuser.unreadMesArr[i]) < 0) {
							unreadhxidArr.push(ctuser.unreadMesArr[i]);
						}
					}
					ctuser.unreadMesArr = unreadhxidArr;
					//$.cookie('hxuser', JSON.stringify(ctuser), { expires: 365, path: '/', domain: '.bda.2schome.net' });


					//$.alertMessage.call($(this), '有新的消息，请去列表页面查看');
					$.alertMessage.call($(this), '有新的消息，请去列表页面查看');
					$('.newFlag').removeClass('hide');
					//$.cookie('hxuser', JSON.stringify(ctuser), { expires: 365, path: '/', domain: '.bda.2schome.net' });
					$.cookie('hxuser', JSON.stringify(ctuser), {
						expires: 365,
						path: '/',
						domain: ''
					});
				}
				// addcookiemsg.call(this, acid, actext, 1, carid);
			};


			//添加信息到cookie
			var addcookiemsg = function(hxid, msg, type, carid) {
				//carid = carid ? carid : '77777'
				//var flags = 0;
				var cokcontact = ctuser.contacts;
				for (var i = 0; i < cokcontact.length; i++) {
					if (cokcontact[i].username == hxid) {
						//flags = 0;
						var ctmsg = cokcontact[i].msg;
						var cmsg = null;
						if (ctmsg === null) {
							ctmsg = [];
						}
						if (ctmsg.length > 0 && ctmsg[ctmsg.length - 1].type != 2) {
							var lstmsg = ctmsg[ctmsg.length - 1];
							if (new Date().getTime() - lstmsg.time > 1000 * 60 * 5) {
								cmsg = new this.chat.addmsg(2, $.timeFormat(new Date(), 'yyyy/MM/dd HH:mm:ss'));
								ctmsg.push(cmsg);
							}
						}

						cmsg = new this.chat.addmsg(type, msg, new Date().getTime(), carid);
						console.log('自己存的');
						console.log(cmsg);

						ctmsg.push(cmsg);
						if (ctmsg.length > 50) {
							ctmsg.shift();
						}
						cokcontact[i].msg = ctmsg;
						ctuser.contacts = cokcontact;
						//$.cookie('hxuser', JSON.stringify(ctuser), { expires: 365, path: '/', domain: '.hx2car.com' });
						console.log(ctuser.contacts)
						//$.cookie('hxuser', JSON.stringify(ctuser), { expires: 365, path: '/', domain: '.bda.2schome.net' });
						$.cookie('hxuser', JSON.stringify(ctuser), {
							expires: 365,
							path: '/',
							domain: ''
						});
					}
				}
				// if(flags){
				//     // 如果在列表里没有找到对应的hxid。
				//     var newhxmes = [];
				//     var ctmsg = [];
				//     cmsg = new this.chat.addmsg(type, msg, new Date().getTime(), carid);
				//     console.log('好友存的');
				//     console.log(cmsg);
				//     ctmsg.push(cmsg);
				//     if (ctmsg.length > 20) {
				//         ctmsg.shift();
				//     }
				//     newhxmes[0].msg = ctmsg;
				//     ctuser.contacts.push(newhxmes); 
				//     //ctuser.contacts = newhxmes;
				//     //$.cookie('hxuser', JSON.stringify(ctuser), { expires: 365, path: '/', domain: '.hx2car.com' });
				//     console.log(ctuser.contacts)
				//     $.cookie('hxuser', JSON.stringify(ctuser), { expires: 365, path: '/', domain: '.bda.2schome.net' });
				// }
			};



			function goApp() {
				$('.goAppDown').click(function() {
					$.hxWaptoapp();
				});
			}
		}
	};
}();


/* ! Lazy Load 1.9.3 - MIT license - Copyright 2010-2013 Mika Tuupola */
! function(a, b, c, d) {
	var e = a(b);
	a.fn.lazyload = function(f) {
		function g() {
			var b = 0;
			i.each(function() {
				var c = a(this);
				if (!j.skip_invisible || c.is(":visible"))
					if (a.abovethetop(this, j) || a.leftofbegin(this, j));
					else if (a.belowthefold(this, j) || a.rightoffold(this, j)) {
					if (++b > j.failure_limit) return !1;
				} else c.trigger("appear"), b = 0;
			});
		}
		var h, i = this,
			j = {
				threshold: 0,
				failure_limit: 0,
				event: "scroll",
				effect: "show",
				container: b,
				data_attribute: "original",
				skip_invisible: !0,
				appear: null,
				load: null,
				placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
			};
		return f && (d !== f.failurelimit && (f.failure_limit = f.failurelimit, delete f.failurelimit), d !== f.effectspeed &&
				(f.effect_speed = f.effectspeed, delete f.effectspeed), a.extend(j, f)), h = j.container === d || j.container ===
			b ? e : a(j.container), 0 === j.event.indexOf("scroll") && h.bind(j.event, function() {
				return g();
			}), this.each(function() {
				var b = this,
					c = a(b);
				b.loaded = !1, (c.attr("src") === d || c.attr("src") === !1) && c.is("img") && c.attr("src", j.placeholder), c.one(
					"appear",
					function() {
						if (!this.loaded) {
							if (j.appear) {
								var d = i.length;
								j.appear.call(b, d, j);
							}
							a("<img />").bind("load", function() {
								var d = c.attr("data-" + j.data_attribute);
								c.hide(), c.is("img") ? c.attr("src", d) : c.css("background-image", "url('" + d + "')"), c[j.effect](j.effect_speed),
									b.loaded = !0;
								var e = a.grep(i, function(a) {
									return !a.loaded;
								});
								if (i = a(e), j.load) {
									var f = i.length;
									j.load.call(b, f, j);
								}
							}).attr("src", c.attr("data-" + j.data_attribute));
						}
					}), 0 !== j.event.indexOf("scroll") && c.bind(j.event, function() {
					b.loaded || c.trigger("appear");
				});
			}), e.bind("resize", function() {
				g();
			}), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && e.bind("pageshow", function(b) {
				b.originalEvent && b.originalEvent.persisted && i.each(function() {
					a(this).trigger("appear");
				});
			}), a(c).ready(function() {
				g();
			}), this;
	}, a.belowthefold = function(c, f) {
		var g;
		return g = f.container === d || f.container === b ? (b.innerHeight ? b.innerHeight : e.height()) + e.scrollTop() : a(
			f.container).offset().top + a(f.container).height(), g <= a(c).offset().top - f.threshold;
	}, a.rightoffold = function(c, f) {
		var g;
		return g = f.container === d || f.container === b ? e.width() + e.scrollLeft() : a(f.container).offset().left + a(f.container)
			.width(), g <= a(c).offset().left - f.threshold;
	}, a.abovethetop = function(c, f) {
		var g;
		return g = f.container === d || f.container === b ? e.scrollTop() : a(f.container).offset().top, g >= a(c).offset().top +
			f.threshold + a(c).height();
	}, a.leftofbegin = function(c, f) {
		var g;
		return g = f.container === d || f.container === b ? e.scrollLeft() : a(f.container).offset().left, g >= a(c).offset()
			.left + f.threshold + a(c).width();
	}, a.inviewport = function(b, c) {
		return !(a.rightoffold(b, c) || a.leftofbegin(b, c) || a.belowthefold(b, c) || a.abovethetop(b, c));
	}, a.extend(a.expr[":"], {
		"below-the-fold": function(b) {
			return a.belowthefold(b, {
				threshold: 0
			});
		},
		"above-the-top": function(b) {
			return !a.belowthefold(b, {
				threshold: 0
			});
		},
		"right-of-screen": function(b) {
			return a.rightoffold(b, {
				threshold: 0
			});
		},
		"left-of-screen": function(b) {
			return !a.rightoffold(b, {
				threshold: 0
			});
		},
		"in-viewport": function(b) {
			return a.inviewport(b, {
				threshold: 0
			});
		},
		"above-the-fold": function(b) {
			return !a.belowthefold(b, {
				threshold: 0
			});
		},
		"right-of-fold": function(b) {
			return a.rightoffold(b, {
				threshold: 0
			});
		},
		"left-of-fold": function(b) {
			return !a.rightoffold(b, {
				threshold: 0
			});
		}
	});
}(jQuery, window, document);
