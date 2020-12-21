require('dotenv').config(); // If using .env file
const Discord = require('discord.js');
const Sno = require('./src/Sno');

// Takes Token and Prefix from .env file or uses a declared environment variable
const token = process.env.DISCORD_TOKEN;
const prefix = process.env.PREFIX;

const client = new Discord.Client();

let sno;

// Prints out 'Ready' to console when ready
client.once('ready', async () => {
  sno = new Sno();
  console.log('Ready!');
});

// Waits for a message and if it has '!sno', checks what to do
client.on('message', async (message) => {
  if (!message.guild || !message.content.toLowerCase().startsWith(prefix) || message.author.bot) {
    return;
  }
  if (message.content.toLowerCase() === '!sno') {
    sno.help(message);
    return;
  }

  // Person must be in a voice channel
  if (message.member.voice.channel) {
    const connection = await message.member.voice.channel.join();
    const args = message.content.split(/ +/);
    const command = args.shift().toLowerCase();

    // Decides what to do based on what is passed in
    if (command === prefix) {
      if (args[0].toLowerCase() === 'voice') {
        if (message.content.toLowerCase().match('!sno voice [0-9]+')) {
          const voiceNumber = message.content.split(/ +/)[2];
          sno.setVoice(message, connection, voiceNumber);
        }
      } else if (args[0].toLowerCase() === 'sentence') {
        sno.sentence(message, connection, '<s>');
      } else if (args[0].toLowerCase() === 'insult') {
        sno.insult(message, connection, args);
      } else if (args[0].toLowerCase() === 'add') {
        await sno.add(message, connection, args);
      } else if (args[0].toLowerCase() === 'delete') {
        await sno.delete(message, connection, args);
      } else if (args[0].toLowerCase() === 'song') {
        sno.song(message, connection, args);
      } else if (args[0].toLowerCase() === 'poem') {
        sno.poem(message, connection, args);
      } else if (args[0].toLowerCase() === 'leave') {
        message.member.voice.channel.leave();
      } else {
        sno.miscellaneous(message, connection, args);
      }
    }
  } else {
    message.reply('Must be in a voice channel');
  }
});

client.login(token);
