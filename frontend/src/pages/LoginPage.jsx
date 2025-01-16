import { useState } from "react";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the Form data
    const { email, password } = formData;

    // Validate the email
    if (!email.includes("@")) {
      toast.error("Please enter the valid email address");
      return;
    }

    // Validate the password
    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long");
      return;
    }

    // Set loading state to true
    setLoading(true);

    try {
      // Send a Post request to the login endpoint in the server
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      // Extract token and user data from response
      const { token, user } = response.data;

      // Store token and user data in localStorage
      localStorage.setItem("authToken", token); // should be same name with private routes token
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful!");
      navigate("/dashboard"); // Redirect to dashboard page
    } catch (error) {
      toast.error(error.response.data.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Handle the form data Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-blue-500 via-pink-500 to-purple-500">
      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm space-y-6"
      >
        {/* Header */}
        <h2 className="text-3xl font-medium text-gray-800 mb-[-20px]">Login</h2>
        <h4 className="text-[12px] mt-[-20px]">
          Welcome to <span className="text-purple-800 font-bold">Minator</span>
        </h4>

        {/* Navigate to signup page */}
        <p className="text-xs text-gray-500">
          Sign in to your accour or{" "}
          <Link
            to="/signup"
            className="text-purple-600 font-medium hover:underline"
          >
            Create an Account
          </Link>
        </p>

        <div className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-[19px] transform -translate-y-1/2"
              >
                {passwordVisible ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className={`w-full py-2 text-white text-sm font-medium rounded-full transition duration-300 ease-in-out ${
            loading
              ? "bg-purple-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-xs text-gray-500 text-center mt-4">
          Forgot your password?{" "}
          <Link to="/reset" className="text-purple-600 hover:underline">
            Reset here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
