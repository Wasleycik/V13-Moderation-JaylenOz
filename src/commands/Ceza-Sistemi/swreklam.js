const { MessageEmbed, Client, MessageActionRow, MessageButton } = require('discord.js');
const { red, green, Mute, revusome, kirmiziok, Cezaa, Revuu } = require("../../configs/emojis.json")
const conf = require("../../configs/sunucuayar.json")
const ceza = require("../../schemas/ceza");
const forceBans = require("../../schemas/forceBans");
const cezapuan = require("../../schemas/cezapuan")
const coin = require("../../schemas/coin");
const jailLimit = new Map();
const moment = require("moment");
moment.locale("tr");
const ms = require("ms");
const client = global.bot;
const banLimit = new Map();
const humanizeDuration = require('humanize-duration');

module.exports = {
  conf: {
    aliases: ["rklm"],
    name: "reklam",
    help: "reklam"
  },

  run: async (client, message, args, embed) => {
    if (!message.member.permissions.has(8n) && !conf.jailHammer.some(x => message.member.roles.cache.has(x))) 
    {
    message.react("❌")
    message.channel.send({ content :"Yeterli yetkin bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) { message.channel.send({ content :"Bir üye belirtmelisin!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    message.react("❌") 
    return }
    if (conf.jailRole.some(x => member.roles.cache.has(x))) { message.channel.send({ content :"Bu üye zaten jailde!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    message.react("❌") 
    return }
    if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(embed.setDescription("Kendinle aynı yetkide ya da daha yetkili olan birini jailleyemezsin!"));
    if (!member.manageable) return message.channel.send({ content :"Bu üyeyi jailleyemiyorum!"});
    if (conf.jaillimit > 0 && jailLimit.has(message.author.id) && jailLimit.get(message.author.id) == conf.jaillimit) 
    {
    message.react("❌")
    message.channel.send({ content :"Saatlik jail sınırına ulaştın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }

    const cezaData = await ceza.findOne({ guildID: message.guild.id, userID: message.author.id });
    const ban = await forceBans.findOne({ guildID: message.guild.id, userID: member.user.id });

const row = new MessageActionRow().addComponents(
new MessageButton().setCustomId("bir").setLabel("1").setStyle("PRIMARY"),
new MessageButton().setCustomId("iki").setLabel("2").setStyle("PRIMARY"),
new MessageButton().setCustomId("üç").setLabel("3").setStyle("PRIMARY"),
new MessageButton().setCustomId("dört").setLabel("4").setStyle("PRIMARY"),
new MessageButton().setCustomId("iptal").setLabel("X").setStyle("DANGER"),
);

let ozi = new MessageEmbed()
.setDescription(`Merhabalar ${message.member.toString()}, aşağıdan cezalandırmak istediğiniz ${member.toString()} adlı kullanıcı için bir cezalandırma şekli seçiniz.

\` 1 \` Sunucu İçi Reklam. (Sınırsız Jail)
\` 2 \` Sunucu Dışı Reklam. (Sınırsız Jail)
\` 3 \` Dm Reklam. (Sınırsız Jail)
\` 4 \` Sözel Reklam. (Sınırsız jail)

    `)
.setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }) })
.setFooter({ text: `Bu cezalandırma şekillerinden birini başlarındaki numarayı tıklayarak seçmek için 1 dakika süreniz mevcuttur.` })

 let msg = await message.channel.send({ embeds: [ozi], components : [row] })

 var filter = (button) => button.user.id === message.author.id;
 let collector = await msg.createMessageComponentCollector({ filter, time: 60000 })

      collector.on("collect", async (button) => {

if(button.customId === "bir") {

    member.roles.set(conf.jailRole);
            
            
    const reason = `Sunucu İçi Reklam`
    const şuanki = moment(Date.parse(new Date())).format("LLL");
        
const penal = await client.penalize(message.guild.id, member.user.id, "JAIL", true, message.author.id ,reason, true);
msg.edit({ content: `${member.toString()} Adlı Kullanıcı, ${message.author} Tarafından, \`${reason}\` Sebebiyle Karantinaya Atıldı! \`[Ceza ID: #${penal.id}]\``, embeds: [], components:[], ephemeral: true }).then((e) => setTimeout(() => { e.delete(); }, 50000));



const bir = embed
.setDescription(`
${member.toString()} Adlı Kişiye Jail Atıldı

\`•\ Jail Atan Kişi : ${message.author} (\`${message.author.id}\`)
\`•\ Ceza Süresi: \`Sınırsız\`
\`•\ Ceza atılma tarihi: \`${şuanki}\`
\`•\ Ceza Sebebi: \`${reason}\`
`)
.setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
message.guild.channels.cache.get(conf.jailLogChannel).send({ embeds: [bir]});

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 20 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content :`${member} üyesi \`jail cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});
}

if(button.customId === "iki") {
    member.roles.set(conf.jailRole);
            
            
    const reason = `Sunucu Dışı Reklam`
    const şuanki = moment(Date.parse(new Date())).format("LLL");

        
const penal = await client.penalize(message.guild.id, member.user.id, "JAIL", true, message.author.id, reason, true);
msg.edit({ content: `${member.toString()} Adlı Kullanıcı, ${message.author} Tarafından, \`${reason}\` Sebebiyle Karantinaya Atıldı! \`[Ceza ID: #${penal.id}]\``, embeds: [], components:[], ephemeral: true }).then((e) => setTimeout(() => { e.delete(); }, 50000));



const iki = embed
.setDescription(`
${member.toString()} Adlı Kişiye Jail Atıldı

\`•\ Jail Atan Kişi : ${message.author} (\`${message.author.id}\`)
\`•\ Ceza Süresi: \`Sınırsız\`
\`•\ Ceza atılma tarihi: \`${şuanki}\`
\`•\ Ceza Sebebi: \`${reason}\`
`)
.setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
message.guild.channels.cache.get(conf.jailLogChannel).send({ embeds: [iki]});

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 20 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content :`${member} üyesi \`jail cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});

}

if(button.customId === "üç") {
    member.roles.set(conf.jailRole);
            
            
    const reason = `DM reklam`
    const şuanki = moment(Date.parse(new Date())).format("LLL");
        
const penal = await client.penalize(message.guild.id, member.user.id, "JAIL", true, message.author.id, reason, true);
msg.edit({ content: `${member.toString()} Adlı Kullanıcı, ${message.author} Tarafından, \`${reason}\` Sebebiyle Karantinaya Atıldı! \`[Ceza ID: #${penal.id}]\``, embeds: [], components:[], ephemeral: true }).then((e) => setTimeout(() => { e.delete(); }, 50000));



const üç = embed
.setDescription(`
${member.toString()} Adlı Kişiye Jail Atıldı

\`•\ Jail Atan Kişi : ${message.author} (\`${message.author.id}\`)
\`•\ Ceza Süresi: \`Sınırsız\`
\`•\ Ceza atılma tarihi: \`${şuanki}\`
\`•\ Ceza Sebebi: \`${reason}\`
`)
.setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
message.guild.channels.cache.get(conf.jailLogChannel).send({ embeds: [üç]});

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 20 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content :`${member} üyesi \`jail cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});

}

if(button.customId === "dört") {
    member.roles.set(conf.jailRole);
            
            
    const reason = `Sözel Reklam`
    const şuanki = moment(Date.parse(new Date())).format("LLL");
        
const penal = await client.penalize(message.guild.id, member.user.id, "JAIL", true, message.author.id, reason, true);
msg.edit({ content: `${member.toString()} Adlı Kullanıcı, ${message.author} Tarafından, \`${reason}\` Sebebiyle Karantinaya Atıldı! \`[Ceza ID: #${penal.id}]\``, embeds: [], components:[], ephemeral: true }).then((e) => setTimeout(() => { e.delete(); }, 50000));


const dört = embed
.setDescription(`
${member.toString()} Adlı Kişiye Jail Atıldı

\`•\ Jail Atan Kişi : ${message.author} (\`${message.author.id}\`)
\`•\ Ceza Süresi: \`Sınırsız\`
\`•\ Ceza atılma tarihi: \`${şuanki}\`
\`•\ Ceza Sebebi: \`${reason}\`
`)
.setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
message.guild.channels.cache.get(conf.jailLogChannel).send({ embeds: [dört]});

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 20 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content :`${member} üyesi \`jail cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});

}

if(button.customId === "iptal") {
  if(msg) msg.delete().catch({})
  button.reply({ content :"Cezalandırma işlemi başarıyla iptal edildi.", ephemeral: true })
}


})
  },
};
