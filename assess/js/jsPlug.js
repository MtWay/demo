(function($) {
	//下拉刷新
	$.downDragload = function(tsobj, options) {
		var defaults = {
				dragAppend: '', //加载添加位置
				choiceStyle: 1, //选个样式
				drStyle: '', //样式1
				drpStyle: '', //样式2
				dragCallback: null
			},
			$obj = $(tsobj),
			startPoint, endPoint,
			opt;

		this.init = function(options) {
			opt = $.extend(false, {}, defaults, options);
			var dragstr = '';
			switch(opt.choiceStyle) {
				case 1:
					dragstr = '<div class="topLoad" id="topLoad" style="width: 100%;height: 6rem;background-color: #f6f6f6;position: absolute;z-index:-1;top: -6rem;' + opt.drStyle + '"><p style="width: 100%;text-align: center;height: 5rem;line-height: 5rem;font-size: 1.5rem;position: absolute;bottom: 0;left: 0;z-index:-1;' + opt.drpStyle + '"><img src = "http://static.hx2cars.com/resource/web/dist/static/mobpages/images/mindex/toplogo.png" style="width:1.8rem;height:1.8rem;display:inline-block;vertical-align: middle;margin: 0 0.5rem 0 0;"><span class="dragSpan" style="vertical-align: middle;color:#333">下拉刷新页面</span></p></div>';
					break;
				case 2:
					dragstr = '<div class="topLoad" id="topLoad" style="width: 100%;height: 1.98rem;background-color: #f6f6f6;position: absolute;z-index:-1;top: -1.98rem;' + opt.drStyle + '"><p style="width: 100%;text-align: center;height: 1.65rem;line-height: 1.65rem;font-size: 0.495rem;position: absolute;bottom: 0;left: 0;z-index:-1;' + opt.drpStyle + '"><img src = "http://static.hx2cars.com/resource/web/dist/static/mobpages/images/mindex/toplogo.png" style="width:0.594rem;height:0.594rem;display:inline-block;vertical-align: middle;margin: 0 0.165rem 0 0;"><span class="dragSpan" style="vertical-align: middle;color:#333">下拉刷新页面</span></p></div>';
					break;
				case 3:
					dragstr = '<div class="topLoad" id="topLoad" style="width: 100%;height: 1.98rem;background-color: #f6f6f6;position: absolute;z-index:-1;top: -1.98rem;' + opt.drStyle + '"><p style="width: 100%;text-align: center;height: 1.65rem;line-height: 1.65rem;font-size: 0.495rem;position: absolute;bottom: 0;left: 0;z-index:-1;' + opt.drpStyle + '"><img src = "http://static.hx2cars.com/resource/web/dist/static/mobpages/images/mindex/toplogo.png" style="width:0.594rem;height:0.594rem;display:inline-block;vertical-align: middle;margin: 0 0.165rem 0 0;"><span class="dragSpan" style="vertical-align: middle;color:#333">Drop-down refresh page</span></p></div>';
					break;
				default:
					break;
			}
			//添加加载动画
			$(opt.dragAppend).prepend(dragstr);

			//绑定滑动事件
			$obj.off('touchstart').on({
				'touchstart': function(e) {
					//判断手指个数
					if(e.originalEvent.touches.length > 1) {
						$(this).off('touchmove').off('touchend');
						return;
					}
					var touchs = e.originalEvent.targetTouches[0];
					dragStart.call($(this), opt, touchs);
				}
			});
		};

		$obj.addClass("scroll")
		var ua = navigator.userAgent.toLowerCase();
		var wigth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var urlStr = window.location.search; //app打开时 带有&from=appClient
		//解决safari下拉问题
		if((ua.indexOf("safari") > -1 || ua.match(/MicroMessenger/i) == 'micromessenger' || urlStr.indexOf('&from=appClient' || true) > -1 || ua.indexOf('OppoBrowser') > -1) && wigth > 320) {
			var overscroll = function(el) {
				el.addEventListener('touchstart', function() {
					var top = el.scrollTop,
						totalScroll = el.scrollHeight,
						currentScroll = top + el.offsetHeight;
					if(top === 0) {
						el.scrollTop = 1;
					} else if(currentScroll === totalScroll) {
						el.scrollTop = top - 1;
					}
				});

				el.addEventListener('touchmove', function(evt) {
					if(el.offsetHeight < el.scrollHeight)
						evt._isScroller = true;
				});
			}

			overscroll(document.querySelector('.scroll'));
			document.body.addEventListener('touchmove', function(evt) {
				if(!evt._isScroller) {
					//				        evt.preventDefault();
				}
			})
		}

		function dragStart(ops, touch) {
			startPoint = {
				y: touch.pageY
			};
			$(this).off('touchmove').on({
				'touchmove': function(e) {
					if(e.originalEvent.touches.length > 1) {
						$(this).off('touchmove').off('touchend');
						return;
					}
					var es = e;
					var touchs = e.originalEvent.targetTouches[0];
					dragMove.call($(this), opt, touchs, es);
				}
			});
		}

		function dragMove(ops, touch, es) {
			var scrtop = $(document).scrollTop();
			if(scrtop === 0) {
				endPoint = {
					y: touch.pageY
				};
				var hmove = (endPoint.y - startPoint.y) / 3;
				if(hmove > 0) {
					es.preventDefault();
					if(hmove > 60) {
						$('.topLoad .dragSpan').html('松开刷新页面');
						$(this).off('touchend').on('touchend', function(e) {
							trueEnd.call($(this), ops);
						});
					} else {
						$(this).off('touchend').on('touchend', function(e) {
							falseEnd.call($(this));
						});
					}
					$obj.css({
						'y': hmove + 'px',
						'transition-duration': '0s',
						'-webkit-transition-duration': '0s'
					});
					var rdeg = '-' + (hmove * 6) + 'deg';
					switch(ops.choiceStyle) {
						case 1:
							$('.topLoad img').css({
								'rotate': rdeg,
								'transition-duration': '0s',
								'-webkit-transition-duration': '0s'
							});
							break;
						default:
							break;
					}
				}
			}
		}

		function trueEnd(ops) {
			opt = $.extend(false, {}, defaults, options);
			var tsend = $(this);
			if(opt.choiceStyle == 2) { //css尺寸/100
				$(this).css({
					'y': '1.65rem',
					'transition-duration': '.3s',
					'-webkit-transition-duration': '.3s'
				});
			} else {
				$(this).css({
					'y': '5rem',
					'transition-duration': '.3s',
					'-webkit-transition-duration': '.3s'
				});
			}

			setTimeout(function() {
				if($.type(ops.dragCallback) === 'function') {
					var ifgo = ops.dragCallback();
					if(ifgo === 1) {
						setTimeout(function() {
							falseEnd.call(tsend);
						}, 1000);
					}
				}
			}, 300);
			$(this).off('touchend').off('touchmove');
			$('.topLoad .dragSpan').html('刷新中...');
			switch(ops.choiceStyle) {
				case 1:
					$('.topLoad img').css({
						'rotate': '-180deg',
						'transition-duration': '.3s',
						'-webkit-transition-duration': '.3s'
					});
					break;
				default:
					break;
			}
		}

		function falseEnd() {
			var tsend = $(this);
			$(this).css({
				'y': 0,
				'transition-duration': '.3s',
				'-webkit-transition-duration': '.3s'
			});
			$('.topLoad img').css({
				'rotate': '0',
				'transition-duration': '.3s',
				'-webkit-transition-duration': '.3s'
			});
			$(this).off('touchend').off('touchmove');
			//重新绑定
			$('body').on('touchmove', function() {});

			$('.topLoad .dragSpan').html('下拉刷新页面');
		}

		this.init(options);
	};

	//touch轮播图
	$.mobileFocus = function(tsobj, options) {
		var defaults = {
				moveTarget: '', //轮播滑动div
				sliderClass: '', //轮播子div
				curSlide: 'act', //当前页添加class
				nextSlide: 'next', //下一个页面class
				ifTouch: true, //是否添加触屏滑动效果，默认为true
				ifPagetab: false, //是否需要分页符
				pagetabCallback: null //回调
			},
			$obj = $(tsobj),
			opt, lth, wid, futime, index = 0,
			startbg, startPoint, endPoint;

		this.init = function(options) {
			opt = $.extend(false, {}, defaults, options);
			//计算
			getCalcule(opt);
			//添加分页符
			if(opt.ifPagetab) {
				addPagetab(opt);
			}
			//绑定滑动事件
			$obj.off('touchstart').on({
				'touchstart': function(e) {
					e.preventDefault();
					//判断手指个数
					if(e.originalEvent.touches.length > 1) {
						$(this).off('touchmove').off('touchend');
						return;
					}
					var touchs = e.originalEvent.targetTouches[0];
					mtouchstart.call($(this), opt, touchs);
				}
			});
			//添加定时器
			interAnimation(opt);
		};

		//滑动规则
		var focusAni = function(idx, n, ops) {
			var idxnext = idx + 1;
			if(idxnext > lth - 1) {
				idxnext = 0;
			}

			$obj.find(ops.sliderClass).removeClass(ops.curSlide).eq(idx).addClass(ops.curSlide);
			$obj.find('.tpTab').removeClass('TabOn').eq(idx).addClass('TabOn');
			if(lth > 1) {
				$obj.find(ops.sliderClass).removeClass(ops.nextSlide).eq(idxnext).addClass(ops.nextSlide);
			}

			var itmove = '-' + (wid * index);
			//首尾两张
			if(n == 2) {
				itmove = startbg.x;
			}
			$(ops.moveTarget).css({
				'x': '-' + (wid * index) + 'px',
				'transition-duration': '.3s',
				'-webkit-transition-duration': '.3s'
			});
			//回调
			var backdata = {
				plength: lth,
				pindex: idx
			};
			if($.type(ops.pagetabCallback) == 'function') {
				ops.pagetabCallback(backdata);
			}
		};

		//touchstart
		function mtouchstart(ops, touch) {
			//解绑定时器
			clearInterval(futime);
			startbg = {
				x: parseInt($(ops.moveTarget).css('x'), 10)
			};

			startPoint = {
				x: touch.pageX
			};
			$(this).off('touchmove').on({
				'touchmove': function(e) {
					e.preventDefault();
					if(e.originalEvent.touches.length > 1) {
						$(this).off('touchmove').off('touchend');
						return;
					}
					var touchs = e.originalEvent.targetTouches[0];
					mtouchmove.call($(this), opt, touchs);
				}
			});
		}

		//touchmove
		function mtouchmove(ops, touch) {
			endPoint = {
				x: touch.pageX
			};
			$(ops.moveTarget).css({
				'x': (endPoint.x - startPoint.x + startbg.x) + 'px',
				'transition-duration': '0s',
				'-webkit-transition-duration': '0s'
			});
			$(this).off('touchend').on({
				'touchend': function(e) {
					e.preventDefault();
					if(e.originalEvent.touches.length > 1) {
						$(this).off('touchmove').off('touchend');
						return;
					}
					mtouchend.call($(this), opt);
				}
			});
		}

		//touchend

		//滑动方式
		var dis = 2;

		function mtouchend(ops) {
			if((endPoint.x - startPoint.x) < -55) {
				index++;
				dis = 0;
				if(index > lth - 1) {
					dis = 2;
					index--;
				}
			}
			if((endPoint.x - startPoint.x) > 55) {
				index--;
				dis = 1;
				if(index < 0) {
					dis = 2;
					index++;
				}
			}
			focusAni.call($(this), index, dis, ops);
			//重新添加定时器
			interAnimation(opt);
		}

		//定时器
		function interAnimation(ops) {
			if($(ops.sliderClass).length > 1) {
				futime = setInterval(function() {
					index++;
					if(index > lth - 1) {
						index = 0;
					}
					focusAni.call($obj, index, 0, opt);
				}, 2300);
			}
		}

		//添加分页符
		function addPagetab(ops) {
			var pturl = '<div id="tPagetab" class="tPagetab">';
			for(var i = 0; i < lth; i++) {
				if(i === 0) {
					pturl += '<span class="tpTab TabOn" ></span>';
				} else {
					pturl += '<span class="tpTab"></span>';
				}
			}
			pturl += '</div>';
			$obj.append(pturl);
		}

		function getCalcule(ops) {
			wid = $obj.find(ops.sliderClass).width();
			lth = $obj.find(ops.sliderClass).length;
			$obj.find(ops.sliderClass).css({
				'flex-shrink': '0'
			});
			$obj.find(ops.sliderClass).eq(0).addClass(ops.curSlide);
			$obj.find(ops.sliderClass).eq(1).addClass(ops.nextSlide);
		}

		this.init(options);
	};
	//会员中心加载更多(需要userid)
	$.scrollLoad = function(tsobj, options) {
		var defaults = {
				loadStr: '', //下拉加载栏内容
				loadAppend: 'body', //下拉加载栏加载位置
				itsLoading: 'itsLoading', //下拉加载栏class和id
				addList: '', //需添加列表项
				listCar: '',
				pUrl: '',
				loadingPic: 'http://static.hx2cars.com/resource/web/dist/static/mobile_index/image/loading.gif',
				scrollCallback: null,
				userId: '',
				keyWord: '',
				carCount: 10 //加载页面车数量，默认10
			},
			$obj = $(tsobj),
			opt,
			pagination = 2,
			ifturn = 0,
			ar;

		this.init = function(options) {
			opt = $.extend(false, {}, defaults, options);
			opt.loadStr = '<div class="' + opt.itsLoading + '" id="' + opt.itsLoading + '" style="width:100%;height:30px;background-color:#f6f6f6;color:#333;text-align:center;display:block;line-height:30px;font-size:14px;margin-bottom:60px;">下拉加载更多</div>';
			ar = opt.dataArray;
			if($(opt.addList).length === opt.carCount) {
				$(opt.loadAppend).append(opt.loadStr);
				this.docscroll.call($(document), opt);
			} else {
				$obj.css('margin-bottom', 70);
			}
		};

		this.docscroll = function(ops) {
			this.on({
				'scroll': function() {
					var wheight = $(window).height(), //屏幕高度
						dheight = $(document).height(), //页面总高度
						dscrolltop = $(document).scrollTop(), //滑动高度
						lheight = $(opt.addList).height() * 2, //单个加载内容高度
						hdiscrepancy = dheight - wheight - dscrolltop; //高度差，当为0时，滑倒底部

					if($('#' + ops.itsLoading).is(":hidden")) {
						return false;
					}
					if(hdiscrepancy < lheight && ifturn === 0) {
						ifturn = 1;

						$('#' + ops.itsLoading).show().css('margin-bottom', 70).html('<span style="display:inline-block;height:30px;padding-left:20px;background:url(' + ops.loadingPic + ') left center no-repeat;background-size:16px 16px;">加载中...</span>');
						$.ajax({
							type: 'POST',
							url: ops.pUrl,
							async: false,
							data: {
								keyword: ops.keyWord,
								id: ops.userId,
								pageSize: ops.carCount,
								currPage: pagination
							},
							dataType: 'json',
							success: function(data) {
								if(data) {
									if(data.page.root !== null && data.page.root.length > 0) {
										pagination++;
										ifturn = ops.scrollCallback(data);
										switch(ifturn) {
											case 0:
												$('#' + ops.itsLoading).html('下拉加载更多');
												break;
											case 1: //加载到最后一页
												$('#' + ops.itsLoading).hide();
												$obj.css('margin-bottom', 70);
												break;
											default:
												break;
										}
									} else {
										$('#' + ops.itsLoading).hide();
									}
								}
							}
						});
					}
				}
			});
		};
		this.init(options);
	};
	//列表页下拉加载更多
	$.listScrollLoad = function(tsobj, options) {
		var defaults = {
				ajaxtype: 'POST',
				loadStr: '', //下拉加载栏内容
				loadAppend: 'body', //下拉加载栏加载位置
				itsLoading: 'itsLoading', //下拉加载栏class和id
				addList: '', //需添加列表项
				listCar: '',
				pUrl: '',
				mBottom: 70,
				loadingPic: 'http://static.hx2cars.com/resource/web/dist/static/mobile_index/image/loading.gif',
				scrollCallback: null,
				carCount: 10, //加载页面车数量，默认10
				dataArray: '', //参数组合
				ifturn: 0,
				message: '没有更多车源了',
				changeLoadType: null
			},
			$obj = $(tsobj),
			opt,
			pagination = 2,
			ifturn = 0,
			ar;

		this.init = function(options) {
			opt = $.extend(false, {}, defaults, options);
			opt.loadStr = '<div class="' + opt.itsLoading + '" id="' + opt.itsLoading + '" style="width:100%;height:30px;background-color:#f4f4f4;color:#333;text-align:center;display:block;line-height:30px;font-size:14px;margin-bottom:60px;">下拉加载更多</div>';
			this.docscroll.call($(document), opt);
		};

		this.docscroll = function(ops) {
			var wheight = $(window).height(), //屏幕高度
				dheight = $(document).height(), //页面总高度
				dscrolltop = $(document).scrollTop(), //滑动高度
				lheight = $(opt.addList).height() * 2, //单个加载内容高度
				hdiscrepancy = dheight - wheight - dscrolltop; //高度差，当为0时，滑倒底部
			if($('#' + opt.itsLoading).length === 0) {
				$(ops.loadAppend).after(ops.loadStr);
			}
			if(hdiscrepancy < lheight && ops.ifturn === 0) {
				$('#' + ops.itsLoading).show().css('margin-bottom', ops.mBottom).html('<span style="display:inline-block;height:30px;padding-left:36px;background:url(' + ops.loadingPic + ') left center no-repeat;background-size:36px 36px;">loading...</span>');
				$.ajax({
					type: ops.ajaxtype,
					url: ops.pUrl,
					async: false,
					data: ops.dataArray,
					dataType: 'json',
					success: function(data) {
						if(data) {
							ifturn = ops.scrollCallback(data);
						}
					}
				});
			} else if(ops.ifturn === 1) {
				$('#' + ops.itsLoading).html(ops.message);
			} else if(ops.ifturn === 2) {
				$('#' + ops.itsLoading).hide();
				ops.changeLoadType();
			}
		};
		this.init(options);
	};
	//页面切换滑动-----滑入
	$.blockFly = function(tsobj, options, leth) {
		var defaults = {
				targetId: '', //滑动目标
				flyType: '', //滑动方向，1上2右3下4左
				ifShadow: false, //是否需要阴影，默认false,不需要
				shadowId: 'fly-shadow', //阴影ID，ifShadow为false时，可不填
				shadowColor: '#000', //阴影颜色，默认纯黑色
				shadowOpacity: 0.2, //阴影透明度
				targetLocation: '0', //最终位置，默认0
				beginLocation: '100%', //起始位置，默认100%
				anotherLocation: '0', //另一个坐标轴
				preventDiv: '', //阻止滑动层
				ifClosebutton: true, //是否需要关闭按钮，默认true
				closebuttonId: null, //关闭按钮id
				flyCallback: null, //层弹出前回调函数
				nextCallback: null, //层弹出后回调函数
				closeCallback: null, //点击取消回调函数
				speWay: false //特殊情况 true多个弹出框联动  1取消后不关闭
			},
			$obj = $(tsobj),
			opt, shadowStr,
			newclass;

		this.init = function(options) {
			var sID = setNewclass(defaults.shadowId, leth);
			opt = $.extend({}, defaults, options, {
				shadowId: sID
			});
			shadowStr = '<div id="' + opt.shadowId + '" style="-webkit-tap-highlight-color:transparent;width:100%;height:100%;position:fixed;top:0;left:0;z-index:99;-webkit-transition: all .3s;transition: all .3s;background-color:' + opt.shadowColor + ';opacity:0;display:none;"></div>';
			if(opt.ifShadow) {
				$('body').append(shadowStr);
			}
			switch(opt.flyType) {
				case 1: //从上往下滑
					opt = $.extend({}, opt, {
						beginLocation: '0',
						anotherLocation: '-' + opt.beginLocation,
						targetLocation: '-' + opt.targetLocation
					});
					newclass = setNewclass('fly-top', leth);
					flyVerticality.call($(opt.targetId), opt, newclass, 'bottom');
					break;
				case 2: //从右往左滑
					newclass = setNewclass('fly-right', leth);
					flyHorizontal.call($(opt.targetId), opt, newclass, 'left');
					break;
				case 3: //从下往上滑
					opt = $.extend({}, opt, {
						beginLocation: '0',
						anotherLocation: opt.beginLocation
					});
					newclass = setNewclass('fly-bottom', leth);
					flyVerticality.call($(opt.targetId), opt, newclass, 'top');
					break;
				case 4: //从左往右滑
					opt = $.extend({}, opt, {
						beginLocation: '-' + opt.beginLocation,
						targetLocation: '-' + opt.targetLocation
					});
					newclass = setNewclass('fly-left', leth);
					flyHorizontal.call($(opt.targetId), opt, newclass, 'right');
					break;
				default:
					break;
			}
		};
		//根据同一条件，拼合不同的class
		var setNewclass = function(newclass) {
			return newclass + leth;
		};
		//水平方向
		var flyHorizontal = function(ops, newclass, dir) {
			$(this).css({
				'-webkit-transition': 'all .3s',
				'transition': 'all .3s',
				'left': '0',
				'right': '0',
				'position': 'fixed',
				'transform': 'translate(' + ops.beginLocation + ',0)',
				'-webkit-transform': 'translate(' + ops.beginLocation + ',0)',
				'z-index': 100
			}).css(dir, 'auto').addClass(newclass);
			$obj.off().on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				//回调函数
				if($.type(ops.flyCallback) === 'function') {
					//this为弹出点击按钮
					if(ops.flyCallback.call($(this)) === false) {
						return false;
					}
				}
				$('.' + newclass).css({
					'display': 'block'
				});
				setTimeout(function() {
					$('.' + newclass).css({
						'-webkit-transform': 'translate(' + ops.targetLocation + ',0)',
						'transform': 'translate(' + ops.targetLocation + ',0)'
					});
				}, 0);
				//阻止背景滑动
				docprevent.call($(document), $('.' + newclass), ops);
				//是否需要出现阴影
				if(ops.ifShadow) {
					$('#' + ops.shadowId).show();
					setTimeout(function() {
						$('#' + ops.shadowId).css('opacity', ops.shadowOpacity);
					});
					shadowClose.call($('#' + ops.shadowId), ops, $(this));
				}
				//是否需要添加关闭按钮功能
				if(ops.ifClosebutton) {
					shadowClose.call($(ops.closebuttonId), ops, $(this));
				}
				//回调函数
				if($.type(ops.nextCallback) === 'function') {
					//this为弹出点击按钮
					ops.nextCallback.call($(this));
				}
			});
		};
		//垂直方向
		var flyVerticality = function(ops, newclass, dir) {
			$(this).css({
				'-webkit-transition': 'all .3s',
				'transition': 'all .3s',
				'top': '0',
				'bottom': '0',
				'position': 'fixed',
				'transform': 'translate(0,' + ops.anotherLocation + ')',
				'-webkit-transform': 'translate(0,' + ops.anotherLocation + ')',
				'z-index': 100
			}).css(dir, 'auto').addClass(newclass);
			$obj.off().on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				//回调函数
				if($.type(ops.flyCallback) === 'function') {
					//this为弹出点击按钮
					if(ops.flyCallback.call($(this)) === false) {
						return false;
					}
				}

				$('.' + newclass).css({
					'display': 'block'
				});
				setTimeout(function() {
					$('.' + newclass).css({
						'-webkit-transform': 'translate(0,' + ops.targetLocation + ')',
						'transform': 'translate(0,' + ops.targetLocation + ')'
					});
				}, 0);
				//阻止背景滑动
				docprevent.call($(document), $('.' + newclass), ops);
				if(ops.ifShadow) {
					$('#' + ops.shadowId).show();
					setTimeout(function() {
						$('#' + ops.shadowId).css('opacity', ops.shadowOpacity);
					});
					shadowClose.call($('#' + ops.shadowId), ops, $(this));
				}
				if(ops.ifClosebutton) {
					shadowClose.call($(ops.closebuttonId), ops, $(this));
				}
				//回调函数
				if($.type(ops.nextCallback) === 'function') {
					//this为弹出点击按钮
					ops.nextCallback.call($(this));
				}
			});
		};
		//阻止背景滑动
		var docprevent = function(newclass, ops) {
			if(ops.preventDiv !== '') {
				$(ops.preventDiv).css({
					'height': $(window).height(),
					'overflow': 'hidden'
				});
			}
			$(this).off('touchmove').on('touchmove', function(e) {
				e.preventDefault();
			});
			$(newclass).on('touchmove', function(e) {
				e.stopPropagation();
			});
		};
		//添加滑动
		var docrecover = function(ops) {
			if(ops.preventDiv !== '') {
				$(ops.preventDiv).css({
					'height': 'auto',
					'overflow': 'auto'
				});
			}
			$(this).off('touchmove').on('touchmove', function() {});
		};
		//点击阴影关闭
		var shadowClose = function(ops, ts) {
			$(this).off().on('click', function(e) {
				$(ops.targetId).css({
					'-webkit-transform': 'translate(' + ops.beginLocation + ',' + ops.anotherLocation + ')',
					'transform': 'translate(' + ops.beginLocation + ',' + ops.anotherLocation + ')'
				});
				setTimeout(function() {
					if(ops.speWay === true) {
						if($(ops.targetId).css('x').replace('px', '') == ops.beginLocation && $(ops.targetId).css('y').replace('px', '') == ops.anotherLocation) {
							$(ops.targetId).hide();
						}
					} else if(ops.speWay === 1) {

					} else {
						$(ops.targetId).hide();
					}
				}, 400);
				docrecover.call($(document), ops);
				$('#' + ops.shadowId).css('opacity', 0);
				shadowHide.call($('#' + ops.shadowId));
				//关闭回调函数，this为弹出点击按钮
				if($.type(ops.closeCallback) === 'function') {
					ops.closeCallback.call(ts);
				}
			});
		};
		//阴影消失
		var shadowHide = function() {
			var $ts = $(this);
			setTimeout(function() {
				$ts.hide();
			}, 300);
		};
		this.init(options);
	};

	// 给pc，公用登录用的。
	$.pcNumberCheck = function(tsobj, options) {
		var defaults = {
				mbPic: '', //图片验证码输入框
				picCode: '', //图片验证码
				mbcInput: '', //手机验证码输入框
				obtainCode: '', //手机号码验证码获取按钮
				numberInput: '', //手机号码输入框
				verifyType: '',
				errortype: false,
				specialWay: true, //特殊情况
				checkCallback: null
			},
			$obj = $(tsobj),
			opt;

		this.init = function(options) {
			opt = $.extend({}, defaults, options);
			//获取验证码
			$(opt.obtainCode).off().on({
				'click': cd = function() {
					pctestCode.call($(this), opt, cd);
				}
			});
			//提交
			$obj.off().on({
				'click': function() {
					subCode.call($obj, opt);
				}
			});
			// 手机号码输入框
			$(opt.numberInput).blur(function() {
				var phoneNum = $(this).val();
				if($.phoTest(phoneNum)) {
					$('.errorPhoneText').hide().find('span').html('');
				} else {
					$('.errorPhoneText').show().find('span').html('请输入正确的手机号码');
				}
			});
			// 手机图片验证码输入框
			$(opt.mbPic).blur(function() {
				if($(opt.mbPic).val() !== '') {
					$('.errorpicCodeText').hide();
				}
			});
		};

		//提交
		var subCode = function(ops) {
			var number = $.trim($(ops.numberInput).val()),
				telcode = $.trim($(ops.mbcInput).val()),
				$type = ops.verifyType;
			var checknb = $.phoTest(number);
			if(checknb) {
				if(ops.specialWay) {
					$.post('/code/codenum.json', {
						Number: number,
						Code: telcode,
						type: $type
					}, function(data) {
						if(data.message === '短信验证失败') {
							// $.alertMessage.call($(this), '短信验证码错误');
							$('.errorInfoText').show().find('span').html('短信验证码错误');
						} else {
							ops.checkCallback(data);
						}
					});
				} else {
					//                  ops.checkCallback.call($(this));
					ops.checkCallback.call($(this), {
						number: number,
						telcode: telcode
					});
				}
			} else {
				if(ops.errortype) {
					$('.errorPhoneText').show().find('span').html('请输入正确的手机号码');
				} else {
					$.alertMessage.call($(this), '请输入正确的手机号码');
				}

			}
		};

		//获取验证码
		var pctestCode = function(ops, cd) {
			var $ts = $(this);
			var number = $.trim($(ops.numberInput).val()),
				piccode = $.trim($(ops.mbPic).val());
			var checknb = $.phoTest(number);
			if(checknb) {
				var picCodeLogin = '';
				$.post('/code/mobileJudge.json', {
					'Number': number
				}, function(data) {
					if(data.msg) {
						// true 不需要图片验证码登录。
						picCodeLogin = data.msg;
					} else {
						// false ,需要图片验证码登录。
						picCodeLogin = data.msg;
					}
					var typeObj = data.type;
					var rMessage = $.pctestPicCode.call($ts, $(ops.picCode), piccode, number, cd, '', picCodeLogin, typeObj);
					//4个参数分别为 图片验证码框ID，图片验证码，手机号码，点击事件
					// if (rMessage !== '') $.alertMessage.call($(this), rMessage);
					if(rMessage !== '') $('.errorpicCodeText').show().find('span').html(rMessage);
				});

			} else {
				//$.alertMessage.call($(this), '请输入正确的手机号码');
				$('.errorPhoneText').show().find('span').html('请输入正确的手机号码');
			}
		};

		this.init(options);
	};

	$.numberCheck = function(tsobj, options) {
		var defaults = {
				mbPic: '', //图片验证码输入框
				picCode: '', //图片验证码
				mbcInput: '', //手机验证码输入框
				obtainCode: '', //手机号码验证码获取按钮
				obtainYyCode: '', //手机号码语音验证码获取按钮
				numberInput: '', //手机号码输入框
				ifPiccode: false, //是否要图片验证码框，默认false
				verifyType: '',
				errortype: false, //错误提示类型
				boxType: '',
				specialWay: true, //特殊情况
				checkCallback: null
			},
			$obj = $(tsobj),
			opt;

		this.init = function(options) {
			opt = $.extend({}, defaults, options);
			//获取验证码
			$(opt.obtainCode).off().on({
				'click': cd = function() {
					if(!$(this).hasClass("not")) {
						$(this).addClass("not")
						testCode.call($(this), opt, cd);
					}
				}
			});
			//获取验证码
			$(opt.obtainYyCode).off().on({
				'click': cd = function() {
					testCode1.call($(this), opt, cd);
				}
			});
			//提交
			$obj.off().on({
				'click': function() {
					subCode.call($obj, opt);
				}
			});
			$(opt.numberInput).off().on({
				'focus': function() {
					$(".error1").hide();
				}
			});
			$(opt.mbPic).off().on({
				'focus': function() {
					$(".error1").hide();
				}
			});
			$(opt.mbcInput).off().on({
				'focus': function() {
					$(".error1").hide();
				}
			});
		};

		//提交
		var subCode = function(ops) {
			var number = $.trim($(ops.numberInput).val()),
				telcode = $.trim($(ops.mbcInput).val()),
				type = ops.verifyType;
			var checknb = $.phoTest(number);
			if(checknb) {
				if(ops.specialWay) {
					$.post('/code/codenum.json', {
						Number: number,
						Code: telcode,
						type: type
					}, function(data) {
						if(data.message === '短信验证失败') {
							if(ops.errortype) {
								$.alertMessage1.call($(this), '短信验证码错误');
								// $('.errorCont .errorInfoText').html('短信验证码错误').show();
							} else {
								$.alertMessage2.call($(this), '短信验证码错误');
							}
						} else {
							ops.checkCallback(data);
						}
					});
				} else {
					ops.checkCallback({
						number: number,
						telcode: telcode,
						type: type
					});
				}
			} else {
				if(ops.errortype) {
					$.alertMessage1.call($(this), '请输入正确的手机号码');
					// $('.errorCont .errorPhoneText').html('请输入正确的手机号码').show();
				} else {
					$.alertMessage2.call($(this), '请输入正确的手机号码');
				}
			}
		};

		//获取验证码
		var testCode = function(ops, cd) {
			if(opt.boxType === '30') {
				window._hmt && window._hmt.push(['_trackEvent', '车聊获取验证码按钮pc', 'click']);
			}
			var $ts = $(this);
			var number = $.trim($(ops.numberInput).val()),
				piccode = $.trim($(ops.mbPic).val()),
				type = ops.errortype;
			var checknb = $.phoTest(number);
			if(checknb) {
				var rMessage = $.testPicCode.call($ts, $(ops.picCode), piccode, number, cd, type);
				//5个参数分别为 图片验证码框ID，图片验证码，手机号码，点击事件，错误类型
				if(rMessage !== '') {
					$(opt.obtainCode).removeClass("not")
					if(ops.errortype) {
						$.alertMessage1.call($(this), rMessage);
					} else {
						$.alertMessage.call($(this), rMessage);
					}
				}
			} else {
				$(opt.obtainCode).removeClass("not")
				if(ops.errortype) {
					$.alertMessage1.call($(this), '请输入正确的手机号码');
				} else {
					$.alertMessage2.call($(this), '请输入正确的手机号码');
				}
			}
		};

		//获取语音验证码
		var testCode1 = function(ops, cd) {
			if(opt.boxType === '30') {
				window._hmt && window._hmt.push(['_trackEvent', '车聊获取验证码按钮pc', 'click']);
			}
			var $ts = $(this);
			var number = $.trim($(ops.numberInput).val()),
				piccode = $.trim($(ops.mbPic).val()),
				type = ops.errortype;
			var checknb = $.phoTest(number);
			if(checknb) {
				var rMessage = $.testPicCode1.call($ts, $(ops.picCode), piccode, number, cd, type);
				//5个参数分别为 图片验证码框ID，图片验证码，手机号码，点击事件，错误类型
				if(rMessage !== '') {
					$.alertMessage1.call($(this), rMessage);
				}
			} else {
				$.alertMessage1.call($(this), '请输入正确的手机号码');
			}
		};
		this.init(options);
	};
	var item = 0;
	$.testPicCode1 = function(pic, code, pho, cd, type) {
		var $ts = $(this);
		var redata = '';
		if(item === 0) {
			item = 1;
			if($('.tcCode').parent().css("display") == "none" || code == "") {
				$('.tcCode').parent().show();
				$('.error1').show();
				$('.error1').html('请输入图片验证码');
			} else {
				$.ajax({
					url: '/login/yyyzmpc.json',
					dataType: 'json',
					type: 'post',
					async: false,
					data: {
						phoNum: pho,
						verifyCode: code
					},
					success: function(data) {
						if(data.message == 'success') {
							redata = '获取成功，请保持电话畅通！';
						} else if(data.message == '图片验证码错误') {
							$(pic).click();
							redata = '图片验证码错误!';
						} else if(data.message == 'fail') {
							redata = '您今天的语音验证码次数已满2次！';
						}
					}
				});
			}
			item = 0;
		}
		return redata;
	};

	//车辆第一张图
	$.returnCarsFirstPic = function(staticserverupload, url) {
		var beginhttp = 'http://';
		var rurl;
		if(url.indexOf(beginhttp) > 0) {
			rurl = url;
		} else {
			rurl = staticserverupload + url;
		}
		return rurl;
	};
	//a标签点击跳转
	$.attributeLink = function(url, target) {
		var a = document.createElement('a');
		a.setAttribute('href', url);
		a.setAttribute('target', target);
		$('body').append(a);
		a.click();
		setTimeout(function() {
			$(a).remove();
		}, 0);
	};

	//阻止链接跳转
	$.preveLink = function() {
		var xmlhttp;
		if(window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		} else { // code for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.abort();
		mystop();

		function mystop() {
			if(!!(window.attachEvent && !window.opera)) {
				document.execCommand("stop");
			} else {
				window.stop();
			}
		}
	};
	//获取短信验证码
	var itemp = 0;
	// $.testPicCodeffff = function (pic, code, pho, cd, type) {
	$.pctestPicCode = function(pic, code, pho, cd, type, picLogin, typeObj) {
		var $ts = $(this);
		var redata = '';

		function closeReminder(label, type) {
			window._hmt && window._hmt.push(['_trackEvent', label, 'click']);
			$('.reminderBox,.hxPhoneBg').remove();
			if(type === 1) {
				alert('已收到您的反馈，我们会忙改进功能，感谢您对华夏二手车网的支持!');
			}
		}
		// 非常抱歉，您的短信次数已达上限 温馨提示弹框。
		function aadHtmlReminder() {
			var str = '';
			str += '<div class="modelBox reminderBox">';
			str += '<div class="titleBox">';
			str += '<div class="title">温馨提示</div>';
			str += '<i class="closeBtn"></i>';
			str += '</div>';
			str += '<div>';
			str += '<div class="reminderCont">';
			str += '<i></i>';
			str += '<span class="qtext">非常抱歉，您的短信次数已达上限，今日将暂时关闭您的短信功能，您可以尝试使用扫码登录，账号密码登录或明天再试</span>';
			str += '</div>';
			str += '<p class="kfPhone">如有需要请联系客服协助开启短信功能（‭181 5810 2871‬）</p>';
			str += '<div class="maidian">';
			str += '<span class="complain">不满，抱怨一下</span>';
			str += '<span class="pleased">好的</span>';
			str += '</div>';
			str += '</div>';
			str += '</div>';
			$('.pchxloginCont').remove();
			$('body').append(str);
			$('.complain').click(function() {
				closeReminder('获取验证满5次抱怨', 1)
			});
			$('.pleased').click(function() {
				closeReminder('获取验证满5次关闭')
			});
		}

		if(itemp === 0) {
			itemp = 1;
			if(type && $.cookie('canSend') != '1') {
				$.post('/login/validateCode.json', {
					mobile: pho
				}, function(data) {
					if(data.message == 'success') {
						$('.error1').show();
						$('.error1').html('短信发送成功，请注意查收！');
						//倒计时
						$('.getCode').html('重新发送(60s)').attr('disabled', 'true');
						var n = 60;
						var cdown = setInterval(function() {
							n--;
							$('.getCode').html('重新发送(' + n + 's)');
							if(n === 0) {
								clearInterval(cdown);
								$('.getCode').html('发送短信').on('click').removeAttr('disabled').removeClass("not");
								$('.error1').hide();
							}
						}, 1000);
					} else if(data.message == 'fail') {
						$('.tcCode').parent().show();
						$('.error1').show();
						$('.error1').html('短信发送失败，请重试！');
					}
					$.cookie('canSend', '1', {
						expires: 1
					})
				});
			} else if(picLogin) {
				$('.picCodeBox').addClass('hide');
				// 无需图片验证码，登录
				$.ajax({
					url: '/code/pcoutcodephones.json',
					dataType: 'json',
					type: 'post',
					async: false,
					data: {
						Number: pho
					},
					success: function(data) {
						if(data.message === '短信验证码发送失败，您已超出5条!') {
							//redata = '短信验证码发送失败，您已超出5条!';
							aadHtmlReminder();
							return;
						} else {
							$ts.off('click', cd);
							$.countDown.call($ts, cd);
						}
					}
				});
			} else {
				$('.picCodeBox').removeClass('hide');
				if(code !== '') {
					// else {
					$.ajax({
						url: '/code/codephones.json',
						dataType: 'json',
						type: 'post',
						async: false,
						data: {
							Number: pho,
							verifyCode: code
						},
						success: function(data) {
							if(data.message === '短信验证码发送失败，您已超出5条!') {
								//redata = '短信验证码发送失败，您已超出5条!';
								aadHtmlReminder();
								return;
							} else if(data.message === '图片验证码错误!') {
								$(pic).click();
								redata = '图片验证码错误!';
								$ts.removeClass("not");
							} else {
								$ts.off('click', cd);
								$.countDown.call($ts, cd);
							}
						}
					});
				} else {
					$('.tcCode').parent().show();
					if(Number(typeObj) === 1) {
						redata = '新用户首次登录需图片验证';
					} else if(Number(typeObj) === 2) {
						redata = '检测您近期登录频繁，请先输入图片验证码';
					} else {
						redata = '请输入图片验证码';
					}
				}
			}
			itemp = 0;
		}
		return redata;
	};

	//获取短信验证码
	var item = 0;
	$.testPicCode = function(pic, code, pho, cd, type) {
		var $ts = $(this);
		var redata = '';
		if(item === 0) {
			item = 1;
			if(type && $.cookie('canSend') != '1') {
				$.ajax({
					type: "post",
					url: "/login/validateCode.json",
					async: false,
					success: function(data) {
						//          		}
						//          	});
						//              $.post('/login/validateCode.json', {mobile: pho}, function (data) {
						if(data.message == 'success') {
							$('.error1').show();
							$('.error1').html('短信发送成功，请注意查收！');
							//倒计时
							$('.getCode').html('重新发送(60s)').attr('disabled', 'true');
							var n = 60;
							var cdown = setInterval(function() {
								n--;
								$('.getCode').html('重新发送(' + n + 's)');
								if(n === 0) {
									clearInterval(cdown);
									$('.getCode').html('发送短信').on('click').removeAttr('disabled').removeClass("not");
									$('.error1').hide();
								}
							}, 1000);
						} else if(data.message == 'fail') {
							$('.tcCode').parent().show();
							$('.error1').show();
							$('.error1').html('短信发送失败，请重试！');
							redata = "短信发送失败，请重试！"; //不输入图片验证码登录失败的情况，展示图片,重新尝试；
						}
						$.cookie('canSend', '1', {
							expires: 1
						})
						return redata; //没有返回值，获取验证码按钮将不可点
					}
				});
			} else if(code !== '') {
				$.ajax({
					url: '/code/codephones.json',
					dataType: 'json',
					type: 'post',
					async: false,
					data: {
						Number: pho,
						verifyCode: code
					},
					success: function(data) {
						if(data.message === '短信验证码发送失败，您已超出5条!') {
							redata = '短信验证码发送失败，您已超出5条!';
						} else if(data.message === '图片验证码错误!') {
							$(pic).click();
							redata = '图片验证码错误!';
							$ts.removeClass("not")
						} else {
							$ts.off('click', cd);
							$.countDown.call($ts, cd);
						}
					}
				});
			} else {
				$('.tcCode').parent().show();
				redata = '请输入图片验证码';
			}
			item = 0;
		}
		return redata;
	};

	//倒计时
	$.countDown = function(cd) {
		$(this).html('重新发送(60s)');
		var $ts = $(this),
			n = 60,
			cdown = setInterval(function() {
				n--;
				$ts.html('重新发送(' + n + 's)');
				if(n === 0) {
					clearInterval(cdown);
					$ts.html('获取验证码');
					$ts.on('click', cd).removeClass("not");
				}
			}, 1000);
	};

	//手机号码验证
	$.phoTest = function(pho) {
		var phoformat = /^1\d{10}$/;
		if(!phoformat.test(pho)) {
			return false;
		} else {
			return true;
		}
	};

	//价格数字验证
	$.numTest = function(num) {
		var reg = /^\d+(\.\d+)?$/;
		if(!reg.test(num)) {
			return false;
		} else {
			return true;
		}
	};

	// 邮箱验证
	$.emailTest = function(val) {
		var email = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
		if(!email.test(val)) {
			return false;
		} else {
			return true;
		}
	};

	//金额截取
	$.priceChange = function(data, minlength, maxlength) {
		var price = changeCode(data);
		if(price.indexOf('.') != -1) {
			price = price.split('.');
			price = price[0] + '.' + price[1];
		}
		if(isNaN(price)) {
			price = 0;
		} else {
			if(price.indexOf('.') != -1) {
				price = parseFloat(price).toFixed(2);
				var getprice = price.split('.')[0];
				if(getprice.length > minlength) {
					price = priceSwitch(getprice, maxlength);
				}
			} else {
				if(price.length > minlength) {
					price = priceSwitch(price, maxlength);
				}
			}
		}
		return price;

		function priceSwitch(price, pt) {
			var iflength = price.length;
			var money = 0;
			if(iflength > pt) {
				money = Math.round(price.substring(0, pt - 1) / 10);
			} else {
				money = parseInt(price) / 100;
				money = Math.round(money);
			}
			money = money / 100;
			return money;
		}

		// 全角to半角
		function changeCode(code) {
			for(var i = 0; i < code.length; i++) {
				if(code.charCodeAt(i) == 0x3000) {
					code = code.replace(code.charAt(i), String.fromCharCode(0x20));
				}
				if(code.charCodeAt(i) > 0xFF01 && code.charCodeAt(i) < 0xFF5E) {
					code = code.replace(code.charAt(i), String.fromCharCode(code.charCodeAt(i) - 65248));
				}
			}
			return code;
		}
	};

	//cookie
	$.getCookie = function(cName) {
		if($.cookie(cName)) {
			return $.cookie(cName);
		} else {
			return '';
		}
	};
	$.setCookie = function(options) {
		var defaults = {
				cName: '', //name
				cValue: '', //value
				cStr: '', //已存的cookie
				ifAdd: false, //是否叠加 默认false不叠加
				addLength: 5, //叠加最大长度，默认5
				separator: '|', //cookie分隔符
				cExpires: 365, //时间，默认一年
				cDomain: '.hx2car.com'
			},
			opt;

		this.init = function(options) {
			opt = $.extend({}, defaults, options);
			opt.cStr = $.getCookie(opt.cName);
			if(checkNow(opt)) {
				setNow(opt);
			}
		};
		var checkNow = function(ops) {
			if(ops.cStr.indexOf($.trim(ops.cValue)) == -1) {
				return true;
			} else {
				return false;
			}
		};
		var setNow = function(ops) {
			if(ops.ifAdd) {
				var clength = ops.cStr.split(ops.separator).length - 1;
				if(clength < ops.addLength) {
					ops.cValue += (ops.separator + ops.cStr);
				} else {
					var coar = ops.cStr.split(ops.separator);
					coar.splice(coar.length - 2, 1);
					ops.cValue += (ops.separator + coar.join(ops.separator));
				}
				$.cookie(ops.cName, ops.cValue, {
					expires: ops.cExpires,
					domain: ops.cDomain,
					path: '/'
				});
			} else {
				$.cookie(ops.cName, ops.cValue, {
					expires: ops.cExpires,
					domain: ops.cDomain,
					path: '/'
				});
			}
		};

		this.init(options);
	};

	//手机错误信息弹出框
	$.alertMessage = function(msg) {
		var defaults = {
				outBox: 'outBox',
				messageId: 'messageBox'
			},
			opt,
			$msg = msg;

		var init = function(msg) {
			opt = $.extend({}, defaults);
			var str = '<div style="width:100%;text-align:center;z-index:999;opacity:1;top:50%;bottom:50%;position:fixed;margin:auto 0;height:4.5rem;" class="' + opt.outBox + '"><div class="' + opt.messageId + '" style="max-width:90%;-webkit-transition:all .3s;margin-top:-15%;box-sizing:border-box;-webkit-transform:scale(1.5);display:none;background:rgba(0,0,0,0);color:#fff;font-size:1.5rem;padding:1rem 1.5rem;height:auto;border-radius:0.4rem;line-height:2.5rem;">' + msg + '</div></div>';
			$('.' + opt.outBox).remove();
			$('body').append(str);
			showMessage.call($('.' + opt.messageId), opt, $msg);
		};

		var showMessage = function(ops, msg) {
			var $ts = $(this);
			$(this).show().css({
				'display': 'inline-block'
			});
			setTimeout(function() {
				$ts.css({
					'-webkit-transform': 'scale(1)',
					'background': 'rgba(0,0,0,0.6)'
				});
			}, 0);
			setTimeout(function() {
				$ts.css({
					'opacity': '0'
				});
			}, 2000);
			setTimeout(function() {
				$ts.parent('.' + ops.outBox).remove();
			}, 2300);
		};

		return this.each(function() {
			init($msg);
		});

	};
	//手机错误信息弹出框2
	$.alertMessage1 = function(msg) {
		var defaults = {
				outBox: 'outBox',
				messageId: 'messageBox'
			},
			opt,
			$msg = msg;

		var init = function(msg) {
			opt = $.extend({}, defaults);
			showMessage.call($('.' + opt.messageId), opt, $msg);
		};

		var showMessage = function(ops, msg) {
			$(".error1").show();
			$(".error1").html(msg);
		};

		return this.each(function() {
			init($msg);
		});

	};

	//手机错误信息弹出框3
	$.alertMessage2 = function(msg) {
		var defaults = {
				outBox: 'outBox',
				messageId: 'messageBox'
			},
			opt,
			$msg = msg;

		var init = function(msg) {
			opt = $.extend({}, defaults);
			var str = '<div style="width:100%;text-align:center;z-index:999;opacity:1;top:50%;bottom:50%;position:fixed;margin:auto 0;height:1.5rem;" class="' + opt.outBox + '"><div class="' + opt.messageId + '" style="max-width:90%;-webkit-transition:all .3s;margin-top:-15%;box-sizing:border-box;-webkit-transform:scale(1.5);display:none;background:rgba(0,0,0,0);color:#fff;font-size:0.7rem;padding:0.5rem 1rem;height:auto;border-radius:0.2rem;line-height:0.8rem;">' + msg + '</div></div>';
			$('.' + opt.outBox).remove();
			$('body').append(str);
			showMessage.call($('.' + opt.messageId), opt, $msg);
		};

		var showMessage = function(ops, msg) {
			var $ts = $(this);
			$(this).show().css({
				'display': 'inline-block'
			});
			setTimeout(function() {
				$ts.css({
					'-webkit-transform': 'scale(1)',
					'background': 'rgba(0,0,0,0.6)'
				});
			}, 0);
			setTimeout(function() {
				$ts.css({
					'opacity': '0'
				});
			}, 2000);
			setTimeout(function() {
				$ts.parent('.' + ops.outBox).remove();
			}, 2300);
		};

		return this.each(function() {
			init($msg);
		});

	};
	//tab切换
	$.tabChange = function(tsobj, options) {
		var defaults = {
				addClass: '', //需要添加的class
				acTion: 'click', //动作，默认click
				targetClass: '', //内容切换部分
				tabCallback: null,
				aheadCallback: null //先加载后改变
			},
			$obj = $(tsobj),
			opt, ifnext = 1;

		this.init = function(options) {
			opt = $.extend({}, defaults, options);
			$obj.on(opt.acTion, function() {
				tabNow.call($(this), $obj, opt);
			});
		};

		var tabNow = function(ts, ops) {
			var $target = $(ts);
			var tsindex = $(this).index();
			//回调函数，返回当前点击tab下标
			if($.type(ops.aheadCallback) === 'function') {
				ops.aheadCallback(tsindex);
			}

			if(ops.addClass !== '') {
				$target.removeClass(ops.addClass);
				$(this).addClass(ops.addClass);
			}
			if(ops.targetClass !== '') {
				$(ops.targetClass).hide().eq(tsindex).show();
			}

			//回调函数，返回当前点击tab下标
			if($.type(ops.tabCallback) === 'function') {
				ops.tabCallback(tsindex);
			}
		};
		this.init(options);
	};
	//时间戳格式化 yyyy-MM-dd HH:mm:ss(标准格式，区分大小写)
	$.timeFormat = function(time, type) {
		var newdate = new Date();
		newdate.setTime(time);
		var nyear = newdate.getFullYear();
		var ftime = type;
		var dateitems = {
			'M': newdate.getMonth() + 1,
			'd': newdate.getDate(),
			'H': newdate.getHours(),
			'm': newdate.getMinutes(),
			's': newdate.getSeconds()
		};
		//替换年份
		if(/(y+)/.test(ftime)) {
			ftime = ftime.replace(RegExp.$1, nyear);
		}
		//替换月份以及其他的
		for(var i in dateitems) {
			if(new RegExp('(' + i + '+)').test(ftime)) {
				ftime = ftime.replace(RegExp.$1, RegExp.$1.length === 1 ? dateitems[i] : ('00' + dateitems[i]).substring(('' + dateitems[i]).length));
			}
		}
		return ftime;
	};
	//时间比较
	$.timeCompare = function(time1, time2) {
		var newdate1 = new Date();
		newdate1.setTime(time1);
		var newdate2 = new Date();
		newdate2.setTime(time2);
		var differ = (newdate1 - newdate2) / 24 * 60 * 60 * 1000;
		return differ;
	};

	//手机号码收集提交
	$.collectNumber = function(tsobj, options) {
		var defaults = {
				submitUrl: '/require/commonrequire.json',
				carId: '',
				phoneNumber: '',
				tsType: '',
				tsPrice: ''
			},
			$obj = $(tsobj),
			opt;

		this.init = function(options) {
			opt = $.extend({}, defaults, options);
			submitnow.call($(this), opt);
		};
		var submitnow = function(ops) {
			var $carid = ops.carId,
				$phonenumber = ops.phoneNumber,
				$type = ops.tsType,
				$price = ops.tsPrice;
			if($.phoTest($.trim(ops.phoneNumber))) {
				if($.trim(ops.phoneNumber) !== $.getCookie('phoneNum')) {
					$.setCookie('phoneNum', $.trim(ops.phoneNumber));
				}
				$.post(ops.submitUrl, {
					carId: $carid,
					number: $phonenumber,
					type: $type,
					price: $price
				}, function(data) {
					if(data) {
						ops.subCallback();
					}
				});
			} else {
				$.alertMessage.call($(this), '请输入正确的手机号码');
			}
		};

		this.init(options);
	};
	//canvas画圆  cs:canvas名称
	$.drawRound = function(cs, cx, cy, cr, color) {
		var x = cx;
		var y = cy;
		var r = cr;

		cs.beginPath();
		cs.moveTo(x, y);
		cs.arc(x, y, r, 0, 2 * Math.PI, false);
		cs.closePath();
		cs.fillStyle = color;
		cs.fill();
	};
	//圆形统计图
	$.annulusChart = function(options) {
		var defaults = {
				// canvasName:'',  //canvas
				// efX:'',  //圆心X轴坐标
				// efY:'',  //圆心Y轴坐标
				// annulusWidth:'',  //圆环宽度
				// radius:'',  //半径
				// maxDate: '',  //最大值
				// curDate: '',  //当前值
				// step: '',  //幅度，决定画圆速度
				// fillColor: '',  //圆环颜色
				// bowlR: '',  //两端小圆半径
				// bowlColor: '',  //小圆颜色
				// drawCallback: ''  //回调函数
				// bRadian: ''  //起始位置
			},
			opt,
			ratio;

		this.init = function(options) {
			opt = $.extend({}, defaults, options);
			$.each(opt, function(key, val) {
				drawRound(opt[key]);
			});
		};

		var drawRound = function(rdata) {
			var cvs = rdata.canvasName,
				eX = rdata.efX,
				eY = rdata.efY,
				r = rdata.radius,
				mD = rdata.maxDate,
				cD = rdata.curDate,
				st = rdata.step,
				bRadian = Math.PI * (1.5 - cD / mD),
				lRadian = Math.PI * (1.5 + cD / mD);
			//多个图以相同起始位置
			if($.type(rdata.bRadian) === 'number') {
				bRadian = rdata.bRadian;
			}

			var i = 0;
			var dr = setInterval(function() {
				lRadian = bRadian + 2 * Math.PI * i / mD;

				cvs.clearRect(0, 0, rdata.myCanvas.width, rdata.myCanvas.height);

				if($.type(rdata.prefunBack) === 'function') {
					rdata.prefunBack();
				}

				cvs.beginPath();
				cvs.moveTo(eX, eY);
				cvs.arc(eX, eY, r, bRadian, lRadian, false);
				cvs.closePath();
				cvs.fillStyle = rdata.fillColor;
				cvs.fill();

				if($.type(rdata.drawCallback) === 'function') {
					rdata.drawCallback();
				}
				var runpoint = beginbowlXY(rdata, lRadian);
				drawbowl(rdata, runpoint[0], runpoint[1]);
				if(i >= cD) {
					clearInterval(dr);
				}
				i += st;
			}, 0);
			//绘制起点，返回途经的其他点坐标
			var beginbowlXY = function(rdata, lr) {
				var deg = Math.abs(2 * Math.PI * rdata.curDate / rdata.maxDate - Math.PI) / 2,
					bR = rdata.bowlR,
					bRoundR = rdata.radius - rdata.annulusWidth / 2,
					eX = rdata.efX,
					eY = rdata.efY,
					r = rdata.radius,
					rpoint = [],
					x1, y1;
				//多个图以相同起始位置
				if($.type(rdata.bRadian) === 'number') {
					deg = -rdata.bRadian;
				}
				var rry = Math.sin(deg) * bRoundR;
				var rrx = Math.sqrt(Math.pow(bRoundR, 2) - Math.pow(rry, 2));
				var bX, bY;

				if(rdata.curDate / rdata.maxDate > 0.5) {
					bX = (-rrx + eX);
					bY = (rry + eY);
				} else {
					bX = (-rrx + eX);
					bY = (-rry + eY);
				}
				//多个图以相同起始位置
				if($.type(rdata.bRadian) === 'number') {
					bX = (-rrx + eX);
					bY = (-rry + eY);
				}
				drawbowl(rdata, bX, bY);
				x1 = (-bRoundR * Math.sin(lr - Math.PI / 2)) + eX;
				rpoint.push(x1);
				y1 = (bRoundR * Math.cos(lr - Math.PI / 2)) + eY;
				rpoint.push(y1);

				return rpoint;
			};
			//画起点和终点圆形
			var drawbowl = function(rdata, x, y) {
				var cvs = rdata.canvasName,
					r = rdata.bowlR;

				cvs.beginPath();
				cvs.moveTo(x, y);
				cvs.arc(x, y, r, 0, 2 * Math.PI, false);
				cvs.closePath();
				cvs.fillStyle = rdata.bowlColor;
				cvs.fill();
			};
		};
		this.init(options);
	};

	//返回顶部
	$.hxGototop = function(tsobj, options) {
		var defaults = {
				ifSH: false, //是否添加滑动显示隐藏功能
				showDis: 0, //显示距离
				showID: ''
			},
			opt,
			$obj = $(tsobj);

		this.init = function() {
			opt = $.extend({}, defaults, options);

			$(document).off().on({
				'scroll': function() {
					if(opt.ifSH === true) {
						if($(document).scrollTop() > opt.showDis) {
							$(opt.showID).show();
						} else {
							$(opt.showID).hide();
						}
					}
				}
			});

			$obj.off().on({
				'click': function() {
					gototop.call($('html,body'));
				}
			});
		};

		var gototop = function() {
			$(this).animate({
				scrollTop: 0
			}, 200);
		};

		this.init();
	};
	//手机网页跳APP
	$.hxWaptoapp = function(options) {
		var defaults = {
				appLink: 'myapp://www.hx2car.com',
				//              itunesLink: 'https://itunes.apple.com/cn/app/hua-xia-er-shou-che/id629583556',
				//              androidLink: 'http://static.hx2cars.com/resource/android/hx2car.apk'
				itunesLink: 'http://www.hx2car.com/help/appdown.htm',
				androidLink: 'http://www.hx2car.com/help/appdown.htm'
			},
			index = -1,
			str = '',
			downloadUrl;

		var opt = $.extend({}, defaults, options);
		//      if ($.hxBrowercheck('micromessenger') || $.hxBrowercheck('mqqmobile')) {
		//          if ($.hxBrowercheck('iphone os') || $.hxBrowercheck('ipad')) {
		//              str = '<div id="bgANDROID" class="bgANDROID" style="background: rgba(0,0,0,.5);display:block;position: fixed;top: 0px;z-index: 9999999;width: 100%;height: 100%;"><img src="http://static.hx2cars.com/resource/web/dist/static/mobile/img/download_android2.png" width="100%"></div>';
		//          } else {
		//              str = '<div id="bgANDROID" class="bgANDROID" style="background: rgba(0,0,0,.5);display:block;position: fixed;top: 0px;z-index: 9999999;width: 100%;height: 100%;"><img src="http://static.hx2cars.com/resource/web/dist/static/mobile/img/download_android2.png" width="100%"></div>';
		//          }
		//          $('body').append(str);
		//      } else {
		var t = new Date();
		if($.hxBrowercheck('iphone os') || $.hxBrowercheck('ipad')) {
			location.href = opt.appLink;
			downloadUrl = opt.itunesLink;
		} else {
			// if($.hxBrowercheck('micromessenger') || $.hxBrowercheck('QQ')){
			//     downloadUrl = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.hx.ui'
			// } else {
			var n = document.createElement("iframe");
			n.style.cssText = "width:1px;height:1px;position:fixed;top:0;left:0;";
			n.src = opt.appLink;
			downloadUrl = opt.androidLink;
			$('body').append(n);
			// t = new Date();
			// }
		}
		setTimeout(function() {
			var e = new Date();
			if(1535 > e - t) {
				location.href = downloadUrl;
			}
		}, 1500);
		//      }
	};
	//微信分享朋友圈分享
	$.WXshare = function(options) {
		//调用<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
		var defaults = {
				sTitle: '未设置', //标题
				sDesc: '未设置', //描述
				sLink: '', //点击链接，不能使用短地址
				sImgurl: '', //图标地址
				sWxmember: true,
				sWxfriendround: true
			},
			opt;
		var url = location.href.split('#')[0];

		this.init = function(options) {
			opt = $.extend({}, defaults, options);
			setShare(opt);
		};

		var setShare = function(ops) {
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
					var funcList = [];
					//微信分享
					if(ops.sWxmember) {
						funcList.push('onMenuShareAppMessage');
					}
					//朋友圈分享
					if(ops.sWxfriendround) {
						funcList.push('onMenuShareTimeline');
					}
					var t2 = $.trim(ar[2]),
						t1 = $.trim(ar[1]),
						t4 = $.trim(ar[4]);
					wx.config({
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: 'wxdbe3faf9f857d11d', // 必填，公众号的唯一标识
						timestamp: t2, // 必填，生成签名的时间戳
						nonceStr: t1, // 必填，生成签名的随机串
						signature: t4, // 必填，签名，见附录1
						jsApiList: funcList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					});
					wx.ready(function() {
						if(ops.sWxmember) {
							wx.onMenuShareAppMessage({
								title: ops.sTitle, // 分享标题
								desc: ops.sDesc, // 分享描述
								link: ops.sLink, // 分享链接
								imgUrl: ops.sImgurl // 分享图标
							});
						}
						if(ops.sWxfriendround) {
							wx.onMenuShareTimeline({
								title: ops.sTitle, // 分享标题
								link: ops.sLink, // 分享图标
								imgUrl: ops.sImgurl // 分享图标
							});
						}
					});
				}
			});
		};
		this.init(options);
	};
	//浏览器检测
	$.hxBrowercheck = function(keyword) {
		var ua = navigator.userAgent.toLowerCase();
		var testreg = new RegExp(eval('/' + keyword + '/i'));
		if(ua.match(testreg) == keyword) {
			return true;
		} else {
			return false;
		}
	};
	//移动端登录（加极光验证版本）
	$.waploginJg = function(tsobj, options) {
		var backurl = encodeURIComponent(window.location.pathname);
		var defaults = {
				title: '手机验证', //可以传title
				bannerImgUrl: null, //传图片，
				picstyle: null, //传入图片时，样式不对，可以传个样式进来，只传类名就可以。
				otherDes: '', //有描述时，传入进来，不传就是空。
				loginState: false,
				aftercallback: null,
				beforeCallback: null, //登陆前的回调,如果有,需要返回值true:继续登陆;false:停止后续登陆操作
				redirectUrl: null, //第三方登陆跳转的地址
				backUrl: backurl,
				backCallback: null, //传入true 返回到首页，不传或者传入false，正常关闭登录框
				weixiLogin: true, // 是否需要微信登录
				msg: "", //下方提示文字
				checkedCallback: null //手机登陆回调
			},
			opts,
			$obj = $(tsobj);
		this.init = function(options) {
			opts = $.extend({}, defaults, options);
			opts.redirectUrl = opts.redirectUrl ? opts.redirectUrl : location.href;
			$obj.click(function() {
				if($.type(opts.beforeCallback) == 'function') {
					if(opts.beforeCallback.call($obj)) {
						showLogin();
					}
				} else {
					showLogin();
				}

			});
		};

		//登陆跳转或弹框
		function showLogin() {
			if(!opts.loginState) {
				addHtml();
				addFunc();
				if($.hxBrowercheck('micromessenger') && opts.weixiLogin) {
					var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdbe3faf9f857d11d&redirect_uri=http%3A%2F%2Fm.hx2car.com%2Fsys%2FWQlogin.htm&response_type=code&scope=snsapi_userinfo&state=' + encodeURIComponent(opts.redirectUrl) + ',' + opts.backUrl + '#wechat_redirect';
					$.attributeLink(url, '');
				} else {
					$('._login_box').show();
					docprevent();
					$('._third_party a').attr('href', 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101435816&redirect_uri=http%3A%2F%2Fwww.hx2car.com%2Fsys%2FQQlogin.htm&state=' + opts.redirectUrl + ',' + opts.backUrl + '&display=mobile');
					$('._login_box').css({
						'-webkit-transform': 'translate(0,0)',
						'transform': 'translate(0,0)'
					});
					$(document).scrollTop(0);
				}
			} else {
				if($.type(opts.checkedCallback) == 'function') {
					opts.checkedCallback();
				} else {
					$.attributeLink(opts.redirectUrl, '');
				}
			}
		}

		//添加页面
		function addHtml() {
			var andriodClass = "";
			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
			if(isAndroid) {
				andriodClass = "isAndroid"; //安卓不同样式
			}
			if($('._login_box').length != 0) {
				$('._login_box').remove();
			}
			if(opts.bannerImgUrl !== null) {
				var logo = '<img src="' + opts.bannerImgUrl + '" class="' + opts.picstyle + '">';
			} else {
				var logo = '<p class="_login_logo"></p>';
			}
			var otherDes = opts.otherDes ? opts.otherDes : '';
			//          var str = '<section class="_login_box ' + andriodClass + '" style="display:none;height:' + window.innerHeight + 'px">';
			//          str += '<div class="_login_box_Top"><i class="_backArrow" id="_backArrow"></i>'+opts.title+'</div>';
			//          str += '<div class="_login_box_logo">' + logo + '</div>'+otherDes;
			//          str += '<div class="_login_box_form"><ul class="_login_box_input">';
			//          str += '<li><input type="tel" placeholder="请输入手机号码" id="_login_box_tel"></li>';
			//          str += '<li class="_login_box_code"><input type="number" placeholder="请输入图片验证码" id="_login_box_picCode"><img title="点击刷新" id="_login_box_change_picCode" class="_login_box_change_picCode" src="/servlet/yzCode.jpg" onclick="javascript:this.src=\'/servlet/yzCode.jpg?rnd=\'+Math.random();"></li>';
			//          str += '<li class="_login_box_code"><input type="number" placeholder="请输入手机验证码" id="_login_box_phoneCode"><button id="_login_box_get_picCode" class="_login_box_get_picCode">获取验证码</button></li>';
			//          str += '</ul><button id="_login_box_submit" class="_login_box_submit">确 定</button></div><div class="_third_party">使用其他账号登录<a href="" rel="nofollow"><span class="_third_party_qq"></span>QQ登陆</a>'
			//          if(opts.msg && opts.msg!=""){
			//          	str+="<p class='_login_box_msg'>"+opts.msg+"</p>"
			//          }
			//          str+='</div></section>';
			var str = '<div class="new_login type1 _login_box ' + andriodClass + '">'
			str += ' <span class="new_login_arrow" id="_backArrow"></span>'
			str += ' <div class="new_login_logo  nl_1">'
			str += '     <img src="/resource/web/dist/static/mobile/mindex/images/logo1.png" alt="">'
			str += ' </div>'
			str += ' <p class="nl_title nl_1">手机号快速登录</p>'
			str += ' <p class="nl_title nl_2">手机验证码登录</p>'
			str += ' <label class="nl_label">'
			str += '     <span class="nl_msg">输入手机号</span>'
			str += '     <input type="number" id="_login_box_tel">'
			str += '     <span class="nl_close nl_close_1"></span>'
			str += ' </label>'
			str += ' <label class="nl_label nl_2">'
			str += '         <span class="nl_msg">输入图片验证码</span>'
			str += '         <input type="text" id="_login_box_picCode">'
			str += '     <span class="nl_close"></span>'
			str += '        <div class="nl_right">'
			str += '            <img src="/servlet/yzCode.jpg" onclick="javascript:this.src=\'/servlet/yzCode.jpg?rnd=\'+Math.random();" alt="" id="_login_box_change_picCode">'
			str += '        </div>'
			str += '        </label>'
			str += '<label class="nl_label nl_2">'
			str += '        <span class="nl_msg">输入短信验证码</span>'
			str += '        <input type="text" id="_login_box_phoneCode">'
			str += '        <span class="nl_close"></span>'
			str += '        <div class="nl_right nl_getcode">'
			str += '            <span class="" id="_login_box_get_picCode">获取验证码</span>'
			str += '        </div>'
			str += '    </label>'
			str += '<div class="nl_btn disable  nl_1" id="fast_sub">一键登录</div>'
			str += '<div class="nl_btn disable  nl_2" id="_login_box_submit">登录</div>'
			str += '<div class="nl_bot _third_party">'
			str += '    <p class="nl_other"><span></span>其他方式登录<span></span></p>'
			str += '    <a><img src="/resource/web/dist/static/mobile/mindex/images/qq.png" alt="" class="nl_bot_img">'
			str += '    <p class="nl_bot_msg ">QQ登录</p></a>'
			str += '</div>'
			str += '</div>'

			$('body').prepend(str);
			var box = $("._login_box");
			if($.type(opts.afterCallback) == 'function') {
				opts.afterCallback(box)
			}
		}
		//添加功能
		function addFunc() {
			//手机号码验证
			$('#_login_box_submit').numberCheck({
				mbPic: '#_login_box_picCode', //图片验证码输入框
				picCode: '#_login_box_change_picCode', //图片验证码
				mbcInput: '#_login_box_phoneCode', //手机验证码输入框
				obtainCode: '#_login_box_get_picCode', //手机号码验证码获取按钮
				numberInput: '#_login_box_tel', //手机号码输入框
				checkCallback: checkCallback
			});
			$('#_backArrow').click(function() {
				if(opts.backCallback) { //如果是true,返回到首页
					// opts.backCallback();
					window.location.href = "/";
				} else {
					docrecover();
					$('._login_box').css({
						'-webkit-transform': 'translate(100%,0)',
						'transform': 'translate(100%,0)'
					});
					setTimeout(function() {
						$('._login_box').remove();
					}, 300);
				}
			});
			//添加保存手机号
			$('#_login_box_tel').on('keyup', function() {
				$('#phoneSub').val(this.value);
			})
			$('#_login_box_tel,#_login_box_picCode,#_login_box_phoneCode').on({
				'focus': function(e) {
					$('._login_box').css({
						'height': '1200px'
					});
					setTimeout(() => {
						e.target.scrollIntoView({
							block: 'center',
							behavior: 'smooth'
						});
					}, 100)
				},
				'blur': function(e) {
				$('._login_box').css({
						'height': '100%'
					});
					setTimeout(() => {
						window.scrollTo(0, 0);
					}, 100)
				}
			})

			$(".nl_label input").keydown(function() {
				var closebtn = $(this).siblings(".nl_close");
				if($(this).val().length > 0) {
					closebtn.show();
				} else {
					closebtn.hide();
				}
			})

			//nl_cur当前选中的input的label

			$(".nl_close").click(function() {
				$(this).siblings("input").val("");
				$(this).hide();
			})

			$(".nl_label input").focus(function() {
				gshClass()
				$(this).parent().addClass("nl_cur")
			})

			$(".nl_label input").blur(function() {
				gshClass()
			})

			$("#fast_sub").click(function() {
				if($(this).hasClass("disable")) {
					$.alertMessage2.call($(this), '请输入正确的手机号');
					return false;
				} else {
					if(!jgobj.token) {
						jgobj.getToken(1,jgobj.login);
					} else {
						jgobj.login()
						//			    jgobj.state(false);
					}
				}
			})

			$("#_login_box_tel").focus(function() {
				if($("._login_box").hasClass("type1")) {
					initJg();
				}

			})

			$("#_login_box_tel").keyup(function() {
				var phone = $(this).val();
				if($.phoTest(phone)) {
					$(".nl_btn").removeClass("disable");
					//获取token
					if(!jgobj.token) {
						jgobj.getToken();
					}
				} else {
					$(".nl_btn").addClass("disable")
				}
			})
			$("#_login_box_tel").on('change', function() {
				var phone = $(this).val();
				if($.phoTest(phone)) {
					$(".nl_btn").removeClass("disable");
					//获取token
					if(!jgobj.token) {
						jgobj.getToken();
					}
				} else {
					$(".nl_btn").addClass("disable")
				}
			})

			initJg();
		}

		//初始化极光,第一次会加载js，之后手机号输入时会初始化
		function initJg() {
			if(typeof JVerificationInterface == "undefined") {
				var jg = document.createElement("script");
				jg.src = "https://jverification.jiguang.cn/scripts/jverification-web.min.js";
				$("body").append(jg);
			} else {
				var succ = window.JVerificationInterface.isInitSuccess() //已经初始化成功
				if(succ) return false;
				jgobj.init(jgobj.state);
			}
		}

		var jgobj = {
			init(cb) {
				window.JVerificationInterface.init({
					appkey: "f923147777e4bb41afdfdd76", // 极光官网中创建应用后分配的 appkey，必填
					debugMode: true, // 设置是否开启 debug 模式。true 则会打印更多的日志信息。设置 false 则只会输出 w、e 级别的日志
					fail: function(data) {
						console.error("JVerificationInterface init fail:" + JSON.stringify(data))
						cb(false);
					},
					success: function(data) {
						console.log("JVerificationInterface init success:" + JSON.stringify(data))
						cb(true);
					}
				})
			},
			state(flag) {
				console.log(flag)
				if(!flag) {
					$("._login_box").removeClass("type1")
					$("._login_box").addClass("type2")
				} else {
					$("._login_box").removeClass("type2")
					$("._login_box").addClass("type1")
				}
			},
			token: "",
			getToken(flag,cb) {
				// 获取运营商token，默认尝试顺序：移动>联通>电信
				// 实际使用中建议在初始化成功回掉中调用此接口
				window.JVerificationInterface.getToken({
					fail: function(data) {
						console.error("JVerificationInterface getToken fail:" + JSON.stringify(data));
						if(flag)jgobj.state(false);//点击一键登录时如果不成功就去验证码登录
					},
					success: function(data) {
						var token = data.content;
						jgobj.token = token;
						console.log("JVerificationInterface getToken success:" + token)
						if(typeof cb == "function") cb();
					}
				})
			},
			login() {
				var obj = {
					mobile: $("#_login_box_tel").val(),
					loginToken: jgobj.token
				}
				$.ajax({
					type: "get",
					url: "/wap/jVerifyLogin.json", //等
					data: obj,
					success: function(data) {
						if(data.success) {
							if($.type(opts.checkedCallback) == 'function') {
								opts.checkedCallback(data);
							} else {
								$.attributeLink(opts.redirectUrl, '');
							}
						} else {
							$.alertMessage2.call($(this), '认证失败，请使用验证码登录');
							jgobj.state(false);
						}
					}
				})
			}

		}

		//所有input的状态
		function gshClass() {
			$(".nl_label input").each(function() {
				if($(this).val() == "") {
					$(this).parent().removeClass("nl_cur")
				} else {
					$(this).parent().addClass("nl_cur")

				}
			})
		}

		function checkCallback(data) {
			if($.type(opts.checkedCallback) === 'function') {
				opts.checkedCallback(data);
			} else if(opts.redirectUrl) {
				$.attributeLink(opts.redirectUrl, '');
			}
		}

		//阻止背景滑动
		function docprevent() {
			$('body').css({
				'height': $(window).height(),
				'overflow': 'hidden'
			});
			$("._login_box").off('touchmove').on('touchmove', function(e) {
				e.preventDefault();
			});
			$("body").on('touchmove', function(e) {
				e.preventDefault();
				e.stopPropagation();
				return;
				//alert('touch');
			});
		}

		//添加滑动
		function docrecover() {
			$('body').css({
				'height': 'auto',
				'overflow': 'auto'
			});
			$("body").off('touchmove').on('touchmove', function() {});
		}

		// 登录框 弹出后，光标触发Input，失去焦点后
		$("body").delegate("._login_box_input input", "blur", function() {
			$(document).scrollTop(0);
		})

		this.init(options);
	};

	//移动端登录
	$.waplogin = function(tsobj, options) {
		var backurl = encodeURIComponent(window.location.pathname);
		var defaults = {
				title: '手机验证', //可以传title
				bannerImgUrl: null, //传图片，
				picstyle: null, //传入图片时，样式不对，可以传个样式进来，只传类名就可以。
				otherDes: '', //有描述时，传入进来，不传就是空。
				loginState: false,
				aftercallback: null,
				beforeCallback: null, //登陆前的回调,如果有,需要返回值true:继续登陆;false:停止后续登陆操作
				redirectUrl: null, //第三方登陆跳转的地址
				backUrl: backurl,
				backCallback: null, //传入true 返回到首页，不传或者传入false，正常关闭登录框
				weixiLogin: true, // 是否需要微信登录
				msg: "", //下方提示文字
				checkedCallback: null //手机登陆回调
			},
			opts,
			$obj = $(tsobj);
		this.init = function(options) {
			opts = $.extend({}, defaults, options);
			opts.redirectUrl = opts.redirectUrl ? opts.redirectUrl : location.href;
			$obj.click(function() {
				if($.type(opts.beforeCallback) == 'function') {
					if(opts.beforeCallback.call($obj)) {
						showLogin();
					}
				} else {
					showLogin();
				}

			});
		};

		//登陆跳转或弹框
		function showLogin() {
			if(!opts.loginState) {
				addHtml();
				addFunc();
				if($.hxBrowercheck('micromessenger') && opts.weixiLogin) {
					var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdbe3faf9f857d11d&redirect_uri=http%3A%2F%2Fm.hx2car.com%2Fsys%2FWQlogin.htm&response_type=code&scope=snsapi_userinfo&state=' + encodeURIComponent(opts.redirectUrl) + ',' + opts.backUrl + '#wechat_redirect';
					$.attributeLink(url, '');
				} else {
					$('._login_box').show();
					docprevent();
					$('._third_party a').attr('href', 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101435816&redirect_uri=http%3A%2F%2Fwww.hx2car.com%2Fsys%2FQQlogin.htm&state=' + opts.redirectUrl + ',' + opts.backUrl + '&display=mobile');
					$('._login_box').css({
						'-webkit-transform': 'translate(0,0)',
						'transform': 'translate(0,0)'
					});
					$(document).scrollTop(0);
				}
			} else {
				if($.type(opts.checkedCallback) == 'function') {
					opts.checkedCallback();
				} else {
					$.attributeLink(opts.redirectUrl, '');
				}
			}
		}

		//添加页面
		function addHtml() {
			var andriodClass = "";
			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
			if(isAndroid) {
				andriodClass = "isAndroid"; //安卓不同样式
			}
			if($('._login_box').length != 0) {
				$('._login_box').remove();
			}
			if(opts.bannerImgUrl !== null) {
				var logo = '<img src="' + opts.bannerImgUrl + '" class="' + opts.picstyle + '">';
			} else {
				var logo = '<p class="_login_logo"></p>';
			}
			var otherDes = opts.otherDes ? opts.otherDes : '';
			var str = '<section class="_login_box ' + andriodClass + '" style="display:none;height:' + window.innerHeight + 'px">';
			str += '<div class="_login_box_Top"><i class="_backArrow" id="_backArrow"></i>' + opts.title + '</div>';
			str += '<div class="_login_box_logo">' + logo + '</div>' + otherDes;
			str += '<div class="_login_box_form"><ul class="_login_box_input">';
			str += '<li><input type="tel" placeholder="请输入手机号码" id="_login_box_tel"></li>';
			str += '<li class="_login_box_code"><input type="number" placeholder="请输入图片验证码" id="_login_box_picCode"><img title="点击刷新" id="_login_box_change_picCode" class="_login_box_change_picCode" src="/servlet/yzCode.jpg" onclick="javascript:this.src=\'/servlet/yzCode.jpg?rnd=\'+Math.random();"></li>';
			str += '<li class="_login_box_code"><input type="number" placeholder="请输入手机验证码" id="_login_box_phoneCode"><button id="_login_box_get_picCode" class="_login_box_get_picCode">获取验证码</button></li>';
			str += '</ul><button id="_login_box_submit" class="_login_box_submit">确 定</button></div><div class="_third_party">使用其他账号登录<a href="" rel="nofollow"><span class="_third_party_qq"></span>QQ登陆</a>'
			if(opts.msg && opts.msg != "") {
				str += "<p class='_login_box_msg'>" + opts.msg + "</p>"
			}
			str += '</div></section>';
			$('body').prepend(str);
			var box = $("._login_box");
			if($.type(opts.afterCallback) == 'function') {
				opts.afterCallback(box)
			}
		}

		//添加功能
		function addFunc() {
			//手机号码验证
			$('#_login_box_submit').numberCheck({
				mbPic: '#_login_box_picCode', //图片验证码输入框
				picCode: '#_login_box_change_picCode', //图片验证码
				mbcInput: '#_login_box_phoneCode', //手机验证码输入框
				obtainCode: '#_login_box_get_picCode', //手机号码验证码获取按钮
				numberInput: '#_login_box_tel', //手机号码输入框
				checkCallback: checkCallback
			});
			$('#_backArrow').click(function() {
				if(opts.backCallback) { //如果是true,返回到首页
					// opts.backCallback();
					window.location.href = "/";
				} else {
					docrecover();
					$('._login_box').css({
						'-webkit-transform': 'translate(100%,0)',
						'transform': 'translate(100%,0)'
					});
					setTimeout(function() {
						$('._login_box').remove();
					}, 300);
				}
			});
			//添加保存手机号
			$('#_login_box_tel').on('keyup', function() {
				$('#phoneSub').val(this.value);
			})
			$('#_login_box_tel,#_login_box_picCode,#_login_box_phoneCode').on({
				'focus': function(e) {
					$('._login_box').css({
						'height': '1200px'
					});
					setTimeout(() => {
						e.target.scrollIntoView({
							behavior: 'smooth'
						});
					}, 100)
				},
				'blur': function(e) {
					setTimeout(() => {
						window.scrollTo(0, 0);
					}, 100)
				}
			})
		}

		function checkCallback(data) {
			if($.type(opts.checkedCallback) === 'function') {
				opts.checkedCallback(data);
			} else if(opts.redirectUrl) {
				$.attributeLink(opts.redirectUrl, '');
			}
		}

		//阻止背景滑动
		function docprevent() {
			$('body').css({
				'height': $(window).height(),
				'overflow': 'hidden'
			});
			$("._login_box").off('touchmove').on('touchmove', function(e) {
				e.preventDefault();
			});
			$("body").on('touchmove', function(e) {
				e.preventDefault();
				e.stopPropagation();
				return;
				//alert('touch');
			});
		}

		//添加滑动
		function docrecover() {
			$('body').css({
				'height': 'auto',
				'overflow': 'auto'
			});
			$("body").off('touchmove').on('touchmove', function() {});
		}

		// 登录框 弹出后，光标触发Input，失去焦点后
		$("body").delegate("._login_box_input input", "blur", function() {
			$(document).scrollTop(0);
		})

		this.init(options);
	};

	//时间选择
	$.selectTime = function(obj, options) {
		var defaults = {
			timeFormat: 'yyyy-MM-dd hh:mm:ss',
			hasSecond: true,
			beforeFunction: null
		};
		var opts;
		var $obj = $(obj);
		if(typeof Date.prototype.Format !== 'function') {
			Date.prototype.Format = function(fmt) {
				var o = {
					"M+": this.getMonth() + 1, //月份
					"d+": this.getDate(), //日
					"h+": this.getHours(), //小时
					"m+": this.getMinutes(), //分
					"s+": this.getSeconds() //秒
				};
				if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
				for(var k in o)
					if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
				return fmt;
			}
		}
		this.init = function(options) {
			opts = $.extend({}, defaults, options);
			$obj.click(function(e) {
				e.stopPropagation();
				if(typeof opts.beforeFunction === 'Function') {
					opts.beforeFunction();
				}
				addHtml();
				addEvent();
			});
		};

		var addHtml = function() {
			var left = $obj.offset().left - 1;
			var top = $obj.offset().top + $obj.height() + 5;

			function padZero(str) {
				return('00' + str).substr(str.length);
			}

			if($('.date-wrapper').length === 0) {
				var str = '';
				var hChildNodeStr = '';
				var m_sChildNodeStr = '';
				var classStr = '';

				for(var i = 0; i < 24; i++) {
					classStr = i === 0 ? 'class="active"' : '';
					hChildNodeStr += '<li ' + classStr + '>' + padZero('' + i) + '</li>';
				}
				for(var j = 0; j < 60; j++) {
					classStr = j === 0 ? 'class="active"' : '';
					m_sChildNodeStr += '<li ' + classStr + '>' + padZero('' + j) + '</li>';
				}
				var secondTitleStr = '<p class="' + columnClass + '">秒</p>';
				var secondStr = '<ul class="second' + columnClass + '">' + m_sChildNodeStr + '</ul>';
				var columnClass = 'date-3col';
				if(!opts.hasSecond) {
					columnClass = 'date-2col';
					secondTitleStr = '';
					secondStr = '';
				};
				str += '<div class="date-wrapper" style="left:' + left + 'px;top:' + top + 'px;">' +
					'<div class="date-header">选择时间</div>' +
					'<div class="date-content">' +
					'<div class="date-title">' +
					'<p class="' + columnClass + '">时</p>' +
					'<p class="' + columnClass + '">分</p>' +
					secondTitleStr +
					'</div>' +
					'<div class="date-options">' +
					'<ul class="hours ' + columnClass + '">' + hChildNodeStr + '</ul>' +
					'<ul class="minutes ' + columnClass + '">' + m_sChildNodeStr + '</ul>' +
					secondStr +
					'</div>' +
					'</div>' +
					'<div class="date-footer">' +
					'<div class="date-footer-btns">' +
					'<span class="date-btns-clear">重置</span>' +
					'<span class="date-btns-now">现在</span>' +
					'<span class="date-btns-confirm">确定</span>' +
					'</div>' +
					'</div>' +
					'</div>';
				$('body').append(str);
			} else {
				$('.date-wrapper').css({
					left: left,
					top: top
				});
			}
		};
		var addEvent = function() {
			function addValue(str) {
				if($obj[0].nodeName === 'INPUT') {
					$obj.val(str);
				} else {
					$obj.html(str);
				}
				$('.date-wrapper').remove();
			}

			$('.date-options li').click(function(e) {
				var $this = $(this);
				var height = $this.height();
				var index = $this.index();
				var top = index * height - (3 * height);
				$this.addClass('active').siblings().removeClass('active').parent().scrollTop(top);
			});
			$('.date-btns-clear').click(function(e) {
				e.stopPropagation();
				addValue('');
			});
			$('.date-btns-now').click(function(e) {
				e.stopPropagation();
				var date = new Date();
				var value = date.Format(opts.timeFormat);
				addValue(value);
			});
			$('.date-btns-confirm').click(function(e) {
				e.stopPropagation();
				var str = '';
				$.each($('.date-options ul .active'), function(i, n) {
					str += $.trim($(n).html()) + ':';
				});
				str = str.slice(length - 1) === ':' ? str.slice(0, length - 1) : str;
				addValue(str);
			});
			$(document).click(function(e) {
				if($obj.is(e.target) ||
					$('.date-wrapper').is(e.target) ||
					$('.date-footer-btns span').is(e.target) ||
					$('.date-options li').is(e.target)
				) {
					return;
				}
				$('.date-wrapper').remove();

			})
		};
		this.init(options);
	};
	//时间选择
	$.fn.selectTime = function(options) {
		return this.each(function() {
			new $.selectTime($(this), options);
		});
	};
	//移动端登录(极光)
	$.fn.waploginJg = function(options) {
		return this.each(function() {
			new $.waploginJg($(this), options);
		});
	};
	//移动端登录
	$.fn.waplogin = function(options) {
		return this.each(function() {
			new $.waplogin($(this), options);
		});
	};
	//返回顶部
	$.fn.hxGototop = function(options) {
		return this.each(function() {
			new $.hxGototop($(this), options);
		});
	};
	//圆形统计图
	$.fn.annulusChart = function(options) {
		return this.each(function() {
			new $.annulusChart(options);
		});
	};
	//手机号码收集提交
	$.fn.collectNumber = function(options) {
		return this.each(function() {
			new $.collectNumber($(this), options);
		});
	};
	//微信分享朋友圈分享
	$.fn.WXshare = function(options) {
		return this.each(function() {
			new $.WXshare($(this), options);
		});
	};
	//tab切换
	$.fn.tabChange = function(options) {
		new $.tabChange(this, options);
	};
	//信息弹出框
	$.fn.alertMessage = function(msg) {
		return this.each(function() {
			$.alertMessage.call($(this), msg);
		});
	};
	$.fn.alertMessage2 = function(msg) {
		return this.each(function() {
			$.alertMessage2.call($(this), msg);
		});
	};
	//添加cookie
	$.fn.setCookie = function(options) {
		return this.each(function() {
			new $.setCookie(options);
		});
	};
	//下拉刷新
	$.fn.downDragload = function(options) {
		return this.each(function() {
			new $.downDragload(this, options);
		});
	};
	//touch轮播图
	$.fn.mobileFocus = function(options) {
		return this.each(function() {
			new $.mobileFocus(this, options);
		});
	};
	//链接添加a标签跳转
	$.fn.attributeLink = function(url, target) {
		return this.each(function() {
			new $.attributeLink(url, target);
		});
	};
	//手机号码验证
	$.fn.numberCheck = function(options) {
		return this.each(function() {
			new $.numberCheck(this, options);
		});
	};

	// pc手机号码验证
	$.fn.pcNumberCheck = function(options) {
		return this.each(function() {
			new $.pcNumberCheck(this, options);
		});
	};
	//页面滑入
	var n = 0;
	$.fn.blockFly = function(options) {
		if($(this).length > 1) {
			n++;
			return new $.blockFly(this, options, n);
		}
		return $.each(this, function() {
			n++;
			new $.blockFly(this, options, n);
		});
	};
	//会员中心加载更多(需要userid)
	$.fn.scrollLoad = function(options) {
		return this.each(function() {
			new $.scrollLoad(this, options);
		});
	};
	//列表页下拉加载更多
	$.fn.listScrollLoad = function(options) {
		return this.each(function() {
			new $.listScrollLoad(this, options);
		});
	};

	/*********************************买车vip充值弹框***********************************/
	(function($) {
		$.fn.pcBuyVips = function(options) {
			var defaults = {
					title: '开通买车vip', //默认-充值买车viptitle
					getAppVipJson: '/car/getappvip.json', //默认-充值买车vip套餐
					childtype: 'appvip', //充值时 传入的childtype
					phoneNum: '', //个人登录电话号码
					trackInfo: '', //百度统计描述信息
					payUrl: '', //支付成功后跳转的路径
					id: '', //支付宝，跳转时需要的参数
					refresh: false // 刚登录成功，弹出个人充值框，ture 需页面刷新
				},
				opt;

			opt = $.extend(defaults, options);

			// 支付框生成开始
			addHtml();

			//addFun();

			function addHtml() {
				var str = '';
				str += '<div class="openvipModel">';
				str += '<div class="models"></div>'; //阴影层
				str += '<div class="openVipContainer">';
				str += '<div class="vipBenefit">';
				str += '<div class="titleText">' + opt.title + '</div>';
				str += '<div class="BenefitTextContainer">';
				str += '<ul class="BenefitText"></ul>';
				str += '</div>';
				str += '</div>';
				str += '<div class="vipSetMeal">';
				str += '<i class="closeVip"></i>';
				str += '<p class="stext">请选择套餐：</p>';
				str += '<div class="vipType">';
				str += '<ul class="allType"></ul>';
				str += '<p class="explainText">六个月买车vip</p>';
				str += '</div>';
				str += '<div class="paymentMoney">';
				str += '<p class="payMoney">实付金额：<span class="text1">￥<em class="moneyText">299</em>元</span><span class="text2"></span></p>';
				str += '<p class="payText">请选择支付方式：</p>';
				str += '<ul class="RechargeType">';
				str += '<li class="wechats select"><i></i></li>';
				str += '<li class="alipay"><i></i></li>';
				str += '</ul>';
				str += '<p class="payMoneyBtn">立即支付</p>';
				str += '</div>';
				str += '</div>';
				str += '</div>';
				str += '</div>';
				$('body').append(str);
				addFun();
				//$('.openvipModel').removeClass('hide');
			}

			function addFun() {
				//遍历BenefitText
				$.post(opt.getAppVipJson, {
					mobile: opt.phoneNum
				}, function(data) {
					if(data) {
						var str = '',
							str2 = '';
						if($('BenefitText').html() !== '') {
							for(var i = 0; i < data.content.length; i++) {
								str += '<li><i class=""></i><span>' + data.content[i] + '</span></li>';
							}
							$('.BenefitText').append(str);
						}

						if($('allType').html() !== '') {
							for(var i = 0; i < data.packagevip.length; i++) {
								var vipInfo = data.packagevip[i];
								if(i == 0) {
									str2 += '<li class="select" data-des="' + vipInfo.des + '" data-money="' + vipInfo.money + '" data-id="' + vipInfo.id + '" data-coupon="' + vipInfo.coupon + '">' + vipInfo.title + '<i></i></li>';
									$('.explainText').html(vipInfo.des);
									$('.moneyText').html(vipInfo.money);
								} else {
									str2 += '<li data-des="' + vipInfo.des + '" data-money="' + vipInfo.money + '" data-id="' + vipInfo.id + '" data-coupon="' + vipInfo.coupon + '">' + vipInfo.title + '<i></i></li>';
								}
							}
							$('.allType').append(str2);
						}
					}
				});
				$('.closeVip').click(function() {
					if(opt.refresh) {
						window.location.reload();
					}
					$('.look_num').removeClass('not');
					$('.openvipModel').remove();
				});
				$('.allType').delegate('li', 'click', function() {
					$(this).addClass('select').siblings().removeClass('select');
					var desc = $(this).attr('data-des');
					var money = $(this).attr('data-money');
					var coupon = $(this).attr('data-coupon');
					$('.explainText').html(desc);
					$('.moneyText').html(money);
					if(coupon !== 'undefined') {
						$('.payMoney .text2').html(coupon);
					} else {
						$('.payMoney .text2').html('');
					}
				});
				$('.RechargeType li').click(function() {
					$(this).addClass('select').siblings().removeClass('select');
				});
				$('.paymentMoney').delegate('.payMoneyBtn', 'click', function() {
					window._hmt && window._hmt.push(['_trackEvent', opt.trackInfo, 'click']);
					var money = $('.moneyText').html();
					var imonth = $('.allType li.select').attr('data-id');
					if($('.RechargeType .select').hasClass('wechats')) {
						//微信支付
						jQuery.post('/mobile/weixinQR.json', {
							money: money,
							rechargetype: 1,
							flag: "pc",
							mobile: opt.phoneNum,
							childtype: opt.childtype,
							typeId: imonth
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
									intervalCallback: intervalCallback
								});
							}
						});
					} else {
						//支付宝支付
						//详情页面，跳转
						// if(opt.childtype == 'appvip_phone'){
						//     imonth = opt.id;
						// }
						window.location.href = '/money/submitmember.htm?money=' + money + '&rechargetype=1&childtype=' + opt.childtype + '&mobile=' + opt.phoneNum + '&typeId=' + imonth + '';
					}
				});
			}

			function intervalCallback(acno) {
				jQuery.post('/mobile/xjrechargeres.json', {
					out_trade_no: acno
				}, function(data) {
					if(data) {
						if(data.message == 'success') {
							if(opt.payUrl !== '') {
								window.location.href = opt.payUrl;
							} else {
								window.location.reload();
							}
						}
					}
				});
			}
		}
	})(jQuery);

	$.fn.publicPay = function(obj) {
		var defaults = {
			successCallback: null
		}
		var opts = $.extend(defaults, obj);
		var m = opts.childtype;
		var money = $('.moneyText').html();
		var imonth = $('.allType li.select').attr('data-id');
		if($('.RechargeType .select').hasClass('wechats')) {
			//微信支付
			jQuery.post('/mobile/weixinQR.json', {
				money: money,
				rechargetype: 1,
				flag: "pc",
				mobile: opt.phoneNum,
				childtype: opt.childtype,
				typeId: imonth
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
						intervalCallback: intervalCallback
					});
				}
			});
		} else {
			//支付宝支付
			//详情页面，跳转
			// if(opt.childtype == 'appvip_phone'){
			//     imonth = opt.id;
			// }
			if(m.childtype == 'appvip') {
				window.open('/money/submitmember.htm?money=' + money + '&rechargetype=1&childtype=' + m.childtype + '&mobile=' + m.phoneNum + '&typeId=' + imonth + '');
			} else {
				// window.location.href = '/money/submitRecharge.htm?childtype='+opt.assi_text.type+'_'+opt.assi_text.id+'&rechargetype=1&loginName=' + opt.phoneNum + '&money='+opt.assi_text.money+'&typeId=20' ;
				window.open('/money/submitRecharge.htm?childtype=' + m.assi_text.type + '_' + m.assi_text.id + '&rechargetype=1&loginName=' + m.phoneNum + '&money=0.01&typeId=20');
				getIds(m.assi_text.type, opts.successCallback);
			}
		}

	}

	// pc公共华夏登录弹框
	$.pchxLogin = function($thisobj, options) {
		var defaults = {
				loginState: false,
				boxType: '',
				title: '华夏登录验证',
				redirectPcUrl: null, //第三方登陆跳转的地址
				eventCallback: null, //事件绑定
				checkedCallback: null, //成功后的回调,
				thirdLogin: true, //是否需要第三方登陆按钮
				applogin: true, //是否需要扫码登陆
				sProgramLogin: true,
				carId: '',
				specialWay: true, //特殊情况 为false时必传checkedCallback
				afterCallback: null, //登录框回调
				closeLoginCallback: null //点击关闭按钮回调
			},
			opt,
			$tob = $thisobj;
		var timer, sQrCodeLoginTimer;
		this.init = function() {
			var bindFun;
			opt = $.extend({}, defaults, options);

			try {
				if(!opt.specialWay && $.type(opt.checkedCallback) !== 'function') {
					throw "Err1"
				}
			} catch(er) {
				if(er === "Err1") {
					console.log("Error! 请传入回调函数checkedCallback")
				}
			}
			if($.type(opt.eventCallback) == 'function') {
				bindFun = function() {
					addLoginBox();
					opt.eventCallback();
				};
			} else {
				if(!opt.loginState) {
					bindFun = function() {
						addLoginBox();
						showLoginBox();
					};
				} else {
					if($.type(opt.checkedCallback) == 'function') {
						bindFun = opt.checkedCallback;
					} else {
						bindFun = function() {
							location.reload();
						}
					}
				}
			}
			$tob.on('click', bindFun);
		};

		function addHtml() {
			var str = '';
			var strApploginTitle = '';
			var strThirdLogin = '';
			var strApplogin = '';
			var sProgramLogin = '';
			var marLeftWidth = !opt.sProgramLogin ? 'marLeftWidth' : '';
			if(opt.applogin) {
				$.ajax({
					type: "GET",
					url: "/car/renovatecode.json",
					async: false,
					success: function(data) {
						strApploginTitle += '<span class="lotP">手机扫码<i class="lot"></i></span>';
						strApplogin += '<div class="codeCont" style="display:none;">';
						strApplogin += '<div class="codeImg">';
						strApplogin += '<img class="codepic" src="/servlet/LoginQr.jpg?code=' + data.code + '" alt="" />';
						strApplogin += '<div class="aginLoginBox"><div class="aginLoginBox2"></div><p>二维码已失效</p><span class="againBtn">再次获取</span></div><i class="codepic2"></i>';
						strApplogin += '</div>';
						strApplogin += '<div class="condeText"><i class="codeT"></i><div class="textcont"><p>打开<span>华夏二手车</span>APP</p><p>扫一扫提交</p></div></div>';
						strApplogin += '</div>';
					}
				});
			}
			if(opt.sProgramLogin) {
				sProgramLogin += '    <div class="xchxlogin">';
				sProgramLogin += '    <p class="text text1">微信扫码快捷登录 </p>';
				//              sProgramLogin += '    <p class="text text2">扫描下方小程序码</p>';
				sProgramLogin += '    <div class="xhcxBox">';
				sProgramLogin += '    <img class="xchxCode" src="http://img.hx2cars.com/upload/newimg2/M01/B7/30/Clo8xFybaUyABBUkAABtIDva1jU757.jpg" alt="小程序登录码">';
				sProgramLogin += '    <div class="xchxbg"></div>';
				sProgramLogin += '    <div class="openBtn"><i class=""></i><span class="text">点击登录</span></div>';
				sProgramLogin += '</div>';
				sProgramLogin += '<p class="text text3 hide">打开微信扫一扫</br> <span class="text4">扫描上方二维码</span> 即刻登陆</p>';
				sProgramLogin += '</div>';
			}
			str += '<div class="pchxloginCont ' + marLeftWidth + '" id="phoneNumcheckpage" style="display:none;">';
			str += sProgramLogin;
			str += '<div class="hxlogin">';
			// str += '<div class="title">';
			// if (opt.title != '') {
			//     str += '<span style="width:180px">' + opt.title + '</span>';
			// } else {
			//     str += '<span>华夏验证</span>';
			// }
			// str += '<i class="close"></i></div>';
			str += '';
			str += '<div class="title">';
			str += '<p class="tt title1">' + opt.title + '</p>';
			str += '<p class="tt title2">此车为优质车源，<span class="orange">请登录后查看联系方式</span></p>';
			str += '<i class="close"></i>';
			str += '</div>';
			str += '<div class="optionTab"><span class="active">手机验证</span>';
			str += strApploginTitle;
			str += '</div>';
			str += '<div class="mcheckBox">';
			str += '<ul>';
			str += '<li><input class="inpone" id="mbTel" type="tel" placeholder="请输入您的手机号码"><div class="errorCont errorPhoneText"><i></i><span></span></div></li>';
			str += '<li class="picCodeBox hide"><div><input type="text" id="mbPic" placeholder="图片验证码"><img class="yzcodeBtn" id="mbcPiccode" src="/servlet/yzCode.jpg" onclick="javascript:this.src=&quot;/servlet/yzCode.jpg?rnd=&quot;+Math.random() "alt="点击刷新"></div>';
			str += '<div class="errorCont errorpicCodeText"><i></i><span></span></div></li>';
			str += '<li><div><input type="text" id="mbcInput" placeholder="短信验证码"><span class="yzcodeBtn2" id="mbcObtain">获取验证码</span></div>';
			str += '<div class="errorCont errorInfoText"><i></i><span></span></div></li>';
			str += '<li class="sub"><span class="goLogin" id="mbSubmit">提    交</span></li>';
			str += '</ul>';
			if(opt.thirdLogin) {
				var redirectPcUrl = opt.redirectPcUrl || location.href;
				strThirdLogin += '<div class="loginType">';
				strThirdLogin += '<a href="https://graph.qq.com/oauth2.0/authorize?response_type=code&amp;client_id=101435816&amp;redirect_uri=http%3A%2F%2Fwww.hx2car.com%2Fsys%2FQQlogin.htm&amp;state=' + redirectPcUrl + '"><i class="qq_icon"></i><span>QQ登录</span></a>';
				strThirdLogin += '<a href="https://open.weixin.qq.com/connect/qrconnect?appid=wx2235cd8a4aa85428&amp;redirect_uri=http%3A%2F%2Fwww.hx2car.com%2Fsys%2FWQlogin.htm&amp;response_type=code&amp;scope=snsapi_login&state=' + redirectPcUrl + '#wechat_redirect" class="wx_link"><i class="wx_icon"></i><span>微信登录</span></a>';
				strThirdLogin += '</div>';
			}
			str += strThirdLogin;
			str += '</div>';
			str += strApplogin;
			str += '</div>';
			str += '</div>';
			str += '<div class="hxPhoneBg" style="display:none;"></div>';
			$('body').append(str);
			var box = $("#phoneNumcheckpage");
			if($.type(opt.afterCallback) == 'function') {
				opt.afterCallback(box)
			}

		}

		//添加功能
		function addFunc() {
			//手机号码验证
			$('#mbSubmit').pcNumberCheck({
				mbPic: '#mbPic', //图片验证码输入框
				picCode: '#mbcPiccode', //图片验证码
				mbcInput: '#mbcInput', //手机验证码输入框
				obtainCode: '#mbcObtain', //手机号码验证码获取按钮
				numberInput: '#mbTel', //手机号码输入框
				specialWay: opt.specialWay,
				errortype: true, //错误提示类型
				boxType: opt.boxType,
				checkCallback: checkCallback
			});

			function checkCallback(data) {
				if($.type(opt.checkedCallback) == 'function') {
					removeLoginBox();
					opt.checkedCallback(data);
				} else {
					location.reload();
				}
			}

			function xchxBoxFun() {
				$('.xchxbg,.openBtn').removeClass('hide');
				$("#phoneNumcheckpage .text3").addClass("hide");
				$('.openBtn i').removeClass('loding');
				$('.openBtn .text').html('点击登录');
				$('.openBtn').removeClass('getCode');
			}

			//切换登录方式
			$('.optionTab span').click(function() {
				var index = $(this).index();
				if(index === 0) {
					$('.optionTab .lotP,.againBtn').removeClass('onceClickBtn');
				}
				if(index === 1 && $('.optionTab .lotP').hasClass('onceClickBtn')) {
					return false;
				}
				$('.optionTab span').removeClass('active');
				$(this).addClass('active');
				if(index == 1) {
					// 防止连续点击。
					$('.optionTab span').addClass('onceClickBtn');
					clearInterval(sQrCodeLoginTimer);
					// 复现小程序再次获取。样式
					xchxBoxFun();
				}
				loginType(index);
			});
			//再次获取二维码登录
			$('.againBtn').click(function() {
				if($('.againBtn').hasClass('onceClickBtn')) {
					return false;
				}
				$('.againBtn').addClass('onceClickBtn');
				$.get('/car/renovatecode.json', function(data) {
					if(data) {
						$('.codepic').attr('src', "/servlet/LoginQr.jpg?code=" + data.code);
					}
				});
				loginType(1);
			});
			$('.hxlogin .title .close').click(function() {
				$('.look_num').removeClass('not');
				closeHxlogin();
			});
			//添加保存手机号
			$('#mbTel').on('keyup', function() {
				$('#phoneSub').val(this.value);
			});

			// 获取小程序code。
			$('.openBtn').click(function() {
				if($('.openBtn').hasClass('getCode')) {
					return false;
				}
				$('.openBtn').addClass('getCode');
				$('.openBtn .text').html('正在获取！');
				$('.openBtn i').addClass('loding');
				var unique_cookie = $.cookie('unique_cookie');
				var dataJson = {};
				dataJson.code = unique_cookie;
				opt.carId ? dataJson.id = opt.carId : '';
				$.post('/login/getQrCodeFunction.json', dataJson, function(data) {
					if(data) {
						$('.xchxCode').attr('src', 'data:image/jpeg;base64,' + data.qrcode);
						$('.xchxbg,.openBtn').addClass('hide');
						$("#phoneNumcheckpage .text3").removeClass("hide");
						sQrCodeLogin(unique_cookie);

					}
					//$('.optionTab span').eq(0).click();
				});
				$('.optionTab span').eq(0).click();
			});

			// 小程序扫码登录。
			function sQrCodeLogin(unique_cookie) {
				var count = 0;
				sQrCodeLoginTimer = setInterval(function() {
					count++;
					if(count > (5 * 60)) { //(5*60)
						clearInterval(sQrCodeLoginTimer);
						// 复现小程序再次获取。样式
						xchxBoxFun();
					}
					$.post('/login/smallQrCodeLogin.json', {
						'code': unique_cookie
					}, function(data) {
						if(data.loginstate) {
							clearInterval(sQrCodeLoginTimer);
							if(opt.boxType === 30) { //30代表车聊 自定义
								window._hmt && window._hmt.push(['_trackEvent', '车聊扫码登录', 'click']);
							}
							if($.type(opt.checkedCallback) == 'function') {
								removeLoginBox();
								opt.checkedCallback(data);
							} else {
								window.location.reload();
							}
						}
					});
				}, 1000);
			}

			function loginType(type) {
				if(type == 0) {
					clearInterval(timer);
					$('.mcheckBox').show();
					$('.codeCont').hide();
				} else if(type == 1) {
					$('.mcheckBox').hide();
					$('.codeCont').show();
					$('.aginLoginBox').hide();
					codeLoginFun();
				}
			}

			function codeLoginFun() {
				var count = 0;
				timer = setInterval(function() {
					count++;
					if(count > (5 * 60)) { //(5*60)
						clearInterval(timer);
						$('.aginLoginBox').show();
						$('.againBtn').removeClass('onceClickBtn');
					}
					var CODES = $('.codepic').attr('src').split('=')[1];
					$.post('/login/qrCodeLogin.json', {
						code: CODES,
						redirectUrl: ''
					}, function(data) {
						if(data.isLoginSuccess) {
							clearInterval(timer);
							if(opt.boxType === 30) { //30代表车聊 自定义
								window._hmt && window._hmt.push(['_trackEvent', '车聊扫码登录', 'click']);
							}
							if($.type(opt.checkedCallback) == 'function') {
								removeLoginBox();
								opt.checkedCallback(data);
							} else {
								window.location.reload();
							}
						}
					});
				}, 1000);
			}
		}

		//登录框显示
		function showLoginBox() {
			//添加验证页
			$('.pchxloginCont').show();
			$(".hxPhoneBg").show();
		}

		function addLoginBox() {
			if($('.pchxloginCont').length === 0) {
				addHtml();
				addFunc();
			}
		}

		function removeLoginBox() {
			$('.pchxloginCont').remove();
			$(".hxPhoneBg").remove();
			clearInterval(timer);
			clearInterval(sQrCodeLoginTimer);
		}

		function closeHxlogin() {
			$('.lotP').removeClass('active');
			$('.optionTab span:eq(0)').addClass('active');
			$('.codeCont').hide();
			$('.mcheckBox').show();
			removeLoginBox();
			if($.type(opt.closeLoginCallback) == 'function') {
				opt.closeLoginCallback();
			}
		}

		this.init(options);

	}
	// pc公共华夏登录弹框
	$.fn.pchxLogin = function(options) {
		return this.each(function() {
			new $.pchxLogin($(this), options);
		});
	};

	//wap微信支付获取openid
	$.getWxPayUrl = function(obj) {
		var defaults = {
				byValue: {}, //路径传值 需要时传入
				loginState: null, //当前页面登录状态  ->必须值
				openid: '' //openid,                ->必须值
			},
			opt = $.extend(defaults, obj);
		var userAgent = window.navigator.userAgent;
		var local = window.location;
		var symbol = stringJoin(opt.byValue);
		var goodUrl = 'http://' + local.host + local.pathname + symbol;
		if(loginstate && userAgent.match(/MicroMessenger/i) && opt.openid === '') {
			var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdbe3faf9f857d11d&redirect_uri=' + goodUrl + 'response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
			$(this).attributeLink(url, '');
		}

		function stringJoin(val) {
			var name = '?';
			if(!$.isEmptyObject(val)) {
				for(var i in opt.byValue) {
					name += i + '=' + opt.byValue[i] + '&'
				}
			}
			return name;
		};
	};
	//wap支付公用
	$.wapPay = function(obj) {
		var defaults = {
				money: null, //金额                      ->必须值
				mobile: null, //手机号码                 ->必须值
				childtype: null, //childtype,由后端定义  ->必须值
				rechargetype: null, //充值类型           ->必须值
				orderUrl: '', // 订单接口               ->需要时传入
				orderValue: [], //订单传值
				typeId: '', //订单所返回的订单号码
				openid: '', //微信支付openid           ->必传
				successCallback: null //支付成功的回调
			},
			opt = $.extend(defaults, obj);
		var featureCodes = [];
		var val = opt.orderValue[0];
		featureCodes.push(val);
		if(opt.orderUrl != '') {
			$.ajax({
				type: 'POST',
				url: opt.orderUrl,
				dataType: 'json',
				data: featureCodes[0],
				success: function(res) {
					if(res.id !== 0) {
						opt.typeId = res.id;
						wapPayFun();
					}
				}
			});
		} else {
			wapPayFun();
		}

		function wapPayFun() {
			var userAgent = window.navigator.userAgent;
			if(userAgent.match(/MicroMessenger/i)) {
				// 微信支付
				var begin = userAgent.indexOf('/') + 1;
				var after = userAgent.indexOf('.') + 2;
				var versions = parseInt(userAgent.substring(begin, after));
				if(opt.openid == '') {
					if(userAgent.match(/MicroMessenger/i)) {
						if(versions < 5.0) {
							$.alertMessage.call($(this), '微信版本太低，请升级');
							return;
						} else {
							var local = window.location,
								symbol = '';
							local.search == '' ? symbol = '?' : symbol = '&';
							var goodUrl = 'http://' + local.host + local.pathname + local.search;
							var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdbe3faf9f857d11d&redirect_uri=' + goodUrl + symbol + 'response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
							$(this).attributeLink(url, '');
						}
					} else {
						$.alertMessage.call($(this), '请在微信打开页面并支付');
						return;
					}
				} else {
					$.post('/mobile/WeChartH5.json', {
						money: opt.money,
						rechargetype: opt.rechargetype,
						loginName: opt.mobile,
						childtype: opt.childtype,
						token: opt.openid,
						typeId: opt.typeId
					}, function(data) {
						if(data) {
							var cdata = data.replace(/\"/g, '').replace('{', '').replace('}', '').split(',');

							function onBridgeReady() {
								WeixinJSBridge.invoke(
									'getBrandWCPayRequest', {
										"appId": "wxdbe3faf9f857d11d", //公众号名称，由商户传入
										"timeStamp": $.trim(cdata[1].substring(cdata[1].indexOf(':') + 1)), //时间戳，自1970年以来的秒数
										"nonceStr": $.trim(cdata[2].substring(cdata[2].indexOf(':') + 1)), //随机串
										"package": $.trim(cdata[3].substring(cdata[3].indexOf(':') + 1)),
										"signType": "MD5", //微信签名方式：
										"paySign": $.trim(cdata[5].substring(cdata[5].indexOf(':') + 1)) //微信签名
									},
									function(res) {
										if(res.err_msg == "get_brand_wcpay_request:ok") {
											if(typeof opt.successCallback == 'function') {
												opt.successCallback();
											}
											// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
										} else if(res.err_msg == "get_brand_wcpay_request:fail") {
											$.post('/mobile/weixinQR.json', {
												money: opt.money,
												rechargetype: opt.rechargetype,
												loginName: opt.mobile,
												childtype: opt.childtype,
												token: opt.openid,
												typeId: opt.typeId
											}, function(data) {
												if(data) {
													$("#wechatpay").attr("src", "http://www.hx2car.com/servlet/WeChatQr.jpg?QRurl=" + data.code_url);
													$(".qrCode").show();
												}
											});
										}
									}
								);
							}

							if(typeof WeixinJSBridge == "undefined") {
								if(document.addEventListener) {
									document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
								} else if(document.attachEvent) {
									document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
									document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
								}
							} else {
								onBridgeReady();
							}
						}
					})
				}
			} else {
				//支付宝支付
				window.location.href = '/money/mobilepay.htm?typeId=' + opt.typeId + '&money=' + opt.money + '&loginName=' + opt.mobile + '&childtype=' + opt.childtype + '&rechargetype=' + opt.rechargetype;
			}
		}
	}

})(jQuery);

