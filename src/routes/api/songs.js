'use strict';
const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const Song = require(path.join(__dirname, '../../classes/song'));
const Playlist = require(path.join(__dirname, '../../classes/playlist'))

router.use(function (req, res, next) {
	res.setHeader('Cache-Control', 'no-cache;must-revalidate;max-age=0');
	next();
});

router.get('/', function(req, res) {
	fs.readdir(path.join(__dirname, "../../../public/music"), function(err, files) {
		if (err) {
			res.send(err);
		} else {
			let playlist = new Playlist('all');
			files.forEach(function(o, i) {
				let file = path.parse(o);
				if (file.ext === '.mp3') {
					playlist.addSong(file.base);
				}
			});
			res.json(playlist.toJSON());
		}
	});
});

router.get(['/:songurl/details'], function (req, res) {
	new Song(path.join(__dirname, '../../../public/music/' + decodeURI(req.params.songurl))).then((song) => {
		res.json({
			"genres": song.genres,
			"fullname": song.fullname,
			"artist": song.artist,
			"title": song.title,
			"url": song.url
		});
	}).catch((err) => {
		res.statusCode = 500;
		res.send(err);
	});
});

router.get(['/:songurl/picture','/:songurl/pic','/:songurl/thumb','/:songurl/thumbnail'], function (req, res) {
	new Song(path.join(__dirname, '../../../public/music/' + decodeURI(req.params.songurl))).then((song) => {
		res.setHeader('Content-Type', song.thumbnail.type);
		res.send(Buffer.from(song.thumbnail.data));
	}).catch((err) => {
		res.statusCode = 404;
		res.send(err);
	});
});

module.exports = router;
