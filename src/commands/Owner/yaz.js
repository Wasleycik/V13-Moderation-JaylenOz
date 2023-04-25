
module.exports = {
  conf: {
    aliases: ["yaz"],
    name: "yaz",
    owner: true,
  },

  run: async (client, message, args) => {
    if(!args[0])
    message.delete();
    message.channel.wsend({ content: args.join(' ')});
  },
};

  