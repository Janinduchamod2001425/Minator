import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../SideBar";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";

// background Animation
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/gym2.json";

const formatDate = () => {
  const options = { month: "short", day: "2-digit", year: "numeric" };
  return new Date().toLocaleDateString("en-US", options);
};

const UpdateMember = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();
  const [updateMember, setUpdateMember] = useState({
    name: "",
    membershipType: "",
    status: "",
    joinDate: "",
  });

  // Get member data
  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/clients/${id}`);
        setUpdateMember(response.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch member details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMemberDetails();
  }, [id]);

  const handleUpdateMember = async (e) => {
    e.preventDefault();

    // Get the Form data
    const { name, membershipType, status, joinDate } = updateMember;

    // Check if all the fields are filled
    if (!name || !membershipType || !status || !joinDate) {
      toast.error("All fields must be filled");
      return;
    }

    setLoading(true);

    try {
      await axiosInstance.put(`/api/clients/${id}`, {
        name,
        membershipType,
        status,
        joinDate,
      });

      // show success message
      toast.success("Member details updated");
      navigate("/members");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating member");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUpdateMember({ ...updateMember, [e.target.name]: e.target.value });
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
              Update Member
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
            onSubmit={handleUpdateMember}
            className="bg-white p-10 rounded-xl shadow-lg w-full max-w-2xl space-y-8"
          >
            {/* Header */}
            <h2 className="text-3xl font-medium text-gray-800 mb-[-10px]">
              Update Member Details
            </h2>

            {/* Navigate to Plans page */}
            <p className="text-xs text-gray-500">
              <Link
                to="/members"
                className="text-purple-600 font-medium hover:underline"
              >
                See all members
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
                    Member Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter member name"
                    value={updateMember.name}
                    onChange={handleChange}
                    className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <label
                    htmlFor="membershipType"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Membership Type
                  </label>
                  <select
                    name="membershipType"
                    id="membershipType"
                    value={updateMember.membershipType}
                    onChange={handleChange}
                    className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="basic">Basic</option>
                    <option value="premium">Premium</option>
                    <option value="vip">VIP</option>
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
                          setUpdateMember({
                            ...updateMember,
                            status: statusOption.toLowerCase(),
                          })
                        }
                        className={`px-4 py-1 text-sm rounded-full cursor-pointer ${
                          updateMember.status === statusOption.toLowerCase()
                            ? "bg-purple-600 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {statusOption}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Join Date */}
                <div>
                  <label
                    htmlFor="joinDate"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Join Date
                  </label>
                  <input
                    type="date"
                    name="joinDate"
                    id="joinDate"
                    value={updateMember.joinDate}
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
                {loading ? "Member updating..." : "Update Member"}
              </button>
            </div>
          </form>

          {/* Image Section */}
          <div className="hidden lg:block max-w-md">
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

export default UpdateMember;