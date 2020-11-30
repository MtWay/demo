define('util/postClickLog',[],function(){
	var PostClickLog = {
		send: function(logId) {
			try{
				this.sendJson('from=' + logId);
			} catch(e) {}
		},
		sendJson: function(jsonStr) {
			try{
				window.clickLog(jsonStr);
			} catch(e) {}
		},

	 	/*记录时间-闭包--start*/
		recordTime: function(subClass,timeRuler,Controller){
			var _self = this;
            //$('#'+timeRuler.startId) 主要針對品牌，比較特殊
            var startObj =  timeRuler.startId ? $('#'+timeRuler.startId) : Controller.records.get(subClass.dataName).container;
       		var firstFunc,endFunc;
            // 当前对象绑定事件
            startObj.bind(timeRuler.startEvt, function(){
            	var	startEvt = timeRuler.startEvt ? timeRuler.startEvt : 'click',
            		endEvt = timeRuler.endEvt ? timeRuler.endEvt : 'inputover';
                var startT = (new Date()).getTime();
                var endObj = timeRuler.endTarget ? Controller.records.get(timeRuler.endTarget).container : $(this);
                //主要針對品牌
                endObj = timeRuler.startId ? Controller.records.get(subClass.dataName).container : endObj;
                //如果有事件，先清除
                if(firstFunc){
                 	$(this).unbind(endEvt,firstFunc);
                }
                if(endFunc){
            		 endObj.unbind(endEvt,endFunc);
                }
                //第一个对象直接选择完成--针对下拉框---start
                if(timeRuler.canSelf){
					startObj.bind(endEvt,firstFunc = function(){
						var bValid = subClass.doCheck().bValid;
						var option = subClass.container.find('.optiondef li');
						if(subClass.getValue() == option[option.length-1].innerHTML&&bValid){
                       	 	 var endT = (new Date()).getTime();
                             var time = (endT-startT)/1000;
                             _self.sendJson('from=escpc_'+timeRuler.logmsg+'_'+time.toFixed(1));
                        	 $(this).unbind(endEvt,firstFunc);
                        	 endObj.unbind(endEvt,endFunc);
						}
					})
				}
                // 第一个对象直接选择完成---end
        	   endObj.bind(endEvt,endFunc = function(){
                   var bValid = subClass.doCheck().bValid;
                   var value = timeRuler.endTarget ? Controller.records.get(timeRuler.endTarget).getValue() : (subClass.getText ? subClass.getText() : subClass.getValue());
                    if(value&&bValid){
                        var endT = (new Date()).getTime();
                        var time = (endT-startT)/1000;
                        _self.sendJson('from=escpc_'+timeRuler.logmsg+'_'+time.toFixed(1));
                        $(this).unbind(endEvt,endFunc);
                    }
                });
            });
		},

        //整个页面的开始时间
        postTimeMsg :'',

        /*发布成功之后发送log，记录当整个页面用时--- satrt*/
        postscSendLog : function(postLog){
            var _self = this;
            if(postLog){
               var rowsFunc;
                $('.rows_wrap .rows_content').one('click',rowsFunc = function(){
                   _self.postTimeMsg = {
                        'time' : (new Date()).getTime(),
                        'logmsg'  : postLog
                    };
                   $('.rows_wrap .rows_content').unbind('click',rowsFunc);
                });
            }
        }

        /*发布成功之后发送log，记录当整个页面用时--- end*/
	}
    window.clickLog = window.clickLog||function(){};//默认空对象,避免组件内部使用时异常报错
	return PostClickLog;
});
/**
 * 块级区域组件
 * @module component/block
 */
define('component/block/js/block',["util/postClickLog"], function(postClickLog) {
    /**
     *  @constructor
     *  @alias module:component/block
     *  @param {Object} opt 配置文件 
     */
    function Block(opt) {
        this.opts = $.extend(true, {}, this.constructor.opts, opt);
        this.init();
    }
    var blockIndexCount = 1000; //块元素层级索引值
    /** @enum  {Object} 静态配置文件，所有的默认值都在这里初始化 */
    Block.opts = {
        /** @type {String} 组件的类型 */
        type: 'block',
        /** @type {String} 显示的标题名 */
        title: '',
        /** @type {String} 增加的className */
        className: '',
        /** @type {Object} 默认的class名，不要随意修改和传入 */
        defaultClassName: {
            /** @type {String} 容器的className */
            wrap: 'block_wrap',
            /** @type {String} 标题的className */
            title: 'block_title',
            /** @type {String} 内容区域的className */
            content: 'block_content'
        }
    }
    Block.prototype = {
        constructor: Block,
        /**
         * 初始化方法
         */
        init: function() {
            this.createElem();
        },
        /**
         * 生成相应的DOM对象
         */
        createElem: function() {
            this.createElemByDefault();
            this.setExtraAttr();
        },
        /**
         * 通过默认配置生成DOM对象
         */
        createElemByDefault: function() {
            var opts = this.opts;
            var titleElem = $('<div>').addClass(opts.defaultClassName.title).append('<h2>' + opts.title + '</h2>');
            this.contentElem = $('<div>').addClass(opts.defaultClassName.content);
            this.containerElem = $('<div>').addClass(opts.defaultClassName.wrap).css("z-index", blockIndexCount--);
            this.containerElem.append(titleElem);
            this.containerElem.append(this.contentElem);
            // 测试代码
            // todo增加display参数，默认显示或者隐藏
            if (opts.hasToggleBtn === true) {
                this.initToggleBtn();
            }
        },
        initToggleBtn: function() {
            var _self = this;
            var toggleElem = this.createToggleBtn();
            toggleElem.find('.block_toggle_btn')
                .bind('click', function() {
                    if ($(this).hasClass('toggle_show')) {
                        $(this).removeClass('toggle_show').addClass('toggle_hide');
                        $(this).find('.toggle_text span').html('收起选填信息');
                        _self.moveByBtn('slideDown');
                    } else {
                        $(this).addClass('toggle_show').removeClass('toggle_hide');
                        $(this).find('.toggle_text span').html('更多选填信息');
                        _self.moveByBtn('slideUp');
                    }
                })
                .bind('mouseover', function() {
                    $(this).addClass('block_toggle_btn_mouseover');
                })
                .bind('mouseout', function() {
                    $(this).removeClass('block_toggle_btn_mouseover');
                })
            this.containerElem.append(toggleElem);
        },
        createToggleBtn: function() {
            var autoHide = false;
            var toggleStatus = 'toggle_hide';
            if (!this.opts.displayStatus || this.opts.displayStatus === 'hide') {
                autoHide = true;
                toggleStatus = 'toggle_show';
                this.moveByBtn('hide');
            }
            var tmpHtml = '<div class="clearfix block_toggle_wrap"><div class="block_toggle_btn ' + toggleStatus + '"><span class="icon"></span><div class="toggle_text"><span>更多选填信息</span><p>丰富内容可使成交加速一倍</p></div></div></div>';
            return $(tmpHtml);
        },
        /**
         * 根据传入的值，设置其他属性
         */
        setExtraAttr: function() {
            var opts = this.opts;
            if (typeof opts.className === 'string' && opts.className.length > 0) {
                this.containerElem.addClass(opts.className);
            }
        },
        /**
         * 将容器插入到页面上
         */
        render: function() {
            this.containerElem.appendTo('#postForm');
        },
        hideTitle: function() {
            this.containerElem.find('.' + this.opts.defaultClassName.title).hide();
        },
        showTitle: function() {
            this.containerElem.find('.' + this.opts.defaultClassName.title).show();
        },
        moveByBtn: function(funcName) {
            if (typeof funcName !== 'string') {
                return;
            }
            var titleElem;
            if (this.containerElem && typeof this.containerElem[funcName] === 'function') {
                this.contentElem[funcName]();
                titleElem = this.containerElem.find('.' + this.opts.defaultClassName.title);
            }
            if (titleElem && typeof titleElem[funcName] === 'function') {
                titleElem[funcName]();
            }
        }
    }
    return Block;
});

define('libs/json2.min', [], function() {
	"object" != typeof JSON && (JSON = {}),
		function() {
			"use strict";

			function f(t) {
				return 10 > t ? "0" + t : t
			}

			function quote(t) {
				return escapable.lastIndex = 0, escapable.test(t) ? '"' + t.replace(escapable, function(t) {
					var e = meta[t];
					return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
				}) + '"' : '"' + t + '"'
			}

			function str(t, e) {
				var r, n, o, f, u, p = gap,
					a = e[t];
				switch(a && "object" == typeof a && "function" == typeof a.toJSON && (a = a.toJSON(t)), "function" == typeof rep && (a = rep.call(e, t, a)), typeof a) {
					case "string":
						return quote(a);
					case "number":
						return isFinite(a) ? a + "" : "null";
					case "boolean":
					case "null":
						return a + "";
					case "object":
						if(!a) return "null";
						if(gap += indent, u = [], "[object Array]" === Object.prototype.toString.apply(a)) {
							for(f = a.length, r = 0; f > r; r += 1) u[r] = str(r, a) || "null";
							return o = 0 === u.length ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + p + "]" : "[" + u.join(",") + "]", gap = p, o
						}
						if(rep && "object" == typeof rep)
							for(f = rep.length, r = 0; f > r; r += 1) "string" == typeof rep[r] && (n = rep[r], o = str(n, a), o && u.push(quote(n) + (gap ? ": " : ":") + o));
						else
							for(n in a) Object.prototype.hasOwnProperty.call(a, n) && (o = str(n, a), o && u.push(quote(n) + (gap ? ": " : ":") + o));
						return o = 0 === u.length ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + p + "}" : "{" + u.join(",") + "}", gap = p, o
				}
			}
			"function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
				return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
			}, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
				return this.valueOf()
			});
			var cx, escapable, gap, indent, meta, rep;
			"function" != typeof JSON.stringify && (escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, meta = {
				"\b": "\\b",
				"	": "\\t",
				"\n": "\\n",
				"\f": "\\f",
				"\r": "\\r",
				'"': '\\"',
				"\\": "\\\\"
			}, JSON.stringify = function(t, e, r) {
				var n;
				if(gap = "", indent = "", "number" == typeof r)
					for(n = 0; r > n; n += 1) indent += " ";
				else "string" == typeof r && (indent = r);
				if(rep = e, e && "function" != typeof e && ("object" != typeof e || "number" != typeof e.length)) throw Error("JSON.stringify");
				return str("", {
					"": t
				})
			}), "function" != typeof JSON.parse && (cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, JSON.parse = function(text, reviver) {
				function walk(t, e) {
					var r, n, o = t[e];
					if(o && "object" == typeof o)
						for(r in o) Object.prototype.hasOwnProperty.call(o, r) && (n = walk(o, r), void 0 !== n ? o[r] = n : delete o[r]);
					return reviver.call(t, e, o)
				}
				var j;
				if(text += "", cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(t) {
						return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
					})), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
					"": j
				}, "") : j;
				throw new SyntaxError("JSON.parse")
			})
		}();
	return JSON;
});
define('Controller/Controller',['util/postClickLog', 'libs/json2.min'], function(Log, JSON) {
	// 进行条件判断的方法组，目前实现了eq，即相等方法
	var CaseValueFuncs = {
		eq: function(data, currentObj) {
			var obj = Controller.records.get(data.name);
			var value = obj[data.sourceFuncName]();
			var result=false;
			if (data.checkVal.indexOf('&&') > -1) {//相等方法扩展：checkVal(以&&分隔)的多值处理，只要等于其中一个
				var checkValList = data.checkVal.split('&&');
				for(var i=0;i<checkValList.length;i++){
					if(value == checkValList[i]){
						result=true;
						break;
					}
				}
			}else{
				if (value == data.checkVal) {
					result=true;
				}
			}
			return result;
		},
		notEq: function(data, currentObj){
			var obj = Controller.records.get(data.name);
			var value = obj[data.sourceFuncName]();
			var result=false;
			if (data.checkVal.indexOf('&&') > -1) {//相等方法扩展：checkVal(以&&分隔)的多值处理，只要等于其中一个
				var checkValList = data.checkVal.split('&&');
				for(var i=0;i<checkValList.length;i++){
					if(value != checkValList[i]){
						result=true;
						break;
					}
				}
			}else{
				if (value != data.checkVal) {
					result=true;
				}
			}
			return result;
		}
	};

	var Controller = {
		setValue: function(name, value, bDefault) {
			var instance = this.records.get(name);
			if (instance) {
				if(Object.prototype.toString.call(instance) === '[object Array]') {
					for(var i=0; i<instance.length; i++) {
						var obj = instance[i];
						if(typeof obj.setValue === 'function') {
							obj.setValue(value, '', bDefault);
						}
					}
				} else if(typeof instance.setValue==='function'){
					instance.setValue(value, '', bDefault);
				}
			}
		},
		triggerCustomEvent: function(sourceName, handler) {
			// console.log('sourceName: ' + sourceName);
			if (!handler) {
				return;
			}
			var i = 0,
				l = handler.length,
				data;
			var instance;
			var currentObj = this.records.get(sourceName);
			// caseValue均满足，返回true，否则返回false
			var caseValueAll=function(caseValue){
				if(!caseValue){
					return;
				}
				var re=true;
				var len=caseValue.length;
				for(var i=0;i<len;i++){
					if(!CaseValueFuncs[caseValue[i]['checkFunc']](caseValue[i])){
						re=false;
						break;
					}
				}
				return re;
			};
			for (; i < l; i++) {
				/*if (handler[i].caseValue && !CaseValueFuncs[handler[i].caseValue[0]['checkFunc']](handler[i].caseValue[0], currentObj)) {
				 continue;
				 }*/
				if(handler[i].caseValue&&!caseValueAll(handler[i].caseValue)){
					continue;
				}
				data = handler[i];
				var targetOpts = data.target;
				instance = this.records.get(targetOpts.name);
				// 解析dataFrom
				var dataFrom = targetOpts.dataFrom;
				if (dataFrom) {
					this.getDataFrom(instance, data.funcName, dataFrom);
				}

				// 解析dataTo
				// 解析dataFrom
				var dataTo = targetOpts.dataTo;
				if (dataTo) {
					this.setDataTo(data, currentObj);
				}
				// 调用
				if (!instance) {
					// 如果复数name，则循环调用
					if (targetOpts.name.indexOf('&&') > -1) {
						var nameList = targetOpts.name.split('&&');
						var j = 0,
							nl = nameList.length;
						for (; j < nl; j++) {
							instance = this.records.get(nameList[j]);
							if (!dataTo && !dataFrom && instance && instance[data.funcName]) {
								instance[data.funcName](sourceName, currentObj);
							} else if (instance && instance.container.length > 0) {
								instance.container.triggerHandler(data.funcName)
							}
						}
					}
				} else {
					if (!dataTo && !dataFrom && instance && instance[data.funcName]) {
						instance[data.funcName](sourceName, currentObj);
					} else if (!!instance && instance.container && instance.container.length > 0) {
						instance.container.triggerHandler(data.funcName)
					}
				}

			}
		},
		setDataTo: function(data, currentObj) {
			var targetOpts = data.target;
			var dataTo = targetOpts.dataTo;
			var targetFuncName = data.funcName;
			var targetObj = this.records.get(targetOpts.name);
			if (!currentObj && !targetObj) {
				return;
			}
			if(typeof dataTo.sourceFuncName == "string"){
				var value = currentObj[dataTo.sourceFuncName]();
			}
			//解析caseValue
			if (dataTo.caseValue) {
				for (var i = 0; i < dataTo.caseValue.length; i++) {
					if (!CaseValueFuncs[dataTo.caseValue[i].checkFunc](dataTo.caseValue[i], currentObj)) {
						return false;
					}
				}
			}

			if (typeof dataTo.apiUrl === 'string') {
				// 调用接口时，传值需要的key
				var sendData = {};
				sendData[dataTo.sourceKey] = value;

				$.ajax({
					url: dataTo.apiUrl,
					type: dataTo.apiType,
					data: sendData,
					dataType: dataTo.dataType || 'json', //默认为json，可选jsonp
					//async: false,
					success: function(resultJson) {
						if (dataTo.key) {
							resultJson = resultJson[dataTo.key];
						}
						targetObj[targetFuncName](resultJson);
					},
					error: function() {
						console.log("数据请求出错");
					}
				})

			} else if(typeof dataTo.toUrl === 'string'){
				if (targetObj && targetFuncName && targetObj[targetFuncName]) {
					targetObj[targetFuncName](dataTo.toUrl);
				}
			}else {
				// 直接赋值
				if (value && dataTo.sourceKey) {

					value = value[dataTo.sourceKey];
				}
				if (targetObj && targetFuncName && targetObj[targetFuncName]) {
					targetObj[targetFuncName](value);
				}
			}
		},
		/**
		 * 获取数据方法
		 * @param  {Object} targetObj      目标组件
		 * @param  {String} targetFuncName 目标组件要调用的方法
		 * @param  {JSON} dataFrom         dataFrom配置
		 */
		getDataFrom: function(targetObj, targetFuncName, dataFrom) {
			var sources = dataFrom.sources;
			var args = [];
			// 调用接口时，传值需要的key
			var sendData = {};
			var argsStr;
			//解析caseValue
			if (dataFrom.caseValue) {
				for (var i = 0; i < dataFrom.caseValue.length; i++) {
					if (!CaseValueFuncs[dataFrom.caseValue[i].checkFunc](dataFrom.caseValue[i], targetObj)) {
						return false;
					}
				}
			}
			// 循环获取到需要的参数list
			for (var i = 0; i < sources.length; i++) {
				var sourceObj = this.records.get(sources[i].name);

				if (sourceObj && sources[i].checkNull) {
					var checkVal = sourceObj[sources[i].checkNull]();
					if (checkVal && checkVal.length > 0) {

					} else {
						args[i] = "";
						continue;
					}
				}


				if(typeof sourceObj[sources[i].funcName] != 'undefined'){
					args[i] = sourceObj[sources[i].funcName]();
				}else{
					if(typeof sourceObj[0] != 'undefined'){
						args[i] = sourceObj[0][sources[i].funcName]();
					}else if(typeof sourceObj['elems'] != 'undefined'){
						//volatile 组件
						args[i] = sourceObj['elems'][0]['item'][sources[i].funcName]();
					}

				}
				//如果取值方法是取对象，那么这里要拿一下属性的key
				if (sources[i].sourceKey && sources[i].sourceKey.length > 0 && args[i]) {
					args[i] = args[i][sources[i].sourceKey];
					if (!args[i]) {
						args[i] = ""
					}

				}
				//如果是配置里面有 maxLength，就截取一下 必须是整数
				if (sources[i].maxLength && sources[i].maxLength > 0 && args[i] && args[i].length > 0) {
					args[i] = args[i].substring(0, sources[i].maxLength);

				}
				if (args[i] && args[i].length > 0 && sources[i].template && sources[i].template.length > 0) {

					if(sources[i].name == 'huxingting'){
						args[i] = sources[i].template.replace('%s%',args[i]).replace(' ','');
					}else{
						args[i] = sources[i].template.replace('%s%',args[i]);
					}

				}
				sendData[sources[i].key] = args[i];

			}
			argsStr = args.join(',').replace(/,/g,'');
			// 后一个与项是为了防止数组最后一项模板被pop掉
			if(argsStr.length >=30&&!sources[i-1].template){
				args.pop();
			}
			// console.log(args);
			// ajax获取数据
			if (typeof dataFrom.apiUrl === 'string') {
				// 调用ajax时候，如何拼接成参数
				$.ajax({
					url: dataFrom.apiUrl,
					data: sendData,
					type: dataFrom.apiType || 'get', // 默认get
					dataType: dataFrom.dataType || 'json', // 默认为json格式，如果为特殊必须要修改
					success: function(resultJson) {
						// 如果配置中有key，则将key对应value回调传给相应的值
						// 如果没有，则将整个json传给targetObj
						if (dataFrom.key) {
							resultJson = resultJson[dataFrom.key];
						}
						targetObj[targetFuncName](resultJson);
					},
					error: function() {
						/** @todo 错误信息提示 */
					}
				})
			} else if (dataFrom.type == "joinText") {
				targetObj[targetFuncName].call(targetObj, args.join(dataFrom.joinSpe ? dataFrom.joinSpe : ""));
				if(dataFrom.afterFuncName!=undefined && typeof dataFrom.afterFuncName === 'string'){
					targetObj[dataFrom.afterFuncName].call(targetObj);
				}
			} else {
				// 直接赋值
				targetObj[targetFuncName].apply(targetObj, args);
			}
		},
		// 记录所有组件
		triggerEvent: function(evt) {
			this.triggerCustomEvent(evt.sourceName, evt.data);
		},
		triggerCheck: function(dataList) {
			if (!dataList) {
				return;
			}
			var i = 0,
				l = dataList.length,
				data;
			var instance;
			for (; i < l; i++) {
				data = dataList[i];
				// this.triggerCustomEvent(evt.sourceName, data);
				// console.log(evt);
				instance = this.records.get(data.target.name);
				if (instance && instance[data.funcName]) {
					instance[data.funcName]();
				}
			}
		},
		isFormValidate: function() {
			this.bFocus = false;
			var bValid = true;
			var errorMap = {
				'from': 'PostFail'
			};
			for (var i = 0; i < this.records.list.length; i++) {
				var obj = this.records.list[i];
				//针对不需要提交值而且需不需要校验动态设置的组件可设置shouldCheck标志是否校验
				if (obj.type === 'submit'
					|| (obj.opts && obj.opts.isFreeze === true && !(typeof obj.shouldCheck !='undefined' && obj.shouldCheck == true) )
					|| ((obj.opts&&obj.opts.hideNoCheck)&&obj.rows.containerElem.is(":hidden"))
				) {
					continue;
				}
				// 默认的值
				var checkObj = {
					bValid: true,
					msg: ''
				};
				if(typeof obj.doCheck === 'function') {
					/*if(obj != Controller.records.get("yzm"))*/
						checkObj = obj.doCheck();
				}
				if(typeof obj.doWukongCheck==='function'){
					/*判断是否出现了下一个验证码，出现了不验证当前验证码*/
					var yzminstance = Controller.records.get("yzm");
					if(yzminstance.yzmStatus == 'error'){
						checkObj = {
							bValid: false,
							msg: '验证码输入错误'
						};
						yzminstance.showCheckTip(checkObj);
					}
					// if(yzminstance && $(yzminstance.elem).attr("readonly") == "readonly"){
					//  // @DOTO
					// }else{         
					// 	var wukongR = obj.doWukongCheck(this);
					// 	if(wukongR && !$.isEmptyObject(wukongR)){
					// 		checkObj = wukongR;
					// 		/*显示提示信息*/
					// 		if(!wukongR.bValid)
					// 		obj.showCheckTip(wukongR);
					// 	}
					// }
				}
				if (!checkObj.bValid) {
					errorMap[obj.opts.name] = encodeURIComponent(checkObj.msg);
					if(obj.opts.name=="caraddress"){
						try{
							var caraddress = obj.getValue();
							errorMap[obj.opts.name] = encodeURIComponent(checkObj.msg+"&"+caraddress);
						}catch(e){
							/*ESC-7593 保存‘看车地址’每日报错的内容文本 一个周之后下掉*/
						}
					}
					if (this.bFocus === false) {
						this.bFocus = true;
						obj.scrollTo();
					}
					bValid = checkObj.bValid;
				}
			}
			if (bValid === false) {
				Log.sendJson($.param(errorMap));/*错误信息埋点*/
			}
			return bValid;
		},
		/**
		 * 设置表单内容
		 * @param {Object} data     对应的表单数据
		 * @param {Boolean} bDefault 是否为默认值
		 */
		setFormData: function(data, bDefault) {
			var _self = this;
			for(var key in data) {
				if(key === 'zimu' ||key==='brand') {
					// 字母和品牌做特殊处理
					continue;
				}
				_self.setValue(key, data[key], bDefault);
			}
		},
		getFormData: function() {
			var data = {};
			for (var i = 0; i < this.records.list.length; i++) {
				var obj = this.records.list[i];
				// 忽略isFreeze为true的组件
				// if(!obj.opts || obj.opts.isFreeze === true) {
				// 	continue;
				// }
				if (obj.opts && !obj.opts.isFreeze && obj.opts.type != 'rearLogin') {
					var objVal = obj.getValue();
					// 如果获取到的value为object，则进行合并
					// 只有小区的是特殊的
					if (typeof objVal === 'object') {
						$.extend(data, objVal)
					} else {
						data[obj.dataName] = objVal;
					}
					// data[obj.opts.name] = obj.getValue();
				}
			}
			// console.log('Controller.getFormData');
			// console.log(data);
			if(____json4fe.catentry[1].dispid=='310'){
				var joinData=function(name1,name2){
					var restr;
					var ins1=Controller.records.get(name1),
						ins2=Controller.records.get(name2);
					if(ins1){
						if(ins2){
							restr=ins1.getValue()+'|'+ins2.getValue();
						}else{
							restr=ins1.getValue();
						}
					}else{
						if(ins2){
							restr=ins2.getValue();
						}else{
							return;
						}
					}
					return restr;
				};
				data.hunchepinpai=joinData('touchepinpai','genchepinpai');
				data.hunchechexi=joinData('touchechexi','genchechexi');
				data.huncheyanse=joinData('toucheyanse','gencheyanse');
			}
			data.userid = userid;
			data.postparam_userid=userid;//针对代客操作的userid dobulecheck
			data.hidPostParam=0;//区别发帖机，固定传0

			// 单独为校验码写入
			// @todo 把隐藏域拿出来加入配置
			data.captcha_type = $('#captcha_type_iqas').val() || '';
			data.captcha_input = $('#captcha_input').val() || '';
			// iqas校验用，防灌水
			if(typeof iqas_mcvalue!=='undefined'&&typeof iqas_mcformula!=='undefined'){
				data.iqas_mcresult=eval(iqas_mcformula.replace('checkValue', iqas_mcvalue));
			}
			var yzminstance = Controller.records.get("yzm");
			if (yzminstance&&!yzminstance.rows.containerElem.is(":hidden")&&yzminstance.captchaConfigs&&yzminstance.captchaConfigs.post_captcha_biz){
				data.post_captcha_biz = yzminstance.captchaConfigs.post_captcha_biz;
				data.captcha_type = yzminstance.captchaConfigs.type;
				data.captcha_input = yzminstance.getValue();
				data.captcha_responseid = Controller.limit.responseid;
                data.captcha_encryptedKey = yzminstance.captchaConfigs.type == 400 ? yzminstance.captchaConfigs.msg_encryptedKey : yzminstance.captchaConfigs.voice_encryptedKey
			}
			// 统计用
			data.GTID = window.GTID || '';
			return data;

		},
		getFormText: function() {
			var data = {};
			for (var i = 0; i < this.records.list.length; i++) {
				var obj = this.records.list[i];
				if (obj.opts && !obj.opts.isFreeze &&obj.opts.type != 'rearLogin'&&obj.opts.type!="text") {
					var objVal = obj.getValue();
					// 如果获取到的value为object，则进行合并
					if (typeof objVal === 'object') {
						$.extend(data, objVal)
					} else if(obj.getText){
						data[obj.opts.name] = obj.getText();
					}else {
						data[obj.opts.name] = objVal;
					}
				}
				if (obj.opts && (obj.opts.type === 'selector' || obj.opts.type === 'checkbox' || obj.opts.type === 'radio' ||obj.opts.type=='squareRadio')) {
					data[obj.opts.name] = obj.getText();
				}
			}
			return data;

		},
		// 通过后台返回的list显示表单校验后的提示信息
		showCheckTips: function(checkObj) {
			Controller.callRecordFunc(checkObj.name, 'showCheckTip', checkObj);
			// var item = this.records.get(checkObj.name);
			// if(Object.prototype.toString.call(item) === '[object Array]') {
			// 	for(var i=0; i<item.length; i++) {
			// 		var obj = item[i];
			// 		if(!!obj && typeof obj.showCheckTip === 'function') {
			// 			obj.showCheckTip(checkObj);
			// 		}
			// 	}
			// } else if(!!item && typeof item.showCheckTip === 'function'){
			// 	item.showCheckTip(checkObj);
			// }
		},
		bUseServerCheck: function() {
			var isServerCheck = this.getUrlParam('server_check');
			if (isServerCheck == 1) {
				return true;
			}
			return false;
		},
		/* 取得url参数 (未经过decodeURIComponent处理的)*/
		getUrlParam: function(paras) {
			var url = location.href;
			var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
			var paraObj = {};
			var i, j;
			for (i = 0; j = paraString[i]; i++) {
				paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
			}
			var returnValue = paraObj[paras.toLowerCase()];
			if (typeof(returnValue) == "undefined") {
				return "";
			} else {
				return returnValue;
			}
		},
		setSubmit: function(submitObj) {
			this.submit = submitObj;
		},
		/**
		 * 调用指定name组件方法的函数
		 * 由于组件中使用dataName来做和后台字段的对应值，所以通过name获取到的对象可能是Array
		 * @param  {组件的name或者对应的dataName}
		 * @param  {调用的方法名}
		 * @param  {需要传递的参数}
		 * @return {}
		 */
		callRecordFunc: function(name, funcName, args) {
			var item = this.records.get(name);
			if(Object.prototype.toString.call(item) === '[object Array]') {
				for(var i=0; i<item.length; i++) {
					var obj = item[i];
					if(!!obj && typeof obj[funcName] === 'function') {
						obj[funcName](args);
					}
				}
			} else if(!!item && typeof item[funcName] === 'function'){
				item[funcName](args);
			}
		},
		records: {
			data: {},
			list: [],
			get: function(name) {
				return this.data[name];
			},
			set: function(name, instance) {
				// 别名/实例
				this.data[name] = instance;
				// 如果存在dataName
				if(instance.opts && instance.dataName === instance.opts.dataName) {
					if(!this.data[instance.dataName]) {
						this.data[instance.dataName] = [];
					}
					// 字段/实例列表
					this.data[instance.dataName].push(instance);
				}
				this.list.push(instance);
			},
			/**
			 * 清除当前记录的实例
			 * @param  {String} name 实例对应的字段值
			 * @return {[type]}      [description]
			 */
			remove: function(name) {
				this.data[name] = null;
				var length = this.list.length;
				var i = length-1;
				for( ; i>0; i--) {
					if(this.list[i].opts && this.list[i].opts.name === name) {
						this.list.splice(i, 1);
					}
				}
			}
		},
		/**
		 * 通过组件的name获取value，这里的value指的是需要传递给服务器的value，并不一定是显示的值
		 * @param  {[type]} name [description]
		 * @return {[type]}      [description]
		 */
		getValByName: function(name) {
			var obj = Controller.records.data[name];
			if (obj && obj.getValue) {
				return obj.getValue();
			} else {
				throw new Error("对象 " + name + "不存在，或者没有getValue方法");
			}
		},
		/**
		 * 用于触发表单发送，慎用
		 * @return {}
		 */
		triggerSubmit: function() {
			var submitObj = this.submit;
			submitObj.send();
		},
		/**
		 * 只在点击时调用，其他地方不要调用
		 * @return {}
		 */
		canSubmit: function() {
			var _self = this;
			var rearLogin = this.records.get('rearLogin');
			var canSubmit = false;
			if (!rearLogin) {
				canSubmit = (typeof userid !== 'undefined' && userid != '0');
			} else {
				canSubmit = rearLogin.isLogin();
			}
			if (false === canSubmit && typeof rearLogin !== 'undefined') {
				rearLogin.show();
				rearLogin.doLogin();
			}
			// @todo 异步校验
			if (this.captcha && !_self.bCaptchaValid) {
				this.captcha.check(function(bSuccess) {
					_self.bCaptchaValid = bSuccess;
					if (canSubmit && bSuccess) {
						_self.triggerSubmit();
					}
				});
				return false;
			} else {
				return canSubmit;
			}
		},
		/**
		 * 解析observe相关的配置数据
		 * @param  {[type]} name [description]
		 * @param  {[type]} data [description]
		 * @return {[type]}      [description]
		 */
		anylizeObserve: function(name, data) {
			var observor = Controller.records.get(name);
			var targets = data.targets;
			var valueMap = {};
			var args = [];
			for (var i = 0; i < targets.length; i++) {
				// 初始化值
				// 注册当前key
				(function(target, index) {
					var key = target.name + '.' + target.action;
					args[index] = {
						name: target.name,
						value: null
					};
					Controller.observor.subscribe(key, function(value) {
						// 每一个改变的时候，改变当前的valueMap对象
						if (value) {
							args[index].value = value;
							valueMap[target.name] = value;
						}
						Controller.observor.publish(name + '.' + data.action, args);
					});
				})(targets[i], i);
			}
		},
		/**
		 * 观察者相关，主要用于多个数据源汇集后，触发制定组件的相关事件
		 * 这里如果使用dataFrom和dataTo，会造成多次触发的性能问题
		 * 所以用观察者来代替dataFrom和dataTo，其他情况还是使用dataTo和dataFrom配置
		 * @enum {Object}
		 */
		observor: {
			map: {},
			subscribe: function(key, callback) {
				if (!this.map[key]) {
					this.map[key] = [];
					this.map[key].push(callback);
				}
			},
			publish: function(key, valueMap) {
				if (this.map[key]) {
					var callbacks = this.map[key];
					for (var i = 0; i < callbacks.length; i++) {
						var callback = callbacks[i];
						callback(valueMap);
					}
				}
			}
		},
		/**
		 * 初始化并显示验证码功能
		 * @param  {Number} code 后台返回的code
		 * @return {}
		 */
		showCaptcha: function(code) {
			// 只能是通过submit返回调用该方法
			var _self = this;
			// _self.bCaptchaValid = false;
			var captcha = require('component/captcha/js/captcha');
			// console.warn('showCaptcha');
			// console.log(this.submit);
			if (!this.captcha) {
				this.captcha = captcha;
				var Rows = require('component/rows/js/rows');
				var rows = new Rows({
					'title': '验证码'
				});
				this.submit.rows.containerElem.before(rows.containerElem);
				_self.yanzmRows = rows;
			}
			this.captcha.init(code, {
				appendToDOM: function($elem, isCommon, isEnt) {
					$elem.appendTo(_self.yanzmRows.contentElem);
				},
				phoneId: 'Phone'
			});
		},
		/**
		 * 新增handlers处理
		 * 可供其他非核心组件使用，无需在formDefine中做多余的配置
		 * 修改时候，只要修改入口文件的引用即可，不用再formDefine中配置
		 * @type {Object}
		 */
		handlers: {
			records: {
			},
			trigger: function(type, data) {
				var typeObj = Controller.records[type];
				if(typeObj) {
					for(var key in typeObj) {
						if(typeObj.hasOwnProperty(key)) {
							var funcList = typeObj[key];
							if(funcList && funcList.length > 0) {
								var length = funcList.length;
								for(var i=0; i<funcList.length; i++) {
									if(typeof funcList[i] === 'function') {
										funcList[i](data);
									}
								}
							}
						}
					}
				}
			},
			/**
			 * 绑定方法，必须要传type和sourceKey
			 * sourceKey是为了区分不同的非核心组件，单独模块内绑定尽量用同一个sourceKey
			 * @param  {String} type      自定义的事件类型
			 * @param  {String} sourceKey 组件自己定义的统一key
			 * @param  {Function} handler   绑定的事件
			 * @return {}
			 */
			bind: function(type, sourceKey, handler) {
				var typeObj = Controller.records[type] ;
				if(!typeObj) {
					Controller.records[type] = {};
					typeObj = Controller.records[type];
				}
				if(!sourceKey) {
					// 必须传入sourceKey
					return;
				}
				if(!typeObj[sourceKey]) {
					typeObj[sourceKey] = [];
				}
				typeObj[sourceKey].push(handler);
			},
			/**
			 * 解绑事件，type必传
			 * @param  {String} type      自定义的事件类型
			 * @param  {String} sourceKey 组件自定义的统一key，可不传，如不传则默认删除所有type相关的事件处理函数，建议传入当前模块统一的key
			 * @return {}
			 */
			unbind: function(type, sourceKey) {
				if(typeof type !== 'string' || type.length < 1) {
					// todo 是否需要抛出异常
					return;
				}
				var typeObj = Controller.records[type];
				if(!typeObj) {
					return;
				}
				// 如果不穿sourceKey或者传入为空，则默认为删除所有相关的handlers
				if(!sourceKey || typeof sourceKey !== 'string') {
					typeObj = {};
					return;
				}
				var funcList = typeObj[sourceKey] || [];
				if(!funcList || funcList.length < 1) {
					return;
				}
				// 清空
				funcList = [];
			}
		}
	};
	return Controller;
});
/**
 * 行级区域组件
 * @module component/rows
 */
define('component/rows/js/rows',['Controller/Controller'], function(Controller) {
	/**
	 *  @constructor
	 *  @alias module:component/rows
	 *  @param {Object} opt 配置文件 
	 */
	function Rows(opt) {
		this.opts = $.extend(true, {}, this.constructor.opts, opt);
		this.validMap = {};
		this.createElem();
	}
	var rowIndexCount = 1000;//行元素层级索引值
	/** @enum  {Object} 静态配置文件，所有的默认值都在这里初始化 */	
	Rows.opts = {
		/** @type {String} 组件的类型 */
		type: 'rows',
		/** @type {String} 显示的标题名 */
		title: '', 
		/** @type {String} 增加的className */
		className: '',
		/** @type {Object} 默认的class名，不要随意修改和传入 */
		defaultClassName: {
			/** @type {String} 容器的className */
			wrap: 'rows_wrap',
			/** @type {String} 标题的className */
			title: 'rows_title',
			/** @type {String} 内容区域的className */
			content: 'rows_content'
		}
	}
	Rows.prototype = {
		constructor: Rows,
		// 默认值
		type: 'rows',
		title: '基础信息', //基础信息、详情描述、其他说明、联系方式
		className: 'rows_wrap',
		/**
		 * 初始化方法
		 */
		init: function(){
			this.createElem();
		},
		/**
		 * 生成相应的DOM对象
		 */
		createElem: function() {
			this.createElemByDefault();
			this.setExtraAttr();
		},
		/**
		 * 通过默认配置生成DOM对象
		 */
		createElemByDefault: function(){
			var opts = this.opts;
			var titleElem = $('<div>').addClass(opts.defaultClassName.title).append('<span>' + opts.title + '</span>');
			this.contentElem = $('<div>');
			this.contentElem.append('<div class="tip"></div>')
			this.containerElem = $('<div>').attr('class', opts.defaultClassName.wrap).addClass('clearfix');
			// 样式中右侧内容采用float，所以先append内容区域
			this.containerElem.append(this.contentElem);
			this.containerElem.css("z-index",rowIndexCount--);
			if(1 !== this.opts.columNum) {
				this.containerElem.append(titleElem);
				this.contentElem.addClass(opts.defaultClassName.content);
			} else {
				this.contentElem.addClass(opts.defaultClassName.content + this.opts.columNum);
			}
			if(this.opts.displayStatus === 'hide') {
				this.hide();
			}
		},
		addStar: function() {
			if(typeof this.bAddStar === 'undefined') {
				this.bAddStar = true;
                var titleSpanElem = this.containerElem.find('.' + this.opts.defaultClassName.title + ' span');
				var oldTitle = titleSpanElem.html();
				titleSpanElem.html('<span class="rows_title_star">*</span>' + oldTitle);
			}
		},
		removeStar:function(){
			if(this.bAddStar) {
				this.bAddStar = undefined;
				var titleSpanElem = this.containerElem.find('.' + this.opts.defaultClassName.title + ' span');
				titleSpanElem.find($(".rows_title_star")).remove();
				/*var oldTitle = titleSpanElem.html();*/
				//titleSpanElem.html('<span class="rows_title_star">*</span>' + oldTitle);
			}
		},
		hide: function(){
			this.containerElem.hide();
			// todo优化
			var block = this.containerElem.parents('.block_content');
			var bBlockHide = true;
			block.children().each(function() {
				if(!$(this).is(':hidden')) {
					bBlockHide = false;
				}
			});
			if(bBlockHide == true) {
				block.parents('.block_wrap').hide();
			}
			this.hideBlock();
		},
		hideBlock: function() {
			var block = this.containerElem.parents('.block_content');
			var bBlockHide = true;
			block.children().each(function() {
				if(!$(this).is(':hidden')) {
					bBlockHide = false;
				}
			});
			if(bBlockHide == true) {
				block.parents('.block_wrap').hide();
			} 
		},
		show: function(){
			this.containerElem.show();
            if(this.containerElem.find(".optiondef").length>0){
                this.containerElem.find(".optiondef").hide();
                this.containerElem.find(".focus").removeClass("focus");
            }
			this.containerElem.find('.validate_success').css({
				left: this.getChildWidth()
			})
			this.containerElem.parents('.block_wrap').show();
		},
		/**
		 * 根据传入的值，设置其他属性
		 */
		setExtraAttr: function(){
			var opts = this.opts;
			if(typeof opts.className === 'string' && opts.className.length > 0) {
				this.containerElem.addClass(opts.className);
			}
		},
		/**
		 * 将容器插入到页面上
		 */
		render: function(wrap,prevContainerElem) {
            if(prevContainerElem){
                prevContainerElem.after(this.containerElem);
            }else{
                this.containerElem.appendTo(wrap);
            }
		},
		/**
		 * 记录当前行中的组件
		 * @param {String} name      对应的表单name
		 * @param {Boolean} bValidate 是否校验通过
		 */
		setValidateStatus: function(name, bValidate) {
			this.validMap[name] = bValidate;
		},
		/**
		 * 获取当前行的校验状态
		 */
		getValidateStatus: function() {
			for (var key in this.validMap) {
				if (this.validMap[key] === false) {
					return false;
				}
			}
			return true;
		},
		/**
		 * 获取需要触发校验的组件列表
		 */
		getTriggerArray: function(){
			var list = [];
			for (var name in this.validMap) {
				list.push({
					funcName: 'doCheck',
					target: {
						'name': name
					}
				});
			}
			// console.log(list);
			return list;
		},
		getChildWidth: function() {
			//var lastChild = this.containerElem.find('.' + this.opts.defaultClassName.content + '>div:last-child');
			// console.log(lastChild.offset()); //最后一个应该是可视的 有可能存在隐藏
			var lastChild = this.containerElem.find('.' + this.opts.defaultClassName.content + '>div:visible:last');
			if(lastChild.length>0){
				var left = lastChild.offset().left  + lastChild.outerWidth() - this.contentElem.offset().left;
			}
			else{
				left = 0;
			}
			return left;
		},
		/**
		 * 触发当前行上的组件校验规则
		 */
		doCheck: function() {
			Controller.triggerCheck(this.getTriggerArray());
		}
	}
	return Rows;
});
define('component/validate/js/validate',['Controller/Controller'], function(Controller) {
	var validate = {
		check: function(rules, value, rows) {
			rules = rules || [];
			var rowContainer = rows.containerElem;
			var tipElem = rowContainer.find('.tip'); //'.' + rowClass + ' .tip'
            //或验证处理
            for (var i = 0; i < rules.length; i++) {
                var ruleObj = rules[i];
                if(ruleObj.type=="orNotCannull"){
                    var checkObj = checkFunc.orNotCannull(ruleObj.value, value, ruleObj.msg, rules);
                    return checkObj;
                }
            }
			for (var i = 0; i < rules.length; i++) {
				var ruleObj = rules[i];
				var checkObj = checkFunc[ruleObj.type](ruleObj.value, value, ruleObj.msg, tipElem);
				if (false === checkObj.bValid) {
					// console.log('validate', ruleObj.type)
					return checkObj;
				}
			}
			// if(rows.getValidateStatus()) {
			// 	view.showTip(tipElem, '', 'success');
			// }
			return {
				bValid: true,
				msg: ''
			};
		},
		/**
		 * 显示提示信息
		 * @param  {String} selector tips元素的选择器
		 * @param  {String} msg      提示语
		 * @param  {String} status   状态信息.warning|error
		 * @return {[type]}          [description]
		 */
		showTip: function(tipElem, msg, status, left) {
			// console.log(tipElem)
			if (!status) {
				status = 'error';
			}
			tipElem.html('<i></i>' + msg).show().attr('class', 'tip validate_' + status);
			if(status === 'success') {
				tipElem.css({
					left : left + 12
				});
			} else {
				tipElem.css({
					left: 0
				});
			}
		},
		hideTip: function(tipElem) {
			tipElem.html('').hide().attr('class', 'tip');
		},
		showLoading: function(tipElem, msg, status, left) {
			tipElem.html('<i></i>' + msg).show().attr('class', 'tip validate_' + status);
			if(status === 'success') {
				tipElem.css({
					left : left + 12
				});
			} else {
				tipElem.css({
					left: 0
				});
			}
			return tipElem
		},
		hideLoading: function(){
			tipElem.html('').hide().attr('class', 'tip');
		}
	};
	var checkFunc = {
		// maxLength
		maxLength: function(max, value, msg, selector) {
			var bValid = true;
			if (value.length > max) {
				bValid = false;
			}
			return {
				bValid: bValid,
				msg: msg
			};
		},
		minLength: function(min, value, msg, selector) {
			var bValid = true;
			if (value.length < min) {
				bValid = false;
			}
			return {
				bValid: bValid,
				msg: msg
			};
		},
		/*reg: function(regStr, value, msgs, selector) {
			var bValid = true;
			patterns = regStr.split('#');
			msgs = msgs.split('#');
			var j = 0,
				lenj = patterns.length;
			for (; j < lenj; j++) {
				var pattern = patterns[j],
					msg = msgs[j],
					regexp = new RegExp(pattern);
				if (!regexp.test(value)) {
					bValid = false;
					return {
						bValid: bValid,
						msg: msg
					};
				}
			}
			return {bValid:true};
		},*/
		reg: function(regStr, value, msgs, selector) {
			var bValid = true;
			var pattern = regStr , msg = msgs;
			//msgs = msgs.split('#');
			regexp = new RegExp(pattern);
				if (!regexp.test(value)) {
					bValid = false;
					return {
						bValid: bValid,
						msg: msg
					};
				}
			
			return {bValid:true};
		},
		regf: function(regStr, value, msgs, selector) {
			var bValid = true;
			var pattern = regStr , msg = msgs;
			//msgs = msgs.split('#');
			regexp = new RegExp(pattern);
				if (regexp.test(value)) {
					bValid = false;
					return {
						bValid: bValid,
						msg: msg
					};
				}
			
			return {bValid:true};
		},
		lessThan: function(target, value, msg, selector) {
			var bValid = true;
			if (parseInt(value) < target) {
				bValid = false;
			}
			return {
				bValid: bValid,
				msg: msg
			};
		},
		moreThan: function(target, value, msg, selector) {
			var bValid = true;
			if (parseInt(value, 10) > target) {
				bValid = false;
			}
			return {
				bValid: bValid,
				msg: msg
			};
		},
		step: function(step, value, msg, selector) {
			var bValid = true;
			var vNum = value / step;
			if (vNum.toFixed(0) / 1 !== vNum) {
				bValid = false;
			}
			return {
				bValid: bValid,
				msg: msg
			};
		},
		// 和其他组件对比
		maxValue: function(objName, value, msg, selector) {
			var bValid = true;
			var targetValue = Controller.records.get(objName).getValue();
			if (typeof targetValue !== 'undefined') {
				if (parseInt(value, 10) > parseInt(targetValue, 10)) {
					bValid = false;
				}
			}
			return {
				bValid: bValid,
				msg: msg
			};
		},
		minValue: function(objName, value, msg, selector) {
			var bValid = true;
			var targetValue = Controller.records.get(objName).getValue();
			if (typeof targetValue !== 'undefined') {
				if (parseInt(value, 10) < parseInt(targetValue, 10)) {
					bValid = false;
				}
			}
			return {
				bValid: bValid,
				msg: msg
			};
		},
		notIn: function(list, value, msg, selector) {
			var bValid = true;
			for(var i=0; i<list.length; i++) {
				//错误，应改为parseInt(value,10)
				if(parseIntvalue == list[i]) {
					bValid = false;
					break;
				}
			}
			return {
				bValid: bValid,
				msg: msg
			}
			// var targetValue = Controller.records.get(objName).getValue();
			// for(var i=0;i<value;i++){
			// 	if(targetValue==value[i])
			// 		bValid = false;
			// 		break;
			// 	}
			
			// return {
			// 	bValid: bValid,
			// 	msg: msg
			// };
		},
		//建议将in的引号去掉，保持风格统一
		'in': function(list, value, msg, selector) {
			var bValid = false;
			for(var i=0; i<list.length; i++) {
				if(value == list[i]) {
					bValid = true;
					break;
				}
			}
			return {
				bValid: bValid,
				msg: msg
			}
			// var bValid = false;
			// var targetValue = Controller.records.get(objName).getValue();
			// for(var i=0;i<value;i++){
			// 	if(targetValue==value[i])
			// 		bValid = true;
			// 	}
			
			// return {
			// 	bValid: bValid,
			// 	msg: msg
			// };
		},
		// 是否包含联系方式
		hasContact:function(list, value, msg, selector) {
			var regStr = /([0-9０１２３４５６７８９零一二三四五六七八九壹贰叁肆伍陆柒捌玖]{5})/;
			var reg = new RegExp(regStr);
			var regTestResult = reg.test(value);
			if (!regTestResult) {
				regStr = /(([qｑQＱ]+)(.?|.{1,5})(([0-9]|[０-９]|[零一二三四五六七八九]|[①-⑨]|[㈠-㈨])[-_@\~\#\$\%\^\&\*]*){5,13})|((([0-9]|[０-９]|[零一二三四五六七八九]|[①-⑨]|[㈠-㈨])[-_@\~\#\$\%\^\&\*]*){5,13}(.?|.{1,5})([qｑQＱ]+))/;
				reg = new RegExp(regStr);
				regTestResult = reg.test(value);
			}
			return {
				bValid: !regTestResult,
				msg: msg
			};
		},
        orNotCannull: function(objName, value, msg, rules) {
            var bValid = true;
            var reg = new RegExp("^[\\s]*$");
            var targetValue = Controller.records.get(objName).getValue();
            var regValue = reg.test(value);
            var regTargetValue = reg.test(targetValue);
            if (regValue && regTargetValue) {
                bValid = false;
            }else{
                if(!regValue){
                    for (var i = 0; i < rules.length; i++) {
                        var ruleObj = rules[i];
                        if(ruleObj.type!="orNotCannull"){
                            var checkObj = checkFunc[ruleObj.type](ruleObj.value, value, ruleObj.msg);
                            if (false === checkObj.bValid) {
                                return checkObj;
                            }
                        }
                    }
                }
            }
            if(bValid){
                //请出错误提示
                msg="";
            }
            return {
                bValid: bValid,
                msg: msg
            };
        }
	}

	return validate;
});
/**
 * 单选框
 * @module component/radio
 */
define('component/base/js/base',['Controller/Controller', 'component/validate/js/validate'], function(Controller, Validate) {
    /**
     *  @constructor
     *  @alias module:component/radio
     *  @param {Object} opt 配置文件 
     */
    function Base(opts, data) {
        this.init(opts, data);
    };

    /** 
     * 事件相关的静态变量，包括兼容处理的一些内容
     * @enum {Object}
     * @todo  提取到util中，Base引用util类，不要直接放在base中，否则增删改需要每次修改Base类
     */
    Base.EVENT = {
        KEY_CODE: {
            BackSpace: 8,
            TAB: 9,
            Space: 32,
            LeftArrow: 37,
            UpArrow: 38,
            RightArrow: 39,
            DwArrow: 40,
            Enter: 13,
            Zero: 48,
            Nine: 57,
            ZeroNumKeyboard: 96,
            NineNumKeyboard: 105,
            Delete: 46,
            F5: 116
        },
        TYPE: {
            INPUT: (function() {
                if ('oninput' in document) {
                    return 'input'
                } else {
                    return 'propertychange';
                }
            })()
        }
    };
    /** @enum {Object} 配置文件的默认值 */
    Base.opts = {
        /** @type {String} 组件的类型 */
        type: '',
        /** @type {String} 对应后端的字段 */
        name: '',
        /** @type {Object} 对应后端的字段 */
        view: {
            /** @type {String} 提示信息 */
            placeholder: '',
            /** @type {String} 前置插入的内容 */
            afterText: '',
            /** @type {String} 后置插入的内容 */
            beforeText: '',
            /** @type {String} 宽度 */
            width: ''
        },
        /** @type {Object} 要增加的dom元素属性 */
        attr: {},
        /** @type {Array} 校验规则列表 */
        checkRuler: [],
        /** @type {Array} 触发的规则 */
        funcs: []
    };
    /**
     * 默认的设置
     * @enum {Object}
     */
    Base.SETTING = {
        /**
         * 默认的className。包括wrap、title、content、multi
         * @type {Object}
         */
        CLASS: {},
        /** @type {Object} 组件状态，展示用。包括hover、focus、warn、success、error */
        STATUS: {
            /** @type {String} 悬浮状态 */
            HOVER: 'hover',
            /** @type {String} 处于焦点目标时 */
            FOCUS: 'focus',
            /** @type {String} 需要提示信息时 */
            WARN: 'warning',
            /** @type {String} 校验成功 */
            SUCCESS: 'success',
            /** @type {String} 校验失败 */
            ERROR: 'error'
        }
    };
    Base.prototype = {
        constructor: Base,
        init: function(opts, data) {
            this.opts = $.extend(true, {}, this.constructor.opts, opts);
            this.data = data;
            // 记录每一个elem对象
            this.items = [];
            this.value = '';
            this.createElem();
            this.initHandler();
            // dataName对应的是后端的数据库字段
            // 如果页面中相同字段有且仅有一个组件时，name和dataName相同，可以只配置name
            // 如果页面中相同字段有多个组件时候，dataName需要在formDefine中配置
            // 		name也需要重新定义，格式为 name+"1"，数字自行加1
            this.dataName = this.opts.dataName || this.opts.name;
            if (typeof this.dataName !== 'string') {
                throw new Error('init ' + this.opts.name + ' error: dataName must be string');
            }
        },
        /**
         * 生成domElement
         * @return {[type]} [description]
         */
        createElem: function() {},
        /**
         * 根据opt.view配置来设置elem的一些属性
         */
        setElemView: function() {},
        /**
         * 初始化事件绑定
         */
        initHandler: function() {
            this.bindCustomEvent();
            this.bindDomEvent();
        },
        /**
         * DOM事件处理
         */
        bindDomEvent: function() {},
        /**
         * 通过opts.funcs绑定自定义事件
         */
        bindCustomEvent: function() {
            var _self = this;
            var funcs = _self.opts.funcs;
            var l = funcs.length;
            var funcObj;
            for (var i = 0; i < l; i++) {
                funcObj = funcs[i];
                _self.container.bind(funcObj.evt, funcObj.handlers, function(e) {
                    _self.customEvent(e)
                });
                // console.log('bindCustomEvent');
                if (funcObj.setClickLog != undefined) {
                    _self.container.bind(funcObj.evt, funcObj.setClickLog, function(e) {
                        clickLog("from=" + funcObj.setClickLog);
                    });
                }
            }
        },
        /**
         * 自定义事件处理函数
         * @enum {Object}
         */
        customEvent: function(evt) {
            // console.log('customEvent');
            // 把当前的name值赋值到evt对象上
            evt.sourceName = this.opts.name;
            // 自定义事件需要通知控制
            Controller.triggerEvent(evt);
        },
        /**
         * 渲染到页面上
         * @param  {jQuery Object} wrapElem 容器元素
         */
        render: function(wrapElem) {
            if (this.opts.canNull === false) {
                this.rows.addStar();
            }
            if (this.container && this.container.length > 0) {
                this.container.appendTo(wrapElem);
            } else {
                // console.log('render error: this.container undefined')
            }
        },
        /**
         * 自动设置焦点，控制类调用，一般不会自己调用
         */
        focusTo: function() {},
        /**
         * 自动填充，控制类调用，一般不会自己调用
         */
        autoFill: function() {},
        /** @todo 设置属性 */
        setValue: function(value) {},
        /** 获取当前组件的value */
        getValue: function() {},
        /**
         * 组件校验方法
         */
        doCheck: function() {
            // 用调试，url增加server_check=1，则启动后台校验，前端校验一律跳过
            if (Controller.bUseServerCheck()) {
                return {
                    bValid: true,
                    msg: ''
                };
            }
            var checkObj = false;
            var value = this.getCheckValue ? this.getCheckValue() : this.getValue();
            // 只有当canNull为true并且value为空值的时候才直接跳过，并不更新状态
            this.opts.canNull = this.opts.canNull != null ? this.opts.canNull : true; /*默认true*/
            if (this.opts.canNull && !value && this.opts.type != 'timeTravel') {
                return {
                    bValid: true,
                    msg: ''
                };
            }
            /*else if (this.opts.defaultValue && this.opts.defaultValue === value || (typeof this.opts.defaultValue !== 'undefined' && this.opts.defaultValue.replace(/(^\s+)|(\s+$)/g , '') && value === '')) {
				// 当获取值与默认值相等的时候，直接返回true
				this.showCheckTip({
					bValid: true,
					msg: ''
				});
				return {
					bValid: true,
					msg: ''
				};
			}*/
            else {
                checkObj = Validate.check(this.opts.checkRuler, value, this.rows);
                this.showCheckTip(checkObj);
                return checkObj;
            }
        },
        scrollTo: function() {
            if (this.rows) {
                window.scrollTo(0, this.rows.containerElem.offset().top - 20);
            }
        },
        /**
         * 获取需要校验的值，由于一些组件会有html和id的存在
         * @return {[type]} [description]
         */
        getCheckValue: null,
        showCheckTip: function(checkObj) {
            var status = checkObj.bValid ? Base.SETTING.STATUS.SUCCESS : Base.SETTING.STATUS.ERROR;
            this.setClassByStatus(status);
            // TODO
            this.rows.setValidateStatus(this.opts.name, checkObj.bValid);
            var left = this.rows.getChildWidth();
            if (this.opts.type === 'radio' && checkObj.bValid === true) {} else {
                if (this.rows.getValidateStatus() === true) {
                    /*二手车-工程车：to:验证码未发送时是输入文本框输入内容，在前面显示勾*/
                    /*改为显示提示信息：请点击发送验证码  ---start*/
                    if (this.opts.type === 'captchaInput') {
                        if (left < 0) {
                            this.showTips("请点击按钮“发送验证码”");
                            return;
                        }
                    }
                    /*改为显示提示信息：请点击发送验证码  ---end*/
                    Validate.showTip(this.rows.containerElem.find('.tip'), checkObj.msg, status, left);
                } else {
                    if (this.dataName == "dizhi" || this.dataName == "xiangxidizhi" || this.dataName == "newcaraddress") {
                        !checkObj.bValid && Validate.showTip(this.rows.containerElem.find('.tip'), checkObj.msg, status, left);
                    } else if (checkObj.msg != "" && status != Base.SETTING.STATUS.SUCCESS) { //有可能前一个组件校验错误，第二个成功，此时不需要覆盖上一个组件的提示信息
                        Validate.showTip(this.rows.containerElem.find('.tip'), checkObj.msg, status, left); //校验成功的时候强更新提示信息。by zjj
                    }
                }
            }
        },
        showTips: function(msg) {
            Validate.showTip(this.rows.containerElem.find('.tip'), msg, Base.SETTING.STATUS.WARN);
        },
        hideTips: function() {
            Validate.hideTip(this.rows.containerElem.find('.tip'));
        },
        /**
         * 根据状态设置显示样式
         * @param {String} status 状态值
         */
        setClassByStatus: function(status) {
            var statusMap = ['hover', 'focus', 'active', 'success', 'error'];
            if (this.container && this.container.length > 0) {
                this.container.removeClass(statusMap.join(' ')).addClass(status);
            }
        },
        subscribe: function(key, callback) {
            Controller.observor.subscribe(key, callback);
        },
        publish: function(key, valueMap) {
            Controller.observor.publish(key, valueMap);
        },
        showRows: function() {
            if (this.rows) {
                this.rows.show();
            }
        },
        hideRows: function() {
            if (this.rows) {
                this.rows.hide();
            }
        },
        hide: function() {
            if (this.container) {
                this.container.hide();
            }
        },
        show: function() {
            if (this.container) {
                this.container.show();
            }
        },
        /**
         * 激活该组件，显示组件
         * 该组件的value收集在formData中
         * @return {} 
         */
        activate: function() {
            this.opts.isFreeze = false;
            if (this.opts.type.indexOf('Volatile') > -1) {
                Controller.records.get(this.opts.name).opts.isFreeze = false;
            }
            this.showRows();
        },
        /**
         * 冻结该组件，并隐藏
         * 该组件的value不收集在formDate中
         * @return {[type]} [description]
         */
        freeze: function() {
            this.opts.isFreeze = true;
            if (this.opts.type.indexOf('Volatile') > -1) {
                Controller.records.get(this.opts.name).opts.isFreeze = true;
            }
            this.hideRows();
        }
    }
    return Base;
});
//  https://github.com/aralejs/class/blob/master/class.js
// Class
// -----------------
// Thanks to:
//  
//  - http://mootools.net/docs/core/Class/Class
//  - http://ejohn.org/blog/simple-javascript-inheritance/
//  - https://github.com/ded/klass
//  - http://documentcloud.github.com/backbone/#Model-extend
//  - https://github.com/joyent/node/blob/master/lib/util.js
//  - https://github.com/kissyteam/kissy/blob/master/src/seed/src/kissy.js


// The base Class implementation.
define('util/Class',[],function() {
  function Class(o) {
    // Convert existed function to Class.
    if (!(this instanceof Class) && isFunction(o)) {
      return classify(o)
    }
  }


  // Create a new Class.
  //
  //  var SuperPig = Class.create({
  //    Extends: Animal,
  //    Implements: Flyable,
  //    initialize: function() {
  //      SuperPig.superclass.initialize.apply(this, arguments)
  //    },
  //    Statics: {
  //      COLOR: 'red'
  //    }
  // })
  //
  Class.create = function(parent, properties) {
    if (!isFunction(parent)) {
      properties = parent
      parent = null
    }

    properties || (properties = {})
    parent || (parent = properties.Extends || Class)
    properties.Extends = parent

    // The created class constructor
    function SubClass() {
      // Call the parent constructor.
      parent.apply(this, arguments)

      // Only call initialize in self constructor.
      if (this.constructor === SubClass && this.initialize) {
        this.initialize.apply(this, arguments)
      }
    }

    // Inherit class (static) properties from parent.
    if (parent !== Class) {
      mix(SubClass, parent, parent.StaticsWhiteList)
    }

    // Add instance properties to the subclass.
    implement.call(SubClass, properties)

    // Make subclass extendable.
    return classify(SubClass)
  }


  function implement(properties) {
    var key, value

    for (key in properties) {
      value = properties[key]

      if (Class.Mutators.hasOwnProperty(key)) {
        Class.Mutators[key].call(this, value)
      } else {
        this.prototype[key] = value
      }
    }
  }


  // Create a sub Class based on `Class`.
  Class.extend = function(properties) {
    properties || (properties = {})
    properties.Extends = this

    return Class.create(properties)
  }


  function classify(cls) {
    cls.extend = Class.extend
    cls.implement = implement
    return cls
  }


  // Mutators define special properties.
  Class.Mutators = {

    'Extends': function(parent) {
      var existed = this.prototype
      var proto = createProto(parent.prototype)

      // Keep existed properties.
      mix(proto, existed)

      // Enforce the constructor to be what we expect.
      proto.constructor = this

      // Set the prototype chain to inherit from `parent`.
      this.prototype = proto

      // Set a convenience property in case the parent's prototype is
      // needed later.
      this.superclass = parent.prototype
    },

    'Implements': function(items) {
      isArray(items) || (items = [items])
      var proto = this.prototype,
        item

      while (item = items.shift()) {
        mix(proto, item.prototype || item)
      }
    },

    'Statics': function(staticProperties) {
      mix(this, staticProperties)
    }
  }


  // Shared empty constructor function to aid in prototype-chain creation.
  function Ctor() {}

  // See: http://jsperf.com/object-create-vs-new-ctor
  var createProto = Object.__proto__ ?
    function(proto) {
      return {
        __proto__: proto
      }
    } :
    function(proto) {
      Ctor.prototype = proto
      return new Ctor()
    }


  // Helpers
  // ------------

  function mix(r, s, wl) {
    // Copy "all" properties including inherited ones.
    for (var p in s) {
      if (s.hasOwnProperty(p)) {
        if (wl && indexOf(wl, p) === -1) continue

        // 在 iPhone 1 代等设备的 Safari 中，prototype 也会被枚举出来，需排除
        if (p !== 'prototype') {
          r[p] = s[p]
        }
      }
    }
  }


  var toString = Object.prototype.toString

  var isArray = Array.isArray || function(val) {
    return toString.call(val) === '[object Array]'
  }

  var isFunction = function(val) {
    return toString.call(val) === '[object Function]'
  }

  var indexOf = Array.prototype.indexOf ?
    function(arr, item) {
      return arr.indexOf(item)
    } :
    function(arr, item) {
      for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i] === item) {
          return i
        }
      }
      return -1
    }
  return Class;
});
/**
 * 弹出框
 * @module component/PopTip
 */
define('component/popTip/js/popTip',['component/base/js/base', 'util/Class'], function(Base, Class) {

    /**
     *  @constructor
     *  @alias module:component/PopTip
     *  @param {Object} opt 配置文件 
     */
    var PopTip = Class.extend(Base);

    /**
     * 默认的className。包括wrap、title、content、multi
     * @type {Object}
     */
    PopTip.prototype.CLASS = {
        /** @type {String} 容器的className */
        WRAP: 'poptip_wrap',
        /** @type {String} 标题的className */
        TITLE: 'poptip_title',
        /** @type {String} 内容区域的className */
        CONTENT: 'poptip_content',
        /** @type {String} 当前后有内容时，需要增加的class */
        MULTI: 'clearfix'
    };
    PopTip.prototype.type = 'poptip';
    PopTip.prototype.createElem = function() {
        var opts = this.opts;
        this.container = $('<div>').addClass(this.CLASS.WRAP);
        // 增加自定义属性
        this.setElemView();
        // console.log(this.container);
    };
    PopTip.prototype.show = function(html) {
        // console.log(html);
        this.container.html(html).show();
    };
    PopTip.prototype.showTip = function(el, html) {
        var $wenhaoDom = $('<img class="poptip_wh"  src="//img.58cdn.com.cn/html/rsms/img/wenhao_tip.png" alt="问号图标" width="22" height="22">')
        var $tip = $('<div class="poptip_wrap"><div class="arrow_outer"><span class="arrow_inner"></span></div>' + html + '</div>')
        el.append($wenhaoDom).append($tip);
        $wenhaoDom.hover(
            function() {
                $tip.show();
            },
            function() {
                $tip.hide();
            });
    };
    PopTip.prototype.hide = function() {
        this.container.html('').hide();
    }
    PopTip.prototype.bindDomEvent = function() {};
    PopTip.prototype.getValue = function() {
        return this.elem.val();
    };
    return PopTip;
});
/**
 * 文本输入框
 * @module component/inputText
 */
define('component/inputText/js/inputText',['component/base/js/base' , 'util/Class', 'component/popTip/js/popTip', 'Controller/Controller','util/postClickLog'], function(Base, Class, PopTip, Controller,postClickLog) {
    "use strict";
	/**
	 *  @constructor
	 *  @alias module:component/inputText
	 *  @param {Object} opt 配置文件
	 */
	var InputText = Class.extend(Base);

	/**
	 * 默认的className。包括wrap、title、content、multi
	 * @type {Object}
	 */
	InputText.prototype.CLASS = {
		/** @type {String} 容器的className */
		WRAP: 'input_text_wrap',
		/** @type {String} 标题的className */
		TITLE: 'input_text_title',
		/** @type {String} 内容区域的className */
		CONTENT: 'input_text_content',
		/** @type {String} 当前后有内容时，需要增加的class */
		MULTI: 'clearfix'
	};
	InputText.prototype.type = 'inputText';
	InputText.prototype.createElem = function() {
		var _self = this;
		var opts = this.opts;
		this.container = $('<div>');
		this.container.addClass(this.CLASS.WRAP);
		this.container.attr('name', opts.name);
		this.container.css('position','relative');
		// TODO 增加父元素div或者span
		this.elem = $('<input>');
		/*二手车工程车专用，设置标题栏只读 --start--*/
		if(this.opts.view.readonly == true){
			this.elem.attr('readonly', true);
		}
		/*二手车工程车专用，设置标题栏只读 --end--*/
		this.elem.attr('type', opts.type);
		this.elem.attr('tabindex', opts.tabIndex);
		this.elem.attr('id', opts.name);
		// 增加自定义属性
		for(var key in opts.attr) {
			if(opts.attr.hasOwnProperty(key)) {
				this.elem.attr(key, opts.attr[key]);
			}
		}
		this.setElemView();
		var defaultValue = opts.defaultValue;
		if(defaultValue) {
			_self.elem.val(defaultValue);
			_self.elem.bind('focus', function(e) {
				if(_self.elem.val() === defaultValue) {
					_self.elem.val('');
				}
			});
			_self.elem.bind('blur', function(e) {
				if(_self.elem.val().replace(/^\s+|\s+$/ig, '') === '') {
					_self.elem.val(defaultValue);
				}
			});
		}
	};
	InputText.prototype.focusTo = function() {
		this.elem.focus();
	};
	InputText.prototype.setElemView = function() {
		var _self = this;
		var opts = this.opts;
		if (opts.view.width) {
			this.elem.css('width', opts.view.width);
		}
		if (opts.view.placeholder) {
			if(!('placeholder' in document.createElement('input'))) {
				_self.fixPlaceHolder(opts.view.placeholder,opts.name);
			}
			this.elem.attr('placeholder', opts.view.placeholder);
		}
		this.container.append(this.elem);
		// 添加到父元素上
		if (opts.view.afterText || opts.view.beforeText) {
			this.container.append($(opts.view.afterText));
			this.container.prepend($(opts.view.beforeText));
			this.container.addClass(this.CLASS.MULTI);
		}
	};
	InputText.prototype.fixPlaceHolder=function(defaultText,id){
	    var inputObj=this.elem;
	    var label=$('<label>');
	    label.html(defaultText);
	    label.attr('for',id);
	    this.container.prepend(label);
	    label.css({
	        'color':'#a9a9a9',
	        'line-height':'34px',
	        'cursor':'text',
	        'position':'absolute',
	        'left':'8px'
	    });
	    if(inputObj.val()!==''){
	        label.hide();
	    }
	    inputObj.on('focus',hidePlaceholder);
	    inputObj.get(0).attachEvent('onpropertychange',hidePlaceholder_ie);
	    inputObj.on('blur',showPlaceholder);
	    function hidePlaceholder(){
	        label.hide();
	    }
	    function hidePlaceholder_ie(){
	        if(window.event.propertyName==='value'&&window.event.srcElement.value!==''){
		    	label.hide();
		    }
	    }
	    function showPlaceholder(){
	        if(inputObj.val().replace(/^\s+$/ig,'')==='') {
	            label.show();
	        }
	    }
	};
	InputText.prototype.bindDomEvent = function() {
		var _self = this;
		_self.elem.bind('blur', function(e) {
			_self.setClassByStatus();
			// ie中需要调用e.target
			var target = e.relatedTarget;
            //失去焦点后去两边空格
            _self.elem.val($.trim(_self.elem.val()));
            _self.elem.val(_self.roundTohalf(_self.elem.val()));
            _self.value = _self.elem.val();
			// input做特殊处理
			var checkObj = _self.doCheck();
			_self.publish(_self.opts.name + '.valueChange', _self.getValue());
			if(checkObj.bValid === true && _self.rows.getValidateStatus() !== true) {
				_self.hideTips();
			}
			_self.container.triggerHandler('blur');
			_self.container.trigger('change', [_self.getValue()]);
		});

		_self.elem.bind('focus', function(){
			if(_self.opts.view.tips) {
				_self.showTips(_self.opts.view.tips);
			}
			_self.setClassByStatus(InputText.SETTING.STATUS.FOCUS);
			_self.elem.triggerHandler('focusin');
			var appType = businessData.isVipApp==0?"pc_":"pcv_"
			clickLog("from="+appType+____json4fe.catentry[1].dispid+"_click_"+_self.opts.name);  
		});

		//判断是否即时校验，免费开店组件需实时监控联系电话是否校验通过
		var funcs = _self.opts.funcs,
			immediatelyCheck = false;
		for(var i = 0,len = funcs.length; i<len; i++){
			if((funcs[i].evt == 'immediatelyCheckOk') || (funcs[i].evt == 'immediatelyCheckError')){
				immediatelyCheck = true;
				break;
			}
		}
		// TODO input事件兼容
		_self.elem.bind(InputText.EVENT.TYPE.INPUT, function(e) {
			if (e.KeyCode === InputText.EVENT.KEY_CODE.TAB) {
				_self.elem.triggerHandler('inputover');
			}

			if(immediatelyCheck){
				var checkObj = _self.doCheck();

				var checkValue = _self.getValue();
				var regMobile = /^1[3|4|5|7|8]\d{9}$/;
				if( (checkObj.bValid === true) && ( regMobile.test(checkValue) ) ) {
					_self.container.triggerHandler('immediatelyCheckOk');
				}else{
					_self.container.triggerHandler('immediatelyCheckError');
				}
			}

			// TODO 抽出特殊处理的程序
			// 考虑如何在初始化时就判断是否进行特殊值的判断？
			var maxLength = $(this).attr('maxLength');
			var value = $(this).val();
			if(!!maxLength) {
				if(value.length >= parseInt(maxLength, 10)) {
					_self.elem.trigger('inputover');
				}
			}
		});
	};
	InputText.prototype.disabled=function(){
		var _self = this;
		_self.elem.unbind("blur").unbind("focus");
		_self.elem.attr('readonly', true);
		_self.container.addClass("disabled");
	}
	InputText.prototype.undisabled=function(){
		this.bindDomEvent();
		_self.elem.attr('readonly', false);
		_self.container.removeClass("disabled");
	}
	InputText.prototype.focusEvent = function(){
		var _self = this;
		if(_self.opts.view.tips) {
				_self.showTips(_self.opts.view.tips);
			}
			_self.setClassByStatus(InputText.SETTING.STATUS.FOCUS);
			_self.elem.triggerHandler('focusin');
	}
	InputText.prototype.cancleEvent = function(){
			var _self = this;
			_self.elem.unbind('focus',_self.focusEvent);
	}
	InputText.prototype.showPopTip = function(data) {
		if(!data) {
			return;
		}
		// console.log('InputText.showPopTip');
		// console.log(data);
		this.showPriceTip(data);
	};
	 /**
	 *  显示组件 二手车增加使用
	 * @param {String} dataName
	 */
	InputText.prototype.hideUnit = function() {
			if(this.container){
				this.container.hide();
			}
	};
	InputText.prototype.showUnit = function() {
		if(this.container){
			this.container.show();
		}
	};

	InputText.prototype.showPriceTip = function(data) {
		var htmlStr = '<div class="arrow_outer"><div class="arrow_inner"></div></div><div class="title">' + data.suozaidi + data.huxingshi + '室</div>'
					+ '<div class="content">当前均价:<span>' + data.avgprice + '元/月</span></div>'
					+ '<div class="content">价格区间:<span>' + data.minprice + '元/月&nbsp;-&nbsp;' + data.maxprice + '元/月<span></div>';
		if(!this.popTip) {
			this.popTip = new PopTip();
			this.popTip.render(this.rows.containerElem);
			// console.log('render popTip')
		}
		this.popTip.show(htmlStr);

		var _self = this;
		function hide(){
			// console.log('alkdjsflkajsdflkjdsf')
			_self.popTip.hide();
			$(document).unbind('click keydown', hide);
		}
		setTimeout(function() {
			$(document).bind('click keydown', hide);
		}, 150);
	};
	InputText.prototype.getValue = function(){
		var value = this.elem.val();
		/* 暂时注释掉 价格默认价格是 面议 如果用户不操作输入框 则不会保存数据
		if(this.opts.view && value === this.opts.view.placeholder && !('placeholder' in document.createElement('input'))) {
			value = '';
		}*/
        if(!this.opts.allowSubmitDefaultValue){
            if(this.opts.defaultValue && this.opts.defaultValue == value) {
                value = '';
            }
        }
		return value;
	};
	InputText.prototype.setValue = function(val, text, bDefault){
		if(bDefault === true) {
			this.rows.show();
		}
		// 必须要传入值
		if(null == val) {
			return;
		}
		this.elem.val(val);
		this.value = val;
		this.text = text;
		this.doCheck();
	};
	InputText.prototype.getText =function(){
		/*如果没有text值 则默认为val*/
		if(this.text&&this.text!=""){
			return this.text;
		}else{
			return this.value;
		}
	}
	InputText.prototype.setFixTitle = function(text1,text2){
		var value = '';
		var languages = text2.split('|');
		if((text2 == '') || (typeof text1 != 'string')){
			value = '';
		}else if(languages.length == 1){
			value = languages[0]+' '+text1;
		}else{
			value = languages[0]+'等 '+text1;
		}
		this.setValue(value);
	};
	InputText.prototype.setDefTitle = function(text1,text2,text3){
		var value = ____json4fe.locallist.name+text3+"至"+text1+"("+text2+")";
		this.setValue(value);
	};

	/*设置工程车的标题*/
	InputText.prototype.gccBiaoti =  function(str1,str2){
			var reg = new RegExp("请选择");
			if(str1.trim()!==''&&!reg.test(str1.trim())&&str2.trim()!==''&&!reg.test(str2.trim())){
				this.elem.val("转让  " + str1 + ' ' + str2);
			}else{
				this.elem.val('');
			}
		};
		/*数字、空格，圆角转半角函数*/
		InputText.prototype.roundTohalf = function(str){
			var result = "";
			var len = str.length;
		    for (var i = 0; i < len; i+=1) {
		        if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
		            result += String.fromCharCode(str.charCodeAt(i) - 65248);
		        }
		        else {
		            result += String.fromCharCode(str.charCodeAt(i));
		        }
		    }
		    return result
		}

	return InputText;
});

/**
 * 单选框
 * @module component/radio
 */
define('component/radio/js/radio',['component/base/js/base' , 'util/Class', 'Controller/Controller', 'component/rows/js/rows'], function(Base, Class, Controller, Row) {
	function getConstructor(type, opts, data) {
		var F = require('component/' + type + '/js/' + type);
		return new F(opts, data);
	}

	/**
	 *  @constructor
	 *  @alias module:component/radio
	 *  @param {Object} opt 配置文件 
	 */
	var Radio = Class.extend(Base);

	/**
	 * 默认的className。包括wrap、title、content、multi
	 * @type {Object}
	 */
	Radio.prototype.CLASS = {
		/** @type {String} 容器的className */
		WRAP: 'radio_wrap',
		/** @type {String} 标题的className */
		TITLE: 'radio_title',
		/** @type {String} 内容区域的className */
		CONTENT: 'radio_content',
		/** @type {String} 当前后有内容时，需要增加的class */
		MULTI: 'clearfix',
		ITEM: 'radio',
		DEFAULT: 'custom'
	};
	Radio.prototype.type = 'radio';
	Radio.prototype.createElem = function() {
		// TODO
		// 1、实现修改
		// 2、是否
		var _self = this;
		this.container = $('<div>');
		this.container.addClass(this.CLASS.WRAP);
		this.container.attr('name', this.opts.name);
		if(this.data && this.data.values.id) {
			this.container.attr('nameid', this.data.values.id);
		}
		if(!_self.data) {
			return;
		}
		_self.renderChild();
		_self.setElemView();
	};

	Radio.prototype.renderChild = function() {	
		var _self = this;	
		var customStyles = _self.opts.customStyles || {};
		for(var i=0; i<_self.data.values.length; i++) {
			var dataObj = _self.data.values[i];
			var elem = getItemHtml(dataObj.val, dataObj.text);
			if(customStyles[dataObj.val]) {
				_self.container.addClass(_self.CLASS.DEFAULT);
				elem.find('i').addClass(customStyles[dataObj.val])
			}
			_self.items.push(elem);
			_self.container.append(elem);
		}
		// console.log(_self.opts.attr)
		// 增加自定义属性
		for(var key in _self.opts.attr) {
			if(_self.opts.attr.hasOwnProperty(key)) {
				$(_self.items).each(function() {
					$(this).attr(key, _self.opts.attr[key]);
				})
			}
		}

		// @TODO 增加父元素div或者span
		function getItemHtml(value, text) {
			var itemHtml = '<div tabindex="' + _self.opts.tabIndex + '" class="' + _self.CLASS.ITEM + '" data-value="' + value + '"><i></i><label>' + text + '</label></div>'
			var elem = $(itemHtml);
			return elem;
		}
	};

	/**
	 * @description 清除所有子元素
	 */
	Radio.prototype.flushChild = function() {
		_self.items = [];

	};

	Radio.prototype.disabled = function() {
		this.unbindEvent();
		this.container.addClass('radio_disabled');//setClassByStatus('disabled');
	};
	Radio.prototype.unbindEvent = function() {
		var itemSelector = '.' + this.CLASS.ITEM;
		this.container.find(itemSelector).unbind('focus blur');
		this.container.unbind('click keydown')
	}
	/**
	 * 根据opt.view配置来设置elem的一些属性
	 */
	Radio.prototype.setElemView = function() {
		if (this.opts.view.afterText || this.opts.view.beforeText) {
			this.container.prepend(this.opts.view.afterText);
			this.container.append(this.opts.view.beforeText);
		}
		if(this.opts.className) {
			this.container.addClass(this.opts.className);
		}
		this.container.addClass(this.CLASS.MULTI);
	};
	Radio.prototype.focusTo = function() {
		this.items[0].focus();
	};

	/**
	 * DOM事件处理
	 */
	Radio.prototype.bindDomEvent = function() {
		var itemSelector = '.' + this.CLASS.ITEM;
		var _self = this;
		_self.container.find(itemSelector).bind('focus', function(e) {
			_self.container.find(itemSelector).removeClass('hover');
			$(this).addClass('hover');
		});
		_self.container.find(itemSelector).bind('blur', function(e) {
			var $relatedTarget = $(e.relatedTarget);
			// 判断relatedTarget是否在组件容器内
			// 如果仍在容器内，则不触发inputover
			if(false === $relatedTarget.hasClass(_self.CLASS.ITEM) && $relatedTarget.parents(_self.CLASS.WRAP).length < 1) {
				// 如果不在容器内，则触发inputover属性
				// console.log('radio blur')
				_self.container.find(itemSelector).removeClass('hover');
				// 在当前组件blur的时候才触发校验
                var checkObj=_self.doCheck();
                if(checkObj.bValid === true) {
                    _self.hideTips();
                }
				// 校验后，触发inputover事件
				_self.container.triggerHandler('inputover');
			}
		});
		_self.container.bind('click', function(e){
			_self.container.focus();
			var target = e.target;
			// 点击当前选中内容，不做任何处理
			if($(target).hasClass('focus') || $(target).parents('.focus').length>0) {
				return;
			}
            //点击当前禁用灰显内容，不做任何修改
            if($(target).hasClass('disabled') || $(target).parents('.disabled').length>0) {
                return;
            }
			// @TODO 1、提取出对class、，对container的事件触发和赋值的操作
			if($(target).hasClass(_self.CLASS.ITEM) 
				|| ($(target).parents('.' + _self.CLASS.ITEM).length > 0 && (target=$(target).parents(itemSelector)[0]))) {
				var curIndex = $(target).index();
				_self.select(curIndex);
			}
			// /*二手车工程车isBiz商家和个人选择之后触发事件：显示或隐藏隐私保护 start---*/
			// _self.container.triggerHandler('operatePrivacy');
			// /*二手车工程车 end---*/
		});
		// keydown事件支持
		_self.container.bind('keydown', function(e) {
			var keycode = e.keyCode;
			if(Radio.EVENT.KEY_CODE.LeftArrow === keycode || Radio.EVENT.KEY_CODE.UpArrow === keycode) {
				_self.changeItem(-1);
			} else if(Radio.EVENT.KEY_CODE.RightArrow === keycode || Radio.EVENT.KEY_CODE.DwArrow === keycode) {
				_self.changeItem(1)
			} else if(Radio.EVENT.KEY_CODE.Space === keycode) {
				e.preventDefault();
				var i = $(e.target).index();
				_self.select(i);
			}
		});
	};
	/**
	 * 左右移动选择的处理函数
	 * @param  {Number} step 
	 */
	Radio.prototype.changeItem = function(step) {
		var i = this.container.find('.focus').index();
		i = i<0 ? 0 : i;
		i = (i + step + this.items.length) % this.items.length;
		this.select(i);
	};
	/**
	 * 设置选中选择元素
	 * @param  {Number} index 要选择元素的索引值
	 */
	Radio.prototype.select = function(index, valueState) {
		var selectItem = this.items[index];
		if(!selectItem) {
			return;
		}
		this.container.find('.' + this.CLASS.ITEM).removeClass('focus');
		selectItem.focus().addClass('focus');
		this.value = selectItem.data('value');
		if(valueState !== 1) {
			this.container.trigger('displayToggle');
			this.container.trigger('change', [this.getValue()]);
			this.handleRelateComp();
		}
		var checkObj = this.doCheck();
		if(checkObj.bValid === true) {
			this.hideTips();
		}
		/*二手车工程车isBiz商家和个人选择之后触发事件：显示或隐藏隐私保护 start---*/
			this.container.triggerHandler('operatePrivacy');
		/*二手车工程车 end---*/
	};
	/**
	 * 设置选中第一个元素
	 * @return {[type]} [description]
	 */
	Radio.prototype.selectFirst=function(){
		this.select(0);
	}
	/** 获取当前组件的value */
	Radio.prototype.getValue = function() {
		/*二手车工程车 start---*/
		this.container.triggerHandler('checklianxiren');
		/*二手车工程车 end---*/
		return this.value;
	};
	/*
		* 获取当前组件的value 用来获取去设置隐私保护显示或隐藏。
		* 和getValue区分，避免触发事件：checklianxiren
	*/
	Radio.prototype.getValueToPriv = function() {
		return this.value;
	};
	Radio.prototype.setValue = function(value, text, valueState) {
		var index = this.container.find('[data-value="' + value + '"]').index();
		this.select(index, valueState);
		// this.value = value;
	};
	Radio.prototype.getText = function(){
		var text = this.container.find('.focus label').html();
		return text;
	};
    /**
     * 为了满足整租、合租分类-出租方式 页面跳转
     */
    Radio.prototype.pageJump = function(toUrl) {
        if(toUrl){
            window.location=toUrl;
        }
    }
    /*
    * 禁用单个Radio
    */
    Radio.prototype.disabledOne = function(disabledValue) {
        var disabledOneRadio=this.container.find('[data-value="' + disabledValue + '"]');
        if(disabledOneRadio) {
            disabledOneRadio.removeClass("hover").removeClass("focus").addClass("disabled").unbind('focus blur');
        }
    };

    /**
     * 为二手做的兼容处理，需要动态更改dataName
     * @param {String} dataName 
     */
    Radio.prototype.setDataName = function(dataName) {
    	if(typeof dataName === 'string' && dataName.length > 0) {
    		this.dataName = dataName;
    	}
    };
    Radio.prototype.getDataName = function() {
    	return this.dataName;
    }
    /**
     * 重置数据源，二手中有该需求
     * @param  {Object} data 数据源对象
     */
    Radio.prototype.resetData = function(data) {
    	this.data = data;
    	this.items = [];
    	this.container.html('');
    	this.renderChild();
    	this.value = '';
    	this.handleRelateComp();
    };
    Radio.prototype.getParamId = function() {
    	return this.data.id || this.data.pid;
    }

	/**
	 * 返回后端需要的valId，同setValueId区分开
	 */
	Radio.prototype.getCurValId = function() {
		var value = this.getValue();
		var valId = null;
		for(var i=0; i<this.data.values.length; i++) {
			var obj = this.data.values[i];
			if(obj.val == value) {
				valId = obj.valId;
				break;
			}
		}
		return valId;
	};
	/**
	 * 二手车工程车-联系人-个人/车商：检测联系人是否填写，未填写设置显示包含联系人的提示信息
	 * 
	 */
	Radio.prototype.eqCheck = function() {
		this.opts.checkRuler = [{
		                        type: "regf",
		                        value: "^[\\s]*$",
		                        msg: "请完善联系人与选择个人或商家"
        					}];
	};
	/**
	 * 二手车工程车-联系人-个人/车商：检测联系人是否填写，填写了只显示个人和车商的提示信息
	 */
	Radio.prototype.notEqCheck = function() {
		this.opts.checkRuler =  [{
                        type: "regf",
                        value: "^[\\s]*$",
                        msg: "请选择个人或商家"
                    }];
	};
	/**
	 * 增加新的关联组件，每个组件都独立一行显示	
	 * @param {Array} conf 组件的配置列表
	 */
	Radio.prototype.addNewRow = function(confList) {
		var conf;
		for(var i=0; i<confList.length; i++) {
			conf = confList[i];
			// 防止多次创建
			if(Controller.records.get(conf.name)){
				Controller.records.get(conf.name).activate();
				break;
			}
			var instance = getConstructor(conf.type, conf, conf);
			this.addRelateComp(instance);
			//instance.lastInstance = lastInstance;
			// 将校验状态初始化到rows上
			var wpzkObj = Controller.records.get(this.opts.name);
			var rows = new Row({
				type: "rows",
				title: conf.title
			});
			rows.setValidateStatus(conf.name, !conf.checkRuler);
			instance.rows = rows;
			instance.block = this.block;
			wpzkObj.rows.containerElem.after(rows.containerElem)
			instance.render(rows.contentElem);
			Controller.records.set(conf.name, instance);
		}
	};

	/**
	 * 动态增加关联的组件
	 * @param {Object} compObj 组件实例
	 */
	Radio.prototype.addRelateComp = function(compObj) {
		if(!this.relatedCompMap) {
			this.relatedCompMap = {}	
		}
		var curList = this.relatedCompMap[this.getValue()];
		if(!curList) {
			curList = this.relatedCompMap[this.getValue()] =  [];
		}
		curList.push(compObj);
	};
	/**
	 * 处理关联的组件，通过获取当前的值和状态，激活或冻结关联组件
	 */
	Radio.prototype.handleRelateComp = function() {
		if(!this.relatedCompMap) {
			return;
		}
		var i=0;
		var value = this.getValue();
		if(this.opts.isFreeze) {
			value = '';
		}
		for(var key in this.relatedCompMap) {
			if(key == value) {
				for(i=0; i< this.relatedCompMap[key].length; i++) {
					this.relatedCompMap[key][i].activate();
				}
			} else {
				for(i=0; i< this.relatedCompMap[key].length; i++) {
					this.relatedCompMap[key][i].freeze();
				}
			}
		}
	};
	Radio.prototype.freeze = function() {
		this.constructor.superclass.freeze.call(this);
		this.handleRelateComp();
	};
	return Radio;
});
/**
 * 业务组件 发布人绑定微信功能
 * @module component/radio_faburen
 */
define('component/radio_faburen/js/radio_faburen',['component/base/js/base',
    'util/Class',
    'Controller/Controller',
    'component/radio/js/radio'
], function(Base, Class, Controller, radio) {
    /*继承至父组件radio*/
    var Radio_faburen = Class.extend(radio);
    Radio_faburen.prototype.type = 'radio_faburen';
    /*重写createElem方法*/
    Radio_faburen.prototype.createElem = function() {
            /*@todo调用超类中的父类方法*/
            this.constructor.superclass.createElem.bind(this)();
            /*@todo真正业务逻辑新增的DOM元素*/
        }
        /*重写事件绑定*/
    Radio_faburen.prototype.bindDomEvent = function() {
        /*@todo调用超类中的父类方法*/
        this.constructor.superclass.bindDomEvent.bind(this)();
        /*@todo真正业务逻辑事件绑定*/
        this.container.bind("change", this.showDifferwema.bind(this));
        //切换商家个人时候 vin码是否必填校验
        this.container.bind("change", function() {
            var isBiz = $(".radio_wrap[name=isBiz]").children("div[class*=focus]").attr("data-value")
            if (businessData.isVipUser == false && isBiz == "1" && (businessData.zhenche == true)) { /*上海行驶证和vin码照片必填*/
                var vinIns = Controller.records.get("vin");

                vinIns.rows.addStar();
                vinIns.opts.canNull = false;

            } else if (isBiz == "0") {
                var vinIns = Controller.records.get("vin");

                vinIns.rows.removeStar();
                vinIns.opts.canNull = true;
                $("div[name=vin]").removeClass("error");
                vinIns.hideTips();
            }
        })
        if (userid != null && userid != "") {
            this.showDifferwema();
        }
    }
    Radio_faburen.prototype.hasErweima = false;
    /*获取微信二维码URL*/
    Radio_faburen.prototype.getweixinurl = function() {
            //var ajaxUrl = "//123.56.144.200/web/index.php?r=qrcode/index&shopid="+userid +"&callback=?";
            var self = this;
            var faburen = Controller.records.get("isBiz")
            var isbiz = "";
            if (faburen) {
                isbiz = faburen.getValue();
            }
            if (this.hasErweima == true) {
                if (businessData.isVipApp == 0 && isbiz == "1") {
                    /*免费发布+商家时展示弹窗二维码*/
                    self.showBizerwema();
                }
                //return;
            }
            var ajaxUrl = "//post.58.com/ajax/?action=weixinqrcode&source=car&userid=" + userid + "&callback=?";
            $.ajax({
                url: ajaxUrl,
                type: "get",
                dataType: "jsonp",
                success: function(data) {
                    self.hasErweima = true;
                    var ajaxData = data;
                    self.erweimaUrl = ajaxData.url;
                    if (businessData.isVipApp == 0 && isbiz == "1") {
                        /*免费发布+商家时展示弹窗二维码*/
                        self.showBizerwema();
                    }
                    $(".weixin_content img").attr('src', self.erweimaUrl);
                    $(".weixin_business img").attr('src', self.erweimaUrl);
                    $(".weixin_business_vip img").attr('src', self.erweimaUrl);
                    $(".weixin_content img").css({
                        width: 114,
                        height: 114
                    });
                    $(".weixin_business img").css({
                        width: 114,
                        height: 114
                    });
                    $(".weixin_business_vip img").css({
                        width: 114,
                        height: 114
                    })
                }
            });
        }
        //选择个人和商家时弹出不同的微信二维码图层
    Radio_faburen.prototype.showDifferwema = function() {
            //var ajaxUrl = "//123.56.144.200/web/index.php?r=search&shopid="+userid +"&callback=?";
            var ajaxUrl = "//post.58.com/ajax?action=weixinchat&source=car&userid=" + userid + "&callback=?";
            var self = this;
            $.ajax({
                url: ajaxUrl,
                type: "get",
                dataType: "jsonp",
                success: function(data) {
                    var ajaxData = data;
                    var usercode = ajaxData.code;
                    if (usercode == false) {
                        self.erweimaUrl = "";
                        self.getweixinurl();
                        var isBiz = Controller.records.get("isBiz");
                        var values = "";
                        if (isBiz != undefined) {
                            values = isBiz.value;
                        }
                        var lianxirendiv = $("#goblianxiren").parent().parent();
                        if (values === 0) {
                            var genrenweixin = '<div class="weixin_content">' +
                                '<div class="erweima"><img src="' + self.erweimaUrl + '" style = "width:114px;height:114px"></div>' +
                                '<div class="weixin_title">' +
                                '<div class="wxtitle"><i class="wxbt">远离黄牛</i>，纯粹个人买家联系你</div>' +
                                '<div class="wxmsg">接收消息慢？发布消息引来却都是黄牛？<i class="wxnr">微信扫描加关注</i>，个人买家可快速与你沟通！远离黄牛，卖车快人一步！</div>' +
                                '</div>' +
                                '</div>';
                            lianxirendiv.append(genrenweixin);
                            $(".weixin_business").remove();
                        }
                        if (businessData.isVipApp == 0 && values == 1) {
                            var genrenweixin = '<div class="weixin_business">' +
                                '<div class="erweima"><img src="' + self.erweimaUrl + '" style = "width:114px;height:114px"></div>' +
                                '<div class="weixin_title">' +
                                '<div class="wxtitle"><i class="wxbt">快人一步</i>——买家主动微信联系你</div>' +
                                '<div class="wxmsg">老是不能及时接收到买车用户的信息？【快速卖车秘籍】，<i class="wxnr">微信扫描加关注</i>，即可第一时间接收消息与买家沟通，实时消息提醒，不再错过重要买家！</div>' +
                                '</div>' +
                                '</div>';
                            lianxirendiv.append(genrenweixin);
                            $(".weixin_content").remove();
                        }
                        if (businessData.isVipApp == 1) { //vip发布页全是商家身份
                            var genrenweixin = '<div class="weixin_business_vip">' +
                                '<div class="erweima"><img src="' + self.erweimaUrl + '" style = "width:114px;height:114px"></div>' +
                                '<div class="weixin_title">' +
                                '<div class="wxtitle"><i class="wxbt">快人一步</i><br>买家主动微信联系你</div>' +
                                '<div class="wxmsg">老是不能及时接收到买车用户的信息？【快速卖车秘籍】，<i class="wxnr">微信扫描加关注</i>，即可第一时间接收消息与买家沟通，实时消息提醒，不再错过重要买家！</div>' +
                                '</div>' +
                                '</div>';
                            lianxirendiv.append(genrenweixin);
                            $(".weixin_content").remove();
                        }

                    }
                }
            })
        },
        /*免费发布+商家时展示弹窗二维码*/
        Radio_faburen.prototype.showBizerwema = function() {
            return false; //暂时下线弹窗二维码需求 
            var self = this;
            var win_dom = $("<div class='erweima_win'>" +
                "<span class='rz_close'><img src='//img.58cdn.com.cn/ui7/car/fabu/rz_carclose.png'></span>" +
                "<div class='title'><h1>微信绑定</h1>" +
                "<p>可第一时间与买家沟通，实时消息提醒，不再错过意向买家！</p>" +
                "</div>" +
                "<div class='erweima'><img src='" + self.erweimaUrl + "' ></div>" +
                "<div class='footer'><span class='saoyisao_top'></span><span class='saoyisao_right'></span><span class='saoyisao_center'></span><span class='saoyisao_bottom'></span><span class='saoyisao_left'></span>请使用微信扫一扫</div>" +
                "</div>");
            var ovewriteDiv = $("<div class='ovewrite_erweima'></div>");
            if ($(".ovewrite_erweima").length == 0) {
                self.ovewriteDiv = ovewriteDiv;
                self.erweima_win = win_dom;
                self.loopCKUserState();
                win_dom.find(".rz_close").bind("click", function(e) {
                    self.ovewriteDiv.hide();
                    self.erweima_win.hide();
                    self.stopLoopCk = true; //停止轮训请求用户是否绑定微信请求
                    clickLog('from=esc_fabu_wx'); //手动关闭埋点
                })
            }
            $(".ovewrite_erweima").length == 0 && $(document.body).append(ovewriteDiv);
            $(".erweima_win").length == 0 && $(document.body).append(win_dom);
            clickLog('from=esc_fabu_wxgz'); //统计埋点

        }
        /*轮训监控用户是否扫描二维码关注*/
    Radio_faburen.prototype.loopCKUserState = function() {
        var self = this;
        self.stopLoopCk = self.stopLoopCk || false;
        if (self.stopLoopCk) {
            return;
        }
        var ajaxUrl = "//post.58.com/ajax?action=weixinchat&source=car&userid=" + userid + "&callback=?";
        $.ajax({
            url: ajaxUrl,
            dataType: "jsonp",
            success: function(data) {
                var ajaxData = data;
                if (ajaxData) {
                    var usercode = ajaxData.code;
                    if (usercode == false) {
                        /*没有关注继续监听*/
                        self.loopCKUserState();
                    } else {
                        /*扫描并且关注 关闭二维码弹窗和浮层*/
                        self.ovewriteDiv.hide();
                        self.erweima_win.hide();
                        clickLog('from=esc_fabu_wxgb');
                        $(".weixin_content").remove();
                        $(".weixin_business").remove();
                    }
                } else {
                    /*接口异常,再次请求试试*/
                    self.loopCKUserState();
                }
            },
            error: function() {
                /*接口异常,再次请求试试*/
                self.loopCKUserState();
            }
        });
    }
    return Radio_faburen;
});
/**
 * 复选框
 * @module component/checkbox
 */
define('component/checkbox/js/checkbox', ['component/base/js/base', 'util/Class', 'component/popTip/js/popTip'], function(Base, Class, PopTip) {
    /**
     *  @constructor
     *  @alias module:component/checkbox
     *  @param {Object} opt 配置文件 
     */
    var Checkbox = Class.extend(Base);
    Checkbox.prototype.type = 'checkbox';
    /**
     * 默认的className。包括wrap、title、content、multi
     * @type {Object}
     */
    Checkbox.prototype.CLASS = {
        /** @type {String} 容器的className */
        WRAP: 'checkbox_wrap',
        /** @type {String} 标题的className */
        TITLE: 'checkbox_title',
        /** @type {String} 内容区域的className */
        CONTENT: 'checkbox_content',
        /** @type {String} 当前后有内容时，需要增加的class */
        MULTI: 'clearfix',
        ITEM: 'checkbox'
    };
    Checkbox.prototype.init = function() {
        this.BooleanSupport = false;
        this.constructor.superclass.init.apply(this, arguments);
        this.bSelectAll = false;
        if (window.infoDetail && window.infoDetail[this.opts.dataName || this.opts.name]) {
            this.setValue(window.infoDetail[this.opts.dataName || this.opts.name]);
        }
    };
    Checkbox.prototype.createElem = function() {
        // TODO
        // 1、实现修改
        // 2、是否
        var _self = this;
        this.container = $('<div>');
        this.container.addClass(this.CLASS.WRAP);
        this.container.attr('name', this.opts.name);
        if (this.data && this.data.id) {
            this.container.attr('nameid', this.data.id);
        }
        // TODO 增加父元素div或者span

        function getItemHtml(value, text) {
            var itemHtml = '<div tabindex="' + _self.opts.tabIndex + '" class="' + _self.CLASS.ITEM + '" data-value="' + value + '"><i></i><label>' + text + '</label></div>'
            var elem = $(itemHtml);
            return elem;
        }
        if (_self.data) {
            for (var i = 0; i < _self.data.values.length; i++) {
                var dataObj = _self.data.values[i];
                if (dataObj.value && dataObj.value != null) {
                    dataObj.val = dataObj.value; //保持和其它组件data格式统一
                }
                var elem = getItemHtml(dataObj.val, dataObj.text);
                _self.items.push(elem);
                _self.container.append(elem);
            }
        } else {
            //默认支持勾选是1 取消勾选为0
            var elem = getItemHtml(1, this.opts.title);
            _self.items.push(elem);
            _self.container.append(elem);
            _self.BooleanSupport = true;
        }
        _self.setElemView();
        if (_self.opts.bSelectAll === true) {
            _self.initSelectAllElem();
        }
        if (typeof _self.opts.hideCount != 'undefined') {
            _self.initHideSomeItem();
        }
        if (this.opts.view.width) {
            _self.container.find('.' + _self.CLASS.ITEM).width(this.opts.view.width)
        }
    };
    //外部调用 重新初始化checkbox数据
    Checkbox.prototype.initData = function(data) {
        var _self = this;
        var itemsTemplate = "";
        if (data) {
            _self.BooleanSupport = false;
            _self.data = data;
            _self.items = []; //置空历史数据
            _self.container[0].innerHTML = "";
            for (var i = 0; i < data.values.length; i++) {
                var dataObj = data.values[i];
                if (dataObj.value && dataObj.value != null) {
                    dataObj.val = dataObj.value; //保持和其它组件data格式统一
                }
                var $itemHtml = $('<div tabindex="' + _self.opts.tabIndex + '" class="' + _self.CLASS.ITEM + '" data-value="' + dataObj.val + '"><i></i><label>' + dataObj.text + '</label></div>');
                _self.items.push($($itemHtml));
                //itemsTemplate =itemsTemplate+itemHtml;
                _self.container.append($itemHtml);
            }
            //_self.container.append($(itemsTemplate));
            if (_self.opts.bSelectAll === true) {
                _self.initSelectAllElem();
            }
            _self.activate(); //激活本组件
        } else {
            _self.items = []; //置空历史数据
            _self.container[0].innerHTML = "";
            _self.freeze(); //冻结
        }
    }
    Checkbox.prototype.initSelectAllElem = function() {
        var _self = this;
        var selectAllElem = $('<div class="select_all"><span>全选</span></div>');
        selectAllElem.bind('click', function() {
            _self.bSelectAll = !_self.bSelectAll;
            _self.selectAll(_self.bSelectAll);
            selectAllElem.find('span').html(_self.bSelectAll ? '取消' : '全选');
        });
        _self.container.append(selectAllElem);
    };
    Checkbox.prototype.initHideSomeItem = function() {
        var _self = this;
        var hideSomeElem = $('<div class="hide_some"><span>更多</span></div>');
        _self.bShowAll = false;
        _self.toggleSomeItem(false);

        hideSomeElem.bind('click', function() {
            _self.bShowAll = !_self.bShowAll;
            _self.toggleSomeItem(_self.bShowAll);
            hideSomeElem.find('span').html(_self.bShowAll ? '收起' : '更多');
        });
        _self.container.append(hideSomeElem);
    };
    Checkbox.prototype.toggleSomeItem = function(bShowAll) {
        var _self = this;
        if (bShowAll == true) {
            _self.container.children('.' + _self.CLASS.ITEM).show();
        } else {
            var allItems = _self.container.children('.' + _self.CLASS.ITEM);

            var len = allItems.length;
            var hideCount = _self.opts.hideCount;
            if (len <= hideCount) {
                return;
            }
            for (var i = hideCount; i < len; i++) {
                allItems.eq(i).hide();
            }
        }
    };
    /**
     * 根据opt.view配置来设置elem的一些属性
     */
    Checkbox.prototype.setElemView = function() {
        if (this.opts.view.afterText || this.opts.view.beforeText) {
            this.container.prepend(this.opts.view.afterText);
            this.container.append(this.opts.view.beforeText);
        }
        this.setViewPopTip();
        this.container.addClass(this.CLASS.MULTI);
    };

    Checkbox.prototype.focusTo = function() {
        this.items[0].focus();
    };
    // dom事件注册
    Checkbox.prototype.bindDomEvent = function() {
        var itemSelector = '.' + this.CLASS.ITEM;
        var _self = this;
        _self.container.find(itemSelector).bind('focus', function(e) {
            _self.container.find(itemSelector).removeClass('hover');
            $(this).addClass('hover');
        });
        _self.container.find(itemSelector).bind('blur', function(e) {
            var $relatedTarget = $(e.relatedTarget);
            // 判断relatedTarget是否在组件容器内
            // 如果仍在容器内，则不触发inputover
            if (false === $relatedTarget.hasClass(_self.CLASS.ITEM) && $relatedTarget.parents(_self.CLASS.WRAP).length < 1) {
                // 如果不在容器内，则触发inputover属性
                _self.container.find(itemSelector).removeClass('hover');
                _self.doCheck();
                _self.container.triggerHandler('inputover');
            }
        });
        if (_self.opts.maxSelectOptions) {
            function setMaxSelectTip() {
                //两种结构，正常的checkbox组件和rootType==checkbox的volidate组件
                var tipDom = ($(_self.container).siblings('.tip').length != 0) ? ($(_self.container).siblings('.tip')) : ($(_self.container).parent().parent().siblings('.tip'));
                var tipHTML = tipDom.html();
                if (tipHTML && ((tipHTML.indexOf('最多') != -1) && (tipDom.attr('class').indexOf('validate_warning') != -1))) {
                    return;
                } else {
                    tipHTML = '<i></i>';
                    tipDom.attr('class', 'tip validate_warning').html(tipHTML + '最多选择' + _self.opts.maxSelectOptions + '项').css('left', 0);
                }
            }
            setMaxSelectTip();
        }
        _self.container.bind('click', function(e) {
            var target = e.target;
            // TODO 1、提取出对class、，对container的事件触发和赋值的操作
            if ($(target).hasClass(_self.CLASS.ITEM) ||
                ($(target).parents(itemSelector).length > 0 && (target = $(target).parents(itemSelector)[0]))) {
                //最多选择maxSelectOptions项
                if (_self.opts.maxSelectOptions) {
                    setMaxSelectTip();

                    var selectedNum = $(_self.container).find('.focus').length;
                    if ((selectedNum >= parseInt(_self.opts.maxSelectOptions)) && !($(target).hasClass('focus'))) {
                        return;
                    }
                }

                $(target).toggleClass('focus');
                // 触发自定义事件
                _self.container.trigger('displayToggle');
            }
        });
        // keydown事件支持
        _self.container.bind('keydown', function(e) {
            var keycode = e.keyCode;
            if (Checkbox.EVENT.KEY_CODE.Space === keycode) {
                var i = $(e.target).index();
                _self.items[i].focus().toggleClass('focus');
                _self.container.trigger('displayToggle');
            }
        });
    };
    Checkbox.prototype.changeItem = function(step) {
        var i = this.container.find('.focus').index();
        i = i < 0 ? 0 : i;
        i = (i + step + this.items.length) % this.items.length
        this.items[i].focus().toggleClass('focus');
        this.container.trigger('displayToggle');
        this.container.trigger('change', [this.getValueList()]);
    };
    Checkbox.prototype.selectById = function(id) {
        //this.container.find('[data-value="' + id + '"]').focus().toggleClass('focus');
        this.container.find('.' + this.CLASS.ITEM).removeClass('hover');
        this.container.find('[data-value="' + id + '"]').addClass('focus');
    };
    Checkbox.prototype.getValue = function() {
        if (!this.BooleanSupport) {
            var values = [];
            this.container.find('.focus').each(function(index, obj) {
                values.push($(obj).data('value'));
            });
            //隐藏字段处理
            var _self = this;
            if (_self.opts.hiddenHandle && typeof _self.opts.hiddenHandle.name == "string" && typeof _self.opts.hiddenHandle.funcName == "string") {
                var result = _self[_self.opts.hiddenHandle.funcName](values);
                return result;
            }
            return values.join(',');
        } else {
            if (this.container.find('.focus').length > 0) {
                //勾选状态
                return 1;
            } else {
                return 0;
            }
        }
    };
    Checkbox.prototype.getCheckValue = function() {
            var _self = this;
            var checkvalue = _self.getValue();
            if (this.BooleanSupport) { return checkvalue; }
            //隐藏字段处理
            if (_self.opts.hiddenHandle && typeof _self.opts.hiddenHandle.name == "string" && typeof _self.opts.hiddenHandle.funcName == "string") {
                var values = [];
                this.container.find('.focus').each(function(index, obj) {
                    values.push($(obj).data('value'));
                });
                checkvalue = values.join(',');
            }
            return checkvalue;
        }
        /*
         用户一进发布页，本市是选中状态且不可以取消(默认第一个为本市)
         如果提交时用户没有选择其他城市，gobfuwufanwei传0
         如果提交时用户还勾选了其他城市，gobfuwufanwei传2
         如果提交时用户还勾选了其他城市，shi传竖线分隔的周边城市id
         */
    Checkbox.prototype.getHiddenValueFuwufanwei = function(values) {
        var _self = this;
        var result = {};
        var valuesLength = values.length;
        if (valuesLength == 0) {
            result[this.opts.name] = "";
            result[_self.opts.hiddenHandle.name] = "";
            return result;
        }
        var currentCityVal = _self.data.values[0].val;
        if (valuesLength == 1 && values[0] == currentCityVal) {
            result[this.opts.name] = "";
            result[_self.opts.hiddenHandle.name] = "0";
            return result;
        } else {
            for (var i = 0; i < valuesLength; i++) {
                var val = values[i];
                if (val == currentCityVal) {
                    values.splice(i, 1);
                }
            }
            result[this.opts.name] = values.join('|');;
            result[_self.opts.hiddenHandle.name] = "2";
            return result;
        }
    }
    Checkbox.prototype.getValueList = function() {
        var values = [];
        this.container.find('.focus').each(function(index, obj) {
            values.push($(obj).data('value'));
        });
        return values.join(',');
    };
    Checkbox.prototype.setValue = function(values, text, bDefault) {
        if (!this.BooleanSupport) {
            if (bDefault === true) {
                this.rows.show();
                this.selectAll(false);
            }
            if (!isNaN(values)) {
                values = values.toString();
            }
            var list = values.split(/(\||,)/); /*二手车多选兼容旧版本"|,"*/
            for (var i = 0; i < list.length; i++) {
                if (list[i] != "" && list[i] != "|" && list[i] != ",") {
                    this.selectById(list[i]);
                }
            }
        } else {
            var id = 1;
            if (values == 1) { //默认1,0
                this.container.find('.' + this.CLASS.ITEM).removeClass('hover');
                this.container.find('[data-value="' + id + '"]').addClass('focus');
            } else {
                this.container.find('.' + this.CLASS.ITEM).removeClass('focus');
                this.container.find('[data-value="' + id + '"]').addClass('hover');
            }
        }
        // 触发change事件
        this.container.trigger('displayToggle');
        this.container.trigger('change', [this.getValueList()]);
    };
    /**
     * 获取当前显示的文本
     * 文本内容只能获取不能设置，设置必须要调用setValue
     * @return {String} 通过"|"分隔
     */
    Checkbox.prototype.getText = function() {
        var textList = [];
        var text = '';
        this.container.find('.focus').each(function(index, obj) {
            text = $(obj).find('label').html();
            textList.push(text);
        });
        return textList.join('|');
    };
    /**
     * @todo 由于IE6下不能使用同级选择器，所以兼容处理
     * @param {[type]} status [description]
     */
    Checkbox.prototype.setClassByStatus = function(status) {}

    /*气泡提示*/
    Checkbox.prototype.setViewPopTip = function() {
        if (this.opts.view.popTip) {
            var content = "<div></div>";
            if (this.opts.view.popTip.content) {
                content = "<div><div class='arrow_outer'><i class='arrow_inner'></i></div>" + this.opts.view.popTip.content + "</div>";
            }
            this.container.append('<div class="view_poptip"></div>');
            if (!this.popTip) {
                this.popTip = new PopTip();
                this.popTip.render(this.container.find(".view_poptip"));
                this.popTip.hide();
            }
            var _self = this;
            _self.container.find(".view_poptip").hover(function() {
                    _self.popTip.show(content);
                },
                function() {
                    _self.popTip.hide();
                }
            );
        }
    };
    /*
     * 禁用Checkbox
     */
    Checkbox.prototype.disabled = function() {
        this.unbindEvent();
        this.container.addClass('checkbox_disabled');
    };
    Checkbox.prototype.undisabled = function() {
        this.bindDomEvent();
        this.container.removeClass('checkbox_disabled');
    }
    Checkbox.prototype.unbindEvent = function() {
            var itemSelector = '.' + this.CLASS.ITEM;
            this.container.find(itemSelector).unbind('focus blur');
            this.container.unbind('click keydown')
        }
        /*
         * 隐藏某一个Checkbox
         */
    Checkbox.prototype.hideOneCheckbox = function(value) {
        var OneCheckbox = this.container.find('[data-value="' + value + '"]');
        if (OneCheckbox) {
            OneCheckbox.removeClass("focus"); //隐藏的同时把值清空
            OneCheckbox.hide();
        }
    };

    Checkbox.prototype.selectAll = function(bSelect) {
        var funcName = bSelect ? 'addClass' : 'removeClass';
        var items = this.items;
        var length = items.length;
        var i = 0;
        for (; i < length; i++) {
            var item = items[i];
            item[funcName]('focus');
        }
        // 触发change事件
        this.container.trigger('displayToggle');
        this.container.trigger('change', [this.getValueList()]);
    };

    return Checkbox;
});
/**
 * 编辑器
 * @module component/editor
 */
define('component/editor/js/editor',['component/base/js/base' , 'util/Class', 'component/validate/js/validate', 'Controller/Controller'], function(Base, Class, Validate, Controller) {
	/**
	 * 旧的编辑器相应方法
	 * @todo  所有方法提取出来放在Editor中
	 * @param  {[type]} paras [description]
	 */
	function getUEEDitor(paras) {
		var defaultParas = {
			id: "editor",
			theme: "default",
			defaultTxt: "",
			autoHeight: false,
			width: 530,
			height: 150,
			focusHeight: 150,
			iframeCssUrl: "//img.58cdn.com.cn/fuwenben/themes/iframe.css",
			maxWordsLen: 2e3
		};
		for (var key in paras) {
			if (paras[key]) {
				defaultParas[key] = paras[key]
			}
		}
		if (defaultParas.focusHeight < defaultParas.height) {
			defaultParas.focusHeight = defaultParas.height
		}
		var toolbars = [
			["fontsize", "forecolor", "backcolor", "Bold", "underline", "Undo", "Redo"]
		];
		if (paras.toolbars) {
			toolbars = paras.toolbars
		}
		UE.getEditor("editor", {
			iframeCssUrl: defaultParas.iframeCssUrl,
			theme: defaultParas.theme,
			toolbars: toolbars,
			autoClearinitialContent: true,
			wordCount: false,
			maximumWords: defaultParas.maxWordsLen,
			elementPathEnabled: false,
			initialStyle: "body{font-size:12px}",
			minFrameHeight: defaultParas.height,
			initialFrameWidth: defaultParas.width,
			initialFrameHeight: defaultParas.height,
			autoHeightEnabled: defaultParas.autoHeight,
			removeFormatTags: "a",
			removeFormatAttributes: "class,style,lang,width,height,align,hspace,valign",
			initialContent: defaultParas.defaultTxt,
			serialize: {
				blackList: {
					a: 1,
					style: 1,
					script: 1
				}
			}
		});
		var EditorObj = UE.getEditor("editor");
		EditorObj.focusEvents = [];
		EditorObj.blurEvents = [];
		// 这里必须要加入，微信需要长连接，会阻塞编辑器的加载
		EditorObj.addListener("ready",function(){
            //this.setContent(defaultParas.defaultTxt);
            //this.initialFrameHeight = 550;

            //微信传图
            window.FE58.UEEditorDone = true;
        });
		EditorObj.onfocus = function(func) {
			if (func != "focus") {
				EditorObj.focusEvents.push(func)
			} else {
				if (this.getContentTxt().toLowerCase() == defaultParas.defaultTxtWithoutStyle) {
					this.setContent(" ")
				}
				for (var i = 0; i < EditorObj.focusEvents.length; i++) {
					EditorObj.focusEvents[i]()
				}
			}
		};
		EditorObj.onblur = function(func) {
			if (func != "blur") {
				EditorObj.blurEvents.push(func)
			} else {
				if (this.getContentTxt() == "" || this.getContentTxt() == " ") {
					// console.log('setContent')
					this.setContent(defaultParas.defaultTxt)
				}
				for (var i = 0; i < EditorObj.blurEvents.length; i++) {
					EditorObj.blurEvents[i]()
				}
			}
		};
		EditorObj.addListener("wordCountOverflow", function(type, length) {});
		EditorObj.addListener("beforeSetContent", function(type, data) {});
		EditorObj.addListener("beforePaste", function(type, data) {
			var _str = data.html;
			var tags = ["a", "img", "script", "style", "link", "input", "form", "textarea", "object", "embed", "button", "li"];
			for (var i = 0, len = tags.length; i < len; i++) {
				var regEx = new RegExp("</?" + tags[i] + "[^>]*>", "gi");
				_str = _str.replace(regEx, "")
			}
			var reg = /<!--\[if[\s\S]+?<!(--)?\[endif\]-->|<\?xml[\s\S]+?\/>/g,
				reg2 = /\s*?class="{1}[\s\S]+?"{1}|&quot;|lang="?EN-US"?/gi,
				reg3 = /(mso-|font-family|line-height|height)[\s\S]+?(?=;|");?/gi,
				reg4 = /<img[\s\S]+?>|<table[\s\S]+?>[\s\S]+?<\/table>|<a\s[\s\S]+?>[\s\S]+?<\/a>|<object[\s\S]+?>[\s\S]+?<\/object>/gi;
			reg5 = /<img[\s\S]+?>|<a\s[\s\S]+?>[\s\S]+?<\/a>|<object[\s\S]+?>[\s\S]+?<\/object>/gi;
			reg6 = /style="[^"]*"/gi;
			// if (____json4fe && ____json4fe.catentry && ____json4fe.catentry[1] && ____json4fe.catentry[1].dispid) {
			// 	if (____json4fe.catentry[1].dispid == "8645" || ____json4fe.catentry[1].dispid == "8658") {
			// 		_str = _str.replace(reg, "").replace(reg2, "").replace(reg3, "").replace(reg5, "").replace(reg6, "")
			// 	} else {
			// 		_str = _str.replace(reg, "").replace(reg2, "").replace(reg3, "").replace(reg4, "")
			// 	}
			// } else {
			// 	_str = _str.replace(reg, "").replace(reg2, "").replace(reg3, "").replace(reg4, "")
			// }
			if (!-[1]) {
				var reg5 = /<?xml[\s\S]+?\/>/gi,
					reg6 = /<\/?(v|o):[\s\S]+?>/gi;
				_str = _str.replace(reg5, "").replace(reg6, "")
			}
			data.html = _str
		});
		EditorObj.getText = function() {
			if (EditorObj.body.textContent) {
				return EditorObj.body.textContent
			} else {
				return EditorObj.body.innerText
			}
		};
		EditorObj.defaultSetContent = EditorObj.setContent;
		EditorObj.setContent = function(content) {
			// console.log(content)
			var _self = this;
			var setContentWait = 0;
			(function() {
				if (setContentWait > 25) {
					try {
						// console.log("编辑器加载超时。。")
					} catch (e) {}
				}
				if (_self.body) {
					// console.log('defaultSetContent')
					// console.log('content', content);
					_self.defaultSetContent(content)
				} else {
					setTimeout(arguments.callee, 300)
				}
				setContentWait++
			})();
			try {} catch (e) {}
		};
		EditorObj.defaultGetContent = EditorObj.getContent;
		EditorObj.getContent = function() {
			return EditorObj.body.innerHTML
		};
		return EditorObj
	}

	
	/**
	 * 	封装第三方插件，ueditor
	 *  @constructor
	 *  @alias module:component/editor
	 *  @param {Object} opt 配置文件 
	 */
	var Editor = Class.extend(Base);
	Editor.prototype.type = 'editor';

	/**
	 * 默认的className。包括wrap、title、content、multi
	 * @type {Object}
	 */
	Editor.prototype.CLASS = {
		/** @type {String} 容器的className */
		WRAP: 'editor'
	}
	/**
	 * 如果在编辑器初始化之前调用了ue.getContentTxt
	 * 会导致报错
	 * @return {} 
	 */
	Editor.prototype.getContentTxt = function() {
		var content;
		try {
			content = this.ue.getContentTxt();
            if(content.indexOf("window.parent.UE.instants['ueditorInstant0']._setup(document);")>-1){
                content=content.replace("window.parent.UE.instants['ueditorInstant0']._setup(document);", "");
            }
		} catch(e) {
			content = ''
		}
		return content;
	}
	Editor.prototype.render = function(wrapElem){
		if(this.opts.canNull === false) {
			this.rows.addStar();
		}
		var _self = this;
		if(this.describeElem) {
			this.describeElem.appendTo(this.containerElem);
		}
		this.containerElem.appendTo(wrapElem);
		this.ue = getUEEDitor(this.opts.UEopts);
		var defaultText = _self.opts.UEopts.defaultTxtWithoutStyle;
		_self.ue.onblur(function() {
			var tipElem = _self.rows.containerElem.find('.tip');
			//blur后的处理
			/** @todo 除了提示信息外，校验信息应当放在校验规则中 */
			if (_self.getContentTxt() == "" || _self.getContentTxt() == defaultText) {
				Validate.showTip(tipElem, '房源描述不能为空。', Editor.SETTING.STATUS.ERROR);
			} 
			_self.doCheck();
		});
        _self.ue.onfocus(function() {
            if(_self.opts.view.tips) {
                var tipElem = _self.rows.containerElem.find('.tip');
                Validate.showTip(tipElem, _self.opts.view.tips, Editor.SETTING.STATUS.WARN);
            }
        });
	};
	/**
	 * 获取带标签的内容，用于表单提交
	 * @return {String} 带html标签的内容
	 */
	Editor.prototype.getValue = function() {
        var content = this.ue.getContent();
        if(typeof content !== 'undefined' && content.indexOf("window.parent.UE.instants['ueditorInstant0']._setup(document);")>-1){
            content=content.replace("\<script\>window.parent.UE.instants['ueditorInstant0']._setup(document);\</script\>", "");
            content=content.replace("window.parent.UE.instants['ueditorInstant0']._setup(document);", "");
        }
        if(typeof content !== 'undefined' && content === this.opts.UEopts.defaultTxt) {
            content = ''
        }
        return content;

	};
	/**
	 * 获取校验的值，因为校验时，不需要带标签和样式所以只去text就可以
	 * @return String 不带Html和样式的文本内容
	 */
	Editor.prototype.getCheckValue = function() {
		var txt = this.getContentTxt();
        if(typeof txt !== 'undefined' && txt.indexOf("window.parent.UE.instants['ueditorInstant0']._setup(document);")>-1){
            txt=txt.replace("window.parent.UE.instants['ueditorInstant0']._setup(document);", "");
        }
		if(typeof txt !== 'undefined' && txt === this.opts.UEopts.defaultTxtWithoutStyle) {
			txt = ''
		}
		return txt;
	};
	Editor.prototype.createElem = function() {
		this.containerElem = $('<div>').attr('id', this.opts.UEopts.id).attr('class', this.CLASS.WRAP);
		this.initFillHelper();
	};
	/**
	 * 初始化自动填充助手功能
	 * @return {} 
	 */
	Editor.prototype.initFillHelper = function(){
		var fillHelper = {};
		if(this.opts.view && this.opts.view.fillHelper) {
			fillHelper = this.opts.view.fillHelper;
		}
		if(fillHelper.btnText) {
			// 显示状态，默认显示，如果要隐藏，必须要传入hidden
			var displayStyleText = typeof fillHelper.displayStatus !== 'string' ? 'block' : fillHelper.displayStatus ;
			this.describeElem = $('<div id="miaoshu" style="display:' + displayStyleText + ';">' 
					+  (fillHelper.text || '')
					+ '<a href="javascript:void(0)" id="miaoshuBtn" >' + fillHelper.btnText + '</a></div>');
			this.bindFillHelperEvent();
		}
		// 注册valueChange订阅事件
		if(fillHelper.needSubscribe) {
			this.subscribeValueChange();
		}
		// 显示描述信息的对话框逻辑
		if(fillHelper.needDialog) {
			this.createDescDialog();
		}
	};
	/**
	 * 一键描述功能绑定
	 * @return {[type]} [description]
	 */
	Editor.prototype.bindFillHelperEvent = function() {
		var _self = this;
		var fillHelper = this.opts.view.fillHelper;
		// content和api参数必须要有一个
		if(!fillHelper.content && !fillHelper.api) {
			return;
		}
		var helperBtn = _self.describeElem.find('#miaoshuBtn');
		if(this.opts.view.fillHelper.content) {
			helperBtn.bind('click', function(){
				_self.showHelperContent(fillHelper.content);
			});
		} else {
			helperBtn.bind('click', function(){
				_self.showContentByApi(fillHelper.api.url, fillHelper.api.contentKey);
			})
		}
	};
	/**
	 * 调用api获取内容并显示
	 * @param  {String} apiUrl 对应的接口地址
	 * @return {}        
	 */
	Editor.prototype.showContentByApi = function(apiUrl) {
		var _self = this;
		var formDate = Controller.getFormText();
		// 区分content和api，两种方式
		$.ajax({
			url: apiUrl,
			type: 'get',
			data: formDate,
			dataType: 'json',
			success: function(data){
				// console.error(data)
				// todo 错误校验
				_self.showHelperContent(data.content);
			}, 
			error: function(){
				// console.error(arguments);
			}
		});
		// 收集哪些数据？调用api
		_self.showDescDialog();
	};
	/**
	 * 显示自动填充的内容
	 * @param  {String} contentText 填充的内容
	 * @return {}             
	 */
	Editor.prototype.showHelperContent = function(contentText){
		var _self = this;
		var fillHelper = this.opts.view.fillHelper;
		// todo 是否可以在初始化时候做好判断?
		if(fillHelper.needDialog === true) {
			_self.setDescDialogContent(contentText);
		} else {
			_self.ue.setContent(contentText);
		}
	};
	/**
	 * 是否需要注册valuechange订阅事件
	 * @return {[type]} [description]
	 */
	Editor.prototype.subscribeValueChange = function(){
		var _self = this;
		_self.subscribe(this.opts.name + '.valueChange', function(values) {
			var bRequestDesc = true;
			// 校验是否所有参数都有值，不能包含 ""
			for(var i=0; i<values.length; i++) {
				var valObj = values[i];
				if(valObj.value === null || typeof valObj === 'Object') {
					bRequestDesc = false;
					break;
				}
			}
			if(bRequestDesc == true) {
				$('#miaoshu').show();
			} else {
                _self.hideMiaoshu();
			}
		});
	};
    Editor.prototype.hideMiaoshu = function(){
        $('#miaoshu').hide();
        $('#fyms').hide();
    };
	Editor.prototype.bindDomEvent = function(){
	};
	Editor.prototype.setValue = function(value) {
		this.ue.setContent(value);
	}
	Editor.prototype.setDescDialogContent = function(content) {
		this.describDialog.find('.fymsDiv').html(content);
	};
	Editor.prototype.showDescDialog = function(content) {
		this.describDialog.find('.fymsDiv').html(content);
		$('#fyms').show();
	};
	Editor.prototype.createDescDialog = function(content){
		var _self = this;
		_self.describDialog = $('<div id="fyms" class="fyms" style="height:' + $(window).height() + 'px;"><div class="fymsBg"></div><dl id="fymsdl" class="fymsdl"><dt><span class="fr fyms_close">×</span><b>1秒生成房源描述</b></dt><dd><p>根据您填写的资料，我们为您自动生成了如下房源描述：</p><div class="fymsDiv"></div><a class="fymsBtn" href="javascript:void(0)"><span>就这样写</span></a></dd></dl></div>');
		_self.describDialog.find('.fyms_close').bind('click', function(){
			$('#fyms').hide();
		});
		_self.describDialog.find('.fymsBtn span').bind('click', function(){
			var htmlStr = _self.describDialog.find('.fymsDiv').html();
			_self.ue.setContent(htmlStr);
			$('#fyms').hide();
		});
		$(document.body).append(_self.describDialog);
	};
	Editor.prototype.setCanNull = function() {
		this.opts.canNull = true;
	};
	Editor.prototype.setNotNull = function() {
		this.opts.canNull = false;
	};
	return Editor;
});
/**
 * 联想文本输入框
 * @module component/autoComplete
 */
define('component/autoComplete/js/autoComplete',['component/inputText/js/inputText', 'util/Class', 'Controller/Controller'], function(InputText, Class, Controller) {

	/**
	 *  @constructor
	 *  @alias module:component/autoComplete
	 *  @param {Object} opt 配置文件
	 */
	var AutoComplete = Class.extend(InputText);
	var ACsel_Zindex = 1500;

	/*	function AutoComplete(opts) {
			this.opts = $.extend(true, {}, this.constructor.opts, opts);
			this.init();
		};
	*/
	/** @type {Object} 配置文件的默认值 */
	AutoComplete.opts = {
		/** @type {String} 组件的类型 */
		type: 'text',
		/** @type {String} 对应后端的字段 */
		name: '',
		/** @type {Object} 对应后端的字段 */
		view: {
			/** @type {String} 提示信息 */
			placeholder: '',
			/** @type {String} 前置插入的内容 */
			afterText: '',
			/** @type {String} 后置插入的内容 */
			beforeText: '',
			/*下拉框的默认宽度*/
			"maxHeight": '',
			/** @type {String} 宽度 */
			width: ''
		},
		returnTemp: null,
		attr: {
			autocomplete: "off",
			disableautocomplete: true
		},
		suggestSetting: {
			commonShow: { //普通分数据表现层
				dataPath: "", //数据返回的内容，不会直接是一个数组，这个path就是实际的数组路径，
				liKeys: [], //数组的实际元素，可以是数字，也可以是 key或者keypath，因为有可能取子集
				liTemp: "", //行的dom模版，依赖likeys,
				url: "", //获取数据的地址
				setValFunc: function() {}
			},
			defShow: { //默认数据表现层  即当 input里面的内容为空的时候的表现层
				dataPath: "", //数据返回的内容，不会直接是一个数组，这个path就是实际的数组路径，
				liKeys: [], //数组的实际元素，可以是数字，也可以是 key或者keypath，因为有可能取子集
				liTemp: "", //行的dom模版，依赖likeys,
				defUrl: "", //获取默认数据的地址
				getValFunc: function() {}
			}
		},


		/** @type {Array} 校验规则列表 */
		checkRuler: [],
		/** @type {Array} 触发的规则 */
		funcs: []
	};
	AutoComplete.prototype.clickFunc = function(li) {

		var opt = this.opts.suggestSetting.commonShow;
		if (opt.setValFunc) {
			this.setValue(opt.setValFunc(li));
		} else {
			this.setValue(li.html());
		}

	};
	/** 
	 * dom事件注册
	 */
	AutoComplete.prototype.bindDomEvent = function() {
		/*
		suggest 相关
		*/
		this.listData = []; //对象数据缓存

		var _self = this;
		this.showList = function() {
			var position = this.elem.position();
			this.list.show();

			this.list.css({
				'width': (this.elem.width() + 16) + 'px',
				'top': (this.elem.height() + parseInt(this.elem.css("paddingTop")) + parseInt(this.elem.css("paddingBottom"))) + 'px',
				left: parseInt(this.elem.css("paddingLeft")) + 10 + 'px'
			});
			//this.list.css({'width':this.elem.width()+parseInt(this.elem.css("paddingLeft"))+parseInt(this.elem.css("paddingRight"))+'px','top':(position.top+this.elem.height()+parseInt(this.elem.css("paddingTop"))+parseInt(this.elem.css("paddingBottom")))+'px',left:position.left+'px'});
		}
		if (this.elem.length > 0) {
			var maxHeight = this.opts.view.maxHeight;
			if (maxHeight != "") {
				maxHeight = "max-height:" + maxHeight + "px;_height:" + maxHeight + "px;";
			}
			this.list = $("<div class='tooltip' style=' margin:1px 0 0 -10px;" + maxHeight + "overflow-y:auto;overflow-x:hidden;border:1px solid #ccc;position:absolute;z-index:" + (500 - this.opts.tabIndex) + ";display:none'><ul class='autoCompleteul' style='margin:0; padding:0; display:block; width: 100%; " + maxHeight + "; border:0;background:#fff'></ul><iframe frameborder=\"0\" width=\"100%\" height=\"100%\" src=\"about:blank\" style=\"z-index: -1; position: absolute; top: 0px; left: 0px; border: 0px none;\"></iframe></div>");
			this.elem.after(this.list);
			_self.elem.bind('focus', function() {
				if (_self.opts.view.tips) {
					_self.showTips(_self.opts.view.tips);
				}
				// console.log('AutoComplete focus');
				_self.setClassByStatus(InputText.SETTING.STATUS.FOCUS);
				_self.elem.triggerHandler('focusin');
				// console.log('trigger in')
			});
			this.elem.bind("keyup", _self, function(evt) {
				var _self = evt.data;
				var key = _self.elem.val();
				if (!key) {
					_self.list.hide();
					return;

				}
				var addUrl = "";
				/** @todo 所有的keyCode，都提到base类中的常量中。比较要用===，尽量不要用== */
				if ("38" == evt.keyCode) { //向上箭头
					if (_self.list.is(":visible") && _self.list.find("li").length > 0) {
						var lis = _self.list.find("li");
						var curli = _self.list.find("li.over");
						if (curli.length == 0) {
							lis.eq(lis.length - 1).addClass("over");

						} else if (curli.prev().length > 0) {
							curli.prev().addClass("over");
							curli.removeClass("over");
						} else {
							lis.eq(lis.length - 1).addClass("over");
							curli.removeClass("over");
						}

					}
				} else if ("40" == evt.keyCode) { //向下箭头
					if (_self.list.is(":visible") && _self.list.find("li").length > 0) {
						var lis = _self.list.find("li");
						var curli = _self.list.find("li.over");
						if (curli.length == 0) {
							lis.eq(0).addClass("over");

						} else if (curli.next().length > 0) {
							curli.next().addClass("over");
							curli.removeClass("over");
						} else {
							lis.eq(0).addClass("over");
							curli.removeClass("over");
						}

					}
				} else if (evt.keyCode == "13") {

				} else if (evt.keyCode == "37" || evt.keyCode == "39") {

				} else {
					_self.setId('');
					_self.resetValues();
					if (_self.opts.suggestSetting.commonShow.additionalParaFunc) {
						addUrl += _self.opts.suggestSetting.commonShow.additionalParaFunc();
					}
					if (key != "") {
						$.getJSON((_self.opts.suggestSetting.commonShow.url + "&" + addUrl).replace("^^", key),
							function(data) {

								var commonShow = _self.opts.suggestSetting.commonShow;
								if (commonShow.dataPath && commonShow.dataPath.length > 0) {
									var data = data[commonShow.dataPath];
								}
								var str = "";
								if (data && data.length > 0) {
									_self.listData = data;
									for (var i = 0; i < data.length; i++) {
										if (commonShow.liCreater) {
											str += commonShow.liCreater(data[i]);
										}
									}
									_self.list.find("ul").html(str);
									_self.showList();
								} else {
									_self.list.find("ul").html("");
									_self.list.hide();
									_self.listData = [];
								}
							}
						)
					} else {
						_self.list.hide();
					}
				}
			}).blur(function() {
				var commonShow = _self.opts.suggestSetting.commonShow;
				if (commonShow.canHide && _self.list.css("display") != "none") {
					_self.list.hide();
					_self.rows.containerElem.css("zIndex", "");
					_self.block.containerElem.css("zIndex", "");

					//if (_self.list.find("ul li:eq(0)").length > 0 && _self.list.find("ul li:eq(0)").length > 0) {
					//	_self.clickFunc(_self.list.find("ul li:eq(0)"));
					//	commonShow.canHide == false;
					//}
				}
                if(_self.opts.isEdit && _self.elem.val()===_self.text){
                    //修改并且不做修改失去焦点时不触发inputover
                }else{
                    if (_self.elem.val()) {
                        _self.container.triggerHandler('inputover');
                    }
                }
				_self.doCheck();

			}).bind("keydown", _self, function(evt) {
				if ("13" == evt.keyCode) { //回车
					var _self = evt.data;
					var curli = _self.list.find("li.over");
					if (curli.length == 0) {
						if (_self.list.find("ul li:eq(0)").length > 0) {
							_self.clickFunc(_self.list.find("ul li:eq(0)"));
						}
					} else {
						_self.clickFunc(curli);
					}
					_self.list.hide();
					return false;
				}
			}).focus(function() {
				_self.rows.containerElem.css("zIndex", ACsel_Zindex + 100);
				_self.block.containerElem.css("zIndex", ACsel_Zindex + 100);

			});

			this.list.find("ul").click(function(evt) {
				if (evt.target.tagName.toLowerCase() == "li") {
					_self.clickFunc($(evt.target));
					_self.list.hide();
				} else {
					_self.clickFunc($(this).find("li.over"));
					_self.list.hide();
				}
				// _self.elem.focus();
			}).bind("mouseover", function(evt) {
				_self.opts.suggestSetting.commonShow.canHide = false;
				if (evt.target.tagName.toLowerCase() == "li") {
					$(this).find("li").removeClass("over");
					$(evt.target).addClass("over");
				}
			}).bind("mouseleave", function(evt) {
				_self.opts.suggestSetting.commonShow.canHide = true;
				if (evt.target.tagName.toLowerCase() == "li") {
					$(evt.target).removeClass("over");
				}
			});
		}
		// AutoComplete.superclass.bindDomEvent.call(this, arguments);

	};

	/** 重置values对象，不清空，只是重置属性名，否则传递数据时会有一场 */
	AutoComplete.prototype.resetValues = function() {
		for(var key in this.values) {
			if(this.values.hasOwnProperty(key)) {
				this.values[key] = '';
			}
		}
	};
	AutoComplete.prototype.focusTo = function() {
		this.elem.focus();
	}
	AutoComplete.prototype.setValue = function(value, text, bDefault) {
		if (value && value.input) {
			this.elem.val(value.input);
			this.values = value;
		} else if (typeof value == "string") {
			if (!isNaN(parseInt(value, 10))) {
				// 如果传入纯数字，则当做ID来处理
				if (this.values) {
					this.values.id = value;
				} else {
					this.values = {
						id: value
					}
				}

			} else {
				this.elem.val(value);
			}
		}
		if (!bDefault) {
			this.publish(this.opts.name + '.valueChange', this.getId());
			this.container.triggerHandler('inputover');
		}
		this.doCheck();
		this.rows.containerElem.css("zIndex", "");
		this.block.containerElem.css("zIndex", "");
	};
	AutoComplete.prototype.setText = function(txt) {
		this.elem.val(txt);
        this.text=txt;
	};
	AutoComplete.prototype.getCheckValue = function() {
		return this.constructor.superclass.getValue.apply(this, arguments);
	};
	AutoComplete.prototype.getValue = function() {
		if (this.opts.returnTemp) {
			var obj = {};
			obj[this.opts.returnTemp.id] = (this.values && this.values.id) ? this.values.id : '';
			obj[this.opts.returnTemp.name] = this.elem.val();
			return obj;
		} else if (this.values && this.values["id"]) {

			return this.values["id"];
		} else {
			return this.constructor.superclass.getValue.apply(this, arguments);

		}
	}
	AutoComplete.prototype.getAllValues = function() {
		return this.values;
	};
	AutoComplete.prototype.setId = function(val) {
		if (this.values && this.values["id"]) {

			return this.values["id"] = val;

		} else {
			return this.values = val;

		}
	};
	AutoComplete.prototype.getId = function() {
		// console.log('AutoComplete.getId');
		// console.log((this.values && this.values.id) || '')
		return (this.values && this.values.id) || '';
	}

	return AutoComplete;
});
/**
 * 下拉框
 * @module component/selector
 */
define('component/selector/js/selector',['component/base/js/base', 'util/Class', 'Controller/Controller'], function(base, Class, Controller) {


    /**
     *  @constructor
     *  @alias module:component/Selector
     *  @param {Object} opt 配置文件
     */
    var Selector = Class.extend(base);

    var Selector_Zindex = 1500;

    Selector.opts = {
        //title:"",//行首的标题
        name: "", //对应的后端的字段
        pnames: [], //上上上级别的字段的路径
        type: "selector", //下拉单选框
        view: {
            placeholder: null, //不为空的时候，默认值option的text
            afterText: "", //支持html?样式
            beforeText: "", //支持html?样式
            overFocus: false, //鼠标划过获得焦点
            outBlur: false, //鼠标移出失去焦点
            width: "150px", //宽度 支持像素
            optionsWidth: "" //下拉框的宽度 支持像素和
        },
        display: "",
        notnull: true, //这个又是view的又是checkrule，所以单独拿了出来
        funcs: [
            // {evt:"change",func:"focusto",data:{"name":"xxxx"}},//输入完成之后焦点转移到名叫xxx的对象
            //{evt:"change",func:"autoFill",data:{"name":"xxxx"}}//,//输入完成之后名叫xxx的对象自动完成
            // 。。。。。。
        ]
    };

    Selector.prototype.CLASS = {
        /** @type {String} 容器的className */
        WRAP: 'input_text_wrap',
        /** @type {String} 标题的className */
        TITLE: 'input_text_title',
        /** @type {String} 内容区域的className */
        CONTENT: 'input_text_content',
        /** @type {String} 当前后有内容时，需要增加的class */
        MULTI: 'clearfix'
    };
    Selector.prototype.type = 'selector';

    Selector.prototype.createElem = function() {
        // TODO 增加父元素div或者span
        var defaulStr = this.opts.view.placeholder ? this.opts.view.placeholder : "请选择";

        var options = this.createOption();
        this.container = this.elem = $('<div  class="selectordef" name="' + this.opts.name + '" style="z-index:' + (Selector_Zindex - this.opts.tabIndex) + '"  tabindex="' + this.opts.tabIndex + '"><div class="title"><span class="seled">' + defaulStr + "</span><div class='arrow'></div></div><div class='optiondef'>" + options + '</div></div>');
        this.container.attr('nameid', this.id);
        this.setElemView();
        // 如果没有数据，则直接设置freeze状态
        // if(!this.data || !this.data.values || this.data.values.length < 1) {
        // 	this.freeze();
        // 	return;
        // }
        // 只有一项时，默认选中
        if (this.data && this.data.values.length === 1) {
            this.setValue(this.data.values[0].val);
            this.container.find('.optiondef').hide();
        }
    };
    /**
     * 根据opt.view配置来设置elem的一些属性
     */
    Selector.prototype.setElemView = function() {
        //if (this.opts.view.width.length>0) {
        this.elem.css('width', this.opts.view.width);
        //}
        if (this.opts.view.optionsWidth && this.opts.view.optionsWidth.length > 0) {
            this.elem.find(".optiondef").css('width', this.opts.view.optionsWidth);
        } else {
            // console.log(this.opts.view.width);
            this.elem.find(".optiondef").css('width', parseInt(this.opts.view.width) - 3);
        }

        // 添加到父元素上

        if (this.opts.view.afterText.length > 0) {
            this.elem.find(".title").append("<span>" + this.opts.view.afterText + "</span>");
        }
        if (this.opts.view.beforeText.length > 0) {
            this.elem.find(".title").prepend("<span>" + this.opts.view.beforeText + "</span>");
        }
        if (this.opts.display == "none") {
            this.hide();
        }

    };

    // dom事件注册
    Selector.prototype.bindDomEvent = function() {
        var _self = this;
        //监听键盘的事件，↑ ↓ 空格 回车 （tab 不用）

        _self.elem.bind('keydown', function(evt) {
            var keyCode = evt.keyCode;
            var cur = _self.elem.find(".sel");
            if (keyCode == 40) {
                if (cur.length > 0) {
                    var nextli = cur.removeClass("sel").next();
                    if (nextli.length == 0) {
                        nextli = _self.elem.find("li").first();
                    }

                    nextli.addClass("sel");
                } else {
                    _self.elem.find("li").first().addClass("sel");
                }
                return false
            } else if (keyCode == 38) {
                if (cur.length > 0) {
                    var prevli = cur.removeClass("sel").prev();
                    if (prevli.length == 0) {
                        prevli = _self.elem.find("li").last();
                    }

                    prevli.addClass("sel");
                } else {
                    _self.elem.find("li").last().addClass("sel");
                }
                return false
            } else if (keyCode == 32 || keyCode == 13) {
                _self.setValue(cur.attr("val"), cur.text());
                return false

            }
            //return false;
        });


        _self.elem.find("li").bind("mouseenter", function(evt) {

                //if(evt.target.toLowerCase()=="li"){
                _self.elem.find(".sel").removeClass("sel");
                $(this).addClass("sel");

                //}
            })
            .bind("click", function(evt) {
                var liObj = $(evt.target);
                _self.setValue(liObj.attr("val"), liObj.text());

                //触发验证
                var checkObj = _self.doCheck();
                if (checkObj.bValid === true && _self.rows.getValidateStatus() !== true) {
                    _self.hideTips();
                }
                _self.publish(_self.opts.name + '.valueChange', _self.getValue());
                // 添加volatile级联组件中包含selector组件时,上一个选完后，下一个下拉菜单自动展开功能
                // 必填项
                if (_self.elem.parents('.volatile_wrap').length > 0) {
                    setTimeout(function() {
                        var next = _self.elem.next();
                        // 跳过被隐藏的下拉选择框
                        while (next && next.hasClass('selectordef') && next.css('display') === 'none' && next.next()) {
                            next = next.next();
                        }
                        if (liObj.attr('val') && next && next.hasClass('selectordef')) {
                            //next.focus();
                            next.click();
                        }
                    }, 300);
                }
                // 选填项
                if (_self.elem.parents('.optional_wrap').length > 0) {
                    setTimeout(function() {
                        var next = _self.elem.parents('.optional_wrap').next().find('.selectordef');
                        // 跳过被隐藏的下拉选择框
                        while (next && next.css('display') === 'none' && next.parents('.optional_wrap').next().find('.selectordef').length > 0) {
                            next = next.parents('.optional_wrap').next().find('.selectordef');
                        }
                        if (liObj.attr('val') && next && next.hasClass('selectordef')) {
                            //next.focus();
                            next.click();
                        }
                    }, 300);
                }
                return false;
            });
        // _self.elem.click(function(evt) {
        // 	$(this).focus();
        // 	return;
        // });
        _self.elem.click(function(evt) {
            _self.elem.addClass("focus");
            $(this).find(".optiondef").show();
            var appType = businessData.isVipApp == 0 ? "pc_" : "pcv_"
            clickLog("from=" + appType + ____json4fe.catentry[1].dispid + "_click_" + _self.opts.name);
            return;
        });
        //失去焦点
        _self.elem.bind('blur', function() {
            //_self.rows.containerElem.css("zIndex","");
            //_self.block.containerElem.css("zIndex","");
            _self.elem.removeClass("focus");
            $(this).find(".optiondef").hide();
            ///_self.elem.triggerHandler('inputover');
            _self.doCheck();
        });

        //获取焦点-二手车看车地址选择了区域商圈不自动下拉
        _self.elem.bind('focus', function(evt) {
            if (____json4fe.catentry[1].dispid == 29 && _self.opts.name !== 'localDiduan') {
                _self.elem.addClass("focus");
                $(this).find(".optiondef").show();
            }
        });
        _self.elem.bind('mouseout', function() {

            _self.elem.removeClass("hover")

            //如果设定了鼠标划出失去焦点，需要绑定下面的方法
            if (_self.opts.view.outBlur) {
                _self.elem.blur();
            }
        });

        _self.elem.bind('mouseover', function() {
            _self.elem.addClass("hover")
                //如果设定了鼠标一如获得焦点，需要绑定下面的方法
            if (_self.opts.view.overFocus) {
                $(this).find(".optiondef").show();
                //_self.elem.focus();
                _self.elem.click();
            }
        });

        // TODO input事件兼容
        /*_self.elem.bind('input', function(e) {
        	if (e.KeyCode === EventKeyCode.TAB) {
        		_self.elem.triggerHandler('inputover');
        	}
        	// TODO 抽出特殊处理的程序
        	// 考虑如何在初始化时就判断是否进行特殊值的判断？
        	var maxLength = $(this).attr('maxLength');
        	var value = $(this).val();
        	if(!!maxLength) {
        		if(value.length >= parseInt(maxLength, 10)) {
        			_self.elem.trigger('inputover');
        		}
        	}
        });*/
    };
    /**
     * 自动设置焦点，控制类调用，一般不会自己调用
     * @return {[type]} [description]
     */
    Selector.prototype.focusTo = function() {
        this.container.focus();
    };

    Selector.prototype.disabled = function() {
        var _self = this;
        _self.elem.unbind('keydown');
        _self.elem.find("li").unbind('mouseenter').unbind("click");
        _self.elem.unbind('blur');
        _self.elem.unbind('click');
        _self.elem.unbind('focus');
        _self.elem.unbind('mouseout');
        _self.elem.unbind('mouseover');
        _self.container.addClass("disabled");
    }
    Selector.prototype.undisabled = function() {
        this.bindDomEvent();
        _self.container.removeClass("disabled");
    }
    Selector.prototype.setValue = function(value, text, valueState) {
        // 默认值不存在时候
        if (valueState === 1 && value !== 0 && false == value) {
            return;
        }
        if (value === this.getValue()) {
            this.container.blur(); //值相同是隐藏下拉
            return;
        }
        //if (this.getValue() !== value) {
        //this.elem.val(value);
        //}
        this.value = value;
        this.text = text;
        var hasValue = false;
        //搜狗奇葩修复
        if (this.data && this.data[0]) {
            this.data = this.data[0];
        }
        if (this.data && this.data.values) {
            for (var i = 0; i < this.data.values.length; i++) {
                if (this.data.values[i].val == value) {
                    hasValue = true;
                    this.objVal = this.data.values[i];
                    if (!this.text || this.text.length == "") {
                        this.text = this.objVal.text;
                    }
                    break;
                }

            }
        }
        //请选择类的空值处理
        if (value == "") {
            hasValue = true;
        }
        if (false === hasValue) {
            this.value = '';
            this.text = '';
            return;
        }
        if (value == "") {
            this.objVal = null;

        }
        /**
         * @todo 整个selector需要重构，逻辑有些混乱了，最好完全模拟htmlSelectElement的一些事件，不能乱触发自定义的一些事件
         */
        this.container.triggerHandler('inputover');
        this.container.blur();
        // 更新的时候，显示行
        if (valueState === 2) {
            if (!this.opts.isFreeze) {
                this.rows.show();
            }
        } else {
            this.container.triggerHandler('autoSet');
        }
        this.elem.find(".seled").text(this.text);
        // 素有的container都触发change事件，并将当前的值传递给event
        this.container.trigger('change', [this.getValue()]);
        //this.triggerHandler('inputover');
    };

    Selector.prototype.setValueId = function(value) {
        var valueId = value;
        if (valueId != null && valueId != "") {
            var text = this.elem.find("li[val=" + value + "]").text();
            if (!text) {
                valueId = '';
            }
            this.setValue(valueId, text);
        } else {
            this.value = value;
            var text = this.elem.find("li[val=" + value + "]").text();
            this.setValue(valueId, text);
        }
    };
    Selector.prototype.getValue = function() {
        var _self = this;
        return _self.value;
    };
    Selector.prototype.getText = function() {
        return this.text ? this.text : '';
    };
    /**
     * 返回后端需要的valId，同setValueId区分开
     */
    Selector.prototype.getCurValId = function() {
        var value = this.getValue();
        var valId = null;
        for (var i = 0; i < this.data.values.length; i++) {
            var obj = this.data.values[i];
            if (obj.val === value) {
                valId = obj.valId;
                break;
            }
        }
        return valId;
    };
    /**
     * 编辑页调用此方法，强制回填帖子数据,地域商圈 上牌省份和城市
     */
    Selector.prototype.editInitValue = function() {
            var name = this.opts.name;
            var eidtValue = infoDetail && infoDetail[name];
            this.setValue(eidtValue);
        }
        /**
         * 传递给下一个selector使用
         * @todo 还是耦合了.
         * @return {[type]} [description]
         */
    Selector.prototype.getObjValue = function() {
        return this.objVal;
    };
    Selector.prototype.resetOption = function(options) {
        var _self = this;
        if (options) {
            if (!options.values) { //如果对象没有values属性，那么认为传入的是children，需要遍历之后，获取跟当前元素的name一致的元素
                for (var i = 0; i < options.length; i++) {
                    if (options[i].name == this.opts.name) {
                        options = options[i];
                        break;
                    }

                }
            }

            this.data = options.values;
            var optStr = this.createOption(options);
            this.elem.find(".optiondef").html(optStr);
            var text = this.elem.find("li[val=" + this.value + "]").text();
            if (text) {
                this.elem.find(".seled").text(text);
            } else {
                this.setValueId("");
                var text = this.elem.find("li[val='']").text();
                if (text) {
                    this.elem.find(".seled").text(text);
                }
            }
            this.elem.find("li").bind("mouseenter", function(evt) {

                //if(evt.target.toLowerCase()=="li"){
                _self.elem.find(".sel").removeClass("sel");
                $(this).addClass("sel");

                //}
            }).bind("click", function(evt) {
                var liObj = $(evt.target);
                _self.setValue(liObj.attr("val"), liObj.text());

                _self.doCheck();
                // 添加volatile级联组件中包含selector组件时,上一个选完后，下一个下拉菜单自动展开功能
                // 必填项
                if (_self.elem.parents('.volatile_wrap').length > 0) {
                    setTimeout(function() {
                        var next = _self.elem.next();
                        // 跳过被隐藏的下拉选择框
                        while (next && next.hasClass('selectordef') && next.css('display') === 'none' && next.next()) {
                            next = next.next();
                        }
                        if (liObj.attr('val') && next && next.hasClass('selectordef')) {
                            next.focus();
                        }
                    }, 300);
                }
                // 选填项
                if (_self.elem.parents('.optional_wrap').length > 0) {
                    setTimeout(function() {
                        var next = _self.elem.parents('.optional_wrap').next().find('.selectordef');
                        // 跳过被隐藏的下拉选择框
                        while (next && next.css('display') === 'none' && next.parents('.optional_wrap').next().find('.selectordef').length > 0) {
                            next = next.parents('.optional_wrap').next().find('.selectordef');
                        }
                        if (liObj.attr('val') && next && next.hasClass('selectordef')) {
                            next.focus();
                        }
                    }, 300);
                }
                return false;
            });
        } else {
            this.data = [];
            this.elem.find(".optiondef").html("");
            this.setValueId("");
            var defaulStr = "";
            if (!this.opts.view.hideOptionEmpty) {
                if (this.opts.view.placeholder && this.opts.view.placeholder.length > 0) {
                    defaulStr = this.opts.view.placeholder;
                }
            }
            this.elem.find(".seled").text(defaulStr);
        }

    };

    Selector.prototype.createOption = function(optionsObj) {
        if (optionsObj) {
            var optionData = optionsObj;
        } else {
            var optionData = this.data;
        }
        // console.warn('Selector.createOption');
        // console.log(optionData);

        if (optionData && optionData.id) {
            this.id = optionData.id;
            // this.container.attr('nameid', optionData.id);
        }

        if (!optionData) {
            return ""
        }
        this.data = optionData;
        var liDefaulStr = "";
        if (!this.opts.view.hideOptionEmpty) {
            var defaulStr = "";
            if (this.opts.view.placeholder && this.opts.view.placeholder.length > 0) {
                defaulStr = this.opts.view.placeholder;
            } else {
                defaulStr = "请选择" + optionData.text || '';
            }
            liDefaulStr = "<li val=''>" + defaulStr + "</li>";
        }
        var ul_width = "";
        if (this.opts.view.optionsWidth && this.opts.view.optionsWidth.length > 0) {
            ul_width = this.opts.view.optionsWidth;
        } else {
            ul_width = parseInt(this.opts.view.width) - 3;
        }
        var options = "<ul >";
        if (ul_width != "") {
            var options = "<ul style='width:" + ul_width + "px;'>";
        }
        if (liDefaulStr.length > 0) {
            options += liDefaulStr;
        }
        //搜狗浏览器读不到optionData.values
        if (optionData && optionData[0]) {
            optionData = optionData[0];
        }
        if (optionData.values.length == 0 && this.opts.name == "localDiduan") {
            /*区域地段字段时，某些城市区域没有商圈 此时商圈自动设置为非必填*/
            this.opts.canNull = true;
        }
        for (var i = 0; i < optionData.values.length; i++) {
            var str = "";
            if (optionData.values[i].val === this.value) {
                str = "sel"
            }
            if (optionData.values[i]) {
                //options += "<li val='" + optionData.values[i].value + "' class='" + str + "'>" + optionData.values[i].text + "</li>";
                options += "<li val='" + optionData.values[i].val + "' class='" + str + "'>" + optionData.values[i].text + "</li>";
            }
        }
        options += "</ul>";

        return options;
    };

    /**
     * 隐藏组件方法
     * @description 隐藏组件
     */
    Selector.prototype.hide = function() {
        this.container.hide();
    };
    Selector.prototype.show = function() {
        this.container.show();
    };
    /**
     * 重写activate方法，需要判断是否有数据
     */
    Selector.prototype.activate = function() {
        if (!this.data || !this.data.values || this.data.values.length < 1) {
            return;
        }
        this.constructor.superclass.activate.apply(this);
    };

    return Selector;
});
define('component/imgBox/js/imgBox',['libs/json2.min', 'util/postClickLog'], function(JSON, Log) {

	/**
	 * 单独的图片展示对象
	 * @constructor ImgBox
	 */
	function ImgBox(opts) {
		this.opts = $.extend(true, {}, this.constructor.defaultOpt, opts);

		var json4fe = (typeof ____json4fe != 'undefined')?____json4fe:undefined;
		//一级类，二级类，城市
		this.category = (!!json4fe)?(json4fe.catentry[0].dispid+','+json4fe.catentry[1].dispid+','+json4fe.locallist.dispid):undefined,
		this.status = 'init';
		this.logObj = {
			from: 'Post_PicUpload',
			category: this.category,
			resultState: 'success', //failed
			uploadType: this.constructor.prototype.logObj.uploadType, //h5
			client: 'pc',
			zipBeginTime: '',
			uploadBeginTime: '',
			uploadEndTime: '',
			thumbShowTime: '',
			FileName: '',
			beforeZipWeight: '',
			beforeZipHeight: '',
			beforeZipSize: '',
			afterZipWeight: '',
			afterZipHeight: '',
			afterZipSize: ''
		};
		this.createElem();
	}
	ImgBox.defaultOpt = {
		loadingUrl: '//img.58cdn.com.cn/ui7/post/pc/imgs/loading.gif',
		className: {
			container: 'img_box',
			toolbar: 'toolbar_wrap',
			prevBtn: 'prev_pos',
			nextBtn: 'next_pos',
			deleteBtn: 'delete',
			editBtn:'edit' //@lxf
		}
	};
	ImgBox.prototype.logObj = {
		uploadType: '', //h5
		flashVersion: null
	};
	/**
	 * 设置日志所需的值
	 * @param {String} key
	 * @param {String} value
	 */
	ImgBox.prototype.setLog = function(key, value) {
		// if (typeof this.logObj[key] !== 'undefined') {
		// 	this.logObj[key] = value;
		// }
		this.logObj[key] = value;
	}
	/**
	 * 创建dom对象
	 */
	ImgBox.prototype.createElem = function() {
		var defaultClass = this.opts.className;
		this.container = $('<li>').addClass(defaultClass.container).data('indexId', this.opts.id);
		this.container.attr('data-index',this.opts.id);
		this.img = $('<img>').attr('src',this.opts.loadingUrl);
		this.container.append(this.img);
		this.container.append($('<div>').addClass('img_cover'));
	};
	/**
	 * 获取工具条的页面结构
	 * @return {String} 
	 */
	ImgBox.prototype.getToolbarHtml = function() {
		var classObj = this.opts.className;
		//@lxf
		if(this.opts.isSupportEdit){
			var htmlStr = '<div class="' + classObj.toolbar + '">' + '	<div class="opacity"></div>' + '	<div class="toolbar">' +'		<a href="javascript:;" class="' + classObj.editBtn + '"></a>' +'		<a href="javascript:;" class="' + classObj.deleteBtn + '"></a>' + '	</div>' + '</div>';
		}else{
			var htmlStr = '<div class="' + classObj.toolbar + '">' + '	<div class="opacity"></div>' + '	<div class="toolbar">' + '		<a href="javascript:;" class="' + classObj.prevBtn + '"></a>' + '		<a href="javascript:;" class="' + classObj.nextBtn + '"></a>' + '		<a href="javascript:;" class="' + classObj.deleteBtn + '"></a>' + '	</div>' + '</div>';
		}
		
		return htmlStr;
	}
	/**
	 * 渲染到页面容器中
	 * @param  {jQuery Object} wrapElem 页面容器的jQuery对象
	 */
	ImgBox.prototype.appendTo = function(wrapElem) {
		this.container.appendTo(wrapElem);
	};
	/**
	 * 修改图片的地址，并增加load事件监听
	 * @param {String} url 图片地址
	 */
 	ImgBox.prototype.setImageUrl = function(picLocation,binit,self) {
	  if(self.opts.type == "carImgUnload"){
            this.setImageUrl2(picLocation,binit,self);
        }
        else if(self.opts.type == "imgUpload"){
            this.setImageUrl1(picLocation,binit,self);
        }else{
        	this.setImageUrl3(picLocation,binit,self);
        }
    }
    //imgupload回调
	ImgBox.prototype.setImageUrl1 = function(url, bInit) {
		var _self = this;
		this.img.unbind('load').bind('load', function() {
			// console.log('图片加载完成');
			_self.setLog('thumbShowTime', new Date().getTime());
			if(_self.status !== 'initData' && !bInit) {
				_self.sendLog();
			}
		});
		if(this.status === 'success') {
			url = url.replace('.jpg', '_130_100.jpg');
		}
		url = url.replace('http:', '');/*QQ接口返回http:*/
		this.img.attr('src',url);
		this.container.attr('draggable','true');
		this.container.append(this.getToolbarHtml());
			
		//@lxf 
		$(this.container).on('mousedown','a',function(e){
			//
			if($(e.currentTarget).hasClass('edit')){
				$(e.currentTarget).attr('id','edit_active');
			}else if($(e.currentTarget).hasClass('delete')){
				$(e.currentTarget).attr('id','delete_active');
			}
		});
		//@lxf 
		$(this.container).on('mouseup','a',function(e){
			//
			if($(e.currentTarget).hasClass('edit')){
				$(e.currentTarget).attr('id','');
			}else if($(e.currentTarget).hasClass('delete')){
				$(e.currentTarget).attr('id','');
			}
		});

		var urlList = url.split('/');
		var fileNameFromApi = urlList[urlList.length-1].replace('_130_100.jpg', '.jpg');
		_self.setLog('FileName', fileNameFromApi);
	};
	  /**
     * 修改图片的地址，个性化定制二手车图片组件
     * @param {String} url 图片地址
     */
    ImgBox.prototype.setImageUrl2 = function(url, bInit, imgupload) {
        var _self = this;
        var boxClass = ImgBox.defaultOpt.className;
        this.img.unbind('load').bind('load', function() {
            // console.log('图片加载完成');
            _self.setLog('thumbShowTime', new Date().getTime());
            if (_self.status !== 'initData' && !bInit) {
                _self.sendLog();
            }
        });
        if (this.status === 'success') {
            url = url.replace('.jpg', '_130_100.jpg');
        }
        url = url.replace('http:', ''); /*QQ接口返回http:*/
        this.img.attr('src', url);
        this.container.attr('draggable', 'true');
        this.container.append(this.getToolbarHtml());

        //@lxf
        $(this.container).on('mousedown', 'a', function(e) {
            //
            if ($(e.currentTarget).hasClass('edit')) {
                $(e.currentTarget).attr('id', 'edit_active');
            } else if ($(e.currentTarget).hasClass('delete')) {
                $(e.currentTarget).attr('id', 'delete_active');
            }
        });
        //@lxf
        $(this.container).on('mouseup', 'a', function(e) {
            //
            if ($(e.currentTarget).hasClass('edit')) {
                $(e.currentTarget).attr('id', '');
            } else if ($(e.currentTarget).hasClass('delete')) {
                $(e.currentTarget).attr('id', '');
            }
        });

        var urlList = url.split('/');
        var fileNameFromApi = urlList[urlList.length - 1].replace('_130_100.jpg', '.jpg');
        _self.setLog('FileName', fileNameFromApi);
        /*begin二手车自定义图片增加图片类型和图片描述字段*/
        if (this.status === 'init') {
            return;
        }
        var $picTagTemplate = $('<span class="img_selector" style="z-index: 3;"><span class="seltext">选择类型</span><ul style="width:79px" class="hc"><li><a href="javascript:void(0)">左前</a></li><li><a href="javascript:void(0)">右后</a></li><li><a href="javascript:void(0)">侧面</a></li><li><a href="javascript:void(0)">车灯</a></li><li><a href="javascript:void(0)">仪表台</a></li><li><a href="javascript:void(0)">内饰</a></li><li><a href="javascript:void(0)">后备箱</a></li><li><a href="javascript:void(0)">轮胎</a></li><li><a href="javascript:void(0)">发动机舱</a></li><i class="shadow"></i></ul></span>');
        $picTagTemplate.insertBefore(this.img);
        var $picdesc = $('<span class="item_input"><i class="tline hc"></i><textarea name="" maxlength="20" cols="3" rows="4" class="c_ccc" placeholder="图片描述...." style="resize:none"></textarea>    <em class="hc">按Enter保存，Esc取消</em><i class="shadow hc"></i></span>')
        if (businessData.isVipApp == 1) { //判断是否是vip发布才可进行图片描述
            this.container.append($picdesc);
        }

        $picTagTemplate.bind("click", function(evnet) {
            $(".img_selector .hc").hide();
            var selector = $(this).find("ul");
            selector.show();
            //_self.container.find(".toolbar_wrap").hide();
            $(_self.container).removeClass(boxClass.container + '_' + ImgsBar.SETTING.STATUS.HOVER);
            _self.container.parent().find("li").css("z-index", 0); /*解决选择下拉框被遮住的问题*/
            _self.container.css("z-index", "100");
        });
        $picTagTemplate.find("a").bind("click", function(event) {
            var selectText = $(this).text();
            var selector = $picTagTemplate.find("ul");
            $picTagTemplate.find(".seltext").text(selectText);
            selector.hide();
            //_self.container.find(".toolbar_wrap").show();
            $(_self.container).addClass(boxClass.container + '_' + ImgsBar.SETTING.STATUS.HOVER);
            event = event ? event : window.event;
            event.stopPropagation();
            var self = $(this);
            ImgsBar.prototype.setBuJianClickLog(self);
        }).bind("mouseover", function(event) {
            $(_self.container).removeClass(boxClass.container + '_' + ImgsBar.SETTING.STATUS.HOVER);
            event = event ? event : window.event;
            event.stopPropagation();
        });
        $picdesc.find('textarea').focus(function() {
            $picdesc.addClass('on');
            _self.container.parent().find("li").css("z-index", 0); /*解决选择下拉框被遮住的问题*/
            _self.container.css("z-index", "100");
            $(".img_selector .hc").hide();
        }).blur(function() {
            $picdesc.removeClass('on');
            ImgsBar.prototype.picdescClickLog();
        }).keyup(function(evt) {
            var $obj = $(evt.target);
            if (evt.which == 13) {
                $obj.val($obj.val().replace("\n", ""));
                $obj.blur();
                return false
            } else if (evt.which == 27) {
                $obj.val("");
                $obj.blur();
                return false
            } else if ($obj.val().length > 50) {
                var val = $obj.val().substr(0, 50);
                $obj.val(val);
                return false
            }
        });
        $(document.body).unbind("click.selector").bind("click.selector", function(event) {
            var event = event || window.event;
            var targetEl = event.target || event.srcElement;
            if ($(targetEl).closest(".img_box ").length > 0) {

            } else {
                $(".img_selector ul").hide();
            }
        })
        this.container.closest(".imgbar_wrap").find(".upload_wrap").removeClass("upload_wrap1");
        /*end二手车自定义图片增加图片类型和图片描述字段*/
        /*图片识别接口开始*/
        //data:JSON.stringify(param),
        var param = {};
        imgupload.precisionIndex = imgupload.precisionIndex || {}; /*用来获取图片上传的索引*/
        imgupload.precisionArr = imgupload.precisionArr || []; /*存储分数值数组，用来获取排序*/
        imgupload.precisionArr = imgupload.precisionArr.sort(function(a, b) { return b - a; }); //按照分数值生成新的排序 重大到小
        param.imgurl = "http:" + url;
        $.ajax({
                url: "//post.58.com/ajax/?action=carmodelrecong&source=car&imgurl=" + param.imgurl + "&userid=" + userid,
                type: "get",
                dataType: "jsonp",
                processData: false,
                async: false,
                success: function(jsonData) {
                    //{"code":"1","precision":"1.000000","type":"左前"}
                    try { jsonData = JSON.parse(jsonData); } catch (e) {}
                    if (jsonData) {
                        switch (jsonData.code) {
                            case "1":
                                _self.precision = 110 + jsonData.precision;
                                //左前
                                break;
                            case "2":
                                //右后
                                _self.precision = 100 + jsonData.precision;
                                break;
                            case "3":
                                //侧面
                                _self.precision = 90 + jsonData.precision;
                                break;
                            case "4":
                                //车灯
                                _self.precision = 80 + jsonData.precision;
                                break;
                            case "5":
                                //仪表台
                                _self.precision = 70 + jsonData.precision;
                                break;
                            case "6":
                                //内饰
                                _self.precision = 60 + jsonData.precision;
                                break;
                            case "7":
                                //后备箱
                                _self.precision = 50 + jsonData.precision;
                                break;
                            case "8":
                                //轮胎
                                _self.precision = 40 + jsonData.precision;
                                break;
                            case "9":
                                //发动机舱
                                _self.precision = 30 + jsonData.precision;
                                break;
                        }
                        /*权重小于.8的图片不参与识别,排序默认0*/
                        if (jsonData.precision < 0.8) {
                            _self.precision = "0";
                        } else {
                            $picTagTemplate.find(".seltext").text(jsonData.type);
                        }
                        imgupload.precisionIndex[_self.opts.id] = _self.precision;
                        imgupload.precisionArr.push(_self.precision);
                        var index = _self.getPercisionIndex(_self.precision, imgupload.precisionArr); /*获取当前图片的排序后索引位置*/
                        //用户选择参与排序开关时才默认参与排序
                        if (imgupload.opts.autosortimglist && _self.opts.id != index) _self.insertBeforeImgs(index, imgupload);
                    }
                }

            })
            /*图片识别接口结束*/
    };
	/** 销毁当前对象 */
	ImgBox.prototype.destroy = function() {
		this.img.unbind('load');
		this.container.remove();
	};
	ImgBox.prototype.sendLog = function() {
		Log.sendJson($.param(this.logObj));
	};
	ImgBox.prototype.setStatus = function(status) {
		this.status = status;
	};
	ImgBox.prototype.forward = function() {
		this.container.insertBefore(this.container.prev());
	};
	ImgBox.prototype.backward = function() {
		this.container.insertAfter(this.container.next());
	};
	ImgBox.prototype.getValue = function() {
		var value = this.img.attr('src');
		return value;
	};
	ImgBox.prototype.setValue = function(url) {
		this.img.attr('src',url);
	};		
	return ImgBox;
});
define('component/imgUpload/js/html5Process',[],function() {

	function Html5Process(param) {
		this.init(param);
	}
	Html5Process.prototype = {
		constructor: Html5Process,
		// defaultOpts: {
		// 	maxByteSize: 400 * 1024, //默认为2M，这个参数是强限制，为-1的时候为无上限
		// 	defCompress: { // 默认压缩
		// 		enable: true, //默认 为 true 进行，false为不进行
		// 		maxSize: 500 * 1024, //对于这个值之上的图片才进行默认压缩，默认500k,为0时全部执行默认压缩
		// 		quality: 80 //默认压缩质量
		// 	},
		// 	widthHeight: { //长宽压缩
		// 		max: { //大于这个长宽的缩放奥这个长宽 默认开放
		// 			enable: true, //为false的时候关闭，不建议关闭
		// 			width: 1600,
		// 			height: 1600
		// 		},
		// 		min: { //小于这个长宽的缩放奥这个长宽 默认关闭
		// 			enable: true, //当为true的时候开启，不建议开启
		// 			width: 400,
		// 			height: 400
		// 		}

		// 	},
		// 	powerZip: { //当前面的压缩完成之后，剩下 的图片还大于maxByteSize，那么执行质量降级压缩
		// 		step: 10, //从defCompress 的quality 开始，减掉一个这个值进行压缩
		// 		minQuality: 50 //默认最低的质量 当达到这个值进行压缩之后，还大于maxByteSize，提示图片过大无法上传
		// 	}
		// },
		init: function(opts) {
			this.opts = $.extend(true, {}, this.defaultOpts, opts);
			// console.log(this.opts)
			this.createElement();
			this.bindDomEvent();
		},
		/**  创建dom元素 */
		createElement: function() {
			var opts = this.opts;
			this.container = $('<div>');
			this.container.addClass('html5');
			// TODO 增加父元素div或者span
			this.elem = $('<input>');
			this.elem.attr('type', 'file');
			this.elem.attr('name', opts.name);
			this.elem.attr('multiple', 'multiple');
			this.elem.attr('tabindex', opts.tabIndex);
			// 增加自定义属性
			for (var key in opts.attr) {
				if (opts.attr.hasOwnProperty(key)) {
					this.elem.attr(key, opts.attr[key]);
				}
			}
			this.container.append(this.elem);
		},
		/**
		 * 渲染到页面上
		 * @param  {Object} wrapElem 父元素的jQuery对象
		 */
		render: function(wrapElem) {
			this.container.appendTo(wrapElem);
		},
		/**
		 * 从页面删除并重建，用于删除图片并重新上传相同图片时
		 * @param  {Object} wrapElem 父元素的jQuery对象
		 */
		rebuild: function() {
			this.container.remove();
			this.createElement();
			this.bindDomEvent();
		},
		/**
		 * 执行图片加载
		 * @param  {Object}   file     文件对象
		 */
		execute: function(file) {
			if(file.size > this.opts.disabledByteSize) {
				alert("上传的图片超过"+ this.opts.disabledByteSize/1024/1024 +"M，请重新上传");
				return;
			}
			if(file.size < 1024 * 5) {
				alert("上传的图片小于5K，请重新上传");
				return;
			}
			var id = (this.opts.startIndex++);
			// console.log('id', id);
			// console.log(file)
			// 读取文件之前的操作
			this.opts.beforeCompress({
				id: id,
				fileName: file.name,
				size: file.size
			});
			// 必须放在这里来处理
			var maxObj = this.opts.getImgNum();
			if(maxObj.hazNum > maxObj.maxNum) {
				// console.log('Html5Process.execute: ' + '超过限制了');
				return;
			}
			var url = URL.createObjectURL(file);
			var img = new Image();
			img.onload = this.getFinalImgData.bind(this, img, id, file);
			img.src = url;
		},
		/**
		 * 图片的处理方法
		 * @param  {String}   name     文件名
		 * @param  {ImageElement}   img      图片元素
		 */
		getFinalImgData: function(img, id, file) {
			var imgData;
			var quality = 100;
			var scale = 1;
			var maxOpt = this.opts.widthHeight.max;
			var minOpt = this.opts.widthHeight.min;
			// 1、默认压缩
			if (this.opts.defCompress.enable === true && file.size > this.opts.defCompress.maxSize) {
				quality = this.opts.defCompress.quality;
				// console.log('execute default compress: ' + quality);
				imgData = this.compress(img, quality, scale);
			}
			// 2、判断最大值
			if (maxOpt.enable === true) {
				// 用最小的缩放尺寸
				scale = maxOpt.width / img.width < maxOpt.height / img.height ? maxOpt.width / img.width : maxOpt.height / img.height;
				// console.log('max scale', scale)
				if (scale < 1) {
					// console.log('execute max scale: ' + scale);
					imgData = this.compress(img, quality, scale);
				}
			}
			// 3、判断最小值
			if (minOpt.enable === true) {
				if (img.width < minOpt.width && img.height < minOpt.height) {
					scale = minOpt.width / img.width < minOpt.height / img.height ? minOpt.width / img.width : minOpt.height / img.height;
					// console.log('min scale', scale)
					// console.log('execute min scale: ' + scale);
					imgData = this.compress(img, quality, scale);
				}
				// 用最小的缩放尺寸
			}
			// 4、判断大小，循环压缩
			while ((this.getBase64Size(imgData) > this.opts.maxByteSize || file.size > this.opts.maxByteSize) && quality > this.opts.powerZip.minQuality) {
				quality = quality - this.opts.powerZip.step;
				// console.log('execute quality compress: ' + quality);
				imgData = this.compress(img, quality, scale);
			}
			if(!imgData) {
				imgData = this.compress(img);
			}
			// 传递给外围的控件
			this.opts.compressComplete({
				id: id,
				size: this.getBase64Size(imgData),
				originWidth: img.width,
				originHeight: img.height,
				width: img.width*scale,
				height: img.height*scale
			});
			var code = Math.random()
			var imgParams = {
				'base64': imgData,
				'name': name,
				'code': code
			}
			this.postImage(id, imgData, name);
		},
		getBase64Size: function(data) {
			data = data || '';
			return data.length/4*3;
		},
		/**
		 * 压缩文件
		 * @param  {Object} img     图片元素
		 * @param  {Number} quality 需要压缩到的质量值
		 * @param  {Number} scale   需要缩放的比例
		 * @return {Object}         压缩后的Data对象
		 */
		compress: function(img, quality, scale) {
			quality = quality || 100;
			scale = scale || 1;
			var cvs = document.createElement('canvas'),
				ctx,
				newImageData;

			cvs.width = img.width * scale;
			cvs.height = img.height * scale;
			ctx = cvs.getContext("2d");
			ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
			newImageData = cvs.toDataURL('image/jpeg', quality / 100);
			cvs = null;
			return newImageData.substring(22);
		},
		bindDomEvent: function() {
			var _self = this;
			var dispid=____json4fe.catentry[0].dispid;
			// TODO input事件兼容
			_self.elem.bind('change', function(e) {
				var files = e.target.files;
				for(var i=0; i<files.length; i++) {
					var file = files[i];
					// 只处理图片文件
					if (!files[i].type.match('image.*')) {
		                continue;
		            }else{
		            	var _disableFlag = false,
		            		_disableType = _self.opts.disableType;
	            		if(_disableType){
	            			//禁用格式
			            	for(var j=0,len=_disableType.length; j<len; j++){
			            		if(files[i].type.indexOf(_disableType[j]) > -1){
			            			_disableFlag = true;
			            			alert('不支持'+_disableType[j]+'格式的图片！');
			            			break;
			            		}
			            	}
	            		}
		            	if(_disableFlag)continue;
		            }
		           
					_self.execute(file);
				}
			});
			// 统计代码
			_self.elem.bind('click', function(){
				if(typeof clickLog === 'function') {
					clickLog('from=pc_escpost_chuantu');
				}
			})
		},
		postImage: function(id, file, fileName) {
			var _self = this;
			_self.opts.beforeUpload({
				id: id,
				fileName: fileName
			});
			var newData = {
                "Pic-Size":"0*0",
                "Pic-Encoding":"base64",
                "Pic-Path":"/p1/big/",
                "Pic-Data":file.substring(1)
            };

	        $.ajax({
				url: "//upload.58cdn.com.cn/json",
	            type:'POST',
	            data:JSON.stringify(newData),
	            processData: false,  // 告诉jQuery不要去处理发送的数据
	            success:function(url){
					var imgData4Edit = 'data:image/jpeg;base64'+file;
						
					var url = "//pic1.58cdn.com.cn/p1/big/" + url;
					_self.opts.uploadComplete({
						id: id,
						url: url,
						fileName: fileName,
						imgData4Edit:imgData4Edit
					});
					imgData4Edit = null;
	            },
	            error: function(XMLHttpRequest, textStatus, errorThrown) {
					_self.opts.uploadError({
						id: id,
						errorMsg:XMLHttpRequest.status+'&'+textStatus+'&'+errorThrown
					});
				}
	        })
		},
		disableUploadBtn: function() {
			// console.log('Html5Process.disableUploadBtn');
			this.elem.attr('disabled', 'disabled');
		},
		enableUploadBtn: function() {
			// console.log('Html5Process.enableUploadBtn');
			this.elem.removeAttr('disabled');
		}
	};
	return Html5Process;
});
/*!	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
define('libs/swfobject',[],function() {

	var swfobject = function() {

		var UNDEF = "undefined",
			OBJECT = "object",
			SHOCKWAVE_FLASH = "Shockwave Flash",
			SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
			FLASH_MIME_TYPE = "application/x-shockwave-flash",
			EXPRESS_INSTALL_ID = "SWFObjectExprInst",
			ON_READY_STATE_CHANGE = "onreadystatechange",

			win = window,
			doc = document,
			nav = navigator,

			plugin = false,
			domLoadFnArr = [main],
			regObjArr = [],
			objIdArr = [],
			listenersArr = [],
			storedAltContent,
			storedAltContentId,
			storedCallbackFn,
			storedCallbackObj,
			isDomLoaded = false,
			isExpressInstallActive = false,
			dynamicStylesheet,
			dynamicStylesheetMedia,
			autoHideShow = true,

			/* Centralized function for browser feature detection
				- User agent string detection is only used when no good alternative is possible
				- Is executed directly for optimal performance
			*/
			ua = function() {
				var w3cdom = typeof doc.getElementById != UNDEF && typeof doc.getElementsByTagName != UNDEF && typeof doc.createElement != UNDEF,
					u = nav.userAgent.toLowerCase(),
					p = nav.platform.toLowerCase(),
					windows = p ? /win/.test(p) : /win/.test(u),
					mac = p ? /mac/.test(p) : /mac/.test(u),
					webkit = /webkit/.test(u) ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, // returns either the webkit version or false if not webkit
					ie = !+"\v1", // feature detection based on Andrea Giammarchi's solution: http://webreflection.blogspot.com/2009/01/32-bytes-to-know-if-your-browser-is-ie.html
					playerVersion = [0, 0, 0],
					d = null;
				if (typeof nav.plugins != UNDEF && typeof nav.plugins[SHOCKWAVE_FLASH] == OBJECT) {
					d = nav.plugins[SHOCKWAVE_FLASH].description;
					if (d && !(typeof nav.mimeTypes != UNDEF && nav.mimeTypes[FLASH_MIME_TYPE] && !nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)) { // navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin indicates whether plug-ins are enabled or disabled in Safari 3+
						plugin = true;
						ie = false; // cascaded feature detection for Internet Explorer
						d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
						playerVersion[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
						playerVersion[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
						playerVersion[2] = /[a-zA-Z]/.test(d) ? parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0;
					}
				} else if (typeof win.ActiveXObject != UNDEF) {
					try {
						var a = new ActiveXObject(SHOCKWAVE_FLASH_AX);
						if (a) { // a will return null when ActiveX is disabled
							d = a.GetVariable("$version");
							if (d) {
								ie = true; // cascaded feature detection for Internet Explorer
								d = d.split(" ")[1].split(",");
								playerVersion = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
							}
						}
					} catch (e) {}
				}
				return {
					w3: w3cdom,
					pv: playerVersion,
					wk: webkit,
					ie: ie,
					win: windows,
					mac: mac
				};
			}(),

			/* Cross-browser onDomLoad
				- Will fire an event as soon as the DOM of a web page is loaded
				- Internet Explorer workaround based on Diego Perini's solution: http://javascript.nwbox.com/IEContentLoaded/
				- Regular onload serves as fallback
			*/
			onDomLoad = function() {
				if (!ua.w3) {
					return;
				}
				if ((typeof doc.readyState != UNDEF && doc.readyState == "complete") || (typeof doc.readyState == UNDEF && (doc.getElementsByTagName("body")[0] || doc.body))) { // function is fired after onload, e.g. when script is inserted dynamically 
					callDomLoadFunctions();
				}
				if (!isDomLoaded) {
					if (typeof doc.addEventListener != UNDEF) {
						doc.addEventListener("DOMContentLoaded", callDomLoadFunctions, false);
					}
					if (ua.ie && ua.win) {
						doc.attachEvent(ON_READY_STATE_CHANGE, function() {
							if (doc.readyState == "complete") {
								doc.detachEvent(ON_READY_STATE_CHANGE, arguments.callee);
								callDomLoadFunctions();
							}
						});
						if (win == top) { // if not inside an iframe
							(function() {
								if (isDomLoaded) {
									return;
								}
								try {
									doc.documentElement.doScroll("left");
								} catch (e) {
									setTimeout(arguments.callee, 0);
									return;
								}
								callDomLoadFunctions();
							})();
						}
					}
					if (ua.wk) {
						(function() {
							if (isDomLoaded) {
								return;
							}
							if (!/loaded|complete/.test(doc.readyState)) {
								setTimeout(arguments.callee, 0);
								return;
							}
							callDomLoadFunctions();
						})();
					}
					addLoadEvent(callDomLoadFunctions);
				}
			}();

		function callDomLoadFunctions() {
			if (isDomLoaded) {
				return;
			}
			try { // test if we can really add/remove elements to/from the DOM; we don't want to fire it too early
				var t = doc.getElementsByTagName("body")[0].appendChild(createElement("span"));
				t.parentNode.removeChild(t);
			} catch (e) {
				return;
			}
			isDomLoaded = true;
			var dl = domLoadFnArr.length;
			for (var i = 0; i < dl; i++) {
				domLoadFnArr[i]();
			}
		}

		function addDomLoadEvent(fn) {
			if (isDomLoaded) {
				fn();
			} else {
				domLoadFnArr[domLoadFnArr.length] = fn; // Array.push() is only available in IE5.5+
			}
		}

		/* Cross-browser onload
			- Based on James Edwards' solution: http://brothercake.com/site/resources/scripts/onload/
			- Will fire an event as soon as a web page including all of its assets are loaded 
		 */
		function addLoadEvent(fn) {
			if (typeof win.addEventListener != UNDEF) {
				win.addEventListener("load", fn, false);
			} else if (typeof doc.addEventListener != UNDEF) {
				doc.addEventListener("load", fn, false);
			} else if (typeof win.attachEvent != UNDEF) {
				addListener(win, "onload", fn);
			} else if (typeof win.onload == "function") {
				var fnOld = win.onload;
				win.onload = function() {
					fnOld();
					fn();
				};
			} else {
				win.onload = fn;
			}
		}

		/* Main function
			- Will preferably execute onDomLoad, otherwise onload (as a fallback)
		*/
		function main() {
			if (plugin) {
				testPlayerVersion();
			} else {
				matchVersions();
			}
		}

		/* Detect the Flash Player version for non-Internet Explorer browsers
			- Detecting the plug-in version via the object element is more precise than using the plugins collection item's description:
			  a. Both release and build numbers can be detected
			  b. Avoid wrong descriptions by corrupt installers provided by Adobe
			  c. Avoid wrong descriptions by multiple Flash Player entries in the plugin Array, caused by incorrect browser imports
			- Disadvantage of this method is that it depends on the availability of the DOM, while the plugins collection is immediately available
		*/
		function testPlayerVersion() {
			var b = doc.getElementsByTagName("body")[0];
			var o = createElement(OBJECT);
			o.setAttribute("type", FLASH_MIME_TYPE);
			var t = b.appendChild(o);
			if (t) {
				var counter = 0;
				(function() {
					if (typeof t.GetVariable != UNDEF) {
						var d = t.GetVariable("$version");
						if (d) {
							d = d.split(" ")[1].split(",");
							ua.pv = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
						}
					} else if (counter < 10) {
						counter++;
						setTimeout(arguments.callee, 10);
						return;
					}
					b.removeChild(o);
					t = null;
					matchVersions();
				})();
			} else {
				matchVersions();
			}
		}

		/* Perform Flash Player and SWF version matching; static publishing only
		 */
		function matchVersions() {
			var rl = regObjArr.length;
			if (rl > 0) {
				for (var i = 0; i < rl; i++) { // for each registered object element
					var id = regObjArr[i].id;
					var cb = regObjArr[i].callbackFn;
					var cbObj = {
						success: false,
						id: id
					};
					if (ua.pv[0] > 0) {
						var obj = getElementById(id);
						if (obj) {
							if (hasPlayerVersion(regObjArr[i].swfVersion) && !(ua.wk && ua.wk < 312)) { // Flash Player version >= published SWF version: Houston, we have a match!
								setVisibility(id, true);
								if (cb) {
									cbObj.success = true;
									cbObj.ref = getObjectById(id);
									cb(cbObj);
								}
							} else if (regObjArr[i].expressInstall && canExpressInstall()) { // show the Adobe Express Install dialog if set by the web page author and if supported
								var att = {};
								att.data = regObjArr[i].expressInstall;
								att.width = obj.getAttribute("width") || "0";
								att.height = obj.getAttribute("height") || "0";
								if (obj.getAttribute("class")) {
									att.styleclass = obj.getAttribute("class");
								}
								if (obj.getAttribute("align")) {
									att.align = obj.getAttribute("align");
								}
								// parse HTML object param element's name-value pairs
								var par = {};
								var p = obj.getElementsByTagName("param");
								var pl = p.length;
								for (var j = 0; j < pl; j++) {
									if (p[j].getAttribute("name").toLowerCase() != "movie") {
										par[p[j].getAttribute("name")] = p[j].getAttribute("value");
									}
								}
								showExpressInstall(att, par, id, cb);
							} else { // Flash Player and SWF version mismatch or an older Webkit engine that ignores the HTML object element's nested param elements: display alternative content instead of SWF
								displayAltContent(obj);
								if (cb) {
									cb(cbObj);
								}
							}
						}
					} else { // if no Flash Player is installed or the fp version cannot be detected we let the HTML object element do its job (either show a SWF or alternative content)
						setVisibility(id, true);
						if (cb) {
							var o = getObjectById(id); // test whether there is an HTML object element or not
							if (o && typeof o.SetVariable != UNDEF) {
								cbObj.success = true;
								cbObj.ref = o;
							}
							cb(cbObj);
						}
					}
				}
			}
		}

		function getObjectById(objectIdStr) {
			var r = null;
			var o = getElementById(objectIdStr);
			if (o && o.nodeName == "OBJECT") {
				if (typeof o.SetVariable != UNDEF) {
					r = o;
				} else {
					var n = o.getElementsByTagName(OBJECT)[0];
					if (n) {
						r = n;
					}
				}
			}
			return r;
		}

		/* Requirements for Adobe Express Install
			- only one instance can be active at a time
			- fp 6.0.65 or higher
			- Win/Mac OS only
			- no Webkit engines older than version 312
		*/
		function canExpressInstall() {
			return !isExpressInstallActive && hasPlayerVersion("6.0.65") && (ua.win || ua.mac) && !(ua.wk && ua.wk < 312);
		}

		/* Show the Adobe Express Install dialog
			- Reference: http://www.adobe.com/cfusion/knowledgebase/index.cfm?id=6a253b75
		*/
		function showExpressInstall(att, par, replaceElemIdStr, callbackFn) {
			isExpressInstallActive = true;
			storedCallbackFn = callbackFn || null;
			storedCallbackObj = {
				success: false,
				id: replaceElemIdStr
			};
			var obj = getElementById(replaceElemIdStr);
			if (obj) {
				if (obj.nodeName == "OBJECT") { // static publishing
					storedAltContent = abstractAltContent(obj);
					storedAltContentId = null;
				} else { // dynamic publishing
					storedAltContent = obj;
					storedAltContentId = replaceElemIdStr;
				}
				att.id = EXPRESS_INSTALL_ID;
				if (typeof att.width == UNDEF || (!/%$/.test(att.width) && parseInt(att.width, 10) < 310)) {
					att.width = "310";
				}
				if (typeof att.height == UNDEF || (!/%$/.test(att.height) && parseInt(att.height, 10) < 137)) {
					att.height = "137";
				}
				doc.title = doc.title.slice(0, 47) + " - Flash Player Installation";
				var pt = ua.ie && ua.win ? "ActiveX" : "PlugIn",
					fv = "MMredirectURL=" + encodeURI(window.location).toString().replace(/&/g, "%26") + "&MMplayerType=" + pt + "&MMdoctitle=" + doc.title;
				if (typeof par.flashvars != UNDEF) {
					par.flashvars += "&" + fv;
				} else {
					par.flashvars = fv;
				}
				// IE only: when a SWF is loading (AND: not available in cache) wait for the readyState of the object element to become 4 before removing it,
				// because you cannot properly cancel a loading SWF file without breaking browser load references, also obj.onreadystatechange doesn't work
				if (ua.ie && ua.win && obj.readyState != 4) {
					var newObj = createElement("div");
					replaceElemIdStr += "SWFObjectNew";
					newObj.setAttribute("id", replaceElemIdStr);
					obj.parentNode.insertBefore(newObj, obj); // insert placeholder div that will be replaced by the object element that loads expressinstall.swf
					obj.style.display = "none";
					(function() {
						if (obj.readyState == 4) {
							obj.parentNode.removeChild(obj);
						} else {
							setTimeout(arguments.callee, 10);
						}
					})();
				}
				createSWF(att, par, replaceElemIdStr);
			}
		}

		/* Functions to abstract and display alternative content
		 */
		function displayAltContent(obj) {
			if (ua.ie && ua.win && obj.readyState != 4) {
				// IE only: when a SWF is loading (AND: not available in cache) wait for the readyState of the object element to become 4 before removing it,
				// because you cannot properly cancel a loading SWF file without breaking browser load references, also obj.onreadystatechange doesn't work
				var el = createElement("div");
				obj.parentNode.insertBefore(el, obj); // insert placeholder div that will be replaced by the alternative content
				el.parentNode.replaceChild(abstractAltContent(obj), el);
				obj.style.display = "none";
				(function() {
					if (obj.readyState == 4) {
						obj.parentNode.removeChild(obj);
					} else {
						setTimeout(arguments.callee, 10);
					}
				})();
			} else {
				obj.parentNode.replaceChild(abstractAltContent(obj), obj);
			}
		}

		function abstractAltContent(obj) {
			var ac = createElement("div");
			if (ua.win && ua.ie) {
				ac.innerHTML = obj.innerHTML;
			} else {
				var nestedObj = obj.getElementsByTagName(OBJECT)[0];
				if (nestedObj) {
					var c = nestedObj.childNodes;
					if (c) {
						var cl = c.length;
						for (var i = 0; i < cl; i++) {
							if (!(c[i].nodeType == 1 && c[i].nodeName == "PARAM") && !(c[i].nodeType == 8)) {
								ac.appendChild(c[i].cloneNode(true));
							}
						}
					}
				}
			}
			return ac;
		}

		/* Cross-browser dynamic SWF creation
		 */
		function createSWF(attObj, parObj, id) {
			var r, el = getElementById(id);
			if (ua.wk && ua.wk < 312) {
				return r;
			}
			if (el) {
				if (typeof attObj.id == UNDEF) { // if no 'id' is defined for the object element, it will inherit the 'id' from the alternative content
					attObj.id = id;
				}
				if (ua.ie && ua.win) { // Internet Explorer + the HTML object element + W3C DOM methods do not combine: fall back to outerHTML
					var att = "";
					for (var i in attObj) {
						if (attObj[i] != Object.prototype[i]) { // filter out prototype additions from other potential libraries
							if (i.toLowerCase() == "data") {
								parObj.movie = attObj[i];
							} else if (i.toLowerCase() == "styleclass") { // 'class' is an ECMA4 reserved keyword
								att += ' class="' + attObj[i] + '"';
							} else if (i.toLowerCase() != "classid") {
								att += ' ' + i + '="' + attObj[i] + '"';
							}
						}
					}
					var par = "";
					for (var j in parObj) {
						if (parObj[j] != Object.prototype[j]) { // filter out prototype additions from other potential libraries
							par += '<param name="' + j + '" value="' + parObj[j] + '" />';
						}
					}
					el.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + att + '>' + par + '</object>';
					objIdArr[objIdArr.length] = attObj.id; // stored to fix object 'leaks' on unload (dynamic publishing only)
					r = getElementById(attObj.id);
				} else { // well-behaving browsers
					var o = createElement(OBJECT);
					o.setAttribute("type", FLASH_MIME_TYPE);
					for (var m in attObj) {
						if (attObj[m] != Object.prototype[m]) { // filter out prototype additions from other potential libraries
							if (m.toLowerCase() == "styleclass") { // 'class' is an ECMA4 reserved keyword
								o.setAttribute("class", attObj[m]);
							} else if (m.toLowerCase() != "classid") { // filter out IE specific attribute
								o.setAttribute(m, attObj[m]);
							}
						}
					}
					for (var n in parObj) {
						if (parObj[n] != Object.prototype[n] && n.toLowerCase() != "movie") { // filter out prototype additions from other potential libraries and IE specific param element
							createObjParam(o, n, parObj[n]);
						}
					}
					el.parentNode.replaceChild(o, el);
					r = o;
				}
			}
			return r;
		}

		function createObjParam(el, pName, pValue) {
			var p = createElement("param");
			p.setAttribute("name", pName);
			p.setAttribute("value", pValue);
			el.appendChild(p);
		}

		/* Cross-browser SWF removal
			- Especially needed to safely and completely remove a SWF in Internet Explorer
		*/
		function removeSWF(id) {
			var obj = getElementById(id);
			if (obj && obj.nodeName == "OBJECT") {
				if (ua.ie && ua.win) {
					obj.style.display = "none";
					(function() {
						if (obj.readyState == 4) {
							removeObjectInIE(id);
						} else {
							setTimeout(arguments.callee, 10);
						}
					})();
				} else {
					obj.parentNode.removeChild(obj);
				}
			}
		}

		function removeObjectInIE(id) {
			var obj = getElementById(id);
			if (obj) {
				for (var i in obj) {
					if (typeof obj[i] == "function") {
						obj[i] = null;
					}
				}
				obj.parentNode.removeChild(obj);
			}
		}

		/* Functions to optimize JavaScript compression
		 */
		function getElementById(id) {
			var el = null;
			try {
				el = doc.getElementById(id);
			} catch (e) {}
			return el;
		}

		function createElement(el) {
			return doc.createElement(el);
		}

		/* Updated attachEvent function for Internet Explorer
			- Stores attachEvent information in an Array, so on unload the detachEvent functions can be called to avoid memory leaks
		*/
		function addListener(target, eventType, fn) {
			target.attachEvent(eventType, fn);
			listenersArr[listenersArr.length] = [target, eventType, fn];
		}

		/* Flash Player and SWF content version matching
		 */
		function hasPlayerVersion(rv) {
			var pv = ua.pv,
				v = rv.split(".");
			v[0] = parseInt(v[0], 10);
			v[1] = parseInt(v[1], 10) || 0; // supports short notation, e.g. "9" instead of "9.0.0"
			v[2] = parseInt(v[2], 10) || 0;
			return (pv[0] > v[0] || (pv[0] == v[0] && pv[1] > v[1]) || (pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2])) ? true : false;
		}

		/* Cross-browser dynamic CSS creation
			- Based on Bobby van der Sluis' solution: http://www.bobbyvandersluis.com/articles/dynamicCSS.php
		*/
		function createCSS(sel, decl, media, newStyle) {
			if (ua.ie && ua.mac) {
				return;
			}
			var h = doc.getElementsByTagName("head")[0];
			if (!h) {
				return;
			} // to also support badly authored HTML pages that lack a head element
			var m = (media && typeof media == "string") ? media : "screen";
			if (newStyle) {
				dynamicStylesheet = null;
				dynamicStylesheetMedia = null;
			}
			if (!dynamicStylesheet || dynamicStylesheetMedia != m) {
				// create dynamic stylesheet + get a global reference to it
				var s = createElement("style");
				s.setAttribute("type", "text/css");
				s.setAttribute("media", m);
				dynamicStylesheet = h.appendChild(s);
				if (ua.ie && ua.win && typeof doc.styleSheets != UNDEF && doc.styleSheets.length > 0) {
					dynamicStylesheet = doc.styleSheets[doc.styleSheets.length - 1];
				}
				dynamicStylesheetMedia = m;
			}
			// add style rule
			if (ua.ie && ua.win) {
				if (dynamicStylesheet && typeof dynamicStylesheet.addRule == OBJECT) {
					dynamicStylesheet.addRule(sel, decl);
				}
			} else {
				if (dynamicStylesheet && typeof doc.createTextNode != UNDEF) {
					dynamicStylesheet.appendChild(doc.createTextNode(sel + " {" + decl + "}"));
				}
			}
		}

		function setVisibility(id, isVisible) {
			if (!autoHideShow) {
				return;
			}
			var v = isVisible ? "visible" : "hidden";
			if (isDomLoaded && getElementById(id)) {
				getElementById(id).style.visibility = v;
			} else {
				createCSS("#" + id, "visibility:" + v);
			}
		}

		/* Filter to avoid XSS attacks
		 */
		function urlEncodeIfNecessary(s) {
			var regex = /[\\\"<>\.;]/;
			var hasBadChars = regex.exec(s) != null;
			return hasBadChars && typeof encodeURIComponent != UNDEF ? encodeURIComponent(s) : s;
		}

		/* Release memory to avoid memory leaks caused by closures, fix hanging audio/video threads and force open sockets/NetConnections to disconnect (Internet Explorer only)
		 */
		var cleanup = function() {
			if (ua.ie && ua.win) {
				window.attachEvent("onunload", function() {
					// remove listeners to avoid memory leaks
					var ll = listenersArr.length;
					for (var i = 0; i < ll; i++) {
						listenersArr[i][0].detachEvent(listenersArr[i][1], listenersArr[i][2]);
					}
					// cleanup dynamically embedded objects to fix audio/video threads and force open sockets and NetConnections to disconnect
					var il = objIdArr.length;
					for (var j = 0; j < il; j++) {
						removeSWF(objIdArr[j]);
					}
					// cleanup library's main closures to avoid memory leaks
					for (var k in ua) {
						ua[k] = null;
					}
					ua = null;
					for (var l in swfobject) {
						swfobject[l] = null;
					}
					swfobject = null;
				});
			}
		}();

		return {
			/* Public API
				- Reference: http://code.google.com/p/swfobject/wiki/documentation
			*/
			registerObject: function(objectIdStr, swfVersionStr, xiSwfUrlStr, callbackFn) {
				if (ua.w3 && objectIdStr && swfVersionStr) {
					var regObj = {};
					regObj.id = objectIdStr;
					regObj.swfVersion = swfVersionStr;
					regObj.expressInstall = xiSwfUrlStr;
					regObj.callbackFn = callbackFn;
					regObjArr[regObjArr.length] = regObj;
					setVisibility(objectIdStr, false);
				} else if (callbackFn) {
					callbackFn({
						success: false,
						id: objectIdStr
					});
				}
			},

			getObjectById: function(objectIdStr) {
				if (ua.w3) {
					return getObjectById(objectIdStr);
				}
			},

			embedSWF: function(swfUrlStr, replaceElemIdStr, widthStr, heightStr, swfVersionStr, xiSwfUrlStr, flashvarsObj, parObj, attObj, callbackFn) {
				var callbackObj = {
					success: false,
					id: replaceElemIdStr
				};
				if (ua.w3 && !(ua.wk && ua.wk < 312) && swfUrlStr && replaceElemIdStr && widthStr && heightStr && swfVersionStr) {
					setVisibility(replaceElemIdStr, false);
					addDomLoadEvent(function() {
						widthStr += ""; // auto-convert to string
						heightStr += "";
						var att = {};
						if (attObj && typeof attObj === OBJECT) {
							for (var i in attObj) { // copy object to avoid the use of references, because web authors often reuse attObj for multiple SWFs
								att[i] = attObj[i];
							}
						}
						att.data = swfUrlStr;
						att.width = widthStr;
						att.height = heightStr;
						var par = {};
						if (parObj && typeof parObj === OBJECT) {
							for (var j in parObj) { // copy object to avoid the use of references, because web authors often reuse parObj for multiple SWFs
								par[j] = parObj[j];
							}
						}
						if (flashvarsObj && typeof flashvarsObj === OBJECT) {
							for (var k in flashvarsObj) { // copy object to avoid the use of references, because web authors often reuse flashvarsObj for multiple SWFs
								if (typeof par.flashvars != UNDEF) {
									par.flashvars += "&" + k + "=" + flashvarsObj[k];
								} else {
									par.flashvars = k + "=" + flashvarsObj[k];
								}
							}
						}
						if (hasPlayerVersion(swfVersionStr)) { // create SWF
							var obj = createSWF(att, par, replaceElemIdStr);
							if (att.id == replaceElemIdStr) {
								setVisibility(replaceElemIdStr, true);
							}
							callbackObj.success = true;
							callbackObj.ref = obj;
						} else if (xiSwfUrlStr && canExpressInstall()) { // show Adobe Express Install
							att.data = xiSwfUrlStr;
							showExpressInstall(att, par, replaceElemIdStr, callbackFn);
							return;
						} else { // show alternative content
							setVisibility(replaceElemIdStr, true);
						}
						if (callbackFn) {
							callbackFn(callbackObj);
						}
					});
				} else if (callbackFn) {
					callbackFn(callbackObj);
				}
			},

			switchOffAutoHideShow: function() {
				autoHideShow = false;
			},

			ua: ua,

			getFlashPlayerVersion: function() {
				return {
					major: ua.pv[0],
					minor: ua.pv[1],
					release: ua.pv[2]
				};
			},

			hasFlashPlayerVersion: hasPlayerVersion,

			createSWF: function(attObj, parObj, replaceElemIdStr) {
				if (ua.w3) {
					return createSWF(attObj, parObj, replaceElemIdStr);
				} else {
					return undefined;
				}
			},

			showExpressInstall: function(att, par, replaceElemIdStr, callbackFn) {
				if (ua.w3 && canExpressInstall()) {
					showExpressInstall(att, par, replaceElemIdStr, callbackFn);
				}
			},

			removeSWF: function(objElemIdStr) {
				if (ua.w3) {
					removeSWF(objElemIdStr);
				}
			},

			createCSS: function(selStr, declStr, mediaStr, newStyleBoolean) {
				if (ua.w3) {
					createCSS(selStr, declStr, mediaStr, newStyleBoolean);
				}
			},

			addDomLoadEvent: addDomLoadEvent,

			addLoadEvent: addLoadEvent,

			getQueryParamValue: function(param) {
				var q = doc.location.search || doc.location.hash;
				if (q) {
					if (/\?/.test(q)) {
						q = q.split("?")[1];
					} // strip question mark
					if (param == null) {
						return urlEncodeIfNecessary(q);
					}
					var pairs = q.split("&");
					for (var i = 0; i < pairs.length; i++) {
						if (pairs[i].substring(0, pairs[i].indexOf("=")) == param) {
							return urlEncodeIfNecessary(pairs[i].substring((pairs[i].indexOf("=") + 1)));
						}
					}
				}
				return "";
			},

			// For internal usage only
			expressInstallCallback: function() {
				if (isExpressInstallActive) {
					var obj = getElementById(EXPRESS_INSTALL_ID);
					if (obj && storedAltContent) {
						obj.parentNode.replaceChild(storedAltContent, obj);
						if (storedAltContentId) {
							setVisibility(storedAltContentId, true);
							if (ua.ie && ua.win) {
								storedAltContent.style.display = "block";
							}
						}
						if (storedCallbackFn) {
							storedCallbackFn(storedCallbackObj);
						}
					}
					isExpressInstallActive = false;
				}
			}
		};
	}();
	return swfobject;
});
define('component/imgUpload/js/flashProcess',['libs/swfobject', 'libs/json2.min'], function(swfobject, JSON) {

	function FlashProcess(opts){
		SWFUP.opts = $.extend(true, {}, this.opts, opts);
	}
	FlashProcess.prototype.render = function(elem) {
		var swfVersionStr = "10.2.0";
        var xiSwfUrlStr = "//img.58cdn.com.cn/ui7/fang/post/img/playerProductInstall.swf";
        var flashvars = {};
        var params = {};
        params.quality = "high";
        params.bgcolor = "#ffffff";
        params.allowscriptaccess = "always";
        params.allowfullscreen = "false";
        params.wmode = "opaque";
        var attributes = {};
        attributes.id = 'PictureUpload';
        attributes.name = 'PictureUpload';
        attributes.align = "center";
        swfobject.embedSWF("//img.58cdn.com.cn/ui7/post/PictureUpload_postv1.swf", elem.attr('id'), "96", "90", swfVersionStr, xiSwfUrlStr, flashvars, params, attributes);
        swfobject.createCSS("#flashContent", "display:block;text-align:center;");
	};

	FlashProcess.prototype.enableUploadBtn = function() {
		// console.log('enableUploadBtn');
		try {
			SWFUP.getSWF(SWFUP.name).setImgUpAble(true);
		} catch (e) {
			var self = arguments.callee;
			window.setTimeout(self, 3000);
		}
	};
	FlashProcess.prototype.disableUploadBtn = function() {
		// console.log('disableUploadBtn');
		try {
			SWFUP.getSWF(SWFUP.name).setImgUpAble(false);
		} catch (e) {
			var self = arguments.callee;
			window.setTimeout(self, 3000);
		}
	};
	/*
	paralleNum：并行上传数  默认 1
	isNeedCompress：是否需要进行压缩  默认压缩
	compressQuality：压缩质量  默认 80
	compressAgain：是否需要进行多次压缩  默认是
	*/
	window.SWFUP = {
		//url: "//pic.kuche.com/postpic/upload?flash=1",
		url: "//upload.58cdn.com.cn",
		picpath: "/p1/big/",
		picsize: "640*0,240*0,100*75*3", // XXX*0 意味不限高 0*xxxx 意味不限宽 XXXX*xxxx*3 意味有裁剪 xxxx*xxxx*0 意味等比例缩放
		picbulk: "0,0,0", //已经舍弃 功能未知，
		dpi: "0,0,0", //对应图片分辨率 为63
		piccut: "0*0*0*0,0*0*0*0,0*0*100*75", // 图片裁剪 a*b*c*d 从left=a top=b 开始裁剪 到 left=c top=d的图片 
		picwater: "True,False,False", //是否增加水印

		extension: "jpg",
		btImg0: "//img.58cdn.com.cn/ui7/post/pc/imgs/upload-large.jpg",
		btImg1: "//img.58cdn.com.cn/ui7/post/pc/imgs/upload-large-hover.jpg",
		btImg2: "//img.58cdn.com.cn/ui7/post/pc/imgs/upload-large-disabled.jpg",
		btImg3: "//img.58cdn.com.cn/ui7/post/pc/imgs/upload-large.jpg",
		picMaxSize: 10485760,
		paralleNum: 3,
		getFlashBtn: function() { //返回flash 对象
			// console.log('getFlashBtn');
		},
		// 返回当前的图片数量和总数量限制
		// 必须要返回，否则swf初始化错误
		getImgNum: function() { //向flash传递当前上传
			// console.log('getImgNum');
			// console.log(this.opts.getImgNum())
			return this.opts.getImgNum();
		},
		getUpsetting: function() { //向flash传递设置参数

			// console.log('getUpsetting');
			// console.log({
			// 		maxByteSize: this.opts.maxByteSize,
			// 		defCompress: this.opts.defCompress,
			// 		widthHeight: this.opts.widthHeight,
			// 		powerZip: this.opts.powerZip
			// 	});
			return {
				url: this.url,
				picpath: this.picpath,
				picsize: this.picsize, // XXX*0 意味不限高 0*xxxx 意味不限宽 XXXX*xxxx*3 意味有裁剪 xxxx*xxxx*0 意味等比例缩放 
				picbulk: this.picbulk, //已经舍弃 功能未知，
				dpi: this.dpi, //对应图片分辨率 为63
				piccut: this.piccut, // 图片裁剪 a*b*c*d 从left=a top=b 开始裁剪 到 left=c top=d的图片 
				picwater: this.picwater, //是否增加水印
				extension: this.extension,
				btImg0: this.btImg0,
				btImg1: this.btImg1,
				btImg2: this.btImg2,
				btImg3: this.btImg3,
				picMaxSize: this.picMaxSize,
				disableType:this.opts.disableType,
				compressOpt: {
					maxByteSize: this.opts.maxByteSize,
					defCompress: this.opts.defCompress,
					widthHeight: this.opts.widthHeight,
					powerZip: this.opts.powerZip
				}
			}
		},
		// 参数{num: 3, hazOver: false}
		// 返回Array
		beginAdd: function(paras) { //上传前向js传递内容
			// console.log('beginAdd');
			return this.generateId(paras.num);
			// return UpImageShowBar.beginAdd(paras);
		},
		generateId: function(number) {
			// console.log('generateId, number: ' + number);
			var id = -1;
			var idList = [];
			for(var i=0; i<number; i++) {
				id = (this.opts.startIndex ++);
				this.opts.beforeCompress({
					id: id
				});
				idList.push(id);
			}
			return idList;
		},
		addImg: function(paras) { //{url:'/flash/big/n_546547657657.jpg'}
			// console.log('addImg');
			// console.log(JSON.stringify(paras))
			var picpaths=this.picpath.split(",");
            var url="//pic1.58cdn.com.cn"+picpaths[0]+paras.picName;
            // console.log(url)
			this.opts.uploadComplete({
				id: paras.code,
				url: url,
				fileName: paras.picName
			});
		},
		addImgLoad: function() {
			// console.log('addImgLoad');
		},
		getSWF: function(movieName) {
			// console.log('getSWF');
			if (navigator.appName.indexOf("Microsoft") != -1) {
				return document.getElementById(movieName);
			} else {
				return document[movieName];
			}
		},
		delImg: function(code) {
			// console.log('delImg');
			//UpImageShowBar.regEnableBtn(this.enableUploadBtn);
			SWFUP.getSWF(SWFUP.name).imgDel(code);
		},
		showError: function(errObj) {
			this.opts.uploadError({
				id: errObj.infoCode
			});
		},
		scrollFunc: function() {
			// console.log('scrollFunc');
			//var cp=$("#uploadImgcontainer").position();
			//  var st=document.documentElement.scrollTop + document.body.scrollTop;
			//  var sh=document.documentElement.clientHeight;
			//  if(st+sh-cp.top>30){
			//      $(window).unbind("scroll",SWFUP.scrollFunc);
			// window.setTimeout(UpImageShowBar.hideMultSel, 5000);
			// UpImageShowBar.container.parent().unbind("mouseover", SWFUP.scrollFunc);
			//  }
		},
		initFlashBtn: function(settings) { //初始化flash按钮 和设置
			// console.log('initFlashBtn');
			if (settings.name) {
				this.name = settings.name
			}
		},
		setUpstate: function(paras) {
			// console.log('setUpstate');
			// console.log(JSON.stringify(paras))
			_self.opts.beforeUpload({
				id: paras.code
			});
		}
	}
	return FlashProcess;
});
define('component/imgUpload/js/formProcess',[],function() {
	function FormProcess(opts) {
		// console.log('FormProcess')
		this.opts = opts
	}
	FormProcess.prototype = {
		constructor:FormProcess,
		url: "",
		picSize: -1,
		picurl: "p1",
		createIframe: function() {
			// console.log('SINGLEUP.createIframe');
		},
		addImg: function(suc, url, pos) {
			// console.log('SINGLEUP.addImg');
			if (suc == 1) {
				url = "//pic1.58cdn.com.cn/" + this.picurl + "/big" + url.substr(url.lastIndexOf("\/"));
				this.opts.uploadComplete({
					url: url,
					id: pos
				});
				// UpImageShowBar.addImg({
				// 	url: url,
				// 	code: pos
				// });
			} else {
				this.opts.uploadError({
					id: pos
				});
				// UpImageShowBar.showError(url);
				// UpImageShowBar.setImgErr(pos);
			}
			$("iframe[name='frmUpload_" + pos + "']").remove();
		},
		addImgLoad: function() {
			var  SINGLEUP =this;
			window.SINGLEUP = this;
			// console.log('SINGLEUP.addImgLoad');
			if ($(this.upbtn).val() == "") return;
			// UpImageShowBar.hideError();

			var code = Math.random() * 1000;
			// console.log();
			var _sync = SINGLEUP.getFileSize($(this.upbtn)[0]);
			if (_sync) { // 同步
				if (SINGLEUP.picSize > 0) {
					var v1 = SINGLEUP.picSize; // byte
					
					if (v1 > SINGLEUP.opts.maxByteSize) {
						alert('不能上传大于'+ SINGLEUP.opts.maxByteSize/1024/1024 +'M的图片');
						// UpImageShowBar.setImgErr(code);
						// UpImageShowBar.resetInfo();
						SINGLEUP.setFilePos();
						return;
					}
					var _disableFlag = false,
	            		_disableType = SINGLEUP.opts.disableType,
	            		_picType = SINGLEUP.picType;
	            		if(_disableType){
	            			//禁用格式
			            	for(var j=0,len=_disableType.length; j<len; j++){
			            		if(_picType.indexOf(_disableType[j]) > -1){
			            			_disableFlag = true;
			            			alert('不支持'+_disableType[j]+'格式的图片！');
			            			break;
			            		}
			            	}
	            		}
	            	if(_disableFlag)return;
				}
				SINGLEUP.initForm({
					code: code
				});
			} else { // 异步
				setTimeout(function() {
					if (SINGLEUP.picSize > 0) {
						var v1 = SINGLEUP.picSize; // byte
						if (v1 > SINGLEUP.opts.maxByteSize) {
							alert('不能上传大于'+ SINGLEUP.opts.maxByteSize/1024/1024 +'M的图片');
							// UpImageShowBar.setImgErr(code);
							// UpImageShowBar.resetInfo();
							SINGLEUP.setFilePos();
							return;
						}
					}
					SINGLEUP.initForm({
						code: code
					});
				}, 700);
			}

			SINGLEUP.setFilePos();
			// UpImageShowBar.resetInfo();
		},
		initForm: function(param) {
			var  SINGLEUP =this;
			SINGLEUP.opts.beforeCompress({
				id: param.code
			});
			// console.log('SINGLEUP.initForm')

			$("#backFunction").after('<iframe width="1" height="1" name="frmUpload_' + param.code + '" ></iframe>');

			//$('#myfile').val($('#fileUploadInput').val());
			SINGLEUP.content.find("#SINGLEUP")[0].target = "frmUpload_" + param.code;
			SINGLEUP.content.find("#PicPos").val(param.code);

			SINGLEUP.content.find('#SINGLEUP').submit();
		},
		enableSingleBtn: function() {
			var  SINGLEUP =this;
			// console.log('SINGLEUP.enableSingleBtn')
			SINGLEUP.content.removeClass("w_localn").addClass("w_local");
			SINGLEUP.btnCon.show();

		},
		disableSingleBtn: function() {
			var  SINGLEUP =this;
			// console.log('SINGLEUP.disableSingleBtn')
			SINGLEUP.content.removeClass("w_local").addClass("w_localn");
			SINGLEUP.btnCon.hide();
		},
		delImg: function() {
			var  SINGLEUP =this;
			// console.log('SINGLEUP.delImg')
			SINGLEUP.setFilePos();
		},
		setFilePos: function() {
			// console.log('SINGLEUP.setFilePos')
			// var contpos = SINGLEUP.content.offset();
			// SINGLEUP.btnCon = $("#singleCon");
			// SINGLEUP.btnCon.css({
			// 	left: contpos.left + "px",
			// 	top: contpos.top + "px"
			// });

		},
		getFileSize: function(input) {
			var  SINGLEUP =this;
			// console.log('SINGLEUP.getFileSize')
			var _sync = false; // 是否为同步
			try {
				if (input.files) {
					SINGLEUP.picSize = input.files[0].size;
					SINGLEUP.picType = input.files[0].type;
					_sync = true;
				} else {
					var img = new Image();
					img.onload = function() {
						SINGLEUP.picSize = img.fileSize;
						img.onload = img.onerror = null;
						delete img;
					};
					img.onerror = function() {
						SINGLEUP.picSize = -1;
						//alert(arguments[0]);
						img.onload = img.onerror = null;
						delete img;
					};
					img.src = input.value;
				}
			} catch (e) {
				SINGLEUP.picSize = -1;
			};
			return _sync;
		},
		initBtn: function(param) {
			var  SINGLEUP =this;
			// console.log('SINGLEUP.initBtn')
			SINGLEUP.url = param.url;
			if (SINGLEUP.content.find("#SINGLEUP").length <= 0) {
				var strAry = ['<form id="SINGLEUP" name="SINGLEUP" method="post" target="frmUpload_' + param.code + '" action="' + SINGLEUP.url + '" enctype="multipart/form-data">',
					'<span style="display:none"><input type="text" id="name" name="name" value="Jeky" />',
					'<input type="hidden" id="backFunction" name="backFunction" value="SINGLEUP.addImg" /><input type="hidden" name="__pic_dir" value="' + SINGLEUP.picurl + '" />',
					'<input type="hidden" name="PicPos" id="PicPos" value="' + param.code + '" /></span>',
					'<div id="singleCon" style="position:absolute;overflow:hidden"></div><input type="file" name="fileUploadInput" id="fileUploadInput" style="cursor:pointer" ></form>'
				]
				SINGLEUP.content.append(strAry.join(""));
			}
			//document.write('');
			//$('#fileUploadInput').css({"top":800,left:400});
			SINGLEUP.content.find('#fileUploadInput').change(SINGLEUP.addImgLoad.bind(SINGLEUP));
			// if ($("#flashContent").length > 0) {
			// 	SINGLEUP.content = $("#flashContent").parent();
			// } else {
			// 	SINGLEUP.content = param.content;
			// }
			//SINGLEUP.content=$("#flashContent").parent();
			//SINGLEUP.content.html("图片上传");
			
			SINGLEUP.content.mouseover(SINGLEUP.setFilePos);
			SINGLEUP.content.find("#singleCon").mouseover(SINGLEUP.setFilePos);
			// UpImageShowBar.regEnableBtn(SINGLEUP.enableSingleBtn);
			// UpImageShowBar.regDisableBtn(SINGLEUP.disableSingleBtn);
			// UpImageShowBar.regDelImg(SINGLEUP.delImg);
			SINGLEUP.btnCon = SINGLEUP.content.find("#singleCon");
			SINGLEUP.btnCon.bind("click",function(event){
				event = event ? event : window.event;
				SINGLEUP.upbtn.trigger("click");
			});
			SINGLEUP.btnCon.css({
				width: "120px",
				height: "125px"
			});
			SINGLEUP.setFilePos();
			SINGLEUP.upbtn = SINGLEUP.content.find("#fileUploadInput");
			// SINGLEUP.upbtn.hide();
			SINGLEUP.upbtn.mouseover(function(evt) {
				SINGLEUP.content.css({
					color: "#000",
					"text-decoration": "none"
				});
			}).mouseout(function(evt) {
				SINGLEUP.content.css({
					color: "#666",
					"text-decoration": "none"
				});

			})
			//SINGLEUP.content = $();
			//SINGLEUP.content.html("");

		}
	}
	FormProcess.prototype.render = function(elem) {
		var  SINGLEUP =this;
		SINGLEUP.content = elem;
		SINGLEUP.initBtn({
			url: '//postimage.58.com/upload'
		})
	}
	return FormProcess;
});
define('component/imgUpload/js/wxProcess',[],function() {

	// 微信传图
	// 1、获取二维码图片。15min刷新一次
	// 2、长连接查询已上传的图片
	// 3、获取到图片列表，截取最新的图片，传递给imgUpload
	function WxUpload(opts) {
		this.opts = {
			containerSelector: '.'
		}
		this.opts = $.extend(true, {}, this.opts, opts);
		this.init();
	}
	WxUpload.prototype.init = function() {
		var _self = this;
		// 最后一次缓存的imgUrl数组
		_self.cachedImages = [];
		// 本次需要添加的imgUrl数组
		_self.needAddImages = [];
		_self.createElem();
	};
	WxUpload.prototype.createElem = function() {
		this.container = $('<div>').addClass('wx_img_wrap');
		this.img = $('<img>').css({
			width: 94,
			height: 94
		});
		var tipElem = $('<div class="wxTxt">').html('使用<i class="wx">微信</i>扫描左侧二维码<br>关注58公众号后<br>将图片<i class="fs">发送</i>给公众号即可传图');
		this.container.append(this.img);
		this.container.append(tipElem);
	};
	/**
	 * 获取二维码图片地址和对应的codeId
	 * @param  {Function} callback 获取成功后的回调函数
	 */
	WxUpload.prototype.requestQRCode = function(callback) {
		var _self = this;
		$.ajax({
			url: '//weixin.58.com/sns/upimg/show?uptype=release',
			type: 'get',
			dataType: 'jsonp',
			success: function(data) {
				_self.scenestr = data.scenestr;
				_self.img.attr('src', data.url);
				if (typeof callback === 'function') {
					callback();
				}
				setTimeout(function(){
					_self.requestQRCode();
				}, 15 * 60 * 1000);

				//防止页面富文本因为长轮循不加载
				// var queryImgTimer = function() {
				// 	if (wxImgUpload.UEEditorDone) {
				// 		wxImgUpload.queryImages();
				// 	} else {
				// 		setTimeout(queryImgTimer, 1000);
				// 	}
				// }
				// if (typeof(editorCfg) != 'undefined') {
				// 	setTimeout(queryImgTimer, 3 * 1000);
				// } else {
				// 	setTimeout(wxImgUpload.queryImages, 3000);
				// }
			},
			error: function(e) {
				// 重试
			}
		});
	};
	/**
	 * 长连接获取微信上传的图片
	 */
	WxUpload.prototype.requestImages = function() {
		// console.log('WxUpload.requestImages');
		var _self = this;
		var dispid=____json4fe.catentry[0].dispid;
		// 如果超出了，是否考虑不再发长连接请求？
		$.ajax({
			url: '//weixin.58.com/sns/upimg/list?scenestr=' + _self.scenestr,
			type: 'get',
			dataType: 'jsonp',
			jsonp: 'callback',
			success: function(data) {
				// var json = eval(data);
				//console.log(json);
				if (data.url && data.url.length > 0) {
					if(dispid=='1'){//房产类不允许上传gif格式的图片
						var len=data.url.length;
						var arr=[];
						for(var i=0;i<len;i++){
							if(data.url[i].indexOf('.gif')>-1){
								alert('请上传 jpg/jpeg/png格式的图片！');
								continue;
							}else{
								arr.push(data.url[i]);
							}
						}
						data.url=arr;
					}
					// 求当前和上一次的差集数组，并缓存到needAddImages中
					_self.needAddImages = _self.array_diff(data.url, _self.cachedImages);
					if (_self.needAddImages.length > 0) {
						_self.addImages();
					}
					_self.cachedImages = data.url;
				}
				_self.requestImages();
			},
			error: function(e) {
				_self.requestImages();
			}
		});
	};
	WxUpload.prototype.addImages = function() {
		var _self = this;
		var i = 0;
		var length = _self.needAddImages.length;
		var id;
		for (; i < length; i++) {
			id = 'wx_' + (_self.opts.startIndex++);
			var queryObj = {
				id: id,
				url: '//pic1.58cdn.com.cn' + _self.needAddImages[i]
			}
			var isExceed = _self.opts.isExceed(queryObj);
			if (isExceed) {
				_self.abortQuery();
				return;
			}
			_self.opts.beforeCompress(queryObj);
			_self.opts.uploadComplete(queryObj);
		}
	};

	/**
	 * 通知微信服务，提示用户已达到图片上限
	 */
	WxUpload.prototype.abortQuery = function() {
        var _self = this;
		$.ajax({
			url: '//weixin.58.com/sns/upimg/alert?scenestr=' + _self.scenestr,
			type: 'get',
			dataType: 'jsonp',
			jsonp: 'callback',
			success: function(data) {}
		});
	};

	/**
	 * array1对于array2的差集计算
	 * @param  {Array} array1 原数组
	 * @param  {Array} array2 目标数组
	 * @return {Array}        差集数组
	 */
	WxUpload.prototype.array_diff = function(array1, array2) {
		var o = {};
		for (var i = 0, len = array2.length; i < len; i++) {
			o[array2[i]] = true;
		}

		var result = [];
		for (i = 0, len = array1.length; i < len; i++) {
			var v = array1[i];
			if (o[v]) continue;
			result.push(v);
		}
		return result;
	};
	WxUpload.prototype.render = function(elem) {
		this.intervalId = null;
		var _self = this;
		_self.container.appendTo(elem);
		// 编辑器加载完成后，开始长连接查询
		_self.intervalId = setInterval(sendRequest, 1000);

		function sendRequest() {
			if (true === window.FE58.UEEditorDone) {
				_self.requestQRCode(function() {
					_self.requestImages();
				});
				clearInterval(_self.intervalId);
				_self.intervalId = null;
			}
		}
	}
	return WxUpload;
});
define('component/imgUpload/js/qqProcess',[],function() {

	// 手机QQ传图
	// 1、获取二维码图片。30min刷新一次
	// 2、长连接查询已上传的图片
	// 3、获取到图片列表，截取最新的图片，传递给imgUpload
	function QqUpload(opts) {
		this.opts = {
			containerSelector: '.'
		}
		this.opts = $.extend(true, {}, this.opts, opts);
		this.init();
	}
	QqUpload.prototype.init = function() {
		var _self = this;
		// 最后一次缓存的imgUrl数组
		_self.cachedImages = [];
		// 本次需要添加的imgUrl数组
		_self.needAddImages = [];
		_self.createElem();
	};
	QqUpload.prototype.createElem = function() {
		this.container = $('<div>').addClass('qq_img_wrap');
		this.img = $('<img>').css({
			width: 94,
			height: 94
		});
		var tipElem = $('<div class="qqTxt">').html('使用<i class="sjqq">手机QQ</i>扫描左侧二维码<br>关注58公众号后<br>将图片<i class="fs">发送</i>给公众号即可传图');
		this.container.append(this.img);
		this.container.append(tipElem);
	};
	/**
	 * 获取二维码图片地址和对应的codeId
	 * @param  {Function} callback 获取成功后的回调函数
	 */
	QqUpload.prototype.requestQRCode = function(callback) {
		var _self = this;
		$.ajax({
			url: '//qq.58.com/sns/upimg/show?uptype=release',
			type: 'get',
			dataType: 'jsonp',
			success: function(data) {
				_self.scenestr = data.scenestr;
				_self.img.attr('src', data.url);
				if (typeof callback === 'function') {
					callback();
				}
				setTimeout(function(){
					_self.requestQRCode();
				}, 30 * 60 * 1000);
			},
			error: function(e) {
				// 重试
			}
		});
	};
	/**
	 * 长连接获取qq上传的图片
	 */
	QqUpload.prototype.requestImages = function() {
		var _self = this;
		var dispid=____json4fe.catentry[0].dispid;
		// 如果超出了，是否考虑不再发长连接请求？
		$.ajax({
			url: '//qq.58.com/sns/upimg/list?scenestr=' + _self.scenestr,
			type: 'get',
			dataType: 'jsonp',
			jsonp: 'callback',
			success: function(data) {
				if (data.url && data.url.length > 0) {
					var len=data.url.length;
					var arr=[];
					if(dispid=='1'){//房产类不允许上传gif格式的图片
						for(var i=0;i<len;i++){
							if(data.url[i].indexOf('.gif')>-1){
								alert('请上传 jpg/jpeg/png格式的图片！');
								continue;
							}else{
								arr.push(data.url[i]);
							}
						}
						data.url=arr;
					}
					
					// 求当前和上一次的差集数组，并缓存到needAddImages中
					_self.needAddImages = _self.array_diff(data.url, _self.cachedImages);
					if (_self.needAddImages.length > 0) {
						_self.addImages();
					}
					_self.cachedImages = data.url;
				}
				_self.requestImages();
			},
			error: function(e) {
				_self.requestImages();
			}
		});

	};
	QqUpload.prototype.addImages = function() {
		var _self = this;
		var i = 0;
		var length = _self.needAddImages.length;
		var id;
		for (; i < length; i++) {
			id = 'qq_' + (_self.opts.startIndex++);
			var queryObj = {
				id: id,
                url: _self.needAddImages[i]
				//url: 'http://pic1.58cdn.com.cn' + _self.needAddImages[i]
			}
			var isExceed = _self.opts.isExceed(queryObj);
			if (isExceed) {
				_self.abortQuery();
				return;
			}
			_self.opts.beforeCompress(queryObj);
			_self.opts.uploadComplete(queryObj);
		}
	};

	/**
	 * 通知微信服务，提示用户已达到图片上限
	 */
	QqUpload.prototype.abortQuery = function() {
        var _self = this;
		$.ajax({
			url: '//qq.58.com/sns/upimg/alert?scenestr=' + _self.scenestr,
			type: 'get',
			dataType: 'jsonp',
			jsonp: 'callback',
			success: function(data) {}
		});
	};

	/**
	 * array1对于array2的差集计算
	 * @param  {Array} array1 原数组
	 * @param  {Array} array2 目标数组
	 * @return {Array}        差集数组
	 */
	QqUpload.prototype.array_diff = function(array1, array2) {
		var o = {};
		for (var i = 0, len = array2.length; i < len; i++) {
			o[array2[i]] = true;
		}

		var result = [];
		for (i = 0, len = array1.length; i < len; i++) {
			var v = array1[i];
			if (o[v]) continue;
			result.push(v);
		}
		return result;
	};
	QqUpload.prototype.render = function(elem) {
		this.intervalId = null;
		var _self = this;
		_self.container.appendTo(elem);
		// 编辑器加载完成后，开始长连接查询
		_self.intervalId = setInterval(sendRequest, 1500);
		function sendRequest() {
            //防止页面富文本因为长轮循不加载
			if (true === window.FE58.UEEditorDone) {
				_self.requestQRCode(function() {
					_self.requestImages();
				});
				clearInterval(_self.intervalId);
				_self.intervalId = null;
			}
		}
	}
	return QqUpload;
});
define('component/editPic/js/editPic',[],function(){

function EditPic(imgopts){
	this.defaultopts = {
		url:'',     		//原图url
		indexId:'', 		//原图在imglist中id，用于上传
		item:'',    		//所编辑的imgBox对象
		degree:-90, 		//默认旋转角度
		lineWeight:[5,10,15]//马赛克画笔
	};
	this.opts = $.extend(true, {}, this.defaultopts, imgopts);

	this.canvas = '';
	this.context = '';
	this.editFrame = '';	//整个编辑组件
	this.canvasFrame = '';	//画布所在框
	this.clipFrame ='';		//裁剪框

	this.emptyEditHistory();//清空编辑历史数据

	this.hasSendUv = false;	//是否已发送UV统计
	
	this.init();
};
EditPic.prototype = {
	init:function(){
		var _this = this;
		var bindEditFrame = 'EVENT_OF_BIND_DOM_EVENT';
		
		//防止剪切框拖动过程出现选中状态
		$('body').bind(bindEditFrame, function(){
			_this.bindDomEvent();
		});
		//图片绘制完成才初始化操作绑定
		_this.createDom(bindEditFrame);

		_this.initDone();
	},
	emptyEditHistory:function(){
		this.editHistory = [];
		this.currentEditObj = {
			editType:'',
			initImg:''
		};
		
		this.mosaicAble = false;	//马赛克未初始化
		this.clipAble = false;

		this.initSuccess = false;	//初始化未完成

		this.resizeRate = 1;		//原图第一次缩放比,提交前还原尺寸
		
		this.clipOpenTime = null;
		this.clipCompleteTime = null;
	},
	initDone:function(){
		var _this = this;
		$('body').bind('selectstart', function(){
			return false;
		});
		_this.changeWindowScroll('forbid');
		_this.listenOptionsShow('start');
		setTimeout(function(){
			if( !_this.initSuccess && ( $('#editFrame').css('display') != 'none') ){
				alert('图片初始化失败，请重试');
				_this.hideEditFrame();
			}
		},20*1000);
	},
	/**
	 * 从第二张图片打开时恢复编辑组件数据到默认状态，重绘新图片，不再init
	 */
	resetImgItem:function(imgopts){

		var _this = this;
		
		_this.opts = $.extend(true, {}, _this.defaultopts, imgopts);

		$('#shadeFrame').show();
		$(_this.editFrame).show();
		$(_this.loadingTip).show();		

		//重绘图片
		_this.emptyEditHistory();

		_this.initResizeCanvas();	

		//按钮样式
		$(_this.btn.restoreBtn).addClass('restoreDisable');
		$(_this.btn.clipBtn).attr('class','button1 clipDefault');
		$(_this.btn.rotateBtn).attr('class','button1 rotateDefault');
		$(_this.btn.mosaicBtn).attr('class','button1 mosaicDefault');

		_this.initDone();
	},
	/**
	 * 生成Dom结构并初始化事件绑定,只在编辑第一张图片时执行
	 * @param {[String]} EVENT_TYPE [回调中触发的事件,此处固定为EVENT_OF_BIND_EDIT_FRAME]
	 */
	createDom:function(EVENT_TYPE){
		var _this = this;

		// 遮罩加编辑框加画布
		var domStr = '<div id="shadeFrame">'+
					 '</div>'+
					 '<div id="editFrame">'+
					 	'<div class="editTitle">'+
					 		'<span>编辑图片</span>'+
					 		'<div id="btnClose"></div>'+
					 	'</div>'+
					 	'<div id="canvasFrame">'+
					 		'<canvas id="canvas">你的浏览器不支持编辑功能</canvas>'+
					 		'<span id="loadingTip">图片加载中……</span>'+
					 	'</div>'+
					 	'<div class="buttonBar">'+
					 		'<div class="lineWeightOptions">'+
					 			'<div class="listIcon">'+
					 				'<div class=""></div>'+
					 			'</div>'+
					 			'<div class="options">'+
					 				'<div class="sLine"><span></span> 小范围</div>'+
					 				'<div class="mLine"><span></span> 中范围</div>'+
					 				'<div class="bLine"><span></span> 大范围</div>'+
					 			'</div>'+
					 		'</div>'+
					 		'<div class="editBtnBar">'+
					 			'<div class="button1 rotateDefault" id="rotate"><div class="editBtnIcon"></div><span>旋转</span></div>'+
					 			'<div class="button1 clipDefault" id="clip"><div class="editBtnIcon"></div><span>剪裁</span></div>'+
								'<div class="button1 mosaicDefault" id="mosaic"><div class="editBtnIcon"></div><span>模糊</span></div>'+
							'</div>'+
							'<div id="restore" class="restoreDisable"><div class="restoreIcon"></div><span>撤销</span></div>'+
						'</div>'+
						'<div id="submitImage">完成</div>'+
					 '</div>';
		$('body').append(domStr);

		_this.canvas = document.getElementById('canvas');
		_this.canvasFrame =document.getElementById('canvasFrame');
		_this.editFrame = document.getElementById('editFrame');
		_this.loadingTip = document.getElementById('loadingTip');

		try{
			_this.context = _this.canvas.getContext('2d');
		}catch(e){
			alert('你的浏览器不支持图片编辑功能，请升级浏览器或使用其他浏览器重试');
			_this.hideEditFrame();
			return;
		}

		_this.btn ={
			clipBtn:document.getElementById('clip'),
			rotateBtn:document.getElementById('rotate'),
			mosaicBtn:document.getElementById('mosaic'),
			restoreBtn:document.getElementById('restore'),
			submitBtn:document.getElementById('submitImage'),
			closeBtn:document.getElementById('btnClose')
		};
		// 生成适应编辑框的画布图
		_this.initResizeCanvas(EVENT_TYPE);
	},
	/**
	 * 针对编辑框按钮样式和功能的绑定
	 */
	bindDomEvent:function(){
		var _this = this;

		//按钮样式及功能切换绑定
		$(_this.btn.clipBtn).on('mouseover',_mouseOverBtn).on('mouseout',_mouseOutBtn).on('click',_clickBtn);
		$(_this.btn.rotateBtn).on('mouseover',_mouseOverBtn).on('mouseout',_mouseOutBtn).on('click',_clickBtn);
		$(_this.btn.mosaicBtn).on('mouseover',_mouseOverBtn).on('mouseout',_mouseOutBtn).on('click',_clickBtn);

		function _mouseOverBtn(e){
			if(!_this.initSuccess){
				return;
			}
			var targetId = $(this).attr('id');
			if($(this).hasClass(targetId+'Click')){
				return;
			}else{
				$(this).addClass(targetId+'Hover')
			}
		}
		function _mouseOutBtn(e){
			if(!_this.initSuccess){
				return;
			}
			var targetId = $(this).attr('id');
			$(this).removeClass(targetId+'Hover');
		}
		function _clickBtn(e){
			if(!_this.initSuccess){
				return;
			}
			var targetId = $(this).attr('id');
			_this.setEditBtnStyle(e);

			if(targetId != 'mosaic'){
				//cursor设为默认
				_this.setCursorAndBtn();
				
				//解绑马赛克
				_this.mosaicAble = false;
				$(_this.canvas).off('mousedown.mosaic');
				
				$('.listIcon').hide();
				$('.options').hide();
			}	

			var editType = _this.currentEditObj.editType;

			if(_this.clipAble){
				if(targetId == 'clip')return;
				if(editType != 'clip'){
					_this.justChangeEditObj('clip');
				}
				_this.applyClipOrNot(targetId);

			}else{
				//如果是没有选中编辑状态或者处于rotate，设置状态并执行一次
				if( editType == ''){
					//初始状态，直接切换
					_this.changeEditType(targetId);
					return;
				}else if(editType=='rotate'){
					if(targetId == 'rotate'){
						_this.rotate();
					}else{
						_this.changeEditType(targetId);
					}
				}else if(editType == 'mosaic'){
					if(targetId == 'mosaic'){
						if(_this.mosaicAble)return;
						_this.mosaic();
					}else{
						_this.changeEditType(targetId);
					}
				}else{
					//clipAble == true已在上面处理，此处若editType==clip都是未初始化clip的状态
					//或者clipAble == submitImage
					_this.changeEditType(targetId);
				}
			}
		}

		//画笔框下拉三角
		$('.listIcon').on('click',function(){
			$('.options').show();
			clickLog('from=pc_photouploading_mosaicpulldown_click');
		});

		//画笔粗细下拉选项绑定
		var lineTypeArr = ['s','m','b'];
		$('.options').on('click','div',function(e){
			var lineWeightClass = $(e.currentTarget).attr('class');
			var lineType = lineWeightClass[0];//mLine[0]
			
			var index = lineTypeArr.indexOf(lineType);
			
			var flag = (lineType=='b')?('l'):(lineType);
			var log = 'from=pc_photouploading_'+flag+'mosaic_click';
			clickLog(log);
			_this.lineWeight = _this.opts.lineWeight[index];
			
			_this.setCursorAndBtn(lineType);
		});

		//撤销按钮功能及其样式
		$(_this.btn.restoreBtn).on('mouseover',function(){
			if($(this).hasClass('restoreDisable')){
				return;
			}else{
				$(this).attr('class','restoreHover');
			}
		}).on('mouseout',function(){
			$(this).removeClass('restoreHover');
		}).on('click',function(){
			if( $(this).hasClass('restoreDisable') ){
				return;
			}
			clickLog('from=pc_photouploading_redo_click');
			var currentEditObj =  _this.currentEditObj;
			var restoreEditType = currentEditObj.editType;
			//第一次切换到撤销先判断当前obj是否有可撤销数据
			if(restoreEditType == 'submitImage' || (restoreEditType == 'clip' && typeof currentEditObj.isAppClip == 'undefined') || (restoreEditType == 'rotate' && typeof currentEditObj.step == 'undefined') || (restoreEditType == 'mosaic' && typeof currentEditObj.track == 'undefined')){
				_this.changeEditObjWhenRestore();
				var restoreEditType = _this.currentEditObj.editType;
			}
			switch(restoreEditType){
				case 'rotate':
					_this.restoreRotate();
					break;
				case 'clip':
					_this.restoreClip();
					break;
				case 'mosaic':
					_this.restoreMosaic();
					break;
				default:
					return;
			}
		});

		//完成按钮
		$(_this.btn.submitBtn).on('click',function(){
			if(!_this.initSuccess){
				return;
			}
			clickLog('from=pc_photouploading_done_click');
			var editType = _this.currentEditObj.editType;
			if(_this.clipAble){
				if(editType != 'clip'){
					_this.justChangeEditObj('clip');
				}
				_this.applyClipOrNot('submitImage');
			}else{
				if(editType == 'submitImage'){
					_this.submitImage();
				}else{
					_this.changeEditType('submitImage');
				}
			}
		});

		$('#btnClose').on('click',function(){
			_this.hideEditFrame();
			clickLog('from=pc_photouploading_close_click');
		});
	},
	/*编辑完成后触发loading效果
	*/
	showLoding:function(item){
		var loadingUrl = item.opts.loadingUrl;
		item.setValue(loadingUrl);
	},
	/**
	 * 禁止滚动，防止mosaic错位，关闭后恢复
	 * @param  {String} allowOrForbid [当前按钮点击事件对象]
	 */
	changeWindowScroll:function(allowOrForbid){
		if(allowOrForbid == 'forbid'){
			$('body').on('mousewheel.editPic',function(ev){
        		return false;
    		}).on('DOMMouseScroll.editPic',function(ev){
        		//fireFox
        		return false;
    		});
	        var top = (document.documentElement.scrollTop||document.body.scrollTop);
	        $(window).on('scroll.editPic',function(ev){
	            $(window).scrollTop(top);
	        });
	    }else if(allowOrForbid == 'allow'){
	    	$('body').off('mousewheel.editPic').off('DOMMouseScroll.editPic');
		    $(window).off('scroll.editPic');
	    }else{
	    	return;
		}
	},
	listenOptionsShow:function(startOrOver){
		if(startOrOver == 'start'){
			$('body').on('click.listenOptions',function(e){

				if( $('.options').css('display') == 'none' ){
					return;
				}

				var target = e.target;
				//点击listIcon
				var flag1 = $(target).hasClass('listIcon');
				var flag2 = $(target).parent().hasClass('listIcon');

				if(!(flag1 || flag2)){
					$('.options').hide();
				}
			});
		}else if(startOrOver == 'over'){
			$('body').off('click.listenOptions');
		}
	},
	/**
	 * 设置编辑按钮样式
	 * @param  {Object} e [当前按钮点击事件对象]
	 */
	setEditBtnStyle:function(e){
		var btnId = $(e.currentTarget).attr('id');

		siblings = $(e.currentTarget).siblings();
		for(var i = 0,len = siblings.length;i < len; i++){
			$(siblings[i]).removeClass($(siblings[i]).attr('id')+'Click');

		}
		if(btnId != 'mosaic'){
			$('#mosaic').attr('class','button1 mosaicDefault');
		}

		$(e.currentTarget).removeClass(btnId+'Hover');
		if(btnId != 'rotate'){
			$(e.currentTarget).addClass(btnId+'Click');
		}
	},
	loadImg:function(src,callback,crossOrigin){
		var img = new Image();
		if(crossOrigin){//原始图片需跨域
			img.crossOrigin = 'anonymous';
		}
		img.onload = callback;
		img.src = src;
	},
	/**
	 * 初始时调节图片适应编辑框，记录原始缩放比
	 */
	initResizeCanvas:function(EVENT_TYPE){
		var _this = this;
		var _callback = function(){

			//隐藏tip
			$(_this.loadingTip).hide();

			//初始化时保存缩放比例用于上传前还原尺寸，小图不放大
			_this.resizeRate = _this.resetCanvas(this.naturalWidth,this.naturalHeight,false);

			var canvas = _this.canvas;
			/*绘制的图片canvas大小保持原图大小 样式通过style控制*/
			//_this.context.drawImage(this,0,0,this.width,this.height,0,0,this.naturalWidth,this.naturalHeight);
			//绘制初始化图片到画布
			_this.context.drawImage(this,0,0,this.width,this.height,0,0,canvas.width,canvas.height);
			//绘制完成初始化当前图片数据
			try{
				// _this.currentApplictImg = 
				_this.currentEditObj.initImg = canvas.toDataURL('image/jpeg',1);
				//保存初始化图片数据到编辑历史中,状态切换中做了
				// _this.editHistory.push({editType:'',initImg:_this.currentApplictImg});
				//初始绘制完成绑定操作
				EVENT_TYPE && $('body').trigger(EVENT_TYPE);
				_this.initSuccess = true;
				$(_this.canvas).show();
			}catch(e){
				_this.hideEditFrame();
				alert('你的浏览器暂不支持图片编辑功能，请升级或使用其他浏览器');
			}

		};

		if(typeof _this.opts.item.imgData4Edit != 'undefined'){
			_this.loadImg(_this.opts.item.imgData4Edit,_callback);
		}else{
			_this.loadImg(_this.opts.url,_callback,true);//跨域图片
		}
		
		_this.sendPvLog();
		if(!_this.hasSendUv){
			_this.sendUvLog();
			_this.hasSendUv = true;
		}
	},
	/**
	 * 根据图片尺寸和编辑框尺寸重设画布大小，返回缩放比率
	 * @param {Number} imgW 新绘制图片宽度
	 * @param {Number} imgH 新绘制图片高度
	 * @param {Boolean}  true 为小图放大，适用于剪切旋转功能
	 * @return {Number}
	 */
	resetCanvas:function(imgW,imgH,flag){
		var _this = this;
		var w = imgW;
		var h = imgH;
		var resizeRate;

		var canvas = _this.canvas;
		var canvasFrame = _this.canvasFrame;
        canvas.width= imgW;
	    canvas.height= imgH;
		//计算长宽比，以比例较大一边为基准缩放图片以适应画布框
		var wRate = w/$(canvasFrame).width();
		var hRate = h/$(canvasFrame).height();
		var _set = function(){
			if(wRate >= hRate){
				resizeRate = wRate;
				//canvas画布宽高通过样式设置 避免放大缩小画布造成的质量损失 by zhangjiajiajia04
				/*canvas.width =  $(canvasFrame).width();
				canvas.height = Math.round( h/resizeRate);*/
				$("#canvas").css("width",$(canvasFrame).width());
				$("#canvas").css("height",Math.round( h/resizeRate));
			}else{
				resizeRate = hRate;
				//canvas.width =  Math.round( w/resizeRate);
				//canvas.height = $(canvasFrame).height();
				$("#canvas").css("width",Math.round( w/resizeRate));
				$("#canvas").css("height",$(canvasFrame).height());
			}
		};

		//大图统一缩小
		if(  (wRate > 1 ) || (hRate > 1) ){
			_set();
		}else{
			if(flag && flag == true){
				//小图放大
				_set();
			}else{
				//小图不放大
				canvas.width =  w;
				canvas.height =  h;
				resizeRate = 1;
			}
		}
		//调节新画布位置使之居中
		_this.resetCanvasPos();
		return resizeRate;
	},
	/**
	 * 调节画布居中
	 */
	resetCanvasPos:function(){
		var canvas = this.canvas;
		var canvasFrame = this.canvasFrame;
		//var widthDis = $(canvasFrame).width() - canvas.width;
		//var heightDis = $(canvasFrame).height() - canvas.height;
		//canvas画布宽高通过样式设置 避免放大缩小画布造成的质量损失 by zhangjiajiajia04
		var widthDis = $(canvasFrame).width() - $(canvas).width();
		var heightDis = $(canvasFrame).height() - $(canvas).height();
		$(canvas).css({'left':parseInt(widthDis/2)+'px','top':parseInt(heightDis/2)+'px'});
		/*iframe下弹窗居中*/
		var inIframe =window.parent.document.getElementById("postFrame");
			 if(inIframe!=null){
			 	var selfWin = $("#editFrame"); 
				 var form_top = ($(top).height()/2)-(selfWin.height()/2)+top.scrollY+150;
				 selfWin.css("top",form_top>143?form_top:320);
				// $(top).scrollTop(0);//滚动条自动向上滚动到顶部
			 }
	},
	/**
	 * 调节图片到原尺寸大小并上传
	 */
	submitImage:function(){
		var _this = this,
			canvas =  _this.canvas,
			resizeRate = _this.resizeRate,
			newImgData = canvas.toDataURL('image/jpeg',1);
			_this.postImage(_this.opts.indexId, newImgData.substring(22), _this.opts.url);
			console.log(_this.editHistory,_this.currentEditObj);
		//若不是原图尺寸，还原大小再传
		/*if(_this.resizeRate != 1){
			var cvs = document.createElement('canvas');
			cvs.width =  parseInt(canvas.width *resizeRate);
			cvs.height =  parseInt(canvas.height * resizeRate);
			var cxt = cvs.getContext('2d');

			var _callback = function(){
				cxt.drawImage(this,0,0,this.width,this.height,0,0,cvs.width,cvs.height);
				newImgData = cvs.toDataURL('image/jpeg',1);
				//必须回调上传
				_this.postImage(_this.opts.indexId, newImgData.substring(22), _this.opts.url);
				console.log(_this.editHistory,_this.currentEditObj);
			};
			_this.loadImg(newImgData,_callback);
		}else{
			//原尺寸直接放大
			_this.postImage(_this.opts.indexId, newImgData.substring(22), _this.opts.url);
			console.log(_this.editHistory,_this.currentEditObj);
		}*/
	},
	/**
	 * 上传图片并重置imgbars中缩略图src,替换imglist中item
	 */
	postImage: function(id, file, fileName) {
		var _this = this;
		var _item = this.opts.item;//闭包缓存编辑的实例,解决上一个图片编辑还没有保存完成又打开另外一个图片编辑时串图问题 byzjj
		/*pic-path:brandads 这个是无损上传*/
		var newData = {
            "Pic-Size":"0*0",
            "Pic-Encoding":"base64",
            "Pic-Path":"/p1/big/",
            "Pic-Data":file.substring(1)
        };
        $.ajax({
			url: "//upload.58cdn.com.cn/json",
            type:'POST',
            data:JSON.stringify(newData),
            processData: false,  // 告诉jQuery不要去处理发送的数据
            success:function(url){
				var imgData4Edit = 'data:image/jpeg;base64'+file;
				var url = "//pic1.58cdn.com.cn/p1/big/" + url;
				_this.successHandler(_item,url);
				_item.imgData4Edit = imgData4Edit;
				imgData4Edit = null;
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
            	_this.errorHandler(XMLHttpRequest.status+'&'+textStatus+'&'+errorThrown);
			}
        });
	},
	/**
	 * 上传成功后根据新url替换缩略图和imglist中url
	 * @param {String} url [上传成功后返回的url]
	 */
	successHandler:function(item,url){
		var _this = this;

		var reg = /.\w+$/;
		var res = reg.exec(url);
		var index = url.indexOf(res);
		url = url.substring(0,index)+'_130_100'+url.substring(index);

		item.setValue(url);

		//销毁dom
		//_this.hideEditFrame(); 
	},
	errorHandler:function(errorMsg){
		var item = this.opts.item;
		//新错误统计埋点
		item.setLog('errorMsg',errorMsg);
        item.sendLog();
		
		alert('上传失败，请重试');
	},
	/**
	 * 旋转函数从currentApplictImg中获取基准图，通过计算当前旋转角度currentDegree直接执行一步到位的循转
	 * 这样可以避免restore时执行多步当次循转耗费性能
	 */
	rotate:function(){
		var _this = this;
		var currentEditObj = _this.currentEditObj;

		clickLog('from=pc_photouploading_xuanzhuan_click');

		//旋转记步，决定restore次数
		if(typeof currentEditObj.step == 'undefined'){
			currentEditObj.step = 0; 
		}
		currentEditObj.step += 1; 

		var _callback = function(){
			var currentDegree = (currentEditObj.step * _this.opts.degree)%360;
			_this.doRotation(this,currentDegree);
			//完成操作启用restore按钮
            $(_this.btn.restoreBtn).removeClass('restoreDisable');
		};
		var src = currentEditObj.initImg;
		_this.loadImg(src,_callback);
	},
	/**
	 * 执行旋转操作
	 * @param {[Image]} img [旋转基准图片]
	 * @param {[Number]} degree [具体旋转度数]
	 */
	doRotation:function(img,degree){
		var _this = this;
		var rads=degree*Math.PI/180;
		var newWidth, newHeight;

		//兼容单步旋转不是90度情况
		var c = Math.cos(rads);
		var s = Math.sin(rads);
		if (s < 0) { s = -s; }
		if (c < 0) { c = -c; }
		newWidth = img.naturalHeight * s + img.naturalWidth * c;
		newHeight = img.naturalHeight * c + img.naturalWidth * s;

		//单步旋转90度可直接长宽互换
		// newWidth = img.naturalHeight;
		// newHeight = img.naturalWidth;

		//根据新的长宽设置适应编辑框大小的canvas尺寸，执行小图放大
		var resetRate = _this.resetCanvas(parseInt(newWidth),parseInt(newHeight),false);

		var canvas = _this.canvas;
		var cx=canvas.width/2;
		var cy=canvas.height/2;

		var context = _this.context;
		context.save();
		context.clearRect(0, 0, canvas.width, canvas.height);
		//移动使旋转基准点变为画布中央
		context.translate(cx, cy);
		context.rotate(rads);

			//canvas基准点被移动到了画布中央，且画布尺寸有缩放，
			//故绘制时应从中心点平移缩放后画布大小的一半到左上角基准点
			//img.naturalWidth在奇偶数倍循转时分别等同于 _this.canvas.height 和_this.canvas.width
		var fromX = -(img.naturalWidth/resetRate/2),
			fromY = -(img.naturalHeight/resetRate/2),
			//若是奇数倍循转，context与canvas垂直，新绘制宽高应canvas宽高互换
			//若是偶数倍循转，context与canvas平行，新绘制宽高就是canvas宽高
			sizeW = (degree/90%2 == 0)?canvas.width:canvas.height,
			sizeH = (degree/90%2 == 0)?canvas.height:canvas.width;
			/*fromX*resetRate,fromY*resetRate
				画布尺寸还原原始大小，所计算出来的参数需要乘上resetRate
			*/
		context.drawImage(img,0,0,img.naturalWidth,img.naturalHeight,fromX*resetRate,fromY*resetRate,sizeW,sizeH);
		_this.resizeRate = resetRate;
		//旋转后撤销context环境，确保接下来的画布操作不会错位
		context.restore();
	},
	/**
	 * 撤销旋转到上一步
	 */
	restoreRotate:function(){
		var _this = this;
		var currentEditObj = _this.currentEditObj;
		
		var restRestoreCount = currentEditObj.step;
		if(restRestoreCount <= 0){
			return;
		}

		restRestoreCount -= 1;
		currentEditObj.step -= 1;

		var _callback =function(){
			var currentDegree = restRestoreCount * _this.opts.degree;

			_this.doRotation(this,currentDegree);
			if(restRestoreCount == 0){
				//若是撤销旋转完成，删除当前的旋转历史数据
				_this.changeEditObjWhenRestore();
			}
			//如果clipFrame显示着，reset
			if( (_this.clipFrame!= '') && ($(_this.clipFrame).css('display')!= 'none') ){
				_this.resetClipFrameWhenRestore();
			}
		};
		_this.loadImg(currentEditObj.initImg,_callback);
	},
	/**
	 * 剪切功能打开
	 * @param {[Function]} method [处理函数]
	 * @param {[Object]} context [执行method的环境对象（执行上下文）]
	 */
	clip:function(){
		var _this = this;

		if(_this.clipAble)return;
		_this.clipAble = true;	
		//若是初次打开裁剪框
		if( _this.clipFrame == ''){
			//生成裁剪框
			var clipFrame = '<div id="clipFrame">'+
								'<div class="toNW"></div>'+
								'<div class="toN"></div>'+
								'<div class="toNE"></div>'+
								'<div class="toE"></div>'+
								'<div class="toSE"></div>'+
								'<div class="toS"></div>'+
								'<div class="toSW"></div>'+
								'<div class="toW"></div>'+
							'</div>';
			$(_this.canvasFrame).append(clipFrame);

			_this.clipFrame = document.getElementById('clipFrame');

		}else{
			$('#clipFrame').show();
		}
		clickLog('pc_photouploading_cut_click');
		_this.clipOpenTime = (new Date()).getTime();

		//先初始化框再去绑定，绑定中要获取初始信息
		var pos = _this.initClipFramePos();

		_this.bindResetClipFrame();
	},
	/**
	 * 每次切换功能时调整剪切框位置居中
	 */
	initClipFramePos:function(){
		var _this = this;
		var canvas = $(_this.canvas);

		var clipLeft = parseInt(canvas.position().left),
			clipTop = parseInt(canvas.position().top),
			clipWidth = parseInt(canvas.width()-2),
			clipHeight = parseInt(canvas.height()-2);

		$(_this.clipFrame).css({'left':clipLeft+'px','top':clipTop+'px','width':clipWidth+'px','height':clipHeight+'px'});

		_this.resetKeyPoint();

		return [clipLeft,clipTop,clipWidth,clipHeight];
	},
	/**
	 * 每次撤销循转时判断剪切框是否需调整
	 */
	resetClipFrameWhenRestore:function(){
		var _this = this;
		var canvas = $(_this.canvas);
		var clipFrame = $(_this.clipFrame);

		var clipLeft = clipFrame.position().left,
			clipTop = clipFrame.position().top,
			clipWidth = clipFrame.width(),
			clipHeight = clipFrame.height();

		var canvasLeft = canvas.position().left,
			canvasTop = canvas.position().top,
			canvasWidth = canvas.width(),
			canvasHeight = canvas.height();

		//左边界
		(clipLeft < canvasLeft)&&( clipFrame.css({'left':canvasLeft+'px','width':clipWidth - (canvasLeft - clipLeft)+'px'}) );

		//右边界
		((clipLeft + clipWidth) > (canvasLeft + canvasWidth -2))&&( clipFrame.css({'width':clipFrame.width() - ( (clipLeft + clipWidth) - (canvasLeft + canvasWidth -2) ) +'px'}) );
		
		//上边界
		(clipTop < canvasTop)&&( clipFrame.css({'top':canvasTop+'px','height':clipHeight - (canvasTop - clipTop)+'px'}) );
		
		//下边界
		((clipTop + clipHeight) > (canvasTop + canvasHeight -2))&&( clipFrame.css({'height':clipFrame.height() - ((clipTop + clipHeight) - (canvasTop + canvasHeight -2)) +'px'}) );
		
		_this.resetKeyPoint();
	},
	isFullClipFrame:function(){
		var wClipFrame = $(this.clipFrame).width(),
			hClipFrame = $(this.clipFrame).height(),

			wCanvas = $(this.canvas).width(),
			hCanvas = $(this.canvas).height();

		return (wClipFrame+2 >= wCanvas && hClipFrame+2 >= hCanvas);
	},
	/**
	 * 打开剪切框时保存mouseMove中用到的数据
	 */
	setClipAndCanvasInfo:function(){
		var _this = this;
		var parentBox = $(_this.canvas);
		var clipFrame = $(_this.clipFrame);

		_this.clipAndCanvasInfo = {
			canvasLeft : parentBox.offset().left,
        	canvasTop : parentBox.offset().top,
        	canvasWidth : parentBox.width(),
        	canvasHeight :parentBox.height(),
        	clipLeft : clipFrame.offset().left,
        	clipTop : clipFrame.offset().top,
        	clipWidth : clipFrame.width(),
        	clipHeight : clipFrame.height()
		};
	},
	/**
	 * 绑定剪切框移动，resize等事件
	 */
	bindResetClipFrame:function(){
        var isMouseDown = false;
        var isResize = false;
        var minDis = 2;//边框吸附距离px
        var minClipFrameSize = 25;//裁剪框最小尺寸

        var distanceX,
            distanceY,
            resizeStyle,
            clipAndCanvasInfo;

        var _this = this;
        var clipFrame = $(_this.clipFrame);

        //初始化resize 关键点位置
        _this.resetKeyPoint();

        /**
		 *剪切框各方向缩放
		 */
        var _resizeClipFrame = {
			toNW:function(e){
		        var oldOffset = clipFrame.offset(),
		        	//鼠标在横纵方向移动距离
        			mouseMoveDisX = _this.oldMousePos[0] - e.clientX,
        			mouseMoveDisY = _this.oldMousePos[1] - e.clientY,
        			//根据鼠标移动距离和上一个clipFrame信息计算得到新信息
		        	left = oldOffset.left - mouseMoveDisX,
		        	top = oldOffset.top - mouseMoveDisY,
		        	width = clipFrame.width() + mouseMoveDisX,
		        	height = clipFrame.height() + mouseMoveDisY;

		        if(oldOffset.left - mouseMoveDisX - minDis < _this.clipAndCanvasInfo.canvasLeft){
		        	left = _this.clipAndCanvasInfo.canvasLeft;
		        	width = clipFrame.width() + (oldOffset.left - _this.clipAndCanvasInfo.canvasLeft);
		        }
		        if(oldOffset.top - mouseMoveDisY - minDis < _this.clipAndCanvasInfo.canvasTop){
		        	top = _this.clipAndCanvasInfo.canvasTop;
		        	height = clipFrame.height() + (oldOffset.top - _this.clipAndCanvasInfo.canvasTop);
		        }
		        
		        //未到左边界或者到了左边界往右拉伸
		        if((oldOffset.left != _this.clipAndCanvasInfo.canvasLeft || (e.clientX - _this.oldMousePos[0] )>0) && (width > minClipFrameSize)){
		        	clipFrame.width(width);
		        	clipFrame.offset({'left':left});
		        }
		        //未到上边界或者到了上边界往下拉伸
		        if((oldOffset.top != _this.clipAndCanvasInfo.canvasTop || (e.clientY -_this.oldMousePos[1]) >0) && (height > minClipFrameSize)){
		        	clipFrame.height(height);
		        	clipFrame.offset({'top':top});
		        }

	            _this.oldMousePos = [e.clientX,e.clientY];

			},
	        toN: function(e){
	        	var oldOffset = clipFrame.offset(),
		    		mouseMoveDisY = _this.oldMousePos[1] - e.clientY,
		    		top = oldOffset.top - mouseMoveDisY,
		    		height = clipFrame.height() + mouseMoveDisY;
		        
		        if(clipFrame.offset().top - mouseMoveDisY - minDis < _this.clipAndCanvasInfo.canvasTop){
		        	top = _this.clipAndCanvasInfo.canvasTop;
	        		height = clipFrame.height() + (oldOffset.top - _this.clipAndCanvasInfo.canvasTop);
		        }

		        if((oldOffset.top != _this.clipAndCanvasInfo.canvasTop || (e.clientY -_this.oldMousePos[1]) >0) &&(height > minClipFrameSize) ){
			        clipFrame.height(height);
		            clipFrame.offset({'top':top});
		        }	     
	            _this.oldMousePos = [e.clientX,e.clientY];
		    },
	        toNE: function(e){
	        	var oldOffset = clipFrame.offset(),
		        	//鼠标在横纵方向移动距离
        			mouseMoveDisX = _this.oldMousePos[0] - e.clientX,
        			mouseMoveDisY = _this.oldMousePos[1] - e.clientY,
        			//根据鼠标移动距离和上一个clipFrame信息计算得到新信息
		        	top = oldOffset.top - mouseMoveDisY,
		        	width = clipFrame.width() - mouseMoveDisX,
		        	height = clipFrame.height() + mouseMoveDisY;

		        if(oldOffset.left +clipFrame.width() - mouseMoveDisX + minDis > ( _this.clipAndCanvasInfo.canvasLeft+ _this.clipAndCanvasInfo.canvasWidth)){
		        	width = ( _this.clipAndCanvasInfo.canvasLeft+ _this.clipAndCanvasInfo.canvasWidth) - oldOffset.left -2;
		        }
		        if(oldOffset.top - mouseMoveDisY - minDis < _this.clipAndCanvasInfo.canvasTop){
		        	top = _this.clipAndCanvasInfo.canvasTop;
		        	height = clipFrame.height() + (oldOffset.top - _this.clipAndCanvasInfo.canvasTop);
		        }
		        
		        //未到右边界或者到了右边界往左拉伸
		        if(((oldOffset.left + clipFrame.width())!= ( _this.clipAndCanvasInfo.canvasLeft+ _this.clipAndCanvasInfo.canvasWidth - 2) || (e.clientX - _this.oldMousePos[0] )<0) &&(width > minClipFrameSize) ){
		        	clipFrame.width(width);
		        }
		        //未到上边界或者到了上边界往下拉伸
		        if((oldOffset.top != _this.clipAndCanvasInfo.canvasTop || (e.clientY -_this.oldMousePos[1]) >0)&&(height>minClipFrameSize)){
		        	clipFrame.height(height);
		        	clipFrame.offset({'top':top});
		        }

	            _this.oldMousePos = [e.clientX,e.clientY];

	        },
	        toE: function(e){
	            var oldOffset = clipFrame.offset(),
		        	//鼠标在横纵方向移动距离
        			mouseMoveDisX = _this.oldMousePos[0] - e.clientX,
		        	width = clipFrame.width() - mouseMoveDisX;

		        if(oldOffset.left +clipFrame.width() - mouseMoveDisX + minDis > ( _this.clipAndCanvasInfo.canvasLeft+ _this.clipAndCanvasInfo.canvasWidth)){
		        	width = ( _this.clipAndCanvasInfo.canvasLeft+ _this.clipAndCanvasInfo.canvasWidth) - oldOffset.left -2;
		        }
		        
		        //未到右边界或者到了右边界往左拉伸
		        if(((oldOffset.left + clipFrame.width())!= ( _this.clipAndCanvasInfo.canvasLeft+ _this.clipAndCanvasInfo.canvasWidth - 2) || (e.clientX - _this.oldMousePos[0] )<0) &&(width > minClipFrameSize) ){
		        	clipFrame.width(width);
		        }

	            _this.oldMousePos = [e.clientX,e.clientY];
	        },
	        toSE: function(e){
	            var oldOffset = clipFrame.offset(),
		        	//鼠标在横纵方向移动距离
        			mouseMoveDisX = _this.oldMousePos[0] - e.clientX,
        			mouseMoveDisY = _this.oldMousePos[1] - e.clientY,
        			//根据鼠标移动距离和上一个clipFrame信息计算得到新信息
		        	width = clipFrame.width() - mouseMoveDisX,
		        	height = clipFrame.height() - mouseMoveDisY;

	        	if(oldOffset.left +clipFrame.width() -mouseMoveDisX + minDis > ( _this.clipAndCanvasInfo.canvasLeft+ _this.clipAndCanvasInfo.canvasWidth)){
		        	width = ( _this.clipAndCanvasInfo.canvasLeft+ _this.clipAndCanvasInfo.canvasWidth) - oldOffset.left -2;
		        }
		        if(oldOffset.top + clipFrame.height() - mouseMoveDisY+minDis > ( _this.clipAndCanvasInfo.canvasTop+ _this.clipAndCanvasInfo.canvasHeight)){
		        	height = ( _this.clipAndCanvasInfo.canvasTop+ _this.clipAndCanvasInfo.canvasHeight) - oldOffset.top - 2;
		        }
		        
		        //未到右边界或者到了右边界往左拉伸
		        if(((oldOffset.left + clipFrame.width())!= ( _this.clipAndCanvasInfo.canvasLeft+ _this.clipAndCanvasInfo.canvasWidth - 2) || (e.clientX - _this.oldMousePos[0] )<0) &&(width > minClipFrameSize) ){
		        	clipFrame.width(width);
		        }
		        if(((oldOffset.top + clipFrame.height())!= ( _this.clipAndCanvasInfo.canvasTop+ _this.clipAndCanvasInfo.canvasHeight - 2) || (e.clientY - _this.oldMousePos[1] )<0) &&(height > minClipFrameSize) ){
		        	clipFrame.height(height);
		        }
	            _this.oldMousePos = [e.clientX,e.clientY];
	        },
	        toS: function(e){
	            var oldOffset = clipFrame.offset(),
		        	//鼠标在横纵方向移动距离
        			mouseMoveDisY = _this.oldMousePos[1] - e.clientY,
        			//根据鼠标移动距离和上一个clipFrame信息计算得到新信息
		        	height = clipFrame.height() - mouseMoveDisY;

		        if(oldOffset.top + clipFrame.height() - mouseMoveDisY+minDis > ( _this.clipAndCanvasInfo.canvasTop+ _this.clipAndCanvasInfo.canvasHeight)){
		        	height = ( _this.clipAndCanvasInfo.canvasTop+ _this.clipAndCanvasInfo.canvasHeight) - oldOffset.top - 2;
		        }
		        
		        if(((oldOffset.top + clipFrame.height())!= ( _this.clipAndCanvasInfo.canvasTop+ _this.clipAndCanvasInfo.canvasHeight - 2) || (e.clientY - _this.oldMousePos[1] )<0) &&(height > minClipFrameSize) ){
		        	clipFrame.height(height);
		        }
	            _this.oldMousePos = [e.clientX,e.clientY];
	        },
	        toSW: function(e){
	            var oldOffset = clipFrame.offset(),
		        	//鼠标在横纵方向移动距离
        			mouseMoveDisX = _this.oldMousePos[0] - e.clientX,
        			mouseMoveDisY = _this.oldMousePos[1] - e.clientY,
        			//根据鼠标移动距离和上一个clipFrame信息计算得到新信息
		        	left = oldOffset.left - mouseMoveDisX,
			        width = clipFrame.width() + mouseMoveDisX;
			        height = clipFrame.height() - mouseMoveDisY;

	        	if(oldOffset.left - mouseMoveDisX - minDis < _this.clipAndCanvasInfo.canvasLeft){
		        	left = _this.clipAndCanvasInfo.canvasLeft;
		        	width = clipFrame.width() + (oldOffset.left -  _this.clipAndCanvasInfo.canvasLeft);
		        }
		        if(oldOffset.top + clipFrame.height() - mouseMoveDisY+minDis > ( _this.clipAndCanvasInfo.canvasTop+ _this.clipAndCanvasInfo.canvasHeight)){
		        	height = ( _this.clipAndCanvasInfo.canvasTop+ _this.clipAndCanvasInfo.canvasHeight) - oldOffset.top - 2;
		        }
		        //到达左边界
		        if( (oldOffset.left != _this.clipAndCanvasInfo.canvasLeft || (e.clientX - _this.oldMousePos[0] )>0)&&(width > minClipFrameSize) ){
		        	clipFrame.width(width);
	            	clipFrame.offset({'left':left});
		        }
		        if(((oldOffset.top + clipFrame.height())!= ( _this.clipAndCanvasInfo.canvasTop+ _this.clipAndCanvasInfo.canvasHeight - 2) || (e.clientY - _this.oldMousePos[1] )<0) &&(height > minClipFrameSize) ){
		        	clipFrame.height(height);
		        }
	            _this.oldMousePos = [e.clientX,e.clientY];		        
	        },
	        toW: function(e){
	        	var oldOffset = clipFrame.offset(),
					mouseMoveDisX = _this.oldMousePos[0] - e.clientX,
			       	left = oldOffset.left - mouseMoveDisX,
			        width = clipFrame.width() + mouseMoveDisX;

		        if(oldOffset.left - mouseMoveDisX - minDis < _this.clipAndCanvasInfo.canvasLeft){
		        	left = _this.clipAndCanvasInfo.canvasLeft;
		        	width = clipFrame.width() + (oldOffset.left -  _this.clipAndCanvasInfo.canvasLeft);
		        }

		        //到达左边界
		        if( (oldOffset.left != _this.clipAndCanvasInfo.canvasLeft || (e.clientX - _this.oldMousePos[0] )>0)&&(width > minClipFrameSize) ){
		        	clipFrame.width(width);
	            	clipFrame.offset({'left':left});
		        }		        

	            _this.oldMousePos = [e.clientX,e.clientY];
			}
		};

		clipFrame.off('mousedown.clip');
        //为裁剪框绑定move和resize过程
        clipFrame.on('mousedown.clip',function(e){
            distanceX = e.clientX - $(this).offset().left;
            distanceY = e.clientY - $(this).offset().top;
            _this.oldMousePos =  [e.clientX,e.clientY];
            isMouseDown = true;

            //每次重获最新数据并保存，避免move时重复计算
            _this.setClipAndCanvasInfo();

            if($(e.target).attr('id') != 'clipFrame'){
            	//点击resize关键点
                isResize = true;
                resizeStyle = $(e.target).attr('class');
                $(e.target).css({'background-color':'#ED6D06','border':0});
                var cursorStyle = $(e.target).css('cursor');
                $('body').css('cursor',cursorStyle);
            }else{
            	//点击可移动区域
                $('body').css('cursor','move');
                isResize = false;
            }

            $(document).on('mousemove',_docMouseMoveHandler);
	        $(document).on('mouseup',_docMouseUpHandler);
        });

        //定义document事件处理函数
        function _docMouseMoveHandler(e){
    		if(isMouseDown){
                if( !isResize ){
                    _move(e);
                }else{
                	//根据点击点class调用相应尺寸调节方式
                	var clipAndCanvasInfo = _this.clipAndCanvasInfo;
                    _resizeClipFrame[resizeStyle](e);
                    _this.resetKeyPoint();
                }
            }
            return false;
        }
        function _docMouseUpHandler(e){
        	$(document).off('mousemove',_docMouseMoveHandler);
        	$(document).off('mouseup',_docMouseUpHandler);

    		isMouseDown = false;
            //保存剪切框位置restore备用
            $('body').css('cursor','default');				
            $(_this.clipFrame).find('div').css({'background-color':'','border':'1px solid white'});
        }
        //clipFrame移动
        function _move(e){
        	var left = e.clientX - distanceX,
        		top = e.clientY - distanceY;
        	var clipAndCanvasInfo = _this.clipAndCanvasInfo;

        	//左边界
            if( (e.clientX - distanceX - minDis) <=  clipAndCanvasInfo.canvasLeft ){
            	left = clipAndCanvasInfo.canvasLeft;
            }
            //右边界 注意加上2px border
            if( (e.clientX - distanceX + minDis ) >= (clipAndCanvasInfo.canvasLeft + clipAndCanvasInfo.canvasWidth - clipAndCanvasInfo.clipWidth -2 ) ){
            	left = clipAndCanvasInfo.canvasLeft + clipAndCanvasInfo.canvasWidth - clipAndCanvasInfo.clipWidth -2;
            }
            //上边界
            if( (e.clientY - distanceY - minDis) <= clipAndCanvasInfo.canvasTop ){
            	top = clipAndCanvasInfo.canvasTop;
            }
            //下边界
            if( (e.clientY - distanceY + minDis ) >= (clipAndCanvasInfo.canvasTop + clipAndCanvasInfo.canvasHeight - clipAndCanvasInfo.clipHeight -2 ) ){
            	top = clipAndCanvasInfo.canvasTop + clipAndCanvasInfo.canvasHeight - clipAndCanvasInfo.clipHeight -2;
            }
            clipFrame.offset({'left':left,'top':top});
        };
	},
    /**
	 * mousemove时设置resize点击点位置
	 */
    resetKeyPoint:function(){
    	var clipFrame = $(this.clipFrame);
        var w = clipFrame.width();
        var h = clipFrame.height();
        $('.toN').css('left',w/2-4);
        $('.toE').css('top',h/2-4);
        $('.toS').css('left',w/2-4);
        $('.toW').css('top',h/2-4);
    },
    /**
	 * 根据剪切框位置和尺寸确定画布剪切坐标信息
	 * @param {[String]} EVENT_TYPE [回调中触发的事件]
	 */
	computeRectAndClip:function(nextEditType){
		var _this = this;
		var canvas = $(_this.canvas);
	    var clipDom = _this.clipFrame?$(_this.clipFrame) : $('#clipFrame');//_this.clipFrame有时为空，但dom还在，暂时未找到逻辑漏洞

		var w = clipDom.width(),
			h = clipDom.height();
		var	posX = clipDom.offset().left - canvas.offset().left,
			posY = clipDom.offset().top - canvas.offset().top;

		_this.doClips(_this.currentEditObj.initImg,[posX,posY,w,h],nextEditType);
		_this.currentEditObj.isAppClip = true;
	},
	/**
	 * 选取编辑框内容重绘画布
	 * @param {[Image]} img [基准图]
	 * @param {[Array]} posArr [需剪切的位置和长宽等数据]
	 * @param {[String]} EVENT_TYPE [回调中触发的事件]
	 */
	doClips:function(img,posArr,nextEditType){
		//得出剪辑坐标，剪辑框长宽比
		//放大剪辑框里面图片
		var _this = this;
		var canvas = _this.canvas;
		/*剪切之前还原原始比例*/
		posArr[0] = posArr[0]*this.resizeRate;
		posArr[1] = posArr[1]*this.resizeRate;
		posArr[2] = posArr[2]*this.resizeRate;
		posArr[3] = posArr[3]*this.resizeRate;
		//剪切后放大
		_this.resetCanvas(posArr[2],posArr[3],true);

		var context = _this.context;
		var _callback = function(){

			context.drawImage(this,posArr[0],posArr[1],posArr[2],posArr[3],0,0,canvas.width,canvas.height);

			_this.hideClipFrame();

			nextEditType && _this.changeEditType(nextEditType,true);
			
			$(_this.btn.restoreBtn).removeClass('restoreDisable');

			_this.clipCompleteTime = (new Date()).getTime();
			clickLog('pc_photouploading_edit_cliptime='+(_this.clipCompleteTime-_this.clipOpenTime));
			
		};
		_this.loadImg(img,_callback);
	},
	/**
	 * 裁剪都为单步记数
	 */
	restoreClip:function(){
		var _this = this;

		var _callback = function(){
			_this.resetCanvas(this.naturalWidth,this.naturalHeight,true);
			_this.context.drawImage(this,0,0);
			_this.changeEditObjWhenRestore();
		}
		_this.loadImg(_this.currentEditObj.initImg,_callback);
	},
	/**
	 * 初始化马赛克功能
	 */
	mosaic:function(){
		var _this = this;

        var canvas = _this.canvas;
        var context = _this.context;
        var isMouseDown =false;

        _this.setCursorAndBtn('m');//默认鼠标样式中号大小
        _this.lineWeight = _this.opts.lineWeight[1];
		$('.listIcon').show();

        clickLog('pc_photouploading_mosaic_click');

 		$(canvas).off('mousedown.mosaic');
 
 		_this.mosaicAble = true;

        $(canvas).on('mousedown.mosaic',function(e){
        	if(!_this.mosaicAble){
        		return;
        	}
        	
        	if(_this.currentEditObj.editType != 'mosaic'){
        		//无按钮切换直接画mosaic
        		_this.justChangeEditObj('mosaic');
        	}
        	var currentEditObj = _this.currentEditObj;
            isMouseDown = true;
            
            var currentTrack = [];//保存当前绘制路径中的各点
            var canvasPos = $(canvas).offset();

	        var x = e.clientX - (canvasPos.left - (document.documentElement.scrollLeft||document.body.scrollLeft));
	        var y = e.clientY - (canvasPos.top - (document.documentElement.scrollTop||document.body.scrollTop));

	        var resPoint = _this.drawMosaic([x,y]);
            currentTrack.push(resPoint);

            var lineWeight = _this.lineWeight;
            $(canvas).on('mousemove.mosaic',function(e){
	            if(!isMouseDown)return;

			    var x = e.clientX - (canvasPos.left - (document.documentElement.scrollLeft||document.body.scrollLeft));
        		var y = e.clientY - (canvasPos.top - (document.documentElement.scrollTop||document.body.scrollTop));

                var len = currentTrack.length;
                //在同一马赛克块则不保存此点
                if((Math.floor(x/lineWeight) == Math.floor(currentTrack[len-1][0]/lineWeight)) && (Math.floor(y/lineWeight) == Math.floor(currentTrack[len-1][1]/lineWeight))){
                    return;
                }

                var resPoint = _this.drawMosaic([x,y]);
        		currentTrack.push(resPoint);
	        });
	        $(document).on('mouseup.mosaic',function(){
	        	$(canvas).off('mousemove.mosaic');
	            $(document).off('mouseup.mosaic');
	           	isMouseDown = false;

	           	//绘制完成一条路径则保存在历史轨迹中撤销时备用
	           	if(typeof currentEditObj.track == 'undefined')currentEditObj.track = [];
	            currentEditObj.track.push(currentTrack);

	            $(_this.btn.restoreBtn).removeClass('restoreDisable');
	        });

        });
	},
	/**
	 * 根据参数点位置绘制马赛克块并报获取到的颜色信息更新在history中，撤销时不需再计算
	 */
	drawMosaic:function(point){
		var canvas = this.canvas;
		var context = this.context;
		// var currentTrack = this.currentTrack;

		/*var w = canvas.width;
        var h = canvas.height;*/
        var w = $(canvas).width();
        var h = $(canvas).height();

        //若是新绘制则计算该马赛克块的坐标等信息
        if( typeof point[2] == 'undefined'){//不是撤销重画
        	var lineWeight = this.lineWeight;
        	//赛克块横纵坐标
            var rectX = Math.floor(point[0]/lineWeight)*lineWeight;
            var rectY = Math.floor(point[1]/lineWeight)*lineWeight;
            //取鼠标位置颜色
            var data = context.getImageData(this.resizeRate*point[0],this.resizeRate*point[1],1,1).data;/*要根据放大的比例还原鼠标位置点*/
            var fillStyle = 'rgba(' + data[0] +','+ data[1] +','+ data[2] +','+ data[3] + ')';
            point[2] = fillStyle;
            point[3] = rectX;
            point[4] = rectY;
            point[5] = (w > (rectX + lineWeight))?lineWeight:(w-rectX);
            point[6] = (h > (rectY + lineWeight))?lineWeight:(h-rectY);

            // currentTrack[currentTrack.length - 1] = point;

        }
        //撤销图片时不需再计算;
        context.fillStyle = point[2];
        //context.fillStyle = 'black';//测试，记得注释掉
        /*重绘时坐标比例要放大到原图比例*/
        context.fillRect(this.resizeRate*point[3]+point[5],this.resizeRate*point[4]+point[6],this.resizeRate*point[5],this.resizeRate*point[6]);

        //返回数据保存在历史记录中下次撤销操作不再获取颜色值
        return point;
	},
	/**
	 * 根据historyMosaicTrack，以currentApplicationImg为基准撤销马赛克笔迹
	 */
	restoreMosaic:function(){
		var _this = this;

		var currentEditObj = _this.currentEditObj;
		var restRestoreCount = currentEditObj.track.length;
		if(restRestoreCount <= 0){
			return;
		}

		restRestoreCount -= 1;
		currentEditObj.track.pop();

		var _callback = function(){
			_this.context.drawImage(this,0,0);
			_this.reDrawMosaic();
			if(restRestoreCount == 0){
				//若是撤销旋转完成，删除当前的旋转历史数据
				_this.changeEditObjWhenRestore();
			}
		}
		_this.loadImg(currentEditObj.initImg,_callback);
	},
	/**
	 * 遍历historyMosaicTrack中各点信息重绘马赛克到上一步
	 */
	reDrawMosaic:function(){
		var historyMosaicTrack = this.currentEditObj.track;
		var restRestoreCount = historyMosaicTrack.length;
		

		for(var i = 0; i < restRestoreCount; i++ ){
            for(var j = 0,len = historyMosaicTrack[i].length;j < len;j++){
                this.drawMosaic(historyMosaicTrack[i][j]);
            }
        }
	},
	/**
	 * 马赛克鼠标样式
	 * @param  {String} lineType [画笔粗细类型]
	 */
	setCursorAndBtn:function(lineType){
	 	var _this = this;

	 	var imgLoc = '//img.58cdn.com.cn/ui7/post/pc/imgs/';
	 	var style = $(_this.canvas).attr('style');
	 	var reg = /cursor:.+pointer;/;

	 	//置为默认
	 	if( !lineType ){
	 		style = style.replace(reg,'');
	 		$(_this.canvas).attr('style',style);
	 		return;
	 	}

        var cursorIcon = 'cursor:url('+imgLoc+lineType+'CursorIco.ico'+'),pointer;';
        style = (style?(style+';'):(''))+cursorIcon;
        $(_this.canvas).attr('style',style);

        //选中options按钮
        _this.setSelectedLine(lineType);
        
        //mosaic按钮样式
        var newLine = 'mosaic'+lineType.toUpperCase()+'Line';//mosaicMLine
        $('#mosaic').attr('class','button1 mosaicClick '+newLine);
	},
	setSelectedLine:function(lineType){
		$('.options').children('div').removeClass('selectedLine');
		$('.options').children('.'+lineType+'Line').addClass('selectedLine');
	},
	/**
	 * 改变当前编辑数据，不执行下一步操作，用于mosaic 和 clip等初始化和执行操作是两个过程的编辑，防止重复绑定
	 */
	justChangeEditObj:function(nextEditType){
		var _this = this;
		_this.storageEditHistory(nextEditType);
	},
	/**
	 * 改变当前编辑数据，并执行下一步操作
	 */
	changeEditType:function(nextEditType){
		var _this = this;
		_this.storageEditHistory(nextEditType);
		if(nextEditType=="submitImage"){
			//提高编辑图片质量后完成保存原图时间较长 添加loading
			/*打马赛克和旋转 剪切后直接隐藏画布*/
			var item = _this.opts.item;
			_this.hideEditFrame();
			_this.showLoding(item);
		}
		_this[nextEditType]();
	},
	/**
	 * 保存当前编辑数据并切换编辑数据类型
	 */
	storageEditHistory:function(nextEditType){
		var _this = this;
		//复制要push的对象currentEditObj不能再指向currentHistoryObj
		var currentEditObj = $.extend(true,{},_this.currentEditObj);
		var editType = currentEditObj.editType;

		switch(editType){
			case '':
				//type为空时数据为初始化数据，需保存
				_this.editHistory.push(currentEditObj);
				
				//保存完跟新currentHistoryObj
				_upDateCurEditObj();
				break;
			case 'rotate':
				var currentRotateCount = (typeof currentEditObj.step!='undefined')?(currentEditObj.step):0;
				
				//如果确实执行了doRotate,保存数据restore使用
				if(currentRotateCount != 0){
					_this.editHistory.push(currentEditObj);
				}
				
				_upDateCurEditObj();
				break;
			case 'mosaic':
				var currentMosaicTrack = (typeof currentEditObj.track!='undefined')?(currentEditObj.track):([]);
				
				if(currentMosaicTrack.length != 0){
					_this.editHistory.push(currentEditObj);
				}
				
				_upDateCurEditObj();
				break;
			case 'clip':
				if(typeof currentEditObj.isAppClip != 'undefined' && currentEditObj.isAppClip == true){
					_this.editHistory.push(currentEditObj);
				}
				
				_upDateCurEditObj();
				break;
			case 'submitImage':
				//submit状态只是过渡状态，不需保存
				_upDateCurEditObj();
				break;
		}

		//切换编辑obj到下一个编辑类型
		function _upDateCurEditObj(){
			_this.currentEditObj = {};
			_this.currentEditObj.editType = nextEditType;
			_this.currentEditObj.initImg = _this.canvas.toDataURL('image/jpeg',1);
		}
	},
	changeEditObjWhenRestore:function(){
		var _this = this;

		var hislength =  _this.editHistory.length;
		
		if(hislength <= 1){
			//禁用
			$(_this.btn.restoreBtn).addClass('restoreDisable');
		}
		_this.currentEditObj = $.extend(true,{},_this.editHistory[hislength-1]);
		_this.editHistory.pop();
	},
	enableAllBtn:function(){
		var allBtn = this.btn;
		for(var index in allBtn){
			$(allBtn[index]).removeClass('edit_disabled_btn');
		}
	},
	disableAllBtn:function(){
		var allBtn = this.btn;
		for(var index in allBtn){
			$(allBtn[index]).addClass('edit_disabled_btn');
		}
	},
	/**
	 * 弹框提示是否保存
	 * @param {[String]} EVENT_TYPE [回调中触发的事件]
	 */
	applyClipOrNot:function(nextEditType){
		var _this = this;

		//裁剪框，马赛克解绑
		$(_this.clipFrame).off('mousedown');

		//禁用功能操作按钮
		_this.disableAllBtn();

		if($('#dialog4MakeSure').length != 0){
			$('#shade4MakeSure').show();
			$('#dialog4MakeSure').show();
		}else{
			var shade4Confirm = '<div id="shade4MakeSure">'+
								'</div>'+
								'<div id="dialog4MakeSure">'+
									'<span>是否应用当前修改?</span><br>'+
									'<input type="button" class="application" value="应用">'+
									'<input type="button" class="giveUp" value="放弃">'+
								'</div>';

			$(_this.editFrame).append(shade4Confirm);
		}
		$('#dialog4MakeSure input').off('click.makeSure');
		$('#dialog4MakeSure input').on('click.makeSure',function(e){
			if($(e.target).attr('value') == '应用' ){
				_this.computeRectAndClip(nextEditType);
				
				clickLog('from=pc_photouploading_use_click');
			}else{
			//放弃裁剪
				_this.changeEditType(nextEditType);
				_this.hideClipFrame();
				clickLog('from=pc_photouploading_giveup_click');	
			}
			_this.hideMakeSureFrame();
		});
	},
	hideMakeSureFrame:function(){
		$('#shade4MakeSure').hide();
		$('#dialog4MakeSure').hide();
		this.enableAllBtn();
	},
	hideClipFrame:function(){
		this.clipAble = false;
		$('#clipFrame').hide();
	},
	hideEditFrame:function(){
		var _this = this;

		$(_this.canvas).hide();
		//销毁编辑框和实例对象
		$('#shadeFrame').hide();
		$('#editFrame').hide();

		_this.hideMakeSureFrame();

		_this.hideClipFrame();

		$('.options').hide();
		$('.listIcon').hide();

		_this.setCursorAndBtn();
		$('body').off('selectstart');
		_this.listenOptionsShow('over');
		_this.changeWindowScroll('allow');
	},
	sendUvLog:function(){
		clickLog('from=pc_photouploading_edit_uv');
	},
	sendPvLog:function(){
		clickLog('from=pc_photouploading_edit_pv');
	}
};
return EditPic;

});

/*
 * HTML5 Sortable jQuery Plugin
 * http://farhadi.ir/projects/html5sortable
 * 
 * Copyright 2012, Ali Farhadi
 * Released under the MIT license.
 */
define('libs/jquery.sortable',[],function(){
	(function($) {
	var dragging, placeholders = $();
	$.fn.sortable = function(options) {
		options = options || {};
		return this.each(function() {
			if (/^enable|disable|destroy$/.test(options)) {
				var items = $(this).children($(this).data('items')).attr('draggable', options == 'enable');
				options == 'destroy' &&	items.add(this)
					.removeData('connectWith').removeData('items')
					.unbind('dragstart.h5s dragend.h5s selectstart.h5s dragover.h5s dragenter.h5s drop.h5s');
				return;
			}
			var index, items = $(this).children(options.items), connectWith = options.connectWith || false;
			var placeholder = $('<' + items[0].tagName + ' class="sortable-placeholder">');
			var handle = options.handle, isHandle;
			items.find(handle).mousedown(function() {
				isHandle = true;
			}).mouseup(function() {
				isHandle = false;
			});
			$(this).data('items', options.items)
			placeholders = placeholders.add(placeholder);
			if (connectWith) {
				$(connectWith).add(this).data('connectWith', connectWith);
			}
			items.attr('draggable', 'true').bind('dragstart.h5s', function(e) {
				if (handle && !isHandle) {
					return false;
				}
				isHandle = false;
				var dt = e.originalEvent.dataTransfer;
				dt.effectAllowed = 'move';
				dt.setData('Text', 'dummy');
				dragging = $(this).addClass('sortable-dragging');
				index = dragging.index();
			}).bind('dragend.h5s', function() {
				dragging.removeClass('sortable-dragging').fadeIn();
				placeholders.detach();
				if (index != dragging.index()) {
					items.parent().trigger('sortupdate');
				}
				dragging = null;
			}).not('a[href], img').bind('selectstart.h5s', function() {
				this.dragDrop && this.dragDrop();
				return false;
			}).end().add([this, placeholder]).bind('dragover.h5s dragenter.h5s drop.h5s', function(e) {
				if (!items.is(dragging) && connectWith !== $(dragging).parent().data('connectWith')) {
					return true;
				}
				if (e.type == 'drop') {
					e.stopPropagation();
					placeholders.filter(':visible').after(dragging);
					return false;
				}
				e.preventDefault();
				e.originalEvent.dataTransfer.dropEffect = 'move';
				if (items.is(this)) {
					dragging.hide();
					$(this)[placeholder.index() < $(this).index() ? 'after' : 'before'](placeholder);
					placeholders.not(placeholder).detach();
				}
				return false;
			});
		});
	};
	})(jQuery);

	return '';
});
/**
 * 图片上传组件
 * @module component/ImgsBar
 */
define('component/imgUpload/js/imgUpload',['component/base/js/base', 'util/Class', 'component/imgBox/js/imgBox', 'component/imgUpload/js/html5Process', 'component/imgUpload/js/flashProcess', 'component/imgUpload/js/formProcess', 'libs/swfobject', 'component/imgUpload/js/wxProcess', 'component/imgUpload/js/qqProcess','component/validate/js/validate','component/editPic/js/editPic','libs/jquery.sortable'], function(Base, Class, ImgBox, Html5Process, FlashProcess, FormProcess, swfobject, WxProcess, QqProcess, Validate,EditPic,sortable) {

	/**
	 *  @constructor
	 *  @alias module:component/ImgsBar
	 *  @param {Object} opt 配置文件
	 */
	var ImgsBar = Class.extend(Base);
	/**
	 * 默认的className。包括wrap、title、content、multi
	 * @type {Object}
	 */
	ImgsBar.prototype.CLASS = {
		/** @type {String} 容器的className */
		WRAP: 'imgbar_wrap',
		/** @type {String} 标题的className */
		TITLE: 'imgbar_title',
		/** @type {String} 内容区域的className */
		CONTENT: 'imgbar_content',
		/** @type {String} 当前后有内容时，需要增加的class */
		MULTI: 'clearfix'
	};
	ImgsBar.prototype.type = 'ImgsBar';
	ImgsBar.prototype.defaultOpts = {
        disableType:[], //['gif']
        disabledByteSize: 10485760, //10M
		wxSupport:true,
		maxLength: 24,
		wxSupport:true,
		qqSupport:true
	};
	ImgsBar.prototype.init = function() {
		this.constructor.superclass.init.apply(this, arguments);
		this.opts = $.extend(true, {},this.defaultOpts,this.opts);//by zjj
		this.opts.maxLength = (parseInt(this.opts.attr.maxLength) > 0)?this.opts.attr.maxLength : this.defaultOpts.maxLength;
		// 将回调函数传入处理对象中，所有对象均保持一个出口
		// ImgsBar无需关注具体使用哪种处理方法
		// 修改页处理
		var startIndex = 0,
			urlStr = (window.infoDetail && infoDetail.Pic)?infoDetail.Pic:'';
		if(urlStr){
			startIndex = urlStr.split('|').length;
		}
		//var processOpt = $.extend(true, {startIndex: startIndex}, this.getCallbackOpt(), this.opts.picProcess);

		// 将回调函数传入处理对象中，所有对象均保持一个出口
        // ImgsBar无需关注具体使用哪种处理方法
        var processOpt = $.extend(true, {startIndex: startIndex}, this.getCallbackOpt(), this.opts.picProcess);
        (typeof processOpt.disableType === 'undefined') && (processOpt.disableType = this.defaultOpts.disableType);
        
		var Process = this.getProcess();
		this.imgProcess = new Process(processOpt);
		if(this.opts.wxSupport){
			this.wxProcess = new WxProcess(processOpt);
		}
		if(this.opts.qqSupport){
			this.qqProcess = new QqProcess(processOpt);
		}
		this.imgList = [];/*初始化 避免页面多个上传组件时变量污染*/
	};
	ImgsBar.prototype.getProcess = function() { 
        var flshVer= swfobject.getFlashPlayerVersion();
        if(this.isSupportHtml5()) {
        	ImgBox.prototype.logObj.uploadType = 'h5';
            this.uploadType = 'h5';
        	return Html5Process;
        } else if(this.isSupportFlash() && (flshVer.major>10 ||(flshVer.major>=10 && flshVer.minor>=3))){
        	ImgBox.prototype.logObj.uploadType = 'flash';
            this.uploadType = 'flash';
        	return FlashProcess;
        } else {
        	ImgBox.prototype.logObj.uploadType = 'form';
            this.uploadType = 'form';
        	// 使用form模式记录下低版本flash的总量，可以归纳出真正既不支持html5也不支持flash的比率有多少
        	ImgBox.prototype.logObj.flashVersion = flshVer.major + '.' + flshVer.minor;
        	return FormProcess;
        }
	};
	ImgsBar.prototype.isSupportFlash = function() {
		var result=false;
		var name = "flash";
		for (var i = 0; i < navigator.plugins.length; i++) {
			if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
			    result= true;
			    break;
			}
		}
		if (!result) {
			try {
		   		name="ShockwaveFlash.ShockwaveFlash";
		        new ActiveXObject(name);
		        result= true;
		    } catch (ex) {
		    	result=false;
		    }
		}
		return result;
	};
	ImgsBar.prototype.isSupportHtml5 = function(){
		var isSupportMultipleFile = window.File && window.FileReader && window.FileList && window.Blob;
		var isSupportCanvas = !!document.createElement('canvas').getContext;
		if(isSupportMultipleFile && isSupportCanvas && typeof(URL)!=='undefined'){
			return true;
		}
		return false;
	};
	//后面图片不重复判断支持情况
	ImgsBar.prototype.supportEditOK = '';

	ImgsBar.prototype.isSupportEdit = function(){

		if(this.supportEditOK === true){
			return true;
		}else if(this.supportEditOK === false){
			return false;
		}

		//两种情况支持编辑
		//支持canvas的发布页，发布页所编辑的图片都是本地图片
		//或者支持canvas且不是IE的修改页——IE不支持跨域图片的编辑
		var isSupportCanvas = !!document.createElement('canvas').getContext;
		var isIE = navigator.userAgent.indexOf('MSIE') != -1;
		var isUpdataPage = typeof window.infoDetail != 'undefined';
		//支持H5且不是修改页
		if( (!isUpdataPage && isSupportCanvas) || (isUpdataPage && isSupportCanvas && !isIE) ){
			this.supportEditOK = true;
			return true;
		}
		this.supportEditOK = false;
		return false;
	};
	ImgsBar.prototype.createElem = function(){
		// console.log('createElem')
		var opts = this.opts;
        this.maxLength = (parseInt(opts.attr.maxLength) > 0)?opts.attr.maxLength : this.defaultOpts.maxLength;

        (typeof opts.picProcess.disabledByteSize === 'undefined') && (opts.picProcess.disabledByteSize = this.defaultOpts.disabledByteSize);
        var _disabledByteSize = opts.picProcess.disabledByteSize;
        //get uploadType
        this.process = this.getProcess();
        if(this.uploadType == 'form'){
            _disabledByteSize = opts.picProcess.maxByteSize; //表单不能压缩
        }
        
        // this.container = $('<ul class="imgbox-wrap"><li class="imgbox"><img/><div class="toolbar"><div class="de"></div></div></li><ul>');
		this.container = $('<div>').addClass(this.CLASS.WRAP);
		var htmlStr = '<ul class="clearfix img_list"><li class="first_icon"><i></i></li></ul>'
			+ '<div class="upload_wrap upload_wrap1">'
			+ '	<div class="upload">'
			+ '     <div class="localUpload_wrap">'
			+ '		    <div class="localTitle">上传电脑中图片</div>'
			+ '		    <div class="localUpload">'
			+ '			    <div id="imgUpload"></div>'
			+ '			    <div id="maxlength_cover">'+this.maxLength+'</div>'
			+ '		    </div>'
			+ '		</div>'
			+ '		<div class="separate">或</div>'
			+ '     <div class="wxqqUpload_wrap">'
			+ '		    <div class="wxqqTitle">'
			+ '		        <span class="wxTitle tabOn"><i class="wxlogo"></i>微信传图</span>'
			+ '		        <span class="qqTitle"><i class="qqlogo"></i>手机QQ传图</span>'
			+ '         </div>'
			+ '		    <div class="wxqqUpload">'
			+ '		        <div class="wxUpload tabOn"></div>'
			+ '		        <div class="qqUpload"></div>'
			+ '		    </div>'
			+ '		</div>'
			+ '	</div>'
			+ ' <div class="info">上传的图片不能含有文字、数字、网址、名片等,否则会冻结您的账号！最多上传<span>'+this.maxLength+'</span>张，每张最大<span>'+_disabledByteSize/1024/1024+'M</span></div>'
			+ '</div>'
		this.container.html(htmlStr);
		this.container.addClass(this.CLASS.WRAP);
		this.container.attr('id', 'flashflashContent');
		this.setElemView();
	};
	ImgsBar.prototype.focusTo = function() {
		this.elem.focus();
	};
	ImgsBar.prototype.setElemView = function() {
		// console.log('setElemView')
		var opts = this.opts;
		this.container.append(this.elem);
	};
	ImgsBar.prototype.bindDomEvent = function() {
		var _self = this;
		var boxClass = ImgBox.defaultOpt.className;
		// var dragItem = '';
		var editPic = '';
		// 使用代理机制绑定所有imgList下的按键方法
		_self.container.find('.img_list').delegate('.' + boxClass.container, 'click', function(e) {
			var className = e.target.className;
			var indexId = $(this).data('indexId');
			var item = _self.getItemById(indexId);

			switch(className) {
				case boxClass.editBtn:
					if( !_self.isSupportEdit() ){
						return;
					}
					//编辑功能
					var url = item.getValue().replace('_130_100','');

					var editImg ={
						indexId:indexId,
						url:url,
						item:item
					};
					if(editPic){
						editPic.resetImgItem(editImg);
					}else{
						editPic = new EditPic(editImg);
					}
					clickLog('from=pc_photouploading_edit_click');
					break;
				case boxClass.prevBtn:
					item.forward();
					clickLog('from=pc_photouploading_before_click');
					break;
				case boxClass.nextBtn:
					item.backward();
					clickLog('from=pc_photouploading_after_click');
					break;
				case boxClass.deleteBtn:
					_self.removeItem(indexId);
					item.destroy();
					clickLog('from=pc_photouploading_photodelete_click');
					break;
				default:
					;
			}
		}).delegate('.' + boxClass.container, 'mouseover', function() {
			$(this).addClass(boxClass.container + '_' + ImgsBar.SETTING.STATUS.HOVER);
		}).delegate('.' + boxClass.container, 'mouseout', function() {
			$(this).removeClass(boxClass.container + '_' + ImgsBar.SETTING.STATUS.HOVER);
		});

		_self.container.find('.localUpload').bind('mouseover', function(e) {
			$(this).addClass('local_' + ImgsBar.SETTING.STATUS.HOVER)
		}).bind('mouseout', function(e) {
			$(this).removeClass('local_' + ImgsBar.SETTING.STATUS.HOVER)
		});

		//微信传图和手机QQ传图选项卡切换
		_self.container.find('.wxTitle,.qqTitle').bind("click", function(e) {
			if ($(this).hasClass("tabOn")) {
				return
			};
			$(this).removeClass("tabHover");
			$(this).addClass("tabOn").siblings().removeClass("tabOn");
			var wxqqUpload;
			var wxqqClickLog="";
			if($(this).hasClass("wxTitle")){
				wxqqUpload=_self.container.find('.wxUpload');
				wxqqClickLog="from=weixin_upload_pic";
			}else{
				wxqqUpload=_self.container.find('.qqUpload');
				wxqqClickLog="from=shouq_upload_pic";
			}
			wxqqUpload.addClass("tabOn").siblings().removeClass("tabOn");
			//日志埋点
			try{
				if(clickLog != undefined && typeof(clickLog)=="function"){
					clickLog(wxqqClickLog);
				}
			}catch(e){
			}
			var self = $(this)
			ImgsBar.prototype.setWeixinQQClickLog(self);
		}).bind("mouseover",function(e){
			if ($(this).hasClass("tabOn")) {
				return
			};
			$(this).addClass("tabHover");
		}).bind('mouseout', function(e) {
			if ($(this).hasClass("tabOn")) {
				return
			};
			$(this).removeClass("tabHover");
		});
	};
	ImgsBar.prototype.setWeixinQQClickLog = function(self){

	}
	ImgsBar.prototype.removeItem = function(indexId) {
		var removeIndex = -1;
		var i=0, length = this.imgList.length;
		var obj;
		for( ; i<length; i++) {
			obj = this.imgList[i];
			if(obj.id === indexId) {
				removeIndex = i;
			}
		}
		this.imgList.splice(removeIndex, 1);
		if(this.imgList.length < 1) {
			this.container.find('.img_list .first_icon').hide();
		}
		Validate.hideTip(this.rows.containerElem.find('.tip'));
		this.enableUploadBtn();
		if(this.imgList.length==0){/*二手车上传图片说明*/
			this.container.find("input").val("");
			this.container.closest(".imgbar_wrap").find(".upload_wrap").addClass("upload_wrap1");
		}
	}
	/**
	 * 获取回调的方法集合
	 * @return {Object} 回调方法的集合
	 */
	ImgsBar.prototype.getCallbackOpt = function() {
		var _self = this;
		return {
			getImgNum: function(){
				return _self.getImgNum.apply(_self, arguments);
			},
			uploadError: function(){
				_self.uploadError.apply(_self, arguments);
			},
			isExceed: function(){
				_self.isExceed.apply(_self, arguments);
			},
			beforeUpload: function(){
				_self.beforeUpload.apply(_self, arguments);
			},
			uploadComplete: function(){
				_self.uploadComplete.apply(_self, arguments);
			},
			beforeCompress: function(){
				_self.beforeCompress.apply(_self, arguments);
			},
			compressComplete: function(){
				_self.compressComplete.apply(_self, arguments);
			}
		}
	};
	ImgsBar.prototype.render = function(wrapElem) {
		this.constructor.superclass.render.call(this, wrapElem);
		this.imgProcess.render(this.container.find("#imgUpload"));
		this.wxProcess&&this.wxProcess.render(this.container.find('.wxUpload'));
		this.qqProcess&&this.qqProcess.render(this.container.find('.qqUpload'));
	};


	ImgsBar.prototype.imgList = [];
	/**
	 * 压缩前的回调处理函数
	 */
	ImgsBar.prototype.beforeCompress = function(obj) {
		// console.log('ImgsBar beforeCompress');
		// console.log(arguments);
		this.addToShow(obj);
	};
	ImgsBar.prototype.getImgNum = function() {
		// console.log('ImgsBar.getImgNum');
		// console.log(this.imgList);
		var length = 0;
		for(var i=0; i<this.imgList.length; i++) {
			if(this.imgList[i].item.status !== 'init') {
				length ++;
			}
		}
		return {
			hazNum:length,
			maxNum:this.maxLength
		};
	}
	/**
	 * 压缩后的回调处理函数
	 */
	ImgsBar.prototype.compressComplete = function(obj) {
		// console.log('ImgsBar compressComplete');
		// console.log(arguments);
		var item = this.getItemById(obj.id);
		if(item && item.setLog!=undefined){
			item.setLog('afterZipWeight', obj.width);
			item.setLog('afterZipHeight', obj.height);
			item.setLog('beforeZipWeight', obj.originWidth);
			item.setLog('beforeZipHeight', obj.originHeight);
			item.setLog('afterZipSize', obj.size);
		}
	};
	/**
	 * 上传前的回调处理函数
	 */
	ImgsBar.prototype.beforeUpload = function(obj) {
		// console.log('ImgsBar beforeUpload');
		// console.log(arguments);
		var item = this.getItemById(obj.id);
		if(item){
			if(item.setStatus!=undefined){
				item.setStatus('loading');
			}
			if(item.setLog!=undefined){
				item.setLog('uploadBeginTime', new Date().getTime());
			}
		}
	};
	/**
	 * 上传后的回调处理函数
	 */
	ImgsBar.prototype.uploadComplete = function(obj) {
		//为新图片也绑定拖拽排序功能
		this.updateSortable();

		var item = this.getItemById(obj.id);
		if(item){
			//保存上传前的base64数据Edit使用，解决多次打水印问题
			if(typeof obj.imgData4Edit != 'undefined'){
				item.imgData4Edit = obj.imgData4Edit;
			}
			if(item.setLog!=undefined){
				item.setLog('uploadEndTime', new Date().getTime());
			}
			if(item.setStatus!=undefined){
				item.setStatus('success');
			}
			if(item.setImageUrl!=undefined){

				item.setImageUrl(obj.url,false,this);
			}
		}
	};
	/**
	 * 为新图片添加排序功能
	 */
	ImgsBar.prototype.updateSortable = function() {
		var _self = this;
		var list = _self.container.find('.img_list');

		list.sortable('destroy');
		list.off('sortupdate');

		list.sortable({items:'.img_box'}).on('sortupdate', function(ev) {
			_self.dropHandler(ev);
		});
	};
	/**
	 * 上传失败的回调处理函数
	 */
	ImgsBar.prototype.uploadError = function(obj) {
		Validate.showTip(this.rows.containerElem.find('.tip'), '您有图片上传失败，可删除后重新上传', 'error');
		var item = this.getItemById(obj.id);
		if(item){
			item.setImageUrl('//img.58cdn.com.cn/ui7/post/pc/imgs/img-upload-error.jpg',false,this);
			item.setStatus('error');
			item.setLog('resultState', 'failed');

			//新错误统计埋点
			if(typeof obj.errorMsg != 'undefined'){
				item.setLog('errorMsg',obj.errorMsg);
			}
			item.sendLog();
		}
	};
	/**
	 * 是否超过上限了
	 */
	ImgsBar.prototype.isExceed = function(){
		var maxObj = this.getImgNum();
		var bExceed = false;
		if(maxObj.hazNum > maxObj.maxNum-1) {
			bExceed = true;
		}
		return bExceed;
	};
	/**
	 * 重排
	 */
	ImgsBar.prototype.sortImgList = function(){
		var _self = this;
		var boxList = this.container.find('.img_box');

		var newImgList = [];
		for(var i=0,len=boxList.length; i<len; i++){
			var indexId = boxList.eq(i).attr('data-index');
			newImgList.push(_self.getItemObjById(indexId));
		}
		_self.imgList = newImgList;
	};
	ImgsBar.prototype.getValue = function() {
		var _self = this;
		_self.sortImgList();

		var valueList = [];
		var i=0;
		var length = this.imgList.length;
		var item;
		for( ; i<length; i++) {
			item = this.imgList[i].item;
			if(item.status === 'success') {
				var url = item.getValue();
				url = url.replace('_130_100.jpg', '.jpg').replace('//pic1.58cdn.com.cn', '').replace('//pic1.58cdn.com.cn', '');
				url = url.replace('/tiny/','/big/').replace(item.opts.loadingUrl,'').replace("//img.58cdn.com.cn/ui7/post/pc/imgs/img-upload-error.jpg",'');
				valueList.push(url);
			}
		}
		return valueList.join('|');
	};
	ImgsBar.prototype.setValue = function(urls) {
		if(!urls) {
			return;
		}
		var urlList = urls.split('|');
		for(var i=0; i<urlList.length; i++) {
			this.addToShow({id:i, url: '//pic1.58cdn.com.cn' + urlList[i]}, 'success', true);
		}
		/*添加排序功能*/
		this.updateSortable();
	};
	/**
	 * 增加单个ImgBox显示
	 * @param {[type]} obj [description]
	 */
	ImgsBar.prototype.addToShow = function(obj, status, bInit) {

		if(this.imgList.length > this.maxLength-1) {
			/**
			 * @todo  超过限制的提示数了
			 */
			Validate.showTip(this.rows.containerElem.find('.tip'), '您上传的图片张数已经达到上限，可删除后再重新上传', 'error');
			// console.log('超过限制了');
			return;
		}
		var item = new ImgBox({id: obj.id,isSupportEdit:this.isSupportEdit()});

		if(status) {
			item.setStatus(status);
		}
		if(obj.url) {
			item.setImageUrl(obj.url, bInit,this);
		}
		// 显示
		this.imgList.push({
			id: obj.id,
			item: item
		});
		if(this.imgList.length > 0) {
			this.container.find('.img_list .first_icon').show();
		}
		item.appendTo(this.container.find('.img_list'));


		// 记录日志
		if(!bInit) {
			item.setLog('zipBeginTime', new Date().getTime());
			item.setLog('beforeZipSize', obj.size);
		}
		// 增加完之后再判断是否要禁用按钮
		if(this.imgList.length >= this.maxLength) {
			this.disableUploadBtn();
		}
	};
	ImgsBar.prototype.disableUploadBtn = function() {
		this.container.find('.localUpload').addClass('disabled_btn');
		if(this.isSupportHtml5()||this.imgProcess.disableUploadBtn!=null){
			/*flash方式也调用disableUploadBtn*/
			this.imgProcess.disableUploadBtn();
		}else{
			this.imgProcess.disableSingleBtn();
		}
		//IE 678添加disabled_btn样式不生效会自动添加一个jQuery+随机数的属性
		//根据此属性的存在判断是否应当显示maxlength去覆盖禁用图片上的数字
		if($('.localUpload').prop("outerHTML").indexOf('jQuery') == -1){
			this.container.find('#maxlength_cover').show();
		}
	};
	ImgsBar.prototype.enableUploadBtn = function() {
		this.container.find('.localUpload').removeClass('disabled_btn');
		this.imgProcess&&this.imgProcess.enableUploadBtn&&this.imgProcess.enableUploadBtn();//safari bug
		this.container.find('#maxlength_cover').hide();
	};
	/**
	 * 根据名称获取到当前的ImgBox对象
	 * @param  {String} id
	 * @return {ImgBox}
	 */
	ImgsBar.prototype.getItemById = function(id) {
		var item = null;
		var i=0, length=this.imgList.length;
		var obj;
		for( ; i<length; i++) {
			obj = this.imgList[i];
			if(obj.id === id) {
				item = obj.item;
			}
		}
		// console.log('ImgsBar.getItemById(), id: ' + id);
		// console.log(item);
		return item;
	};
    /**
     * 根据名称获取到当前的ImgBox和id对象
     * @param  {String} id
     * @return {objImgBox}
     */
    ImgsBar.prototype.getItemObjById = function(id) {
        var item = null;
        var i=0, length=this.imgList.length;
        var obj;
        for( ; i<length; i++) {
            obj = this.imgList[i];
            if(obj.id == id) {
                break;
            }
        }
        // console.log('ImgsBar.getItemById(), id: ' + id);
        // console.log(item);
        return obj;
    };
	/**
	 * 根据名称获取到当前的ImgBox和id对象
	 * @param  {String} id
	 * @return {objImgBox}
	 */
	ImgsBar.prototype.getItemObjById = function(id) {
		var item = null;
		var i=0, length=this.imgList.length;
		var obj;
		for( ; i<length; i++) {
			obj = this.imgList[i];
			if(obj.id == id) {
				break;
			}
		}
		// console.log('ImgsBar.getItemById(), id: ' + id);
		// console.log(item);
		return obj;
	};
	/**
	 * 拖拽完成时调换图片位置和imglist中item位置
	 * @param  {Object} dragItem
	 * @return {Object} dropItem
	 */
	ImgsBar.prototype.dropHandler = function(ev) {
		//拖拽完成不用update imgList，每次getValue的时候先跟新imgList再getValue
		console.log('拖拽完成');
	};

	return ImgsBar;
});

/**
 * 图片上传组件
 * @module component/ImgsBar
 */
define('component/carImgUnload/js/carImgUnload', ['Controller/Controller', 'component/base/js/base', 'util/Class', 'component/imgBox/js/imgBox', 'component/imgUpload/js/html5Process', 'component/imgUpload/js/flashProcess', 'component/imgUpload/js/formProcess', 'libs/swfobject', 'component/imgUpload/js/wxProcess', 'component/imgUpload/js/qqProcess', 'component/validate/js/validate', 'component/editPic/js/editPic', 'libs/jquery.sortable', 'component/imgUpload/js/imgUpload'], function(Controller, Base, Class, ImgBox, Html5Process, FlashProcess, FormProcess, swfobject, WxProcess, QqProcess, Validate, EditPic, sortable, ImgsBar) {

    /**
     *  @constructor
     *  @alias module:component/ImgsBar
     *  @param {Object} opt 配置文件
     */
    var CarImgUnload = Class.extend(ImgsBar);
    CarImgUnload.prototype.type = 'carImgUnload';
    ImgsBar.prototype.init = function() {
        Base.prototype.init.apply(this, arguments);
        this.opts = $.extend(true, {}, this.defaultOpts, this.opts); //by zjj
        this.opts.maxLength = (parseInt(this.opts.attr.maxLength) > 0) ? this.opts.attr.maxLength : this.defaultOpts.maxLength;
        // 将回调函数传入处理对象中，所有对象均保持一个出口
        // ImgsBar无需关注具体使用哪种处理方法
        // 修改页处理
        var startIndex = 0,
            urlStr = (window.infoDetail && infoDetail.Pic) ? infoDetail.Pic : '';
        if (urlStr) {
            startIndex = urlStr.split('|').length;
        }
        //var processOpt = $.extend(true, {startIndex: startIndex}, this.getCallbackOpt(), this.opts.picProcess);

        // 将回调函数传入处理对象中，所有对象均保持一个出口
        // ImgsBar无需关注具体使用哪种处理方法
        var processOpt = $.extend(true, { startIndex: startIndex }, this.getCallbackOpt(), this.opts.picProcess);
        (typeof processOpt.disableType === 'undefined') && (processOpt.disableType = this.defaultOpts.disableType);

        var Process = this.getProcess();
        this.imgProcess = new Process(processOpt);
        if (this.opts.wxSupport) {
            this.wxProcess = new WxProcess(processOpt);
        }
        if (this.opts.qqSupport) {
            this.qqProcess = new QqProcess(processOpt);
        }
        this.imgList = []; /*初始化 避免页面多个上传组件时变量污染*/
        this.opts.autosortimglist = false; /*是否默认参与图片只能排序*/
    };
    ImgsBar.prototype.createElem = function() {
        var opts = this.opts;
        this.maxLength = (parseInt(opts.attr.maxLength) > 0) ? opts.attr.maxLength : this.defaultOpts.maxLength;

        (typeof opts.picProcess.disabledByteSize === 'undefined') && (opts.picProcess.disabledByteSize = this.defaultOpts.disabledByteSize);
        var _disabledByteSize = opts.picProcess.disabledByteSize;
        //get uploadType
        this.process = this.getProcess();
        if (this.uploadType == 'form') {
            _disabledByteSize = opts.picProcess.maxByteSize; //表单不能压缩
        }
        var autosortimglistClass = "";
        if (this.opts.autosortimglist) {
            autosortimglistClass = "focus"
        }
        // this.container = $('<ul class="imgbox-wrap"><li class="imgbox"><img/><div class="toolbar"><div class="de"></div></div></li><ul>');
        this.container = $('<div>').addClass(this.CLASS.WRAP);
        var htmlStr = '<div class="infotip"><div class="checkbox_wrap clearfix" name="autosortimglist"><div tabindex="34" class="checkbox ' + autosortimglistClass + '" data-value="1"><i></i><label>使用图片自动排序功能</label></div></div><p>系统会对所有上传的图片进行自动排序~~排序完成，您还可以手动调整顺序~~</p></div><ul class="clearfix img_list"><li class="first_icon"><i></i></li></ul>' +
            '<div class="upload_wrap upload_wrap1">' +
            '	<div class="upload">' +
            '     <div class="localUpload_wrap">' +
            '		    <div class="localTitle">上传电脑中图片</div>' +
            '		    <div class="localUpload">' +
            '			    <div id="imgUpload"></div>' +
            '			    <div id="maxlength_cover">' + this.maxLength + '</div>' +
            '		    </div>' +
            '		</div>' +
            '		<div class="separate">或</div>' +
            '     <div class="wxqqUpload_wrap">' +
            '		    <div class="wxqqTitle">' +
            '		        <span class="wxTitle tabOn"><i class="wxlogo"></i>微信传图</span>' +
            '		        <span class="qqTitle"><i class="qqlogo"></i>手机QQ传图</span>' +
            '         </div>' +
            '		    <div class="wxqqUpload">' +
            '		        <div class="wxUpload tabOn"></div>' +
            '		        <div class="qqUpload"></div>' +
            '		    </div>' +
            '		</div>' +
            '	</div>' +
            ' <div class="info">上传的图片不能含有文字、数字、网址、名片等,否则会冻结您的账号！最多上传<span>' + this.maxLength + '</span>张，每张最大<span>' + _disabledByteSize / 1024 / 1024 + 'M</span></div>' +
            '</div>'
        this.container.html(htmlStr);
        this.container.addClass(this.CLASS.WRAP);
        this.container.attr('id', 'flashflashContent');
        this.setElemView();
    };
    ImgsBar.prototype.render = function(wrapElem) {
        var _self = this;
        Base.prototype.render.call(this, wrapElem);
        this.imgProcess.render(this.container.find("#imgUpload"));
        this.wxProcess && this.wxProcess.render(this.container.find('.wxUpload'));
        this.qqProcess && this.qqProcess.render(this.container.find('.qqUpload'));
        /*图片上传点击查看/收起图片示例*/
        var showspan = '<span class="show-span" style="color:#2255dd;cursor: pointer;">&nbsp点击查看图片示例&gt</span>' +
            '<span class="hide-span" style="color:#2255dd;cursor: pointer;display:none;">&nbsp点击收起图片示例&gt</span>';
        $(".info").append(showspan);
        var $imgSample = $("#flashflashContent");
        $imgSample.find(".upload_wrap").removeClass("upload_wrap1");
        $imgSample.find(".upload_wrap").find(".show-span,.hide-span").bind("click", function() {
            if ($(this).hasClass("show-span")) {
                $imgSample.find(".upload_wrap").addClass("upload_wrap1");
                $(".show-span").css('display', 'none');
                $(".hide-span").css('display', 'inline-block');

            }
            if ($(this).hasClass("hide-span")) {
                $imgSample.find(".upload_wrap").removeClass("upload_wrap1");
                $(".show-span").css('display', 'inline-block');
                $(".hide-span").css('display', 'none');
            }
        });
        // 图片识别开关
        this.container.find(".infotip .checkbox i").bind("click", function(e) {
            var $parentEl = $(this).parent();
            if ($parentEl.hasClass("focus")) {
                $parentEl.removeClass("focus");
                _self.opts.autosortimglist = false;
            } else {
                $parentEl.addClass("focus");
                _self.opts.autosortimglist = true;
                _self.sortByPercisionAllImgList(); //重排全部顺序
            }
        })
    };
  
    //给选中部件添加点击埋点
    ImgsBar.prototype.setBuJianClickLog = function(self) {

        }
        //图片描述失去焦点添加埋点
    ImgsBar.prototype.picdescClickLog = function() {

        }
        /*删除图片之后更新排序*/
    ImgsBar.prototype.removeItem = function(indexId) {
            var removeIndex = -1;
            var i = 0,
                length = this.imgList.length;
            var obj;
            for (; i < length; i++) {
                obj = this.imgList[i];
                if (obj.id === indexId) {
                    removeIndex = i;
                }
            }
            this.imgList.splice(removeIndex, 1);
            if (this.imgList.length < 1) {
                this.container.find('.img_list .first_icon').hide();
            }
            Validate.hideTip(this.rows.containerElem.find('.tip'));
            this.enableUploadBtn();
            if (this.imgList.length == 0) { /*二手车上传图片说明*/
                this.container.find("input").val("");
                this.container.closest(".imgbar_wrap").find(".upload_wrap").addClass("upload_wrap1");
            }
            //更新分数缓存索引
            var core = this.precisionIndex[indexId];
            var coreIndex = this.precisionArr.indexOf(core);
            if (coreIndex != -1) {
                this.precisionArr.splice(coreIndex, 1)
            }
            delete this.precisionIndex[indexId];
        }
        /*按照权重顺序全部重排*/
    ImgsBar.prototype.sortByPercisionAllImgList = function() {
        var img_box = "";
        var lgth = this.precisionArr.length;
        for (var i = 0; i < lgth; i++) {
            var precision = this.precisionArr[i]; //重大大小进行排序，获取到最前面的分数
            //找到对应分数对应图片实例
            img_box = this.findImgListByPricision(precision);
            img_box && img_box.insertBeforeImgs(i, this);
        };

    }
    ImgsBar.prototype.findImgListByPricision = function(precision) {
            var imgth = this.imgList.length,
                imgbox = null;
            for (var i = 0; i < imgth; i++) {
                var item = this.imgList[i].item;
                if (!item.sortDone && item.precision == precision) {
                    imgbox = item;
                    item.sortDone = true; //重排一次就不再参与
                    break;
                }
            };
            return imgbox;
        }
        /*插入当前图片到index的位置*/
    ImgBox.prototype.insertBeforeImgs = function(index, imgupload) {
            var tartgetImg = imgupload.container.find(".img_box")[index];
            if (tartgetImg != null && $(tartgetImg).attr("data-index") != this.container.attr("data-index")) { //防止插入到自己的前面
                this.container.insertBefore($(tartgetImg));
            }
        }
        /*获取图片识别后按照分数排序后的索引*/
    ImgBox.prototype.getPercisionIndex = function(precision, precisionArr) {
        precisionArr = precisionArr.sort(function(a, b) { return b - a; }); //按照分数值生成新的排序 重大到小
        for (var i = precisionArr.length - 1; i >= 0; i--) {
            var core = precisionArr[i];
            if (core == precision) {
                currentIndex = i;
                break;
            }
        };
        return currentIndex;
    }
    ImgsBar.prototype.getValue = function() {
        // console.log('this.getValue');
        var _self = this;
        _self.sortImgList();
        var valueList = [];
        var tagList = [];
        var picdesc = [];
        var i = 0;
        var length = this.imgList.length;
        var item;
        /*在表单获取组件value的时候 设置图片类型，图片说明字段值*/
        for (; i < length; i++) {
            item = this.imgList[i].item;
            if (item.status === 'success') {
                var container = item.container;
                var tag = container.find(".seltext").text();
                if (tag == "选择类型") {
                    tag = "";
                }
                tagList.push(tag)
                var index = i + 1;
                var picdec = container.find("textarea").val();
                var picdecInstance = Controller.records.get("picdesc" + index);
                if (picdec == "图片描述....") {
                    picdec = "";
                }
                picdecInstance.setValue(picdec); //设置图片描述
                picdesc.push(picdec);
                var url = item.getValue();
                url = url.replace('_130_100.jpg', '.jpg').replace('//pic1.58cdn.com.cn', '').replace('//pic1.58cdn.com.cn', '');
                url = url.replace('/tiny/', '/big/').replace(item.opts.loadingUrl, '').replace("//img.58cdn.com.cn/ui7/post/pc/imgs/img-upload-error.jpg", '');
                valueList.push(url);
            }
        }
        var pictag = tagList.join('|');
        var pictagInstance = Controller.records.get("pictag"); //设置图片标签的值
        if (pictagInstance) {
            pictagInstance.setValue(pictag);
        }
        return valueList.join('|');
    };
    ImgsBar.prototype.setValue = function(urls) {
        if (!urls) {
            return;
        }
        var urlList = urls.split('|');
        for (var i = 0; i < urlList.length; i++) {
            this.addToShow({ id: i, url: '//pic1.58cdn.com.cn' + urlList[i] }, 'success', true);
        }
        /*添加排序功能*/
        this.updateSortable();
        /*设置类型值 和图片说明*/
        if (typeof infoDetail !== 'undefined') {

            var picTag = infoDetail.pictag;
            if (picTag && picTag != "") {
                var tagList = picTag.split('|');
                var i = 0;
                var length = tagList.length;
                var item;
                for (; i < length; i++) {
                    if (tagList[i] == null || this.imgList[i] == null) { continue; }
                    item = this.imgList[i].item;
                    var container = item.container;
                    var tag = tagList[i] || "选择类型";
                    container.find(".seltext").text(tag);
                    var index = i + 1;
                    var picdesc = infoDetail["picdesc" + index];
                    if (picdesc && picdesc != "") {
                        container.find("textarea").val(picdesc);
                    }
                }
            }
        }
    };
    return CarImgUnload;
});
/**
 * 工具类
 * cookie 操作
 */
define('util/cookie',[], function() {
	var	cookie = {  
    get: function (name, encode) {  
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
                break;  
        }  
        return null;  
    },  
    set: function (name, value, expires, path, domain, secure) {  
        var argv = arguments;  
        var argc = arguments.length;  
        //        var expires = (argc > 2) ? argv[2] : null;  
        var now = new Date();  
        var expires = (argc > 2) ? argv[2] : new Date(now.getFullYear(), now.getMonth() + 1, now.getUTCDate());  
        var path = (argc > 3) ? argv[3] : '/';  
        var domain = (argc > 4) ? argv[4] : '.58.com';  
        var secure = (argc > 5) ? argv[5] : false;  
        document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : "");  
    },  
    remove: function (name) {  
        //if (this.get(name))   
        //    document.cookie = name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";  
        if (this.get(name)) this.set(name, "", new Date(1970, 1, 1));  
    },  
      
    getCookieVal : function(offset, encode){  
        var endstr = document.cookie.indexOf(";", offset);  
        if (endstr == -1) {  
            endstr = document.cookie.length;  
        }  
        if (encode == false) return document.cookie.substring(offset, endstr);  
        else return unescape(document.cookie.substring(offset, endstr));  
    } 
	}
	return cookie;
});
define('component/rearLogin58/js/rearLogin58',['Controller/Controller',"util/cookie","util/postClickLog"], function(Controller,cookie,postClickLog) {
	if(typeof userid !== 'undefined' && userid != '0' && userid !==''){	
		return function (){
			this.type='rearLogin58';
			this.init=function(){};
			this.render=function(wrapElem){};
			this.showLogin=function(){};
			this.isLogin=function(){return true;}
		};
	}
	var rearLogin58 = {
		isLogin: (typeof userid !== 'undefined' && userid != '0' && userid !==''),
		reartab: function() {
			rearLogin58.qieHuanTab(".usertab a", ".userlogin_bd .userlogintab");
		}, //reartab
		qieHuanTab: function(navtab, contab) {
			$($(navtab).selector).bind("click", function() {
				if ($(this).hasClass("on")) {
					return
				};
				$(this).addClass("on").siblings().removeClass("on");
				$($(contab).selector).eq($(this).index()).show().siblings().hide();
			}); //end click
		},
		loginsuccess: function(data) {
			this.isLogin = true;
			if (!data) {
				var data = {};
				data.userid = "";
			}
			$(".rearlogin58").hide();
			var success_str = '<div class="loginsuccess">' + data.nickname + '<p class="login_ok">恭喜您登录成功</p>' + '<p class="logintip">您可以继续发布了</p>' + '</div>';
			$(success_str).insertAfter('.rearlogin58');
            if(window.HP && window.HP.user){
                HP.user.containerid = "login";
                HP.user.show();
            }
			Controller.triggerSubmit();
		}
	} //rearLogin

	// 手机登录
	window.mobileloginSuccessFunction = function(data) {
		var now=new Date();
		var now=new Date(now.getFullYear()+1,now.getMonth(),now.getUTCDate());
		cookie.set("lastlogtype","mobile",now);//记录上次登录成功的方式是手机验证码
		rearLogin58.loginsuccess(data);
	}
		// 58账号和密码登录
	window.successFunction = function(data) {
		var now=new Date();
		var now=new Date(now.getFullYear()+1,now.getMonth(),now.getUTCDate());
		cookie.set("lastlogtype","userpwd",now);//记录上次登录成功的方式是用户名密码
		rearLogin58.loginsuccess(data);
	}
		// 58 邮箱注册成功
	window.emailsuccessFunction = function(data) {
		var now=new Date();
		var now=new Date(now.getFullYear()+1,now.getMonth(),now.getUTCDate());
		cookie.set("lastlogtype","userpwd",now);//记录上次登录成功的方式是用户名密码
		closeopendiv();
		$("#pptRegForm").hide().insertAfter($("#loginFrame"));
		rearLogin58.loginsuccess(data);
	}

	function doLogin() {
		var isPhonenum = $(".rearlogin58 .usertab .phonenum ").hasClass("on")
		if (isPhonenum) {
			$("#pptmobilecodeloginButton").trigger("click");
		} else {
			$("#loginButton").trigger("click");
		}
	}
	
	// 点击登陆按钮
	$("#fabubtn").bind("click", doLogin);
	
	//邮箱注册的处理
	$("#pptRegForm").hide();
	$("#emailreg").click(function() {
		postClickLog.send("pc_post_login_tab_namepassword_emailregister");
		require(['component/popwin/js/popwin'], function(popwin) {
			var info = $("#pptRegForm").show();
			popwin.show("用户注册", info, 440, 380, true,function(){
				$("#pptRegForm").hide().insertAfter($("#loginFrame"));
			});
		});
	})
	rearLogin58.reartab();
	
	function RearLogin58(){
		this.init();
	}
	
	RearLogin58.prototype.type = 'rearLogin58';
	
	RearLogin58.prototype.init = function(){
		this.elem = $('.rearlogin58');
	}
	RearLogin58.prototype.isLogin = function(){
		return rearLogin58.isLogin;
	}
	RearLogin58.prototype.doLogin = function() {
		doLogin();
	}
	RearLogin58.prototype.firstShow = true;
	RearLogin58.prototype.bindDomEvent = function(){};
	
	RearLogin58.prototype.showLogin=function(sourceName, sourceObj){
		var _self = this;
		if (!_self.isLogin()) {
			_self.show();
			if(_self.firstShow){//只在第一次显示的时候加上这段日志相关代码
				_self.firstShow=false;
				var loginType=cookie.get("lastlogtype");
				var logTabKey_l2="";//后置登录tab显示
				if(loginType=="mobile"){
					logTabKey_l2="pc_post_login_tab_fastlogin_default";
				}else if(loginType=="userpwd"){
					$("a.usernum").click();
					logTabKey_l2="pc_post_login_tab_namepassword_default";
				}
				if(logTabKey_l2.length>0){
					postClickLog.send(logTabKey_l2);
				}
				//tab的点击绑定事件
				$(".usertab a").click(function(){
					if($(this).hasClass("phonenum")){//有phonenum的是手机号快捷登录
						postClickLog.send("pc_post_login_tab_fastlogin_click");
					}else{//另外一个是58账号密码登录
						postClickLog.send("pc_post_login_tab_namepassword_click");
					}
				});
				//忘记密码 和注册按钮的 统计代码的绑定
				$(".reg-a").click(function(){
					postClickLog.send("pc_post_login_tab_namepassword_forgetpassword");
				});
                //手机号快捷登录的获取动态码按钮
                $("#pptmobilecodeloginresendbtn").click(function(){
                    postClickLog.send("pc_post_login_tab_fastlogin_getcode");
                });
			}
            var reg=new RegExp("^(13|14|15|17|18)\\d{9}$");
            var value=sourceObj.getValue();
            if(value && value.length>0 && reg.test(value)){
                $("#pptmobilecodeloginmobile").val(value);
                $("#pptmobilecodeloginresendbtn").addClass("show_color");
            }

            var btnPos=$(".submit_wrap").offset();
            setTimeout(function(){
                window.scrollTo("",btnPos.top-550);
            },300);
		}
	}
	RearLogin58.prototype.render = function(wrapElem){
		this.elem.appendTo(wrapElem);
		this.bindDomEvent();
		this.hide();
	};
	RearLogin58.prototype.show = function(){
		this.rows.containerElem.show();
		this.elem.show();
	};
	RearLogin58.prototype.hide = function(){
		this.rows.containerElem.hide();
		this.elem.hide();
	};
	return RearLogin58;
});
define('component/cubetg/js/cubetg',[],function() {
    /*CUBE by musx start*/
    /*推广iframe联动*/
    //推广iframe url对象
    var tg_url = {
        tg_dispLocalId: ____json4fe.locallist.dispid,
        tg_dispCateId: ____json4fe.catentry[1].dispid,
        tg_para: {},
        tg_source: 1501,
        tg_userType: 0
    };

    //leo 添加iframe的方法，获取到一个id 然后把iframe插入到这个id中
    var tgIframe = function(wrapElem) {
            var url = '//cube.58.com/cube/loadPromotionData?dispLocalId=' + tg_url.tg_dispLocalId + '&dispCateId=' + tg_url.tg_dispCateId + '&source=' + tg_url.tg_source + '&userType=' + tg_url.tg_userType;
            wrapElem.append('<iframe id="tg_iframe" name="tg_iframe" src="' + url + '" height="0px" width="850px" frameborder="0"></iframe>')
        }
        //end leo

    //联动控件绑定
    var tgBindEvent = function(obj, type) {
        (function(){
            obj.bind('change', function(e, data){
                tgReloadIframe(obj.attr('nameid'), data, type);
            });
        })(obj, type);
        // if (obj.length == 1 && obj.prop('tagName') == 'SELECT') {
        //     //select
        //     obj.bind('change', function() {
        //         tgReloadIframe(obj.attr('nameid'), obj.find("option:selected").val(), type);
        //     });
        // } else if (obj.length == 1 && obj.prop('tagName') == 'INPUT') {
        //     //checkbox single
        //     if ($.browser.msie) {
        //         obj.click(function() {
        //             this.blur();
        //             this.focus();
        //         });
        //     };
        //     obj.change(function() {
        //         tgReloadIframe(obj.attr('nameid'), $('input[name=' + obj.attr('name') + ']').val(), type);
        //     });
        // } else if (obj.length > 1 && obj.eq(0).attr('type') == 'radio') {
        //     //radio
        //     if ($.browser.msie) {
        //         obj.click(function() {
        //             this.blur();
        //             this.focus();
        //         });
        //     };
        //     obj.change(function() {
        //         tgReloadIframe(obj.eq(0).attr('nameid'), $('input[name=' + obj.attr('name') + ']:checked').val(), type);
        //     });
        // } else if (obj.length > 1 && obj.eq(0).attr('type') == 'checkbox') {
        //     //checkbox
        //     if ($.browser.msie) {
        //         obj.click(function() {
        //             this.blur();
        //             this.focus();
        //         });
        //     };
        //     obj.change(function() {
        //         var checkbox_val = '';
        //         for (var i = 0, len = $('input[name=' + obj.attr('name') + ']:checked').length; i < len; i++) {
        //             checkbox_val = checkbox_val + $('input[name=' + obj.attr('name') + ']:checked').eq(i).val();
        //             if (i != len - 1) {
        //                 checkbox_val = checkbox_val + ',';
        //             }
        //         }
        //         tgReloadIframe(obj.eq(0).attr('nameid'), checkbox_val, type);
        //     });
        // }
    };
    //拼写url并重新加载iframe
    var tgReloadIframe = function(key, val, type) {
            //发布按钮
            // var fabuButton = $('#fabu');
            // if(fabuButton.length==0){return;}
            // if(fabuButton.attr('outtg')!=undefined){return;}
            //未登录，返回
        if (userid == '' || userid == '0') {
            return;
        }

        if (type == 1) {
            //最细类别
            if (val == -1 || val == '') {
                tg_url.tg_dispCateId = ____json4fe.catentry[1].dispid;
            } else {
                tg_url.tg_dispCateId = val;
            }
        } else if (type >= 300 && type < 400) {
            //参数
            tg_url.tg_para[key] = val;
        } else if (type == 20 || type == 21 || type == 29) {
            //最细地域
            if (val == -1 || val == '') {
                tg_url.tg_dispLocalId = ____json4fe.locallist.dispid;
            } else {
                tg_url.tg_dispLocalId = val;
            }
            //console.log(tg_url.tg_dispLocalId);
        } else if (type == 50 || type == 51 || type == 52) {
            //个人,商家
            if (val == undefined) {
                tg_url.tg_userType = 0;
            } else {
                tg_url.tg_userType = val;
            }
        }

        //url:区域 类别
        var url = '//cube.58.com/cube/loadPromotionData?dispLocalId=' + tg_url.tg_dispLocalId + '&dispCateId=' + tg_url.tg_dispCateId;

        //url:参数
        var tg_para_str = '';
        for (prop in tg_url.tg_para) {
            tg_para_str = tg_para_str + prop + ':' + tg_url.tg_para[prop] + ';';
        }
        tg_para_str = tg_para_str.substring(0, tg_para_str.length - 1);
        if (tg_para_str != '') {
            url = url + '&para=' + tg_para_str;
        }

        //url:VIP
        url = url + '&source=' + tg_url.tg_source;

        //url:发布人
        url = url + '&userType=' + tg_url.tg_userType;

        //重新加载iframe
        var iframe = $('#tg_iframe');
        iframe.css('height', '0px');
        iframe.attr('src', url);
        //console.log('changed url:'+url);
    };

    //推广联动功能
    var tgOnload = function(wrapElem) {

        //未登录，返回
        if (userid == '') {
            return;
        }

        //如果为修改,则不添加推广功能
        // @todo 判断有问题，需要理清逻辑
        var windowUrl = window.location.href;
        urlParts = windowUrl.split("/");
        // if (urlParts[3] == 'update' || urlParts[3] == 'vupdate' || urlParts[5].slice(0, 3) == 'up_') {
        //     return;
        // }

        //source 通过url判断是否为vip
        if (urlParts[3].slice(0, 1) == 'v') {
            tg_url.tg_source = 1507;
        }

        //如果画面无发布人控件,userType为1
        if ($('*[name="IsBiz"]').length == 0 && $('*[name="isBiz"]').length == 0 && $('*[name="faburen"]').length == 0) {
            tg_url.tg_userType = 1;
        }
        //如果有radio形式的发布人控件，判断状态
        var tg_isbiz_item = ['isBiz', 'faburen'];
        for (var isbiz_i = 0, isbiz_len = tg_isbiz_item.length; isbiz_i < isbiz_len; isbiz_i++) {
            var isbizObj = $('*[name="' + tg_isbiz_item[isbiz_i] + '"]');
            if (isbizObj.length > 1 && isbizObj.eq(0).attr('type') == 'radio') {
                if ($('input[name="' + tg_isbiz_item[isbiz_i] + '"]:checked').length == 0) {
                    tg_url.tg_userType = 1;
                } else {
                    tg_url.tg_userType = $('input[name="' + tg_isbiz_item[isbiz_i] + '"]:checked').val();
                }
                break;
            }
        }
        //如果有single checkbox形式的发布人控件，判断状态
        if ($('*[name="IsBiz"]').length == 1 && $('*[name="IsBiz"]').attr('tagName') == 'INPUT') {
            if ($('*[name="IsBiz"]').attr('style') == undefined || $('*[name="IsBiz"]').attr('style').indexOf('none') < 0) {
                if ($('input[name="IsBiz"]:checked').length == 1) {
                    tg_url.tg_userType = 1;
                } else {
                    tg_url.tg_userType = 0;
                }
            }
        }

        //全职招聘的默认地域为选中公司的地址，而非站点城市
        if (____json4fe.catentry[0].dispid == '9224' && ____json4fe.catentry[1].dispid == '13901') {
            $('.naddList span[k=select]').each(function() {
                if (!$(this).hasClass('off')) {
                    var tg_zplocals = $(this).parent().attr('locals').split(",");
                    tg_url.tg_dispLocalId = tg_zplocals[tg_zplocals.length - 1];
                }
            });
        }

        //发布按钮前添加iframe
        var for_zp_cate = ____json4fe.catentry[0].dispid;

        //leo  这里加载执行插入iframe控件的方法
        tgIframe(wrapElem);
        //end leo

        //特殊类别的控件绑定
        var iframe = $('#tg_iframe');
        if (tg_url.tg_dispCateId == 29) {
            $("#ObjectType").live("change", function() {
                tgReloadIframe(2539, $(this).val(), 388);
            });
            $("#brand").live("change", function() {
                tgReloadIframe(5866, $(this).val(), 388);
            });
        }
        if (tg_url.tg_dispCateId == 8444 || tg_url.tg_dispCateId == 23065 || tg_url.tg_dispCateId == 145) {

            $('#servicerange_post_val').bind('change', function() {
                tgReloadIframe(9066, $('#servicerange_post_val').val(), 388);
            });
        }
        if (tg_url.tg_dispCateId == 14502) {
            $('select[name="post_subcate_3"]').bind('change', function() {
                tgReloadIframe(0, $('select[name="post_subcate_3"]').find("option:selected").val(), 1);
            });
        }
        if (tg_url.tg_dispCateId == 14256 || tg_url.tg_dispCateId == 14255) {
            $('#guojiaid a').bind('click', function() {
                tgReloadIframe($.cmcs.rootPara[0].nameid, $(this).attr('data'), 398);
            });
        }

        if (for_zp_cate == 9224) {
            //招聘会[招聘会类型]
            $('span[name="cate"]').click(function() {
                tgReloadIframe(0, $(this).attr('value'), 1);
            });
            //招聘会[详细地址]
            $('#city-select-list li').click(function() {
                tgReloadIframe(0, $(this).attr('localid'), 29);
            });

            //全职招聘[职位]
            $('#divJobCate a').click(function() {
                tgReloadIframe(0, $(this).attr('para').split(",")[1], 1);
            });
            //全职招聘[工作地址]
            $('#tr_city').delegate('span[k=select]', 'click', function() {
                var disJobLocals = $(this).siblings('p.disJob').find('span').attr('locals').split(",");
                tgReloadIframe(0, disJobLocals[disJobLocals.length - 1], 20);
            });

        }
        if (for_zp_cate == 13941) {
            //兼职招聘
            //[兼职类别]
            $('#seleJobCateList a').click(function() {
                tgReloadIframe(0, $(this).attr('para').split(",")[0], 1);
            });
        }
        if (tg_url.tg_dispCateId == 12 || tg_url.tg_dispCateId == 10 || tg_url.tg_dispCateId == 8) {
            $('#hiddenBtnArea').removeAttr('onclick');
            $('#hiddenBtnArea').bind('click', function(e) {
                getCityAreaID();
                //console.log('tuiguang xiaoqu:'+_PE.xq.attr("r")+_PE.xq.attr("m"));
                tgLocalChanged();
            });
        }

        //需要监听的控件
        var tg_item = [{
            type: 20,
            name: 'localArea',
            except: [241, 23089, 47, 46, 43, 48, 8502, 23436, 23437, 36, 38483, 38484, 37, 35, 39, 508, 38, 40, 45, 41, 44, 246, 23224, 23435, 27970, 50, 30, 13978, 239, 23275, 250, 38575, 254, 249, 9198, 29]
        }, {
            type: 21,
            name: 'localDiduan',
            except: [241, 23089, 47, 46, 43, 48, 8502, 23436, 23437, 36, 38483, 38484, 37, 35, 39, 508, 38, 40, 45, 41, 44, 246, 23224, 23435, 27970, 50, 30, 13978, 239, 23275, 250, 38575, 254, 249, 9198, 29]
        }, {
            type: 300,
            name: 'ObjectType',
            except: [9, 15, 253, 114, 19, 254, 13, 14, 251, 12, 14256, 14255, 239]
        }, {
            type: 301,
            name: 'shenqingxueli',
            except: [14255]
        }, {
            type: 302,
            name: 'fuwuleixing',
            except: [14455, 14526, 14354]
        }, {
            type: 303,
            name: 'kechengsc',
            except: [14526, 14455]
        }, {
            type: 304,
            name: 'kemu',
            except: []
        }, {
            type: 305,
            name: 'xingcheng',
            except: [8659]
        }, {
            type: 306,
            name: 'tongdao',
            except: []
        }, {
            type: 307,
            name: 'type',
            except: [9, 12, 15, 239, 31, 114, 23275, 19, 250, 38575, 254, 13, 249, 9198, 23004, 14, 251]
        }, {
            type: 308,
            name: 'pinpai',
            except: []
        }, {
            type: 309,
            name: 'fuwubaohan',
            except: []
        }, {
            type: 310,
            name: 'pinzhong',
            except: []
        }, {
            type: 311,
            name: 'xiaozhiwei',
            except: []
        }, {
            type: 312,
            name: 'fuwuduixiang',
            except: [14354]
        }, {
            type: 313,
            name: 'fenlei',
            except: []
        }, {
            type: 314,
            name: 'esqgleibie',
            except: []
        }, {
            type: 315,
            name: 'MinPriceqj',
            except: []
        }, {
            type: 316,
            name: 'gongxiao',
            except: []
        }, {
            type: 317,
            name: 'brand',
            except: []
        }, {
            type: 318,
            name: 'oldlevel',
            except: [46, 43, 23436, 36, 38483, 38484, 37, 35, 39, 508, 38, 40, 45, 41, 44, 246, 23224, 50, 253, 239, 240]
        }, {
            type: 319,
            name: 'fenzhiwei',
            except: []
        }, {
            type: 320,
            name: 'renjun',
            except: []
        }, {
            type: 321,
            name: 'ObjectType0',
            except: []
        }, {
            type: 322,
            name: 'objecttype',
            except: [250, 38575]
        }, {
            type: 323,
            name: 'brand',
            except: []
        }, {
            type: 50,
            name: 'IsBiz',
            except: [23065, 8444, 8445, 23087, 22431, 8442, 29389, 156, 118]
        }, {
            type: 51,
            name: 'isBiz',
            except: []
        }, {
            type: 52,
            name: 'faburen',
            except: []
        }, {
            type: 1,
            name: 'xiaozhiweiGroup',
            except: []
        }];

        //循环字段item,绑定事件
        for (var item_i = 0, item_len = tg_item.length; item_i < item_len; item_i++) {
            var type = tg_item[item_i].type;
            var name = tg_item[item_i].name;
            var except = tg_item[item_i].except;
            var except_flg = false;

            for (var e_i = 0, e_len = except.length; e_i < e_len; e_i++) {
                if (except[e_i] == tg_url.tg_dispCateId) {
                    except_flg = true;
                    //console.log('except:'+name);
                    break;
                }
            }
            if (except_flg == true) {
                continue;
            }
            obj = $('*[name=' + name + ']');
            //console.log(name+':'+obj.length);
            if (obj.length > 0) {
                tgBindEvent(obj, type);
            }
        }

        //发布时获取推广json并提交
        var form = $('#aspnetForm');
        if (form.length == 0) {
            return;
        }
        form.append('<input type="hidden" name="cube_post_jsonkey" id="cube_post_jsonkey">');
        fabuButton.hover(tgFabuHover);
    };
    //获取推广json
    var tgFabuHover = function() {
        if (window.frames['tg_iframe'] != undefined) {
            try {
                if (typeof(window.frames['tg_iframe'].operationBeforeCommit) == "function") {
                    var tg_json = window.frames['tg_iframe'].operationBeforeCommit();
                    $('#cube_post_jsonkey').val(tg_json);
                }
            } catch (e) {}
        }
    };
    var tgLocalChanged = function() {
        //仅房产类联动
        if (tg_url.tg_dispCateId != 12 && tg_url.tg_dispCateId != 10 && tg_url.tg_dispCateId != 8) {
            return;
        }
        //发布按钮
        var fabuButton = $('#fabu');
        if (fabuButton.length == 0) {
            return;
        }
        if (fabuButton.attr('outtg') != undefined) {
            return;
        }
        //未登录，返回
        if (userid !== '') {
            return;
        }

        if (_PE.xq.attr("m") == undefined) {
            tgReloadIframe(0, ____json4fe.locallist.dispid, 29);
        } else if (_PE.xq.attr("m") == '0') {
            tgReloadIframe(0, _PE.xq.attr("r"), 29);
        } else {
            tgReloadIframe(0, _PE.xq.attr("m"), 29);
        }
    };
    // 二手车单独联动，未在本js中调用所以写成全局
    window.tgEcsFrame = function(type) {
        //仅二手车类联动
        if (tg_url.tg_dispCateId != 29) {
            return;
        }
        //未登录，返回
        if (userid !== '') {
            return;
        }
        //vip页面，返回
        if (self != top) {
            return;
        }

        if (type == 1) {
            $('#tg_iframe_w').css('left', '149px');
        } else if (type == 0) {
            $('#tg_iframe_w').css('left', '76px');
        }

    };

    /*推广弹窗 */
    document.domain = '58.com';
    var tuiguangZindex = 9999;
    var tuiguangPanelCount = 0;
    //实现弹窗后底层无法滚动
    $(function() {
            $("<style type='text/css'>.fancybox-lock-test {overflow-y: hidden !important;}</style>").appendTo("head");
            var w1 = $(window).width();
            $('html').addClass('fancybox-lock-test');
            var w2 = $(window).width();
            $('html').removeClass('fancybox-lock-test');
            $("<style type='text/css'>.fancybox-margin{margin-right:" + (w2 - w1) + "px;overflow-y:hidden;}.tg_overlay{width:100%;height:100%; position:fixed; _position:absolute;top:0;left:0;filter:Alpha(Opacity=40);opacity:0.4;background-color:#000;z-index:100000; _top:expression(documentElement.scrollTop + \"px\"); }</style>").appendTo("head");
        })
        //弹窗方法
    window.showTuiguangPanel = function(width, height, htmlStr) {

        tuiguangPanelCount++;
        var panel_id = 'tgPanel_' + tuiguangPanelCount;
        var panel_overlay = 'tgPanelOverlay_' + tuiguangPanelCount;

        zIndex_overlay = tuiguangZindex++;
        zIndex_panel = tuiguangZindex++;

        //背景置灰
        $('body').append('<div id="' + panel_overlay + '" class="tg_overlay" ><iframe scrolling="no" frameborder="0" width="100%" height="100%" style="background-color:#000;filter:Alpha(Opacity=0);opacity:0" src="about:blank"></iframe></div>');
        $('#' + panel_overlay).css('zIndex', zIndex_overlay);

        //生成弹窗
        if (height == 0) {
            $('body').append('<div id="' + panel_id + '" class="fe_window2" style="min-height:200px;_height:200px; width:' + width + 'px; z-index: ' + zIndex_panel + ';display:block;position:absolute;border:5px solid #5F5F5F;background:#FFFFFF;margin:0;">' + htmlStr + '</div>');
        } else {
            $('body').append('<div class="fe_window2" id="' + panel_id + '" style="height:' + height + 'px; width:' + width + 'px; z-index: ' + zIndex_panel + ';display:block;position:absolute;border:5px solid #5F5F5F;background:#FFFFFF;margin:0;">' + htmlStr + '</div>');
        }

        //解决推广页面的CSS冲突
        $('.fe_window2 .contains1').css('zIndex', zIndex_panel).css('left', '0px').css('top', '0px').css('position', 'static');
        //背景去滚动条
        $('html').addClass('fancybox-margin');

        //计算弹窗位置
        var tgPanel = $('#' + panel_id);
        var _scrollHeight = $(document).scrollTop(), //获取当前窗口距离页面顶部高度  
            _windowHeight = $(window).height(), //获取当前窗口高度  
            _windowWidth = $(window).width(), //获取当前窗口宽度  
            _popupHeight = tgPanel.height(), //获取弹出层高度  
            _popupWeight = tgPanel.width(); //获取弹出层宽度  
        _posiTop = (_windowHeight - _popupHeight) / 2 + _scrollHeight;

        _posiLeft = (_windowWidth - _popupWeight) / 2;
        if (self == top) {
            tgPanel.css({
                "left": _posiLeft + "px",
                "top": _posiTop + "px",
                "display": "block"
            }); //设置position  
        } else {
            $('body').css('position', 'relative');
            tgPanel.css({
                "left": _posiLeft + "px",
                "bottom": "200px",
                "display": "block"
            }); //设置position  
        }
        //返回弹窗ID
        return panel_id;
    };
    //调整弹窗大小与位置
    window.resizeTuiguangPanel = function(tgPanel_id, width, height) {
        var tgPanel = $('#' + tgPanel_id);
        var _scrollHeight = $(document).scrollTop(), //获取当前窗口距离页面顶部高度  
            _windowHeight = $(window).height(), //获取当前窗口高度  
            _windowWidth = $(window).width(), //获取当前窗口宽度  
            _popupHeight = height, //获取弹出层高度  
            _popupWeight = width; //获取弹出层宽度  
        _posiTop = (_windowHeight - _popupHeight) / 2 + _scrollHeight;
        _posiLeft = (_windowWidth - _popupWeight) / 2;
        if (self == top) {
            tgPanel.animate({
                top: _posiTop,
                left: _posiLeft,
                height: height,
                width: width
            }, 'fast');
        } else {
            if (tgPanel.height() < height) {
                tgPanel.animate({
                    bottom: '100px',
                    left: _posiLeft,
                    height: height,
                    width: width
                }, 'fast');
            } else {
                tgPanel.animate({
                    bottom: '200px',
                    left: _posiLeft,
                    height: height,
                    width: width
                }, 'fast');
            }

        }

    };
    //关闭弹窗方法
    window.closeTuiguangPanel = function(key) {
        var panel_id = 'tgPanel_' + key;
        var panel_overlay = 'tgPanelOverlay_' + key;
        var tgPanel = $('#' + panel_id);
        var tgPanelOverlay = $('#' + panel_overlay);

        //如果弹窗不存在,返回
        if (tgPanel.length == 0 || tgPanelOverlay.length == 0) {
            return;
        }
        //移除背景幕布与弹窗
        tgPanel.remove();
        tgPanelOverlay.remove();
        tuiguangPanelCount--;
        //如果弹窗为0,恢复滚动条
        if ($('.tg_overlay').length == 0) {
            $('html').removeClass('fancybox-margin');
            tuiguangZindex = 9999;
        }
    };
    /*CUBE end*/

    function CubeTg(opts, data) {
        this.init(opts, data);
        this.dataName = opts.dataName || opts.name;
    }
    CubeTg.prototype.init = function(opts, data) {
        this.opts = $.extend(true, {}, this.constructor.opts, opts);
    };
    CubeTg.prototype.doCheck = function(){
        return {
            bValid: true,
            msg: ''
        };
    };
    CubeTg.prototype.getValue = function(){
        var value = '';
        if (window.frames['tg_iframe'] != undefined) {
            try {
                if (typeof(window.frames['tg_iframe'].operationBeforeCommit) == "function") {
                    value = window.frames['tg_iframe'].operationBeforeCommit();
                }
            } catch (e) {}
        }
        // console.log('CubeTg.getValue');
        // console.log(value);
        return value;
    }
    CubeTg.prototype.render = function(wrapElem) {
        // 判断登陆状态，如果未登录不加载
        if((typeof userid !== 'undefined' && userid != '0' && userid !=='')) {
            tgOnload(wrapElem);
        } else {
            this.rows.hide();
        }
    }
    return CubeTg;

});
/**
 * 下拉框
 * @module component/util
 */
define('component/util/js/util',[], function() {
	var Util={};
	Util.navigator={};
	
	Util.navigator.isIE=(document.all) ? true: false;
	Util.navigator.isIE6 = (Util.navigator.isIE && ([/MSIE (\d+)\.0/i.exec(navigator.userAgent)][0][1] == 6));
	return Util;
});
/**
 * 弹出框
 * @module component/popwin
 */
define('component/popwin/js/popwin',['component/base/js/base', 'util/Class', 'Controller/Controller', 'component/util/js/util'], function(base, Class, Controller, Util) {
	var isIE = Util.navigator.isIE,
    isIE6 = Util.navigator.isIE6;

  function widgetswin() {
    this.id = 'fe_window';
    this.title = null;
    this.url = null;
    this.width = 400;
    this.minWidth = 300;
    this.height = 200;
    this.minHeight = 200;
    this.top = 0;
    this.left = 0;
    this.closeable = true;
    this.mask = null;
    this.form = null;
    this._topheight = 47;
    this._bottomheight = 0;
    this._framepadding = 8;
    this._containsarea = null;
    this._frame = null;
    this._toparea = null;
    this._titleid = null;
    this._iframeareaid = null;
    this._loadarea = null;
    this._htmlCon = null;
    this._bottomarea = null;
    this._cssform = 'display:none;left:50%;margin:0px 0px 0px 0px;' + (isIE6 ? 'top:;' : 'top:45%;');
    this.mode = 'iframe'; //iframe | div  
    this.modal = true;
    this.html = '';
    this.createMask = function() {
      var self = this;
      var mask = $('<div class="fe_window_mask" style="' + (isIE ? ("display:none;position:absolute;width:" + screen.width + "px;height:" + screen.height + "px;") : ("display:none;position:fixed;width:" + screen.width + "px;height:" + screen.height)) + 'px;"></div>');
      var maskIframe = $('<iframe style="width:100%;height:100%;background-color:#000;filter:alpha(Opacity=0);opacity:0;"></iframe>');
      mask.append(maskIframe);
      $(document.body).append(mask);
      this.mask = mask;
      this.maskIframe = maskIframe;
    };
    this.createForm = function() {
      var self = this;
      var form = $('<div class="fe_window" style="' + self._cssform + ';margin-left:-' + (self.width / 2) + 'px;margin-top:-' + (self.height / 2) + 'px" ></div>');
      if(isIE6){
      //form[0].style.setExpression("top","window.confirm(document.documentElement.scrollTop)?document.documentElement.scrollTop:100  +  50 ");
      form[0].style.top=(document.documentElement.scrollTop || document.body.scrollTop) + Math.round(50 * (document.documentElement.offsetHeight || document.body.clientHeight) / 100);
      }
      
      var _outerarea = $('<div class="outer" ></div>');
      var _frame = $('<div class="frame" style="display:none;padding' + self._framepadding + ';height:' + self.height + 'px;width:' + (self.width) + 'px" ></div>');
      var _toparea;
      if (self._topheight) {
        var istopbar = (!!self.title)?("display:block;"):("display:none");
        (!!self.title)||(self._topheight = 0);
        _toparea = $('<div class="topbar" style="height:' + self._topheight + 'px;'+istopbar+'"><span><a class="closebtn" href="javascript:void(0);" style="' + (self.closeable ? '' : 'display:none') + '" target="_self">' + '&#10005;</a></span><span class="title">' + (self.title || "") + '</span></div>');
        _toparea.find("a").parent().click(function() {
          self.hide();
        });

        this._titleid = _toparea.find(".title");
      }
      var _containsarea = $("<div class='contains' style='width: " + self.width + "px; height:" + self.height + "px; top: " + self._framepadding + "px; left: " + self._framepadding + "px; '></div>");
      var _loadarea = $("<div class='load' style='display:block;height:" + (self.height - self._topheight - self._bottomheight) + "px;background:zhaopin_files/loading.gif;z-index:9998;'>加载中...</div>");
      var loadAction = self.id + "_loadAction";
      window[loadAction] = function() {
        var _iframearea = $("#"+self._bottomheight)[0];
        if(_iframearea.src==null||_iframearea.src==""){
          return false;/*ie8下没有src也会触发onload事件*/
        }
        try {
          _iframearea.style.cssText = string.format("height:{0}px;width:100%;", self.minHeight - self._topheight - self._bottomheight);
          var width = Math.max(_iframearea.contentWindow.document.documentElement.scrollWidth, _iframearea.contentWindow.document.body.scrollWidth),
            height = Math.max(_iframearea.contentWindow.document.documentElement.scrollHeight, _iframearea.contentWindow.document.body.scrollHeight);
          self.resize(width, height + self._topheight + self._bottomheight);
        } catch (e) {}
        self.showLoad(false);
        $("#"+self._bottomheight).show();
        self.center();
      };
      self._iframeareaid = self.id + "_iframe";
      var isiframeradius = (!self.title)?("border-radius:4px;"):(";");
      //if ((!self.title)) {self._topheight==0};
      var strIframe = '<iframe id="' + self._bottomheight + '" onload="'+loadAction+'()" frameborder="0" scrolling="no" style="height:' + (self.height - ((!self.title)?0:self._topheight) - self._bottomheight) + 'px;'+isiframeradius+' width: 100%;display:none;" class="fe_window_iframe" ></iframe>';
      var _bottomarea;
      if (self._bottomheight > 0) {
        _bottomarea = $("<div class='bottombar' style='height:" + self._bottomheight + "px'></div>")
      }
      form.append(_outerarea);
      _outerarea.append(_frame);
      _outerarea.append(_containsarea);
      _containsarea.html(strIframe);
      if (self._topheight) {
        _containsarea.children(":last").before(_toparea);
      }
      _containsarea.children(":last").before(_loadarea);
      var _htmlCon = $('<div style="height:' + (self.height - self._topheight - self._bottomheight) + 'px; width: 100%;" class="fe_window_htmlcon" ></div>');
      _containsarea.children(":last").before(_htmlCon);

      if (self._bottomheight > 0) {
        _containsarea.append(_bottomarea);
      }
      $(document.body).append(form);
      this.form = form;
      this._frame = _frame;
      this._loadarea = _loadarea;
      this._containsarea = _containsarea;
      this._toparea = _toparea;
      this._bottomarea = _bottomarea;
      this._htmlCon = _htmlCon;
    };
    this.showMask = function(s) {
      var self = this;
      var b_width = Math.max(document.body.scrollWidth,document.body.clientWidth);
      var b_height = Math.max(document.body.scrollHeight,document.body.clientHeight);
      if (s) {
        var topHeight = $(top).height();
        b_height =  Math.max(topHeight,b_height);/*ie下不能遮住全屏*/
        self.mask.css({height:b_height,width:b_width}).show();
        if (isIE) {
          document.getElementsByTagName("html")[0].style.overflow = "hidden";
          document.getElementsByTagName("html")[0].style.paddingRight = "17px";
        } else {
          document.body.style.overflow = "hidden";
          document.body.style.paddingRight = "16px";
        }
        if (isIE) {
          //self.mask[0].style.top = (document.documentElement.scrollTop || document.body.scrollTop) + "px";
        }
      } else {
        self.mask.hide();
        if (isIE) {
          document.getElementsByTagName("html")[0].style.overflow = "";
          document.getElementsByTagName("html")[0].style.paddingRight = "";
        } else {
          document.body.style.overflow = "";
          document.body.style.paddingRight = "";
        }
      }
    };
    this.showLoad = function(s) {
      var self = this;
      if (!self._loadarea) return;
      if (s) {
        self._loadarea.show();
        $("." + self._iframeareaid).hide();
      } else {
        self._loadarea.hide();
        $("." + self._iframeareaid).show();
      }
    };
    this.showForm = function(s) {
      s ? this.form.show() : this.form.hide();
    };
    this.setTitle = function(title) {
      var self = this;
      if (!this._titleid) return false;
      this.title = title;
      //dom缓存 第二次弹出窗口时重新判断渲染title
      this._toparea.remove();
      self._topheight = 47;
      var istopbar = (!!self.title)?("display:block;"):("display:none");
        (!!self.title)||(self._topheight = 0);
        _toparea = $('<div class="topbar" style="height:' + self._topheight + 'px;'+istopbar+'"><span><a class="closebtn" href="javascript:void(0);" style="' + (self.closeable ? '' : 'display:none') + '" target="_self">' + '&#10005;</a></span><span class="title">' + (self.title || "") + '</span></div>');
        _toparea.find("a").parent().click(function() {
          self.hide();
        });
      if (self._topheight) {
        self._containsarea.children(":first").before(_toparea);
      }
      this._toparea = _toparea;
      this._titleid.html(this.title);
    };
    this.setUrl = function(url) {
      if (!this._iframeareaid) return false;
      this._loadarea.show();
      this._htmlCon.hide();
      //$("."+this._iframeareaid).show();
      $("." + this._iframeareaid)[0].src = url ? url : this.url;
    };
    this.setHTML = function(html) {
      $("." + this._iframeareaid).hide();
      this._loadarea.hide();
      this._htmlCon.html("").append(html).show();
      //url 
    };

    this.show = function(title, url, width, height, closeable, callbackfn) {

      if (title) {
        this.title = title;
      }else{
        this.title = null;
      }
      if (!this.mask) {
        this.createMask();
      }
      if (!this.form) {
        this.createForm();
      }
      this.showLoad(true);
      
      this.setTitle(this.title);
      if (url) {
        if (url instanceof jQuery) {
          this.showHTML = url;
          this.setHTML(this.showHTML);
        } else {
          this.url = url;
          this.setUrl(this.url);
        }
      }

      if (width) {
        this.minWidth = width;
      }
      if (height) {
        this.minHeight = height;
      }

      this.closeable = closeable;
      if ($(this.id + '_closebtn')) {
        if (closeable) {
          this._toparea.find('.closebtn').show();
        } else {
          this._toparea.find('.closebtn').hide();
        }
        if (typeof callbackfn == "function") {
          this._toparea.find('.closebtn').unbind("click", this.closeCallback).click(function() {
            callbackfn();
          });
        }
      }
      this.resize(0, 0);

      this.showMask(true);
      this.showForm(true);
      this.center();
    };
    this.showDIV = function() {

    };
    this.hide = function() {
      this.showMask(false);
      this.showForm(false);
    };
    this.close = function() {
      this.form.remove();
      this.form = null;
      this.mask.remove();
      this.mask = null;
    };
    this.move = function(top, left) {
      this.top = top;
      this.left = left;
      this.form.css("top", this.top);
      this.form.css("left", this.left);

    };
    this.center = function() {
      if (!this.form || this.form.length<1) return;
      this.form[0].style.margin=("-" + this.height / 2 + "px 0px 0px -" + this.width / 2 + "px");
      /*修正在iframe下定位上下不居中*/
      /*vip中嵌套在iframe中 修正定位*/
      var inIframe =window.parent.document.getElementById("postFrame");
       if(inIframe!=null){
         var form_top = ($(top).height()/2)-(this.height/2);
         this.form.css("top",form_top>320?form_top:320);
         $(top).scrollTop(0);//滚动条自动向上滚动到顶部
       }
      /*修正遮罩层高度宽度*/
      var b_width = Math.max(document.body.scrollWidth,document.body.clientWidth);
      var b_height = Math.max(document.body.scrollHeight,document.body.clientHeight);
      var topHeight = $(top).height();
      b_height =  Math.max(topHeight,b_height);/*ie下不能遮住全屏*/
      this.mask.css({height:b_height,width:b_width});
    };
    this.resize = function(width, height) {

      var self = this;
      width = Math.max(self.minWidth, width);
      height = Math.max(self.minHeight, height);
      self.width = width;
      self.height = height;
      self._frame.css({
        "width": self.width + 'px',
        "height": self.height + 'px',
        "padding": self._framepadding + "px"
      })
      self._containsarea.css({
        "width": self.width + 'px',
        "height": self.height + 'px',
        "top": self._framepadding + "px",
        "left": self._framepadding + "px"
      })

      self._loadarea.css({
        "height": self.height - self._topheight - self._bottomheight + 'px',
        "lineHeight": self.height - self._topheight - self._bottomheight + 'px'
      })
      $("." + self._iframeareaid).height(self.height - self._topheight - self._bottomheight);

    };
  };
  window.onresize=function(){
    win.center();
  }
  window.setbg = function(title, src, width, height, closeable, callbackfn) {
    if (closeable == 'false' || closeable == false) closeable = false;
    else closeable = true;
    win.show(title, src, width, height, closeable, callbackfn);
    return win
  };
  window.closeopendiv = function() {
    win.hide();
  };
  var win = new widgetswin();
	return win;
});
define('util/util',['Controller/Controller','component/block/js/block', 'component/rows/js/rows'],function(Controller, Block, Rows) {
	var Util = {};
    /**
     * 判断对象类型
     */
    (function(Util){
        var typeList = ['String', 'Function', 'Object', 'Array', 'Number', 'Null', 'Undefined', 'Boolean'];
        for(var i=0; i<typeList.length; i++) {
            var typeStr = typeList[i];
            (function(typeStr){
                Util['is' + typeStr] = function(typeObj) {
                    var type = Object.prototype.toString.call(typeObj);
                    if (type === '[object ' + typeStr + ']') {
                        return true;
                    }
                    return false;
                }
            })(typeStr);
        }
    })(Util);
    /**
     * 借鉴underscore.js
     * http://www.css88.com/doc/underscore/docs/underscore.html
     * @param obj
     * @returns {*|boolean}
     */
    Util.isNaN = function(obj) {
        return Util.isNumber(obj) && obj !== +obj;
    };

    Util.mixin = function(b, e) {
        var reg = /[\u4E00-\u9FA5]/g;
        for (var k in e) {
            if(k == 'productDesc' || k == 'productName'){
                if(reg.test(e[k])){
                    e[k] = encodeURIComponent(e[k]);
                }
            }
            e.hasOwnProperty(k) && (b[k] = e[k])
        }
        return b
    };
    Util.stripHtml=function(html) {
        html = html || "";
        var scriptregex = "<scr" + "ipt[^>.]*>[sS]*?</sc" + "ript>";
        var scripts = new RegExp(scriptregex, "gim");
        html = html.replace(scripts, " ");

        //Stripts the <style> tags from the html
        var styleregex = "<style[^>.]*>[sS]*?</style>";
        var styles = new RegExp(styleregex, "gim");
        html = html.replace(styles, " ");

        //Strips the HTML tags from the html
        var objRegExp = new RegExp("<(.| )+?>", "gim");
        var strOutput = html.replace(objRegExp, " ");

        //Replace all < and > with &lt; and &gt;
        strOutput = strOutput.replace(/</, "&lt;");
        strOutput = strOutput.replace(/>/, "&gt;");

        objRegExp = null;
        return strOutput;
    }
    Util.getTextAndValue=function(arr){//获取拼接参数
        var data = Controller.getFormText();
        var arrVal = [];
        $.each(data,function(name,val){
            if(name!="gobquzhi"&&arr.indexOf(name)!=-1&&val&&val!=""){
                if(name=="shangpaiyuefen"){
                    val = val+"月"
                }
                if(name=="buytime"){
                    val = val+"年"
                }
                arrVal.push(name.toLowerCase()+"="+encodeURIComponent(val));
            }
        })
        var cateID = ____json4fe.catentry[1].dispid;
        var localID = ____json4fe.locallist.dispid;
        var instance ="";
        if(cateID&&cateID!=""){
            arrVal.push("cateapplyed="+cateID);
        }
        if(localID&&localID!=""){
            arrVal.push("localapplyed="+localID);
        }
        var textAndValue = arrVal.join("&");
        if(window.localStorage){
            localStorage.setItem("gobiquzhi",textAndValue);
        }
        return textAndValue;
    }
    Util.getgobalsokey=function(arr){//获取关键字
        var len = arr.length;
        var arrSearchValue=[];
        for(var i =0;i<len;i++){
            var instance = Controller.records.get(arr[i]);
            if(instance&&instance.getText){
                var t = instance.getText();
                if(t&&t!=""){
                    arrSearchValue.push(t);
                }
            }
        }
        var _searchVal = arrSearchValue.join('|');
        _searchVal = $.bll.keywords.joinContentKeyword(_searchVal); // 拼接内容关键词
        return _searchVal;
    }
    Util.isCarCate=function(){
        if(____json4fe.catentry[1].dispid == '29' || ____json4fe.catentry[1].dispid == '239'
            || ____json4fe.catentry[1].dispid == '13978' || ____json4fe.catentry[1].dispid == '41891'){
            return true;
        }else{
            return false;
        }
    }
    Util.isNullObject = function(model){
        if (typeof model === "object"){
            var hasProp = false;
            for (var prop in model){
                hasProp = true;
                break;
            }
            if (hasProp){
               return false;
            }else{
                return true;
            }
        }else{
            throw "model is not object";
        }
    }
    /*ie6,7兼容before After伪类*/
    Util.$beforeAfter = function(dom) { 
        if (document.querySelector || !dom && dom.nodeType !== 1) return; 
        var content = dom.getAttribute("data-content") || ''; 
        var before = document.createElement("before") 
        , after = document.createElement("after"); 
        // 内部content 
        before.innerHTML = content; 
        after.innerHTML = content; 
        // 前后分别插入节点 
        dom.insertBefore(before, dom.firstChild); 
        dom.appendChild(after); 
    }; 
	/**
	 * @func  渲染组件面板
	 * @param  {Array}   表单的组件定义
	 * @param  {object}  渲染好的内容放到哪个元素里面--div#id
	 */
	Util.renderBoard = function(baseDefine,target){
		/*渲染*/
		var i = j = k = 0;
		var block, row, base;
		var blockLength = baseDefine.length;
		var rowLength, baseLength;
		var tabIndex = 1;
		var compList = {}; //面板上的数据对象
		// TODO 是否可以一行或者一个区域进行渲染
		/*渲染baseDefine---start*/
		for (; i < blockLength; i++) {
		    // 区块
		    blockOpt = baseDefine[i];
		    var block = new Block(blockOpt);
	      	//将模块插入弹窗
		    block.containerElem.appendTo(target);
		    rowLength = blockOpt.children.length;
		    j = 0;
		    for (; j < rowLength; j++) {
		        // 行级
		        rowsOpt = blockOpt.children[j];
		        var rows = new Rows(rowsOpt);
		        rows.render(block.contentElem);
		        baseLength = rowsOpt.children.length;
		        k = 0;
		        for (; k < baseLength; k++) {
		            // 基本组件
		            var baseOpt = rowsOpt.children[k];
		            baseOpt.tabIndex = (tabIndex++);
		            var baseData = null;
		            var defaultValue = null;
		            try {
		                // 优先取dataName，如果没有dataName,则使用name
		                baseData = datasrc[baseOpt.dataName || baseOpt.name];
		                defaultValue = baseData&&baseData.defaultValue||baseOpt.defaultValue;
		            } catch (e) {
		                baseData = null;
		            }
		            var instance = getConstructor(baseOpt.type, baseOpt, baseData);
		            // 将校验状态初始化到rows上
		            rows.setValidateStatus(baseOpt.name, !baseOpt.checkRuler);
		            instance.rows = rows;
		            instance.block = block;
		            instance.render(rows.contentElem);
		            if(baseOpt.name){
		           		compList[baseOpt.name] = instance;
		            }
		            if(baseOpt.view&&baseOpt.view.afterText){
		            	instance.container.append(baseOpt.view.afterText);
		            }
		        }
		    }
		}
		/*创造对象*/
		var compMap = {};
		function getConstructor(type, opts, data) {
			var compMap = {};
	            var F = compMap[type];
	            if (!F) {
	                F = require('component/' + type + '/js/' + type);
	                compMap[type] = F;
	            }
	            return new F(opts, data);
        }
		//返回数据对象
		return compList;		
	};
	
    $.bll = $.bll||{};
    $.bll.keywords = {

        // 提取内容全文检索词
        // 该方法触发的时机：(1) 光标从富文本编辑器中移出时 (2) 编辑状态下页面加载完毕时
        getdata: function() {

            /*
             // 仅开通部分类别
             var _listname = ____json4fe.catentry[0].listname;
             var _arrOpened =
             ['sale', 'job', 'jianzhi', 'shenghuo', 'shangwu', 'jiaoyu', 'lvyouxiuxian',
             'pets', 'piaowu'
             ];
             if ($.inArray(_listname, _arrOpened) == -1) return;
             */

            /*// 如果是M版发布系统则跳过
            if ($.c.common.isMobilePost()) { return; }*/

            /*// 如果没有富文本编辑器则返回
            if ('_hEditor' in window == false) { return; }
            if (_hEditor.he == null) { return; }*/

            var ContentInstance = Controller.records.get("Content");
            if(!ContentInstance){return;}
            // 请求服务
            var _url = '//suggest.58.com:8089/getdistributewords_post.do';

            if(!Util.isCarCate()){
                _url = '/ajax?action=getcontentsearchkey';
            }

            var _content = Util.stripHtml(ContentInstance.getValue());


            $.post(_url, {
                'cityid': ____json4fe.locallist.dispid,
                'cateid': ____json4fe.catentry[1].dispid,
                'maxnum': 6,
                'callback': '$.bll.keywords.getdata_callback',
                'title': $.bll.keywords.getTitleAndTag(),
                'content': _content
            }, function(data) { }, 'script');
        },

        // 赋值到缓存中
        getdata_callback: function(data) {
            if (data) {
                $('body').data('context_keyword', data);
            }
        },

        // 取值：仅拼接不存在的值
        joinContentKeyword: function(str) {
            try {
                var ck = []; // 存储要拼接的内容关键词
                var arr = $('body').data('context_keyword');
                if (arr != null) {
                    if (arr.length > 0) {
                        $(arr).each(function(i, e) {
                            if (str.indexOf(e) == -1) {
                                ck.push(e);
                            }
                        });
                    }
                }
                if (ck.length > 0) {
                    str += '|' + ck.join('|');
                }
            } catch (e) { }
            return str;
        },

        // 获取单元参数拼接值
        // 和标题一起提交到服务中进行过滤
        getParaJoinValue: function() {
            var str = '';
            try {
                var tag = [];
                /*$('form#aspnetForm select').each(function(i, n) {
                    if ($(this).attr('id') == 'selectDiduanHidden') return;
                    var v = $(this).val();
                    if (v != null && v.length > 0) {
                        var t = this.options[this.selectedIndex].text;
                        tag.push(t);
                    }
                });*/
                var data = Controller.getFormText();
                $.each(data,function(name,val){
                    tag.push(encodeURIComponent(val));
                })
                str = tag.join('|');
            } catch (e) { }
            return str;
        },

        // 获取标题和参数拼接值
        getTitleAndTag: function() {
            var str = '';
            try {
                // 标题
                var title = $('#Title').val();
                if (title == null) title = '';

                // 参数值
                var tag = $.bll.keywords.getParaJoinValue();

                // 拼接
                str = 't=' + title + '&tag=' + tag;
            } catch (e) { }
            return str;
        },

        init: function() { }
    };
    $.extend({
        //获得用来统计的时间参数
        getShowData:function () {
            var date = new Date(); //日期对象
            var now = "";
            now += date.getFullYear() + "-";
            now += (date.getMonth() + 1) + "-";
            now += date.getDate() + " ";
            now += date.getHours() + ":";
            now += date.getMinutes() + ":";
            now += date.getSeconds();
            return now;
        }
    });
    /*IE6,7,8 不支持 bind */
    if (!Function.prototype.bind) {
        Function.prototype.bind = function(obj) {
            var _self = this
                ,args = arguments;
            return function() {
                _self.apply(obj, Array.prototype.slice.call(args, 1));
            }
        }
    }
    /*IE6,7,8 不支持 forEach */
    if ( !Array.prototype.forEach ) {

          Array.prototype.forEach = function forEach( callback, thisArg ) {

            var T, k;

            if ( this == null ) {
              throw new TypeError( "this is null or not defined" );
            }
            var O = Object(this);
            var len = O.length >>> 0; 
            if ( typeof callback !== "function" ) {
              throw new TypeError( callback + " is not a function" );
            }
            if ( arguments.length > 1 ) {
              T = thisArg;
            }
            k = 0;

            while( k < len ) {

              var kValue;
              if ( k in O ) {

                kValue = O[ k ];
                callback.call( T, kValue, k, O );
              }
              k++;
            }
          };
    }
    /*IE6,7,8 不支持 indexOf */
    if (!Array.prototype.indexOf)
        {
          Array.prototype.indexOf = function(elt /*, from*/)
          {
            var len = this.length >>> 0;
            var from = Number(arguments[1]) || 0;
            from = (from < 0)
                 ? Math.ceil(from)
                 : Math.floor(from);
            if (from < 0)
              from += len;
            for (; from < len; from++)
            {
              if (from in this &&
                  this[from] === elt)
                return from;
            }
            return -1;
          };
    }
    return Util;
});
define('component/commpop/js/commpop',[], function(){
//弹窗组件--单例
var commPop = function(config){
	var def = {
		src: "src",
		title: "title",
		titleCenter:"true",
		width: "width",
		height: "height",
		canClose: "false",
		callbackfn: "callbackfn",
		extParm: "extParm"
	};
	this.config = config//util.mixin(def, config);
	this.src = (this.src||config.src);
	this.title = (this.title||config.title);
	this.titleCenter = (this.titleCenter||config.titleCenter);
	this.width = (this.width||config.width);
	this.height = (this.height||config.height);
	this.canClose = (this.canClose||config.canClose);
	this.callbackfn = (this.callbackfn||config.callbackfn);
	this.extParm = (this.extParm||config.extParm);
	// 判断是否存在实例
    if (!!this.constructor.instance) {
        return this.constructor.instance;
    }

    this.topheight = config.topheight||66;
    this.title||(this.topheight=0);

    this.init(this.config);
    // 缓存
    this.constructor.instance = this;
};
commPop.prototype = {
	constructor: commPop,
	init: function(){
		this.initMask();
		this.initForm();
	},
	isIE: function(){
		return (document.all) ? true: false;
	},
	isIE6: function(){
		return (this.isIE() && ([/MSIE (\d+)\.0/i.exec(navigator.userAgent)][0][1] == 6));
	},
	initMask: function(){
		var that = this;
		var width = screen.width;
		var height = screen.height;
		var position = that.isIE()?"absolute":"fixed";
		/*ie6挡住select*/
		this.maskIframe = $("<iframe>").attr('id', "feComPopMaskIframe");
		/*遮罩层*/
		this.mask = $("<div>").addClass('feComPopMask').attr("id","feComPopMask");
		this.mask.css({
			width: width,
			height: height,
			position: position
		});
		
		this.mask.append(this.maskIframe);
		$(top.document.body).append(this.mask);

		if (that.isIE()) {
			top.document.getElementsByTagName("html")[0].style.overflow = "hidden";
			top.document.getElementsByTagName("html")[0].style.paddingRight = "17px";
		} else {
			top.document.body.style.overflow = "hidden";
			top.document.body.style.paddingRight = "16px";
		}
		if (that.isIE()) {
			this.mask[0].style.top = (top.document.documentElement.scrollTop || top.document.body.scrollTop) + "px";
		}
	},
	initForm: function(){
		var that = this;

		this.createComPop();
		this.installComPop();
		this.loadContains();
	},
	createComPop: function(){
		var that = this;
		this.createForm();

		this.createWrap();
		this.createFrame();

		this.createContains();
		
		this.createTopBar();
		this.createLoading();
		this.createIframe();
		this.createElemDom();
	},
	installComPop: function(){
		var that = this;
		that.form.append(that.wrap);
		that.wrap.append(that.frame);
		that.wrap.append(that.contains);

		that.contains.append(that.topbar);
		that.contains.append(that.loading);
		that.contains.append(that.iframeContains);
		that.contains.append(that.domContains);

		$(top.document.body).append(that.form);
	},
	loadContains: function(){
		if (!this.src) return
		var isJQuery = this.src instanceof jQuery;
		isJQuery? this.loadDomContains(this.src):this.loadIframeContains(this.url);
	},
	delMask: function(){
		var that = this;
		this.mask.remove();
		this.form.remove();
		if (that.isIE()) {
			top.document.getElementsByTagName("html")[0].style.overflow = "";
			top.document.getElementsByTagName("html")[0].style.paddingRight = "";
		} else {
			top.document.body.style.overflow = "";
			top.document.body.style.paddingRight = "";
		}
		this.constructor.instance = null;
	},
	/*创建dom元素*/
	createForm: function(){
		var that = this;
		var form = $('<div class="feComPop" id="feComPop"></div>');
		var marginLeft = -(that.width / 2)+"px";
		var marginTop = -(that.height / 2)+"px";
		form.css({
			marginLeft: marginLeft,
			marginTop: marginTop
		});
		/*处理ie6*/
		if (that.isIE6()) {
			form[0].style.top = (document.documentElement.scrollTop || document.body.scrollTop) 
			+ Math.round(50 * (document.documentElement.offsetHeight || document.body.clientHeight) / 100);
		}
		that.form = form;
	},
	createWrap: function(){
		var that = this;
		var feComPopWrap = $('<div class="feComPopWrap" ></div>');
		this.wrap = feComPopWrap; 
	},
	createFrame: function(){
		var that = this;
		var feComPopframe = $("<div>").addClass('feComPopframe').css({
			height: that.height,
			width: that.width
		}).hide();
		this.frame = feComPopframe;
	},
	createContains: function(){
		var that = this;
		var feComPopContains = $("<div>").addClass('feComPopContains').css({
			height: that.height,
			width: that.width,
			overflow: "hidden"
		});
		this.contains = feComPopContains;
	},
	createTopBar: function(){
		var that = this;
		that.title = that.title||"";
		var feComPopTopbar = $('<div class="feComPopTopbar">'+
			'<span>'+
				'<a class="feComPopClosebtn" href="javascript:void(0);">&#10005;</a>'+
			'</span>'+
			'<span class="feComPopTitle">'+ that.title + '</span>'+
		'</div>');
		(!that.canClose)&&feComPopTopbar.find(".feComPopClosebtn").hide();
		that.title || feComPopTopbar.hide();
		that.titleCenter && feComPopTopbar.css('textAlign', 'center');

		//标题样式处理
		if(typeof that.config.titleStyle === 'object'){
			for(var s in that.config.titleStyle){
				feComPopTopbar.css(s,that.config.titleStyle[s]);
			}
		}

		feComPopTopbar.find(".feComPopClosebtn").parent().click(function() {
			that.delMask();
		});
		this.topbar = feComPopTopbar;
	},
	createLoading: function(){
		var that = this;
		var height = this.height - this.topheight;
		var feComPopLoading = $("<div>加载中...</div>").addClass('feComPopload');
		feComPopLoading.css('height', 'value');
		//加载loading样式处理
		if(typeof that.config.loadingStyle === 'object'){
			for(var s in that.config.loadingStyle){
				feComPopLoading.css(s,that.config.loadingStyle[s]);
			}
		}
		this.loading = feComPopLoading;
	},
	createIframe: function(){
		var that = this;

		var height = this.height - this.topheight;
		var feComPopIframe = $("<iframe>").attr({
			frameborder: '0',
			scrolling: 'no'
		}).addClass('feComPopiframe').css('height', height);
		if (!this.title) feComPopIframe.css('borderRadius', 4);
		this.iframeContains = feComPopIframe;
	},
	createElemDom: function(){
		var that = this;
		var height = this.height - this.topheight;
		var feComPopDom = $("<div>").addClass('feComPopDom').css('height', height);
		this.domContains = feComPopDom;
	},

	/*加载资源*/
	loadIframeContains: function(){
		var that = this;
		that.domContains.hide();
		that.iframeContains.attr('src', this.src);
		that.iframeContains.load(function(){
			//样式处理
			if(typeof that.config.iframeStyle === 'object'){
				for(var s in that.config.iframeStyle){
					that.iframeContains.css(s,that.config.iframeStyle[s]);
				}
			}
			that.loading.hide();
		});
		//this.loading.hide();
	},
	loadDomContains: function(){
		this.iframeContains.hide();
		this.domContains.append(this.src).show();
		this.loading.hide();
	}
};
window.commPop = commPop
return commPop;
})

;
/*
*@赵旭旭  2016/6/30  这个弹窗在我做POST-3486需求前已经不兼容ie6了，具体表现为：第三个认证方式（POST-3486需求前为芝麻信用/更多支付方式）样式错乱。经过与pm（@梁凡）沟通，本次需求不管ie6
*/
define('component/paypost/js/paypost',["util/util", "component/commpop/js/commpop","util/cookie"],function(util, commpop,cookie){
	var PayPost = function(param){
		var defPayParam = {};
		var defPopParam = {
			src: '',
			title: "标题",
			titleCenter:"true",
			width: "560",
			height: "360",
			canClose: false
		};
		this.url4ajaxPayState = "//post.58.com/repo/payment/paystate";
		this.defPopParam = defPopParam;
		this.defPayParam = util.mixin(defPayParam, param);
		//this.init(param);
	};
	PayPost.prototype = {
		constructor: PayPost,
		init: function(j, extMap){

            var city = ____json4fe["locallist"]["listname"];
			var cate = ____json4fe["catentry"][1]["listname"];
	        /*日志统计头*/
	        var payType = j.bizExt.payType;
	        var payTypes = {
	            "identityCheckPay":"i",
	            "monthlyLimitPay":"m",
	            "dailyLimitPay":"d"
	        };
	        if (!payTypes[payType]) {
	        	payTypes[payType] = payType.split("")[0];
	        };

        	this.log4citycateway = city+"_"+cate+"_" + payTypes[payType]+"_";
            this.cate = cate;
            this.payType = j.bizExt.payType;

			this.j = j;
			var bizExt = j.bizExt;
			/*var guidePageTitle = "身份认证";
			if(bizExt.payType == "identityCheckPay"){
				guidePageTitle = "身份认证"
			}else if(bizExt.payType == "monthlyLimitPay"){
				guidePageTitle = "58支付"
			}else if(bizExt.payType == "dailyLimitPay"){
				guidePageTitle = "58支付"
			}  */

			var guidePageTitle = "付费发帖";
			if(bizExt.payType == "identityCheckPay"){
				guidePageTitle = "支付认证";
				//20160804 支付认证标题修改
                if (typeof bizExt["identityTitle"] == 'string' && $.trim(bizExt["identityTitle"]).length > 0) {
                	guidePageTitle = bizExt["identityTitle"];
        		}
			}
			/*支付URL*/
			this.payUrl = bizExt.payUrl;
			/*支付信息ID*/
			this.payInfoId = bizExt.payInfoId;
			/*订单信息ID*/
			this.orderId = bizExt.orderId;

			this.payTip = bizExt.payTip;
			if (bizExt.payTitle && bizExt.payTitle != ""&& bizExt.payTitle!=this.payTip) {
                this.payTip = bizExt.payTitle+this.payTip;
            }
            this.useMorePayWay = bizExt.useMorePayWay;
			//付费发帖相关参数
			this.payParam = util.mixin(this.defPayParam, bizExt.payParam);
			/*芝麻信用认证URL*/
			this.zmrzUrl=bizExt.zmrzUrl;
			/*芝麻信用认证参数*/
			this.zmrzParam=bizExt.zmrzParam;

			//415 435 个人和商家弹窗高度
			var bizHeight = {
				"0": "347", //变样子啦 @赵旭旭 // "0": "435",//个人-展示以商家身份发帖(刷新+商家身份发帖)
				"1": "347",//商家-只展示刷新
				"def": "347"//默认只展示一个
			};

			this.payIsBiz = bizExt.payIsBiz;
			var popHeight;
			if (typeof this.payIsBiz != "undefined") {
				popHeight = bizHeight[this.payIsBiz];
			}else if(bizExt.payIsLicenseVerified==="0"){
				popHeight = bizHeight[bizExt.payIsLicenseVerified];
			}else{
				popHeight = bizHeight["def"];
			}
			this.popHeight=popHeight;

			// 弹窗页面生成
			var guidePage = this.getPayGuidePage(this.payParam,this.zmrzParam);

			//调起弹窗的参数
			var canclose = (typeof extMap != "undefined")? (extMap.canClose||false) : false;
			var guidePageParm = util.mixin(this.defPopParam, {
				src: guidePage,
				title: guidePageTitle,
				titleCenter:"true",
				width: "560",
				height: popHeight,
				canClose: canclose,
                payType: this.payType,
                cate: this.cate
			});
			

			this.guidePageParm = guidePageParm;
			//调起弹窗
			this.payGuidePop = new commpop(guidePageParm);
			//统计展现
			clickLog("from="+this.log4citycateway+"pc_release_pay_show");
			if(____json4fe.catentry[1].dispid == 29){
				clickLog("from=pc_escfb_pay")
			}
			
			//绑定弹窗相关事件
			this.bindGuidePageEvents();
			/*序列化*/
            
            //弹窗出现埋点
            var logMsg = "";
            this.payType === "identityCheckPay"
            ? logMsg = "zfrz_i_pc_releasepop_show_" + this.cate
            : logMsg = "ftsx_i_pc_releasepop_show_" + this.cate;
            clickLog(logMsg);
		},
		getPayGuidePage: function(payParam,zmrzParam){
			var that = this;
			/*var ppu = cookie.get("58cooper")
			var uid = (ppu.match(/userid=(\d*)&/)) ? RegExp.$1 : '';
			var uid = ppu?((ppu.match(/userid=(\d*)&/)) ? RegExp.$1 : ''): payParam.buyAccountId;*/

			var uid = payParam.buyAccountId;
			/*微信支付URL*/
			var wxPayUrl = this.payUrl+"?channelId="+payParam.weixinChannelId+"&buyAccountId="+uid;
			/*支付宝支付URL*/
			var aliPayUrl = this.payUrl+"?channelId="+payParam.alipayChannelId+"&buyAccountId="+uid;
			/*其他支付方式支付*/
			var otherPayUrl = this.payUrl+"?buyAccountId="+uid;
			for(var k in payParam){
				if (k=="weixinChannelId"||k=="alipayChannelId"||k=="buyAccountId") {
					continue;
				}else {
					wxPayUrl += "&" + k + "=" + payParam[k];
					aliPayUrl += "&" + k + "=" + payParam[k];
					otherPayUrl += "&" + k + "=" + payParam[k];
				}
			}
            //二手车业务线要求保留“更多支付方式”
            that.useMorePayWay = true;//二手车汽车服务特有属性
            var payWXHtmlStr = '';
            var morePayWayHtmlStr = '';
            if(that.useMorePayWay){
                payWXHtmlStr = '<li id="payListsWX"><a data-ajax-href="'+wxPayUrl+'" href="'+wxPayUrl+'" class="payicon payListsWXicon" target="_blank"></a>微信支付<span class="payListsEm">￥'+payParam.orderMoney+'</span></li>';
                morePayWayHtmlStr = '<li id="payListsOT"><a href="'+otherPayUrl+'" class="payicon payListsOTicon"></a>更多付款方式</li>';
            } else{
                payWXHtmlStr = '<li id="payListsWX" class = "noMorePayWay"><a data-ajax-href="'+wxPayUrl+'" href="'+wxPayUrl+'" class="payicon payListsWXicon" target="_blank"></a>微信支付<span class="payListsEm">￥'+payParam.orderMoney+'</span></li>';
            }
			var contains = $('<div class="payGuide">'+
				'<div class="payGuideTip">'+
					'<div>'+that.payTip+'</div>'+
				'</div>'+
				'<div class="payListsWrap">'+
					'<ul class="payLists clearfix">'+
						payWXHtmlStr+
						'<li id="payListsAL"><a href="'+aliPayUrl+'" class="payicon payListsALicon" target="_blank"></a>支付宝支付<span class="payListsEm">￥'+payParam.orderMoney+'</span></li>'+
                        morePayWayHtmlStr+
					'</ul>'+
				'</div>'+
			'</div>');

			if(this.j.bizExt.payType=="identityCheckPay" && this.j.bizExt.useZhima && this.j.bizExt["zmrzUrl"]){
				/*芝麻认证*/
				var zmrzUrl = this.zmrzUrl+"?payInfoId="+this.payInfoId+"&orderId="+this.orderId;
				if(typeof zmrzParam === 'object'){
					for(var p in zmrzParam){
						zmrzUrl += "&" + p + "=" + zmrzParam[p];
					}
				}
                //如果用户填写的电话不是手机号（主要指座机号），不可以芝麻认证
                var zhiMaATag = '';
                var mobileRegExp = /^(13|14|15|18|17)\d{9}$/;
                if( mobileRegExp.test(zmrzParam['Phone']) ){
                    zhiMaATag = '<li id="payListsZM"><a data-href="'+zmrzUrl+'" href="javascript:void(0);" class="payicon payListsZMicon"></a>芝麻信用<span class="payListsEm">免费认证</span></li>';
                } else{
                    zhiMaATag = '<li id="payListsZM" class = "greyPayListsZM"><a href="javascript:void(0);" class="payicon greyPayListsZMicon"></a>芝麻信用<span class="greyPayListsEm">免费认证</span>'+
                    '<p style="font-size: 12px; margin: 0;">(联系人电话非手机号码)</p></li>';
                }
				/*支付认证模板*/
				contains = $('<div class="payGuide">'+
					'<div class="payGuideTip">'+
						'<div>'+that.payTip+'</div>'+
					'</div>'+
					'<div class="payListsWrap">'+
						'<ul class="payLists rzLists clearfix">'+
							zhiMaATag+
							'<li id="payListsWX"><a data-ajax-href="'+wxPayUrl+'" href="'+wxPayUrl+'" class="payicon payListsWXicon" target="_blank"></a>微信支付<span class="payListsEm">￥'+payParam.orderMoney+'</span></li>'+
							'<li id="payListsAL"><a href="'+aliPayUrl+'" class="payicon payListsALicon" target="_blank"></a>支付宝支付<span class="payListsEm">￥'+payParam.orderMoney+'</span></li>'+
						'</ul>'+
					'</div>'+
				'</div>');
			}

			this.guidePage = contains;

			/*刷新需求*/
			//this.bizRefresh();  //此函数控制的文案展示要去掉  @2016.6.28  @zhaoxuxu

			this.payWXEwm = this.guidePage.find('#payListsWX');
			this.payWX = this.guidePage.find('.payListsWXicon');
			this.payAL = this.guidePage.find('.payListsALicon');
			this.payOT = this.guidePage.find('.payListsOTicon');
			this.payZM = this.guidePage.find('.payListsZMicon');

			/*身份认证干掉其他支付方式*/
			/*if (this.j.bizExt.payType=="identityCheckPay") {
				// this.guidePage.find("#payListsOT").hide();
				this.guidePage.find("#payListsOT").remove();
			}*/
			
			return contains;
		},
		bizRefresh: function(){

			this.guidePage.addClass('payGuideRefresh');
			var refresh = $('<p class="refresh">\
				已有帖子未获得效果？刷新获取更多效果！\
					<a href="//my.58.com/" target="_blank">\
						免费去刷新&gt;&gt;\
					</a>\
				</p>');
			this.guidePage.append(refresh);
			var rzLicenseRefresh = $('<p style="margin:0px" class="refresh">\
				通过认证身份证，可将账户免费发布条数新增10条!\
					<a href="//my.58.com/authrealname" target="_blank">\
					去认证身份证&gt;&gt;\
					</a>\
				</p>');
			if(this.isVerifiedName!=undefined&&this.isVerifiedName=="0"){
				this.guidePage.append(rzLicenseRefresh);
			}
			//addClass payGuideRefresh
			if(this.payIsBiz=="0"){
				var bizRefresh = $('<p class="bizRefresh">\
					若您是商家，请以商家身份获得更多免费发布条数！\
						<a href="//post.58.com/" target="_blank">\
							以商家身份发帖&gt;&gt;\
						</a>\
					</p>');
				this.guidePage.append(bizRefresh);
			}else if(this.j.bizExt.payIsLicenseVerified=="0") {

				var zpLicenseRefresh = $('<p class="bizRefresh">\
				第三方认证营业执照，可将账户发布条数提升至30条！\
					<a href="//my.58.com/pro/safeset/authbiz" target="_blank">\
						去认证营业执照&gt;&gt;\
					</a>\
				</p>');
				this.guidePage.append(zpLicenseRefresh);
			}
		},
		getPayStatePage: function(){
			var state = $('<div class="payState">'+
				'<div class="payStateTip">'+
					'<div>请在新打开的支付页面上完成付款，付款完成前请不要关闭此窗口。 如您在支付过程中遇到问题，请联系客服：  <span class="payim"><span class="payimicon"></span><a class="paycontact" href="http://about.58.com/">联系客服</a></span></div>'+
				'</div>'+
				'<div class="payStateBtn">'+
					'<ul>'+
						'<li id="paySuccess"><div class="payBtn">已完成支付</div></li>'+
						'<li id="payAgain"><div class="payBtn">重新支付</div></li>'+
					'</ul>'+
				'</div>'+
			'</div>');
			this.statePage = state;
			this.payFinish = this.statePage.find('#paySuccess');
			this.payAgain = this.statePage.find('#payAgain');
			return state;
		},
		bindStatePageEvents: function(){
			var that = this;
			var log4citycateway = this.log4citycateway;
			this.payFinish.on('click', function(event) {

				clickLog("from="+log4citycateway+"pc_releasepop_payfinish");

				that.ajaxPayState(function(res){
					//{"errorCode":0,"errorMsg":"success","data":{"url":"跳转url"}}
					//跳转成功页
					//console.log("success");
					if (res.errorCode==0) {
						window.location.href = res.data.url;
					}else{//支付失败处理
						//console.log("支付失败")
						window.location.href = res.data.url;
					}
				})
			});

			this.payAgain.on('click', function(event) {

				clickLog("from="+log4citycateway+"pc_releasepop_payagain");

				that.ajaxPayState(function(res){
					/*支付成功*/
					if (res.errorCode==0) {
						window.location.href = res.data.url;
					}else{
                        //两种情况后端会返回支付失败：1、用户没付钱；2、新的高额订单生成了。故去取最新弹窗信息
                        that.payStatePop.delMask();
                        that.ajaxPayParams(function(res){
                            that.init(res);
                        });
					}
				})
			});
		},
		ajaxPayState: function(callback){
			var that = this;
			$.ajax({
				url: that.url4ajaxPayState,
				type: 'get',
				data: {infoid: that.payInfoId,platfrom:"pc",paytype:that.j.bizExt.payType,orderid:that.orderId},
				success: function(res){
					if (callback) callback.call(that,res)
				}
			})
		},
        
        //取最新的弹窗信息
        ajaxPayParams: function(callback){
            var that = this;
            var ajaxPayParamsUrl = "//post.58.com/repo/payment/payparams";
            
            $.ajax({
                url: ajaxPayParamsUrl,
                dataType: "jsonp",
                async: false,
                data: {infoid: that.payInfoId, platfrom: "pc"},
                success: function(res){
                    callback.call(that, res);
                },
                error: function(e){
                }
            })
        },
		bindGuidePageEvents: function(){
			/*tj_zufang*/
            var log4citycateway = this.log4citycateway;
            
			var that = this;
			/*点击统计*/
			if(this.payOT){
				this.payOT.on('click', function(event) {
					clickLog("from="+log4citycateway+"pc_releasepop_morepay");
				});
			}
			this.payWX.on('click', function(event) {
                var logMsg = '';
                that.payType === 'identityCheckPay'
                ? logMsg = "zfrz_i_pc_releasepop_wechatpay_" + that.cate
                : logMsg = "ftsx_i_pc_releasepop_wechatpay_" + that.cate;
                clickLog("from=" + logMsg);
			});
			this.payAL.on('click', function(event) {
                var logMsg = '';
                that.payType === 'identityCheckPay'
                ? logMsg = "zfrz_i_pc_releasepop_alipay_" + that.cate
                : logMsg = "ftsx_i_pc_releasepop_alipay_" + that.cate;
                clickLog("from=" + logMsg);
			});
			this.guidePage.on('click', '.payListsWXicon, .payListsALicon', function(event) {
				//点击统计
				
				/*支付提示*/
				that.payGuidePop.delMask();
				that.payStatePop = new commPop({
					src: that.getPayStatePage(),
					title: "支付提示信息",
					titleCenter:"true",
					width: "560",
					height: "250",
					canClose: false
				});
				that.bindStatePageEvents();
				/*微信支付需求暂时注释, PM后续可能加上*/
				//clearTimeout(that.payPoll);
			});

			/*点击芝麻认证*/
			if(this.payZM){
				this.payZM.on('click', function(event) {
					//统计埋点:点击弹窗的芝麻信用认证
                    clickLog("from=zfrz_i_pc_releasepop_zhima_" + that.cate);
				});

				this.guidePage.on('click', '.payListsZMicon', function(event) {

					var postZmrzAfterFourUrl=$(this).attr("data-href");
					if(postZmrzAfterFourUrl!='undefined' && typeof postZmrzAfterFourUrl == 'string'){
						$.ajax({
							url: postZmrzAfterFourUrl,
							type: "get",
							dataType:"json",
							success: function(data){
								that.zmxyUrl=data.zmxyUrl;
								that.initZmrzAfterFourPop();
								//芝麻结果初始化
								window.initZmrzResult=function(certify_data){
									if(typeof certify_data !== 'object'){
										return;
									}

									if(that.zmrzAfterFourPop && that.zmrzAfterFourPop.topbar){
										var feComPopGoBackbtnDom=that.zmrzAfterFourPop.topbar.find(".feComPopGoBackbtn");
										//芝麻验证成功隐藏返回按钮
										if(certify_data["certify_result"]=="true" && feComPopGoBackbtnDom.length>0){
											feComPopGoBackbtnDom.hide();
										}else{
											feComPopGoBackbtnDom.attr("certify_errorcode",certify_data["certify_errorcode"]);
										}
									}
								};
								window.goPayPostGuidePage=function(certify_data,type){
									if(typeof type ==='string' && type=="zmrzTryAgain"){
										that.initZmrzAfterFourPop();
										//统计埋点:验证失败的页面，点击“重试“
										clickLog("from="+that.log4citycateway+"pc_releasepop_zmrz_identitynumber_tryagain");
									}else{
										that.zmrzToGuidePage(certify_data);
									}
								};

							}
						})
					}

				});

			}

		},
		initZmrzAfterFourPop:function(){
			var that = this;
			if(that.payGuidePop){
				that.payGuidePop.delMask();
			}
			if(that.zmrzAfterFourPop){
				that.zmrzAfterFourPop.delMask();
			}
			that.zmrzAfterFourPop = new commPop({
				src: that.zmxyUrl,
				url: that.zmxyUrl,
				title: "<span class='feComPopGoBackbtn'><i></i>返回</span>",
				titleStyle:{
					position: "absolute",
					top: "0px",
					left: "0px",
					border:"none"
				},
				loadingStyle:{
					height: that.popHeight,
					padding: "0px"
				},
				width: "560",
				height: that.popHeight,
				iframeStyle:{
					height: "604",
					//margin:"-174px auto 0px"
					margin:"-174px 0px 0px -40px"
				},
				canClose: false
			});
			that.bindZmrzPageEvents();
		},
		bindZmrzPageEvents:function(){
			var that = this;
			if(that.zmrzAfterFourPop && that.zmrzAfterFourPop.topbar){
				that.zmrzAfterFourPop.topbar.find(".feComPopGoBackbtn").on('click', function(event) {
					that.zmrzToGuidePage();

					if(typeof($(this).attr("certify_errorcode"))=="undefined"){
						//统计埋点:点击身份证后四位页面的返回
						clickLog("from="+that.log4citycateway+"pc_releasepop_zmrz_identitynumber_return");
					}else{
						//统计埋点:所有认证失败的页面，点击“返回”
						clickLog("from="+that.log4citycateway+"pc_releasepop_zmrz_fail_return");
					}
				});
			}
		},
		zmrzToGuidePage:function(certify_data){
			var that = this;
			if(that.zmrzAfterFourPop){
				that.zmrzAfterFourPop.delMask();
				window.goPayPostGuidePage=null;
				window.initZmrzResult=null;
			}
			//弹出支付引导页
			that.init(that.j);
			//统计埋点:验证失败的页面点击“选择其他认证方式”
			if(typeof certify_data === 'object'){
				clickLog("from="+that.log4citycateway+"pc_releasepop_zmrz_identitynumber_other");
			}
		}
			/*微信支付需求暂时注释, PM后续可能加上*/
			// this.payWX.on('click', function(event) {
			// 	var $this = $(this);
			// 	event.preventDefault();
			// 	$.ajax({
			// 		url: $this.attr("data-ajax-href")+"&callback=kkk",
			// 		type: "get",
			// 		dataType: "jsonp",
			// 		success: function(res) {
			// 			console.log("success");
			// 			//{"errorCode":0,"errorMsg":"success","data":{"url":"pic-url"}}
			// 			if (res.errorCode==0) {
			// 				that.loadWeChatEwm(res.data.url)
			// 			}
			// 		},
			// 		error: function(e){
			// 			that.loadWeChatEwm();
			// 			console.log(e)
			// 		}
			// 	})
			// });

			// this.payAL.on('click', function(event) {
			// 	//event.preventDefault();
			// 	that.payGuidePop.delMask();
			// 	that.payStatePop = new commPop({
			// 		src: that.getPayStatePage(),
			// 		title: "支付提示信息",
			// 		titleCenter:"true",
			// 		width: "560",
			// 		height: "250",
			// 		canClose: true
			// 	});
			// 	that.bindStatePageEvents();
			// 	clearTimeout(that.payPoll);
			// });
		// },
		// loadWeChatEwm: function(){
		// 	this.payWXEwm.html("").css("background","#ccc");
		// 	this.pollAjaxPayState();
		// },	
		// pollAjaxPayState: function(){
		// 	var that = this;
		// 	var paystate = false;
		// 	(function(){
		// 		var callee = arguments.callee;
		// 		if(paystate) clearTimeout(that.payPoll);
		// 		$.ajax({
		// 			url: "//post.58.com/repo/checkPay",
		// 			type: 'get',
		// 			async: false,
		// 			data: {infoid: that.payInfoid},
		// 			success: function(res){
		// 				if (res.errorCode==0) {
		// 					paystate = true;
		// 					/*成功页*/
		// 					window.location.href = res.data.url;
							
		// 				}else{
		// 					//支付没成功
		// 					console.log("支付没成功");
		// 				}
		// 			}
		// 		})
		// 		if (!paystate)
		// 		that.payPoll = setTimeout(function(){
		// 			callee();
		// 		},1000)
		// 	})();
		// }
	}
	return new PayPost;
});
/**
 * 文本输入框
 * @module component/Submit
 */
define('component/submit/js/submit',['component/base/js/base' , 'util/Class', 'component/popwin/js/popwin', 'Controller/Controller', 'util/postClickLog', 'component/validate/js/validate',"component/paypost/js/paypost"], function(Base, Class, Popwin, Controller, Log, validate, paypost) {

	/**
	 *  @constructor
	 *  @alias module:component/Submit
	 *  @param {Object} opt 配置文件
	 */
	var Submit = Class.extend(Base);

	/**
	 * 默认的className。包括wrap、title、content、multi
	 * @type {Object}
	 */
	Submit.prototype.CLASS = {
		/** @type {String} 容器的className */
		WRAP: 'submit_wrap',
		/** @type {String} 标题的className */
		TITLE: 'input_text_title',
		/** @type {String} 内容区域的className */
		CONTENT: 'input_text_content',
		/** @type {String} 当前后有内容时，需要增加的class */
		MULTI: 'clearfix'
	};
	Submit.prototype.type = 'submit';
	/*全局变量，用于判断现在是否可点击发布*/
	Submit.prototype.s_canSubmit = true;
	/*全局变量，用于判断是否出现异地消耗触发验证码*/
	Submit.prototype.yidiValidate = false;
	Submit.prototype.yidiCode = '';
	Submit.prototype.createElem = function() {
		var opts = this.opts;
		this.container = $('<div>').addClass(this.CLASS.WRAP);
		this.elem = $('<span>').html('发布');
		this.container.append(this.elem);
		// 增加自定义属性
		for(var key in opts.attr) {
			if(opts.attr.hasOwnProperty(key)) {
				this.elem.attr(key, opts.attr[key]);
			}
		}
		this.setElemView();
	};
	Submit.prototype.focusTo = function() {
		this.elem.focus();
	};
	Submit.prototype.bindDomEvent = function() {
		var _self = this;
		_self.elem.bind('blur', function(e) {
			var target = e.relatedTarget;
			// input做特殊处理
			_self.doCheck();
			// 当焦点转移到行外时，触发整行的doCheck
			if($(target).parents('.rows_wrap')[0] !== _self.rows.containerElem[0]) {
				_self.rows.doCheck();
				if(!!window.navigator.userAgent.toUpperCase().match('MSIE 6.0')){
					_self.elem.parent().parent().find(".tip").html("");
				}
			}
		});
		_self.elem.bind('focus', function(){
			// console.log('Submit focus')
			_self.setClassByStatus(Submit.SETTING.STATUS.FOCUS);
			_self.elem.triggerHandler('focusin');
			if(!!window.navigator.userAgent.toUpperCase().match('MSIE 6.0')){
				_self.elem.parent().css("border","none");
			}
		});
		_self.elem.bind('click', function(e,otherFormData) {
			Log.send('post_fill_release');
			e.preventDefault();
			Submit.prototype.submitClickLog();
			var bValid = Controller.isFormValidate();
			if(window.location.host!="post.58.com"){
				window.console.info&&window.console.info(Controller.getFormData());
			}
			// 先判断是否能提交，如果未登陆，无需验证表单
			if(Controller.canSubmit() === false) {
				return;
			}

			if(bValid && _self.s_canSubmit) {
				_self.s_canSubmit = false;
				Log.sendJson('from=Post_TriggerEventTime&key=formSubmit&eventTime=' + (new Date()).getTime());
				//整个发布的计时埋点
				if(Log.postTimeMsg){
					var postTime = (((new Date()).getTime() - Log.postTimeMsg.time)/1000).toFixed(1);
					Log.sendJson('from=escpc_'+Log.postTimeMsg.logmsg+'_'+postTime);
				}
				_self.elem.addClass('disabled');
				_self.elem.html('正在发布...');
				var location = document.location;
				var data = Controller.getFormData();
				if(otherFormData && typeof otherFormData === 'object'){
					$.extend(data, otherFormData)
				}
				//只有服务区域控件和区域商圈控件同时存在的时候传递单元参数newdizhi以|分隔
				var newdizhiData=_self.getNewdizhiFromFormData(data);
				if(newdizhiData){
					$.extend(data, newdizhiData);
				}
				Log.send('post_fill_success');
				var pathName= document.location.pathname;
				if(pathName.substr(pathName.length-1)=="/"){
					pathName=pathName.substr(0,pathName.lastIndexOf("/"));
				}
				data.captcha_verify_version="v2";//验证码无极升级v2版本标识
				if(data.faburen!=null){
					data.isbiz = data.faburen;//临时兼容二手车,以后谁看见了就删掉
				} 
				/*异地扣费触发验证码校验----点击发布之后将传过去的验证码变为第二个触发之后的验证码---starts*/
				if(_self.yidiValidate){
					var validateCode = {'phonevalidate':_self.yidiCode};
					$.extend(data, validateCode);
					_self.yidiValidate = false;
				}
				/***end***/
				var submitUrl='//post.58.com' + pathName + '/submit' + document.location.search;
				$.ajax({
					url: submitUrl,
					type: 'post',
					dataType: 'json',
					data: data,
					timeout: 30 * 1000,
					success: function(data){
						Log.sendJson('from=Post_TriggerEventTime&key=resultFeedback&eventTime=' + (new Date()).getTime());
						_self.analysResponse(data);
						//_self.s_canSubmit = true;
						_self.elem.removeClass('disabled');
						_self.elem.html('发布');
					},
					error: function(){
						Log.sendJson('from=Post_TriggerEventTime&key=resultFeedback&eventTime=' + (new Date()).getTime());
						_self.s_canSubmit = true;
						_self.elem.removeClass('disabled');
						_self.elem.html('发布');
					}
				})
			}
		});
	};
	//发布点击埋点每个类别重写此方法
	Submit.prototype.submitClickLog = function(){

	}
	//只有服务区域控件和区域商圈控件同时存在的时候传递单元参数newdizhi，其值为【区域|商圈】
	Submit.prototype.getNewdizhiFromFormData = function (data) {
		var newdizhiData = null;
		try {
			var servicerangeComp = Controller.records.get('servicerange');
			var localAreaComp = Controller.records.get('localArea');
			var localDiduanComp = Controller.records.get('localDiduan');
			if (servicerangeComp && localAreaComp && localDiduanComp) {
				if (servicerangeComp.opts.type == "serviceArea" && localAreaComp.opts.type == "selector" && localDiduanComp.opts.type == "selector") {
					if (data && data["newdizhi"] == undefined) {
						var newdizhiValue = data["localArea"];
						if (data["localDiduan"] != "") {
							newdizhiValue += "|" + data["localDiduan"];
						}
						newdizhiData = {"newdizhi": newdizhiValue};
					}
				}
			}
		} catch (e) {
		}
		return newdizhiData;
	};

	Submit.prototype.send = function(){
		this.elem.trigger('click');
	};
	/**
	 * 触发Controller和form表单的事件
	 * 供第三方或可插拔组件的使用
	 * @param  {String} eventType 事件类型
	 * @param  {Object} data      相关数据
	 * @return {}
	 */
	Submit.prototype.triggerHandler = function(eventType, data) {
		// 触发外部第三方调用的事件
		Controller.handlers.trigger(eventType, data);
		this.container.parents('form').triggerHandler(eventType, data);
	};
	window.userNeedBindCallBack = function(){
		/*设置回调函数后就不会自动跳转到path*/
		//完成绑定后用户自己去点击发布按钮完成发布;
		$("#c").html("");
	}
	Submit.prototype.handleWkBeforeLogin = function(j){
		//电话号码需要验证
		if (j.bizCode=="phoneVerifyCode") {
			Controller.limit.handleNeedYzm(j);
		}else if(j.bizCode=="userNeedBind"){
			$(document).loginClick({
                    	"source":"passport",
                        "divid":"c",
                        "path":location.href,
                        "callback":"userNeedBindCallBack",
                        "isShowClsBtn":false,
                        "hasBind":true})
			//Popwinfix.showPop( "","//passport.58.com/swk/preLogin",680, 433, false);
			//Popwinfix.fix().showLoad(false);
		}else if(j.bizCode=="checkCaptchaFail"){

			var yzminstance = Controller.records.get("yzm");
			var rowContainer = yzminstance.rows.containerElem;
			rowContainer.show();
			var tipElem = rowContainer.find('.tip');
			validate.showTip(tipElem, "验证码输入错误", "error", 0);
		}else if(j.bizCode=="phoneAssociateTooManyAccounts"){

			var yzminstance = Controller.records.get("yzm");
			var phoneinstance = Controller.records.get("Phone");
			var rowContainer = phoneinstance.rows.containerElem;
			var tipElem = rowContainer.find('.tip');
			validate.showTip(tipElem, "关联账号过多", "error", 0);
		}
	},
		Submit.prototype.handlePayPost = function(j){
			if (!(j.bizCode == "paymentPage")) return;
			//记录二手车支付弹窗出现的次数
			if(____json4fe.catentry[1].dispid == '29'){
				clickLog('from=escfb_pc_zftc');
			}
			paypost.init(j);
		},
		Submit.prototype.analysResponse = function(data) {			
			var bizCode = data.bizCode;
			var bizExt = data.bizExt;
			this.triggerHandler('afterSubmit', {
				action: bizCode,
				ext: bizExt
			});
			/*if (data.code==5) {
			 this.handleWkBeforeLogin(data);
			 }*/
			if(bizCode == "phoneVerifyCode" || bizCode == "userNeedBind" || bizCode == "checkCaptchaFail" || bizCode == "phoneAssociateTooManyAccounts"){
				this.handleWkBeforeLogin(data);
			}

			if (data.code==6) {
				this.handlePayPost(data);
			}
			switch(bizCode) {
				/*case "phoneVerifyCode":
				 this.phoneVerifyCode(data);*/
				// 重定向
				case 'redirect':
					this.redirect(bizExt.url);
					break;
				// 表单验证错误
				case 'formValidation':
					this.showFormValidation(bizExt);
					break;
				// 弹出验证码
				case 'verificationCode':
					this.showVerification(bizExt);
					break;
				// iqas验证错误
				case 'iqas':
					this.showError(bizExt);
					break;
				// 通用的错误
				case 'errMsg':
					this.showError(bizExt);
					break;
				// 蜘蛛抓取相关
				case 'cdata':
					this.showError(bizExt);
					break;
				// 异地消耗触发验证码------2016/6/29
				case 'showNeedPayCode':
					this.showNeedPayCode(bizExt);
					break;
				// @todo jump_xiaobao?
				case 'xiaobao':
					break;
				case 'pet_0':
					break;
				case 'pet_1':
					break;
				case 'pet_2':
					break;
				case 'huangye_0':
					break;
				case 'baiqiangxian_confirm':
					this.baiqiangxianConfirm(data);
					break;
				case 'baiqiangxian_forbidden':
					this.baiqiangxianForbidden(data);
					break;
				//看车地址校验失败-将联系人身份设置未商家，看车地址必填
				case 'checkCarAddressFailed':
					this.checkAddress();
					break;
				case 'AuthPopups':
					this.showYunXxrz(bizExt);
			}
			this.s_canSubmit = true;
		};
	/*
	 * 百强县提示判断 可以继续发布的情况 {"bizCode":"baiqiangxian_confirm","bizExt":"",msg:"百强县的名称","bizMsg":"","code":2,"msg":"","rs":"failed"}
	 */
	Submit.prototype.baiqiangxianConfirm = function(data) {
		var _self = this;
		var dialog = $('<div>').addClass('error_wrap');
		var contentElem = $('<div style="float:none">').addClass('content');
		dialog.append(contentElem);
		contentElem.append('<p>您好！<font color="#ed6d06">'+data.msg+'</font>已经独立建站，您的信息将发布到<font color="#ed6d06">'+data.msg+'</font>市！</p>');
		var extBtn = $('<a href="javascript:;">确定</a>');
		extBtn.bind('click', function(){
			//添加百强县参数，提交表单
			_self.elem.triggerHandler("click",{"topost":"1"});
		});
		var btnGroup = $('<div class="btn_group" style="text-align:center">').append(extBtn);
		contentElem.append(btnGroup);
		Popwin.show('', dialog, 640, 300, false, function(){});
	};
	/*
	 * 百强县提示判断 只能返回修改的情况 {"bizCode":"baiqiangxian_forbidden","bizExt":"",msg:"百强县的名称","bizMsg":"","code":2,"msg":"","rs":"failed"}
	 */
	Submit.prototype.baiqiangxianForbidden = function(data) {
		var dialog = $('<div>').addClass('error_wrap');
		dialog.append('<i><img src="//img.58cdn.com.cn/ui7/post/pc/imgs/error.png"></i>');
		var contentElem = $('<div>').addClass('content');
		dialog.append(contentElem);
		contentElem.append('<p>对不起，<font color="#ed6d06">'+data.msg+'</font>已经独立建站，只能选择<font color="#ed6d06">'+data.msg+'</font>或其他区域！</p>');
		var extBtn = $('<a href="javascript:;">返回修改</a>');
		extBtn.bind('click', function(){
			Popwin.hide();
		});
		var btnGroup = $('<div class="btn_group">').append(extBtn);
		contentElem.append(btnGroup);
		Popwin.show('', dialog, 640, 300, false, function(){});
	};
	/**
	 * 异地消耗触发验证码
	 * time:2016/6/29
	 */
	Submit.prototype.showNeedPayCode = function(data){
		var _self = this;
		var dialog = $('<div>').addClass('warn_wrap');
		var topTip = $('<div class="topTip">'
						+'<span>温馨提示</span>'
						+'</div>');
		var closeBtn = $('<i class="closeBtn"></i>')
		dialog.append(topTip.append(closeBtn));
		closeBtn.bind('click', function(){
				Popwin.hide();
		});
		var contentElem = $('<div>').addClass('content');
		dialog.append(contentElem);
		//提示信息
		contentElem.append('<div class="msg">'+data.msg+'</div>');
		//验证码行：验证码空格+发送验证码按钮+验证码提示信息
		//验证码提示信息：validate_error(错误)，validate_warning(提示)，validate_success(成功)
		//<div class="tip validate_error"><i></i>请填写行驶里程</div>'
		// + '<i></i>'
		// + '请填写行驶里程'
		var codeSend = $('<div class="codeSend">'
						+ '<input type="text" class="codeInput" placeholder="请输入验证码">'
						+ '<div class="sendBtn live">发送验证码</div>'
						+ '<div class="tip"></div>'
						+ '</div>');
		contentElem.append(codeSend);
		
		var btnGroup = $('<div class="btn_group">继续发布</div>');
		contentElem.append(btnGroup);
		Popwin.show('', dialog, 550, 285, false, function(){});

		/*事件处理*/
		/*1、点击发送按钮，倒计时，输入提示*/
		_self.sendBtnEvent(codeSend);
		

		var tip = $(codeSend.find('.tip'));
		/*2、输入框聚焦事件*/
		codeSend.find('.codeInput').bind('focus',function(){
			$(this).removeClass('red');
			_self.setStatus(tip,'','');
		});

		/*3、输入框失去事件*/
		codeSend.find('.codeInput').bind('blur',function(){
			if(codeSend.find('.sendBtn').hasClass('live')){
				$(this).addClass('red');
				_self.setStatus(tip,'validate_error','未发送验证码');
			}else{
				//验证验证码
				var code = $.trim($(this).val());
				if(code != ''){
					if(code.length != 6 || !(/^\d+$/g.test(code))){
						_self.setStatus(tip,'validate_error','验证码输入错误');
					}else{
						//验证验证码
						_self.ajaxValidate('//post.58.com/ajax/?action=ipcheckverifycode&source=car',{'phonevalidate':code},false,function(res){
							//验证正确
							if(res == true){
								//显示成功钩钩
								_self.setStatus(tip,'validate_success','');
								_self.yidiCode = code;
							}else{
								_self.setStatus(tip,'validate_error','验证码输入错误');
								btnGroup.removeClass('live');
							}
						});
					}
				}else{
					$(this).removeClass('red');
					_self.setStatus(tip,'validate_warning','请输入验证码');
				}
			}
		});

		/*3、继续发布按钮状态变化为可以点击，使用change事件监控*/
		codeSend.find('.codeInput').bind('input propertychange',function(){
			var code = $.trim($(this).val());
			if(!codeSend.find('.sendBtn').hasClass('live')&&code != ''&&code.length == 6&&(/^\d+$/g.test(code))){
				btnGroup.addClass('live');
			}else{
				btnGroup.removeClass('live');
			}
		});

		/*4、按钮点击事件---继续发布*/
		btnGroup.bind('click',function(){
			if(tip.hasClass('validate_success')){
				_self.yidiValidate = true;
				Popwin.hide();
				_self.elem.triggerHandler("click");
			}
		});

	}

	/*发送按钮，倒计时*/
	Submit.prototype.sendBtnEvent = function(codeSend){
		var _self = this;
		codeSend.find('.sendBtn').bind('click',function(){
			_self.initTimer($(this),60);
			codeSend.find('.codeInput').removeClass('red');
			_self.setStatus($(codeSend.find('.tip')),'validate_warning','请输入验证码');
			_self.ajaxValidate('//post.58.com/ajax/?action=ipchecksendcode&source=car');
		});
	}
	/**
	 * 异地消耗触发验证码衍生----设置验证码校验状态
	 * obj表示tip的父对象，status表示当前状态，包含状态和信息，error，warn
	 * time:2016/6/30
	 */
	Submit.prototype.setStatus = function(checkObj,status,msg){
		//msg == '' ? checkObj.parent().animate({'height':'55px'}) : checkObj.parent().animate({'height':'70px'});
		checkObj.removeClass('validate_error validate_warning validate_success').addClass(status).html('<i></i>' + msg);
	}
	/**
	 * func:设置时间重新发送
	 * time:2016/6/30
	 */
	Submit.prototype.initTimer = function(btn,time){
			var _self = this;
			btn.removeClass('live');
			btn.off("click").html(time + "s后重发");
			var count = time-1;
			var yzmTimer = setInterval(function(){
				if (count == 0){
					btn.html("发送验证码").addClass('live');
					_self.setStatus(btn.next('.tip'),'validate_error','请重新发送验证码');
					var btnGroup = btn.parent().siblings('.btn_group');
					btnGroup.removeClass('live');
					//重新写事件
					_self.sendBtnEvent(btn.parent());
					clearInterval(yzmTimer);
					yzmTimer = null;
				}else btn.html(count--+"s重发")
			},1000);
	};
	
	/**
	 * func:发送验证码和验证请求，ajax
	 * time:2016/6/30
	 */
	/*ajax校验*/
	Submit.prototype.ajaxValidate =  function(url, data, async,callback,errorcall){
		if(!url) return;
		data = data||{};
		async = async || false;
		var dataType = "json";
		if (url.indexOf("post.58.com")==-1&&url.indexOf("p.m.58.com")==-1) {
			dataType = "jsonp";
		}
		$.ajax({
			url: url,
			type: 'post',
			data:data,
			cache: false,
			dataType: dataType,
			async: async,
			success: function(res){
				if (callback) callback(res)
			},
			error: function(){
				if(errorcall)errorcall();
			}
		})
	};


	/**
	 * 重定向
	 */
	Submit.prototype.redirect = function(url){
		document.location.href = url;
		// console.warn('redirect url: ' + url);
	};
	/**
	 * 表单校验错误的提示
	 */
	Submit.prototype.showFormValidation = function(tipList) {
		var checkObj;
		for(var i=0; i<tipList.length; i++) {
			checkObj = tipList[i];
			checkObj.bValid = false;
			Controller.showCheckTips(checkObj);
			Controller.triggerEvent({
				data: [{
					funcName: 'scrollTo',
					target: {
						name: checkObj.name
					}
				}]
			})
		}
	};

	Submit.prototype.showVerification = function(data) {
		/* 二手车工程车：电话验证码(新地址)，
		 * 这个验证(老地址)请求了会造成电话验证码的错误，在这里屏蔽已经验证通过的电话和验证码
		 * disable “发送验证码按钮”
		 * start
		 */
		var phone = Controller.records.get("Phone");
		var yzminstance = Controller.records.get("yzm");
		if(phone){
			$(phone.elem).attr("readonly",true);
			phone.cancleEvent();
		}
		if(yzminstance){
			$(yzminstance.elem).attr("readonly",true);
			yzminstance.cancleEvent();
			yzminstance.yzmel.unbind('click');
		}
		/*end*/
		Controller.showCaptcha(data.vcode);

		// console.warn('showVerification');
	};
	Submit.prototype.showIqasTip = function() {
		// console.warn('showIqasTip');
	};
	/**
	 * 通用的错误提示弹窗
	 * @param  {[type]} errObj [description]
	 */
	Submit.prototype.showError = function(errObj) {
		// console.warn('showError');
		var dialog = $('<div>').addClass('error_wrap');
		// dialog.append('<i><img src="//localhost/svnWorkPlace/post/pc-refactor/src/imgs/error.png"></i>');
		dialog.append('<i><img src="//img.58cdn.com.cn/ui7/post/pc/imgs/error.png"></i>');
		var contentElem = $('<div>').addClass('content');
		dialog.append(contentElem);
		contentElem.append('<h2>非常抱歉！</h2>');
		contentElem.append('<p>' + errObj.msg + '</p>');
		var extBtn = $('<a href="javascript:;">知道了</a>');
		extBtn.bind('click', function(){
			Popwin.hide();
		});
		var btnGroup = $('<div class="btn_group">').append(extBtn);
		contentElem.append(btnGroup);
		// var htmlStr = '<div>'
		// 			+ '<i><img src="//img.58cdn.com.cn/ui7/post/pc/imgs/error.png"></i>'
		// 			// + '<i><img src="//localhost/svnWorkPlace/post/pc-refactor/src/imgs/error.png"></i>'
		// 			+ '<div class="content"><h2>非常抱歉！</h2><p>' + errObj.msg + '<p></div></div>'
		Popwin.show('', dialog, 640, 300, true, function(){
			// console.log('popwin show callback');
			// console.log(arguments);
		});
	};
	Submit.prototype.getFormValue = function(){
		return this.elem.val();
	};
	Submit.prototype.setValue = function(val){
		return this.elem.val(val);
	};
	/*
	 * 二手车-当返回地址错误时-改变联系人为商家-并将地址做一个校验
	 * time :2016/10/21
	 */
	Submit.prototype.checkAddress = function(){
		if(____json4fe.catentry[1].dispid == 29){
			var carAddressInstanch = Controller.records.get("caraddress"),isBizInstanch = Controller.records.get("isBiz");
			if(isBizInstanch){
				isBizInstanch.setValue(1);
			}
			carAddressInstanch.doCheck();
		}
	};
	Submit.prototype.showYunXxrz = function(data){
		y58.yConfig({
			    "callback":data.successUrl,//回调方法(PC必填项M,APP不填)  去发布成功页
			    "isConflict":false,//页面是否引用jquery(非必填项)
			    "terminal":"PC",//当前终端(必填项，PC/M/APP)
			    "cateId":data.cateId,//二级类：归属类别(必填项) 
			    "level":data.level,//认证等级(必填项)
			    "sessionid":data.sessionid,//无极生成的唯一ID(选填)
			    "infoId":data.infoid,//帖子ID(必填项)
			    "appId":"7kyIBfaO",//申请的appId(必填项)
			    "style":""});
	}
	// 测试专用....
	// Submit.prototype.render = function() {
	// 	this.constructor.superclass.render.apply(this, arguments);

	// 	Controller.showCaptcha(300);
	// }
	return Submit;
});
/**
 * 块级区域组件
 * @module component/block
 */
define('component/topTips/js/topTips',[],function(){
	/**
	 *  @constructor
	 *  @alias module:component/block
	 *  @param {Object} opt 配置文件 
	 */
	function TopTips(opt){
		this.opts = $.extend(true, {}, this.constructor.opts, opt);
		this.init();
	}
	/** @enum  {Object} 静态配置文件，所有的默认值都在这里初始化 */
	TopTips.opts = {
		/** @type {String} 组件的类型 */
		type: 'topTips',
		/** @type {String} 显示的标题名 */
		title: '', 
		/** @type {String} 增加的className */
		className: '',
		/** @type {Object} 默认的class名，不要随意修改和传入 */
		defaultClassName: {
			/** @type {String} 容器的className */
			wrap: 'toptips',
			/** @type {String} 图标的className */
			icon: 'icon',
			/** @type {String} 内容区域的className */
			content: 'toptips_content'
		}
	}
	TopTips.prototype = {
		constructor: TopTips,
		/**
		 * 初始化方法
		 */
		init: function(){
			this.createElem();
		},
		/**
		 * 生成相应的DOM对象
		 */
		createElem: function(){
			this.createElemByDefault();
			this.setExtraAttr();
		},
		/**
		 * 通过默认配置生成DOM对象
		 */
		createElemByDefault: function(){
			var fabuguifan = ""
			if(____json4fe.catentry[1].dispid==29){
                fabuguifan='<span style="display: block;margin-bottom: 3px;">平台严禁发布套牌车、走私车、盗抢车等非法车辆，一经发现一律冻结处理，请您按照<a target="_blank" style="color: #25d;" href="http://about.58.com/333.html#f" onclick="clickLog(\'PRS _pc_CLICK_fqz\')"><<平台发布规范>></a>发布您的信息。</span>';
            	if(businessData.isVipApp == true) {
					fabuguifan += '<span style="display: block;margin-bottom: 3px;">若账号被冻结，具体惩戒细则及账号解冻方法请参照<a target="_blank" style="color: #25d;" href="//j1.58cdn.com.cn/m58/car/ershouche_wyxz.html" onClick="clickLog(\'from=pc_weixin\');">' +
					'<<58同城二手车用户推广违约惩戒细则>></a>。</span>';
				}
			}
			var opts = this.opts;
			var titleElem = '<div class="toptips">'+
			'<span class="icons"></span>'+
			'<div class="toptips_content">'+fabuguifan+opts.title+'</div>'+
			'</div>';
			this.containerElem=$(titleElem);
		},
		/**
		 * 根据传入的值，设置其他属性
		 */
		setExtraAttr: function(){
			var opts = this.opts;
			if(typeof opts.className === 'string' && opts.className.length > 0) {
				this.containerElem.addClass(opts.className);
			}
		},
		/**
		 * 将容器插入到页面上
		 */
		render: function(){
			this.containerElem.insertBefore('#formWrap');
		},
		hide: function(){
			this.containerElem.hide();
		},
		show: function(){
			this.containerElem.show();
		}
	}
	return TopTips;
});
define('component/preCheck/js/preCheck',['component/popwin/js/popwin', 'component/topTips/js/topTips'], function(Popwin, Toptip) {
    var PreCheck = {
        execute: function(data) {
            if (data && data.bizExt && data.bizExt.msg) {
                this.showTips(data.bizExt.msg, !data.bizExt.unablePost, data.bizExt.title);
                return data.bizExt.unablePost;
            }
            return false;
        },
        showWin: function(data) {
            if (data && data.NoticeShowState == 0) {
                var dialog = $('<div class="notice_container1" style="display: block;">    <div class="notice_cont">        <h3 class="not_title">为了维护58同城良好的交易环境，提高网站的信息质量，打击违法和虚假信息，现对车辆市场信息质量标准细则进行个更新，新规则于<span>2016年4月15日</span>开始执行，核心内容如下：</h3>        <h4 class="not_txt">请您阅读后签署同意书，点击“同意”后可继续发布。</h4>        <img class="not_pic" src="//img.58cdn.com.cn/ui7/car/notice/content_vip.jpg" alt="58同城">        <p class="not_bottxt">请您严格按照平台规则发布您的信息，详细规范请查看<a target="_blank" href="http://about.58.com/333.html#f">《车辆市场信息质量标准细则》</a></p>    </div>    <div class="notice_btn">        <span>您同意遵守此规则发布您的商品吗?</span>        <a class="btn1" href="javascript:;">不同意</a>        <a class="btn2" href="javascript:;">同意</a>    </div></div>');
                dialog.find(".btn1").bind("click", function() {
                    window.top.location = '//vip.58.com/index/';
                }); /*不同意*/
                dialog.find(".btn2").bind("click", function() {
                    $.ajax({ url: "//post.58.com/ajax?action=noticeshowstate&source=car" });
                    Popwin.hide();
                }); /*同意*/
                window.setTimeout(function() {
                    Popwin.show("", dialog, 708, 560, false, function() {});
                    var inIframe = window.parent.document.getElementById("postFrame");
                    if (inIframe != null) {
                        Popwin.form.css("top", "320px");
                    }
                }, 0);
            }
            return false;
        },
        showMsg: function(data) {
            if (data && data.bizExt && data.bizExt.msg && data.bizCode == "msgTip") { /*头上显示*/
                var toptip = new Toptip({
                    title: data.bizExt.msg
                });
                toptip.render();
                return data.bizExt.unablePost;
            } else if (data && data.bizExt && data.bizExt.msg && data.bizCode == "errMsg") { /*弹窗提示*/
                this.showTips(data.bizExt.msg, !data.bizExt.unablePost, data.bizExt.title);
                return data.bizExt.unablePost;
            } else if (data && data.bizExt && data.bizCode == "AuthPopups") { //认证提示
                y58.yConfig({
                    "callback": data.bizExt.successUrl, //回调方法(PC必填项M,APP不填)  去发布成功页
                    "isConflict": false, //页面是否引用jquery(非必填项)
                    "terminal": "PC", //当前终端(必填项，PC/M/APP)
                    "cateId": data.bizExt.cateId, //二级类：归属类别(必填项) 
                    "level": data.bizExt.level, //认证等级(必填项)
                    "sessionid": data.bizExt.sessionid, //无极生成的唯一ID(选填)
                    "infoId": data.bizExt.infoid, //帖子ID(必填项)
                    "appId": "7kyIBfaO", //申请的appId(必填项)
                    "style": ""
                });
                return data.bizExt.unablePost;
            }
            return false;
        },
        showTips: function(msg, canClose, title) {
            var dialog = $('<div>').addClass('error_wrap');
            var contentElem = $('<div>').addClass('content');
            var msgTitle = title || "非常抱歉！";
            dialog.append(contentElem);
            dialog.append('<i><img src="//img.58cdn.com.cn/ui7/post/pc/imgs/error.png"></i>');
            contentElem.append('<h2>' + msgTitle + '</h2>');
            contentElem.append('<p>' + msg + '</p>');
            if (canClose) {
                var extBtn = $('<a href="javascript:;">知道了</a>');
                extBtn.bind('click', function() {
                    Popwin.hide(); //点击我知道了 头部再进行提示。
                    var toptip = new Toptip({
                        title: msg
                    });
                    toptip.render();
                });
                var btnGroup = $('<div class="btn_group">').append(extBtn);
                contentElem.append(btnGroup);
            } else {
                if (contentElem.find("#lijiChongZhiVip").length > 0) {
                    contentElem.find("#lijiChongZhiVip").bind("click", function() {
                        //vip的统计
                        var log = "from=ershouch_vip_recharge_pay&datetime=" + $.getShowData() + "&userid=" + userid + "&usertype=vip&rand=" + Math.random();
                        if (typeof clickLog == "function") {
                            clickLog(log);
                        }
                        top.location.href = "//paycenter.58.com/main/charge/?merid=1071&tab=9";
                    });
                } else if (msg.indexOf("去刷新") == -1) {
                    var btnText = "我知道了";
                    var extBtn = $('<a href="javascript:;">' + btnText + '</a>');
                    extBtn.bind('click', function() {
                        Popwin.hide();
                        var tohref = !businessData.isVipUser ? "//my.58.com/index/?" : "//vip.58.com/vcenter/manage/?"
                        top.location.href = tohref;
                    });
                    var btnGroup = $('<div class="btn_group">').append(extBtn);
                    contentElem.append(btnGroup);
                }
            }

            window.setTimeout(function() { Popwin.show("", dialog, 600, 300, canClose, function() {}) }, 0);
        }
    };
    return PreCheck;
});
/**
 * @fileOverview 验证码captcha.js
 * @author Zhao Jianfei <zhaojianfei@58.com>
 * @version 3.0.0
 * @description 验证码captcha.js
 * @copyright © 58.com
 vvvv
 **/
define('component/captcha/js/captcha',[],function() {

    /**
     * @description captcha模块
     * @module captcha
     */
    var isLocked = false,
        isIE6 = !!window.navigator.userAgent.toUpperCase().match('MSIE 6.0'),
        isIE7 = !!window.navigator.userAgent.toUpperCase().match(/(MSIE 7\.0)|(Trident\/7\.0)/), // 360极速浏览器兼容模式为Trident/7.0
        interval, // 计时器变量
        sqrClassReg = /\br(\d)c(\d)\b/i, // 匹配九宫格class的正则表达式
        catentry = window.____json4fe ? window.____json4fe.catentry : [],
        largeCate = !!catentry[0] ? catentry[0].dispid : '', // 一级类
        smallCate = !!catentry[1] ? catentry[1].dispid : '', // 二级类
        isFullTimeHire = (largeCate === '9224') ? ((smallCate === '13889'||smallCate === '13890'||smallCate === '13891'||smallCate === '13892'||smallCate === '15890') ? false : true): false, // 是否为全职招聘发布页（非招聘会）
        // 解密验证码长度（ysnkt: You should not know this）的方法
        decryptLength = function (str) {
            var decStr = parseInt(str + '', 16) + '';
            return decStr.charAt(decStr.length - 4);
        },
        // 将验证码添加到页面中
        appendFunc = function ($elem, isCommon, isEnt) {
            var $refElem;
            // 如果存在在线推广tr，则取参考位置为在线推广
            if(isCommon && $('#tgWrapTr').size() > 0) {
                $refElem = $('#tgWrapTr');
            }

            if(isEnt) {
                $refElem = isCommon ? $('#ModyBaseInfo').find('tr').filter(':last') : $('#ModyContractInfo').find('tr').filter(':last');
            } else {
                $refElem = isCommon ? $('#fabu').closest(smallCate === '13889' ? 'div.post-form-item' : 'tr') : $('#ModyBaseInfo').find('tr').filter(':last');
            }

            if(!settings.isCommon) { // 全职招聘特殊处理
                $elem.insertAfter($refElem);
            } else {
                $elem.insertBefore($refElem);
            }
        },
        // 表单校验方法，默认依赖$.fn.formValidator插件，传入参数为验证码输入框jQuery对象、表单校验对象、异步校验成功后的回调方法
        formValidatorFunc = function ($input, validatorObj, success) {
            var type = validatorObj.type,
                cptrType = validatorObj.cptrType,
                url = validatorObj.url,
                formValidatorObj = {
                    tipid: 'cptrTip',
                    q2b: true,
                    defaultvalue: ''
                },
                inputValidatorObj = {},
                regexValidatorObj = {},
                ajaxValidatorObj = {
                    url: url,
                    type: 'get',
                    datatype: 'jsonp',
                    jsonp: 'callback',
                    lastValid: '-1',
                    data: 'captcha_type=' + type
                };

            if(typeof $.fn.formValidator !== 'function') return false;

            formValidatorObj.empty = (cptrType === 'Bsc' || cptrType === 'Msg') ? false : true;
            formValidatorObj.onfocus = validatorObj.focusTip;
            inputValidatorObj.onerror = validatorObj.emptyTip;
            regexValidatorObj.regexp = validatorObj.regexp;
            regexValidatorObj.onerror = validatorObj.regexErrorTip;
            ajaxValidatorObj.onerror = validatorObj.ajaxErrorTip;
            ajaxValidatorObj.onwait = validatorObj.ajaxOnWaitTip;
            ajaxValidatorObj.success = success;

            $input.formValidator(formValidatorObj).
                inputValidator(inputValidatorObj).
                regexValidator(regexValidatorObj).
                ajaxValidator(ajaxValidatorObj);
        };

    /**
     * @name module:captcha~validatorOption
     * @description 表单校验设置
     * @type {object}
     * @property {object} focusTip 输入框获得焦点提示语
     * @property {object} emptyTip 输入框为空提示语
     * @property {object} regexp 表单校验正则表达式
     * @property {object} regexErrorTip 正则校验未通过提示语
     * @property {object} ajaxErrorTip 异步请求校验未通过提示语
     * @property {object} ajaxOnWaitTip 异步请求校验返回等待提示语
     * @see Captcha#initValidator
     */
    var validatorOption = {
        focusTip: {
            '100': '请填写下面图片所示的数字和字母',
            '180': '请填写下面图片所示的数字和字母',
            '200': '请填写下面图片所示算式的运算结果',
            '300': '请点击九宫格文字',
            '400': '请填写短信收到的验证码',
            '500': '请填写语音收听到的验证码',
            '600': '请点击九宫格数字',
            '700': '请填写语音收听到的验证码',
            '1100': '请填写短信收到的验证码'
        },
        emptyTip: {
            '100': '请输入验证码',
            '180': '请输入验证码',
            '200': '请输入验证码',
            '400': '请输入验证码',
            '500': '请输入验证码',
            '700': '请输入验证码',           
            '1100': '请输入验证码'
        },
        regexp: {
            '100': '^[0-9a-zA-Z]{4,5}$',
             '180': '^[0-9a-zA-Z]{4,6}$',
            '200': '^[0-9-]{1,3}$',
            '300': '^[0-9]{4}$',
            '400': '^[0-9]{5,6}$',
            '500': '^[0-9]{5,6}$',
            '600': '^[0-9]{1,6}$',
            '700': '^[0-9]{5,6}$',    
            '1100': '^[0-9]{5,6}$'
        },
        regexErrorTip: {
            '100': '输入的字符有误',
             '180': '输入的字符有误',
            '200': '输入的字符有误',
            '300': '输入有误',
            '400': '输入的字符有误',
            '500': '输入的字符有误',
            '600': '输入有误',
            '700': '输入的字符有误',        
            '1100': '输入的字符有误'
        },
        ajaxErrorTip: {
            '100': '验证码错误',
              '180': '验证码错误',
            '200': '验证码错误',
            '300': '验证码错误，请重新点击九宫格',
            '400': '验证码错误',
            '500': '验证码错误',
            '600': '验证码错误，请重新点击九宫格',
            '700': '验证码错误',        
            '1100': '验证码错误'
        },
        ajaxOnWaitTip: '正在校验中...'
    };
    /**
     * @name module:captcha~settings
     * @description 默认设置
     * @type {object}
     * @property {string} btnId 发布按钮的id，默认为'fabu'
     * @property {boolean} isEnt 是否为企业相关页面
     * @property {boolean} isCommon 是否为一般性发布页
     * @property {number} countDown 重新获取验证码的时间间隔，默认60秒
     * @property {boolean} autoMakeCall  是否在验证码生成时自动拨打语音电话
     * @property {string} getUrl 获取验证码的url，带xxzl_debug=true表示是debug模式，response中回返回答案
     * @property {string} validateUrl  校验验证码的url
     * @property {string} IE6GetImageUrl IE6获取图片url
     * @property {string} phoneId  表单中联系电话输入框的id
     * @property {function} appendToDOM 将验证码添加到页面中
     * @property {function} formValidator 验证码表单校验方法
     * @property {object} validatorOption 验证码表单校验配置
     */
    var settings = $.extend(true, {}, {
        btnId: 'fabu',
        isEnt: false,
        isCommon: !isFullTimeHire,
        countDown: 60,
        autoMakeCall: false,
        getUrl: '//verifycode.58.com/captcha/getV2',
        validateUrl: '//verifycode.58.com/captcha/validateV2',
        IE6GetImageUrl: '//verifycode.58.com/captcha/generateImgV2',
        phoneId: isFullTimeHire ? 'lianxifangshi' : 'Phone', // 全职招聘发布页id为lianxifangshi
        appendToDOM: appendFunc,
        formValidator: formValidatorFunc,
        validatorOption: validatorOption
    });
    /**
     * @name module:captcha~cptrMap
     * @description 通过不同类型type加载不同类型验证码。Bsc、Msg、Sqr、Cmb、Error代表五种验证码的样式
     * @type {object}
     * @property {string} 0 验证码加载错误：Error
     * @property {string} 100 图片-原样输入：Bsc
     * @property {string} 200 图片-四则运算：Bsc
     * @property {string} 300 点击-中文原样（九宫格）：Sqr
     * @property {string} 400 短信-原样：Msg
     * @property {string} 500 语音-用户主动拨打：Msg
     * @property {string} 600 短信/点击-颜色/数字(双通道、九宫格)：Cmb
     * @property {string} 700 语音-58主动拨打：Msg
     */
    var cptrMap = {
        '0': 'Error', // 验证码加载错误
        '100': 'Bsc', // 图片-原样输入
        '200': 'Bsc', // 图片-四则运算
        '300': 'Sqr', // 点击-中文原样（九宫格）
        '400': 'Msg', // 短信-原样
        '500': 'Msg', // 语音-用户主动拨打
        '600': 'Cmb', // 短信/点击-颜色/数字(双通道、九宫格)
        '700': 'Msg', // 语音-58主动拨打
        '180': 'Bsc', // 图片-腾讯图片
        '1100': 'Msg' // 短信-高危账户验证码
    };
    // 加密方法，暂时不用
    var encrypt = function (input) {
        var mantissa = '';

        if(typeof input !== 'string') input = input.toString();

        for(var idx = 0, len = input.length; idx < len; idx++) {
            mantissa += input[idx].charCodeAt(0) & 7;
        }

        return $.md5(mantissa);
    };
    
    /**
     * @name module:captcha~UIMap
     * @description 特殊类型的UI样式（一般类型的UI样式采用post-ui6），票务-演出门票发布页暂时无法接入。
     * + UIMap是基于发布页的`dispid`进行配置的
     * + 如果我们新增了某一类别的发布页，首先查找{@linkcode snippets}中有没有适配的UI样式
     * + 以改版后的招聘会发布页为例，改版前，招聘会发布页使用旧的发布页样式，无需做特殊配置。改版后，由于把传统的**table**布局变为了**div**布局，所以需要在{@linkcode snippets}中添加新的UI样式
     * + 在{@linkcode snippets}中添加新的UI样式`post-hirenew`后，我们需要把招聘会发布页映射到新的UI样式上面
     * + 招聘会发布页一级类的dispid为9224，二级类的`dispid`为13889|13890|13891|13892|15890，所以定义`UIMap['9224']['13889']`为`post-hirenew`，用通配符*匹配其他的二级类的UI为`post-hire`
     * + 这样就完成了新增/变更发布页验证码UI的配置
     * @example
     * var UIMap = {
     *     '1': { // 房产信息
     *         '8': 'post-ui7', // 租房
     *         '10': 'post-ui7', // 合租房
     *         '12': 'post-ui7' // 二手房
     *     },
     *     '4': { // 车辆买卖与服务
     *         '29': 'post-ui7', // 二手车
     *         '30': 'post-ui7', // 二手摩托车
     *         '240': 'post-ui7' // 自行车/电动车
     *     },
     *     '5': 'post-ui7', // 二手物品
     *         '832': { // 宠物
     *         '252': 'pet-post' // 宠物狗
     *     },
     *     '8640': { // 旅游酒店
     *         '8645': 'post-ui7', // 国内游
     *         '8658': 'post-ui7' // 出境游
     *     },
     *     '9224': {
     *         '*': 'post-hire', // 全职招聘
     *         '13889': 'post-hirenew' // 招聘会
     *     },
     *     '13941': 'post-hire'// 兼职招聘
     * };
     * @type {object}
     */
    var UIMap = {
        '1': { // 房产信息
            '8': 'post-ui7', // 租房
            '10': 'post-ui7', // 合租房
            '12': 'post-ui7' // 二手房
        },
        '4': { // 车辆买卖与服务
            '29': 'post-ui7', // 二手车
            '70185': 'post-ui7', // 二手车
            '30': 'post-ui7', // 二手摩托车
            '240': 'post-ui7' // 自行车/电动车
        },
        '5': 'post-ui7', // 二手物品
        '832': { // 宠物
            '252': 'pet-post' // 宠物狗
        },
        '8640': { // 旅游酒店
            '8645': 'post-ui7', // 国内游
            '8658': 'post-ui7' // 出境游
        },
        '9224': {
            '*': 'post-hire', // 全职招聘
            '13889': 'post-hirenew' ,// 招聘会
            '13890': 'post-hirenew', // 招聘会
            '13891': 'post-hirenew', // 招聘会
            '13892': 'post-hirenew', // 招聘会
            '15890': 'post-hirenew'// 招聘会
        },
        '13941': 'post-hire'// 兼职招聘
    };
    /**
     * @description html代码片段（用于不同类型的发布页生成不同样式的验证码）
     * @name module:captcha~snippets
     * @type {object}
     * @property {object} common 公共html代码片段
     * @property {object} stylesheet 公共样式
     * @property {object} post-ui7 新版发布页的html代码片段
     * @property {object} post-ui6 旧版发布页的html代码片段
     * @property {object} pet-post 宠物-宠物狗的html代码片段
     * @property {object} post-hire 全职招聘、兼职招聘的html代码片段
     * @property {object} post-hirenew 招聘会的html代码片段
     */
    var snippets = {};
    // 公共html代码
    snippets.common = {
        // 输入方格
        cptrTable: '<table id="cptrTable" class="character"><tbody><tr><td></td><td></td><td></td><td></td><td class="backspace"></td></tr></tbody></table>',
        // 输入方格
        cptrTablePlus: '<table id="cptrTable" class="character"><tbody><tr><td></td><td></td><td></td><td></td><td></td><td></td><td class="backspace"></td></tr></tbody></table>',
        // 九宫格
        sqrTable: '<table id="sqrTable" class="character"><tbody><tr><td class="r1c1"></td><td class="r1c2"></td><td class="r1c3"></td></tr><tr><td class="r2c1"></td><td class="r2c2"></td><td class="r2c3"></td></tr><tr><td class="r3c1"></td><td class="r3c2"></td><td class="r3c3"></td></tr></tbody></table>',
        // 隐藏输入框 captcha_input
        hiddenInput: '<input id="captcha_input" class="cptrHidden" type="text" name="captcha_input" maxlength="6" />',
        // 隐藏输入框 captcha_type
        hiddenType: '<input id="captcha_type_iqas" type="hidden" name="captcha_type_iqas" />',
        // 提示图片
        cptrImage: '<div id="cptrImage"></div>',
        // 表单校验提示tip
        tip: '<span id="cptrTip"></span>',
        cptrPrompt: '<span id="cptrPrompt"></span>',
        cptrReget: '<span id="reget"><a href="javascript:void(0)">获取验证码</a></span>',
        cptrCd: '<span id="cptrCd"><a href="javascript:void(0)">获取验证码</a><span></span></span>'
    };
    snippets.stylesheet = {
        sqr: '#cptrTable {margin-right: 10px;display: inline-block;_zoom: 1;*display: inline;}' +
            '#sqrTable,#cptrTable{margin-bottom: 10px;border-collapse: collapse;border: 1px solid #ccc}' +
            '#sqrTable td,#cptrTable td{padding: 0;width: 50px;height: 47px;text-align: center;}' +
            '#sqrTable td{cursor: pointer; border:1px solid #ccc;}' +
            '#sqrTable td.typed{background: #ccc;}' +
            '#cptrTable td.backspace{cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;background: url(//verifycode.58.com/captcha/del.png?v=20140521) no-repeat 0 -47px;}' +
            ((settings.isEnt || !settings.isCommon) ? '#cptrTable .chenggong{ display: inline-block; width: 19px; height: 19px; background: url(//img.58cdn.com.cn/n/images/post/background.gif) no-repeat -162px -79px; vertical-align: middle; padding-right: 5px; }' : '') +
            '#cptrTable td.backspace.hover{background-position: 0 0;}' +
            '#cptrTable .chenggong{margin: 0;padding:0;}' +
            '#cptrImage{font-size: 13px;height:40px;background-position: 0 0;padding-left: 180px;padding-top:0px;background-repeat: no-repeat;width: auto;line-height: 40px;margin-bottom: 10px;}' +
            '#cptrImage a{text-decoration: underline;}' +
            '#sqrTable.loading td,#cptrImage.loading{background-image: url("//verifycode.58.com/captcha/loading.gif?v=20140703")}' +
            '#cptrImage.loading.bgfix{background-position: 0px 20px;}' +
            '#cptrCd,#reget{margin-left: 10px;}' +
            '.cptrHidden{width: 0;height: 0;position: absolute;visibility: hidden;left: -9999px;}' +
            '.r1c1{background-position: 0px -40px;}' +
            '.r1c2{background-position: -50px -40px;}' +
            '.r1c3{background-position: -100px -40px;}' +
            '.r2c1{background-position: 0px -87px;}' +
            '.r2c2{background-position: -50px -87px;}' +
            '.r2c3{background-position: -100px -87px;}' +
            '.r3c1{background-position: 0px -134px;}' +
            '.r3c2{background-position: -50px -134px;}' +
            '.r3c3{background-position: -100px -134px;}',
        sqrBg: '#sqrTable td,#cptrTable td.typed,#cptrImage{background-image: url(#{picUrl});}'
    };
    // 新版发布页的html代码
    snippets['post-ui7'] = {
        wrapper: '<div id="captcha"></div>',
        th: '',
        Bsc: {
            td: '<div>' +
                snippets.common.hiddenType +
                '<input id="captcha_input" class="txt w60 c_999 mr10" name="captcha_input" maxlength="6" autocomplete="off"/>' +
                snippets.common.tip +
                snippets.common.cptrImage +
                '</div>'
        },
        Msg: {
            td: '<div>' +
                snippets.common.hiddenType +
                '<p style="margin-bottom: 10px;">' +
                snippets.common.cptrPrompt +
                snippets.common.cptrCd +
                '</p>' +
                '<input id="captcha_input" class="txt w60 c_999 mr10" name="captcha_input" maxlength="6" autocomplete="off"/>' +
                snippets.common.tip +
                '</div>'
        },
        Sqr: {
            td: '<td>' +
                snippets.common.hiddenType +
                snippets.common.hiddenInput +
                snippets.common.cptrTable +
                snippets.common.tip +
                snippets.common.cptrImage +
                snippets.common.sqrTable +
                '</td>'
        },
        Cmb: {
            td: '<td>' +
                snippets.common.hiddenType +
                snippets.common.hiddenInput +
                '<p style="margin-bottom: 10px;">' +
                snippets.common.cptrPrompt +
                snippets.common.cptrCd +
                '</p>' +
                snippets.common.cptrTablePlus +
                snippets.common.tip +
                snippets.common.sqrTable +
                '</td>'
        },
        Error: {
            td: '<div>' +
                snippets.common.cptrPrompt +
                snippets.common.cptrReget +
                '</div>'
        },
        Loading: {
            td: '<div style="color:red">' +
                snippets.common.cptrPrompt +
                '</div>'
        }
    };
    // 旧版发布页的html代码
    snippets['post-ui6'] = {
        wrapper: '<div id="captcha"></div>',
        th: '',
        Bsc: {
            td: '<div>' +
                snippets.common.hiddenType +
                '<input class="text2" type="text" id="captcha_input" name="captcha_input" maxlength="6" autocomplete="off"/>' +
                snippets.common.tip +
                snippets.common.cptrImage +
                '</div>'
        },
        Msg: {
            td: '<div>' +
                snippets.common.hiddenType +
                '<p style="margin-bottom: 10px;">' +
                snippets.common.cptrPrompt +
                snippets.common.cptrCd +
                '</p>' +
                '<input class="text2" type="text" id="captcha_input" name="captcha_input" maxlength="6" autocomplete="off"/>' +
                snippets.common.tip +
                '</div>'
        },
        Sqr: {
            td: '<td>' +
                snippets.common.hiddenType +
                snippets.common.hiddenInput +
                snippets.common.cptrTable +
                snippets.common.tip +
                snippets.common.cptrImage +
                snippets.common.sqrTable +
                '</td>'
        },
        Cmb: {
            td: '<td>' +
                snippets.common.hiddenType +
                snippets.common.hiddenInput +
                '<p style="margin-bottom: 10px;">' +
                snippets.common.cptrPrompt +
                snippets.common.cptrCd +
                '</p>' +
                snippets.common.cptrTablePlus +
                snippets.common.tip +
                snippets.common.sqrTable +
                '</td>'
        },
        Error: {
            td: '<div>' +
                snippets.common.cptrPrompt +
                snippets.common.cptrReget +
                '</div>'
        },
        Loading: {
            td: '<div style="color:red">' +
                snippets.common.cptrPrompt +
                '</div>'
        }
    };
    // 全职招聘发布页的html代码
    snippets['post-hire'] = {
        wrapper: '<tr id="captcha"></tr>',
        th: '<th><span><i>*</i>验证码</span></th>',
        Bsc: {
            td: '<td>' +
                '<div style="height: 34px;margin-bottom: 6px;">' +
                snippets.common.hiddenType +
                '<input class="textstyle" type="text" id="captcha_input" name="captcha_input" maxlength="6" autocomplete="off"/>' +
                snippets.common.tip +
                '</div>' +
                snippets.common.cptrImage +
                '</td>'
        },
        Msg: {
            td: '<td>' +
                '<div class="naddList">' +
                snippets.common.hiddenType +
                '<p style="margin: 10px 0;">' +
                snippets.common.cptrPrompt +
                snippets.common.cptrCd +
                '</p>' +
                '<input class="textstyle" type="text" id="captcha_input" name="captcha_input" maxlength="6" autocomplete="off"/>' +
                snippets.common.tip +
                '</div>' +
                '</td>'
        },
        Sqr: {
            td: '<td>' +
                snippets.common.hiddenType +
                snippets.common.hiddenInput +
                snippets.common.cptrTable +
                snippets.common.tip +
                snippets.common.cptrImage +
                snippets.common.sqrTable +
                '</td>'
        },
        Cmb: {
            td: '<td>' +
                '<div class="naddList">' +
                snippets.common.hiddenType +
                snippets.common.hiddenInput +
                '<p style="margin: 10px 0;">' +
                snippets.common.cptrPrompt +
                snippets.common.cptrCd +
                '</p>' +
                snippets.common.cptrTablePlus +
                snippets.common.tip +
                snippets.common.sqrTable +
                '</div>' +
                '</td>'
        },
        Error: {
            td: '<td>' +
                snippets.common.cptrPrompt +
                snippets.common.cptrReget +
                '</td>'
        },
        Loading: {
            td: '<td style="color:red">' +
                snippets.common.cptrPrompt +
                '</td>'
        }
    };
    // 招聘会发布页的html代码
    snippets['post-hirenew'] = {
        wrapper: '<div id="captcha" class="post-form-item fn-clear"></div>',
        th: '<label class="post-label"><span class="post-form-required">*</span>验证码</label>',
        Bsc: {
            td: '<div class="post-item-section" style="height: auto">' +
                snippets.common.hiddenType +
                '<input class="post-input" type="text" id="captcha_input" name="captcha_input" maxlength="6" autocomplete="off"/>' +
                '<span class="post-form-explain">' +
                snippets.common.tip +
                '</span>' +
                snippets.common.cptrImage +
                '</div>'
        },
        Msg: {
            td: '<div class="post-item-section"  style="height: auto;padding-top: 5px;">' +
                '<div class="naddList">' +
                snippets.common.hiddenType +
                '<p style="margin-bottom: 10px;">' +
                snippets.common.cptrPrompt +
                snippets.common.cptrCd +
                '</p>' +
                '<input id="captcha_input" class="post-input" name="captcha_input" maxlength="6" autocomplete="off"/>' +
                '<span class="post-form-explain">' +
                snippets.common.tip +
                '</span>' +
                '</div>' +
                '</div>'
        },
        Sqr: {
            td: '<div class="post-item-section" style="height: auto">' +
                snippets.common.hiddenType +
                snippets.common.hiddenInput +
                snippets.common.cptrTable +
                '<span class="post-form-explain" style="position: absolute; margin-top: 10px;">' +
                snippets.common.tip +
                '</span>' +
                snippets.common.cptrImage +
                snippets.common.sqrTable +
                '</div>'
        },
        Cmb: {
            td: '<div class="post-item-section" style="height: auto;padding-top: 5px;">' +
                snippets.common.hiddenType +
                snippets.common.hiddenInput +
                '<p style="margin-bottom: 10px;">' +
                snippets.common.cptrPrompt +
                snippets.common.cptrCd +
                '</p>' +
                snippets.common.cptrTablePlus +
                '<span class="post-form-explain" style="position: absolute; margin-top: 10px;">' +
                snippets.common.tip +
                '</span>' +
                snippets.common.sqrTable +
                '</div>'
        },
        Error: {
            td: '<div class="post-item-section" style="padding-top: 5px;">' +
                snippets.common.cptrPrompt +
                snippets.common.cptrReget +
                '</div>'
        },
        Loading: {
            td: '<div class="post-item-section" style="padding-top: 5px;color:red">' +
                snippets.common.cptrPrompt +
                '</div>'
        }
    };
    // 宠物发布页的html代码
    snippets['pet-post'] = {
        wrapper: '<tr id="captcha"></tr>',
        th: '<th><b>*&nbsp;</b>验证码</th>',
        Bsc: {
            td: '<td>' +
                snippets.common.hiddenType +
                '<input class="tit_text" type="text" id="captcha_input" name="captcha_input" maxlength="6" autocomplete="off"/>' +
                snippets.common.tip +
                '</td>'
        },
        Msg: {
            td: '<td>' +
                snippets.common.hiddenType +
                '<p style="margin-bottom: 10px;">' +
                snippets.common.cptrPrompt +
                snippets.common.cptrCd +
                '</p>' +
                '<input class="tit_text" type="text" id="captcha_input" name="captcha_input" maxlength="6" autocomplete="off"/>' +
                snippets.common.tip +
                '</td>'
        },
        Sqr: {
            td: '<td>' +
                snippets.common.hiddenType +
                snippets.common.hiddenInput +
                snippets.common.cptrTable +
                snippets.common.tip +
                snippets.common.cptrImage +
                snippets.common.sqrTable +
                '</td>'
        },
        Cmb: {
            td: '<td>' +
                snippets.common.hiddenType +
                snippets.common.hiddenInput +
                '<p style="margin-bottom: 10px;">' +
                snippets.common.cptrPrompt +
                snippets.common.cptrCd +
                '</p>' +
                snippets.common.cptrTablePlus +
                snippets.common.tip +
                snippets.common.sqrTable +
                '</td>'
        },
        Error: {
            td: '<td>' +
                snippets.common.cptrPrompt +
                snippets.common.cptrReget +
                '</td>'
        },
        Loading: {
            td: '<td style="color:red">' +
                snippets.common.cptrPrompt +
                '</td>'
        }
    };
    /**
     * @name Captcha
     * @class Captcha类定义，封装了验证码的生成、获取、校验等方法
     * @constructor
     * @param {object}  cptrKey     密钥，获取验证码等传给服务器，解密后为验证码的类型。在xxzl=true的debug模式下，cptrKey可以直接使用验证码的type
     */
    var Captcha = function (cptrKey, options) {
        /**
         * @alias Captcha#settings
         * @description 控件参数，可由`window.__cptrConfig__`配置全局参数，由'options'配置实例对象参数
         * @type {object}
         */
        this.settings = {};
        // 高危账号验证码
        if(typeof options === 'object') {
            this.settings = $.extend({}, settings, options);
        } else if(typeof options === 'string' && options === 'highrisk') {
            this.settings = $.extend({}, settings, Captcha.highriskOptions);
        } else {
            this.settings = settings;
        }
        /**
         * @alias Captcha#type
         * @description 代表不同类型验证码，可以参照cptrMap
         * @type {string}
         * @see  cptrMap
         */
        this.type = -100;
        /**
         * @alias Captcha#cptrType
         * @description 验证码类型。Bsc|Msg|Sqr|Cmb
         * @type {string}
         * @see  cptrMap
         */
        this.cptrType = '';
        /**
         * @alias Captcha#cptrKey
         * @description 验证码密钥。由服务器端传给客户端，客户端上送到verifycode.58.com解密
         * @type {string}
         */
        this.cptrKey = cptrKey || '';
        /**
         * @alias Captcha#state
         * @description  控件状态。
         * ![状态转移](http://192.168.119.81/captcha/images/states.png)
         * @type {string}
         * @default 'loading'
         * @property {string} loading 控件处于加载状态，此时不能请求验证码，防抖动
         * @property {string} ready 控件处于加载完毕状态
         * @property {string} cooldown 控件处于倒计时冷却状态（只在短信、语音、双通道验证码状态下可用），此时不能请求验证码
         * @property {string} success 控件处于校验成功状态，此时验证码锁定，事件和重构失效
         * @property {string} error 控件处于加载错误状态，当出现网络错误或者未填写手机号时会进入该状态
         */
        this.state = 'loading';
        /**
         * @alias Captcha#picUrl
         * @description 验证码图片url，一般为base64数据类型，IE6下为固定的地址
         * @type {string}
         */
        this.picUrl = (isIE6 || isIE7) ? this.settings.IE6GetImageUrl : '';
        /**
         * @alias Captcha#getUrl
         * @description 获取验证码url，在type为700下为语音拨打url
         * @type {string}
         */
        this.getUrl = this.settings.getUrl;
        /**
         * @alias Captcha#validateUrl
         * @description 校验验证码url
         * @type {string}
         */
        this.validateUrl = this.settings.validateUrl;
        /**
         * @alias Captcha#$elem
         * @description 验证码jQuery元素
         * @type {object}
         */
        this.$elem = null;
        /**
         * @alias Captcha#$input
         * @description 验证码输入框jQuery元素
         * @type {object}
         */
        this.$input = null;
        /**
         * @alias Captcha#$image
         * @description 验证码图片jQuery元素
         * @type {object}
         */
        this.$image = null;
        /**
         * @alias Captcha#errorCount
         * @description 输入错误次数
         * @type {number}
         * @default 0
         */
        this.errorCount = 0;
        /**
         * @alias Captcha#ysnkt
         * @description 验证码长度，由服务器返回的ysnkt参数解码后得到。you shold not know this。
         * @type {number}
         * @default 0
         */
        this.ysnkt = 0; // @XXX: 存在安全隐患
        /**
         * @alias Captcha#injector
         * @description 验证码生成方法注入器，this.injector引用生成某种验证码的方法，并作为参数注入到{@link Captcha.requestCaptcha}的callback中
         * @type {function}
         */
        this.injector = null;
        this.init(this.cptrKey);
    };
    /**
     * @alias Captcha.highriskOptions
     * @description 高危账号验证码配置项
     * @type {Object}
     * @see module:captcha~settings
     */
    Captcha.highriskOptions = {
        getUrl: '//post.58.com/ajax?action=highrisksendcaptcha',
        validateUrl: '//post.58.com/ajax?action=highriskcheckcaptcha'
    };
    /* Captcha方法定义*/
    Captcha.prototype = {
        /**
         * @description Captcha构造方法
         * @memberOf Captcha
         * @method constructor
         * @instance
         */
        constructor: Captcha,
        /**
         * @description 初始化方法
         * 1. 找到参数元素`$refElem`，一般发布页（除招聘会和全职招聘发布页）为发布按钮外层的`<tr>`
         * + 通过{@linkcode Captcha.createStyle}方法创建样式表
         * + 异步获取验证码，通过获取到的type参数生成不同类型验证码，生成方法是通过{@linkcode Captcha.injector}方法进行字面值注入的
         * + 将生成的验证码DOM节点插入到参考元素之前（之后）
         * @memberOf Captcha
         * @instance
         * @param {string} cptrKey 密钥
         */
        init: function (cptrKey) {
            var _t = this,
                isCommon = _t.settings.isCommon,
                isEnt = _t.settings.isEnt,
                $captcha; // DOM元素

            _t.cptrType = 'Loading';
            _t.createStyle();
            // 如果存在验证码则调用重构方法
            if($('#captcha').length > 0 || !!captcha) {
                _t.refactor(_t.cptrKey);
                return false;
            }
            // 请求验证码后通过注入的renderCaptcha方法生成验证码
            _t.requestCaptcha(_t.getUrl, function (data, renderCaptcha) {
                // 如果存在验证码DOM结构，则移除，兼容验证码初始化加载loading的DOM结构
                if($('#captcha').length > 0) $('#captcha').remove();

                $captcha = renderCaptcha.call(_t, data);
                _t.settings.appendToDOM($captcha, isCommon, isEnt);
                _t.$elem.find('#captcha_type_iqas').val(_t.type);
                _t.initValidator();
                _t.$input.focus();
                // try{
                //     $('#screen').html(_t.$elem.html());
                // } catch(e){}
                // 如果type为700并且autoMakeCall标识为true，自动给用户拨打语音电话
                if(_t.type == 700 && _t.settings.autoMakeCall) _t.refactor(_t.cptrKey);
            });
        },
        /**
         * @description 重构方法。作用是当存在验证码时进行重构
         * + 大体上跟初始化过程相同，额外移除旧的验证码，当验证码类型未改变时仅改变验证码图片url以及重置样式
         * @memberOf Captcha
         * @instance
         * @param {string} cptrKey 密钥
         * @param {object|string} options 附加参数，如果为`highrisk`时表示高危账号验证码
         */
        refactor: function (cptrKey, options) {
            var _t = this,
                oldType  = _t.type,
                isCommon = _t.settings.isCommon,
                isEnt = _t.settings.isEnt,
                $oldCaptcha = $('#captcha');
            // 当处于加载或者校验成功状态时，不能重构
            // if(_t.state === 'loading' || _t.state === 'success') return false;
            // 重置cptrKey
            if(typeof cptrKey !== 'undefined') _t.cptrKey = cptrKey;
            // 重置this.settings
            if(typeof options === 'object') {
                _t.settings = $.extend({}, settings, options);
            } else if(typeof options === 'string' && options === 'highrisk') {
                _t.settings = $.extend({}, settings, Captcha.highriskOptions);

                _t.picUrl = (isIE6 || isIE7) ? _t.settings.IE6GetImageUrl : '';
                _t.validateUrl = _t.settings.validateUrl;
            }
            
            _t.getUrl = _t.settings.getUrl;

            _t.requestCaptcha(_t.getUrl, function (data, renderCaptcha) {
                clearInterval(interval); // 清除计时器
                _t.$input.removeAttr('disabled');
                // 返回type与原有type不相等时或者为双通道验证码时，重新生成。相等时改变图片
                if(_t.type !== oldType || _t.type === 'Cmb') {
                    _t.setBgStyle();
                    $captcha = renderCaptcha.call(_t, data);
                    $oldCaptcha.remove(); // 移除原有的验证码
                    _t.$elem = $captcha;
                    _t.settings.appendToDOM($captcha, isCommon, isEnt);
                    _t.$elem.find('#captcha_type_iqas').val(_t.type);
                    _t.initValidator();
                    _t.$input.focus();
                } else {
                    _t.resetGrid();
                    _t.$input.val('');
                    _t.setPrompt(data && data.tip);
                    // 短信验证码和双通道验证码倒计时功能
                    if(_t.cptrType === 'Msg' || _t.cptrType === 'Cmb') _t.setCooldownState();

                    if(!_t.$input.is(':hidden')) _t.$input.focus();    
                }
                
            });
        },
        /**
         * @description 获取语音校验码
         * @param {string} url 获取语音验证码的url
         * @memberOf Captcha
         * @instance
         */
        getVoiceCaptcha: function (url) {
            var _t = this,
                timer = setTimeout(function () {

                    if(_t.state === 'loading') _t.setErrorState();

                }, 10000); // 超时10秒仍然处于loading状态时则置为错误状态

            if(_t.state === 'loading') return false;

            _t.setLoadingState(); // 设置控件的state为loading状态

            $.ajax({
                url: url,
                type: 'get',
                async: true,
                dataType: 'jsonp',
                success: function (json) {
                    clearTimeout(timer);
                    // 0: "ok";                                           
                    // 100: "bad request";                                  
                    // 200: "out of limit rate";                            
                    // 300: "invoke(scf/400) error or no code for this tel";
                    // 400: "no disturbing time";                            
                    // 900: "system error"; 
                    if(json && json.code == '0') {
                        _t.setReadyState();
                        _t.resetGrid();
                        _t.$input.val('').show();
                        _t.$elem.find('#cptrTip').show();
                        _t.$input.focus();
                        _t.setCooldownState();
                    } else if (json && json.code == '200'){
                        _t.setErrorState('获取语音验证码次数超出限制！');
                    } else {
                        _t.setErrorState('获取语音验证码失败！');
                    }

                }
            });
        },
        /**
         * @description 销毁验证码方法
         * @memberOf Captcha
         * @instance
         */
        destroy: function () {
            var _t = this;
            _t.$elem.remove();
            return false;
        },
        /**
         * @description 初始化验证码输入框的表单校验规则方法。
         * + 根据验证码类型提供一个校验对象validatorObj，并将校验元素$input、校验对象validatorObj、异步校验的回调方法sueccess作为参数传入this.settings.formValidator方法进行表单校验初始化
         * @memberOf Captcha
         * @instance
         */
        initValidator: function () {
            var _t = this,
                validatorObj = {},
                validatorOption = _t.settings.validatorOption;

            validatorObj['type'] = _t.type;
            validatorObj['cptrType'] = _t.cptrType;
            validatorObj['url'] = _t.validateUrl;

            for(var attr in validatorOption) {

                if(typeof validatorOption[attr] === 'string') {
                    validatorObj[attr] = validatorOption[attr];
                    break;
                }

                if(typeof validatorOption[attr][_t.type] !== 'undefined') validatorObj[attr] = validatorOption[attr][_t.type];

            }
            
            _t.settings.formValidator(_t.$input, validatorObj, _t.afterValidateCaptcha());

        },
        /**
         * @description 获取html代码方法。通过发布页的类别，加载不同的html代码段，最后生成不同样式的验证码
         * @param  {string} elem 获取的元素
         * @memberOf Captcha
         * @instance
         * @return {string} elem元素的html代码段
         * @see snippets UIMap
         */
        getSnippet: function (elem) {
            var _t = this,
                postui = ''; // 发布页样式

            if(typeof UIMap[largeCate] === 'string') {
                postui = UIMap[largeCate];
            } else if(typeof UIMap[largeCate] === 'object'){

                if(typeof UIMap[largeCate][smallCate] === 'string') { // 具体二级类
                    postui = UIMap[largeCate][smallCate];
                } else if(typeof UIMap[largeCate]['*'] === 'string') { // 通配符
                    postui = UIMap[largeCate]['*'];
                } else {
                    postui = 'post-ui6';
                }
                
            } else {
                postui = 'post-ui6';
            }
            // 公司资料页验证码
            if(_t.settings.isEnt) postui = 'post-hire';
            // 公共html代码
            if(elem in snippets.common) return $(snippets['common'][elem]);
            // 每个类别的公共html代码
            if(elem in snippets[postui]) return $(snippets[postui][elem]);

            return $(snippets[postui][_t.cptrType][elem]);
        },
        /**
         * @description 创建样式表方法。在head标签内创建两个样式表，一个是是验证码公用样式，另一个是验证码图片的url，重新获取图片验证码时重写验证码图片url的相关样式
         * @memberOf Captcha
         * @instance
         */
        createStyle: function () {
            var _t = this,
                head = document.getElementsByTagName('head')[0],
                sqrStyle = document.createElement('style'),
                sqrBgStyle = document.createElement('style'),
                sqrDiv = document.createElement('div'),
                sqrBgDiv = document.createElement('div');

            if($('#cptrStyle').size() > 0) return false;

            if($('#sqrBgStyle').size() > 0) return false;

            sqrDiv.innerHTML = '_<style type="text/css" id="cptrStyle">' + snippets.stylesheet.sqr + '</style>';
            sqrBgDiv.innerHTML = '_<style type="text/css" id="sqrBgStyle">' + snippets.stylesheet.sqrBg.replace('#{picUrl}', _t.picUrl) + '</style>'; //替换#{picUrl}占位符为获取到的图片url 
            sqrDiv.removeChild(sqrDiv.firstChild);
            sqrBgDiv.removeChild(sqrBgDiv.firstChild);
            head.appendChild(sqrDiv.firstChild);
            head.appendChild(sqrBgDiv.firstChild);
        },
        /**
         * @description 设置图片样式方法。用于改变验证码的图片url
         * @memberOf Captcha
         * @instance
         */
        setBgStyle: function () {
            var _t = this,
                stylesheet = document.createElement('style'),
                head = document.getElementsByTagName('head')[0],
                sqrBgDiv = document.createElement('div');

                sqrBgDiv.innerHTML = '_<style type="text/css" id="sqrBgStyle">' + snippets.stylesheet.sqrBg.replace('#{picUrl}', _t.picUrl) + '</style>';
                sqrBgDiv.removeChild(sqrBgDiv.firstChild);
                $('#sqrBgStyle').remove();
                head.appendChild(sqrBgDiv.firstChild);
        },
        /**
         * @description 请求验证码方法。请求成功会设置控件的一系列参数
         * @param  {string}   url      获取验证码的url
         * @param  {Function} callback 获取验证码成功后的回调函数
         * @memberOf Captcha
         * @instance
         */
        requestCaptcha: function (url, callback) {
            var _t = this,
                telNumber = $('#' + _t.settings.phoneId).val(),
                telParam = '',
                cptrParam = !!_t.cptrKey ? ('&str=' + _t.cptrKey) : '',
                message,
                timer = setTimeout(function () {

                    if(_t.state === 'loading') {
                        message = '获取验证码超时，请检查网络连接！';
                        _t.setErrorState(message);
                        _t.injector = _t['renderErrorCaptcha'];
                        
                        if(typeof callback === 'function') callback(message, _t.injector);

                    }

                }, 10000); // 超时10秒仍然处于loading状态时则置为错误状态

            telParam = 'tel_number=' + telNumber;
            _t.setLoadingState(); // 设置控件的state为loading状态，此时屏蔽更换图片功能
            _t.injector = _t['renderLoadingCaptcha'];
            callback('正在获取验证码...',  _t.injector);

            $.ajax({
                url: url,
                type: 'get',
                async: true,
                data: telParam + cptrParam,
                dataType: 'jsonp',
                success: function (json) {
                    var data,
                        rand = '?v=' + (new Date().getTime());

                    clearTimeout(timer);
                    // 验证码超时加载错误
                    if(_t.state === 'error') return false;

                    if(json && json.code == '0') {
                        data = json.data;
                        _t.setReadyState();
                        _t.ysnkt = decryptLength(data.ysnkt); // 解密验证码长度
                        // 通过返回的type装载不同类型的验证码
                        if(typeof cptrMap[data.type] === 'string') {
                            _t.type = data.type;
                            _t.cptrType = cptrMap[data.type];
                            _t.injector = _t['render' + _t.cptrType + 'Captcha'];
                        } else {
                            data = '获取验证码失败！';
                            _t.setErrorState(data);
                            _t.injector = _t['renderErrorCaptcha'];
                        }
                        // type为700时，将获取验证码的url设置为语音拨打电话的url
                        if(_t.type == 700 && !!data.callphoneurl) {
                            _t.getUrl = data.callphoneurl;
                        }
                        // 设置图片url
                        if(!!data.img) {

                            if(!isIE6 && !isIE7) {
                                _t.picUrl = 'data:image/png;base64,' + data.img;
                            } else {
                                _t.picUrl = _t.settings.IE6GetImageUrl + rand;
                            }
                            
                            _t.setBgStyle();
                        } else {
                            _t.picUrl = '';
                        }

                        // 向callback方法传递data和生成方法
                        if(typeof callback === 'function') callback(data, _t.injector);

                    }
                    else {
                        data = json.message;
                        _t.setErrorState(data);
                        _t.injector = _t['renderErrorCaptcha'];

                        if(typeof callback === 'function') callback(data, _t.injector);
                    }

                }
            });

        },
        /**
         * @description 设置验证码提示语方法
         * @param  {Function} callback 变更验证码成功后的回调函数
         * @memberOf Captcha
         * @instance
         */
        setPrompt: function (tip) {
            var _t = this;

            if($('#cptrPrompt').length > 0) $('#cptrPrompt').html(tip);

        },
        /**
         * @description 生成图片验证码。对应type: 100, 200
         * @param  {object} data 服务器返回的数据
         * @memberOf Captcha
         * @instance
         * @return {object}      生成的jQuery验证码元素
         */
        renderBscCaptcha: function (data) {
            var _t = this,
                $snippet = _t.getSnippet('wrapper'),
                $th = _t.getSnippet('th'),
                $td = _t.getSnippet('td');
            // 控件属性赋值
            _t.$input = $td.find('#captcha_input');
            _t.$image = $td.find('#cptrImage');
            // 设置元素样式、文字
            _t.$image.addClass('bgfix').css({
                'height': '80px',
                'line-height': '80px'
            });
            _t.$image.html('<a href="javascript:void(0)">看不清</a>');
            // DOM操作
            $snippet.append($th).append($td);
            _t.$elem = $snippet;
            // “看不清”按钮点击事件
            _t.$image.find('a').bind('click', function (e) {
                e.preventDefault(); // IE6 hack
                _t.$input.attr('disabled', true); // 将输入框的disable属性设置为true
                _t.refactor(_t.cptrKey);
            });

            return $snippet;
        },
        /**
         * @description 生成短信或电话验证码。对应type: 400, 500, 700
         * @param  {object} data 服务器返回的数据
         * @memberOf Captcha
         * @instance
         * @return {object}      生成的jQuery验证码元素
         */
        renderMsgCaptcha: function (data) {
            // alert('renderMsgCaptcha');
            var _t = this,
                $snippet = _t.getSnippet('wrapper'),
                $th = _t.getSnippet('th'),
                $td = _t.getSnippet('td');
            // 控件属性赋值
            _t.$input = $td.find('#captcha_input');
            // 设置元素样式、文字
            $td.find('#cptrPrompt').html(data.tip);
            // type为700时，先隐藏输入域和提示语
            if(_t.type === 700) {
                $td.find('#cptrTip').hide();
                _t.$input.hide();
            }
            // DOM操作
            $snippet.append($th).append($td);
            _t.$elem = $snippet;
            // type为700时，需要用户主动点击“获取验证码”，不触发倒计时
            if(_t.type != 700) {
                _t.setCooldownState();
            }
            // “获取验证码”点击事件
            $td.find('#cptrCd a').bind('click', function (e) {
                e.preventDefault(); // IE6 hack

                if(_t.type == 700) {
                    _t.getVoiceCaptcha(_t.getUrl);
                } else {
                    _t.refactor(_t.cptrKey);
                }
                
            });
            return $snippet;
        },
        /**
         * @description 生成九宫格验证码。对应type: 300
         * @param  {object} data 服务器返回的数据
         * @memberOf Captcha
         * @instance
         * @return {object}      生成的jQuery验证码元素
         */
        renderSqrCaptcha: function (data) {
            var _t = this,
                $snippet = _t.getSnippet('wrapper'),
                $th = _t.getSnippet('th'),
                $td = _t.getSnippet('td');
            // 控件属性赋值
            _t.$input = $td.find('#captcha_input');
            _t.$image = $td.find('#cptrImage');
            // 设置元素样式、文字
            _t.$image.html(data.tip + '<a href="javascript:void(0)">看不清</a>');
            if(_t.settings.isEnt) $td.find('#cptrTip').css('position', 'absolute');
            // DOM操作
            $snippet.append($th).append($td);
            _t.$elem = $snippet;
            // 九宫格点击事件
            $td.find('#sqrTable td').bind('click', function (e) {
                var $t = $(this),
                    $inputs = $td.find('#cptrTable td').not('.backspace'),
                    className = $t.attr('class').match(sqrClassReg)[0];

                if(_t.state === 'loading' || $t.hasClass('typed')) return false;

                if($inputs.not('.typed').length === 0) return false;

                $t.addClass('typed');
                _t.appendGrid(className);

            });
            // 退格键点击、鼠标事件
            $td.find('.backspace').bind('click', function (e) {
                _t.removeGrid();
            }).bind('mouseover', function (e) {
                $(this).addClass('hover');
            }).bind('mouseout', function (e) {
                $(this).removeClass('hover');
            });
            // “看不清”按钮点击事件
            _t.$image.find('a').bind('click', function (e) {
                e.preventDefault(); // IE6 hack
                _t.refactor(_t.cptrKey);
            });

            return $snippet;
        },
        /**
         * @description 生成双通道验证码。对应type: 700
         * @param  {object} data 服务器返回的数据
         * @memberOf Captcha
         * @instance
         * @return {object}      生成的jQuery验证码元素
         */
        renderCmbCaptcha: function (data) {
            var _t = this,
                $snippet = _t.getSnippet('wrapper'),
                $th = _t.getSnippet('th'),
                $td = _t.getSnippet('td');
            // 控件属性赋值
            _t.$input = $td.find('#captcha_input');
            // 设置元素样式、文字
            $td.find('#cptrPrompt').html(data.tip);
            
            if(_t.settings.isEnt) $td.find('#cptrTip').css('position', 'absolute');
            // DOM操作
            $snippet.append($th).append($td);
            _t.$elem = $snippet;
            _t.setCooldownState();
            // 九宫格点击事件
            $td.find('#sqrTable td').bind('click', function (e) {
                var $t = $(this),
                    $inputs = $td.find('#cptrTable td').not('.backspace'),
                    className = $t.attr('class').match(sqrClassReg)[0];

                if(_t.state === 'loading' || $t.hasClass('typed')) return false;

                if($inputs.not('.typed').length === 0) return false;

                $t.addClass('typed');
                _t.appendGrid(className);

            });
            // 退格键点击、鼠标事件
            $td.find('.backspace').bind('click', function (e) {
                _t.removeGrid();
            }).bind('mouseover', function (e) {
                $(this).addClass('hover');
            }).bind('mouseout', function (e) {
                $(this).removeClass('hover');
            });
            // “获取验证码”点击事件
            $td.find('#cptrCd a').bind('click', function (e) {
                e.preventDefault(); // IE6 hack

                _t.refactor(_t.cptrKey);
            });

            return $snippet;

        },
        /**
         * @description 生成正在获取中文案
         * @memberOf Captcha
         * @instance
         * @return {object}      生成的jQuery验证码元素
         */
        renderLoadingCaptcha: function (message) {
            var _t = this,
                $snippet = _t.getSnippet('wrapper'),
                $th = _t.getSnippet('th'),
                $td = _t.getSnippet('td');
            // 控件属性赋值
            _t.$input = $td.find('#captcha_input');
            // 设置元素样式、文字
            $td.find('#cptrPrompt').html(message);
            // DOM操作
            $snippet.append($th).append($td);
            _t.$elem = $snippet;

            return $snippet;
        },
        /**
         * @description 生成获取失败的验证码
         * @memberOf Captcha
         * @instance
         * @return {object}      生成的jQuery验证码元素
         */
        renderErrorCaptcha: function (message) {
            var _t = this,
                $snippet = _t.getSnippet('wrapper'),
                $th = _t.getSnippet('th'),
                $td = _t.getSnippet('td');
            // 控件属性赋值
            _t.$input = $td.find('#captcha_input');
            // 设置元素样式、文字
            $td.find('#cptrPrompt').html(message);
            // DOM操作
            $snippet.append($th).append($td);
            _t.$elem = $snippet;
            // “点击重新获取”点击事件
            $td.find('#reget a').bind('click', function (e) {
                e.preventDefault(); // IE6 hack

                if(e.target.tagName.toUpperCase() !== 'A') {
                    return false;
                } else {
                    _t.refactor(_t.cptrKey);
                }

            });

            return $snippet;
        },
        /**
         * @description 追加选中方格方法。用于Sqr和Cmb两种验证码。
         * @param  {string} className 追加方格的class，也代表位置。
         * @memberOf Captcha
         * @instance
         */
        appendGrid: function (className) {
            var _t = this,
                $append = _t.$elem.find('#cptrTable td').not('.backspace,.typed').eq(0), // 验证码输入区域的方格
                queue, // 追加方格的索引
                row, // 追加方格的所在行
                col; // 追加方格的所在列

            if($append.length === 0) return false;

            $append.addClass(className).addClass('typed');
            row = parseInt(sqrClassReg.exec(className)[1], 10);
            col = parseInt(sqrClassReg.exec(className)[2], 10);
            queue = (row - 1) * 3 + col - 1;
            _t.$input.val(_t.$input.val() + queue.toString());
            // _t.$input.focus();

            if(_t.cptrType === 'Sqr') {
                // 固定长度校验
                if(_t.$input.val().length === 4) _t.$input.blur();

            } else if(_t.cptrType === 'Cmb') {

                if(_t.$input.val().length == _t.ysnkt) _t.$input.blur();

            }

        },
        /**
         * @description 移除方格方法。用于Sqr和Cmb两种验证码。
         * @memberOf Captcha
         * @instance
         */
        removeGrid: function () {
            var _t = this,
                $elem = $('#cptrTable').find('.typed').filter(':last'),
                $sqrTable = _t.$elem.find('#sqrTable'),
                className,
                value = _t.$input.val(),
                row,
                col;

                if($elem.length === 0) return false;

                className = $elem.attr('class').match(sqrClassReg)[0];
                row = parseInt(sqrClassReg.exec(className)[1], 10);
                col = parseInt(sqrClassReg.exec(className)[2], 10);
                $elem.removeClass('typed').removeClass(className);
                $sqrTable.find('tr').eq(row - 1).find('td').eq(col - 1).addClass(className).removeClass('typed');
                _t.$input.val(value.substr(0, value.length - 1));
        },
        /**
         * @description 重置九宫格方法
         * @memberOf Captcha
         * @instance
         */
        resetGrid: function () {
            var _t = this,
                $inputs;

            _t.$input.val('');

            if('Sqr,Cmb'.indexOf(_t.cptrType) === -1) return false;

            $inputs = $('#cptrTable td').not('.backspace');
            _t.$elem.find('#sqrTable td').removeClass('typed');
            $inputs.attr('class', '');
        },
        /**
         * @description 设置验证码正在加载状态方法
         * @memberOf Captcha
         * @instance
         */
        setLoadingState: function () {
            var _t = this;
            _t.state = 'loading';

            try {
                _t.$elem.find('#reget a').html('获取中...');
                _t.$elem.find('#cptrCd a').html('获取中...');
                _t.$elem.find('#sqrTable').addClass('loading');
                _t.$image.addClass('loading');
            } catch (e) {}

        },
        /**
         * @description 设置验证码加载完毕状态方法
         * @memberOf Captcha
         * @instance
         */
        setReadyState: function () {
            var _t = this;
            _t.state = 'ready';

            try {
                _t.$elem.find('#reget a').html('获取验证码');
                _t.$elem.find('#cptrCd a').html('获取验证码');
                _t.$elem.find('#sqrTable').removeClass('loading');
                _t.$image.removeClass('loading');
            } catch (e) {}
            
        },
        /**
         * @description 设置冷却状态方法。用于Msg和Cmb两种验证码。
         * @memberOf Captcha
         * @instance
         */
        setCooldownState: function () {
            var _t = this,
                countDown = _t.settings.countDown,
                $elem = _t.$elem.find('#cptrCd');

            interval = setInterval(function () {

                if(countDown === 0) { // 倒计时结束
                    _t.setReadyState();
                    $elem.find('span').hide();
                    $elem.find('a').show();
                    clearInterval(interval);
                } else {
                    $elem.find('span').html(countDown-- + '秒后可重新发送');
                }

            }, 1000);

            _t.state = 'cooldown'; // 倒计时状态设为cooldown
            $elem.find('a').hide().html('获取验证码');
            $elem.find('span').html(countDown-- + '秒后可重新发送').show();
        },
        /**
         * @description 设置校验成功状态方法
         * @memberOf Captcha
         * @instance
         */
        setSuccessState: function () {
            var _t = this,
                $backspace = _t.$elem.find('td.backspace'),
                $indicator = _t.$elem.find('#cptrTip'),
                $success = null;
                $tds = _t.$elem.find('#cptrTable td').not('.backspace');
            
            _t.state = 'success';
            _t.$input.attr('readonly', 'readonly');

            if(_t.cptrType === 'Bsc' || _t.cptrType === 'Msg') {
                $indicator.empty().removeAttr('id');
                $indicator.attr('class', 'chenggong');
            } else {
                _t.$elem.find('#sqrTable').remove();
                $success = $('<td></td>');
                $success.css({'border': '0'}).html('<span class="chenggong"></span>');
                $backspace.hide();
                $indicator.remove();
                $tds.not('.typed').remove();
                $success.insertAfter($backspace);
                $backspace.remove();
            }
            
            clearInterval(interval);
            _t.$elem.find('#cptrCd').remove();
            _t.$elem.find('#cptrPrompt').closest('p').remove();
            _t.$elem.find('#cptrImage').remove();
        },
        /**
         * @description 设置验证码获取失败状态方法
         * @memberOf Captcha
         * @instance
         */
        setErrorState: function (message) {
            var _t = this;

            message = message || '验证码加载失败';

            try {
                _t.$elem.find('#reget a').html('获取验证码');
                _t.$elem.find('#cptrCd a').html('获取验证码');
                _t.$elem.find('#sqrTable').removeClass('loading');
                _t.$image.removeClass('loading');
            } catch (e) {}

            _t.state = 'error';
            _t.type = 0;
            _t.cptrType = 'Error';
            _t.setPrompt(message);
            // alert(message);

        },
        /**
         * @description 设置验证码校验错误状态方法
         * @memberOf Captcha
         * @instance
         */
        setFailState: function () {
            // #TODO: 设置验证码校验错误状态方法
            return false;
        },
        /**
         * @description 验证码校验后的回调方法
         * @memberOf Captcha
         * @instance
         * @return {function} 验证码异步校验回调方法
         */
        afterValidateCaptcha: function (callback) {
            var _t = this;
            return function (json) {
                var bSuccess = false;

                if(json && json.code == '0') {

                    if(json.data.result + '' === 'true') {
                        _t.setSuccessState();
                        _t.$elem.find('#cptrTip').removeAttr('id');
                        bSuccess = true;
                    } else {
                        _t.errorCount++;
                        // @TODO: data.count
                        if(_t.cptrType === 'Sqr'|| _t.cptrType === 'Cmb') {
                            _t.resetGrid(); // 重置九宫格
                            // 处于倒计时状态时不重新获取验证码
                            if(_t.state === 'cooldown') return false;

                            _t.refactor(_t.cptrKey);
                            _t.$input.val('');
                            _t.$input.focus();
                        }
                    }

                }else{
                    _t.errorCount++;
                    _t.refactor(_t.cptrKey);
                    _t.$input.val('');
                    _t.$input.focus();
                    bSuccess = false;
                }
                if(typeof callback === 'function') {
                    callback(bSuccess, _t.state);
                }
                return bSuccess;
            };
        },
        check: function(callback) {
            var _self = this;
            if(_self.state === 'success' && typeof callback === 'function') {
                callback(true);
            }
            
            var data = {
                'captcha_input': _self.$input.val(),
                'captcha_type': _self.type
            }
            if(_self.settings.phoneId){
                var telNumber = $('#' + _self.settings.phoneId).val();
                data.tel_number = telNumber;
            }
            $.ajax({
                url: _self.validateUrl,
                type: 'get',
                dataType: 'jsonp',
                jsonp: 'callback',
                lastValid: '-1',
                data: data,
                success: _self.afterValidateCaptcha(callback),
                error: _self.afterValidateCaptcha(callback)
            })
        }
    };

    var captcha = null;

    var initCaptcha = function (cptrKey, options) {

        // if(isLocked) return false;

        isLocked = true;
        if(!captcha) {
            captcha = new Captcha(cptrKey, options);
        } else if(captcha!=null&&captcha.$image&&$("#cptrImage").length==0){
            /*已经验证通过，但又触发其它验证逻辑之后再次发布失效*/
            if($('#captcha').length > 0) $('#captcha').remove();
            captcha = null;
            captcha = new Captcha(cptrKey, options);
        }else {
            captcha.refactor(cptrKey, options);
        }
    };

    var destroyCaptcha = function () {

        isLocked = false;

        if(!!captcha) {
            captcha.destroy();
            captcha = null;
        }

    };

    // 验证码模块
    var captchaModule = {
        init: initCaptcha,
        destroy: destroyCaptcha,
        check: function(callback) {
            if(!!captcha) {
                captcha.check(callback);
            }
        }
    };
    return captchaModule;
});
/**
 * 文本显示框
 * @module component/textShow
 */
define('component/textShow/js/textShow',['component/base/js/base' , 'util/Class'], function(Base, Class) {

	/**
	 *  @constructor
	 *  @alias module:component/textShow
	 *  @param {Object} opt 配置文件 
	 */
	var textShow = Class.extend(Base);

	/**
	 * 默认的className。包括wrap、title、content、multi
	 * @type {Object}
	 */
	textShow.prototype.CLASS = {
		/** @type {String} 容器的className */
		WRAP: 'textshow',
		/** @type {String} 标题的className */
		TITLE: 'input_text_title',
		/** @type {String} 内容区域的className */
		CONTENT: 'input_text_content',
		/** @type {String} 当前后有内容时，需要增加的class */
		MULTI: 'clearfix'
	};
	textShow.opts={
		/** @type {String} 组件的类型 */
		type: 'textshow',
		/** @type {String} 对应后端的字段 */
		name: '',
		/** @type {Object} 对应后端的字段 */
		view: {
			/** @type {String} 图标的class */
			icoClass: '',
			/** @type {String} 文字的样式 */
			textClass: '',
			/**
			 * @type {String} 限制文字最大长度，多余文字用...代替
			 */
			maxLength:''
		},
		funcs:[]
		
		}
	textShow.prototype.type = 'textShow';
	textShow.prototype.createElem = function() {
		var opts=this.opts;
		this.container = $('<div>');
		this.container.addClass(this.CLASS.WRAP);
		this.container.attr('name', opts.name);
		this.elem=$("<span><span class='"+this.opts.view.icoClass+"'></span><span class='textcon "+this.opts.view.textClass+"'></span></span>")
		this.elem.attr('type', opts.type);
		this.elem.attr('id', opts.name);
		this.setElemView();
		};
	textShow.prototype.setElemView = function() {
		this.container.append(this.elem);
		this.container.addClass(this.CLASS.MULTI);
	};
	
	textShow.prototype.bindDomEvent = function() {
		var _self = this;
		_self.elem.bind('click', function(evt) {
			this.btnId=$(evt.target).attr("id");
			if(this.btnId && this.btnId.length>0){
			_self.container.triggerHandler('clickevent');
			}
		});
	};
	
	textShow.prototype.getValue = function(val){
		return this.btnId;
	};
	textShow.prototype.setValue = function(val){
		if(!val || val === '--') {
			this.container.triggerHandler('clickevent');
		} else {
			if(this.opts.view.maxLength){
				var len=this.opts.view.maxLength;
				var index=val.indexOf('<');
				if(index===-1){
					val=val.substring(0,len)+'...';
				}else{
					var leftCon=val.substring(0,index);
					var rightCon=val.substring(index+1);
					if(index>len){
						val=val.substring(0,len)+'...<'+rightCon;
					}
				}
			}
			this.elem.find(".textcon").html(val);
		}
	};
	/**
	 * 激活该组件，显示组件
	 * 该组件的value收集在formData中
	 * @return {} 
	 */
	textShow.prototype.activate = function(){
		this.opts.isFreeze = false;
		var val = this.getValue();
		this.container.trigger('setAutoAddress');
	};
	/**
	 * 冻结该组件，并隐藏
	 * 该组件的value不收集在formDate中
	 * @return {[type]} [description]
	 */
	textShow.prototype.freeze = function(){
		this.opts.isFreeze = true;
		this.hideRows();
	}

	return textShow;
});
/**
 * 多行文本输入框
 * @module component/textarea
 */
define('component/textarea/js/textarea',['component/base/js/base' , 'util/Class', 'component/popTip/js/popTip', 'Controller/Controller'], function(Base, Class, PopTip, Controller) {
	/**
	 *  @constructor
	 *  @alias module:component/textarea
	 *  @param {Object} opt 配置文件 
	 */
	var Textarea = Class.extend(Base);

	/**
	 * 默认的className。包括wrap、title、content、multi
	 * @type {Object}
	 */
	Textarea.prototype.CLASS = {
		/** @type {String} 容器的className */
		WRAP: 'textarea_wrap',
		/** @type {String} 标题的className */
		TITLE: 'textarea_title',
		/** @type {String} 内容区域的className */
		CONTENT: 'textarea_content',
		/** @type {String} 当前后有内容时，需要增加的class */
		MULTI: 'clearfix'
	};
	Textarea.prototype.type = 'textarea';
	Textarea.prototype.createElem = function() {
		var _self = this;
		var opts = this.opts;
		this.container = $('<div>');
		this.container.addClass(this.CLASS.WRAP);
		this.container.attr('name', opts.name);
        this.container.css('position','relative');
		this.elem = $('<textarea>');
		this.elem.attr('tabindex', opts.tabIndex);
		this.elem.attr('id', opts.name);
		// 增加自定义属性
		for(var key in opts.attr) {
			if(opts.attr.hasOwnProperty(key)) {
				this.elem.attr(key, opts.attr[key]);
			}
		}
		this.setElemView();
		var defaultValue = opts.defaultValue;
		if(defaultValue) {
			_self.elem.val(defaultValue);
			_self.elem.bind('focus', function(e) {
				if(_self.elem.val() === defaultValue) {
					_self.elem.val('');
				}
			});
			_self.elem.bind('blur', function(e) {
				if(_self.elem.val().replace(/^\s+|\s+$/ig, '') === '') {
					_self.elem.val(defaultValue);
				}
			});
		}
	};
	Textarea.prototype.focusTo = function() {
		this.elem.focus();
	};
	Textarea.prototype.setElemView = function() {
		var _self = this;
		var opts = this.opts;
		if (opts.view.width) {
			this.elem.css('width', opts.view.width);
		}
		if (opts.view.height) {
			this.elem.css('height', opts.view.height);
		}
		if (opts.view.placeholder) {
			if(!('placeholder' in document.createElement('textarea'))) {
				_self.fixPlaceHolder(opts.view.placeholder,opts.name);
			}
			this.elem.attr('placeholder', opts.view.placeholder);
		}
		this.container.append(this.elem);
	};
	Textarea.prototype.fixPlaceHolder = function(defaultText,id) {
        var textareaObj=this.elem;
        var label=$('<label>');
        label.html(defaultText);
        label.attr('for',id);
        this.container.prepend(label);
        label.css({
            'color':'#a9a9a9',
            'line-height':'34px',
            'cursor':'text',
            'position':'absolute',
            'left':'8px'
        });
        if(textareaObj.val()!==''){
            label.hide();
        }
        textareaObj.on('focus',hidePlaceholder);
        textareaObj.get(0).attachEvent('onpropertychange',hidePlaceholder_ie);
        textareaObj.on('blur',showPlaceholder);
        function hidePlaceholder(){
            label.hide();
        }
        function hidePlaceholder_ie(){
            if(window.event.propertyName==='value'&&window.event.srcElement.value!==''){
                label.hide();
            }
        }
        function showPlaceholder(){
            if(textareaObj.val().replace(/^\s+$/ig,'')==='') {
                label.show();
            }
        }
	};
	Textarea.prototype.bindDomEvent = function() {
		var _self = this;
		_self.elem.bind('blur', function(e) {
			_self.setClassByStatus();
			// ie中需要调用e.target
			var target = e.relatedTarget;
			// input做特殊处理
			var checkObj = _self.doCheck();
			_self.container.triggerHandler('blur');
			_self.publish(_self.opts.name + '.valueChange', _self.getValue());
			_self.container.trigger('change', [_self.getValue()]);
			if(checkObj.bValid === true && _self.rows.getValidateStatus() !== true) {
				_self.hideTips();
			}
		});
		_self.elem.bind('focus', function(){
			if(_self.opts.view.tips) {
				_self.showTips(_self.opts.view.tips);
			}
			_self.setClassByStatus(Textarea.SETTING.STATUS.FOCUS);
			_self.elem.triggerHandler('focusin');

			//IE6下聚焦时wrap显示边框出现边框
			if($.browser && $.browser.version && $.browser.version == '6.0'){
				_self.container.css('border',0);
			}
		});

		_self.elem.bind(Textarea.EVENT.TYPE.INPUT, function(e) {
			if (e.KeyCode === Textarea.EVENT.KEY_CODE.TAB) {
				_self.elem.triggerHandler('inputover');
			}
			// 考虑如何在初始化时就判断是否进行特殊值的判断？
			var maxLength = $(this).attr('maxLength');
			var value = $(this).val();
			if(!!maxLength) {
				if(value.length >= parseInt(maxLength, 10)) {
					_self.elem.trigger('inputover');
				}
			}
		});
	};

	Textarea.prototype.getValue = function(){
		var value = this.elem.val();
		if(this.opts.view && value === this.opts.view.placeholder && !('placeholder' in document.createElement('input'))) {
			value = '';
		}
		if(this.opts.defaultValue && this.opts.defaultValue == value) {
			value = '';
		}
		return value;
	};
	Textarea.prototype.setValue = function(val, text, bDefault){
		if(bDefault === true) {
			this.rows.show();
		}
		// 必须要传入值
		if(null == val) {
			return;
		}
		this.elem.val(val);
	};
	Textarea.prototype.getCheckValue = function(){
		var value = this.getValue();
		
		var regRN = /[\r\n]/g;
        value = value.replace(regRN,"");
		return value;
	};

	return Textarea;
});
define('component/customTag/js/customTag',['component/base/js/base' , 'util/Class'], function(Base, Class){
	/**
	 *  @constructor
	 *  @alias module:component/customTag
	 *  @param {Object} opt 配置文件 
	 */
	var CustomTag = Class.extend(Base);

	/**
	 * 默认的className。包括wrap、title、content、multi
	 * @type {Object}
	 */
	CustomTag.prototype.CLASS = {
		/** @type {String} 容器的className */
		WRAP: 'tag_wrap',
		/** @type {String} 标题的className */
		TITLE: 'input_text_title',
		/** @type {String} 内容区域的className */
		CONTENT: 'input_text_content',
		ITEM: 'tag',
		/** @type {String} 当前后有内容时，需要增加的class */
		MULTI: 'clearfix'
	};
	CustomTag.prototype.type = 'customTag';
	CustomTag.prototype.tmpl = {
		wrap: '<div class="{{CLASS.WRAP}} {{CLASS.MULTI}}"></div>',
		item: '<div class="{{CLASS.ITEM}}" ><input type="text"/><a style="display:none;" href="javascript:void(0);"><span></span><em>x</em></a></div>'
	};

	CustomTag.prototype.createElem = function() {
		var outerHtml = this.replaceTmpl(this.tmpl.wrap)
		this.container = $(outerHtml);		
		var length = this.opts.view.size || 1;
		this.items = [];
		for(var i=0; i<length; i++) {
			var item = $(this.replaceTmpl(this.tmpl.item))
			if(this.opts.view && this.opts.view.maxLength) {
				item.find('input').attr('maxLength', this.opts.view.maxLength);
			}
			this.container.append(item);
		}
	};
	CustomTag.prototype.replaceTmpl = function(tmplHtml) {
		var _self = this;
		tmplHtml = tmplHtml.replace(/{{([^}}]+)?}}/ig, function(originStr, value, index){
			var keys = value.split('.');
			var returnValue = _self;
			for(var i=0; i<keys.length; i++) {
				returnValue = returnValue[keys[i]];
			}
			return returnValue;
		});
		return tmplHtml;
	};
	CustomTag.prototype.bindDomEvent = function(){
		var _self = this;
		// 标签点击事件处理
		this.container.delegate('.tag', 'click', function(e) {
			var index = $(this).index();
			var target = e.target;
			var tagName = target.tagName.toLowerCase();
			// console.log('index: ' + index);
			switch(tagName) {
				case 'input':
					_self.hideTips();
					$(target).removeClass('tag_input_error');
					break;
				case 'a':
					break;
				case 'em':
					_self.flush(index);
					break;
				case 'span':
					_self.reWriteTag(index);
					break;
			}
		});
		// 绑定input blur事件处理
		this.container.delegate('.tag input', 'blur', function(e) {
			var parent = $(this).parents('.tag');
			var index = parent.index();
			var text = $(this).val();
			// todo doCheck
			_self.getCheckValue = function(){
				return text;
			};
			var checkObj = _self.constructor.superclass.doCheck.call(_self);
			if(checkObj.bValid) {
				_self.display(index, text);
			} else {
				$(this).addClass('tag_input_error');
			}
		});
	};

	CustomTag.prototype.getClassByStatus = function(status) {
		return CustomTag.prototype.type + '_' + status;
	}

	/**
	 * 重写标签，当前input显示
	 * @param  {Number} index 标签索引值
	 * @return {}       
	 */
	CustomTag.prototype.reWriteTag = function(index) {
		var curElem = this.container.find('.tag').eq(index);
		if(curElem.length > 0) {
			curElem.find('a').hide();
			curElem.find('input').show().focus();
		}
	};

	/**
	 * 清空标签
	 * @param  {Number} index 需要清空的索引号
	 * @return {}       
	 */
	CustomTag.prototype.flush = function(index) {
		var curElem = this.container.find('.tag').eq(index);
		if(curElem.length > 0) {
			curElem.find('a span').html('');
			curElem.find('a').hide();
			curElem.find('input').val('').show().focus();
		}
	};
	CustomTag.prototype.getValue = function() {
		var valueList = [];
		this.container.find('.tag span').each(function(){
			var value = $(this).html();
			if(value) {
				valueList.push(value);
			}
		});
		return valueList.join(',');
	};

	/**
	 * 显示标签，标签置于显示阶段，不可编辑
	 * @param  {Number} index 标签的索引值
	 * @return {}       
	 */
	CustomTag.prototype.display = function(index, text) {
		// 不能显示空
		if(!text) {
			return;
		}
		var curElem = this.container.find('.tag').eq(index);
		if(curElem.length > 0) {
			curElem.find('span').html(text);
			curElem.find('a').show();
			curElem.find('input').val(text).hide();
		}
	};
	/** 重写doCheck方法 */
	CustomTag.prototype.doCheck = function() {
		var _self = this;
		var valueList = [];
		var validObj = {
			bValid: true,
			msg: ','
		};
		_self.container.find('input').each(function(){
			var value = $(this).val();
			if(value) {
				_self.getCheckValue = function() {
					return value;
				}
				var checkObj = _self.constructor.superclass.doCheck.call(_self);
				if(checkObj.bValid === false) {
					validObj = checkObj;
				}
			}
		});
		return validObj;

	};
	CustomTag.prototype.setValue = function(text, other, status) {
		if(!text || typeof text !== 'string') {
			return;
		}
		if(text.indexOf(',') > -1) {
			var textList = text.split(',');
			var tags = this.container.find('.tag');
			for(var i=0; i<textList.length; i++) {
				if(i < tags.length) {
					this.display(i, textList[i]);
				}
			}
		}
	/*	if(text.indexOf('#') > -1) {
			var textList = text.split('#');
			var tags = this.container.find('.tag');
			for(var i=0; i<textList.length; i++) {
				if(i < tags.length) {
					this.display(i, textList[i].split('@')[1]);
				}
			}
		}*/
	};

	return CustomTag;
});
define('component/draft/js/draft',['Controller/Controller','libs/json2.min'],function(Controller,JSON){
	//埋点函数
	function clcLog(str){
		if(typeof(clickLog)==="function"){
			clickLog(str);
		}
	}
	var draft = {

		lastData : '',//上次本地保存的表单数据
		defaultValue: '',//表单的默认值
		initFormData :'',//表单初始值，包括默认值和后台取得的值
		selector : '',//提示框所在的下一个元素选择器，字符串
		timing:'',//检查是否保存定时器
		flag:false,//标志不用弹窗的链接

		//初始化60
		//
		init: function(dispCateId, dispLocalId, clientType, GTID, selector){
			//判断页面是否有hasDraft变量，若没有，则退出
			if(typeof hasDraft==='undefined'){
				return;
			}
			draft.defaultValue=draft.initFormData=draft.lastData=Controller.getFormData();
			draft.selector=selector;
			//判断是否有草稿存在
			
			if(hasDraft.code===1){
				//存在草稿处理过程
				draft.getDraft(dispCateId, dispLocalId, clientType, GTID);
			}
			//判断是否需要弹窗
			draft.confirm();

			draft.start(dispCateId, dispLocalId, clientType, GTID);
			Controller.handlers.bind('afterSubmit', 'draft', function(data) {
				if(data.action==="redirect"){
					draft.stop();
				}
			});
		},

		//开启定时器
		start: function(dispCateId, dispLocalId, clientType, GTID){
			if(!draft.timing){
				draft.timing=setInterval(function(){
					//提取页面表单数据
					var data = Controller.getFormData();
					if(draft.diff(data,draft.lastData)){
						if(draft.diff(data,draft.defaultValue)){
							draft.saveDraft(dispCateId, dispLocalId, clientType, GTID,JSON.stringify(data));
							draft.lastData=data;
						}else{
							draft.removeDraft(dispCateId, dispLocalId, clientType, GTID);
						}
						
					}
				},60*60*1000);
			}
		},

		//停止计时器
		stop: function(){
			if(draft.timing){
				clearInterval(draft.timing);
				draft.timing=null;
			}
			draft.unbind_link();
			window.onbeforeunload=null;
		},
	

		//从服务器取数据
		getDraft : function(dispCateId, dispLocalId, clientType, GTID){
			$.ajax({
				type:'GET',
				url:"//post.58.com/repo/getDraft",
				data:{
					"dispCateId":dispCateId,
					"dispLocalId":dispLocalId,
					"clientType":clientType,
					"GTID":GTID,
					"draftId":hasDraft.draftId
				},
				dataType:"json",
				success:function(re){
					if(re.code===1){
						//展示一键清空草稿入口及交互效果绑定
						draft.createTip(re.lastModifyTime,draft.selector);
						draft.emptyTip(dispCateId, dispLocalId, clientType, GTID);
						draft.closeTip();
                        //向页面表单中填充数据
						Controller.setFormData(re.data,2);
                        /*小区为空时清楚验证信息*/
                        if(!(re.data.xiaoqu && re.data.xiaoquname)){
                            var Validate = require('component/validate/js/validate');
                            var xiaoquComp = Controller.records.get('xiaoqu');
                            if(xiaoquComp){
                                xiaoquComp.setClassByStatus("");
                                Validate.hideTip(xiaoquComp.rows.containerElem.find('.tip'));
                            }
                        }
						draft.initFormData=re.data;
					}
				}
			});
		},

		//向服务器发送请求保存数据
		saveDraft : function(dispCateId, dispLocalId, clientType, GTID,data){ 	
			$.ajax({
				type:"POST",
				url:"//post.58.com/repo/saveDraft",
				data:{
					"dispCateId":dispCateId,
					"dispLocalId":dispLocalId,
					"clientType":clientType,
					"GTID":GTID,
					"data":data,
					"draftId":hasDraft.draftId
				},
				dataType:"json",
				success:function(re){}
			});
		},

		//向服务器请求删除草稿箱
		removeDraft : function(dispCateId, dispLocalId, clientType, GTID){
			$.ajax({
				type:"POST",
				url:"//post.58.com/repo/removeDraft",
				data:{
					"dispCateId":dispCateId,
					"dispLocalId":dispLocalId,
					"clientType":clientType,
					"GTID":GTID,
					"draftId":hasDraft.draftId
				},
				dataType:"json",
				success:function(re){
                    draft.lastData=draft.defaultValue;
                }
			});
		},

		//创建意见清空草稿箱入口,参数为上次保存的时间
		createTip : function(time,selector){
			var html=['<div id="tip">'];
			html.push('<span>信息已于'+time+'保存'+'</span>');
			html.push('<a>清空草稿</a><span class="close"></span></div>');
			$(selector).before($(html.join('')));
			//提示有草稿箱埋点
			clcLog('from=post_fill_draft_show');
		},

		//点击清空草稿后，给出“草稿信息已清空”提示，提示展现后消失。展现的时间为2S
		emptyTip : function(dispCateId, dispLocalId, clientType, GTID){
			$("#tip a").click(function(){
				draft.removeDraft(dispCateId, dispLocalId, clientType, GTID);
				//恢复表单默认值
				Controller.setFormData(draft.defaultValue,true);
				//删除表单中的图片
				$(".img_list").html("<li class='first_icon'><i></i></li>");
				var instance=Controller.records.get('Pic');
				instance.imgList=[];
				instance.enableUploadBtn();
				//输入框、选择框恢复初始加载样式
				$('.tip').hide();
				$('.input_text_wrap').removeClass('error focus');
				$('.selectordef').removeClass('error focus');
				
				$("#tip").empty();
				$("#tip").append($('<span>草稿信息已清空</span>'));
				setTimeout(function(){
					$("#tip").css("display","none");
				},2000);
				//清空草稿埋点
				clcLog('from=post_fill_draft_empty');
			});
		},

		// 点击关闭按钮，无重新打开入口
		closeTip : function(){
			$("#tip .close").mouseover(function(){
				$(this).addClass("hover");
			});
			$("#tip .close").mouseout(function(){
				$(this).removeClass("hover");
			});
			$("#tip .close").click(function(){
				$("#tip").css("display","none");
				//清空草稿关闭按钮埋点
				clcLog('from=post_fill_draft_close');
			});
		},

		//链接跳转弹窗的检查
		link_check : function(){
			// IE下为删除图片、前进、后退链接做特殊处理
			$('.toolbar a.delete,.toolbar a.prev_pos,.toolbar a.next_pos').click(
				function(){
					draft.flag=true;
				});

			$('body').delegate('a','click.link_check',function(e){
				var link=$(e.currentTarget);
				var href=link.attr('href');
				if(typeof href!=="undefined"&&href!==""){
					var target=link.attr('target');
					var index_post=href.indexOf("post.58.com");
					var index_passport=href.indexOf("passport.58.com");
					var index_jsvoid=href.indexOf("javascript");
					if(index_post===-1&&index_passport===-1&&index_jsvoid===-1&&href.charAt(0)!=='/'&&(target==="_self"||typeof target==="undefined")){
						var con=confirm("您填写的信息还没有提交,确认离开此页?");
						//弹窗展现埋点
						clcLog('from=post_fill_show1');
						if(!con){
							//确定离开埋点
							clcLog('from=post_fill_leave');
							return false;
						}else{
							//继续填写埋点
							clcLog('from=post_fill_continue');
						}
					}
					if(index_post>-1||index_passport>-1||index_jsvoid>-1){
						draft.flag=true;
					}
				}
			});
		},

		//解绑链接单击事件
		unbind_link : function(){
			$('body').undelegate('a','click.link_check');
		},

		//刷新或关闭浏览器窗口的弹窗检查
		win_check : function(){
			window.onbeforeunload=function(){
				if(!draft.flag){
					//窗口展现埋点
					clcLog('from=post_fill_show2');
                    setTimeout(onunloadcancel, 10);
					return "您填写的信息还没有提交,确认离开此页?";
				}else{
					draft.flag=false;
				}
			};
            window.onunloadcancel = function(){
                draft.repair_setData();
            }
		},

		//判断比较表单内容是否改变，返回值为布尔型
		//第一个参数为表单中填写的数据，第二个参数为从后台取得的数据
		diff : function(data,data_back){
			var need_save=false;
			for(var key in data){
				if(data.hasOwnProperty(key)&&data[key]!==data_back[key]){
					need_save=true;
					break;
				}
			}
			return need_save;
		},

		//判断是否新增或修改了表单的内容,若有修改则弹窗
		confirm : function(){
			var t=setInterval(function(){
				var data=Controller.getFormData();
				if(draft.diff(data,draft.initFormData)){
					clearInterval(t);
					t=null;
					draft.link_check();
					draft.win_check();
				}
			},300);
		},
        //特殊处理--数据修复设置
        repair_setData:function(){
            if(____json4fe.catentry[1].dispid==8 || ____json4fe.catentry[1].dispid==10){
                var hireTypeComp = Controller.records.get('HireType');
                if(!hireTypeComp){
                   return;
                }
                if(____json4fe.catentry[1].dispid==8 && hireTypeComp.getValue()!=2){
                    hireTypeComp.setValue(2);
                }else if(____json4fe.catentry[1].dispid==10 && hireTypeComp.getValue()==2){
                    var repairValue=datasrc["HireType"].defaultValue;
                    if(draft.lastData && (draft.lastData['HireType']==0 || draft.lastData['HireType']==1)){
                        repairValue=draft.lastData['HireType'];
                    }
                    hireTypeComp.setValue(repairValue);
                }
            }
        }
	};
	return {
		init : draft.init
	};

});


/**
 * 文本输入框
 * @module component/inputText
 */
define('component/text/js/text',['component/base/js/base' , 'util/Class', 'component/popTip/js/popTip', 'Controller/Controller'], function(Base, Class, PopTip, Controller) {

	/**
	 *  @constructor
	 *  @alias module:component/text
	 *  @param {Object} opt 配置文件 
	 */
	var Text = function(opts){
		this.opts = $.extend(true, {funcs:[]}, opts);
		this.init();
		this.bindCustomEvent();
	};
	Text.prototype.CLASS = {
		/** @type {String} 容器的className */
		WRAP: 'sep_wrap'
	};
	Text.prototype = {
		constructor: Text,
		type: 'text',
		CLASS: {
			/** @type {String} 容器的className */
			WRAP: 'sep_wrap'
		},
		init: function() {
			this.createElem();
		},
		createElem: function() {
			var str = '';
			try{
				str = '<div class="' + this.CLASS.WRAP + '">' + this.opts.view.text + '</div>';
			}catch(e){
			}
			if(str) {
				this.elem = $(str);
				this.container = this.elem;
			}
		},
		render: function(wrapElem) {
			if(this.elem) {
				wrapElem.append(this.elem);
			}
		},
		/*二手车发布页，选择品牌之后，在一句话广告上面的品牌显示-----使用carBrrand组件的时候使用*/
		setBiaoti : function(str){
			this.opts.view.text = str.pinpai;
			$(this)[0].elem[0].innerText = str.pinpai;
		},
		hide:function(){
			this.elem.hide();
		},
		show:function(){
			this.elem.show();
		},
		/**
		 * 通过opts.funcs绑定自定义事件
		 */
		bindCustomEvent: function() {
			var _self = this;
			var funcs = _self.opts.funcs;
			var l = funcs.length;
			var funcObj;
			for (var i = 0; i < l; i++) {
				funcObj = funcs[i];
				_self.container.bind(funcObj.evt, funcObj.handlers, function(e){
					_self.customEvent(e)
				});
				// console.log('bindCustomEvent');
			}
		},
		/**
		 * 自定义事件处理函数
		 * @enum {Object}
		 */
		customEvent: function(evt) {
			// console.log('customEvent');
			// 把当前的name值赋值到evt对象上
			evt.sourceName = this.opts.name;
			// 自定义事件需要通知控制
			Controller.triggerEvent(evt);
		}
	};
	return Text;
});
/**
 * 文本输入框
 * @module component/linkInput
 */
define('component/linkInput/js/linkInput',['component/base/js/base' , 'util/Class', 'component/popTip/js/popTip', 'component/inputText/js/inputText', 'Controller/Controller'], function(Base, Class, PopTip, Input, Controller) {

	/**
	 *  @constructor
	 *  @alias module:component/linkInput
	 *  @param {Object} opt 配置文件 
	 */
	var LinkInput = Class.extend(Base);

	/**
	 * 默认的className。包括wrap、title、content、multi
	 * @type {Object}
	 */
	LinkInput.prototype.CLASS = {
		/** @type {String} 容器的className */
		WRAP: 'link_input_wrap',
		/** @type {String} 标题的className */
		TITLE: 'link_input_title',
		/** @type {String} 内容区域的className */
		CONTENT: 'link_input_content',
		/** @type {String} 当前后有内容时，需要增加的class */
		MULTI: 'clearfix'
	};
	LinkInput.prototype.type = 'linkInput';
	LinkInput.prototype.createElem = function() {
		this.inputs = [];
		var inputElem;
		this.container = $('<div class="' + this.CLASS.WRAP + '"></div>');
		for(var i=0; i<this.opts.inputLength; i++) {
			var input = new Input(this.opts)
			this.inputs.push(input);
			if(i>0) {
				this.container.append('<div class="sep_wrap">' + this.opts.sepText + '</div>');
			}
			this.container.append(input.container);
		}

	};
	LinkInput.prototype.setValue = function(text, other, status) {
		var textList = text.split(this.opts.sepText);
		var i=0;
		var length = this.inputs.length;
		for(; i<length; i++) {
			this.inputs[i].setValue(textList[i] || '', other, status);
		}
	};
	LinkInput.prototype.doCheck = function() {
		var returnObj = {
			bValid: true,
			msg: ''
		};
		var i=0;
		var length = this.inputs.length;
		for(; i<length; i++) {
			var checkObj = this.inputs[i].doCheck();
			if(checkObj.bValid === false) {
				returnObj = checkObj;
			}
		}
		return returnObj;
	};
	LinkInput.prototype.getValue = function(){
		var valueList = [];
		var i=0;
		var length = this.inputs.length;
		for(; i<length; i++) {
			valueList.push(this.inputs[i].getValue());
		}
		return valueList.join(this.opts.sepText);

	};
	LinkInput.prototype.render = function(wrapElem){
		this.constructor.superclass.render.call(this, wrapElem);
		var i=0;
		var length = this.inputs.length;
		for(; i<length; i++) {
			this.inputs[i].rows = this.rows;
		}
	};

	return LinkInput;
});
/*
 * @author:jingduoduo@58.com
 * @contributor: jianghongwei@58.com
 * @date:2015/07/06
 * @brief:前端错误检测上报代码
 * @version：1.1
 * */
define('util/errorLog',[],function(){
    function registErrorHandler(callback) {
        var oldErrorHandler = window.onerror;
        window.onerror = function(message, url, line, column, error){
            // 不干扰其他程序
            if(typeof oldErrorHandler === 'function') {
                oldErrorHandler.apply(this, arguments);
            }
            var stack = '';

            if (!!error && !!error.stack){
                //如果浏览器有堆栈信息
                //直接使用
                stack = error.stack.toString();
            }else if (!!arguments.callee){
                //尝试通过callee拿堆栈信息
                var ext = [];
                var f = arguments.callee.caller, c = 3;
                //这里只拿三层堆栈信息
                while (f && (--c>0)) {
                   ext.push(f.toString());
                   if (f  === f.caller) {
                        break;//如果有环
                   }
                   f = f.caller;
                }

                stack = ext.join("||");
            }

            var data = {
                msg: message,
                url: url,
                line: line,
                column: column || (window.event && window.event.errorCharacter) || -1,
                stack: stack,
                ua: navigator.userAgent,
                href: location.href
            };

            callback(data);
            return false;
        };
    }

    return {
        regist: function(callback){
            registErrorHandler(callback);
        }
    }
});
/**
 * QQ临时会话组件
 * @module component/qqInput
 */
define('component/qqInput/js/qqInput',['component/base/js/base', 'util/Class', 'Controller/Controller', 'component/popwin/js/popwin'], function (base, Class, Controller, popwin) {

    var QQlink = window.QQlink = {};
    QQlink.addone = function (data) {
        if (data && data.code == 0 && data.data) {
            window.closeopendiv();
            $("#addQQ").hide();
            var qqlinkElem=$('#qqlink');
            qqlinkElem.find(".mos-text").hide();
            qqlinkElem.find(".mos-text-del").html('<em class="qq-thumb"><input type="hidden" name="globalQQOpenId" value="' + data.data.key + '"  ><input type="hidden" name="postparam_openidtype" value="2"  ><img src="' + data.data.figureurl + '"/></em>' + data.data.nickname).show();
            qqlinkElem.removeClass("focus");
        }
    }

    /**
     *  @constructor
     *  @alias module:component/linkInput
     *  @param {Object} opt 配置文件
     */
    var qqInput = Class.extend(base);
    /**
     * 默认的className。包括wrap、title、content、multi
     * @type {Object}
     */
    qqInput.prototype.CLASS = {
        /** @type {String} 容器的className */
        WRAP: 'qq_input_wrap',
        /** @type {String} 标题的className */
        TITLE: 'qq_input_title',
        /** @type {String} 内容区域的className */
        CONTENT: 'qq_input_content',
        /** @type {String} 当前后有内容时，需要增加的class */
        MULTI: 'clearfix'
    };
    qqInput.prototype.type = 'qqInput';
    var qqInput_Zindex = 1502;

    qqInput.prototype.createElem = function () {
        this.container = $('<div>');
        this.container.addClass(this.CLASS.WRAP);
        this.container.attr('name', this.opts.name);
        this.container.attr('id', "qqlink");

        this.elem = $('<div class="moselect" tabindex="'+this.opts.tabIndex+'">' +
                        '<span class="mos-text">' +
                            '<em class="qq-thumb">' +
                                '<img src="//img.58cdn.com.cn/ui7/post/pc/imgs/qqinput_figure24.png"/>' +
                            '</em>点击此处添加QQ联系人' +
                        '</span>'+
                        '<span class="mos-text-del" style="display:none">' +
                            '<em class="qq-thumb">' +
                                '<img src=""/>' +
                            '</em>' +
                        '</span>' +
                        '<span class="qq-arrow"><span class="top"></span><span class="bot"></span></span>' +
                    '</div>');
        this.container.append(this.elem);
        this.elemOption = $('<div class="moselect-con">' + this.createOption() + '<a href="javascript:void(0);" class="addcontact">+ 新增QQ联系人</a></div>');
        this.container.append(this.elemOption);
    }
    qqInput.prototype.createOption = function (options) {
        if (options) {
            var optionData = options;
        } else {
            var optionData = this.data;
        }
        if (!optionData) {
            return ""
        }
        var ulHtml = "";
        if (optionData.values.length > 0) {
            ulHtml = '<ul class="moselect-item">';
            for (var i = 0; i < optionData.values.length; i++) {
                if (optionData.values[i]) {
                    ulHtml += '<li openid="' + optionData.values[i].val + '" idtype="1"><a href="javascript:void(0);"><em class="qq-thumb"><img src="' + optionData.values[i].icon + '"/></em>' + optionData.values[i].text + '</a></li>';
                }
            }
            ulHtml += "</ul>";
        }
        return ulHtml;
    }

    function showMosText(_self) {
        _self.elemOption.hide();
        _self.rows.containerElem.css("zIndex","");
        _self.block.containerElem.css("zIndex","");
        var value = _self.elem.find('.mos-text-del').text();
        if (value == "") {
            _self.elem.find('.mos-text').show();
            _self.elem.find('.mos-text-del').hide();
        }
    }

    // dom事件注册
    qqInput.prototype.bindDomEvent = function () {
        var _self = this;
        _self.elem.bind("click", function (event) {
            _self.container.addClass("focus");
            if (_self.elemOption.find("li").length > 0) {
                if (_self.elemOption[0].style.display != "block") {
                    _self.elemOption.show();
                    _self.elem.find(".mos-text").hide();
                    _self.rows.containerElem.css("zIndex",qqInput_Zindex+100);
                    _self.block.containerElem.css("zIndex",qqInput_Zindex+100);

                }else {
                    showMosText(_self);
                }
                $(document).one('click', function () {
                    showMosText(_self);
                    _self.container.removeClass("focus");
                });
                event.stopPropagation();
            } else {
                _self.elemOption.find(".addcontact").click();
            }
        });
        _self.elem.find(".mos-text-del").hover(
            function () {
                _self.elem.find(".mos-text-del").append('<i class="ico-textdel">×</i>').addClass("greybg");
            },
            function () {
                _self.elem.find(".mos-text-del i").remove(".ico-textdel");
                _self.elem.find(".mos-text-del").removeClass("greybg");
            });

        _self.elem.find(".mos-text-del").bind("click", function (evt) {
            if ($(evt.target).hasClass("ico-textdel")) {
                _self.elem.find(".mos-text-del").hide().removeClass("greybg").empty();
                _self.elem.find(".mos-text").show();
                return false;
            }
        });

        _self.elemOption.bind("click", function (evt) {
            if (evt.target.tagName.toLowerCase() == "a" && $(evt.target).parent()[0].tagName.toLowerCase() == "li") {
                var liElem = $(evt.target).parent();
                _self.setMosTextDelValue(liElem.attr("openid"), liElem.attr("idtype"), liElem.find("img")[0].src, liElem.text());
            }
        });
        _self.elemOption.find(".addcontact").bind("click", function (evt) {
            window.setbg("添加QQ联系人", "about:blank", 400, 396, true,(function(){$('#qqlink').removeClass("focus");$("#addQQ").hide();}));
            $(".fe_window_mask").css({
                "height": document.documentElement.clientHeight + "px",
                "width": document.documentElement.clientWidth + "px"
            });
            $(".fe_window .load").hide();
            if($("#addQQ").length>0){
                $("#addQQ").show();
            }else{
                $(".fe_window iframe").after("<div id='addQQ'></div>");
            }
            $(".fe_window iframe").hide();
            $.getJSON("//passport.58.com/qqauthscriptui?source=huangye&successFunction=QQlink.addone&callback=?", function (data) {
                $(".fe_window_iframe").hide();
                setTimeout(function () {
                    $(".fe_window_iframe").hide()
                }, 300);
                $("#addQQ").html(data);
            })
        });
    };
    qqInput.prototype.setMosTextDelValue=function(openId, idtype, figureurl, nickname){
        this.elem.find(".mos-text").hide();
        this.elem.find(".mos-text-del").html('<em class="qq-thumb"><input type="hidden" name="globalQQOpenId" value="' + openId + '"  ><input type="hidden" name="postparam_openidtype" value="'+idtype+'"><img src="' + figureurl + '"/></em>' + nickname).show();
        this.container.removeClass("focus");
    }
    qqInput.prototype.setValue = function (value, text, status) {
        if(this.data){
            var selQQ=null;
            if (this.data.values.length > 0) {
                for (var i = 0; i < this.data.values.length; i++) {
                    if(this.data.values[i]&&this.data.values[i].val==value){
                        selQQ=this.data.values[i];
                        break;
                    }
                }
            }
            if(selQQ!=null){
                //qqlist中的数据会出现在下拉列表中，如果qq号是qqlist中提供的数据，postparam_openidtype都传1，如果qq号是用户点击“新增qq联系人”添加的，postparam_openidtype就传2
                this.setMosTextDelValue(selQQ.val, 1, selQQ.icon, selQQ.text);
            }
        }
    };
    qqInput.prototype.getValue = function () {
        var mosTextDel=$("#qqlink .mos-text-del");
        if(mosTextDel && mosTextDel.is(":visible")==true){
            return {
                globalQQOpenId:mosTextDel.find("input[name='globalQQOpenId']").val(),
                postparam_openidtype:mosTextDel.find("input[name='postparam_openidtype']").val()
            }
        }else{
            return {
                globalQQOpenId:'',
                postparam_openidtype:''
            }
        }
    };
    
    return qqInput;
});


/**
 * 验证码输入框扩展组件
 * @module component/captchaInput
 */
define('component/captchaInput/js/captchaInput',['util/Class','component/inputText/js/inputText',"Controller/Controller"], function(Class,InputText,Controller) {
	/**
	 *  @constructor
	 *  @alias module:component/captchaInput
	 *  @param {Object} opt 配置文件
	 */
	var CaptchaInput = Class.extend(InputText);

	CaptchaInput.prototype.type = 'captchaInput';
	CaptchaInput.prototype.yzmStatus = 'success';   //当前验证状态
	CaptchaInput.prototype.setElemView = function() {
		var _self = this;
		var opts = this.opts;
		if (opts.view.width) {
			this.elem.css('width', opts.view.width);
		}
		if (opts.view.placeholder) {
			if(!('placeholder' in document.createElement('input'))) {
				_self.fixPlaceHolder(opts.view.placeholder,opts.name);
			}
			this.elem.attr('placeholder', opts.view.placeholder);
		}
		this.container.append(this.elem);
		// 添加到父元素上
		if (opts.view.afterText || opts.view.beforeText) {
			this.container.append($(opts.view.afterText));
			this.container.prepend($(opts.view.beforeText));
			this.container.addClass(this.CLASS.MULTI);
		}

		if (opts.view.aText) {
			var $aText = $(opts.view.aText).addClass('getYzm');
			this.yzmel = $aText;
			this.container.after($aText);
		}
		var vtip = $('<div class="vYzmTip"><div class="vYzmTipDiv"></div><span>没有收到短信，试试<a class="vioceYzm">语音验证码</a>吧!</span></div>');

		this.container.after(vtip);
		this.vtipContainer = vtip;
		this.vtip = this.vtipContainer.find('.vioceYzm');
	};
	CaptchaInput.prototype.doWukongCheck = function(){
		return Controller.limit.validateYzm();
	}
	return CaptchaInput;
});
define("component/limitpost/js/limitpost", ["Controller/Controller", "util/util", "component/popTip/js/popTip", "component/validate/js/validate"], function(Controller, Util, popTip, validate) {
    var LimitPost = function(config) {
        var defaultConfig = {
            /*前置登录状态校验接口*/
            validateStateUrl: "https://passport.58.com/wukong/userstate",
            /*自动填充电话号码接口*/
            autofillphoneUrl: "//post.58.com/repo/autofillphone",
            /*校验电话号码接口 --二手车--*/
            validatePhoneUrl: "//post.58.com/repo/checkphoneV2", //v2
            /*获取验证码接口*/
            getUrl: "//verifycode.58.com/captcha/getV2?", //v2
            /*获取语音验证码接口*/
            getVoiceUrl: "//verifycode.58.com/captcha/voice",
            /*验证码检验接口*/
            validateUrl: '//verifycode.58.com/captcha/validateV2', //v2
            /*客户端类型*/
            client_type: 'pc'
        };
        this.defaultConfig = defaultConfig;
        this.config = Util.mixin(defaultConfig, config);
        /*校验到第几步*/
        this.stepe = null;
        this.state = false;
        this.init(this.config);

    };

    window.newLimitPostLoginCallBack = function() {
            /*设置回调函数后就不会自动跳转到path*/
            clickLog('from=pc_escfb_loginsuc'); //统计从PC端普通发布页登录弹窗登录成功的次数
            location.reload();
        }
        /*标记是否自动填充电话*/
    LimitPost.prototype.autofillphoneStatus = false;
    LimitPost.prototype = {

        init: function(config) {
            var that = this;
            this.config = Util.mixin(that.config, config);
            this.stepe = 0;

            this.validateState();


        },
        initEventBind: function() {
            var that = this;
            var yzminstance = Controller.records.get("yzm");
            var phoneNode$ = Controller.records.get("Phone").elem;
            var yzmNode$ = yzminstance.elem;
            var getMsgYzm$ = yzminstance.yzmel;
            var getVoiceYzm$ = yzminstance.vtipContainer;

            phoneNode$.on('blur', function(event) {
                event.preventDefault();
                var val = $(this).val();
                that.validatePhone(val)
            });
            yzmNode$.on('blur', function(event) {
                event.preventDefault();
                var val = $(this).val();
                /*判断是否出现了下一个验证码，出现了不验证当前验证码*/
                var yzm = Controller.records.get("yzm");
                if (yzm && $(yzm.elem).attr("readonly") == "readonly") {
                    // @DOTO
                } else {
                    var yzmR;
                    yzmR = that.validateYzm(val);
                    if (yzmR && yzmR.msg && !yzmR.bValid) {
                        validate.showTip(yzm.rows.containerElem.find('.tip'), yzmR.msg, "error", 0);
                    }
                }
            });
            getMsgYzm$.on('click', function(event) {
                event.preventDefault();
                that.initYzmTimer();
                that.getMsgYzm();
            });
            getVoiceYzm$.on('click', ".vioceYzm", function(event) {
                event.preventDefault();
                yzminstance.getVoiceNode = yzminstance.vtipContainer.children().clone();
                that.getVoiceYzm();
            });
        },
        /*增加一个验证步骤*/
        addValidate: function(prev, next) {

        },
        /*下掉一个验证步骤*/
        delValidate: function(validateName) {

        },
        /*ajax校验*/
        ajaxValidate: function(url, callback, data, async) {
            if (!url) return;
            data = (data || {});
            async = false;
            var dataType = "json";
            if (url.indexOf("post.58.com") == -1 && url.indexOf("p.m.58.com") == -1) {
                dataType = "jsonp";
                //url = url+"?callback=?";
            }
            $.ajax({
                url: url,
                type: 'get',
                data: data,
                cache: false,
                dataType: dataType,
                async: async,
                success: function(res) {
                    if (callback) callback(res)
                }

                /*	,
                 error :function(){
                 if(url == "http://post.58.com/repo/checkphoneV2?client=pc")
                 var res =  {"data":{"msg_encryptedKey":"024b9b87ecbd0bd8190865c85ffd107655b0814b481fd9c322ccfae90a8dce4b14219a32e97c0cf2bb8e502f6968a27e2691265afe1a1c1764da0656253b59df48d470cf35fae2835d4aae0036b13d20d8b29d034596ccf2d51839ec07959c462a7a90ae6d1b9c905adba9ee1c43d013ad114f97a368b2025617b240557a87e54cfe43dc0da88a3d624542d625a51beab490e9fcb69284849e11af9660bf960da4dae41e20126fa59fc71ad5d0176d4975ee3db25773a03208f75a7954df512f1cc7f307c16df8ef7b506275ea521e41661309651b079d8976ca50ea1b5f021b8a9a3f927859657e6df756d9e6d621a7197b0c095f7314b559a8d49294bc11597f603b29094476d7446f6eadcbba36eb82e27cc7ff4ec712ad6027383167a49f94a7564e02416e1a3dde8a28de87adee78c7779667747722f3098f55e043fed20ff4fc3a2c6d15c557854341f2eea0f468e8f89729aa3d5e314844b81d9af21c52b28d7d52d2ebd7da568a4422091f4c17118e2c85806fd8441cb18656306b9e","phone":"18887999722","voice_encryptedKey":"024b9b87ecbd0bd8190865c85ffd107655b0814b481fd9c322ccfae90a8dce4b14219a32e97c0cf2bb8e502f6968a27e2691265afe1a1c1764da0656253b59df48d470cf35fae2835d4aae0036b13d20d8b29d034596ccf2d51839ec07959c462a7a90ae6d1b9c905adba9ee1c43d013ad114f97a368b2025617b240557a87e54cfe43dc0da88a3d245e51a168333c506cdeed211836fe669e11af9660bf960da4dae41e20126fa58137a1b0332ab1ee75ee3db25773a03208f75a7954df512f1cc7f307c16df8ef7b506275ea521e41661309651b079d8976ca50ea1b5f021b8a9a3f927859657e6df756d9e6d621a7197b0c095f7314b559a8d49294bc11597f603b29094476d7446f6eadcbba36eb82e27cc7ff4ec712ad6027383167a49f94a7564e02416e1a3dde8a28de87adee78c7779667747722f3098f55e043fed20ff4fc3a2c6d15c557854341f2eea0f468e8f89729aa3d5e314844b81d9af21c52b28d7d52d2ebd7da568a4422091f4c17118e2c85806fd8441cb18656306b9e"},"errorCode":-2,"errorMsg":"needVerify"};
                 callback(res);
                 }*/
            })
        },

        pollClickLog: function(fromName) {

            var interval = 500;
            __timer && clearTimeout(timer);
            var callee = arguments.callee;
            if (typeof clickLog == 'function') {
                clickLog('from=' + fromName);
            } else {
                var __timer = setTimeout(function() {
                    callee();
                }, interval)
            }
        },

        /*校验登录状态*/
        validateState: function() {
            var that = this;
            this.ajaxValidate(that.config.validateStateUrl, function(res) {
                window.beforelogindata = res;
                //校验登录状态的回调函数
                //todo loginED isBind mobile isLogin
                if (res.isLogin == 0) { //登陆成功并且获取电话号码成功
                    //that.stepe++;
                    if (res.isBind == 0) {
                        that.state = true;
                        that.autofillphone(); //最终都要走到这一步来
                    } else {
                        //跳转绑定手机页
                        //that.pollClickLog("iframe_bind_show1");
                        $(document).loginClick({
                                "source": "passport",
                                "divid": "c",
                                "path": location.href,
                                "callback": "newLimitPostLoginCallBack",
                                /*"showwin":"mobile",*/ //scanCode代表扫码登录，user代表用户名登录，mobile代表手机号登录
                                "isShowClsBtn": false,
                                "hasBind": true
                            })
                            //window.setbg( "","//passport.58.com/swk/preLogin",680, 381, false).showLoad(false);
                            // Popwinfix.showLoad(false);
                    }
                } else {
                    //跳转登录
                    //	that.pollClickLog("iframe_login_show1");
                    /*二手车发布-记录登录弹窗出现的次数--前置登陆*/
                    if (____json4fe.catentry[1].dispid == '29') {
                        clickLog('from=escfb_pc_logintc');
                    }
                    clickLog('from=pc_escfb_login'); //统计PC端普通发布页登录弹窗出现的次数
                    $(document).loginClick({
                            "source": "passport",
                            "divid": "c",
                            "path": location.href,
                            "callback": "newLimitPostLoginCallBack",
                            /*"showwin":"mobile",*/
                            "isShowClsBtn": false,
                            "hasBind": true
                        })
                        //window.setbg( "","//passport.58.com/swk/preLogin",680, 381, false).showLoad(false);
                        //Popwinfix.showLoad(false);
                };
            }, {}, false)
        },
        loginCallBack: function() {
            /*设置回调函数后就不会自动跳转到path*/
            clickLog('from=pc_escfb_loginsuc'); //统计从PC端普通发布页登录弹窗登录成功的次数
            location.reload();
        },
        autofillphone: function() {
            var that = this;
            var phoneinstance = Controller.records.get("Phone");
            //发布挑战 非vip用户联系方式默认认证手机号切置灰(暂时上29类别)
            if (____json4fe.catentry[1].dispid == 29 && !businessData.isVipUser && businessData.Phone && businessData.Phone != "") {
                phoneinstance.setValue(businessData.Phone);
                phoneinstance.disabled();
                var checkObj = {};
                checkObj.bValid = true;
                checkObj.msg = "手机号置灰规则说明：<br>1、发布二手车信息时，只能使用账号绑定手机号进行发布。<br>2、如需更换联系电话，请前往个人中心-账户设置-手机绑定，进行更换绑定手机号。";
                //phoneinstance.showCheckTip(checkObj);
                //phoneinstance.container.removeClass("error")
                phoneinstance.rows.containerElem.find('.tip').removeClass("validate_success");
                popTip.prototype.showTip(phoneinstance.rows.contentElem, checkObj.msg);
                return
            }
            if (typeof isadd == "undefined" || isadd == false) {
                //自动填充电话，只有新添加页的时候才会填充，编辑、草稿和重新发布都不会
                phoneinstance.elem.blur();
                return;
            }
            this.ajaxValidate(that.config.autofillphoneUrl, function(res) {
                if (res.errorCode == 0) {
                    that.state = true;
                    window.infoDetail = {};
                    //window.infoDetail.Phone = res.data.phone;编辑页infodetail.Phone不应该赋值
                    //初始化页面
                    Controller.records.get("Phone").setValue(res.data.phone);
                    /*验证电话号码是否需要校验---zengmaoyun---start*/
                    if (res.data.phone != '') {
                        var phoneinstance = Controller.records.get("Phone");
                        that.autofillphoneStatus = true;
                        phoneinstance.elem.blur();
                    }
                    /*验证电话号码是否需要校验---zengmaoyun--end*/
                }
                if (res.errorCode == -1 || res.errorCode == -2) {
                    //M
                    //window.location.href = res.blinkUrl;
                    //PC

                };
            }, null, false);
        },
        /*表单初始化*/
        initPostForm: function() {
            Controller.pagController.ingInitForm();
            /*M 调用M端变淡初始化方法*/
            /*PC 调用PC表单初始化方法*/
            /*Controller.beforeInitForm();
             Controller.initForm();
             Controller.afterInitForm();*/
        },
        /*电话号码移除焦点时的校验*/
        validatePhone: function(val) {
            var that = this;

            if (typeof isadd == "undefined") {
                isadd = true;
            }

            var yzminstance = Controller.records.get("yzm");
            var phoneinstance = Controller.records.get("Phone");
            //validate.showLoadingTips("xxxxx");
            if (phoneinstance.rows.getValidateStatus() == false) return;
            var rowContainer = phoneinstance.rows.containerElem;
            var tipElem = rowContainer.find('.tip');
            var msg = "正在验证手机号码";
            var status = "loading";
            var left = 0;
            validate.showLoading(tipElem, msg, status, left);
            that.ajaxValidate(that.config.validatePhoneUrl + '?client=' + that.config.client_type, function(res) {

                /*是否需要验证码*/
                if (res.errorCode == -2) {

                    /*yzminstance.captchaConfigs = {
                     msg_encryptedKey: res.data.msg_encryptedKey,
                     voice_encryptedKey: res.data.voice_encryptedKey,
                     post_captcha_biz: "phone_verify"
                     };*/
                    /*yzminstance.rows.containerElem.show();
                     if(typeof yzminstance.captchaConfigs=="undefined"){
                     yzminstance.captchaConfigs={}
                     }
                     yzminstance.captchaConfigs.msg_encryptedKey= res.data.msg_encryptedKey;
                     yzminstance.captchaConfigs.voice_encryptedKey= res.data.voice_encryptedKey;
                     yzminstance.captchaConfigs.post_captcha_biz= "phone_verify";*/
                    that.handleNeedYzm(res)
                    that.responseid = null; //验证成功后可能再次修改手机号，这个时候置空cookie
                    validate.showTip(tipElem, '', "success", 385);
                } else if (res.errorCode == 0) {
                    /*校验成功*/
                    yzminstance.rows.containerElem.hide();
                    validate.showTip(tipElem, '', "success", 405);
                    /*不需要验证码 置空configs*/
                    yzminstance.captchaConfigs = {};
                } else if (res.errorCode == -1) {
                    yzminstance.rows.containerElem.hide();
                    validate.showTip(tipElem, "使用该联系电话的58账户过多，请填写其他电话", "error", 0);
                    /*不需要验证码 置空configs*/
                    yzminstance.captchaConfigs = {};
                };
                if (that.autofillphoneStatus) {
                    $(top).scrollTop(0)
                    that.autofillphoneStatus = false;
                }

            }, {
                phone: val,
                dispcateid: ____json4fe["catentry"][1]["dispid"],
                dispcityid: ____json4fe["locallist"]["dispid"],
                isadd: isadd
            })
        },
        handleNeedYzm: function(res) {
            var yzminstance = Controller.records.get("yzm");
            /*在显示验证码之前清空验证码输入框,隐藏提示框*/
            yzminstance.elem.val("");
            yzminstance.hideTips();
            yzminstance.rows.containerElem.show();

            if (typeof yzminstance.captchaConfigs == "undefined") {
                yzminstance.captchaConfigs = {}
            }
            yzminstance.captchaConfigs.msg_encryptedKey = res.data ? res.data.msg_encryptedKey : res.bizExt.msg_encryptedKey;
            yzminstance.captchaConfigs.voice_encryptedKey = res.data ? res.data.voice_encryptedKey : res.bizExt.voice_encryptedKey;
            yzminstance.captchaConfigs.post_captcha_biz = "phone_verify";
        },
        /*验证码校验*/
        validateYzm: function() {

            var that = this;
            var yzminstance = Controller.records.get("yzm");
            if (!yzminstance.captchaConfigs || !yzminstance.captchaConfigs.type)
                return {
                    bValid: false,
                    msg: '未发送验证码'
                };
            var value = yzminstance.getValue();
            if (!(/^\d+$/g.test(value)))
                return {
                    bValid: false,
                    msg: '验证码错误'
                };
            var phoneinstance = Controller.records.get("Phone");
            var telNumber = phoneinstance.getValue();
            var params = '';
            params += '?captcha_input=' + value;
            params += '&captcha_type=' + yzminstance.captchaConfigs.type;
            params += '&tel_number=' + telNumber;
            params += '&responseid=' + that.responseid;
            params += '&str=' + yzminstance.captchaConfigs.voice_encryptedKey;
            params += '&captcha_url=' + window.location.href;
            var rowContainer = yzminstance.rows.containerElem;
            var tipElem = rowContainer.find('.tip');

            validate.showLoading(tipElem, "正在校验验证码", "loading", 0);

            var vState = {};
            $.ajax({
                url: that.config.validateUrl + params + '&callback=?',
                async: false,
                cache: false,
                dataType: "jsonp",
                success: function(json) {
                    //console.log(json)
                    if (json && json.code == '0') {
                        if (json.data.result == true) {
                            validate.showTip(tipElem, "", "success", 610);
                            yzminstance.yzmStatus = 'success';
                            //验证码输入正确
                            vState = {
                                bValid: true,
                                msg: ''
                            };
                        } else {
                            if (json.data.count == 0) {
                                validate.showTip(tipElem, "验证码错误次数过多，请重新发送", "error", 0);
                            } else {
                                validate.showTip(tipElem, "验证码输入错误", "error", 0);
                            }
                            if (!Controller.bFocus) {
                                yzminstance.scrollTo();
                                Controller.bFocus = true;
                            };
                            yzminstance.yzmStatus = 'error';
                        }
                    } else {
                        validate.showTip(tipElem, json.message, "error", 0);
                    }
                }
            });
            return vState;
        },
        getVoiceYzm: function() {
            var that = this;
            var params = '';
            var yzminstance = Controller.records.get("yzm");
            var phoneinstance = Controller.records.get("Phone");
            var telNumber = phoneinstance.getValue();
            params += '&tel_number=' + telNumber;
            params += '&str=' + yzminstance.captchaConfigs.voice_encryptedKey;
            params += '&captcha_url=' + window.location.href;


            var rowContainer = yzminstance.rows.containerElem;
            var tipElem = rowContainer.find('.tip');
            $.ajax({
                url: that.config.getUrl + params + '&callback=?',
                async: false,
                cache: false,
                dataType: "jsonp",
                success: function(json) {
                    if (json && json.code == '0') {
                        yzminstance.voice_captcha = json.data.captcha;
                        yzminstance.captchaConfigs.type = json.data.type;
                        that.responseid = json.data.id;
                        $.ajax({
                            async: false,
                            cache: false,
                            dataType: "jsonp",
                            url: that.config.getVoiceUrl + '?str=' + yzminstance.captchaConfigs.voice_encryptedKey + '&responseid=' + that.responseid + "&callback=?",
                            success: function() {
                                //console.log("成功")
                            }
                        })
                        that.disableVoiceYzm();

                    } else {
                        //validate.showTip({key:"captcha_input",tips:"获取语音验证码出错",checkRule:false});
                        validate.showTip(tipElem, "获取语音验证码出错", "error", 0);
                    }
                }
            });
        },
        getMsgYzm: function() {
            var that = this;
            var params = '';
            var yzminstance = Controller.records.get("yzm");
            var phoneinstance = Controller.records.get("Phone");
            var telNumber = phoneinstance.getValue();
            params += '&tel_number=' + telNumber;
            params += '&str=' + yzminstance.captchaConfigs.msg_encryptedKey;

            var rowContainer = yzminstance.rows.containerElem;
            var tipElem = rowContainer.find('.tip');
            $.ajax({
                url: that.config.getUrl + params + '&callback=?',
                dataType: "jsonp",
                async: false,
                cache: false,
                success: function(json) {
                    //console.log(json)
                    if (json && json.code == '0') {
                        yzminstance.msg_captcha = json.data.captcha;
                        yzminstance.captchaConfigs.type = json.data.type;
                        that.responseid = json.data.id;
                        if (json.data.tip != "") {
                            validate.showTip(tipElem, json.data.tip, "error", 0);
                        }
                    } else {
                        //validate.showTip({key:"yzm",tips:"获取短信验证码出错",checkRule:false});
                        validate.showTip(tipElem, "获取语音验证码出错", "error", 0);
                    }
                }
            });
        },
        initYzmTimer: function() {
            var _self = this;
            var yzminstance = Controller.records.get("yzm");
            yzminstance.yzmel.off("click").addClass('yzmcount').html("60s重发");
            yzminstance.vtipContainer.removeClass('fixyzmleft')
            var count = 59;
            var yzmTimer = setInterval(function() {
                if (count == 0) {
                    yzminstance.yzmel.on('click', function(event) {
                        _self.initYzmTimer();
                        _self.getMsgYzm();
                        yzminstance.vtipContainer.hide();
                    });
                    yzminstance.yzmel.html("发送验证码").removeClass('yzmcount');
                    yzminstance.vtipContainer.addClass('fixyzmleft');
                    clearInterval(yzmTimer);
                    yzmTimer = null;
                    _self.enableVoiceYzm();
                } else yzminstance.yzmel.html(count-- + "s重发")

                if (count <= 50) yzminstance.vtipContainer.show();
            }, 1000);
        },
        disableVoiceYzm: function() {
            var yzminstance = Controller.records.get("yzm");
            var phoneinstance = Controller.records.get("Phone");
            var pval = phoneinstance.getValue();
            yzminstance.vtipContainer.html("我们将拨打您尾号为" +
                pval.substring(pval.length - 4) + "的电话以告知您验证码");
        },
        enableVoiceYzm: function() {
            var yzminstance = Controller.records.get("yzm");
            var phoneinstance = Controller.records.get("Phone");
            if (typeof yzminstance.getVoiceNode != "undefined") {
                yzminstance.vtipContainer.html("").append(yzminstance.getVoiceNode);
            }
        }
    }
    return LimitPost
});
/**
 * 工具类
 * _______json4fe的解析 操作
 */
define('util/explanjson4fe',[], function() {
	var config = {};

	config.curCity = ____json4fe.locallist;
	config.localId = config.curCity.dispid;
	config.rootCatentry = ____json4fe.catentry[0];
	config.rootCate = config.rootCatentry;
	config.curCatentry = ____json4fe.catentry[1];
	config.curCate = config.curCatentry;
	return config;
});
/**
 * 文本输入框
 * @module component/Volatile
 */
define('component/Volatile/js/Volatile',['component/base/js/base', 'util/Class', 'component/popTip/js/popTip', 'Controller/Controller', 'util/explanjson4fe', 'util/util', 'libs/json2.min', 'component/rows/js/rows'], function (Base, Class, PopTip, Controller, config, Util, JSON, Rows) {

    /**
     *  @constructor
     *  @alias module:component/Volatile
     *  @param {Object} opt 配置文件
     */
    var Volatile = Class.extend(Base);

    function getConstructor(type, opts, data) {
        var F = require('component/' + type + '/js/' + type);
        return new F(opts, data);
    }

    /**
     * 默认的className。包括wrap、title、content、multi
     * @type {Object}
     */
    Volatile.prototype.CLASS = {
        /** @type {String} 容器的className */
        WRAP: 'volatile_wrap',
        /** @type {String} 标题的className */
        TITLE: 'input_text_title',
        /** @type {String} 内容区域的className */
        OPTIONAL: 'volatile_optioinal_wrap',
        REQUIRED: 'volatile_required_wrap',
        /** @type {String} 当前后有内容时，需要增加的class */
        MULTI: 'clearfix'
    };
    // @todo 需要对获取的数据做本地缓存，时间太紧张，暂时不做...
    var cacheData = [];
    // id-2id-3id
    Volatile.prototype.type = 'Volatile';
    Volatile.prototype.createElem = function () {

        this.elems = [];
        this.container = $('<div class="volatile_wrap"></div>');
        this.curIndex = this.opts.tabIndex;
        this.createRequiredContainer();
        this.createOptionalContainer();
    };
    Volatile.prototype.createOptionalContainer = function () {
        this.optionalContainer = $('<div class="volatile_optioinal_wrap clearfix" style="display:none;"><h4>最多选择三项哦！(非必填项)</h4></div>');
        this.container.append(this.optionalContainer);
    };
    /**
     *
     * @return
     */
    Volatile.prototype.createRequiredContainer = function () {
        this.requiredContainer = $('<div class="volatile_required_wrap clearfix"></div>');
        this.container.append(this.requiredContainer);
    };

    /**
     * 新建必选项
     * @param {String}
     * @param {JSON Object}
     * @param {JSON Object}
     */
    Volatile.prototype.addRequiredElem = function (type, opts, data, parentId, parentOpts) {
        var _self = this;
        opts.tabIndex = (this.curIndex++);
        if (!opts.checkRuler) {
            opts.checkRuler = [{
                type: "reg",
                value: "^[\\s\\S]+$",
                msg: "请选择" + opts.title
            }];
        }
        var instance = getConstructor(type, opts, data);
        if (this.opts.multRows && parentId) {
            var prevParentId = parentId;
            prevParentId = parentId.substring(0, parentId.lastIndexOf('-'));
            var prevInstance = this.getInstanceItem(prevParentId);
            if (prevInstance) {
                var prevRows = prevInstance.rows;
                instance.block = prevInstance.block;
                if (instance.opts.canNull == undefined) {
                    instance.opts.canNull = true;
                }
                var rows = new Rows({
                    type: "row",
                    title: data.title
                });
                instance.rows = rows;
                rows.render(this.block.contentElem, prevRows.containerElem);
                instance.render(rows.contentElem);
            } else {
                var rows = new Rows({
                    type: "rows",
                    title: data.title
                });
                instance.rows = rows;
                instance.block = this.block;
                rows.render(this.block.contentElem);
                instance.render(rows.contentElem);
            }
        } else {
            // 这里和infoDetail耦合了，暂时无解
            instance.rows = this.rows;
            instance.block = this.block;
            this.requiredContainer.append(instance.container);
        }
        // 如果是修改页面，则不设置defaultValue
        var defaultValue=data.defaultValue;

        if (typeof parentId === 'undefined') {
            parentId = 0;
        }
        instance.container.attr('parent-id', parentId);
        if (parentOpts != undefined && parentOpts["parentVal"] != "") {
            instance.container.attr('parent-data-value', parentOpts["parentVal"]);
        }

        if (instance.opts.type == "checkbox" || (instance.opts.rootType && instance.opts.rootType == "checkbox")) {
            instance.container.bind('click', function (e, dataValue) {
                var target = e.target;
                var clickCheckbox = $(e.target);
                if (dataValue) {
                    clickCheckbox = instance.container.find("[data-value='" + dataValue + "']");
                }
                if (clickCheckbox.hasClass("checkbox") || (clickCheckbox.parents(".checkbox").length > 0 && (target = clickCheckbox.parents(".checkbox")[0]))) {
                    if (!clickCheckbox.hasClass("checkbox")) {
                        clickCheckbox = clickCheckbox.parents(".checkbox");
                    }
                    var value = clickCheckbox.attr('data-value');
                    var pValue = value, pText = "", mergeChild = false;
                    if (instance.opts.mergeChild) {
                        pText = clickCheckbox.find('label').html();
                        mergeChild = instance.opts.mergeChild;
                    }
                    //级联父级需要传递给子级的参数
                    var parentOptsJson = {
                        "parentVal": pValue,
                        "parentText": pText,
                        "mergeChild": mergeChild
                    };
                    var valId = null;
                    for (var i = 0; i < instance.data.values.length; i++) {
                        var obj = instance.data.values[i];
                        if (obj.val === value) {
                            valId = obj.valId;
                            break;
                        }
                    }
                    var data = {
                        paramId: instance.data.id || instance.data.pid,
                        valId: valId,
                        valText: clickCheckbox.find('label').html()
                    };
                    var pType = instance.opts.type;
                    if (instance.opts.type == "Volatile") {
                        pType = instance.opts.rootType;
                    }
                    parentOptsJson["parentType"] = pType;
                    if (clickCheckbox.hasClass("focus")) {
                        _self.requestMore(data, parentId + '-' + instance.data.id, parentOptsJson);
                    } else {//清除
                        if (parentOptsJson && parentOptsJson["parentType"] == "checkbox" && parentOptsJson.mergeChild == true) {
                            var mergeParentId = parentId + '-' + instance.data.id;
                            var curChildren = $('[parent-id^="' + mergeParentId + '"]');
                            curChildren = curChildren.find('[parent-value="' + parentOptsJson["parentVal"] + '"]');
                            if (curChildren.length > 0) {
                                var curChildrenInstance = _self.getInstanceItem(mergeParentId);
                                if (curChildrenInstance) {
                                    var isRemove = curChildrenInstance.removeMergeWrap(parentOptsJson["parentVal"]);
                                    if (isRemove && _self.opts.multRows) {
                                        _self.curIndex = _self.curIndex - curChildren.length;
                                        curChildrenInstance.rows.containerElem.remove();
                                        _self.removeInstance(mergeParentId);
                                    }
                                }
                            }
                        } else {
                            _self.flushCurChildren(parentId + '-' + instance.data.id, parentOptsJson);
                        }
                    }
                }
            });
        } else {
            /* 只能绑定change事件，否则绑定Inputover会多次触发 */
            
            instance.container.bind('change', function () {
                // 1、通过缓存获取相关数据
                // @todo 增加缓存数据
                // 2、通过后台接口获取相关数据
                var data = {
                    paramId: instance.data.id || instance.data.pid,
                    valId: instance.getCurValId(),
                    valText: instance.getText()
                };
                _self.container.triggerHandler('change');
                _self.requestMore(data, parentId + '-' + instance.data.id);
            });
        }
        if(defaultValue) {
            if(typeof infoDetail === 'undefined'){
                instance.setValue(defaultValue, '', 1);
                if(instance.data.type=='Volatile'){
                    instance.container.trigger('change');
                }
            }else if(!infoDetail[instance.opts.name]){
                instance.setValue(defaultValue, '', 1);
                if(instance.data.type=='Volatile'){
                    instance.container.trigger('change');
                }
            }
        }
        // 将示例缓存下来
        this.elems.push({
            name: opts.name,
            parentId: parentId,
            item: instance
        });
        // Controller中记录
        Controller.records.set(opts.name, instance);
        // 忽略下拉框只有一个选项时设置默认值
        //if(!!window.infoDetail && window.infoDetail[opts.name] && (type === 'selector' && data.values.length !== 1)) {
        //    instance.setValue(window.infoDetail[opts.name], '', 2);
        //}

        if (!!window.infoDetail && window.infoDetail[opts.name]) {
            instance.setValue(window.infoDetail[opts.name], '', 2);
            if(instance.opts.type.indexOf('Volatile')>-1&&Controller.records.get(opts.name)){
                Controller.records.get(opts.name).setValue(window.infoDetail[opts.name], '', 2);
            }
            if (type === 'selector' && data.values.length !== 1) {
                instance.setValue(window.infoDetail[opts.name], '', 2);
            }
            if (instance.opts.type == "checkbox" || ( (instance.opts.rootType) && (instance.opts.rootType == "checkbox") )) {
                instance.setValue(window.infoDetail[opts.name], '', 2);
                if (window.infoDetail[opts.name]) {
                    var valueArr = window.infoDetail[opts.name].split("|");
                    for (var i = 0; i < valueArr.length; i++) {
                        instance.container.trigger("click", valueArr[i]);
                    }
                }
            }
        }
    };

    /**
     * 新建合并项元素
     * @param {String}
     * @param {JSON Object}
     * @param {JSON Object}
     * parentOptsJson={"parentVal": "父级val","parentText": "父级text","mergeChild": "子类别是否合并为一个组件true/false","parentType":"父级type"};
     */
    Volatile.prototype.addMergeElem = function (type, opts, data, parentId, parentOptsJson) {
        var _self = this;
        if (parentOptsJson && parentOptsJson.mergeChild == true && _self.opts.multRows && parentId) {
            opts.tabIndex = (this.curIndex++);
            $.extend(opts, parentOptsJson);
            var instance = _self.getInstanceItemByName(opts.name);
            if (!instance) {
                type += "Merge";
                instance = getConstructor(type, opts, data);
                var prevParentId = parentId;
                prevParentId = parentId.substring(0, parentId.lastIndexOf('-'));
                var prevInstance = this.getInstanceItem(prevParentId);
                if (prevInstance) {
                    var prevRows = prevInstance.rows;
                    instance.block = prevInstance.block;
                    var rows = new Rows({
                        type: "row",
                        title: ""
                    });
                    instance.rows = rows;
                    rows.render(this.block.contentElem, prevRows.containerElem);
                    instance.render(rows.contentElem);
                } else {
                    instance.block = this.block;
                    var rows = this.rows;
                    instance.rows = rows;
                    rows.render(this.block.contentElem);
                    instance.render(rows.contentElem);
                }
                instance.container.attr('parent-id', parentId);
                // 将示例缓存下来
                this.elems.push({
                    name: opts.name,
                    parentId: parentId,
                    item: instance
                });
            } else {
                instance.appendMergeWrap(type, opts, data);
            }
            if (!!window.infoDetail && window.infoDetail[opts.name]) {
                instance.setValue(window.infoDetail[opts.name], '', 2);
            }
        }
    };

    /**
     * 新建选填项元素
     * @param {String}
     * @param {JSON Object}
     * @param {JSON Object}
     */
    Volatile.prototype.addOptionalElem = function (type, opts, data, dataId) {
        var _self = this;
        opts.tabIndex = (this.curIndex++);
        var instance = getConstructor(type, opts, data);
        instance.rows = this.rows;
        instance.block = this.block;
        var optinalWrap = $('<div class="optional_wrap clearfix" parent-id="' + dataId + '"></div>');
        var titleElem = $('<div class="optianal_volatile_title">' + opts.title + '</div>');
        optinalWrap.append(titleElem).append(instance.container);
        if (data.values && data.values.length < 2) {
            optinalWrap.hide();
        }
        this.optionalContainer.append(optinalWrap);
        this.showOptional();
        // 将示例缓存下来
        this.elems.push({
            name: opts.name,
            parentId: dataId,
            item: instance
        });
        // Controller中记录
        Controller.records.set(opts.name, instance);
        if (!!window.infoDetail && window.infoDetail[opts.name]) {
            instance.setValue(window.infoDetail[opts.name], '', 2);
        }
        if (this.optionalContainer.find('.optional_wrap:visible').length < 1) {
            this.hideOptional();
        }
    };
    Volatile.prototype.showOptional = function () {
        this.optionalContainer.show();
    };
    Volatile.prototype.hideOptional = function () {
        this.optionalContainer.hide();
    };
    Volatile.prototype.setOptioinalTitle = function (data) {
        var htmlStr1 = (data.maxSelectOptions == undefined) ? ('') : ('最多选择' + data.maxSelectOptions + '项哦！　');
        var htmlStr2 = (data.canNull == false) ? ('（必填项）') : ('（非必填项）');

        this.optionalContainer.find('h4').html(htmlStr1 + htmlStr2);
    };
    /** 选择后请求服务器获取子组件 */
    Volatile.prototype.requestMore = function (data, parentId, parentOptsJson) {
        data = data || {};
        data.cityId = config.localId;
        data.cateId = config.curCate.dispid;
        var _self = this;
        $.ajax({
            url: '/repo/paramdata',
            type: 'get',
            data: data,
            dataType: 'json',
            timeout: 60 * 1000,
            success: function (data) {
                if (Util.isArray(data) === true) {
                    if (_self.opts.multRows && data.length > 1) {
                        data.reverse();
                    }
                    if (parentOptsJson && parentOptsJson["parentType"] == "checkbox") {
                        //_self.flushCurChildren(parentId);
                        _self.renderChildren(data, parentId, parentOptsJson);
                        _self.container.trigger('click');
                    } else {
                        _self.flushCurChildren(parentId);
                        _self.renderChildren(data, parentId);
                        _self.container.trigger('change');
                    }
                    //设置提示语
                    _self.setOptioinalTitle(data);
                } else {
                    _self.flushCurChildren(parentId);
                }
            },
            error: function (err) {
                _self.flushCurChildren(parentId);
            }
        })
    };

    /**
     * 通过获取到的数据，初始化子元素并显示
     * @param  {Array}
     */
    Volatile.prototype.renderChildren = function (list, parentId, parentOptsJson) {
        var i = 0;
        var length = list.length;
        for (; i < length; i++) {
            var conf = list[i];
            conf.text = conf.title;
            if (conf.paramObject == 1 && ____json4fe.catentry[1].dispid!= '15520') {
                this.addParamElem(conf, parentId);
            } else if (parentOptsJson && parentOptsJson.mergeChild == true) {//合并项组件
                this.addMergeElem(conf.type, conf, conf, parentId, parentOptsJson);
            } else if (conf.canNull === false || this.opts.multRows) {//非空组件和多行组件
                this.addRequiredElem(conf.type, conf, conf, parentId, parentOptsJson);
            } else {
                this.addOptionalElem(conf.type, conf, conf, parentId);
            }
        }
        var paramObj = Controller.records.get('wupinzhuangkuang');
    };

    /**
     * 二手的单独需求，附加参数的修改
     */
    Volatile.prototype.addParamElem = function (conf, parentId) {
        var paramObj = Controller.records.get('wupinzhuangkuang');
        var oldText = paramObj.getText();
        if (conf.name.indexOf('wupinzhuangk') > -1 && paramObj.getDataName() != conf.name) {
            paramObj.setDataName(conf.name);
            paramObj.resetData(conf);
            var values = conf.values;
            for (var i = 0; i < values.length; i++) {
                if (!oldText && typeof infoDetail !== 'undefined') {
                    var value = this.getWpzkInfoValue(conf.name);
                    paramObj.setValue(value);
                }
                if (oldText === values[i].text) {
                    paramObj.select(i);
                }
            }
        } else if (paramObj.getDataName() != conf.name) {
            this.addParamElemInNewRow(conf, parentId);
        }
    };

    Volatile.prototype.getWpzkInfoValue = function (name) {
        var value = '';
        if (typeof infoDetail !== 'undefined') {
            for (var key in infoDetail) {
                if (key === name) {
                    value = infoDetail[key];
                }
            }
        }
        return value;
    };


    Volatile.prototype.addParamElemInNewRow = function (conf, parentId) {
        // 防止多次创建
        if (Controller.records.get(conf.name)) {
            Controller.records.get(conf.name).activate();
            return;
        }
        var instance = getConstructor(conf.type, conf, conf);
        this.elems.push({
            name: conf.name,
            parentId: parentId,
            item: instance
        });
        //instance.lastInstance = lastInstance;
        // 将校验状态初始化到rows上
        var rows = new Rows({
            type: "rows",
            title: conf.title
        });
        rows.setValidateStatus(conf.name, !conf.checkRuler);
        instance.rows = rows;
        instance.block = this.block;
        this.rows.containerElem.after(rows.containerElem)
        instance.render(rows.contentElem);
        rows.containerElem.attr('parent-id', parentId);
        if (window.infoDetail && window.infoDetail[conf.name]) {
            instance.setValue(window.infoDetail[conf.name]);
            // 修改页使用一次后删除值
            window.infoDetail[conf.name] = null;
        }
    }


    /**
     * 删除记录的实例
     * @param  {String} parentId parend id
     * @return {}
     */
    Volatile.prototype.removeInstance = function (parentId) {
        var itemLength = this.elems.length;
        var i = itemLength - 1;
        for (; i > 0; i--) {
            var item = this.elems[i];
            if (item.parentId.indexOf(parentId) > -1) {
                // 删除Controller中的记录
                Controller.records.remove(item.name);
                // 删除Controller中的记录
                this.elems.splice(i, 1);
            }
        }
    };
    Volatile.prototype.getInstanceItem = function (parentId) {
        var itemLength = this.elems.length;
        for (var i = 0; i < itemLength; i++) {
            var item = this.elems[i];
            if (item.parentId == parentId) {
                return item.item;
            }
        }
        return null;
    };
    Volatile.prototype.getInstanceItemByName = function (name) {
        var itemLength = this.elems.length;
        for (var i = 0; i < itemLength; i++) {
            var item = this.elems[i];
            if (item.name == name) {
                return item.item;
            }
        }
        return null;
    };
    /**
     * 获取根元素的text
     */
    Volatile.prototype.rootText = function () {
        var text = "";
        if (this.elems.length > 0 && this.elems[0].item && this.elems[0].item.getText) {
            var value = this.elems[0].item.getValue();
            if (value && value != "") {
                text = this.elems[0].item.getText();
            }
        }
        return text;
    };

    /**
     * 清除相关元素
     */
    Volatile.prototype.flushCurChildren = function (parentId,parentOptsJson) {
        var curChildren = $('[parent-id^="' + parentId + '"]');
        if (parentOptsJson != undefined && parentOptsJson["parentVal"] != "") {
            curChildren = curChildren.filter('[parent-data-value="' + parentOptsJson["parentVal"] + '"]');
            if (curChildren.length == 0) {
                return;
            }
        }
        this.curIndex = this.curIndex - curChildren.length;
        if (this.opts.multRows) {
            curChildren.parent().parent(".rows_wrap").remove();
        } else {
            curChildren.remove();
        }
        this.removeInstance(parentId);
        if (this.optionalContainer.find('.optional_wrap').length < 1) {
            this.hideOptional();
        }
    };

    Volatile.prototype.focusTo = function () {
    };
    Volatile.prototype.setElemView = function () {
    };
    Volatile.prototype.bindDomEvent = function () {
    };
    Volatile.prototype.getValue = function () {
        var valueObj = {};
        var i = 0;
        var itemLength = this.elems.length;
        for (; i < itemLength; i++) {
            try {
                var obj = this.elems[i];
                valueObj[obj.name] = obj.item.getValue();
            } catch (e) {
            }
        }
        return valueObj;
    };
    Volatile.prototype.doCheck = function () {
        var l = this.elems.length;
        var checkObj = {
            bValid: true,
            msg: ''
        };
        for (var i = 0; i < l; i++) {
            var instance = this.elems[i].item;
            if(instance.opts.isFreeze==true){
                continue;
            }
            var checkValue = instance.doCheck();
            if (checkValue.bValid === false) {
                checkObj = checkValue;
            }
        }
        if(!this.opts.multRows){
            this.showCheckTip(checkObj);
        }
        if (!!window.navigator.userAgent.toUpperCase().match('MSIE 6.0') && this.container.hasClass("error")) {
            this.container.removeClass("error");
        }
        return checkObj;
    };
    Volatile.prototype.render = function () {
        this.constructor.superclass.render.apply(this, arguments);
        // 添加默认的第一个选项
        this.addRequiredElem(this.opts.rootType, this.opts, this.data);
    }
    Volatile.prototype.setValue = function (val, text, bDefault) {
    	// 只能设置root的值，然后通过模拟选中Root,依次触发子元素，并需要和datasrc或infoDetail耦合
        // 不在setValue中处理，该组件不接受setValue设置值
        // $('.selectordef[parent-id="0"]')
    };

    return Volatile;
});
// 隐私保护组件
define('component/privacy/js/privacy',['component/base/js/base', 'util/Class','Controller/Controller'],function(Base,Class,Controller){
    // 判断是否登录
    /*function isLogin(){
     return (typeof userid !== 'undefined' && userid != '0' && userid !== '');
     }*/
    var Privacy=Class.extend(Base);
    Privacy.prototype.CLASS = {
        /** @type {String} 容器的className */
        WRAP: 'privacy_wrap',
        /** @type {String} 标题的className */
        TITLE: 'privacy_title',
        /** @type {String} 内容区域的className */
        CONTENT: 'privacy_content',
        /** @type {String} 当前后有内容时，需要增加的class */
        MULTI: 'clearfix'
    };
    Privacy.prototype.type='privacy';
    Privacy.prototype.createElem=function(){
        var _self=this;
        var text='58隐私保护介绍<br>1.设置后您的手机号码将被隐藏，别人只能通过虚拟的手机号与您沟通。<br>2.别人只能在58同城客户端获得虚拟的手机号。<br>3.虚拟的手机号不唯一，且可能是外地号。<br>4.暂不支持固话和小灵通。';
        if(typeof extMap!='undefined'&&typeof extMap.yinsiShowType!='undefined'&&extMap.yinsiShowType==1){
            text='58隐私保护介绍<br>1.设置后您的手机号码将被隐藏，别人只能通过虚拟的手机号与您沟通。<br>2.虚拟的手机号不唯一，且可能是外地号。<br>3.暂不支持固话和小灵通。';
        }
        this.container=$('<div>').addClass(this.CLASS.WRAP);
        var domstr="<div><a class='blueTips' href='javascript:void(0)'></a><span class='check_box'></span><span class='title'>设置隐私保护</span></div><div class='declaration'><span class='triangle'></span><p>"+text+"</p></div>";
        this.container.append(domstr);
        if(typeof extMap!='undefined'&&typeof extMap.yinsiShowType!='undefined'&&extMap.yinsiShowType==0){
            setTimeout(function(){
                _self.freeze();
            },300);
        }
        if(typeof extMap!='undefined'&&typeof extMap.yinsiShowType!='undefined'&&extMap.yinsiShowType!=0){
            var isBiz=Controller.records.get('isBiz');
            if(isBiz){
                isBiz.container.on('change',function(){
                    if(isBiz.getValue()=='1'){
                        //_self.freeze();
                        /*清空*/
                        _self.setValue(0);
                        _self.rows.hide();
                    }else{
                        //_self.activate();
                        _self.rows.show();
                    }
                });
            }
        }
    };
    Privacy.prototype.bindDomEvent=function(){
        this.container.on('click','.check_box',function(){
            $(this).toggleClass('selected');
        });
        this.container.find('.blueTips').mouseover(function(){
            $('.declaration').show();
        }).mouseout(function(){
            $('.declaration').hide();
        });
    };
    Privacy.prototype.getValue=function(){
        return this.container.find('.selected').length;
    };
    Privacy.prototype.setValue=function(value){
        if(value==1){
            this.container.find('.check_box').addClass('selected');
        }else{
            this.container.find('.check_box').removeClass('selected');
        }
    }
    return Privacy;
})
;
/**
 * 选项卡
 * @module component CarBrandSearch
 */
define('component/carBrandSearch/js/carBrandSearch',['component/base/js/base', 'util/Class', 'component/popTip/js/popTip', 'Controller/Controller', 'util/postClickLog', 'util/util'], function(Base, Class, PopTip, Controller, postClickLog, Util) {

    /**
     *  @constructor
     *  @alias module:component CarBrandSearch
     *  @param {Object} opt 配置文件
     */
    var CarBrandSearch = Class.extend(Base);

    /**
     * 默认的className。包括wrap、title、content、multi
     * @type {Object}
     */
    CarBrandSearch.prototype.CLASS = {
        /** @type {String} 容器的className */
        WRAP: 'carBrandSearch_wrap',
        /** @type {String} 标题的className */
        TITLE: 'carBrandSearch_title',
        /** @type {String} 内容区域的className */
        CONTENT: 'carBrandSearch_content',
        /** @type {String} 当前后有内容时，需要增加的class */
        MULTI: 'clearfix'
    };
    CarBrandSearch.prototype.type = 'carBrandSearch';
    CarBrandSearch.prototype.editInitChexi = false;
    CarBrandSearch.prototype.editInitChexing = false;
    CarBrandSearch.prototype.Choosen = {};
    CarBrandSearch.prototype.createElem = function() {
        this.opts = $.extend(true, {}, this.defaultOpts, this.opts);
        //组件外层
        this.container = $('<div class="carBrandSearch_wrap"></div>');

        //input输入框  >>>>>   1

        this.input = $('<div class="pinPai_input"></div>');
        //搜索框
        this.searchWin = $('<div class="brandSearch_win"></div>');
        this.searchUl = "";
        this.searchInitChexi = false;
        //品牌选择框    >>>>>   2
        this.pinpaiWin = $('<div class="pinPai_win"></div>');
        //车系选择框    >>>>>   3
        this.chexiWin = $('<div class="cheXi_win"></div>');
        //车型选择框    >>>>>   4
        this.chexingWin = $('<div class="cheXing_win"></div>');
        //车系上边提示信息
        this.chexiTopTip = $('<div class="toptip">选择车系</div>');

        //上边提示信息   >>>>   2.1
        this.topTip = $('<div class="carBrandSearch_topTip"></div>');
        //标题（ABCDE）  >>>>   2.2
        this.titleElem = $('<div class="carBrandSearch_title"></div>');
        //标题对应的内容  >>>>   2.3
        this.contentElem = $('<ul class="carBrandSearch_container"></ul>');

        //品牌
        this.input.append('<input type="text" maxlength="30" id="pinPai" class="pinPai" name="brandName" data-valId="" placeholder="搜索品牌车系关键字/手动点选" value="" autocomplete="off"><a style="display:none" class="resetBtn">重新选择</a>');
        //车型

        this.topTip.append('<div class="toptip">选择品牌</div>');
        //vip留着，PC品牌留言改版去掉这个
        this.titleElemUl = $("<ul class='index'></ul>");
        this.titleElem.append(this.titleElemUl);
        this.once = true;
        var dataLength = this.data.values.length;

        for (var i = 0; i < dataLength; i++) {
            var item = "";
            // 拼装标题
            var titleObj = this.data.values[i]; //获取到brand对象
            //data-val:字母值,data-valId:字母id
            this.titleElemUl.append('<li><a data-val="' + titleObj.text + '" href="javascript:void(0);"' + ((titleObj.text == "热门") ? (" class=\"hot_options\"") : ("")) + '>' + titleObj.text + '</a></li>');
            var brandObj = this.data.values[i]; //获取到brand对象
            item += "<li class='ppzm " + titleObj.text + "'>" + titleObj.text + "</li>"
            if (brandObj && brandObj.values) {
                for (var j = 0; j < brandObj.values.length; j++) {
                    var contentObj = brandObj.values[j];
                    item += '<li><a data-zimu="' + titleObj.text + '" data-val="' + contentObj.val + '" href="javascript:void(0);">' + contentObj.text + '</a></li>'
                }
                this.contentElem.append(item);
            }

        }
        // this.titleElemUl.append('<li <a data>')
        this.pinpaiWin.append('<a class="ppwin_close" href="javascript:void(0)"></a>')
        this.pinpaiWin.append(this.topTip);
        this.pinpaiWin.append(this.titleElem);
        this.pinpaiWin.append(this.contentElem);
        this.pinpaiWin.append(this.bottomTip);

        this.container.append(this.input);
        this.container.append(this.pinpaiWin);

        this.container.append(this.searchWin);
        /*判断是否vip页面*/
        // if(businessData&&businessData.isVipApp&&businessData.isVipApp==1){
        //     this.container.append($('<div class="hint" style="clear:both;"><a class="blueTips" href="javascript:void(0)"></a>如无相符车型，请将您的车型信息发送邮件至chexingku@58ganji.com。</div>'))
        // }else{
        //    this.container.append($('<div class="msg_hint" style="display:inline-block;"><span class="msg_text">找不到车型？</span><span class="msg_leave">请给我们留言</span></div>'))
        //}

    };
    CarBrandSearch.prototype.render = function(wrapElem) {
        var _self = this;
        if (this.opts.canNull === false) {
            this.rows.addStar();
        }
        if (this.container && this.container.length > 0) {
            this.container.appendTo(wrapElem);
            if (typeof window.infoDetail != 'undefined' && typeof window.infoDetail[this.opts.name] != 'undefined') {
                this.setValue(window.infoDetail[this.opts.name]);
            }
        } else {
            // console.log('render error: this.container undefined')
        }
        /*修改时品牌，车系禁用，车型允许修改bigain*/
        if (isadd != true && businessData.canBrandEdit == false) {
            this.chexingRow = $('<div class="rows_wrap clearfix chexingbak" style="z-index: 976;"><div class="rows_content"><div class="tip validate_success" style="left: 12px;"><i></i></div><div class="input_text_wrap success" name="chexingbak" style="position: relative;"><div class="arrow"></div><input readonly="readonly" type="inputText" tabindex="5" id="chexingbak"></div></div><div class="rows_title"><span><span class="rows_title_star">*</span>车型</span></div></div>');
            this.rows.containerElem.parent().append(this.chexingRow); //在品牌下面新增一个车薪选择框
            _self.rows.containerElem.find(".tip").css("position", "absolute") //校验提示信息设置在品牌下面
            _self.rows.containerElem.find(".rows_title").html('<span><span class="rows_title_star">*</span>品牌车系</span>') //修改标题
            _self.chexingWin.addClass("editChexing"); //给车型框设置样式，控制定位
            _self.input.find("input").css("width", "354px");
            this.chexingRow.find("input").bind("click", function(e) {
                /*另外起一行车型单独选择，有一种情况是修改时品牌，车系禁用，车型允许修改*/
                _self.showhide_win('cheXing');
                e.stopPropagation()
            });
        }
        /*修改时品牌，车系禁用，车型允许修改end*/
        var zimuVal = typeof infoDetail !== 'undefined' && infoDetail && infoDetail.zimu || "";
        var brandVal = typeof infoDetail !== 'undefined' && infoDetail && infoDetail.brand || "";
        if (businessData.repostInfo != undefined) { /*重新发帖回填*/
            zimuVal = businessData.repostInfo.zimu || "";
            brandVal = businessData.repostInfo.brand || "";
        }
        /*估车价页面跳到发布页数据回填--start*/
        var search = window.location.search.substr(1);
        if (search.indexOf('from=gcjlist') >= 0 && ____json4fe.catentry[1].dispid == 29) {
            search = search.split('&');
            $.each(search, function(index, item) {
                if (item.indexOf('pinpai') >= 0) {
                    brandVal = item.split('=')[1];
                    return false;
                }
            });
        }
        /*估车价页面跳到发布页数据回填--end*/
        if (brandVal && brandVal != "") {
            var pinpaiBeTriggered = this.contentElem.find('a[data-val=' + brandVal + ']').first();
            pinpaiBeTriggered.trigger("click");
            this.showPinpai_win();
            this.contentElem.scrollTop(pinpaiBeTriggered.parent()[0].offsetTop);
        }
    };
    CarBrandSearch.prototype.bindDomEvent = function() {
        var _self = this;
        //宽度等于title宽度 + title.Padding - contentElem.Padding;
        var wrapWidth = _self.titleElem.children().length * 30 + ((_self.titleElem.find('.hot_options').length == 1) ? 15 : 0) + 20;
        if (wrapWidth < 470) {
            wrapWidth = 470;
        }
        //绑定根据品牌选中字母事件

        $(".carBrandSearch_container li ").live("hover", function() {
            var _this = $(this);
            var _zimu = _this.children().attr("data-zimu");
            var zmLi = $(".carBrandSearch_title li a[data-val=" + _zimu + "]");
            _self.titleElem.find('a').removeClass('hover_item');
            zmLi.addClass("hover_item");
        })
        _self.titleElem.delegate('a', 'mouseover', function() {
            if ($(this).hasClass('active_item')) {
                return;
            }
            var index = $(this).index();
            _self.titleElem.find('a').removeClass('hover_item');
            $(this).addClass('hover_item');
        });
        //绑定点击字母滚动品牌事件
        _self.titleElem.delegate('a', 'click', function() {
                if ($(this).attr("data-val") != "huoche" && $(this).attr("data-val") != "gcc" && $(this).attr("data-val") != "keche") {
                    var index = $(this).index();
                    _self.titleElem.find('a').removeClass('active_item');
                    $(this).addClass('active_item');
                    var zimu = $(this).attr("data-val");
                    _self.contentElem.scrollTop(_self.contentElem.find("." + zimu)[0].offsetTop);
                }
                var zimu = $(this).attr("data-val");
                if (zimu == "面包车") {
                    if (businessData.isVipApp == 1) {
                        clickLog('from=pcv_29_ppmbc');
                    } else {
                        clickLog('from=pc_29_ppmbc');
                    }

                }


            })
            /*选择品牌*/
        _self.contentElem.delegate('a', 'click', function() {
            if ($(this).parent().hasClass('active_item')) {
                _self.showChexi_win();
                if (_self.searchInitChexi) {
                    var chexiBeTriggered = $("#cheXi_dl a[data-val=" + _self.searchInitChexi + "]").first();

                    $("#cheXi_dl").scrollTop(chexiBeTriggered.parent()[0].offsetTop - 33);
                    _self.chexiWin.find("#cheXi_dl dd [data-val=" + _self.searchInitChexi + "]").click();
                    _self.searchInitChexi = "";
                }
                _self.close_win();
                return;
            }
            //选择品牌激活字母选中class

            var _zimu = $(this).attr("data-zimu");
            var zmLi = $(".carBrandSearch_title li a[data-val=" + _zimu + "]");
            _self.titleElem.find('a').removeClass('active_item');
            zmLi.addClass("active_item");
            //移除原本选择的内容的class
            _self.contentElem.find('.active_item').removeClass('active_item');
            $(this).parent().addClass("active_item")
            var brandVal = $(this).data('val');
            var brandText = $(this).text();
            /*初始化字母和brand*/

            var zimuVal = _self.titleElem.find(".active_item").data("val");
            var zimuText = _self.titleElem.find(".active_item").text();
            if (zimuText == '热门' || zimuText == '客车' || zimuText == '货车' || zimuText == '面包车' || zimuText == '工程车') {
                //热门栏目取data-zimuVal
                if (zimuText == "面包车") {
                    if (businessData.isVipApp == 1) {
                        clickLog('from=pcv_29_ppmbc');
                    } else {
                        clickLog('from=pc_29_ppmbc');
                    }
                }
                zimuVal = $(this).data("zimuval");
                zimuText = _self.titleElem.find('[data-val=' + zimuVal + ']').text();
            }
            _self.Choosen.brandVal = brandVal;
            _self.Choosen.brandText = brandText;

            // var brandInstance = Controller.records.get("brand");
            // brandInstance.setValue(brandVal,brandText);
            if (_self.chexiWin.find('#cheXi_dl').length > 0) {
                //移出车系和车型选择框
                _self.removeChexi_win();
                _self.removeChexing_win();
                _self.hideChexing_win();
            }

            /*触发验证*/
            // _self.triggerCheck();

            //显示级联的车系
            _self.getChexiAjax($(this));
        });

        _self.titleElem.delegate(".kechezimu", "click", function() {
            clickLog('from=pc_29_ppkc');
            window.open("//post.58.com/" + ____json4fe.locallist.dispid + "/71952/s5");
        })
        _self.titleElem.delegate(".gcczimu", "click", function() {
            clickLog('from=pc_29_ppgcc');
            window.open("//post.58.com/" + ____json4fe.locallist.dispid + "/70185/s5");
        })
        _self.titleElem.delegate(".huochezimu", "click", function() {
                clickLog('from=pc_29_pphc');
                window.open("//post.58.com/" + ____json4fe.locallist.dispid + "/71951/s5");
            })
            /*-----input绑定事件，触发显示pinpaiWin选择框*/

        _self.input.find('#pinPai').bind('click', function(e) {
            _self.showhide_win('pinPai');
            //编辑页强行滚动品牌
            if (brandVal && brandVal != "" && _self.once) {
                var pinpaiBeTriggered = _self.contentElem.find('a[data-val=' + brandVal + ']').first();
                _self.contentElem.scrollTop(pinpaiBeTriggered.parent()[0].offsetTop);
                _self.once = false
            }
            _self.hideTips(); //点击时隐藏提示
        });
        _self.bindSearchInput();
        /* ----   绑定关闭框框事件 --------- */
        _self.close_win();
        // 绑定重新选择按钮事件
        _self.input.find(".resetBtn").on("click", function(e) {
                _self.reset(); //清空值
                $(this).hide(); //隐藏按钮
                _self.undisabled(); //恢复启用
                _self.showhide_win("pinPai"); //默认显示品牌选择框
            })
            /* ----- 绑定body点击事件   ------ */
        $('body').bind('click', function(e) {
            //判断是否需要隐藏
            e = e || window.event;
            var target = e.target || e.srcElement;
            var tagdiv = 'carBrandSearch_wrap',
                len = $(target).parents().length;
            var blurflag = true;
            if (_self.pinpaiWin.is(':visible') || _self.chexiWin.is(':visible') || _self.chexingWin.is(':visible')) {
                if ($(target).closest(".carBrandSearch_wrap").length > 0) {
                    blurflag = false;
                }
                if (blurflag == true) {
                    _self.showhide_win('all');
                    _self.triggerCheck()
                }
            }

            if (_self.searchWin.css("display") == 'block' && $(target).closest(".brandSearch_win").length <= 0 && $(target).closest("#pinPai").length <= 0) {
                _self.searchWin.hide();
                _self.triggerCheck()
            }
        });
        // 触发显示第一个
        _self.titleElem.find('a').eq(0).click();
        /*编辑回填数据*/
        var zimuVal = typeof infoDetail !== 'undefined' && infoDetail && infoDetail.zimu || "";
        var brandVal = typeof infoDetail !== 'undefined' && infoDetail && infoDetail.brand || "";
        if (businessData.repostInfo != undefined) { /*重新发帖回填*/
            zimuVal = businessData.repostInfo.zimu || "";
            brandVal = businessData.repostInfo.brand || "";
        }
        /*估车价页面跳到发布页数据回填--start*/
        var search = window.location.search.substr(1);
        if (search.indexOf('from=gcjlist') >= 0 && ____json4fe.catentry[1].dispid == 29) {
            search = search.split('&');
            $.each(search, function(index, item) {
                if (item.indexOf('pinpai') >= 0) {
                    brandVal = item.split('=')[1];
                    return false;
                }
            });
        }
        /*估车价页面跳到发布页数据回填--end*/
    };
    /**
     * 调用ajax获取选择品牌的车系,显示车系input和车系框--win
     */
    CarBrandSearch.prototype.getChexiAjax = function(obj) {
            var _self = this;
            var value = obj.attr("data-val");
            var ajaxUrl = "//post.58.com/ajax?action=chexi&source=car&cateid=" + ____json4fe.catentry[1].oid + "&value=" + value;
            $.ajax({
                url: ajaxUrl,
                type: "GET",
                dataType: "jsonp",
                success: function(data) {
                    var ajaxData = data;
                    if (ajaxData && ajaxData[0]) {
                        _self.showChexi(ajaxData);
                        _self.cheXi_dom();
                    } else {
                        // _self.triggerCheck();
                    }
                },
                error: function(data, erre) {
                    console.log("获取车系出错");
                    return;
                }
            })
        }
        /**
         * 调用ajax获取选择品牌的车系,显示车系input和车系框--win
         */

    CarBrandSearch.prototype.getChexingAjax = function(obj) {
        var _self = this;
        var value = obj.attr("data-val");
        var url = "//post.58.com/ajax?action=chexingdetail&source=car&cateid=" + ____json4fe.catentry[1].oid + "&value=" + value;

        $.ajax({
            type: "get",
            dataType: "jsonp",
            url: url,
            success: function(data) {
                var ajaxData = data;

                if (ajaxData && ajaxData.length > 0) {
                    _self.showChexing(ajaxData);
                    _self.cheXing_dom();
                    // _self.triggerCheck();
                    //车系选完之后没有车型则触发complete事件
                    if (_self.chexingWin.find('.car-chexing').length == 0) {
                        $(_self.container).triggerHandler("complete"); //选择车系后出发complete事件
                    }

                } else {

                    _self.hideChexing_win();
                    _self.setAllVal();
                    _self.showhide_win("all");
                    $(_self.container).triggerHandler("complete");
                    _self.setShangpaishijian("", ""); /*选择无车型的车系重置上牌时间*/
                }

            }

        });
    }
    CarBrandSearch.prototype.getChexingConfAjax = function(obj) {
        var _self = this;
        var value = obj.attr("data-val");
        var ajaxUrl = "//post.58.com/ajax?action=chexingconf&source=car&cateid=" + ____json4fe.catentry[1].oid + "&value=" + value;
        $.ajax({
            url: ajaxUrl,
            type: "GET",
            dataType: "jsonp",
            success: function(data) {
                var ajaxData = data;
                var buytime = "";
                var tingshoushijian = "";
                if (ajaxData) {
                    buytime = ajaxData["buytime"];
                    tingshoushijian = ajaxData["tingshoushijian"];
                    if (buytime || tingshoushijian) {
                        _self.setShangpaishijian(buytime, tingshoushijian);
                    }
                    ["carcolor", "buytime", "tingshoushijian"].forEach(function(el, index) {
                        var Instance = Controller.records.get(el);
                        if (Instance) {
                            var val = ajaxData[el];
                            if (val) {
                                if (el == "buytime") {
                                    buytime = ajaxData[el];
                                }
                                if (el == "tingshoushijian") {
                                    tingshoushijian = ajaxData[el];
                                }
                            }
                        }
                    })
                }
            },
            error: function(data, erre) {
                console.log("获取上牌时间出错");
                return;
            }
        })
    }

    CarBrandSearch.prototype.setShangpaishijian = function(buytime, tingshoushijian) {
        var yearValues = {
            "id": 0,
            "name": "buytime",
            "text": "首次上牌时间年份",
            "values": [{
                "val": "2017",
                "text": "2017"
            }]
        }
        var myYesr = new Date().getFullYear();
        var data = [];
        // 无数据显示默认时间
        if ("" == buytime) {
            for (var i = 0; i <= myYesr - 1995; i++) {
                var values = {};
                stopYear = myYesr - i;
                if (1995 == stopYear) {
                    values.val = "1994";
                    values.text = "1995年以前";
                } else {
                    values.val = stopYear;
                    values.text = stopYear;
                }
                data.push(values);
            }
        } else {
            if ("" == tingshoushijian) {
                var buytime = parseInt(buytime); /*新规则上市时间不减一*/
                for (var i = 0; i <= parseInt(myYesr) - buytime; i++) {
                    stopYear = myYesr - i;
                    var values = {};
                    if (1994 == stopYear) {
                        values.val = "1994";
                        values.text = "1995年以前";
                        data.push(values);
                        break;
                    } else {
                        values.val = stopYear;
                        values.text = stopYear;
                        data.push(values);

                    }
                }
            } else {
                var buytime = parseInt(buytime); /*新规则上市时间不减一*/
                var tingshoushijian = parseInt(tingshoushijian) + 1; //库存车可以选中停售时间的后一年
                for (var i = 0; i <= tingshoushijian - buytime; i++) {
                    stopYear = tingshoushijian - i;
                    var values = {};
                    if (1994 == stopYear) {
                        values.val = "1994";
                        values.text = "1995年以前";
                        data.push(values);
                        break;
                    } else {
                        values.val = stopYear;
                        values.text = stopYear;
                        data.push(values);
                    }
                }
            }
        }
        yearValues.values = data;
        var instance = Controller.records.get("buytime");
        var buytimeValue = instance.getValue();
        instance.resetOption(yearValues);
        instance.setValue(buytimeValue);
        CarBrandSearch.prototype.afterSetShangPaiShiJian();
    }
    CarBrandSearch.prototype.afterSetShangPaiShiJian = function() {

        }
        //ajax获取车系数据之后显示车系框
    CarBrandSearch.prototype.showChexi = function(data) {
            var _self = this;
            var htmlStr = '<a class="ppwin_close" href="javascript:void(0)"></a><div id= "cheXi_dl">';

            var ajaxData = data;

            //加入厂商分组
            var firmArray = [];
            var chexiWithFirmArray = [];
            ajaxData.forEach(function(item) {
                    if (firmArray.indexOf(item.makename) == -1) {
                        firmArray.push(item.makename);
                    }
                })
                //厂商排序，并将没有厂商的车系放到最后
            firmArray.sort();
            if (firmArray.indexOf("") != -1) {
                firmArray.shift();
                firmArray.push("");
            }
            for (var i = 0; i < firmArray.length; i++) {
                temp = ajaxData.filter(function(element) {
                    return (element.makename == firmArray[i]);
                })
                chexiWithFirmArray.push(temp);
            }

            for (var j = 0; j < chexiWithFirmArray.length; j++) {
                htmlStr += '<h3>' + (chexiWithFirmArray[j][0].makename == "" ? "其他" : chexiWithFirmArray[j][0].makename) + '</h3><dl class="cheXi_dl" class="clearfix">';
                for (var i = 0; i < chexiWithFirmArray[j].length; i++) {
                    htmlStr += '<dd><a href="javascript:void(0)"   data-val=' + chexiWithFirmArray[j][i].val + '>' + chexiWithFirmArray[j][i].text + '</a></dd>'
                }
                htmlStr += "</dl>";
            }

            htmlStr += "</div>";

            _self.chexiWin.append(_self.chexiTopTip);
            _self.chexiWin.append($(htmlStr));
            //增加到wrap中
            _self.container.append(_self.chexiWin);
            _self.chexiWin.show();
            _self.afterChexiShow();
            // if(_self.searchInitChexi){
            //     var chexiBeTriggered =  $("#cheXi_dl a[data-val="+_self.searchInitChexi+"]").first().parent();
            //       chexiBeTriggered.trigger("click");
            //      $("#cheXi_dl").scrollTop(chexiBeTriggered.parent()[0].offsetTop-33);
            //     // _self.chexiWin.find("#cheXi_dl dd [data-val="+_self.searchInitChexi+"]")

            //     _self.searchInitChexi = "";
            // }

        }
        //给车系添加点击埋点
    CarBrandSearch.prototype.afterChexiShow = function() {

    }



    //隐藏车系框-win
    CarBrandSearch.prototype.hideChexi_win = function() {
            this.chexiWin.hide();
        }
        //显示车系框-win
    CarBrandSearch.prototype.showChexi_win = function() {
        this.chexiWin.show();
    }

    //remove车系 内容,win---input
    CarBrandSearch.prototype.removeChexi_win = function() {
        this.input.find('#cheXi').remove();
        this.chexiWin.children().remove();
    }

    //隐藏车型框-win
    CarBrandSearch.prototype.hideChexing_win = function() {
            this.chexingWin.hide();
        }
        //显示车型框-win
    CarBrandSearch.prototype.showChexing_win = function() {
        this.chexingWin.show();
    }

    //remove车系 内容,win---input
    CarBrandSearch.prototype.removeChexing_win = function() {
        this.input.find('#cheXing').remove();
        this.chexingWin.children().remove();
    }


    //隐藏品牌框-win
    CarBrandSearch.prototype.hidePinpai_win = function() {
            this.pinpaiWin.hide();
        }
        //显示品牌框-win
    CarBrandSearch.prototype.showPinpai_win = function() {
        this.pinpaiWin.show();
    }

    //触发验证
    CarBrandSearch.prototype.triggerCheck = function() {
        /*触发验证*/
        var checkObj = this.doCheck();
        if (checkObj.bValid === true && this.rows && this.rows.getValidateStatus() !== true) {
            this.hideTips();
        }
        return checkObj.bValid;

    }

    /*-----绑定关闭按钮事件*/
    CarBrandSearch.prototype.close_win = function() {
            //控制关闭按钮显示隐藏规则
            var _self = this;
            if (_self.chexingWin.is(":visible") == true) {
                $(".pinPai_win .ppwin_close").hide();
                $(".cheXi_win .ppwin_close").hide();
            } else if (_self.chexiWin.is(":visible") == true) {
                $(".pinPai_win .ppwin_close").hide();
                $(".cheXi_win .ppwin_close").show();
            } else if (_self.pinpaiWin.is(":visible") == true) {
                $(".pinPai_win .ppwin_close").show();
            }

            this.container.on('click', '.ppwin_close', function(e) {
                _self.showhide_win("all");
                _self.triggerCheck();
            });
        }
        /*
         * @function 车系的点击选择事件
         */
    CarBrandSearch.prototype.cheXi_dom = function() {
        var _self = this;
        /*
         * @点击选择车系
         */
        _self.chexiWin.off("click").on('click', '#cheXi_dl dd', function(e) {
            var target, value;
            if (this.nodeName == 'DD') {
                target = $(this).children('a');
            } else {
                target = $(this);
            }
            text = target.text();
            //点击车系添加选中class
            var textbefore = _self.chexiWin.find('.active_item').text();
            _self.chexiWin.find('.active_item').removeClass('active_item');
            $(this).addClass("active_item")
                //判断是否点击的是已选择的内容，如果是则直接弹出车型的选择框
            var instance = Controller.records.get("chexi");
            if (instance.text === textbefore && text === instance.text) {
                // _self.hideChexi_win();
                if (_self.chexingWin.find('#cheXing_dl').length > 0) {
                    _self.showChexing_win();
                } else {
                    _self.hideChexing_win();
                    _self.setAllVal();
                    _self.showhide_win("all");
                    $(_self.container).triggerHandler("complete");
                    _self.setShangpaishijian("", ""); /*选择无车型的车系重置上牌时间*/
                }
            } else {
                _self.Choosen.chexiVal = target.data('val');
                _self.Choosen.chexiText = text;
                // instance.setValue(target.data('val'),text);
                if (_self.chexingWin.find('#cheXing_dl').length > 0) {
                    /*移出车型*/
                    _self.removeChexing_win();
                }
                _self.getChexingAjax(target);
            }
            if (_self.chexingRow) { //修改页时品牌车系不能修改，此时回填品牌，车系输入框text,自动隐藏品牌车系选择框
                _self.setAllVal();
                _self.hidePinpai_win();
                _self.hideChexi_win();
                _self.chexingWin.addClass("editChexing");
            }
            // _self.triggerCheck();
        });
        /* ----   绑定关闭框框事件 --------- */
        _self.close_win();
        var chexiVal = typeof infoDetail !== 'undefined' && infoDetail && infoDetail.chexi || "";
        if (businessData.repostInfo != undefined) { /*重新发帖回填*/
            chexiVal = businessData.repostInfo.chexi || "";
        }
        /*vin码返回的酷车信息*/
        if (_self.kuche && _self.kuche.chexi && _self.kuche.chexi != "") {
            chexiVal = _self.kuche.chexi;
        }
        /*估车价页面跳到发布页数据回填--start*/
        var search = window.location.search.substr(1);
        if (search.indexOf('from=gcjlist') >= 0 && ____json4fe.catentry[1].dispid == 29) {
            search = search.split('&');
            $.each(search, function(index, item) {
                if (item.indexOf('chexi') >= 0) {
                    chexiVal = item.split('=')[1];
                    return false;
                }
            });
        }
        /*估车价页面跳到发布页数据回填--end*/
        if (chexiVal && chexiVal != "" && !_self.editInitChexi) {
            _self.editInitChexi = true;
            _self.chexiWin.find("#cheXi_dl dd [data-val=" + chexiVal + "]").click();
        }
        if (_self.kuche && _self.kuche.chexi && _self.kuche.chexi != "") {
            /*酷车回填后不能修改品牌和车系*/
            _self.input.find('#pinPai').unbind('click').css("background-color", "#e0e0e0");
            _self.input.find('#cheXi').unbind('click').css("background-color", "#e0e0e0");
        }
        //搜索结果点击之后异步trigger车系点击
        if (_self.searchInitChexi) {
            var chexiBeTriggered = $("#cheXi_dl a[data-val=" + _self.searchInitChexi + "]").first();

            $("#cheXi_dl").scrollTop((chexiBeTriggered.parent()[0].offsetTop - 33));
            _self.chexiWin.find("#cheXi_dl dd [data-val=" + _self.searchInitChexi + "]").click();
            _self.searchInitChexi = "";
        }
    }


    /*
     * @function 车型的点击选择事件
     */
    CarBrandSearch.prototype.cheXing_dom = function() {
            var _self = this;
            /*
             * @点击选择车型
             */
            _self.chexingWin.on('click', '.car-chexing dd', function(e) {
                var target;
                if (this.nodeName == 'DD') {
                    target = $(this).children('a');
                } else {
                    target = $(this);
                }
                //点击车系添加选中class
                _self.chexingWin.find('.active_item').removeClass('active_item');
                $(this).addClass("active_item")
                    /*设置值*/
                var brandInstance = Controller.records.get('brand');
                var chexiInstance = Controller.records.get('chexi');
                var Instance = Controller.records.get('carchexing');
                _self.setAllVal(target);
                _self.triggerCheck();
                //调用估车价信息
                Instance.callguchejia();
                _self.getChexingConfAjax(target); //获取car颜色 buytime,tingshoushijian
                _self.showhide_win('all');
            });

            /* ----   绑定关闭框框事件 --------- */
            _self.close_win();
            //编辑页回填数据
            var carchexingVal = typeof infoDetail !== 'undefined' && infoDetail && infoDetail.carchexing || "";
            if (businessData.repostInfo != undefined) {
                carchexingVal = businessData.repostInfo.carchexing || "";
            }
            /*估车价页面跳到发布页数据回填--start*/
            var search = window.location.search.substr(1);
            if (search.indexOf('from=gcjlist') >= 0) {
                search = search.split('&');
                $.each(search, function(index, item) {
                    if (item.indexOf('chexing') >= 0) {
                        carchexingVal = item.split('=')[1];
                        return false;
                    }
                });
            }
            /*估车价页面跳到发布页数据回填--end*/
            if (carchexingVal && carchexingVal != "" && !_self.editInitChexing) {
                _self.editInitChexing = true;
                _self.chexingWin.find(".car-chexing dd [data-val=" + carchexingVal + "]").click();
                //标志估车价时间可回填-执行一次之后标价为false
                _self['gcjTime'] = true;
            }
        }
        //设置显示隐藏选择框,品牌，车系，车型都在这里判断
    CarBrandSearch.prototype.showhide_win = function(from) {
        var _self = this;
        if (this.disable && from != "all") {
            //return; 禁用模式时事件已经解绑
        }
        switch (from) {
            case 'pinPai':
                {
                    var titleVal = Controller.records.get("Title").getValue();
                    var inputVal = $("#pinPai").val();
                    if ((_self.searchWin.css("display") == 'none' && $("#pinPai").val() == "") || (_self.pinpaiWin.is(':visible') == false && inputVal == titleVal)) {
                        if (_self.chexingWin.find('#cheXing_dl').length > 0) {
                            _self.showPinpai_win();
                            _self.showChexi_win();
                            _self.showChexing_win();
                        } else if (_self.chexiWin.find('#cheXi_dl').length > 0) {
                            _self.showPinpai_win();
                            _self.showChexi_win();
                        } else {
                            _self.showPinpai_win();
                        }
                        _self.searchWin.hide();
                    }
                    //当输入搜索关键字之后点击外部，搜索结果框消失之后，再点击搜索框
                    else if (_self.pinpaiWin.is(':visible') == false && inputVal != titleVal) {

                        $("#pinPai").trigger("keyup");
                        _self.searchWin.show();
                    }

                    break;
                }
            case 'cheXi':
                {
                    if (_self.pinpaiWin.css("display") == 'block') {
                        _self.hidePinpai_win();
                    } else if (_self.chexingWin.css("display") == 'block') {
                        _self.hideChexing_win();
                    }
                    _self.showChexi_win();
                    break;
                }
            case 'cheXing':
                {
                    if (_self.pinpaiWin.css("display") == 'block') {
                        _self.hidePinpai_win();
                    } else if (_self.chexiWin.css("display") == 'block') {
                        _self.hideChexi_win();
                    }
                    _self.showChexing_win();
                    break;
                }
            case 'all':
                {
                    if (_self.pinpaiWin.css("display") == 'block') {
                        _self.hidePinpai_win();
                    }
                    if (_self.chexiWin.css("display") == 'block') {
                        _self.hideChexi_win();
                    }
                    if (_self.chexingWin.css("display") == 'block') {
                        _self.hideChexing_win();
                    }
                    break;
                }

        }
    }

    //设置内容
    CarBrandSearch.prototype.selectByVal = function(selVal) {
        var targetItem = this.contentElem.find('[data-val="' + selVal + '"]');
        targetItem.addClass('active_item');
        this.input.find('#pinPai').val(targetItem.text());
    };
    /*禁用 移除品牌 车型 车系事件*/
    CarBrandSearch.prototype.disable = false;
    CarBrandSearch.prototype.disabled = function() {
        this.input.find('#pinPai').unbind('click').attr("disabled", true);
        this.input.find('#cheXi').unbind('click');
        this.input.find('#cheXing').unbind('click');
        this.disable = true;
        this.container.addClass("disabled");
        this.showhide_win("all");
    }
    CarBrandSearch.prototype.undisabled = function() {
        var _self = this;
        this.input.find('#pinPai').bind('click', function(e) {
            _self.showhide_win('pinPai');
        });
        this.input.find('#pinPai').removeAttr("disabled");
        _self.input.on('click', '#cheXi', function(e) {
            _self.showhide_win('cheXi');
        });
        _self.input.on('click', '#cheXing', function(e) {
            _self.showhide_win('cheXing');
        });
        this.disable = false;
        _self.container.removeClass("disabled");
    }

    CarBrandSearch.prototype.setAllVal = function(target) {
        var _self = this;
        var value = ""
        var Instance = Controller.records.get('carchexing');
        if (target) {
            value = target.attr("title") || target.text();
            Instance.setValue(target.data('val'), value);
            if (_self.chexingRow) {
                _self.chexingRow.find("input").val(value);
                value = "";
            } else if (!_self.disable) {
                //新增页时选择车型后，禁止输入，显示出重新选择按钮，点击后清空已选择项
                _self.disabled();
                _self.input.find(".resetBtn").show();
            }
        } else {
            Instance.setValue("", value);
        }
        var brandVal = _self.Choosen.brandVal;
        var brandtext = _self.Choosen.brandText;
        var chexiVal = _self.Choosen.chexiVal;
        var chexitext = _self.Choosen.chexiText;
        var chexiInstance = Controller.records.get("chexi");
        var brandInstance = Controller.records.get("brand");
        brandInstance.setValue(brandVal, brandtext);
        chexiInstance.setValue(chexiVal, chexitext);
        var pinPaiDom = $("#pinPai");
        pinPaiDom.val(brandtext + " " + chexitext + " " + value);
        this.autoSetTitle();
    }
    CarBrandSearch.prototype.reset = function() {
        var _self = this;
        this.contentElem.find('.active_item').removeClass('active_item');
        this.input.find('#pinPai').attr("data-valId", "").attr("data-val", "").val("");
        this.removeChexi_win();
        this.removeChexing_win();
        /*清空隐藏域的值*/
        var InstanceChexing = Controller.records.get('carchexing');
        InstanceChexing && InstanceChexing.setValue("");
        var InstanceChexi = Controller.records.get('chexi');
        InstanceChexi && InstanceChexi.setValue("");
        //        var zimuInstance = Controller.records.get("zimu");
        //        zimuInstance&&zimuInstance.setValue("");
        var brandInstance = Controller.records.get("brand");
        brandInstance && brandInstance.setValue("");
        _self.contentElem.scrollTop(0)

    };
    CarBrandSearch.prototype.getValue = function() {
        var _self = this;
        var valueList = {},
            input = _self.input.find('input');
        var len = input.length;
        for (var i = 0; i < len; i++) {
            valueList[$(input[i]).attr('name')] = $(input[i]).attr('data-valId');
        }
        return ""; /*返回为空 车型 车系 品牌通过别的字段进行回填和提交*/
    };

    /* dataFrom---返回文本元素 -----必须返回对象才可以识别------*/
    CarBrandSearch.prototype.getText = function() {
        var _self = this;
        var str = '',
            value = {},
            input = _self.input.find('input');
        var len = input.length;
        for (var i = 0; i < len; i++) {
            str += $(input[i]).val() + ' ';
        }
        value.pinpai = str;
        return value;
    };

    CarBrandSearch.prototype.getCheckValue = function() {
        var _self = this;
        var fillAll = true,
            input = _self.input.find('input');
        var len = input.length;
        for (var i = 0; i < len; i++) {
            var win = _self[$(input[i]).attr('id').toLowerCase() + 'Win'];
            if (($(input[i]).val() == undefined || $(input[i]).val() == '') && (win.children().length > 0)) {
                fillAll = false;
            }
        }
        if (fillAll == true) {
            this.container.triggerHandler('complete');
            return this.getValue();
        } else {
            return '';
        }
    };

    CarBrandSearch.prototype.setValue = function(val, text, bDefault) {

        if (Util.isString(val) === false) {
            // val必须为String类型
            return;
        }
        // 必须要为空字符串时，才会进行reset操作，否则不做任何处理
        if (val === '') {
            this.reset();
        }
        var valList = val.split('|');
        var i = 0;
        var valLength = valList.length;
        for (; i < valLength; i++) {
            this.selectByVal(valList[i]);
        }
    };
    CarBrandSearch.prototype.autoSetTitle = function() {
            var pinpai = $("#pinPai").val() || "";
            var chexi = $("#cheXi").val() || "";
            var chexing = $("#cheXing").val() || "";
            var title = pinpai + chexi + chexing;
            var instance = Controller.records.get("Title");
            if (instance) {
                instance.setValue(title);
            }
        }
        /*vip中校验vin码之后如果获得kuche信息进行回填品牌*/
    CarBrandSearch.prototype.vinCodeGetKucheCallback = function(kuche) {
            var _self = this;
            _self.kuche = {}
            if (kuche && kuche.val && kuche.val.zimu && kuche.val.brand) {
                _self.kuche.zimu = kuche.val.zimu;
                _self.kuche.brand = kuche.val.brand;
                _self.kuche.chexi = kuche.val.chexi;
                var zimuVal = typeof kuche !== 'undefined' && kuche && kuche.val.zimu || "";
                var brandVal = typeof kuche !== 'undefined' && kuche && kuche.val.brand || "";
                if (brandVal && brandVal != "") {
                    _self.editInitChexi = false; /*告诉车系自动回填*/
                    _self.titleElem.find('a[data-val=' + zimuVal + ']').click();
                    _self.contentElem.find('a[data-val=' + brandVal + ']').click();
                }
            }
        }
        /*vip车型选择后控制上传车检报告 以及二手车认证显示状态*/
    CarBrandSearch.prototype.objecttype_create = function() {
        //var report = Controller.records.get("reportpic");
        var cylb = Controller.records.get("cylb_rz");
        if (!cylb) { //vip二手车发布才存在车检报告
            return;
        }
        var brandvalue = $("#pinPai").data("val");
        var chexivalue = Controller.records.get("chexi").getValue();

        /*ESC-8872  VIP发布页-去掉上传检测报告 功能
        var url = "/ajax/?action=isrenzhengseries&brand=" + brandvalue + "&series=" + chexivalue + "&source=car";
        $.ajax({
            method:'GET',
            url:url,
            success: function(data){
                if(data && data == "true"){
                    report.activate();
                } else {
                    report.freeze();
                }


            }
        });*/
        var url = "/ajax/?action=validateVolkswagen&userid=" + userid + "&series=" + chexivalue + "&source=car";
        $.ajax({
            method: 'GET',
            url: url,
            success: function(data) {
                if (data && data == "true") {
                    cylb.hide();
                } else {
                    cylb.show();
                }
            }
        });
    }
    CarBrandSearch.prototype.showChexing = function(data) {
        var _self = this;
        if (data.length == 0) {
            return;
        }
        var arr_bsx = [],
            arr_pl = [],
            arr_year = [],
            _html_bsx = '<ul><li type="" class="sel">全部</li>',
            _html_pl = '<ul><li type="" class="sel">全部</li>',
            str = '',
            cur_year = data[0].caryear;
        var htmlStr = '<a class="ppwin_close" href="javascript:void(0)"></a>';
        htmlStr += '<div class="chexing_win_wrap"><div class="car-pail"><span class="title">排&nbsp;&nbsp;&nbsp;量</span><ol></ol></div>' +
            '<div class="car-bsx"><span class="title">变速箱</span><ol></ol></div>';
        htmlStr += '<div class="car-year">';
        var len = data.length;
        if (cur_year && cur_year != '0') {
            htmlStr += '<h3>' + cur_year + '款<i>新车指导价</i></h3>';
        } else {
            htmlStr += '<h3><i>新车指导价</i></h3>';
        }
        htmlStr += '<dl id="cheXing_dl" class="car-chexing clearfix">';
        for (var i = 0; i < len; i++) {
            //车型列表
            if (data[i].caryear !== cur_year) {
                cur_year = data[i].caryear;
                if (cur_year && cur_year != '0') {
                    htmlStr += '</dl><h3>' + cur_year + '款<i>新车指导价</i></h3><dl class="car-chexing clearfix">';
                } else {
                    htmlStr += '</dl><h3><i>新车指导价</i></h3><dl class="car-chexing clearfix">';
                }
            }
            //暂无数据处理
            if (!data[i].price || data[i].price == 0 || data[i].price == null || data[i].price == "0.0") {
                var _price = '暂无数据';
            } else {
                var _price = '<em>' + data[i].price + '</em>万元';
            }
            var gb = data[i].gearbox != "" ? "=" + data[i].gearbox : "";
            htmlStr += '<dd class="show clearfix"><a href="javascript:void(0)" displacement=' + data[i].displacement + ' gearbox' + gb + ' data-val=' + data[i].value + ' title=' + $.trim(data[i].text).replace(/ /g, "") + '><span class="text">' + data[i].text + '</span><span class="price">' + _price + '</span></a></dd>'

            //年款
            if (data[i].caryear) {
                if (arr_year.indexOf(data[i].caryear) == -1) { //数组去重
                    arr_year.push(data[i].caryear);
                }
            }
            //变速箱
            if (data[i].gearbox && data[i].gearbox != 'null') {
                if (arr_bsx.indexOf(data[i].gearbox) == -1 && data[i].gearbox != "0.0") { //数组去重
                    arr_bsx.push(data[i].gearbox);
                }
            }

            //排量
            if (data[i].displacement && data[i].displacement != 'null') {
                if (arr_pl.indexOf(data[i].displacement) == -1 && data[i].displacement != "0.0") { //数组去重
                    arr_pl.push(parseFloat(data[i].displacement).toFixed(1));
                }
            }
        }
        htmlStr += "</dl></div>";
        htmlStr += '<div class="msg_hint"><span class="msg_text">找不到车型？</span><span onClick="clickLog(\'from=esc_chexinglyb\');" class="msg_leave">请给我们留言</span></div></div>';

        _self.chexingWin.append("<div class= 'toptip'>选择车型</div>")
        _self.chexingWin.append($(htmlStr));
        //排量超过4个会折行，总高度变大，车型超出
        if (arr_pl.length > 4) {
            $(".car-year").height(268);
        } else {
            $(".car-year").height(297);
        }
        //增加到wrap中
        _self.container.append(_self.chexingWin);
        _self.chexingWin.show();

        arr_pl = arr_pl.sort();
        arr_year = arr_year.sort().reverse();
        for (var i = 0, len = arr_pl.length; i < len; i++) {
            _html_pl += '<li type=' + arr_pl[i] + '>' + arr_pl[i] + '</li>';
        }
        _html_pl += '</ul>';
        arr_bsx = arr_bsx.sort(function(a, b) { return a.localeCompare(b) }); //中文汉字排序
        for (var j = 0, len = arr_bsx.length; j < len; j++) {
            _html_bsx += '<li type="' + arr_bsx[j] + '">' + arr_bsx[j] + '</li>';
        }
        _html_bsx += '</ul>';
        //变速箱
        $('.cheXing_win .car-bsx ol').html(_html_bsx);
        //排量
        $('.cheXing_win .car-pail ol').html(_html_pl);
        _self.filterChexing();
        var dd = $(".show");
        for (var i = 0; i < dd.length; i++) {
            var $dd = $(dd[i])
            var hight = $dd.height();
            if (hight > 35) {
                $dd.find(".price").addClass("price_line");
            }
        };
        _self.afterChexingShow();
    }

    /*根据排量和变速箱筛选车型*/
    //给车型添加点击埋点
    CarBrandSearch.prototype.afterChexingShow = function() {

    }
    CarBrandSearch.prototype.filterChexing = function() {
        var _gearbox = "",
            _displacement = "";
        $(".cheXing_win .car-bsx li,.cheXing_win .car-pail li").bind("click", function() {
            var self = $(this);
            if (!self.hasClass("sel")) {
                self.siblings().removeClass("sel");
                self.addClass("sel");
            }
            _gearbox = $(".cheXing_win .car-bsx li.sel").text();
            _displacement = $(".cheXing_win .car-pail li.sel").text();
            if (_gearbox == "全部") {
                _gearbox = false
            }
            if (_displacement == "全部") {
                _displacement = false
            }
            $(".cheXing_win .car-chexing dd").removeClass("show");
            $(".cheXing_win .car-chexing dd").addClass("hide");
            for (var i = 0, iLen = $(".cheXing_win .car-chexing dd").length; i < iLen; i++) {
                var _tmp_gearbox = $(".cheXing_win .car-chexing dd").eq(i).find("a").attr("gearbox");
                var _tmp_displacement = $(".cheXing_win .car-chexing dd").eq(i).find("a").attr("displacement");
                if (_gearbox && _displacement && _gearbox != "null") {
                    if (_gearbox == _tmp_gearbox && _displacement == _tmp_displacement) {
                        $(".cheXing_win .car-chexing dd").eq(i).addClass("show");
                    }
                } else if (_gearbox || _displacement) {
                    if (_gearbox == _tmp_gearbox || _displacement == _tmp_displacement) {
                        $(".cheXing_win .car-chexing dd").eq(i).addClass("show");
                    }
                } else {
                    $(".cheXing_win .car-chexing dd").eq(i).addClass("show");
                }
            }
            $(".cheXing_win .car-chexing").each(function(index) {
                var _this = $(this);
                if (_this.find(".show").length == 0) {
                    $(".cheXing_win h3").eq(index).hide()
                } else {
                    $(".cheXing_win h3").eq(index).show()
                }
            })

        })
    }
    CarBrandSearch.prototype.doCheck = function() {
            // 当获取值与默认值相等的时候，直接返回true
            var brand = Controller.records.get("brand");
            var chexi = Controller.records.get("chexi");
            var chexing = Controller.records.get("carchexing");
            var valid = {
                    bValid: true,
                    msg: ''
                }
                /*编辑页面回填数据时还未初始化直接返回*/
            if (!this.rows) {
                return valid;
            }
            if (chexi.getValue() == "" || brand.getValue() == "") {
                valid.msg = "请选择完整的品牌车系车型";
                valid.bValid = false;
                this.showCheckTip(valid);
                return valid;
            }

            return valid;
        }
        //搜索框事件绑定
    CarBrandSearch.prototype.bindSearchInput = function() {
        var _self = this;
        _self.input.on("keyup", function(e) {
            if (_self.searchWin.is(':visible') == false) {
                _self.showSearchBox();
                _self.showhide_win("all");
            }
            if (e.target.value == "") {
                _self.hideSearchBox();
                _self.showhide_win("pinPai");
            }
            _self.searchBoxAjax(e.target.value)

        })
        this.searchWin.delegate("li", "click", function() {
            var pinpaiVal = $(this).children(".searchPinpai").attr("data-val");
            var chexiVal = $(this).children(".searchChexi").attr("data-val");
            _self.searchWin.hide();
            _self.showPinpai_win();
            var pinpaiBeTriggered = $(".carBrandSearch_container a[data-val=" + pinpaiVal + "]").first();
            //改变全局变量异步触发车系点击
            _self.searchInitChexi = chexiVal;
            pinpaiBeTriggered.trigger("click");
            _self.contentElem.scrollTop(pinpaiBeTriggered.parent()[0].offsetTop);
        })
        _self.bindSearchNoteInput();

    }
    CarBrandSearch.prototype.bindSearchNoteInput = function() {
        var _self = this;
        _self.searchWin.delegate(".searchNote_click", "click", function() {
            if (businessData.isVipApp == 1) {
                clickLog('from=pcv_29_ppwjg');
            } else {
                clickLog('from=pc_29_ppwjg');
            }
            _self.reset();
            _self.searchWin.hide();
            $(".pinPai_win .ppwin_close").show();
            _self.showhide_win("pinPai");
        })
    }
    CarBrandSearch.prototype.bindSearchNotewant = function() {
        var _self = this;
        _self.searchWin.delegate(".searchNotwant_click", "click", function() {
            if (businessData.isVipApp == 1) {
                clickLog('from=pc_29_jsdx');
            } else {
                clickLog('from=pcv_29_jsdx ');
            }
            _self.reset();
            _self.searchWin.hide();
            $(".pinPai_win .ppwin_close").show();
            _self.showhide_win("pinPai");
        })
    }
    CarBrandSearch.prototype.showSearchBox = function() {
        var _self = this;
        _self.searchWin.show();
    }
    CarBrandSearch.prototype.hideSearchBox = function() {
        var _self = this;
        _self.searchWin.hide();
    }
    CarBrandSearch.prototype.searchBoxAjax = function(param) {
        var _self = this;

        var url = "//post.58.com/ajax?source=car&action=keywordsearch&query=" + encodeURI(param) + "&cateid=29";
        $.ajax({
            url: url,

            dataType: "jsonp",
            success: function(ajaxData) {
                //做一下用变量存储搜索过的结果。


                if (ajaxData && ajaxData.data.length > 0) {
                    _self.searchUl = "<ul class='searchUl'>";
                    for (var i = 0;
                        (i < ajaxData.data.length) && (i <= 9); i++) {
                        var brand = "";
                        var chexi = "";
                        if (ajaxData.data[i].type == "brand") {
                            brand = ajaxData.data[i].text;
                        } else if (ajaxData.data[i].type == "chexi") {
                            var txt = ajaxData.data[i].text.split("@");
                            brand = txt[0];
                            chexi = txt[1];
                        }
                        _self.searchUl += "<li><a class='searchPinpai' data-val='" + ajaxData.data[i].brandValue + "'>" + brand + "&nbsp;</a>" + (chexi ? "<a class='searchChexi' data-val='" + ajaxData.data[i].chexiValue + "'>" + chexi + "</a>" : "") + "</li>"
                    }
                    _self.searchUl += "<li><span class='searchNotwant_click'>没有想要的结果，点击这里手动选择</span></li>"
                    _self.searchUl += "</ul>";

                    if ($(".searchUl").length == 0) {
                        $("#searchNote").remove();
                        _self.searchWin.append(_self.searchUl);
                    } else {
                        $("#searchNote").remove();
                        $(".searchUl").replaceWith(_self.searchUl);
                    }
                    _self.bindSearchNotewant();
                } else {
                    var searchNote = "<p id= 'searchNote'>您输入的内容暂未匹配到品牌车系，请更换关键词或者<span class='searchNote_click'>点此手动选择！</span></p>";
                    _self.searchWin.empty().append(searchNote);
                    _self.bindSearchNoteInput();
                }


            }
        })

    }
    return CarBrandSearch;
});
define('component/textarea_bcsm/js/textarea_bcsm',['component/base/js/base', 
		'util/Class', 
		'component/popTip/js/popTip', 
		'Controller/Controller', 
		'util/postClickLog', 
		'component/textarea/js/textarea',
		'util/util',
		'component/popwin/js/popwin',
		'component/block/js/block',
		'component/rows/js/rows',
		'component/validate/js/validate'], function (Base, Class, PopTip, Controller, postClickLog,textarea, Util,Popwin,Block,Rows,Validate) {
		var textarea_bcsm = Class.extend(textarea);
		/**
		 *新增属性btnArr-配置补充说明点击按钮
		 *新增属性contentArr-每个按钮对应的内容
		 *两者的值要一一对应
		 *新增属性isShow-是否需要显示标准模板true显示，false不显示
		 *参数配置请参考二手车普通发布
		 */
		textarea_bcsm.prototype.createElem = function() {
			var _self = this;
			var opts = this.opts;
			this.container = $('<div>');
			this.container.addClass(this.CLASS.WRAP);
			this.container.attr('name', opts.name);
	        this.container.css('position','relative');
	        var btnArr = opts.btnArr;
	        //添加补充选择标签
	        this.labels = $('<div class="desc-options"></div>');
	        var appType = businessData.isVipApp==0?"pc_":"pcv_";
	        if(btnArr){
	        	$.each(btnArr,function(index,ele){
	        		var num = index + 1;
	        		var strHtml = "";
	        		if(num % 4 == 0){
	        			strHtml = $('<span data-val='+index+' data-state="0" class="right0" onclick="clickLog(\'from='+appType+____json4fe.catentry[1].dispid+'_click_bcsm'+num+'\');" >'+ele+'</span>')
	        		}else{
	        			strHtml = $('<span data-val='+index+' data-state="0" onclick="clickLog(\'from='+appType+____json4fe.catentry[1].dispid+'_click_bcsm'+num+'\');" >'+ele+'</span>')
	        		}
	        		
	        		_self.labels.append(strHtml);
	        	})
	        }
	        //vip中心模板标签--start
	        //存储模板数据的变量
	        this.moduleData = "";
	        //模板数据字数是否正确可否提交
	        this.moduleNumOk = true;
	        this.module = $('<div class="module-options"></div>');
	        
	        this.module.append('<span class="use-module" onclick="clickLog(\'from=pc_escfb_symbtx\');">使用模板填写</span>'
	       					  +'<span class="define-module mactive" onclick="clickLog(\'from=pc_escfb_zdymb\');clickLog(\'from=pc_escfb_vipmb\');">自定义模板</span>');
	        if(datasrc.hasModule){
	        	var defineM = this.module.find('.define-module');
	        	this.module.find('.use-module').addClass('mactive');
	        	defineM.attr('onclick',"clickLog(\'from=pc_escfb_xgmb\');clickLog(\'from=pc_escfb_vipmb\');");
	        	defineM.html("修改模板").addClass('edit-module').removeClass('define-module');
	        } 
	        //vip中心模板标签--end
	        this.textarea = $('<div class="textarea"></div>');
	        //添加补充说明填写区域
			this.elem = $('<textarea></textarea>');
			this.elem.attr('tabindex', opts.tabIndex);
			this.elem.attr('id', opts.name);
			//this.elem.attr('placeholder',opts.view.placeholder)
			//添加标准模板悬浮提示
			this.template_hover = '';
			if(opts.isShow){
				this.template_hover = $('<div class="bzmb-hover">标准模板<img onmouseover="clickLog(\'from=esc_pcfabu_bzmb\');" src="//img.58cdn.com.cn/html/rsms/img/wenhao_tip.png" alt="问号图标" width="22" height="22"></div>');
			}
			
			//添加标准模板
			this.template = $('<div class="bzmb"></div>');
			this.template.append('<div class="title">【标准模板】</div>'
								+'<div class="text"><span><em>【车辆描述】：</em>宝马1系(进口) 08款 120i 自动挡，2014年05月上牌，行驶2.89万公里，2018年05月年检到期！此车是原装进口车型，排放标准为国4，同车况下价格最低，同价格下车况最好，档位变换流畅，各种配置完全够用，发动机和变速箱匹配的很好，车辆整体做工不错！</span>'
								+'<span><em>【车商介绍】：</em>XXXX商家是一家自带检测中心，拥有精英级检测团队的商家！！本店支持收车置换，提供分期及车险服务，让您享受一站式购车！</span>'
								+'<span><em>【车辆服务】：</em>本店已对此车100%真实车源历史还原：包括4S店、维修保养记录及历史保险记录。本店售出的所有车辆，支持4S店检测，若车况描述不符，14天可退车，365天免费售后保障，让您无后顾之忧！</span></div>');
			
			// 增加自定义属性
			for(var key in opts.attr) {
				if(opts.attr.hasOwnProperty(key)) {
					this.elem.attr(key, opts.attr[key]);
				}
			}
			this.setElemView();
			
			var defaultValue = opts.defaultValue;
			if(defaultValue) {
				_self.elem.val(defaultValue);
				if(_self.elem.val() === defaultValue){
					_self.elem.css('color','gray');
				}
				_self.elem.bind('focus', function(e) {
					if(_self.elem.val() === defaultValue) {
						_self.elem.val('');
					}
				});
				_self.elem.bind('blur', function(e) {
					if(_self.elem.val().replace(/^\s+|\s+$/ig, '') === '') {
						_self.elem.val(defaultValue);
					}
				});
			}
		};
		textarea_bcsm.prototype.setElemView = function() {
			var _self = this;
			var opts = this.opts;
			if (opts.view.width) {
				this.elem.css('width', opts.view.width);
			}
			if (opts.view.height) {
				this.elem.css('height', opts.view.height);
			}
			if (opts.view.placeholder) {
				if(!('placeholder' in document.createElement('textarea'))) {
					_self.fixPlaceHolder(opts.view.placeholder,opts.name);
				}
				this.elem.attr('placeholder', opts.view.placeholder);
			}
			this.textarea.append(this.elem);
			this.textarea.append(this.template_hover);
			this.container.append(this.labels);
			this.container.append(this.module);
			this.container.append(this.textarea);
			this.container.append(this.template);
		};
		textarea_bcsm.prototype.bindDomEvent = function() {
			var _self = this;
			_self.elem.bind('blur', function(e) {
				_self.setClassByStatus();
				// ie中需要调用e.target
				var target = e.relatedTarget;
				// input做特殊处理
				var checkObj = _self.doCheck();
				_self.container.triggerHandler('blur');
				_self.publish(_self.opts.name + '.valueChange', _self.getValue());
				_self.container.trigger('change', [_self.getValue()]);
				if(checkObj.bValid === true && _self.rows.getValidateStatus() !== true) {
					_self.hideTips();
				}
			});
			_self.elem.bind('focus', function(){
				if(_self.opts.view.tips) {
					_self.showTips(_self.opts.view.tips);
				}
				_self.setClassByStatus(textarea_bcsm.SETTING.STATUS.FOCUS);
				_self.elem.triggerHandler('focusin');

				//IE6下聚焦时wrap显示边框出现边框
				if($.browser && $.browser.version && $.browser.version == '6.0'){
					_self.container.css('border',0);
				}
			});

			_self.elem.bind(textarea_bcsm.EVENT.TYPE.INPUT, function(e) {
				if (e.KeyCode === textarea_bcsm.EVENT.KEY_CODE.TAB) {
					_self.elem.triggerHandler('inputover');
				}
				// 考虑如何在初始化时就判断是否进行特殊值的判断？
				var maxLength = $(this).attr('maxLength');
				var value = $(this).val();
				if(!!maxLength) {
					if(value.length >= parseInt(maxLength, 10)) {
						_self.elem.trigger('inputover');
					}
				}
			});
			//var tipsarr = ["真心想买，车价可以再聊","自家用车，新车购入，诚心转让，车商勿扰","爱车不议价，议价者请绕道","确定购买后，必须将车过户到您的名下","想要看车的朋友，随时联系","车面有小剐蹭，但是整体车况很好","平时上下班开，代步用车","没有出过任何重大事故，一直有定时作保养"];
            var tipsarr = _self.opts.contentArr;
            var isselectarr = [];
            if(tipsarr){
            	isselectarr = new Array(tipsarr.length);
            	for(var i = 0; i<tipsarr.length; i++){
				  isselectarr[i] = 0;
				}

            }
            //var isselectarr = [0, 0, 0, 0, 0, 0, 0, 0];
            var isselectarr_back = isselectarr.concat();
            var bcsmBack = $("#Content").val();
            var selectstr = "";
            var clickcount = 0;
			_self.labels.find("span").bind('click',function(){
				
                var item = $(this);
                var itemval = parseInt(item.attr("data-val"));
                var val = $("#Content").val();
                for (var i = 0; i < tipsarr.length; i++) {
                	if(val.indexOf(tipsarr[i]) == -1){
                		isselectarr[i] = 0;
                	}else{
                		isselectarr[i] = 1;
                	}
                };
                if (val == "") {
                	if(tipsarr){
		            	isselectarr = new Array(tipsarr.length);
		            	for(var i = 0; i<tipsarr.length; i++){
						  isselectarr[i] = 0;
						}
		            }
                    selectstr = "";
                    clickcount = 1
                } else {
                	if(val.charAt(val.length-1) == "；"){
                		selectstr = "";
                	}else{
                		selectstr = "；"
                	}
                   
                }
                if (isselectarr[itemval] == 0) {
                    selectstr += tipsarr[itemval];
                    isselectarr[itemval] = 1;
                    $("#Content").val($("#Content").val() + selectstr);
                    window.bcsm_is_valid = undefined;
                } else {
                    return false;
                }
                selectstr = "";
                var checkObj = _self.doCheck();
                _self.container.triggerHandler('click');
				_self.publish(_self.opts.name + '.valueChange', _self.getValue());
				_self.container.trigger('change', [_self.getValue()]);
				if(checkObj.bValid === true && _self.rows.getValidateStatus() !== true) {
					_self.hideTips();
				}
			})
			if(_self.opts.isShow){
				_self.template_hover.find("img").bind('mouseover',function(){
					$(".bzmb").show();
				})
				_self.template_hover.find("img").bind('mouseout',function(){
					$(".bzmb").hide();
				})
			}
			//VIP添加模板绑定事件
			//使用模板填写
			_self.module.find('.use-module').bind('click',function(){
				//没有数据,提示-有数据ajax请求获取模板数据并填写
				if(datasrc.hasModule){
					_self.getModuleData(_self.fillContent);
				}else{//提示
					var tipElem = _self.rows.containerElem.find(".tip");
					Validate.showTip(tipElem,"您的模板内容为空，点击右上方【自定义模板】按钮，即可创建自己的模板！", "error");
				}
			});
			//点击自定义模板
			$(document).on('click.define','.module-options .define-module', function(){
				//渲染我的模板编辑框
				_self.renderModule();
			});
			//点击修改模板
			$(document).on('click.edit','.module-options .edit-module',function(){
				//渲染我的模板编辑框
				_self.getModuleData(_self.saveUseData);
			});
		};
		/*vip模板的方法*/
		/*
		 * renderModule：渲染‘我的模板’弹层-事件绑定
		 * getModuleData：获取模板数据
		 * getDataFail：获取数据失败的处理-一般不会出现
		 * fillContent：将数据填充到页面的补充说明里面
		 * saveUseData：保存并使用模板数据
		 * saveModule：保存模板数据
		 * renderComponent：渲染组件
		 * getConstructor：创建组件对象
		 * getAjax：ajax请求
		*/
		//vip添加自定义模板-添加车辆描述
		textarea_bcsm.prototype.renderModule = function(){
			var _self = this;
			
			//三个文本域
			var moduleDefine = 
				[
					{
						type : 'block',
						title: '',
						className: 'module_content',
						children: [{
							type: 'row',
							title: '车辆描述',
							children: [{
								type: 'textarea',
								canNull: true,
								name: 'cheliangmiaoshu',
								view: {
									width: '545',
									height: '68',
									placeholder: '请输入车辆描述'
								},
								funcs: [{
				                    evt:"blur",setClickLog:"pcv_escfb_mbclms"
				                }],
								checkRuler: [{
					                type: "hasContact",
					                value: "(([qｑQＱ]+)(.?|.{1,5})(([0-9]|[０-９]|[零一二三四五六七八九]|[①-⑨]|[㈠-㈨])[-_@~#$%^&*]*){5,13})|((([0-9]|[０-９]|[零一二三四五六七八九]|[①-⑨]|[㈠-㈨])[-_@~#$%^&*]*){5,13}(.?|.{1,5})([qｑQＱ]+))",
					                msg: "不能输入联系方式！"
					            },{
					                type: "reg",
                					value: "(.*)([\\u4e00-\\u9fa5]+)(.*)",
					                msg: "请输入文字描述！"
					            }]
							}]
						},{
							type: 'row',
							title: '车商介绍',
							children: [{
								type: 'textarea',
								canNull: true,
								name: 'cheshangjieshao',
								view: {
									width: '545',
									height: '68',
									placeholder: '请输入车商介绍'
								},
								funcs: [{
				                    evt:"blur",setClickLog:"pcv_escfb_mbcsjs"
				                }],
								checkRuler: [{
					                type: "hasContact",
					                value: "(([qｑQＱ]+)(.?|.{1,5})(([0-9]|[０-９]|[零一二三四五六七八九]|[①-⑨]|[㈠-㈨])[-_@~#$%^&*]*){5,13})|((([0-9]|[０-９]|[零一二三四五六七八九]|[①-⑨]|[㈠-㈨])[-_@~#$%^&*]*){5,13}(.?|.{1,5})([qｑQＱ]+))",
					                msg: "不能输入联系方式！"
					            },{
					                type: "reg",
                					value: "(.*)([\\u4e00-\\u9fa5]+)(.*)",
					                msg: "请输入文字描述！"
					            }]
							}]
						},{
							type: 'row',
							title: '车辆服务',
							children: [{
								type: 'textarea',
								canNull: true,
								name: 'cheliangfuwu',
								view: {
									width: '545',
									height: '68',
									placeholder: '请输入车辆服务'
								},
								funcs: [{
				                    evt:"blur",setClickLog:"pcv_escfb_mbclfw"
				                }],
								checkRuler: [{
					                type: "hasContact",
					                value: "(([qｑQＱ]+)(.?|.{1,5})(([0-9]|[０-９]|[零一二三四五六七八九]|[①-⑨]|[㈠-㈨])[-_@~#$%^&*]*){5,13})|((([0-9]|[０-９]|[零一二三四五六七八九]|[①-⑨]|[㈠-㈨])[-_@~#$%^&*]*){5,13}(.?|.{1,5})([qｑQＱ]+))",
					                msg: "不能输入联系方式！"
					            },{
					                type: "reg",
               						value: "(.*)([\\u4e00-\\u9fa5]+)(.*)",
					                msg: "请输入文字描述！"
					            }]
							}]
						}]
					}
				];
				
			//模板-渲染
			_self.modulebd = $('<div id="myModule"><div class="mtitle">我的模板</div></div>');
			Popwin.show(' ', _self.modulebd, 680, 540, true, function(){});
			//浮层右上角的“X”增加统计埋点
			$(".fe_window .closebtn").one("click",function(){
				clickLog('from=pc_escfb_mbqx');
			});
			/*渲染*/
			renderComponent(moduleDefine,_self.modulebd);
			
			//字数统计
			var zstongji = '<div class="zstongji"><span id="zishu" class="zs-blue">0</span>/1800</div>';
			_self.modulebd.append(zstongji);
			//按钮
			var buttons = '<div class="mbotton">'
							+'<span class="saveuse" onclick="clickLog(\'from=pc_escfb_bcbsy\');">保存并使用</span>'
					 		+'<span class="onlysave" onclick="clickLog(\'from=pc_escfb_jbc\');">仅保存</span>'
					 	  '</div>';
			_self.modulebd.append(buttons);
			
			//绑定事件--字数统计
			//文本域-字数统计--车辆服务提示
			var textareas = _self.modulebd.find('textarea');
			var zstongji = _self.modulebd.find('.zstongji');
			var carfwTip = areaList['cheliangfuwu'].rows.containerElem.find(".tip");
			textareas.bind('input change blur',function(){
				var _areaself = this;
				var len = 0,otherlen = 0;
				var regRN = /[\r\n]/g;
				var value = $(_areaself).val();
				$.each(textareas, function(index,item) {
					var vlen = $(item).val().replace(regRN,"").length;
					len += vlen;
					otherlen += item !== _areaself ? vlen : 0; 
				});
				if(len > 1800){
					_self.moduleNumOk = false;
					zstongji.addClass('zstongji-red');
					Validate.showTip(carfwTip,"已达到上限1800字，不能增加文字！", "error");
				}else{
					_self.moduleNumOk = true;
					zstongji.removeClass('zstongji-red');
					Validate.hideTip(carfwTip);
				}
				_self.modulebd.find('#zishu').html(len);
			});
			 
			//保存并使用
			_self.modulebd.find('.saveuse').bind('click',function(){
				//ajax请求保存数据
				_self.saveModule('use');
			});
			//仅保存
			_self.modulebd.find(".onlysave").bind('click',function(){
				_self.saveModule();
			});
			/*是否是修改模板-回填数据*/
			if(datasrc.hasModule){
				var data = _self.moduleData;
				$.each(areaList, function(index,item) {
					item.setValue((data[index]||''));
					item.elem.change();
				});
			}
		}
		
		//请求获取模板数据
		textarea_bcsm.prototype.getModuleData = function(sucFunc){
			var _self = this;
			var sendData = {
				"userid":userid
			}
			//ajax请求
			var ajaxdata = {
				url: '//post.58.com/getTemplet/'+userid +'/?source=car',
				data: sendData,
				sucFunc: sucFunc,
				errFunc: _self.getDataFail
			};
			_self.getAjax(ajaxdata);
			
		}
		/*调去模板数据失败-一般不会出现这个情况*/
		textarea_bcsm.prototype.getDataFail = function(_self){
			var tipElem = _self.rows.containerElem.find(".tip");
			Validate.showTip(tipElem,"调取模板数据失败，请检查网络并重试！", "error");
		}
		/*使用模板调取数据成功-填入数据*/
		textarea_bcsm.prototype.fillContent = function(data){
			var value = $("#Content").val();
			var newVal = '';
			if(value !== ''){
				newVal += '\r\n';
			}
			newVal += !data.cheliangmiaoshu ? '' : data.cheliangmiaoshu + '\r\n';
			newVal += !data.cheshangjieshao ? '' : data.cheshangjieshao + '\r\n';
			newVal += !data.cheliangfuwu ? '' : data.cheliangfuwu + '\r\n';
			$("#Content").val(value + newVal).focus();
		}
		/*修改模板调取数据成功-临时存储数据*/
		textarea_bcsm.prototype.saveUseData = function(data,_self){
			_self.moduleData = data;
			_self.renderModule();
		}
		/*我的模板保存数据*/
		textarea_bcsm.prototype.saveModule = function(from){
			var _self = this;
			var bValid = true,status,hasVal = false;
			var carfwTip = areaList['cheliangfuwu'].rows.containerElem.find(".tip");
			$.each(areaList,function(index,item){
				status = item.doCheck();
				if(item.getValue()){
					hasVal = true;
				}  
				if(bValid){
					bValid = status.bValid;
				}
			});
			if(bValid){
				if(!hasVal){
					Validate.showTip(carfwTip,"为了正常使用模板功能，请在以上输入框输入文字！", "error");
					return;
				}
				if(!_self.moduleNumOk){
					Validate.showTip(carfwTip,"已达到上限1800字，不能增加文字！", "error");
					return;
				}
				/*保存请求*/
				var sendData = {};
				$.each(areaList, function(index,item) {
					sendData[index] = item.getValue();
				});
				sendData['userid'] = userid;
				var ajaxdata = {
					url: '//post.58.com/updateTemplet/'+userid + '/?source=car',
					data: sendData,
					sucFunc: saveSuc,
					errFunc: saveFail
				};
				_self.getAjax(ajaxdata);
			}
			/*保存成功之后的操作-关闭弹窗*/
			function saveSuc(data,_self){
				if(data.result !== "success"){
					saveFail();	
					return;
				}
				Popwin.hide();
				var useModule = _self.module.find('.use-module'); 
				var defineM = _self.module.find('.define-module'); 
				datasrc.hasModule = true;
				if(!useModule.hasClass('mactive')){
					useModule.addClass('mactive');
				}
				if(defineM.length){
		        	defineM.attr('onclick',"clickLog(\'from=pc_escfb_xgmb\');clickLog(\'from=pc_escfb_vipmb\');");
		        	defineM.html("修改模板").addClass('edit-module').removeClass('define-module');
					$(document).off("click.define");
				}
				
				//保存并使用的情况，直接将文本域中的内容放到content中，不再重新请求一次
				if(from == 'use'){
					_self.fillContent(sendData);
				}
			}
			/*错误提示-一般情况下不会出现*/
			function saveFail(){
				Validate.showTip(carfwTip,"保存失败，请重试", "error");
			}
		}
		
		textarea_bcsm.prototype.getAjax = function(ajaxdata){
			var _self = this;
			var data = ajaxdata.data||'';
			$.ajax({
				type: "post",
				url: ajaxdata.url,
				data: data,
				dataType: "json",
				success: function(data){
					if(data&&ajaxdata.sucFunc){
						ajaxdata.sucFunc(data,_self); 
					}
				},
				error: function(err){
					if(ajaxdata.errFunc){
						ajaxdata.errFunc(_self);
					}
				}
			});
		}
			
		var areaList = {};   //我的模板上的行数组
		/*渲染-将组建内容渲染到页面上*/
		function renderComponent(baseDefine,obj){
				/*渲染*/
				var i = j = k = 0;
				var block, row, base;
				var blockLength = baseDefine.length;
				var rowLength, baseLength;
				var tabIndex = 100;
				// TODO 是否可以一行或者一个区域进行渲染
				/*渲染baseDefine---start*/
				for (; i < blockLength; i++) {
				    // 区块
				    blockOpt = baseDefine[i];
				    var block = new Block(blockOpt);
			      	//将模块插入弹窗
				    block.containerElem.appendTo(obj);
				    rowLength = blockOpt.children.length;
				    j = 0;
				    for (; j < rowLength; j++) {
				        // 行级
				        rowsOpt = blockOpt.children[j];
				        var rows = new Rows(rowsOpt);
				        rows.render(block.contentElem);
				        baseLength = rowsOpt.children.length;
				        k = 0;
				        for (; k < baseLength; k++) {
				            // 基本组件
				            var baseOpt = rowsOpt.children[k];
				            baseOpt.tabIndex = (tabIndex++);
				            var baseData = null;
				            var defaultValue = null;
				            try {
				                // 优先取dataName，如果没有dataName,则使用name
				                baseData = datasrc[baseOpt.dataName || baseOpt.name];
				                defaultValue = baseData&&baseData.defaultValue||baseOpt.defaultValue;
				            } catch (e) {
				                baseData = null;
				            }
				            var instance = getConstructor(baseOpt.type, baseOpt, baseData);
				            // 将校验状态初始化到rows上
				            rows.setValidateStatus(baseOpt.name, !baseOpt.checkRuler);
				            instance.rows = rows;
				            instance.block = block;
				            instance.render(rows.contentElem);
				            if(baseOpt.name){
				           		areaList[baseOpt.name] = instance;
				            }
				            if(baseOpt.view.afterText){
				            	instance.container.append(baseOpt.view.afterText);
				            }
				        }
				    }
				}
				/*渲染baseDefine---end*/
		}
		
		/*创造对象*/
		var compMap = {};
		function getConstructor(type, opts, data) {
			var compMap = {};
	            var F = compMap[type];
	            if (!F) {
	                F = require('component/' + type + '/js/' + type);
	                compMap[type] = F;
	            }
	            return new F(opts, data);
        }
		//点击‘使用模板’-ajax请求数据

		return textarea_bcsm;

});
/**
 * [颜色选择]
 * @param  {[type]} Base       [description]
 * @param  {[type]} Class){} [description]
 * @return {[type]}            [description]
 */
define('component/colorPick/js/colorPick',['component/base/js/base','util/Class'],function(Base,Class){
	var colorPick=Class.extend(Base);
	/*var colorData=[{
		val:'527807',
		valId:880067,
		bgcolor:'#ff2600',
		text:'红'
	},{
		val:'527808',
		valId:
		bgcolor:'#fd7100',
		text:'橙'
	},{
		value:527809,
		bgcolor:'#ffcc01',
		text:'金'
	},{
		value:527810,
		bgcolor:'#fffb01',
		text:'黄'
	},{
		value:527811,
		bgcolor:'#f6f4be',
		text:'米'
	},{
		value:527812,
		bgcolor:'#cc3599',
		text:'紫'
	},{
		value:527813,
		bgcolor:'#3499ff',
		text:'蓝'
	},{
		value:527814,
		bgcolor:'#00cb65',
		text:'绿'
	},{
		value:527815,
		bgcolor:'#65cccb',
		text:'青'
	},{
		value:527816,
		bgcolor:'#663400',
		text:'栗'
	},{
		value:527817,
		bgcolor:'#996600',
		text:'棕'
	},{
		value:527818,
		bgcolor:'#cb6633',
		text:'褐'
	},{
		value:527819,
		bgcolor:'#29282c',
		text:'黑'
	},{
		value:527820,
		bgcolor:'#e1e2e3',
		text:'灰'
	},{
		value:527821,
		bgcolor:'#f6f6f6',
		text:'银'
	},{
		value:527822,
		bgcolor:'#ffffff',
		text:'白'
	},{
		value:527823,
		bgcolor:'',
		text:'其它'
	}];*/
	colorPick.prototype.CLASS = {
		/** @type {String} 容器的className */
		WRAP: 'colorPick_wrap',
		/** @type {String} 标题的className */
		TITLE: 'colorPick_title',
		/** @type {String} 内容区域的className */
		CONTENT: 'colorPick_content',
		/** @type {String} 当前后有内容时，需要增加的class */
		MULTI: 'clearfix'
	};
	colorPick.prototype.type='colorPick';
	colorPick.prototype.createElem=function(){
		var _self=this;
		//var bgColor='#ff2600,#fffb01,#29282c,#fff,#3499ff,#00cb65,#e1e2e3,#cc3599,#ffcc01,#fd7100,#960,#65cccb,#663400,#f6f4be,#f6f6f6,#cb6633,'.split(',');
		var data=this.data.values;
		var len=data.length;
		/*for(var i=0;i<len;i++){
			data[i].bgcolor=bgColor[i];
		}*/
		_self.container=$('<div>').addClass(_self.CLASS.WRAP);
		var len=data.length;
		for(var i=0;i<len;i++){
			_self.createColorTag(data[i]);
		}
	};
	colorPick.prototype.createColorTag=function(color){
		var _self=this;
		var colorTag=$('<a>').addClass('colorTag').data('val',color.val).data('valId',color.valId).attr('href','javascript:void(0)');
		var domStr='';
		if(color.val=='14'||color.val=='527823'||color.val=='527846'){
			domStr='<span class="other">'+color.text+'</span><i></i>';
		}else{
			domStr='<span><em style="background-color:'+color.bgcolor+'"></em>'+color.text+'</span><i></i>';
		}
		colorTag.append(domStr);
		_self.container.append(colorTag);
	};
	colorPick.prototype.bindDomEvent=function(){
		var _self=this;
		_self.container.on('click','.colorTag',function(){
			_self.container.find('.colorTag').removeClass('colorPicked');
			_self.container.trigger('change');
			$(this).addClass('colorPicked');
			// 触发校验
			var checkObj=_self.doCheck();
			if(checkObj.bValid === true && _self.rows.getValidateStatus() !== true) {
				_self.hideTips();
			}
		});
	};
	colorPick.prototype.disabled=function(){
		var _self = this;
		_self.container.off('click');
		this.container.addClass("disabled");
	}
	colorPick.prototype.undisabled=function(){
		this.bindDomEvent();
		this.container.removeClass("disabled");
	}
	colorPick.prototype.getValue=function(){
		var _self=this;
		var value=_self.container.find('.colorPicked').data('val')||'';
		return value;
	};
	colorPick.prototype.setValue=function(value){
		var _self=this;
		var tag=_self.findTagByValue(value);
		_self.container.find('.colorTag').removeClass('colorPicked');
		this.container.trigger('change');
		tag.addClass('colorPicked');
	};
	colorPick.prototype.getText=function(){
		var _self=this;
		var value=_self.container.find('.colorPicked').text()||'';
		return value;
	}
	colorPick.prototype.findTagByValue=function(value){
		var tag=this.container.find('.colorTag');
		var len=tag.length;
		for(var i=0;i<len;i++){
			if(tag.eq(i).data('val')==value){
				return tag.eq(i);
			}
		}
	};
	return colorPick;
});
/**
 * 方块选择框，选择是/否，有/无
 * @module component/SquareRadio
 */
define('component/squareRadio/js/squareRadio',['component/base/js/base' , 'util/Class', 'Controller/Controller', 'component/rows/js/rows'], function(Base, Class, Controller, Row) {
	function getConstructor(type, opts, data) {
		var F = require('component/' + type + '/js/' + type);
		return new F(opts, data);
	}

	/**
	 *  @constructor
	 *  @alias module:component/SquareRadio
	 *  @param {Object} opt 配置文件 
	 */
	var SquareRadio = Class.extend(Base);

	/**
	 * 默认的className。包括wrap、title、content、multi
	 * @type {Object}
	 */
	SquareRadio.prototype.CLASS = {
		/** @type {String} 容器的className */
		WRAP: 'squareRadio_wrap',
		/** @type {String} 标题的className */
		TITLE: 'squareRadio_title',
		/** @type {String} 内容区域的className */
		CONTENT: 'squareRadio_content',
		/** @type {String} 当前后有内容时，需要增加的class */
		MULTI: 'clearfix',
		ITEM: 'squareRadio',
		DEFAULT: 'custom'
	};
	SquareRadio.prototype.type = 'SquareRadio';
	SquareRadio.prototype.createElem = function() {
		// TODO
		// 1、实现修改
		// 2、是否
		var _self = this;
		this.container = $('<div>');
		this.container.addClass(this.CLASS.WRAP);
		this.container.attr('name', this.opts.name);
		if(this.opts && this.opts.id) {
			this.container.attr('nameid', this.opts.id);
		}

		if(!_self.data) {
			return;
		}
		_self.renderChild();
		_self.setElemView();
	};

	SquareRadio.prototype.renderChild = function() {
			var _self = this;	
		var customStyles = _self.opts.customStyles || {};
		for(var i=0; i<_self.data.values.length; i++) {
			var dataObj = _self.data.values[i];
			var elem = getItemHtml(dataObj.val, dataObj.text);
			if(customStyles[dataObj.val]) {
				_self.container.addClass(_self.CLASS.DEFAULT);
				elem.find('i').addClass(customStyles[dataObj.val])
			}
			_self.items.push(elem);
			_self.container.append(elem);
		}
		
		// 增加自定义属性
		for(var key in _self.opts.attr) {
			if(_self.opts.attr.hasOwnProperty(key)) {
				$(_self.items).each(function() {
					$(this).attr(key, _self.opts.attr[key]);
				})
			}
		}

		// @TODO 增加父元素div或者span
		function getItemHtml(value, text) {
			var itemHtml = '<div tabindex="' + _self.opts.tabIndex + '" class="' + _self.CLASS.ITEM + '" data-value="' + value + '"><i></i><span>' + text + '</span></div>';
			//if(____json4fe.catentry[1].dispid == "70185" && (_self.opts.name === "shifougenghuan" || _self.opts.name === "shifoubaoyang")) {
			//	itemHtml += '<div class="square_city">（同城市）</div>';
			//}
			var elem = $(itemHtml);
			return elem;
		}
	};

	/**
	 * @description 清除所有子元素
	 */
	SquareRadio.prototype.flushChild = function() {
		var _self = this;
		_self.items = [];
		var className = _self.CLASS.ITEM;
		_self.container.find('.' + className).remove();
	};

	SquareRadio.prototype.disabled = function() {
		this.unbindEvent();
		this.container.addClass('SquareRadio_disabled');//setClassByStatus('disabled');
	};
	SquareRadio.prototype.unbindEvent = function() {
		var itemSelector = '.' + this.CLASS.ITEM;
		this.container.find(itemSelector).unbind('focus blur');
		this.container.unbind('click keydown')
	}
	/**
	 * 根据opt.view配置来设置elem的一些属性
	 */
	SquareRadio.prototype.setElemView = function() {
		if (this.opts.view.afterText || this.opts.view.beforeText) {
			this.container.prepend(this.opts.view.afterText);
			this.container.append(this.opts.view.beforeText);
		}
		if(this.opts.className) {
			this.container.addClass(this.opts.className);
		}
		this.container.addClass(this.CLASS.MULTI);
	};
	SquareRadio.prototype.focusTo = function() {
		this.items[0].focus();
	};

	/**
	 * DOM事件处理
	 */
	SquareRadio.prototype.bindDomEvent = function() {
		var itemSelector = '.' + this.CLASS.ITEM;
		var _self = this;

		_self.container.on('focus', itemSelector,function(e) {
			_self.container.find(itemSelector).removeClass('selected');
			_self.container.find(itemSelector).find("i").hide();
			$(this).addClass('selected');
			$(this).find('i').show();

			//判断，当从上一个组件tab下来的时候，执行select改变选中的值为控件0，触发inputover事件
			var index = $(e.target).index();
			if(index == 0){
				_self.select(0,'focus');	
			}
		});
		_self.container.on('blur',itemSelector, function(e) {
			//var $relatedTarget = $(e.relatedTarget);
			// 判断relatedTarget是否在组件容器内
			// 如果仍在容器内，则不触发inputover
			//if(false === $relatedTarget.hasClass(_self.CLASS.ITEM) && $relatedTarget.parents(_self.CLASS.WRAP).length < 1) {
				// 如果不在容器内，则触发inputover属性
				//_self.container.find(itemSelector).removeClass('hover');
				// 在当前组件blur的时候才触发校验
                var checkObj=_self.doCheck();
                if(checkObj.bValid === true) {
						_self.hideTips();
				}
			//}
		});
		_self.container.bind('click', function(e){
			_self.container.focus();
			var target = e.target;
			// 点击当前选中内容，不做任何处理
			if($(target).hasClass('focus') || $(target).parents('.focus').length>0) {
				return;
			}
            //点击当前禁用灰显内容，不做任何修改
            if($(target).hasClass('disabled') || $(target).parents('.disabled').length>0) {
                return;
            }
			// @TODO 1、提取出对class、，对container的事件触发和赋值的操作
			if($(target).hasClass(_self.CLASS.ITEM) 
				|| ($(target).parents('.' + _self.CLASS.ITEM).length > 0 && (target=$(target).parents(itemSelector)[0]))) {
				var curIndex = $(target).index();
				_self.select(curIndex,'click');
			}
		});
		// keydown事件支持
		_self.container.bind('keydown', function(e) {
			var keycode = e.keyCode;
			if(SquareRadio.EVENT.KEY_CODE.LeftArrow === keycode || SquareRadio.EVENT.KEY_CODE.UpArrow === keycode) {
				_self.changeItem(-1);
			} else if(SquareRadio.EVENT.KEY_CODE.RightArrow === keycode || SquareRadio.EVENT.KEY_CODE.DwArrow === keycode) {
				_self.changeItem(1)
			} else if(SquareRadio.EVENT.KEY_CODE.Space === keycode) {
				e.preventDefault();
				var i = $(e.target).index();
				_self.select(i);

			//禁用tab事件
			}else if(SquareRadio.EVENT.KEY_CODE.TAB === keycode){
				//2e.preventDefault();
				_self.select(1,'keydown');
			}
		});

	};
	/**
	 * 左右移动选择的处理函数
	 * @param  {Number} step 
	 */
	SquareRadio.prototype.changeItem = function(step) {
		var i = this.container.find('.focus').index();
		i = i<0 ? 0 : i;
		i = (i + step + this.items.length) % this.items.length;
		this.select(i);
	};

	 
	/**
	 * 设置选中选择元素
	 * @param  {Number} index 要选择元素的索引值
	 */
	SquareRadio.prototype.select = function(index, from,valueState) {
		var selectItem = this.items[index];
		if(!selectItem) {
			return;
		}
		this.container.find('.' + this.CLASS.ITEM).removeClass('focus');

		if(from == "focus"){
			//当函数从focus事件过来时，只执行增加class：.focus
			selectItem.addClass('focus');
		}else{	//函数从其他事件过来，要执行focus事件,改变选中的内容的背景
			selectItem.focus().addClass('focus');
		}
		
		$(this).addClass('focus');

		this.value = selectItem.data('value');
		if(valueState !== 1) {
			this.container.trigger('displayToggle');
			this.container.trigger('change', [this.getValue()]);
			this.handleRelateComp();
		}
		/*var checkObj = this.doCheck();
		if(checkObj.bValid === true) {
			this.hideTips();
		}*/
   		var checkObj=this.doCheck();
                if(checkObj.bValid === true) {
						this.hideTips();
				}

		// 做好值得选择之后，触发inputover事件
		this.container.triggerHandler('inputover');
		var appType = businessData.isVipApp==0?"pc_":"pcv_"
		clickLog("from="+appType+____json4fe.catentry[1].dispid+"_click_"+this.opts.name); 
	};
	/**
	 * 设置选中第一个元素
	 * @return {[type]} [description]
	 */
	SquareRadio.prototype.selectFirst=function(){
		this.select(0);
	}
	/** 获取当前组件的value */
	SquareRadio.prototype.getValue = function() {
		//alert(this.value);
		return this.value;
	};
	SquareRadio.prototype.setValue = function(value, text, valueState) {
		var index = this.container.find('[data-value="' + value + '"]').index();
		this.select(index, valueState);
		// this.value = value;
	};
	SquareRadio.prototype.getText = function(){
		var text = this.container.find('.focus span').text();
		return text;
	};
    
    /*
    * 禁用单个SquareRadio
    */
   /* SquareRadio.prototype.disabledOne = function(disabledValue) {
        var disabledOneSquareRadio=this.container.find('[data-value="' + disabledValue + '"]');
        if(disabledOneSquareRadio) {
            disabledOneSquareRadio.removeClass("hover").removeClass("focus").addClass("disabled").unbind('focus blur');
        }
    };
*/
    /**
     * 为二手做的兼容处理，需要动态更改dataName
     * @param {String} dataName 
     */
    SquareRadio.prototype.setDataName = function(dataName) {
    	if(typeof dataName === 'string' && dataName.length > 0) {
    		this.dataName = dataName;
    	}
    };
    SquareRadio.prototype.getDataName = function() {
    	return this.dataName;
    }
    /**
     * 重置数据源，二手中有该需求
     * @param  {Object} data 数据源对象
     */
   /* SquareRadio.prototype.resetData = function(data) {
    	this.data = data;
    	this.items = [];
    	this.container.html('');
    	this.renderChild();
    	this.value = '';
    	this.handleRelateComp();
    };
    SquareRadio.prototype.getParamId = function() {
    	return this.data.id || this.data.pid;
    }*/

	/**
	 * 返回后端需要的vlId，同setValueId区分开
	 */
	SquareRadio.prototype.getCurValId = function() {
		var value = this.getValue();
		var valId = null;
		for(var i=0; i<this.data.values.length; i++) {
			var obj = this.data.values[i];
			if(obj.val == value) {
				valId = obj.valId;
				break;
			}
		}
		return valId;
	};
	/**
	 * 增加新的关联组件，每个组件都独立一行显示	
	 * @param {Array} conf 组件的配置列表
	 */
	SquareRadio.prototype.addNewRow = function(confList) {
		var conf;
		for(var i=0; i<confList.length; i++) {
			conf = confList[i];
			// 防止多次创建
			if(Controller.records.get(conf.name)){
				Controller.records.get(conf.name).activate();
				break;
			}
			var instance = getConstructor(conf.type, conf, conf);
			this.addRelateComp(instance);
			//instance.lastInstance = lastInstance;
			// 将校验状态初始化到rows上
			var wpzkObj = Controller.records.get(this.opts.name);
			var rows = new Row({
				type: "rows",
				title: conf.title
			});
			rows.setValidateStatus(conf.name, !conf.checkRuler);
			instance.rows = rows;
			instance.block = this.block;
			wpzkObj.rows.containerElem.after(rows.containerElem)
			instance.render(rows.contentElem);
			Controller.records.set(conf.name, instance);
		}
	};

	/**
	 * 动态增加关联的组件
	 * @param {Object} compObj 组件实例
	 */
	SquareRadio.prototype.addRelateComp = function(compObj) {
		if(!this.relatedCompMap) {
			this.relatedCompMap = {}	
		}
		var curList = this.relatedCompMap[this.getValue()];
		if(!curList) {
			curList = this.relatedCompMap[this.getValue()] =  [];
		}
		curList.push(compObj);
	};
	/**
	 * 处理关联的组件，通过获取当前的值和状态，激活或冻结关联组件
	 */
	SquareRadio.prototype.handleRelateComp = function() {
		if(!this.relatedCompMap) {
			return;
		}
		var i=0;
		var value = this.getValue();
		if(this.opts.isFreeze) {
			value = '';
		}
		for(var key in this.relatedCompMap) {
			if(key == value) {
				for(i=0; i< this.relatedCompMap[key].length; i++) {
					this.relatedCompMap[key][i].activate();
				}
			} else {
				for(i=0; i< this.relatedCompMap[key].length; i++) {
					this.relatedCompMap[key][i].freeze();
				}
			}
		}
	};
	SquareRadio.prototype.freeze = function() {
		this.constructor.superclass.freeze.call(this);
		this.handleRelateComp();
	};
	/**
	 *新增通用方法 动态请求数据重置子节点
	 *作用：如果需要动态改变SquareRadio的子节点，
	 *就可以调用resetChildren先删除原有子节点，在重新创建新的子节点
	 *@param  {Object} ajaxData与data数据格式一致
	 */
	SquareRadio.prototype.resetChildren = function(ajaxData){
		var _self = this;
		//先删除所有子节点
		_self.flushChild();	
		var customStyles = _self.opts.customStyles || {};
		for(var i=0; i<ajaxData.values.length; i++) {
			var dataObj = ajaxData.values[i];
			var elem = getItemHtml(dataObj.val, dataObj.text);
			if(customStyles[dataObj.val]) {
				_self.container.addClass(_self.CLASS.DEFAULT);
				elem.find('i').addClass(customStyles[dataObj.val])
			}
			_self.items.push(elem);
			_self.container.append(elem);
		}
		
		// 增加自定义属性
		for(var key in _self.opts.attr) {
			if(_self.opts.attr.hasOwnProperty(key)) {
				$(_self.items).each(function() {
					$(this).attr(key, _self.opts.attr[key]);
				})
			}
		}

		// @TODO 增加父元素div或者span
		function getItemHtml(value, text) {
			var itemHtml = '<div tabindex="' + _self.opts.tabIndex + '" class="' + _self.CLASS.ITEM + '" data-value="' + value + '"><i></i><span>' + text + '</span></div>';
			var elem = $(itemHtml);
			return elem;
		}
	}
	return SquareRadio;
});
/**
 * 上传图片 值保存的是图片的全路径："http://pic1.58cdn.com.cn/p2/big/n_v1bl2lwkecxhyfnnwhfrga.jpg"
 * @module component/ershouche_pic
 */
define('component/ershouche_pic/js/ershouche_pic',['component/base/js/base', 'util/Class', 'component/validate/js/validate', 'Controller/Controller', 'util/util',"component/imgUpload/js/imgUpload",'libs/swfobject', 'component/imgUpload/js/formProcess','component/imgUpload/js/html5Process','component/imgBox/js/imgBox'], function (Base, Class, Validate, Controller, Util, ImgUpload,swfobject,FormProcess,Html5Process,ImgBox) {

    /**
     *  @constructor
     *  @alias module:component/ershouche_pic
     *  @param {Object} opt 配置文件
     */
    var Ershouche_pic = Class.extend(ImgUpload);

    /**
     * 默认的className。包括wrap、title、content、multi
     * @type {Object}
     */
    Ershouche_pic.prototype.CLASS = {
        /** @type {String} 容器的className */
        WRAP: 'ershouchePic_wrap',
        /** @type {String} 标题的className */
        TITLE: 'ershouchePic_title',
        /** @type {String} 内容区域的className */
        CONTENT: 'ershouchePic_content',
        /** @type {String} 当前后有内容时，需要增加的class */
        MULTI: 'clearfix'
    };
    Ershouche_pic.prototype.defaultOpts={
        title:"行驶证经58验证后，将得到验证标识；符合原厂质保的，将同时得到原厂质保标识",
        loadComplete:"<span>我们将尽快为您进行审核!</span>",
        btnImg:"//img.58cdn.com.cn/ui7/post/img/upload_driving_btn.png",
        loadImg:"//img.58cdn.com.cn/ui7/post/pc/imgs/yzcbpic.png",
        disableType:[], //['gif']
        disabledByteSize: 10485760, //10M
        wxSupport:true,
        maxLength: 24,
        wxSupport:false,
        qqSupport:false
    }
    Ershouche_pic.prototype.type = 'ershouche_pic';
    Ershouche_pic.prototype.init = function() {
        this.constructor.superclass.constructor.superclass.init.apply(this, arguments);
        this.opts = $.extend(true, {},this.defaultOpts,this.opts);//by zjj
        this.opts.maxLength = (parseInt(this.opts.attr.maxLength) > 0)?this.opts.attr.maxLength : this.defaultOpts.maxLength;
        // 将回调函数传入处理对象中，所有对象均保持一个出口
        // ImgsBar无需关注具体使用哪种处理方法
      
       var startIndex = 0
        //var processOpt = $.extend(true, {startIndex: startIndex}, this.getCallbackOpt(), this.opts.picProcess);

        // 将回调函数传入处理对象中，所有对象均保持一个出口
        // ImgsBar无需关注具体使用哪种处理方法
        var processOpt = $.extend(true, {startIndex: startIndex}, this.getCallbackOpt(), this.opts.picProcess);
        (typeof processOpt.disableType === 'undefined') && (processOpt.disableType = this.defaultOpts.disableType);
        
        var Process = this.getProcess();
        this.imgProcess = new Process(processOpt);
     
        this.imgList = [];/*初始化 避免页面多个上传组件时变量污染*/
    };
    Ershouche_pic.prototype.getProcess = function() { 
        var flshVer= swfobject.getFlashPlayerVersion();
        if(this.isSupportHtml5()) {
            ImgBox.prototype.logObj.uploadType = 'h5';
            this.uploadType = 'h5';
            return Html5Process;
        }  else {
            ImgBox.prototype.logObj.uploadType = 'form';
            this.uploadType = 'form';
            // 使用form模式记录下低版本flash的总量，可以归纳出真正既不支持html5也不支持flash的比率有多少
            ImgBox.prototype.logObj.flashVersion = flshVer.major + '.' + flshVer.minor;
            return FormProcess;
        }
    };
    Ershouche_pic.prototype.createElem = function(){
      var opts = this.opts;
        this.maxLength = (parseInt(opts.attr.maxLength) > 0)?opts.attr.maxLength : this.defaultOpts.maxLength;

        (typeof opts.picProcess.disabledByteSize === 'undefined') && (opts.picProcess.disabledByteSize = this.defaultOpts.disabledByteSize);
        var _disabledByteSize = opts.picProcess.disabledByteSize;
        //get uploadType
        this.process = this.getProcess();
        if(this.uploadType == 'form'){
            _disabledByteSize = opts.picProcess.maxByteSize; //表单不能压缩
        }
        
        this.opts = $.extend(true, {}, this.defaultOpts, this.opts);
        var clearfixTemplate = $('<div id="upload_xsz_tit" class="clearfix upload_xsz_tit">'+
            '<span>'+
            // '<input  type="file" name="imageLoad" class="carloadimage">'+
            '<a class="carloadimageTrigger"  class=" fl mr10 w_local2" href="javascript:void(0)">'+
            '<img src="" alt="">'+
            '</a>'+
           ' <div id="localImgUpLoad" class="localImgUpLoad"></div>'+
            '</span>'+
            '<span class="title">'+this.opts.title+'</span>'+
            '</div>');
        var imgContentTemplate =$('<div class="clearfix chengUploadView images_upload"><span class="delete_con"></span>'+
            '<img class="carPicUploadImgContain" src=""/>'+
            '</div>');
        var picPromptTemplate =$('<div class="Picprompt images_upload_meg"><!----></div>');
        this.container = $('<div class="'+this.CLASS.WRAP+'" name="'+this.opts.name+'"></div>');
        this.toolElement = $(clearfixTemplate);
        this.imgElement = $(imgContentTemplate);
        this.picPromptElement = $(picPromptTemplate);
        this.toolElement.find("img").attr("src",this.opts.btnImg);
        this.imgElement.find("img").attr("src",this.opts.loadImg);
        this.container.append(this.toolElement).append(this.imgElement).append(this.picPromptElement);
        this.container.addClass(this.opts.className);
    }
    Ershouche_pic.prototype.render = function(wrapElem) {
        var _self = this;
        Base.prototype.render.call(this, wrapElem);
       
        this.imgProcess.render(this.container.find(".localImgUpLoad"));
     
         
    };
    // Ershouche_pic.prototype.bindDomEvent =function(){
    //     var _self =this;
    //     this.toolElement.find(".carloadimage").click(function () {
    //        // _self.toolElement.find(".carloadimage").trigger("click");ie9以下因为安全策略不允许程序模拟点击触发表单提交
    //        var appType = businessData.isVipApp==0?"pc_":"pcv_";
    //        clickLog("from="+appType+____json4fe.catentry[1].dispid+"_click_"+_self.opts.name);  
    //     })
    //     this.toolElement.find(".carloadimage").bind('change',this.ajaxfileUpload.bind(_self));
    //     this.imgElement.find(".delete_con").hide();
    //     var count = -1;
    //     this.imgElement.find(".delete_con").on("click",function(){
    //         _self.imgElement.find("img").attr("src",_self.opts.loadImg);/*恢复默认图片*/
    //         _self.imgElement.find(".delete_con").hide();
    //         _self.picPromptElement.html("");
    //         _self.value = "";
    //         count++;
    //         _self.toolElement.find(".carloadimage").remove();
    //         var newinput =$('<input  type="file" name="imageLoad" title='+count +' class="carloadimage">');
    //         newinput.insertBefore(_self.toolElement.find(".carloadimageTrigger"));
    //         newinput.unbind("change").bind('change',_self.ajaxfileUpload.bind(_self));
    //         _self.doCheck();
    //     });
    // }
   
    Ershouche_pic.prototype.setValue=function(picloc,picLocation,change){
        this.picPromptElement.empty();
        this.picPromptElement.html(this.opts.loadComplete);
        this.value=picloc;
        this.container.triggerHandler('change',[picloc,this]);
        picloc = picloc.replace(/(\.(jpg|jpeg|png|gif))$/, "_120_88$1");
        picloc = picloc.replace("http:","");
        this.imgElement.find(".carPicUploadImgContain").attr("src", picloc);
        this.imgElement.find(".delete_con").show().css("display","block");//ie9show默认inline
        this.doCheck();

    }
    Ershouche_pic.prototype.getValue=function(){
        return this.value;
    }
    Ershouche_pic.prototype.doCheck=function() {
        // 用调试，url增加server_check=1，则启动后台校验，前端校验一律跳过
        if (Controller.bUseServerCheck()) {
            return {
                bValid: true,
                msg: ''
            };
        }
        var checkObj = false;
        var value = this.getCheckValue ? this.getCheckValue() : this.getValue();
        // 只有当canNull为true并且value为空值的时候才直接跳过，并不更新状态
        if (this.opts.canNull && !value && this.opts.type!='timeTravel') {
            return {
                bValid: true,
                msg: ''
            };
        } else if (this.opts.defaultValue && this.opts.defaultValue === value || (typeof this.opts.defaultValue !== 'undefined' && this.opts.defaultValue.replace(/(^\s+)|(\s+$)/g , '') && value === '')) {
            // 当获取值与默认值相等的时候，直接返回true
            this.showCheckTip({
                bValid: true,
                msg: ''
            });
            return {
                bValid: true,
                msg: ''
            };
        } else {
            checkObj = Validate.check(this.opts.checkRuler, value, this.rows);
            this.showCheckTip(checkObj);
            return checkObj;
        }
    }
    ImgBox.prototype.setImageUrl3 = function( picLocation,binit,self) {
        // var self = window.ershouche_picInstance;//从全局变量中取出缓存的instance
        var _self = this;
        var selfs = self;    
        var reallycarDom = Controller.records.get("reallyCar").container;
        //图片上传成功隐藏reallyCar里面的dom结构
        if (selfs.dataName == "chapaihao" ) {
            reallycarDom.find(".clzp-div .text").hide();
            selfs.toolElement.hide();
            selfs.imgElement.find("img").show();
        } else if (selfs.dataName =="yczbpic") {
            reallycarDom.find(".xsz-div .text").hide();
            selfs.toolElement.hide();
            selfs.imgElement.find("img").show();
        } else if (selfs.dataName =="yczbpic1") {
            reallycarDom.find(".xsz1-div .text").hide();
           selfs.toolElement.hide();
            selfs.imgElement.find("img").show();
            $(".postLabel_wrap .validate_error").hide();
        } else if (selfs.dataName =="dengjizheng") {
            reallycarDom.find(".cldjz-div .text").hide();
            selfs.toolElement.hide();
            selfs.imgElement.find("img").show();
        } else if (selfs.dataName =="gouchefapiao") {
            reallycarDom.find(".gcfp-div .text").hide();
            selfs.toolElement.hide();
            selfs.imgElement.find("img").show();
        } else if (selfs.dataName =="chapaihao1") {
            reallycarDom.find(".clzp1-div .text").hide();
            selfs.toolElement.hide();
            selfs.imgElement.find("img").show();
            $(".postLabel_wrap .validate_error").hide();
        }
        var picNum = 1;
        if (picNum == 1) {
            var picloc =  picLocation;
            self.imgElement.find(".delete_con").show().css("display","block");//ie9show默认inline
            self.setValue(picloc);
            //self.imgElement.removeClass("images_upload_ex2").addClass("images_upload_ex3");
            var xbsxInstance = Controller.records.get("xbsx");
            if(xbsxInstance){
                xbsxInstance.setValue(0);
            }
            var yczbInstance = Controller.records.get("yczhibao");
            if(yczbInstance){
                yczbInstance.setValue(525379);
            }
        } else if (picNum == 0) {
            self.imgElement.find(".delete_con").hide();
            self.picPromptElement.empty();
            self.picPromptElement.html("<p>" + picLocation + "</p>");
            var picloc =self.opts.loadImg
            self.imgElement.find(".carPicUploadImgContain").attr("src", picloc);
            var xbsxInstance = Controller.records.get("xbsx");
            if(xbsxInstance){
                xbsxInstance.setValue(0);
            }
            var yczbInstance = Controller.records.get("yczhibao");
            if(yczbInstance){
                yczbInstance.setValue(525381);
            }
            return false
        }

        
        // window.ershouche_picInstance =null;
    };
    return Ershouche_pic;
});
/**
 *业务组件 车架号输入
 *@module component/vin
 */
define('component/vin/js/vin',['component/base/js/base',
    'util/Class',
    'component/popTip/js/popTip',
    'Controller/Controller',
    'component/inputText/js/inputText',
    'component/ershouche_pic/js/ershouche_pic',
    'component/validate/js/validate',
    'util/postClickLog'
], function(Base, Class, PopTip, Controller, inputText, ershouche_pic, Validate, postClickLog) {
    /*继承父类inputText组件*/
    var VIN = Class.extend(inputText);

    VIN.prototype.bindDomEvent = function() {
        /*@todo调用超类中的父类方法*/
        this.constructor.superclass.bindDomEvent.bind(this)();
        /*输入框数去焦点对车架号进行校验*/
        this.container.bind("blur", this.ajaxCheckVin.bind(this));
        /*统计输入框输入字符数*/
        this.container.bind("input", this.statisticsInput.bind(this));
    }
    VIN.prototype.statisticsInput = function() {
        var self = this;
        var __len = self.getValue().length;
        var __inner = "(" + __len + "/17)";
        this.container.find("#chejiatongji").html(__inner)
    }
    var vinCheckData = {}; /*vin码校验数据缓存*/
    //重写vin校验逻辑
    VIN.prototype.ajaxCheckVin = function() {
            /*vin校验*/
            var self = this;
            var reg = /^[0-9a-hj-npr-zA-HJ-NPR-Z]{17}$/;
            var vinInstance = Controller.records.get("vin");
            var vinstateInstance = Controller.records.get("vinstate");
            var val = vinInstance.getValue();
            val = val.toUpperCase();
            vinInstance.setValue(val);
            var checkObj = { bValid: true, msg: '' };
            var reallycarInstance = Controller.records.get("reallyCar");
            /*if(vinInstance.doCheck().bValid == false){
                return;
            }*/
            if (reg.test(val)) { //只有满足17位验证才会发送请求验证
                var regs = /(?!^[0-9]+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{17}/;
                if ("" != val && regs.test(val) == false) {
                    checkObj.bValid = false;
                    checkObj.msg = "车架号不能输入纯字母或纯数字！";
                    this.showCheckTip(checkObj);
                    return;
                }
                if (val.length != 17) {
                    return true;
                }
                if (vinCheckData.vinCode && vinCheckData.vinCode == val) { /*vin重复校验*/
                    vinCheckData.isrepeat = true; /*重复校验*/
                    self.showTipVin(vinCheckData); /*直接提示*/
                    return true;
                }
                /*var data = "{"result":"678608","kuche":{"text":{"chexi":"景逸","brand":"风行","zimu":"F"},"val":{"chexi":"420395","brand":"420394","zimu":"408788"}}}";
                678608 车架号已使用 车架号已使用--酷车   678609     678610  vin码服务超时
                vinData = eval("(" + data + ")");
                showTipVin.bind(self)(vinData);*/
                $.ajax({
                    method: 'post',
                    url: '//post.58.com/ajax/?action=checkvin&source=car',
                    dataType: "jsonp",
                    data: { 'carvin': val, 'localid': ____json4fe['locallist']['dispid'] },
                    success: function(data) {
                        /*678608 车架号已使用 车架号已使用--酷车   678609     678610  vin码服务超时*/
                        vinCheckData = data;
                        vinCheckData.vinCode = val; /*记录已被校验过的vin码*/
                        self.showTipVin(vinCheckData);
                    },
                    error: function() {
                        console.log("fd")
                    }
                });
            } else {
                /*有可能已经执行过一次酷车回填，此时需要从新启用品牌选择*/
                /*var pinpai = Controller.records.get("pinpai");
                pinpai.input.find('#pinPai').unbind("click").bind('click', function (e) {
                     pinpai.showhide_win('pinPai');
                }).css("background-color","transparent");
                pinpai.input.find("#cheXi").unbind('click').bind('click', '#cheXi', function (e) {
                    pinpai.showhide_win('cheXi');
                }).css("background-color","transparent");
                pinpai.kuche=null;
                 pinpai.reset();*/
                vinCheckData = {};
                var isBiz = $(".radio_wrap[name=faburen]").children("div[class*=focus]").attr("data-value")
                if (businessData.isVipApp != 1 && isBiz == "1" && (____json4fe.locallist.dispid == "2" || ____json4fe.locallist.dispid == "79")) { /*上海行驶证或者vin码照片必填一个*/
                    reallycarInstance.setXszRequire(); //设置vin码重复行驶证必填
                } else {
                    reallycarInstance.setUnXszRequire(); //解除行驶证必填逻辑
                }
            }
            var prev = vinInstance.container.prev();
            if (prev.hasClass("validate_success")) {
                prev.css('left', '500px');
            }
        }
        /*车架号提示信息*/
    VIN.prototype.showTipVin = function(checkData) {
        //checkData = {res_code: "678609", res_text: "VIN推送至审核后台", vinCode: 678609}
        if (!checkData || checkData == undefined) {
            checkData = vinCheckData;
        }
        var vinstateInstance = Controller.records.get("vinstate");
        //var ershouche_pic =Controller.records.get("yczbpic");
        var ershouche_pic = Controller.records.get("chapaihao");
        var reallycarInstance = Controller.records.get("reallyCar");
        var checkObj = { bValid: true, msg: '' };
        var doCheck = vinstateInstance.doCheck;
        if (checkData.res_code == "678608" || checkData.res_code == "678611") {
            /*通过*/
            vinstateInstance.setValue(checkData.res_code);
            reallycarInstance.setUnXszRequire(); //解除行驶证必填逻辑
            //reallycarDom.find(".clzp-text").show();
            //this.doCheck = doCheck;
            $(".vin").find(".tip.validate_success").css('left', '500px');
        } else if (checkData.res_code == "678609" || checkData.res_code == "678612") {
            /*不通过*/
            checkObj.msg = checkData.res_text || "VIN码输入不正确！请重新输入！";
            checkObj.bValid = false;
            this.showCheckTip(checkObj);
            reallycarInstance.setUnXszRequire(); //解除行驶证必填逻辑
            vinstateInstance.setValue(checkData.res_code);
            //reallycarDom.find(".clzp-text").show();

        } else if (checkData.res_code == "678610") { /*一律返回审核中的参数都需要上传行驶证照片或者vin码*/
            /*审核中*/
            vinstateInstance.setValue(checkData.res_code);
            checkObj.msg = checkData.res_text;
            checkObj.bValid = false;
            this.showCheckTip(checkObj);
            reallycarInstance.setXszRequire(); //设置vin码重复行驶证必填
            this.doCheck = doCheck;
            //隐藏本身提示文案
            //reallycarDom.find(".clzp-text").hide();
        }
        /*回填酷车信息*/
        // var pinpai = Controller.records.get("pinpai");
        // if(checkData.kuche){
        //     if(checkData.isrepeat) return;/*重复回填*/
        //     pinpai.vinCodeGetKucheCallback(checkData.kuche);
        // }else{
        //     /*没有酷车信息时绑定下事件*/
        //     pinpai.input.find('#pinPai').unbind("click").bind('click', function (e) {
        //         pinpai.showhide_win('pinPai');
        //     }).css("background-color","transparent");
        //     pinpai.input.find("#cheXi").unbind('click').bind('click', '#cheXi', function (e) {
        //             pinpai.showhide_win('cheXi');
        //         }).css("background-color","transparent");
        //     pinpai.kuche=null;
        //     pinpai.reset();
        // }
        var isBiz = $(".radio_wrap[name=faburen]").children("div[class*=focus]").attr("data-value")
        if (businessData.isVipApp != 1 && isBiz == "1" && (____json4fe.locallist.dispid == "2" || ____json4fe.locallist.dispid == "79")) { /*上海行驶证和vin码照片必填*/
            reallycarInstance.setXszRequire(); //设置vin码重复行驶证必填
        }
    }
    VIN.prototype.doCheck = function() {
        // 用调试，url增加server_check=1，则启动后台校验，前端校验一律跳过
        if (Controller.bUseServerCheck()) {
            return {
                bValid: true,
                msg: ''
            };
        }
        var checkObj = false;
        var value = this.getCheckValue ? this.getCheckValue() : this.getValue();
        // 只有当canNull为true并且value为空值的时候才直接跳过，并不更新状态
        this.opts.canNull = this.opts.canNull != null ? this.opts.canNull : true; /*默认true*/
        if (this.opts.canNull && !value && this.opts.type != 'timeTravel') {
            return {
                bValid: true,
                msg: ''
            };
        }
        /*else if (this.opts.defaultValue && this.opts.defaultValue === value || (typeof this.opts.defaultValue !== 'undefined' && this.opts.defaultValue.replace(/(^\s+)|(\s+$)/g , '') && value === '')) {
                       // 当获取值与默认值相等的时候，直接返回true
                       this.showCheckTip({
                           bValid: true,
                           msg: ''
                       });
                       return {
                           bValid: true,
                           msg: ''
                       };
                   }*/
        else {
            checkObj = Validate.check(this.opts.checkRuler, value, this.rows);
            this.showCheckTip(checkObj);
            return checkObj;
        }

        var vinstateInstance = Controller.records.get("vinstate");
        var vinStateValue = vinstateInstance.getValue();
        if (vinStateValue == "678609" || vinStateValue == "678612") {
            return {
                //msg:"经核查该车架号输入有误，请核实后输入正确的车架号！",bValid:false
                msg: vinCheckData.res_text || "VIN码输入不正确！请重新输入！",
                bValid: false
            }
        } else {
            return {
                msg: "",
                bValid: true
            }
        }

    }
    ershouche_pic.prototype.doCheck = function() {
        /*上传行驶证特殊校验规则，如果vin码重复 则行驶证或者vin证件照必须有一个为必填*/
        var vinInstance = Controller.records.get("vin");
        var isBiz = $(".radio_wrap[name=faburen]").children("div[class*=focus]").attr("data-value")
        if (isBiz == "1" && businessData.isVipApp != 1 && this.opts.canNull != true && (____json4fe.locallist.dispid == "2" || ____json4fe.locallist.dispid == "79") || (vinInstance.getValue() != "" && vinCheckData.res_code == "678610")) {
            var vinpic = Controller.records.get("vinpic").getValue(); /*vin码照片*/
            var yczbpic = Controller.records.get("yczbpic").getValue();
            if ((!vinpic && !yczbpic) || (vinpic == "" && yczbpic == "")) {
                /*两者都为空*/
                var checkObj = { bValid: false, msg: '请验证行驶证已验标签' }
                if (iqasData.isBiz == "1" && businessData.isVipApp != 1 && (____json4fe.locallist.dispid == "2" || ____json4fe.locallist.dispid == "79")) { /*商家用户上海vin码必填且行驶证或者vin码照片必填一个*/
                    checkObj.msg = "请上传行驶证照片或者车架码照片!";
                }
                this.showCheckTip(checkObj);
                return checkObj;
            } else {
                this.showCheckTip({
                    bValid: true,
                    msg: ''
                });
                return {
                    bValid: true,
                    msg: ''
                };
            }
        } else {
            if (Controller.records.get("yczbpic").value != "" || Controller.records.get("vinpic").value != "") {
                var checkObj = { bValid: true, msg: '' };
                this.showCheckTip(checkObj);
                return checkObj;
            } else {
                Controller.records.get("yczbpic").container.prev().removeClass("validate_success");
                return {
                    bValid: true,
                    msg: ''
                };
            }
        }
    }
    return VIN;
});
/**
 * Created by 58 on 2016/3/25.
 */
define('component/tracker/js/tracker',[],function(){
    /**
     * @fileOverview 用户行为收集tracker.js
     * @author Zhao Jianfei <zhaojianfei@58.com>
     * @version 2.0.0
     * @description 用户行为收集tracker.js
     * @copyright © 58.com
     **/
    /**
     * @description 匿名函数
     * @namespace Anonymous
     */
    var isOldIE = navigator.userAgent.toUpperCase().match(/MSIE\s[678]/) === null ? false :true, // 是否为低版本IE
        catentry = window.____json4fe ? (window.____json4fe.catentry || []) : [],
        largeCate = !!catentry[0] ? catentry[0].dispid : '', // 一级类
        smallCate = !!catentry[1] ? catentry[1].dispid : '', // 二级类
        elemIdReg = /^((\^?)|(\??))([0-9a-zA-Z_-]+)/i, // 匹配元素id正则
        formatNumber = function (num) { // 格式化数字方法
            return typeof num !== 'undefined' ? parseFloat(num).toFixed(0) : '-';
        },
        _inPaste = false,
        pasteDone = function () {}, // 粘贴完成的后的回调方法
        arrayMap = function (arr, fun) {
            return Array.prototype.map ?
                [].map.call(arr, fun) :
                (function(callback, thisArg) {
                    var T, A, k;

                    if (this == null) {
                        throw new TypeError(" this is null or not defined");
                    }

                    var O = Object(this);
                    var len = O.length >>> 0;

                    if (typeof callback !== "function") {
                        throw new TypeError(callback + " is not a function");
                    }

                    if (arguments.length > 1) {
                        T = thisArg;
                    }

                    A = new Array(len);
                    k = 0;

                    while (k < len) {
                        var kValue, mappedValue;

                        if (k in O) {
                            kValue = O[k];
                            mappedValue = callback.call(T, kValue, k, O);
                            A[k] = mappedValue;
                        }

                        k++;
                    }

                    return A;
                }).call(arr, fun);
        }, // Array map html5 polyfill
        arrayIndexOf = function (arr, searchElement, fromIndex) {
            return Array.prototype.indexOf ?
                [].indexOf.call(arr, searchElement, fromIndex) :
                (function(searchElement, fromIndex) {
                    var k;

                    if (this == null) {
                        throw new TypeError('"this" is null or not defined');
                    }

                    var O = Object(this);
                    var len = O.length >>> 0;

                    if (len === 0) {
                        return -1;
                    }

                    var n = +fromIndex || 0;

                    if (Math.abs(n) === Infinity) {
                        n = 0;
                    }

                    if (n >= len) {
                        return -1;
                    }

                    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

                    while (k < len) {
                        var kValue;

                        if (k in O && O[k] === searchElement) {
                            return k;
                        }

                        k++;
                    }

                    return -1;
                }).call(arr, searchElement, fromIndex);
        }; // Array indexOf html5 polyfill
    /**
     * @name Anonymous~settings
     * @description 控件全局设置
     * @type {object}
     * @property {number} limit 日志最多条数
     * @property {type} type 日志类型
     */
    var settings = {
        limit: 50,
        type: 'text'
    };

    /**
     * @name Anonymous~eventConfig
     * @description 控件事件设置
     * + -1: 记录最后一次触发的日志
     * + 0: 监听事件，但是不记录日志
     * + 1: 记录第一次触发的日志
     * + 100: 记录100次触发的日志
     * @type {object}
     * @property {object} input input元素事件设置
     * @property {number} input.click click事件
     * @property {number} input.paste paste事件
     * @property {number} input.focus focus事件
     * @property {number} input.mouseover mouseover事件
     * @property {number} input.mouseout mouseout事件
     * @property {object} button button元素事件设置
     * @property {number} button.mousedown mousedown事件
     * @property {number} button.mouseup mouseup事件
     * @property {object} editor 编辑器元素事件
     * @property {number} editor.click click事件
     * @property {number} editor.click click事件
     * @property {number} editor.paste paste事件
     * @property {number} editor.focus focus事件
     * @property {number} editor.mouseover mouseover事件
     * @property {number} editor.mouseout mouseout事件
     */
    var eventConfig = {
        input: {
            'click': 10,
            'paste': 5,
            'focus': 5,
            'blur': 5,
            'input': 0,
            //'propertychange': '0',
            'mouseover': 1,
            'mouseout': 1
        },
        button: {
            'mousedown': -1,
            'mouseup': -1
        },
        editor: {
            'click': 10,
            'paste': 5,
            'focus': 5,
            'blur': 5,
            'input': 0,
            // 'propertychange': 0,
            'mouseover': 1,
            'mouseout': 1
        }
    };
    /**
     * @name Anonymous~defaults
     * @description 控件监听元素默认设置，可由`window.__gsxw_conf`配置
     * **前缀说明：**
     * + `^`表示表单提交按钮
     * + `?`表示动态元素
     * @type {object}
     * @property {string} name 表单提交字段
     * @property {string} form 表单id
     * @property {array} input 监听input元素列表
     * @property {array} button 监听button元素列表
     * @property {array} editor 监听编辑器元素列表
     */
    var defaults = {
        name: '__post_gsxw',
        form: 'aspnetForm',
        input: ['Title'],
        button: ['^fabu'],
        editor: ['editor']
    };

    /**
     * @namespace editor
     * @description 编辑器工具对象
     */
    var editor = {
        /**
         * @alias editor.type
         * @description 编辑器类型：`baidueditor|htmleditor`
         * @type {string}
         */
        type: '',
        /**
         * @alias editor.id
         * @description 编辑器id
         * @type {string}
         */
        id: '',
        /**
         * @alias editor.instance
         * @description 编辑器实例对象：当`editor.type`为`baidueditor`时可用
         * @type {object}
         */
        instance: null,
        /**
         * @alias editor.element
         * @description 编辑器DOM元素
         * @type {object}
         */
        element: null,
        /**
         * @alias editor.defaults
         * @description 编辑器默认配置
         * @type {object}
         * @property {string} type 编辑器默认类型
         */
        defaults: {
            type: 'htmleditor'
        },
        /**
         * @description 获取编辑器类型方法
         * @alias editor.getEditorType
         * @param  {string} largeCate 发布页一级类别
         * @param  {string} smallCate 发布页二级类别
         * @return {string}           编辑器类型：baidueditor|htmleditor
         */
        getEditorType: function (largeCate, smallCate) {
            var _t = this,
                type = _t.defaults.type;

            // 通过大类和二级类获取editor类型
            if(typeof _t.typeCateMap[largeCate] === 'string') {
                type = _t.typeCateMap[largeCate];
            } else if(typeof _t.typeCateMap[largeCate] === 'object'){

                if(typeof _t.typeCateMap[largeCate][smallCate] === 'string') { // 具体二级类
                    type = _t.typeCateMap[largeCate][smallCate];
                } else if(typeof _t.typeCateMap[largeCate]['*'] === 'string') { // 通配符
                    type = _t.typeCateMap[largeCate]['*'];
                } else {
                    type = _t.defaults.type;
                }

            } else {
                type = _t.defaults.type;
            }

            return type;
        },
        /**
         * @description 获取编辑器DOM元素方法
         * @alias editor.getEditorElement
         * @return {object} 编辑器DOM元素对象
         */
        getEditorElement: function () {
            var _t = this;
            if(_t.type === 'baidueditor') {
                // 获取baidu编辑器实例
                try {
                    _t.instance = baidu.editor.instants['ueditorInstant0']; // instance属性赋值
                    return _t.instance.document;
                } catch(e) {
                    return null;
                }

            } else if (_t.type === 'htmleditor') {
                _t.id = 'div_htmleditor'; // html编辑器元素id
                return $(_t.id).find('.editor')[0];
            } else {
                _t.id="editor";
                return $(_t.id)[0];
            }

        },
        /**
         * @description 绑定编辑器事件方法
         * @alias editor.bindEditorEvents
         * @param  {object} logger  元素日志配置对象
         * @param  {object} tracker tracker对象实例
         */
        bindEditorEvents: function (logger, tracker) {
            var _t = this,
                events = eventConfig[logger.type],
                callback = tracker.loggerHandler,// tracker对象实例的日志回调方法
                isDynamic = logger.isDynamic,
                $el = null;
            //新框架都统一使用newEditor
            _t.type = "newEditor";//_t.getEditorType(largeCate, smallCate); // 获取编辑器类型
            _t.element = _t.getEditorElement(); // 获取编辑器DOM元素
            // baidu编辑器特定事件绑定方法
            function bindEditorEvent (eventType, logNum, elem) {
                var count = 0;
                _t.instance.addListener(eventType, function (eType, event) {
                    var callee = arguments.callee;
                    callback.call(elem, event, logger, logNum, tracker);

                    if(++count === logNum) {
                        _t.instance.removeListener(eventType, callee);
                    }

                });
            }
            /**
             * @description baidu编辑器一般事件绑定方法
             * @name editor#bindEditorEvents~bindEvent
             * @param  {string} eventType 事件类型
             * @param  {number} logNum    日志记录数目
             * @param  {object} elem      绑定事件DOM元素
             */
            function bindEvent (eventType, logNum, elem) {
                var count = 0;
                $(elem)[isDynamic ? 'live' : 'bind'](eventType, function (event) {
                    var callee = arguments.callee;
                    callback.call(this, event, logger, logNum, tracker);

                    if(++count === logNum) {
                        $(elem)[isDynamic ? 'die' : 'unbind'](eventType, callee);
                    }

                });
            }

            if(_t.instance && typeof _t.instance.ready === 'function') {
                // baidu编辑器加载完成
                _t.instance.ready(function() {
                    _t.element = _t.instance.document.documentElement;

                    for(var eventType in events) {
                        logNum = events[eventType] || 0;

                        if('focus,blur'.indexOf(eventType) > -1) {// focus、blur事件用编辑器提供的方法绑定
                            bindEditorEvent(eventType, logNum, _t.element);
                        } else { // 其他事件用一般方法绑定
                            bindEvent(eventType, logNum, _t.element);
                        }

                    }

                });
            } else {
                tracker.bindEvents(logger);
            }

        },
        /**
         * @description 特殊类别的发布页编辑器类型的特殊配置
         * @alias editor.typeCateMap
         * @type {Object}
         */
        typeCateMap: {
            '1': { // 房产信息
                '8': 'baidueditor', // 租房
                '10': 'baidueditor', // 合租房
                '12': 'baidueditor' // 二手房
            },
            '4': { // 车辆买卖与服务
                '29': 'none', // 二手车
                '30': 'baidueditor', // 二手摩托车
                '240': 'baidueditor' // 自行车/电动车
            },
            '5': 'baidueditor', // 二手物品
            '832': { // 宠物
                '252': 'baidueditor' // 宠物狗
            },
            '8640': { // 旅游酒店
                '8645': 'none', // 国内游
                '8658': 'none' // 出境游
            },
            '9224': {
                '*': 'baidueditor', // 全职招聘
                '13889': 'none' // 招聘会
            },
            '13941': 'htmleditor'// 兼职招聘
        }
    };
    /**
     * @name Tracker
     * @class Tracker类定义，封装了记录日志的方法
     * @constructor
     */
    var Tracker = function () {
        var $form;
        /**
         * @alias Tracker.loggers
         * @description 元素日志配置对象集合
         * @type {object}
         */
        this.loggers = {};
        /**
         * @alias Tracker.pageInfo
         * @description 页面信息
         * @type {object}
         */
        this.pageInfo = {};
        /**
         * @alias Tracker.logSeq
         * @description 日志队列
         * @type {array}
         */
        this.logSeq = [];
        /**
         * @alias Tracker.logStr
         * @description 日志文本
         * @type {string}
         */
        this.logStr = '';
        /**
         * @alias Tracker.lists
         * @description 监听元素列表
         * @type {object}
         */
        this.lists = $.extend({}, defaults, window.__gsxw_conf);

        $form = $('#' + this.lists.form);
        /**
         * @alias Tracker.$form
         * @description 表单元素jQuery对象
         * @type {object}
         */
        this.$form = $form.size() > 0 ? $form : $('body');
        /**
         * @alias Tracker.submitBtns
         * @description 提交按钮jQuery对象
         * @type {object}
         */
        this.submitBtns = [];
        this.init();

    };
    /* Tracker方法定义 */
    Tracker.prototype = {
        /**
         * @description Tracker构造方法
         * @memberOf Tracker
         * @method constructor
         * @instance
         */
        constructor: Tracker,
        /**
         * @description 初始化方法
         * **初始化过程：**
         * + 初始化监听元素日志配置
         * + 绑定监听元素对象
         * + 为提交按钮绑定方法，追加隐藏输入域到表单
         * @memberOf Tracker
         * @instance
         */
        init: function () {
            var _t = this;
            _t.initLoggers();
            // 提交按钮mousedown事件绑定
            $.each(_t.submitBtns, function (idx, $btn) {
                $btn.bind('mousedown', function () {
                    var $t = $(this),
                        $hidden = $('[name=' + _t.lists.name + ']').size() === 0 ? $('<input type="hidden"/>') : $('[name=' + _t.lists.name + ']'),
                        lsLog = $('#xxzl_lsid').val() || '',
                        pageLog = _t.logPageInfo();

                    _t.logStr = _t.logSeq.join(';');
                    // 追加隐藏输入域到表单
                    $hidden.attr('name', _t.lists.name);
                    // $hidden.val(JSON.stringify(settings.logByTimeSeq ? _t.logSeq.concat([pageLog]) : _t.formatLogList()));
                    $hidden.val(_t.logStr + ';' + pageLog.toString() + ';' + lsLog);
                    $hidden.appendTo(_t.$form);
                });
            });
        },
        /**
         * @description 初始化监听元素日志配置方法
         * @memberOf Tracker
         * @instance
         */
        initLoggers: function () {
            var _t = this,
                lid = '',
                id = '',
                isDynamic = false;

            _t.initPageInfo(); // 初始化页面信息

            for(var attr in _t.lists) {

                if($.isArray(_t.lists[attr])) {

                    for(var idx = 0, len = _t.lists[attr].length; idx < len; idx ++) {
                        lid = _t.lists[attr][idx];
                        _t.getLogger(lid, attr); // 获取单个监听元素日志配置对象

                    }

                }

            }

        },
        /**
         * @description 初始化页面信息方法
         * @memberOf Tracker
         * @instance
         */
        initPageInfo: function () {
            var _t = this;
            // format: ["page",largeCate,smallCate,loadTime,submitTime,width,height,historyLength]
            _t.pageInfo.largeCate = largeCate || '-';
            _t.pageInfo.smallCate = smallCate || '-';
            _t.pageInfo.historyLength = window.history.length;
            _t.pageInfo.loadTime = +new Date();
            _t.pageInfo.width = $(document).width();
            _t.pageInfo.height = $(document).height();

        },
        /**
         * @description 记录页面信息日志方法
         * **记录页面的下列信息：**
         * + `largeCate`：一级类
         * + `smallCate`：二级类
         * + `loadTime`：加载时的时间戳
         * + `submitTime`：提交时的时间戳（提交时添加日志）
         * + `width`：页面宽度
         * + `height`：页面高度
         * + `historyLength`：浏览过的页面数
         * @memberOf Tracker
         * @instance
         * @return {string} 页面信息日志，遵循`page,largeCate,smallCate,width,height,loadTime,submitTime,historyLength`格式
         */
        logPageInfo: function () {
            var _t = this,
                pageLog = [];

            _t.pageInfo.submitTime = +new Date();
            pageLog.push('page');
            pageLog.push(_t.pageInfo.largeCate);
            pageLog.push(_t.pageInfo.smallCate);
            pageLog.push(_t.pageInfo.width);
            pageLog.push(_t.pageInfo.height);
            pageLog.push(_t.pageInfo.loadTime);
            pageLog.push(_t.pageInfo.submitTime);
            pageLog.push(_t.pageInfo.historyLength);

            return pageLog;
        },
        /**
         * @description 获取单个监听元素日志配置对象方法
         * @param  {string} lid  元素id（带有前缀^或?）
         * @param  {string} type 监听元素类型
         * @return {object}      监听元素日志配置对象
         * @memberOf Tracker
         * @instance
         */
        getLogger: function (lid, type) {
            var _t = this,
                $el, // 监听元素jQuery对象
                id,
                isDynamic,
                editorType = editor.getEditorType(largeCate, smallCate),
                logger = {};

            if(!elemIdReg.exec(lid)) return undefined;
            // 用正则表达式匹配出元素id、^和?
            id = elemIdReg.exec(lid)[4];
            isDynamic = !!elemIdReg.exec(lid)[3]; // 是否为动态元素

            if(!!elemIdReg.exec(lid)[2]) _t.submitBtns.push($('#' + id)); // 设置提交按钮

            if(type !== 'editor') {

                $el = $('#' + id);

                if(!isDynamic && $el.size() === 0) return undefined;

            }
            // 日志对象属性赋值
            logger.type = type;
            logger.id = id;
            logger.isDynamic = isDynamic;

            _t.loggers[id] = logger; // 添加到集合中
            // 绑定事件
            if(type === 'editor') {
                editor.bindEditorEvents(logger, _t);
            } else {
                _t.bindEvents(logger);
            }

            return logger;
        },
        /**
         * @description 绑定事件方法
         * @param  {object} logger 监听元素日志配置对象
         * @memberOf Tracker
         * @instance
         */
        bindEvents: function (logger) {
            var _t = this,
                $el = null,
                events = eventConfig[logger.type],
                isDynamic = logger.isDynamic, // 是否为动态DOM元素
                callback = _t.loggerHandler, // 回调方法
            // 绑定单个事件方法
                bindEvent = function (eventType, logNum) {
                    var count = 0;
                    $el[isDynamic ? 'live' : 'bind'](eventType, function (event) {
                        var callee = arguments.callee;
                        callback.call(this, event, logger, logNum, _t);

                        if(++count === logNum) {
                            $el[isDynamic ? 'die' : 'unbind'](eventType, callee);
                        }

                    });
                };

            if(logger.type === 'editor') {
                //$el = $('#' + editor.id + ' .editor');
                $el = $("#editor");
                if($el.size() === 0) $el = $('#' + logger.id);

            } else {
                $el = $('#' + logger.id);
            }

            for(var eventType in events) {
                logNum = events[eventType] || 0;
                bindEvent(eventType, logNum);
            }

        },
        /**
         * @description 格式化日志方法
         * 记录用户行为数据方法 记录页面的下列信息
         * + `id`：元素id
         * + `type`：元素类型
         * + `eventType`：事件类型
         * + `timeStamp`：时间戳
         * + `pasteLength`：粘贴长度
         * + `pageX`：页面X坐标
         * + `pageY`：页面Y坐标
         * + `offsetX`：相对于元素的X坐标
         * + `offsetY`：相对于元素的Y坐标
         * + `width`：元素宽度
         * + `height`：元素高度
         * + `left`：元素在页面上的X坐标
         * + `top`：元素在页面上的Y坐标
         * @param  {array} log 单条日志数组
         * @return {string}     日志：遵循`id,type,eventType,timeStamp,pasteLength,pageX,pageY,offsetX,offsetY,width,heigth,left,top`格式
         * @memberOf Tracker
         * @instance
         */
        formatLog: function (log) {
            var logItem = [];
            logItem.push(log.id);
            logItem.push(log.type);
            logItem.push(log.eventType);
            logItem.push(log.timeStamp);
            logItem.push(formatNumber(log.pasteLength));
            logItem.push(formatNumber(log.pageX));
            logItem.push(formatNumber(log.pageY));
            logItem.push(formatNumber(log.offsetX));
            logItem.push(formatNumber(log.offsetY));
            logItem.push(formatNumber(log.width));
            logItem.push(formatNumber(log.height));
            logItem.push(formatNumber(log.left));
            logItem.push(formatNumber(log.top));
            return logItem;
        },
        /**
         * @description 监听事件回调方法
         * @param  {object} event  事件对象
         * @param  {object} logger 监听元素日志配置对象
         * @param  {number} logNum 日志数目
         * @param  {object} _t     Tracker实例对象
         * @memberOf Tracker
         * @instance
         */
        loggerHandler: function (event, logger, logNum, _t) {
            var log = {},
                lastIndex = -1,
                eventSeq = [],
                $t = $(this),
                lengthBeforePaste,
                lengthAfterPaste,
                $el;

            log.id = logger.id;
            log.type = logger.type;

            log.timeStamp = event.timeStamp;
            log.eventType = event.type;
            log.width = $t[0].offsetWidth;
            log.height = $t[0].offsetHeight;
            // 获取编辑器jQuery元素
            try {
                $el = (logger.type === 'editor' ? (editor.type === 'baidueditor' ? $(editor.instance.iframe) : $('#' + editor.id)) : $t);

                if($el.size() === 0) $el = $t;

            } catch (e) {
                $el = $('#' + editor.id);
            }

            log.top = $el.offset()['top'];
            log.left = $el.offset()['left'];

            if(typeof event.pageX !== 'undefined') {

                if(editor.type === 'baidueditor') {

                    log.pageX = event.pageX + log.left;
                    log.pageY = event.pageY + log.top;
                    log.offsetX = event.pageX;
                    log.offsetY = event.pageY;

                } else {

                    log.pageX = event.pageX;
                    log.pageY = event.pageY;
                    log.offsetX = event.pageX - log.left;
                    log.offsetY = event.pageY - log.top;

                }
            }

            if(event.type === 'paste') {
                lengthBeforePaste = logger.type === 'editor' ? (editor.type === 'baidueditor' ? $t.find('body').text().length : $t.val().length) : $t.val().length;
                _inPaste = true;
                pasteDone = function (lengthAfterPaste) {
                    _inPaste = false;
                    log.pasteLength = lengthAfterPaste - lengthBeforePaste;

                    if(log.pasteLength === 0) return false;

                    if(_t.logSeq.length < settings.limit) {
                        _t.logSeq.push(_t.formatLog(log));
                    } else {
                        return false;
                    }

                };
                return false;
            }

            if(event.type === 'input') {

                if(_inPaste === true) {
                    lengthAfterPaste = logger.type === 'editor' ? (editor.type === 'baidueditor' ? $t.find('body').text().length : $t.val().length) : $t.val().length;
                    pasteDone(lengthAfterPaste);
                } else {
                    event.preventDefault();
                }

            }

            if(logNum === 0) {
                return false;
            }

            if(logNum === -1) {

                try {
                    eventSeq = arrayMap(_t.logSeq, function (item) {
                        return item[0] + '|' + item[1] + '|' + item[2];
                    });

                    lastIndex = arrayIndexOf(eventSeq, logger.id + '|' + logger.type + '|' + event.type);

                    if(lastIndex > -1) {
                        _t.logSeq.splice(lastIndex, 1);
                    }

                } catch (error) {}

            }

            if(_t.logSeq.length < settings.limit) {
                _t.logSeq.push(_t.formatLog(log));
            } else {
                return false;
            }

        }
    };
    return Tracker;
    // 实例化tracker对象
    //var tracker = new Tracker();
});
/**
 * Created by zhangjiajia04 on 2016/3/21.
 */
define('category/ershouche/ershouche_format',['Controller/Controller',
    'component/inputText/js/inputText',
    'component/selector/js/selector',
    'component/imgBox/js/imgBox',
    'component/imgUpload/js/imgUpload',
    'component/ershouche_pic/js/ershouche_pic',
    'component/radio/js/radio',
    'component/checkbox/js/checkbox',
    'util/util',
    "component/tracker/js/tracker",
    'component/validate/js/validate'
], function(Controller, inputText, selector, ImgBox, ImgsBar, ershouche_pic, radio, checkbox, util, tracker, Validate) {
    var ershouche_format = function() {};
    /*dataSrc数据初始化 begin*/
    function getyear(myYesr, count, last) {
        var arr = [];
        myYesr = myYesr + count - 1;
        /*年检到期 当前年份+6*/
        for (var i = 0; i < count; i++) {
            var values = {};
            values.val = myYesr - i;
            values.text = myYesr - i;
            arr.push(values);

        }
        var lastVal = {}
        lastVal.val = last;
        lastVal.text = last;
        arr.push(lastVal);
        return arr;
    }
    /*上牌时间特殊处理 去掉“年”*/
    $.each(datasrc.buytime.values, function(index, obj) {
        if (obj.val == "1994") {
            obj.text = "1995年以前";
        } else {
            obj.text = obj.val;
        }
    });
    var yuefen = datasrc.shangpaiyuefen;
    yuefen.name = "cjshijian_m";
    datasrc.cjshijian_m = yuefen;
    yuefen.name = "qxshijian_m";
    datasrc.qxshijian_m = yuefen;
    yuefen.name = "syshijian_m";
    datasrc.syshijian_m = yuefen;
    var myDate = new Date();
    myYesr = myDate.getFullYear();
    var yearValues = {
        "id": 0,
        "name": "",
        "text": "",
        "values": [{
            "val": "2017",
            "text": "2017"
        }]
    }
    yearValues.name = "cjshijian_y";
    yearValues.text = "年检年份";
    yearValues.values = getyear(myYesr, 7, "未检");
    datasrc.cjshijian_y = yearValues;
    var yearValues2 = {
        "id": 0,
        "name": "",
        "text": "",
        "values": [{
            "val": "2017",
            "text": "2017"
        }]
    }
    yearValues2.name = "qxshijian_y";
    yearValues2.text = "交强险年份";
    yearValues2.values = getyear(myYesr, 2, "过保");
    datasrc.qxshijian_y = yearValues2;
    var yearValues3 = {
        "id": 0,
        "name": "",
        "text": "",
        "values": [{
            "val": "2017",
            "text": "2017"
        }]
    }
    yearValues3.name = "syshijian_y";
    yearValues3.text = "商业险年份";
    yearValues3.values = getyear(myYesr, 2, "无商业险");
    datasrc.syshijian_y = yearValues3;

    datasrc.cheshenyanse = {
            id: 4917,
            name: "cheshenyanse",
            text: "车身颜色",
            values: [{
                    val: '1',
                    bgcolor: 'black',
                    text: '黑'
                },
                {
                    val: '2',
                    bgcolor: 'white',
                    text: '白'
                }, {
                    val: 3,
                    bgcolor: '#E6E6E6',
                    text: '银'
                }, {
                    val: 4,
                    bgcolor: '#D6D6D6',
                    text: '灰'
                }, {
                    val: 6,
                    bgcolor: 'red',
                    text: '红'
                }, {
                    val: 7,
                    bgcolor: '#3399FF',
                    text: '蓝'
                },
                {
                    val: 9,
                    bgcolor: '#FFFF00',
                    text: '黄'
                },
                {
                    val: 11,
                    bgcolor: '#996600',
                    text: '棕'
                }, {
                    val: 8,
                    bgcolor: '#0DCF6E',
                    text: '绿'
                }, {
                    val: 10,
                    bgcolor: '#FF6600',
                    text: '橙'
                }, {
                    val: 12,
                    bgcolor: '#CC3399',
                    text: '紫'
                }, {
                    val: 748788,
                    bgcolor: '#F3EEAA',
                    text: '香槟'
                }, {
                    val: 13,
                    bgcolor: '#FFCC00',
                    text: '金'
                }, {
                    val: 748787,
                    bgcolor: '#FFC0CB',
                    text: '粉红'
                }, {
                    val: 14,
                    bgcolor: '#ffffff',
                    text: '其他'
                }
            ]
        }
        /*begin热门品牌以及各个车型*/
    var remen = [{ "text": "大众", "valId": "307097", "val": "411611", "pid": "408786" },
        { "text": "本田", "valId": "303367", "val": "410387", "pid": "408784" },
        { "text": "丰田", "valId": "310106", "val": "412596", "pid": "408788" },
        { "text": "宝马", "valId": "300004", "val": "409261", "pid": "408784" },
        { "text": "日产", "valId": "323264", "val": "416805", "pid": "408800" },
        { "text": "奥迪", "valId": "298816", "val": "408844", "pid": "408783" },
        { "text": "奔驰", "valId": "301634", "val": "409819", "pid": "408784" },
        { "text": "别克", "valId": "304504", "val": "410767", "pid": "408784" },
        { "text": "奇瑞", "valId": "321133", "val": "416172", "pid": "408799" },
        { "text": "马自达", "valId": "320395", "val": "415955", "pid": "408795" },
        { "text": "现代", "valId": "328611", "val": "418514", "pid": "408806" },
        { "text": "福特", "valId": "312315", "val": "413316", "pid": "408788" },
        { "text": "雪佛兰", "valId": "330797", "val": "419174", "pid": "408806" },
        { "text": "雪铁龙", "valId": "329500", "val": "418789", "pid": "408806" },
        { "text": "标致", "valId": "302666", "val": "410181", "pid": "408784" },
        { "text": "三菱", "valId": "325140", "val": "417330", "pid": "408801" },
        { "text": "长城", "valId": "305942", "val": "411135", "pid": "408785" },
        { "text": "江淮", "valId": "335538", "val": "414297", "pid": "408792" },
        { "text": "铃木", "valId": "318274", "val": "415266", "pid": "408794" },
        { "text": "起亚", "valId": "322378", "val": "416526", "pid": "408799" },
        { "text": "东风", "valId": "691086", "val": "412398", "pid": "408786" },
        { "text": "福田", "valId": "335537", "val": "413201", "pid": "408788" },
        { "text": "长安", "valId": "335500", "val": "420648", "pid": "408785" },
        { "text": "比亚迪", "valId": "303987", "val": "410595", "pid": "408784" },
        { "text": "吉利", "valId": "316426", "val": "414662", "pid": "408792" },
        { "text": "一汽", "valId": "335505", "val": "419006", "pid": "408807" },
        { "text": "金杯", "valId": "335503", "val": "414548", "pid": "408792" },
        { "text": "东南", "valId": "309668", "val": "412455", "pid": "408786" },
        { "text": "海马", "valId": "314262", "val": "413937", "pid": "408790" }
    ];
    var remenData = {
        name: "zimu",
        text: "热门",
        values: remen
    };
    datasrc.pinpai.values.unshift(remenData);
    /*end热门品牌以及各个车型*/
    datasrc.sfdaikuan = { "id": 4588, "name": "sfdaikuan", "text": "是否贷款", "values": [{ "text": "是", "val": "1" }, { "text": "否", "val": "0" }] };
    datasrc.zhihuan = { "id": 12142, "name": "zhihuan", "text": "是否置换", "values": [{ "text": "是", "val": "1" }, { "text": "否", "val": "0" }] };
    /*dataSrc数据初始化 end*/
    $(function() {
        $(window.document).bind("pageOnload", window.pageOnloadAction);
    })


    window.pageOnloadAction = function() {

            /*业务逻辑初始化区域*/
            var cateID = ____json4fe.catentry[1].dispid;
            var localID = ____json4fe.locallist.dispid;
            var instance = "";
            if (cateID && cateID != "") {
                instance = Controller.records.get("cateapplyed");
                instance.setValue(cateID);
            }
            if (localID && localID != "") {
                instance = Controller.records.get("localapplyed");
                instance.setValue(localID);
            }

            /*个人/商家初始化----start----*/
            if (iqasData && iqasData.isBiz) {
                var isBiz = Controller.records.get("isBiz");
                var bizVal = iqasData.isBiz;
                isBiz.setValue(bizVal);
                if (bizVal == 1) { //若为商家，disable选择栏
                    isBiz.disabled();
                }
            }
            /*个人/商家初始化----end----*/
            /*实例化行为监控*/
            var track = new tracker();
            var type = Controller.records.get("type");
            if (type) {
                type.setValue(0);
            }
            var hidPostParam = Controller.records.get("hidPostParam");
            if (hidPostParam) {
                hidPostParam.setValue(0); //传0即可，区别发帖机的
            }
            if (fcookie && fcookie != "") {
                var fcookieInstance = Controller.records.get("fcookie");
                fcookieInstance.setValue(fcookie);
            }
            /*页面显示相关begin*/

            var Instance = Controller.records.get("shangpaiyuefenxam");
            Instance.hide();
            var Instance = Controller.records.get("cjshijian_m");
            Instance.hide();
            var Instance = Controller.records.get("cjshijian_mxam");
            Instance.hide();
            var Instance = Controller.records.get("qxshijian_mxam");
            Instance.hide();
            var Instance = Controller.records.get("qxshijian_m");
            Instance.hide();
            var Instance = Controller.records.get("syshijian_m");
            Instance.hide();
            var Instance = Controller.records.get("syshijian_mxam");
            Instance.hide();
            // 填充update数据
            if (typeof infoDetail !== 'undefined') {
                Controller.setFormData(infoDetail, 1);
            }
            if (typeof infoDetail == 'undefined' || (typeof infoDetail !== 'undefined' && util.isNullObject(infoDetail))) {
                var Instance = Controller.records.get("shangpaiyuefen");
                Instance.hide();
                //            var bianhaoInstance = Controller.records.get("xinxibianhao");
                //            bianhaoInstance.setValue("8U5F26");//车型编号存储时判断是否有值，如果没有就新建编号(即发布)否则就沿用原有值(修改状态)
                //车型编号(当年月、日、时、分、秒的34进制)
                var shifouyishou = Controller.records.get("shifouyishou"); /*发布默认为0*/
                shifouyishou.setValue(0);
                var shifoufufeifabu = Controller.records.get("shifoufufeifabu"); /*发布默认为0*/
                shifoufufeifabu.setValue(0);
                /*回填‘年检到期’、‘交强险到期’、‘商业险到期’*/
                // var date = new Date();
                // var myYesr = date.getFullYear();
                // myYesr = myYesr + 1;
                // var myMonth = date.getMonth();
                // myMonth = parseInt(myMonth);
                // ['cjshijian','qxshijian','syshijian'].forEach(function(el, index){
                //     var instaName_mal = datasrc[el+"_m"].values[myMonth].val;
                //     var instaName_y = el+"_y";
                //     var instaName_m = el+"_m";
                //     Controller.records.get(instaName_y).setValue(myYesr);
                //     Controller.records.get(instaName_m).setValue(instaName_mal);
                // }
                // });

            } else {
                /*编辑页回填相关*/
                var date = new Date();
                var myYesr = date.getFullYear();
                myYesr = myYesr + 1;
                var myMonth = date.getMonth();
                myMonth = parseInt(myMonth);
                window.cjshijian = infoDetail.cjshijian;
                window.qxshijian = infoDetail.qxshijian;
                window.syshijian = infoDetail.syshijian;
                ['cjshijian', 'qxshijian', 'syshijian'].forEach(function(el, index) {
                    var defaultData = window[el];
                    var instaName_y = el + "_y";
                    var instaName_m = el + "_m";
                    if (defaultData && defaultData != "") {
                        var yAndm = defaultData.split("|");
                        if (yAndm.length > 0) {
                            Controller.records.get(instaName_y).setValue(yAndm[0]);
                            if (yAndm[1]) {
                                Controller.records.get(instaName_m).setValue(515680 + parseInt(yAndm[1]));
                            }
                        }
                    }
                    // else{
                    //     var instaName_mal = datasrc[el+"_m"].values[myMonth].val;
                    //     Controller.records.get(instaName_y).setValue(myYesr);
                    //     Controller.records.get(instaName_m).setValue(instaName_mal);
                    // }
                });

                var vinInstance = Controller.records.get("vin");
                /*编辑页vin如果有值 则不能被修改*/
                if (infoDetail.vin && infoDetail.vin != "") {
                    vinInstance.elem.attr('readonly', true);
                    vinInstance.disabled();
                    var __len = vinInstance.value.length;
                    var __inner = "(" + __len + "/17)";
                    $("#chejiatongji").html(__inner);
                }
                util.$beforeAfter($(".pic .upload_wrap1")[0]);

                /*回填分期*/
                var installmentValue = infoDetail.installment;
                if (installmentValue && installmentValue != "") {
                    var insta = Controller.records.get("installmentbak");
                    if (installmentValue == "678611") {
                        insta.setValue(1);
                    }
                }

                /*回填过户费用*/
                var guohufeiyongValue = infoDetail.guohufeiyong;
                if (guohufeiyongValue && guohufeiyongValue != "") {
                    var guohufeiyongbak = Controller.records.get("guohufeiyongbak");
                    if (guohufeiyongValue == "553663") {
                        guohufeiyongbak.setValue(1);
                    }
                }
                /*回填个人商家*/
                if (infoDetail.isBiz && infoDetail.isBiz != "") {
                    var isbiz = Controller.records.get("isBiz");
                    isbiz.setValue(infoDetail.isBiz);
                }
                //编辑页 品牌不可编辑
                if (businessData.canBrandEdit == false) {
                    Controller.records.get("pinpai").disabled()
                }
            }
            /*二手车普通发布页客车导航begin*/
            var kecheTemplate = $('<dl class="item keche " zm="keche " style="display: none;height: 30px;background: #FFFBE0;border: 1px solid #f5e493;color: gray;font: 12px/30px "宋体";padding-left: 12px;"><div class="car_update_tip">客车发布升级了，请选择“客车 转让”发布，或 <a onClick="clickLog(\'from=esc_post_kechec\');"  target="_blank" href="//post.58.com/' + ____json4fe.locallist.dispid + '/71952/s5?from=esc_fabu_kechec">点击这里</a>！</div></dl>');
            var kecheTitle = $('<li></li>').append($('<a data-val="keche"  class="kechezimu">客车</a>'));
            $(".carBrandSearch_title ul").append(kecheTitle);
            // $(".carBrand_wrap .carBrand_container").append(kecheTemplate);
            /*二手车普通发布页客车导航end*/
            /*二手车普通发布页工程车导航begin*/
            var gongchengcheTemplate = $('<dl class="item gongchengche" zm="gongchengche" style="display: none;height: 30px;background: #FFFBE0;border: 1px solid #f5e493;color: gray;font: 12px/30px "宋体";padding-left: 12px;"><div class="car_update_tip">工程车发布升级了，请选择“工程车转让”发布，或 <a onClick="clickLog(\'from=esc_post_gongchengc\');"  target="_blank" href="//post.58.com/' + ____json4fe.locallist.dispid + '/70185/s5?from=esc_fabu_gongchengc">点击这里</a>！</div></dl>');
            var gongchengcheTitle = $('<li><a data-val="gcc"   class="gcczimu">工程车</a></li>');
            $(".carBrandSearch_title ul").append(gongchengcheTitle);
            // $(".carBrand_wrap .carBrand_container").append(gongchengcheTemplate);
            /*二手车普通发布页工程车导航end*/
            /*二手车普通发布页货车导航begin*/
            var huocheTemplate = $('<dl class="item huoche" zm="huoche" style="display: none;height: 30px;background: #FFFBE0;border: 1px solid #f5e493;color: gray;font: 12px/30px "宋体";padding-left: 12px;"><div class="car_update_tip">货车发布升级了，请选择“货车转让”发布，或 <a target="_blank" onClick="clickLog(\'from=esc_post_huochec\');"   href="//post.58.com/' + ____json4fe.locallist.dispid + '/71951/s5?from=esc_fabu_huochec">点击这里</a>！</div></dl>');
            var huocheTitle = $('<li><a data-val="huoche" class="huochezimu">货车</a></li>');
            $(".carBrandSearch_title ul").append(huocheTitle);
            // $(".carBrand_wrap .carBrand_container").append(huocheTemplate);
            /*二手车普通发布页货车导航end*/


            $("#chejiahao_img").hover(
                function() {
                    $("#showchejiahao").show();
                },
                function() {
                    $("#showchejiahao").hide();
                });

            $("div[name='goblianxiren']").prev().css('left', '390px')
                /*页面显示相关end*/

            //补充说明改版，将VIP页的模块删掉
            $(".module-options").remove();
            /*二手车发布页-看车地址-区域-商圈-提示信息规则--发布回填地址--start*/
            ershouche_format.prototype.caraddressAreaFun();
            /*二手车发布页-看车地址-区域-商圈-提示信息规则--发布回填地址--end*/
            /*--估车架结果页参数带入发布页-品牌-车系-车型-上牌时间-里程---start*/
            /*调用估车价信息*/
            inputText.prototype.callguchejia();
            ershouche_format.prototype.gcjBackfill();
            /*--估车架结果页参数带入发布页-品牌-车系-车型-上牌时间-里程---end*/
        }
        /*发布页看成地址逻辑*/
    ershouche_format.prototype.caraddressAreaFun = function() {
            var caraddress = Controller.records.get('caraddress');
            if (isadd) { //新增页默认回填
                var url = '//post.58.com/ajax?action=getlastcaraddress&cateid=' + businessData.cateid + '&localid=' + businessData.localid + '&source=car';
                $.ajax({
                    url: url,
                    type: 'get',
                    dataType: 'json',
                    success: function(data) {
                        if (data && data.code == 0) {
                            var data = data.data;
                            caraddress.setValue(data.caraddress);
                        }
                    },
                    error: function(err) {
                        //console.log(err);
                    }
                });
            }
        }
        /*估车价结果页回填*/
    ershouche_format.prototype.gcjBackfill = function() {
        var search = window.location.search.substr(1);
        if (search.indexOf('from=gcjlist') >= 0) {
            var gcjParam = {},
                tempParam = {};
            search = search.split('&');
            $.each(search, function(index, item) {
                var itemL = item.split('=');
                tempParam[itemL[0]] = itemL[1];
            });
            gcjParam['rundistance'] = tempParam['mileage'];
            //改为infoDetail
            Controller.setFormData(gcjParam, 1);
        }
    }

    function auto_chelingqj(buytime) { //自动匹配区间
        var index = 0; // 索引
        var val = "";
        if (buytime) {
            var _buytime = parseInt(buytime);
            var d = Controller.records.get('chelingqj');
            $(d.data.values).each(function(i, e) {
                var arr = e.val.split('_');
                if (arr.length == 2) {
                    var a = parseInt(arr[0]);
                    var b = parseInt(arr[1]);
                    if (_buytime >= a && _buytime <= b) {
                        index = i + 1;
                        d.setValue(e.val);
                        return false;
                    }
                }
            });

        }
        return index;
    }
    inputText.prototype.validate_success_position = function() {
        var _self = this;
        var prev = this.container.prev();
        if (prev.hasClass('validate_success')) {
            prev.css('left', '390px');
        }
    }
    inputText.prototype.joinShangpainianyue = function() { //设置上牌年月自动计算车龄区间
        var shangpainainfen = Controller.records.get("buytime");
        var shangpaiyuefen = Controller.records.get("shangpaiyuefen");
        var shangpaiyuefenxam = Controller.records.get("shangpaiyuefenxam");
        var shangpainianyue = Controller.records.get("shangpainianyue");
        var year = shangpainainfen.getValue();
        var yearText = shangpainainfen.getText();
        if (year == "1994" && yearText == "1995年以前") {
            shangpainainfen.hideTips();
            shangpaiyuefen.hide();
            shangpaiyuefen.opts.canNull = true;
            shangpaiyuefenxam.hide();
        } else {
            shangpaiyuefen.opts.canNull = false;
        }
        var month = shangpaiyuefen.text || '';
        var ym = "";
        var patrn = /^\d$/;
        if (patrn.exec(month)) { //小于10
            month = 0 + String(month);
        }
        shangpainianyue.setValue(year + month); //设置上牌年月
        auto_chelingqj(shangpainainfen.getValue()); //自动设置车龄区间
        /*如果年份选择当年则月份不能选择超过当前月份 begin*/
        var date = new Date();
        var myYesr = date.getFullYear();
        var myMonth = date.getMonth() + 1;
        if (myYesr != year) {
            myMonth = 12;
        }
        var monthValues = {
            "id": 0,
            "name": "shangpaiyuefen",
            "text": "上牌月份",
            "values": [{
                "val": "5156801",
                "text": "1月"
            }]
        }
        var optionCur = [];
        for (var i = 1; i <= myMonth; i++) {
            var optvalue = {};
            optvalue.text = i;
            optvalue.val = 515680 + i;
            optionCur.push(optvalue);
        }
        monthValues.values = optionCur;
        datasrc.shangpaiyuefen = monthValues;
        var oldValue = shangpaiyuefen.getValue();
        shangpaiyuefen.resetOption(monthValues); /*重新渲染上牌月份下拉框*/
        //shangpaiyuefen.setValue(oldValue);
        //window.setTimeout(function() { shangpaiyuefen.doCheck(); }, 300)
        /*如果年份选择当年则月份不能选择超过当前月份 end*/
        //调用估车价信息
        inputText.prototype.callguchejia();

    }
    inputText.prototype.setCjshijian = function() { //设置车检时间
        var yInstance = Controller.records.get("cjshijian_y");
        var mInstance = Controller.records.get("cjshijian_m");
        var cjshijian_mxam = Controller.records.get("cjshijian_mxam");
        var cjshijian_y = yInstance.getValue();
        var cjshijian = "";
        if (cjshijian_y == "未检" || cjshijian_y == "") {
            mInstance.hide();
            mInstance.shouldCheck = false; //实例是冻结的 但也要校验
            mInstance.opts.canNull = true;
            mInstance.setValue("");
            cjshijian_mxam.hide();
        } else {
            mInstance.show();
            mInstance.shouldCheck = true; //实例是冻结的 但也要校验
            mInstance.opts.canNull = false;
            cjshijian_mxam.show();
        }
        var cjshijian_m = mInstance.getText();
        if (cjshijian_m == "" || !cjshijian_m || cjshijian_m == "请选择到期月份") {
            cjshijian = cjshijian_y;
        } else {
            cjshijian = cjshijian_y + "|" + cjshijian_m;
        }
        Controller.records.get("cjshijian").setValue(cjshijian);
    }
    inputText.prototype.setQxshijian = function() { //设置强险时间
        var yInstance = Controller.records.get("qxshijian_y");
        var mInstance = Controller.records.get("qxshijian_m");
        var qxshijian_y = yInstance.getValue();
        var qxshijian = "";
        if (qxshijian_y == "过保" || qxshijian_y == "") {
            mInstance.hide();
            mInstance.shouldCheck = false; //实例是冻结的 但也要校验
            mInstance.opts.canNull = true;
            mInstance.setValue("");
            Controller.records.get("qxshijian_mxam").hide();
        } else {
            mInstance.show();
            mInstance.shouldCheck = true; //实例是冻结的 但也要校验
            mInstance.opts.canNull = false;
            Controller.records.get("qxshijian_mxam").show();
        }
        var qxshijian_m = mInstance.getText();
        if (qxshijian_m == "" || !qxshijian_m || qxshijian_m == "请选择到期月份") {
            qxshijian = qxshijian_y;
        } else {
            qxshijian = qxshijian_y + "|" + qxshijian_m;
        }
        Controller.records.get("qxshijian").setValue(qxshijian);
    }
    inputText.prototype.setSyshijian = function() { //设置商业保险时间
            var yInstance = Controller.records.get("syshijian_y");
            var mInstance = Controller.records.get("syshijian_m");
            var syshijian_y = yInstance.getValue();
            var syshijian = "";
            if (syshijian_y == "无商业险" || syshijian_y == "") {
                mInstance.hide();
                mInstance.shouldCheck = false; //实例是冻结的 但也要校验
                mInstance.opts.canNull = true;
                mInstance.setValue("");
                Controller.records.get("syshijian_mxam").hide();
            } else {
                mInstance.show();
                mInstance.shouldCheck = true; //实例是冻结的 但也要校验
                mInstance.opts.canNull = false;
                Controller.records.get("syshijian_mxam").show();
            }
            var syshijian_m = mInstance.getText();
            if (syshijian_m == "" || !syshijian_m || syshijian_m == "请选择到期月份") {
                syshijian = syshijian_y;
            } else {
                syshijian = syshijian_y + "|" + syshijian_m;
            }
            Controller.records.get("syshijian").setValue(syshijian);
        }
        /**
         *如果年检到期、交强险到期、商业险到期都是必填并且年份选择了当前年份，
         *重置月份为当前月及当前以后
         */
    selector.prototype.setDaoQiYueFen = function(obj) {
        var _self = this;
        var myDate = new Date();
        var myYesr = myDate.getFullYear();
        var myMonth = myDate.getMonth();
        var objInstence = Controller.records.get(obj);
        var targetName = _self.dataName;

        var optionCur = [];
        for (var i = 12; i > myMonth; i--) {
            var optvalue = {};
            optvalue.text = i;
            optvalue.val = 515680 + i;
            optionCur.push(optvalue);
        }
        var oldValues = []
        for (var i = 1; i <= 12; i++) {
            var optvalue = {};
            optvalue.text = i;
            optvalue.val = 515680 + i;
            oldValues.push(optvalue);
        }
        if (objInstence.getValue() == myYesr) {
            datasrc[targetName].values = optionCur.reverse();
            /*重新渲染月份下拉框*/
            _self.resetOption(datasrc[targetName]);
        } else {
            datasrc[targetName].values = oldValues;
            /*重新渲染月份下拉框*/
            _self.resetOption(datasrc[targetName]);
        }
    }
    inputText.prototype.autoSetTitle = function() {

    }
    selector.prototype.cjshijianHide_m = function() { //通过年检时间判断是否显示月份

    }
    selector.prototype.qxshijianHide_m = function() { //通过强险时间判断是否显示月份

    }
    selector.prototype.syshijianHide_m = function() { //通过商业保险判断是否显示月份

    }
    selector.prototype.autoSetRundistanceqj = function() { //自动选择行驶里程区间
        var val = "";
        var instance = Controller.records.get('rundistance');
        var Rundistance = instance.getValue();
        if (Rundistance) {
            Rundistance = parseFloat(Rundistance);
            if (Rundistance == 0) Rundistance = "";
            instance.setValue(Rundistance);
            instance.doCheck();
            var req = new RegExp("^(([1-9]{1}(\\d{0,2}\\.\\d{1,2}|\\d{0,2}))|([1-9]{1})|0\\.0[1-9]|0\\.[1-9]\\d?)$");
            if (!req.test(Rundistance)) { /*如果字符串非法 重置*/
                instance.setValue("");
                return;
            }
            var d = Controller.records.get('rundistanceqj');
            $(d.data.values).each(function(i, e) {
                var arr = e.val.split('_');
                if (arr.length == 2) {
                    var a = parseInt(arr[0]);
                    var b = parseInt(arr[1]);
                    if (Rundistance >= a && Rundistance <= b) {
                        d.setValue(e.val);
                        return false;
                    }
                }
            });

        }
    }
    selector.prototype.autoSetMinPriceqj = function() { //自动选择行驶里程区间
            var val = "";
            var minpriceInstance = Controller.records.get('MinPrice');
            var Rundistance = minpriceInstance.getValue();
            if (Rundistance) {
                Rundistance = parseFloat(Rundistance);
                minpriceInstance.setValue(Rundistance);
                minpriceInstance.doCheck();
                var req = new RegExp("^(([1-9]{1}(\\d{0,3}\\.\\d{1,2}|\\d{0,3}))|([1-9]{1})|0\\.0[1-9]|0\\.[1-9]\\d?)$");
                if (!req.test(Rundistance)) { /*如果字符串非法 重置*/
                    minpriceInstance.setValue("");
                    return;
                }
                var d = Controller.records.get('MinPriceqj');
                $(d.data.values).each(function(i, e) {
                    var arr = e.val.split('_');
                    if (arr.length == 2) {
                        var a = p
                        arseInt(arr[0]);
                        var b = parseInt(arr[1]);
                        if (Rundistance >= a && Rundistance <= b) {
                            d.setValue(e.val);
                            return false;
                        }
                    }
                });

            }
    }
    
    Controller.getFormData = function() { //重写getFormData 在提交是拼接数据使用
        var data = {};
        for (var i = 0; i < this.records.list.length; i++) {
            var obj = this.records.list[i];
            // 忽略isFreeze为true的组件
            if (obj.opts && !obj.opts.isFreeze && obj.opts.type != 'rearLogin') {
                var objVal = obj.getValue();
                // 如果获取到的value为object，则进行合并
                // 只有小区的是特殊的
                if (typeof objVal === 'object') {
                    $.extend(data, objVal)
                } else {
                    data[obj.dataName] = objVal;
                }
                // data[obj.opts.name] = obj.getValue();
            }
        }
        // console.log('Controller.getFormData');
        // console.log(data);

        data.userid = userid;
        data.postparam_userid = userid; //针对代客操作的userid dobulecheck
        data.hidPostParam = 0; //区别发帖机，固定传0

        // 单独为校验码写入
        // @todo 把隐藏域拿出来加入配置
        data.captcha_type = $('#captcha_type_iqas').val() || '';
        data.captcha_input = $('#captcha_input').val() || '';
        // iqas校验用，防灌水
        if (typeof iqas_mcvalue !== 'undefined' && typeof iqas_mcformula !== 'undefined') {
            data.iqas_mcresult = eval(iqas_mcformula.replace('checkValue', iqas_mcvalue));
        }
        var yzminstance = Controller.records.get("yzm");
        if (yzminstance && yzminstance.captchaConfigs && yzminstance.captchaConfigs.post_captcha_biz) {
            data.post_captcha_biz = yzminstance.captchaConfigs.post_captcha_biz;
            data.captcha_type = yzminstance.captchaConfigs.type;
            data.captcha_input = yzminstance.getValue();
            data.captcha_responseid = Controller.limit.responseid;
            data.captcha_encryptedKey = yzminstance.captchaConfigs.type == 400 ? yzminstance.captchaConfigs.msg_encryptedKey : yzminstance.captchaConfigs.voice_encryptedKey
        }
        // 统计用
        data.GTID = window.GTID || '';
        /*二手车发布业务逻辑区域begin*/
        data.erscpinpai = Controller.records.get("brand").getText() + Controller.records.get("chexi").getText()

        // 拼接数据项和text，供详情页展示用
        data.gobquzhi = util.getTextAndValue(["brand", "chexi", "carchexing", "kucheid", "shangshishijian", "erscpinpai", "rundistanceqj", "chelingqj", "buytime", "shangpaiyuefen", "buyfrom", "baoyang", "shiguqk", "chengse", "neishi", "neishiquexian", "syxian", "shouxu", "cheshenyanse", "rundistance", "MinPrice", "MinPriceqj"]);
        data.__post_gsxw = $('[name=__post_gsxw]').val(); //行为分析
        data.gobalsokey = util.getgobalsokey(["brand", "chexi", "carchexing", "kucheid", "shangshishijian", "erscpinpai", "rundistanceqj", "chelingqj", "buytime", "shangpaiyuefen", "buyfrom", "baoyang", "shiguqk", "chengse", "neishi", "neishiquexian", "syxian", "shouxu", "cheshenyanse", "rundistance", "MinPrice", "MinPriceqj"]); //关键字 licheng biansuqi pailiang jiage 旧版中标示关键字代码 $("[f]")
        /*二手车发布业务逻辑区域end*/
        data.escpcLocal = "post.58";
        return data;

    }
    checkbox.prototype.checkMinprice = function() {
        var MinPrice = Controller.records.get("MinPrice");
        var val = MinPrice.getValue();
        if (val == "") {
            MinPrice.container.prev().removeClass('validate_success');
        }
    }
    radio.prototype.setguohufeiyong = function() {
        var guohufeiyongbak = Controller.records.get("guohufeiyongbak");
        var guohufeiyong = Controller.records.get("guohufeiyong");
        var val = guohufeiyongbak.getValue();
        if (val == 1) {
            guohufeiyong.setValue(553663);
        } else {
            guohufeiyong.setValue(553664);
        }
        var MinPrice = Controller.records.get("MinPrice");
        if (MinPrice.getValue() == "") {
            MinPrice.container.prev().removeClass("validate_success");
        }
    }
    radio.prototype.setinstallment = function() {
        var installmentbak = Controller.records.get("installmentbak");
        var installment = Controller.records.get("installment");
        var val = installmentbak.getValue();
        if (val == 1) {
            installment.setValue(678611); //是
        } else {
            installment.setValue(678612); //否
        }
    }
    inputText.prototype.callguchejia = function() {
        /*转让价格获取焦点时获取估车价指导信息*/
        //kucheid localid rundistance shangpainianfen shangpaiyuefen  source=car
        var url = "//post.58.com/ajax/?action=getguchejia";
        para = {
            /**
             * 参数说明
             * @param kucheid -- 酷车id=carchexing
             * @param localid -- 城市id
             * @param shangpainianfen -- 上牌年份
             * @param shangpaiyuefen -- 上牌月份
             * @param rundistance --  里程
             */
            localid: ____json4fe['locallist']['dispid'],
            source: 'car'
        };
        var isajax = true;
        ["carchexing", "buytime", "shangpaiyuefen", "rundistance"].forEach(function(el, index) {
            var instance = Controller.records.get(el);
            var val = instance.getValue();
            if (val && val != "") {
                para[el] = instance.getValue();
                if (el == "shangpaiyuefen") {
                    para[el] = instance.getText();
                }
            } else {
                isajax = false;
            }
        });
        para.shangpainianfen = para.buytime; /*后台参数接受为上牌nianfen*/
        para.kucheid = para.carchexing;
        delete para.buytime;
        delete para.carchexing;
        var MinPrice = Controller.records.get("MinPrice");
        var guchejia = Controller.records.get("guchejia");
        if (isajax) {
            $.get(url, para, function(data) {
                //{"code":0,"data":{"dealPrice":[7.07,8.65],"marketPrice":[7.43,9.08],"newPrice":12.78},"desc":"调用成功"}
                data = eval("(" + data + ")");
                if (data.code == 0) {
                    if (data.data.dealPrice[0] == 0 && data.data.dealPrice[1] == 0) {
                        guchejia.setValue("暂无数据");
                        //$(".guchejia em").html("暂无数据");
                    } else {
                        guchejia.setValue(data.data.dealPrice[0] + '万元-' + data.data.dealPrice[1] + '万元');
                        //$(".guchejia em").html(data.data.dealPrice[0] + '万元-' + data.data.dealPrice[1] + '万元');
                    }
                    // if(data.data.newPrice == 0){
                    //     $(".xinchejia em").html("暂无数据");
                    // }else{
                    //     $(".xinchejia em").html(data.data.newPrice + '万元');
                    // }
                } else {
                    guchejia.setValue("暂无数据");
                    //$(".guchejia em").html("暂无数据");
                    // $(".xinchejia em").html("暂无数据");
                }
            });
        } else {
            guchejia.setValue("暂无数据");
            //$(".guchejia em").html("暂无数据");
            // $(".xinchejia em").html("暂无数据");
        }
    }
    /*二手车-身份切换时个人为非必填-改变地址状态*/
    inputText.prototype.changedzState = function() {
            //默认修改为不能为空
            var canNull = false;
            var isBiz = Controller.records.get("isBiz").getValue();
            var caraddressInstance = Controller.records.get("caraddress");
            if (isBiz == 1) {
               caraddressInstance.rows.addStar();
               
            } else {
                canNull = true;
                caraddressInstance.rows.removeStar();   
            }
            //区域和地址变化是否必填状态
            caraddressInstance.opts.canNull = canNull;
            /*当选择个人-校验一遍，删除为空的校验*/
            if (canNull == true) {
                caraddressInstance.hideTips();
                caraddressInstance.setClassByStatus('');
                caraddressInstance.doCheck();
            }
    }
    /*二手车-身份切换时个人为非必填-改变地址状态*/

});

/*
* @funcs 二手车发布页--车型留言板
* @time 2016/7/12
* @author zmy
*/


// 提取到入口文件
define('category/ershouche/ershouche_msgboard',['Controller/Controller','component/block/js/block', 'component/rows/js/rows',
        'component/inputText/js/inputText', 'component/selector/js/selector',
        'component/text/js/text', "component/colorPick/js/colorPick",
        "component/squareRadio/js/squareRadio", 'component/popwin/js/popwin','component/validate/js/validate'
        ],function(Controller,Block,Rows,InputText,Selector,Text,ColorPick,SquareRadio,Popwin,Validate){
        var ershouche_msgboard  = function(){};	
        /*使用color组件来实现车型类别选项*/	
    	ColorPick.prototype.createColorTag=function(color){
			var _self=this;
			var colorTag=$('<a>').addClass('colorTag').data('val',color.val).data('valId',color.valId).attr('href','javascript:void(0)');
			var domStr='';
			if(color.val=='14'||color.val=='527823'||color.val=='527846'||(color.type&&color.type=='cxtype')){
				domStr='<span class="other">'+color.text+'</span><i></i>';
			}else{
				domStr='<span><em style="background-color:'+color.bgcolor+'"></em>'+color.text+'</span><i></i>';
			}
			colorTag.append(domStr);
			_self.container.append(colorTag);
		};

		/*排量和排量单位互相限制*/
		InputText.prototype.setDispStatus = function(target){
			var value = msgList[target].getValue();
			var setObj = (target == 'dispunit' ? msgList['displacement'].opts : msgList['dispunit'].opts);
			if(target == 'dispunit'&&!msgList['displacement'].getValue()){
				msgList[target].rows.containerElem.find('.tip').removeAttr("style");
			}
			//排量输入为整数的时候自动填上.0，输入为0的时候除外
			if(target == 'displacement'&&value&&!isNaN(value)){
				if(value.length == 1&&value!=0&&value!=9)
					msgList[target].setValue(value + '.0');
			}
			if(value){
				setObj.canNull = false;
			}else{
				setObj.canNull = true;
			}
		}
		 /*车型留言板数据--start*/
	    //车型
	    datasrc.cartype = {
	        name:'chexingtype',
	        values:[
	            {
	                val: '轿车',
	                type: 'cxtype',
	                text: '轿车'
	            },{
	                val: 'SUV/越野车',
	                type: 'cxtype',
	                text: 'SUV/越野车'
	            },{
	                val: '面包车',
	                type: 'cxtype',
	                text: '面包车'
	            },{
	            	val: 'MPV',
	                type: 'cxtype',
	                text: 'MPV'
	            },{
	            	val: '皮卡',
	                type: 'cxtype',
	                text: '皮卡'
	            },{
	            	val: '新能源',
	                type: 'cxtype',
	                text: '新能源'
	            }
	        ]

	    };

	    //车排量
	     datasrc.dispunit = {
	        "name": "outputunit",
	        "text": "排量",
	        "values": [
	            {
	                "text": "L",
	                "val": "L"
	            },
	            {
	                "text": "T",
	                "val": "T"
	            }
	        ]
	    };
	    //变速器
	    datasrc.transmission = {
	        "name": "transmission",
	        "text": "变速箱",
	        "values": [
	            {
	                "text": "自动",
	                "val": "自动"
	            },
	            {
	                "text": "手动",
	                "val": "手动"
	            }
	        ]
	    };

	    //年款
	    var date = new Date();
	   
	    var nowyear = date.getFullYear();
	    var cxval = [];
	    for(var i = nowyear;i >= 1995;i--){
	        cxval.push({"text":i,"val":i});
	    }
	    datasrc.caryear = {
	        "name":"chexingyear",
	        "text":"车型年款",
	        "values":cxval
	    };
	  /*车型留言板数据--end*/
    	/*留言板配置*/
		var boardDefine = 
			[ 	
				{
					type: 'block',
					className: 'brandMsgBoard',
					children: [{
						type: 'rows',
						title: '车型名称',
						children: [{
							type: 'inputText',
							name: 'carname',
							canNull:false,
							view: {
								tips: '请输入你想要的车型（4-20个字）',
								placeholder: '例：奥迪A6L 2016款30 FS技术型',
								width: 290
							},
							checkRuler: [{
								type: 'maxLength',
								value: 20,
								msg: '输入的车型长度有误！（4-20个字）'
							}, {
								type: 'reg',
							  	value: "\\S+",
		                        msg: "请输入你想要的车型（4-20个字）"
							}, {
								type: 'minLength',
								value: 4,
								msg: "输入的车型长度有误！（4-20个字）"
							}, {
				                type: "hasContact",
				                msg: "车型名称不能输入联系方式！"
				            },{
		                        type: "regf",
		                        value: "#|&",
		                        msg: "车型名称不能包含‘#’和‘&’"
		                    }],
		                    funcs:[{
				                evt:"blur",setClickLog:"pc_"+____json4fe.catentry[1].dispid+"_cxlycx"
				            }]
						}]
					},{            //车型类型
			            type:"rows",
			            title:"车辆类型",
			            children:[{
			            	type:"selector",
				            name:"cartype",
							canNull:false,
				            checkRuler:[{
		                        type: "reg",
		                        value: "^[\\s\\S]+$",
		                        msg: "请选择车辆类型"
		                    }],
		                    view: {
		                        width: "220",
		                        placeholder: "请选择车辆类型"
		                    }
		                }]
			        },{            //车型年款
			            type:"rows",
			            title:"车型年款",
			            children:[{
				        	type:"selector",
				        	name:"caryear",
				        	canNull:false,
				        	checkRuler: [{
		                        type: "reg",
		                        value: "^[\\s\\S]+$",
		                        msg: "请选择车型年款"
		                   	 }],
		                    view: {
		                        width: "220",
		                        placeholder: "请选择车型年款"
		                    }
		                }, {
				            //文字：年
				            type: 'text',
				            className: 'sep_wrap',
				            view: {
				                text: '年'
			            	}
			       		}]
			        },{            //车型排量
			            type:"rows",
			            title:"排量",
			            children:[{
							type: 'inputText',
							name: 'displacement',
							view: {
								tips:"只能填写带一位小数的纯数字（0.1-8.0）",
		                        width: "100",
		                        placeholder: "请输入"
		                    },
							checkRuler: [{
		                        type: "reg",
		                        value: "^[\\s\\S]+$",
		                        msg: " 	请输入排量值"
		                   	 },{
								type: 'reg',
								value: '^(([0-7]{1}([.][0-9]{1}){0,1})|8(.0)?)$',
								msg: '只能填写带一位小数的纯数字（0.1-8.0）'
							},{
								type: 'regf',
								value: '^0$',
								msg: '只能填写带一位小数的纯数字（0.1-8.0）'
							}],
							funcs: [{
				                evt: "blur",
				                handlers: [{
				                    funcName: "setDispStatus",
				                    target: {
				                        "name": "displacement"
				                    }
				                }]
				            },{
				                evt:"blur",setClickLog:"pc_"+____json4fe.catentry[1].dispid+"_cxlypl"
				            }]

						},{
				        	type:"squareRadio",
				        	name:"dispunit",
				        	className:"msg_square",
				        	checkRuler: [{
		                        type: "reg",
		                        value: "^[\\s\\S]+$",
		                        msg: "请选择排量单位"
		                   	 }],
		                   	 funcs: [{
				                evt: "inputover",
				                handlers: [{
				                    funcName: "setDispStatus",
				                    target: {
				                        "name": "displacement"
				                    }
				                }]
				            }]
		                }]
			        },{            //变速箱
			            type:"rows",
			            title:"变速箱",
			            children:[{
				        	type:"squareRadio",
				        	name:"transmission",
				        	className:"msg_square",
			        		canNull:false,
				        	checkRuler:[{
		                        type: "reg",
		                        value: "^[\\s\\S]+$",
		                        msg: "请选择变速箱"
		                    }]
		                }]
			        }]
				}
			];

			/*创造对象*/
			var compMap = {};
			var msgList = [];   //留言板上的行数组
			function getConstructor(type, opts, data) {
		            var F = compMap[type];
		            if (!F) {
		                F = require('component/' + type + '/js/' + type);
		                compMap[type] = F;
		            }
		            return new F(opts, data);
	        }
			/*createMsgBoard函数---start*/
			function createMsgBoard(){
				/*留言板外壳*/
				var boardContanier = $('<div id="msgBoard"><div class="title">品牌车型留言板</div></div>');
				Popwin.show(' ', boardContanier, 600, 543, true, function(){});
			    
				/*渲染*/
				var i = j = k = 0;
				var block, row, base;
				var blockLength = boardDefine.length;
				var rowLength, baseLength;
				var tabIndex = 100;
				// TODO 是否可以一行或者一个区域进行渲染
				/*渲染boardDefine---start*/
				for (; i < blockLength; i++) {
				    // 区块
				    blockOpt = boardDefine[i];
				    var block = new Block(blockOpt);
			      	//将模块插入弹窗
				    block.containerElem.appendTo('#msgBoard');
				    rowLength = blockOpt.children.length;
				    j = 0;
				    for (; j < rowLength; j++) {
				        // 行级
				        rowsOpt = blockOpt.children[j];
				        var rows = new Rows(rowsOpt);
				        rows.render(block.contentElem);
				        baseLength = rowsOpt.children.length;
				        k = 0;
				        for (; k < baseLength; k++) {
				            // 基本组件
				            var baseOpt = rowsOpt.children[k];
				            baseOpt.tabIndex = (tabIndex++);
				            var baseData = null;
				            var defaultValue = null;
				            try {
				                // 优先取dataName，如果没有dataName,则使用name
				                baseData = datasrc[baseOpt.dataName || baseOpt.name];
				                defaultValue = baseData&&baseData.defaultValue||baseOpt.defaultValue;
				            } catch (e) {
				                baseData = null;
				            }
				            var instance = getConstructor(baseOpt.type, baseOpt, baseData);
				            // 将校验状态初始化到rows上
				            rows.setValidateStatus(baseOpt.name, !baseOpt.checkRuler);
				            instance.rows = rows;
				            instance.block = block;
				            instance.render(rows.contentElem);
				            if(baseOpt.name)
				           		msgList[baseOpt.name] = instance;
				        }
				    }
				}
				/*渲染boardDefine---end*/
				/*增加按钮*/
				var msgbtn = $('<div class="msg_btn"></div>');
				var msgSubmit = $('<div class="msg_submit">提交</div>');
				var msgCancel = $('<div class="msg_cancel">取消</div>');
				msgbtn.append(msgSubmit).append(msgCancel);
				$('#msgBoard').append(msgbtn);


				/*处理事件*/
		
				//提交按钮
				msgSubmit.bind('click',function(){
					var bValid = true,status;
					var date = new Date();
					var datastr = '';
					datastr += '&userid='+userid+'&adddate='+date.getTime();
					if($("#failTip").length > 0){
						$("#failTip").remove();
					}
					for(i in msgList){
						if(!(i == 'dispunit'&&!status.bValid)){
							status = msgList[i].doCheck();
						}
						var dataName = msgList[i].dataName,
							value = msgList[i].getValue();
						if(i == 'carname'){
							value = encodeURIComponent(value);
						}
							datastr += '&'+dataName+'='+value;
						if(bValid){
							bValid = status.bValid;
						}
					}
					//验证通过
					if(bValid){
						//调取接口--向后台传数据
						$.ajax({
							url:'//ershoucheapi.58.com/service/chexingku/addcar?source=car'+ datastr,
							type:'get',
						    dataType : "jsonp",//数据类型为jsonp  
						    jsonp: 'callback',
							success:function(data){
								if(data){
									afterSubmit();
								}else{
									postFail();
								}
							},
							error:function(data){
								postFail();
							}
						})
					}
				});

				//取消按钮
				msgCancel.bind('click',function(){
					Popwin.hide();
				});
			}
		/*createMsgBoard函数---end*/

		/*发送失败的提示信息--start*/
		function postFail(){
			var falseTip = $('<div style="color:#fd634f;clear: both;width: 130px;padding-top: 5px;" id="failTip">提交失败，请重试！</div>');
			$('#msgBoard').append(falseTip);
			var timer = setTimeout(function(){
				if($('#failTip').length > 0)
				$('#failTip').remove();
			},5000);
		}
		/*发送失败的提示信息--end*/

		/*信息发送成功之后出现成功窗口--start*/
		function afterSubmit(){
			$('#msgBoard').empty();
			var html = $('<div class="msg_successtip">'+
							'<i></i>'+
							'<p class="texto">您的车型已提交!</p>'+
							'<p>我们会尽快添至车型库中，请选择相近的车型发布。</p>'+
								'<div class="msg_get">我知道了</div>'+
						'</div>');
			$('#msgBoard').append(html);

			/*事件*/
			$('.msg_successtip .msg_get').bind('click',function(){
				Popwin.hide();
			});
		}

		/*信息发送成功之后出现成功窗口--end*/

		//出现留言板
		if($('.msg_hint .msg_leave')){
			$('.msg_hint .msg_leave').live('click',function(){
				createMsgBoard();
				ershouche_msgboard.prototype.setLiuYanBanClickLog();
			});
		}
		var dispid = ____json4fe.catentry[1].dispid;
		ershouche_msgboard.prototype.setLiuYanBanClickLog = function(){
			//车辆类型点击埋点
			$("div[name='cartype']").find(".optiondef ul li").attr("onclick","clickLog('from=pc_"+dispid+"_cxlylx')");
			//车型年款点击埋点
			$("div[name='caryear']").find(".optiondef ul li").attr("onclick","clickLog('from=pc_"+dispid+"_cxlynk')");
			//变速箱点击埋点
			$("div[name='transmission']").find(".squareRadio").attr("onclick","clickLog('from=pc_"+dispid+"_cxlybsx')");
			//留言板提交按钮点击埋点
			$(".msg_btn .msg_submit").attr("onclick","clickLog('from=pc_"+dispid+"_cxlybtj')");
			//留言板取消按钮点击埋点
			$(".msg_btn .msg_cancel").attr("onclick","clickLog('from=pc_"+dispid+"_cxlybqx')");
			//留言板X点击埋点
			$(".contains .closebtn").attr("onclick","clickLog('from=pc_"+dispid+"_cxlybgb')");
		}	

});

/**
 *添加页面埋点统计
 */
define('category/ershouche/setClickLog',['Controller/Controller',

    "component/carBrandSearch/js/carBrandSearch",
    'component/inputText/js/inputText',
    'component/imgUpload/js/imgUpload',
    'component/carImgUnload/js/carImgUnload',
    'component/submit/js/submit',
    'util/util',
    "component/tracker/js/tracker",
    'component/validate/js/validate'
], function(Controller, CarBrandSearch, inputText, ImgsBar, carImgUnload, Submit, util, tracker, Validate) {
    $(function() {
        $(window.document).bind("pageOnload", window.pageOnloadSetLog);

    })
    window.pageOnloadSetLog = function() {
        var dispid = ____json4fe.catentry[1].dispid;
        //车架号问号图片展示埋点
        // var vinLog = Controller.records.get("vin");
        // vinLog.container.find("#chejiahao_img").attr("onmouseover","clickLog('from=pc_"+dispid+"_vints')");
        //品牌埋点展示
        var brandLog = Controller.records.get("pinpai");
        brandLog.container.find(".carBrandSearch_container").find("a").attr("onclick", "clickLog('from=pc_" + dispid + "_brand')");
        //给车系添加点击埋点
        CarBrandSearch.prototype.afterChexiShow = function() {
                var chexi_win = $(".cheXi_win");
                chexi_win.find("#cheXi_dl").find("a").attr("onclick", "clickLog('from=pc_" + dispid + "_car')");
            }
            //给车型添加点击埋点
        CarBrandSearch.prototype.afterChexingShow = function() {
            var chexing_win = $(".cheXing_win");
            //车型点击埋点
            chexing_win.find(".car-year .car-chexing").find("a").attr("onclick", "clickLog('from=pc_" + dispid + "_model')");
            //排量筛选点击埋点
            chexing_win.find(".car-pail ol li").attr("onclick", "clickLog('from=pc_" + dispid + "_cxpl')");
            //变速箱筛选点击埋点
            chexing_win.find(".car-bsx ol li").attr("onclick", "clickLog('from=pc_" + dispid + "_cxbsx')");
            //留言板点击埋点
            chexing_win.find(".msg_hint .msg_leave").attr("onclick", "clickLog('from=esc_chexinglyb')");
        }

        //车身颜色添加点击埋点
        var color = Controller.records.get("cheshenyanse");
        color.container.find("a").attr("onclick", "clickLog('from=pc_" + dispid + "_color')");
        //初始化时上牌时间点击埋点
        var nianfen = Controller.records.get("buytime")
        nianfen.container.find(".optiondef ul li").attr("onclick", "clickLog('from=pc_" + dispid + "_spy')");
        var yuefen = Controller.records.get("shangpaiyuefen")
        yuefen.container.find(".optiondef ul li").attr("onclick", "clickLog('from=pc_" + dispid + "_spm')");
        //选择车型后重置上牌时间重新添加上牌时间的埋点
        CarBrandSearch.prototype.afterSetShangPaiShiJian = function() {
                nianfen.container.find(".optiondef ul li").attr("onclick", "clickLog('from=pc_" + dispid + "_spy')");
            }
            //上牌时间选择年份后重新添加月份点击埋点
        inputText.prototype.setShangPaiYueFenClickLog = function() {
            yuefen.container.find(".optiondef ul li").attr("onclick", "clickLog('from=pc_" + dispid + "_spm')");
        }
        $('div[name="shangpaiyuefen"]').find(".optiondef ul li").on('click', function() {
                var yuefenClickLog = "from=pcv_" + dispid + "_spm";
                try {
                    if (clickLog != undefined && typeof(clickLog) == "function") {
                        clickLog(yuefenClickLog);
                    }
                } catch (e) {}
            })
            //过户费用点击埋点
        var guohufeiyong = $("div[name='guohufeiyongbak']");
        guohufeiyong.find(".checkbox").attr("onclick", "clickLog('from=pc_" + dispid + "_ghf')");
        //补充说明标准模板悬浮统计埋点
        var content = Controller.records.get("Content");
        content.container.find(".textarea .bzmb-hover img").attr("onmouseover", "clickLog('from=esc_pcfabu_bzmb')");
        //使用图片自动排序功能点击埋点
        var tupianpaixu = $("div[name='autosortimglist']");
        tupianpaixu.find(".checkbox").attr("onclick", "clickLog('from=pc_" + dispid + "_tppx')");
        //微信qq传图点击埋点
        ImgsBar.prototype.setWeixinQQClickLog = function(self) {
                var wxqqClickLog = "";
                if (self.hasClass("wxTitle")) {
                    wxqqClickLog = "from=pc_" + dispid + "_tpwx";
                } else if (self.hasClass("qqTitle")) {
                    wxqqClickLog = "from=pc_" + dispid + "_tpqq";
                }
                try {
                    if (clickLog != undefined && typeof(clickLog) == "function") {
                        clickLog(wxqqClickLog);
                    }
                } catch (e) {}
            }
            //选择图片上传点击埋点
        var img = $("#imgUpload input");
        img.attr("onclick", "clickLog('from=pc_" + dispid + "_tpsc')");
        //图片上传部件选择点击埋点
        ImgsBar.prototype.setBuJianClickLog = function(self) {
                var bujianClickLog = "from=pc_" + dispid + "_tpbj";
                try {
                    if (clickLog != undefined && typeof(clickLog) == "function") {
                        clickLog(bujianClickLog);
                    }
                } catch (e) {}
            }
            //点击查看图片示例点击埋点
        $(".upload_wrap .info .show-span").attr("onclick", "clickLog('from=pc_" + dispid + "_tptsk')");
        //点击收起图片示例点击埋点
        $(".upload_wrap .info .hide-span").attr("onclick", "clickLog('from=pc_" + dispid + "_tptsg')");
        //上传行驶证点击埋点
        var yczbpic = Controller.records.get("yczbpic");
        yczbpic.container.find("input[name='imageLoad']").attr("onclick", "clickLog('from=pc_" + dispid + "_zjtpxs')");
        //上传车架号点击埋点
        // var vinpic = Controller.records.get("vinpic");
        // vinpic.container.find("input[name='imageLoad']").attr("onclick","clickLog('from=pc_"+dispid+"_zjtpvin')");
        //是否定期4s店保养点击埋点
        var baoyang = Controller.records.get("baoyang");
        baoyang.container.find(".squareRadio").attr("onclick", "clickLog('from=pc_" + dispid + "_4sby')");
        //年检到期年份点击埋点
        var nianjianYear = Controller.records.get("cjshijian_y");
        nianjianYear.container.find(".optiondef ul li").attr("onclick", "clickLog('from=pc_" + dispid + "_njy')");
        //年检到期月份点击埋点
        var nianjianMonth = Controller.records.get("cjshijian_m");
        nianjianMonth.container.find(".optiondef ul li").attr("onclick", "clickLog('from=pc_" + dispid + "_njm')");
        //交强险到期年份点击埋点
        var jqxYear = Controller.records.get("qxshijian_y");
        jqxYear.container.find(".optiondef ul li").attr("onclick", "clickLog('from=pc_" + dispid + "_jqxy')");
        //交强险到期月份点击埋点
        var jqxMonth = Controller.records.get("qxshijian_m");
        jqxMonth.container.find(".optiondef ul li").attr("onclick", "clickLog('from=pc_" + dispid + "_jqxm')");
        //商业险到期年份点击埋点
        var shangyeYear = Controller.records.get("syshijian_y");
        shangyeYear.container.find(".optiondef ul li").attr("onclick", "clickLog('from=pc_" + dispid + "_syxy')");
        //商业险到期月份点击埋点
        var shangyeMonth = Controller.records.get("syshijian_m");
        shangyeMonth.container.find(".optiondef ul li").attr("onclick", "clickLog('from=pc_" + dispid + "_syxm')");
        //发布人身份点击埋点
        var faburen = Controller.records.get("isBiz");
        faburen.container.find(".radio").on('click', function() {
                var _self = $(this);
                var faburenClickLog = "";
                if (_self.find("label").text() == "个人") {
                    faburenClickLog = "from=pc_" + dispid + "_gr"
                } else {
                    faburenClickLog = "from=pc_" + dispid + "_sj"
                }
                try {
                    if (clickLog != undefined && typeof(clickLog) == "function") {
                        clickLog(faburenClickLog);
                    }
                } catch (e) {}
            })
            //发送验证码点击埋点
        var yzm = Controller.records.get("yzm");
        yzm.container.find(".getYzm").attr("onclick", "clickLog('from=pc_" + dispid + "_yzm')");
        $('.getYzm').attr("onclick", "clickLog('from=pc_" + dispid + "_yzm')");
        //发布点击埋点
        Submit.prototype.submitClickLog = function() {
            var submit = "from=pc_" + dispid + "_sub";
            try {
                if (clickLog != undefined && typeof(clickLog) == "function") {
                    clickLog(submit);
                }
            } catch (e) {}
        }
    }

});
/**
 * Created by 58 on 2016/4/1.
 */
/**
 * 块级区域组件
 * @module component/block
 */
define('component/sunwukongTip/js/sunwukongTip',[],function(){
    /**
     *  @constructor
     *  @alias module:component/block
     *  @param {Object} opt 配置文件
     */
    function SuwukongTip(opt){
        this.opts = $.extend(true, {}, this.constructor.opts, opt);
        this.init();
    }
    /** @enum  {Object} 静态配置文件，所有的默认值都在这里初始化 */
    SuwukongTip.opts = {
        /** @type {String} 组件的类型 */
        type: 'topTips',
        /** @type {String} 显示的标题名 */
        title: '',
        /** @type {String} 增加的className */
        className: '',
        /** @type {Object} 默认的class名，不要随意修改和传入 */
        defaultClassName: {
            /** @type {String} 容器的className */
            wrap: 'toptips',
            /** @type {String} 图标的className */
            icon: 'icon',
            /** @type {String} 内容区域的className */
            content: 'toptips_content'
        }
    }
    SuwukongTip.prototype = {
        constructor: SuwukongTip,
        /**
         * 初始化方法
         */
        init: function () {
            this.render();
        },
        /**
         * 生成相应的DOM对象
         */
        createElem: function () {
        },
        /**
         * 将容器插入到页面上
         */
        render: function () {
           var fabuguifan = '<span style="display: block;margin-bottom: 3px;">平台严禁发布套牌车、走私车、盗抢车等非法车辆，一经发现一律冻结处理，请您按照<a target="_blank" style="color: #25d;" href="http://about.58.com/333.html#f" onclick="clickLog(\'PRS _pc_CLICK_fqz\')"><<平台发布规范>></a>发布您的信息。</span>';
            //var fabuguifan ="";
            if(____json4fe.catentry[1].dispid==70185){
                fabuguifan="";
            }
            /*修改更新*/
            var $update_tip = '<div class="car_swk update_tip">' +
                '<p class="car_swk_p">'+fabuguifan+'' +
                '亲爱的' +
                '<span class="username red"></span>' +
                '，修改只更新内容不改变排序，刷新或重发可提高点击，成交更快（本月还有' +
                '<span class="red number"></span>' +
                '条发帖权限没有使用）' +
                '</p>' +
                '</div>';

            /*月上限*/
            var $month_end = '<div class="car_swk2 month_end">' +
                '<p class="car_swk_p2"> ' +fabuguifan+'' +
                '您当月的' +
                '<span class="red number">' +
                '<b></b>' +
                '</span>条' +
                '发帖权限已用尽，继续发帖需支付' +
                '<span class="red"><b> 2 </b></span>元。' +
                '</p>' +
                '</div>';

            /*日上限*/
            var $day_end = '<div class="car_swk2 day_end">' +
                '<p class="car_swk_p2"> ' +fabuguifan+'' +
                ' 您今天的' +
                '<span class="red number">' +
                '<b></b>' +
                '</span>条' +
                '发帖权限已用尽，继续发帖需支付' +
                '<span class="red"><b> 2 </b></span>元。' +
                '</p>' +
                '</div>';

            /*全免费*/
            var $all_free = '<div class="car_swk2 all_free">' +
                '<p class="car_swk_p2">' +fabuguifan+'' +
                '您今天还可免费发贴' +
                '<span class="red">' +
                '<b class="all_free_day"></b>' +
                '</span>条' +
                '， 本月还可免费发帖 ' +
                '<span class="red"> ' +
                '<b class="all_free_month"></b>' +
                '</span>条。' +
                '</p>' +
                '</div>';

            /*本月免费*/
            var $show_month = '<div class="car_swk2 show_month">' +
                '<p class="car_swk_p2">' +fabuguifan+'' +
                '您本月还可免费发帖' +
                '<span class="red">' +
                '<b class="number"></b>' +
                '</span>条。' +
                '</p>' +
                '</div>';
            /*vip异地发帖提示*/
            var $show_vip = '<div class="car_swk2 day_end">' +
                '<p class="car_swk_p2"> ' +fabuguifan+'' +
                '在未购买汽车网邻通服务的城市发布车源，每发一条将花费' +
                '<span class="red"><b> 2 </b></span>元。' +
                '</p>' +
                '</div>';
            var $contentPost = $("<div id='contentPost'>");
            var obj;
            $contentPost.insertBefore('#formWrap');
            this.containerElem = $contentPost;
            //1、修改只更新内容
            if(!isadd && swkshangxian && swkshangxian.infoLeft && swkshangxian.infoLeft > 0){
                $contentPost.append($update_tip);
                obj = $contentPost.find(".update_tip");
                this.show_update(obj,swkshangxian.username,swkshangxian.infoLeft);
            }

            /*其他情况*/
            if(swkshangxian&&swkshangxian.isLogin){
                if(swkshangxian.postLimitType != '' && isadd){
                    if(swkshangxian.postLimitType == 'month'){
                        //2、本月条数number
                        $contentPost.append($month_end);
                        obj = $contentPost.find(".month_end");
                        this.show_number(obj,swkshangxian.monthPostLimit);

                    }else if(swkshangxian.postLimitType == "day"){
                        //3、今天条数number
                        $contentPost.append($day_end);
                        obj = $contentPost.find(".day_end");
                        this. show_number(obj,swkshangxian.dayPostLimit);

                    }else if(swkshangxian.postLimitType == "free" && iqasData.isBiz != 1){
                        //4、本日本月都有免费条数
                        $contentPost.append($all_free);
                        var dayT = swkshangxian.dayPostEver,
                            monthT = swkshangxian.monthPostEver;
                        this.show_free(dayT,monthT);

                    }else if(swkshangxian.postLimitType == 'free' && iqasData.isBiz == 1)  {
                        //5、本月还可免费发帖number
                        $contentPost.append($show_month);
                        obj = $contentPost.find(".show_month");
                        this.show_number(obj,swkshangxian.monthPostEver);
                    }else if(swkshangxian.postLimitType == 'vip'){
                        /*vip异地发帖提示*/
                        $contentPost.append($show_vip);
                    }
                }

            }
            /*修正工程车top*/
            if(____json4fe.catentry[1].dispid==70185){
                $("#contentPost .car_swk_p2").css("margin-top","0px");
            }
        },
        hide: function () {
            this.containerElem.hide();
        },
        show: function () {
            this.containerElem.show();
        },
        /* 1、更新提示：update_tip
         2、本月用完：month_end
         3、今天用完：day_end
         4、本月，今天都可以：all_free
         5、只显示本月免费：show_month
         6、在未购买汽车网邻通服务的城市发布车源：city_limit*/

        /*
         *更新信息的时候显示
         */
        show_update: function (obj, username, number) {
            var $username = obj.find(".username"),
                $number = obj.find(".number");
            $username.html(username);
            $number.html(number);
        },
        /*
         *月条数和天条数都有的时候
         */
        show_free: function (dayT, monthT) {
            var parent = this.containerElem.find(".all_free");
            parent.find(".all_free_day").html(dayT);
            parent.find(".all_free_month").html(monthT);
        },
        /*
         *相应对象的条数
         */
        show_number: function (obj, number) {
            $(obj).find(".number").html(number);
        }
        /*孙悟空控制发帖条数显示入口----end----*/
    }

    return SuwukongTip;
});
/**
 * 选项卡
 * @module component/citySelector
 */
define('component/citySelector/js/citySelector',['component/base/js/base', 'util/Class', 'component/popTip/js/popTip', 'Controller/Controller', 'util/postClickLog', 'util/util'], function (Base, Class, PopTip, Controller, postClickLog, Util) {

    /**
     *  @constructor
     *  @alias module:component/citySelector
     *  @param {Object} opt 配置文件
     */
    var citySelector = Class.extend(Base);

    /**
     * 默认的className。包括wrap、title、content、multi
     * @type {Object}
     */
    citySelector.prototype.CLASS = {
        /** @type {String} 容器的className */
        WRAP: 'citySelector_wrap',
        /** @type {String} 标题的className */
        TITLE: 'citySelector_title',
        /** @type {String} 内容区域的className */
        CONTENT: 'citySelector_content',
        /** @type {String} 当前后有内容时，需要增加的class */
        MULTI: 'clearfix'
    };
    citySelector.prototype.type = 'citySelector';
    citySelector.prototype.createElem = function () {
        this.opts = $.extend(true, {}, this.defaultOpts, this.opts);
        //组件外层
        this.container = $('<div class="citySelector_wrap"></div>');

        //input输入框  >>>>>   1

        this.input = $('<div class="city_input"><div class="arrow_con"></div></div>');

        //城市选择框    >>>>>   2
        this.cityWin = $('<div class="city_win"></div>');
        //上边提示信息   >>>>   2.1
        this.topTip = $('<div class="citySelector_topTip"></div>');
        //标题（ABCDE）  >>>>   2.2
        this.titleElem = $('<div class="citySelector_title"></div>');
        //标题对应的内容  >>>>   2.3
        this.contentElem = $('<div class="citySelector_container"></div>');
        //下边提示信息    >>>>   2.4
        this.bottomTip = $('<div class="citySelector_bottomTip"></div>');

        //城市
        this.input.append('<input readonly="readonly" value="'+this.opts.view.placeholder+'" placeholder='+this.opts.view.placeholder+' type="text" id="city" class="city" name="'+this.opts.name+'" data-valId="" value="" autocomplete="off">');

        this.topTip.append('<div class="toptip">请您直接选择城市!</div>');
        var dataLength = this.data&&this.data.values.length;
        for (var i = 0; i < dataLength; i++) {
            // 拼装标题
            var titleObj = this.data.values[i];//获取到city对象
            //data-val:字母值,data-valId:字母id
            this.titleElem.append('<a data-val="' + titleObj.val + '" data-valId="' + titleObj.id + '" href="javascript:void(0);"' + ((titleObj.text == "热门") ? (" class=\"hot_options\"") : ("")) + '>' + titleObj.text + '</a>');
            var cityObj = this.data.values[i].children;//获取到city对象
            if(cityObj&&cityObj.values){
                var content = $('<div class="item">');
                for (var j = 0; j < cityObj.values.length; j++) {
                    var contentObj = cityObj.values[j];
                    //热门城市时，把热门城市中对应的城市添加一个data-zimuVal
                    if (titleObj.id != "") {
                        this.contentElem.find('[data-valId=' + contentObj.valId + ']').attr("data-zimuVal", titleObj.val);
                    }
                    // 拼装对应的内容区域
                    //pnameid:字母参数id,nameid:城市参数id,data-val:城市值，data-valId:城市id
                    var item = $('<a pnameid = "' + this.data.id + '" nameid="' + cityObj.id + '" data-val="' + contentObj.val + '" data-valId="' + contentObj.valId + '" href="javascript:void(0);">' + contentObj.text + '</a>')
                    if(contentObj.pid){
                        item.attr("data-zimuVal",contentObj.pid);
                    }
                    content.append(item);
                }
                 this.contentElem.append(content);
            }
        }
        this.cityWin.append('<a class="citywin_win" href="javascript:void(0)"></a>')
        this.cityWin.append(this.topTip);
        this.cityWin.append(this.titleElem);
        this.cityWin.append(this.contentElem);

        this.container.append(this.input);
        this.container.append(this.cityWin);
    };
    citySelector.prototype.bindDomEvent = function () {
        var _self = this;
        //宽度等于title宽度 + title.Padding - contentElem.Padding;
        var wrapWidth = _self.titleElem.children().length * 30 + ((_self.titleElem.find('.hot_options').length == 1 ) ? 15 : 0) + 20;
        if (wrapWidth < 470) {
            wrapWidth = 470;
        }
        _self.titleElem.delegate('a', 'click mouseover', function () {
            if ($(this).hasClass('active_item')) {
                return;
            }
            var index = $(this).index();
            _self.titleElem.find('a').removeClass('active_item');
            $(this).addClass('active_item');
            var curElem = _self.contentElem.find('.item').eq(index);
            _self.contentElem.find('.item').hide();
            curElem.show();
        });

        /*选择城市*/
        _self.contentElem.delegate('a', 'click', function () {
            if ($(this).hasClass('active_item')) {
                _self.cityWin.hide();
                return;
            }
            //移除原本选择的内容的class
            _self.contentElem.find('.active_item').removeClass('active_item');
            var cityVal = $(this).data('val');
            var cityText = $(this).text();
            _self.setcityVal(cityVal,cityText);
            /*初始化字母和city*/
            var zimuVal = _self.titleElem.find(".active_item").data("val");
            var zimuText = _self.titleElem.find(".active_item").text();
            if (zimuText=='热门') {
            }
            _self.container.triggerHandler('change');
            //隐藏选择框
            _self.hidecity_win();
            /*触发验证*/
            _self.triggerCheck();
            //显示级联的区域
            _self.getAjax('localArea', $(this));
        });

        /*-----input绑定事件，触发显示cityWin选择框*/

        _self.input.find('#city').bind('click', function (e) {
            _self.showhide_win('city');
        });

        /* ----   绑定关闭框框事件 --------- */
        _self.close_win();

        /* ----- 绑定body点击事件   ------ */
        $('body').bind('click', function (e) {
            //判断是否需要隐藏
            e=e||window.event;
            var target = e.target|| e.srcElement;
            var tagdiv = 'citySelector_wrap',
                len = $(target).parents().length;
            var blurflag = true;
            if(_self.cityWin.is(':visible')){
                if($(target).closest(".citySelector_wrap").length>0){
                    blurflag = false;
                }
                if (_self.triggerCheck()&&blurflag == true) {
                    _self.showhide_win('all');
                }
            }
        });
        // 触发显示第一个
        _self.titleElem.find('a').eq(0).click();
    };


    /**
     * 调用ajax获取选择城市的车系,显示车系input和车系框--win
     */

    citySelector.prototype.getAjax = function (type, obj) {
        var _self = this;
        var city = obj.attr("data-val");
        ajaxUrl = "//post.58.com/getKCDZCityArea/"+city+"/?source=car";
        $.ajax({
            url: ajaxUrl,
            type: "GET",
            async:false,
            success: function (data) {
                var newlocalData = data;
                _self.objVal = newlocalData;
                _self.container.triggerHandler('inputover');
            },
            error: function (data, erre) {
                console.log("获取区域商圈出错");
                _self.container.triggerHandler('inputover');
                return;
            }
        });
    }
    citySelector.prototype.getObjValue = function() {
        return this.objVal;
    };
    //隐藏城市框-win
    citySelector.prototype.hidecity_win = function () {
        this.cityWin.hide();
    }
    //显示城市框-win
    citySelector.prototype.showcity_win = function () {
        this.cityWin.show();
    }

    //触发验证
    citySelector.prototype.triggerCheck = function () {
        /*触发验证*/
        var checkObj = this.doCheck();
        if (checkObj.bValid === true &&this.rows&&this.rows.getValidateStatus() !== true) {
            this.hideTips();
        }
        return checkObj.bValid;

    }

    /*-----绑定关闭按钮事件*/
    citySelector.prototype.close_win = function () {
        var _self = this;
        this.container.on('click', '.citywin_win', function (e) {
            $(this).parent().hide();
            _self.triggerCheck();
        });
    }
    //设置显示隐藏选择框,城市，车系，车型都在这里判断
    citySelector.prototype.showhide_win = function (from) {
        var _self = this;
        if(this.disable){
            return;
        }
        switch (from) {
            case 'city' :
            {
                _self.showcity_win();
                break;
            }
            case 'all' :
            {
                if (_self.cityWin.css("display") == 'block') {
                    _self.hidecity_win();
                }
                break;
            }

        }
    }

    //设置内容
    citySelector.prototype.selectByVal = function (selVal) {
        var targetItem = $(this.contentElem.find('[data-val="' + selVal + '"]')[0]);
        targetItem.addClass('active_item');
        this.input.find('#city').val(targetItem.text()).attr('data-val',selVal);
        this.getAjax('localArea', $(targetItem));
    };
    /*禁用 移除城市 车型 车系事件*/
    citySelector.prototype.disable = false;
    citySelector.prototype.disabled=function(){
        this.input.find('#city').unbind('click');
        this.disable=true;
        this.container.addClass("disabled");
    }
    citySelector.prototype.undisabled=function(){
        var _self =this;
        this.input.find('#city').bind('click', function (e) {
            _self.showhide_win('city');
        });
        this.disable=false;
        _self.container.removeClass("disabled");
    }
    //设置选中内容到城市input中
    citySelector.prototype.setcityVal = function (selVal) {
        var targetItem = this.contentElem.find('[data-val="' + selVal + '"]');
        var text = targetItem.html(),
            vid = $(targetItem).attr('data-valId');
        targetItem.addClass('active_item');
        this.input.find('#city').attr("data-valId", vid).attr("data-val",selVal).val(text);
        var city = Controller.records.get("kanchecs");

    };

    citySelector.prototype.reset = function () {
        this.contentElem.find('.active_item').removeClass('active_item');
        this.input.find('#city').attr("data-valId", "").attr("data-val","").val("");
        /*清空隐藏域的值*/
        var cityInstance = Controller.records.get("kanchecs");
        cityInstance&&cityInstance.setValue("");
    };
    citySelector.prototype.getValue = function () {
        var _self = this;
        input = _self.input.find('input');
        var value = $(input).attr('data-val')||"";
        return value;
    };

    /* dataFrom---返回文本元素 -----必须返回对象才可以识别------*/
    citySelector.prototype.getText = function () {
        var _self = this;
        var str = '',
            value = {},
            input = _self.input.find('input');
        var value = $(input).val()||"";
        return value.replace("请选择城市","");
    };

    citySelector.prototype.getCheckValue = function () {
        var _self = this;
        var fillAll = true,
            input = _self.input.find('input');
        var len = input.length;
        for (var i = 0; i < len; i++) {
            var win = _self[$(input[i]).attr('id').toLowerCase() + 'Win'];
            if (($(input[i]).val() == undefined || $(input[i]).val() == '') && (win.children().length > 0)) {
                fillAll = false;
            }
        }
        if (fillAll == true) {
            this.container.triggerHandler('complete');
            return this.getValue();
        } else {
            return '';
        }
    };

    citySelector.prototype.setValue = function (val, text, bDefault) {

        if (Util.isString(val) === false) {
            // val必须为String类型
            //return;
        }
        // 必须要为空字符串时，才会进行reset操作，否则不做任何处理
        if (val === '') {
            this.reset();
        }
        this.selectByVal(val);
    };
    citySelector.prototype.render = function (wrapElem) {
        if (this.opts.canNull === false) {
            this.rows.addStar();
        }
        if (this.container && this.container.length > 0) {
            this.container.appendTo(wrapElem);
            if (typeof window.infoDetail != 'undefined' && typeof window.infoDetail[this.opts.name] != 'undefined') {
                //this.setValue(window.infoDetail[this.opts.name]);
            }
        } else {
            // console.log('render error: this.container undefined')
        }
    };
    return citySelector;
});
/**
 * 真车标签
 * @module component/reallyCar
 */
define('component/reallyCar/js/reallyCar',['component/base/js/base',
    'util/Class',
    'component/popTip/js/popTip',
    'component/ershouche_pic/js/ershouche_pic',
    'component/inputText/js/inputText',
    'component/imgUpload/js/imgUpload',
    'component/carImgUnload/js/carImgUnload',
    'component/vin/js/vin',
    'component/popwin/js/popwin',
    'Controller/Controller',
    'util/postClickLog',
    'util/util'
], function(Base, Class, PopTip, Ershouche_pic, inputText, ImgsBar, carImgUnload, VIN, popwin, Controller, postClickLog, Util) {

    /**
     *  @constructor
     *  @alias module:component/ReallyCar
     *  @param {Object} opt 配置文件
     */
    var ReallyCar = Class.extend(Base);

    /**
     * 默认的className。包括wrap、title、content、multi
     * @type {Object}
     */
    ReallyCar.prototype.CLASS = {
        /** @type {String} 容器的className */
        WRAP: 'reallyCar_wrap',
        /** @type {String} 标题的className */
        TITLE: 'reallyCar_title',
        /** @type {String} 内容区域的className */
        CONTENT: 'reallyCar_content',
        /** @type {String} 当前后有内容时，需要增加的class */
        MULTI: 'clearfix'
    };
    ReallyCar.prototype.defaultOpts = {
        sxqqRequire: false //手续齐全是否必填
    }
    ReallyCar.prototype.type = 'reallyCar';

    ReallyCar.prototype.createElem = function() {
        this.opts = $.extend(true, {}, this.defaultOpts, this.opts);
        //组件外层
        this.container = $('<div class="reallyCar_wrap"></div>');
        this.title = $('<div class=reallyCar_title></div>')
            //帖子预览区域
        this.createElem = $('<div class="reallyCar_content"></div>');
        //帖子内容
        this.sourceInfo = $('<div class="car_source"></div>');
        //车源图片
        this.sourceImg = $('<img id="firstPic" src="//img.58cdn.com.cn/ui7/car/list/img/noimg.png">');
        this.sourceDetail = $('<div class="car_detail"></div>')
            //车源标题
        this.sourceTitle = $('<div class="car_title">请选择品牌车系车型</div>');
        //上牌时间-里程
        this.infoparam = $('<div class="info_param"><span class="nianfen">--年</span><span class="licheng">--万公里</span></div>')
            //真车标签
        this.carTag = $('<div class="car_tag"><div class="zscy-tag">行驶证已验</div><div class="sxqq-tag">手续齐全</div><span class="tag-tip">点亮标签，提升关注</span><div class="check">标签审核中...</div><div class="checked">标签已点亮</div></div>');
        //鼠标悬浮气泡展示
        this.qipaoShow = $('<div class="zscy-qp">已验证车辆行驶证</div><div class="sxqq-qp">已验证车辆证件与交易手续齐全</div>')
            //价格
        this.carPrice = $('<div class="car-price"><span class="jiage">--</span>万元</div>')
            //分割线
        this.line = $('<div class="split-line"></div>');

        this.sourceDetail.append(this.sourceTitle);
        this.sourceDetail.append(this.infoparam);
        this.sourceDetail.append(this.carTag);
        this.sourceDetail.append(this.qipaoShow);

        this.sourceInfo.append(this.sourceImg);
        this.sourceInfo.append(this.sourceDetail);
        this.sourceInfo.append(this.carPrice);

        this.createElem.append(this.sourceInfo);
        this.container.append('<div id="visibleLine"></div>')
        this.container.append(this.title);
        this.container.append(this.createElem);
        this.container.append(this.line);

        $(".postLabel_wrap").find(".block_title").append('<div class="tip_title">点亮全部标签，预计提升帖子排序权重<em>15%</em>，点击率<em>45%</em>，相关隐私材料承诺只用于审核，绝不用于页面展示</div>');
        this.createUploadContent();
    };
    //创建展开区域的dom结构
    ReallyCar.prototype.createUploadContent = function() {
        //行驶证二维码链接
        var xszUrl = "//api.vip.58.com/genqrcode/?content=http://static.58.com/car/m/2017/really_car/reallycar.html?key=xingshizheng"
            //点亮标签提升关注点击按钮(默认隐藏)
        this.unfoldedBtn = $('<div class="unfolded-btn">点亮标签,提升关注<span></span></div>');
        //证件照上传区域
        this.upload = $('<div class="carinfo-upload"></div>')

        //真是车源-手续齐全切换区域
        this.uploadTitle = $('<div class="tag-tab"><span class="tab-car active" onClick="clickLog(\'from=bq_xszyy\');">行驶证已验</span><span class="tab-sxqq" onClick="clickLog(\'from=bq_zjqq\');">手续齐全</span></div>')
            //暂时去除移动端传图 以下注销为移动端传图界面
            //行驶证已验内容展示区域
        this.uploadContent = $('<div class="upload-content">' +
                '<div class="car-content"><div class="car-tip">上传两张照片，审核通过后获取行驶证已验标签<br>(完成此项提升排序权重5%，点击率提升37%)</div>' +
                '<div class="line"></div>' +
                '<div class="upload-div">' +
                '<div class="clzp-div"><div class="clzp"><span class="text">车牌号照片</span></div>' +
                '<div class="clzp-text">车牌请勿遮挡，最大10M</div></div>' +
                '<div class="jiahao">+</div>' +
                '<div class="xsz-div"><div class="xsz"><span class="text">行驶证照片</span></div></div>'
                // +'<div class="xingshizheng"><img src="//img.58cdn.com.cn/ui7/post/img/default_xsz.png"><div class="xsz-text">行驶证</div></div>'
                // +'<div class="fenge-line"></div>'
                // +'<div class="xsz-erweima"><img src='+xszUrl+'><div class="xszewm-text">扫码拍摄行驶证</div></div>'
                +
                '</div></div>' +
                '</div>')
            //手续齐全内容展示区域
        this.wholeContent = $('<div class="whole-content">' +
                '<div class="whole-tip">上传以下证件，审核通过后获取手续齐全+行驶证已验两个标签<br>(完成此项提升排序权重5%，点击率提升37%)</div>' +
                '<div class="line"></div>' +
                '<div class="clzp1-div"><div class="clzp1"><span class="text">车牌号照片</span></div></div>' +
                '<div class="jiahao">+</div>' +
                '<div class="xsz1-div"><div class="xsz1"><span class="text">行驶证照片</span></div><div class="xsz1-text">保证证件信息清晰可见，最大10M</div></div>'
                //+'<div class="xingshizheng"><img src="//img.58cdn.com.cn/ui7/post/img/default_xsz.png"><div class="xsz-text">行驶证</div></div>'
                +
                '<div class="jiahao">+</div>' +
                '<div class="cldjz-div"><div class="cldjzc"><span class="text">车辆登记证书</span></div></div>'
                //+'<div class="cheliangdengji"><img src="//img.58cdn.com.cn/ui7/post/img/default_zcz.png"><div class="text">车辆登记证书</div></div>'
                +
                '<div class="jiahao">+</div>' +
                '<div class="gcfp-div"><div class="gcfpc"><span class="text">购车发票</span></div></div>'
                //+'<div class="gouchefapiao"><img src="//img.58cdn.com.cn/ui7/post/img/default_fp.png"><div class="text">购车发票</div></div>'
                //+'<div class="fenge-line"></div>'
                // +'<div class="sxqq-erweima"><img src='+xszUrl+'><div class="sxqqewm-text">扫描二维码拍照</div></div>'
                +
                '</div>')
            //点击收起按钮
        this.shouqiBtn = $('<div class="shouqi" onClick="clickLog(\'from=bq_sqbq\');">点击收起<span></span></div>')

        this.upload.append(this.uploadTitle);
        this.upload.append(this.uploadContent);
        this.upload.append(this.wholeContent);
        this.container.append(this.unfoldedBtn);
        this.container.append(this.upload);
        this.container.append(this.shouqiBtn);

    }
    Ershouche_pic.prototype.bindDomEvent = function() {
            var _self = this;
            // this.toolElement.find(".carloadimageTrigger").click(function() {
            //     // _self.toolElement.find(".carloadimage").trigger("click");ie9以下因为安全策略不允许程序模拟点击触发表单提交
            // })
            this.toolElement.find("#localImgUpLoad").delegate("input",'change', function(){
                _self.container.find(".carloadimageTrigger img").attr("src","//img.58cdn.com.cn/ui7/post/pc/imgs/loading.gif");
            });
            this.imgElement.find(".delete_con").hide();
            var count = -1;
            this.imgElement.find(".delete_con").on("click", function() {
                _self.deleteImg(count);
            });
    }   
        /**
         *二手车帖子标签中图片删除功能
         */
    Ershouche_pic.prototype.deleteImg = function(count) {
        var _self = this;
        _self.imgList=[];
        _self.imgElement.find("img").attr("src", _self.opts.loadImg); /*恢复默认图片*/
        _self.imgElement.find(".delete_con").hide();
        _self.picPromptElement.html("");
        if (_self.dataName == 'chapaihao' && $(".chapaihao1 .carPicUploadImgContain").attr("src") != "") {
            //由于行驶证已验和手续齐全里面的车牌号照片公用一个参数
            //删除行驶证已验图片时如果手续齐全里面的车牌号照片已经上传不再清除chapaihao的value值
        } else if (_self.dataName == 'yczbpic' && $(".yczbpic1 .carPicUploadImgContain").attr("src") != "") {
            //由于行驶证已验和手续齐全里面的行驶证照片公用一个参数
            //删除行驶证已验图片时如果手续齐全里面的行驶证照片已经上传不再清除yczbpic的value值
        } else {
            _self.value = "";
        }
        count++;
        if(this.uploadType == "form"){

            this.imgProcess.delImg();//删除原有input的dom，重新渲染
        }
        else if(this.uploadType == "h5"){
            this.imgProcess.rebuild();
        }
         this.imgProcess.render(this.container.find(".localImgUpLoad"));
        _self.toolElement.find("#localImgUpLoad").on("input",'change', function(){
            alert(1)
            _self.container.find(".carloadimageTrigger img").attr("src","//img.58cdn.com.cn/ui7/post/pc/imgs/loading.gif");
        });
        _self.doCheck();
        _self.container.find(".upload_xsz_tit").show();
        _self.container.find(".carPicUploadImgContain").hide();
        _self.container.find(".carloadimageTrigger img").attr("src", "//img.58cdn.com.cn/ui7/post/img/cheliangzhaopian.png");

        var reallycarDom = Controller.records.get("reallyCar").container;
        //删除图片成功显示reallyCar组件的dom结构
        if (_self.container.hasClass("chapaihao")) {
            reallycarDom.find(".clzp-div .text").show();
        } else if (_self.container.hasClass("yczbpic")) {
            reallycarDom.find(".xsz-div .text").show();
        } else if (_self.container.hasClass("yczbpic1")) {
            reallycarDom.find(".xsz1-div .text").show();
            //$(".postLabel_wrap .validate_error").hide();
        } else if (_self.container.hasClass("cldjz")) {
            reallycarDom.find(".cldjz-div .text").show();
        } else if (_self.container.hasClass("gcfp")) {
            reallycarDom.find(".gcfp-div .text").show();
        } else if (_self.container.hasClass("chapaihao1")) {
            reallycarDom.find(".clzp1-div .text").show();
            //$(".postLabel_wrap .validate_error").hide();
        }
        Controller.records.get("reallyCar").doCheckSxqq();

    }

    ReallyCar.prototype.bindDomEvent = function() {
        var _self = this;
        //行驶证已验和手续齐全页签切换
        _self.uploadTitle.find('span').on('click', function() {
                var self = $(this);
                self.siblings().removeClass("active");
                self.addClass("active");
                var chapaihao1 = Controller.records.get("chapaihao1").container
                var yczbpic1 = Controller.records.get("yczbpic1").container
                var cldjz = Controller.records.get("dengjizheng").container
                var gcfp = Controller.records.get("gouchefapiao").container
                var chapaihao = Controller.records.get("chapaihao").container
                var yczbpic = Controller.records.get("yczbpic").container
                if (self.hasClass("tab-car")) {
                    _self.uploadContent.show();
                    _self.wholeContent.hide();
                    chapaihao1.hide();
                    yczbpic1.hide();
                    cldjz.hide();
                    gcfp.hide();
                    chapaihao.show();
                    yczbpic.show();
                    //$(".postLabel_wrap .validate_error").show();
                    // $(".postLabel_wrap .images_upload").show();
                    // if($(".postLabel_wrap .images_upload").find("img").attr("src") == ""){
                    //     $(".postLabel_wrap .upload_xsz_tit").show();
                    // }

                } else if (self.hasClass("tab-sxqq")) {
                    _self.uploadContent.hide();
                    _self.wholeContent.show();
                    chapaihao1.show();
                    yczbpic1.show();
                    cldjz.show();
                    gcfp.show();
                    chapaihao.hide();
                    yczbpic.hide();
                    //$(".postLabel_wrap .validate_error").hide();
                    //$(".postLabel_wrap .images_upload").hide();
                    //$(".postLabel_wrap .upload_xsz_tit").hide();
                }
            })
            //点击收起
        _self.shouqiBtn.on('click', function() {
                var self = $(this);
                var chapaihao1 = Controller.records.get("chapaihao1").container
                var yczbpic1 = Controller.records.get("yczbpic1").container
                var cldjz = Controller.records.get("dengjizheng").container
                var gcfp = Controller.records.get("gouchefapiao").container
                var chapaihao = Controller.records.get("chapaihao").container
                var yczbpic = Controller.records.get("yczbpic").container
                self.hide();
                _self.upload.hide();
                _self.unfoldedBtn.show();
                chapaihao.hide();
                yczbpic.hide();
                yczbpic1.hide();
                cldjz.hide();
                gcfp.hide();
                chapaihao1.hide();
                _self.rows.containerElem.find(".rows_title_star").hide();
                _self.container.prev(".validate_error").hide();
            })
            //点亮标签，提升关注
        _self.unfoldedBtn.on('click', function() {
            var self = $(this);
            var chapaihao1 = Controller.records.get("chapaihao1").container
            var yczbpic1 = Controller.records.get("yczbpic1").container
            var cldjz = Controller.records.get("dengjizheng").container
            var gcfp = Controller.records.get("gouchefapiao").container
            var chapaihao = Controller.records.get("chapaihao").container
            var yczbpic = Controller.records.get("yczbpic").container
            self.hide();
            _self.upload.show();
            _self.shouqiBtn.show();
            if (_self.uploadTitle.find(".tab-car").hasClass("active")) {
                chapaihao.show();
                yczbpic.show();
            }
            if (_self.uploadTitle.find(".tab-sxqq").hasClass("active")) {
                yczbpic1.show();
                cldjz.show();
                gcfp.show();
                chapaihao1.show();
            }
            _self.rows.containerElem.find(".rows_title_star").show();
            _self.container.prev(".validate_error").show();
        })

        function getScrollTop() {
            var scrollPos;
            if (window.parent.pageYOffset) {
                scrollPos = window.parent.pageYOffset;
            } else if (window.parent.document.compatMode && window.parent.document.compatMode != 'BackCompat') { scrollPos = window.parent.document.documentElement.scrollTop; } else if (window.parent.document.body) { scrollPos = window.parent.document.body.scrollTop; }
            return scrollPos;
        }
        //滚动条滚动触发函数  
        $(window.top).scroll(function() {
            var tieziTop = $(".really_car_wrap").offset().top;
            var height = $(window.parent).height(); //可是窗口的高度
            var sHeight = getScrollTop(); //滚动条滚动高度
            //console.log(sHeight + height);
            //console.log("tiezi is :"+tieziTop)
            if ((height + sHeight) > tieziTop) {
                //上传完图片 获取首图显示到帖子预览部分
                var pic = Controller.records.get("Pic").container;
                var reallycarDom = Controller.records.get("reallyCar").container;
                var picDom = pic.find(".img_box");
                var firstPicDom = $(picDom[0]);
                var firsrPicUrl = firstPicDom.find("img").attr("src");
                if (Controller.records.get("Pic").getValue() != "") {
                    if (firsrPicUrl != undefined) {
                        reallycarDom.find("#firstPic").attr("src", firsrPicUrl)
                    }
                } else {
                    reallycarDom.find("#firstPic").attr("src", "//img.58cdn.com.cn/ui7/car/list/img/noimg.png")
                }

                //回填帖子标题
                var title = Controller.records.get("Title").getValue();
                if (title != "") {
                    reallycarDom.find(".car_title").html(title)
                }
                //回填帖子预览里面的年份
                var buytimeVal = Controller.records.get("buytime").getValue();
                if (buytimeVal != "") {
                    reallycarDom.find(".nianfen").html(buytimeVal + '年')
                }
                //回填帖子预览里面的行驶里程
                var rundistance = Controller.records.get("rundistance");
                var rundistanceVal = rundistance.getValue();
                if (rundistanceVal != "") {
                    reallycarDom.find(".licheng").html(rundistanceVal + '万公里')
                } else {
                    reallycarDom.find(".licheng").html('--万公里')
                }
                //回填帖子预览里面的价格
                var MinPrice = Controller.records.get("MinPrice");
                var MinPriceVal = MinPrice.getValue();
                if (MinPriceVal != "") {
                    reallycarDom.find(".jiage").html(MinPriceVal);
                } else {
                    reallycarDom.find(".jiage").html("--");
                }
                //每隔5秒查询一次是否有移动端上传图片
                //setInterval(_self.getPhoneUploadImgUrl(),"5000");              
                //5个城市触发免费商户触发行驶证已验必填
                //切换商家个人时候 行驶证已验标签是否必填校验
                var isBiz = $(".radio_wrap[name=faburen]").children("div[class*=focus]").attr("data-value")
                if (businessData.isVipUser == false && isBiz == "1" && (businessData.zhenche == true)) { /*上海行驶证和vin码照片必填*/

                    _self.setXszRequire(); //设置vin码重复行驶证必填

                } else if (isBiz == "0") {

                    _self.setUnXszRequire();

                }
            } else {

            }
        });
        //行驶证已验悬浮给出气泡提示
        _self.carTag.on('mouseover', '.zscy-tag,.sxqq-tag', function() {
            var self = $(this);
            if (self.hasClass("zscy-tag")) {
                $(".zscy-qp").show();
            } else {
                $(".sxqq-qp").show();
            }
        })
        _self.carTag.on('mouseout', '.zscy-tag,.sxqq-tag', function() {
            var self = $(this);
            if (self.hasClass("zscy-tag")) {
                $(".zscy-qp").hide();
            } else {
                $(".sxqq-qp").hide();
            }
        })
        _self.initInfoDetail(); //编辑页时初始化回填逻辑

    }

    Ershouche_pic.prototype.setValue = function(picloc, picLocation, change) {
            this.picPromptElement.empty();
            //this.picPromptElement.html(this.opts.loadComplete);
            //上传手续齐全中的行驶证时要给yczbpic单元参数赋值
            //yczbpic1是伪造的参数只做前端展示来用
            //如果行驶证已验里面的行驶证照片没有上传
            //那么即使给yczbpic单元参数赋值了行驶证已验标签里面也不再做图片展示
            var yczbpic = Controller.records.get("yczbpic");
            var chapaihao = Controller.records.get('chapaihao');
            var yczbpic1 = Controller.records.get('yczbpic1');
            var chapaihao1 = Controller.records.get('chapaihao1');
            if (this.dataName == 'yczbpic1') {
                yczbpic.setValue(picloc)
                if (yczbpic.container.find(".carPicUploadImgContain").css('display') == "none") {
                    yczbpic.container.find(".carPicUploadImgContain").attr("src", '');
                    yczbpic.container.find(".delete_con").hide()
                }
            }
            //上传手续齐全中的车牌号时要给chepaihao单元参数赋值
            //chepaihao1是伪造的参数只做前端展示来用
            //如果行驶证已验里面的车牌号照片没有上传
            //那么即使给chepaiha单元参数赋值了行驶证已验标签里面也不再做图片展示
            if (this.dataName == 'chapaihao1') {
                chapaihao.setValue(picloc);
                if (chapaihao.container.find(".carPicUploadImgContain").css('display') == "none") {
                    chapaihao.container.find(".carPicUploadImgContain").attr("src", '');
                    chapaihao.container.find(".delete_con").hide()
                }
            }
            this.value = picloc;
            this.container.triggerHandler('change', [picloc, this]);
            picloc = picloc.replace(/(\.(jpg|jpeg|png|gif))$/, "_120_88$1");
            picloc = picloc.replace("http:", "");
            if (this.container.hasClass("yczbpic") && yczbpic1.container.find(".carPicUploadImgContain").attr("src") != "") {
                //上传行驶证标签里面的行驶证照片时如果手续齐全标签里面的行驶证照片已经上传
                //那么该次上传的行驶证照片同时覆盖手续齐全里面的行驶证照片

                this.imgElement.find(".carPicUploadImgContain").attr("src", picloc);
                yczbpic1.container.find(".carPicUploadImgContain").attr("src", picloc)

            } else if (this.container.hasClass("yczbpic1") && yczbpic.container.find(".carPicUploadImgContain").attr("src") != "") {
                //手续齐全标签里面的行驶证照片时如果行驶证已验标签里面的行驶证照片已经上传
                //那么该次上传的行驶证照片同时覆盖行驶证已验里面的行驶证照片

                this.imgElement.find(".carPicUploadImgContain").attr("src", picloc);
                yczbpic.container.find(".carPicUploadImgContain").attr("src", picloc)

            } else if (this.container.hasClass("chapaihao") && chapaihao1.container.find(".carPicUploadImgContain").attr("src") != "") {
                //上传行驶证标签里面的车牌号照片时如果手续齐全标签里面的车牌号照片已经上传
                //那么该次上传的车牌号照片同时覆盖手续齐全里面的车牌号照片

                this.imgElement.find(".carPicUploadImgContain").attr("src", picloc);
                chapaihao1.container.find(".carPicUploadImgContain").attr("src", picloc)

            } else if (this.container.hasClass("chapaihao1") && chapaihao.container.find(".carPicUploadImgContain").attr("src") != "") {
                //手续齐全标签里面的车牌号照片时如果行驶证已验标签里面的车牌号照片已经上传
                //那么该次上传的车牌号照片同时覆盖行驶证已验里面的车牌号照片

                this.imgElement.find(".carPicUploadImgContain").attr("src", picloc);
                chapaihao.container.find(".carPicUploadImgContain").attr("src", picloc)

            } else {
                this.imgElement.find(".carPicUploadImgContain").attr("src", picloc);
            }
            this.imgElement.find(".delete_con").show().css("display", "block"); //ie9show默认inline
            this.doCheck();
            var reallyCarInstance = Controller.records.get("reallyCar");
            var checkObj = reallyCarInstance.doCheckSxqq();
            if (checkObj.bValid) { //如果校验手续齐全校验失败了就不需要再次校验行驶证逻辑
                reallyCarInstance.doCheckxsz();
            }


        }
        //重写发布时行驶证已验的校验
    Ershouche_pic.prototype.doCheck = function() {
            //控制上海，杭州城市行驶证和VIN码照片必填逻辑
            var isBiz = $(".radio_wrap[name=faburen]").children("div[class*=focus]").attr("data-value")
            if (isBiz == "1" && businessData.isVipUser == false && (businessData.zhenche == true)) {
                /*商家用户上海vin码必填且行驶证vin码照片必填*/
                this.opts.sxqqRequire = true;
            }
            return { bValid: true, msg: '' };
        }
        /*
        @ 设置行驶证已验必填
        */
    ReallyCar.prototype.setXszRequire = function() {
            this.rows.addStar();
            this.opts.xszRequire = true; //设置行驶证必填
            if (!this.opts.sxqqRequire) { //手续齐全如果是必填，那么已经包含了行驶证必填的逻辑，就不再执行docheck
                this.doCheckxsz();
                this.unfoldedBtn.click();
                this.uploadTitle.find(".tab-car").click();
                //this.rows.containerElem.find(".rows_title_star").css("left","55px");
            }
        }
        /*
        @ 解除行驶证已验必填
        */
    ReallyCar.prototype.setUnXszRequire = function() {
        this.rows.removeStar();
        this.opts.xszRequire = false; //解除行驶证必填
        this.doCheckxsz();
    }
    ReallyCar.prototype.doCheckxsz = function() {
            var chapaihao = Controller.records.get("chapaihao").getValue();
            var yczbpic = Controller.records.get("yczbpic").getValue();
            var cldjz = Controller.records.get("dengjizheng").getValue();
            var gcfp = Controller.records.get("gouchefapiao").getValue();
            var yczbpic1 = Controller.records.get("yczbpic1").getValue();
            var vinInstance = Controller.records.get("vin");
            var checkObj = { bValid: true, msg: '' };
            var reallycarDom = Controller.records.get("reallyCar").container;
            if (this.opts.xszRequire) {
                //vin码重复或者上海杭州商家用户VIN码必填验证行驶证已验标签
                if ((!chapaihao && !yczbpic) || (chapaihao == "" && yczbpic == "") || (chapaihao != "" && yczbpic == "") || (chapaihao == "" && yczbpic != "")) {
                    /*两者都为空*/
                    var checkObj = { bValid: false, msg: '请验证行驶证已验标签。' }
                    var isBiz = $(".radio_wrap[name=faburen]").children("div[class*=focus]").attr("data-value")
                    if (isBiz == "1" && businessData.isVipUser == false && (businessData.zhenche == true)) { /*商家用户上海vin码必填且行驶证vin码照片必填*/

                        checkObj.msg = "请验证行驶证已验标签。";
                    }
                    this.showCheckTip(checkObj);
                    reallycarDom.find(".zscy-tag").removeClass("active")
                    if (reallycarDom.find(".tab-sxqq").hasClass("active")) {
                        //$(".postLabel_wrap .validate_error").hide()
                    }
                    return checkObj;
                } else {
                    reallycarDom.find(".zscy-tag").addClass("active"); //点亮标签
                    var checkObj = { bValid: true, msg: '' };
                    this.showCheckTip(checkObj);
                    vinInstance.doCheck(); //校验通过，取消掉vin下面的提示
                    return { bValid: true, msg: '' };
                }
            } else {
                //没有填写vin码时
                if (yczbpic != "" && chapaihao != "") {
                    reallycarDom.find(".zscy-tag").addClass("active")
                    var checkObj = { bValid: true, msg: '' };
                    this.showCheckTip(checkObj);
                    return checkObj;
                } else {
                    if (!reallycarDom.find(".sxqq-tag").hasClass("active")) {
                        reallycarDom.find(".zscy-tag").removeClass("active")
                    }
                    Controller.records.get("yczbpic").container.prev().removeClass("validate_success");
                    this.showCheckTip(checkObj);
                    return {
                        bValid: true,
                        msg: ''
                    };
                }

            }
            return checkObj;

        }
        /*
        @ 设置手续齐全标签必填
        */
    ReallyCar.prototype.setSxqqRequire = function() {
            //this.carTag
            //this.wholeContent
            this.rows.addStar();
            this.rows.containerElem.find(".rows_title_star").css("left", "225px");
            this.opts.sxqqRequire = true; //设置手续齐全必填
            this.uploadTitle[0].scrollIntoView();
            this.doCheckSxqq();
            this.unfoldedBtn.click();
            this.uploadTitle.find(".tab-sxqq").click();

        }
        /*
        @ 解除手续齐全标签必填
        */
    ReallyCar.prototype.setUnSxqqRequire = function() {
        this.rows.removeStar();
        this.opts.sxqqRequire = false; //解除行驶证必填
        this.doCheckSxqq();
        if (this.opts.xszRequire) { //解除手续齐全时，如果行驶证还存在必填逻辑，那么解除的时候再次校验行驶证必填逻辑
            this.setXszRequire();
        }
    }
    ReallyCar.prototype.doCheckSxqq = function() {
        var chapaihao = Controller.records.get("chapaihao").getValue();
        var yczbpic = Controller.records.get("yczbpic").getValue();
        var cldjz = Controller.records.get("dengjizheng").getValue();
        var gcfp = Controller.records.get("gouchefapiao").getValue();
        var yczbpic1 = Controller.records.get("yczbpic1").getValue();
        var MinPriceInstance = Controller.records.get("MinPrice");
        var checkObj = { bValid: true, msg: '' };
        if (this.opts.sxqqRequire) { //手续齐全触发低价发帖，需要必填
            if (yczbpic == "" || cldjz == "" || gcfp == "" || chapaihao == "") {
                checkObj.bValid = false;
                checkObj.msg = "价格低于市场价，如需发布请验证手续齐全标签";
            } else {
                MinPriceInstance.doCheck(); //校验通过，取消掉价格下面的提示
            }
        }
        /*检验标签点亮*/
        var reallycarDom = Controller.records.get("reallyCar").container;
        //判断手续齐全里面的证件是否全部上传 点亮行驶证和手续齐全标签
        if (cldjz != "" && gcfp != "" && yczbpic1 != "" && chapaihao != "") {
            reallycarDom.find(".sxqq-tag").addClass("active")
            reallycarDom.find(".zscy-tag").addClass("active")
        } else {
            if (yczbpic == "" || chapaihao == "" || (yczbpic == "" && chapaihao == "")) {
                reallycarDom.find(".zscy-tag").removeClass("active")
            }
            reallycarDom.find(".sxqq-tag").removeClass("active")
        }
        this.showCheckTip(checkObj);
        return checkObj;

    }
    ReallyCar.prototype.initInfoDetail = function() {
        //修改回填帖子标签,初始化标签3s后触发
        setTimeout(function() {
            //修改回填帖子标签
            /**
             *zcbqstate 00 01 02 10 11 12 20 21 22帖子审核状态 
             *0行驶证已验和手续齐全标签都没上传
             *1行驶证已验标签和手续齐全标签审核中
             *2行驶证已验标签和手续齐全标签审核通过
             */
            if (infoDetail.zcbqstate != undefined && infoDetail.zcbqstate != "") {
                //行驶证已验标签状态
                var zscyStatus = infoDetail.zcbqstate.substr(0, 1);
                //
                var sxquStatus = infoDetail.zcbqstate.substr(1, 2);
                var yczbpic = Controller.records.get("yczbpic");
                var chapaihao = Controller.records.get("chapaihao");
                var yczbpic1 = Controller.records.get("yczbpic1");
                var chapaihao1 = Controller.records.get("chapaihao1");
                var dengjizheng = Controller.records.get("dengjizheng");
                var gouchefapiao = Controller.records.get("gouchefapiao");
                var reallyCar = Controller.records.get("reallyCar").container;

                if (zscyStatus == 2 && sxquStatus == 2) {
                    //行驶证已验和手续齐全标签都审核通过
                    //隐藏“点亮标签，提升关注” 显示标签已审核
                    reallyCar.find(".tag-tip").hide();
                    reallyCar.find(".checked").addClass("showTag");
                } else if ((zscyStatus == 1 && (sxquStatus == 1 || sxquStatus == 2)) ||
                    (sxquStatus == 1 && (zscyStatus == 1 || zscyStatus == 2))) {
                    //当行驶证已验标签和手续齐全标签状态有一个是1时
                    //隐藏“点亮标签，提升关注” 显示标签审核中
                    reallyCar.find(".tag-tip").hide();
                    reallyCar.find(".check").addClass("showTag");
                } else {
                    //当标签状态全是0 显示“点亮标签，提升关注”
                    reallyCar.find(".tag-tip").addClass("showTag");
                    reallyCar.find(".check").hide();
                    reallyCar.find(".checked").hide();
                }

                if (sxquStatus != 0) {
                    //手续齐全标签上传那么必定回填行驶证已验标签并且两个帖子标签都会点亮
                    reallyCar.find(".zscy-tag").addClass("active");
                    reallyCar.find(".sxqq-tag").addClass("active");
                    //修改页面不让编辑图片所以隐藏图片删除按钮
                    //行驶证已验标签展示车牌号照片
                    chapaihao.container.find(".upload_xsz_tit").hide();
                    chapaihao.container.find(".carPicUploadImgContain").show();
                    chapaihao.container.find(".delete_con").hide();
                    //行驶证已验标签展示行驶证照片
                    yczbpic.container.find(".upload_xsz_tit").hide();
                    yczbpic.container.find(".carPicUploadImgContain").show();
                    yczbpic.container.find(".delete_con").hide();
                    //手续齐全标签展示车牌号照片
                    chapaihao1.container.find(".upload_xsz_tit").hide();
                    chapaihao1.container.find(".carPicUploadImgContain").show();
                    chapaihao1.container.find(".delete_con").hide();
                    chapaihao1.container.find(".carPicUploadImgContain").attr("src", chapaihao.getValue());
                    //手续齐全标签展示行驶证照片
                    yczbpic1.container.find(".upload_xsz_tit").hide();
                    yczbpic1.container.find(".carPicUploadImgContain").show();
                    yczbpic1.container.find(".delete_con").hide();
                    yczbpic1.container.find(".carPicUploadImgContain").attr("src", yczbpic.getValue());
                    //手续齐全标签展示车辆登记证书
                    dengjizheng.container.find(".upload_xsz_tit").hide();
                    dengjizheng.container.find(".carPicUploadImgContain").show();
                    dengjizheng.container.find(".delete_con").hide();
                    //手续齐全标签展示购车发票
                    gouchefapiao.container.find(".upload_xsz_tit").hide();
                    gouchefapiao.container.find(".carPicUploadImgContain").show();
                    gouchefapiao.container.find(".delete_con").hide();

                }
                if (zscyStatus != 0 && sxquStatus == 0) {
                    //只有行驶证已验标签上传只回填行驶证已验标签也只点亮行驶证已验标签
                    reallyCar.find(".zscy-tag").addClass("active");
                    //修改页面不让编辑图片所以隐藏图片删除按钮
                    //行驶证已验标签展示车牌号照片
                    chapaihao.container.find(".upload_xsz_tit").hide();
                    chapaihao.container.find(".carPicUploadImgContain").show();
                    chapaihao.container.find(".delete_con").hide();
                    //行驶证已验标签展示行驶证照片
                    yczbpic.container.find(".upload_xsz_tit").hide();
                    yczbpic.container.find(".carPicUploadImgContain").show();
                    yczbpic.container.find(".delete_con").hide();
                }
            }
        }, 3000)
    }
    ReallyCar.prototype.doCheck = function() {
        var _self = this;
        var chapaihao = Controller.records.get("chapaihao").getValue();
        var chapaihao1 = Controller.records.get("chapaihao1").getValue();
        var yczbpic = Controller.records.get("yczbpic").getValue();
        var cldjz = Controller.records.get("dengjizheng").getValue();
        var gcfp = Controller.records.get("gouchefapiao").getValue();
        var yczbpic1 = Controller.records.get("yczbpic1").getValue();
        var reallycarDom = Controller.records.get("reallyCar").container;
        var checkObj = { bValid: true, msg: '' };
        this.bValidState = this.bValidState || false;
        if (this.opts.sxqqRequire) { //手续齐全触发低价发帖，需要必填
            checkObj = this.doCheckSxqq();
        } else if (this.opts.xszRequire) { //VIN码重复或者上海杭州等城市行驶证vin码照片必填
            checkObj = this.doCheckxsz();
        }
        //当行驶证已验不是必填是触发 检验行驶证已验是否填写完整 - 校验手续齐全标签是否填写完整 
        //PC端点击“发布”按钮，标签材料不完整时弹窗提醒“帖子标签所需材料不完整，是否继续发布”
        //提供“完善标签、继续发布”选项，点击“完善标签”回到发布页，点击“继续发布”完成发布
        // else if((chapaihao !="" && yczbpic == "") || (chapaihao == "" && yczbpic != "")||
        //     ((yczbpic1 != "" || cldjz != "" || gcfp != "" || chapaihao1 != "") && (!reallycarDom.find(".sxqq-tag").hasClass("active")))){
        //     if(!this.bValidState){
        //         self.bValidState = true;
        //         var dialog = $('<div class="tiezibiaoqianWin"><div class="msg">帖子标签所需材料不完整，是否继续发布</div><div class="tool"><a class="change">完善标签</a><a class="publish">继续发布</a></div></div>');
        //         popwin.show("<span class='cbstitle' style='color:red'></span>", dialog, 400, 250, true, function(){});
        //         $(".tiezibiaoqianWin").closest(".contains").find(".closebtn").hide();
        //         dialog.find(".change").bind('click',funcloadingtion(){
        //             popwin.hide();
        //         })
        //         dialog.find(".publish").bind('click',function(){
        //             popwin.hide();
        //             _self.bValidState = true;
        //             Controller.triggerSubmit();
        //             _self.bValidState = false;
        //         })
        //         checkObj.bValid = false;
        //     }


        // }



        return checkObj;

    }
    return ReallyCar;
});
// 提取到入口文件
require(['component/block/js/block',
        'component/rows/js/rows',
        'component/inputText/js/inputText',
        'component/radio/js/radio',
        'component/radio_faburen/js/radio_faburen',
        'component/checkbox/js/checkbox',
        'component/editor/js/editor',
        'component/autoComplete/js/autoComplete',
        'component/selector/js/selector',
        'component/carImgUnload/js/carImgUnload',
        'component/rearLogin58/js/rearLogin58',
        'component/cubetg/js/cubetg',
        'component/submit/js/submit',
        'Controller/Controller',
        'component/preCheck/js/preCheck',
        'component/captcha/js/captcha',
        'component/textShow/js/textShow',
        'libs/json2.min',
        'util/postClickLog',
        'component/textarea/js/textarea',
        'component/customTag/js/customTag',
        'component/draft/js/draft',
        'component/text/js/text',
        'component/linkInput/js/linkInput',
        'util/errorLog',
        'component/qqInput/js/qqInput',
        'component/captchaInput/js/captchaInput',
        'component/limitpost/js/limitpost',
        'component/Volatile/js/Volatile',
        'component/privacy/js/privacy',
        'component/topTips/js/topTips',
        "component/carBrandSearch/js/carBrandSearch",
       
        "component/textarea_bcsm/js/textarea_bcsm",
        "component/colorPick/js/colorPick",
        "component/squareRadio/js/squareRadio",
        "component/ershouche_pic/js/ershouche_pic",
        "component/vin/js/vin",
        'category/ershouche/ershouche_format',
        'category/ershouche/ershouche_msgboard',
        'category/ershouche/setClickLog',
        'util/util',"component/tracker/js/tracker",
        "component/sunwukongTip/js/sunwukongTip",
        "component/citySelector/js/citySelector",
        "component/reallyCar/js/reallyCar"],
    function(Block, Rows, InputText, Radio,radio_faburen, Checkbox,Editor,AutoComplete, Selector, carImgUnload, RearLogin,
             CubeTg, Submit, Controller, Precheck, captcha,textShow, JSON, Log, TextArea, CustomTag, draft,
             Text, LinkInput, ErrorLog,qqInput,captChaInput,limitpost,volatile,privacy,topTips,carBrandSearch,textarea_bcsm,
             colorPick,squareRadio,ershouche_pic,vin,ershouche_format,msgBoard,setClickLog,util,tracker,sunwukongTip,citySelector,reallyCar) {

      
        var errorOption = {
            "from": "58clientErrorReport",
            "58clientPdType": "post",
            "clientErrorLocation": location.href || "unknown",
            "resultState": "failed",
            "client": "pc",
            "browserType": navigator.userAgent || "unknown",
            "clientErrorMsg": "unknown",
            "clientErrorUrl": "unknown",
            "clientErrorDate": "unknown",
            "clientErrorLine": "unknown",
            "clientErrorColum": 'unknown',
            "clientErrorStack": 'unknown'
        };
        function sendLog(errObj) {
            if(!errObj.url || errObj.url.indexOf('ershoufang_v') < 0) {
                return;
            }
            errorOption.clientErrorMsg = errObj.msg;
            errorOption.clientErrorUrl = errObj.url;
            errorOption.clientErrorLine = errObj.line;
            errorOption.clientErrorColum = errObj.column;
            errorOption.clientErrorStack = errObj.stack;
            errorOption.clientErrorDate = new Date().getTime();
            var sendStr = $.param(errorOption);
            Log.sendJson(sendStr);
        }
        ErrorLog.regist(sendLog);

        /*事前校验，黑名单 初始化旧版孙悟空逻辑 冻结等*/
        if(typeof showMsgData !== 'undefined' && Precheck.showMsg(showMsgData)) {
            return;
        }
        // 首先进行事前校验，如果返回true，则无需进行表单的初始化
        if(typeof iqasData !== 'undefined' && Precheck.execute(iqasData)) {
            return;
        }
        /*信息质量标准细则*/
        if(businessData&&businessData.NoticeShowState==0&&Precheck.showWin(businessData)){
        }
        if(extMap.wkLimitPost==true) Controller.limit = new limitpost();//孙悟空初始化前置校验登录
        // @todo 将全局变量抽出到一个单独的工具或者帮助类中，使用命名空间，防止污染全局变量
        if(typeof window.FE58 === 'undefined') {
            window.FE58 = {};
        }
        var compMap = {};
        function getConstructor(type, opts, data) {
            var F = compMap[type];
            if (!F) {
                F = require('component/' + type + '/js/' + type);
                compMap[type] = F;
            }
            return new F(opts, data);
        }
        //微信传图
        window.FE58.UEEditorDone = true;
        window.FE58.pageTrack = {};
        window.FE58.pageTrack.formStartTime = (new Date()).getTime();
        
        // tabIndex不能为1
        var tabIndex = 1;
        var i = j = k = 0;
        var block, row, base;
        var blockLength = formDefine.length;
        var rowLength, baseLength;
        // TODO 是否可以一行或者一个区域进行渲染
        for (; i < blockLength; i++) {
            // 区块
            blockOpt = formDefine[i];
            var block = new Block(blockOpt);
            block.render();
            rowLength = blockOpt.children.length;
            j = 0;
            for (; j < rowLength; j++) {
                // 行级
                rowsOpt = blockOpt.children[j];

                var rows = new Rows(rowsOpt);
                rows.render(block.contentElem);
                baseLength = rowsOpt.children.length;
                k = 0;
                for (; k < baseLength; k++) {
                    // 基本组件
                    var baseOpt = rowsOpt.children[k];
                    baseOpt.tabIndex = (tabIndex++);
                    var baseData = null;
                    var defaultValue = null;
                    try {
                        // 优先取dataName，如果没有dataName,则使用name
                        baseData = datasrc[baseOpt.dataName || baseOpt.name];
                        defaultValue = baseData&&baseData.defaultValue||baseOpt.defaultValue;
                    } catch (e) {
                        baseData = null;
                    }
                    
                    var instance = getConstructor(baseOpt.type, baseOpt, baseData);
                    //instance.lastInstance = lastInstance;
                    // 将校验状态初始化到rows上
                    rows.setValidateStatus(baseOpt.name, !baseOpt.checkRuler);
                    instance.rows = rows;
                    instance.block = block;
                    instance.render(rows.contentElem);
                    Controller.records.set(baseOpt.name, instance);
                    // 如果是修改页面，则不设置defaultValue
                    if(null != defaultValue) {
                        //QQ临时会话修改时也要默认值
                        if(baseOpt.name == 'qqlist'||typeof infoDetail === 'undefined'||(typeof infoDetail !== 'undefined'&&util.isNullObject(infoDetail))){//可能是{}
                            instance.setValue(defaultValue, '', 1);
                        }
                    }
                    if(baseOpt.observe) {
                        Controller.anylizeObserve(baseOpt.name, baseOpt.observe);
                    }

                    /*统计组件时长--start*/
                    if(baseOpt&&baseOpt.timeRuler){
                        Log.recordTime(instance,baseOpt.timeRuler,Controller);
                    }
                    /*统计组件时长--end*/
                }
            }
        }
        // 初始化草稿箱功能
        /*var draftTimeId = setInterval(function () {
            if (window.FE58.UEEditorDone === true) {
                try {
                    draft.init(____json4fe.catentry[1].dispid, ____json4fe.locallist.dispid, 'pc', window.GTID, '#postForm');
                } catch (e) {
                }
                clearInterval(draftTimeId);
                draftTimeId = null;
            }
        }, 300);*/
        // 最后增加自身的提交
        block = new Block();
        block.render();
        block.hideTitle();
        rows = new Rows();
        rows.render(block.contentElem);
        var instance = new Submit();
        instance.rows = rows;
        instance.block = block;
        Controller.setSubmit(instance);
        instance.render(rows.contentElem);

        /*if(businessData.carAddress&&businessData.carAddress != ""){
            Controller.records.get("caraddress").setValue(businessData.carAddress);
        }*/

        if(businessData.goblianxiren&&businessData.goblianxiren != ""){
            Controller.records.get("goblianxiren").setValue(businessData.goblianxiren);
        }
        if(extMap.wkLimitPost==true) Controller.limit.initEventBind();//绑定手机校验验证码功能
        //$(window.document).triggerHandler("pageOnload");
        window.pageOnloadAction();
        window.pageOnloadSetLog();
        /*增加埋点信息-----start*/
        window.FE58.pageTrack.formEnd = (new Date()).getTime();
        var formTimeId = setInterval(function(){
            if(typeof window.clickLog === 'function') {
                Log.sendJson('from=Post_TriggerEventTime&key=formEnd&eventTime=' + window.FE58.pageTrack.formEnd);
                Log.sendJson('from=Post_TriggerEventTime&key=formStart&eventTime=' + window.FE58.pageTrack.formStartTime);
                clearInterval(formTimeId);
                formTimeId = null;
                $(top).scrollTop(0);
            }
        }, 300);
        /*增加埋点信息-----end*/
        /*实例化行为监控*/
        var track = new tracker();

          //整个页面统计时间--start
        var postLog = 'fbsc';
        Log.postscSendLog(postLog);
        //整个页面统计时间--end
    });
define("category/ershouche/ershouche", function(){});

