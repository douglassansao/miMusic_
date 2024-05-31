const express = require('express');
const router = express.Router();
const Album = require('../models/albums');

// Get all albums
router.get('/', async (req, res) => {
    try {
        const albums = await Album.find().populate('songs');
        res.json(albums);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new album
router.post('/', async (req, res) => {
    const album = new Album({
        title: req.body.title,
        artist: req.body.artist,
        genre: req.body.genre,
        releaseDate: req.body.releaseDate,
        coverUrl: req.body.coverUrl,
    });

    try {
        const newAlbum = await album.save();
        res.status(201).json(newAlbum);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
