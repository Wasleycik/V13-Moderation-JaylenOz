const Discord = require('discord.js');
const conf = require("../../configs/sunucuayar.json");

module.exports = {
  conf: {
    aliases: ["embedyaz"],
    name: "embedyaz",
    help: "embedyaz",
    owner: true
  },
 
    run: async (client, message, args, durum, kanal) => {
  if (!message.guild) return
  let mesaj = args.slice(0).join(' ');
if (mesaj.length < 1) return message.reply({ content: 'Yazmam için herhangi bir şey yazmalısın.' });

  const ototagembed = new Discord.MessageEmbed()
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
.setColor(`RANDOM`)
.setDescription(`
${mesaj}
`)
.setTimestamp()
.setFooter(conf.botfooter);

  message.delete();
  message.channel.send({ embeds: [ototagembed] });
}}