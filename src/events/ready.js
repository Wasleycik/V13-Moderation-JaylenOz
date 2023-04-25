const client = global.bot;
const { MessageEmbed, Client, MessageActionRow, MessageButton } = require('discord.js');
const conf = require("../configs/sunucuayar.json");
const penals = require("../schemas/penals");
const bannedTag = require("../schemas/bannedTag");
module.exports = async () => {

  client.guilds.cache.forEach(guild => {
    guild.invites.fetch()
    .then(invites => {
      const codeUses = new Map();
      invites.each(inv => codeUses.set(inv.code, inv.uses));
      client.invites.set(guild.id, codeUses);
  })
})

let guild = client.guilds.cache.get(conf.guildID);
await guild.members.fetch();

  const { joinVoiceChannel } = require("@discordjs/voice");


    const VoiceChannel = client.channels.cache.get(conf.botSes);
    joinVoiceChannel({
        channelId: VoiceChannel.id,
        guildId: VoiceChannel.guild.id,
        adapterCreator: VoiceChannel.guild.voiceAdapterCreator,
        selfDeaf: true
    });


    setInterval(() => {
        const oynuyor = conf.botDurum;
        const index = Math.floor(Math.random() * (oynuyor.length));
  
        client.user.setActivity(`${oynuyor[index]}`, {
          type: "STREAMING",
          url: "https://www.youtube.com/watch?v=qmpzPtaa3vc"});
  
      }, 10000);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const newData = new bannedTag({ guildID: conf.guildID })
  newData.save().catch(e => console.log(e))

setInterval(() => { TagAlıncaKontrol(); }, 20 * 1000);
setInterval(() => { TagBırakanKontrol(); }, 25 * 1000);
setInterval(() => { RolsuzeKayitsizVerme(); }, 10 * 1000);

async function RolsuzeKayitsizVerme()  { // Rolü olmayanı kayıtsıza atma

const guild = client.guilds.cache.get(conf.guildID);
guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== guild.id).size == 0)
   .forEach(r => {
   r.roles.add(conf.unregRoles)
   })
 
};

 // Tag alınca tarama

async function TagAlıncaKontrol() {
const guild = client.guilds.cache.get(conf.guildID)
const members = [...guild.members.cache.filter(member => member.user.tag.includes(conf.tag) && !member.roles.cache.has(conf.jailRole) && !member.roles.cache.has(conf.ekipRolu)).values()].splice(0, 10)
for await (const member of members) {
await member.roles.add(conf.ekipRolu);
}
};

 // Tagı olmayanın family rol çekme

async function TagBırakanKontrol() {
const guild = client.guilds.cache.get(conf.guildID)
const memberss = [...guild.members.cache.filter(member => !member.user.tag.includes(conf.tag) && member.roles.cache.has(conf.ekipRolu)).values()].splice(0, 10)
for await (const member of memberss) {
 await member.roles.remove(conf.ekipRolu);
}
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

setInterval(async () => {  
  const guild = client.guilds.cache.get(conf.guildID);
  if (!guild) return;
  const finishedPenals = await penals.find({ guildID: guild.id, active: true, temp: true, finishDate: { $lte: Date.now() } });
  finishedPenals.forEach(async (x) => {
    const member = guild.members.cache.get(x.userID);
    if (!member) return;
    if (x.type === "CHAT-MUTE") {
      x.active = false;
      await x.save();
      await member.roles.remove(conf.chatMute);
      client.channels.cache.get(conf.cmuteLogChannel).send({ embeds: [new MessageEmbed().setColor("#2f3136").setDescription(`${member.toString()} adlı Kullanıcının **Chat Mute** süresi doldu`)]});
    }
    if (x.type === "TEMP-JAIL") {
      x.active = false;
      await x.save();
      await member.setRoles(conf.unregRoles);
      client.channels.cache.get(conf.jailLogChannel).send({ embeds: [new MessageEmbed().setColor("#2f3136").setDescription(`${member.toString()} üyesinin jaili, süresi bittiği için kaldırıldı!`)]});
    } 
    if (x.type === "VOICE-MUTE") {
      if (member.voice.channelId) {
        x.removed = true;
        await x.save();
        if (member.voice.serverMute) member.voice.setMute(false);
      }
      x.active = false;
      await x.save();
      member.roles.remove(conf.voiceMute);
      client.channels.cache.get(conf.vmuteLogChannel).send({ embeds: [new MessageEmbed().setColor("#2f3136").setDescription(`${member.toString()} adlı Kullanıcının **Ses Mute** süresi doldu`)]});
    }
  });

  const activePenals = await penals.find({ guildID: guild.id, active: true });
  activePenals.forEach(async (x) => {
    const member = guild.members.cache.get(x.userID);
    if (!member) return;
    if (x.type === "CHAT-MUTE" && !conf.chatMute.some((x) => member.roles.cache.has(x))) return member.roles.add(conf.chatMute);
    if ((x.type === "JAIL" || x.type === "TEMP-JAIL") && !conf.jailRole.some((x) => member.roles.cache.has(x))) return member.setRoles(conf.jailRole);
    if (x.type === "VOICE-MUTE") {
      if (!conf.voiceMute.some((x) => member.roles.cache.has(x))) member.roles.add(conf.voiceMute);
      if (member.voice.channelId && !member.voice.serverMute) member.voice.setMute(true);
    }
  });
}, 750);
};

module.exports.conf = {
  name: "ready",
};
