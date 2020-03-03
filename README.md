<DOCTYPE html>
  <head>
  </head>
  <body>
    <h1>Sam Le Bot</h1>
    var myVar = setInterval(myTimer, 1000);
    function myTimer() {
      var d = new Date();
      document.getElementById("demo").innerHTML = d.toLocaleTimeString();
    } 
    <h2>Un projet de David MERLAT et Nathan MANSON</h2>
    <p>Projet Universitaire de L3. Les API de Discord (https://discordapp.com/developers/docs/intro) et Github (https://developer.github.com/v3/) sont utilisées. Le dossier Sam contient le code du bot, ainsi que des explications sur son fonctionnement et son utilisation.</p>
  </body>
</html>
