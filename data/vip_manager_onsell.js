$(function() {
	var doc = document,
		inputs = doc.getElementsByTagName('input'),
		supportPlaceholder = 'placeholder' in doc.createElement('input'),
		placeholder = function(input) {
			var text = input.getAttribute('placeholder'),
				defaultValue = input.defaultValue;
			if(defaultValue == '') {
				input.value = text
			}
			input.onfocus = function() {
				if(input.value === text) {
					this.value = ''
				}
			};
			input.onblur = function() {
				if(input.value === '') {
					this.value = text
				}
			}
		};
	if(!supportPlaceholder) {
		for(var i = 0, len = inputs.length; i < len; i++) {
			var input = inputs[i],
				text = input.getAttribute('placeholder');
			if(input.type === 'text' && text) {
				placeholder(input)
			}
		}
	}
});

function placeholderSupport() {
	return 'placeholder' in document.createElement('input');
}
var validate = function() {
		var type = $(this).attr("id");
		var beginTime = $("#begindate1").val();
		var endTime = $("#todate1").val();
		if(type == "oper_time2") {
			beginTime = $("#begindate2").val();
			endTime = $("#todate2").val();
		}

		if(beginTime == undefined || endTime == undefined) {
			alert("请选择完整的起始时间！");
			return;
		}
		$.post(
			'/vip/getweek.json', {
				beginTime: beginTime,
				endTime: endTime
			},
			function(data) {
				if(data) {
					if(data.msg = "success") {
						var weeks = data.weeks;
						var weekArray = weeks.split(",");
						$(".icons_box .list li").attr("choose", "no");
						$(".icons_box .list li").attr("class", "down");
						$.each(weekArray, function(n, value) {
							if(type == "oper_time") {
								$("#time_way li[value='" + value + "']").attr("choose", "yes");
								$("#time_way li[value='" + value + "']").attr("class", "on");
							} else {
								$("#recommand_form li[value='" + value + "']").attr("choose", "yes");
								$("#recommand_form li[value='" + value + "']").attr("class", "on");
							}

						});
					}
				}
			}
		);
	}
	/**
	 * 选择功能的JS
	 */
