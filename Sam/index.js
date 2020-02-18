const botconfig = require('./botconfig.json');
const tokenfile = require('./0-jsons/token.json');
const cheminfile = require('./0-jsons/chemin.json');
const Discord = require('discord.js');
const client = new Discord.Client()
const fs = require("fs");
client.commands = new Discord.Collection();
let purple = botconfig.purple;
let cooldown = new Set();
let cdseconds = 5;
global.servers = {};

function alea(n){
  return Math.floor(Math.random() * n);
}
//lecture des commandes du client et log
fs.readdir(cheminfile.commands,(err, files) => {
  console.log("Début du chargement des commandes.\n")
	if(err) console.log(err);

	let jsfile = files.filter(f => f.split(".").pop() === "js")
	if(jsfile.length <= 0){
		console.log("La commande n'a pas été trouvée\n");
		return;
	}
  let nbCommandes = 0;
  let nbCommandesPriv = 0;
	jsfile.forEach((f, i) =>{
		let props = require(`./commands/${f}`);
		console.log("Chargement de : " + props.help.name + "     type : " + props.help.type  + "\nusage : " + props.help.usage + "\n");
    nbCommandes++;
    if(props.help.type == "Private") nbCommandesPriv++;
		client.commands.set(props.help.name, props);
	});
  console.log(nbCommandes + " commandes ont été chargées. Dont " + nbCommandesPriv + " commandes privées.\n");
});

//le client en lui meme
client.on('ready', async () => {
	console.log(`${client.user.username} est en ligne!\n`)
  console.log(`${client.user.username} est connectée sur ${client.guilds.size} serveurs!\n`);
  client.user.setActivity("+>help", {type: "WATCHING"})
	.then(() => console.log('Activité mise en place avec succès\n'))
	.catch(console.error)
});

//acceuil de nouveaux membres sur un serveur
client.on('guildMemberAdd', function(member){
	var role = member.guild.roles.find('name', 'Connecté');
  if(role) member.addRole(role)
	member.createDM().then(function(channel){
		return channel.send('Bienvenue sur le serveur ' + member.displayName + ".\nJe suis le client créé par David et Nathan, n'hésitez à leur poser des questions ^^\nPour avoir accès à la liste des commandes, envoyez +>help")
	}).catch(console.error)
});

client.on("message", async message =>{
	if(message.author.client) return;
  if(message.guild === null) return;
  let mes = message.content.toUpperCase();
	let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
	if(!prefixes[message.guild.id]){
		prefixes[message.guild.id] = {
			prefixes: botconfig.prefix
		};
	}
  let prefix = prefixes[message.guild.id].prefixes;

  //test des préfixes
	if(!message.content.startsWith(prefix) && !message.content.toLowerCase().startsWith("sam. ")) return;
  console.log(Date() + " " + message.author.username + "#" + message.author.discriminator + ' a utilisé la commande "' + message + '"\n');
	if(cooldown.has(message.author.id)){
		message.delete();
		return message.reply("Veuillez attendre 5 secondes entre les commandes.").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
	}
	if(!message.member.hasPermission("ADMINISTRATOR")){
		cooldown.add(message.author.id);
	}
  let messageArray = message.content.split(" ");
  let cmd;
	let args;
  let commandfile;
  if(message.content.toLowerCase().startsWith("sam. ")){
    cmd = messageArray[1];
    args = messageArray.slice(2);
    commandfile = client.commands.get(cmd);
  }else{
    cmd = messageArray[0];
    args = messageArray.slice(1);
    commandfile = client.commands.get(cmd.slice(prefix.length));
  }
	if(commandfile){
    commandfile.run(client,message,args);
  }else{
    message.reply("Désolé, la commande n'a pas été trouvée, peut-être devriez vous consulter l'aide avec `" + prefix + "help`");
  }

	setTimeout(() => {
		cooldown.delete(message.author.id)
	}, cdseconds * 1000)

});

//lien du client au code
client.login(tokenfile.token);
