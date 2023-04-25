const { MessageEmbed, Client, Message, MessageActionRow, MessageSelectMenu } = require("discord.js");
const Discord = require('discord.js');
const client = global.bot;

module.exports = {
  conf: {
    aliases: ["kbilgi"],
    name: "kayıtbilgi",
    help: "kayıtbilgi",
    owner: true
  },
 
    run: async (client, message, args, durum, kanal) => {
      if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content:  `${message.member}, Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`}).then((e) => setTimeout(() => { e.delete(); }, 10000));
      message.delete()

		const embed = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`Kayıt Sistemi Hakkında Bilgi`)
.setDescription(`

Selam Yetkili Arkadaşlar Register Komutları Hakkında Bilgileri Buradan Öğrenebilirsiniz

**.k / .e @üye İsmi Yaşı** Bu Komut Kayıt Komutudur Butonludur Kayıt Ettikten Sonra Butonlara Basıp Kişinin Cinsiyetini Seçmelisiniz 

Bu Komut Sadece 
hesperos-register
Kanalında Çalışmaktadır

**.topteyit** Sunucudaki Yetkililerin Kayıt Listesini Gösterir

**.teyitler / .kayıtsayı** Kaydettiğiniz Üyelerin Sayısını Verir

Bu Komutları Sadece 
bot-commands
 
yetkili-commands
Kanalında Kullanabilirsiniz

**.cinsiyet @üye** Bu Komut İle Yanlış Cinsiyette Kaydettiğiniz Kişilerin Cinsiyetini Kolaylık İle Değiştirmenize Yaramakta 

`);

  
     await message.channel.wsend({embeds: [embed]});

    },
 };