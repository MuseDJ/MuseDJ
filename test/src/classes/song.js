const path = require('path');
const {expect} = require('chai');
const Song = require(path.join(__dirname.toString().replace('\\test\\', '\\'), 'song'));

describe('Songs', function () {
	describe('Class', function () {
		it('Has a constructor', function () {
			// TODO Better testing of acutal constructor
			expect(Song).to.be.a('function');
		});
	});
});
