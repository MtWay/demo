! function(a) {
	function b(d) {
		if(c[d]) return c[d].exports;
		var e = c[d] = {
			exports: {},
			id: d,
			loaded: !1
		};
		return a[d].call(e.exports, e, e.exports, b), e.loaded = !0, e.exports
	}
	var c = {};
	return b.m = a, b.c = c, b.p = "", b(0)
}({
	0: function(a, b, c) {
		"use strict";

		function d() {
			var a = f.createElement("div");
			a.id = "page-slogan", a.innerHTML = "<span><b>&copy;</b> 淘宝（中国）软件有限公司</span>", f.body.appendChild(a);
			var b = !1,
				c = setTimeout(function() {
					if(!b) {
						var c = f.createElement("div");
						c.id = "reload", c.innerHTML = '<a href="javascript:location.reload()">获取数据失败，请稍后访问</a>', a.appendChild(c)
					}
				}, 6e3);
			e.CloseSlogan = function() {
				b = !0, clearTimeout(c), sessionStorage.setItem("MTB_H5INDEX_slogan", "true"), a.parentNode && a.parentNode.removeChild(a)
			}
		}
		c(39);
		var e = window,
			f = e.document,
			g = e.location,
			h = e.navigator.userAgent,
			i = !!h.match(/IEMobile/),
			j = !!h.match(/UCBrowser/),
			k = !!h.match(/iPod|iPhone/);
		i && g.href.indexOf("index-ie.html") < 0 && g.replace("//h5.m.taobao.com/index-ie.html"), !i && g.hash.indexOf("autocomplete") > 0 && g.replace("#index"), j && k && ! function() {
			var a = function() {
				setTimeout(function() {
					var a = window.innerHeight + "px";
					console && console.log(a), document.documentElement.style.height = a;
					var b = document.querySelector('.view[name="index"]');
					b && (b.style.height = a)
				}, 10)
			};
			document.addEventListener("DOMContentLoaded", a), window.addEventListener("resize", a), window.addEventListener("load", function() {
				app.navigation.delegate(function(b) {
					"navigation:start" === b && a()
				}), a()
			}), a()
		}();
		var l, m = !1;
		(l = g.hostname.match(/\.(wapa|waptest)\.taobao\.com$/)) && (m = l[1]), e.TestEnv = m;
		try {
			e.sessionStorage.setItem("@private", "false");
			var n = !!e.sessionStorage.getItem("MTB_H5INDEX_slogan");
			n || d()
		} catch(o) {}
	},
	3: function(a, b) {
		a.exports = function() {
			var a = [];
			return a.toString = function() {
				for(var a = [], b = 0; b < this.length; b++) {
					var c = this[b];
					c[2] ? a.push("@media " + c[2] + "{" + c[1] + "}") : a.push(c[1])
				}
				return a.join("")
			}, a.i = function(b, c) {
				"string" == typeof b && (b = [
					[null, b, ""]
				]);
				for(var d = {}, e = 0; e < this.length; e++) {
					var f = this[e][0];
					"number" == typeof f && (d[f] = !0)
				}
				for(e = 0; e < b.length; e++) {
					var g = b[e];
					"number" == typeof g[0] && d[g[0]] || (c && !g[2] ? g[2] = c : c && (g[2] = "(" + g[2] + ") and (" + c + ")"), a.push(g))
				}
			}, a
		}
	},
	4: function(a, b, c) {
		function d(a, b) {
			for(var c = 0; c < a.length; c++) {
				var d = a[c],
					e = l[d.id];
				if(e) {
					e.refs++;
					for(var f = 0; f < e.parts.length; f++) e.parts[f](d.parts[f]);
					for(; f < d.parts.length; f++) e.parts.push(h(d.parts[f], b))
				} else {
					for(var g = [], f = 0; f < d.parts.length; f++) g.push(h(d.parts[f], b));
					l[d.id] = {
						id: d.id,
						refs: 1,
						parts: g
					}
				}
			}
		}

		function e(a) {
			for(var b = [], c = {}, d = 0; d < a.length; d++) {
				var e = a[d],
					f = e[0],
					g = e[1],
					h = e[2],
					i = e[3],
					j = {
						css: g,
						media: h,
						sourceMap: i
					};
				c[f] ? c[f].parts.push(j) : b.push(c[f] = {
					id: f,
					parts: [j]
				})
			}
			return b
		}

		function f() {
			var a = document.createElement("style"),
				b = o();
			return a.type = "text/css", b.appendChild(a), a
		}

		function g() {
			var a = document.createElement("link"),
				b = o();
			return a.rel = "stylesheet", b.appendChild(a), a
		}

		function h(a, b) {
			var c, d, e;
			if(b.singleton) {
				var h = q++;
				c = p || (p = f()), d = i.bind(null, c, h, !1), e = i.bind(null, c, h, !0)
			} else a.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (c = g(), d = k.bind(null, c), e = function() {
				c.parentNode.removeChild(c), c.href && URL.revokeObjectURL(c.href)
			}) : (c = f(), d = j.bind(null, c), e = function() {
				c.parentNode.removeChild(c)
			});
			return d(a),
				function(b) {
					if(b) {
						if(b.css === a.css && b.media === a.media && b.sourceMap === a.sourceMap) return;
						d(a = b)
					} else e()
				}
		}

		function i(a, b, c, d) {
			var e = c ? "" : d.css;
			if(a.styleSheet) a.styleSheet.cssText = r(b, e);
			else {
				var f = document.createTextNode(e),
					g = a.childNodes;
				g[b] && a.removeChild(g[b]), g.length ? a.insertBefore(f, g[b]) : a.appendChild(f)
			}
		}

		function j(a, b) {
			var c = b.css,
				d = b.media;
			b.sourceMap;
			if(d && a.setAttribute("media", d), a.styleSheet) a.styleSheet.cssText = c;
			else {
				for(; a.firstChild;) a.removeChild(a.firstChild);
				a.appendChild(document.createTextNode(c))
			}
		}

		function k(a, b) {
			var c = b.css,
				d = (b.media, b.sourceMap);
			d && (c += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(d)))) + " */");
			var e = new Blob([c], {
					type: "text/css"
				}),
				f = a.href;
			a.href = URL.createObjectURL(e), f && URL.revokeObjectURL(f)
		}
		var l = {},
			m = function(a) {
				var b;
				return function() {
					return "undefined" == typeof b && (b = a.apply(this, arguments)), b
				}
			},
			n = m(function() {
				return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())
			}),
			o = m(function() {
				return document.head || document.getElementsByTagName("head")[0]
			}),
			p = null,
			q = 0;
		a.exports = function(a, b) {
			b = b || {}, "undefined" == typeof b.singleton && (b.singleton = n());
			var c = e(a);
			return d(c, b),
				function(a) {
					for(var f = [], g = 0; g < c.length; g++) {
						var h = c[g],
							i = l[h.id];
						i.refs--, f.push(i)
					}
					if(a) {
						var j = e(a);
						d(j, b)
					}
					for(var g = 0; g < f.length; g++) {
						var i = f[g];
						if(0 === i.refs) {
							for(var k = 0; k < i.parts.length; k++) i.parts[k]();
							delete l[i.id]
						}
					}
				}
		};
		var r = function() {
			var a = [];
			return function(b, c) {
				return a[b] = c, a.filter(Boolean).join("\n")
			}
		}()
	},
	39: function(a, b, c) {
		var d = c(40);
		"string" == typeof d && (d = [
			[a.id, d, ""]
		]);
		c(4)(d, {});
		d.locals && (a.exports = d.locals)
	},
	40: function(a, b, c) {
		b = a.exports = c(3)(), b.push([a.id, 'html {\n  background-color: #ff5500;\n}\n#page-slogan {\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  background-image: url(data:image/jpg;base64,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);\n  background-position: center 5.71875rem;\n  background-repeat: no-repeat;\n  background-size: 5.0625rem 3.75rem;\n  background-color: #ff5500;\n  z-index: 999999999;\n}\n#page-slogan span {\n  display: block;\n  width: 100%;\n  bottom: 0.625rem;\n  text-align: center;\n  line-height: 1.5em;\n  color: #fffdfb;\n  position: absolute;\n  font-size: 12px;\n}\n[data-dpr="1"] #page-slogan span {\n  font-size: 12px;\n}\n[data-dpr="2"] #page-slogan span {\n  font-size: 24px;\n}\n[data-dpr="3"] #page-slogan span {\n  font-size: 36px;\n}\n#page-slogan #reload {\n  width: 100%;\n  position: absolute;\n  text-align: center;\n  top: 0.2rem;\n}\n#page-slogan #reload a {\n  color: #FFF;\n  font-size: 16px;\n  text-decoration: none;\n}\n[data-dpr="1"] #page-slogan #reload a {\n  font-size: 16px;\n}\n[data-dpr="2"] #page-slogan #reload a {\n  font-size: 32px;\n}\n[data-dpr="3"] #page-slogan #reload a {\n  font-size: 48px;\n}\n', ""])
	}
});
! function(a) {
	a.H5INDEX_TEMPLATE = {
		t122016huichang: function(a) {
			var b = '<div style="box-sizing: border-box; line-height: 0; width: 10rem; height: 3.013rem; background-color: rgba(255, 255, 255, 0); position: relative; background-position: initial initial; background-repeat: initial initial;"><div class=" UIView" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 3.013rem; position: absolute;"></div><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 3.013rem; position: absolute;"><div style="box-sizing: border-box; line-height: 0; margin-top: 0.08rem; margin-left: 0.133rem; width: 2.373rem; height: 2.933rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 2.373rem; height: 2.933rem; background-color: rgba(255, 255, 255, 0); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a18526-0" style="box-sizing: border-box; line-height: 0.64rem; text-align: center; font-weight: bold; font-size: 0.37333333333333335rem; color: rgb(0, 0, 0); background-color: transparent; margin-top: 0.053rem; width: 2.373rem; height: 0.64rem;"></div><div id="a13779-1" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-left: 0.3rem; width: 1.773rem; height: 1.72rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a17276-2" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; margin-top: 2.293rem; margin-left: 0.127rem; width: 2.12rem; height: 0.48rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a10407-3" style="box-sizing: border-box; line-height: 0.48rem; text-align: center; font-size: 0.29333333333333333rem; color: rgb(255, 255, 255); background-color: transparent; margin-top: 2.293rem; margin-left: 0.127rem; width: 2.12rem; height: 0.48rem; position: absolute;"></div><div id="a9861-4" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 2.373rem; height: 2.933rem; z-index: 1; position: absolute;"></div></div><div style="box-sizing: border-box; line-height: 0; margin-top: 0.08rem; margin-left: 0.08rem; width: 2.373rem; height: 2.933rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 2.373rem; height: 2.933rem; background-color: rgba(255, 255, 255, 0); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a16540-5" style="box-sizing: border-box; line-height: 0.64rem; text-align: center; font-weight: bold; font-size: 0.37333333333333335rem; color: rgb(0, 0, 0); background-color: transparent; margin-top: 0.053rem; width: 2.373rem; height: 0.64rem;"></div><div id="a12128-6" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-left: 0.3rem; width: 1.773rem; height: 1.72rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a18671-7" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; margin-top: 2.293rem; margin-left: 0.127rem; width: 2.12rem; height: 0.48rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a14172-8" style="box-sizing: border-box; line-height: 0.48rem; text-align: center; font-size: 0.29333333333333333rem; color: rgb(255, 255, 255); background-color: transparent; margin-top: 2.293rem; margin-left: 0.127rem; width: 2.12rem; height: 0.48rem; position: absolute;"></div><div id="a12053-9" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 2.373rem; height: 2.933rem; z-index: 1; position: absolute;"></div></div><div style="box-sizing: border-box; line-height: 0; margin-top: 0.08rem; margin-left: 0.08rem; width: 2.373rem; height: 2.933rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 2.373rem; height: 2.933rem; background-color: rgba(255, 255, 255, 0); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a9575-10" style="box-sizing: border-box; line-height: 0.64rem; text-align: center; font-weight: bold; font-size: 0.37333333333333335rem; color: rgb(0, 0, 0); background-color: transparent; margin-top: 0.053rem; width: 2.373rem; height: 0.64rem;"></div><div id="a11559-11" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-left: 0.3rem; width: 1.773rem; height: 1.72rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a16670-12" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; margin-top: 2.293rem; margin-left: 0.127rem; width: 2.12rem; height: 0.48rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a13997-13" style="box-sizing: border-box; line-height: 0.48rem; text-align: center; font-size: 0.29333333333333333rem; color: rgb(255, 255, 255); background-color: transparent; margin-top: 2.293rem; margin-left: 0.127rem; width: 2.12rem; height: 0.48rem; position: absolute;"></div><div id="a11528-14" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 2.373rem; height: 2.933rem; z-index: 1; position: absolute;"></div></div><div style="box-sizing: border-box; line-height: 0; margin-top: 0.08rem; margin-left: 0.08rem; width: 2.373rem; height: 2.933rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 2.373rem; height: 2.933rem; background-color: rgba(255, 255, 255, 0); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a11431-15" style="box-sizing: border-box; line-height: 0.64rem; text-align: center; font-weight: bold; font-size: 0.37333333333333335rem; color: rgb(0, 0, 0); background-color: transparent; margin-top: 0.053rem; width: 2.373rem; height: 0.64rem;"></div><div id="a18911-16" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-left: 0.3rem; width: 1.773rem; height: 1.72rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a11386-17" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; margin-top: 2.293rem; margin-left: 0.127rem; width: 2.12rem; height: 0.48rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a16569-18" style="box-sizing: border-box; line-height: 0.48rem; text-align: center; font-size: 0.29333333333333333rem; color: rgb(255, 255, 255); background-color: transparent; margin-top: 2.293rem; margin-left: 0.127rem; width: 2.12rem; height: 0.48rem; position: absolute;"></div><div id="a14819-19" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 2.373rem; height: 2.933rem; z-index: 1; position: absolute;"></div></div></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "t122016huichang"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a18526-0").textContent = a[0].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a13779-1").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a17276-2").setAttribute("data-image", a[0].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10407-3").textContent = a[0].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a9861-4").setAttribute("data-href", a[0].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a16540-5").textContent = a[1].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a12128-6").setAttribute("data-image", a[1].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a18671-7").setAttribute("data-image", a[1].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a14172-8").textContent = a[1].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a12053-9").setAttribute("data-href", a[1].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a9575-10").textContent = a[2].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a11559-11").setAttribute("data-image", a[2].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a16670-12").setAttribute("data-image", a[2].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a13997-13").textContent = a[2].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a11528-14").setAttribute("data-href", a[2].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a11431-15").textContent = a[3].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a18911-16").setAttribute("data-image", a[3].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a11386-17").setAttribute("data-image", a[3].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a16569-18").textContent = a[3].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a14819-19").setAttribute("data-href", a[3].targetUrl)
			} catch(d) {}
			return c
		},
		t112016header: function(a) {
			var b = '<div style="box-sizing: border-box; line-height: 0; width: 10rem; height: 0.947rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div id="a13371-0" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 0.947rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "t112016header"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a13371-0").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			return c
		},
		t122016renqun: function(a) {
			var b = '<div style="box-sizing: border-box; line-height: 0; width: 10rem; height: 5.187rem; position: relative;"><div class=" UIView" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 5.187rem; position: absolute;"></div><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 5.187rem; position: absolute;"><div style="box-sizing: border-box; line-height: 0; margin-top: 0.16rem; margin-left: 0.133rem; margin-right: 0.133rem; width: 9.733rem; height: 1.867rem; background-color: rgba(255, 255, 255, 0); position: relative; background-position: initial initial; background-repeat: initial initial;"><div id="a10373-0" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 9.733rem; height: 1.867rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a17718-1" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; margin-top: 0.187rem; margin-left: 7.573rem; width: 1.493rem; height: 1.493rem; z-index: 1; background-size: contain; position: absolute; background-repeat: no-repeat no-repeat;"></div><div id="a19278-2" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.72rem; margin-left: 9.28rem; width: 0.267rem; height: 0.427rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a18946-3" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 9.733rem; height: 1.867rem; z-index: 1; position: absolute;"></div></div><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 3.16rem;"><div style="box-sizing: border-box; line-height: 0; margin-left: 0.133rem; width: 2.373rem; height: 3.16rem; position: relative;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 2.373rem; height: 2.52rem; background-color: rgb(255, 255, 255); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a12759-4" style="box-sizing: border-box; line-height: 0.64rem; text-align: center; font-weight: bold; font-size: 0.37333333333333335rem; background-color: transparent; margin-top: 0.107rem; width: 2.373rem; height: 0.64rem;"></div><div id="a13238-5" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-left: 0.3rem; width: 1.773rem; height: 1.72rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a15941-6" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; margin-top: 2.52rem; width: 2.373rem; height: 0.64rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a17355-7" style="box-sizing: border-box; line-height: 0.507rem; text-align: center; font-size: 0.29333333333333333rem; color: rgb(255, 255, 255); background-color: transparent; margin-top: 2.653rem; width: 2.373rem; height: 0.507rem; position: absolute;"></div><div id="a17755-8" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 2.373rem; height: 3.16rem; z-index: 1; position: absolute;"></div></div><div style="box-sizing: border-box; line-height: 0; margin-left: 0.08rem; width: 2.373rem; height: 3.16rem; position: relative;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 2.373rem; height: 2.52rem; background-color: rgb(255, 255, 255); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a10190-9" style="box-sizing: border-box; line-height: 0.64rem; text-align: center; font-weight: bold; font-size: 0.37333333333333335rem; background-color: transparent; margin-top: 0.107rem; width: 2.373rem; height: 0.64rem;"></div><div id="a18599-10" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-left: 0.3rem; width: 1.773rem; height: 1.72rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a15552-11" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; margin-top: 2.52rem; width: 2.373rem; height: 0.64rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a13664-12" style="box-sizing: border-box; line-height: 0.507rem; text-align: center; font-size: 0.29333333333333333rem; color: rgb(255, 255, 255); background-color: transparent; margin-top: 2.653rem; width: 2.373rem; height: 0.507rem; position: absolute;"></div><div id="a10870-13" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 2.373rem; height: 3.16rem; z-index: 1; position: absolute;"></div></div><div style="box-sizing: border-box; line-height: 0; margin-left: 0.08rem; width: 2.373rem; height: 3.16rem; position: relative;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 2.373rem; height: 2.52rem; background-color: rgb(255, 255, 255); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a19862-14" style="box-sizing: border-box; line-height: 0.64rem; text-align: center; font-weight: bold; font-size: 0.37333333333333335rem; background-color: transparent; margin-top: 0.107rem; width: 2.373rem; height: 0.64rem;"></div><div id="a14941-15" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-left: 0.3rem; width: 1.773rem; height: 1.72rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a11979-16" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; margin-top: 2.52rem; width: 2.373rem; height: 0.64rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a14119-17" style="box-sizing: border-box; line-height: 0.507rem; text-align: center; font-size: 0.29333333333333333rem; color: rgb(255, 255, 255); background-color: transparent; margin-top: 2.653rem; width: 2.373rem; height: 0.507rem; position: absolute;"></div><div id="a10399-18" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 2.373rem; height: 3.16rem; z-index: 1; position: absolute;"></div></div><div style="box-sizing: border-box; line-height: 0; margin-left: 0.08rem; width: 2.373rem; height: 3.16rem; position: relative;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 2.373rem; height: 2.52rem; background-color: rgb(255, 255, 255); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a10098-19" style="box-sizing: border-box; line-height: 0.64rem; text-align: center; font-weight: bold; font-size: 0.37333333333333335rem; background-color: transparent; margin-top: 0.107rem; width: 2.373rem; height: 0.64rem;"></div><div id="a12812-20" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-left: 0.3rem; width: 1.773rem; height: 1.72rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a14153-21" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; margin-top: 2.52rem; width: 2.373rem; height: 0.64rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a18262-22" style="box-sizing: border-box; line-height: 0.507rem; text-align: center; font-size: 0.29333333333333333rem; color: rgb(255, 255, 255); background-color: transparent; margin-top: 2.653rem; width: 2.373rem; height: 0.507rem; position: absolute;"></div><div id="a14941-23" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 2.373rem; height: 3.16rem; z-index: 1; position: absolute;"></div></div></div></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "t122016renqun"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a10373-0").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a17718-1").setAttribute("data-image", a[0].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a19278-2").setAttribute("data-image", a[0].imageUrl[2].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a18946-3").setAttribute("data-href", a[0].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a12759-4").style.color = a[1].title[2].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a12759-4").textContent = a[1].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a13238-5").setAttribute("data-image", a[1].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a15941-6").setAttribute("data-image", a[1].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a17355-7").textContent = a[1].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a17755-8").setAttribute("data-href", a[1].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10190-9").style.color = a[2].title[2].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a10190-9").textContent = a[2].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a18599-10").setAttribute("data-image", a[2].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a15552-11").setAttribute("data-image", a[2].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a13664-12").textContent = a[2].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a10870-13").setAttribute("data-href", a[2].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a19862-14").style.color = a[3].title[2].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a19862-14").textContent = a[3].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a14941-15").setAttribute("data-image", a[3].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a11979-16").setAttribute("data-image", a[3].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a14119-17").textContent = a[3].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a10399-18").setAttribute("data-href", a[3].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10098-19").style.color = a[4].title[2].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a10098-19").textContent = a[4].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a12812-20").setAttribute("data-image", a[4].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a14153-21").setAttribute("data-image", a[4].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a18262-22").textContent = a[4].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a14941-23").setAttribute("data-href", a[4].targetUrl)
			} catch(d) {}
			return c
		},
		t122016boarder: function(a) {
			var b = '<div style="box-sizing: border-box; line-height: 0; width: 10rem; height: 0.16rem; background-color: rgba(255, 255, 255, 0); position: relative; background-position: initial initial; background-repeat: initial initial;"><div class=" UIView" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 0.16rem; position: absolute;"></div></div>',
				c = document.createElement("div");
			return c.setAttribute("data-template-name", "t122016boarder"), c.style.position = "relative", c.innerHTML = b, c
		},
		t122016huodong: function(a) {
			var b = '<div style="box-sizing: border-box; line-height: 0; width: 10rem; height: 3.013rem; background-color: rgba(255, 255, 255, 0); position: relative; background-position: initial initial; background-repeat: initial initial;"><div class=" UIView" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 3.013rem; position: absolute;"></div><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; margin-top: 0.08rem; margin-left: 0.133rem; width: 9.867rem; height: 2.933rem; background-color: rgba(255, 255, 255, 0); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div style="box-sizing: border-box; line-height: 0; width: 2.373rem; height: 2.933rem; position: relative;"><div id="a8393-0" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 2.373rem; height: 2.933rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a6040-1" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 2.373rem; height: 2.933rem; z-index: 1; position: absolute;"></div></div><div style="box-sizing: border-box; line-height: 0; margin-left: 0.08rem; width: 2.373rem; height: 2.933rem; position: relative;"><div id="a3191-2" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 2.373rem; height: 2.933rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a7010-3" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 2.373rem; height: 2.933rem; z-index: 1; position: absolute;"></div></div><div style="box-sizing: border-box; line-height: 0; margin-left: 0.08rem; width: 2.373rem; height: 2.933rem; position: relative;"><div id="a5091-4" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 2.373rem; height: 2.933rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a9296-5" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 2.373rem; height: 2.933rem; z-index: 1; position: absolute;"></div></div><div style="box-sizing: border-box; line-height: 0; margin-left: 0.08rem; width: 2.373rem; height: 2.933rem; position: relative;"><div id="a1386-6" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 2.373rem; height: 2.933rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a4795-7" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 2.373rem; height: 2.933rem; z-index: 1; position: absolute;"></div></div></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "t122016huodong"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a8393-0").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a6040-1").setAttribute("data-href", a[0].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a3191-2").setAttribute("data-image", a[1].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a7010-3").setAttribute("data-href", a[1].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a5091-4").setAttribute("data-image", a[2].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a9296-5").setAttribute("data-href", a[2].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a1386-6").setAttribute("data-image", a[3].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a4795-7").setAttribute("data-href", a[3].targetUrl)
			} catch(d) {}
			return c
		},
		tentrance10: function(a) {
			var b = '<div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 4.594rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; margin-left: 0.359rem; width: 9.641rem; height: 2.125rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div style="box-sizing: border-box; line-height: 0; margin-left: 0.047rem; width: 1.813rem; height: 2.125rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div id="a1963-0" class=" UIButton" style="box-sizing: border-box; line-height: 0; width: 1.844rem; height: 2.125rem; z-index: 1; position: absolute;"></div><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; margin-left: 0.047rem; width: 1.625rem; height: 2.125rem; position: absolute;"><div id="a5177-1" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.313rem; width: 1.625rem; height: 1.141rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a9881-2" style="box-sizing: border-box; line-height: 0.688rem; text-align: center; font-size: 0.32rem; color: rgb(102, 102, 102); background-color: transparent; width: 1.625rem; height: 0.688rem;"></div></div></div><div style="box-sizing: border-box; line-height: 0; margin-left: 0.047rem; width: 1.813rem; height: 2.125rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div id="a9944-3" class=" UIButton" style="box-sizing: border-box; line-height: 0; width: 1.844rem; height: 2.125rem; z-index: 1; position: absolute;"></div><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; margin-left: 0.047rem; width: 1.625rem; height: 2.125rem; position: absolute;"><div id="a2410-4" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.313rem; width: 1.625rem; height: 1.141rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a5893-5" style="box-sizing: border-box; line-height: 0.688rem; text-align: center; font-size: 0.32rem; color: rgb(102, 102, 102); background-color: transparent; width: 1.625rem; height: 0.688rem;"></div></div></div><div style="box-sizing: border-box; line-height: 0; margin-left: 0.047rem; width: 1.813rem; height: 2.125rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div id="a7001-6" class=" UIButton" style="box-sizing: border-box; line-height: 0; width: 1.844rem; height: 2.125rem; z-index: 1; position: absolute;"></div><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; margin-left: 0.047rem; width: 1.625rem; height: 2.125rem; position: absolute;"><div id="a6118-7" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.313rem; width: 1.625rem; height: 1.141rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a4761-8" style="box-sizing: border-box; line-height: 0.688rem; text-align: center; font-size: 0.32rem; color: rgb(102, 102, 102); background-color: transparent; width: 1.625rem; height: 0.688rem;"></div></div></div><div style="box-sizing: border-box; line-height: 0; margin-left: 0.047rem; width: 1.813rem; height: 2.125rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div id="a3250-9" class=" UIButton" style="box-sizing: border-box; line-height: 0; width: 1.844rem; height: 2.125rem; z-index: 1; position: absolute;"></div><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; margin-left: 0.047rem; width: 1.625rem; height: 2.125rem; position: absolute;"><div id="a4150-10" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.313rem; width: 1.625rem; height: 1.141rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a4117-11" style="box-sizing: border-box; line-height: 0.688rem; text-align: center; font-size: 0.32rem; color: rgb(102, 102, 102); background-color: transparent; width: 1.625rem; height: 0.688rem;"></div></div></div><div style="box-sizing: border-box; line-height: 0; margin-left: 0.047rem; width: 1.813rem; height: 2.125rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div id="a2945-12" class=" UIButton" style="box-sizing: border-box; line-height: 0; width: 1.844rem; height: 2.125rem; z-index: 1; position: absolute;"></div><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; margin-left: 0.047rem; width: 1.625rem; height: 2.125rem; position: absolute;"><div id="a5049-13" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.313rem; width: 1.625rem; height: 1.141rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a7943-14" style="box-sizing: border-box; line-height: 0.688rem; text-align: center; font-size: 0.32rem; color: rgb(102, 102, 102); background-color: transparent; width: 1.625rem; height: 0.688rem;"></div></div></div></div><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; margin-left: 0.359rem; width: 9.641rem; height: 2.125rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div style="box-sizing: border-box; line-height: 0; margin-left: 0.047rem; width: 1.813rem; height: 2.125rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div id="a5520-15" class=" UIButton" style="box-sizing: border-box; line-height: 0; width: 1.844rem; height: 2.125rem; z-index: 1; position: absolute;"></div><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; margin-left: 0.047rem; width: 1.625rem; height: 2.125rem; position: absolute;"><div id="a1771-16" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.313rem; width: 1.625rem; height: 1.141rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a10356-17" style="box-sizing: border-box; line-height: 0.688rem; text-align: center; font-size: 0.32rem; color: rgb(102, 102, 102); background-color: transparent; width: 1.625rem; height: 0.688rem;"></div></div></div><div style="box-sizing: border-box; line-height: 0; margin-left: 0.047rem; width: 1.813rem; height: 2.125rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div id="a3687-18" class=" UIButton" style="box-sizing: border-box; line-height: 0; width: 1.844rem; height: 2.125rem; z-index: 1; position: absolute;"></div><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; margin-left: 0.047rem; width: 1.625rem; height: 2.125rem; position: absolute;"><div id="a6327-19" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.313rem; width: 1.625rem; height: 1.141rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a5975-20" style="box-sizing: border-box; line-height: 0.688rem; text-align: center; font-size: 0.32rem; color: rgb(102, 102, 102); background-color: transparent; width: 1.625rem; height: 0.688rem;"></div></div></div><div style="box-sizing: border-box; line-height: 0; margin-left: 0.047rem; width: 1.813rem; height: 2.125rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div id="a8573-21" class=" UIButton" style="box-sizing: border-box; line-height: 0; width: 1.844rem; height: 2.125rem; z-index: 1; position: absolute;"></div><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; margin-left: 0.047rem; width: 1.625rem; height: 2.125rem; position: absolute;"><div id="a8070-22" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.313rem; width: 1.625rem; height: 1.141rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a1611-23" style="box-sizing: border-box; line-height: 0.688rem; text-align: center; font-size: 0.32rem; color: rgb(102, 102, 102); background-color: transparent; width: 1.625rem; height: 0.688rem;"></div></div></div><div style="box-sizing: border-box; line-height: 0; margin-left: 0.047rem; width: 1.813rem; height: 2.125rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div id="a1734-24" class=" UIButton" style="box-sizing: border-box; line-height: 0; width: 1.844rem; height: 2.125rem; z-index: 1; position: absolute;"></div><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; margin-left: 0.047rem; width: 1.625rem; height: 2.125rem; position: absolute;"><div id="a5210-25" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.313rem; width: 1.625rem; height: 1.141rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a1155-26" style="box-sizing: border-box; line-height: 0.688rem; text-align: center; font-size: 0.32rem; color: rgb(102, 102, 102); background-color: transparent; width: 1.625rem; height: 0.688rem;"></div></div></div><div style="box-sizing: border-box; line-height: 0; margin-left: 0.047rem; width: 1.813rem; height: 2.125rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div id="a7805-27" class=" UIButton" style="box-sizing: border-box; line-height: 0; width: 1.844rem; height: 2.125rem; z-index: 1; position: absolute;"></div><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; margin-left: 0.047rem; width: 1.625rem; height: 2.125rem; position: absolute;"><div id="a9743-28" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.313rem; width: 1.625rem; height: 1.141rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a9125-29" style="box-sizing: border-box; line-height: 0.688rem; text-align: center; font-size: 0.32rem; color: rgb(102, 102, 102); background-color: transparent; width: 1.625rem; height: 0.688rem;"></div></div></div></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "tentrance10"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a1963-0").setAttribute("data-href", a[0].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a5177-1").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a9881-2").textContent = a[0].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a9944-3").setAttribute("data-href", a[1].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a2410-4").setAttribute("data-image", a[1].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a5893-5").textContent = a[1].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a7001-6").setAttribute("data-href", a[2].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a6118-7").setAttribute("data-image", a[2].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a4761-8").textContent = a[2].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a3250-9").setAttribute("data-href", a[3].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a4150-10").setAttribute("data-image", a[3].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a4117-11").textContent = a[3].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a2945-12").setAttribute("data-href", a[4].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a5049-13").setAttribute("data-image", a[4].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a7943-14").textContent = a[4].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a5520-15").setAttribute("data-href", a[5].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a1771-16").setAttribute("data-image", a[5].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10356-17").textContent = a[5].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a3687-18").setAttribute("data-href", a[6].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a6327-19").setAttribute("data-image", a[6].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a5975-20").textContent = a[6].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a8573-21").setAttribute("data-href", a[7].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a8070-22").setAttribute("data-image", a[7].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a1611-23").textContent = a[7].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a1734-24").setAttribute("data-href", a[8].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a5210-25").setAttribute("data-image", a[8].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a1155-26").textContent = a[8].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a7805-27").setAttribute("data-href", a[9].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a9743-28").setAttribute("data-image", a[9].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a9125-29").textContent = a[9].title[0].valueDesc
			} catch(d) {}
			return c
		},
		tfeatures5: function(a) {
			var b = '<div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 6.719rem; background-color: rgba(255, 255, 255, 0); background-position: initial initial; background-repeat: initial initial;"><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 0.844rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div id="a3225-0" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.219rem; margin-left: 3.922rem; width: 0.422rem; height: 0.422rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a1649-1" style="box-sizing: border-box; line-height: 0.844rem; font-size: 0.37333333333333335rem; color: rgb(255, 104, 19); background-color: transparent; margin-left: 0.141rem; width: 1.953rem; height: 0.844rem;"></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(239, 239, 239); width: 10rem; height: 1px;"></div><div orientation="undefined" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 2.916rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div id="a9952-2" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 3.828rem; height: 2.916rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 2.916rem;"></div><div id="a10332-3" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.041rem; height: 2.916rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 2.916rem;"></div><div id="a2206-4" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.041rem; height: 2.916rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 2.916rem;"></div><div id="a10384-5" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.047rem; height: 2.916rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 10rem; height: 1px;"></div><div orientation="undefined" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 2.916rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div id="a5012-6" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 3.828rem; height: 2.916rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 2.916rem;"></div><div id="a5624-7" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.041rem; height: 2.916rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 2.916rem;"></div><div id="a9706-8" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.041rem; height: 2.916rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 2.916rem;"></div><div id="a3119-9" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.047rem; height: 2.916rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 10rem; height: 0.013rem;"></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "tfeatures5"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a3225-0").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a1649-1").textContent = a[0].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a9952-2").setAttribute("data-href", a[1].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a9952-2").setAttribute("data-image", a[1].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10332-3").setAttribute("data-href", a[2].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10332-3").setAttribute("data-image", a[2].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a2206-4").setAttribute("data-href", a[3].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a2206-4").setAttribute("data-image", a[3].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10384-5").setAttribute("data-href", a[4].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10384-5").setAttribute("data-image", a[4].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a5012-6").setAttribute("data-href", a[5].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a5012-6").setAttribute("data-image", a[5].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a5624-7").setAttribute("data-href", a[6].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a5624-7").setAttribute("data-image", a[6].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a9706-8").setAttribute("data-href", a[7].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a9706-8").setAttribute("data-image", a[7].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a3119-9").setAttribute("data-href", a[8].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a3119-9").setAttribute("data-image", a[8].imageUrl[0].imgUrl)
			} catch(d) {}
			return c
		},
		gray_border_home: function(a) {
			var b = '<div style="box-sizing: border-box; line-height: 0; width: 10rem; height: 0.313rem; background-color: rgb(238, 238, 238); position: relative; background-position: initial initial; background-repeat: initial initial;"></div>',
				c = document.createElement("div");
			return c.setAttribute("data-template-name", "gray_border_home"), c.style.position = "relative", c.innerHTML = b, c
		},
		tcategory3: function(a) {
			var b = '<div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 10.516rem; background-color: rgba(255, 255, 255, 0); background-position: initial initial; background-repeat: initial initial;"><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 0.844rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div id="a6386-0" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.219rem; margin-left: 3.891rem; width: 0.422rem; height: 0.422rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a2952-1" style="box-sizing: border-box; line-height: 0.844rem; font-size: 0.37333333333333335rem; color: rgb(72, 178, 21); background-color: transparent; margin-left: 0.141rem; width: 1.953rem; height: 0.844rem;"></div><div style="box-sizing: border-box; line-height: 0; margin-left: 2.375rem; width: 2.734rem; height: 0.844rem; background-color: rgba(255, 255, 255, 0); position: relative; background-position: initial initial; background-repeat: initial initial;"><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 2.734rem; height: 0.844rem; background-color: rgba(255, 255, 255, 0); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a2691-2" style="box-sizing: border-box; line-height: 0.844rem; text-align: center; font-size: 0.3333333333333333rem; color: rgb(102, 102, 102); background-color: transparent; margin-left: 0.063rem; width: 0.844rem; height: 0.844rem;"></div><div id="a2646-3" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.313rem; width: 0.141rem; height: 0.25rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a4546-4" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 2.734rem; height: 0.844rem; z-index: 1; position: absolute;"></div></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(239, 239, 239); width: 10rem; height: 1px;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 10rem; height: 1px;"></div><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 3.844rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div style="box-sizing: border-box; line-height: 0; width: 4.984rem; height: 3.844rem; position: relative;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 4.984rem; height: 3.844rem; background-color: rgb(255, 255, 255); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a9368-5" style="box-sizing: border-box; line-height: 0.531rem; font-size: 0.36rem; color: rgb(34, 34, 34); background-color: white; margin-top: 0.344rem; margin-left: 0.375rem; width: 4.609rem; height: 0.531rem;"></div><div id="a2780-6" style="box-sizing: border-box; line-height: 0.344rem; font-size: 0.29333333333333333rem; color: rgb(153, 153, 153); background-color: white; margin-bottom: 0.313rem; margin-left: 0.375rem; width: 4.609rem; height: 0.344rem;"></div><div id="a8120-7" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 4.984rem; height: 2.313rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a11504-8" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 4.984rem; height: 3.844rem; z-index: 1; position: absolute;"></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 3.844rem;"></div><div style="box-sizing: border-box; line-height: 0; width: 5rem; height: 3.844rem; position: relative;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 5rem; height: 3.844rem; background-color: rgb(255, 255, 255); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a7015-9" style="box-sizing: border-box; line-height: 0.5rem; font-size: 0.36rem; color: rgb(34, 34, 34); background-color: white; margin-top: 0.375rem; margin-left: 0.375rem; width: 4.625rem; height: 0.5rem;"></div><div id="a1640-10" style="box-sizing: border-box; line-height: 0.344rem; font-size: 0.29333333333333333rem; color: rgb(153, 153, 153); background-color: white; margin-bottom: 0.313rem; margin-left: 0.375rem; width: 4.625rem; height: 0.344rem;"></div><div id="a2180-11" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 5rem; height: 2.313rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a2821-12" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 5rem; height: 3.844rem; z-index: 1; position: absolute;"></div></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 10rem; height: 1px;"></div><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 2.875rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div style="box-sizing: border-box; line-height: 0; margin-left: 0.203rem; width: 2.391rem; height: 2.875rem; position: relative;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 2.406rem; height: 2.875rem; background-color: rgb(255, 255, 255); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a10033-13" style="box-sizing: border-box; line-height: 0.469rem; font-size: 0.36rem; color: rgb(34, 34, 34); background-color: white; margin-top: 0.344rem; margin-left: 0.438rem; width: 1.969rem; height: 0.469rem;"></div><div id="a10500-14" style="box-sizing: border-box; line-height: 0.375rem; font-size: 0.29333333333333333rem; color: rgb(153, 153, 153); background-color: white; margin-bottom: 0.031rem; margin-left: 0.438rem; width: 1.969rem; height: 0.375rem;"></div><div id="a9992-15" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.406rem; height: 1.656rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a2776-16" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 2.406rem; height: 2.875rem; z-index: 1; position: absolute;"></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 2.875rem;"></div><div style="box-sizing: border-box; line-height: 0; width: 2.375rem; height: 2.875rem; position: relative;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 2.375rem; height: 2.875rem; background-color: rgb(255, 255, 255); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a1713-17" style="box-sizing: border-box; line-height: 0.469rem; font-size: 0.36rem; color: rgb(34, 34, 34); background-color: white; margin-top: 0.344rem; margin-left: 0.438rem; width: 1.938rem; height: 0.469rem;"></div><div id="a10593-18" style="box-sizing: border-box; line-height: 0.375rem; font-size: 0.29333333333333333rem; color: rgb(153, 153, 153); background-color: white; margin-bottom: 0.031rem; margin-left: 0.438rem; width: 1.938rem; height: 0.375rem;"></div><div id="a3224-19" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.375rem; height: 1.656rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a2022-20" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 2.375rem; height: 2.875rem; z-index: 1; position: absolute;"></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 2.875rem;"></div><div style="box-sizing: border-box; line-height: 0; width: 2.391rem; height: 2.875rem; position: relative;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 2.391rem; height: 2.875rem; background-color: rgb(255, 255, 255); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a10496-21" style="box-sizing: border-box; line-height: 0.469rem; font-size: 0.36rem; color: rgb(34, 34, 34); background-color: white; margin-top: 0.344rem; margin-left: 0.438rem; width: 1.953rem; height: 0.469rem;"></div><div id="a1612-22" style="box-sizing: border-box; line-height: 0.375rem; font-size: 0.29333333333333333rem; color: rgb(153, 153, 153); background-color: white; margin-bottom: 0.031rem; margin-left: 0.438rem; width: 1.953rem; height: 0.375rem;"></div><div id="a5691-23" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.391rem; height: 1.656rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a10514-24" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 2.391rem; height: 2.875rem; z-index: 1; position: absolute;"></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 2.875rem;"></div><div style="box-sizing: border-box; line-height: 0; width: 2.391rem; height: 2.875rem; position: relative;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 2.391rem; height: 2.875rem; background-color: rgb(255, 255, 255); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a3807-25" style="box-sizing: border-box; line-height: 0.469rem; font-size: 0.36rem; color: rgb(34, 34, 34); background-color: white; margin-top: 0.344rem; margin-left: 0.438rem; width: 1.953rem; height: 0.469rem;"></div><div id="a5471-26" style="box-sizing: border-box; line-height: 0.375rem; font-size: 0.29333333333333333rem; color: rgb(153, 153, 153); background-color: white; margin-bottom: 0.031rem; margin-left: 0.438rem; width: 1.953rem; height: 0.375rem;"></div><div id="a6679-27" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.391rem; height: 1.656rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a4756-28" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 2.391rem; height: 2.875rem; z-index: 1; position: absolute;"></div></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 10rem; height: 1px;"></div><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 2.875rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div style="box-sizing: border-box; line-height: 0; margin-left: 0.203rem; width: 2.391rem; height: 2.875rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 2.406rem; height: 2.875rem; background-color: rgb(255, 255, 255); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a3408-29" style="box-sizing: border-box; line-height: 0.469rem; font-size: 0.36rem; color: rgb(34, 34, 34); background-color: transparent; margin-top: 0.344rem; margin-left: 0.438rem; width: 1.969rem; height: 0.469rem;"></div><div id="a3030-30" style="box-sizing: border-box; line-height: 0.375rem; font-size: 0.29333333333333333rem; color: rgb(153, 153, 153); background-color: transparent; margin-bottom: 0.031rem; margin-left: 0.438rem; width: 1.969rem; height: 0.375rem;"></div><div id="a10614-31" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.406rem; height: 1.656rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a2861-32" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 2.406rem; height: 2.875rem; z-index: 1; position: absolute;"></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 2.875rem;"></div><div style="box-sizing: border-box; line-height: 0; width: 2.375rem; height: 2.875rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 2.375rem; height: 2.875rem; background-color: rgb(255, 255, 255); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a8505-33" style="box-sizing: border-box; line-height: 0.469rem; font-size: 0.36rem; color: rgb(34, 34, 34); background-color: transparent; margin-top: 0.344rem; margin-left: 0.438rem; width: 1.938rem; height: 0.469rem;"></div><div id="a8791-34" style="box-sizing: border-box; line-height: 0.375rem; font-size: 0.29333333333333333rem; color: rgb(153, 153, 153); background-color: transparent; margin-bottom: 0.031rem; margin-left: 0.438rem; width: 1.938rem; height: 0.375rem;"></div><div id="a6096-35" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.375rem; height: 1.656rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a5414-36" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 2.375rem; height: 2.875rem; z-index: 1; position: absolute;"></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 2.875rem;"></div><div style="box-sizing: border-box; line-height: 0; width: 2.391rem; height: 2.875rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 2.391rem; height: 2.875rem; background-color: rgb(255, 255, 255); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a5846-37" style="box-sizing: border-box; line-height: 0.469rem; font-size: 0.36rem; color: rgb(255, 23, 0); background-color: transparent; margin-top: 0.344rem; margin-left: 0.438rem; width: 1.953rem; height: 0.469rem;"></div><div id="a5291-38" style="box-sizing: border-box; line-height: 0.375rem; font-size: 0.29333333333333333rem; color: rgb(153, 153, 153); background-color: transparent; margin-bottom: 0.031rem; margin-left: 0.438rem; width: 1.953rem; height: 0.375rem;"></div><div id="a10446-39" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.391rem; height: 1.656rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a11192-40" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 2.391rem; height: 2.875rem; z-index: 1; position: absolute;"></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 2.875rem;"></div><div style="box-sizing: border-box; line-height: 0; width: 2.391rem; height: 2.875rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 2.391rem; height: 2.875rem; background-color: rgb(255, 255, 255); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a10344-41" style="box-sizing: border-box; line-height: 0.469rem; font-size: 0.36rem; color: rgb(255, 23, 0); background-color: transparent; margin-top: 0.344rem; margin-left: 0.438rem; width: 1.953rem; height: 0.469rem;"></div><div id="a3460-42" style="box-sizing: border-box; line-height: 0.375rem; font-size: 0.29333333333333333rem; color: rgb(153, 153, 153); background-color: transparent; margin-bottom: 0.031rem; margin-left: 0.438rem; width: 1.953rem; height: 0.375rem;"></div><div id="a2425-43" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.391rem; height: 1.656rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a11576-44" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 2.391rem; height: 2.875rem; z-index: 1; position: absolute;"></div></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(217, 217, 217); width: 10rem; height: 1px;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(224, 224, 224); width: 10rem; height: 1px;"></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "tcategory3"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a6386-0").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a2952-1").textContent = a[0].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a2691-2").textContent = a[0].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a2646-3").setAttribute("data-image", a[0].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a4546-4").setAttribute("data-href", a[0].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a9368-5").textContent = a[1].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a2780-6").textContent = a[1].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a8120-7").setAttribute("data-image", a[1].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a11504-8").setAttribute("data-href", a[1].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a7015-9").textContent = a[2].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a1640-10").textContent = a[2].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a2180-11").setAttribute("data-image", a[2].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a2821-12").setAttribute("data-href", a[2].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10033-13").textContent = a[3].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a10500-14").textContent = a[3].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a9992-15").setAttribute("data-image", a[3].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a2776-16").setAttribute("data-href", a[3].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a1713-17").textContent = a[4].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a10593-18").textContent = a[4].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a3224-19").setAttribute("data-image", a[4].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a2022-20").setAttribute("data-href", a[4].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10496-21").textContent = a[5].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a1612-22").textContent = a[5].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a5691-23").setAttribute("data-image", a[5].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10514-24").setAttribute("data-href", a[5].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a3807-25").textContent = a[6].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a5471-26").textContent = a[6].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a6679-27").setAttribute("data-image", a[6].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a4756-28").setAttribute("data-href", a[6].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a3408-29").textContent = a[7].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a3030-30").textContent = a[7].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a10614-31").setAttribute("data-image", a[7].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a2861-32").setAttribute("data-href", a[7].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a8505-33").textContent = a[8].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a8791-34").textContent = a[8].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a6096-35").setAttribute("data-image", a[8].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a5414-36").setAttribute("data-href", a[8].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a5846-37").textContent = a[9].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a5291-38").textContent = a[9].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a10446-39").setAttribute("data-image", a[9].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a11192-40").setAttribute("data-href", a[9].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10344-41").textContent = a[10].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a3460-42").textContent = a[10].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a2425-43").setAttribute("data-image", a[10].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a11576-44").setAttribute("data-href", a[10].targetUrl)
			} catch(d) {}
			return c
		},
		trushbuy5: function(a) {
			var b = '<div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 5.063rem;"><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 5.047rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div style="box-sizing: border-box; line-height: 0; width: 3.828rem; height: 5.047rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div id="a6004-0" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 3.828rem; height: 5.047rem; z-index: 1; background-size: contain; position: absolute; background-repeat: no-repeat no-repeat;"></div><div class=" TBRushBuyCounterLabel" style="box-sizing: border-box; line-height: 0; margin-top: 1.406rem; margin-left: 0.172rem; width: 2.781rem; height: 0.594rem; position: absolute;"></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 5.047rem;"></div><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 6.188rem; height: 5.047rem;"><div style="box-sizing: border-box; line-height: 0; width: 6.188rem; height: 2.313rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 6.188rem; height: 2.313rem; background-color: rgb(255, 255, 255); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a4608-1" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.953rem; height: 2.313rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a4023-2" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 3.234rem; height: 2.313rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a8746-3" class=" UIButton" style="box-sizing: border-box; line-height: 0; width: 6.188rem; height: 2.313rem; z-index: 1; position: absolute;"></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 6.188rem; height: 1px;"></div><div orientation="undefined" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 6.188rem; height: 2.719rem;"><div id="a11901-4" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 3.047rem; height: 2.719rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 2.719rem;"></div><div id="a10123-5" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 3.094rem; height: 2.719rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div></div></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(217, 217, 217); width: 10rem; height: 1px;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(224, 224, 224); width: 10rem; height: 1px;"></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "trushbuy5"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a6004-0").setAttribute("data-href", a[0].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a6004-0").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a4608-1").setAttribute("data-image", a[1].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a4023-2").setAttribute("data-image", a[1].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a8746-3").setAttribute("data-href", a[1].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a11901-4").setAttribute("data-href", a[2].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a11901-4").setAttribute("data-image", a[2].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10123-5").setAttribute("data-href", a[3].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10123-5").setAttribute("data-image", a[3].imageUrl[0].imgUrl)
			} catch(d) {}
			return c
		},
		toutiao2: function(a) {
			var b = '<div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 0.953rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 10rem; height: 1px;"></div><div style="box-sizing: border-box; line-height: 0; width: 10rem; height: 0.938rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div id="a12277-0" style="box-sizing: border-box; line-height: 0.438rem; text-align: right; color: rgb(224, 22, 30); background-color: transparent; margin-top: 0.234rem; width: 0.906rem; height: 0.438rem; position: absolute;"></div><div id="a5711-1" style="box-sizing: border-box; line-height: 0.938rem; font-size: 0.3466666666666667rem; color: rgb(61, 64, 69); background-color: transparent; margin-left: 0.813rem; height: 0.938rem; position: absolute;"></div><div style="box-sizing: border-box; line-height: 0; width: 9.625rem; height: 0.938rem; position: absolute;"></div></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "toutiao2"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a5711-1").textContent = a[0].title[0].valueDesc
			} catch(d) {}
			return c
		},
		tbanner: function(a) {
			var b = '<div class=" UIView" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 3.125rem;"></div>',
				c = document.createElement("div");
			return c.setAttribute("data-template-name", "tbanner"), c.style.position = "relative", c.innerHTML = b, c
		},
		t122016biaoqian: function(a) {
			var b = '<div style="box-sizing: border-box; line-height: 0; width: 10rem; height: 5.91rem; background-color: rgba(255, 255, 255, 0); position: relative; background-position: initial initial; background-repeat: initial initial;"><div class=" UIView" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 5.91rem; position: absolute;"></div><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; margin-top: 0.08rem; width: 10rem; height: 5.83rem; position: absolute;"><div orientation="undefined" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; margin-bottom: 0.08rem; width: 10rem; height: 2.875rem; background-color: rgba(255, 255, 255, 0); background-position: initial initial; background-repeat: initial initial;"><div style="box-sizing: border-box; line-height: 0; margin-left: 0.133rem; margin-right: 0.08rem; width: 4.827rem; height: 2.88rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 4.827rem; height: 2.88rem; background-color: rgba(255, 255, 255, 0); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a8083-0" style="box-sizing: border-box; line-height: 0.48rem; text-align: center; font-size: 0.3466666666666667rem; color: rgb(255, 255, 255); background-color: rgb(23, 181, 249); margin-top: 0.16rem; margin-left: 0.133rem; width: 2.383rem; height: 0.48rem;"></div><div id="a6248-1" style="box-sizing: border-box; line-height: 0.386rem; font-size: 0.32rem; color: rgb(120, 120, 120); background-color: transparent; margin-top: 0.094rem; margin-left: 0.24rem; height: 0.386rem;"></div><div orientation="undefined" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; margin-top: 0.133rem; margin-left: 0.48rem; margin-right: 0.48rem; width: 3.867rem; height: 1.648rem; background-color: rgba(255, 255, 255, 0); background-position: initial initial; background-repeat: initial initial;"><div id="a7958-2" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 1.52rem; height: 1.52rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a3878-3" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-left: 0.84rem; width: 1.52rem; height: 1.52rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div></div><div id="a9915-4" class=" UIButton" style="box-sizing: border-box; line-height: 0; width: 4.827rem; height: 2.88rem; z-index: 1; position: absolute;"></div></div><div style="box-sizing: border-box; line-height: 0; width: 4.827rem; height: 2.88rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 4.827rem; height: 2.88rem; background-color: rgba(255, 255, 255, 0); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a11042-5" style="box-sizing: border-box; line-height: 0.48rem; text-align: center; font-size: 0.3466666666666667rem; color: rgb(255, 255, 255); background-color: rgb(202, 78, 217); margin-top: 0.16rem; margin-left: 0.133rem; width: 2.383rem; height: 0.48rem;"></div><div id="a7313-6" style="box-sizing: border-box; line-height: 0.386rem; font-size: 0.32rem; color: rgb(120, 120, 120); background-color: transparent; margin-top: 0.094rem; margin-left: 0.24rem; height: 0.386rem;"></div><div orientation="undefined" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; margin-top: 0.133rem; margin-left: 0.48rem; margin-right: 0.48rem; width: 3.867rem; height: 1.648rem; background-color: rgba(255, 255, 255, 0); background-position: initial initial; background-repeat: initial initial;"><div id="a2860-7" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 1.52rem; height: 1.52rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a10017-8" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-left: 0.84rem; width: 1.52rem; height: 1.52rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div></div><div id="a10593-9" class=" UIButton" style="box-sizing: border-box; line-height: 0; width: 4.827rem; height: 2.88rem; z-index: 1; position: absolute;"></div></div></div><div orientation="undefined" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 2.875rem; background-color: rgba(255, 255, 255, 0); background-position: initial initial; background-repeat: initial initial;"><div style="box-sizing: border-box; line-height: 0; margin-left: 0.133rem; margin-right: 0.08rem; width: 4.827rem; height: 2.88rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 4.827rem; height: 2.88rem; background-color: rgba(255, 255, 255, 0); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a6597-10" style="box-sizing: border-box; line-height: 0.48rem; text-align: center; font-size: 0.3466666666666667rem; color: rgb(255, 255, 255); background-color: rgb(86, 207, 58); margin-top: 0.16rem; margin-left: 0.133rem; width: 2.383rem; height: 0.48rem;"></div><div id="a10122-11" style="box-sizing: border-box; line-height: 0.386rem; font-size: 0.32rem; color: rgb(120, 120, 120); background-color: transparent; margin-top: 0.094rem; margin-left: 0.24rem; height: 0.386rem;"></div><div orientation="undefined" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; margin-top: 0.133rem; margin-left: 0.48rem; margin-right: 0.48rem; width: 3.867rem; height: 1.648rem; background-color: rgba(255, 255, 255, 0); background-position: initial initial; background-repeat: initial initial;"><div id="a12218-12" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 1.52rem; height: 1.52rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a8592-13" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-left: 0.84rem; width: 1.52rem; height: 1.52rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div></div><div id="a6754-14" class=" UIButton" style="box-sizing: border-box; line-height: 0; width: 4.827rem; height: 2.88rem; z-index: 1; position: absolute;"></div></div><div style="box-sizing: border-box; line-height: 0; width: 4.827rem; height: 2.88rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 4.827rem; height: 2.88rem; background-color: rgba(255, 255, 255, 0); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a9614-15" style="box-sizing: border-box; line-height: 0.48rem; text-align: center; font-size: 0.3466666666666667rem; color: rgb(255, 255, 255); background-color: rgb(255, 76, 62); margin-top: 0.16rem; margin-left: 0.133rem; width: 2.383rem; height: 0.48rem;"></div><div id="a5914-16" style="box-sizing: border-box; line-height: 0.386rem; font-size: 0.32rem; color: rgb(120, 120, 120); background-color: transparent; margin-top: 0.094rem; margin-left: 0.24rem; height: 0.386rem;"></div><div orientation="undefined" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; margin-top: 0.133rem; margin-left: 0.48rem; margin-right: 0.48rem; width: 3.867rem; height: 1.648rem; background-color: rgba(255, 255, 255, 0); background-position: initial initial; background-repeat: initial initial;"><div id="a12585-17" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 1.52rem; height: 1.52rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a2813-18" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-left: 0.84rem; width: 1.52rem; height: 1.52rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div></div><div id="a3972-19" class=" UIButton" style="box-sizing: border-box; line-height: 0; width: 4.827rem; height: 2.88rem; z-index: 1; position: absolute;"></div></div></div></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "t122016biaoqian"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a8083-0").textContent = a[0].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a6248-1").textContent = a[0].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a7958-2").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a3878-3").setAttribute("data-image", a[0].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a9915-4").setAttribute("data-href", a[0].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a11042-5").textContent = a[1].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a7313-6").textContent = a[1].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a2860-7").setAttribute("data-image", a[1].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10017-8").setAttribute("data-image", a[1].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10593-9").setAttribute("data-href", a[1].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a6597-10").textContent = a[2].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a10122-11").textContent = a[2].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a12218-12").setAttribute("data-image", a[2].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a8592-13").setAttribute("data-image", a[2].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a6754-14").setAttribute("data-href", a[2].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a9614-15").textContent = a[3].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a5914-16").textContent = a[3].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a12585-17").setAttribute("data-image", a[3].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a2813-18").setAttribute("data-image", a[3].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a3972-19").setAttribute("data-href", a[3].targetUrl)
			} catch(d) {}
			return c
		},
		tgrayborder12: function(a) {
			var b = '<div style="box-sizing: border-box; line-height: 0; width: 10rem; height: 0.156rem; background-color: rgb(238, 238, 238); position: relative; background-position: initial initial; background-repeat: initial initial;"></div>',
				c = document.createElement("div");
			return c.setAttribute("data-template-name", "tgrayborder12"), c.style.position = "relative", c.innerHTML = b, c
		},
		titemtop: function(a) {
			var b = '<div orientation="undefined" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 0.906rem;"></div>',
				c = document.createElement("div");
			return c.setAttribute("data-template-name", "titemtop"), c.style.position = "relative", c.innerHTML = b, c
		},
		guessTitle: function(a) {
			var b = '<div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 1.469rem; background-color: rgba(255, 255, 255, 0); background-position: initial initial; background-repeat: initial initial;"><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 0.719rem; background-color: rgba(255, 255, 255, 0); background-position: initial initial; background-repeat: initial initial;"><div id="a4983-0" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.266rem; width: 0.531rem; height: 0.516rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a10197-1" style="box-sizing: border-box; line-height: 0.406rem; font-weight: bold; font-size: 0.37333333333333335rem; color: rgb(51, 51, 51); background-color: transparent; margin-top: 0.313rem; margin-left: 0.156rem; height: 0.406rem;"></div></div><div id="a9810-2" style="box-sizing: border-box; line-height: 0.516rem; text-align: center; font-size: 0.32rem; color: rgb(120, 120, 120); background-color: transparent; margin-bottom: 0.078rem; width: 10rem; height: 0.516rem;"></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "guessTitle"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a4983-0").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10197-1").textContent = a[0].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a9810-2").textContent = a[0].title[1].valueDesc
			} catch(d) {}
			return c
		},
		tentrance: function(a) {
			var b = '<div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 4.313rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 2.031rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div style="box-sizing: border-box; line-height: 0; margin-left: 0.406rem; width: 2rem; height: 2.125rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div id="a7077-0" class=" UIButton" style="box-sizing: border-box; line-height: 0; width: 2rem; height: 2.125rem; z-index: 1; position: absolute;"></div><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 2rem; height: 2.125rem; position: absolute;"><div style="box-sizing: border-box; line-height: 0; margin-top: 0.313rem; margin-left: 0.391rem; width: 1.609rem; height: 1.203rem; position: relative;"><div id="a3681-1" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 1.203rem; height: 1.203rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a11229-2" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-left: 0.906rem; width: 0.594rem; height: 0.328rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a8494-3" style="box-sizing: border-box; line-height: 0.594rem; text-align: center; font-size: 0.32rem; color: rgb(102, 102, 102); width: 2rem; height: 0.594rem;"></div></div></div><div style="box-sizing: border-box; line-height: 0; margin-left: 0.406rem; width: 2rem; height: 2.125rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div id="a2753-4" class=" UIButton" style="box-sizing: border-box; line-height: 0; width: 2rem; height: 2.125rem; z-index: 1; position: absolute;"></div><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 2rem; height: 2.125rem; position: absolute;"><div style="box-sizing: border-box; line-height: 0; margin-top: 0.313rem; margin-left: 0.391rem; width: 1.609rem; height: 1.203rem; position: relative;"><div id="a9497-5" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 1.203rem; height: 1.203rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a6719-6" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-left: 0.906rem; width: 0.594rem; height: 0.328rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a4119-7" style="box-sizing: border-box; line-height: 0.594rem; text-align: center; font-size: 0.32rem; color: rgb(102, 102, 102); width: 2rem; height: 0.594rem;"></div></div></div><div style="box-sizing: border-box; line-height: 0; margin-left: 0.406rem; width: 2rem; height: 2.125rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div id="a2828-8" class=" UIButton" style="box-sizing: border-box; line-height: 0; width: 2rem; height: 2.125rem; z-index: 1; position: absolute;"></div><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 2rem; height: 2.125rem; position: absolute;"><div style="box-sizing: border-box; line-height: 0; margin-top: 0.313rem; margin-left: 0.391rem; width: 1.609rem; height: 1.203rem; position: relative;"><div id="a7762-9" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 1.203rem; height: 1.203rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a3794-10" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-left: 0.906rem; width: 0.594rem; height: 0.328rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a3099-11" style="box-sizing: border-box; line-height: 0.594rem; text-align: center; font-size: 0.32rem; color: rgb(102, 102, 102); width: 2rem; height: 0.594rem;"></div></div></div><div style="box-sizing: border-box; line-height: 0; margin-left: 0.406rem; width: 2rem; height: 2.125rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div id="a11070-12" class=" UIButton" style="box-sizing: border-box; line-height: 0; width: 2rem; height: 2.125rem; z-index: 1; position: absolute;"></div><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 2rem; height: 2.125rem; position: absolute;"><div style="box-sizing: border-box; line-height: 0; margin-top: 0.313rem; margin-left: 0.391rem; width: 1.609rem; height: 1.203rem; position: relative;"><div id="a7908-13" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 1.203rem; height: 1.203rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a8765-14" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-left: 0.906rem; width: 0.594rem; height: 0.328rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a5042-15" style="box-sizing: border-box; line-height: 0.594rem; text-align: center; font-size: 0.32rem; color: rgb(102, 102, 102); width: 2rem; height: 0.594rem;"></div></div></div></div><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 2.031rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div style="box-sizing: border-box; line-height: 0; margin-left: 0.406rem; width: 2rem; height: 2.125rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div id="a11879-16" class=" UIButton" style="box-sizing: border-box; line-height: 0; width: 2rem; height: 2.125rem; z-index: 1; position: absolute;"></div><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 2rem; height: 2.125rem; position: absolute;"><div style="box-sizing: border-box; line-height: 0; margin-top: 0.313rem; margin-left: 0.391rem; width: 1.609rem; height: 1.203rem; position: relative;"><div id="a5520-17" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 1.203rem; height: 1.203rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a7870-18" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-left: 0.906rem; width: 0.594rem; height: 0.328rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a8957-19" style="box-sizing: border-box; line-height: 0.594rem; text-align: center; font-size: 0.32rem; color: rgb(102, 102, 102); width: 2rem; height: 0.594rem;"></div></div></div><div style="box-sizing: border-box; line-height: 0; margin-left: 0.406rem; width: 2rem; height: 2.125rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div id="a5807-20" class=" UIButton" style="box-sizing: border-box; line-height: 0; width: 2rem; height: 2.125rem; z-index: 1; position: absolute;"></div><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 2rem; height: 2.125rem; position: absolute;"><div style="box-sizing: border-box; line-height: 0; margin-top: 0.313rem; margin-left: 0.391rem; width: 1.609rem; height: 1.203rem; position: relative;"><div id="a8886-21" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 1.203rem; height: 1.203rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a10832-22" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-left: 0.906rem; width: 0.594rem; height: 0.328rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a6764-23" style="box-sizing: border-box; line-height: 0.594rem; text-align: center; font-size: 0.32rem; color: rgb(102, 102, 102); width: 2rem; height: 0.594rem;"></div></div></div><div style="box-sizing: border-box; line-height: 0; margin-left: 0.406rem; width: 2rem; height: 2.125rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div id="a5343-24" class=" UIButton" style="box-sizing: border-box; line-height: 0; width: 2rem; height: 2.125rem; z-index: 1; position: absolute;"></div><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 2rem; height: 2.125rem; position: absolute;"><div style="box-sizing: border-box; line-height: 0; margin-top: 0.313rem; margin-left: 0.391rem; width: 1.609rem; height: 1.203rem; position: relative;"><div id="a11055-25" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 1.203rem; height: 1.203rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a8244-26" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-left: 0.906rem; width: 0.594rem; height: 0.328rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a8640-27" style="box-sizing: border-box; line-height: 0.594rem; text-align: center; font-size: 0.32rem; color: rgb(102, 102, 102); width: 2rem; height: 0.594rem;"></div></div></div><div style="box-sizing: border-box; line-height: 0; margin-left: 0.406rem; width: 2rem; height: 2.125rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div id="a5812-28" class=" UIButton" style="box-sizing: border-box; line-height: 0; width: 2rem; height: 2.125rem; z-index: 1; position: absolute;"></div><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 2rem; height: 2.125rem; position: absolute;"><div style="box-sizing: border-box; line-height: 0; margin-top: 0.313rem; margin-left: 0.391rem; width: 1.609rem; height: 1.203rem; position: relative;"><div id="a4647-29" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 1.203rem; height: 1.203rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a4863-30" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-left: 0.906rem; width: 0.594rem; height: 0.328rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a5275-31" style="box-sizing: border-box; line-height: 0.594rem; text-align: center; font-size: 0.32rem; color: rgb(102, 102, 102); width: 2rem; height: 0.594rem;"></div></div></div></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "tentrance"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a7077-0").setAttribute("data-href", a[0].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a3681-1").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a11229-2").setAttribute("data-image", a[0].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a8494-3").textContent = a[0].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a2753-4").setAttribute("data-href", a[1].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a9497-5").setAttribute("data-image", a[1].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a6719-6").setAttribute("data-image", a[1].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a4119-7").textContent = a[1].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a2828-8").setAttribute("data-href", a[2].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a7762-9").setAttribute("data-image", a[2].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a3794-10").setAttribute("data-image", a[2].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a3099-11").textContent = a[2].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a11070-12").setAttribute("data-href", a[3].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a7908-13").setAttribute("data-image", a[3].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a8765-14").setAttribute("data-image", a[3].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a5042-15").textContent = a[3].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a11879-16").setAttribute("data-href", a[4].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a5520-17").setAttribute("data-image", a[4].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a7870-18").setAttribute("data-image", a[4].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a8957-19").textContent = a[4].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a5807-20").setAttribute("data-href", a[5].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a8886-21").setAttribute("data-image", a[5].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10832-22").setAttribute("data-image", a[5].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a6764-23").textContent = a[5].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a5343-24").setAttribute("data-href", a[6].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a11055-25").setAttribute("data-image", a[6].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a8244-26").setAttribute("data-image", a[6].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a8640-27").textContent = a[6].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a5812-28").setAttribute("data-href", a[7].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a4647-29").setAttribute("data-image", a[7].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a4863-30").setAttribute("data-image", a[7].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a5275-31").textContent = a[7].title[0].valueDesc
			} catch(d) {}
			return c
		},
		single_titem: function(a) {
			var b = '<div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 5rem; height: 7.813rem;"><div style="box-sizing: border-box; line-height: 0; background-color: rgb(255, 255, 255); margin-bottom: 0.25rem; margin-left: 0.25rem; margin-right: 0.125rem; width: 4.625rem; height: 7.563rem; position: relative; background-position: initial initial; background-repeat: initial initial;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 4.625rem; height: 7.563rem; position: absolute;"><div id="a9195-0" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 4.625rem; height: 5.375rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a10454-1" style="box-sizing: border-box; line-height: 0; font-size: 0.32rem; color: rgb(102, 102, 102); background-color: transparent; margin: 0.188rem 0.313rem; width: 4rem;"></div><div id="a10460-2" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; margin-left: 0.313rem; margin-right: 0.313rem; width: 4rem; height: 1px; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div orientation="undefined" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 4.625rem; height: 0.875rem;"><div id="a6369-3" style="box-sizing: border-box; line-height: 0.844rem; color: rgb(255, 80, 0); background-color: transparent; margin-bottom: 0.031rem; margin-left: 0.25rem; margin-right: 0.063rem; width: 0.625rem; height: 0.844rem;"></div><div id="a5127-4" style="box-sizing: border-box; line-height: 0.844rem; color: rgb(255, 80, 0); background-color: transparent; margin-bottom: 0.031rem; margin-left: 0.25rem; margin-right: 0.25rem; width: 2.25rem; height: 0.844rem;"></div><div id="a3682-5" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; margin-top: 0.219rem; margin-bottom: 0.219rem; margin-right: 0.125rem; width: 1.75rem; height: 0.438rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div></div><div id="a9818-6" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 4.625rem; height: 7.563rem; z-index: 1; position: absolute;"></div></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "single_titem"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a9195-0").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10454-1").textContent = a[0].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a6369-3").textContent = a[0].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a5127-4").textContent = a[0].title[2].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a3682-5").setAttribute("data-image", a[0].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a9818-6").setAttribute("data-href", a[0].targetUrl)
			} catch(d) {}
			return c
		},
		t11MallMainEntrance: function(a) {
			var b = '<div style="box-sizing: border-box; line-height: 0; width: 10rem; height: 2.984rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div id="a5738-0" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 2.984rem; z-index: 1; background-size: contain; position: absolute; background-repeat: no-repeat no-repeat;"></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "t11MallMainEntrance"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a5738-0").setAttribute("data-href", a[0].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a5738-0").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			return c
		},
		tdarentao5: function(a) {
			var b = '<div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 5.125rem; background-color: rgba(255, 255, 255, 0); background-position: initial initial; background-repeat: initial initial;"><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 0.844rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div id="a4202-0" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.219rem; margin-left: 4.094rem; width: 0.422rem; height: 0.422rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a5833-1" style="box-sizing: border-box; line-height: 0.844rem; font-size: 0.37333333333333335rem; color: rgb(255, 40, 81); background-color: transparent; margin-left: 0.141rem; width: 1.641rem; height: 0.844rem;"></div><div style="box-sizing: border-box; line-height: 0; margin-left: 2.484rem; width: 1.109rem; height: 0.844rem; background-color: rgba(255, 255, 255, 0); position: relative; background-position: initial initial; background-repeat: initial initial;"><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 1.109rem; height: 0.844rem; background-color: rgba(255, 255, 255, 0); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a4225-2" style="box-sizing: border-box; line-height: 0.844rem; text-align: center; font-size: 0.3333333333333333rem; color: rgb(102, 102, 102); background-color: transparent; margin-left: 0.063rem; width: 0.844rem; height: 0.844rem;"></div><div id="a4276-3" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.313rem; width: 0.141rem; height: 0.25rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a10044-4" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 1.109rem; height: 0.844rem; z-index: 1; position: absolute;"></div></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 10rem; height: 1px;"></div><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 4.266rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div style="box-sizing: border-box; line-height: 0; width: 3.328rem; height: 4.266rem; position: relative;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 3.328rem; height: 4.266rem; background-color: rgba(255, 255, 255, 0); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a7806-5" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 3.328rem; height: 0.609rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a9844-6" style="box-sizing: border-box; line-height: 0.422rem; font-size: 0.32rem; color: rgb(136, 136, 136); background-color: transparent; margin-bottom: 0.078rem; margin-left: 0.219rem; width: 3.109rem; height: 0.422rem;"></div><div id="a3218-7" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-bottom: 0.141rem; margin-left: 0.234rem; margin-right: 0.078rem; width: 3.016rem; height: 3rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a10848-8" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 3.328rem; height: 4.266rem; z-index: 1; position: absolute;"></div></div><div style="box-sizing: border-box; line-height: 0; width: 3.328rem; height: 4.266rem; position: relative;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 3.328rem; height: 4.266rem; background-color: rgba(255, 255, 255, 0); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a4937-9" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 3.328rem; height: 0.609rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a3689-10" style="box-sizing: border-box; line-height: 0.422rem; font-size: 0.32rem; color: rgb(136, 136, 136); background-color: transparent; margin-bottom: 0.078rem; margin-left: 0.109rem; width: 3.219rem; height: 0.422rem;"></div><div id="a4541-11" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-bottom: 0.141rem; margin-left: 0.156rem; margin-right: 0.156rem; width: 3.016rem; height: 3rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a11149-12" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 3.328rem; height: 4.266rem; z-index: 1; position: absolute;"></div></div><div style="box-sizing: border-box; line-height: 0; width: 3.328rem; height: 4.266rem; position: relative;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 3.328rem; height: 4.266rem; background-color: rgba(255, 255, 255, 0); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a11614-13" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 3.328rem; height: 0.609rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a10691-14" style="box-sizing: border-box; line-height: 0.422rem; font-size: 0.32rem; color: rgb(136, 136, 136); background-color: transparent; margin-bottom: 0.078rem; margin-left: 0.031rem; width: 3.297rem; height: 0.422rem;"></div><div id="a3242-15" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-bottom: 0.141rem; margin-left: 0.078rem; margin-right: 0.234rem; width: 3.016rem; height: 3rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a11897-16" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 3.328rem; height: 4.266rem; z-index: 1; position: absolute;"></div></div></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "tdarentao5"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a4202-0").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a5833-1").textContent = a[0].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a4225-2").textContent = a[0].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a4276-3").setAttribute("data-image", a[0].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10044-4").setAttribute("data-href", a[0].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a7806-5").setAttribute("data-image", a[1].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a9844-6").textContent = a[1].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a3218-7").setAttribute("data-image", a[1].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10848-8").setAttribute("data-href", a[1].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a4937-9").setAttribute("data-image", a[2].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a3689-10").textContent = a[2].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a4541-11").setAttribute("data-image", a[2].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a11149-12").setAttribute("data-href", a[2].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a11614-13").setAttribute("data-image", a[3].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10691-14").textContent = a[3].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a3242-15").setAttribute("data-image", a[3].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a11897-16").setAttribute("data-href", a[3].targetUrl)
			} catch(d) {}
			return c
		},
		tbanner2: function(a) {
			var b = '<div orientation="undefined" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 2rem;"><div id="a3968-0" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 2rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "tbanner2"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a3968-0").setAttribute("data-href", a[0].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a3968-0").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			return c
		},
		tmall5: function(a) {
			var b = '<div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 6.766rem; background-color: rgba(255, 255, 255, 0); background-position: initial initial; background-repeat: initial initial;"><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 0.844rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div id="a10327-0" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.219rem; margin-left: 3.906rem; width: 0.422rem; height: 0.422rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a5318-1" style="box-sizing: border-box; line-height: 0.844rem; font-size: 0.37333333333333335rem; color: rgb(209, 9, 9); background-color: transparent; margin-left: 0.141rem; width: 1.953rem; height: 0.844rem;"></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(239, 239, 239); width: 10rem; height: 1px;"></div><div orientation="undefined" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 2.922rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div id="a3427-2" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 4.984rem; height: 2.922rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 2.922rem;"></div><div id="a7808-3" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 5rem; height: 2.922rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 10rem; height: 1px;"></div><div orientation="undefined" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 2.938rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div id="a3986-4" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.484rem; height: 2.938rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 2.938rem;"></div><div id="a4327-5" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.484rem; height: 2.938rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 2.938rem;"></div><div id="a6504-6" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.484rem; height: 2.938rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 2.938rem;"></div><div id="a6208-7" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.5rem; height: 2.938rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(217, 217, 217); width: 10rem; height: 1px;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(224, 224, 224); width: 10rem; height: 1px;"></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "tmall5"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a10327-0").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a5318-1").textContent = a[0].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a3427-2").setAttribute("data-href", a[1].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a3427-2").setAttribute("data-image", a[1].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a7808-3").setAttribute("data-href", a[2].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a7808-3").setAttribute("data-image", a[2].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a3986-4").setAttribute("data-href", a[3].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a3986-4").setAttribute("data-image", a[3].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a4327-5").setAttribute("data-href", a[4].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a4327-5").setAttribute("data-image", a[4].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a6504-6").setAttribute("data-href", a[5].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a6504-6").setAttribute("data-image", a[5].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a6208-7").setAttribute("data-href", a[6].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a6208-7").setAttribute("data-image", a[6].imageUrl[0].imgUrl)
			} catch(d) {}
			return c
		},
		tquality3: function(a) {
			var b = '<div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 6.734rem; background-color: rgba(255, 255, 255, 0); background-position: initial initial; background-repeat: initial initial;"><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 0.953rem; background-color: rgba(255, 255, 255, 0); background-position: initial initial; background-repeat: initial initial;"><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(204, 204, 204); margin-top: 0.484rem; margin-left: 0.156rem; margin-right: 0.156rem; width: 3.813rem; height: 1px;"></div><div id="a10691-0" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.219rem; width: 0.531rem; height: 0.531rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a9824-1" style="box-sizing: border-box; line-height: 0.953rem; text-align: center; font-size: 0.37333333333333335rem; color: rgb(106, 41, 164); background-color: transparent; margin-right: 0.047rem; width: 1.328rem; height: 0.953rem;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(204, 204, 204); margin-top: 0.484rem; margin-right: 0.156rem; width: 3.813rem; height: 1px;"></div></div><div orientation="undefined" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 2.609rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div id="a7898-2" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 5.969rem; height: 2.609rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 2.609rem;"></div><div id="a6134-3" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 4rem; height: 2.609rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 10rem; height: 1px;"></div><div orientation="undefined" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 3.141rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div id="a5375-4" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 1.984rem; height: 3.125rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 3.141rem;"></div><div id="a10620-5" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 1.984rem; height: 3.125rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 3.141rem;"></div><div id="a5480-6" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 1.984rem; height: 3.125rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 3.141rem;"></div><div id="a8939-7" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 1.984rem; height: 3.125rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 3.141rem;"></div><div id="a6943-8" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 1.984rem; height: 3.125rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(217, 217, 217); width: 10rem; height: 1px;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(224, 224, 224); width: 10rem; height: 1px;"></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "tquality3"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a10691-0").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a9824-1").textContent = a[0].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a7898-2").setAttribute("data-href", a[1].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a7898-2").setAttribute("data-image", a[1].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a6134-3").setAttribute("data-href", a[2].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a6134-3").setAttribute("data-image", a[2].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a5375-4").setAttribute("data-href", a[3].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a5375-4").setAttribute("data-image", a[3].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10620-5").setAttribute("data-href", a[4].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10620-5").setAttribute("data-image", a[4].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a5480-6").setAttribute("data-href", a[5].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a5480-6").setAttribute("data-image", a[5].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a8939-7").setAttribute("data-href", a[6].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a8939-7").setAttribute("data-image", a[6].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a6943-8").setAttribute("data-href", a[7].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a6943-8").setAttribute("data-image", a[7].imageUrl[0].imgUrl)
			} catch(d) {}
			return c
		},
		subtshop88: function(a) {
			var b = '<div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 4.375rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div style="box-sizing: border-box; line-height: 0; margin-left: 0.188rem; width: 4.813rem; height: 3.781rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div id="a7139-0" class=" UIButton" style="box-sizing: border-box; line-height: 0; width: 4.75rem; height: 3.188rem; z-index: 1; position: absolute;"></div><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 4.813rem; height: 3.188rem; position: absolute;"><div id="a8732-1" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 3.125rem; height: 3.188rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; margin-left: 0.063rem; width: 1.563rem; height: 3.188rem;"><div id="a3512-2" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 1.563rem; height: 1.563rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a12348-3" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.063rem; width: 1.563rem; height: 1.563rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div></div><div id="a12037-4" style="box-sizing: border-box; line-height: 0.5rem; font-size: 0.3466666666666667rem; color: rgb(34, 34, 34); background-color: transparent; margin-top: 3.281rem; margin-left: 0.031rem; width: 4.719rem; height: 0.5rem; position: absolute;"></div></div><div style="box-sizing: border-box; line-height: 0; margin-left: 0.063rem; width: 4.938rem; height: 3.781rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div id="a6311-5" class=" UIButton" style="box-sizing: border-box; line-height: 0; width: 4.75rem; height: 3.188rem; z-index: 1; position: absolute;"></div><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 4.75rem; height: 3.188rem; position: absolute;"><div id="a11449-6" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 3.125rem; height: 3.188rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; margin-left: 0.063rem; width: 1.563rem; height: 3.188rem;"><div id="a8639-7" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 1.563rem; height: 1.563rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a13127-8" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.063rem; width: 1.563rem; height: 1.563rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div></div><div id="a3507-9" style="box-sizing: border-box; line-height: 0.5rem; font-size: 0.3466666666666667rem; color: rgb(34, 34, 34); background-color: transparent; margin-top: 3.281rem; margin-left: 0.031rem; width: 4.719rem; height: 0.5rem; position: absolute;"></div></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "subtshop88"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a7139-0").setAttribute("data-href", a[0].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a8732-1").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a3512-2").setAttribute("data-image", a[0].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a12348-3").setAttribute("data-image", a[0].imageUrl[2].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a12037-4").textContent = a[0].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a6311-5").setAttribute("data-href", a[1].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a11449-6").setAttribute("data-image", a[1].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a8639-7").setAttribute("data-image", a[1].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a13127-8").setAttribute("data-image", a[1].imageUrl[2].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a3507-9").textContent = a[1].title[0].valueDesc
			} catch(d) {}
			return c
		},
		tcheap3: function(a) {
			var b = '<div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 7.281rem; background-color: rgba(255, 255, 255, 0); background-position: initial initial; background-repeat: initial initial;"><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 0.953rem; background-color: rgba(255, 255, 255, 0); background-position: initial initial; background-repeat: initial initial;"><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(204, 204, 204); margin-top: 0.484rem; margin-left: 0.156rem; margin-right: 0.156rem; width: 3.813rem; height: 1px;"></div><div id="a12898-0" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.219rem; width: 0.531rem; height: 0.531rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a8584-1" style="box-sizing: border-box; line-height: 0.953rem; text-align: center; font-size: 0.37333333333333335rem; color: rgb(252, 28, 7); background-color: transparent; margin-right: 0.047rem; width: 1.328rem; height: 0.953rem;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(204, 204, 204); margin-top: 0.484rem; margin-right: 0.156rem; width: 3.813rem; height: 1px;"></div></div><div orientation="undefined" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 3.141rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div id="a11601-2" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 4rem; height: 3.141rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 3.141rem;"></div><div id="a6626-3" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 1.984rem; height: 3.141rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 3.141rem;"></div><div id="a11021-4" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 1.984rem; height: 3.141rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 3.141rem;"></div><div id="a13183-5" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 1.984rem; height: 3.141rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 10rem; height: 1px;"></div><div orientation="undefined" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 3.141rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div id="a11608-6" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 4rem; height: 3.141rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 3.141rem;"></div><div id="a5058-7" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 1.984rem; height: 3.141rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 3.141rem;"></div><div id="a3655-8" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 1.984rem; height: 3.141rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 3.141rem;"></div><div id="a13005-9" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 1.984rem; height: 3.141rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(217, 217, 217); width: 10rem; height: 1px;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(224, 224, 224); width: 10rem; height: 1px;"></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "tcheap3"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a12898-0").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a8584-1").textContent = a[0].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a11601-2").setAttribute("data-href", a[1].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a11601-2").setAttribute("data-image", a[1].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a6626-3").setAttribute("data-href", a[2].targetUrl);
			} catch(d) {}
			try {
				c.querySelector("#a6626-3").setAttribute("data-image", a[2].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a11021-4").setAttribute("data-href", a[3].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a11021-4").setAttribute("data-image", a[3].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a13183-5").setAttribute("data-href", a[4].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a13183-5").setAttribute("data-image", a[4].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a11608-6").setAttribute("data-href", a[5].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a11608-6").setAttribute("data-image", a[5].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a5058-7").setAttribute("data-href", a[6].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a5058-7").setAttribute("data-image", a[6].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a3655-8").setAttribute("data-href", a[7].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a3655-8").setAttribute("data-image", a[7].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a13005-9").setAttribute("data-href", a[8].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a13005-9").setAttribute("data-image", a[8].imageUrl[0].imgUrl)
			} catch(d) {}
			return c
		},
		woyao: function(a) {
			var b = '<div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 4.828rem; background-color: rgba(255, 255, 255, 0); background-position: initial initial; background-repeat: initial initial;"><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 0.844rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div id="a7385-0" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.219rem; margin-left: 3.891rem; width: 0.422rem; height: 0.422rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a9469-1" style="box-sizing: border-box; line-height: 0.844rem; font-size: 0.37333333333333335rem; color: rgb(88, 61, 220); background-color: transparent; margin-left: 0.141rem; width: 1.953rem; height: 0.844rem;"></div><div style="box-sizing: border-box; line-height: 0; margin-left: 2.375rem; width: 2.734rem; height: 0.844rem; background-color: rgba(255, 255, 255, 0); position: relative; background-position: initial initial; background-repeat: initial initial;"><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 2.734rem; height: 0.844rem; background-color: rgba(255, 255, 255, 0); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a4435-2" style="box-sizing: border-box; line-height: 0.844rem; text-align: center; font-size: 0.3333333333333333rem; color: rgb(102, 102, 102); background-color: transparent; margin-left: 0.063rem; width: 0.844rem; height: 0.844rem;"></div><div id="a3787-3" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.313rem; width: 0.141rem; height: 0.25rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a3963-4" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 2.734rem; height: 0.844rem; z-index: 1; position: absolute;"></div></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(239, 239, 239); width: 10rem; height: 1px;"></div><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 3.938rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div style="box-sizing: border-box; line-height: 0; margin-right: 0.047rem; width: 4.953rem; height: 3.938rem; background-color: rgba(255, 255, 255, 0); position: relative; background-position: initial initial; background-repeat: initial initial;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 4.953rem; height: 3.938rem; background-color: rgba(255, 255, 255, 0); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a8770-5" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 4.953rem; height: 3.234rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a3724-6" style="box-sizing: border-box; line-height: 0.328rem; text-align: center; font-size: 0.32rem; color: rgb(153, 153, 153); background-color: transparent; width: 4.953rem; height: 0.328rem;"></div></div><div id="a8123-7" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 4.953rem; height: 3.938rem; z-index: 1; position: absolute;"></div></div><div style="box-sizing: border-box; line-height: 0; margin-right: 0.047rem; width: 4.953rem; height: 3.938rem; background-color: rgba(255, 255, 255, 0); position: relative; background-position: initial initial; background-repeat: initial initial;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 4.953rem; height: 3.938rem; background-color: rgba(255, 255, 255, 0); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a11422-8" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 4.953rem; height: 3.234rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a6317-9" style="box-sizing: border-box; line-height: 0.328rem; text-align: center; font-size: 0.32rem; color: rgb(153, 153, 153); background-color: transparent; width: 4.953rem; height: 0.328rem;"></div></div><div id="a12156-10" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 4.953rem; height: 3.938rem; z-index: 1; position: absolute;"></div></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(221, 221, 221); width: 10rem; height: 1px;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 10rem; height: 1px;"></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "woyao"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a7385-0").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a9469-1").textContent = a[0].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a4435-2").textContent = a[0].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a3787-3").setAttribute("data-image", a[0].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a3963-4").setAttribute("data-href", a[0].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a8770-5").setAttribute("data-image", a[1].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a3724-6").textContent = a[1].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a8123-7").setAttribute("data-href", a[1].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a11422-8").setAttribute("data-image", a[2].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a6317-9").textContent = a[2].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a12156-10").setAttribute("data-href", a[2].targetUrl)
			} catch(d) {}
			return c
		},
		titem: function(a) {
			var b = '<div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 7.813rem;"><div style="box-sizing: border-box; line-height: 0; background-color: rgb(255, 255, 255); margin-bottom: 0.25rem; margin-left: 0.25rem; margin-right: 0.125rem; width: 4.625rem; height: 7.563rem; position: relative; background-position: initial initial; background-repeat: initial initial;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 4.625rem; height: 7.563rem; position: absolute;"><div id="a4121-0" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 4.625rem; height: 5.375rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a4699-1" style="box-sizing: border-box; line-height: 0.938rem; font-size: 0.32rem; color: rgb(102, 102, 102); background-color: transparent; margin: 0.188rem 0.313rem; width: 4rem; height: 0.938rem;"></div><div id="a11356-2" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; margin-left: 0.313rem; margin-right: 0.313rem; width: 4rem; height: 1px; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div orientation="undefined" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 4.625rem; height: 0.875rem;"><div id="a4566-3" style="box-sizing: border-box; line-height: 0.844rem; color: rgb(255, 80, 0); background-color: transparent; margin-bottom: 0.031rem; margin-left: 0.25rem; margin-right: 0.25rem; width: 2.25rem; height: 0.844rem;"></div><div id="a12605-4" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; margin-top: 0.219rem; margin-bottom: 0.219rem; margin-right: 0.125rem; width: 1.75rem; height: 0.438rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div></div><div id="a12394-5" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 4.625rem; height: 7.563rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a7669-6" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 4.625rem; height: 7.563rem; z-index: 1; position: absolute;"></div></div><div style="box-sizing: border-box; line-height: 0; background-color: rgb(255, 255, 255); margin-bottom: 0.25rem; margin-left: 0.125rem; margin-right: 0.25rem; width: 4.625rem; height: 7.563rem; position: relative; background-position: initial initial; background-repeat: initial initial;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 4.625rem; height: 7.563rem; position: absolute;"><div id="a6533-7" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 4.625rem; height: 5.375rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a4625-8" style="box-sizing: border-box; line-height: 0.938rem; font-size: 0.32rem; color: rgb(102, 102, 102); background-color: transparent; margin: 0.188rem 0.313rem; width: 4rem; height: 0.938rem;"></div><div id="a9643-9" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; margin-left: 0.313rem; margin-right: 0.313rem; width: 4rem; height: 1px; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div orientation="undefined" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 4.625rem; height: 0.875rem;"><div id="a12987-10" style="box-sizing: border-box; line-height: 0.844rem; color: rgb(255, 80, 0); background-color: transparent; margin-bottom: 0.031rem; margin-left: 0.25rem; margin-right: 0.25rem; width: 2.25rem; height: 0.844rem;"></div><div id="a3986-11" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; margin-top: 0.219rem; margin-bottom: 0.219rem; margin-right: 0.125rem; width: 1.75rem; height: 0.438rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div></div><div id="a6007-12" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 4.625rem; height: 7.563rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a9426-13" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; margin: 1px; width: 4.594rem; height: 7.531rem; z-index: 1; position: absolute;"></div></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "titem"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a4121-0").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a4699-1").textContent = a[0].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a4566-3").textContent = a[0].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a12605-4").setAttribute("data-image", a[0].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a7669-6").setAttribute("data-href", a[0].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a6533-7").setAttribute("data-image", a[1].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a4625-8").textContent = a[1].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a12987-10").textContent = a[1].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a3986-11").setAttribute("data-image", a[1].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a9426-13").setAttribute("data-href", a[1].targetUrl)
			} catch(d) {}
			return c
		},
		tshop88: function(a) {
			var b = '<div style="box-sizing: border-box; line-height: 0; width: 10rem; height: 5.344rem; position: relative;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 5.344rem; background-color: rgb(255, 255, 255); border-bottom-style: solid; border-bottom-width: 1px; border-bottom-color: rgb(213, 213, 213); border-top-style: solid; border-top-width: 1px; border-top-color: rgb(213, 213, 213); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 0.969rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(255, 155, 67); width: 0.156rem; height: 0.969rem;"></div><div id="a7007-0" style="box-sizing: border-box; line-height: 0.969rem; font-size: 0.41333333333333333rem; color: rgb(34, 34, 34); background-color: transparent; margin-left: 0.188rem; width: 4.656rem; height: 0.969rem;"></div><div style="box-sizing: border-box; line-height: 0; width: 5rem; height: 0.969rem; position: relative;"><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 5rem; height: 0.969rem; position: absolute;"><div id="a7996-1" style="box-sizing: border-box; line-height: 0.969rem; text-align: right; font-size: 0.36rem; color: rgb(102, 102, 102); background-color: transparent; width: 4.266rem; height: 0.969rem;"></div><div id="a10723-2" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.281rem; margin-left: 0.094rem; width: 0.406rem; height: 0.406rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a4095-3" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 5rem; height: 0.969rem; z-index: 1; position: absolute;"></div></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 10rem; height: 1px;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(255, 255, 255); margin-top: 0.156rem; width: 10rem; height: 4.219rem;"></div></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "tshop88"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a7007-0").textContent = a[0].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a7996-1").textContent = a[1].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a10723-2").setAttribute("data-image", a[1].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a4095-3").setAttribute("data-href", a[1].targetUrl)
			} catch(d) {}
			return c
		},
		tcheap5: function(a) {
			var b = '<div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 6.734rem; background-color: rgba(255, 255, 255, 0); background-position: initial initial; background-repeat: initial initial;"><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 0.844rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div id="a9250-0" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.219rem; margin-left: 4.094rem; width: 0.422rem; height: 0.422rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a6920-1" style="box-sizing: border-box; line-height: 0.844rem; font-size: 0.37333333333333335rem; color: rgb(255, 53, 14); background-color: transparent; margin-left: 0.141rem; width: 1.313rem; height: 0.844rem;"></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(239, 239, 239); width: 10rem; height: 1px;"></div><div orientation="undefined" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 2.916rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div id="a9232-2" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 3.828rem; height: 2.916rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 2.916rem;"></div><div id="a5700-3" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.041rem; height: 2.916rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 2.916rem;"></div><div id="a4214-4" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.041rem; height: 2.916rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 2.916rem;"></div><div id="a11919-5" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.047rem; height: 2.916rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 10rem; height: 1px;"></div><div orientation="undefined" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 2.916rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div id="a6570-6" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 3.828rem; height: 2.916rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 2.916rem;"></div><div id="a11497-7" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.041rem; height: 2.916rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 2.916rem;"></div><div id="a10357-8" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.041rem; height: 2.916rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 2.916rem;"></div><div id="a9418-9" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.047rem; height: 2.916rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(217, 217, 217); width: 10rem; height: 1px;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(224, 224, 224); width: 10rem; height: 1px;"></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "tcheap5"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a9250-0").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a6920-1").textContent = a[0].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a9232-2").setAttribute("data-href", a[1].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a9232-2").setAttribute("data-image", a[1].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a5700-3").setAttribute("data-href", a[2].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a5700-3").setAttribute("data-image", a[2].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a4214-4").setAttribute("data-href", a[3].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a4214-4").setAttribute("data-image", a[3].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a11919-5").setAttribute("data-href", a[4].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a11919-5").setAttribute("data-image", a[4].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a6570-6").setAttribute("data-href", a[5].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a6570-6").setAttribute("data-image", a[5].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a11497-7").setAttribute("data-href", a[6].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a11497-7").setAttribute("data-image", a[6].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10357-8").setAttribute("data-href", a[7].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10357-8").setAttribute("data-image", a[7].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a9418-9").setAttribute("data-href", a[8].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a9418-9").setAttribute("data-image", a[8].imageUrl[0].imgUrl)
			} catch(d) {}
			return c
		},
		tnotice: function(a) {
			var b = '<div style="box-sizing: border-box; line-height: 0; width: 10rem; height: 1rem; background-color: rgb(255, 244, 164); position: relative; background-position: initial initial; background-repeat: initial initial;"><div orientation="undefined" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 1rem; position: absolute;"><div id="a13152-0" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.188rem; margin-left: 0.25rem; width: 0.625rem; height: 0.625rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a12618-1" style="box-sizing: border-box; line-height: 0.75rem; font-size: 0.3466666666666667rem; color: rgb(255, 68, 0); background-color: transparent; margin-top: 0.125rem; margin-bottom: 0.125rem; width: 10rem; height: 0.75rem;"></div></div><div id="a5852-2" class=" UIButton" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 1rem; z-index: 1; position: absolute;"></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "tnotice"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a13152-0").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a12618-1").textContent = a[0].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a5852-2").setAttribute("data-href", a[0].targetUrl)
			} catch(d) {}
			return c
		},
		titemtzm: function(a) {
			var b = '<div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 7.813rem;"><div style="box-sizing: border-box; line-height: 0; background-color: white; margin-bottom: 0.25rem; margin-left: 0.25rem; margin-right: 0.125rem; width: 4.625rem; height: 7.563rem; position: relative; background-position: initial initial; background-repeat: initial initial;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 4.625rem; height: 7.563rem; position: absolute;"><div id="a12758-0" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 4.625rem; height: 5.516rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; margin-left: 0.313rem; width: 4.313rem; height: 1.156rem; background-color: white; background-position: initial initial; background-repeat: initial initial;"><div id="a13313-1" style="box-sizing: border-box; line-height: 1.156rem; font-size: 0.49333333333333335rem; color: rgb(93, 50, 153); background-color: transparent; width: auto; height: 1.156rem;"></div><div id="a8342-2" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.391rem; margin-left: 0.109rem; width: 1.266rem; height: 0.406rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(221, 221, 221); margin-left: 0.297rem; margin-right: 0.297rem; width: 4.031rem; height: 1px;"></div><div id="a8495-3" style="box-sizing: border-box; line-height: 0.359rem; font-size: 0.32rem; color: rgb(102, 102, 102); background-color: transparent; margin-top: 0.156rem; margin-left: 0.313rem; width: 4.313rem; height: 0.359rem;"></div></div><div id="a8809-4" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 4.625rem; height: 7.563rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a10099-5" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 4.625rem; height: 7.563rem; z-index: 1; position: absolute;"></div></div><div style="box-sizing: border-box; line-height: 0; background-color: rgb(255, 255, 255); margin-bottom: 0.25rem; margin-left: 0.125rem; margin-right: 0.25rem; width: 4.625rem; height: 7.563rem; position: relative; background-position: initial initial; background-repeat: initial initial;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 4.625rem; height: 7.563rem; position: absolute;"><div id="a9041-6" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 4.625rem; height: 5.375rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a10465-7" style="box-sizing: border-box; line-height: 0.938rem; font-size: 0.32rem; color: rgb(102, 102, 102); background-color: transparent; margin: 0.188rem 0.313rem; width: 4rem; height: 0.938rem;"></div><div id="a7068-8" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; margin-left: 0.313rem; margin-right: 0.313rem; width: 4rem; height: 1px; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div orientation="undefined" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 4.625rem; height: 0.875rem;"><div id="a12616-9" style="box-sizing: border-box; line-height: 0.844rem; color: rgb(255, 80, 0); background-color: transparent; margin-bottom: 0.031rem; margin-left: 0.25rem; margin-right: 0.25rem; width: 2.25rem; height: 0.844rem;"></div><div id="a11095-10" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; margin-top: 0.219rem; margin-bottom: 0.219rem; margin-right: 0.125rem; width: 1.75rem; height: 0.438rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div></div><div id="a6581-11" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 4.625rem; height: 7.563rem; background-size: contain; position: absolute; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a8589-12" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; margin: 1px; width: 4.594rem; height: 7.531rem; z-index: 1; position: absolute;"></div></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "titemtzm"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a12758-0").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a13313-1").textContent = a[0].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a8342-2").setAttribute("data-image", a[0].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a8495-3").textContent = a[0].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a10099-5").setAttribute("data-href", a[0].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a9041-6").setAttribute("data-image", a[1].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10465-7").textContent = a[1].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a12616-9").textContent = a[1].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a11095-10").setAttribute("data-image", a[1].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a8589-12").setAttribute("data-href", a[1].targetUrl)
			} catch(d) {}
			return c
		},
		tcategory5_header: function(a) {
			var b = '<div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 0.859rem; background-color: rgba(255, 255, 255, 0); background-position: initial initial; background-repeat: initial initial;"><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 0.844rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div id="a11460-0" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.219rem; margin-left: 3.891rem; width: 0.422rem; height: 0.422rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a9842-1" style="box-sizing: border-box; line-height: 0.844rem; font-size: 0.37333333333333335rem; color: rgb(255, 71, 69); background-color: transparent; margin-left: 0.141rem; width: 1.953rem; height: 0.844rem;"></div><div style="box-sizing: border-box; line-height: 0; margin-left: 2.375rem; width: 1.219rem; height: 0.844rem; background-color: rgba(255, 255, 255, 0); position: relative; background-position: initial initial; background-repeat: initial initial;"><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 1.219rem; height: 0.844rem; background-color: rgba(255, 255, 255, 0); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a4961-2" style="box-sizing: border-box; line-height: 0.844rem; text-align: center; font-size: 0.3333333333333333rem; color: rgb(102, 102, 102); background-color: transparent; margin-left: 0.063rem; width: 0.844rem; height: 0.844rem;"></div><div id="a7339-3" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.313rem; width: 0.141rem; height: 0.25rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a9988-4" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 1.219rem; height: 0.844rem; z-index: 1; position: absolute;"></div></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(239, 239, 239); width: 10rem; height: 1px;"></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "tcategory5_header"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a11460-0").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a9842-1").textContent = a[0].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a4961-2").textContent = a[0].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a7339-3").setAttribute("data-image", a[0].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a9988-4").setAttribute("data-href", a[0].targetUrl)
			} catch(d) {}
			return c
		},
		t11MallMainEntranceSmall: function(a) {
			var b = '<div style="box-sizing: border-box; line-height: 0; width: 10rem; height: 1.922rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div id="a8551-0" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 1.922rem; z-index: 1; background-size: contain; position: absolute; background-repeat: no-repeat no-repeat;"></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "t11MallMainEntranceSmall"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a8551-0").setAttribute("data-href", a[0].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a8551-0").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			return c
		},
		tcategory5_4i4pic: function(a) {
			var b = '<div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 2.953rem; background-color: rgba(255, 255, 255, 0); background-position: initial initial; background-repeat: initial initial;"><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 2.938rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div style="box-sizing: border-box; line-height: 0; width: 2.484rem; height: 2.938rem; position: relative;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 2.406rem; height: 2.938rem; position: absolute;"><div id="a6458-0" style="box-sizing: border-box; line-height: 0.453rem; font-size: 0.37333333333333335rem; color: rgb(51, 51, 51); background-color: transparent; margin-top: 0.188rem; margin-left: 0.203rem; width: 2.203rem; height: 0.453rem;"></div><div id="a6793-1" style="box-sizing: border-box; line-height: 0.406rem; font-size: 0.32rem; color: rgb(136, 136, 136); background-color: transparent; margin-bottom: 0.094rem; margin-left: 0.203rem; width: 2.203rem; height: 0.406rem;"></div><div id="a8524-2" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.406rem; height: 1.656rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a9488-3" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 2.406rem; height: 2.938rem; z-index: 1; position: absolute;"></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 2.938rem;"></div><div style="box-sizing: border-box; line-height: 0; width: 2.484rem; height: 2.938rem; position: relative;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 2.406rem; height: 2.938rem; position: absolute;"><div id="a9119-4" style="box-sizing: border-box; line-height: 0.453rem; font-size: 0.37333333333333335rem; color: rgb(51, 51, 51); background-color: transparent; margin-top: 0.188rem; margin-left: 0.203rem; width: 2.203rem; height: 0.453rem;"></div><div id="a11619-5" style="box-sizing: border-box; line-height: 0.406rem; font-size: 0.32rem; color: rgb(136, 136, 136); background-color: transparent; margin-bottom: 0.094rem; margin-left: 0.203rem; width: 2.203rem; height: 0.406rem;"></div><div id="a12534-6" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.406rem; height: 1.656rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a10397-7" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 2.406rem; height: 2.938rem; z-index: 1; position: absolute;"></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 2.938rem;"></div><div style="box-sizing: border-box; line-height: 0; width: 2.484rem; height: 2.938rem; position: relative;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 2.406rem; height: 2.938rem; position: absolute;"><div id="a13733-8" style="box-sizing: border-box; line-height: 0.453rem; font-size: 0.37333333333333335rem; color: rgb(51, 51, 51); background-color: transparent; margin-top: 0.188rem; margin-left: 0.203rem; width: 2.203rem; height: 0.453rem;"></div><div id="a4159-9" style="box-sizing: border-box; line-height: 0.406rem; font-size: 0.32rem; color: rgb(136, 136, 136); background-color: transparent; margin-bottom: 0.094rem; margin-left: 0.203rem; width: 2.203rem; height: 0.406rem;"></div><div id="a11042-10" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.406rem; height: 1.656rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a8489-11" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 2.406rem; height: 2.938rem; z-index: 1; position: absolute;"></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 2.938rem;"></div><div style="box-sizing: border-box; line-height: 0; width: 2.484rem; height: 2.938rem; position: relative;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 2.406rem; height: 2.938rem; position: absolute;"><div id="a10115-12" style="box-sizing: border-box; line-height: 0.453rem; font-size: 0.37333333333333335rem; color: rgb(51, 51, 51); background-color: transparent; margin-top: 0.188rem; margin-left: 0.203rem; width: 2.203rem; height: 0.453rem;"></div><div id="a10930-13" style="box-sizing: border-box; line-height: 0.406rem; font-size: 0.32rem; color: rgb(136, 136, 136); background-color: transparent; margin-bottom: 0.094rem; margin-left: 0.203rem; width: 2.203rem; height: 0.406rem;"></div><div id="a11304-14" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.406rem; height: 1.656rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a4553-15" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 2.406rem; height: 2.938rem; z-index: 1; position: absolute;"></div></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 10rem; height: 1px;"></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "tcategory5_4i4pic"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a6458-0").textContent = a[0].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a6793-1").textContent = a[0].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a8524-2").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a9488-3").setAttribute("data-href", a[0].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a9119-4").textContent = a[1].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a11619-5").textContent = a[1].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a12534-6").setAttribute("data-image", a[1].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10397-7").setAttribute("data-href", a[1].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a13733-8").textContent = a[2].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a4159-9").textContent = a[2].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a11042-10").setAttribute("data-image", a[2].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a8489-11").setAttribute("data-href", a[2].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10115-12").textContent = a[3].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a10930-13").textContent = a[3].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a11304-14").setAttribute("data-image", a[3].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a4553-15").setAttribute("data-href", a[3].targetUrl)
			} catch(d) {}
			return c
		},
		tfeatures3: function(a) {
			var b = '<div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 7.25rem; background-color: rgba(255, 255, 255, 0); background-position: initial initial; background-repeat: initial initial;"><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 0.953rem; background-color: rgba(255, 255, 255, 0); background-position: initial initial; background-repeat: initial initial;"><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(204, 204, 204); margin-top: 0.491rem; margin-left: 0.156rem; margin-right: 0.156rem; width: 3.672rem; height: 1px;"></div><div id="a8259-0" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.219rem; width: 0.531rem; height: 0.531rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a12445-1" style="box-sizing: border-box; line-height: 0.953rem; text-align: center; font-size: 0.37333333333333335rem; color: rgb(220, 156, 8); background-color: transparent; margin-right: 0.047rem; width: 1.766rem; height: 0.953rem;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(204, 204, 204); margin-top: 0.491rem; width: 5.188rem; height: 1px;"></div></div><div orientation="undefined" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 3.125rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div id="a4187-2" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 4rem; height: 3.125rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 3.125rem;"></div><div id="a7221-3" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 1.984rem; height: 3.125rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 3.125rem;"></div><div id="a13566-4" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 1.984rem; height: 3.125rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 3.125rem;"></div><div id="a10545-5" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 1.984rem; height: 3.125rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 10rem; height: 1px;"></div><div orientation="undefined" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 3.141rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div id="a5102-6" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 4rem; height: 3.141rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 3.141rem;"></div><div id="a12734-7" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 1.984rem; height: 3.141rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 3.141rem;"></div><div id="a11980-8" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 1.984rem; height: 3.141rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 3.141rem;"></div><div id="a3931-9" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 1.984rem; height: 3.141rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 10rem; height: 0.013rem;"></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "tfeatures3"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a8259-0").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a12445-1").textContent = a[0].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a4187-2").setAttribute("data-href", a[1].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a4187-2").setAttribute("data-image", a[1].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a7221-3").setAttribute("data-href", a[2].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a7221-3").setAttribute("data-image", a[2].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a13566-4").setAttribute("data-href", a[3].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a13566-4").setAttribute("data-image", a[3].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10545-5").setAttribute("data-href", a[4].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10545-5").setAttribute("data-image", a[4].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a5102-6").setAttribute("data-href", a[5].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a5102-6").setAttribute("data-image", a[5].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a12734-7").setAttribute("data-href", a[6].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a12734-7").setAttribute("data-image", a[6].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a11980-8").setAttribute("data-href", a[7].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a11980-8").setAttribute("data-image", a[7].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a3931-9").setAttribute("data-href", a[8].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a3931-9").setAttribute("data-image", a[8].imageUrl[0].imgUrl)
			} catch(d) {}
			return c
		},
		tmore5: function(a) {
			var b = '<div style="box-sizing: border-box; line-height: 0; width: 10rem; height: 0.953rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 0.953rem; background-color: rgba(255, 255, 255, 0); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a10885-0" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 4.266rem; height: 0.953rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a12464-1" style="box-sizing: border-box; line-height: 0.953rem; text-align: right; font-size: 0.3333333333333333rem; color: rgb(102, 102, 102); background-color: transparent; margin-left: 3.125rem; margin-right: 0.078rem; width: 2.219rem; height: 0.953rem;"></div><div id="a5302-2" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.359rem; width: 0.141rem; height: 0.25rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a5559-3" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 10rem; height: 0.953rem; z-index: 1; position: absolute;"></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "tmore5"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a10885-0").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a12464-1").textContent = a[0].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a5302-2").setAttribute("data-image", a[0].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a5559-3").setAttribute("data-href", a[0].targetUrl)
			} catch(d) {}
			return c
		},
		tcategory5_2i4pic: function(a) {
			var b = '<div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 2.797rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 2.781rem; background-color: rgba(255, 255, 255, 0); background-position: initial initial; background-repeat: initial initial;"><div style="box-sizing: border-box; line-height: 0; width: 4.984rem; height: 2.781rem; position: relative;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 4.984rem; height: 2.781rem; position: absolute;"><div id="a5016-0" style="box-sizing: border-box; line-height: 0.469rem; font-size: 0.37333333333333335rem; color: rgb(38, 38, 38); background-color: transparent; margin-top: 0.219rem; margin-left: 0.219rem; width: 4.766rem; height: 0.469rem;"></div><div id="a4426-1" style="box-sizing: border-box; line-height: 0.397rem; font-size: 0.29333333333333333rem; color: rgb(136, 136, 136); background-color: transparent; margin-bottom: 0.103rem; margin-left: 0.219rem; width: 4.766rem; height: 0.397rem;"></div><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; margin-left: 0.234rem; width: 4.75rem; height: 1.516rem;"><div id="a9778-2" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.25rem; height: 1.516rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a10057-3" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.25rem; height: 1.516rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div></div><div id="a10945-4" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 4.984rem; height: 2.781rem; z-index: 1; position: absolute;"></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 2.781rem;"></div><div style="box-sizing: border-box; line-height: 0; width: 4.984rem; height: 2.781rem; position: relative;"><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 4.984rem; height: 2.781rem; position: absolute;"><div id="a12370-5" style="box-sizing: border-box; line-height: 0.469rem; font-size: 0.37333333333333335rem; color: rgb(38, 38, 38); background-color: transparent; margin-top: 0.219rem; margin-left: 0.219rem; width: 4.766rem; height: 0.469rem;"></div><div id="a10198-6" style="box-sizing: border-box; line-height: 0.397rem; font-size: 0.29333333333333333rem; color: rgb(136, 136, 136); background-color: transparent; margin-bottom: 0.103rem; margin-left: 0.219rem; width: 4.766rem; height: 0.397rem;"></div><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; margin-left: 0.234rem; width: 4.75rem; height: 1.516rem;"><div id="a5739-7" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.25rem; height: 1.516rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a12459-8" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.25rem; height: 1.516rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div></div><div id="a8487-9" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 4.984rem; height: 2.781rem; z-index: 1; position: absolute;"></div></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 10rem; height: 1px;"></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "tcategory5_2i4pic"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a5016-0").textContent = a[0].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a4426-1").textContent = a[0].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a9778-2").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10057-3").setAttribute("data-image", a[0].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10945-4").setAttribute("data-href", a[0].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a12370-5").textContent = a[1].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a10198-6").textContent = a[1].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a5739-7").setAttribute("data-image", a[1].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a12459-8").setAttribute("data-image", a[1].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a8487-9").setAttribute("data-href", a[1].targetUrl)
			} catch(d) {}
			return c
		},
		rushbuy42: function(a) {
			var b = '<div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 4.828rem;"><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 4.797rem; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><div style="box-sizing: border-box; line-height: 0; width: 4rem; height: 4.797rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div id="a4356-0" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 4rem; height: 4.813rem; z-index: 1; background-size: contain; position: absolute; background-repeat: no-repeat no-repeat;"></div><div class=" TBRushBuyCounterLabel" style="box-sizing: border-box; line-height: 0; margin-top: 1.406rem; margin-left: 0.359rem; width: 2.781rem; height: 0.688rem; position: absolute;"></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 4.797rem;"></div><div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 5.984rem; height: 4.797rem;"><div style="box-sizing: border-box; line-height: 0; width: 5.984rem; height: 1.922rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 5.984rem; height: 1.922rem; background-color: rgb(255, 255, 255); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a5194-1" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 3.516rem; height: 1.922rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a10727-2" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 1.922rem; height: 1.922rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a13547-3" class=" UIButton" style="box-sizing: border-box; line-height: 0; width: 5.984rem; height: 1.922rem; z-index: 1; position: absolute;"></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 5.984rem; height: 1px;"></div><div orientation="undefined" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 6rem; height: 2.875rem;"><div id="a9920-4" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.969rem; height: 2.875rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 1px; height: 2.875rem;"></div><div id="a6719-5" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 2.969rem; height: 2.875rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div></div></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(217, 217, 217); width: 10rem; height: 1px;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(224, 224, 224); width: 10rem; height: 1px;"></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "rushbuy42"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a4356-0").setAttribute("data-href", a[0].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a4356-0").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a5194-1").setAttribute("data-image", a[1].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10727-2").setAttribute("data-image", a[1].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a13547-3").setAttribute("data-href", a[1].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a9920-4").setAttribute("data-href", a[2].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a9920-4").setAttribute("data-image", a[2].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a6719-5").setAttribute("data-href", a[3].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a6719-5").setAttribute("data-image", a[3].imageUrl[0].imgUrl)
			} catch(d) {}
			return c
		},
		titembanner: function(a) {
			var b = '<div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; margin-top: 0.141rem; width: 10rem; height: 3.438rem; background-color: rgba(255, 255, 255, 0); background-position: initial initial; background-repeat: initial initial;"><div id="a4752-0" style="box-sizing: border-box; line-height: 0.375rem; text-align: center; font-size: 0.3333333333333333rem; color: rgb(61, 66, 69); background-color: transparent; margin-bottom: 0.234rem; width: 10rem; height: 0.375rem;"></div><div id="a11348-1" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; background-color: transparent; margin-left: 0.344rem; margin-right: 0.344rem; width: 9.313rem; height: 2.563rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "titembanner"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a4752-0").textContent = a[0].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a11348-1").setAttribute("data-href", a[0].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a11348-1").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			return c
		},
		tdarentao3: function(a) {
			var b = '<div orientation="1" class=" vertical-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 4.906rem; background-color: rgba(255, 255, 255, 0); background-position: initial initial; background-repeat: initial initial;"><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 0.953rem; background-color: rgba(255, 255, 255, 0); background-position: initial initial; background-repeat: initial initial;"><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(204, 204, 204); margin-top: 0.487rem; margin-left: 0.156rem; margin-right: 0.156rem; width: 3.828rem; height: 0.013rem;"></div><div id="a6118-0" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.219rem; width: 0.531rem; height: 0.531rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div><div id="a13732-1" style="box-sizing: border-box; line-height: 0.953rem; text-align: center; font-size: 0.37333333333333335rem; color: rgb(244, 13, 32); background-color: transparent; margin-right: 0.047rem; width: 1.359rem; height: 0.953rem;"></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(204, 204, 204); margin-top: 0.487rem; width: 2.703rem; height: 0.013rem;"></div><div style="box-sizing: border-box; line-height: 0; width: 2.734rem; height: 0.953rem; background-color: rgba(255, 255, 255, 0); position: relative; background-position: initial initial; background-repeat: initial initial;"><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 2.734rem; height: 0.953rem; background-color: rgba(255, 255, 255, 0); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a7941-2" style="box-sizing: border-box; line-height: 0.953rem; text-align: center; font-size: 0.3333333333333333rem; color: rgb(102, 102, 102); background-color: transparent; margin-left: 0.063rem; width: 0.844rem; height: 0.953rem;"></div><div id="a12817-3" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-top: 0.359rem; width: 0.141rem; height: 0.25rem; background-size: contain; background-position: 50% 50%; background-repeat: no-repeat no-repeat;"></div></div><div id="a10045-4" class=" UIButton" style="box-sizing: border-box; line-height: 0; background-color: transparent; width: 2.734rem; height: 0.953rem; z-index: 1; position: absolute;"></div></div></div><div class=" UIView" style="box-sizing: border-box; line-height: 0; background-color: rgb(232, 232, 232); width: 10rem; height: 1px;"></div><div style="box-sizing: border-box; line-height: 0; width: 10rem; height: 3.922rem; background-color: rgb(255, 255, 255); position: relative; background-position: initial initial; background-repeat: initial initial;"><div orientation="0" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; margin-top: 0.156rem; margin-left: 0.156rem; width: 9.844rem; height: 3.766rem; background-color: rgb(255, 255, 255); position: absolute; background-position: initial initial; background-repeat: initial initial;"><div id="a13528-5" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-right: 0.156rem; width: 3.125rem; height: 3.609rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div id="a10224-6" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-right: 0.156rem; width: 3.125rem; height: 3.609rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div><div id="a6986-7" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; margin-right: 0.156rem; width: 3.125rem; height: 3.609rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div></div></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "tdarentao3"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a6118-0").setAttribute("data-image", a[0].imageUrl[0].imgUrl);
			} catch(d) {}
			try {
				c.querySelector("#a13732-1").textContent = a[0].title[0].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a7941-2").textContent = a[0].title[1].valueDesc
			} catch(d) {}
			try {
				c.querySelector("#a12817-3").setAttribute("data-image", a[0].imageUrl[1].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10045-4").setAttribute("data-href", a[0].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a13528-5").setAttribute("data-href", a[1].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a13528-5").setAttribute("data-image", a[1].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10224-6").setAttribute("data-href", a[2].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a10224-6").setAttribute("data-image", a[2].imageUrl[0].imgUrl)
			} catch(d) {}
			try {
				c.querySelector("#a6986-7").setAttribute("data-href", a[3].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a6986-7").setAttribute("data-image", a[3].imageUrl[0].imgUrl)
			} catch(d) {}
			return c
		},
		tbanner3: function(a) {
			var b = '<div orientation="undefined" class=" horizontal-view" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 2rem;"><div id="a4593-0" class=" lazy" lazyload="true" style="box-sizing: border-box; line-height: 0; width: 10rem; height: 2rem; z-index: 1; background-size: contain; background-repeat: no-repeat no-repeat;"></div></div>',
				c = document.createElement("div");
			c.setAttribute("data-template-name", "tbanner3"), c.style.position = "relative", c.innerHTML = b;
			try {
				c.querySelector("#a4593-0").setAttribute("data-href", a[0].targetUrl)
			} catch(d) {}
			try {
				c.querySelector("#a4593-0").setAttribute("data-image", a[0].imageUrl[0].imgUrl)
			} catch(d) {}
			return c
		},
		rushbuy_counter: function(a) {
			var b = a.future_time.match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
			if(b) {
				b = new Date(b[1], b[2] - 1, b[3], b[4], b[5], b[6]);
				var c = document.createElement("div");
				return c.setAttribute("data-ctrl-name", "counter"), c.setAttribute("data-enddate", b.toString()), c.innerHTML = '<span role="h"></span><span class="dot">:</span><span role="m"></span><span class="dot">:</span><span role="s"></span>', c
			}
		},
		toutiao_item: function(a) {
			var b = document.createElement("div"),
				c = document.createElement("span"),
				d = document.createElement("span"),
				e = document.createElement("span");
			return b.setAttribute("data-href", a.targetUrl), b.style.cssText = "width: 10rem; padding: 0.09375rem 0; height: 0.75rem;", b.className = "horizontal-view", c.style.cssText = "display: block; border-right: 1px solid #E8E8E8; width: 2.1875rem; height: 100%; box-sizing: border-box; background: url(" + a.imageUrl[0].imgUrl + ") no-repeat center center; background-size: 1.6171875rem 0.46875rem;", d.textContent = a.title[0].valueDesc, d.style.cssText = "display: block; margin: 0.125rem 0.15625rem 0.125rem 0.28125rem; padding:0 0.0625rem; height: 0.46875rem; line-height: 0.46875rem; border: 1px solid #D81421; border-radius: 0.125rem; color: #D81421; font-size: 0.375rem; text-align:center; overflow:hidden; max-width:2rem", e.textContent = a.title[1].valueDesc, e.style.cssText = "display: block; overflow:hidden; margin: 0.125rem 0; height: 0.5rem; line-height: 0.5rem; color: #353535; font-size: 0.40625rem; width: 6rem; flex:1", b.appendChild(c), b.appendChild(d), b.appendChild(e), b
		},
		t11Headline_item: function(a) {
			var b = document.createElement("a"),
				c = document.createElement("span"),
				d = document.createElement("span");
			return b.setAttribute("data-href", a.targetUrl), c.textContent = a.title[0].valueDesc, d.textContent = a.title[1].valueDesc, b.appendChild(c), b.appendChild(d), b
		},
		tbanner_items: function(a) {
			var b = document.createElement("div");
			b.className = "slide-banner", b.style.cssText = "height: 100%; width: 10rem; overflow: hidden; position: relative;";
			var c = document.createElement("ul");
			c.style.cssText = "height: 100%; width: 10rem; ";
			var d = document.createElement("div");
			return d.className = "indicator", d.style.cssText = "right: 0; height: 0.28125rem; position: absolute; bottom: 0.25rem; text-align: center;  -webkit-transform: translateZ(0); -ms-transform: translateZ(0); transform: translateZ(0);", a.forEach(function(a, b) {
				try {
					var d = document.createElement("li");
					if(d.className = "card", d.style.cssText = "display: block; width: 10rem; height: 100%;", a.bizType || (a.bizType = "WXZC"), "zuanzhan" === a.bizType.toLowerCase())
						if(0 === a.targetUrl.indexOf("http")) {
							var e = JSON.parse(a.extra);
							d.innerHTML = '<a data-href="' + e.eurl + '" data-type="' + a.bizType.toUpperCase() + '" style="display:block;width:100%;height:100%;vertical-align:middle;overflow:hidden;"><img style="width:100%;height:100%;" ' + (0 === b ? 'lazyload="true"' : 'class="lazyimg"') + '" src="//assets.alicdn.com/mw/webapp/fav/img/grey.gif" ' + (0 === b ? "data-src" : "dataimg") + '="' + (a.imageUrl && a.imageUrl[0].imgUrl || "") + '"></a>'
						} else d.innerHTML = '<a id="tanx-a-' + a.targetUrl + '" data="' + a.targetUrl + '" data-type="' + a.bizType.toUpperCase() + '" style="display:none"></a>';
					else d.innerHTML = '<a data-href="' + a.targetUrl + '" data-type="' + a.bizType.toUpperCase() + '" style="display:block;width:100%;height:100%;vertical-align:middle;overflow:hidden;"><img style="width:100%;height:100%;" ' + (0 === b ? 'lazyload="true"' : 'class="lazyimg"') + '" src="//assets.alicdn.com/mw/webapp/fav/img/grey.gif" ' + (0 === b ? "data-src" : "dataimg") + '="' + (a.imageUrl && a.imageUrl[0].imgUrl || "") + '"></a>';
					c.appendChild(d)
				} catch(f) {
					console.error(f)
				}
			}), b.appendChild(c), b.appendChild(d), b
		},
		slide_pager: function(a) {
			var b = document.createElement("div");
			return b.style.cssText = "height: 100%; width: 10rem; overflow: hidden; position: relative;", b.innerHTML = '<div class="slide-pager" style="height:100%; width: 10rem; overflow: hidden; position: relative;"><ul style="height: 100%; width: 10rem; "></ul><div class="indicator" style=" height: 0.28125rem; right: 0px; position: absolute; bottom: 0.1rem; text-align: center; -webkit-transform: translateZ(0); -ms-transform: translateZ(0); transform: translateZ(0); z-index:1; "></div></div>', b
		},
		pagelayout: function() {
			var a = document.createElement("div");
			return a.setAttribute("data-ctrl-name", "scroll-view"), a.innerHTML = ['<div class="scroll-wrap">', '<div class="scroll-content">', "</div>", "</div>"].join(""), a
		},
		pageheader: function() {
			var a = document.createElement("header");
			return a.innerHTML = ['<div class="header-wrap">', '<div id="search-placeholder"><span>寻找宝贝店铺</span></div>', "</div>"].join(""), a
		},
		pagecontent: function() {
			var a = document.createElement("div");
			return a.id = "content", a
		},
		pageguessitem: function() {
			var a = document.createElement("div");
			return a.id = "guessitem", a.innerHTML = ['<div class="loading"><span>正在为你加载更多内容...</span></div>'].join(""), a
		},
		pagebar: function() {
			var a = document.createElement("footer"),
				b = location.protocol;
			return a.innerHTML = ['<a class="home"><span>&#xe605;</span><p>首页</p></a>', '<a class="delivery" data-href="' + b + '//h5.m.taobao.com/awp/mtb/olist.htm?sta=5"><span>&#xe601;</span><p>物流</p></a>', '<a class="cart" data-href="' + b + '//h5.m.taobao.com/awp/base/bag.htm?pds=cart%23h%23taojia"><span>&#xe604;</span><p>购物车</p></a>', '<a class="my" data-href="' + b + '//h5.m.taobao.com/awp/mtb/mtb.htm"><span>&#xe602;</span><p>我的淘宝</p></a>', '<a class="more" data-href="taobao://h5.m.taobao.com/moreapp/index.html?pds=apply%23h%23taojia"><span>&#xe606;</span><p>更多</p></a>'].join(""), a
		},
		pagebottom: function() {
			var a = document.createElement("div");
			return a.setAttribute("data-template-name", "pagebottom"), a.innerHTML = ['<div style="width: 10rem;">', '<div class="buttons">', '<a href="//www.taobao.com/index.php?from=wap">电脑版</a>', '<a href="//h5.m.taobao.com/other/feedback.html?alphatext=new_h5_index">用户反馈</a>', "</div>", '<div class="copyright">2016 浙 B2-20080224 <a>服务中心</a></div>', "</div>"].join(""), a
		}
	}
}(window),
function(a, b) {
	function c(a) {
		Object.defineProperty(this, "val", {
			value: a.toString(),
			enumerable: !0
		}), this.gt = function(a) {
			return c.compare(this, a) > 0
		}, this.gte = function(a) {
			return c.compare(this, a) >= 0
		}, this.lt = function(a) {
			return c.compare(this, a) < 0
		}, this.lte = function(a) {
			return c.compare(this, a) <= 0
		}, this.eq = function(a) {
			return 0 === c.compare(this, a)
		}
	}
	b.env = b.env || {}, c.prototype.toString = function() {
		return this.val
	}, c.prototype.valueOf = function() {
		for(var a = this.val.split("."), b = [], c = 0; c < a.length; c++) {
			var d = parseInt(a[c], 10);
			isNaN(d) && (d = 0);
			var e = d.toString();
			e.length < 5 && (e = Array(6 - e.length).join("0") + e), b.push(e), 1 === b.length && b.push(".")
		}
		return parseFloat(b.join(""))
	}, c.compare = function(a, b) {
		a = a.toString().split("."), b = b.toString().split(".");
		for(var c = 0; c < a.length || c < b.length; c++) {
			var d = parseInt(a[c], 10),
				e = parseInt(b[c], 10);
			if(window.isNaN(d) && (d = 0), window.isNaN(e) && (e = 0), e > d) return -1;
			if(d > e) return 1
		}
		return 0
	}, b.version = function(a) {
		return new c(a)
	}
}(window, window.lib || (window.lib = {})),
function(a, b) {
	b.env = b.env || {};
	var c = a.location.search.replace(/^\?/, "");
	if(b.env.params = {}, c)
		for(var d = c.split("&"), e = 0; e < d.length; e++) {
			var f = d[e].split("=")[0],
				g = f + "=",
				h = d[e].split(g)[1];
			d[e] = d[e].split("=");
			try {
				b.env.params[d[e][0]] = decodeURIComponent(h)
			} catch(i) {
				b.env.params[d[e][0]] = h
			}
		}
}(window, window.lib || (window.lib = {})),
function(a, b) {
	b.env = b.env || {};
	var c, d = a.navigator.userAgent;
	if(c = d.match(/Windows\sPhone\s(?:OS\s)?([\d\.]+)/)) b.env.os = {
		name: "Windows Phone",
		isWindowsPhone: !0,
		version: c[1]
	};
	else if(d.match(/Safari/) && (c = d.match(/Android[\s\/]([\d\.]+)/))) b.env.os = {
		version: c[1]
	}, d.match(/Mobile\s+Safari/) ? (b.env.os.name = "Android", b.env.os.isAndroid = !0) : (b.env.os.name = "AndroidPad", b.env.os.isAndroidPad = !0);
	else if(c = d.match(/(iPhone|iPad|iPod)/)) {
		var e = c[1];
		(c = d.match(/OS ([\d_\.]+) like Mac OS X/)) && (b.env.os = {
			name: e,
			isIPhone: "iPhone" === e || "iPod" === e,
			isIPad: "iPad" === e,
			isIOS: !0,
			version: c[1].split("_").join(".")
		})
	}
	b.env.os || (b.env.os = {
		name: "unknown",
		version: "0.0.0"
	}), b.version && (b.env.os.version = b.version(b.env.os.version))
}(window, window.lib || (window.lib = {})),
function(a, b) {
	b.env = b.env || {};
	var c, d = a.navigator.userAgent;
	(c = d.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/)) ? b.env.browser = {
		name: "UC",
		isUC: !0,
		version: c[1]
	}: (c = d.match(/MQQBrowser\/([\d\.]+)/)) ? b.env.browser = {
		name: "QQ",
		isQQ: !0,
		version: c[1]
	} : (c = d.match(/(?:Firefox|FxiOS)\/([\d\.]+)/)) ? b.env.browser = {
		name: "Firefox",
		isFirefox: !0,
		version: c[1]
	} : (c = d.match(/MSIE\s([\d\.]+)/)) || (c = d.match(/IEMobile\/([\d\.]+)/)) ? (b.env.browser = {
		version: c[1]
	}, d.match(/IEMobile/) ? (b.env.browser.name = "IEMobile", b.env.browser.isIEMobile = !0) : (b.env.browser.name = "IE", b.env.browser.isIE = !0), d.match(/Android|iPhone/) && (b.env.browser.isIELikeWebkit = !0)) : (c = d.match(/(?:Chrome|CriOS)\/([\d\.]+)/)) ? (b.env.browser = {
		name: "Chrome",
		isChrome: !0,
		version: c[1]
	}, d.match(/Version\/[\d+\.]+\s*Chrome/) && (b.env.browser.name = "Chrome Webview", b.env.browser.isWebview = !0)) : d.match(/Safari/) && (c = d.match(/Android[\s\/]([\d\.]+)/)) ? b.env.browser = {
		name: "Android",
		isAndroid: !0,
		version: c[1]
	} : d.match(/iPhone|iPad|iPod/) && (d.match(/Safari/) && (c = d.match(/Version\/([\d\.]+)/)) ? b.env.browser = {
		name: "Safari",
		isSafari: !0,
		version: c[1]
	} : (c = d.match(/OS ([\d_\.]+) like Mac OS X/)) && (b.env.browser = {
		name: "iOS Webview",
		isWebview: !0,
		version: c[1].replace(/\_/g, ".")
	})), b.env.browser || (b.env.browser = {
		name: "unknown",
		version: "0.0.0"
	}), b.version && (b.env.browser.version = b.version(b.env.browser.version))
}(window, window.lib || (window.lib = {})),
function(a, b) {
	b.env = b.env || {};
	var c = a.navigator.userAgent;
	c.match(/Weibo/i) ? b.env.thirdapp = {
		appname: "Weibo",
		isWeibo: !0
	} : c.match(/MicroMessenger/i) ? b.env.thirdapp = {
		appname: "Weixin",
		isWeixin: !0
	} : b.env.thirdapp = !1
}(window, window.lib || (window.lib = {})),
function(a, b) {
	b.env = b.env || {};
	var c, d, e = a.navigator.userAgent;
	(d = e.match(/WindVane[\/\s]([\d\.\_]+)/)) && (c = d[1]);
	var f = !1,
		g = "",
		h = "",
		i = "",
		j = a._ua_popLayer || "",
		k = !1,
		l = "";
	(d = e.match(/AliApp\(([A-Z\-]+)\/([\d\.]+)\)/i)) && (f = !0, g = d[1], i = d[2], h = g.indexOf("-PD") > 0 ? b.env.os.isIOS ? "iPad" : b.env.os.isAndroid ? "AndroidPad" : b.env.os.name : b.env.os.name), !g && e.indexOf("TBIOS") > 0 && (g = "TB"), j && (d = j.match(/PopLayer\/([\d\.]+)/i)) && (k = !0, l = d[1]), f ? b.env.aliapp = {
		windvane: b.version(c || "0.0.0"),
		appname: g || "unkown",
		version: b.version(i || "0.0.0"),
		platform: h || b.env.os.name,
		poplayer: k || !1,
		poplayerVersion: b.version(l || "0.0.0")
	} : b.env.aliapp = !1, b.env.taobaoApp = b.env.aliapp
}(window, window.lib || (window.lib = {})),
function(a, b) {
	function c(a) {
		var b = {};
		Object.defineProperty(this, "params", {
			set: function(a) {
				if("object" == typeof a) {
					for(var c in b) delete b[c];
					for(var c in a) b[c] = a[c]
				}
			},
			get: function() {
				return b
			},
			enumerable: !0
		}), Object.defineProperty(this, "search", {
			set: function(a) {
				if("string" == typeof a) {
					0 === a.indexOf("?") && (a = a.substr(1));
					var c = a.split("&");
					for(var d in b) delete b[d];
					for(var e = 0; e < c.length; e++) {
						var f = c[e].split("=");
						if(void 0 !== f[1] && (f[1] = f[1].toString()), f[0]) try {
							b[decodeURIComponent(f[0])] = decodeURIComponent(f[1])
						} catch(g) {
							b[f[0]] = f[1]
						}
					}
				}
			},
			get: function() {
				var a = [];
				for(var c in b)
					if(void 0 !== b[c])
						if("" !== b[c]) try {
							a.push(encodeURIComponent(c) + "=" + encodeURIComponent(b[c]))
						} catch(d) {
							a.push(c + "=" + b[c])
						} else try {
							a.push(encodeURIComponent(c))
						} catch(d) {
							a.push(c)
						}
						return a.length ? "?" + a.join("&") : ""
			},
			enumerable: !0
		});
		var c;
		Object.defineProperty(this, "hash", {
			set: function(a) {
				"string" == typeof a && (a && a.indexOf("#") < 0 && (a = "#" + a), c = a || "")
			},
			get: function() {
				return c
			},
			enumerable: !0
		}), this.set = function(a) {
			a = a || "";
			var b;
			if(!(b = a.match(new RegExp("^([a-z0-9-]+:)?[/]{2}(?:([^@/:?]+)(?::([^@/:]+))?@)?([^:/?#]+)(?:[:]([0-9]+))?([/][^?#;]*)?(?:[?]([^#]*))?([#][^?]*)?$", "i")))) throw new Error("Wrong uri scheme.");
			this.protocol = b[1] || ("object" == typeof location ? location.protocol : ""), this.username = b[2] || "", this.password = b[3] || "", this.hostname = this.host = b[4], this.port = b[5] || "", this.pathname = b[6] || "/", this.search = b[7] || "", this.hash = b[8] || "", this.origin = this.protocol + "//" + this.hostname
		}, this.toString = function() {
			var a = this.protocol + "//";
			return this.username && (a += this.username, this.password && (a += ":" + this.password), a += "@"), a += this.host, this.port && "80" !== this.port && (a += ":" + this.port), this.pathname && (a += this.pathname), this.search && (a += this.search), this.hash && (a += this.hash), a
		}, a && this.set(a.toString())
	}
	b.httpurl = function(a) {
		return new c(a)
	}
}(window, window.lib || (window.lib = {})),
function(a, b) {
	function c(a) {
		var b;
		if("number" == typeof a) b = new Date(1e3 * a);
		else if("string" == typeof a) {
			var c = a.charAt(0),
				d = "+" === c,
				h = "-" === c;
			if(d || h) {
				for(var i, j = a.substr(1), k = j.split(":"), l = [0, 0, 0, 0], m = 4; k.length && --m >= 0;) l[m] = parseInt(k.pop()) || 0;
				i = e * l[0] + f * l[1] + g * l[2] + l[3], b = new Date, b.setSeconds(b.getSeconds() + i * (h ? -1 : 1)), b.setMilliseconds(0)
			}
		}
		return b || (b = new Date(a)), b
	}

	function d(a, b) {
		return b.replace(FORMATTER_REGEXP, function(b) {
			var c = b.length,
				d = b.charAt(0);
			if("\\" === d) return b.replace("\\", "");
			var e = ("d" === d ? a.days : "h" === d ? a.hours : "m" === d ? a.minutes : "s" === d ? a.seconds : 0) + "";
			return("00000" + e).substr(-Math.max(e.length, c))
		})
	}
	var e = 86400,
		f = 3600,
		g = 60,
		h = "d天hh时mm分ss秒";
	FORMATTER_REGEXP = /(\\)?(dd*|hh?|mm?|ss?)/gi;
	var i = function(a) {
		a = a || {};
		var b = this,
			d = c(a.endDate);
		if(!d || !d.getTime()) throw new Error("Invalid endDate");
		b.endDate = d, b.onUpdate = a.onUpdate, b.onEnd = a.onEnd, b.interval = a.interval || 1e3, b.stringFormatter = a.stringFormatter || h, b.correctDateOffset = a.correctDateOffset || 0, b.updateElement = a.updateElement, b._data = {
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0
		}
	};
	i.prototype = {
		start: function() {
			var a = this;
			return a.stop(), a._update() && (a._intervalId = setInterval(function() {
				a._update()
			}, a.interval)), a
		},
		_update: function() {
			var a, b = this,
				c = b._data,
				h = b.updateElement,
				i = +new Date + 1e3 * b.correctDateOffset,
				j = Math.max(0, Math.round((b.endDate.getTime() - i) / 1e3)),
				k = 0 >= j;
			return c.totalSeconds = j, j -= (c.days = Math.floor(j / e)) * e, j -= (c.hours = Math.floor(j / f)) * f, j -= (c.minutes = Math.floor(j / g)) * g, c.seconds = j, c.stringValue = d(c, b.stringFormatter), h && (h.innerHTML = c.stringValue), (a = b.onUpdate) && a.call(b, c), k ? (b.stop(), (a = b.onEnd) && a.call(b), !1) : !0
		},
		stop: function() {
			var a = this;
			return a._intervalId && (clearInterval(a._intervalId), a._intervalId = null), a
		},
		setEndDate: function(a) {
			var b = this;
			return b.endDate = c(a), b
		}
	}, b.countdown = function(a) {
		return new i(a)
	}
}(window, window.lib || (window.lib = {})),
function(a, b) {
	function c() {
		var a = {},
			b = new m(function(b, c) {
				a.resolve = b, a.reject = c
			});
		return a.promise = b, a
	}

	function d(a, b) {
		for(var c in b) void 0 === a[c] && (a[c] = b[c]);
		return a
	}

	function e(a) {
		var b = document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0] || document.firstElementChild || document;
		b.appendChild(a)
	}

	function f(a) {
		var b = [];
		for(var c in a) a[c] && b.push(c + "=" + encodeURIComponent(a[c]));
		return b.join("&")
	}

	function g(a) {
		function b(a, b) {
			return a << b | a >>> 32 - b
		}

		function c(a, b) {
			var c, d, e, f, g;
			return e = 2147483648 & a, f = 2147483648 & b, c = 1073741824 & a, d = 1073741824 & b, g = (1073741823 & a) + (1073741823 & b), c & d ? 2147483648 ^ g ^ e ^ f : c | d ? 1073741824 & g ? 3221225472 ^ g ^ e ^ f : 1073741824 ^ g ^ e ^ f : g ^ e ^ f
		}

		function d(a, b, c) {
			return a & b | ~a & c
		}

		function e(a, b, c) {
			return a & c | b & ~c
		}

		function f(a, b, c) {
			return a ^ b ^ c
		}

		function g(a, b, c) {
			return b ^ (a | ~c)
		}

		function h(a, e, f, g, h, i, j) {
			return a = c(a, c(c(d(e, f, g), h), j)), c(b(a, i), e)
		}

		function i(a, d, f, g, h, i, j) {
			return a = c(a, c(c(e(d, f, g), h), j)), c(b(a, i), d)
		}

		function j(a, d, e, g, h, i, j) {
			return a = c(a, c(c(f(d, e, g), h), j)), c(b(a, i), d)
		}

		function k(a, d, e, f, h, i, j) {
			return a = c(a, c(c(g(d, e, f), h), j)), c(b(a, i), d)
		}

		function l(a) {
			for(var b, c = a.length, d = c + 8, e = (d - d % 64) / 64, f = 16 * (e + 1), g = new Array(f - 1), h = 0, i = 0; c > i;) b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | a.charCodeAt(i) << h, i++;
			return b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | 128 << h, g[f - 2] = c << 3, g[f - 1] = c >>> 29, g
		}

		function m(a) {
			var b, c, d = "",
				e = "";
			for(c = 0; 3 >= c; c++) b = a >>> 8 * c & 255, e = "0" + b.toString(16), d += e.substr(e.length - 2, 2);
			return d
		}

		function n(a) {
			a = a.replace(/\r\n/g, "\n");
			for(var b = "", c = 0; c < a.length; c++) {
				var d = a.charCodeAt(c);
				128 > d ? b += String.fromCharCode(d) : d > 127 && 2048 > d ? (b += String.fromCharCode(d >> 6 | 192), b += String.fromCharCode(63 & d | 128)) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128), b += String.fromCharCode(63 & d | 128))
			}
			return b
		}
		var o, p, q, r, s, t, u, v, w, x = [],
			y = 7,
			z = 12,
			A = 17,
			B = 22,
			C = 5,
			D = 9,
			E = 14,
			F = 20,
			G = 4,
			H = 11,
			I = 16,
			J = 23,
			K = 6,
			L = 10,
			M = 15,
			N = 21;
		for(a = n(a), x = l(a), t = 1732584193, u = 4023233417, v = 2562383102, w = 271733878, o = 0; o < x.length; o += 16) p = t, q = u, r = v, s = w, t = h(t, u, v, w, x[o + 0], y, 3614090360), w = h(w, t, u, v, x[o + 1], z, 3905402710), v = h(v, w, t, u, x[o + 2], A, 606105819), u = h(u, v, w, t, x[o + 3], B, 3250441966), t = h(t, u, v, w, x[o + 4], y, 4118548399), w = h(w, t, u, v, x[o + 5], z, 1200080426), v = h(v, w, t, u, x[o + 6], A, 2821735955), u = h(u, v, w, t, x[o + 7], B, 4249261313), t = h(t, u, v, w, x[o + 8], y, 1770035416), w = h(w, t, u, v, x[o + 9], z, 2336552879), v = h(v, w, t, u, x[o + 10], A, 4294925233), u = h(u, v, w, t, x[o + 11], B, 2304563134), t = h(t, u, v, w, x[o + 12], y, 1804603682), w = h(w, t, u, v, x[o + 13], z, 4254626195), v = h(v, w, t, u, x[o + 14], A, 2792965006), u = h(u, v, w, t, x[o + 15], B, 1236535329), t = i(t, u, v, w, x[o + 1], C, 4129170786), w = i(w, t, u, v, x[o + 6], D, 3225465664), v = i(v, w, t, u, x[o + 11], E, 643717713), u = i(u, v, w, t, x[o + 0], F, 3921069994), t = i(t, u, v, w, x[o + 5], C, 3593408605), w = i(w, t, u, v, x[o + 10], D, 38016083), v = i(v, w, t, u, x[o + 15], E, 3634488961), u = i(u, v, w, t, x[o + 4], F, 3889429448), t = i(t, u, v, w, x[o + 9], C, 568446438), w = i(w, t, u, v, x[o + 14], D, 3275163606), v = i(v, w, t, u, x[o + 3], E, 4107603335), u = i(u, v, w, t, x[o + 8], F, 1163531501), t = i(t, u, v, w, x[o + 13], C, 2850285829), w = i(w, t, u, v, x[o + 2], D, 4243563512), v = i(v, w, t, u, x[o + 7], E, 1735328473), u = i(u, v, w, t, x[o + 12], F, 2368359562), t = j(t, u, v, w, x[o + 5], G, 4294588738), w = j(w, t, u, v, x[o + 8], H, 2272392833), v = j(v, w, t, u, x[o + 11], I, 1839030562), u = j(u, v, w, t, x[o + 14], J, 4259657740), t = j(t, u, v, w, x[o + 1], G, 2763975236), w = j(w, t, u, v, x[o + 4], H, 1272893353), v = j(v, w, t, u, x[o + 7], I, 4139469664), u = j(u, v, w, t, x[o + 10], J, 3200236656), t = j(t, u, v, w, x[o + 13], G, 681279174), w = j(w, t, u, v, x[o + 0], H, 3936430074), v = j(v, w, t, u, x[o + 3], I, 3572445317), u = j(u, v, w, t, x[o + 6], J, 76029189), t = j(t, u, v, w, x[o + 9], G, 3654602809), w = j(w, t, u, v, x[o + 12], H, 3873151461), v = j(v, w, t, u, x[o + 15], I, 530742520), u = j(u, v, w, t, x[o + 2], J, 3299628645), t = k(t, u, v, w, x[o + 0], K, 4096336452), w = k(w, t, u, v, x[o + 7], L, 1126891415), v = k(v, w, t, u, x[o + 14], M, 2878612391), u = k(u, v, w, t, x[o + 5], N, 4237533241), t = k(t, u, v, w, x[o + 12], K, 1700485571), w = k(w, t, u, v, x[o + 3], L, 2399980690), v = k(v, w, t, u, x[o + 10], M, 4293915773), u = k(u, v, w, t, x[o + 1], N, 2240044497), t = k(t, u, v, w, x[o + 8], K, 1873313359), w = k(w, t, u, v, x[o + 15], L, 4264355552), v = k(v, w, t, u, x[o + 6], M, 2734768916), u = k(u, v, w, t, x[o + 13], N, 1309151649), t = k(t, u, v, w, x[o + 4], K, 4149444226), w = k(w, t, u, v, x[o + 11], L, 3174756917), v = k(v, w, t, u, x[o + 2], M, 718787259), u = k(u, v, w, t, x[o + 9], N, 3951481745), t = c(t, p), u = c(u, q), v = c(v, r), w = c(w, s);
		var O = m(t) + m(u) + m(v) + m(w);
		return O.toLowerCase()
	}

	function h(a) {
		var b = new RegExp("(?:^|;\\s*)" + a + "\\=([^;]+)(?:;\\s*|$)").exec(document.cookie);
		return b ? b[1] : void 0
	}

	function i(a, b, c) {
		var d = new Date;
		d.setTime(d.getTime() - 864e5);
		var e = "/";
		doc.cookie = a + "=;path=" + e + ";domain=." + b + ";expires=" + d.toGMTString(), doc.cookie = a + "=;path=" + e + ";domain=." + c + "." + b + ";expires=" + d.toGMTString()
	}

	function j() {
		var b = a.location.hostname,
			c = ["taobao.net", "taobao.com", "tmall.com", "tmall.hk", "etao.com", "alibaba-inc.com"],
			d = new RegExp("([^.]*?)\\.?((?:" + c.join(")|(?:").replace(/\./g, "\\.") + "))", "i"),
			e = b.match(d) || [],
			f = e[2] || "taobao.com",
			g = e[1] || "m";
		"taobao.net" !== f || "x" !== g && "waptest" !== g && "daily" !== g ? "taobao.net" === f && "demo" === g ? g = "demo" : "alibaba-inc.com" === f && "zebra" === g ? g = "zebra" : "waptest" !== g && "wapa" !== g && "m" !== g && (g = "m") : g = "waptest";
		var h = "etao.com" === f ? "apie" : "api";
		h = "taobao.com" === f ? "acs" : h, r.mainDomain = f, r.subDomain = g, r.prefix = h
	}

	function k() {
		var b = a.navigator.userAgent,
			c = b.match(/WindVane[\/\s]([\d\.\_]+)/);
		c && (r.WindVaneVersion = c[1]);
		var d = b.match(/AliApp\(([^\/]+)\/([\d\.\_]+)\)/i);
		d && (r.AliAppName = d[1], r.AliAppVersion = d[2])
	}

	function l(a) {
		this.id = ++u, this.params = d(a || {}, {
			v: "*",
			data: {},
			type: "get",
			dataType: "jsonp"
		}), this.params.type = this.params.type.toLowerCase(), "object" == typeof this.params.data && (this.params.data = JSON.stringify(this.params.data)), this.middlewares = s.slice(0)
	}
	var m = a.Promise;
	if(!m) {
		var n = "当前浏览器不支持Promise，请在windows对象上挂载Promise对象可参考（http://gitlab.alibaba-inc.com/mtb/lib-es6polyfill/tree/master）中的解决方案";
		throw b.mtop = {
			ERROR: n
		}, new Error(n)
	}
	var o, p = m.resolve();
	try {
		o = a.localStorage, o.setItem("@private", "false")
	} catch(q) {
		o = !1
	}
	var r = {
			useAlipayJSBridge: !1
		},
		s = [],
		t = {
			ERROR: -1,
			SUCCESS: 0,
			TOKEN_EXPIRED: 1,
			SESSION_EXPIRED: 2
		};
	j(), k();
	var u = 0;
	l.prototype.use = function(a) {
		if(!a) throw new Error("middleware is undefined");
		return this.middlewares.push(a), this
	}, l.prototype.__processRequestMethod = function(a) {
		var b = this.params,
			c = this.options;
		"get" === b.type && "jsonp" === b.dataType ? c.getJSONP = !0 : "get" === b.type && "originaljsonp" === b.dataType ? c.getOriginalJSONP = !0 : "get" === b.type && "json" === b.dataType ? c.getJSON = !0 : "post" === b.type && (c.postJSON = !0), a()
	}, l.prototype.__processRequestType = function(a) {
		var c = this,
			d = this.options;
		if(r.H5Request === !0 && (d.H5Request = !0), r.WindVaneRequest === !0 && (d.WindVaneRequest = !0), d.H5Request === !1 && d.WindVaneRequest === !0) {
			if(!b.windvane || parseFloat(d.WindVaneVersion) < 5.4) throw new Error("WINDVANE_NOT_FOUND::缺少WindVane环境")
		} else d.H5Request === !0 ? d.WindVaneRequest = !1 : "undefined" == typeof d.WindVaneRequest && "undefined" == typeof d.H5Request && (b.windvane && parseFloat(d.WindVaneVersion) >= 5.4 ? d.WindVaneRequest = !0 : d.H5Request = !0);
		a && a().then(function() {
			var a = d.retJson.ret;
			return a instanceof Array && (a = a.join(",")), d.WindVaneRequest === !0 && (!a || a.indexOf("HY_FAILED") > -1 || a.indexOf("HY_NO_HANDLER") > -1 || a.indexOf("HY_CLOSED") > -1 || a.indexOf("HY_EXCEPTION") > -1 || a.indexOf("HY_NO_PERMISSION") > -1) ? (r.H5Request = !0, c.__sequence([c.__processRequestType, c.__processToken, c.__processRequestUrl, c.__processUnitPrefix, c.middlewares, c.__processRequest])) : void 0
		})
	};
	var v = "_m_h5_tk",
		w = "_m_h5_tk_enc";
	l.prototype.__getTokenFromAlipay = function() {
		var b = c(),
			d = this.options,
			e = (a.navigator.userAgent, !!location.protocol.match(/^https?\:$/)),
			f = "AP" === d.AliAppName && parseFloat(d.AliAppVersion) >= 8.2;
		return d.useAlipayJSBridge === !0 && !e && f && a.AlipayJSBridge && a.AlipayJSBridge.call ? a.AlipayJSBridge.call("getMtopToken", function(a) {
			a && a.token && (d.token = a.token), b.resolve()
		}, function() {
			b.resolve()
		}) : b.resolve(), b.promise
	}, l.prototype.__getTokenFromCookie = function() {
		var a = this.options;
		return a.token = a.token || h(v), a.token && (a.token = a.token.split("_")[0]), m.resolve()
	}, l.prototype.__processToken = function(a) {
		var b = this,
			c = this.options;
		this.params;
		return c.token && delete c.token, c.WindVaneRequest !== !0 ? p.then(function() {
			return b.__getTokenFromAlipay()
		}).then(function() {
			return b.__getTokenFromCookie()
		}).then(a).then(function() {
			var a = c.retJson,
				d = a.ret;
			if(d instanceof Array && (d = d.join(",")), d.indexOf("TOKEN_EMPTY") > -1 || d.indexOf("TOKEN_EXOIRED") > -1) {
				if(c.maxRetryTimes = c.maxRetryTimes || 5, c.failTimes = c.failTimes || 0, c.H5Request && ++c.failTimes < c.maxRetryTimes) return b.__sequence([b.__processToken, b.__processRequestUrl, b.__processUnitPrefix, b.middlewares, b.__processRequest]);
				maxRetryTimes > 0 && (i(v, c.mainDomain, c.subDomain), i(w, c.mainDomain, c.subDomain)), a.retType = t.TOKEN_EXPIRED
			}
		}) : void a()
	}, l.prototype.__processRequestUrl = function(a) {
		var b = this.params,
			c = this.options;
		if(c.H5Request === !0) {
			var d = "//" + (c.prefix ? c.prefix + "." : "") + (c.subDomain ? c.subDomain + "." : "") + c.mainDomain + "/h5/" + b.api.toLowerCase() + "/" + b.v.toLowerCase() + "/",
				e = b.appKey || ("waptest" === c.subDomain ? "4272" : "12574478"),
				f = (new Date).getTime(),
				h = g(c.token + "&" + f + "&" + e + "&" + b.data),
				i = {
					appKey: e,
					t: f,
					sign: h
				},
				j = {
					data: b.data,
					ua: b.ua
				};
			Object.keys(b).forEach(function(a) {
				"undefined" == typeof i[a] && "undefined" == typeof j[a] && (i[a] = b[a])
			}), c.getJSONP ? i.type = "jsonp" : c.getOriginalJSONP ? i.type = "originaljsonp" : (c.getJSON || c.postJSON) && (i.type = "originaljson"), c.querystring = i, c.postdata = j, c.path = d
		}
		a()
	}, l.prototype.__processUnitPrefix = function(b) {
		var c = this.params,
			d = this.options;
		if(d.disabledUnit === !0) return void b();
		if(o && d.H5Request === !0) {
			var f = c.api,
				g = !1,
				i = h("_m_user_unitinfo_"),
				j = o.getItem("unitinfo");
			i && i.split("|")[0].indexOf("center") < 0 && j && j.indexOf(f.toLowerCase()) >= 0 && (g = i.split("|")[1]), d.h5UnitPrefix ? d.path = d.path.replace(/^\/\//, "//" + d.h5UnitPrefix) : g && d.path && (d.useAcsUnit === !0 || d.path.indexOf("taobao.com") > -1 ? d.path = d.path.replace(/^\/\//, "//" + g) : d.path = d.path.replace(/^\/\//, "//" + g + ".")), b().then(function() {
				if(o) {
					var b = h("_m_unitapi_v_"),
						c = o.getItem("unitinfo");
					if(b) {
						var f = c ? JSON.parse(c) : {};
						if(!c || b !== f.version) {
							var g = !1,
								i = "//h5." + d.subDomain + ".taobao.com/js/mtop/unit/" + b + "/unitApi.js",
								j = document.createElement("script");
							j.src = i;
							var k = function() {
								g || (g = !0, j.onload = j.onerror = null, j.parentNode && j.parentNode.removeChild(j))
							};
							j.onerror = function() {
								k()
							}, a.jsonp_unitapi || (a.jsonp_unitapi = function(a) {
								k(), o.setItem("unitinfo", JSON.stringify(a))
							}), e(j)
						}
					}
				}
			})
		} else b()
	};
	var x = 0;
	l.prototype.__requestJSONP = function(a) {
		function b(a) {
			if(k && clearTimeout(k), l.parentNode && l.parentNode.removeChild(l), "TIMEOUT" === a) window[j] = function() {
				window[j] = void 0;
				try {
					delete window[j]
				} catch(a) {}
			};
			else {
				window[j] = void 0;
				try {
					delete window[j]
				} catch(b) {}
			}
		}
		var d = c(),
			g = this.params,
			h = this.options,
			i = g.timeout || 2e4,
			j = "mtopjsonp" + ++x,
			k = setTimeout(function() {
				a("TIMEOUT::接口超时"), b("TIMEOUT")
			}, i);
		h.querystring.callback = j;
		var l = document.createElement("script");
		return l.src = h.path + "?" + f(h.querystring) + "&" + f(h.postdata), l.async = !0, l.onerror = function() {
			b("ABORT"), a("ABORT::接口异常退出")
		}, window[j] = function() {
			h.results = Array.prototype.slice.call(arguments), b(), d.resolve()
		}, e(l), d.promise
	}, l.prototype.__requestJSON = function(b) {
		function d(a) {
			k && clearTimeout(k), "TIMEOUT" === a && i.abort()
		}
		var e = c(),
			g = this.params,
			h = this.options,
			i = new a.XMLHttpRequest,
			j = g.timeout || 2e4,
			k = setTimeout(function() {
				b("TIMEOUT::接口超时"), d("TIMEOUT")
			}, j);
		i.onreadystatechange = function() {
			if(4 == i.readyState) {
				var a, c, f = i.status;
				if(f >= 200 && 300 > f || 304 == f) {
					d(), a = i.responseText, c = i.getAllResponseHeaders() || "";
					try {
						a = /^\s*$/.test(a) ? {} : JSON.parse(a), a.responseHeaders = c, h.results = [a], e.resolve()
					} catch(g) {
						b("PARSE_JSON_ERROR::解析JSON失败")
					}
				} else d("ABORT"), b("ABORT::接口异常退出")
			}
		};
		var l, m, n = h.path + "?" + f(h.querystring);
		if(h.getJSON ? (l = "GET", n += "&" + f(h.postdata)) : h.postJSON && (l = "POST", m = f(h.postdata)), i.open(l, n, !0), i.withCredentials = !0, i.setRequestHeader("Accept", "application/json"), i.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), g.headers)
			for(var o in g.headers) i.setRequestHeader(o, g.headers[o]);
		return i.send(m), e.promise
	}, l.prototype.__requestWindVane = function(a) {
		function d(a) {
			j.results = [a], h.resolve()
		}
		var e, f, g, h = c(),
			i = this.params,
			j = this.options,
			k = i.data,
			l = i.api,
			m = i.v,
			n = j.postJSON ? 1 : 0,
			o = j.getJSON || j.postJSON ? "originaljson" : "",
			p = "https" === location.protocol ? 1 : 0,
			q = i.isSec || 0,
			r = i.sessionOption || "AutoLoginOnly";
		if("undefined" == typeof i.ecode) throw new Error("UNEXCEPT_PARAM_ECODE::缺少ecode参数");
		return e = parseInt(i.ecode), g = "undefined" != typeof i.timer ? parseInt(i.timer) : "undefined" != typeof i.timeout ? parseInt(i.timeout) : 2e4, f = 2 * g, b.windvane.call("MtopWVPlugin", "send", {
			api: l,
			v: m,
			post: String(n),
			type: o,
			isHttps: String(p),
			ecode: String(e),
			isSec: String(q),
			param: JSON.parse(k),
			timer: g,
			sessionOption: r,
			ext_headers: {
				referer: location.href
			}
		}, d, d, f), h.promise
	}, l.prototype.__processRequest = function(a, b) {
		var c = this;
		return p.then(function() {
			var a = c.options;
			if(a.H5Request && (a.getJSONP || a.getOriginalJSONP)) return c.__requestJSONP(b);
			if(a.H5Request && (a.getJSON || a.postJSON)) return c.__requestJSON(b);
			if(a.WindVaneRequest) return c.__requestWindVane(b);
			throw new Error("UNEXCEPT_REQUEST::错误的请求类型")
		}).then(a).then(function() {
			var a = c.options,
				b = (c.params, a.results[0]),
				d = b && b.ret || [];
			b.ret = d, d instanceof Array && (d = d.join(",")), d.indexOf("SUCCESS") > -1 ? b.retType = t.SUCCESS : b.retType = t.ERROR, a.retJson = b
		})
	}, l.prototype.__sequence = function(a) {
		function b(a) {
			if(a instanceof Array) a.forEach(b);
			else {
				var g, h = c(),
					i = c();
				e.push(function() {
					return h = c(), g = a.call(d, function(a) {
						return h.resolve(a), i.promise
					}, function(a) {
						return h.reject(a), i.promise
					}), g && (g = g["catch"](function(a) {
						h.reject(a)
					})), h.promise
				}), f.push(function(a) {
					return i.resolve(a), g
				})
			}
		}
		var d = this,
			e = [],
			f = [];
		a.forEach(b);
		for(var g, h = p; g = e.shift();) h = h.then(g);
		for(; g = f.pop();) h = h.then(g);
		return h
	};
	var y = function(a) {
			a()
		},
		z = function(a) {
			a()
		};
	l.prototype.request = function(a) {
		var b = this;
		this.options = d(a || {}, r);
		var c = m.resolve([y, z]).then(function(a) {
			var c = a[0],
				d = a[1];
			return b.__sequence([c, b.__processRequestMethod, b.__processRequestType, b.__processToken, b.__processRequestUrl, b.__processUnitPrefix, b.middlewares, b.__processRequest, d])
		}).then(function() {
			var a = b.options.retJson;
			return a.retType !== t.SUCCESS ? m.reject(a) : b.options.successCallback ? void b.options.successCallback(a) : m.resolve(a)
		})["catch"](function(a) {
			var c;
			return a instanceof Error ? (console.error(a.stack), c = {
				ret: [a.message],
				stack: [a.stack],
				retJson: t.ERROR
			}) : c = "string" == typeof a ? {
				ret: [a],
				retJson: t.ERROR
			} : void 0 !== a ? a : b.options.retJson, b.options.failureCallback ? void b.options.failureCallback(c) : m.reject(c)
		});
		return this.__processRequestType(), b.options.H5Request && (b.constructor.__firstProcessor || (b.constructor.__firstProcessor = c), y = function(a) {
			b.constructor.__firstProcessor.then(a)["catch"](a)
		}), c
	}, b.mtop = function(a) {
		return new l(a)
	}, b.mtop.request = function(a, b, c) {
		var d = {
			H5Request: a.H5Request,
			WindVaneRequest: a.WindVaneRequest,
			LoginRequest: a.LoginRequest,
			AntiCreep: a.AntiCreep,
			AntiFlood: a.AntiFlood,
			successCallback: b,
			failureCallback: c || b
		};
		return new l(a).request(d)
	}, b.mtop.H5Request = function(a, b, c) {
		var d = {
			H5Request: !0,
			successCallback: b,
			failureCallback: c || b
		};
		return new l(a).request(d)
	}, b.mtop.middlewares = s, b.mtop.config = r, b.mtop.RESPONSE_TYPE = t, b.mtop.CLASS = l
}(window, window.lib || (window.lib = {})),
function(a, b) {
	function c(a) {
		return a.preventDefault(), !1
	}

	function d(b, d) {
		var e = this,
			f = a.dpr || 1,
			g = document.createElement("div"),
			h = document.documentElement.getBoundingClientRect(),
			i = Math.max(h.width, window.innerWidth) / f,
			j = Math.max(h.height, window.innerHeight) / f;
		g.style.cssText = ["-webkit-transform:scale(" + f + ") translateZ(0)", "-ms-transform:scale(" + f + ") translateZ(0)", "transform:scale(" + f + ") translateZ(0)", "-webkit-transform-origin:0 0", "-ms-transform-origin:0 0", "transform-origin:0 0", "width:" + i + "px", "height:" + j + "px", "z-index:999999", "position:absolute", "left:0", "top:0px", "background:#FFF", "display:none"].join(";");
		var k = document.createElement("div");
		k.style.cssText = ["width:100%", "height:52px", "background:#EEE", "line-height:52px", "text-align:left", "box-sizing:border-box", "padding-left:20px", "position:absolute", "left:0", "top:0", "font-size:16px", "font-weight:bold", "color:#333"].join(";"), k.innerText = b;
		var l = document.createElement("a");
		l.style.cssText = ["display:block", "position:absolute", "right:0", "top:0", "height:52px", "line-height:52px", "padding:0 20px", "color:#999"].join(";"), l.innerText = "关闭";
		var m = document.createElement("iframe");
		m.style.cssText = ["width:100%", "height:100%", "border:0", "overflow:hidden"].join(";"), k.appendChild(l), g.appendChild(k), g.appendChild(m), document.body.appendChild(g), m.src = d, l.addEventListener("click", function() {
			e.hide();
			var a = document.createEvent("HTMLEvents");
			a.initEvent("close", !1, !1), g.dispatchEvent(a)
		}, !1), this.addEventListener = function() {
			g.addEventListener.apply(g, arguments)
		}, this.removeEventListener = function() {
			g.removeEventListener.apply(g, arguments)
		}, this.show = function() {
			document.addEventListener("touchmove", c, !1), g.style.display = "block", window.scrollTo(0, 0)
		}, this.hide = function() {
			document.removeEventListener("touchmove", c), window.scrollTo(0, -h.top), g.parentNode && g.parentNode.removeChild(g)
		}
	}

	function e(a) {
		var c = this,
			d = this.options;
		this.params;
		return a().then(function() {
			var a = d.retJson,
				e = a.ret;
			if(e instanceof Array && (e = e.join(",")), (e.indexOf("SESSION_EXPIRED") > -1 || e.indexOf("SID_INVALID") > -1 || e.indexOf("AUTH_REJECT") > -1 || e.indexOf("NEED_LOGIN") > -1) && (a.retType = k.SESSION_EXPIRED, !d.WindVaneRequest && (j.LoginRequest === !0 || d.LoginRequest === !0))) {
				if(!b.login) throw new Error("LOGIN_NOT_FOUND::缺少lib.login");
				return b.login.goLoginAsync().then(function(a) {
					return c.__sequence([c.__processToken, c.__processRequestUrl, c.__processUnitPrefix, c.middlewares, c.__processRequest])
				})["catch"](function(a) {
					throw "CANCEL" === a ? new Error("LOGIN_CANCEL::用户取消登录") : new Error("LOGIN_FAILURE::用户登录失败")
				})
			}
		})
	}

	function f(a) {
		var b = this.options;
		this.params;
		return b.H5Request !== !0 || j.AntiFlood !== !0 && b.AntiFlood !== !0 ? void a() : a().then(function() {
			var a = b.retJson,
				c = a.ret;
			c instanceof Array && (c = c.join(",")), c.indexOf("FAIL_SYS_USER_VALIDATE") > -1 && a.data.url && (b.AntiFloodReferer ? location.href = a.data.url.replace(/(http_referer=).+/, "$1" + b.AntiFloodReferer) : location.href = a.data.url)
		})
	}

	function g(b) {
		var c = this,
			e = this.options,
			f = this.params;
		return f.forceAntiCreep !== !0 && (e.AliAppName || e.AliAppVersion) || j.AntiCreep !== !0 && e.AntiCreep !== !0 ? void b() : b().then(function() {
			var b = e.retJson,
				g = b.ret;
			return g instanceof Array && (g = g.join(",")), g.indexOf("RGV587_ERROR::SM") > -1 && b.data.url ? new h(function(e, g) {
				function h() {
					k.removeEventListener("close", h), a.removeEventListener("message", i), g("USER_INPUT_CANCEL::用户取消输入")
				}

				function i(b) {
					k.removeEventListener("close", h), a.removeEventListener("message", i), k.hide();
					var d;
					try {
						d = JSON.parse(b.data) || {}
					} catch(j) {}
					if(d && "child" === d.type) {
						var l;
						try {
							l = JSON.parse(decodeURIComponent(d.content)), "string" == typeof l && (l = JSON.parse(l));
							for(var m in l) f[m] = l[m];
							c.__sequence([c.__processToken, c.__processRequestUrl, c.__processUnitPrefix, c.middlewares, c.__processRequest]).then(e)
						} catch(j) {
							g("USER_INPUT_FAILURE::用户输入失败")
						}
					} else e()
				}
				var j = b.data.url,
					k = new d("", j);
				k.addEventListener("close", i, !1), a.addEventListener("message", i, !1), k.show()
			}) : void 0
		})
	}
	if(!b || !b.mtop || b.mtop.ERROR) throw new Error("Mtop 初始化失败！请参考Mtop文档http://gitlab.alibaba-inc.com/mtb/lib-mtop");
	var h = a.Promise,
		i = b.mtop.CLASS,
		j = b.mtop.config,
		k = b.mtop.RESPONSE_TYPE;
	b.mtop.middlewares.push(e), b.mtop.loginRequest = function(a, b, c) {
		var d = {
			LoginRequest: !0,
			H5Request: !0,
			successCallback: b,
			failureCallback: c || b
		};
		return new i(a).request(d)
	}, b.mtop.antiFloodRequest = function(a, b, c) {
		var d = {
			AntiFlood: !0,
			successCallback: b,
			failureCallback: c || b
		};
		return new i(a).request(d)
	}, b.mtop.middlewares.push(f), b.mtop.antiCreepRequest = function(a, b, c) {
		var d = {
			AntiCreep: !0,
			successCallback: b,
			failureCallback: c || b
		};
		return new i(a).request(d)
	}, b.mtop.middlewares.push(g)
}(window, window.lib || (window.lib = {})),
function(a, b, c) {
	function d(a) {
		var b = new RegExp("(?:^|;\\s*)" + a + "\\=([^;]+)(?:;\\s*|$)").exec(v.cookie);
		return b ? b[1] : c
	}

	function e(a) {
		return a.preventDefault(), !1
	}

	function f(b, c) {
		var d = this,
			f = a.dpr || 1,
			g = document.createElement("div"),
			h = document.documentElement.getBoundingClientRect(),
			i = Math.max(h.width, window.innerWidth) / f,
			j = Math.max(h.height, window.innerHeight) / f;
		g.style.cssText = ["-webkit-transform:scale(" + f + ") translateZ(0)", "-ms-transform:scale(" + f + ") translateZ(0)", "transform:scale(" + f + ") translateZ(0)", "-webkit-transform-origin:0 0", "-ms-transform-origin:0 0", "transform-origin:0 0", "width:" + i + "px", "height:" + j + "px", "z-index:999999", "position:absolute", "left:0", "top:0px", "background:#FFF", "display:none"].join(";");
		var k = document.createElement("div");
		k.style.cssText = ["width:100%", "height:52px", "background:#EEE", "line-height:52px", "text-align:left", "box-sizing:border-box", "padding-left:20px", "position:absolute", "left:0", "top:0", "font-size:16px", "font-weight:bold", "color:#333"].join(";"), k.innerText = b;
		var l = document.createElement("a");
		l.style.cssText = ["display:block", "position:absolute", "right:0", "top:0", "height:52px", "line-height:52px", "padding:0 20px", "color:#999"].join(";"), l.innerText = "关闭";
		var m = document.createElement("iframe");
		m.style.cssText = ["width:100%", "height:100%", "border:0", "overflow:hidden"].join(";"), k.appendChild(l), g.appendChild(k), g.appendChild(m), v.body.appendChild(g), m.src = c, l.addEventListener("click", function() {
			d.hide();
			var a = v.createEvent("HTMLEvents");
			a.initEvent("close", !1, !1), g.dispatchEvent(a)
		}, !1), this.addEventListener = function() {
			g.addEventListener.apply(g, arguments)
		}, this.removeEventListener = function() {
			g.removeEventListener.apply(g, arguments)
		}, this.show = function() {
			document.addEventListener("touchmove", e, !1), g.style.display = "block", window.scrollTo(0, 0)
		}, this.hide = function() {
			document.removeEventListener("touchmove", e), window.scrollTo(0, -h.top), v.body.removeChild(g)
		}
	}

	function g(a) {
		if(!a || "function" != typeof a || !b.mtop) {
			var d = this.getUserNick();
			return !!d
		}
		b.mtop.request({
			api: "mtop.user.getUserSimple",
			v: "1.0",
			data: {
				isSec: 0
			},
			H5Request: !0
		}, function(d) {
			d.retType === b.mtop.RESPONSE_TYPE.SUCCESS ? a(!0, d) : d.retType === b.mtop.RESPONSE_TYPE.SESSION_EXPIRED ? a(!1, d) : a(c, d)
		})
	}

	function h(a) {
		var b;
		return u && (b = {}, b.promise = new u(function(a, c) {
			b.resolve = a, b.reject = c
		})), this.isLogin(function(c, d) {
			a && a(c, d), c === !0 ? b && b.resolve(d) : b && b.reject(d)
		}), b ? b.promise : void 0
	}

	function i(a) {
		if(!a || "function" != typeof a) {
			var b = "",
				e = d("_w_tb_nick"),
				f = d("_nk_") || d("snk"),
				g = d("sn");
			return e && e.length > 0 && "null" != e ? b = decodeURIComponent(e) : f && f.length > 0 && "null" != f ? b = unescape(unescape(f).replace(/\\u/g, "%u")) : g && g.length > 0 && "null" != g && (b = decodeURIComponent(g)), b = b.replace(/\</g, "&lt;").replace(/\>/g, "&gt;")
		}
		this.isLogin(function(b, d) {
			a(b === !0 && d && d.data && d.data.nick ? d.data.nick : b === !1 ? "" : c)
		})
	}

	function j(a) {
		var b;
		return u && (b = {}, b.promise = new u(function(a, c) {
			b.resolve = a, b.reject = c
		})), this.getUserNick(function(c) {
			a && a(c), c ? b && b.resolve(c) : b && b.reject()
		}), b ? b.promise : void 0
	}

	function k(a, c) {
		var d = "//" + G + "." + H.subDomain + "." + E + "/" + H[(a || "login") + "Name"];
		if(c) {
			var e = [];
			for(var f in c) e.push(f + "=" + encodeURIComponent(c[f]));
			d += "?" + e.join("&")
		}
		var g = b.login.config.loginUrlParams;
		if(g) {
			var h = [];
			for(var i in g) h.push(i + "=" + encodeURIComponent(g[i]));
			d += /\?/.test(d) ? "&" + h.join("&") : "?" + e.join("&")
		}
		return d
	}

	function l(a, b) {
		b ? location.replace(a) : location.href = a
	}

	function m(b, c, d) {
		function e(b) {
			j.removeEventListener("close", e), a.removeEventListener("message", g), d("CANCEL")
		}

		function g(b) {
			var c = b.data || {};
			c && "child" === c.type && c.content.indexOf("SUCCESS") > -1 ? (j.removeEventListener("close", e), a.removeEventListener("message", g), j.hide(), d("SUCCESS")) : d("FAILURE")
		}
		var h = location.protocol + "//h5." + H.subDomain + ".taobao.com/" + ("waptest" === H.subDomain ? "src" : "other") + "/" + b + "end.html?origin=" + encodeURIComponent(location.protocol + "//" + location.hostname),
			i = k(b, {
				ttid: "h5@iframe",
				redirectURL: h
			}),
			j = new f(c.title || "您需要登录才能继续访问", i);
		j.addEventListener("close", e, !1), a.addEventListener("message", g, !1), j.show()
	}

	function n(b, c, d) {
		var e = k(b, {
			wvLoginCallback: "wvLoginCallback"
		});
		a.wvLoginCallback = function(b) {
			delete a.wvLoginCallback, d(b.indexOf(":SUCCESS") > -1 ? "SUCCESS" : b.indexOf(":CANCEL") > -1 ? "CANCEL" : "FAILURE")
		}, l(e)
	}

	function o(a, b, c) {
		if("function" == typeof b ? (c = b, b = null) : "string" == typeof b && (b = {
				redirectUrl: b
			}), b = b || {}, c && A) n(a, b, c);
		else if(c && !z && "login" === a) m(a, b, c);
		else {
			var d = k(a, {
				redirectURL: b.redirectUrl || location.href
			});
			l(d, b.replace)
		}
	}

	function p(a, b, c) {
		var d;
		return u && (d = {}, d.promise = new u(function(a, b) {
			d.resolve = a, d.reject = b
		})), o(a, b, function(a) {
			c && c(a), "SUCCESS" === a ? d && d.resolve(a) : d && d.reject(a)
		}), d ? d.promise : void 0
	}

	function q(a) {
		o("login", a)
	}

	function r(a) {
		return p("login", a)
	}

	function s(a) {
		o("logout", a)
	}

	function t(a) {
		return p("logout", a)
	}
	var u = a.Promise,
		v = a.document,
		w = a.navigator.userAgent,
		x = location.hostname,
		y = (a.location.search, w.match(/WindVane[\/\s]([\d\.\_]+)/)),
		z = w.match(/AliApp\(([^\/]+)\/([\d\.\_]+)\)/i),
		A = !!(z && "TB" === z[1] && y && parseFloat(y[1]) > 5.2),
		B = ["taobao.net", "taobao.com"],
		C = new RegExp("([^.]*?)\\.?((?:" + B.join(")|(?:").replace(/\./g, "\\.") + "))", "i"),
		D = x.match(C) || [],
		E = function() {
			var a = D[2] || "taobao.com";
			return a.match(/\.?taobao\.net$/) ? "taobao.net" : "taobao.com"
		}(),
		F = function() {
			var a = E,
				b = D[1] || "m";
			return "taobao.net" === a && (b = "waptest"), "m" != b && "wapa" != b && "waptest" != b && (b = "m"), b
		}(),
		G = "login";
	b.login = b.login || {};
	var H = {
		loginName: "login.htm",
		logoutName: "logout.htm",
		subDomain: F
	};
	b.login.config = H, b.login.isLogin = g, b.login.isLoginAsync = h, b.login.getUserNick = i, b.login.getUserNickAsync = j, b.login.generateUrl = k, b.login.goLogin = q, b.login.goLoginAsync = r, b.login.goLogout = s, b.login.goLogoutAsync = t
}(window, window.lib || (window.lib = {})),
function(a, b, c) {
	function d(a) {
		var b = new RegExp("(?:^|;\\s*)" + a + "\\=([^;]+)(?:;\\s*|$)").exec(v.cookie);
		return b ? b[1] : c
	}

	function e(a) {
		return a.preventDefault(), !1
	}

	function f(b, c) {
		var d = this,
			f = a.dpr || 1,
			g = document.createElement("div"),
			h = document.documentElement.getBoundingClientRect(),
			i = Math.max(h.width, window.innerWidth) / f,
			j = Math.max(h.height, window.innerHeight) / f;
		g.style.cssText = ["-webkit-transform:scale(" + f + ") translateZ(0)", "-ms-transform:scale(" + f + ") translateZ(0)", "transform:scale(" + f + ") translateZ(0)", "-webkit-transform-origin:0 0", "-ms-transform-origin:0 0", "transform-origin:0 0", "width:" + i + "px", "height:" + j + "px", "z-index:999999", "position:absolute", "left:0", "top:0px", "background:#FFF", "display:none"].join(";");
		var k = document.createElement("div");
		k.style.cssText = ["width:100%", "height:52px", "background:#EEE", "line-height:52px", "text-align:left", "box-sizing:border-box", "padding-left:20px", "position:absolute", "left:0", "top:0", "font-size:16px", "font-weight:bold", "color:#333"].join(";"), k.innerText = b;
		var l = document.createElement("a");
		l.style.cssText = ["display:block", "position:absolute", "right:0", "top:0", "height:52px", "line-height:52px", "padding:0 20px", "color:#999"].join(";"), l.innerText = "关闭";
		var m = document.createElement("iframe");
		m.style.cssText = ["width:100%", "height:100%", "border:0", "overflow:hidden"].join(";"), k.appendChild(l), g.appendChild(k), g.appendChild(m), v.body.appendChild(g), m.src = c, l.addEventListener("click", function() {
			d.hide();
			var a = v.createEvent("HTMLEvents");
			a.initEvent("close", !1, !1), g.dispatchEvent(a)
		}, !1), this.addEventListener = function() {
			g.addEventListener.apply(g, arguments)
		}, this.removeEventListener = function() {
			g.removeEventListener.apply(g, arguments)
		}, this.show = function() {
			document.addEventListener("touchmove", e, !1), g.style.display = "block", window.scrollTo(0, 0)
		}, this.hide = function() {
			document.removeEventListener("touchmove", e), window.scrollTo(0, -h.top), v.body.removeChild(g)
		}
	}

	function g(a) {
		if(!a || "function" != typeof a || !b.mtop) {
			var d = this.getUserNick();
			return !!d
		}
		b.mtop.request({
			api: "mtop.user.getUserSimple",
			v: "1.0",
			data: {
				isSec: 0
			},
			H5Request: !0
		}, function(d) {
			d.retType === b.mtop.RESPONSE_TYPE.SUCCESS ? a(!0, d) : d.retType === b.mtop.RESPONSE_TYPE.SESSION_EXPIRED ? a(!1, d) : a(c, d)
		})
	}

	function h(a) {
		var b;
		return u && (b = {}, b.promise = new u(function(a, c) {
			b.resolve = a, b.reject = c
		})), this.isLogin(function(c, d) {
			a && a(c, d), c === !0 ? b && b.resolve(d) : b && b.reject(d)
		}), b ? b.promise : void 0
	}

	function i(a) {
		if(!a || "function" != typeof a) {
			var b = "",
				e = d("_w_tb_nick"),
				f = d("_nk_") || d("snk"),
				g = d("sn");
			return e && e.length > 0 && "null" != e ? b = decodeURIComponent(e) : f && f.length > 0 && "null" != f ? b = unescape(unescape(f).replace(/\\u/g, "%u")) : g && g.length > 0 && "null" != g && (b = decodeURIComponent(g)), b = b.replace(/\</g, "&lt;").replace(/\>/g, "&gt;")
		}
		this.isLogin(function(b, d) {
			a(b === !0 && d && d.data && d.data.nick ? d.data.nick : b === !1 ? "" : c)
		})
	}

	function j(a) {
		var b;
		return u && (b = {}, b.promise = new u(function(a, c) {
			b.resolve = a, b.reject = c
		})), this.getUserNick(function(c) {
			a && a(c), c ? b && b.resolve(c) : b && b.reject()
		}), b ? b.promise : void 0
	}

	function k(a, c) {
		var d = "//" + G + "." + H.subDomain + "." + E + "/" + H[(a || "login") + "Name"];
		if(c) {
			var e = [];
			for(var f in c) e.push(f + "=" + encodeURIComponent(c[f]));
			d += "?" + e.join("&")
		}
		var g = b.login.config.loginUrlParams;
		if(g) {
			var h = [];
			for(var i in g) h.push(i + "=" + encodeURIComponent(g[i]));
			d += /\?/.test(d) ? "&" + h.join("&") : "?" + e.join("&")
		}
		return d
	}

	function l(a, b) {
		b ? location.replace(a) : location.href = a
	}

	function m(b, c, d) {
		function e(b) {
			j.removeEventListener("close", e), a.removeEventListener("message", g), d("CANCEL")
		}

		function g(b) {
			var c = b.data || {};
			c && "child" === c.type && c.content.indexOf("SUCCESS") > -1 ? (j.removeEventListener("close", e), a.removeEventListener("message", g), j.hide(), d("SUCCESS")) : d("FAILURE")
		}
		var h = location.protocol + "//h5." + H.subDomain + ".taobao.com/" + ("waptest" === H.subDomain ? "src" : "other") + "/" + b + "end.html?origin=" + encodeURIComponent(location.protocol + "//" + location.hostname),
			i = k(b, {
				ttid: "h5@iframe",
				redirectURL: h
			}),
			j = new f(c.title || "您需要登录才能继续访问", i);
		j.addEventListener("close", e, !1), a.addEventListener("message", g, !1), j.show()
	}

	function n(b, c, d) {
		var e = k(b, {
			wvLoginCallback: "wvLoginCallback"
		});
		a.wvLoginCallback = function(b) {
			delete a.wvLoginCallback, d(b.indexOf(":SUCCESS") > -1 ? "SUCCESS" : b.indexOf(":CANCEL") > -1 ? "CANCEL" : "FAILURE")
		}, l(e)
	}

	function o(a, b, c) {
		if("function" == typeof b ? (c = b, b = null) : "string" == typeof b && (b = {
				redirectUrl: b
			}), b = b || {}, c && A) n(a, b, c);
		else if(c && !z && "login" === a) m(a, b, c);
		else {
			var d = k(a, {
				redirectURL: b.redirectUrl || location.href
			});
			l(d, b.replace)
		}
	}

	function p(a, b, c) {
		var d;
		return u && (d = {}, d.promise = new u(function(a, b) {
			d.resolve = a, d.reject = b
		})), o(a, b, function(a) {
			c && c(a), "SUCCESS" === a ? d && d.resolve(a) : d && d.reject(a)
		}), d ? d.promise : void 0
	}

	function q(a) {
		o("login", a)
	}

	function r(a) {
		return p("login", a)
	}

	function s(a) {
		o("logout", a)
	}

	function t(a) {
		return p("logout", a)
	}
	var u = a.Promise,
		v = a.document,
		w = a.navigator.userAgent,
		x = location.hostname,
		y = (a.location.search, w.match(/WindVane[\/\s]([\d\.\_]+)/)),
		z = w.match(/AliApp\(([^\/]+)\/([\d\.\_]+)\)/i),
		A = !!(z && "TB" === z[1] && y && parseFloat(y[1]) > 5.2),
		B = ["taobao.net", "taobao.com"],
		C = new RegExp("([^.]*?)\\.?((?:" + B.join(")|(?:").replace(/\./g, "\\.") + "))", "i"),
		D = x.match(C) || [],
		E = function() {
			var a = D[2] || "taobao.com";
			return a.match(/\.?taobao\.net$/) ? "taobao.net" : "taobao.com"
		}(),
		F = function() {
			var a = E,
				b = D[1] || "m";
			return "taobao.net" === a && (b = "waptest"), "m" != b && "wapa" != b && "waptest" != b && (b = "m"), b
		}(),
		G = "login";
	b.login = b.login || {};
	var H = {
		loginName: "login.htm",
		logoutName: "logout.htm",
		subDomain: F
	};
	b.login.config = H, b.login.isLogin = g, b.login.isLoginAsync = h, b.login.getUserNick = i, b.login.getUserNickAsync = j, b.login.generateUrl = k, b.login.goLogin = q, b.login.goLoginAsync = r, b.login.goLogout = s, b.login.goLogoutAsync = t
}(window, window.lib || (window.lib = {})),
function(a, b) {
	function c(a, b) {
		function c() {
			a.setAttribute("data-dir", j)
		}

		function e() {
			a.innerHTML = new Array(k + 1).join('<span style="background-size: 0.25rem 0.5rem; background-position: 0 0;"></span>') + '<b class="hide"></b>'
		}

		function f() {
			var b = a.querySelector("span.cur");
			b && (b.style.backgroundPosition = "0 0", b.className = "");
			var c = a.querySelector("span:nth-child(" + l + ")");
			c.className = "cur", c.style.backgroundPosition = "0 -0.25rem"
		}

		function g() {
			var b = a.querySelector("b");
			m ? b.className = "show" : b.className = "hide", b.innerHTML = l + " / " + k
		}
		var h = Date.now() + "-" + ++d,
			i = document.createDocumentFragment();
		1 !== arguments.length || arguments[0] instanceof HTMLElement || (b = arguments[0], a = null), a || (a = document.createElement("div"), i.appendChild(a)), b = b || {}, a.setAttribute("data-ctrl-name", "indicator"), a.setAttribute("data-ctrl-id", h);
		var j;
		Object.defineProperty(this, "direction", {
			get: function() {
				return j
			},
			set: function(a) {
				if("string" != typeof a || !a.match(/^v|vertical|h|horizontal$/)) throw new Error("Non expected value");
				j = a.length > 1 ? a : "v" === a ? "vertical" : "horizontal", c()
			}
		}), this.direction = b.direction || "horizontal";
		var k;
		Object.defineProperty(this, "amount", {
			get: function() {
				return k
			},
			set: function(a) {
				if("number" != typeof a) throw new Error("Non expected value");
				k = a, e(), this.index = 1
			}
		}), this.amount = b.amount;
		var l;
		Object.defineProperty(this, "index", {
			get: function() {
				return l
			},
			set: function(a) {
				if(!("number" == typeof a && a > 0 && k >= a)) throw new Error("Non expected value");
				l = a, f(), g()
			}
		}), this.index = b.index || 1;
		var m;
		Object.defineProperty(this, "showpage", {
			get: function() {
				return l
			},
			set: function(a) {
				if("boolean" != typeof a) throw new Error("Non expected value");
				m = a, g()
			}
		}), this.showpage = b.showpage || !1, this.addEventListener = function() {
			a.addEventListener.apply(a, arguments)
		}, this.removeEventListener = function() {
			a.removeEventListener.apply(a, arguments)
		}, this.remove = function() {
			a.parentNode && a.parentNode.removeChild(a)
		}, this.element = a, this.root = i
	}
	var d = 0;
	b.indicator = c
}(window, window.ctrl || (window.ctrl = {})),
function() {
	var a = '[data-ctrl-name=indicator] span{display:block;overflow:hidden;width:.25rem;height:.25rem;font-size:0;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAgCAYAAAAbifjMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAsZJREFUeNqkVE1oE1EQnrdJ2liaQyKNDRVBLU3SYhpSDRqVij2Ip4InqVisWOlBhBSVKOrBXgpKoRCaSw6KJxG8F2xJQSvtpfFifxI9KGnTGJrDWk0226wzy25MYlt368DwYHa+771975uPSZIElcEYM+FixbRg1inlAiaPmcN+sbKfqwEf8Pv97VNTU125XO40Np+lzGazgcnJyeMul8uNPfYqjHoC/NAciURcg4ODRw0YsE0Ui8WtcDi8Mjw8nEBcmmpGBWyfmJhwDg0NtcEuYTKZDMFg0C0IgoSYEpJkGNUDgUBHLBbrogbQEHQSj8czv7S0tEh3YB0ZGXFoBasnGR8fP0hYIrD4fL4m0Bler9eGSyMRmCwWS71eAqvVSpg6DvYeTNVBkef5gl406iSPi0AE/MLCQlYvQTwe38DlB928kEgk9vX39zejfjitz9jb27uICv3GoRiKs7Ozq9FoNKl197GxsWXUwDrNhaxEWVGMcaIoAqqxdSdN4M4igldCoVCSMKCAy4lhx2HqxMG5mE6n+7B2kzKVSl2mGg7TMeqpxLBtxtmojHMjplkp/8Lc/Oc4V7wvq/m24+Uaa/3gxmFoe9jOrjab4UI9B4eont+Cz6t5eHv3o/Qce76U/7/WD+Z62PUTNnjE/hy9KkoS/HyXhQfdMemV6gcyAfnBh/Ns4OR+GNXyjNMZuN0zI5NkOPLAW63Q7rfBY606ONcEo5da4AhduOwHd5ysj2PQoJWAep92smtlP6AL0zsLDjN0l/0Ah9qhlwBfqOV//cBQ9gOhBGt60YUSfC37QRpFopdgLQ8z5AdEkHu2LL0kkWgFUy+pkrCyH4ST8Gl+A55oJYh9h9CbFJCkRU71g1PT0ov3Wbi320nwG6+o8LU6D1XjTJLGYXLed7MrqI0zDQbooPqmCPH1AszRsZWd/x6mvfrBbwEGAEsWX34YFVnkAAAAAElFTkSuQmCC);background-repeat:none;background-size:contain}[data-ctrl-name=indicator] b{box-sizing:border-box;display:block;height:.3125rem;line-height:.3125rem;border:1px solid rgba(0,0,0,.16);background-color:rgba(255,255,255,.4);border-radius:.15625rem;padding:0 .1875rem;margin:0 .21875rem;font-weight:400;color:#999;overflow:hidden}[data-ctrl-name=indicator] b.hide{display:none}[data-ctrl-name=indicator] b.show{display:block}[data-ctrl-name=indicator][data-dir=horizontal]{width:100%;padding-bottom:.25rem;display:-webkit-box;-webkit-box-align:center;-webkit-box-pack:center;display:-ms-flexbox;-ms-flex-align:center;-ms-flex-pack:center;display:-moz-box;-moz-box-align:center;-moz-box-pack:center;text-align:center}[data-ctrl-name=indicator][data-dir=horizontal] span{margin:0 .09375rem}[data-ctrl-name=indicator][data-dir=vertical] span{margin:.09375rem 0}[data-ctrl-name=indicator][data-dir=vertical] b.hide{display:none}[data-ctrl-name=indicator][data-dir=vertical] b.show{display:none}[data-dpr="1"] [data-ctrl-name=indicator] b{font-size:7px}[data-dpr="2"] [data-ctrl-name=indicator] b{font-size:14px}[data-dpr="3"] [data-ctrl-name=indicator] b{font-size:21px}',
		b = document.createElement("style");
	if(document.getElementsByTagName("head")[0].appendChild(b), b.styleSheet) b.styleSheet.disabled || (b.styleSheet.cssText = a);
	else try {
		b.innerHTML = a
	} catch(c) {
		b.innerText = a
	}
}(),
function(a, b, c) {
	"use strict";

	function d(a, b) {
		for(var c = a; c;) {
			if(c.contains(b) || c == b) return c;
			c = c.parentNode
		}
		return null
	}

	function e(a, b, c) {
		var d = k.createEvent("HTMLEvents");
		if(d.initEvent(b, !0, !0), "object" == typeof c)
			for(var e in c) d[e] = c[e];
		a.dispatchEvent(d)
	}

	function f(a, b, c, d, e, f, g, h) {
		var i = Math.atan2(h - f, g - e) - Math.atan2(d - b, c - a),
			j = Math.sqrt((Math.pow(h - f, 2) + Math.pow(g - e, 2)) / (Math.pow(d - b, 2) + Math.pow(c - a, 2))),
			k = [e - j * a * Math.cos(i) + j * b * Math.sin(i), f - j * b * Math.cos(i) - j * a * Math.sin(i)];
		return {
			rotate: i,
			scale: j,
			translate: k,
			matrix: [
				[j * Math.cos(i), -j * Math.sin(i), k[0]],
				[j * Math.sin(i), j * Math.cos(i), k[1]],
				[0, 0, 1]
			]
		}
	}

	function g(a) {
		0 === Object.keys(n).length && (l.addEventListener("touchmove", h, !1), l.addEventListener("touchend", i, !1), l.addEventListener("touchcancel", j, !1));
		for(var b = 0; b < a.changedTouches.length; b++) {
			var c = a.changedTouches[b],
				f = {};
			for(var g in c) f[g] = c[g];
			var k = {
				startTouch: f,
				startTime: Date.now(),
				status: "tapping",
				element: a.srcElement || a.target,
				pressingHandler: setTimeout(function(b) {
					return function() {
						"tapping" === k.status && (k.status = "pressing", e(b, "press", {
							touchEvent: a
						})), clearTimeout(k.pressingHandler), k.pressingHandler = null
					}
				}(a.srcElement || a.target), 500)
			};
			n[c.identifier] = k
		}
		if(2 == Object.keys(n).length) {
			var o = [];
			for(var g in n) o.push(n[g].element);
			e(d(o[0], o[1]), "dualtouchstart", {
				touches: m.call(a.touches),
				touchEvent: a
			})
		}
	}

	function h(a) {
		for(var b = 0; b < a.changedTouches.length; b++) {
			var c = a.changedTouches[b],
				g = n[c.identifier];
			if(!g) return;
			g.lastTouch || (g.lastTouch = g.startTouch), g.lastTime || (g.lastTime = g.startTime), g.velocityX || (g.velocityX = 0), g.velocityY || (g.velocityY = 0), g.duration || (g.duration = 0);
			var h = Date.now() - g.lastTime,
				i = (c.clientX - g.lastTouch.clientX) / h,
				j = (c.clientY - g.lastTouch.clientY) / h,
				k = 70;
			h > k && (h = k), g.duration + h > k && (g.duration = k - h), g.velocityX = (g.velocityX * g.duration + i * h) / (g.duration + h), g.velocityY = (g.velocityY * g.duration + j * h) / (g.duration + h), g.duration += h, g.lastTouch = {};
			for(var l in c) g.lastTouch[l] = c[l];
			g.lastTime = Date.now();
			var m = c.clientX - g.startTouch.clientX,
				o = c.clientY - g.startTouch.clientY,
				p = Math.sqrt(Math.pow(m, 2) + Math.pow(o, 2));
			("tapping" === g.status || "pressing" === g.status) && p > 10 && (g.status = "panning", g.isVertical = !(Math.abs(m) > Math.abs(o)), e(g.element, "panstart", {
				touch: c,
				touchEvent: a,
				isVertical: g.isVertical
			}), e(g.element, (g.isVertical ? "vertical" : "horizontal") + "panstart", {
				touch: c,
				touchEvent: a
			})), "panning" === g.status && (g.panTime = Date.now(), e(g.element, "pan", {
				displacementX: m,
				displacementY: o,
				touch: c,
				touchEvent: a,
				isVertical: g.isVertical
			}), g.isVertical ? e(g.element, "verticalpan", {
				displacementY: o,
				touch: c,
				touchEvent: a
			}) : e(g.element, "horizontalpan", {
				displacementX: m,
				touch: c,
				touchEvent: a
			}))
		}
		if(2 == Object.keys(n).length) {
			for(var q, r = [], s = [], t = [], b = 0; b < a.touches.length; b++) {
				var c = a.touches[b],
					g = n[c.identifier];
				r.push([g.startTouch.clientX, g.startTouch.clientY]), s.push([c.clientX, c.clientY])
			}
			for(var l in n) t.push(n[l].element);
			q = f(r[0][0], r[0][1], r[1][0], r[1][1], s[0][0], s[0][1], s[1][0], s[1][1]), e(d(t[0], t[1]), "dualtouch", {
				transform: q,
				touches: a.touches,
				touchEvent: a
			})
		}
	}

	function i(a) {
		if(2 == Object.keys(n).length) {
			var b = [];
			for(var c in n) b.push(n[c].element);
			e(d(b[0], b[1]), "dualtouchend", {
				touches: m.call(a.touches),
				touchEvent: a
			})
		}
		for(var f = 0; f < a.changedTouches.length; f++) {
			var g = a.changedTouches[f],
				k = g.identifier,
				p = n[k];
			if(p) {
				if(p.pressingHandler && (clearTimeout(p.pressingHandler), p.pressingHandler = null), "tapping" === p.status && (p.timestamp = Date.now(), e(p.element, "tap", {
						touch: g,
						touchEvent: a
					}), o && p.timestamp - o.timestamp < 300 && e(p.element, "doubletap", {
						touch: g,
						touchEvent: a
					}), o = p), "panning" === p.status) {
					var q = Date.now(),
						r = q - p.startTime,
						s = ((g.clientX - p.startTouch.clientX) / r, (g.clientY - p.startTouch.clientY) / r, g.clientX - p.startTouch.clientX),
						t = g.clientY - p.startTouch.clientY,
						u = Math.sqrt(p.velocityY * p.velocityY + p.velocityX * p.velocityX),
						v = u > .5 && q - p.lastTime < 100,
						w = {
							duration: r,
							isflick: v,
							velocityX: p.velocityX,
							velocityY: p.velocityY,
							displacementX: s,
							displacementY: t,
							touch: g,
							touchEvent: a,
							isVertical: p.isVertical
						};
					e(p.element, "panend", w), v && (e(p.element, "flick", w), p.isVertical ? e(p.element, "verticalflick", w) : e(p.element, "horizontalflick", w))
				}
				"pressing" === p.status && e(p.element, "pressend", {
					touch: g,
					touchEvent: a
				}), delete n[k]
			}
		}
		0 === Object.keys(n).length && (l.removeEventListener("touchmove", h, !1), l.removeEventListener("touchend", i, !1), l.removeEventListener("touchcancel", j, !1))
	}

	function j(a) {
		if(2 == Object.keys(n).length) {
			var b = [];
			for(var c in n) b.push(n[c].element);
			e(d(b[0], b[1]), "dualtouchend", {
				touches: m.call(a.touches),
				touchEvent: a
			})
		}
		for(var f = 0; f < a.changedTouches.length; f++) {
			var g = a.changedTouches[f],
				k = g.identifier,
				o = n[k];
			o && (o.pressingHandler && (clearTimeout(o.pressingHandler), o.pressingHandler = null), "panning" === o.status && e(o.element, "panend", {
				touch: g,
				touchEvent: a
			}), "pressing" === o.status && e(o.element, "pressend", {
				touch: g,
				touchEvent: a
			}), delete n[k])
		}
		0 === Object.keys(n).length && (l.removeEventListener("touchmove", h, !1), l.removeEventListener("touchend", i, !1), l.removeEventListener("touchcancel", j, !1))
	}
	var k = a.document,
		l = k.documentElement,
		m = Array.prototype.slice,
		n = {},
		o = null;
	l.addEventListener("touchstart", g, !1)
}(window, window.lib || (window.lib = {})),
function(a, b) {
	function c(a, b, c, d) {
		function e(a) {
			return(3 * k * a + 2 * l) * a + m
		}

		function f(a) {
			return((k * a + l) * a + m) * a
		}

		function g(a) {
			return((n * a + o) * a + p) * a
		}

		function h(a) {
			for(var b, c, d = a, g = 0; 8 > g; g++) {
				if(c = f(d) - a, Math.abs(c) < j) return d;
				if(b = e(d), Math.abs(b) < j) break;
				d -= c / b
			}
			var h = 1,
				i = 0;
			for(d = a; h > i;) {
				if(c = f(d) - a, Math.abs(c) < j) return d;
				c > 0 ? h = d : i = d, d = (h + i) / 2
			}
			return d
		}

		function i(a) {
			return g(h(a))
		}
		var j = 1e-6,
			k = 3 * a - 3 * c + 1,
			l = 3 * c - 6 * a,
			m = 3 * a,
			n = 3 * b - 3 * d + 1,
			o = 3 * d - 6 * b,
			p = 3 * b;
		return i
	}
	b.cubicbezier = c, b.cubicbezier.linear = c(0, 0, 1, 1), b.cubicbezier.ease = c(.25, .1, .25, 1), b.cubicbezier.easeIn = c(.42, 0, 1, 1), b.cubicbezier.easeOut = c(0, 0, .58, 1), b.cubicbezier.easeInOut = c(.42, 0, .58, 1)
}(window, window.lib || (window.lib = {})),
function(a, b) {
	function c(a) {
		return setTimeout(a, l)
	}

	function d(a) {
		clearTimeout(a)
	}

	function e() {
		var a = {},
			b = new m(function(b, c) {
				a.resolve = b, a.reject = c
			});
		return a.promise = b, a
	}

	function f(a, b) {
		return ["then", "catch"].forEach(function(c) {
			b[c] = function() {
				return a[c].apply(a, arguments)
			}
		}), b
	}

	function g(b) {
		var c, d, h = !1;
		this.request = function() {
			h = !1;
			var g = arguments;
			return c = e(), f(c.promise, this), d = n(function() {
				h || c && c.resolve(b.apply(a, g))
			}), this
		}, this.cancel = function() {
			return d && (h = !0, o(d), c && c.reject("CANCEL")), this
		}, this.clone = function() {
			return new g(b)
		}
	}

	function h(a, b) {
		"function" == typeof b && (b = {
			0: b
		});
		for(var c = a / l, d = 1 / c, e = [], f = Object.keys(b).map(function(a) {
				return parseInt(a)
			}), h = 0; c > h; h++) {
			var i = f[0],
				j = d * h;
			if(null != i && 100 * j >= i) {
				var k = b["" + i];
				k instanceof g || (k = new g(k)), e.push(k), f.shift()
			} else e.length && e.push(e[e.length - 1].clone())
		}
		return e
	}

	function i(a) {
		var c;
		return "string" == typeof a || a instanceof Array ? b.cubicbezier ? "string" == typeof a ? b.cubicbezier[a] && (c = b.cubicbezier[a]) : a instanceof Array && 4 === a.length && (c = b.cubicbezier.apply(b.cubicbezier, a)) : console.error("require lib.cubicbezier") : "function" == typeof a && (c = a), c
	}

	function j(a, b, c) {
		var d, g = h(a, c),
			j = 1 / (a / l),
			k = 0,
			m = i(b);
		if(!m) throw new Error("unexcept timing function");
		var n = !1;
		this.play = function() {
			function a() {
				var c = j * (k + 1).toFixed(10),
					e = g[k];
				e.request(c.toFixed(10), b(c).toFixed(10)).then(function() {
					n && (k === g.length - 1 ? (n = !1, d && d.resolve("FINISH"), d = null) : (k++, a()))
				}, function() {})
			}
			if(!n) return n = !0, d || (d = e(), f(d.promise, this)), a(), this
		}, this.stop = function() {
			return n ? (n = !1, g[k] && g[k].cancel(), this) : void 0
		}
	}
	var k = 60,
		l = 1e3 / k,
		m = a.Promise || b.promise && b.promise.ES6Promise,
		n = window.requestAnimationFrame || window.msRequestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || c,
		o = window.cancelAnimationFrame || window.msCancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || d;
	(n === c || o === d) && (n = c, o = d), b.animation = function(a, b, c) {
		return new j(a, b, c)
	}, b.animation.frame = function(a) {
		return new g(a)
	}, b.animation.requestFrame = function(a) {
		var b = new g(a);
		return b.request()
	}
}(window, window.lib || (window.lib = {})),
function(a, b) {
	function c(a, b) {
		var c = new j(location.href),
			d = h.getElementById("buried"),
			e = c.params.ttid,
			f = c.params.ad_id,
			g = c.params.source_type,
			i = c.params.refpid,
			k = c.params.actparam,
			l = c.params.actname,
			m = c.params.ali_trackid,
			n = c.params.pid,
			o = h.cookie.match(/(?:^|\s)cna=([^;]+)(?:;|$)/);
		c.search = "", c.hash = "";
		var p = {};
		if(d && (e = d.value), p.from = "h5", e && (p.ttid = e), i && (p.refpid = i), k && (p.actparam = k), l && (p.actname = l), p.url = c.toString(), n && (p.pid = n), f && (p.ad_id = f), g && (p.source_type = g), m && (p.ali_trackid = m), o && (p.h5_uid = o[1]), "object" == typeof b)
			for(var q in b) p[q] = b[q];
		return a.params.point = JSON.stringify(p), a
	}

	function d(a, b) {
		var c = new j(location.href),
			d = h.getElementById("buried");
		for(var e in c.params) a.params.hasOwnProperty(e) || (a.params[e] = c.params[e]);
		if(d && (a.params.ttid = d.value), "object" == typeof b)
			for(var e in b) a.params[e] = b[e];
		return a
	}

	function e(a) {
		o || (o = h.createElement("iframe"), o.id = "callapp_iframe_" + Date.now(), o.frameborder = "0", o.style.cssText = "display:none;border:0;width:0;height:0;", h.body.appendChild(o)), o.src = a
	}

	function f(a, b) {
		b.replace === !1 || !l && b.replace !== !0 ? location.href = a : location.replace(a)
	}

	function g(a, b) {
		var c = document.createElement("a");
		c.setAttribute("href", a), c.style.display = "none", document.body.appendChild(c);
		var d = document.createEvent("HTMLEvents");
		d.initEvent("click", !1, !1), c.dispatchEvent(d)
	}
	var h = a.document,
		i = a.navigator.userAgent,
		j = b.httpurl,
		k = b.env.os,
		l = (b.env.params, b.env.aliapp),
		m = b.env.browser,
		n = {
			"taobao:": "com.taobao.taobao",
			"taobaowebview:": "com.taobao.taobao",
			"tmall:": "com.tmall.wireless"
		};
	b.callapp = b.callapp || {};
	var o;
	b.callapp.gotoPage = function(a, b) {
		b = b || {}, "undefined" == typeof b.point && (b.point = !0), "undefined" == typeof b.params && (b.params = !0);
		var h = new j(a || location.href);
		if(a = new j(a), ("http:" === a.protocol || "https:" === a.protocol) && (k.isAndroid && l && "TB" === l.appname ? (a = new j("taobaowebview://m.taobao.com/"), a.params.weburl = h.toString()) : a.protocol = "taobao:"), "taobao:" === a.protocol) b.point && c(a, b.point), b.params && d(a, b.params);
		else if("taobaowebview:" === a.protocol) {
			b.point && c(a, b.point);
			var o = new j(a.params.weburl);
			b.params && d(o, b.params), b.point && c(o, b.point), a.params.weburl = o.toString()
		} else "tmall:" !== a.protocol.toLowerCase() && "kddcpublic:" !== a.protocol.toLowerCase() && "mdatadwphone:" !== a.protocol.toLowerCase() && b.params && d(a, b.params);
		var p = k.isAndroid && m.isChrome && !m.isWebview,
			q = k.isAndroid && !!i.match(/samsung/i) && k.version.gte("4.3") && k.version.lt("4.5"),
			r = k.isIPhone && k.version.gte("9.0") && m.isSafari;
		(p || q || b.forceIntent) && (a.hash = "Intent;scheme=" + a.protocol.replace(":", "") + ";package=" + (b["package"] || n[a.protocol]) + ";end", a.protocol = "intent:"), r ? setTimeout(function() {
			g(a.toString(), b)
		}, 100) : l || "intent:" === a.protocol ? setTimeout(function() {
			f(a.toString(), b)
		}, 100) : e(a.toString())
	}, b.callapp.download = function(a, b) {
		b = b || {}, a || (a = k.isIPhone ? "http://itunes.apple.com/cn/app/id387682726?mt=8" : k.isIPad ? "https://itunes.apple.com/app/id438865278" : k.isAndroid ? "//download.alicdn.com/wireless/taobao4android/latest/taobao4android_703248.apk" : ""), a = new j(a), k.isAndroid && a.pathname.match(/\.apk$/) ? (a.search = "", a.hash = "") : b.params && d(a, b.params), a = a.toString(), f(a, b)
	}
}(window, window.lib || (window.lib = {})),
function(a, b) {
	function c() {
		this.ES6Promise = e, this.defer = function() {
			var a = {},
				b = new e(function(b, c) {
					a.resolve = b, a.reject = c
				});
			return a.promise = b, a
		}, this.wrap = function(a) {
			var b = this;
			return function() {
				if("function" == typeof a) {
					var c = b.defer(),
						d = (c.promise, [c.resolve, c.reject].concat(Array.prototype.slice.call(arguments))),
						e = a.apply(this, d);
					return b.isPromise(e) ? e : c.promise
				}
				return a
			}
		}, this.mixin = function(a, b) {
			return ["then", "catch"].forEach(function(c) {
				b[c] = function() {
					return a[c].apply(a, arguments)
				}
			}), b
		}, this.isThenable = function(a) {
			return !!a && !!a.then && "function" == typeof a.then
		}, this.isPromise = function(a) {
			return !!(a instanceof e)
		}, this.record = function(a) {
			var b = Object.create(a);
			if(Object.defineProperties) {
				var c, d = "pending";
				Object.defineProperties(b, {
					PromiseState: {
						get: function() {
							return d
						},
						enmurable: !1
					},
					PromiseResult: {
						get: function() {
							return c
						},
						enmurable: !1
					}
				}), a.then(function(a) {
					d = "fullfilled", c = a
				}, function(a) {
					d = "rejected", c = a
				})
			} else b.PromiseState = "pending", b.PromiseResult = void 0, a.then(function(a) {
				b.PromiseState = "fullfilled", b.PromiseResult = a
			}, function(a) {
				b.PromiseState = "rejected", b.PromiseResult = a
			});
			return b
		}
	}

	function d() {
		var a = new e(function(a, b) {
			"complete" === document.readyState ? a() : document.addEventListener("DOMContentLoaded", a)
		});
		this.domReady = function() {
			return a
		};
		var c = new e(function(a, b) {
			window.addEventListener("load", a)
		});
		this.pageLoad = function() {
			return c
		}, this.delay = function(a) {
			return new e(function(b, c) {
				setTimeout(b, a)
			})
		}, this.waitForEvent = function(a, b, c) {
			return new e(function(d, e) {
				function f(c) {
					a.removeEventListener(b, f), d(c)
				}
				a.addEventListener(b, f, c)
			})
		}, this.parallel = function(a) {
			return e.all(a.map(function(a) {
				return b.promise.features.isThenable(a) ? e.resolve(a) : "function" == typeof a ? a() : a
			}))
		}, this.serial = function(a) {
			var c = e.resolve();
			return a.forEach(function(a) {
				c = b.promise.features.isThenable(a) ? c.then(function() {
					return e.resolve(a)
				}) : "function" == typeof a ? c.then(a) : c.then(function() {
					return a
				})
			}), c
		}
	}
	var e = a.Promise;
	if(!e) throw new Error("ES6Promise is not working in this browser");
	var f = new c,
		g = new d;
	b.promise = Object.create(f), b.promise.features = f, b.promise.utilities = g
}(window, window.lib || (window.lib = {})),
function(a, b, c) {
	function d(a) {
		a = a || "";
		var b = this,
			c = {};
		if(a instanceof d && (a = a.toString()), a && "string" == typeof a)
			for(var e = a.split("&"), f = 0; f < e.length; f++) {
				var g = e[f].split("=");
				c[decodeURIComponent(g[0])] = decodeURIComponent(g[1])
			} else if("object" == typeof a)
				for(var h in a) c[h] = a[h];
		for(var h in c) ! function(a) {
			Object.defineProperty(b, a, {
				get: function() {
					return c[a]
				},
				set: function(b) {
					c[a] = b
				},
				enumerable: !0
			})
		}(h);
		this.toString = function() {
			return Object.keys(c).sort().map(function(a) {
				return encodeURIComponent(a) + "=" + encodeURIComponent(c[a])
			}).join("&")
		}
	}

	function e() {
		function b(a, b) {
			if(b) g.replace(a);
			else {
				var c = f.createElement("a");
				c.href = a, c.style.cssText = "display:none;", f.body.appendChild(c);
				var d;
				d = f.createEvent("HTMLEvents"), d.initEvent("click", !1, !1), d ? c.dispatchEvent(d) : g.href = a
			}
		}

		function c(a, b) {
			var c = f.createEvent("HTMLEvents");
			if(c.initEvent(a, !1, !1), b)
				for(var d in b) c[d] = b[d];
			window.dispatchEvent(c)
		}

		function e(a) {
			o.forEach(function(b) {
				b.call(this, a)
			})
		}

		function i() {
			this.exec = function() {
				e("navigation:start")
			}
		}

		function j() {
			this.exec = function() {
				e("navigation:push")
			}
		}

		function k() {
			this.exec = function() {
				e("navigation:pop")
			}
		}

		function l() {
			this.exec = function() {
				e("navigation:replace")
			}
		}

		function m(a, b) {
			return a.name === b.name && a.args.toString() === b.args.toString()
		}
		var n = [],
			o = [],
			p = !!h.state,
			q = {},
			r = "initialize";
		n.exec = function() {
			n.length && n.shift().exec()
		}, this.delegate = function(a) {
			return o.indexOf(a) < 0 && o.push(a), this
		}, this.push = function(a, e) {
			var f = {
				name: a,
				args: new d(e),
				id: q.state.id + 1
			};
			if(!m(f, q.state)) {
				r = "push";
				var g = f.args.toString();
				if(p) {
					var i = "#" + f.name + (g ? "?" + g : "");
					h.pushState({
						name: f.name,
						args: g,
						id: f.id
					}, null, i), c("pushstate")
				} else {
					var i = "#" + f.name + "[" + f.id + "]" + (g ? "?" + g : "");
					b(i)
				}
				return this
			}
		}, this.pop = function() {
			return q.state.id > 1 && (r = "pop", h.back()), this
		}, this.replace = function(a, e) {
			var f = {
				name: a,
				args: new d(e),
				id: q.state.id
			};
			if(!m(f, q.state)) {
				r = "replace";
				var g = f.args.toString();
				if(p) {
					var i = "#" + f.name + (g ? "?" + g : "");
					h.replaceState({
						name: f.name,
						args: g,
						id: f.id
					}, null, i), c("replacestate")
				} else {
					var i = "#" + f.name + "[" + f.id + "]" + (g ? "?" + g : "");
					b(i, !0)
				}
				return this
			}
		};
		var s = !1;
		this.start = function(b) {
			function c() {
				var a;
				if(p && null != h.state && h.state !== !0) a = {
					id: h.state.id,
					name: h.state.name,
					args: new d(h.state.args)
				};
				else {
					var c = g.hash,
						e = b.defaultPath,
						f = 1,
						i = b.defaultArgs,
						j = c.match(/#([^\[\]\?]+)(?:\[(\d+)\])?(?:\?(.*))?/);
					j && (e = j[1], f = j[2], i = j[3]), a = {
						name: e || "",
						id: parseInt(f || 1),
						args: new d(i || "")
					}
				}
				return a
			}

			function e(a) {
				var b = c(),
					d = q.state;
				q.state = b, b.id < d.id ? (r = "pop", n.push(new k)) : b.id === d.id ? "replace" === r ? n.push(new l) : console.error("请勿用location.hash/href/replace和history.back/go来改变hash值") : (r = "push", n.push(new j)), n.exec()
			}
			if(!s) {
				s = !0, p &= !!b.useHistoryState;
				var f = c();
				if(p) {
					var m = f.args.toString(),
						o = "#" + f.name + (m ? "?" + m : "");
					g.hash !== o && h.pushState({
						name: f.name,
						args: m,
						id: f.id
					}, null, o), setTimeout(function() {
						a.addEventListener("pushstate", e, !1), a.addEventListener("popstate", e, !1), a.addEventListener("replacestate", e, !1)
					}, 1)
				} else {
					var m = f.args.toString(),
						o = "#" + f.name + "[" + f.id + "]" + (m ? "?" + m : "");
					g.hash !== o && (g.hash = o), setTimeout(function() {
						a.addEventListener("hashchange", e, !1)
					}, 1)
				}
				return q.state = f, r = "start", n.push(new i), n.exec(), this
			}
		}, Object.defineProperty(this, "useHistoryState", {
			get: function() {
				return p
			}
		}), Object.defineProperty(this, "action", {
			get: function() {
				return r
			}
		}), Object.defineProperty(this, "state", {
			get: function() {
				var a = q.state || {};
				return {
					id: a.id,
					name: a.name,
					args: a.args
				}
			}
		})
	}
	var f = a.document,
		g = a.location,
		h = a.history,
		i = a.navigator.userAgent;
	!!i.match(/Firefox/i), !!i.match(/IEMobile/i);
	!h.state && h.replaceState && h.replaceState(!0, null), b.navigation = function() {
		return new e
	}
}(window, window.lib || (window.lib = {})),
function(a, b) {
	function c(a, b) {
		return [
			[(a / 3 + (a + b) / 3 - a) / (b - a), (a * a / 3 + a * b * 2 / 3 - a * a) / (b * b - a * a)],
			[(b / 3 + (a + b) / 3 - a) / (b - a), (b * b / 3 + a * b * 2 / 3 - a * a) / (b * b - a * a)]
		]
	}

	function d(a) {
		if(this.v = a.v || 0, this.a = a.a || 0, "undefined" != typeof a.t && (this.t = a.t), "undefined" != typeof a.s && (this.s = a.s), "undefined" == typeof this.t)
			if("undefined" == typeof this.s) this.t = -this.v / this.a;
			else {
				var b = (Math.sqrt(this.v * this.v + 2 * this.a * this.s) - this.v) / this.a,
					c = (-Math.sqrt(this.v * this.v + 2 * this.a * this.s) - this.v) / this.a;
				this.t = Math.min(b, c)
			}
			"undefined" == typeof this.s && (this.s = this.a * this.t * this.t / 2 + this.v * this.t)
	}
	d.prototype.generateCubicBezier = function() {
		return c(this.v / this.a, this.t + this.v / this.a)
	}, b.motion = function(a) {
		return new d(a)
	}
}(window, window.lib || (window.lib = {})),
function(a, b) {
	function c(a, b) {
		function c() {
			s || (s = !0, m = a.querySelector("canvas"), n = m.getContext("2d"), q = .13373158940994154, r = .06015722128359704);
			var b = m.getBoundingClientRect();
			(m.width !== b.width * t || m.height !== b.height * t) && (m.width = b.width * t, m.height = b.height * t, o = b.width / 2, p = o / 15)
		}

		function e(a) {
			"draw" === w && (c(), v.style.display = "none", u.style.display = "block", a > 100 && (a = 100), n.clearRect(0, 0, m.width * t, m.height * t), n.beginPath(), n.arc(o * t, o * t, (o - p) * t, -q - Math.PI / 2, -q - Math.PI / 2 - r * a, !0), n.lineWidth = p * t, n.strokeStyle = "#999", n.stroke(), n.closePath())
		}

		function h() {
			"spin" === w && (v.style.display = "block", u.style.display = "none")
		}

		function i() {
			var b = a.querySelector(".arrow");
			return b.style.cssText = "display: block", d.resolve()
		}

		function j() {
			var b = a.querySelector(".arrow");
			return b.style[f + "Transform"] = "scale(1)", b.style.opacity = "1", new lib.animation(400, lib.cubicbezier.easeIn, function(a, c) {
				b.style[f + "Transform"] = "scale(" + (1 - .5 * c) + ")", b.style.opacity = 1 - c + ""
			}).play().then(function() {
				b.style.cssText = "display:none"
			})
		}
		var k = Date.now() + "-" + ++g,
			l = document.createDocumentFragment();
		1 !== arguments.length || arguments[0] instanceof HTMLElement || (b = arguments[0], a = null), a || (a = document.createElement("div"), l.appendChild(a)), b = b || {}, a.setAttribute("data-ctrl-name", "loading"), a.setAttribute("data-ctrl-id", k), a.innerHTML = '<div rol="draw"><canvas></canvas><span class="arrow"></span></div><div rol="spin"><div class="circle"><span></span></div></div><span class="text"></span>';
		var m, n, o, p, q, r, s = !1,
			t = 2,
			u = a.querySelector('[rol="draw"]'),
			v = a.querySelector('[rol="spin"]');
		Object.defineProperty(this, "bgcolor", {
			get: function() {
				return a.style.backgroundColor
			},
			set: function(b) {
				if("string" != typeof b) throw new Error("Non expected value");
				a.querySelector('[rol="spin"] span').style.backgroundColor = b, a.style.backgroundColor = b
			}
		}), Object.defineProperty(this, "text", {
			get: function() {
				return a.querySelector(".text").textContent
			},
			set: function(b) {
				if("string" != typeof b) throw new Error("Non expected value");
				var c = a.querySelector("div"),
					d = a.querySelector(".text");
				b ? (a.style[f + "BoxPack"] = "", c.style.marginLeft = "", d.style.display = "block", d.textContent = b) : (a.style[f + "BoxPack"] = "center", c.style.marginLeft = "0", d.style.display = "none", d.textContent = "")
			}
		});
		var w = "";
		Object.defineProperty(this, "mode", {
			get: function() {
				return w
			},
			set: function(a) {
				if(!a && "string" != typeof a && ["draw", "spin"].indexOf(a) < 0) throw new Error("Non expected value");
				w = a, "spin" === w ? y ? j().then(h) : h() : "draw" === w && i().then(function() {
					e(0)
				})
			}
		});
		var x = 0;
		Object.defineProperty(this, "per", {
			get: function() {
				return x
			},
			set: function(a) {
				if("draw" !== w) throw new Error('only work under "draw" mode');
				if(!a && "number" != typeof a && 0 > a && a > 100) throw new Error("Non expected value");
				e(a)
			}
		});
		var y = "";
		Object.defineProperty(this, "arrowDirection", {
			get: function() {
				return y
			},
			set: function(b) {
				if(!b && "string" != typeof b && ["up", "down", ""].indexOf(b) < 0) throw new Error("Non expected value");
				y = b, a.querySelector(".arrow").className = "arrow " + b
			}
		}), this.remove = function() {
			a.parentNode && a.parentNode.removeChild(a)
		}, this.element = a, this.root = l
	}
	var d = a.Promise,
		e = a.navigator.userAgent.match(/IEMobile\/([\d\.]+)/),
		f = e ? "ms" : "webkit",
		g = 0;
	b.loading = function(a) {
		return new c(a)
	}
}(window, window.ctrl || (window.ctrl = {})),
function() {
	var a = '[data-ctrl-name=loading]{width:100%;height:100%;display:-ms-flexbox;-ms-flex-align:center;-ms-flex-pack:center;display:-webkit-box;-webkit-box-align:center;-webkit-box-pack:center;display:-moz-box;-moz-box-align:center;-moz-box-pack:center}[data-ctrl-name=loading] [rol=draw]{position:relative;display:none}[data-ctrl-name=loading] [rol=draw] .arrow{display:none;position:absolute;left:0;top:0;width:100%;height:100%;background-position:center center;background-repeat:no-repeat;background-size:contain}[data-ctrl-name=loading] [rol=draw] .arrow.down{display:block;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAlFJREFUeNrsmrtLw1AUh5va0kFFkVYR3ZyEriqKioo66OiirmL+qK6CmwgugoqDi+jmCwc3dbDWt/ikJv4uPYUQ0tokvbepOQc+mqQkzZd7c889aTTTNCNhimgkZMHCLMzCLMzCLMzCLMzCsiLm9wCZTMbvITS68AID/LjZWdd1tcJVigRIgibwCLIkH7wWrkKIcu0dXNL5NIN2cCtDOhawWyxPLSxtfKmFsBDppHv3hiSdwpD146pjDVyDK7AXhrQ0a1kepHv2XwvHbesNPPFgYRZm4TAIJyiXh0a4C7SGRVij+fYCqrVEGIRFwXEOXsEwpCv2iNVxl34GK6CNysqXUIzSuq4/UEsrb2FxpZfpIorHIPc+j9cIFqlqWgUfZaTNWgivg1FaXgJjVBV5iRawBfppfQ7MBC0PD1mWe8AmSHk4jthn2yIrYiqIE48d23oa7LqUTtE+fbbt+0EUngeHPqSLsmnb9lPq0oETFmli2qN0OdkJkAvqXLoofexCOqlKVlYeFtKTdMJO0vbYUCUrc+KRoxN2krbnzF5VsrJnWqWky5V0UmVVTC1LSddE1rUwqhJNkrQSWS8tHPUpfebw3YkqWS/CYu4d9yE9Hin8cWYd0UdUyXopHvI0ql6AL4/SIhcPUBV0AD6VPipx+3IpWreDpI/Ak0OaUV0Pyx2l8QNZuhdFRdRdb09NvJ7sXaTwP64o0sXDtG/wRp9GFVpds+Rro6ZdukSq0my9xS5t/iHntG5WcuHcdmmNXxBnYRZmYRZmYRZmYRZm4erErwADAJUalZO5x9gCAAAAAElFTkSuQmCC)}[data-ctrl-name=loading] [rol=draw] .arrow.up{display:block;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAApFJREFUeNrsms9LFGEYx9+dRLMo0RQlOgieQgu7KF0UxQ5dunQLuu6/0v+w4rW6dOyiUYdEIS8ehCAICQJxTQoia9t2374PPovjsD9m3n3nnXed5wtfdpbZednP+z7zzvd9dwtaa5UnBSpnEmABFmABFmABFmABdqa+UqmUVtsFdjS76g7XhI/DA1Lna89dXywWkwGnWDWav2QS6cix5vb64av8+otd69B5zkq6HhqNbqUZ7Df8DS7D1+FZeDQP9/A/+Cv8GZ6Gx3sB+DK8CC/BVwxH/Tu8DY9hDrqU9T3cTkPwF34lncCT8JFBW3/hT8xQ83GEx+D3IVjFI/yOz5mMdJXL3LuSJqC38J0m56b5nCl03TfgBuxMm8/MmELjOax9Ao4D2zW0L8BxYLVr6MAx7McmUXLPJXTgEJbAHjX5/HIL6DeRGd1L4HawyxwPozpqAX0XXrcNHTiEbRcuWkHP2Ya2CfzKEDYO9Esfge9H3u8kgO0EveIj8Ebo+AP8wDAj0zUPeUXU0Ja1HQ+LwI/hJ9yJz3mRbipaAs5TkOLouOoauBBje4YW6WsWO/AYfpblY4l2GkZUjysuMI3sT/ge/DSNQOAbsOJ7aRO+Bt9W53cYe0ZJJ60K/AIeVnY26bwHJv3grZkLX9Lh+7nSy8D9KkcKeALKFTDtHI7nCXhXnf5sMZAXYIqE+/BNlf6mXnTDvOo69zcA6TFzCE+kHCgorW2H3r9OGHysPodPuNEbHNzTChYL3LHU/kGWwKQ/XGaDXOq6i8pp9QUbvwB6EzxqlpLUBEfQPuWRgg6JylQ0umUONVPwLa6azBccafZ+nSfCsjr7r0fmC46C/F9agAVYgAVYgAVYgAVYgAXYSP8FGADPRJpYXEdXKAAAAABJRU5ErkJggg==)}[data-dpr="1"] [data-ctrl-name=loading] [rol=draw],[data-dpr="1"] [data-ctrl-name=loading] [rol=spin],[data-dpr="1"] [data-ctrl-name=loading] canvas{width:30px;height:30px}[data-dpr="2"] [data-ctrl-name=loading] [rol=draw],[data-dpr="2"] [data-ctrl-name=loading] [rol=spin],[data-dpr="2"] [data-ctrl-name=loading] canvas{width:60px;height:60px}[data-dpr="3"] [data-ctrl-name=loading] [rol=draw],[data-dpr="3"] [data-ctrl-name=loading] [rol=spin],[data-dpr="3"] [data-ctrl-name=loading] canvas{width:90px;height:90px}[data-ctrl-name=loading] [rol=spin]{position:relative;display:none}[data-ctrl-name=loading] [rol=spin] .circle{position:absolute;width:100%;height:100%;border-radius:50%;border:1px solid #999;box-sizing:border-box;-webkit-animation:spinner .6s linear infinite;-ms-animation:spinner .6s linear infinite;animation:spinner .6s linear infinite}[data-ctrl-name=loading] [rol=spin] .circle span{background-color:#fff;display:block;position:absolute;width:8px;height:4px;left:-1px;margin-top:-2px;top:50%;content:\'\'}@-webkit-keyframes spinner{0%{-webkit-transform:rotate(90deg)}100%{-webkit-transform:rotate(-270deg)}}@keyframes spinner{0%{transform:rotate(90deg)}100%{transform:rotate(-270deg)}}[data-dpr="1"] [data-ctrl-name=loading] [rol=spin] .circle{width:30px;height:30px;border-width:1px}[data-dpr="2"] [data-ctrl-name=loading] [rol=spin] .circle{width:60px;height:60px;border-width:2px}[data-dpr="3"] [data-ctrl-name=loading] [rol=spin] .circle{width:90px;height:90px;border-width:3px}[data-dpr="1"] [data-ctrl-name=loading] [rol=spin] .circle span{width:8px;height:4px;left:-1px;margin-top:-2px}[data-dpr="2"] [data-ctrl-name=loading] [rol=spin] .circle span{width:16px;height:8px;left:-2px;margin-top:-4px}[data-dpr="3"] [data-ctrl-name=loading] [rol=spin] .circle span{width:24px;height:12px;left:-3px;margin-top:-6px}[data-ctrl-name=loading] .text{display:block;color:#999;margin-left:.3rem}[data-dpr="1"] [data-ctrl-name=loading] .text{height:30px;line-height:30px;font-size:12px}[data-dpr="2"] [data-ctrl-name=loading] .text{height:60px;line-height:60px;font-size:24px}[data-dpr="3"] [data-ctrl-name=loading] .text{height:90px;line-height:90px;font-size:36px}',
		b = document.createElement("style");
	if(document.getElementsByTagName("head")[0].appendChild(b), b.styleSheet) b.styleSheet.disabled || (b.styleSheet.cssText = a);
	else try {
		b.innerHTML = a
	} catch(c) {
		b.innerText = a
	}
}(),
function() {
	var a = '[data-ctrl-name=pageview]{position:relative;width:100%;overflow-x:hidden}[data-ctrl-name=pageview]>.view{width:100%;display:none}[data-ctrl-name=pageview].fullscreen{height:100%;overflow:hidden}[data-ctrl-name=pageview].fullscreen>.view{height:100%;overflow:hidden}[data-ctrl-name=pageview] .view[animation="push:current"]{opacity:1;-webkit-animation:push-current .4s ease;-ms-animation:push-current .4s ease;-moz-animation:push-current .4s ease;animation:push-current .4s ease}@-webkit-keyframes push-current{0%{opacity:1}100%{opacity:0}}@keyframes push-current{0%{opacity:1}100%{opacity:0}}[data-ctrl-name=pageview] .view[animation="push:next"]{position:absolute;left:0;top:0;-webkit-transform:translateX(100%);-ms-transform:translateX(100%);-moz-transform:translateX(100%);transform:translateX(100%);-webkit-animation:push-next .4s ease;-ms-animation:push-next .4s ease;-moz-animation:push-next .4s ease;animation:push-next .4s ease}@-webkit-keyframes push-next{0%{-webkit-transform:translateX(100%);-ms-transform:translateX(100%);-moz-transform:translateX(100%);transform:translateX(100%)}100%{-webkit-transform:translateX(0);-ms-transform:translateX(0);-moz-transform:translateX(0);transform:translateX(0)}}@keyframes push-next{0%{-webkit-transform:translateX(100%);-ms-transform:translateX(100%);-moz-transform:translateX(100%);transform:translateX(100%)}100%{-webkit-transform:translateX(0);-ms-transform:translateX(0);-moz-transform:translateX(0);transform:translateX(0)}}[data-ctrl-name=pageview] .view[animation="pop:previous"]{opacity:0;-webkit-animation:pop-previous .4s ease;-ms-animation:pop-previous .4s ease;-moz-animation:pop-previous .4s ease;animation:pop-previous .4s ease}@-webkit-keyframes pop-previous{0%{opacity:0}100%{opacity:1}}@keyframes pop-previous{0%{opacity:0}100%{opacity:1}}[data-ctrl-name=pageview] .view[animation="pop:current"]{position:absolute;left:0;top:0;-webkit-transform:translateX(0);-ms-transform:translateX(0);-moz-transform:translateX(0);transform:translateX(0);-webkit-animation:pop-current .4s ease;-ms-animation:pop-current .4s ease;-moz-animation:pop-current .4s ease;animation:pop-current .4s ease}@-webkit-keyframes pop-current{0%{-webkit-transform:translateX(0);-ms-transform:translateX(0);-moz-transform:translateX(0);transform:translateX(0)}100%{-webkit-transform:translateX(100%);-ms-transform:translateX(100%);-moz-transform:translateX(100%);transform:translateX(100%)}}@keyframes pop-current{0%{-webkit-transform:translateX(0);-ms-transform:translateX(0);-moz-transform:translateX(0);transform:translateX(0)}100%{-webkit-transform:translateX(100%);-ms-transform:translateX(100%);-moz-transform:translateX(100%);transform:translateX(100%)}}',
		b = document.createElement("style");
	if(document.getElementsByTagName("head")[0].appendChild(b), b.styleSheet) b.styleSheet.disabled || (b.styleSheet.cssText = a);
	else try {
		b.innerHTML = a
	} catch(c) {
		b.innerText = a
	}
}(),
function(a, b, c) {
	function d(a, b) {
		return n.race([p.waitForEvent(a, "animationend", !1), p.waitForEvent(a, m + "AnimationEnd", !1), p.delay(1.1 * b)])
	}

	function e(a) {
		function b(a) {
			return function() {
				var b, c, d = this,
					e = q;
				return d.aysnc = function() {
					b = o.defer(), e = b.promise
				}, d.done = function() {
					if(!b) throw new Error("call this.aysnc before use this.done");
					b.resolve(c)
				}, c = a.apply(d, arguments), c && c instanceof n ? c : e
			}
		}

		function c(a, b) {
			return n.all(a.map(function(a) {
				return a.call(b)
			}))
		}
		Object.defineProperty(this, "name", {
			value: a,
			enumerable: !0,
			editable: !1
		});
		var d = [],
			e = [];
		this.ready = function(a) {
			return "function" == typeof a ? (d.push(b(a)), this) : c(d, a)
		}, this.meanwhile = function(a) {
			return "function" == typeof a ? (e.push(b(a)), this) : c(e, a)
		}
	}

	function f(a, b) {
		Object.defineProperty(this, "name", {
			value: a,
			enumerable: !0,
			editable: !1
		});
		this.startup = new e("startup"), this.show = new e("show"), this.hide = new e("hide"), this.teardown = new e("teardown"), b && b.call(this)
	}

	function g(a, b) {
		var c = this,
			d = i.createElement("div");
		d.className = "view", d.style.display = "none", d.setAttribute("id", "view-" + a.id), d.setAttribute("name", b.name), b = Object.create(b), Object.defineProperties(b, {
			viewport: {
				value: d,
				enumerable: !0,
				editable: !1
			},
			persisted: {
				get: function() {
					return c.persisted
				},
				enumerable: !0,
				editable: !1
			},
			parameters: {
				value: Object.create(a.args),
				enumerable: !0,
				editable: !1
			}
		}), this.context = b, this.state = a, this.root = d
	}

	function h(a, b) {
		function c(c) {
			var e = a.getBoundingClientRect();
			b.fullscreen && (c.root.style.width = e.width + "px", c.root.style.height = e.height ? e.height + "px" : "auto"), c.root.parentNode || a.appendChild(c.root);
			var f = b.transition,
				g = b.transitionDuration || 400;
			return "boolean" == typeof f && (f = function(a, c) {
				return b.transition !== !0 || 0 === i.length ? (c.current.root.style.display = "none", c.next.root.style.display = "block", n.resolve()) : (c.current.root.setAttribute("animation", "push:current"), c.next.root.style.display = "block", c.next.root.setAttribute("animation", "push:next"), n.all([d(c.current.root, g), d(c.next.root, g)]).then(function() {
					c.current.root.removeAttribute("animation"), c.current.root.style.display = "none", c.next.root.removeAttribute("animation")
				}))
			}), p.serial([function() {
				return p.parallel([f("push", {
					current: m,
					next: c
				}), m.context.hide.meanwhile(m.context), c.context.show.meanwhile(c.context)])
			}, function() {
				return p.parallel([m.context.hide.ready(m.context), c.context.show.ready(c.context)])
			}, function() {
				return m = c, m.persisted = !0, i.push(m), m
			}])
		}

		function e(c) {
			var e = a.getBoundingClientRect();
			b.fullscreen && (c.root.style.width = e.width + "px", c.root.style.height = e.height ? e.height + "px" : "auto"), c.root.parentNode || a.appendChild(c.root);
			var f = b.transition,
				g = b.transitionDuration || 400;
			return "boolean" == typeof f && (f = function(a, c) {
				return b.transition !== !0 ? (c.current.root.style.display = "none", c.previous.root.style.display = "block", n.resolve()) : (c.current.root.setAttribute("animation", "pop:current"), c.previous.root.style.display = "block", c.previous.root.setAttribute("animation", "pop:previous"), n.all([d(c.current.root, g), d(c.previous.root, g)]).then(function() {
					c.current.root.removeAttribute("animation"), c.current.root.style.display = "none", c.previous.root.removeAttribute("animation")
				}))
			}), p.serial([function() {
				return p.parallel([f("pop", {
					current: m,
					previous: c
				}), m.context.hide.meanwhile(m.context), c.context.show.meanwhile(c.context)])
			}, function() {
				return p.parallel([m.context.hide.ready(m.context), c.context.show.ready(c.context)])
			}, function() {
				return m.context.teardown.meanwhile(m.context)
			}, function() {
				return m.context.teardown.ready(m.context)
			}, function() {
				return m.root.parentNode && m.root.parentNode.removeChild(m.root), m = c, m.persisted = !0, i.pop(), 0 === i.length && i.push(m), m
			}])
		}

		function h(c) {
			var e = a.getBoundingClientRect();
			b.fullscreen && (c.root.style.width = e.width + "px", c.root.style.height = e.height ? e.height + "px" : "auto"), c.root.parentNode || a.appendChild(c.root);
			var f = b.transition,
				g = b.transitionDuration || 400;
			return "boolean" == typeof f && (f = function(a, c) {
				return b.transition !== !0 ? (c.current.root.style.display = "none", c.next.root.style.display = "block", n.resolve()) : (c.current.root.setAttribute("animation", "push:current"), c.next.root.style.display = "block", c.next.root.setAttribute("animation", "push:next"), n.all([d(c.current.root, g), d(c.next.root, g)]).then(function() {
					c.current.root.removeAttribute("animation"), c.current.root.style.display = "none", c.next.root.removeAttribute("animation")
				}))
			}), p.serial([function() {
				return p.parallel([f("push", {
					current: m,
					next: c
				}), m.context.hide.meanwhile(m.context), c.context.show.meanwhile(c.context)])
			}, function() {
				return p.parallel([m.context.hide.ready(m.context), c.context.show.ready(c.context)])
			}, function() {
				return m.root.parentNode && m.root.parentNode.removeChild(m.root), m = c, m.persisted = !0, i.pop(), i.push(m), m
			}])
		}
		var i = [],
			j = {},
			k = Date.now() + "-" + ++r,
			l = document.createDocumentFragment();
		!a || a instanceof HTMLElement || (b = a, a = null), a || (a = document.createElement("div"), l.appendChild(a)), b = b || {}, a.setAttribute("data-ctrl-name", "pageview"), a.setAttribute("data-ctrl-id", k), b.fullscreen && (a.className = "fullscreen");
		var m = new g({
			id: 0,
			args: {}
		}, new f);
		this.push = function(a, b, d) {
			var e = {
					name: a,
					args: b || {},
					action: "push",
					id: d || (new Date).getTime()
				},
				f = this.getPage(a),
				h = new g(e, f);
			return p.serial([function() {
				return h.context.startup.ready(h.context)
			}, o.wrap(h), c])["catch"](function(a) {
				throw a
			})
		}, this.pop = function(a, b, c) {
			var d, f;
			if(1 === i.length) {
				var h = {
						name: a,
						args: b || {},
						action: "pop",
						id: c || (new Date).getTime()
					},
					j = this.getPage(a);
				d = new g(h, j), f = p.serial([function() {
					return d.context.startup.ready(d.context)
				}, o.wrap(d)])
			} else d = i[i.length - 2], f = n.resolve(d);
			return f.then(e)["catch"](function(a) {
				throw a
			})
		}, this.replace = function(a, b, c) {
			var d = {
					name: a,
					args: b || {},
					action: "replace",
					id: c || (new Date).getTime()
				},
				e = this.getPage(a),
				f = new g(d, e);
			return p.serial([function() {
				f.context.startup.ready(f.context)
			}, o.wrap(f), h])["catch"](function(a) {
				throw a
			})
		}, this.definePage = function(a, b) {
			return j[a] = new f(a, b)
		}, this.getPage = function(a) {
			return j[a]
		}, this.root = l, this.element = a
	}
	var i = a.document,
		j = a.navigator.userAgent,
		k = !!j.match(/Firefox/i),
		l = !!j.match(/IEMobile/i),
		m = k ? "Moz" : l ? "ms" : "webkit",
		n = b.promise.ES6Promise,
		o = b.promise.features,
		p = b.promise.utilities,
		q = (b.animation, n.resolve(!0)),
		r = 0;
	c.pageview = function(a, b) {
		return new h(a, b)
	}
}(window, window.lib, window.ctrl || (window.ctrl = {})),
function(a, b, c) {
	function d(a) {
		var b, c = {
				x: 0,
				y: 0
			},
			d = getComputedStyle(a)[l + "Transform"];
		return "none" !== d && (b = d.match(/^matrix3d\((?:[-\d.]+,\s*){12}([-\d.]+),\s*([-\d.]+)(?:,\s*[-\d.]+){2}\)/) || d.match(/^matrix\((?:[-\d.]+,\s*){4}([-\d.]+),\s*([-\d.]+)\)$/)) && (c.x = parseFloat(b[1]) || 0, c.y = parseFloat(b[2]) || 0), c
	}

	function e(a, b) {
		return a = parseFloat(a), b = parseFloat(b), 0 != a && (a += "px"), 0 != b && (b += "px"), n ? "translate3d(" + a + ", " + b + ", 0)" : "translate(" + a + ", " + b + ")"
	}

	function f(a) {
		return o.call(a)
	}

	function g(a, c) {
		function g(a, b) {
			var c = h.createEvent("HTMLEvents");
			if(c.initEvent(a, !1, !1), b)
				for(var d in b) c[d] = b[d];
			n.dispatchEvent(c)
		}

		function i(a) {
			for(; 0 > a;) a += r;
			for(; a >= r;) a -= r;
			return a
		}

		function j(a) {
			if(0 !== r) {
				var b, c, d = q.get(a);
				r > 1 && (b = q.get(a - 1), c = 2 === r ? q.getCloned(a + 1) : q.get(a + 1), d.style.left = -o + "px", b.style.left = -o - s + "px", c.style.left = -o + s + "px"), t = d.index, g("change", {
					prevItem: b,
					curItem: d,
					nextItem: c
				})
			}
		}
		var k = this,
			m = Date.now() + "-" + ++p,
			n = document.createDocumentFragment();
		1 !== arguments.length || arguments[0] instanceof HTMLElement || (c = arguments[0], a = null), a || (a = document.createElement("ul"), n.appendChild(a)), c = c || {}, a.setAttribute("data-ctrl-name", "carrousel"), a.setAttribute("data-ctrl-id", m), a.style.position = "relative", a.style[l + "Transform"] = e(0, 0);
		var o = 0,
			q = {},
			r = 0,
			s = c.step || a.getBoundingClientRect().width,
			t = 0;
		q.add = function(b) {
			var c = document.createElement("li");
			return c.style.display = "none", c.style["float"] = "left", c.index = r, "string" == typeof b ? c.innerHTML = b : b instanceof HTMLElement && c.appendChild(b), a.appendChild(c), Object.defineProperty(q, r + "", {
				get: function() {
					return c
				}
			}), r++, c
		}, q.get = function(a) {
			return q[i(a)]
		}, q.getCloned = function(b) {
			var b = i(b),
				c = a.querySelector('[cloned="cloned-' + b + '"]');
			return c || (c = q[b].cloneNode(!0), a.appendChild(c), c.setAttribute("cloned", "cloned-" + b), c.index = b), c
		}, q.slide = function(c) {
			if(0 !== r) {
				1 === r && (c = 0);
				var f = d(a).x,
					g = o + s * -c,
					h = g - f;
				if(0 !== h) {
					new b.animation(400, b.cubicbezier.ease, function(b, c) {
						a.style[l + "Transform"] = e(f + h * c, 0)
					}).play().then(function() {
						o = g, a.style[l + "Transform"] = e(g, 0), c && j(t + c)
					})
				}
			}
		}, q.next = function() {
			q.slide(1)
		}, q.prev = function() {
			q.slide(-1)
		}, f(a.querySelectorAll("li")).forEach(function(a) {
			a.style.position = "absolute", a.style.top = "0", a.style.left = r * s + "px", a.style["float"] = "left", a.index = r, Object.defineProperty(q, r + "", {
				get: function() {
					return a
				}
			}), r++
		}), Object.defineProperty(this, "items", {
			get: function() {
				return q
			}
		}), Object.defineProperty(q, "length", {
			get: function() {
				return r
			}
		}), Object.defineProperty(q, "index", {
			get: function() {
				return t
			}
		}), Object.defineProperty(q, "step", {
			get: function() {
				return s
			},
			set: function(a) {
				s = a
			}
		});
		var u = !1,
			v = !1,
			w = !1;
		this.play = function() {
			return u ? void(v || (v = setTimeout(function() {
				w = !0, q.next(), setTimeout(function() {
					w = !1
				}, 500), v = setTimeout(arguments.callee, 400 + z)
			}, 400 + z))) : (u = !0, j(0))
		}, this.stop = function() {
			v && (clearTimeout(v), setTimeout(function() {
				v = !1
			}, 500))
		};
		var x = !1,
			y = !1;
		Object.defineProperty(this, "autoplay", {
			get: function() {
				return x
			},
			set: function(a) {
				x = !!a, y && (clearTimeout(y), y = !1), x ? y = setTimeout(function() {
					k.play()
				}, 2e3) : k.stop()
			}
		}), this.autoplay = !!c.autoplay;
		var z = 1500;
		if(Object.defineProperty(this, "playInterval", {
				get: function() {
					return z
				},
				set: function(a) {
					z = a
				}
			}), this.playInterval = !!c.playInterval || 1500, c.useGesture) {
			var A, B = !1;
			a.addEventListener("panstart", function(a) {
				a.isVertical || B && w || (a.preventDefault(), a.stopPropagation(), x && k.stop(), A = 0, B = !0)
			}), a.addEventListener("pan", function(b) {
				!b.isVertical && B && (b.preventDefault(), b.stopPropagation(), A = b.displacementX, a.style[l + "Transform"] = e(o + A, 0))
			}), a.addEventListener("panend", function(a) {
				!a.isVertical && B && (a.preventDefault(), a.stopPropagation(), B = !1, a.isflick ? 0 > A ? q.next() : q.prev() : Math.abs(A) < s / 2 ? q.slide(0) : q.slide(0 > A ? 1 : -1), x && setTimeout(function() {
					k.play()
				}, 2e3))
			}, !1), a.addEventListener("flick", function(a) {
				a.isVertical || (a.preventDefault(), a.stopPropagation())
			})
		}
		this.addEventListener = function(a, b) {
			this.root.addEventListener(a, b, !1)
		}, this.removeEventListener = function(a, b) {
			this.root.removeEventListener(a, b, !1)
		}, this.root = n, this.element = a
	}
	var h = a.document,
		i = a.navigator.userAgent,
		j = !!i.match(/Firefox/i),
		k = !!i.match(/IEMobile/i),
		l = j ? "Moz" : k ? "ms" : "webkit",
		m = k ? "MSCSSMatrix" : "WebKitCSSMatrix",
		n = !!j || m in a && "m11" in new a[m],
		o = Array.prototype.slice,
		p = 0;
	c.carrousel = g
}(window, window.lib, window.ctrl || (window.ctrl = {})),
function() {
	var a = "[data-ctrl-name=carrousel]{position:relative;-webkit-transform:translateZ(1px);-ms-transform:translateZ(1px);transform:translateZ(1px)}",
		b = document.createElement("style");
	if(document.getElementsByTagName("head")[0].appendChild(b), b.styleSheet) b.styleSheet.disabled || (b.styleSheet.cssText = a);
	else try {
		b.innerHTML = a
	} catch(c) {
		b.innerText = a
	}
}(),
function(win, app) {
	function toast(a, b) {
		var c = q("toast");
		c && (c.innerText = a, c.style.display = "block", c.timeoutid && clearTimeout(c.timeoutid), b && (c.timeoutid = setTimeout(function() {
			c.style.display = "none"
		}, b)))
	}

	function q(a) {
		var b = document.getElementById("tpl-wrap");
		return b ? b.querySelector("#" + a) : void 0
	}

	function convertPlatform(str) {
		try {
			if(str.match(/\{[^{}]+\}/)) {
				var val = eval("(" + str + ")");
				return os.isIOS ? val[os.name] || val.iPhone : val[os.name]
			}
			return str.match(/^true|false$/) ? "true" === str : str.match(/^[\d\.\-\+]+$/) ? Number(str).toValue() : str
		} catch(e) {
			return str
		}
	}

	function parseTemplate(a) {
		if("string" != typeof a || !a) return a;
		for(var b, c = /\{\{([^{}]+)\}\}/; b = a.match(c);) a = a.replace(b[0], params[b[1]] || "");
		return a
	}

	function genTemplate(a) {
		a = a || "v1";
		var b = HTML[a] || HTML[a = "v1"],
			c = document.createElement("div");
		return c.setAttribute("id", "tpl-wrap"), c.className = "tpl-" + a, c.innerHTML = b, document.body.appendChild(c), c
	}

	function renderMobile(a) {
		if(a.banner) {
			var b = document.createElement("img");
			b.src = a.banner, q("banner").insertBefore(b, q("banner").childNodes[0])
		} else q("banner").className = "defimg";
		a.bg && (document.documentElement.style.height = "100%", document.body.style.backgroundColor = a.bg, document.body.style.height = "100%"), a.hideOpen !== !0 ? (a.banner || (q("open").className = "defbtn", q("open").innerText = a.openText), q("open").addEventListener("touchend", function() {
			app.jump.aplus({
				apuri: "callapp_manual"
			}), app.jump.call(a)
		}, !1)) : q("open").style.display = "none", a.hideDownload !== !0 ? (a.banner || (q("download").className = "defbtn", q("download").innerText = a.downText), q("download").addEventListener("touchend", function() {
			app.jump.aplus({
				apuri: "download_manual"
			}), app.jump.down(a)
		}, !1)) : q("download").style.display = "none"
	}

	function runMobile(a) {
		if(autoCalled !== location.href) {
			var b = 1e3;
			(!isTBApp && a.auto === !0 || isTBApp && a.callInApp === !0) && (b = 2500, app.jump.aplus({
				apuri: "callapp_auto"
			}), sessionStorage && sessionStorage.setItem("autoCalled", location.href), toast("正在打开客户端...", 1500), setTimeout(function() {
				app.jump.call(a)
			}, 1e3), setTimeout(function() {
				toast(a.downMsg || "未安装的亲，可点击下载", 1500)
			}, 1600)), a.autoDown === !0 && (app.jump.aplus({
				apuri: "download_auto"
			}), setTimeout(function() {
				app.jump.down(a)
			}, b))
		}
	}

	function renderTip(a, b, c) {
		var d = "v3",
			e = document.querySelector(".tpl-" + d);
		return e || (e = genTemplate(d)), e.querySelector(".box p").innerHTML = a || "正在打开手机淘宝...", e.querySelector(".box .down").innerHTML = b || "下载手机淘宝", c === !1 || "false" === c ? e.querySelector(".box .go").style.display = "none" : e.querySelector(".box .go").innerHTML = c || "继续访问", e
	}
	var params = lib.env.params,
		aliapp = lib.env.aliapp,
		os = lib.env.os,
		isTBApp = aliapp && "TB" === aliapp.appname,
		isWindVane = aliapp && aliapp.windvane,
		sessionStorage = window.sessionStorage,
		autoCalled = !1,
		defaultData = {
			banner: "",
			bg: "#ff7100",
			schema: '{iPhone:"taobao://m.taobao.com", Android:"taobao://m.taobao.com/"}',
			altschema: "",
			pcpage: "",
			auto: !1,
			callInApp: !1,
			openText: "打开手机淘宝",
			hideOpen: !1,
			downloadUrl: '{iPhone:"http://itunes.apple.com/cn/app/id387682726?mt=8", iPad:"https://itunes.apple.com/app/id438865278", Android:"//download.alicdn.com/wireless/taobao4android/latest/taobao4android_703248.apk"}',
			autoDown: !1,
			hideDownload: !1,
			downText: "下载手机淘宝",
			version: '{iPhone: "3.4.0", Android: "3.9.3", iPad: "2.3.3"}'
		},
		HTML = {
			v2: ['<div id="banner">', '<a id="open"></a>', '<a id="download"></a>', "</div>", '<div id="toast"></div>'].join(""),
			v3: ['<div class="box">', "<p>正在打开手机淘宝...</p>", "<div>", '<a class="down">下载手机淘宝</a>', '<a class="go">继续访问</a>', "</div>", "</div>"].join("")
		};
	if(sessionStorage) try {
		sessionStorage.setItem("@prviate", "false"), autoCalled = sessionStorage.getItem("autoCalled")
	} catch(e) {
		autoCalled = !1, sessionStorage = null
	}
	app.jump = function(a, b) {
		for(var c in a) a[c] = parseTemplate(convertPlatform(a[c]));
		for(var c in defaultData) a.hasOwnProperty(c) && "undefined" != typeof a[c] && "" !== a[c] || (a[c] = parseTemplate(convertPlatform(defaultData[c])));
		os.isIOS && a.downloadUrl.match(/\.apk(?:[?#].*)?/) && (a.downloadUrl = parseTemplate(convertPlatform(defaultData.downloadUrl))), os.isIOS || os.isAndroid ? (isTBApp && "Apad" === aliapp.platform && (a.callInApp = !1, a.autoDown = !1, a.hideOpen = !0, a.hideDownload = !0), isTBApp && aliapp.version.lt(a.version) && (a.hideOpen = !0, a.callInApp = !1), b.render && (genTemplate("v2"), renderMobile(a)), runMobile(a)) : (a.pcpage || (a.pcpage = "//huodong.m.taobao.com/hd/c4be.html?url=" + encodeURIComponent(location.href)), location.replace(a.pcpage))
	}, app.jump.aplus = function(a) {
		var b = {};
		a.apuri && (b.apuri = a.apuri), params.spm && (b.ttid = params.spm), params.ttid && (b.ttid = params.ttid), params.refpid && (b.refpid = params.refpid), params.actparam && (b.actparam = params.actparam), params.actname && (b.actname = params.actname), params.pid && (b.pid = params.pid), params.ad_id && (b.ad_id = params.ad_id), params.source_type && (b.sourcetype = params.source_type), params.ali_trackid && (b.ali_trackid = params.ali_trackid);
		var c = [];
		for(var d in b) c.push(d + "=" + b[d]);
		c = c.join("&"),
			function(a, b) {
				win.goldlog && win.goldlog.record ? win.goldlog.record("/sb.3.1", "", a, "H1673809") : 10 > b && setTimeout(arguments.callee, 200, a, ++b)
			}(c, 0)
	}, app.jump.call = function(a) {
		"string" == typeof a && (a = {
			schema: a
		}), !isTBApp && a.altschema ? app.jump.down({
			downloadUrl: a.altschema
		}) : a.schema.match(/^(http\:)?\/\/tb\.cn/) ? isTBApp ? lib.callapp.gotoPage(location.href) : (a.schema = "taobao:" + a.schema.replace(/^http\:/, ""), lib.callapp.gotoPage(a.schema, {
			point: !1,
			params: !0
		})) : lib.callapp.gotoPage(a.schema, {
			point: !isTBApp || isTBApp && (params.ttid || "qrcode" === params.origin),
			params: !0
		})
	}, app.jump.down = function(a) {
		"string" == typeof a && (a = {
			downloadUrl: a
		}), setTimeout(function() {
			lib.callapp.download(a.downloadUrl, {
				params: os.isAndroid
			})
		}, 1e3)
	}, app.jump.tip = function(a, b) {
		function c(a) {
			return a.preventDefault(), !1
		}

		function d() {
			g.style.display = "none", g.removeEventListener("click", e), document.removeEventListener("touchmove", c)
		}

		function e(a) {
			a.stopPropagation(), a.preventDefault();
			var c = a.target;
			return "down" === c.className ? b.onDown ? b.onDown(d) : (app.jump.aplus({
				apuri: "download_manual"
			}), app.jump.down({
				downloadUrl: b.downUrl || ""
			})) : "go" === c.className && (b.onGo ? b.onGo(d) : d()), !1
		}
		1 === arguments.length && "string" != typeof arguments[0] && (b = arguments[0], a = null), b = b || {}, a = a || b.schema;
		for(var f in b) b[f] = parseTemplate(convertPlatform(b[f]));
		os.isIOS && b.downUrl && b.downUrl.match(/\.apk(?:[?#].*)?/) && (b.downUrl = parseTemplate(convertPlatform(defaultData.downloadUrl)));
		var g = renderTip(b.text, b.downText, b.goText);
		return document.addEventListener("touchmove", c, !1), a && (app.jump.aplus({
			apuri: "callapp_auto"
		}), app.jump.call({
			schema: a
		})), setTimeout(function() {
			var c = document.body.getBoundingClientRect();
			g.querySelector(".box div").style.display = "none", g.style.width = window.innerWidth + "px", g.style.height = window.innerHeight + "px", g.style.top = -c.top + "px", g.style.display = "-webkit-box", setTimeout(function() {
				g.addEventListener("click", e, !1), g.querySelector(".box div").style.display = "", g.querySelector(".box p").innerHTML = b.altText || "如果您未安装手机淘宝，还可以："
			}, a ? 2e3 : 1)
		}, 50), g
	}, app.jump.isTBApp = function(a) {
		isWindVane ? isTBApp ? a(!0) : "" === aliapp.appname || "unkown" === aliapp.appname && lib.windvane ? lib.windvane.call("TBDeviceInfo", "getModelInfo", {}, function(b) {
			a(!0)
		}, function(b) {
			a(!1)
		}, 5e3) : a(!1) : a(!1)
	}, document.addEventListener("DOMContentLoaded", function(a) {
		app.jump.isTBApp(function(a) {
			isTBApp = a, window.pageInit && window.pageInit(isTBApp)
		})
	}, !1)
}(window, window.app || (window.app = {})),
function() {
	var a = 'html,body{padding:0;margin:0}#tpl-wrap{width:100%;left:0;top:0;right:0;height:100%;margin:0 auto;z-index:999999}[data-dpr] #tpl-wrap{width:10rem}.tpl-v2{display:-webkit-box;-webkit-box-pack:center}.tpl-v2 #banner{width:320px;height:416px;overflow:hidden;position:relative;vertical-align:middle}.tpl-v2 #banner.defimg{background-image:url(//img.alicdn.com/tps/i4/TB1ypd5GXXXXXXmXVXXs5hNNFXX-336-71.png),url(//img.alicdn.com/tps/i1/TB163X.GXXXXXXeXFXX2TjPMpXX-287-35.png),url(//img.alicdn.com/tps/i2/TB1WKd.GXXXXXcJXpXXeKFK0VXX-640-832.jpg);background-repeat:no-repeat,no-repeat,no-repeat;background-position:center 130px,center 187px,0 0;background-size:168px 36px,144px 18px,320px 416px}.tpl-v2 #banner img{width:100%;height:100%;position:relative;vertical-align:middle}.tpl-v2 #banner a{display:block;left:21px;width:280px;height:63px;position:absolute;border-radius:4px}.tpl-v2 #open{top:250px}.tpl-v2 #download{top:324px}.tpl-v2 #banner a.defbtn{background-color:#ff9400;color:#FFF;font-size:30px;text-align:center;line-height:63px;box-shadow:0 2px 0 rgba(0,0,0,.2)}.tpl-v2 #toast{display:none;position:absolute;left:0;top:0;width:100%;padding:12px;font-size:16px;text-align:center;background-color:rgba(0,0,0,.5);color:#FFF;box-sizing:border-box}[data-dpr="1"] .tpl-v2 #banner{width:10rem;height:13rem}[data-dpr="1"] .tpl-v2 #banner.defimg{background-position:center 4.06rem,center 5.84rem,0 0;background-size:5.25rem 1.125rem,4.5rem .5625rem,10rem 13rem}[data-dpr="1"] .tpl-v2 #banner a{left:.65625rem;width:8.75rem;height:1.96875rem;border-radius:8px}[data-dpr="1"] .tpl-v2 #open{top:7.8125rem}[data-dpr="1"] .tpl-v2 #download{top:10.125rem}[data-dpr="1"] .tpl-v2 #banner a.defbtn{line-height:1.96875rem}[data-dpr="1"] .tpl-v2 #banner a.defbtn{font-size:30px}[data-dpr="1"] .tpl-v2 #toast{padding:.1875rem;font-size:16px}[data-dpr="2"] .tpl-v2 #banner{width:10rem;height:13rem}[data-dpr="2"] .tpl-v2 #banner.defimg{background-position:center 4.06rem,center 5.84rem,0 0;background-size:5.25rem 1.125rem,4.5rem .5625rem,10rem 13rem}[data-dpr="2"] .tpl-v2 #banner a{left:.65625rem;width:8.75rem;height:1.96875rem;border-radius:8px}[data-dpr="2"] .tpl-v2 #open{top:7.8125rem}[data-dpr="2"] .tpl-v2 #download{top:10.125rem}[data-dpr="2"] .tpl-v2 #banner a.defbtn{line-height:1.96875rem}[data-dpr="2"] .tpl-v2 #banner a.defbtn{font-size:60px}[data-dpr="2"] .tpl-v2 #toast{padding:.1875rem;font-size:32px}[data-dpr="3"] .tpl-v2 #banner{width:10rem;height:13rem}[data-dpr="3"] .tpl-v2 #banner.defimg{background-position:center 4.06rem,center 5.84rem,0 0;background-size:5.25rem 1.125rem,4.5rem .5625rem,10rem 13rem}[data-dpr="3"] .tpl-v2 #banner a{left:.65625rem;width:8.75rem;height:1.96875rem;border-radius:8px}[data-dpr="3"] .tpl-v2 #open{top:7.8125rem}[data-dpr="3"] .tpl-v2 #download{top:10.125rem}[data-dpr="3"] .tpl-v2 #banner a.defbtn{line-height:1.96875rem}[data-dpr="3"] .tpl-v2 #banner a.defbtn{font-size:90px}[data-dpr="3"] .tpl-v2 #toast{padding:.1875rem;font-size:48px}.tpl-v3{position:absolute;background-color:rgba(0,0,0,.3);display:none;-webkit-box-pack:center;-webkit-box-align:center}.tpl-v3 .box{padding:10px 20px;background-color:#FFF;border-radius:4px}.tpl-v3 .box p{margin:0;padding:10px;text-align:center;font-size:14px;line-height:1.5em;color:#333}.tpl-v3 .box div{padding:10px;text-align:center}.tpl-v3 .down{display:inline-block;color:#FFF;font-size:14px;margin-right:10px;background:#ff5000;padding:5px 10px;border-radius:4px}.tpl-v3 .go{display:inline-block;color:#FFF;font-size:14px;background:#5f646e;padding:5px 10px;border-radius:4px}[data-dpr="1"] .tpl-v3 .box{padding:10px 20px;border-radius:4px}[data-dpr="1"] .tpl-v3 p{padding:10px;font-size:14px;line-height:1.5em}[data-dpr="1"] .tpl-v3 div{padding:10px}[data-dpr="1"] .tpl-v3 .down{font-size:14px;margin-right:10px;padding:5px 10px;border-radius:4px}[data-dpr="1"] .tpl-v3 .go{font-size:14px;padding:5px 10px;border-radius:4px}[data-dpr="2"] .tpl-v3 .box{padding:20px 40px;border-radius:8px}[data-dpr="2"] .tpl-v3 p{padding:20px;font-size:28px;line-height:1.5em}[data-dpr="2"] .tpl-v3 div{padding:20px}[data-dpr="2"] .tpl-v3 .down{font-size:28px;margin-right:20px;padding:10px 20px;border-radius:8px}[data-dpr="2"] .tpl-v3 .go{font-size:28px;padding:10px 20px;border-radius:8px}[data-dpr="3"] .tpl-v3 .box{padding:30px 60px;border-radius:12px}[data-dpr="3"] .tpl-v3 p{padding:30px;font-size:42px;line-height:1.5em}[data-dpr="3"] .tpl-v3 div{padding:30px}[data-dpr="3"] .tpl-v3 .down{font-size:42px;margin-right:30px;padding:15px 30px;border-radius:12px}[data-dpr="3"] .tpl-v3 .go{font-size:42px;padding:15px 30px;border-radius:12px}',
		b = document.createElement("style");
	if(document.getElementsByTagName("head")[0].appendChild(b), b.styleSheet) b.styleSheet.disabled || (b.styleSheet.cssText = a);
	else try {
		b.innerHTML = a
	} catch(c) {
		b.innerText = a
	}
}(),
function(a, b, c) {
	function d() {
		b.scroll.outputDebugLog && console.debug.apply(console, arguments)
	}

	function e(a) {
		var b = a.getBoundingClientRect();
		if(!b) {
			b = {}, b.width = a.offsetWidth, b.height = a.offsetHeight, b.left = a.offsetLeft, b.top = a.offsetTop;
			for(var c = a.offsetParent; c;) b.left += c.offsetLeft, b.top += c.offsetTop, c = c.offsetParent;
			b.right = b.left + b.width, b.bottom = b.top + b.height
		}
		return b
	}

	function f(a) {
		return 0 - a.options[a.axis + "PaddingTop"]
	}

	function g(a) {
		var b = e(a.element),
			c = e(a.viewport),
			d = f(a);
		if("y" === a.axis) var g = 0 - b.height + c.height;
		else var g = 0 - b.width + c.width;
		return Math.min(g + a.options[a.axis + "PaddingBottom"], d)
	}

	function h(a, b) {
		return b > a.minScrollOffset ? b - a.minScrollOffset : b < a.maxScrollOffset ? b - a.maxScrollOffset : void 0
	}

	function i(a, b) {
		return b > a.minScrollOffset ? b = a.minScrollOffset : b < a.maxScrollOffset && (b = a.maxScrollOffset), b
	}

	function j(a, b, c) {
		d(a.element.scrollId, b, c);
		var e = p.createEvent("HTMLEvents");
		if(e.initEvent(b, !1, !0), e.scrollObj = a, c)
			for(var f in c) e[f] = c[f];
		a.element.dispatchEvent(e), a.viewport.dispatchEvent(e)
	}

	function k(a) {
		var b, c = {
				x: 0,
				y: 0
			},
			d = getComputedStyle(a.element)[y + "Transform"];
		return "none" !== d && (b = d.match(/^matrix3d\((?:[-\d.]+,\s*){12}([-\d.]+),\s*([-\d.]+)(?:,\s*[-\d.]+){2}\)/) || d.match(/^matrix\((?:[-\d.]+,\s*){4}([-\d.]+),\s*([-\d.]+)\)$/)) && (c.x = parseFloat(b[1]) || 0, c.y = parseFloat(b[2]) || 0), c
	}

	function l(a, b) {
		return a = parseFloat(a), b = parseFloat(b), 0 != a && (a += "px"), 0 != b && (b += "px"), A ? "translate3d(" + a + ", " + b + ", 0)" : "translate(" + a + ", " + b + ")"
	}

	function m(a, b, c) {
		"" === b && "" === c ? a.element.style[y + "Transition"] = "" : a.element.style[y + "Transition"] = x + "transform " + b + " " + c + " 0s"
	}

	function n(a, b) {
		var c = 0,
			d = 0;
		"object" == typeof b ? (c = b.x, d = b.y) : "y" === a.axis ? d = b : c = b, a.element.style[y + "Transform"] = l(c, d)
	}

	function o(a, c) {
		function l(a) {
			return F || L ? (a.preventDefault(), a.stopPropagation(), !1) : !0
		}

		function o(a) {
			F || L || setTimeout(function() {
				var b = document.createEvent("HTMLEvents");
				b.initEvent("niceclick", !0, !0), a.target.dispatchEvent(b)
			}, 300)
		}

		function p(a, c) {
			I = null, clearTimeout(J), J = setTimeout(function() {
				I && (I = null, b.animation.requestFrame(a))
			}, c || 400), I = a
		}

		function q(a) {
			if(!E.enabled) return !1;
			if("undefined" != typeof a.isVertical) {
				if(!("y" === E.axis && a.isVertical || "x" === E.axis && !a.isVertical)) return !1;
				a.stopPropagation()
			}
			return !0
		}

		function t(a) {
			if(q(a))
				if(L && D(), c.useFrameAnimation) H && H.stop(), H = null;
				else {
					var b = k(E);
					n(E, b), m(E, "", ""), I = null, clearTimeout(J)
				}
		}

		function w(a) {
			if(q(a)) {
				var d = k(E)[E.axis],
					e = h(E, d);
				if(e) {
					var f = i(E, d);
					if(c.useFrameAnimation) {
						var g = f - d;
						H = new b.animation(400, b.cubicbezier.ease, function(a, b) {
							var c = (d + g * b).toFixed(2);
							n(E, c), j(E, "scrolling")
						}), H.play().then(D)
					} else {
						var l = f.toFixed(0);
						m(E, "0.4s", "ease"), n(E, l), p(D, 400), b.animation.requestFrame(function() {
							L && E.enabled && (j(E, "scrolling"), b.animation.requestFrame(arguments.callee))
						})
					}
					e > 0 ? j(E, "y" === E.axis ? "pulldownend" : "pullrightend") : 0 > e && j(E, "y" === E.axis ? "pullupend" : "pullleftend")
				} else L && D()
			}
		}

		function x(a) {
			q(a) && (E.transformOffset = k(E), E.minScrollOffset = f(E), E.maxScrollOffset = g(E), K = 2.5, N = !0, L = !0, M = !1, j(E, "scrollstart"), O = a["displacement" + E.axis.toUpperCase()])
		}

		function z(a) {
			if(q(a)) {
				var b = a["displacement" + E.axis.toUpperCase()];
				if(Math.abs(b - O) < 5) return void a.stopPropagation();
				O = b;
				var c = E.transformOffset[E.axis] + b;
				c > E.minScrollOffset ? (c = E.minScrollOffset + (c - E.minScrollOffset) / K, K *= 1.003) : c < E.maxScrollOffset && (c = E.maxScrollOffset - (E.maxScrollOffset - c) / K, K *= 1.003), K > 4 && (K = 4);
				var d = h(E, c);
				d && (j(E, d > 0 ? "y" === E.axis ? "pulldown" : "pullright" : "y" === E.axis ? "pullup" : "pullleft", {
					boundaryOffset: Math.abs(d)
				}), E.options.noBounce && (c = i(E, c))), n(E, c.toFixed(2)), j(E, "scrolling")
			}
		}

		function A(a) {
			q(a) && a.isflick && C(a)
		}

		function C(a) {
			N = !0;
			var e, f, g, i, l, o, q, r, s, t, v, w, x, y, z, A, B;
			i = k(E)[E.axis];
			var C = h(E, i);
			if(!C) {
				e = a["velocity" + E.axis.toUpperCase()];
				var F = 2,
					G = .0015;
				c.inertia && u[c.inertia] && (F = u[c.inertia][0], G = u[c.inertia][1]), e > F && (e = F), -F > e && (e = -F), f = G * (e / Math.abs(e)), o = new b.motion({
					v: e,
					a: -f
				}), g = o.t, l = i + o.s;
				var I = h(E, l);
				if(I) {
					d("惯性计算超出了边缘", I), q = e, r = f, I > 0 ? (t = E.minScrollOffset, w = 1) : (t = E.maxScrollOffset, w = -1), v = new b.motion({
						v: w * q,
						a: -w * r,
						s: Math.abs(t - i)
					}), s = v.t;
					var J = v.generateCubicBezier();
					x = q - r * s, y = .03 * (x / Math.abs(x)), B = new b.motion({
						v: x,
						a: -y
					}), z = B.t, A = t + B.s;
					B.generateCubicBezier();
					if(c.noBounce)
						if(d("没有回弹效果"), i !== t)
							if(c.useFrameAnimation) {
								var K = t - i,
									O = b.cubicbezier(J[0][0], J[0][1], J[1][0], J[1][1]);
								H = new b.animation(s.toFixed(0), O, function(a, b) {
									var c = i + K * b;
									k(E, c.toFixed(2)), j(E, "scrolling", {
										afterFlick: !0
									})
								}), H.play().then(D)
							} else {
								var P = t.toFixed(0);
								m(E, (s / 1e3).toFixed(2) + "s", "cubic-bezier(" + J + ")"), n(E, P), p(D, 1e3 * (s / 1e3).toFixed(2))
							}
					else D();
					else if(i !== A)
						if(d("惯性滚动", "s=" + A.toFixed(0), "t=" + ((s + z) / 1e3).toFixed(2)), c.useFrameAnimation) {
							var K = A - i,
								O = b.cubicbezier.easeOut;
							H = new b.animation((s + z).toFixed(0), O, function(a, b) {
								var c = i + K * b;
								n(E, c.toFixed(2)), j(E, "scrolling", {
									afterFlick: !0
								})
							}), H.play().then(function() {
								if(E.enabled) {
									var a = t - A,
										c = b.cubicbezier.ease;
									H = new b.animation(400, c, function(b, c) {
										var d = A + a * c;
										n(E, d.toFixed(2)), j(E, "scrolling", {
											afterFlick: !0
										})
									}), H.play().then(D)
								}
							})
						} else {
							var P = A.toFixed(0);
							m(E, ((s + z) / 1e3).toFixed(2) + "s", "ease-out"), n(E, P), p(function(a) {
								if(E.enabled)
									if(d("惯性回弹", "s=" + t.toFixed(0), "t=400"), A !== t) {
										var b = t.toFixed(0);
										m(E, "0.4s", "ease"), n(E, b), p(D, 400)
									} else D()
							}, 1e3 * ((s + z) / 1e3).toFixed(2))
						}
					else D()
				} else {
					d("惯性计算没有超出边缘");
					var Q = o.generateCubicBezier();
					if(c.useFrameAnimation) {
						var K = l - i,
							O = b.cubicbezier(Q[0][0], Q[0][1], Q[1][0], Q[1][1]);
						H = new b.animation(g.toFixed(0), O, function(a, b) {
							var c = (i + K * b).toFixed(2);
							n(E, c), j(E, "scrolling", {
								afterFlick: !0
							})
						}), H.play().then(D)
					} else {
						var P = l.toFixed(0);
						m(E, (g / 1e3).toFixed(2) + "s", "cubic-bezier(" + Q + ")"), n(E, P), p(D, 1e3 * (g / 1e3).toFixed(2))
					}
				}
				M = !0, c.useFrameAnimation || b.animation.requestFrame(function() {
					L && M && E.enabled && (j(E, "scrolling", {
						afterFlick: !0
					}), b.animation.requestFrame(arguments.callee))
				})
			}
		}

		function D() {
			E.enabled && (N = !1, setTimeout(function() {
				!N && L && (L = !1, M = !1, c.useFrameAnimation ? (H && H.stop(), H = null) : m(E, "", ""), j(E, "scrollend"))
			}, 50))
		}
		var E = this;
		if(c = c || {}, c.noBounce = !!c.noBounce, c.padding = c.padding || {}, null == c.isPrevent ? c.isPrevent = !0 : c.isPrevent = !!c.isPrevent, null == c.isFixScrollendClick ? c.isFixScrollendClick = !0 : c.isFixScrollendClick = !!c.isFixScrollendClick, c.padding ? (c.yPaddingTop = -c.padding.top || 0, c.yPaddingBottom = -c.padding.bottom || 0, c.xPaddingTop = -c.padding.left || 0, c.xPaddingBottom = -c.padding.right || 0) : (c.yPaddingTop = 0, c.yPaddingBottom = 0, c.xPaddingTop = 0, c.xPaddingBottom = 0), c.direction = c.direction || "y", c.inertia = c.inertia || "normal", this.options = c, E.axis = c.direction, this.element = a, this.viewport = a.parentNode, this.plugins = {}, this.element.scrollId = setTimeout(function() {
				r[E.element.scrollId + ""] = E
			}, 1), this.viewport.addEventListener("touchstart", t, !1), this.viewport.addEventListener("touchend", w, !1), this.viewport.addEventListener("touchcancel", w, !1), this.viewport.addEventListener("panstart", x, !1), this.viewport.addEventListener("pan", z, !1), this.viewport.addEventListener("panend", A, !1), c.isPrevent && (this.viewport.addEventListener("touchstart", function(a) {
				B = !0
			}, !1), E.viewport.addEventListener("touchend", function(a) {
				B = !1
			}, !1)), c.isFixScrollendClick) {
			var F, G;
			this.viewport.addEventListener("scrolling", function() {
				F = !0, G && clearTimeout(G), G = setTimeout(function(a) {
					F = !1
				}, 400)
			}, !1), this.viewport.addEventListener("click", l, !1), this.viewport.addEventListener("tap", o, !1)
		}
		if(c.useFrameAnimation) {
			var H;
			Object.defineProperty(this, "animation", {
				get: function() {
					return H
				}
			})
		} else {
			var I, J = 0;
			a.addEventListener(v ? "transitionend" : y + "TransitionEnd", function(a) {
				if(I) {
					var c = I;
					I = null, clearTimeout(J), b.animation.requestFrame(function() {
						c(a)
					})
				}
			}, !1)
		}
		var K, L, M, N;
		Object.defineProperty(this, "isScrolling", {
			get: function() {
				return !!L
			}
		});
		var O, P = {
			init: function() {
				return this.enable(), this.refresh(), this.scrollTo(0), this
			},
			enable: function() {
				return this.enabled = !0, this
			},
			disable: function() {
				var a = this.element;
				return this.enabled = !1, this.options.useFrameAnimation ? H && H.stop() : b.animation.requestFrame(function() {
					a.style[y + "Transform"] = getComputedStyle(a)[y + "Transform"]
				}), this
			},
			getScrollWidth: function() {
				return e(this.element).width
			},
			getScrollHeight: function() {
				return e(this.element).height
			},
			getScrollLeft: function() {
				return -k(this).x - this.options.xPaddingTop
			},
			getScrollTop: function() {
				return -k(this).y - this.options.yPaddingTop
			},
			getMaxScrollLeft: function() {
				return -E.maxScrollOffset - this.options.xPaddingTop
			},
			getMaxScrollLeft: function() {
				return -E.maxScrollOffset - this.options.xPaddingTop
			},
			getMaxScrollTop: function() {
				return -E.maxScrollOffset - this.options.yPaddingTop
			},
			getBoundaryOffset: function() {
				return Math.abs(h(this, k(this)[this.axis]) || 0)
			},
			refresh: function() {
				var a = this.element,
					b = "y" === this.axis,
					c = b ? "height" : "width";
				if(null != this.options[c]) a.style[c] = this.options[c] + "px";
				else if(this.options.useElementRect) a.style[c] = "auto", a.style[c] = e(a)[c] + "px";
				else if(a.childElementCount > 0) {
					var d, h, i = a.firstElementChild,
						l = a.lastElementChild;
					if(document.createRange && !this.options.ignoreOverflow && (d = document.createRange(), d.selectNodeContents(a), h = e(d)), h) a.style[c] = h[c] + "px";
					else {
						for(; i && 0 === e(i)[c] && i.nextElementSibling;) i = i.nextElementSibling;
						for(; l && l !== i && 0 === e(l)[c] && l.previousElementSibling;) l = l.previousElementSibling;
						a.style[c] = e(l)[b ? "bottom" : "right"] - e(i)[b ? "top" : "left"] + "px"
					}
				}
				return this.transformOffset = k(this), this.minScrollOffset = f(this), this.maxScrollOffset = g(this), this.scrollTo(-this.transformOffset[this.axis] - this.options[this.axis + "PaddingTop"]), j(this, "contentrefresh"), this
			},
			offset: function(a) {
				var b = e(this.element),
					c = e(a);
				if("y" === this.axis) {
					var d = {
						top: c.top - b.top - this.options.yPaddingTop,
						left: c.left - b.left,
						right: b.right - c.right,
						width: c.width,
						height: c.height
					};
					d.bottom = d.top + d.height
				} else {
					var d = {
						top: c.top - b.top,
						bottom: b.bottom - c.bottom,
						left: c.left - b.left - this.options.xPaddingTop,
						width: c.width,
						height: c.height
					};
					d.right = d.left + d.width
				}
				return d
			},
			getRect: function(a) {
				var b = e(this.viewport),
					c = e(a);
				if("y" === this.axis) {
					var d = {
						top: c.top - b.top,
						left: c.left - b.left,
						right: b.right - c.right,
						width: c.width,
						height: c.height
					};
					d.bottom = d.top + d.height
				} else {
					var d = {
						top: c.top - b.top,
						bottom: b.bottom - c.bottom,
						left: c.left - b.left,
						width: c.width,
						height: c.height
					};
					d.right = d.left + d.width
				}
				return d
			},
			isInView: function(a) {
				var b = this.getRect(this.viewport),
					c = this.getRect(a);
				return "y" === this.axis ? b.top < c.bottom && b.bottom > c.top : b.left < c.right && b.right > c.left
			},
			scrollTo: function(a, c) {
				var d = this;
				this.element;
				if(a = -a - this.options[this.axis + "PaddingTop"], a = i(this, a), L = !0, c === !0)
					if(this.options.useFrameAnimation) {
						var e = k(d)[this.axis],
							f = a - e;
						H = new b.animation(400, b.cubicbezier.ease, function(a, b) {
							var c = (e + f * b).toFixed(2);
							n(d, c), j(d, "scrolling")
						}), H.play().then(D)
					} else m(d, "0.4s", "ease"), n(d, a), p(D, 400), b.animation.requestFrame(function() {
						L && d.enabled && (j(d, "scrolling"), b.animation.requestFrame(arguments.callee))
					});
				else this.options.useFrameAnimation || m(d, "", ""), n(d, a), D();
				return this
			},
			scrollToElement: function(a, b) {
				var c = this.offset(a);
				return c = c["y" === this.axis ? "top" : "left"], this.scrollTo(c, b)
			},
			getViewWidth: function() {
				return e(this.viewport).width
			},
			getViewHeight: function() {
				return e(this.viewport).height
			},
			addPulldownHandler: function(a) {
				var b = this;
				return this.element.addEventListener("pulldownend", function(c) {
					b.disable(), a.call(b, c, function() {
						b.scrollTo(0, !0), b.refresh(), b.enable()
					})
				}, !1), this
			},
			addPullupHandler: function(a) {
				var b = this;
				return this.element.addEventListener("pullupend", function(c) {
					b.disable(), a.call(b, c, function() {
						b.scrollTo(b.getScrollHeight(), !0), b.refresh(), b.enable()
					})
				}, !1), this
			},
			addScrollstartHandler: function(a) {
				var b = this;
				return this.element.addEventListener("scrollstart", function(c) {
					a.call(b, c)
				}, !1), this
			},
			addScrollingHandler: function(a) {
				var b = this;
				return this.element.addEventListener("scrolling", function(c) {
					a.call(b, c)
				}, !1), this
			},
			addScrollendHandler: function(a) {
				var b = this;
				return this.element.addEventListener("scrollend", function(c) {
					a.call(b, c)
				}, !1), this
			},
			addContentrenfreshHandler: function(a) {
				var b = this;
				return this.element.addEventListener("contentrefresh", function(c) {
					a.call(b, c)
				}, !1), this
			},
			addEventListener: function(a, b, c) {
				var d = this;
				return this.element.addEventListener(a, function(a) {
					b.call(d, a)
				}, !!c), this
			},
			removeEventListener: function(a, b) {
				var c = this;
				return this.element.removeEventListener(a, function(a) {
					b.call(c, a)
				}), this
			},
			enablePlugin: function(a, b) {
				var c = s[a];
				return c && !this.plugins[a] && (this.plugins[a] = !0, b = b || {}, c.call(this, a, b)), this
			}
		};
		for(var Q in P) this[Q] = P[Q];
		delete P
	}
	var p = a.document,
		q = a.navigator.userAgent,
		r = {},
		s = {},
		t = a.dpr || (a.navigator.userAgent.match(/iPhone|iPad|iPod/) ? document.documentElement.clientWidth / a.screen.availWidth : 1),
		u = {
			normal: [2 * t, .0015 * t],
			slow: [1.5 * t, .003 * t],
			veryslow: [1.5 * t, .005 * t]
		},
		v = !!q.match(/Firefox/i),
		w = !!q.match(/IEMobile/i),
		x = v ? "-moz-" : w ? "-ms-" : "-webkit-",
		y = v ? "Moz" : w ? "ms" : "webkit",
		z = w ? "MSCSSMatrix" : "WebKitCSSMatrix",
		A = !!v || z in a && "m11" in new a[z],
		B = !1;
	p.addEventListener("touchmove", function(a) {
		return B ? (a.preventDefault(), !1) : !0
	}, !1), b.scroll = function(a, c) {
		if(1 === arguments.length && !(arguments[0] instanceof HTMLElement))
			if(c = arguments[0], c.scrollElement) a = c.scrollElement;
			else {
				if(!c.scrollWrap) throw new Error("no scroll element");
				a = c.scrollWrap.firstElementChild
			}
		if(!a.parentNode) throw new Error("wrong dom tree");
		if(c && c.direction && ["x", "y"].indexOf(c.direction) < 0) throw new Error("wrong direction");
		var d;
		return d = c.downgrade === !0 && b.scroll.downgrade ? b.scroll.downgrade(a, c) : a.scrollId ? r[a.scrollId] : new o(a, c)
	}, b.scroll.plugin = function(a, b) {
		return b ? (a = a.split(","), void a.forEach(function(a) {
			s[a] = b
		})) : s[a]
	}
}(window, window.lib || (window.lib = {})),
function(a, b, c) {
	function d(a, b) {
		if("string" == typeof b) a.innerHTML = b;
		else if(b instanceof HTMLElement) a.innerHTML = "", a.appendChild(b);
		else if(b instanceof Array || b instanceof NodeList) {
			var c = n.createDocumentFragment();
			Array.prototype.slice.call(b).forEach(function(a) {
				c.appendChild(a)
			}), a.appendChild(c)
		}
	}

	function e(a) {
		var b, c = {
				x: 0,
				y: 0
			},
			d = getComputedStyle(a)[s + "Transform"];
		return "none" !== d && (b = d.match(/^matrix3d\((?:[-\d.]+,\s*){12}([-\d.]+),\s*([-\d.]+)(?:,\s*[-\d.]+){2}\)/) || d.match(/^matrix\((?:[-\d.]+,\s*){4}([-\d.]+),\s*([-\d.]+)\)$/)) && (c.x = parseFloat(b[1]) || 0, c.y = parseFloat(b[2]) || 0), c
	}

	function f(e, f) {
		var j = this,
			o = Date.now() + "-" + ++u;
		1 !== arguments.length || arguments[0] instanceof HTMLElement || (f = arguments[0], e = null), f = f || {}, e || (e = n.createElement("div"));
		var p = e.firstElementChild || n.createElement("div"),
			q = p.firstElementChild || n.createElement("div");
		p.parentNode || e.appendChild(p), q.parentNode || p.appendChild(q), e.setAttribute("data-ctrl-name", "scrollview"), e.setAttribute("data-ctrl-id", o), e.setAttribute("data-direction", "x" !== f.direction ? "vertical" : "horizontal"), p.className.indexOf("scroll-wrap") < 0 && (p.className = p.className.split(" ").concat("scroll-wrap").join(" ").replace(/^\s+/, "")), q.className.indexOf("scroll-content") < 0 && (q.className = q.className.split(" ").concat("scroll-content").join(" ").replace(/^\s+/, "")), f.scrollElement = q, f.scrollWrap = p;
		var r = new b.scroll(f);
		this.scrollWrap = p, this.scrollElement = q, this.scroll = r, this.root = this.element = e;
		for(var s in r) void
		function(a) {
			"function" == typeof r[a] ? j[a] = function() {
				return r[a].apply(r, arguments)
			} : j[a] || Object.defineProperty(j, a, {
				get: function() {
					return r[a]
				},
				set: function(b) {
					r[a] = b
				}
			})
		}(s);
		Object.defineProperty(this, "forceRepaint", {
				value: new g(this)
			}), Object.defineProperty(this, "fixed", {
				value: new h(this)
			}), Object.defineProperty(this, "lazyload", {
				value: new i(this)
			}), Object.defineProperty(this, "sticky", {
				value: new k(this)
			}), Object.defineProperty(this, "pullRefresh", {
				value: new l(this)
			}),
			function() {
				if("y" === r.axis) {
					var b = a.dpr ? 60 * a.dpr : 60,
						d = "下拉即可刷新...",
						e = "正在刷新...",
						f = new c.loading;
					f.arrowDirection = "down", f.mode = "draw", f.bgcolor = "#FFF", f.text = d;
					var g = f.element;
					j.pullRefresh.element = g, j.pullRefresh.height = b, j.pullRefresh.processingHandler = function(a) {
						"draw" !== f.mode && (f.mode = "draw"), f.text !== d && (f.text = d), f.per = Math.round(a / b * 100)
					}, j.pullRefresh.refreshHandler = function(a) {
						var b = !1;
						f.text = e, f.mode = "spin", j.pullRefresh.handler && j.pullRefresh.handler(function() {
							b || (b = !0, a())
						})
					}
				}
			}(), Object.defineProperty(this, "pullUpdate", {
				value: new m(this)
			}),
			function() {
				if("y" === r.axis) {
					var b = a.dpr ? 60 * a.dpr : 60,
						d = "上拉加载更多...",
						e = "正在加载...",
						f = new c.loading;
					f.arrowDirection = "up", f.mode = "draw", f.bgcolor = "#FFF", f.text = d;
					var g = f.element;
					j.pullUpdate.element = g, j.pullUpdate.height = b, j.pullUpdate.processingHandler = function(a) {
						"draw" !== f.mode && (f.mode = "draw"), f.text !== d && (f.text = d), f.per = Math.round(a / b * 100)
					}, j.pullUpdate.updateHandler = function(a) {
						var b = !1;
						f.text = e, f.mode = "spin", j.pullUpdate.handler && j.pullUpdate.handler(function() {
							b || (b = !0, a())
						})
					}
				}
			}(), Object.defineProperty(this, "content", {
				get: function() {
					return Array.prototype.slice.call(q.children)
				},
				set: function(a) {
					d(q, a)
				}
			})
	}

	function g(a) {
		var b = a.scroll,
			c = n.createElement("div");
		c.className = "force-repaint", c.style.cssText = "position: absolute; top: 0; left: 0; width: 0; height: 0; font-size: 0; opacity: 1;", a.root.appendChild(c);
		var d = !1;
		Object.defineProperty(this, "enable", {
			get: function() {
				return d
			},
			set: function(a) {
				d = a
			}
		}, !1), Object.defineProperty(this, "element", {
			value: c
		}), b.addScrollingHandler(function() {
			d && (c.style.opacity = Math.abs(parseInt(c.style.opacity) - 1) + "")
		})
	}

	function h(a) {
		var b, c, e, f, g = this,
			h = a.scroll,
			i = (n.createDocumentFragment(), !1);
		Object.defineProperty(g, "enable", {
			get: function() {
				return i
			},
			set: function(d) {
				i = d, i ? (b && (b.parentNode || a.root.insertBefore(b, a.scrollWrap), b.style.display = "block"), c && (c.parentNode || a.root.appendChild(c), c.style.display = "block"), e && (e.parentNode || a.root.insertBefore(e, a.scrollWrap), e.style.display = "block"), f && (f.parentNode || a.root.appendChild(f), f.style.display = "block")) : (topFiexElement && (b.style.display = "none"), c && (c.style.display = "none"), e && (e.style.display = "none"), f && (f.style.display = "none"))
			}
		}), "y" === h.axis ? (b = n.createElement("div"), b.className = "top-fixed", b.style.cssText = "left: 0; top: 0; width: 100%;", Object.defineProperty(g, "topElement", {
			get: function() {
				return b
			},
			set: function(a) {
				d(b, a)
			}
		}), Object.defineProperty(g, "topOffset", {
			set: function(a) {
				b.style.top = a + "px"
			}
		}), c = this.bottomFixedElement = n.createElement("div"), c.className = "bottom-fxied", c.style.cssText = "left: 0; bottom: 0; width: 100%;", Object.defineProperty(g, "bottomElement", {
			get: function() {
				return c
			},
			set: function(a) {
				d(c, a)
			}
		}), Object.defineProperty(g, "bottomOffset", {
			set: function(a) {
				c.style.top = a + "px"
			}
		})) : (e = this.leftFixedElement = n.createElement("div"), e.className = "left-fixed", e.style.cssText = "top: 0; left: 0; height: 100%;", Object.defineProperty(g, "leftElement", {
			get: function() {
				return e
			},
			set: function(a) {
				d(e, a)
			}
		}), Object.defineProperty(g, "leftOffset", {
			set: function(a) {
				e.style.left = a + "px"
			}
		}), f = this.rightFixedElement = n.createElement("div"), f.className = "right-fxied", f.style.cssText = "top: 0; right: 0; height: 100%;", Object.defineProperty(g, "rightElement", {
			get: function() {
				return f
			},
			set: function(a) {
				d(f, a)
			}
		}), Object.defineProperty(g, "rightOffset", {
			set: function(a) {
				f.style.right = a + "px"
			}
		}))
	}

	function i(a) {
		function c() {
			if(!m) {
				if(m = !0, i > k && j.length > 0) {
					var a = j.shift();
					k++;
					var b = new Image;
					b.onload = b.onreadystatechange = function() {
						l[a] !== !0 && (l[a].forEach(function(b) {
							b && b(a)
						}), l[a] = !0, k--), c()
					}, b.src = a, c()
				}
				m = !1
			}
		}

		function d(a, b) {
			return l[a] === !0 ? b(a) : (l[a] ? l[a].push(b) : (l[a] = [b], j.push(a)), void c())
		}

		function e() {
			if(f) {
				var a = Array.prototype.slice.call(h.element.querySelectorAll('.lazy, *[lazyload="true"]'));
				a.filter(function(a) {
					return h.isInView(a)
				}).forEach(function(a) {
					var b, c;
					"IMG" === a.tagName.toUpperCase() ? (b = [a], c = []) : (b = Array.prototype.slice.call(a.querySelectorAll("img[data-src]")), c = Array.prototype.slice.call(a.querySelectorAll("*[data-image]")), a.hasAttribute("data-image") && c.push(a)), b.forEach(function(a) {
						var b = a.getAttribute("data-src");
						b && (a.removeAttribute("data-src"), d(b, function() {
							a.src = b
						}))
					}), c.forEach(function(a) {
						var b = a.getAttribute("data-image");
						b && (a.removeAttribute("data-image"), d(b, function() {
							a.style.backgroundImage = "url(" + b + ")"
						}))
					}), n && n(a), a.className = a.className.split(" ").filter(function(a) {
						return "lazy" !== a
					}).join(" "), a.removeAttribute("lazyload")
				})
			}
		}
		var f, g = this,
			h = a.scroll,
			i = 4,
			j = [],
			k = 0,
			l = {},
			m = !1;
		Object.defineProperty(g, "enable", {
			get: function() {
				return f
			},
			set: function(a) {
				f = a
			}
		});
		var n;
		Object.defineProperty(g, "handler", {
			get: function() {
				return n
			},
			set: function(a) {
				n = a
			}
		});
		var o;
		Object.defineProperty(g, "realtime", {
			get: function() {
				return o
			},
			set: function(a) {
				o = !!a
			}
		}), h.addScrollingHandler(function() {
			o && e()
		}), h.addScrollendHandler(function() {
			e()
		}), h.addContentrenfreshHandler(function() {
			e()
		}), b.animation.requestFrame(function() {
			e()
		}), a.checkLazyload = e
	}

	function k(a) {
		function b() {
			if(e && (Array.prototype.slice.call(c.element.querySelectorAll('.sticky, *[sticky="true"]')).forEach(function(a) {
					a.className = a.className.split(" ").filter(function(a) {
						return "sticky" !== a
					}).join(" "), a.setAttribute("sticky", "initialized");
					for(var b = c.offset(a), d = b.top, e = 0; e <= f.length; e++)
						if(!f[e] || d < f[e].top) {
							f.splice(e, 0, {
								top: d,
								el: a,
								pined: a.firstElementChild
							});
							break
						}
				}), f.length)) {
				for(var a = "y" === c.axis ? c.getScrollTop() : c.getScrollLeft(), b = 0; b < f.length && !(a < f[b]["y" === c.axis ? "top" : "left"]); b++);
				for(j = b - 1, j > -1 && (f[j].pined.parentNode && f[j].pined.parentNode !== f[j].el || (d.innerHTML = "", d.appendChild(f[j].pined))), j++; j < f.length; j++) f[j].pined.parentNode !== f[j].el && f[j].el.appendChild(f[j].pined)
			}
		}
		var c = a.scroll,
			d = n.createElement("div");
		d.className = "sticky", d.style.cssText = "z-index:9; position: absolute; left: 0; top: 0;" + r + "transform: translateZ(9px);", "y" === c.axis ? d.style.width = "100%" : d.style.height = "100%", Object.defineProperty(this, "offset", {
			set: function(a) {
				"y" === c.axis ? d.style.top = a + "px" : d.style.left = a + "px"
			}
		});
		var e;
		Object.defineProperty(this, "enable", {
			get: function() {
				return e
			},
			set: function(a) {
				e = !!a, e ? (d.parentNode || c.viewport.appendChild(d), d.style.display = "block") : d.style.display = "none"
			}
		});
		var f = [];
		c.addScrollingHandler(b), c.addScrollendHandler(b), a.checkSticky = b
	}

	function l(a) {
		function c(a) {
			var c = e(h)[g.axis],
				d = 0 - c,
				f = e(g.element)[g.axis],
				i = ("y" === g.axis ? k : j) - f;
			new b.animation(400, b.cubicbezier.ease, function(a, b) {
				h.style[s + "Transform"] = "translate" + g.axis.toUpperCase() + "(" + (c + d * b) + "px) translateZ(9px)", g.element.style[s + "Transform"] = "translate" + g.axis.toUpperCase() + "(" + (f + i * b) + "px)"
			}).play().then(a)
		}

		function f(a) {
			var c = e(h)[g.axis],
				d = -("y" === g.axis ? k : j) - c,
				f = e(g.element)[g.axis],
				i = -f;
			new b.animation(400, b.cubicbezier.ease, function(a, b) {
				h.style[s + "Transform"] = "translate" + g.axis.toUpperCase() + "(" + (c + d * b) + "px) translateZ(9px)", g.element.style[s + "Transform"] = "translate" + g.axis.toUpperCase() + "(" + (f + i * b) + "px)"
			}).play().then(a)
		}
		var g = a.scroll,
			h = n.createElement("div");
		h.className = "refresh", h.style.cssText = "display: none; position: absolute; top: 0; left: 0; width: 0; height: 0; " + r + "transform: translateZ(9px)", "y" === g.axis ? h.style.width = "100%" : h.style.height = "100%";
		var i = !1;
		Object.defineProperty(this, "enable", {
			get: function() {
				return i
			},
			set: function(a) {
				i = a, i ? (h.parentNode || g.viewport.appendChild(h), h.style.display = "block") : h.style.display = "none"
			}
		}), Object.defineProperty(this, "element", {
			get: function() {
				return h
			},
			set: function(a) {
				d(h, a)
			}
		}), Object.defineProperty(this, "offset", {
			set: function(a) {
				"y" === g.axis ? h.style.top = a + "px" : h.style.left = a + "px"
			}
		});
		var j = 0;
		Object.defineProperty(this, "width", {
			set: function(a) {
				j = a, "x" === g.axis && (h.style.width = j + "px", h.style[s + "Transform"] = "translateX(" + -j + "px) translateZ(9px)")
			}
		});
		var k = 0;
		Object.defineProperty(this, "height", {
			set: function(a) {
				k = a, "y" === g.axis && (h.style.height = k + "px", h.style[s + "Transform"] = "translateY(" + -k + "px) translateZ(9px)")
			}
		});
		var l;
		Object.defineProperty(this, "processingHandler", {
			get: function() {
				return l
			},
			set: function(a) {
				l = a
			}
		});
		var m;
		Object.defineProperty(this, "refreshHandler", {
			get: function() {
				return m
			},
			set: function(a) {
				m = a
			}
		});
		var o;
		g.addScrollingHandler(function(a) {
			if(i && !o) {
				var b = "y" === g.axis ? g.getScrollTop() : g.getScrollLeft();
				b = Math.min(b, 0), "y" === g.axis ? h.style[s + "Transform"] = "translateY(" + -(k + b) + "px) translateZ(9px)" : h.style[s + "Transform"] = "translateX(" + -(j + b) + "px) translateZ(9px)", 0 > b && l && l(-b)
			}
		}), g.addEventListener("pulldownend", function(a) {
			if(i && !o) {
				o = !0;
				var b = g.getBoundaryOffset();
				b > ("y" === g.axis ? k : j) ? (g.disable(), c(function() {
					m ? m(function() {
						f(function() {
							g.refresh(), g.enable(), o = !1
						})
					}) : f(function() {
						g.refresh(), g.enable(), o = !1
					})
				})) : f(function() {
					o = !1
				})
			}
		}, !1)
	}

	function m(a) {
		var b = a.scroll,
			c = n.createElement("div");
		c.className = "update", c.style.cssText = "display: none; position: absolute; bottom: 0; right: 0; width: 0; height: 0; " + r + "transform: translateZ(9px)", "y" === b.axis ? c.style.width = "100%" : c.style.height = "100%";
		var e = !1;
		Object.defineProperty(this, "enable", {
			get: function() {
				return e
			},
			set: function(a) {
				e = a, e ? (c.parentNode || b.viewport.appendChild(c), c.style.display = "block") : c.style.display = "none"
			}
		}), Object.defineProperty(this, "element", {
			get: function() {
				return c
			},
			set: function(a) {
				d(c, a)
			}
		}), Object.defineProperty(this, "offset", {
			set: function(a) {
				"y" === b.axis ? c.style.bottom = a + "px" : c.style.right = a + "px"
			}
		});
		var f = 0;
		Object.defineProperty(this, "width", {
			set: function(a) {
				f = a, "x" === b.axis && (c.style.width = f + "px", c.style[s + "Transform"] = "translateX(" + f + "px) translateZ(9px)")
			}
		});
		var g = 0;
		Object.defineProperty(this, "height", {
			set: function(a) {
				g = a, "y" === b.axis && (c.style.height = g + "px", c.style[s + "Transform"] = "translateY(" + g + "px) translateZ(9px)")
			}
		});
		var h;
		Object.defineProperty(this, "processingHandler", {
			get: function() {
				return h
			},
			set: function(a) {
				h = a
			}
		});
		var i;
		Object.defineProperty(this, "updateHandler", {
			get: function() {
				return i
			},
			set: function(a) {
				i = a
			}
		});
		var j;
		b.addScrollingHandler(function(a) {
			if(e) {
				var d = "y" === b.axis ? b.getScrollTop() : b.getScrollLeft(),
					k = "y" === b.axis ? b.getMaxScrollTop() : b.getMaxScrollLeft();
				d = Math.max(d, k), "y" === b.axis ? c.style[s + "Transform"] = "translateY(" + (k - d + g) + "px) translateZ(9px)" : c.style[s + "Transform"] = "translateX(" + (k - d + f) + "px) translateZ(9px)", j || (d - k < .7 * ("y" === b.axis ? g : f) ? h && h(d - k) : i && (j = !0, i(function() {
					"y" === b.axis ? c.style[s + "Transform"] = "translateY(" + g + "px) translateZ(9px)" : c.style[s + "Transform"] = "translateX(" + f + "px) translateZ(9px)", b.refresh(), j = !1
				})))
			}
		})
	}
	var n = a.document,
		o = a.navigator.userAgent,
		p = !!o.match(/Firefox/i),
		q = !!o.match(/IEMobile/i),
		r = p ? "-moz-" : q ? "-ms-" : "-webkit-",
		s = p ? "Moz" : q ? "ms" : "webkit",
		t = q ? "MSCSSMatrix" : "WebKitCSSMatrix",
		u = (!!p || t in a && "m11" in new a[t], 0);
	c.scrollview = function(a, b) {
		return new f(a, b)
	}
}(window, window.lib, window.ctrl || (window.ctrl = {})),
function() {
	var a = "[data-ctrl-name=scrollview]{width:100%;height:100%;overflow:hidden;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}[data-ctrl-name=scrollview][data-direction=vertical]{-webkit-box-orient:vertical;-webkit-box-direction:normal;-moz-box-orient:vertical;-moz-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}[data-ctrl-name=scrollview][data-direction=horizontal]{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-moz-box-orient:horizontal;-moz-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}[data-ctrl-name=scrollview] .scroll-wrap{display:block;-webkit-box-flex:1;-moz-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;overflow:hidden;position:relative}[data-ctrl-name=scrollview][data-direction=vertical] .scroll-wrap,[data-ctrl-name=scrollview][data-direction=vertical] .scroll-content{width:100%}[data-ctrl-name=scrollview][data-direction=horizontal] .scroll-wrap,[data-ctrl-name=scrollview][data-direction=horizontal] .scroll-content{height:100%}[data-ctrl-name=scrollview] .scroll-content{position:absolute}",
		b = document.createElement("style");
	if(document.getElementsByTagName("head")[0].appendChild(b), b.styleSheet) b.styleSheet.disabled || (b.styleSheet.cssText = a);
	else try {
		b.innerHTML = a
	} catch(c) {
		b.innerText = a
	}
}(),
function(a, b, c, d) {
	var e = a.document,
		f = e.documentElement,
		g = e.querySelector('meta[name="App-Config"]'),
		h = {};
	if(g)
		for(var i, j = g.getAttribute("content"), k = /([^=,]+)\=([^=,]+)[,\s]*/g; i = k.exec(j);) {
			var l = i[1],
				m = i[2];
			("yes" === m || "no" === m) && (m = !("yes" !== m)), h[l] = m
		}
	if(a.appConfig)
		for(var l in a.appConfig) h[l] = a.appConfig[l];
	var n = (b.promise.ES6Promise, b.promise, b.promise.utilities),
		o = new b.navigation,
		p = new c.pageview(e.body, {
			fullscreen: !!h.fullscreen,
			transition: !!h.transition
		});
	h.fullscreen && e.addEventListener("touchmove", function(a) {
		a.preventDefault()
	}, !1), d.config = h, d.pageview = p, d.navigation = o, d.definePage = function() {
		return p.definePage.apply(p, arguments)
	}, d.getPage = function() {
		return p.getPage.apply(p, arguments)
	}, d.pushPage = function() {
		return o.push.apply(o, arguments)
	}, d.popPage = function() {
		return o.pop.apply(o, arguments)
	}, d.replacePage = function() {
		return o.replace.apply(o, arguments)
	}, o.delegate(function(a) {
		var b = o.state.name,
			c = o.state.args,
			d = o.state.id;
		switch(a) {
			case "navigation:start":
			case "navigation:push":
				p.push(b, c, d);
				break;
			case "navigation:pop":
				p.pop(b, c, d);
				break;
			case "navigation:replace":
				p.replace(b, c, d)
		}
	}), n.pageLoad().then(function() {
		h.fullscreen ? (f.style.width = "100%", f.style.height = "100%", f.style.overflow = "hidden") : (f.style.width = "100%", f.style.overflowX = "hidden"), o.start({
			defaultPath: h.defaultPath || "index",
			defaultArgs: JSON.parse(h.defaultArgs || "{}"),
			useHistoryState: !!h.useHistoryState
		})
	})
}(window, window.lib, window.ctrl, window.app || (window.app = {})),
function(a, b, c, d) {
	function e(a) {
		var b = k.querySelector("head") || k.querySelector("body") || k.firstElementChild || k.documentElement;
		b.appendChild(a)
	}

	function f(a) {
		return new l(function(b, c) {
			var d = k.createElement("link");
			d.href = a, d.type = "text/css", d.rel = "stylesheet", e(d), b(d)
		})
	}

	function g(a) {
		return new l(function(b, c) {
			var d = k.createElement("script");
			d.src = a, d.async = !0, d.onload = d.onreadystatechange = function() {
				d.isloaded || (d.isloaded = !0, b(d))
			}, e(d)
		})
	}

	function h(a) {
		if(a.match(/\.css(?:[?#].*)?$/i)) {
			var b = f(a);
			return o[a] = b, b
		}
		if(a.match(/\.js(?:[?#].*)?$/i)) {
			var c = g(a);
			return o[a] = c, c
		}
	}

	function i(a) {
		var b = /\/(\d+\.\d+\.\d+)\//,
			c = a.match(b);
		if(c) {
			var d, e = c[1],
				f = a.replace(e, "{{version}}").replace(/^https?\:/, "");
			if(p[f]) {
				e = e.split("."), d = p[f].split(".");
				for(var g = 0; g < e.length || g < d.length; g++) {
					var h = parseInt(e[g], 10),
						i = parseInt(d[g], 10);
					if(isNaN(h) && (h = 0), isNaN(i) && (i = 0), i > h) return -1;
					if(h > i) return p[f] = e.join("."), 1
				}
				return 0
			}
			return p[f] = e, NaN
		}
		return NaN
	}

	function j(a, b) {
		var c;
		return o[a] && b.force !== !0 ? (console.warn("将被载入的资源（" + a + "）已存在，当前资源放弃载入"), !1) : isNaN(c = i(a)) || b.compareVersion === !1 ? !0 : c > 0 ? (console.warn("将被载入的资源（" + a + "）已存在较低版本，当前版本会被载入，并可能覆盖较低版本资源"), !0) : 0 > c ? (console.warn("将被载入的资源（" + a + "）已存在更高版本，当前版本放弃载入"), !1) : (console.warn("将被载入的资源（" + a + "）已存在，当前资源放弃载入"), !1)
	}
	var k = a.document,
		l = b.promise.ES6Promise,
		m = b.promise,
		n = b.promise.utilities,
		o = {};
	d.loadResource = function() {
		var a;
		return a = arguments[0] instanceof Array ? arguments[0].slice(0) : Array.prototype.slice.call(arguments), n.pageLoad().then(function() {
			var b = [],
				c = {};
			return "object" == typeof a[a.length - 1] && (c = a.pop()), a.forEach(function(a) {
				o[a] && c.force !== !0 ? console.info("将被载入的资源（" + a + "）已存在，此资源忽略") : b.push(h(a))
			}), b.length > 1 ? l.all(b) : 1 === b.length ? b[0] : l.resolve(!0)
		})
	};
	var p = {};
	d.loadCDNResource = function() {
		var a;
		return a = arguments[0] instanceof Array ? arguments[0].slice(0) : Array.prototype.slice.call(arguments), n.pageLoad().then(function() {
			var b = [],
				c = {};
			return "object" == typeof a[a.length - 1] && (c = a.pop()), a.forEach(function(a) {
				if(a.indexOf("??") > 0) {
					a = a.split("??");
					var d = a[0];
					d.match(/\/$/) || (d += "/");
					var e = a[1].split(","),
						f = m.defer();
					e = e.map(function(a) {
						a.match(/^\//) && (a = a.substr(1));
						var b = d + a;
						return j(b, c) ? (o[b] = f.promise, a) : void 0
					}).filter(function(a) {
						return !!a
					}), e.length ? (a = d + "??" + e.join(","), b.push(h(a).then(function(a) {
						return f.resolve(), a
					}))) : f.resolve()
				} else j(a, c) && b.push(h(a))
			}), b.length > 1 ? l.all(b) : 1 === b.length ? b[0] : l.resolve(!0)
		})
	}
}(window, window.lib, window.ctrl, window.app || (window.app = {})),
function(a, b) {
	var c = a.createElement("style");
	if(a.getElementsByTagName("head")[0].appendChild(c), c.styleSheet) c.styleSheet.disabled || (c.styleSheet.cssText = b);
	else try {
		c.innerHTML = b
	} catch(d) {
		c.innerText = b
	}
}(document, ""),
function(a) {
	function b(d) {
		if(c[d]) return c[d].exports;
		var e = c[d] = {
			exports: {},
			id: d,
			loaded: !1
		};
		return a[d].call(e.exports, e, e.exports, b), e.loaded = !0, e.exports
	}
	var c = {};
	return b.m = a, b.c = c, b.p = "", b(0)
}([function(a, b, c) {
	"use strict";
	c(1), c(5), c(25), c(26), c(27), c(28), c(29), c(30), c(31), c(32), c(34), c(35), c(36), c(38)
}, function(a, b, c) {
	var d = c(2);
	"string" == typeof d && (d = [
		[a.id, d, ""]
	]);
	c(4)(d, {});
	d.locals && (a.exports = d.locals)
}, function(a, b, c) {
	b = a.exports = c(3)(), b.push([a.id, '@font-face {\n  font-family: \'h5index-iconfont\';\n  src: url(data:;base64,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ILAFJiAuRyNHI2EjPDgtsDEssAAWILAJI0IgICBGI0ewACsjYTgtsDIssAAWsAMlsAIlRyNHI2GwAFRYLiA8IyEbsAIlsAIlRyNHI2EgsAUlsAQlRyNHI2GwBiWwBSVJsAIlYbABRWMjIFhiGyFZY7ABRWJgIy4jICA8ijgjIVktsDMssAAWILAJQyAuRyNHI2EgYLAgYGawgGIjICA8ijgtsDQsIyAuRrACJUZSWCA8WS6xJAEUKy2wNSwjIC5GsAIlRlBYIDxZLrEkARQrLbA2LCMgLkawAiVGUlggPFkjIC5GsAIlRlBYIDxZLrEkARQrLbA3LLAuKyMgLkawAiVGUlggPFkusSQBFCstsDgssC8riiAgPLAEI0KKOCMgLkawAiVGUlggPFkusSQBFCuwBEMusCQrLbA5LLAAFrAEJbAEJiAuRyNHI2GwBkUrIyA8IC4jOLEkARQrLbA6LLEJBCVCsAAWsAQlsAQlIC5HI0cjYSCwBCNCsAZFKyCwYFBYILBAUVizAiADIBuzAiYDGllCQiMgR7AEQ7CAYmAgsAArIIqKYSCwAkNgZCOwA0NhZFBYsAJDYRuwA0NgWbADJbCAYmGwAiVGYTgjIDwjOBshICBGI0ewACsjYTghWbEkARQrLbA7LLAuKy6xJAEUKy2wPCywLyshIyAgPLAEI0IjOLEkARQrsARDLrAkKy2wPSywABUgR7AAI0KyAAEBFRQTLrAqKi2wPiywABUgR7AAI0KyAAEBFRQTLrAqKi2wPyyxAAEUE7ArKi2wQCywLSotsEEssAAWRSMgLiBGiiNhOLEkARQrLbBCLLAJI0KwQSstsEMssgAAOistsEQssgABOistsEUssgEAOistsEYssgEBOistsEcssgAAOystsEgssgABOystsEkssgEAOystsEossgEBOystsEsssgAANystsEwssgABNystsE0ssgEANystsE4ssgEBNystsE8ssgAAOSstsFAssgABOSstsFEssgEAOSstsFIssgEBOSstsFMssgAAPCstsFQssgABPCstsFUssgEAPCstsFYssgEBPCstsFcssgAAOCstsFgssgABOCstsFkssgEAOCstsFossgEBOCstsFsssDArLrEkARQrLbBcLLAwK7A0Ky2wXSywMCuwNSstsF4ssAAWsDArsDYrLbBfLLAxKy6xJAEUKy2wYCywMSuwNCstsGEssDErsDUrLbBiLLAxK7A2Ky2wYyywMisusSQBFCstsGQssDIrsDQrLbBlLLAyK7A1Ky2wZiywMiuwNistsGcssDMrLrEkARQrLbBoLLAzK7A0Ky2waSywMyuwNSstsGossDMrsDYrLbBrLCuwCGWwAyRQeLABFTAtAABLuADIUlixAQGOWbkIAAgAYyCwASNEILADI3CwDkUgIEu4AA5RS7AGU1pYsDQbsChZYGYgilVYsAIlYbABRWMjYrACI0SzCgkFBCuzCgsFBCuzDg8FBCtZsgQoCUVSRLMKDQYEK7EGAUSxJAGIUViwQIhYsQYDRLEmAYhRWLgEAIhYsQYBRFlZWVm4Af+FsASNsQUARAAAAA==) format(\'truetype\');\n  /* iOS 4.1- */\n}\nbody > .view[name="index"] {\n  background-color: #EEE;\n}\nbody > .view[name="index"] .none {\n  display: none;\n}\nbody > .view[name="index"] a:hover {\n  text-decoration: none;\n}\nbody > .view[name="index"] .vertical-view {\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -moz-box-orient: vertical;\n  -moz-box-direction: normal;\n  -webkit-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column;\n}\nbody > .view[name="index"] .horizontal-view {\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -moz-box-orient: horizontal;\n  -moz-box-direction: normal;\n  -webkit-flex-direction: row;\n  -ms-flex-direction: row;\n  flex-direction: row;\n}\nbody > .view[name="index"] header {\n  width: 100%;\n  background-color: #FE5400;\n}\nbody > .view[name="index"] header .header-wrap {\n  width: 100%;\n  box-sizing: border-box;\n  padding-right: 0.2rem;\n  padding-left: 37px;\n  padding-top: 6px;\n  padding-bottom: 6px;\n  background-image: url(data:image/png;base64,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);\n  background-repeat: no-repeat;\n  background-size: 27px 20px;\n  background-position: 4.5px center;\n}\nbody > .view[name="index"] header .header-wrap #search-placeholder {\n  width: 100%;\n  box-sizing: border-box;\n  background-color: #B52600;\n  text-align: center;\n  border-radius: 4px;\n}\nbody > .view[name="index"] header .header-wrap #search-placeholder span {\n  height: 25px;\n  line-height: 25px;\n  font-size: 13px;\n  display: inline-block;\n  color: #F0E0DC;\n}\nbody > .view[name="index"] header .header-wrap #search-placeholder span:before {\n  font-family: \'h5index-iconfont\';\n  font-style: normal;\n  -webkit-font-smoothing: antialiased;\n  -webkit-text-stroke-width: 0.2px;\n  -moz-osx-font-smoothing: grayscale;\n  display: inline-block;\n  color: #FFF;\n  content: \'\\E600\';\n  font-size: 15px;\n  margin-right: 5px;\n}\nbody > .view[name="index"] [data-dpr="1"] header .header-wrap {\n  padding-left: 37px;\n  padding-top: 6px;\n  padding-bottom: 6px;\n  background-size: 27px 20px;\n  background-position: 4.5px center;\n}\nbody > .view[name="index"] [data-dpr="1"] header .header-wrap #search-placeholder {\n  border-radius: 4px;\n}\nbody > .view[name="index"] [data-dpr="1"] header .header-wrap #search-placeholder span {\n  height: 25px;\n  line-height: 25px;\n  font-size: 13px;\n}\nbody > .view[name="index"] [data-dpr="1"] header .header-wrap #search-placeholder span:before {\n  font-size: 15px;\n  margin-right: 5px;\n}\nbody > .view[name="index"] [data-dpr="2"] header .header-wrap {\n  padding-left: 74px;\n  padding-top: 12px;\n  padding-bottom: 12px;\n  background-size: 54px 40px;\n  background-position: 9px center;\n}\nbody > .view[name="index"] [data-dpr="2"] header .header-wrap #search-placeholder {\n  border-radius: 8px;\n}\nbody > .view[name="index"] [data-dpr="2"] header .header-wrap #search-placeholder span {\n  height: 50px;\n  line-height: 50px;\n  font-size: 26px;\n}\nbody > .view[name="index"] [data-dpr="2"] header .header-wrap #search-placeholder span:before {\n  font-size: 30px;\n  margin-right: 10px;\n}\nbody > .view[name="index"] [data-dpr="3"] header .header-wrap {\n  padding-left: 111px;\n  padding-top: 18px;\n  padding-bottom: 18px;\n  background-size: 81px 60px;\n  background-position: 13.5px center;\n}\nbody > .view[name="index"] [data-dpr="3"] header .header-wrap #search-placeholder {\n  border-radius: 12px;\n}\nbody > .view[name="index"] [data-dpr="3"] header .header-wrap #search-placeholder span {\n  height: 75px;\n  line-height: 75px;\n  font-size: 39px;\n}\nbody > .view[name="index"] [data-dpr="3"] header .header-wrap #search-placeholder span:before {\n  font-size: 45px;\n  margin-right: 15px;\n}\nbody > .view[name="index"] footer {\n  border-top: 1px solid #E7E7E7;\n  border-bottom: 1px solid #F8F8F8;\n  padding-top: 4px;\n  width: 100%;\n  height: 38px;\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n  -moz-box-pack: justify;\n  -ms-flex-pack: justify;\n  -webkit-box-align: center;\n  -moz-box-align: justify;\n  -ms-flex-align: center;\n  justify-content: space-between;\n  align-content: center;\n  background-color: #FFF;\n}\nbody > .view[name="index"] footer a {\n  color: #5D656B;\n  -webkit-box-flex: 1;\n  -moz-box-flex: 1;\n  -webkit-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  text-align: center;\n  box-sizing: border-box;\n  display: block;\n  font-size: 10px;\n}\nbody > .view[name="index"] footer a span {\n  display: block;\n  font-family: \'h5index-iconfont\';\n  font-style: normal;\n  -webkit-font-smoothing: antialiased;\n  -webkit-text-stroke-width: 0.2px;\n  -moz-osx-font-smoothing: grayscale;\n  width: 100%;\n  font-size: 22px;\n  color: #5D656B;\n  top: 0;\n  left: 0;\n}\nbody > .view[name="index"] [data-dpr="1"] footer {\n  padding-top: 4px;\n  height: 38px;\n}\nbody > .view[name="index"] [data-dpr="1"] footer a {\n  font-size: 10px;\n}\nbody > .view[name="index"] [data-dpr="1"] footer a span {\n  font-size: 22px;\n}\nbody > .view[name="index"] [data-dpr="2"] footer {\n  padding-top: 8px;\n  height: 76px;\n}\nbody > .view[name="index"] [data-dpr="2"] footer a {\n  font-size: 20px;\n}\nbody > .view[name="index"] [data-dpr="2"] footer a span {\n  font-size: 44px;\n}\nbody > .view[name="index"] [data-dpr="3"] footer {\n  padding-top: 12px;\n  height: 114px;\n}\nbody > .view[name="index"] [data-dpr="3"] footer a {\n  font-size: 30px;\n}\nbody > .view[name="index"] [data-dpr="3"] footer a span {\n  font-size: 66px;\n}\nbody > .view[name="index"] #content {\n  position: relative;\n  width: 10rem;\n  margin: 0 auto;\n}\nbody > .view[name="index"] #content > section > div {\n  width: 100%;\n  overflow: hidden;\n}\nbody > .view[name="index"] #content > section > div.invisible {\n  display: none;\n}\nbody > .view[name="index"] [data-template-name="t122016boarder"] {\n  background-color: #fc4423!important;\n}\nbody > .view[name="index"] [data-template-name="t122016biaoqian"] {\n  background-color: #fc4423!important;\n}\nbody > .view[name="index"] [data-template-name="t122016biaoqian"] > div > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(1) {\n  border-radius: 1rem;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\nbody > .view[name="index"] [data-template-name="t122016huichang"] {\n  background-color: #fc4423!important;\n}\nbody > .view[name="index"] [data-template-name="t122016huichang"] > div {\n  height: 3.03rem !important;\n}\nbody > .view[name="index"] [data-template-name="t122016huichang"] > div > div:nth-child(2) > div > div:nth-child(3) {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\nbody > .view[name="index"] [data-template-name="t122016huichang"] > div > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(1) {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\nbody > .view[name="index"] [data-template-name="t122016huodong"] {\n  background-color: #fc4423!important;\n}\nbody > .view[name="index"] [data-template-name="t122016huodong"] > div {\n  height: 3.012rem!important;\n}\nbody > .view[name="index"] [data-template-name="t122016renqun"] {\n  background-color: #fc4423!important;\n}\nbody > .view[name="index"] [data-template-name="t122016renqun"] > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) {\n  border-radius: 1.493rem;\n}\nbody > .view[name="index"] [data-template-name="t122016renqun"] > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(1) {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\nbody > .view[name="index"] [data-template-name="t122016renqun"] > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) {\n  margin-top: 2.5rem !important;\n  background-size: 100% 100% !important;\n}\nbody > .view[name="index"] [data-template-name="t122016renqun"] > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(3) {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  margin-top: 2.65rem !important;\n}\nbody > .view[name="index"] [data-template-name="t112016header"] > div {\n  height: 0.948rem!important;\n  background-color: #fc4423!important;\n  background-color: #ff2439!important;\n}\nbody > .view[name="index"] [data-template-name="tdarentao5"] > div > div:nth-child(3) > div > div > div:nth-child(2) {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  display: block;\n  overflow: hidden;\n}\nbody > .view[name="index"] [data-template-name=guessTitle] > div > div:nth-child(1) > div:nth-child(1) {\n  margin-left: 3.7rem;\n}\nbody > .view[name="index"] [data-template-name="rushbuy41"] > div > div {\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n}\nbody > .view[name="index"] [data-template-name="rushbuy41"] > div > div > div {\n  display: block;\n}\nbody > .view[name="index"] [data-template-name=tcheap5] > div > div:nth-child(3) > div:nth-child(1) {\n  height: 2.896rem!important;\n}\nbody > .view[name="index"] [data-template-name=tcheap5] > div > div:nth-child(3) > div:nth-child(3) {\n  height: 2.896rem!important;\n}\nbody > .view[name="index"] [data-template-name="trushbuy5"] > div > div > div > div:first-child {\n  width: 3.7rem!important;\n}\nbody > .view[name="index"] [data-template-name="trushbuy5"] > div > div > div:nth-child(1) {\n  height: 5.0rem!important;\n}\nbody > .view[name="index"] [data-template-name="trushbuy5"] > div > div > div:nth-child(3) > div:nth-child(3) > div:nth-child(1) {\n  height: 2.68rem!important;\n}\nbody > .view[name="index"] [data-template-name="trushbuy5"] > div > div > div:nth-child(3) > div:nth-child(3) > div:nth-child(3) {\n  height: 2.68rem!important;\n}\nbody > .view[name="index"] [data-template-name="woyao"] > div > div > div:nth-child(3) {\n  margin-left: 0!important;\n  padding-left: 2.375rem;\n}\nbody > .view[name="index"] [data-template-name="titemtzm"],\nbody > .view[name="index"] [data-template-name="titem"],\nbody > .view[name="index"] [data-template-name="single_titem"] {\n  height: auto!important;\n}\nbody > .view[name="index"] [data-template-name="titemtzm"] > div,\nbody > .view[name="index"] [data-template-name="titem"] > div,\nbody > .view[name="index"] [data-template-name="single_titem"] > div {\n  display: -webkit-box !important;\n  display: -moz-box !important;\n  display: -ms-flexbox !important;\n  display: flex!important;\n  -webkit-box-pack: justify;\n  -ms-flex-pack: justify;\n  -moz-box-pack: justify;\n  justify-content: space-between;\n  height: auto!important;\n}\nbody > .view[name="index"] [data-template-name="titemtzm"] > div > div,\nbody > .view[name="index"] [data-template-name="titem"] > div > div,\nbody > .view[name="index"] [data-template-name="single_titem"] > div > div {\n  display: block!important;\n  -webkit-box-flex: 1;\n  -moz-box-flex: 1;\n  -webkit-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  width: auto!important;\n  margin: 0!important;\n  height: 6.672rem!important;\n  margin-bottom: 4px!important;\n}\nbody > .view[name="index"] [data-template-name="titemtzm"] > div > div:nth-child(1),\nbody > .view[name="index"] [data-template-name="titem"] > div > div:nth-child(1),\nbody > .view[name="index"] [data-template-name="single_titem"] > div > div:nth-child(1) {\n  margin-right: 2px!important;\n}\nbody > .view[name="index"] [data-template-name="titemtzm"] > div > div:nth-child(2),\nbody > .view[name="index"] [data-template-name="titem"] > div > div:nth-child(2),\nbody > .view[name="index"] [data-template-name="single_titem"] > div > div:nth-child(2) {\n  margin-left: 2px!important;\n}\nbody > .view[name="index"] [data-template-name="titemtzm"] > div > div > div,\nbody > .view[name="index"] [data-template-name="titem"] > div > div > div,\nbody > .view[name="index"] [data-template-name="single_titem"] > div > div > div {\n  width: 100%!important;\n  height: 100%!important;\n}\nbody > .view[name="index"] [data-template-name="titemtzm"] > div > div > div > div:nth-child(1),\nbody > .view[name="index"] [data-template-name="titem"] > div > div > div > div:nth-child(1),\nbody > .view[name="index"] [data-template-name="single_titem"] > div > div > div > div:nth-child(1) {\n  width: 100%!important;\n  height: 4.625rem!important;\n  background-size: cover!important;\n}\nbody > .view[name="index"] [data-template-name="titemtzm"] > div > div > div > div:nth-child(2),\nbody > .view[name="index"] [data-template-name="titem"] > div > div > div > div:nth-child(2),\nbody > .view[name="index"] [data-template-name="single_titem"] > div > div > div > div:nth-child(2) {\n  width: auto!important;\n  height: 35px!important;\n  line-height: 1.5em!important;\n  word-break: break-all;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  /*only fix on webkit*/\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n}\nbody > .view[name="index"] [data-template-name="titemtzm"] > div > div > div > div:nth-child(4),\nbody > .view[name="index"] [data-template-name="titem"] > div > div > div > div:nth-child(4),\nbody > .view[name="index"] [data-template-name="single_titem"] > div > div > div > div:nth-child(4) {\n  height: auto!important;\n}\nbody > .view[name="index"] [data-template-name="titemtzm"] > div > div > div > div:nth-child(4) > div,\nbody > .view[name="index"] [data-template-name="titem"] > div > div > div > div:nth-child(4) > div,\nbody > .view[name="index"] [data-template-name="single_titem"] > div > div > div > div:nth-child(4) > div {\n  width: auto!important;\n  height: 0.5rem!important;\n  line-height: 0.5rem!important;\n  font-size: 16px!important;\n  font-family: arial;\n}\nbody > .view[name="index"] [data-template-name="titemtzm"] > div > div > div > div:nth-child(4) > div:nth-child(2),\nbody > .view[name="index"] [data-template-name="titem"] > div > div > div > div:nth-child(4) > div:nth-child(2),\nbody > .view[name="index"] [data-template-name="single_titem"] > div > div > div > div:nth-child(4) > div:nth-child(2) {\n  margin: 0!important;\n}\nbody > .view[name="index"] [data-dpr="1"] [data-template-name="titemtzm"] > div > div,\nbody > .view[name="index"] [data-dpr="1"] [data-template-name="titem"] > div > div,\nbody > .view[name="index"] [data-dpr="1"] [data-template-name="single_titem"] > div > div {\n  margin-bottom: 4px !important;\n}\nbody > .view[name="index"] [data-dpr="1"] [data-template-name="titemtzm"] > div > div:nth-child(1),\nbody > .view[name="index"] [data-dpr="1"] [data-template-name="titem"] > div > div:nth-child(1),\nbody > .view[name="index"] [data-dpr="1"] [data-template-name="single_titem"] > div > div:nth-child(1) {\n  margin-right: 2px !important;\n}\nbody > .view[name="index"] [data-dpr="1"] [data-template-name="titemtzm"] > div > div:nth-child(2),\nbody > .view[name="index"] [data-dpr="1"] [data-template-name="titem"] > div > div:nth-child(2),\nbody > .view[name="index"] [data-dpr="1"] [data-template-name="single_titem"] > div > div:nth-child(2) {\n  margin-left: 2px !important;\n}\nbody > .view[name="index"] [data-dpr="1"] [data-template-name="titemtzm"] > div > div > div > div:nth-child(2),\nbody > .view[name="index"] [data-dpr="1"] [data-template-name="titem"] > div > div > div > div:nth-child(2),\nbody > .view[name="index"] [data-dpr="1"] [data-template-name="single_titem"] > div > div > div > div:nth-child(2) {\n  height: 35px !important;\n}\nbody > .view[name="index"] [data-dpr="1"] [data-template-name="titemtzm"] > div > div > div > div:nth-child(4) > div,\nbody > .view[name="index"] [data-dpr="1"] [data-template-name="titem"] > div > div > div > div:nth-child(4) > div,\nbody > .view[name="index"] [data-dpr="1"] [data-template-name="single_titem"] > div > div > div > div:nth-child(4) > div {\n  font-size: 16px !important;\n}\nbody > .view[name="index"] [data-dpr="2"] [data-template-name="titemtzm"] > div > div,\nbody > .view[name="index"] [data-dpr="2"] [data-template-name="titem"] > div > div,\nbody > .view[name="index"] [data-dpr="2"] [data-template-name="single_titem"] > div > div {\n  margin-bottom: 8px !important;\n}\nbody > .view[name="index"] [data-dpr="2"] [data-template-name="titemtzm"] > div > div:nth-child(1),\nbody > .view[name="index"] [data-dpr="2"] [data-template-name="titem"] > div > div:nth-child(1),\nbody > .view[name="index"] [data-dpr="2"] [data-template-name="single_titem"] > div > div:nth-child(1) {\n  margin-right: 4px !important;\n}\nbody > .view[name="index"] [data-dpr="2"] [data-template-name="titemtzm"] > div > div:nth-child(2),\nbody > .view[name="index"] [data-dpr="2"] [data-template-name="titem"] > div > div:nth-child(2),\nbody > .view[name="index"] [data-dpr="2"] [data-template-name="single_titem"] > div > div:nth-child(2) {\n  margin-left: 4px !important;\n}\nbody > .view[name="index"] [data-dpr="2"] [data-template-name="titemtzm"] > div > div > div > div:nth-child(2),\nbody > .view[name="index"] [data-dpr="2"] [data-template-name="titem"] > div > div > div > div:nth-child(2),\nbody > .view[name="index"] [data-dpr="2"] [data-template-name="single_titem"] > div > div > div > div:nth-child(2) {\n  height: 70px !important;\n}\nbody > .view[name="index"] [data-dpr="2"] [data-template-name="titemtzm"] > div > div > div > div:nth-child(4) > div,\nbody > .view[name="index"] [data-dpr="2"] [data-template-name="titem"] > div > div > div > div:nth-child(4) > div,\nbody > .view[name="index"] [data-dpr="2"] [data-template-name="single_titem"] > div > div > div > div:nth-child(4) > div {\n  font-size: 32px !important;\n}\nbody > .view[name="index"] [data-dpr="3"] [data-template-name="titemtzm"] > div > div,\nbody > .view[name="index"] [data-dpr="3"] [data-template-name="titem"] > div > div,\nbody > .view[name="index"] [data-dpr="3"] [data-template-name="single_titem"] > div > div {\n  margin-bottom: 12px !important;\n}\nbody > .view[name="index"] [data-dpr="3"] [data-template-name="titemtzm"] > div > div:nth-child(1),\nbody > .view[name="index"] [data-dpr="3"] [data-template-name="titem"] > div > div:nth-child(1),\nbody > .view[name="index"] [data-dpr="3"] [data-template-name="single_titem"] > div > div:nth-child(1) {\n  margin-right: 6px !important;\n}\nbody > .view[name="index"] [data-dpr="3"] [data-template-name="titemtzm"] > div > div:nth-child(2),\nbody > .view[name="index"] [data-dpr="3"] [data-template-name="titem"] > div > div:nth-child(2),\nbody > .view[name="index"] [data-dpr="3"] [data-template-name="single_titem"] > div > div:nth-child(2) {\n  margin-left: 6px !important;\n}\nbody > .view[name="index"] [data-dpr="3"] [data-template-name="titemtzm"] > div > div > div > div:nth-child(2),\nbody > .view[name="index"] [data-dpr="3"] [data-template-name="titem"] > div > div > div > div:nth-child(2),\nbody > .view[name="index"] [data-dpr="3"] [data-template-name="single_titem"] > div > div > div > div:nth-child(2) {\n  height: 105px !important;\n}\nbody > .view[name="index"] [data-dpr="3"] [data-template-name="titemtzm"] > div > div > div > div:nth-child(4) > div,\nbody > .view[name="index"] [data-dpr="3"] [data-template-name="titem"] > div > div > div > div:nth-child(4) > div,\nbody > .view[name="index"] [data-dpr="3"] [data-template-name="single_titem"] > div > div > div > div:nth-child(4) > div {\n  font-size: 48px !important;\n}\nbody > .view[name="index"] [data-template-name="tfeatures3"] > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) {\n  width: 3.813rem !important;\n}\nbody > .view[name="index"] [data-template-name="tfeatures3"] > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) {\n  width: 1.328rem !important;\n}\nbody > .view[name="index"] [data-template-name="tfeatures3"] > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) {\n  width: 3.813rem !important;\n}\nbody > .view[name="index"] [data-template-name="tcategory5_4i4pic"] > div > div > div > div > div:nth-child(2) {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  display: block;\n  overflow: hidden;\n}\nbody > .view[name="index"] [data-template-name="tcategory5_2i4pic"] > div > div > div > div > div:nth-child(2) {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  display: block;\n  overflow: hidden;\n}\nbody > .view[name="index"] [data-template-name="tcategory3"] > div:nth-child(1) > div:nth-child(1) > div:nth-child(5) {\n  width: auto!important;\n}\nbody > .view[name="index"] [data-template-name="tcategory3"] > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) {\n  margin-left: 0!important;\n  padding-left: 2.375rem;\n}\nbody > .view[name="index"] [data-template-name="tcategory3"] > div:nth-child(1) > div:nth-child(4) > div:nth-child(2n-1) > div:nth-child(1) {\n  height: 3.8rem!important;\n}\nbody > .view[name="index"] [data-template-name="titemtop"] > div,\nbody > .view[name="index"] [data-template-name="t11GuessAlert"] > div {\n  box-sizing: border-box;\n  padding: 0.46875rem 0.25rem;\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -webkit-box-align: center;\n  -moz-box-pack: center;\n  -moz-box-align: center;\n  -ms-flex-pack: center;\n  -ms-flex-align: center;\n  justify-content: center;\n  align-content: center;\n  background: url(data:image/gif;base64,R0lGODlhAQABAIAAAN3d3QAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==) repeat-x 0 center;\n  background-size: 1px;\n}\nbody > .view[name="index"] [data-template-name="titemtop"] > div span,\nbody > .view[name="index"] [data-template-name="t11GuessAlert"] > div span {\n  display: block;\n  height: 0.4375rem;\n  padding: 0 0.48rem 0 0.75rem;\n  background-color: #eee;\n  color: #5f646e;\n}\nbody > .view[name="index"] [data-template-name="pagebottom"] > div {\n  box-sizing: border-box;\n  width: 100%;\n  border-top: 1px solid #292c33;\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ8AAABHCAMAAAAujTK5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRFPD5HNjhCMjQ7NzpCPUBKT1JgREZRREZSPkJKRkpWP0JMSk5ZQkVQNTg/MTM6VFhlNDY9Wl5sMDI5Oz1IQERNRUhUMzY8UlViUFNgPkBJRkhTNTdBNThAVFdlMDI6TlFeTE9bQENOTE9aQkZPPkBMQkZSTlBdNzpBOjtFODlCSEpVP0JLODpBNzlDMzU9UFRgUVViUFRhUlZjPUBJU1dkUVVhTVFdVVlnPD9JVFhmTlJfPD9ITFBcOz5HU1dlOj1FOTxEODtDOj1GOTxFS05aRklUSk1ZODpCVlpoOTtER0pVVVlmNzlBSEtWOjxFS09aODpDRUhTODtENTc/S09bNjhASU1YOz1GPT9JQ0ZQQENNQENMUlZiQUROOz5GT1JfOTtDPkFLTVBcNTc+VlpnSUxYQkVPSUxXPkFKNjlAV1tpUlZkQ0ZRRUhSNDY+TVBdSExXPT9IOjxENjhBREhSUVRhSEtXOjxGOz1HSk5aSk1YOj1HRkpUWFxqNzlAWFxrP0FLRUlTPkBKNjlCTFBbQUNNQEJMQUVORkpVQURPU1ZkQkRPOTxDR0tWT1JeWV1rQkVOPUBIWV1sPD5IV1tqQUVPRklVVVhmTVFcNDc+Oz1FREdROTpDS05bOj1EOTtFSExYU1ZjQkROQ0VQU1djSU1ZPD1HTlJdSEpWSExWWl1sP0FKR0pUODtCQEJNPEBITVFePT5IQkZQSU1XVlppTFBdOTxGPEBJR0lVRkhUPUFKNzhBREhTUVVjODpEOTtCR0lUQUNMREhRPkBLWFtqSUtXNDc/Q0dQOT1EWVxrUVRiS09cOz9HSk1aQUVQSkxYSUtWNzhANjdAOzxGV1poV1ppV1toP0BLNDY/ODlBPD5JOT1FODpFOTpEQEROVllnLzE3S01ZMzY+SElWQEFNVVhnOjxHRUlSOj5FPD9KP0BKUlZlNTY+NTY/PD1IPj9JOTtGOjtGSElVSUxZQkZRODxFSEpXNDU+SUpWSUxWOj5GR0hUQkNOSkxZT1NfTlJeSUKyDgAAGuNJREFUeNrsewd0G8mZJky0dbOApKbkGREaiibm5u40cxygczeARiPnRIAgSAIk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);\n  background-repeat: no-repeat;\n  background-position: center 3.4375rem;\n  background-size: 4.25rem 1.125rem;\n  background-color: #4e525e;\n  padding: 0.5625rem 0.25rem;\n}\nbody > .view[name="index"] [data-template-name="pagebottom"] > div .buttons {\n  width: 100%;\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n  -moz-box-pack: justify;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n}\nbody > .view[name="index"] [data-template-name="pagebottom"] > div .buttons a {\n  display: block;\n  height: 0.9375rem;\n  line-height: 0.9375rem;\n  color: #c3c6ca;\n  border: 2px solid #42454d;\n  background-color: #555965;\n  padding: 0 0.46875rem;\n}\nbody > .view[name="index"] [data-template-name="pagebottom"] > div .buttons a.text {\n  width: 1.875rem;\n  padding: 0;\n  color: #eee;\n  text-decoration: none;\n  overflow: hidden;\n  white-space: normal;\n  text-overflow: ellipsis;\n  border: 0;\n  background-color: transparent;\n}\nbody > .view[name="index"] [data-template-name="pagebottom"] > div .copyright {\n  width: 100%;\n  margin-top: 0.5625rem;\n  height: 0.5625rem;\n  line-height: 0.5625rem;\n  padding-left: 3.03125rem;\n  box-sizing: border-box;\n  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAMAAABgOjJdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAO1QTFRFhomSb3J8XGBrdnqDgYWNlJefV1tmfoGKU1diT1NfgISNgoWOYmZwio2Vi4+Wc3eAkJObZGhzUlZiaGt2U1djfYCKZGdyhYiQeHyFio6VgYWOVVllbHB6XWFsY2ZxaWx3jZCYXmFsfYCJcnZ/UVVham54V1tng4aPb3N8WV1pX2JtZWl0YWVvVlpmiYyUWVxohomRd3uEdHiBeX2GZ2t1hIeQVFhkf4OMbnJ8fYGKdnqEb3N9kJScY2dycnaAjpKZdHeBjpKajI+Yc3eBhYiRf4KLXmFtio6Wi4+XjZCZkJSbkZScjI+XlJifTlJe+rAZcwAAAZBJREFUeNp0lOeWgjAQhSdUBQRRbFjX7tpW3XUt23tL3v9xNigJIHh/zRk+5iR3ZgIkULWmwgv+A7VWDWWBR/nSt2gLUzIVbLH1lo8RRW1wEfqxPtCKUaKTMUhURuUhTIi6Q07l6LuAEFdpEld6tWNEx00CKKJ3jsR1xSHJcj4bB+LmkpxT49Yj8mqQUVBBciUk8ITepESJ+5AqY1+uwny5IjDPcADoN0BIwjLOsjKZOewtbi/9fvi338a44CetIai2H/cokPLj9tfEj2wVzD4rIWMlfpu+CXc5Pw4qh5X7AUw4gZIswUENGT8lAN1fMBVeAxIIxYR3Nin0imOe52emdxkyP8aY+0S9Y2d63cNoxvACRTaeI70slst+cjYCAnXmuuS1RKKmy1hKBX0hzaC3KOsxsmz2Ir2NzMcEbVCo+cf5oDOWOzNAucpxxoglnZlT1+KzXk4kymKwL4ttN+73dhHeuWV85zLL073Vw3v7MdDuE3a/JRrCmqwFQ2yV8gmvg/d+aPCMH0GLvB//AgwAo1MTpxsaxVoAAAAASUVORK5CYII=);\n  background-repeat: no-repeat;\n  background-position: 2.3125rem center;\n  background-size: 0.53125rem 0.53125rem;\n  color: #c3c6ca;\n}\nbody > .view[name="index"] [data-dpr="1"] [data-template-name="pagebottom"] > div .buttons a {\n  border-radius: 6px;\n  font-size: 14px;\n}\nbody > .view[name="index"] [data-dpr="1"] [data-template-name="pagebottom"] > div .copyright {\n  font-size: 12px;\n}\nbody > .view[name="index"] [data-dpr="1"] [data-template-name="pagebottom"] > div .copyright span {\n  font-size: 18px;\n}\nbody > .view[name="index"] [data-dpr="2"] [data-template-name="pagebottom"] > div .buttons a {\n  border-radius: 12px;\n  font-size: 28px;\n}\nbody > .view[name="index"] [data-dpr="2"] [data-template-name="pagebottom"] > div .copyright {\n  font-size: 24px;\n}\nbody > .view[name="index"] [data-dpr="2"] [data-template-name="pagebottom"] > div .copyright span {\n  font-size: 36px;\n}\nbody > .view[name="index"] [data-dpr="3"] [data-template-name="pagebottom"] > div .buttons a {\n  border-radius: 18px;\n  font-size: 42px;\n}\nbody > .view[name="index"] [data-dpr="3"] [data-template-name="pagebottom"] > div .copyright {\n  font-size: 36px;\n}\nbody > .view[name="index"] [data-dpr="3"] [data-template-name="pagebottom"] > div .copyright span {\n  font-size: 54px;\n}\nbody > .view[name="index"] [data-ctrl-name="popad"] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -moz-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  z-index: 9999;\n  -webkit-transform: translateZ(39px);\n  -ms-transform: translateZ(39px);\n  transform: translateZ(39px);\n}\nbody > .view[name="index"] [data-ctrl-name="popad"] .img {\n  position: relative;\n  background-size: contain;\n  background-position: 0 0;\n  background-repeat: no-repeat;\n}\nbody > .view[name="index"] [data-ctrl-name="popad"] .close {\n  position: absolute;\n  top: 0;\n  right: 0;\n}\nbody > .view[name="index"] [data-ctrl-name="popad"] .back {\n  position: absolute;\n  left: 0;\n}\nbody > .view[name="index"] [data-ctrl-name="popad"] .callapp {\n  position: absolute;\n}\nbody > .view[name="index"] [data-dpr="1"][data-ctrl-name="popad"] .img {\n  width: 320px;\n  height: 416px;\n}\nbody > .view[name="index"] [data-dpr="1"][data-ctrl-name="popad"] .close {\n  width: 40px;\n  height: 40px;\n}\nbody > .view[name="index"] [data-dpr="1"][data-ctrl-name="popad"] .back {\n  top: 370px;\n  width: 120px;\n  height: 60px;\n}\nbody > .view[name="index"] [data-dpr="1"][data-ctrl-name="popad"] .callapp {\n  top: 285px;\n  left: 50px;\n  width: 218px;\n  height: 44px;\n}\nbody > .view[name="index"] [data-dpr="2"][data-ctrl-name="popad"] .img {\n  width: 640px;\n  height: 832px;\n}\nbody > .view[name="index"] [data-dpr="2"][data-ctrl-name="popad"] .close {\n  width: 80px;\n  height: 80px;\n}\nbody > .view[name="index"] [data-dpr="2"][data-ctrl-name="popad"] .back {\n  top: 740px;\n  width: 240px;\n  height: 120px;\n}\nbody > .view[name="index"] [data-dpr="2"][data-ctrl-name="popad"] .callapp {\n  top: 570px;\n  left: 100px;\n  width: 436px;\n  height: 88px;\n}\nbody > .view[name="index"] [data-dpr="3"][data-ctrl-name="popad"] .img {\n  width: 960px;\n  height: 1248px;\n}\nbody > .view[name="index"] [data-dpr="3"][data-ctrl-name="popad"] .close {\n  width: 120px;\n  height: 120px;\n}\nbody > .view[name="index"] [data-dpr="3"][data-ctrl-name="popad"] .back {\n  top: 1110px;\n  width: 360px;\n  height: 180px;\n}\nbody > .view[name="index"] [data-dpr="3"][data-ctrl-name="popad"] .callapp {\n  top: 855px;\n  left: 150px;\n  width: 654px;\n  height: 132px;\n}\nbody > .view[name="index"] [data-ctrl-name="topsb"] {\n  width: 100%;\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -moz-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  z-index: 9998;\n}\nbody > .view[name="index"] [data-ctrl-name="topsb"] .img {\n  position: relative;\n  background-size: contain;\n  background-position: 0 0;\n  background-repeat: no-repeat;\n}\nbody > .view[name="index"] [data-ctrl-name="topsb"] .close {\n  position: absolute;\n  top: 0;\n  right: 0;\n}\nbody > .view[name="index"] [data-ctrl-name="topsb"] .down {\n  position: absolute;\n}\nbody > .view[name="index"] [data-ctrl-name="topsb"] .callapp {\n  position: absolute;\n}\nbody > .view[name="index"] [data-dpr="1"][data-ctrl-name="topsb"] .img {\n  width: 320px;\n  height: 100px;\n}\nbody > .view[name="index"] [data-dpr="1"][data-ctrl-name="topsb"] .close {\n  width: 29px;\n  height: 25px;\n}\nbody > .view[name="index"] [data-dpr="1"][data-ctrl-name="topsb"] .down {\n  top: 34px;\n  left: 194px;\n  width: 98px;\n  height: 25px;\n}\nbody > .view[name="index"] [data-dpr="1"][data-ctrl-name="topsb"] .callapp {\n  top: 64px;\n  left: 194px;\n  width: 98px;\n  height: 25px;\n}\nbody > .view[name="index"] [data-dpr="2"][data-ctrl-name="topsb"] .img {\n  width: 640px;\n  height: 200px;\n}\nbody > .view[name="index"] [data-dpr="2"][data-ctrl-name="topsb"] .close {\n  width: 58px;\n  height: 50px;\n}\nbody > .view[name="index"] [data-dpr="2"][data-ctrl-name="topsb"] .down {\n  top: 68px;\n  left: 388px;\n  width: 196px;\n  height: 50px;\n}\nbody > .view[name="index"] [data-dpr="2"][data-ctrl-name="topsb"] .callapp {\n  top: 128px;\n  left: 388px;\n  width: 196px;\n  height: 50px;\n}\nbody > .view[name="index"] [data-dpr="3"][data-ctrl-name="topsb"] .img {\n  width: 960px;\n  height: 300px;\n}\nbody > .view[name="index"] [data-dpr="3"][data-ctrl-name="topsb"] .close {\n  width: 87px;\n  height: 75px;\n}\nbody > .view[name="index"] [data-dpr="3"][data-ctrl-name="topsb"] .down {\n  top: 102px;\n  left: 582px;\n  width: 294px;\n  height: 75px;\n}\nbody > .view[name="index"] [data-dpr="3"][data-ctrl-name="topsb"] .callapp {\n  top: 192px;\n  left: 582px;\n  width: 294px;\n  height: 75px;\n}\nbody > .view[name="index"] [data-ctrl-name="gotop"] {\n  display: none;\n  box-sizing: border-box;\n  width: 1.375rem;\n  height: 1.375rem;\n  line-height: 1.875rem;\n  text-align: center;\n  color: #BBB;\n  background-color: #FFF;\n  position: absolute;\n  z-index: 9;\n  border-radius: 0.6875rem;\n  border: 1px solid #CCC;\n  font-size: 12px;\n  right: 0.3125rem;\n  bottom: 0.375rem;\n  -webkit-transform: translateZ(9px);\n  -ms-transform: translateZ(9px);\n  transform: translateZ(9px);\n}\nbody > .view[name="index"] [data-ctrl-name="gotop"] span {\n  font-family: \'h5index-iconfont\';\n  font-style: normal;\n  -webkit-font-smoothing: antialiased;\n  -webkit-text-stroke-width: 0.2px;\n  -moz-osx-font-smoothing: grayscale;\n  display: block;\n  position: absolute;\n  width: 1.375rem;\n  height: 1.375rem;\n  line-height: 0.75rem;\n  color: #999;\n  font-size: 20px;\n}\nbody > .view[name="index"] [data-dpr="1"][data-ctrl-name="gotop"] {\n  font-size: 12px;\n  width: 44px;\n  height: 44px;\n  line-height: 60px;\n  border-radius: 22px;\n  right: 10px;\n  bottom: 70px;\n}\nbody > .view[name="index"] [data-dpr="1"][data-ctrl-name="gotop"] span {\n  font-size: 20px;\n  width: 44px;\n  height: 44px;\n  line-height: 24px;\n}\nbody > .view[name="index"] [data-dpr="2"][data-ctrl-name="gotop"] {\n  font-size: 24px;\n  width: 88px;\n  height: 88px;\n  line-height: 120px;\n  border-radius: 44px;\n  right: 20px;\n  bottom: 140px;\n}\nbody > .view[name="index"] [data-dpr="2"][data-ctrl-name="gotop"] span {\n  font-size: 40px;\n  width: 88px;\n  height: 88px;\n  line-height: 48px;\n}\nbody > .view[name="index"] [data-dpr="3"][data-ctrl-name="gotop"] {\n  font-size: 36px;\n  width: 132px;\n  height: 132px;\n  line-height: 180px;\n  border-radius: 66px;\n  right: 30px;\n  bottom: 210px;\n}\nbody > .view[name="index"] [data-dpr="3"][data-ctrl-name="gotop"] span {\n  font-size: 60px;\n  width: 132px;\n  height: 132px;\n  line-height: 72px;\n}\nbody > .view[name="index"] [data-ctrl-name="counter"] {\n  padding: 0;\n  position: absolute;\n  z-index: 3;\n}\nbody > .view[name="index"] [data-ctrl-name="counter"] span {\n  display: inline-block;\n  width: 0.533rem;\n  height: 0.533rem;\n  line-height: 0.533rem;\n  vertical-align: middle;\n  margin: 0 0.03125rem;\n  color: #fff;\n  background: #333;\n  text-align: center;\n  font-size: 0.3125rem;\n  border-radius: 0.02667rem;\n}\nbody > .view[name="index"] [data-ctrl-name="counter"] span.dot {\n  width: 0.125rem;\n  color: #333;\n  background: transparent;\n}\nbody > .view[name="index"] [data-template-name="t11MallMainEntranceSmall"] div {\n  height: 1.92rem!important;\n}\nbody > .view[name="index"] [data-template-name="t11VipRoomSingle"] > div > div {\n  background-size: cover!important;\n}\nbody > .view[name="index"] [data-ctrl-name="t11Headline"] {\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n  padding-left: 2.2rem;\n}\nbody > .view[name="index"] [data-ctrl-name="t11Headline"] a {\n  display: block;\n  box-sizing: border-box;\n  width: 100%;\n  height: 1.578rem;\n  padding: 0.289rem 0.5rem;\n  overflow: hidden;\n}\nbody > .view[name="index"] [data-ctrl-name="t11Headline"] a span {\n  position: relative;\n  display: block;\n  width: 100%;\n  height: 50%;\n  box-sizing: border-box;\n  padding-left: 0.25rem;\n  line-height: 0.5rem;\n  font-size: 12px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\nbody > .view[name="index"] [data-ctrl-name="t11Headline"] a span::before {\n  content: \'.\';\n  font-size: 0;\n  width: 4px;\n  height: 4px;\n  background-color: red;\n  border-radius: 4px;\n  position: absolute;\n  top: 6px;\n  left: 0;\n}\nbody > .view[name="index"] [data-dpr="1"] [data-ctrl-name="t11Headline"] span {\n  font-size: 12px;\n}\nbody > .view[name="index"] [data-dpr="1"] [data-ctrl-name="t11Headline"] span::before {\n  width: 4px;\n  height: 4px;\n  border-radius: 4px;\n  top: 6px;\n}\nbody > .view[name="index"] [data-dpr="2"] [data-ctrl-name="t11Headline"] span {\n  font-size: 24px;\n}\nbody > .view[name="index"] [data-dpr="2"] [data-ctrl-name="t11Headline"] span::before {\n  width: 8px;\n  height: 8px;\n  border-radius: 8px;\n  top: 12px;\n}\nbody > .view[name="index"] [data-dpr="3"] [data-ctrl-name="t11Headline"] span {\n  font-size: 36px;\n}\nbody > .view[name="index"] [data-dpr="3"] [data-ctrl-name="t11Headline"] span::before {\n  width: 12px;\n  height: 12px;\n  border-radius: 12px;\n  top: 18px;\n}\nbody > .view[name="index"] #guessitem .loading {\n  box-sizing: border-box;\n  padding: 0.46875rem 0.25rem;\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -webkit-box-align: center;\n  -moz-box-pack: center;\n  -moz-box-align: center;\n  -ms-flex-pack: center;\n  -ms-flex-align: center;\n  justify-content: center;\n  align-content: center;\n  background: url(data:image/gif;base64,R0lGODlhAQABAIAAAN3d3QAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==) repeat-x 0 center;\n  background-size: 1px;\n}\nbody > .view[name="index"] #guessitem .loading span {\n  display: block;\n  height: 0.4375rem;\n  padding: 0 0.48rem 0 0.75rem;\n  background-color: #eee;\n  color: #5f646e;\n}\nbody > .view[name="index"] #guessitem > section {\n  overflow: auto;\n  zoom: 1;\n}\nbody > .view[name="index"] #guessitem [data-template-name="t11VipRoomBanner"] > div {\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -webkit-box-align: center;\n  -moz-box-pack: center;\n  -moz-box-align: center;\n  -ms-flex-pack: center;\n  -ms-flex-align: center;\n  justify-content: center;\n  align-content: center;\n  align-items: center;\n}\nbody > .view[name="index"] #guessitem [data-template-name="t11VipRoomBanner"] > div > div {\n  position: static!important;\n}\n', ""]);
}, function(a, b) {
	a.exports = function() {
		var a = [];
		return a.toString = function() {
			for(var a = [], b = 0; b < this.length; b++) {
				var c = this[b];
				c[2] ? a.push("@media " + c[2] + "{" + c[1] + "}") : a.push(c[1])
			}
			return a.join("")
		}, a.i = function(b, c) {
			"string" == typeof b && (b = [
				[null, b, ""]
			]);
			for(var d = {}, e = 0; e < this.length; e++) {
				var f = this[e][0];
				"number" == typeof f && (d[f] = !0)
			}
			for(e = 0; e < b.length; e++) {
				var g = b[e];
				"number" == typeof g[0] && d[g[0]] || (c && !g[2] ? g[2] = c : c && (g[2] = "(" + g[2] + ") and (" + c + ")"), a.push(g))
			}
		}, a
	}
}, function(a, b, c) {
	function d(a, b) {
		for(var c = 0; c < a.length; c++) {
			var d = a[c],
				e = l[d.id];
			if(e) {
				e.refs++;
				for(var f = 0; f < e.parts.length; f++) e.parts[f](d.parts[f]);
				for(; f < d.parts.length; f++) e.parts.push(h(d.parts[f], b))
			} else {
				for(var g = [], f = 0; f < d.parts.length; f++) g.push(h(d.parts[f], b));
				l[d.id] = {
					id: d.id,
					refs: 1,
					parts: g
				}
			}
		}
	}

	function e(a) {
		for(var b = [], c = {}, d = 0; d < a.length; d++) {
			var e = a[d],
				f = e[0],
				g = e[1],
				h = e[2],
				i = e[3],
				j = {
					css: g,
					media: h,
					sourceMap: i
				};
			c[f] ? c[f].parts.push(j) : b.push(c[f] = {
				id: f,
				parts: [j]
			})
		}
		return b
	}

	function f() {
		var a = document.createElement("style"),
			b = o();
		return a.type = "text/css", b.appendChild(a), a
	}

	function g() {
		var a = document.createElement("link"),
			b = o();
		return a.rel = "stylesheet", b.appendChild(a), a
	}

	function h(a, b) {
		var c, d, e;
		if(b.singleton) {
			var h = q++;
			c = p || (p = f()), d = i.bind(null, c, h, !1), e = i.bind(null, c, h, !0)
		} else a.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (c = g(), d = k.bind(null, c), e = function() {
			c.parentNode.removeChild(c), c.href && URL.revokeObjectURL(c.href)
		}) : (c = f(), d = j.bind(null, c), e = function() {
			c.parentNode.removeChild(c)
		});
		return d(a),
			function(b) {
				if(b) {
					if(b.css === a.css && b.media === a.media && b.sourceMap === a.sourceMap) return;
					d(a = b)
				} else e()
			}
	}

	function i(a, b, c, d) {
		var e = c ? "" : d.css;
		if(a.styleSheet) a.styleSheet.cssText = r(b, e);
		else {
			var f = document.createTextNode(e),
				g = a.childNodes;
			g[b] && a.removeChild(g[b]), g.length ? a.insertBefore(f, g[b]) : a.appendChild(f)
		}
	}

	function j(a, b) {
		var c = b.css,
			d = b.media;
		b.sourceMap;
		if(d && a.setAttribute("media", d), a.styleSheet) a.styleSheet.cssText = c;
		else {
			for(; a.firstChild;) a.removeChild(a.firstChild);
			a.appendChild(document.createTextNode(c))
		}
	}

	function k(a, b) {
		var c = b.css,
			d = (b.media, b.sourceMap);
		d && (c += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(d)))) + " */");
		var e = new Blob([c], {
				type: "text/css"
			}),
			f = a.href;
		a.href = URL.createObjectURL(e), f && URL.revokeObjectURL(f)
	}
	var l = {},
		m = function(a) {
			var b;
			return function() {
				return "undefined" == typeof b && (b = a.apply(this, arguments)), b
			}
		},
		n = m(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())
		}),
		o = m(function() {
			return document.head || document.getElementsByTagName("head")[0]
		}),
		p = null,
		q = 0;
	a.exports = function(a, b) {
		b = b || {}, "undefined" == typeof b.singleton && (b.singleton = n());
		var c = e(a);
		return d(c, b),
			function(a) {
				for(var f = [], g = 0; g < c.length; g++) {
					var h = c[g],
						i = l[h.id];
					i.refs--, f.push(i)
				}
				if(a) {
					var j = e(a);
					d(j, b)
				}
				for(var g = 0; g < f.length; g++) {
					var i = f[g];
					if(0 === i.refs) {
						for(var k = 0; k < i.parts.length; k++) i.parts[k]();
						delete l[i.id]
					}
				}
			}
	};
	var r = function() {
		var a = [];
		return function(b, c) {
			return a[b] = c, a.filter(Boolean).join("\n")
		}
	}()
}, function(a, b, c) {
	"use strict";

	function d(a) {
		if(a && a.__esModule) return a;
		var b = {};
		if(null != a)
			for(var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
		return b["default"] = a, b
	}

	function e() {
		return A.promise
	}
	Object.defineProperty(b, "__esModule", {
		value: !0
	}), b.pageready = e;
	var f = c(6),
		g = c(7),
		h = c(8),
		i = d(h),
		j = c(11),
		k = d(j),
		l = c(15),
		m = d(l),
		n = c(23),
		o = d(n),
		p = c(16),
		q = d(p),
		r = c(24),
		s = d(r),
		t = c(18),
		u = d(t),
		v = c(21),
		w = d(v),
		x = window,
		y = x.Promise,
		z = x.lib.promise,
		A = z.defer();
	i.render(), s.data().then(k.render), u.data().then(m.render), w.data().then(o.render), g.definePage("index", function() {
		this.show.meanwhile(function() {
			var a = this;
			return this.persisted ? void 0 : i.ready().then(function(b) {
				a.viewport.appendChild(b), q.attachTo(b)
			})
		}), this.show.ready(function() {
			var a = this;
			this.persisted ? q.ready().then(function(a) {
				a.refresh()
			}) : i.ready().then(function(a) {
				return y.all([q.ready(), k.ready(), m.ready(), o.ready()])
			}).then(function(b) {
				var c = b[0],
					d = b[1],
					e = b[2],
					g = b[3];
				c.scrollElement.appendChild(d), c.scrollElement.appendChild(e), c.scrollElement.appendChild(g), c.refresh(), w.request(), A.resolve(a), f.CloseSlogan && f.CloseSlogan()
			})
		})
	})
}, function(a, b) {
	"use strict";
	Object.defineProperty(b, "__esModule", {
		value: !0
	}), b["default"] = window, a.exports = b["default"]
}, function(a, b) {
	"use strict";
	Object.defineProperty(b, "__esModule", {
		value: !0
	}), b["default"] = window.app, a.exports = b["default"]
}, function(a, b, c) {
	"use strict";

	function d() {
		return i.promise
	}

	function e() {
		var a = f.pagelayout();
		a.setAttribute("data-dpr", g.dpr);
		var b = a.querySelector(".scroll-content");
		return b.appendChild(f.pageheader()), b.appendChild(f.pagebar()), i.resolve(a), i.promise
	}
	Object.defineProperty(b, "__esModule", {
		value: !0
	}), b.ready = d, b.render = e;
	var f = (c(9), c(10)),
		g = window,
		h = (g.document, g.Promise, g.lib.promise),
		i = h.defer()
}, function(a, b) {
	"use strict";
	Object.defineProperty(b, "__esModule", {
		value: !0
	}), b["default"] = window.lib, a.exports = b["default"]
}, function(a, b) {
	"use strict";
	Object.defineProperty(b, "__esModule", {
		value: !0
	}), b["default"] = window.H5INDEX_TEMPLATE, a.exports = b["default"]
}, function(a, b, c) {
	"use strict";

	function d(a) {
		if(a && a.__esModule) return a;
		var b = {};
		if(null != a)
			for(var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
		return b["default"] = a, b
	}

	function e() {
		return v.promise
	}

	function f(a, b) {
		n.tbanner_items && q.q(".UIView", a).appendChild(n.tbanner_items(b.items))
	}

	function g(a, b) {
		if(n.rushbuy_counter && b.items && b.items[0] && b.items[0].extra) try {
			var c = JSON.parse(b.items[0].extra),
				d = n.rushbuy_counter(c);
			q.q(".TBRushBuyCounterLabel", a).appendChild(d)
		} catch(e) {}
	}

	function h(a, b) {
		var c = q.q(".UIView ~ div", a);
		if(c && b.items && n.toutiao_item) {
			c.innerHTML = "", c.setAttribute("data-ctrl-name", "toutiao");
			var d = t.createDocumentFragment();
			b.items.forEach(function(a) {
				d.appendChild(n.toutiao_item(a))
			}), c.appendChild(d)
		}
	}

	function i(a, b) {
		var c = q.q(".UIView ~ div .UIView ~div", a);
		if(c && b.items && n.t11Headline_item) {
			c.innerHTML = "";
			var d = t.createElement("div");
			d.setAttribute("data-ctrl-name", "t11Headline"), b.items.forEach(function(a) {
				d.appendChild(n.t11Headline_item(a))
			}), c.appendChild(d)
		}
	}

	function j(a, b) {
		if(b.sections) {
			var c = q.q(".UIView:last-child", a);
			b.sections && n.slide_pager && c.appendChild(n.slide_pager());
			var d = q.q("ul", c);
			b.sections.forEach(function(a, b) {
				var c = a.template,
					e = a.items;
				if(e = p.global(e, b), p[c] && (e = p[c](e, b)), n[c]) {
					var f = n[c](e, b),
						g = document.createElement("li");
					g.className = "card", g.appendChild(f), d.appendChild(g)
				}
			})
		}
	}

	function k(a, b) {
		var c = "猜你喜欢",
			d = t.createElement("span");
		d.textContent = c, a.firstElementChild.appendChild(d)
	}

	function l(a) {
		var b = [],
			c = n.pagecontent();
		return a.data.section.forEach(function(a, d) {
			var e, l = parseInt(a.group);
			if(!b[l]) {
				var m = t.createElement("section");
				m.setAttribute("data-group", l), c.appendChild(m), b[l] = m
			}
			e = b[l];
			var o = a.template,
				q = a.items,
				s = a.type;
			if(q = p.global(q, d), p[o] && (q = p[o](q, d)), n[o]) {
				var u = n[o](q, d);
				try {
					"banner" === s ? f(u, a) : "pager" === s ? j(u, a) : "rushbuy42" === o || "trushbuy3" === o || "trushbuy5" === o ? g(u, a) : "toutiao2" === o ? h(u, a) : "tbannerScroll" === o ? j(u, a) : "t11Headline" === o ? i(u, a) : ("titemtop" === o || "t11GuessAlert" === o) && k(u, a)
				} catch(v) {
					return void console.error(v)
				}
				r.fixFontSize(u), r.fixUIButton(u), e.appendChild(u)
			}
		}), v.resolve(c), v.promise
	}
	Object.defineProperty(b, "__esModule", {
		value: !0
	}), b.ready = e, b.render = l;
	var m = c(10),
		n = d(m),
		o = c(12),
		p = d(o),
		q = c(13),
		r = c(14),
		s = window,
		t = s.document,
		u = (s.Promise, s.lib.promise),
		v = u.defer()
}, function(a, b) {
	(function(a) {
		"use strict";

		function a(a, b) {
			return a && a.forEach(function(a) {
				var b;
				if(a.imageUrl && a.imageUrl.forEach(function(a) {
						(b = a.imgUrl) && (b.indexOf(".png") < 0 && b.indexOf("_q50.jpg") < 0 && (b.indexOf(".jpg") > -1 || b.indexOf(".jpeg") > -1) && (b = b.replace(/\.(jpg|jpeg)/, ".$1_q50.jpg")), b.match(/gtms(\d+)\.alicdn\.com/i) && (b = b.replace(/gtms(\d+)\.alicdn\.com/i, "gw.alicdn.com")), a.imgUrl = b)
					}), (b = a.targetUrl) && b.match(/^(?:(https?|taobao)\:)?\/\//)) try {
					b = new lib.httpurl(b);
					var c = b.params.spm,
						d = b.params.scm;
					c && (b.params.spm = c.replace(/^[^\.]+\.[^\.]+/, "a215s.7406091")), d && (b.params.scm = d.replace(/^[^\.]+/, "2027")), "y" === b.params.homepage_native && (b.protocal = "taobao"), a.targetUrl = b.toString()
				} catch(e) {
					b = b.replace(/spm\=[^\.=&#?]+\.[^\.=&#?]+/, "spm=a215s.7406091"), b = b.replace(/scm\=[^\.=&#?]+/, "scm=2027"), b.indexOf("homepage_native=y") > -1 && (b = "taobao" + b.replace(/^https?\:/, "")), a.targetUrl = b
				}
			}), a
		}

		function c(a, b) {
			var c = 4 * d.rem,
				e = 2 * Math.floor(c / 12 / d.dpr);
			return a && a.forEach(function(a) {
				if(a.imageUrl && a.imageUrl[0] && a.imageUrl[0].imgUrl && a.imageUrl[0].imgUrl.replace("_q50.jpg", "_300x300q50.jpg"), !f && a.title && a.title[0] && a.title[0].valueDesc) {
					for(var b = a.title[0].valueDesc, c = 0, d = 0; e - 1.5 > d && c < b.length;) b.charCodeAt(c) < 128 ? d += .5 : d++, c++;
					c < b.length && (a.title[0].valueDesc = b.substr(0, c) + "...")
				}
			}), a
		}
		Object.defineProperty(b, "__esModule", {
			value: !0
		}), b.global = a, b.titem = c;
		var d = window,
			e = d.document,
			f = "undefined" != typeof e.body.style.webkitLineClamp,
			g = c;
		b.titemtzm = g
	}).call(b, function() {
		return this
	}())
}, function(a, b) {
	"use strict";

	function c(a, b) {
		return b.querySelector(a)
	}

	function d(a, b) {
		return Array.prototype.slice.call(b.querySelectorAll(a))
	}

	function e(a, b, c) {
		var d = document.createEvent("HTMLEvents");
		d.initEvent(b, !1, !0);
		for(var e in c) d[e] = c[e];
		a.dispatchEvent(d)
	}
	Object.defineProperty(b, "__esModule", {
		value: !0
	}), b.q = c, b.qa = d, b.dispatchEvent = e
}, function(a, b) {
	"use strict";

	function c(a) {
		a.style && a.style.fontSize && (a.style.fontSize = 37.5 * parseFloat(a.style.fontSize) * f.dpr + "px"), Array.prototype.slice.call(a.children).forEach(function(a) {
			c(a)
		})
	}

	function d(a) {
		var b = 0;
		if(a.style.height) b = parseFloat(parseFloat(a.style.height).toFixed(2));
		else {
			var c = 0;
			Array.prototype.slice.call(a.childNodes).forEach(function(a) {
				"inline-block" === a.style.display ? c = Math.max(c, d(a)) : (b += c + d(a), c = 0)
			}), b += c, a.style.height = parseFloat(b.toFixed(2)) + "rem"
		}
		var e = a.style.marginTop || "0",
			f = a.style.marginBottom || "0";
		return e = e.indexOf("px") > -1 ? 0 : parseFloat(parseFloat(e).toFixed(2)), f = f.indexOf("px") > -1 ? 0 : parseFloat(parseFloat(f).toFixed(2)), b += e + f
	}

	function e(a) {
		Array.prototype.slice.call(a.querySelectorAll(".UIButton")).forEach(function(a) {
			var b = a.getAttribute("data-href");
			if(b && "undefined" !== b && 0 === a.childElementCount) {
				var c = a.nextElementSibling;
				c && (c.setAttribute("data-href", b), a.parentNode.removeChild(a))
			} else "undefined" === b && a.parentNode.removeChild(a)
		})
	}
	Object.defineProperty(b, "__esModule", {
		value: !0
	}), b.fixFontSize = c, b.fixElementHeight = d, b.fixUIButton = e;
	var f = window
}, function(a, b, c) {
	"use strict";

	function d(a) {
		if(a && a.__esModule) return a;
		var b = {};
		if(null != a)
			for(var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
		return b["default"] = a, b
	}

	function e() {
		return A.promise
	}

	function f(a, b) {
		var c = "猜你喜欢",
			d = x.createElement("span");
		d.textContent = c, a.firstElementChild.appendChild(d)
	}

	function g(a, b) {
		b % 2 === 0 ? a.style["float"] = "left" : a.style["float"] = "right"
	}

	function h(a, b) {
		b % 2 === 0 ? a.style["float"] = "left" : a.style["float"] = "right"
	}

	function i(a) {
		a.style.clear = "both"
	}

	function j(a, b) {
		var c = q.q(".loading", a);
		a.removeChild(c);
		var d = [];
		b.data.section.forEach(function(b, c) {
			var e, j = parseInt(b.group);
			if(!d[j]) {
				var k = x.createElement("section");
				k.setAttribute("data-group", j), a.appendChild(k), d[j] = k
			}
			e = d[j];
			var l = b.template,
				m = b.items;
			b.type;
			if(m = p.global(m, c), p[l] && (m = p[l](m, c)), n[l]) {
				var o = n[l](m, c);
				"t11VipRoomSingle" === l ? B >= C ? o = null : (g(o, B), B++) : "single_titem" === l ? B + D >= E ? o = null : (h(o, D), D++) : (("titemtop" === l || "t11GuessAlert" === l) && f(o, b), i(o)), o && (v.fixFontSize(o), v.fixUIButton(o), e.appendChild(o))
			}
		})
	}

	function k(a) {
		var b = n.pageguessitem();
		return a && j(b, a), A.resolve(b), A.promise
	}
	Object.defineProperty(b, "__esModule", {
		value: !0
	});
	var l = function() {
		function a(a, b) {
			var c = [],
				d = !0,
				e = !1,
				f = void 0;
			try {
				for(var g, h = a[Symbol.iterator](); !(d = (g = h.next()).done) && (c.push(g.value), !b || c.length !== b); d = !0);
			} catch(i) {
				e = !0, f = i
			} finally {
				try {
					!d && h["return"] && h["return"]()
				} finally {
					if(e) throw f
				}
			}
			return c
		}
		return function(b, c) {
			if(Array.isArray(b)) return b;
			if(Symbol.iterator in Object(b)) return a(b, c);
			throw new TypeError("Invalid attempt to destructure non-iterable instance")
		}
	}();
	b.ready = e, b.update = j, b.render = k;
	var m = c(10),
		n = d(m),
		o = c(12),
		p = d(o),
		q = c(13),
		r = c(16),
		s = d(r),
		t = c(18),
		u = d(t),
		v = c(14),
		w = window,
		x = w.document,
		y = w.Promise,
		z = w.lib.promise,
		A = z.defer(),
		B = 0,
		C = 50,
		D = 0,
		E = 50;
	y.all([e(), s.ready()]).then(function(a) {
		var b = l(a, 2),
			c = b[0],
			d = b[1],
			e = q.q(".loading", c),
			f = !1;
		e && ! function() {
			var a = function b(a) {
				d.isInView(e) && !f && (f = !0, d.removeEventListener("scrolling", b), u.request().then(function(a) {
					j(c, a), d.refresh()
				}))
			};
			d.addEventListener("scrolling", a)
		}()
	})
}, function(a, b, c) {
	"use strict";

	function d() {
		return j.promise
	}

	function e(a) {
		var b = new g.scrollview(a, {
			downgrade: !!f.env.browser.isIEMobile,
			useFrameAnimation: !1
		});
		return b.fixed.topElement = a.querySelector("header"), b.fixed.enable = !0, b.fixed.bottomElement = a.querySelector("footer"), b.fixed.enable = !0, b.lazyload.realtime = !1, b.lazyload.enable = !0, b.scroll.init(), j.resolve(b), j.promise
	}
	Object.defineProperty(b, "__esModule", {
		value: !0
	}), b.ready = d, b.attachTo = e;
	var f = c(9),
		g = c(17),
		h = window,
		i = (h.document, h.Promise, h.lib.promise),
		j = i.defer()
}, function(a, b) {
	"use strict";
	Object.defineProperty(b, "__esModule", {
		value: !0
	}), b["default"] = window.ctrl, a.exports = b["default"]
}, function(a, b, c) {
	"use strict";

	function d(a) {
		if(a && a.__esModule) return a;
		var b = {};
		if(null != a)
			for(var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
		return b["default"] = a, b
	}

	function e(a) {
		return a && a.__esModule ? a : {
			"default": a
		}
	}

	function f() {
		return q
	}

	function g(a, b) {
		if(window.MOCK_GUESSITEM_DATA) return q = p.resolve(window.MOCK_GUESSITEM_DATA);
		var c = document.cookie.match(/cna=([^;]+)/),
			d = {
				platform: "h5",
				acookie: c && c[1] || "",
				userInfoFrom: "cache"
			};
		return "y" === h.env.params.isPreview && (d.previewParam = "isPreview=y"), a && (d.userId = a.userId, d.nick = a.nick), b ? (d.longitude = b.longitude, d.latitude = b.latitude, d.isPosition = !0) : d.isPosition = !1, q = h.mtop.request({
			api: "mtop.taobao.wireless.homepage.guess.item",
			ttid: "123@taobao_h5_1.0.0",
			v: "3.0",
			data: d,
			H5Request: !0
		}).then(function(a) {
			if(a.data && a.data.section) {
				if(i.localStorage) {
					var b = JSON.stringify(a);
					i.localStorage.setItem("MTB_H5INDEX_guessitem_json", b), i.localStorage.setItem("MTB_H5INDEX_guessitem_json_crc", k["default"](b).toString())
				}
				return p.resolve(a)
			}
			return p.reject()
		})["catch"](function() {
			if(i.localStorage) {
				var a, b = i.localStorage.getItem("MTB_H5INDEX_guessitem_json");
				if(b) try {
					return a = JSON.parse(b), p.resolve(a)
				} catch(c) {}
			}
			return p.reject()
		})
	}
	Object.defineProperty(b, "__esModule", {
		value: !0
	}), b.data = f, b.request = g;
	var h = c(9),
		i = c(19),
		j = c(20),
		k = e(j),
		l = c(21),
		m = d(l),
		n = c(22),
		o = (d(n), window),
		p = (o.document, o.Promise),
		q = m.data().then(function(a) {
			var b;
			return i.localStorage && !a.isChanged && (b = i.localStorage.getItem("MTB_H5INDEX_guessitem_json")) ? b : p.reject()
		}).then(function(a) {
			var b = i.localStorage.getItem("MTB_H5INDEX_guessitem_json_crc");
			return b === k["default"](a).toString() ? (a = JSON.parse(a), p.resolve(a)) : p.reject()
		}).then(function(a) {
			var b, c = Date.now();
			return a && a.data && (b = parseInt(a.data.timeStamp) + 60 * parseInt(a.data.interval) * 1e3) && b > c ? p.resolve(a) : p.reject()
		})["catch"](function(a) {
			return p.resolve(null)
		})
}, function(a, b) {
	"use strict";
	Object.defineProperty(b, "__esModule", {
		value: !0
	});
	var c, d, e = window;
	try {
		b.localStorage = c = e.localStorage, c.setItem("@private", "false")
	} catch(f) {
		b.localStorage = c = null
	}
	try {
		b.sessionStorage = d = e.sessionStorage, d.setItem("@private", "false")
	} catch(f) {
		b.sessionStorage = d = null
	}
	b.localStorage = c, b.sessionStorage = d
}, function(a, b) {
	"use strict";

	function c() {
		for(var a, b = [], c = 0; 256 > c; c++) {
			a = c;
			for(var d = 0; 8 > d; d++) a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1;
			b[c] = a
		}
		return b
	}

	function d(a) {
		for(var b = b || (b = c()), d = -1, e = 0; e < a.length; e++) d = d >>> 8 ^ b[255 & (d ^ a.charCodeAt(e))];
		return(-1 ^ d) >>> 0
	}
	Object.defineProperty(b, "__esModule", {
		value: !0
	});
	b["default"] = d, a.exports = b["default"]
}, function(a, b, c) {
	"use strict";

	function d() {
		var a = document.cookie.match(/unb=(\d+)/);
		return a && a[1]
	}

	function e(a, b, c) {
		var d, e, f, g = !1;
		return i.localStorage && (d = i.localStorage.getItem("MTB_H5INDEX_nick"), e = i.localStorage.getItem("MTB_H5INDEX_userId"), f = i.localStorage.getItem("MTB_H5INDEX_isLogin"), g = !1, a === !1 ? (i.localStorage.removeItem("MTB_H5INDEX_nick"), i.localStorage.removeItem("MTB_H5INDEX_userId"), f && "true" !== f || (g = !0), f = !1, i.localStorage.setItem("MTB_H5INDEX_isLogin", "false")) : (f && "false" !== f && b === d && c === e || (g = !0, d = b || d, e = c || e, i.localStorage.setItem("MTB_H5INDEX_nick", d), i.localStorage.setItem("MTB_H5INDEX_userId", e)), f = !0, i.localStorage.setItem("MTB_H5INDEX_isLogin", "true"))), k.resolve({
			userId: e,
			nick: d,
			isLogin: f,
			isChanged: g
		})
	}

	function f() {
		return l
	}

	function g() {
		return l = h.mtop.request({
			api: "mtop.user.getUserSimple",
			v: "1.0",
			data: {
				isSec: "0"
			},
			H5Request: !0
		}).then(function(a) {
			var b = a.data;
			return b.nick && b.userNumId && b.userNumId.match(/^\d+$/) ? e(!0, b.nick + "", b.userNumId + "") : e(!1)
		}, function() {
			return e(!1)
		})
	}
	Object.defineProperty(b, "__esModule", {
		value: !0
	}), b.data = f, b.request = g;
	var h = c(9),
		i = c(19),
		j = window,
		k = (j.document, j.Promise),
		l = e(h.login.isLogin(), h.login.getUserNick(), d())
}, function(a, b, c) {
	"use strict";

	function d() {
		return f || i.resolve(!1)
	}

	function e() {
		return f = new i(function(a, b) {
			h.navigator.geolocation ? h.navigator.geolocation.getCurrentPosition(function(b) {
				var c = {
					latitude: b.coords.latitude,
					longitude: b.coords.longitude
				};
				g.sessionStorage && g.sessionStorage.setItem("MTB_H5INDEX_geolocation", JSON.stringify(c)), a(c)
			}, function() {
				a(!1)
			}) : a(!1)
		})
	}
	Object.defineProperty(b, "__esModule", {
		value: !0
	}), b.data = d, b.request = e;
	var f, g = c(19),
		h = window,
		i = (h.document, h.Promise);
	if(g.sessionStorage) {
		var j = JSON.parse(g.sessionStorage.getItem("MTB_H5INDEX_geolocation") || "{}");
		j.latitude && j.longitude && (f = i.resolve(j))
	}
}, function(a, b, c) {
	"use strict";

	function d() {
		return n.promise
	}

	function e(a, b) {
		var c = h.mtop.config.subDomain,
			d = j.q(".buttons", b),
			e = l.createElement("a");
		e.className = "text", e.innerText = a.nick, e.href = "//h5." + c + ".taobao.com/awp/mtb/mtb.htm#!/awp/mtb/mtb.htm";
		var f = l.createElement("a");
		f.innerText = "退出", f.href = "//login." + c + ".taobao.com/logout.htm?tpl_redirect_url=" + encodeURIComponent(location.href), d.insertBefore(f, d.firstElementChild), d.insertBefore(e, d.firstElementChild)
	}

	function f(a) {
		var b = h.mtop.config.subDomain,
			c = j.q(".buttons", a),
			d = l.createElement("a");
		d.innerText = "登录", d.href = "//login." + b + ".taobao.com/login.htm?tpl_redirect_url=" + encodeURIComponent(location.href);
		var e = l.createElement("a");
		e.innerText = "注册", e.href = "//reg.taobao.com/member/new_register.jhtml?_devenv=MobileDeviceBrowser&tg=" + encodeURIComponent(location.href), c.insertBefore(e, c.firstElementChild), c.insertBefore(d, c.firstElementChild)
	}

	function g(a) {
		var b = i.pagebottom();
		return a.isLogin ? e(a, b) : f(b), n.resolve(b), n.promise
	}
	Object.defineProperty(b, "__esModule", {
		value: !0
	}), b.ready = d, b.render = g;
	var h = c(9),
		i = c(10),
		j = c(13),
		k = window,
		l = k.document,
		m = (k.Promise, k.lib.promise),
		n = m.defer()
}, function(a, b, c) {
	"use strict";

	function d(a) {
		if(a && a.__esModule) return a;
		var b = {};
		if(null != a)
			for(var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
		return b["default"] = a, b
	}

	function e(a) {
		return a && a.__esModule ? a : {
			"default": a
		}
	}

	function f() {
		return r
	}

	function g(a, b) {
		var c = document.cookie.match(/cna=([^;]+)/),
			d = {
				platform: "h5",
				acookie: c && c[1] || "",
				userInfoFrom: "cache"
			};
		return "y" === h.env.params.isPreview && (d.previewParam = "isPreview=y"), a && a.userId && a.nick && (d.userId = a.userId, d.nick = a.nick), b ? (d.longitude = b.longitude, d.latitude = b.latitude, d.isPosition = !0) : d.isPosition = !1, r = h.mtop.request({
			api: "mtop.taobao.wireless.homepage.ac.loadPageContent",
			v: "5.0",
			data: d,
			H5Request: !0
		}).then(function(a) {
			if(a.data && a.data.section) {
				if(i.localStorage) {
					var b = JSON.stringify(a);
					i.localStorage.setItem("MTB_H5INDEX_data_json", b), i.localStorage.setItem("MTB_H5INDEX_data_json_crc", k["default"](b).toString())
				}
				return q.resolve(a)
			}
			return q.reject()
		})["catch"](function() {
			if(i.localStorage) {
				var a, b = i.localStorage.getItem("MTB_H5INDEX_data_json");
				if(b) try {
					return a = JSON.parse(b), q.resolve(a)
				} catch(c) {}
			}
			return q.reject()
		})
	}
	Object.defineProperty(b, "__esModule", {
		value: !0
	}), b.data = f, b.request = g;
	var h = c(9),
		i = c(19),
		j = c(20),
		k = e(j),
		l = c(21),
		m = d(l),
		n = c(22),
		o = d(n),
		p = window,
		q = (p.document, p.Promise),
		r = m.data().then(function(a) {
			var b;
			return i.localStorage && !a.isChanged && (b = i.localStorage.getItem("MTB_H5INDEX_data_json")) ? b : q.reject()
		}).then(function(a) {
			var b = i.localStorage.getItem("MTB_H5INDEX_data_json_crc");
			return b === k["default"](a).toString() ? (a = JSON.parse(a), q.resolve(a)) : q.reject()
		}).then(function(a) {
			var b, c = Date.now();
			return a && a.data && (b = parseInt(a.data.timeStamp) + 60 * parseInt(a.data.interval) * 1e3) && b > c ? q.resolve(a) : q.reject()
		})["catch"](function() {
			return q.race([m.data(), o.data()]).then(g)
		})
}, function(a, b, c) {
	"use strict";

	function d(a) {
		if(a && a.__esModule) return a;
		var b = {};
		if(null != a)
			for(var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
		return b["default"] = a, b
	}
	var e = c(5),
		f = c(16),
		g = d(f),
		h = c(9),
		i = window,
		j = i.document;
	i.addEventListener("resize", function(a) {
		e.pageready().then(function(a) {
			h.animation.requestFrame(function(b) {
				var c = j.documentElement.getBoundingClientRect();
				j.body.style.width = c.width + "px", j.body.style.height = c.height + "px", a.viewport.style.width = c.width + "px", a.viewport.style.height = c.height + "px", g.ready().then(function(a) {
					a.scroll.refresh()
				})
			})
		})
	}, !1)
}, function(a, b, c) {
	"use strict";

	function d(a) {
		if(a && a.__esModule) return a;
		var b = {};
		if(null != a)
			for(var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
		return b["default"] = a, b
	}
	var e = c(9),
		f = (c(7), c(5)),
		g = c(16),
		h = d(g),
		i = window,
		j = (i.document, "//download.alicdn.com/wireless/taobao4android/latest/taobao4android_10002653.apk");
	f.pageready().then(function(a) {
		function b(b) {
			for(var c = b.target; !c.hasAttribute("data-href") && c !== a.viewport && c.parentNode;) c = c.parentNode;
			var d;
			(d = c.getAttribute("data-href")) && (0 === d.indexOf("taobao://") ? e.env.browser.isIEMobile ? location.href = d.replace(/^taobao/, "http") : i.app.jump.tip(d, {
				text: "正在打开手机淘宝...",
				altText: "此功能需要访问客户端才能使用哦！",
				downText: "下载手机淘宝",
				downUrl: e.env.os.isAndroid ? j : "",
				goText: "逛逛别的"
			}) : location.href = d)
		}
		h.ready().then(function(a) {
			a.addEventListener("niceclick", b, !1), a.fixed.bottomElement.addEventListener("click", b, !1)
		})
	})
}, function(a, b, c) {
	"use strict";

	function d(a) {
		if(a && a.__esModule) return a;
		var b = {};
		if(null != a)
			for(var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
		return b["default"] = a, b
	}

	function e() {
		return n.promise
	}

	function f(a) {
		var b = h.q("ul", a),
			c = new g.carrousel(b, {
				autoplay: !0,
				useGesture: !0
			});
		c.playInterval = 4e3;
		var d = h.q(".indicator", a),
			e = new g.indicator({
				direction: "horizontal",
				amount: c.items.length,
				index: 1
			});
		return d.appendChild(e.root), c.addEventListener("change", function() {
			var a = c.items.index,
				b = [c.items.get(a), c.items.get(a + 1)];
			b.map(function(a) {
				return a.querySelector(".lazyimg")
			}).filter(function(a) {
				return !!a
			}).forEach(function(a) {
				a.src = a.getAttribute("dataimg"), a.removeAttribute("dataimg"), a.className = a.className.split(" ").filter(function(a) {
					return "lazyimg" !== a
				}).join(" ")
			}), e.index = a + 1
		}), k.ready().then(function(a) {
			a.scroll.addScrollendHandler(function() {
				a.scroll.isInView(b) ? c.play() : c.stop()
			})
		}), setTimeout(function() {
			c.play()
		}, 2e3), n.resolve(), n.promise
	}
	Object.defineProperty(b, "__esModule", {
		value: !0
	}), b.ready = e, b.attachTo = f;
	var g = (c(9), c(17)),
		h = c(13),
		i = c(5),
		j = c(16),
		k = d(j),
		l = window,
		m = (l.document, l.Promise, l.lib.promise),
		n = m.defer();
	i.pageready().then(function(a) {
		h.qa(".slide-banner", a.viewport).forEach(f)
	})
}, function(a, b, c) {
	"use strict";

	function d() {
		return k.promise
	}

	function e(a) {
		var b = g.q("ul", a),
			c = new f.carrousel(b, {
				useGesture: !0
			}),
			d = g.q(".indicator", a),
			e = new f.indicator({
				direction: "horizontal",
				amount: c.items.length,
				index: 1
			});
		return d.appendChild(e.root), c.addEventListener("change", function() {
			var a = c.items.index;
			e.index = a + 1
		}), k.resolve(), k.promise
	}
	Object.defineProperty(b, "__esModule", {
		value: !0
	}), b.ready = d, b.attachTo = e;
	var f = (c(9), c(17)),
		g = c(13),
		h = c(5),
		i = window,
		j = (i.document, i.Promise, i.lib.promise),
		k = j.defer();
	h.pageready().then(function(a) {
		g.qa(".slide-pager", a.viewport).forEach(e)
	})
}, function(a, b, c) {
	"use strict";

	function d(a) {
		if(a && a.__esModule) return a;
		var b = {};
		if(null != a)
			for(var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
		return b["default"] = a, b
	}

	function e() {
		return n.promise
	}

	function f(a) {
		var b = a.cloneNode(!0),
			c = Date.now(),
			d = parseInt(a.getAttribute("data-server-timestamp")) || c,
			e = a.getAttribute("data-enddate"),
			f = new g.countdown({
				correctDateOffset: parseInt((d - c) / 1e3),
				endDate: e,
				onUpdate: function(c) {
					var d = String(24 * c.days + c.hours),
						e = String(c.minutes),
						f = String(c.seconds);
					h.q('[role="h"]', b).innerHTML = new Array(3 - d.length).join("0") + d, h.q('[role="m"]', b).innerHTML = new Array(3 - e.length).join("0") + e, h.q('[role="s"]', b).innerHTML = new Array(3 - f.length).join("0") + f, a.innerHTML = b.innerHTML
				}
			});
		return f.start(), k.ready().then(function(b) {
			b.scroll.addScrollendHandler(function() {
				b.scroll.isInView(a) ? "hidden" === a.style.visibility && (f.start(), a.style.visibility = "") : "" === a.style.visibility && (f.stop(), a.style.visibility = "hidden")
			}), n.resolve()
		}), n.promise
	}
	Object.defineProperty(b, "__esModule", {
		value: !0
	}), b.ready = e, b.attachTo = f;
	var g = c(9),
		h = c(13),
		i = c(5),
		j = c(16),
		k = d(j),
		l = window,
		m = (l.document, l.Promise, l.lib.promise),
		n = m.defer();
	i.pageready().then(function(a) {
		h.qa('[data-ctrl-name="counter"]', a.viewport).forEach(f)
	})
}, function(a, b, c) {
	"use strict";

	function d(a) {
		if(a && a.__esModule) return a;
		var b = {};
		if(null != a)
			for(var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
		return b["default"] = a, b
	}

	function e() {
		return m.promise
	}

	function f(a) {
		function b() {
			h || (a.style.webkitTransform = "translateY(-" + 100 * g + "%)", a.style.msTransform = "translateY(-" + 100 * g + "%)", a.style.transform = "translateY(-" + 100 * g + "%)", g = (g + 1) % f, e = setTimeout(b, 3e3))
		}

		function c() {
			h && (h = !1, b())
		}

		function d() {
			h || (h = !0, clearTimeout(e))
		}
		var e, f = (a.children, a.childElementCount),
			g = 0,
			h = !1;
		return b(), j.ready().then(function(b) {
			b.scroll.addScrollendHandler(function() {
				b.scroll.isInView(a) ? c() : d()
			})
		}), m.resolve(), m.promise
	}
	Object.defineProperty(b, "__esModule", {
		value: !0
	}), b.ready = e, b.attachTo = f;
	var g = (c(9), c(13)),
		h = c(5),
		i = c(16),
		j = d(i),
		k = window,
		l = (k.document, k.Promise, k.lib.promise),
		m = l.defer();
	h.pageready().then(function(a) {
		g.qa('[data-ctrl-name="toutiao"]', a.viewport).forEach(f)
	})
}, function(a, b, c) {
	"use strict";

	function d(a) {
		if(a && a.__esModule) return a;
		var b = {};
		if(null != a)
			for(var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
		return b["default"] = a, b
	}

	function e() {
		return m.promise
	}

	function f(a) {
		function b() {
			h || (a.style.webkitTransform = "translateY(-" + 100 * g + "%)", a.style.msTransform = "translateY(-" + 100 * g + "%)", a.style.transform = "translateY(-" + 100 * g + "%)", g = (g + 1) % f, e = setTimeout(b, 3e3))
		}

		function c() {
			h && (h = !1, b())
		}

		function d() {
			h || (h = !0, clearTimeout(e))
		}
		var e, f = (a.children, a.childElementCount),
			g = 0,
			h = !1;
		return b(), j.ready().then(function(b) {
			b.scroll.addScrollendHandler(function() {
				b.scroll.isInView(a) ? c() : d()
			})
		}), m.resolve(), m.promise
	}
	Object.defineProperty(b, "__esModule", {
		value: !0
	}), b.ready = e, b.attachTo = f;
	var g = (c(9), c(13)),
		h = c(5),
		i = c(16),
		j = d(i),
		k = window,
		l = (k.document, k.Promise, k.lib.promise),
		m = l.defer();
	h.pageready().then(function(a) {
		g.qa('[data-ctrl-name="t11Headline"]', a.viewport).forEach(f)
	})
}, function(a, b, c) {
	"use strict";

	function d(a) {
		if(a && a.__esModule) return a;
		var b = {};
		if(null != a)
			for(var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
		return b["default"] = a, b
	}

	function e() {
		return m.promise
	}

	function f(a) {
		return h.data().then(function(b) {
			b && b.index && b.index.misc && b.index.misc.topbg && (a.style.backgroundImage = "url(" + b.index.misc.topbg + ")"), m.resolve()
		}), m.promise
	}
	Object.defineProperty(b, "__esModule", {
		value: !0
	}), b.ready = e, b.attachTo = f;
	var g = c(33),
		h = d(g),
		i = c(13),
		j = c(5),
		k = window,
		l = (k.document, k.Promise, k.lib.promise),
		m = l.defer();
	j.pageready().then(function(a) {
		i.qa("header", a.viewport).forEach(f)
	})
}, function(a, b, c) {
	"use strict";

	function d() {
		return f
	}

	function e() {
		if(window.H5INDEX_OP_DATA && window.smartbannerJSON) {
			var a = {
				index: window.H5INDEX_OP_DATA,
				smartbanner: window.smartbannerJSON,
				timestamp: Date.now()
			};
			return h.localStorage && h.localStorage.setItem("MTB_H5INDEX_mtdata_json", JSON.stringify(a)), j.resolve(a)
		}
		return f = g.mtop.request({
			api: "mtop.mt.getDataByIds",
			v: "1.0",
			type: "get",
			dataType: "json",
			data: {
				dataids: "137,217"
			},
			H5Request: !0
		}).then(function(a) {
			var b = {
				index: a.data[137],
				smartbanner: a.data[217],
				timestamp: Date.now()
			};
			return h.localStorage && h.localStorage.setItem("MTB_H5INDEX_mtdata_json", JSON.stringify(b)), b
		})["catch"](function() {
			var a;
			if(h.localStorage) {
				a = h.localStorage.getItem("MTB_H5INDEX_mtdata_json");
				try {
					a = JSON.stringify(a)
				} catch(b) {
					a = null
				}
			}
			return a || {}
		})
	}
	Object.defineProperty(b, "__esModule", {
		value: !0
	}), b.data = d, b.request = e;
	var f, g = c(9),
		h = c(19),
		i = window,
		j = (i.document, i.Promise);
	if(h.localStorage) {
		var k = h.localStorage.getItem("MTB_H5INDEX_mtdata_json");
		try {
			k = JSON.parse(k)
		} catch(l) {
			k = null
		}
		k && Date.now() - k.timestamp < 6e4 && (f = j.resolve(k))
	}
	f || (f = e())
}, function(a, b, c) {
	"use strict";

	function d(a) {
		if(a && a.__esModule) return a;
		var b = {};
		if(null != a)
			for(var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
		return b["default"] = a, b
	}

	function e() {
		function a() {
			l.dispatchEvent(d, "show")
		}

		function b() {
			if(i.localStorage) {
				var a = new Date;
				a.setHours(0), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0), i.localStorage.setItem("MTB_H5INDEX_popad_closedate", a.getTime())
			}
			l.dispatchEvent(d, "hide")
		}
		var c = this,
			d = q.createDocumentFragment(),
			e = q.createElement("div");
		d.appendChild(e), e.setAttribute("data-ctrl-name", "popad"), e.setAttribute("data-dpr", p.dpr), e.innerHTML = '<div class="img"><a class="close" href="javascript:void 0;"></a><a class="callapp" href="javascript:void 0;"></a><a class="back" href="javascript:void 0;"></a></div>';
		var f = e.querySelector(".img"),
			g = e.querySelector(".close"),
			j = e.querySelector(".back"),
			k = e.querySelector(".callapp"),
			m = {};
		Object.defineProperty(this, "viewModel", {
			get: function() {
				return m
			},
			set: function(a) {
				m = a, c.syncViewModel()
			}
		}), this.syncViewModel = function() {
			e.style.backgroundColor = m.bgcolor || "#FFF", f.style.backgroundImage = "url(" + m.img + ")"
		}, this.show = function() {
			var b;
			if(i.localStorage && (b = i.localStorage.getItem("MTB_H5INDEX_popad_closedate"))) {
				var b = parseInt(b || "0"),
					c = Date.now();
				c - b > 864e5 * parseInt(m.interval || "1") && a()
			} else a()
		}, e.addEventListener("click", function(a) {
			var c = a.target;
			return a.preventDefault(), c === g ? b() : c === j ? b() : c === k && h.callapp.gotoPage(m.weburl), !1
		}, !1), this.addEventListener = function() {
			d.addEventListener.apply(d, arguments)
		}, this.removeEventListener = function() {
			d.removeEventListener.apply(d, arguments)
		}, this.remove = function() {
			e.parentNode.removeChild(e)
		}, this.root = d, this.element = e
	}

	function f() {
		return s.promise
	}

	function g(a) {
		return k.data().then(function(b) {
			var c = b.index;
			if(c && c.popAD && "true" === c.popAD.enabled && !h.env.browser.isQQ && !h.env.browser.isUC && !h.env.aliapp) {
				var d = new e;
				d.viewModel = c.popAD, d.addEventListener("show", function() {
					a.appendChild(d.root), o.ready().then(function(a) {
						a.element.style.display = "none"
					})
				}, !1), d.addEventListener("hide", function() {
					d.remove(), o.ready().then(function(a) {
						a.element.style.display = ""
					})
				}, !1), d.show(), s.resolve(d)
			}
		}), s.promise
	}
	Object.defineProperty(b, "__esModule", {
		value: !0
	}), b.ready = f, b.attachTo = g;
	var h = c(9),
		i = c(19),
		j = c(33),
		k = d(j),
		l = c(13),
		m = c(5),
		n = c(16),
		o = d(n),
		p = window,
		q = p.document,
		r = (p.Promise, p.lib.promise),
		s = r.defer();
	m.pageready().then(function(a) {
		g(a.viewport)
	})
}, function(a, b, c) {
	"use strict";

	function d(a) {
		if(a && a.__esModule) return a;
		var b = {};
		if(null != a)
			for(var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
		return b["default"] = a, b
	}

	function e() {
		var a = document.createDocumentFragment(),
			b = document.createElement("div");
		a.appendChild(b), b.setAttribute("data-ctrl-name", "gotop"), b.setAttribute("data-dpr", l.dpr), b.innerHTML = "<span>&#xe603;</span>顶部", this.addEventListener = function() {
			b.addEventListener.apply(b, arguments)
		}, this.removeEventListener = function() {
			b.removeEventListener.apply(b, arguments)
		}, this.show = function() {
			"" === b.style.display && (b.style.display = "block")
		}, this.hide = function() {
			"block" === b.style.display && (b.style.display = "")
		}, this.root = a, this.element = b
	}

	function f() {
		return n.promise
	}

	function g(a) {
		var b = new e;
		return k.ready().then(function(a) {
			b.addEventListener(h.env.browser.isIEMobile ? "click" : "tap", function() {
				a.scroll.scrollTo(0, !0)
			}, !1), a.scroll.addScrollingHandler(function() {
				var c = a.scroll.getScrollTop(),
					d = a.scroll.getViewHeight();
				c > d ? b.show() : d >= c && b.hide()
			}), n.resolve(b)
		}), a.appendChild(b.root), n.promise
	}
	Object.defineProperty(b, "__esModule", {
		value: !0
	}), b.ready = f, b.attachTo = g;
	var h = c(9),
		i = (c(13), c(5)),
		j = c(16),
		k = d(j),
		l = window,
		m = (l.document, l.Promise, l.lib.promise),
		n = m.defer();
	i.pageready().then(function(a) {
		g(a.viewport)
	})
}, function(a, b, c) {
	"use strict";

	function d(a) {
		if(a && a.__esModule) return a;
		var b = {};
		if(null != a)
			for(var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = a[c]);
		return b["default"] = a, b
	}

	function e() {
		function a() {
			n.dispatchEvent(d, "show")
		}

		function b() {
			if(i.localStorage) {
				var a = new Date;
				a.setHours(0), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0), i.localStorage.setItem("MTB_H5INDEX_topsb_closedate", a.getTime())
			}
			n.dispatchEvent(d, "hide")
		}
		var c = this,
			d = document.createDocumentFragment(),
			e = document.createElement("div");
		d.appendChild(e), e.setAttribute("data-ctrl-name", "topsb"), e.setAttribute("data-dpr", r.dpr), e.innerHTML = '<div class="img"><a class="close"></a><a class="callapp"></a><a class="down"></a></div>';
		var f = e.querySelector(".img"),
			g = e.querySelector(".close"),
			j = e.querySelector(".callapp"),
			k = e.querySelector(".down"),
			l = {};
		Object.defineProperty(this, "viewModel", {
			get: function() {
				return l
			},
			set: function(a) {
				l = a, c.syncViewModel()
			}
		}), this.syncViewModel = function() {
			e.style.backgroundColor = l.bgcolor || "#FFF", f.style.backgroundImage = "url(" + l.img + ")"
		}, this.show = function() {
			var b;
			if(i.localStorage && (b = i.localStorage.getItem("MTB_H5INDEX_topsb_closedate"))) {
				var b = parseInt(b || "0"),
					c = Date.now();
				c - b > 864e5 * parseInt(l.interval || "1") && a()
			} else a()
		}, e.addEventListener("click", function(a) {
			var c = a.target;
			return a.preventDefault(), c === g ? b() : c === k ? h.callapp.download(w) : c === j && h.callapp.gotoPage(v), !1
		}, !1), this.addEventListener = function() {
			d.addEventListener.apply(d, arguments)
		}, this.removeEventListener = function() {
			d.removeEventListener.apply(d, arguments)
		}, this.remove = function() {
			e.parentNode.removeChild(e)
		}, this.root = d, this.element = e
	}

	function f() {
		return u.promise
	}

	function g(a) {
		return h.env.browser.isIEMobile || s.all([m.data(), q.ready(), k.ready()]).then(function(a) {
			var b = a[0].index,
				c = a[1],
				d = window["@ali/lib-smartbanner-plus-loader"];
			if(d && b && b.sb && "true" === b.sb.enabled && !h.env.browser.isQQ && !h.env.browser.isUC) d.init({
				bizKey: "taobao"
			}), d.ready(function(a) {
				var b, d = a.getBizText("mainIndex");
				d.href = v, d.showCB = function() {
					this.smartDom.style.position = "relative", this.smartDom.style.zIndex = "0", c.scrollElement.insertBefore(this.smartDom, c.scrollElement.firstElementChild), c.scroll.refresh()
				}, d.hideCB = function() {
					c.scrollElement.removeChild(this.smartDom), c.scroll.refresh()
				}, b = a.sbLogic(d, 1)
			});
			else if(b && b.ucAD && "true" === b.ucAD.enabled && (h.env.browser.isQQ || h.env.browser.isUC)) {
				var f = new e;
				f.viewModel = b.ucAD, f.addEventListener("show", function() {
					c.scrollElement.insertBefore(f.root, c.scrollElement.firstElementChild), c.scroll.refresh()
				}, !1), f.addEventListener("hide", function() {
					f.remove(), c.scroll.refresh()
				}, !1), f.show()
			}
		}), u.promise
	}
	Object.defineProperty(b, "__esModule", {
		value: !0
	}), b.ready = f, b.attachTo = g;
	var h = c(9),
		i = c(19),
		j = c(37),
		k = d(j),
		l = c(33),
		m = d(l),
		n = c(13),
		o = c(5),
		p = c(16),
		q = d(p),
		r = window,
		s = (r.document, r.Promise),
		t = r.lib.promise,
		u = t.defer(),
		v = "taobao://m.taobao.com" + (h.env.os.isAndroid ? "/" : ""),
		w = h.env.os.isAndroid ? "//download.alicdn.com/wireless/taobao4android/latest/taobao4android_10002653.apk" : "";
	o.pageready().then(function(a) {
		g(a.viewport)
	})
}, function(a, b, c) {
	"use strict";

	function d() {
		return h.promise
	}
	Object.defineProperty(b, "__esModule", {
		value: !0
	}), b.ready = d;
	var e = c(5),
		f = window,
		g = (f.Promise, f.lib.promise),
		h = g.defer();
	e.pageready().then(function() {}).then(function() {
		h.resolve()
	})
}, function(a, b, c) {
	"use strict";

	function d() {
		return j.promise
	}

	function e(a) {
		a.addEventListener("click", function(a) {
			a.preventDefault(), location.href = "//s.m.taobao.com/h5?search-btn=&event_submit_do_new_search_auction=1&_input_charset=utf-8&topSearch=1&atype=b&searchfrom=1&action=home%3Aredirect_app_action&from=1"
		}, !1)
	}
	Object.defineProperty(b, "__esModule", {
		value: !0
	}), b.ready = d, b.attachTo = e;
	var f = (c(7), c(9), c(13)),
		g = c(5),
		h = window,
		i = (h.document, h.Promise, h.lib.promise),
		j = i.defer();
	g.pageready().then(function(a) {
		f.qa("#search-placeholder", a.viewport).forEach(e)
	})
}]);