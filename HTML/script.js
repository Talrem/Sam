// Create a request variable and assign a new XMLHttpRequest object to it
var requestGithub = new XMLHttpRequest()

var apiGithub = 'https://api.github.com'
var apiGithubLienGit = '/repos/Talrem/Sam'
var infoDuGit
var leDiv = function(){
    return document.getElementById('source');
}


// Open a new connection, using the GET request on the URL endpoint
requestGithub.open('GET', apiGithub+apiGithubLienGit, false)

//Load des infos du git
requestGithub.onload = function() {
    let data = JSON.parse(this.response)
    infoDuGit = data
}
requestGithub.send()

function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

function GetSortOrder(prop) {
    return function(b, a) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
}

//euh... le blob
var laFonctionDuBouton = function(){
    var apiGithub = 'https://api.github.com'
    var apiGithubLienGit = '/repos/Talrem/Sam/branches/master'

    var resGithub
    var request = new XMLHttpRequest()
    var request2 = new XMLHttpRequest()
    var sha
    request.open('GET', apiGithub+apiGithubLienGit, false)
    request.onload = function() {
        resGithub = JSON.parse(this.response)
        sha = resGithub.commit.sha
        console.log("Sha : " + sha)
    }
    request2.onload = function() {
        resGithub = JSON.parse(this.response)
        console.log(resGithub)
        var string = JSON.stringify(b64DecodeUnicode(resGithub.content))
        document.getElementById("source").innerHTML = retirerLesRetourALaLigne(string)
    }
    request.send()

    var urlDesTrees = resGithub.trees_url
    console.log("Trees : " + urlDesTrees)
    var urlDeLeBlob = urlDesTrees.replace("{/sha}", "/" + sha)
    request2.open('GET', urlDeLeBlob, false)
    request2.send()
}

//Recuperation du tree
var apiGithubLienGitMaster = '/repos/Talrem/Sam/branches/master'
var tree_url = infoDuGit.trees_url

var requestTreeMaster = new XMLHttpRequest()
var jsonTreeMaster
requestTreeMaster.open('GET', apiGithub+apiGithubLienGitMaster, false)
requestTreeMaster.onload = function(){
    let data = JSON.parse(this.response)
    jsonTreeMaster = data
    console.log(data)
}
requestTreeMaster.send()

var shaTree = jsonTreeMaster.commit.sha
var jsonTreeRacine
requestTreeMaster.open('GET', tree_url.replace('{/sha}', '/'+shaTree), false)
requestTreeMaster.onload = function(){
    let data = JSON.parse(this.response)
    jsonTreeRacine = data
    console.log(data)
}
requestTreeMaster.send()

jsonTreeRacine.tree.sort(GetSortOrder("type"))
function truc(){
    for (var i = 0; i < jsonTreeRacine.tree.length; i++) {
        let tree = jsonTreeRacine.tree
        let bouton = document.createElement('button')
        bouton.setAttribute('value', tree[i].type + ' : ' + tree[i].path)
        leDiv.appendChild(bouton)
    }
}
truc()
