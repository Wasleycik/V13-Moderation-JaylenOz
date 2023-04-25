const conf = require("../../configs/sunucuayar.json")
const { red } = require("../../configs/emojis.json")
const emoji = require("../../configs/emojis.json")
const moment = require("moment");
moment.locale("tr");
const { MessageEmbed, Client, Message, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");

module.exports = {
  conf: {
    aliases: ["say"],
    name: "say",
    help: "say"
  },

  run: async (client, message, args, embed) => {
    if(!conf.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) 
    {
      message.react(red)
      return
    }
    let Tag = conf.tag 

    var takviye = rakam(message.guild.premiumSubscriptionCount)
    var takviyesayı = rakam(message.guild.premiumTier)
    var TotalMember = rakam(message.guild.memberCount)
    var AktifMember = rakam(message.guild.members.cache.filter(m => m.presence && m.presence.status !== "offline").size)
    let tag = `${rakam(message.guild.members.cache.filter(u => u.user.username.includes(Tag)).size)} (\`${Tag}\`)`
    var sesli = rakam(message.guild.members.cache.filter((x) => x.voice.channel).size) 


    const row = new MessageActionRow()
		.addComponents(

    new MessageButton()
    .setCustomId("dtys")
    .setLabel("Detaylı")
    .setStyle("SECONDARY"),


  new MessageButton()
  .setCustomId("menü")
  .setLabel("♻️ Yenile")
  .setStyle("PRIMARY"),

	);

  const ozi = message.channel.send({ embeds: [embed
               .setColor('RANDOM')
               .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
               .setDescription(`
<t:${Math.floor(Date.now() / 1000)}:R> **Tarihli Sunucu Verisi**

\` ❯ \` Sunucuda **${TotalMember}** (\`${AktifMember} Aktif\`) üye var
\` ❯ \` Şu anda toplam **${sesli}** (\`+${message.guild.members.cache.filter(x => x.user.bot && x.voice.channel).size} Bot\`) kişi seslide.
\` ❯ \` Toplamda **${tag}** kişi tagımızı alarak bizi desteklemiş.
\` ❯ \` Sunucumuza **${takviye}** adet boost Basmış ${message.guild.premiumTier != "Yok" ? `(\`${message.guild.premiumTier.replace("TIER_1","1").replace("TIER_2","2").replace("TIER_3", "3")}.Seviye\`)` : ``}
`)

           ], components: [row]}).then(async (msg) => {
     
		 const filter = i => i.user.id == message.member.id 
  const collector = msg.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 120000 })

      collector.on("collect", async interaction => {

/////// Menüye Geri Dönmesi İçin
if (interaction.customId === "menü") {
    const row = new MessageActionRow()
		.addComponents(

    new MessageButton()
    .setCustomId("dtys")
    .setLabel("Detaylı")
    .setStyle("SECONDARY"),


  new MessageButton()
  .setCustomId("menü")
  .setLabel("♻️ Yenile")
  .setStyle("PRIMARY"),

	);

    var ToplamYetkili = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(conf.staffs[0])).size

    interaction.update({
      embeds: [embed
                      .setColor('RANDOM')
               .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
               .setDescription(`
<t:${Math.floor(Date.now() / 1000)}:R> **Tarihli Sunucu Verisi**

\` ❯ \` Sunucuda **${TotalMember}** (\`${AktifMember} Aktif\`) üye var
\` ❯ \` Şu anda toplam **${sesli}** (\`+${message.guild.members.cache.filter(x => x.user.bot && x.voice.channel).size} Bot\`) kişi seslide.
\` ❯ \` Toplamda **${tag}** kişi tagımızı alarak bizi desteklemiş.
\` ❯ \` Sunucumuza **${takviye}** adet boost Basmış ${message.guild.premiumTier != "0" ? `(\`${message.guild.premiumTier.replace("TIER_1","1").replace("TIER_2","2").replace("TIER_3", "3")}.Seviye\`)` : ``}
      `)

    ], components: [row]
  })
}

if (interaction.customId === "dtys") {

    const row = new MessageActionRow()
		.addComponents(

  new MessageButton()
  .setCustomId("menü")
  .setLabel("◀️ Geri")
  .setStyle("PRIMARY"),

	);

    var ToplamYetkili = message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(conf.staffs[0])).size

    interaction.update({
      embeds: [embed
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setDescription(`
       Sunucumuza **1 saat** içerisinde \`${rakam(message.guild.members.cache.filter(tmo => (new Date().getTime() - tmo.joinedTimestamp) < 1000 * 60 * 60).size)}\` kullanıcı giriş yapmış.
       Sunucumuza **1 gün** içerisinde \`${rakam(message.guild.members.cache.filter(tmo => (new Date().getTime() - tmo.joinedTimestamp) < 1000 * 60 * 60 * 24).size)}\` kullanıcı giriş yapmış.
       Sunucumuza **1 hafta** içerisinde \`${rakam(message.guild.members.cache.filter(tmo => (new Date().getTime() - tmo.joinedTimestamp) < 1000 * 60 * 60 * 24 * 7).size)}\` kullanıcı giriş yapmış.
       Sunucumuza **1 ay** içerisinde \`${rakam(message.guild.members.cache.filter(tmo => (new Date().getTime() - tmo.joinedTimestamp) < 1000 * 60 * 60 * 24 * 30).size)}\` kullanıcı giriş yapmış.
       Sunucumuzda Toplam \`${rakam(message.guild.memberCount)}\` Üye Bulunmakta.
       Sunucumuzda toplam Yetkili Sayısı: \`${ToplamYetkili}\`
       Sunucumuza Toplam \`${takviye}\` Boost Basılmış
       Sunucumuzda \`${message.guild.members.cache.filter(x => x.user.bot).size}\` Adet Bot Bulunmakta
      `)

    ], components: [row]
  })
}

 },
)})}}

function rakam(sayi) {
  var basamakbir = sayi.toString().replace(/ /g, "     ");
  var basamakiki = basamakbir.match(/([0-9])/g);
  basamakbir = basamakbir.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase();
  if (basamakiki) {
    basamakbir = basamakbir.replace(/([0-9])/g, d => {
      return {
        '0': `0`,
        '1': `1`,
        '2': `2`,
        '3': `3`,
        '4': `4`,
        '5': `5`,
        '6': `6`,
        '7': `7`,
        '8': `8`,
        '9': `9`
      }
      [d];
    })
  }
  return basamakbir;
}