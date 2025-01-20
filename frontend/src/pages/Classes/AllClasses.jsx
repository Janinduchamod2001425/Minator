import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import Sidebar from "../SideBar";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import Lottie from "lottie-react";
import noDataAnimation from "../../assets/nodata.json";

const formatDate = () => {
  const options = { month: "short", day: "2-digit", year: "numeric" };
  return new Date().toLocaleDateString("en-US", options);
};

const AllClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all plans from the bd
  const fetchClasses = async () => {
    try {
      const response = await axiosInstance.get("/api/classes");
      setClasses(response.data); // Assuming the API response returns an array of plans
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch classes");
    } finally {
      setLoading(false);
    }
  };

  const deleteClass = async (id) => {
    Swal.fire({
      title: "Delete Scheduled Class?",
      text: "Deleting this class will remove it permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7542C5", // Custom confirm button color
      cancelButtonColor: "#607d8b", // Custom cancel button color
      confirmButtonText: "Delete Class",
      cancelButtonText: "Cancel",
      backdrop: true, // Adds a backdrop
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/api/classes/${id}`);
          Swal.fire("Deleted!", "The class has been deleted.", "success");
          fetchClasses(); // Refresh the plan list
        } catch (error) {
          Swal.fire(
            "Error",
            error.response?.data?.message || "Failed to delete the class.",
            "error"
          );
        }
      }
    });
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 font-poppins p-6 sm:p-10 ml-0 mr-0 md:ml-3 md:mr-5 lg:mr-35 lg:ml-35">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-center mb-6 mt-10 sm:mt-0 space-y-4 sm:space-y-0">
          <div>
            <h1 className="sm:text-[45px] text-4xl font-bold text-gray-800">
              Scheduled Classes
            </h1>
            <p className="text-[12px] text-gray-500 font-bold mt-1 text-center sm:text-left">
              {formatDate()}
            </p>
          </div>
          <div className="py-4 sm:py-0 sm:mr-4">
            <p className="text-xs font-bold text-gray-500 sm:text-right text-center mr-1">
              Click here to add
            </p>
            <button
              onClick={() => navigate("/addclass")}
              className="bg-purple-950 py-2 px-7 rounded-lg mt-1 hover:bg-gray-600 text-sm transition duration-300 ease-in-out font-bold"
            >
              {" "}
              <span className="text-white font-poppins font-bold">
                New Class
              </span>
            </button>
          </div>
        </header>

        {/* Main Panel */}
        <div className="sm:h-[320px] lg:h-[528px] overflow-y-auto mb-10 sm:mb-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {loading ? (
              <p className="font-bold">💪 Loading plans...</p>
            ) : classes.length > 0 ? (
              classes.map((cls) => (
                // Plan Cards
                <div
                  key={cls.id}
                  className="bg-[#FBF8F6] bg-gradient-to-bl from-white via-pink-50 to-indigo-200 p-7 rounded-3xl shadow-xl flex flex-col gap-2 max-w-sm mx-auto mt-6 w-[300px]"
                >
                  {/* Add different images based on duration type except button */}
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-1.5">
                      {cls.name}
                    </h2>
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed mb-2 mt-1">
                    <span
                      className={`px-3 py-2 rounded-2xl text-xs font-poppins font-bold ${
                        cls.day.toLowerCase() === "monday"
                          ? "bg-purple-300 text-black border-purple-500 border"
                          : cls.day.toLowerCase() === "tuesday"
                          ? "bg-pink-300 text-black border-pink-500 border"
                          : cls.day.toLowerCase() === "wednesday"
                          ? "bg-yellow-300 text-black border-yellow-500 border"
                          : cls.day.toLowerCase() === "thursday"
                          ? "bg-green-300 text-black border-green-500 border"
                          : cls.day.toLowerCase() === "friday"
                          ? "bg-blue-300 text-black border-blue-500 border"
                          : cls.day.toLowerCase() === "saturday"
                          ? "bg-orange-300 text-black border-orange-500 border"
                          : cls.day.toLowerCase() === "sunday"
                          ? "bg-red-300 text-black border-red-500 border"
                          : "bg-gray-300 text-black border-gray-500 border"
                      }`}
                    >
                      {cls.day}
                    </span>
                  </p>

                  <div className="flex flex-row gap-20">
                    <p className="text-gray-700 text-sm leading-relaxed mb-2">
                      <span className="text-sm font-mono text-gray-500">
                        Start Time
                      </span>
                      <br />
                      {/* <span className="font-bold font-poppins text-lg text-purple-800">
                        {cls.startTime}
                      </span> */}
                      <span className="font-bold font-poppins text-lg text-purple-800">
                        {new Date(
                          `1970-01-01T${cls.startTime}`
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    </p>

                    <p className="text-gray-700 text-sm leading-relaxed mb-2">
                      <span className="text-sm font-mono text-gray-500">
                        End Time
                      </span>
                      <br />
                      {/* <span className="font-bold font-poppins text-lg text-purple-800">
                        {cls.endTime}
                      </span> */}
                      <span className="font-bold font-poppins text-lg text-purple-800">
                        {new Date(
                          `1970-01-01T${cls.endTime}`
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => navigate(`/updateclass/${cls.id}`)}
                      className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-purple-900 text-sm transition duration-300 ease-in-out font-bold"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => deleteClass(cls.id)}
                      className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-indigo-700 text-sm transition duration-300 ease-in-out font-bold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center w-full h-68 sm:h-64 sm:flex-row flex-col">
                <Lottie
                  animationData={noDataAnimation}
                  loop={true}
                  className="w-[300px] h-[300px] sm:w-[650px] sm:h-[650px] mt-4 sm:mt-2"
                />
                <p className="text-lg font-poppins font-bold text-black bg-purple-200 sm:py-2 sm:px-5 px-5 py-3 rounded-xl">
                  No plans available
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllClasses;
