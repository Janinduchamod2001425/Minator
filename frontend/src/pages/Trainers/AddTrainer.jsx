import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../SideBar";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";

// background Animation
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/trainer.json";

const formatDate = () => {
  const options = { month: "short", day: "2-digit", year: "numeric" };
  return new Date().toLocaleDateString("en-US", options);
};

const AddTrainer = () => {
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    speciality: "",
    assignedClasses: "",
    contactInfo: "",
  });

  useEffect(() => {
    setLoading(true);
    fetchAllClasses();
  }, []);

  // Get the class data
  const fetchAllClasses = async () => {
    try {
      const response = await axiosInstance.get("/api/classes");
      setClasses(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch classes");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTrainer = async (e) => {
    e.preventDefault();

    // Get the Form data
    const {
      title,
      name,
      speciality,
      assignedClasses,
      contactInfo,
      countryCode,
    } = formData;

    // Check if all the fields are filled
    if (!title || !name || !speciality || !assignedClasses || !contactInfo) {
      toast.error("All fields must be filled");
      return;
    }

    // Combine country code with contact
    const fullContactInfo = `${countryCode}${contactInfo.trim()}`;

    setLoading(true);

    try {
      const response = await axiosInstance.post("/api/trainers", {
        name: `${title} ${name}`,
        speciality,
        assignedClasses,
        contactInfo: fullContactInfo,
      });

      const { trainer } = response.data;
      localStorage.setItem("trainer", JSON.stringify(trainer));

      // show success message
      toast.success("New Trainer added to Minator");
      navigate("/trainers");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding trainer");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-tl from-white via-pink-50 to-indigo-300">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 font-poppins p-6 sm:p-10 ml-0 mr-0 md:ml-5 md:mr-5 lg:mr-35 lg:ml-35">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-center mb-8 mt-10 sm:mt-0 space-y-4 sm:space-y-0">
          <div>
            <h1 className="sm:text-[45px] text-4xl font-bold text-gray-800">
              Add New Trainer
            </h1>
            <p className="text-[12px] text-white font-bold mt-1 text-center sm:text-left">
              {formatDate()}
            </p>
          </div>
          <div className="py-4 sm:py-0 sm:mr-4"></div>
        </header>

        {/* Main Panel */}
        <div className="text-gray-800 p-6 rounded-lg flex flex-col lg:flex-row items-center justify-between gap-6 mb-12 sm:mb-0">
          {/* Add Plan Form */}
          <form
            onSubmit={handleAddTrainer}
            className="bg-white p-10 rounded-xl shadow-lg w-full max-w-2xl space-y-8"
          >
            {/* Header */}
            <h2 className="text-3xl font-medium text-gray-800 mb-[-10px]">
              Fill out trainer Details
            </h2>

            {/* Navigate to Plans page */}
            <p className="text-xs text-gray-500">
              <Link
                to="/members"
                className="text-purple-600 font-medium hover:underline"
              >
                See all trainers
              </Link>
            </p>

            <div className="space-y-6">
              {/* Form in Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Title
                  </label>
                  <select
                    name="title"
                    id="title"
                    value={formData.title || ""}
                    onChange={handleChange}
                    className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                    required
                  >
                    <option value="">Select Title</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Miss">Miss</option>
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Trainer Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter trainer name"
                    value={formData.name}
                    onChange={handleChange}
                    className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <label
                    htmlFor="speciality"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Speciality
                  </label>
                  <select
                    name="speciality"
                    id="speciality"
                    value={formData.speciality}
                    onChange={handleChange}
                    className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                    required
                  >
                    <option value="">Select Speciality</option>
                    <option value="Strength Training">Strength Training</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Yoga">Yoga</option>
                    <option value="Pilates">Pilates</option>
                    <option value="CrossFit">CrossFit</option>
                  </select>
                </div>

                {/* Assigned Classes */}
                <div>
                  <label
                    htmlFor="assignedClasses"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Assigned Classes
                  </label>
                  <select
                    name="assignedClasses"
                    id="assignedClasses"
                    value={formData.assignedClasses}
                    onChange={handleChange}
                    className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="">Select Class</option>
                    {classes.map((classItem) => (
                      <option key={classItem.id} value={classItem._id}>
                        {classItem.name} - {classItem.day}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Contact Info */}
                <div>
                  <label
                    htmlFor="contactInfo"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Contact Info
                  </label>
                  <div className="flex items-center gap-2">
                    {/* Country Code */}
                    <select
                      name="countryCode"
                      id="countryCode"
                      value={formData.countryCode || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          countryCode: e.target.value,
                        })
                      }
                      className="text-sm w-20 px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                      required
                    >
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                      <option value="+91">+91</option>
                      <option value="+94">+94</option>
                    </select>

                    {/* Phone Number */}
                    <input
                      type="tel"
                      name="contactInfo"
                      id="contactInfo"
                      placeholder="Enter contact number"
                      value={formData.contactInfo}
                      onChange={handleChange}
                      className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                      required
                    />
                  </div>
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
                {loading ? "Trainer Adding..." : "Add Trainer"}
              </button>
            </div>
          </form>

          {/* Image Section */}
          <div className="hidden lg:block max-w-md mr-10 mb-3">
            <Lottie
              animationData={loadingAnimation}
              loop={true}
              style={{ width: "460px", height: "460px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTrainer;
