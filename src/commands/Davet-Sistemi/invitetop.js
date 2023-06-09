const { MessageEmbed } = require("discord.js");
const db = require("../../schemas/inviter");
const conf = require("../../configs/sunucuayar.json")
module.exports = {
  conf: {
    aliases: ["invtop", "invite-top", "davet-top", "davettop"],
    name: "topinvite",
    help: "topinvite"
  },

  run: async (client, message, args, embed) => {

if(message.channel.id !== conf.ytcommands && message.channel.id !== conf.botcommandschannel) return message.reply({content: `Bu Komutu Sadece <#${conf.botcommandschannel}> Ve <#${conf.ytcommands}> Kanalında Kullanabilirsin.`}).then((e) => setTimeout(() => { e.delete(); }, 5000));

    let data = await db.find({ guildID: message.guild.id }).sort({ total: -1 });
    if (!data.length)return message.channel.send({ embeds: [embed.setDescription("Herhangi bir invite verisi bulunamadı!")] });
    let arr = [];
    data.forEach((x) => arr.push({ id: x.userID, total: x.total }));
    let index = arr.findIndex((x) => x.id == message.author.id) + 1;

    let list = data
      .filter((x) => message.guild.members.cache.has(x.userID))
      .splice(0, 20)
      .map((x, index) => `${x.userID === message.author.id ? `[\`${index + 1}.\`] <@${x.userID}> **: Toplam** \`${x.total}\` **davet** (\`${x.regular}\` **gerçek,** \`${x.bonus}\` **bonus,** \`${x.fake}\` **fake,** \`${x.leave}\` **ayrılmış**)` : `[\`${index + 1}.\`] <@${x.userID}> **: Toplam **\`${x.total}\` **davet** (\`${x.regular}\`** gerçek,** \`${x.bonus}\` **bonus,** \`${x.fake}\` **fake,** \`${x.leave}\` **ayrılmış**)`} ${x.userID == message.member.id ? `**(Siz)**` : ``}`)
      .join("\n");

    const veri = await db.findOne({ guildID: message.guild.id, userID: message.author.id });
    if (index < 10) {
      const embed = new MessageEmbed()
      .setAuthor({ name:  "Invite Sıralaması" })
      .setDescription(list);
      message.channel.send({ embeds: [embed]});
    } else {
      const embed = new MessageEmbed()
      .setAuthor({ name: "Invite Sıralaması" })
      .setDescription(`${list} \n... \n**${index}. ${message.author} Toplam ${veri.total} davet (${veri.regular} gerçek, ${veri.bonus} bonus, ${veri.fake} fake, ${veri.leave} ayrılmış)**`);
      message.channel.send({ embeds: [embed]});
    }
  }
};