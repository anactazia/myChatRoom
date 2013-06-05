myChatRoom
==========

<p>myChatRoom är ett chatrum där du och dina vänner kan koppla upp sig och chatta med varandra. 

<hr />

<h3>Vad behövs för att installera myChatRoom?</h2>

<p>Innan du installerar myChatRoom så behöver du ha en server och node.js installerat på din dator.</p>

Har du ingen server så rekommenderar jag att du installerar <b>Wampserver</b> som du hittar om du trycker på länken nedan:</p>
<a href="http://www.wampserver.com/en/">WampServer</a>

<p><b>node.js</b> behövs då myChatRoom använder sig av websockets. node.js hittar du om du trycker på länken nedan: </p>
<a href="http://www.nodejs.org/">node.js</a>
<p>Se dokumentation för nodejs hur du går tillväga för att installera websocket-modulen i nodejs.</p>

<hr />

<h3>Installation</h2>

<p>För att ladda hem myChatRoom så kan du trycka på länken nedan: </p>
<a href="http://www.github.com/anactazia/myChatRoom/archive/master.zip">Ladda ner myChatRoom</a>

<p>När du hämtat myChatRoom så läggs en komprimerad mapp på din dator (oftast i mappen hämtade filer) 
som heter <b>myChatRoom-master</b>.</p>

<p>Extrahera mappen på din server </p>


<p><b>EXEMPEL:</b><br />
Om du har WampServer så extraherar du mappen under c:/wamp/www/</p>


<p>Gå till den extraherade mappen och byt namn på den så att den bara heter <b>myChatRoom</b>.</p>

<hr />

<p>OBS! För att myChatRoom skall fungera så behövs det göras ett par ändringar i filerna:<br />
(Öppna filen i en texteditor för att ändra i den ex. NotePad eller <a href="http://www.jedit.org/">jEdit</a></p>

<p>I filen <b>chatRoomServer.js</b> som ligger under mappen <b>myChatRoom/js</b> finner du följande på rad 5:<p>
<code>var WebSocketServer = require('/home/saxon/teachers/com/mosstud/www/node/node_modules/websocket').server;</code>
<p>Ändra denna rad så att den stämmer överens med var du har installerat nodejs och mappen med websocket.</p>

<p><b>EXEMPEL:</b><br />
var WebSocketServer = require('c:Program/nodejs/node_modules/websocket').server;</p>

<p>I filen <b>chatRoomClient.js</b> som ligger under mappen <b>myChatRoom/js</b> finner du följande på rad 28, 126 samt 230:<p>
<code>'ws://nodejs1.student.bth.se:8004/'</code><br />
<p>Här ändrar du till adressen till din server.</p>

<hr />

<p>Starta sedan servern genom att med en kommandotolk, tex Putty, ställa dig i katalogen myChatRoom/js.</p> 

<p>När du nu står i katalogen js så skriver du: <br />
<code>node chatRoomServer<br /></code>
Därefter trycker du på enter.</p>

Du har nu startat din server och rutan med servern måste hållas öppen så länge som du vill att myChatRoom skall fungera, 
då servern stängs av om du stänger rutan.</p>

<p>Efter detta öppnar du din browser (myChatRoom är utvecklat i <b>Firefox</b>, så den browsern är att föredra. 
<a href="http://www.mozilla.org/en-US/">Firefox kan hämtas här</a>)</p>

<p>I adressfältet skriver du in sökvägen till filen chatRoom.php som ligger under mappen myChatRoom <br />

<p><b>EXEMPEL:</b><br />
<code>www.student.bth.se/javascript/myChatRoom/chatRoom.php</code></p>

<p>Du har nu startat chatten.</p>

<p><i<b>Mycket nöje med myChatRoom!</b></p>
</div>
