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

const AllMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch plans from the API
  const fetchMembers = async () => {
    try {
      const response = await axiosInstance.get("/api/clients");
      setMembers(response.data); // Assuming the API response returns an array of plans
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch members");
    } finally {
      setLoading(false);
    }
  };

  const deleteMember = async (id) => {
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
          await axiosInstance.delete(`/api/clients/${id}`);
          Swal.fire("Deleted!", "The plan has been deleted.", "success");
          fetchMembers(); // Refresh the member list
        } catch (error) {
          Swal.fire(
            "Error",
            error.response?.data?.message || "Failed to delete the member.",
            "error"
          );
        }
      }
    });
  };

  useEffect(() => {
    fetchMembers();
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
              All Members
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
              onClick={() => navigate("/addmember")}
              className="bg-purple-950 py-2 px-7 rounded-lg mt-1 hover:bg-gray-600 text-sm transition duration-300 ease-in-out font-bold"
            >
              {" "}
              <span className="text-white font-poppins font-bold">
                New Member
              </span>
            </button>
          </div>
        </header>

        {/* Main Panel */}
        <div className="sm:h-[520px] overflow-y-auto mb-10 sm:mb-0">
          {loading ? (
            <p className="font-bold">💪 Loading Members...</p>
          ) : members.length > 0 ? (
            <table className="table-auto w-full bg-white shadow-md rounded-md overflow-hidden">
              <thead className="bg-gray-200">
                <tr className="text-indigo-900 text-left">
                  <th className="py-3 px-4 font-bold">Member Name</th>
                  <th className="py-3 px-4 font-bold">Membership Type</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4 font-bold">Join Date</th>
                  <th className="py-3 px-4 font-bold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="font-medium">
                {members.map((member, index) => (
                  <tr
                    key={member.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } text-black font-mono text-sm`}
                  >
                    <td className="py-3 px-4">{member.name}</td>
                    <td className="py-3 px-4">
                      {member.membershipType
                        ? member.membershipType
                            .toLowerCase()
                            .charAt(0)
                            .toUpperCase() +
                          member.membershipType.slice(1).toLowerCase()
                        : ""}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          member.status.toLowerCase() === "active"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {member.status.toLowerCase() === "active" ? (
                          <>
                            <svg
                              className="h-4 w-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                            Active
                          </>
                        ) : (
                          <>
                            <svg
                              className="h-4 w-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              ></path>
                            </svg>
                            Inactive
                          </>
                        )}
                      </span>
                    </td>

                    <td className="py-3 px-4">{member.joinDate}</td>
                    <td className="py-3 px-4 flex gap-4 flex-row justify-center">
                      {/* Edit Icon */}
                      <span
                        onClick={() => navigate(`/updatemember/${member.id}`)}
                        className="cursor-pointer text-indigo-400 hover:text-indigo-600 transition duration-300 ease-in-out"
                        title="Edit"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11 4.5l4.5 4.5m-4.5-4.5H7.5A2.5 2.5 0 005 7v10a2.5 2.5 0 002.5 2.5h10a2.5 2.5 0 002.5-2.5V12m-7-7l-4.5 4.5"
                          />
                        </svg>
                      </span>

                      {/* Delete Icon */}
                      <span
                        onClick={() => deleteMember(member.id)}
                        className="cursor-pointer text-red-400 hover:text-red-600 transition duration-300 ease-in-out"
                        title="Delete"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h- w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 6.75h12M9.75 6.75V4.5a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v2.25M10.5 10.5v5.25m3-5.25v5.25M7.5 7.5l.75 10.5a2.25 2.25 0 002.25 2.25h3a2.25 2.25 0 002.25-2.25l.75-10.5"
                          />
                        </svg>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex justify-center items-center w-full h-68 sm:h-64 sm:flex-row flex-col">
              <Lottie
                animationData={noDataAnimation}
                loop={true}
                className="w-[300px] h-[300px] sm:w-[650px] sm:h-[650px] mt-4 sm:mt-32"
              />
              <p className="text-lg font-poppins font-bold text-black bg-purple-200 sm:py-2 sm:px-5 px-5 py-3 rounded-xl">
                No Members available
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllMembers;
