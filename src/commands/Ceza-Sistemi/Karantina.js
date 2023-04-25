const { MessageEmbed, Client, MessageActionRow, MessageButton, MessageSelectMenu  } = require('discord.js');
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
    aliases: ["jail2"],
    name: "karantina2",
    help: "karantina2"
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

      const karantinamenü = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('kısayollar')
					.setPlaceholder('Ceza-i İşlemleri Görmek için tıkla!')
					.addOptions([
						{
							label: 'Tehdit/Şantaj/Dolandırıcılık.',
              description: 'Sınırsız Karantinaya Atarsınız.',
							value: 'karantina1',
						},
						{
							label: 'Kişisel Olayları Sunucuya Yansıtmak.',
              description: '7 Günlük Karantinaya Atarsınız.',
							value: 'karantina2',
						},						
            {
							label: 'Oda/Sunucu Trollemek.',
              description: 'Sınırsız Karantinaya Atarsınız.',
							value: 'karantina3',
						},
            {
							label: 'Kişilerin İç/Dış Görünüşlerini Yargılamak/Dalga Geçme.',
              description: 'Sınırsız Karantinaya Atarsınız.',
							value: 'karantina4',
						},
            {
							label: 'Yasaklı(+18, Cinsel, Kan, Vahşet) Fotoğraf Video Paylaşımı.',
              description: 'Lütfen Ynalış Kullanım Yapmayınız!',
							value: 'karantina5',
						},
            {
							label: 'Din/Dil/Irk Ayrımı Yapmak/Hakaret Etmek.',
              description: '7 Günlük Karantinaya Atarsınız.',
							value: 'karantina6',
						},
            {
							label: 'İnfo Paylaşmak.',
              description: 'Sınırsız Karantinaya Atarsınız.',
							value: 'karantina7',
						},
            {
							label: 'Menüyü Kapat',
              description: 'Cezalandırma İşlemini İptal Edersiniz',
							value: 'iptal',
						},
            
					]),
			);

 let msg = await message.channel.send({ content:`${member.toString()} Kullanıcısına Vermek İstediğiniz Cezayı Lütfen Aşağıdaki Menüden Seçiniz.`, components : [karantinamenü] }).then(async (msg) => {

 var filter = (button) => button.user.id === message.author.id;
 let collector = await msg.createMessageComponentCollector({ filter, time: 60000 })

      collector.on("collect", async (button) => {

if(button.values[0] === "karantina1") {

    member.roles.set(conf.jailRole);
            
            
    const reason = `Tehdit/Şantaj/Dolandırıcılık`
    const şuanki = moment(Date.parse(new Date())).format("LLL");
        
const penal = await client.penalize(message.guild.id, member.user.id, "JAIL", true, message.author.id ,reason, true);
msg.edit({ content: `${member.toString()} Adlı Kullanıcı, ${message.author} Tarafından, \`${reason}\` Sebebiyle Karantinaya Atıldı! \`[Ceza ID: #${penal.id}]\``, embeds: [], components:[], ephemeral: true }).then((e) => setTimeout(() => { e.delete(); }, 50000));

if (conf.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle jaillendiniz.`).catch(() => {});


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

if(button.values[0] === "karantina2") {
    member.roles.set(conf.jailRole);
            
            
    const reason = `Kişisel Olayları Sunucuya Yansıtmak`

    const time = 1000*60*60*24*7 ;
    const cıkaralım = time + Date.parse(new Date());
    const şuanki = moment(Date.parse(new Date())).format("LLL");
    const sonraki = moment(cıkaralım).format("LLL");

        
const penal = await client.penalize(message.guild.id, member.user.id, "JAIL", true, message.author.id, reason, true, Date.now() + time);
msg.edit({ content: `${member.toString()} Adlı Kullanıcı, ${message.author} Tarafından, \`${reason}\` Sebebiyle Karantinaya Atıldı! \`[Ceza ID: #${penal.id}]\``, embeds: [], components:[], ephemeral: true }).then((e) => setTimeout(() => { e.delete(); }, 50000));

if (conf.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle jaillendiniz.`).catch(() => {});


const iki = embed
.setDescription(`
${member.toString()} Adlı Kişiye Jail Atıldı

\`•\ Jail Atan Kişi : ${message.author} (\`${message.author.id}\`)
\`•\ Ceza Süresi: \`7 Gün\`
\`•\ Ceza atılma tarihi: \`${şuanki}\`
\`•\ Ceza bitiş tarihi: \`${sonraki}\`
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

if(button.values[0] === "karantina3") {
    member.roles.set(conf.jailRole);
            
            
    const reason = `Oda/Sunucu Trollemek`
    const şuanki = moment(Date.parse(new Date())).format("LLL");
        
const penal = await client.penalize(message.guild.id, member.user.id, "JAIL", true, message.author.id, reason, true);
msg.edit({ content: `${member.toString()} Adlı Kullanıcı, ${message.author} Tarafından, \`${reason}\` Sebebiyle Karantinaya Atıldı! \`[Ceza ID: #${penal.id}]\``, embeds: [], components:[], ephemeral: true }).then((e) => setTimeout(() => { e.delete(); }, 50000));

if (conf.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle jaillendiniz.`).catch(() => {});


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

if(button.values[0] === "karantina4") {
    member.roles.set(conf.jailRole);
            
            
    const reason = `Kişilerin İç/Dış Görünüşlerini Yargılamak/Dalga Geçme`
    const şuanki = moment(Date.parse(new Date())).format("LLL");
        
const penal = await client.penalize(message.guild.id, member.user.id, "JAIL", true, message.author.id, reason, true);
msg.edit({ content: `${member.toString()} Adlı Kullanıcı, ${message.author} Tarafından, \`${reason}\` Sebebiyle Karantinaya Atıldı! \`[Ceza ID: #${penal.id}]\``, embeds: [], components:[], ephemeral: true }).then((e) => setTimeout(() => { e.delete(); }, 50000));

if (conf.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle jaillendiniz.`).catch(() => {});


const dört = embed
.setDescription(`
${member.toString()} Adlı Kişiye Jail Atıldı

\`•\ Jail Atan Kişi : ${message.author} (\`${message.author.id}\`)
\`•\ Ceza Süresi: \`7 Gün\`
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

if(button.values[0] === "karantina5") {
    member.roles.set(conf.jailRole);
            
            
    const reason = `Yasaklı(+18, Cinsel, Kan, Vahşet) Fotoğraf Video Paylaşımı`

    const time = 1000*60*60*24*7 ;
    const cıkaralım = time + Date.parse(new Date());
    const şuanki = moment(Date.parse(new Date())).format("LLL");
    const sonraki = moment(cıkaralım).format("LLL");

        
const penal = await client.penalize(message.guild.id, member.user.id, "JAIL", true, message.author.id, reason, true, Date.now() + time);
msg.edit({ content: `${member.toString()} Adlı Kullanıcı, ${message.author} Tarafından, \`${reason}\` Sebebiyle Karantinaya Atıldı! \`[Ceza ID: #${penal.id}]\``, embeds: [], components:[], ephemeral: true }).then((e) => setTimeout(() => { e.delete(); }, 50000));

if (conf.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle jaillendiniz.`).catch(() => {});


const bes = embed
.setDescription(`
${member.toString()} Adlı Kişiye Jail Atıldı

\`•\ Jail Atan Kişi : ${message.author} (\`${message.author.id}\`)
\`•\ Ceza Süresi: \`7 Gün\`
\`•\ Ceza atılma tarihi: \`${şuanki}\`
\`•\ Ceza bitiş tarihi: \`${sonraki}\`
\`•\ Ceza Sebebi: \`${reason}\`
`)
.setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
message.guild.channels.cache.get(conf.jailLogChannel).send({ embeds: [bes]});

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 20 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content :`${member} üyesi \`jail cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});


}

if(button.values[0] === "karantina6") {
    member.roles.set(conf.jailRole);
            
            
    const reason = `Din/Dil/Irk Ayrımı Yapmak/Hakaret Etmek`

    const time = 1000*60*60*24*7 ;
    const cıkaralım = time + Date.parse(new Date());
    const şuanki = moment(Date.parse(new Date())).format("LLL");
    const sonraki = moment(cıkaralım).format("LLL");

        
const penal = await client.penalize(message.guild.id, member.user.id, "JAIL", true, message.author.id, reason, true, Date.now() + time);
msg.edit({ content: `${member.toString()} Adlı Kullanıcı, ${message.author} Tarafından, \`${reason}\` Sebebiyle Karantinaya Atıldı! \`[Ceza ID: #${penal.id}]\``, embeds: [], components:[], ephemeral: true }).then((e) => setTimeout(() => { e.delete(); }, 50000));

