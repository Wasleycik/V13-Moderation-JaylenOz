const { MessageEmbed, Client, Message, MessageActionRow, MessageSelectMenu } = require("discord.js");
const Discord = require('discord.js');
const conf = require("../../configs/sunucuayar.json");
const client = global.bot;

module.exports = {
  conf: {
    aliases: ["mka","türkiye"],
    name: "mka",
    help: "mka",
    owner: true
  },
 
    run: async (client, message, args, durum, kanal) => {
      if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content:  `${message.member}, Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`}).then((e) => setTimeout(() => { e.delete(); }, 10000));
      message.delete()

		const embed = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・İSTİKLAL MARŞI・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`
Korkma, sönmez bu şafaklarda yüzen al sancak;
Sönmeden yurdumun üstünde tüten en son ocak.
O benim milletimin yıldızıdır, parlayacak;
O benimdir, o benim milletimindir ancak.

Çatma, kurban olayım, çehreni ey nazlı hilâl!
Kahraman ırkıma bir gül! Ne bu şiddet, bu celâl?
Sana olmaz dökülen kanlarımız sonra helâl...
Hakkıdır, Hakk'a tapan, milletimin istiklâl!

Ben ezelden beridir hür yaşadım, hür yaşarım.
Hangi çılgın bana zincir vuracakmış? Şaşarım!
Kükremiş sel gibiyim, bendimi çiğner, aşarım.
Yırtarım dağları, enginlere sığmam, taşarım.

Garbın âfâkını sarmışsa çelik zırhlı duvar,
Benim iman dolu göğsüm gibi serhaddim var.
Ulusun, korkma! Nasıl böyle bir îmânı boğar,
"Medeniyet!" dediğin tek dişi kalmış canavar?

Arkadaş! Yurduma alçakları uğratma, sakın.
Siper et gövdeni, dursun bu hayâsızca akın.
Doğacaktır sana va'dettiği günler Hakk'ın...
Kim bilir, belki yarın, belki yarından da yakın.

Bastığın yerleri "toprak!" diyerek geçme, tanı:
Düşün altındaki binlerce kefensiz yatanı.
Sen şehid oğlusun, incitme, yazıktır, atanı:
Verme, dünyaları alsan da, bu cennet vatanı.

Kim bu cennet vatanın uğruna olmaz ki fedâ?
Şühedâ fışkıracak toprağı sıksan, şühedâ!
Cânı, cânânı, bütün varımı alsın da Huda,
Etmesin tek vatanımdan beni dünyada cüdâ.

Ruhumun senden, İlâhi, şudur ancak emeli:
Değmesin mabedimin göğsüne nâ-mahrem eli.
Bu ezanlar -ki şehadetleri dînin temeli-
Ebedî yurdumun üstünde benim inlemeli.

O zaman vecd ile bin secde eder -varsa- taşım,
Her cerîhamdan, İlâhi, boşanıp kanlı yaşım,
Fışkırır ruh-ı mücerred gibi yerden na'şım;
O zaman yükselerek arşa değer belki başım.

Dalgalan sen de şafaklar gibi ey şanlı hilâl!
Olsun artık dökülen kanlarımın hepsi helâl.
Ebediyen sana yok, ırkıma yok izmihlâl:
Hakkıdır, hür yaşamış, bayrağımın hürriyet;
Hakkıdır, Hakk'a tapan, milletimin istiklâl!
`)
.setFooter({ text: `Yazarı : Mehmet Akif Ersoy` });

		const embed2 = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`▬▬▬▬▬▬▬▬▬▬・Atatürk'ün Gençliğe Hitabesi・▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`
Ey Türk Gençliği!

Birinci vazifen, Türk istiklâlini, Türk Cumhuriyetini, ilelebet, muhafaza ve müdafaa etmektir.

Mevcudiyetinin ve istikbalinin yegâne temeli budur. Bu temel, senin, en kıymetli hazinendir. İstikbalde dahi, seni bu hazineden mahrum etmek isteyecek, dahilî ve haricî bedhahların olacaktır. Bir gün, İstiklâl ve Cumhuriyeti müdafaa mecburiyetine düşersen, vazifeye atılmak için, içinde bulunacağın vaziyetin imkân ve şerâitini düşünmeyeceksin! Bu imkân ve şerâit, çok nâmüsait bir mahiyette tezahür edebilir. İstiklâl ve Cumhuriyetine kastedecek düşmanlar, bütün dünyada emsali görülmemiş bir galibiyetin mümessili olabilirler. Cebren ve hile ile aziz vatanın, bütün kaleleri zaptedilmiş, bütün tersanelerine girilmiş, bütün orduları dağıtılmış ve memleketin her köşesi bilfiil işgal edilmiş olabilir. Bütün bu şerâitten daha elîm ve daha vahim olmak üzere, memleketin dahilinde, iktidara sahip olanlar gaflet ve dalâlet ve hattâ hıyanet içinde bulunabilirler. Hattâ bu iktidar sahipleri şahsî menfaatlerini, müstevlilerin siyasi emelleriyle tevhit edebilirler. Millet, fakr ü zaruret içinde harap ve bîtap düşmüş olabilir.

Ey Türk istikbalinin evlâdı! İşte, bu ahval ve şerâit içinde dahi, vazifen; Türk İstiklâl ve Cumhuriyetini kurtarmaktır! Muhtaç olduğun kudret, damarlarındaki asil kanda mevcuttur!
`)
.setFooter({ text: `Mustafa Kemal Atatürk (20 Ekim 1927)` });


		const embed3 = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・Öğrenci Andımız・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`
Türküm, doğruyum, çalışkanım.
İlkem; küçüklerimi korumak,
büyüklerimi saymak,
yurdumu, milletimi özümden çok sevmektir.
Ülküm; yükselmek, ileri gitmektir.
Ey büyük Atatürk!
Açtığın yolda, gösterdiğin hedefe, hiç durmadan yürüyeceğime and içerim.
Varlığım, Türk varlığına armağan olsun.
Ne mutlu Türküm diyene!

`)
.setFooter({ text: `1997 2.Defa Değiştirilmiştir` });


  
     await message.channel.send({embeds: [embed]});
     await message.channel.send({embeds: [embed2]});
     await message.channel.send({embeds: [embed3]});

    },
 };