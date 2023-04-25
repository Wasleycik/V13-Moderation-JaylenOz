const { MessageEmbed, Client, Message, MessageActionRow, MessageSelectMenu } = require("discord.js");
const Discord = require('discord.js');
const client = global.bot;

module.exports = {
  conf: {
    aliases: ["cs"],
    name: "cs",
    help: "cs",
    owner: true
  },
 
    run: async (client, message, args, durum, kanal) => {
      if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content:  `${message.member}, Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`}).then((e) => setTimeout(() => { e.delete(); }, 10000));
      message.delete()

		const embed = new Discord.MessageEmbed()
.setColor("RED")
.setAuthor(`Ceza Bilgilendirme Menüsü`)
.setDescription(`
> **Sunucuya Kayıt Oldunuzdan İtibaren Ceza-i İşlemleri Okuduğunuz Farzedilir Ve Ona Göre Ceza-i İşlem Uygulanır**
> **Ceza-i İşlemleriniz Menüdeki Yazan Sürelere Göre Uygulanmaktadır**

> \`Aşşağıdaki Menüden Ceza-i İşlemler Hakkında Bilgi Edinebilirsiniz\`

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