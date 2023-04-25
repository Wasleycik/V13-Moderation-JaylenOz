const { MessageEmbed, Client, Message, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");
const Discord = require('discord.js');
const client = global.bot;
const conf = require('../../configs/sunucuayar.json');
const registerData  = require("../../schemas/registerStats");

module.exports = {
  conf: {
    aliases: ["registerkilit","regkilit"],
    name: "registerkilit",
    owner: true,
  },

  run: async (client, message, args) => {
     if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ embeds: [embed.setDescription(`${message.member}, Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`)] });
    let data = await registerData.findOne({ guildID: message.guild.id })
    if(!data) new registerData({guildID: message.guild.id, tagMode: false}).save();
       let channels = message.guild.channels.cache.filter(ch => ch.parentId == conf.registerParent)

const embed = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`Register Kilit`)
.setDescription(`
Aşağıda Ki Butonlar **${message.guild.name}** sunusunun Register Sistemini Kilitlemenizi Sağlar.

Register sistemi şuan: ${data.regkilit ? "Açık" : "Kapalı"}
\`\`\`Register voice kanallarının ve register sisteminin kilitlenmesini/açılmasını istiyorsanız: Register Kilit butonunu kullanın.\`\`\`

`);
  const row = new MessageActionRow()
  .addComponents(
  new MessageButton()
  .setCustomId("kayıtkilit")
  .setLabel("Kayıt Sistemi Kilitle")
  .setStyle("SECONDARY"),

  new MessageButton()
  .setCustomId("kayıtaç")
  .setLabel("Kayıt Sistemi Aç")
  .setStyle("SECONDARY"),


  new MessageButton()
  .setCustomId("iptal")
  .setLabel("❌ İptal Et")
  .setStyle("SECONDARY"),
  );


      let msg = await message.channel.send({embeds: [embed], components: [row]}).then(async (msg) => {
     
    var filter = (interaction) => interaction.user.id == message.author.id;
    let collector = msg.createMessageComponentCollector({filter: filter, time: 60000});
    collector.on('end', (collected, reason) => {
        if(reason == "time"){
            msg.delete().catch(err => {});
        }
    })
    collector.on('collect', async (interaction) => {

 if (interaction.customId === "gerigit") {

interaction.update({embeds: [embed], components: [row]})
}


 if (interaction.customId === "kayıtkilit") {

const kilitleembed = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`Register Kilit`)
.setDescription(`
**${message.guild.name}** Sunucusunun Register sistemi şuan: ${data.regkilit ? "Açık" : "Kapalı"}

`);
  const kilitlerow = new MessageActionRow()
  .addComponents(
  new MessageButton()
  .setCustomId("kilitle")
  .setLabel("🛑 Kilitle")
  .setStyle("SECONDARY")
  .setDisabled(true),

  new MessageButton()
  .setCustomId("kilitaç")
  .setLabel("🛑 Kilit aç")
  .setStyle("SECONDARY"),


  new MessageButton()
  .setCustomId("iptal")
  .setLabel("❌ İptal Et")
  .setStyle("SECONDARY"),

  new MessageButton()
  .setCustomId("gerigit")
  .setLabel("◀️ Geri")
  .setStyle("PRIMARY"),
  );

        data.regkilit = true;
        data.save();
            channels.forEach(ch => {
              ch.permissionOverwrites.edit(`${conf.unregRoles}`, {
                 // SEND_MESSAGES: false,
                  CONNECT: false,
              });
          });
interaction.update({embeds: [kilitleembed], components: [kilitlerow]})
}

 if (interaction.customId === "kayıtaç") {

const kilitaçembed = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`Register Kilit`)
.setDescription(`
**${message.guild.name}** Sunucusunun Register sistemi şuan: ${data.regkilit ? "Açık" : "Kapalı"}

`);
  const kilitaçrow = new MessageActionRow()
  .addComponents(
  new MessageButton()
  .setCustomId("kilitle")
  .setLabel("🛑 Kilitle")
  .setStyle("SECONDARY"),

  new MessageButton()
  .setCustomId("kilitaç")
  .setLabel("🛑 Kilit aç")
  .setStyle("SECONDARY")
  .setDisabled(true),

  new MessageButton()
  .setCustomId("iptal")
  .setLabel("❌ İptal Et")
  .setStyle("SECONDARY"),

  new MessageButton()
  .setCustomId("gerigit")
  .setLabel("◀️ Geri")
  .setStyle("PRIMARY"),
  );

        data.regkilit = false;
        data.save();
            channels.forEach(ch => {
              ch.permissionOverwrites.edit(`${conf.unregRoles}`, {
                 // SEND_MESSAGES: true,
                  CONNECT: true,
              });
          });

interaction.update({embeds: [kilitaçembed], components: [kilitaçrow]})
}

 if (interaction.customId === "kanalkilit") {

const kanalklit = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`Register Kilit`)
.setDescription(`
**${message.guild.name}** Sunucusunun Register sistemi şuan: ${data.regkilit ? "Açık" : "Kapalı"}

`);
  const kanalkilit = new MessageActionRow()
  .addComponents(
  new MessageButton()
  .setCustomId("kilitle")
  .setLabel("🛑 Kilitle")
  .setStyle("SECONDARY")
  .setDisabled(true),

  new MessageButton()
  .setCustomId("kilitaç")
  .setLabel("🛑 Kilit aç")
  .setStyle("SECONDARY"),


  new MessageButton()
  .setCustomId("iptal")
  .setLabel("❌ İptal Et")
  .setStyle("SECONDARY"),
  new MessageButton()
  .setCustomId("gerigit")
  .setLabel("◀️ Geri")
  .setStyle("PRIMARY"),
  );

            channels.forEach(ch => {
              ch.permissionOverwrites.edit(`${conf.unregRoles}`, {
                 // SEND_MESSAGES: true,
                  CONNECT: false,
              });
          });

interaction.update({embeds: [kanalklit], components: [kanalkilit]})
}

 if (interaction.customId === "kanalaç") {

const kanalaçenbed = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`Register Kilit`)
.setDescription(`
**${message.guild.name}** Sunucusunun Register sistemi şuan: ${data.regkilit ? "Açık" : "Kapalı"}

`);
  const kanaleçeme = new MessageActionRow()
  .addComponents(
  new MessageButton()
  .setCustomId("kilitle")
  .setLabel("🛑 Kilitle")
  .setStyle("SECONDARY"),

  new MessageButton()
  .setCustomId("kilitaç")
  .setLabel("🛑 Kilit aç")
  .setStyle("SECONDARY")
  .setDisabled(true),

  new MessageButton()
  .setCustomId("iptal")
  .setLabel("❌ İptal Et")
  .setStyle("SECONDARY"),

  new MessageButton()
  .setCustomId("gerigit")
  .setLabel("◀️ Geri")
  .setStyle("PRIMARY"),
  );
            channels.forEach(ch => {
              ch.permissionOverwrites.edit(`${conf.unregRoles}`, {
                 // SEND_MESSAGES: true,
                  CONNECT: true,
              });
          });

interaction.update({embeds: [kanalaçenbed], components: [kanaleçeme]})
}


if(interaction.customId === "iptal") {
  if(msg) msg.delete().catch({})
  interaction.reply({ content :"İşlem Başarıyla İptal Edildi.", ephemeral: true })
}
  
    

    })})}}