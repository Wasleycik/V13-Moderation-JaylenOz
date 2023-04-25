const Discord = require("discord.js");
const db = require('quick.db');
const client = global.bot;

module.exports = {
  conf: {
    aliases: ["capslock"],
    name: "capslock",
    owner: true,
  },

  run: async (client, message, args) => {
if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content: new Discord.MessageEmbed().setColor('0x36393E' ).setDescription(`
:x: Bu Komutu Kullanabilmek İçin Yönetici İznine Sahip Olmalısın.
`)})
if(!args[0]) return message.channel.send({ content: new Discord.MessageEmbed().setColor('0x36393E' ).setDescription(`
:x: !caps-engel aç/kapat Yazmalısın.
`)})

let caps = await db.fetch(`capsengel_${message.guild.id}`)
if(args[0] === 'aç') {
    if(caps) {
db.set(`capsengel_${message.guild.id}`, `acik`)
const aç = new Discord.MessageEmbed()
.setColor('0x36393E')
.setDescription(`✅ Caps Lock Engel Sistemi Zaten Açık!`)
message.channel.send({ embeds: [aç] })
message.react('✅')
} else {
    db.set(`capsengel_${message.guild.id}`, `acik`)
    const aç = new Discord.MessageEmbed()
    .setColor('0x36393E')
    .setDescription(`✅ Caps Lock Engel Sistemi Başarıyla Açıldı!`)
    message.channel.send({ embeds: [aç] })
    message.react('✅')
}
} else if(args[0] === 'kapat') {
db.delete(`capsengel_${message.guild.id}`)
const kapa = new Discord.MessageEmbed()
.setColor('0x36393E')
.setDescription(`✅ Caps Lock Engel Sistemi Başarıyla Kapatıldı!`)
message.channel.send({ embeds: [kapa] })
message.react('✅')
}
}

 
}
client.on("messageCreate", async message => {
let caps = await db.fetch(`capsengel_${message.guild.id}`)
if(message.author.bot) return;
if(message.content.length > 4) {
if(db.fetch(`capsengel_${message.guild.id}`)) {
  let koruma = message.content.toUpperCase()
if(message.content == koruma) {
if(!message.member.permissions.has("ADMINISTRATOR")) {
if(!message.mentions.users.first()) {
message.delete({reason: 'Caps Lock Koruma!'})

    let capsengelembed = new Discord.MessageEmbed()
.setDescription(`
**:x: ${message.author} Bu Sunucuda Caps Lock Açmamalısın!**
`)
   
return message.channel.send({
      embeds: [capsengelembed],
}).then((e) => setTimeout(() => { e.delete(); }, 5000));

}}}}}})
