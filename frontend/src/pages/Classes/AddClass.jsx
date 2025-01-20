import { useState } from "react";
import Sidebar from "../SideBar";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";

import Lottie from "lottie-react";
import loadingAnimation from "../../assets/class.json";

const formatDate = () => {
  const options = { month: "short", day: "2-digit", year: "numeric" };
  return new Date().toLocaleDateString("en-US", options);
};

const AddClass = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    day: "",
    startTime: "",
    endTime: "",
  });

  const handleAddClass = async (e) => {
    e.preventDefault();

    const { name, day, startTime, endTime } = formData;

    if (!name || !day || !startTime || !endTime) {
      toast.error("All fields must be filled");
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post("/api/classes", {
        name,
        day,
        startTime,
        endTime,
      });

      const { classes } = response.data;
      localStorage.setItem("classes", JSON.stringify(classes));

      toast.success("Class created successfully");
      navigate("/classes");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding class");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-tr from-white via-pink-50 to-indigo-300">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 font-poppins p-6 sm:p-10 ml-0 mr-0 md:ml-5 md:mr-5 lg:mr-35 lg:ml-35">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-center mb-8 mt-10 sm:mt-0 space-y-4 sm:space-y-0">
          <div>
            <h1 className="sm:text-[45px] text-4xl font-bold text-gray-800">
              Add New Class
            </h1>
            <p className="text-[12px] text-black font-bold mt-1 text-center sm:text-left">
              {formatDate()}
            </p>
          </div>
          <div className="py-4 sm:py-0 sm:mr-4"></div>
        </header>

        {/* Main Panel */}
        <div className="text-gray-800 p-6 rounded-lg flex flex-col lg:flex-row items-center justify-between gap-6 mb-12 sm:mb-0">
          {/* Add Plan Form */}
          <form
            onSubmit={handleAddClass}
            className="bg-white p-10 rounded-xl shadow-lg w-full max-w-2xl space-y-8"
          >
            {/* Header */}
            <h2 className="text-3xl font-medium text-gray-800 mb-[-10px]">
              New Class Schedule
            </h2>

            {/* Navigate to Plans page */}
            <p className="text-xs text-gray-500">
              Schedule a new class or{" "}
              <Link
                to="/classes"
                className="text-purple-600 font-medium hover:underline"
              >
                See other classes
              </Link>
            </p>

            <div className="space-y-6">
              {/* Form in Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Class Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter class name"
                    value={formData.name}
                    onChange={handleChange}
                    className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                    required
                  />
                </div>

                {/* Day */}
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Day
                  </label>
                  <select
                    name="day"
                    id="day"
                    value={formData.day}
                    onChange={handleChange}
                    className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                    required
                  >
                    <option value="">Select Day</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                </div>

                {/* Start Time */}
                <div>
                  <label
                    htmlFor="startTime"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Start Time
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    id="startTime"
                    placeholder="HH:MM AM/PM"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                    required
                  />
                </div>

                {/* End Time */}
                <div>
                  <label
                    htmlFor="endTime"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    End Time
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    id="endTime"
                    placeholder="HH:MM AM/PM"
                    value={formData.endTime}
                    onChange={handleChange}
                    className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-2 text-white text-sm font-bold rounded-full transition duration-300 ease-in-out ${
                  loading
                    ? "bg-purple-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
                disabled={loading}
              >
                {loading ? "Class Creating..." : "Create Class"}
              </button>
            </div>
          </form>

          {/* Image Section */}
          <div className="hidden lg:block max-w-md mr-20">
            <Lottie
              animationData={loadingAnimation}
              loop={true}
              style={{ width: "600px", height: "460px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClass;
