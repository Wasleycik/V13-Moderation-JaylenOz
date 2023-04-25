const { MessageEmbed, Client, MessageActionRow, MessageButton } = require('discord.js');
const Discord = require('discord.js');
const { red, green, Mute, revusome, kirmiziok, Cezaa, Revuu } = require("../../configs/emojis.json")
const conf = require("../../configs/sunucuayar.json")
const ceza = require("../../schemas/ceza");
const forceBans = require("../../schemas/forceBans");
const cezapuan = require("../../schemas/cezapuan")
const coin = require("../../schemas/coin");
const muteLimit = new Map();
const jailLimit = new Map();
const moment = require("moment");
moment.locale("tr");
const ms = require("ms");
const client = global.bot;
const banLimit = new Map();
const humanizeDuration = require('humanize-duration');

module.exports = {
  conf: {
    aliases: ["ceza"],
    name: "ceza",
    help: "ceza"
  },

  run: async (client, message, args, embed) => {
    if (!message.member.permissions.has("ADMINISTRATOR") && !conf.cmuteHammer.some(x => message.member.roles.cache.has(x)) && !conf.jailHammer.some(x => message.member.roles.cache.has(x)) && !conf.banHammer.some(x => message.member.roles.cache.has(x))) return message.channel.send({ content:"Yeterli yetkin bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) return message.channel.send({ content:"Bir üye belirtmelisin!"}) 

    const cezaData = await ceza.findOne({ guildID: message.guild.id, userID: message.author.id });
    const ban = await forceBans.findOne({ guildID: message.guild.id, userID: member.user.id });

const cezaroww = new MessageActionRow().addComponents(
new MessageButton().setCustomId("mute").setLabel("Mute").setStyle("PRIMARY"),
new MessageButton().setCustomId("vmute").setLabel("VMute").setStyle("PRIMARY"),
new MessageButton().setCustomId("jail").setLabel("Jail").setStyle("PRIMARY"),
new MessageButton().setCustomId("reklam").setLabel("Reklam").setStyle("PRIMARY"),
new MessageButton().setCustomId("ban").setLabel("Ban").setStyle("PRIMARY"),
);

let cezaembedd = new MessageEmbed()
.setDescription(`

Merhabalar ${message.member.toString()}, aşağıdan cezalandırmak istediğiniz ${member.toString()} adlı kullanıcı için bir cezalandırma Türü seçiniz.
    `)
.setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }) })
.setFooter({ text: `Bu cezalandırma şekillerinden birini başlarındaki numarayı tıklayarak seçmek için 1 dakika süreniz mevcuttur.` })

 let msg = await message.channel.send({ embeds: [cezaembedd], components : [cezaroww] }).then(async (msg) => {

 var filter = (button) => button.user.id === message.author.id;
 let collector = await msg.createMessageComponentCollector({ filter, time: 60000 })

      collector.on("collect", async (button) => {

/////////////------------------- CHAT MUTE BAŞLANGIÇ -------------------/////////////

if(button.customId === "mute") {

    if (!button.member.permissions.has("ADMINISTRATOR") && !conf.cmuteHammer.some(x => button.member.roles.cache.has(x))) return button.reply({ content:"Bu Komutu Sadece Mute Yetkisi Olan Kullanıcılar Kullanabilir!", ephemeral: true }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 

    if (conf.chatMute.some(x => member.roles.cache.has(x))) return message.channel.send({ content:"Bu üye zaten susturulmuş!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));

    if (button.member.roles.highest.position <= member.roles.highest.position) return message.channel.send({ content:"Kendinle aynı yetkide ya da daha yetkili olan birini susturamazsın!", ephemeral: true }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
 
    if (!member.manageable) return message.channel.send({ content:"Bu üyeyi susturamıyorum!", ephemeral: true }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 

    if (conf.chatmutelimit > 0 && muteLimit.has(message.author.id) && muteLimit.get(message.author.id) == conf.chatmutelimit) return message.channel.send({ content:"Saatlik susturma sınırına ulaştın!", ephemeral: true }).then((e) => setTimeout(() => { e.delete(); }, 5000)); 

const muterow = new MessageActionRow().addComponents(
new MessageButton().setCustomId("mute1").setLabel("1").setStyle("PRIMARY"),
new MessageButton().setCustomId("mute2").setLabel("2").setStyle("PRIMARY"),
new MessageButton().setCustomId("mute3").setLabel("3").setStyle("PRIMARY"),
new MessageButton().setCustomId("mute4").setLabel("4").setStyle("PRIMARY"),
new MessageButton().setCustomId("mute5").setLabel("5").setStyle("PRIMARY"),
);
const muterow2 = new MessageActionRow().addComponents(
    new MessageButton().setCustomId("mute6").setLabel("6").setStyle("PRIMARY"),
    new MessageButton().setCustomId("mute7").setLabel("7").setStyle("PRIMARY"),
    new MessageButton().setCustomId("mute8").setLabel("8").setStyle("PRIMARY"),
    new MessageButton().setCustomId("mute9").setLabel("9").setStyle("PRIMARY"),
    new MessageButton().setCustomId("iptal").setLabel("X").setStyle("DANGER"),
    );

let muteembed = new MessageEmbed()
.setDescription(`Merhabalar ${message.member.toString()}, ${member.toString()} Adlı Kullanıcıya Vermek İstediğiniz Mute Cezasını Lütfen Aşadaki Butonlardan Seçiniz.

\` 1 \` Küfür. (1.Saat Mute)
\` 2 \` Kışkırtma/Argo/Hakaret;. (15.Dk Mute)
\` 3 \` Ailevi/Abartı Küfür;. (3.Saat Mute)
\` 4 \` Kavga Etmek veya Çıkarmak; (4.Saat Mute)
\` 5 \` Din/Dil/Irk Ayrımı Yapmak/Hakaret Etmek; (1.Gün Mute)
\` 6 \` Cinsel/Din/Irk/Siyaset V.b Konular Açmak; (6.Saat Mute)
\` 7 \` Flood/Spam/Capslock/Harf Uzatma; (10.Dk Mute)
\` 8 \` Metin Kanallarını Amacı Dışında Kullanmak; (10.Dk Mute)
\` 9 \` Yasaklı(+18, Cinsel, Kan, Vahşet) Fotoğraf Video Paylaşımı; (6.Saat Mute)
\` X \` İptal Eder Ve Menüyü Kapatır

    `)
.setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }) })
.setFooter({ text: `Bu cezalandırma şekillerinden birini başlarındaki numarayı tıklayarak seçmek için 1 dakika süreniz mevcuttur.` })

    button.update({ embeds: [muteembed], components:[muterow, muterow2]});

    if (conf.chatmutelimit > 0) {
      if (!muteLimit.has(message.author.id)) muteLimit.set(message.author.id, 1);
      else muteLimit.set(message.author.id, muteLimit.get(message.author.id) + 1);
      setTimeout(() => {
        if (muteLimit.has(message.author.id)) muteLimit.delete(message.author.id);
      }, 1000 * 60 * 60);
    }

}
if(button.customId === "mute1") {

    member.roles.add(conf.chatMute)

    const reason = `Küfür`
    const time = 1000 * 60 * 60;
    const cıkaralım = time + Date.parse(new Date());
    const şuanki = moment(Date.parse(new Date())).format("LLL");
    const sonraki = moment(cıkaralım).format("LLL");

   const penal = await client.penalize(message.guild.id, member.user.id, "CHAT-MUTE", true, message.author.id, reason, true, Date.now() + time);
   msg.edit({ content: `${member.toString()} Adlı Kullanıcı, ${message.author} Tarafından, \`${reason}\` Sebebiyle Kanallarda Susturuldu! \`[Ceza ID: #${penal.id}]\``, embeds: [], components:[]}).then((e) => setTimeout(() => { e.delete(); }, 50000));

if (conf.dmMessages) member.send({ content: `**${message.guild.name}** Suncusunda, \`${message.author.tag}\` Tarafından, \`${reason}\` Nedeniyle Susturuldunuz!`}).catch(() => {});
    
const log = embed
message.guild.channels.cache.get(conf.cmuteLogChannel).send({ embeds: [embed.setDescription(`
${member.toString()} Adlı Kişiye Chat Mutesi Atıldı

\`•\` Ceza ID : \`#${penal.id}\`
\`•\` Mute Atılan Kullanıcı : \`${member.user.tag} (${member.user.id})\`
\`•\` Mute Atan Yetkili : \`${message.author.tag} (${message.author.id})\`
\`•\` Mute Atılma Saati : <t:${Math.floor(Date.now() / 1000)}:R>
\`•\` Mute Bitiş Saati : <t:${Math.floor(cıkaralım / 1000)}> (<t:${Math.floor(cıkaralım / 1000,)}:R>)
\`•\` Mute Sebebi : \`${!penal.reason ? 'Belirtilmedi!' : penal.reason}\`


`)] });

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { MuteAmount: 1 } }, {upsert: true});
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 20 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`chat mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});

}
if(button.customId === "mute2") {
    member.roles.add(conf.chatMute)

    const reason = `Kışkırtma/Argo/Hakaret`
    const time = 1000 * 60 * 15;
    const cıkaralım = time + Date.parse(new Date());
    const şuanki = moment(Date.parse(new Date())).format("LLL");
    const sonraki = moment(cıkaralım).format("LLL");

   const penal = await client.penalize(message.guild.id, member.user.id, "CHAT-MUTE", true, message.author.id, reason, true, Date.now() + time);
   msg.edit({ content: `${member.toString()} Adlı Kullanıcı, ${message.author} Tarafından, \`${reason}\` Sebebiyle Kanallarda Susturuldu! \`[Ceza ID: #${penal.id}]\``, embeds: [], components:[]}).then((e) => setTimeout(() => { e.delete(); }, 50000));

if (conf.dmMessages) member.send({ content: `**${message.guild.name}** Suncusunda, \`${message.author.tag}\` Tarafından, \`${reason}\` Nedeniyle Susturuldunuz!`}).catch(() => {});
    
const log = embed
message.guild.channels.cache.get(conf.cmuteLogChannel).send({ embeds: [embed.setDescription(`
${member.toString()} Adlı Kişiye Chat Mutesi Atıldı

\`•\` Ceza ID : \`#${penal.id}\`
\`•\` Mute Atılan Kullanıcı : \`${member.user.tag} (${member.user.id})\`
\`•\` Mute Atan Yetkili : \`${message.author.tag} (${message.author.id})\`
\`•\` Mute Atılma Saati : <t:${Math.floor(Date.now() / 1000)}:R>
\`•\` Mute Bitiş Saati : <t:${Math.floor(cıkaralım / 1000)}> (<t:${Math.floor(cıkaralım / 1000,)}:R>)
\`•\` Mute Sebebi : \`${!penal.reason ? 'Belirtilmedi!' : penal.reason}\`


`)] });

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { MuteAmount: 1 } }, {upsert: true});
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 20 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`chat mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});

}
if(button.customId === "mute3") {
    member.roles.add(conf.chatMute)

    const reason = `Ailevi/Abartı Küfür`
    const time = 1000 * 60 * 180;
    const cıkaralım = time + Date.parse(new Date());
    const şuanki = moment(Date.parse(new Date())).format("LLL");
    const sonraki = moment(cıkaralım).format("LLL");

   const penal = await client.penalize(message.guild.id, member.user.id, "CHAT-MUTE", true, message.author.id, reason, true, Date.now() + time);
   msg.edit({ content: `${member.toString()} Adlı Kullanıcı, ${message.author} Tarafından, \`${reason}\` Sebebiyle Kanallarda Susturuldu! \`[Ceza ID: #${penal.id}]\``, embeds: [], components:[]}).then((e) => setTimeout(() => { e.delete(); }, 50000));

