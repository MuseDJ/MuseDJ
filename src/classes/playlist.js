const path = require('path');
const Song = require(path.join(__dirname, 'song'));
const Shuffle = require(path.join(__dirname, 'shuffle'));

let Playlist = class Playlist {
    constructor(options) {
		if (options == undefined) options = {};
        if (!options.hasOwnProperty('name')) options.name = 'Unnamed Playlist';
        if (!options.hasOwnProperty('songs')) options.songs = [];

        this.name = options.name;
        this.created = Date.now();
        this.seeder = Shuffle.seeder();
        this.songs = options.songs;

        if (options.seed == undefined) options.seed = this.seeder.set(this.songs.length + Math.floor(Math.random() * this.songs.length));
        else this.seeder.import(options.seed);
        Shuffle.randomShuffle(this.songs, this.seeder.get());
    }
    setSeed(seed) {
        if (seed !== undefined) {
            this.seeder.import(seed);
        } else {
            this.seeder.set(this.songs.length + Math.floor(Math.random() * this.songs.length));
        }
        this.shuffle();
        return this;
    }
    shuffle() {
        this.songs = Shuffle.randomShuffle(this.songs, this.seeder.get());
        return this.songs;
    }
    addSong(song) {
		// REVIEW: Add index to allow starting position
        if (!(song instanceof Song)) return;
        this.songs.push(song);
        return this.songs;
    }
    delSong(s) {
        if (typeof s === 'number') return this.songs.splice(s, 1);
        if (!(s instanceof Song)) return undefined;
        this.songs.forEach(function(song, i) {
            if (s === song || s.toString() == song.fullname) {
                return this.songs.splice(i, 1);
            }
        });
    }
    setSongPos(original, index) {
        if (index >= this.length) {
            var k = index - this.length;
            while ((k--) + 1) {
                this.songs.push(undefined);
            }
        }
        this.songs.splice(index, 0, this.songs.splice(original, 1)[0]);
        return this.songs;
    }
    getEncodedSongList() {
        return this.songs.map(function(song) {
            return encodeURI(song.toString());
        });
    }
    toJSON() {
        return {
            name: this.name,
            createD: this.created,
            songs: this.getEncodedSongList()
        };
    }
};

module.exports = Playlist;
