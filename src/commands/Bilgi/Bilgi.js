const { MessageEmbed, Client, Message, MessageActionRow, MessageSelectMenu } = require("discord.js");
const Discord = require('discord.js');
const conf = require("../../configs/sunucuayar.json");
const client = global.bot;

module.exports = {
  conf: {
    aliases: ["bilgi"],
    name: "bilgi",
    help: "bilgi",
    owner: true
  },
 
    run: async (client, message, args, durum, kanal) => {
      if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content:  `${message.member}, Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`}).then((e) => setTimeout(() => { e.delete(); }, 10000));

const kullanım = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`KOMUT KULLANIM`)
.setDescription(`

**Sunucu İçerisindeki** \`Kayıt / Ceza / Tag / Boost Vb\` **Textleri Belirtilen Kanala Yazdırır.**

**KOMUTLAR** 

> \`.bilgi boost\` : Boost Bilgilendirme Textini Atar

> \`.bilgi tag\` : Tag bilgilendirme Textini Atar

> \`.bilgi kayıt\` : Kayıt Bilgilendirem Textini Atar

> \`.bilgi ytkural\` : Yt Kurallar Textini Atar

`);
if(!args[0]) return message.channel.send({embeds: [kullanım]});


if(args[0] === 'boost') {
message.delete()
		const boostbilgi = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・Boost Avantajları・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`

:money_with_wings: - Booster Arkadaşlara Özel Ses Ve Metin Kanalları.

:money_with_wings: - Boost Basan Kişilere (<@&${conf.ekipRolu}>) Rol Ü Verilir Ve Diğer Üyelerden Daha Üstte Ve Ön Planda Dururusunuz.

:money_with_wings: - Boosterlar Çekiliş Ve Etkinliklerde Daha Fazla Şans Ve Avantaja Sahip Olurlar

:money_with_wings: - Boost Basan Arkadaşlara Sunucu İçerisinde İstediği Şekilde İsim Değiştirme Hakkı Tanınır.
(İnvite Linki / +18 İçerik / Küfürlü Kelime Karakterleri Yasaktır)

:money_with_wings: - Booster Arkadaşlara Özel Etkinlikler Ve Çekilişlerimiz Vardır

:money_with_wings: - Booster Arkadaşlara İsteği Üzerine Ve Owner Arkadaşlar Onaylar İse Özel Rol Verilebilir

`);

  
     await message.channel.wsend({embeds: [boostbilgi]});
} 

if(args[0] === 'kayıt') {
message.delete()
		const kayaıtbilgi = new Discord.MessageEmbed()
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

  
     await message.channel.wsend({embeds: [kayaıtbilgi]});

}

if(args[0] === 'tag') {
message.delete()
		const tagbilgi = new Discord.MessageEmbed()
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

  
     await message.channel.wsend({embeds: [tagbilgi]});

}

if(args[0] === 'ytkural') {
message.delete()
		const ytkurallar = new Discord.MessageEmbed()
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

  
     await message.channel.wsend({embeds: [ytkurallar]});

}


 

    },
 };

