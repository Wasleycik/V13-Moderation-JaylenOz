const { Modal, TextInputComponent, showModal } = require('discord-modals')
const {Intents, SelectMenuComponent, Client, Collection, MessageActionRow, MessageButton, MessageAttachment, MessageEmbed, Permissions, Constants, ApplicationCommandPermissionsManager } = require("discord.js");
const client = global.bot = new Client({
  fetchAllMembers: true,
  intents: [ 32767 ],
  partials: ["CHANNEL"]
});
const Discord = require('discord.js');
const conf = require("./src/configs/sunucuayar.json");
const fs = require("fs");
const db = require("quick.db");
const ms = require("ms");
const moment = require("moment");
moment.locale("tr");
client.commands = new Collection();
client.aliases = new Collection();
client.invites = new Collection();
client.cooldown = new Map();

 ///--------------------KOMUT ÇALIŞTIRMA--------------------------------///

fs.readdir('./src/commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`❗️ Toplamda ${files.length} Adet Komut Yüklenecek.`);
  files.forEach(f => {
    fs.readdir("./src/commands/" + f, (err2, files2) => {
      files2.forEach(file => {
        let props = require(`./src/commands/${f}/` + file);
        console.log(`✔️ [KOMUT] ${props.conf.name} İsimli Komut Yüklendi!`);
        client.commands.set(props.conf.name, props);
        props.conf.aliases.forEach(alias => {
          client.aliases.set(alias, props.conf.name);
        });
      })
    })
  });
});
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/handlers/functionHandler")(client);

client
  .login(conf.token)  // Glitchde Çalışması İçin process.env.token
  .then(() => console.log(`✔️ [BOT] Bot Başarıyla ${client.user.tag} Olarak Giriş Yaptı!`))
  .catch(() => console.log("❗️ [HATA] Bot Bağlanamadı!"));

  process.on("uncaughtException", err => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Beklenmedik yakalanamayan hata: ", errorMsg);
    process.exit(1);
  });
  
  process.on("unhandledRejection", err => {
    console.error("Promise Hatası: ", err);
  });


 ///-------------------- SLASH KOMUT ÇALIŞTIRICI--------------------------------///

  const { REST } = require('@discordjs/rest');
  const { Routes } = require('discord-api-types/v10');  
  client.slashcommands = new Collection();
  var slashcommands = [];
  
  fs.readdirSync('./src/Slashcommands/').forEach(async category => {
		const commands = fs.readdirSync(`./src/Slashcommands/${category}/`).filter(cmd => cmd.endsWith('.js'));
		for (const command of commands) {
		const Command = require(`./src/Slashcommands/${category}/${command}`);
    client.slashcommands.set(Command.data.name, Command);
    slashcommands.push(Command.data.toJSON());
		}
	});
  
	const rest = new REST({ version: '9' }).setToken(conf.token); /// Slash Komutları nGlitchde Çalışması İçin Process.env.token
  (async () => {
	try {
		console.log('❗️ [SLASH] Slash Komutlar yükleniyor.');
		await rest.put(
			Routes.applicationGuildCommands(conf.BotClientID, conf.guildID),
			{ body: slashcommands },
		).then(() => {
			console.log('✔️ [SLASH] Slash Komutlar yüklendi.');
		});
	}
	catch (e) {
		console.error(e);
	}
})();


//////
const express = require("express");
const app = express();

app.listen(process.env.PORT);
app.get("/", (req, res) => {
return res.sendStatus(200)
})
/////

client.on('interactionCreate', (interaction) => {
  if (interaction.isContextMenu() || interaction.isCommand()) {
    const command = client.slashcommands.get(interaction.commandName);
    if (interaction.user.bot) return;
    if (!interaction.inGuild() && interaction.isCommand()) return interaction.editReply({ content: 'Komutları kullanmak için bir sunucuda olmanız gerekir.' });
    if (!command) return interaction.reply({ content: 'Bu komut kullanılamıyor.', ephemeral: true }) && client.slashcommands.delete(interaction.commandName);
    try {
      command.execute(interaction, client);
    }
    catch (e) {
      console.log(e);
      return interaction.reply({ content: `An error has occurred.\n\n**\`${e.message}\`**` });
    }
  }
});


/////////////------------------- BAZI HATALARI GİDEREN KISIM-------------------/////////////

client.setMaxListeners(0)

/////////////------------------- HATA LOG BAŞLANGIÇ -------------------/////////////

let hatalog = client.channels.cache.find(x => x.name.includes(conf.hatalog));
process.on("unhandledRejection", error => { 
if(hatalog) hatalog.send(`<@${conf.botowner}> Kodumda hata çıktı : \`\`\`${error}\`\`\``) 
   console.log(error)
})
process.on("uncaughtException", error => { 
if(hatalog) hatalog.send(`<@${conf.botowner}> Kodumda hata çıktı : \`\`\`${error}\`\`\``) 
  console.log(error)
})
process.on("uncaughtExceptionMonitor", error => { 
if(hatalog) hatalog.send(`<@${conf.botowner}> Kodumda hata çıktı : \`\`\`${error}\`\`\``) 
  console.log(error)
})

/////////////------------------- HATA LOG BİTİŞ -------------------/////////////

/////////////------------------- DM LOG BAŞLANGIÇ -------------------/////////////

  client.on('messageCreate', (message) => {
let dmog = client.channels.cache.find(x => x.name.includes(conf.dmlog));
if (message.author.bot) return;

  if (message.channel.type === "DM") {
    let embedLogs = new Discord.MessageEmbed()
.setAuthor("DM-LOG Sistemi")
.setDescription(`
${message.author} İsimli Kullanıcı Bir Mesaj Gönderdi.

\`•\` **Mesaj Gönderen :** ${message.author} - (\`${message.author.tag}\`)
\`•\` **Gönderildiği Tarih :** <t:${Math.floor(Date.now() / 1000)}>

\`•\` **Kullanıcının Mesajı :** ${message.content || "Yok"}

`)
      .setColor("RED")
      .setTimestamp();

    if (message.attachments.size > 0)
      embedLogs.addField(
        `\`•\` **Mesajdaki Ek Dosyalar : **`,
        `${message.attachments.first()?.url}`,
        false
      );
    return dmog.send({
      embeds: [embedLogs],
    });
  }
  });

///////////////////////////////////////////////////////////


