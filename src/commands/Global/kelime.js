var kelime = require('rastgelekelime');
const { Discord, MessageEmbed, MessageAttachment, ClientUser } = require("discord.js");
module.exports = {
    conf: {
      aliases: ["kelime"],
      name: "kelime",
      help: "kelime"
    },
  
run: async (client, message, args, embed, prefix) => {
    try {
        let blm = 0
        var embed = new MessageEmbed()
            .setTitle("Bot ismi | Kelime Bulmaca")
            .setFooter({text: "Bulduğun kelimeleri yaz."})
        function random(length) {
            var chars = 'abcdefghijklmnopqrstuvwxyz';
            var str = '';
            for (let i = 0; i < length; i++) {
                str += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return str;
        };
        var klm1 = kelime();
        var klm1b = false
        var klm2 = kelime();
        var klm2b = false
        var klm3 = kelime();
        var klm3b = false
        var krşk = random(20);
        var prçb = Math.floor(Math.random() * 4)
        var pro1 = Math.floor(Math.random() * 10) + 4
        var pro2 = Math.floor(Math.random() * 15) + 10
        var prçs = Math.floor(Math.random() * 20) + 15
        var cümle = krşk.slice(prçb, pro1) + klm1 + krşk.slice(pro1, pro2) + klm2 + krşk.slice(pro2, prçs) + klm3 + krşk.slice(prçs, 20)
        embed.setDescription("**Bu karışık harflerin içinde 3 adet saklı kelime var bulabilir misin?** \n\n **Cümle:** " + cümle)
        message.channel.send({embeds: [embed]}).then(msg => {
            const filter = m => m.author.id === message.author.id;
            const collector = message.channel.createMessageCollector({ filter, time: 60000 });
    
            collector.on('collect', m => {
                if(m.content === klm1) {
                    klm1b = true
                    blm++
                    if(blm !== 3) {
                        m.channel.send(`"**${klm1}**" kelimesini buldun kaldı ${3 - blm} kelime`)
                    } else {
                        m.channel.send(`**Tebrikler tüm kelimeleri buldun!**`)
                    }
                } else if(m.content === klm2) {
                    klm2b = true
                    blm++
                    if(blm !== 3) {
                        m.channel.send(`"**${klm2}**" kelimesini buldun kaldı ${3 - blm} kelime`)
                    } else {
                        m.channel.send(`**Tebrikler tüm kelimeleri buldun!**`)
                    }
                } else if(m.content === klm3) {
                    klm3b = true
                    blm++
                    if(blm !== 3) {
                        m.channel.send(`"**${klm3}**" kelimesini buldun kaldı ${3 - blm} kelime`)
                    } else {
                        m.channel.send(`**Tebrikler tüm kelimeleri buldun!**`)
                    }
                } else {
                    m.channel.send(`**Olamaz! Yanlış kelime.**`)
                }
            });
    
            collector.on('end', () => {
                if(blm !== 3) msg.channel.send("Süre doldu kaybettin. \n\n **Kelimeler şunlardı:** " + klm1 + ", " + klm2 + ", " + klm3)
            });
        })
        } catch (error) {
      console.error(error);
    }
  }
}