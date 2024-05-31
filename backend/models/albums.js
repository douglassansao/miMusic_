const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    coverUrl: {
        type: String,
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Music',
    }],
});

module.exports = mongoose.model('Album', albumSchema);