if (conf.dmMessages) member.send({ content: `**${message.guild.name}** Suncusunda, \`${message.author.tag}\` Tarafından, \`${reason}\` Nedeniyle Susturuldunuz!`}).catch(() => {});
    
const log = embed
message.guild.channels.cache.get(conf.cmuteLogChannel).send({ embeds: [embed.setDescription(`
${member.toString()} Adlı Kişiye Chat Mutesi Atıldı

\`•\` Ceza ID : \`#${penal.id}\`
\`•\` Mute Atılan Kullanıcı : \`${member.user.tag} (${member.user.id})\`
\`•\` Mute Atan Yetkili : \`${message.author.tag} (${message.author.id})\`
\`•\` Mute Atılma Saati : <t:${Math.floor(Date.now() / 1000)}:R>
\`•\` Mute Bitiş Saati : <t:${Math.floor(cıkaralım / 1000)}> (<t:${Math.floor(cıkaralım / 1000,)}:R>)
\`•\` Mute Sebebi : \`${!penal.reason ? 'Belirtilmedi!' : penal.reason}\`


`)] });

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { MuteAmount: 1 } }, {upsert: true});
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 20 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`chat mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});

}
if(button.customId === "mute4") {
    member.roles.add(conf.chatMute)

    const reason = `Kavga Etmek veya Çıkarmak`
    const time = 1000 * 60 * 240;
    const cıkaralım = time + Date.parse(new Date());
    const şuanki = moment(Date.parse(new Date())).format("LLL");
    const sonraki = moment(cıkaralım).format("LLL");

   const penal = await client.penalize(message.guild.id, member.user.id, "CHAT-MUTE", true, message.author.id, reason, true, Date.now() + time);
   msg.edit({ content: `${member.toString()} Adlı Kullanıcı, ${message.author} Tarafından, \`${reason}\` Sebebiyle Kanallarda Susturuldu! \`[Ceza ID: #${penal.id}]\``, embeds: [], components:[]}).then((e) => setTimeout(() => { e.delete(); }, 50000));

