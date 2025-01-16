import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // handle form submission
  const handleSignUp = async (e) => {
    e.preventDefault();

    // Get the form data
    const { name, email, password, confirmPassword } = formData;

    // Check if the password and confirm password are the same
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Check if the email is valid
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Check if the password meets the complexity requirements
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    // set the loading state to true
    setLoading(true);

    try {
      // Send a POST request to the signup endpoint with the form data
      const response = await axiosInstance.post("/auth/signup", {
        name,
        email,
        password,
        confirmPassword,
      });

      // After successful signup return token and user data
      const { token, user } = response.data;

      // store token in local storage
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      // show success message
      toast.success("Signup successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center min-h-screen justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
      {/* Sign Up Form */}
      <form
        onSubmit={handleSignUp}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm space-y-6"
      >
        {/* Header */}
        <h2 className="text-3xl font-medium text-gray-800 mb-[-10px]">
          Sign up
        </h2>

        {/* Navigate to login page */}
        <p className="text-xs text-gray-500">
          Create an account or{" "}
          <Link
            to="/login"
            className="text-purple-600 font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                required
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

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
                className="absolute right-3 top-[19px] transform -translate-y-1/2"
              >
                {confirmPasswordVisible ? <FiEyeOff /> : <FiEye />}
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
          {loading ? "Signing up..." : "Sign up"}
        </button>
        <p className="text-xs text-gray-500 text-center mt-4">
          By Signing up, you accept our{" "}
          <Link to="/terms" className="text-purple-600 hover:underline">
            terms of service
          </Link>{" "}
          and <br />
          <Link to="/privacy" className="text-purple-600 hover:underline">
            privacy policy
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
