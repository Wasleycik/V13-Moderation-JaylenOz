const { MessageEmbed, Client, Message, MessageActionRow, MessageSelectMenu } = require("discord.js");
const Discord = require('discord.js');
const client = global.bot;
const conf = require("../../configs/sunucuayar.json");

module.exports = {
  conf: {
    aliases: ["kurallar"],
    name: "kurallar",
    help: "kurallar",
    owner: true
  },
 
    run: async (client, message, args, durum, kanal) => {
 
 if(message.author.id !== conf.botowner) return message.reply({ content: `Bu Komutu Sadece Bot Sahibi Kullanabilir.`}).then((e) => setTimeout(() => { e.delete(); }, 10000));

      message.delete()

		const embed = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`• KURALLAR •`)
.setDescription(`

__**Reklam**__

> • Sözlü reklamlar, link ile reklam, özelden reklam, resim ile reklam ve benzeri şekilde reklamlar yapmak yasaktır.

__**Küfür, Argo, Hakaret**__

> • Her kanalda küfür etmek ve argo kullanmak yasaktır.
> • Üyelere karşı hakaret etmek ve dalga geçme yasaktır.

__**Yetkililer ve Yetki**__

> • Yetki istemek yasaktır.
> • Yetkili alımları ile ilgili soru sormak yasaktır.
> • Yetkilileri boş yere @etiketlemek ve @etiketleyerek spam yapmak yasaktır.
> • Yetkililere saygılı olun.

__**Spam, Flood, Etiketleme**__

> • Spam yapmak yasaktır.
> • Bir kelimeyi sürekli bir mesajda yazmak yasaktır.
> • Flood yapmak alt alta yazmak yasaktır.
> • Bir üyeyi sürekli @etiketlemek yasaktır.

__**Din, Siyaset, Cinsellik**__

> • Din ile ilgili konuşmak, tartışmak, kullanıcı adlarını din ile ilgili koymak yasaktır.
> • Siyaset ile ilgili konuşmak, tartışmak, kullanıcı adlarını siyaset ile ilgili koymak yasaktır.
> • 18+ fotoğraflar paylaşmak ve konuşmak yasaktır.

__**Kavga, Tartışmak**__

> • Kavga etmek, kavgaya dahil olmak ve tartışmak yasaktır.
> • Herhangi bir sorununuz varsa yetkiliye danışınız

> \`Cezaları Ceza i işlem Kanalından Öğrenebilirsiniz Yada Aşşağıdaki Menüden Ceza-i İşlemler Hakkında Bilgi Edinebilirsiniz\`

`);
 
      const kısayollar = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('kısayollar')
					.setPlaceholder('Ceza-i İşlemleri Görmek için tıkla!')
					.addOptions([
						{
							label: '☢️ Sunucu Ceza Bilgi',
              description: 'Sunucu İçerisinde Bulunan Cezalar Hakkında Bilgi Alırsınız!',
							value: 'sc',
						},
						{
							label: '💭 Chat Ceza Bilgi',
              description: 'Yazılı Kanallarda Bulunan Cezalar Hakkında Bilgi Alırsınız!',
							value: 'cc',
						},						
            {
							label: '📣 Ses Ceza Bilgi',
              description: 'Sesli Kanallarda Bulunan Cezalar Hakkında Bilgi Alırsınız!',
							value: 'scb',
						},
            
					]),
			);
  
     await message.channel.send({embeds: [embed], components: [kısayollar] });

    },
 };
  client.on('interactionCreate', interaction => {
    if (!interaction.isSelectMenu()) return;

const sc = new Discord.MessageEmbed()
.setColor("RANDOM")
.setAuthor(`Sunucu Ceza Bilgilendirme Menüsü`)
.setDescription(`
**Reklam/Taciz;**

> **Uyarı Sayısı:** \`Uyarı yok, direkt ceza uygulanır!\`
> **Ceza Bilgi:** \`Dm yoluyla da olsa Her türlü iması ve şakası yasaktır!\`
> **Ceza Süresi:** \`Sınırsız Ban\`

**Kişisel Bilgileri Sunucuda Paylaşmak/İfşalamak;**

> **Uyarı Sayısı:** \`Uyarı yok, direkt ceza uygulanır!\`
> **Ceza Bilgi:** \`Şakası olmamak üzere AF'ta yoktur!\`
> **Ceza Süresi:** \`Sınırsız Ban\`

**Tehdit/Şantaj/Dolandırıcılık;**

> **Uyarı Sayısı:** \`Uyarı yok, direkt ceza uygulanır!\`
> **Ceza Bilgi:** \`Her türlü iması ve şakası yasaktır!\`
> **Ceza Süresi:** \`Sınırsız Jail\`

**Kişisel Olayları Sunucuya Yansıtmak;**

> **Uyarı Sayısı:** \`Uyarı yok, direkt ceza uygulanır!\`
> **Ceza Bilgi:** \`Şakası olmamak üzere AF'ta yoktur!\`
> **Ceza Süresi:** \`7 Gün Jail\`

**Oda/Sunucu Trollemek;**

> **Uyarı Sayısı:** \`Uyarı yok, direkt ceza uygulanıyor!\`
> **Ceza Bilgi:** \`Her türlü iması ve şakası yasaktır! (Kayıt kanallarında trol yapılıyorsa cezası sunucudan yasaklanmaktır.)\`
> **Ceza Süresi:** \`Sınırsız Jail\`


**Kişilerin İç/Dış Görünüşlerini Yargılamak/Dalga Geçmek;**

> **Uyarı Sayısı:** \`Uyarı yok, direkt ceza uygulanır!\`
> **Ceza Bilgi:** \`Her türlü iması ve şakası yasaktır!\`
> **Ceza Süresi:** \`Sınırsız Jail\`

**Sunucu Düzenini Bozmak;**

> **Uyarı Sayısı:** \`Uyarı yok, direkt ceza uygulanır!\`
> **Ceza Bilgi:** \`Her türlü iması ve şakası yasaktır!\`
> **Ceza Süresi:** \`Sınırsın Jail\`

`);
    
if (interaction.values[0] === "sc") 

{interaction.reply({ embeds:[sc] ,ephemeral: true })};

//*-----------------------------------------------------------*//

const cc = new Discord.MessageEmbed()
.setColor("RANDOM")
.setAuthor(`Chat Ceza Bilgilendirme Menüsü`)
.setDescription(`
**Küfür;**

**Uyarı Sayısı:** \`1\`
**Ceza Bilgi:** \`Her türlüsü ve her türlü iması yasaktır!\`
Ceza Süresi: \`20 Dakika Mute\`
Tekrar Süresi: \`1 Saat Mute\`
Tekrar Süresi: \`3 Saat Mute\`

Kışkırtma/Argo/Hakaret;

Uyarı Sayısı: \`1\`
Ceza Bilgi: \`Şaka dahi olsa AF yoktur!\`
Ceza Süresi: \`15 Dakika Mute\`
Tekrar Süresi: \`45 Dakika Mute\`
Tekrar Süresi: \`2 Saat Mute\`

Ailevi/Abartı Küfür;

Uyarı Sayısı: \`Uyarı yok, direkt ceza uygulanır!\`
Ceza Bilgi: \`Her türlüsü ve her türlü iması yasaktır!\`
Ceza Süresi: \`2 Saat Mute\`
Tekrar Süresi: \`6 Saat Mute\`
Tekrar Süresi: \`12 Saat Mute\`

Kavga Etmek veya Çıkarmak;

Uyarı Sayısı: \`1\`
Ceza Bilgi: \`Her türlü iması ve şakası yasaktır!\`
Ceza Süresi: \`4 Saat Mute\`
Tekrar Süresi: \`12 Saat Mute\`
Tekrar Süresi: \`24 Saat Mute\`

Din/Dil/Irk Ayrımı Yapmak/Hakaret Etmek;

Uyarı Sayısı: \`1
Ceza Bilgi: \`Her türlü iması ve şakası yasaktır!\`
Ceza Süresi: \`1 Gün Mute\`
Tekrar Süresi: \`2 Gün Jail\`
Tekrar Süresi: \`7 Gün Jail\`

Cinsel/Din/Irk/Siyaset V.b Konular Açmak;

Uyarı Sayısı: \`1\`
Ceza Bilgi: \`Her türlü iması ve şakası yasaktır!\`
Ceza Süresi: \`6 Saat Mute\`
Tekrar Süresi: \`1 Gün Mute\`
Tekrar Süresi: \`3 Gün Mute\`

Flood/Spam/Capslock/Harf Uzatma;

Uyarı Sayısı: \`1\`
Ceza Bilgi: \`Harf uzatma sınırı '16' - Şakası bile yasaktır!\`
Ceza Süresi: \`10 Dakika Mute\`
Tekrar Süresi: \`30 Dakika Mute\`
Tekrar Süresi: \`1 Saat Mute\`

Metin Kanallarını Amacı Dışında Kullanmak;

Uyarı Sayısı: \`1\`
Ceza Bilgi: \`Şakası bile yasaktır!\`
Ceza Süresi: \`10 Dakika Mute\`
Tekrar Süresi: \`30 Dakika Mute\`
Tekrar Süresi: \`1 Saat Mute\`

Yasaklı(+18, Cinsel, Kan, Vahşet) Fotoğraf Video Paylaşımı;

Uyarı Sayısı: \`Uyarı yok, direkt ceza uygulanır!\`
Ceza Bilgi: \`Her türlü iması ve şakası yasaktır!\`
Ceza Süresi: \`6 Saat mute\`
Tekrar Süresi: \`1 Gün Jail\`
Tekrar Süresi: \`7 Gün Jail\`

`);

if (interaction.values[0] === "cc") {
    {interaction.reply({ embeds:[cc] ,ephemeral: true })};
}
//*-----------------------------------------------------------*//
  
const scb = new Discord.MessageEmbed()
.setColor("RANDOM")
.setAuthor(`Voice Ceza Bilgilendirme Menüsü`)
.setDescription(`
Küfür;

Uyarı Sayısı: 1
Ceza Bilgi: Her türlüsü ve her türlü iması yasaktır!
Ceza Süresi: 20 Dakika mute
Tekrar Süresi: 1 Saat Mute
Tekrar Süresi: 3 Saat Mute

Kışkırtma/Argo/Hakaret;

Uyarı Sayısı: 1
Ceza Bilgi: Şaka dahi olsa AF yoktur!
Ceza Süresi: 15 Dakika Mute
Tekrar Süresi: 45 Dakika Mute
Tekrar Süresi: 2 Saat Mute

Ailevi/Abartı Küfür;

Uyarı Sayısı: Uyarı yok, direkt ceza uygulanır!
Ceza Bilgi: Her türlüsü ve her türlü iması yasaktır!
Ceza Süresi: 2 Saat Mute
Tekrar Süresi: 6 Saat Mute
Tekrar Süresi: 12 Saat Mute

Kavga Etmek veya Çıkarmak;

Uyarı Sayısı: 1
Ceza Bilgi: Her türlü iması ve şakası yasaktır!
Ceza Süresi: 4 Saat Mute
Tekrar Süresi: 12 Saat Mute
Tekrar Süresi: 24 Saat Mute

Din/Dil/Irk Ayrımı Yapmak/Hakaret Etmek;

Uyarı Sayısı: 1
Ceza Bilgi: Her türlü iması ve şakası yasaktır!
Ceza Süresi: 1 Gün Mute
Tekrar Süresi: 2 Gün Jail
Tekrar Süresi: 7 Gün Jail

Cinsel/Din/Irk/Siyaset V.b Konular Açmak;

Uyarı Sayısı: 1
Ceza Bilgi: Her türlü iması ve şakası yasaktır!
Ceza Süresi: 6 Saat Mute
Tekrar Süresi: 1 Gün Mute
Tekrar Süresi: 7 Gün Mute

`);

if (interaction.values[0] === "scb") {
   {interaction.reply({ embeds:[scb] ,ephemeral: true })};

};
})