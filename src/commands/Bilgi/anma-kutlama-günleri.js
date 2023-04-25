const { MessageEmbed, Client, Message, MessageActionRow, MessageSelectMenu } = require("discord.js");
const Discord = require('discord.js');
const client = global.bot;

module.exports = {
  conf: {
    aliases: ["anmakutlama"],
    name: "kutlama",
    help: "kutlama",
    owner: true
  },
 
    run: async (client, message, args, durum, kanal) => {
      if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content:  `${message.member}, Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`}).then((e) => setTimeout(() => { e.delete(); }, 10000));
      message.delete()

		const ocak = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・OCAK AYI・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`
Osmaniye Kadirli Turp Festivali - Osmaniye / Kadirli	6-7 Ocak
Verem Haftası	7-13 Ocak
Beyaz Baston Körler Haftası	7-14 Ocak
Çalışan Gazeteciler Günü	10 Ocak
İdareciler Günü	10 Ocak
Orgeneral Ali Fuat Cebesoy’u Anma Günü - Sakarya / Geyve	10 Ocak
Enerji Tasarrufu Haftası	Ocak'ın 2.haftası
Ali Emiri Efendiyi Anma Günü - Diyarbakır	23 Ocak
Cüzzam Haftası	25-31 Ocak
Dünya Gümrük Günü	26 Ocak
Atatürk’ün Gaziantep’e Gelişi - Gaziantep	26 Ocak
Atatürk’ün Narlı’ya Gelişi - K. Maraş / Pazarcık	26 Ocak
Kazım Karabekir Paşa’yı Anma Günü - Karaman / Kazım Karabekir	26 Ocak
Kazım Karabekir Paşa’yı Anma Günü - Kars	26 Ocak
Atatürk’ün Silifke’ye Gelişi - İçel	27 Ocak
`);
		const şubat = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・ŞUBAT AYI・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`
Dünya Kanser Günü	4 Şubat
Atatürk’ün Gelişini Anma Günü - Aydın / Kuşadası	4 Şubat
Atatürk’ün Gelişini Anma Günü - Denizli	4 Şubat
Atatürk’ün Gelişini Anma Günü - Niğde	5 Şubat
Atatürk'ün Gelişini Anma Günü - Balıkesir	6 Şubat
Gaziantep’e Gazilik Unvanının Verilişi - Gaziantep	8 Şubat
Dünya Sigarayı Bırakma Günü	9 Şubat
Atatürk’ün Gelişini Anma Günü - Malatya	13 Şubat
Sevgililer Günü	14 Şubat
Atatürk'ün Gelişini Anma Günü - Antalya / Alanya	18 Şubat
Atatürk'ün Gelişini Anma Günü - Aydın	24 Şubat
Aşık Şenlik Şenliği - Ardahan / Çıldır	25 Şubat
Sivil Savunma Günü	28 Şubat
Uluslararası Kar Şenliği - Kayseri / Erciyes Şubat içinde
`);
		const mart = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・MART AYI・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`
Muhasebeciler Günü	1 Mart
Yeşilay Haftası	1-7 Mart
Hatay Devlet Başkanı Tayfur Sökmen’in ölüm yıldönümü - Hatay	3 Mart
Atatürk'ün Gelişini Anma Günü - Antalya	6 Mart
Dünya Kadınlar Günü	8 Mart
Atatürk'ün Aspendos’a Gelişi - Antalya / Serik	9 Mart
Tıp Bayramı	14 Mart
Dünya Tüketiciler Günü	15 Mart
Atatürk'ün Gelişini Anma Günü - Adana	15 Mart
Akköy Yağlı Pehlivan Güreşleri - Denizli	15-25 Mart
Atatürk'ün Gelişini Anma Günü - İçel / Tarsus	16 Mart
Atatürk'ün Gelişini Anma Günü - İçel	17 Mart
Şehitler Günü	18 Mart
Çanakkale Zaferi'ni Anma Günü - Çanakkale	18 Mart
Yaşlılar Haftası	18-24 Mart
Nevruz Bayramı	21 Mart
Dünya Ormancılık Günü (*)	21 Mart
Dünya Şiir Günü	21 Mart
Dünya Su Günü	22 Mart
Dünya Meteoroloji Günü	23 Mart
Ziya Gökalp’in Doğumunu Anma Günü - Diyarbakır	23 Mart
Dünya Tüberküloz Günü	24 Mart
Atatürk'ün Gelişini Anma Günü - Kütahya	24 Mart
Dünya Tiyatrolar Günü	27 Mart
Dünya Demiryolu Çalışanları Günü	27 Mart
Kütüphane Haftası	Mart'ın son haftası
Vergi Haftası	Mart'ın son haftası
`);
		const nisan = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・NİSAN AYI・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`
İnönü Zaferleri - Eskişehir	1 Nisan
Çukurova’da Milli Mücadelenin Başlangıç Günü - Adana	1 Nisan
Kanserle Savaş Haftası	1-7 Nisan
Avukatlar Günü	5 Nisan
Atatürk'ün, Diyarbakır'ın Fahri Hemşehrisi Oluşunu Anma Günü - Diyarbakır	5 Nisan
Bursa'nın Fethi - Bursa	5 Nisan
Dünya Sağlık Günü	7 Nisan
Gazi Günü - Bartın	8 Nisan
Sağlık Haftası	8-14 Nisan
Polis Teşkilatının Kuruluşu	10 Nisan
Turizm Haftası	15-22 Nisan
Ebeler Haftası	21-28 Nisan
Ulusal Egemenlik ve Çocuk Bayramı	23 Nisan
Uluslararası 23 Nisan Çocuk Şenlikleri	23 Nisan
Pilotlar Günü	26 Nisan
Uluslararası NYSA Kültür ve Sanat Festivali - Aydın / Sultanhisar	28-30 Nisan
Dünya Dans Günü	29 Nisan
Lale Festivali - Muş	29-30 Nisan
Demre Festivali - Antalya / Demre	Nisan’ın son haftası
Mesir Şenlikleri - Manisa	Nisan içinde
`);
		const mayıs = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・MAYIS AYI・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`
Emek ve Dayanışma Günü	1 Mayıs
Çilek, Tarım, Kültür ve Sanat Festivali - Aydın / Sultanhisar	1-5 Mayıs
Kültür ve Bahar Bayramı - Aydın / Koçarlı	1-5 Mayıs
Dünya Basın Özgürlüğü Günü	3 Mayıs
Dünya Astım Günü	3 Mayıs
İş Sağlığı ve Güvenliği Haftası	4-10 Mayıs
Lale Şenlikleri - Ankara / Sincan	5-7 Mayıs
Hıdrellez	6 Mayıs
Yunus Emre Kültür ve Sanat Haftası - Eskişehir	6-10 Mayıs
Kan Haftası	6-12 Mayıs
Beymelek Bahar Şenliği - Antalya / Kale	6-26 Mayıs
Karayolu Güvenliği ve Trafik Haftası	Mayıs’ın ilk cumartesi günüyle başlayan hafta
İstatistik Günü	9 Mayıs
Avrupa Günü	9 Mayıs
Uluslar Arası Yat Festivali - Muğla / Marmaris	Mayıs’ın 2. haftası
Sakatlar Haftası	10-16 Mayıs
Türk Dil Bayramı ve Yunus Emre'yi Anma Törenleri - Karaman	12-13 Mayıs
Hemşirelik Haftası	12-18 Mayıs
Türk Dil Bayramı	13 Mayıs
Dünya Eczacılık Günü	14 Mayıs
Dünya Çiftçiler Günü	14 Mayıs
Afrodisias Kültür ve Sanat Festivali - Aydın / Karacasu	14 Mayıs
Anneler Günü	Mayıs'ın 2. pazarı
Yeryüzü İklim Günü	15 Mayıs
Hava Şehitlerini Anma Günü	15 Mayıs
Batman’ın İl Oluşu - Batman	16 Mayıs
Dünya Telekomünikasyon Günü	17 Mayıs
Bayramiç Panayırı - Çanakkale / Bayramiç	17-20 Mayıs
Müzeler Haftası	18-24 Mayıs
Atatürk'ü Anma ve Gençlik ve Spor Bayramı	19 Mayıs
Denizli Belediyesi Amatör Tiyatrolar Festivali - Denizli	19-23 Mayıs
Gençlik Haftası	19-25 Mayıs
25 Mayıs Atatürk’ü Anma ve Kutlama Festivali - Samsun / Havza	19-25 Mayıs
Uluslar Arası Karadeniz Giresun Aksu Festivali - Giresun	20-23 Mayıs
Dünya Süt Günü	21 Mayıs
Uluslar Arası Agamemnon Kültür ve Sanat Festivali - İzmir / Balçova	21-25 Mayıs
Ayazma Şenlikleri - Gümüşhane	Mayıs’ın 3. haftası
Karagöz Kültür Sanat ve Kakava Festivali - Kırklareli	Mayıs’ın 3. haftası
Döşemealtı Halı Festivali - Antalya / Yeniköy	Mayıs’ın 3. haftası
Milli Mücadeleye Katılmayı Anma Günü - Denizli / Sarayköy	24 Mayıs
Türkler’in Rumeli’ye Çıkışları - Çanakkale / Gelibolu	26-28 Mayıs
Milli Mücadelede Düşmana Ayvalık’ta Atılan İlk Kurşun - Balıkesir / Ayvalık	29 Mayıs
İstanbul’un Fethi - İstanbul	29 Mayıs
Açlıkla Mücadele Haftası	30 Mayıs-5 Haziran
Dünya Sigarasız Günü	31 Mayıs
Dünya Hostesler Günü	31 Mayıs
Antiocheia Kültür ve Sanat Festivali - Isparta / Yalvaç	Mayıs içinde
`);
		const haziran = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・HAZİRAN AYI・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`
Dünya Çevre Günü	5 Haziran
Geleneksel Pilav Günü - Sakarya / Taraklı	Haziran’ın ilk pazarı
Çilek Festivali Kültür ve Turizm Etkinlikleri Haftası - Bartın	Haziran’ın ilk haftası
Kelha Rebeta Şenlikleri - Batman / Kozluk	Haziran’ın ilk haftası
Sivaslı Çilek Festivali - Uşak / Sivaslı	Haziran’ın ilk haftası
Karagöl Şenlikleri - Bolu / Kıbrıscık	Haziran’ın ilk haftası
Uluslararası Bergama Kermesi - İzmir / Bergama	Haziran’ın ilk haftası
Aladağ Şenlikleri - Karabük	Haziran’ın ilk haftası
Düzce Uluslararası Halk Oyunları ve Turizm Festivali - Düzce	Haziran’ın 1. hafta sonu
Yayla Şenliği - Konya / Sarayönü	1-7 Haziran
Uluslararası Bandırma Kuş Cenneti Kültür ve Turizm Festivali - Balıkesir / Bandırma	1-10 Haziran
Uluslararası Bursa Festivali - Bursa	1 Haziran-12 Temmuz
Yeşili Kiraz Festivali - Mardin / Yeşili	5-6 Haziran
Çaybaşı Köyü Kültür Dayanışma Yayla Şenliği - Kastamonu / Tosya	6 Haziran
Kiraz Festivali - Tekirdağ	Haziran’ın 2. haftası
Uluslararası Karadeniz Ereğli Osmanlı Çileği Kültür Festivali - Zonguldak	Haziran’ın 2. haftası
Kayısı Bayramı - İçel / Mut	Haziran’ın 2. haftası
Karagöz Kültür Şenliği - Bursa / Orhaniye	Haziran’ın 2. haftası
Kiraz Şenliği - Çanakkale / Lapseki	Haziran’ın 2. haftası
Nasrettin Hoca Doğum Şenlikleri - Eskişehir	8-10 Haziran
Şeref ve Kahramanlık Günü - İnebolu	9 Haziran
Karacaoğlan Kültür ve Sanat Festivali - İçel / Mut	9-11 Haziran
Honaz Kiraz Festivali - Denizli / Honaz	10-11 Haziran
İmamoğlu Şeftali Festivali - Adana / İmamoğlu	10-12 Haziran
Yozgat Sürmeli Festivali - Yozgat	10-15 Haziran
Gül Bayramı - Konya	12 Haziran
Kiraz Festivali - Tokat / Zile	12-14 Haziran
Atatürk Kültür ve Sanat Haftası - Amasya	12-22 Haziran
Atatürk’ün Bergama’ya Gelişi - İzmir / Bergama	13 Haziran
Hasanbeyli Kiraz Festivali - Osmaniye / Hasanbeyli	13 Haziran
Hazar Şiir Akşamları - Elazığ / Sivrice	13-15 Haziran
Rize Çay ve Turizm Festivali - Rize	Haziran’ın 3. haftası
Fakıbey Şenlikleri - Yozgat / Yenifakılı	16 Haziran
Dünya Çölleşme ve Kuraklıkla Mücadele Günü	17 Haziran
Çömlekçilik Festivali - Niğde / Altunhisar	17 Haziran
Yeşilyurt Kiraz, Kültür, Sanat ve Spor Şenlikleri - Malatya / Yeşilyurt	17-18 Haziran
Karakucak Güreşleri ve Efkari Şenliği - Artvin / Ardanuç	18-25 Haziran
Dünya Mülteciler Günü	20 Haziran
Atatürk’ün İzinde-Gölgesinde Damal Şenlikleri - Ardahan / Damal	20 Haziran
Atatürk’ün Eskişehir’e Gelişi - Eskişehir	21 Haziran
Zonguldak’ın Kurtuluşu ve Uzun Mehmet’i Anma Günü - Zonguldak	21 Haziran
Eldivan Kiraz Festivali ve Geleneksel Yağlı Güreşler - Çankırı / Eldivan	21-23 Haziran
Ağrı Dağı Festivali - Iğdır	22 Haziran
Aşık Veysel Kültür Festivali - Sivas / Sarkışla	22-23 Haziran
Pamukkale Kültür ve Müzik Festivali - Denizli	22-27 Haziran
Babalar Günü	Haziran'ın 3. pazarı
Boduroğlu Yayla Şenlikleri - Karabük / Ovacık	Haziran’ın son haftası
Çorlu Kültür ve Sanat Festivali - Tekirdağ / Çorlu	Haziran’ın son haftası
Baba Hızır Hz. Anma Günü - Bolu / Mengen	Haziran’ın son pazarı

`);
		const haziran2 = new Discord.MessageEmbed()
