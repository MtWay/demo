<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
    <meta name="format-detection" content="telephone=no">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<title>话题</title>
	<#import "/common/commonFunc.ftl" as common_func>
	<link href="${staticServer}/web/mobile/app/css/topics.css?20170630" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="${staticServer}/web/mobpages/js/common/jquery.min.js"></script>
	<script type="text/javascript" src="${staticServer}/web/mobpages/js/common/jsPlug.min.js?t=20170630"></script>
	<script type="text/javascript">
		var topicId = '${(topic.id)!''}';
	</script>
</head>
<body>
	<div class="title_box">
		<h2 class="topicsTitle">${topic.title!''}</h2>
	</div>
	<#if commentlist?? && commentlist?size gt 0>
		<#list commentlist as commentC>
			<#if commentC_index == 0>
				<div class="topicInfo">
					<!-- 图像个人信息部分 -->
					<div class="perInfo ov">
						<div class="perPic fl ov">
							<img class="fl" src="${staticServerUpload}${commentC.photo!''}">
							<div class="details fl">
								<p class="name">${commentC.name!''}<span class="<#if commentC.vipstate == 1>vipPic</#if>"></span><span class="XY">${commentC.credit!'0'}</span></p>
								<span class="addr">${commentC.company!'暂无'}</span>
							</div>
						</div>
						<div class="mTime fl">
							<p class="floor">${commentC.floor!''}楼</p>
							<p class="time">${commentC.createTime!''}</p>
						</div>
					</div>
					<!-- 图像个人信息部分 end -->

					<div class="topCont">
						${commentC.comment!''}
					</div>

					<!-- 图片 -->
					<div class="mediaCont">
						<#if commentC.pics ?? >
						<div class="picCont">
							<img src="${(common_func.getCarPic(commentC.pics?split(",")[0]))?replace('.jpg','_small_400_300.jpg')!''}" alt="">
							<p class="jumpApp">查看全部图片<i class="pic_arrow"></i></p>
						</div>
						</#if>
						<div class="zan">
							<img src="${staticServer}/web/mobile/app/images/Nozanpic.png">
							<span class="zanNum">${likecount!''}</span>
						</div>
					</div>
				</div>
			</#if>
		</#list>
	</#if>
	<#if likeuser ?? && likeuser?size gt 0>
		<div class="tHead">
			<ul class="topicHeaderPic">
				<#list likeuser as like>
					<#if like_index lt 6>
					<li><img src="${like.photo !''}"></li>
					</#if>
				</#list>
			</ul>
		</div>
	</#if>
	
	<div class="reContent" id="reContent">
		<#if commentlist??>
			<#list commentlist as commentC>
				<#if commentC_index gt 0 >
					<div class="reply">
						<!-- 图像个人信息部分 -->
						<div class="perInfo ov">
							<div class="perPic fl ov">
								<img class="fl" src="${staticServerUpload}${commentC.photo!''}">
								<div class="details fl">
									<p class="name">${commentC.name!''}<span class="<#if commentC.vipstate == 1>vipPic</#if>"></span><span class="XY">${commentC.credit!'0'}</span></p>
									<span class="addr">${commentC.company!''}</span>
								</div>
							</div>
							<div class="mTime fl">
								<p class="floor">${commentC.floor!''}楼</p>
								<p class="time">${commentC.createTime!''}</p>
							</div>
						</div>
						<!-- 图像个人信息部分 end -->

						<div class="topicCont">
							<span>${commentC.comment!''}</span>
							<div class="mediaCont">
						<#if commentC.pics ?? >
						<div class="picCont">
							<img src="${(common_func.getCarPic(commentC.pics?split(",")[0]))?replace('.jpg','_small_400_300.jpg')!''}" alt="">
							
							<p class="jumpApp">查看全部图片<i class="pic_arrow"></i></p>
						</div>
						</#if>
						<div class="picCont">
							<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1500631332556&di=d601b7697209c30fa18577948587196d&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fd833c895d143ad4b1bbf6bf688025aafa40f0676.jpg" alt="">
							<p class="jumpApp">查看全部图片<i class="pic_arrow"></i></p>
						</div>
					</div>
						</div>
						
						<#if commentC.replylist ??>
							<div class="repadd">
								<div class="replyCont">
									<#list commentC.replylist as replyC>
										<#if replyC_index gt 3>
											<#break>
										</#if>	
										<p class="replyText"><span class="name1">${replyC.name !'' }:&nbsp;</span>${(replyC.content?replace('\\[hx_([0-9]*)\\]','<img src="http://bd.2schome.net/resource/web/mobpages/images/facebox/$1.gif"/>', 'r'))!''}</p>
										<#if replyC.replyname ??>	
											<p class="replyText"><span class="name1">${replyC.replyname !'' }:&nbsp;</span><span class="hf">回复</span><span class="name1">${replyC.name !'' }:&nbsp;</span>${replyC.content !'' }</p>
										</#if>
										
									</#list>
									<#if commentC.replylist?size gt 4><!-- gt大于 -->
									<p class="lookAllRe jumpApp">查看全部评论</p>
									</#if>
									<i class="rArrowPic"></i>
								</div>
							</div>
						</#if>
						<div class="reCoDis ov">
							<div class="zanS fl">
								<span class="zanP jumpApp"></span>
								<span class="zanN">${commentC.likes!''}</span>
							</div>
							<div class="btn fr">
								<!-- <span class="delBtn jumpApp">删除</span> --><span class="repBtn jumpApp">回复</span>
							</div>
						</div>
					</div>
				</#if>
			</#list>
		</#if>
	</div>	
	<div class="comment" id="dibu">
		<p class="comcont">
			<span class="write jumpApp"><i class="wripic"></i></span>
			<span class="comText">已有<span class="num">${total!''}</span>人发表了观点</span>
		</p>
	</div>
	<script type="text/javascript">
		$(function(){
		   /*************加载评论******************/
		   // 下拉加载更多评论
		    var currpage = 2 , ifturn = 0;
		    var howmanydis = $('#reContent .reply').length;
		    if(howmanydis >= 24){
			    $(document).on('scroll',function() {
			        $('#reContent').listScrollLoad({
			            addList: '.reply',
			            loadAppend: 'body',
			            mBottom: '50',
			            loadingPic: 'http://static.hx2cars.com/resource/web/mobpages/images/mcarlist/loading.gif',
			            pUrl: '/mobile/topic/topicdetail.json',
			            dataArray: {
			            	/*apptoken:'',
			            	appmobile:'',*/
			                id: topicId,
			                pageSize:25,
			                currPage:currpage,
			            },
			            ifturn: ifturn,
			            scrollCallback: hxnewsLoading,
			            message: '没有更多评论了'
			        });
			    });
			}
		    function hxnewsLoading(data) {
		        currpage++; ifturn = 1;
		        var count = 0,str='';
		        try {
		            if (String(data.commentlist)) {
		                $.each(data.commentlist, function(i, item) {
		                    count++;
		                    var dca = item;
		                    str += '<div class="reply">';
		                    str += '<div class="perInfo ov"><div class="perPic fl ov">';
		                    str += '<img class="fl" src="${staticServerUpload}'+ dca.photo +'">';
		                    str += '<div class="details fl">';
		                    str += '<p class="name">'+ dca.name +'';
		                    if(dca.vipstate == 1){
		                    	str += '<span class="vipPic"></span>';
		                    }
		                    str += '<span class="XY">' + dca.credit + '</span></p>';
		                    str += '<span class="addr">'+ dca.company +'</span></div></div>'
		                    str += '<div class="mTime fl">';
		                    str += '<p class="floor">' + dca.floor + '楼</p>';
		                    str += '<p class="time">' + $.timeFormat(dca.createTime+ '', 'yyyy-MM-dd') + '</p></div></div>';
		                    str += '<div class="topicCont">' + dca.comment + '</div>';

		                    if(dca.replylist != null) {
			                    str += '<div class="repadd"><div class="replyCont">';
			                    str += '<p class="replyText">';

			                    str += '<span class="name1">'+ dca.replylist.name +':&nbsp;</span>'+ dca.replylist.content +'<#--dca.replylist.content--></p>';
 								if(dca.replylist.replyname != null) {
			                    	str += '<p class="replyText"><span class="name1">'+ dca.replylist.replyname +':&nbsp;</span><span class="hf">回复</span><span class="name1">'+ dca.replylist.name +':&nbsp;</span>'+ dca.replylist.content +'</p>';
			                	}
			                    str += '<p class="lookAllRe">查看全部评论</p>';
			                    str += '<i class="rArrowPic"></i>';
			                    str += '</div>';
							}

		                    str += '<div class="reCoDis ov">';
		                    str += '<div class="zanS fl"><span class="zanP"></span><span class="zanN">' + dca.likes + '</span></div>';
		                    str += '<div class="btn fr"><span class="repBtn">回复</span></div>';
		                    str += '</div></div>';
		                   
		                });
 						$('#reContent').append(str);
                    	throw 'true';
		            }
		        } catch (err) {
		            if (err == 'true') {
		                ifturn = 0;
		            } else if (err == 'false') {
		                ifturn = 1;
		            }
		        }
		        return ifturn;
		    }

		    


		    /***************点击所有操作，回跳app******************/
		    $('.jumpApp').click(function () {
		        $.hxWaptoapp({
					appLink: "myapp://www.weidian.com/test/b.html?7&${(topic.id)!''}",
	            });
		    });
		});

		/*$(function(){
			var $text = $('.replyText');
			var html = $text.html().trim().replace(/\n/g, '<br/>');
			$text.html(jEmoji.unifiedToHTML(html));
		});*/
	</script>
</body>
</html>