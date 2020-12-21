const fs = require('fs');
const util = require('util');

const GrammarSolver = require('./GrammarSolver');
const Speaker = require('./Speaker');
const StorageHandler = require('./Storage');

const symbols = require('../db/symbols.json');
const voices = require('../db/voices');

class Sno {
  constructor() {
    this.DEFAULT_VOICE = 13;
    this.DEFAULT_VOLUME = 0.65;

    this.voiceNumber = this.DEFAULT_VOICE;
    this.voice = voices.get(this.voiceNumber);
    this.volume = this.DEFAULT_VOLUME;

    this.solver = new GrammarSolver();

    this.helpMessage = `
      \`\`\`Hello! Here are the commands:
      > Help:
      !sno

      > Sentence:
      !sno sentence
      (2/3 chance of being randomly generated)

      > Insult:
      !sno insult
      (2/3 chance of being randomly generated)
      Follows a specific structure (|Name| is |Adjective|)

      !sno insult |Noun|
      Insults a Noun with the structure |Noun| is |Adjective|

      > Friends:
      !sno |Friend Name|

      > Change Voice:
      !sno voice |Number|
      Australian Accent (0-7)
      Indian Accent (8-13)
      British Accent (14-21)
      American Accent (22-31)

      Generally first half of numbers are Standard and second half
      are Wavenet. Then first half of that are Female and other is Male.

      > Add Words
      !sno add |Common Noun (N)/Personal Noun(PN)/Adj/Transitive Verb (TV)/Intransitive Verb (IV)/Sentence (S)/Insult (I)| |Word/Sentence|
      Adds a word or sentence or insult to database

      > Delete Words
      !sno delete |Common Noun (N)/Personal Noun(PN)/Adj/Transitive Verb (TV)/Intransitive Verb (IV)/Sentence (S)/Insult (I)| |Word/Sentence|
      Delete a word or sentence or insult to database

      > Play Song
      !sno song |Song Name|
      Play's the song

      > Leave
      !sno leave
      Sno-Bot leaves
      \`\`\`
    `;
  }

  // Currently no command accesses this
  getVoice(message, connection) {
    message.reply(`Voice set to ${this.voice}: ${voices.get(this.voice).name}`);
    Speaker.googleSpeak('Is my mike working?', this.voice, this.volume, connection, Speaker.speak);
  }

  // Sets the voice to the voice of the person from the map in db/voices.js
  setVoice(message, connection, voiceNumber) {
    if (Number(voiceNumber) < 0 || Number(voiceNumber) > 31) {
      message.reply('Number must be between 0 and 31');
      return;
    }

    this.voice = voiceNumber;
    message.reply(`Voice set to ${this.voice}: ${voices.get(voiceNumber).name}`);
    Speaker.googleSpeak('Is my mike working?', this.voice, this.volume, connection, Speaker.speak);
  }

  // Forms a random sentence or chooses a premade one
  async sentence(message, connection, symbol) {
    const sentence = await this.solver.getSentence(symbol);
    message.channel.send(sentence);
    Speaker.googleSpeak(sentence, this.voice, this.volume, connection, Speaker.speak);
  }

  // Makes an insult or chooses a premade one
  async insult(message, connection, args) {
    if (args.length === 2) {
      const person = `${args[1].charAt(0).toUpperCase() + args[1].substring(1)} `;
      const insult = await this.solver.getSentence('<pi>').toLowerCase();
      message.channel.send(person + insult);
      Speaker.googleSpeak(person + insult, this.voice, this.volume, connection, Speaker.speak);
    } else {
      const insult = await this.solver.getSentence('<i>');
      message.channel.send(insult);
      Speaker.googleSpeak(insult, this.voice, this.volume, connection, Speaker.speak);
    }
  }

  // Plays a song that is stores in GCP Storage
  async song(message, connection, args) {
    if (args.length !== 2 && args.length !== 3) {
      message.reply('Format is !sno song |Song Name|');
      Speaker.googleSpeak('Wrong!', this.voice, this.volume, connection, Speaker.speak);
      return;
    }
    // Would check here for which song to grab
    if (args[1].toLowerCase() === 'SONG-NAME') {
      await StorageHandler.downloadFile('BUCKET-NAME', 'media/SONG-NAME.wav', './media/SONG-NAME.wav').catch(console.error);
      Speaker.speak(connection, this.volume, './media/SONG-NAME.wav');
    } else {
      message.reply('Format is !sno song |Song Name|');
      Speaker.googleSpeak('Wrong!', this.voice, this.volume, connection, Speaker.speak);
    }
  }

