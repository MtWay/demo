$(function() {
	
			$("#msk").click(function(){
				$("#skew").removeClass("select");
				$(".skewBox").addClass("hide");
				
				if($(this).hasClass("select"))
				$(".list").addClass("hide");
				else
				$(".list").removeClass("hide")
				
				$(this).toggleClass("select");
			})
			
			$("#skew").click(function(){
				$("#msk").removeClass("select");
				$(".list").addClass("hide");
				
				if($(this).hasClass("select"))
				$(".skewBox").addClass("hide")
				else
				$(".skewBox").removeClass("hide")
				
				$(this).toggleClass("select");
			})
				var initSize ;
				canvas = document.getElementById("can");
				context = canvas.getContext('2d');
				
//				showimg('http://img.hx2cars.com/upload/newimg1/M02/21/F9/Clo8w1mk3jiAAiwAAAFjO2CJ-i4624_small_400_300.jpg')
				showimg('http://pic.58.com/p1/big/n_v2c10a2530f3224cdeaff67f7cf3aa8a6a.jpg')
//				showimg('img/1.jpg')
				function showimg(src) {
					console.time("time2");
					var img = new Image();
					img.src = src;
					img.crossOrigin = 'anonymous';
//					img.setAttribute('crossOrigin', 'anonymous');
					//				
					img.onload = function() {
					console.timeEnd("time2");
						console.log($("img").width());
						var x = 0,
							y = 0;
							var cw = canvas.width;
				var ch = canvas.height;
						var w = img.width;
						var h = img.height;
						var sw = w / cw;
						var sh = h / ch;
						var s = sw > sh ? sw : sh;
						if(s < 1) {
							s = 1;
						}
						x = (cw - w / s) / 2;
						y = (ch - h / s) / 2;
						console.log(s)
					console.time("time4");
						resize()
						//        铺底色
       					context.fillStyle = "#fff";
        				context.fillRect(0, 0, cw, ch);
        				
						context.drawImage(img,x,y,w / s,h/ s);
					console.timeEnd("time4");
					console.time("time3");
						var ndata = canvas.toDataURL('image/jpeg', 0.75);
						$("img").attr('src', ndata);
					console.timeEnd("time3");
					console.timeEnd("time1")
        console.log('压缩前：' + initSize);
        console.log('压缩后：' + ndata.length);
        console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
						
					}
				}
				//传图
				$("#file").change(function() {
					console.time("time1")
					var data = handleFiles(this);
					showimg(data);
				})
				
				//旋转
				$("#toleft").click(function(){
					rotate(-90)
				})
				$("#toright").click(function(){
					rotate(90)
				})
				$("#save").click(save);
				
//				马赛克
				var cx = $("canvas").offset().left;
				var cy = $("canvas").offset().top;
				var mark = 0;
				var arr = [10,20,30],radius,lidu=[2,3,4],li;
				$("#canbox").on({
					mousedown: function(e) {
						var e = e || event;
						var x = e.clientX-cx,
							y = e.clientY-cy;
							radius=arr[$(".list input:checked").index(".list input")];
							if($("#msk").hasClass("select"))
							$("#radius").css({height:radius,width:radius,left:x-radius/2,top:y-radius/2}).removeClass("hide");
							 li = lidu[$(".list input:checked").index(".list input")];
							mark=1;
						if(!$(".skewBox").hasClass("hide")){
						skewDown.call(this);
						}
					},
					mousemove:function(e){
						if($("#msk").hasClass("select") && mark){
							var e = e || event;
						var x = e.clientX-cx,
							y = e.clientY-cy;
							$("#radius").css({left:x-radius/2,top:y-radius/2})
							console.log(x+","+y);
						var imageData = getImageData(x-radius/2, y-radius/2, radius, radius,li);
							draw(imageData);
//						console.log(imageData)
						}
						if(!$(".skewBox").hasClass("hide")){
						skewMove.call(this);
						}
						
						
					}
				})
				
				$(document).mouseup(function(){
					mark=0;
					$("#radius").addClass("hide");
					
					var left = $(".skewBox").position().left;
				 	var top = $(".skewBox").position().top;
				 	var bw = $(".skewBox").width();
					var bh = $(".skewBox").height();
				 	$(".skewBox").css({"left":left,"top":top,"width":bw,"height":bh});
				 	SKEW.mark=0;
				})
				
				function getImageData(x,y,w,h,l) {
					var imageData = context.getImageData(x, y, w, h);
					console.log(arguments);
					var place = 0,
						places = [];
					for(var m = 0; m < imageData.width; m++) {
						var sx = m+arguments[0];
						for(var j = 0; j < imageData.height; j++) {
						var sy = j+arguments[1];
							//var i = 4*(x * imageData.height + y);
							var i = 4 * (j * imageData.width + m);
							if(imageData.data[i + 3] > 128) {
        						var r = imageData.data[i],
        						g = imageData.data[i+1],
        						b = imageData.data[i+2];
								place++;
								(place % 4 == 0) && places.push(new Dot(sx, sy, 0, l,{r:r,g:g,b:b}));
							}
						}
					}
					console.log(places);
					return places;
				}
				function draw(arr){
				var length = arr.length;
				var  index = 0,drr=[];
				
				for(var i =0;i<length;i++){
					var mark = 1;
//					var l = ((arr[i].x-arr[index].x)*(arr[i].x-arr[index].x))+((arr[i].y-arr[index].y)*(arr[i].y-arr[index].y));
					
					index++;
					
					context.beginPath()
					var x = Math.floor(arr[i].x/(arr[i].radius*2))*arr[i].radius*2;
					var y = Math.floor(arr[i].y/(arr[i].radius*2))*arr[i].radius*2;
					arr[i].x=x;
					arr[i].y=y;
					for(var j = 0;j<drr.length;j++){
						if(drr[j].x==x && drr[j].y==y){
								mark=0;
								break;
						}
					}
					drr.push(arr[i])
					if(mark){
					context.arc(x,y,arr[i].radius,0,Math.PI*2,true);
					context.fillStyle="rgb("+arr[i].r+","+arr[i].g+","+arr[i].b+")";
//					context.fillRect(x-radius,y-radius,x+radius,y+radius)
					context.fill();
//					context.stroke();	
					}
					
				}
			}
				
				function Dot(centerX, centerY, centerZ, radius,color) {
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
				
				function resize() {
					w = 1242 || $("canvas").width();
					h = 8454 ||$("canvas").height();
					$("canvas").attr({
						width: w,
						height: h
					});
				}
				
				
				//裁剪
				var SKEW={
					distance: 20, //距离边框多少范围内可操作
					changeX:0,
					changeY:0,
					moveFlag:0,
					inster:0,
					mark:0,
					dx:0,
					dy:0,
					boxX:$(".skewBox").position().left,
					boxY:$(".skewBox").position().top,
					cw:$(".skewBox").width(),
					ch:$(".skewBox").height(),
					minWidth:100,
					minHeight:75
				} 
				
				function skewMove(e){
					var bx = $(".skewBox").offset().left;
					var by = $(".skewBox").offset().top;
					var bw = $(".skewBox").width();
					var bh = $(".skewBox").height();
					var resize ="-resize"; 
					
					var e = e ||window.event;
					var x = e.clientX-bx;
					var y = e.clientY-by;

//					console.log(SKEW.changeY)
					if(SKEW.mark){
						var left = $(".skewBox").position().left;
				 		var top = $(".skewBox").position().top;
						if(SKEW.moveFlag==1){
							 left = e.clientX-SKEW.dx+SKEW.boxX;
							 top = e.clientY-SKEW.dy+SKEW.boxY;
						}else if(SKEW.moveFlag==2){
							if(SKEW.changeX<0){
							 left = e.clientX-SKEW.dx+SKEW.boxX;
							 bw= SKEW.cw-(e.clientX-SKEW.dx);
							}else if(SKEW.changeX>0){
							 bw= SKEW.cw+(e.clientX-SKEW.dx);
							}
							
							if(SKEW.changeY<0){
							 top = e.clientY-SKEW.dy+SKEW.boxY;
							 bh= SKEW.ch-(e.clientY-SKEW.dy);
							}else if(SKEW.changeY>0){
							 bh= SKEW.ch+(e.clientY-SKEW.dy);
							}
						}
//						限制缩放区域
						var maxWidth = $("#canbox").width()-left;
						var maxHeight = $("#canbox").height()-top;
						if(bw<SKEW.minWidth)bw = SKEW.minWidth;
						if(bw>maxWidth)bw = maxWidth;
						if(bh>maxHeight)bh = maxHeight;
						if(bh<SKEW.minHeight)bh = SKEW.minHeight;
						var maxLeft = $("#canbox").width()-bw;
						var maxTop = $("#canbox").height()-bh;
						if(top<0)top=0;
						if(top>maxTop)top=maxTop;
						if(left<0)left=0;
						if(left>maxLeft)left=maxLeft;
							
						
						
				 		$(".skewBox").css({"left":left,"top":top,"width":bw,"height":bh});
						
						
					}else{
						//					x是否可变
					if(x>(-SKEW.distance) && x<SKEW.distance){
						SKEW.changeX=-1;
						resize = "w"+resize;
					}else if(x>bw-SKEW.distance && x<bw+SKEW.distance){
						SKEW.changeX=1;
						resize = "e"+resize;
					}
					
					else
					SKEW.changeX=0;
					
					
					if(y>(-SKEW.distance) && y<SKEW.distance){
						resize = "n"+resize;
						SKEW.changeY=-1;
					}
					else if(y>bh-SKEW.distance && y<bh+SKEW.distance){
						resize = "s"+resize;
					SKEW.changeY=1;
					}
					else
					SKEW.changeY=0;
						
						
					changeCur(resize);
					if(SKEW.changeY==0 && SKEW.changeX==0){
					changeCur();
					}
					if(x>0 && x<bw && y>0 && y<bh){
						SKEW.inster=1;
					}else{
						SKEW.inster=0;
					}
					}
					
					
					
					
					
					
//					console.log(x+","+y)
				}
				
			function skewDown(e){
//				存储状态
				SKEW.boxX= $(".skewBox").position().left;
				SKEW.boxY = $(".skewBox").position().top;
				SKEW.cw= $(".skewBox").width();
				SKEW.ch = $(".skewBox").height();
				var e = e ||window.event;
					 SKEW.dx = e.clientX;
					 SKEW.dy = e.clientY;
				
				if(SKEW.changeY==0 && SKEW.changeX==0){
					if(SKEW.inster){
					SKEW.moveFlag=1;//移动
				}else{
					SKEW.moveFlag=0;
				}
				}else{
					SKEW.moveFlag=2;
				}
				SKEW.mark=1;
				
				
				
			}
				
				 function changeCur(css){
				 	var left = $(".skewBox").position().left;
				 	var top = $(".skewBox").position().top;
				 	var bw = $(".skewBox").width();
					var bh = $(".skewBox").height();

				 	if(css){
				 		$("#canbox,.skewBox").css("cursor",css);
				 	}else{
				 		$("#canbox,.skewBox").removeAttr("style");
				 		$(".skewBox").css({"left":left,"top":top,"width":bw,"height":bh});
				 	}
				 	
				 }
				
				//圖片預覽地址
				function handleFiles(obj) {
					
					var files = obj.files;
					console.log(files)
//					img = new Image();
//					//File API
//					EXIF.getData(files[0], function(){
//var a = EXIF.getAllTags(this);
// var b =  EXIF.getTag(this, 'Orientation');
// console.log(JSON.stringify(a));
// console.log(b);
// $("body").append("<p>"+JSON.stringify(a)+"</p>")
// $("body").append("<p>"+b+"</p>")
//});
					var src = window.URL.createObjectURL(files[0]); //创建一个object URL，并不是你的本地路径
//					img.onload = function(e) {
//						window.URL.revokeObjectURL(this.src); //图片加载后，释放object URL
//					}
					return src;
				}
				
				context.save();
				var isSave = 1,degIndex=0;
				
				//旋转
				function rotate(deg) {
					if(isSave) {
						console.log(1)
//						context.restore();
						context.translate(cw / 2, ch / 2);
						context.rotate(-degIndex * Math.PI / 180);
						degIndex=0;
						context.translate(-cw / 2, -ch / 2);
					}
					isSave = 0;
					//var ndata = canvas.toDataURL('image/jpeg', 1);
					var ndata = $('img').attr("src");

					var img = new Image();
					img.src = ndata;
					//        铺底色
					context.fillStyle = "#fff";
					context.fillRect(0, 0, cw, ch);
					img.onload = function() {
						context.translate(cw / 2, ch / 2);
						context.rotate(deg * Math.PI / 180);
						degIndex+=deg;
						context.translate(-cw / 2, -ch / 2);
						context.drawImage(img, 0, 0);
					}
					
					//context.rotate(deg*Math.PI/180);
					
				}
				
				//马赛克
				function msk(){
					var imageData = getImageData(x-radius/2, y-radius/2, radius, radius,li);
					draw(imageData);
				}
				
				//保存
				function save(){
					console.log(SKEW)
					if(!$(".skewBox").hasClass("hide") && false){
						var imageData = context.getImageData(SKEW.boxX,SKEW.boxY,SKEW.cw+SKEW.boxX, SKEW.ch+SKEW.boxY);
							var w = $("#canbox").width();
							var h = $("#canbox").height();
							var scalex = w/SKEW.cw;
							var scaley = h/SKEW.ch;
							 resize();	
							context.putImageData(imageData,0,0);
							var iurl = canvas.toDataURL('image/jpeg',1);
							var img = new Image();
							img.src = iurl;
							img.onload=function(){
								 resize();
								context.drawImage(img,0,0,w*scalex,h*scaley);
//								context.drawImage(img,0,0);
								var ndata = canvas.toDataURL('image/jpeg',1);
							$("img").attr('src', ndata);
							}
					}else{
						 var ndata = canvas.toDataURL('image/jpeg',1);
						 showimg(ndata)
//						 console.log(ndata)
							console.log(1)
						$("img").attr('src', ndata);
					}
					
					
						isSave =1;
						
						
				}
				
			})





