import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../SideBar";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";

// background Animation
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/train.json";

const formatDate = () => {
  const options = { month: "short", day: "2-digit", year: "numeric" };
  return new Date().toLocaleDateString("en-US", options);
};

const UpdateTrainer = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  const [updateTrainer, setUpdateTrainer] = useState({
    name: "",
    speciality: "",
    assignedClasses: "",
    status: "",
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

  // fetch trainer details based on id
  useEffect(() => {
    const fetchTrainerDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/trainers/${id}`);
        setUpdateTrainer(response.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch trainer details"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchTrainerDetails();
  }, [id]);

  const handleUpdateTrainer = async (e) => {
    e.preventDefault();

    // Get the Form data
    const { name, speciality, assignedClasses, contactInfo, status } =
      updateTrainer;

    // Check if all the fields are filled
    if (!name || !speciality || !assignedClasses || !contactInfo || !status) {
      toast.error("All fields must be filled");
      return;
    }

    if (!contactInfo.length == 10) {
      toast.error(
        "Invalid contact number. Please enter a valid 10-digit number"
      );
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.put(`/api/trainers/${id}`, {
        name,
        speciality,
        assignedClasses,
        status,
        contactInfo,
      });

      const { trainer } = response.data;
      localStorage.setItem("trainer", JSON.stringify(trainer));

      // show success message
      toast.success("Trainer details updated");
      navigate("/trainers");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating trainer");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUpdateTrainer({ ...updateTrainer, [e.target.name]: e.target.value });
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
            onSubmit={handleUpdateTrainer}
            className="bg-white p-10 rounded-xl shadow-lg w-full max-w-2xl space-y-8"
          >
            {/* Header */}
            <h2 className="text-3xl font-medium text-gray-800 mb-[-10px]">
              Modify trainer Details
            </h2>

            {/* Navigate to Plans page */}
            <p className="text-xs text-gray-500">
              <Link
                to="/trainers"
                className="text-purple-600 font-medium hover:underline"
              >
                See all trainers
              </Link>
              <br />
            </p>
            <span className="font-bold text-xs text-gray-500 bg-pink-100 py-1 px-2 rounded-lg">
              If the Trainer Change the country need to contact the Manager
              before change the contact
            </span>

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
                    disabled
                    name="title"
                    id="title"
                    value={updateTrainer.title || ""}
                    onChange={handleChange}
                    className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
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
                    value={updateTrainer.name}
                    onChange={handleChange}
                    className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                    required
                  />
                </div>

                {/* Specilaity */}
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
                    value={updateTrainer.speciality}
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
                    <option value="Sports">Sports</option>
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
                    value={updateTrainer.assignedClasses}
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

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Status
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {["Active", "Inactive"].map((statusOption) => (
                      <div
                        key={statusOption}
                        onClick={() =>
                          setUpdateTrainer({
                            ...updateTrainer,
                            status: statusOption.toLowerCase(),
                          })
                        }
                        className={`px-4 py-1 text-sm rounded-full cursor-pointer ${
                          updateTrainer.status === statusOption.toLowerCase()
                            ? "bg-purple-600 text-white font-semibold"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {statusOption}
                      </div>
                    ))}
                  </div>
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
                      disabled
                      name="countryCode"
                      id="countryCode"
                      value={updateTrainer.countryCode || ""}
                      onChange={(e) =>
                        setUpdateTrainer({
                          ...updateTrainer,
                          countryCode: e.target.value,
                        })
                      }
                      className="text-sm w-20 px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                    >
                      <option value="+1">🇺🇸 +1 (United States)</option>
                      <option value="+44">🇬🇧 +44 (United Kingdom)</option>
                      <option value="+91">🇮🇳 +91 (India)</option>
                      <option value="+94">🇱🇰 +94 (Sri Lanka)</option>
                      <option value="+61">🇦🇺 +61 (Australia)</option>
                      <option value="+81">🇯🇵 +81 (Japan)</option>
                      <option value="+49">🇩🇪 +49 (Germany)</option>
                      <option value="+33">🇫🇷 +33 (France)</option>
                      <option value="+86">🇨🇳 +86 (China)</option>
                      <option value="+39">🇮🇹 +39 (Italy)</option>
                      <option value="+7">🇷🇺 +7 (Russia)</option>
                      <option value="+34">🇪🇸 +34 (Spain)</option>
                      <option value="+55">🇧🇷 +55 (Brazil)</option>
                      <option value="+27">🇿🇦 +27 (South Africa)</option>
                      <option value="+82">🇰🇷 +82 (South Korea)</option>
                      <option value="+31">🇳🇱 +31 (Netherlands)</option>
                      <option value="+47">🇳🇴 +47 (Norway)</option>
                      <option value="+46">🇸🇪 +46 (Sweden)</option>
                      <option value="+41">🇨🇭 +41 (Switzerland)</option>
                      <option value="+90">🇹🇷 +90 (Turkey)</option>
                      <option value="+52">🇲🇽 +52 (Mexico)</option>
                      <option value="+63">🇵🇭 +63 (Philippines)</option>
                      <option value="+62">🇮🇩 +62 (Indonesia)</option>
                      <option value="+64">🇳🇿 +64 (New Zealand)</option>
                      <option value="+60">🇲🇾 +60 (Malaysia)</option>
                      <option value="+65">🇸🇬 +65 (Singapore)</option>
                      <option value="+20">🇪🇬 +20 (Egypt)</option>
                      <option value="+971">
                        🇦🇪 +971 (United Arab Emirates)
                      </option>
                      <option value="+234">🇳🇬 +234 (Nigeria)</option>
                      <option value="+254">🇰🇪 +254 (Kenya)</option>
                      <option value="+356">🇲🇹 +356 (Malta)</option>
                      <option value="+372">🇪🇪 +372 (Estonia)</option>
                      <option value="+48">🇵🇱 +48 (Poland)</option>
                      <option value="+351">🇵🇹 +351 (Portugal)</option>
                    </select>

                    {/* Phone Number */}
                    <input
                      type="tel"
                      name="contactInfo"
                      id="contactInfo"
                      placeholder="Enter contact number"
                      value={updateTrainer.contactInfo}
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
                {loading ? "Trainer Updating..." : "Update Trainer"}
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

export default UpdateTrainer;
