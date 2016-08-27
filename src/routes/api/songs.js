'use strict';
const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const Utils = require(path.join(__dirname, '../../utils'));
const Song = require(path.join(__dirname, '../../classes/song'));
const Playlist = require(path.join(__dirname, '../../classes/playlist'));

router.use(function (req, res, next) {
	res.setHeader('Cache-Control', 'no-cache;must-revalidate;max-age=0');
	next();
});

router.param('song', function (req, res, next) {
	new Song(path.join(__dirname, '../../../public/music/' + decodeURI(req.params.song))).then((song) => {
		req.song = song;
		next();
	}).catch((err) => {
		res.statusCode = 500;
		res.json(Utils.getErrorObject(err.message));
	});
});

router.get('/', function(req, res) {
	fs.readdir(path.join(__dirname, '../../../public/music'), function(err, files) {
		if (err) {
			res.send(err);
		} else {
			let playlist = new Playlist('all');
			files.forEach(function(o) {
				let file = path.parse(o);
				if (file.ext === '.mp3') {
					playlist.addSong(file.base);
				}
			});
			res.json(playlist.toJSON());
		}
	});
});

router.get(['/:song/basic'], function(req, res) {
    let song = req.song;
    res.json({
        genres: song.genres,
        fullname: song.fullname,
        artists: song.artists,
        title: song.title,
        year: song.year,
        duration: song.duration
    });
});

router.get(['/:song/details'], function (req, res) {
	let song = req.song;
	res.json(song.toJSON());
});

router.get(['/:song/picture','/:song/pic','/:song/thumb','/:song/thumbnail'], function (req, res) {
	let song = req.song;
	res.setHeader('Content-Type', song.thumbnail.substring(song.thumbnail.indexOf('data:image/') + 'data:'.length, song.thumbnail.indexOf(';base64,')));
	res.send(Buffer.from(song.thumbnail.substring(song.thumbnail.indexOf(';base64,') + ';base64,'.length), 'base64'));
});

module.exports = router;
