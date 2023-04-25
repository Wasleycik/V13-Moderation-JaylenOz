const { Discord, MessageButton, MessageActionRow } = require("discord.js");
const conf = require("../../configs/sunucuayar.json")
const cezapuan = require("../../schemas/cezapuan")
const ceza = require("../../schemas/ceza")
const penals = require("../../schemas/penals");
const data = require("../../schemas/penals");
const { green, red, Jail } = require("../../configs/emojis.json")
const moment = require("moment");
moment.locale("tr");
const client = global.bot;

module.exports = {
  conf: {
    aliases: ["cezapanel"],
    name: "cezabutton",
    owner: true,
  },

  run: async (client, message, args, embed) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content:  `${message.member}, Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`}).then((e) => setTimeout(() => { e.delete(); }, 10000));
    client.api.channels(message.channel.id).messages.post({
      data: {
        "content": `👁‍🗨 Aşağıda ki düğmelerden ceza listenizi, ceza puanını ve aktif cezanızın kalan süresini görüntüleyebilirsiniz.`, "components": [{
          "type": 1, "components": [

            { "type": 2, "style": 4, "custom_id": "cezapuanım", "label": "Ceza Puanı" },
            { "type": 2, "style": 4, "custom_id": "cezalarım", "label": "Cezalarım" },
            { "type": 2, "style": 4, "custom_id": "kalanzamanım", "label": "Kalan Zamanım?" }

          ]
        }]
      }
    })
  },
};

client.on('interactionCreate', async interaction => {

  const member = interaction.user;

  const cezaData = await ceza.findOne({ guildID: conf.guildID, userID: member.id });
  const cezapuanData = await cezapuan.findOne({ guildID: conf.guildID, userID: member.id });

  if (interaction.customId === "cezapuan") {
    interaction.reply({
      content: `${member.toString()} Ceza Puanınız : 

 Toplamda \`${cezapuanData ? cezapuanData.cezapuan : 0} ceza puanı\` ve (Toplam **${cezaData ? cezaData.ceza.length : 0}** Ceza) olarak gözükmekte.`, ephemeral: true
    });
  }

  let data = await penals.find({ guildID: conf.guildID, userID: member.id, active: true }).sort({ date: -1 });
  data = data.map((x) => `\`#${x.id}:\` ${x.active ? "\`Aktif\`" : "\`Pasif\`"} **[${x.type}]** <@${x.staff}>: **${x.reason}** - ${moment(x.date).format("LLL")}`);
  if (interaction.customId === "cezalarım") {
    if (data.length === 0) return interaction.reply({ content: `${member.toString()} üyesinin aktif cezası bulunmamaktadır.`, ephemeral: true });
    if (data.length > 0) return interaction.reply({ content: `${data}`, ephemeral: true });
  }

  let datas = await penals.find({ guildID: conf.guildID, userID: member.id, active: true }).sort({ date: -1 });
  datas = datas.map((x) => `❌ <@${x.staff}> tarafından **${moment(x.date).format("LLL")}**'da işlenen __"#${x.id}"__ numaralı __"${x.type}"__ türündeki cezalandırman **${moment(x.finishDate).format("LLL")}** tarihinde biticektir.`);

  if (interaction.customId === "kalanzaman") {
    if (data.length === 0) return interaction.reply({ content: `${member.toString()} üyesinin aktif ceza bilgisi bulunmamakta.`, ephemeral: true})
    await interaction.reply({ content: `${datas}`, ephemeral: true });
  }

})
