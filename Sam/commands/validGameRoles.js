const Discord = require("discord.js");
const roleFile = require("../json/roleNames.json");

module.exports.run = async (bot, message, args) => {
  var lesRoles = new Array();
  let msgRoles = "";
  let taille = roleFile[-1].number;
  let j = 0;
  for(i = 0; i < taille; i++){
    lesRoles[j] = roleFile[i].abrev;
    msgRoles += " `"+lesRoles[j]+"` pour "+roleFile[i].nom + "\n";
    j++;
  }
  return message.channel.send("Les rôles valides sont :\n" + msgRoles);
}

module.exports.help = {
  name: "validGameRoles",
  type: "social",
  usage: "validGameRoles",
  desc: "j'énonce la liste des rôles supportés par la commande `gameRole`."
}
