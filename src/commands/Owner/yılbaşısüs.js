const { MessageEmbed, Client, MessageActionRow, MessageButton } = require('discord.js');
const moment = require("moment")
moment.locale("tr")
const Discord = require("discord.js");
const { red , green } = require("../../configs/emojis.json")
const regstats = require("../../schemas/registerStats");
const registerData  = require("../../schemas/registerStats");

module.exports = {

    conf: {
      aliases: ["yılbaşı"],
      name: "yılbaşı",
      help: "yılbaşı",
      owner: true,
    },
run: async (client, message, args, embed, prefix) => { 
     if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ embeds: [embed.setDescription(`${message.member}, Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`)] });

    const row = new MessageActionRow()
		.addComponents(

    new MessageButton()
    .setCustomId("süsle")
    .setLabel("SÜSLE")
    .setStyle("SECONDARY"),

    new MessageButton()
    .setCustomId("süskaldır")
    .setLabel("SÜS KALDIR")
    .setStyle("SECONDARY"),

    new MessageButton()
    .setCustomId("İPTAL")
    .setLabel("İptal")
    .setStyle("DANGER"),

	);

    const row2 = new MessageActionRow()
		.addComponents(

    new MessageButton()
    .setCustomId("süsle")
    .setLabel("SÜSLE")
    .setStyle("SECONDARY")
.setDisabled(true),

    new MessageButton()
    .setCustomId("süskaldır")
    .setLabel("SÜS KALDIR")
    .setStyle("SECONDARY")
.setDisabled(true),

    new MessageButton()
    .setCustomId("İPTAL")
    .setLabel("İptal")
    .setStyle("DANGER")
.setDisabled(true),

	);

const tagModedata = await regstats.findOne({ guildID: message.guild.id })
let wasley = new MessageEmbed()
.setColor("#2f3136")
.setAuthor({ name: `YILBAŞI SÜS`,iconURL: message.guild.iconURL({ dynamic: true }) })
.setDescription(`Bu komut sunucu içerisindeki Kanalları Noel Ağacı İle Süslemeye Yarar
\`\`\`
Sunucuyu Süslemek İçin Aşşağıdaki Butonları Kullan
\`\`\``)

 let msg = await message.channel.send({ embeds: [wasley], components : [row] })
 
 var filter = (button) => button.user.id === message.author.id;
 let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })

      collector.on("collect", async (button) => {

if(button.customId === "süsle") {
      message.guild.channels.cache.forEach(st => {
        st.setName(`🎄│${st.name}`)})
  let süsle = new MessageEmbed()
  .setDescription(`Sunucu Kanalları Başarıyla Süslendi!`)

  msg.edit({ embeds: [süsle], components: [row2], ephemeral: true});
}  

if(button.customId === "süskaldır") {
        message.guild.channels.cache.forEach(st => {
        st.setName(`${st.name.replace("🎄│", "")}`)})

let süskaldır = new MessageEmbed()
.setDescription(`Başarıyla Sunucu Süsleri Kaldırıldı!`)

msg.edit({ embeds: [süskaldır], components: [row2], ephemeral: true});

 }

if(button.customId === "İPTAL") {
if(msg) msg.delete();
button.reply({ content:`İşlem Başarıyla İptal Edildi`, embeds: [], components: [], ephemeral: true});

}

  

  
})}}