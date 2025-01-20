import Company from "../assets/logo.png";
import Sidebar from "./SideBar";

// Buttons
import Plans from "../assets/plans.png";
import Classes from "../assets/classes.png";
import Trainers from "../assets/trainers.png";
import Members from "../assets/members.png";

import axiosInstance from "../utils/axiosInstance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const formatDate = () => {
  const options = { month: "short", day: "2-digit", year: "numeric" };
  return new Date().toLocaleDateString("en-US", options);
};

const Dashboard = () => {
  const [memberCount, setMemberCount] = useState(0);
  const [trainerCount, setTrainerCount] = useState(0);
  const [classesCount, setClassesCount] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch total members
    const fetchMembers = async () => {
      try {
        const response = await axiosInstance.get("/stats/members");
        setMemberCount(response.data.membersCount);
      } catch (error) {
        console.error("Error fetching members:", error.message);
      }
    };

    const fetchTrainers = async () => {
      try {
        const response = await axiosInstance.get("/stats/trainers");
        setTrainerCount(response.data.trainersCount);
      } catch (error) {
        console.error("Error fetching trainers:", error.message);
      }
    };

    const fetchClasses = async () => {
      try {
        const response = await axiosInstance.get("/stats/classes");
        setClassesCount(response.data.classesCount);
      } catch (error) {
        console.error("Error fetching active classes:", error.message);
      }
    };

    const fetchMonthlyRevenue = async () => {
      try {
        const response = await axiosInstance.get("/stats/revenue");
        setMonthlyRevenue(response.data.monthlyRevenue);
      } catch (error) {
        console.error("Error fetching monthly revenue:", error.message);
      }
    };

    // Call all fetch functions
    fetchMembers();
    fetchTrainers();
    fetchClasses();
    fetchMonthlyRevenue();
  }, []);

  return (
    <div className="min-h-screen  bg-gradient-to-tr from-white via-white to-pink-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 font-poppins p-6 ml-0 mr-0 md:ml-5 md:mr-5 lg:mr-35 lg:ml-35">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="sm:text-[45px] text-4xl font-bold text-gray-800">
              Dashboard
            </h1>
            <p className="text-[12px] text-gray-500 font-bold mt-1 text-center sm:text-left">
              {formatDate()}
            </p>
          </div>
          <div className="py-4 sm:py-0 sm:mr-4">
            <p className="text-xs font-bold text-gray-500">Last Month</p>
            <p className="text-4xl font-bold text-green-700">
              {monthlyRevenue} <sup className="text-red-800">LKR</sup>{" "}
            </p>
          </div>
        </header>

        {/* Statistics Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 py-6 px-4 sm:px-10 font-poppins">
          <div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6">
            <p className="text-sm sm:text-lg font-bold text-gray-400 uppercase tracking-widest text-center sm:text-left">
              TOTAL <br /> MEMBERS
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 tracking-[0.10em]">
              {memberCount}
            </h2>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6">
            <p className="text-sm sm:text-lg font-bold text-gray-400 uppercase tracking-widest text-center sm:text-left">
              TOTAL <br /> TRAINERS
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 tracking-[0.10em]">
              {trainerCount}
            </h2>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6">
            <p className="text-sm sm:text-lg font-bold text-gray-400 uppercase tracking-widest text-center sm:text-left">
              ACTIVE <br /> CLASSES
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 tracking-[0.10em]">
              {classesCount}
            </h2>
          </div>
        </section>

        {/* Main Panel */}
        <div className="text-white p-6 rounded-lg flex flex-col lg:flex-row items-center justify-between gap-6 mb-12 sm:mb-0">
          {/* Logo Section */}
          <div className="bg-indigo-950 px-6 py-6 sm:ml-5 ml-0 w-[380px] h-[250px] sm:w-[600px] sm:h-[400px] rounded-3xl flex items-center justify-center">
            <img
              src={Company}
              alt="Logo"
              className="w-[200px] h-[180px] sm:w-[330px] sm:h-[280px]"
            />
          </div>

          {/* Buttons Section */}
          <div className="w-full max-w-md mx-auto grid grid-cols-2 gap-4 sm:gap-6">
            <button
              onClick={() => navigate("/addplan")}
              className="flex flex-col items-start p-4 rounded-xl text-gray-600 text-sm hover:bg-indigo-950 hover:text-white transition font-bold duration-700 ease-in-out focus:ring-sky-200 shadow-2xl"
            >
              <span className="text-left mb-4">
                ADD <br /> PLANS
              </span>
              <img src={Plans} alt="Add Plans" className="w-20 h-20" />
            </button>
            <button
              onClick={() => navigate("/addclass")}
              className="flex flex-col items-start p-4 rounded-xl text-gray-600 text-sm hover:bg-indigo-950 hover:text-white transition font-bold duration-700 ease-in-out focus:ring-sky-200 shadow-2xl"
            >
              <span className="text-left mb-4">
                ADD <br /> CLASSES
              </span>
              <img src={Classes} alt="Add Classes" className="w-24 h-24 " />
            </button>
            <button
              onClick={() => navigate("/addtrainer")}
              className="flex flex-col items-start p-4 rounded-xl text-gray-600 text-sm hover:bg-indigo-950 hover:text-white transition font-bold duration-700 ease-in-out focus:ring-sky-200 shadow-2xl"
            >
              <span className="text-left mb-4">
                ADD <br /> TRAINERS
              </span>
              <img src={Trainers} alt="Add Trainers" className="w-24 h-24" />
            </button>
            <button
              onClick={() => navigate("/addmember")}
              className="flex flex-col items-start p-4 rounded-xl text-gray-600 text-sm hover:bg-indigo-950 hover:text-white transition font-bold duration-700 ease-in-out focus:ring-sky-200 shadow-2xl"
            >
              <span className="text-left mb-4">
                ADD <br /> MEMBERS
              </span>
              <img src={Members} alt="Add Members" className="w-24 h-24 " />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
