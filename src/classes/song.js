'use strict';
const path = require('path');
const Promise = require('promise');
const getArtistTitle = require('get-artist-title');
const jsmediatags = require('jsmediatags');

let Song = class Song {
	constructor(dest) {
		this.fullname = path.parse(dest).name;
		return new Promise((done, reject) => {
			jsmediatags.read(dest, {
				onSuccess: function (tags) {
					// this.tags = tags;
					this.genres = [];
					this.fullname = path.parse(dest).name;
					this.artist = getArtistTitle(this.fullname)[0];
					this.title = getArtistTitle(this.fullname)[1];
					this.thumbnail = tags.tags.picture;
					// this.duration = 0;
					this.url = path.join('music/', encodeURI(path.parse(dest).base));
					done(this);
				},
				onError: function (err) {
					reject(err);
				}
			});
		});
	}
	toString() {
		return this.fullname;
	}
};

module.exports = Song;
