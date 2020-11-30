$(function() {
	CommonFontSize(750)

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
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" +
				o[k]).substr(("" + o[k]).length)));
		return fmt;
	}
	$("#sub").click(function() {
		let regDate = $("#date1").val();
		let carType = $(".cur").text().replace(/\s+/g, "")
		if (carType == '商用车') {
			// regDate = $.timeFormat($("#date1").val(),'yyyy-mm')
			regDate = new Date($("#date1").val()).Format('yyyy-MM')
		}
		console.log((regDate))
		let obj = {
			"areaName": $("#address").attr("data-area"),
			"areaId": $("#address").attr("data-sCode"),
			"carType": carType,
			"mile": $("#mile").val(),
			"regDate": regDate,
			"typeId": $("#Brand").attr('data-foid'),
			"typeName": $("#Brand").text(),
			mobile: $("#mobile").val()
		}
		obj = {
			areaName: "通化",
			areaId: '123',
			carType: "乘用车",
			mile: '1',
			mobile: "13111111111",
			regDate: "2020-07-23",
			typeId: '532',
			typeName: "阿斯顿·马丁 V12 Vantage(进口) 2014款 V12 Vantage(进口) 6.0L S"
		}
		console.log(obj);
		$.ajax({
			headers: {
				'platform': 'web'
			},
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(
				obj
			),
			url: 'http://test106.2schome.net/order/tClue/h5/save',
			success: function(data) {
				console.log(data)
				showResult()
			}
		})
	})
	
	function showResult(){
		$('.resultPage').show();
		setTimeout(function() {
			$('.resultPage').css({
				'-webkit-transform': 'translate(0,0)',
				'transform': 'translate(0,0)'
			});
		})
	}

	hx.MobileBrand({
		getFirstgradeId: '#Brand',
		forthCallback: hxforbrandCallback,
		secondSp: false,
		thirdSp: true,
		secondCallback: null
	});

	//车型
	function hxforbrandCallback(data, foid) {
		$("#Brand").text(data)
		$("#Brand").attr('data-foid', foid)
		$('#fgradeArrow').click();
	}
	/*返回箭头*/
	$('.backArrow').click(function() {
		$(this).parent().parent().css({
			'-webkit-transform': 'translate(100%,0)',
			'transform': 'translate(100%,0)'
		});
		setTimeout(function() {
			$(this).parent().parent().hide();
		}, 300);
	});
	$("#address").click(function() {
		$.ajax({
			headers: {
				'platform': 'web'
			},
			type: 'GET',
			url: 'http://test106.2schome.net/commons/tCarArea/provinces',
			success: function(data) {
				console.log(data)
				var str = '';
				data.data.map(item => {
					str += `<li data-code="">` + item.provName + `<i></i></li>`
				})
				$("#addBox").html(str)
				add2()
			}
		})
		$('.provincePage').show();
		setTimeout(function() {
			$('.provincePage').css({
				'-webkit-transform': 'translate(0,0)',
				'transform': 'translate(0,0)'
			});
		})
	})

	function add2() {
		$('.province_panel li').blockFly({
			targetId: '.cityPage',
			flyType: 2,
			ifShadow: false,
			beginLocation: '100%',
			targetLocation: '0%',
			closebuttonId: '#cityArrow',
			flyCallback: hxgetCity,
			nextCallback: null
		});
	}

	function hxgetCity() {
		var toptitle = $(this).text();
		$('#choiceAddr').attr('data-fCode', $(this).attr('data-code'));
		$(".cityPage .city_panel").html('');
		$.ajax({
			headers: {
				'platform': 'web'
			},
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				provName: toptitle
			}),
			url: 'http://test106.2schome.net/commons/tCarArea/city',
			success: function(data) {
				console.log(data)
				// },
				// })
				//     $.post('/tools/getAreaByCityCode.json', {province: $(this).attr('data-code')}, function (data) {
				if (data) {
					let cityList = data.data
					for (var i = 0, gctr = ''; i < cityList.length; i++) {
						gctr += '<li data-code="' + cityList[i].cityId + '">' + cityList[i].cityName + '</li>';
					}
					$(".cityPage .city_panel").html(gctr);
					$('.city_panel li').click(function() {
						$('#address').html(toptitle + ' ' + $(this).html()).attr('data-sCode', $(this).attr('data-code')).attr(
							'data-area', $(this).html());
						$('#provinceArrow').click();
						$('#cityArrow').click();
					})
				}
			}
		})
	}

	$("#date1").date()

})
