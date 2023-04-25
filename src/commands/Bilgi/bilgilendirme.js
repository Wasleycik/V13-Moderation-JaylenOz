const { MessageEmbed, Client, Message, MessageActionRow, MessageSelectMenu } = require("discord.js");
const Discord = require('discord.js');
const client = global.bot;
const conf = require('../../configs/sunucuayar.json');

module.exports = {
  conf: {
    aliases: ["blg","bilgilendirme"],
    name: "bilgilendirme",
    help: "bilgilendirme",
    owner: true
  },
 
    run: async (client, message, args, durum, kanal) => {
 if(message.author.id !== conf.botowner) return message.reply({ content: `Bu Komutu Sadece Bot Sahibi Kullanabilir.`}).then((e) => setTimeout(() => { e.delete(); }, 10000));
      message.delete()

		const embed = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`ʃ S Η Λ Μ Υ / BİLGİLENDİRME`)
.setDescription(`

\`••❯\` **Sunucumuzda Kayıt Olmak İçin Ses Teyit Girip Yetkililerimizi beklemen yeterlidir**

\`••❯\` **Sunucu Tagımızı alıp Bizlere Destekte Bulunabilirsin Ve Taglılara Özel Çekilişler ve Etkinliklere Katılma Şansı Yakalayabilirsin**

\`••❯\` **Sunucumuza Boost Basarak Sunucuya Destekte Bulunabilirsin Ve Bunun Yanında Boosterlara Özel Birsürü Şeyden Yaralranabilirsin**

\`••❯\` **Sunucumuzda Kesinlikle Küfür Hakaret Arga VB Şeyler Yasaktır Uyulmadığı Taktirde Mute Veya jail Cezalarına Çarptırılırsınız**

\`••❯\` **Kayıt Olduktan Sonra Kurallarımızı Ve Cezai İşlem Kanalından Cezaları Okuyup Rol alma kanallarından rollerini alabilirsin**

\`••❯\` **Primcilere / Sanal Mafyalara / Ucubelere & Toxic İnsanlara Kesinlikle Yer Yoktur**

\`Aşağıdaki Gördüğünüz Menüden Sunucu İçi Kurallarımızı Kolaylıkla Öğrenebilirsiniz\`

`);
 
      const kısayollar = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('kısayollar')
					.setPlaceholder('Sunucu Kurallarını Görmek İçin Tıkla!')
					.addOptions([
						{
							label: '📖 Kurallarımız',
              description: 'Sunucu Kurallarını Görmeni Sağlar!',
							value: 'kurallar',
						},
						{
							label: '🔷 Tag Avantajları',
              description: 'Tag Almanın Avantajları!',
							value: 'tag',
						},
						{
							label: '🔰 Boost Avantajları',
              description: 'Boost Basmanın Avantajları!',
							value: 'boost',
						},


            
					]),
			);
  
     await message.channel.send({embeds: [embed], components: [kısayollar] });

    },
 };
  client.on('interactionCreate', interaction => {
    if (!interaction.isSelectMenu()) return;


    
if (interaction.values[0] === "kurallar") {
const kurallar = new Discord.MessageEmbed()
.setColor("RANDOM")
.setAuthor(`KURALLAR`)
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

`);
interaction.reply({ embeds:[kurallar] ,ephemeral: true })

};

const tag = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`
\`\`\`Shamy Tag Avantajları\`\`\`
\`••❯\` Ailemize Özel Kanallar

\`••❯\` Çekilişlerde Daha Fazla Avantaj

\`••❯\` İstek Üzerine rol ve kanallar oluşturma hakkı

\`••❯\` Kolayca Yetki Atlama

\`••❯\` Tagımızı Alan üyelerimiz @family of shamy  Rolüne Sahip Olurlar
       Normal Üyelerden daha yukarda dururlar bu sayede

\`••❯\` Ve Taglılara Özel Çekiliş Ve etkinliklerimize Katılma Fırsatı Yakalarsınız
                                            \`\`\`Tag Nedir  ?\`\`\`
\`••❯\` Tag her sunucunun kendisini  temsil etmesi için semboller vardır bunlara Tag denir.
                                           \`\`\`Peki Nasıl alırım ?\`\`\`
\`••❯\` Ayarlar kısmından isminizin başına \`(ʃ)\` bu sembolü ekleyerek Ailemize Katıla Bilirsin


`);
    
if (interaction.values[0] === "tag") 

{interaction.reply({ embeds:[tag] ,ephemeral: true })};

const boost = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`
\`\`\`Shamy Boost Ayrıcalıkları\`\`\`
\`••❯\` Boosterlere Özel Kanallar Verilir

\`••❯\` Boost Basan Arkadaşlara @💸 Rich  Rolü Verilir Ve bu Rol Sayesinde
       Daha Ön planda Dururlar

\`••❯\` Çekilişlerde Daha Fazla Avantaj Sağlarlar

\`••❯\` İsim Değiştirme Hakkı Tanınır
       Kurallara Uyacak Şekilde Troll Ve Küfürülü İsimler Yasaktır

\`••❯\` Boosterlere Özel Etkinliklerimiz Vardır

\`••❯\` İstek Üzerine Özel Perm Renk Söz Vb gibi permler Verilir

`);
    
if (interaction.values[0] === "boost") 

{interaction.reply({ embeds:[boost] ,ephemeral: true })};

//*-----------------------------------------------------------*//


})