const { MessageEmbed, Client, MessageActionRow, MessageButton } = require('discord.js');
const coin = require("../../schemas/coin");
const conf = require("../../configs/sunucuayar.json")
const ayar = require("../../configs/sunucuayar.json")
const toplams = require("../../schemas/toplams");
const Ayarlar = require("../../configs/sunucuayar.json");
const kayitg = require("../../schemas/kayitgorev");
const { red , green ,erkek ,kadın} = require("../../configs/emojis.json")
const isimler = require("../../schemas/names");
const regstats = require("../../schemas/registerStats");
const otokayit = require("../../schemas/otokayit");
const moment = require("moment")
moment.locale("tr")

const client = global.bot;

module.exports = {
  conf: {
    aliases: ["cinsiyet"],
    name: "cinsiyet",
    help: "cinsiyet [üye] [isim] [yaş]"
  },
run: async (client, message, args, embed, prefix) => { 

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(message.channel.id !== conf.teyitKanali) return message.reply({content: `Bu Komutu Sadece <#${conf.teyitKanali}> Kanalında Kullanabilirsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    if(!Ayarlar.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !Ayarlar.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) 
    {
    message.react(red)
    message.reply({ content:`Yetkin bulunmamakta dostum.\Yetkili olmak istersen başvurabilirsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(!uye) 
    {
    message.react(red)
    message.reply({ content:`\`${prefix}cinsiyet <@Wasley/ID>\``}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(message.author.id === uye.id) 
    {
    message.react(red)
    message.reply({ content:`Kendinin Cinsiyetini Değiştiremezsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(!uye.manageable) {message.reply({ content:`Böyle birisinin Cinsiyetini Değiştiremiyorum.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(message.member.roles.highest.position <= uye.roles.highest.position) {message.reply({ content:`Senden yüksekte olan birisini kayıt edemezsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }

    if(!uye.roles.cache.has(Ayarlar.erkekRolleri) && !uye.roles.cache.has(Ayarlar.kizRolleri)) {

    const row = new MessageActionRow()
		.addComponents(

    new MessageButton()
    .setCustomId("MAN")
    .setLabel("ERKEK")
    .setStyle("PRIMARY"),

    new MessageButton()
    .setCustomId("WOMAN")
    .setLabel("KADIN")
    .setStyle("PRIMARY"),

    new MessageButton()
    .setCustomId("İPTAL")
    .setLabel("İptal")
    .setStyle("DANGER"),

	);

    let erkekRol = conf.erkekRolleri;
    let kadinRol = conf.kizRolleri;

    const data = await isimler.findOne({ guildID: message.guild.id, userID: uye.user.id });

let wass = new MessageEmbed()
.setColor("RANDOM")
.setDescription(`
Bu Komut Yanlış Cinsiyette Kaydettiğiniz Kişinin Cinsiyetini Değiştirmeye Yaramaktadır
    `)
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
.setFooter({ text: `Lütfen 30 saniye alttaki butonlara basarak kullanıcının cinsiyetini belirleyin.` })

 let msg = await message.channel.send({ embeds: [wass], components : [row] })
 
 var filter = (button) => button.user.id === message.author.id;
 let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })

      collector.on("collect", async (button) => {
/*
if(!button.member.roles.cache.get(settings.registerPerm)) return button.reply({ content :"Bu Komutu Sadece Kayıt Yetkilileri Kullanabilir", ephemeral: true });
*/

if(button.customId === "MAN") {

  let manss = new MessageEmbed()
.setColor("BLACK")
.setAuthor({ name: message.author.tag, iconURL:  message.author.avatarURL({ dynamic: true  })})
  .setDescription(`
  ${uye.toString()} Kişisinin Cinsiyeti **ERKEK** Olarak Değiştirildi
  
  `)
  const erk = new MessageActionRow()
  .addComponents(

  new MessageButton()
  .setCustomId("MAN")
  .setLabel("Başarıyla Erkek Olarak Değiştirildi")
  .setStyle("SECONDARY")
  .setDisabled(true),
  

);

  button.update({ embeds: [manss], components: [erk]});

    await uye.roles.add(ayar.erkekRolleri)
    await uye.roles.remove(ayar.kizRolleri)

}

if(button.customId === "WOMAN") {

let wmnss = new MessageEmbed()
.setColor("BLACK")
.setAuthor({ name: message.author.tag, iconURL:  message.author.avatarURL({ dynamic: true  })})
.setDescription(`
${uye.toString()} Kişisinin Cinsiyeti **KADIN** Olarak Değiştirildi

`)
const kzk = new MessageActionRow()
  .addComponents(
  
  new MessageButton()
  .setCustomId("WOMAN")
  .setLabel("Başarıyla Kadın Olarak Değiştirildi")
  .setStyle("SECONDARY")
  .setDisabled(true),

);

button.update({ embeds: [wmnss], components: [kzk]});

    await uye.roles.add(ayar.kizRolleri)
    await uye.roles.remove(ayar.erkekRolleri)
}

if(button.customId === "İPTAL") {
if(msg) msg.delete();
button.reply({ content:`İşlem Başarıyla İptal Edildi ${green}`, embeds: [], components: [], ephemeral: true});
}

   });

  }
}   
}