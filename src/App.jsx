import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  Link,
  useNavigate,
} from "react-router-dom";

import Dashboard from "./component/home.jsx";
import Patients from "./component/patients.jsx";
import Profile from "./component/profile.jsx";
import Detection from "./component/detection.jsx";
import NotFound from "./component/notfound.jsx";
import ViewProfile from "./component/viewprofile.jsx";
import AddPatient from "./component/AddPatient.jsx";
import SignIn from "./Authentification/sign-in.jsx";
import SignUp from "./Authentification/sign-up.jsx";
import ForgetPassword from "./Authentification/forget-password.jsx";
import { Home, Users, Microscope, Settings, LogOut } from "lucide-react";

import "./App.css";

const NavLink = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center gap-3 hover:text-primary font-medium px-3 py-2 rounded-md hover:bg-[#F7F7F7] transition-all duration-500"
  >
    {icon}
    <span>{label}</span>
  </Link>
);

const Sidebar = ({ setAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-white shadow-xl p-6 flex flex-col justify-between fixed h-full">
      <div>
        <div className="text-xl font-bold text-primary mb-10">
          <span className="text-gray-500">Leukemia</span> Detection
        </div>
        <nav className="flex flex-col gap-4">
          <NavLink to="/" icon={<Home className="w-5 h-5" />} label="Dashboard" />
          <NavLink to="/patients" icon={<Users className="w-5 h-5" />} label="Patients" />
          <NavLink to="/detect" icon={<Microscope className="w-5 h-5" />} label="Detection" />
          <div className="pt-10 mt-10">
            <NavLink to="/settings" icon={<Settings className="w-5 h-5" />} label="Settings" />
          </div>
        </nav>
      </div>
      <div className="pt-4 mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/profile.jpg"
            alt="User"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="text-sm">
            <p className="font-medium text-gray-800">Clinic Name</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
        <button title="Logout" onClick={handleLogout} className="hover:text-red-600">
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
};

const Layout = ({ setAuthenticated }) => (
  <div className="flex h-screen overflow-hidden">
    <Sidebar setAuthenticated={setAuthenticated} />
    <main className="ml-64 flex-1 p-8 overflow-y-auto h-screen bg-[#F7F7F7]">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/detect" element={<Detection />} />
        <Route path="/detect/:id?" element={<Detection />} />
        <Route path="/add" element={<AddPatient />} />
        <Route path="/edit/:id" element={<ViewProfile />} />
        <Route path="/patients/:id/profile" element={<ViewProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  </div>
);

const AppRouter = ({ isAuthenticated, setAuthenticated }) => {
  const location = useLocation();

  if (
    !isAuthenticated &&
    location.pathname !== "/login" &&
    location.pathname !== "/register" &&
    location.pathname !== "/forgot-password"
  ) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route path="/login" element={<SignIn setAuthenticated={setAuthenticated} />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="*" element={<Layout setAuthenticated={setAuthenticated} />} />
    </Routes>
  );
};

const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(
    () => localStorage.getItem("isAuthenticated") === "true"
  );

  const handleSetAuthenticated = (value) => {
    setAuthenticated(value);
    localStorage.setItem("isAuthenticated", value);
  };

  return (
    <Router>
      <AppRouter
        isAuthenticated={isAuthenticated}
        setAuthenticated={handleSetAuthenticated}
      />
    </Router>
  );
};

export default App;
