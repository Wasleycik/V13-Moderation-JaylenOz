const moment = require("moment");
require("moment-duration-format");
const messageGuild = require("../../schemas/messageGuild");
const messageGuildChannel = require("../../schemas/messageGuildChannel");
const voiceGuild = require("../../schemas/voiceGuild");
const voiceGuildChannel = require("../../schemas/voiceGuildChannel");
const messageUser = require("../../schemas/messageUser");
const voiceUser = require("../../schemas/voiceUser");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const conf = require("../../configs/sunucuayar.json")
module.exports = {
    conf: {
      aliases: ["topstat2","ts2","top2"],
      name: "topstat2",
      help: "topstat2"
    },
  
run: async (client, message, args, embed, prefix) => {

if(message.channel.id !== conf.ytcommands && message.channel.id !== conf.botcommandschannel && !message.member.permissions.has("ADMINISTRATOR")) return message.reply({content: `Bu Komutu Sadece <#${conf.botcommandschannel}> Ve <#${conf.ytcommands}> Kanalında Kullanabilirsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    const messageChannelData = await messageGuildChannel.find({ guildID: message.guild.id }).sort({ channelData: -1 });
    const voiceChannelData = await voiceGuildChannel.find({ guildID: message.guild.id }).sort({ channelData: -1 });
    const messageUsersData = await messageUser.find({ guildID: message.guild.id }).sort({ topStat: -1 });
    const voiceUsersData = await voiceUser.find({ guildID: message.guild.id }).sort({ topStat: -1 });
    const messageGuildData = await messageGuild.findOne({ guildID: message.guild.id });
    const voiceGuildData = await voiceGuild.findOne({ guildID: message.guild.id });
    const messageChannels = messageChannelData.splice(0, 15).map((x, index) => `\`${index+1}.\` <#${x.channelID}>: \`${Number(x.channelData).toLocaleString()} mesaj\` ${x.userID == message.member.id ? `**(Siz)**` : ``}`).join(`\n`);
    const voiceChannels = voiceChannelData.splice(0, 15).map((x, index) => `\`${index+1}.\` <#${x.channelID}>: \`${moment.duration(x.channelData).format("H [saat], m [dakika]")}\` ${x.userID == message.member.id ? `**(Siz)**` : ``}`).join(`\n`);
    const messageUsers = messageUsersData.splice(0, 10).map((x, index) => `\`${index+1}.\` <@${x.userID}>: \`${Number(x.topStat).toLocaleString()} mesaj\` ${x.userID == message.member.id ? `**(Siz)**` : ``}`).join(`\n`);
    const voiceUsers = voiceUsersData.splice(0, 10).map((x, index) => `\`${index+1}.\` <@${x.userID}>: \`${moment.duration(x.topStat).format("H [saat], m [dakika]")}\` ${x.userID == message.member.id ? `**(Siz)**` : ``}`).join(`\n`);
    const sunucuisim = client.guilds.cache.get(conf.guildID).name
    const msgList = (`${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`)
    const voiceList = (`${voiceUsers.length > 0 ? voiceUsers : "Veri Bulunmuyor."}`)

    const row = new MessageActionRow()
         .addComponents(

  new MessageButton()
    .setCustomId("main")
    .setLabel("◀️ Menü")
    .setStyle("SECONDARY"),

  new MessageButton()
  .setCustomId("topmsg")
  .setLabel("Top Mesaj")
  .setStyle("SECONDARY"),

  new MessageButton()
  .setCustomId("topses")
  .setLabel("Top Ses")
  .setStyle("SECONDARY"),

  new MessageButton()
    .setCustomId("ses")
    .setLabel("Ses Detay")
    .setStyle("SECONDARY"),

  new MessageButton()
    .setCustomId("mes")
    .setLabel("Mesaj Detay")
    .setStyle("SECONDARY"),

);

      const row2 = new MessageActionRow()
      .addComponents(





  );
   
     embed.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
     .setDescription(`
${message.guild.name} sunucusunun toplam ses ve chat bilgileri gösterilmektedir.
    `)
    .addField(`**Genel ses sıralaması**(\`Toplam ${moment.duration(voiceGuildData ? voiceGuildData.topStat : 0).format("H [saat], m [dakika]")}\`)`,`${voiceUsers.length > 0 ? voiceUsers : "Veri Bulunmuyor."}`,true)
    .addField(`**Genel chat sıralaması**(\`Toplam ${Number(messageGuildData ? messageGuildData.topStat : 0).toLocaleString()} mesaj\`)`,`${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`,true)
    let msg = await message.channel.send({ embeds: [embed], components: [row]})

    var filter = (xd) => xd.user.id === message.author.id;
    let collector =  msg.createMessageComponentCollector({ filter, componentType: 'BUTTON', time: 99999999 })
  
collector.on("collect", async (button) => {
if(button.customId === "ses") {
  await button.deferUpdate();
  
const embeds = new MessageEmbed()
.setDescription(`
${voiceChannels.length > 0 ? voiceChannels : "Veri Bulunmuyor."}`).setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
msg.edit({
embeds: [embeds],
components : [row]
})}
if(button.customId === "mes") {
  await button.deferUpdate();

const embeds = new MessageEmbed()
.setDescription(`
${messageChannels.length > 0 ? messageChannels : "Veri Bulunmuyor."}
`).setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
msg.edit({
embeds: [embeds],
components : [row]
})}

if(button.customId === "topteyit") {
  await button.deferUpdate();

  msg.edit({
embeds: [embed],
components : [row]
})}

if(button.customId === "topmsg") {
  await button.deferUpdate();

   let Chat = new MessageEmbed()
   .setColor("#2f3136")
   .setAuthor({ name: client.guilds.cache.get(conf.guildID).name, iconURL: client.guilds.cache.get(conf.guildID).iconURL({dynamic:true})})
   .setDescription(`\`${sunucuisim}\` sunucusunun genel sohbet(\`Mesaj\`) sıralaması listelenmektedir.\n\n${msgList}\n\nGenel sohbet(\`Mesaj\`) sıralaması \`${moment(Date.now()).format("LLL")}\` tarihinde otomatik olarak güncellenmiştir.`)

  msg.edit({
embeds: [Chat],
components : [row]
})}

if(button.customId === "topses") {
  await button.deferUpdate();

   let ses = new MessageEmbed()
   .setColor("#2f3136")
   .setAuthor({ name: client.guilds.cache.get(conf.guildID).name, iconURL: client.guilds.cache.get(conf.guildID).iconURL({dynamic:true})})
   .setDescription(`\`${sunucuisim}\` sunucusunun genel sohbet(\`Ses\`) sıralaması listelenmektedir.\n\n${voiceList}\n\nGenel sohbet(\`Ses\`) sıralaması \`${moment(Date.now()).format("LLL")}\` tarihinde otomatik olarak güncellenmiştir.`)


  msg.edit({
embeds: [ses],
components : [row]
})}

if(button.customId === "main") {
  await button.deferUpdate();

  msg.edit({
embeds: [embed],
components : [row]
})}
})
},
  };
  
  