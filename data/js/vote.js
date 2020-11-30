$(function(){
	
	$(".tabBox li").mouseenter(function(){
		$(this).addClass("cur").siblings().removeClass('cur');
	})
	
	$(".close").click(function(){
		$(".code_model,.bg").addClass("hide")
	})
	$(".voteBox").delegate(".vote_btn","click",function(){
		var id = $(this).data('id');
		$(".code_model,.bg").removeClass("hide");
		$(".apply_sub").data("id",id);
	})
	$("#apply_sub").click(function(){
		var id = $(this).data('id');
		var num = $("#apply_input").val();
		$.ajax({
			type:"get",
			url:"",//未定
			async:true
		});
	})
})
