const Discord = require("discord.js");
const conf = require("../../configs/sunucuayar.json");
const { ozinitro, ozinetflix, ozispotify, oziexxen, oziblutv} = require("../../configs/emojis.json")
const client = global.bot;

module.exports = {
  conf: {
    aliases: ["ecrolalma"],
    name: "ecrolalma",
    owner: true,
  },

  run: async (client, message, args) => {

    if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content:  `${message.member}, Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`}),
    client.api.channels(message.channel.id).messages.post({ data: {"content":`:tada: Sunucuda sizleri rahatsız etmemek için \`@everyone\` veya \`@here\` atmayacağız. Sadece isteğiniz doğrultusunda aşağıda bulunan tepkilere tıklarsanız Çekilişler,Etkinlikler V/K ve D/C'den haberdar olacaksınız. \n\` ⦁ \` Eğer \`@Etkinlik Katılımcısı\` Rolünü alırsanız sunucumuzda düzenlenecek olan etkinlikler, konserler ve oyun etkinlikleri gibi etkinliklerden haberdar olabilirsiniz. \n\n\` ⦁ \` Eğer \`@Çekiliş Katılımcısı\` Rolünü alırsanız sunucumuzda sıkça vereceğimiz \`Nitro, Spotify, Youtube, Netflix, Exxen\` ve daha nice ödüllerin bulunduğu çekilişlerden haberdar olabilirsiniz. \n\n\**NOT:** \`Kayıtlı olarak hepiniz bu kanalı görebilmektesiniz. Sunucumuz da everyone veya here atılmayacağından dolayı kesinlikle rollerinizi almayı unutmayın.\``,"components":[{"type":1,"components":[

        {"type":2,"style":3,"custom_id":"buttoncekilis","label":"🎁 Çekiliş Katılımcısı"},
        {"type":2,"style":4,"custom_id":"buttonetkinlik","label":"🎉 Etkinlik Katılımcısı"}
        
        ]}]} })
  },
};

client.on('interactionCreate', async interaction => {
  const member = interaction.user;

const etkinlik = await client.guilds.cache.get(conf.guildID).roles.cache.find(x => x.name.includes(conf.etkinlik)).id
const cekilis = await client.guilds.cache.get(conf.guildID).roles.cache.find(x => x.name.includes(conf.cekilis)).id

    if(interaction.customId === "buttoncekilis")
    {

      if(interaction.guild.members.cache.get(member.id).roles.cache.has(cekilis)){
          await interaction.guild.members.cache.get(member.id).roles.remove(cekilis)
          await interaction.reply({ content: `${member.toString()}, başarıyla <@&${cekilis}> rolünü çıkardınız.`, ephemeral: true });
      } else {
          await interaction.guild.members.cache.get(member.id).roles.add(cekilis)
          await interaction.reply({ content: `${member.toString()}, başarıyla <@&${cekilis}> rolü aldınız.`, ephemeral: true });
      }
    }
        
    if(interaction.customId === "buttonetkinlik")
    {

      if(interaction.guild.members.cache.get(member.id).roles.cache.has(etkinlik)){
          await interaction.guild.members.cache.get(member.id).roles.remove(etkinlik)
          await interaction.reply({ content: `${member.toString()}, başarıyla <@&${etkinlik}> rolünü çıkardınız.`, ephemeral: true });
      } else {
          await interaction.guild.members.cache.get(member.id).roles.add(etkinlik)
          await interaction.reply({ content: `${member.toString()}, başarıyla <@&${etkinlik}> rolü aldınız.`, ephemeral: true });
      }
    }
})