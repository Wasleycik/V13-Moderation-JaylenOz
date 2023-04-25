const { MessageEmbed, Client, MessageActionRow, MessageButton } = require('discord.js');
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
    aliases: ["unmute"],
    name: "unmute",
    help: "unmute"
  },

  run: async (client, message, args, embed) => {
    if (!message.member.permissions.has(8n) && !conf.cmuteHammer.some(x => message.member.roles.cache.has(x))) 
    {
    message.react(red)
    message.channel.send({ content: "Yeterli yetkin bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) 
    {
    message.react(red)
    message.channel.send( { content:"Bir üye belirtmelisin!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (!conf.chatMute.some(x => member.roles.cache.has(x))) 
    {
    message.react(red)
    message.channel.send( { content:"Bu üye muteli değil!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));   
    return }
    if (!message.member.permissions.has(8n) && member.roles.highest.position >= message.member.roles.highest.position) 
    {
    message.react(red)
    message.channel.send( { content:"Kendinle aynı yetkide ya da daha yetkili olan birinin susturmasını kaldıramazsın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (!member.manageable) 
    {
    message.react(red)
    message.channel.send( { content:"Bu üyenin susturmasını kaldıramıyorum!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }

    const cezaData = await ceza.findOne({ guildID: message.guild.id, userID: message.author.id });
    const ban = await forceBans.findOne({ guildID: message.guild.id, userID: member.user.id });

const row = new MessageActionRow().addComponents(
new MessageButton().setCustomId("bir").setLabel("UnMute").setStyle("PRIMARY"),
new MessageButton().setCustomId("iki").setLabel("UnvMute").setStyle("PRIMARY"),
new MessageButton().setCustomId("iptal").setLabel("X").setStyle("DANGER")
);

let ozi = new MessageEmbed()
.setDescription(`Merhabalar ${message.member.toString()}, ${member.toString()} Üyseinin Kaldırmak İstediğiniz Chatmute/Voucemute cezasını aşağıdaki butonlardan seçiniz.

\` 1 \` __Kullanıcının Metin Kanallarındaki Mutesini Kaldırırsın.__
\` 2 \` __Kullanıcının Sesli Kanallardaki Mutesini Kaldırırsın.__

`)
.setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }) })

 let msg = await message.channel.send({ embeds: [ozi], components : [row] })

 var filter = (button) => button.user.id === message.author.id;
 let collector = await msg.createMessageComponentCollector({ filter, time: 60000 })

      collector.on("collect", async (button) => {

if(button.customId === "bir") {
  
    member.roles.remove(conf.chatMute);
    const data = await penals.findOne({ userID: member.user.id, guildID: message.guild.id, type: "CHAT-MUTE", active: true });
    if (data) {
      data.active = false;
      await data.save();

    }
    msg.edit({ content: `${green} ${member.toString()} üyesinin **Metin kanallarda** susturması, ${message.author} tarafından kaldırıldı!`, embeds: [], components:[], ephemeral: true }).then((e) => setTimeout(() => { e.delete(); }, 50000));
    if (conf.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından **sesli kanallarda** olan susturmanız kaldırıldı!`}).catch(() => {});
    
  const log = embed
  client.channels.cache.get(conf.cmuteLogChannel).send({ embeds: [embed.setDescription(`
  ${member.toString()} Adlı Kişini Sohbet Kanallarındaki Mutesi Kaldırıldı

  Mutesi açılan Kullanıcı : \`${member.user.tag} (${member.user.id})\`
  Mute Kaldıran Yetkili : \`${message.author.tag} (${message.author.id})\`
  Mute Açılma Saati : <t:${Math.floor(Date.now() / 1000)}:R>
  
  
  `)] });
  
}

if(button.customId === "iki") {
    member.roles.remove(conf.voiceMute);
    if (member.voice.channelId && member.voice.serverMute) member.voice.setMute(false);
    const data = await penals.findOne({ userID: member.user.id, guildID: message.guild.id, type: "VOICE-MUTE", active: true });
    if (data) {
      data.active = false;
      data.removed = true;
      await data.save();
    }
    msg.edit({ content: `${green} ${member.toString()} üyesinin **sesli kanallarda** susturması, ${message.author} tarafından kaldırıldı!`, embeds: [], components:[], ephemeral: true }).then((e) => setTimeout(() => { e.delete(); }, 50000));
    if (conf.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından **sesli kanallarda** olan susturmanız kaldırıldı!`}).catch(() => {});
    
  const log = embed
  client.channels.cache.find(x => x.name == "mute_log").send({ embeds: [embed.setDescription(`
  ${member.toString()} Adlı Kişini Sohbet Kanallarındaki Mutesi Kaldırıldı

  Mutesi açılan Kullanıcı : \`${member.user.tag} (${member.user.id})\`
  Mute Kaldıran Yetkili : \`${message.author.tag} (${message.author.id})\`
  Mute Açılma Saati : <t:${Math.floor(Date.now() / 1000)}:R>
  
  
  `)] });
}


if(button.customId === "iptal") {
  if(msg) msg.delete().catch({})
  button.reply({ content :"Cezalandırma işlemi başarıyla iptal edildi.", ephemeral: true })
}


})
  },
};
