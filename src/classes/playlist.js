let Playlist = class Playlist {
    constructor(name) {
        this.name = name;
        this.created = Date.now();
        this.songs = [];
    }
    addSong(song) {
        this.songs.push(song);
    }
	delSong(s) {
		this.songs.forEach(function (song, i) {
			if (s === song || s.id == song.id) {
				this.songs.splice(i, 1);
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
    toJSON() {
        return this;
    }
};

Playlist.import = function() {

};

module.exports = Playlist;
