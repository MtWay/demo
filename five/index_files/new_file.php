<?php
function send_post($url, $post_data) {  
  
  $postdata = http_build_query($post_data);  
  $options = array(  
    'http' => array(  
      'method' => 'POST',  
      'header' => 'Content-type:application/x-www-form-urlencoded',  
      'content' => $postdata,  
      'timeout' => 15 * 60 // 超时时间（单位:s）  
    )  
  );  
  $context = stream_context_create($options);  
  $result = file_get_contents($url, false, $context);  
  
  return $result;  
}  
  
//使用方法  
$post_data = array(  
	'appid'=>"wxc82088a586201f2a",
	'secret'=>"dcd1a4ae9de57701c366d739f2b9421d"
);  
send_post('https://api.weixin.qq.com/cgi-bin/token', $post_data); 
echo $_GET['onloaded'].'('.json_encode($result).');';
?>