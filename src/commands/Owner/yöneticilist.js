const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
  conf: {
    aliases: ["admin"],
    name: "yönetici",
    owner: true,
  },

  run: async (client, message, args) => {

        var list = [] 
        var i = 1
        await message.guild.members.cache.forEach(async m => {
            if(!m.permissions.has("ADMINISTRATOR")) return 
            await list.push(`<@${m.id}>`)
        });

        const listEmbed = new MessageEmbed()
            .setColor("BLUE")
.setAuthor({ name: `${message.guild.name} (Yönetici Listesi)`,iconURL: message.guild.iconURL({ dynamic: true }) })
            .setDescription(`Aşağıda Yönetici Yetkisine Sahip Kullanıcılar Ve Botlar Listelenmektedir. \n\n${list.map(list => `\`[${i++}.]\` ${list}`).join("\n")}`) 
        return message.reply({ embeds: [listEmbed]})

    }
}
