$(function(){
			mark=0
			$(".warp").delegate(".box","tap",function(){
				if(mark==0)
				return;
				$(this).addClass("after");
				$("#numshow").text($(this).attr("data-sc"))
			});
			$(".btn").click(function(){
				//history.go(0);
				$('.col li').empty().css("top",0);
				$('.model').addClass("hide");
				$("#numshow").text(0);
				index = -1,datas=[],sc=0;
				init();
			$("#start").click(start);
				
			})
			var arrs=[1,2,3,4],index = -1,datas=[],sc=0;
			init();
			$("#start").click(start);
			function init(){
				for (var i = 0 ; i <10;i++) {
				add()
			}
			}
			
			function add(){
			
			var r = Math.floor(Math.random()*4);
			if(r== index){
				add();
				return;
			}
			index = r;
			datas.push(arrs[r]);
			sc++;
			var $box = '<div class="box sc'+sc+'" style="bottom:'+(sc-1)*25+'vh" data-sc="'+sc+'"><div class="son"></div></div>';
			if(sc==1){
			var $box = '<div class="box sc'+sc+'" style="bottom:'+(sc-1)*25+'vh" id="start" data-sc="'+sc+'">开始<div class="son" ></div></div>';
			}
			
			$(".col"+arrs[r]).append($box);
			}
			function start(){
				mark = 1;
				timer = setInterval(function(){
				var top = Number($(".col li").css("top").replace("px",""));
				var height = $('.col li').height();
				var vh5 = height/30;
				var valh = $(".sc"+sc).offset().top+height;
				if(valh>0){
					add()
				}
				$(".col li").css("top",top+vh5);
				$(".box").each(function(i,n){

					if(!$(this).hasClass("after")){
						if($(this).offset().top>height*3/4){
						var sc = Number($(this).attr("data-sc"));
						var top = (sc-1)*25;
						$(".col li").css("top",top+"vh");
						$(this).addClass("red");
						stop();
					}
					}else{
						if($(this).offset().top>height*5/4){
						$(this).remove();
					}
					}
					
				})
			},1000/24);
			}
			 
			function stop(){
				$("#num").text($("#numshow").text());
				$(".model").removeClass("hide");
				mark=0;
				clearInterval(timer);
			}
		})