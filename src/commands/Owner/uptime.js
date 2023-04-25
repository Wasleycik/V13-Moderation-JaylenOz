
const Discord = require("discord.js")
const moment = require("moment")
require("moment-duration-format")

moment.locale("tr")
module.exports = {
  conf: {
    aliases: ["uptime"],
    name: "uptime",
    owner: true,
  },

  run: async (client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content:  `${message.member}, Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`});     
       
let up = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]"); 

message.channel.send("Bot "+up+" önce çalışmaya başladı.")
    }
}