.setColor("#2f3136")
.setDescription(`
Gezin Çilek Festivali - Elazığ / Gezin	23 Haziran
Uluslararası Hitit Fuar ve Festivali - Çorum	3 Haziran-2 Temmuz
Kuşköy Kuşdili Şenlikleri - Giresun / Çanakçı	24 Haziran
Pir Sultan Abdal Banaz Şenlikleri - Sivas / Yıldızeli	24-25 Haziran
Söğüt Eli Ernek Yayla Şenliği - Gümüşhane / Kelkit	25 Haziran
Geleneksel Şamlı Panayırı - Balıkesir / Şamlı	25-26 Haziran
Uluslararası Kahta Kommagene Festivali - Adıyaman / Kahta	25-27 Haziran
Sarıkaya Milli Kültür ve Sanat Festivali Yozgat / Sarıkaya	25-30 Haziran
Uyuşturucu Kullanımı ve Trafiği ile Mücadele Günü	26 Haziran
Atatürk’ün Tokat’a Gelişi - Tokat	26 Haziran
Bozhöyük Yayla Şenlikleri - Yozgat / Bozhöyük	26 Haziran
Atatürk’ün Sivas’a Gelişi - Sivas	27 Haziran
Kafkasör Kültür Turizm ve Sanat Festivali - Artvin / Kafkasör	27 Haziran-1 Temmuz
İlküvez Yayla Şenlikleri - Ordu / Çaybaşı	28-29 Haziran
Geleneksel Hoşislamlar Şöleni - Çankırı / Atkaracalar	28-30 Haziran
Uluslararası Kaş Likya Festivali - Antalya / Kaş	28 Haziran-2 Temmuz
Geleneksel Kocayayla Şenliği - Bursa / Keles	29-30 Haziran
Çemişgezek Dut ve Peynir Festivali - Tunceli / Çemişgezek	29-30 Haziran
Beyaz Kiraz Festivali - Konya / Ereğli	29-30 Haziran
Çamiçi Yayla Şenlikleri - Tokat / Niksar	30 Haziran
Altınlar Kemer Festivali - Antalya / Kemer	30 Haziran-5 Temmuz
Tatvan Doğu Anadolu Fuarı - Bitlis / Tatvan	30 Haziran-24 Temmuz
Kutludüğün Gözleme, Ayran Kültür Sanat Festivali - Ankara / Mamak	Haziran içinde
Uluslararası Kaplıca Festivali ve Kültür Şenlikleri - Ankara / Haymana	Haziran içinde
Ortaca Festivali - Muğla / Ortaca	Haziran içinde
Kiraz Festivali - Nevşehir / Aksalur	Haziran içinde
Fevziye Yağlı Güreşleri - Yalova / Altınova-Fevziye	Haziran içinde
Karaelmas Festivali - Zonguldak	Haziran içinde
`);
		const temmuz = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・TEMMUZ AYI・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`
Kabotaj ve Denizcilik Bayramı	1 Temmuz
Atatürk’ün Erzincan’a Gelişi - Erzincan	1 Temmuz
Kültür ve Sanat Festivali - Ordu	1-3 Temmuz
Hopa Kültür, Sanat ve Deniz Fest. - Artvin / Hopa	1-5 Temmuz
Atatürk’ün Erzurum’a Gelişi - Erzurum	3 Temmuz
Altınova Tavşanlı Beldesi Şehitlerini Anma Günü - Yalova / Altınova	3 Temmuz
Ceyhan Karpuz Festivali - Adana / Ceyhan	3 Temmuz
İskenderun Uluslararası Kültür ve Turizm Festivali - Hatay / İskenderun	5 Temmuz
Nasrettin Hoca Festivali - Konya / Akşehir	5-10 Temmuz
Kütahya Dumlupınar Fuarı - Kütahya	5-31 Temmuz
Tavşandağı Kafkas Festivali - Amasya / Merzifon	6-9 Temmuz
Yeşilce Kültür ve Yayla Şenlikleri - Ordu / Mesudiye	6-12 Temmuz
Hazar Gölü Su Sporu Şenlikleri - Elazığ / Sivrice	7-8 Temmuz
Bursa Milli Fuarı - Bursa	7-31 Temmuz
Yayık Yayma Seyranı - Ardahan / Posof	Temmuz’un 1. haftası
Kiraz Festivali ve Yağlı Pehlivan Güreşleri - Isparta / Uluborlu	Temmuz’un 1. haftası
Çilek Festivali - Kırklareli / Demirköy	Temmuz’un 1. haftası
Fındık Festivali - Ordu	Temmuz’un 1. haftası
Karacaören Yayla Şenlikleri - Sivas / Suşehri	Temmuz’un 1. haftası
Bölüklü Yayla Festivali - Zonguldak / Alaplı	Temmuz’un 1. haftası
Yörük Ayranı Şöleni - Afyon / Sincanlı	Temmuz’un 1. pazarı
Şeyhül-İmran Bayramı - Bolu / Mudurnu	Temmuz’un 1. pazarı
Kızık Yayla Bayramı - Bolu/Seben/Kızık Yaylası	Temmuz’un 1. pazarı
Vişne Festivali - Afyon / Çay	Temmuz’un 2. haftası
Kardüz (Gölyaka) Yayla Şenliği - Düzce / Gölyaka	Temmuz’un 2. haftası
Uluslararası Akçakoca Turizm, Kültür ve Fındık Festivali - Düzce / Akçakoca	Temmuz’un 2. haftası
Adala Şeftali ve Kültür Şenliği - Manisa / Salihli / Adala	Temmuz’un 2. haftası
Suçıktı Günü - Balıkesir / Dursunbey	Temmuz’un 2. haftası
Bayburt Dede Korkut Uluslararası Kültür-Sanat Şölenleri - Bayburt	Temmuz’un 2. haftası
Karadağ Yayla Şenlikleri - Trabzon / Vakfıkebir	Temmuz’un 2. haftası
Abant Bayramı - Bolu / Abant	Temmuz’un 2. pazarı
Zigana Yayla Şenlikleri - Gümüşhane / Torul	Temmuz’un 2. pazarı
Soğucak Yayla Şenliği - Sakarya / Sapanca	Temmuz’un 2. pazarı
Kiraz Festivali - Niğde / Ulukışla/Darboğaz	8 Temmuz
İyidere Deniz Şenlikleri - Rize / İyidere	8-10 Temmuz
Dünya Nüfus Günü	11 Temmuz
Peynir Festivali - Ordu / Kabataş	13-14 Temmuz
Yöresel Çambaşı Yayla Şenliği - Ordu / Kabadüz	13-14 Temmuz
Aksaray Kültür ve Turizm Festivali - Aksaray	13-16 Temmuz
Ağlı Kalesi ve Yayla Şenlikleri - Kastamonu / Ağlı	13-17 Temmuz
Kümbet Yayla Şenliği - Giresun / Dereli	14-15 Temmuz
Kurtdereli Mehmet Pehlivan Yağlı Güreşleri - Balıkesir / Kurtdere Köyü	14-16 Temmuz
Kültür ve Turizm Festivali - Kütahya	14-16 Temmuz
Kangal Çoban Köpeği Koyunu Kültür ve Sanat Festivali - Sivas / Kangal	14-16 Temmuz
Yenicekent Üzüm Festivali - Denizli / Yenicekent	Temmuz’un 3. haftası
Özdere Uluslararası Kültür-Sanat ve Turizm Festivali - İzmir / Menderes	Temmuz’un 3. haftası
Dikmen Kebap ve Eğlence Festivali - Sinop / Dikmen	Temmuz’un 3. haftası

`);
		const temmuz2 = new Discord.MessageEmbed()