  // Similar to song but poems were short enough to be stored as string variable in this file
  poem(message, connection, args) {
    if (args.length !== 2) {
      message.reply('Format is !sno poem |Poem Name|');
      Speaker.googleSpeak('Wrong!', this.voice, this.volume, connection, Speaker.speak);
      return;
    }
    // Would check here for which poem to grab
    if (args[1].toLowerCase() === 'POEM-NAME') {
      const POEM = '';
      message.channel.send(POEM);
      Speaker.googleSpeak(POEM, this.voice, this.volume, connection, Speaker.speak);
    } else {
      message.reply('Format is !sno poem |Kevin/Seva|');
      Speaker.googleSpeak('Wrong!', this.voice, this.volume, connection, Speaker.speak);
    }
  }

  // This was used for things that did not fall into a defined category, usually good one-liners
  miscellaneous(message, connection, args) {
    if (args[0].toLowerCase() === 'COMMAND-NAME') {
      const COMMAND = '';
      message.channel.send(COMMAND);
      Speaker.googleSpeak(COMMAND, this.voice, this.volume, connection, Speaker.speak);
    } else {
      this.error(message, connection, args);
    }
  }

  // Help Message
  help(message) {
    message.channel.send(this.helpMessage);
  }

  // Simple error handling method if command was not clear
  error(message, connection, args) {
    const errorMessage = `Unknown command: ${args}`;
    message.channel.send(errorMessage);
    Speaker.googleSpeak(errorMessage, this.voice, this.volume, connection, Speaker.speak);
  }

  // Adds to symbols.json. Must be one of the keys in symbols.json.
  async add(message, connection, args) {
    if (args.length < 3) {
      message.reply('The Format is !sno add |Common Noun (N)/Personal Noun (PN)/Adj/Transitive Verb (TV)/Intransitive Verb (IV)/Sentence (S)/Insult (I)| |Word/Sentence|');
      Speaker.googleSpeak('Wrong!', this.voice, this.volume, connection, Speaker.speak);
      return;
    }
    let symbol = args[1].toLowerCase().trim();
    const availableSymbols = ['n', 'pn', 'tv', 'iv', 's', 'i', 'adj'];
    if (!availableSymbols.includes(symbol)) {
      message.reply('The Format is !sno add |Common Noun (N)/Personal Noun (PN)/Adj/Transitive Verb (TV)/Intransitive Verb (IV)/Sentence (S)/Insult (I)| |Word/Sentence|');
      Speaker.googleSpeak('Wrong!', this.voice, this.volume, connection, Speaker.speak);
      return;
    }
    if (symbol === 's') {
      symbol = 'sentences';
    }
    if (symbol === 'i') {
      symbol = 'insults';
    }
    let sentence = args[2].toLowerCase().trim();
    for (let i = 3; i < args.length; i += 1) {
      sentence += ` ${args[i].toLowerCase()}`;
    }
    if (!symbols[symbol].includes(sentence)) {
      symbols[symbol].push(sentence.trim());
      const json = JSON.stringify(symbols);
      const writeFile = util.promisify(fs.writeFile);
      await writeFile('symbols.json', json);
      message.reply(`Added ${sentence} as a ${symbol}`);
    } else {
      message.reply(`${sentence} is already saved as a ${symbol}`);
      Speaker.googleSpeak('Whoopsie', this.voice, this.volume, connection, Speaker.speak);
    }
  }

  // Removes a word from symbols.json.
  async delete(message, connection, args) {
    if (args.length < 3) {
      message.reply('The Format is !sno delete |Common Noun (N)/Personal Noun (PN)/Adj/Transitive Verb (TV)/Intransitive Verb (IV)/Sentence (S)/Insult (I)| |Word/Sentence|');
      Speaker.googleSpeak('Wrong!', this.voice, this.volume, connection, Speaker.speak);
      return;
    }
    let symbol = args[1].toLowerCase().trim();
    const availableSymbols = ['n', 'pn', 'tv', 'iv', 's', 'i'];
    if (!availableSymbols.includes(symbol)) {
      message.reply('The Format is !sno delete |Common Noun (N)/Personal Noun (PN)/Adj/Transitive Verb (TV)/Intransitive Verb (IV)/Sentence (S)/Insult (I)| |Word/Sentence|');
      Speaker.googleSpeak('Wrong!', this.voice, this.volume, connection, Speaker.speak);
      return;
    }
    if (symbol === 's') {
      symbol = 'sentences';
    }
    if (symbol === 'i') {
      symbol = 'insults';
    }
    let sentence = args[2].toLowerCase().trim();
    for (let i = 3; i < args.length; i += 1) {
      sentence += ` ${args[i].toLowerCase()}`;
    }
    if (symbols[symbol].includes(sentence)) {
      const index = symbols[symbol].indexOf(sentence);
      symbols[symbol].splice(index, 1);
      const json = JSON.stringify(symbols);
      const writeFile = util.promisify(fs.writeFile);
      await writeFile('symbols.json', json);
      message.reply(`Removed ${sentence} as a ${symbol}`);
    } else {
      message.reply(`${sentence} is not a ${symbol}`);
      Speaker.googleSpeak('Try Again.', this.voice, this.volume, connection, Speaker.speak);
    }
  }
}

module.exports = Sno;
