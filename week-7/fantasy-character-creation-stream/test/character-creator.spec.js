const CharacterCreator = require('../src/character-creator');

describe('CharacterCreator', () => {
  let characterCreator;

  beforeEach(() => {
    characterCreator = new CharacterCreator();
  });

  test('should process data correctly when written to', (done) => {
    const input = {
      class: 'Warrior',
      gender: 'Male',
      funFact: 'Loves dragons'
    };

    characterCreator.write(input, () => {
      characterCreator.on('data', (chunk) => {
        expect(chunk).toBe('You have created a Male Warrior. Fun fact: Loves dragons.');
        done();
      });

      characterCreator.read();
    });
  });

  test('should emit "error" when invalid data is written', (done) => {
    characterCreator.on('error', (err) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe('Invalid character data.');
      done();
    });

    characterCreator.write('', () => {}); // writing an empty string (invalid)
  });

  test('should transform data correctly when written to', (done) => {
    const input = {
      class: 'Mage',
      gender: 'Female',
      funFact: 'Can summon lightning'
    };

    characterCreator.write(input, () => {
      characterCreator.on('data', (chunk) => {
        expect(chunk).toBe('You have created a Female Mage. Fun fact: Can summon lightning.');
        done();
      });

      characterCreator.read();
    });
  });
});
