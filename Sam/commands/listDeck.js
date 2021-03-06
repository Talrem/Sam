const Discord = require("discord.js");
const fs = require("fs");
const deckFile = require("../json/decks.json");

function isIn(tab, argument) {
  var i;
  for(i = 0 ; i < tab.length;i++){
    if(argument.toLowerCase() == tab[i].toLowerCase()) return 1;
  }
  return 0;
}

module.exports.run = async (bot, message, args) => {
  let roleName = "Dueliste";
  role = message.member.guild.roles.find('name', roleName);
  if (!(message.member.roles.some(role => role.name === roleName))) {
    return message.reply("Vous n'êtes pas un Dueliste, je ne peux pas vous laisser faire ça.");
  }
  let taille = deckFile[-1].number;
  var playerNames = new Array();
  var playerIDs = new Array();
  var nbPlayers = 0;
  for(i = 0; i < taille; i++){
    if(!isIn(playerIDs,deckFile[i].id)){
      playerIDs[nbPlayers] = deckFile[i].id;
      playerNames[nbPlayers] = deckFile[i].u;
      nbPlayers += 1;
    }
  }
  var trouve = 0;
  let idJoueur = 0;
  if(args.length){
    if(args[0].toLowerCase() != "all" && !isIn( playerNames, args[0].toLowerCase() ) ){
      if(args[0].includes("<") && args[0].includes(">") && args[0].includes("@")){
        idJoueur = message.mentions.users.first().id;
      }
    }else{
      for(j = 0; j < nbPlayers; j++){
        if(args[0].toLowerCase() == playerNames[j].toLowerCase()){
          idJoueur = playerIDs[j];
          trouve = 1;
        }
      }
      if(!trouve){
        idJoueur = message.author.id;
      }
    }
  }else{
    idJoueur = message.author.id;
  }
  var i = 0;
  var decksB = new Array();
  var decksVH = new Array();
  var decksH = new Array();
  var decksM = new Array();
  var decksL = new Array();
  var decksVL = new Array();
  var decksU = new Array();
  var jB = 0;
  var jVH = 0;
  var jH = 0;
  var jM = 0;
  var jL = 0;
  var jVL = 0;
  var jU = 0;
  let dir = "";
  for(i = 0; i < taille; i++){
    if(deckFile[i].s =="1"){
      dir = " +`";
    }else{
      dir = " -`";
    }
    if(args[0] && args[0].toLowerCase() == "all"){
      switch(deckFile[i].t){
        case "Ban":
          decksB[jB] = "ID : " + i + " - `" + deckFile[i].n + "` de " + deckFile[i].u;
          if(deckFile[i].s != "0"){
            decksB[jB] += " - `Suspect" + dir;
          }
          jB++;
          break;
        case "VeryHigh":
          decksVH[jVH] = "ID : " + i + " - `" + deckFile[i].n + "` de " + deckFile[i].u;
          if(deckFile[i].s != "0"){
            decksVH[jVH] += " - `Suspect" + dir;
          }
          jVH++;
          break;
        case "High":
          decksH[jH] = "ID : " + i + " - `" + deckFile[i].n + "` de " + deckFile[i].u;
          if(deckFile[i].s != "0"){
            decksH[jH] += " - `Suspect" + dir;
          }
          jH++;
          break;
        case "Mid":
          decksM[jM] = "ID : " + i + " - `" + deckFile[i].n + "` de " + deckFile[i].u;
          if(deckFile[i].s != "0"){
            decksM[jM] += " - `Suspect" + dir;
          }
          jM++;
          break;
        case "Low":
          decksL[jL] = "ID : " + i + " - `" + deckFile[i].n + "` de " + deckFile[i].u;
          if(deckFile[i].s != "0"){
            decksL[jL] += " - `Suspect" + dir;
          }
          jL++;
          break;
        case "VeryLow":
          decksVL[jVL] = "ID : " + i + " - `" + deckFile[i].n + "` de " + deckFile[i].u;
          if(deckFile[i].s != "0"){
            decksVL[jVL] += " - `Suspect" + dir;
          }
          jVL++;
          break;
        case "Untiered":
          decksU[jU] = "ID : " + i + " - `" + deckFile[i].n + "` de " + deckFile[i].u;
          jU++;
          break;
        default: return message.reply("Une erreur est survenue... arrêt de la commande.");
      }
    }else{
      if(deckFile[i].id == idJoueur){
        switch(deckFile[i].t){
          case "Ban":
            decksB[jB] = "ID : " + i + " - `" + deckFile[i].n + "`";
            if(deckFile[i].s != "0"){
              decksB[jB] += " - `Suspect" + dir;
            }
            jB++;
            break;
          case "VeryHigh":
            decksVH[jVH] = "ID : " + i + " - `" + deckFile[i].n + "`";
            if(deckFile[i].s != "0"){
              decksVH[jVH] += " - `Suspect" + dir;
            }
            jVH++;
            break;
          case "High":
            decksH[jH] = "ID : " + i + " - `" + deckFile[i].n + "`";
            if(deckFile[i].s != "0"){
              decksH[jH] += " - `Suspect" + dir;
            }
            jH++;
            break;
          case "Mid":
            decksM[jM] = "ID : " + i + " - `" + deckFile[i].n + "`";
            if(deckFile[i].s != "0"){
              decksM[jM] += " - `Suspect" + dir;
            }
            jM++;
            break;
          case "Low":
            decksL[jL] = "ID : " + i + " - `" + deckFile[i].n + "`";
            if(deckFile[i].s != "0"){
              decksL[jL] += " - `Suspect" + dir;
            }
            jL++;
            break;
          case "VeryLow":
            decksVL[jVL] = "ID : " + i + " - `" + deckFile[i].n + "`";
            if(deckFile[i].s != "0"){
              decksVL[jVL] += " - `Suspect" + dir;
            }
            jVL++;
            break;
          case "Untiered":
            decksU[jU] = "ID : " + i + " - `" + deckFile[i].n + "`";
            jU++;
            break;
          default: return message.reply("Une erreur est survenue... arrêt de la commande.");
        }
      }
    }
  }
  if(!jB && !jVH && !jH && !jM && !jL && !jVL){
    return message.reply("La cible ne possède aucun deck.");
  }
  decksB.sort();
  decksVH.sort();
  decksH.sort();
  decksM.sort();
  decksL.sort();
  decksVL.sort();
  decksU.sort();
  mTSB = "";
  for(i = 0; i < decksB.length;i++){
    mTSB += decksB[i] +"\n";
  }
  mTSVH = "";
  for(i = 0; i < decksVH.length;i++){
    mTSVH += decksVH[i] +"\n";
  }
  mTSH = "";
  for(i = 0; i < decksH.length;i++){
    mTSH += decksH[i] +"\n";
  }
  mTSM = "";
  for(i = 0; i < decksM.length;i++){
    mTSM += decksM[i] +"\n";
  }
  mTSL = "";
  for(i = 0; i < decksL.length;i++){
    mTSL += decksL[i] +"\n";
  }
  mTSVL = "";
  for(i = 0; i < decksVL.length;i++){
    mTSVL += decksVL[i] +"\n";
  }
  mTSU = "";
  for(i = 0; i < decksU.length;i++){
    mTSU += decksU[i] +"\n";
  }
  let nbDecks = decksB.length + decksH.length + decksL.length + decksM.length + decksU.length + decksVH.length + decksVL.length;
  message.author.send("Nombre total de decks de la cible : " + nbDecks);
  if(jB != 0) message.author.send("------------------\n `Ban` au nombre de " + decksB.length + " qui sont :\n" + mTSB);
  if(jVH != 0) message.author.send("------------------\n `Very High` au nombre de " + decksVH.length + " qui sont : \n" + mTSVH);
  if(jH != 0) message.author.send("------------------\n `High` au nombre de " + decksH.length + " qui sont : \n" + mTSH);
  if(jM != 0) message.author.send("------------------\n `Mid` au nombre de " + decksM.length + " qui sont : \n" + mTSM);
  if(jL != 0) message.author.send("------------------\n `Low` au nombre de " + decksL.length + " qui sont : \n" + mTSL);
  if(jVL != 0) message.author.send("------------------\n `Very Low` au nombre de " + decksVL.length + " qui sont : \n" + mTSVL);
  if(jU != 0) message.author.send("------------------\n `Untiered` au nombre de " + decksU.length + " qui sont : \n" + mTSU);
}

module.exports.help = {
  name: "listDeck",
  type: "YuGiOh", //social fun Private ou admin
  usage: "listDeck <utilisateur>",
  desc: "j'envoit la liste des decks de l'utilisateur voulu. Si aucun utilisateur n'est précisé, vous serez la cible de la commande."
}
