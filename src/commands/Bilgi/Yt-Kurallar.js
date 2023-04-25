const { MessageEmbed, Client, Message, MessageActionRow, MessageSelectMenu } = require("discord.js");
const Discord = require('discord.js');
const client = global.bot;

module.exports = {
  conf: {
    aliases: ["ytkural"],
    name: "yetkilikurallar",
    help: "yetkilikurallar",
    owner: true
  },
 
    run: async (client, message, args, durum, kanal) => {
      if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content:  `${message.member}, Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`}).then((e) => setTimeout(() => { e.delete(); }, 10000));
      message.delete()

		const embed = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・Yetkili Kurallar・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`

1 - Yetkililer Kesinlikle Yetki Dilenemez

2 - Yetkililer Başka Bir Kişiye İftira Ve Yalan Söyleyemez

3 - Yetkililer Kesinlikle Sunucu İçi Hakaret Söylemi Küfürlü Kelimeler Kullanamaz

4 - Yetkili Arkadaşlar Ben Dahi Sunucuda Tanıdığınız Birine Kıyak Torpil Vb Vb Kesinlikle Olmasın

5 - Yetkililer Verilen Terfiler Ve Yt Düşürmeleri Ne Karışamaz (Haksız Buluyorsanız Karışabilirsiniz)

6 - Orta Ve Üst Yt De Bulunan Yetkili Arkadaşlar Kesinlikle Farklı Bir Sunucuda Yetkili Olamaz Ve Farklı Bir Tag Kullanamazlar

7 - Yetkililer Kesinlikle Birbiri İle Kavga Etmemeli Ve Birbirlerine Hakaret Söylemi Aşşalayıcı Kelimeler Kullanmamalıdır Bu Durumun Yaşanması Durumunda Olaya Karışan Tüm Yetkililer Cezalandırılı Yada Yetkileri Bir Süreliğine Çekilir Ve Bir Günlük Zaman Aşımı Yerler

8 - Kayıt Kanalında Gelen Troll Kullanıcılara Hakaret Eyliminde Bulunmayıp Direkt Karantina Yani Jail Yetkisi Olan Birisini Çağırıp Karantinaya Atırmalıdırlar

**NOT BURAYI OKUMADAN GEÇME**

**SUNUCUMUZDA YETKİLİ VE YETKİ KAVGALARI KESİNLİKLE OLMAMALIDIR SUNUCUMUZUN ASIL AMACI YETKİ DEİL SOHBET MUHHABBET VE DOSTLUKTUR KURALLAR DIŞINDA HAKARET EYLİMİ GÖSTERECEK İFTİRA TACİZ TEHDİT VE KÜÇÜMSEME KESİNLİKLE YASAKTIR**

`);

  
     await message.channel.wsend({embeds: [embed]});

    },
 };