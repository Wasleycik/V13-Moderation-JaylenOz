const conf = require("../configs/sunucuayar.json")
const messageUser = require("../schemas/messageUser");
const sex = require("../schemas/leaderboard");
const moment = require("moment");
const { MessageEmbed } = require("discord.js");
const client = global.bot;

module.exports = async () => {
   const messageUsersData = await messageUser.find({ guildID: conf.guildID }).sort({ topStat: -1 });
   const messageUsers = messageUsersData.splice(0, 30).map((x, index) => `[\`${index+1}.\`] <@${x.userID}> **:** \`${Number(x.topStat).toLocaleString()} mesaj\``).join(`\n`);
   
   let data = await sex.findOne({ guildID: conf.guildID })
   if (!data || data && !data.messageListID.length) return

const sunucuisim = client.guilds.cache.get(conf.guildID).name
 let LeaderBoard = await client.channels.cache.find(x => x.name.includes(conf.leaderboard)).messages.fetch(data.messageListID);
  setInterval(() => {
  ChatLeaderBoard()
  }, 600000);
  function ChatLeaderBoard() {  

  const msgList = (`${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`)

  let MessageEdit = new MessageEmbed()
  .setColor("#2f3136")
  .setAuthor({ name: client.guilds.cache.get(conf.guildID).name, iconURL: client.guilds.cache.get(conf.guildID).iconURL({dynamic:true})})
  .setDescription(`🎉 Aşağı da \`${sunucuisim}\` sunucusunun genel mesaj sıralaması listelenmektedir.\n\n${msgList}\n\nGüncellenme Tarihi: <t:${Math.floor(Date.now() / 1000)}:R>`)
  if(LeaderBoard) LeaderBoard.edit({ embeds: [MessageEdit]})

}
}
module.exports.conf = {
  name: "ready",
};