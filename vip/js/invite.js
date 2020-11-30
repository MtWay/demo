$(function(){
	//获取url参数
function getQueryString(name) {
     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
     var r = window.location.search.substr(1).match(reg);
     if(r != null) return unescape(r[2]);
     return null;

}
var type = getQueryString("type");
if(type){
	//past为已过期页面，isvip为已办理页面
	$("body").addClass(type);
}
})
