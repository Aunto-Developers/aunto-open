var Discord = require('discord.js');

exports.run = async(client, msg, args) => {
  msg.channel.send(`**Pong!** ${client.ws.ping}ms`)
}