.setColor("#2f3136")
.setDescription(`
Devrek Baston ve Kültür Festivali - Zonguldak / Devrek	Temmuz’un 3. haftası
Erciyes Atlı Yayla Turizm Şenlikleri - Kayseri / Erciyes Dağı	Temmuz’un 3. pazarı
Atatürk’ün İznik’e Gelişi - Bursa / İznik	15 Temmuz
Eymir Yayla Şenlikleri - Yozgat / Eymir	15-16 Temmuz
Sardalya Festivali - Çanakkale / Gelibolu	15-17 Temmuz
Kocaeli Eğlence Fuarı - Kocaeli / İzmit	15 Temmuz-15 Ağustos
Atatürk’ün Bolu’ya Gelişi - Bolu	17 Temmuz
Üzüm Şenlikleri - İçel / Tarsus	17-23 Temmuz
Malatya Fuarı ve Kayısı Şenlikleri - Malatya	17-31 Temmuz
Atatürk’ün Düzce Merkez ve Gümüşova-Selamlar Köyüne Gelişi - Düzce	18 Temmuz
Topçam Yöresi Yayla Şenlikleri - Ordu / Mesudiye	18 Temmuz
Ilgaz Dağı Kültür ve Sanat Festivali - Çankırı / Ilgaz	19-21 Temmuz
Çandarlı Kaleiçi Kültür ve Sanat Fest. - İzmir / Dikili	19-21 Temmuz
Ünye Uluslararası Kültür, Sanat ve Turizm Festivali - Ordu / Ünye	19-21 Temmuz
Tut Kültür ve Sanat Festivali - Adıyaman / Tut	19-23 Temmuz
Pertek Peynir ve Pekmez Festivali - Tunceli / Pertek	20 Temmuz
Kiraz Festivali - Kocaeli / Körfez / Yarımca	20-21 Temmuz
Gerze Kültür ve Sanat Festivali - Sinop / Gerze	20-22 Temmuz
Antakya Uluslararası Turizm Kültür ve Sanat Festivali - Hatay / Antakya	20-23 Temmuz
Şebinkarahisar Şenlikleri - Giresun / Şebinkarahisar	21-22 Temmuz
Kepsut Şeftali Şenliği Festivali - Balıkesir / Kepsut	Temmuz’un 4. haftası
Perşembe Yaylası Şenlikleri - Ordu / Perşembe	Temmuz’un 4. haftası
Turizm Şenliği - Ordu / Ünye	Temmuz’un 4. haftası
Bahadın Kültür Şenliği - Yozgat / Bahadın	Temmuz’un 4. haftası
Kaba-Oğuz Köyleri Yayla Şenlikleri - Amasya / Gümüşhacıköy	22-23 Temmuz
Kazankaya Kanyon Kültür ve Turizm Festivali - Yozgat / Kazankaya	22-23 Temmuz
Manavgat Turizm Festivali - Antalya / Manavgat	23-27 Temmuz
Gazeteciler (Basın) Bayramı	24 Temmuz
Ulubey Kültür ve Sanat Festivali - Ordu / Ulubey	26-27 Temmuz
Düzoba Yaylası Şenlikleri - Ordu / Kumru	27-28 Temmuz
Abana Kültür-Sanat ve Deniz Şenlikleri - Kastamonu / Abana	27-29 Temmuz
Ulusal Çenesuyu Festivali - Kocaeli / Derince	27-29 Temmuz
Türkeli Yaz Şenlikleri - Sinop / Türkeli	27-29 Temmuz
Uluslararası “Milet-Apollon” Bilim, Bilicilik Festivali - Aydın / Didim	28-30 Temmuz
Dadaloğlu Kültür ve Sanat Şenliği - Kayseri / Tomarza	31 Temmuz
Sürmene Kültür Turizm Şenliği - Trabzon / Sürmene	31 Temmuz
Reşadiye Koç Festivali - Tokat / Reşadiye	31 Temmuz-1 Ağustos
Çamlıdere Aluç Dağı Festivali - Ankara / Çamlıdere	Temmuz içinde
Dörtdivan Köroğlu Yayla Şenlikleri - Bolu / Dörtdivan	Temmuz içinde
Uluslararası Çeşme Müzik Festivali - İzmir / Çeşme	Temmuz içinde
Akdağ Yayla Şenlikleri - Samsun / Ladik	Temmuz içinde
Şerefiye Panayırı - Sivas / Zara	Temmuz içinde
Almus Vişne Festivali - Tokat / Almus	Temmuz içinde
`);
		const ağustos = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・AĞUSTOS AYI・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`
Ardahan Bal Festivali - Ardahan	Ağustos’un 1. haftası
Cevizli Ayran Festivali - Antalya / Akseki	Ağustos’un 1. haftası
Göle Ulusal Kaşar Festivali - Ardahan / Göle	Ağustos’un 1. haftası
Mengen Aşçılık ve Turizm Festivali - Bolu / Mengen	Ağustos’un 1. haftası
Yeşiltepe Yayla Şenliği - Trabzon / Maçka	Ağustos’un 1. haftası
Kültür Sanat ve Armut Festivali - Bursa / Gürsu	Ağustos’un 1. haftası
Seyit Veli Baba Sultanı Anma Töreni ve Pilav Festivali - Isparta/Senirkent/Uluğbey	Ağustos’un 1. haftası
Obruk Yeşil Tepe Yayla Şenlikleri - Kastamonu / İhsangazi	Ağustos’un 1. haftası
Karaköy (Çilimli) Türbelerini Anma Ektinliği - Düzce / Karaköy	Ağustos’un 1. haftası
Tarım Sanayi ve El Sanatları Fuarı - Kahramanmaraş	1-30 Ağustos
Erdek Festivali - Balıkesir / Erdek	1-31 Ağustos
Atatürk’ün Konya’ya Gelişi - Konya	3 Ağustos
Alabalık Festivali - Sivas / Gürün	3-4 Ağustos
Doğa Turu ve Suğla Yayla Şenlikleri - Kastamonu / Pınarbaşı	4-6 Ağustos
Geleneksel Engiz Yaz Şenlikleri - Samsun / 19 Mayıs	4-5 Ağustos
Konya Fuarı - Konya	5 Ağustos-5 Eylül
Kızılcahamam Su Festivali - Ankara / Kızılcahamam	Ağustos’un 2. haftası
Otlukbeli Şenlikleri - Erzincan / Otlukbeli	Ağustos’un 2. haftası
Turizm ve Zeytin Şenliği - Balıkesir / Burhaniye	Ağustos’un 2. haftası
Ayazma İda Şenlikleri - Çanakkale / Bayramiç	Ağustos’un 2. haftası
Ulu Yayla Şenlikleri - Karabük / Safranbolu	Ağustos’un 2. haftası
Müzik ve Yağlı Güreş Festivali - Karabük / Eskipazar	Ağustos’un 2. haftası
Ağustos Şenlikleri - Tekirdağ / Hayrabolu	8-11 Ağustos
Mordoğan Yaz Festivali - İzmir / Karaburun	9-11 Ağustos
Kültür, Sanat ve Turizm Şenliği - Muğla / Ula	9-13 Ağustos
Üzüm ve Biber Festivali - Gaziantep / İslahiye	10-11 Ağustos
Yayladağı Festivali - Hatay / Yayladağı	10-11 Ağustos
Uluslararası Troya Festivali - Çanakkale	10-18 Ağustos
Biber Festivali - Kahramanmaraş	12 Ağustos
Zorkun Yaylası Çocuk Şenliği - Osmaniye	12 Ağustos
Pazar Kültür, Sanat ve Spor Festivali - Rize / Pazar	12-13 Ağustos
Hemşin Bal, Kültür ve Turizm Şenlikleri - Rize / Hemşin	12-13 Ağustos
Zeytinli Belediyesi Zeytin Şenlikleri - Balıkesir / Edremit	13-15 Ağustos
Urla Bağbozumu Şenlikleri - İzmir / Urla	13-15 Ağustos
Taytan Üzüm Şenliği - Manisa / Salihli	14-15 Ağustos
İncesu Günü Festivali - Afyon / Dinar	Ağustos’un 3. haftası
Güre Belediyesi Sarıkız Etkinlikleri - Balıkesir / Edremit / Güre	Ağustos’un 3. haftası
Bağbozumu Festivali - Çanakkale / Bozcaada	Ağustos’un 3. haftası
Altınoluk Antandros “Yaşama Saygı” Kültür ve Sanat Festivali - Balıkesir / Altınoluk	Ağustos’un 3. haftası
Bolu Panayırı - Bolu	15 Ağustos-15 Eylül
Ağın Kültür ve Sanat Şenliği - Elazığ / Ağın	15 Ağustos-15 Eylül
Kars’ın Selçuklu Türkleri Tarafından Fethi - Kars	16 Ağustos
Acur Festivali - Mardin/Midyat/Acurlubel	16 Ağustos
Kavaklıdere Kültür-Sanat Festivali - Muğla / Kavaklıdere	16-17 Ağustos
Hacı Bektaş-i Veli’yi Anma Törenleri ve Kültür-Sanat Etkinlikleri - Nevşehir / Hacıbektaş	16-18 Ağustos
Kırıkkale’nin İl Oluşunun Kutlanması - Kırıkkale	17 Ağustos

`);
		const ağustos2 = new Discord.MessageEmbed()
