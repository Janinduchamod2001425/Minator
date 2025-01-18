import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import Sidebar from "../SideBar";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import Monthly from "../../assets/monthly.png";
import Yearly from "../../assets/yearly.png";

import Lottie from "lottie-react";
import noDataAnimation from "../../assets/nodata.json";

const formatDate = () => {
  const options = { month: "short", day: "2-digit", year: "numeric" };
  return new Date().toLocaleDateString("en-US", options);
};

const AllPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch plans from the API
  const fetchPlans = async () => {
    try {
      const response = await axiosInstance.get("/api/packages");
      setPlans(response.data); // Assuming the API response returns an array of plans
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch plans");
    } finally {
      setLoading(false);
    }
  };

  const deletePlan = async (id) => {
    Swal.fire({
      title: "Delete Plan?",
      text: "Deleting this plan will remove it permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7542C5", // Custom confirm button color
      cancelButtonColor: "#607d8b", // Custom cancel button color
      confirmButtonText: "Delete Plan",
      cancelButtonText: "Cancel",
      backdrop: true, // Adds a backdrop
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/api/packages/${id}`);
          Swal.fire("Deleted!", "The plan has been deleted.", "success");
          fetchPlans(); // Refresh the plan list
        } catch (error) {
          Swal.fire(
            "Error",
            error.response?.data?.message || "Failed to delete the plan.",
            "error"
          );
        }
      }
    });
  };

  const addImageForDuration = (duration) => {
    if (duration.toLowerCase().includes("monthly")) {
      return Monthly;
    }

    if (duration.toLowerCase().includes("yearly")) {
      return Yearly;
    }
  };

  useEffect(() => {
    fetchPlans();
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
              Minator Packages
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
              onClick={() => navigate("/addplan")}
              className="bg-purple-950 py-2 px-7 rounded-lg mt-1 hover:bg-gray-600 text-sm transition duration-300 ease-in-out font-bold"
            >
              {" "}
              <span className="text-white font-poppins font-bold">
                New Plan
              </span>
            </button>
          </div>
        </header>

        {/* Main Panel */}
        <div className="sm:h-[520px] overflow-y-auto mb-10 sm:mb-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {loading ? (
              <p className="font-bold">💪 Loading plans...</p>
            ) : plans.length > 0 ? (
              plans.map((plan) => (
                // Plan Cards
                <div
                  key={plan.id}
                  className="bg-[#FBF8F6] bg-gradient-to-bl from-white via-pink-50 to-indigo-100 p-7 rounded-3xl shadow-xl flex flex-col gap-3 max-w-sm mx-auto mt-6 w-[300px]"
                >
                  {/* Add different images based on duration type except button */}
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {plan.name}
                    </h2>
                    <img
                      src={addImageForDuration(plan.duration)}
                      alt="Duration type"
                      className="w-5 h-7"
                    />
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 overflow-hidden text-ellipsis">
                    <span>{plan.description}</span>
                  </p>

                  <p className="text-gray-700 text-sm leading-relaxed">
                    <span
                      className={`text-white px-2 py-1 rounded-2xl text-xs font-poppins font-bold ${
                        plan.duration.toLowerCase() === "monthly"
                          ? "bg-purple-500"
                          : plan.duration.toLowerCase() === "yearly"
                          ? "bg-pink-400"
                          : "bg-gray-400"
                      }`}
                    >
                      {plan.duration}
                    </span>
                  </p>

                  <p className="text-gray-700 text-sm leading-relaxed mb-2">
                    <span className="font-bold font-poppins text-lg text-purple-800">
                      {plan.price.toFixed(2)} LKR
                    </span>
                    <br />
                    <span className="text-xs font-mono text-gray-500">
                      Price
                    </span>
                  </p>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => navigate(`/updateplan/${plan.id}`)}
                      className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-purple-900 text-sm transition duration-300 ease-in-out font-bold"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => deletePlan(plan.id)}
                      className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-indigo-600 text-sm transition duration-300 ease-in-out font-bold"
                    >
                      Delete
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 mt-2 text-left">
                    Created on {new Date(plan.createdAt).toLocaleDateString()}
                  </p>
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

export default AllPlans;
