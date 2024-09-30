const express = require('express');
const { createBooking, getBookingHistory } = require('../controllers/bookingController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/book', protect, createBooking);
router.get('/history', protect, getBookingHistory);

module.exports = router;
