const moment = require("moment");
const cezapuans = require("../../schemas/cezapuan");
const ceza = require("../../schemas/ceza")
const name = require("../../schemas/names");
const penals = require("../../schemas/penals");
const voiceUser = require("../../schemas/voiceUser");
const inviterSchema = require("../../schemas/inviter");
require("moment-duration-format");
const messageUser = require("../../schemas/messageUser");
const conf = require("../../configs/sunucuayar.json");
const { kirmiziok, green, red ,star } = require("../../configs/emojis.json");
const { TeamMember, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  conf: {
    aliases: ["sf","sıfırla"],
    name: "sıfırla",
    help: "sıfırla"
  },

  run: async (client, message, args, embed) => {
if (!message.member.permissions.has('ADMINISTRATOR'))
{
message.reply({ content:"Bu işlemi yapamazsın dostum!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
message.react(red)
return;
}
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
     
    var btn1 = new MessageButton()
    .setLabel("İsim Sıfırla")
    .setCustomId("isim_sıfırla")
    .setStyle("PRIMARY")

    var btn2 = new MessageButton()
    .setLabel("Ceza Puan Sıfırla")
    .setCustomId("cezapuan_sıfırla")
    .setStyle("SUCCESS")

    var btn3 = new MessageButton()
    .setLabel("Sicil Sıfırla")
    .setCustomId("sicil_sıfırla")
    .setStyle("DANGER")

    var btn4 = new MessageButton()
    .setLabel("Mesaj Sıfırla")
    .setCustomId("mesaj_sıfırla")
    .setStyle("DANGER")

    var Iptal = new MessageButton()
    .setLabel("İptal")
    .setCustomId("iptal_button")
    .setStyle("SECONDARY")
    .setEmoji("909485171240218634")

    const row = new MessageActionRow()
    .addComponents([btn1,btn2,btn3,btn4,Iptal])

    var btn5 = new MessageButton()
    .setLabel("Davet Sıfırla")
    .setCustomId("davet_sıfırla")
    .setStyle("DANGER")

    var btn6 = new MessageButton()
    .setLabel("Ses Sıfırla")
    .setCustomId("ses_sıfırla")
    .setStyle("DANGER")

    const row2 = new MessageActionRow()
    .addComponents([btn5,btn6])


embed.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) }).setTimestamp().setColor(message.author.displayHexColor).setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })}).setThumbnail(message.guild.iconURL({ dynamic: true }))
embed.addField(`VERİ SIFIRLAMA PANELİ`,`
\` ❯ \` İsim Sıfırlama
\` ❯ \` Ceza Puan Sıfırlama
\` ❯ \` Sicil Sıfırlama

${member.toString()} üyesine ait sıfırlamak istediğin veriyi aşağıdaki butonlar yardımıyla sıfırlayabilirsiniz.
`)

    let msg = await message.channel.send({ embeds: [embed], components: [row,row2] });
    var filter = (button) => button.user.id === message.author.id;
   
    let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })
    collector.on("collect", async (button) => {

      if(button.customId === "isim_sıfırla") {
        await button.deferUpdate();
        await name.deleteMany({userID: member.user.id, guildID: message.guild.id})
      const isim = new MessageEmbed()
      .setDescription(`${green} ${member.toString()} üyesinin isim geçmişi ${message.author} tarafından \`${moment(Date.now()).format("LLL")}\` tarihinde temizlendi!`)

msg.edit({
  embeds : [isim],
  components : []
})
      
      }

  if(button.customId === "cezapuan_sıfırla") {
    await button.deferUpdate();
    await cezapuans.deleteMany({userID: member.user.id, guildID: message.guild.id})
    await ceza.deleteMany({userID: member.user.id, guildID: message.guild.id})
    const cezapuan = new MessageEmbed()
    .setDescription(`${green}  ${member.toString()} üyesinin ceza puanı ${message.author} tarafından \`${moment(Date.now()).format("LLL")}\` tarihinde temizlendi!`) 


msg.edit({
  embeds: [cezapuan],
  components : []
})  
    }
 if(button.customId === "sicil_sıfırla") {   
    await button.deferUpdate();
    await penals.deleteMany({userID: member.user.id, guildID: message.guild.id})
    const sicil = new MessageEmbed()
    .setDescription(`${green}  ${member.toString()} üyesinin sicili ${message.author} tarafından \`${moment(Date.now()).format("LLL")}\` tarihinde temizlendi!`) 

msg.edit({
  embeds: [sicil],
  components : []
})  
    }

 if(button.customId === "mesaj_sıfırla") {   
    await button.deferUpdate();
    await messageUser.deleteMany({userID: member.user.id, guildID: message.guild.id})
    const mesaj = new MessageEmbed()
    .setDescription(`${green}  ${member.toString()} üyesinin Mesaj ${message.author} tarafından \`${moment(Date.now()).format("LLL")}\` tarihinde temizlendi!`) 

msg.edit({
  embeds: [mesaj],
  components : []
})  
    }
 if(button.customId === "davet_sıfırla") {   
    await button.deferUpdate();
    await inviterSchema.deleteMany({userID: member.user.id, guildID: message.guild.id})
    const davet = new MessageEmbed()
    .setDescription(`${green}  ${member.toString()} üyesinin Davet ${message.author} tarafından \`${moment(Date.now()).format("LLL")}\` tarihinde temizlendi!`) 

msg.edit({
  embeds: [davet],
  components : []
})  
    }

 if(button.customId === "ses_sıfırla") {   
    await button.deferUpdate();
    await voiceUser.deleteMany({userID: member.user.id, guildID: message.guild.id})
    const ses = new MessageEmbed()
    .setDescription(`${green}  ${member.toString()} üyesinin Ses ${message.author} tarafından \`${moment(Date.now()).format("LLL")}\` tarihinde temizlendi!`) 

msg.edit({
  embeds: [ses],
  components : []
})  
    }

 if(button.customId === "iptal_button") {   
    await button.deferUpdate();
    const iptal = new MessageEmbed()
    .setDescription(`${green} Sıfırlama işlemi iptal edildi`) 

msg.edit({
  embeds: [iptal],
  components : []
})  
    }


  })
  }
};