if (conf.dmMessages) member.send({ content: `**${message.guild.name}** Suncusunda, \`${message.author.tag}\` Tarafından, \`${reason}\` Nedeniyle Susturuldunuz!`}).catch(() => {});
    
const log = embed
message.guild.channels.cache.get(conf.cmuteLogChannel).send({ embeds: [embed.setDescription(`
${member.toString()} Adlı Kişiye Chat Mutesi Atıldı

\`•\` Ceza ID : \`#${penal.id}\`
\`•\` Mute Atılan Kullanıcı : \`${member.user.tag} (${member.user.id})\`
\`•\` Mute Atan Yetkili : \`${message.author.tag} (${message.author.id})\`
\`•\` Mute Atılma Saati : <t:${Math.floor(Date.now() / 1000)}:R>
\`•\` Mute Bitiş Saati : <t:${Math.floor(cıkaralım / 1000)}> (<t:${Math.floor(cıkaralım / 1000,)}:R>)
\`•\` Mute Sebebi : \`${!penal.reason ? 'Belirtilmedi!' : penal.reason}\`


`)] });

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { MuteAmount: 1 } }, {upsert: true});
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 20 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`chat mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});

}
if(button.customId === "mute5") {
    member.roles.add(conf.chatMute)

    const reason = `Din/Dil/Irk Ayrımı Yapmak/Hakaret Etmek`
    const time = 1000 * 60 * 60 * 24;
    const cıkaralım = time + Date.parse(new Date());
    const şuanki = moment(Date.parse(new Date())).format("LLL");
    const sonraki = moment(cıkaralım).format("LLL");

   const penal = await client.penalize(message.guild.id, member.user.id, "CHAT-MUTE", true, message.author.id, reason, true, Date.now() + time);
   msg.edit({ content: `${member.toString()} Adlı Kullanıcı, ${message.author} Tarafından, \`${reason}\` Sebebiyle Kanallarda Susturuldu! \`[Ceza ID: #${penal.id}]\``, embeds: [], components:[]}).then((e) => setTimeout(() => { e.delete(); }, 50000));

if (conf.dmMessages) member.send({ content: `**${message.guild.name}** Suncusunda, \`${message.author.tag}\` Tarafından, \`${reason}\` Nedeniyle Susturuldunuz!`}).catch(() => {});
    
