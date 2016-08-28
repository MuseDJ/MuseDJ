const path = require('path');
const {expect} = require('chai');
const Song = require(path.join(__dirname.toString().replace('\\test\\', '\\').replace('/test/','/'), 'song'));

let defaultSong = process.env.TEST_SONG;

describe('Songs', function() {
    it('Has a constructor', function(done) {
        new Song(path.join(__dirname, '../../../public/music/', decodeURI(defaultSong))).then(() => {
            done();
        }).catch((err) => {
            done(err);
        });
        expect(Song).to.be.a('function', 'Not a function.');
    });
    it('Should return an object', function(done) {
        new Song(path.join(__dirname, '../../../public/music/', decodeURI(defaultSong))).then((song) => {
            expect(song).to.be.an('object');
            done();
        }).catch((err) => {
            done(err);
        });
    });
    it('Should throw an error for unknown song', function(done) {
        new Song('').then(() => {
            done(new Error('Didn\'t throw an error for unknown song.'));
        }).catch(() => {
            done();
        });
    });
});
