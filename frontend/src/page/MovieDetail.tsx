import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react"; 
import useStore from "../store/useStore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MovieDetail = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const { movies, selectMovie } = useStore();
  const navigate = useNavigate();

  const movie = movies.find((m) => m._id === movieId);

  useEffect(() => {
    if (!movie) {
      navigate("/");
    }
  }, [movie, navigate]);

  const handleBookTicket = () => {
    if (movie) {
      selectMovie(movie); 
    }
  };

  if (!movie) {
    return null; 
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <div className="grid flex-grow md:grid-cols-2 grid-cols-1 mx-12 gap-4">
        <div>
          <img
            className="w-96 h-auto rounded-2xl"
            src={movie.poster}
            alt={movie.title}
          />
        </div>
        <div className="flex flex-col gap-4 items-start">
          <h1 className="text-4xl font-bold mb-4 text-primary">
            {movie.title}
          </h1>
          <p className="text-xl">{movie.description}</p>

          <button className="btn btn-primary" onClick={handleBookTicket}>
            Book Ticket
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MovieDetail;
