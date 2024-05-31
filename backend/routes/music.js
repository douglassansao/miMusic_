const express = require('express');
const multer = require('multer');
const router = express.Router();
const Music = require('../models/music');

// Multer setup for music file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

// Get all musics
router.get('/', async (req, res) => {
    try {
        const musics = await Music.find().populate('album');
        res.json(musics);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new music
router.post('/', upload.single('file'), async (req, res) => {
    const music = new Music({
        title: req.body.title,
        artist: req.body.artist,
        genre: req.body.genre,
        album: req.body.album,
        fileUrl: req.file.path,
    });

    try {
        const newMusic = await music.save();
        res.status(201).json(newMusic);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
