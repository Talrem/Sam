//------------------------
//https://discordapp.com/api/oauth2/authorize?client_id=679247199527239680&scope=bot&permissions=8
// API Discord :    https://discordapp.com/api/
// Channel :        /channels/498232800621887500

// Create a request variable and assign a new XMLHttpRequest object to it.
var requestDiscord = new XMLHttpRequest()
var requestGithub = new XMLHttpRequest()

var apiDiscord = 'https://discordapp.com/api/oauth2/authorize?client_id=679247199527239680&permissions=8&scope=bot'
var apiDiscordLienChannel = '/channels/498232800621887500'

var apiGithub = 'https://api.github.com'
var apiGithubLiengit = '/repos/Talrem/Sam'
var apiGithubLienDoc = '/README.md'


// Open a new connection, using the GET request on the URL endpoint
requestDiscord.open('GET', apiDiscord, true)
requestGithub.open('GET', apiGithub+apiGithubLiengit, true)

requestGithub.onload = function() {
    var data = JSON.parse(this.response)
    document.getElementById("source").innerHTML = JSON.stringify(data)
    console.log(data.blobs_url)
}

requestDiscord.onload = function() {
    var data = JSON.parse(this.response)
}

// Send request
requestDiscord.send()
requestGithub.send()

//euh... le blob
var laFonctionDuBouton = function(){
    var apiGithub = 'https://api.github.com'
    var apiGithubLiengit = '/repos/Talrem/Sam'

    var resGithub
    var request = new XMLHttpRequest()
    var request2 = new XMLHttpRequest()
    request.open('GET', apiGithub+apiGithubLiengit, false)
    request.onload = function() {
        resGithub = JSON.parse(this.response)
        console.log(resGithub)
    }
    request2.onload = function() {
        resGithub = JSON.parse(this.response)
        console.log(resGithub)
    }
    request.send()

    var leNomDuBlob = document.getElementById("blob")
    var nomDuBlob = leNomDuBlob.value
    var urlDunBlob = resGithub.blobs_url
    var urlDeLeBlob = urlDunBlob.replace("{/sha}", "/master/"+nomDuBlob)
    urlDeLeBlob = urlDeLeBlob.replace("/git/", "/")
    console.log(urlDunBlob)
    console.log(urlDeLeBlob)
    request2.open('GET', urlDeLeBlob, false)
    request2.send()
}