const log = embed
message.guild.channels.cache.get(conf.cmuteLogChannel).send({ embeds: [embed.setDescription(`
${member.toString()} Adlı Kişiye Chat Mutesi Atıldı

\`•\` Ceza ID : \`#${penal.id}\`
\`•\` Mute Atılan Kullanıcı : \`${member.user.tag} (${member.user.id})\`
\`•\` Mute Atan Yetkili : \`${message.author.tag} (${message.author.id})\`
\`•\` Mute Atılma Saati : <t:${Math.floor(Date.now() / 1000)}:R>
\`•\` Mute Bitiş Saati : <t:${Math.floor(cıkaralım / 1000)}> (<t:${Math.floor(cıkaralım / 1000,)}:R>)
\`•\` Mute Sebebi : \`${!penal.reason ? 'Belirtilmedi!' : penal.reason}\`


`)] });

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { MuteAmount: 1 } }, {upsert: true});
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 20 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`chat mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});

}
if(button.customId === "mute6") {
    member.roles.add(conf.chatMute)

  const reason = `Cinsel/Din/Irk/Siyaset V.b Konular Açmak`
  const time = 1000 * 60 * 360;
    const cıkaralım = time + Date.parse(new Date());
    const şuanki = moment(Date.parse(new Date())).format("LLL");
    const sonraki = moment(cıkaralım).format("LLL");

   const penal = await client.penalize(message.guild.id, member.user.id, "CHAT-MUTE", true, message.author.id, reason, true, Date.now() + time);
   msg.edit({ content: `${member.toString()} Adlı Kullanıcı, ${message.author} Tarafından, \`${reason}\` Sebebiyle Kanallarda Susturuldu! \`[Ceza ID: #${penal.id}]\``, embeds: [], components:[]}).then((e) => setTimeout(() => { e.delete(); }, 50000));

if (conf.dmMessages) member.send({ content: `**${message.guild.name}** Suncusunda, \`${message.author.tag}\` Tarafından, \`${reason}\` Nedeniyle Susturuldunuz!`}).catch(() => {});
    
const log = embed
message.guild.channels.cache.get(conf.cmuteLogChannel).send({ embeds: [embed.setDescription(`
${member.toString()} Adlı Kişiye Chat Mutesi Atıldı

\`•\` Ceza ID : \`#${penal.id}\`
\`•\` Mute Atılan Kullanıcı : \`${member.user.tag} (${member.user.id})\`
\`•\` Mute Atan Yetkili : \`${message.author.tag} (${message.author.id})\`
\`•\` Mute Atılma Saati : <t:${Math.floor(Date.now() / 1000)}:R>
\`•\` Mute Bitiş Saati : <t:${Math.floor(cıkaralım / 1000)}> (<t:${Math.floor(cıkaralım / 1000,)}:R>)
\`•\` Mute Sebebi : \`${!penal.reason ? 'Belirtilmedi!' : penal.reason}\`


`)] });

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { MuteAmount: 1 } }, {upsert: true});
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 20 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`chat mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});

}

if(button.customId === "mute7") {
    member.roles.add(conf.chatMute)

    const reason = `Flood/Spam/Capslock/Harf Uzatma`
    const time = 1000 * 60 * 10;
    const cıkaralım = time + Date.parse(new Date());
    const şuanki = moment(Date.parse(new Date())).format("LLL");
    const sonraki = moment(cıkaralım).format("LLL");

   const penal = await client.penalize(message.guild.id, member.user.id, "CHAT-MUTE", true, message.author.id, reason, true, Date.now() + time);
   msg.edit({ content: `${member.toString()} Adlı Kullanıcı, ${message.author} Tarafından, \`${reason}\` Sebebiyle Kanallarda Susturuldu! \`[Ceza ID: #${penal.id}]\``, embeds: [], components:[]}).then((e) => setTimeout(() => { e.delete(); }, 50000));

if (conf.dmMessages) member.send({ content: `**${message.guild.name}** Suncusunda, \`${message.author.tag}\` Tarafından, \`${reason}\` Nedeniyle Susturuldunuz!`}).catch(() => {});
    
const log = embed
message.guild.channels.cache.get(conf.cmuteLogChannel).send({ embeds: [embed.setDescription(`
${member.toString()} Adlı Kişiye Chat Mutesi Atıldı

\`•\` Ceza ID : \`#${penal.id}\`
\`•\` Mute Atılan Kullanıcı : \`${member.user.tag} (${member.user.id})\`
\`•\` Mute Atan Yetkili : \`${message.author.tag} (${message.author.id})\`
\`•\` Mute Atılma Saati : <t:${Math.floor(Date.now() / 1000)}:R>
\`•\` Mute Bitiş Saati : <t:${Math.floor(cıkaralım / 1000)}> (<t:${Math.floor(cıkaralım / 1000,)}:R>)
\`•\` Mute Sebebi : \`${!penal.reason ? 'Belirtilmedi!' : penal.reason}\`


`)] });

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { MuteAmount: 1 } }, {upsert: true});
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 20 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`chat mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});

}

if(button.customId === "mute8") {
    member.roles.add(conf.chatMute)

  const reason = `Metin Kanallarını Amacı Dışında Kullanmak`
  const time = 1000 * 60 * 10;
    const cıkaralım = time + Date.parse(new Date());
    const şuanki = moment(Date.parse(new Date())).format("LLL");
    const sonraki = moment(cıkaralım).format("LLL");

   const penal = await client.penalize(message.guild.id, member.user.id, "CHAT-MUTE", true, message.author.id, reason, true, Date.now() + time);
   msg.edit({ content: `${member.toString()} Adlı Kullanıcı, ${message.author} Tarafından, \`${reason}\` Sebebiyle Kanallarda Susturuldu! \`[Ceza ID: #${penal.id}]\``, embeds: [], components:[]}).then((e) => setTimeout(() => { e.delete(); }, 50000));

if (conf.dmMessages) member.send({ content: `**${message.guild.name}** Suncusunda, \`${message.author.tag}\` Tarafından, \`${reason}\` Nedeniyle Susturuldunuz!`}).catch(() => {});
    
