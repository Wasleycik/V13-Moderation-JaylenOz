const moment = require("moment");
require("moment-duration-format");
const conf = require("../../configs/sunucuayar.json");
const Discord = require('discord.js');
const voiceUserParent = require("../../schemas/voiceUserParent");
const messageUser = require("../../schemas/messageUser");
const voiceUser = require("../../schemas/voiceUser");
const cezapuan = require("../../schemas/cezapuan");
const inviteMemberSchema = require("../../schemas/inviteMember");
const coin = require("../../schemas/coin");
const taggeds = require("../../schemas/taggeds");
const regstats = require("../../schemas/registerStats");
const yetkis = require("../../schemas/yetkis");
const ceza = require("../../schemas/ceza");
const toplams = require("../../schemas/toplams");
const inviterSchema = require("../../schemas/inviter");
const {  rewards, miniicon, mesaj2, staff, galp ,Muhabbet ,star , fill, empty, fillStart, emptyEnd, fillEnd, red } = require("../../configs/emojis.json");
const { TeamMember, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  conf: {
    aliases: ["ystat"],
    name: "yetkim",
    help: "yetkim"
  },

  run: async (client, message, args, embed) => {

if(message.channel.id !== conf.ytcommands && message.channel.id !== conf.botcommandschannel && !message.member.permissions.has("ADMINISTRATOR")) return message.reply({content: `Bu Komutu Sadece <#${conf.botcommandschannel}> Ve <#${conf.ytcommands}> Kanalında Kullanabilirsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    if(!message.member.permissions.has("ADMINISTRATOR") && conf.staffs.some(rol => message.member.roles.cache.has(rol))) return message.react(red)
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if(!message.member.permissions.has("ADMINISTRATOR") && conf.staffs.some(rol => member.roles.cache.has(rol))) return message.react(red)

    const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.user.id });
    const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.user.id });
    const messageWeekly = messageData ? messageData.weeklyStat : 0;
    const messageDaily = messageData ? messageData.dailyStat : 0;
    const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [saat], m [dakika]");
    const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [saat], m [dakika]");

    const coinData = await coin.findOne({ guildID: message.guild.id, userID: member.user.id });
    const cezapuanData = await cezapuan.findOne({ guildID: message.guild.id, userID: member.user.id });

 
    const taggedData = await taggeds.findOne({ guildID: message.guild.id, userID: member.user.id });
    const toplamData = await toplams.findOne({ guildID: message.guild.id, userID: member.user.id });
    const yetkiData = await yetkis.findOne({ guildID: message.guild.id, userID: member.user.id });
    const cezaData = await ceza.findOne({ guildID: message.guild.id, userID: member.user.id });

 
    const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
    const total = inviterData ? inviterData.total : 0;
    const invMember = await inviteMemberSchema.find({ guildID: message.guild.id, inviter: member.user.id });
    const regular = inviterData ? inviterData.regular : 0;
    const bonus = inviterData ? inviterData.bonus : 0;
    const leave = inviterData ? inviterData.leave : 0;
    const fake = inviterData ? inviterData.fake : 0;
    const daily = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
    let tagged;
    if (conf.tag && conf.tag.length > 0) tagged = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && m.user.username.includes(conf.tag)).size : 0;
    else tagged = 0;
    const weekly = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;


    const category = async (parentsArray) => {
    const data = await voiceUserParent.find({ guildID: message.guild.id, userID: member.id });
    const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
    let voiceStat = 0;
    for (var i = 0; i <= voiceUserParentData.length; i++) {
      voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
    }
    return moment.duration(voiceStat).format("H [saat], m [dakika]");
    };

    const coinStatus = message.member.hasRole(conf.staffs, false);

    var kayıtdetay = new MessageButton()
    .setLabel("Kayıt Detay")
    .setCustomId("kayıt_detaylari")
    .setStyle("SECONDARY")

    var davetdetay = new MessageButton()
    .setLabel("Davet Detay")
    .setCustomId("davet_detaylari")
    .setStyle("SECONDARY")

    var mesajdetay = new MessageButton()
    .setLabel("Mesaj Detay")
    .setCustomId("mesaj_detaylari")
    .setStyle("SECONDARY")

    var sesdetay = new MessageButton()
    .setLabel("Ses Detay")
    .setCustomId("ses_detaylari")
    .setStyle("SECONDARY")

    var PuanDetaylari = new MessageButton()
    .setLabel("Puan Detayları")
    .setCustomId("puan_detaylari")
    .setStyle("SUCCESS")
    .setEmoji("907014785386840075")

    var GenelPuanDetaylari = new MessageButton()
    .setLabel("Genel Puan Detayları")
    .setCustomId("genel_puan_detaylari")
    .setStyle("PRIMARY")
    .setEmoji("943107807312482304")

    var Iptal = new MessageButton()
    .setLabel("İptal")
    .setCustomId("iptal_button")
    .setStyle("DANGER")
    .setEmoji("920412153712889877")

    const row = new MessageActionRow()
    .addComponents([kayıtdetay, davetdetay, mesajdetay, sesdetay])

    const row1 = new MessageActionRow()
    .addComponents([PuanDetaylari, GenelPuanDetaylari, Iptal])

embed.setDescription(`${member.toString()}, (${member.roles.highest}) Üyesinin <t:${Math.floor(Date.now() / 1000)}> Tarihine Kadar \`${message.guild.name}\` Sunucusunda Toplam Ses Ve Mesaj Bilgileri Aşağıda Belirtilmiştir.`)
.addFields(
{ name: "__**Toplam Ses**__",  value: `\`\`\`fix\n${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\n\`\`\``, inline: true },
{ name: "__**Toplam Mesaj**__",  value: `\`\`\`fix\n${messageData ? messageData.topStat : 0} mesaj\n\`\`\``, inline: true },
{ name:"__**Toplam Kayıt**__",  value: `\`\`\`fix\n${toplamData ? `${toplamData.toplams.length} kişi`: "Veri bulunmuyor."}\n\`\`\``, inline: true },
)
.addFields(
{ name: "__**Toplam Davet**__", value: `\`\`\`fix\n${inviterData ? `${total} regular`: "Veri bulunmuyor."}\n\`\`\``, inline: true },
{ name: "__**Toplam Taglı**__", value: `\`\`\`fix\n${taggedData ? `${taggedData.taggeds.length} kişi`: "Veri bulunmuyor."}\n\`\`\``, inline: true },
{ name: "__**Toplam Yetkili**__", value: `\`\`\`fix\n${yetkiData ? `${yetkiData.yetkis.length} kişi` : "Veri bulunmuyor."}\n\`\`\``, inline: true }
)
embed.addField(`⭐️ **Sesli Sohbet İstatistiği**`, `
   • Toplam: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\`
   • Public Odalar: \`${await category(conf.publicParents)}\`
   • Secret Odalar: \`${await category(conf.privateParents)}\`
   • Alone Odalar: \`${await category(conf.aloneParents)}\`
   • Yönetim Yetkili Odaları: \`${await category(conf.funParents)}\`
   • Kayıt Odaları: \`${await category(conf.registerParents)}\`
   `, false)
embed.addField(`⭐️ **Mesaj İstatistiği**`, `
   • Toplam: \`${messageData ? messageData.topStat : 0}\`
   • Haftalık Mesaj: \`${Number(messageWeekly).toLocaleString()} mesaj\`
   • Günlük Mesaj: \`${Number(messageDaily).toLocaleString()} mesaj\`
   `, false)

   

    let msg = await message.channel.send({ embeds: [embed], components: [row,row1] });

    var filter = (button) => button.user.id === message.author.id;
    let collector = await msg.createMessageComponentCollector({ filter, time: 99999999 })

    collector.on("collect", async (button) => {

      if(button.customId === "kayıt_detaylari") {

      const data = await regstats.findOne({ guildID: message.guild.id, userID: member.id });

const kayıtdetayembed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setAuthor({ name: `${message.guild.name} (kayıt)`,iconURL: message.guild.iconURL({ dynamic: true }) })
.setDescription(`
${member.toString()} Kullanıcısının <t:${Math.floor(Date.now() / 1000)}> Tarihine Kadar Toplanan Kayıt Bilgileri Aşağıda Belirtilmiştir.

**Toplam Kayıt :** \`${data ? data.top : 0}\`
**Toplam Erkek Kayıt :** \`${data ? data.erkek : 0}\`
**Toplam Kız Kayıt :** \`${data ? data.kız : 0}\`

`);

      button.reply({ embeds: [kayıtdetayembed], ephemeral: true});
      
      }

      if(button.customId === "davet_detaylari") {
        

const davetdetayemöbed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setAuthor({ name: `${message.guild.name} (davet)`,iconURL: message.guild.iconURL({ dynamic: true }) })
.setDescription(`
${member.toString()} Kullanıcısının <t:${Math.floor(Date.now() / 1000)}> Tarihine Kadar Toplanan Davet Bilgileri Aşağıda Belirtilmiştir.

      \` ❯ \` **Toplam** \`${total}\` **davetin Bulunmakta.**
      \` ❯ \` **Bunlardan** **(**\`${regular}\` **gerçek,** \`${bonus}\` **bonus,** \`${leave}\` **ayrılmış,** \`${fake}\` **fake)**     
      \` ❯ \` **(Günlük:** \`${daily}\` **Davet**, **Haftalık:** \`${weekly}\` **Davet**, **Taglı:** \`${tagged}\` **Davet)**

`);

      button.reply({ embeds: [davetdetayemöbed], ephemeral: true});
      
      }

      if(button.customId === "mesaj_detaylari") {
        await button.deferUpdate();

const mesajdetayembed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setAuthor({ name: `${message.guild.name} (mesaj)`,iconURL: message.guild.iconURL({ dynamic: true }) })
.setDescription(`${member.toString()} Üyesinin <t:${Math.floor(Date.now() / 1000)}> Tarihine Kadar \`${message.guild.name}\` Sunucusunda Toplanan Mesaj Bilgileri Aşağıda Belirtilmiştir.`)

.addFields(
{ name: "__**Toplam Mesaj**__",  value: `
\`\`\`fix
${messageData ? messageData.topStat : 0} mesaj
\`\`\`
`, inline: true },
{ name: "__**Haftalık Mesaj**__",  value: `
\`\`\`fix
${Number(messageWeekly).toLocaleString()} mesaj
\`\`\`
`, inline: true },
{ name:"__**Günlük Mesaj**__",  value: `
\`\`\`fix
${Number(messageDaily).toLocaleString()} mesaj
\`\`\`
`, inline: true },
)

      msg.edit({ embeds: [mesajdetayembed], components: [row,row1]});
      
      }

      if(button.customId === "ses_detaylari") {
                await button.deferUpdate();

const sesdetayembed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setAuthor({ name: `${message.guild.name} (ses)`,iconURL: message.guild.iconURL({ dynamic: true }) })
.setDescription(`${member.toString()} Üyesinin <t:${Math.floor(Date.now() / 1000)}> Tarihine Kadar \`${message.guild.name}\` Sunucusunda Toplanan Ses Bilgileri Aşağıda Belirtilmiştir.`)
.addFields(
{ name: "__**Toplam Ses**__",  value: `
\`\`\`fix
${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}
\`\`\`
`, inline: true },
{ name: "__**Haftalık Ses**__",  value: `
\`\`\`fix
${voiceWeekly}
\`\`\`
`, inline: true },
{ name:"__**Günlük Ses**__",  value: `
\`\`\`fix
${voiceDaily}
\`\`\`
`, inline: true },
)

  sesdetayembed.addField(`⚜️ **Sesli Sohbet İstatistiği**`, `
\`•\` Toplam: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\`
\`•\` Public Odalar: \`${await category(conf.publicParents)}\`
\`•\` Secret Odalar: \`${await category(conf.privateParents)}\`
\`•\` Alone Odalar: \`${await category(conf.aloneParents)}\`
\`•\` Yönetim Yetkili Odaları: \`${await category(conf.funParents)}\`
\`•\` Kayıt Odaları: \`${await category(conf.registerParents)}\`
 `, false);

      msg.edit({ embeds: [sesdetayembed], components: [row,row1]});
      
      }

      if(button.customId === "puan_detaylari") {
        await button.deferUpdate();

      const puan = new MessageEmbed()
      .setDescription(`
      ${member.toString()}, (${member.roles.highest}) üyesinin <t:${Math.floor(Date.now() / 1000)}> tarihinden  itibaren \`${message.guild.name}\` sunucusunda puanlama tablosu aşağıda belirtilmiştir.
      `) 
      
       .addField(`⭐️ **Ceza Kullanımı**`, `\`\`\`diff
- (Ban: ${cezaData ? cezaData.BanAmount : 0} - Mute: ${cezaData ? cezaData.MuteAmount : 0} - Ses Mute: ${cezaData ? cezaData.VoiceMuteAmount : 0} - Jail: ${cezaData ? cezaData.JailAmount : 0})\`\`\`
`)
      
      .addField(`⭐️ **Puan Detayları:**`, `
       Kayıtlar: \`${toplamData ? toplamData.toplams.length : 0} (Puan Etkisi: +${toplamData ? toplamData.toplams.length*5.5 : 0})\`
       Taglılar: \`${taggedData ? taggedData.taggeds.length : 0} (Puan Etkisi: +${taggedData ? taggedData.taggeds.length*25 : 0})\`
       Davetler: \`${total} (Puan Etkisi: +${total*15})\`
       Yetkililer: \`${yetkiData ? yetkiData.yetkis.length : 0} kişi (Puan Etkisi: +${yetkiData ? yetkiData.yetkis.length*30 : 0})\`
       Chat Puan: \`${messageData ? messageData.topStat : 0} mesaj (Puan Etkisi: +${messageData ? messageData.topStat*2 : 0})\`
       Sesli Puan: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("h")} saat (Puan Etkisi: +${moment.duration(voiceData ? voiceData.topStat : 0).format("h")*240})\`
       `, false)
       

msg.edit({
  embeds : [puan],
  components : [row,row1]
})
      
      }

  if(button.customId === "genel_puan_detaylari") {
    await button.deferUpdate();
    const ceza = new MessageEmbed()
    .setDescription(`
    ${member.toString()}, (${member.roles.highest}) Üyesinin <t:${Math.floor(Date.now() / 1000)}> tarihinden itibaren \`${message.guild.name}\` sunucusunda genel puanlama tablosu aşağıda belirtilmiştir.
`) 
.addField(`⭐️ **Puan Detayları:**`, `
• Kayıt: (\`Puan Etkisi: +${toplamData ? toplamData.toplams.length*5.5 : 0}\`)
• Taglı: (\`Puan Etkisi: +${taggedData ? taggedData.taggeds.length*25 : 0}\`)
• Davet: (\`Puan Etkisi: +${total*15}\`)
• Yetkili: (\`Puan Etkisi: +${yetkiData ? yetkiData.yetkis.length*30 : 0}\`)
• Toplam Ses: (\`Puan Etkisi: +${moment.duration(voiceData ? voiceData.topStat : 0).format("h")*240}\`)
• Toplam Mesaj: (\`Puan Etkisi: +${messageData ? messageData.topStat*2 : 0}\`)
• Toplam Aldığın Cezalar : ${cezapuanData ? cezapuanData.cezapuan.length : 0} (\`Toplam ${cezaData ? cezaData.ceza.length : 0}\`)
 `, false)

.addField(`⭐️ **Net Puanlama Bilgisi**`, `
• Kayıt işlemi yaparak, \`+5.5\` puan kazanırsın.
• Taglı üye belirleyerek, \`+25\` puan kazanırsınız.
• İnsanları davet ederek, \`+15\` puan kazanırsın.
• İnsanları yetkili yaparak, \`+30\` puan kazanırsın.
• Seste kalarak, ortalama olarak \`+4\` puan kazanırsınız.
• Yazı yazarak, ortalama olarak, \`+2\` puan kazanırsınız.
 `, false)

msg.edit({
  embeds: [ceza],
  components : [row,row1]
})  
    }

      if(button.customId === "iptal_button") {
        await button.deferUpdate();
        const iptal = new MessageEmbed()
        .setDescription(`
${member.toString()}, (${member.roles.highest}) Üyesinin <t:${Math.floor(Date.now() / 1000)}> Tarihine Kadar \`${message.guild.name}\` Sunucusunda Toplanan Toplam Ses Ve Mesaj Bilgileri Aşağıda Belirtilmiştir.
`)

.addFields(
  { name: "__**Toplam Ses**__",  value: `\`\`\`fix\n${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\n\`\`\``, inline: true },
  { name: "__**Toplam Mesaj**__",  value: `\`\`\`fix\n${messageData ? messageData.topStat : 0} mesaj\n\`\`\``, inline: true },
  { name:"__**Toplam Kayıt**__",  value: `\`\`\`fix\n${toplamData ? `${toplamData.toplams.length} kişi`: "Veri bulunmuyor."}\n\`\`\``, inline: true },
  )
  .addFields(
  { name: "__**Toplam Davet**__", value: `\`\`\`fix\n${inviterData ? `${total} regular`: "Veri bulunmuyor."}\n\`\`\``, inline: true },
  { name: "__**Toplam Taglı**__", value: `\`\`\`fix\n${taggedData ? `${taggedData.taggeds.length} kişi`: "Veri bulunmuyor."}\n\`\`\``, inline: true },
  { name: "__**Toplam Yetkili**__", value: `\`\`\`fix\n${yetkiData ? `${yetkiData.yetkis.length} kişi` : "Veri bulunmuyor."}\n\`\`\``, inline: true }
  )
  
  .addField(`⭐️ **Sesli Sohbet İstatistiği**`, `
  • Toplam: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\`
  • Public Odalar: \`${await category(conf.publicParents)}\`
  • Secret Odalar: \`${await category(conf.privateParents)}\`
  • Alone Odalar: \`${await category(conf.aloneParents)}\`
  • Yönetim Yetkili Odaları: \`${await category(conf.funParents)}\`
  • Kayıt Odaları: \`${await category(conf.registerParents)}\`
   `, false)
  
  
  .addField(`⭐️ **Mesaj İstatistiği**`, `
  • Toplam: \`${messageData ? messageData.topStat : 0}\`
  • Haftalık Mesaj: \`${Number(messageWeekly).toLocaleString()} mesaj\`
  • Günlük Mesaj: \`${Number(messageDaily).toLocaleString()} mesaj\`
   `, false);

   row.components[0].setDisabled(true) 
   row.components[1].setDisabled(true) 
   row.components[2].setDisabled(true)
   row.components[3].setDisabled(true)

   row1.components[0].setDisabled(true) 
   row1.components[1].setDisabled(true) 
   row1.components[2].setDisabled(true)
   
    msg.edit({
      embeds: [iptal],
      components : [row,row1]
    })
        
        }

  })
  }
};

function progressBar(value, maxValue, size) {
const progress = Math.round(size * ((value / maxValue) > 1 ? 1 : (value / maxValue)));
const emptyProgress = size - progress > 0 ? size - progress : 0;

const progressText = fill.repeat(progress);
const emptyProgressText = empty.repeat(emptyProgress);

return emptyProgress > 0 ? fillStart+progressText+emptyProgressText+emptyEnd : fillStart+progressText+emptyProgressText+fillEnd;
};
