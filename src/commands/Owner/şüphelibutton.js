const { Discord, MessageButton, MessageActionRow } = require("discord.js");
const conf = require("../../configs/sunucuayar.json");
const moment = require("moment");
moment.locale("tr");
const client = global.bot;

module.exports = {
  conf: {
    aliases: ["şüphelibutton"],
    name: "şüphelibutton",
    owner: true,
  },

  run: async (client, message, args, embed) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content:  `${message.member}, Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`});
    client.api.channels(message.channel.id).messages.post({
      data: {
        "content": `🎆 Aşağıda ki düğmeden hesabınızın 7 gün süresini dolurmasına kalan süresini görüntüleyebilirsiniz ve tıklayarak şüpheliden çıkabilirsiniz.`, "components": [{
          "type": 1, "components": [

            { "type": 2, "style": 4, "custom_id": "süpheli", "label": "Hesap Kontrol"},

          ]
        }]
      }
    })
  },
};

client.on('interactionCreate', async interaction => {

  const member = await client.guilds.cache.get(conf.guildID).members.fetch(interaction.member.user.id)
  if (!member) return;

  if (interaction.customId === "süpheli") {
    if (!conf.fakeAccRole.some(x => member.roles.cache.has(x))) {
    await interaction.reply({ content: `Şüpheli Hesap değilsiniz.`, ephemeral: true });
  return }

 let guvenilirlik = Date.now() - member.user.createdTimestamp < 1000 * 60 * 60 * 24 * 7;

 if (guvenilirlik) {
  await interaction.reply({ content: `Hesabınız (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>) tarihinde oluşturulmuş şüpheli kategorisinden çıkmaya uygun değildir.`, ephemeral: true });
} else {
  await interaction.reply({ content: `7 gün süreniz dolduğu için karantinadan çıkarıldınız.`, ephemeral: true });
  await member.roles.set(conf.unregRoles)
} 
}
})
