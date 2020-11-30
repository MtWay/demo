$(function() {
	(function($) {
		$.fn.extend({
			editImg: function(option) {
				var defaults = {
					maxWidth: 1600, //画布最大尺寸
					maxHeight: 1200,
					width: 600, //css尺寸
					height: 450,
					canvas: this[0] || $("<canvas></canvas>")[0],
					canbox: $("#canbox"), //画布容器
					edit: 0, //是否可修改
					isfix: 1, //用固定宽高比裁剪
					fileBtn:$("#file1"),//触发选中
//					url:CONTEXTPATH + '/car/upload2.htm',//上传地址
					url:'/car/upload2.htm',//上传地址
					upload:upload,//上传图片函数，可以接收到图片处理后的string
					viewBox:$('#picViewUl'),//预览图片的盒子
				}
				var opt = $.extend({}, defaults, option);
//				opt.k = opt.width / opt.maxWidth>opt.height / opt.maxHeight?opt.height / opt.maxHeight:opt.width / opt.maxWidth;
				console.log(opt);

				var canvas = opt.canvas;
				var context = canvas.getContext("2d");
				var hisData = []; //用来保存历史操作
				var clearFirst = 1;

				function init() {
					canvasData = {
						cw: canvas.width,
						ch: canvas.height,
						canboxLeft: 0,
						canboxTop: 0
					};
				}

				var SKEW;

				function initEdit() {
					SKEW = {
						distance: 20, //距离边框多少范围内可操作
						changeX: 0,
						changeY: 0,
						moveFlag: 0,
						inster: 0,
						mark: 0,
						dx: 0,
						dy: 0,
						boxX: $("#skew").position().left, //skew红框
						boxY: $("#skew").position().top,
						cw: $("#skew").width(),
						ch: $("#skew").height(),
						minWidth: 100,
						minHeight: 75,
						cx: $(canvas).position().left,
						cy: $(canvas).position().top,
						scale: $(canvas).width() / $(canvas).attr("width")
					};
					$("#save_btn").click(save);

					//选中msk
					$("#edit_msk").click(function() {
						$(this).siblings().removeClass("edit_select");
						saveSkew();
						changeCur();
						var ndata = canvas.toDataURL('image/jpeg', 1);
						//需要重绘否则旋转会使角度改变，计算出现偏差
						if(rotateChange) {
							showimg(ndata);
						}
						$("#save_btn").removeClass("gray"); //可以保存
						$(this).addClass("edit_select");
						$(".msk_size").stop().animate({
							"right": 0
						}, 200);
					})

					//旋转
					$("#turnleft").click(function() {
						saveSkew();
						rotate(-90);
						var his = {
							type: "rotate",
							data: 90
						};
						hisData.unshift(his);
					});

					$("#turnright").click(function() {
						saveSkew();
						rotate(90);
						var his = {
							type: "rotate",
							data: -90
						};
						hisData.unshift(his);
					})

					//裁剪
					$("#showSkew").click(function() {
						$("#save_btn").removeClass("gray"); //可以保存
						$(this).addClass("edit_select").siblings().removeClass("edit_select");
						var scale = opt.maxWidth / opt.maxHeight;
						var w = $(canvas).width() - 4;
						var h = $(canvas).height() - 4;
						//固定裁剪大小
						if(opt.isfix) {
							if(w / h > scale) {
								w = h * scale;
							} else {
								h = w / scale;
							}
						}

						$("#skew").css({
							"height": h,
							"width": w,
							"left": $(canvas).css("left"),
							"top": $(canvas).css("top")
						}).removeClass("hide");
						SKEW.boxX = $("#skew").position().left;
						SKEW.boxY = $("#skew").position().top;
						SKEW.cw = $("#skew").width();
						SKEW.cy = $("#skew").height();

					})

					//撤销
					$("#revocation").click(function() {
						$("#skew").addClass("hide");
						$(".edit_select").removeClass("edit_select");
						if(hisData.length > 0) {
							$(this).addClass("edit_select");
							setTimeout(function() {
								$(".edit_select").removeClass("edit_select");
							}, 100);
							switch(hisData[0].type) {
								case "rotate":
									rotate(hisData[0].data);
									break;
								case "skew":
								case "msk":
									showimg(hisData[0].data);
									break;
								default:
									break;
							};
							hisData.shift();
							if(hisData.length == 0) {
								$("#save_btn").addClass("gray");
							}
						}

					})

					$(".size").click(function() {
						$(this).addClass("size_select").siblings().removeClass("size_select");
					})

					//裁剪相关

					var sizes = [10, 20, 30],
						li,
						radius, lidu = [2, 3, 4],
						mark = 0;
					$("#editBox").on({
						mousedown: function(e) {

							//裁剪
							if(!$("#skew").hasClass("hide")) {
								skewDown.call(this);
							}
						},
						mousemove: function(e) {
							if(!$("#skew").hasClass("hide")) {
								skewMove.call(this);
							}
						}
					})

					$("#canbox").on({
						mousedown: function(e) {
							//			马赛克圈圈
							if($("#edit_msk").hasClass("edit_select")) {
								//		保存历史操作
								var ndata = canvas.toDataURL('image/jpeg', 1);
								var his = {
									type: "msk",
									data: ndata
								}
								hisData.unshift(his);

								var e = e || event;
								SKEW.cx = $("#editCanvas").position().left;
								SKEW.cy = $("#editCanvas").position().top;
								canvasData.canboxTop = $("#canbox").offset().top - $(document).scrollTop();
								canvasData.canboxLeft = $("#canbox").offset().left;
								var x = e.clientX - canvasData.canboxLeft,
									y = e.clientY - canvasData.canboxTop;

								radius = sizes[$(".size_select").index(".size")];
								$("#radius").css({
									height: radius,
									width: radius,
									left: x - radius / 2,
									top: y - radius / 2
								}).removeClass("hide");
								li = lidu[$(".size_select").index(".size")];
							}
							mark = 1;
						},
						mousemove: function(e) {
							//马赛克逻辑
							if($("#edit_msk").hasClass("edit_select") && mark) {
								var e = e || event;
								var x = e.clientX - canvasData.canboxLeft,
									y = e.clientY - canvasData.canboxTop;
								$("#radius").css({
									left: x - radius / 2,
									top: y - radius / 2
								})
								SKEW.scale = $(canvas).width() / $(canvas).attr("width");
								var drawX = (x - SKEW.cx - radius / 2) / SKEW.scale;
								var drawY = (y - SKEW.cy - radius / 2) / SKEW.scale;
								var imageData = getImageData(drawX, drawY, radius / SKEW.scale, radius / SKEW.scale, li / SKEW.scale);
								draw(imageData);
							}
						}
					})

					$(document).mouseup(function() {

						mark = 0;
						$("#radius").addClass("hide");

						var left = $("#skew").position().left;
						var top = $("#skew").position().top;
						var bw = $("#skew").width();
						var bh = $("#skew").height();
						$("#skew").css({
							"left": left,
							"top": top,
							"width": bw,
							"height": bh
						});
						SKEW.mark = 0;
					})
				}
				//初始化
				init();
				if(opt.edit) {
					initEdit();
				}

				//增加showimg外部调用
				$.fn.extend({
					showimg: function(obj) {
						showimg(obj);
					}
				})
				var clearFirst = 1;

				function showimg(obj) {
					var defaults = {
						src: "", //图片地址
						$li: "", //监测进度dom
						fn: null, //cb
						size: 0 //图片大小
					};
					if(typeof obj == "string") {
						defaults.src = obj;
					} else {
						$.extend(defaults, obj);
					}

					if(clearFirst) {
						// 切换图片时先清空
						context.fillStyle = "#fff";
						context.fillRect(0, 0, 1600, 1200);
						clearFirst = 0;
					}

					var img = new Image();
					img.src = defaults.src;
					img.crossOrigin = 'anonymous'; //canvas跨域
					//					img.setAttribute('crossOrigin', 'anonymous');
					img.onload = function() {
						var w = img.width;
						var h = img.height;
						resize(w, h);
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
						var scale = 1;
						if(defaults.size) {
							scale -= Math.floor(defaults.size / 10000000) * 0.3;
						}
						if(scale < 0.7) {
							scale = 0.7;
						}
						if(scale > 1) {
							scale = 1;
						}
						console.log(scale)
						var ndata = canvas.toDataURL('image/jpeg', scale);
						$(".model").removeClass("hide");
						if(typeof defaults.fn == "function") {
							defaults.fn(ndata, "", defaults.$li);
						}
					}
				}
				//		UPDATE.showimg = showimg;
				//重置画布尺寸位置
				function resize(w, h) {
					//										var w = $(opt.canvas).width();
					//										var h = $(opt.canvas).height();
//					var k = opt.k; //画布像素宽与css宽比例

					var maxWidth = opt.maxWidth || 1600;
					var maxHeight = opt.maxHeight || 1200;
					var bw = $(opt.canbox).innerWidth();
					var bh = $(opt.canbox).innerHeight();
					var scale = w / maxWidth > h / maxHeight ? w / maxWidth : h / maxHeight;
					//							if(scale < 1 )sacle=1;

					var aw = w / scale;
					var ah = h / scale;
					var k = opt.width / aw>opt.height / ah?opt.height / ah:opt.width / aw;
					console.log(scale);
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
					$("#editCanvas").attr({
						width: aw,
						height: ah
					}).css({
						width: cw,
						height: ch,
						left: left,
						top: top
					});
					//			SKEW.scale = cw / aw
					//		return scale;
				}

				var degIndex = 0,
					rotatemark = 0,
					rotateChange = 0;
				//旋转
				function rotate(deg) {
					if(rotatemark) {
						return; //防止点太快出现白板
					}
					rotatemark = 1;
					rotateChange = 1;
					$("#save_btn").removeClass("gray"); //可以保存
					var cw = canvas.width;
					var ch = canvas.height;
					var ndata = canvas.toDataURL('image/jpeg', 1);
					var s = resize(ch, cw);
					cw = canvas.width;
					ch = canvas.height;
					//					var ndata = $('img').attr("src");
					//
					var img = new Image();
					img.src = ndata;
					//					//        铺底色
					context.fillStyle = "#fff";
					context.fillRect(0, 0, cw, ch);
					img.onload = function() {
							context.translate(cw / 2, ch / 2);
							context.rotate(deg * Math.PI / 180);
							degIndex += deg;
							context.translate(-ch / 2, -cw / 2);
							context.drawImage(img, 0, 0, ch, cw);
							rotatemark = 0;
						}
						//context.rotate(deg*Math.PI/180);

				}

				//保存修改
				function save() {
					if($("#save_btn").hasClass("gray")) {
						return;
					}
					clearMark();
					saveSkew();
					var ndata = canvas.toDataURL('image/jpeg', 1);
					$(".model").addClass("hide");
					upload(ndata, "", $("#picViewUl li").eq(whedit));
				}

				//保存裁剪
				function saveSkew() {
					if($("#skew").hasClass("hide")) {
						return;
					}
					var ndata = canvas.toDataURL('image/jpeg', 1);
					//保存历史操作
					var his = {
						type: "skew",
						data: ndata
					};
					hisData.unshift(his);

					var scale = $(canvas).attr("width") / $(canvas).width();

					var borderWidth = 4; //	
					var dw = SKEW.cw + SKEW.boxX + borderWidth;
					var dh = SKEW.ch + SKEW.boxY + borderWidth;
					var fx = (SKEW.boxX - $(canvas).position().left) * scale;
					var fy = (SKEW.boxY - $(canvas).position().top) * scale;
					var imageData = context.getImageData(fx, fy, dw * scale, dh * scale);
					var w = $(canvas).width();
					var h = $(canvas).height();
					var scalex = w / SKEW.cw;
					var scaley = h / SKEW.ch;
					resize((SKEW.cw + borderWidth) * scale, (SKEW.ch + borderWidth) * scale);
					//        铺底色
					context.fillStyle = "#fff";
					context.fillRect(0, 0, dw, dh);
					context.putImageData(imageData, 0, 0);
					var iurl = canvas.toDataURL('image/jpeg', 1);
					var img = new Image();
					img.src = iurl;
					img.onload = function() {
						context.drawImage(img, 0, 0);
						var ndata = canvas.toDataURL('image/jpeg', 1);
						$("#skew").addClass("hide")
						changeCur();
					}
				}

				function getImageData(x, y, w, h, l) {
					var imageData = context.getImageData(x, y, w, h);
					var place = 0,
						places = [];
					for(var m = 0; m < imageData.width; m++) {
						var sx = m + arguments[0];
						for(var j = 0; j < imageData.height; j++) {
							var sy = j + arguments[1];
							var i = 4 * (j * imageData.width + m);
							if(imageData.data[i + 3] > 128) {
								var r = imageData.data[i],
									g = imageData.data[i + 1],
									b = imageData.data[i + 2];
								place++;
								(place % 4 == 0) && places.push(new Dot(sx, sy, 0, l, {
									r: r,
									g: g,
									b: b
								}));
							}
						}
					}
					return places;
				}

				//绘制msk
				function draw(arr) {
					var length = arr.length;
					var index = 0,
						drr = [];

					for(var i = 0; i < length; i++) {
						var mark = 1;
						//					var l = ((arr[i].x-arr[index].x)*(arr[i].x-arr[index].x))+((arr[i].y-arr[index].y)*(arr[i].y-arr[index].y));

						index++;

						context.beginPath()
						var x = Math.floor(arr[i].x / (arr[i].radius * 2)) * arr[i].radius * 2;
						var y = Math.floor(arr[i].y / (arr[i].radius * 2)) * arr[i].radius * 2;
						arr[i].x = x;
						arr[i].y = y;
						for(var j = 0; j < drr.length; j++) {
							if(drr[j].x == x && drr[j].y == y) {
								mark = 0;
								break;
							}
						}
						drr.push(arr[i])
						if(mark) {
							context.arc(x, y, arr[i].radius, 0, Math.PI * 2, true);
							context.fillStyle = "rgb(" + arr[i].r + "," + arr[i].g + "," + arr[i].b + ")";
							//					context.fillRect(x-radius,y-radius,x+radius,y+radius)
							context.fill();
							//					context.stroke();	
						}

					}
				}

				function Dot(centerX, centerY, centerZ, radius, color) {
					this.dx = centerX; //保存原来的位置
					this.dy = centerY;
					this.dz = centerZ;
					this.z = centerZ;
					this.x = centerX;
					this.y = centerY;
					this.radius = radius;
					this.r = color.r;
					this.g = color.g;
					this.b = color.b;
				}

				function skewMove(e) {
					//用到的变量
					var k = {
						bx: $("#skew").offset().left,
						by: $("#skew").offset().top - $(document).scrollTop(),
						bw: $("#skew").width(),
						bh: $("#skew").height(),
						resize: "-resize",
						borderWidth: 4, //边框宽度
						cx: $("#editCanvas").position().left,
						cy: $("#editCanvas").position().top,
						cw: $("#editCanvas").width(),
						ch: $("#editCanvas").height()
					}
					k.scale = opt.maxWidth / opt.maxHeight;
					var e = e || window.event;
					var x = e.clientX - k.bx;
					var y = e.clientY - k.by;

					if(SKEW.mark) { //红色方框出现
						var left = $("#skew").position().left;
						var top = $("#skew").position().top;
						if(SKEW.moveFlag == 1) { //移动
							left = e.clientX - SKEW.dx + SKEW.boxX;
							top = e.clientY - SKEW.dy + SKEW.boxY;
							//			计算可拖动的最大范围	
							var maxLeft = $("#canbox").width() - k.bw - k.borderWidth - k.cx;
							var maxTop = $("#canbox").height() - k.bh - k.borderWidth - k.cy;
							if(top < k.cy) top = k.cy;
							if(top > maxTop) top = maxTop;
							if(left < k.cx) left = k.cx;
							if(left > maxLeft) left = maxLeft;
						} else if(SKEW.moveFlag == 2) {
							var maxHeight = k.ch - k.borderWidth;
							var maxWidth = k.cw - k.borderWidth;
							if(SKEW.changeX < 0) { //左侧缩放
								k.bw = SKEW.cw - (e.clientX - SKEW.dx);
								if(k.bw > SKEW.minWidth) {
									left = e.clientX - SKEW.dx + SKEW.boxX;
								}
								if(left < k.cx) {
									left = k.cx;
									k.bw = SKEW.cw + SKEW.boxX - k.cx;
								}

								if(k.bw < SKEW.minWidth) {
									left = SKEW.cw + SKEW.boxX - SKEW.minWidth;
								}
							} else if(SKEW.changeX > 0) { //右侧缩放
								k.bw = SKEW.cw + (e.clientX - SKEW.dx);
							}
							if(k.bw < SKEW.minWidth) {
								k.bw = SKEW.minWidth;
							}
							if(k.bw > maxWidth - left + k.cx) k.bw = maxWidth - left + k.cx;
							if(opt.isfix) { //固定尺寸缩放
								k.bh = k.bw / k.scale;
								if(k.bh > maxHeight - top + k.cy) {
									k.bh = maxHeight - top + k.cy;
									k.bw = k.bh * k.scale;
									left = SKEW.boxX - (k.bw - SKEW.cw); //高度不改变时//left固定
								}
							}
							

							if(SKEW.changeY < 0 && !(opt.isfix && SKEW.changeX != 0)) { //由上方调整,//新加判断在固定宽高比时由斜对角缩放只有x轴变化

								k.bh = SKEW.ch - (e.clientY - SKEW.dy);
								if(k.bh > SKEW.minHeight) {
									top = e.clientY - SKEW.dy + SKEW.boxY;
								}
								if(top < k.cy) { //限制上方不出界
									top = k.cy;
									k.bh = SKEW.ch + SKEW.boxY - k.cy;
								}

								if(k.bh < SKEW.minHeight) {
									top = SKEW.ch + SKEW.boxY - SKEW.minHeight;
								}

							} else if(SKEW.changeY > 0 && !(opt.isfix && SKEW.changeX != 0)) {
								k.bh = SKEW.ch + (e.clientY - SKEW.dy);
							}
							if(k.bh < SKEW.minHeight) {
								k.bh = SKEW.minHeight;
							}
							if(k.bh > maxHeight - top + k.cy) k.bh = maxHeight - top + k.cy;
							if(opt.isfix) { //固定尺寸缩放
								k.bw = k.bh * k.scale;
								if(k.bw > maxWidth - left + k.cx) {
									k.bw = maxWidth - left + k.cx;
									k.bh = k.bw / k.scale;
									top = SKEW.boxY - (k.bh - SKEW.ch); //宽度不改变时//top固定
								}
							}

						}

						$("#skew").css({
							"left": left,
							"top": top,
							"width": k.bw,
							"height": k.bh
						});

					} else {
						//					x是否可变,计算鼠标样式
						if(x > (-SKEW.distance) && x < SKEW.distance) {
							SKEW.changeX = -1;
							k.resize = "w" + k.resize;
						} else if(x > k.bw - SKEW.distance && x < k.bw + SKEW.distance) {
							SKEW.changeX = 1;
							k.resize = "e" + k.resize;
						} else {
							SKEW.changeX = 0;
						}
						if(y > (-SKEW.distance) && y < SKEW.distance) {
							k.resize = "n" + k.resize;
							SKEW.changeY = -1;
						} else if(y > k.bh - SKEW.distance && y < k.bh + SKEW.distance) {
							k.resize = "s" + k.resize;
							SKEW.changeY = 1;
						} else {
							SKEW.changeY = 0;
						}
						changeCur(k.resize);
						if(SKEW.changeY == 0 && SKEW.changeX == 0) {
							changeCur();
						}
						if(x > 0 && x < k.bw && y > 0 && y < k.bh) {
							SKEW.inster = 1;
						} else {
							SKEW.inster = 0;
						}
					}

				}

				function skewDown(e) {
					//				存储状态
					SKEW.boxX = $("#skew").position().left;
					SKEW.boxY = $("#skew").position().top;
					SKEW.cw = $("#skew").width();
					SKEW.ch = $("#skew").height();
					var e = e || window.event;
					SKEW.dx = e.clientX;
					SKEW.dy = e.clientY;

					if(SKEW.changeY == 0 && SKEW.changeX == 0) {
						if(SKEW.inster) {
							SKEW.moveFlag = 1; //移动
						} else {
							SKEW.moveFlag = 0;
						}
					} else {
						SKEW.moveFlag = 2;
					}
					SKEW.mark = 1;

				}

				//	根据位置改变鼠标样式
				function changeCur(css) {
					var left = $("#skew").position().left;
					var top = $("#skew").position().top;
					var bw = $("#skew").width();
					var bh = $("#skew").height();

					if(css) {
						$("#editBox,#skew").css("cursor", css);
					} else {
						$("#editBox,#skew").removeAttr("style");
						$("#skew").css({
							"left": left,
							"top": top,
							"width": bw,
							"height": bh
						});
					}

				}

				function clearMark() {
					hisData = [];
					degIndex = 0;
					rotateChange = 0;
					clearFirst = 1;
					//清除保存状态
					$("#save_btn").addClass("gray");
					$(".editBtn").removeClass("edit_select")
				}

				//展示模糊区域选择
				$("#edit_msk").hover(function() {
					if($(this).hasClass("edit_select")) {
						$(".msk_size").stop().animate({
							"right": 0
						}, 200);
					}
				}, function() {
					$(".msk_size").stop().animate({
						"right": 100
					}, 200);
				})
				$(".msk_size").hover(function() {
					$(".msk_size").stop().animate({
						"right": 0
					}, 200);
				}, function() {
					$(".msk_size").stop().animate({
						"right": 100
					}, 200);
				})

				$(".clickOne").on({
					mousedown: function() {
						$(this).addClass("edit_select").siblings().removeClass("edit_select");
					},
					mouseup: function() {
						$(this).removeClass("edit_select");
					}
				})

				$(".model .close ").click(function() {
					$(".model").addClass("hide");
					clearMark();
				})

				//    图片上传，将base64的图片转成二进制对象，塞进formdata上传

				function upload(basestr, type, $li) {
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
					formdata.append('file1', blob, "icon-m1.png");
					xhr.open('post',opt.url);//图片上传地址
					xhr.onreadystatechange = function() {
						if(xhr.readyState == 4 && xhr.status == 200) {
							if(JSON.decode) {
								var data = JSON.decode(xhr.responseText);
							} else {
								var data = JSON.parse(xhr.responseText);
							}
							console.log(data)
							var index = $li.index();
							addEditfunc(index, data.relativePath);
							var src = data.small_img_path.replace("300_200", "400_300");
							$li.find('.pPhoto').addClass("loadSuccess").find("img").attr("src", src);
						}
					};
					//数据发送进度，前50%展示该进度
					xhr.upload.addEventListener('progress', function(e) {
						if(loop) return;
						pecent = ~~(100 * e.loaded / e.total) / 2;
						$li.find(".jd-bg").css('width', pecent + "%");
						$li.find(".percentage").text("上传中" + pecent + "%");

						if(pecent == 50) {
							mockProgress();
						}
					}, false);
					//数据后50%用模拟进度
					function mockProgress() {
						if(loop) return;
						loop = setInterval(function() {
							pecent++;
							$li.find(".jd-bg").css('width', pecent + "%");
							$li.find(".percentage").text("上传中" + pecent + "%");
							if(pecent == 100) {
								clearInterval(loop);
								$li.find(".percentage").text("上传成功");
							}
						}, 20)
					}
					xhr.send(formdata);
				}
				//	带进度条的上传中
				function addJD(src) {

					var other = '<li class="viewli"><p class="pPhoto"><img src="' + src + '"></p><p class="pFont"><i class="jd-bg"><span class="percentage">上传中0%</span></i></p></li>';
//					$('#picViewUl').append(other);
					opt.viewBox.append(other);
					var $li = $("#picViewUl .viewli").last();
					//   if ($li.index()==0) {
					//      $li.find('.pPhoto').append('<span class="pCover"></span>');
					//  } else {
					//      $li.find('.pPhoto').append('<span class="pGotop" onclick="gotoTop(this);" style="display:none;">设为封面</span>');
					//  }
					return $li;
				}

				function successUpdeat(data, $li) {

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
					opt.fileBtn.change(function() {
					var files = this.files,
						arr = [];
					for(var i = 0; i < files.length; i++) {
						var src = handleFiles(files[i]);
						var count = opt.viewBox.find("li").length;
						if(count >= 16) {
							alert("您不能上传更多的图片!");
							return;
						}
						var $li = addJD(src);
						$("").showimg({
							src: src,
							$li: $li,
							size: files[i].size,
							fn: opt.upload
						})
					}
				})

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

				return this;
			}

		});
		//}(jQuery));


		//init

	}(jQuery));
	$("#editCanvas").editImg({
			edit: 1,
			isfix: 1,
			maxWidth:800,
			viewBox:$("#view"),
			fileBtn:$("#file2")
		});
//	$("").showimg("img/4c13c40cc2082ae82f7f44e0df2928cc.jpg");
//	$("").showimg({
//		src:"img/4c13c40cc2082ae82f7f44e0df2928cc.jpg",//图片地址
//		fn:function(data){//回调函数，可拿到参数图片处理后的string
//			console.log(data.length)
//		}
//	});

					//圖片預覽地址
				function handleFiles(obj) {
					var img = new Image();
					img.src = window.URL.createObjectURL(obj); //创建一个object URL，并不是你的本地路径
					return img.src;
				}
		

})