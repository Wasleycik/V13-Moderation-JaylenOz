const { MessageEmbed } = require('discord.js');
const regstats = require("../../schemas/registerStats");
const conf = require("../../configs/sunucuayar.json")
const { red, green } = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["tkayıt","tteyit","topk","topt"],
    name: "topteyit",
    help: "topkayıt"
  },
  run: async (client, message, args, embed, prefix) => { 

if(message.channel.id !== conf.ytcommands && message.channel.id !== conf.botcommandschannel) return message.reply({content: `Bu Komutu Sadece <#${conf.botcommandschannel}> Ve <#${conf.ytcommands}> Kanalında Kullanabilirsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000));

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if(!conf.teyitciRolleri.some(rol => message.member.roles.cache.has(rol)) && !message.member.permissions.has('ADMINISTRATOR')) 
    {
    message.react(red)
    message.reply({ content: `Yetkin bulunmamakta.\Yetkili olmak istersen başvurabilirsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    
      let registerTop = await regstats.find({ guildID: message.guild.id }).sort({ top: -1 });

      if (!registerTop.length) 
      {
      message.react(red)
      message.reply({ content:"Herhangi bir kayıt verisi bulunamadı!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
      return }
      registerTop = registerTop.filter((x) => message.guild.members.cache.has(x.userID)).splice(0, 30);
      message.react(green)

      message.reply({ embeds: [embed.setDescription((registerTop.map((x, i) => `[\` ${i == 0 ? `👑` : i + 1} \`] <@${x.userID}> : **Erkek :** \`${x.erkek}\` **Kadın :** \`${x.kız}\``)).join("\n"))] });
  },
};