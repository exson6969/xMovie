import { useEffect } from 'react';
import useStore from '../store/useStore';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MovieList = () => {
  const { movies, addMovies } = useStore();

  const BASEURL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    console.log(BASEURL)
    const fetchMovies = async () => {
      const response = await axios.get(`${BASEURL}/movies`); 
      addMovies(response.data);
    };

    fetchMovies();
  }, [addMovies]);

  return (
    <div>
      <h1>Available Movies</h1>
      <div >
        {movies.map((movie) => (
          <div key={movie._id} >
            <img src={movie.poster} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <Link to={`/movies/${movie._id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
