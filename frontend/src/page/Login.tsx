import { useState } from "react";
import axios from "axios";
import useStore from "../store/useStore";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Key, Mail } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = useStore((state) => state.loginUser);
  const navigate = useNavigate();
  const [error, setError] = useState(""); 

  const BASEURL = process.env.REACT_APP_BASE_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${BASEURL}/users/login`, {
        email,
        password,
      });
      const user = response.data;
      const token = response.data.token;
      
      loginUser(user, token);
      navigate(user.isAdmin ? "/admin/dashboard" : "/");
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred."); 
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      <Navbar />
      <form
        className="flex-grow max-w-md flex flex-col gap-4 items-center p-4  w-full justify-center mx-auto "
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-start mb-4">Login</h2>

        <label className="input input-bordered w-full flex items-center gap-2">
          <Mail/>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="grow"
            placeholder="Email"
          />
        </label>
        <label className="input input-bordered w-full flex items-center gap-2">
          <Key/>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="grow"
            placeholder="Password"
          />
        </label>
        <button className="btn btn-primary  w-full" type="submit">
          Login
        </button>
      </form>
      {error && <div className="toast">
          <div className="alert alert-info">
            <span>{error}</span>
          </div>
        </div>}
      <Footer />
    </div>
  );
};

export default Login;
