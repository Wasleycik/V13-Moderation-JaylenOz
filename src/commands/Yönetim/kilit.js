const conf = require("../../configs/sunucuayar.json")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
module.exports = {
  conf: {
    aliases: ["kilites","lockss","kilit2"],
    name: "kilit",
    help: "kilit"
  },

  run: async (client, message, args, embed, prefix) => {
if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ embeds: [embed.setDescription(`${message.member}, Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`)] });

    const row = new MessageActionRow()
  .addComponents(

  new MessageButton()
  .setCustomId("kilitle")
  .setLabel("Kilitle")
  .setStyle("SUCCESS"),

  new MessageButton()
  .setCustomId("kilitaç")
  .setLabel("Kilit aç")
  .setStyle("SUCCESS"),

  new MessageButton()
  .setCustomId("red")
  .setLabel("iptal")
  .setStyle("DANGER"),
  );

  let wasley = new MessageEmbed()
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
.setDescription(`
Komut Sadece Kullanılan Kanalda Çalışmaktadır Diğer Kanalları Etkilemez

Bu Kanalı Kilitlemek İçin Lütfen Aşşağıdaki Butona Basınız.
`)

 let msg = await message.channel.send({ embeds: [wasley], components : [row] })
 
 var filter = (button) => button.user.id === message.author.id;
 let collector = await msg.createMessageComponentCollector({ filter, time: 50000 })

 collector.on("collect", async (button) => {
    if(button.customId === "kilitle") {
      await button.deferUpdate();

    const row1 = new MessageActionRow()
  .addComponents(

  new MessageButton()
  .setCustomId("kilitle")
  .setLabel("Kilitle")
  .setStyle("SUCCESS")
  .setDisabled(true),

  new MessageButton()
  .setCustomId("kilitaç")
  .setLabel("Kilit aç")
  .setStyle("SUCCESS"),

  new MessageButton()
  .setCustomId("red")
  .setLabel("iptal")
  .setStyle("DANGER"),
  );


  let wasley1 = new MessageEmbed()
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
.setDescription(`
Kanal Başarılı Bir Şekilde Kilitlendi.
`)
    
      let everyone = message.guild.roles.cache.find(r => r.name === "@everyone");
      message.channel.permissionOverwrites.edit(everyone.id, {
          SEND_MESSAGES: false
      }).then(async() => {
          message.react("🔒")
        msg.edit({ embeds: [wasley1], components : [row1] })
        })
    }

    if(button.customId === "kilitaç") {
      await button.deferUpdate();

    const row2 = new MessageActionRow()
  .addComponents(

  new MessageButton()
  .setCustomId("kilitle")
  .setLabel("Kilitle")
  .setStyle("SUCCESS"),

  new MessageButton()
  .setCustomId("kilitaç")
  .setLabel("Kilit aç")
  .setStyle("SUCCESS")
  .setDisabled(true),

  new MessageButton()
  .setCustomId("red")
  .setLabel("iptal")
  .setStyle("DANGER"),
  );


  let wasley2 = new MessageEmbed()
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
.setDescription(`
Kanalın Kilidi Başarılı Bir Şekilde Açıldı.
`)
    
      let everyone = message.guild.roles.cache.find(r => r.name === "@everyone");
      message.channel.permissionOverwrites.edit(everyone.id, {
          SEND_MESSAGES: true
      }).then(async() => {
        msg.edit({ embeds: [wasley2], components : [row2] })
        })
    }

if(button.customId === "iptal") {
  if(msg) msg.delete().catch({})
  button.reply({ content :"İşlem Başarıyla İptal Edildi.", ephemeral: true })
}

    })

}}