if (conf.dmMessages) member.send(`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle jaillendiniz.`).catch(() => {});


const altı = embed
.setDescription(`
${member.toString()} Adlı Kişiye Jail Atıldı

\`•\ Jail Atan Kişi : ${message.author} (\`${message.author.id}\`)
\`•\ Ceza Süresi: \`7 Gün\`
\`•\ Ceza atılma tarihi: \`${şuanki}\`
\`•\ Ceza bitiş tarihi: \`${sonraki}\`
\`•\ Ceza Sebebi: \`${reason}\`
`)
.setFooter({ text:`${moment(Date.now()).format("LLL")}    (Ceza ID: #${penal.id})` })
message.guild.channels.cache.get(conf.jailLogChannel).send({ embeds: [altı]});

await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { JailAmount: 1 } }, {upsert: true});
await coin.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { coin: -20 } }, { upsert: true });
await cezapuan.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: 20 } }, { upsert: true });
const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });
if(conf.cezapuanlog) message.guild.channels.cache.get(conf.cezapuanlog).send({ content :`${member} üyesi \`jail cezası\` alarak toplam \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanına\` ulaştı!`});

}


if(button.values[0] === "iptal") {
  if(msg) msg.delete().catch({})
  button.reply({ content :"Cezalandırma işlemi başarıyla iptal edildi.", ephemeral: true })
}


})
  })},
};
