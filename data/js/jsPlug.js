(function ($) {
    //下拉刷新
    $.downDragload = function (tsobj, options) {
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

        this.init = function (options) {
            opt = $.extend(false, {}, defaults, options);
            var dragstr = '';
            switch (opt.choiceStyle) {
                case 1:
                    dragstr = '<div class="topLoad" id="topLoad" style="width: 100%;height: 6rem;background-color: #f6f6f6;position: absolute;z-index:-1;top: -6rem;' + opt.drStyle + '"><p style="width: 100%;text-align: center;height: 5rem;line-height: 5rem;font-size: 1.5rem;position: absolute;bottom: 0;left: 0;z-index:-1;' + opt.drpStyle + '"><img src = "https://static.hx2car.com/resource/web/mobpages/images/mindex/toplogo.png" style="width:1.8rem;height:1.8rem;display:inline-block;vertical-align: middle;margin: 0 0.5rem 0 0;"><span class="dragSpan" style="vertical-align: middle;color:#333">下拉刷新页面</span></p></div>';
                    break;
                default:
                    break;
            }
            //添加加载动画
            $(opt.dragAppend).prepend(dragstr);

            //绑定滑动事件
            $obj.off('touchstart').on({
                'touchstart': function (e) {
                    //判断手指个数
                    if (e.originalEvent.touches.length > 1) {
                        $(this).off('touchmove').off('touchend');
                        return;
                    }
                    var touchs = e.originalEvent.targetTouches[0];
                    dragStart.call($(this), opt, touchs);
                }
            });
        };

        function dragStart(ops, touch) {
            startPoint = {
                y: touch.pageY
            };
            $(this).off('touchmove').on({
                'touchmove': function (e) {
                    if (e.originalEvent.touches.length > 1) {
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
            if (scrtop === 0) {
                endPoint = {
                    y: touch.pageY
                };
                var hmove = (endPoint.y - startPoint.y) / 3;
                if (hmove > 0) {
                    es.preventDefault();
                    if (hmove > 60) {
                        $('.topLoad .dragSpan').html('松开刷新页面');
                        $(this).off('touchend').on('touchend', function (e) {
                            trueEnd.call($(this), ops);
                        });
                    } else {
                        $(this).off('touchend').on('touchend', function (e) {
                            falseEnd.call($(this));
                        });
                    }
                    $obj.css({
                        'y': hmove + 'px',
                        'transition-duration': '0s',
                        '-webkit-transition-duration': '0s'
                    });
                    var rdeg = '-' + (hmove * 6) + 'deg';
                    switch (ops.choiceStyle) {
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
            var tsend = $(this);
            $(this).css({
                'y': '5rem',
                'transition-duration': '.3s',
                '-webkit-transition-duration': '.3s'
            });
            setTimeout(function () {
                if ($.type(ops.dragCallback) === 'function') {
                    var ifgo = ops.dragCallback();
                    if (ifgo === 1) {
                        setTimeout(function () {
                            falseEnd.call(tsend);
                        }, 1000);
                    }
                }
            }, 300);
            $(this).off('touchend').off('touchmove');
            $('.topLoad .dragSpan').html('刷新中...');
            switch (ops.choiceStyle) {
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
            $('body').on('touchmove', function () {
            });

            $('.topLoad .dragSpan').html('下拉刷新页面');
        }

        this.init(options);
    };

    //touch轮播图
    $.mobileFocus = function (tsobj, options) {
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

        this.init = function (options) {
            opt = $.extend(false, {}, defaults, options);
            //计算
            getCalcule(opt);
            //添加分页符
            if (opt.ifPagetab) {
                addPagetab(opt);
            }
            //绑定滑动事件
            $obj.off('touchstart').on({
                'touchstart': function (e) {
                    e.preventDefault();
                    //判断手指个数
                    if (e.originalEvent.touches.length > 1) {
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
        var focusAni = function (idx, n, ops) {
            var idxnext = idx + 1;
            if (idxnext > lth - 1) {
                idxnext = 0;
            }

            $obj.find(ops.sliderClass).removeClass(ops.curSlide).eq(idx).addClass(ops.curSlide);
            $obj.find('.tpTab').removeClass('TabOn').eq(idx).addClass('TabOn');
            if (lth > 1) {
                $obj.find(ops.sliderClass).removeClass(ops.nextSlide).eq(idxnext).addClass(ops.nextSlide);
            }

            var itmove = '-' + (wid * index);
            //首尾两张
            if (n == 2) {
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
            if ($.type(ops.pagetabCallback) == 'function') {
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
                'touchmove': function (e) {
                    e.preventDefault();
                    if (e.originalEvent.touches.length > 1) {
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
                'touchend': function (e) {
                    e.preventDefault();
                    if (e.originalEvent.touches.length > 1) {
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
            if ((endPoint.x - startPoint.x) < -55) {
                index++;
                dis = 0;
                if (index > lth - 1) {
                    dis = 2;
                    index--;
                }
            }
            if ((endPoint.x - startPoint.x) > 55) {
                index--;
                dis = 1;
                if (index < 0) {
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
            if ($(ops.sliderClass).length > 1) {
                futime = setInterval(function () {
                    index++;
                    if (index > lth - 1) {
                        index = 0;
                    }
                    focusAni.call($obj, index, 0, opt);
                }, 2300);
            }
        }

        //添加分页符
        function addPagetab(ops) {
            var pturl = '<div id="tPagetab" class="tPagetab">';
            for (var i = 0; i < lth; i++) {
                if (i === 0) {
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
    $.scrollLoad = function (tsobj, options) {
        var defaults = {
                loadStr: '', //下拉加载栏内容
                loadAppend: 'body', //下拉加载栏加载位置
                itsLoading: 'itsLoading', //下拉加载栏class和id
                addList: '', //需添加列表项
                listCar: '',
                pUrl: '',
                loadingPic: 'https://static.hx2car.com/resource/web/mobile_index/image/loading.gif',
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

        this.init = function (options) {
            opt = $.extend(false, {}, defaults, options);
            opt.loadStr = '<div class="' + opt.itsLoading + '" id="' + opt.itsLoading + '" style="width:100%;height:30px;background-color:#f6f6f6;color:#333;text-align:center;display:block;line-height:30px;font-size:14px;margin-bottom:60px;">下拉加载更多</div>';
            ar = opt.dataArray;
            if ($(opt.addList).length === opt.carCount) {
                $(opt.loadAppend).append(opt.loadStr);
                this.docscroll.call($(document), opt);
            } else {
                $obj.css('margin-bottom', 70);
            }
        };

        this.docscroll = function (ops) {
            this.on({
                'scroll': function () {
                    var wheight = $(window).height(), //屏幕高度
                        dheight = $(document).height(), //页面总高度
                        dscrolltop = $(document).scrollTop(), //滑动高度
                        lheight = $(opt.addList).height() * 2, //单个加载内容高度
                        hdiscrepancy = dheight - wheight - dscrolltop; //高度差，当为0时，滑倒底部

                    if ($('#' + ops.itsLoading).is(":hidden")) {
                        return false;
                    }
                    if (hdiscrepancy < lheight && ifturn === 0) {
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
                            success: function (data) {
                                if (data) {
                                    if (data.page.root !== null && data.page.root.length > 0) {
                                        pagination++;
                                        ifturn = ops.scrollCallback(data);
                                        switch (ifturn) {
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
    $.listScrollLoad = function (tsobj, options) {
        var defaults = {
                loadStr: '', //下拉加载栏内容
                loadAppend: 'body', //下拉加载栏加载位置
                itsLoading: 'itsLoading', //下拉加载栏class和id
                addList: '', //需添加列表项
                listCar: '',
                pUrl: '',
                mBottom: 70,
                loadingPic: 'https://static.hx2car.com/resource/web/mobile_index/image/loading.gif',
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

        this.init = function (options) {
            opt = $.extend(false, {}, defaults, options);
            opt.loadStr = '<div class="' + opt.itsLoading + '" id="' + opt.itsLoading + '" style="width:100%;height:30px;background-color:#f4f4f4;color:#333;text-align:center;display:block;line-height:30px;font-size:14px;margin-bottom:60px;">下拉加载更多</div>';
            this.docscroll.call($(document), opt);
        };

        this.docscroll = function (ops) {
            var wheight = $(window).height(), //屏幕高度
                dheight = $(document).height(), //页面总高度
                dscrolltop = $(document).scrollTop(), //滑动高度
                lheight = $(opt.addList).height() * 2, //单个加载内容高度
                hdiscrepancy = dheight - wheight - dscrolltop; //高度差，当为0时，滑倒底部
            if ($('#' + opt.itsLoading).length === 0) {
                $(ops.loadAppend).after(ops.loadStr);
            }
            if (hdiscrepancy < lheight && ops.ifturn === 0) {
                $('#' + ops.itsLoading).show().css('margin-bottom', ops.mBottom).html('<span style="display:inline-block;height:30px;padding-left:36px;background:url(' + ops.loadingPic + ') left center no-repeat;background-size:36px 36px;">加载中...</span>');
                $.ajax({
                    type: 'POST',
                    url: ops.pUrl,
                    async: false,
                    data: ops.dataArray,
                    dataType: 'json',
                    success: function (data) {
                        if (data) {
                            ifturn = ops.scrollCallback(data);
                        }
                    }
                });
            } else if (ops.ifturn === 1) {
                $('#' + ops.itsLoading).html(ops.message);
            } else if (ops.ifturn === 2) {
                $('#' + ops.itsLoading).hide();
                ops.changeLoadType();
            }
        };
        this.init(options);
    };
    //页面切换滑动-----滑入
    $.blockFly = function (tsobj, options, leth) {
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

        this.init = function (options) {
            var sID = setNewclass(defaults.shadowId, leth);
            opt = $.extend({}, defaults, options, {shadowId: sID});
            shadowStr = '<div id="' + opt.shadowId + '" style="-webkit-tap-highlight-color:transparent;width:100%;height:100%;position:fixed;top:0;left:0;z-index:99;-webkit-transition: all .3s;transition: all .3s;background-color:' + opt.shadowColor + ';opacity:0;display:none;"></div>';
            if (opt.ifShadow) {
                $('body').append(shadowStr);
            }
            switch (opt.flyType) {
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
        var setNewclass = function (newclass) {
            return newclass + leth;
        };
        //水平方向
        var flyHorizontal = function (ops, newclass, dir) {
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
            $obj.off().on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                //回调函数
                if ($.type(ops.flyCallback) === 'function') {
                    //this为弹出点击按钮
                    if (ops.flyCallback.call($(this)) === false) {
                        return false;
                    }
                }
                $('.' + newclass).css({
                    'display': 'block'
                });
                setTimeout(function () {
                    $('.' + newclass).css({
                        '-webkit-transform': 'translate(' + ops.targetLocation + ',0)',
                        'transform': 'translate(' + ops.targetLocation + ',0)'
                    });
                }, 0);
                //阻止背景滑动
                docprevent.call($(document), $('.' + newclass), ops);
                //是否需要出现阴影
                if (ops.ifShadow) {
                    $('#' + ops.shadowId).show();
                    setTimeout(function () {
                        $('#' + ops.shadowId).css('opacity', ops.shadowOpacity);
                    });
                    shadowClose.call($('#' + ops.shadowId), ops, $(this));
                }
                //是否需要添加关闭按钮功能
                if (ops.ifClosebutton) {
                    shadowClose.call($(ops.closebuttonId), ops, $(this));
                }
                //回调函数
                if ($.type(ops.nextCallback) === 'function') {
                    //this为弹出点击按钮
                    ops.nextCallback.call($(this));
                }
            });
        };
        //垂直方向
        var flyVerticality = function (ops, newclass, dir) {
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
            $obj.off().on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                //回调函数
                if ($.type(ops.flyCallback) === 'function') {
                    //this为弹出点击按钮
                    if (ops.flyCallback.call($(this)) === false) {
                        return false;
                    }
                }

                $('.' + newclass).css({
                    'display': 'block'
                });
                setTimeout(function () {
                    $('.' + newclass).css({
                        '-webkit-transform': 'translate(0,' + ops.targetLocation + ')',
                        'transform': 'translate(0,' + ops.targetLocation + ')'
                    });
                }, 0);
                //阻止背景滑动
                docprevent.call($(document), $('.' + newclass), ops);
                if (ops.ifShadow) {
                    $('#' + ops.shadowId).show();
                    setTimeout(function () {
                        $('#' + ops.shadowId).css('opacity', ops.shadowOpacity);
                    });
                    shadowClose.call($('#' + ops.shadowId), ops, $(this));
                }
                if (ops.ifClosebutton) {
                    shadowClose.call($(ops.closebuttonId), ops, $(this));
                }
                //回调函数
                if ($.type(ops.nextCallback) === 'function') {
                    //this为弹出点击按钮
                    ops.nextCallback.call($(this));
                }
            });
        };
        //阻止背景滑动
        var docprevent = function (newclass, ops) {
            if (ops.preventDiv !== '') {
                $(ops.preventDiv).css({
                    'height': $(window).height(),
                    'overflow': 'hidden'
                });
            }
            $(this).off('touchmove').on('touchmove', function (e) {
                e.preventDefault();
            });
            $(newclass).on('touchmove', function (e) {
                e.stopPropagation();
            });
        };
        //添加滑动
        var docrecover = function (ops) {
            if (ops.preventDiv !== '') {
                $(ops.preventDiv).css({
                    'height': 'auto',
                    'overflow': 'auto'
                });
            }
            $(this).off('touchmove').on('touchmove', function () {
            });
        };
        //点击阴影关闭
        var shadowClose = function (ops, ts) {
            $(this).off().on('click', function (e) {
                $(ops.targetId).css({
                    '-webkit-transform': 'translate(' + ops.beginLocation + ',' + ops.anotherLocation + ')',
                    'transform': 'translate(' + ops.beginLocation + ',' + ops.anotherLocation + ')'
                });
                setTimeout(function () {
                    if (ops.speWay === true) {
                        if ($(ops.targetId).css('x').replace('px', '') == ops.beginLocation && $(ops.targetId).css('y').replace('px', '') == ops.anotherLocation) {
                            $(ops.targetId).hide();
                        }
                    } else if (ops.speWay === 1) {

                    } else {
                        $(ops.targetId).hide();
                    }
                }, 400);
                docrecover.call($(document), ops);
                $('#' + ops.shadowId).css('opacity', 0);
                shadowHide.call($('#' + ops.shadowId));
                //关闭回调函数，this为弹出点击按钮
                if ($.type(ops.closeCallback) === 'function') {
                    ops.closeCallback.call(ts);
                }
            });
        };
        //阴影消失
        var shadowHide = function () {
            var $ts = $(this);
            setTimeout(function () {
                $ts.hide();
            }, 300);
        };
        this.init(options);
    };
    $.numberCheck = function (tsobj, options) {
        var defaults = {
                mbPic: '', //图片验证码输入框
                picCode: '', //图片验证码
                mbcInput: '', //手机验证码输入框
                obtainCode: '', //手机号码验证码获取按钮
                numberInput: '', //手机号码输入框
                verifyType: '',
                specialWay: true, //特殊情况
                checkCallback: null
            },
            $obj = $(tsobj),
            opt;

        this.init = function (options) {
            opt = $.extend({}, defaults, options);
            //获取验证码
            $(opt.obtainCode).off().on({
                'click': cd = function () {
                    testCode.call($(this), opt, cd);
                }
            });
            //提交
            $obj.off().on({
                'click': function () {
                    subCode.call($obj, opt);
                }
            });
        };

        //提交
        var subCode = function (ops) {
            var number = $.trim($(ops.numberInput).val()),
                telcode = $.trim($(ops.mbcInput).val()),
                type = ops.verifyType;
            var checknb = $.phoTest(number);
            if (checknb) {
                if (ops.specialWay) {
                    $.post('/code/codenum.json', {
                        Number: number,
                        Code: telcode,
                        type: type
                    }, function (data) {
                        if (data.message === '短信验证失败') {
                            $.alertMessage.call($(this), '短信验证码错误');
                        } else {
                            ops.checkCallback(data);
                        }
                    });
                } else {
                    ops.checkCallback({
                        number:number,
                        telcode:telcode,
                        type:type
                    });
                }
            } else {
                $.alertMessage.call($(this), '请输入正确的手机号码');
            }
        };

        //获取验证码
        var testCode = function (ops, cd) {
            var $ts = $(this);
            var number = $.trim($(ops.numberInput).val()),
                piccode = $.trim($(ops.mbPic).val());
            var checknb = $.phoTest(number);
            if (checknb) {
                var rMessage = $.testPicCode.call($ts, $(ops.picCode), piccode, number, cd);
                //4个参数分别为 图片验证码框ID，图片验证码，手机号码，点击事件
                if (rMessage !== '') $.alertMessage.call($(this), rMessage);
            } else {
                $.alertMessage.call($(this), '请输入正确的手机号码');
            }
        };

        this.init(options);
    };
    //车辆第一张图
    $.returnCarsFirstPic = function (staticserverupload, url) {
        var beginhttp = 'http://';
        var rurl;
        if (url.indexOf(beginhttp) > 0) {
            rurl = url;
        } else {
            rurl = staticserverupload + url;
        }
        return rurl;
    };
    //a标签点击跳转
    $.attributeLink = function (url, target) {
        var a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('target', target);
        $('body').append(a);
        a.click();
        setTimeout(function () {
            a.remove();
        }, 0);
    };

    //阻止链接跳转
    $.preveLink = function () {
        var xmlhttp;
        if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else { // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.abort();
        mystop();

        function mystop() {
            if (!!(window.attachEvent && !window.opera)) {
                document.execCommand("stop");
            } else {
                window.stop();
            }
        }
    };

    //获取短信验证码
    var item = 0;
    $.testPicCode = function (pic, code, pho, cd) {
        var $ts = $(this);
        var redata = '';
        if (item === 0) {
            item = 1;
            if (code !== '') {
                $.ajax({
                    url: '/code/codephones.json',
                    dataType: 'json',
                    type: 'post',
                    async: false,
                    data: {
                        Number: pho,
                        verifyCode: code
                    },
                    success: function (data) {
                        if (data.message === '短信验证码发送失败，您已超出5条!') {
                            redata = '短信验证码发送失败，您已超出5条!';
                        } else if (data.message === '图片验证码错误!') {
                            $(pic).click();
                            redata = '图片验证码错误!';
                        } else {
                            $ts.off('click', cd);
                            $.countDown.call($ts, cd);
                        }
                    }
                });
            } else {
                redata = '请输入图片验证码';
            }
            item = 0;
        }
        return redata;
    };

    //倒计时
    $.countDown = function (cd) {
        $(this).html('60秒后重新发送');
        var $ts = $(this),
            n = 60,
            cdown = setInterval(function () {
                n--;
                $ts.html(n + '秒后重新发送');
                if (n === 0) {
                    clearInterval(cdown);
                    $ts.html('获取验证码');
                    $ts.on('click', cd);
                }
            }, 1000);
    };

    //手机号码验证
    $.phoTest = function (pho) {
        var phoformat = /^1[3|4|5|7|8|9]\d{9}$/;
        if (!phoformat.test(pho)) {
            return false;
        } else {
            return true;
        }
    };

    //价格数字验证
    $.numTest = function (num) {
        var reg = /^\d+(\.\d+)?$/;
        if (!reg.test(num)) {
            return false;
        } else {
            return true;
        }
    };

    //cookie
    $.getCookie = function (cName) {
        if ($.cookie(cName)) {
            return $.cookie(cName);
        } else {
            return '';
        }
    };
    $.setCookie = function (options) {
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

        this.init = function (options) {
            opt = $.extend({}, defaults, options);
            opt.cStr = $.getCookie(opt.cName);
            if (checkNow(opt)) {
                setNow(opt);
            }
        };
        var checkNow = function (ops) {
            if (ops.cStr.indexOf($.trim(ops.cValue)) == -1) {
                return true;
            } else {
                return false;
            }
        };
        var setNow = function (ops) {
            if (ops.ifAdd) {
                var clength = ops.cStr.split(ops.separator).length - 1;
                if (clength < ops.addLength) {
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
    $.alertMessage = function (msg) {
        var defaults = {
                outBox: 'outBox',
                messageId: 'messageBox'
            },
            opt,
            $msg = msg;

        var init = function (msg) {
            opt = $.extend({}, defaults);
            var str = '<div style="width:100%;text-align:center;z-index:999;opacity:1;top:50%;bottom:50%;position:fixed;margin:auto 0;height:4.5rem;" class="' + opt.outBox + '"><div class="' + opt.messageId + '" style="max-width:90%;-webkit-transition:all .3s;margin-top:-15%;box-sizing:border-box;-webkit-transform:scale(1.5);display:none;background:rgba(0,0,0,0);color:#fff;font-size:1.5rem;padding:1rem 1.5rem;height:auto;border-radius:0.4rem;line-height:2.5rem;">' + msg + '</div></div>';
            $('.' + opt.outBox).remove();
            $('body').append(str);
            showMessage.call($('.' + opt.messageId), opt, $msg);
        };

        var showMessage = function (ops, msg) {
            var $ts = $(this);
            $(this).show().css({
                'display': 'inline-block'
            });
            setTimeout(function () {
                $ts.css({
                    '-webkit-transform': 'scale(1)',
                    'background': 'rgba(0,0,0,0.6)'
                });
            }, 0);
            setTimeout(function () {
                $ts.css({
                    'opacity': '0'
                });
            }, 2000);
            setTimeout(function () {
                $ts.parent('.' + ops.outBox).remove();
            }, 2300);
        };

        return this.each(function () {
            init($msg);
        });

    };

    //tab切换
    $.tabChange = function (tsobj, options) {
        var defaults = {
                addClass: '', //需要添加的class
                acTion: 'click', //动作，默认click
                targetClass: '', //内容切换部分
                tabCallback: null,
                aheadCallback: null //先加载后改变
            },
            $obj = $(tsobj),
            opt, ifnext = 1;

        this.init = function (options) {
            opt = $.extend({}, defaults, options);
            $obj.on(opt.acTion, function () {
                tabNow.call($(this), $obj, opt);
            });
        };

        var tabNow = function (ts, ops) {
            var $target = $(ts);
            var tsindex = $(this).index();
            //回调函数，返回当前点击tab下标
            if ($.type(ops.aheadCallback) === 'function') {
                ops.aheadCallback(tsindex);
            }

            if (ops.addClass !== '') {
                $target.removeClass(ops.addClass);
                $(this).addClass(ops.addClass);
            }
            if (ops.targetClass !== '') {
                $(ops.targetClass).hide().eq(tsindex).show();
            }

            //回调函数，返回当前点击tab下标
            if ($.type(ops.tabCallback) === 'function') {
                ops.tabCallback(tsindex);
            }
        };
        this.init(options);
    };
    //时间戳格式化 yyyy-MM-dd HH:mm:ss(标准格式，区分大小写)
    $.timeFormat = function (time, type) {
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
        if (/(y+)/.test(ftime)) {
            ftime = ftime.replace(RegExp.$1, nyear);
        }
        //替换月份以及其他的
        for (var i in dateitems) {
            if (new RegExp('(' + i + '+)').test(ftime)) {
                ftime = ftime.replace(RegExp.$1, RegExp.$1.length === 1 ? dateitems[i] : ('00' + dateitems[i]).substring(('' + dateitems[i]).length));
            }
        }
        return ftime;
    };
    //时间比较
    $.timeCompare = function (time1, time2) {
        var newdate1 = new Date();
        newdate1.setTime(time1);
        var newdate2 = new Date();
        newdate2.setTime(time2);
        var differ = (newdate1 - newdate2) / 24 * 60 * 60 * 1000;
        return differ;
    };

    //手机号码收集提交
    $.collectNumber = function (tsobj, options) {
        var defaults = {
                submitUrl: '/require/commonrequire.json',
                carId: '',
                phoneNumber: '',
                tsType: '',
                tsPrice: ''
            },
            $obj = $(tsobj),
            opt;

        this.init = function (options) {
            opt = $.extend({}, defaults, options);
            submitnow.call($(this), opt);
        };
        var submitnow = function (ops) {
            var $carid = ops.carId,
                $phonenumber = ops.phoneNumber,
                $type = ops.tsType,
                $price = ops.tsPrice;
            if ($.phoTest($.trim(ops.phoneNumber))) {
                if ($.trim(ops.phoneNumber) !== $.getCookie('phoneNum')) {
                    $.setCookie('phoneNum', $.trim(ops.phoneNumber));
                }
                $.post(ops.submitUrl, {
                    carId: $carid,
                    number: $phonenumber,
                    type: $type,
                    price: $price
                }, function (data) {
                    if (data) {
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
    $.drawRound = function (cs, cx, cy, cr, color) {
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
    $.annulusChart = function (options) {
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

        this.init = function (options) {
            opt = $.extend({}, defaults, options);
            $.each(opt, function (key, val) {
                drawRound(opt[key]);
            });
        };

        var drawRound = function (rdata) {
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
            if ($.type(rdata.bRadian) === 'number') {
                bRadian = rdata.bRadian;
            }

            var i = 0;
            var dr = setInterval(function () {
                lRadian = bRadian + 2 * Math.PI * i / mD;

                cvs.clearRect(0, 0, rdata.myCanvas.width, rdata.myCanvas.height);

                if ($.type(rdata.prefunBack) === 'function') {
                    rdata.prefunBack();
                }

                cvs.beginPath();
                cvs.moveTo(eX, eY);
                cvs.arc(eX, eY, r, bRadian, lRadian, false);
                cvs.closePath();
                cvs.fillStyle = rdata.fillColor;
                cvs.fill();

                if ($.type(rdata.drawCallback) === 'function') {
                    rdata.drawCallback();
                }
                var runpoint = beginbowlXY(rdata, lRadian);
                drawbowl(rdata, runpoint[0], runpoint[1]);
                if (i >= cD) {
                    clearInterval(dr);
                }
                i += st;
            }, 0);
            //绘制起点，返回途经的其他点坐标
            var beginbowlXY = function (rdata, lr) {
                var deg = Math.abs(2 * Math.PI * rdata.curDate / rdata.maxDate - Math.PI) / 2,
                    bR = rdata.bowlR,
                    bRoundR = rdata.radius - rdata.annulusWidth / 2,
                    eX = rdata.efX,
                    eY = rdata.efY,
                    r = rdata.radius,
                    rpoint = [],
                    x1, y1;
                //多个图以相同起始位置
                if ($.type(rdata.bRadian) === 'number') {
                    deg = -rdata.bRadian;
                }
                var rry = Math.sin(deg) * bRoundR;
                var rrx = Math.sqrt(Math.pow(bRoundR, 2) - Math.pow(rry, 2));
                var bX, bY;

                if (rdata.curDate / rdata.maxDate > 0.5) {
                    bX = (-rrx + eX);
                    bY = (rry + eY);
                } else {
                    bX = (-rrx + eX);
                    bY = (-rry + eY);
                }
                //多个图以相同起始位置
                if ($.type(rdata.bRadian) === 'number') {
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
            var drawbowl = function (rdata, x, y) {
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
    $.hxGototop = function (tsobj, options) {
        var defaults = {
                ifSH: false, //是否添加滑动显示隐藏功能
                showDis: 0, //显示距离
                showID: ''
            },
            opt,
            $obj = $(tsobj);

        this.init = function () {
            opt = $.extend({}, defaults, options);

            $(document).off().on({
                'scroll': function () {
                    if (opt.ifSH === true) {
                        if ($(document).scrollTop() > opt.showDis) {
                            $(opt.showID).show();
                        } else {
                            $(opt.showID).hide();
                        }
                    }
                }
            });

            $obj.off().on({
                'click': function () {
                    gototop.call($('html,body'));
                }
            });
        };

        var gototop = function () {
            $(this).animate({
                scrollTop: 0
            }, 200);
        };

        this.init();
    };
    //手机网页跳APP
    $.hxWaptoapp = function (options) {
        var defaults = {
                appLink: 'myapp://www.hx2car.com?1',
//              itunesLink: 'https://itunes.apple.com/cn/app/hua-xia-er-shou-che/id629583556',
//              androidLink: 'https://static.hx2car.com/resource/android/hx2car.apk'
                itunesLink: 'https://www.hx2car.com/help/appdown.htm',
                androidLink: 'https://www.hx2car.com/help/appdown.htm'
            },
            index = -1,
            str = '',
            downloadUrl;

        var opt = $.extend({}, defaults, options);
//      if ($.hxBrowercheck('micromessenger') || $.hxBrowercheck('mqqmobile')) {
//          if ($.hxBrowercheck('iphone os') || $.hxBrowercheck('ipad')) {
//              str = '<div id="bgANDROID" class="bgANDROID" style="background: rgba(0,0,0,.5);display:block;position: fixed;top: 0px;z-index: 9999999;width: 100%;height: 100%;"><img src="https://static.hx2car.com/resource/web/mobile/img/download_android2.png" width="100%"></div>';
//          } else {
//              str = '<div id="bgANDROID" class="bgANDROID" style="background: rgba(0,0,0,.5);display:block;position: fixed;top: 0px;z-index: 9999999;width: 100%;height: 100%;"><img src="https://static.hx2car.com/resource/web/mobile/img/download_android2.png" width="100%"></div>';
//          }
//          $('body').append(str);
//      } else {
        var t = new Date();
        if ($.hxBrowercheck('iphone os') || $.hxBrowercheck('ipad')) {
            location.href = opt.appLink;
            downloadUrl = opt.itunesLink;
        } else {
            var n = document.createElement("iframe");
            n.style.cssText = "width:1px;height:1px;position:fixed;top:0;left:0;";
            n.src = opt.appLink;
            downloadUrl = opt.androidLink;
            $('body').append(n);
            t = new Date();
        }
        setTimeout(function () {
            var e = new Date();
            if (1550 > e - t) {
                location.href = downloadUrl;
            }
        }, 1500);
//      }
    };
    //微信分享朋友圈分享
    $.WXshare = function (options) {
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

        this.init = function (options) {
            opt = $.extend({}, defaults, options);
            setShare(opt);
        };

        var setShare = function (ops) {
            $.post('/mobile/WeChartSign.json', {
                token: url
            }, function (data) {
                if (data) {
                    var jdata = data.replace('[', '').replace(']', '').replace(/=/g, ':');
                    var sdata = jdata.split(',');
                    var i = 0;
                    var ar = [];

                    $.each(sdata, function (key, value) {
                        var sop = sdata[key];
                        var ind = sop.indexOf(':');
                        ar[i] = sop.substr(ind + 1);
                        i++;
                    });
                    var funcList = [];
                    //微信分享
                    if (ops.sWxmember) {
                        funcList.push('onMenuShareAppMessage');
                    }
                    //朋友圈分享
                    if (ops.sWxfriendround) {
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
                    wx.ready(function () {
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
        };
        this.init(options);
    };
    //浏览器检测
    $.hxBrowercheck = function (keyword) {
        var ua = navigator.userAgent.toLowerCase();
        var testreg = new RegExp(eval('/' + keyword + '/i'));
        if (ua.match(testreg) == keyword) {
            return true;
        } else {
            return false;
        }
    };
    //移动端登录
    $.waplogin = function (tsobj, options) {
        var backurl = encodeURIComponent(window.location.href);
        var defaults = {
                bannerImgUrl: null,
                loginState: false,
                beforeCallback: null,//登陆前的回调,如果有,需要返回值true:继续登陆;false:停止后续登陆操作
                redirectUrl: null,//第三方登陆跳转的地址
                backUrl: backurl,
                checkedCallback: null//手机登陆回调
            },
            opts,
            $obj = $(tsobj);
        this.init = function (options) {
            opts = $.extend({}, defaults, options);
            $obj.click(function () {
                if ($.type(opts.beforeCallback) == 'function') {
                    if (opts.beforeCallback.call($obj)) {
                        showLogin();
                    }
                } else {
                    showLogin();
                }
            });
        };
        //登陆跳转或弹框
        function showLogin() {
            if (!opts.loginState) {
                addHtml();
                addFunc();
                if ($.hxBrowercheck('micromessenger')) {
                    var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdbe3faf9f857d11d&redirect_uri=http%3A%2F%2Fm.hx2car.com%2Fsys%2FWQlogin.htm&response_type=code&scope=snsapi_userinfo&state=' + opts.redirectUrl + ',' + opts.backUrl + '#wechat_redirect';
                    $.attributeLink(url, '');
                } else {
                    $('._login_box').show();
                    docprevent();
                    $('._third_party a').attr('href', 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101435816&redirect_uri=http%3A%2F%2Fm.hx2car.com%2Fsys%2FQQlogin.htm&state=' + opts.redirectUrl + ',' + opts.backUrl + '&display=mobile');
                    $('._login_box').css({
                        '-webkit-transform': 'translate(0,0)',
                        'transform': 'translate(0,0)'
                    });
                    $(document).scrollTop(0);
                }
            } else {
                if ($.type(opts.checkedCallback) == 'function') {
                    opts.checkedCallback();
                } else {
                    $.attributeLink(opts.redirectUrl, '');
                }
            }
        }

        //添加页面
        function addHtml() {
            if ($('._login_box').length != 0) {
                $('._login_box').remove();
            }
            if (opts.bannerImgUrl !== null) {
                var logo = '<img src="' + opts.bannerImgUrl + '">';
            } else {
                var logo = '<p class="_login_logo"></p>';
            }
            var str = '<section class="_login_box" style="display:none;">';
            str += '<div class="_login_box_Top"><i class="_backArrow" id="_backArrow"></i>手机验证</div>';
            str += '<div class="_login_box_logo">' + logo + '</div>';
            str += '<div class="_login_box_form"><ul class="_login_box_input">';
            str += '<li><input type="tel" placeholder="请输入手机号码" id="_login_box_tel"></li>';
            str += '<li class="_login_box_code"><input type="number" placeholder="请输入图片验证码" id="_login_box_picCode"><img title="点击刷新" id="_login_box_change_picCode" class="_login_box_change_picCode" src="/servlet/yzCode.jpg" onclick="javascript:this.src=\'/servlet/yzCode.jpg?rnd=\'+Math.random();"></li>';
            str += '<li class="_login_box_code"><input type="number" placeholder="请输入手机验证码" id="_login_box_phoneCode"><button id="_login_box_get_picCode" class="_login_box_get_picCode">获取验证码</button></li>';
            str += '</ul><button id="_login_box_submit" class="_login_box_submit">确 定</button></div><div class="_third_party">使用其他账号登录<a href="" rel="nofollow"><span class="_third_party_qq"></span>QQ登陆</a></div></section>';
            $('body').prepend(str);
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
            $('#_backArrow').click(function () {
                docrecover();
                $('._login_box').css({
                    '-webkit-transform': 'translate(100%,0)',
                    'transform': 'translate(100%,0)'
                });
                setTimeout(function () {
                    $('._login_box').remove();
                }, 300);
            })
        }

        function checkCallback(data) {
            if ($.type(opts.checkedCallback) == 'function') {
                opts.checkedCallback(data);
            } else if (opts.redirectUrl) {
                $.attributeLink(opts.redirectUrl, '');
            }
        }

        //阻止背景滑动
        function docprevent() {
            $('body').css({'height': $(window).height(), 'overflow': 'hidden'});
            $('._login_box').css('height', $(window).height());
            $(document).off('touchmove').on('touchmove', function (e) {
                e.preventDefault();
            });
        }

        //添加滑动
        function docrecover() {
            $('body').css({'height': 'auto', 'overflow': 'auto'});
            $(document).off('touchmove').on('touchmove', function () {
            });
        }

        this.init(options);
    };
    //移动端登录
    $.fn.waplogin = function (options) {
        return this.each(function () {
            new $.waplogin($(this), options);
        });
    };
    //返回顶部
    $.fn.hxGototop = function (options) {
        return this.each(function () {
            new $.hxGototop($(this), options);
        });
    };
    //圆形统计图
    $.fn.annulusChart = function (options) {
        return this.each(function () {
            new $.annulusChart(options);
        });
    };
    //手机号码收集提交
    $.fn.collectNumber = function (options) {
        return this.each(function () {
            new $.collectNumber($(this), options);
        });
    };
    //微信分享朋友圈分享
    $.fn.WXshare = function (options) {
        return this.each(function () {
            new $.WXshare($(this), options);
        });
    };
    //tab切换
    $.fn.tabChange = function (options) {
        new $.tabChange(this, options);
    };
    //信息弹出框
    $.fn.alertMessage = function (msg) {
        return this.each(function () {
            $.alertMessage.call($(this), msg);
        });
    };
    //添加cookie
    $.fn.setCookie = function (options) {
        return this.each(function () {
            new $.setCookie(options);
        });
    };
    //下拉刷新
    $.fn.downDragload = function (options) {
        return this.each(function () {
            new $.downDragload(this, options);
        });
    };
    //touch轮播图
    $.fn.mobileFocus = function (options) {
        return this.each(function () {
            new $.mobileFocus(this, options);
        });
    };
    //链接添加a标签跳转
    $.fn.attributeLink = function (url, target) {
        return this.each(function () {
            new $.attributeLink(url, target);
        });
    };
    //手机号码验证
    $.fn.numberCheck = function (options) {
        return this.each(function () {
            new $.numberCheck(this, options);
        });
    };
    //页面滑入
    var n = 0;
    $.fn.blockFly = function (options) {
        if ($(this).length > 1) {
            n++;
            return new $.blockFly(this, options, n);
        }
        return $.each(this, function () {
            n++;
            new $.blockFly(this, options, n);
        });
    };
    //会员中心加载更多(需要userid)
    $.fn.scrollLoad = function (options) {
        return this.each(function () {
            new $.scrollLoad(this, options);
        });
    };
    //列表页下拉加载更多
    $.fn.listScrollLoad = function (options) {
        return this.each(function () {
            new $.listScrollLoad(this, options);
        });
    };

    // pc公共华夏登录弹框
    $.pchxLogin = function ($thisobj, options) {
        var defaults = {
                loginState: false,
                redirectPcUrl: null,//第三方登陆跳转的地址
                eventCallback: null,//事件绑定
                checkedCallback: null, //成功后的回调,
                thirdLogin: true,//是否需要第三方登陆按钮
                applogin: true,//是否需要扫码登陆
                specialWay: true//特殊情况 为false时必传checkedCallback
            },
            opt,
            $tob = $thisobj;
        var timer;
        this.init = function () {
            var bindFun;
            opt = $.extend({}, defaults, options);

            try {
                if (!opt.specialWay && $.type(opt.checkedCallback) !== 'function') {
                    throw "Err1"
                }
            } catch (er) {
                if (er === "Err1") {
                    console.log("Error! 请传入回调函数checkedCallback")
                }
            }
            if ($.type(opt.eventCallback) == 'function') {
                bindFun = function () {
                    addLoginBox();
                    opt.eventCallback();
                };
            } else {
                if (!opt.loginState) {
                    bindFun = function () {
                        addLoginBox();
                        showLoginBox();
                    };
                } else {
                    if ($.type(opt.checkedCallback) == 'function') {
                        bindFun = opt.checkedCallback;
                    } else {
                        bindFun = function () {
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
            if (opt.applogin) {
                $.ajax({
                    type: "GET",
                    url: "/car/renovatecode.json",
                    async: false,
                    success: function (data) {
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
            str += '<div class="hxlogin" id="phoneNumcheckpage" style="display:none;">';
            str += '<div class="title"><span>华夏验证</span><i class="close"></i></div>';
            str += '<div class="optionTab"><span class="active">手机验证</span>';
            str += strApploginTitle;
            str += '</div>';
            str += '<div class="mcheckBox">';
            str += '<ul>';
            str += '<li><input class="inpone" id="mbTel" type="tel" placeholder="请输入您的手机号码"></li>';
            str += '<li><input type="text" id="mbPic" placeholder="图片验证码"><img class="yzcodeBtn" id="mbcPiccode" src="/servlet/yzCode.jpg" onclick="javascript:this.src=&quot;/servlet/yzCode.jpg?rnd=&quot;+Math.random() "alt="点击刷新"></li>';
            str += '<li><input type="text" id="mbcInput" placeholder="短信验证码"><span class="yzcodeBtn2" id="mbcObtain">获取验证码</span></li>';
            str += '<li class="sub"><span class="goLogin" id="mbSubmit">提    交</span></li>';
            str += '</ul>';
            if (opt.thirdLogin) {
                strThirdLogin += '<div class="loginType">';
                strThirdLogin += '<a href="https://graph.qq.com/oauth2.0/authorize?response_type=code&amp;client_id=101435816&amp;redirect_uri=http%3A%2F%2Fwww.hx2car.com%2Fsys%2FQQlogin.htm&amp;state=' + opt.redirectPcUrl + '"><i class="qq_icon"></i><span>QQ登录</span></a>';
                strThirdLogin += '<a href="https://open.weixin.qq.com/connect/qrconnect?appid=wx2235cd8a4aa85428&amp;redirect_uri=http%3A%2F%2Fwww.hx2car.com%2Fsys%2FWQlogin.htm&amp;response_type=code&amp;scope=snsapi_login&state=' + opt.redirectPcUrl + '#wechat_redirect" class="wx_link"><i class="wx_icon"></i><span>微信登录</span></a>';
                strThirdLogin += '</div>';
            }
            str += strThirdLogin;
            str += '</div>';
            str += strApplogin;
            str += '</div>';
            str += '<div class="hxPhoneBg" style="display:none;"></div>';
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
                specialWay: opt.specialWay,
                checkCallback: checkCallback
            });
            function checkCallback(data) {
                if ($.type(opt.checkedCallback) == 'function') {
                    removeLoginBox();
                    opt.checkedCallback(data);
                } else {
                    location.reload();
                }
            }

            //切换登录方式
            $('.optionTab span').click(function () {
                var index = $(this).index();
                $('.optionTab span').removeClass('active');
                $(this).addClass('active');
                loginType(index);
            });
            //再次获取二维码登录
            $('.againBtn').click(function () {
                $.get('/car/renovatecode.json', function (data) {
                    if (data) {
                        $('.codepic').attr('src', "/servlet/LoginQr.jpg?code=" + data.code);
                    }
                });
                loginType(1);
            });
            $('.hxlogin .title .close').click(function () {
                closeHxlogin();
            });

            function loginType(type) {
                if (type == 0) {
                    clearInterval(timer);
                    $('.mcheckBox').show();
                    $('.codeCont').hide();
                } else if (type == 1) {
                    $('.mcheckBox').hide();
                    $('.codeCont').show();
                    $('.aginLoginBox').hide();
                    codeLoginFun();
                }
            }

            function codeLoginFun() {
                var count = 0;
                timer = setInterval(function () {
                    count++;
                    if (count > (5 * 60)) {//(5*60)
                        clearInterval(timer);
                        $('.aginLoginBox').show();
                    }
                    var CODES = $('.codepic').attr('src').split('=')[1];
                    $.post('/login/qrCodeLogin.json', {code: CODES, redirectUrl: ''}, function (data) {
                        if (data.isLoginSuccess) {
                            clearInterval(timer);
                            if ($.type(opt.checkedCallback) == 'function') {
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
            $('.hxlogin').show();
            $(".hxPhoneBg").show();
        }

        function addLoginBox() {
            if ($('.hxlogin').length === 0) {
                addHtml();
                addFunc();
            }
        }

        function removeLoginBox() {
            $('.hxlogin').remove();
            $(".hxPhoneBg").remove();
            clearInterval(timer);
        }

        function closeHxlogin() {
            $('.lotP').removeClass('active');
            $('.optionTab span:eq(0)').addClass('active');
            $('.codeCont').hide();
            $('.mcheckBox').show();
            removeLoginBox();
        }

        this.init(options);

    }
    // pc公共华夏登录弹框
    $.fn.pchxLogin = function (options) {
        return this.each(function () {
            new $.pchxLogin($(this), options);
        });
    };

})(jQuery);

$(function () {
    var ads = '<div class="msg-bottom" style="height: 12.2vw;position: fixed;bottom: 0;left: 0;width: 100%;z-index:999"><div class="model-bg" style="width: 100%;height: 100%;background: #000;opacity: 0.7;position: absolute;top: 0;z-index: 0;"></div><div class="msg-content" style="position: relative;height: 100%;"><i class="closes" style="width: 3vw;height: 3vw; position: absolute;top: 50%;left: 3vw;margin-top: -1.5vw;background: transparent;"><img src="/resource/web/mobpages/images/close-write.png" style="width: 100%;"/></i><i class="logo" style="width: 8vw;height: 8vw; position: absolute;top: 50%;left: 9vw;margin-top: -4vw;"><img src="/resource/web/mobpages/images/hxLogos.png" style="width: 100%;"/></i><div class="msg-txt" style="margin-left: 20.1vw;color: #fff;line-height: 5vw;font-size: 1.2rem;padding-top: 1vw;float: left;">点击下载华夏二手车APP<br />领取价值88元新用户大礼包</div><div class="right toDowload" style="width: 29.3%;height: ;float: right;background: #f60;color: #fff;text-align: center;font-size: 1.6rem;height:0;line-height: 0;padding:6.1vw 0;">APP下载</div></div></div>';
    if (!IsPC() && getQueryString("from") != 'appClient')
        $('body').append(ads);
    function IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    //获取url参数
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    $('.toDowload').click(function () {
        $.hxWaptoapp();
    });
    $(".msg-bottom .closes").click(function () {
        $(".msg-bottom").hide();
    })
})
