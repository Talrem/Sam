//------------------------
//https://discordapp.com/api/oauth2/authorize?client_id=679247199527239680&scope=bot&permissions=8
// API Discord :    https://discordapp.com/api/
// Channel :        /channels/498232800621887500

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()
var lienApi = 'https://discordapp.com/api/oauth2/token?client_id=679247199527239680&scope=bot&permissions=8'
var lienChannel = '/channels/498232800621887500'

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', lienApi+lienChannel, true)

request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  console.log(data)
  //data.forEach(truc => {
//      console.log(truc)
  //})
}

// Send request
request.send()
