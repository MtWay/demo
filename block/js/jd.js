define("zepto", function(require, exports, t) {
	var _cacheThisModule_;
	var e = function() {
		var t, e, n, i, r = [],
			o = r.concat,
			a = r.filter,
			s = r.slice,
			u = window.document,
			f = {},
			c = {},
			l = {
				"column-count": 1,
				columns: 1,
				"font-weight": 1,
				"line-height": 1,
				opacity: 1,
				"z-index": 1,
				zoom: 1
			},
			h = /^\s*<(\w+|!)[^>]*>/,
			p = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
			d = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
			m = /^(?:body|html)$/i,
			v = /([A-Z])/g,
			g = ["val", "css", "html", "text", "data", "width", "height", "offset"],
			y = ["after", "prepend", "before", "append"],
			b = u.createElement("table"),
			w = u.createElement("tr"),
			x = {
				tr: u.createElement("tbody"),
				tbody: b,
				thead: b,
				tfoot: b,
				td: w,
				th: w,
				"*": u.createElement("div")
			},
			E = /complete|loaded|interactive/,
			T = /^[\w-]*$/,
			S = {},
			j = S.toString,
			C = {},
			O, N, A = u.createElement("div"),
			P = {
				tabindex: "tabIndex",
				readonly: "readOnly",
				"for": "htmlFor",
				"class": "className",
				maxlength: "maxLength",
				cellspacing: "cellSpacing",
				cellpadding: "cellPadding",
				rowspan: "rowSpan",
				colspan: "colSpan",
				usemap: "useMap",
				frameborder: "frameBorder",
				contenteditable: "contentEditable"
			},
			M = Array.isArray || function(t) {
				return t instanceof Array
			};
		C.matches = function(t, e) {
			if(!e || !t || t.nodeType !== 1) return false;
			var n = t.matches || t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
			if(n) return n.call(t, e);
			var i, r = t.parentNode,
				o = !r;
			if(o)(r = A).appendChild(t);
			i = ~C.qsa(r, e).indexOf(t);
			o && A.removeChild(t);
			return i
		};

		function D(t) {
			return t == null ? String(t) : S[j.call(t)] || "object"
		}

		function k(t) {
			return D(t) == "function"
		}

		function F(t) {
			return t != null && t == t.window
		}

		function L(t) {
			return t != null && t.nodeType == t.DOCUMENT_NODE
		}

		function $(t) {
			return D(t) == "object"
		}

		function R(t) {
			return $(t) && !F(t) && Object.getPrototypeOf(t) == Object.prototype
		}

		function _(t) {
			var e = !!t && "length" in t && t.length,
				i = n.type(t);
			return "function" != i && !F(t) && ("array" == i || e === 0 || typeof e == "number" && e > 0 && e - 1 in t)
		}

		function q(t) {
			return a.call(t, function(t) {
				return t != null
			})
		}

		function z(t) {
			return t.length > 0 ? n.fn.concat.apply([], t) : t
		}
		O = function(t) {
			return t.replace(/-+(.)?/g, function(t, e) {
				return e ? e.toUpperCase() : ""
			})
		};

		function I(t) {
			return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
		}
		N = function(t) {
			return a.call(t, function(e, n) {
				return t.indexOf(e) == n
			})
		};

		function W(t) {
			return t in c ? c[t] : c[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
		}

		function Z(t, e) {
			return typeof e == "number" && !l[I(t)] ? e + "px" : e
		}

		function B(t) {
			var e, n;
			if(!f[t]) {
				e = u.createElement(t);
				u.body.appendChild(e);
				n = getComputedStyle(e, "").getPropertyValue("display");
				e.parentNode.removeChild(e);
				n == "none" && (n = "block");
				f[t] = n
			}
			return f[t]
		}

		function V(t) {
			return "children" in t ? s.call(t.children) : n.map(t.childNodes, function(t) {
				if(t.nodeType == 1) return t
			})
		}

		function H(t, e) {
			var n, i = t ? t.length : 0;
			for(n = 0; n < i; n++) this[n] = t[n];
			this.length = i;
			this.selector = e || ""
		}
		C.fragment = function(e, i, r) {
			var o, a, f;
			if(p.test(e)) o = n(u.createElement(RegExp.$1));
			if(!o) {
				if(e.replace) e = e.replace(d, "<$1></$2>");
				if(i === t) i = h.test(e) && RegExp.$1;
				if(!(i in x)) i = "*";
				f = x[i];
				f.innerHTML = "" + e;
				o = n.each(s.call(f.childNodes), function() {
					f.removeChild(this)
				})
			}
			if(R(r)) {
				a = n(o);
				n.each(r, function(t, e) {
					if(g.indexOf(t) > -1) a[t](e);
					else a.attr(t, e)
				})
			}
			return o
		};
		C.Z = function(t, e) {
			return new H(t, e)
		};
		C.isZ = function(t) {
			return t instanceof C.Z
		};
		C.init = function(e, i) {
			var r;
			if(!e) return C.Z();
			else if(typeof e == "string") {
				e = e.trim();
				if(e[0] == "<" && h.test(e)) r = C.fragment(e, RegExp.$1, i), e = null;
				else if(i !== t) return n(i).find(e);
				else r = C.qsa(u, e)
			} else if(k(e)) return n(u).ready(e);
			else if(C.isZ(e)) return e;
			else {
				if(M(e)) r = q(e);
				else if($(e)) r = [e], e = null;
				else if(h.test(e)) r = C.fragment(e.trim(), RegExp.$1, i), e = null;
				else if(i !== t) return n(i).find(e);
				else r = C.qsa(u, e)
			}
			return C.Z(r, e)
		};
		n = function(t, e) {
			return C.init(t, e)
		};

		function U(n, i, r) {
			for(e in i)
				if(r && (R(i[e]) || M(i[e]))) {
					if(R(i[e]) && !R(n[e])) n[e] = {};
					if(M(i[e]) && !M(n[e])) n[e] = [];
					U(n[e], i[e], r)
				} else if(i[e] !== t) n[e] = i[e]
		}
		n.extend = function(t) {
			var e, n = s.call(arguments, 1);
			if(typeof t == "boolean") {
				e = t;
				t = n.shift()
			}
			n.forEach(function(n) {
				U(t, n, e)
			});
			return t
		};
		C.qsa = function(t, e) {
			var n, i = e[0] == "#",
				r = !i && e[0] == ".",
				o = i || r ? e.slice(1) : e,
				a = T.test(o);
			return t.getElementById && a && i ? (n = t.getElementById(o)) ? [n] : [] : t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11 ? [] : s.call(a && !i && t.getElementsByClassName ? r ? t.getElementsByClassName(o) : t.getElementsByTagName(e) : t.querySelectorAll(e))
		};

		function X(t, e) {
			return e == null ? n(t) : n(t).filter(e)
		}
		n.contains = u.documentElement.contains ? function(t, e) {
			return t !== e && t.contains(e)
		} : function(t, e) {
			while(e && (e = e.parentNode))
				if(e === t) return true;
			return false
		};

		function Y(t, e, n, i) {
			return k(e) ? e.call(t, n, i) : e
		}

		function G(t, e, n) {
			n == null ? t.removeAttribute(e) : t.setAttribute(e, n)
		}

		function J(e, n) {
			var i = e.className || "",
				r = i && i.baseVal !== t;
			if(n === t) return r ? i.baseVal : i;
			r ? i.baseVal = n : e.className = n
		}

		function K(t) {
			try {
				return t ? t == "true" || (t == "false" ? false : t == "null" ? null : +t + "" == t ? +t : /^[\[\{]/.test(t) ? n.parseJSON(t) : t) : t
			} catch(e) {
				return t
			}
		}
		n.type = D;
		n.isFunction = k;
		n.isWindow = F;
		n.isArray = M;
		n.isPlainObject = R;
		n.isEmptyObject = function(t) {
			var e;
			for(e in t) return false;
			return true
		};
		n.isNumeric = function(t) {
			var e = Number(t),
				n = typeof t;
			return t != null && n != "boolean" && (n != "string" || t.length) && !isNaN(e) && isFinite(e) || false
		};
		n.inArray = function(t, e, n) {
			return r.indexOf.call(e, t, n)
		};
		n.camelCase = O;
		n.trim = function(t) {
			return t == null ? "" : String.prototype.trim.call(t)
		};
		n.uuid = 0;
		n.support = {};
		n.expr = {};
		n.noop = function() {};
		n.map = function(t, e) {
			var n, i = [],
				r, o;
			if(_(t))
				for(r = 0; r < t.length; r++) {
					n = e(t[r], r);
					if(n != null) i.push(n)
				} else
					for(o in t) {
						n = e(t[o], o);
						if(n != null) i.push(n)
					}
			return z(i)
		};
		n.each = function(t, e) {
			var n, i;
			if(_(t)) {
				for(n = 0; n < t.length; n++)
					if(e.call(t[n], n, t[n]) === false) return t
			} else {
				for(i in t)
					if(e.call(t[i], i, t[i]) === false) return t
			}
			return t
		};
		n.grep = function(t, e) {
			return a.call(t, e)
		};
		if(window.JSON) n.parseJSON = JSON.parse;
		n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
			S["[object " + e + "]"] = e.toLowerCase()
		});
		n.fn = {
			constructor: C.Z,
			length: 0,
			forEach: r.forEach,
			reduce: r.reduce,
			push: r.push,
			sort: r.sort,
			splice: r.splice,
			indexOf: r.indexOf,
			concat: function() {
				var t, e, n = [];
				for(t = 0; t < arguments.length; t++) {
					e = arguments[t];
					n[t] = C.isZ(e) ? e.toArray() : e
				}
				return o.apply(C.isZ(this) ? this.toArray() : this, n)
			},
			map: function(t) {
				return n(n.map(this, function(e, n) {
					return t.call(e, n, e)
				}))
			},
			slice: function() {
				return n(s.apply(this, arguments))
			},
			ready: function(t) {
				if(E.test(u.readyState) && u.body) t(n);
				else u.addEventListener("DOMContentLoaded", function() {
					t(n)
				}, false);
				return this
			},
			get: function(e) {
				return e === t ? s.call(this) : this[e >= 0 ? e : e + this.length]
			},
			toArray: function() {
				return this.get()
			},
			size: function() {
				return this.length
			},
			remove: function() {
				return this.each(function() {
					if(this.parentNode != null) this.parentNode.removeChild(this)
				})
			},
			each: function(t) {
				r.every.call(this, function(e, n) {
					return t.call(e, n, e) !== false
				});
				return this
			},
			filter: function(t) {
				if(k(t)) return this.not(this.not(t));
				return n(a.call(this, function(e) {
					return C.matches(e, t)
				}))
			},
			add: function(t, e) {
				return n(N(this.concat(n(t, e))))
			},
			is: function(t) {
				return this.length > 0 && C.matches(this[0], t)
			},
			not: function(e) {
				var i = [];
				if(k(e) && e.call !== t) this.each(function(t) {
					if(!e.call(this, t)) i.push(this)
				});
				else {
					var r = typeof e == "string" ? this.filter(e) : _(e) && k(e.item) ? s.call(e) : n(e);
					this.forEach(function(t) {
						if(r.indexOf(t) < 0) i.push(t)
					})
				}
				return n(i)
			},
			has: function(t) {
				return this.filter(function() {
					return $(t) ? n.contains(this, t) : n(this).find(t).size()
				})
			},
			eq: function(t) {
				return t === -1 ? this.slice(t) : this.slice(t, +t + 1)
			},
			first: function() {
				var t = this[0];
				return t && !$(t) ? t : n(t)
			},
			last: function() {
				var t = this[this.length - 1];
				return t && !$(t) ? t : n(t)
			},
			find: function(t) {
				var e, i = this;
				if(!t) e = n();
				else if(typeof t == "object") e = n(t).filter(function() {
					var t = this;
					return r.some.call(i, function(e) {
						return n.contains(e, t)
					})
				});
				else if(this.length == 1) e = n(C.qsa(this[0], t));
				else e = this.map(function() {
					return C.qsa(this, t)
				});
				return e
			},
			closest: function(t, e) {
				var i = [],
					r = typeof t == "object" && n(t);
				this.each(function(n, o) {
					while(o && !(r ? r.indexOf(o) >= 0 : C.matches(o, t))) o = o !== e && !L(o) && o.parentNode;
					if(o && i.indexOf(o) < 0) i.push(o)
				});
				return n(i)
			},
			parents: function(t) {
				var e = [],
					i = this;
				while(i.length > 0) i = n.map(i, function(t) {
					if((t = t.parentNode) && !L(t) && e.indexOf(t) < 0) {
						e.push(t);
						return t
					}
				});
				return X(e, t)
			},
			parent: function(t) {
				return X(N(this.pluck("parentNode")), t)
			},
			children: function(t) {
				return X(this.map(function() {
					return V(this)
				}), t)
			},
			contents: function() {
				return this.map(function() {
					return this.contentDocument || s.call(this.childNodes)
				})
			},
			siblings: function(t) {
				return X(this.map(function(t, e) {
					return a.call(V(e.parentNode), function(t) {
						return t !== e
					})
				}), t)
			},
			empty: function() {
				return this.each(function() {
					this.innerHTML = ""
				})
			},
			pluck: function(t) {
				return n.map(this, function(e) {
					return e[t]
				})
			},
			show: function() {
				return this.each(function() {
					this.style.display == "none" && (this.style.display = "");
					if(getComputedStyle(this, "").getPropertyValue("display") == "none") this.style.display = B(this.nodeName)
				})
			},
			replaceWith: function(t) {
				return this.before(t).remove()
			},
			wrap: function(t) {
				var e = k(t);
				if(this[0] && !e) var i = n(t).get(0),
					r = i.parentNode || this.length > 1;
				return this.each(function(o) {
					n(this).wrapAll(e ? t.call(this, o) : r ? i.cloneNode(true) : i)
				})
			},
			wrapAll: function(t) {
				if(this[0]) {
					n(this[0]).before(t = n(t));
					var e;
					while((e = t.children()).length) t = e.first();
					n(t).append(this)
				}
				return this
			},
			wrapInner: function(t) {
				var e = k(t);
				return this.each(function(i) {
					var r = n(this),
						o = r.contents(),
						a = e ? t.call(this, i) : t;
					o.length ? o.wrapAll(a) : r.append(a)
				})
			},
			unwrap: function() {
				this.parent().each(function() {
					n(this).replaceWith(n(this).children())
				});
				return this
			},
			clone: function() {
				return this.map(function() {
					return this.cloneNode(true)
				})
			},
			hide: function() {
				return this.css("display", "none")
			},
			toggle: function(e) {
				return this.each(function() {
					var i = n(this);
					(e === t ? i.css("display") == "none" : e) ? i.show(): i.hide()
				})
			},
			prev: function(t) {
				return n(this.pluck("previousElementSibling")).filter(t || "*")
			},
			next: function(t) {
				return n(this.pluck("nextElementSibling")).filter(t || "*")
			},
			html: function(t) {
				return 0 in arguments ? this.each(function(e) {
					var i = this.innerHTML;
					n(this).empty().append(Y(this, t, e, i))
				}) : 0 in this ? this[0].innerHTML : null
			},
			text: function(t) {
				return 0 in arguments ? this.each(function(e) {
					var n = Y(this, t, e, this.textContent);
					this.textContent = n == null ? "" : "" + n
				}) : 0 in this ? this.pluck("textContent").join("") : null
			},
			attr: function(n, i) {
				var r;
				return typeof n == "string" && !(1 in arguments) ? 0 in this && this[0].nodeType == 1 && (r = this[0].getAttribute(n)) != null ? r : t : this.each(function(t) {
					if(this.nodeType !== 1) return;
					if($(n))
						for(e in n) G(this, e, n[e]);
					else G(this, n, Y(this, i, t, this.getAttribute(n)))
				})
			},
			removeAttr: function(t) {
				return this.each(function() {
					this.nodeType === 1 && t.split(" ").forEach(function(t) {
						G(this, t)
					}, this)
				})
			},
			prop: function(t, e) {
				t = P[t] || t;
				return 1 in arguments ? this.each(function(n) {
					this[t] = Y(this, e, n, this[t])
				}) : this[0] && this[0][t]
			},
			removeProp: function(t) {
				t = P[t] || t;
				return this.each(function() {
					delete this[t]
				})
			},
			data: function(e, n) {
				var i = "data-" + e.replace(v, "-$1").toLowerCase();
				var r = 1 in arguments ? this.attr(i, n) : this.attr(i);
				return r !== null ? K(r) : t
			},
			val: function(t) {
				if(0 in arguments) {
					if(t == null) t = "";
					return this.each(function(e) {
						this.value = Y(this, t, e, this.value)
					})
				} else {
					return this[0] && (this[0].multiple ? n(this[0]).find("option").filter(function() {
						return this.selected
					}).pluck("value") : this[0].value)
				}
			},
			offset: function(t) {
				if(t) return this.each(function(e) {
					var i = n(this),
						r = Y(this, t, e, i.offset()),
						o = i.offsetParent().offset(),
						a = {
							top: r.top - o.top,
							left: r.left - o.left
						};
					if(i.css("position") == "static") a["position"] = "relative";
					i.css(a)
				});
				if(!this.length) return null;
				if(u.documentElement !== this[0] && !n.contains(u.documentElement, this[0])) return {
					top: 0,
					left: 0
				};
				var e = this[0].getBoundingClientRect();
				return {
					left: e.left + window.pageXOffset,
					top: e.top + window.pageYOffset,
					width: Math.round(e.width),
					height: Math.round(e.height)
				}
			},
			css: function(t, i) {
				if(arguments.length < 2) {
					var r = this[0];
					if(typeof t == "string") {
						if(!r) return;
						return r.style[O(t)] || getComputedStyle(r, "").getPropertyValue(t)
					} else if(M(t)) {
						if(!r) return;
						var o = {};
						var a = getComputedStyle(r, "");
						n.each(t, function(t, e) {
							o[e] = r.style[O(e)] || a.getPropertyValue(e)
						});
						return o
					}
				}
				var s = "";
				if(D(t) == "string") {
					if(!i && i !== 0) this.each(function() {
						this.style.removeProperty(I(t))
					});
					else s = I(t) + ":" + Z(t, i)
				} else {
					for(e in t)
						if(!t[e] && t[e] !== 0) this.each(function() {
							this.style.removeProperty(I(e))
						});
						else s += I(e) + ":" + Z(e, t[e]) + ";"
				}
				return this.each(function() {
					this.style.cssText += ";" + s
				})
			},
			index: function(t) {
				return t ? this.indexOf(n(t)[0]) : this.parent().children().indexOf(this[0])
			},
			hasClass: function(t) {
				if(!t) return false;
				return r.some.call(this, function(t) {
					return this.test(J(t))
				}, W(t))
			},
			addClass: function(t) {
				if(!t) return this;
				return this.each(function(e) {
					if(!("className" in this)) return;
					i = [];
					var r = J(this),
						o = Y(this, t, e, r);
					o.split(/\s+/g).forEach(function(t) {
						if(!n(this).hasClass(t)) i.push(t)
					}, this);
					i.length && J(this, r + (r ? " " : "") + i.join(" "))
				})
			},
			removeClass: function(e) {
				return this.each(function(n) {
					if(!("className" in this)) return;
					if(e === t) return J(this, "");
					i = J(this);
					Y(this, e, n, i).split(/\s+/g).forEach(function(t) {
						i = i.replace(W(t), " ")
					});
					J(this, i.trim())
				})
			},
			toggleClass: function(e, i) {
				if(!e) return this;
				return this.each(function(r) {
					var o = n(this),
						a = Y(this, e, r, J(this));
					a.split(/\s+/g).forEach(function(e) {
						(i === t ? !o.hasClass(e) : i) ? o.addClass(e): o.removeClass(e)
					})
				})
			},
			scrollTop: function(e) {
				if(!this.length) return;
				var n = "scrollTop" in this[0];
				if(e === t) return n ? this[0].scrollTop : this[0].pageYOffset;
				return this.each(n ? function() {
					this.scrollTop = e
				} : function() {
					this.scrollTo(this.scrollX, e)
				})
			},
			scrollLeft: function(e) {
				if(!this.length) return;
				var n = "scrollLeft" in this[0];
				if(e === t) return n ? this[0].scrollLeft : this[0].pageXOffset;
				return this.each(n ? function() {
					this.scrollLeft = e
				} : function() {
					this.scrollTo(e, this.scrollY)
				})
			},
			position: function() {
				if(!this.length) return;
				var t = this[0],
					e = this.offsetParent(),
					i = this.offset(),
					r = m.test(e[0].nodeName) ? {
						top: 0,
						left: 0
					} : e.offset();
				i.top -= parseFloat(n(t).css("margin-top")) || 0;
				i.left -= parseFloat(n(t).css("margin-left")) || 0;
				r.top += parseFloat(n(e[0]).css("border-top-width")) || 0;
				r.left += parseFloat(n(e[0]).css("border-left-width")) || 0;
				return {
					top: i.top - r.top,
					left: i.left - r.left
				}
			},
			offsetParent: function() {
				return this.map(function() {
					var t = this.offsetParent || u.body;
					while(t && !m.test(t.nodeName) && n(t).css("position") == "static") t = t.offsetParent;
					return t
				})
			}
		};
		n.fn.detach = n.fn.remove;
		["width", "height"].forEach(function(e) {
			var i = e.replace(/./, function(t) {
				return t[0].toUpperCase()
			});
			n.fn[e] = function(r) {
				var o, a = this[0];
				if(r === t) return F(a) ? a["inner" + i] : L(a) ? a.documentElement["scroll" + i] : (o = this.offset()) && o[e];
				else return this.each(function(t) {
					a = n(this);
					a.css(e, Y(this, r, t, a[e]()))
				})
			}
		});

		function Q(t, e) {
			e(t);
			for(var n = 0, i = t.childNodes.length; n < i; n++) Q(t.childNodes[n], e)
		}
		y.forEach(function(e, i) {
			var r = i % 2;
			n.fn[e] = function() {
				var e, o = n.map(arguments, function(i) {
						var r = [];
						e = D(i);
						if(e == "array") {
							i.forEach(function(e) {
								if(e.nodeType !== t) return r.push(e);
								else if(n.zepto.isZ(e)) return r = r.concat(e.get());
								r = r.concat(C.fragment(e))
							});
							return r
						}
						return e == "object" || i == null ? i : C.fragment(i)
					}),
					a, s = this.length > 1;
				if(o.length < 1) return this;
				return this.each(function(t, e) {
					a = r ? e : e.parentNode;
					e = i == 0 ? e.nextSibling : i == 1 ? e.firstChild : i == 2 ? e : null;
					var f = n.contains(u.documentElement, a);
					o.forEach(function(t) {
						if(s) t = t.cloneNode(true);
						else if(!a) return n(t).remove();
						a.insertBefore(t, e);
						if(f) Q(t, function(t) {
							if(t.nodeName != null && t.nodeName.toUpperCase() === "SCRIPT" && (!t.type || t.type === "text/javascript") && !t.src) {
								var e = t.ownerDocument ? t.ownerDocument.defaultView : window;
								e["eval"].call(e, t.innerHTML)
							}
						})
					})
				})
			};
			n.fn[r ? e + "To" : "insert" + (i ? "Before" : "After")] = function(t) {
				n(t)[e](this);
				return this
			}
		});
		C.Z.prototype = H.prototype = n.fn;
		C.uniq = N;
		C.deserializeValue = K;
		n.zepto = C;
		return n
	}();
	window.Zepto = e;
	window.$ === undefined && (window.$ = e);
	(function(t) {
		var e = 1,
			n, i = Array.prototype.slice,
			r = t.isFunction,
			o = function(t) {
				return typeof t == "string"
			},
			a = {},
			s = {},
			u = "onfocusin" in window,
			f = {
				focus: "focusin",
				blur: "focusout"
			},
			c = {
				mouseenter: "mouseover",
				mouseleave: "mouseout"
			};
		s.click = s.mousedown = s.mouseup = s.mousemove = "MouseEvents";

		function l(t) {
			return t._zid || (t._zid = e++)
		}

		function h(t, e, n, i) {
			e = p(e);
			if(e.ns) var r = d(e.ns);
			return(a[l(t)] || []).filter(function(t) {
				return t && (!e.e || t.e == e.e) && (!e.ns || r.test(t.ns)) && (!n || l(t.fn) === l(n)) && (!i || t.sel == i)
			})
		}

		function p(t) {
			var e = ("" + t).split(".");
			return {
				e: e[0],
				ns: e.slice(1).sort().join(" ")
			}
		}

		function d(t) {
			return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
		}

		function m(t, e) {
			return t.del && (!u && t.e in f) || !!e
		}

		function v(t) {
			return c[t] || u && f[t] || t
		}

		function g(e, i, r, o, s, u, f) {
			var h = l(e),
				d = a[h] || (a[h] = []);
			i.split(/\s/).forEach(function(i) {
				if(i == "ready") return t(document).ready(r);
				var a = p(i);
				a.fn = r;
				a.sel = s;
				if(a.e in c) r = function(e) {
					var n = e.relatedTarget;
					if(!n || n !== this && !t.contains(this, n)) return a.fn.apply(this, arguments)
				};
				a.del = u;
				var l = u || r;
				a.proxy = function(t) {
					t = T(t);
					if(t.isImmediatePropagationStopped()) return;
					t.data = o;
					var i = l.apply(e, t._args == n ? [t] : [t].concat(t._args));
					if(i === false) t.preventDefault(), t.stopPropagation();
					return i
				};
				a.i = d.length;
				d.push(a);
				if("addEventListener" in e) e.addEventListener(v(a.e), a.proxy, m(a, f))
			})
		}

		function y(t, e, n, i, r) {
			var o = l(t);
			(e || "").split(/\s/).forEach(function(e) {
				h(t, e, n, i).forEach(function(e) {
					delete a[o][e.i];
					if("removeEventListener" in t) t.removeEventListener(v(e.e), e.proxy, m(e, r))
				})
			})
		}
		t.event = {
			add: g,
			remove: y
		};
		t.proxy = function(e, n) {
			var a = 2 in arguments && i.call(arguments, 2);
			if(r(e)) {
				var s = function() {
					return e.apply(n, a ? a.concat(i.call(arguments)) : arguments)
				};
				s._zid = l(e);
				return s
			} else if(o(n)) {
				if(a) {
					a.unshift(e[n], e);
					return t.proxy.apply(null, a)
				} else {
					return t.proxy(e[n], e)
				}
			} else {
				throw new TypeError("expected function")
			}
		};
		t.fn.bind = function(t, e, n) {
			return this.on(t, e, n)
		};
		t.fn.unbind = function(t, e) {
			return this.off(t, e)
		};
		t.fn.one = function(t, e, n, i) {
			return this.on(t, e, n, i, 1)
		};
		var b = function() {
				return true
			},
			w = function() {
				return false
			},
			x = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,
			E = {
				preventDefault: "isDefaultPrevented",
				stopImmediatePropagation: "isImmediatePropagationStopped",
				stopPropagation: "isPropagationStopped"
			};

		function T(e, i) {
			if(i || !e.isDefaultPrevented) {
				i || (i = e);
				t.each(E, function(t, n) {
					var r = i[t];
					e[t] = function() {
						this[n] = b;
						return r && r.apply(i, arguments)
					};
					e[n] = w
				});
				e.timeStamp || (e.timeStamp = Date.now());
				if(i.defaultPrevented !== n ? i.defaultPrevented : "returnValue" in i ? i.returnValue === false : i.getPreventDefault && i.getPreventDefault()) e.isDefaultPrevented = b
			}
			return e
		}

		function S(t) {
			var e, i = {
				originalEvent: t
			};
			for(e in t)
				if(!x.test(e) && t[e] !== n) i[e] = t[e];
			return T(i, t)
		}
		t.fn.delegate = function(t, e, n) {
			return this.on(e, t, n)
		};
		t.fn.undelegate = function(t, e, n) {
			return this.off(e, t, n)
		};
		t.fn.live = function(e, n) {
			t(document.body).delegate(this.selector, e, n);
			return this
		};
		t.fn.die = function(e, n) {
			t(document.body).undelegate(this.selector, e, n);
			return this
		};
		t.fn.on = function(e, a, s, u, f) {
			var c, l, h = this;
			if(e && !o(e)) {
				t.each(e, function(t, e) {
					h.on(t, a, s, e, f)
				});
				return h
			}
			if(!o(a) && !r(u) && u !== false) u = s, s = a, a = n;
			if(u === n || s === false) u = s, s = n;
			if(u === false) u = w;
			return h.each(function(n, r) {
				if(f) c = function(t) {
					y(r, t.type, u);
					return u.apply(this, arguments)
				};
				if(a) l = function(e) {
					var n, o = t(e.target).closest(a, r).get(0);
					if(o && o !== r) {
						n = t.extend(S(e), {
							currentTarget: o,
							liveFired: r
						});
						return(c || u).apply(o, [n].concat(i.call(arguments, 1)))
					}
				};
				g(r, e, u, s, a, l || c)
			})
		};
		t.fn.off = function(e, i, a) {
			var s = this;
			if(e && !o(e)) {
				t.each(e, function(t, e) {
					s.off(t, i, e)
				});
				return s
			}
			if(!o(i) && !r(a) && a !== false) a = i, i = n;
			if(a === false) a = w;
			return s.each(function() {
				y(this, e, a, i)
			})
		};
		t.fn.trigger = function(e, n) {
			e = o(e) || t.isPlainObject(e) ? t.Event(e) : T(e);
			e._args = n;
			return this.each(function() {
				if(e.type in f && typeof this[e.type] == "function") this[e.type]();
				else if("dispatchEvent" in this) this.dispatchEvent(e);
				else t(this).triggerHandler(e, n)
			})
		};
		t.fn.triggerHandler = function(e, n) {
			var i, r;
			this.each(function(a, s) {
				i = S(o(e) ? t.Event(e) : e);
				i._args = n;
				i.target = s;
				t.each(h(s, e.type || e), function(t, e) {
					r = e.proxy(i);
					if(i.isImmediatePropagationStopped()) return false
				})
			});
			return r
		};
		("focusin focusout focus blur load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select keydown keypress keyup error").split(" ").forEach(function(e) {
			t.fn[e] = function(t) {
				return 0 in arguments ? this.bind(e, t) : this.trigger(e)
			}
		});
		t.Event = function(t, e) {
			if(!o(t)) e = t, t = e.type;
			var n = document.createEvent(s[t] || "Events"),
				i = true;
			if(e)
				for(var r in e) r == "bubbles" ? i = !!e[r] : n[r] = e[r];
			n.initEvent(t, i, true);
			return T(n)
		}
	})(e);
	(function(t) {
		var e = +new Date,
			n = window.document,
			i, r, o = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
			a = /^(?:text|application)\/javascript/i,
			s = /^(?:text|application)\/xml/i,
			u = "application/json",
			f = "text/html",
			c = /^\s*$/,
			l = n.createElement("a");
		l.href = window.location.href;

		function h(e, n, i) {
			var r = t.Event(n);
			t(e).trigger(r, i);
			return !r.isDefaultPrevented()
		}

		function p(t, e, i, r) {
			if(t.global) return h(e || n, i, r)
		}
		t.active = 0;

		function d(e) {
			if(e.global && t.active++ === 0) p(e, null, "ajaxStart")
		}

		function m(e) {
			if(e.global && !--t.active) p(e, null, "ajaxStop")
		}

		function v(t, e) {
			var n = e.context;
			if(e.beforeSend.call(n, t, e) === false || p(e, n, "ajaxBeforeSend", [t, e]) === false) return false;
			p(e, n, "ajaxSend", [t, e])
		}

		function g(t, e, n, i) {
			var r = n.context,
				o = "success";
			n.success.call(r, t, o, e);
			if(i) i.resolveWith(r, [t, o, e]);
			p(n, r, "ajaxSuccess", [e, n, t]);
			b(o, e, n)
		}

		function y(t, e, n, i, r) {
			var o = i.context;
			i.error.call(o, n, e, t);
			if(r) r.rejectWith(o, [n, e, t]);
			p(i, o, "ajaxError", [n, i, t || e]);
			b(e, n, i)
		}

		function b(t, e, n) {
			var i = n.context;
			n.complete.call(i, e, t);
			p(n, i, "ajaxComplete", [e, n]);
			m(n)
		}

		function w(t, e, n) {
			if(n.dataFilter == x) return t;
			var i = n.context;
			return n.dataFilter.call(i, t, e)
		}

		function x() {}
		t.ajaxJSONP = function(i, r) {
			if(!("type" in i)) return t.ajax(i);
			var o = i.jsonpCallback,
				a = (t.isFunction(o) ? o() : o) || "Zepto" + e++,
				s = n.createElement("script"),
				u = window[a],
				f, c = function(e) {
					t(s).triggerHandler("error", e || "abort")
				},
				l = {
					abort: c
				},
				h;
			if(r) r.promise(l);
			t(s).on("load error", function(e, n) {
				clearTimeout(h);
				t(s).off().remove();
				if(e.type == "error" || !f) {
					y(null, n || "error", l, i, r)
				} else {
					g(f[0], l, i, r)
				}
				window[a] = u;
				if(f && t.isFunction(u)) u(f[0]);
				u = f = undefined
			});
			if(v(l, i) === false) {
				c("abort");
				return l
			}
			window[a] = function() {
				f = arguments
			};
			s.src = i.url.replace(/\?(.+)=\?/, "?$1=" + a);
			n.head.appendChild(s);
			if(i.timeout > 0) h = setTimeout(function() {
				c("timeout")
			}, i.timeout);
			return l
		};
		t.ajaxSettings = {
			type: "GET",
			beforeSend: x,
			success: x,
			error: x,
			complete: x,
			context: null,
			global: true,
			xhr: function() {
				return new window.XMLHttpRequest
			},
			accepts: {
				script: "text/javascript, application/javascript, application/x-javascript",
				json: u,
				xml: "application/xml, text/xml",
				html: f,
				text: "text/plain"
			},
			crossDomain: false,
			timeout: 0,
			processData: true,
			cache: true,
			dataFilter: x
		};

		function E(t) {
			if(t) t = t.split(";", 2)[0];
			return t && (t == f ? "html" : t == u ? "json" : a.test(t) ? "script" : s.test(t) && "xml") || "text"
		}

		function T(t, e) {
			if(e == "") return t;
			return(t + "&" + e).replace(/[&?]{1,2}/, "?")
		}

		function S(e) {
			if(e.processData && e.data && t.type(e.data) != "string") e.data = t.param(e.data, e.traditional);
			if(e.data && (!e.type || e.type.toUpperCase() == "GET" || "jsonp" == e.dataType)) e.url = T(e.url, e.data), e.data = undefined
		}
		t.ajax = function(e) {
			var o = t.extend({}, e || {}),
				a = t.Deferred && t.Deferred(),
				s, u;
			for(i in t.ajaxSettings)
				if(o[i] === undefined) o[i] = t.ajaxSettings[i];
			d(o);
			if(!o.crossDomain) {
				s = n.createElement("a");
				s.href = o.url;
				s.href = s.href;
				o.crossDomain = l.protocol + "//" + l.host !== s.protocol + "//" + s.host
			}
			if(!o.url) o.url = window.location.toString();
			if((u = o.url.indexOf("#")) > -1) o.url = o.url.slice(0, u);
			S(o);
			var f = o.dataType,
				h = /\?.+=\?/.test(o.url);
			if(h) f = "jsonp";
			if(o.cache === false || (!e || e.cache !== true) && ("script" == f || "jsonp" == f)) o.url = T(o.url, "_=" + Date.now());
			if("jsonp" == f) {
				if(!h) o.url = T(o.url, o.jsonp ? o.jsonp + "=?" : o.jsonp === false ? "" : "callback=?");
				return t.ajaxJSONP(o, a)
			}
			var p = o.accepts[f],
				m = {},
				b = function(t, e) {
					m[t.toLowerCase()] = [t, e]
				},
				j = /^([\w-]+:)\/\//.test(o.url) ? RegExp.$1 : window.location.protocol,
				C = o.xhr(),
				O = C.setRequestHeader,
				N;
			if(a) a.promise(C);
			if(!o.crossDomain) b("X-Requested-With", "XMLHttpRequest");
			b("Accept", p || "*/*");
			if(p = o.mimeType || p) {
				if(p.indexOf(",") > -1) p = p.split(",", 2)[0];
				C.overrideMimeType && C.overrideMimeType(p)
			}
			if(o.contentType || o.contentType !== false && o.data && o.type.toUpperCase() != "GET") b("Content-Type", o.contentType || "application/x-www-form-urlencoded");
			if(o.headers)
				for(r in o.headers) b(r, o.headers[r]);
			C.setRequestHeader = b;
			C.onreadystatechange = function() {
				if(C.readyState == 4) {
					C.onreadystatechange = x;
					clearTimeout(N);
					var e, n = false;
					if(C.status >= 200 && C.status < 300 || C.status == 304 || C.status == 0 && j == "file:") {
						f = f || E(o.mimeType || C.getResponseHeader("content-type"));
						if(C.responseType == "arraybuffer" || C.responseType == "blob") e = C.response;
						else {
							e = C.responseText;
							try {
								e = w(e, f, o);
								if(f == "script")(1, eval)(e);
								else if(f == "xml") e = C.responseXML;
								else if(f == "json") e = c.test(e) ? null : t.parseJSON(e)
							} catch(i) {
								n = i
							}
							if(n) return y(n, "parsererror", C, o, a)
						}
						g(e, C, o, a)
					} else {
						y(C.statusText || null, C.status ? "error" : "abort", C, o, a)
					}
				}
			};
			if(v(C, o) === false) {
				C.abort();
				y(null, "abort", C, o, a);
				return C
			}
			var A = "async" in o ? o.async : true;
			C.open(o.type, o.url, A, o.username, o.password);
			if(o.xhrFields)
				for(r in o.xhrFields) C[r] = o.xhrFields[r];
			for(r in m) O.apply(C, m[r]);
			if(o.timeout > 0) N = setTimeout(function() {
				C.onreadystatechange = x;
				C.abort();
				y(null, "timeout", C, o, a)
			}, o.timeout);
			C.send(o.data ? o.data : null);
			return C
		};

		function j(e, n, i, r) {
			if(t.isFunction(n)) r = i, i = n, n = undefined;
			if(!t.isFunction(i)) r = i, i = undefined;
			return {
				url: e,
				data: n,
				success: i,
				dataType: r
			}
		}
		t.get = function() {
			return t.ajax(j.apply(null, arguments))
		};
		t.post = function() {
			var e = j.apply(null, arguments);
			e.type = "POST";
			return t.ajax(e)
		};
		t.getJSON = function() {
			var e = j.apply(null, arguments);
			e.dataType = "json";
			return t.ajax(e)
		};
		t.fn.load = function(e, n, i) {
			if(!this.length) return this;
			var r = this,
				a = e.split(/\s/),
				s, u = j(e, n, i),
				f = u.success;
			if(a.length > 1) u.url = a[0], s = a[1];
			u.success = function(e) {
				r.html(s ? t("<div>").html(e.replace(o, "")).find(s) : e);
				f && f.apply(r, arguments)
			};
			t.ajax(u);
			return this
		};
		var C = encodeURIComponent;

		function O(e, n, i, r) {
			var o, a = t.isArray(n),
				s = t.isPlainObject(n);
			t.each(n, function(n, u) {
				o = t.type(u);
				if(r) n = i ? r : r + "[" + (s || o == "object" || o == "array" ? n : "") + "]";
				if(!r && a) e.add(u.name, u.value);
				else if(o == "array" || !i && o == "object") O(e, u, i, n);
				else e.add(n, u)
			})
		}
		t.param = function(e, n) {
			var i = [];
			i.add = function(e, n) {
				if(t.isFunction(n)) n = n();
				if(n == null) n = "";
				this.push(C(e) + "=" + C(n))
			};
			O(i, e, n);
			return i.join("&").replace(/%20/g, "+")
		}
	})(e);
	(function(t) {
		t.fn.serializeArray = function() {
			var e, n, i = [],
				r = function(t) {
					if(t.forEach) return t.forEach(r);
					i.push({
						name: e,
						value: t
					})
				};
			if(this[0]) t.each(this[0].elements, function(i, o) {
				n = o.type, e = o.name;
				if(e && o.nodeName.toLowerCase() != "fieldset" && !o.disabled && n != "submit" && n != "reset" && n != "button" && n != "file" && (n != "radio" && n != "checkbox" || o.checked)) r(t(o).val())
			});
			return i
		};
		t.fn.serialize = function() {
			var t = [];
			this.serializeArray().forEach(function(e) {
				t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value))
			});
			return t.join("&")
		};
		t.fn.submit = function(e) {
			if(0 in arguments) this.bind("submit", e);
			else if(this.length) {
				var n = t.Event("submit");
				this.eq(0).trigger(n);
				if(!n.isDefaultPrevented()) this.get(0).submit()
			}
			return this
		}
	})(e);
	(function() {
		try {
			getComputedStyle(undefined)
		} catch(t) {
			var e = getComputedStyle;
			window.getComputedStyle = function(t, n) {
				try {
					return e(t, n)
				} catch(i) {
					return null
				}
			}
		}
	})();
	(function(t) {
		function e(t, e) {
			var n = this.os = {},
				i = this.browser = {},
				r = t.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
				o = t.match(/(Android);?[\s\/]+([\d.]+)?/),
				a = !!t.match(/\(Macintosh\; Intel /),
				s = t.match(/(iPad).*OS\s([\d_]+)/),
				u = t.match(/(iPod)(.*OS\s([\d_]+))?/),
				f = !s && t.match(/(iPhone\sOS)\s([\d_]+)/),
				c = t.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
				l = /Win\d{2}|Windows/.test(e),
				h = t.match(/Windows Phone ([\d.]+)/),
				p = c && t.match(/TouchPad/),
				d = t.match(/Kindle\/([\d.]+)/),
				m = t.match(/Silk\/([\d._]+)/),
				v = t.match(/(BlackBerry).*Version\/([\d.]+)/),
				g = t.match(/(BB10).*Version\/([\d.]+)/),
				y = t.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
				b = t.match(/PlayBook/),
				w = t.match(/Chrome\/([\d.]+)/) || t.match(/CriOS\/([\d.]+)/),
				x = t.match(/Firefox\/([\d.]+)/),
				E = t.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/),
				T = t.match(/MSIE\s([\d.]+)/) || t.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
				S = !w && t.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
				j = S || t.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);
			if(i.webkit = !!r) i.version = r[1];
			if(o) n.android = true, n.version = o[2];
			if(f && !u) n.ios = n.iphone = true, n.version = f[2].replace(/_/g, ".");
			if(s) n.ios = n.ipad = true, n.version = s[2].replace(/_/g, ".");
			if(u) n.ios = n.ipod = true, n.version = u[3] ? u[3].replace(/_/g, ".") : null;
			if(h) n.wp = true, n.version = h[1];
			if(c) n.webos = true, n.version = c[2];
			if(p) n.touchpad = true;
			if(v) n.blackberry = true, n.version = v[2];
			if(g) n.bb10 = true, n.version = g[2];
			if(y) n.rimtabletos = true, n.version = y[2];
			if(b) i.playbook = true;
			if(d) n.kindle = true, n.version = d[1];
			if(m) i.silk = true, i.version = m[1];
			if(!m && n.android && t.match(/Kindle Fire/)) i.silk = true;
			if(w) i.chrome = true, i.version = w[1];
			if(x) i.firefox = true, i.version = x[1];
			if(E) n.firefoxos = true, n.version = E[1];
			if(T) i.ie = true, i.version = T[1];
			if(j && (a || n.ios || l)) {
				i.safari = true;
				if(!n.ios) i.version = j[1]
			}
			if(S) i.webview = true;
			n.tablet = !!(s || b || o && !t.match(/Mobile/) || x && t.match(/Tablet/) || T && !t.match(/Phone/) && t.match(/Touch/));
			n.phone = !!(!n.tablet && !n.ipod && (o || f || c || v || g || w && t.match(/Android/) || w && t.match(/CriOS\/([\d.]+)/) || x && t.match(/Mobile/) || T && t.match(/Touch/)))
		}
		e.call(t, navigator.userAgent, navigator.platform);
		t.__detect = e
	})(e);
	(function(t) {
		var e = [],
			n;
		t.fn.remove = function() {
			return this.each(function() {
				if(this.parentNode) {
					if(this.tagName === "IMG") {
						e.push(this);
						this.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
						if(n) clearTimeout(n);
						n = setTimeout(function() {
							e = []
						}, 6e4)
					}
					this.parentNode.removeChild(this)
				}
			})
		}
	})(e);
	(function(t) {
		var e = {},
			n = t.fn.data,
			i = t.camelCase,
			r = t.expando = "Zepto" + +new Date,
			o = [];

		function a(o, a) {
			var u = o[r],
				f = u && e[u];
			if(a === undefined) return f || s(o);
			else {
				if(f) {
					if(a in f) return f[a];
					var c = i(a);
					if(c in f) return f[c]
				}
				return n.call(t(o), a)
			}
		}

		function s(n, o, a) {
			var s = n[r] || (n[r] = ++t.uuid),
				f = e[s] || (e[s] = u(n));
			if(o !== undefined) f[i(o)] = a;
			return f
		}

		function u(e) {
			var n = {};
			t.each(e.attributes || o, function(e, r) {
				if(r.name.indexOf("data-") == 0) n[i(r.name.replace("data-", ""))] = t.zepto.deserializeValue(r.value)
			});
			return n
		}
		t.fn.data = function(e, n) {
			return n === undefined ? t.isPlainObject(e) ? this.each(function(n, i) {
				t.each(e, function(t, e) {
					s(i, t, e)
				})
			}) : 0 in this ? a(this[0], e) : undefined : this.each(function() {
				s(this, e, n)
			})
		};
		t.data = function(e, n, i) {
			return t(e).data(n, i)
		};
		t.hasData = function(n) {
			var i = n[r],
				o = i && e[i];
			return o ? !t.isEmptyObject(o) : false
		};
		t.fn.removeData = function(n) {
			if(typeof n == "string") n = n.split(/\s+/);
			return this.each(function() {
				var o = this[r],
					a = o && e[o];
				if(a) t.each(n || a, function(t) {
					delete a[n ? i(this) : t]
				})
			})
		};
		["remove", "empty"].forEach(function(e) {
			var n = t.fn[e];
			t.fn[e] = function() {
				var t = this.find("*");
				if(e === "remove") t = t.add(this);
				t.removeData();
				return n.call(this)
			}
		})
	})(e);
	(function(t) {
		var e = Array.prototype.slice;

		function n(e) {
			var i = [
					["resolve", "done", t.Callbacks({
						once: 1,
						memory: 1
					}), "resolved"],
					["reject", "fail", t.Callbacks({
						once: 1,
						memory: 1
					}), "rejected"],
					["notify", "progress", t.Callbacks({
						memory: 1
					})]
				],
				r = "pending",
				o = {
					state: function() {
						return r
					},
					always: function() {
						a.done(arguments).fail(arguments);
						return this
					},
					then: function() {
						var e = arguments;
						return n(function(n) {
							t.each(i, function(i, r) {
								var s = t.isFunction(e[i]) && e[i];
								a[r[1]](function() {
									var e = s && s.apply(this, arguments);
									if(e && t.isFunction(e.promise)) {
										e.promise().done(n.resolve).fail(n.reject).progress(n.notify)
									} else {
										var i = this === o ? n.promise() : this,
											a = s ? [e] : arguments;
										n[r[0] + "With"](i, a)
									}
								})
							});
							e = null
						}).promise()
					},
					promise: function(e) {
						return e != null ? t.extend(e, o) : o
					}
				},
				a = {};
			t.each(i, function(t, e) {
				var n = e[2],
					s = e[3];
				o[e[1]] = n.add;
				if(s) {
					n.add(function() {
						r = s
					}, i[t ^ 1][2].disable, i[2][2].lock)
				}
				a[e[0]] = function() {
					a[e[0] + "With"](this === a ? o : this, arguments);
					return this
				};
				a[e[0] + "With"] = n.fireWith
			});
			o.promise(a);
			if(e) e.call(a, a);
			return a
		}
		t.when = function(i) {
			var r = e.call(arguments),
				o = r.length,
				a = 0,
				s = o !== 1 || i && t.isFunction(i.promise) ? o : 0,
				u = s === 1 ? i : n(),
				f, c, l, h = function(t, n, i) {
					return function(r) {
						n[t] = this;
						i[t] = arguments.length > 1 ? e.call(arguments) : r;
						if(i === f) {
							u.notifyWith(n, i)
						} else if(!--s) {
							u.resolveWith(n, i)
						}
					}
				};
			if(o > 1) {
				f = new Array(o);
				c = new Array(o);
				l = new Array(o);
				for(; a < o; ++a) {
					if(r[a] && t.isFunction(r[a].promise)) {
						r[a].promise().done(h(a, l, r)).fail(u.reject).progress(h(a, c, f))
					} else {
						--s
					}
				}
			}
			if(!s) u.resolveWith(l, r);
			return u.promise()
		};
		t.Deferred = n
	})(e);
	(function(t) {
		t.Callbacks = function(e) {
			e = t.extend({}, e);
			var n, i, r, o, a, s, u = [],
				f = !e.once && [],
				c = function(t) {
					n = e.memory && t;
					i = true;
					s = o || 0;
					o = 0;
					a = u.length;
					r = true;
					for(; u && s < a; ++s) {
						if(u[s].apply(t[0], t[1]) === false && e.stopOnFalse) {
							n = false;
							break
						}
					}
					r = false;
					if(u) {
						if(f) f.length && c(f.shift());
						else if(n) u.length = 0;
						else l.disable()
					}
				},
				l = {
					add: function() {
						if(u) {
							var i = u.length,
								s = function(n) {
									t.each(n, function(t, n) {
										if(typeof n === "function") {
											if(!e.unique || !l.has(n)) u.push(n)
										} else if(n && n.length && typeof n !== "string") s(n)
									})
								};
							s(arguments);
							if(r) a = u.length;
							else if(n) {
								o = i;
								c(n)
							}
						}
						return this
					},
					remove: function() {
						if(u) {
							t.each(arguments, function(e, n) {
								var i;
								while((i = t.inArray(n, u, i)) > -1) {
									u.splice(i, 1);
									if(r) {
										if(i <= a) --a;
										if(i <= s) --s
									}
								}
							})
						}
						return this
					},
					has: function(e) {
						return !!(u && (e ? t.inArray(e, u) > -1 : u.length))
					},
					empty: function() {
						a = u.length = 0;
						return this
					},
					disable: function() {
						u = f = n = undefined;
						return this
					},
					disabled: function() {
						return !u
					},
					lock: function() {
						f = undefined;
						if(!n) l.disable();
						return this
					},
					locked: function() {
						return !f
					},
					fireWith: function(t, e) {
						if(u && (!i || f)) {
							e = e || [];
							e = [t, e.slice ? e.slice() : e];
							if(r) f.push(e);
							else c(e)
						}
						return this
					},
					fire: function() {
						return l.fireWith(this, arguments)
					},
					fired: function() {
						return !!i
					}
				};
			return l
		}
	})(e);
	(function(t) {
		var e = t.zepto,
			n = e.qsa,
			i = e.matches;

		function r(e) {
			e = t(e);
			return !!(e.width() || e.height()) && e.css("display") !== "none"
		}
		var o = t.expr[":"] = {
			visible: function() {
				if(r(this)) return this
			},
			hidden: function() {
				if(!r(this)) return this
			},
			selected: function() {
				if(this.selected) return this
			},
			checked: function() {
				if(this.checked) return this
			},
			parent: function() {
				return this.parentNode
			},
			first: function(t) {
				if(t === 0) return this
			},
			last: function(t, e) {
				if(t === e.length - 1) return this
			},
			eq: function(t, e, n) {
				if(t === n) return this
			},
			contains: function(e, n, i) {
				if(t(this).text().indexOf(i) > -1) return this
			},
			has: function(t, n, i) {
				if(e.qsa(this, i).length) return this
			}
		};
		var a = new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*"),
			s = /^\s*>/,
			u = "Zepto" + +new Date;

		function f(t, e) {
			t = t.replace(/=#\]/g, '="#"]');
			var n, i, r = a.exec(t);
			if(r && r[2] in o) {
				n = o[r[2]], i = r[3];
				t = r[1];
				if(i) {
					var s = Number(i);
					if(isNaN(s)) i = i.replace(/^["']|["']$/g, "");
					else i = s
				}
			}
			return e(t, n, i)
		}
		e.qsa = function(i, r) {
			return f(r, function(o, a, f) {
				try {
					var c;
					if(!o && a) o = "*";
					else if(s.test(o)) c = t(i).addClass(u), o = "." + u + " " + o;
					var l = n(i, o)
				} catch(h) {
					console.error("error performing selector: %o", r);
					throw h
				} finally {
					if(c) c.removeClass(u)
				}
				return !a ? l : e.uniq(t.map(l, function(t, e) {
					return a.call(t, e, l, f)
				}))
			})
		};
		e.matches = function(t, e) {
			return f(e, function(e, n, r) {
				return(!e || i(t, e)) && (!n || n.call(t, null, r) === t)
			})
		}
	})(e);
	(function(t) {
		var e = {},
			n, i, r, o, a = 750,
			s;

		function u(t, e, n, i) {
			return Math.abs(t - e) >= Math.abs(n - i) ? t - e > 0 ? "Left" : "Right" : n - i > 0 ? "Up" : "Down"
		}

		function f() {
			o = null;
			if(e.last) {
				e.el.trigger("longTap");
				e = {}
			}
		}

		function c() {
			if(o) clearTimeout(o);
			o = null
		}

		function l() {
			if(n) clearTimeout(n);
			if(i) clearTimeout(i);
			if(r) clearTimeout(r);
			if(o) clearTimeout(o);
			n = i = r = o = null;
			e = {}
		}

		function h(t) {
			return(t.pointerType == "touch" || t.pointerType == t.MSPOINTER_TYPE_TOUCH) && t.isPrimary
		}

		function p(t, e) {
			return t.type == "pointer" + e || t.type.toLowerCase() == "mspointer" + e
		}
		t(document).ready(function() {
			var d, m, v = 0,
				g = 0,
				y, b;
			if("MSGesture" in window) {
				s = new MSGesture;
				s.target = document.body
			}
			t(document).bind("MSGestureEnd", function(t) {
				var n = t.velocityX > 1 ? "Right" : t.velocityX < -1 ? "Left" : t.velocityY > 1 ? "Down" : t.velocityY < -1 ? "Up" : null;
				if(n) {
					e.el.trigger("swipe");
					e.el.trigger("swipe" + n)
				}
			}).on("touchstart MSPointerDown pointerdown", function(i) {
				if((b = p(i, "down")) && !h(i)) return;
				y = b ? i : i.touches[0];
				if(i.touches && i.touches.length === 1 && e.x2) {
					e.x2 = undefined;
					e.y2 = undefined
				}
				d = Date.now();
				m = d - (e.last || d);
				e.el = t("tagName" in y.target ? y.target : y.target.parentNode);
				n && clearTimeout(n);
				e.x1 = y.pageX;
				e.y1 = y.pageY;
				if(m > 0 && m <= 250) e.isDoubleTap = true;
				e.last = d;
				o = setTimeout(f, a);
				if(s && b) s.addPointer(i.pointerId)
			}).on("touchmove MSPointerMove pointermove", function(t) {
				if((b = p(t, "move")) && !h(t)) return;
				y = b ? t : t.touches[0];
				c();
				e.x2 = y.pageX;
				e.y2 = y.pageY;
				v += Math.abs(e.x1 - e.x2);
				g += Math.abs(e.y1 - e.y2)
			}).on("touchend MSPointerUp pointerup", function(o) {
				if((b = p(o, "up")) && !h(o)) return;
				c();
				if(e.x2 && Math.abs(e.x1 - e.x2) > 30 || e.y2 && Math.abs(e.y1 - e.y2) > 30) r = setTimeout(function() {
					if(e.el) {
						e.el.trigger("swipe");
						e.el.trigger("swipe" + u(e.x1, e.x2, e.y1, e.y2))
					}
					e = {}
				}, 0);
				else if("last" in e)
					if(v < 30 && g < 30) {
						i = setTimeout(function() {
							var i = t.Event("tap");
							i.pageX = e.x2 || e.x1 || 0;
							i.pageY = e.y2 || e.y1 || 0;
							i.cancelTouch = l;
							if(e.el) e.el.trigger(i);
							if(e.isDoubleTap) {
								if(e.el) e.el.trigger("doubleTap");
								e = {}
							} else {
								n = setTimeout(function() {
									n = null;
									if(e.el) e.el.trigger("singleTap");
									e = {}
								}, 250)
							}
						}, 0)
					} else {
						e = {}
					}
				v = g = 0
			}).on("touchcancel MSPointerCancel pointercancel", l);
			t(window).on("scroll", l)
		});
		["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(e) {
			t.fn[e] = function(t) {
				return this.on(e, t)
			}
		})
	})(e);
	(function(t) {
		if(t.os.ios) {
			var e = {},
				n;

			function i(t) {
				return "tagName" in t ? t : t.parentNode
			}
			t(document).bind("gesturestart", function(t) {
				var r = Date.now(),
					o = r - (e.last || r);
				e.target = i(t.target);
				n && clearTimeout(n);
				e.e1 = t.scale;
				e.last = r
			}).bind("gesturechange", function(t) {
				e.e2 = t.scale
			}).bind("gestureend", function(n) {
				if(e.e2 > 0) {
					Math.abs(e.e1 - e.e2) != 0 && t(e.target).trigger("pinch") && t(e.target).trigger("pinch" + (e.e1 - e.e2 > 0 ? "In" : "Out"));
					e.e1 = e.e2 = e.last = 0
				} else if("last" in e) {
					e = {}
				}
			});
			["pinch", "pinchIn", "pinchOut"].forEach(function(e) {
				t.fn[e] = function(t) {
					return this.bind(e, t)
				}
			})
		}
	})(e);
	(function(t) {
		t.fn.end = function() {
			return this.prevObject || t()
		};
		t.fn.andSelf = function() {
			return this.add(this.prevObject || t())
		};
		"filter,add,not,eq,first,last,find,closest,parents,parent,children,siblings".split(",").forEach(function(e) {
			var n = t.fn[e];
			t.fn[e] = function() {
				var t = n.apply(this, arguments);
				t.prevObject = this;
				return t
			}
		})
	})(e);
	(function(t) {
		if(String.prototype.trim === t) String.prototype.trim = function() {
			return this.replace(/^\s+|\s+$/g, "")
		};
		if(Array.prototype.reduce === t) Array.prototype.reduce = function(e) {
			if(this === void 0 || this === null) throw new TypeError;
			var n = Object(this),
				i = n.length >>> 0,
				r = 0,
				o;
			if(typeof e != "function") throw new TypeError;
			if(i == 0 && arguments.length == 1) throw new TypeError;
			if(arguments.length >= 2) o = arguments[1];
			else
				do {
					if(r in n) {
						o = n[r++];
						break
					}
					if(++r >= i) throw new TypeError
				} while (true);
			while(r < i) {
				if(r in n) o = e.call(t, o, n[r], r, n);
				r++
			}
			return o
		}
	})();
	return t.exports = exports = e
});
define("cachev1", function(require, exports, module) {
	var _cacheThisModule_;
	var _isSessionAble = true;
	var _isLocalAble = true;
	var checkStorage = function(o) {
		var key = "WXSQ_STOARGE_TEST",
			value;
		try {
			o.setItem(key, 1);
			value = o.getItem(key);
			o.removeItem(key);
			return value == 1;
		} catch(e) {
			return false;
		}
	};
	try {
		_isSessionAble = checkStorage(window.sessionStorage);
		_isLocalAble = checkStorage(window.localStorage);
	} catch(e) {
		_isSessionAble = false;
		_isLocalAble = false;
	}
	if(!_isSessionAble || !_isLocalAble) {
		JD.report.umpBiz({
			bizid: 45,
			operation: 1,
			result: 2,
			source: 0,
			message: "session " + _isSessionAble + "|local " + _isLocalAble
		});
	}
	var isArray = Array.isArray || function(object) {
		return object instanceof Array
	}

	function isWindow(obj) {
		return obj != null && obj == obj.window
	}

	function isObject(obj) {
		return obj != null && typeof(obj) == "object"
	}

	function isPlainObject(obj) {
		return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
	}

	function extend(target, source, deep) {
		for(key in source)
			if(deep && (isPlainObject(source[key]) || isArray(source[key]))) {
				if(isPlainObject(source[key]) && !isPlainObject(target[key]))
					target[key] = {}
				if(isArray(source[key]) && !isArray(target[key]))
					target[key] = []
				extend(target[key], source[key], deep)
			} else if(source[key] !== undefined) target[key] = source[key]
		return target;
	}

	function parseJSON(data) {
		if(!data || typeof(data) != "string") {
			return data;
		}
		data = data.replace(/^\s+|\s+$/g, "");
		if(!data) return data;
		try {
			data = JSON.parse(data);
		} catch(e) {}
		return data;
	};
	var storage = function() {
		var jdStorage = window.sessionStorage;
		var keyPrefix = "WQ_";
		var _setItem = function(key, value, merge, expire, callback) {
			var o = parseJSON(getItem(keyPrefix + key));
			if(o && (merge && isPlainObject(value) && isPlainObject(o.v) || isArray(value) && isArray(o.v))) {
				value = extend(o.v, value, true);
			}
			var v = {
				v: value,
				"t": new Date().getTime(),
				"e": typeof expire != "number" ? "" : expire
			};
			_flush(keyPrefix + key, v, callback);
		};
		var _getItem = function(key) {
			var o = jdStorage.getItem(keyPrefix + key);
			if(!o) return jdStorage.getItem(key);
			o = parseJSON(o);
			var e = o && o.e;
			if(e === 0 || (e && (new Date() - o.t) >= e * 1000)) {
				_removeItem(key);
				return "";
			}
			return o.v;
		};
		var _removeItem = function(key) {
			try {
				jdStorage.removeItem(keyPrefix + key);
			} catch(e) {}
		};
		var _flush = function(key, value, callback) {
			var v = "";
			try {
				v = JSON.stringify(value);
			} catch(e) {
				throw new Error("JSON数据格式异常：" + e.message);
			}
			try {
				jdStorage.setItem(key, v);
				callback && callback(0);
			} catch(e) {
				callback && callback(0);
				setTimeout(function() {
					_clearOut();
					try {
						jdStorage.setItem(key, v);
					} catch(e) {
						JD.report.umpBiz({
							bizid: 45,
							operation: 1,
							result: 1,
							source: 0,
							message: key + "|" + e.message
						});
						return false;
					}
				}, 0);
			}
			return true;
		};
		var _persistence = function(p) {
			jdStorage = p ? window.localStorage : window.sessionStorage;
		}
		var _clearOut = function() {
			var key = "";
			for(var i = jdStorage.length - 1; i >= 0; i--) {
				key = jdStorage.key(i);
				key.indexOf(keyPrefix) == 0 && _getItem(key.slice(keyPrefix.length));
			}
		}
		return {
			setItem: _setItem,
			getItem: _getItem,
			removeItem: _removeItem,
			persistence: _persistence,
			clearOut: _clearOut,
		}
	}();

	function getItem(key) {
		var v = "";
		try {
			v = storage.getItem(key);
		} catch(e) {}
		return v;
	}

	function setItem(key, value, force, merge, expire, callback) {
		typeof expire == "function" && (callback = expire, expire = false);
		typeof merge == "number" && (expire = merge, merge = false);
		typeof merge == "function" && (callback = merge, merge = false);
		typeof force == "function" && (callback = force, force = false);
		typeof force == "number" && (expire = force, force = false);
		if(force && (!expire || typeof expire != "number")) {
			throw new Error("请设置过期时间");
			return false;
		}
		storage.persistence(!!force);
		storage.setItem(key, value, merge, expire, callback);
	}

	function removeItem(key) {
		storage.removeItem(key);
	}
	return {
		getItem: function(key, force) {
			storage.persistence(!!force);
			return getItem(key);
		},
		setItem: function(key, value, force, merge, expire, callback) {
			return setItem(key, value, force, merge, expire, callback);
		},
		removeItem: function(key, force) {
			storage.persistence(!!force);
			return removeItem(key);
		},
		clearOut: function(force) {
			storage.persistence(!!force);
			storage.clearOut();
		},
		session: {
			getItem: function(key) {
				storage.persistence(false);
				return getItem(key);
			},
			setItem: function(key, value, merge, expire, callback) {
				return setItem(key, value, false, merge, expire, callback);
			},
			removeItem: function(key) {
				storage.persistence(false);
				return removeItem(key);
			},
			clearOut: function() {
				storage.persistence(false);
				storage.clearOut();
			},
		},
		local: {
			getItem: function(key) {
				storage.persistence(true);
				return getItem(key);
			},
			setItem: function(key, value, merge, expire, callback) {
				return setItem(key, value, true, merge, expire, callback);
			},
			removeItem: function(key) {
				storage.persistence(true);
				return removeItem(key);
			},
			clearOut: function() {
				storage.persistence(true);
				storage.clearOut();
			},
		}
	}
});
define('ui', function(require, exports, module) {
	var _cacheThisModule_, container = document.body,
		removeAlertCoverDiv = 0;
	var bInit1111Tips = false;
	var goLink = "//wqs.jd.com/my/mywx1111.shtml?p=my1111Record";
	var alertCoverDiv = document.createElement('div');
	alertCoverDiv.className = 'mod_alert_mask show';

	function notNeedLoadCss() {
		var uiCSSUrl2 = 'base/gb/css/gb.min_',
			uiCSSUrl3 = 'wx/gb/css/gb.min_',
			uiCSSUrl4 = 'sq/gb/css/gb.min_',
			uiCSSUrl6 = 'wxsq_dev/gb/css/gb.min_',
			uiCSSUrl7 = 'wxsq_dev/gb/css/failover_gb.min_',
			uiCSSUrl5 = 'mod_alert.min',
			uiCSSUrl8 = 'page_hdcp/gb/css/gb.min_',
			uiCSSUrl9 = 'nb1807/gb/css/gb.min_',
			links = document.getElementsByTagName('link'),
			isHave = false;
		var homeUrl = window.JD ? JD.url.homeUrl : '//wq.jd.com/mcoss/wxportal/mainentry?tpl=index_v5';
		if(location.href.indexOf(homeUrl) > -1) {
			isHave = true;
		}
		for(var i = 0, l = links.length; i < l; i++) {
			if(links[i].rel == 'stylesheet' && (links[i].href.indexOf(uiCSSUrl2) >= 0 || links[i].href.indexOf(uiCSSUrl3) >= 0 || links[i].href.indexOf(uiCSSUrl4) >= 0 || links[i].href.indexOf(uiCSSUrl5) >= 0 || links[i].href.indexOf(uiCSSUrl8) >= 0 || links[i].href.indexOf(uiCSSUrl9) >= 0 || links[i].href.indexOf(uiCSSUrl6) >= 0) || links[i].href.indexOf(uiCSSUrl7) >= 0) {
				isHave = true;
				break;
			}
		}
		return isHave;
	}

	function loadCss(url) {
		if(notNeedLoadCss()) {
			return;
		}
		var l = document.createElement('link');
		l.setAttribute('type', 'text/css');
		l.setAttribute('rel', 'stylesheet');
		l.setAttribute('href', url);
		document.getElementsByTagName("head")[0].appendChild(l);
	}

	function showTip(obj) {
		if(!obj) return;
		var className = obj.className || 'g_small_tips',
			tips = document.querySelector("." + className),
			t = obj.t || 2000,
			title = obj.title || '操作成功!';
		if(!tips) {
			tips = document.createElement('div');
			tips.className = className;
			document.body.appendChild(tips);
		}
		tips.innerText = title;
		tips.style.display = 'block';
		setTimeout(function() {
			tips.style.display = 'none';
		}, t);
	}

	function extend(a, b) {
		for(var i in b) {
			if(b.hasOwnProperty(i)) {
				a[i] = b[i];
			}
		}
		return a;
	}

	function info(opts) {
		var option = {
			msg: "",
			icon: "none",
			delay: 2000,
			showcoverdiv: false
		};
		opts = opts || {};
		extend(option, opts);
		var el = document.createElement('div');
		el.className = "mod_alert show fixed";
		el.innerHTML = (option.icon != 'none' ? ('<i class="icon' + (option.icon != 'info' ? (' icon_' + option.icon) : '') + '"></i>') : '') + '<p>' + option.msg + '</p>';
		container.appendChild(el);
		if(option.showcoverdiv) {
			document.body.appendChild(alertCoverDiv);
			removeAlertCoverDiv++;
		}
		setTimeout(function() {
			clear();
		}, option.delay);

		function clear() {
			if(option.showcoverdiv) {
				removeAlertCoverDiv--;
				removeAlertCoverDiv < 1 && document.body.contains(alertCoverDiv) && document.body.removeChild(alertCoverDiv);
			}
			el.style.display = 'none';
			container.contains(el) && container.removeChild(el);
		}
	}

	function alert(opts) {
		var option = {
				showClose: false,
				msg: "",
				confirmText: '确认',
				icon: "none",
				onConfirm: null,
				stopMove: false,
				btnClass: 'btn_1',
				confirmColor: ""
			},
			stopMove = function(e) {
				e.preventDefault();
			},
			el = document.createElement('div');
		opts = opts || {};
		extend(option, opts);
		option.delay = parseInt(option.delay || 0);
		container = opts.container || container;
		el.className = "mod_alert show fixed";
		el.innerHTML = (option.showClose ? '<span class="close"></span>' : '') + (option.icon != 'none' ? ('<i class="icon' + (option.icon != 'info' ? (' icon_' + option.icon) : '') + '"></i>') : '') + '<p>' + option.msg + '</p>' + (option.subMsg ? '<p class="small">' + option.subMsg + '</p>' : '') + '<p class="btns"><a href="javascript:;" ' + (option.confirmColor ? ('style="color:' + option.confirmColor + '"') : '') + ' class="btn ' + option.btnClass + '">' + option.confirmText + '</a></p>';
		container.appendChild(el);
		option.showClose && (el.querySelector(".close").onclick = function(e) {
			option.onCancel && option.onCancel();
			this.onclick = null;
			clear();
		});
		el.querySelector(".btn").onclick = function(e) {
			option.onConfirm && option.onConfirm();
			this.onclick = null;
			clear();
		};
		option.delay && setTimeout(function() {
			clear();
		}, option.delay);
		document.body.appendChild(alertCoverDiv);
		option.stopMove && document.addEventListener("touchmove", stopMove, false);
		removeAlertCoverDiv++;

		function clear() {
			removeAlertCoverDiv--;
			removeAlertCoverDiv < 1 && document.body.contains(alertCoverDiv) && document.body.removeChild(alertCoverDiv);
			el.style.display = 'none';
			container.contains(el) && container.removeChild(el);
			option.stopMove && document.removeEventListener("touchmove", stopMove, false);
		}
	}

	function confirm(opts) {
		var option = {
			msg: "",
			icon: "none",
			okText: "确定",
			cancelText: "取消",
			onConfirm: null,
			onCancel: null,
			onClearCb: null,
			okClass: 'btn_1',
			cancelClass: 'btn_1',
			cancelColor: "",
			confirmColor: ""
		};
		opts = opts || {};
		extend(option, opts);
		container = opts.container || container;
		var el = document.createElement('div');
		el.className = "mod_alert show fixed";
		el.innerHTML = (option.icon != 'none' ? ('<i class="icon' + (option.icon != 'info' ? (' icon_' + option.icon) : '') + '"></i>') : '') + '<p>' + option.msg + '</p>' + (option.subMsg ? '<p class="small">' + option.subMsg + '</p>' : '') + '<p class="btns"><a href="javascript:;" id="ui_btn_confirm" ' + (option.confirmColor ? ('style="color:' + option.confirmColor + '"') : '') + ' class="btn ' + option.okClass + '">' + option.okText + '</a><a href="javascript:;" id="ui_btn_cancel" ' + (option.cancelColor ? ('style="color:' + option.cancelColor + '"') : '') + ' class="btn ' + option.cancelClass + '">' + option.cancelText + '</a></p>';
		container.appendChild(el);
		document.body.appendChild(alertCoverDiv);
		el.querySelector("#ui_btn_cancel").onclick = function(e) {
			option.onCancel && option.onCancel();
			clear();
		};
		el.querySelector("#ui_btn_confirm").onclick = function(e) {
			option.onConfirm && option.onConfirm();
			clear();
		};
		removeAlertCoverDiv++;

		function clear() {
			removeAlertCoverDiv--;
			el.style.display = 'none';
			container.contains(el) && container.removeChild(el);
			removeAlertCoverDiv < 1 && document.body.contains(alertCoverDiv) && document.body.removeChild(alertCoverDiv);
			option.onClearCb && option.onClearCb();
		}
	}
	var toast = function() {
		var wrap = document.createElement('div');
		wrap.style.cssText = 'text-align: center; position: fixed; z-index: 310; top: 40%; width: 100%;';
		var main = document.createElement('p');
		var mainCssText = 'display: inline-block; padding: 10px 15px; background-color: rgba(0,0,0,.7); border-radius: 4px; color: #fff; font-size: 14px; text-align: left; word-break: break-all; max-width: 70%; transition: opacity .7s;';
		wrap.appendChild(main);
		var timeout;
		return function(opts) {
			var _opts = {
				msg: '',
				style: '',
				delay: 2000
			};
			opts = typeof opts === 'object' ? opts : {
				msg: opts
			};
			_opts = extend(_opts, opts);
			main.innerText = _opts.msg;
			main.style.cssText = mainCssText + _opts.style;
			main.style.opacity = '1';
			document.body.appendChild(wrap);
			clearTimeout(timeout);
			timeout = setTimeout(function() {
				main.style.opacity = '0';
				timeout = setTimeout(function() {
					document.body.removeChild(wrap);
				}, 700);
			}, _opts.delay);
		}
	}();
	loadCss(JD.url.getStaticDisRec("//wq.360buyimg.com/fd/h5/base/gb/css/mod_alert.min_79c590c3.css"));
	module.exports = {
		showTip: showTip,
		toast: toast,
		info: info,
		alert: alert,
		confirm: confirm
	};
});
(function(e, n) {
	var t = "spdtimming.new";
	if(!window.__SPD_AUTO && window.modulejs && typeof define == "function") {
		define(t, n)
	} else {
		n()
	}
})(this, function(require, exports, e) {
	var n = Math.random(),
		t = "spdh5_net",
		o = navigator.userAgent,
		r = window.__DBG_SPD_RPT_URL || (window.__DBG_SPD_PRE || "//fd.3.cn/cesu") + "/r?",
		i = ["navigationStart", "unloadEventStart", "unloadEventEnd", "redirectStart", "redirectEnd", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "requestStart", "responseStart", "responseEnd", "domLoading", "domInteractive", "domContentLoadedEventStart", "domContentLoadedEventEnd", "domComplete", "loadEventStart", "loadEventEnd"],
		a = /(^|\s|;)+MicroMessenger\/([^;\s$]+)/g.exec(o),
		c = /(^|\s|;)+QQ\/([^;\s$]+)/g.exec(o),
		d = /(^|\s|;)+JZYC\/([^;\s$]+)/g.exec(o),
		f = {
			android: [/(Android);?[\s\/]+([\d.]+)?/, [1, 2]],
			ios: [/((iPad)|(iPod)|(iPhone)).*\s+OS\s+([\d_]+)/, function(e) {
				return ["ios", e[5] ? e[5].replace(/_/g, ".") : ""]
			}],
			unknow: [/(Android);?[\s\/]+([\d.]+)?/],
			win: [/(\(|\s)*(Windows)[^\d.]+([\d\.]+).*((WOW64)*)/gi, [2, 3]]
		},
		w = {},
		u = _(),
		s = null,
		l = 0,
		v = false;
	OS = S(o);
	var g = true;

	function p(e, n, t, o, r) {
		if(void 0 == n) {
			if(window.JD && JD.cookie) {
				return JD.cookie.get(e)
			} else {
				var i = document.cookie,
					a;
				if(a = new RegExp("(^|;)\\s*" + e + "=([^;$]+)").exec(document.cookie)) {
					return a[2]
				}
			}
			return null
		} else {
			var i = e + "=" + encodeURIComponent(n);
			t && (i += ";domain=" + t);
			o && (i += ";path=" + o);
			if(r) {
				var c = new Date;
				c.setTime((new Date).getTime() + r * 1e3);
				i += ";expires=" + c.toGMTString()
			}
			document.cookie = i
		}
	}

	function m() {
		var e = (window.performance || window.webkitPerformance || {}).timing;
		if(!e) {
			return null
		}
		return e.navigationStart || e.fetchStart
	}

	function _() {
		return window.screen.width + "," + window.screen.height + "	" + (window.devicePixelRatio || 0) + "	"
	}

	function h(e, n) {
		if(!g) {
			return
		}
		var t = e || window._PFM_TIMING;
		if((!t || t.length < 1) && i.rptStat) {
			return
		}
		if(typeof window.athenaFdSetting == "object") {
			if(window.athenaFdSetting.switch != 1) {
				var o = window.athenaFdSetting.pidWhitelist || "";
				var r = o.split(",");
				var a = r.length;
				var c = false;
				var d = t[0][0];
				for(var f = 0; f < a; f++) {
					if(d == r[f]) {
						c = true;
						break
					}
				}
				if(!c) {
					return
				}
			}
		}
		T(function(e) {
			try {
				y(e, t)
			} catch(n) {
				console.error(n.stack || n)
			}
		})
	}

	function k(e) {
		e && e();
		window.onunload = function() {
			try {
				R.clear();
				h(window._PFM_TIMING, true)
			} catch(e) {
				console.error(e)
			}
		}
	}

	function S(e) {
		var n, t;
		for(var o in f) {
			t = f[o];
			if(t[0] instanceof Function) {
				n = t[0](e);
				return o += n[1] ? " " + n[1] : ""
			} else if(n = t[0].exec(e)) {
				if(t.length > 1) {
					if(t[1] instanceof Function) {
						n = t[1](n)
					} else if(t[1] instanceof Array) {
						n = [n[t[1][0]], n[t[1][1]]]
					}
				}
				return o += n[1] ? " " + n[1] : ""
			}
		}
		return "other"
	}

	function P(e) {
		var n = [];
		for(var t in e) {
			e.hasOwnProperty(t) && n.push(t + "=" + encodeURIComponent(e[t]))
		}
		return n.join("&")
	}

	function E(e) {
		var n = new Image;
		window["_spd_img_cache" + l++] = n;
		n.idx = l;
		n.onload = n.onerror = n.onabort = function(e) {
			var n = e.target;
			n.onload = n.onerror = n.onabort = null;
			delete window["_spd_img_cache" + n.idx]
		};
		n.src = e
	}

	function D(e, n) {
		var t;
		t = function() {
			t.clear();
			var o;
			t.th = setTimeout(function() {
				e.apply(null, o);
				t.th = 0
			}, n)
		};
		t.clear = function() {
			if(t.th) {
				clearTimeout(t.th);
				t.th = 0
			}
		};
		return t
	}

	function T(e) {
		if(window.JD && JD.device) {
			JD.device.getNetwork(e)
		} else {
			var n = /(\s|;)+NetType\/([^\s;\/]+)/g.exec(o);
			if(n && n[2]) {
				var t = "unknow";
				n[2] = n[2].toLowerCase();
				switch(n[2]) {
					case "ctnet":
					case "cmnet":
					case "cunet":
						s = n[2].substr(0, 2);
						t = "3g";
						break;
					case "ctwap":
					case "cmwap":
					case "cuwap":
						s = n[2].substr(0, 2);
						t = "2g";
						break;
					default:
						s = null
				}
				e(t)
			} else {
				try {
					if(a) {
						document.addEventListener("WeixinJSBridgeReady", function(n) {
							console.log("WXReady");
							setTimeout(function() {
								WeixinJSBridge.invoke("getNetworkType", {}, function(n) {
									var t = n.err_msg || "unknow";
									if(t.indexOf(":") != -1) {
										t = t.split(":")[1] || "unknow"
									}
									if(t == "edge") {
										t = "3g"
									} else if(t == "wwan") {
										t = "4g"
									} else if(t == "fail") {
										t = "unknow"
									}
									e(t)
								})
							}, 500)
						})
					} else if(c) {
						if(window.mqq && mqq.device) {
							mqq.invoke("device", "getNetworkInfo", function(n) {
								var t = {
									"-1": "unknow",
									0: "unknow",
									1: "wifi",
									2: "2G",
									3: "3G",
									4: "4G"
								}[n.type] || "unknow";
								e(t)
							})
						} else {
							e("unknow")
						}
					} else if(d) {
						if(window.WQAPI && WQAPI.network) {
							e(String(WQAPI.network.type()).toLowerCase())
						} else {
							e("unknow")
						}
					} else {
						e("unknow")
					}
				} catch(r) {
					console.error("Error", r);
					e("unknow")
				}
			}
		}
	}

	function x(e) {
		if(!e) {
			return 0
		}
		if(e instanceof Date) {
			return e.getTime()
		}
		return e
	}

	function y(e, t) {
		var o = (window.performance || window.webkitPerformance).timing,
			a = m(),
			c, d = !!window.__SPD_RPT_REPEAT,
			f;
		console.log("---RptData--", t);
		var l = 0,
			g = 0,
			_, h = 0,
			k, S = 0,
			D = 0;
		if(t) {
			k = t[0];
			if(!k || !(k instanceof Array)) {
				console.error("Invalide data for report", t);
				return
			}
			l = x(k[1]);
			D = k[0];
			S = k[2] || 0
		}
		if(!l || !D) {
			console.error("Invalide data for report", t);
			return
		}
		g = (window.performance || window.webkitPerformance).now() - ((new Date).getTime() - l);
		var T = {
			pid: D,
			os: OS ? OS.replace(/%20/g, "") : "other",
			apn: (e || "").toLowerCase(),
			wq_area: p("wq_area"),
			_: n = n + 1
		};
		for(var y = 1, R = t.length; y < R; y++) {
			(d || !w[y]) && (_ = t[y]) && (_ = _ - l) > 0 && (T["s" + y] = _) && (w[y] = 1) && h++;
			t[y] = null
		}
		if(window._PFM_PERFORMANCE == true) {
			if(!i.rptStat) {
				i.rptStat = 1;
				for(y = 1, R = i.length; R > y; y++) {
					c = x(o[i[y]]), c = c ? c - a : 0, c > 0 && (T["p" + y] = c) && h++
				}
				T["p" + i.length] = Math.floor(g)
			}
		}
		if(h > 0) {
			if(!v) {
				T["ext"] = u;
				v = true
			}
			s && (T["oper"] = s);
			E(r + P(T))
		}
	}
	var R = D(h, 1e3);
	var I = {
		report: R
	};
	window.__SPD_RPT = I;
	k(function() {
		R()
	});
	if(typeof require == "function" && e) {
		e.exports = exports = I
	} else {
		return I
	}
});
define('login', function(require, exports, module) {
	var _cacheThisModule_;
	exports.isLogin = isLogin;
	exports.validateLogin = function(callback) {
		if(!isLogin()) {
			callback(false);
			return true;
		}
		validateLogin(callback);
	};
	exports.login = login;
	var _LoadingStartTime = new Date();

	function isLogin() {
		var env = getEnv();
		if(env == "jdm" || env == "jdapp" || env == "jdpingou" || env == "kplxcx" || env == "meitu") {
			return true;
		}
		return getWqUin() && getWqSkey();
	}

	function validateLogin(callback) {
		window.validateLoginCallback = function(data) {
			callback(data.iRet != 9999)
		};
		var sceneval = (["jdm", 'jdapp', 'kplxcx', 'meitu', 'jdpingou'].indexOf(getEnv()) >= 0 ? "&sceneval=2" : "");
		JD.sendJs("//wq.jd.com/mlogin/wxv3/LoginCheckJsonp?callback=validateLoginCallback&_t=" + Math.random() + sceneval);
	}

	function login(opt) {
		var option = {
			env: getEnv(),
			scope: false,
			rurl: window.location.href
		};
		for(var i in opt) {
			option[i] = opt[i];
		}
		if(!/^\/\/|^http(?:s?):\/\//.test(option.rurl)) {
			option.rurl = window.location.href;
		}
		option.rurl = option.rurl.replace(/^http(?:s?):\/\//, "//");
		option.rurl = window.location.protocol + option.rurl;
		if(option.env == "jdm") {
			var url = "//passport.m.jd.com/user/login.action?returnurl=" + encodeURIComponent(option.rurl);
			justLogin(url);
		} else if(option.env == "wxwork") {
			var corpid = getCookie("wq_bjd_corpid") || "";
			var rurl = "//wqs.jd.com/bjd/tologin.html?corpid=" + corpid + "&rurl=" + encodeURIComponent(option.rurl);
			justLogin(rurl);
		} else if(option.env == "weixin") {
			var rurl = "//wq.jd.com/mlogin/wxv3/login_BJ?rurl=" + encodeURIComponent(option.rurl) + "&appid=1" + (option.scope ? "&scope=snsapi_userinfo" : "");
			justLogin(rurl);
		} else if(option.env == "jdapp" || option.env == "jdpingou") {
			if(new Date() - _LoadingStartTime <= 3000 && option.env == "jdpingou") {
				window.pingouWebviewNotification = function(res) {
					res = typeof res == "string" ? JSON.parse(res) : res;
					setTimeout(function() {
						if(res && res.fromNative == "login" && (res.state == "-1" || res.state == "-2")) {
							history.go(-1);
						}
					}, 0);
				}
			}
			var rurl = "//wq.jd.com/mlogin/mpage/Login?rurl=" + encodeURIComponent(option.rurl);
			window.location.href = rurl;
		} else if(option.env == "qq") {
			var rurl = "//wq.jd.com/mlogin/h5v1/cpLogin_BJ?rurl=" + encodeURIComponent(option.rurl);
			justLogin(rurl);
		} else if(option.env == "qbxcx") {
			qbxcxLogin(option);
		} else if(option.env == "kplxcx") {
			JD && JD.wxapp && JD.wxapp.isWxapp && JD.wxapp.isWxapp(function(iswxapp) {
				if(iswxapp) {
					var usehash = "#cookie=" + encodeURIComponent('{"appkey":"' + getCookie("appkey") + '","source":"' + getCookie("source") + '","customerinfo":"' + getCookie("customerinfo") + '","wxapp_type":"3"}');
					if(getUrlParam("loginPlugin") == 1) {
						var _pageName = getUrlParam("pageName");
						var _retpages = "";
						if(_pageName == "jshopH5") {
							_retpages = "/pages/jshopH5/jshopH5";
						} else {
							_retpages = "/pages/activityH5/activityH5";
						}
						var rurl = _retpages + '?encode_url=' + encodeURIComponent(/#/.test(location.href) ? location.href.replace(/#?[^#]*$/, usehash) : (location.href + usehash)) + "&kActUrl=" + encodeURIComponent(/#/.test(location.href) ? location.href.replace(/#?[^#]*$/, usehash) : (location.href + usehash));
						JD.wxapp.goto('/pages/login/index/index?' + (getUrlParam("isSwitchTab") == 1 ? 'pageType=switchTab&' : '') + 'returnPage=' + encodeURIComponent(rurl));
					} else {
						var rurl = '/pages/activityH5/activityH5?encode_url=' + encodeURIComponent(/#/.test(location.href) ? location.href.replace(/#?[^#]*$/, usehash) : (location.href + usehash));
						JD.wxapp.goto('/pages/login/login?returnpage=' + encodeURIComponent(rurl));
					}
				} else {
					var rurl = "//wq.jd.com/mlogin/wxv3/login_BJ?rurl=" + encodeURIComponent(option.rurl) + "&appid=1" + (option.scope ? "&scope=snsapi_userinfo" : "");
					justLogin(rurl);
				}
			});
		} else if(option.env == 'meitu') {
			rurl = "//plogin.m.jd.com/user/login.action?appid=856&oauthlogin=MEITU&returnurl=" + encodeURIComponent(option.rurl);
			justLogin(rurl);
		} else {
			var rurl = "//wq.jd.com/mlogin/mpage/Login?rurl=" + encodeURIComponent(option.rurl);
			justLogin(rurl);
		}
	}

	function justLogin(rurl) {
		if(window.__isLoginJumping) return;
		window.__isLoginJumping = 1;
		window.location.href = rurl;
		setTimeout(function() {
			window.__isLoginJumping = 0;
			JD.report.umpBiz({
				bizid: 47,
				operation: 46,
				result: 1,
				source: 0,
				message: JD.device.scene
			});
			if(window.__loginRetryDisable) return;
			window.location.href = rurl;
		}, 5000);
	}

	function getWqUin() {
		return getCookie("wq_uin");
	}

	function getWqSkey() {
		return getCookie("wq_skey");
	}

	function getCookie(name) {
		var reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)"),
			val = document.cookie.match(reg);
		return val ? (val[2] ? unescape(val[2]) : "") : null;
	}

	function reportUMP(biz, op, result, msg) {
		JD.report.umpBiz({
			bizid: biz,
			operation: op,
			result: result,
			source: '0',
			message: msg || ""
		});
	}

	function qbxcxLogin(opt) {
		var t = setTimeout(function() {
			reportUMP(649, 5, 100);
		}, 4000);
		if(!window.QBJSBridge) {
			document.addEventListener("QBJSBridgeReady", qbReady, false)
		} else {
			qbReady()
		}

		function qbReady(count) {
			count = count || 0;
			if(count > 1) return true;
			count++;
			if(window.__isQB) {
				window.qbbridge.login({
					appkey: 'jd',
					type: "3",
					success: function(data) {
						var ticket = data.ticket;
						if(ticket) {
							reportUMP(649, 5, 0);
							clearTimeout(t);
							var flag = "&";
							if(opt.rurl.indexOf("?") < 0) {
								flag = "?";
							}
							opt.rurl += flag + "t=" + Date.now();
							justLogin('https://wq.jd.com/mlogin/wxv3/LoginQBApp_H5?ticket=' + encodeURI(ticket) + '&rurl=' + encodeURIComponent(opt.rurl))
							return true;
						}
						reportUMP(649, 5, 101);
						clearTimeout(t);
						qbReady(count);
					},
					fail: function(err) {
						reportUMP(649, 5, err.code);
						clearTimeout(t);
						qbReady(count);
					}
				})
				return true;
			}
			reportUMP(649, 5, 102);
			clearTimeout(t);
			qbReady(count);
		}
	}

	function getUrlParam(name) {
		var u = arguments[1] || window.location.search,
			reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", 'i'),
			r = u.substr(u.indexOf("\?") + 1).match(reg);
		return r != null ? r[2] : "";
	}

	function getEnv() {
		var ua = navigator.userAgent.toLowerCase();
		if(/com\.meitu\.myxj/.test(ua)) {
			return 'meitu';
		} else if(JD.wxapp && JD.wxapp.wxappType == 3) {
			return "kplxcx";
		} else if(JD.wxapp && JD.wxapp.wxappType == 5) {
			return "qbxcx";
		} else if(/jdpingou/.test(ua)) {
			return "jdpingou";
		} else if(/jdapp;/.test(ua)) {
			return "jdapp";
		} else if(/(\.|^)m\.jd\.com/.test(window.location.hostname) || /[?&]sceneval=2/.test(window.location.search)) {
			return "jdm";
		} else if(/micromessenger(\/[\d\.]+)*/.test(ua) && /wxwork/.test(ua)) {
			return "wxwork";
		} else if(/micromessenger(\/[\d\.]+)*/.test(ua)) {
			return "weixin";
		} else if(/qq\/(\/[\d\.]+)*/.test(ua) || /qzone\//.test(ua)) {
			return "qq";
		} else {
			return "h5";
		}
	}
});
define("tpl_jd.searchV3", function(require, exports, module) {
	var _cacheThisModule_, ins = {};
	exports.template = function(it) {
		return com(it);
	}

	function com(it) {
		var out = '';
		return out;
	}
	exports.child_filterTpl = function(it) {
		var out = ' <ul class="mod_list"> <li data-filter="area" rd="0-9-5" class="arrow_li"> <div class="list_inner li_line" rd="0-9-5"> <div class="big" rd="0-9-5">配送至</div> <div class="right color_red" rd="0-9-5">';
		if(it.areaName) {
			out += '' + (it.areaName) + '';
		} else {
			out += '' + (it.area2.join('-').replace(/\-+$/, '')) + '';
		}
		out += '</div> </div> </li> </ul> <ul class="tags_selection"> <li data-filter="dSide" rd="0-9-';
		if(it.dSideId == '1') {
			out += '7';
		} else {
			out += '6';
		}
		out += '" ord="0-9-6" crd="0-9-7" class="option ';
		if(it.dSideId == '1') {
			out += 'selected';
		}
		out += '"> <a href="javascript:void(0)" rd="0-9-';
		if(it.dSideId == '1') {
			out += '7';
		} else {
			out += '6';
		}
		out += '">京东物流</a> </li> ';
		if(it.vipdisShow && !it.isPingouSearch) {
			out += ' <li data-filter="vipdis" rd="0-9-';
			if(it.vipdis == '1') {
				out += '37';
			} else {
				out += '36';
			}
			out += '" ord="0-9-36" crd="0-9-37" class="option ';
			if(it.vipdis == '1') {
				out += 'selected';
			}
			out += '"> <a href="javascript:void(0)" rd="0-9-';
			if(it.vipdis == '1') {
				out += '37';
			} else {
				out += '36';
			}
			out += '">京尊达</a> </li> ';
		}
		out += ' <li data-filter="rstore" rd="0-9-';
		if(it.redisstore == '1') {
			out += '11';
		} else {
			out += '10';
		}
		out += '" ord="0-9-10" crd="0-9-11" class="option ';
		if(it.redisstore == '1') {
			out += 'selected';
		}
		out += '"> <a href="javascript:void(0)" rd="0-9-';
		if(it.redisstore == '1') {
			out += '11';
		} else {
			out += '10';
		}
		out += '">有货优先</a> </li> <li data-filter="cashond" rd="0-9-';
		if(it.cashond == '1') {
			out += '9';
		} else {
			out += '8';
		}
		out += '" ord="0-9-8" crd="0-9-9" class="option ';
		if(it.cashond == '1') {
			out += 'selected';
		}
		out += '"> <a href="javascript:void(0)" rd="0-9-';
		if(it.cashond == '1') {
			out += '9';
		} else {
			out += '8';
		}
		out += '">货到付款</a> </li> ';
		if(it.zy211Show) {
			out += ' <li data-filter="zy211" rd="0-9-';
			if(it.zy211 == '1') {
				out += '15';
			} else {
				out += '14';
			}
			out += '" ord="0-9-14" crd="0-9-15" class="option ';
			if(it.zy211 == '1') {
				out += 'selected';
			}
			out += '"> <a href="javascript:void(0)" rd="0-9-';
			if(it.zy211 == '1') {
				out += '15';
			} else {
				out += '14';
			}
			out += '">自营211</a> </li> ';
		}
		out += ' ';
		if(it.newItemShow) {
			out += ' <li data-filter="newitem" rd="0-9-';
			if(it.newItems == '1') {
				out += '19';
			} else {
				out += '18';
			}
			out += '" ord="0-9-18" crd="0-9-19" class="option ';
			if(it.newItems == '1') {
				out += 'selected';
			}
			out += '"> <a href="javascript:void(0)" rd="0-9-';
			if(it.newItems == '1') {
				out += '19';
			} else {
				out += '18';
			}
			out += '">新品</a> </li> ';
		}
		out += ' ';
		if(!it.isPingouSearch) {
			out += ' <li data-filter="gloabal" rd="0-9-';
			if(it.gloabal == '1') {
				out += '33';
			} else {
				out += '32';
			}
			out += '" ord="0-9-32" crd="0-9-33" class="option ';
			if(it.gloabal == '1') {
				out += 'selected';
			}
			out += '"> <a href="javascript:void(0)" rd="0-9-';
			if(it.gloabal == '1') {
				out += '33';
			} else {
				out += '32';
			}
			out += '">海囤全球</a> </li> ';
		}
		out += ' ';
		if(it.plusShow && !it.isPingouSearch) {
			out += ' <li data-filter="plus" rd="0-9-';
			if(it.plus == '1') {
				out += '56';
			} else {
				out += '55';
			}
			out += '" ord="0-9-55" crd="0-9-56" class="option ';
			if(it.plus == '1') {
				out += 'selected';
			}
			out += '"> <a href="javascript:void(0)" rd="0-9-';
			if(it.plus == '1') {
				out += '56';
			} else {
				out += '55';
			}
			out += '">PLUS专享价</a> </li> ';
		}
		out += ' ';
		if(!it.isPingouSearch) {
			out += ' <li data-filter="promo" rd="0-9-';
			if(it.promo == '1') {
				out += '13';
			} else {
				out += '12';
			}
			out += '" ord="0-9-12" crd="0-9-13" class="option ';
			if(it.promo == '1') {
				out += 'selected';
			}
			out += '"> <a href="javascript:void(0)" rd="0-9-';
			if(it.promo == '1') {
				out += '13';
			} else {
				out += '12';
			}
			out += '">促销商品</a> </li> ';
		}
		out += ' ';
		if(it.disgloabalShow && !it.isPingouSearch) {
			out += ' <li data-filter="disgloabal" rd="0-9-';
			if(it.disgloabal == '1') {
				out += '35';
			} else {
				out += '34';
			}
			out += '" ord="0-9-34" crd="0-9-35" class="option ';
			if(it.disgloabal == '1') {
				out += 'selected';
			}
			out += '"> <a href="javascript:void(0)" rd="0-9-';
			if(it.disgloabal == '1') {
				out += '35';
			} else {
				out += '34';
			}
			out += '">配送全球</a> </li> ';
		}
		out += ' ';
		if(it.artworkShow && !it.isPingouSearch) {
			out += ' <li data-filter="artwork" rd="0-9-';
			if(it.artwork == '1') {
				out += '37';
			} else {
				out += '36';
			}
			out += '" ord="0-9-36" crd="0-9-37" class="option ';
			if(it.artwork == '1') {
				out += 'selected';
			}
			out += '"> <a href="javascript:void(0)" rd="0-9-';
			if(it.artwork == '1') {
				out += '37';
			} else {
				out += '36';
			}
			out += '">艺术品</a> </li> ';
		}
		out += ' ';
		if(it.pgShow && !it.isPingouSearch) {
			out += ' <li data-filter="pgitem" rd="0-9-70" ord="0-9-70" crd="0-9-70" class="option ';
			if(it.pgitem == '1') {
				out += 'selected';
			}
			out += '"> <a href="javascript:void(0)">拼购商品</a> </li> ';
		}
		out += ' ';
		if(it.actInfo) {
			var it2 = it.actInfo;
			out += ' <li data-filter="actsel" ico="' + (it2.actMark) + '" rd="' + (it2.mrd) + '" ord="' + (it2.mrd) + '" crd="' + (it2.mcrd) + '" class="option ';
			if(it2.actCheck != '0') {
				out += 'selected';
			}
			out += '"> <a href="javascript:void(0)" rd="' + (it2.mrd) + '">' + (it2.actname) + '</a> </li> ';
		}
		out += ' </ul> ';
		if(it.hasCategory == '1') {
			out += ' <ul class="mod_list"> <li class="arrow_li" data-filter="category" rd="0-9-16"> <div class="list_inner li_line" rd="0-9-16"> <div class="big" rd="0-9-16">分类</div> <div class="right" rd="0-9-16">' + (it.categorystr) + '</div> </div> </li> </ul> ';
		}
		out += ' <ul class="mod_list"> <li class="super_li no_arrow"> <div class="list_inner"> <div class="li_line"> <div class="big">价格</div> <div class="right"></div> </div> </div> </li> <li class="filterlayer_price"> <div class="filterlayer_price_area"> <input type="tel" class="filterlayer_price_area_input" id="filterPriceMin" ';
		if(it.priceMin != -1) {
			out += 'value="' + (it.priceMin) + '" data-val="' + (it.priceMin) + '"';
		}
		out += ' placeholder="最低价"> <div class="filterlayer_price_area_hyphen"></div> <input type="tel" class="filterlayer_price_area_input" id="filterPriceMax" ';
		if(it.priceMax != 100000000 && it.priceMax != -1) {
			out += 'value="' + (it.priceMax) + '" data-val="' + (it.priceMax) + '"';
		}
		out += ' placeholder="最高价"> </div> <div class="filterlayer_price_choices"> ';
		for(var i = 0; i < it.priceRanges.length; i++) {
			var range = it.priceRanges[i],
				checked = range.start == it.priceMin && range.end == it.priceMax,
				ord = 57 + i * 2,
				crd = 58 + i * 2;
			out += ' <div class="filterlayer_price_choice ';
			if(checked) {
				out += 'active';
			}
			out += '" data-filter="priceRange" start="' + (range.start) + '" end="' + (range.end) + '" text="&yen;' + (range.start) + '-&yen;' + (range.end) + '" rd="0-9-';
			if(checked) {
				out += '' + (crd) + '';
			} else {
				out += '' + (ord) + '';
			}
			out += '" ord="0-9-' + (ord) + '" crd="0-9-' + (crd) + '"> <div class="filterlayer_price_choice_text">' + (range.start) + '-' + (range.end) + '</div> <div class="filterlayer_price_choice_tips">' + (range.percent) + '%选择</div> </div> ';
		}
		out += ' </div> </li> </ul> <ul class="mod_list"> ';
		for(var i = 0, l = it.attrs.length; i < l; i++) {
			out += ' ';
			if(it.attrs[i].tid === 'brand') {
				out += ' <li class="arrow_li" data-filter="brand" rd="0-9-17" ord="0-9-17" crd="0-9-18"> <div class="list_inner li_line" rd="0-9-17"> <div class="big" rd="0-9-17">品牌</div> <div class="right" rd="0-9-17"><span class="words_10" rd="0-9-17" r-mark="brand" slen="' + (it.brandLen) + '">' + (it.brandStr) + '</span></div> </div> </li> ';
			} else {
				out += ' <li class="arrow_li" data-filter="' + (it.attrs[i].tid) + '" rd="0-9-27" ord="0-9-27" crd="0-9-28"> <div class="list_inner li_line" rd="0-9-27"> <div class="big" rd="0-9-27">' + (it.attrs[i].name) + '</div> <div class="right" rd="0-9-27"><span class="words_10" rd="0-9-27" r-mark="' + (it.attrs[i].tid) + '" slen="' + (it.attrs[i].valueLen) + '">' + (it.attrs[i].valueStr) + '</span></div> </div> </li> ';
			}
			out += ' ';
		}
		out += ' ';
		if(it.hasPublishers == '1') {
			out += ' <li class="arrow_li" data-filter="publishers" rd="0-9-27"> <div class="list_inner li_line" rd="0-9-27"> <div class="big" rd="0-9-27">出版社</div> <div class="right" rd="0-9-27"><span class="words_10" rd="0-9-27" r-mark="publishers" slen="' + (it.publishersLen) + '">' + (it.publishersStr) + '</span></div> </div> </li> ';
		}
		out += ' ';
		if(it.hasPackage == '1') {
			out += ' <li class="arrow_li" data-filter="package" rd="0-9-27"> <div class="list_inner li_line" rd="0-9-27"> <div class="big" rd="0-9-27">包装</div> <div class="right" rd="0-9-27"><span class="words_10" rd="0-9-27" r-mark="package" slen="' + (it.packageLen) + '">' + (it.packageStr) + '</span></div> </div> </li> ';
		}
		out += ' ';
		if(it.hasMedia == '1') {
			out += ' <li class="arrow_li" data-filter="media" rd="0-9-27"> <div class="list_inner li_line" rd="0-9-27"> <div class="big" rd="0-9-27">介质</div> <div class="right" rd="0-9-27"><span class="words_10" rd="0-9-27" r-mark="media" slen="' + (it.mediaLen) + '">' + (it.mediaStr) + '</span></div> </div> </li> ';
		}
		out += ' ';
		if(it.hasDregion == '1') {
			out += ' <li class="arrow_li" data-filter="dregion" rd="0-9-27"> <div class="list_inner li_line" rd="0-9-27"> <div class="big" rd="0-9-27">地区</div> <div class="right" rd="0-9-27"><span class="words_10" rd="0-9-27" r-mark="dregion" slen="' + (it.dregionLen) + '">' + (it.dregionStr) + '</span></div> </div> </li> ';
		}
		out += ' ';
		if(it.hasPackstate == '1') {
			out += ' <li class="arrow_li" data-filter="packstate" rd="0-9-27"> <div class="list_inner li_line" rd="0-9-27"> <div class="big" rd="0-9-27">是否套装</div> <div class="right" rd="0-9-27"><span class="words_10" rd="0-9-27" r-mark="packstate">' + (it.packstateStr) + '</span></div> </div> </li> ';
		}
		out += ' </ul> <div id="filterClearBtn" class="s_btn ';
		if(it.selectCount <= 0) {
			out += 'disabled';
		}
		out += '" disb="' + (it.selectCount) + '" rd="0-9-4">清除选项</div>';
		return out;;
	}
	exports.child_filterV2Tpl = function(it) {
		var out = ' <ul class="mod_list"> <li data-filter="area" rd="0-9-5" class="arrow_li"> <div class="list_inner li_line"> <div class="big">配送至</div> <div class="right color_red">';
		if(it.areaName) {
			out += '' + (it.areaName) + '';
		} else {
			out += '' + (it.area2.join('-').replace(/\-+$/, '')) + '';
		}
		out += '</div> </div> </li> </ul> <ul class="tags_selection"> <li data-filter="dSide" rd="0-9-';
		if(it.dSideId == '1') {
			out += '7';
		} else {
			out += '6';
		}
		out += '" ord="0-9-6" crd="0-9-7" class="option ';
		if(it.dSideId == '1') {
			out += 'selected';
		}
		out += '"> <a href="javascript:void(0)">京东物流</a> </li> ';
		if(it.vipdisShow && !it.isPingouSearch) {
			out += ' <li data-filter="vipdis" rd="0-9-';
			if(it.vipdis == '1') {
				out += '37';
			} else {
				out += '36';
			}
			out += '" ord="0-9-36" crd="0-9-37" class="option ';
			if(it.vipdis == '1') {
				out += 'selected';
			}
			out += '"> <a href="javascript:void(0)">京尊达</a> </li> ';
		}
		out += ' <li data-filter="rstore" rd="0-9-';
		if(it.redisstore == '1') {
			out += '11';
		} else {
			out += '10';
		}
		out += '" ord="0-9-10" crd="0-9-11" class="option ';
		if(it.redisstore == '1') {
			out += 'selected';
		}
		out += '"> <a href="javascript:void(0)">有货优先</a> </li> <li data-filter="cashond" rd="0-9-';
		if(it.cashond == '1') {
			out += '9';
		} else {
			out += '8';
		}
		out += '" ord="0-9-8" crd="0-9-9" class="option ';
		if(it.cashond == '1') {
			out += 'selected';
		}
		out += '"> <a href="javascript:void(0)">货到付款</a> </li> ';
		if(it.zy211Show) {
			out += ' <li data-filter="zy211" rd="0-9-';
			if(it.zy211 == '1') {
				out += '15';
			} else {
				out += '14';
			}
			out += '" ord="0-9-14" crd="0-9-15" class="option ';
			if(it.zy211 == '1') {
				out += 'selected';
			}
			out += '"> <a href="javascript:void(0)">自营211</a> </li> ';
		}
		out += ' ';
		if(it.newItemShow) {
			out += ' <li data-filter="newitem" rd="0-9-';
			if(it.newItems == '1') {
				out += '19';
			} else {
				out += '18';
			}
			out += '" ord="0-9-18" crd="0-9-19" class="option ';
			if(it.newItems == '1') {
				out += 'selected';
			}
			out += '"> <a href="javascript:void(0)">新品</a> </li> ';
		}
		out += ' ';
		if(!it.isPingouSearch) {
			out += ' <li data-filter="gloabal" rd="0-9-';
			if(it.gloabal == '1') {
				out += '33';
			} else {
				out += '32';
			}
			out += '" ord="0-9-32" crd="0-9-33" class="option ';
			if(it.gloabal == '1') {
				out += 'selected';
			}
			out += '"> <a href="javascript:void(0)">海囤全球</a> </li> ';
		}
		out += ' ';
		if(it.plusShow && !it.isPingouSearch) {
			out += ' <li data-filter="plus" rd="0-9-';
			if(it.plus == '1') {
				out += '56';
			} else {
				out += '55';
			}
			out += '" ord="0-9-55" crd="0-9-56" class="option ';
			if(it.plus == '1') {
				out += 'selected';
			}
			out += '"> <a href="javascript:void(0)">PLUS专享价</a> </li> ';
		}
		out += ' ';
		if(!it.isPingouSearch) {
			out += ' <li data-filter="promo" rd="0-9-';
			if(it.promo == '1') {
				out += '13';
			} else {
				out += '12';
			}
			out += '" ord="0-9-12" crd="0-9-13" class="option ';
			if(it.promo == '1') {
				out += 'selected';
			}
			out += '"> <a href="javascript:void(0)">促销商品</a> </li> ';
		}
		out += ' ';
		if(it.disgloabalShow && !it.isPingouSearch) {
			out += ' <li data-filter="disgloabal" rd="0-9-';
			if(it.disgloabal == '1') {
				out += '35';
			} else {
				out += '34';
			}
			out += '" ord="0-9-34" crd="0-9-35" class="option ';
			if(it.disgloabal == '1') {
				out += 'selected';
			}
			out += '"> <a href="javascript:void(0)">配送全球</a> </li> ';
		}
		out += ' ';
		if(it.artworkShow && !it.isPingouSearch) {
			out += ' <li data-filter="artwork" rd="0-9-';
			if(it.artwork == '1') {
				out += '37';
			} else {
				out += '36';
			}
			out += '" ord="0-9-36" crd="0-9-37" class="option ';
			if(it.artwork == '1') {
				out += 'selected';
			}
			out += '"> <a href="javascript:void(0)">艺术品</a> </li> ';
		}
		out += ' ';
		if(it.pgShow && !it.isPingouSearch) {
			out += ' <li data-filter="pgitem" rd="0-9-70" ord="0-9-70" crd="0-9-70" class="option ';
			if(it.pgitem == '1') {
				out += 'selected';
			}
			out += '"> <a href="javascript:void(0)">拼购商品</a> </li> ';
		}
		out += ' ';
		if(it.actInfo) {
			var it2 = it.actInfo;
			out += ' <li data-filter="actsel" ico="' + (it2.actMark) + '" rd="' + (it2.mrd) + '" ord="' + (it2.mrd) + '" crd="' + (it2.mcrd) + '" class="option ';
			if(it2.actCheck != '0') {
				out += 'selected';
			}
			out += '"> <a href="javascript:void(0)">' + (it2.actname) + '</a> </li> ';
		}
		out += ' </ul> ';
		if(it.hasCategory == '1') {
			out += ' <ul class="mod_list"> <li class="arrow_li" data-filter="category" rd="0-9-16"> <div class="list_inner li_line" rd="0-9-16"> <div class="big" rd="0-9-16">分类</div> <div class="right" rd="0-9-16">' + (it.categorystr) + '</div> </div> </li> </ul> ';
		}
		out += ' <ul class="mod_list"> <li> <div class="list_inner"> <div class="li_line"> <div class="big">价格</div> <div class="right"></div> </div> </div> </li> <li class="filterlayer_price"> <div class="filterlayer_price_area"> <input type="tel" class="filterlayer_price_area_input" id="filterPriceMin" ';
		if(it.priceMin != -1) {
			out += 'value="' + (it.priceMin) + '" data-val="' + (it.priceMin) + '"';
		}
		out += ' placeholder="最低价"> <div class="filterlayer_price_area_hyphen"></div> <input type="tel" class="filterlayer_price_area_input" id="filterPriceMax" ';
		if(it.priceMax != 100000000 && it.priceMax != -1) {
			out += 'value="' + (it.priceMax) + '" data-val="' + (it.priceMax) + '"';
		}
		out += ' placeholder="最高价"> </div> <div class="filterlayer_price_choices"> ';
		for(var i = 0; i < it.priceRanges.length; i++) {
			var range = it.priceRanges[i],
				checked = range.start == it.priceMin && range.end == it.priceMax,
				ord = 57 + i * 2,
				crd = 58 + i * 2;
			out += ' <div class="filterlayer_price_choice ';
			if(checked) {
				out += 'active';
			}
			out += '" data-filter="priceRange" start="' + (range.start) + '" end="' + (range.end) + '" text="&yen;' + (range.start) + '-&yen;' + (range.end) + '" rd="0-9-';
			if(checked) {
				out += '' + (crd) + '';
			} else {
				out += '' + (ord) + '';
			}
			out += '" ord="0-9-' + (ord) + '" crd="0-9-' + (crd) + '"> <div class="filterlayer_price_choice_text">' + (range.start) + '-' + (range.end) + '</div> <div class="filterlayer_price_choice_tips">' + (range.percent) + '%选择</div> </div> ';
		}
		out += ' </div> </li> </ul> ';
		for(var i = 0, l = it.attrs.length; i < l; i++) {
			var attr = it.attrs[i];
			out += ' <ul class="mod_list"> <li> <div class="list_inner li_line"> <div class="big">' + (attr.name) + '</div> ';
			if(['brand', 'publishers', 'package', 'media', 'dregion', 'packstate'].indexOf(attr.tid) > -1) {
				out += ' <div class="right"><span class="words_10" r-mark="' + (attr.tid) + '" slen="' + (it[attr.tid + 'Len']) + '">' + (it[attr.tid + 'Str']) + '</span></div> ';
			} else {
				out += ' <div class="right"><span class="words_10" r-mark="' + (attr.tid) + '" slen="' + (attr.valueLen) + '">' + (attr.valueStr) + '</span></div> ';
			}
			out += ' </div> </li> <div class="tags_selection"> ';
			for(var j = 0; j < it.outerAttrs[attr.tid].length; j++) {
				var tag = it.outerAttrs[attr.tid][j];
				out += ' ';
				if(tag.datamark != 'more') {
					out += ' <div class="option ';
					if(tag.check) {
						out += 'selected';
					}
					out += '" data-filtertype="' + (tag.datamark) + '" tid="' + (tag.tid) + '" cname="' + (tag.name) + '" extid="' + (tag.extid) + '" rd="0-9-65" ord="0-9-65" crd="0-9-66"><a href="javascript:void 0;">' + (tag.name) + '</a></div> ';
				} else {
					out += ' <div class="option arrow" data-filter="' + (attr.tid) + '" rd="0-9-67"><a href="javascript:void 0;">' + (tag.name) + '</a><div class="big" style="display: none;">' + (attr.name) + '</div></div> ';
				}
				out += ' ';
			}
			out += ' </div> </ul> ';
		}
		out += ' <!-- <div id="filterClearBtn" class="s_btn ';
		if(it.selectCount <= 0) {
			out += 'disabled';
		}
		out += '" disb="' + (it.selectCount) + '" rd="0-9-4">清除选项</div> -->';
		return out;;
	}
	exports.child_brandTpl = function(it) {
		var out = ' <ul class="mod_list padding_left" id="filAllBrand"> ';
		for(var i = 0, l = it.allBrandList.length; i < l; i++) {
			var it2 = it.allBrandList[i];
			out += ' ';
			if(it2.letter) {
				out += ' <li class="letter_li" letter="' + (it2.letter) + '">' + (it2.letter) + '</li> ';
			} else {
				out += ' <li class="check_li ';
				if(it2.check) {
					out += 'checked';
				}
				out += '" filter-type="' + (it2.datamark) + '" tid="' + (it2.tid) + '" tname="' + (it2.name) + '" extid="' + (it2.extid) + '" cname="' + (it2.name) + '" rd="';
				if(it2.check) {
					out += '' + (it.crd) + '';
				} else {
					out += '' + (it.ord) + '';
				}
				out += '" ord="' + (it.ord) + '" crd="' + (it.crd) + '"> <div class="big">' + (it2.name) + '</div> <div class="right"></div> </li> ';
			}
			out += ' ';
		}
		out += ' </ul>';
		return out;;
	}
	exports.child_filterExtSinTpl = function(it) {
		var out = ' <ul class="mod_list padding_left"> ';
		for(var i = 0, l = it.list.length; i < l; i++) {
			var it2 = it.list[i];
			out += ' <li filter-type="' + (it2.datamark) + '" class="check_li';
			if(it2.check) {
				out += ' checked';
			}
			out += '" tid="' + (it2.tid) + '" cname="' + (it2.name) + '" rd="0-13-2" ord="0-13-2" crd=""> <div class="big" rd="0-13-2">' + (it2.name) + '</div> </li> ';
		}
		out += ' </ul>';
		return out;;
	}
	exports.child_filterExtTpl = function(it) {
		var out = ' <ul class="mod_list padding_left"> ';
		for(var i = 0, l = it.list.length; i < l; i++) {
			var it2 = it.list[i];
			out += ' ';
			if(it.mul) {
				out += ' <li class="check_li';
				if(it2.check) {
					out += ' checked';
				}
				out += '" filter-type="' + (it2.datamark) + '" tid="' + (it2.tid) + '" tname="' + (it2.name) + '" extid="' + (it2.extid) + '" cname="' + (it2.name) + '" rd="' + (it.rd) + '" ord="' + (it.rd) + '" crd="' + (it.crd) + '"> <div class="list_inner li_line" rd="' + (it.rd) + '"> <div class="big" rd="' + (it.rd) + '">' + (it2.name) + '</div> <div class="right" rd="' + (it.rd) + '">&nbsp;</div> </div> </li> ';
			} else {
				out += ' <li class="check_li';
				if(it2.check) {
					out += ' checked';
				}
				out += '" filter-type="' + (it2.datamark) + '" tid="' + (it2.tid) + '" tname="' + (it2.name) + '" extid="' + (it2.extid) + '" cname="' + (it2.name) + '" rd="' + (it.rd) + '" ord="' + (it.rd) + '" crd="' + (it.crd) + '"> <div class="big" rd="' + (it.rd) + '">' + (it2.name) + '</div> </li> ';
			}
			out += ' ';
		}
		out += ' </ul>';
		return out;;
	}
	exports.child_filterCategoryTpl = function(it) {
		var out = ' <ul class="mod_list padding_left"> ';
		if(it.hasAll) {
			out += ' <li class="check_li ';
			if(it.isAll) {
				out += 'checked';
			}
			out += '" filter-type="category" cid="0" cname="全部分类" fname="全部分类" rd="0-11-2"> <div class="list_inner li_line" rd="0-11-2"> <div class="big" rd="0-11-2">全部分类<span class="small"></span></div> </div> </li> ';
		}
		out += ' ';
		for(var k = 0, len = it.list.length; k < len; ++k) {
			var it2 = it.list[k];
			out += ' <li class="super_li ';
			if(it2.open) {
				out += 'opened';
			}
			out += '"> <div class="list_inner"> <div class="li_line"> <div class="big">' + (it2.Name) + '</div> <div class="right"></div> </div> <ul class="sub_list ';
			if(!it2.open) {
				out += 'hide';
			}
			out += '"> <li class="check_li ';
			if(it2.check) {
				out += 'checked';
			}
			out += '" filter-type="category" level="2" cid="' + (it2.Classification) + '" cname="' + (it2.Name) + '" fname="' + (it2.Name) + '" rd="0-11-5"> <div class="list_inner li_line" rd="0-11-5"> <div class="big" rd="0-11-5">全部<span class="small" rd="0-11-5">(' + (it2.Count) + ')</span></div> </div> </li> ';
			for(var i = 0, l = it2.childs.length; i < l; ++i) {
				var it3 = it2.childs[i];
				out += ' <li class="check_li ';
				if(it3.check) {
					out += 'checked';
				}
				out += '" level="3" filter-type="category" cid="' + (it3.Classification) + '" cname="' + (it3.Name) + '" fname="' + (it2.Name) + '/' + (it3.Name) + '" rd="0-11-5"> <div class="list_inner li_line" rd="0-11-5"> <div class="big" rd="0-11-5">' + (it3.Name) + '<span class="small" rd="0-11-5">(' + (it3.Count) + ')</span></div> </div> </li> ';
			}
			out += ' </ul> </div> </li> ';
		}
		out += ' </ul>';
		return out;;
	}
	exports.child_barDsideTpl = function(it) {
		var out = ' ';
		var disarea = it.areaId && it.areaId.length > 0 && it.areaId[0] > 100;
		out += ' ';
		if(disarea && it.disgloabalShow && !it.isPingouSearch) {
			out += '<li data-filter="disgloabal" rd="0-24-';
			if(it.disgloabal == '1') {
				out += '25';
			} else {
				out += '24';
			}
			out += '" ord="0-24-24" crd="0-24-25" class="';
			if(it.disgloabal == '1') {
				out += 'selected';
			}
			out += '">配送全球</li>';
		}
		out += ' <li data-filter="dSide" rd="0-24-';
		if(it.dSideId == '1') {
			out += '13';
		} else {
			out += '12';
		}
		out += '" ord="0-24-12" crd="0-24-13" class="';
		if(it.dSideId == '1') {
			out += 'selected';
		}
		out += '">京东物流</li> ';
		if(it.vipdisShow && !it.isPingouSearch) {
			out += '<li data-filter="vipdis" rd="0-24-';
			if(it.vipdis == '1') {
				out += '62';
			} else {
				out += '61';
			}
			out += '" ord="0-24-61" crd="0-24-62" class="';
			if(it.vipdis == '1') {
				out += 'selected';
			}
			out += '">京尊达</li>';
		}
		out += ' ';
		if(it.zy211Show) {
			out += '<li data-filter="zy211" rd="0-24-';
			if(it.zy211 == '1') {
				out += '23';
			} else {
				out += '22';
			}
			out += '" ord="0-24-22" crd="0-24-23" class="';
			if(it.zy211 == '1') {
				out += 'selected';
			}
			out += '">自营211</li>';
		}
		out += ' <li data-filter="rstore" rd="0-24-';
		if(it.redisstore == '1') {
			out += '15';
		} else {
			out += '14';
		}
		out += '" ord="0-24-14" crd="0-24-15" class="';
		if(it.redisstore == '1') {
			out += 'selected';
		}
		out += '">有货优先</li> <li data-filter="cashond" rd="0-24-';
		if(it.cashond == '1') {
			out += '17';
		} else {
			out += '16';
		}
		out += '" ord="0-24-16" crd="0-24-17" class="';
		if(it.cashond == '1') {
			out += 'selected';
		}
		out += '">货到付款</li> ';
		if(!it.isPingouSearch) {
			out += '<li data-filter="gloabal" rd="0-24-';
			if(it.gloabal == '1') {
				out += '19';
			} else {
				out += '18';
			}
			out += '" ord="0-24-18" crd="0-24-19" class="';
			if(it.gloabal == '1') {
				out += 'selected';
			}
			out += '">海囤全球</li>';
		}
		out += ' ';
		if(it.plusShow && !it.isPingouSearch) {
			out += '<li data-filter="plus" rd="0-24-';
			if(it.plus == '1') {
				out += '72';
			} else {
				out += '71';
			}
			out += '" ord="0-24-71" crd="0-24-72" class="';
			if(it.plus == '1') {
				out += 'selected';
			}
			out += '">PLUS专享价</li>';
		}
		out += ' ';
		if(!it.isPingouSearch) {
			out += '<li data-filter="promo" rd="0-24-';
			if(it.promo == '1') {
				out += '21';
			} else {
				out += '20';
			}
			out += '" ord="0-24-20" crd="0-24-21" class="';
			if(it.promo == '1') {
				out += 'selected';
			}
			out += '">促销商品</li>';
		}
		out += ' ';
		if(!disarea && it.disgloabalShow && !it.isPingouSearch) {
			out += '<li data-filter="disgloabal" rd="0-24-';
			if(it.disgloabal == '1') {
				out += '25';
			} else {
				out += '24';
			}
			out += '" ord="0-24-24" crd="0-24-25" class="';
			if(it.disgloabal == '1') {
				out += 'selected';
			}
			out += '">配送全球</li>';
		}
		out += ' ';
		if(it.artworkShow && !it.isPingouSearch) {
			out += '<li data-filter="artwork" rd="0-24-';
			if(it.artwork == '1') {
				out += '64';
			} else {
				out += '63';
			}
			out += '" ord="0-24-63" crd="0-24-64" class="';
			if(it.artwork == '1') {
				out += 'selected';
			}
			out += '">艺术品</li>';
		}
		out += '';
		return out;;
	}
	exports.child_barPriceTpl = function(it) {
		var out = ' <ul class="selection radio line_cols_1 hide" fmark="' + (it.mark) + '"> ';
		for(var i = 0, l = it.list.length; i < l; i++) {
			var it2 = it.list[i];
			out += ' <li filter-type="price" class="';
			if(it2.check) {
				out += 'selected';
			}
			out += '" min="' + (it2.start) + '" max="' + (it2.end) + '" cname="&yen;' + (it2.start) + ' - &yen;' + (it2.end) + '" rd="0-9-24" ord="0-9-24" crd="">&yen;' + (it2.start) + ' - &yen;' + (it2.end) + '</li> ';
		}
		out += ' </ul>';
		return out;;
	}
	exports.child_barCategoryTpl = function(it) {
		var out = ' <ul class="selection radio line_cols_2 hide" fmark="' + (it.mark) + '"> ';
		if(it.hasAll) {
			out += '<li ';
			if(it.def) {
				out += 'class="selected"';
			}
			out += ' filter-type="category" cid="0" cname="全部分类" fname="全部分类" rd="' + (it.ord) + '">全部分类</li>';
		}
		out += ' ';
		for(var k = 0, cou = 0, len = it.list.length; k < len && cou < 50; ++k) {
			var it2 = it.list[k];
			out += ' ';
			for(var i = 0, l = it2.childs.length; i < l && cou < 50; ++i, ++cou) {
				var it3 = it2.childs[i];
				out += ' <li filter-type="category" ';
				if(it3.check) {
					out += 'class="selected"';
				}
				out += ' cid="' + (it3.Classification) + '" cname="' + (it3.Name) + '" fname="' + (it2.Name) + '/' + (it3.Name) + '" rd="' + (it.ord) + '">' + (it3.Name) + '</li> ';
			}
			out += ' ';
		}
		out += ' </ul>';
		return out;;
	}
	exports.child_barCommSinTpl = function(it) {
		var out = ' <ul class="selection radio line_cols_1 hide" fmark="' + (it.mark) + '"> ';
		for(var i = 0, l = it.list.length; i < l; i++) {
			var it2 = it.list[i];
			out += ' <li filter-type="' + (it2.datamark) + '" class="';
			if(it2.check) {
				out += 'selected';
			}
			out += '" tid="' + (it2.tid) + '" cname="' + (it2.name) + '" rd="0-24-30" ord="0-24-30" crd="">' + (it2.name) + '</li> ';
		}
		out += ' </ul>';
		return out;;
	}
	exports.child_barCommGridTpl = function(it) {
		var out = ' <ul class="selection checkbox line_cols_2 hide" fmark="' + (it.mark) + '"> ';
		for(var i = 0, l = it.list.length; i < l; i++) {
			var it2 = it.list[i];
			out += ' <li class="';
			if(it2.check) {
				out += 'selected';
			}
			out += '" filter-type="' + (it2.datamark) + '" tid="' + (it2.tid) + '" tname="' + (it2.name) + '" extid="' + (it2.extid) + '" cname="' + (it2.name) + '" rd="' + (it.ord) + '" ord="' + (it.ord) + '" crd="' + (it.crd) + '">' + (it2.name) + '</li> ';
		}
		out += ' </ul>';
		return out;;
	}
	exports.child_carinfoTpl = function(it) {
		var out = ' <div class="';
		if(!it.show) {
			out += 'hide';
		}
		out += '" fmark="' + (it.mark) + '"> ';
		if(it.code == 0) {
			out += ' <div class="item_options_tip item_options_tip_center"> <i></i>正在为您加载爱车信息... </div> <div class="wx_loading2"> <i class="wx_loading_icon"></i> </div> ';
		} else if(it.code == -1) {
			out += ' <div class="item_options_tip item_options_tip_center"> <i></i>爱车信息加载失败，请查看您的网络 </div> <div class="item_options_reload">重新加载</div> ';
		} else {
			out += ' ';
			if(it.list.length > 0) {
				out += ' ';
				if(it.list.length == 1) {
					out += ' <div class="item_options_tip item_options_tip_center"> <i></i>您还可以添加' + (4 - it.list.length) + '辆爱车哦～ </div> ';
				}
				out += ' <ul class="datalist"> ';
				for(var i = 0, l = it.list.length; i < l; i++) {
					var it1 = it.list[i];
					out += ' <li ';
					if(it1.selected) {
						out += 'class="selected" rd="' + (it.crd) + '"';
					} else {
						out += 'rd="' + (it.ord) + '"';
					}
					out += ' modelid="' + (it1.model.modelId) + '" cmodelid="' + (it1.ext.accyModelId) + '"> <p class="datalist_name" ';
					if(it1.selected) {
						out += 'rd="' + (it.crd) + '"';
					} else {
						out += 'rd="' + (it.ord) + '"';
					}
					out += '>' + (it1.model.brandName) + '&nbsp;' + (it1.model.seriesName) + '&nbsp;' + (it1.model.seriesYear) + '款</p> <p class="datalist_desc" ';
					if(it1.selected) {
						out += 'rd="' + (it.crd) + '"';
					} else {
						out += 'rd="' + (it.ord) + '"';
					}
					out += '>' + (it1.model.modelName) + '</p> </li> ';
				}
				out += ' ';
				if(it.list.length < 4) {
					out += ' <li class="datalist_add" rd="0-24-59"></li> ';
				}
				out += ' </ul> <a href="javascript:" class="item_options_lnk" rd="0-24-60">管理爱车</a> ';
			} else {
				out += ' <div class="item_options_tip"> <i></i>添加您的爱车信息，我们会为您筛选合适的商品哦～ </div> <ul class="datalist"> <li class="datalist_add"></li> </ul> ';
			}
			out += ' ';
		}
		out += ' </div>';
		return out;;
	}
	exports.child_babyinfoTpl = function(it) {
		var out = ' <div class="';
		if(!it.show) {
			out += 'hide';
		}
		out += '" fmark="' + (it.mark) + '"> ';
		if(it.code == 0) {
			out += ' <div class="item_options_tip item_options_tip_center"> <i></i>正在为您加载宝宝信息... </div> <div class="wx_loading2"> <i class="wx_loading_icon"></i> </div> ';
		} else if(it.code == -1) {
			out += ' <div class="item_options_tip item_options_tip_center"> <i></i>宝宝信息加载失败，请查看您的网络 </div> <div class="item_options_reload">重新加载</div> ';
		} else {
			out += ' ';
			if(it.list.length > 0) {
				out += ' ';
				if(it.list.length == 1) {
					out += ' <div class="item_options_tip item_options_tip_center"> <i></i>您还可以添加' + (2 - it.list.length) + '宝宝哦～ </div> ';
				}
				out += ' <ul class="datalist"> ';
				for(var i = 0, l = it.list.length; i < l; i++) {
					var it1 = it.list[i];
					out += ' <li ';
					if(it1.selected) {
						out += 'class="selected" rd="' + (it.crd) + '"';
					} else {
						out += 'rd="' + (it.ord) + '"';
					}
					out += ' sex="' + (it1.sex) + '" birf="' + (it1.birthday) + '" cname="' + (it1.nickname) + '"> <p class="datalist_name" ';
					if(it1.selected) {
						out += 'rd="' + (it.crd) + '"';
					} else {
						out += 'rd="' + (it.ord) + '"';
					}
					out += '>' + (it1.nickname) + '</p> </li> ';
				}
				out += ' ';
				if(it.list.length < 2) {
					out += ' <li class="datalist_add" rd="0-24-69" bcou="' + (it.list.length) + '"></li> ';
				}
				out += ' </ul> <a href="javascript:" class="item_options_lnk" rd="0-24-70">管理宝宝</a> ';
			} else {
				out += ' <div class="item_options_tip"> <i></i>添加您的宝宝信息，我们会帮您筛选合适的商品哦~ </div> <ul class="datalist"> <li class="datalist_add" rd="0-24-69" bcou="' + (it.list.length) + '"></li> </ul> ';
			}
			out += ' ';
		}
		out += ' </div>';
		return out;;
	}
	exports.child_aditemTpl = function(it) {
		var out = ' <div class="search_prolist_item ';
		if(it.longImg) {
			out += 'item_longcover';
		}
		out += '" skuid="' + (it.sku_id) + '" order="' + (it.flow_order) + '"> <div class="search_prolist_item_inner" id="link_' + (it.sku_id) + '" rd="' + (it.rd) + '" ind="' + (it.ind) + '" page="' + (it.page) + '" ad="1" vid="' + (it.vender_id) + '" sid="' + (it.shop_id) + '" pos="' + (it.cgind) + '" tourl="' + (it.click_url) + '" ifad="' + (it.ifad) + '" ver="' + (it.ver) + '" eventid="' + (it.eventid) + '" csid="' + (it.csid) + '" ss_projid="' + (it.ssProjid) + '" ss_expid="' + (it.ssExpid) + '" ss_ruleid="' + (it.ssRuleid) + '" ss_sexpid="' + (it.ssSexpid) + '" ss_sruleid="' + (it.ssSruleid) + '" ';
		if(it.pgDrainage) {
			out += 'pg_drainage=' + (it.pgDrainage) + '';
		}
		out += '> <div class="search_prolist_cover" rd="' + (it.rd) + '"> <img class="photo" ';
		if(it.long_image_url) {
			out += ' init_src="' + (it.long_image_url) + '" init_src2="' + (it.image_url) + '"';
		} else {
			out += ' init_src="' + (it.image_url) + '" ';
		}
		out += ' alt="" inited="';
		if(it.cgind <= 4 && it.imageurl) {
			out += '1';
		} else {
			out += '0';
		}
		out += '" skuid="' + (it.sku_id) + '" rd="' + (it.rd) + '" lpmark="' + (it.lpmark) + '" onerror="__reloadResource(this)"/> ';
		if(it.exposal_url) {
			out += '<img init_src="' + (it.exposal_url) + '" inited="0" real-exposure="1" style="position:absolute;top:50%;left:0;width:0;height:0;visibility:hidden;">';
		}
		out += ' </div> <div class="search_prolist_info"> <div class="search_prolist_title" data-line="' + (it.tline) + '" data-line-img="' + (it.tlineimg) + '" rd="' + (it.rd) + '"> ';
		if(it.worldwide == 2) {
			out += ' <i class="mod_tag"><img src="//img11.360buyimg.com/jdphoto/s88x28_jfs/t28279/17/222675420/2452/b4547785/5bebdc5eN5a56d5e3.png" /></i> ';
		}
		out += ' ';
		if(it.ad_smart_title) {
			out += ' ' + (it.ad_smart_title) + ' ';
		} else {
			out += ' ' + (it.ad_title) + ' ';
		}
		out += ' </div> ';
		if(it.isGaiya) {
			var highlights = it.ad_highlight.split(/[\|丨｜︱]/);
			out += ' <div class="search_prolist_index"> ';
			highlights.forEach(function(highlight, index) {
				out += ' ';
				if(index < 3) {
					out += ' <span>' + (highlight) + '</span> ';
				}
				out += ' ';
			})
			out += ' </div> ';
		}
		out += ' ';
		if(it.ad_attribute) {
			var attrs = it.ad_attribute.split(/[\|丨｜︱]/);
			out += ' <div class="search_prolist_attr" rd="' + (it.rd) + '"> ';
			attrs.forEach(function(attr, index) {
				out += ' ';
				if(index < 3) {
					out += ' <span class="word">' + (attr) + '</span> ';
				}
				out += ' ';
			})
			out += ' </div> ';
		}
		out += ' <div class="search_prolist_price" rd="' + (it.rd) + '" id="price_' + (it.sku_id) + '"> <strong rd="' + (it.rd) + '"> <em id="dp_J_' + (it.sku_id) + '" rd="' + (it.rd) + '"></em> </strong> </div> <div class="search_prolist_line" id="nprice_' + (it.sku_id) + '"></div> <div class="search_prolist_other text_small" rd="' + (it.rd) + '" id="comtag_' + (it.sku_id) + '"> <span class="search_prolist_comment hide"><span id="com_' + (it.sku_id) + '">' + (it.comment_num) + '</span>条评价</span> ';
		if(it.good_rate) {
			out += '<span class="search_prolist_rate hide">好评率' + (it.good_rate) + '%</span>';
		}
		out += ' </div> ';
		if(it.shop_link && it.shop_link.shop_name) {
			out += '<div class="search_prolist_shop with_padding" rd="0-4-41"> <div id="shoptag_' + (it.sku_id) + '"></div> <div class="shop_area"><span class="shop_name">' + (it.shop_link.shop_name) + '</span></div> </div>';
		}
		out += ' <div class="search_prolist_other text_small hide" rd="' + (it.rd) + '" id="bomtag_' + (it.sku_id) + '"></div> <div class="search_prolist_ad">广告</div> </div> </div> </div>';
		return out;;
	}
	exports.child_itemV2Tpl = function(it) {
		var out = ' <div class="search_prolist_item ';
		if(it.longImg) {
			out += 'item_longcover';
		}
		out += ' ';
		if(it.isbook) {
			out += 'book';
		}
		out += '" skuid="' + (it.wareid) + '" cid="' + (it.cid1) + '~' + (it.cid2) + '~' + (it.catid) + '"> <div class="search_prolist_item_inner" id="link_' + (it.wareid) + '" lb="' + (it.lowestbuy) + '" ind="' + (it.ind) + '" page="' + (it.page) + '" rd="' + (it.rd) + '" vid="' + (it.vender_id) + '" sid="' + (it.shop_id) + '" pos="' + (it.cgind) + '" tourl="//wq.jd.com/item/view?sku=' + (it.wareid) + '&price=' + ((it.dredisprice * 1).toFixed(2)) + '&fs=1" ifad="' + (it.ifad) + '" ver="' + (it.ver) + '" eventid="' + (it.eventid) + '" csid="' + (it.csid) + '" pps="' + (it.pps) + '" ss_projid="' + (it.ssProjid) + '" ss_expid="' + (it.ssExpid) + '" ss_ruleid="' + (it.ssRuleid) + '" ss_sexpid="' + (it.ssSexpid) + '" ss_sruleid="' + (it.ssSruleid) + '" ';
		if(it.symbol) {
			out += 'symbol="' + (it.symbol) + '"';
		}
		out += '  ';
		if(it.pgDrainage) {
			out += 'pg_drainage=' + (it.pgDrainage) + '';
		}
		out += '> <div class="search_prolist_cover" rd="' + (it.rd) + '"> <img class="photo" ';
		if(it.Content.long_image_url) {
			out += ' init_src="' + (it.Content.long_image_url) + '" init_src2="' + (it.Content.imageurl) + '"';
		} else {
			out += ' init_src="' + (it.Content.imageurl) + '" ';
		}
		out += '  alt="" inited="';
		if(it.cgind <= 4 && it.imageurl) {
			out += '1';
		} else {
			out += '0';
		}
		out += '" skuid="' + (it.wareid) + '" rd="' + (it.rd) + '" lpmark="' + (it.lpmark) + '" onerror="__reloadResource(this)"/> </div> <div class="search_prolist_info" rd="' + (it.rd) + '"> <div class="search_prolist_title" data-line="' + (it.tline) + '" data-line-img="' + (it.tlineimg) + '" rd="' + (it.rd) + '"> ';
		if(it.isGaiya) {
			out += ' ' + (it.Content.gaiyawarename) + ' ';
		} else if(it.Content && it.Content.shortWarename) {
			out += ' ' + (it.Content.shortWarename) + ' ';
		} else {
			out += ' ' + (it.Content.warename) + ' ';
		}
		out += ' </div> ';
		if(it.Content) {
			out += ' ';
			if(it.richattr && it.richattr.length > 1) {
				out += ' <div class="search_prolist_richattr"> ';
				for(var i = 0; i < it.richattr.length; i++) {
					out += ' <div class="richattr_item"><p class="richattr_value">' + (it.richattr[i].value) + '</p><p class="richattr_name">' + (it.richattr[i].name) + '</p></div> ';
				}
				out += ' </div> ';
			} else {
				out += ' ';
				if(it.isGaiya) {
					var exts = it.Content.extname.split(/[\|丨｜︱]/),
						extlen = exts.length > 3 ? 3 : exts.length;
					out += ' <div class="search_prolist_index"> ';
					for(var i = 0; i < extlen; ++i) {
						out += '<span>' + (exts[i]) + '</span>';
					}
					out += ' </div> ';
				}
				out += ' ';
				if(it.sxzz || it.Content.CustomAttrList || (this.getAttrStick && this.getAttrStick(it).length)) {
					var obj = (this.getProductAttr && this.getProductAttr(it, true)) || {};
					var attrArr = obj.attrInfo || [];
					out += ' <div class="search_prolist_attr" rd="' + (obj.rd) + '"> ';
					for(var i = 0; i < attrArr.length; ++i) {
						out += ' ';
						if(attrArr[i].stick) {
							out += ' <span class="word ' + ((attrArr[i].clsName || '')) + '">' + (attrArr[i].value) + '</span> ';
						} else {
							out += ' <span class="word">' + (attrArr[i]) + '</span> ';
						}
						out += ' ';
					}
					out += ' </div> ';
				}
				out += ' ';
			}
			out += ' ';
		}
		out += ' ';
		if(it.isbook) {
			out += ' <div class="search_prolist_bookdesc" id="book_desc_' + (it.wareid) + '" rd="' + (it.rd) + '"></div> <div class="search_prolist_bookauthor" rd="' + (it.rd) + '">';
			if(it.Content.author) {
				out += '作者：' + (it.Content.author) + '';
			}
			out += '</div> <div class="search_prolist_bookbd hide"><span id="book_bd_' + (it.wareid) + '"></span></div> ';
		}
		out += ' <div class="search_prolist_price" rd="' + (it.rd) + '" id="price_' + (it.wareid) + '"> <strong rd="' + (it.rd) + '"> ';
		if(it.dredisprice <= 0) {
			out += ' <em id="dp_J_' + (it.wareid) + '" rd="' + (it.rd) + '">暂无报价</em> ';
		} else {
			out += ' <em id="dp_J_' + (it.wareid) + '" rd="' + (it.rd) + '">&yen;' + ((1.0 * it.dredisprice).toFixed(2)) + '</em> ';
		}
		out += ' </strong> </div> <div class="search_prolist_line" rd="' + (it.rd) + '" id="nprice_' + (it.wareid) + '"> ';
		if(it.isbook && !it.isoverseas) {
			out += '<del id="book_op_' + (it.wareid) + '"></del>';
		}
		out += ' </div> <div class="search_prolist_other text_small" rd="' + (it.rd) + '" id="comtag_' + (it.wareid) + '"> <span class="search_prolist_comment hide" rd="' + (it.rd) + '"><span id="com_' + (it.wareid) + '">' + (it.commentcount) + '</span>条评价</span> <span class="search_prolist_rate hide" rd="' + (it.rd) + '">好评率<span id="rate_' + (it.wareid) + '">' + (it.good) + '</span>%</span> </div> ';
		if(it.shop_name) {
			out += '<div class="search_prolist_shop" rd="0-4-41"> <div id="shoptag_' + (it.wareid) + '"></div> <div class="shop_area"><span class="shop_name">' + (it.shop_name) + '</span></div> </div>';
		}
		out += ' ';
		if(it.shop_id != 0 && it.MultiSuppliers) {
			out += ' <div class="search_prolist_lnk" rd="0-15-1" tourl="//wqs.jd.com/search/index_child.shtml?sku=' + (it.wareid) + '&warename=' + (encodeURIComponent(it.Content.warename)) + '">另有' + (it.MultiSuppliers.supplier_count) + '个卖家，&yen;' + ((it.MultiSuppliers.min_price / 100).toFixed(2)) + '元起</div> ';
		} else {
			out += ' <div class="search_prolist_other text_small hide" rd="' + (it.rd) + '" id="bomtag_' + (it.wareid) + '"></div> ';
		}
		out += ' </div> </div> </div>';
		return out;;
	}
	exports.child_tipsBrandV2Tpl = function(it) {
		var out = ' <li class="choice"><span class="choice_txt"><span>' + (it.name) + '</span><i class="choice_del" rd="0-12-10" tid="' + (it.tid) + '" cname="' + (it.name) + '"></i></span></li>';
		return out;;
	}
	exports.child_carTpl = function(it) {
		var out = ' <div class="search_cate"> <i></i> <ul class="search_cate_list"> ';
		for(var i = 0, len = it.tabs.length; i < len; ++i) {
			var tab = it.tabs[i];
			out += ' <li key="' + (tab.key) + '" rd="0-30-1" ';
			if(tab.cur) {
				out += 'class="cur"';
			}
			out += '>' + (tab.name) + '</li> ';
		}
		out += ' </ul> </div> <div class="search_scroller"> ';
		for(var i = 0, len = it.list.length; i < len; ++i) {
			var item = it.list[i];
			out += ' <a class="item" href="javascript:" key="' + (item.Keywords) + '" rd="0-30-2"> <div class="cover" rd="0-30-2"> <img src="' + (item.ImageUrl) + '" rd="0-30-2"> </div> <p class="name" rd="0-30-2">' + (item.Name) + '</p> </a> ';
		}
		out += ' </div>';
		return out;;
	}
	exports.child_recowordTpl = function(it) {
		var out = ' <p class="search_recoword_title">换个词搜搜</p> <ul class="search_recoword_list"> ';
		for(var i = 0; i < it.cou; ++i) {
			var item = it.list[i];
			out += ' <li class="search_recoword_item J_ping" rd="0-32-' + (i + 1) + '" cou="' + (it.cou) + '" key="' + (item) + '" ver="' + (it.v) + '" report-eventid="MList_RecommendSearch"><a href="javascript:" rd="0-32-' + (i + 1) + '" key="' + (item) + '" class="search_recoword_url">' + (item) + '</a></li> ';
		}
		out += ' </ul>';
		return out;;
	}
	exports.child_articleTpl = function(it) {
		var out = '';
		for(var i = 0, len = it.list.length; i < len; ++i) {
			var feed = it.list[i];
			out += ' ';
			if(feed.contenttype == 1) {
				out += ' <a class="search_guidelist_item" id="search_guide_item_' + (feed.shareid) + '" rd="0-34-1" href="javascript:" tourl="//wqs.jd.com/shoppingv2/detail.html" shareid=' + (feed.shareid) + ' ctype="' + (feed.contenttype) + '" btype="' + (feed.btype) + '" pos="' + (feed.pos) + '"> <div class="search_guidelist_item_cover" rd="0-34-1"> <img src="' + (feed.imageurl[0]) + '" rd="0-34-1"> </div> <div class="search_guidelist_item_info" rd="0-34-1"> <p class="search_guidelist_item_title" rd="0-34-1"> ' + (feed.commentcontent) + ' </p> <div class="search_guidelist_item_more" rd="0-34-1"> <span class="search_guidelist_item_view" rd="0-34-1">' + (feed.viewnum2) + '</span> <span class="search_guidelist_item_date" rd="0-34-1" style="display:none;">' + (feed.sharetime) + '</span> </div> </div> </a> ';
			} else if(feed.contenttype == 2) {
				out += ' <div class="search_guidelist_item2" ';
				if(!feed.visible) {
					out += 'style="display:none;"';
				}
				out += ' id="search_guide_item_' + (feed.shareid) + '" tourl="//wqs.jd.com/shoppingv2/detail.html" shareid=' + (feed.shareid) + ' ctype="' + (feed.contenttype) + '" btype="' + (feed.btype) + '" pos="' + (feed.pos) + '" rd="0-34-1"> <a href="javascript:" class="search_guidelist_item2_link" rd="0-34-1"> <h4 class="search_guidelist_item2_title" rd="0-34-1"><span class="search_guidelist_tag" rd="0-34-1">清单</span>' + (feed.commentcontent) + '</h4> <ul class="search_guidelist_item2_goods" rd="0-34-1"> ';
				for(var k = 0; k < feed.skuinfos.length; k++) {
					out += ' ';
					if(feed.skuinfos[k].skupicurl) {
						out += ' <li class="search_guidelist_item2_goods_good" rd="0-34-1"><img src="' + (feed.skuinfos[k].skupicurl) + '" rd="0-34-1"></li> ';
					}
					out += ' ';
				}
				out += ' </ul> </a> <div class="search_guidelist_item2_more" rd="0-34-1"> <span class="search_guidelist_item2_view" rd="0-34-1">' + (feed.viewnum2) + '</span> <span class="search_guidelist_item2_date" rd="0-34-1">' + (feed.sharetime) + '</span> </div> </div> ';
			} else if(feed.contenttype == 0) {
				out += ' <div class="search_guidelist_item2" id="search_guide_item_' + (feed.shareid) + '" tourl="//wqs.jd.com/shoppingv2/detail.html" shareid=' + (feed.shareid) + ' ctype="' + (feed.contenttype) + '" btype="' + (feed.btype) + '" pos="' + (feed.pos) + '" rd="0-34-1"> <a href="javascript:" class="search_guidelist_item2_link" rd="0-34-1"> <h4 class="search_guidelist_item2_title" rd="0-34-1"><span class="search_guidelist_tag" rd="0-34-1">晒单</span>' + (feed.commentcontent) + '</h4> <ul class="search_guidelist_item2_goods" rd="0-34-1"> ';
				for(var j = 0; j < feed.imageurl.length; j++) {
					out += ' <li class="search_guidelist_item2_goods_good" rd="0-34-1"><img src="' + (feed.imageurl[j]) + '" rd="0-34-1"></li> ';
				}
				out += ' </ul> </a> ';
				if(feed.skuinfos && feed.skuinfos.length) {
					out += ' <a href="javascript:" tourl="//wqitem.jd.com/item/view?sku=' + (feed.skuinfos[0].skuid) + '" class="search_guidelist_item2_good" rd="0-34-1"> <img class="search_guidelist_item2_good_img" src="' + (feed.skuinfos[0].skupicurl) + '" rd="0-34-1"> <h5 class="search_guidelist_item2_good_name" rd="0-34-1">' + (feed.skuinfos[0].skuname) + '</h5> <div class="search_guidelist_item2_good_price" ';
					if(!feed.skuinfos[0].price) {
						out += 'style="display:none;"';
					}
					out += ' rd="0-34-1"> <span class="search_guidelist_item2_good_price_yen" rd="0-34-1">¥</span> <span id="search_guide_sku_' + (feed.skuinfos[0].skuid) + '" rd="0-34-1">' + (feed.skuinfos[0].price) + '</span> </div> </a> ';
				}
				out += ' <div class="search_guidelist_item2_more" rd="0-34-1"> <span class="search_guidelist_item2_view" rd="0-34-1">' + (feed.viewnum2) + '</span> <span class="search_guidelist_item2_date" rd="0-34-1">' + (feed.sharetime) + '</span> </div> </div> ';
			}
			out += '';
		}
		out += '';
		return out;;
	}
	exports.child_shopTpl = function(it) {
		var out = '';
		for(var i = 0; i < it.list.length; i++) {
			var item = it.list[i],
				shop = item.shopInfo;
			if(!shop.shopName) continue;
			out += ' <div class="shop"> <div class="shop_hd" url="//wqshop.jd.com/mshop/gethomepage?venderid=' + (shop.venderId) + '&fs=2" rd="0-34-3"> ';
			if(item.isDefaultSquareLogo == 0 && item.squareLogo) {
				out += '<div class="shop_logo square"><img src="' + (item.squareLogo) + '"></div> ';
			} else if(item.rectLogo) {
				out += '<div class="shop_logo"><img src="' + (item.rectLogo) + '"></div>';
			}
			out += ' <div class="shop_info"> <div class="shop_name">' + (shop.shopName) + '</div> <div class="shop_desc"> ';
			if(shop.isZy == 1) {
				out += ' <i class="mod_tag"><img src="//img11.360buyimg.com/jdphoto/s48x28_jfs/t7792/270/1427377021/1088/6d981d81/599cf545Na1f3ceb4.png"></i> ';
			} else if(shop.gshopIcon) {
				out += ' <i class="mod_tag"><img src="' + (shop.gshopIcon) + '" /></i> ';
			}
			out += ' ';
			if(item.stars && item.stars.length) {
				out += ' <span class="star_lv"><b>店铺星级</b> ';
				for(var j = 0; j < item.stars.length; j++) {
					var star = item.stars[j];
					if(!star) {
						out += '<i></i>';
					} else {
						out += '<i class="star_' + (star) + '"></i>';
					}
				}
				out += ' </span> ';
			}
			out += ' ';
			if(parseInt(shop.shopFansNum) > 0) {
				out += '<span>粉丝数' + (shop.shopFansNum) + '</span>';
			}
			out += ' </div> </div> <div class="shop_btn" rd="0-34-3">进店</div> </div> <div class="shop_bd"> <ul class="shop_rec shop_skus_' + (item.shopId) + '" id="shop_skus_' + (item.shopId) + '" rd="0-34-4"></ul> </div> <div class="shop_aside"> <div class="shop_icon" shoptag="' + (shop.venderId) + '"></div> <p class="shop_count itemCount_' + (shop.venderId) + '" style="display: none;">相关商品：件</p> </div> </div>';
		}
		out += '';
		return out;;
	}
	exports.child_shopSkuTpl = function(it) {
		var out = ' ';
		for(var j = 0; j < it.skus.length; j++) {
			var sku = it.skus[j];
			if(!sku.imgUrl) continue;
			out += ' <li class="shop_rec_item" url="//wqitem.jd.com/item/view?sku=' + (sku.skuId) + '&fs=2" rd="0-34-4"> <a class="url" rd="0-34-4"> <div class="cover" rd="0-34-4"> <img src="' + (sku.fullImgUrl) + '" rd="0-34-4"> </div> <p class="price shop_sku_' + (sku.skuId) + '" id="shop_sku_' + (sku.skuId) + '" rd="0-34-4" style="display: none;"></p> </a> </li> ';
		}
		out += '';
		return out;;
	}
	exports.child_storeTpl = function(it) {
		var out = ' ';
		for(var i = 0; i < it.list.length; i++) {
			var store = it.list[i];
			if(!store.name || !store.distance || !store.add_name) continue;
			var tags = store.catnames.split('^');
			var tourl = '//md-mobile.jd.com/addCart/storeInfo?storeId=' + store.id + '&venderId=' + store.vender_id + '&lng=' + it.longitude + '&lat=' + it.latitude;
			out += ' <div class="store" tourl="' + (tourl) + '" rd="0-34-5"> <div class="store_img" ';
			if(!store.imgUrl) {
				out += 'style="visibility: hidden;"';
			}
			out += '><img src="' + (store.imgUrl) + '"></div> <div class="store_info" rd="0-34-5"> <div class="store_name">' + (store.name) + '</div> <div class="store_tags">';
			for(var j = 0; j < tags.length; j++) {
				if(!tags[j]) continue;
				out += '<i>' + (tags[j]) + '</i>';
			}
			out += '</div> <div class="store_score" ';
			if(!store.total_score || parseInt(store.total_score) <= 0) {
				out += 'style="visibility: hidden;"';
			}
			out += '> <span class="store_score_stars">';
			for(var k = 0; k < 5; k++) {
				out += '<i ';
				if(k < parseInt(store.total_score) / 100) {
					out += 'class="active"';
				}
				out += '></i>';
			}
			out += '</span> <span class="store_score_count">' + (parseInt(store.total_score) / 100) + '分</span> </div> <div class="store_opening" ';
			if(!store.begin_time || !store.end_time) {
				out += 'style="visibility: hidden;"';
			}
			out += '>营业时间：' + (store.begin_time) + '-' + (store.end_time) + '</div> <div class="store_address"><span class="store_address_name">' + (store.add_name) + '</span><span class="store_address_distance">' + (store.distanceText) + '</span></div> </div> </div> ';
		}
		out += '';
		return out;;
	}
});
define("loopScroll", function(require, exports, t) {
	var _cacheThisModule_;
	var i = require("zepto");
	var e = function(t) {
		this.opt = {
			tp: "text",
			moveDom: null,
			moveChild: [],
			tab: [],
			viewDom: null,
			touchDom2: [],
			sp: {
				x: 0,
				y: 0
			},
			min: 0,
			minp: 0,
			step: 0,
			len: 1,
			index: 1,
			offset: 0,
			loadImg: false,
			image: [],
			loopScroll: false,
			lockScrY: false,
			stopOnce: false,
			autoTime: 0,
			holdAuto: false,
			tabClass: "cur",
			transition: .3,
			imgInit: true,
			imgInitLazy: 4e3,
			enableTransX: false,
			transXVal: 100,
			useVue: false,
			ignoreAppend: false,
			fun: function() {}
		};
		i.extend(this, this.opt, t);
		this.len = this.moveChild.length;
		this.min = this.min || {
			text: 100,
			img: 1
		}[this.tp];
		this.minp = this.minp || Math.max(this.min, 30);
		if(!this.viewDom) this.viewDom = i(window);
		if(this.len > 1) this.startEvent();
		if(this.loadImg) this.image = this.moveDom.find("img");
		this.resize(this.step || this.moveChild.eq(0).width());
		if(this.autoTime) {
			var e = this;
			setInterval(function() {
				if(!e.holdAuto) {
					if(!e.stopOnce) e.stepMove(e.index + 1);
					e.stopOnce = false
				}
			}, this.autoTime)
		}
	};
	i.extend(e.prototype, {
		resize: function(t) {
			this.step = t || this.step;
			var i = (this.viewDom.width() - this.step) / 2;
			this.offset = this.loopScroll ? this.step - i : i;
			if(this.len == 1) this.offset = -i;
			this.stepMove(this.index, true)
		},
		addChild: function(t, i) {
			if(!this.loopScroll) return;
			this.moveChild.eq(0).after(t);
			this.len += 1;
			this.tab.eq(this.len - 2).after(i);
			this.tab = this.tab.parent().children();
			if(this.len == 2) {
				this.moveChild = this.moveDom.children();
				this.startEvent()
			} else {
				this.stepMove(2)
			}
		},
		startEvent: function() {
			var t = this,
				e = this.moveDom.get(0),
				s = function(i) {
					i.addEventListener("touchstart", t, false);
					i.addEventListener("touchmove", t, false);
					i.addEventListener("touchend", t, false);
					i.addEventListener("touchcancel", t, false);
					i.addEventListener("webkitTransitionEnd", t, false)
				};
			s(e);
			this.tab.each(function(e, s) {
				i(s).attr("no", e + 1);
				i(s).click(function() {
					t.stepMove(i(this).attr("no"))
				})
			});
			if(this.loopScroll) {
				var n = this.moveChild.eq(0).clone().attr({
					id: "",
					onload: ""
				});
				n.find("img").attr({
					id: "",
					onload: ""
				});
				!this.ignoreAppend && this.moveDom.append(n);
				var o = this.moveChild.eq(this.len - 1).clone().attr({
					id: "",
					onload: ""
				});
				o.find("img").attr({
					id: "",
					onload: ""
				});
				!this.ignoreAppend && this.moveDom.prepend(o)
			}
			for(var h = 0; h < this.touchDom2.length; h++) {
				s(this.touchDom2[h])
			}
		},
		handleEvent: function(t) {
			switch(t.type) {
				case "touchstart":
					this.sp = this.getPosition(t);
					this.holdAuto = true;
					this.stopOnce = true;
					break;
				case "touchmove":
					this.touchmove(t);
					break;
				case "touchend":
				case "touchcancel":
					this.move(t);
					this.holdAuto = false;
					break;
				case "webkitTransitionEnd":
					t.preventDefault();
					break
			}
		},
		getPosition: function(t) {
			var i = t.changedTouches ? t.changedTouches[0] : t;
			return {
				x: i.pageX,
				y: i.pageY
			}
		},
		touchmove: function(t) {
			var i = this.getPosition(t),
				e = i.x - this.sp.x,
				s = i.y - this.sp.y;
			if(Math.abs(e) - Math.abs(s) > this.min) {
				t.preventDefault();
				var n = e - this.step * (this.index - 1) - this.offset;
				!this.useVue && this.moveDom.css({
					"-webkit-backface-visibility": "hidden",
					"-webkit-transform": this.enableTransX ? "translateX(" + (this.loopScroll ? this.index : this.index - 1) * -this.transXVal + "%)" : "translate3D(" + n + "px,0,0)",
					"-webkit-transition": "0"
				})
			} else {
				if(!this.lockScrY) t.preventDefault()
			}
		},
		move: function(t) {
			var i = this.getPosition(t),
				e = i.x - this.sp.x,
				s = i.y - this.sp.y;
			if(Math.abs(e) < Math.abs(s) || Math.abs(e) < this.minp) {
				this.stepMove(this.index);
				return
			}
			if(e > 0) {
				t.preventDefault();
				this.stepMove(this.index - 1)
			} else {
				t.preventDefault();
				this.stepMove(this.index + 1)
			}
		},
		loadImage: function(t) {
			var e = this.image;
			var s = function(t) {
				if(e[t] && i(e[t]).attr("back_src")) {
					e[t].src = i(e[t]).attr("back_src");
					i(e[t]).removeAttr("back_src")
				}
			};
			s(t);
			(function(t, i, e) {
				setTimeout(function() {
					s(t - 1);
					s(t + 1)
				}, i ? e : 0)
			})(t, this.imgInit, this.imgInitLazy);
			this.imgInit = false
		},
		stepMove: function(t, i) {
			this.index = t > this.len ? this.len : t < 1 ? 1 : t;
			this.tab.removeClass(this.tabClass);
			this.tab.eq(this.index - 1).addClass(this.tabClass);
			var e = -this.step * ((this.loopScroll ? t : this.index) - 1) - this.offset;
			!this.useVue && this.moveDom.css({
				"-webkit-transform": this.enableTransX ? "translateX(" + (this.loopScroll ? t : this.index - 1) * -this.transXVal + "%)" : "translate3D(" + e + "px,0,0)",
				"-webkit-transition": i ? "0ms" : "all " + this.transition + "s ease"
			});
			if(this.loadImg) this.loadImage(this.index);
			this.fun(this.index);
			if(this.loopScroll && !i) {
				var s = this,
					n = t;
				if(t <= 0) n = this.len;
				if(t > this.len) n = 1;
				if(n != t) setTimeout(function() {
					s.stepMove(n, true)
				}, this.transition * 1e3)
			}
		},
		_isOutScreen: function(t) {
			return t.offset().top >= i(window).height() + window.scrollY || t.offset().top + t.height() < window.scrollY
		},
		_isElementHidden: function(t) {
			var i = t.parents().concat();
			i.unshift(t[0]);
			return i.some(function(t) {
				if(getComputedStyle(t, "").getPropertyValue("display") == "none") {
					return true
				}
			})
		}
	});
	exports.init = function(t) {
		return new e(t)
	}
});
define("behavior", function(require, exports, module) {
	var touchStartFn = function(event) {
		var mousePosition = getXY(event);
		downTime = (new Date).getTime()
	}
	var touchEndFn = function(event) {
		upTime = (new Date).getTime()
		clickFn(event)
	}
	var moveFn = function(event) {
		if(!inTime) inTime = (new Date).getTime();
		var position = getXY(event);
		if(mouseMovePath.length > 400) {
			mouseMovePath.splice(1, 1)
			mouseMovePath.push(position);
		} else {
			mouseMovePath.push(position);
		}
	}
	var downFn = function(event) {
		downTime = (new Date).getTime();
	}
	var upFn = function(event) {
		upTime = (new Date).getTime();
	}

	function getXY(event) {
		var ev = event || window.event;
		try {
			return {
				x: parseInt(ev.changedTouches[0].clientX),
				y: parseInt(ev.changedTouches[0].clientY),
				t: (new Date).getTime()
			}
		} catch(ex) {}
		if(ev.pageX || ev.pageY) {
			return {
				x: parseInt(ev.pageX),
				y: parseInt(ev.pageY),
				t: (new Date).getTime()
			};
		}
		return {
			x: parseInt(ev.clientX + body.scrollLeft - body.clientLeft),
			y: parseInt(ev.clientY + body.scrollTop - body.clientTop),
			t: (new Date).getTime()
		};
	}
	var encryptBehavior = function(string) {
		if(!string) return '';
		var stringLenth = string.length,
			interval = parseInt(stringLenth / 12),
			resultString = '';
		for(var i = 0; i < 12; i++) {
			resultString += (string.charCodeAt(i * interval) % stamp).toString(16);
		}
		return resultString;
	}
	var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

	function base64encode(str) {
		var out, i, len;
		var c1, c2, c3;
		len = str.length;
		i = 0;
		out = "";
		while(i < len) {
			c1 = str.charCodeAt(i++) & 0xff;
			if(i == len) {
				out += base64EncodeChars.charAt(c1 >> 2);
				out += base64EncodeChars.charAt((c1 & 0x3) << 4);
				out += "==";
				break;
			}
			c2 = str.charCodeAt(i++);
			if(i == len) {
				out += base64EncodeChars.charAt(c1 >> 2);
				out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
				out += base64EncodeChars.charAt((c2 & 0xF) << 2);
				out += "=";
				break;
			}
			c3 = str.charCodeAt(i++);
			out += base64EncodeChars.charAt(c1 >> 2);
			out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
			out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
			out += base64EncodeChars.charAt(c3 & 0x3F);
		}
		return out;
	}
	var clickFn = function(event) {
		var mouseMovePathLength = 10,
			getMovePathinterval = mouseMovePath.length < (mouseMovePathLength + 1) ? 1 : parseInt(mouseMovePath.length / (mouseMovePathLength + 1)),
			resultMovePath = [],
			clickXY = getXY(event),
			resultIntervalArr = [],
			resultClickInterval = 0,
			behavior = '';
		for(var i = 0; i < mouseMovePathLength; i++) {
			var position = mouseMovePath[i * getMovePathinterval],
				timeInterval;
			if(position == null) break;
			if(i == 0) {
				timeInterval = 0;
			} else {
				timeInterval = position.t - resultIntervalArr[i - 1]
			}
			resultIntervalArr.push(position.t)
			resultMovePath.push([position.x, position.y, timeInterval >= 9999 ? 9999 : timeInterval]);
		}
		if(resultIntervalArr.length > 0) {
			var constClick = clickXY.t - resultIntervalArr.pop();
			resultClickInterval = constClick >= 9999 ? 9999 : constClick;
		} else {
			resultClickInterval = 0
		}
		resultMovePath.push([clickXY.x, clickXY.y, resultClickInterval]);
		resultMovePath.unshift([mouseMovePath.length, upTime - downTime, upTime - inTime, document.body.clientWidth || 0, document.body.clientHeight || 0]);
		inTime = null;
		behavior = resultMovePath.join('|');
		window.__jdbehavior__ = behavior;
	}
	if(!window.__jdAdClickbind__) {
		window.__jdAdClickbind__ = true;
		var body = document.body,
			upTime = (new Date).getTime(),
			downTime = (new Date).getTime(),
			inTime = null,
			stamp = 12,
			isSuportTouch = "ontouchstart" in window,
			ieOrOpera = !(!window.attachEvent || window.opera),
			mouseMovePath = [];
		if(isSuportTouch) {
			document.addEventListener("touchstart", touchStartFn, false)
			document.addEventListener("touchend", touchEndFn, false)
			document.addEventListener("touchmove", moveFn, false)
		} else if(ieOrOpera) {
			body.attachEvent("onclick", clickFn)
			body.attachEvent("onmousemove", moveFn)
			body.attachEvent("onmouseup", upFn)
			body.attachEvent("onmousedown", downFn)
		} else {
			body.addEventListener("click", clickFn, false)
			body.addEventListener("mousemove", moveFn, false)
			body.addEventListener("mouseup", upFn, false)
			body.addEventListener("mousedown", downFn, false)
		}
	}
	window.__behaivor__ = {
		getBehavior: function(url, event) {
			clickFn(event);
			encryptString = encryptBehavior(url);
			return base64encode(encryptString + '|' + window.__jdbehavior__);
		}
	}
	exports.getBehavior = window.__behaivor__.getBehavior;
});
define("cookie", function(require, exports, module) {
	var _cacheThisModule_;
	exports.get = getCookie;
	exports.set = setCookie;
	exports.del = delCookie;

	function getCookie(name) {
		var reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)"),
			val = document.cookie.match(reg);
		if(!val || !val[2]) {
			return "";
		}
		var res = val[2];
		try {
			if(/(%[0-9A-F]{2}){2,}/.test(res)) {
				return decodeURIComponent(res);
			} else {
				return unescape(res);
			}
		} catch(e) {
			return unescape(res);
		}
	}

	function setCookie(name, value, expires, path, domain, secure) {
		var exp = new Date(),
			expires = arguments[2] || null,
			path = arguments[3] || "/",
			domain = arguments[4] || null,
			secure = arguments[5] || false;
		expires ? exp.setMinutes(exp.getMinutes() + parseInt(expires)) : "";
		document.cookie = name + '=' + escape(value) + (expires ? ';expires=' + exp.toGMTString() : '') + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
	}

	function delCookie(name, path, domain, secure) {
		var value = getCookie(name);
		if(value != null) {
			var exp = new Date();
			exp.setMinutes(exp.getMinutes() - 1000);
			path = path || "/";
			document.cookie = name + '=;expires=' + exp.toGMTString() + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
		}
	}
});
define('loadJs', function(require, exports, module) {
	var _cacheThisModule_;
	var ck = require('cookie');
	var callbackNameCount = {},
		letterMap = ['Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

	function transToLetter(num) {
		var arr = (num + '').split(''),
			v = [];
		for(var i = 0; i < arr.length; i++) {
			v.push(letterMap[arr[i]])
		}
		return v.join('');
	}

	function callbackNameUnique(str) {
		if(!callbackNameCount[str]) {
			callbackNameCount[str] = 1;
		} else {
			callbackNameCount[str] += 1;
		}
		return str + transToLetter(callbackNameCount[str]);
	}

	function ignoreUrl(url) {
		return url.indexOf('wq.360buyimg.com') > -1 || url.indexOf('wqs.jd.com') > -1 || url.indexOf("wqcoss.jd.com/mcoss/") > -1 || url.indexOf("btshow.jd.com/queryBtPlanInfo.do") > -1 || url.indexOf('storage.360buyimg.com') > -1;
	}

	function sendJs(url, opt) {
		var option = {
			onLoad: null,
			onError: null,
			onTimeout: null,
			timeout: 8000,
			isToken: true,
			keepProtocol: false,
			charset: "utf-8",
			setReportUrl: ""
		};
		var code = 0;
		var timer;
		var clear = function() {
			if(!el) {
				return;
			}
			timer && clearTimeout(timer);
			el.onload = el.onreadystatechange = el.onerror = null;
			el.parentNode && (el.parentNode.removeChild(el));
			el = null;
		}
		if(arguments.length == 1) {
			if(typeof arguments[0] == "object") {
				opt = arguments[0];
				url = opt.url;
			} else {
				opt = {};
			}
		}
		if(typeof(opt.data) == 'object') {
			var param = [];
			for(var k in opt.data) {
				param.push(k + '=' + opt.data[k])
			}
			if(param.length > 0) {
				param = param.join('&');
				url += (url.indexOf('?') > 0 ? '&' : '?') + param;
			}
		}
		if(window.traceid) {
			var lh = url.split('#');
			url += (lh[0].indexOf('?') > 0 ? '&' : '?') + 'traceid=' + window.traceid + (lh[1] ? '#' + lh[1] : '');
		}
		for(var i in opt) {
			if(opt.hasOwnProperty(i)) {
				option[i] = opt[i];
			}
		}
		var el = document.createElement("script");
		el.charset = option.charset || "utf-8";
		var needCheck = false;
		var cgiLoadOK = false;
		var reportUrl = "";
		if(opt.setReportUrl && typeof opt.setReportUrl == "function") {
			reportUrl = opt.setReportUrl();
			!reportUrl && (reportUrl = url);
		} else {
			reportUrl = window.CGI302ReportKeepUrl ? url : url.replace(/\?.*/, '');
		}
		el.onload = el.onreadystatechange = function() {
			if(/loaded|complete/i.test(this.readyState) || navigator.userAgent.toLowerCase().indexOf("msie") == -1) {
				option.onLoad && option.onLoad();
				if(needCheck && !cgiLoadOK) {
					if(window.JD) {
						JD.report.umpBiz({
							bizid: 24,
							operation: 3,
							result: "1",
							source: 0,
							message: reportUrl
						});
					}
					option.onError && option.onError();
					window.onerror('', '', '', '', {
						stack: 'servererror:' + reportUrl
					});
					console.log('loadJs Failed:' + url);
				}
				clear();
			}
		};
		el.onerror = function() {
			window.__reloadResource && __reloadResource(el);
			option.onError && option.onError();
			clear();
		};
		var targetUrl = option.isToken ? addToken(url, "ls") : url;
		if(!ignoreUrl(targetUrl)) {
			var originFunctionName;
			var newFunctionName;
			var originFunction;
			var newUrl = targetUrl.replace(/callback=([^&]+)/, function(a, b) {
				originFunctionName = b;
				newFunctionName = callbackNameUnique(originFunctionName);
				return 'callback=' + newFunctionName;
			});
			if(originFunctionName && window[originFunctionName]) {
				needCheck = true;
				targetUrl = newUrl;
				originFunction = window[originFunctionName];
				window[newFunctionName] = function(d) {
					cgiLoadOK = true;
					originFunction(d, code);
				};
			}
		}
		if(window.JD) {
			targetUrl = JD.url.getCgiUrl(targetUrl);
		}
		el.src = option.keepProtocol ? targetUrl : targetUrl.replace(/^http(s?):/, "");
		!opt.cancleLog && console.log('loadJs request:' + el.src);
		document.getElementsByTagName('head')[0].appendChild(el);
		if(typeof option.onTimeout == "function") {
			timer = setTimeout(function() {
				code = 1;
				option.onTimeout();
			}, option.timeout);
		}
	};

	function addToken(url, type) {
		if(url == "" || (url.indexOf("://") < 0 ? location.href : url).indexOf("http") != 0) {
			return url;
		}
		var wq_token = getToken("wq_skey");
		var pt_token = getToken("pt_key");
		var parts = url.split("#");
		var parts2 = parts[0].split("?");
		var path = parts2[0];
		var param = (parts2.length == 2 ? parts2[1] : "").split("&");
		var hash = parts.length == 2 ? parts[1] : "";
		var hasSceneval = false;
		param = param.filter(function(m) {
			if(m.match(/^sceneval=/)) hasSceneval = true
			return !(/g_tk=\d+/.test(m) || /g_pt_tk=\d+/.test(m) || /g_ty=\w+/.test(m));
		});
		wq_token && param.push("g_tk=" + wq_token);
		pt_token && param.push("g_pt_tk=" + pt_token);
		(wq_token || pt_token) && param.push("g_ty=" + type);
		if(!hasSceneval && window.location && location.href.match(/(\?|&)sceneval=2/)) {
			param.push("sceneval=2");
		}
		var paramStr = param.join("&");
		return path + (paramStr ? ("?" + paramStr) : "") + (hash ? ("#" + hash) : "");
	};

	function getToken(key) {
		key = key || "wq_skey";
		var skey = ck.get(key);
		return skey ? time33(skey) : "";
	};

	function time33(str) {
		for(var i = 0, len = str.length, hash = 5381; i < len; ++i) {
			hash += (hash << 5) + str.charAt(i).charCodeAt();
		}
		return hash & 0x7fffffff;
	}
	exports.loadScript = function(url, opt) {
		var args = [].slice.call(arguments);
		setTimeout(function() {
			sendJs.apply(null, args);
		}, 0);
	};
	exports.addToken = addToken;
});
define("util", function(require, exports, e) {
	var _cacheThisModule_;
	var t = require("zepto"),
		n = require("loadJs");

	function r(e, n, r) {
		var o = document.documentElement.clientHeight,
			i = t(document.body).scrollTop(),
			a = o + i,
			u = n || 0,
			c = e.offset(),
			l = c.top - u,
			f = l + c.height,
			s = r || "";
		if(s === "up") {
			if(f < i) {
				return true
			}
		} else if(s === "down") {
			if(l > a) {
				return true
			}
		} else if(s === "partup") {
			if(l < i) {
				return true
			}
		} else if(s === "partdown") {
			if(f > a) {
				return true
			}
		} else {
			if(l < a && l > i || f < a && f > i) {
				return true
			} else if(l < i && f > a) {
				return true
			}
		}
		return false
	}

	function o(e, t) {
		var n = Date.now,
			r = 0,
			o, i, a = function() {
				r = n();
				e.apply(o, i)
			};
		return function() {
			cur = n();
			o = this, i = arguments;
			if(cur - r > t) {
				a()
			}
		}
	}

	function i() {
		var e, t, n = [];
		this.listen = function(e) {
			if(typeof e === "function") {
				n.push(e)
			}
		};
		this.remove = function(e) {
			if(typeof e !== "function") return;
			for(var t = 0, r = n.length; t < r; t++) {
				if(e === n[t]) {
					n.splice(t, 1)
				}
			}
		};
		document.addEventListener("touchstart", function(t) {
			var n = t.touches[0];
			e = n.clientY
		});
		document.addEventListener("touchmove", function(n) {
			var r = n.changedTouches[0],
				o = r.clientY;
			if(o - e > 0) {
				t = "up"
			} else if(e - o > 0) {
				t = "down"
			}
		});
		document.addEventListener("touchend", o(function() {
			r(t)
		}, 80));
		document.addEventListener("scroll", o(function() {
			r(t)
		}, 80));

		function r(e) {
			for(var t = 0, r = n.length; t < r; t++) {
				n[t].apply(null, [e])
			}
		}
	}

	function a(e) {
		try {
			var e = new Date(e);
			e = null;
			return true
		} catch(t) {
			return false
		}
	}

	function u(e) {
		var t = /{\d+}/g,
			n = Array.prototype.slice.call(arguments, 1),
			r = e.toString();
		return r.replace(t, function(e) {
			var t = e.substr(1, e.length - 2);
			return typeof n[t] === "undefined" ? e : n[t]
		})
	}

	function c(e) {
		var t = {
			bid: "1",
			mid: "01",
			res: [],
			onBeforeReport: null,
			delay: 5e3
		};
		for(var r in e) {
			t[r] = e[r]
		}
		if(t.res.length > 0) {
			window.reportWebInfo = function(e) {};
			window.setTimeout(function() {
				t.onBeforeReport && t.onBeforeReport(t);
				var e = t.bid + t.mid + "-" + t.res.join("|");
				var r = "http://bases.wanggou.com/mcoss/webreport/ReportWebInfo?report=" + e + "&t=" + new Date / 1e3;
				n.loadScript({
					url: r
				})
			}, t.delay)
		}
	}

	function l(e, t) {
		var n = arguments[1] || window.location.search,
			r = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"),
			o = n.substr(n.indexOf("?") + 1).match(r);
		return o != null ? o[2] : ""
	}

	function f(e, t) {
		var n = t ? t.match(/#.*/) && t.match(/#.*/)[0] || "" : location.hash,
			r = t ? t.replace(/#.*/, "").match(/\?.*/) && t.replace(/#.*/, "").match(/\?.*/)[0] || "" : location.search,
			o = t ? t.replace(/#.*/, "").replace(/\?.*/, "") : location.protocol + "//" + location.host + location.pathname;
		for(var i in e) {
			var a = i + "=" + e[i],
				u = l(i, r);
			if(u) {
				r = r.replace(i + "=" + u, i + "=" + e[i])
			} else {
				r = r.length > 0 ? r + "&" + a : "?" + a
			}
		}
		return o + r + n
	}

	function s(e) {
		var t = new RegExp("(^| )" + e + "(?:=([^;]*))?(;|$)"),
			n = document.cookie.match(t);
		return n ? n[2] ? unescape(n[2]).replace(/(^")|("$)/g, "") : "" : null
	}

	function g(e, t, n, r, o, i) {
		var a = new Date,
			n = arguments[2] || null,
			r = arguments[3] || "/",
			o = arguments[4] || null,
			i = arguments[5] || false;
		n ? a.setMinutes(a.getMinutes() + parseInt(n)) : "";
		document.cookie = e + "=" + escape(t) + (n ? ";expires=" + a.toGMTString() : "") + (r ? ";path=" + r : "") + (o ? ";domain=" + o : "") + (i ? ";secure" : "")
	}

	function d(e) {
		var t = arguments[1] || location.hash;
		var n = new RegExp("(^|&)" + e + "=([^&]*)(&|$)");
		var r = t.substr(t.indexOf("#") + 1).match(n);
		if(r != null) {
			return r[2]
		}
		return ""
	}

	function p(e) {
		return typeof e != "string" ? "" : e.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&nbsp;/g, " ").replace(/&#39;/g, "'").replace(/&amp;/g, "&")
	}

	function h(e) {
		return typeof e != "string" ? "" : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&apos;").replace(/ /g, "&nbsp;")
	}

	function v(e, t, n, r) {
		var o = m(e);
		if(o > n - t) {
			var r = r || "";
			var i = e.replace(/[\u00FF-\uFFFF]/g, "@-").substr(t, n);
			var a = i.match(/@-/g) ? i.match(/@-/g).length : 0;
			return e.substring(0, n - a) + r
		}
		return e
	}

	function m(e) {
		return e.replace(/[\u00FF-\uFFFF]/g, "  ").length
	}

	function w() {
		var e = navigator.userAgent.toLowerCase();
		return e.match(/micromessenger/) ? true : false
	}

	function y(e) {
		window.localStorage.removeItem(e)
	}

	function S(e, t, n) {
		try {
			window.localStorage.setItem(e, n ? JSON.stringify(t) : t)
		} catch(r) {
			console.error(r)
		}
	}

	function b(e) {
		return window.localStorage.getItem(e)
	}

	function x() {
		if(!window.localStorage) {
			return false
		}
		try {
			window.localStorage.setItem("test", true);
			window.localStorage.removeItem("test");
			return true
		} catch(e) {
			return false
		}
	}

	function L() {
		var e = s("cid");
		if(e == 2) return true;
		if(/qq\/([\d\.]+)*/i.test(navigator.userAgent)) {
			return true
		}
		return false
	}

	function D() {
		var e = s("cid");
		if(e == 1) return true;
		if(/MicroMessenger/i.test(navigator.userAgent)) {
			return true
		}
		return false
	}

	function F(e) {
		e[0].ontouchstart = t;

		function t(t) {
			e[0].ontouchmove = n
		}

		function n(t) {
			t.preventDefault();
			e[0].ontouchend = r
		}

		function r() {
			e[0].ontouchend = null;
			e[0].ontouchmove = null
		}
	}

	function k(e) {
		if(s("wg_uin") && s("wg_skey")) {
			location.href = e
		} else {
			q(e)
		}
	}

	function q(e) {
		e = e || location.href;
		if(D()) {
			window.location.href = "http://party.wanggou.com/tws64/m/wxv2/Login?appid=1&rurl=" + encodeURIComponent(e)
		} else {
			window.location.href = "http://party.wanggou.com/tws64/m/h5v1/cpLogin?rurl=" + encodeURIComponent(e) + "&sid=" + s("sid") + "&uk=" + s("uk")
		}
	}

	function A(e, t) {
		e = e.replace(/？/g, "?");
		var n = /ptag[=,]\d+\.\d+\.\d+/i,
			r = /\?/.test(e);
		hasAnchor = e.indexOf("#") > -1;
		if(n.test(e)) {
			e = e.replace(n, "PTAG=" + t)
		} else {
			e = hasAnchor ? e.replace("#", (r ? "&" : "?") + "PTAG=" + t + "#") : e + (r ? "&" : "?") + "PTAG=" + t
		}
		return e
	}

	function I(e) {
		var t = [];
		for(var n = 0, r = e.length; n < r; n++) {
			("," + t + ",").indexOf("," + e[n] + ",") < 0 ? t.push(e[n]) : ""
		}
		return t
	}

	function R(e) {
		var t = false;
		return function() {
			!t && (t = !t, typeof e === "function" && e.call())
		}
	}

	function E(e) {
		var t, n, r = {};

		function o(e) {
			if(e && e.longitude) {
				var t = JSON.stringify(e);
				JD.cookie.set("coords", t, 60, "/", "jd.com")
			}
		}

		function i() {
			var e;
			e = JD.cookie.get("coords");
			try {
				if(e) {
					e = JSON.parse(e)
				}
			} catch(t) {
				e = false;
				console.log(t)
			}
			if(!e || !e.longitude || !e.latitude) {
				e = false;
				JD.cookie.del("coords", "/", "jd.com")
			}
			return e
		}

		function a() {
			if(/qq\/([\d\.]+)*/.test(navigator.userAgent.toLowerCase())) {
				return true
			}
			return false
		}

		function u() {
			if(navigator.userAgent.indexOf("MicroMessenger") > 0) {
				return true
			}
			return false
		}
		t = i();
		if(t) {
			e && e(t)
		} else {
			if(u() && JD.wxapi) {
				JD.wxapi.ready(function(t) {
					t.beta = true;
					wx.getLocation({
						type: "gcj02",
						success: function(t) {
							n = {
								latitude: t.latitude,
								longitude: t.longitude
							};
							o(n);
							e && e(n)
						},
						fail: function() {
							e && e(r)
						}
					})
				})
			} else if(a() && window.mqq) {
				mqq.sensor.getLocation(function(t, i, a) {
					if(t === 0) {
						n = {
							latitude: i,
							longitude: a
						};
						o(n);
						e && e(n)
					} else {
						e && e(r)
					}
				})
			} else if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(t) {
					n = {
						latitude: t.coords.latitude,
						longitude: t.coords.longitude
					};
					o(n);
					e && e(n)
				}, function(t) {
					e && e(r)
				})
			} else {
				e && e(r)
			}
		}
	}
	return {
		checkInScreen: r,
		delay: o,
		delegateMove: i,
		isDate: a,
		format: u,
		itilReport: c,
		getQuery: l,
		setQuery: f,
		getCookie: s,
		setCookie: g,
		getHash: d,
		htmlDecode: p,
		htmlEncode: h,
		strSubGB: v,
		strLenGB: m,
		canWxPay: w,
		isSupportStorage: x,
		isSQ: L,
		isWX: D,
		saveStorage: S,
		getStorage: b,
		removeStorage: y,
		preventPageScroll: F,
		loginLocation: k,
		login: q,
		addRd: A,
		arrayUniq: I,
		once: R,
		getMyLocation: E
	}
});
define('jd.search.common', function(require, exports, module) {
	var _cacheThisModule_;
	var $ = require('zepto'),
		util = require('util'),
		logoTpl = '//img1{#s0#}.360buyimg.com/n{#s1#}/{#s2#}',
		itemLogo = {
			img350: '1',
			img160: '2',
			img130: '3',
			img100: '4',
			img50: '5',
			img240: '6',
			img220: '7',
			img283: '8',
			img25: '9',
			big: '7',
			list: '2',
			listMode: '0'
		},
		filterDefVal = {
			name: '',
			id: '0',
			mulName: '',
			mulId: '0'
		},
		sortConstant = {
			dredispriceAsc: 'sort_dredisprice_asc',
			dredispriceDesc: 'sort_dredisprice_desc',
			saleDesc: 'sort_totalsales15_desc',
			saleDesc3: 'sort_redissale_desc',
			commentcountDesc: 'sort_commentcount_desc',
			goodDesc: 'sort_good_desc',
			winsdateDesc: 'sort_winsdate_desc',
			pingounumDesc: 'sort_pingou_num_desc'
		},
		network = JD.cookie.get('network'),
		fastNet = network == 'wifi' || network == '4g',
		dpgInfo = JD.device.isAndroid ? {
			bigWH: fastNet ? 357 : 270,
			longW: fastNet ? 372 : 270,
			longH: fastNet ? 458 : 347
		} : {
			bigWH: fastNet ? 372 : 308,
			longW: fastNet ? 372 : 308,
			longH: fastNet ? 478 : 396
		};

	function changeCgReport(tar, mark) {
		var tar = $(tar),
			check = tar.hasClass(mark),
			curRd = tar.attr('rd');
		if(check) {
			var ord = tar.attr('ord');
			if(ord) {
				window.setTimeout(function() {
					tar.attr('rd', ord);
					tar.find('[rd="' + curRd + '"]').attr('rd', ord);
				}, 200);
			}
		} else {
			var crd = tar.attr('crd');
			if(crd) {
				window.setTimeout(function() {
					tar.attr('rd', crd);
					tar.find('[rd="' + curRd + '"]').attr('rd', crd);
				}, 200);
			}
		}
	}

	function setImgList(img) {
		itemLogo.list = img;
	}

	function setImgBig(img) {
		itemLogo.big = img;
	}

	function poorImgQuality() {
		itemLogo.list = itemLogo.img130;
	}

	function setListMode(listMode) {
		itemLogo.listMode = listMode;
	}
	var autoLoadImage = function() {
		var delay, viewHeight = $(window).height(),
			timeout, images = [],
			num = 0;

		function load(listMode, offsetHeight, retina, webpForce, itemClass, longImgClass, onlyFragment) {
			itemLogo.listMode = listMode;
			itemClass = itemClass || 'pro_item';
			longImgClass = longImgClass || 'item_long_cover';
			offsetHeight = offsetHeight || 0;
			images = [];
			$('img[init_src][inited="0"]').each(function() {
				var $img = $(this);
				images.push({
					obj: $img,
					top: $img.offset().top
				});
			});
			num = images.length;
			timeout && window.clearTimeout(timeout);
			timeout = window.setTimeout(function calLoad() {
				var logoSta = itemLogo.listMode == '1' ? itemLogo.big : itemLogo.list;
				var scrollHeight = window.pageYOffset,
					visibleTop = scrollHeight - 200 - offsetHeight,
					visibleBottom = viewHeight + scrollHeight + offsetHeight;
				images.forEach(function(data) {
					var $elem = data.obj,
						skuid = $elem.attr('skuid'),
						logo = $elem.attr('init_src'),
						loaded = $elem.attr("inited"),
						lpmark = $elem.attr('lpmark'),
						realExposure = $elem.attr('real-exposure'),
						tempSta = logoSta == itemLogo.big && lpmark == '1' ? itemLogo.img283 : logoSta;
					if(visibleBottom > data.top && (onlyFragment ? visibleTop < data.top : true) && loaded !== '1') {
						if(realExposure == 1) {
							logo && $elem.attr('src', logo);
						} else {
							if(tempSta != itemLogo.img283) {
								var logo2 = $elem.attr('init_src2');
								logo2 && (logo = logo2);
							}
							logo && $elem.attr('src', genItemImgUrl(skuid, tempSta, logo, retina, webpForce));
							if(logoSta == itemLogo.big && lpmark == '1') {
								$elem.parents('.' + itemClass).addClass(longImgClass);
							} else {
								$elem.parents('.' + itemClass).removeClass(longImgClass);
							}
						}
						$elem.attr('inited', '1');
						num--;
					}
				});
				if(num === 0) {
					window.clearTimeout(timeout);
					timeout = null;
				} else {
					timeout = window.setTimeout(calLoad, 100);
				}
			}, 100);
		}
		return function(listMode, offsetHeight, retina, webpForce, itemClass, longImgClass, onlyFragment) {
			window.clearTimeout(delay);
			delay = window.setTimeout(function() {
				load(listMode, offsetHeight, retina, webpForce, itemClass, longImgClass, onlyFragment);
			}, 10);
		};
	}();

	function genItemImgUrl(skuid, tempSta, logo, retina, webpForce) {
		var logoUrl = logoTpl.replace('{#s0#}', skuid % 5).replace('{#s1#}', tempSta).replace('{#s2#}', logo),
			tW = 270,
			tH = 270,
			cut = false;
		if(itemLogo.listMode == '1') {
			tW = dpgInfo.bigWH;
			tH = dpgInfo.bigWH;
			if(tempSta == itemLogo.img283) {
				tW = dpgInfo.longW;
				tH = dpgInfo.longH;
				cut = true;
			}
		}
		return JD.img.getScaleImgDpg(logoUrl, tW, tH, cut);
	}

	function getScaleImg(url, wf, fbl, cut) {
		var turl = url;
		if(JD.device.webp) {
			turl = url + (fbl && cut ? '!cc_' + fbl : '') + '!q70.dpg.webp';
		} else if(/\.(jpg|jpeg)$/.test(url) && !/!q\d{2}\.(jpg|jpeg)$/i.test(url)) {
			turl = url + (fbl && cut ? '!cc_' + fbl : '') + '!q70.dpg';
		}
		return turl;
	}

	function dealSimpSea2Detail(product) {
		if(window._simpSea2Detail === '1') {
			for(var i = 0, len = product.length; i < len; ++i) {
				var prod = product[i],
					link = $('#link_' + prod.wareid);
				if(link) {
					var tourl = link.attr('tourl');
					tourl += '&imageurl=' + encodeURIComponent(prod.Content.imageurl);
					tourl += '&warename=' + encodeURIComponent(prod.Content.warename);
					tourl += '&hprice=' + prod.hprice;
					tourl += '&stock=' + prod.stock;
					link.attr('tourl', tourl);
				}
			}
		}
	}

	function grayStrategy() {
		var whiteList = window._searchWhiteList || '',
			pin = JD.cookie.get('pin');
		if(!pin) return false;
		return !!~whiteList.indexOf(pin);
	}

	function grayStrategyPer() {
		var rate = window._GRAYPER || 0,
			vk = JD.cookie.get("visitkey"),
			sk = (vk || '0') % 100;
		return(rate == 99) || (rate && rate >= sk);
	}

	function samReport(url) {
		var _rName = '_SPEEDPOINT' + Math.random();
		window[_rName] = new Image();
		window[_rName].src = url;
	}

	function doReport(evObj, cb) {
		try {
			if(!window.jdPvLog) {
				setTimeout(function() {
					doReport(evObj, cb);
				}, 150);
				return;
			}
			window.jdPvLog(evObj);
			cb && cb();
		} catch(e) {}
	}

	function addUrlParam(url, name, val, mark, replace) {
		var pk = ~url.indexOf('?') ? '&' : '?',
			ind = url.indexOf(pk + name + '=');
		if(ind >= 0) {
			var reg = new RegExp('(\\' + pk + name + '=[^&#]*)');
			if(replace) {
				url = url.replace(reg, pk + name + '=' + val);
			} else {
				url = url.replace(reg, '$1' + (mark ? mark : '') + val);
			}
		} else {
			var ha = url.indexOf('#');
			if(ha > -1) {
				var temp = url.split('#'),
					prul = temp[0],
					hash = temp[1];
				url = prul + pk + name + '=' + val + '#' + hash;
			} else {
				url += pk + name + '=' + val;
			}
		}
		return url;
	}

	function mergeProductExt(url, mark) {
		mark = mark || 'product_ext';
		var reg = new RegExp(mark + ',([^;]*);', 'g'),
			reg2 = new RegExp(mark + ',([^;]*);'),
			matchs = url.match(reg);
		if(matchs.length > 1) {
			var temp = [];
			for(var i = 0, len = matchs.length; i < len; ++i) {
				var ms = matchs[i].match(reg2);
				if(ms.length > 0) {
					temp.push(ms[1]);
				}
			}
			if(temp.length > 0) {
				url = url.replace(reg, '');
				url = addUrlParam(url, 'filt_type', mark + ',' + temp.join('||') + ';');
			}
		}
		return url;
	}

	function addHash(json, url) {
		var hash = location.hash;
		if(url) {
			hash = url.substr(url.indexOf('#'));
		}
		if(hash.length > 0) {
			hash = hash.substr(1);
		}
		var buff = [],
			urlchan = false;
		for(var i in json) {
			var reg = new RegExp('(&?)' + i + '=([^&]*)(&|$)'),
				val = json[i],
				mat = hash.match(reg);
			if(mat) {
				if(mat[2] != val) {
					urlchan = true;
				}
				hash = hash.replace(reg, '$1' + i + '=' + val + '$3');
			} else {
				buff.push(i + "=" + val);
			}
		}
		if(buff.length > 0) {
			urlchan = true;
			hash = hash + (hash.length > 0 ? '&' : '') + buff.join("&");
		}
		if(url) {
			var ind = url.indexOf('#');
			return(ind >= 0 ? url.substr(0, ind) : url) + '#' + hash;
		} else if(urlchan) {
			location.hash = hash;
		}
	}

	function removeHash(json) {
		var hash = location.hash,
			urlchan = false;
		if(hash.length > 0) {
			hash = hash.substr(1);
		}
		for(var i in json) {
			var reg = new RegExp('(&?)' + i + '=([^&]*)(&|$)'),
				mat = hash.match(reg);
			if(mat) {
				urlchan = true;
				hash = hash.replace(reg, '$3');
			}
		}
		if(urlchan) {
			location.hash = hash;
		}
	}

	function setBrand(url, filter) {
		if(filter.brand !== filterDefVal.mulName) {
			var bs = filter.brand.replace(/^\|/, '').replace(/\|$/, '').split('|');
			url = genExpressionKeyUrl(url, 'brand', bs, filter.multiSelect);
		}
		return url;
	}

	function setCategory(url, filter) {
		if(filter.categoryId !== filterDefVal.mulId) {
			var cats = filter.categoryId.replace(/^\|/, '').replace(/\|$/, '').split('|');
			var ctr = filter.categoryLevel === '1' ? 'cid1' : filter.categoryLevel === '2' ? 'cid2' : 'catid';
			var params = [];
			for(var i = 0, len = cats.length; i < len; ++i) {
				params.push('L' + cats[i] + 'M' + cats[i]);
			}
			url = addUrlParam(url, 'filt_type', ctr + ',' + params.join('||') + ';');
		}
		return url;
	}

	function setPrice(url, filter) {
		if(filter.priceMin !== '-1' && filter.priceMax !== '-1') {
			var price = filter.isPingouSearch ? 'pingou_price,' : 'dredisprice,';
			url = addUrlParam(url, 'filt_type', price + 'L' + filter.priceMax + 'M' + filter.priceMin + ';');
		}
		return url;
	}

	function setCashond(url, filter) {
		if(filter.cashond == '1') {
			url = addUrlParam(url, 'filt_type', 'cod,L1M1;');
		}
		return url;
	}

	function setGloabal(url, filter) {
		if(filter.gloabal == '1') {
			url = addUrlParam(url, 'filt_type', 'product_ext,b11v1;');
			url = mergeProductExt(url);
		}
		return url;
	}

	function setPLUS(url, filter) {
		if(filter.plus == '1') {
			url = addUrlParam(url, 'filt_type', 'promotion_type,b4v1;');
		}
		return url;
	}

	function setDisGloabal(url, filter) {
		if(filter.disgloabal == '1') {
			url = addUrlParam(url, 'filt_type', 'product_ext,b21v1||b22v1||b30v1;');
			url = mergeProductExt(url);
		}
		return url;
	}

	function setVipDis(url, filter) {
		if(filter.vipdis == '1') {
			url = addUrlParam(url, 'filt_type', 'product_ext,b3v1;');
			url = mergeProductExt(url);
		}
		return url;
	}

	function setArtwork(url, filter) {
		if(filter.artwork == '1') {
			url = addUrlParam(url, 'filt_type', 'productext2,b5v1;');
			url = mergeProductExt(url, 'productext2');
		}
		return url;
	}

	function setPgitem(url, filter) {
		if(filter.pgitem == '1') {
			url = addUrlParam(url, 'filt_type', 'productext2,b12v1;');
			url = mergeProductExt(url, 'productext2');
		}
		return url;
	}

	function setPromo(url, filter) {
		if(filter.promo == '1') {
			url = addUrlParam(url, 'filt_type', 'promotion_address,b2v1||b7v1;');
		}
		return url;
	}

	function setRedisstore(url, filter) {
		if(!filter.areaId[0] || filter.areaId[0] == 84) {
			return url;
		}
		if(filter.redisstore == '1' && filter.areaId[0] !== '0') {
			url = addUrlParam(url, 'filt_type', 'redisstore,1;');
		}
		return url;
	}

	function setDistributionAreas(url, filter) {
		if(!filter.areaId[0] || filter.areaId[0] == 84) {
			return url;
		}
		if(filter.areaId[0] !== '0') {
			url = addUrlParam(url, 'area_ids', filter.areaId.join(','));
		}
		return url;
	}

	function setDistributionSide(url, filter) {
		if(filter.dSideId === '1') {
			url = addUrlParam(url, 'filt_type', 'col_type,L0M0;');
		} else if(filter.dSideId === '2') {
			url = addUrlParam(url, 'filt_type', 'col_type,L1M1;');
		}
		return url;
	}

	function setActParam(url, filter, actid) {
		if(!(actid instanceof Array)) {
			actid = [actid];
		}
		var strs = [];
		for(var i = 0, len = actid.length; i < len; ++i) {
			var aid = actid[i],
				temActCehck = filter['actCheck' + (i + 1)];
			if(temActCehck != filterDefVal.id) {
				strs.push('L' + aid + 'M' + aid);
			}
		}
		if(strs.length > 0) {
			url = addUrlParam(url, 'filt_type', 'ico,' + strs.join('||') + ';');
		}
		if(util.isSQ()) {
			url = addUrlParam(url, 'sys_flag', 'qq');
		}
		return url;
	}

	function setActParamV2(url, filter, activeInfo) {
		if(!filter.actInfo) return url;
		var strs = [];
		for(var i = 0, len = activeInfo.length; i < len; ++i) {
			var info = activeInfo[i];
			if(info.actMark != filter.actInfo.actMark) continue;
			if(filter.actInfo.actCheck != filterDefVal.id) {
				var actids = info.actid.split('|');
				for(var j = 0, jlen = actids.length; j < jlen; ++j) {
					strs.push('L' + actids[j] + 'M' + actids[j]);
				}
			}
		}
		if(strs.length > 0) {
			url = addUrlParam(url, 'filt_type', 'ico,' + strs.join('||') + ';');
		}
		if(util.isSQ()) {
			url = addUrlParam(url, 'sys_flag', 'qq');
		}
		return url;
	}

	function genExpressionKeyUrl(url, keyName, keys, isMultiSel) {
		var ek = url.indexOf('expression_key') != -1;
		if(isMultiSel) {
			for(var i = 0, len = keys.length; i < len; ++i) {
				url = addUrlParam(url, 'expression_key', ((ek && i == 0) ? encodeURIComponent('[+]') : '') + (i == 0 ? encodeURIComponent('[(]') : '') + keyName + ',,' + encodeURIComponent(keys[i]) + (i == len - 1 ? encodeURIComponent('[)]') : ''), (i > 0 ? encodeURIComponent('[|]') : ''));
			}
			(!~url.indexOf('multi_select')) && (url = addUrlParam(url, 'multi_select', 'yes'));
		} else {
			url = addUrlParam(url, 'expression_key', keyName + ',,' + encodeURIComponent(keys[0]) + ';;');
		}
		return url;
	}

	function setExpandAttr(url, filter) {
		var extCou = 0;
		for(var k = 0, flen = filter.extAttr.length; k < flen; ++k) {
			var attr = filter.extAttr[k];
			if(attr.id === filterDefVal.mulId) continue;
			if(attr.tid === 'exp_color') {
				if(attr.value != '全部') {
					var bs = attr.value.replace(/^\|/, '').replace(/\|$/, '').split('|');
					url = genExpressionKeyUrl(url, 'exp_color', bs, filter.multiSelect);
				}
			} else if(attr.tid === 'exp_size') {
				if(attr.value != '全部') {
					var bs = attr.value.replace(/^\|/, '').replace(/\|$/, '').split('|');
					url = genExpressionKeyUrl(url, 'exp_size', bs, filter.multiSelect);
				}
			} else {
				var bs = attr.id.replace(/^\|/, '').replace(/\|$/, '').split('|');
				for(var i = 0, len = bs.length; i < len; ++i) {
					var pre = '';
					if(extCou == 0) {
						if(i == 0) {
							pre = 'expand_name,';
						}
					} else {
						if(i == 0) {
							pre = '^^';
						}
					}
					url = addUrlParam(url, 'filt_type', pre + bs[i], (i > 0 ? '||' : ''));
				}
				url = addUrlParam(url, 'filt_type', '@@' + attr.tid);
				bs.length > 0 && extCou++;
			}
		}
		if(extCou > 0) {
			url = addUrlParam(url, 'filt_type', ';');
		}
		return url;
	}

	function setBookParam(url, filter) {
		if(filter.package != filterDefVal.mulName) {
			var bs = filter.package.replace(/^\|/, '').replace(/\|$/, '').split('|');
			url = genExpressionKeyUrl(url, 'package', bs, filter.multiSelect);
		}
		if(filter.publishers != filterDefVal.mulName) {
			var bs = filter.publishers.replace(/^\|/, '').replace(/\|$/, '').split('|');
			url = genExpressionKeyUrl(url, 'publishers', bs, filter.multiSelect);
		}
		if(filter.dregion != filterDefVal.mulName) {
			var bs = filter.dregion.replace(/^\|/, '').replace(/\|$/, '').split('|');
			url = genExpressionKeyUrl(url, 'dregion', bs, filter.multiSelect);
		}
		if(filter.media != filterDefVal.mulName) {
			var bs = filter.media.replace(/^\|/, '').replace(/\|$/, '').split('|');
			url = genExpressionKeyUrl(url, 'media', bs, filter.multiSelect);
		}
		if(filter.packstate != '-1') {
			url = addUrlParam(url, 'filt_type', 'packnum,L' + filter.packstate + 'M' + filter.packstate + ';');
		}
		return url;
	}

	function setSortType(url, sortType) {
		if(sortType) {
			url = addUrlParam(url, 'sort_type', sortType);
		}
		return url;
	}

	function setExtParam(url, pobj) {
		for(var key in pobj) {
			if(pobj[key]) {
				url = addUrlParam(url, key, pobj[key]);
			}
		}
		return url;
	}

	function setCarParam(url, filter) {
		if(filter.carModelId != filterDefVal.mulId) {
			url = addUrlParam(url, 'filt_type', 'car_model_id,' + filter.carModelId + ';');
			url = addUrlParam(url, 'car_model_id', filter.carModelId);
			JD.cookie.set('wq_carmid', filter.carModelId, 86400, '/', 'jd.com');
		}
		return url;
	}

	function setBabyParam(url, filter) {
		if(filter.babySexAge != filterDefVal.mulId) {
			var sexage = filter.babySexAge.split('-');
			url = addUrlParam(url, 'baby_sex', sexage[0]);
			url = addUrlParam(url, 'baby_age', sexage[1]);
		}
		return url;
	}

	function setExtFilterParam(url, filter) {
		if(filter.zy211 != filterDefVal.id) {
			url = addUrlParam(url, 'filt_type', 'delivertime,1;');
		}
		if(filter.newItems != filterDefVal.id) {
			url = addUrlParam(url, 'filt_type', 'product_ext,b26v1;');
			url = mergeProductExt(url);
		}
		return url;
	}

	function updateSfUrl() {
		var ref = document.referrer;
		if(!ref) return getSfUrl();
		var mat = location.href.match(/^[^\?]*/);
		if(mat && mat.length > 0) {
			var reg = new RegExp('^' + mat[0]);
			if(!reg.test(ref)) {
				util.saveStorage('search_sf_url', ref, false);
				return ref;
			}
		}
		return getSfUrl();
	}

	function getSfUrl() {
		return util.getStorage('search_sf_url') || '';
	}

	function formatData(time, str) {
		var date = new Date();
		date.setTime(time);
		return str.replace(/yyyy/, date.getFullYear()).replace(/mm/, date.getMonth() + 1).replace(/dd/, date.getDate(), 2).replace(/((?!\d).)(\d{1})(?!\d)/g, '$10$2');
	}

	function priceFormatter(p) {
		var pstr = (p + '').replace(/(^[^\.]+)/, '<span class="int">$1</span>');
		if(p >= 10000) {
			pstr = pstr.replace(/\.\d*$/, '');
		}
		return pstr;
	}
	module.exports = {
		LOGO_TPL: logoTpl,
		ITEM_LOGO: itemLogo,
		SORT_CONSTANT: sortConstant,
		FILTER_DEFVAL: filterDefVal,
		setImgList: setImgList,
		setImgBig: setImgBig,
		poorImgQuality: poorImgQuality,
		setListMode: setListMode,
		changeCgReport: changeCgReport,
		autoLoadImage: autoLoadImage,
		genItemImgUrl: genItemImgUrl,
		getScaleImg: getScaleImg,
		grayStrategy: grayStrategy,
		grayStrategyPer: grayStrategyPer,
		samReport: samReport,
		doReport: doReport,
		addUrlParam: addUrlParam,
		removeHash: removeHash,
		addHash: addHash,
		dealSimpSea2Detail: dealSimpSea2Detail,
		updateSfUrl: updateSfUrl,
		getSfUrl: getSfUrl,
		genExpressionKeyUrl: genExpressionKeyUrl,
		setBrand: setBrand,
		setCategory: setCategory,
		setPrice: setPrice,
		setCashond: setCashond,
		setGloabal: setGloabal,
		setPLUS: setPLUS,
		setDisGloabal: setDisGloabal,
		setVipDis: setVipDis,
		setArtwork: setArtwork,
		setPgitem: setPgitem,
		setPromo: setPromo,
		setRedisstore: setRedisstore,
		setDistributionAreas: setDistributionAreas,
		setDistributionSide: setDistributionSide,
		setActParam: setActParam,
		setActParamV2: setActParamV2,
		setExpandAttr: setExpandAttr,
		setBookParam: setBookParam,
		setSortType: setSortType,
		setExtParam: setExtParam,
		setCarParam: setCarParam,
		setBabyParam: setBabyParam,
		setExtFilterParam: setExtFilterParam,
		formatData: formatData,
		priceFormatter: priceFormatter
	};
});
define('spiderCheck', function(require, exports, module) {
	var $ = require('zepto'),
		ls = require('loadJs'),
		verifyImg = '//wq.jd.com/bases/verify/captcha',
		tpl = '<div style="display:none;position: fixed;top: 0;left: 0;bottom: 0;right: 0;z-index: 898;height: 100%;width: 100%;    background-color: rgba(0,0,0,.7);">' + '<div id="spiderCheckAlert" class="mod_alert" style="z-index: 899;position: fixed;left: 50%;top: 50%;margin: auto;-webkit-transform: translate(-50%,-50%);transform: translate(-50%,-50%);">' + '<i class="icon"></i>' + '<p area="alertTip">{#alertTip#}</p>' + '<div class="verify_input" style="position: relative;margin: 10px 0;padding: 0 90px 0 10px;background-color: #f7f7f7;">' + '<input class="input" type="text" area="verifyInput" style="padding: 7px 0;width: 100%;height: 30px;border: none;-webkit-appearance: none;color: #333;background-color: #f7f7f7;font-size: 14px;">' + '<span class="wrap" style="position: absolute;right: 2px;top: 2px;width: 80px;padding-top: 40px;">' + '<img src="' + verifyImg + '" alt="点击刷新" area="verifyCodeImg" style="position: absolute;top: 0;right: 0;width: 80px;height: 40px;border-radius: 2px;"></span>' + '</div>' + '<p class="warn_text" area="warnTip" style="display: none;color: #e4393c;font-size: 12px;text-align: left;">验证码错误或超时，请重新输入</p>' + '<p class="btns" area="comfirmBtn"><a href="javascript:void(0);" class="btn btn_1">提交</a></p>' + '</div>' + '</div>',
		$spiderCheckAlert = $('#spiderCheckAlert'),
		$parentDiv = $('#spiderCheckAlert').parent('div'),
		$verifyInput = $spiderCheckAlert.find('[area="verifyInput"]'),
		$verifyCodeImg = $spiderCheckAlert.find('[area="verifyCodeImg"]'),
		$comfirmBtn = $spiderCheckAlert.find('[area="comfirmBtn"]'),
		$warnTip = $spiderCheckAlert.find('[area="warnTip"]'),
		$alertTip = $spiderCheckAlert.find('[area="alertTip"]'),
		scrollTop = 0,
		config = {
			source: '',
			successCB: null,
			errorCB: null
		},
		show = function(opt) {
			opt = opt || {};
			$.extend(config, opt);
			config.alertTip = config.alertTip || '当前访问人数过多，请输入验证码后继续访问';
			verifyImg = '//wq.jd.com/bases/verify/captcha?source=' + config.source;
			showVerifyImg();
			bindEvent();
		},
		showVerifyImg = function() {
			if(!$spiderCheckAlert.length) {
				$('body').append(tpl);
				$spiderCheckAlert = $('#spiderCheckAlert');
				$parentDiv = $('#spiderCheckAlert').parent('div');
				$verifyInput = $spiderCheckAlert.find('[area="verifyInput"]');
				$verifyCodeImg = $spiderCheckAlert.find('[area="verifyCodeImg"]');
				$comfirmBtn = $spiderCheckAlert.find('[area="comfirmBtn"]');
				$warnTip = $spiderCheckAlert.find('[area="warnTip"]');
				$alertTip = $spiderCheckAlert.find('[area="alertTip"]');
			}
			scrollTop = $(window).scrollTop();
			$('body').css('top', '-' + scrollTop + 'px').addClass('overflowHide');
			$verifyCodeImg.attr('src', verifyImg + '&t=' + Math.random());
			$alertTip.html(config.alertTip);
			$parentDiv.show();
		},
		bindEvent = function() {
			$verifyInput.off().on('focus', function() {
				$warnTip.hide();
			});
			$verifyCodeImg.off().on('click', function() {
				$verifyCodeImg.attr('src', verifyImg + '&t=' + Math.random());
			});
			$comfirmBtn.off().on('click', function() {
				verifyCodeCheck();
			});
		},
		verifyCodeCheck = function() {
			var inputStr = $.trim($verifyInput.val());
			if(!inputStr) {
				$warnTip.html('请输入验证码').show();
				config.errorCB && config.errorCB();
				return;
			}
			window.codeCheckCB = function(json) {
				if(json.errCode == '0') {
					$('body').removeClass('overflowHide').css('top', '');
					$(window).scrollTop(scrollTop);
					$verifyInput.val('');
					$parentDiv.hide();
					config.successCB && config.successCB();
				} else {
					$warnTip.html('验证码错误或超时，请重新输入').show();
					config.errorCB && config.errorCB();
					$verifyCodeImg.attr('src', verifyImg + '&t=' + Math.random());
				}
			};
			ls.loadScript('//wq.jd.com/bases/verify/check?callback=codeCheckCB&source=' + config.source + '&code=' + inputStr);
		};
	exports.show = show;
});
define('wq.address', function(require, exports, module) {
	var _cacheThisModule_;
	var $ = require('zepto'),
		ls = require('loadJs'),
		util = require('util'),
		login = require('login'),
		storage_version = 'jd_areamap_201711',
		isLogin, commonAddrHtml = [],
		usualAddrList = [],
		areaCgiHold = false,
		gpsHtml = '',
		area = ['全部'],
		areaId = ['0'],
		addrId = '',
		gpsChoice = false,
		uname = '',
		uphone = '',
		addrName = '',
		addrIdArr = [],
		addrNameArr = [],
		longitude = '',
		latitude = '',
		isDefaultAddr = false,
		isHasDefaultAddr = false,
		curAddr = {},
		domainStr = 'jd.com',
		isMQQBrowser = /MQQBrowser/i.test(navigator.userAgent),
		level = 0,
		cache = {},
		addrToken = '',
		isMCart = false,
		selectedAddr = {},
		lastSelectFlag = 0,
		opt = {
			con: '',
			title: '配送至',
			deep: 4,
			commonType: '1',
			clickEvent: 'click',
			onClose: function() {},
			onlySaveCommon: false,
			isNeedCss: true,
			isNeedCommon: true,
			isNeedFixed: false,
			overClass: 'overflowHide',
			isSearch: false,
			isShowHW: true,
			isShowTW: true,
			isShowGA: true
		};
	module.exports = {
		init: init,
		show: show,
		reset: reset,
		getAddrInfo: getAddrInfo,
		setAddrCookies: setAddrCookies,
		clearCookies: clearCookies
	};

	function init(option) {
		isMCart = /(^|[&|?])sceneval=2([&|#]|$)/.test(location.search) || /(\.|^)m\.jd\.com/.test(document.domain) || (option.sceneval && option.sceneval == 2);
		$.extend(opt, option);
		isLogin = login.isLogin();
		opt.commonType = '1';
		if(!isLogin) {
			opt.isNeedCommon = false;
		}
		try {
			domainStr = (document.domain || 'wq.jd.com').split('.').slice(-2).join('.');
		} catch(e) {
			domainStr = 'jd.com';
		}
		loadCss();
		setBasicDom();
		bindEvent();
		if(opt.commonType == 1) $('#addrGps').hide();
	}

	function show(lev) {
		level = lev || 0;
		showHidePopup(true);
		curAddr = getAddrInfo();
		if(opt.isNeedCommon) {
			getCommonAddrV1();
		} else if(opt.commonType == '2') {
			getCommonAddrV1();
			getAreaList();
		} else {
			getAreaList();
		}
	}

	function reset(option) {
		commonAddrHtml = [];
		isLogin = login.isLogin();
		usualAddrList = [];
		areaCgiHold = false;
		if(option) {
			$.extend(opt, option);
		}
	}

	function bindEvent() {
		$('#addrBody').off().on(opt.clickEvent, '[filter-type]', function(e) {
			var tar = $(this),
				ftype = tar.attr('filter-type'),
				isTab = (tar.attr('tag') == '1'),
				selectClass = (opt.isSearch ? 'selected' : 'on');
			if(isTab) {
				tar.addClass('cur').siblings().removeClass('cur');
			}
			if(ftype === 'area') {
				if(areaCgiHold) {
					areaCgiHold = false;
					level--;
				}
				var tid = tar.attr('tid'),
					tname = tar.attr('tname'),
					extid = tar.attr('extid');
				if(extid) {
					level = parseInt(extid, 10) + 1;
				} else {
					level++;
				}
				if(!isTab) {
					tar.addClass(selectClass).siblings().removeClass(selectClass);
					area[level] = tname;
					areaId[level] = tid;
					clearArea(level + 1);
				}
				if(level < opt.deep && level < 4) {
					getAreaList(isTab);
				}
				if(level >= opt.deep || level >= 4) {
					$('#ulAddrTab li.cur').hide();
					finish();
				}
			} else if(ftype === 'common') {
				var $target = $(e.target);
				if($target.hasClass('mod_address_slide_list_1_warn') || $target.hasClass('mod_address_slide_list_1_edit')) {
					var tempAddrId = tar.attr('addrid');
					showHidePopup();
					if(tempAddrId) {
						opt.beforeEdit && opt.beforeEdit();
						location.href = '//wqs.jd.com/my/my_address.shtml?ptag=7387.1.4&token=' + addrToken + (isMCart ? '&sceneval=2' : '') + '&backurl=' + encodeURIComponent(location.href) + '#type=edit&adid=' + tempAddrId;
					}
				} else if(tar.attr('addrid') && tar.attr('addrname') && !tar.hasClass('disabled')) {
					tar.addClass(selectClass).siblings().removeClass(selectClass);
					addrId = tar.attr('addrid');
					addrName = tar.attr('addrname');
					addrIdArr = (tar.attr('ids') || '').split('_');
					addrNameArr = (tar.attr('names') || '').split('_');
					longitude = (tar.attr('longitude') || '');
					latitude = (tar.attr('latitude') || '');
					isDefaultAddr = (tar.attr('isdefaultaddr') || '');
					uname = decodeURIComponent(tar.attr('uname') || '');
					uphone = tar.attr('uphone') || '';
					finish({
						uname: uname,
						uphone: uphone
					});
				}
			} else if(ftype === 'addaddr') {
				showHidePopup();
				opt.beforeEdit && opt.beforeEdit();
				location.href = '//wqs.jd.com/my/my_address.shtml?ptag=7387.1.5' + (isMCart ? '&sceneval=2' : '') + '&backurl=' + encodeURIComponent(location.href) + '#type=edit&adid=0';
			} else if(ftype === 'areaaddr') {
				getAreaList();
			} else {
				finish();
			}
		});
		$('#addrGps').off().on(opt.clickEvent, 'dl', function(e) {
			var tar = $(this);
			tar.toggleClass('on');
			if(tar.hasClass('on')) {
				addrId = '';
				gpsChoice = true;
				addrIdArr = (tar.attr('ids') || '').split('_');
				addrNameArr = (tar.attr('names') || '').split('_');
				finish();
			}
		});
		if(opt.isSearch) {
			$('#searchFoot').off().on(opt.clickEvent, function(e) {
				getAreaList();
			});
			$('#searchPrev').off().on(opt.clickEvent, function(e) {
				var tar = $(this),
					tag = tar.attr('tag');
				if(tag == '2') {
					if(opt.isNeedCommon) {
						getCommonAddrV1();
					} else {
						showHidePopup();
						opt.onClose && opt.onClose();
					}
				} else {
					showHidePopup();
					opt.onClose && opt.onClose();
				}
			});
		} else {
			$('#addrBtn').off().on(opt.clickEvent, function(e) {
				var tar = $(this),
					tag = tar.attr('tag');
				if(tag === '1') {
					getAreaList();
				} else if(tag === '3') {
					showHidePopup();
					opt.beforeEdit && opt.beforeEdit();
					location.href = '//wqs.jd.com/my/my_address.shtml?ptag=7387.1.5' + (isMCart ? '&sceneval=2' : '') + '&backurl=' + encodeURIComponent(location.href) + '#type=edit&adid=0';
				}
			});
			$('#popupAddr').off().on(opt.clickEvent, function(event) {
				var $tag = $(event.target);
				if($tag.hasClass('close') || ($tag.parents('.mod_address_slide_main').length == 0 && $tag.closest('.mod_address_slide').length)) {
					showHidePopup();
					opt.onClose && opt.onClose();
				} else if($tag.hasClass('back')) {
					getCommonAddrV1();
				}
			});
		}
	}

	function clearArea(num) {
		if(num < areaId.length) {
			for(var i = num, len = areaId.length; i < len; ++i) {
				delete areaId[i];
				delete area[i];
			}
			areaId.length = num;
			area.length = num;
		}
	}

	function getAreaList(flag) {
		if(!$('#ulAddrTab').length || !$('#ulAddrList').length) {
			var domStr = '<ul class="mod_address_slide_tabs_1" id="ulAddrTab" style="display:none;"></ul><ul class="mod_address_slide_list_2" ptag="7387.1.2" id="ulAddrList" style="display:none;"></ul>';
			if(opt.isSearch) {
				domStr = '<div class="tab"><ul class="tab_list" id="ulAddrTab"></ul></div><div class="search_addrlayer_body_scroller"><div class="search_addrlayer_body_scroller_inner"><ul class="list_1" id="ulAddrList" style="display:none;"></ul></div></div>';
			}
			$('#addrBody').html(domStr);
		}
		if(opt.isSearch) {
			$('#searchFoot').hide();
			$('#searchAddr').removeClass('with_foot');
			$('#searchPrev').attr('tag', '2');
		} else {
			if($('#addrBtn').attr('tag') !== '3') $('#addrBtn').hide().parent().hide();
			$('#popupAddrHead').html((commonAddrHtml.length > 0 ? '<i class="back">返回</i>' : '') + '选择区域<i class="close"></i>');
			$('#popupAddr div.mod_address_slide_main').addClass('type_flex');
		}
		if(!flag) {
			if(level > 0) {
				var tabArr = [],
					searchStr = (opt.isSearch ? ' class="item"' : '');
				for(var i = 1; i <= level; i++) {
					if(area[i]) tabArr.push('<li tag="1"' + searchStr + (areaId[i - 1] ? ' filter-type="area" tid="' + areaId[i - 1] + '" tname="' + area[i - 1] + '" extid="' + (i - 2) + '"' : '') + '><span>' + area[i] + '</span></li>');
				}
				tabArr.push('<li tag="1"' + (areaId[level] ? ' filter-type="area" tid="' + areaId[level] + '" tname="' + area[level] + '" extid="' + (level - 1) + '"' : '') + ' class="' + (opt.isSearch ? 'item ' : '') + 'cur"><span>请选择</span></li>');
				$('#ulAddrTab').html(tabArr.join('')).show();
			} else {
				$('#ulAddrTab').html('<li class="' + (opt.isSearch ? 'item ' : '') + 'cur"><span>请选择</span></li>').show();
			}
		}
		var areaid = areaId[level];
		if(cache[areaid] && cache[areaid].length > 0) {
			fillAreas(cache[areaid], flag, areaid);
			return;
		}
		var areas = util.getStorage(storage_version);
		if(areas) {
			areas = JSON.parse(areas);
			if(areas[areaid] && areas[areaid].length > 0) {
				fillAreas(areas[areaid], flag, areaid);
				return;
			}
		}
		var url = '//fts.jd.com/area/get?fid=' + areaid + '&callback=getAreaList_callback' + (isMCart ? '&sceneval=2' : '');
		window.getAreaList_callback = function(list) {
			areaCgiHold = false;
			var tempAreas = [];
			for(var i = 0, len = list.length; i < len; ++i) {
				if(level == 0) {
					if(list[i].id > 0 && (list[i].id < 100 || list[i].id == 52993)) {
						tempAreas.push(list[i]);
					}
				} else {
					tempAreas.push(list[i]);
				}
			}
			if(tempAreas.length > 0) {
				fillAreas(tempAreas, flag, areaid);
				cache[areaid] = tempAreas;
				!areas && (areas = {});
				areas[areaid] = tempAreas;
				util.saveStorage(storage_version, areas, true);
			} else {
				clearArea(level + 1);
				finish();
			}
		};
		if(!areaCgiHold) {
			areaCgiHold = true;
			ls.loadScript({
				url: url
			});
		}
	}

	function finish(res) {
		selectedAddr = {}
		showHidePopup();
		if(!gpsChoice) $('#addrGps dl').removeClass('on');
		if(addrId && addrName) {
			lastSelectFlag = 2
			selectedAddr = {
				ids: addrIdArr,
				names: addrNameArr,
				id: addrId,
				name: addrName,
				longitude: longitude,
				latitude: latitude,
				isShortCache: isDefaultAddr != '1' && isHasDefaultAddr
			}
			setAddrCookies(selectedAddr);
			addrId = '';
			isDefaultAddr = false;
		} else {
			lastSelectFlag = 1
			if(gpsChoice) {
				gpsChoice = false;
				selectedAddr = {
					ids: addrIdArr,
					names: addrNameArr
				}
			} else {
				selectedAddr = {
					ids: areaId.slice(1),
					names: area.slice(1)
				}
			}
			if(!opt.onlySaveCommon) {
				setAddrCookies(selectedAddr);
			}
		}
		if(isMQQBrowser) {
			window.setTimeout(function() {
				opt.onFinish && opt.onFinish(res);
			}, 300);
		} else {
			opt.onFinish && opt.onFinish(res);
		}
	}

	function setAddrCookies(opt) {
		opt = opt || {};
		var today = new Date();
		var tomorrow_4time = new Date(today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate() + " 00:00:00").getTime() + 28 * 60 * 60 * 1000;
		var cacheTime = parseInt((tomorrow_4time - today.getTime()) / 60000);
		var setCookieStorage = function(key, value, domain) {
				if(opt.isShortCache) {
					util.setCookie(key, value, cacheTime, "/", (domain || domainStr));
				} else {
					util.setCookie(key, value, 999999, "/", (domain || domainStr));
				}
				if(window.WQAPI) window.WQAPI.db.set(key, value);
			},
			ids = opt.ids,
			names = opt.names,
			id = opt.id,
			name = opt.name,
			longitude = opt.longitude,
			latitude = opt.latitude,
			flag = opt.flag;
		if(ids && ids.length > 1 && names && names.length > 1) {
			for(var i = 0; i < 4; i++) {
				ids[i] = ids[i] || '0';
				names[i] = names[i] || '';
			}
			ids = ids.slice(0, 4);
			names = names.slice(0, 4);
			var wq_addr = [];
			if(!flag || (id && name)) {
				wq_addr.push(id || '0');
				wq_addr.push(ids.join('_'));
				wq_addr.push(names.join('_'));
				wq_addr.push(name || '');
				wq_addr.push(longitude && latitude ? longitude + ',' + latitude : '');
			} else {
				wq_addr = (util.getCookie('wq_addr') || '').split('|');
				wq_addr[0] = wq_addr[0] || '0';
				wq_addr[1] = ids.join('_');
				wq_addr[2] = names.join('_');
				wq_addr = dealAddrDetail(wq_addr);
				wq_addr = wq_addr.slice(0, 5);
			}
			setCookieStorage('wq_addr', wq_addr.join('|'));
			setCookieStorage('jdAddrId', ids.join('_'));
			setCookieStorage('jdAddrName', names.join('_'));
			if(document.domain.indexOf('m.jd.com') > -1) {
				setCookieStorage('commonAddress', wq_addr[0], 'm.jd.com');
				setCookieStorage('regionAddress', (wq_addr[1] || '').replace(/_/g, ','), 'm.jd.com');
			}
			setCookieStorage('mitemAddrId', wq_addr[1]);
			setCookieStorage('mitemAddrName', wq_addr[3]);
		}
	}

	function fillAreas(areas, flag, areaid) {
		if(opt.onRender) {
			opt.onRender(areas, level);
		} else {
			var list = [];
			for(var i = 0, len = areas.length; i < len; ++i) {
				list.push({
					datamark: 'area',
					tid: areas[i].id,
					name: areas[i].name
				});
			}
			var html = template(list, areaid),
				$dom = $('#ulAddrList');
			$dom.html(html).show();
			if(flag) {
				var $curDom = $dom.find('[tid="' + areaId[level + 1] + '"]'),
					selectClass = (opt.isSearch ? 'selected' : 'on');
				if(opt.isSearch) $dom = $('.search_addrlayer_body_scroller_inner');
				$dom.scrollTop(0);
				if($curDom.length > 0) {
					$curDom.addClass(selectClass).siblings().removeClass(selectClass);
					$dom.scrollTop($curDom.offset().top - $dom.offset().top - 20);
				}
			}
		}
		opt.onAfterRender && opt.onAfterRender();
	}

	function template(it, areaid) {
		var out = [],
			searchStr = (opt.isSearch ? ' class="item"' : '');
		for(var i = 0, l = it.length; i < l; i++) {
			if((it[i].tid == 32 && opt.isShowTW) || (it[i].tid == 52993 && opt.isShowGA) || (it[i].tid != 32 && it[i].tid != 52993)) {
				out.push('<li' + searchStr + ' filter-type="' + (it[i].datamark) + '" tid="' + (it[i].tid) + '" tname="' + (it[i].name) + '">' + it[i].name + '</li>');
			}
		}
		if(areaid == 0 && opt.isShowHW) {
			out.push('<li' + searchStr + ' filter-type="area" tid="53283" tname="海外">海外</li>');
		}
		return out.join('');
	}

	function getCommonAddrV1() {
		if(opt.isNeedCommon) {
			if(opt.isSearch) {
				$('#searchFoot').show();
				$('#searchAddr').addClass('with_foot');
				$('#searchPrev').attr('tag', '1');
			} else {
				$('#popupAddrHead').html('选择地址<i class="close"></i>');
				$('#addrBtn').hide().parent().hide();
				$('#popupAddr div.mod_address_slide_main').removeClass('type_flex');
			}
		}
		var $dom = $('#addrBody'),
			selectClass = (opt.isSearch ? 'selected' : 'on'),
			scrollCur = function() {
				var $ul = $dom.find('ul'),
					$cur = $dom.find('li[addrid="' + curAddr.addrId + '"]');
				if(opt.isSearch) $ul = $('.search_addrlayer_body_scroller_inner');
				$ul.scrollTop(0);
				if($cur.length > 0 && !$cur.hasClass('disabled')) {
					$cur.addClass(selectClass).siblings().removeClass(selectClass);
					$ul.scrollTop($cur.offset().top - $ul.offset().top - 20);
				}
			};
		if(commonAddrHtml.length > 0) {
			$dom.html(commonAddrHtml.join(''));
			scrollCur();
			return;
		}
		var setCommonError = function() {
			if(opt.isNeedCommon) {
				opt.isNeedCommon = false;
				show();
			}
		};
		setTimeout(function() {
			if(!commonAddrHtml.length) {
				setCommonError();
			}
		}, 1500);
		window.commonAddrV1CB = function(json) {
			if(json.retCode === '0') {
				usualAddrList = json.list;
				addrToken = json.token ? json.token : '';
				var usualItem = {},
					addNewAddr = "";
				if(!usualAddrList.length) {
					setCommonError();
				}
				if(opt.isNeedCommon) {
					commonAddrHtml = [opt.isSearch ? '<div class="search_addrlayer_body_scroller"><div class="search_addrlayer_body_scroller_inner"><ul class="list_2">' : '<ul class="mod_address_slide_list_1" ptag="7387.1.1">'];
					var labName = '',
						labClass = '',
						labHtml = '';
					for(var i = 0, len = usualAddrList.length; i < len; i++) {
						usualItem = usualAddrList[i];
						labHtml = '';
						if(usualItem.default_address == '1') {
							isHasDefaultAddr = true;
							labHtml = '<span class="mod_address_slide_list_1_tag_default">默认</span>';
						}
						if(!opt.isSearch && usualItem.label && (usualItem.label != usualItem.name)) {
							labHtml += '<span class="mod_address_slide_list_1_tag">' + usualItem.label + '</span>';
						}
						if(usualItem && usualItem.addrfull && usualItem.cityId) {
							commonAddrHtml.push('<li filter-type="common"' + (opt.isSearch ? ' class="item"' : (usualItem.need_upgrade === '1' ? ' class="disabled"' : '')) + ' uname="' + encodeURIComponent(usualItem.name) + '" uphone="' + usualItem.mobile + '" longitude="' + usualItem.longitude + '" latitude="' + usualItem.latitude + '" isdefaultaddr="' + usualItem.default_address + '" addrid="' + (usualItem.adid || 0) + '" addrname="' + usualItem.addrfull + '" ids="' + [usualItem.provinceId || 0, usualItem.cityId || 0, usualItem.countyId || 0, usualItem.townId || 0].join('_') + '" names="' + [usualItem.provinceName || '', usualItem.cityName || '', usualItem.countyName || '', usualItem.townName || ''].join('_') + '">' + labHtml + usualItem.addrfull + (opt.isSearch ? '' : ((usualItem.need_upgrade === '1' ? '<p class="mod_address_slide_list_1_warn">行政区域地址已变更，请修改地址</p>' : '') + '<i class="mod_address_slide_list_1_edit" style="padding-left: 30px;"></i>')) + '</li>');
						}
					}
					if(commonAddrHtml.length > 1) {
						if(usualAddrList.length < 20) {
							addNewAddr = '<li filter-type="addaddr" class="mod_address_slide_list_1_more"><span class="mod_address_slide_list_1_moretext">新增收货地址<i class="type_add"></i></span></li>';
						}
						commonAddrHtml.push(opt.isSearch ? '</ul></div></div>' : addNewAddr + '<li class="mod_address_slide_list_1_more type_or"><span class="mod_address_slide_list_1_moretext">或者</span></li><li class="mod_address_slide_list_1_more" filter-type="areaaddr"><span class="mod_address_slide_list_1_moretext">选择区域地址<i class="type_choose"></i></span></li></ul>');
						$dom.html(commonAddrHtml.join(''));
						scrollCur();
					} else {
						commonAddrHtml = [];
						if(!opt.isSearch) {
							$('#addrBtn').html('<span class="arrow">新增详细地址</span>').attr('tag', '3').show().parent().show();
						}
						setCommonError();
					}
				}
			} else {
				setCommonError();
			}
		};
		ls.loadScript('//wq.jd.com/deal/recvaddr/getrecvaddrlistV3?adid=0&reg=1&callback=commonAddrV1CB&locationid=' + (curAddr.id || '') + '&t=' + Math.random() + (isMCart ? '&sceneval=2' : ''));
	}

	function checkUpgrade(opt) {
		if(opt.provinceid && opt.cityid && opt.countyid) {
			window.checkUpgradeCB = function(json) {
				if(json.errCode === '0') {
					opt.cb && opt.cb(json.need_upgrade === '1');
				}
			};
			ls.loadScript(['//wq.jd.com/deal/recvaddr/checkaddress?callback=checkUpgradeCB' + (isMCart ? '&sceneval=2' : ''), 'provinceid=' + opt.provinceid, 'cityid=' + opt.cityid, 'countyid=' + opt.countyid, 'townid=' + (opt.townid || '')].join('&'));
		}
	}

	function setBasicDom() {
		var out = '<div class="mod_address_slide" style="display:none;" id="popupAddr"><div class="mod_address_slide_main"><div class="mod_address_slide_head" id="popupAddrHead"></div><div class="mod_address_slide_body" id="addrBody"></div><div class="mod_address_slide_foot"><a id="addrBtn" style="display:none;" href="javascript:void(0);" tag="1"></a></div></div></div>';
		if(opt.isSearch) {
			out = '<div class="search_addrlayer with_foot fixed" id="searchAddr" style="display:none;"><div class="search_addrlayer_main"><div class="search_addrlayer_head ">' + opt.title + '<i class="icon_back" id="searchPrev" tag="1"></i></div><div class="search_addrlayer_body" id="addrBody"></div><div class="search_addrlayer_foot" id="searchFoot"><div class="btns"><a href="javascript:void(0);" class="btn bg_1">选择其它地址</a></div></div></div></div>';
		}
		if(opt.con) {
			$('#' + opt.con).html(out);
		} else {
			$('body').append(out);
		}
	}

	function loadCss() {
		if($('#addressCss').length || !opt.isNeedCss) {
			return;
		}
		var l = document.createElement('link');
		l.id = 'addressCss';
		l.setAttribute('type', 'text/css');
		l.setAttribute('rel', 'stylesheet');
		l.setAttribute('href', opt.isSearch ? JD.url.getStaticDisRec('//wq.360buyimg.com/fd/h5/wxsq_dev/search/css/search_addrlayer.min_ca7849cb.css') : JD.url.getStaticDisRec('//wq.360buyimg.com/fd/h5/wxsq_dev/gb/css/mod_address_slide.min_c74dbaf7.css'));
		document.getElementsByTagName('head')[0].appendChild(l);
	}

	function showHidePopup(flag) {
		var $dom = $(opt.isSearch ? '#searchAddr' : '#popupAddr'),
			$body = $(opt.isSearch ? 'html' : 'body');
		if(flag) {
			$dom.show();
			setTimeout(function() {
				$dom.addClass('show');
				if(opt.isNeedFixed) $body.addClass(opt.overClass);
			}, 50);
		} else {
			$body.removeClass(opt.overClass);
			$dom.removeClass('show');
			setTimeout(function() {
				$dom.hide();
			}, 50);
		}
	}

	function getAddrInfo(needUpgrade, cbFun) {
		var wq_addr = []
		if(lastSelectFlag === 1 && opt.onlySaveCommon) {
			wq_addr.push('0')
			wq_addr.push(selectedAddr.ids.join('_'))
			wq_addr.push(selectedAddr.names.join('_'))
		} else {
			wq_addr = (util.getCookie('wq_addr') || '').split('|'), wq_addr = dealAddrDetail(wq_addr);
			wq_addr = wq_addr.slice(0, 5);
		}
		if(needUpgrade) {
			var addrId = wq_addr[0];
			if(addrId * 1) {
				var addrItem = usualAddrList.filter(function(s) {
						return s && s.adid === addrId;
					})[0],
					upgradeCb = function(flag) {
						if(flag) {
							var addrName = (wq_addr[2] || '').split('_').join('');
							addUpgradeAlertDom(addrName, addrId);
						}
						cbFun && cbFun(flag);
					};
				if(addrItem) {
					upgradeCb(addrItem.need_upgrade === '1');
				} else {
					var addrIds = fourStr(wq_addr[1], '0').split('_');
					addrItem = {
						provinceId: addrIds[0],
						cityId: addrIds[1],
						countyId: addrIds[2],
						townId: addrIds[3]
					};
					checkUpgrade({
						provinceid: addrItem.provinceId,
						cityid: addrItem.cityId,
						countyid: addrItem.countyId,
						townid: addrItem.townId,
						cb: upgradeCb
					});
				}
			}
		}
		var xys = (wq_addr[4] || '').split(','),
			longitude = xys[0] || '',
			latitude = xys[1] || '';
		return {
			addrId: wq_addr[0] || '0',
			addrName: wq_addr[3] || '',
			longitude: longitude,
			latitude: latitude,
			id: fourStr(wq_addr[1] || util.getCookie('jdAddrId'), '0') || '1_72_2819_0',
			name: fourStr(wq_addr[2] || util.getCookie('jdAddrName'), '') || '北京_朝阳区_三环到四环之间_'
		};

		function fourStr(str, flag) {
			if(!str) return '';
			var arr = str.indexOf(',') != -1 ? str.split(',') : str.split('_');
			for(var i = 0; i < 4; i++) {
				arr[i] = arr[i] || flag;
			}
			arr = arr.slice(0, 4);
			return arr.join('_');
		}
	}

	function clearCookies() {
		var addr = getAddrInfo(),
			provinceName = (addr.name || '').split('_')[0];
		if(provinceName && provinceName.replace(/\s/g, '').length > 8) {
			var setCookieStorage = function(key, value) {
				util.setCookie(key, value, 30, "/", domainStr);
				if(window.WQAPI) WQAPI.db.set(key, value);
			};
			setCookieStorage('wq_addr', '0|1_72_2819_0|北京_朝阳区_三环到四环之间_||');
			setCookieStorage('jdAddrId', '1_72_2819_0');
			setCookieStorage('jdAddrName', '北京_朝阳区_三环到四环之间_');
		}
	}

	function addUpgradeAlertDom(addrName, addrId) {
		if(!addrName || !addrId) return;
		if(!$('#addrUpgradeAlert').length) {
			$('body').append('<div id="addrUpgradeAlert" class="mod_alert" style="display: none;"><span class="close"></span><i class="icon"></i><p class="addrtips"></p><p class="btns"><a href="javascript:;" class="btn btn_2" ptag="7387.3.2">使用其他地址</a><a href="javascript:;" class="btn btn_1">修改地址</a></p></div><div id="addrUpgradeAlertMask" class="mod_alert_mask" style="display: none;"></div>');
			$('#addrUpgradeAlert').off().on(opt.clickEvent, 'p.btns a.btn_2', function() {
				show();
				$('#addrUpgradeAlert,#addrUpgradeAlertMask').hide().removeClass('show fixed');
			}).on(opt.clickEvent, 'p.btns a.btn_1', function() {
				opt.beforeEdit && opt.beforeEdit();
				location.href = '//wqs.jd.com/my/my_address.shtml?ptag=7387.3.3' + (isMCart ? '&sceneval=2' : '') + '&backurl=' + encodeURIComponent(location.href) + '#type=edit&adid=' + addrId;
				showHidePopup();
				$('#addrUpgradeAlert,#addrUpgradeAlertMask').hide().removeClass('show fixed');
			});
			$('#addrUpgradeAlert span.close,#addrUpgradeAlertMask').off().on(opt.clickEvent, function() {
				$('#addrUpgradeAlert,#addrUpgradeAlertMask').hide().removeClass('show fixed');
			});
		}
		var $el = $('#addrUpgradeAlert'),
			$cover = $('#addrUpgradeAlertMask');
		$el.show().addClass('show fixed').find('p.addrtips').text('因京东地址库升级，您选择的地址【' + addrName + '】现已失效，会导致商品库存信息不准确或商品无法配送，请及时修改。');
		$cover.show().addClass('show fixed');
		window.wa && wa('jdClick', {
			ptag: '7387.3.1'
		});
	}

	function dealAddrDetail(wq_addr) {
		if(wq_addr.length > 5) {
			var xy = wq_addr[wq_addr.length - 1],
				wq_xy = '',
				wq_detail = wq_addr.slice(3);
			if(/\d+(?:\.\d+)?,\d+(?:\.\d+)?/.test(xy)) {
				wq_detail = wq_addr.slice(3, wq_addr.length - 1);
				wq_xy = xy;
			}
			wq_addr[3] = wq_detail.join('|');
			wq_addr[4] = wq_xy;
		}
		return wq_addr;
	}
});
define("tpl_jd.search.filter", function(require, exports, module) {
	var _cacheThisModule_, ins = {};
	exports.template = function(it) {
		return com(it);
	}

	function com(it) {
		var out = '';
		return out;
	}
	exports.child_filterTpl = function(it) {
		var out = ' <ul class="mod_list"> <li data-filter="area" rd="0-9-5" class="arrow_li J_ping" report-eventid="MFilter_Sendto"> <div class="list_inner li_line" rd="0-9-5"> <div class="big" rd="0-9-5">配送至</div> <div class="right color_red" rd="0-9-5">';
		if(it.areaName) {
			out += '' + (it.areaName) + '';
		} else {
			out += '' + (it.area2.join('-').replace(/\-+$/, '')) + '';
		}
		out += '</div> </div> </li> </ul> <ul class="tags_selection"> <li data-filter="dSide" rd="0-9-';
		if(it.dSideId == '1') {
			out += '7';
		} else {
			out += '6';
		}
		out += '" ord="0-9-6" crd="0-9-7" class="J_ping option ';
		if(it.dSideId == '1') {
			out += 'selected';
		}
		out += '" report-eventparam="京东物流_';
		if(it.dSideId == '1') {
			out += '0';
		} else {
			out += '1';
		}
		out += '" report-eventid="MSearch_FilterTab"> <a href="javascript:void(0)" rd="0-9-';
		if(it.dSideId == '1') {
			out += '7';
		} else {
			out += '6';
		}
		out += '">京东物流</a> </li> ';
		if(it.vipdisShow) {
			out += ' <li data-filter="vipdis" rd="0-9-';
			if(it.vipdis == '1') {
				out += '37';
			} else {
				out += '36';
			}
			out += '" ord="0-9-36" crd="0-9-37" class="J_ping option ';
			if(it.vipdis == '1') {
				out += 'selected';
			}
			out += '" report-eventparam="京尊达_';
			if(it.vipdis == '1') {
				out += '0';
			} else {
				out += '1';
			}
			out += '" report-eventid="MSearch_FilterTab"> <a href="javascript:void(0)" rd="0-9-';
			if(it.vipdis == '1') {
				out += '37';
			} else {
				out += '36';
			}
			out += '">京尊达</a> </li> ';
		}
		out += ' <li data-filter="rstore" rd="0-9-';
		if(it.redisstore == '1') {
			out += '11';
		} else {
			out += '10';
		}
		out += '" ord="0-9-10" crd="0-9-11" class="J_ping option ';
		if(it.redisstore == '1') {
			out += 'selected';
		}
		out += '" report-eventparam="有货优先_';
		if(it.redisstore == '1') {
			out += '0';
		} else {
			out += '1';
		}
		out += '" report-eventid="MSearch_FilterTab"> <a href="javascript:void(0)" rd="0-9-';
		if(it.redisstore == '1') {
			out += '11';
		} else {
			out += '10';
		}
		out += '">有货优先</a> </li> <li data-filter="cashond" rd="0-9-';
		if(it.cashond == '1') {
			out += '9';
		} else {
			out += '8';
		}
		out += '" ord="0-9-8" crd="0-9-9" class="J_ping option ';
		if(it.cashond == '1') {
			out += 'selected';
		}
		out += '" report-eventparam="货到付款_';
		if(it.cashond == '1') {
			out += '0';
		} else {
			out += '1';
		}
		out += '" report-eventid="MSearch_FilterTab"> <a href="javascript:void(0)" rd="0-9-';
		if(it.cashond == '1') {
			out += '9';
		} else {
			out += '8';
		}
		out += '">货到付款</a> </li> ';
		if(it.zy211Show) {
			out += ' <li data-filter="zy211" rd="0-9-';
			if(it.zy211 == '1') {
				out += '15';
			} else {
				out += '14';
			}
			out += '" ord="0-9-14" crd="0-9-15" class="J_ping option ';
			if(it.zy211 == '1') {
				out += 'selected';
			}
			out += '" report-eventparam="自营211_';
			if(it.zy211 == '1') {
				out += '0';
			} else {
				out += '1';
			}
			out += '" report-eventid="MSearch_FilterTab"> <a href="javascript:void(0)" rd="0-9-';
			if(it.zy211 == '1') {
				out += '15';
			} else {
				out += '14';
			}
			out += '">自营211</a> </li> ';
		}
		out += ' ';
		if(it.newItemShow) {
			out += ' <li data-filter="newitem" rd="0-9-';
			if(it.newItems == '1') {
				out += '19';
			} else {
				out += '18';
			}
			out += '" ord="0-9-18" crd="0-9-19" class="J_ping option ';
			if(it.newItems == '1') {
				out += 'selected';
			}
			out += '" report-eventparam="新品_';
			if(it.newItems == '1') {
				out += '0';
			} else {
				out += '1';
			}
			out += '" report-eventid="MSearch_FilterTab"> <a href="javascript:void(0)" rd="0-9-';
			if(it.newItems == '1') {
				out += '19';
			} else {
				out += '18';
			}
			out += '">新品</a> </li> ';
		}
		out += ' <li data-filter="gloabal" rd="0-9-';
		if(it.gloabal == '1') {
			out += '33';
		} else {
			out += '32';
		}
		out += '" ord="0-9-32" crd="0-9-33" class="J_ping option ';
		if(it.gloabal == '1') {
			out += 'selected';
		}
		out += '" report-eventparam="海囤全球_';
		if(it.gloabal == '1') {
			out += '0';
		} else {
			out += '1';
		}
		out += '" report-eventid="MSearch_FilterTab"> <a href="javascript:void(0)" rd="0-9-';
		if(it.gloabal == '1') {
			out += '33';
		} else {
			out += '32';
		}
		out += '">海囤全球</a> </li> ';
		if(it.plusShow) {
			out += ' <li data-filter="plus" rd="0-9-';
			if(it.plus == '1') {
				out += '56';
			} else {
				out += '55';
			}
			out += '" ord="0-9-55" crd="0-9-56" class="J_ping option ';
			if(it.plus == '1') {
				out += 'selected';
			}
			out += '" report-eventparam="PLUS专享价_';
			if(it.plus == '1') {
				out += '0';
			} else {
				out += '1';
			}
			out += '" report-eventid="MSearch_FilterTab"> <a href="javascript:void(0)" rd="0-9-';
			if(it.plus == '1') {
				out += '56';
			} else {
				out += '55';
			}
			out += '">PLUS专享价</a> </li> ';
		}
		out += ' <li data-filter="promo" rd="0-9-';
		if(it.promo == '1') {
			out += '13';
		} else {
			out += '12';
		}
		out += '" ord="0-9-12" crd="0-9-13" class="J_ping option ';
		if(it.promo == '1') {
			out += 'selected';
		}
		out += '" report-eventparam="促销商品_';
		if(it.promo == '1') {
			out += '0';
		} else {
			out += '1';
		}
		out += '" report-eventid="MSearch_FilterTab"> <a href="javascript:void(0)" rd="0-9-';
		if(it.promo == '1') {
			out += '13';
		} else {
			out += '12';
		}
		out += '">促销商品</a> </li> ';
		if(it.disgloabalShow) {
			out += ' <li data-filter="disgloabal" rd="0-9-';
			if(it.disgloabal == '1') {
				out += '35';
			} else {
				out += '34';
			}
			out += '" ord="0-9-34" crd="0-9-35" class="J_ping option ';
			if(it.disgloabal == '1') {
				out += 'selected';
			}
			out += '" report-eventparam="配送全球_';
			if(it.disgloabal == '1') {
				out += '0';
			} else {
				out += '1';
			}
			out += '" report-eventid="MSearch_FilterTab"> <a href="javascript:void(0)" rd="0-9-';
			if(it.disgloabal == '1') {
				out += '35';
			} else {
				out += '34';
			}
			out += '">配送全球</a> </li> ';
		}
		out += ' ';
		if(it.artworkShow) {
			out += ' <li data-filter="artwork" rd="0-9-';
			if(it.artwork == '1') {
				out += '37';
			} else {
				out += '36';
			}
			out += '" ord="0-9-36" crd="0-9-37" class="J_ping option ';
			if(it.artwork == '1') {
				out += 'selected';
			}
			out += '" report-eventparam="艺术品_';
			if(it.artwork == '1') {
				out += '0';
			} else {
				out += '1';
			}
			out += '" report-eventid="MSearch_FilterTab"> <a href="javascript:void(0)" rd="0-9-';
			if(it.artwork == '1') {
				out += '37';
			} else {
				out += '36';
			}
			out += '">艺术品</a> </li> ';
		}
		out += ' ';
		if(it.pgShow) {
			out += ' <li data-filter="pgitem" rd="0-9-';
			if(it.pgitem == '1') {
				out += '39';
			} else {
				out += '38';
			}
			out += '" ord="0-9-38" crd="0-9-39" class="J_ping option ';
			if(it.pgitem == '1') {
				out += 'selected';
			}
			out += '" report-eventparam="拼购商品_';
			if(it.pgitem == '1') {
				out += '0';
			} else {
				out += '1';
			}
			out += '" report-eventid="MSearch_FilterTab"> <a href="javascript:void(0)" rd="0-9-';
			if(it.pgitem == '1') {
				out += '39';
			} else {
				out += '38';
			}
			out += '">拼购商品</a> </li> ';
		}
		out += ' ';
		if(it.actInfo) {
			var it2 = it.actInfo;
			out += ' <li data-filter="actsel" ico="' + (it2.actMark) + '" rd="' + (it2.mrd) + '" ord="' + (it2.mrd) + '" crd="' + (it2.mcrd) + '" class="J_ping option ';
			if(it2.actCheck != '0') {
				out += 'selected';
			}
			out += '" report-eventparam="' + (it2.actname) + '_';
			if(it.actCheck != '0') {
				out += '0';
			} else {
				out += '1';
			}
			out += '" report-eventid="MSearch_FilterTab"> <a href="javascript:void(0)" rd="' + (it2.mrd) + '">' + (it2.actname) + '</a> </li> ';
		}
		out += ' </ul> ';
		if(it.hasCategory == '1') {
			out += ' <ul class="mod_list"> <li class="arrow_li J_ping" data-filter="category" rd="0-9-16" report-eventparam="" report-eventid="MFilter_AllCategories"> <div class="list_inner li_line" rd="0-9-16"> <div class="big" rd="0-9-16">分类</div> <div class="right" rd="0-9-16">' + (it.categorystr) + '</div> </div> </li> </ul> ';
		}
		out += ' ';
		if(it.priceShow) {
			out += ' <ul class="mod_list"> <li class="super_li no_arrow"> <div class="list_inner"> <div class="li_line"> <div class="big">价格</div> <div class="right"></div> </div> </div> </li> <li class="filterlayer_price"> <div class="filterlayer_price_area"> <input type="tel" class="filterlayer_price_area_input J_ping" report-eventparam="" report-eventid="MFilter_StartPrice" id="filterPriceMin" ';
			if(it.priceMin != -1) {
				out += 'value="' + (it.priceMin) + '" data-val="' + (it.priceMin) + '"';
			}
			out += ' placeholder="最低价"> <div class="filterlayer_price_area_hyphen"></div> <input type="tel" class="filterlayer_price_area_input J_ping" report-eventparam="" report-eventid="MFilter_EndPrice" id="filterPriceMax" ';
			if(it.priceMax != 100000000 && it.priceMax != -1) {
				out += 'value="' + (it.priceMax) + '" data-val="' + (it.priceMax) + '"';
			}
			out += ' placeholder="最高价"> </div> <div class="filterlayer_price_choices"> ';
			for(var i = 0; i < it.priceRanges.length; i++) {
				var range = it.priceRanges[i],
					checked = range.start == it.priceMin && range.end == it.priceMax,
					ord = 57 + i * 2,
					crd = 58 + i * 2;
				out += ' <div class="J_ping filterlayer_price_choice ';
				if(checked) {
					out += 'active';
				}
				out += '" data-filter="priceRange" start="' + (range.start) + '" end="' + (range.end) + '" text="&yen;' + (range.start) + '-&yen;' + (range.end) + '" rd="0-9-';
				if(checked) {
					out += '' + (crd) + '';
				} else {
					out += '' + (ord) + '';
				}
				out += '" ord="0-9-' + (ord) + '" crd="0-9-' + (crd) + '" report-eventparam="' + (i + 1) + '" report-eventid="MFilter_RecommendPrice"> <div class="filterlayer_price_choice_text">' + (range.start) + '-' + (range.end) + '</div> <div class="filterlayer_price_choice_tips">' + (range.percent) + '%选择</div> </div> ';
			}
			out += ' </div> </li> </ul> ';
		}
		out += ' <ul class="mod_list"> ';
		for(var i = 0, l = it.attrs.length; i < l; i++) {
			out += ' ';
			if(it.attrs[i].tid === 'brand') {
				out += ' <li class="arrow_li J_ping" data-filter="brand" rd="0-9-17" ord="0-9-17" crd="0-9-18" report-eventid="MFilter_AllIcon" report-eventparam=""> <div class="list_inner li_line" rd="0-9-17"> <div class="big" rd="0-9-17">品牌</div> <div class="right" rd="0-9-17"><span class="words_10" rd="0-9-17" r-mark="brand" slen="' + (it.brandLen) + '">' + (it.brandStr) + '</span></div> </div> </li> ';
			} else {
				out += ' <li class="arrow_li J_ping" data-filter="' + (it.attrs[i].tid) + '" rd="0-9-27" ord="0-9-27" crd="0-9-28" report-eventid="MFilter_AllIcon" report-eventparam=""> <div class="list_inner li_line" rd="0-9-27"> <div class="big" rd="0-9-27">' + (it.attrs[i].name) + '</div> <div class="right" rd="0-9-27"><span class="words_10" rd="0-9-27" r-mark="' + (it.attrs[i].tid) + '" slen="' + (it.attrs[i].valueLen) + '">' + (it.attrs[i].valueStr) + '</span></div> </div> </li> ';
			}
			out += ' ';
		}
		out += ' ';
		if(it.hasPublishers == '1') {
			out += ' <li class="arrow_li J_ping" data-filter="publishers" rd="0-9-27" report-eventid="MFilter_AllIcon" report-eventparam=""> <div class="list_inner li_line" rd="0-9-27"> <div class="big" rd="0-9-27">出版社</div> <div class="right" rd="0-9-27"><span class="words_10" rd="0-9-27" r-mark="publishers" slen="' + (it.publishersLen) + '">' + (it.publishersStr) + '</span></div> </div> </li> ';
		}
		out += ' ';
		if(it.hasPackage == '1') {
			out += ' <li class="arrow_li J_ping" data-filter="package" rd="0-9-27" report-eventid="MFilter_AllIcon" report-eventparam=""> <div class="list_inner li_line" rd="0-9-27"> <div class="big" rd="0-9-27">包装</div> <div class="right" rd="0-9-27"><span class="words_10" rd="0-9-27" r-mark="package" slen="' + (it.packageLen) + '">' + (it.packageStr) + '</span></div> </div> </li> ';
		}
		out += ' ';
		if(it.hasMedia == '1') {
			out += ' <li class="arrow_li J_ping" data-filter="media" rd="0-9-27" report-eventid="MFilter_AllIcon" report-eventparam=""> <div class="list_inner li_line" rd="0-9-27"> <div class="big" rd="0-9-27">介质</div> <div class="right" rd="0-9-27"><span class="words_10" rd="0-9-27" r-mark="media" slen="' + (it.mediaLen) + '">' + (it.mediaStr) + '</span></div> </div> </li> ';
		}
		out += ' ';
		if(it.hasDregion == '1') {
			out += ' <li class="arrow_li J_ping" data-filter="dregion" rd="0-9-27" report-eventid="MFilter_AllIcon" report-eventparam=""> <div class="list_inner li_line" rd="0-9-27"> <div class="big" rd="0-9-27">地区</div> <div class="right" rd="0-9-27"><span class="words_10" rd="0-9-27" r-mark="dregion" slen="' + (it.dregionLen) + '">' + (it.dregionStr) + '</span></div> </div> </li> ';
		}
		out += ' ';
		if(it.hasPackstate == '1') {
			out += ' <li class="arrow_li J_ping" data-filter="packstate" rd="0-9-27" report-eventid="MFilter_AllIcon" report-eventparam=""> <div class="list_inner li_line" rd="0-9-27"> <div class="big" rd="0-9-27">是否套装</div> <div class="right" rd="0-9-27"><span class="words_10" rd="0-9-27" r-mark="packstate">' + (it.packstateStr) + '</span></div> </div> </li> ';
		}
		out += ' </ul> <div id="filterClearBtn" class="J_ping s_btn ';
		if(it.selectCount <= 0) {
			out += 'disabled';
		}
		out += '" disb="' + (it.selectCount) + '" rd="0-9-4" report-eventparam="" report-eventid="MFilter_Reset">清除选项</div>';
		return out;;
	}
	exports.child_filterV2Tpl = function(it) {
		var out = ' <ul class="mod_list"> <li data-filter="area" rd="0-9-5" class="arrow_li J_ping" report-eventid="MFilter_Sendto"> <div class="list_inner li_line" rd="0-9-5"> <div class="big" rd="0-9-5">配送至</div> <div class="right color_red" rd="0-9-5">';
		if(it.areaName) {
			out += '' + (it.areaName) + '';
		} else {
			out += '' + (it.area2.join('-').replace(/\-+$/, '')) + '';
		}
		out += '</div> </div> </li> </ul> <ul class="tags_selection"> <li data-filter="dSide" rd="0-9-';
		if(it.dSideId == '1') {
			out += '7';
		} else {
			out += '6';
		}
		out += '" ord="0-9-6" crd="0-9-7" class="J_ping option ';
		if(it.dSideId == '1') {
			out += 'selected';
		}
		out += '" report-pageparam="" report-eventparam="京东物流" report-eventid="MSearch_FilterTab"> <a href="javascript:void(0)" rd="0-9-';
		if(it.dSideId == '1') {
			out += '7';
		} else {
			out += '6';
		}
		out += '">京东物流</a> </li> ';
		if(it.vipdisShow) {
			out += ' <li data-filter="vipdis" rd="0-9-';
			if(it.vipdis == '1') {
				out += '37';
			} else {
				out += '36';
			}
			out += '" ord="0-9-36" crd="0-9-37" class="J_ping option ';
			if(it.vipdis == '1') {
				out += 'selected';
			}
			out += '" report-pageparam="" report-eventparam="京尊达" report-eventid="MSearch_FilterTab"> <a href="javascript:void(0)" rd="0-9-';
			if(it.vipdis == '1') {
				out += '37';
			} else {
				out += '36';
			}
			out += '">京尊达</a> </li> ';
		}
		out += ' <li data-filter="rstore" rd="0-9-';
		if(it.redisstore == '1') {
			out += '11';
		} else {
			out += '10';
		}
		out += '" ord="0-9-10" crd="0-9-11" class="J_ping option ';
		if(it.redisstore == '1') {
			out += 'selected';
		}
		out += '" report-pageparam="" report-eventparam="有货优先" report-eventid="MSearch_FilterTab"> <a href="javascript:void(0)" rd="0-9-';
		if(it.redisstore == '1') {
			out += '11';
		} else {
			out += '10';
		}
		out += '">有货优先</a> </li> <li data-filter="cashond" rd="0-9-';
		if(it.cashond == '1') {
			out += '9';
		} else {
			out += '8';
		}
		out += '" ord="0-9-8" crd="0-9-9" class="J_ping option ';
		if(it.cashond == '1') {
			out += 'selected';
		}
		out += '" report-pageparam="" report-eventparam="货到付款" report-eventid="MSearch_FilterTab"> <a href="javascript:void(0)" rd="0-9-';
		if(it.cashond == '1') {
			out += '9';
		} else {
			out += '8';
		}
		out += '">货到付款</a> </li> ';
		if(it.zy211Show) {
			out += ' <li data-filter="zy211" rd="0-9-';
			if(it.zy211 == '1') {
				out += '15';
			} else {
				out += '14';
			}
			out += '" ord="0-9-14" crd="0-9-15" class="J_ping option ';
			if(it.zy211 == '1') {
				out += 'selected';
			}
			out += '" report-pageparam="" report-eventparam="自营211" report-eventid="MSearch_FilterTab"> <a href="javascript:void(0)" rd="0-9-';
			if(it.zy211 == '1') {
				out += '15';
			} else {
				out += '14';
			}
			out += '">自营211</a> </li> ';
		}
		out += ' ';
		if(it.newItemShow) {
			out += ' <li data-filter="newitem" rd="0-9-';
			if(it.newItems == '1') {
				out += '19';
			} else {
				out += '18';
			}
			out += '" ord="0-9-18" crd="0-9-19" class="J_ping option ';
			if(it.newItems == '1') {
				out += 'selected';
			}
			out += '" report-pageparam="" report-eventparam="新品" report-eventid="MSearch_FilterTab"> <a href="javascript:void(0)" rd="0-9-';
			if(it.newItems == '1') {
				out += '19';
			} else {
				out += '18';
			}
			out += '">新品</a> </li> ';
		}
		out += ' <li data-filter="gloabal" rd="0-9-';
		if(it.gloabal == '1') {
			out += '33';
		} else {
			out += '32';
		}
		out += '" ord="0-9-32" crd="0-9-33" class="J_ping option ';
		if(it.gloabal == '1') {
			out += 'selected';
		}
		out += '" report-pageparam="" report-eventparam="海囤全球" report-eventid="MSearch_FilterTab"> <a href="javascript:void(0)" rd="0-9-';
		if(it.gloabal == '1') {
			out += '33';
		} else {
			out += '32';
		}
		out += '">海囤全球</a> </li> ';
		if(it.plusShow) {
			out += ' <li data-filter="plus" rd="0-9-';
			if(it.plus == '1') {
				out += '56';
			} else {
				out += '55';
			}
			out += '" ord="0-9-55" crd="0-9-56" class="J_ping option ';
			if(it.plus == '1') {
				out += 'selected';
			}
			out += '" report-pageparam="" report-eventparam="PLUS专享价" report-eventid="MSearch_FilterTab"> <a href="javascript:void(0)" rd="0-9-';
			if(it.plus == '1') {
				out += '56';
			} else {
				out += '55';
			}
			out += '">PLUS专享价</a> </li> ';
		}
		out += ' <li data-filter="promo" rd="0-9-';
		if(it.promo == '1') {
			out += '13';
		} else {
			out += '12';
		}
		out += '" ord="0-9-12" crd="0-9-13" class="J_ping option ';
		if(it.promo == '1') {
			out += 'selected';
		}
		out += '" report-pageparam="" report-eventparam="促销商品" report-eventid="MSearch_FilterTab"> <a href="javascript:void(0)" rd="0-9-';
		if(it.promo == '1') {
			out += '13';
		} else {
			out += '12';
		}
		out += '">促销商品</a> </li> ';
		if(it.disgloabalShow) {
			out += ' <li data-filter="disgloabal" rd="0-9-';
			if(it.disgloabal == '1') {
				out += '35';
			} else {
				out += '34';
			}
			out += '" ord="0-9-34" crd="0-9-35" class="J_ping option ';
			if(it.disgloabal == '1') {
				out += 'selected';
			}
			out += '" report-pageparam="" report-eventparam="配送全球" report-eventid="MSearch_FilterTab"> <a href="javascript:void(0)" rd="0-9-';
			if(it.disgloabal == '1') {
				out += '35';
			} else {
				out += '34';
			}
			out += '">配送全球</a> </li> ';
		}
		out += ' ';
		if(it.artworkShow) {
			out += ' <li data-filter="artwork" rd="0-9-';
			if(it.artwork == '1') {
				out += '37';
			} else {
				out += '36';
			}
			out += '" ord="0-9-36" crd="0-9-37" class="J_ping option ';
			if(it.artwork == '1') {
				out += 'selected';
			}
			out += '" report-pageparam="" report-eventparam="艺术品" report-eventid="MSearch_FilterTab"> <a href="javascript:void(0)" rd="0-9-';
			if(it.artwork == '1') {
				out += '37';
			} else {
				out += '36';
			}
			out += '">艺术品</a> </li> ';
		}
		out += ' ';
		if(it.pgShow) {
			out += ' <li data-filter="pgitem" rd="0-9-';
			if(it.pgitem == '1') {
				out += '39';
			} else {
				out += '38';
			}
			out += '" ord="0-9-38" crd="0-9-39" class="J_ping option ';
			if(it.pgitem == '1') {
				out += 'selected';
			}
			out += '" report-pageparam="" report-eventparam="拼购商品" report-eventid="MSearch_FilterTab"> <a href="javascript:void(0)" rd="0-9-';
			if(it.pgitem == '1') {
				out += '39';
			} else {
				out += '38';
			}
			out += '">拼购商品</a> </li> ';
		}
		out += ' ';
		if(it.actInfo) {
			var it2 = it.actInfo;
			out += ' <li data-filter="actsel" ico="' + (it2.actMark) + '" rd="' + (it2.mrd) + '" ord="' + (it2.mrd) + '" crd="' + (it2.mcrd) + '" class="J_ping option ';
			if(it2.actCheck != '0') {
				out += 'selected';
			}
			out += '" report-pageparam="" report-eventparam="' + (it2.actname) + '" report-eventid="MSearch_FilterTab"> <a href="javascript:void(0)" rd="' + (it2.mrd) + '">' + (it2.actname) + '</a> </li> ';
		}
		out += ' </ul> ';
		if(it.hasCategory == '1') {
			out += ' <ul class="mod_list"> <li class="arrow_li J_ping" data-filter="category" rd="0-9-16" report-eventparam="" report-eventid="MFilter_AllCategories"> <div class="list_inner li_line" rd="0-9-16"> <div class="big" rd="0-9-16">分类</div> <div class="right" rd="0-9-16">' + (it.categorystr) + '</div> </div> </li> </ul> ';
		}
		out += ' ';
		if(it.priceShow) {
			out += ' <ul class="mod_list"> <li class="super_li no_arrow"> <div class="list_inner"> <div class="li_line"> <div class="big">价格</div> <div class="right"></div> </div> </div> </li> <li class="filterlayer_price"> <div class="filterlayer_price_area"> <input type="tel" class="filterlayer_price_area_input J_ping" report-eventparam="" report-eventid="MFilter_StartPrice" id="filterPriceMin" ';
			if(it.priceMin != -1) {
				out += 'value="' + (it.priceMin) + '" data-val="' + (it.priceMin) + '"';
			}
			out += ' placeholder="最低价"> <div class="filterlayer_price_area_hyphen"></div> <input type="tel" class="filterlayer_price_area_input J_ping" report-eventparam="" report-eventid="MFilter_EndPrice" id="filterPriceMax" ';
			if(it.priceMax != 100000000 && it.priceMax != -1) {
				out += 'value="' + (it.priceMax) + '" data-val="' + (it.priceMax) + '"';
			}
			out += ' placeholder="最高价"> </div> <div class="filterlayer_price_choices"> ';
			for(var i = 0; i < it.priceRanges.length; i++) {
				var range = it.priceRanges[i],
					checked = range.start == it.priceMin && range.end == it.priceMax,
					ord = 57 + i * 2,
					crd = 58 + i * 2;
				out += ' <div class="J_ping filterlayer_price_choice ';
				if(checked) {
					out += 'active';
				}
				out += '" data-filter="priceRange" start="' + (range.start) + '" end="' + (range.end) + '" text="&yen;' + (range.start) + '-&yen;' + (range.end) + '" rd="0-9-';
				if(checked) {
					out += '' + (crd) + '';
				} else {
					out += '' + (ord) + '';
				}
				out += '" ord="0-9-' + (ord) + '" crd="0-9-' + (crd) + '" report-eventparam="' + (i + 1) + '" report-eventid="MFilter_RecommendPrice"> <div class="filterlayer_price_choice_text">' + (range.start) + '-' + (range.end) + '</div> <div class="filterlayer_price_choice_tips">' + (range.percent) + '%选择</div> </div> ';
			}
			out += ' </div> </li> </ul> ';
		}
		out += ' ';
		for(var i = 0, l = it.attrs.length; i < l; i++) {
			var attr = it.attrs[i];
			out += ' <ul class="mod_list"> <li> <div class="list_inner li_line"> <div class="big">' + (attr.name) + '</div> ';
			if(['brand', 'publishers', 'package', 'media', 'dregion', 'packstate'].indexOf(attr.tid) > -1) {
				out += ' <div class="right"><span class="words_10" r-mark="' + (attr.tid) + '" slen="' + (it[attr.tid + 'Len']) + '">' + (it[attr.tid + 'Str']) + '</span></div> ';
			} else {
				out += ' <div class="right"><span class="words_10" r-mark="' + (attr.tid) + '" slen="' + (attr.valueLen) + '">' + (attr.valueStr) + '</span></div> ';
			}
			out += ' </div> </li> <div class="tags_selection"> ';
			for(var j = 0; j < it.outerAttrs[attr.tid].length; j++) {
				var tag = it.outerAttrs[attr.tid][j];
				out += ' ';
				if(tag.datamark != 'more') {
					out += ' <div class="J_ping option ';
					if(tag.check) {
						out += 'selected';
					}
					out += '" data-filtertype="' + (tag.datamark) + '" tid="' + (tag.tid) + '" cname="' + (tag.name) + '" extid="' + (tag.extid) + '" rd="0-9-65" ord="0-9-65" crd="0-9-66" report-pageparam="B" report-eventparam="' + (tag.name) + '" report-eventid="MFilter_Filters"><a href="javascript:void 0;">' + (tag.name) + '</a></div> ';
				} else {
					out += ' <div class="J_ping option arrow" data-filter="' + (attr.tid) + '" rd="0-9-67" report-eventid="MFilter_AllIcon" report-eventparam=""><a href="javascript:void 0;">' + (tag.name) + '</a><div class="big" style="display: none;">' + (attr.name) + '</div></div> ';
				}
				out += ' ';
			}
			out += ' </div> </ul> ';
		}
		out += ' <div id="filterClearBtn" class="J_ping s_btn ';
		if(it.selectCount <= 0) {
			out += 'disabled';
		}
		out += '" disb="' + (it.selectCount) + '" rd="0-9-4" report-eventparam="" report-eventid="MFilter_Reset">清除选项</div>';
		return out;;
	}
	exports.child_brandTpl = function(it) {
		var out = ' <ul class="mod_list padding_left" id="filAllBrand"> ';
		for(var i = 0, l = it.allBrandList.length; i < l; i++) {
			var it2 = it.allBrandList[i];
			out += ' ';
			if(it2.letter) {
				out += ' <li class="letter_li" letter="' + (it2.letter) + '">' + (it2.letter) + '</li> ';
			} else {
				out += ' <li class="J_ping check_li ';
				if(it2.check) {
					out += 'checked';
				}
				out += '" filter-type="' + (it2.datamark) + '" tid="' + (it2.tid) + '" tname="' + (it2.name) + '" extid="' + (it2.extid) + '" cname="' + (it2.name) + '" rd="0-12-2" ord="0-12-2" crd="0-12-3" report-pageparam="B" report-eventparam="' + (it2.name) + '" report-eventid="MFilter_Filters"> <div class="big" rd="0-12-2">' + (it2.name) + '</div> <div class="right" rd="0-12-2"></div> </li> ';
			}
			out += ' ';
		}
		out += ' </ul>';
		return out;;
	}
	exports.child_filterExtSinTpl = function(it) {
		var out = ' <ul class="mod_list padding_left"> ';
		for(var i = 0, l = it.list.length; i < l; i++) {
			var it2 = it.list[i];
			out += ' <li filter-type="' + (it2.datamark) + '" class="check_li';
			if(it2.check) {
				out += ' checked';
			}
			out += '" tid="' + (it2.tid) + '" cname="' + (it2.name) + '" rd="0-13-2" ord="0-13-2" crd=""> <div class="big" rd="0-13-2">' + (it2.name) + '</div> </li> ';
		}
		out += ' </ul>';
		return out;;
	}
	exports.child_filterExtTpl = function(it) {
		var out = ' <ul class="mod_list padding_left"> ';
		for(var i = 0, l = it.list.length; i < l; i++) {
			var it2 = it.list[i];
			out += ' ';
			if(it.mul) {
				out += ' <li class="J_ping check_li';
				if(it2.check) {
					out += ' checked';
				}
				out += '" filter-type="' + (it2.datamark) + '" tid="' + (it2.tid) + '" tname="' + (it2.name) + '" extid="' + (it2.extid) + '" cname="' + (it2.name) + '" rd="' + (it.rd) + '" ord="' + (it.rd) + '" crd="' + (it.crd) + '" report-pageparam="B" report-eventparam="' + (it2.name) + '" report-eventid="MFilter_Filters"> <div class="list_inner li_line" rd="' + (it.rd) + '"> <div class="big" rd="' + (it.rd) + '">' + (it2.name) + '</div> <div class="right" rd="' + (it.rd) + '">&nbsp;</div> </div> </li> ';
			} else {
				out += ' <li class="J_ping check_li';
				if(it2.check) {
					out += ' checked';
				}
				out += '" filter-type="' + (it2.datamark) + '" tid="' + (it2.tid) + '" tname="' + (it2.name) + '" extid="' + (it2.extid) + '" cname="' + (it2.name) + '" rd="' + (it.rd) + '" ord="' + (it.rd) + '" crd="' + (it.crd) + '" report-pageparam="B" report-eventparam="' + (it2.name) + '" report-eventid="MFilter_Filters"> <div class="big" rd="' + (it.rd) + '">' + (it2.name) + '</div> </li> ';
			}
			out += ' ';
		}
		out += ' </ul>';
		return out;;
	}
	exports.child_filterCategoryTpl = function(it) {
		var out = ' <ul class="mod_list padding_left"> ';
		if(it.hasAll) {
			out += ' <li class="check_li ';
			if(it.isAll) {
				out += 'checked';
			}
			out += '" filter-type="category" cid="0" cname="全部分类" fname="全部分类" rd="0-11-2"> <div class="list_inner li_line" rd="0-11-2"> <div class="big" rd="0-11-2">全部分类<span class="small"></span></div> </div> </li> ';
		}
		out += ' ';
		for(var k = 0, len = it.list.length; k < len; ++k) {
			var it2 = it.list[k];
			out += ' <li class="super_li ';
			if(it2.open) {
				out += 'opened';
			}
			out += '"> <div class="list_inner"> <div class="li_line"> <div class="big">' + (it2.Name) + '</div> <div class="right"></div> </div> <ul class="sub_list ';
			if(!it2.open) {
				out += 'hide';
			}
			out += '"> <li class="J_ping check_li ';
			if(it2.check) {
				out += 'checked';
			}
			out += '" filter-type="category" level="2" cid="' + (it2.Classification) + '" cname="' + (it2.Name) + '" fname="' + (it2.Name) + '" rd="0-11-5" report-pageparam="B" report-eventparam="' + (it2.Name + '-全部') + '" report-eventid="MFilter_Filters"> <div class="list_inner li_line" rd="0-11-5"> <div class="big" rd="0-11-5">全部<span class="small" rd="0-11-5">(' + (it2.Count) + ')</span></div> </div> </li> ';
			for(var i = 0, l = it2.childs.length; i < l; ++i) {
				var it3 = it2.childs[i];
				out += ' <li class="J_ping check_li ';
				if(it3.check) {
					out += 'checked';
				}
				out += '" level="3" filter-type="category" cid="' + (it3.Classification) + '" cname="' + (it3.Name) + '" fname="' + (it2.Name) + '/' + (it3.Name) + '" rd="0-11-5" report-pageparam="B" report-eventparam="' + (it3.Name) + '" report-eventid="MFilter_Filters"> <div class="list_inner li_line" rd="0-11-5"> <div class="big" rd="0-11-5">' + (it3.Name) + '<span class="small" rd="0-11-5">(' + (it3.Count) + ')</span></div> </div> </li> ';
			}
			out += ' </ul> </div> </li> ';
		}
		out += ' </ul>';
		return out;;
	}
	exports.child_barDsideTpl = function(it) {
		var out = ' ';
		var disarea = it.areaId && it.areaId.length > 0 && it.areaId[0] > 100;
		out += ' ';
		if(disarea && it.disgloabalShow) {
			out += '<li data-filter="disgloabal" rd="0-24-';
			if(it.disgloabal == '1') {
				out += '25';
			} else {
				out += '24';
			}
			out += '" ord="0-24-24" crd="0-24-25" class="';
			if(it.disgloabal == '1') {
				out += 'selected';
			}
			out += ' J_ping" report-eventparam="配送全球_';
			if(it.disgloabal == '1') {
				out += '0';
			} else {
				out += '1';
			}
			out += '" report-eventid="MList_ServiceItem">配送全球</li>';
		}
		out += ' <li data-filter="dSide" rd="0-24-';
		if(it.dSideId == '1') {
			out += '13';
		} else {
			out += '12';
		}
		out += '" ord="0-24-12" crd="0-24-13" class="';
		if(it.dSideId == '1') {
			out += 'selected';
		}
		out += ' J_ping" report-eventparam="京东物流_';
		if(it.dSideId == '1') {
			out += '0';
		} else {
			out += '1';
		}
		out += '" report-eventid="MList_ServiceItem">京东物流</li> ';
		if(it.vipdisShow) {
			out += '<li data-filter="vipdis" rd="0-24-';
			if(it.vipdis == '1') {
				out += '62';
			} else {
				out += '61';
			}
			out += '" ord="0-24-61" crd="0-24-62" class="';
			if(it.vipdis == '1') {
				out += 'selected';
			}
			out += ' J_ping" report-eventparam="京尊达_';
			if(it.vipdis == '1') {
				out += '0';
			} else {
				out += '1';
			}
			out += '" report-eventid="MList_ServiceItem">京尊达</li>';
		}
		out += ' ';
		if(it.zy211Show) {
			out += '<li data-filter="zy211" rd="0-24-';
			if(it.zy211 == '1') {
				out += '23';
			} else {
				out += '22';
			}
			out += '" ord="0-24-22" crd="0-24-23" class="';
			if(it.zy211 == '1') {
				out += 'selected';
			}
			out += ' J_ping" report-eventparam="自营211_';
			if(it.zy211 == '1') {
				out += '0';
			} else {
				out += '1';
			}
			out += '" report-eventid="MList_ServiceItem">自营211</li>';
		}
		out += ' <li data-filter="rstore" rd="0-24-';
		if(it.redisstore == '1') {
			out += '15';
		} else {
			out += '14';
		}
		out += '" ord="0-24-14" crd="0-24-15" class="';
		if(it.redisstore == '1') {
			out += 'selected';
		}
		out += ' J_ping" report-eventparam="有货优先_';
		if(it.redisstore == '1') {
			out += '0';
		} else {
			out += '1';
		}
		out += '" report-eventid="MList_ServiceItem">有货优先</li> <li data-filter="cashond" rd="0-24-';
		if(it.cashond == '1') {
			out += '17';
		} else {
			out += '16';
		}
		out += '" ord="0-24-16" crd="0-24-17" class="';
		if(it.cashond == '1') {
			out += 'selected';
		}
		out += ' J_ping" report-eventparam="货到付款_';
		if(it.cashond == '1') {
			out += '0';
		} else {
			out += '1';
		}
		out += '" report-eventid="MList_ServiceItem">货到付款</li> <li data-filter="gloabal" rd="0-24-';
		if(it.gloabal == '1') {
			out += '19';
		} else {
			out += '18';
		}
		out += '" ord="0-24-18" crd="0-24-19" class="';
		if(it.gloabal == '1') {
			out += 'selected';
		}
		out += ' J_ping" report-eventparam="海囤全球_';
		if(it.gloabal == '1') {
			out += '0';
		} else {
			out += '1';
		}
		out += '" report-eventid="MList_ServiceItem">海囤全球</li> ';
		if(it.plusShow) {
			out += '<li data-filter="plus" rd="0-24-';
			if(it.plus == '1') {
				out += '72';
			} else {
				out += '71';
			}
			out += '" ord="0-24-71" crd="0-24-72" class="';
			if(it.plus == '1') {
				out += 'selected';
			}
			out += ' J_ping" report-eventparam="PLUS专享价_';
			if(it.plus == '1') {
				out += '0';
			} else {
				out += '1';
			}
			out += '" report-eventid="MList_ServiceItem">PLUS专享价</li>';
		}
		out += ' <li data-filter="promo" rd="0-24-';
		if(it.promo == '1') {
			out += '21';
		} else {
			out += '20';
		}
		out += '" ord="0-24-20" crd="0-24-21" class="';
		if(it.promo == '1') {
			out += 'selected';
		}
		out += ' J_ping" report-eventparam="促销商品_';
		if(it.promo == '1') {
			out += '0';
		} else {
			out += '1';
		}
		out += '" report-eventid="MList_ServiceItem">促销商品</li> ';
		if(!disarea && it.disgloabalShow) {
			out += '<li data-filter="disgloabal" rd="0-24-';
			if(it.disgloabal == '1') {
				out += '25';
			} else {
				out += '24';
			}
			out += '" ord="0-24-24" crd="0-24-25" class="';
			if(it.disgloabal == '1') {
				out += 'selected';
			}
			out += ' J_ping" report-eventparam="配送全球_';
			if(it.disgloabal == '1') {
				out += '0';
			} else {
				out += '1';
			}
			out += '" report-eventid="MList_ServiceItem">配送全球</li>';
		}
		out += ' ';
		if(it.artworkShow) {
			out += '<li data-filter="artwork" rd="0-24-';
			if(it.artwork == '1') {
				out += '64';
			} else {
				out += '63';
			}
			out += '" ord="0-24-63" crd="0-24-64" class="';
			if(it.artwork == '1') {
				out += 'selected';
			}
			out += ' J_ping" report-eventparam="艺术品_';
			if(it.artwork == '1') {
				out += '0';
			} else {
				out += '1';
			}
			out += '" report-eventid="MList_ServiceItem">艺术品</li>';
		}
		out += ' ';
		if(it.pgShow) {
			out += '<li data-filter="pgitem" rd="0-24-';
			if(it.pgitem == '1') {
				out += '66';
			} else {
				out += '65';
			}
			out += '" ord="0-24-65" crd="0-24-66" class="';
			if(it.pgitem == '1') {
				out += 'selected';
			}
			out += ' J_ping" report-eventparam="拼购商品_';
			if(it.artwork == '1') {
				out += '0';
			} else {
				out += '1';
			}
			out += '" report-eventid="MList_ServiceItem">拼购商品</li>';
		}
		out += '';
		return out;;
	}
	exports.child_barPriceTpl = function(it) {
		var out = ' <ul class="selection radio line_cols_1 hide" fmark="' + (it.mark) + '"> ';
		for(var i = 0, l = it.list.length; i < l; i++) {
			var it2 = it.list[i];
			out += ' <li filter-type="price" class="';
			if(it2.check) {
				out += 'selected';
			}
			out += ' J_ping" min="' + (it2.start) + '" max="' + (it2.end) + '" cname="&yen;' + (it2.start) + ' - &yen;' + (it2.end) + '" rd="0-9-24" ord="0-9-24" crd="" report-eventparam="' + ((i + 1)) + '_&yen;' + (it2.start) + ' - &yen;' + (it2.end) + '" report-eventlevel="3" report-eventid="MList_SecondaryFilterFloat">&yen;' + (it2.start) + ' - &yen;' + (it2.end) + '</li> ';
		}
		out += ' </ul>';
		return out;;
	}
	exports.child_barPrice2Tpl = function(it) {
		var out = ' <div class="interval hide" fmark="' + (it.mark) + '"> <input type="tel" class="interval_input" interval="min" placeholder="最低价" ';
		if(it.def.start != -1) {
			out += 'value="' + (it.def.start) + '" data-val="' + (it.def.start) + '"';
		}
		out += '> <div class="interval_line"></div> <input type="tel" class="interval_input" interval="max" placeholder="最高价" ';
		if(it.def.end != -1 && it.def.end != 100000000) {
			out += 'value="' + (it.def.end) + '" data-val="' + (it.def.end) + '"';
		}
		out += '> </div>';
		return out;;
	}
	exports.child_barCategoryTpl = function(it) {
		var out = ' <ul class="selection radio line_cols_2 hide" fmark="' + (it.mark) + '"> ';
		if(it.hasAll) {
			out += '<li ';
			if(it.def) {
				out += 'class="selected"';
			}
			out += ' filter-type="category" cid="0" cname="全部分类" fname="全部分类" rd="' + (it.ord) + '">全部分类</li>';
		}
		out += ' ';
		for(var k = 0, cou = 0, len = it.list.length; k < len && cou < 50; ++k) {
			var it2 = it.list[k];
			out += ' ';
			for(var i = 0, l = it2.childs.length; i < l && cou < 50; ++i, ++cou) {
				var it3 = it2.childs[i];
				out += ' <li filter-type="category" class="';
				if(it3.check) {
					out += 'selected';
				}
				out += ' J_ping" cid="' + (it3.Classification) + '" cname="' + (it3.Name) + '" fname="' + (it2.Name) + '/' + (it3.Name) + '" rd="' + (it.ord) + '" report-eventparam="' + ((i + 1)) + '_' + (it3.Name) + '" report-eventlevel="3" report-eventid="MList_SecondaryFilterFloat">' + (it3.Name) + '</li> ';
			}
			out += ' ';
		}
		out += ' </ul>';
		return out;;
	}
	exports.child_barCategory2Tpl = function(it) {
		var out = ' <ul class="selection radio line_cols_2 hide" mark="' + (it.mark) + '"> ';
		if(it.hasAll) {
			out += '<li ';
			if(it.def) {
				out += 'class="selected"';
			}
			out += ' filter-type="category" cid="0" cname="全部分类" fname="全部分类" rd="' + (it.ord) + '">全部分类</li>';
		}
		out += ' ';
		for(var k = 0, cou = 0, len = it.list.length; k < len && cou < 50; ++k) {
			var it2 = it.list[k];
			out += ' <li filter-type="category" class="';
			if(it2.check) {
				out += 'selected';
			}
			out += ' J_ping" level="2" cid="' + (it2.Classification) + '" cname="' + (it2.Name) + '" fname="' + (it2.Name) + '" rd="' + (it.ord) + '" report-eventparam="0_' + (it2.Name) + '" report-eventlevel="3" report-eventid="MList_SecondaryFilterFloat">' + (it2.Name) + '</li> ';
			for(var i = 0, l = it2.childs.length; i < l && cou < 50; ++i, ++cou) {
				var it3 = it2.childs[i];
				out += ' <li filter-type="category" class="';
				if(it3.check) {
					out += 'selected';
				}
				out += ' J_ping" level="3" cid="' + (it3.Classification) + '" cname="' + (it3.Name) + '" fname="' + (it2.Name) + '/' + (it3.Name) + '" rd="' + (it.ord) + '" report-eventparam="' + ((i + 1)) + '_' + (it3.Name) + '" report-eventlevel="3" report-eventid="MList_SecondaryFilterFloat">' + (it3.Name) + '</li> ';
			}
			out += ' ';
		}
		out += ' </ul>';
		return out;;
	}
	exports.child_barCommSinTpl = function(it) {
		var out = ' <ul class="selection radio line_cols_1 hide" fmark="' + (it.mark) + '"> ';
		for(var i = 0, l = it.list.length; i < l; i++) {
			var it2 = it.list[i];
			out += ' <li filter-type="' + (it2.datamark) + '" class="';
			if(it2.check) {
				out += 'selected';
			}
			out += ' J_ping" tid="' + (it2.tid) + '" cname="' + (it2.name) + '" rd="0-24-30" ord="0-24-30" crd="" report-eventparam="' + ((i + 1)) + '_' + (it2.name) + '" report-eventlevel="3" report-eventid="MList_SecondaryFilterFloat">' + (it2.name) + '</li> ';
		}
		out += ' </ul>';
		return out;;
	}
	exports.child_barCommGridTpl = function(it) {
		var out = ' <ul class="selection checkbox line_cols_2 hide" fmark="' + (it.mark) + '"> ';
		for(var i = 0, l = it.list.length; i < l; i++) {
			var it2 = it.list[i];
			out += ' <li class="';
			if(it2.check) {
				out += 'selected';
			}
			out += ' J_ping" filter-type="' + (it2.datamark) + '" tid="' + (it2.tid) + '" tname="' + (it2.name) + '" extid="' + (it2.extid) + '" cname="' + (it2.name) + '" rd="' + (it.ord) + '" ord="' + (it.ord) + '" crd="' + (it.crd) + '" report-eventparam="' + ((i + 1)) + '_' + (it2.name) + '" report-eventlevel="3" report-eventid="MList_SecondaryFilterFloat">' + (it2.name) + '</li> ';
		}
		out += ' </ul>';
		return out;;
	}
	exports.child_carinfoTpl = function(it) {
		var out = ' <div class="';
		if(!it.show) {
			out += 'hide';
		}
		out += '" fmark="' + (it.mark) + '"> ';
		if(it.code == 0) {
			out += ' <div class="item_options_tip item_options_tip_center"> <i></i>正在为您加载爱车信息... </div> <div class="wx_loading2"> <i class="wx_loading_icon"></i> </div> ';
		} else if(it.code == -1) {
			out += ' <div class="item_options_tip item_options_tip_center"> <i></i>爱车信息加载失败，请查看您的网络 </div> <div class="item_options_reload">重新加载</div> ';
		} else {
			out += ' ';
			if(it.list.length > 0) {
				out += ' ';
				if(it.list.length == 1) {
					out += ' <div class="item_options_tip item_options_tip_center"> <i></i>您还可以添加' + (4 - it.list.length) + '辆爱车哦～ </div> ';
				}
				out += ' <ul class="datalist"> ';
				for(var i = 0, l = it.list.length; i < l; i++) {
					var it1 = it.list[i];
					out += ' <li ';
					if(it1.selected) {
						out += 'class="selected" rd="' + (it.crd) + '"';
					} else {
						out += 'rd="' + (it.ord) + '"';
					}
					out += ' modelid="' + (it1.model.modelId) + '" cmodelid="' + (it1.ext.accyModelId) + '"> <p class="datalist_name" ';
					if(it1.selected) {
						out += 'rd="' + (it.crd) + '"';
					} else {
						out += 'rd="' + (it.ord) + '"';
					}
					out += '>' + (it1.model.brandName) + '&nbsp;' + (it1.model.seriesName) + '&nbsp;' + (it1.model.seriesYear) + '款</p> <p class="datalist_desc" ';
					if(it1.selected) {
						out += 'rd="' + (it.crd) + '"';
					} else {
						out += 'rd="' + (it.ord) + '"';
					}
					out += '>' + (it1.model.modelName) + '</p> </li> ';
				}
				out += ' ';
				if(it.list.length < 4) {
					out += ' <li class="datalist_add" rd="0-24-59"></li> ';
				}
				out += ' </ul> <a href="javascript:" class="item_options_lnk" rd="0-24-60">管理爱车</a> ';
			} else {
				out += ' <div class="item_options_tip"> <i></i>添加您的爱车信息，我们会为您筛选合适的商品哦～ </div> <ul class="datalist"> <li class="datalist_add"></li> </ul> ';
			}
			out += ' ';
		}
		out += ' </div>';
		return out;;
	}
	exports.child_babyinfoTpl = function(it) {
		var out = ' <div class="';
		if(!it.show) {
			out += 'hide';
		}
		out += '" fmark="' + (it.mark) + '"> ';
		if(it.code == 0) {
			out += ' <div class="item_options_tip item_options_tip_center"> <i></i>正在为您加载宝宝信息... </div> <div class="wx_loading2"> <i class="wx_loading_icon"></i> </div> ';
		} else if(it.code == -1) {
			out += ' <div class="item_options_tip item_options_tip_center"> <i></i>宝宝信息加载失败，请查看您的网络 </div> <div class="item_options_reload">重新加载</div> ';
		} else {
			out += ' ';
			if(it.list.length > 0) {
				out += ' ';
				if(it.list.length == 1) {
					out += ' <div class="item_options_tip item_options_tip_center"> <i></i>您还可以添加' + (2 - it.list.length) + '宝宝哦～ </div> ';
				}
				out += ' <ul class="datalist"> ';
				for(var i = 0, l = it.list.length; i < l; i++) {
					var it1 = it.list[i];
					out += ' <li ';
					if(it1.selected) {
						out += 'class="selected" rd="' + (it.crd) + '"';
					} else {
						out += 'rd="' + (it.ord) + '"';
					}
					out += ' sex="' + (it1.sex) + '" birf="' + (it1.birthday) + '" cname="' + (it1.nickname) + '"> <p class="datalist_name" ';
					if(it1.selected) {
						out += 'rd="' + (it.crd) + '"';
					} else {
						out += 'rd="' + (it.ord) + '"';
					}
					out += '>' + (it1.nickname) + '</p> </li> ';
				}
				out += ' ';
				if(it.list.length < 2) {
					out += ' <li class="datalist_add" rd="0-24-69" bcou="' + (it.list.length) + '"></li> ';
				}
				out += ' </ul> <a href="javascript:" class="item_options_lnk" rd="0-24-70">管理宝宝</a> ';
			} else {
				out += ' <div class="item_options_tip"> <i></i>添加您的宝宝信息，我们会帮您筛选合适的商品哦~ </div> <ul class="datalist"> <li class="datalist_add" rd="0-24-69" bcou="' + (it.list.length) + '"></li> </ul> ';
			}
			out += ' ';
		}
		out += ' </div>';
		return out;;
	}
});
define('jd.search.filter', function(require, exports, module) {
	var _cacheThisModule_;
	var $ = require('zepto'),
		ls = require('loadJs'),
		util = require('util'),
		ui = require('ui'),
		login = require('login'),
		address = require('wq.address'),
		cachev1 = require('cachev1'),
		searchCom = require('jd.search.common'),
		tpl = require('tpl_jd.search.filter'),
		isLogin = login.isLogin(),
		isM = JD.device.scene === 'jdm',
		isWX = JD.device.scene === 'weixin',
		filterCgiurl = '//wqsou.jd.com/search/searchattr?key={#key#}&callback={#callback#}&source={#source#}',
		keywordCanEmpty = false,
		keyword = '',
		classid = '',
		classLevel = '',
		classType = 0,
		sortType = '',
		selectMode = false,
		inFilterShow = true,
		selectNoResult = 0,
		wsizeInfo = {
			width: $(window).width(),
			height: $(window).height()
		},
		initFilterObj = {
			isWX: isWX,
			category: '全部分类',
			categorystr: '全部分类',
			categoryId: searchCom.FILTER_DEFVAL.mulId,
			categoryLevel: '1',
			hasBrand: '1',
			brand: searchCom.FILTER_DEFVAL.mulName,
			price: '全部价格',
			priceMin: '-1',
			priceMax: '-1',
			priceShow: true,
			dSide: '全部',
			dSideId: searchCom.FILTER_DEFVAL.id,
			zy211Show: false,
			zy211: searchCom.FILTER_DEFVAL.id,
			vipdisShow: false,
			vipdis: searchCom.FILTER_DEFVAL.id,
			plusShow: false,
			plus: searchCom.FILTER_DEFVAL.id,
			newItemShow: false,
			newItems: searchCom.FILTER_DEFVAL.id,
			redisstore: searchCom.FILTER_DEFVAL.id,
			cashond: searchCom.FILTER_DEFVAL.id,
			gloabal: searchCom.FILTER_DEFVAL.id,
			promo: searchCom.FILTER_DEFVAL.id,
			artwork: searchCom.FILTER_DEFVAL.id,
			artworkShow: false,
			pgitem: searchCom.FILTER_DEFVAL.id,
			pgShow: false,
			disgloabal: searchCom.FILTER_DEFVAL.id,
			disgloabalShow: true,
			area: ['北京', '朝阳区', '管庄'],
			area2: ['北京', '朝阳区', '管庄', ''],
			areaId: ['1', '72', '4137'],
			areaId2: ['1', '72', '4137', '0'],
			areaName: '',
			areaLevel: 0,
			multiSelect: false,
			selectCount: 0,
			package: searchCom.FILTER_DEFVAL.mulName,
			publishers: searchCom.FILTER_DEFVAL.mulName,
			dregion: searchCom.FILTER_DEFVAL.mulName,
			media: searchCom.FILTER_DEFVAL.mulName,
			packstate: '-1',
			packstateStr: '全部',
			carModelId: searchCom.FILTER_DEFVAL.mulId,
			babySexAge: searchCom.FILTER_DEFVAL.mulId,
			extAttr: [],
			attrs: []
		},
		filter = $.extend(true, {}, initFilterObj),
		reqExtParams = [],
		mulSelKeys = ['brand', 'package', 'publishers', 'dregion', 'media'],
		hasMulSelVals = {
			selAttrs: []
		},
		exExcludeAttr = ['品牌', '价格', '颜色', '价位', '颜色分类'],
		result = {
			attrs: {},
			category: {}
		},
		brandObj = {
			allBrandList: [],
			alphabet: [],
			alphabetizeList: [],
			maxSize: 200
		},
		dataSizes = {
			extAttrs: 10,
			selFiltCou: 6,
			barExts: 4
		},
		cgiMonitor = {
			filterTimer: null,
			timeout: 5000
		},
		umpData = {
			bizid: '',
			api: '',
			timeout: ''
		},
		activeInfo = [],
		activeInfoMap = {},
		actInfoMap = {},
		carInfo = {
			first: true,
			modelid: '',
			cname: '',
			pmodelid: '',
			pcname: '',
			keepShow: false,
			seKey: 'search_carmodelid',
			show: false,
			curdel: false,
			cache: null
		},
		babyInfo = {
			first: true,
			sexAge: '',
			cname: '',
			psexAge: '',
			pcname: '',
			keepShow: false,
			seKey: 'search_babyinfo',
			show: false,
			curdel: false,
			cache: null
		};
	window.backSteep = [];
	var features = [],
		FEATURES = {
			BRAND_SELECTION: 1,
			FILTER_OUTER_ATTRS: 2,
			PINGOU_SELECTION: 3,
			PINGOU_HIDE_ATTRS: 4,
			PREFER_PRICE_IN_QUICK_BAR: 5,
			PREFER_CATEGORY_IN_FIXED_BAR: 6,
			NEED_INIT_SORT: 7
		};
	var deps = {
		searchByFilter: $.noop,
		setBodyOverflow: $.noop,
		resetSearchHeadwh: $.noop,
		setStopLoad: $.noop,
		reporJdMul: $.noop,
		switchTab: $.noop,
		search: {},
		reportInfo: {}
	};

	function initFilterFormQuery() {
		for(var i = 0, len = mulSelKeys.length; i < len; ++i) {
			var key = mulSelKeys[i];
			var tempKeys = getExpressionKey(key);
			if(tempKeys.length > 0) {
				for(var j = 0, jlen = tempKeys.length; j < jlen; ++j) {
					if(addMulSelect(key, tempKeys[j], searchCom.FILTER_DEFVAL.mulName)) {
						filter.selectCount++;
					}
				}
				addendaMulSelVal(key, tempKeys);
			}
		}
		var ecolor = getExpressionKey('exp_color'),
			esize = getExpressionKey('exp_size');
		for(var i = 0, len = filter.extAttr.length; i < len; ++i) {
			if('exp_color' == filter.extAttr[i].tid && ecolor.length > 0) {
				for(var j = 0, jlen = ecolor.length; j < jlen; ++j) {
					addMulSelect('id', 'exp_color', searchCom.FILTER_DEFVAL.mulId, i);
					if(addMulSelect('value', ecolor[j], searchCom.FILTER_DEFVAL.mulName, i)) {
						filter.selectCount++;
					}
				}
				addendaMulSelVal('exp_color', ecolor);
			}
			if('exp_size' == filter.extAttr[i].tid && esize.length > 0) {
				for(var j = 0, jlen = esize.length; j < jlen; ++j) {
					addMulSelect('id', 'exp_size', searchCom.FILTER_DEFVAL.mulId, i);
					if(addMulSelect('value', esize[j], searchCom.FILTER_DEFVAL.mulName, i)) {
						filter.selectCount++;
					}
				}
				addendaMulSelVal('exp_size', esize);
			}
		}
		var redisstore = getFiltType('redisstore');
		var queryProcessor = window._searchData.searchm.Head.Query.QueryProcessor;
		if(redisstore || (queryProcessor && queryProcessor.IsSpecialStock == '1')) {
			markFilterSelCou('1', filter.redisstore, searchCom.FILTER_DEFVAL.id);
			filter.redisstore = '1';
			deps.reportInfo.isStock = queryProcessor && queryProcessor.IsSpecialStock == '1';
		}
		var dredisprice = getFiltType('dredisprice');
		if(dredisprice.length > 0) {
			var min = parseInt(dredisprice[1], 10),
				max = parseInt(dredisprice[0], 10);
			var str = '';
			if(min > 0 && max == 100000000) {
				str = '>&yen;' + min;
			} else {
				str = '&yen;' + min + ' - &yen;' + max
			}
			filter.price = str;
			filter.priceMin = min;
			filter.priceMax = max;
			filter.selectCount++;
		}
		var colType = getFiltType('col_type');
		if(colType.length > 0 && colType[0] == '0') {
			markFilterSelCou('1', filter.dSideId, searchCom.FILTER_DEFVAL.id);
			filter.dSideId = '1';
		}
		var delivertime = getFiltType('delivertime');
		if(filter.zy211Show && delivertime.length > 0 && delivertime[0] == '1') {
			markFilterSelCou('1', filter.zy211, searchCom.FILTER_DEFVAL.id);
			filter.zy211 = '1';
		}
		var cashond = getFiltType('cod');
		if(cashond.length > 0 && cashond[0] == '1') {
			markFilterSelCou('1', filter.cashond, searchCom.FILTER_DEFVAL.id);
			filter.cashond = '1';
		}
		var productExt = getFiltType('product_ext');
		if(productExt.length > 0) {
			for(var j = 0, jlen = productExt.length; j < jlen; ++j) {
				var pext = productExt[j],
					pext0 = pext[0];
				if(pext0 == '11') {
					markFilterSelCou('1', filter.gloabal, searchCom.FILTER_DEFVAL.id);
					filter.gloabal = '1';
				} else if(pext0 == '26') {
					markFilterSelCou('1', filter.newItems, searchCom.FILTER_DEFVAL.id);
					filter.newItems = '1';
				} else if(~'|21|22|30|'.indexOf('|' + pext0 + '|')) {
					markFilterSelCou('1', filter.disgloabal, searchCom.FILTER_DEFVAL.id);
					filter.disgloabal = '1';
				} else if(pext0 == '3') {
					markFilterSelCou('1', filter.vipdis, searchCom.FILTER_DEFVAL.id);
					filter.vipdis = '1';
				}
			}
		}
		var productext2 = getFiltType('productext2');
		if(productext2.length > 0) {
			for(var j = 0, jlen = productext2.length; j < jlen; ++j) {
				var pext = productext2[j],
					pext0 = pext[0],
					pext1 = pext[1];
				if(pext0 == '5' && pext1 == '1') {
					markFilterSelCou('1', filter.artwork, searchCom.FILTER_DEFVAL.id);
					filter.artwork = '1';
					filter.artworkShow = true;
				} else if(pext0 == '12' && pext1 == '1') {
					markFilterSelCou('1', filter.pgitem, searchCom.FILTER_DEFVAL.id);
					filter.pgitem = '1';
					filter.pgShow = !!~features.indexOf(FEATURES.PINGOU_SELECTION);
					filter.priceShow = !~features.indexOf(FEATURES.PINGOU_HIDE_ATTRS)
					if(!filter.priceShow) {
						$('#sortSelList li[sort-type="sale"]').hide();
						$('#sortSelList li[sort-type^="price"]').hide();
					}
				}
			}
		}
		var plus = getFiltType('promotion_type');
		if(plus == 'b4v1') {
			markFilterSelCou('1', filter.plus, searchCom.FILTER_DEFVAL.id);
			filter.plus = 1;
		}
		var promo = getFiltType('promotion_address');
		if(promo == 'b2v1||b7v1') {
			markFilterSelCou('1', filter.promo, searchCom.FILTER_DEFVAL.id);
			filter.promo = '1';
		}
		var ico = getFiltType('ico');
		if(ico.length > 0) {
			for(var j = 0, jlen = ico.length; j < jlen; ++j) {
				var ic = ico[j],
					icoval = ic[0],
					actobj = actInfoMap[icoval];
				if(actobj) {
					markFilterSelCou(icoval, actobj.actCheck, searchCom.FILTER_DEFVAL.id);
					actobj.actCheck = icoval;
				}
			}
		}
		if(classLevel && classid) {
			markFilterSelCou(classid, filter.categoryId, searchCom.FILTER_DEFVAL.id);
			filter.categoryId = classid;
			filter.categoryLevel = classLevel == 'cid1' ? '1' : classLevel == 'cid2' ? '2' : '3';
			var cnames = getCategoryName(classLevel, classid);
			filter.category = cnames[0] ? cnames[0] : '';
			filter.categorystr = cnames[1] ? cnames[1] : filter.category;
		}
		var pkstate = getFiltType('packnum');
		if(pkstate.length > 0) {
			if(pkstate[0] == '1') {
				filter.packstate = '1';
				filter.packstateStr = '是';
			} else {
				filter.packstate = '0';
				filter.packstateStr = '否';
			}
			filter.hasPackstate = '1';
			filter.selectCount++;
		}
		var carModelId = getFiltType('car_model_id');
		var carobj = cachev1.session.getItem(carInfo.seKey);
		if(carobj) {
			carInfo.keepShow = !!carobj.keepShow;
		}
		if(carModelId && carModelId != searchCom.FILTER_DEFVAL.mulId) {
			markFilterSelCou(carModelId, filter.carModelId, searchCom.FILTER_DEFVAL.mulId);
			filter.carModelId = carModelId;
			if(carobj) {
				if(selectNoResult == 1) {
					carInfo.modelid = carobj.pmodelid || '';
					carInfo.cname = carobj.pcname || '';
				} else {
					carInfo.modelid = carobj.modelid || '';
					carInfo.cname = carobj.cname || '';
				}
			}
		} else {
			cachev1.session.removeItem(carInfo.seKey);
		}
		var babySex = util.getQuery('baby_sex'),
			babyAge = util.getQuery('baby_age');
		var babyobj = cachev1.session.getItem(babyInfo.seKey);
		if(babyobj) {
			babyobj.keepShow = !!babyobj.keepShow;
		}
		if(babySex && babyAge) {
			var babySexAge = babySex + '-' + babyAge;
			markFilterSelCou(babySexAge, filter.babySexAge, searchCom.FILTER_DEFVAL.mulId);
			filter.babySexAge = babySexAge;
			if(babyobj) {
				if(selectNoResult == 1) {
					babyInfo.sexAge = babyobj.psexAge || '';
					babyInfo.cname = babyobj.pcname || '';
				} else {
					babyInfo.sexAge = babyobj.sexAge || '';
					babyInfo.cname = babyobj.cname || '';
				}
			}
		} else {
			cachev1.session.removeItem(babyInfo.seKey);
		}
		var expandName = getFiltType('expand_name');
		if(result.attrs.common) {
			var tempCommon = result.attrs.common.filter(function(a) {
				return !~$.inArray(a.expandsortname, exExcludeAttr);
			});
			var len = tempCommon.length;
			for(var key in expandName) {
				var list = expandName[key];
				for(var i = 0; i < len; ++i) {
					var exta = tempCommon[i];
					if(key == exta.expandsortid) {
						for(var j = 0, jlen = list.length; j < jlen; ++j) {
							var ind = exta.valueid.indexOf(list[j]);
							if(ind > -1) {
								addMulSelect('id', list[j], searchCom.FILTER_DEFVAL.mulId, i + filter.extAttr.extLen);
								if(addMulSelect('value', exta.valuename[ind], searchCom.FILTER_DEFVAL.mulName, i + filter.extAttr.extLen)) {
									filter.selectCount++;
								}
							}
						}
						break;
					}
				}
			}
		}
		resetFilterClearBtn();
	}

	function changeSelectMode(mark, hideFb) {
		if(mark == 2) {
			$('#filterBlock,#sfLayerBg').removeClass('show');
			selectMode = false;
			$('.wx_footer').removeClass('hide');
			$('.search_aside,.mod_aside_v2').removeClass('hide');
			$('#cancelBtn').text('取消').addClass('hide');
			deps.setBodyOverflow(false);
		} else {
			if(!hideFb) {
				$('#filterBlock,#sfLayerBg').addClass('show');
			}
			selectMode = true;
			$('.wx_footer').addClass('hide');
			$('.search_aside,.mod_aside_v2').addClass('hide');
			deps.setBodyOverflow(true);
		}
	}

	function showSelectBlock(hideFb) {
		$('#loadingLogo').addClass('hide');
		$('#sPage').attr('preSta', $('#sPage').hasClass('hide') ? '0' : '1').addClass('hide');
		$('#noMoreTips').attr('preSta', $('#noMoreTips').hasClass('hide') ? '0' : '1').addClass('hide');
		changeSelectMode(1, hideFb);
		fillFilter();
	}

	function reaStateClass() {
		if($('#sPage').attr('preSta') == '1') {
			$('#sPage').removeClass('hide').attr('preSta', '0');
		}
		if($('#noMoreTips').attr('preSta') == '1') {
			$('#noMoreTips').removeClass('hide').attr('preSta', '0');
		}
	}

	function wkx5BackHandle() {
		var carobj = cachev1.session.getItem(carInfo.seKey),
			babyobj = cachev1.session.getItem(babyInfo.seKey),
			snrback = cachev1.local.getItem('search_noresult_back');
		if(carobj) {
			carInfo.keepShow = !!carobj.keepShow;
			if(carInfo.keepShow || snrback == '1') {
				if(snrback == '1') {
					$('#sNull02').removeClass('hide');
					cachev1.local.removeItem('search_noresult_back');
					selectNoResult = 1;
					var cbr = $('#barTabs2>li[dtype="carinfo"]');
					if(cbr.hasClass('cur')) {
						cbr.trigger('click');
					}
				}
				fillBarFilterCarinfo(true);
			}
		}
		if(babyobj) {
			babyInfo.keepShow = !!babyobj.keepShow;
			if(babyInfo.keepShow || snrback == '1') {
				if(snrback == '1') {
					$('#sNull02').removeClass('hide');
					cachev1.local.removeItem('search_noresult_back');
					selectNoResult = 1;
					var cbr = $('#barTabs2>li[dtype="babyinfo"]');
					if(cbr.hasClass('cur')) {
						cbr.trigger('click');
					}
				}
				fillBarFilterBabyinfo(true);
			}
		}
	}

	function bindBarFilterEvent() {
		var lasttab = [],
			newFilter = null,
			sortBlock = $('#sortBlock'),
			sortSubBlock = $('#sortSubBlock'),
			sortSubBlock2 = $('#sortSubBlock2'),
			sortSelList = $('#sortSelList'),
			barTabMore = $('#barTabMore'),
			barSureBtnBlock = $('#barSureBtnBlock'),
			pFilterMask = $('#pFilterMask');
		var dropdown1 = {
			hide: function($target, dtype) {
				$target.removeClass('cur');
				sortSubBlock.children('[mark="' + dtype + '"]').addClass('hide');
				lasttab = [];
				sortBlock.removeClass('expand');
				barTabMore.removeClass('hide');
				pFilterMask.removeClass('show');
				barSureBtnBlock.removeClass('show');
				deps.setStopLoad(false);
				deps.setBodyOverflow(false);
			},
			show: function($target, dtype) {
				$target.addClass('cur');
				var tempSub = sortSubBlock.children('[mark="' + dtype + '"]');
				tempSub.removeClass('hide');
				sortBlock.addClass('expand');
				barTabMore.addClass('hide');
				pFilterMask.addClass('show');
				lasttab = $target;
				deps.setStopLoad(true);
				var fTop = $('#proFilterWrap').position().top,
					tempH = $(window).height() - fTop - 165;
				if(tempSub.height() > tempH) {
					sortSubBlock.css('max-height', tempH);
				} else {
					sortSubBlock.removeAttr('style');
				}
				deps.setBodyOverflow(true);
			},
			clear: function() {
				if(lasttab.length > 0) {
					searchCom.changeCgReport(lasttab, 'cur');
					var lastDtype = lasttab.attr('dtype');
					lasttab.removeClass('cur');
					sortSubBlock.children('[mark="' + lastDtype + '"]').addClass('hide');
					sortSubBlock2.children('[fmark="' + lastDtype + '"]').addClass('hide');
				}
			}
		};
		$('#barTabs').on('click', 'a[dtype]', function() {
			var tar = $(this),
				dtype = tar.attr('dtype');
			if(!dtype) return;
			if(dtype == 'sale') {
				sortType = searchCom.SORT_CONSTANT.saleDesc;
				deps.searchByFilter();
				return;
			} else if(['article', 'shop', 'store'].indexOf(dtype) > -1) {
				deps.switchTab(dtype);
				return;
			} else if(['article', 'shop', 'store'].indexOf(window._currentTab) > -1) {
				deps.switchTab();
				return;
			}
			searchCom.changeCgReport(tar, 'cur');
			if(lasttab.length > 0 && lasttab[0] === this) {
				dropdown1.hide(tar, dtype);
				setTimeout(function() {
					dtype === 'dside' && tar.attr('report-eventid', 'MList_ServiceOpen');
				}, 300);
			} else {
				cancleBarFilter();
				dropdown1.clear();
				if(dtype == 'sort') {
					dropdown1.show(tar, dtype);
					barSureBtnBlock.removeClass('show');
				} else if(dtype == 'dside') {
					dropdown1.show(tar, dtype);
					barSureBtnBlock.addClass('show');
					$('#barSureBtn').attr({
						mark: dtype,
						rd: '0-24-26',
						'report-eventid': 'MList_ServiceSure'
					});
					$('#barResetBtn').attr({
						mark: dtype,
						rd: '0-24-27',
						'report-eventid': 'MList_ServiceReset'
					});
				} else if(dtype == 'category') {
					searchForOneFilter(dtype, null, function() {
						dropdown1.show(tar, dtype);
						barSureBtnBlock.removeClass('show');
					});
				}
				setTimeout(function() {
					dtype === 'dside' && tar.attr('report-eventid', 'MList_ServiceClose');
				}, 300);
			}
		});
		sortSelList.on('click', 'li[sort-type]', function() {
			var tar = $(this),
				sType = tar.attr('sort-type');
			if(tar.hasClass('selected')) return;
			switch(sType) {
				case 'default':
					sortType = '';
					break;
				case 'price_up':
					sortType = searchCom.SORT_CONSTANT.dredispriceAsc;
					break;
				case 'price_down':
					sortType = searchCom.SORT_CONSTANT.dredispriceDesc;
					break;
				case 'sale':
					sortType = searchCom.SORT_CONSTANT.saleDesc;
					break;
				case 'comment':
					sortType = searchCom.SORT_CONSTANT.commentcountDesc;
					break;
				case 'winsdate':
					sortType = searchCom.SORT_CONSTANT.winsdateDesc;
					break;
				case 'sale':
					sortType = searchCom.SORT_CONSTANT.saleDesc;
					break;
			}
			deps.searchByFilter();
		});
		$('#dsideSelList').on('click', 'li[data-filter]', function() {
			var tar = $(this),
				dataFilter = tar.attr('data-filter');
			newFilter = $.extend(true, {}, initFilterObj, newFilter || filter);
			searchCom.changeCgReport(tar, 'selected');
			changeServerMReportParam(tar);
			switch(dataFilter) {
				case 'dSide':
					setServerSelect(tar, 'dSideId', searchCom.FILTER_DEFVAL.id, newFilter);
					return;
				case 'vipdis':
					setServerSelect(tar, 'vipdis', searchCom.FILTER_DEFVAL.id, newFilter);
					return;
				case 'zy211':
					setServerSelect(tar, 'zy211', searchCom.FILTER_DEFVAL.id, newFilter);
					return;
				case 'newitem':
					setServerSelect(tar, 'newItems', searchCom.FILTER_DEFVAL.id, newFilter);
					return;
				case 'rstore':
					setServerSelect(tar, 'redisstore', searchCom.FILTER_DEFVAL.id, newFilter);
					return;
				case 'cashond':
					setServerSelect(tar, 'cashond', searchCom.FILTER_DEFVAL.id, newFilter);
					return;
				case 'gloabal':
					setServerSelect(tar, 'gloabal', searchCom.FILTER_DEFVAL.id, newFilter);
					return;
				case 'plus':
					setServerSelect(tar, 'plus', searchCom.FILTER_DEFVAL.id, newFilter);
					return;
				case 'promo':
					setServerSelect(tar, 'promo', initFilterObj.promo, newFilter);
					return;
				case 'disgloabal':
					setServerSelect(tar, 'disgloabal', searchCom.FILTER_DEFVAL.id, newFilter);
					return;
				case 'artwork':
					setServerSelect(tar, 'artwork', searchCom.FILTER_DEFVAL.id, newFilter);
					return;
				case 'pgitem':
					setServerSelect(tar, 'pgitem', searchCom.FILTER_DEFVAL.id, newFilter);
					return;
			}
		});
		$('#sortSubBlock').on('click', 'li[filter-type]', function() {
			var tar = $(this),
				ftype = tar.attr('filter-type'),
				cname = tar.attr('cname'),
				check = tar.hasClass('selected');
			newFilter = $.extend(true, {}, initFilterObj, newFilter || filter);
			switch(ftype) {
				case 'category':
					var cid = tar.attr('cid');
					if(check) {
						filter.category = initFilterObj.category;
						filter.categorystr = initFilterObj.categorystr;
						filter.categoryId = initFilterObj.categoryId;
						filter.categoryLevel = initFilterObj.categoryLevel;
						cid = initFilterObj.categoryId;
					} else {
						filter.category = cname;
						filter.categorystr = tar.attr('fname');
						filter.categoryId = cid;
						filter.categoryLevel = tar.attr('level');
					}
					markFilterSelCou(cid, filter.categoryId, searchCom.FILTER_DEFVAL.id);
					deps.searchByFilter(false, 2);
					break;
			}
		})
		$('#barTabs2').on('click', 'li[otype]', function() {
			var tar = $(this),
				otype = tar.attr('otype');
			if(otype == 'act') {
				if(tar.hasClass('selected')) {
					filter.actInfo.actCheck = searchCom.FILTER_DEFVAL.id;
				} else {
					filter.actInfo.actCheck = '1';
				}
				deps.searchByFilter();
				return;
			} else if(otype == 'newitem') {
				if(tar.hasClass('selected')) {
					filter.newItems = searchCom.FILTER_DEFVAL.id;
				} else {
					filter.newItems = '1';
				}
				deps.searchByFilter();
				return;
			} else if(otype == 'car') {
				if(tar.hasClass('selected')) {
					filter.carModelId = searchCom.FILTER_DEFVAL.mulId;
				} else {
					filter.carModelId = tar.attr('modelid');
				}
				deps.searchByFilter();
			}
		});
		$('#barTabs2').on('click', 'li[dtype]', function() {
			var tar = $(this),
				dtype = tar.attr('dtype');
			if(!dtype) return;
			searchCom.changeCgReport(tar, 'cur');
			if(lasttab.length > 0 && lasttab[0] === this) {
				tar.removeClass('cur');
				sortSubBlock2.children('[fmark="' + dtype + '"]').addClass('hide');
				lasttab = [];
				sortBlock.removeClass('more_expand');
				pFilterMask.removeClass('show');
				barSureBtnBlock.removeClass('show');
				deps.setStopLoad(false);
				deps.setBodyOverflow(false);
			} else {
				cancleBarFilter();
				if(lasttab.length > 0) {
					searchCom.changeCgReport(lasttab, 'cur');
					var lastDtype = lasttab.attr('dtype');
					lasttab.removeClass('cur');
					sortSubBlock2.children('[fmark="' + lastDtype + '"]').addClass('hide');
				}
				tar.addClass('cur');
				lasttab = tar;
				deps.setStopLoad(true);
				if(dtype == 'category' || (dtype == 'price' && features.indexOf(FEATURES.PREFER_PRICE_IN_QUICK_BAR) == -1) || dtype == 'packstate' || dtype == 'carinfo' || dtype == 'babyinfo') {
					barSureBtnBlock.removeClass('show');
				} else {
					barSureBtnBlock.addClass('show');
					var ind = tar.attr('ind');
					$('#barSureBtn').attr({
						mark: dtype,
						rd: '0-24-' + (32 + parseInt(ind, 10) * 6),
						'report-eventid': 'MList_SecondaryFilterFloatConfirm'
					});
					$('#barResetBtn').attr({
						mark: dtype,
						rd: '0-24-' + (33 + parseInt(ind, 10) * 6),
						'report-eventid': 'MList_SecondaryFilterFloatReset'
					});
				}
				searchForOneFilter(dtype, null, function() {
					var tempSub = sortSubBlock2.children('[fmark="' + dtype + '"]');
					tempSub.removeClass('hide');
					sortBlock.addClass('more_expand');
					pFilterMask.addClass('show');
					var fTop = $('#proFilterWrap').position().top,
						tempH = $(window).height() - fTop - 200;
					if(tempSub.height() > tempH) {
						sortSubBlock2.css('max-height', tempH);
					} else {
						sortSubBlock2.removeAttr('style');
					}
					deps.setBodyOverflow(true);
				});
			}
		});
		$('#sortSubBlock2').on('click', 'li[filter-type]', function() {
			var tar = $(this),
				ftype = tar.attr('filter-type'),
				cname = tar.attr('cname'),
				check = tar.hasClass('selected');
			newFilter = $.extend(true, {}, initFilterObj, newFilter || filter);
			switch(ftype) {
				case 'category':
					var cid = tar.attr('cid');
					if(check) {
						filter.category = initFilterObj.category;
						filter.categorystr = initFilterObj.categorystr;
						filter.categoryId = initFilterObj.categoryId;
						filter.categoryLevel = initFilterObj.categoryLevel;
						cid = initFilterObj.categoryId;
					} else {
						filter.category = cname;
						filter.categorystr = tar.attr('fname');
						filter.categoryId = cid;
						filter.categoryLevel = '3';
					}
					markFilterSelCou(cid, filter.categoryId, searchCom.FILTER_DEFVAL.id);
					deps.searchByFilter(false, 2);
					break;
				case 'brand':
					mulSelCommon(tar, check, cname, 'brand', 'selected', null, null, newFilter);
					break;
				case 'price':
					var min = tar.attr('min'),
						max = tar.attr('max');
					if(check) {
						filter.price = '全部价格';
						filter.priceMin = '-1';
						filter.priceMax = '-1';
						filter.selectCount--;
					} else {
						filter.price = cname;
						filter.priceMin = min;
						filter.priceMax = max;
						filter.selectCount++;
					}
					deps.searchByFilter(false, 2);
					break;
				case 'publishers':
					mulSelCommon(tar, check, cname, 'publishers', 'selected', null, null, newFilter);
					break;
				case 'package':
					mulSelCommon(tar, check, cname, 'package', 'selected', null, null, newFilter);
					break;
				case 'media':
					mulSelCommon(tar, check, cname, 'media', 'selected', null, null, newFilter);
					break;
				case 'dregion':
					mulSelCommon(tar, check, cname, 'dregion', 'selected', null, null, newFilter);
					break;
				case 'packstate':
					var tid = tar.attr('tid');
					if(check) {
						filter.packstateStr = '全部';
						filter.packstate = '-1';
						filter.selectCount--;
					} else {
						filter.packstateStr = cname;
						filter.packstate = tid;
						filter.selectCount++;
					}
					deps.searchByFilter(false, 2);
					break;
				default:
					var extid = tar.attr('extid'),
						tid = tar.attr('tid');
					for(var i = 0, len = filter.extAttr.length; i < len; ++i) {
						if(extid == filter.extAttr[i].tid) {
							mulSelCommon(tar, check, cname, extid, 'selected', tid, i, newFilter);
						}
					}
					break;
			}
		});
		fixScroll($('#sortSubBlock2'));
		sortSubBlock2.on('input', '.interval_input', function() {
			var $input = $(this),
				val = $.trim($input.val());
			newFilter = $.extend(true, {}, initFilterObj, newFilter || filter);
			if(/^\d{0,8}$/.test(val)) {
				$input.attr('data-val', val);
				var $min = sortSubBlock2.find('[interval="min"]'),
					$max = sortSubBlock2.find('[interval="max"]');
				var min = parseInt($.trim($min.val())),
					max = parseInt($.trim($max.val()));
				min = min > 0 ? min : 0;
				max = max > 0 ? max : 100000000;
				if(min > max) {
					var temp = min;
					min = max;
					max = temp;
				}
				if(min == 0 && max == 100000000) {
					min = '-1';
					max = '-1';
				} else {}
				newFilter.priceMin = min;
				newFilter.priceMax = max;
			} else {
				$input.val($input.attr('data-val'));
			}
		});
		$('#barResetBtn').on('tap', function() {
			resetBarFilter();
		});
		$('#barSureBtn').on('click', function() {
			if(newFilter) {
				filter && cachev1.local.setItem('lastFilter', filter, 9999);
				filter = $.extend(true, {}, initFilterObj, newFilter);
				newFilter = null;
			}
			deps.searchByFilter(false, 2);
		});
		$('#filterBtn').on('click', function() {
			if(!pFilterMask.hasClass('show') || $(this).hasClass('disabled')) return;
			hideCommon();
		});
		pFilterMask.on('click', function() {
			hideCommon();
			deps.setBodyOverflow(false);
		});

		function hideCommon() {
			if(lasttab.length > 0) {
				lasttab.removeClass('cur');
				var lastDtype = lasttab.attr('dtype');
				if((lastDtype == 'carinfo' && carInfo.curdel) || (lastDtype == 'babyinfo' && babyInfo.curdel)) {
					deps.searchByFilter(false, 2);
					return;
				}
			}
			lasttab = [];
			sortSubBlock.children('[mark]').addClass('hide');
			sortSubBlock2.children('[fmark]').addClass('hide');
			sortBlock.removeClass('expand more_expand');
			barTabMore.removeClass('hide');
			pFilterMask.removeClass('show');
			barSureBtnBlock.removeClass('show');
			deps.setStopLoad(false);
			cancleBarFilter();
		}

		function cancleBarFilter() {
			if(newFilter) {
				fillBarFilter(true);
			}
			newFilter = null;
		}

		function resetBarFilter() {
			var lastDtype = lasttab.attr('dtype');
			newFilter = $.extend(true, {}, initFilterObj, newFilter || filter);
			clearOneFilter(newFilter, lastDtype);
			sortSubBlock.find('[mark="' + lastDtype + '"]>.selected').removeClass('selected');
			sortSubBlock2.find('[fmark="' + lastDtype + '"]>.selected').removeClass('selected');
			sortSubBlock.children('[mark="' + lastDtype + '"]').removeClass('hide');
			sortSubBlock2.children('[fmark="' + lastDtype + '"]').removeClass('hide');
			sortSubBlock2.find('.interval_input').val('');
		}
	}

	function changeServerMReportParam($server) {
		var params = $server.attr('report-eventparam');
		if(!params) return;
		params = params.split('_');
		params[1] = !parseInt(params[1]) ? 1 : 0;
		setTimeout(function() {
			$server.attr('report-eventparam', params.join('_'));
		}, 300);
	}

	function bindFilterEvent() {
		var filterBlock = $('#filterBlock'),
			$filterInner = filterBlock.find('#filterInner'),
			$filterButtonArea = filterBlock.find('.filterlayer_bottom_buttons'),
			oldFilter, clord = '38';
		var isAndroid = /(Android);?[\s\/]+([\d.]+)?/.test(window.navigator.userAgent);
		filterBlock.on('tap', 'li[data-filter],li[filter-type],li.super_li', function(e) {
			var tar = $(this);
			tar.addClass('active');
			window.setTimeout(function() {
				tar && tar.removeClass('active');
			}, 200);
		});
		filterBlock.on('click', 'li.super_li', function(e) {
			var tar = $(this),
				target = $(e.target),
				open = tar.hasClass('opened');
			if(target.parents('.sub_list').length > 0) return;
			searchCom.changeCgReport(tar, 'opened');
			if(open) {
				tar.find('ul.sub_list').addClass('hide');
				tar.removeClass('opened');
			} else {
				tar.find('ul.sub_list').removeClass('hide');
				tar.addClass('opened');
			}
		});
		filterBlock.on('click', '[data-filter]', function() {
			var tar = $(this),
				dataFilter = tar.attr('data-filter');
			if(inFilterShow) return;
			oldFilter = $.extend(true, {}, initFilterObj, filter);
			if(~'|dSide|vipdis|zy211|newitem|actsel|area|rstore|cashond|gloabal|promo|wxprice|sqprice|disgloabal|plus|artwork|pgitem|'.indexOf('|' + dataFilter + '|')) {
				searchCom.changeCgReport(tar, 'selected');
				changeServerMReportParam(tar);
			}
			window.backSteep.push(fillFilter);
			$('#filterSureBtn').removeClass('hide').attr('rd', '0-13-4');
			$filterInner.attr('data-scroll', $filterInner.scrollTop());
			switch(dataFilter) {
				case 'category':
					searchForOneFilter(dataFilter, filter, function() {
						fillCategory();
						fillSelTips('category', null, classType == 2 ? ' ' : filter.categorystr, tar.find('.big').text());
						$('#filterBBtn').attr('rd', '0-11-1');
						$('#filterSureBtn').addClass('hide');
					});
					break;
				case 'brand':
					searchForOneFilter(dataFilter, filter, function() {
						brandFilterPanel.show();
						window.setTimeout(function() {
							fillSelTips('brand', null, null, tar.find('.big').text());
						}, 0);
						$('#filterBBtn').attr('rd', '0-12-1');
						$('#filterSureBtn').attr('rd', '0-12-4');
						window.backSteep.pop();
						window.backSteep.push(function() {
							brandFilterPanel.hide();
							fillFilter();
						});
					});
					break;
				case 'priceRange':
					setPriceSelect(tar);
					$('#filterSureBtn').addClass('hide');
					return;
				case 'dSide':
					setServerSelect(tar, 'dSideId', searchCom.FILTER_DEFVAL.id, filter);
					$('#filterSureBtn').addClass('hide');
					return;
				case 'vipdis':
					setServerSelect(tar, 'vipdis', searchCom.FILTER_DEFVAL.id, filter);
					$('#filterSureBtn').addClass('hide');
					return;
				case 'zy211':
					setServerSelect(tar, 'zy211', searchCom.FILTER_DEFVAL.id, filter);
					$('#filterSureBtn').addClass('hide');
					return;
				case 'newitem':
					setServerSelect(tar, 'newItems', searchCom.FILTER_DEFVAL.id, filter);
					$('#filterSureBtn').addClass('hide');
					return;
				case 'rstore':
					setServerSelect(tar, 'redisstore', searchCom.FILTER_DEFVAL.id, filter);
					$('#filterSureBtn').addClass('hide');
					return;
				case 'cashond':
					setServerSelect(tar, 'cashond', searchCom.FILTER_DEFVAL.id, filter);
					$('#filterSureBtn').addClass('hide');
					return;
				case 'gloabal':
					setServerSelect(tar, 'gloabal', searchCom.FILTER_DEFVAL.id, filter);
					$('#filterSureBtn').addClass('hide');
					return;
				case 'plus':
					setServerSelect(tar, 'plus', searchCom.FILTER_DEFVAL.id, filter);
					$('#filterSureBtn').addClass('hide');
					return;
				case 'promo':
					setServerSelect(tar, 'promo', initFilterObj.promo, filter);
					$('#filterSureBtn').addClass('hide');
					return;
				case 'disgloabal':
					setServerSelect(tar, 'disgloabal', searchCom.FILTER_DEFVAL.id, filter);
					$('#filterSureBtn').addClass('hide');
					return;
				case 'artwork':
					setServerSelect(tar, 'artwork', searchCom.FILTER_DEFVAL.id, filter);
					$('#filterSureBtn').addClass('hide');
					return;
				case 'pgitem':
					setServerSelect(tar, 'pgitem', searchCom.FILTER_DEFVAL.id, filter);
					$('#filterSureBtn').addClass('hide');
					return;
				case 'actsel':
					setServerSelect(tar, 'actsel', searchCom.FILTER_DEFVAL.id, filter);
					$('#filterSureBtn').addClass('hide');
					return;
				case 'area':
					address.show();
					fixScroll($('.search_addrlayer_body_scroller_inner'));
					break;
				case 'publishers':
					searchForOneFilter(dataFilter, filter, function() {
						fillPublishers();
						fillSelTips('publishers', null, null, tar.find('.big').text());
						$('#filterBBtn').attr('rd', '0-13-1');
					});
					break;
				case 'package':
					searchForOneFilter(dataFilter, filter, function() {
						fillPackage();
						fillSelTips('package', null, null, tar.find('.big').text());
						$('#filterBBtn').attr('rd', '0-13-1');
					});
					break;
				case 'media':
					searchForOneFilter(dataFilter, filter, function() {
						fillMedia();
						fillSelTips('media', null, null, tar.find('.big').text());
						$('#filterBBtn').attr('rd', '0-13-1');
					});
					break;
				case 'dregion':
					searchForOneFilter(dataFilter, filter, function() {
						fillDregion();
						fillSelTips('dregion', null, null, tar.find('.big').text());
						$('#filterBBtn').attr('rd', '0-13-1');
					});
					break;
				case 'packstate':
					fillPackstate();
					fillSelTips('packstate', null, filter.packstateStr, tar.find('.big').text());
					$('#filterBBtn').attr('rd', '0-13-1');
					break;
				default:
					searchForOneFilter(dataFilter, filter, function() {
						fillExt(dataFilter, tar);
					});
					break;
			}
			$('#filterCBtn').addClass('hide');
			$('#filterFinishBtn').addClass('hide');
			$('#filterBBtn').removeClass('hide');
			if(dataFilter != 'area') {
				$('#filterSelBlock').removeClass('hide');
				$('#filterInner').addClass('with_sub_title').scrollTop(0);
			}
			clord = '3';
		});
		filterBlock.on('click', '[data-filtertype]', function() {
			var tar = $(this),
				ftype = tar.attr('data-filtertype'),
				cname = tar.attr('cname'),
				check = tar.hasClass('selected'),
				tid = tar.attr('tid') || '';
			switch(ftype) {
				case 'brand':
				case 'publishers':
				case 'package':
				case 'media':
				case 'dregion':
					mulSelCommon(tar, check, cname, ftype, 'selected');
					fillOuterSelTips(ftype, tid);
					break;
				case 'packstate':
					if(tid == -1) {
						filter.packstate != '-1' && (filter.selectCount--);
						filter.packstateStr = '全部';
						filter.packstate = '-1';
					} else {
						filter.packstate == '-1' && (filter.selectCount++);
						filter.packstateStr = cname;
						filter.packstate = tid;
					}
					tar.addClass('selected');
					tar.siblings().removeClass('selected');
					$filterInner.find('[r-mark="packstate"]').text(filter.packstateStr);
					break;
				default:
					var extid = tar.attr('extid');
					for(var i = 0, len = filter.extAttr.length; i < len; ++i) {
						if(extid == filter.extAttr[i].tid) {
							mulSelCommon(tar, check, cname, extid, 'selected', tid, i);
							fillOuterSelTips(extid, i);
							break;
						}
					}
					break;
			}
			resetFilterClearBtn();
		});
		filterBlock.on('click', 'li[filter-type]', function() {
			var tar = $(this),
				ftype = tar.attr('filter-type'),
				cname = tar.attr('cname'),
				check = tar.hasClass('checked');
			if(ftype == 'area') return;
			switch(ftype) {
				case 'category':
					var cid = tar.attr('cid');
					markFilterSelCou(cid, filter.categoryId, searchCom.FILTER_DEFVAL.id);
					filter.category = cname;
					filter.categorystr = tar.attr('fname');
					filter.categoryId = cid;
					filter.categoryLevel = tar.attr('level');
					fillFilter();
					window.backSteep.pop();
					$filterInner.scrollTop($filterInner.attr('data-scroll') || 0)
					break;
				case 'brand':
					mulSelCommon(tar, check, cname, 'brand', 'checked');
					break;
				case 'publishers':
					mulSelCommon(tar, check, cname, 'publishers', 'checked');
					break;
				case 'package':
					mulSelCommon(tar, check, cname, 'package', 'checked');
					break;
				case 'media':
					mulSelCommon(tar, check, cname, 'media', 'checked');
					break;
				case 'dregion':
					mulSelCommon(tar, check, cname, 'dregion', 'checked');
					break;
				case 'packstate':
					var tid = tar.attr('tid');
					if(check) {
						filter.packstateStr = '全部';
						filter.packstate = '-1';
						filter.selectCount--;
					} else {
						filter.packstateStr = cname;
						filter.packstate = tid;
						filter.selectCount++;
					}
					fillFilter();
					window.backSteep.pop();
					break;
				default:
					var extid = tar.attr('extid'),
						tid = tar.attr('tid');
					for(var i = 0, len = filter.extAttr.length; i < len; ++i) {
						if(extid == filter.extAttr[i].tid) {
							mulSelCommon(tar, check, cname, extid, 'checked', tid, i);
						}
					}
					break;
			}
		});
		filterBlock.on('input', '.filterlayer_price_area_input', function() {
			var $input = $(this),
				val = $.trim($input.val());
			if(/^\d{0,8}$/.test(val)) {
				$input.attr('data-val', val);
				var $min = $('#filterPriceMin'),
					$max = $('#filterPriceMax');
				var min = $.trim($min.val()),
					max = $.trim($max.val());
				$('.filterlayer_price_choice').each(function(index, elem) {
					var $elem = $(elem),
						elemMin = $elem.attr('start'),
						elemMax = $elem.attr('end');
					if(min == elemMin && max == elemMax) {
						$elem.addClass('active');
						setTimeout(function() {
							$elem.attr('rd', $elem.attr('crd'));
						}, 200);
					} else {
						$elem.removeClass('active');
						setTimeout(function() {
							$elem.attr('rd', $elem.attr('ord'));
						}, 200);
					}
				});
			} else {
				$input.val($input.attr('data-val'));
			}
		});
		filterBlock.on('focus', '.filterlayer_price_area_input', function() {
			var $priceArea = $(this).parents('.mod_list');
			if(isAndroid) {
				$filterInner.scrollTop($priceArea[0].offsetTop - 10);
				innerScroll.call($filterInner[0]);
				$filterInner.on('scroll', innerScroll);
			}
		});
		filterBlock.on('blur', '.filterlayer_price_area_input', function() {
			if(isAndroid) {
				$filterButtonArea.show();
				$filterInner.off('scroll', innerScroll);
			}
			var $min = $('#filterPriceMin'),
				$max = $('#filterPriceMax');
			var min = parseInt($.trim($min.val())),
				max = parseInt($.trim($max.val()));
			min = min > 0 ? min : 0;
			max = max > 0 ? max : 100000000;
			if(min > max) {
				var temp = min;
				min = max;
				max = temp;
			}
			var str = '';
			if(min > 0 && max == 100000000) {
				str = '>&yen;' + min;
			} else if(min == 0 && max >= 0) {
				str = '<&yen;' + max
			} else {
				str = '&yen;' + min + ' - &yen;' + max
			}
			if(min == 0 && max == 100000000) {
				min = '-1';
				max = '-1';
				if(filter.priceMin != '-1' || filter.priceMax != '-1') {
					filter.selectCount--;
				}
			} else {
				if(filter.priceMin == '-1' && filter.priceMax == '-1') {
					filter.selectCount++;
				}
			}
			filter.price = str;
			filter.priceMin = min;
			filter.priceMax = max;
			resetFilterClearBtn();
		});

		function innerScroll() {
			if(this.scrollTop + this.clientHeight >= this.scrollHeight - 50) {
				$filterButtonArea.show();
			} else {
				$filterButtonArea.hide();
			}
		}
		fixScroll();
		brandFilterPanel.initEvent();
		$('#filterBtn').on('click', function() {
			if(filter.areaLevel > 0 || $(this).hasClass('disabled')) return;
			deps.setStopLoad(true);
			showSelectBlockPre();
			clord = '38';
		});
		$('#sfLayerBg').on('click', function(e) {
			if(inFilterShow) return;
			brandFilterPanel.hide();
			$('#filterCBtn').click();
			deps.reporJdMul('7094-9-' + clord);
		});
		filterBlock.on('click', '#filterClearBtn', function(e) {
			if(filter.selectCount <= 0) return;
			clearFilter();
			fillFilter();
		});
		$('#filterCBtn').on('click', function(e) {
			if(inFilterShow) return;
			reaStateClass();
			changeSelectMode(2);
			window.backSteep = [];
			deps.setStopLoad(false);
		});
		$('#filterBBtn').on('click', function(e) {
			if(window.backSteep.length > 0) {
				var fun = window.backSteep.pop();
				oldFilter && (filter = oldFilter);
				fun && fun();
				$filterInner.scrollTop($filterInner.attr('data-scroll') || 0);
				e.preventDefault();
			}
		});
		$('#filterSureBtn').on('click', function(e) {
			if(window.backSteep.length > 0) {
				var fun = window.backSteep.pop();
				fun && fun();
				$filterInner.scrollTop($filterInner.attr('data-scroll') || 0);
				e.preventDefault();
			}
		});
		$('#filterFinishBtn').on('click', function(e) {
			if(compareFilter() == 1) {
				oldFilter && cachev1.local.setItem('lastFilter', oldFilter, 9999);
				deps.searchByFilter(false, 1);
			} else {
				reaStateClass();
			}
			changeSelectMode(2);
			window.backSteep = [];
		});
	}
	var fixScroll = function() {
		var startY, canScroll;

		function scrollStart(evt) {
			var touch = evt.touches && evt.touches[0] || evt;
			startY = touch.pageY;
			canScroll = true;
			$(this).on('touchmove', scrollMove).on('touchend', scrollEnd);
		}

		function scrollMove(evt) {
			var touch = evt.touches && evt.touches[0] || evt;
			if((!canScroll || !(canScroll = touch.pageY > startY)) && (this.scrollTop + this.clientHeight >= this.scrollHeight)) {
				evt.preventDefault();
			}
		}

		function scrollEnd() {
			$(this).off('touchmove', scrollMove).off('touchend', scrollEnd);
		}

		function scroll() {
			if(this.scrollTop + this.clientHeight >= this.scrollHeight) {
				$(this).on('touchstart', scrollStart);
			} else {
				$(this).off('touchstart', scrollStart);
			}
		}
		return function($wrap) {
			$wrap = $wrap || $('#filterInner');
			$wrap.off('scroll', scroll).on('scroll', scroll);
		};
	}();

	function setServerSelect(tar, name, def, newFilter) {
		var check = tar.hasClass('selected'),
			tid = def,
			ico = tar.attr('ico');
		if(check) {
			tar.removeClass('selected');
		} else {
			tid = name == 'actsel' ? ico : '1';
			tar.addClass('selected');
		}
		if(name == 'actsel') {
			if(actInfoMap[ico]) {
				markFilterSelCou(tid, actInfoMap[ico].actCheck, searchCom.FILTER_DEFVAL.id);
				actInfoMap[ico].actCheck = tid;
			}
		} else {
			markFilterSelCou(tid, newFilter[name], def, newFilter);
			newFilter[name] = tid;
		}
		name == 'dSideId' && (newFilter.dSide = tid == '1' ? '京东物流' : '全部');
		resetFilterClearBtn();
	}

	function setPriceSelect(tar) {
		var min = tar.attr('start'),
			max = tar.attr('end'),
			text = tar.attr('text');
		var tempMin = '',
			tempMax = '';
		var checked = tar.hasClass('active');
		if(checked) {
			if(filter.priceMin != '-1' || filter.priceMax != '-1') {
				filter.selectCount--;
			}
			filter.price = '全部价格';
			filter.priceMin = '-1';
			filter.priceMax = '-1';
			tempMin = tempMax = '';
			tar.removeClass('active');
			setTimeout(function() {
				tar.attr('rd', tar.attr('ord'));
			}, 200);
		} else {
			if(filter.priceMin == '-1' && filter.priceMax == '-1') {
				filter.selectCount++;
			}
			filter.price = text;
			filter.priceMin = min;
			filter.priceMax = max;
			tempMin = min;
			tempMax = max;
			tar.addClass('active');
			setTimeout(function() {
				tar.attr('rd', tar.attr('crd'));
			}, 200);
			tar.siblings('.filterlayer_price_choice').each(function(i, item) {
				var $item = $(item);
				$item.removeClass('active');
				setTimeout(function() {
					$item.attr('rd', $item.attr('ord'));
				}, 200);
			});
		}
		$('#filterPriceMin').val(tempMin).attr('data-val', tempMin);
		$('#filterPriceMax').val(tempMax).attr('data-val', tempMax);
		resetFilterClearBtn();
	}

	function mulSelCommon(tar, check, cname, mark, className, tid, ind, tempFilter) {
		var tFilter = tempFilter || filter;
		searchCom.changeCgReport(tar, className);
		if(check) {
			tar.removeClass(className);
			if(tid) {
				delMulSelect('id', tid, searchCom.FILTER_DEFVAL.mulId, ind, tFilter);
				delMulSelect('value', cname, searchCom.FILTER_DEFVAL.mulName, ind, tFilter);
			} else {
				delMulSelect(mark, cname, searchCom.FILTER_DEFVAL.mulName, null, tFilter);
			}
			tFilter.selectCount--;
		} else {
			if(checkSelCount(mark, ind, tFilter)) {
				return false;
			}
			tar.addClass(className);
			var iscou = true;
			if(tid) {
				addMulSelect('id', tid, searchCom.FILTER_DEFVAL.mulId, ind, tFilter);
				iscou = addMulSelect('value', cname, searchCom.FILTER_DEFVAL.mulName, ind, tFilter);
			} else {
				iscou = addMulSelect(mark, cname, searchCom.FILTER_DEFVAL.mulName, null, tFilter);
			}
			iscou && tFilter.selectCount++;
		}
		fillSelTips(mark, tid ? ind : null);
		return true;
	}

	function resetFilterClearBtn() {
		if(filter.selectCount <= 0) {
			$('#filterClearBtn').addClass('disabled');
		} else {
			$('#filterClearBtn').removeClass('disabled');
		}
	}

	function addMulSelect(key, val, def, ext, tempFilter) {
		var tFilter = tempFilter || filter;
		var fk = tFilter[key] || '';
		if(typeof ext === 'number') {
			fk = (tFilter.extAttr[ext] && tFilter.extAttr[ext][key]) || '';
		}
		if(val != 'exp_color' && val != 'exp_size' && ~fk.indexOf('|' + val + '|')) {
			return false;
		}
		if(fk === def) {
			fk = '';
		}
		fk += (fk == '' ? '|' : '') + val + '|';
		if(typeof ext === 'number') {
			tFilter.extAttr[ext] && (tFilter.extAttr[ext][key] = fk);
		} else {
			tFilter[key] = fk;
		}
		return true;
	}

	function delMulSelect(key, val, def, ext, tempFilter) {
		var tFilter = tempFilter || filter;
		var fk = tFilter[key] || '';
		if(typeof ext === 'number') {
			fk = (tFilter.extAttr[ext] && tFilter.extAttr[ext][key]) || '';
		}
		fk = fk.replace('|' + val + '|', '|');
		if(fk == '|') {
			fk = def;
		}
		if(typeof ext === 'number') {
			tFilter.extAttr[ext] && (tFilter.extAttr[ext][key] = fk);
		} else {
			tFilter[key] = fk;
		}
	}

	function checkSelCount(mark, ext, tempFilter) {
		var tFilter = tempFilter || filter,
			val = tFilter[mark];
		if(typeof ext === 'number') {
			val = (tFilter.extAttr[ext] && tFilter.extAttr[ext]['value']) || '';
		}
		if(val) {
			val = val.replace(/^\|/, '').replace(/\|$/, '').split('|');
			var fu = val.length >= dataSizes.selFiltCou;
			if(fu) {
				ui.toast({
					msg: '最多可选' + dataSizes.selFiltCou + '个'
				});
			}
			return fu;
		}
		return false;
	}

	function markFilterSelCou(tg, og, def, tempFilter) {
		if(tg == og) return;
		if(tg == def) {
			if(tempFilter) {
				tempFilter.selectCount--;
			} else {
				filter.selectCount--;
			}
		} else {
			if(tempFilter) {
				tempFilter.selectCount++;
			} else {
				filter.selectCount++;
			}
		}
	}

	function showSelectBlockPre() {
		inFilterShow = true;
		showSelectBlock();
		window.setTimeout(function() {
			inFilterShow = false;
		}, 500);
	}

	function searchForOneFilter(dtype, tempFilter, cb) {
		if(dtype == 'carinfo') {
			cb && cb();
			getCarinfoFromMclient();
			return;
		} else if(dtype == 'babyinfo') {
			cb && cb();
			getBabyinfoFromMclient();
			return;
		}
		if(!keyword && !keywordCanEmpty) {
			cb && cb();
			return;
		}
		var tFilter = tempFilter || filter;
		if(tFilter.selectCount <= 0 || checkNotNeedUpdateAttr(dtype, tFilter)) {
			cb && cb();
			return;
		}
		var url = filterCgiurl.replace("{#key#}", encodeURIComponent(keyword)).replace('{#callback#}', 'jdSearchFilterCb').replace('{#source#}', isM ? 'attr_m' : (isWX ? 'attr_wx' : 'attr_sq'));
		url = setFilterParams(url, genTempFilter(dtype, tFilter));
		window.jdSearchFilterCb = function(json) {
			cgiMonitor.filterTimer && window.clearTimeout(cgiMonitor.filterTimer);
			if(json.retcode != 0) {
				if(umpData && umpData.bizid) {
					try {
						JD.report.umpBiz({
							bizid: umpData.bizid,
							operation: umpData.api,
							result: '1',
							source: '0',
							message: 'search attr_json api faild'
						});
					} catch(e) {}
				}
				cb && cb();
			} else {
				if(umpData && umpData.bizid) {
					try {
						JD.report.umpBiz({
							bizid: umpData.bizid,
							operation: umpData.api,
							result: '0',
							source: '0',
							message: 'search attr_json api loaded'
						});
					} catch(e) {}
				}
				var searchm = json.data.searchm;
				if(dtype == 'brand') {
					if(searchm.ObjB_TextCollection) {
						result.attrs.brand = searchm.ObjB_TextCollection.brand;
						result.attrs.brand.id = util.htmlDecode(result.attrs.brand.id).replace(/;$/, '').split(';');
						result.attrs.brand.value = util.htmlDecode(result.attrs.brand.value).replace(/(\|=\|)$/, '').split('|=|');
						result.attrs.brand.pinyin = util.htmlDecode(result.attrs.brand.pinyin).replace(/;$/, '').split(';');
						if(features.indexOf(FEATURES.BRAND_SELECTION) != -1) {
							var expressionKey = window._searchData.searchm.Head.Query.QueryProcessor.ExpressionKey;
							if(expressionKey) {
								var mat = expressionKey.match(/brand,,([^;]*)/);
								mat = mat && mat[1];
								if(mat) {
									for(var i = 0, len = result.attrs.brand.value.length; i < len; i++) {
										if(result.attrs.brand.value[i] === mat) {
											break;
										}
									}
									if(i < len) {
										result.attrs.brand.value = result.attrs.brand.value.splice(i, 1);
										result.attrs.brand.id = result.attrs.brand.id.splice(i, 1);
										result.attrs.brand.pinyin = result.attrs.brand.pinyin.splice(i, 1);
									} else {
										result.attrs.brand.value = [mat];
										result.attrs.brand.id = [''];
										result.attrs.brand.pinyin = ['#'];
									}
								}
							}
						}
						checkFilterSelVals(dtype);
						brandObj.allBrandList = [];
						brandObj.alphabet = [];
						brandObj.alphabetizeList = [];
						for(var i = 0, len = result.attrs.brand.id.length; i < len && i < brandObj.maxSize; ++i) {
							var bid = result.attrs.brand.id[i],
								name = result.attrs.brand.value[i],
								pinyin = result.attrs.brand.pinyin[i],
								pra = {
									datamark: 'brand',
									tid: bid,
									name: name,
									extid: '',
									check: false,
									pinyin: pinyin
								};
							brandObj.allBrandList.push(pra);
							brandObj.alphabet.indexOf(pinyin) == -1 && brandObj.alphabet.push(pinyin);
						}
						brandObj.alphabet.sort().forEach(function(letter) {
							brandObj.alphabetizeList.push({
								letter: letter
							});
							brandObj.alphabetizeList = brandObj.alphabetizeList.concat(brandObj.allBrandList.filter(function(brand) {
								return brand.pinyin.toUpperCase() == letter.toUpperCase();
							}))
						});
						fillBarFilterBrand(true, tFilter);
						result.attrs.brand.update = true;
					}
				} else if(dtype == 'category') {
					result.category = searchm.ObjCollection;
					initCategory();
					fillBarFilterCategory(true, tFilter);
					fillFixedBarCategory(true, tFilter);
					result.category.update = true;
				} else if(dtype == 'price') {
					result.attrs.price = searchm.Interval_Price && searchm.Interval_Price.length > 0 ? searchm.Interval_Price : result.attrs.price;
					fillBarFilterPrice(true, tFilter);
					fillBarFilterPrice2(true, tFilter);
					result.attrs.price.update = true;
				} else if(~'publishers|package|dregion|media'.indexOf(dtype)) {
					if(result.attrs.omsattr && searchm.ObjB_OmsAttrCollection && searchm.ObjB_OmsAttrCollection[dtype]) {
						result.attrs.omsattr[dtype] = searchm.ObjB_OmsAttrCollection[dtype];
						checkFilterSelVals(dtype);
						fillBarFilterBook(true, dtype, tFilter);
						result.attrs.omsattr[dtype].update = true;
					}
				} else if(~'exp_color|exp_size'.indexOf(dtype)) {
					if(searchm.ObjB_TextCollection && searchm.ObjB_TextCollection[dtype]) {
						result.attrs[dtype] = util.htmlDecode(searchm.ObjB_TextCollection[dtype].value).replace(/;$/, '').split(';');
						checkFilterSelVals(dtype);
						dtype == 'exp_color' ? fillBarFilterColor(true, tFilter) : fillBarFilterSize(true, tFilter);
						result.attrs[dtype].update = true;
					}
				} else {
					var common = searchm.ObjExtAttrCollection;
					if(common && common.length > 0 && result.attrs.common && result.attrs.common.length > 0) {
						var tempAttr = null;
						for(var i = 0, len = common.length; i < len; ++i) {
							if(common[i].expandsortid == dtype) {
								tempAttr = common[i];
								break;
							}
						}
						for(var i = 0, len = result.attrs.common.length; i < len; ++i) {
							var com = result.attrs.common[i];
							if(com.expandsortid == dtype) {
								if(tempAttr) {
									com.valueid = util.htmlDecode(tempAttr.valueid).replace(/;$/, '').split(';');
									com.valuename = util.htmlDecode(tempAttr.valuename).replace(/;$/, '').split(';');
									checkFilterSelVals(dtype, com);
									fillBarFilterExt(com, true, tFilter);
								}
								com.update = true;
								break;
							}
						}
					}
				}
				cb && cb();
			}
		};
		cgiMonitor.filterTimer = window.setTimeout(function() {
			if(umpData && umpData.bizid) {
				try {
					JD.report.umpBiz({
						bizid: umpData.bizid,
						operation: umpData.timeout,
						result: '0',
						source: '0',
						message: 'search attr_json api timeout'
					});
				} catch(e) {}
			}
			cb && cb();
		}, cgiMonitor.timeout);
		ls.loadScript({
			url: url,
			isToken: false
		});
	}

	function genTempFilter(dtype, tempFilter) {
		var tFilter = $.extend(true, {}, tempFilter || filter);
		if(dtype == 'brand') {
			tFilter.brand = initFilterObj.brand;
		} else if(dtype == 'category') {
			tFilter.category = initFilterObj.category;
			tFilter.categorystr = initFilterObj.categorystr;
			tFilter.categoryId = initFilterObj.categoryId;
			tFilter.categoryLevel = initFilterObj.categoryLevel;
		} else if(dtype == 'price') {
			tFilter.price = initFilterObj.price;
			tFilter.priceMin = initFilterObj.priceMin;
			tFilter.priceMax = initFilterObj.priceMax;
		} else if(~'publishers|package|dregion|media'.indexOf(dtype)) {
			tFilter[dtype] = initFilterObj[dtype];
		} else {
			var attr = getSelectExtAttr(dtype, tFilter);
			if(attr) {
				attr.id = searchCom.FILTER_DEFVAL.mulId;
				attr.value = searchCom.FILTER_DEFVAL.mulName;
			}
		}
		return tFilter;
	}

	function checkNotNeedUpdateAttr(dtype, tFilter) {
		if(dtype == 'brand') {
			return(tFilter.brand == searchCom.FILTER_DEFVAL.mulName) || (!!result.attrs.brand.update);
		} else if(dtype == 'category') {
			return tFilter.categoryId == searchCom.FILTER_DEFVAL.mulId || (!!result.category.update);
		} else if(dtype == 'price') {
			if(features.indexOf(FEATURES.PREFER_PRICE_IN_QUICK_BAR) != -1) {
				return(tFilter.priceMin == '-1' && filter.priceMax == '-1') || (!result.attrs.price) || (!!result.attrs.price.update);
			} else {
				return(tFilter.priceMin == '-1' && filter.priceMax == '-1') || (!!result.attrs.price.update);
			}
		} else if(~'publishers|package|dregion|media|packstate'.indexOf(dtype)) {
			if(dtype == 'packstate') {
				return true;
			} else {
				return(tFilter[dtype] == searchCom.FILTER_DEFVAL.mulName) || (!!result.attrs.omsattr[dtype].update);
			}
		} else if(~'exp_color|exp_size'.indexOf(dtype)) {
			var attr = getSelectExtAttr(dtype);
			if(attr) {
				return(attr.id == searchCom.FILTER_DEFVAL.mulId) || (!!result.attrs[dtype].update);
			}
		} else {
			if(result.attrs.common && result.attrs.common.length > 0) {
				for(var i = 0, j = 0, len = result.attrs.common.length; i < len; ++i) {
					var com = result.attrs.common[i];
					if(dtype == com.expandsortid) {
						var attr = getSelectExtAttr(com.expandsortid);
						if(attr) {
							return(attr.id == searchCom.FILTER_DEFVAL.mulId) || (!!com.update);
						}
					}
				}
			}
		}
		return false;
	}

	function checkFilterSelVals(dtype, com) {
		if(dtype == 'brand') {
			if(hasMulSelVals[dtype]) {
				for(var i = 0, len = hasMulSelVals[dtype].length; i < len; ++i) {
					var v = hasMulSelVals[dtype][i],
						ind = result.attrs.brand.value.indexOf(v);
					if(ind == -1 || ind > brandObj.maxSize) {
						result.attrs.brand.value.unshift(v);
						result.attrs.brand.id.unshift('');
						result.attrs.brand.pinyin.unshift('#');
					}
				}
			}
			if(filter.brand) {
				var brandSelVals = filter.brand.replace(/^\|/, '').replace(/\|$/, '').split('|');
				for(var i = 0, len = brandSelVals.length; i < len; ++i) {
					var v = brandSelVals[i],
						ind = result.attrs.brand.value.indexOf(v);
					if(ind == -1 || ind > brandObj.maxSize) {
						result.attrs.brand.value.unshift(v);
						result.attrs.brand.id.unshift('');
						result.attrs.brand.pinyin.unshift('#');
					}
				}
			}
		} else if(~'publishers|package|dregion|media|packstate'.indexOf(dtype)) {
			if(hasMulSelVals[dtype]) {
				var hv = !!~'publishers|package'.indexOf(dtype);
				for(var i = 0, len = hasMulSelVals[dtype].length; i < len; ++i) {
					var v = hasMulSelVals[dtype][i];
					if(hv) {
						if(!~result.attrs.omsattr[dtype].value.indexOf(v)) {
							result.attrs.omsattr[dtype].value.unshift(v);
						}
					} else {
						if(!~result.attrs.omsattr[dtype].indexOf(v)) {
							result.attrs.omsattr[dtype].unshift(v);
						}
					}
				}
			}
		} else if(~'exp_color|exp_size'.indexOf(dtype)) {
			if(hasMulSelVals[dtype]) {
				for(var i = 0, len = hasMulSelVals[dtype].length; i < len; ++i) {
					var v = hasMulSelVals[dtype][i];
					if(!~result.attrs[dtype].indexOf(v)) {
						result.attrs[dtype].unshift(v);
					}
				}
			}
		} else if(com) {
			for(var i = 0, len = hasMulSelVals.selAttrs.length; i < len; ++i) {
				var attr = hasMulSelVals.selAttrs[i];
				if(attr.id == com.expandsortid) {
					for(var j = 0, jlen = attr.childs.length; j < jlen; ++j) {
						var chs = attr.childs[j].split('-');
						if(!~com.valueid.indexOf(chs[0])) {
							com.valueid.unshift(chs[0]);
							com.valuename.unshift(chs[1]);
						}
					}
				}
			}
		}
	}

	function setFilterParams(url, tFilter) {
		markMultiSelect(tFilter);
		url = searchCom.setCategory(url, tFilter);
		url = searchCom.setBrand(url, tFilter);
		url = searchCom.setPrice(url, tFilter);
		url = searchCom.setDistributionSide(url, tFilter);
		url = searchCom.setDistributionAreas(url, tFilter);
		url = searchCom.setRedisstore(url, tFilter);
		url = searchCom.setCashond(url, tFilter);
		url = searchCom.setGloabal(url, tFilter);
		url = searchCom.setPLUS(url, tFilter);
		url = searchCom.setDisGloabal(url, tFilter);
		url = searchCom.setVipDis(url, tFilter);
		url = searchCom.setArtwork(url, tFilter);
		url = searchCom.setPgitem(url, tFilter);
		url = searchCom.setPromo(url, tFilter);
		url = searchCom.setExpandAttr(url, tFilter);
		url = searchCom.setActParamV2(url, tFilter, activeInfo);
		url = searchCom.setSortType(url, sortType);
		url = searchCom.setBookParam(url, tFilter);
		url = searchCom.setCarParam(url, tFilter);
		url = searchCom.setBabyParam(url, tFilter);
		url = searchCom.setExtFilterParam(url, tFilter);
		var reLen = reqExtParams.length;
		if(reLen > 0) {
			for(var i = 0; i < reLen; ++i) {
				var pa = reqExtParams[i];
				url = searchCom.addUrlParam(url, pa.key, pa.val);
			}
		}
		return url;
	}

	function setFilterAdSearch(url) {
		var param = [];
		if(filter.brand != searchCom.FILTER_DEFVAL.mulName) {
			var bs = filter.brand.replace(/^\|/, '').replace(/\|$/, '').split('|');
			for(var i = 0, len = bs.length; i < len; ++i) {
				bs[i] = encodeURIComponent(bs[i]);
			}
			param.push('exbrand_' + bs.join('||'));
		}
		if(filter.priceMin !== '-1' && filter.priceMax !== '-1') {
			param.push('exprice_' + filter.priceMin + '-' + filter.priceMax);
		}
		for(var k = 0, flen = filter.extAttr.length; k < flen; ++k) {
			var attr = filter.extAttr[k];
			if(attr.id === searchCom.FILTER_DEFVAL.mulId) continue;
			if(attr.tid === 'exp_color') {
				if(attr.value != '全部') {
					var bs = attr.value.replace(/^\|/, '').replace(/\|$/, '').split('|');
					for(var i = 0, len = bs.length; i < len; ++i) {
						bs[i] = encodeURIComponent(bs[i]);
					}
					param.push('excolor_' + bs.join('||'));
				}
			} else if(attr.tid === 'exp_size') {
				if(attr.value != '全部') {
					var bs = attr.value.replace(/^\|/, '').replace(/\|$/, '').split('|');
					param.push('exsize_' + bs.join('||'));
				}
			} else {
				var bs = attr.id.replace(/^\|/, '').replace(/\|$/, '').split('|');
				param.push(attr.tid + '_' + bs.join('||'));
			}
		}
		if(param.length > 0) {
			url = searchCom.addUrlParam(url, 'ev', param.join('@'));
		}
		return url;
	}

	function initExtFilter() {
		var searchm = window._searchData.searchm;
		var delivers = searchm.ObjExist_Statistic.Delivertime;
		for(var i = 0, len = delivers.length; i < len; ++i) {
			if(delivers[i].type == '1') {
				filter.zy211Show = true;
			}
		}
		var hasVIP = searchm.ObjExist_Statistic.HasVIPware;
		if(hasVIP == '1') {
			filter.vipdisShow = true;
		}
		var hasPLUS = searchm.ObjExist_Statistic.HasPLUSware;
		if(hasPLUS == '1') {
			filter.plusShow = true;
		}
		var hasFzxp = searchm.ObjExist_Statistic.HasFZXPware,
			hasXpShow = false;
		if(hasFzxp == '1') {
			hasXpShow = true;
		} else {
			var productExt = getFiltType('product_ext');
			if(productExt.length > 0) {
				for(var j = 0, jlen = productExt.length; j < jlen; ++j) {
					var pext = productExt[j],
						pext0 = pext[0];
					if(pext0 == '26') {
						hasXpShow = true;
					}
				}
			}
		}
		if(hasXpShow) {
			deps.reportInfo.isNewItem = true;
			filter.newItemShow = true;
			window.wa && window.wa('ptagExposure', {
				ptag: '37024.19.2'
			});
		}
	}

	function initCategory() {
		var list = [],
			cat2Map = {},
			catidMap = {};
		if(result.category && result.category.cid1 && result.category.cid1.length > 0) {
			for(var i = 0, len = result.category.cid1.length; i < len; ++i) {
				var cat = result.category.cid1[i];
				if(classid == cat.Classification) {
					window._searchPlaceholder = cat.Name;
				}
			}
		}
		if(result.category && result.category.cid2 && result.category.cid2.length > 0) {
			for(var i = 0, len = result.category.cid2.length; i < len; ++i) {
				var cat = result.category.cid2[i];
				cat2Map[cat.Classification] = cat;
				if(classid == cat.Classification) {
					window._searchPlaceholder = cat.Name;
				}
			}
		}
		result.category.cat2Map = cat2Map;
		if(result.category && result.category.catid && result.category.catid.length > 0) {
			for(var i = 0, j = 0, len = result.category.catid.length; i < len; ++i, ++j) {
				var cat = result.category.catid[i];
				catidMap[cat.Classification] = cat;
				if(cat.Field !== 'catid') continue;
				var cat2 = cat2Map[cat.FClassification],
					name = cat.Name;
				if(cat2) {
					name = cat2.Name + '/' + name;
					if(!cat2.childs) {
						cat2.childs = [];
					}
					cat2.childs.push(cat);
				}
				list.push({
					'Classification': cat.Classification,
					'Count': cat.Count,
					'FClassification': cat.FClassification,
					'Field': cat.Field,
					'Name': name,
					'check': '0'
				});
				if(classid == cat.Classification) {
					window._searchPlaceholder = cat.Name;
				}
			}
		}
		result.category.catid = list;
		result.category.catidMap = catidMap;
		if(classType && window._searchPlaceholder) {
			$('#keyWord').attr('placeholder', '‘' + window._searchPlaceholder + '‘分类');
		}
		return result.category;
	}

	function getCategoryName(cidstr, id) {
		var category = result.category[cidstr];
		if(category) {
			for(var i = 0, len = category.length; i < len; ++i) {
				var cat = category[i];
				if(cat.Classification == id) {
					var names = cat.Name.split('/');
					return [names[0], cat.Name];
				}
			}
		}
		return [];
	}

	function initActInfoPre() {
		activeInfo = window._actInfo;
		if(!activeInfo || activeInfo.length == 0) return;
		for(var i = 0, len = activeInfo.length; i < len; ++i) {
			var info = activeInfo[i],
				actids = info.actid.split('|');
			info.actMark = parseInt(actids[0], 10);
			info.beginTime = info.stime ? Date.parse(info.stime) : 0;
			info.endTime = info.etime ? Date.parse(info.etime) : 0;
			info.cid2s = info.cid2s ? info.cid2s.split('|') : [];
			info.catids = info.catids ? info.catids.split('|') : [];
			info.qt = parseInt(info.qt || '1', 10);
			if(i < 7) {
				info.rd = '0-3-' + (i * 2 + 9);
				info.crd = '0-3-' + (i * 2 + 10);
				info.mrd = '0-9-' + (i * 2 + 39);
				info.mcrd = '0-9-' + (i * 2 + 40);
			} else {
				info.rd = '0-3-23';
				info.crd = '0-3-24';
				info.mrd = '0-9-53';
				info.mcrd = '0-9-54';
			}
			for(var j = 0, jlen = actids.length; j < jlen; ++j) {
				activeInfoMap[actids[j]] = info.actMark;
			}
		}
		initActInfo();
	}

	function initActInfo() {
		var json = window._searchData,
			now = (new Date()).getTime(),
			hcid2s = [],
			hcid3s = [],
			inActList = [];
		if(json && json.searchm && json.searchm.Head.Query) {
			json.searchm.Head.Query.HcCid2s && (hcid2s = json.searchm.Head.Query.HcCid2s.split(';'));
			json.searchm.Head.Query.HcCid3s && (hcid3s = json.searchm.Head.Query.HcCid3s.split(';'));
		}
		for(var i = 0, len = activeInfo.length; i < len; ++i) {
			var info = activeInfo[i],
				hasin = false;
			if((now >= info.beginTime) && (info.endTime == 0 || now <= info.endTime)) {
				if(info.cid2s.length > 0 && hcid2s.length > 0) {
					for(var j = 0, jlen = hcid2s.length; j < jlen && j < 2; ++j) {
						var hcid = hcid2s[j];
						if(!hcid) continue;
						if(~info.cid2s.indexOf(hcid)) {
							actInfoMap[info.actMark] = {
								inAct: true,
								actCheck: searchCom.FILTER_DEFVAL.id,
								actMark: info.actMark,
								actid: info.actid,
								actname: info.actname,
								logo1: info.logo1,
								logo2: info.logo2,
								rd: info.rd,
								crd: info.crd,
								mrd: info.mrd,
								mcrd: info.mcrd,
								qt: info.qt
							};
							inActList.push(actInfoMap[info.actMark]);
							hasin = true;
							break;
						}
					}
				}
				if(hasin) continue;
				if(info.catids.length > 0 && hcid3s.length > 0) {
					for(var j = 0, jlen = hcid3s.length; j < jlen && j < 2; ++j) {
						var hcid = hcid3s[j];
						if(!hcid) continue;
						if(~info.catids.indexOf(hcid)) {
							actInfoMap[info.actMark] = {
								inAct: true,
								actCheck: searchCom.FILTER_DEFVAL.id,
								actMark: info.actMark,
								actid: info.actid,
								actname: info.actname,
								logo1: info.logo1,
								logo2: info.logo2,
								rd: info.rd,
								crd: info.crd,
								mrd: info.mrd,
								mcrd: info.mcrd,
								qt: info.qt
							};
							inActList.push(actInfoMap[info.actMark]);
							hasin = true;
							break;
						}
					}
				}
				if(hasin) continue;
				if(info.cid2s.length == 0 && info.catids.length == 0) {
					actInfoMap[info.actMark] = {
						inAct: true,
						actCheck: searchCom.FILTER_DEFVAL.id,
						actMark: info.actMark,
						actid: info.actid,
						actname: info.actname,
						logo1: info.logo1,
						logo2: info.logo2,
						rd: info.rd,
						crd: info.crd,
						mrd: info.mrd,
						mcrd: info.mcrd,
						qt: info.qt
					};
					inActList.push(actInfoMap[info.actMark]);
				}
			}
		}
		if(inActList.length > 0) {
			inActList = inActList.sort(function(a, b) {
				return b.qt - a.qt;
			});
			filter.actInfo = inActList[0];
			filter.actInfo.inActTime = true;
		}
	}

	function initFilter() {
		var searchm = window._searchData.searchm;
		if(result.attrs.exp_size) {
			exExcludeAttr.push('尺码');
			exExcludeAttr.push('尺寸');
		}
		filter.extAttr.extLen = 0;
		['exp_color', 'exp_size'].forEach(function(dtype) {
			var ek = getExpressionKey(dtype);
			var name = dtype === 'exp_color' ? '颜色' : '尺寸';
			if(result.attrs[dtype] && result.attrs[dtype].value && result.attrs[dtype].value.length) {
				var attr = getSelectExtAttr(dtype);
				if(!attr) {
					filter.extAttr.push({
						id: searchCom.FILTER_DEFVAL.mulId,
						tid: dtype,
						name: name,
						value: searchCom.FILTER_DEFVAL.mulName,
						order: result.attrs[dtype].sortorder - (ek.length > 0 ? 100 : 0)
					});
				}
				if(typeof result.attrs[dtype].value === 'string') {
					result.attrs[dtype] = util.htmlDecode(result.attrs[dtype].value).replace(/;$/, '').split(';');
				}
				filter.extAttr.extLen++;
				features.indexOf(FEATURES.FILTER_OUTER_ATTRS) != -1 && (result.attrs[dtype].update = true);
			} else if(ek.length) {
				filter.extAttr.push({
					id: searchCom.FILTER_DEFVAL.mulId,
					tid: dtype,
					name: name,
					value: searchCom.FILTER_DEFVAL.mulName,
					order: 0
				});
				result.attrs[dtype] = ek;
				filter.extAttr.extLen++;
				features.indexOf(FEATURES.FILTER_OUTER_ATTRS) != -1 && (result.attrs[dtype].update = true);
			}
		});
		var filtType = searchm.Head.Query.FiltType;
		hasMulSelVals.selAttrs = [];
		if(filtType && filtType.length > 0) {
			var ftMap = {};
			for(var i = 0, len = filtType.length; i < len; ++i) {
				var fty = filtType[i];
				if(fty.name == 'col_type') {
					if(searchm.Head.Query.isRequery != '1') {
						markFilterSelCou('1', filter.dSideId, searchCom.FILTER_DEFVAL.id);
						filter.dSideId = '1';
					}
				} else if(fty.name == 'expand_name') {
					var cds = fty.condition.split('^^');
					for(var j = 0, jlen = cds.length; j < jlen; ++j) {
						var cdvs = cds[j].split('::'),
							childs = cdvs[0].split('||'),
							pre = cdvs[1].split('-');
						if(ftMap[pre[0]]) {
							for(var j = 0, jlen = hasMulSelVals.selAttrs.length; j < jlen; ++j) {
								var tempAttr = hasMulSelVals.selAttrs[j];
								if(tempAttr.id == pre[0]) {
									for(var k = 0, klen = childs.length; k < klen; ++k) {
										if(!~tempAttr.childs.indexOf(childs[k])) {
											tempAttr.childs.push(childs[k]);
										}
									}
								}
							}
							continue;
						}
						hasMulSelVals.selAttrs.push({
							sort: j,
							id: pre[0],
							name: pre.slice(1).join(''),
							childs: childs,
							flag: false
						});
						ftMap[pre[0]] = true;
					}
					break;
				}
			}
		}
		if(result.attrs.common) {
			var commonSel = [];
			for(var i = 0, j = 0, len = result.attrs.common.length; i < len && j < dataSizes.extAttrs; ++i) {
				var com = result.attrs.common[i];
				if($.inArray(com.expandsortname, exExcludeAttr) >= 0) {
					continue;
				}
				if(typeof com.valueid == 'string') {
					com.valueid = util.htmlDecode(com.valueid).replace(/;$/, '').split(';');
					com.valuename = util.htmlDecode(com.valuename).replace(/;$/, '').split(';');
				}
				features.indexOf(FEATURES.FILTER_OUTER_ATTRS) != -1 && (com.update = true);
				var inExpns = false;
				for(var k = 0, klen = hasMulSelVals.selAttrs.length; k < klen; ++k) {
					var exp = hasMulSelVals.selAttrs[k];
					if(exp.id == com.expandsortid) {
						com.sortorder = com.sortorder - 100;
						exp.sort = com.sortorder;
						exp.flag = true;
						inExpns = true;
						break;
					}
				}
				if(inExpns) {
					commonSel.push(com);
					result.attrs.common[i] = null;
					continue;
				}
				var attr = getSelectExtAttr(com.expandsortid);
				if(!attr) {
					filter.extAttr.push({
						id: searchCom.FILTER_DEFVAL.mulId,
						tid: com.expandsortid,
						name: com.expandsortname,
						value: searchCom.FILTER_DEFVAL.mulName,
						order: com.sortorder
					});
				}
				j++;
			}
			result.attrs.common = result.attrs.common.filter(function(a) {
				return a;
			});
			for(var j = hasMulSelVals.selAttrs.length - 1; j >= 0; --j) {
				var exobj = hasMulSelVals.selAttrs[j],
					ids = [],
					vals = [];
				filter.extAttr.splice(filter.extAttr.extLen, 0, {
					id: searchCom.FILTER_DEFVAL.mulId,
					tid: exobj.id,
					name: exobj.name,
					value: searchCom.FILTER_DEFVAL.mulName,
					order: exobj.sort
				});
				if(exobj.flag && features.indexOf(FEATURES.FILTER_OUTER_ATTRS) != -1) {
					for(var i = 0, len = commonSel.length; i < len; i++) {
						if(exobj.id == commonSel[i].expandsortid) {
							result.attrs.common.unshift(commonSel[i]);
							break;
						}
					}
				} else {
					for(var i = 0, len = exobj.childs.length; i < len; ++i) {
						var chs = exobj.childs[i].split('-');
						ids.push(chs[0]);
						vals.push(chs.slice(1).join('-'));
					}
					result.attrs.common.unshift({
						expandsortid: exobj.id,
						expandsortname: exobj.name,
						sortorder: exobj.sort,
						valueid: ids,
						valuename: vals
					});
				}
			}
		}
		if(result.attrs.brand && result.attrs.brand.id) {
			if(typeof result.attrs.brand.id == 'string') {
				result.attrs.brand.id = util.htmlDecode(result.attrs.brand.id).replace(/;$/, '').split(';');
				result.attrs.brand.value = util.htmlDecode(result.attrs.brand.value).replace(/(\|=\|)$/, '').split('|=|');
				result.attrs.brand.pinyin = util.htmlDecode(result.attrs.brand.pinyin).replace(/;$/, '').split(';');
				if(features.indexOf(FEATURES.BRAND_SELECTION) != -1) {
					var expressionKey = window._searchData.searchm.Head.Query.QueryProcessor.ExpressionKey;
					if(expressionKey) {
						var mat = expressionKey.match(/brand,,([^;]*)/);
						mat = mat && mat[1];
						if(mat) {
							for(var i = 0, len = result.attrs.brand.value.length; i < len; i++) {
								if(result.attrs.brand.value[i] === mat) {
									break;
								}
							}
							if(i < len) {
								result.attrs.brand.value = result.attrs.brand.value.splice(i, 1);
								result.attrs.brand.id = result.attrs.brand.id.splice(i, 1);
								result.attrs.brand.pinyin = result.attrs.brand.pinyin.splice(i, 1);
							} else {
								result.attrs.brand.value = [mat];
								result.attrs.brand.id = [''];
								result.attrs.brand.pinyin = ['#'];
							}
						}
					}
				}
				brandObj.allBrandList = [];
				brandObj.alphabet = [];
				brandObj.alphabetizeList = [];
				for(var i = 0, len = result.attrs.brand.id.length; i < len && i < brandObj.maxSize; ++i) {
					var bid = result.attrs.brand.id[i],
						name = result.attrs.brand.value[i],
						pinyin = result.attrs.brand.pinyin[i],
						pra = {
							datamark: 'brand',
							tid: bid,
							name: name,
							extid: '',
							check: false,
							pinyin: pinyin
						};
					brandObj.allBrandList.push(pra);
					brandObj.alphabet.indexOf(pinyin) == -1 && brandObj.alphabet.push(pinyin);
				}
				brandObj.alphabet.sort().forEach(function(letter) {
					brandObj.alphabetizeList.push({
						letter: letter
					});
					brandObj.alphabetizeList = brandObj.alphabetizeList.concat(brandObj.allBrandList.filter(function(brand) {
						return brand.pinyin.toUpperCase() == letter.toUpperCase();
					}))
				});
			}
			features.indexOf(FEATURES.FILTER_OUTER_ATTRS) != -1 && (result.attrs.brand.update = true);
			filter.hasBrand = '1';
			initFilterObj.hasBrand = '1';
		} else {
			filter.hasBrand = '0';
			initFilterObj.hasBrand = '0';
		}
		if(result.category && result.category.cid2.length > 0) {
			filter.hasCategory = '1';
		} else {
			filter.hasCategory = '0';
		}
		var priceRanges = searchm.Interval_Price && searchm.Interval_Price.length ? searchm.Interval_Price : cachev1.session.getItem(keyword + '_priceRanges');
		filter.priceRanges = (priceRanges || []).filter(function(item) {
			return item && item.start && item.end && item.percent > 0;
		}).slice(0, 3);
		if(filter.priceRanges) {
			cachev1.session.setItem(keyword + '_priceRanges', filter.priceRanges, true, 600);
		}
		if(result.attrs.omsattr) {
			['package', 'publishers', 'dregion', 'media', 'packstate'].forEach(function(dtype) {
				var key = 'has' + dtype.charAt(0).toUpperCase() + dtype.substr(1);
				filter[key] = result.attrs.omsattr[dtype] && result.attrs.omsattr[dtype].value && result.attrs.omsattr[dtype].value.length ? '1' : '0';
				features.indexOf(FEATURES.FILTER_OUTER_ATTRS) != -1 && (result.attrs.omsattr[dtype].update = true);
			});
		}
		if(classType == 2) {
			filter.categorystr = '';
		}
		initFilterFormQuery();
		features.indexOf(FEATURES.NEED_INIT_SORT) != -1 && fillFixedBarSort();
		fillBarFilter();
	}

	function addendaMulSelVal(key, list) {
		var hasStr = 'has' + key.charAt(0).toUpperCase() + key.substr(1);
		filter[hasStr] && initFilterObj[hasStr] && (filter[hasStr] = initFilterObj[hasStr] = '1');
		hasMulSelVals[key] = list;
	}

	function fillBarFilter(update, tFilter) {
		var tempFilter = tFilter || filter;
		fillFixedBarService(tempFilter);
		if(features.indexOf(FEATURES.PREFER_CATEGORY_IN_FIXED_BAR) != -1) {
			fillFixedBarCategory(update, tempFilter);
		}
		var couExt = 0;
		if(!update) {
			couExt += fillBarFilterExt2(tempFilter);
		}
		if(features.indexOf(FEATURES.PREFER_PRICE_IN_QUICK_BAR) != -1 && couExt < dataSizes.barExts && tempFilter.priceShow) {
			couExt += fillBarFilterPrice2(update, tempFilter);
		}
		var sortAttrs = [];
		if(filter.hasBrand == 1) {
			sortAttrs.push({
				id: searchCom.FILTER_DEFVAL.mulId,
				tid: 'brand',
				name: '品牌',
				value: searchCom.FILTER_DEFVAL.mulName,
				order: result.attrs.brand.sortorder - (getExpressionKey('brand').length > 0 ? 100 : 0)
			});
		}
		sortAttrs = sortAttrs.concat(filter.extAttr);
		sortAttrs.sort(function(a, b) {
			return parseInt(a.order || 0) - parseInt(b.order || 0);
		});
		for(var i = 0; i < sortAttrs.length && couExt < dataSizes.barExts; i++) {
			var attr = sortAttrs[i];
			if(attr.tid === 'brand') {
				couExt += fillBarFilterBrand(update, tempFilter);
			} else if(attr.tid === 'exp_color') {
				couExt += fillBarFilterColor(update, tempFilter);
			} else if(attr.tid === 'exp_size') {
				couExt += fillBarFilterSize(update, tempFilter);
			} else {
				for(var j = 0; j < result.attrs.common.length; j++) {
					var extAttr = result.attrs.common[j];
					if(extAttr && extAttr.expandsortid == attr.tid) {
						couExt += fillBarFilterExt(extAttr, update, tempFilter);
						break;
					}
				}
			}
		}
		['publishers', 'package', 'dregion', 'media', 'packstate'].forEach(function(type) {
			if(couExt < dataSizes.barExts) {
				couExt += fillBarFilterBook(update, type, tempFilter);
			}
		});
		if(features.indexOf(FEATURES.PREFER_CATEGORY_IN_FIXED_BAR) == -1 && couExt < dataSizes.barExts) {
			couExt += fillBarFilterCategory(update, tempFilter);
		}
		if(features.indexOf(FEATURES.PREFER_PRICE_IN_QUICK_BAR) == -1 && couExt < dataSizes.barExts && tempFilter.priceShow) {
			couExt += fillBarFilterPrice(update, tempFilter);
		}
		if(couExt == 0) {
			$('#barTabMore').addClass('hide');
			$('#proFilterWrap').css('min-height', '40px');
			deps.search.mark && (deps.search.marks[3] = false);
			deps.resetSearchHeadwh();
		}
	}

	function fillFixedBarSort() {
		if(sortType) {
			var tar = $('#barTabs a[dtype="sort"]');
			$('#sortSelList li.selected').removeClass('selected');
			if(sortType === searchCom.SORT_CONSTANT.dredispriceAsc) {
				$('#sortSelList li[sort-type="price_up"]').addClass('selected');
				tar.html('<span>价格最低<i class="icon_tri"></i></span>');
			} else if(sortType === searchCom.SORT_CONSTANT.dredispriceDesc) {
				$('#sortSelList li[sort-type="price_down"]').addClass('selected');
				tar.html('<span>价格最高<i class="icon_tri"></i></span>');
			} else if(sortType === searchCom.SORT_CONSTANT.saleDesc) {
				if(features.indexOf(FEATURES.PREFER_CATEGORY_IN_FIXED_BAR) == -1) {
					tar = $('#barTabs a[dtype="sale"]');
					$('#barTabs a[dtype="sort"]').removeClass('has');
				} else {
					$('#sortSelList li[sort-type="sale"]').addClass('selected');
					tar.html('<span>销量最高<i class="icon_tri"></i></span>');
				}
			} else if(sortType === searchCom.SORT_CONSTANT.commentcountDesc) {
				$('#sortSelList li[sort-type="comment"]').addClass('selected');
				tar.html('<span>评价最多<i class="icon_tri"></i></span>');
			} else if(sortType === searchCom.SORT_CONSTANT.winsdateDesc) {
				$('#sortSelList li[sort-type="winsdate"]').addClass('selected');
				tar.html('<span>最新上架<i class="icon_tri"></i></span>');
			}
			tar.addClass('has');
		}
	}

	function fillFixedBarService(tFilter) {
		var dsides = [];
		if(tFilter.dSideId == '1') {
			dsides.push('京东物流');
		}
		if(tFilter.vipdisShow && tFilter.vipdis == '1') {
			dsides.push('京尊达');
		}
		if(tFilter.zy211Show && tFilter.zy211 == '1') {
			dsides.push('自营211');
		}
		if(tFilter.redisstore == '1') {
			dsides.push('有货优先');
		}
		if(tFilter.cashond == '1') {
			dsides.push('货到付款');
		}
		if(tFilter.gloabal == '1') {
			dsides.push('海囤全球');
		}
		if(tFilter.plusShow && tFilter.plus == '1') {
			dsides.push('PLUS专享价');
		}
		if(tFilter.promo == '1') {
			dsides.push('促销商品');
		}
		if(tFilter.artworkShow && tFilter.artwork == '1') {
			dsides.push('艺术品');
		}
		if(tFilter.pgShow && tFilter.pgitem == '1') {
			dsides.push('拼购商品');
		}
		if(tFilter.disgloabal == '1') {
			if(tFilter.areaId && tFilter.areaId.length > 0 && tFilter.areaId[0] > 100) {
				dsides.unshift('配送全球');
			} else {
				dsides.push('配送全球');
			}
		}
		if(dsides.length > 0) {
			var bardside = $('#barTabs a[dtype="dside"]');
			bardside.html('<span rd="0-24-10">' + dsides.join(',') + '<i class="icon_tri" rd="0-24-10"></i></span>');
			bardside.addClass('has');
		}
		var $service = $('#dsideSelList');
		if(!$service || !$service.length) {
			$service = $('<ul class="selection checkbox line_cols_1 hide" id="dsideSelList" mark="dside"></ul>').appendTo('#sortSubBlock');
		}
		$service.html(tpl.child_barDsideTpl(tFilter));
	}

	function fillFixedBarCategory(update, tFilter) {
		if(result.category.cid2 && result.category.cid2.length > 0) {
			var list = [],
				strs = [],
				defSel = true,
				map = result.category.cat2Map,
				cid2list = result.category.cid2;
			for(var j = 0, jlen = cid2list.length; j < jlen; ++j) {
				var cid2 = cid2list[j],
					cat = map[cid2.Classification];
				if(cat) {
					var childs = cat.childs = cat.childs || [];
					for(var i = 0, len = childs.length; i < len; ++i) {
						if(tFilter.categoryId == childs[i].Classification) {
							childs[i].check = true;
							defSel = false;
							strs.push(childs[i].Name);
						} else {
							childs[i].check = false;
						}
					}
					if(tFilter.categoryId == cat.Classification) {
						cat.check = true;
						defSel = false;
						strs.push(cat.Name);
					}
					list.push(cat);
				}
			}
			if(strs.length > 0) {
				var $barCategory = $('#barTabs a[dtype="category"]');
				$barCategory.html('<span rd="">' + strs.join(',') + '<i class="icon_tri" rd=""></i></span>');
				$barCategory.addClass('has');
			}
			var $category = $(tpl['child_barCategory2Tpl']({
				mark: 'category',
				list: list,
				def: defSel,
				ord: '',
				crd: ''
			}));
			if(update) {
				$('#sortSubBlock [mark="category"]').replaceWith($category);
			} else {
				$category.appendTo($('#sortSubBlock'));
			}
		}
	}

	function fillBarFilterBrand(update, tFilter) {
		if(tFilter.hasBrand == '1' && result.attrs.brand && result.attrs.brand.id) {
			var cou = 0,
				strs = [],
				list = [];
			for(var i = 0, len = brandObj.allBrandList.length; i < len; ++i) {
				var pra = brandObj.allBrandList[i];
				pra.check = tFilter.brand.indexOf('|' + pra.name + '|') != -1;
				if(cou < 300) {
					list.push(pra);
					if(pra.check) {
						strs.push(pra.name);
					}
				}
				cou++;
			}
			if(cou < 2 && tFilter.brand == searchCom.FILTER_DEFVAL.mulName) return 0;
			var $sortSubBlock2 = $('#sortSubBlock2');
			if(update) {
				$sortSubBlock2.find('[fmark="brand"]').replaceWith(tpl.child_barCommGridTpl({
					mark: 'brand',
					list: list,
					ord: '0-24-30',
					crd: '0-24-31'
				}));
			} else {
				var seled = strs.length > 0;
				var br = $('<li class="item J_ping' + (seled ? ' has' : '') + '" rd="0-24-28" ord="0-24-28" crd="0-24-29"><a href="javascript:"><span>' + (seled ? strs.join(',') : '品牌') + '<i></i></span></a></li>').appendTo($('#barTabs2'));
				br.attr('dtype', 'brand');
				br.attr('ind', br.index());
				br.attr({
					'report-eventlevel': 3,
					'report-eventid': "MList_SecondaryFilter",
					'report-eventparam': (br.index() + 1) + '_品牌'
				});
				$(tpl.child_barCommGridTpl({
					mark: 'brand',
					list: list,
					ord: '0-24-30',
					crd: '0-24-31'
				})).appendTo($sortSubBlock2);
			}
			return 1;
		} else {
			return 0;
		}
	}

	function fillBarFilterColor(update, tFilter) {
		if(result.attrs.exp_color && result.attrs.exp_color.length > 0) {
			var attr = getSelectExtAttr('exp_color', tFilter),
				extStrs = [],
				extList = [];
			if(attr) {
				for(var j = 0, jlen = result.attrs.exp_color.length; j < jlen; ++j) {
					var color = result.attrs.exp_color[j],
						che = attr.value.indexOf('|' + color + '|') != -1;
					extList.push({
						datamark: 'ext',
						tid: 'exp_color',
						name: color,
						extid: 'exp_color',
						check: che
					});
				}
				if(attr.value) {
					extStrs = attr.value.replace(/^\||\|$/g, '').split('|');
				}
				fillBarFilterExtTemplate(update, {
					name: '颜色',
					mark: 'exp_color',
					list: extList,
					extStrs: extStrs,
					tpl: 'barCommGridTpl'
				});
				return 1;
			} else return 0;
		} else {
			return 0;
		}
	}

	function fillBarFilterSize(update, tFilter) {
		if(result.attrs.exp_size && result.attrs.exp_size.length > 0) {
			var attr = getSelectExtAttr('exp_size', tFilter),
				extStrs = [],
				extList = [];
			if(attr) {
				for(var j = 0, jlen = result.attrs.exp_size.length; j < jlen; ++j) {
					var size = result.attrs.exp_size[j],
						che = attr.value.indexOf('|' + size + '|') != -1;
					extList.push({
						datamark: 'ext',
						tid: 'exp_size',
						name: size,
						extid: 'exp_size',
						check: che
					});
				}
				if(attr.value) {
					extStrs = attr.value.replace(/^\||\|$/g, '').split('|');
				}
				fillBarFilterExtTemplate(update, {
					name: '尺寸',
					mark: 'exp_size',
					list: extList,
					extStrs: extStrs,
					tpl: 'barCommGridTpl'
				});
				return 1;
			} else return 0;
		} else {
			return 0;
		}
	}

	function fillBarFilterExt(com, update, tFilter) {
		var extStrs = [],
			extList = [],
			attr = getSelectExtAttr(com.expandsortid, tFilter);
		if(!attr) return 0;
		for(var j = 0, jlen = com.valueid.length; j < jlen; ++j) {
			var che = attr.id.indexOf('|' + com.valueid[j] + '|') != -1;
			extList.push({
				datamark: 'ext',
				tid: com.valueid[j],
				name: com.valuename[j],
				extid: com.expandsortid,
				check: che
			});
		}
		if(attr.value) {
			extStrs = attr.value.replace(/^\||\|$/g, '').split('|');
		}
		fillBarFilterExtTemplate(update, {
			name: attr.name,
			mark: com.expandsortid,
			list: extList,
			extStrs: extStrs,
			tpl: 'barCommGridTpl'
		});
		return 1;
	}

	function fillBarFilterExt2(tFilter) {
		var cou = 0;
		if(tFilter.actInfo) {
			var ainfo = tFilter.actInfo,
				rd = ainfo.actCheck != searchCom.FILTER_DEFVAL.id ? ainfo.crd : ainfo.rd,
				ord = ainfo.rd,
				crd = ainfo.crd,
				br = $('<li class="item J_ping' + (ainfo.actCheck != searchCom.FILTER_DEFVAL.id ? ' selected' : '') + '" rd="' + rd + '" ord="' + ord + '" crd="' + crd + '"><a href="javascript:" rd="' + rd + '">' + (ainfo.logo1 ? '<i class="mod_tag"><img src="' + ainfo.logo1 + '"></i>' : ainfo.actname) + '</a></li>').appendTo($('#barTabs2'));
			br.attr('otype', 'act');
			br.attr({
				'report-eventid': "MList_Promotionday",
				'report-eventparam': ainfo.actid
			});
			cou += 1;
		}
		if(tFilter.newItemShow) {
			var rd = tFilter.newItems != searchCom.FILTER_DEFVAL.id ? '0-24-64' : '0-24-63',
				ord = '0-24-63',
				crd = '0-24-64',
				br = $('<li class="item J_ping' + (tFilter.newItems != searchCom.FILTER_DEFVAL.id ? ' selected' : '') + '" rd="' + rd + '" ord="' + ord + '" crd="' + crd + '"><a href="javascript:" rd="' + rd + '">新品</a></li>').appendTo($('#barTabs2'));
			br.attr('otype', 'newitem');
			br.attr({
				'report-eventlevel': 3,
				'report-eventid': "MList_SecondaryFilter",
				'report-eventparam': (br.index() + 1) + '_新品'
			});
			cou += 1;
		}
		return cou;
	}

	function fillBarFilterCategory(update, tFilter) {
		if(result.category.cid2 && result.category.cid2.length > 0) {
			var list = [],
				strs = [],
				defSel = true,
				map = result.category.cat2Map,
				cid2list = result.category.cid2;
			for(var j = 0, jlen = cid2list.length; j < jlen; ++j) {
				var cid2 = cid2list[j],
					cat = map[cid2.Classification];
				if(cat) {
					var childs = cat.childs;
					if(!childs) continue;
					for(var i = 0, len = childs.length; i < len; ++i) {
						if(tFilter.categoryId == childs[i].Classification) {
							childs[i].check = true;
							defSel = false;
							strs.push(childs[i].Name);
						} else {
							childs[i].check = false;
						}
					}
					list.push(cat);
				}
			}
			fillBarFilterExtTemplate(update, {
				name: '分类',
				mark: 'category',
				list: list,
				extStrs: strs,
				tpl: 'barCategoryTpl',
				def: defSel,
				hasAll: !classType
			});
			return 1;
		} else {
			return 0
		}
	}

	function fillBarFilterPrice(update, tFilter) {
		if(result.attrs.price) {
			var extStrs = [],
				extList = result.attrs.price.filter(function(item) {
					return item && item.start && item.end && item.percent > 0;
				}).slice(0, 3);
			for(var i = 0, len = extList.length; i < len; ++i) {
				if(tFilter.priceMin == extList[i].start && tFilter.priceMax == extList[i].end) {
					extList[i].check = true;
					if(parseInt(extList[i].end, 10) >= 100000) {
						extStrs.push('>&yen;' + extList[i].start);
					} else {
						extStrs.push('&yen;' + extList[i].start + '-&yen;' + extList[i].end);
					}
				} else {
					extList[i].check = false;
				}
			}
			fillBarFilterExtTemplate(update, {
				name: '价格',
				mark: 'price',
				list: extList,
				extStrs: extStrs,
				tpl: 'barPriceTpl'
			});
			return 1;
		} else {
			return 0;
		}
	}

	function fillBarFilterPrice2(update, tFilter) {
		var extStrs = [],
			extList = [],
			checked = {
				start: tFilter.priceMin,
				end: tFilter.priceMax
			};
		if(result.attrs.price) {
			extList = result.attrs.price.filter(function(item) {
				return item && item.start && item.end && item.percent > 0;
			}).slice(0, 3);
			for(var i = 0, len = extList.length; i < len; ++i) {
				if(tFilter.priceMin == extList[i].start && tFilter.priceMax == extList[i].end) {
					extList[i].check = true;
				} else {
					extList[i].check = false;
				}
			}
		}
		if(tFilter.priceMin > 0 && tFilter.priceMax == 100000000) {
			extStrs.push('>&yen;' + tFilter.priceMin);
		} else if(tFilter.priceMin == 0 && tFilter.priceMax >= 0) {
			extStrs.push('<&yen;' + tFilter.priceMax);
		} else if(tFilter.priceMin > 0 && tFilter.priceMax < 100000000) {
			extStrs.push('&yen;' + tFilter.priceMin + ' - &yen;' + tFilter.priceMax);
		}
		fillBarFilterExtTemplate(update, {
			name: '价格',
			mark: 'price',
			list: extList,
			extStrs: extStrs,
			def: checked,
			tpl: 'barPrice2Tpl'
		});
		return 1;
	}

	function fillBarFilterBook(update, dtype, tFilter) {
		if(!result.attrs.omsattr) return 0;
		var str = '',
			isArray = true;
		switch(dtype) {
			case 'publishers':
				str = '出版社';
				break;
			case 'package':
				str = '包装';
				break;
			case 'dregion':
				str = '地区';
				isArray = false;
				break;
			case 'media':
				str = '介质';
				isArray = false;
				break;
			case 'packstate':
				str = '是否套装';
				isArray = false;
				break;
		}
		if(result.attrs.omsattr[dtype]) {
			var hasLen = isArray ? result.attrs.omsattr[dtype].value.length > 0 : result.attrs.omsattr[dtype].length > 0;
			if(hasLen) {
				fillBarFilterExtTemplate(update, fillBarBookExt(dtype, str, isArray, tFilter));
				return 1;
			} else return 0;
		}
		return 0;
	}

	function fillBarFilterExtTemplate(update, ext) {
		var staind = $('#barTabs2>li[ind]').length;
		if(update) {
			var rd1 = '0-24-' + (30 + staind * 6),
				crd1 = '0-24-' + (31 + staind * 6);
			$('#sortSubBlock2 [fmark="' + ext.mark + '"]').replaceWith(tpl['child_' + ext.tpl]({
				mark: ext.mark,
				list: ext.list,
				def: ext.def,
				ord: rd1,
				crd: crd1
			}));
		} else {
			var seled = ext.extStrs.length > 0,
				rd1 = '0-24-' + (30 + staind * 6),
				crd1 = '0-24-' + (31 + staind * 6),
				rd2 = '0-24-' + (28 + staind * 6),
				crd2 = '0-24-' + (29 + staind * 6);
			var br = $('<li class="item J_ping' + (seled ? ' has' : '') + '" rd="' + rd2 + '" ord="' + rd2 + '" crd="' + crd2 + '"><a href="javascript:" rd="' + rd2 + '"><span rd="' + rd2 + '">' + (seled ? ext.extStrs.join(',') : ext.name) + '<i rd="' + rd2 + '"></i></span></a></li>').appendTo($('#barTabs2'));
			br.attr('dtype', ext.mark);
			br.attr('ind', staind);
			br.attr({
				'report-eventlevel': 3,
				'report-eventid': "MList_SecondaryFilter",
				'report-eventparam': (br.index() + 1) + '_' + ext.name
			});
			$(tpl['child_' + ext.tpl]({
				mark: ext.mark,
				list: ext.list,
				def: ext.def,
				ord: rd1,
				crd: crd1
			})).appendTo($('#sortSubBlock2'));
		}
	}

	function fillBarBookExt(mark, extname, isArray, tFilter) {
		var list = [],
			extStrs = [],
			attrs = isArray ? result.attrs.omsattr[mark].value : result.attrs.omsattr[mark];
		if(mark == 'packstate') {
			var list = [{
				datamark: 'packstate',
				tid: '-1',
				name: '全部',
				extid: '',
				check: tFilter.packstate == '-1'
			}, {
				datamark: 'packstate',
				tid: '1',
				name: '是',
				extid: '',
				check: tFilter.packstate == '1'
			}, {
				datamark: 'packstate',
				tid: '0',
				name: '否',
				extid: '',
				check: tFilter.packstate == '0'
			}];
			if(tFilter.packstate == '1') {
				extStrs.push('套装');
			} else if(tFilter.packstate == '0') {
				extStrs.push('非套装');
			}
			return {
				name: extname,
				mark: mark,
				list: list,
				extStrs: extStrs,
				tpl: 'barCommSinTpl'
			};
		} else {
			for(var i = 0, len = attrs.length; i < len; ++i) {
				var br = attrs[i],
					che = tFilter[mark].indexOf('|' + br + '|') != -1;
				list.push({
					datamark: mark,
					tid: '',
					name: br,
					extid: '',
					check: che
				});
			}
			if(tFilter[mark]) {
				extStrs = tFilter[mark].replace(/^\||\|$/g, '').split('|');
			}
			return {
				name: extname,
				mark: mark,
				list: list,
				extStrs: extStrs,
				tpl: 'barCommGridTpl'
			};
		}
	}

	function fillBarFilterCarMatch(modelid) {
		var ord = '0-24-75',
			crd = '0-24-75',
			rd = filter.carModelId == modelid ? crd : ord;
		var br = $('#barTabs2 > li[otype="car"]');
		br && br.length && br.remove();
		br = $('<li class="item' + (filter.carModelId == modelid ? ' selected' : '') + '" rd="' + rd + '" ord="' + ord + '" crd="' + crd + '"><a href="javascript:">匹配爱车</a></li>');
		br.attr({
			'otype': 'car',
			modelid: modelid
		});
		var $barItems = $('#barTabs2>li');
		if($barItems.length >= 4) {
			var $last = $barItems.last().remove();
			$('#sortSubBlock2').find('ul[fmark="' + $last.attr('dtype') + '"]').remove();
		}
		var $first = $barItems.eq(0);
		if($first.attr('otype') == 'act') {
			$first.after(br);
		} else {
			$first.before(br);
		}
	}

	function fillBarFilterCarinfo(update) {
		var strs = carInfo.cname || '',
			seled = !!carInfo.cname,
			barTlis = $('#barTabs2>li'),
			br = $('<li class="item' + (seled ? ' has' : '') + '" ind="0" dtype="carinfo" rd="0-24-55" ord="0-24-55" crd="0-24-56"><a href="javascript:" rd="0-24-55"><span rd="0-24-55">' + (seled ? strs : '我的爱车') + '<i rd="0-24-55"></i></span></a></li>'),
			sub = $(tpl.child_carinfoTpl({
				mark: 'carinfo',
				code: 0,
				list: [],
				ord: '0-24-57',
				crd: '0-24-58',
				show: false
			}));
		if(update) {
			$('#barTabs2>li[dtype="carinfo"]').replaceWith(br);
			$('#sortSubBlock2 [fmark="carinfo"]').replaceWith(sub);
		} else {
			if(barTlis.length >= 4) {
				barTlis.last().remove();
				$('#sortSubBlock2>ul').last().remove();
			}
			var actDom = $('#barTabs2>li[otype]');
			if(actDom.length > 0) {
				actDom.eq(0).after(br);
			} else {
				br.prependTo($('#barTabs2'));
			}
			sub.prependTo($('#sortSubBlock2'));
		}
		if(update) {
			carInfo.cache = null;
		}
		if(carInfo.keepShow) {
			br.trigger('click');
		}
		return 1;
	}

	function getCarinfoFromMclient() {
		if(carInfo.cache != null) {
			$('#sortSubBlock2 [fmark="carinfo"]').replaceWith(tpl.child_carinfoTpl({
				mark: 'carinfo',
				code: 1,
				list: carInfo.cache,
				ord: '0-24-57',
				crd: '0-24-58',
				show: true
			}));
		} else {
			var url = isM ? '//cargw.jd.com/mClient' : '//cargw.jd.com/wxClient';
			url += '?callback=getCarinfoCb&functionId=carUserModel&body={"category3":"' + result.hcCid3 + '","operate":"1"}&clientVersion=1.6.0&t=' + Math.random();
			window.getCarinfoCb = function(json) {
				var code = 1,
					list = [],
					hasel = false;
				if(json.code == 0) {
					list = carInfo.cache = json.data;
				} else if(json.code != -2 && json.code != 107 && json.code != 4) {
					code = -1;
				}
				if(filter.carModelId != searchCom.FILTER_DEFVAL.mulId && carInfo.modelid) {
					for(var i = 0, len = list.length; i < len; ++i) {
						var it = list[i];
						if(it.model.modelId == carInfo.modelid) {
							it.selected = true;
							hasel = true;
						}
					}
				}
				if(carInfo.cname && !hasel) {
					var barcar = $('#barTabs2>li[dtype="carinfo"]');
					barcar.removeClass('has');
					barcar.find('span').text('我的爱车');
					carInfo.curdel = true;
					filter.carModelId = searchCom.FILTER_DEFVAL.mulId;
					cachev1.session.removeItem(carInfo.seKey);
				}
				$('#sortSubBlock2 [fmark="carinfo"]').replaceWith(tpl.child_carinfoTpl({
					mark: 'carinfo',
					code: code,
					list: list,
					ord: '0-24-57',
					crd: '0-24-58',
					show: true
				}));
				if(carInfo.first) {
					var subdom = $('#sortSubBlock2');
					var source = isM ? 'msearch' : 'wxsearch';
					subdom.on('click', '[fmark="carinfo"] li.datalist_add', function() {
						var carobj = cachev1.session.getItem(carInfo.seKey) || {};
						carobj.keepShow = true;
						cachev1.session.setItem(carInfo.seKey, carobj);
						var link = '//car.m.jd.com/list.html?source=' + source;
						if(json.code == 107 || json.code == 4) {
							if(isM) {
								login.login({
									rurl: location.href
								});
							} else {
								location.href = '//wq.jd.com/pinbind/pintokenredirect?biz=car&url=' + encodeURIComponent(link);
							}
						} else {
							location.href = link;
						}
					});
					subdom.on('click', '[fmark="carinfo"] a.item_options_lnk', function() {
						var carobj = cachev1.session.getItem(carInfo.seKey) || {};
						carobj.keepShow = true;
						cachev1.session.setItem(carInfo.seKey, carobj);
						location.href = '//car.m.jd.com/h5/carManageForApp.html?source=' + source;
					});
					subdom.on('click', '[fmark="carinfo"] div.item_options_reload', function() {
						getCarinfoFromMclient();
					});
					subdom.on('click', '[fmark="carinfo"] li[cmodelid]', function() {
						var tar = $(this),
							seled = tar.hasClass('selected'),
							modelid = tar.attr('modelid'),
							cmodelid = tar.attr('cmodelid');
						tar.siblings('.selected').removeClass('selected');
						tar.addClass('selected');
						if(seled) {
							filter.carModelId = searchCom.FILTER_DEFVAL.mulId;
							tar.removeClass('selected');
							cachev1.session.removeItem(carInfo.seKey);
						} else {
							var cname = tar.children('.datalist_name').text();
							filter.carModelId = modelid;
							cachev1.session.setItem(carInfo.seKey, {
								modelid: modelid,
								cname: cname,
								pmodelid: carInfo.modelid,
								pcname: carInfo.cname
							});
						}
						deps.searchByFilter(false, 2);
					});
					carInfo.first = false;
				}
				if(json.code == 0) {
					JD.report.umpBiz({
						bizid: '27',
						operation: '27',
						result: '0',
						source: '0',
						message: 'carinfo api success'
					});
				} else {
					JD.report.umpBiz({
						bizid: '27',
						operation: '27',
						result: '1',
						source: '0',
						message: 'carinfo api failed'
					});
				}
			};
			ls.loadScript({
				url: url,
				isToken: false
			});
		}
	}

	function fillBarFilterBabyinfo(update) {
		var strs = babyInfo.cname || '',
			seled = !!babyInfo.cname,
			barTlis = $('#barTabs2>li'),
			br = $('<li class="item' + (seled ? ' has' : '') + '" ind="0" dtype="babyinfo" rd="0-24-65" ord="0-24-65" crd="0-24-66"><a href="javascript:" rd="0-24-65"><span rd="0-24-65">' + (seled ? strs : '我的宝宝') + '<i rd="0-24-65"></i></span></a></li>'),
			sub = $(tpl.child_babyinfoTpl({
				mark: 'babyinfo',
				code: 0,
				list: [],
				ord: '0-24-67',
				crd: '0-24-68',
				show: false
			}));
		if(update) {
			$('#barTabs2>li[dtype="babyinfo"]').replaceWith(br);
			$('#sortSubBlock2 [fmark="babyinfo"]').replaceWith(sub);
		} else {
			if(barTlis.length >= 4) {
				barTlis.last().remove();
				$('#sortSubBlock2>ul').last().remove();
			}
			var actDom = $('#barTabs2>li[otype]');
			if(actDom.length > 0) {
				actDom.eq(0).after(br);
			} else {
				br.prependTo($('#barTabs2'));
			}
			sub.prependTo($('#sortSubBlock2'));
		}
		if(update) {
			babyInfo.cache = null;
		}
		if(babyInfo.keepShow) {
			br.trigger('click');
		}
		return 1;
	}

	function getBabyinfoFromMclient() {
		if(babyInfo.cache != null) {
			$('#sortSubBlock2 [fmark="babyinfo"]').replaceWith(tpl.child_babyinfoTpl({
				mark: 'babyinfo',
				code: 1,
				list: babyInfo.cache,
				ord: '0-24-57',
				crd: '0-24-58',
				show: true
			}));
		} else {
			var url = '//mup.jd.com/child/queryChildProfileByPin?callback=getBabyinfoCb&origin=wq_search&originDevice=2&t=' + Math.random();
			window.getBabyinfoCb = function(json) {
				var code = 1,
					list = [],
					hasel = false;
				if(json.success == true) {
					list = babyInfo.cache = json.data;
				} else {
					code = -1;
				}
				if(filter.babySexAge != searchCom.FILTER_DEFVAL.mulId && babyInfo.sexAge) {
					for(var i = 0, len = list.length; i < len; ++i) {
						var it = list[i],
							sexage = getBabyinfoSexAge(it.sex, it.birthday);
						if(sexage == babyInfo.sexAge) {
							it.selected = true;
							hasel = true;
						}
					}
				}
				if(babyInfo.cname && !hasel) {
					var barcar = $('#barTabs2>li[dtype="babyinfo"]');
					barcar.removeClass('has');
					barcar.find('span').text('我的宝宝');
					babyInfo.curdel = true;
					filter.babySexAge = searchCom.FILTER_DEFVAL.mulId;
					cachev1.session.removeItem(babyInfo.seKey);
				}
				$('#sortSubBlock2 [fmark="babyinfo"]').replaceWith(tpl.child_babyinfoTpl({
					mark: 'babyinfo',
					code: code,
					list: list,
					ord: '0-24-67',
					crd: '0-24-68',
					show: true
				}));
				if(babyInfo.first) {
					var subdom = $('#sortSubBlock2');
					subdom.on('click', '[fmark="babyinfo"] li.datalist_add', function() {
						var babyobj = cachev1.session.getItem(babyInfo.seKey) || {},
							bcou = $(this).attr('bcou');
						babyobj.keepShow = true;
						cachev1.session.setItem(babyInfo.seKey, babyobj);
						if(bcou == 0) {
							location.href = '//h5.m.jd.com/dev/3786r4YdgZxtkrMBpcD9c2ho1kpe/index.html#/index';
						} else {
							location.href = '//h5.m.jd.com/dev/34BEqF6meYJEoSWec78jM2vUtXn9/index.html';
						}
					});
					subdom.on('click', '[fmark="babyinfo"] a.item_options_lnk', function() {
						var babyobj = cachev1.session.getItem(babyInfo.seKey) || {};
						babyobj.keepShow = true;
						cachev1.session.setItem(babyInfo.seKey, babyobj);
						location.href = '//h5.m.jd.com/dev/34BEqF6meYJEoSWec78jM2vUtXn9/index.html';
					});
					subdom.on('click', '[fmark="babyinfo"] div.item_options_reload', function() {
						getBabyinfoFromMclient();
					});
					subdom.on('click', '[fmark="babyinfo"] li[sex]', function() {
						var tar = $(this),
							seled = tar.hasClass('selected'),
							sex = tar.attr('sex'),
							birf = tar.attr('birf'),
							sexAge = getBabyinfoSexAge(sex, birf);
						tar.siblings('.selected').removeClass('selected');
						tar.addClass('selected');
						if(seled) {
							filter.babySexAge = searchCom.FILTER_DEFVAL.mulId;
							tar.removeClass('selected');
							cachev1.session.removeItem(babyInfo.seKey);
						} else {
							var cname = tar.attr('cname');
							filter.babySexAge = sexAge;
							cachev1.session.setItem(babyInfo.seKey, {
								sexAge: sexAge,
								cname: cname,
								psexAge: babyInfo.psexAge,
								pcname: babyInfo.cname
							});
						}
						deps.searchByFilter(false, 2);
					});
					babyInfo.first = false;
				}
				if(json.success == true) {
					JD.report.umpBiz({
						bizid: '27',
						operation: '28',
						result: '0',
						source: '0',
						message: 'babyinfo api success'
					});
				} else {
					JD.report.umpBiz({
						bizid: '27',
						operation: '28',
						result: '1',
						source: '0',
						message: 'babyinfo api failed'
					});
				}
			};
			ls.loadScript({
				url: url,
				isToken: false
			});
		}
	}

	function getBabyinfoSexAge(sex, birf) {
		sex = parseInt(sex, 10);
		birf = parseInt(birf, 10);
		var now = new Date(),
			birDate = new Date(),
			mon = 0;
		birDate.setTime(birf);
		var m1 = now.getFullYear() - birDate.getFullYear(),
			m2 = now.getMonth() - birDate.getMonth(),
			m3 = now.getDate() - birDate.getDate();
		if(m3 < 0) m2 -= 1;
		if(m1 > 0) {
			mon = m1 * 12 + m2;
		} else if(m1 == 0 && m2 > 0) {
			mon = m2;
		}
		return(sex == 2 ? 'w' : 'm') + '-' + mon;
	}

	function fillFilter() {
		for(var i = 0, len = mulSelKeys.length; i < len; ++i) {
			var key = mulSelKeys[i];
			genMulSelMsg(key);
		}
		for(var i = 0, len = filter.extAttr.length; i < len; ++i) {
			var ex = filter.extAttr[i];
			if(ex.value !== searchCom.FILTER_DEFVAL.mulName) {
				var exb = ex.value.replace(/^\|/, '').replace(/\|$/, '').split('|');
				ex.valueStr = exb.join('、');
				ex.valueLen = exb.length;
			} else {
				ex.valueStr = ex.value;
				ex.valueLen = 1;
			}
		}
		filter.attrs = [];
		if(filter.hasBrand == 1) {
			filter.attrs.push({
				id: searchCom.FILTER_DEFVAL.mulId,
				tid: 'brand',
				name: '品牌',
				value: searchCom.FILTER_DEFVAL.mulName,
				order: result.attrs.brand.sortorder - (getExpressionKey('brand').length > 0 ? 100 : 0)
			});
		}
		filter.attrs = filter.attrs.concat(filter.extAttr);
		filter.attrs.sort(function(a, b) {
			return parseInt(a.order || 0) - parseInt(b.order || 0);
		});
		var html = '';
		if(features.indexOf(FEATURES.FILTER_OUTER_ATTRS) != -1) {
			filter.hasPublishers == 1 && filter.attrs.push({
				id: searchCom.FILTER_DEFVAL.mulId,
				tid: 'publishers',
				name: '出版社',
				value: searchCom.FILTER_DEFVAL.mulName,
				order: 300
			});
			filter.hasPackage == 1 && filter.attrs.push({
				id: searchCom.FILTER_DEFVAL.mulId,
				tid: 'package',
				name: '包装',
				value: searchCom.FILTER_DEFVAL.mulName,
				order: 301
			});
			filter.hasMedia == 1 && filter.attrs.push({
				id: searchCom.FILTER_DEFVAL.mulId,
				tid: 'media',
				name: '介质',
				value: searchCom.FILTER_DEFVAL.mulName,
				order: 302
			});
			filter.hasDregion == 1 && filter.attrs.push({
				id: searchCom.FILTER_DEFVAL.mulId,
				tid: 'dregion',
				name: '地区',
				value: searchCom.FILTER_DEFVAL.mulName,
				order: 303
			});
			filter.hasPackstate == 1 && filter.attrs.push({
				id: searchCom.FILTER_DEFVAL.mulId,
				tid: 'packstate',
				name: '是否套装',
				value: searchCom.FILTER_DEFVAL.mulName,
				order: 304
			});
			filter.outerAttrs = genOuterItems();
			html = tpl.child_filterV2Tpl(filter);
		} else {
			html = tpl.child_filterTpl(filter);
		}
		$('#filterInner').html(html);
		dealSelTipsLength();
		$('#listmodeBtn').removeClass('hide');
		$('#cancelBtn').text('取消').addClass('hide');
		$('#filterCBtn').removeClass('hide');
		$('#filterBBtn').addClass('hide');
		$('#filterSelBlock').addClass('hide');
		$('#filterSureBtn').addClass('hide');
		$('#filterInner').removeClass('with_sub_title');
		$('#filterFinishBtn').removeClass('hide');
		filter.areaLevel = 0;
	}

	function genOuterItems() {
		var map = {};
		var ITEMS_COUNT = 9;
		filter.attrs.forEach(function(ext) {
			var list = [],
				i, len, count, check = false;
			switch(ext.tid) {
				case 'brand':
					for(i = 0, len = brandObj.allBrandList.length, count = len > ITEMS_COUNT ? ITEMS_COUNT - 1 : len; i < count; i++) {
						var brand = brandObj.allBrandList[i];
						brand.check = filter.brand.indexOf('|' + brand.name + '|') != -1;
						list.push(brand);
					}
					if(len > ITEMS_COUNT) {
						list.push({
							datamark: 'more',
							tid: 'brand',
							name: '查看全部',
							extid: '',
							check: false,
							ord: '0-9-17',
							crd: '0-9-18'
						});
					}
					map['brand'] = list;
					break;
				case 'publishers':
				case 'package':
				case 'media':
				case 'dregion':
					for(i = 0, len = result.attrs.omsattr[ext.tid].value.length, count = len > ITEMS_COUNT ? ITEMS_COUNT - 1 : len; i < count; i++) {
						var book = result.attrs.omsattr[ext.tid].value[i];
						check = filter[ext.tid].indexOf('|' + book + '|') != -1;
						list.push({
							datamark: ext.tid,
							tid: '',
							name: book,
							extid: '',
							check: check
						});
					}
					if(len > ITEMS_COUNT) {
						list.push({
							datamark: 'more',
							tid: ext.tid,
							name: '查看全部',
							extid: '',
							check: false,
							ord: '0-9-27',
							crd: '0-9-28'
						});
					}
					map[ext.tid] = list;
					break;
				case 'packstate':
					map['packstate'] = [{
						datamark: 'packstate',
						tid: '-1',
						name: '全部',
						extid: '',
						check: filter.packstate == '-1'
					}, {
						datamark: 'packstate',
						tid: '1',
						name: '是',
						extid: '',
						check: filter.packstate == '1'
					}, {
						datamark: 'packstate',
						tid: '0',
						name: '否',
						extid: '',
						check: filter.packstate == '0'
					}];
					break;
				case 'exp_color':
				case 'exp_size':
					for(i = 0, len = result.attrs[ext.tid].length, count = len > ITEMS_COUNT ? ITEMS_COUNT - 1 : len; i < count; i++) {
						var attr = result.attrs[ext.tid][i];
						check = ext.value.indexOf('|' + attr + '|') != -1;
						list.push({
							datamark: 'ext',
							tid: ext.tid,
							name: attr,
							extid: ext.tid,
							check: check
						});
					}
					if(len > ITEMS_COUNT) {
						list.push({
							datamark: 'more',
							tid: ext.tid,
							name: '查看全部',
							extid: '',
							check: false,
							ord: '0-9-27',
							crd: '0-9-28'
						});
					}
					map[ext.tid] = list;
					break;
				default:
					for(var j = 0; j < result.attrs.common.length; j++) {
						var common = result.attrs.common[j];
						if(ext.tid === common.expandsortid) {
							for(i = 0, len = common.valueid.length, count = len > ITEMS_COUNT ? ITEMS_COUNT - 1 : len; i < count; i++) {
								check = ext.id.indexOf('|' + common.valueid[i] + '|') != -1;
								list.push({
									datamark: 'ext',
									tid: common.valueid[i],
									name: common.valuename[i],
									extid: common.expandsortid,
									check: check
								});
							}
							if(len > ITEMS_COUNT) {
								list.push({
									datamark: 'more',
									tid: ext.tid,
									name: '查看全部',
									extid: '',
									check: false,
									ord: '0-9-27',
									crd: '0-9-28'
								});
							}
							map[ext.tid] = list;
							break;
						}
					}
			}
		});
		return map;
	}

	function fillOuterSelTips(mark, index) {
		var val = (typeof index === 'number' ? (filter.extAttr[index] && filter.extAttr[index]['value']) : filter[mark]) || '',
			rMark = $('#filterInner').find('[r-mark="' + mark + '"]'),
			sp = rMark.siblings('span');
		if(rMark.length > 0) {
			var vl = val.replace(/^\|/, '').replace(/\|$/, '').split('|');
			val = vl.join('、');
			rMark.html(val);
			rMark.attr('slen', vl.length);
			var mWidth = parseInt(rMark.css('maxWidth'));
			if(rMark.width() >= mWidth) {
				if(!sp || sp.length === 0) {
					sp = $('<span></span>');
					rMark.parent().append(sp);
				}
				sp.html('等' + vl.length + '个');
			} else {
				sp && sp.remove();
			}
		}
	}

	function genMulSelMsg(mark) {
		if(filter[mark] !== searchCom.FILTER_DEFVAL.mulName) {
			var sb = filter[mark];
			if(!sb) return;
			var fb = sb.replace(/^\|/, '').replace(/\|$/, '').split('|');
			filter[mark + 'Str'] = fb.join('、');
			filter[mark + 'Len'] = fb.length;
		} else {
			filter[mark + 'Str'] = filter[mark];
			filter[mark + 'Len'] = 1;
		}
	}

	function fillSelTips(mark, ext, str, title) {
		var val = filter[mark] || '',
			rMark = $('#filterSelTips');
		var sp = rMark.siblings('span');
		if(title) {
			var $title = rMark.siblings('strong');
			$title.text('已选' + (title || '') + '：');
		}
		if(str) {
			rMark.html(str);
			sp && sp.remove();
		} else {
			if(typeof ext === 'number') {
				val = (filter.extAttr[ext] && filter.extAttr[ext]['value']) || '';
			}
			if(rMark.length > 0) {
				var vl = val.replace(/^\|/, '').replace(/\|$/, '').split('|');
				val = vl.join('、');
				rMark.html(val);
				rMark.attr('slen', vl.length);
				var mWidth = wsizeInfo.width - rMark.offset().left - 50;
				if(rMark.width() >= mWidth) {
					if(!sp || sp.length === 0) {
						sp = $('<span></span>');
						rMark.parent().append(sp);
					}
					sp.html('等' + vl.length + '个');
					rMark.css('maxWidth', wsizeInfo.width - rMark.offset().left - sp.width() - 10);
				} else {
					sp && sp.remove();
				}
			}
		}
	}

	function dealSelTipsLength() {
		$('#filterInner [r-mark]').each(function(ind, item) {
			var tar = $(item),
				slen = tar.attr('slen');
			if(!slen) return;
			var bw = tar.parent().siblings('.big').width(),
				mw = wsizeInfo.width - 140 - bw;
			tar.css('max-width', mw + 'px');
			if(tar.width() >= mw) {
				var sp = tar.siblings('span');
				if(!sp || sp.length == 0) {
					sp = $('<span></span>');
					tar.parent().append(sp);
				}
				sp.html('等' + slen + '个');
			}
		});
	}

	function clearFilter() {
		var tempcm = filter.carModelId;
		filter = $.extend(true, filter, initFilterObj);
		if(tempcm != searchCom.FILTER_DEFVAL.mulId) {
			filter.carModelId = tempcm;
		}
		filter.pgShow = !!~features.indexOf(FEATURES.PINGOU_SELECTION);
		filter.priceShow = !~features.indexOf(FEATURES.PINGOU_HIDE_ATTRS);
		if(!filter.priceShow) {
			filter.pgitem = '1';
		}
		for(var i = 0, len = filter.extAttr.length; i < len; ++i) {
			filter.extAttr[i].id = searchCom.FILTER_DEFVAL.mulId;
			filter.extAttr[i].value = searchCom.FILTER_DEFVAL.mulName;
		}
		for(var key in actInfoMap) {
			var act = actInfoMap[key];
			act.actCheck = searchCom.FILTER_DEFVAL.id;
		}
		initAreas();
	}

	function clearOneFilter(tempFilter, mark) {
		var defVal = initFilterObj[mark],
			tFilter = tempFilter || filter;
		if(mark == 'dside') {
			tFilter['dside'] = initFilterObj['dside'];
			tFilter['dSideId'] = initFilterObj['dSideId'];
			tFilter['vipdis'] = initFilterObj['vipdis'];
			tFilter['zy211'] = initFilterObj['zy211'];
			tFilter['newitem'] = initFilterObj['newitem'];
			tFilter['redisstore'] = initFilterObj['redisstore'];
			tFilter['cashond'] = initFilterObj['cashond'];
			tFilter['gloabal'] = initFilterObj['gloabal'];
			tFilter['disgloabal'] = initFilterObj['disgloabal'];
			tFilter['plus'] = initFilterObj['plus'];
			tFilter['promo'] = initFilterObj['promo'];
			tFilter['artwork'] = initFilterObj['artwork'];
			if(tFilter.priceShow) {
				tFilter['pgitem'] = initFilterObj['pgitem'];
			}
		} else if(mark == 'price') {
			tFilter.price = initFilterObj.price;
			tFilter.priceMin = initFilterObj.priceMin;
			tFilter.priceMax = initFilterObj.priceMax;
		} else if(initFilterObj.hasOwnProperty(mark)) {
			tFilter[mark] = defVal;
		} else {
			for(var i = 0, len = tFilter.extAttr.length; i < len; ++i) {
				var extAttr = tFilter.extAttr[i],
					suie = extAttr.tid == mark;
				if(mark == 'exp_color' || mark == 'exp_size') {
					suie = ~extAttr.id.indexOf(mark);
				}
				if(suie) {
					extAttr.id = searchCom.FILTER_DEFVAL.mulId;
					extAttr.value = searchCom.FILTER_DEFVAL.mulName;
				}
			}
		}
	}

	function initAddress() {
		address.init({
			isNeedFixed: true,
			isSearch: true,
			overClass: 'unscrollable',
			isNeedCommon: !!isLogin,
			deep: 4,
			onClose: function() {
				fillFilter();
			},
			onFinish: function() {
				var areaInfo = address.getAddrInfo(),
					names = areaInfo.name.split('_'),
					ids = areaInfo.id.split('_');
				markFilterSelCou(filter.areaId2.join('_'), areaInfo.id, '0_0_0_0');
				filter.area = names.slice(0, 3);
				filter.area2 = names;
				filter.areaId = ids.slice(0, 3);
				filter.areaId2 = ids;
				filter.areaName = areaInfo.addrName;
				fillFilter();
			}
		});
		$('#searchAddr').on('click', '.item', function() {
			try {
				var click = new MPing.inputs.Click("MListFilter_Address");
				click.event_param = $(this).text();
				var mping = new MPing;
				mping.send(click)
			} catch(err) {
				console.warn(err)
			}
		});
	}

	function initAreas(default_addr) {
		var addr = (default_addr || '').split('|');
		address.setAddrCookies({
			ids: (addr[0] || '').split('_'),
			names: (addr[1] || '').split('_'),
			id: addr[2],
			name: addr.slice(5).join('|'),
			longitude: addr[3],
			latitude: addr[4]
		});
		var areaInfo = address.getAddrInfo(),
			jdAddrId = areaInfo.id.split('_'),
			jdAddrName = areaInfo.name.split('_');
		filter.area = jdAddrName.slice(0, 3);
		filter.area2 = jdAddrName;
		filter.areaId = jdAddrId.slice(0, 3);
		filter.areaId2 = jdAddrId;
		filter.areaName = areaInfo.addrName;
	}

	function fillCategory() {
		var list = [],
			map = result.category.cat2Map,
			cid2list = result.category.cid2,
			isall = true;
		if(!cid2list) return;
		for(var j = 0, jlen = cid2list.length; j < jlen; ++j) {
			var cid2 = cid2list[j],
				cat = map[cid2.Classification];
			if(cat) {
				cat.subname = '';
				cat.open = false;
				var childs = cat.childs;
				if(!childs) continue;
				for(var i = 0, len = childs.length; i < len; ++i) {
					if(filter.categoryId == childs[i].Classification) {
						childs[i].check = true;
						cat.subname = childs[i].Name;
						isall = false;
						cat.open = true;
					} else {
						childs[i].check = false;
					}
				}
				if(filter.categoryId == cid2.Classification) {
					cat.check = true;
					isall = false;
					cat.open = true;
				} else {
					cat.check = false;
				}
				list.push(cat);
			}
		}
		if(isall && list.length > 0) {
			list[0].open = true;
		}
		var html = tpl.child_filterCategoryTpl({
			list: list,
			hasAll: !classType,
			isAll: isall
		});
		$('#filterInner').html(html);
	}
	var brandFilterPanel = function() {
		var $filterInner = $('#filterInner'),
			$filterTabs = $('#filterTabs'),
			$filterTips = $('#filterTips'),
			$filterAlphabet = $('#filterAlphabet');
		var alphaOffsets = [];
		var scrollTimeout = null;
		var timeout = null;

		function setBrandPanel($tab) {
			var order = $tab.attr('data-order');
			$tab.addClass('active');
			$tab.siblings('[data-order]').removeClass('active');
			$filterInner.scrollTop(0);
			if(order === 'alphabet') {
				fillBrand('alphabet');
				if($filterInner.find('.check_li').length > 10) {
					$filterAlphabet.removeClass('hide');
					alphaOffsets = [];
					$filterInner.find('[letter]').each(function() {
						var $letter = $(this);
						alphaOffsets.push({
							top: $letter.offset().top,
							alpha: $letter.attr('letter')
						});
					});
				}
				$filterTips.removeClass('hide');
				scrollHandle();
			} else {
				fillBrand();
				$filterAlphabet.addClass('hide');
				$filterTips.addClass('hide');
			}
		}

		function scrollHandle() {
			if($filterTips.hasClass('hide')) return;
			clearTimeout(scrollTimeout);
			scrollTimeout = setTimeout(function() {
				var letter = updateLetterTips();
				activeAlphabet(letter);
			}, 20);
		}

		function updateLetterTips() {
			var scrollTop = $filterInner.scrollTop();
			var index = alphaOffsets.length;
			var offset = {};
			while(index--) {
				offset = alphaOffsets[index];
				if(offset.top - scrollTop < 5) {
					break;
				}
			}
			$filterTips.text(offset.alpha);
			return offset.alpha;
		}

		function activeAlphabet(letter) {
			var $alpha = $filterAlphabet.find('[data-letter=' + letter + ']');
			if($alpha.hasClass('active')) return;
			$alpha.addClass('active');
			$alpha.siblings('[data-letter]').removeClass('active');
		}

		function jumpToLetter($alpha) {
			var letter = $alpha.attr('data-letter');
			var $itemTips = $filterInner.find('[letter=' + letter + ']');
			var location = $itemTips.position().top + $filterInner.scrollTop();
			$filterInner.off('scroll', scrollHandle);
			$filterInner.scrollTop(location);
			clearTimeout(timeout);
			timeout = setTimeout(function() {
				updateLetterTips();
				activeAlphabet(letter);
				$filterInner.on('scroll', scrollHandle);
			}, 1);
		}

		function alphabetMove(evt) {
			evt.preventDefault();
			var touch = (evt.touches && evt.touches[0]) || evt;
			var $chars = $filterAlphabet.find('li');
			for(var i = 0, len = $chars.length; i < len; i++) {
				var $char = $chars.eq(i),
					top = $char.offset().top,
					height = $char.height();
				if((i === 0 && top + height >= touch.pageY) || (i === len && top <= touch.pageY) || (top <= touch.pageY && top + height >= touch.pageY)) {
					jumpToLetter($char);
					break;
				}
			}
		}

		function alphabetEnd() {
			$(document).off('touchmove', alphabetMove).off('touchend touchcancel', alphabetEnd);
		}
		return {
			show: function() {
				setBrandPanel($filterTabs.find('[data-order=alphabet]'));
				$filterInner.on('scroll', scrollHandle);
				$filterTabs.removeClass('hide');
				$filterInner.css({
					top: '90px'
				});
				$('#filterSureBtn').addClass('J_ping').attr({
					'report-eventparam': '',
					'report-eventid': 'MFilter_BrandConfirm'
				});
			},
			hide: function() {
				$filterInner.off('scroll', scrollHandle);
				$filterTabs.addClass('hide');
				$filterTips.addClass('hide');
				$filterAlphabet.addClass('hide');
				$filterInner.css({
					top: ''
				});
				setTimeout(function() {
					$('#filterSureBtn').removeClass('J_ping').removeAttr('report-eventparam report-eventid');
				}, 200);
			},
			initEvent: function() {
				$filterTabs.on('click', 'li[data-order]', function() {
					var $self = $(this);
					if($self.hasClass('active')) return;
					setBrandPanel($self);
				});
				$filterAlphabet.on('touchstart', 'li', function() {
					jumpToLetter($(this));
					$(document).on('touchmove', alphabetMove).on('touchend touchcancel', alphabetEnd);
				});
			}
		};
	}();

	function fillBrand(type) {
		var hasSels = [];
		for(var i = 0, len = brandObj.allBrandList.length; i < len; ++i) {
			var br = brandObj.allBrandList[i];
			br.check = filter.brand.indexOf('|' + br.name + '|') != -1;
			if(br.check) {
				hasSels.push(br);
			}
		}
		var ord = '0-12-2',
			crd = '0-12-3';
		var brandList = brandObj.allBrandList;
		if(type === 'alphabet') {
			brandList = brandObj.alphabetizeList;
			var alphabetItemsHtml = brandObj.alphabet.map(function(letter) {
				return '<li data-letter="' + letter + '"><i>' + letter + '</i></li>';
			}).join('');
			$('#filterAlphabet').html('<ul>' + alphabetItemsHtml + '</ul>');
			ord = '0-12-6';
			crd = '0-12-7';
		}
		$('#filterInner').html(tpl.child_brandTpl({
			allBrandList: brandList,
			ord: ord,
			crd: crd
		}));
	}

	function fillExt(dataFilter, tar) {
		var list = [];
		if(dataFilter == 'exp_color') {
			var attr = getSelectExtAttr('exp_color');
			if(attr) {
				for(var j = 0, jlen = result.attrs.exp_color.length; j < jlen; ++j) {
					var color = result.attrs.exp_color[j],
						che = attr.value.indexOf('|' + color + '|') != -1;
					list.push({
						datamark: 'ext',
						tid: 'exp_color',
						name: color,
						extid: 'exp_color',
						check: che
					});
				}
			}
		} else if(dataFilter == 'exp_size') {
			var attr = getSelectExtAttr('exp_size');
			if(attr) {
				for(var j = 0, jlen = result.attrs.exp_size.length; j < jlen; ++j) {
					var size = result.attrs.exp_size[j],
						che = attr.value.indexOf('|' + size + '|') != -1;
					list.push({
						datamark: 'ext',
						tid: 'exp_size',
						name: size,
						extid: 'exp_size',
						check: che
					});
				}
			}
		} else if(result.attrs.common && result.attrs.common.length > 0) {
			for(var i = 0, len = result.attrs.common.length; i < len; ++i) {
				var com = result.attrs.common[i];
				if(com.expandsortid == dataFilter) {
					var attr = getSelectExtAttr(com.expandsortid);
					if(!attr) continue;
					for(var j = 0, jlen = com.valueid.length; j < jlen; ++j) {
						var che = attr.id.indexOf('|' + com.valueid[j] + '|') != -1;
						list.push({
							datamark: 'ext',
							tid: com.valueid[j],
							name: com.valuename[j],
							extid: com.expandsortid,
							check: che
						});
					}
					break;
				}
			}
		}
		var html = tpl.child_filterExtTpl({
			list: list,
			rd: '0-13-2',
			crd: '0-13-3',
			mul: true
		});
		$('#filterInner').html(html);
		for(var i = 0, len = filter.extAttr.length; i < len; ++i) {
			var ex = filter.extAttr[i];
			if(ex.tid == dataFilter) {
				window.setTimeout(function() {
					fillSelTips(dataFilter, i, null, tar.find('.big').text());
				}, 0);
				break;
			}
		}
	}

	function fillPublishers() {
		var list = [];
		for(var i = 0, len = result.attrs.omsattr.publishers.value.length; i < len; ++i) {
			var br = result.attrs.omsattr.publishers.value[i],
				che = filter.publishers.indexOf('|' + br + '|') != -1;
			list.push({
				datamark: 'publishers',
				tid: '',
				name: br,
				extid: '',
				check: che
			});
		}
		$('#filterInner').html(tpl.child_filterExtTpl({
			list: list,
			rd: '0-13-2',
			crd: '0-13-3',
			mul: true
		}));
	}

	function fillPackage() {
		var list = [];
		for(var i = 0, len = result.attrs.omsattr.package.value.length; i < len; ++i) {
			var br = result.attrs.omsattr.package.value[i],
				che = filter.package.indexOf('|' + br + '|') != -1;
			list.push({
				datamark: 'package',
				tid: '',
				name: br,
				extid: '',
				check: che
			});
		}
		$('#filterInner').html(tpl.child_filterExtTpl({
			list: list,
			rd: '0-13-2',
			crd: '0-13-3',
			mul: true
		}));
	}

	function fillMedia() {
		var list = [];
		for(var i = 0, len = result.attrs.omsattr.media.length; i < len; ++i) {
			var br = result.attrs.omsattr.media[i],
				che = filter.media.indexOf('|' + br + '|') != -1;
			list.push({
				datamark: 'media',
				tid: '',
				name: br,
				extid: '',
				check: che
			});
		}
		$('#filterInner').html(tpl.child_filterExtTpl({
			list: list,
			rd: '0-13-2',
			crd: '0-13-3',
			mul: true
		}));
	}

	function fillDregion() {
		var list = [];
		for(var i = 0, len = result.attrs.omsattr.dregion.length; i < len; ++i) {
			var br = result.attrs.omsattr.dregion[i],
				che = filter.dregion.indexOf('|' + br + '|') != -1;
			list.push({
				datamark: 'dregion',
				tid: '',
				name: br,
				extid: '',
				check: che
			});
		}
		$('#filterInner').html(tpl.child_filterExtTpl({
			list: list,
			rd: '0-13-2',
			crd: '0-13-3',
			mul: true
		}));
	}

	function fillPackstate() {
		var list = [{
			datamark: 'packstate',
			tid: '-1',
			name: '全部',
			extid: '',
			check: filter.packstate == '-1'
		}, {
			datamark: 'packstate',
			tid: '1',
			name: '是',
			extid: '',
			check: filter.packstate == '1'
		}, {
			datamark: 'packstate',
			tid: '0',
			name: '否',
			extid: '',
			check: filter.packstate == '0'
		}];
		$('#filterInner').html(tpl.child_filterExtSinTpl({
			list: list
		}));
	}

	function getSelectExtAttr(tid, tFilter) {
		var tempFilter = tFilter || filter;
		for(var i = 0, len = tempFilter.extAttr.length; i < len; ++i) {
			var attr = tempFilter.extAttr[i];
			if(attr.tid === tid) {
				return attr;
			}
		}
		return null;
	}

	function markMultiSelect(tFilter) {
		for(var i = 0, len = mulSelKeys.length; i < len; ++i) {
			var ft = tFilter[mulSelKeys[i]];
			if(!ft) continue;
			var bs = ft.replace(/^\|/, '').replace(/\|$/, '').split('|');
			if(bs.length > 1) {
				tFilter.multiSelect = true;
				return;
			}
		}
		for(var i = 0, len = tFilter.extAttr.length; i < len; ++i) {
			var attr = tFilter.extAttr[i];
			if(attr.id === searchCom.FILTER_DEFVAL.mulId) continue;
			if(attr.tid === 'exp_color' || attr.tid === 'exp_size') {
				bs = attr.value.replace(/^\|/, '').replace(/\|$/, '').split('|');
				if(bs.length > 1) {
					tFilter.multiSelect = true;
					return;
				}
			}
		}
		tFilter.multiSelect = false;
	}

	function getExpressionKey(key) {
		var exk = decodeURIComponent(util.getQuery('expression_key') || ''),
			query = features.indexOf(FEATURES.BRAND_SELECTION) != -1 ? (window._searchData.searchm.Head.Query.QueryProcessor.ExpressionKey || '') : '',
			msel = util.getQuery('multi_select');
		if(!exk && !query) return [];
		var mat = '',
			vals = [];
		if(msel == 'yes') {
			var rex = new RegExp('\\[[\\(\\|]\\]' + key + ',,([^\\[]*)', 'g');
			while((mat = rex.exec(exk))) {
				vals.push(mat[1]);
			}
		} else {
			var rex = new RegExp(key + ',,([^;]*)');
			mat = exk.match(rex);
			mat && vals.push(mat[1]);
		}
		if(features.indexOf(FEATURES.BRAND_SELECTION) != -1) {
			if(key === 'brand' && !mat) {
				mat = query.match(/brand,,([^;]*)/);
				mat && vals.push(mat[1]);
			}
		}
		return vals;
	}

	function getFiltType(key) {
		var exk = decodeURIComponent(util.getQuery('filt_type') || '');
		if(key == 'redisstore') {
			var rex = new RegExp(key + ',(\\d+)'),
				mat = exk.match(rex);
			return mat ? mat[1] : '';
		} else if(key == 'expand_name') {
			var rex = new RegExp(key + ',([^\\;]*)'),
				mat = exk.match(rex),
				map = {};
			if(mat) {
				var str = mat[1],
					rex1 = new RegExp('([^\\:\\@\\^]*)(?:\\:\\:|\\@\\@)([^\\^;]*)', 'g'),
					mat1 = '';
				while((mat1 = rex1.exec(str))) {
					map[mat1[2]] = mat1[1].split('||');
				}
			}
			return map;
		} else if(key == 'delivertime') {
			var rex = new RegExp(key + ',(\\d+)'),
				mat = exk.match(rex);
			return mat ? [mat[1], mat[1]] : [];
		} else if(key == 'product_ext' || key == 'productext2') {
			var rex = new RegExp(key + ',([^;]*)'),
				mat = exk.match(rex),
				res = [];
			if(mat && mat[1]) {
				var strs = mat[1].split('||');
				for(var j = 0, jlen = strs.length; j < jlen; ++j) {
					var str = strs[j],
						mat2 = str.match(/b(\d+)v(\d+)/i);
					if(mat2) {
						res.push([mat2[1], mat2[2]]);
					}
				}
			}
			return res;
		} else if(key == 'promotion_type' || key == 'promotion_address') {
			var rex = new RegExp(key + ',([^;]*)'),
				mat = exk.match(rex);
			return mat ? mat[1] : '';
		} else if(key == 'ico') {
			var rex = new RegExp(key + ',([^;]*)'),
				mat = exk.match(rex),
				res = [];
			if(mat && mat[1]) {
				var strs = mat[1].split('||');
				for(var j = 0, jlen = strs.length; j < jlen; ++j) {
					var str = strs[j],
						mat2 = str.match(/L(\d+)M(\d+)/i);
					if(mat2) {
						res.push([mat2[1], mat2[2]]);
					}
				}
			}
			return res;
		} else if(key == 'car_model_id') {
			var rex = new RegExp(key + ',([^;]*)'),
				mat = exk.match(rex);
			return mat ? mat[1] : '';
		} else {
			var rex = new RegExp(key + ',L(\\d+)M(\\d+)'),
				mat = exk.match(rex);
			return mat ? [mat[1], mat[2]] : [];
		}
	}

	function initCarhkeeper() {
		if(!carInfo.show) return;
		if(isM) {
			showCarhkeeper();
		} else {
			tokenRedirect('car', showCarhkeeper, showCarhkeeper);
		}

		function showCarhkeeper() {
			fillBarFilterCarinfo();
			window.wa && window.wa('ptagExposure', {
				ptag: '37024.15.1'
			});
		}
	}

	function initBabykeeper() {
		if(!babyInfo.show) return;
		tokenRedirect('car', function() {
			fillBarFilterBabyinfo();
			window.wa && window.wa('ptagExposure', {
				ptag: '37024.15.2'
			});
		});
	}

	function tokenRedirect(biz, success, error) {
		if(!isLogin) {
			error && error();
			return;
		}
		var url = '//wq.jd.com/pinbind/TokenRedirectCb?callback=wqauthInfoTokenReCb&biz=' + biz;
		window.wqauthInfoTokenReCb = function(json) {
			if(json.retcode == 0) {
				success && success();
				JD.report.umpBiz({
					bizid: '27',
					operation: '26',
					result: '0',
					source: '0',
					message: 'wq_auth_token api success'
				});
			} else {
				error && error();
				JD.report.umpBiz({
					bizid: '27',
					operation: '26',
					result: '1',
					source: '0',
					message: 'wq_auth_token api failed'
				});
			}
		};
		ls.loadScript({
			url: url,
			isToken: false
		});
	}

	function compareFilter() {
		var fil = cachev1.local.getItem('lastFilter');
		if(fil && fil === JSON.stringify(filter)) {
			return 0;
		}
		return 1;
	}

	function getReportSearchAttr() {
		var pas = [];
		if(filter.brand !== searchCom.FILTER_DEFVAL.mulName) {
			var bs = filter.brand.replace(/^\|/, '').replace(/\|$/, '').split('|');
			pas.push(bs.map(function(a) {
				return encodeURIComponent('品牌') + '::' + encodeURIComponent(a);
			}).join(','));
		}
		if(filter.priceMin !== '-1' && filter.priceMax !== '-1') {
			pas.push(encodeURIComponent('价格') + '::' + filter.priceMin + '-' + filter.priceMax);
		}
		for(var k = 0, flen = filter.extAttr.length; k < flen; ++k) {
			var attr = filter.extAttr[k];
			if(attr.id === searchCom.FILTER_DEFVAL.mulId) continue;
			if(attr.tid === 'exp_color') {
				if(attr.value != '全部') {
					var bs = attr.value.replace(/^\|/, '').replace(/\|$/, '').split('|');
					pas.push(bs.map(function(a) {
						return encodeURIComponent('颜色') + '::' + encodeURIComponent(a);
					}).join(','));
				}
			} else if(attr.tid === 'exp_size') {
				if(attr.value != '全部') {
					var bs = attr.value.replace(/^\|/, '').replace(/\|$/, '').split('|');
					pas.push(bs.map(function(a) {
						return encodeURIComponent('尺寸') + '::' + encodeURIComponent(a);
					}).join(','));
				}
			} else {
				var bs = attr.value.replace(/^\|/, '').replace(/\|$/, '').split('|');
				pas.push(bs.map(function(a) {
					return encodeURIComponent(attr.name) + '::' + encodeURIComponent(a);
				}).join(','));
			}
		}
		return pas.join(';');
	}

	function historyDesc() {
		var desc = [];
		if(filter.categoryId !== '0') {
			desc.push(filter.category);
		}
		if(filter.brand !== '') {
			desc.push(filter.brand);
		}
		if(filter.priceMin !== '-1') {
			desc.push('&yen;' + filter.priceMin + '-&yen;' + filter.priceMax);
		}
		if(filter.dSideId !== '0') {
			desc.push(filter.dSide);
		}
		if(filter.areaId[0] !== '0') {
			desc.push(filter.area[0]);
		}
		for(var i = 0, len = filter.extAttr.length; i < len; ++i) {
			var exta = filter.extAttr[i];
			if(exta.id !== '0') {
				desc.push(exta.value);
			}
		}
		return(desc.length > 0 ? desc.join(' / ') : '无');
	}
	module.exports = {
		init: function(data, dependence, needFeatures) {
			features = $.isArray(needFeatures) ? needFeatures : [];
			deps = $.extend(deps, dependence);
			keyword = data.keyword;
			classid = data.classid;
			classLevel = data.classLevel;
			classType = data.classType;
			sortType = data.sortType;
			if(data.filterCgiurl) {
				filterCgiurl = data.filterCgiurl;
			}
			data.umpData && (umpData = data.umpData);
			keywordCanEmpty = !!data.keywordCanEmpty;
			var searchm = window._searchData.searchm;
			result.category = searchm.ObjCollection;
			result.attrs = {
				brand: searchm.ObjB_TextCollection ? searchm.ObjB_TextCollection.brand : null,
				common: searchm.ObjExtAttrCollection,
				price: searchm.Interval_Price && searchm.Interval_Price.length > 0 ? searchm.Interval_Price : null,
				exp_size: searchm.ObjB_TextCollection && searchm.ObjB_TextCollection.exp_size && searchm.ObjB_TextCollection.exp_size.value ? searchm.ObjB_TextCollection.exp_size : null,
				exp_color: searchm.ObjB_TextCollection && searchm.ObjB_TextCollection.exp_color && searchm.ObjB_TextCollection.exp_color.value ? searchm.ObjB_TextCollection.exp_color : null,
				omsattr: searchm.ObjB_OmsAttrCollection,
				bookattr: searchm.ObjB_BookAttrCollection
			};
			var mtest = util.getQuery('mtest');
			if(mtest) {
				reqExtParams.push({
					key: 'mtest',
					val: mtest
				});
			}
			var jdMsort = util.getQuery('jd_market_sort');
			if(jdMsort) {
				reqExtParams.push({
					key: 'jd_market_sort',
					val: jdMsort
				});
			}
			var qpExclude = util.getQuery('qp_exclude');
			if(qpExclude) {
				reqExtParams.push({
					key: 'qp_exclude',
					val: qpExclude
				});
			}
			var vcategory = getFiltType('virtual_categorys');
			if(vcategory.length > 0) {
				reqExtParams.push({
					key: 'filt_type',
					val: 'virtual_categorys,L' + vcategory[0] + 'M' + vcategory[1] + ';'
				});
			}
			var snrback = cachev1.local.getItem('search_noresult_back');
			if(snrback == '1') {
				$('#sNull02').removeClass('hide');
				cachev1.local.removeItem('search_noresult_back');
				selectNoResult = 1;
			}
		},
		getFilterObject: function() {
			return filter;
		},
		initExtFilter: initExtFilter,
		initFilter: initFilter,
		bindBarFilterEvent: bindBarFilterEvent,
		bindFilterEvent: bindFilterEvent,
		bindExtraEvent: function() {
			JD.events.listen('pageshow', wkx5BackHandle);
		},
		initAddress: initAddress,
		initAreas: initAreas,
		initCategory: initCategory,
		initCarhkeeper: initCarhkeeper,
		initBabykeeper: initBabykeeper,
		showCarkeeper: function() {
			carInfo.show = true;
		},
		showBabyPlan: function() {
			babyInfo.show = true;
		},
		fillBarFilterCarMatch: fillBarFilterCarMatch,
		setFilterParams: setFilterParams,
		setFilterAdSearch: setFilterAdSearch,
		getFiltType: getFiltType,
		getReportSearchAttr: getReportSearchAttr,
		historyDesc: historyDesc,
		changeSelectMode: changeSelectMode,
		getSelectMode: function() {
			return selectMode;
		},
		initActInfoPre: initActInfoPre,
		getActMark: function(ico) {
			return activeInfoMap[ico];
		},
		getActInfo: function(mark) {
			return actInfoMap[mark];
		},
		FEATURES: FEATURES
	};
});
define('m.search', function(require, exports, module) {
	var _cacheThisModule_;
	var $ = require('zepto'),
		ls = require('loadJs'),
		util = require('util'),
		ui = require('ui'),
		speedtime = require('spdtimming.new'),
		login = require('login'),
		cachev1 = require('cachev1'),
		searchCom = require('jd.search.common'),
		searchFilter = require('jd.search.filter'),
		tpl = require('tpl_jd.searchV3'),
		loopScroll = require('loopScroll'),
		behavior = require('behavior'),
		spiderCheck = require('spiderCheck'),
		network = util.getCookie("network") || 'wifi',
		isWX = util.isWX(),
		searchUrl = '//wqsou.jd.com/search/searchn?key={#key#}',
		searchCgi = '//wqsou.jd.com/search/searchn?key={#key#}&datatype=1&callback={#callback#}&page={#page#}&pagesize={#pagesize#}&ext_attr=no&brand_col=no&price_col=no&color_col=no&size_col=no&ext_attr_sort=no&merge_sku=yes&multi_suppliers=yes',
		keyword = '',
		classid = '',
		classLevel = '',
		classType = 0,
		sortType = '',
		listMode = '0',
		hashListMode = '0',
		cidConfigs = {
			bigPicModeCids: '|1315|1316|1319|1672|1318|6144|11729|',
			findSimilarCid1s: '|1315|1318|1672|11729|',
			samShopids: '|598847|680887|',
			samCardShopids: '|141955|',
			blurCommentCid1s: [737, 655, 652, 670, 9987],
			bpmatch: false,
			lpmatch: false,
			addCarCids: [],
			pmMarkCids: [],
			ydMarkCids: [],
			rankingCids: [],
			houseCids: [],
			plModify: '',
			sTitle: false
		},
		addingCart = false,
		filterTop = 0,
		stopLoad = false,
		ssClose = false,
		hadSpReport = false,
		soldoutCheck = 0,
		isBothStockAndYuyueLoad = 0,
		selectNoResult = 0,
		loadType = network === 'wifi' ? 2 : 1,
		ssf = '',
		aas = '',
		s_proid = '',
		s_hidid = '',
		s_version = '',
		sfUrl = '',
		cacheInfo = {
			cacheKey: 'SEARCH_DATACACHE',
			isBack: false,
			data: {
				binfo: {
					keyword: '',
					page: 1,
					pageInd: 1,
					pos: 1,
					scrtop: 0,
					currentTab: ''
				},
				products: [],
				prices: [],
				comments: [],
				coupons: [],
				popfrees: [],
				promos: [],
				stocks: {},
				reservats: {},
				reservationPrice: {},
				nuprices: [],
				bookdescs: [],
				promise: [],
				panflags: [],
				articles: [],
				pgPriceList: [],
				pgInfo: [],
				shop: {
					list: [],
					skusMap: {},
					priceMap: {}
				},
				beltAdShop: {}
			}
		},
		wsizeInfo = {
			width: $(window).width(),
			height: $(window).height()
		},
		qpdisable = 'no',
		pageInfo = {
			page: 1,
			showpage: 1,
			pagesize: 10,
			totCount: 20,
			pageInd: 1,
			totPage: 1,
			reaPage: 1,
			loading: false,
			reloadCount: 0,
			totReload: 2,
			itemInd: 1,
			scrtop: 0,
			curActive: null,
			adpagesize: 1
		},
		result = {
			summary: {},
			category: {},
			hcCid1: '',
			hcCid2: '',
			hcCid3: ''
		},
		nextResultInfo = {
			nextResult: null,
			nextResultShow: false,
			nextResultFaild: false
		},
		ycInfo = {
			isYc: false,
			cid2: '',
			keys: ''
		},
		cgiMonitor = {
			searchTimer: null,
			priceTimer: null,
			summaryTimer: null,
			promoTimer: null,
			stockTimer: null,
			addCartTimer: null,
			timeout: 5000
		},
		reportInfo = {
			hasPvReport: false,
			retinaGray: false,
			retina: 'retina-0',
			abtest: '',
			isStock: false,
			isNewItem: false,
			expQuery: 0,
			requerySearch: '',
			showWordOne: '',
			mtest: '',
			pduid: '',
			pdpin: '',
			hotTagLogs: '',
			hotTagLen: 0
		},
		bookInfo = {
			cid1: '1713',
			exCid2s: ['4855', '6929'],
			firstPageBookIds: []
		},
		itemIdMap = {
			length: 0
		},
		rwItemIdMap = {},
		itemDivTpls = {
			itemSingleh: 131,
			itemDivHeight: 2640
		},
		curScrollInfo = {
			lock: false,
			top: 0,
			sh: 0
		},
		tplFn = {
			getAttrStick: getAttrStick,
			addAttrStick: addAttrStick,
			getProductAttr: getProductAttr
		},
		specialKeys = ['京东大药房', '京东安吉堂', '青岛安吉堂', '安吉堂大药房', '自营药品', '京东药房', '安吉堂药房', '安吉堂'],
		redFontRegExp = /<\/?\s*font[^>]*>/g;
	var pageScene = '';
	var adsInfo = {
		events: {
			eff: '1',
			ads: '2',
			gray: '4'
		},
		ifad: '0',
		ver: 'ad-0',
		verval: '0',
		evenid: '0'
	};
	window.shareConfig = {
		img_url: '',
		img_width: '100',
		img_height: '100',
		link: location.href,
		title: '',
		desc: ''
	};
	window._currentTab = '';
	exports.init = function() {
		window._PFM_TIMING && (window._PFM_TIMING[3] = new Date());
		reportSpeedTime();
		initParam();
		initSearchInfo();
		initDisplay();
		bindEvent();
		searchFilter.initAddress();
		reportJdClick();
		setShareConfig();
		reportOhterExposure();
		recordHistory();
		mNewUserCoupon.init();
		mHbEggs.init();
		searchCarInfo();
		!gray('SEARCH_CAR') && searchFilter.initCarhkeeper();
		mReport.expose();
	};

	function setStopLoad(mark) {
		stopLoad = mark;
	}
	exports.setStopLoad = setStopLoad;

	function initParam() {
		if(location.hash == '#filter' && history.length > 1) {
			location.hash = '';
		}
		initNetworkState();
		if(location.hostname == 'so.m.jd.com') {
			var wqsouUrl = 'wqsou.jd.com/search/searchn?key=';
			var mUrl = location.hostname + location.pathname;
			if(location.pathname === '/ware/search.action') {
				mUrl = mUrl + '?keyword=';
				pageScene = 'search';
			} else if(location.pathname === '/market/searchJDMarket.action') {
				mUrl = mUrl + '?jdSupermarket=' + util.getQuery('jdSupermarket') + '&keyword=';
				pageScene = 'supermarket';
			} else if(location.pathname === '/brand/searchBrandSale.action') {
				mUrl = mUrl + '?field=' + util.getQuery('field') + '&cid=' + util.getQuery('cid') + '&keyword=';
				pageScene = 'brandsale';
			} else if(/\/(products|category)\/\d+-\d+-\d+(-\d+)*\.html/.test(location.pathname)) {
				mUrl = mUrl + '?keyword=';
				pageScene = 'products';
			}
			searchUrl = searchUrl.replace(wqsouUrl, mUrl);
			searchCgi = searchCgi.replace(wqsouUrl, mUrl.replace(/\.(action|html)\?/, '._m2wq_list?'));
		}
		keyword = $.trim(decodeURIComponent(util.getQuery('key') || util.getQuery('keyword') || ''));
		ssf = util.getQuery('sf') || '';
		aas = util.getQuery('as') || '';
		ssClose = util.getQuery('ss_close') == '1';
		s_proid = util.getQuery('projectId') || '';
		s_hidid = util.getQuery('hiddenid') || '';
		s_version = util.getQuery('version') || '';
		sortType = util.getQuery('sort_type') || util.getHash('sortType') || '';
		qpdisable = util.getQuery('qp_disable') || 'no';
		hashListMode = util.getHash('listMode');
		resetSearchHeadwh();
		var hashKey = $.trim(decodeURIComponent(util.getHash('key') || ''));
		if(hashKey) {
			keyword = hashKey;
		}
		var filtType = util.getQuery('filt_type');
		if(filtType) {
			var mat = filtType.match(/(cid1|cid2|catid),L(\d+)M\d+/i);
			if(mat) {
				mat[1] && (classLevel = mat[1]);
				mat[2] && (classid = mat[2]);
				!keyword && (classType = 1);
			}
		}
		if(pageScene === 'products') {
			var mat = location.pathname.match(/\/\d+-(\d+)-(\d+)(-\d+)*\.html/);
			if(mat) {
				mat[1] && (classLevel = mat[1]);
				mat[2] && (classid = mat[2]);
				!keyword && (classType = 1);
			}
		}
		var keymat = keyword.match(/catid_str,,(\d+)/);
		if(keymat) {
			if(classid) {
				keyword = '';
				classType = 1;
			} else {
				classid = keymat[1];
				classType = 2;
			}
		}
		var cache = cachev1.session.getItem(cacheInfo.cacheKey);
		if(cache) {
			cacheInfo.data = cache;
			if(cacheInfo.data.binfo.keyword == keyword) {
				cacheInfo.isBack = true;
			}
			cachev1.session.removeItem(cacheInfo.cacheKey);
		}
		if(cacheInfo.isBack) {
			pageInfo.page = pageInfo.showpage = parseInt(cacheInfo.data.binfo.page, 10);
			pageInfo.pageInd = parseInt(cacheInfo.data.binfo.pageInd, 10);
			pageInfo.itemInd = parseInt(cacheInfo.data.binfo.pos, 10);
			pageInfo.scrtop = parseInt(cacheInfo.data.binfo.scrtop, 10);
		}
		sfUrl = encodeURI(searchCom.updateSfUrl());
		searchFilter.initAreas(window._searchData.default_addr);
		searchFilter.initActInfoPre();
		initCategoryConfigs();
		var sore = getLocalStorageJsonByCachev1('search_soldout_re');
		if(sore) {
			if(sore.key == keyword) {
				if(sore.val == 1) {
					soldoutCheck = 1;
				} else {
					soldoutCheck = 2;
					cachev1.local.removeItem('search_soldout_re');
				}
			} else {
				cachev1.local.removeItem('search_soldout_re');
			}
		}
		if(specialKeys.indexOf(keyword) != -1) {
			keyword = '京东大药房自营';
			searchByFilter();
		}
		var data = {
			keyword: keyword,
			classid: classid,
			classLevel: classLevel,
			classType: classType,
			sortType: sortType,
			umpData: {
				bizid: '775',
				api: '6',
				timeout: '7'
			}
		};
		var deps = {
			searchByFilter: searchByFilter,
			setBodyOverflow: setBodyOverflow,
			resetSearchHeadwh: resetSearchHeadwh,
			setStopLoad: setStopLoad,
			reporJdMul: reporJdMul,
			reportInfo: reportInfo
		};
		var features = gray('FILTER_OUTER_ATTRS') ? [searchFilter.FEATURES.FILTER_OUTER_ATTRS] : [];
		searchFilter.init(data, deps, features);
		reportParams();
		rectifyWordShow();
	}

	function reportParams() {
		if(!window._searchData) return;
		var searchm = window._searchData.searchm;
		reportInfo.pdpin = JD.cookie.get('pin') || '';
		var jdas = (JD.cookie.get('__jda') || '').split('.');
		reportInfo.pduid = jdas[1] || '';
		var headQuery = searchm.Head.Query;
		if(headQuery) {
			var eqStatus = headQuery.QueryProcessor.ExpandQueryStatus;
			if(eqStatus == 'replace') {
				reportInfo.expQuery = 1;
			} else if(eqStatus == 'suggest') {
				reportInfo.expQuery = 2;
			}
		}
		if(reportInfo.expQuery == 0) {
			if(ssf == 31) {
				reportInfo.expQuery = 4;
			} else if(ssf == 32) {
				reportInfo.expQuery = 8;
			}
		}
		reportInfo.mtest = searchm.Head.Query.Mtest || '';
	}

	function resetSearchHeadwh() {
		$('#searchHead').height($('#searchHeadFixer').height());
		filterTop = $('#proFilterWrap').position().top;
	}
	window._resetSearchHeadwh = resetSearchHeadwh;

	function initSearchInfo() {
		if(!window._searchData) {
			try {
				JD.report.umpBiz({
					bizid: '775',
					operation: '1',
					result: '1',
					source: '0',
					message: 'search api failed'
				});
			} catch(e) {}
			return;
		}
		var searchm = window._searchData.searchm;
		var umpParam = {
			bizid: '775',
			operation: '1',
			result: '0',
			source: '0',
			message: 'search api loaded'
		};
		if(window._searchRetcode != 0) {
			umpParam = {
				bizid: '775',
				operation: '1',
				result: '1',
				source: '0',
				message: 'search api failed'
			};
		} else if(!searchm || !searchm.Paragraph || searchm.Paragraph.length <= 0) {
			umpParam = {
				bizid: '775',
				operation: '2',
				result: '0',
				source: '0',
				message: 'search api empty'
			};
			searchm.Paragraph = [];
		}
		try {
			JD.report.umpBiz(umpParam);
		} catch(e) {}
		if(/^\d{5,}$/.test(keyword)) {
			initSkuSearchInfo();
		}
		result.summary = searchm.Head.Summary;
		searchFilter.initExtFilter();
		result.category = searchFilter.initCategory();
		pageInfo.pagesize = parseInt(result.summary.Page.PageSize, 10);
		pageInfo.totCount = parseInt(Math.ceil(200 / pageInfo.pagesize), 10);
		pageInfo.adpagesize = Math.ceil(pageInfo.pagesize / 10);
		var product = searchm.Paragraph,
			pidnotad = [];
		if(result.summary.ResultCount > 0) {
			setChagePicMode();
			if(cacheInfo.isBack) {
				product = cacheInfo.data.products;
				repFillProductHandle(product);
				for(var i = 0, len = product.length; i < len; ++i) {
					var prod = product[i];
					if(itemIdMap[prod.wareid]) continue;
					itemIdMap[prod.wareid] = 1;
					itemIdMap.length = itemIdMap.length + 1;
				}
				itemSimilar.show(cacheInfo.data.binfo.pos);
			} else {
				product = adposInfoHandle(window._searchData);
				reaSingleItem();
				var isRewrite = window._searchData.rewrite.isWrite != '0' || window._searchData.rewrite.isSortWrite != '0';
				for(var i = 0, len = product.length; i < len; ++i) {
					var prod = product[i];
					prod.ind = (i + 1);
					prod.page = 1;
					prod.cgind = prod.ind;
					prod.rd = prod.isAd ? '0-4-4' : '0-4-1';
					prod.ifad = adsInfo.ifad;
					prod.ver = adsInfo.verval;
					prod.eventid = adsInfo.evenid;
					prod.tline = 2;
					prod.tlineimg = 2;
					if(prod.vender_id == '117761') {
						prod.rd = '0-4-3';
					}
					if(bookInfo.cid1 == prod.cid1) {
						prod.tline = 1;
						prod.isbook = true;
						if(~bookInfo.exCid2s.indexOf(prod.cid2)) {
							prod.isoverseas = true;
						} else prod.isoverseas = false;
					}
					if((!prod.isAd && prod.Content.gaiyawarename && prod.Content.extname) || (prod.isAd && prod.ad_highlight)) {
						prod.isGaiya = true;
						prod.tline = 1;
					}
					if(cidConfigs.sTitle || (prod.Content && prod.Content.shortWarename && (prod.Content.CustomAttrList || getAttrStick(prod).length)) || (prod.isAd && prod.ad_smart_title && prod.ad_attribute)) {
						prod.tlineimg = 1;
					}
					prod.lpmark = cidConfigs.lpmatch ? '1' : '0';
					prod.longImg = prod.lpmark == '1' && listMode == '1';
					prod.csid = window._searchData.adpos.csid;
					var rObj = window._searchData.rewrite;
					prod.ssProjid = rObj.projid;
					prod.ssExpid = rObj.experimentid;
					prod.ssRuleid = rObj.ruleid;
					prod.ssSexpid = rObj.sortExpid;
					prod.ssSruleid = rObj.sortRuleid;
					if(bookInfo.cid1 == prod.cid1) {
						bookInfo.firstPageBookIds.push(prod.wareid);
					}
					if(isRewrite) {
						rwItemIdMap[prod.wareid] = true;
					}
					if(prod.isAd) {
						prod.ad_title = util.htmlEncode(prod.ad_title.replace(redFontRegExp, ''));
					} else {
						pidnotad.push(prod.wareid);
						prod.Content.warename = util.htmlEncode(prod.Content.warename.replace(redFontRegExp, ''));
					}
				}
				cacheInfo.data.products = product;
			}
			searchCom.autoLoadImage(listMode, itemDivTpls.itemSingleh, reportInfo.retinaGray, false, 'search_prolist_item', 'item_longcover');
			if(bookInfo.firstPageBookIds.length > 0 || cacheInfo.isBack) {
				reaBookDescHandle(bookInfo.firstPageBookIds);
			}
			var proids = [];
			for(var key in itemIdMap) {
				if(key != 'length') {
					proids.push(key);
				}
			}
			if(!cacheInfo.isBack) {
				handleFirstShortTitle(product);
				adInfoReport(null);
			}
			reaProductIco(product);
			resStockAndPriceHandle(product, proids, !soldoutCheck);
			reaSummaryHandle(proids, product);
			reaAddCartItem(product);
			reaReservationHandle(product, !soldoutCheck);
			reaPaimaiHandle(product);
			reaBaitiaoHandle(product);
			reaProfitBeltHandle(product);
			reaHouseHandle(product);
			$('#itemList .search_prolist_item_inner').each(function(ind, item) {
				var tar = $(item);
				tar.attr('ifad', adsInfo.ifad);
				tar.attr('ver', adsInfo.verval);
				tar.attr('eventid', adsInfo.evenid);
			});
			interlude.init(window._searchData);
			interlude.layout();
		} else {
			var jdMsort = util.getQuery('jd_market_sort');
			if(result.summary.ResultCount == 0 && jdMsort) {
				searchUrl = searchUrl.replace(/\&jd_market_sort=[^\&]*/, '');
				searchByFilter();
				return;
			}
			if(ssf == 15) {
				var needback = false,
					locUrl = location.href,
					colType = searchFilter.getFiltType('col_type'),
					gloabal = searchFilter.getFiltType('product_ext');
				if(colType.length > 0 && colType[0] == '0') {
					locUrl = locUrl.replace('col_type,L0M0;', '');
					needback = true;
				}
				if(gloabal.length > 0) {
					for(var j = 0, jlen = gloabal.length; j < jlen; ++j) {
						var pext = gloabal[j],
							pext0 = pext[0];
						if(pext0 == '11') {
							locUrl = locUrl.replace('product_ext,b11v1;', '');
							needback = true;
						}
					}
				}
				if(needback) {
					if(/filt_type=([\&\#]|$)/.test(locUrl)) {
						locUrl = locUrl.replace(/[\?\&]filt_type=/, '');
					}
					location.href = locUrl;
					return;
				}
			}
		}
		lessOrEmptyResult();
		initShopThrough();
		resetItemDivTpl();
		searchFilter.initFilter();
		var filter = searchFilter.getFilterObject();
		if(result.summary.ResultCount == 0 && filter.selectCount > 0 && /\/searchn/.test(document.referrer)) {
			cachev1.local.setItem('search_noresult_back', '1', 20);
			window.setTimeout(function() {
				history.go(-1)
			}, 0);
			return;
		}
		mAside.init(cacheInfo.isBack);
		window.wa && window.wa('jdPv', pvReportInfo());
		if(!cacheInfo.isBack) {
			reportExposure(product, window._searchData.adpos.csid, window._searchData.beltAdpos);
		}
		mReport.reportProducts(product, cacheInfo.isBack);
		cacheInfo.isBack = false;
	}

	function repFillProductHandle(product) {
		var unexpAd = cacheInfo.data.binfo.unexpAd || [];
		var df = document.createDocumentFragment();
		for(var i = 0, len = product.length; i < len; ++i) {
			var prod = product[i];
			if(prod.isAd) {
				if(unexpAd.indexOf(prod.exposal_url) == -1) {
					prod.exposal_url = '';
				}
				$(tpl.child_aditemTpl(prod)).appendTo(df);
			} else {
				$(tpl.child_itemV2Tpl.call(tplFn, prod)).appendTo(df);
			}
		}
		var $itemList = $('#itemList');
		$itemList.find('> .search_prolist_item').remove();
		$itemList.append(df);
		if(pageInfo.scrtop > 0) {
			if(pageInfo.scrtop + $(window).height() > $(document).height()) {
				window.setTimeout(function() {
					window.scrollTo(0, pageInfo.scrtop);
				}, 200);
			} else {
				window.scrollTo(0, pageInfo.scrtop);
			}
		}
		var curAct = $('div.search_prolist_item_inner[pos="' + pageInfo.itemInd + '"]');
		if(curAct.length > 0) {
			pageInfo.curActive = curAct.parent();
			pageInfo.curActive.addClass('active');
		}
	}

	function handleFirstShortTitle(pros) {
		for(var i = 0; i < pros.length; i++) {
			var p = pros[i];
			var $title = $('#link_' + p.wareid).find('.search_prolist_title');
			p.tlineimg = cidConfigs.sTitle ? 1 : 2;
			$title.attr('data-line-img', p.tlineimg);
			if(gray('LIST_OUTER_RICHATTR') && p.Content && p.Content.attr_icon_res) {
				p.richattr = p.Content.attr_icon_res.split('^').map(function(item) {
					var info = item.split(':');
					return {
						img: info[0] && info[0] != 'null' ? info[0] : '',
						value: info[1] && info[1] != 'null' ? info[1] : '',
						name: info[2] && info[2] != 'null' ? info[2] : ''
					};
				}).filter(function(item) {
					return item.value && item.name;
				}).slice(0, 3);
				if(p.richattr.length > 1) {
					var richattrHtml = p.richattr.map(function(attr) {
						return '<div class="richattr_item"><p class="richattr_value">' + attr.value + '</p><p class="richattr_name">' + attr.name + '</p></div>'
					});
					$('#price_' + p.wareid).before('<div class="search_prolist_richattr">' + richattrHtml.join('') + '</div>');
					$title.attr('data-line', 1) && (p.tline = 1)
					continue;
				}
			}
			if(p.isAd) {
				if(p.ad_attribute) {
					var attrs = p.ad_attribute.split(/[\|丨｜︱]/)
					var attrHtml = attrs.reduce(function(array, attr, index) {
						if(index > 2) return array
						array.push(' <span class="word">' + attr + '</span>')
						return array
					}, [])
					$('#price_' + p.wareid).find('.search_prolist_attr').remove()
					$('#price_' + p.wareid).before('<div class="search_prolist_attr">' + attrHtml.join(' ') + '<div>')
					p.ad_smart_title && $title.attr('data-line-img', 1) && (p.tlineimg = 1)
				}
				if(p.ad_highlight) {
					var titledom = $('#link_' + p.wareid + ' .search_prolist_title')
					$title.attr('data-line', '1') && (p.tline = 1)
					p.ad_smart_title && $title.text(p.ad_smart_title)
					var highlights = p.ad_highlight.split(/[\|丨｜︱]/)
					var highlightHtml = highlights.reduce(function(array, hl, index) {
						if(index > 2) return array
						array.push('<span>' + hl + '</span>')
						return array
					}, [])
					titledom.after('<div class="search_prolist_index">' + highlightHtml.join('') + '</div>');
				}
			} else if(p && p.Content) {
				if(p.sxzz || p.Content.CustomAttrList || getAttrStick(p).length) {
					var tagHtml = getProductAttr(p)
					$('#price_' + p.wareid).before('<div class="search_prolist_attr">' + tagHtml.join(' ') + '<div>');
					p.Content.shortWarename && $title.attr('data-line-img', 1) && (p.tlineimg = 1)
				}
				if(p.Content.gaiyawarename && p.Content.extname) {
					var titledom = $('#link_' + p.wareid + ' .search_prolist_title');
					titledom.attr('data-line', '1') && (p.tline = 1)
					titledom.text(p.Content.gaiyawarename);
					var exts = p.Content.extname.split(/[\|丨｜︱]/),
						extlen = exts.length > 3 ? 3 : exts.length,
						extHtml = [];
					for(var j = 0; j < extlen; j++) {
						extHtml.push('<span>' + exts[j] + '</span>');
					}
					titledom.after('<div class="search_prolist_index">' + extHtml.join('') + '</div>');
				}
			}
		}
	}

	function getAttrStick(product) {
		var res = []
		var map = {
			'carTag': {
				expect: '1',
				value: '原配',
				clsName: 'stick'
			},
			'isbjp': {
				expect: '1',
				value: '保健食品',
				clsName: ''
			}
		}
		for(var key in map) {
			if(map.hasOwnProperty(key)) {
				if(product[key] && product[key] == map[key].expect) {
					res.push(map[key])
				}
			}
		}
		return res
	}

	function addAttrStick(product, attrArray, intpl) {
		var stickArr = getAttrStick(product)
		var creatHtml = function(item) {
			return '<span class="word ' + item.clsName + '">' + item.value + '</span>'
		}
		stickArr.forEach(function(item) {
			if(intpl) {
				attrArray.unshift($.extend({}, item, {
					stick: true
				}))
			} else {
				attrArray.unshift(creatHtml(item))
			}
		})
	}

	function getProductAttr(product, intpl) {
		var attrInfo = []
		var creatHtml = function(name) {
			return '<span class="word">' + name + '</span>'
		}
		if(product.sxzz) {
			var sxzzTags = product.sxzz.split('^')
			if(intpl) {
				attrInfo = attrInfo.concat(sxzzTags)
			} else {
				attrInfo = attrInfo.concat(sxzzTags).map(function(item) {
					return creatHtml(item)
				})
			}
		} else if(product.Content.CustomAttrList) {
			var tags = product.Content.CustomAttrList.split('^')
			if(intpl) {
				attrInfo = attrInfo.concat(tags)
			} else {
				attrInfo = attrInfo.concat(tags.map(function(item) {
					return creatHtml(item)
				}))
			}
		}
		intpl ? this.addAttrStick(product, attrInfo, intpl) : addAttrStick(product, attrInfo, intpl)
		attrInfo.length > 3 && (attrInfo.length = 3)
		if(intpl) {
			return {
				rd: product.rd,
				attrInfo: attrInfo
			}
		} else {
			return attrInfo
		}
	}

	function resetItemDivTpl() {
		if(listMode === '1') {
			itemDivTpls.itemSingleh = Math.ceil(wsizeInfo.width / 2) + 70;
			if(itemDivTpls.itemSingleh < 230) {
				itemDivTpls.itemSingleh = 230;
			}
			itemDivTpls.itemDivHeight = loadType === 2 ? itemDivTpls.itemSingleh * pageInfo.pagesize / 2 : itemDivTpls.itemSingleh * pageInfo.pagesize / 2;
		} else {
			itemDivTpls.itemSingleh = 120;
			itemDivTpls.itemDivHeight = loadType === 2 ? itemDivTpls.itemSingleh * pageInfo.pagesize : itemDivTpls.itemSingleh * pageInfo.pagesize;
		}
	}
	var interlude = function() {
		var midAdShop = {
			isInit: false,
			add: function(adshop) {
				if(!adshop || !adshop.shop_name || !adshop.child_link || adshop.child_link.length < 3) return;
				if(midAdShop.isInit) return;
				midAdShop.isInit = true;
				adshop.child_link = adshop.child_link.filter(function(item) {
					return item.image_url && item.sku_price;
				}).map(function(item) {
					item.image_url = JD.img.getScaleImg(item.image_url, 230, 230, '!cc_230x230');
					return item;
				}).slice(0, 3);
				if(adshop.child_link.length < 3) return;
				cacheInfo.data.beltAdShop = adshop;
				var $itemList = $('#itemList');
				var $interlude = $itemList.find('> .search_interlude[after="20"]');
				if(!$interlude.length) {
					$interlude = $('<div class="search_interlude" after="20"></div>');
					$itemList.append($interlude, '<div class="search_placeholder"></div>');
				}
				$interlude.append($formatJson('beltAdShopTpl', adshop));
				if(!cacheInfo.isBack) {
					window.wa && window.wa('ptagExposure', {
						ptag: '37024.25.4',
						shopid: adshop.shop_id,
						venderid: adshop.vender_id,
						skuids: adshop.child_link.map(function(item) {
							return item.sku_id;
						}).join(',')
					});
				}
			},
			bindEvent: function() {
				var $itemList = $('#itemList');
				$itemList.on('click', '.shopbelt_shop, .shopbelt_shop2, .shopbelt_foot', function() {
					var $shop = $(this).parents('.search_shopbelt'),
						sid = $shop.attr('sid'),
						exurl = $shop.attr('exurl');
					if(!sid || !exurl) return;
					exurl && searchCom.samReport(exurl);
					cacheItems();
					window.setTimeout(function() {
						location.href = '//shop.m.jd.com/?shopId=' + sid;
					}, 200);
				});
				$itemList.on('click', '.shopbelt_skus .shop_item', function() {
					var $item = $(this),
						sku = $item.attr('sku'),
						price = $item.attr('price'),
						exurl = $item.attr('exurl');
					if(!sku) return;
					exurl && searchCom.samReport(exurl);
					var url = '//item.m.jd.com/product/' + sku + '.html?price=' + price;
					url = typeof getMItemLink === 'function' ? getMItemLink(url) : url;
					cacheItems();
					window.setTimeout(function() {
						location.href = url;
					}, 200);
				});
			}
		};
		var midTags = {
			isInit: false,
			add: function() {
				if(midTags.isInit) return;
				midTags.isInit = true;
				var searchm = window._searchData.searchm;
				var floors = searchm.ObjMidTag && searchm.ObjMidTag.length ? searchm.ObjMidTag : (searchm.ObjHotTag2 && searchm.ObjHotTag2.show_tags);
				if(floors && floors.length > 0) {
					var floor = null,
						totLen = 0,
						relogs = [];
					var $itemList = $('#itemList')
					for(var i = 0; i < floors.length; i++) {
						floor = floors[i];
						if(floor.floor_type != 1) continue;
						var pos = parseInt(floor.floor_position, 10);
						var tagList = floor.tag_list.slice(0, 8);
						if(tagList.length < 4) continue;
						if(tagList.length > 4 && tagList.length < 8) {
							tagList = tagList.slice(0, 4);
						}
						tagList.forEach(function(tag) {
							if(tag.tagvalue.indexOf('expand_name') != -1) {
								tag.tagvalue = tag.tagvalue.replace('::', '@@');
							}
							relogs.push(tag.taglog);
						});
						var $interlude = $itemList.find('> .search_interlude[after="' + pos + '"]');
						if(!$interlude.length) {
							$interlude = $('<div class="search_interlude" after="' + pos + '"></div>');
							$itemList.append($interlude, '<div class="search_placeholder"></div>');
						}
						var html = '<div class="search_keywordlist type_list">' + $formatJson('hotTagTpl', {
							list: tagList,
							title: floor.floor_name
						}) + '</div>';
						$interlude.prepend(html);
						totLen += tagList.length;
					}
					if(totLen > 0) {
						reportInfo.hotTagLen = totLen;
						reportInfo.hotTagLogs = relogs.join('_');
					}
				}
			},
			bindEvent: function() {
				var hotTagClick = false;
				$('#itemList').on('click', '.search_keywordlist a', function(e) {
					if(hotTagClick) return;
					var tar = $(this),
						mark = tar.attr('mark'),
						ttype = $.trim(tar.attr('ttype').split('|')[0]),
						locUrl = location.href;
					hotTagClick = true;
					switch(ttype) {
						case 'recall_tag':
							locUrl = searchUrl.replace('{#key#}', mark.replace('recall,,', keyword + ' '));
							break;
						case 'prd_word':
							var rex = /(cid1|cid2|catid),L(\d+)M\d+/i,
								mat = locUrl.match(rex);
							if(mat) {
								locUrl = locUrl.replace(rex, mark);
							} else {
								locUrl = searchCom.addUrlParam(locUrl, 'filt_type', mark + ';');
							}
							break;
						case 'brd_word':
							locUrl = searchCom.addUrlParam(locUrl, 'expression_key', mark + ';;');
							break;
						case 'attr_word':
							var match = locUrl.match(/expand_name,([^\;]*)/),
								attrStr = mark.replace('expand_name,', ''),
								curms = attrStr.split('::'),
								attrVal = curms[0],
								attrName = curms[1],
								str = '';
							if(match && match[1]) {
								var vals = match[1].split('^^'),
									falg = false;
								for(var j = 0, jlen = vals.length; j < jlen; ++j) {
									var temp1 = vals[j].split(~vals[j].indexOf('::') ? '::' : '@@');
									if(attrName == temp1[1]) {
										falg = true;
										str += attrVal + '||' + temp1[0] + '@@' + temp1[1];
									} else {
										str += (j > 0 ? '^^' : '') + vals[j];
									}
								}
								if(!falg) {
									str = match[1] + '^^' + attrStr;
								}
								locUrl = searchCom.addUrlParam(locUrl.replace(/expand_name,([^\;]*;?)/, ''), 'filt_type', 'expand_name,' + str + ';');
							} else {
								locUrl = searchCom.addUrlParam(locUrl, 'filt_type', mark + ';');
							}
							break;
					}
					location.href = searchCom.addUrlParam(locUrl, 'sx', 3, '', true);
				});
			}
		};
		return {
			init: function(data) {
				data = data || {};
				var beltAdShop = data.beltAdpos && data.beltAdpos[0];
				if(cacheInfo.isBack) {
					beltAdShop = cacheInfo.data.beltAdShop;
					var unexpAd = cacheInfo.data.binfo.unexpAd || [];
					if(unexpAd.indexOf(beltAdShop.exposal_url) == -1) {
						beltAdShop.exposal_url = '';
					}
				}
				midTags.add();
				gray('BELT_AD_SHOP') && midAdShop.add(beltAdShop);
			},
			bindEvent: function() {
				midTags.bindEvent();
				gray('BELT_AD_SHOP') && midAdShop.bindEvent();
			},
			layout: function() {
				if(pageInfo.pageInd > 1) {
					$('#itemList .search_interlude, #itemList .search_placeholder').addClass('hide');
					return;
				}
				var $itemList = $('#itemList'),
					$items = $itemList.find('.search_prolist_item, .search_item_extra');
				var $interludes = $itemList.find('> .search_interlude');
				$interludes.each(function() {
					var $interlude = $(this),
						$next = $interlude.next('.search_placeholder'),
						$prev = $interlude.prev('.search_prolist_item'),
						after = $interlude.attr('after');
					if(!$next.length) {
						$next = $('<div class="search_placeholder"></div>');
					}
					if($prev.get(0) != $items[after - 1] && $items[after - 1]) {
						$prev = $items.eq(after - 1);
						$prev.after($interlude, $next);
					}
					if($prev.get(0) == $items[after - 1] && $items[after - 1]) {
						$interlude.removeClass('hide');
					} else {
						$interlude.addClass('hide');
					}
				});
				searchCom.autoLoadImage(listMode, itemDivTpls.itemSingleh, reportInfo.retinaGray, false, 'search_prolist_item', 'item_longcover', true);
			}
		};
	}();

	function initDisplay() {
		if(ssClose) {
			$('#topBranner').addClass('hide');
		} else {}
		if(sortType) {
			$('#sFoundTip1').removeClass('hide');
			$('#sFoundTip2').addClass('hide');
		}
		if(sortType) {
			var tar = $('#barTabs a[dtype="sort"]');
			$('#sortSelList li.selected').removeClass('selected');
			if(sortType === searchCom.SORT_CONSTANT.dredispriceAsc) {
				$('#sortSelList li[sort-type="price_up"]').addClass('selected');
				tar.html('<span>价格最低<i class="icon_tri"></i></span>');
			} else if(sortType === searchCom.SORT_CONSTANT.dredispriceDesc) {
				$('#sortSelList li[sort-type="price_down"]').addClass('selected');
				tar.html('<span>价格最高<i class="icon_tri"></i></span>');
			} else if(sortType === searchCom.SORT_CONSTANT.saleDesc) {
				tar = $('#barTabs a[dtype="sale"]');
				$('#barTabs a[dtype="sort"]').removeClass('has');
			} else if(sortType === searchCom.SORT_CONSTANT.commentcountDesc) {
				$('#sortSelList li[sort-type="comment"]').addClass('selected');
				tar.html('<span>评价最多<i class="icon_tri"></i></span>');
			} else if(sortType === searchCom.SORT_CONSTANT.winsdateDesc) {
				$('#sortSelList li[sort-type="winsdate"]').addClass('selected');
				tar.html('<span>最新上架<i class="icon_tri"></i></span>');
			}
			tar.addClass('has');
		}
		$('#rewriteTip2').text(keyword);
		if(result.summary.Page.PageCount == '1') {
			$('#noMoreTips').removeClass('hide');
		}
		bookauthor.show();
		car.show();
		showAreaout();
		$('#topBranner img').on('load', function() {
			resetSearchHeadwh();
		});
		$(window).scrollTop() == 0 && $('#searchHeadFixer').removeClass('search_head_fixer');
	}

	function rectifyWordShow() {
		if(!window._searchData) return;
		var searchm = window._searchData.searchm;
		reportInfo.requerySearch = searchm.Head.Query.requerySearch;
		if(searchm.Head.Query.isWordSearch == 'true' && searchm.Head.Query.WordSearchInfo.showWordOne) {
			reportInfo.showWordOne = searchm.Head.Query.WordSearchInfo.showWordOne;
			$('#srrwTipsWord').text(searchm.Head.Query.WordSearchInfo.showWordOne);
			$('#srrwTips').removeClass('hide');
			if(searchm.Head.Query.WordSearchInfo.showWordOther) {
				var others = searchm.Head.Query.WordSearchInfo.showWordOther.split(';'),
					oind = others.indexOf(searchm.Head.Query.WordSearchInfo.showWordOne);
				if(oind != -1) {
					others.splice(oind, 1);
				}
				if(others.length > 0) {
					var ohtml = ['试试：'];
					var ss_key = keyword,
						ss_onkey = searchm.Head.Query.WordSearchInfo.showWordOne,
						ss_otherkey = others.join(';');
					for(var i = 0, len = others.length; i < len; ++i) {
						ohtml.push('<span class="search_recommend_result_words_item J_ping" report-eventparam="' + util.htmlEncode(keyword) + '_' + others[i] + '" report-eventid="MList_ReWord' + (i + 1) + '" report-eventlevel="3" rd="0-33-' + (i + 1) + '" key="' + others[i] + '" ss_key="' + util.htmlEncode(ss_key) + '" ss_onkey="' + util.htmlEncode(ss_onkey) + '" ss_otherkey="' + util.htmlEncode(ss_otherkey) + '">' + others[i] + '</span>');
					}
					$('#srrwOtherTips').html(ohtml.join('')).removeClass('hide');
					window.wa && window.wa('ptagExposure', {
						ptag: '37024.24.1',
						ss_mtest: reportInfo.mtest,
						ss_reqsea: reportInfo.requerySearch,
						ss_key: encodeURIComponent(ss_key),
						ss_onkey: encodeURIComponent(ss_onkey),
						ss_otherkey: encodeURIComponent(ss_otherkey)
					});
				}
			}
			selectNoResult = 2;
		}
	}

	function setChagePicMode() {
		cidConfigs.bpmatch = !!~cidConfigs.bigPicModeCids.indexOf('|' + result.hcCid1 + '|');
		cidConfigs.lpmatch = window._searchData.searchm.Head.Query.longType == '1';
		if(!/2g|3g/i.test(network) && (cidConfigs.bpmatch || cidConfigs.lpmatch)) {
			listMode = '1';
		}
		if(hashListMode && hashListMode != listMode) {
			if(hashListMode == '1') {
				changePciMode('big');
			} else {
				changePciMode('list');
			}
			listMode = hashListMode;
		}
	}

	function changePciMode(mark) {
		var tempTar = $('#listmodeBtn'),
			tempScollTop = $(window).scrollTop(),
			tempBh = $(document.body).height();
		if(mark == 'list') {
			$('#itemList').removeClass('cols_2').addClass('cols_1');
			listMode = '0';
			searchCom.setListMode(listMode);
			changeItemImg(searchCom.ITEM_LOGO.list);
		} else {
			$('#itemList').removeClass('cols_1').addClass('cols_2');
			listMode = '1';
			searchCom.setListMode(listMode);
			changeItemImg(searchCom.ITEM_LOGO.big);
		}
		changeBeltTextFontSize();
		if(tempScollTop > 0) {
			var targetBh = $(document.body).height();
			window.scrollTo(0, tempScollTop * (targetBh / tempBh));
		}
		searchCom.autoLoadImage(listMode, itemDivTpls.itemSingleh, reportInfo.retinaGray, false, 'search_prolist_item', 'item_longcover', true);
	}

	function initNetworkState() {
		if(network && /2g|3g/i.test(network)) {
			listMode = '0';
			searchCom.poorImgQuality();
		}
		if(!network || !/2g|3g/i.test(network)) {
			reportInfo.retinaGray = true;
			reportInfo.retina = 'retina-2';
		}
	}

	function bindEvent() {
		$('#listmodeBtn').on('click', function(e) {
			if($(this).hasClass('disabled')) return;
			if($('#itemList').hasClass('cols_1')) {
				changePciMode('big');
				searchCom.addHash({
					'listMode': '1'
				});
			} else {
				changePciMode('list');
				searchCom.addHash({
					'listMode': '0'
				});
			}
			resetItemDivTpl();
		});
		$('#topBranner,#topBranner2').on('click', function(e) {
			var tourl = $(this).attr('tourl');
			if(!tourl) return;
			location.href = tourl;
		});
		$('#areasout').on('click', function() {
			var tourl = $(this).attr('tourl');
			if(!tourl) return;
			location.href = tourl;
		});
		bookauthor.bindEvent();
		$('#keyshop').on('click', '[vid]', function(e) {
			var tar = $(this),
				vid = tar.attr('vid'),
				sid = tar.attr('sid'),
				exurl = tar.attr('exurl'),
				target = $(e.target);
			if(!vid || target.attr('key') || target.attr('tourl')) return;
			exurl && searchCom.samReport(exurl);
			window.setTimeout(function() {
				location.href = '//shop.m.jd.com/?shopId=' + sid;
			}, 200);
		});
		$('#keyshop').on('click', 'a[tourl]', function() {
			var tar = $(this),
				exurl = tar.attr('exurl'),
				tourl = tar.attr('tourl');
			if(!tourl) return;
			exurl && searchCom.samReport(exurl);
			window.setTimeout(function() {
				location.href = tourl;
			}, 200);
		});
		$('#brandOutBlock').on('click', 'a.item', function(e) {
			var tar = $(this),
				tval = tar.attr('tval'),
				sname = tar.attr('sname');
			if(!tval) return;
			updateHottagsStorage('prd_word', tval, sname);
			var match = tval.match(/(cid1|cid2|catid),L(\d+)M(\d+)/);
			if(match && match.length > 2) {
				var filter = searchFilter.getFilterObject();
				filter.categoryLevel = match[1] == 'cid1' ? '1' : match[1] == 'cid2' ? '2' : '3';
				filter.categoryId = match[2];
				searchByFilter();
			} else {
				var turl = searchUrlGen(false);
				turl = searchCom.addUrlParam(turl, 'filt_type', tval + ';');
				location.href = turl;
			}
		});
		$('#sFound2').on('click', function(e) {
			qpdisable = 'yes';
			ssf = 31;
			searchByFilter();
		});
		$('#sFound3').on('click', function(e) {
			var kw = window._searchData.searchm.Head.Query.QueryProcessor.ExpandQuery;
			if(!kw) return;
			keyword = kw;
			ssf = 32;
			searchByFilter();
		});
		$('#srrwOtherTips').on('click', 'span[key]', function(e) {
			var tar = $(this),
				key = tar.attr('key');
			if(!key) return;
			keyword = key;
			ssf = 33;
			searchByFilter();
		});
		searchFilter.bindBarFilterEvent();
		searchFilter.bindFilterEvent();
		bindItemEvent();
		bindCouponEvent();
		interlude.bindEvent();
		$(window).on('scroll', doScroll);
		searchFilter.bindExtraEvent();
	}

	function bindItemEvent() {
		var lastMoreDom = null;
		$('#itemList').on('tap', 'div.search_prolist_item_inner', function(e) {
			var tar = $(this),
				target = $(e.target),
				th2 = target.attr('tourl'),
				moreDom = tar.find('.search_prolist_func');
			if(moreDom.hasClass('expand') && target.parents('.search_prolist_func').length <= 0) {
				return;
			}
			if(target.hasClass('search_prolist_func')) {
				return;
			}
			if(target.hasClass('search_prolist_buy')) {
				return;
			}
			if(target.hasClass('search_prolist_secondHand')) {
				return;
			}
			if(target.hasClass('search_prolist_shop') || target.parents('.search_prolist_shop').length) {
				return;
			}
			if(pageInfo.curActive) {
				pageInfo.curActive.removeClass('active');
			}
			if(th2) {
				target.addClass('active');
			} else {
				pageInfo.curActive = tar.parent();
				pageInfo.curActive.addClass('active');
			}
		});
		$('#itemList').on('click', 'div.search_prolist_item_inner', function(e) {
			var tar = $(this),
				target = $(e.target),
				th = tar.attr('tourl'),
				th2 = target.attr('tourl'),
				isAd = tar.attr('ad'),
				skuid = tar.attr('id').replace('link_', ''),
				vid = tar.attr('vid'),
				sid = tar.attr('sid'),
				pos = tar.attr('pos'),
				paimai = tar.attr('paimai'),
				house = tar.attr('house'),
				pingou = tar.attr('pingou'),
				moreDom = tar.find('.search_prolist_func');
			if(moreDom.hasClass('expand') && target.parents('.search_prolist_func').length <= 0) {
				moreDom.removeClass('expand');
				return;
			}
			if(target.hasClass('search_prolist_func')) {
				lastMoreDom && lastMoreDom.removeClass('expand');
				target.addClass('expand');
				lastMoreDom = target;
				return;
			}
			if(target.hasClass('search_prolist_buy')) {
				var hlb = tar.attr('hlb'),
					lb = parseInt(tar.attr('lb') || '0', 10);
				addCartAct(skuid, hlb ? 1 : lb, tar.find('.search_prolist_buy').offset(), e);
				tar.attr('hlb', '1');
				return;
			}
			if(target.hasClass('search_prolist_secondHand')) {
				window.location.href = '//wqs.jd.com/item/secondlist.shtml?ptag=7092.4.22&sceneval=2&sku=' + target.attr('skuid');
				return;
			}
			if(sid > 0 && (target.hasClass('search_prolist_shop') || target.parents('.search_prolist_shop').length)) {
				isAd == 1 && searchCom.samReport(th);
				cacheItems(pos);
				setTimeout(function() {
					window.location.href = '//shop.m.jd.com/?shopId=' + sid + '&sceneId=1002&skuId=' + skuid + '&keywords=' + keyword;
				}, 100);
				return;
			}
			if(!th2 && target.parents('a[tourl]').length > 0) {
				th2 = target.parents('a[tourl]').attr('tourl');
			}
			if(th2) {
				th = th2;
			} else {
				if(vid == '117761') {
					th = 'http://m.car.jd.com/hmc/' + (isWX ? 'weixin' : 'qq') + '/' + skuid + '.html';
				} else if(paimai == '1' || house == '1') {} else {
					th = genItemLink(th, tar);
					var cids = (tar.parents('.search_prolist_item').attr('cid') || '').split('~');
					if(cids[1] === '12632') {
						th = th.replace('item.m.jd.com', 'm.yiyaojd.com');
					}
				}
			}
			if(!th) return;
			th = searchCom.addUrlParam(th, 'key', encodeURIComponent(keyword));
			cacheItems(pos);
			setTimeout(function() {
				location.href = th;
			}, 100);
		});
	}

	function genItemLink(th, tar) {
		if(typeof getMItemLink === 'function') {
			th = getMItemLink(th);
			var pos = tar.attr('pos'),
				csid = tar.attr('csid');
			th = searchCom.addUrlParam(th, 'pos', pos);
			th = searchCom.addUrlParam(th, 'csid', csid);
			var ssProjid = tar.attr('ss_projid');
			if(ssProjid != '0') {
				var ssExpid = tar.attr('ss_expid'),
					ssRuleid = tar.attr('ss_ruleid');
				th = searchCom.addUrlParam(th, 'ss_projid', ssProjid);
				th = searchCom.addUrlParam(th, 'ss_expid', ssExpid);
				th = searchCom.addUrlParam(th, 'ss_ruleid', ssRuleid);
				th = searchCom.addUrlParam(th, 'scan_orig', 'search.1.' + ssProjid + '.' + ssExpid + '.' + ssRuleid);
			}
			var ssSexpid = tar.attr('ss_sexpid');
			if(ssSexpid != '0') {
				var ssSruleid = tar.attr('ss_sruleid');
				th = searchCom.addUrlParam(th, 'ss_sexpid', ssSexpid);
				th = searchCom.addUrlParam(th, 'ss_sruleid', ssSruleid);
				th = searchCom.addUrlParam(th, 'scan_orig', 'search.2.' + ssSexpid + '.' + ssSruleid);
			}
			var filter = searchFilter.getFilterObject();
			if(filter.dSideId != searchCom.FILTER_DEFVAL.id) {
				th = searchCom.addUrlParam(th, 'dist', 'jd');
			}
			var symbol = tar.attr('symbol');
			if(symbol) {
				th = searchCom.addUrlParam(th, 'ss_symbol', symbol);
			}
			if(reportInfo.mtest) {
				th = searchCom.addUrlParam(th, 'ss_mtest', reportInfo.mtest);
			}
			if(reportInfo.expQuery != 0) {
				th = searchCom.addUrlParam(th, 'ss_mark', reportInfo.expQuery);
			}
			if(reportInfo.abtest) {
				th = searchCom.addUrlParam(th, 'abtest', reportInfo.abtest);
			}
			if(util.getQuery('songli') == 1) {
				th = searchCom.addUrlParam(th, 'songli', 1);
			}
		}
		return th;
	}

	function cacheItems(pos) {
		var unexpAd = [];
		$('img[real-exposure="1"][inited="0"]').each(function() {
			var exurl = $(this).attr('init_src')
			exurl && unexpAd.push(exurl);
		});
		cacheInfo.data.binfo.unexpAd = unexpAd;
		cacheInfo.data.binfo.keyword = keyword;
		cacheInfo.data.binfo.page = pageInfo.showpage;
		cacheInfo.data.binfo.pageInd = pageInfo.pageInd;
		cacheInfo.data.binfo.pos = pos || '';
		cacheInfo.data.binfo.scrtop = $(window).scrollTop();
		cachev1.session.setItem(cacheInfo.cacheKey, cacheInfo.data);
		if(pos) {
			fixReload(function() {
				cachev1.session.removeItem(cacheInfo.cacheKey);
				itemSimilar.show(pos);
			});
		}
	}

	function fixReload(task) {
		function handle() {
			(typeof task === 'function') && task();
			task = null;
			window.removeEventListener('pageshow', handle);
			window.removeEventListener('focus', handle);
		}
		window.addEventListener('pageshow', handle);
		window.addEventListener('focus', handle);
	}

	function changeItemImg(sta) {
		$('#itemList img.photo').each(function(ind, item) {
			var it = $(item),
				skuid = it.attr('skuid'),
				logo = it.attr('init_src'),
				lpmark = it.attr('lpmark'),
				inited = it.attr('inited'),
				tempSta = sta == searchCom.ITEM_LOGO.big && lpmark == '1' ? searchCom.ITEM_LOGO.img283 : sta;
			if(logo) {
				if(tempSta != searchCom.ITEM_LOGO.img283) {
					var logo2 = it.attr('init_src2');
					logo2 && (logo = logo2);
				}
				if(inited == 1) {
					it.attr('src', searchCom.genItemImgUrl(skuid, tempSta, logo, reportInfo.retinaGray));
				}
			}
			if(sta == searchCom.ITEM_LOGO.big && lpmark == '1') {
				it.parents('.search_prolist_item').addClass('item_longcover');
			} else {
				it.parents('.search_prolist_item').removeClass('item_longcover');
			}
		});
	}

	function updateHottagsStorage(ttype, mark, sname) {
		var hottags = getLocalStorageJsonByCachev1(window._HottagKey),
			tempList = [];
		if(hottags) {
			tempList = hottags.list || [];
		}
		tempList.push({
			name: sname,
			value: mark,
			ttype: ttype
		});
		cachev1.local.setItem(window._HottagKey, {
			list: tempList
		}, 9999);
	}

	function bindCouponEvent() {
		$('#srCoupons').on('click', 'div[activeid]', function(e) {
			var tar = $(this);
			if(tar.hasClass('got')) return;
			getCoupon({
				batchid: tar.attr('batchid'),
				activeid: tar.attr('activeid'),
				level: tar.attr('level'),
				dis: tar.attr('dis'),
				quo: tar.attr('quo'),
				note: tar.attr('note'),
				ltype: tar.attr('ltype'),
				adays: tar.attr('adays') * 1.0,
				ctime: tar.attr('ctime') * 1.0,
				stime: tar.attr('stime') * 1.0,
				etime: tar.attr('etime') * 1.0
			});
		});
	}

	function searchBackground() {
		if(!keyword && !classid) return;
		var url = searchUrlGen(true, 'jdSearchResultBkCb');
		window.jdSearchResultBkCb = function(json) {
			cgiMonitor.searchTimer && window.clearTimeout(cgiMonitor.searchTimer);
			if(json.retcode == 30212) {
				spiderCheck.show({
					alertTip: json.errmsg,
					source: 'msearch',
					successCB: function() {
						searchBackground();
					}
				});
			} else if(json.retcode != 0) {
				try {
					JD.report.umpBiz({
						bizid: '775',
						operation: '3',
						result: '1',
						source: '0',
						message: 'search json api failed'
					});
				} catch(e) {}
				pageInfo.reloadCount++;
				if(pageInfo.reloadCount <= pageInfo.totReload) {
					searchBackground();
				} else {
					$('#loadingLogo').addClass('hide');
					if(nextResultInfo.nextResultShow) {
						stopLoad = true;
						ui.alert({
							msg: '抱歉服务器开小差啦，换个关键词试试吧！'
						});
					} else {
						nextResultInfo.nextResultFaild = true;
					}
				}
			} else {
				try {
					JD.report.umpBiz({
						bizid: '775',
						operation: '3',
						result: '0',
						source: '0',
						message: 'search json api loaded'
					});
				} catch(e) {}
				var data = json.data;
				pageInfo.reloadCount = 0;
				nextResultInfo.nextResult = data;
				if(nextResultInfo.nextResultShow) {
					searchDataFormBg();
				}
			}
			window.setTimeout(function() {
				pageInfo.loading = false;
			}, 100);
		};
		$('#loadingLogo').removeClass('hide');
		pageInfo.loading = true;
		cgiMonitor.searchTimer = window.setTimeout(function() {
			try {
				JD.report.umpBiz({
					bizid: '775',
					operation: '4',
					result: '0',
					source: '0',
					message: 'search json api timeout'
				});
			} catch(e) {}
		}, cgiMonitor.timeout);
		ls.loadScript({
			url: url,
			isToken: false
		});
	}

	function searchDataFormBg() {
		nextResultInfo.nextResultShow = true;
		if(nextResultInfo.nextResult !== null) {
			$('#itemList').removeClass('hide');
			window.setTimeout(function() {
				if(nextResultInfo.nextResult === null) return;
				summaryHandle(nextResultInfo.nextResult);
				productHandle(nextResultInfo.nextResult);
				$('#loadingLogo').addClass('hide');
				nextResultInfo.nextResult = null;
				nextResultInfo.nextResultShow = false;
			}, 200);
		} else if(nextResultInfo.nextResultFaild) {
			nextResultInfo.nextResultFaild = false;
			stopLoad = true;
			ui.alert({
				msg: '抱歉服务器开小差啦，换个关键词试试吧！'
			});
		}
	}

	function searchByFilter(isajax, sx) {
		if(!keyword && !classid) return;
		if(isajax) {
			$('#loadingLogo').removeClass('hide');
			if(pageInfo.page == 1) {
				$('#itemList').addClass('hide');
				$('#noMoreTips').addClass('hide');
				$('#jdappdlOutter').hide();
			}
			var url = searchUrlGen(true, '', sx);
			searchData(url);
		} else {
			window.setTimeout(function() {
				location.href = searchUrlGen(false, '', sx);
			}, 200);
		}
	}

	function searchUrlGen(isajax, cbName, sx) {
		var cgiurl = isajax ? searchCgi : searchUrl;
		pageInfo.reaPage = pageInfo.page;
		var filter = searchFilter.getFilterObject();
		if(classType && filter.categoryId !== searchCom.FILTER_DEFVAL.mulId) {
			keyword = '';
		}
		var url = cgiurl.replace("{#key#}", encodeURIComponent(keyword)).replace('{#callback#}', cbName || 'jdSearchResultCb').replace('{#page#}', pageInfo.reaPage).replace('{#pagesize#}', pageInfo.pagesize);
		url = searchFilter.setFilterParams(url, filter);
		!isajax && (url = searchCom.setExtParam(url, {
			'sf': ssf,
			'as': aas,
			'projectId': s_proid,
			'hiddenid': s_hidid,
			'version': s_version
		}));
		url = searchCom.addUrlParam(url, 'qp_disable', qpdisable, '', true);
		if(sx) {
			url = searchCom.addUrlParam(url, 'sx', sx, '', true);
		}
		url = searchFilter.setFilterAdSearch(url);
		if(reportInfo.isStock && filter.redisstore == searchCom.FILTER_DEFVAL.id) {
			url = searchCom.addUrlParam(url, 'qp_exclude', '8', '', true);
		}
		if(filter.redisstore == searchCom.FILTER_DEFVAL.id && soldoutCheck) {
			cachev1.local.setItem('search_soldout_re', {
				key: keyword,
				val: 2
			}, 9999);
		}
		if(ycInfo.isYc && ycInfo.cid2) {
			url = searchCom.addUrlParam(url, 'filt_type', 'cid2,' + ycInfo.cid2 + ';');
		}
		url = searchCom.addUrlParam(url, 'fdesc', encodeURIComponent(searchFilter.historyDesc()));
		var t1 = (window._searchData.adpos.csid || '').split('_')[1];
		url = searchCom.addUrlParam(url, 't1', t1 || '');
		return url;
	}

	function searchData(filterUrl) {
		if(!keyword && !classid) return;
		var url = filterUrl;
		window.jdSearchResultCb = function(json) {
			cgiMonitor.searchTimer && window.clearTimeout(cgiMonitor.searchTimer);
			$('#itemList').removeClass('hide');
			if(json.retcode != 0) {
				try {
					JD.report.umpBiz({
						bizid: '775',
						operation: '3',
						result: '1',
						source: '0',
						message: 'search json api failed'
					});
				} catch(e) {}
				pageInfo.reloadCount++;
				if(pageInfo.reloadCount <= pageInfo.totReload) {
					searchData(filterUrl);
				} else {
					$('#loadingLogo').addClass('hide');
					$('#listmodeBtn').removeClass('hide');
					stopLoad = true;
					ui.alert({
						msg: '抱歉服务器开小差啦，换个关键词试试吧！'
					});
				}
			} else {
				try {
					JD.report.umpBiz({
						bizid: '775',
						operation: '3',
						result: '0',
						source: '0',
						message: 'search json api loaded'
					});
				} catch(e) {}
				var data = json.data;
				summaryHandle(data);
				productHandle(data);
				pageInfo.reloadCount = 0;
				if(!filterTop) {
					resetSearchHeadwh();
				}
			}
			window.setTimeout(function() {
				pageInfo.loading = false;
				doScroll();
			}, 200);
		};
		pageInfo.loading = true;
		if(pageInfo.page == 1) {
			$('#listmodeBtn').addClass('hide');
			$('#sNull01').addClass('hide');
			$('#sNull02').addClass('hide');
			if(searchFilter.getSelectMode()) {
				searchFilter.changeSelectMode(2);
			}
			itemIdMap = {
				length: 0
			};
		}
		cgiMonitor.searchTimer = window.setTimeout(function() {
			try {
				JD.report.umpBiz({
					bizid: '775',
					operation: '4',
					result: '0',
					source: '0',
					message: 'search json api timeout'
				});
			} catch(e) {}
		}, cgiMonitor.timeout);
		ls.loadScript({
			url: url,
			isToken: false
		});
	}

	function summaryHandle(data) {
		result.summary = data.searchm.Head.Summary;
		if(result.summary.ResultCount == 0) {
			$('#sNull01').removeClass('hide');
			$('#sNull02').addClass('hide');
		} else {
			$('#listmodeBtn').removeClass('hide');
			$('#cancelBtn').addClass('hide');
			$('#totResult').text(getResultCountStr());
			$('#searchResBlock,#searchHeadff,#proFilterWrap').removeClass('hide');
		}
		if(pageInfo.reaPage == result.summary.Page.PageCount) {
			$('#noMoreTips').removeClass('hide');
		}
	}

	function productHandle(data) {
		if(!data.searchm.Paragraph || data.searchm.Paragraph.length <= 0) {
			window.shareConfig.img_url = '';
			try {
				JD.report.umpBiz({
					bizid: '775',
					operation: '5',
					result: '0',
					source: '0',
					message: 'search json api empty'
				});
			} catch(e) {}
			return;
		}
		var df = document.createDocumentFragment(),
			startpos = itemIdMap.length + 1,
			ind = 0,
			skuids = [],
			skuidall = [],
			items = [],
			aditems = [],
			bookIds = [],
			product = adposInfoHandle(data),
			isRewrite = data.rewrite.isWrite != '0' || data.rewrite.isSortWrite != '0';
		for(var i = 0, len = product.length; i < len; ++i) {
			var prod = product[i];
			if(isRewrite) {
				rwItemIdMap[prod.wareid] = true;
			} else if(rwItemIdMap[prod.wareid]) {
				continue;
			}
			prod.ind = (++ind);
			prod.page = result.summary.Page.PageIndex;
			prod.cgind = startpos + i;
			prod.rd = prod.isAd ? '0-4-4' : '0-4-1';
			prod.ifad = adsInfo.ifad;
			prod.ver = adsInfo.verval;
			prod.eventid = adsInfo.evenid;
			prod.tline = 2;
			prod.tlineimg = 2;
			if(prod.vender_id == '117761') {
				prod.rd = '0-4-3';
			}
			if(bookInfo.cid1 == prod.cid1) {
				bookIds.push(prod.wareid);
				prod.tline = 1;
				prod.isbook = true;
				if(~bookInfo.exCid2s.indexOf(prod.cid2)) {
					prod.isoverseas = true;
				} else prod.isoverseas = false;
			}
			if(prod.isAd) {
				prod.ad_title = util.htmlEncode(prod.ad_title.replace(redFontRegExp, ''));
				if(prod.ad_highlight) {
					prod.isGaiya = true;
					prod.tline = 1;
				}
				aditems.push(prod);
			} else if(prod.Content) {
				if(gray('LIST_OUTER_RICHATTR') && prod.Content.attr_icon_res) {
					prod.richattr = prod.Content.attr_icon_res.split('^').map(function(item) {
						var info = item.split(':');
						return {
							img: info[0] && info[0] != 'null' ? info[0] : '',
							value: info[1] && info[1] != 'null' ? info[1] : '',
							name: info[2] && info[2] != 'null' ? info[2] : ''
						};
					}).filter(function(item) {
						return item.value && item.name;
					}).slice(0, 3);
					prod.tline = 1;
				}
				if(prod.Content.gaiyawarename && prod.Content.extname) {
					prod.isGaiya = true;
					prod.tline = 1;
				}
				prod.Content.warename = util.htmlEncode(prod.Content.warename.replace(redFontRegExp, ''));
				skuids.push(prod.wareid);
				items.push(prod);
			}
			if(cidConfigs.sTitle || (prod.Content && prod.Content.shortWarename && (prod.Content.CustomAttrList || getAttrStick(prod).length)) || (prod.isAd && prod.ad_smart_title && prod.ad_attribute)) {
				prod.tlineimg = 1;
			}
			skuidall.push(prod.wareid);
			prod.lpmark = cidConfigs.lpmatch ? '1' : '0';
			prod.longImg = prod.lpmark == '1' && listMode == '1';
			prod.csid = data.adpos.csid;
			var rObj = data.rewrite;
			prod.ssProjid = rObj.projid;
			prod.ssExpid = rObj.experimentid;
			prod.ssRuleid = rObj.ruleid;
			prod.ssSexpid = rObj.sortExpid;
			prod.ssSruleid = rObj.sortRuleid;
			if(prod.isAd) {
				$(tpl.child_aditemTpl(prod)).appendTo(df);
			} else {
				$(tpl.child_itemV2Tpl.call(tplFn, prod)).appendTo(df);
			}
		}
		var $itemList = $('#itemList');
		if(pageInfo.page == 1) {
			$itemList.find('> .search_prolist_item').remove();
		}
		$itemList.append(df);
		interlude.init(data);
		interlude.layout();
		searchCom.autoLoadImage(listMode, itemDivTpls.itemSingleh, reportInfo.retinaGray, false, 'search_prolist_item', 'item_longcover');
		if(bookIds.length > 0) {
			reaBookDescHandle(bookIds);
		}
		reaProductIco(product);
		resStockAndPriceHandle(items, skuidall);
		reaSummaryHandle(skuidall, items);
		reaAddCartItem(items);
		reaReservationHandle(items);
		reaPaimaiHandle(items);
		reaBaitiaoHandle(items);
		reaProfitBeltHandle(items);
		reaHouseHandle(items);
		searchCom.dealSimpSea2Detail(items);
		reportExposure(product, data.adpos.csid, data.beltAdpos);
		adInfoReport(aditems);
		mReport.reportProducts(product);
		pageInfo.showpage = result.summary.Page.PageIndex;
		cacheInfo.data.products = cacheInfo.data.products.concat(product);
	}

	function adposInfoHandle(data) {
		var product = data.searchm.Paragraph,
			adpos = data.adpos.data,
			posadInfo = data.adpos.PosAdInfo,
			eventid = '0',
			ifad = 0,
			ver = 0;
		if(posadInfo) {
			eventid = posadInfo.event_id;
		}
		if((eventid & adsInfo.events.eff) != 0) {
			ver = 1;
			if((eventid & adsInfo.events.gray) != 0) {
				ver = 2;
			}
			if((eventid & adsInfo.events.ads) != 0) {
				ifad = 1;
			}
		}
		adsInfo.ver = 'ad-' + ver;
		adsInfo.verval = ver;
		adsInfo.ifad = ifad;
		adsInfo.evenid = eventid;
		addAdProp(adpos)
		return removeDuplicates(product, adpos)

		function removeDuplicates(product, adpos) {
			var res = []
			product.forEach(function(item, index) {
				adpos.forEach(function(aditem) {
					if((eventid & adsInfo.events.gray) == 0) return
					if(!itemIdMap[aditem.sku_id] && parseInt(aditem.flow_order, 10) == index + 1) {
						itemIdMap[aditem.sku_id] = 2
						res.push(aditem)
					}
				})
				if(itemIdMap[item.wareid]) return
				itemIdMap[item.wareid] = 1
				res.push(item)
			})
			return res
		}

		function addAdProp(adpos) {
			adpos.forEach(function(aditem) {
				aditem.isAd = true;
				aditem.wareid = aditem.sku_id;
			})
		}
	}

	function adInfoReport(list) {
		if(list == null) {
			list = [];
			var adpos = window._searchData.adpos;
			if(adpos.data && adpos.data.length > 0) {
				var adlist = adpos.data,
					len = adlist.length;
				for(var i = 0; i < len; ++i) {
					var ad = adlist[i];
					if(itemIdMap[ad.sku_id]) {
						list.push(ad);
					}
				}
			}
		}
		for(var j = 0, jlen = list.length; j < jlen; ++j) {
			var ad = list[j];
			ad.unreal_exposal_url && searchCom.samReport(ad.unreal_exposal_url);
		}
	}

	function reaProductIco(items) {
		var secondHandSkus = [];
		for(var i = 0, len = items.length; i < len; ++i) {
			var it = items[i],
				sku = it.wareid;
			if(it.isAd) {
				var tobj = $('#link_' + sku + ' div.search_prolist_title')
				var link = $('#link_' + sku)
				var markHtml = []
				var benefit = it.sku_benefit
				if(benefit && benefit.b256.length) {
					var icoMark = searchFilter.getActMark(benefit.b256[0].icon_id)
					var actobj = searchFilter.getActInfo(icoMark)
					if(markHtml.length < 2 && actobj && actobj.inActTime) {
						if(actobj.logo2) {
							markHtml.push('<i class="mod_tag"><img src="' + actobj.logo2 + '" /></i>');
						} else {
							markHtml.push('<div class="mod_sign_tip ' + actobj.cname + '"><b>' + actobj.actname + '</b></div>');
						}
					}
				}
				if(markHtml.length > 0) {
					tobj.prepend(markHtml.join(''));
					var symbol = parseInt(link.attr('symbol') || '0', 10);
					if((symbol & 2) === 0) {
						link.attr('symbol', symbol ^ 2);
					}
				}
				var adOthObj = $('#comtag_' + sku),
					adOthHtml = [];
				if(adOthHtml.length < 2 && (it.self_run == 1 || it.vender_id == 603837 || it.vender_id == 663284)) {
					adOthHtml.push('<i class="mod_tag" rd="0-4-1"><img src="//img11.360buyimg.com/jdphoto/s48x28_jfs/t1/12264/37/1979/1085/5c185d6dEba7743da/c5ab4d78f8bf4d90.png" /></i>');
				}
				if(adOthHtml.length > 0) {
					adOthObj.prepend(adOthHtml.join(''));
				}
				var priceTags = []
				var basePromoInfo = adAdapter(it)
				var promoIcons = reaPromoIco(basePromoInfo)
				priceTags = priceTags.concat(promoIcons)
				productTag.addPriceTag(sku, priceTags)
				setSecKillIcon(basePromoInfo)
			} else {
				var isShowZiying = function(it) {
					var condition1 = (it.productext & 4096) !== 0 && it.isnoZY == 1
					var condition2 = (it.flags & 4096) !== 0 || it.venderType == 100
					var condition3 = it.vender_id == 603837 || it.vender_id == 663284
					return(!condition1 && condition2) || condition3
				}
				var isShowJingPei = function(it) {
					var condition1 = (it.property_flag & 1) !== 0
					var condition2 = it.vender_id == 603837 || it.vender_id == 663284
					return condition1 && !condition2
				}
				var othObj = $('#comtag_' + sku),
					othHtml = [];
				if(othHtml.length < 2 && isShowZiying(it)) {
					othHtml.push('<i class="mod_tag" rd="0-4-1"><img src="//img11.360buyimg.com/jdphoto/s48x28_jfs/t1/12264/37/1979/1085/5c185d6dEba7743da/c5ab4d78f8bf4d90.png" /></i>');
				}
				if(othHtml.length < 2 && isShowJingPei(it)) {
					othHtml.push('<i class="mod_tag" rd="0-4-1"><img src="//img11.360buyimg.com/jdphoto/s176x56_jfs/t1/15952/7/2003/5832/5c185dd7E3a752a62/00dfa8da23f5a1fd.png" /></i>');
				}
				if(othHtml.length < 2 && (it.productext2 & 134217728) !== 0) {
					othHtml.push('<i class="mod_tag" rd="0-4-1"><img src="//img11.360buyimg.com/jdphoto/s68x28_jfs/t28474/79/699858248/2214/bced3f94/5bfb58faNfdbaaf9e.png" /></i>');
				}
				if(othHtml.length < 2 && it.sendService == 1) {
					othHtml.push('<i class="mod_tag" rd="0-4-1"><img src="//img11.360buyimg.com/jdphoto/s68x28_jfs/t7276/241/1505050742/1966/f1337e08/599cf586Ne5cb3dd6.png" /></i>');
				}
				if(othHtml.length < 2 && ((it.flags & 4096) !== 0 && (it.sku_mark & 32) === 0 && (it.productext & 4096) !== 0)) {
					othHtml.push('<i class="mod_tag" rd="0-4-1"><img src="//img11.360buyimg.com/jdphoto/s88x28_jfs/t7891/226/1723911960/2312/c37c6a26/599fdc0eNe3e4977d.png" /></i>');
				}
				if(othHtml.length < 2 && (it.shop_id == '1000076153' && (it.productext2 & 131072) !== 0)) {
					othHtml.push('<i class="mod_tag"><img src="//img11.360buyimg.com/jdphoto/s68x28_jfs/t22360/254/2192420554/2143/df52c275/5b4c3d8cN6b0e7b3a.png" /></i>');
				}
				if(othHtml.length > 0) {
					othObj.prepend(othHtml.join(''));
				}
				var tobj = $('#link_' + sku + ' div.search_prolist_title'),
					link = $('#link_' + sku),
					markHtml = [],
					icoMark = searchFilter.getActMark(it.ico);
				if(icoMark) {
					var actobj = searchFilter.getActInfo(icoMark);
					if(markHtml.length < 2 && actobj && actobj.inActTime) {
						if(actobj.logo2) {
							markHtml.push('<i class="mod_tag"><img src="' + actobj.logo2 + '" /></i>');
						} else {
							markHtml.push('<div class="mod_sign_tip ' + actobj.cname + '"><b>' + actobj.actname + '</b></div>');
						}
					}
				}
				if(markHtml.length < 2 && (it.productext & 8388608) !== 0) {
					markHtml.push('<i class="mod_tag"><img src="//img11.360buyimg.com/jdphoto/s100x28_jfs/t7597/78/1439801434/2667/5d29b409/599cf128N4a0d891e.png" /></i>');
				}
				if(markHtml.length < 2 && (it.productext2 & 16) !== 0) {
					markHtml.push('<i class="mod_tag"><img src="//img11.360buyimg.com/jdphoto/s68x28_jfs/t10540/240/2161662372/1576/bf008be1/59eff91eNf0ba4ba6.png" /></i>');
				}
				if(markHtml.length < 2 && it.cid1 == '13765') {
					markHtml.push('<i class="mod_tag"><img src="//img11.360buyimg.com/jdphoto/s48x28_jfs/t27154/326/2525821085/883/401fa607/5c04f3acN34087c51.png" /></i>');
				}
				if(markHtml.length < 2 && (it.productext & 1024) !== 0) {
					markHtml.push('<i class="mod_tag"><img src="//img11.360buyimg.com/jdphoto/s88x28_jfs/t28279/17/222675420/2452/b4547785/5bebdc5eN5a56d5e3.png"/></i>');
				}
				if(markHtml.length < 2 && (it.productext2 & Math.pow(2, 30)) !== 0) {
					markHtml.push('<i class="mod_tag"><img src="///img11.360buyimg.com/jdphoto/s88x28_jfs/t1/11729/32/11364/2221/5c88a62fEc88eef70/17001da46b88f252.png" /></i>');
				}
				if(markHtml.length < 2 && (it.productext & 262144) !== 0) {
					markHtml.push('<i class="mod_tag"><img src="//img11.360buyimg.com/jdphoto/s102x28_jfs/t8488/217/823821809/2368/8468a10d/59af6602N66a24418.png" /></i>');
				}
				if(markHtml.length < 2 && it.isNSNGgoods == 3) {
					markHtml.push('<i class="mod_tag"><img src="//img11.360buyimg.com/jdphoto/s88x28_jfs/t29836/348/856399196/2556/ca0d3c54/5c00a6f2Nd2ee8b91.png" /></i>');
				}
				if(markHtml.length < 2 && it.jzfp == '1') {
					markHtml.push('<i class="mod_tag"><img src="//img11.360buyimg.com/jdphoto/s88x28_jfs/t15094/106/2539531431/2519/73b32d3f/5aa74c0bN677991b0.png" /></i>');
				}
				if(markHtml.length < 2 && it.brand_id == '299330') {
					markHtml.push('<i class="mod_tag"><img src="//img11.360buyimg.com/jdphoto/s61x35_jfs/t11623/159/1253379604/2040/77aae356/5a41b795N0be954ef.png" /></i>');
				}
				if(markHtml.length < 2 && ~cidConfigs.samShopids.indexOf('|' + it.shop_id + '|')) {
					markHtml.push('<i class="mod_tag" tagtype="sam"><img src="//img11.360buyimg.com/jdphoto/s60x28_jfs/t9406/72/302217559/1705/c7ab7c71/59a519ddN62479434.png" /></i>');
				}
				if(markHtml.length < 2 && it.vender_id == '663284') {
					markHtml.push('<i class="mod_tag"><img src="//img11.360buyimg.com/jdphoto/s90x28_jfs/t7945/259/1414728762/2793/9402ea84/599cf0fdNd5cb04aa.png" /></i>');
				}
				if(markHtml.length < 2 && it.isStoreOnSale == '1') {
					markHtml.push('<i class="mod_tag"><img src="//img11.360buyimg.com/jdphoto/s115x28_jfs/t1/31201/10/3489/2187/5c7502a0E717299d6/d3d1a72108fd9c2e.png" /></i>');
				}
				if(markHtml.length < 2 && (it.productext & 8) !== 0) {
					markHtml.push('<i class="icon_service_home" rd="0-4-1"></i>');
				}
				if(markHtml.length < 2 && it.fqy == 1) {
					markHtml.push('<i class="mod_tag"><img src="//img11.360buyimg.com/jdphoto/s48x28_jfs/t27154/326/2525821085/883/401fa607/5c04f3acN34087c51.png" /></i>');
				}
				if(markHtml.length < 2 && it.isfanbox == 1) {
					markHtml.push('<i class="mod_tag"><img src="//img11.360buyimg.com/jdphoto/s91x28_jfs/t1/30141/7/2413/2381/5c6a54cfE42fed22f/3e3cc92acb4cbf0b.png" /></i>');
				}
				if(markHtml.length > 0) {
					tobj.prepend(markHtml.join(''));
					var symbol = parseInt(link.attr('symbol') || '0', 10);
					if((symbol & 2) === 0) {
						link.attr('symbol', symbol ^ 2);
					}
				}
				var npdom = $('#nprice_' + sku),
					priceTags = [];
				it.bjssy == 1 && priceTags.push('价保');
				var serviceIcos = reaServiceIco(it);
				priceTags = priceTags.concat(serviceIcos);
				var couponIcon = reaCouponIco(it);
				couponIcon && priceTags.push({
					type: '券促销',
					dom: couponIcon
				});
				var promoIcons = reaPromoIco(it);
				priceTags = priceTags.concat(promoIcons);
				if((it.productext & 1024) !== 0 && (it.flags & 4096) !== 0 && it.isOverSea == 1) {
					priceTags.push('全球购自营包税');
				}
				if((it.productext & 33554432) !== 0 || (it.productext & 512) !== 0) {
					priceTags.push('新品');
				}
				if(it.isFsku) {
					npdom.html('<i class="mod_tag"><img src="//img11.360buyimg.com/jdphoto/s128x28_jfs/t5734/347/3788600457/2211/93387e46/59423aeeN58b9ce25.png"/></i>');
				}
				productTag.addPriceTag(sku, priceTags);
				var $shoptag = $('#shoptag_' + sku),
					bshopTags = [];
				if(bshopTags.length < 1 && it.decoration == 1) {
					bshopTags.push('<i class="mod_tag"><img src="//img11.360buyimg.com/jdphoto/s88x28_jfs/t1/24919/12/3295/2568/5c25d067Ea0f4e690/9e94e17f36f626d9.png"/></i>');
				}
				if(bshopTags.length < 1 && it.good_shop == 1) {
					bshopTags.push('<i class="icon_good_shop"></i>');
				}
				if(bshopTags.length > 0) {
					$shoptag.append(bshopTags.join(''));
				}
				var bmpdom = $('#bomtag_' + sku),
					markHtml3 = [];
				var userPsnProductNew = Number(it.userPsnProductNew).toString(2);
				if((it.userPsnProductNew & 16) !== 0) {
					markHtml3.push('<i class="mod_tag"><img src="//img11.360buyimg.com/jdphoto/s128x28_jfs/t12106/279/1935318217/2914/3852d57b/5a2e281cNce54829f.png"/></i>');
				} else if((it.userPsnProductNew & 32) !== 0) {
					markHtml3.push('<i class="mod_tag"><img src="//img11.360buyimg.com/jdphoto/s128x28_jfs/t16111/321/257108586/2906/71d79d89/5a2e282eN1153a330.png"/></i>');
				} else if((it.userPsnProductNew & 64) !== 0) {
					markHtml3.push('<i class="mod_tag"><img src="//img11.360buyimg.com/jdphoto/s128x28_jfs/t16186/178/326016442/2909/4c8c0be7/5a2e282eN83fcafb8.png"/></i>');
				} else if(userPsnProductNew.length >= 33 && userPsnProductNew.substr(-33, 1) === '1') {
					markHtml3.push('<i class="mod_tag"><img src="//img11.360buyimg.com/jdphoto/s148x28_jfs/t14152/70/1924097622/3758/671576e3/5a2e282fN2e35172e.png"/></i>');
				} else if(userPsnProductNew.length >= 34 && userPsnProductNew.substr(-34, 1) === '1') {
					markHtml3.push('<i class="mod_tag"><img src="//img11.360buyimg.com/jdphoto/s128x28_jfs/t13570/114/1947915845/2815/bd22145d/5a2e282fNafa8838d.png"/></i>');
				} else if(userPsnProductNew.length >= 35 && userPsnProductNew.substr(-35, 1) === '1') {
					markHtml3.push('<i class="mod_tag"><img src="//img11.360buyimg.com/jdphoto/s128x28_jfs/t15436/327/473650211/3067/5a88ddba/5a2e282fN90b2b7e5.png"/></i>');
				}
				if(markHtml3.length > 0) {
					bmpdom.append(markHtml3.join(''));
					bmpdom.removeClass('hide');
					var symbol = parseInt(link.attr('symbol') || '0', 10);
					if((symbol & 4) === 0) {
						link.attr('symbol', symbol ^ 4);
					}
				} else {
					var symbol = parseInt(link.attr('symbol') || '0', 10);
					if((symbol & 8) === 0) {
						link.attr('symbol', symbol ^ 8);
					}
				}
				if(it.isPaimai) {
					setPaimaiIcon(sku);
				}
				pinGou.addIcon(it);
				setSecKillIcon(it);
				if(it.oldWareInfo && it.oldWareInfo.old_min_price == -100) {
					$('#link_' + sku + ' .search_prolist_info').append('<div class="search_prolist_secondHand" skuid="' + sku + '" rd="0-4-22">同款二手</div>');
					$('#link_' + sku + ' .search_prolist_shop').removeClass('with_padding').addClass('with_secondHand');
					secondHandSkus.push(sku);
				}
			}
		}
		if(secondHandSkus.length > 0) {
			window.wa && window.wa('ptagExposure', {
				ptag: '37024.25.2',
				skuIds: secondHandSkus.join(',')
			});
		}
	}

	function reaCouponIco(it) {
		var coupon = it.coupon,
			npdom = $('#nprice_' + it.wareid),
			pstr = '';
		if(!coupon || npdom.length == 0) return;
		if(coupon.t == 0) {
			if(coupon.j > 0) {
				pstr = '<span class="search_prolist_coupon">' + coupon.j + '元京券</span>';
			}
		} else if(coupon.t == 1) {
			if(coupon.m > 0 && coupon.j > 0) {
				pstr = '<span class="search_prolist_coupon">券' + coupon.m + '-' + coupon.j + '</span>';
			}
		} else if(coupon.t == 3) {
			var infos = coupon.d.info,
				ilen = infos ? infos.length : 0;
			if(ilen == 1) {
				var temp0 = infos[0],
					dis = ((temp0.discount * 10).toFixed(1) + '').replace(/\.0$/, '');
				pstr = '<span class="search_prolist_coupon">满' + temp0.quota + '享' + dis + '折</span>';
			} else if(ilen > 1) {
				var temp1 = [];
				for(var j = 0; j < ilen; ++j) {
					temp1.push(((infos[j].discount * 10).toFixed(1) + '').replace(/\.0$/, ''));
				}
				temp1 = temp1.sort(function(a, b) {
					return a - b;
				}).slice(0, 3);
				pstr = '<span class="search_prolist_coupon">' + temp1.join('/') + '折</span>';
			}
		}
		return pstr;
	}

	function setPaimaiIcon(skuid) {
		var tobj = $('#link_' + skuid + ' div.search_prolist_title'),
			link = $('#link_' + skuid);
		tobj.find('.mod_sign_tip,i.mod_tag[tagtype="baitiao"],.mod_tag,.icon_service_home').remove();
		tobj.prepend('<i class="mod_tag"><img src="//img11.360buyimg.com/jdphoto/s48x28_jfs/t7426/125/1486234607/1414/b8ce405e/599cf0e6N0b9f60af.png" /></i>');
		$('#nprice_' + skuid).addClass('hide');
		$('#comtag_' + skuid).addClass('hide');
		link.attr('paimai', '1');
	}
	var pinGou = {
		isPinGou: function(prod) {
			var isYushou = (prod.sku_mark & 4096) !== 0;
			var isPinGou = prod.pinGou && prod.pinGou.bp > 0 && prod.pinGou.count > 0;
			return !isYushou && isPinGou;
		},
		addIcon: function(prod) {
			if(!pinGou.isPinGou(prod)) return;
			var pdom = $('#dp_J_' + prod.wareid),
				link = $('#link_' + prod.wareid);
			if(pdom.length === 0 || pdom.attr('hrp') == 1 || link.attr('paimai') == 1 || link.attr('poplease') == 1) return;
			var npdom = $('#nprice_' + prod.wareid);
			$('#price_' + prod.wareid).prepend('<span class="tag_tuan">' + prod.pinGou.count + '人拼</span>');
			pdom.html('&yen; ' + searchCom.priceFormatter(prod.pinGou.bp));
			npdom.attr('spmark', '0');
			link.attr('pingou', 1);
			pdom.attr('kpl', '1');
		},
		addSinglePrice: function(skuId, price) {
			if(skuId && price) {
				$('#single_price_' + skuId).remove();
				if(parseFloat(price) >= 10000) {
					price = (price + '').replace(/\.\d*$/, '');
				}
				$('#nprice_' + skuId).prepend('<span class="pg_single" id="single_price_' + skuId + '">单买 ¥' + price + '</span>');
			}
		}
	};

	function setSecKillIcon(prod) {
		if(!(prod.secKill && prod.secKill.status == 1)) return;
		var link = $('#link_' + prod.wareid),
			dom = $('#link_' + prod.wareid + ' .search_prolist_cover'),
			si = dom.children('i.search_prolist_tag');
		if(dom.length > 0 && si.length === 0) {
			productTag.addPriceTag(prod.wareid, '秒杀');
		}
		var symbol = parseInt(link.attr('symbol') || '0', 10);
		link.attr('symbol', symbol ^ 1);
	}
	var productTag = function() {
		var priceTags = [{
			type: 'sku直搜',
			dom: '//img11.360buyimg.com/jdphoto/s128x28_jfs/t5734/347/3788600457/2211/93387e46/59423aeeN58b9ce25.png'
		}, {
			type: '分期用',
			dom: ''
		}, {
			type: '专属价',
			dom: ''
		}, {
			type: '山姆价',
			dom: ''
		}, {
			type: '新人价',
			dom: ''
		}, {
			type: '学生价',
			dom: ''
		}, {
			type: 'PLUS价',
			dom: ''
		}, {
			type: '价保',
			dom: '//img11.360buyimg.com/jdphoto/s86x28_jfs/t10087/205/1719717382/1704/5cce1bf0/59e566f0Nfcb46a11.png'
		}, {
			type: '安装服务',
			dom: '//img11.360buyimg.com/jdphoto/s88x28_jfs/t7066/233/2178766698/2704/e4a77d51/5992b593N7a4cda24.png'
		}, {
			type: '免费送装',
			dom: '//img11.360buyimg.com/jdphoto/s88x28_jfs/t7969/213/1437419868/2878/5de8c14b/599cf4f9N1e125e9a.png'
		}, {
			type: '送货上门',
			dom: '//img11.360buyimg.com/jdphoto/s88x28_jfs/t7681/173/1432154683/2027/cf5d60d8/599cf4d1N7f441fb1.png'
		}, {
			type: '商家免邮',
			dom: '//img11.360buyimg.com/jdphoto/s88x28_jfs/t7318/163/1463112656/2654/47848ed8/599cf40eN04d1e4f1.png'
		}, {
			type: '券促销',
			dom: ''
		}, {
			type: '满减详细',
			dom: ''
		}, {
			type: '限时限量抢购',
			dom: ''
		}, {
			type: '秒杀',
			dom: '//img11.360buyimg.com/jdphoto/s48x28_jfs/t7867/19/1452018090/1756/1c57bcf8/599cf3f5N7dbe95e5.png'
		}, {
			type: '赠品',
			dom: '//img11.360buyimg.com/jdphoto/s28x28_jfs/t13501/220/748441324/1050/f2add5a2/5a128a72N857b1c57.png'
		}, {
			type: '满赠',
			dom: '//img11.360buyimg.com/jdphoto/s48x28_jfs/t14293/213/327359722/1869/c992a068/5a2a340aNb1e0aa8f.png'
		}, {
			type: '赠豆',
			dom: '//img11.360buyimg.com/jdphoto/s28x28_jfs/t12904/231/705484511/705/5ad9e04c/5a128a62Nd05d709b.png'
		}, {
			type: '全球购自营包税',
			dom: '//img11.360buyimg.com/jdphoto/s48x28_jfs/t12559/358/5333293/1594/c1d92f2f/5a0174ccN4a86d74d.png'
		}, {
			type: '分期免息',
			dom: '//img11.360buyimg.com/jdphoto/s88x28_jfs/t7702/51/1390972217/2695/d56f9fc/599cf425Ne2ced732.png'
		}, {
			type: '商场同款',
			dom: '//img11.360buyimg.com/jdphoto/s88x28_jfs/t7711/124/1421338369/2548/ac71213f/599cf47eN55c9cbb5.png'
		}, {
			type: '新品',
			dom: '//img11.360buyimg.com/jdphoto/s48x28_jfs/t7378/78/1450098580/1414/a8e80023/599cf490N8eaf23f7.png'
		}].map(function(item) {
			if(item.dom) {
				item.dom = '<i class="mod_tag"><img src="' + item.dom + '"/></i>';
				item.width = parseInt(item.dom.match(/\/s(\d+)x(\d+)_jfs\//)[1]) / 2;
			}
			return item;
		});

		function reorderTags(tags, contrastTags) {
			var list = [];
			for(var i = 0; i < contrastTags.length; i++) {
				var contrastTag = contrastTags[i];
				for(var j = 0; j < tags.length; j++) {
					var tag = tags[j],
						dom = '',
						width = '';
					if($.type(tag) === 'string' && tag === contrastTag.type) {
						dom = contrastTag.dom;
						width = contrastTag.width;
					} else if(tag && tag.type === contrastTag.type) {
						dom = tag.dom;
						width = tag.width;
					}
					if(dom) {
						list.push({
							order: i,
							width: width,
							dom: dom
						});
						tags.splice(j, 1);
						break;
					}
				}
				if(tags.length === 0) {
					break;
				}
			}
			return list;
		}

		function mergeTags(tags, newTags) {
			for(var i = 0; i < newTags.length; i++) {
				for(var j = 0; j < tags.length; j++) {
					if(tags[j].order > newTags[i].order) break;
				}
				tags.splice(j, 0, newTags[i]);
			}
			return tags;
		}

		function fillPriceTags($nprice, tags) {
			if(!$nprice || !tags || !tags.length) return;
			var counter = 0;
			var originTags = $nprice.data('originTags') || [];
			for(var k = 0; k < originTags.length; k++) {
				if(originTags[k].order === tags[k].order) {
					originTags[k].$tag && (++counter);
					if(counter >= 2) return;
				} else {
					for(var j = k; j < originTags.length; j++) {
						originTags[j].$tag && originTags[j].$tag.remove();
					}
					break;
				}
			}
			var MARGIN = 7;
			var width = 0,
				tempWidth;
			var maxWidth;
			if($nprice.css('display') === 'block') {
				maxWidth = $nprice.width();
				width = 0;
			} else {
				maxWidth = $nprice.siblings('.search_prolist_title').width() - $nprice.siblings('.search_prolist_price').width();
				width = $nprice.width();
			}
			var $buy = $nprice.siblings('.search_prolist_buy');
			if($buy.length && $buy.position().top < $nprice.position().top + $nprice.height()) {
				maxWidth = maxWidth - 25;
			}
			originTags = originTags.slice(0, k);
			for(var i = k; i < tags.length; i++) {
				var tag = tags[i],
					$tag = $(tag.dom);
				var temp = {
					order: tag.order
				};
				if($.type(tag.width) === 'number') {
					tempWidth = width + tag.width + MARGIN;
					if(tempWidth < maxWidth) {
						$nprice.append($tag);
						temp.$tag = $tag;
						width = tempWidth;
						counter++;
					}
				} else {
					$nprice.append($tag);
					tempWidth = width + ($.type(tag.width) === 'function' ? tag.width($tag, MARGIN) : $tag.width() + MARGIN);
					if(tempWidth < maxWidth) {
						temp.$tag = $tag;
						width = tempWidth;
						counter++;
					} else {
						$tag.remove();
					}
				}
				originTags.push(temp);
				if(counter >= 2) {
					break;
				}
			}
			$nprice.data('originTags', originTags);
		}
		return {
			addPriceTag: function(sku, tags, canFill) {
				if(!sku || !tags) return;
				tags = $.type(tags) == 'array' ? tags : [tags];
				var $nprice = $('#nprice_' + sku);
				if(!$nprice.length) return;
				var orderTags = mergeTags($nprice.data('tags') || [], reorderTags(tags, priceTags));
				$nprice.data('tags', orderTags);
				if($nprice.attr('spmark') == 0) return;
				if(canFill === true) {
					$nprice.attr('can-fill', 1);
				}
				$nprice.attr('can-fill') == 1 && fillPriceTags($nprice, orderTags);
			}
		};
	}();

	function reaPriceHandleFun(list) {
		var priceMap = {};
		for(var i = 0, len = list.length; i < len; ++i) {
			var pobj = list[i],
				pdom = $('#dp_J_' + pobj.id),
				link = $('#link_' + pobj.id),
				npricedom = $('#nprice_' + pobj.id),
				smMark = link.find('i[tagtype="sam"]'),
				bop = $('#book_op_' + pobj.id),
				spmark = npricedom.attr('spmark'),
				showSp = spmark && spmark == '0',
				upsmark = 15,
				priceTags = [];
			if(pdom.attr('kpl') == 1) {
				pinGou.addSinglePrice(pobj.id, pobj.p);
				continue;
			}
			if(pdom.attr('hrp') == '1' || link.attr('paimai') == '1' || link.attr('yushou') == 1 || showSp) continue;
			if(pdom.length > 0 && pobj.p > 0) {
				pdom.html('&yen; ' + searchCom.priceFormatter(pobj.p));
			} else {
				pdom.html('暂无报价');
			}
			if(bop.length > 0 && pobj.m > 0) {
				bop.html('&yen; ' + pobj.m);
			}
			if(pobj.up) {
				var ups = pobj.up.split(',');
				if(ups.length > 0) {
					switch(ups[0]) {
						case 'tkp':
							pobj.tkp > 0 && (upsmark = 1);
							break;
						case 'sp':
							upsmark = 2;
							break;
						case 'pp':
						case 'tpp':
							((pobj.pp && pobj.pp > 0) || (pobj.tpp && pobj.tpp > 0)) && (upsmark = 4);
							break;
						case 'nup':
							pobj.nup > 0 && (upsmark = 8);
							break;
						case 'stp':
							pobj.stp > 0 && (upsmark = 16);
							break;
					}
				}
			}
			if(!showSp && (upsmark & 1) != 0 && pobj.tkp > 0) {
				npricedom.find('del').addClass('hide');
				priceTags.push({
					type: '专属价',
					width: function($tag, margin) {
						var img = $tag.find('img')[0];
						return(img && img.complete) ? $tag.width() : $tag.width() + 30 + margin;
					},
					dom: '<span class="price_sams" style="color:#FF911C;">&yen;' + pobj.tkp + ' <i class="mod_tag"><img src="//img11.360buyimg.com/jdphoto/s59x22_jfs/t5812/358/4307623656/1656/b618d6ef/594a3b93N00874224.png"></i></span>'
				});
				showSp = true;
			}
			if(!showSp && smMark.length > 0 && (upsmark & 2) != 0) {
				if(pobj.sp && pobj.sp > 0) {
					npricedom.find('del').addClass('hide');
					priceTags.push({
						type: '山姆价',
						width: function($tag, margin) {
							var img = $tag.find('img')[0];
							return(img && img.complete) ? $tag.width() : $tag.width() + 28 + margin;
						},
						dom: '<span class="price_sams">&yen;' + pobj.sp + ' <i class="mod_tag"><img src="//img11.360buyimg.com/jdphoto/s56x28_jfs/t7711/149/2077694997/15813/ed60c12c/59a784b3N9089ca4d.png"></i></span>'
					});
					showSp = true;
					mReport.updateProductClickParams(link, 'sams', 1);
				} else {
					smMark.parents('div.mod_sign_tip').remove();
					mReport.updateProductClickParams(link, 'sams', 2);
				}
			}
			if(!showSp && (upsmark & 8) != 0 && pobj.nup > 0) {
				priceTags.push({
					type: '新人价',
					width: function($tag, margin) {
						var img = $tag.find('img')[0];
						return(img && img.complete) ? $tag.width() : $tag.width() + 30 + margin;
					},
					dom: '<span class="price_fresh">&yen; ' + pobj.nup + ' <i class="mod_tag"><img src="//img11.360buyimg.com/jdphoto/s60x28_jfs/t27901/66/265530648/1420/692fd3e3/5b8ce64aNf6f71e9b.png"></i></span>'
				});
				showSp = true;
			}
			if(!showSp && (upsmark & 16) != 0 && pobj.stp > 0) {
				priceTags.push({
					type: '学生价',
					width: function($tag, margin) {
						var img = $tag.find('img')[0];
						return(img && img.complete) ? $tag.width() : $tag.width() + 30 + margin;
					},
					dom: '<span class="price_student">&yen;' + pobj.stp + ' <i class="mod_tag"><img src="//img11.360buyimg.com/jdphoto/s60x28_jfs/t1/28916/11/8483/1391/5c762b79E99def58d/fc187d0de0f92504.png"></i></span>'
				});
				showSp = true;
			}
			if(!showSp && (upsmark & 4) != 0 && ((pobj.pp && pobj.pp > 0) || (pobj.tpp && pobj.tpp > 0))) {
				var pp = pobj.pp && pobj.pp > 0 ? pobj.pp : pobj.tpp;
				npricedom.find('del').addClass('hide');
				priceTags.push({
					type: 'PLUS价',
					width: function($tag, margin) {
						var img = $tag.find('img')[0];
						return(img && img.complete) ? $tag.width() : $tag.width() + 29 + margin;
					},
					dom: '<span class="price_plus">&yen;' + pp + ' <i class="mod_tag"><img src="//img11.360buyimg.com/jdphoto/s58x28_jfs/t9451/359/415622649/15318/b0943e5d/59a78495N3bd2a9f8.png"></i></span>'
				});
				showSp = true;
				mReport.updateProductClickParams(link, 'plus', 1);
			}
			if(!showSp && pobj.np && pobj.np.type > 0) {
				var now = new Date();
				var npstr;
				if(pobj.np.type == 1) {
					npstr = pobj.np.m > 0 ? '限' + pobj.np.m + '件' : '';
				} else if(pobj.np.type == 2) {
					npstr = pobj.np.s > 0 && pobj.np.e > pobj.np.s ? '限' + ((pobj.np.e - pobj.np.s) / 3600000).toFixed(1) + '小时' : '';
				}
				if(npstr && pobj.np.s < now && pobj.np.e > now) {
					priceTags.push({
						type: '限时限量抢购',
						dom: '<i class="mod_sign_tip bor"><span>' + npstr + '</span></i>'
					});
					link.attr('buy_limit', 1);
				}
			}
			productTag.addPriceTag(pobj.id, priceTags, true);
			if(link.length > 0) {
				var tourl = link.attr('tourl');
				tourl = searchCom.addUrlParam(tourl, 'price', pobj.p, '', true);
				link.attr('tourl', tourl);
			}
			pdom.attr('pri', pobj.p);
			priceMap[pobj.id] = pobj.p;
		}
		return priceMap;
	}

	function reaSummaryHandle(ids, items) {
		for(var i = 0, len = items.length; i < len; ++i) {
			var item = items[i];
			if(~cidConfigs.samCardShopids.indexOf('|' + item.shop_id + '|')) {
				$('#com_' + item.wareid).parent().html('暂无评价').removeClass('hide');
				$('#rate_' + item.wareid).parent().html('').removeClass('hide');
			}
		}
		if(cacheInfo.isBack) {
			reaSummaryHandleFun(cacheInfo.data.comments);
			return;
		}
		var isNeedBlur = false;
		var hcCid1s = window._searchData.searchm.Head.Query.HcCid1s;
		for(var i = 0; i < cidConfigs.blurCommentCid1s.length; i++) {
			if(hcCid1s.indexOf(cidConfigs.blurCommentCid1s[i]) != -1) {
				isNeedBlur = true;
				break;
			}
		}
		if(isNeedBlur) {
			reqCommentHandle(ids);
		} else {
			reqSummaryHandle(ids);
		}
	}

	function reqSummaryHandle(ids) {
		if(ids.length <= 0) return;
		var url = '//club.jd.com/clubservice/summary-m-' + ids.join(',') + '.html?callback=reaSummaryCb';
		window.reaSummaryCb = function(json) {
			cgiMonitor.summaryTimer && window.clearTimeout(cgiMonitor.summaryTimer);
			var list = json.CommentsCount;
			if(!list || list.length <= 0) {
				try {
					JD.report.umpBiz({
						bizid: '775',
						operation: '19',
						result: '0',
						source: '0',
						message: 'info api loaded empty'
					});
				} catch(e) {}
				return;
			}
			try {
				JD.report.umpBiz({
					bizid: '775',
					operation: '17',
					result: '0',
					source: '0',
					message: 'info api loaded'
				});
			} catch(e) {}
			reaSummaryHandleFun(list);
			cacheInfo.data.comments = cacheInfo.data.comments.concat(list);
		};
		cgiMonitor.summaryTimer = window.setTimeout(function() {
			try {
				JD.report.umpBiz({
					bizid: '775',
					operation: '18',
					result: '0',
					source: '0',
					message: 'info api loaded timeout'
				});
			} catch(e) {}
		}, cgiMonitor.timeout);
		ls.loadScript({
			url: url,
			isToken: false,
			setReportUrl: function() {
				return '//club.jd.com/clubservice/summary-m-';
			}
		});
	}

	function reaSummaryHandleFun(list, isBlur) {
		for(var i = 0, len = list.length; i < len; ++i) {
			var $comment = $('#com_' + list[i].SkuId),
				$rate = $('#rate_' + list[i].SkuId),
				$pComment = $comment.parent(),
				$pRate = $rate.parent(),
				comment = list[i].CommentCount,
				rate = list[i].GoodRateShow;
			if(list[i].SensitiveBook == 1) {
				$pComment.addClass('hide');
				$pRate.addClass('hide');
				continue;
			}
			if(comment > 0) {
				if(comment > 100000000) {
					comment = parseInt(comment / 100000000) + '亿';
				} else if(comment > 10000) {
					comment = parseInt(comment / 10000) + '万';
				}
				if(isBlur) {
					comment += (comment + '').length > 1 ? '+' : '';
				}
				$comment.text(cidConfigs.plModify ? '近一年' + comment : comment)
				if(rate > 0) {
					$rate.text(rate);
				} else {
					$pRate.html('');
				}
			} else {
				$pComment.html('暂无评价');
				$pRate.html('');
			}
			$pComment.removeClass('hide');
			$pRate.removeClass('hide');
		}
	}

	function reqCommentHandle(ids) {
		if(ids.length <= 0) return;
		var url = '//wq.jd.com/commodity/comment/getsummarys?callback=resCommentCb&clientType=1&skuids=' + ids.join(',');
		window.resCommentCb = function(json) {
			cgiMonitor.summaryTimer && window.clearTimeout(cgiMonitor.summaryTimer);
			if(json.errcode != 0) {
				try {
					JD.report.umpBiz({
						bizid: '775',
						operation: '17',
						result: '1',
						source: '0',
						message: 'info api failed'
					});
				} catch(e) {}
				return;
			}
			var list = json.result.commentSummaries;
			if(!list || list.length <= 0) {
				try {
					JD.report.umpBiz({
						bizid: '775',
						operation: '19',
						result: '0',
						source: '0',
						message: 'info api loaded empty'
					});
				} catch(e) {}
				return;
			}
			try {
				JD.report.umpBiz({
					bizid: '775',
					operation: '17',
					result: '0',
					source: '0',
					message: 'info api loaded'
				});
			} catch(e) {}
			cacheInfo.data.comments = cacheInfo.data.comments.concat(list);
			reaSummaryHandleFun(list, true);
		}
		cgiMonitor.summaryTimer = window.setTimeout(function() {
			try {
				JD.report.umpBiz({
					bizid: '775',
					operation: '18',
					result: '0',
					source: '0',
					message: 'info api loaded timeout'
				});
			} catch(e) {}
		}, cgiMonitor.timeout);
		ls.loadScript({
			url: url
		});
	}

	function reaPromiseHandle(products, pmap) {
		var filter = searchFilter.getFilterObject();
		if(!pzCgiGray() || !filter.zy211Show) return;
		var skuinfo = [];
		for(var i = 0, len = products.length; i < len; ++i) {
			var p = products[i];
			if(pmap[p.wareid]) {
				skuinfo.push(p.wareid + '|' + p.wareWeight + '|' + pmap[p.wareid]);
			}
		}
		if(skuinfo.length > 0) {
			var url = '//wq.jd.com/bases/searchxg/promiserealtime?callback=reaPromiseCB&skuinfo=' + skuinfo.join(',');
			window.reaPromiseCB = function(json) {
				if(json.retcode == 0) {
					reaPromiseHandleFun(json.skuinfolist);
					cacheInfo.data.promise = cacheInfo.data.promise.concat(json.skuinfolist);
				}
			};
			ls.loadScript({
				url: url,
				isToken: false
			});
		}
	}

	function reaPromiseHandleFun(skuinfoList) {
		for(var i = 0, len = skuinfoList.length; i < len; ++i) {
			var info = skuinfoList[i],
				link = $('#link_' + info.skuid),
				comment = link.find('.search_prolist_comment'),
				zy211Html = '<i class="mod_tag" rd="0-4-1"><img src="//img11.360buyimg.com/jdphoto/s68x28_jfs/t7507/91/1460204614/1824/e64a9c4b/599cf570Ncd27b2f9.png" /></i>',
				zy211 = false;
			if(!link || link.length == 0) continue;
			for(var j = 0, jlen = info.flaglist.length; j < jlen; ++j) {
				if(info.flaglist[j].flag == '1' && !zy211) {
					if(comment && comment.length > 0) {
						comment.before(zy211Html);
					} else {
						$('#comtag_' + info.skuid).prepend(zy211Html);
					}
					zy211 = true;
					mReport.updateProductClickParams(link, '本地仓', 1);
				}
			}
		}
	}

	function reaServiceIco(it) {
		var priceTags = [];
		if(it.isActualServ == '1') {
			priceTags.push('安装服务');
		}
		if(it.freeMark == 1) {
			priceTags.push('免费送装');
		} else if(it.freeMark == 2) {
			priceTags.push('送货上门');
		}
		if(it.freeMark == 3) {
			priceTags.push('商家免邮');
		}
		return priceTags;
	}

	function adAdapter(it) {
		var benefit = it.sku_benefit
		var map = {
			'b4': {
				name: 'pf',
				value: ['5']
			},
			'b32': {
				name: 'secKill',
				value: {
					status: '1'
				}
			}
		}
		var basePromoInfo = {
			wareid: it.wareid,
			pf: [],
			pfdt: {
				t: '',
				m: '',
				j: ''
			},
			secKill: {
				status: ''
			}
		}
		for(var key in benefit) {
			if(!benefit.hasOwnProperty(key)) {
				continue
			}
			if(benefit[key].length && map[key]) {
				var item = map[key]
				if(Array.isArray(item.value)) {
					basePromoInfo[item.name] = basePromoInfo[item.name].concat(item.value)
				} else if(typeof item.value === 'object') {
					$.extend(basePromoInfo[item.name], item.value)
				} else {
					basePromoInfo[item.name] = item.value
				}
			}
		}
		return basePromoInfo
	}

	function reaPromoIco(it) {
		var pdom = $('#nprice_' + it.wareid),
			pfdt = it.pfdt,
			pf = it.pf,
			priceTags = [];
		if(pdom.attr('pro') == 1) return;
		if(pfdt && pfdt.t) {
			var pfstr = '';
			switch(pfdt.t) {
				case '1':
					pfstr = '每满' + pfdt.m + '-' + pfdt.j;
					break;
				case '2':
					pfstr = '满' + pfdt.m + '-' + pfdt.j;
					break;
				case '3':
					pfstr = pfdt.m + '免' + pfdt.j;
					break;
				case '4':
					pfstr = pfdt.m + '元' + pfdt.j + '件';
					break;
				case '5':
					pfstr = pfdt.m + '件' + pfdt.j + '折';
					break;
			}
			if(pfstr) {
				priceTags.push({
					type: '满减详细',
					dom: '<i class="mod_sign_tip bor"><span>' + pfstr + '</span></i>'
				});
			}
		} else if(pf && pf.length > 0) {
			pf = pf.filter(function(o) {
				return o == 4 || o == 5 || o == 58;
			});
			var pfLen = pf.length;
			for(var j = pfLen - 1; j >= 0; --j) {
				var pfval = pf[j],
					pfstr = '';
				switch(pfval) {
					case '4':
						pfstr = '赠豆';
						break;
					case '5':
						pfstr = '赠品';
						break;
					case '58':
						pfstr = '满赠';
						break;
				}
				pfstr && priceTags.push(pfstr);
			}
		}
		if(priceTags.length > 0) {
			pdom.attr('pro', 1);
		}
		return priceTags;
	}

	function resStockAndPriceHandle(product, proids, checkso) {
		if(cacheInfo.isBack) {
			reaStockHandleFun(cacheInfo.data.stocks);
			reaPromiseHandleFun(cacheInfo.data.promise);
			reaPriceHandleFun(cacheInfo.data.prices);
		} else {
			if(proids.length <= 0) return;
			var filter = searchFilter.getFilterObject();
			var areas = filter.areaId.join('_');
			for(var i = filter.areaId.length; i < 4; ++i) {
				areas += '_0';
			}
			var buynums = new Array(proids.length).join('1,') + '1';
			var url = '//wq.jd.com/commodity/skudescribe/get?callback=reaStockAnPriceCb&command=3&source=wqm_search&priceinfo=1&buynums=' + buynums + '&skus=' + proids.join(',') + '&area=' + areas;
			window.reaStockAnPriceCb = function(res) {
				cgiMonitor.stockTimer && window.clearTimeout(cgiMonitor.stockTimer);
				cgiMonitor.priceTimer && window.clearTimeout(cgiMonitor.priceTimer);
				if(!res || res.errcode != 0) return;
				if(res.stockstate && res.stockstate.errcode == 0 && res.stockstate.data) {
					var json = res.stockstate.data;
					var cou = reaStockHandleFun(json);
					cacheInfo.data.stocks = $.extend(true, cacheInfo.data.stocks, json);
					if(cou == 0) {
						try {
							JD.report.umpBiz({
								bizid: '775',
								operation: '22',
								result: '0',
								source: '0',
								message: 'stock api loaded empty'
							});
						} catch(e) {}
					}
					try {
						JD.report.umpBiz({
							bizid: '775',
							operation: '20',
							result: '0',
							source: '0',
							message: 'stock api loaded'
						});
					} catch(e) {}
					checkso && checkSoldoutCount();
					var pmap = {};
					for(var key in json) {
						var val = json[key];
						pmap[key] = (val.d || '-1') + '|' + (val.e || '-1');
					}
					reaPromiseHandle(product, pmap);
				}
				if(res.priceinfo && res.priceinfo.errcode == 0 && res.priceinfo.data) {
					var list = [];
					for(var key in res.priceinfo.data) {
						var it = res.priceinfo.data[key];
						it.id = key;
						list.push(it);
					}
					if(!list || list.length <= 0) {
						try {
							JD.report.umpBiz({
								bizid: '775',
								operation: '16',
								result: '0',
								source: '0',
								message: 'price api loaded empty'
							});
						} catch(e) {}
						return;
					}
					try {
						JD.report.umpBiz({
							bizid: '775',
							operation: '14',
							result: '0',
							source: '0',
							message: 'price api loaded'
						});
					} catch(e) {}
					reaPriceHandleFun(list);
					cacheInfo.data.prices = cacheInfo.data.prices.concat(list);
				}
			};
			cgiMonitor.stockTimer = window.setTimeout(function() {
				try {
					JD.report.umpBiz({
						bizid: '775',
						operation: '21',
						result: '0',
						source: '0',
						message: 'stock api loaded timeout'
					});
				} catch(e) {}
			}, cgiMonitor.timeout);
			cgiMonitor.priceTimer = window.setTimeout(function() {
				try {
					JD.report.umpBiz({
						bizid: '775',
						operation: '15',
						result: '0',
						source: '0',
						message: 'price api loaded timeout'
					});
				} catch(e) {}
			}, cgiMonitor.timeout);
			ls.loadScript({
				url: url,
				isToken: false
			});
		}
	}

	function reaStockHandleFun(json) {
		var cou = 0;
		for(var key in json) {
			var stock = $('#link_' + key),
				val = json[key],
				isYdYg = (parseInt(stock.attr('symbol') || '0', 10) & 48) != 0,
				tempTips = $('#link_' + key + ' .search_prolist_cover span.search_prolist_tip');
			if(val.a == 34) {
				if(tempTips.length == 0) {
					var filter = searchFilter.getFilterObject();
					stock.children('.search_prolist_cover').append('<span class="search_prolist_tip">' + filter.area[0] + '无货</span>');
					stock.attr('soldout', '1');
					stock.find('.search_prolist_buy').remove();
					stock.find('.mod_good_decoration_v3').remove();
				}
			} else if(val.a == 36) {
				if(!stock.attr('yushou')) {
					if(tempTips.length > 0) {
						tempTips.text('预订');
					} else {
						stock.children('.search_prolist_cover').append('<span class="search_prolist_tip color_red">预订</span>');
					}
					stock.attr('soldout', '7');
					stock.find('.mod_good_decoration_v3').remove();
				}
			} else if(!isYdYg) {
				var cc = parseInt(val.c, 10),
					lb = parseInt(stock.attr('lb') || '0', 10);
				if(lb > 1) {
					if(cc > 0 && cc < lb) {
						stock.children('.search_prolist_cover').append('<span class="search_prolist_tip">库存不足</span>');
						stock.find('.search_prolist_buy').remove();
					} else {
						stock.children('.search_prolist_cover').append('<span class="search_prolist_tip">' + lb + '件起售</span>');
					}
					stock.attr('soldout', '2');
				} else if(cc > 0 && cc <= 5) {
					stock.children('.search_prolist_cover').append('<span class="search_prolist_tip">仅剩' + cc + '件</span>');
					stock.attr('soldout', '3');
				}
			}
			cou++;
		}
		return cou;
	}

	function reaReservationHandle(product, checkso) {
		var skuid = [];
		if(cacheInfo.isBack) {
			reaReservationHandleFun(cacheInfo.data.reservats);
		} else {
			for(var i = 0, len = product.length; i < len; ++i) {
				var prod = product[i];
				if(prod.isFsku) continue;
				if((prod.productext & 2) !== 0 || (prod.sku_mark & 4096) !== 0) {
					skuid.push(prod.wareid);
				}
			}
			if(skuid.length === 0) return;
			var url = '//yushou.jd.com/youshouinfoList.action?callback=yoshouCb&sku=' + skuid.join(',') + '&source=' + (isWX ? '1' : '2');
			window.yoshouCb = function(json) {
				reaReservationHandleFun(json);
				cacheInfo.data.reservats = $.extend(true, cacheInfo.data.reservats, json);
				checkso && checkSoldoutCount();
			};
			ls.loadScript({
				url: url,
				isToken: false
			});
		}
		reaReservationPrice(skuid);
	}

	function reaReservationHandleFun(json) {
		for(var key in json) {
			var info = JSON.parse(json[key]),
				tlink = $('#link_' + key),
				isSoldout = !!tlink.attr('soldout'),
				tempTips = $('#link_' + key + ' .search_prolist_cover span.search_prolist_tip');
			if(info.error) continue;
			if(info.state == 1 || info.state == 2) {
				if(tempTips.length > 0) {
					if(isSoldout) {
						tempTips.addClass('color_red');
						tlink.attr('soldout', '4');
					}
					tempTips.text('预约');
				} else {
					$('#link_' + key + ' .search_prolist_cover').append('<span class="search_prolist_tip color_red">预约</span>');
				}
				tlink.attr('yushou', '2');
				mReport.updateProductClickParams(tlink, '预售', 1);
			} else if(info.state == 3 || info.state == 4) {
				if(tempTips.length > 0) {
					if(isSoldout) {
						tempTips.addClass('color_red');
						tlink.attr('soldout', '5');
					}
					tempTips.text('抢购');
				} else {
					$('#link_' + key + ' .search_prolist_cover').append('<span class="search_prolist_tip color_red">抢购</span>');
				}
				tlink.attr('yushou', '3');
			} else {
				if(tempTips.length > 0) {
					if(isSoldout) {
						tempTips.addClass('color_red');
						tlink.attr('soldout', '6');
					}
					tempTips.text('预售');
				} else {
					$('#link_' + key + ' .search_prolist_cover').append('<span class="search_prolist_tip color_red">预售</span>');
				}
				tlink.attr('yushou', '1');
				var $price = $('#dp_J_' + key);
				if(info.ret && info.ret.cp > 0) {
					$price.html('&yen; ' + searchCom.priceFormatter(info.ret.cp));
					tlink.find('.price_sams, .price_fresh, .price_student, .price_plus').remove();
				}
				mReport.updateProductClickParams(tlink, '预售', 2);
			}
			tlink.find('.mod_good_decoration_v3').remove();
			if(info.type == 2 && info.ret.hideRealPrice == 1) {
				var pdom = $('#dp_J_' + key);
				pdom.html('待发布').attr('hrp', 1);
			}
		}
	}

	function reaReservationPrice(skus) {
		if(cacheInfo.isBack) {
			reaReservationPriceFn(cacheInfo.data.reservationPrice);
			return;
		}
		if(!skus || !skus.length) return;
		for(var i = 0, count = Math.ceil(skus.length / 20); i < count; i++) {
			var start = i * 20,
				end = start + 20;
			var url = '//wq.jd.com/commodity/marattr/readattributes?callback=reservationPriceCb&sku=' + skus.slice(start, end).join(',');
			ls.loadScript(url);
		}
		window.reservationPriceCb = function(res) {
			if(res.errcode != 0) return;
			reaReservationPriceFn(res.data);
			cacheInfo.data.reservationPrice = $.extend(true, cacheInfo.data.reservationPrice, res.data);
		};
	}

	function reaReservationPriceFn(data) {
		if(!data) return;
		$.each(data, function(sku, val) {
			if(val == 1) {
				var $price = $('#dp_J_' + sku);
				$price.html('待发布').attr('hrp', 1);
			}
		});
	}

	function reaBookDescHandle(ids) {
		if(cacheInfo.isBack) {
			reaBookDescHandleFun(cacheInfo.data.bookdescs);
		} else {
			if(ids.length <= 0) return;
			var url = '//ad.3.cn/ads/mgets?callback=bookdescCb&source=search_wxsq&skuids=AD_' + ids.join(',AD_');
			window.bookdescCb = function(list) {
				reaBookDescHandleFun(list);
				cacheInfo.data.bookdescs = cacheInfo.data.bookdescs.concat(list);
			};
			ls.loadScript({
				url: url,
				isToken: false
			});
		}
	}

	function reaBookDescHandleFun(list) {
		if(!list || list.length == 0) return;
		for(var i = 0, len = list.length; i < len; ++i) {
			var descobj = $('#book_desc_' + list[i].id.replace('AD_', ''));
			if(descobj) {
				if(list[i].ad) {
					descobj.text(list[i].ad.replace(/<[^>].*?>/g, ''));
				}
			}
		}
	}

	function reaPaimaiHandle(items) {
		var ids = [];
		for(var i = 0, len = items.length; i < len; ++i) {
			var prod = items[i];
			if(inCategoryConfig([prod.cid1, prod.cid2, prod.catid], cidConfigs.pmMarkCids)) {
				ids.push(prod.wareid);
				setPaimaiIcon(prod.wareid);
				prod.isPaimai = true;
			}
		}
		if(ids.length <= 0) return;
		var url = '//wq.jd.com/bases/searchxg/getpaimaiinfo?callback=paimaiinfoCb&skuinfo=' + ids.join('-');
		window.paimaiinfoCb = function(json) {
			if(json.retcode != 0) return;
			reaPaimaiHandleFun(json.skuinfolist);
		};
		ls.loadScript({
			url: url,
			isToken: false
		});
	}

	function reaPaimaiHandleFun(list) {
		for(var i = 0, len = list.length; i < len; ++i) {
			var pm = list[i],
				pdom = $('#dp_J_' + pm.skuid),
				link = $('#link_' + pm.skuid);
			if(pm.price > 0) {
				if(pdom.length > 0) {
					var tempp = (pm.price / 100).toFixed(2);
					pdom.html('&yen; ' + searchCom.priceFormatter(tempp));
				}
			}
			if(pm.paimaitype == '9') {
				link.attr('tourl', '//wqs.jd.com/order/auction_detail.shtml?login=1&auction=' + pm.paimaiid + '&r=' + Math.random());
			} else if(pm.paimaitype == '6' || pm.paimaitype == '7') {
				link.attr('tourl', '//mpaimai.jd.com/man/' + pm.skuid);
			} else if(pm.paimaitype == '5') {
				link.attr('tourl', '//mpaimai.jd.com/' + pm.paimaiid);
			}
		}
	}

	function reaHouseHandle(items) {
		for(var i = 0, len = items.length; i < len; ++i) {
			var prod = items[i];
			if(inCategoryConfig([prod.cid1, prod.cid2, prod.catid], cidConfigs.houseCids)) {
				var link = $('#link_' + prod.wareid);
				link.attr('house', '1');
				link.attr('tourl', '//realestate.m.jd.com/single/' + prod.wareid);
			}
		}
	}

	function reaBaitiaoHandle(items) {
		if(!pzCgiGray()) return;
		var skuInfo = [];
		for(var i = 0, len = items.length; i < len; ++i) {
			var prod = items[i];
			if(!prod.cid2 || !prod.catid || !prod.vender_id) continue;
			skuInfo.push(prod.wareid + ',' + prod.cid2 + ',' + prod.catid + ',' + prod.vender_id + ',' + ((prod.productext & 1024) != 0 ? '1' : '0'));
		}
		if(skuInfo.length <= 0) return;
		var url = '//wq.jd.com/bases/searchxg/GetBaitiaoInfo?callback=baitiaoInfoCb&skuinfo=' + skuInfo.join('-');
		window.baitiaoInfoCb = function(json) {
			if(json.retcode != 0) return;
			reaBaitaioHandleFun(json.skuinfolist);
		};
		ls.loadScript({
			url: url,
			isToken: false
		});
	}

	function reaBaitaioHandleFun(list) {
		for(var i = 0, len = list.length; i < len; ++i) {
			var bt = list[i],
				pdom = $('#nprice_' + bt.skuid),
				spmark = pdom.attr('spmark');
			if((spmark == 0) || pdom.length === 0 || pdom.attr('pro') == 1) continue;
			productTag.addPriceTag(bt.skuid, '分期免息');
		}
	}

	function reaProfitBeltHandle(items) {
		var info = [],
			cou = 1;
		for(var i = 0, len = items.length; i < len; ++i) {
			var prod = items[i];
			var sku = [prod.wareid, (prod.productext & 8192) !== 0 ? 1 : 0, (prod.productext & 16384) !== 0 ? 1 : 0, (prod.productext & 1024) !== 0 ? 1 : 0, prod.isAd ? prod.sku_cid3 : prod.catid, prod.vender_id || 0, parseInt(prod.ico) || 0].join('_');
			info.push(sku);
		}
		while(info.length > 0) {
			var tempInfo = info.slice(0, 10);
			reaProfitBeltHandleGet(tempInfo, cou++);
			info = info.slice(10);
		}
	}

	function reaProfitBeltHandleGet(info, cou) {
		if(info.length == 0) return;
		var url = '//wq.jd.com/bases/waistbandservice/waistband?source=3&callback=profitBeltCb' + cou + '&search=' + info.join(',');
		window['profitBeltCb' + cou] = function(res) {
			if(res.retCode != 0) return;
			if(res.data && res.data.length > 0) {
				reaProfitBeltHandleFun(res.data);
			}
		};
		ls.loadScript({
			url: url,
			isToken: false
		});
	}

	function reaProfitBeltHandleFun(list) {
		for(var i = 0, len = list.length; i < len; ++i) {
			var profit = list[i],
				link = $('#link_' + profit.skuId),
				content = profit.waistBandContent ? profit.waistBandContent.replace(/^\s*|\s*$/g, '') : '',
				images = (profit.waistBandUrl || '').split(','),
				now = new Date();
			if(content && profit.startDate && profit.endDate && profit.forecastDate && profit.forecastDate <= now.getTime()) {
				var $cover = link.find('.search_prolist_cover'),
					symbol = parseInt(link.attr('symbol') || '0', 10),
					soldout = link.attr('soldout');
				if((!soldout || soldout == 2 || soldout == 3) && $cover.find('.mod_good_decoration_belt').length == 0) {
					var st = profit.startDate,
						stDate = new Date(),
						et = profit.endDate,
						etDate = new Date(),
						dateShow = '',
						tempDom = '<div class="mod_good_decoration_belt' + '" st="' + st + '" et="' + et + '"><div class="mod_good_decoration_belt_text' + (listMode == 0 ? ' type_tiny' : '') + '" strlen="' + util.strLenGB(profit.waistBandContent) + '">{#content#}</div></div>';
					$cover.data('bgs', images);
					stDate.setTime(st);
					etDate.setTime(et - 1000);
					if(stDate.getFullYear() == etDate.getFullYear() && stDate.getMonth() == etDate.getMonth() && stDate.getDate() == etDate.getDate()) {
						dateShow = searchCom.formatData(st, 'mm月dd日');
					} else {
						dateShow = searchCom.formatData(st, 'mm.dd') + '-' + searchCom.formatData(et, 'mm.dd');
					}
					var imgHtml = ['<img class="mod_good_decoration_bg_big" src="//img11.360buyimg.com/jdphoto/s372x56_jfs/t14374/234/2347858293/24951/c67420ac/5a97a5f9Nabc93498.png">', '<img class="mod_good_decoration_bg_small" src="//img11.360buyimg.com/jdphoto/s250x42_jfs/t15208/71/2379869928/13378/734d11fa/5a97a5f6N6d8c533a.png">'];
					if((symbol & 32) != 0) {
						var $decoration = $cover.find('.mod_good_decoration_v3'),
							$circle = $cover.find('.mod_good_decoration_circle'),
							cst = $circle.attr('st'),
							cet = $circle.attr('et');
						if(!compareYgYdTimes(cst, cet, st, et)) {
							$circle.remove();
							content += '<span mark="ydtime">(' + dateShow + ')</span>';
							symbol ^= 32;
						} else {
							if(images.length >= 8) {
								imgHtml = ['<img class="mod_good_decoration_bg_big" src="' + images[6].replace(/^http(s)?:/, '') + '">', '<img class="mod_good_decoration_bg_small" src="' + images[7].replace(/^http(s)?:/, '') + '">'];
								$circle.find('.mod_good_decoration_circle_bg').remove();
							}
						}
						$decoration.append(imgHtml.join(''), tempDom.replace('{#content#}', content));
					} else {
						if(images.length >= 8) {
							imgHtml = ['<img class="mod_good_decoration_bg_big" src="' + images[3].replace(/^http(s)?:/, '') + '">', '<img class="mod_good_decoration_bg_small" src="' + images[4].replace(/^http(s)?:/, '') + '">'];
						}
						tempDom = '<div class="mod_good_decoration_v3">' + imgHtml.join('') + tempDom + '</div>';
						content += '<span mark="ydtime">(' + dateShow + ')</span>';
						$cover.append(tempDom.replace('{#content#}', content));
					}
					link.attr('symbol', symbol ^ 16);
					setYdYdFontSize(link);
					$cover.find('.search_prolist_tip').remove();
					mReport.updateProductClickParams(link, '腰带', 1);
				}
			}
		}
	}

	function setYdYdFontSize(link) {
		var beltDom = link.find('.mod_good_decoration_belt_text');
		if(beltDom.length === 0) return;
		var symbol = parseInt(link.attr('symbol') || '0', 10),
			strLen = beltDom.attr('strlen'),
			fsize1 = 11,
			fsize2 = 8;
		if((symbol & 16) !== 0) {
			if((symbol & 32) !== 0) {
				if(strLen <= 18) {
					fsize1 = 11;
					fsize2 = 7
				} else {
					fsize1 = 10;
					fsize2 = 6;
				}
				beltDom.css('text-align', '');
			} else {
				if(strLen <= 18) {
					fsize1 = 11;
					fsize2 = 8
				} else {
					fsize1 = 11;
					fsize2 = 7;
				}
				beltDom.css('text-align', 'center');
			}
			beltDom.css('font-size', (listMode == 0 ? fsize2 : fsize1) + 'px');
			beltDom.attr('fsize1', fsize1).attr('fsize2', fsize2);
		}
	}

	function changeBeltTextFontSize() {
		if(listMode == 0) {
			$('.mod_good_decoration_belt_text,.mod_good_decoration_belt_text_v2').each(function(ind, item) {
				var tar = $(item);
				tar.addClass('type_tiny');
				tar.css('font-size', tar.attr('fsize2') + 'px');
			});
		} else {
			$('.mod_good_decoration_belt_text,.mod_good_decoration_belt_text_v2').each(function(ind, item) {
				var tar = $(item);
				tar.removeClass('type_tiny');
				tar.css('font-size', tar.attr('fsize1') + 'px');
			});
		}
	}

	function compareYgYdTimes(st, et, bst, bet) {
		var st1 = new Date(st * 1000),
			st2 = new Date(et * 1000),
			st3 = new Date(bst * 1000),
			st4 = new Date(bet * 1000);
		return st1.getFullYear() == st3.getFullYear() && st1.getMonth() == st3.getMonth() && st1.getDate() == st3.getDate() && st2.getFullYear() == st4.getFullYear() && st2.getMonth() == st4.getMonth() && st2.getDate() == st4.getDate();
	}
	var itemSimilar = function() {
		var $similar = null;
		var inSimilarConfig = function() {
			var cid1 = (window._searchData.searchm.Head.Query.HcCid1s || '').split(';')[0];
			return cidConfigs.findSimilarCid1s.indexOf('|' + cid1 + '|') > -1;
		}();

		function getSimilars(sku) {
			if(!sku) return;
			var recommendId = 6151;
			var url = '//wqcoss.jd.com/mcoss/reclike/getrecinfo?callback=divinerCb&pi=1&pc=6&recpos=' + recommendId + '&sku=' + sku;
			ls.loadScript({
				url: url
			});
			window.divinerCb = function(res) {
				if(!res || !res.success) {
					return;
				};
				var $item = $('#link_' + sku);
				if(!$item.parent().hasClass('item_longcover')) return;
				var list = (res.data || []).map(function(item) {
					return {
						sku: item.sku,
						img: getImgUrl(item.img, '170x170'),
						price: item.jp,
						url: '//item.m.jd.com/product/' + item.sku + '.html?price=' + item.jp + '&fs=1'
					};
				}).slice(0, 6);
				if(list.length != 6) return;
				var price = JD.url.getUrlParam('price', $item.attr('tourl')) || '';
				origin = {
					sku: sku,
					img: getImgUrl($item.find('.photo').attr('init_src'), '170x170'),
					url: '//home.m.jd.com/myjd/similar/list.action?sceneid=16&skuId=' + sku + '&jp=' + price + '&key=' + keyword
				};
				var isAnimate = cachev1.session.getItem(keyword + '_itemSimilar_noAnimate') != 1;
				cachev1.session.removeItem(keyword + '_itemSimilar_noAnimate');
				$similar = $($formatJson('itemSimilarTpl', {
					list: list,
					origin: origin,
					isAnimate: isAnimate
				}));
				$item.after($similar);
				bindEvent();
				getPrice(list);
			};
		}

		function getImgUrl(img, size) {
			if(!/^\/\/|^https?/.test(img)) {
				img = '//img13.360buyimg.com/n2/' + img;
			}
			if(/\d+x\d+/.test(img)) {
				img = img.replace(/\d+x\d+/g, size);
			} else {
				img = img.replace(/(\/[nN]\d+\/)([^\/]*)/, '$1s' + size + '_$2');
			}
			return searchCom.getScaleImg(img, false, size, true);
		}

		function getPrice(list) {
			var skus = list.map(function(item) {
				return item.sku;
			});
			var filter = searchFilter.getFilterObject();
			var url = '//pe.3.cn/prices/pcpmgets?callback=getItemSimilarPriceCb&source=wxsqitemsou&ext=11&&origin=' + (isWX ? 5 : 4) + '&skuids=' + skus.join(',') + '&area=' + (filter.areaId ? filter.areaId.join('_') : '');
			ls.loadScript(url);
			window.getItemSimilarPriceCb = function(data) {
				if(!data || data.length <= 0) {
					return;
				}
				data.forEach(function(item) {
					if(item.p) {
						$similar.find('[data-sku="' + item.id + '"] span').text('¥' + item.p);
					}
				});
			};
		}

		function bindEvent() {
			$similar.on('click', '.similar_close', function() {
				$similar.remove();
			});
			$similar.on('click', '.similar_item', function() {
				var $elem = $(this),
					url = $elem.attr('tourl');
				if(!url) return;
				var $item = $elem.parents('.search_prolist_item').find('.search_prolist_item_inner'),
					pos = $item.attr('pos');
				cacheItems(pos);
				cachev1.session.setItem(keyword + '_itemSimilar_noAnimate', 1, true, 600);
				window.location.href = url;
			});
		}
		return {
			show: function(pos) {
				if(!gray('ITEM_SIMILAR') || !pos) return;
				if(listMode == 1 && inSimilarConfig) {
					var $item = $('.search_prolist_item_inner[pos="' + pos + '"]'),
						ad = $item.attr('ad'),
						$parent = $item.parent(),
						sku = $parent.attr('skuid');
					if(ad == 1) return;
					if(!$parent.hasClass('item_longcover')) return;
					if($parent.children('.search_prolist_item_similar').length) {
						return;
					} else {
						$('.search_prolist_item_similar').remove();
					}
					getSimilars(sku);
				}
			},
			hide: function() {
				$similar && $similar.remove();
			}
		};
	}();

	function reaAddCartItem(items) {
		if(!cidConfigs.addCarCids[0] && !cidConfigs.addCarCids[1] && !cidConfigs.addCarCids[2]) return;
		for(var i = 0, len = items.length; i < len; ++i) {
			var prod = items[i];
			if((prod.productext & 1024) !== 0 && (prod.sku_mark & 4096) !== 0) continue;
			if(JD.device.scene !== 'wxwork' && inCategoryConfig([prod.cid1, prod.cid2, prod.catid], cidConfigs.addCarCids)) {
				var infoDom = $('#link_' + prod.wareid + ' div.search_prolist_info');
				var $shop = infoDom.find('.search_prolist_shop');
				infoDom.append('<div rd="0-4-8" skuid="' + prod.wareid + '" class="search_prolist_buy color_red2"></div>');
				var secondHand = infoDom.find('.search_prolist_secondHand');
				if(secondHand.length) {
					secondHand.remove();
					$shop.removeClass('with_secondHand');
				}
				$shop.addClass('with_padding');
				mAside.showCart();
			}
		}
	}

	function isInPinzhuan(args) {
		args = args || {}
		var ad = window._searchData.shopadpos && window._searchData.shopadpos[0]
		if(!ad) return false
		if(ad.show_type != 2) return false
		var pinzhuanSp = ad.style_type == 6 || ad.style_type == 8 || ad.style_type == 7
		var normal = ad.style_type == 5
		return args.sp ? pinzhuanSp : (pinzhuanSp || normal)
	}

	function initShopThrough() {
		var ad = window._searchData.shopadpos && window._searchData.shopadpos[0];
		if(ad && window._searchData.shop == 3) {
			var kshop = $('#keyshop');
			if(isInPinzhuan({
					sp: true
				})) {
				$('#searchHeadFixer .mod_searchbar').removeClass('skin_2');
				$('#searchHeadFixer .mod_searchbar').addClass('skin_pinzhuan_special');
				resetSearchHeadwh()
				if(ad.style_type == 7) {
					pinzhuanSPSlider()
				}
			} else if(ad.show_type == 2) {
				slider.init({
					wrap: kshop.find('.pz_imgs'),
					tabs: kshop.find('.pz_btns li')
				});
			}
			var tags = [];
			ad.has_newware == 1 && tags.push('上新');
			ad.has_promotion == 1 && tags.push('满减');
			ad.has_coupon == 1 && tags.push('优惠券');
			shopTag.fillTags(kshop.find('[shoptag="' + ad.vender_id + '"]'), tags, 'ad');
			searchCom.samReport(ad.exposal_url);
			var ptag = ad.show_type == 2 ? '37024.30.2' : '37024.30.1';
			window.wa && window.wa('ptagExposure', {
				ptag: ptag,
				venderid: ad.vender_id
			});
		} else {
			oShopThrough();
		}
	}
	var slider = function() {
		var $wrap, $items, $tabs, tabActiveClass, current;

		function prepare() {
			$items.each(function(i) {
				var $item = $(this)
				i == 0 ? $item.show() : $item.hide();
			});
		}

		function slide(next) {
			if(current == next) return;
			var direction = current < next ? 1 : -1;
			next = (next + $items.length) % $items.length;
			clear($items.eq(current), true);
			clear($items.eq(next), false);
			clearTimeout(slide.timeout);
			slide.timeout = setTimeout(function() {
				var animate = {
					'transition': 'transform .5s',
					'-webkit-transition': '-webkit-transform .5s',
					'transform': 'translateX(' + (-direction * 100) + '%) translateZ(0)',
					'-webkit-transform': 'translateX(' + (-direction * 100) + '%) translateZ(0)'
				};
				$items.eq(next).css({
					'display': 'block',
					'left': (direction * 100) + '%'
				});
				slide.timeout = setTimeout(function() {
					$items.eq(current).css(animate);
					$items.eq(next).css(animate);
					$tabs.eq(current).removeClass(tabActiveClass);
					$tabs.eq(next).addClass(tabActiveClass);
					current = next;
				}, 25);
			}, 25);
		}

		function clear($item, isShow) {
			$item.css({
				'transition': '',
				'-webkit-transition': '',
				'transform': '',
				'-webkit-transform': '',
				'left': '',
				'display': isShow ? 'block' : 'none'
			});
		}

		function bindEvent() {
			$tabs.on('click', function() {
				var $tab = $(this);
				if($tab.hasClass(tabActiveClass)) return;
				var next = $tab.index();
				slide(next);
				auto();
			});
		}

		function auto() {
			clearTimeout(auto.timeout);
			auto.timeout = setTimeout(function() {
				slide(current + 1);
				auto();
			}, 3000);
		}
		return {
			init: function(opts) {
				$wrap = opts.wrap;
				$items = $wrap.children();
				if($items.length <= 1) return;
				$tabs = opts.tabs;
				tabActiveClass = opts.tabActiveClass || 'active';
				current = 0;
				prepare();
				bindEvent();
				auto();
				$tabs.css('width', 0);
			}
		}
	}();

	function pinzhuanSPSlider() {
		var kshop = $('#keyshop');
		var $bkImg = kshop.find('.pinzhuan_special_main .pz_sp_imgs li')
		var $img = kshop.find('.pinzhuan_special_main .pz_imgs li')
		var $tabs = kshop.find('.pz_btns li')
		var intervalId = null
		var count = 1
		var length = $bkImg.length
		startAnimation()
		$tabs.on('click', function(e) {
			var targetIndex = $(e.currentTarget).index()
			changeCls(targetIndex, (count - 1) % length)
			count = targetIndex + 1
			startAnimation()
		});

		function startAnimation() {
			clearInterval(intervalId)
			intervalId = setInterval(function() {
				changeCls()
				count++
			}, 3000);
		}

		function changeCls(focusIndex, blurIndex) {
			var focusIndex = typeof focusIndex != 'undefined' ? focusIndex : count % length
			var blurIndex = typeof blurIndex != 'undefined' ? blurIndex : (count - 1) % length
			$tabs.removeClass('active')
			$img.removeClass('focus').removeClass('blur')
			$bkImg.removeClass('focus').removeClass('blur')
			$bkImg.eq(focusIndex).addClass('focus')
			$img.eq(focusIndex).addClass('focus')
			$tabs.eq(focusIndex).addClass('active')
			$bkImg.eq(blurIndex).addClass('blur')
			$img.eq(blurIndex).addClass('blur')
		}
	}

	function oShopThrough() {
		if(!window._searchData) return;
		var kshop = $('#keyshop'),
			kids = [],
			shopList = window._searchData.searchm.ObjC_NumberCollection.shop_list;
		if(shopList.length > 0) {
			for(var i = 0, slen = shopList.length; i < slen; ++i) {
				kids.push(shopList[i].vender_id);
			}
		} else if(window._searchData.venderId) {
			kids.push(window._searchData.venderId);
		}
		if(kids.length === 0) return;
		kids = kids.slice(0, 1);
		var url = '//wq.jd.com/mshop/BatchGetShopInfoByVenderId?callback=shopInfoCb&venderIds=' + kids.join(',');
		window.shopInfoCb = function(json) {
			if(json.errcode != 0 || json.data.length == 0) {
				kshop.addClass('hide');
				return;
			}
			var sbList = [],
				sList = [];
			var venderIds = [];
			for(var i = 0, len = json.data.length; i < len; ++i) {
				var item = json.data[i],
					shopInfo = item.shopInfo;
				hackShopInfo(shopInfo)
				if(item.shopId == '0') {
					return;
				}
				var defBanner = (!!~shopInfo.fPicUrl.indexOf('/cube_template/template2/img/') || !!~shopInfo.fPicUrl.indexOf('//img11.360buyimg.com/jshopm/jfs/t1198/177/246925151/74805/ab73d78b/550ffd76Nf0a0bb07.png'));
				shopInfo.shopId = item.shopId;
				shopInfo.name = shopInfo.shopName;
				shopInfo.inShort = shopInfo.brief;
				shopInfo.squareLogo = item.isDefaultSquareLogo == 0 ? item.squareLogo : '';
				shopInfo.rectLogo = item.rectLogo;
				shopInfo.totalScore = shopInfo.isZy == '1' ? 10 : parseFloat(shopInfo.totalScore).toFixed(1);
				if(shopInfo.totalScore >= 10) {
					shopInfo.totalScore = 10;
				}
				shopInfo.shopFansNum = parseInt(shopInfo.shopFansNum, 10);
				if(shopInfo.shopFansNum) {
					shopInfo.shopFansNumStr = (shopInfo.shopFansNum >= 10000 ? parseInt(shopInfo.shopFansNum / 10000) + '万' : shopInfo.shopFansNum) + '人关注';
				} else {
					shopInfo.shopFansNumStr = '暂无人关注';
				}
				if(shopInfo.isZy != '1') {
					if(item.commonGoodShopCode == 1) {
						shopInfo.gshopIcon = '//img11.360buyimg.com/jdphoto/s112x28_jfs/t14554/205/1842763392/2625/f44cdabc/5a5c7090Ne9b78604.png';
					} else if(item.categoryGoodShopCode == 1002) {
						shopInfo.gshopIcon = '//img11.360buyimg.com/jdphoto/s112x28_jfs/t15673/79/1640911352/5197/3171e6ff/5a5c7076N82df55a4.png';
					} else if(item.scoreRankRateGrade) {
						shopInfo.stars = [];
						var score = parseInt(item.scoreRankRateGrade * 100);
						if([250, 300, 350, 400, 450, 490].indexOf(score) != -1) {
							for(var n = 0; n < 5; n++) {
								if(score >= 100) {
									shopInfo.stars.push(100);
								} else if(score == 90 || score == 50) {
									shopInfo.stars.push(score);
								} else {
									shopInfo.stars.push(0);
								}
								score = score - 100;
							}
						}
					}
				}
				sList.push(shopInfo);
				if(shopInfo.fPicUrl && !defBanner) {
					sbList.push(shopInfo);
				}
				venderIds.push(shopInfo.venderId);
			}
			if(sList.length == 0) {
				kshop.addClass('hide');
				return;
			}
			if(window._searchData.shopShowCarousel != '1' && sbList.length > 1) {
				sbList = sbList.slice(0, 1);
			}
			window._searchData.shop = 2;
			if($(window).height() > 510 && sbList.length > 0) {
				window._headModuleShow.shop = 2;
				kshop.html($formatJson('keyshopTpl2', {
					shopList: sbList
				})).removeClass('hide');
				shopTag.addTags(venderIds);
				if(sbList.length > 1) {
					window._headModuleShow.shop = 4;
					var sitems = $('#keyshop .search_shoplnk_v2_inner .search_shoplnk_v2_item');
					loopScroll.init({
						tp: 'text',
						viewDom: sitems.eq(0),
						moveDom: $('#keyshop .search_shoplnk_v2_inner'),
						moveChild: sitems,
						tab: $('#keyshop .search_shoplnk_v2_dot i'),
						tabClass: 'on',
						lockScrY: true,
						loopScroll: true,
						autoTime: 3000,
						index: 1
					});
				}
				if(window._headModuleShow.topBanner == 4) {
					$('#keyshop div.search_shoplnk_v2_dot').addClass('hide');
					$('.search_shoplnk_v2_slider').addClass('simple_slider');
				} else {
					$('#topBranner').addClass('hide');
				}
				$('#brandOutBlock').addClass('hide');
				$('#carBlock').addClass('hide');
				$('#newuserCoupon').addClass('hide');
				bookauthor.hide();
				window.wa && window.wa('ptagExposure', {
					ptag: '37024.12.1',
					scroll: sbList.length,
					venderid: sbList.map(function(a) {
						return a.venderId;
					}).join(',')
				});
			} else {
				window._headModuleShow.shop = 1;
				kshop.html($formatJson('keyshopTpl', sList[0]));
				shopTag.addTags(venderIds);
				window.wa && window.wa('ptagExposure', {
					ptag: '37024.12.1',
					venderid: sList[0].venderId
				});
			}
			resetSearchHeadwh();
		};
		ls.loadScript({
			url: url,
			isToken: false
		});

		function hackShopInfo(shopInfo) {
			var zyVenderIdArr = ['603837', '663284']
			if(zyVenderIdArr.indexOf(shopInfo.venderId) > -1) {
				shopInfo.isZy = '1'
			}
		}
	}
	var shopTag = function() {
		var priority = {
			ad: [{
				type: '上新',
				dom: '<i class="mod_sign_tip bor"><span>上新</span></i>'
			}, {
				type: '满减',
				dom: '<i class="mod_sign_tip bor"><span>满减</span></i>'
			}, {
				type: '优惠券',
				dom: '<i class="mod_sign_tip bor"><span>优惠券</span></i>'
			}],
			normal: [{
				type: '优惠券',
				dom: '<i class="mod_sign_tip bor"><span>优惠券</span></i>'
			}, {
				type: '上新',
				dom: '<i class="mod_sign_tip bor"><span>上新</span></i>'
			}, {
				type: '秒杀',
				dom: '<i class="mod_sign_tip bor"><span>秒杀</span></i>'
			}, {
				type: '满减',
				dom: '<i class="mod_sign_tip bor"><span>满减</span></i>'
			}, {
				type: '促销',
				dom: '<i class="mod_sign_tip bor"><span>促销</span></i>'
			}]
		};
		var getWrap = function(venderId) {
			var $kshop = $('#keyshop');
			return $kshop.find('[shoptag="' + venderId + '"]');
		};

		function calcMaxWidth($wrap) {
			if($wrap.css('display') === 'block') {
				return $wrap.width();
			}
			var $siblings = $wrap.siblings(),
				$parent = $wrap.parent();
			var othersWidth = 10;
			for(var i = 0; i < $siblings.length; i++) {
				othersWidth += $siblings.eq(i).width();
			}
			var maxWidth = $parent.width() - othersWidth;
			$wrap.css('maxWidth', maxWidth);
			return maxWidth;
		}

		function fillTags($wrap, tags, type) {
			if(!tags || !tags.length) {
				!$wrap.children().length && $wrap.hide();
				return;
			}
			$wrap.show();
			var constTags = priority[type || 'normal'];
			for(var i = 0; i < constTags.length; i++) {
				var tag = constTags[i];
				if(tags.indexOf(tag.type) != -1) {
					var $tag = $(tag.dom);
					$tag.attr('order', i);
					insertTag($wrap, $tag);
				}
			}
			var maxWidth = parseInt($wrap.css('maxWidth')) || calcMaxWidth($wrap) || $wrap.parent().width();
			var maxTimes = 10;
			while($wrap.width() > maxWidth && maxTimes > 0) {
				maxTimes--;
				var $tags = $wrap.find('> [order]');
				$tags.eq($tags.length - 1).remove();
			}
		}

		function insertTag($wrap, $tag) {
			if($wrap.find('[order="' + $tag.attr('order') + '"]').length) return;
			var $tags = $wrap.find('> [order]');
			for(var j = 0; j < $tags.length; j++) {
				if($tags.eq(j).attr('order') > $tag.attr('order')) {
					$tags.eq(j).before($tag);
					break;
				}
			}
			if(j === $tags.length) {
				$wrap.append($tag);
			}
		}

		function getShopTags(venderIds) {
			var url = '//wq.jd.com/user/msgcenter/QueryMsgByVenderIds?callback=getShopTags&venderId=' + venderIds.join(',');
			ls.loadScript(url);
			window.getShopTags = function(res) {
				var tagsMap = {
					27: '秒杀',
					10: '上新',
					26: '满减',
					25: '促销'
				};
				if(res.iRet == 0) {
					var list = res.data || [];
					list.forEach(function(item) {
						var tags = [];
						for(var tagNum in tagsMap) {
							if(tagsMap.hasOwnProperty(tagNum) && item.msgType.indexOf(tagNum) != -1) {
								tags.push(tagsMap[tagNum]);
							}
						}
						fillTags(getWrap(item.venderId), tags);
					});
				}
			};
		}

		function queryCoupon(venderIds) {
			var url = '//wq.jd.com/mshop/BatchQueryCoupon?callback=queryCoupon&venderId=' + venderIds.join(',');
			ls.loadScript(url);
			window.queryCoupon = function(res) {
				if(res.errcode == 0) {
					var list = res.data || [];
					list.forEach(function(item) {
						var tags = [];
						if(item.couponInfo.length > 0) {
							tags.push('优惠券');
						}
						fillTags(getWrap(item.venderId), tags);
					});
				}
			}
		}
		return {
			fillTags: fillTags,
			addTags: function(venderIds, getWrapCb) {
				$.isFunction(getWrapCb) && (getWrap = getWrapCb);
				getShopTags(venderIds);
				queryCoupon(venderIds);
			}
		};
	}();

	function lessOrEmptyResult() {
		if(result.summary.ResultCount == 0 || result.summary.ResultCount <= pageInfo.pagesize) {
			var filter = searchFilter.getFilterObject();
			var userpin = JD.cookie.get('pin') || '',
				jdas = (JD.cookie.get('__jda') || '').split('.'),
				uuid = jdas.length > 1 ? jdas[1] : '';
			var client = pageScene ? 'app' : (isWX ? 'wx' : 'qq');
			var url = '//qpsearch.jd.com/relationalSearch?callback=relationalSearchCb&ver=auto&keyword=' + encodeURIComponent(keyword) + '&client=' + client + '&pvid=' + (JD.cookie.get("visitkey") || '0') + '&userpin=' + userpin + '&uuid=' + uuid + '&area=' + filter.areaId2.join('-');
			window.relationalSearchCb = function(str) {
				var strs = str.split('^^');
				if(strs.length > 1 && strs[1]) {
					var recowordBlock = $('#recowordBlock'),
						keys = strs[1].replace(/\*+$/, '').split('*'),
						html = tpl.child_recowordTpl({
							list: keys,
							cou: keys.length,
							v: strs[0]
						});
					recowordBlock.html(html);
					recowordBlock.removeClass('hide');
					recowordBlock.on('click', 'a', function(e) {
						var tar = $(this),
							key = tar.attr('key');
						if(location.hostname === 'so.m.jd.com') {
							location.href = '//so.m.jd.com/ware/search.action?keyword=' + encodeURIComponent(key) + '&searchFrom=home';
						} else {
							location.href = '//wqsou.jd.com/search/searchn?key=' + encodeURIComponent(key) + '&sf=8&as=0';
						}
					});
					$('#sNull01 .small').addClass('hide');
					if(!$('#noMoreTips').hasClass('hide')) {
						$('#noMoreTips').addClass('hide');
						recowordBlock.css('margin-top', '20px');
					}
					window.wa && window.wa('ptagExposure', {
						ptag: '37024.14.1'
					});
					mReport.exposeRecommend();
				}
			};
			ls.loadScript({
				url: url,
				isToken: false
			});
		}
	}

	function reaSingleItem() {
		if(!window._searchData || !window._searchData.singleItem) return;
		var prod = window._searchData.singleItem;
		var inmap = itemIdMap[prod.skuid];
		if(inmap == 2) {
			return;
		}
		var firstDom = $('.search_prolist>div').first(),
			firstInner = firstDom.children('div.search_prolist_item_inner');
		if(firstInner.attr('ad') == '1') {
			firstDom = $('.search_prolist>div').eq(1);
			firstInner = firstDom.children('div.search_prolist_item_inner');
		}
		var firstInd = firstInner.attr('ind'),
			tarDom = null,
			tarInner = null;
		if(firstDom.attr('skuid') == prod.skuid) {
			return;
		}
		itemIdMap[prod.skuid] = 3;
		if(inmap == 1) {
			tarDom = $('.search_prolist>div[skuid="' + prod.skuid + '"]');
		} else {
			itemIdMap.length += 1;
			prod.Content = {
				'author': prod.author,
				'imageurl': prod.picUrl.replace(/\/\/img\d+\.360buyimg\.com\/n\d\//, ''),
				'long_image_url': '',
				'shop_name': '',
				'warename': prod.name,
				'CustomAttrList': '',
				'shortWarename': ''
			};
			prod.catid = prod.cid3;
			prod.commentcount = '';
			prod.dredisprice = prod.price;
			prod.good = '';
			prod.hotscore = '';
			prod.hprice = '';
			prod.shop_id = '';
			prod.vender_id = '';
			prod.wareid = prod.skuid;
			prod.ind = 1;
			prod.page = 1;
			prod.cgind = 1;
			prod.rd = '0-4-1';
			prod.ifad = adsInfo.ifad;
			prod.ver = adsInfo.verval;
			prod.eventid = adsInfo.evenid;
			prod.lpmark = cidConfigs.lpmatch ? '1' : '0';
			prod.longImg = prod.lpmark == '1' && listMode == '1';
			tarDom = $(tpl.child_itemV2Tpl.call(tplFn, prod));
		}
		tarInner = tarDom.children('div.search_prolist_item_inner');
		tarDom.attr('single', '1');
		tarInner.attr('ind', firstInd);
		tarInner.attr('pos', firstInd);
		var firstDomClone = firstDom.clone();
		firstDom.replaceWith(tarDom);
		firstDomClone.insertAfter(tarDom);
		$('.search_prolist>div').each(function(ind, item) {
			var tar = $(item),
				tarInner = tar.children('div.search_prolist_item_inner'),
				ad = tarInner.attr('ad'),
				pos = ind + 1;
			tarInner.attr('ind', pos);
			tarInner.attr('pos', pos);
			if(ad == '1') {
				var order = parseInt(tar.attr('order'), 10) - 1;
				if(ind > order) {
					var preDom = $('.search_prolist>div').eq(order),
						perInner = preDom.children('div.search_prolist_item_inner');
					perInner.attr('ind', pos);
					perInner.attr('pos', pos);
					tarInner.attr('ind', order + 1);
					tarInner.attr('pos', order + 1);
					var perDomClone = preDom.clone();
					preDom.replaceWith(tar.clone());
					tar.replaceWith(perDomClone);
				}
			}
		});
	}

	function checkSoldoutCount() {
		isBothStockAndYuyueLoad += 1;
		var filter = searchFilter.getFilterObject();
		if(filter.redisstore == '1' || isBothStockAndYuyueLoad < 2) return;
		var dlist = $('#itemList div.search_prolist_item_inner'),
			cou = 0;
		for(var i = 0, len = dlist.length; i < len && i < 3; ++i) {
			if($(dlist[i]).attr('soldout') == '1') {
				cou++;
			}
		}
		if(cou >= 3) {
			cachev1.local.setItem('search_soldout_re', {
				key: keyword,
				val: 1
			}, 9999);
			if(window._searchEggInfo && window._searchEggInfo.animshowFalg) {
				JD.store.setValue(window._searchEggInfo.animshowFalg, '1', -1, function(a, b) {}, location.host);
				window._searchEggInfo.needReflash = true;
			}
			if(window._searchHbEggInfo && window._searchHbEggInfo.animshowFalg) {
				JD.store.setValue(window._searchHbEggInfo.animshowFalg, '1', -1, function(a, b) {}, location.host);
				window._searchHbEggInfo.needReflash = true;
			}
			filter.redisstore = '1';
			searchByFilter();
		}
	}

	function initSkuSearchInfo() {
		var searchm = window._searchData.searchm,
			summary = searchm.Head.Summary,
			product = searchm.Paragraph,
			len = product.length;
		if(len > 0 && window._searchData.rewrite.hasSkuTop == 1) {
			var it = product[0];
			if(it.wareid == keyword) {
				it.isFsku = true;
			}
			if(summary.Page.PageSize == 0) {
				summary.Page = {
					"PageCount": "1",
					"PageIndex": "1",
					"PageSize": "10"
				};
			}
			summary.OrgSkuCount = parseInt(summary.OrgSkuCount, 10) + 1;
			summary.ResultCount = parseInt(summary.ResultCount, 10) + 1;
			$('#sNull01').addClass('hide');
			$('#searchResBlock').removeClass('hide');
		}
	}

	function initCategoryConfigs() {
		if(window._searchData) {
			var searchm = window._searchData.searchm;
			if(searchm && searchm.Head && searchm.Head.Query && searchm.Head.Query.HcCid1s) {
				var cid1 = searchm.Head.Query.HcCid1s.split(';')[0];
				window._jdApp && (window._jdApp.category = cid1);
				result.hcCid1 = cid1;
			}
			if(searchm && searchm.Head && searchm.Head.Query && searchm.Head.Query.HcCid2s) {
				var cid2 = searchm.Head.Query.HcCid2s.split(';')[0];
				result.hcCid2 = cid2;
			}
			if(searchm && searchm.Head && searchm.Head.Query && searchm.Head.Query.HcCid3s) {
				var cid3 = searchm.Head.Query.HcCid3s.split(';')[0];
				result.hcCid3 = cid3;
			}
		}
		var hcCids = [result.hcCid1 || '', result.hcCid2 || '', result.hcCid3 || ''];
		var category = window._categoryInfo;
		var filter = searchFilter.getFilterObject();
		if(category) {
			if(category.length > 0) {
				cidConfigs.addCarCids = [category[0].cid1s, category[0].cid2s, category[0].cid3s];
			}
			if(category.length > 1) {
				cidConfigs.ydMarkCids = [category[1].cid1s, category[1].cid2s, category[1].cid3s];
			}
			if(category.length > 2) {
				var tCids = [category[2].cid1s, category[2].cid2s, category[2].cid3s];
				if(inCategoryConfig(hcCids, tCids)) {
					cidConfigs.sTitle = true;
				}
			}
			if(category.length > 3) {
				var carCids = [category[3].cid1s, category[3].cid2s, category[3].cid3s];
				if(inCategoryConfig(hcCids, carCids)) {
					searchFilter.showCarkeeper();
				}
			}
			if(category.length > 5) {
				cidConfigs.pmMarkCids = [category[5].cid1s, category[5].cid2s, category[5].cid3s];
			}
			if(category.length > 6) {
				var plCids = [category[6].cid1s, category[6].cid2s, category[6].cid3s];
				if(inCategoryConfig(hcCids, plCids)) {
					cidConfigs.plModify = true;
				}
			}
			if(category.length > 7) {
				cidConfigs.rankingCids = [category[7].cid1s, category[7].cid2s, category[7].cid3s];
			}
			if(category.length > 8) {
				cidConfigs.houseCids = [category[8].cid1s, category[8].cid2s, category[8].cid3s];
			}
			if(category.length > 9) {
				var tCids = [category[9].cid1s, category[9].cid2s, category[9].cid3s];
				if(inCategoryConfig(hcCids, tCids)) {
					filter.artworkShow = true;
				}
			}
		}
	}

	function inCategoryConfig(cids, cidsConfig) {
		for(var i = 0; i < cidsConfig.length; i++) {
			if(cids[i] && ('|' + cidsConfig[i] + '|').indexOf('|' + cids[i] + '|') >= 0) {
				return true;
			}
		}
		return false;
	}

	function getCoupon(data) {
		var promotejs = util.getCookie("promotejs");
		if(promotejs) {
			getCouponReq(data);
		} else {
			window.GetFunction = function(res) {
				if(res.errorCode == 2) return login.login({});
				if(res.errorCode == 0) {
					res.function(res.TOKEN);
				}
				getCouponReq(data);
			};
			ls.loadScript({
				url: '//wq.jd.com/active/getfunction'
			});
		}
	}

	function getCouponReq(data) {
		var hj = pageScene ? 'm' : (isWX ? 'w' : 'q');
		var url = '//wq.jd.com/active/active_draw?active=' + data.activeid + '&level=' + data.level + '&ext=hj:' + hj + '&t=' + Math.random();
		window.ActiveLotteryCallBack = function(json) {
			if(!json) {
				return;
			}
			switch(json.ret) {
				case 0:
					var bt = data.stime,
						et = data.etime,
						now = (new Date()).getTime();
					if(data.ltype == 0) {
						bt = data.ctime;
					} else if(data.ltype == 1) {
						bt = now;
						et = bt + data.adays * 86400000;
					}
					var inTime = (now >= bt && now <= et);
					ui.confirm({
						msg: inTime ? '<p>优惠券领取成功！</p><p>请在：个人中心-我的优惠券中查看</p>' : '<p>优惠券领取成功，但未到使用时间！</p><p>时间：<font color="red;">' + searchCom.formatData(bt, 'yyyy年mm月dd日') + '-' + searchCom.formatData(et, 'yyyy年mm月dd日') + '</font></p>',
						icon: 'success',
						okText: '知道了',
						cancelText: inTime ? '去用券' : '去看看',
						onCancel: function() {
							reporJdMul('0-22-2', {
								ss_batchid: data.batchid
							});
							window.setTimeout(function() {
								location.href = '//wq.jd.com/search/searchco?coupon_batch=' + data.batchid + '&coupon_aggregation=yes';
							}, 200);
						},
						onConfirm: function() {
							reporJdMul('0-22-1', {
								ss_batchid: data.batchid
							});
						}
					});
					$('#srCoupons div.mod_coupon_s[batchid="' + data.batchid + '"]').addClass('got');
					reporJdMul('0-22-3', {
						ss_batchid: data.batchid
					});
					break;
				case 3:
				case 4:
				case 10:
				case 144:
					$('#srCoupons div.mod_coupon_s[batchid="' + data.batchid + '"]').addClass('got');
					ui.info({
						msg: '您已经领取过此优惠券，别太贪心哦，下次再来'
					});
					break;
				case 2:
					login.login({});
					break;
				case 7:
				case 11:
					ui.info({
						msg: '很遗憾，优惠券已发完，下次再来哦'
					});
					break;
				default:
					ui.info({
						msg: '领券的人太多啦，稍后再来'
					});
					break;
			}
		};
		ls.loadScript({
			url: url
		});
	}

	function addCartAct(skuId, lb, clickposition, e) {
		if(addingCart) {
			return
		}
		addingCart = true;
		var filter = searchFilter.getFilterObject();
		var commlist = [skuId, '', lb > 1 ? '' + lb : '1', skuId, '1,0,0'];
		var url = '//wq.jd.com/deal/mshopcart/addcmdy?callback=addCartCB&sceneval=2&scene=2&type=0&commlist=' + commlist.join(',') + '&locationid=' + filter.areaId.join('-') + '&t=' + Math.random();
		if(filter.dSideId != searchCom.FILTER_DEFVAL.id) {
			url = searchCom.addUrlParam(url, 'dist', 'jd');
		}
		window.addCartCB = function(json) {
			addingCart = false;
			cgiMonitor.addCartTimer && window.clearTimeout(cgiMonitor.addCartTimer);
			if(json.errId == '13') {
				JD.report.umpBiz({
					bizid: '775',
					operation: '9',
					result: '0',
					source: '0',
					message: 'item addcart api nologin'
				});
				window.location.href = json.nextUrl + encodeURIComponent(location.href);
			} else if(json.errId == '8968') {
				JD.report.umpBiz({
					bizid: '775',
					operation: '10',
					result: '0',
					source: '0',
					message: 'item addcart api item limit'
				});
				ui.alert({
					msg: '商品数量最大超过200'
				});
			} else if(json.errId == '8969') {
				JD.report.umpBiz({
					bizid: '775',
					operation: '11',
					result: '0',
					source: '0',
					message: 'item addcart api cart limit'
				});
				ui.alert({
					msg: '添加商品失败，已超出购物车最大容量！'
				});
			} else if(json.errId == '0') {
				JD.report.umpBiz({
					bizid: '775',
					operation: '8',
					result: '0',
					source: '0',
					message: 'item addcart api loaded'
				});
				if(lb > 1) {
					ui.info({
						icon: 'success',
						msg: '该商品最低需购买' + lb + '件，已为您加入购物车'
					});
				}
				cartAnimation($('#link_' + skuId).find('.search_prolist_cover')[0], $('.add_cart')[0], {}, skuId, function() {
					mAside.updateCartNum(json.cart.mainSkuNum);
				});
				var params = [skuId, keyword || '', JD.url.getUrlParam('channelName') || '', mHbEggs.isShowed() ? 1 : 0].join('_');
				mReport.addCart(skuId, 'MList_AddToCart', params, 5);
			} else {
				JD.report.umpBiz({
					bizid: '775',
					operation: '8',
					result: '1',
					source: '0',
					message: 'item addcart api failed'
				});
				ui.alert({
					msg: '添加失败，请稍后再试'
				});
			}
		};
		cgiMonitor.addCartTimer = window.setTimeout(function() {
			addingCart = false;
			try {
				JD.report.umpBiz({
					bizid: '775',
					operation: '12',
					result: '0',
					source: '0',
					message: 'item addcart api timeout'
				});
			} catch(e) {}
		}, cgiMonitor.timeout);
		ls.loadScript({
			url: url
		});
	}
	var mNewUserCoupon = function() {
		var newuserCoupon = window._mNewUserCoupon && window._mNewUserCoupon[0];
		var active = newuserCoupon.active,
			lastActive = newuserCoupon.lastActive;

		function checkIsNewUser() {
			var url = '//wq.jd.com/userattribute/QueryIsNewUser?callback=mQueryIsNewUser&sceneid=2';
			ls.loadScript(url);
			window.mQueryIsNewUser = function(res) {
				if(res.retcode == 0) {
					if(res.isNewUser == 2) {
						queryBingo();
					}
				}
			}
		}

		function queryBingo() {
			var url = '//wq.jd.com/active/querybingolist?callback=mQueryBingo&sceneval=2&activelist=' + active + (lastActive ? ',' + lastActive : '');
			ls.loadScript(url);
			window.mQueryBingo = function(res) {
				if(res.errorCode == 0) {
					var current, last;
					res.result.forEach(function(result) {
						if(result.active == active) {
							current = result;
						} else if(result.active == lastActive) {
							last = result;
						}
					});
					if(current && current.count == 0 && (!last || last.count == 0 || ((parseInt(Date.now() / 1000) - last.bingos[0].time) / (24 * 60 * 60)) > 7)) {
						queryPrizeDetails();
					}
				}
			}
		}

		function queryPrizeDetails() {
			var url = '//wq.jd.com/active/queryprizedetails?callback=mQueryPrizeDetails&sceneval=2&actives=' + active;
			ls.loadScript(url);
			window.mQueryPrizeDetails = function(res) {
				if(res.retcode == 0) {
					var result = res.result && res.result[0],
						prize = result.prizes && result.prizes[0];
					var discountQuota = prize.DiscountQuota.split(';');
					var desc = prize.Desc.split(',');
					var coupons = [];
					for(var i = 0; i < 3; i++) {
						var tempDiscountQuota = discountQuota[i].split(',');
						if(!tempDiscountQuota[0] || !desc[i]) break;
						coupons.push({
							discount: tempDiscountQuota[0],
							quota: tempDiscountQuota[1] > 0 ? '满' + tempDiscountQuota[1] + '可用' : '无门槛',
							desc: desc[i]
						});
					}
					if(coupons.length === 3 && !(window._headModuleShow.shop || window._headModuleShow.webportal || window._headModuleShow.bookauthor || window._headModuleShow.car || window._headModuleShow.topBanner > 1 || window._headModuleShow.category) && wsizeInfo.width < 540) {
						var $newuserCoupon = $('#newuserCoupon');
						$newuserCoupon.html($formatJson('newuserCouponTpl', {
							coupons: coupons
						}));
						$newuserCoupon.removeClass('hide');
						$('#carBlock').addClass('hide');
						$('#topBranner').addClass('hide');
						window.wa && window.wa('ptagExposure', {
							ptag: '37024.32.1'
						});
						resetSearchHeadwh();
						$newuserCoupon.on('click', '.coupon_draw', function() {
							var $draw = $(this);
							if($draw.hasClass('active')) return;
							activeDraw($draw);
							reporJdMul('0-4-39');
						});
					}
				}
			}
		}

		function activeDraw($draw) {
			var url = '//wq.jd.com/active/active_draw?callback=mActiveDraw&ext=hj:m&sceneval=2&level=1&active=' + active;
			ls.loadScript(url);
			window.mActiveDraw = function(res) {
				if(!res) return;
				if(res.ret == 0) {
					ui.info({
						icon: 'success',
						msg: '恭喜您，领取成功<br>可在“我的优惠券”查看'
					});
					$draw.addClass('active').text('已领取');
				} else if([3, 4, 10, 144].indexOf(res.ret) != -1) {
					ui.info({
						msg: res.retmsg
					});
					$draw.addClass('active').text('已领取');
				} else if(res.ret == 147) {
					ui.info({
						msg: '活动火爆，暂无法领取'
					});
				} else {
					ui.info({
						msg: res.retmsg
					});
				}
			}
		}
		return {
			init: function() {
				var isJDMarket = location.pathname === '/market/searchJDMarket.action',
					isBrandSale = location.pathname === '/brand/searchBrandSale.action';
				if(isJDMarket || isBrandSale) return;
				if(window._headModuleShow.shop || window._headModuleShow.webportal || window._headModuleShow.bookauthor || window._headModuleShow.car || window._headModuleShow.topBanner > 1 || window._headModuleShow.category || ssClose) return;
				if(login.isLogin()) {
					checkIsNewUser();
				}
			}
		};
	}();
	var mAside = function() {
		var sid = JD.cookie.get('sid');
		var $aside = $('<div class="msearch_aside" style="bottom: 40px;"></div>'),
			$addCart = $('<a class="add_cart J_ping" report-eventid="MList_Cart" href="//p.m.jd.com/cart/cart.action?sid=' + sid + '" style="display:none;"</a>'),
			$footprint, $wiki, $backToTop, $mode;
		var $pager = $('<div class="msearch_pager" style="display:none;"><span class="page_number"></span></div>'),
			pageTimeout;

		function bindEvent() {
			$wiki && $wiki.on('click', function() {
				cacheItems();
			});
			$backToTop.on('click', function() {
				$(window).scrollTop(0);
			});
			$mode.on('click', function() {
				if($(this).hasClass('disabled')) return;
				if($('#itemList').hasClass('cols_1')) {
					$mode.removeClass('mode_image').addClass('mode_list');
					$mode.attr('rd', '0-24-2');
					changePciMode('big');
					searchCom.addHash({
						'listMode': '1'
					});
				} else {
					$mode.removeClass('mode_list').addClass('mode_image');
					$mode.attr('rd', '0-24-1');
					changePciMode('list');
					searchCom.addHash({
						'listMode': '0'
					});
					itemSimilar.hide();
				}
				resetItemDivTpl();
			});
		}

		function getBaike() {
			var baikeObj = window.mmhistory_discover_baike && window.mmhistory_discover_baike[0],
				baikeList = baikeObj.news || [],
				baikeIndex = baikeList.length;
			while(baikeIndex--) {
				var baike = baikeList[baikeIndex],
					now = new Date(),
					stime = new Date(baike.stime),
					etime = new Date(baike.etime);
				if(baike.title == keyword && now > stime && now < etime) {
					return baike.link;
				}
			}
		}

		function loadHistory() {
			var target = document.getElementsByTagName('script')[0] || document.head;
			var script = document.createElement('script');
			script.charset = 'utf-8';
			script.src = '//wq.360buyimg.com/js/common/dest/m.history.min.js';
			setTimeout(function() {
				target.parentNode.insertBefore(script, target)
			}, 1000)
		}

		function setFootprintPosition(bottom) {
			if(!window.wareHistoryConf) return;
			var setConfig = window.wareHistoryConf.setConfig;
			if($.isFunction(setConfig)) {
				setConfig({
					bottom: bottom + 'px'
				});
			} else {
				window.wareHistoryConf.bottom = bottom + 'px';
			}
		}
		return {
			init: function(isBack) {
				$footprint = $('<a class="footprint J_ping" report-eventid="MList_Footprint" report-eventlevel="2" href="//home.m.jd.com/myJd/history/wareHistory.action?sceneval=2&functionId=liulanjilu&sid=' + sid + '" style="display:none;margin-top:8px;opacity:0;"></a>');
				window.wareHistoryConf = {
					bottom: ($addCart.data('isShow') ? 182 : 138) + 'px',
					right: '10px',
					zIndex: 301,
					onClear: function() {
						$footprint.hide();
					},
					onButtonShow: function() {
						$footprint.show();
					},
					onButtonHide: function() {
						$footprint.hide();
					}
				};
				loadHistory();
				var wikiUrl = getBaike();
				if(wikiUrl) {
					$wiki = $('<a class="wiki J_ping" report-eventid="MList_ResultEncyclopedia" href="' + wikiUrl + '" style="display:none;"><i class="wiki-icon"></i><span>不知道怎么挑' + keyword + '，看看购物百科吧</span></a>');
					if(!isBack) {
						$wiki.addClass('wiki_animate');
					}
				}
				$backToTop = $('<a class="to_top J_ping" report-eventid="MList_BackToTop" href="javascript:void 0;" style="display:none;"</a>');
				var modeEventId = pageScene === 'products' ? 'MSearch_SwitchView' : 'MSearch_Viewmode',
					modeRd = listMode == 1 ? '0-24-2' : '0-24-1',
					modeClass = listMode == 1 ? 'mode_list' : 'mode_image';
				$mode = $('<a class="J_ping ' + modeClass + '" rd="' + modeRd + '" report-eventid="' + modeEventId + '" href="javascript:void 0;"></a>');
				$aside.append($footprint, $addCart, $wiki, $backToTop, $mode);
				$(document.body).append($aside, $pager);
				bindEvent();
			},
			showToTop: function() {
				$backToTop.show();
			},
			hideToTop: function() {
				$backToTop.hide();
			},
			showWiki: function() {
				if($wiki) {
					$wiki.show();
					setFootprintPosition($addCart.data('isShow') ? 226 : 182);
				}
			},
			showCart: function() {
				if(!$addCart.data('isShow')) {
					$addCart.data('isShow', true);
					$addCart.show();
					var num = JD.cookie.get('cartNum') || '',
						numHtml = num > 0 ? '<i>' + num + '</i>' : '';
					$addCart.html(numHtml);
				}
			},
			updateCartNum: function(num) {
				$addCart.html(num > 0 ? '<i>' + num + '</i>' : '');
				JD.cookie.set('cartNum', num > 0 ? num : '', 999999, '/', 'jd.com');
			},
			showPager: function(scrollTop, winHeight) {
				var page, total = result.summary.Page.PageCount;
				$('#itemList').find('.search_prolist_item_inner').each(function() {
					var $self = $(this),
						top = $self.offset().top;
					if(top > scrollTop && top < scrollTop + winHeight) {
						page = $self.attr('page');
					}
				});
				if(page) {
					$pager.find('> span').text(page + ' / ' + total);
					$pager.show();
					clearTimeout(pageTimeout);
					pageTimeout = setTimeout(function() {
						$pager.hide();
					}, 2000);
				}
				return page;
			}
		};
	}();
	var mHbEggs = function() {
		var $redpacket;
		var hb = window._searchData.searchm.redEnvelop;
		var isShowed = null;

		function sendMping(eventId, eventParam) {
			try {
				var click = new MPing.inputs.Click(eventId);
				var mping = new MPing();
				if(eventParam) {
					click.event_param = eventParam;
				}
				mping.send(click);
			} catch(e) {}
		}

		function handleMessage(event) {
			var data = null;
			try {
				data = JSON.parse(event.data);
			} catch(e) {
				data = {
					key: event.data
				};
			}
			var key = data && data.key ? $.trim(data.key) : null;
			if(key === 'searchLogin') {
				sendMping('MList_RedPacket_Login');
				setTimeout(function() {
					JD.cookie.set('so_eggsCount_' + hb.id, 0, 24 * 60, '/', 'so.m.jd.com');
					login.login();
					$redpacket.remove();
				}, 200);
			} else if(key === 'searchFinish') {
				$redpacket.remove();
				sendMping('MList_RedPacket_Confirm');
			} else if(key === 'searchContinue') {
				$redpacket.remove();
			}
		}

		function bindEvent() {
			var timeout = setTimeout(function() {
				$redpacket.remove();
				$(window).off('message', handleMessage);
			}, 3000);
			$redpacket.find('.main').on('load', function() {
				clearTimeout(timeout);
				sendMping('MList_RedPacket_Expose', keyword);
			});
			$redpacket.on('tap', '.close', function() {
				setTimeout(function() {
					$redpacket.remove();
				}, 350);
				$(window).off('message', handleMessage);
				sendMping('MList_RedPacket_Close');
			});
			$(window).on('message', handleMessage);
		}

		function canShow() {
			var eggsCount = JD.cookie.get('so_eggsCount_' + hb.id);
			eggsCount = parseInt(eggsCount) || 0;
			return hb && hb.url && hb.display_times && eggsCount < hb.display_times;
		}
		return {
			init: function() {
				isShowed = false;
				if(canShow()) {
					var url = hb.url.replace(/^http(s)?:/, '');
					var eggsCount = JD.cookie.get('so_eggsCount_' + hb.id);
					eggsCount = parseInt(eggsCount) || 0;
					JD.cookie.set('so_eggsCount_' + hb.id, eggsCount + 1, 24 * 60, '/', 'so.m.jd.com');
					var html = ['<div class="search_hongbao">', '<i class="close"></i>', '<iframe class="main" src="' + url + '"></iframe>', '</div>'].join('');
					$redpacket = $(html);
					$(document.body).append($redpacket);
					bindEvent();
					isShowed = true;
				}
			},
			isShowed: function() {
				if(isShowed === null) {
					return canShow();
				} else {
					return isShowed;
				}
			}
		};
	}();
	var mUtil = {
		isShowCommonHeader: function() {
			return window.navigator.userAgent.indexOf('skapp') == -1 && window._searchData.config.version != 'touch';
		}
	};
	var cartAnimation = function(element, target, options, id, callback) {
		var centerElement, centerTarget, coordElement, coordTarget;
		var lastTime = 0;
		var defaults = {
			width: 50,
			height: 50,
			speed: 150,
			curvature: 0.004,
			reqAnimation: 16.7
		};
		var elementClone = $(element).clone();
		var rectElement = element.getBoundingClientRect();
		var rectTarget = target.getBoundingClientRect();
		var elementCloneXY = {
			x: rectElement.left + (rectElement.right - rectElement.left) / 2 - 25,
			y: rectElement.top + (rectElement.bottom - rectElement.top) / 2 - 25
		};
		$(elementClone).css({
			position: 'fixed',
			zIndex: '999',
			top: elementCloneXY.y + 'px',
			left: elementCloneXY.x + 'px',
			width: '50px',
			height: '50px',
			borderRadius: '50%',
			overflow: 'hidden'
		});
		$(elementClone.children().get(0)).css({
			width: '100%',
			height: '100%'
		});
		$('body').append(elementClone[0]);
		element = elementClone[0];
		var moveStyle = "margin",
			testDiv = document.createElement("div");
		if("oninput" in testDiv) {
			["", "ms", "webkit"].forEach(function(prefix) {
				var transform = prefix + (prefix ? "T" : "t") + "ransform";
				if(transform in testDiv.style) {
					moveStyle = transform;
				}
			});
		}
		var settings = $.extend(true, {}, defaults, options);
		var a = settings.curvature,
			b = 0,
			c = 0;
		var init = function() {
			play();
		};
		var play = function() {
			position();
			move();
		};
		var position = function() {
			var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft,
				scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			rectElement = element.getBoundingClientRect();
			rectTarget = target.getBoundingClientRect();
			centerElement = {
				x: rectElement.left + (rectElement.right - rectElement.left) / 2 + scrollLeft,
				y: rectElement.top + (rectElement.bottom - rectElement.top) / 2 + scrollTop
			};
			centerTarget = {
				x: rectTarget.left + (rectTarget.right - rectTarget.left) / 2 + scrollLeft,
				y: rectTarget.top + (rectTarget.bottom - rectTarget.top) / 2 + scrollTop
			};
			coordElement = {
				x: 0,
				y: 0
			};
			coordTarget = {
				x: -1 * (centerElement.x - centerTarget.x),
				y: -1 * (centerElement.y - centerTarget.y)
			};
			b = (coordTarget.y - a * coordTarget.x * coordTarget.x) / coordTarget.x;
		};
		var move = function() {
			var startx = 0,
				rate = coordTarget.x > 0 ? 1 : -1;
			var middleX = elementCloneXY.y,
				middleY = elementCloneXY.x;
			var up = function() {
				middleX -= 6;
				middleY += 4;
				if(middleY < 75) {
					element.style['top'] = middleX + 'px';
					element.style['left'] = middleY + 'px';
					requestAnimation(up);
				} else {
					position();
					elementScale();
					setTimeout(function() {
						requestAnimation(step);
					}, 600);
					cancelCartAnimation();
				}
			};
			var step = function() {
				var tangent = 2 * a * startx + b;
				startx = startx + rate * Math.sqrt(settings.speed / (tangent * tangent + 1));
				if((rate == 1 && startx > coordTarget.x) || (rate == -1 && startx < coordTarget.x)) {
					startx = coordTarget.x;
				}
				var x = startx,
					y = a * x * x + b * x;
				if(settings.width > 10 && settings.height > 10) {
					settings.width -= 1;
					settings.height -= 1;
					element.style['width'] = settings.width + 'px';
					element.style['height'] = settings.height + 'px';
				}
				if(moveStyle == "margin") {
					element.style.marginLeft = x + "px";
					element.style.marginTop = y + "px";
				} else {
					element.style[moveStyle] = "translate(" + [x + "px", y + "px"].join() + ")";
				}
				if(startx !== coordTarget.x) {
					requestAnimation(step);
				} else {
					inCart();
					setTimeout(function() {
						cancelCartAnimation();
					}, 300);
					$(element).remove();
					callback();
				}
			};
			var inCart = function() {
				target.style['animation'] = "inCartAnimate .3S infinite";
			};
			var cancelCartAnimation = function() {
				target.style['animation'] = "";
			};
			var elementScale = function() {
				element.style['animation'] = "inCartAnimate .3S";
			};
			requestAnimation(up);
		};
		var requestAnimation = function(process) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, settings.reqAnimation - (currTime - lastTime));
			var id = setTimeout(function() {
				process();
			}, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
		init();
	}

	function searchCarInfo() {
		var filter = searchFilter.getFilterObject();
		if(!window._ycCarInfo || window._ycCarInfo.length == 0 || filter.selectCount > 0 || window._headModuleShow.category || window._headModuleShow.topBanner || window._headModuleShow.webportal || window._headModuleShow.bookauthor || window._headModuleShow.car || window._headModuleShow.shop >= 2) return;
		var ycCarInfo = window._ycCarInfo[0];
		ycInfo.keys = '|' + ycCarInfo.keys + '|';
		if(!~ycInfo.keys.indexOf('|' + keyword + '|')) return;
		var url = '//api.jd.yiche.com/pubserver/onebox/mobile?type=jsonp&category=brand&callback=carCateCb&keywords=' + encodeURIComponent(keyword);
		var carmap = {};
		window.carCateCb = function(json) {
			if(json.ErrorCode != 0 || window._headModuleShow.shop >= 2) {
				return;
			}
			var list = json.Data,
				len = list.length,
				tabs = [{
					name: '全部',
					key: 'all',
					cur: true
				}],
				cars = [];
			for(var i = 0; i < len; ++i) {
				var d = list[i],
					slist = d.SerialList.filter(function(a) {
						return a.Stock;
					});
				if(slist.length == 0) continue;
				tabs.push({
					name: d.BrandName,
					key: d.Keywords,
					cur: false
				});
				cars = cars.concat(slist);
				carmap[d.Keywords] = slist;
			}
			carmap['all'] = cars;
			$('#carBlock').removeClass('hide');
			$('#carBlock').html(tpl.child_carTpl({
				tabs: tabs,
				list: cars
			}));
			window._headModuleShow.yicar = true;
			resetSearchHeadwh();
			$('#carBlock').on('click', 'ul.search_cate_list>li', function(e) {
				var tar = $(this),
					key = tar.attr('key');
				if(key) {
					var tempCars = carmap[key];
					if(tempCars && tempCars.length > 0) {
						for(var i = 0, len = tabs.length; i < len; ++i) {
							if(tabs[i].key == key) {
								tabs[i].cur = true;
							} else {
								tabs[i].cur = false;
							}
						}
						$('#carBlock').html(tpl.child_carTpl({
							tabs: tabs,
							list: tempCars
						}));
					}
				}
			});
			$('#carBlock').on('click', 'div.search_scroller>a', function(e) {
				var tar = $(this),
					key = tar.attr('key');
				keyword = key;
				ycInfo.isYc = true;
				searchByFilter();
			});
		};
		ls.loadScript({
			url: url,
			isToken: false
		});
		var cid2s = ycCarInfo.cid2.split('|'),
			cid2Str = [];
		for(var i = 0, len = cid2s.length; i < len; ++i) {
			cid2Str.push('L' + cid2s[i] + 'M' + cid2s[i]);
		}
		ycInfo.cid2 = cid2Str.join('||');
	}

	function showAreaout() {
		if(ssClose || window._headModuleShow.shop >= 3 || window._headModuleShow.bookauthor || window._headModuleShow.car) return;
		if(!keyword) return;
		var portal = window._areaout;
		if(!portal || !portal.toUrl || !portal.name || !portal.adPicUrl) return;
		var $portal = $('#areasout').removeClass('hide');
		$portal.attr('tourl', portal.toUrl);
		var html = ['<span class="webportal_img"><img src="' + portal.adPicUrl + '"></span>', '<div class="webportal_title">' + portal.name + '</div>', '<div class="webportal_desc">' + portal.description + '</div>'].join('');
		$portal.html(html);
		$('#topBranner').addClass('hide');
		$('#topCoupon').addClass('hide');
		resetSearchHeadwh();
		window._headModuleShow.webportal = 1;
	}
	var bookauthor = {
		show: function() {
			if(ssClose || window._headModuleShow.shop >= 2 || !gray('BOOK_AUTHOR_ENTER')) return;
			var writer = window._searchData.writerBrief;
			if(writer.id && writer.name && writer.photo && writer.brief) {
				var html = $formatJson('bookauthorTpl', writer);
				$('#bookauthorWrap').html(html).removeClass('hide');
				$('#topBranner').addClass('hide');
				$('#areasout').addClass('hide');
				$('#brandOutBlock').addClass('hide');
				$('#carBlock').addClass('hide');
				$('#newuserCoupon').addClass('hide');
				$('#keyshop').addClass('hide');
				resetSearchHeadwh();
				window._headModuleShow.bookauthor = 1;
				window.wa && window.wa('ptagExposure', {
					ptag: '37024.12.2',
					id: writer.id,
					name: writer.name
				});
			}
		},
		hide: function() {
			$('#bookauthorWrap').addClass('hide');
		},
		bindEvent: function() {
			$('#bookauthorWrap').on('click', '.search_bookauthor', function() {
				var $bookauthor = $(this);
				var id = $bookauthor.attr('data-id');
				var yfb = $bookauthor.attr('data-yfb') || 0;
				var origin = $bookauthor.attr('data-origin') || '';
				if(!id) return;
				window.location.href = '//wqs.jd.com/wxsq_project/search/books/author/index.html?sceneval=2&id=' + id + '&env=' + yfb + '&origin=' + origin;
				reporJdMul('0-17-10', {
					id: id
				});
			});
		}
	};
	var car = function() {
		var defKeyList = [],
			defImgMap = {},
			descMap = {};
		var CACHE_KEY = 'CAR_RECOMMEND_STATUS';
		var $searchCar = $('#searchCar');

		function prepare() {
			if(prepare.done) return;
			prepare.done = true;
			var searchCarData = window._searchCarData && window._searchCarData[0];
			if(!searchCarData) return;
			var keywords = searchCarData.keywords ? searchCarData.keywords.split('|') : [];
			var repeat = {};
			keywords.forEach(function(key) {
				if(key && !repeat[key]) {
					repeat[key] = true;
					defKeyList.push({
						keyword: key,
						mark: 1,
						type: 'default'
					});
				}
			});
			var mapList = searchCarData.map || {};
			mapList.forEach(function(item) {
				defImgMap[item.key] = item.url;
				descMap[item.key] = item.text;
			});
		}

		function getCar() {
			var url = '//wq.jd.com/commodity/aiche/getuserdefaultcarmodelbypin?callback=getCarCb&sceneval=2&t=' + Date.now();
			ls.loadScript(url);
			window.getCarCb = function(res) {
				if(!res || res.errcode != 0) {
					drawAddTips(true);
					return;
				}
				var info = res.data && res.data.model;
				if(!info || !info.modelId || !info.logoUrl || !info.brandName) {
					drawAddTips();
					return;
				}
				getRecommend(info);
				getImgs();
			}
		}

		function getRecommend(info) {
			var url = '//wq.jd.com/commodity/maintenance/recommendmaintenancekeyword?callback=getCarRecommendCb&modelid=' + info.modelId + '&mileage=' + info.mileage + '&registrationdate=' + info.registrationDate;
			ls.loadScript(url, {
				onError: function() {
					handle.info = info;
					handle.list = [].concat(defKeyList);
					handle();
				}
			});
			window.getCarRecommendCb = function(res) {
				var data = (res && res.data) || [];
				var recommend = [],
					others = [];
				var norepeat = {};
				data.forEach(function(item) {
					if(norepeat[item.keyword]) return;
					norepeat[item.keyword] = true;
					if(item.mark == 2) {
						recommend.push(item);
					} else {
						others.push(item);
					}
				});
				var defList = [];
				defKeyList.forEach(function(item) {
					if(norepeat[item.keyword]) return;
					norepeat[item.keyword] = true;
					defList.push(item);
				});
				handle.info = info;
				handle.list = [].concat(recommend, others, defList);
				handle();
			};
		}

		function getImgs() {
			handle.imgMap = defImgMap;
			handle();
		}

		function handle() {
			if(window._headModuleShow.shop >= 2 || window._headModuleShow.bookauthor) return;
			if(!handle.info || !handle.list || !handle.imgMap) return;
			var info = handle.info;
			var list = [];
			for(var i = 0, j = 0; i < handle.list.length; i++) {
				var item = handle.list[i],
					img = handle.imgMap[item.keyword];
				if(item.type === 'default' && list.length >= 5) break;
				if(img) {
					var tag = 3,
						rd = '0-17-17';
					if((info.registrationDate || info.mileage) && item.type != 'default') {
						if(item.mark == 2 && list.length < 3) {
							tag = 1;
							rd = '0-17-15';
						} else if(j++ < 3) {
							tag = 2;
							rd = '0-17-16';
						}
					}
					list.push({
						keyword: item.keyword,
						img: JD.img.getScaleImg(img, 150, 150, '!cc_150x150'),
						active: keyword == item.keyword ? 1 : 0,
						tag: tag,
						rd: rd
					});
				}
				if(list.length >= 30) break;
			}
			if(list.length < 5) return;
			info.logo = JD.img.getScaleImg(info.logoUrl, 100, 100, '!cc_100x100');
			var rCar = [];
			for(var i = 0; i < list.length; i++) {
				var desc = descMap[list[i].keyword];
				if(!desc) continue;
				if(rCar.indexOf(desc) == -1) {
					rCar.push(desc);
				}
				if(rCar.length >= 6) break;
			}
			var duration = Date.now() - new Date(info.registrationDate || '');
			var month = parseInt(duration / (1000 * 60 * 60 * 24 * 30));
			if(month >= 0) {
				info.recommend = '车龄' + (month > 0 ? month : '小于1') + '个月，建议做保养，' + rCar.join('、');
			} else if(info.mileage) {
				info.recommend = '行车里程' + info.mileage + 'km,建议做保养，' + rCar.join('、');
			} else {
				info.recommend = '完善您的车龄信息，将为您推荐更精准的保养信息';
				info.needAdd = 1;
			}
			$searchCar.html($formatJson('carTpl', {
				info: info,
				list: list
			}));
			$searchCar.removeClass('hide');
			$('#topBranner').addClass('hide');
			$('#areasout').addClass('hide');
			$('#brandOutBlock').addClass('hide');
			$('#carBlock').addClass('hide');
			$('#newuserCoupon').addClass('hide');
			$('#keyshop').addClass('hide');
			resetSearchHeadwh();
			window._headModuleShow.car = 1;
			bindEvent();
			if(info.needAdd == 1) {
				window.wa && window.wa('ptagExposure', {
					ptag: '37024.12.5'
				});
			} else {
				window.wa && window.wa('ptagExposure', {
					ptag: '37024.12.4'
				});
			}
			searchFilter.fillBarFilterCarMatch(info.modelId);
			window.wa && window.wa('ptagExposure', {
				ptag: '37024.15.3'
			});
			var status = cachev1.session.getItem(CACHE_KEY);
			if(status == 1) {
				$searchCar.find('.car_oper').trigger('click');
				cachev1.session.removeItem(CACHE_KEY);
			}
		}

		function drawAddTips(needLogin) {
			var addHtml = '<div class="car_tips" login="' + (needLogin ? 0 : 1) + '" rd="0-17-11"><span class="to_add">去添加</span><span class="tips_msg">添加您的爱车信息，我们会为您筛选更合适的商品哦</span></div>';
			$searchCar.html(addHtml).removeClass('hide');
			resetSearchHeadwh();
			bindEvent();
			window.wa && window.wa('ptagExposure', {
				ptag: '37024.12.3'
			});
		}

		function bindEvent() {
			$searchCar.on('click', '.car_text', function() {
				fixReload(show);
				window.location.href = '//car.m.jd.com/h5/carManageForApp.html?source=msearch';
			});
			$searchCar.on('click', '.car_remark .to_add', function() {
				fixReload(show);
				window.location.href = '//car.m.jd.com/h5/myCarInfo.html';
			});
			$searchCar.on('click', '.car_oper', function() {
				var $switch = $(this);
				$switch.toggleClass('open');
				$searchCar.find('.car_recommend').toggleClass('hide');
				resetSearchHeadwh();
				if($switch.hasClass('open')) {
					reporJdMul('0-17-13');
				} else {
					reporJdMul('0-17-14');
				}
			});
			$searchCar.on('click', '.recommend_item', function() {
				var $item = $(this),
					key = $item.attr('key');
				if(!key || $item.hasClass('active')) return;
				cachev1.session.setItem(CACHE_KEY, 1, true, 30);
				var url = searchUrl.replace('{#key#}', key);
				var filter = searchFilter.getFilterObject();
				window.location.href = searchCom.setCarParam(url, filter);
			});
			$searchCar.on('click', '.car_tips', function() {
				fixReload(show);
				var $tips = $(this);
				var link = '//car.m.jd.com/list.html?source=msearch';
				if($tips.attr('login') == 0) {
					login.login({
						rurl: location.href
					});
				} else {
					location.href = link;
				}
			})
		}

		function show() {
			if(ssClose || window._headModuleShow.shop >= 2 || window._headModuleShow.bookauthor || !gray('SEARCH_CAR')) return;
			var hcCid1s = window._searchData.searchm.Head.Query.HcCid1s.split(';');
			var carCid1 = '6728';
			if(hcCid1s && hcCid1s[0] != carCid1) return;
			if(!login.isLogin()) {
				drawAddTips(true);
				return;
			}
			prepare();
			getCar();
		}
		return {
			show: show
		};
	}();
	var oldScrollTop = 0,
		filterFixed = 1,
		fscrollTimer = null;

	function doScroll() {
		var st = $(window).scrollTop(),
			dh = $(document).height(),
			wh = $(window).height();
		if(searchFilter.getSelectMode() || stopLoad || pageInfo.reloadCount > 0) return;
		loadType === 2 ? nextPageWifiDeal(st, dh, wh) : nextPageDeal(st, dh, wh);
		filterFixedDeal(st);
		if(st > wh / 2) {
			mAside.showToTop();
		} else {
			mAside.hideToTop();
		}
		var page = mAside.showPager(st, wh);
		if(page >= 4) {
			mAside.showWiki();
		}
	}

	function nextPageWifiDeal(st, dh, wh) {
		if((st >= (dh - wh - (itemDivTpls.itemDivHeight / 2) - (1 * itemDivTpls.itemSingleh))) && nextResultInfo.nextResult === null && !pageInfo.loading && pageInfo.page < result.summary.Page.PageCount && pageInfo.reaPage < result.summary.Page.PageCount) {
			pageInfo.page++;
			searchBackground();
		}
		if((st >= (dh - wh - itemDivTpls.itemSingleh - 25))) {
			searchDataFormBg();
			if(pageInfo.page > 3) {
				$('#jdappdlOutter').show();
			}
		}
	}

	function nextPageDeal(st, dh, wh) {
		if((st >= (dh - wh - itemDivTpls.itemSingleh)) && !pageInfo.loading && pageInfo.page < result.summary.Page.PageCount && pageInfo.reaPage < result.summary.Page.PageCount) {
			pageInfo.page++;
			searchByFilter(true);
			if(pageInfo.page > 3) {
				$('#jdappdlOutter').show();
			}
		}
	}

	function filterFixedDeal(st) {
		if(curScrollInfo.lock) return;
		if(st > oldScrollTop) {
			if((filterFixed === 1 || filterFixed === 2) && st > filterTop + 40) {
				filterFixed = 0;
				setFixedAnim();
			}
		} else if(st < oldScrollTop) {
			if(filterFixed === 0 || filterFixed === 2) {
				if(st <= filterTop - 44) {
					filterFixed = 1;
					setFixedAnim(true);
				} else if(filterFixed === 0) {
					filterFixed = 2;
					setFixedAnim();
				}
			}
		}
		oldScrollTop = st;
	}

	function setFixedAnim(isResetHeight) {
		fscrollTimer && window.clearTimeout(fscrollTimer);
		fscrollTimer = window.setTimeout(function() {
			var shf = $('#searchHeadFixer'),
				shff = $('#searchHeadff'),
				mtips = $('#mCommonTips'),
				searchbar = $('#searchHeadFixer .mod_searchbar'),
				temp = 0;
			if(filterFixed == 0) {
				mtips.hide();
				shff.hide();
				shf.addClass('search_head_fixer');
				if(isInPinzhuan({
						sp: true
					})) {
					searchbar.addClass('skin_2');
					searchbar.removeClass('skin_pinzhuan_special');
				}
				temp = -($('#proFilterWrap').position().top + 40);
			} else if(filterFixed == 1) {
				mtips.show();
				shff.show();
				if(isInPinzhuan({
						sp: true
					})) {
					searchbar.addClass('skin_pinzhuan_special');
					searchbar.removeClass('skin_2');
				}
				shf.removeClass('search_head_fixer');
				if(isResetHeight) {
					resetSearchHeadwh();
				}
			}
			shf.css({
				'-webkit-transform': temp === 0 ? '' : 'translate3d(0,' + temp + 'px,0)',
				'transition': 'transform 0.5s ease'
			});
		}, 100);
	}

	function setShareConfig() {
		var shareTpl = '多快好省，乐享品质，更多好货尽在京东购物。',
			titleTpl = '一大波超值“{#key#}”相关商品来袭！';
		var keywordText = '京东';
		if(keyword && !classType) {
			keywordText = keyword;
		} else if(window._searchPlaceholder) {
			keywordText = window._searchPlaceholder;
		}
		if(window.searchShareCon) {
			var point = 0;
			var config = window.searchShareCon[point];
			if(config) {
				titleTpl = config.maintitle || titleTpl;
				shareTpl = config.vicedesc || shareTpl;
			}
		}
		var fimg = $('#itemList img').first(),
			logo = fimg.attr('init_src'),
			skuid = fimg.attr('skuid'),
			imgUrl = searchCom.LOGO_TPL.replace('{#s0#}', skuid % 5).replace('{#s1#}', searchCom.ITEM_LOGO.img100).replace('{#s2#}', logo);
		var url = location.href;
		window.shareConfig.title = titleTpl.replace('{#count#}', getResultCountStr()).replace('{#key#}', keywordText);
		window.shareConfig.img_url = imgUrl;
		window.shareConfig.link = url;
		window.shareConfig.url = window.shareConfig.link;
		window.shareConfig.desc = shareTpl.replace('{#count#}', getResultCountStr()).replace('{#key#}', keywordText);
		window.shareConfig.content = window.shareConfig.title + "  " + window.shareConfig.desc;
	}

	function getResultCountStr() {
		var resultCount = result.summary.ResultCount;
		if(result.summary.ResultCount > 6000 && result.summary.ResultCut != '0') {
			var osc = result.summary.OrgSkuCount;
			if(osc >= 10000) {
				resultCount = (osc / 10000).toFixed(1) + '万';
			} else {
				resultCount = osc;
			}
		}
		return resultCount;
	}

	function getLocalStorageJsonByCachev1(key) {
		var o = cachev1.local.getItem(key);
		if(o && (typeof o == 'string')) {
			o = JSON.parse(o);
		}
		return o ? o : '';
	}

	function setBodyOverflow(mark) {
		var needRetSh = filterFixed != 1;
		if(mark) {
			if(!curScrollInfo.lock) {
				curScrollInfo.top = $(document.body).scrollTop() || $(window).scrollTop();
				curScrollInfo.lock = true;
				curScrollInfo.sh = $('#searchHead').height();
			}
			$(document.body).addClass('overflowHide');
			$('#jdappdlOutter').hide();
			if(needRetSh) {
				var tempH = filterFixed == 0 ? 45 : 129;
				tempH += $('#sortSubBlock').height() + $('#sortSubBlock2').height() + $('#barSureBtnBlock').height();
				if(curScrollInfo.sh > tempH) {
					$('#searchHead').height(tempH);
				}
			}
		} else {
			$(document.body).removeClass('overflowHide');
			if(curScrollInfo.top > 0) {
				window.scrollTo(0, curScrollInfo.top);
			}
			curScrollInfo.lock = false;
			if(needRetSh && curScrollInfo.sh > 0) {
				$('#searchHead').height(curScrollInfo.sh);
			}
			if(pageInfo.page > 3) {
				$('#jdappdlOutter').show();
			}
		}
	}

	function reportSpeedTime() {
		if(!window._PFM_TIMING || hadSpReport) return;
		if(window.performance && window.performance.timing) {
			var dif = window.performance.timing.domainLookupEnd - window.performance.timing.domainLookupStart;
			if(dif > 0) {
				window._PFM_TIMING[7] = new Date(parseInt(dif + window._PFM_TIMING[0][1].getTime()));
			}
		}
		if(util.isSQ()) {
			window._PFM_TIMING[0] = performanceTimePointSQ;
		}
		$(window).on('load', function(e) {
			window._PFM_TIMING[5] = new Date();
			if(window._PFM_TIMING[4] && !hadSpReport) {
				speedtime.report();
				hadSpReport = true;
			}
		});
		if(!window._PFM_TIMING[4]) {
			var img = $('#itemList img').first();
			if(img.length > 0) {
				img.on('load', function(e) {
					window._PFM_TIMING[4] = window._PFM_TIMING[6] = new Date();
					if(window._PFM_TIMING[5] && !hadSpReport) {
						speedtime.report();
						hadSpReport = true;
					}
				});
			}
		}
	}

	function reporJdMul(rd, extObj) {
		var pars = rd.split('-');
		var defObj = getPtagParams(pars);
		try {
			var param = $.extend({}, extObj, {
				ptag: defObj.ptag,
				ss_ver: reportInfo.retina,
				sf_url: sfUrl,
				search_kwd: classType && window._searchPlaceholder ? encodeURIComponent(window._searchPlaceholder + '分类') : encodeURIComponent(keyword),
				abtest: reportInfo.abtest,
				ss_hccid1s: window._searchData.searchm.Head.Query.HcCid1s || '',
				ss_hccid2s: window._searchData.searchm.Head.Query.HcCid2s || '',
				ss_hccid3s: window._searchData.searchm.Head.Query.HcCid3s || '',
				ss_mtest: reportInfo.mtest
			});
			window.wa && window.wa('jdClick', param);
		} catch(e) {}
	}
	window._sReportJdMul = reporJdMul;

	function reportJdClick() {
		var parFunMap = {
			'1': getPtagParams,
			'24': getParams24,
			'3': getPtagParams,
			'4': getParams4,
			'7': getPtagParams,
			'9': getParams9,
			'11': getPtagParams,
			'12': getPtagParams,
			'13': getPtagParams,
			'10': getPtagParams,
			'17': getParams17,
			'16': getPtagParams,
			'18': getPtagParams,
			'15': getPtagParams,
			'21': getParams21,
			'22': getPtagParams,
			'23': getParams23,
			'25': getPtagParams,
			'26': getParams26,
			'29': getParams29,
			'30': getPtagParams,
			'31': getParams31,
			'32': getParams32,
			'33': getParams33,
			'34': getParams34
		};
		var canReport = true;
		$(document.body).on('tap', function(e) {
			if(!canReport) return;
			canReport = false;
			setTimeout(function() {
				canReport = true;
			}, 20);
			var tar = e.target,
				rd = tar.getAttribute('rd'),
				ptag = tar.getAttribute('ptag'),
				cObj = {};
			for(var i = 0; !rd && !ptag && tar !== document.body && i < 10; i++) {
				tar = tar.parentNode;
				rd = tar.getAttribute('rd');
				ptag = tar.getAttribute('ptag');
			}
			if(rd) {
				var pars = rd.split('-');
				if(!pars[1] || !parFunMap[pars[1]]) return;
				cObj = parFunMap[pars[1]](pars, tar);
				ptag = cObj.ptag;
			} else {
				if(!ptag) {
					ptag = $(tar).parents('[ptag]').attr('ptag');
				}
			}
			if(!ptag) return;
			try {
				var param = $.extend({}, cObj, {
					ptag: ptag,
					ss_ver: reportInfo.retina + (cObj.ss_ver ? '|ad-' + cObj.ss_ver : ''),
					sf_url: sfUrl,
					search_kwd: classType && window._searchPlaceholder ? encodeURIComponent(window._searchPlaceholder + '分类') : encodeURIComponent(keyword),
					abtest: reportInfo.abtest,
					ss_hccid1s: window._searchData.searchm.Head.Query.HcCid1s || '',
					ss_hccid2s: window._searchData.searchm.Head.Query.HcCid2s || '',
					ss_hccid3s: window._searchData.searchm.Head.Query.HcCid3s || '',
					ss_mtest: reportInfo.mtest,
					bhv: behavior.getBehavior(location.href, e)
				});
				if(reportInfo.expQuery != 0) {
					param.ss_mark = reportInfo.expQuery;
				}
				delete param.locid1;
				delete param.locid2;
				delete param.locid3;
				window.wa && window.wa('jdClick', param);
			} catch(e) {}
		});

		function getParams4(pList, tar) {
			var obj = getPtagParams(pList),
				tempTar = $(tar);
			if(!tempTar.hasClass('search_prolist_item_inner')) {
				tempTar = tempTar.parents('div.search_prolist_item_inner');
				if(tempTar.length > 0) {
					tempTar = $(tempTar[0]);
				}
			}
			var isPaimai = tempTar.attr('paimai') == '1',
				isYushou = tempTar.attr('yushou') == '1';
			if($('#itemList').hasClass('cols_2')) {
				var lpmark = tempTar.find('img[lpmark="1"]');
				if(lpmark.length > 0) {
					obj.locid2 = '6';
				} else {
					obj.locid2 = '5';
				}
				isPaimai && (obj.locid3 = '8');
				isYushou && (obj.locid3 = '9');
			} else {
				isPaimai && (obj.locid3 = '17');
				isYushou && (obj.locid3 = '18');
			}
			if(selectNoResult == 2) {
				obj.locid3 = '19';
				obj.ss_reqsea = reportInfo.requerySearch;
				obj.ss_onkey = encodeURIComponent(reportInfo.showWordOne);
			}
			var tempId = tempTar.attr('id');
			if(tempId) {
				obj.skuid = tempId.replace('link_', '');
			}
			obj.pos = tempTar.attr('pos') || '';
			obj.ss_pos_type = tempTar.attr('ad') ? 'ad' : 'normal';
			obj.ss_ver = tempTar.attr('ver') || '';
			obj.ifad = tempTar.attr('ifad') || '';
			obj.event_id = tempTar.attr('eventid') || '';
			obj.csid = tempTar.attr('csid') || '';
			obj.buy_limit = tempTar.attr('buy_limit') || '';
			var symbol = tempTar.attr('symbol');
			symbol && (obj.ss_symbol = symbol);
			obj.ptag = obj.locid1 + '.' + obj.locid2 + '.' + obj.locid3;
			return obj;
		}

		function getParams9(pList, tar) {
			var obj = getPtagParams(pList);
			if($(tar).attr('id') == 'filterFinishBtn') {
				obj.search_attr = searchFilter.getReportSearchAttr();
			}
			return obj;
		}

		function getParams24(pList, tar) {
			var obj = getPtagParams(pList);
			if($(tar).attr('id') == 'barSureBtn') {
				obj.search_attr = searchFilter.getReportSearchAttr();
			}
			if(reportInfo.isNewItem) {
				obj.ss_fzxp = '1';
			}
			return obj;
		}

		function getParams21(pList, tar) {
			var obj = getPtagParams(pList),
				tempTar = $(tar);
			if(!tempTar.hasClass('mod_coupon_s')) {
				tempTar = tempTar.parents('div.mod_coupon_s');
				if(tempTar.length > 0) {
					tempTar = $(tempTar[0]);
				}
			}
			obj.ss_batchid = tempTar.attr('batchid') || '';
			return obj;
		}

		function getParams23(pList, tar) {
			var obj = getPtagParams(pList),
				tempTar = $(tar);
			return obj;
		}

		function getParams26(pList, tar) {
			var obj = getPtagParams(pList),
				tempTar = $(tar);
			obj.attrtest = 'b';
			obj.tagname = encodeURIComponent(tempTar.text());
			obj.taglog = tempTar.attr('taglog') || '';
			obj.tagpos = tempTar.attr('tagpos') || '';
			return obj;
		}

		function getParams29(pList, tar) {
			var obj = getPtagParams(pList),
				tempTar = $(tar);
			if(!tempTar.hasClass('search_tips')) {
				tempTar = tempTar.parents('.search_tips');
				if(tempTar.length > 0) {
					tempTar = $(tempTar[0]);
				}
			}
			obj.eqword = encodeURIComponent(tempTar.attr('eqword') || '');
			return obj;
		}

		function getParams17(pList, tar) {
			var obj = getPtagParams(pList),
				viddom = $(tar).parents('[vid]'),
				vid = viddom.attr('vid'),
				ind = viddom.attr('ind');
			if(vid) {
				obj.venderid = vid;
			}
			if(ind) {
				obj.venderind = ind;
			}
			return obj;
		}

		function getParams31(pList, tar) {
			var obj = getPtagParams(pList),
				tempTar = $(tar);
			if(!tempTar.hasClass('item')) {
				tempTar = tempTar.parents('a.item');
				if(tempTar.length > 0) {
					tempTar = $(tempTar[0]);
				}
			}
			obj.catelog = tempTar.attr('tlog') || '';
			obj.catepos = tempTar.attr('tpos') || '';
			return obj;
		}

		function getParams32(pList, tar) {
			var obj = getPtagParams(pList),
				tempTar = $(tar);
			if(!tempTar.hasClass('search_recoword_item')) {
				tempTar = tempTar.parents('li.search_recoword_item');
				if(tempTar.length > 0) {
					tempTar = $(tempTar[0]);
				}
			}
			obj.relatedkey = encodeURIComponent(tempTar.attr('key') || '');
			obj.relatedver = tempTar.attr('ver') || '';
			obj.relatednum = tempTar.attr('cou') || '';
			return obj;
		}

		function getParams33(pList, tar) {
			var obj = getPtagParams(pList),
				tempTar = $(tar);
			obj.rectifykey = encodeURIComponent(tempTar.attr('key') || '');
			obj.ss_reqsea = reportInfo.requerySearch;
			obj.ss_key = encodeURIComponent(tempTar.attr('ss_key') || '');
			obj.ss_onkey = encodeURIComponent(tempTar.attr('ss_onkey') || '');
			obj.ss_otherkey = encodeURIComponent(tempTar.attr('ss_otherkey') || '');
			return obj;
		}

		function getParams34(pList, tar) {
			var obj = getPtagParams(pList),
				tempTar = $(tar);
			if(!tempTar.hasClass('search_guidelist_item')) {
				tempTar = tempTar.parents('a.search_guidelist_item');
				if(tempTar.length > 0) {
					tempTar = $(tempTar[0]);
				}
			}
			obj.pos = tempTar.attr('pos') || '';
			obj.ss_shareid = tempTar.attr('shareid') || '';
			obj.ss_sharetype = tempTar.attr('btype') || '';
			obj.ss_sharectype = tempTar.attr('ctype') || '';
			obj.ss_article = '1';
			return obj;
		}
	}

	function getRdSceneId() {
		var scene = '7092';
		if(searchFilter.getSelectMode()) {
			scene = '7094';
		} else {
			if(!$('#sNull01').hasClass('hide')) {
				scene = '7093';
			}
		}
		return scene;
	}

	function getPtagParams(pList) {
		var lc1 = pList[0];
		if(lc1 == 0) {
			lc1 = getRdSceneId() || ''
		}
		var obj = {
			locid1: lc1,
			locid2: pList[1] || '',
			locid3: pList[2] || ''
		};
		obj.ptag = obj.locid1 + '.' + obj.locid2 + '.' + obj.locid3;
		return obj;
	}

	function recordHistory() {
		if(!keyword) return;
		var desc = searchFilter.historyDesc(),
			keyStr = classType ? window._searchPlaceholder + '分类' : keyword;
		JD.store.setHistory({
			type: '3',
			key: keyStr,
			url: location.href,
			title: '搜索到 “' + keyStr + '” 相关商品 ' + getResultCountStr() + ' 件',
			desc: '筛选条件：' + desc,
			img: window.shareConfig.img_url
		});
	}

	function pvReportInfo() {
		if(reportInfo.hasPvReport) return;
		reportInfo.hasPvReport = true;
		var filter = searchFilter.getFilterObject();
		var pramas = {
			kwd: classType && window._searchPlaceholder ? encodeURIComponent(window._searchPlaceholder + '分类') : encodeURIComponent(keyword),
			kwd_result: result.summary.ResultCount == 0 ? 0 : 1,
			ss_search_type: 1,
			ss_ver: reportInfo.retina + '|' + adsInfo.ver,
			ifad: adsInfo.ifad,
			event_id: adsInfo.evenid,
			sf_url: sfUrl,
			abtest: reportInfo.abtest,
			is_filter: filter.selectCount > 0 ? 1 : 0,
			ss_shop: window._searchData.shop || '0',
			ss_hccid1s: window._searchData.searchm.Head.Query.HcCid1s || '',
			ss_hccid2s: window._searchData.searchm.Head.Query.HcCid2s || '',
			ss_hccid3s: window._searchData.searchm.Head.Query.HcCid3s || '',
			ss_mtest: reportInfo.mtest,
			shoptab: window._searchData.searchm.Head.Query.showShopTab == 0 ? 0 : 1
		};
		var rObj = window._searchData.rewrite;
		if(rObj.projid != '0') {
			pramas.ss_projid = rObj.projid;
			pramas.ss_expid = rObj.experimentid;
			pramas.ss_ruleid = rObj.ruleid;
		}
		if(rObj.sortExpid != '0') {
			pramas.ss_sexpid = rObj.sortExpid;
			pramas.ss_sruleid = rObj.sortRuleid;
			pramas.ss_scatid = rObj.sortCatid;
		}
		var keyshop = $('#keyshop'),
			vid = Array.prototype.slice.call(keyshop.find('[vid]').map(function(a, b) {
				return $(b).attr('vid');
			})).join(',');
		if(!keyshop.hasClass('hide') && vid) {
			pramas.venderid = vid;
		}
		if(reportInfo.expQuery != 0) {
			pramas.ss_mark = reportInfo.expQuery;
		}
		if(selectNoResult == 2) {
			pramas.ss_recword = '1';
			pramas.ss_reqsea = reportInfo.requerySearch;
		}
		return pramas;
	}

	function reportExposure(product, csid, belt_adshop) {
		var rObj = window._searchData.rewrite;
		if(!product) {
			product = window._searchData.searchm.Paragraph;
		}
		var ids1 = [],
			ids2 = [],
			inds2 = [],
			adpos = [],
			widsInfo = [],
			featureLogs = [];
		for(var i = 0, len = product.length; i < len; ++i) {
			var item = product[i];
			if(item.isAd) {
				ids2.push(item.wareid);
				inds2.push(item.flow_order);
				adpos.push(item.wareid + '|' + (i + 1));
				widsInfo.push(item.wareid + ',0,0,0,0,0,0,0,0');
			} else {
				ids1.push(item.wareid);
				if(item.discountIcon && item.feature_log) {
					var fls = item.feature_log.split('^');
					if(fls.length > 1) {
						featureLogs.push(fls.slice(0, 2).join('^'));
					}
				}
				widsInfo.push(item.showlog_new + ',' + item.wareInStock + ',0,0');
			}
		}
		var catid = result.category.catid && result.category.catid.length > 0 ? result.category.catid[0].Classification : '',
			pramas = {
				ss_exp_type: 1,
				search_kwd: classType && window._searchPlaceholder ? encodeURIComponent(window._searchPlaceholder + '分类') : encodeURIComponent(keyword),
				intenid: catid,
				actid: aas,
				exp_sku_list: ids1.join('_'),
				exp_sku_qtty: ids1.length,
				ad_sku_list: adpos.join(','),
				wids_info: widsInfo.length > 0 ? widsInfo.join(';') + ';' : '',
				ss_ver: reportInfo.retina + '|' + adsInfo.ver,
				ifad: adsInfo.ifad,
				event_id: adsInfo.evenid,
				ss_page: result.summary.Page.PageIndex,
				sf_url: sfUrl,
				abtest: reportInfo.abtest,
				user_psn_flag: window._searchData.searchm.Head.Query.Sort.UPF || '',
				csid: csid || window._searchData.adpos.csid,
				ss_hccid1s: window._searchData.searchm.Head.Query.HcCid1s || '',
				ss_hccid2s: window._searchData.searchm.Head.Query.HcCid2s || '',
				ss_hccid3s: window._searchData.searchm.Head.Query.HcCid3s || '',
				ss_mtest: reportInfo.mtest
			},
			params2 = null;
		if(ids2.length > 0) {
			params2 = $.extend({}, pramas, {
				ss_exp_type: 2,
				exp_sku_list: ids2.join('_'),
				exp_sku_qtty: ids2.length,
				flow_order: inds2.join('_')
			});
		}
		if(window._searchData.searchm && window._searchData.searchm.ObjPicTag && pramas.ss_page < 2) {
			var picTag = window._searchData.searchm.ObjPicTag,
				plen = picTag.length,
				plogs = [];
			for(var i = 0; i < plen; ++i) {
				plogs.push(picTag[i].taglog);
			}
			pramas.exp_cate_log = plogs.join('|');
		}
		if(reportInfo.hotTagLen > 0) {
			pramas.exp_attr_cou = 'b_' + reportInfo.hotTagLen;
			pramas.exp_attr_log = reportInfo.hotTagLogs;
			reportInfo.hotTagLen = 0;
			reportInfo.hotTagLogs = '';
		}
		if(rObj.projid != '0') {
			pramas.ss_projid = rObj.projid;
			pramas.ss_expid = rObj.experimentid;
			pramas.ss_ruleid = rObj.ruleid;
		}
		if(rObj.sortExpid != '0') {
			pramas.ss_sexpid = rObj.sortExpid;
			pramas.ss_sruleid = rObj.sortRuleid;
			pramas.ss_scatid = rObj.sortCatid;
		}
		if(featureLogs.length > 0) {
			pramas.exp_showlog = featureLogs.join('|');
		}
		if(window._searchData.searchm && window._searchData.searchm.Head && window._searchData.searchm.Head.Query && window._searchData.searchm.Head.Query.Sort.ACT) {
			pramas.ss_act = window._searchData.searchm.Head.Query.Sort.ACT;
			params2 && (params2.ss_act = pramas.ss_act);
		}
		var belt_adshop_skus = belt_adshop && belt_adshop[0] && belt_adshop[0].child_link;
		if(belt_adshop_skus) {
			pramas.belt_adshop_skus = belt_adshop_skus.map(function(item) {
				return item.sku_id;
			}).join(',');
		}
		if(ids1.length > 0) {
			window.wa && window.wa('goodsSearch', pramas);
		}
		if(params2) {
			window.wa && window.wa('goodsSearch', params2);
		}
	}

	function reportOhterExposure() {
		var searchm = window._searchData.searchm;
		if(window._searchData.keyad && window._searchData.keyad.data && window._searchData.keyad.data.length > 0) {
			var kadshopRd = null,
				kadadRd = null,
				couponRd = [],
				rds = [];
			for(var i = 0, len = window._searchData.keyad.data.length; i < len; ++i) {
				var kad = window._searchData.keyad.data[i];
				if(kad.type == 2) {
					kadadRd = '37024.11.' + (window._headModuleShow.topBanner == 1 ? '2' : '1');
				} else if(kad.type == 1) {
					kadshopRd = '37024.12.1';
				} else if(kad.type == 3) {
					if(kad.couponInfo && kad.couponInfo.length > 0) {
						for(var j = 0, jlen = kad.couponInfo.length; j < jlen; ++j) {
							couponRd.push('37024.17.' + (couponRd.length + 1));
						}
					}
				}
			}
			kadadRd && rds.push(kadadRd);
			kadshopRd && rds.push(kadshopRd);
			couponRd.length > 0 && (rds = rds.concat(couponRd));
			rds.length > 0 && window.wa && window.wa('ptagExposure', {
				ptag: rds.join('_')
			});
		}
		if(reportInfo.expQuery != 0) {
			var eq = searchm.Head.Query.QueryProcessor.ExpandQuery,
				eq_type = 0;
			if(reportInfo.expQuery == 1) {
				eq_type = 1;
			} else if(reportInfo.expQuery == 2) {
				eq_type = 2;
			}
			if(eq_type != 0) {
				window.wa && window.wa('ptagExposure', {
					ptag: '37024.18.1',
					eq_type: eq_type,
					eq_key: encodeURIComponent(keyword),
					eq_tar: encodeURIComponent(eq)
				});
			}
		}
	}
	var mReport = function() {
		var cookieJda = (JD.cookie.get('__jda') || '').split('.')[1] || '';

		function genProductClickParams(product, isExpose) {
			var params = [];
			params.push(JD.url.getUrlParam('searchFrom') === 'category' ? 0 : 1);
			params.push(product.cid1);
			params.push(product.cid2);
			params.push(product.catid);
			params.push(product.wareid);
			params.push(keyword);
			params.push(product.ico > 0 ? product.ico : '');
			params.push((product.productext & 1024) !== 0 ? 1 : 0);
			params.push((product.flags & 4096) !== 0 ? 1 : 0);
			params.push(JD.url.getHashParam('listMode') == 1 ? 1 : 0);
			params.push(product.page);
			params.push('{预售}');
			params.push('{sams}');
			params.push(JD.url.getUrlParam('channelName') || '');
			params.push('');
			params.push(product.isGaiya ? 1 : 2);
			params.push((product.productext & 8388608) !== 0 ? 1 : 0);
			params.push('{plus}');
			params.push('##');
			params.push(keyword);
			params.push(product.eventid);
			params.push((product.isAd ? 'AD' : 'NA') + product.wareid);
			params.push(cookieJda);
			params.push((product.property_flag & 1) !== 0 ? 1 : 0);
			params.push('{本地仓}');
			params.push(false ? 1 : 0);
			params.push(false ? 1 : 0);
			params.push(product.secKill && product.secKill.status == 1 ? 1 : 0);
			params.push((product.userPsnProductNew & 32) !== 0 ? 1 : 0);
			params.push((product.userPsnProductNew & 64) !== 0 ? 1 : 0);
			params.push('{腰带}');
			!isExpose && params.push(false ? 1 : 0);
			params.push((product.productext2 & 4) !== 0 ? 1 : 0);
			params.push(product.ico > 0 ? 1 : 0);
			!isExpose && params.push(product.cgind);
			!isExpose && params.push(window._searchData.searchm.Head.Query.HcCid1s);
			!isExpose && params.push(window._searchData.searchm.Head.Query.HcCid2s);
			!isExpose && params.push(window._searchData.searchm.Head.Query.HcCid3s);
			params.push(product.pinGou && product.pinGou.bp > 0 && product.pinGou.count > 0 ? 1 : 0);
			params.push(selectNoResult == 2 ? reportInfo.showWordOne : '');
			params.push(mHbEggs.isShowed() ? 1 : 0);
			return params;
		}

		function cleanProductClickParams(strParams) {
			return strParams.replace(/{(plus|本地仓|腰带)}/g, 0).replace(/{[^}]+}/g, '');
		}

		function mPing(eventId, eventParam, pageParam) {
			try {
				var click = new MPing.inputs.Click(eventId);
				click.event_param = eventParam || '';
				click.page_param = pageParam || '';
				var mping = new MPing();
				mping.send(click);
			} catch(err) {
				console.warn(err);
			}
		}

		function addCart(skuId, eventId, eventParam, eventLevel) {
			try {
				var cart = new MPing.inputs.AddCart(eventId, skuId);
				cart.event_param = eventParam || '';
				cart.event_level = eventLevel || '';
				var mping = new MPing();
				mping.send(cart);
			} catch(err) {
				console.warn(err);
			}
		}
		return {
			reportProducts: function(products, isBack) {
				var skuIds = [];
				products = products || [];
				products.forEach(function(product) {
					var params = genProductClickParams(product);
					params = params.join('_');
					var $item = $('#link_' + product.wareid);
					$item.addClass('J_ping').attr({
						'report-eventid': 'MList_Product',
						'report-eventlevel': '4',
						'report-eventparam': cleanProductClickParams(params)
					});
					$item.data('mReportParams', params);
					skuIds.push((product.isAd ? 'AD' : 'NA') + product.wareid);
				});
				if(!isBack) {
					var firstProduct = products[0] || {};
					var exposeParams = [keyword, firstProduct.eventid || '', skuIds.join(','), cookieJda, firstProduct.page || '', JD.url.getUrlParam('searchFrom') === 'category' ? 0 : 1, window._searchData.searchm.Head.Query.HcCid1s, window._searchData.searchm.Head.Query.HcCid2s, window._searchData.searchm.Head.Query.HcCid3s, selectNoResult == 2 ? reportInfo.showWordOne : ''];
					mPing('MList_Product_Expose', exposeParams.join('_'), '');
				}
			},
			updateProductClickParams: function($item, type, value) {
				var params = $item.data('mReportParams') || '';
				params = params.replace('{' + type + '}', value);
				$item.attr('report-eventparam', cleanProductClickParams(params));
				$item.data('mReportParams', params);
			},
			expose: function() {
				if(window._headModuleShow.category) {
					mPing('MList_FilterOutExpo');
				}
				if(!$('#sNull01').hasClass('hide')) {
					mPing('MList_NoResultExpo');
				}
			},
			exposeRecommend: function() {
				mPing('MList_RecommendSearchExpo');
			},
			addCart: addCart
		};
	}();

	function pzCgiGray() {
		var rate = window._PZCGIGRAY || 0,
			vk = JD.cookie.get("visitkey") || '0';
		return parseInt(vk.substr(-1), 10) < rate;
	}
	var gray = function() {
		var list = window._msearchGray || [],
			map = {};
		var vk = JD.cookie.get('visitkey') || '0',
			sign = parseInt(vk.substr(-3), 10);
		var pin = JD.cookie.get('pin') || '';
		list.forEach(function(item) {
			if(!item.feature) return;
			var white = (item.white || '').split('|').filter(function(it) {
				return it
			});
			map[item.feature] = (white.indexOf(pin) > -1) || (sign >= parseInt(item.min) && sign <= parseInt(item.max));
		});
		return function(feature) {
			return !!map[feature];
		}
	}();
});
define('m.searchindex', function(require, exports, module) {
	var _cacheThisModule_;
	var $ = require('zepto'),
		util = require('util'),
		search = require('m.search'),
		cachev1 = require('cachev1'),
		keyword = '',
		classid = '',
		noResult = false,
		sbHidden = true,
		hasRecoword = null,
		tempScrTop = 0,
		placeholder = '',
		hottagList = [],
		locUrl = location.href;
	var isJDMarket = location.pathname === '/market/searchJDMarket.action',
		isBrandSale = location.pathname === '/brand/searchBrandSale.action';
	var isAndroid = /android/i.test(navigator.userAgent);
	window._HottagKey = 'search_hottags';
	exports.init = function() {
		init();
	};

	function init() {
		initDisplay();
		bindEvent();
		initMSmartbox();
		search.init();
	}

	function initMSmartbox() {
		if(!mUtil.isShowCommonHeader()) return;
		if(!keyword && classid && window._searchPlaceholder) {
			placeholder = '‘' + window._searchPlaceholder + '‘分类';
		}
		if(isBrandSale) {
			placeholder = '新鲜水果';
		} else if(isJDMarket) {
			placeholder = '逛超市 上京东';
		}
		var isKplHide = window._searchData.config.kpl == 2;
		var onlyGenDoms = isJDMarket || isBrandSale;
		JD.M.smartbox.init({
			smartboxBlock: 'tsearchwrap',
			drakText: placeholder,
			shortCutShow: !isKplHide && !onlyGenDoms,
			cancelBtnShow: !isKplHide,
			initHideSbtn: isKplHide,
			onlyGenDoms: onlyGenDoms,
			initKeyword: keyword,
			sf: 'search',
			css: '',
			showCb: smartboxShowCb,
			hideCb: smartboxHideCb
		});
		var showKeyword = keyword || '';
		showKeyword = showKeyword.replace('+', ' ');
		$('#msKeyWord').val(showKeyword);
		if(onlyGenDoms) {
			$('#msCancelBtn').on('click', function() {
				history.back();
			});
			$('#msSearchBtn').on('click', function() {
				var inputKeyword = $.trim($('#msKeyWord').val());
				if(isJDMarket) {
					location.href = JD.url.addUrlParam('//so.m.jd.com/market/searchJDMarket.action', {
						jdSupermarket: 1,
						keyword: inputKeyword || '京东超市',
						showWord: JD.url.getUrlParam('showWord'),
						realWord: JD.url.getUrlParam('realWord')
					});
				} else if(isBrandSale) {
					location.href = JD.url.addUrlParam('//so.m.jd.com/brand/searchBrandSale.action', {
						keyword: inputKeyword || '新鲜水果',
						showWord: JD.url.getUrlParam('showWord'),
						realWord: JD.url.getUrlParam('realWord'),
						field: JD.url.getUrlParam('field'),
						cid: JD.url.getUrlParam('cid')
					});
				}
			});
		}
	}

	function initDisplay() {
		noResult = !$('#sNull01').hasClass('hide');
		keyword = $.trim(decodeURIComponent(util.getQuery('key') || util.getQuery('keyword') || ''));
		var hashKey = $.trim(decodeURIComponent(util.getHash('key') || ''));
		if(hashKey) {
			keyword = hashKey;
		}
		var filtType = util.getQuery('filt_type');
		if(filtType) {
			var mat = filtType.match(/(cid1|cid2|catid),L(\d+)M\d+/i);
			if(mat) {
				mat[1] && (classid = mat[1]);
			}
		}
		if(location.hostname == 'so.m.jd.com' && /\/(products|category)\/\d+-\d+-\d+(-\d+)*\.html/.test(location.pathname)) {
			var mat = location.pathname.match(/\/\d+-\d+-(\d+)(-\d+)*\.html/);
			if(mat) {
				mat[1] && (classid = mat[1]);
			}
		}
		var keymat = keyword.match(/catid_str,,(\d+)/);
		if(!classid && keymat) {
			classid = keymat[1];
			keyword = '';
		}
		if(keyword == '' && classid == '') {
			search.setStopLoad(true);
		} else {
			var sTagsInner = $('#msSearchTab');
			if(!noResult) {
				$('#searchResBlock,#searchHeadff,#proFilterWrap').removeClass('hide');
			}
			if(keyword) {
				$('#msKeyWord').val(keyword);
				sTagsInner.append('<span class="icon-click"><em rd="0-1-2">' + util.htmlEncode(keyword) + '</em><i class="icon-tag-del" ind="1" rd="0-1-14">+</i></span>');
			}
			var hottags = cachev1.local.getItem(window._HottagKey);
			if(hottags) {
				hottagList = hottags.list || [];
				var tempList = [];
				for(var i = 0, len = hottagList.length; i < len; ++i) {
					var tag = hottagList[i];
					var inParam = false;
					switch(tag.ttype) {
						case 'prd_word':
							if(~locUrl.indexOf(encodeURI(tag.value))) {
								inParam = true;
							}
							break;
						case 'brd_word':
							if(~locUrl.indexOf(encodeURI(tag.value))) {
								inParam = true;
							}
							break;
						case 'attr_word':
							var match = locUrl.match(/expand_name,([^\;]*)/),
								attrStr = tag.value.replace('expand_name,', ''),
								curms = attrStr.split('::'),
								attrVal = curms[0],
								attrName = curms[1];
							if(match && match[1]) {
								var vals = match[1].split('^^');
								for(var j = 0, jlen = vals.length; j < jlen && !inParam; ++j) {
									var temp1 = vals[j].split('::');
									if(attrName == temp1[1]) {
										var temp2 = temp1[0].split('||');
										for(var k = 0, klen = temp2.length; k < klen; ++k) {
											if(attrVal == temp2[k]) {
												inParam = true;
												break;
											}
										}
									}
								}
							}
							break;
					}
					if(inParam) {
						tempList.push(tag);
						sTagsInner.append('<span class="icon-click"><em rd="0-1-2">' + util.htmlEncode(tag.name) + '</em><i class="icon-tag-del" ind="' + (i + 2) + '" mark="' + tag.value + '" ttype="' + tag.ttype + '" rd="0-1-14">+</i></span>');
					}
				}
				if(tempList.length == 0) {
					cachev1.local.removeItem(window._HottagKey);
				} else if(tempList.length != hottagList.length) {
					cachev1.local.setItem(window._HottagKey, {
						list: tempList
					}, 9999);
				}
				hottagList = tempList;
			}
			if(sTagsInner.find('> .icon-click').length >= 2) {
				sTagsInner.show();
				$('#msKeyWord').hide();
			}
		}
	}

	function bindEvent() {
		var searchTags = $('#msSearchTab'),
			delOp = false;
		searchTags.on('tap', 'i.icon-tag-del', function() {
			var tar = $(this),
				ind = tar.attr('ind'),
				mark = tar.attr('mark'),
				ttype = tar.attr('ttype');
			tar.parent().remove();
			delOp = true;
			if(ind == 1) {
				if(hottagList.length == 0) {
					$('#msKeyWord').val('');
					delOp = false;
				} else {
					var tag = hottagList.shift();
					var url = locUrl.replace(/\bkeyword=[^&]*/, 'keyword=' + encodeURIComponent(tag.name)).replace(encodeURI(tag.value), '');
					if(hottagList.length > 0) {
						cachev1.local.setItem(window._HottagKey, {
							list: hottagList
						}, 9999);
					} else {
						cachev1.local.removeItem(window._HottagKey);
					}
					$('#msKeyWord').val(tag.name);
					window.setTimeout(function() {
						location.href = clearUrlEmptyParam(url);
					}, 200);
				}
			} else {
				var url = locUrl;
				if(ttype == 'attr_word') {
					var match = locUrl.match(/expand_name,([^\;]*)/),
						attrStr = mark.replace('expand_name,', ''),
						curms = attrStr.split('::'),
						attrVal = curms[0],
						attrName = curms[1],
						str = '';
					if(match && match[1]) {
						var vals = match[1].split('^^'),
							res1 = [];
						for(var j = 0, jlen = vals.length; j < jlen; ++j) {
							var temp1 = vals[j].split('::'),
								res2 = [];
							if(attrName == temp1[1]) {
								var temp2 = temp1[0].split('||');
								for(var k = 0, klen = temp2.length; k < klen; ++k) {
									if(attrVal != temp2[k]) {
										res2.push(temp2[k]);
									}
								}
								if(res2.length > 0) {
									res1.push(res2.join('||') + '::' + temp1[1]);
								}
							} else {
								res1.push(vals[j]);
							}
						}
						str = res1.join('^^');
						url = locUrl.replace(/expand_name,([^\;]*;?)/, 'expand_name,' + str + ';');
					} else {
						url = locUrl.replace(encodeURI(mark), '');
					}
				} else {
					url = locUrl.replace(encodeURI(mark), '');
				}
				window.setTimeout(function() {
					location.href = clearUrlEmptyParam(url);
				}, 200);
			}
		});
		if(searchTags.find('> .icon-click').length >= 2) {
			$('.jd-header-search-input').on('tap', function() {
				if(delOp) return;
				fillKword();
			});
		}
	}

	function fillKword() {
		var kword = $('#msKeyWord'),
			searchTags = $('#msSearchTab'),
			str = '';
		if(hottagList.length > 0) {
			for(var i = 0, len = hottagList.length; i < len; ++i) {
				str += ' ' + hottagList[i].name;
			}
			str && (kword.val(keyword + str));
		}
		searchTags.hide();
		kword.show();
		kword.focus();
	}

	function smartboxShowCb() {
		if(!sbHidden) return;
		search.setStopLoad(true);
		tempScrTop === 0 && (tempScrTop = $(window).scrollTop());
		if(hasRecoword == null) {
			hasRecoword = $('#recowordBlock li').length > 0;
		}
		if(isAndroid && tempScrTop > 0) {
			window.setTimeout(function() {
				domAttrWhenSmartboxShow();
			}, 300);
		} else {
			domAttrWhenSmartboxShow();
		}
		sbHidden = false;
		if(isInPinzhuanSp()) {
			$('#searchHeadFixer .mod_searchbar').addClass('skin_2');
			$('#searchHeadFixer .mod_searchbar').removeClass('skin_pinzhuan_special');
		}
	}

	function domAttrWhenSmartboxShow() {
		$('#searchResBlock,#searchGuideBlock,#searchHeadff,#proFilterWrap').addClass('hide');
		noResult && $('#sNull01').addClass('hide');
		hasRecoword && $('#recowordBlock').addClass('hide');
		$('#searchBtn').removeClass('hide');
		$('.wx_footer,.qq_footer').addClass('hide');
		$('.msearch_aside').addClass('hide');
		$('.msearch_pager').hide();
		$('#wareListBtn').hide();
		$('#mCommonTips').addClass('hide');
		window.scroll(0, 0);
	}

	function smartboxHideCb() {
		if(sbHidden) return;
		if(keyword || classid) {
			if(noResult) {
				$('#sNull01').removeClass('hide');
			} else {
				if(window._inArticleTab) {
					$('#searchGuideBlock').removeClass('hide');
					$('#backTopBtn').addClass('active');
				} else {
					$('#searchResBlock').removeClass('hide');
				}
				$('#searchHeadff,#proFilterWrap').removeClass('hide');
			}
			$('#searchBtn').addClass('hide');
			$('.wx_footer,.qq_footer').removeClass('hide');
			hasRecoword && $('#recowordBlock').removeClass('hide');
			window.scrollTo(0, tempScrTop);
			search.setStopLoad(false);
			tempScrTop = 0;
		} else {
			search.setStopLoad(true);
			$('#searchResBlock,#searchHeadff,#proFilterWrap').addClass('hide');
			$('#searchBtn').removeClass('hide');
			noResult && $('#sNull01').removeClass('hide');
			hasRecoword && $('#recowordBlock').removeClass('hide');
		}
		var sTagsInner = $('#msSearchTab');
		if(sTagsInner.find('> .icon-click').length >= 2) {
			sTagsInner.show();
			$('#msKeyWord').hide();
		}
		$('.msearch_aside').removeClass('hide');
		$('.msearch_pager').hide();
		$('#wareListBtn').show();
		$('#mCommonTips').removeClass('hide');
		$('#msKeyWord').val(keyword || '');
		if(isInPinzhuanSp() && !$('#searchHeadFixer.search_head_fixer').length) {
			$('#searchHeadFixer .mod_searchbar').addClass('skin_pinzhuan_special');
			$('#searchHeadFixer .mod_searchbar').removeClass('skin_2');
		}
		window.setTimeout(function() {
			sbHidden = true;
		}, 200);
	}

	function clearUrlEmptyParam(url) {
		url = url.replace(/\=;/g, '=');
		var nrex = /expand_name\,([^;]*);/,
			match0 = url.match(nrex);
		if(match0 && (match0[1] == '')) {
			url = url.replace(nrex, '');
		}
		var frex = /\&filt_type=([^&]*)/,
			match1 = url.match(frex);
		if(match1 && (match1[1] == '' || match1[1] == ';')) {
			url = url.replace(frex, '');
		}
		var erex = /\&expression_key=([^;]*;{0,2})/,
			match2 = url.match(erex);
		if(match2 && (match2[1] == '' || match2[1] == ';' || match2[1] == ';;')) {
			url = url.replace(erex, '');
		}
		return url;
	}

	function resetTagPosition() {
		var w = 0,
			tagInner = $('#searchTagsInner'),
			searchTags = $('#searchTags'),
			outWidth = searchTags.width();
		tagInner.children('span').each(function(ind, item) {
			w += $(item).width() + 5;
		});
		w += 50;
		tagInner.scrollLeft(w - outWidth);
	}

	function isInPinzhuanSp() {
		var ad = window._searchData.shopadpos && window._searchData.shopadpos[0]
		if(!ad) return false
		return ad.style_type == 6 || ad.style_type == 8 || ad.style_type == 7
	}
	var mUtil = {
		isShowCommonHeader: function() {
			return window.navigator.userAgent.indexOf('skapp') == -1 && window._searchData.config.version != 'touch';
		}
	};
});
modulejs('m.searchindex', function(m) {
	m.init();
});