$(function() {
	//更新状态
	$('.cars_list').each(function(i, n) {

		var id = $(this).attr("id");
		var uptime = new Date($(n).find('.uptime').text()).Format("yyyy-MM-dd");//发布时间
		var uptimes = new Date($(n).find('.uptime').attr("data-val"));//发布时间精确到s
		var updateTime = new Date($(n).find('.updateTime').text());//更新时间
		var now = new Date();
	})

	//价格只能输入数字
	$("#input_beginPrice input").on("keyup", checkNo);
	$("#input_endPrice input").on("keyup", checkNo);
	//4s的vin码和发动机
	$(".VIN input").focus(function() {
		if($(this).attr("value")) {
			$(this).attr('placeholder', '');
		}
	})
	$(".VIN input").blur(function() {
		if($(this).attr("value") == "") {
			$(this).attr('placeholder', '请输入车辆识别码(VIN码)');
		}
	})
	$(".Enum input").focus(function() {
		if($(this).attr("value") == "") {
			$(this).attr("placeholder", "");
		}
	});
	$(".Enum input").blur(function() {
		if($(this).attr("value") == "") {
			$(this).attr("placeholder", "请输入发动机号码");
		}
	});
	//调整价格
	$(".change_cost").click(function(e) {
		prevent_bubble(e);
		var carid = $(this).attr("carid");
		modify_price(carid);
	});
	//切换品牌
	$("#relevant").on("click", "span", function() {
		$(".brand").html('<span style="float:left;">品牌</span><div class="brand_box"></div>');
		$("#relevant span").removeClass("select");
		$(this).addClass("select");
		var brandId = ($(this).attr("lang"));
		$(".brand_box").html('');
		jQuery.post('/fours/getbrandbyname.json', {
				brandId: brandId
			},
			function(data) {
				if(data.brands != "") {
					if(data.brands.brandTips != "" && data.brands.brandTips != " ") {
						xsz(data);
					}
					$(".brand").html('<span style="float:left;">品牌</span><div style="overflow:hidden;" class="brand_box"  title="' + data.brands.brandName + '[' + data.hbprice + '华币]' + '" lang="' + data.brands.id + '"  price="' + data.brands.price + '"  brandName="' + data.brands.brandName + '" hbprice="' + data.hbprice + '">' + data.brands.brandName + '[' + data.hbprice + '华币]' + '</div>');
					if($(".brand_box").html() != "请选择以上品牌") {
						$(".VIN input").focus();
					}
					$(".VIN input").attr("value", "");
					$(".VIN input").attr('placeholder', '请输入车辆识别码(VIN码)');
					$(".brand_box input").removeAttr("disabled");
				}
			});
	});
	//添加滚动事件
	$(window).scroll(function(e) {
		prevent_bubble(e);
		var height = $(document).scrollTop();
		if(height > 470) {
			$("#choice_function").addClass("cars_float");
		} else {
			$("#choice_function").removeClass("cars_float");
		}
	});
	$(".sharebox").click(function(e) {
		prevent_bubble(e);
	});
	$(".deal").click(function(e) {
		prevent_bubble(e);
	});
	$(".reminder_box").click(function(e) {
		prevent_bubble(e);
	});
	$("#4s_query_success").click(function(e) {
		prevent_bubble(e);
	});
	$("#box_4s").click(function(e) {
		prevent_bubble(e);
	});

	$("#onekey").click(function(e) {
		prevent_bubble(e);
	});
	$("#recommand_form").click(function(e) {
		prevent_bubble(e);
	});
	$("#update_form").click(function(e) {
		prevent_bubble(e);
	});

	//添加打印下载的功能
	$(".color_select_download").click(function() {
		var agent = window.navigator.userAgent;
		$("#purpleframe").jqprint();
	});
	//全选
	$("#all_check").unbind("click").click(barch_choose);
	//批量删除
	$("#choice_function .tuijian_icon .icons .icons1.del").unbind("click").bind("click", del);
	//批量更新
	$("#choice_function .tuijian_icon .icons .icons1.plgx").unbind("click").bind("click",function(){
		$("#upde_code").val('');
		updateCars()
	} );

	$(".update_btn").click(function(){
		$("#upde_code").val($(this).attr("lang"));
		updateCars()
	})
	//批量推荐
	$("#choice_function .tuijian_icon .icons:eq(0) .icons1.pltj").unbind("click").bind("click", displayrecommendCars);
	//提交批量更新/推荐支付
	$('#updates_sub').unbind("click").bind("click", submitUpdateCars);
	//定时更新
	$("#choice_function .tuijian_icon .icons:eq(1) .icons1.dsgx").unbind("click").bind("click", timingUpdate);
	//弹框的阻止冒泡事件
	$("#update_form").click(function(e) {
		prevent_bubble(e);
	});
	//选中单个日期
	$(".list ul li[datesign='1']").unbind("click").bind("click", choice_date);
	//更新的时间
	//选中全部的日期
	$(".list ul .input_box2").unbind("click").bind("click", choice_data_all);
	//定时更新操作
	$("#update_form .icon a:eq(0)").unbind("click").bind("click", addTimeUpdate);
	//定时更新的取消操作
	$("#update_form .icon a:eq(1)").unbind("click").bind("click", {
		selector: "#update_form"
	}, hide_div);
	hide_select("#update_form");

	//点击定时推荐
	$("#choice_function .tuijian_icon .icons:eq(1) .icons1.dstj").unbind("click").bind("click", timingRecommand);
	//弹框的阻止冒泡事件
	$("#recommand_form").click(function(e) {
		prevent_bubble(e);
	});
	//华夏站点的点击事件
	$("#recommand_form .list:eq(3) .icon4").unbind("click").bind("click", function() {
		if($("#recommand_form .SRegioncon").css("display") == "none") {
			$("#recommand_form .SRegioncon").show();
		} else {
			$("#recommand_form .SRegioncon").hide();
		}
	});
	//地区选择的阻止冒泡事件
	$("#recommand_form .SRegioncon .CheckB").unbind("click").bind("click", function(e) {
			e.stopPropagation();
		})
		//定时推荐的提交操作
	$("#recommand_form .icon a:eq(0)").unbind("click").bind("click", commit_timingRecommand);

	//弹框的取消事件
	$("#recommand_form .icon a:eq(1)").unbind("click").bind("click", {
		selector: "#recommand_form"
	}, hide_div);
	//点击空白处进行隐藏
	hide_select("#recommand_form");
	//是否推荐
	$("#input_tuijian").off().on("click", function() {
		$("#tuijian_box").show();
	});
	$("#tuijian_box a").off().on("click", function(e) {
		e.stopPropagation();
		$("#input_tuijian input").val($(this).text());
		$("#input_tuijian input").attr("data-id", $(this).attr("data-id"));
		$("#tuijian_box").hide();
	});

	//品牌
	$("#input_title input").off().on("click", function() {
		$("#input_beginTime .licensing_box").hide();
		$(".hx_sBrand").show();
	});
	//	品牌定位
	$(".sBrand_num a").off().on("click", function() {
		$(".sBrand_num  a").removeClass("on");
		$(this).addClass("on");
		var index = $(this).index();
		$(".sBrand_num a").each(function() {
			if($(this).attr("class") == "on") {
				var Height = 0;
				var index = $(this).index();
				for(var i = 0; i < index - 1; i++) {
					Height += $(this).closest(".hx_sBrand").find(".sBrand_list").eq(i).height();
				}
				$(this).closest(".hx_sBrand").find("#ALlist").scrollTop(Height);
			}
		});
	});
	$("#ALlist .sBrand_name").off().on("click", function() {
		$("#input_title input").val($(this).text());
		$(".hx_sBrand").hide();
	});
	//推荐包的点击事件
	$("#choice_function .tuijian_icon .icons:eq(2) .icons1.tjb").unbind("click").bind("click", open_recommandPack);
	//推荐包的选中
	$("#recommand_pack a").mouseover(function() {
		$(this).addClass("select");
	}).mouseout(function() {
		$(this).removeClass();
	});
	//推荐包的提交事件
	$("#recommand_pack a").unbind("click").bind("click", commit_recommandPack);
	//点击空白隐藏div
	hide_select("#recommand_pack");
	//一键操作的点击事件
	$("#choice_function .tuijian_icon .yjcz").unbind("click").bind("click", open_onekey);
	//#onekey的阻止冒泡事件
	$("#onekey").click(function(e) {
		prevent_bubble(e);
	});
	//操作类型
	$("#onekey .yj_box p:eq(0) em").bind("click", function() {
		$("#onekey .yj_box p:eq(0) em").removeClass();
		$(this).addClass("on");
	});
	//一键操作的提交事件
	$("#onekey .yj_box .icon a:eq(0)").bind("click", commit_onekey);

	//点击空白的隐藏事件
	hide_select("#onekey");
	//取消按钮的事件
	$("#onekey .yj_box .icon a:eq(1)").unbind("click").bind("click", {
		selector: "#onekey"
	}, hide_div);
	//成功之后取消事件
	$("#onekey .yj_box:eq(1) p:eq(1) a:eq(1)").bind("click", function() {
		$("#onekey .yj_box:eq(1)").hide();
		$("#onekey").hide();
	});
	//一键操作扣除华币的确定事件
	$("#onekey .yj_box:eq(1) p:eq(1) a:eq(0)").bind("click", function(e) {
		prevent_bubble(e);
		$("#onekey .yj_box:eq(1)").hide();
		$("#onekey").hide();
		var choice_type = 2;
		if($("#onekey .yj_box p:eq(0) em:eq(1)").attr("class") == "on") {
			choice_type = 1;
		}
		unblock();
		jQuery.post('/vip/onebuttonoperation.json', {
				timingType: choice_type,
				days: $('#onekey p input:eq(0)').val(),
				carnum: $('#onekey p input:eq(1)').val()
			},
			function(data) {
				if(data) {
					alert(data.msg);
					location.reload();
				}
			});
	});
	//分享的点击事件
//	$(".bototm .share").bind("click", car_share);
	//car_share();
//	$(".Bar_generalize .share a").bind("click", car_share);
	$(".Bar_generalize .share").bind("mouseover",car_share);
	$(".Bar_generalize .share").bind("mouseout", function() {
		$(this).find(".sharebox ").hide();
		$(this).parent().next().find(".share").show();

	});
	hide_select(".bototm .share .sharebox");
	//阻止div冒泡
	$(".share .sharebox").bind("click", function(e) {
		prevent_bubble(e);
	});

	//4s记录的点击事件
	$(".cars_list .Bar_function a").bind("click", four_squery);
	//关闭弹框事件
	$("#box_4s .box_4S_close1").bind("click", {
		selector: "#box_4s"
	}, hide_div);
	$(".query_4S .box_4S_close1").bind("click", {
		selector: ".query_4S"
	}, hide_div);
	//单车的推荐的点击事件
	//	$(".Bar_generalize .recommend").bind("click", single_recommand);
	$(".Bar_generalize .recommend").bind("click", single_recommand).bind("click", function() {
		var carid = $(this).attr("lang");
		ranking(carid);
		$("#dprovince").attr("carid", carid);
		showmodel(2, carid);
	});

	//推广
	$(".Bar_generalize .generalize").bind("click", function() {
		$('.model-title li').show();
		$('.model-title li').removeClass("not");
		var carid = $(this).attr("lang");
		$('#carid').val("," + carid);
		ranking(carid);
		$("#dprovince").attr("carid", carid);
		showmodel(3, carid);
	});
	//排名
	$(".rank").bind("click", function() {
		var carid = $(this).attr("carid");
		$('#carid').val("," + carid);
		ranking(carid);
		$("#dprovince").attr("carid", carid);
		$('.model-title li').show();
		$(".model-title ul li").eq(3).addClass("model-select").siblings().removeClass("model-select");
		showmodel(4, carid);
	});

	//单车的成交点击事件
	$(".Bar_operation .bargain").bind("click", single_deal);
	hide_select(".deal:eq(0)");
	$(".deal:eq(0) .deal_title a").bind("click", {
		selector: ".deal:eq(0)"
	}, hide_div);
	$(".deal_cont .icon a:eq(1)").bind("click", {
		selector: ".deal:eq(0)"
	}, hide_div);
	//单车成交的提交事件
	$(".deal_cont .icon a:eq(0)").bind("click", commit_deal);
	//下架车辆页面的成交
	$(".Bar_agains .icon:nth-child(3)").bind("click", single_deal);

	//4s的查询事件
	$(".box_4S_title .icon").bind("click", four_query);
	$(".box_4S2 .icon").bind("click", four_query);
	//点击
	$(".reminder_closed").bind("click", {
		selector: ".reminder_box"
	}, hide_div);
	hide_select(".reminder_box");

	//4s查询成功之后的弹框处理
	$("#4s_query_success .set_cx .set_close").bind("click", {
		selector: "#4s_query_success"
	}, hide_div);
	hide_select("#4s_query_success");

	//自动更新
	for(var i = 0; i < UPDATE.updatesize; i++) {
		$('.timelist li').eq(i).removeClass('hide').find('span').text(UPDATE.Updatetime[i]);
	}
	$("#carNum").text(UPDATE.carNum);
	if(UPDATE.Notfreeuser != 1) {
		switch(UPDATE.updatesize) {
			case 1:
				$("#carNum").text(UPDATE.carNum);
				$(".timelist li").eq(2).addClass('hide');
				$(".timelist li").eq(3).addClass('hide');
				$(".timelist li").eq(1).addClass('hide');
			case 2:
				$("#carNum").text(UPDATE.carNum);
				$(".timelist li").eq(2).addClass('hide');
				$(".timelist li").eq(3).addClass('hide');
				break;
			case 3:
				$("#carNum").text(UPDATE.carNum);
				$(".timelist li").eq(3).addClass('hide');
				break;
			case 4:
				$("#carNum").text(UPDATE.carNum);
				break;
		}
	} else {
			if(UPDATE.carNum == 1000){
				$("#allsale").attr('checked','checked').siblings().removeAttr('checked');
				$(".carn").attr("disabled",true);
				$(".warn_1").css("display","none");
			}
			else{
				$("#partsale").attr('checked','checked').siblings().removeAttr('checked');
				$(".carn").attr("disabled",false);
				$(".warn_1").css("display","inline-block");
				$(".carn").val(UPDATE.carNum);
				
			}
		$(".up_state div").eq(UPDATE.updateSwitch).addClass('select_auto').siblings().removeClass('select_auto');
		if(UPDATE.updateSwitch == 1){
			$(".timelist li").addClass("not").find(".icon-after").addClass("hide");
		}
	}
	if(UPDATE.money == '0') {
		$(".up_state div").eq(0).addClass("disable").siblings('div').addClass("select_auto");
		$(".salebutton").attr("disabled",true);
		$(".carn").attr("disabled",true);
		$(".warn_1").css("display","none");
	}
	
	$('input[type=checkbox]').click(function(){
		//$(this).attr('checked','checked').siblings().removeAttr('checked');
		if($('input[name:"sale"]:checked').val() ==1){
			$(".carn").attr("disabled",true);
			$(".warn_1").css("display","none");
		}
		else{
			$(".carn").attr("disabled",false);
			$(".warn_1").css("display","inline-block");
		}
	});

	$('#update_sub').not('.not').click(function() {
		var Updatetimes = [],
			$li = $('.timelist li').not('.hide');
		var Updateswitch = $('.select_auto').index('.up_state div');
		var carnum;
		var flag =$('input[name:"sale"]:checked').val();//添加更新车辆！！
		if(flag==1)
		{
			carnum = 1000;
		}
		else{
			carnum = $('.carn').val();
			if(carnum<1||carnum>999){
				alert("请输入正确范围内的数字");
				return;
			}
		}
		if(Updateswitch==0)
		for(var i = 0; i < $li.length; i++) {
			var time = $li.eq(i).find('span').text();
			if(Updatetimes.join().indexOf(time) >= 0) {
				alert("不可设置相同的时间点");
				return;
			}
			Updatetimes.push(time);
		}
		$.ajax({
			type: "post",
			url: "/vip /modifyupdate.json",
			async: true,
			data: {
				Updatetime: Updatetimes.sort().join(','),
				Updateswitch: Updateswitch,
				Carnum:carnum
			},
			success: function(data) {
				$('.update_auto').addClass('hide');
				alert('提交成功');
				location.reload();
			}
		});
	})

	$('.timelist li').click(function() {
		if($(this).hasClass("not"))
		return;
		WdatePicker({
			dateFmt: 'HH:mm',
			alwaysUseStartDate: true
		})
		$(".WdateDiv div").eq(1).css({"height":"180px","width":"141px"})
	})

	$('.auto').bind("click",function(tabindex) {
		$('.update_auto,.update_model').addClass('hide');
		$('.model-title li').show();
		$(".model-title ul li").eq(0).addClass("model-select").siblings().removeClass("model-select").hide();
		$('.model' + 1).removeClass("hide").siblings().addClass("hide");
		$(".models").removeClass("hide");
		//      var state = $(this).next().css('display')=='block'? 'show' : 'hide';
		//      if(state=='hide'){
		//          $.post('/vip/dailyupdateswitch.json',{type:0},function(data){
		//              if(data.msg =='success'){
		//                  if(data.updateSwitch=='0'){
		//                      $('#autoPanel em:eq(0)').addClass('on').siblings().removeClass('on');
		//                  }else if(data.updateSwitch=='1'){
		//                      $('#autoPanel em:eq(1)').addClass('on').siblings().removeClass('on');
		//                  }
		//                  $('#autoPanel').show();
		//              }else{
		//                  alert(data.msg)
		//              }
		//          })
		//      }else if(state=='show'){
		//          $('#autoPanel').hide();
		//      }

	});
	$('#autoPanel em').click(function() {
		$(this).addClass('on').siblings().removeClass('on');
	});
	$('#autoPanel .icon a:eq(0)').click(function() {
		var type = $('#autoPanel em.on').data('val');
		$.post('/vip/dailyupdateswitch.json', {
			type: type
		}, function(data) {
			if(data.msg == 'success') {
				alert('操作成功！');
			} else {
				alert(data.msg)
			}
			$('#autoPanel').hide();
		})
	});
	$('#autoPanel .icon a:eq(1)').click(function() {
		$('#autoPanel').hide();
	})

	//展示对应弹框
	$(".model-title ul li").click(function() {
		if($(this).hasClass('not'))
			return;
		showmodel($(this).index() + 1);
	})

	//提高排名
	$('.tomodel2').click(function() {
		if(UPDATE.updateSwitch == 0)
		{
			showmodel(3);
		}
		else if(UPDATE.money == 0){
			showmodel(3);
		}
			else{
				showmodel(1);
			}
	})

	function showmodel(tabindex, Iscard) {
		$('.update_auto,.update_model').addClass('hide');
		$(".model-title ul li").eq(tabindex - 1).addClass("model-select").siblings().removeClass("model-select");
		$('.model' + tabindex).removeClass("hide").siblings().addClass("hide");
		$(".models").removeClass("hide");
		if(Iscard) {
			//将数据显示到弹窗
			$(".dright").html($("#" + Iscard + " .title").html());
			$("#brand").text($("#" + Iscard + " .title h4").text());
			$(".prices").text($("#" + Iscard + " .price").text());
			$(".carDetail img").attr('src', $("#" + Iscard + " img").attr("src"))
		}
		generalize()
		changeday()
	}

	//关闭弹框
	$(".closeModel,.icon-close").click(function() {
		$(".models").addClass("hide");
		$(".model-title .not").removeClass('not')
	})

	//微信分享

	$(".bds_twx").click(function() {
		$(".wxmodel").removeClass("hide");
		var src = 'https://www.hx2car.com/servlet/carQrCode/' + $(this).attr('carid') + '.jpg';
		$('#wxcode').attr('src', src)
		return false;
	})

	$(".close-wx,.wxmodel").click(function() {
			$('.wxmodel').addClass('hide');
		})
		//下架车辆
	$(".remove_car").click(function() {
		var a = $(this).attr("carid");
		remove_car(a)
	})

	$(".removes.icons1").click(function() {
		var arr = [];
		$(".cars_list input[name='delCheck']").each(function(i, n) {
			if($(n).prop("checked")) {
				arr.push($(n).val());
			}
		})
		if(arr.length == 0) {
			alert('请选择车辆');
			return;
		}
		remove_car(arr.join(","))
	})

	function remove_car(ids) {
		$.ajax({
			type: "post",
			url: "/car/undercarriage.json",
			data: {
				Ids: ids
			},
			async: true,
			success: function(data) {
				alert(data.msg)
				if(data.success) {
					window.location.href = 'manageronsell.htm?sale=2';
				}
			}
		});
	}
	//推荐
	$("#commit_sure").unbind("click").click(function() {
		recommendCars();
	});

	//查看排名
	function ranking(Iscard) {
		var Iscard = Iscard;
		var Areacode=$("#dprovince_city").attr("data-val");
		if(Areacode =="100000")
		Areacode = ""
		if(Iscard == undefined) {
			Iscard = $("#dprovince").attr("carid");
		}
		$.ajax({
			type: "post",
			url: "/vip /viewrankings.json",
			async: true,
			data: {
				Iscard: Iscard,
				Areacode: Areacode
			},
			success: function(data) {
				if(data.message) {
					alert(data.message)
				}
				if(data.ranking == 0) {
					$(".msg-n").removeClass("hide").siblings().addClass("hide");
					$("#rankNumAfter").addClass('hide');
				} else {
					$(".haverank").removeClass("hide").siblings().addClass("hide");
					if(data.ranking > 10000){
						$("#rankNum").text("已在1万名以后");
						$("#rankNumAfter").addClass('hide');
					}else{
						$(".msg-n").addClass('hide');
						$("#rankNum").text(data.ranking).removeClass('hide');
						$("#rankNumAfter").removeClass('hide');
					}
				}
			}
		});
	}
	//自动更新
	//增加减少时间点
	$('.model1 .add').click(function() {
		var $list = $(this).parent().siblings('.hide');
		$list.eq(0).removeClass('hide');
		if($list.length == 1)
			$(this).addClass('hide');
	})

	//开启关闭自动更新
	$(".up_state div").not('.disable').click(function() {
		$(this).addClass('select_auto').siblings('div').removeClass('select_auto');
		if($(this).hasClass("open")){
			$(".timelist li").removeClass("not").find(".icon-after").removeClass("hide");
			$(".salebutton").attr('disabled',false);
			$(".carn").attr('disabled',false);
			$(".warn_1").css("display","inline-block");
		}else{
			$(".timelist li").addClass("not").find(".icon-after").addClass("hide");
			$(".salebutton").attr('disabled',true);
			$(".carn").attr('disabled',true);
			$(".warn_1").css("display","none");
		}
	})

	$('.model1 .rem').click(function() {
		$(this).parent().addClass('hide');
		$('.model1 .add').removeClass('hide');
	})

	$('.close_update').click(function() {
		$('.models').addClass('hide');
	})
	
	$('.close_update1').click(function() {
		$('.update_model').addClass('hide');
	})

	//批量上架车辆
	$(".plsj").click(function() {
		var arr = [];
		$(".cars_list input[name='delCheck']").each(function(i, n) {
			if($(n).prop("checked")) {
				arr.push($(n).val());
			}
		})
		if(arr.length == 0) {
			alert('请选择车辆');
			return;
		}
		window.location.href = 'republishcar.htm?carFlag=1&Carids=' + arr.join(',');
	})

	//    车源推广
	$("#generalizeSub").click(function() {
		if($(".paybox").hasClass("hide")) {
			generalizeSubmit()
		} else {
			generalizePay()
		}
	})

	function generalizeSubmit() {
		var areacode= $("#province_city").attr("data-val");
//		if(areacode == "100000")
//		areacode = "";
		var gdata = {
			car_id: $("#dprovince").attr("carid"),
			day: Number($(".days").find(".select").text().replace("天", "")),
			start_time: $("#etime").html(),
			money: $("#paynum").text(),
			areacode:areacode,
			id: 0,
			type: 0
		};
		$.ajax({
			type: "post",
			url: "payappad.json",
			async: true,
			data: gdata,
			success: function(data) {
				if(data.pay_state=="1"){
					alert("推广成功");
					$('.models').addClass('hide');
					window.location.href="/vip/myappads.htm";
				}else{
					alert(data.message)
				}
			}
		});
	}

	function generalizePay() {
		var money =$(".msg-hb .red").text();
		var childtype = 'areaPromotion';
		if($("#payState .select").hasClass("wechat")) {
			$.ajax({
				type: "post",
				url: "/mobile/weixinQR.json",
				async: true,
				data: {
					money: money,
					childtype: childtype,
					rechargetype: 0,
					flag: 'pc'
				},
				success: function(data) {
					if(data.message!=null){
						alert(data.message);
						return false;
					}
					recordId = data.recordId
						//微信支付弹窗 必要参数二维码地址及轮询id
					$wx = $(this).wxpay({
						code_url: data.code_url,
						prepay_id: data.recordId,
						intervalCallback: intervalCallback,
						showCallback: showCallback,
						closeCallback: closeCallback
					});
				}
			});
		} else if($("#payState .select").hasClass("ali")) {
			window.open('/money/submitRecharge.htm?bank=alipay&money=' + money + '&rechargetype=0&childtype='+childtype);
			recordId = '';
				getId()
		}
	}
	//获取支付宝id
	function getId() {
		$.ajax({
			type: "post",
			url: "/weixin/getorderid.json",
			async: true,
			success: function(data) {
				recordId = data.id;
				if(recordId == 1) {
					setTimeout(getId, 1000);
				}else{
					getState('areaPromotion',generalizeSubmit)
				}
			}
		})
}
	//获取支付状态
	function getState(token,cb){
		$.post('/weixin/callbackwithid.json', {
			flag: recordId,
			token: token
		}, function(data) {
				if(data.isSuccess == 1) {
					recordId =""
					if(typeof(cb)=="function"){
						cb()
					}
				}else{
					setTimeout(function(){
						getState(token,cb)
					},2000)
				}
		})
	}

	function showCallback() {
		$(".models").addClass("hide");
	}

	function closeCallback() {
		$(".models").removeClass("hide");
	}

	function intervalCallback() {
		$.post('/weixin/callbackwithid.json', {
			flag: recordId,
			token: 'areaPromotion'
		}, function(data) {
			if(data) {
				if(data.isSuccess == 1) {
					$(this).clearInte();
					$('.model_pay').addClass("hide");
					generalizeSubmit();
				}
			}
		})
	}

	function generalize() {
		var province = $('#province_city').attr('data-val');
		$.ajax({
			type: "post",
			url: "getappday.json",
			async: true,
			data: {
				areacode: province
			},
			success: function(data) {
				$(".inline span").text(data.message);
				$("#etime").text(data.create);
			}
		});
	}
	/*获得城市*/
	function getCity(key,$target,firstload){
		$.post('/tools/getAreaByCityCode.json',{province:key},function(data){
			   if(data.cityList!= null){
				  var city = '<li data-val="' + key + '">全省</li>';
					 for (var  i = 0; i < data.cityList.length; i++) {
						  city += '<li data-val="' + data.cityList[i].area_code + '">' + data.cityList[i].area_name + '</li>';
					 }
					 var $cityBox =$target.parents(".selectBox").next();
					 $cityBox.removeClass("hide").find("ul").empty().append(city);//添加城市
					 if(firstload !== '1'){
						 $cityBox.find(".address").attr("data-val",key).text("全省");//默认选择全省
						 $cityBox.find(".selectList_city").removeClass("hide");//展示城市列表
					 }
					 $(".selectList_city ul li").off().click(function(){
						var key = $(this).attr("data-val");
						var value = $(this).text();
						 $(this).parents(".selectList_city").addClass("hide").prev().find(".address").attr("data-val",key).text(value);
						 if($(".model3").hasClass("hide")){
						 	ranking();
						 }else if($(".model4").hasClass("hide")){
							generalize();
							changeday();
						 }
					 })

			   }
		   });
	}
//	var p = '全国,北京市,重庆市,上海市,天津市';
//	if(pArea){
//		if(p.indexOf(pArea.area_name) == -1){
//			getCity(pArea.area_code,$('.model3 .selectList,.model4 .selectList'),'1');
//		}else if(p.indexOf(pArea.area_name) != -1){
//			$parent.parents(".selectBox").next().addClass("hide").find(".address").attr("data-val",key).text(value);
//			ranking();
//			generalize();
//			changeday();
//		}
//	}
	//选择推广天数
	$(".model3 .days li").click(function() {
		$(this).addClass("select").siblings().removeClass("select");
		changeday();
	})

	//选择支付方式
	$('.mright .icon-pay').click(function() {
		$(this).addClass("select").siblings().removeClass('select')
	})

	//下拉菜单
	$(".toogles").click(function() {
			$(this).siblings(".selectList,.selectList_city").toggleClass("hide")
		})
		//省份
	for(var i = 1, str = '', key, value; i < PCAP.length; i++) {
		result = PCAP[i].split(':');
		key = result[0];
		value = result[1];
		str += '<li data-val="' + key + '">' + value + '</li>';
	}
	$('.selectList ul').append(str);
	$('.selectList ul li').click(function() {
		var $parent = $(this).parent().parent();
		var key = $(this).attr("data-val");
		var value = $(this).text();
		$parent.addClass("hide").prev().find('.address').attr("data-val", key).text(value);
		if(value=="全国" || value=="北京市" || value=="重庆市" || value=="上海市" || value=="天津市")
		{
			$parent.parents(".selectBox").next().addClass("hide").find(".address").attr("data-val",key).text(value);
			ranking();
			generalize();
			changeday();
		}else{
			getCity(key,$parent,'2');
		}
	})

	//推广金额
	function changeday() {
		var code = $("#province_city").attr("data-val");
			index = $('.model3 .days .select').index('.model3 .days li'),
			money = [100, 288, 450, 590, 1200, 2299];
		if( code.indexOf("0000")>0)
			money = [200, 588, 950, 1299, 2700, 5299];
		if( code=="100000")
			money = [600, 1788, 2980, 4158, 8888, 17700];

		$("#paynum").text(money[index]);
		$.ajax({
			type: "post",
			url: "gethbBalance.json",
			async: true,
			success: function(data) {
				if(data.isSuccess < money[index]) {
					$('.paybox').removeClass('hide');
					$('.msg-hb .red').text(money[index] - Number(data.isSuccess));

				} else {
					$('.paybox').addClass('hide');

				}
			}
		});
	}

});

