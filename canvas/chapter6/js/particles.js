				
				w=1000;
					 h=1000;
				resize();
					var can = $('#can')[0].getContext('2d');
//					can.moveTo(1,1);
//					can.lineTo(100,100);
					
//					can.arc(100,100,100,100,0,Math.PI,truess);
//					can.stroke();
					
					
					var box = [];
					 w= $("#can").width();
					 h = $("#can").height();
					 w=1000;
					 h=1000;
					//放点
					for(let i =0;i<200;i++){
						let a = {
							x:w*Math.random(),
							y:h*Math.random(),
							vx:Math.random()*3-1.5,
							vy:Math.random()*3-1.5
						}
						box.push(a);
					}
					var timer= setInterval(evey,1000/60);
					
//					动画
					function evey(){
						can.clearRect(0,0,w,h);
						for(let i in box){
							drew(box[i].x,box[i].y,can);
							for(var j=i;j<box.length;j++){
								var a = box[i];
								var b  = box[j];
								var l = Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));
								if(l<w/8){
									if(b.vx==0 && b.vy==0 && l>70){
										box[i].x-=((a.x-b.x)*0.03);
										box[i].y-=((a.y-b.y)*0.03);
									}
									can.beginPath();
									can.lineWidth =50/l;
									can.fillStyle="#fff"
									can.strokeStyle="#fff"
									can.moveTo(a.x,a.y);
									can.lineTo(b.x,b.y);
									can.stroke();
									can.closePath();
									
								}
							}
							box[i].x+=box[i].vx;
							if(box[i].x>w || box[i].x<0){
							box[i].vx=-box[i].vx;
							box[i].x+=box[i].vx;
							}
							box[i].y+=box[i].vy;
							if(box[i].y>h || box[i].y<0){
							box[i].vy=-box[i].vy;
							box[i].y+=box[i].vy;
							}
							
						}
//					stats.update();
						
					}
//					$(window).resize(resize);
//					$(document).mousemove(function(e){
//						if(box.length>200){
//							box.pop();
//						}
//						var e = e || window.event;
//						box.push({
//							x:e.clientX,
//							y:e.clientY,
//							vx:0,
//							vy:0
//						})
//					})
//					document.touchstart=function(e){
////					$(document).ontouchmove(function(e){
//						if(box.length>200){
//							box.pop();
//						}
//						var e = e || window.event;
//						console.log(e.clientX)
//						box.push({
//							x:e.clientX,
//							y:e.clientY,
//							vx:0,
//							vy:0
//						})
//					}
//					$(document).mousemove(function(e){
//						if(box.length>200){
//							box.pop();
//						}
//						var e = e || window.event;
//						box.push({
//							x:e.clientX,
//							y:e.clientY,
//							vx:0,
//							vy:0
//						})
//					})
//					 document.addEventListener('touchstart',touch, false);  
//  document.addEventListener('touchmove',touch, false);  
//  document.addEventListener('touchend',touch, false);  
      
    function touch (event){  
        var event = event || window.event;  
          console.log(event.changedTouches[0].clientX)
          if(box.length>200){
							box.pop();
						}
						var e = e || window.event;
						box.push({
							x:event.changedTouches[0].clientX,
							y:event.changedTouches[0].clientY,
							vx:0,
							vy:0
						})
//      var oInp = document.getElementById("inp");  
  
//      switch(event.type){  
//          case "touchstart":  
//              oInp.innerHTML = "Touch started (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";  
//              break;  
//          case "touchend":  
//              oInp.innerHTML = "<br/>Touch end (" + event.changedTouches[0].clientX + "," + event.changedTouches[0].clientY + ")";  
//              break;  
//          case "touchmove":  
//              event.preventDefault();  
//              oInp.innerHTML = "<br/>Touch moved (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";  
//              break;  
//      }  
          
    }  
    
   

//				})
				//调整画布尺寸
				function resize(){
//					 w= $("#can").width();
//					 h = $("#can").height();
//					 w=400;
//					 h=400;
					$("#can").attr({width:w,height:h});
				}
//				画点
				function drew(x,y,can){
						can.beginPath();
						can.fillStyle='#fff';
						can.arc(x,y,2,2*Math.PI,0,true);
						can.fill();
						can.closePath();
					}