.setColor("#2f3136")
.setDescription(`
Elma ve Tufana Şenliği - Konya / Ereğli	17-18 Ağustos
Güreş ve Müzik Festivali - Niğde / Koyunlu	18-19 Ağustos
Datça Badem Festivali - Muğla / Datça	18-21 Ağustos
Çamoluk Bal Festivali - Giresun / Çamoluk	19 Ağustos
Dondurma Festivali - Kahramanmaraş	19 Ağustos
Yayla Ortası Şenliği - Trabzon / Çaykara	20 Ağustos
Sarız Kilim Festivali - Kayseri / Sarız	20 Ağustos
Balıkesir 6 Eylül Milli Fuarı - Balıkesir	20 Ağustos-6 Eylül
Arıcılık ve Bal Şenliği - Yozgat / Şefaatli	21 Ağustos
Beyağaç Kartal Gölü Eren Günü - Denizli	Ağustos’un 4. haftası
Kemaliye (Eğin) Şenlikleri - Erzincan / Kemaliye	Ağustos’un 4. haftası
Ertuğrulgazi’yi Anma ve Yörük Şenlikleri - Eskişehir	Ağustos’un 4. haftası
Mucur Köme ve Flamingo Kültür Fest. - Kırşehir / Mucur	Ağustos’un 4. haftası
Donanma Kenti Gölcük Yaz Şenlikleri - Kocaeli / Gölcük	Ağustos’un 4. haftası
Anzer Yaylası Bal Şenlikleri - Rize / İkizdere	Ağustos’un 4. haftası
Celal BAYAR’ı Anma Günleri - Bursa / Gemlik	22 Ağustos
Ahlat Kültür Haftası - Bitlis / Ahlat	23-25 Ağustos
Atatürk’ün Çankırı’ya Gelişi, Şapka İnkılabı ve Karatekin Festivali - Çankırı	23-25 Ağustos
Pir’i Sani Hz. Anma Çerkeş Kültür ve Hayvancılık Festivali - Çankırı / Çerkeş	23-25 Ağustos
Zafer Haftası Şenlikleri ve Karakucak Güreş Festivali - K. Maraş / Göksun	23-30 Ağustos
Atatürk’ün Kastamonu’ya Gelişi, Şapka ve Kıyafet İnkılabı Kutlaması - Kastamonu	23-31 Ağustos
Mercidabık Zaferi - Kilis / Yavuzlu	24 Ağustos
Yoğurt-Un Şenlikleri ve Türkmen Şöl. - Nevşehir / Kalaba	25 Ağustos
Çelikhan Bal Kültür ve Turizm Fest. - Adıyaman / Çelikhan	25-26 Ağustos
Tyana Kültür Şenliği - Niğde / Bor / Kemerhisar	25-26 Ağustos
Yılantaş Kültür Turizm ve Sanat Etkinlikleri Festivali - Trabzon / Araklı	25 Ağustos-1 Eylül
Zafer Haftası	26-30 Ağustos
Dumlupınar Zafer Şenlikleri - Kütahya / Dumlupınar	26-30 Ağustos
İzmir Enternasyonal Fuarı - İzmir	26 Ağustos-10 Eylül
Devrekani Tarım-Kültür ve Sanat Fest. - Kastamonu / Devrekani	27-29 Ağustos
Çayeli Kültür ve Sanat Festivali - Rize / Çayeli	27-29 Ağustos
Ticaret ve Sanayi Fuarı - Sivas	27 Ağustos-6 Eylül
Mezitli Şenliği - İçel / Mersin	28-29 Ağustos
Amazon Şenlikleri - Samsun / Terme / Gölyazı	28-30 Ağustos
Pamuk Festivali - Aydın/Söke/Sarıkemer	29-31 Ağustos
Fevzi ÇAKMAK’ı Anma Günü ve Kırobası - İçel / Silifke	30 Ağustos
Malazgirt Zaferi Kutlamaları - Muş / Malazgirt	30 Ağustos
Zengibar Karakucak Güreşleri - Malatya / Darende	30 Ağustos
Uluslararası Turizm ve Elsanatları Fes. - Nevşehir / Avanos	31 Ağustos-1 Eylül
Nallıhan Taptuk Emre’yi ve Kızı Bacım Sultanı Anma Törenleri - Ankara / Nallıhan	Ağustos içinde
Sidere Festivali - Artvin / Arhavi	Ağustos içinde
Ötüken Şöleni-Aba Güreşleri Festivali - Hatay	Ağustos içinde
Keçiborlu Domates ve Kültür Festivali - Isparta / Keçiborlu	Ağustos içinde
Sarıveliler İlçesi Dumlugöze Köyü Kardelen Çiçeği Festivali - Karaman / Sarıveliler	Ağustos içinde
Hasandede Kültür Şenlikleri - Kırıkkale	Ağustos içinde
Atatürk’ün Karamürsel’e Gelişi - Kocaeli / Karamürsel	Ağustos içinde
Yavuz Sultan Selim Han Selemen Yayla Şenlikleri - Tokat / Reşadiye	Ağustos içinde
Çınarcık Altın Çınar Festivali - Yalova / Çınarcık	Ağustos içinde
`);
		const eylül = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・EYLÜL AYI・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`
Dünya Barış Günü	1 Eylül
Atatürk’ün Suşehri’ne Gelişi - Sivas / Suşehri	1 Eylül
Kavun-Karpuz Festivali - Kırıkkale / Sulakyurt	1 Eylül
Barış Günleri Şenliği - Aydın / Didim	1-2 Eylül
Tirebolu Fındık Festivali - Giresun / Tirebolu	1-2 Eylül
Aşık Seyrani Kültür ve Sanat Şen. - Kayseri / Develi	1-2 Eylül
Ezine Panayırı - Çanakkale / Ezine	1-3 Eylül
Karahallı Cılandıras Dokuma Fest. - Uşak	2 Eylül
Atmaca 53 Festivali - Rize / Ardeşen	2-4 Eylül
Yağcıbedir Halı Festivali - Balıkesir / Sındırgı	3-6 Eylül
Halk Sağlığı Haftası	3-9 Eylül
Yunus Emre’yi Anma Haftası - Aksaray	Eylül’ün 1. haftası
Sincan Yenikent Kavun Festivali ve Kültürel Şenlikleri - Ankara / Yenikent	Eylül’ün 1. haftası
Uruş Kapama Şöleni - Ankara / Beypazarı	Eylül’ün 1. haftası
Kaş Likya Festivali - Antalya / Kaş	Eylül’ün 1. haftası
Seyit Bilal Anma Günü - Batman / Gercüş	Eylül’ün 1. haftası
Bal Festivali - Erzincan / Refahiye	Eylül’ün 1. haftası
Hayme Ana’yı Anma ve Domaniç Şenliği - Kütahya / Domaniç	Eylül’ün 1. haftası
Arapgir Bağbozumu Şenlikleri - Malatya / Arapgir	Eylül’ün 1. haftası
Tepealan Şenlikleri - Ordu / Korgan	Eylül’ün 1. haftası
Geleneksel Akıncılar Kavun Fest. - Sivas / Akıncılar	Eylül’ün 1. haftası
Kadıralak Yayla Şenliği - Trabzon / Tonya	Eylül’ün 1. haftası
Kültür-Sanat Festivali ve Kurtuluş Kutlamaları - Bursa / Orhangazi	3-10 Eylül
Ödemiş Milli Fuarı - İzmir / Ödemiş	3-13 Eylül
Sivri Şenliği - Trabzon / Tonya	4 Eylül
4 Eylül Kültür ve Sanat Festivali - İzmir / Tire	4-6 Eylül
Hadimi Hazretlerini Anma Günü - Konya / Hadim	4-12 Eylül
Geleneksel Altın İncir Festivali - Aydın / İncirliova	5 Eylül
Ayran Festivali - Balıkesir / Susurluk	5 Eylül
Uluslararası Taşköprü Kültür ve Sarımsak Festivali - Kastamonu / Taşköprü	6-9 Eylül
Pülümür Geleneksel Bal Festivali - Tunceli / Pülümür	7 Eylül
Yayla Dönüşü Şenliği - Yozgat / Boğazlıyan	7 Eylül
Yunus Emre Anma Günü - Kırşehir	Eylül’ün 2. haftası
Köroğlu Kültür Sanat Festivali - Bolu	Eylül’ün 2. haftası
Munzur Melenkoç Yayla Şenlikleri - Erzincan / Yaylabaşı	Eylül’ün 2. haftası
Manisa’nın Düşman İşgalinden Kurtuluşu ve Bağbozumu Şenlikleri - Manisa	8 Eylül

`);
		const eylül2 = new Discord.MessageEmbed()
