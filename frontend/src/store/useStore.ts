import { create } from 'zustand';

interface User {
  _id: string;
  name: string;
  isAdmin: boolean;
}

export interface Movie {
  _id: string;
  title: string;
  genre: string;
  description: string;
  duration: number;
  releaseDate: string; 
  poster: string;
  showtimes: string[];
  __v?: number;
}

interface StoreState {
  movies: Movie[];
  user: User | null;
  token: string | null;
  selectedMovie: Movie | null;
  selectedSeats: string[];
  addMovies: (movies: Movie[]) => void;
  loginUser: (user: User, token: string) => void;
  logoutUser: () => void;
  loadUserFromStorage: () => void;
  selectMovie: (movie: Movie) => void;
  selectSeats: (seats: string[]) => void;
  clearSelection: () => void;
}

const useStore = create<StoreState>((set) => ({
  movies: [],
  user: null,
  token: null,
  selectedMovie: null,
  selectedSeats: [],
  currentEditMovie:null,

  addMovies: (movies) => set({ movies }),

  loginUser: (user, token) => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 1); 
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user)); 
    localStorage.setItem('tokenExpiry', expiryDate.toISOString()); 

    set({ user, token });
  },

  logoutUser: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('tokenExpiry');
    set({ user: null, token: null });
  },

  loadUserFromStorage: () => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    const expiryDate = localStorage.getItem('tokenExpiry');
    const now = new Date();

    if (storedToken && storedUser && expiryDate && new Date(expiryDate) > now) {
      set({ token: storedToken, user: JSON.parse(storedUser) });
    } else {

      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      localStorage.removeItem('tokenExpiry');
      set({ token: null, user: null });
    }
  },

  selectMovie: (movie) => set({ selectedMovie: movie }),

  selectSeats: (seats) => set({ selectedSeats: seats }),

  clearSelection: () => set({ selectedMovie: null, selectedSeats: [] }),
}));

export default useStore;
