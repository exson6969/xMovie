import { useEffect, useState } from "react";
import useStore from "../store/useStore";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Pen, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddMovieModal from "../components/AddMovieModal";
import EditMovieModal from "../components/EditMovieModal";

const AdminDashboard = () => {
  const { movies, addMovies, user, token } = useStore();
  const BASEURL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [editingMovieId, setEditingMovieId] = useState<string | null>(null); 
  const [showEditModal, setShowEditModal] = useState(false);


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${BASEURL}/movies`);
        addMovies(response.data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };
    
    fetchMovies();
  }, [addMovies]);

  const handleDeleteMovie = async (id: string) => {
    try {
      await axios.delete(`${BASEURL}/admin/movie/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      addMovies(movies.filter((movie) => movie._id !== id));
    } catch (error) {
      console.error("Failed to delete movie:", error);
    }
  };
  
  const handleEditMovie = (id: string) => {
    setEditingMovieId(id); 
    setShowEditModal(true); 
  };

  if (!user?.isAdmin) {
     navigate("/");
  }
  

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />

      <div className="overflow-x-auto mx-12 flex-grow">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold mb-4 text-primary">Dashboard</h1>

          <button
            className="btn btn-outline btn-primary"
            onClick={() => {
              const modal = document.getElementById(
                "my_modal_3"
              ) as HTMLDialogElement | null;
              if (modal) {
                modal.showModal();
              }
            }}
          >
            {" "}
            <Plus /> Add Movie{" "}
          </button>

          <AddMovieModal />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Release Date</th>
              <th>Duration (mins)</th>
              <th>Genre</th>
              <th>Poster</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.releaseDate.split("T")[0]}</td>
                <td>{movie.duration}</td>
                <td>{movie.genre}</td>
                <td>
                  <img
                    className="w-12 h-auto"
                    src={movie.poster}
                    alt={movie.title}
                  />
                </td>
                <td className="flex gap-6 items-center justify-center">
                  <button
                    className="btn btn-outline btn-primary"
                    onClick={() => {
                     handleEditMovie(movie._id)
                      const modal = document.getElementById(
                        "my_modal_4"
                      ) as HTMLDialogElement ;
                      if (modal) {
                        modal.showModal();
                      }
                    }}
                  >
                    <Pen className="text-primary h-auto w-5" />
                  </button>
                  <EditMovieModal  movieId={editingMovieId} />
                  <button onClick={() => handleDeleteMovie(movie._id)}>
                    <Trash2 className="text-red-400 h-auto w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
