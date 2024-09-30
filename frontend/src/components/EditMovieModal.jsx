import React, { useEffect, useState } from "react";
import axios from "axios";
import useStore from "../store/useStore";
import { Plus } from "lucide-react";

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toISOString().split("T")[0]; 
};

const toISOString = (dateString) => {
  return new Date(dateString).toISOString(); 
};

const EditMovieModal = ({ movieId }) => {
  const BASEURL = process.env.REACT_APP_BASE_URL;
  const { token, movies, addMovies } = useStore();

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [poster, setPoster] = useState("");
  const [showTimeInput, setShowTimeInput] = useState("");
  const [showTimes, setShowTimes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const movie = movies.find((m) => m._id === movieId);
    if (movie) {
      setTitle(movie.title);
      setGenre(movie.genre);
      setDescription(movie.description);
      setDuration(movie.duration.toString());
      setReleaseDate(formatDate(movie.releaseDate)); 
      setPoster(movie.poster);
      setShowTimes(movie.showtimes);
    }
  }, [movieId, movies]);

  const handleAddShowTime = (e) => {
    e.preventDefault();
    if (showTimeInput) {
      setShowTimes([...showTimes, showTimeInput]);
      setShowTimeInput("");
    }
  };

  const handleRemoveShowTime = (index) => {
    const updatedShowTimes = showTimes.filter((_, i) => i !== index);
    setShowTimes(updatedShowTimes);
  };

  const isFormValid = () => {
    return (
      title?.trim() &&
      genre &&
      description?.trim() &&
      duration &&
      releaseDate &&
      poster?.trim() &&
      showTimes.length > 0
    );
  };

  const handleEditMovie = async (e) => {

    if (!isFormValid()) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const movieData = {
      title,
      genre,
      description,
      duration: Number(duration),
      releaseDate: toISOString(releaseDate),
      poster,
      showtimes: showTimes,
    };

    try {
      await axios.put(`${BASEURL}/admin/movie/${movieId}`, movieData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedMovies = movies.map((movie) =>
        movie._id === movieId ? { ...movie, ...movieData } : movie
      );
      addMovies(updatedMovies);
    } catch (error) {
      console.error("Error editing movie:", error);
    }
  };

  return (
    <dialog id="my_modal_4" className="modal">
      <div className="modal-box">
        <form method="dialog" onSubmit={handleEditMovie}>

          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          
          <h3 className="font-bold text-lg mb-4">Edit Movie</h3>

          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}

          <label className="form-control w-full my-2">
            <input
              type="text"
              placeholder="Movie Title"
              className="input input-bordered w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <select
            className="select select-bordered w-full my-2"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option disabled>Select a movie genre</option>
            <option>Action</option>
            <option>Adventure</option>
            <option>Animation</option>
            <option>Comedy</option>
            <option>Crime</option>
            <option>Documentary</option>
            <option>Drama</option>
            <option>Fantasy</option>
            <option>Historical</option>
            <option>Horror</option>
            <option>Musical</option>
            <option>Mystery</option>
            <option>Romance</option>
            <option>Sci-Fi</option>
            <option>Thriller</option>
            <option>War</option>
            <option>Western</option>
          </select>

          <label className="form-control w-full my-2">
            <input
              type="text"
              placeholder="Movie Duration (in minutes)"
              className="input input-bordered w-full"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </label>

          <label className="form-control w-full my-2">
            <div className="label">
              <span className="label-text">Movie Release Date</span>
            </div>
            <input
              type="date"
              className="input input-bordered w-full"
              value={releaseDate} 
              onChange={(e) => setReleaseDate(e.target.value)}
            />
          </label>

          <label className="form-control w-full my-2">
            <div className="label">
              <span className="label-text">Add Show Times</span>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="datetime-local"
                className="input input-bordered w-full"
                value={showTimeInput}
                onChange={(e) => setShowTimeInput(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleAddShowTime}>
                <Plus />
              </button>
            </div>

            {showTimes.length > 0 && (
              <ul className="list-disc mt-2">
                {showTimes.map((showtime, index) => (
                  <li
                    key={index}
                    className="flex my-2 justify-between items-center"
                  >
                    {showtime}
                    <button
                      className="btn btn-sm btn-error ml-2"
                      onClick={() => handleRemoveShowTime(index)}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </label>

          <label className="form-control w-full my-2">
            <input
              type="text"
              placeholder="Poster URL"
              className="input input-bordered w-full"
              value={poster}
              onChange={(e) => setPoster(e.target.value)}
            />
          </label>

          <textarea
            className="textarea textarea-bordered form-control w-full my-2"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <button type="submit" className="btn btn-primary w-full">
            Update Movie
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default EditMovieModal;
