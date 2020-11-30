$(function(){
	 var moneyObj = [
	 {
	 	
	 },
	 ];
	$(".kind ").click(function(){
		console.log($(this).index());
		$(this).addClass("select").siblings().removeClass("select")
	})
})