//获取当前华币数量
function getHB(){
	var hb;
	$.ajax({
			type: "post",
			url: "gethbBalance.json",
			async: false,
			success: function(data) {
				 hb = data.isSuccess;
			}
		});
		return hb;
}


//修改价格的提交事件
function submit_price() {
	var carId = $("#carId").val();
	var modify_price = $("#modify_price .deal_cont .input_box:eq(0)").val();
	if(!/^\d/.test(modify_price)) {
		alert("请输入有效的修改价格");
		return;
	}
	if(carId == null) {
		return;
	}
	$.post(
		'/vip/modifycarprice.json', {
			id: carId,
			money: modify_price
		},
		function(data) {
			if(data && data.success) {
				location.reload();
			} else {
				alert("系统忙请稍后再试！");
			}
		}
	);
}
//修改发车价格的弹框处理
function modify_price(carId) {
	$("#carId").val(carId);
	show_hide("#modify_price");
	$("#modify_price").click(function(e) {
		prevent_bubble(e);
	});
	//	点击空白进行隐藏
	hide_select("#modify_price");
	//	点击关闭和取消按钮的事件
	$("#modify_price .deal_title a:eq(0)").click(function() {
		$("#modify_price").hide();
	});
	$("#modify_price .icon a:eq(1)").click(function() {
		$("#modify_price").hide();
	});
	//	添加提交事件
	$("#modify_price .icon a:eq(0)").click(submit_price);
}

