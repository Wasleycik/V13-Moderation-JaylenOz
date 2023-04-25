const conf = require("../configs/sunucuayar.json");
const messageUser = require("../schemas/messageUser");
const messageGuild = require("../schemas/messageGuild");
const guildChannel = require("../schemas/messageGuildChannel");
const userChannel = require("../schemas/messageUserChannel");
const coin = require("../schemas/coin");
const client = global.bot;
const nums = new Map();
const mesaj = require("../schemas/mesajgorev");
const dolar = require("../schemas/dolar")


module.exports = async (message) => {
  if (message.author.bot || !message.guild || message.content.startsWith(conf.prefix)) return;

  await messageUser.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { topStat: 1, dailyStat: 1, weeklyStat: 1, twoWeeklyStat: 1 } }, { upsert: true });
  await messageGuild.findOneAndUpdate({ guildID: message.guild.id }, { $inc: { topStat: 1, dailyStat: 1, weeklyStat: 1, twoWeeklyStat: 1 } }, { upsert: true });
  await guildChannel.findOneAndUpdate({ guildID: message.guild.id, channelID: message.channel.id }, { $inc: { channelData: 1 } }, { upsert: true });
  await userChannel.findOneAndUpdate({ guildID: message.guild.id,  userID: message.author.id, channelID: message.channel.id }, { $inc: { channelData: 1 } }, { upsert: true });
  if(dolar) {
  if(message.channel.id !== conf.chatChannel) return;
  await dolar.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { dolar: conf.messageDolar } }, { upsert: true });
  }
const mesajData = await mesaj.findOne({ guildID: message.guild.id, userID: message.author.id });
if(mesajData){
if(message.channel.id !== conf.chatChannel ) return;
await mesaj.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { mesaj: 1 } }, { upsert: true });
}
};

module.exports.conf = {
  name: "messageCreate",
};
