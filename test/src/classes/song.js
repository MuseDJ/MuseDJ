const path = require('path');
const {expect} = require('chai');
const Song = require(path.join(__dirname.toString().replace('\\test\\', '\\'), 'song'));

let defaultSong = process.env.TEST_SONG;

console.log("DEFAULT SONG", process.env.TEST_SONG);

describe('Songs', function () {
	describe('Class', function () {
		it('Has a constructor', function () {
			// TODO Better testing of acutal constructor
			//console.log("Song is", Song);
			console.log("TYPEOF SONG", typeof Song);
			expect(new Song(path.join(__dirname, '../../../public/music/' + decodeURI(defaultSong)))).to.not.throw();
			expect(Song).to.be.a('function');
		});
	});
});
