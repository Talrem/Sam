const Discord = require("discord.js");
const fs = require("fs");
const deckFile = require("../json/decks.json");

module.exports.run = async (bot, message, args) => {
  let roleName = "Dueliste";
  role = message.member.guild.roles.find('name', roleName);
  if (!(message.member.roles.some(role => role.name === roleName))) {
    return message.reply("Vous n'êtes pas un Dueliste, je ne peux pas vous laisser faire ça.");
  }
  let taille = deckFile[-1].number;
  var i = 0;
  var decksU = new Array();
  var jU = 0;
  let dir = "";
  for(i = 0; i < taille; i++){
    if(deckFile[i].s != "0"){
      switch(deckFile[i].s){
        case "1":
        dir = "`+`";
        break;
        case "-1":
        dir = "`-`";
        break;
      }
      decksU[jU] = "ID : " + i + " - `" + deckFile[i].n + "` de l'utilisateur `" + deckFile[i].u + "` ("+deckFile[i].t + dir +")\n";
      jU++;
    }
  }
  if(!jU){
    return message.reply("Il n'y a aucun deck `Suspect`");
  }
  decksU.sort();
  mU = "";
  for(i = 0; i < decksU.length;i++){
    mU += decksU[i] +"\n";
  }
  if(decksU.length>1){
    message.channel.send("Il y a actuellement " + decksU.length + " decks `Suspects` qui sont : \n" + mU);
  }else{
    message.channel.send("Il n'y a qu'un deck `Suspect` : " + mU);
  }
}

module.exports.help = {
  name: "listSusD",
  type: "YuGiOh", //social fun Private ou admin
  usage: "listSusD",
  desc: "j'envois la liste des decks dont le tier est mis en doute."
}
