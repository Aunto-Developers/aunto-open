require('dotenv').config();
var Discord = require('discord.js');
var client = new Discord.Client();
var fs = require('fs');

client.on('ready', async() => {
  console.info(`Logged in as ${client.user.tag}.`);
});

fs.readdir('./commands/', (err, files) => {
  if(err) console.log(err);
  var file = files.filter(f => f.split('.').pop() === 'js');
  
  if(file.length <= 0){
    console.error('No commands were found.');
    return;
  };
  
  file.forEach(async(f, i) => {
    var props = require(`./commands/${f}`);
    console.info(`Loaded ${f}`);
  });
});

client.on('message', async(msg) => {
  if(msg.author.bot || !msg.guild) return;
  if(msg.content.indexOf(process.env.PREFIX) !== 0) return;
  
  var args = msg.content.split(/\s+/g);
  var cmd = args.shift().slice(process.env.PREFIX.length).toLowerCase();
  
  try {
    var file = require(`./commands/${cmd}.js`);
    file.run(client, msg, args);
  } catch(err) {
    console.warn(err);
  }
});

client.login(process.env.TOKEN);
