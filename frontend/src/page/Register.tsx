import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Key, Mail, User } from "lucide-react";
import useStore from "../store/useStore";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState(""); 
  const navigate = useNavigate();
  const loginUser = useStore((state) => state.loginUser);
  const BASEURL = process.env.REACT_APP_BASE_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(""); 

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(`${BASEURL}/users/register`, {
        name,
        email,
        password,
      });

      const user = response.data;
      const token = response.data.token;
      
      loginUser(user, token);
      
      
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate(user.isAdmin ? "/admin/dashboard" : "/");
      }, 2000);
      
    } catch (error: any) {
      setError(error.response?.data?.message || "Registration failed.");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <form
        className="flex-grow max-w-md flex flex-col gap-4 items-center p-4 w-full justify-center mx-auto"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-start mb-4">Register</h2>

        <label className="input input-bordered w-full flex items-center gap-2">
          <User />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="grow"
            placeholder="Name"
            required
          />
        </label>

        <label className="input input-bordered w-full flex items-center gap-2">
          <Mail />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="grow"
            placeholder="Email"
            required
          />
        </label>

        <label className="input input-bordered w-full flex items-center gap-2">
          <Key />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="grow"
            placeholder="Password"
            required
          />
        </label>

        <label className="input input-bordered w-full flex items-center gap-2">
          <Key />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="grow"
            placeholder="Confirm Password"
            required
          />
        </label>

        <button className="btn btn-primary w-full" type="submit">
          Register
        </button>
      </form>

      {error && (
        <div className="toast">
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      )}

      {success && (
        <div className="toast">
          <div className="alert alert-success">
            <span>{success}</span>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Register;