const log = embed
message.guild.channels.cache.get(conf.cmuteLogChannel).send({ embeds: [embed.setDescription(`
${member.toString()} Adlı Kişiye Chat Mutesi Atıldı

\`•\` Ceza ID : \`#${penal.id}\`
\`•\` Mute Atılan Kullanıcı : \`${member.user.tag} (${member.user.id})\`
\`•\` Mute Atan Yetkili : \`${message.author.tag} (${message.author.id})\`
\`•\` Mute Atılma Saati : <t:${Math.floor(Date.now() / 1000)}:R>
\`•\` Mute Bitiş Saati : <t:${Math.floor(cıkaralım / 1000)}> (<t:${Math.floor(cıkaralım / 1000,)}:R>)
\`•\` Mute Sebebi : \`${!penal.reason ? 'Belirtilmedi!' : penal.reason}\`


`)] });

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { MuteAmount: 1 } }, {upsert: true});
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 20 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`chat mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});

}

if(button.customId === "mute9") {
  member.roles.add(conf.chatMute)
  
  const reason = `Yasaklı(+18, Cinsel, Kan, Vahşet) Fotoğraf Video Paylaşımı`
  const time = 1000 * 60 * 360;
    const cıkaralım = time + Date.parse(new Date());
    const şuanki = moment(Date.parse(new Date())).format("LLL");
    const sonraki = moment(cıkaralım).format("LLL");

   const penal = await client.penalize(message.guild.id, member.user.id, "CHAT-MUTE", true, message.author.id, reason, true, Date.now() + time);
   msg.edit({ content: `${member.toString()} Adlı Kullanıcı, ${message.author} Tarafından, \`${reason}\` Sebebiyle Kanallarda Susturuldu! \`[Ceza ID: #${penal.id}]\``, embeds: [], components:[]}).then((e) => setTimeout(() => { e.delete(); }, 50000));

if (conf.dmMessages) member.send({ content: `**${message.guild.name}** Suncusunda, \`${message.author.tag}\` Tarafından, \`${reason}\` Nedeniyle Susturuldunuz!`}).catch(() => {});
    
const log = embed
message.guild.channels.cache.get(conf.cmuteLogChannel).send({ embeds: [embed.setDescription(`
${member.toString()} Adlı Kişiye Chat Mutesi Atıldı

\`•\` Ceza ID : \`#${penal.id}\`
\`•\` Mute Atılan Kullanıcı : \`${member.user.tag} (${member.user.id})\`
\`•\` Mute Atan Yetkili : \`${message.author.tag} (${message.author.id})\`
\`•\` Mute Atılma Saati : <t:${Math.floor(Date.now() / 1000)}:R>
\`•\` Mute Bitiş Saati : <t:${Math.floor(cıkaralım / 1000)}> (<t:${Math.floor(cıkaralım / 1000,)}:R>)
\`•\` Mute Sebebi : \`${!penal.reason ? 'Belirtilmedi!' : penal.reason}\`


`)] });

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { MuteAmount: 1 } }, {upsert: true});
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 20 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi \`chat mute cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});

}
/////////////------------------- CHAT MUTE BİTİŞ -------------------/////////////
/////////////------------------- SES MUTE BAŞLANGIÇ -------------------/////////////
if(button.customId === "vmute") {

}
if(button.customId === "vmute1") {

}
if(button.customId === "vmute2") {

}
if(button.customId === "vmute3") {

}
if(button.customId === "vmute4") {

}
if(button.customId === "vmute5") {

}
if(button.customId === "vmute6") {

}
if(button.customId === "vmute7") {

}
if(button.customId === "vmute8") {

}
if(button.customId === "vmute9") {

}

/////////////------------------- SES MUTE BAŞLANGIÇ -------------------/////////////
/////////////------------------- KARANTİNA BAŞLANGIÇ -------------------/////////////

if(button.customId === "jail") {

    if (!message.member.permissions.has(8n) && !conf.jailHammer.some(x => message.member.roles.cache.has(x))) 
    {
    button.reply({ content :"Yeterli yetkin bulunmuyor!", ephemeral: true });
    return }
    if (conf.jailRole.some(x => member.roles.cache.has(x))) { button.reply({ content :"Bu üye zaten jailde!", ephemeral: true });
    return }
    if (conf.jaillimit > 0 && jailLimit.has(message.author.id) && jailLimit.get(message.author.id) == conf.jaillimit) 
    {
    button.reply({ content :"Saatlik jail sınırına ulaştın!", ephemeral: true });
    return }

const jailrow = new MessageActionRow().addComponents(
new MessageButton().setCustomId("jail1").setLabel("1").setStyle("PRIMARY"),
new MessageButton().setCustomId("jail2").setLabel("2").setStyle("PRIMARY"),
new MessageButton().setCustomId("jail3").setLabel("3").setStyle("PRIMARY"),
new MessageButton().setCustomId("jail4").setLabel("4").setStyle("PRIMARY"),
new MessageButton().setCustomId("jail5").setLabel("5").setStyle("PRIMARY"),
);
const jailrow2 = new MessageActionRow().addComponents(
    new MessageButton().setCustomId("jail6").setLabel("6").setStyle("PRIMARY"),
    new MessageButton().setCustomId("jail7").setLabel("7").setStyle("PRIMARY"),
    new MessageButton().setCustomId("jail8").setLabel("8").setStyle("PRIMARY"),
    new MessageButton().setCustomId("jail9").setLabel("9").setStyle("PRIMARY"),
    new MessageButton().setCustomId("iptal").setLabel("X").setStyle("DANGER"),
    );

let jailembed = new MessageEmbed()
.setDescription(`Merhabalar ${message.member.toString()}, ${member.toString()} Adlı Kullanıcıya Vermek İstediğiniz Karantina Cezasını Lütfen Aşadaki Butonlardan Seçiniz.

