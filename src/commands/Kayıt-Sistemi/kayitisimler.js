const nameData = require("../../schemas/names")
const conf = require("../../configs/sunucuayar.json")
const {red, green } = require("../../configs/emojis.json")
const moment = require("moment")
moment.locale("tr")
module.exports = {
  conf: {
    aliases: ["isimler"],
    name: "isimler",
    help: "isimler [kullanıcı]"
  },
  run: async (client, message, args, embed, prefix) => { 
    if(!conf.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) 
    {
    message.react(red)
    message.reply({ content:`Yetkin bulunmamakta.\Yetkili olmak istersen başvurabilirsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const data = await nameData.findOne({ guildID: message.guild.id, userID: member.user.id });

    const ozi = embed
.setColor("RANDOM")
.setDescription(`
${member.toString()} üyesinin Son 10 İsim Geçmişi

 **[${data ? `${data.names.length}` : "0"}]** Adet İsim Geçmişi Bulundu\n
${data ? data.names.splice(0, 10).map((x, i) => `\`${x.name}\` (${x.rol}) (<@${x.yetkili}>)`).join("\n") : "İsim Geçmişi Görüntülenemedi."}
    `)
.setFooter({ text: `Toplam İsim Değişiklikleri` });
    message.reply({ embeds: [ozi]});
  }
};
