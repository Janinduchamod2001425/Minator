import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

const IntroPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-950 text-white">
      {/* Logo */}
      <div className="text-center mb-4">
        <div className="p-4">
          <img
            src={Logo}
            alt="Minator Logo"
            className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full"
          />
        </div>
      </div>

      {/* Sign Up and Login Buttons */}
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 gap-4">
        {/* Sign In */}
        <button
          className="bg-button-bg hover:bg-purple-300 text-button-text font-bold py-2 px-6 sm:px-10 rounded-xl transition-colors duration-300 text-sm sm:text-base"
          onClick={() => navigate("/login")}
        >
          Sign In
        </button>

        {/* Sign Up */}
        <button
          className="bg-button-bg hover:bg-purple-300 text-button-text font-bold py-2 px-6 sm:px-10 rounded-xl transition-colors duration-300 text-sm sm:text-base"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default IntroPage;