\` 1 \` Sunucu İçi Bartılı Küfür Hakaret (1 Gün Karantina)
\` 2 \` Kışkırtma/Argo/Hakaret;. (1 Gün Karantina)
\` 3 \` Dini Siyasi Ve Ailevi Küfür (Süresiz Karantina)
\` 4 \` Kavga Etmek veya Çıkarmak; (1 Gün Karantina)
\` 5 \` Din/Dil/Irk Ayrımı Yapmak/Hakaret Etmek; (7 Gün Karantina)
\` 6 \` Cinsel/Din/Irk/Siyaset V.b Konular Açmak; (1 Gün Karantina)
\` 7 \` Flood/Spam/Capslock/Harf Uzatma; (7 Gün Karantina)
\` 8 \` Metin Kanallarını Amacı Dışında Kullanmak; (1 Gün Karantina)
\` 9 \` Yasaklı(+18, Cinsel, Kan, Vahşet) Fotoğraf Video Paylaşımı; (Süresiz Karantina)
\` X \` İptal Eder Ve Menüyü Kapatır

    `)
.setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }) })
.setFooter({ text: `Bu cezalandırma şekillerinden birini başlarındaki numarayı tıklayarak seçmek için 1 dakika süreniz mevcuttur.` })

    button.update({ embeds: [jailembed], components:[jailrow, jailrow2]});

    if (conf.jaillimit > 0) {
      if (!jailLimit.has(message.author.id)) jailLimit.set(message.author.id, 1);
      else jailLimit.set(message.author.id, jailLimit.get(message.author.id) + 1);
      setTimeout(() => {
        if (jailLimit.has(message.author.id)) jailLimit.delete(message.author.id);
      }, 1000 * 60 * 60);
    }

}

if(button.customId === "jail1") {
    member.roles.set(conf.jailRole);       
    const reason = `Sunucu İçi Bartılı Küfür Hakaret`
    const time = 1000*60*60*24;
    const cıkaralım = time + Date.parse(new Date());
    const şuanki = moment(Date.parse(new Date())).format("LLL");
    const sonraki = moment(cıkaralım).format("LLL");
       
const penal = await client.penalize(message.guild.id, member.user.id, "JAIL", true, message.author.id, reason, true, Date.now() + time);
msg.edit({ content: `${member.toString()} Adlı Kullanıcı, ${message.author} Tarafından, \`${reason}\` Sebebiyle Karantinaya Atıldı! \`[Ceza ID: #${penal.id}]\``, embeds: [], components:[], ephemeral: true }).then((e) => setTimeout(() => { e.delete(); }, 50000));

if (conf.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle jaillendiniz.`).catch(() => {});

const karantina1 = embed
.setDescription(`
${member.toString()} Adlı Kişiye Jail Atıldı

\`•\`Karantinaya Atılan Kullanıcı : \`${member.user.tag} (${member.user.id})\`
\`•\` Karantinaya Atan Kişi : ${message.author} (\`${message.author.id}\`)
\`•\` Karantina Süresi: \`1 Gün\`
\`•\` Karantinaya atılma tarihi: <t:${Math.floor(Date.now() / 1000)}:R>
\`•\` Karantina bitiş tarihi: <t:${Math.floor(cıkaralım / 1000)}> (<t:${Math.floor(cıkaralım / 1000,)}:R>)
\`•\` Karantinaya Sebebi: \`${reason}\`
`)
.setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
message.guild.channels.cache.get(conf.jailLogChannel).send({ embeds: [karantina1]});

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 20 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content :`${member} üyesi \`jail cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
}

if(button.customId === "jail2") {
    member.roles.set(conf.jailRole);       
    const reason = `Kışkırtma/Argo/Hakaret`
    const time = 1000*60*60*24;
    const cıkaralım = time + Date.parse(new Date());
    const şuanki = moment(Date.parse(new Date())).format("LLL");
    const sonraki = moment(cıkaralım).format("LLL");
       
const penal = await client.penalize(message.guild.id, member.user.id, "JAIL", true, message.author.id, reason, true, Date.now() + time);
msg.edit({ content: `${member.toString()} Adlı Kullanıcı, ${message.author} Tarafından, \`${reason}\` Sebebiyle Karantinaya Atıldı! \`[Ceza ID: #${penal.id}]\``, embeds: [], components:[], ephemeral: true }).then((e) => setTimeout(() => { e.delete(); }, 50000));

if (conf.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle jaillendiniz.`).catch(() => {});

const karantina2 = embed
.setDescription(`
${member.toString()} Adlı Kişiye Jail Atıldı

\`•\`Karantinaya Atılan Kullanıcı : \`${member.user.tag} (${member.user.id})\`
\`•\` Karantinaya Atan Kişi : ${message.author} (\`${message.author.id}\`)
\`•\` Karantina Süresi: \`1 Gün\`
\`•\` Karantinaya atılma tarihi: <t:${Math.floor(Date.now() / 1000)}:R>
\`•\` Karantina bitiş tarihi: <t:${Math.floor(cıkaralım / 1000)}> (<t:${Math.floor(cıkaralım / 1000,)}:R>)
\`•\` Karantinaya Sebebi: \`${reason}\`
`)
.setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
message.guild.channels.cache.get(conf.jailLogChannel).send({ embeds: [karantina2]});

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 20 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content :`${member} üyesi \`jail cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
}

if(button.customId === "jail3") {
    member.roles.set(conf.jailRole);
                    
    const reason = `Dini Siyasi Ve Ailevi Küfür`
    const şuanki = moment(Date.parse(new Date())).format("LLL");
        
const penal = await client.penalize(message.guild.id, member.user.id, "JAIL", true, message.author.id, reason, true);
msg.edit({ content: `${member.toString()} Adlı Kullanıcı, ${message.author} Tarafından, \`${reason}\` Sebebiyle Karantinaya Atıldı! \`[Ceza ID: #${penal.id}]\``, embeds: [], components:[], ephemeral: true }).then((e) => setTimeout(() => { e.delete(); }, 50000));

