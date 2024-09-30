import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './page/MovieList';
import MovieDetail from './page/MovieDetail';
import Login from './page/Login';
import Register from './page/Register';
import Home from './page/Home';
import useStore from './store/useStore';
import AdminDashboard from './page/AdminDashboard';

const App = () => {

  const {loadUserFromStorage} = useStore();
  useEffect(() => {
    loadUserFromStorage();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/movies/:movieId" element={<MovieDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<AdminDashboard/>} />
      </Routes>
    </Router>
  );
};

export default App;
