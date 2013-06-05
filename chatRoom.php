<!doctype html>
<html lang='en' class='no-js'>
<head>
<meta charset='utf-8' />
<title><?=isset($title) ? $title : 'myChatRoom'?></title>
<link rel="stylesheet/less" type="text/css" href="style/style.css">
<link href='http://fonts.googleapis.com/css?family=Amaranth:400,400italic' rel='stylesheet' type='text/css'>
<script src="../js/less.min.js"></script>
<script src="../js/modernizr.js"></script>
</head>
<body>

<div id="overlay">
  <div id="lightbox" style="">
  <p class='welcome'>Välkommen till ChatRoom!</p>
    <input id="nick_" placeholder="Namn" ><button id="connect_">LOGIN</button><br />
    <div id="status_"></div>
  </div>
</div>
<div id='flash'>
  <button id='close' class="close" title="Disconnect">LOGOUT</button>
  <p class="chatHeadline">ChatRoom</p>
  <div id="users">
  </div>
  <div id='chatt' class='output'></div>
  <input id='message' placeholder="Skriv ett meddelande..."/>
  <button id='send_message'>SKICKA</button>
  <input id='pm'/>
</p>

<div style="display:none">
  <label>Log: </label></br><div id='output' class='output'></div>
</div>

</form>

</div>

</footer>
<script src="js/jquery.js"></script>
<script src="js/chatRoomClient.js"></script>



</body>
</html>

