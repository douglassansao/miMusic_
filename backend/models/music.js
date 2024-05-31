const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
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
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
    },
    fileUrl: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Music', musicSchema);
