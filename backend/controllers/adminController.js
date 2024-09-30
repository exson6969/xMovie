const Movie = require("../models/Movie");

exports.addMovie = async (req, res) => {
  const {
    title,
    genre,
    description,
    duration,
    releaseDate,
    showtimes,
    poster,
  } = req.body;

  try {
    const newMovie = new Movie({
      title,
      genre,
      description,
      duration,
      releaseDate,
      showtimes,
      poster,
    });
    await newMovie.save();
    res
      .status(201)
      .json({ message: "Movie added successfully", movie: newMovie });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id); // Updated method
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.editMovie = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).send({ error: "Movie not found" });
    }

    Object.keys(updates).forEach((key) => {
      movie[key] = updates[key];
    });

    await movie.save();

    res.send(movie);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ error: "Failed to update movie", details: error.message });
  }
};
