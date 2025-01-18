import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../SideBar";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";

// background Animation
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/plan.json";

const formatDate = () => {
  const options = { month: "short", day: "2-digit", year: "numeric" };
  return new Date().toLocaleDateString("en-US", options);
};

const UpdatePlans = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();
  const [updatedPlan, setUpdatedPlan] = useState({
    name: "",
    price: "",
    duration: "",
    description: "",
  });

  // Get existing plan details
  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/packages/${id}`);
        setUpdatedPlan(response.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch plan details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPlanDetails();
  }, [id]);

  const handleUpdatePlan = async (e) => {
    e.preventDefault();

    const { name, price, duration, description } = updatedPlan;

    // Covert the price into float
    const floatPrice = parseFloat(price);
    if (isNaN(floatPrice)) {
      toast.error("Invalid price. Please enter a valid number");
      return;
    }

    setLoading(true);

    try {
      await axiosInstance.put(`/api/packages/${id}`, {
        name,
        price: floatPrice,
        duration,
        description,
      });
      toast.success("Plan updated successfully");
      navigate("/plans");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update plan");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPlan({ ...updatedPlan, [name]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-white via-pink-50 to-indigo-300 flex flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 font-poppins p-6 sm:p-10 ml-0 mr-0 md:ml-5 md:mr-5 lg:mr-35 lg:ml-35">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-center mb-8 mt-10 sm:mt-0 space-y-4 sm:space-y-0">
          <div>
            <h1 className="sm:text-[45px] text-4xl font-bold text-gray-800">
              Update Plan/Package
            </h1>
            <p className="text-[12px] text-gray-500 font-bold mt-1 text-center sm:text-left">
              {formatDate()}
            </p>
          </div>
          <div className="py-4 sm:py-0 sm:mr-4"></div>
        </header>

        {/* Main Panel */}
        <div className="text-gray-800 p-6 rounded-lg flex flex-col lg:flex-row items-center justify-between gap-6 mb-12 sm:mb-0">
          {/* Add Plan Form */}
          <form
            onSubmit={handleUpdatePlan}
            className="bg-white p-10 rounded-xl shadow-lg w-full max-w-2xl space-y-8"
          >
            {/* Header */}
            <h2 className="text-3xl font-medium text-gray-800 mb-[-10px]">
              Update Plan
            </h2>

            {/* Navigate to Plans page */}
            <p className="text-xs text-gray-500">
              Create new plan or{" "}
              <Link
                to="/plans"
                className="text-purple-600 font-medium hover:underline"
              >
                See all plans
              </Link>
            </p>

            <div className="space-y-6">
              {/* Form in Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Plan Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter plan name"
                    value={updatedPlan.name}
                    onChange={handleChange}
                    className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 bg-indigo-50"
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="0.00"
                    value={updatedPlan.price}
                    onChange={handleChange}
                    className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 bg-pink-50"
                    required
                  />
                </div>

                {/* Duration */}
                <div>
                  <label
                    htmlFor="duration"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Duration
                  </label>
                  <select
                    id="duration"
                    name="duration"
                    value={updatedPlan.duration}
                    onChange={handleChange}
                    className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 bg-blue-50"
                    required
                  >
                    <option value="">Select Duration</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={updatedPlan.description}
                    onChange={handleChange}
                    className="text-sm w-full sm:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 bg-red-50"
                    placeholder="Description"
                    rows={3}
                    required
                  ></textarea>
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
                {loading ? "Plan Updating..." : "Update Plan"}
              </button>
            </div>
          </form>

          {/* Image Section */}
          <div className="hidden lg:block max-w-md mr-8">
            <Lottie
              animationData={loadingAnimation}
              loop={true}
              style={{ width: "450px", height: "450px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePlans;
