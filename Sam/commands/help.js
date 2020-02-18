const Discord = require("discord.js")
const fs = require("fs");
const idfile = require('../0-jsons/monID.json');
const cheminfile = require('../0-jsons/chemin.json');

module.exports.run = async (bot, message, args) => {
  message.delete().catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  if(!args[0]){ //Si aucune commande n'est précisée.
    message.reply("La liste de mes commandes est en train de vous être envoyée par message privé. Pour plus d'informations utilisez `help <nomDeCommande>`").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
    fs.readdir(cheminfile.commands,(err, files) => {
      if(err) console.log(err);
      let jsfile = files.filter(f => f.split(".").pop() === "js")
      if(jsfile.length <= 0){
        console.log("La commande n'a pas été trouvée");
        return;
      }
      var nameFunlist = "";
      var nameSoclist = "";
      var nameAdmlist = "";
      var namePrivlist = "";
      var nameYugilist = "";
      let nbFun = 0;
      let nbSoc = 0;
      let nbYugi = 0;
      let nbAdm = 0;
      let nbPriv = 0;
      jsfile.forEach((f, i) => {
        let props = require(cheminfile.commands + `${f}`);
        if(props.help.type == "fun"){
          nameFunlist += "`" + props.help.name + "` ";
          nbFun += 1;
        }
        if(props.help.type == "social"){
          nameSoclist += "`" + props.help.name + "` ";
          nbSoc += 1;
        }
        if(props.help.type == "admin"){
          nameAdmlist += "`" + props.help.name + "` ";
          nbAdm += 1;
        }
        if(message.author.id == idfile.id && props.help.type == "Private"){
          namePrivlist += "`" + props.help.name + "` ";
          nbPriv += 1;
        }
        if(props.help.type == "YuGiOh"){
          nameYugilist += "`" + props.help.name + "` ";
          nbYugi += 1;
        }
      });
      if(message.author.id != idfile.id){
        let roleName = "Dueliste";
        role = message.member.guild.roles.find('name', roleName);
        if (!(message.member.roles.some(role => role.name === roleName))) {
          let helpEmbedNonDuelist = new Discord.RichEmbed()
          .setTitle("Mes Commandes")
          .setColor("#00ff00")
          .addField(`Commandes Funs (${nbFun})`, nameFunlist)
          .addField(`Commandes Sociales (${nbSoc})`, nameSoclist)
          .addField(`Commandes d'Administration (${nbAdm})`, nameAdmlist);
          return message.author.send(helpEmbedNonDuelist);
        }
        let helpEmbed = new Discord.RichEmbed()
        .setTitle("Mes Commandes")
        .setColor("#00ff00")
        .addField(`Commandes Funs (${nbFun})`, nameFunlist)
        .addField(`Commandes Sociales (${nbSoc})`, nameSoclist)
        .addField(`Commandes d'Administration (${nbAdm})`, nameAdmlist)
        .addField(`Commandes liées à YuGiOh (${nbYugi})`, nameYugilist);
        return message.author.send(helpEmbed);
      }else{
        let helpEmbedMe = new Discord.RichEmbed()
        .setTitle("Mes Commandes")
        .setColor("#00ff00")
        .addField(`Commandes Funs (${nbFun})`, nameFunlist)
        .addField(`Commandes Sociales (${nbSoc})`, nameSoclist)
        .addField(`Commandes d'Administration (${nbAdm})`, nameAdmlist)
        .addField(`Commandes liées à YuGiOh (${nbYugi})`, nameYugilist)
        .addField(`Commandes de Talrem uniquement (${nbPriv})`, namePrivlist);
        return message.author.send(helpEmbedMe);
      }
    });
  }else{
    message.reply("Les informations sur la commande voulue sont en train de vous être envoyées par message privé. Pour obtenir la liste des commandes disponibles, utilisez `help`").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
    fs.readdir(cheminfile.commands,(err, files) => {
    	if(err) console.log(err);
    	let jsfile = files.filter(f => f.split(".").pop() === "js")
    	if(jsfile.length <= 0){
    		console.log("La commande n'a pas été trouvée");
    		return;
    	}
      var cmdName = "";
      var cmdUse = "";
      var cmdDesc = "";
      var trouvee = 0;
      jsfile.forEach((f, i) => {
        let props = require(cheminfile.commands + `${f}`);
        if(props.help.name == args[0]){
          trouvee = 1;
          cmdName = props.help.name;
          cmdUse = props.help.usage;
          cmdDesc = props.help.desc;
        }
      });
      if(trouvee){
        message.author.send("La commande `" + cmdName +"` s'utilise avec `" + cmdUse + "` et fait que " + cmdDesc);
      }else{
        message.author.send("La commande spécifiée n'a pas été trouvée. Essayez `help` pour obtenir la liste des commandes disponibles.")
      }
    });
  }
}

module.exports.help = {
  name: "help",
  type: "social",
  usage: "help <commande>",
  desc: "je donne des précisions sur la commande cible ou donne la liste de toutes les commandes si aucune commande n'est précisée."
}
