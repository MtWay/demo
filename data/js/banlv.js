$(function() {
	//自适应屏幕字体大小
	var cw = document.documentElement.clientWidth;
	if(cw > 1242) {
		cw = 1242;
	}
	document.getElementsByTagName("html")[0].style.fontSize = 20 * (cw / 621) + 'px';



	var swiper = new Swiper('.swiper-container', {
//      initialSlide:5,
		direction: 'vertical',
//		effect  : 'coverflow',
		pagination: {
			el: '.swiper-pagination',//导航点
//			clickable: true,
//			watchState:true,
		},
		navigation: {
        nextEl: '.door .btn',//到下一页

      },
	});
	
	$(".door .btn").click(function(){
		$("#index-bg").addClass("nofirst");
		swperIndex=2;
//		$(".second-bg").addClass("show");

		setTimeout(function(){
		$(".moneyList").addClass("show");
		},100)
	})
	
	$(".moneyList li").click(function(){
		$(this).addClass("isclick")
	})
	$(".conutryList li").click(function(){
		$(this).addClass("isclick")
	})
	
	//有车入口
	$("#havecar").click(function(){
		$(".havecar").removeClass("hide");
		$(".nocar").addClass("hide");
//		location.href="#slide2"
		$(".swiper-no-swiping").removeClass("swiper-no-swiping");//变得可操作
	})
	//无车入口
	$("#nocar").click(function(){
		$(".havecar").addClass("hide");
		$(".nocar").removeClass("hide");
//		location.href="#slide2"
		$(".door").removeClass("swiper-no-swiping");//变得可操作
	})
	
	//时间插件
	var calendar = new LCalendar();
		console.log(calendar);
		calendar.init({
			'trigger': '#tagTime', //标签id
			'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
			'minDate': (new Date().getFullYear()-20) + '-' + 1 + '-' + 1, //最小日期
			'maxDate': (new Date().getFullYear()) + '-' + 12 + '-' + 31 //最大日期
	});
	
	
	$(".model").delegate("li","click",function(){
		var txt = $(this).text();
		var id  = $(".model h2").data("name");
		$("#"+id).val(txt).parents('.section').removeClass("swiper-no-swiping");
		$("#next").click();
	})
	
	    //品牌车型
//  hx.MobileBrand({
//      getFirstgradeId: '#choiceBrands',
//      forthCallback: hxforbrandCallback
//  });
    function hxforbrandCallback(){
    	console.log(this)
    }
})