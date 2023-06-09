const moment = require("moment");
const cezapuan = require("../../schemas/cezapuan")
const ceza = require("../../schemas/ceza")
moment.locale("tr");
const conf = require("../../configs/sunucuayar.json")
const messageUserChannel = require("../../schemas/messageUserChannel");
module.exports = {
  conf: {
    aliases: ["cezapuan","cp"],
    name: "cezapuan",
    help: "cezapuan"
  },

  run: async (client, message, args, embed) => {
if (!message.member.permissions.has("BAN_MEMBERS") &&  !conf.banHammer.some(x => message.member.roles.cache.has(x))) { message.channel.send({ content:"Yeterli yetkin bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
message.react("❌")
return 
}
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
if (!member) { message.channel.send({ content:"Böyle bir kullanıcı bulunamadı!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
message.react("❌")
return 
}
const cezaData = await ceza.findOne({ guildID: conf.guildID, userID: member.id });
const cezapuanData = await cezapuan.findOne({ userID: member.user.id });
message.react("✅")
message.reply({ content:`${member} kişisinin toplamda \`${cezapuanData ? cezapuanData.cezapuan : 0}\` ceza puanı ve (Toplam **${cezaData ? cezaData.ceza.length : 0}** Ceza) olarak gözükmekte!`})
},
};

