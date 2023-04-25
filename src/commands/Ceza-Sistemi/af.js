const { MessageEmbed, Client, MessageActionRow, MessageButton } = require('discord.js');
const Discord = require('discord.js');
const { red, green, Mute, revusome, kirmiziok, Cezaa, Revuu } = require("../../configs/emojis.json")
const conf = require("../../configs/sunucuayar.json")
const ceza = require("../../schemas/ceza");
const forceBans = require("../../schemas/forceBans");
const cezapuan = require("../../schemas/cezapuan")
const coin = require("../../schemas/coin");
const penals = require("../../schemas/penals");
const moment = require("moment");
moment.locale("tr");
const ms = require("ms");
const client = global.bot;
const banLimit = new Map();
const humanizeDuration = require('humanize-duration');

module.exports = {
  conf: {
    aliases: ["af","unmute","unjail"],
    name: "af",
    help: "af"
  },

  run: async (client, message, args, embed) => {
  if (!message.member.permissions.has("ADMINISTRATOR") && !conf.cmuteHammer.some(x => message.member.roles.cache.has(x)) && !conf.jailHammer.some(x => message.member.roles.cache.has(x)) && !conf.banHammer.some(x => message.member.roles.cache.has(x))) return message.reply({ content:"Yeterli yetkin bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) message.channel.send({ content:"Bir üye belirtmelisin!"}) 
    
    const cezaData = await ceza.findOne({ guildID: message.guild.id, userID: message.author.id });

const cezaroww = new MessageActionRow().addComponents(
new MessageButton().setCustomId("mute").setLabel("Mute").setStyle("PRIMARY"),
new MessageButton().setCustomId("vmute").setLabel("VMute").setStyle("PRIMARY"),
new MessageButton().setCustomId("jail").setLabel("Jail").setStyle("PRIMARY"),
new MessageButton().setCustomId("reklam").setLabel("Reklam").setStyle("PRIMARY").setDisabled(true),
new MessageButton().setCustomId("ban").setLabel("Ban").setStyle("PRIMARY").setDisabled(true),
);

let cezaembedd = new MessageEmbed()
.setDescription(`

Merhabalar ${message.member.toString()}, ${member.toString()} Adlı Kullanıcı İçin Kaldırmak İstediğin Cezayı Seç
    `)
.setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }) })

 let msg = await message.channel.send({ embeds: [cezaembedd], components : [cezaroww] }).then(async (msg) => {

 var filter = (button) => button.user.id === message.author.id;
 let collector = await msg.createMessageComponentCollector({ filter, time: 60000 })

      collector.on("collect", async (button) => {

/////////////------------------- CHAT MUTE BAŞLANGIÇ -------------------/////////////

if(button.customId === "mute") {

if (!button.member.permissions.has("ADMINISTRATOR") && !button.member.roles.cache.has(conf.cmuteHammer)) return button.reply({ content:"Bu Komutu Sadece Mute Yetkisi Olan Kullanıcılar Kullanabilir!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 

if (!conf.chatMute.some(x => member.roles.cache.has(x))) return msg.edit({ content:"Bu üye Muteli Deil!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 

if (!member.manageable) return msg.edit({ content:"Bu Üyenin Mutesini Kaldıramıyorum!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 

if (button.member.roles.highest.position <= member.roles.highest.position) return button.reply({ content:"Kendinle Aynı Veya Üst Yetkililerin Mutesini Kaldıramazsın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 

    member.roles.remove(conf.chatMute);
    const data = await penals.findOne({ userID: member.user.id, guildID: message.guild.id, type: "CHAT-MUTE", active: true });
    if (data) {
      data.active = false;
      await data.save();
    }

let muteembed = new MessageEmbed()
.setDescription(`
${member.toString()} Adlı Kullanıcının **Chat Mute** Cezası Başarıyla ${message.member.toString()} Tarafından Kaldırıldı


    `)
.setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }) })

    button.update({ embeds: [muteembed], components:[]}).then((e) => setTimeout(() => { e.delete(); }, 50000))

  client.channels.cache.get(conf.cmuteLogChannel).send({ embeds: [embed.setDescription(`
  ${member.toString()} Adlı Kişini Sohbet Kanallarındaki Mutesi Kaldırıldı

  Mutesi açılan Kullanıcı : \`${member.user.tag} (${member.user.id})\`
  Mute Kaldıran Yetkili : \`${message.author.tag} (${message.author.id})\`
  Mute Açılma Saati : <t:${Math.floor(Date.now() / 1000)}:R>
  
  
  `)] });
}

/////////////------------------- CHAT MUTE BİTİŞ -------------------/////////////
/////////////------------------- SES MUTE BAŞLANGIÇ -------------------/////////////
if(button.customId === "vmute") {

if (!message.member.permissions.has("ADMINISTRATOR") && !conf.cmuteHammer.some(x => message.member.roles.cache.has(x))) return message.reply({ content:"Bu Komutu Sadece Mute Yetkisi Olan Kullanıcılar Kullanabilir!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 

if (!conf.voiceMute.some(x => member.roles.cache.has(x))) return message.channel.send({ content:"Bu üye Muteli Deil!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 

if (!member.manageable) return message.channel.send({ content:"Bu Üyenin Mutesini Kaldıramıyorum!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 

if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send({ content:"Kendinle Aynı Veya Üst Yetkililerin Mutesini Kaldıramazsın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 

    member.roles.remove(conf.voiceMute);
    if (member.voice.channelId && member.voice.serverMute) member.voice.setMute(false);
    const data = await penals.findOne({ userID: member.user.id, guildID: message.guild.id, type: "VOICE-MUTE", active: true });
    if (data) {
      data.active = false;
      data.removed = true;
      await data.save();
    }
let vmuteembed = new MessageEmbed()
.setDescription(`
${member.toString()} Adlı Kullanıcının **Voice Mute** Cezası Başarıyla ${message.member.toString()} Tarafından Kaldırıldı


    `)
.setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }) })

    button.update({ embeds: [vmuteembed], components:[]}).then((e) => setTimeout(() => { e.delete(); }, 50000))

  client.channels.cache.get(conf.cmuteLogChannel).send({ embeds: [embed.setDescription(`
  ${member.toString()} Adlı Kişini Ses Kanallarındaki Mutesi Kaldırıldı

  Mutesi açılan Kullanıcı : \`${member.user.tag} (${member.user.id})\`
  Mute Kaldıran Yetkili : \`${message.author.tag} (${message.author.id})\`
  Mute Açılma Saati : <t:${Math.floor(Date.now() / 1000)}:R>
  
  
  `)] });

}


/////////////------------------- SES MUTE BİTİŞ -------------------/////////////
/////////////------------------- KARANTİNA BAŞLANGIÇ -------------------/////////////

if(button.customId === "jail") {

if (!message.member.permissions.has("ADMINISTRATOR") && !conf.jailHammer.some(x => message.member.roles.cache.has(x))) return message.reply({ content:"Bu Komutu Sadece Jail Yetkisi Olan Kullanıcılar Kullanabilir!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 

if (!conf.jailRole.some(x => member.roles.cache.has(x))) return message.channel.send({ content:"Bu üye jailde değil!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
 
if (!member.manageable) return message.channel.send({ content:"Bu üyeyi jailden çıkaramıyorum!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 

if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send({ content:"Kendinle Aynı Veya Üst Yetkililerin Mutesini Kaldıramazsın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 

 member.roles.cache.has(conf.boosterRolu) ? member.roles.set([conf.boosterRolu, conf.unregRoles[0]]) : member.roles.set(conf.unregRoles)
    const data = await penals.findOne({ userID: member.user.id, guildID: message.guild.id, $or: [{ type: "JAIL" }, { type: "TEMP-JAIL" }], active: true });
    if (data) {
      data.active = false;
      await data.save();
    }
let jailembed = new MessageEmbed()
.setDescription(`
${member.toString()} Adlı Kullanıcının **Karantina** Cezası Başarıyla ${message.member.toString()} Tarafından Kaldırıldı


    `)
.setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }) })

    msg.edit({ embeds: [jailembed], components:[]}).then((e) => setTimeout(() => { e.delete(); }, 50000))

  client.channels.cache.get(conf.jailLogChannel).send({ embeds: [embed.setDescription(`
  ${member.toString()} Adlı Kişinin Karantina Cezası Kaldırıldı

  Cezası açılan Kullanıcı : \`${member.user.tag} (${member.user.id})\`
  Cezayı Kaldıran Yetkili : \`${message.author.tag} (${message.author.id})\`
  Ceza Açılma Saati : <t:${Math.floor(Date.now() / 1000)}:R>
  
  
  `)] });

}
/////////////------------------- KARANTİNA BİTİŞ -------------------/////////////
/////////////------------------- REKLAM CEZA BAŞLANGIÇ -------------------/////////////
if(button.customId === "reklam") {

}
/////////////------------------- REKLAM CEZA BİTİŞ -------------------/////////////
/////////////------------------- BAN BAŞLANGIÇ -------------------/////////////
if(button.customId === "ban") {

if (!message.member.permissions.has("BAN_MEMBERS") &&!message.member.permissions.has("ADMINISTRATOR") && !conf.banHammer.some(x => message.member.roles.cache.has(x))) return message.reply({ content:"Bu Komutu Sadece Ban Yetkisi Olan Kullanıcılar Kullanabilir!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 

  const ban = await client.fetchBan(message.guild, args[0]);
    if (!ban) return message.channel.send({ content:"Bu üye banlı değil!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));


    message.guild.members.unban(args[0], `${message.author.username} tarafından kaldırıldı!`).catch(() => {});
    const data = await penals.findOne({ userID: ban.user.id, guildID: message.guild.id, type: "BAN", active: true });
    if (data) {
      data.active = false;
      await data.save();
    }

let banembed = new MessageEmbed()
.setDescription(`
${member.toString()} Adlı Kullanıcının **Ban** Cezası Başarıyla ${message.member.toString()} Tarafından Kaldırıldı


    `)
.setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }) })

    msg.edit({ embeds: [banembed], components:[]}).then((e) => setTimeout(() => { e.delete(); }, 50000))

  client.channels.cache.get(conf.banLogChannel).send({ embeds: [embed.setDescription(`
  ${member.toString()} Adlı Kişinin Ban Cezası Kaldırıldı

  Banı açılan Kullanıcı : \`${member.user.tag} (${member.user.id})\`
  Banı Kaldıran Yetkili : \`${message.author.tag} (${message.author.id})\`
  Ban Açılma Saati : <t:${Math.floor(Date.now() / 1000)}:R>
  `)] });

}
/////////////------------------- BAN BİTİŞ -------------------/////////////
if(button.customId === "iptal") {
msg.delete()
}
})
            collector.on('end', () => {
  const timeoutroww = new MessageActionRow()
  .addComponents(
new MessageButton().setCustomId("mute").setLabel("Mute").setStyle("PRIMARY").setDisabled(true),
new MessageButton().setCustomId("vmute").setLabel("VMute").setStyle("PRIMARY").setDisabled(true),
new MessageButton().setCustomId("jail").setLabel("Jail").setStyle("PRIMARY").setDisabled(true),
new MessageButton().setCustomId("reklam").setLabel("Reklam").setStyle("PRIMARY").setDisabled(true),
new MessageButton().setCustomId("ban").setLabel("Ban").setStyle("PRIMARY").setDisabled(true),
);
 msg.edit({components: [timeoutroww]})
            });
})}}  