//确定处理
var query_success = function() {
		var id = $(this).attr("lang");
		var show = $('.set_ts input[name="xs"]:checked ').val();
		if((show != null) && (show != "")) {
			//判断订单的手机号码和保存手机号码是否一致
			if(id != "" && id != undefined) {
				jQuery.post('/fours/showdetail.json', {
						carId: id,
						carflag: show
					},
					function(data) {
						if(data.msg == "4s显示问题修改成功") {
							$("#4s_query_success").hide();
						} else if(data.msg == "4s显示问题修改失败") {
							$(".set_ts").append('<p class="tishi">网络问题，请您稍后在修改！</p>');
						}
					});
			}
		} else {}

	}
	//4s的查询事件
var four_query = function() {
	$(".icon input").blur();
	var checkvin = /^[A-Za-z0-9]+$/;
	var brandid = $(".brand_box").attr("lang");
	//	var image=$(".box_4S_cont .xsz img").attr("src");
	var price = $(".brand_box").attr("price");
	var brandName = $(".brand_box").attr("brandName");
	var hbprice = $(".brand_box").attr("hbprice");
	var carId = ($(this).attr("lang"));
	var vin = $.trim($(".box_4S_title .VIN input").attr("value"));
	var evin = $.trim($(".box_4S2 .VIN input").attr("value"));
	var engine_number = $.trim($(".Enum input").attr("value"));
	if((brandid == "") || (brandid == undefined)) {
		alert("请选择以上品牌");
	} else if(price == "0") {
		alert("此品牌暂不支持联网查询!");
		$(".query_4S").css("display", "none");
	} else if($(".box_4S_title").css("display") == "block") {
		if(vin == "" || vin == "请输入车辆识别码(VIN码)") {
			alert("请填写vin码！");
			$(".box_4S_title .VIN input").focus();
		} else if(vin != "" && vin.length < 17) {
			alert("车辆识别码<vin码>长度为17位数字和字母组成!");
			$(".box_4S_title .VIN input").focus();
		} else if(vin != "" && !checkvin.test(vin)) {
			alert("vin仅限英文与数字 不需中文!");
			$(".box_4S_title .VIN input").focus();
		} else {
			$(".icon input").attr("disabled", "disabled");
			jQuery.post('/fours/postweb4spolicy.json', {
					hbprice: hbprice,
					carId: carId,
					brandId: brandid,
					vin: vin,
					price: price,
					brandName: brandName
				},
				function(data) {
					if(data.msg == "价格不正确") {
						alert(data.msg);
					} else if(data.msg == "账户余额充足") {
						$(".query_4S").hide();
						$(".box_4S:eq(1)").hide();
						location.href = CONTEXTPATH + "/fours/confirmorder.htm?order_id=" + data.orderid;
					} else if(data.msg == "账户余额不足") {
						$(".query_4S").hide();
						$(".box_4S:eq(1)").hide();
						alert("抱歉，您当前华币余额不足，请充值！");
						location.href = CONTEXTPATH + "/money/recharge.htm";
					} else {
						alert(data.msg);
					}
				});
		}
	} else if($(".box_4S2").css("display") == "block") {
		if(evin == "" || evin == "请输入车辆识别码(VIN码)") {
			alert("请填写vin码！");
			$(".box_4S2 .VIN input").focus();
		} else if(evin != "" && evin.length < 17) {
			alert("车辆识别码<vin码>长度为17位数字和字母组成!");
			$(".box_4S2 .VIN input").focus();
		} else if(evin != "" && !checkvin.test(evin)) {
			alert("vin仅限英文与数字 不需中文!");
			$(".box_4S2 .VIN input").focus();
		} else if(engine_number == "" || engine_number == "请输入发动机号码") {
			engine_number = 1;
			alert("请填写发动机号码!");
			$(".Enum input").focus();
		} else if(engine_number != "" && !checkvin.test(engine_number)) {
			alert("发动机号码仅限英文与数字 不需中文!");
			$(".Enum input").focus();
		} else {
			$(".icon input").attr("disabled", "disabled");
			jQuery.post('/fours/postweb4spolicy.json', {
					hbprice: hbprice,
					carId: carId,
					brandId: brandid,
					vin: evin,
					price: price,
					brandName: brandName,
					engine_number: engine_number
				},
				function(data) {
					if(data.msg == "价格不正确") {
						alert(data.msg);
					} else if(data.msg == "账户余额充足") {
						$(".query_4S").hide();
						$(".box_4S:eq(1)").hide();
						location.href = CONTEXTPATH + "/fours/confirmorder.htm?order_id=" + data.orderid;
					} else if(data.msg == "账户余额不足") {
						$(".query_4S").hide();
						$(".box_4S:eq(1)").hide();
						alert("抱歉，您当前华币余额不足，请充值！");
						location.href = CONTEXTPATH + "/money/recharge.htm";
					} else {
						alert(data.msg);
					}
				});
		}
	}
}

