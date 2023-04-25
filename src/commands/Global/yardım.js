const { MessageEmbed, Client, Message, MessageActionRow, MessageSelectMenu } = require("discord.js");
const Discord = require('discord.js');
const client = global.bot;
const conf = require("../../configs/sunucuayar.json");
const { star } = require("../../configs/emojis.json")

module.exports = {
  conf: {
    aliases: ["yardım2","y2"],
    name: "help",
    help: "yardim",
    owner: true
  },
 
  async run(client, message, args, embed) {

if(!message.member.permissions.has("ADMINISTRATOR") & message.channel.id !== conf.botcommandschannel) return message.reply({content: `Bu Komutu Sadece <#${conf.botcommandschannel}> Kanalında Kullanabilirsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000));

if(!message.member.permissions.has("ADMINISTRATOR")) return;
embed.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) }).setTimestamp().setColor(message.author.displayHexColor).setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })}).setThumbnail(message.guild.iconURL({ dynamic: true }))
embed.setDescription(`Sunucunun Yardım Menüsüne Hoşgeldin
Aşağıdaki Menüden Görmek İstediğiniz Katagoriyi Seçiniz

Şu Anda Toplam \`${client.commands.size}\` Tane Komut Bulunmakta

Komut bilgisini detaylı öğrenmek için \`.yardım <Komut Ismi>\``)
	  const row = new Discord.MessageActionRow()
  .addComponents(
	  new Discord.MessageSelectMenu()
		  .setCustomId('yardim')
		  .setPlaceholder('Yardım kategorisini listeden seçin!')
		  .addOptions([
{
							label: 'Davet Komutları',
							description: 'Davet Komutlar kategorisinin yardım bilgileri için tıkla!',
							value: 'invite',
						},
						{
							label: 'Genel Komutları',
							description: 'Genel Komutlar kategorisinin yardım bilgileri için tıkla!',
							value: 'genel',
						},						
            {
							label: 'Kayıt Komutları',
							description: 'Kayıt Komutlar kategorisinin yardım bilgileri için tıkla!',
							value: 'kayıt',
						},
            {
							label: 'Kurucu Komutları',
							description: 'Kurucu Komutlar kategorisinin yardım bilgileri için tıkla!',
							value: 'kurucu',
						},
            {
							label: 'Moderasyon Komutları',
							description: 'Moderasyon Komutlar kategorisinin yardım bilgileri için tıkla!',
							value: 'moderasyon',
						},
            {
							label: 'Stat Komutları',
							description: 'Stat Komutlar kategorisinin yardım bilgileri için tıkla!',
							value: 'stat',
						},
            {
							label: 'Yetkili Komutları',
							description: 'Yetkili Komutlar kategorisinin yardım bilgileri için tıkla!',
							value: 'yetkili',
						},
						{
							label: 'Guard Komutları',
							description: 'Guard Komutlar kategorisinin yardım bilgileri için tıkla!',
							value: 'guard',
						},
		  ]),
  );
let msg = await message.channel.send({ components: [row], embeds: [embed] })
var filter = (menu) => menu.user.id === message.author.id;
const collector = msg.createMessageComponentCollector({ filter, max: 2, time: 30000 })
  

client.on('interactionCreate', interaction => {
if (!interaction.isSelectMenu()) return;
if (interaction.values[0] === "invite") {
    interaction.reply({ content : `
\`\`\`
- .davetim
- .invites
- .invtop
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "guard") {
    interaction.reply({ content : `
\`\`\`
- /backup
- /koruma
- /kanal-kur
- /restart
- /rol-kur
- /safe
- .işlemler
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "genel") {
    interaction.reply({ content : `
\`\`\`
- .afk (afk [sebep])
- .avatar (avatar [UserID/@User])
- .banner (banner [UserID/@User])
- .booster (boost [nick])
- .profil (profil / [@üye])
- .tag (tag)
- .yardım (yardım)
- .çek (çek [@üye])
- .git (git [@üye])
- .market (coinmarket) 
- .satınal (satınal) 
- .görev (görev [user])
- .coin [ekle/sil/gönder] [kullanıcı] [sayı]
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "kayıt") {
    interaction.reply({ content : `
\`\`\`
- .taglı-alım [aç/kapat]
- .kayıt (kayıt [user] İsim Yaş)
- .bağlantı-kes ([user])
- .isim (isim [user] [name | age])
- .isimler (isimler [user])
- .top-teyit (top-teyit)
- .unregister (unregister [user])
\`\`\`
`, ephemeral: true })
};
  
if (interaction.values[0] === "kurucu") {
    interaction.reply({ content : `
\`\`\`
- .kilit ([aç/kapat])
- .tagsay (tagsay)
- .banliste (banlist)
- .rolbilgi (@role)
- .cezapuansil ([user])
- .isimsil ([user])
- .sicilsil ([user])
- .yasaklı-tag (ekle/sil/liste [yasaklıtag])
- .ekip ([ekle-sil-liste-kontrol-bilgi])
- .ekip-ses ([@ekiprol])
- .yetkilises (yetkilises)
- .yoklama (toplantı)
- .allmute (allmute [kanal])
- .allunmute (allunmute [kanal])
- .toplutaşı (toplutaşı [kanal])
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "moderasyon") {
    interaction.reply({ content : `
\`\`\`
- .kilit ([aç/kapat])
- .tagsay (tagsay)
- .banliste (banlist)
- .rolbilgi (@role)
- .cezapuansil ([user])
- .isimsil ([user])
- .sicilsil ([user])
- .yasaklı-tag (ekle/sil/liste [yasaklıtag])
- .ekip ([ekle-sil-liste-kontrol-bilgi])
- .ekip-ses ([@ekiprol])
- .yetkilises (yetkilises)
- .yoklama (toplantı)
- .allmute (allmute [kanal])
- .allunmute (allunmute [kanal])
- .toplutaşı (toplutaşı [kanal])
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "stat") {
    interaction.reply({ content : `
\`\`\`
- .stat (stat [user])
- .top (top)
- .nerede (sesbilgi)
- .topcoin (topcoin)
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "yetkili") {
    interaction.reply({ content : `
\`\`\`
- .ystat (yetkim [user])
- .cezapuan (cezapuan [user])
- .kes (kes [user])
- .rolsüz (rolsüz)
- .say (say)
- .snipe (snipe)
- .sesli (sesli)
- .sicil (sicil [user])
- .yetkili (yetkili [user])
- .taglı (taglı [user])
- .rol (r [al/ver] [user] [@role])
- .rollog (rollog [user])
- .seslisay (sesli)
- .sil (sil [miktar])
\`\`\`
`, ephemeral: true })
};

})
}
}