// components/Sidebar.js
import { FaUserCircle } from "react-icons/fa";
import Logo from "../assets/dashboard.png";
import Plans from "../assets/icon1.png";
import Classes from "../assets/icon6.png";
import Trainers from "../assets/icon3.png";
import Members from "../assets/icon4.png";
import Logout from "../assets/icon5.png";

import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");

      // Remove token and user data from localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      toast.success("Logout successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  //   Sidebar menu items
  const menuItems = [
    { icon: Plans, label: "Plans", path: "/plans" },
    { icon: Classes, label: "Classes", path: "/classes" },
    { icon: Trainers, label: "Trainers", path: "/trainers" },
    { icon: Members, label: "Members", path: "/members" },
  ];

  return (
    <aside className="bg-white w-full md:w-20 lg:w-24 p-4 flex md:flex-col items-center md:items-stretch fixed md:relative z-10 md:z-0 bottom-0 left-0 md:bottom-auto">
      {/* Logo */}
      <div className="mb-20 hidden md:block">
        <div className="h-10 w-8 mx-auto">
          <img
            src={Logo}
            alt="Logo"
            className="mt-3"
            onClick={() => navigate("/dashboard")}
          />
        </div>
      </div>
      {/* Navigation Icons */}
      <nav className="flex md:flex-col justify-around w-full space-y-0 md:space-y-10">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path; // Check if the current path matches the menu item's path
          return (
            <div
              key={index}
              className={`relative group h-10 w-10 rounded-full mx-auto flex items-center justify-center hover:bg-purple-300 transition duration-300 ease-in-out ${
                isActive ? "bg-purple-300" : "bg-blue-200"
              }`} // Apply a different color when active
              onClick={() => navigate(item.path)}
            >
              <img src={item.icon} className="h-4 w-4" alt={`icon-${index}`} />
              <div className="absolute left-1/2 -translate-x-1/2 -top-9 sm:left-full sm:top-[7px] transform sm:-translate-y-1/2 -translate-y-2 sm:ml-2 text-sm text-gray-800 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 sm:group-hover:translate-x-2 transition-all duration-300 ease-in-out bg-gray-200 py-1 px-2.5 rounded-xl font-bold">
                {item.label}
              </div>
            </div>
          );
        })}
        {/* Logout */}
        <div
          className="h-10 w-10 bg-blue-200 rounded-full mx-auto flex items-center justify-center hover:bg-red-300 transition duration-300 ease-in-out cursor-pointer"
          onClick={handleLogout} // Attach logout handler
        >
          <img src={Logout} className="h-4 w-4" alt="Logout" />
        </div>
      </nav>
      {/* Profile Picture */}
      <div className="mt-auto mb-3 hidden md:block mx-auto">
        <FaUserCircle
          className="text-black text-4xl"
          onClick={() => navigate("/profile")}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