//4s的图片上传
//function uploadPhoto(id){
//	$.ajaxFileUpload({
//		url:CONTEXTPATH+'/weixin/upload.htm',//用于文件上传的服务器端请求地址
//		secureuri:false,//一般设置为false
//		fileElementId:id,//文件上传空间的id属性  <input type="file" id="file" name="file" />
//		dataType: 'json',//返回值类型 一般设置为json
//		success: function (data)  //服务器成功响应处理函数
//		{
//			//从服务器返回的json中取出message中的数据,其中message为在struts2中action中定义的成员变量
//			if(id=='file'){
//				$(".box_4S_cont .xsz img").attr("src",staticServerUpload+data.relativeSmallImgPath);
//				$(".box_4S_cont .xsz img").show();
//				$("#uploaded").show();
//			}
//		},
//		error: function (data, status, e)//服务器响应失败处理函数
//		{
//			alert(e);
//		}
//	});
//}
//单车成交的提交事件
var commit_deal = function(e) {
		prevent_bubble(e);
		if($("#carid").val() == null || $("#carid").val() == "") {
			alert("车辆ID没有，请联系管理员！");
			return;
		}
		var regexp = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字
		if(!regexp.test($(".deal_cont input").val()) || $(".deal_cont input").val() > 9999) {
			alert("请您输入有效的成交价格");
			return;
		}
		$.post(
			'/vip/deal.json', {
				carId: $("#carid").val(),
				money: $(".deal_cont input").val()
			},
			function(data) {
				if(data.success) {
					$("#deal_" + $("#carid").val()).html("已成交");
					$("#deal_" + $("#carid").val()).addClass("on");
					$("#deal_" + $("#carid").val()).parent().append(
						'<p class="on">' + $(".deal_cont input").val() + '万</p>'
					);
					window.location.reload();
				} else {
					alert("提交失败");
				}
			});
		$(".deal:eq(0)").hide();

	}
	//成交的点击事件
var single_deal = function(e) {
		prevent_bubble(e);
		show_hide(".deal:eq(0)");
		$("#carid").val($(this).attr("lang"));

	}
	//单车推荐事件
var single_recommand = function(e) {
	$('#carid').val("");
	$("#area").removeClass();
	$("#area").addClass("tuijian_modify");
	prevent_bubble(e);
	var index = 3;
	show_hide("#area");
	var carid = $(this).attr("lang");
	if(null == carid || "" == carid) {
		alert("车辆ID没有，请联系管理员！");
		return;
	}
	$('#carid').val("," + carid);
	$("#commit_sure").unbind("click").click(function() {
		recommendCars();
	});
}

//单车更新事件
function updateCar(carid) {
	if(confirm("您更新车辆将消费2个华币？")) {
		block('正在处理,请稍后');
		jQuery.post('/vip/updatecar.json', {
			carId: carid
		}, function(data) {
			if(data) {
				unblock();

				if(data.hasSuccessCar) {
					alert(data.msg);
					$("#chjMessage").html("更新成功！");
				} else {
					alert(data.msg);
					window.location.href = "/vip/hbrecharge.htm";
				}
				/*if(data.isFirst && data.isFirst==3){
					showMsg("每日首次更新，获得<span class=\"ORG\">2</span>积分！");
				}
				location.reload();*/
			}
		});
	}
}

//4s的查询事件
var four_squery = function(e) {
	prevent_bubble(e);
	var value = $(this).html();
	$("#relevant").html('');
	if(value == "4S查询中...") {
		alert("亲，不要着急啊，您的订单正在查询中，我们会在10-30分钟内出结果的!");
	} else if(value == "查询无记录") {
		alert("很遗憾，您的查询未成功，查询费用24小时内自动退还您的帐户！");
	} else if(value == "4S等待付款" || value == "4S查询驳回") {
		return;
	} else if(value == "4S查询成功") {
		$("#4s_query_success").show();
		//		$(".tishi").css("display","none");
		var id = $(this).attr("lang");
		jQuery.post('/fours/byidgetall.json', {
				carId: id
			},
			function(data) {
				if(data.brandname != "") {
					$(".set_title").html('<span class="bt">' + data.brandname + '</span><a target="_blank" href="' + CONTEXTPATH + '/fours/details.htm?details=' + data.id + '"><span class="record">查看详细记录>></span></a>');
					//成功之后确定操作是否在列表页显示的
				}
			});
		$(".set_icon").html('<p lang="' + id + '">确 定</p>');
		$(".set_icon p").bind("click", query_success);
	} else if(value == "4S记录查询") {
		hide_select(".query_4S");
		var carSerial = ($(this).attr("carSerial"));
		var brandStr = ($(this).attr("brandStr"));
		var cid = ($(this).attr("lang"));
		if((carSerial != "" && carSerial != undefined) && (brandStr != "" && brandStr != undefined)) {
			jQuery.post('/fours/find4sbrand.json', {
					carSerial: carSerial,
					brandStr: brandStr
				},
				function(data) {
					if(data.foursmap != "") {
						$(".reminder_box").css("display", "none");
						var list = data.foursmap;
						$("#relevant").html('');
						$(".brand_box").html('');
						for(var elem in list) {
							$("#relevant").append('<span lang="' + elem + '">' + list[elem] + '</span>');
						}
						if($("#relevant").children("span").last().text() == $("#relevant").children("span").first().text()) {
							var brandId = $("#relevant span").attr("lang");
							jQuery.post('/fours/getbrandbyname.json', {
									brandId: brandId
								},
								function(data) {
									if(data.brands != "") {
										if(data.brands.brandTips != "" && data.brands.brandTips != " ") {
											xsz(data);
										} else {
											$(".brand").html('<span style="float:left;">品牌</span><div style="overflow:hidden;" class="brand_box"  title="' + data.brands.brandName + '[' + data.hbprice + '华币]' + '" lang="' + data.brands.id + '"  price="' + data.brands.price + '"  brandName="' + data.brands.brandName + '" hbprice="' + data.hbprice + '">' + data.brands.brandName + '[' + data.hbprice + '华币]' + '</div>');
											if($(".brand_box").html() != "请选择以上品牌") {
												$(".VIN input").focus();
											}
										}
									}
								});
						} else {
							$(".brand_box").html('<input type="text" value="请选择以上品牌" disabled="disabled"/>');
							$(".brand_box input").css("background", "#fff");
						}
						$(".query_4S").show();
						$(".box_4S_title").css("display", "block");
						$(".VIN input").attr("value", "");
						$(".box_4S2").css("display", "none");
					} else {
						$(".query_4S").css("display", "none");
						$(".reminder_box").css("display", "block");
					}
				});
		}
		$(".icon").attr("lang", cid);
		$(".icon input").removeAttr("disabled");
		$("#uploaded").hide();
	} else {
		alert("很遗憾，您的查询未成功，查询费用24小时内自动退还您的帐户！");
	}
};
var xsz = function(e) {
	if(e.brands.brandTips.indexOf("行驶证") > 0) {
		alert("此品牌必须提供行驶证上的车辆识别码（vin码）和发动机号才能查询，请填写！");
		$(".VIN input").attr("value", "");
		$(".Enum input").attr("value", "");
		$(".Enum input").attr("placeholder", "请输入发动机号码");
		$(".box_4S2").css("display", "block");
		$(".box_4S_title").css("display", "none");
	} else {
		if(e.brands.brandTips != null && e.brands.brandTips != "") {
			alert(e.brands.brandTips);
		}
		$(".VIN input").attr("value", "");
		$(".box_4S2").css("display", "none");
		$(".box_4S_title").css("display", "block");
	}
	$(".brand").html('<span style="float:left;">品牌</span><div style="overflow:hidden;" class="brand_box"  title="' + e.brands.brandName + '[' + e.hbprice + '华币]' + '" lang="' + e.brands.id + '"  price="' + e.brands.price + '"  brandName="' + e.brands.brandName + '" hbprice="' + e.hbprice + '">' + e.brands.brandName + '[' + e.hbprice + '华币]' + '</div>');
	if($(".brand_box").html() != "请选择以上品牌") {
		$(".VIN input").focus();
	}
};

