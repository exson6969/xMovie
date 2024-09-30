const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    seatNumber: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    showtime: { type: Date, required: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true }
});

module.exports = mongoose.model('Seat', seatSchema);
