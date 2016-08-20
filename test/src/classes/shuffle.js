const path = require('path');
const {expect} = require('chai');
const Shuffle = require(path.join(__dirname.toString().replace('\\test\\', '\\'), 'shuffle'));

describe('Shuffle', function () {
	describe('Seeder', function () {
		it('Should return an object', function () {
			let seed = Shuffle.seeder();
			expect(seed).to.be.an('object');
		});
		it('Should have a get method', function () {
			let seed = Shuffle.seeder();
			expect(seed.get).to.be.a('function');
		});
		it('Should have a set method', function () {
			let seed = Shuffle.seeder();
			expect(seed.set).to.be.a('function');
		});
		it('Should have an import method', function () {
			let seed = Shuffle.seeder();
			expect(seed.import).to.be.a('function');
		});
		it('Should be able to import an encoded seed and be identical', function () {
			let seed1 = Shuffle.seeder(),
				seed2 = Shuffle.seeder();
			seed1.set(10);
			seed2.import(seed1.encode());
			expect(seed1.get()).to.eql(seed2.get());
		});
		it('Should have an encode method', function () {
			let seed = Shuffle.seeder();
			expect(seed.encode).to.be.a('function');
		});
		it('Should have a clear method', function () {
			let seed = Shuffle.seeder();
			expect(seed.clear).to.be.a('function');
		});
		it('Should return an array of a set length after get is called', function () {
			let seed = Shuffle.seeder();
			seed.set(10);
			expect(seed.get().length).to.equal(10);
		});
		it('Should return an empty array after being cleared', function () {
			let seed = Shuffle.seeder();
			seed.clear();
			expect(seed.get()).to.eql([]);
		});
	});
	describe('RandomShuffle', function () {
		let randomShuffle = Shuffle.randomShuffle;
		let seeder = Shuffle.seeder;
		let array = ['a','b','c','d','e'];
		it('Should return a different array than original', function () {
			expect(randomShuffle(array, seeder().set(array.length))).to.not.eql(array);
			expect(randomShuffle(array, [])).to.not.eql(array);
		});
		it('Should return different results for the same seed length', function () {
			expect(randomShuffle(array, seeder().set(array.length))).to.not.eql(array);
			expect(randomShuffle(array, seeder().set(array.length))).to.not.eql(array);
		});
		it('Should return the same results for the same seed', function () {
			let seed = seeder().set(array.length);
			expect(randomShuffle(array, seed)).to.eql(randomShuffle(array, seed));
		});
	});
});

// var seed = new Shuffle().seeder().set(arr.length + new Date().getMilliseconds());
//
// var arr = ["a", "b", "c", "d"];
// seed.import();
// seed.set(arr.length + new Date().getMilliseconds());
// console.log(randomShuffle(arr, seed.get()));
// console.log(randomShuffle(arr, seed.get()));
// console.log(randomShuffle(arr, seed.get()));
