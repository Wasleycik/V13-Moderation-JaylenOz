const { MessageEmbed, Client, Message, MessageActionRow, MessageSelectMenu } = require("discord.js");
const Discord = require('discord.js');
const conf = require("../../configs/sunucuayar.json");
const client = global.bot;

module.exports = {
  conf: {
    aliases: ["tagblg"],
    name: "tagavantaj",
    help: "tagavantaj",
    owner: true
  },
 
    run: async (client, message, args, durum, kanal) => {
      if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content:  `${message.member}, Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`}).then((e) => setTimeout(() => { e.delete(); }, 10000));
      message.delete()

		const embed = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・Tag Avantajları・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`

:balloon: - Taglı Arkadaşlara Özel Metin Ve Ses Kanalları

:balloon: - Çekilişlerde Ve Etkinliklerde Daha Fazla Avantaj

:balloon: - Sunucumuzda Kolay Bir Şekilde Yetkili Olabilirsin

:balloon: - Tagımızı Alan Üyeler (<@&${conf.ekipRolu}>) Rolüne Sahip Olurlar Bu Sayede Diğer Üyelerden Ayrı Ve Daha Yukarda Dururlar.

:balloon: - Tag Alan Arkadaşlar İçin Özel Çekilişler Ve Etkinlikler

\`Tag Nedir  ?\`

:balloon: - Tag Her Sunucunun Kendisini Temsil Etmesi İçin Birtakım Sembol Veya Sayıdan Oluşan Bir Takım İşarettir

\`Peki Nasıl alırım ?\`

:balloon: - Ayarlar Kısmından Kullanıcı Adınıza (\`${conf.tag}\`) Ekleyerek Kolay Bir Şekilde Sende Aramıza Katılabilirsin

`);

  
     await message.channel.wsend({embeds: [embed]});

    },
 };