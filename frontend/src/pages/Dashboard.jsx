// import Company from "../assets/logo.png";
import Sidebar from "./SideBar";
import PieChart from "../components/PieChart";

// Buttons
import Plans from "../assets/plans.png";
import Classes from "../assets/classes.png";
import Trainers from "../assets/trainers.png";
import Members from "../assets/members.png";

// Statistics
import Lottie from "lottie-react";
import memberAnimation from "../assets/gym3.json";
import trainerAnimation from "../assets/gym2.json";
import classAnimation from "../assets/class.json";
import planAnimation from "../assets/plan.json";

import axiosInstance from "../utils/axiosInstance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BarGraph from "../components/BarGraph";

const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) return "Good Morning 🌄";
  if (currentHour < 18) return "Good Afternoon 🌅";
  return "Good Evening! 🌇";
};

const formatDate = () => {
  const options = { month: "short", day: "2-digit", year: "numeric" };
  return new Date().toLocaleDateString("en-US", options);
};

const Dashboard = () => {
  const [memberCount, setMemberCount] = useState(0);
  const [trainerCount, setTrainerCount] = useState(0);
  const [classesCount, setClassesCount] = useState(0);
  const [plansCount, setPlansCount] = useState(0);
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

    const fetchPlans = async () => {
      try {
        const response = await axiosInstance.get("/stats/plans");
        setPlansCount(response.data.plansCount);
      } catch (error) {
        console.error("Error fetching plans:", error.message);
      }
    };

    // Call all fetch functions
    fetchMembers();
    fetchTrainers();
    fetchClasses();
    fetchPlans();
  }, []);

  return (
    <div className="h-screen bg-gradient-to-tr from-white via-white to-pink-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 font-poppins p-6 ml-0 mr-0 md:ml-5 md:mr-5 lg:mr-35 lg:ml-35">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div>
            <h1 className="sm:text-[45px] text-4xl font-bold text-gray-800">
              Dashboard
            </h1>
            <p className="text-[12px] text-gray-500 font-bold mt-1 text-center sm:text-left">
              {formatDate()}
            </p>
          </div>
          <div className="py-4 sm:py-0 sm:mr-4">
            <p className="text-[16px] font-mono font-extrabold text-gray-800 text-center sm:text-left">
              {getGreeting()}
            </p>
            <p className="text-3xl font-medium text-gray-500">Welcome Back!</p>
          </div>
        </header>

        {/* Statistics Section */}
        <section className="grid lg:grid-cols-5 gap-y-6 px-16 font-poppins rounded-xl sm:px-2">
          {/* Total Members Count */}
          <div className="flex items-center justify-between sm:gap-2 gap-4 bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 sm:w-60 w-full sm:h-[140px] h-[120px] p-4 rounded-xl shadow-md">
            {/* Left Section */}
            <div className="flex flex-col items-center gap-2">
              <div className="">
                <div className="lg:block max-w-md sm: mb-">
                  <Lottie
                    animationData={memberAnimation}
                    loop={true}
                    style={{ width: "90px", height: "90px" }}
                  />
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col items-end sm:mr-2">
              <p className="text-sm sm:text-md font-bold text-gray-400 uppercase tracking-widest text-center sm:text-right mb-4">
                Total Members
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-black tracking-[0.10em]">
                {memberCount}
              </h2>
            </div>
          </div>

          {/* Total Trainers Count */}
          <div className="flex items-center justify-between sm:gap-2 gap-4 bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 sm:w-60 w-full sm:h-[140px] h-[120px] p-4 rounded-xl shadow-md">
            {/* Left Section */}
            <div className="flex flex-col items-center gap-2">
              <div className="">
                <div className="lg:block max-w-md">
                  <Lottie
                    animationData={trainerAnimation}
                    loop={true}
                    style={{ width: "80px", height: "80px" }}
                  />
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col items-end sm:mr-2">
              <p className="text-sm sm:text-md font-bold text-gray-400 uppercase tracking-widest text-center sm:text-right mb-4">
                Total Trainers
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-black tracking-[0.10em]">
                {trainerCount}
              </h2>
            </div>
          </div>

          {/* Total Classes Count */}
          <div className="flex items-center justify-between sm:gap-2 gap-4 bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 sm:w-60 w-full sm:h-[140px] h-[120px] p-4 rounded-xl shadow-md">
            {/* Left Section */}
            <div className="flex flex-col items-center gap-2">
              <div className="">
                <div className="lg:block max-w-md -ml-3">
                  <Lottie
                    animationData={classAnimation}
                    loop={true}
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col items-end sm:mr-2">
              <p className="text-sm sm:text-md font-bold text-gray-400 uppercase tracking-widest text-center sm:text-right mb-4">
                Total Classes
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-black tracking-[0.10em]">
                {classesCount}
              </h2>
            </div>
          </div>

          <div className="flex items-center justify-between sm:gap-2 gap-4 bg-gradient-to-tr from-pink-100 via-purple-50 to-indigo-100 sm:w-60 w-full sm:h-[140px] h-[120px] p-4 rounded-xl shadow-md">
            {/* Left Section */}
            <div className="flex flex-col items-center gap-2">
              <div className="">
                <div className="lg:block max-w-md sm:ml-3 sm:mt-2 ml-1">
                  <Lottie
                    animationData={planAnimation}
                    loop={true}
                    style={{ width: "70px", height: "70px" }}
                  />
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col items-end sm:mr-2">
              <p className="text-sm sm:text-md font-bold text-gray-400 uppercase tracking-widest text-center sm:text-right mb-4">
                Total <br />
                Plans
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-black tracking-[0.10em]">
                {plansCount}
              </h2>
            </div>
          </div>

          {/* Monthly Revenue */}
          <div className="sm:text-right text-center flex flex-col justify-between bg-gradient-to-tr from-indigo-100 via-purple-100 to-indigo-50 sm:w-64 w-full sm:h-[140px] h-[120px] p-4 rounded-xl shadow-md">
            <h4 className="text-sm sm:text-md font-bold text-gray-400 uppercase">
              Monthly Revenue
            </h4>
            <p className="text-3xl font-semibold text-green-500">
              120,000 <sup className="text-red-700">LKR</sup>
            </p>
            <p className="text-sm text-gray-500 font-mono">Updated: 22 Jan</p>
          </div>
        </section>

        {/* Main Panel */}
        <div className="text-white p-2 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-6 mb-12 sm:mb-0 sm:ml-1">
          {/* Pie Chart Section */}
          <div className="bg-gradient-to-r from-white-100 via-gray-50 to-indigo-50 rounded-3xl shadow-lg p-5 mt-3">
            <h4 className="text-xl font-bold text-gray-700 mb-4">
              Overview of Statistics
            </h4>
            <div className="w-full max-w-md mx-auto">
              <PieChart
                data={[memberCount, trainerCount, classesCount, plansCount]}
              />
            </div>
          </div>

          {/* Bar Graph Section */}
          <div className="bg-gradient-to-br from-indigo-100 via-white to-indigo-50 rounded-3xl shadow-lg p-5 mt-5 sm:mt-3 sm:-ml-74 sm:h-[380px]">
            <h3 className="text-xl font-bold text-gray-700 mb-4">
              Class Counts by Day
            </h3>
            <p className="text-xs text-gray-400 mb-8 font-semibold">
              The bar graph below shows the <br /> number of classes scheduled
              for each day of the week.
            </p>
            <p className="text-xs text-gray-400 mb-4 font-semibold">
              Hover over the bars <br /> for more detailed <br /> insights on
              each day&apos;s class count.
            </p>
            <div className="w-full max-w-md mx-auto sm:mt-34">
              <BarGraph />
            </div>
          </div>

          {/* Your Goals Section */}
          <div className="bg-gradient-to-r from-white via-indigo-50 to-indigo-100 rounded-3xl shadow-lg p-5 sm:ml-2 mt-3 sm:w-full sm:max-w-[280px] w-[350px] sm:h-[380px]">
            <h3 className="text-xl font-bold text-gray-700 mb-4">Your Goals</h3>
            <div className="space-y-4">
              {[
                {
                  label: "Running",
                  progress: "70km/80km",
                  percentage: 79,
                  emoji: "\ud83c\udfc3",
                },
                {
                  label: "Sleeping",
                  progress: "50hrs/60hrs",
                  percentage: 60,
                  emoji: "\ud83d\udecc",
                },
                {
                  label: "Weight Loss",
                  progress: "70kg/100kg",
                  percentage: 60,
                  emoji: "\ud83d\udd25",
                },
              ].map((goal, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{goal.emoji}</span>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700">
                        {goal.label}
                      </h4>
                      <p className="text-xs text-gray-500">{goal.progress}</p>
                    </div>
                  </div>
                  <div className="relative w-12 h-12">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        className="text-gray-300"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        className="text-indigo-500"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${goal.percentage}, 100`}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-700">
                      {goal.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <hr className="mt-2" />

            {/* Your Goals Section */}
            <h3 className="text-sm font-bold text-gray-700 mt-3 mb-2">
              Scheduled
            </h3>
            <div className="flex items-center justify-between bg-pink-50 shadow-xl p-3 rounded-xl">
              <div className="flex items-center">
                <span className="text-2xl mr-4">🧘‍♂️</span>
                <div>
                  <h5 className="text-sm font-roboto font-semibold text-gray-800 mb-1.5">
                    Training - Yoga
                  </h5>
                  <p className="text-xs font-bold text-white bg-purple-600 w-16 px-2 py-0.5 rounded-xl text-center">
                    Fitness
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">22 Mar</p>
                <button className="text-gray-500 hover:text-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12h12M6 16h12M6 8h12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="w-full max-w-xs sm:mx-18 grid grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-11 mb-8 bg-gradient-to-r from-white-100 via-gray-50 to-indigo-50 px-4 py-4 rounded-xl">
            {[
              {
                label: "PLANS",
                img: Plans,
                route: "/addplan",
              },
              {
                label: "CLASSES",
                img: Classes,
                route: "/addclass",
              },
              {
                label: "TRAINERS",
                img: Trainers,
                route: "/addtrainer",
              },
              {
                label: "MEMBERS",
                img: Members,
                route: "/addmember",
              },
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.route)}
                className="flex flex-col items-start p-4 rounded-xl text-gray-600 text-sm hover:bg-indigo-950 hover:text-white transition font-bold duration-700 ease-in-out shadow-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label={`Add ${item.label}`}
              >
                <span className="text-left mb-4">
                  ADD <br /> {item.label}
                </span>
                <img
                  src={item.img}
                  alt={`Add ${item.label}`}
                  className="w-14 h-14"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