if (conf.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle jaillendiniz.`).catch(() => {});

const karantina3 = embed
.setDescription(`
${member.toString()} Adlı Kişiye Jail Atıldı

\`•\`Karantinaya Atılan Kullanıcı : \`${member.user.tag} (${member.user.id})\`
\`•\` Karantinaya Atan Kişi : ${message.author} (\`${message.author.id}\`)
\`•\` Karantina Süresi: \`Süresiz\`
\`•\` Karantinaya atılma tarihi: <t:${Math.floor(Date.now() / 1000)}:R>
\`•\` Karantinaya Sebebi: \`${reason}\`
`)
.setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
message.guild.channels.cache.get(conf.jailLogChannel).send({ embeds: [karantina3]});

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 20 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content :`${member} üyesi \`jail cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});

}
if(button.customId === "jail4") {
    member.roles.set(conf.jailRole);       
    const reason = `Kavga Etmek veya Çıkarmak`
    const time = 1000*60*60*24;
    const cıkaralım = time + Date.parse(new Date());
    const şuanki = moment(Date.parse(new Date())).format("LLL");
    const sonraki = moment(cıkaralım).format("LLL");
       
const penal = await client.penalize(message.guild.id, member.user.id, "JAIL", true, message.author.id, reason, true, Date.now() + time);
msg.edit({ content: `${member.toString()} Adlı Kullanıcı, ${message.author} Tarafından, \`${reason}\` Sebebiyle Karantinaya Atıldı! \`[Ceza ID: #${penal.id}]\``, embeds: [], components:[], ephemeral: true }).then((e) => setTimeout(() => { e.delete(); }, 50000));

if (conf.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle jaillendiniz.`).catch(() => {});

const karantina4 = embed
.setDescription(`
${member.toString()} Adlı Kişiye Jail Atıldı

\`•\`Karantinaya Atılan Kullanıcı : \`${member.user.tag} (${member.user.id})\`
\`•\` Karantinaya Atan Kişi : ${message.author} (\`${message.author.id}\`)
\`•\` Karantina Süresi: \`1 Gün\`
\`•\` Karantinaya atılma tarihi: <t:${Math.floor(Date.now() / 1000)}:R>
\`•\` Karantina bitiş tarihi: <t:${Math.floor(cıkaralım / 1000)}> (<t:${Math.floor(cıkaralım / 1000,)}:R>)
\`•\` Karantinaya Sebebi: \`${reason}\`
`)
.setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
message.guild.channels.cache.get(conf.jailLogChannel).send({ embeds: [karantina4]});

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 20 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content :`${member} üyesi \`jail cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
}
if(button.customId === "jail5") {
    member.roles.set(conf.jailRole);       
    const reason = `Din/Dil/Irk Ayrımı Yapmak/Hakaret Etmek`
    const time = 1000*60*60*24;
    const cıkaralım = time + Date.parse(new Date());
    const şuanki = moment(Date.parse(new Date())).format("LLL");
    const sonraki = moment(cıkaralım).format("LLL");
       
const penal = await client.penalize(message.guild.id, member.user.id, "JAIL", true, message.author.id, reason, true, Date.now() + time);
msg.edit({ content: `${member.toString()} Adlı Kullanıcı, ${message.author} Tarafından, \`${reason}\` Sebebiyle Karantinaya Atıldı! \`[Ceza ID: #${penal.id}]\``, embeds: [], components:[], ephemeral: true }).then((e) => setTimeout(() => { e.delete(); }, 50000));

if (conf.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle jaillendiniz.`).catch(() => {});

const karantina5 = embed
.setDescription(`
${member.toString()} Adlı Kişiye Jail Atıldı

\`•\`Karantinaya Atılan Kullanıcı : \`${member.user.tag} (${member.user.id})\`
\`•\` Karantinaya Atan Kişi : ${message.author} (\`${message.author.id}\`)
\`•\` Karantina Süresi: \`7 Gün\`
\`•\` Karantinaya atılma tarihi: <t:${Math.floor(Date.now() / 1000)}:R>
\`•\` Karantina bitiş tarihi: <t:${Math.floor(cıkaralım / 1000)}> (<t:${Math.floor(cıkaralım / 1000,)}:R>)
\`•\` Karantinaya Sebebi: \`${reason}\`
`)
.setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
message.guild.channels.cache.get(conf.jailLogChannel).send({ embeds: [karantina5]});

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 20 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content :`${member} üyesi \`jail cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
}
/////////////------------------- KARANTİNA BİTİŞ -------------------/////////////
/////////////------------------- REKLAM CEZA BAŞLANGIÇ -------------------/////////////
if(button.customId === "reklam") {

const reklamrow = new MessageActionRow().addComponents(
    new MessageButton().setCustomId("reklam1").setLabel("1").setStyle("PRIMARY"),
    new MessageButton().setCustomId("reklam2").setLabel("2").setStyle("PRIMARY"),
    new MessageButton().setCustomId("reklam3").setLabel("3").setStyle("PRIMARY"),
    new MessageButton().setCustomId("reklam4").setLabel("4").setStyle("PRIMARY"),
    new MessageButton().setCustomId("iptal").setLabel("X").setStyle("DANGER"),
    );

let reklamembed = new MessageEmbed()
.setDescription(`Merhabalar ${message.member.toString()}, ${member.toString()} Adlı Kullanıcıya Vermek İstediğiniz Reklam Cezasını Lütfen Aşadaki Butonlardan Seçiniz.

