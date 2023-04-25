const db = require("quick.db");
const conf = require("../configs/sunucuayar.json");
const { green } = require("../configs/emojis.json");

module.exports = async (msg) => {

  if (msg.content.toLowerCase() === "tag" || msg.content.toLowerCase() === ".Tag" || msg.content.toLowerCase() === "Tag" || msg.content.toLowerCase() === "!Tag" || msg.content.toLowerCase() === "TAG" || msg.content.toLowerCase() === "!TAG" || msg.content.toLowerCase() === ".TAG" || msg.content.toLowerCase() === "!tag" || msg.content.toLowerCase() === ".tag") {
    msg.reply({ content: `\`${conf.tag}\``});
  }

if(!msg.guild) return;
  const i = await db.fetch(`saas_${msg.guild.id}`);
    if (i == 'acik') {
      if (msg.content.toLowerCase() == 'Sa' || msg.content.toLowerCase() == 'sa' || msg.content.toLowerCase() == 'Sea' || msg.content.toLowerCase() == 'sea' || msg.content.toLowerCase() == 'Slm' || msg.content.toLowerCase() == 'slm' || msg.content.toLowerCase() == 'Selam' || msg.content.toLowerCase() == 'selam' ) {
          try {

                  return msg.reply(`**Aleyküm Selam** **Hoşgeldin** :)`).then(x => {
                    
                    setTimeout(() => {
                      x.delete()
                    }, 5000);
                  })
          } catch(err) {
            console.log(err);
          }
      }

    else if (i == 'kapali') {
    
    }
    if (!i) return;

    }

}
module.exports.conf = {
  name: "messageCreate"
};