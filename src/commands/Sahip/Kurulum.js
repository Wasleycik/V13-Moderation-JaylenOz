const { Database } = require("ark.db");
const { MessageEmbed, Client, Message, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");
const Discord = require('discord.js');
const client = global.bot;
const db = new Database("/src/configs/emojis.json");
const conf = require('../../configs/sunucuayar.json');
module.exports = {
  conf: {
    aliases: ["kurulum"],
    name: "kurulum",
    owner: true,
  },

  run: async (client, message, args) => {
    if(message.author.id !== conf.botowner) return message.reply(":x: Bot developerı olmadığın için kurulumu yapamazsın.").then((e) => setTimeout(() => { e.delete(); }, 10000));
		const embed = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`Sunucu Kurulum Paneli`)
.setDescription(`
> **Aşşağıdaki Buttonları Kullanarak Sunucuya Rol / Kanal / Emoji Kurabilirsin**

> \`1 Dakika İçerisinde Kullanmalısın Otomatikman Silinmektedir!\`

`);
  const row = new MessageActionRow()
  .addComponents(
  new MessageButton()
  .setCustomId("rol")
  .setLabel("🛑 Rol Kur")
  .setStyle("SECONDARY"),

  new MessageButton()
  .setCustomId("kanal")
  .setLabel("🛑 Kanal Kur")
  .setStyle("SECONDARY"),

  new MessageButton()
  .setCustomId("emoji")
  .setLabel("🛑 Emoji Kur")
  .setStyle("SECONDARY"),

  new MessageButton()
  .setCustomId("iptal")
  .setLabel("❌ İptal Et")
  .setStyle("SECONDARY"),
  );



      let msg = await message.channel.send({embeds: [embed], components: [row]}).then(async (msg) => {
     
		 const filter = i => i.user.id == message.member.id 
  const collector = msg.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 120000 })

      collector.on("collect", async interaction => {

 if (interaction.customId === "rol") {

		const embed2 = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`Sunucu rOL Kurulum Paneli`)
.setDescription(`
> **Aşşağıdaki Buttonları Kullanarak Sunucuya Rol istediğin Rolleri Kurabilirsin**

> \`1 Dakika İçerisinde Kullanmalısın Otomatikman Silinmektedir!\`

`);
  const row2 = new MessageActionRow()
  .addComponents(
  new MessageButton()
  .setCustomId("hepsi")
  .setLabel("🛑 Hepsini")
  .setStyle("SECONDARY"),

  new MessageButton()
  .setCustomId("iliski")
  .setLabel("🛑 İlişki")
  .setStyle("SECONDARY"),

  new MessageButton()
  .setCustomId("oyun")
  .setLabel("🛑 Oyun")
  .setStyle("SECONDARY"),

  new MessageButton()
  .setCustomId("burç")
  .setLabel("🛑 Burç")
  .setStyle("SECONDARY"),

  new MessageButton()
  .setCustomId("iptal")
  .setLabel("❌ İptal Et")
  .setStyle("SECONDARY"),
  );

interaction.update({embeds: [embed2], components: [row2]})

}
 if (interaction.customId === "iliski") {
await interaction.deferUpdate();
await interaction.guild.roles.create({
            name: "▬▬▬・✦・▬▬▬▬",
            color: "#000000",
            permissions: "0",
            reason: "İlişki Rol Ayraç Kuruldu."
          });

await interaction.guild.roles.create({
            name: "❤️ Sevgilim Var",
            color: "#e73084",
            permissions: "0",
            reason: "Sevgilim Var Rolü Oluşturuldu."
          });

await interaction.guild.roles.create({
            name: "💔 Sevgilim Yok",
            color: "#b0d0f7",
            permissions: "0",
            reason: "Sevgilim Yok Rolü Oluşturuldu."
          });

await interaction.guild.roles.create({
            name: "🤍 No Manit No Dırdır",
            color: "#eeebeb",
            permissions: "0",
            reason: "Sevgili Yapmıyorum Rolü Oluşturuldu."
          });

await interaction.guild.roles.create({
            name: "🏳️‍🌈 LGBT",
            color: "#ff00bc",
            permissions: "0",
            reason: "LGBT Rolü Oluşturuldu."
          });

}

        if (interaction.customId === "hepsi") {
          await interaction.deferUpdate();

await interaction.guild.roles.create({
            name: "▬▬▬・✦・▬▬▬▬",
            color: "#000000",
            permissions: "0",
            reason: "Ping / Duyuru Rol Ayraç Kuruldu."
          });

await interaction.guild.roles.create({
            name: "🎉 Çekiliş Katılımcısı",
            color: "#f89292",
            permissions: "0",
            reason: "Çekiliş Katılımcısı Rolü Oluşturuldu."
          });

await interaction.guild.roles.create({
            name: "🎯 Etkinlik Katılımcısı",
            color: "#f89292",
            permissions: "0",
            reason: "Etkinlik Katılımcısı Rolü Oluşturuldu."
          });

await interaction.guild.roles.create({
            name: "▬▬▬・✦・▬▬▬▬",
            color: "#000000",
            permissions: "0",
            reason: "İlişki Rol Ayraç Kuruldu."
          });

await interaction.guild.roles.create({
            name: "❤️ Sevgilim Var",
            color: "#e73084",
            permissions: "0",
            reason: "Sevgilim Var Rolü Oluşturuldu."
          });

await interaction.guild.roles.create({
            name: "💔 Sevgilim Yok",
            color: "#b0d0f7",
            permissions: "0",
            reason: "Sevgilim Yok Rolü Oluşturuldu."
          });

await interaction.guild.roles.create({
            name: "🤍 No Manit No Dırdır",
            color: "#eeebeb",
            permissions: "0",
            reason: "Sevgili Yapmıyorum Rolü Oluşturuldu."
          });

await interaction.guild.roles.create({
            name: "🏳️‍🌈 LGBT",
            color: "#ff00bc",
            permissions: "0",
            reason: "LGBT Rolü Oluşturuldu."
          });
         await interaction.guild.roles.create({
            name: "▬▬▬・✦・▬▬▬▬",
            color: "#000000",
            permissions: "0",
            reason: "Üye Durma Süresi Ayracı Oluşturuldu."
          });

         await interaction.guild.roles.create({
            name: "🏆 24 Month Member",
            color: "#8402b1",
            permissions: "0",
            reason: "24 Month Member Rolü Oluşturuldu."
          });

         await interaction.guild.roles.create({
            name: "🥇 18 Month Member",
            color: "#795596",
            permissions: "0",
            reason: "18 Month Member Rolü Oluşturuldu."
          });

         await interaction.guild.roles.create({
            name: "🥈 12 Month Member",
            color: "#c02e66",
            permissions: "0",
            reason: "12 Month Member Rolü Oluşturuldu."
          });

         await interaction.guild.roles.create({
            name: "🥉 9 Month Member",
            color: "#1cbbf8",
            permissions: "0",
            reason: "9 Month Member Rolü Oluşturuldu."
          });

         await interaction.guild.roles.create({
            name: "🏅 6 Month Member",
            color: "#048b25",
            permissions: "0",
            reason: "6 Month Member Rolü Oluşturuldu."
          });

         await interaction.guild.roles.create({
            name: "🎖 3 Month Member",
            color: "#bcd8a9",
            permissions: "0",
            reason: "3 Month Member Rolü Oluşturuldu."
          });

         await interaction.guild.roles.create({
            name: "🎖 1 Month Member",
            color: "#e0b608",
            permissions: "0",
            reason: "1 Month Member Rolü Oluşturuldu."
          });

         await interaction.guild.roles.create({
            name: "▬▬▬・✦・▬▬▬▬",
            color: "#000000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });
  
          await interaction.guild.roles.create({
            name: "🍓",
            color: "#ff0000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🍊",
            color: "#ff8b00",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🍇",
            color: "#4f00ff",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🍑",
            color: "#ff00d1",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🥑",
            color: "#56ff00",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });


          await interaction.guild.roles.create({
            name: "▬▬▬・✦・▬▬▬▬",
            color: "#000000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♏ | Akrep",
            color: "#0a0a0a",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♉ | Boğa",
            color: "#0a0a0a",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♍ | Başak",
            color: "#0a0a0a",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♊ |İkizler",
            color: "#0a0a0a",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♒ | Kova",
            color: "#0a0a0a",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♈ | Koç",
            color: "#0a0a0a",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♋ | Yengeç",
            color: "#0a0a0a",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♑ | Oğlak",
            color: "#0a0a0a",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♎ | Terazi",
            color: "#0a0a0a",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♌ | Aslan",
            color: "#0a0a0a",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♓ | Balık",
            color: "#0a0a0a",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "♐ | Yay",
            color: "#0a0a0a",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "▬▬▬・✦・▬▬▬▬",
            color: "#000000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🎮 CS:GO",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🎮 League of Legends",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🎮 Valorant",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🎮 Gta V",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🎮 PUBG",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "🎮 Fortnite",
            color: "#ffa7a7",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          await interaction.guild.roles.create({
            name: "▬▬▬・✦・▬▬▬▬",
            color: "#000000",
            permissions: "0",
            reason: "Rol Seçim Menüsü için Lazımki kurduk sanane aq."
          });

          msg.reply({ content: `Menü için gerekli Rollerin kurulumu başarıyla tamamlanmıştır.\n**Not:** Renk rollerini booster ve taglı rollerinin üstüne taşıyınız.`, ephemeral: true })

        }

        if (interaction.customId === "kanal") {
          await interaction.deferUpdate();

          const cezaiislem = await interaction.guild.channels.create('Ceza-i işlemler', {
            type: 'GUILD_CATEGORY',
            permissionOverwrites: [{
              id: interaction.guild.id,
              deny: ['VIEW_CHANNEL'],
            }]
          });

await interaction.guild.channels.create('cezapuan', {
            type: 'GUILD_TEXT',
            parent: cezaiislem.id
          });
          await interaction.guild.channels.create('mute-bilgi', {
            type: 'GUILD_TEXT',
            parent: cezaiislem.id
          });
          await interaction.guild.channels.create('uyarı-bilgi', {
            type: 'GUILD_TEXT',
            parent: cezaiislem.id
          });
          await interaction.guild.channels.create('karantina-bilgi', {
            type: 'GUILD_TEXT',
            parent: cezaiislem.id
          });
          await interaction.guild.channels.create('ban-bilgi', {
            type: 'GUILD_TEXT',
            parent: cezaiislem.id
          });


          const parent = await interaction.guild.channels.create('SUNUCU LOGLAR', {
            type: 'GUILD_CATEGORY',
            permissionOverwrites: [{
              id: interaction.guild.id,
              deny: ['VIEW_CHANNEL'],
            }]
          });

          await interaction.guild.channels.create('message-log', {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create('taglı-log', {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create('voice-log', {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create('rank-log', {
            type: 'GUILD_TEXT',
            parent: parent.id

          });
          await interaction.guild.channels.create('market-log', {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create('rol-log', {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create('yetki-log', {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create('komut-log', {
            type: 'GUILD_TEXT',
            parent: parent.id
          });
          await interaction.guild.channels.create('hata-log', {
            type: 'GUILD_TEXT',
            parent: parent.id
          });


          msg.reply({ content: `Log Kanallarının kurulumu başarıyla tamamlanmıştır.`, ephemeral: true })

        }

        if (interaction.customId === "emoji") {
          await interaction.deferUpdate();

          const emojis = [
              { name: "wasley_hg1", url: "https://cdn.discordapp.com/emojis/1038421343244386355.gif?size=44" },
              { name: "wasley_hg2", url: "https://cdn.discordapp.com/emojis/1066646796920696882.gif?size=44" },
              { name: "wasley_hg3", url: "https://cdn.discordapp.com/emojis/1066646620692816002.gif?size=44" },
              { name: "wasley_hg4", url: "https://cdn.discordapp.com/emojis/1066647932713062510.png?size=96" },
              { name: "wasley_hg5", url: "https://cdn.discordapp.com/emojis/1066646324549800006.gif?size=44" },
              { name: "wasley_hg6", url: "https://cdn.discordapp.com/emojis/1038421138025484388.gif?size=44" },
              { name: "wasley_red", url: "https://cdn.discordapp.com/emojis/1066651303083774003.png?size=96" },
              { name: "wasley_green", url: "https://cdn.discordapp.com/emojis/1066464649614200962.png?size=96" },
              { name: "wasley_join", url: "https://cdn.discordapp.com/emojis/1041008845977309225.png?size=96" },
              { name: "wasley_leave", url: "https://cdn.discordapp.com/emojis/1041008912532520990.png?size=96" },
              { name: "star", url: "https://cdn.discordapp.com/emojis/993492411839942726.gif?size=44" },
              { name: "rewards", url: "https://cdn.discordapp.com/emojis/899680521951514734.gif?size=44" },
              { name: "revusome", url: "https://cdn.discordapp.com/emojis/901441419363889172.png?size=96" },
              { name: "miniicon", url: "https://cdn.discordapp.com/emojis/899339236724068372.png?size=44" },
              { name: "staff", url: "https://cdn.discordapp.com/emojis/997678706879365201.png?size=96" },
              { name: "Muhabbet", url: "https://cdn.discordapp.com/emojis/899339317896429641.gif?size=44" },
              { name: "galp", url: "https://cdn.discordapp.com/emojis/987455732112826469.png?size=96" },
              { name: "kirmiziok", url: "https://cdn.discordapp.com/emojis/901441275381817426.gif?size=44" },
              { name: "Revuu", url: "https://cdn.discordapp.com/emojis/901441322152493066.gif?size=44" },
              { name: "Mute", url: "https://cdn.discordapp.com/emojis/1010291342317981807.png?size=44" },
              { name: "Cezaa", url: "https://cdn.discordapp.com/emojis/997855626250162217.png?size=44" },
              { name: "Jail", url: "https://cdn.discordapp.com/emojis/903566151727087686.png?size=96" },
              { name: "Book", url: "https://cdn.discordapp.com/emojis/903564842978402304.png?size=96" },
              { name: "Kilit", url: "https://cdn.discordapp.com/emojis/903564832387760128.png?size=96" },
              { name: "Mute2", url: "https://cdn.discordapp.com/emojis/899339342986739802.png?size=96" },
              { name: "Unmute", url: "https://cdn.discordapp.com/emojis/899339351283105812.png?size=96" },
              { name: "fill", url: "https://cdn.discordapp.com/emojis/899339288636956752.gif?size=44" },
              { name: "empty", url: "https://cdn.discordapp.com/emojis/899340041229307966.png?size=44" },
              { name: "fillStart", url: "https://cdn.discordapp.com/emojis/899339278000222249.gif?size=44" },
              { name: "emptyEnd", url: "https://cdn.discordapp.com/emojis/899340050226118737.png?size=44" },
              { name: "fillEnd", url: "https://cdn.discordapp.com/emojis/862062197776580618.gif?size=96" },
              { name: "xp", url: "https://cdn.discordapp.com/emojis/838468875825446922.gif?v=1" },
              { name: "gulucuk", url: "https://cdn.discordapp.com/emojis/838469248602865735.png?v=1" },
              { name: "mesaj2", url: "https://cdn.discordapp.com/emojis/838468915814334464.gif?v=1" },
              { name: "altin", url: "https://cdn.discordapp.com/emojis/836694825243508756.gif?v=1" },
              { name: "altin2", url: "https://cdn.discordapp.com/emojis/836694821128372224.gif?v=1" },
              { name: "voice", url: "https://cdn.discordapp.com/emojis/834211738748583956.png?v=1" },
              { name: "channel", url: "https://cdn.discordapp.com/emojis/997876707874844772.png?v=1" },
              { name: "spotify", url: "https://cdn.discordapp.com/emojis/1033477527974461440.gif?size=44" },
              { name: "netflix", url: "https://cdn.discordapp.com/emojis/941993358518284298.webp?size=96&quality=lossless" },
              { name: "exxen", url: "https://cdn.discordapp.com/emojis/900396713116835900.png?size=44" },
              { name: "blutv", url: "https://cdn.discordapp.com/emojis/900396707362246666.png?size=44" },
              { name: "nitro", url: "https://cdn.discordapp.com/emojis/941993742934614047.webp?size=96&quality=lossless" },
              { name: "youtube", url: "https://cdn.discordapp.com/emojis/941993963013935115.gif?size=96&quality=lossless" },
              { name: "slotgif", url: "https://cdn.discordapp.com/emojis/1006538933372473465.gif?v=1" },
              { name: "slot_1", url: "https://cdn.discordapp.com/emojis/1006528752433516615.png?size=44" },
              { name: "slot_2", url: "https://cdn.discordapp.com/emojis/1006528750525087754.png?size=44" },
              { name: "slot_3", url: "https://cdn.discordapp.com/emojis/1006528765033197608.png?size=44" },
              { name: "sifir", url: "https://cdn.discordapp.com/emojis/943146617043828788.gif?size=96&quality=lossless" },
              { name: "bir", url: "https://cdn.discordapp.com/emojis/943147988375715861.gif?size=96&quality=lossless" },
              { name: "iki", url: "https://cdn.discordapp.com/emojis/943148029639278622.gif?size=96&quality=lossless" },
              { name: "uc", url: "https://cdn.discordapp.com/emojis/943148080025460766.gif?size=96&quality=lossless" },
              { name: "dort", url: "https://cdn.discordapp.com/emojis/943148147327262751.gif?size=96&quality=lossless" },
              { name: "bes", url: "https://cdn.discordapp.com/emojis/943148227753033809.gif?size=96&quality=lossless" },
              { name: "alti", url: "https://cdn.discordapp.com/emojis/943148271738707988.gif?size=96&quality=lossless" },
              { name: "yedi", url: "https://cdn.discordapp.com/emojis/943148318165442700.gif?size=96&quality=lossless" },
              { name: "sekiz", url: "https://cdn.discordapp.com/emojis/943148360368537620.gif?size=96&quality=lossless" },
              { name: "dokuz", url: "https://cdn.discordapp.com/emojis/943148402655510620.gif?size=96&quality=lossless" },
              { name: "partner", url: "https://cdn.discordapp.com/emojis/997855620290068581.png?size=44" },
              { name: "online", url: "https://cdn.discordapp.com/emojis/901829756603998269.webp?size=96&quality=lossless" },
              { name: "duyuru", url: "https://cdn.discordapp.com/emojis/688032250729857070.gif?size=96" }
            ]
          emojis.forEach(async (x) => {
              if (interaction.guild.emojis.cache.find((e) => x.name === e.name)) return db.set(x.name, interaction.guild.emojis.cache.find((e) => x.name === e.name).toString());
              const emoji = await interaction.guild.emojis.create(x.url, x.name);
              await db.set(x.name, emoji.toString()); 
              msg.reply({ content: `Emoji kurulumu başarıyla tamamlanmıştır.`, ephemeral: true })

            })
        }

if(interaction.customId === "iptal") {
  if(msg) msg.delete().catch({})
  interaction.reply({ content :"İşlem Başarıyla İptal Edildi.", ephemeral: true })
}
  
      })

    }
 )}}