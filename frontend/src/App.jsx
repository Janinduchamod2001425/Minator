import { Route, Routes } from "react-router-dom";
import IntroPage from "./components/IntroPage";
import PrivateRoutes from "./components/PrivateRoutes";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";

import { Toaster } from "react-hot-toast";

export default function App() {
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
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}
