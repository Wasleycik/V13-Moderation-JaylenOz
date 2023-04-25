const { Client, Intents, Message, MessageEmbed, MessageActionRow, MessageButton, Collection, MessageSelectMenu } = require('discord.js');
const { Modal, TextInputComponent, showModal } = require('discord-modals')
module.exports = {
    conf: {
      aliases: ["sil","temizle"],
      name: "sil",
      help: "sil"
    },
  
    run: async (client, message, args, embed) => {
      if (!message.member.permissions.has('MANAGE_MESSAGES')) return;

      const silmenü = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('kısayollar')
					.setPlaceholder('Silmek İstediğiniz Mesaj Sayısını Seç!')
					.addOptions([
						{
							label: '5',
              description: '5 Adet Mesaj Silersiniz',
							value: 'sil1',
						},
						{
							label: '10',
              description: '10 Adet Mesaj Sİlersiniz',
							value: 'sil2',
						},						
            {
							label: '15',
              description: '15 Adet Mesaj Silersiniz',
							value: 'sil3',
						},
            {
							label: '20',
              description: '20 Adet Mesaj Silersiniz',
							value: 'sil4',
						},
            {
							label: '25',
              description: '25 Adet Mesaj Silersiniz',
							value: 'sil5',
						},
            {
							label: '35',
              description: '35 Adet Mesaj Silersiniz',
							value: 'sil6',
						},
            {
							label: '50',
              description: '50 Adet Mesaj Silersiniz',
							value: 'sil7',
						},
            {
							label: '100',
              description: '100 Adet Mesaj Silersiniz',
							value: 'sil8',
						},
            {
							label: '200',
              description: '200 Adet Mesaj Silersiniz',
							value: 'sil9',
						},
            {
							label: '300',
              description: '300 Adet Mesaj Silersiniz',
							value: 'sil10',
						},
            {
							label: 'Menüyü Kapat',
              description: 'Sil İşlemini İptal Eder Ve Menüyü Kapatır',
							value: 'iptal',
						},
            
					]),
			);

 
        const msg = await message.reply({content:`Lütfen Aşağıdaki Menüden Sİlmek İstediğiniz Mesaj Sayısınız Seçiniz!`, components:[silmenü]})

const filter = i => i.user.id == message.author.id 
const collector = msg.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', max: 1, time: 20000 });
collector.on("collect", async (b) => {

if (b.values[0] === "sil1") {
message.channel.bulkDelete(5);
message.channel.send({ content:`Başarıyla <#${message.channel.id}> Kanalından \`5\` adet mesaj silindi!`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
                      }
if (b.values[0] === "sil2") {
message.channel.bulkDelete(10);
message.channel.send({ content:`Başarıyla <#${message.channel.id}> Kanalından \`10\` adet mesaj silindi!`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
                      }
if (b.values[0] === "sil3") {
message.channel.bulkDelete(15);
message.channel.send({ content:`Başarıyla <#${message.channel.id}> Kanalından \`15\` adet mesaj silindi!`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
                      }
if (b.values[0] === "sil4") {
message.channel.bulkDelete(20);
message.channel.send({ content:`Başarıyla <#${message.channel.id}> Kanalından \`20\` adet mesaj silindi!`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
                      }
if (b.values[0] === "sil5") {
message.channel.bulkDelete(25);
message.channel.send({ content:`Başarıyla <#${message.channel.id}> Kanalından \`25\` adet mesaj silindi!`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
                      }
if (b.values[0] === "sil6") {
message.channel.bulkDelete(35);
message.channel.send({ content:`Başarıyla <#${message.channel.id}> Kanalından \`35\` adet mesaj silindi!`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
                      }
if (b.values[0] === "sil7") {
message.channel.bulkDelete(50);
message.channel.send({ content:`Başarıyla <#${message.channel.id}> Kanalından \`50\` adet mesaj silindi!`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
                      }
if (b.values[0] === "sil8") {
message.channel.bulkDelete(100);
message.channel.send({ content:`Başarıyla <#${message.channel.id}> Kanalından \`100\` adet mesaj silindi!`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
                      }
if (b.values[0] === "sil9") {
message.channel.bulkDelete(100);
message.channel.bulkDelete(100);
message.channel.send({ content:`Başarıyla <#${message.channel.id}> Kanalından \`200\` adet mesaj silindi!`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
                      }
if (b.values[0] === "sil10") {
message.channel.bulkDelete(100);
message.channel.bulkDelete(100);
message.channel.bulkDelete(100);
message.channel.send({ content:`Başarıyla <#${message.channel.id}> Kanalından \`300\` adet mesaj silindi!`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
                      }
if(b.values[0] === "iptal") {
  if(msg) msg.delete().catch({})
  b.reply({ content :"Silme İşlemi İptal Edildi Ve Menü Kaldırıldı.", ephemeral: true })
}

}
)

}
}