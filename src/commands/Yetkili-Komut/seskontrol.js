const conf = require("../../configs/sunucuayar.json")
const { red, green } = require("../../configs/emojis.json");
const voice = require("../../schemas/voiceInfo");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
  conf: {
    aliases: ["nerede", "n","sestemi"],
    name: "nerede",
    help: "nerede"
  },

    run: async (client, message, args ,embed) => {
    if(!conf.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) return message.reply("Bu komutu kullanabilmek için herhangi bir yetkiye sahip değilsin.").then(s => setTimeout(() => s.delete().catch(err => {}), 5000)); 
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) return message.reply("Lütfen bir kullanıcı etiketleyin veya ID'sini giriniz.").then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    if (!member.voice.channel) return message.channel.send({ embeds: [embed.setDescription(`${member} adlı kullanıcı herhangi bir ses kanalında değil.`)] });
            let voiceChannel = member.voice.channel
            let limit = member.voice.channel.userLimit || "~";
            let mic = member.voice.selfMute ? `Kapalı!` : `Açık!`
            let kulak = member.voice.selfDeaf ? `Kapalı!` : `Açık!`
            let ekran =  member.voice.streaming ? `Açık!` : `Kapalı!`
            let kamera = member.voice.selfVideo ? `Açık!` : `Kapalı!`
voiceChannel.createInvite().then(invite =>
            message.channel.send({ embeds: [embed.setDescription(`${member}, isimli üye şuan da ${member.voice.channel} kanalında bulunuyor.
Kanala gitmek için [tıklaman](https://discord.gg/${invite.code}) yeterli

**Ses durumu**:
Mikrofon: \`${mic}\`
Kulaklık: \`${kulak}\`
Ekran: \`${ekran}\`
Kamera: \`${kamera}\`
Doluluk: \` ${member.voice.channel.members.size}/${limit} \`

**Ses kanalında bulunan üyeler**:
\`\`\`
${member.voice.channel.members.size <= 8 ? member.voice.channel.members.map(x => x.user.tag).join("\n") : `${member.voice.channel.members.array().slice(0, 8).map(x => x.user.tag).join("\n")} ve ${member.voice.channel.members.size - 8} kişi daha.`}
\`\`\``)] }))
    }
};