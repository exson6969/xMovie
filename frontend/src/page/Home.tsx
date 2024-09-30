import { useEffect } from "react";
import useStore from "../store/useStore"; 
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Marquee from "react-fast-marquee";

const Home = () => {
  const { movies, addMovies } = useStore();
  const currentDate = new Date();

  const BASEURL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${BASEURL}/movies`);
        addMovies(response.data); 
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [addMovies, BASEURL]);

  console.log(movies);
  const availableMovies = movies.filter((movie) => {
    const releaseDate = new Date(movie.releaseDate);
    const oneMonthAgo = new Date(currentDate);
    oneMonthAgo.setDate(currentDate.getDate() - 30);

    return releaseDate <= currentDate && releaseDate >= oneMonthAgo;
  });

  const upcomingMovies = movies.filter((movie) => {
    const releaseDate = new Date(movie.releaseDate);
    return releaseDate > currentDate;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow px-12">
        <h1 className="text-3xl font-bold mb-4 text-primary">Now Showing</h1>

        {availableMovies.length > 0 ? (
          <Marquee autoFill>
            <div className="flex gap-8 m-4 ">
              {availableMovies.slice(0, 10).map((movie) => (
                <Link to={`/movies/${movie._id}`}>
                  <div
                    key={movie._id}
                    className="card bg-base-100 w-96 shadow-sm shadow-gray-700"
                  >
                    <figure>
                      <img
                        className="h-96 rounded-2xl pt-2 w-auto"
                        src={movie.poster}
                        alt={movie.title}
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{movie.title}</h2>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Marquee>
        ) : (
          <p className="">No movies available. </p>
        )}

        <h1 className="text-3xl font-bold mb-4 text-primary">
          Upcoming Movies
        </h1>
        {upcomingMovies.length > 0 ? (
          <Marquee autoFill>
            <div className="flex gap-8 m-4 ">
              {upcomingMovies.slice(0, 10).map((movie) => (
                <Link to={`/movies/${movie._id}`}>
                  <div
                    key={movie._id}
                    className="card bg-base-100 w-96 shadow-sm shadow-gray-700"
                  >
                    <figure>
                      <img
                        className="h-96 rounded-2xl pt-2 w-auto"
                        src={movie.poster}
                        alt={movie.title}
                      />
                    </figure>
                    <div className="card-body ">
                      <h2 className="card-title">{movie.title}</h2>

                      <div className="card-actions justify-end">
                        <div className="badge badge-outline">
                          {movie.releaseDate.split("T")[0]}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Marquee>
        ) : (
          <p className="">No upcoming movies. </p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
