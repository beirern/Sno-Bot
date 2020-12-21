// Class to interact with Google Text-to-Speech
// https://cloud.google.com/text-to-speech/docs/quickstart-client-libraries

const gTTS = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');

const gTTSClient = new gTTS.TextToSpeechClient();

class Speaker {
  // Takes a string (text) and turns it into an MP3 files. Then calls a function
  // at the end. This function is always the speak() function in practice.
  static async googleSpeak(text, voice, volume, connection, callback) {
    const request = {
      input: { text },
      // Select the language and SSML voice gender (optional)
      voice,
      // select the type of audio encoding
      audioConfig: { audioEncoding: 'MP3' },
    };
    const [response] = await gTTSClient.synthesizeSpeech(request);

    const writeFile = util.promisify(fs.writeFile);
    await writeFile('output.mp3', response.audioContent, 'binary');
    console.log('Audio content written to file: output.mp3');
    callback(connection, volume);
  }

  // Takes a mp3 file and play it. Uses Discord.js API to play the file in Discord.
  static speak(connection, volume, file = 'output.mp3') {
    let dispatcher;
    if (file !== 'output.mp3') {
      dispatcher = connection.play(file, {
        volume,
      });
    } else {
      dispatcher = connection.play(file);
    }

    dispatcher.on('finish', () => {
      console.log('Finished Playing');
      dispatcher.destroy();
    });
  }
}

module.exports = Speaker;
