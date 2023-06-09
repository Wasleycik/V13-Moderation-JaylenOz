const { MessageEmbed } = require("discord.js");
const inviterSchema = require("../../schemas/inviter");
const inviteMemberSchema = require("../../schemas/inviteMember");
const conf = require("../../configs/sunucuayar.json")
const {  kirmiziok, star, miniicon } = require("../../configs/emojis.json");
module.exports = {
  conf: {
    aliases: ["invites"],
    name: "invites",
    help: "invites"
  },

  run: async (client, message, args) => {

if(message.channel.id !== conf.ytcommands && message.channel.id !== conf.botcommandschannel) return message.reply({content: `Bu Komutu Sadece <#${conf.botcommandschannel}> Ve <#${conf.ytcommands}> Kanalında Kullanabilirsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000));

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
    const total = inviterData ? inviterData.total : 0;
    const regular = inviterData ? inviterData.regular : 0;
    const bonus = inviterData ? inviterData.bonus : 0;
    const leave = inviterData ? inviterData.leave : 0;
    const fake = inviterData ? inviterData.fake : 0;
    const invMember = await inviteMemberSchema.find({ guildID: message.guild.id, inviter: member.user.id });
    const bazıları = invMember ? invMember.filter(value => message.guild.members.cache.get(value.userID)).slice(0, 7).map((value, index) => message.guild.members.cache.get(value.userID)).join(", ") : undefined
    const daily = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
    const weekly = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;
    let tagged;
    if (conf.tag && conf.tag.length > 0) tagged = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && m.user.username.includes(conf.tag)).size : 0;
    else tagged = 0;

    const embed = new MessageEmbed()
      .setAuthor({ name: member.user.username, iconURL:  member.user.displayAvatarURL({ dynamic: true }) })
      .setThumbnail(member.user.avatarURL({ dynamic: true, size: 2048 }))
      .setDescription(`
${star} Toplam **${total}** davet. \`(${regular} gerçek, ${bonus} bonus, ${leave} ayrılmış, ${fake} fake)\`
      
${kirmiziok} Günlük: \`${daily}\`, Haftalık: \`${weekly}\`, Taglı: \`${tagged}\`)
${bazıları ? `Davet Ettiği Kullanıcılar: ${bazıları}` : ''}
      `);

    message.channel.send({ embeds: [embed]});
  },
};
