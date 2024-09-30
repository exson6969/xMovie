const express = require('express');
const { addMovie, deleteMovie, editMovie } = require('../controllers/adminController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/movie', protect, admin, addMovie);
router.delete('/movie/:id', protect, admin, deleteMovie);
router.put('/movie/:id', protect, admin, editMovie);

module.exports = router;