//分享事件
var car_share = function(e) {
		//prevent_bubble(e);
		//	获取当前需要分享的相关内容
		var $car = $(this).parents(".cars_list");
		var bdDesc =  $car.find(".car_detail .title a:eq(0)").html() + $car.find(".Bar_price .price").text();//$car.find(".car_detail .title .model").html() +
		BDDesc = bdDesc;
		var bdUrl = "https://www.hx2car.com/details/" + $car.attr("id");
		BDUrl = bdUrl;
		var bdPic = $car.find(".Bar_car .pic img:eq(0)").attr("src");
		BDPic = bdPic;
		window._bd_share_config = {
			common: {
				//自定义分享内容
				bdText: BDDesc,
				//自定义分享摘要
				bdDesc: "",
				//自定义分享url地址
				bdUrl: BDUrl,
				//自定义分享图片
				bdPic: BDPic,
				onBeforeClick:function(a){
					console.log(a)
					this.bdText=BDDesc;
					this.bdUrl=BDUrl;
					this.bdPic=BDPic;
				}
			},
			share: [{
				"bdSize": 16
			}]
		}
		        0[(document.getElementsByTagName('head')[0] || body).appendChild(document.createElement('script')).src = '/resource/web/dist/static/mobpages/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5)];


		//记录当前(需要显示/隐藏)的div状态
		//var status = $(this).children(".sharebox").css("display");
		//$(" .share .sharebox").hide();
		//还原状态
		$(this).children(".sharebox").show();
		$(this).parents(".Bar_generalize").next().find(".share").hide();
		//show_hide($(this).children(".sharebox"));
	}
	//一键操作的点击事件的提交事件
var commit_onekey = function(e) {
		unblock();
		prevent_bubble(e);
		var r = /^[0-9]*[1-9][0-9]*$/
		if($('#onekey p input:eq(0)').val() != null) {
			if(!r.test($('#onekey p input:eq(0)').val())) {
				alert("请输入数字");
				$('#onekey p input:eq(0)').val(null);
				return;
			}
			if($('#onekey p input:eq(0)').val() > 60) {
				alert("最多操作60天内车辆");
				$('#onekey p input:eq(0)').val(null);
				return;
			}

		}
		if($('#onekey p input:eq(1)').val() != null) {
			if(!r.test($('#onekey p input:eq(1)').val())) {
				alert("请输入数字");
				$('#onekey p input:eq(1)').val(null);
				return;
			}
			if($('#onekey p input:eq(1)').val() > 1000) {
				alert("最多操作1000辆车");
				$('#onekey p input:eq(1)').val(null);
				return;
			}
		}
		var choice_type = 2;
		if($("#onekey .yj_box p:eq(0) em:eq(1)").attr("class") == "on") {
			choice_type = 1;
		}
		jQuery.post(
			'getcarcount.json', {
				timingType: choice_type,
				days: $('#onekey p input:eq(0)').val(),
				carnum: $('#onekey p input:eq(1)').val()
			},
			function(data) {
				if(data) {
					$('#onekey .yj_box:eq(0)').hide();
					$('#onekey .yj_box:eq(1) p:eq(0)').html(data.msg);
					$('#onekey .yj_box:eq(1)').show();
				}
			});
	}
	//一键操作的点击事件
var open_onekey = function(e) {
	prevent_bubble(e);
	show_hide("#onekey");
	//	$("#onekey").show();
	$("#onekey .yj_box:eq(0)").show();
}

//更新包的提交事件
var commit_recommandPack = function(e) {
		prevent_bubble(e);
		var v = "";
		var items = document.getElementsByName("delCheck");
		var vv = new Array();
		var j = 0;
		var vtype = $(this).attr("lang");
		for(var i = 0; i < items.length; i++) {
			if(items[i].checked == true) {
				if(v == "") {
					v = items[i].value;
				} else {
					v = v + "," + items[i].value;
				}
				vv[j++] = items[i].value;
			}
		}
		if(vv.length == 0) {
			alert("请选择车辆！");
			return;
		}
		$(this).parent().hide();
		jQuery.post('addtimingpackage.json', {
			carIds: v,
			type: vtype
		}, function(data) {
			if(data) {
				alert(data.msg);
			}
		});

	}
	//点击更新包的事件
var open_recommandPack = function(e) {
		prevent_bubble(e); //带兼容性的阻止冒泡事件
		show_hide("#recommand_pack");

	}
	//定时推荐的提交操作
var commit_timingRecommand = function() {
	var url = "/vip/timeupdateweb.json?";
	//存储需要更新的车辆ID
	var vv = new Array();
	//星期
	var choice_week = new Array();
	//地区
	var choice_area = new Array();
	var index = 0;
	$(':checkbox[name="delCheck"]:checked').each(function() {
		vv[index++] = $(this).val();
		url = url + "&carIds=" + $(this).val();
	});
	index = 0;
	if(vv.length > 0) {

		//时间
		var input_begindate = $('#recommand_form .list:eq(0) input:eq(0)').val();
		var input_todate = $('#recommand_form .list:eq(0) input:eq(1)').val();
		var input_oper_time = $('#recommand_form .list:eq(1) input:eq(0)').val();
		if(input_begindate == null || "" == input_begindate ||
			input_todate == null || "" == input_todate ||
			input_oper_time == null || "" == input_oper_time) {
			alert('您还没选择执行日期和执行时间呢?');
			return;
		}
		//周期
		var len = $('#recommand_form div.list:eq(0) ul li.on').length;
		if(len == null || len == 0) {
			alert('您忘记选择周期了');
			return;
		} else {
			$('#recommand_form div.list:eq(0) ul li.on').each(function() {
				choice_week[index++] = $(this).val();
				url = url + "&weekType=" + $(this).val();
			});
		}
		index = 0;
		//地区
		var area_len = $('#recommand_form .SRegioncon input[name="stationIds"]:checked').length;
		if(area_len == null || area_len == 1) {
			alert("您忘记选择地区了");
			return;
		} else {
			$('#recommand_form .SRegioncon input[name="stationIds"]:checked').each(function() {
				var stationId = $(this).val();
				if(stationId != null && stationId != "1") { //不传总站
					choice_area[index++] = stationId;
					url = url + "&stationIds=" + stationId;
				}
			});
		}

		var begindate1 = input_begindate;
		var todate1 = input_todate;
		var oper_time1 = input_oper_time;
		$.post(
			url, {
				timingType: 2,
				startDate: begindate1,
				endDate: todate1,
				time: oper_time1
			},
			function(data) {
				if(data) {
					alert(data.msg);
					$('#recommand_form').hide();
				}
			});

	} else {
		alert("请选择需要操作的车辆");
		return;
	}
}

//定时推荐操作
var timingRecommand = function(e) {
	e.stopPropagation();

	if(!$(".cars_list input[name=delCheck]").is(":checked")) {
		alert("请选择需要操作的车辆");
		return;
	}
	show_hide("#recommand_form");
}

//进行定时更新的操作
var addTimeUpdate = function(e) {
	prevent_bubble(e);

	var url = "/vip/timeupdateweb.json?";
	//存储需要更新的车辆ID
	var vv = new Array();
	var choice_week = new Array();
	var index = 0;
	$(':checkbox[name="delCheck"]:checked').each(function() {
		vv[index++] = $(this).val();
		url = url + "&carIds=" + $(this).val();
	});
	index = 0;
	if(vv.length > 0) {
		var len = $('#time_way ul li.on').length;
		if(len == null || len == 0) {
			alert('您忘记选择周期了');
			return;
		} else {
			$('#time_way ul li.on').each(function() {
				choice_week[index++] = $(this).val();
				url = url + "&weekType=" + $(this).val();
			});
		}
		if($('#begindate1').val() == null || "" == $('#begindate1').val() || $('#todate1').val() == null || "" == $('#todate1').val() || $('#oper_time').val() == null || "" == $('#oper_time').val()) {
			alert('请选择执行日期和执行时间呢?');
			return;
		}
		var begindate1 = $('#begindate1').val();
		var todate1 = $('#todate1').val();
		var oper_time1 = $("#oper_time").val();
		$.post(
			url, {
				timingType: 1,
				startDate: begindate1,
				endDate: todate1,
				time: oper_time1
			},
			function(data) {
				if(data) {
					alert(data.msg);
					$('#update_form').hide();
				}
			});
	} else {
		alert("请选择需要操作的车辆");
		return;
	}
}

//定时更新中选中全部的日期
var choice_data_all = function(e) {
	e.stopPropagation();
	var obj = $(this).parent().parent().parent().find("li[datesign='1']");
	if($(this).attr("checked") == "checked") {
		$(obj).each(function() {
			if($(this).attr("choose") == "yes") {
				$(this).addClass("on")
			}
		});
	} else {
		obj.removeClass("on");
		$("#everyday").remove();
	}
}

//日期的点击添加选中样式的事件
var choice_date = function() {
		if($(this).attr("class") == "on") {
			$(this).removeClass();
			$("#update_commitform" + $(this).val()).remove();
		} else {
			if($(this).attr("choose") == "yes") {
				$(this).attr("class", "on");
				$("#update_commitform").append('<input id=\"update_commitform' + $(this).val() + '\" name=\"weekType\" value=' + $(this).val() + ' type=\"hidden\" />');
			}
		}
	}
	/**
	 * sale=0 表示的未售的车辆
	 * sale=1 表示的是已售的车辆
	 */
function searchmycar(sale) {
	//当进行搜索的时候可以将用户输入的条件存入搜索表单中进行提交
	//	先进行表单完整性的判断
	if("" != $("#input_beginTime input:eq(0)").val() && "" != $("#input_beginTime input:eq(0)").val()) {
		if("" == $("#input_endTime input:eq(0)").val() || "" == $("#input_endTime input:eq(0)").val()) {
			alert("请选择截止时间");
			return;
		}
	}
	if("" != $("#input_endTime input:eq(0)").val() && "请选择" != $("#input_endTime input:eq(0)").val()) {
		if("" == $("#input_beginTime input:eq(0)").val() || "请选择" == $("#input_beginTime input:eq(0)").val()) {
			alert("请选择起始时间");
			return;
		}
	}

	if("" != $("#input_beginPrice input:eq(0)").val()) {
		if("" == $("#input_endPrice input:eq(0)").val()) {
			alert("请输入最高价位");
			return;
		}
	}
	if("" != $("#input_endPrice input:eq(0)").val()) {
		if("" == $("#input_beginPrice input:eq(0)").val()) {
			alert("请输入最小价");
			return;
		}
	}
	//往表单中赋值
	$("#commit_sale").val(sale + '');
	if($("#input_hasPic input:eq(0)").attr("checked") == "checked") {
		$("#commit_hasPic").val("1")
	} else if($("#input_hasPic input:eq(1)").attr("checked") == "checked") {
		$("#commit_hasPic").val("0")
	}
	if(choice_check("#hasPicinputid")) {
		$("#commit_hasPic").val("1");
	} else if(choice_check("#hasPicinputid2")) {
		$("#commit_hasPic").val("0");
	}
	if($("#input_tuijian input").val() == "已推荐") {
		$("#commit_recommend").val("1");
	} else if($("#input_tuijian input").val() == "未推荐") {
		$("#commit_recommend").val("0");
	} else {
		$("#commit_recommend").val(null);
	}
	if($("#input_carCode input:eq(0)").val() != null && $("#input_carCode input:eq(0)").val() != "") {
		$("#commit_carCode").val($("#input_carCode input:eq(0)").val());
	}

	if($("#input_title input:eq(0)").val() != null && $("#input_title input:eq(0)").val() != "") {
		$("#commit_title").val($("#input_title input:eq(0)").val());
	}

	if($("#input_beginTime input:eq(0)").val() != null && $("#input_beginTime input:eq(0)").val() != "" && $("#input_beginTime input:eq(0)").val() != "请选择") {
		$("#commit_beginTime").val($("#input_beginTime input:eq(0)").val());
	}
	if($("#input_endTime input:eq(0)").val() != null && $("#input_endTime input:eq(0)").val() != "" && $("input_beginTime input:eq(0)").val() != "请选择") {
		$("#commit_endTime").val($("#input_endTime input:eq(0)").val());
	}

	if($("#input_beginPrice input:eq(0)").val() != null && $("#input_beginPrice input:eq(0)").val() != "") {
		var input_beginPrice = $("#input_beginPrice input:eq(0)").val();
		$("#commit_beginPrice").val(input_beginPrice);
	}
	if($("#input_endPrice input:eq(0)").val() != null && $("#input_endPrice input:eq(0)").val() != "") {
		var input_endPrice = $("#input_endPrice input:eq(0)").val();
		$("#commit_endPrice").val(input_endPrice);
	}
	var formObj = document.forms['little_search'];
	formObj.method = "post";
	formObj.action = "searchmycar.htm";
	formObj.submit();
}
/**
 * 判断一个复选框是否选中
 */
var choice_check = function(element_id) {
		if($(element_id).attr("checked") == "checked") {
			return true;
		}
		return false;
	}
	//只能输入数字
var checkNo = function() {
	var check = /^[0-9]+$/;
	if(!check.test(this.value)) {
		$(this).val("");
	}
};
/**
 * 选择年份，选择价格
 */
$(function() {
	$(".licensing_box p a").mouseover(function(event) {
		$(this).addClass("select");
	}).mouseout(function() {
		$(this).removeClass("select");
	});
	//处理年份
	selecet_click("#input_beginTime input:eq(0)", "#input_beginTime .licensing_box:eq(0)");
	selecet_click("#input_beginTime .xiala:eq(0)", "#input_beginTime .licensing_box:eq(0)");
	hide_select("#input_beginTime .licensing_box:eq(0)");
	selecet_click("#input_endTime input:eq(0)", "#input_endTime .licensing_box:eq(0)");
	selecet_click("#input_endTime .xiala:eq(0)", "#input_endTime .licensing_box:eq(0)");
	hide_select("#input_endTime .licensing_box:eq(0)");
	//价格处理
	//	selecet_click("#input_beginPrice input:eq(0)", "#input_beginPrice .licensing_box:eq(0)");
	//	selecet_click("#input_beginPrice .xiala:eq(0)", "#input_beginPrice .licensing_box:eq(0)");
	//	hide_select("#input_beginPrice .licensing_box:eq(0)");
	//	selecet_click("#input_endPrice input:eq(0)", "#input_endPrice .licensing_box:eq(0)");
	//	selecet_click("#input_endPrice .xiala:eq(5)", "#input_endPrice .licensing_box:eq(0)");
	//	hide_select("#input_endPrice .licensing_box:eq(0)");
	//选中之后的赋值处理
	$(".choice .w68 .licensing_box p a").click(function() {
		$(this).parent().parent().prevAll(".input_w45").val($(this).html());
		$(this).parent().parent().hide();
	});

});
/**
 * 点击非目标区域进行隐藏
 */
var hide_select = function(hide_context) {
		$(document).click(function() {
			var event = arguments.callee.caller.arguments[0] || window.event;
			if(!$(hide_context).is(event.target) && $(hide_context).has(event.target).length === 0) {
				$(hide_context).hide();
				//隐藏其他弹框
				$(".icons_box").hide();
			}
		});
	}
	/**
	 * 关于下拉框的显示隐藏事件
	 */
var selecet_click = function(click, show) {
		$(click).click(function() {
			$(".choice .w68 .licensing_box").hide();
			$(".hx_sBrand").hide();
			if($(show).css("display") == "none") {
				$(show).show();
			} else {
				$(show).hide();
			}
			return false;
		});
	}
	/**
	 * 处理两个复选框只能选中一个的JS
	 */
var checkbox_only = function(id1, id2) {
	$(id1).click(function() {
		$(id1).attr("checked", true);
		$(id2).attr("checked", false);
	});
	$(id2).click(function() {
		$(id2).attr("checked", true);
		$(id1).attr("checked", false);
	});
}
$(function() {
	checkbox_only("#input_hasPic input:eq(0)", "#input_hasPic input:eq(1)")
	checkbox_only("#input_recommend input:eq(0)", "#input_recommend input:eq(1)")
});
/**
 * 按价格排序order('money',4)
 * 按年份排序order('usedate',1)
 * 按更新时间排序order('modifiedTime',3)
 * 按点击量order('clickCount',2)
 * @param str
 * @param type
 */
function order(str, type, sale) {
	$('#orderCol').val(str);
	$('#orderType').val(type);
	//document.getElementById('orderType').value=type;
	if(null == $('#order').val() || $('#order').val() == 0) {
		$('#order').val(1);
	} else if($('#order').val() == 1) {
		$('#order').val(2);
	} else if($('#order').val() == 2) {
		$('#order').val(1);
	}
	//alert($("input[name='recommend']").val());
	$('#beginT').val($('#input_beginTime input:eq(0)').val());
	$('#endT').val($('#input_endTime input:eq(0)').val());
	$('#beginP').val($('#input_beginPrice input:eq(0)').val().substring(0, $('#input_beginPrice input:eq(0)').val().length - 1));
	$('#endP').val($('#input_endPrice input:eq(0)').val().substring(0, $('#input_endPrice input:eq(0)').val().length - 1));
	$('#cartype').val($('#input_title input:eq(0)').val());
	$('#carcode').val($('#input_carCode input:eq(0)').val());
	if(choice_check("#hasPicinputid")) {
		$('#haspic').val("1");
	} else if(choice_check("#hasPicinputid2")) {
		$('#haspic').val("0");
	}
	if(choice_check("#recommendinputid")) {
		$('#recommend').val("1");
	} else if(choice_check("#recommendinputid2")) {
		$('#recommend').val("0");
	}
	$("#sale").val(sale);
	var formObj = document.forms['search'];
	formObj.method = "post";
	formObj.action = "order.htm"; //orderCol="+$('#orderCol').val()+"&orderType="+type;
	formObj.submit();
}
/**
 * 一键操作
 *
 */
function getcarcount() {
	unblock();
	var r = /^[0-9]*[1-9][0-9]*$/
	if($('#days').val() != null) {
		if(!r.test($('#days').val())) {
			alert("请输入数字");
			$('#days').val(null);
			return;
		}
		if($('#days').val() > 60) {
			alert("最多操作60天内车辆");
			$('#days').val(null);
			return;
		}

	}
	if($('#carnum').val() != null) {
		if(!r.test($('#carnum').val())) {
			alert("请输入数字");
			$('#carnum').val(null);
			return;
		}
		if($('#carnum').val() > 1000) {
			alert("最多操作1000辆车");
			$('#carnum').val(null);
			return;
		}
	}
	$('#onetouchproperty').hide();
	jQuery.post('getcarcount.json', {
		timingType: $('#onetouchtype').val(),
		days: $('#days').val(),
		carnum: $('#carnum').val()
	}, function(data) {
		if(data) {
			$('#datamassage').html('<em class="orange14b">' + data.msg + '</em>');
			$('#onetouchoperation').show();
			if(data.success) {
				$('#datasuccess').val(1);
			} else {
				$('#datasuccess').val(0);
			}
		}
	});
}

/**
 * 更新包
 */
$("#RecommendBagTag li").click(function() {
	var v = "";
	var items = document.getElementsByName("delCheck");
	var vv = new Array();
	var j = 0;
	var vtype = $(this).attr("lang");
	for(var i = 0; i < items.length; i++) {
		if(items[i].checked == true) {
			if(v == "") {
				v = items[i].value;
			} else {
				v = v + "," + items[i].value;
			}
			vv[j++] = items[i].value;
		}
	}
	if(vv.length == 0) {
		alert("请选择车辆！");
		return;
	}
	$("#RecommendBagTag").slideToggle(200);
	jQuery.post('addtimingpackage.json', {
		carIds: v,
		type: vtype
	}, function(data) {
		if(data) {
			alert(data.msg);
		}
	});
});
/**
 * 定时更新(type=1)和定时推荐(type=2)
 *
 * @param type
 */
var timingUpdate = function(e) {
		prevent_bubble(e);
		if(!$(".cars_list input[name=delCheck]").is(":checked")) {
			alert("请选择需要操作的车辆");
			return;
		}
		show_hide("#update_form");

	}
	/**
	 * 选择时间的JS
	 * @returns
	 */
function dateStart() {
	var vv
	if(null != $('#begindate').val() && "" != $('#begindate').val()) {
		vv = $('#begindate').val();
	} else {
		vv = '%y-%M-%d';
	}
	return WdatePicker({
		minDate: vv,
		dateFmt: 'yyyy-MM-dd'
	});
}
/**
 * 批量推荐中的地区js
 */
$(function() {
	$("#area input").unbind("click").click(function() {
		var areaId = $(this).attr("id");
		var areaName = $(this).next("label").html();
		if($(this).attr("checked") == "checked") {
			$("#recommand_area").append('<div id=\"area' + areaId + '\" class=\"site\">' + areaName + '<em class=\"site_closed\" onclick=\"deleteArea(' + areaId + ');\">╳</em></div>');
		} else {
			$("#area" + areaId).remove();
		}
	});
	//去掉按钮

	$("#area p.icon a:eq(1)").unbind("click").bind("click", {
		selector: "#area"
	}, hide_div);

	hide_select("#area");
});
var deleteArea = function(areaId) {
		$("#area " + "#" + areaId).attr("checked", false);
		$("#recommand_area " + "#area" + areaId).remove();
	}
	/**
	 * 批量推荐
	 * @returns {Boolean}
	 */
var displayrecommendCars = function(e) {
	$('#carid').val("");
	prevent_bubble(e);
	//隐藏其他弹框
	var ids = "";
	var gids = document.getElementsByName("delCheck");
	var idArr = new Array();
	var idj = 0;
	for(var i = 0; i < gids.length; i++) {
		if(gids[i].checked == true) {
			ids = ids + "," + gids[i].value;
			idArr[idj++] = gids[i].value;

		}
	}
	if(idArr.length == 0) {
		alert('请选择车辆');
		return false;
	}
	if(idArr.length > 0) {
		var v = '#area';
		$('#carid').val(ids);
		show_hide(v);
		$(v).click(function(e) {
			prevent_bubble(e);
		});
		$('.models').removeClass("hide");
		$('.model-title li').show();
		$('.model-title li').eq(1).addClass('model-select').siblings().removeClass('model-select').hide();
		$('.model2').removeClass("hide").siblings().addClass("hide");
		$("#commit_sure").unbind("click").click(function() {
			recommendCars();
		});
		//		$('#listtitle').append($(v));
	}
}

function recommendCars() {
	var ids = $('#carid').val();
	var v = "";
	var items = $("#areas .SRegioncon input");
	var splIds = ids.split(",");
	var vv = new Array();
	var j = 0;
	for(var i = 0; i < items.length; i++) {
		if(items[i].checked == true) {
			var stationId = items[i].value;
			if(stationId != null && stationId != "1") { //去除 总站参数
				v = v + "," + stationId;
			}

			vv[j++] = stationId;
		}
	}
	if(vv.length <= 1) {
		alert("请选择总站以外的站点！");
		return;
	}
	var hb = getHB();
	var xhhb = 10 * (vv.length - 1) * (splIds.length - 1);
	if(hb >= xhhb){
	if(confirm("您推荐到这些站点将消费" + (10 * (vv.length - 1) * (splIds.length - 1)) + "华币？")) {
		block('正在处理,请稍后');
		jQuery.post('/vip/recommendmorecars.json', {
			ids: v,
			carIds: ids
		}, function(data) {
			if(data) {
				unblock();
				if(data.success) {
					alert("推荐成功！");
						location.reload();
					var caridarr = new Array();
					caridarr = ids.split(",");
					for(i = 0; i < caridarr.length; i++) {
						$('#recommend_' + caridarr[i]).text('已推荐');
						$('#recommend_' + caridarr[i]).removeClass();
						$('#recommend_' + caridarr[i]).addClass("on");
					}
				} else {
					alert(data.msg);
				}
				$('#area').hide();
				$(".models").addClass('hide')
			}
		});
	}
	}else{
		$("#updates_sub").attr("childtype","carPromotion");
			$(".var_update").text("推荐");
			$(".xhnum").text(xhhb);
			$(".quenum").text(xhhb-hb);
			$(".update_model").removeClass("hide");
			$(".models").addClass("hide")

	}

}
/**
 * 对于首次首次更新的弹框关闭操作
 */
function scanClose() {
	$(".bg").hide();
	$(".scan").hide();
	window.location.href = "/vip/manageronsell.htm?currPage=1";
}
/**
 * 批量更新
 */
var updateCars = function(e) {
		prevent_bubble(e);
		$("#area").hide();
		$("#update_form").hide();
		$("#recommand_form").hide();
		$("#recommand_pack").hide();
		$("#onekey").hide();
		$('.update_auto').addClass('hide');
		//隐藏其他弹框

		if($("#upde_code").val()==""){
		var v = "";
		var items = document.getElementsByName("delCheck");
		var vv = new Array();
		var j = 0;
		for(var i = 0; i < items.length; i++) {
			if(items[i].checked == true) {
				v = v + "," + items[i].value;
				vv[j++] = items[i].value;

			}
		}
		if(vv.length == 0) {
			alert('请选择车辆');
			return;
		}
		var hb = getHB();
		var xhhb = 2 * vv.length;
		}else{
			var v = $("#upde_code").val();
			var hb = getHB();
			var xhhb = 2;
		}
		if(hb >= xhhb){
			if(confirm("您更新车辆将消费" + xhhb + "个华币？")) {
			block('正在处理,请稍后');
			jQuery.post('/vip/updatecars.json', {
				ids: v
			}, function(data) {
				if(data) {
					unblock();
					alert(data.msg);
					if(data.success) {
						location.reload();
					}
				}
			});
		}
		}else{
			$("#updates_sub").attr("childtype","carUpdate");
			$(".var_update").text("更新");
			$(".xhnum").text(xhhb);
			$(".quenum").text(xhhb-hb);
			$(".update_model").removeClass("hide");
		}

	}
//提交更新/推荐支付
	function submitUpdateCars(){
		var childtype =$("#updates_sub").attr("childtype");
		var money = $(".quenum").eq(1).text();
		if($(".update_model .icon-pay.select").hasClass("wechat")){
			$.ajax({
				type: "post",
				url: "/mobile/weixinQR.json",
				async: true,
				data: {
					money: money,
					childtype: childtype,
					rechargetype: 0,
					flag: 'pc'
				},
				success: function(data) {
					$("#data-recordId").val(data.recordId);
						//微信支付弹窗 必要参数二维码地址及轮询id
					$wx = $(this).wxpay({
						code_url: data.code_url,
						prepay_id: data.recordId,
						intervalCallback: intervalCallbacks,
						showCallback: showCallbacks,
						closeCallback: closeCallbacks
					});
				}
			});
		}else if($(".update_model .icon-pay.select").hasClass("ali")){
			window.open('/money/submitRecharge.htm?bank=alipay&money=' + money + '&rechargetype=0&childtype='+childtype);
				getIds()
		}
	}


	//获取支付宝id
	function getIds() {
		var childtype =$("#updates_sub").attr("childtype");
		if(childtype== "carUpdate"){
					var callback = updateCars;
					}else if(childtype== "carPromotion"){
						var callback=recommendCars;//推荐
					}
		$.ajax({
			type: "post",
			url: "/weixin/getorderid.json",
			async: true,
			success: function(data) {

				$("#data-recordId").val(data.id)
				if(data.id == 1) {
					setTimeout(getIds, 1000);
				}else{
					getStates(childtype,callback)
				}
			}
		})
}
	//获取支付状态
	function getStates(token, cb) {
	var recordId = $("#data-recordId").val();
	$.post('/weixin/callbackwithid.json', {
		flag: recordId,
		token: token
	}, function(data) {
		if(data.isSuccess == 1) {
			clearTimeout(timeout)
			if(typeof(cb) == "function") {
				cb()
			}
		} else {
			timeout = setTimeout(function() {
				getStates(token, cb)
			}, 2000)
		}
	})
}

	function intervalCallbacks() {
		var childtype =$("#updates_sub").attr("childtype");
		var recordId =$("#data-recordId").val();
		$.post('/weixin/callbackwithid.json', {
			flag: recordId,
			token: childtype
		}, function(data) {
			if(data) {
				if(data.isSuccess == 1) {
					$(this).clearInte();
					$('.model_pay').addClass("hide");
					if(childtype== "carUpdate"){
						updateCars();//更新
					}else if(childtype== "carPromotion"){
						recommendCars()//推荐
					}
				}
			}
		})
	}
	function showCallbacks(){
		$(".update_model").addClass("hide");
	}
	function closeCallbacks(){
		$(".update_model").removeClass("hide");
	}

	/**
	 * 隐藏某公用方法
	 */
var hide_div = function(event) {
		prevent_bubble(event);
		$(event.data.selector).hide();
		$('#carid').val('');
		return false;
	}
	/**
	 * 批量删除
	 */
var del = function(e) {
		prevent_bubble(e);
		$("#area").hide();
		$("#update_form").hide();
		$("#recommand_form").hide();
		$("#recommand_pack").hide();
		$("#onekey").hide();
		var v = "";
		var items = document.getElementsByName("delCheck");
		var vv = new Array();
		var j = 0;
		for(var i = 0; i < items.length; i++) {
			if(items[i].checked == true) {
				v = v + "," + items[i].value;
				vv[j++] = items[i].value;
			}
		}
		if(vv.length == 0) {
			alert("请选择车辆！");
			return;
		}
		if(confirm("确定删除么？")) {
			jQuery.post('delbatch.json', {
				ids: v
			}, function(data) {
				if(data) {
					alert(data.msg);
					if(data.success) {
						for(var i = 0; i < vv.length; i++) {
							$("#" + vv[i]).remove();
						}
					}
					window.location.reload();
				}
			});
		}

	}
	/**
	 * 判断一个div是否是隐藏的
	 */
var check_hide = function(selector) {
	if($(selector).css("display") == "none") {
		return true;
	}
	return false;
}
var show_hide = function(selector) {
		$("#area").click(function(e) {
			prevent_bubble(e);
		});
		//记录当前弹框的状态
		var div_status = $(selector).css("display");
		//关闭所有弹框
		//关闭批量推荐，定时更新，定时推荐三个弹框
		$(".icons_box").hide();
		//一键操作的一个弹框
		$(".yj").hide();
		//隐藏分享的1个弹框
		$(".sharebox").hide();
		//4s的两个弹框
		$(".box_4S").hide();
		//成交的一个弹框
		$(".deal").hide();
		//推荐包的弹框
		$(".tjbag").hide();

		//	$("#area").hide();
		//还原当前显示DIV 的状态
		$(selector).css("display", div_status);
		if(div_status == "none") {
			$(selector).show();
		} else {
			$(selector).hide();
		}
	}
	/**
	 * 全选框的点击事件
	 */
var barch_choose = function(e) {
		prevent_bubble(e);
		//隐藏其他弹框
		$(".icons_box").hide();
		if($('#all_check').attr("checked") == 'checked') {
			$("[name='delCheck']").attr("checked", 'true'); //全选
		} else {
			$("[name='delCheck']").removeAttr("checked"); //移除
		}
	}
	/**
	 * 阻止冒泡的公用方法
	 */
var prevent_bubble = function(e_input) {
	var ev = e_input || window.event;
	if(ev.stopPropagation) {
		ev.stopPropagation();
	} else if(window.event) { //IE
		window.event.cancelBubble = true; //IE
	}
}

//时间格式化
Date.prototype.Format = function(fmt) { //author: meizz
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

$(document).click(function(e) {
	if((!$("#input_tuijian").is(e.target) && $("#input_tuijian").has(e.target).length == 0)) {
		$("#tuijian_box").hide();
	}
	if((!$("#input_title").is(e.target) && $("#input_title").has(e.target).length == 0)) {
		$(".hx_sBrand").hide();
	}

});
