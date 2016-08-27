'use strict';
const router = require('express').Router();
// const fs = require('fs');
// const path = require('path');
// const Song = require(path.join(__dirname, '../../classes/song'));
// const Playlist = require(path.join(__dirname, '../../classes/playlist'));

router.get(':seed/', function (req, res) {
	res.send();
	// TODO
});

router.get('/', function (req, res) {
	res.send();
	// TODO send default playlist
});

module.exports = router;