.setColor("#2f3136")
.setDescription(`
Üzüm Festivali - Kayseri / İncesu	8 Eylül
Boğa Güreşi - Muğla / Ula	8-9 Eylül
Şenköy Kültür Sanat ve Turizm Fest. - Hatay	9 Eylül
Kabalı Panayırı - Sinop / Kabalı	12-16 Eylül
Sakarya Zaferi ve Gordiyon Şenlikleri - Ankara / Polatlı	13 Eylül
Topçam Şenlikleri - Tokat	13-14 Eylül
Çivril Elma Festivali - Denizli / Çivril	3-14 Eylül
Uluslararası Kültür Şenliği - Kırıkkale / Karakeçili	Eylül’ün 3. haftası
Çal Bağbozumu Şenlikleri - Denizli / Çal	Eylül’ün 3. haftası
Atatürk’ün Sinop’a Gelişi - Sinop	15 Eylül
Türkmen Sofrası - Nevşehir	15 Eylül
Mersin Kültür ve Sanat Şenliği - Mersin	15 Eylül – 5 Ekim
Kültür-Sanat Festivali - Antalya / Side	15-30 Eylül
Yöresel Cafer Dede Kültürel Etk. - Amasya / Uygur	16 Eylül
Miryokefelon Zaferinin Yıldönümü - Isparta / Gelendost	17 Eylül
Savaştepe Panayırı - Balıkesir / Savaştepe	17-19 Eylül
Ayancık Panayırı - Sinop / Ayancık	18-21 Eylül
Sonbahar Hayvan ve Emtia Panayırı - Kırklareli / Pehlivanköy	18-22 Eylül
Atatürk’ün Giresun’a Gelişi - Giresun	19 Eylül
Atatürk’ün Ordu’ya Gelişi - Ordu	19 Eylül
Şehitler ve Gaziler Günü	19 Eylül
Şehitler ve Gaziler Haftası	19 Eylül’ü içine alan hafta
Altın Safran Belgesel Film Festivali - Karabük / Safranbolu	20-24 Eylül
Uluslararası Kültür ve Sanat Fest. - Mersin	20-30 Eylül
Erfelek (Karasu) Panayırı - Sinop / Erfelek	21-26 Eylül
Göynük Panayırı - Bolu / Göynük	Eylül’ün 4. haftası
Akçadağ Kültür ve Sanat Şenlikleri - Malatya / Akçadağ	Eylül’ün 4. haftası
Oğuzeli Nar Festivali - Gaziantep / Oğuzeli	22-23 Eylül
Besni Eğitim ve Kültür Festivali - Adıyaman / Besni	22-24 Eylül
Geleneksel Kaymak ve Kurtuluş Şen. - Afyon / Bolvadin	24 Eylül
Türkiye Cirit Oyunları - Konya	25-26 Eylül
İtfaiyecilik Haftası	25 Eylül -1 Ekim
Dil Bayramı	26 Eylül
Avrupa Dil Günü	26 Eylül
Dünya Turizm Günü	27 Eylül
Sungurbey Şenliği - Çorum / Sungurlu	28-29 Eylül
Taraklı Panayırı - Sakarya / Taraklı	28-30 Eylül
Gölbaşı Kuru Peygamber Üzüm Fes. - Adıyaman / Gölbaşı	29 Eylül -1 Ekim
Soğan Kültür ve Sanat Festivali - Yozgat / Aydıncık	30 Eylül
Uluslararası Atatürk Barajı Su Sporları Şöleni - Adıyaman	Eylül içinde
Eylül Şenlikleri - Amasya / Suluova	Eylül içinde
Yağlı Güreş Festivali - Ankara / Keçiören	Eylül içinde
Kültür – Turizm Festivali - Diyarbakır	Eylül içinde
Kuşburnu-Pestil Turizm Festivali - Gümüşhane	Eylül içinde
Ermenek Sıla Festivali - Karaman / Ermenek	Eylül içinde
Sarıveliler Bal Festivali - Karaman	Eylül içinde
Afşin Eshab-ı Kehf Kültür Sanat ve Karakucak Güreş Fest. - K.Maraş / Afşin	Eylül içinde
Gökçeli Üzüm ve Yaprak Fest. - Tokat / Niksar	Eylül içinde
Bal Teşvik Festivali - Zonguldak / Devrek	Eylül içinde
`);
		const ekim = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・EKİM AYI・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`
Dünya Yaşlılar Günü	1 Ekim
Camiler ve Din Görevlileri Haftası	1-7 Ekim
Dünya Habitat Günü	Ekim’in ilk pazartesi
Dünya Konut Günü	Ekim’in ilk pazartesi
Dünya Mimarlık Günü	Ekim’in ilk pazartesi
Dünya Çocuk Günü	Ekim’in ilk pazartesi
Adilcevaz Ceviz Yetiştiriciliği ve Kültür Etkinlikleri Festivali - Bitlis / Adilcevaz	Ekim’in 1. haftası
Seben Panayırı - Bolu / Seben	Ekim’in 1. haftası
Gerede Panayırı - Bolu / Gerede	Ekim’in 1. haftası
Ayvacık Festivali - Çanakkale / Ayvacık	Ekim’in 1. haftası
Kaman Ceviz ve Kültür Festivali - Kırşehir / Kaman	Ekim’in 1. haftası
Kültür ve Tanıtım Festivali - Çorum / İskilip	1-3 Ekim
Altın Portakal Film Festivali Kısa Film ve Video Film Festivali - Antalya	1-5 Ekim
Anadolu Günleri Festivali - Ankara / Etimesgut	1-15 Ekim
Dünya Hayvanları Koruma Günü	4 Ekim
Dünya Uzay Haftası	4-10 Ekim
Elma Şenlikleri - İçel / Silifke	5 Ekim
Osmaniye Fıstık Festivali - Osmaniye	5-7 Ekim
Zile Asırlık Panayır - Tokat / Zile	5-20 Ekim
Atatürk’ün Kars’a Gelişi - Kars	6 Ekim
Oymaağaç Köyü Bağ Bozumu Orcik ve Pestil Şenlikleri - Elazığ / Oymaağaç Köyü	7 Ekim
Ahilik Haftası	Ekim’in 2. pazartesi
Yenicekent Nar Şenlikleri - Denizli	Ekim’in 2. haftası
Ahilik Kültürü Haftası ve Esnaf Bayr. - Kırşehir	Ekim’in 2. haftası
Atatürk’ün Bandırma’ya Gelişi - Balıkesir / Bandırma	8 Ekim
Dünya Posta Günü	9 Ekim
Atatürk’ün Nazilli’ye Gelişi - Aydın / Nazilli	9 Ekim
Dünya Ruh Sağlığı Günü	10 Ekim
Eskişehir Festivali - Eskişehir	10-18 Ekim
Dünya Gazete Dağıtıcıları Günü	11 Ekim
Atatürk’ün Şebinkarahisar’a Gelişi - Giresin / Şebinkarahisar	11 Ekim
13 Ekim Ankara’nın Başkent Oluşu - Ankara	13 Ekim
Dünya Standartlar Günü	14 Ekim
Karacaoğlan Günü - Adana / Feke	14 Ekim
Atatürk’ün Yozgat’a Gelişi - Yozgat	15 Ekim
İncir Festivali - Mardin / Akarsu Bel.	16 Ekim
Dünya Gıda Günü	16 Ekim
Boyabat Panayırı - Sinop / Boyabat	16-22 Ekim
Dünya Yoksullukla Mücadele Günü	17 Ekim
Birleşmiş Milletler Günü	24 Ekim
Geleneksel Aşıklar Bayramı - Konya	25-29 Ekim
Atatürk’ün Kilis’e Gelişi - Kilis	28 Ekim
Kızılay Haftası	28 Ekim-4 Kasım
Cumhuriyet Bayramı	29 Ekim
Afrodisias Kültür Sanat Festivali - Aydın / Karacasu / Geyre	29 Ekim
Pirinç Panayırı - Çorum / Kargı	29 Ekim-4 Kasım
Kaz Festivali - Ardahan / Çıldır	30 Ekim
Bal-Ceviz Festivali - Batman / Sason	30-31 Ekim
Gökırmak Panayırı - Sinop / Durağan	30 Ekim-5 Kasım
`);
		const kasım = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・KASIM AYI・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`
Türk Harf İnkılabı Haftası	1-7 Kasım
Organ Nakli Haftası	3-9 Kasım
Rahvan At Yarışı - Söke / Aydın	Kasım’ın 1. haftası
Pirinç Panayırı - Osmancık / Çorum	Kasım’ın 1. haftası
Uluslararası Yat Yarışları - Marmaris / Muğla	Kasım’ın 1. haftası
Hamamköy Köyü Kestane Festivali - Ödemiş / İzmir	Kasım 1. pazarı
Zeytin Festivali - Orhangazi / Bursa	Kasım’ın 1. pazartesisi
Uluslararası Karagöz ve Kukla Oyunları Festivali - Bursa	4–8 Kasım
Nahçivan Günleri - Iğdır	5-8 Kasım
Dünya Şehircilik Günü	8 Kasım
Pamuk Festivali - Şenyurt / Mardin	9 Kasım
Atatürk'ün Ölüm Günü	10 Kasım
Atatürk Haftası	10-16 Kasım
Atatürk’ün Bitlis’e gelişi - Bitlis	13 Kasım
Dünya Diabet Günü	14 Kasım
Dünya Çocuk Kitapları Haftası	Kasım’ın 2. haftası
Atatürk’ün Diyarbakır’a gelişi - Diyarbakır	15 Kasım
Atatürk’ün Elazığ’a gelişi - Elazığ	17 Kasım
Atatürk’ün Pertek’e gelişi - Pertek / Tunceli	17 Kasım
Dünya Çocuk Hakları Günü	20 Kasım
Uzuncaburç Kültür Şenliği - Silifke / İçel	20 Kasım
Ceviz Festivali - Yeşilalan / Mardin	21 Kasım
Diş Hekimleri Günü	22 Kasım
Ağız ve Diş Sağlığı Haftası	22 Kasım’ı içine alan hafta
Öğretmenler Günü	24 Kasım
Avrupa Film Festivali - Bursa	24-29 Kasım
Kadına Yönelik Şiddete Karşı Uluslararası Mücadele Günü	25 Kasım
Seyyid Burhaneddin’i Anma Günü - Kayseri 27 Kasım
`);
		const aralık = new Discord.MessageEmbed()
