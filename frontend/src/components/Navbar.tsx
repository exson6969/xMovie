import React from "react";
import useStore from "../store/useStore";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logoutUser } = useStore();
  const navigate = useNavigate();

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    logoutUser();
    navigate("/");
  };

  return (
    <div className="navbar px-12 py-4 bg-base-100">
      <div className="navbar-start flex items-center gap-2">
        <a href="/" className="btn btn-ghost flex gap-0 text-xl">
          <span className="text-green-400 font-bold">x</span>
          <span>Movie</span>
        </a>
        {user && <p className=""> Hey {user.name}</p>}
      </div>

      {user ? (
        <>
          <div className="navbar-end flex gap-4 items-center">
            {user.isAdmin && (
              <a href="/admin/dashboard" className="btn">
                Dashboard
              </a>
            )}
            <button className="btn btn-error" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <div className="navbar-end flex gap-4 items-center">
          <a href="/login" className="btn">
            Login
          </a>
          <a href="/register" className="btn btn-primary">
            Create Account
          </a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
