const { Discord, MessageButton, MessageActionRow } = require("discord.js");
const conf = require("../../configs/sunucuayar.json");
const { green, red, Jail } = require("../../configs/emojis.json")
const moment = require("moment");
moment.locale("tr");
const client = global.bot;

module.exports = {
  conf: {
    aliases: ["doğrulamak"],
    name: "hızlıgrş",
    owner: true,
  },

  run: async (client, message, args, embed) => {

 if(message.author.id !== conf.botowner) return message.reply({ content: `Bu Komutu Sadece Bot Sahibi Kullanabilir.`}).then((e) => setTimeout(() => { e.delete(); }, 10000));

    client.api.channels(message.channel.id).messages.post({
      data: {
        "content": `
**Merhaba Kullanıcı;**

Sunucumuza Şuan Çok Hızlı Giriş İşlemi Yapıldığı İçin Rol Dağıtımı Durduruldu.Aşşağıdaki Burona Tıklayarak Bot Hesap Olmadığını Doğrulayıp Sunucuda Gerekli Rollerini Alabilirsin.Eğer Yanlış Bir Durum Olduğunu Düşünüyorsan Sağ Taraftaki Yetkililere Yazmaktan Çekinme!

Eğer Bu Kanalı Anlık Olarak Gördüysen Kayıt İşlemine #hesperos-register Bu Kanaldan Devam Edebilirsin

İyi Günler Dileriz.

**H Ξ S P Ξ R O S**
`, "components": [{
          "type": 1, "components": [

            { "type": 2, "style": 3, "custom_id": "Doğrula", "label": "Doğrula"},

          ]
        }]
      }
    })
  },
};

client.on('interactionCreate', async interaction => {

  const member = await client.guilds.cache.get(conf.guildID).members.fetch(interaction.member.user.id)
  if (!member) return;

  if (interaction.customId === "Doğrula") {
    await interaction.reply({ content: `Doğrulama Başarılı Teyit Kanallarına Yönlendiriliyorsunuz.`, ephemeral: true });
    await member.roles.set(conf.unregRoles)
}
})