.setColor("#2f3136")
.setAuthor(`▬▬▬▬▬▬▬▬▬▬▬▬・ARALIK AYI・▬▬▬▬▬▬▬▬▬▬▬▬▬`)
.setDescription(`
Adıyaman’ın İl Oluşu Etkinlikleri - Adıyaman	1 Aralık
Dünya AIDS Günü	1 Aralık
Köleliğin Yasaklanması Günü	2 Aralık
Dünya Özürlüler Günü	3 Aralık
Dünya Madenciler Günü	4 Aralık
Ahmet Kuddusi Anma Günü - Bor / Niğde	4 Aralık
Uluslararası Sivil Havacılık Günü	7 Aralık
Kültür ve Sanat Etkinlikleri - Köseçobanlı-Gülnar-İçel	7 Aralık
Kestane Festivali - Köşk-Aydın	Aralık’ın 1. haftası
Sanayi ve İhracaat Ürünleri Fuarı - Konya	10 Aralık
Dünya İnsan Hakları Günü	10 Aralık
İnsan Hakları Haftası	10 Aralık’ı içine alan hafta
Hz. Mevlana’yı Anma Törenleri - Konya	10-17 Aralık
Tutum, Yatırım ve Türk Malları Haftası	12-18 Aralık
Yoksullarla Dayanışma Haftası	12-18 Aralık
Uluslararası Çocuk ve Gençlik Tiyatroları Festivali - Bursa	14-20 Aralık
Atatürk’ün Kayseri’ye Gelişi - Kayseri	19 Aralık
Portakal Festivali - Dörtyol-Hatay	19 Aralık
Atatürk’ün Kırklareli’ne Gelişi - Kırklareli	20 Aralık
Dünya Kooperatifçilik Günü	21 Aralık
Atatürk’ün Kırşehir’e Gelişi - Kırşehir	24 Aralık
2. Cumhurbaşkanı İsmet İnönü’yü Anma Töreni - Malatya	25 Aralık
Atatürk’ün Ankara’ya Gelişi - Ankara	27 Aralık
`)
.setFooter({ text: `Kaynak: T.C. Başbakanlık Basın-Yayın ve Enformasyon Genel Müdürlüğü` });

  
     await message.channel.wsend({embeds: [ocak]});
     await message.channel.wsend({embeds: [şubat]});
     await message.channel.wsend({embeds: [mart]});
     await message.channel.wsend({embeds: [nisan]});
     await message.channel.wsend({embeds: [mayıs]});
     await message.channel.wsend({embeds: [haziran,haziran2]});
     await message.channel.wsend({embeds: [temmuz,temmuz2]});
     await message.channel.wsend({embeds: [ağustos,ağustos2]});
     await message.channel.wsend({embeds: [eylül,eylül2]});
     await message.channel.wsend({embeds: [ekim]});
     await message.channel.wsend({embeds: [kasım]});
     await message.channel.wsend({embeds: [aralık]});

    },
 };