const { Duplex } = require('stream');

class CharacterCreator extends Duplex {
  constructor(options) {
    super({ ...options, readableObjectMode: true, writableObjectMode: true });
    this.characterData = null;
  }

  _write(chunk, encoding, callback) {
    try {
      if (!chunk || typeof chunk !== 'object') {
        return callback(new Error('Invalid character data.'));
      }

      const { class: charClass, gender, funFact } = chunk;

      if (!charClass || !gender || !funFact) {
        return callback(new Error('Missing required fields.'));
      }

      this.characterData = { charClass, gender, funFact };
      callback(); // success
    } catch (err) {
      callback(err);
    }
  }

  _read(size) {
    if (this.characterData) {
      const { charClass, gender, funFact } = this.characterData;
      const output = `You have created a ${gender} ${charClass}. Fun fact: ${funFact}.`;
      this.push(output);
      this.push(null); // end of stream
    } else {
      this.push(null);
    }
  }
}

module.exports = CharacterCreator;
