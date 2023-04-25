const conf = require("../../configs/sunucuayar.json")
const Discord = require("discord.js");
const { max } = require("moment");

module.exports = {
  conf: {
    aliases: ["dağıt"],
    name: "dağıt",
    owner: true,
  },

  run: async (client, message, args) => {


        let voiceChannel = message.member.voice.channelId;
        if (!voiceChannel) return message.reply("Bir ses kanalında olmalısın!");
        let publicRooms = message.guild.channels.cache.filter(c => c.parentId === conf.publicParents && c.type === "GUILD_VOICE");
        [...message.member.voice.channel.members.values()].forEach((m, index) => {
          setTimeout(() => {
             if (m.voice.channelId !== voiceChannel) return;
             m.voice.setChannel(publicRooms.random().id);
          }, index*1000);
        });
        message.reply(`\`${message.member.voice.channel.name}\` ses kanalında bulunan üyeler public kanallara dağıtılmaya başlandı!`);
      
    }
}