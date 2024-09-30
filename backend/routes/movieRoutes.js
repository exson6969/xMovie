const express = require('express');
const { getMovies, getMovieDetails } = require('../controllers/movieController');

const router = express.Router();

router.get('/', getMovies);
router.get('/:id', getMovieDetails);

module.exports = router;
