
const Discord = require("discord.js");
const conf = require("../../configs/sunucuayar.json")
const notlar = require("../../schemas/notlar")
module.exports = {
  conf: {
    aliases: ["not"],
    name: "not",
    help: "not"
  },

  run: async (client, message, args, embed) => {

        if ( !message.member.permissions.has("VIEW_AUDIT_LOG")) return;
        let user = message.mentions.members.first()
        if(!user) return message.channel.send("Not bırakmak istediğin kullanıcıyı düzgünce belirt ve tekrar dene !", message.author, message.channel)
        if(message.member.roles.highest.rawPosition < user.roles.highest.rawPosition) return message.channel.send("Ceza notu bırakmak istediğiniz kişinin rolleri sizden yüksekte!", message.author, message.channel)
        if(user.id == message.author.id) return message.channel.send("Kendi kendine ceza notu bırakamazsın!", message.author, message.channel)
        await notlar.findOne({user: user.id}, async (err, res) => {
          if (!args.slice(1).join(" ")) return message.channel.send("Kişiye bırakmak istediğin notu yaz ve tekrar dene !", message.author, message.channel)
        if(!res) {
         let arr = []
         arr.push({not:args.slice(1).join(" "), yetkili: message.author.id })
         const newData = new notlar({
             user: user.id,
             notlar: arr
         })
         newData.save().catch(e => console.log(e))
         message.channel.send(`<@${user.id}> kişisine başarıyla not bırakıldı.\n\n:no_entry_sign: Bırakılan ceza notu: **${args.slice(1).join(" ")}**`, message.author, message.channel)
        } else {
            res.notlar.push({not:args.slice(1).join(" "), yetkili: message.author.id })
            res.save().catch(e => console.log(e))
            message.channel.send(`<@${user.id}> kişisine başarıyla not bırakıldı.\n\n:no_entry_sign: Bırakılan ceza notu: **${args.slice(1).join(" ")}**`, message.author, message.channel)
        }
        })
      }
    }