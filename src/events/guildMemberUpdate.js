const { MessageEmbed } = require("discord.js")
const { red, green } = require("../configs/emojis.json")
const Log = require("../configs/sunucuayar.json")
const roller = require("../schemas/rolveridb")
var moment = require('moment-timezone');
moment().tz("Europe/Istanbul").format('LL');
const client = global.bot;
module.exports = async (oldMember, newMember) => {
  await newMember.guild.fetchAuditLogs({
    type: "MEMBER_ROLE_UPDATE"
  }).then(async (audit) => {
    let ayar = audit.entries.first()
    let hedef = ayar.target
    let yapan = ayar.executor
    if (yapan.bot) return
    newMember.roles.cache.forEach(async role => {
      if (!oldMember.roles.cache.has(role.id)) {
        const emed = new MessageEmbed()
          .setAuthor({ name: hedef.tag, iconURL: hedef.displayAvatarURL({ dynamic: true }) })
          .setColor("RANDOM")
          .setDescription(`Kişinin eklenen ve alınan tüm rollerine bakmak için \`!rollog @Wasley\` komutunu kullanın \n**Rol Eklenen kişi**\n ${hedef} - **${hedef.id}** `)
          .addFields(
            { name: `${green} Rolü Ekleyen Kişi`, value: `${yapan} - **${yapan.id}**`, inline: false },
            { name: `${green} Eklenen Rol`, value: `${role} - **${role.id}**`, inline: false }
          )
          .setFooter({ text: yapan.tag, iconURL: yapan.displayAvatarURL({ dynamic: true }) })
          .setTimestamp()
          client.channels.cache.find(x => x.name.includes(Log.rollog)).wsend({ embeds: [emed]})
        roller.findOne({
          user: hedef.id
        }, async (err, res) => {
          if (!res) {
            let arr = []
            arr.push({
              rol: role.id,
              mod: yapan.id,
              user: hedef.id,
              tarih: moment(Date.now()).format("LLL"),
              state: "Ekleme"
            })
            let newData = new roller({
              user: hedef.id,
              roller: arr
            })
            newData.save().catch(e => console.log(e))
          } else {
            res.roller.push({
              rol: role.id,
              mod: yapan.id,
              user: hedef.id,
              tarih: moment(Date.now()).format("LLL"),
              state: "Ekleme"
            })
            res.save().catch(e => console.log(e))
          }
        })
      }
    });
    oldMember.roles.cache.forEach(async role => {
      if (!newMember.roles.cache.has(role.id)) {
        const emeed = new MessageEmbed()
        .setAuthor({ name: hedef.tag, iconURL: hedef.displayAvatarURL({ dynamic: true }) })
        .setColor("RANDOM")
          .setDescription(`Kişinin alınan ve eklenen tüm rollerine bakmak için \`!rollog @Wasley\` komutunu kullanın \n**Rolü Alınan kişi** \n${hedef} - **${hedef.id}**`)
          .addFields(
            { name: `${red} Rolü Alan Kişi`, value: `${yapan} - **${yapan.id}**`, inline: false },
            { name: `${red} Alınan Rol`, value: `${role} - **${role.id}**`, inline: false }
          )
          .setFooter({ text: yapan.tag, iconURL: yapan.displayAvatarURL({ dynamic: true }) })
          .setTimestamp()
          client.channels.cache.find(x => x.name.includes(Log.rollog)).wsend({ embeds: [emeed]})
        roller.findOne({
          user: hedef.id
        }, async (err, res) => {
          if (!res) {
            let arr = []
            arr.push({
              rol: role.id,
              mod: yapan.id,
              user: hedef.id,
              tarih: moment(Date.now()).format("LLL"),
              state: "Kaldırma"
            })
            let newData = new roller({
              user: hedef.id,
              roller: arr
            })
            newData.save().catch(e => console.log(e))
          } else {
            res.roller.push({
              rol: role.id,
              mod: yapan.id,
              user: hedef.id,
              tarih: moment(Date.now()).format("LLL"),
              state: "Kaldırma"
            })
            res.save().catch(e => console.log(e))
          }
        })
      }
    });
  })

let bostlog = client.channels.cache.find(x => x.name.includes(Log.boostlog));
if(oldMember.roles.cache.has(Log.boosterRolu)) {
if(!newMember.roles.cache.has(Log.boosterRolu)) bostlog.send(`<@${oldMember.id}> İsimli Kullanıcı Sunucudan Boostunu Çekti 😔`)
} else {
if(newMember.roles.cache.has(Log.boosterRolu)) bostlog.send(`<@${oldMember.id}> İsimli Kullanıcı Sunucuya Boost Basarak Bize Destek Oldu Teşşekür Ederiz 🥰`)
}

}
module.exports.conf = {
  name: "guildMemberUpdate",
};