\` 1 \` Sunucu İçi Sözel Reklam (Süresiz Karantina)
\` 2 \` Sunucu İçi Link Paylaşam / Spam (Süresiz Karantina)
\` 3 \` Sunucu İçi Yetkili Çekmek (Süresiz Karantina)
\` 4 \` Sunucu Dışı Dm Reklam (Süresiz Karantina)
\` X \` İptal Eder Ve Menüyü Kapatır
    `)
.setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }) })
.setFooter({ text: `Bu cezalandırma şekillerinden birini başlarındaki numarayı tıklayarak seçmek için 1 dakika süreniz mevcuttur.` })

    button.update({ embeds: [reklamembed], components:[reklamrow]});

}
/////////////------------------- REKLAM CEZA BİTİŞ -------------------/////////////
/////////////------------------- BAN BAŞLANGIÇ -------------------/////////////
if(button.customId === "ban") {
const banrow = new MessageActionRow().addComponents(
new MessageButton().setCustomId("ban1").setLabel("1").setStyle("PRIMARY"),
new MessageButton().setCustomId("ban2").setLabel("2").setStyle("PRIMARY"),
new MessageButton().setCustomId("ban3").setLabel("3").setStyle("PRIMARY"),
new MessageButton().setCustomId("ban4").setLabel("4").setStyle("PRIMARY"),
new MessageButton().setCustomId("iptal").setLabel("X").setStyle("DANGER"),
);

let banembed = new MessageEmbed()
.setDescription(`Merhabalar ${message.member.toString()}, aşağıdan cezalandırmak istediğiniz ${member.toString()} adlı kullanıcı için bir cezalandırma şekli seçiniz.

\` 1 \` Troll / Ses Programı / Fake Hesap
\` 2 \` Kışkırtma/Argo/Hakaret;. (15.Dk Mute)
\` 3 \` Ailevi/Abartı Küfür;. (3.Saat Mute)
\` 4 \` Kavga Etmek veya Çıkarmak; (4.Saat Mute)
\` 5 \` Din/Dil/Irk Ayrımı Yapmak/Hakaret Etmek; (1.Gün Mute)
\` 6 \` Cinsel/Din/Irk/Siyaset V.b Konular Açmak; (6.Saat Mute)
\` 7 \` Flood/Spam/Capslock/Harf Uzatma; (10.Dk Mute)
\` 8 \` Metin Kanallarını Amacı Dışında Kullanmak; (10.Dk Mute)
\` 9 \` Yasaklı(+18, Cinsel, Kan, Vahşet) Fotoğraf Video Paylaşımı; (6.Saat Mute)
\` X \` İptal Eder Ve Menüyü Kapatır

    `)
.setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }) })
.setFooter({ text: `Bu cezalandırma şekillerinden birini başlarındaki numarayı tıklayarak seçmek için 1 dakika süreniz mevcuttur.` })

    button.update({ embeds: [banembed], components:[banrow]});
}
if(button.customId === "ban1") {
  const ban = await client.fetchBan(message.guild, args[0]);
  const reason = "Troll / Ses Programı / Fake Hesap";
  if (ban) { message.channel.send({ content:"Bu üye zaten banlı!", ephemeral: true })
  return }
  if (conf.banlimit > 0 && banLimit.has(message.author.id) && banLimit.get(message.author.id) == conf.banlimit) return message.channel.send({ content:"Saatlik ban sınırına ulaştın!", ephemeral: true })

  if (conf.dmMessages) member.send({ content:`**${message.guild.name}** sunucusundan, **${message.author.tag}** tarafından, **Reklam** sebebiyle banlandınız!`}).catch(() => {});
  message.guild.members.ban(member.user.id, { reason: `${reason} | Yetkili: ${message.author.tag}` , days:1}).catch(() => {});
  const penal = await client.penalize(message.guild.id, member.user.id, "BAN", true, message.author.id, reason);

  msg.edit({ content :`${member ? member.toString() : member.user.username} üyesi, ${message.author} tarafından, ${reason} nedeniyle banlandı! \`(Ceza ID: #${penal.id})\``, embeds: [], components: []})

message.guild.channels.cache.get(conf.banLogChannel).send({ embeds: [embed.setDescription(`
${member.toString()} Adlı Kişiye Chat Mutesi Atıldı

\`•\` Ceza ID : \`#${penal.id}\`
\`•\` Mute Atılan Kullanıcı : \`${member.user.tag} (${member.user.id})\`
\`•\` Mute Atan Yetkili : \`${message.author.tag} (${message.author.id})\`
\`•\` Mute Atılma Saati : <t:${Math.floor(Date.now() / 1000)}:R>
\`•\` Mute Sebebi : \`${!penal.reason ? 'Belirtilmedi!' : penal.reason}\`
`)] });

await coin.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { coin: -100 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { BanAmount: 1 } }, {upsert: true});
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 100 } }, { upsert: true });

const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content:`${member} üyesi ban cezası alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});


  if (conf.banlimit > 0) {
    if (!banLimit.has(message.author.id)) banLimit.set(message.author.id, 1);
    else banLimit.set(message.author.id, banLimit.get(message.author.id) + 1);
    setTimeout(() => {
      if (banLimit.has(message.author.id)) banLimit.delete(message.author.id);
    }, 1000 * 60 * 60);
  }
}
if(button.customId === "ban2") {

}
if(button.customId === "ban3") {

}
if(button.customId === "ban4") {

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
