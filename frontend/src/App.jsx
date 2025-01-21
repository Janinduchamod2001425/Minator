import { Route, Routes } from "react-router-dom";
import IntroPage from "./components/IntroPage";
import PrivateRoutes from "./components/PrivateRoutes";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

import { Toaster } from "react-hot-toast";
import AllPlans from "./pages/Plans/AllPlans";
import AddPlans from "./pages/Plans/AddPlans";
import UpdatePlans from "./pages/Plans/UpdatePlans";
import AllClasses from "./pages/Classes/AllClasses";
import AddClass from "./pages/Classes/AddClass";
import UpdateClass from "./pages/Classes/UpdateClass";
import AllMembers from "./pages/Members/AllMembers";
import AddMember from "./pages/Members/AddMember";
import UpdateMember from "./pages/Members/UpdateMember";
import AllTrainers from "./pages/Trainers/AllTrainers";
import AddTrainer from "./pages/Trainers/AddTrainer";
import UpdateTrainer from "./pages/Trainers/UpdateTrainer";
import { useEffect, useState } from "react";

import Lottie from "lottie-react";
import loadingAnimation from "./assets/gym.json";
import BarGraph from "./components/BarGraph";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          style={{ width: "180px", height: "180px" }}
        />
      </div>
    );
  }

  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<IntroPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Private Routes */}
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Plan Routes */}
          <Route path="/plans" element={<AllPlans />} />
          <Route path="/addplan" element={<AddPlans />} />
          <Route path="/updateplan/:id" element={<UpdatePlans />} />

          {/* Class Routes */}
          <Route path="/classes" element={<AllClasses />} />
          <Route path="/addclass" element={<AddClass />} />
          <Route path="/updateclass/:id" element={<UpdateClass />} />

          {/* Member Routes */}
          <Route path="/members" element={<AllMembers />} />
          <Route path="/addmember" element={<AddMember />} />
          <Route path="/updatemember/:id" element={<UpdateMember />} />

          {/* Trainer Routes */}
          <Route path="/trainers" element={<AllTrainers />} />
          <Route path="/addtrainer" element={<AddTrainer />} />
          <Route path="/updatetrainer/:id" element={<UpdateTrainer />} />

          <Route path="/test" element={<BarGraph />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}
