const path = require('path');
const {expect} = require('chai');
const Playlist = require(path.join(__dirname.toString().replace('\\test\\', '\\'), 'playlist'));
const Song = require(path.join(__dirname.toString().replace('\\test\\', '\\'), 'song'));
// const Shuffle = require(path.join(__dirname.toString().replace('\\test\\', '\\'), 'shuffle'));

let defaultSong = process.env.TEST_SONG;

describe('Playlist', function () {
	it('Should have a constructor', function () {
		expect((function(){new Playlist();})).to.not.throw();
	});
	it('Should have a name', function () {
		let playlist = new Playlist({name: 'Playlist Title'});
		expect(playlist.name).to.not.be.undefined;
		expect(playlist.name).to.equal('Playlist Title');
	});
	it('Should have a default name', function () {
		let playlist = new Playlist();
		expect(playlist.name).to.not.be.undefined;
		expect(playlist.name).to.equal('Unnamed Playlist');
	});
	it('Should have a seeder', function () {
		let playlist = new Playlist();
		expect(playlist.seeder).to.not.be.undefined;
		expect(playlist.seeder).to.be.an('object');
		expect(playlist.seeder).to.have.property('get');
		expect(playlist.seeder).to.have.property('set');
		expect(playlist.seeder).to.have.property('import');
	});
	it('Should be able to add a song', function (done) {
		let playlist = new Playlist();
		new Song(path.join(__dirname, '../../../public/music/' + decodeURI(defaultSong))).then((song) => {
			expect(playlist.songs.length).to.equal(0, 'Playlist already has a song.');
			playlist.addSong(song);
			expect(playlist.songs.length).to.equal(1);
			done();
		}).catch((err) => {
			done(err);
		});
	});
});