// $(function() {
// 	(function() {
// 		function IsPC() {
// 			var userAgentInfo = navigator.userAgent;
// 			var Agents = ["Android", "iPhone",
// 				"SymbianOS", "Windows Phone",
// 				"iPad", "iPod"
// 			];
// 			var flag = true;
// 			for(var v = 0; v < Agents.length; v++) {
// 				if(userAgentInfo.indexOf(Agents[v]) > 0) {
// 					flag = false;
// 					break;
// 				}
// 			}
// 			return flag;
// 		}

// 		var aes = '<div class="msg-bottom" style="width: 100%;height:12.2vw;position:relative;"><div class="model-bg" style="width: 100%;height: 100%;background:url(http://static.hx2cars.com/resource/web/dist/static/mobpages/images/aesbg0.jpg) no-repeat center center;background-size:100%;position: absolute;top: 0;z-index: 0;"></div><div class="msg-content" style="position: relative;height: 100%;"><i class="closes" style="width: 3vw;height: 3vw; position: absolute;top: 16%;right: 2vw;background: transparent;"><img src="http://static.hx2cars.com/resource/web/dist/static/mobpages/images/close-org.png" style="width: 100%;margin:0;"/></i><div class="right toDowloae" style="width: 20.7%;height:8vw;float: right;background: #f60;color: #fff;text-align: center;font-size: 1.25rem;line-height:8vw;margin-top:2vw;margin-right:6vw;border-radius:1rem;">快速下载</div></div></div>';
// 		if(!IsPC() && getQueryString("from") != 'appClient' && $('.msg-bottom').length === 0) {
// 			$('body').prepend(aes);
// 			$.post('/wap/firstRegister.json', {}, function(data) {
// 				if(data.register == 1 || data.msg == '未登录') {
// 					$('.model-bg').css({
// 						'background': 'url(http://static.hx2cars.com/resource/web/dist/static/mobpages/images/aesbg1.jpg) no-repeat center center',
// 						'background-size': '100%'
// 					});
// 				}
// 			});
// 		}
// 		$(".msg-bottom .closes").click(function() {
// 			$(".msg-bottom").slideUp();
// 		});

