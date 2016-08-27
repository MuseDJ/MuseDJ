'use strict';
const path = require('path');
const Promise = require('promise');
const getArtistTitle = require('get-artist-title');
const fs = require('fs');
const mm = require('musicmetadata');

let Song = class Song {
	constructor(dest) {
		let self = this;
		return new Promise((done, reject) => {
			fs.stat(dest, (err, stats) => {
				if (err || stats.isFile() === false) return reject(new Error('Unknown File or File Type'));
				mm(fs.createReadStream(dest), {duration: true}, function (err, meta) {
					if (err) return reject(err);

					self.fullname = path.parse(dest).name;
					let [artist, title] = getArtistTitle(self.fullname);
					self.artists = [artist];
					self.title = title;

					self.genres = meta.genre;
					self.year = meta.year;
					self.thumbnail = meta.picture;
					let thumbnail = Buffer.from(meta.picture[0].data);
					self.thumbnail =  'data:image/' + meta.picture[0].format + ';base64,' + thumbnail.toString('base64');
					self.duration = meta.duration;
					return done(self);
				});
			});
		});
	}

	toString() {
		return this.fullname;
	}
	toJSON() {
		return {
			genres: this.genres,
			fullname: this.fullname,
			artists: this.artists,
			title: this.title,
			year: this.year,
			thumbnail: this.thumbnail,
			duration: this.duration,
			url: this.url
		};
	}
};

module.exports = Song;
