import Sidebar from "./SideBar";

const formatDate = () => {
  const options = { month: "short", day: "2-digit", year: "numeric" };
  return new Date().toLocaleDateString("en-US", options);
};

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 font-poppins p-6 ml-0 mr-0 md:ml-5 md:mr-5 lg:mr-35 lg:ml-35">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="sm:text-[45px] text-4xl font-bold text-gray-800">
              Profile
            </h1>
            <p className="text-[12px] text-gray-500 font-bold mt-1 text-center sm:text-left">
              {formatDate()}
            </p>
          </div>
          <div className="py-4 sm:py-0 sm:mr-4">
            <p className="text-xs font-bold text-gray-500">Last Month</p>
            <p className="text-4xl font-bold text-green-700">
              2500.00 <sup className="text-red-800">LKR</sup>{" "}
            </p>
          </div>
        </header>
      </div>

      {/* Profile Card */}
      <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
        <div className="max-w-lg w-full bg-white shadow-lg rounded-xl p-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-blue-200 flex justify-center items-center text-4xl font-bold text-blue-600 mb-4">
              Janindu Chamod
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">CJ</h1>
            <p className="text-sm text-gray-500 mb-4">
              janiduchamod25@gmail.com
            </p>
          </div>
          <div className="mt-6 border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">
                2025/01/15
              </span>
              <span className="text-sm text-gray-800"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
