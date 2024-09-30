const Booking = require("../models/Booking");
const Seat = require("../models/Seat");

exports.createBooking = async (req, res) => {
  const { movieId, showtime, seats, totalAmount } = req.body;

  try {
    await Seat.updateMany(
      { seatNumber: { $in: seats }, movie: movieId, showtime },
      { $set: { isAvailable: false } }
    );

    const booking = new Booking({
      user: req.user._id,
      movie: movieId,
      seats,
      showtime,
      totalAmount,
    });
    await booking.save();
    res.status(201).json({ message: "Booking Successful", booking });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getBookingHistory = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate(
      "movie"
    );
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
