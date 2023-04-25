const Discord = require('discord.js');
const { Modal, TextInputComponent, Intents, SelectMenuComponent, Client, Collection, MessageActionRow, MessageButton, MessageAttachment, MessageEmbed, Permissions, Constants, ApplicationCommandPermissionsManager } = require("discord.js");
const conf = require("../../configs/sunucuayar.json");
const Emojis = require("../../configs/emojis.json");
const afk = require("../../schemas/afk");
const isimler = require("../../schemas/names");
const register = require("../../schemas/registerStats");
const voiceUserParent = require("../../schemas/voiceUserParent");
const messageUser = require("../../schemas/messageUser");
const voiceUser = require("../../schemas/voiceUser"); 
const toplams = require("../../schemas/toplams");
const inviterSchema = require("../../schemas/inviter");
const inviteMemberSchema = require("../../schemas/inviteMember");
let { Stats, Seens } = require('../../schemas/Tracking');
const messageUserChannel = require("../../schemas/messageUserChannel");
const voiceUserChannel = require("../../schemas/voiceUserChannel");
const nameData = require("../../schemas/names");
const { DiscordTogether } = require('discord-together');
const axios = require('axios');
const table = require("table");
const fetch = require('node-fetch');
let cpuStat = require("cpu-stat");
const client = global.bot;
const moment = require("moment");
require("moment-duration-format");
moment.locale("tr");
const Canvas = require("canvas");
const os = require('os');
const { registerFont } = require("canvas");
registerFont('./MarlinGeo-Black.otf', { family: 'Marlin Geo Black' })
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  conf: {
    aliases: ['reload', 'reboot', 'restart',"bot"],
    name: "reload",
    owner: true,
  },

  run: async (client, message, args, params ,percent) => {

    if(message.author.id !== conf.botowner) return message.reply({ content: `Bu Komutu Sadece Bot Sahibi Kullanabilir.`}).then((e) => setTimeout(() => { e.delete(); }, 10000));

let up = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]"); 

    let cpuLol;
    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
const ynbbembed = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
.setDescription(`
> Bot ${up} Süredir Aktif

> Toplam sunucu: ${client.guilds.cache.size}

> Toplam kullanıcı: ${client.users.cache.size}

> Toplam kanal: ${client.channels.cache.size}

> CPU Kullanımı %${percent.toFixed(8)}

> Bot geliştiricisi: <@${conf.botowner}> \n> Sahip: <@${conf.botowner}>

> Discord.js sürümü: **v${Discord.version}** \n> Node.js sürümü: **${process.version}**

> Bellek Kullanımı ${(process.memoryUsage().heapUsed / 32768 / 32768).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB

`); 
  const ynbbrow = new MessageActionRow()
  .addComponents(
  new MessageButton()
  .setCustomId("ynbb")
  .setLabel("♻️ Yeniden Başlat")
  .setStyle("SECONDARY"),

  );

   let msg = message.channel.send({embeds: [ynbbembed], components: [ynbbrow]}).then(async (msg) => {
     
		 const filter = i => i.user.id == message.member.id 
  const collector = msg.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 120000 })

      collector.on("collect", async interaction => {

if (interaction.customId === "ynbb") {
const ynbbembed2 = new Discord.MessageEmbed()
.setColor("#2f3136")
.setDescription(`
__**Bot**__ yeniden başlatılıyor!

`);
  const ynbbrow2 = new MessageActionRow()
  .addComponents(
  new MessageButton()
  .setCustomId("ynbb")
  .setLabel("♻️ Bot Yeniden Başlatılıyor")
  .setStyle("SECONDARY")
  .setDisabled(true),

  );

await interaction.update({embeds: [ynbbembed],components: [ynbbrow2],ephemeral: true })
      process.exit(0)

}

  },
)})})}}