
const { MessageEmbed, Client, MessageActionRow, MessageButton } = require('discord.js');
const moment = require("moment")
moment.locale("tr")
const Discord = require("discord.js");
const { red , green } = require("../../configs/emojis.json")
const regstats = require("../../schemas/registerStats");
const registerData  = require("../../schemas/registerStats");

module.exports = {

    conf: {
      aliases: ["taglıalım","taglı-alım"],
      name: "taglı-alım",
      help: "taglı-alım [aç/kapat]",
      owner: true,
    },
run: async (client, message, args, embed, prefix) => { 
     if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ embeds: [embed.setDescription(`${message.member}, Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`)] });
    let data = await registerData.findOne({ guildID: message.guild.id })
    if(!data) new registerData({guildID: message.guild.id, tagMode: false}).save();

    const row = new MessageActionRow()
		.addComponents(

    new MessageButton()
    .setCustomId("açık")
    .setLabel("Aç")
    .setStyle("SECONDARY"),

    new MessageButton()
    .setCustomId("kapalı")
    .setLabel("Kapat")
    .setStyle("SECONDARY"),

    new MessageButton()
    .setCustomId("İPTAL")
    .setLabel("İptal")
    .setStyle("DANGER"),

	);

const tagModedata = await regstats.findOne({ guildID: message.guild.id })
let wasley = new MessageEmbed()
.setColor("#2f3136")
.setAuthor({ name: `Taglı Alım Sistemi`,iconURL: message.guild.iconURL({ dynamic: true }) })
.setDescription(`Bu komut sunucu içerisindeki taglı alımı açıp kapatmanıza yarar.
\`\`\`
Taglı alım modu şuan (${tagModedata ? tagModedata.tagMode === true : false})
\`\`\``)

 let msg = await message.channel.send({ embeds: [wasley], components : [row] })
 
 var filter = (button) => button.user.id === message.author.id;
 let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })

      collector.on("collect", async (button) => {

if(button.customId === "açık") {

if (data && data.tagMode === true) return button.reply({ embeds: [embed.setDescription(`${red} taglı alım modu zaten aktif!`)], ephemeral: true});
data.tagMode = true;
data.save();
  let acıık = new MessageEmbed()
  .setDescription(`taglı alım modu başarıyla aktif edildi!`)

  button.update({ embeds: [acıık], components: [row], ephemeral: true});
}  

if(button.customId === "kapalı") {
if (data && data.tagMode === false) return button.reply({ embeds: [embed.setDescription(`${red} taglı alım modu zaten kapalı!`)], ephemeral: true});
            data.tagMode = false;
            data.save();

let kapalii = new MessageEmbed()
.setDescription(`taglı alım modu başarıyla deaktif edildi!`)

button.update({ embeds: [kapalii], components: [row], ephemeral: true});

 }

if(button.customId === "İPTAL") {
if(msg) msg.delete();
button.reply({ content:`İşlem Başarıyla İptal Edildi`, components: [], ephemeral: true});

}

  

  
})}}