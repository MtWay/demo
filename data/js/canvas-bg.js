	var swperIndex = 1;
$(function() {

	var canvas = $("#index-bg")[0];
	var ctx = canvas.getContext("2d");
	ctx.translate(70, 70);
	var cw = $("#index-bg").width();
	var ch = $("#index-bg").height();
	var time = 5000; //动画总时长
	var openTime = new Date();
//	var a = 0;
	var dgData = {};


	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	$("body")[0].appendChild(stats.domElement);
	//心跳动画
	dgData.dataHert = made({
		x: formatting(652),
		y: formatting(985),
		w: formatting(98),
		log:20,
		vy: 0.5,
	});

	dgData.dataHertYy = made({
		x: formatting(660),
		y: formatting(1108),
		w: formatting(72),
		vx: -0.2,
		vy: -0.2,
		log:20,
		vw: 0.5,
	})

	dgData.cloud1 = made({
		x: formatting(38),
		y: formatting(1378),
		w: formatting(65),
		index: 3, //当前
		log:20,
		vy: 0.2,
	});
	dgData.cloud2 = made({
		x: formatting(198),
		y: formatting(1129),
		w: formatting(82),
		index: -8, //当前
		log:25,
		vy: 0.2,
	});
	dgData.cloud3 = made({
		x: formatting(842),
		y: formatting(1313),
		w: formatting(50),
		index: -2, //当前
		log:25,
		vy: 0.1,
	});
	dgData.cloud4 = made({
		x: formatting(1096),
		y: formatting(1076),
		w: formatting(41),
		index: -1, //当前
		log:20,
		vy: 0.1,
	});

	resize();

	drawImg("img/bg-top.png", 0, 0, cw); //顶部的✿
	drawImg("img/bg-phone.png", 0.02 * cw, 1.1 * cw, 0.9 * cw); //手机出现
	$(".animate1").width(0);
	//	setTimeout(function(){
	//		drawImg("img/bg-floor.png",0.48*cw,1.449*cw,0.24*cw);//楼梯出现	
	//	},500)

	//  context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
	//  img	规定要使用的图像、画布或视频。
	//sx	可选。开始剪切的 x 坐标位置。
	//sy	可选。开始剪切的 y 坐标位置。
	//swidth	可选。被剪切图像的宽度。
	//sheight	可选。被剪切图像的高度。
	//x	在画布上放置图像的 x 坐标位置。
	//y	在画布上放置图像的 y 坐标位置。
	//width	可选。要使用的图像的宽度。（伸展或缩小图像）
	//height	可选。要使用的图像的高度。（伸展或缩小图像）

	//生成运动的参数
	function made(option) {
		var defaults = {
			x: 0,
			y: 0,
			w: 0,
			vx: 0,
			vy: 0,
			vw: 0,
			index: 0, //当前
			log: 10, //周期次数
			dindex: 1 //频率
		};
		return $.extend(true, defaults, option);

	}

	//按设计图转为合适的尺寸
	function formatting(num) {
//		return num / 1242 * cw;
		return num;
	}
	
	//面向对象
	function dot(option){
		var defaults = {
			src: "",
			firstx: 0, //初始x
			firsty: 0,
			lastx: null, //结束x
			lasty: null,
			firstw: 0,
			//			firsth:0,
			lastw: null,
			//			lasth:0,
			start: 0, //0-100(在动画的什么进度开始)
			over: time, //结束时间
			overCb: null, //动画结束回调
			springback: 0, //回弹系数
			opacity: 1, //渐变出现,0-1
			state: "", //结束后效果，可选hide，heart
			transition: "linear", //运动曲线, 可选linear,FastOut,
			data: {},
			firstShow:0,//是否只在第一屏展示
			x: 0,//绘制坐标
			y: 0,
			w: 0,
			vx: 0,//改变量
			vy: 0,
			vw: 0,
			index: 0, //当前
			log: 10, //周期次数
			dindex: 1 //频率
		};
		
		var opt = $.extend(true, defaults, option);
		
		if(opt.lastx == null) {
			opt.lastx  = opt.firstx;
		}
		if(opt.lasty == null) {
			opt.lasty  = opt.firsty;
		}
		if(opt.lastw == null) {
			opt.lastw  = opt.firstw;
		}
//		opt.x = opt.lastx;
//		opt.y = opt.lasty;
//		opt.w = opt.lastw;
		
		return opt;
		
	}
	$(document).click(function(){
		animates.H.y=1;
	})
	
	var animates = {};//动画组
	

	
	
	//先画的会被后画的遮盖，先后与书写顺序有关，时间影响出场顺序；
		//woman
		animates.woman =new dot({
			src: "img/woman.png",
			firstx: formatting(757),
			firsty: formatting(1403),
			firstw: formatting(93),
			start: 2000,
			over: 2300,
			opacity: 0,
			firstShow:1
		})

		//man
		animates.man =new dot({
			src: "img/man.png",
			firstx: formatting(978),
			firsty: formatting(1838),
			firstw: formatting(97),
			start: 2300,
			over: 2600,
			opacity: 0,
			firstShow:1
		})
		
			animates.H=new dot({
		src: "img/h.png",
			firstx: 333,
			firsty: 376,
			lasty: 1076,
			firstw: 449,
			start: 500,
			over: 800,
			transition: "FastOut",
						springback:0.1,
			overCb: function() {
				$("#index-bg").addClass("shake");
				console.log(this)
					this.overCb=null;//执行一次
				setTimeout(function() {
					$("#index-bg").removeClass("shake-constant").addClass("shake-off"); //停止抖动
				}, 150)
			}
	})

		//楼梯由右侧出现
		animates.floor1 =new dot({
			src: "img/bg-floor1.png",
			firstx: formatting(1066),
			lastx: formatting(635),
			firsty: formatting(1607),
			lasty: formatting(1860),
			//			lastw: 0.24 * cw,
			firstw: formatting(260),
			springback: 0.5,
			start: 900,
			over: 1100,
			firstShow:1
		})

		animates.floor2 =new dot({
			src: "img/bg-floor1.png",
			firstx: formatting(1066),
			lastx: formatting(595),
			firsty: formatting(1607),
			lasty: formatting(1807),
			//			lastw: 0.24 * cw,
			firstw: formatting(260),
			springback: 0.5,
			start: 1000,
			over: 1200,
			firstShow:1
		})


		//hb1
		animates.coin1 =new dot({
			src: "img/coin1.png",
			firstx: formatting(378),
			firsty: formatting(247),
			lasty: formatting(1247),
			firstw: formatting(143),
			start: 1200,
			over: 1300,
			opacity: 0.5
		})

		//hb2
		animates.coin2 =new dot({
				src: "img/coin2.png",
				firstx: formatting(375),
				firsty: formatting(247),
				lasty: formatting(1233),
				firstw: formatting(99),
				start: 1300,
				over: 1400,
				opacity: 0.5,
				state: "hide"
			})
			//hb2稍微动一下
		animates.coin2s =new dot({
			src: "img/coin2.png",
			firstx: formatting(365),
			lastx: formatting(395),
			firsty: formatting(1223),
			lasty: formatting(1223),
			firstw: formatting(99),
			start: 1400,
			over: 1500
		})

//		//herat
//		animates.heartYy =new dot({
//			src: "img/heart.png",
//			firstx: formatting(680),
//			lastx: formatting(652),
//			firsty: formatting(1023),
//			lasty: formatting(993),
//			firstw: formatting(20),
//			lastw: formatting(98),
//			start: 1300,
//			over: 1500,
//			state: "heart",
//			data: 'dataHert'
//		})
//
//		//桃心投影
//		animates.heartYy =new dot({
//			src: "img/heart-yy.png",
//			firstx: formatting(680),
//			lastx: formatting(660),
//			firsty: formatting(1138),
//			lasty: formatting(1108),
//			firstw: formatting(20),
//			lastw: formatting(72),
//			start: 1300,
//			over: 1500,
//			state: "heart",
//			data: 'dataHertYy'
//		})

		//herat
	animates.heart =new dot({
			src: "img/heart.png",
			firstx: 680,
			lastx: 652,
			firsty: 1043,
			lasty: 1013,
			firstw: 20,
			lastw: 98,
			start: 1300,
			over: 1500,
			log:5,
			vy: 2,
			state: "heart",
			data: 'dataHert'
		})

		//桃心投影
	animates.heartYy =new dot({
			src: "img/heart-yy.png",
			firstx: 680,
			lastx: 660,
			firsty:	1158,
			lasty: 1128,
			firstw: 20,
			lastw:72,
			start: 1300,
			over: 1500,
			vx: -0.8,
			vy: -0.8,
			log:5,
			vw: 2,
			state: "heart",
			data: 'dataHertYy'
		})
		

		//		小树
		animates.tree1 =new dot({
				src: "img/tree1.png",
				firstx: formatting(280),
				lastx: formatting(253),
				firsty: formatting(1700),
				lasty: formatting(1594),
				firstw: formatting(5),
				lastw: formatting(49),
				springback: 1,
				start: 1000,
				over: 1500
			})
			//2
		animates.tree2 =new dot({
				src: "img/tree1.png",
				firstx: formatting(250),
				lastx: formatting(221),
				firsty: formatting(1727),
				lasty: formatting(1617),
				firstw: formatting(5),
				lastw: formatting(49),
				springback: 1,
				start: 1100,
				over: 1600
			})
			//小树阴影
		animates.treeYy =new dot({
			src: "img/tree-yy.png",
			firstx: formatting(504),
			//			lastx: 0.414 * cw,
			firsty: formatting(2028),
			//			lasty: 1.536* cw,
			//			lastw: 0.06* cw,
			firstw: formatting(153),
			start: 1700,
			firstShow:1,
			over: 1800,
			overCb:function(){
				if(!$(".door").hasClass("showBtns"))
				$(".door .btn").animate({ left: '0' }, 1500, 'easeOutElastic', function () {})
				$(".door").addClass("showBtns");
			}
		})

		//road
		animates.road =new dot({
				src: "img/road.png",
				firstx: formatting(390),
				firsty: formatting(876),
				firstw: formatting(807),
				start: 500,
				over: 1000,
				opacity: 0,
				firstShow:1
			})
			//3树
		animates.tree3 =new dot({
			src: "img/tree2.png",
			firstx: formatting(590),
			lastx: formatting(552),
			firsty: formatting(2053),
			lasty: formatting(1883),
			firstw: formatting(5),
			lastw: formatting(74),
			springback: 1,
			start: 1500,
			over: 2000,
			firstShow:1
		})

		//4
		animates.tree4 =new dot({
			src: "img/tree2.png",
			firstx: formatting(542),
			lastx: formatting(504),
			firsty: formatting(2088),
			lasty: formatting(1918),
			firstw: formatting(5),
			lastw: formatting(74),
			springback: 1,
			start: 1600,
			over: 2100,
			firstShow:1
		})

		//car1 第一段路
		//		animates.heartYy =new dot({
		//			src: "img/bg-car-right.png",
		//			firstx: formatting(924),
		//			lastx: formatting(1016),
		//			firsty: formatting(865),
		//			lasty: formatting(933),
		//			firstw: formatting(5),
		//			lastw: formatting(35),
		//			start: 1000,
		//			over: 1300,
		//			state:"hide"
		//		})
		//car1 第一段路

		animates.car1 =new dot({
				src: "img/bg-car.png",
				firstx: formatting(1016),
				lastx: formatting(886),
				firsty: formatting(933),
				lasty: formatting(1156),
				firstw: formatting(35),
				lastw: formatting(80),
				start: 1000,
				over: 1300,
				state: "hide"
			})
			//car1 第2段路

		animates.car2 =new dot({
				src: "img/bg-car-right.png",
				firstx: formatting(886),
				lastx: formatting(1067),
				firsty: formatting(1156),
				lasty: formatting(1313),
				firstw: formatting(80),
				lastw: formatting(120),
				start: 1300,
				over: 1600,
				state: "hide"
			})
			//car1 第3段路

		animates.car3 =new dot({
			src: "img/bg-car.png",
			firstx: formatting(1067),
			lastx: formatting(607),
			firsty: formatting(1313),
			lasty: formatting(1636),
			firstw: formatting(120),
			lastw: formatting(217),
			start: 1600,
			over: 1900
		})

		//云朵 由左向右
		animates.cloud1 =new dot({
			src: "img/cloud.png",
			firstx: formatting(48),
			firsty: formatting(1387),
			firstw: formatting(65),
			start: 1000,
			over: 1500,
			opacity: 0,
			state: "heart",
			data: "cloud1"
		})

		animates.cloud2 =new dot({
			src: "img/cloud.png",
			firstx: formatting(198),
			firsty: formatting(1129),
			firstw: formatting(82),
			start: 1100,
			over: 1600,
			opacity: 0,
			state: "heart",
			data: "cloud2"
		})

		animates.cloud3 =new dot({
			src: "img/cloud.png",
			firstx: formatting(842),
			firsty: formatting(1313),
			firstw: formatting(50),
			start: 1200,
			over: 1700,
			opacity: 0,
			state: "heart",
			data: "cloud3"
		})
		animates.cloud4 =new dot({
			src: "img/cloud.png",
			firstx: formatting(1096),
			firsty: formatting(1076),
			firstw: formatting(41),
			start: 1300,
			over: 1800,
			opacity: 0,
			state: "heart",
			data: "cloud4"
		})
	loop1()
	
	function loop1(){
		
//		console.log(1)
		resize();
		var len = animates.length;
		var now = new Date()- openTime;
				if(swperIndex==1){
		drawImg("img/bg-phone.png", formatting(30), formatting(1369), formatting(1120)); //手机出现
		}
//		console.log(now)
		for(var i in animates){
			if(now>animates[i].start && now<animates[i].over){
				var dt = animates[i].over - animates[i].start;
				var springback = 1 + animates[i].springback;
				var thist = (now  - animates[i].start) * springback; //当前帧
				if(thist > dt * (1 + animates[i].springback / 2)) { //回弹
					thist = dt * 2 * (1 + animates[i].springback / 2) - thist;
				}
				animates[i].x = animates[i].firstx + (animates[i].lastx - animates[i].firstx) / dt * thist;
				animates[i].y = animates[i].firsty + (animates[i].lasty - animates[i].firsty) / dt * thist;
				animates[i].w = animates[i].firstw + (animates[i].lastw - animates[i].firstw) / dt * thist;
				var opa = (1 - animates[i].opacity) / dt * (now  - animates[i].start); //淡出
				if(animates[i].transition == "FastOut") { //加速运动
					var a = (animates[i].lasty - animates[i].firsty) * 2 / Math.pow(dt, 2);
					y = animates[i].firsty + a * Math.pow(thist, 2) / 2;
				}
			}
			
			if(now>animates[i].over ){
				//出场结束后效果
				if(animates[i].isShow){
					//保存结束状态
					animates[i].isshow=1
					animates[i].x = animates[i].lastx ;
					animates[i].y = animates[i].y ;
					animates[i].w = animates[i].w ;
				}
				
				if(animates[i].state=="heart"){
					animates[i].y+=animates[i].vy;
					animates[i].x+=animates[i].vx;
					animates[i].w+=animates[i].vw;
					console.log(animates[i].y-animates[i].lasty)
					if((animates[i].y-animates[i].lasty)/animates[i].vy>=animates[i].log){
//						单侧结束
						animates[i].vy=-animates[i].vy;
						animates[i].vx=-animates[i].vx;
						animates[i].vw=-animates[i].vw;
					}
				}
				if(animates[i].state=="hide"){
					opa=0.1;
				}
				
				if(typeof animates[i].overCb === "function"){
					animates[i].overCb()
				}
			}
				drawImg(animates[i].src, animates[i].x, animates[i].y, animates[i].w, 0, opa);
				
		}
		stats.update();
		requestAnimationFrame(loop1)
	}

	//每一部分的动画
	function anim(option) {
		var defaults = {
			src: "",
			firstx: 0, //初始x
			firsty: 0,
			lastx: null, //结束x
			lasty: null,
			firstw: 0,
			//			firsth:0,
			lastw: null,
			//			lasth:0,
			start: 0, //0-100(在动画的什么进度开始)
			over: time, //结束时间
			overCb: null, //动画结束回调
			springback: 0, //回弹系数
			opacity: 1, //渐变出现,0-1
			state: "", //结束后效果，可选hide，heart
			transition: "linear", //运动曲线, 可选linear,FastOut,
			data: {},
			firstShow:0//是否只在第一屏展示
		};

		var opt = $.extend(true, defaults, option);
		if(opt.firstShow && swperIndex!=1){
			return false;//只在首屏展示
		}
		if(opt.lastx == null) {
			opt.lastx = opt.firstx;
		}
		if(opt.lasty == null) {
			opt.lasty = opt.firsty;
		}
		if(opt.lastw == null) {
			opt.lastw = opt.firstw;
		}
		var dt = opt.over - opt.start; //动画持续时间
		//		var i = 0,timer,ndata;
		var now = new Date();
		if(now - openTime > opt.start) {
			if(now - openTime == opt.over) {
				console.log(2)
			}
			if(now - openTime > opt.over) {
				//				console.log(now-time)
				if(typeof opt.overCb == "function") {
					opt.overCb();
				}
				if(opt.state != "hide") {
					if(opt.state == "heart") { //加心跳
						dgData[opt.data].index += dgData[opt.data].dindex;
						if(Math.abs(dgData[opt.data].index) > dgData[opt.data].log) {
							dgData[opt.data].dindex = -dgData[opt.data].dindex;
							//						dgData[opt.data].index = -dgData[opt.data].log;
						}
						var x = dgData[opt.data].x + dgData[opt.data].vx * dgData[opt.data].index;
						var y = dgData[opt.data].y + dgData[opt.data].vy * dgData[opt.data].index;
						var w = dgData[opt.data].w + dgData[opt.data].vw * dgData[opt.data].index;
						//					dgData[opt.data].y+=dgData[opt.data].vy*dgData[opt.data].index;
						//					dgData[opt.data].w+=dgData[opt.data].vw*dgData[opt.data].index;
						return drawImg(opt.src, x, y, w);

					}

					return drawImg(opt.src, opt.lastx, opt.lasty, opt.lastw);
				}
			} else {
				var springback = 1 + opt.springback;
				var thist = (now - openTime - opt.start) * springback; //当前帧
				if(thist > dt * (1 + opt.springback / 2)) { //回弹
					thist = dt * 2 * (1 + opt.springback / 2) - thist;
				}
				var x = opt.firstx + (opt.lastx - opt.firstx) / dt * thist;
				var y = opt.firsty + (opt.lasty - opt.firsty) / dt * thist;
				var w = opt.firstw + (opt.lastw - opt.firstw) / dt * thist;
				var opa = (1 - opt.opacity) / dt * (now - openTime - opt.start); //淡出
				if(opt.transition == "FastOut") { //加速运动
					var a = (opt.lasty - opt.firsty) / 2 / Math.sqrt(dt / 1000, 2);
					y = opt.firsty + a * Math.pow(thist / 1000, 2) / 2;
				}
				//				console.log(x)
				return drawImg(opt.src, x, y, w, 0, opa);
			}
		}

	}
//	loop();

	function loop() {
		resize();
		//		hcb();
		//		console.log(1)
//		drawImg("img/bg-top.png", 0, 0, cw); //顶部的✿
		if(swperIndex==1){
		drawImg("img/bg-phone.png", formatting(30), formatting(1369), formatting(1120)); //手机出现
		}

		//先画的会被后画的遮盖，先后与书写顺序有关，时间影响出场顺序；
		//woman
		anim({
			src: "img/woman.png",
			firstx: formatting(757),
			firsty: formatting(1403),
			firstw: formatting(93),
			start: 2000,
			over: 2300,
			opacity: 0,
			firstShow:1
		})

		//man
		anim({
			src: "img/man.png",
			firstx: formatting(978),
			firsty: formatting(1838),
			firstw: formatting(97),
			start: 2300,
			over: 2600,
			opacity: 0,
			firstShow:1
		})

		//楼梯由右侧出现
		anim({
			src: "img/bg-floor1.png",
			firstx: formatting(1066),
			lastx: formatting(635),
			firsty: formatting(1607),
			lasty: formatting(1860),
			//			lastw: 0.24 * cw,
			firstw: formatting(260),
			springback: 0.5,
			start: 900,
			over: 1100,
			firstShow:1
		})

		anim({
			src: "img/bg-floor1.png",
			firstx: formatting(1066),
			lastx: formatting(595),
			firsty: formatting(1607),
			lasty: formatting(1807),
			//			lastw: 0.24 * cw,
			firstw: formatting(260),
			springback: 0.5,
			start: 1000,
			over: 1200,
			firstShow:1
		})

		//H由天而降
		anim({
			src: "img/h.png",
			firstx: formatting(333),
			firsty: formatting(376),
			lasty: formatting(1076),
			firstw: formatting(449),
			start: 500,
			over: 800,
			transition: "FastOut",
			//			springback:0.03,
			overCb: function() {
				$("#index-bg").addClass("shake");
				setTimeout(function() {
					$("#index-bg").removeClass("shake-constant").addClass("shake-off"); //停止抖动
				}, 150)
			}
		})

		//hb1
		anim({
			src: "img/coin1.png",
			firstx: formatting(378),
			firsty: formatting(247),
			lasty: formatting(1247),
			firstw: formatting(143),
			start: 1200,
			over: 1300,
			opacity: 0.5
		})

		//hb2
		anim({
				src: "img/coin2.png",
				firstx: formatting(375),
				firsty: formatting(247),
				lasty: formatting(1233),
				firstw: formatting(99),
				start: 1300,
				over: 1400,
				opacity: 0.5,
				state: "hide"
			})
			//hb2稍微动一下
		anim({
			src: "img/coin2.png",
			firstx: formatting(365),
			lastx: formatting(395),
			firsty: formatting(1223),
			lasty: formatting(1223),
			firstw: formatting(99),
			start: 1400,
			over: 1500
		})

		//herat
		anim({
			src: "img/heart.png",
			firstx: formatting(680),
			lastx: formatting(652),
			firsty: formatting(1023),
			lasty: formatting(993),
			firstw: formatting(20),
			lastw: formatting(98),
			start: 1300,
			over: 1500,
			state: "heart",
			data: 'dataHert'
		})

		//桃心投影
		anim({
			src: "img/heart-yy.png",
			firstx: formatting(680),
			lastx: formatting(660),
			firsty: formatting(1138),
			lasty: formatting(1108),
			firstw: formatting(20),
			lastw: formatting(72),
			start: 1300,
			over: 1500,
			state: "heart",
			data: 'dataHertYy'
		})

		//		小树
		anim({
				src: "img/tree1.png",
				firstx: formatting(280),
				lastx: formatting(253),
				firsty: formatting(1700),
				lasty: formatting(1594),
				firstw: formatting(5),
				lastw: formatting(49),
				springback: 1,
				start: 1000,
				over: 1500
			})
			//2
		anim({
				src: "img/tree1.png",
				firstx: formatting(250),
				lastx: formatting(221),
				firsty: formatting(1727),
				lasty: formatting(1617),
				firstw: formatting(5),
				lastw: formatting(49),
				springback: 1,
				start: 1100,
				over: 1600
			})
			//小树阴影
		anim({
			src: "img/tree-yy.png",
			firstx: formatting(504),
			//			lastx: 0.414 * cw,
			firsty: formatting(2028),
			//			lasty: 1.536* cw,
			//			lastw: 0.06* cw,
			firstw: formatting(153),
			start: 1700,
			firstShow:1,
			over: 1800,
			overCb:function(){
				if(!$(".door").hasClass("showBtns"))
				$(".door .btn").animate({ left: '0' }, 1500, 'easeOutElastic', function () {})
				$(".door").addClass("showBtns");
			}
		})

		//road
		anim({
				src: "img/road.png",
				firstx: formatting(390),
				firsty: formatting(876),
				firstw: formatting(807),
				start: 500,
				over: 1000,
				opacity: 0,
				firstShow:1
			})
			//3树
		anim({
			src: "img/tree2.png",
			firstx: formatting(590),
			lastx: formatting(552),
			firsty: formatting(2053),
			lasty: formatting(1883),
			firstw: formatting(5),
			lastw: formatting(74),
			springback: 1,
			start: 1500,
			over: 2000,
			firstShow:1
		})

		//4
		anim({
			src: "img/tree2.png",
			firstx: formatting(542),
			lastx: formatting(504),
			firsty: formatting(2088),
			lasty: formatting(1918),
			firstw: formatting(5),
			lastw: formatting(74),
			springback: 1,
			start: 1600,
			over: 2100,
			firstShow:1
		})

		//car1 第一段路
		//		anim({
		//			src: "img/bg-car-right.png",
		//			firstx: formatting(924),
		//			lastx: formatting(1016),
		//			firsty: formatting(865),
		//			lasty: formatting(933),
		//			firstw: formatting(5),
		//			lastw: formatting(35),
		//			start: 1000,
		//			over: 1300,
		//			state:"hide"
		//		})
		//car1 第一段路

		anim({
				src: "img/bg-car.png",
				firstx: formatting(1016),
				lastx: formatting(886),
				firsty: formatting(933),
				lasty: formatting(1156),
				firstw: formatting(35),
				lastw: formatting(80),
				start: 1000,
				over: 1300,
				state: "hide"
			})
			//car1 第2段路

		anim({
				src: "img/bg-car-right.png",
				firstx: formatting(886),
				lastx: formatting(1067),
				firsty: formatting(1156),
				lasty: formatting(1313),
				firstw: formatting(80),
				lastw: formatting(120),
				start: 1300,
				over: 1600,
				state: "hide"
			})
			//car1 第3段路

		anim({
			src: "img/bg-car.png",
			firstx: formatting(1067),
			lastx: formatting(607),
			firsty: formatting(1313),
			lasty: formatting(1636),
			firstw: formatting(120),
			lastw: formatting(217),
			start: 1600,
			over: 1900
		})

		//云朵 由左向右
		anim({
			src: "img/cloud.png",
			firstx: formatting(48),
			firsty: formatting(1387),
			firstw: formatting(65),
			start: 1000,
			over: 1500,
			opacity: 0,
			state: "heart",
			data: "cloud1"
		})

		anim({
			src: "img/cloud.png",
			firstx: formatting(198),
			firsty: formatting(1129),
			firstw: formatting(82),
			start: 1100,
			over: 1600,
			opacity: 0,
			state: "heart",
			data: "cloud2"
		})

		anim({
			src: "img/cloud.png",
			firstx: formatting(842),
			firsty: formatting(1313),
			firstw: formatting(50),
			start: 1200,
			over: 1700,
			opacity: 0,
			state: "heart",
			data: "cloud3"
		})
		anim({
			src: "img/cloud.png",
			firstx: formatting(1096),
			firsty: formatting(1076),
			firstw: formatting(41),
			start: 1300,
			over: 1800,
			opacity: 0,
			state: "heart",
			data: "cloud4"
		})

		stats.update();

		var now = new Date();
		//		if(now - openTime < time) {
		requestAnimationFrame(loop);
		//		}
	}
	//	setInterval(loop,1000/60)

	function drawImg(src, x, y, w, h, opacity) {
		var opacity = opacity || 1;
		var img = new Image();
		img.src = src;
		//		img.onload=function(){
		var s = img.width / img.height;
		if(!h || h == 0) {
			h = w / s;
		}
		ctx.globalAlpha = opacity; //透明度
		ctx.drawImage(img, x, y, w, h);
		ctx.globalAlpha = 0;
		//		}
	}

	function rotate(deg) {
		ctx.rotate(deg);
	}

	function resize() {
//		$("#index-bg").attr({
//			"width": cw,
//			"height": ch
//		})
		$("#index-bg").attr({
			"width": 1242,
			"height": 2208
		})
//		ctx.beginPath();
//		ctx.fillStyle = "#fff";
//		ctx.rect(0, 0, cw, ch);
//		ctx.fill();
	}
})