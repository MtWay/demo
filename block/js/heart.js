var progressMark = 0,mySwipers;
$(function() {
	stats = new Stats();

	stats.setMode(0);

	stats.domElement.style.position = 'absolute';

	stats.domElement.style.right = '0px';

	stats.domElement.style.top = '0px';
	var index = 0;
	//				$(document).mousemove(function(e) {
	//					//        index++;
	//					var e = e || window.e;
	//					var l = e.clientX - 25,
	//						t = e.clientY - 25,
	//						$div = document.createElement("div"),
	//						r = Math.floor(Math.random() * 8),
	//						R2 = Math.floor(Math.random() * 6),
	//						color = ["#f00", "#00f", "#0f0", "#ff0", "#0ff", "#ccc"];
	//					$($div).css({ left: l, top: t }).addClass("lit" + r).addClass("lit");
	//					//        if(index%3==0)
	//					$("body").append($div);
	//					setTimeout(function() {
	//						$($div).remove();
	//					}, 900)
	//				})
	$(document).on("touchmove", function(e) {
		//		console.log(e);
		var l = e.touches[0].clientX - 25,
			t = e.touches[0].clientY - 25;
		addHeart(l, t)

	})
	var start = [];
	for(var i = 0.1; i < 10; i += 0.2) {
		var a = 10;
		start.push({
			x: a * (2 * Math.cos(i) - Math.cos(2 * i)) * 5,
			y: a * (2 * Math.sin(i) - Math.sin(2 * i)) * 5,
			z: 0,
		})
	}
	for(var i = 0; i < 50; i++) {
		var a = -Math.PI / 2; //逆时针转90度
		var x = start[i].x;
		var y = start[i].y;
		start[i].x = Math.cos(a) * x - Math.sin(a) * y;
		start[i].y = Math.cos(a) * y + Math.sin(a) * x;
	}

	var imglist = [
		'img/8f030a025b785cc9563e8947ce08bffe.JPG',
		'img/4c13c40cc2082ae82f7f44e0df2928cc.jpg',
		'img/955a4385598e51cfa695e6906fc0f3f1.JPG',
		'img/aa59236d7e76d02a65033fcfd14ee10d.jpeg',
		'img/8f030a025b785cc9563e8947ce08bffe.JPG',
		'img/4c13c40cc2082ae82f7f44e0df2928cc.jpg',
		'img/955a4385598e51cfa695e6906fc0f3f1.JPG',
		'img/aa59236d7e76d02a65033fcfd14ee10d.jpeg',
		'img/8f030a025b785cc9563e8947ce08bffe.JPG',
		'img/4c13c40cc2082ae82f7f44e0df2928cc.jpg',
		'img/955a4385598e51cfa695e6906fc0f3f1.JPG',
		'img/aa59236d7e76d02a65033fcfd14ee10d.jpeg',
		'img/8f030a025b785cc9563e8947ce08bffe.JPG',
		'img/4c13c40cc2082ae82f7f44e0df2928cc.jpg',
		'img/955a4385598e51cfa695e6906fc0f3f1.JPG',
		'img/aa59236d7e76d02a65033fcfd14ee10d.jpeg',
	]

	initmore(imglist);

	function initmore(imglist) {
		$(".s3bg").attr("src", imglist[0]);
		var list = [0, 2, 4, 15, 19, 20, 21, 23, 24];
		var str = "";
		var btr = ""; //大图用
		for(var i = 0; i < 25; i++) {
			if(list.indexOf(i) >= 0) {
				str += "<div class='nob'></div>";
			} else {
				str += "<div class='himg'></div>";
			}
		}
		$(".more").append(str);
		$(".himg").each(function(i, n) {
			$(n).append("<img data-index='"+i+"' src='" + imglist[i] + "' />")
			btr += "<div class='swiper-slide'><img src='" + imglist[i] + "'/></div>"
		})
		$(".more1").append(btr);
		$(".swiper-container1 img").click(function(e) {
			e.stopPropagation();
			console.log(1)
		})
		 mySwipers = new Swiper('.swiper-container1', {
			zoom: true,
			//		autoHeight:true
		})
		
		$(".himg img").click(function() {
			var index = $(this).data("index")
			console.log(index)
			
			$(".bigimg").removeClass("hide")
			mySwipers.slideTo(index)
		})
	

	}

	$(".swiper-container1").click(function() {
		$('.bigimg').addClass("hide");
	})

	//	console.log(start)
	var hindex = 1;
	//	setTimeout(function(){
	function go() {
		var img = new Image();
		img.src = "img/4c13c40cc2082ae82f7f44e0df2928cc.jpg";
		img.onload = function() {
			$(".banner").addClass("toup");
		};
	}

	go();
	$(".banner").on("animationend", function() {
		$(".swiper-slide").eq(0).addClass("show1")
		hoop()
		progressMark = 1;
	})
	//	})
	//	hoop()
	function hoop() {
		hindex += 0.6;
		var len = start.length;
		for(var i = 0; i < len; i++) {
			addHeart(150 + start[i].x * hindex * 0.3, 250 + start[i].y * hindex * 0.3)
		}
		//		console.log(status)
		//			    	stats.update();
		if(hindex < 10) {
			requestAnimationFrame(hoop);
		} else {
			$(".swiper-slide").eq(0).addClass("show");
			$(".bottomArrow").removeClass("hide")
		}
	}
	//	setInterval(hoop,12)

	function addHeart(x, y) {
		index++
		var $div = document.createElement("div"),
			r = Math.floor(Math.random() * 8);
		$($div).css({
				left: x,
				top: y
			})
			.addClass("lit" + r)
			.addClass("lit");
		//		        if(index%2==0)
		$("body").append($div);
		$($div).on('animationend', function() {
			//				console.log(this)
			$(this).remove()
		})

		//		setTimeout(function() {
		//			$($div).remove();
		//		}, 900)
	}

})