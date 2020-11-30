$(function() {
	var wh = window.innerHeight;
	$(".swiper-container,.swiper-container1").css({
		"height": wh + "px"
	});
	var mySwiper = new Swiper('.swiper-container', {
		direction: 'vertical',
		//      effect:'cube',
		touchMoveStopPropagation: false,
		on: {
			progress: function(progress) {
				if(progress >= 1) {
					$(".bottomArrow").hide();

				} else {
					$(".bottomArrow").show();

				}
			},
			slideChange:function(){
				var index = mySwiper.realIndex;
				if(progressMark)
				$(".swiper-slide").eq(index).addClass("show").siblings().removeClass("show")
					console.log(index)
				if(index==2){
					$(".himg img").on("transitionend",an3)
					an3();
					$(".bigimg").addClass("hide").removeClass("opacity0")
				}
			}
		}
	})
	
	$(".bottomArrow").click(function(){
		mySwiper.slideNext()
	})

	
	
	function an3(){
		var len = $(".himg img").not(".simg").length;
		console.log(len)
		if(len>0){
			var index = Math.floor(Math.random()*len)
			console.log(index)
			$(".s3bg").attr('src',$(".himg img").not(".simg").eq(index).attr("src"))
			$(".himg img").not(".simg").eq(index).addClass("simg");
//			setTimeout(an3,500)
		}
	}

	
});

/**
     * 禁用动态添加脚本，防止广告加载
     *
     * @param valid bool? true(valid)|false(invalid)|other(off)
     * @param rule array 配置允许(valid)|不允许(invalid)的脚本规则：支持regex、string、function
     */
    (function (valid, rule) {
        if (typeof Element === 'undefined'){
//      	console.log('IE8以下浏览器无效');
        } 
        var origin = new RegExp('^' + location.origin),
                Ele = Element;
        each(['appendChild', 'insertBefore', 'insertAfter'], proxy);

        function proxy(prop) {
            var proxy_obj = Ele.prototype[prop];
            Ele.prototype[prop] = function (elem) {
                if (elem.children && !elem.children.length) {
                    var tag = elem.tagName.toLowerCase();
                    if (tag == 'script' && isBanScript(elem)) {
//                      console.log('禁用脚本：' + elem.src);
                        var substitute = document.createElement('script');
                        substitute.innerHTML = '// 禁用脚本：' + elem.src;
                        elem = substitute;
                    }
                }
                return proxy_obj.apply(this, arguments);
            };
        }

        function isBanScript(script) {
//          if (origin.test(script.src)) return false;
			for(var i =0;i<rule.length;i++){
				if(script.src.indexOf(rule[i])>=0){
					return false;
				}
			}
            if (origin.test(script.src)) return false;
            return valid === each(rule, match);

            function match(val) {
                var type = typeof val;
                if (type === 'string') {
                    if (script.src == val) return true;
                } else if (type === 'function') {
                    if (val(script)) return true;
                } else {
                    if (val.test(script.src)) return true;
                }
                return false;
            }
        }

        function each(arr, fn) {
            if (arr) {
                for (var i = 0, n = arr.length; i < n; i++) {
                    if (fn.call(arr[i], arr[i], i) === true) return false;
                }
            }
            return true;
        }
    })(true, []);