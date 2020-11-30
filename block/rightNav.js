//右侧侧边栏
$(function(){
	
	jQuery.fn.AsideList = function(fz){
		var Ts = $(this);
		var abegin = function(){
			$(fz).stop(true,false).animate({"right":250},300);
			$("#AUnfold").stop(true,false).animate({"right":0},300);
			$("#AUnfold>div").hide();
			//
//			Ts.css("background-color","transparent");
			$('.rightService .hover').removeClass('hover');
			$(this).addClass("hover");
			$(".aside li .shoucang").removeClass("select");
			$(".aside li .daikuan").css("background-color","#848484");
			$(".aside li .baoxian").css("background-color","#848484");
//			$(this).css("background-color","#F60");
			//
			var Tlang = this.lang;
			$(Tlang).show();
		};
		$(document).click(function(e){
			if (!$(fz).is(e.target) && $(fz).has(e.target).length === 0 && !$("#AUnfold").is(e.target) && $("#AUnfold").has(e.target).length === 0 && !$(".closed").is(e.target) && $(".closed").has(e.target).length === 0 ) {
				$(fz).stop(true,false).animate({"right":0},300);
				$(".closed").stop(true,false).animate({"right":0},300);
				$("#AUnfold").stop(true,false).animate({"right":-250},300,function(){
					$("#AUnfold>div").hide();
				});
				//
//				Ts.css("background-color","#848484");
				$("#daikuan").css("background-color","#848484");
				$("#baoxian").css("background-color","#848484");
				$(".aside li .shoucang").removeClass("select");
				//
			}
		});
		
		var carid=$("#simCarId").val();
	 var messageTitle = '加入收藏',
	    type="",
		carMagess = $("#carMagess").val(),
		messageContent = carMagess,
		carId = $("#simCarId").val(),
		successSend = '<img src="http://www.hx2car.com/resource/web/gbpage/images/common/messagealert.png" width="260" height="59">';
			$('body').allMessage({
			    ifBtn: '.sc',
			    boxType: 14,
			    carId: carId,
				ifPiccode:state,
			    messageTitle: messageTitle, //信息标题
			    messageContent: messageContent, //信息内容
			    successOn: 'MOn', //发送成功后添加
		        successSend: successSend, //发送成功后提示内容
		        successClose: 'successClose', //发送成功后关闭按钮
		        verifyCallback: shouchangCallback,
			    ifClosecall: false, //是否需要添加关闭回调函数
			    closeCallback: null //回调函数：点击关闭无权限后
			});
	    //回调函数：用户验证成功后
	    function shouchangCallback(ts) {
	    	var getpic = function(pic){
	    		if (pic!=null && pic.indexOf("http://") == -1) {
	    			return pic= "http://img.hx2cars.com/upload"+pic ;
	    		}else{
	    			return pic;
	    		}
	    	};
				var phoneNum = getCookie("phoneNum");
				var carid = $("#simCarId").val();
				if(null == phoneNum || phoneNum ==''){
					phoneNum = $("#phoneBox_").val();
				}
				jQuery.post('/require/showrequire.json',{number:phoneNum,type:14},function(data){
					if(data){
						$("#shoucang_car").html("");
						if(data.list.length>20){
							for(var i=0;i<20;i++){
								$("#shoucang_car").append('<li id="'+data.list[i].id+'">'+
				                        '<a href="/details/'+data.list[i].id+'" target="_blank"><img src="'+getpic(data.list[i].firstSmallPic)+'"></a>'+
				                        '<div class="cont"><a href="/details/'+data.list[i].id+'" target="_blank"><p class="cont_title">'+data.list[i].title+'</p></a><p class="cont_price">￥'+data.list[i].money+'万</p></div>'+
				                        '<div class="closed" carisId="'+data.list[i].id+'"></div>'+
				                        '</li>');
							}
							$("#shoucang_car .closed").click(function(){
								var dels=$(this).attr("carisId");
								var phoneNum = $.cookie("phoneNum");
								jQuery.post('/require/delrequire.json',{id:dels,number:phoneNum},function(data){
									if(carid==dels){
										$("#"+dels).remove();
										$(".title_infoR .sc").html("+加入收藏").show();
										$('.isCollect').hide();
										$(".title_infoR .sc").css("background-position","-4px -142px");
									 }else{
										$("#"+dels).remove();
									 }
									if($("#shoucang_car li").length>0){
										$(".aside li .shoucang").addClass("select");
									}else{
										$(".aside li .shoucang").removeClass("select");
										$(".aside li .shoucang").css("background-position","-183px -52px");
										$("#RAside").stop(true,false).animate({"right":0},300);
										$("#AUnfold").stop(true,false).animate({"right":-250},300);
										$(".title_infoR .sc").html("+加入收藏").show();
										$('.isCollect').hide();
										$(".title_infoR .sc").css("background-position","-4px -142px");
									}
								});
							});
						}else{
							for(var i=0;i<data.list.length;i++){
								$("#shoucang_car").append('<li id="'+data.list[i].id+'">'+
				                        '<a href="/details/'+data.list[i].id+'" target="_blank"><img src="'+getpic(data.list[i].firstSmallPic)+'"></a>'+
				                        '<div class="cont"><a href="/details/'+data.list[i].id+'" target="_blank"><p class="cont_title">'+data.list[i].title+'</p></a><p class="cont_price">￥'+data.list[i].money+'万</p></div>'+
				                        '<div class="closed" carisId="'+data.list[i].id+'"></div>'+
				                        '</li>');
							}
							$("#shoucang_car .closed").click(function(){
								var dels=$(this).attr("carisId");
								var phoneNum = $.cookie("phoneNum");
								jQuery.post('/require/delrequire.json',{id:dels,number:phoneNum},function(data){
									if(carid==dels){
										$("#"+dels).remove();
										$(".title_infoR .sc").html("+加入收藏").show();
										$('.isCollect').hide();
										$(".title_infoR .sc").css("background-position","-4px -142px");
									}else{
										$("#"+dels).remove();
									}
									if($("#shoucang_car li").length>0){
									    $(".aside li .shoucang").addClass("select");
									}else{
										$(".aside li .shoucang").removeClass("select");
										$(".aside li .shoucang").css("background-position","-183px -52px");
										$("#RAside").stop(true,false).animate({"right":0},300);
										$("#AUnfold").stop(true,false).animate({"right":-250},300);
										$(".title_infoR .sc").html("+加入收藏").show();
										$('.isCollect').hide();
										$(".title_infoR .sc").css("background-position","-4px -142px");
									}
								});
							});
						}
						//jsScroll(document.getElementById('scang'), 5, 'divScrollBar');
						$(".loading").hide();
					}
				});
				$('.isCollect').show();
				$(".title_infoR .sc").html("已收藏").hide();
				$(".title_infoR .sc").css("background-position","-4px -277px");
				$("#RAside").stop(true,false).animate({"right":250},300);
				$("#AUnfold>div").hide();
				$("#A1").show();
				$("#AUnfold").stop(true,false).animate({"right":0},300);
				$(".aside li .shoucang").addClass("select");
				$("#s_cang .more").css("display","block");
				$(".wsc").css("display","none");
	
	    }
	 	$("#addfavorit_l").on("click",function(e){
	 		var getpic = function(pic){
	    		if (pic!=null && pic.indexOf("http://") == -1) {
	    			return pic= "http://img.hx2cars.com/upload"+pic ;
	    		}else{
	    			return pic;
	    		}
	    	};
	 		var phoneNum = getCookie("phoneNum");
			if(null == phoneNum || phoneNum ==''){
				phoneNum = $("#phoneBox_").val();
			}
			//
			$(".aside li .shoucang").addClass("select");
			$(".aside li .liulan").css("background-color","#848484");
			$(".aside li .PK").css("background-color","#848484");
			$(".aside li .chat").css("background-color","#848484");
			$(".aside li .daikuan").css("background-color","#848484");
			$(".aside li .baoxian").css("background-color","#848484");
			//
			$("#RAside").stop(true,false).animate({"right":250},300);
			$("#AUnfold>div").hide();
			$("#A1").show();
			$("#AUnfold").stop(true,false).animate({"right":0},300);
			if(phoneNum=="" || phoneNum==null){
				$(".wsc").css("display","block");
			}else{
				$(".wsc").css("display","none");
			}
			jQuery.post('/require/showrequire.json',{number:phoneNum,type:14},function(data){
				if(data){
					$("#shoucang_car").html("");
					if(data.list.length>20){
						for(var i=0;i<20;i++){
							$("#shoucang_car").append('<li id="'+data.list[i].id+'">'+
			                        '<a href="/details/'+data.list[i].id+'" target="_blank"><img src="'+getpic(data.list[i].firstSmallPic)+'"></a>'+
			                        '<div class="cont"><a href="/details/'+data.list[i].id+'" target="_blank"><p class="cont_title">'+data.list[i].title+'</p></a><p class="cont_price">￥'+data.list[i].money+'万</p></div>'+
			                        '<div class="closed" carisId="'+data.list[i].id+'"></div>'+
			                        '</li>');
						}
						$("#shoucang_car .closed").click(function(){
							var dels=$(this).attr("carisId");
							var phoneNum = $.cookie("phoneNum");
							jQuery.post('/require/delrequire.json',{id:dels,number:phoneNum},function(data){
								if(carid==dels){
									$("#"+dels).remove();
										$('.isCollect').hide();
									$(".title_infoR .sc").html("+加入收藏").show();
									$(".title_infoR .sc").css("background-position","-4px -142px");
								 }else{
									$("#"+dels).remove();
								 }
								if($("#shoucang_car li").length>0){
								}else{
									$(".aside li .shoucang").removeClass("select");
									$(".aside li .shoucang").css("background-position","-183px -52px");
									$("#RAside").stop(true,false).animate({"right":0},300);
									$("#AUnfold").stop(true,false).animate({"right":-250},300);
										$('.isCollect').hide();
									$(".title_infoR .sc").html("+加入收藏").show();
									$(".title_infoR .sc").css("background-position","-4px -142px");
								}
							});
						});
					}else{
						for(var i=0;i<data.list.length;i++){
							$("#shoucang_car").append('<li id="'+data.list[i].id+'">'+
			                        '<a href="/details/'+data.list[i].id+'" target="_blank"><img src="'+getpic(data.list[i].firstSmallPic)+'"></a>'+
			                        '<div class="cont"><a href="/details/'+data.list[i].id+'" target="_blank"><p class="cont_title">'+data.list[i].title+'</p></a><p class="cont_price">￥'+data.list[i].money+'万</p></div>'+
			                        '<div class="closed" carisId="'+data.list[i].id+'"></div>'+
			                        '</li>');
						}
						$("#shoucang_car .closed").click(function(){
							var dels=$(this).attr("carisId");
							var phoneNum = $.cookie("phoneNum");
							
							jQuery.post('/require/delrequire.json',{id:dels,number:phoneNum},function(data){
								 if(carid==dels){
									$("#"+dels).remove();
										$('.isCollect').hide();
									$(".title_infoR .sc").html("+加入收藏").show();
									$(".title_infoR .sc").css("background-position","-4px -142px");
								 }else{
									$("#"+dels).remove();
								 }
								if($("#shoucang_car li").length>0){
									$(".aside li .shoucang").addClass("select");
								}else{
									$(".aside li .shoucang").removeClass("select");
									$(".aside li .shoucang").css("background-position","-183px -52px");
									$("#RAside").stop(true,false).animate({"right":0},300);
									$("#AUnfold").stop(true,false).animate({"right":-250},300);
										$('.isCollect').hide();
									$(".title_infoR .sc").html("+加入收藏").show();
									$(".title_infoR .sc").css("background-position","-4px -142px");
								}
							});
						});
					}
					//jsScroll(document.getElementById('scang'), 5, 'divScrollBar');
					$(".loading").hide();
				}
				
				if($("#shoucang_car #"+carid).val()==undefined){
					$('.isCollect').hide();
					$(".title_infoR .sc").html("+加入收藏").show();
					$(".title_infoR .sc").css("background-position","-4px -142px");
				}else{
				$('.isCollect').show();
					$(".title_infoR .sc").html("已收藏").hide();
					$(".title_infoR .sc").css("background-position","-4px -277px");
				}
				if($("#shoucang_car li").length>0){
					$(".aside li .shoucang").addClass("select");
					$("#s_cang .more").css("display","block");
					$(".wsc").css("display","none");
				}else{
					$(".aside li .shoucang").addClass("select");
					//
					$(".aside li .liulan").css("background-color","#848484");
					$(".aside li .PK").css("background-color","#848484");
					$(".aside li .chat").css("background-color","#848484");
					$(".aside li .daikuan").css("background-color","#848484");
					$(".aside li .baoxian").css("background-color","#848484");
					//
					$("#s_cang .more").css("display","none");
					$(".wsc").css("display","block");
				}
			});
	 	});
	 	
	 	
	 	//添加历史记录
	var time=parseInt(new Date().getTime()/1000);
	var car_id=$("#simCarId").val();
 	var CarId=$.cookie("history_compare");
 	if(CarId!=""&&CarId!=null){
 		if(CarId.indexOf("|")<0){
 			$.cookie("history_compare","",{expires:365,path:'/',domain:cookieDomain});
 		}
 		if(CarId.indexOf(car_id)<0){
   			CarId=car_id+"|"+time+","+CarId;
		}
	}else{
 	 CarId=car_id+"|"+time;
	}
 	var str= new Array();
 	str=CarId.split(",").slice(0,10);
	$.cookie("history_compare",str,{expires:365,path:'/',domain:cookieDomain});
    
	
	function formatDate2(now) { 
		var year=now.getYear()+1900; 
		var month=now.getMonth()+1; 
		var date=now.getDate(); 
		var hour=now.getHours(); 
		var minute=now.getMinutes(); 
		var second=now.getSeconds(); 
		return year+"年"+month+"月"+date+"日 "+hour+":"+minute+":"+second; 
	}
	
	var getpic = function(pic){
		if (pic!=null &&  pic.indexOf("http://") == -1) {
			return pic= "http://img.hx2car.com/upload"+pic ;
		}else{
			return pic;
		}
	};
	
	$("#zuji").click(function(){
		$(".loading").show();
		jQuery.post('/car/getHitoryCar.json',function(data){
			if(data){
				var historycar = new Array();
				var fk = $.cookie('history_compare');
				if(fk != null && fk!=""){
					historycar = fk.split(",");
				}
				//
				$("#history").html("");		
				for(var i=0;i<data.listHistory_car.length;i++){
					var hiscar= historycar[i].split("|");
					if(hiscar.length==2){
						var ctime = formatDate2(new Date(hiscar[1]*1000));
						$("#history").append('<li id="'+data.listHistory_car[i].id+'">'+
		                        '<p class="time">'+ctime+'</p>'+
		                        '<div class="cars"><a class="cars_L" href="/details/'+data.listHistory_car[i].id+'" target="_blank"><img src="'+getpic(data.listHistory_car[i].firstSmallPic)+'"></a>'+
		                        '<div class="cont"><a href="/details/'+data.listHistory_car[i].id+'" target="_blank"><p class="cont_title">'+data.listHistory_car[i].usedate+"&nbsp;"+data.listHistory_car[i].title+'</p></a><p class="cont_price">'+data.listHistory_car[i].money+'万</p></div>'+
		                        '<div class="closed" time="'+hiscar[1]+'" car_idlang="'+data.listHistory_car[i].id+'"></div>'+
		                        '</div></li>');
					}
				}
				$(".loading").hide();
				
				$("#history .closed").click(function(e){
						e.stopPropagation();
						var id_car=$(this).attr("car_idlang");
						var time=$(this).attr("time");
						var car=id_car+"|"+time;
						var allCarId = new Array();
						var fk = $.cookie('history_compare');
						if(fk != null && fk!=""){
							allCarId = fk.split(",");
						}
						var carfoot = allCarId.indexOf(car);
						if(carfoot >= 0){
							allCarId.splice(carfoot,1);
						}
						$.cookie("history_compare","",{expires: 365,path:'/',domain:cookieDomain});
						$.cookie("history_compare",allCarId,{expires: 365,path:'/',domain:cookieDomain});
						$("#"+id_car).remove();
				});
			}
		});
	});
	
	//从历史记录加入对比
	var duibicar = function(){
		var duibiCar= new Array();
		var fk = $.cookie('carid');
   		if(fk !=null && fk !=""){
   			duibiCar = fk.split(",");
   		}
		len = $("#Upk li").length;		//len = $("#allduibicar li").length;
		if(len<4 && duibiCar.length<4){
			var id_car=$("#simCarId").val();
			var pho=$("#focusBigImg_"+$("#pic_index").val()).attr("p_img");
			var car_title=$(this).attr("car_name");
			var price=$(this).attr("car_lang");
			var duibiCar = new Array();
			
	   		if(fk !=null && fk!=""){
	   			duibiCar = fk.split(",");
	   		}
	   		var iscar = duibiCar.indexOf(id_car);
	   		
	   		if(iscar<0 && id_car!=undefined){
	   			duibiCar.unshift(id_car);
	   			addcidt(duibiCar.length);
	   			$.cookie('carid','',{expires:-1});
	   			$.cookie("carid",duibiCar,{expires: 365,path:'/',domain:cookieDomain});
	   			var ttr='<li id="'+id_car+'">'+
                '<a href="/details/'+id_car+'" target="_blank"><img src="'+pho+'"></a>'+
                '<div class="cont"><a href="/details/'+id_car+'" target="_blank"><p class="cont_title">'+car_title+'</p></a><p class="cont_price">'+price+'</p></div>'+
                '<div class="closed" car_idlang="'+id_car+'"></div>'+
                '</li>';
				$("#Upk").append(ttr);
				$("#Upk").show();
				$("#Uhs").hide();
				$("#car_on_jilu").removeClass("on");
				$("#dyi").addClass("on");
	   		}else{
	   		}//end if
	   		$("#Upk .closed").click(function(e){
	   			e.stopPropagation();
	   			var allCarId = new Array();
	   			var carId=$(this).attr("car_idlang");
	   			var fk = $.cookie('carid');
	   			if(fk != null && fk !=""){
	   				allCarId = fk.split(",");
	   			}
	   			var carfoot = allCarId.indexOf(carId);
	   			if(carfoot >= 0){
	   				allCarId.splice(carfoot,1);
	   			}
	   			delcidt(allCarId.length);
	   			$.cookie("carid","",{expires: 365,path:'/',domain:cookieDomain});
	   			$.cookie("carid",allCarId,{expires: 365,path:'/',domain:cookieDomain});
	   			$("#Upk").find("#"+carId).remove();
	   		});//$("#Upk .closed")
		}//end if
		$("#Upk").show();
		$("#Uhs").hide();
		$("#car_on_jilu").removeClass("on");
		$("#dyi").addClass("on");
		$("#duibi_button").show();
		//从cookie获取记录
		jQuery.post('/car/getHitoryCar.json',function(data){
			if(data){
				$("#Uhs").html("");
				var allCarId = new Array();
				var fk = $.cookie('history_compare');
				if(fk != null && fk !=""){
					allCarId = fk.split(",");
				}
				len = $("#Uhs li").length;
				if(len<4){
					for(var i=0;i<data.listHistory_car.length;i++){
						var hiscar= allCarId[i].split("|");
						if(hiscar.length==2){
						$("#Uhs").append('<li id="'+data.listHistory_car[i].id+'">'+
		                        '<a href="/details/'+data.listHistory_car[i].id+'" target="_blank"><img src="'+getpic(data.listHistory_car[i].firstSmallPic)+'">'+
		                        '<div class="cont"><p class="cont_title"><a href="/details/'+data.listHistory_car[i].id+'" target="_blank">'+data.listHistory_car[i].title+'</a></p><p class="cont_price">￥'+data.listHistory_car[i].money+'万</p></div>'+
		                        '<div class="closed" time="'+hiscar[1]+'" car_idlang="'+data.listHistory_car[i].id+'"></div>'+
		                        '<div class="add" src="'+getpic(data.listHistory_car[i].firstSmallPic)+'" car_lang="'+data.listHistory_car[i].money+'" car_name="'+data.listHistory_car[i].title+'" car_idlang="'+data.listHistory_car[i].id+'"></div>'+
		                        '</li>');
						}
					}
				}else{
					for(var i=0;i<data.listHistory_car.length;i++){
						var hiscar= allCarId[i].split("|");
						if(hiscar.length==2){
						$("#Uhs").append('<li id="'+data.listHistory_car[i].id+'">'+
		                        '<a href="/details/'+data.listHistory_car[i].id+'" target="_blank"><img src="'+getpic(data.listHistory_car[i].firstSmallPic)+'">'+
		                        '<div class="cont"><p class="cont_title"><a href="/details/'+data.listHistory_car[i].id+'" target="_blank">'+data.listHistory_car[i].title+'</a></p><p class="cont_price">￥'+data.listHistory_car[i].money+'万</p></div>'+
		                        '<div class="closed" time="'+hiscar[1]+'" car_idlang="'+data.listHistory_car[i].id+'"></div>'+
		                        '<div class="add" src="'+getpic(data.listHistory_car[i].firstSmallPic)+'" car_lang="'+data.listHistory_car[i].money+'" car_name="'+data.listHistory_car[i].title+'" car_idlang="'+data.listHistory_car[i].id+'"></div>'+
		                        '</li>');
						};
					}
				}
			}
			$("#Uhs .closed").click(function(e){
				e.stopPropagation();
				var id_car=$(this).attr("car_idlang");
				var time=$(this).attr("time");
				var car=id_car+"|"+time;
				var allCarId = new Array();
				var fk = $.cookie('history_compare');
				if(fk != null){
					allCarId = fk.split(",");
				}
				var carfoot = allCarId.indexOf(car);
				if(carfoot >= 0){
					allCarId.splice(carfoot,1);
				}
				$.cookie("history_compare","",{expires: 365,path:'/',domain:cookieDomain});
				$.cookie("history_compare",allCarId,{expires: 365,path:'/',domain:cookieDomain});
				$("#Uhs").find("#"+id_car).remove();
			});//end $("#Uhs .closed")
		});
		//单击从浏览记录时从cookie新浏览记录
		$("#car_on_jilu").click(function(e){
			$("#Upk").hide();
			$("#Uhs").show();
			$("#car_on_jilu").addClass("on");
			$("#dyi").removeClass("on");
			$("#duibi_button").hide();
			//从cookie获取记录
			jQuery.post('/car/getHitoryCar.json',function(data){
				if(data){
					$("#Uhs").html("");
					var allCarId = new Array();
					var fk = $.cookie('history_compare');
					if(fk != null && fk !=""){
						allCarId = fk.split(",");
					}
					len = $("#Uhs li").length;
					if(len<4){
						for(var i=0;i<data.listHistory_car.length;i++){
							var hiscar= allCarId[i].split("|");
							if(hiscar.length==2){
							$("#Uhs").append('<li id="'+data.listHistory_car[i].id+'">'+
			                        '<a href="/details/'+data.listHistory_car[i].id+'" target="_blank"><img src="'+getpic(data.listHistory_car[i].firstSmallPic)+'">'+
			                        '<div class="cont"><p class="cont_title"><a href="/details/'+data.listHistory_car[i].id+'" target="_blank">'+data.listHistory_car[i].title+'</a></p><p class="cont_price">￥'+data.listHistory_car[i].money+'万</p></div>'+
			                        '<div class="closed" time="'+hiscar[1]+'" car_idlang="'+data.listHistory_car[i].id+'"></div>'+
			                        '<div class="add" src="'+getpic(data.listHistory_car[i].firstSmallPic)+'" car_lang="'+data.listHistory_car[i].money+'" car_name="'+data.listHistory_car[i].title+'" car_idlang="'+data.listHistory_car[i].id+'"></div>'+
			                        '</li>');
							}
						}
					}else{
						for(var i=0;i<data.listHistory_car.length;i++){
							var hiscar= allCarId[i].split("|");
							if(hiscar.length==2){
							$("#Uhs").append('<li id="'+data.listHistory_car[i].id+'">'+
			                        '<a href="/details/'+data.listHistory_car[i].id+'" target="_blank"><img src="'+getpic(data.listHistory_car[i].firstSmallPic)+'">'+
			                        '<div class="cont"><p class="cont_title"><a href="/details/'+data.listHistory_car[i].id+'" target="_blank">'+data.listHistory_car[i].title+'</a></p><p class="cont_price">￥'+data.listHistory_car[i].money+'万</p></div>'+
			                        '<div class="closed" time="'+hiscar[1]+'" car_idlang="'+data.listHistory_car[i].id+'"></div>'+
			                        '<div class="add" src="'+getpic(data.listHistory_car[i].firstSmallPic)+'" car_lang="'+data.listHistory_car[i].money+'" car_name="'+data.listHistory_car[i].title+'" car_idlang="'+data.listHistory_car[i].id+'"></div>'+
			                        '</li>');
							};
						}
					}
					
					$("#Uhs .closed").click(function(e){
						e.stopPropagation();
						var id_car=$(this).attr("car_idlang");
						var time=$(this).attr("time");
						var car=id_car+"|"+time;
						var allCarId = new Array();
						var fk = $.cookie('history_compare');
						if(fk != null){
							allCarId = fk.split(",");
						}
						var carfoot = allCarId.indexOf(car);
						if(carfoot >= 0){
							allCarId.splice(carfoot,1);
						}
						$.cookie("history_compare","",{expires: 365,path:'/',domain:cookieDomain});
						$.cookie("history_compare",allCarId,{expires: 365,path:'/',domain:cookieDomain});
						$("#Uhs").find("#"+id_car).remove();
					});//end $("#Uhs .closed")
					
					$("#Uhs .add").click(function(e){
						e.stopPropagation();
						var duibiCar= new Array();
						var fk = $.cookie('carid');
				   		if(fk !=null && fk !=""){
				   			duibiCar = fk.split(",");
				   		}
						len = $("#Upk li").length;
						if(len<4 && duibiCar.length<4){
							var id_car=$(this).attr("car_idlang");
							var pho=$(this).attr("src");
							var car_title=$(this).attr("car_name");
							var price=$(this).attr("car_lang");
							var duibiCar = new Array();
							
					   		if(fk !=null && fk!=""){
					   			duibiCar = fk.split(",");
					   		}
					   		var iscar = duibiCar.indexOf(id_car);
					   		if(iscar<0){
					   			duibiCar.unshift(id_car);
					   			addcidt(duibiCar.length);
					   			$.cookie('carid','',{expires:-1});
					   			$.cookie("carid",duibiCar,{expires: 365,path:'/',domain:cookieDomain});
					   			var ttr='<li id="'+id_car+'">'+
		                        '<a href="/details/'+id_car+'" target="_blank"><img src="'+pho+'"></a>'+
		                        '<div class="cont"><a href="/details/'+id_car+'" target="_blank"><p class="cont_title">'+car_title+'</p></a><p class="cont_price">'+price+'万</p></div>'+
		                        '<div class="closed" car_idlang="'+id_car+'"></div>'+
		                        '</li>';
								$("#Upk").append(ttr);
								$("#Upk").show();
								$("#Uhs").hide();
								$("#car_on_jilu").removeClass("on");
								$("#dyi").addClass("on");
								$("#duibi_button").show();
					   		}else{
					   		}
					   		$("#Upk .closed").click(function(e){
					   			e.stopPropagation();
					   			var allCarId = new Array();
					   			var carId=$(this).attr("car_idlang");
					   			var fk = $.cookie('carid');
					   			if(fk != null){
					   				allCarId = fk.split(",");
					   			}
					   			var carfoot = allCarId.indexOf(carId);
					   			if(carfoot >= 0){
					   				allCarId.splice(carfoot,1);
					   			}
					   			delcidt(allCarId.length);
					   			$.cookie("carid","",{expires: 365,path:'/',domain:cookieDomain});
					   			$.cookie("carid",allCarId,{expires: 365,path:'/',domain:cookieDomain});
					   			$("#Upk").find("#"+carId).remove();
					   		});// end $("#Upk .closed")
						}else{
							alert("对比车型已满4辆");
						}
					});//end $("#Uhs .add")
				}//end if(data){}
			});//end jQuery.post
		});//end $("#car_on_jilu")
	};//end var duibicar
	$("#duibiAndhistory").bind("click",duibicar);	
	
	//对比栏加载到对比页
	function addcidt(cars){
		var cidt = new Array();
   		for(var i=0;i<cars;i++){
   			cidt.splice(i,0,"t"+i);
   		}
		$.cookie('cid','',{expires:-1});
		$.cookie("cid",cidt,{expires: 365,path:'/',domain:cookieDomain});
	}
	
	function delcidt(cars){
		var cidt = new Array();
		var cid = $.cookie('cid');
		if(cid != null && cid != ""){
   			cidt =cid.split(",");
   		}
		if(cidt.length == 0 || cidt.length == cars){
			return;
		}else if(cidt.length == 1){
			cidt.splice(0,1);
		}else if(cidt.length == 2){
			cidt.splice(1,1);
		}else if(cidt.length == 3){
			cidt.splice(2,1);
		}else if(cidt.length == 4){
			cidt.splice(3,1);
		}
		$.cookie('cid','',{expires:-1});
		$.cookie("cid",cidt,{expires: 365,path:'/',domain:cookieDomain});
	}
	
	//单击对比时从cookie更新对比车辆
	$("#dyi").click(function(e){
		e.stopPropagation();
		$("#Uhs").hide();
		$("#Upk").show();
		$("#car_on_jilu").removeClass("on");
		$("#dyi").addClass("on");
		$("#duibi_button").show();
		//获取对比记录
		jQuery.post('/car/getDuibiCar.json',function(data){
			if(data){
				$("#Upk").html("");
				for(var i=0;i<data.listDuibi_car.length;i++){
					$("#Upk").append('<li id="'+data.listDuibi_car[i].id+'">'+
							'<a href="/details/'+data.listDuibi_car[i].id+'" target="_blank"><img src="'+getpic(data.listDuibi_car[i].firstSmallPic)+'">'+
							'<div class="cont"><p class="cont_title"><a href="details/'+data.listDuibi_car[i].id+' target="_blank">'+data.listDuibi_car[i].title+'</a></p><p class="cont_price">￥'+data.listDuibi_car[i].money+'万</p></div>'+
							'<div class="closed" car_idlang="'+data.listDuibi_car[i].id+'"></div>'+
							'</li>'
						);
					}
				$("#Upk .closed").click(function(e){
		   			e.stopPropagation();
		   			var allCarId = new Array();
		   			var carId=$(this).attr("car_idlang");
		   			var fk = $.cookie('carid');
		   			if(fk != null && fk !=""){
		   				allCarId = fk.split(",");
		   			}
		   			var carfoot = allCarId.indexOf(carId);
		   			if(carfoot >= 0){
		   				allCarId.splice(carfoot,1);
		   			}
		   			$.cookie("carid","",{expires: 365,path:'/',domain:cookieDomain});
		   			$.cookie("carid",allCarId,{expires: 365,path:'/',domain:cookieDomain});
		   			$("#Upk").find("#"+carId).remove();
		   		});//$("#Upk .closed")
			}
		});//end jQuery.post();
	});	//end "#dyi"_click
	//
	$("#Upk .closed").click(function(e){
			e.stopPropagation();
			var allCarId = new Array();
			var carId=$(this).attr("car_idlang");
			var fk = $.cookie('carid');
			if(fk != null){
				allCarId = fk.split(",");
			}
			var carfoot = allCarId.indexOf(carId);
			if(carfoot >= 0){
				allCarId.splice(carfoot,1);
			}
			delcidt(allCarId.length);
			$.cookie("carid","",{expires: 365,path:'/',domain:cookieDomain});
			$.cookie("carid",allCarId,{expires: 365,path:'/',domain:cookieDomain});
			$("#Upk").find("#"+carId).remove();
		});
	
	var GoCompare=function(){
		window.open("/car/compares.htm");
	};
	$(".duibi_button").bind("click",GoCompare);
	
	checkUserPhoneNum = function(pho){
		 var two=/^((13[0-9])|(17[0-9])|(14[0-9])|(15([0-3]|[5-9]))|(18([0-3]|[5-9])))+\d{8}$/;
			if(!two.test(pho)){
				return false;
			}else{
				return true;
			}
	};
	
	$("#input2").click(function(){
		if($("#input2").val()=="请输入您正确的手机号码"){
			$("#input2").val("");
		}
	});
	$("#input_tousu").click(function(){
		if($("#input_tousu").val()=="请选择或输入投诉内容"){
			$("#input_tousu").val("");
		}
	});
	
	var ggb =function(){
		$("#YZbox").hide();
		$("#Bg").hide();
	};
	$("#ggbi").bind("click",ggb);
	$("#zaixx").bind("click",ggb);
	
	//对比
	$("#car_on_jilu").click(function(){
		$("#duibi_button").hide();
		$("#Upk").hide();
		$("#Uhs").show();
		$(this).addClass("on");
		$("#dyi").removeClass("on");
	});
	$("#dyi").click(function(){
		$("#duibi_button").show();
		$("#Upk").show();
		$("#Uhs").hide();
		$(this).addClass("on");
		$("#car_on_jilu").removeClass("on");
	});
	
		$("#TDuibi").on({
		click : function(e){
			e.stopPropagation();
			var duibiCar= new Array();
			var fk = $.cookie('carid');
	   		if(fk !=null && fk !=""){
	   			duibiCar = fk.split(",");
	   		}
	   		$("#RAside").stop(true,false).animate({"right":250},300);
			$("#AUnfold>div").hide();
			$("#A3").show();
			$("#AUnfold").stop(true,false).animate({"right":0},300);
	   		//
			$(".aside li .shoucang").removeClass("select");
			$(".aside li .liulan").css("background-color","#848484");
			$(".aside li .PK").css("background-color","#F60");
			$(".aside li .chat").css("background-color","#848484");
			$(".aside li .daikuan").css("background-color","#848484");
			$(".aside li .baoxian").css("background-color","#848484");
			//
			var getpic = function(pic){
				if (pic!=null && pic.indexOf("http://") == -1) {
					return pic= "http://img.hx2car.com/upload"+pic ;
				}else{
					return pic;
				}
			};
			len = $("#Upk li").length;	//len = $("#allduibicar li").length;
			if(len<4 && duibiCar.length<4){
				var id_car=$("#simCarId").val();
				var pho=$("#focusBigImg_"+$("#pic_index").val()).attr("p_img");
				var car_title=$(this).attr("car_name");
				var price=$(this).attr("car_lang");
				var duibiCar = new Array();
				
		   		if(fk !=null && fk!=""){
		   			duibiCar = fk.split(",");
		   		}
		   		var iscar = duibiCar.indexOf(id_car);
		   		if(iscar<0){
		   			duibiCar.unshift(id_car);
		   			addcidt(duibiCar.length);
		   			$.cookie('carid','',{expires:-1});
		   			$.cookie("carid",duibiCar,{expires: 365,path:'/',domain:cookieDomain});
		   			var ttr='<li id="'+id_car+'">'+
                    '<a href="/details/'+id_car+'" target="_blank"><img src="'+pho+'"></a>'+
                    '<div class="cont"><a href="/details/'+id_car+'" target="_blank"><p class="cont_title">'+car_title+'</p></a><p class="cont_price">'+price+'</p></div>'+
                    '<div class="closed" car_idlang="'+id_car+'"></div>'+
                    '</li>';
					$("#Upk").append(ttr);
					$("#Upk").show();
					$("#Uhs").hide();
					$("#car_on_jilu").removeClass("on");
					$("#dyi").addClass("on");
					$("#duibi_button").show();
		   		}else{
		   		}
		   		$("#Upk .closed").click(function(e){
		   			e.stopPropagation();
		   			var allCarId = new Array();
		   			var carId=$(this).attr("car_idlang");
		   			var fk = $.cookie('carid');
		   			if(fk != null && fk !=""){
		   				allCarId = fk.split(",");
		   			}
		   			var carfoot = allCarId.indexOf(carId);
		   			if(carfoot >= 0){
		   				allCarId.splice(carfoot,1);
		   			}
		   			delcidt(allCarId.length);
		   			$.cookie("carid","",{expires: 365,path:'/',domain:cookieDomain});
		   			$.cookie("carid",allCarId,{expires: 365,path:'/',domain:cookieDomain});
		   			$("#Upk").find("#"+carId).remove();
		   		});//$("#Upk .closed")
			}
			$("#Upk").show();
			$("#Uhs").hide();
			$("#car_on_jilu").removeClass("on");
			$("#dyi").addClass("on");
			$("#duibi_button").show();
			$("#Upk .closed").click(function(e){
	   			e.stopPropagation();
	   			var allCarId = new Array();
	   			var carId=$(this).attr("car_idlang");
	   			var fk = $.cookie('carid');
	   			if(fk != null && fk !=""){
	   				allCarId = fk.split(",");
	   			}
	   			var carfoot = allCarId.indexOf(carId);
	   			if(carfoot >= 0){
	   				allCarId.splice(carfoot,1);
	   			}
	   			delcidt(allCarId.length);
	   			$.cookie("carid","",{expires: 365,path:'/',domain:cookieDomain});
	   			$.cookie("carid",allCarId,{expires: 365,path:'/',domain:cookieDomain});
	   			$("#Upk").find("#"+carId).remove();
	   		});//$("#Upk .closed")
			
			$("#car_on_jilu").click(function(e){
				$("#Upk").hide();
				$("#Uhs").show();
				$("#car_on_jilu").addClass("on");
				$("#dyi").removeClass("on");
				$("#duibi_button").hide();
				//从cookie获取记录
				jQuery.post('/car/getHitoryCar.json',function(data){
					if(data){
						$("#Uhs").html("");
						var allCarId = new Array();
						var fk = $.cookie('history_compare');
						if(fk != null && fk !=""){
							allCarId = fk.split(",");
						}
						len = $("#Uhs li").length;
						if(len<4){
							for(var i=0;i<data.listHistory_car.length;i++){
								var hiscar= allCarId[i].split("|");
								if(hiscar.length==2){
								$("#Uhs").append('<li id="'+data.listHistory_car[i].id+'">'+
				                        '<a href="/details/'+data.listHistory_car[i].id+'" target="_blank"><img src="'+getpic(data.listHistory_car[i].firstSmallPic)+'">'+
				                        '<div class="cont"><p class="cont_title"><a href="/details/'+data.listHistory_car[i].id+'" target="_blank">'+data.listHistory_car[i].title+'</a></p><p class="cont_price">￥'+data.listHistory_car[i].money+'万</p></div>'+
				                        '<div class="closed" time="'+hiscar[1]+'" car_idlang="'+data.listHistory_car[i].id+'"></div>'+
				                        '<div class="add" src="'+getpic(data.listHistory_car[i].firstSmallPic)+'" car_lang="'+data.listHistory_car[i].money+'" car_name="'+data.listHistory_car[i].title+'" car_idlang="'+data.listHistory_car[i].id+'"></div>'+
				                        '</li>');
								}
							}
						}else{
							for(var i=0;i<data.listHistory_car.length;i++){
								var hiscar= allCarId[i].split("|");
								if(hiscar.length==2){
								$("#Uhs").append('<li id="'+data.listHistory_car[i].id+'">'+
				                        '<a href="/details/'+data.listHistory_car[i].id+'" target="_blank"><img src="'+getpic(data.listHistory_car[i].firstSmallPic)+'">'+
				                        '<div class="cont"><p class="cont_title"><a href="/details/'+data.listHistory_car[i].id+'" target="_blank">'+data.listHistory_car[i].title+'</a></p><p class="cont_price">￥'+data.listHistory_car[i].money+'万</p></div>'+
				                        '<div class="closed" time="'+hiscar[1]+'" car_idlang="'+data.listHistory_car[i].id+'"></div>'+
				                        '<div class="add" src="'+getpic(data.listHistory_car[i].firstSmallPic)+'" car_lang="'+data.listHistory_car[i].money+'" car_name="'+data.listHistory_car[i].title+'" car_idlang="'+data.listHistory_car[i].id+'"></div>'+
				                        '</li>');
								};
							}
						}
						
						$("#Uhs .closed").click(function(e){
							e.stopPropagation();
							var id_car=$(this).attr("car_idlang");
							var time=$(this).attr("time");
							var car=id_car+"|"+time;
							var allCarId = new Array();
							var fk = $.cookie('history_compare');
							if(fk != null){
								allCarId = fk.split(",");
							}
							var carfoot = allCarId.indexOf(car);
							if(carfoot >= 0){
								allCarId.splice(carfoot,1);
							}
							$.cookie("history_compare","",{expires: 365,path:'/',domain:cookieDomain});
							$.cookie("history_compare",allCarId,{expires: 365,path:'/',domain:cookieDomain});
							$("#Uhs").find("#"+id_car).remove();
						});//end $("#Uhs .closed")
						
						$("#Uhs .add").click(function(e){
							e.stopPropagation();
							var duibiCar= new Array();
							var fk = $.cookie('carid');
					   		if(fk !=null && fk !=""){
					   			duibiCar = fk.split(",");
					   		}
							len = $("#Upk li").length;
							if(len<4 && duibiCar.length<4){
								var id_car=$(this).attr("car_idlang");
								var pho=$(this).attr("src");
								var car_title=$(this).attr("car_name");
								var price=$(this).attr("car_lang");
								var duibiCar = new Array();
								
						   		if(fk !=null && fk!=""){
						   			duibiCar = fk.split(",");
						   		}
						   		var iscar = duibiCar.indexOf(id_car);
						   		if(iscar<0){
						   			duibiCar.unshift(id_car);
						   			addcidt(duibiCar.length);
						   			$.cookie('carid','',{expires:-1});
						   			$.cookie("carid",duibiCar,{expires: 365,path:'/',domain:cookieDomain});
						   			var ttr='<li id="'+id_car+'">'+
			                        '<a href="/details/'+id_car+'" target="_blank"><img src="'+pho+'"></a>'+
			                        '<div class="cont"><a href="/details/'+id_car+'" target="_blank"><p class="cont_title">'+car_title+'</p></a><p class="cont_price">'+price+'万</p></div>'+
			                        '<div class="closed" car_idlang="'+id_car+'"></div>'+
			                        '</li>';
									$("#Upk").append(ttr);
									$("#Upk").show();
									$("#Uhs").hide();
									$("#car_on_jilu").removeClass("on");
									$("#dyi").addClass("on");
									$("#duibi_button").show();
						   		}else{
						   		}
						   		$("#Upk .closed").click(function(e){
						   			e.stopPropagation();
						   			var allCarId = new Array();
						   			var carId=$(this).attr("car_idlang");
						   			var fk = $.cookie('carid');
						   			if(fk != null){
						   				allCarId = fk.split(",");
						   			}
						   			var carfoot = allCarId.indexOf(carId);
						   			if(carfoot >= 0){
						   				allCarId.splice(carfoot,1);
						   			}
						   			delcidt(allCarId.length);
						   			$.cookie("carid","",{expires: 365,path:'/',domain:cookieDomain});
						   			$.cookie("carid",allCarId,{expires: 365,path:'/',domain:cookieDomain});
						   			$("#Upk").find("#"+carId).remove();
						   		});// end $("#Upk .closed")
							}else{
								alert("对比车型已满4辆");
							}
						});//end $("#Uhs .add")
					}//end if(data){}
				});//end jQuery.post
			});//end $("#car_on_jilu")
			$("#dyi").click(function(e){
				e.stopPropagation();
				$("#Uhs").hide();
				$("#Upk").show();
				$("#car_on_jilu").removeClass("on");
				$("#dyi").addClass("on");
				$("#duibi_button").show();
				//获取对比记录
				jQuery.post('/car/getDuibiCar.json',function(data){
					if(data){
						$("#Upk").html("");
						for(var i=0;i<data.listDuibi_car.length;i++){
							$("#Upk").append('<li id="'+data.listDuibi_car[i].id+'">'+
									'<a href="/details/'+data.listDuibi_car[i].id+'" target="_blank"><img src="'+getpic(data.listDuibi_car[i].firstSmallPic)+'">'+
									'<div class="cont"><p class="cont_title"><a href="details/'+data.listDuibi_car[i].id+' target="_blank">'+data.listDuibi_car[i].title+'</a></p><p class="cont_price">￥'+data.listDuibi_car[i].money+'万</p></div>'+
									'<div class="closed" car_idlang="'+data.listDuibi_car[i].id+'"></div>'+
									'</li>'
								);
							}
						$("#Upk .closed").click(function(e){
				   			e.stopPropagation();
				   			var allCarId = new Array();
				   			var carId=$(this).attr("car_idlang");
				   			var fk = $.cookie('carid');
				   			if(fk != null && fk !=""){
				   				allCarId = fk.split(",");
				   			}
				   			var carfoot = allCarId.indexOf(carId);
				   			if(carfoot >= 0){
				   				allCarId.splice(carfoot,1);
				   			}
				   			$.cookie("carid","",{expires: 365,path:'/',domain:cookieDomain});
				   			$.cookie("carid",allCarId,{expires: 365,path:'/',domain:cookieDomain});
				   			$("#Upk").find("#"+carId).remove();
				   		});//$("#Upk .closed")
					}
				});//end jQuery.post();
			});	//end "#dyi"_click
		}
	});
	
	//对比栏加载到对比页
	function addcidt(cars){
		var cidt = new Array();
   		for(var i=0;i<cars;i++){
   			cidt.splice(i,0,"t"+i);
   		}
		$.cookie('cid','',{expires:-1});
		$.cookie("cid",cidt,{expires: 365,path:'/',domain:cookieDomain});
	}
	
	function delcidt(cars){
		var cidt = new Array();
		var cid = $.cookie('cid');
		if(cid != null && cid != ""){
   			cidt =cid.split(",");
   		}
		if(cidt.length == 0 || cidt.length == cars){
			return;
		}else if(cidt.length == 1){
			cidt.splice(0,1);
		}else if(cidt.length == 2){
			cidt.splice(1,1);
		}else if(cidt.length == 3){
			cidt.splice(2,1);
		}else if(cidt.length == 4){
			cidt.splice(3,1);
		}
		$.cookie('cid','',{expires:-1});
		$.cookie("cid",cidt,{expires: 365,path:'/',domain:cookieDomain});
	}
	//
	
	$("#daikuan").on({
		click : function(e){
			e.stopPropagation();
    		$("#RAside").stop(true,false).animate({"right":250},300);
			$("#AUnfold>div").hide();
			$("#A5").show();
			$("#AUnfold").stop(true,false).animate({"right":0},300);
			//
			$(".aside li .shoucang").removeClass("select");
			$(".aside li .liulan").css("background-color","#848484");
			$(".aside li .PK").css("background-color","#848484");
			$(".aside li .chat").css("background-color","#848484");
			$(".aside li .baoxian").css("background-color","#848484");
			$(this).css("background-color","#F60");
			//
		}
    });

	$("#baoxian").on({
		click : function(e){
			e.stopPropagation();
    		$("#RAside").stop(true,false).animate({"right":250},300);
			$("#AUnfold>div").hide();
			$("#A6").show();
			$("#AUnfold").stop(true,false).animate({"right":0},300);
			//
			$(".aside li .shoucang").removeClass("select");
			$(".aside li .liulan").css("background-color","#848484");
			$(".aside li .PK").css("background-color","#848484");
			$(".aside li .chat").css("background-color","#848484");
			$(".aside li .daikuan").css("background-color","#848484");
			$(this).css("background-color","#F60");
			//
		}
    });
		
		Ts.on("click",abegin);
	};
 		$(".servicelist").click(function(){
        	$(".service_weixin").hide();
        	$("#ServiceInfo").show()
        })
        $(".serviceInvestigate").click(function(){
        	$(".service_weixin").show();
        	$("#ServiceInfo").hide()
        })
        $(".weixin_closed").click(function(){
        	$(".service_weixin").hide()
        })
        $(".icon_dowload").hover(function(){
        	$(".code-app").removeClass("hide");
        },function(){
        	$(".code-app").addClass("hide");
        })	
        $(".serviceCenter a").AsideList("#RAside");
        
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 侧边栏
		$('.isCollect').click(function(){
			var phoneNum = $.cookie("phoneNum");
			var id = $("#simCarId").val();
			$.ajax({
				type:"get",
				url:"/require/delrequire.json",
				async:true,
				data:{
					id:id,
					number:phoneNum
				},success:function(){
					$('.isCollect').hide().siblings('.sc').show().text('+加入收藏');
					setTimeout(function(){
					alert('已取消收藏');
					},200)

				}
				
			});
		})
        
})
