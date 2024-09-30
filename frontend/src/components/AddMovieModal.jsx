import React, { useState } from "react";
import axios from "axios";
import useStore from "../store/useStore";
import { Plus } from "lucide-react";

const AddMovieModal = () => {
  const BASEURL = process.env.REACT_APP_BASE_URL;

  const { token } = useStore();

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [poster, setPoster] = useState("");
  const [showTimeInput, setShowTimeInput] = useState("");
  const [showTimes, setShowTimes] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); 

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
      title.trim() &&
      genre &&
      description.trim() &&
      duration &&
      releaseDate &&
      poster.trim() &&
      showTimes.length > 0
    );
  };

  const handleAddMovie = async (e) => {

    if (!isFormValid()) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const movieData = {
      title,
      genre,
      description,
      duration: Number(duration),
      releaseDate,
      poster,
      showtimes: showTimes,
    };

    try {
      await axios.post(`${BASEURL}/admin/movie`, movieData, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setTitle("");
      setGenre("");
      setDescription("");
      setDuration("");
      setReleaseDate("");
      setPoster("");
      setShowTimes([]);
      setErrorMessage(""); 
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form onSubmit={handleAddMovie}>
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById("my_modal_3").close()} 
          >
            ✕
          </button>

          <h3 className="font-bold text-lg mb-4">Add New Movie</h3>

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
            <option disabled selected>
              Select a movie genre
            </option>
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
            Add Movie
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default AddMovieModal;