// 		$('.toDowloae').click(function() {
// 			$.hxWaptoapp();
// 		});
// 	})();
// });

//获取url参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = decodeURI(window.location.search.substr(1)).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

//全局字体设置，不调用不显示效果
function CommonFontSize(width) {
	var width = width || 1242;
	!function(e, t) {
		var r = e.documentElement,
			o = "orientationchange" in window ? "orientationchange" : "resize",
			i = function() {
				var e = r.clientWidth;
				var t = r.clientHeight;
				if(!e)
					return;
				if(e >= width) {
					r.style.fontSize = "100px"
				} else {
					r.style.fontSize = 100 * (e / width) + "px"
				}
			};
		i();
		if(!e.addEventListener)
			return;
		t.addEventListener(o, i, false);
		e.addEventListener("DOMContentLoaded", i, false)
	}(document, window);
}

/**
 * 禁用动态添加脚本，防止广告加载
 *
 * @param valid bool? true(valid)|false(invalid)|other(off)
 * @param rule array 配置允许(valid)|不允许(invalid)的脚本规则：支持regex、string、function
 */
if(!$.hxBrowercheck('MSIE')){
(function(valid, rule) {
	if(typeof Element === 'undefined') {
		//      	console.log('IE8以下浏览器无效');
		return false;
	}
	var origin = new RegExp('^' + location.origin),
		Ele = Element;
	each(['appendChild', 'insertBefore', 'insertAfter'], proxy);

	function proxy(prop) {
		var proxy_obj = Ele.prototype[prop];
		Ele.prototype[prop] = function(elem) {
			if(elem.children && !elem.children.length) {
				var tag = elem.tagName.toLowerCase();
				if(tag == 'script' && isBanScript(elem)) {
					//                      console.log('禁用脚本：' + elem.src);
					var substitute = document.createElement('script');
					// substitute.innerHTML = '// 禁用脚本：' + elem.src;
					elem = substitute;
				}
			}
			return proxy_obj.apply(this, arguments);
		};
	}

	function isBanScript(script) {
		//          if (origin.test(script.src)) return false;
		for(var i = 0; i < rule.length; i++) {
//			console.log(script.src)
			if(script.src.indexOf(rule[i]) >= 0 || script.src == '') {
				return false;
			}
		}
		if(origin.test(script.src)) return false;
		return valid === each(rule, match);

		function match(val) {
			var type = typeof val;
			if(type === 'string') {
				if(script.src == val) return true;
			} else if(type === 'function') {
				if(val(script)) return true;
			} else {
				if(val.test(script.src)) return true;
			}
			return false;
		}
	}

	function each(arr, fn) {
		if(arr) {
			for(var i = 0, n = arr.length; i < n; i++) {
				if(fn.call(arr[i], arr[i], i) === true) return false;
			}
		}
		return true;
	}
})(true, ['http://hm.baidu.com/hm.js?5b941f460f2ec63730c9f325ba44961f', 'http://hm.baidu.com//hm.js?5b941f460f2ec63730c9f325ba44961f', 'http://api.map.baidu.com/', 'bdimg.share.baidu.com', 'api0.map.bdimg.com/getmodules', 'baidu.com', 'jverification.jiguang.cn', 'www.cmpassport.com','auth-ujssdk']);
}