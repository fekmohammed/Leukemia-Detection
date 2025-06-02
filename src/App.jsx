import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { cn } from "@/lib/utils";
import Dashboard from "./component/home.jsx";
import Patients from "./component/patients.jsx";
import Profile from "./component/profile.jsx";
import Detection from "./component/detection.jsx";
import NotFound from "./component/notfound.jsx"
import ViewProfile from "./component/viewprofile.jsx"; // adjust path as needed
import AddPatient from "./component/AddPatient"; // adjust path as needed
import {
  Home,
  Users,
  Microscope,
  Settings,
  LogOut,
} from "lucide-react";
import { View } from "lucide-react";
import Registration from "./Authentification/sign-in.jsx";
// import './App.css';

const App = () => {
  return (
    <Router>
      <div className="flex h-screen overflow-hidden">
        {/* Fixed sidebar */}
        <aside className="w-64 bg-white shadow-xl p-6 flex flex-col justify-between fixed h-full">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="text-xl font-bold text-primary mb-10">
          <span className=" text-gray-500">Leukemia</span> Detection
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-4">
          <Link
            to="/"
            className="flex items-center gap-3 hover:text-primary font-medium px-3 py-2 rounded-md hover:bg-[#F7F7F7] transition-all duration-500"
          >
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/patients"
            className="flex items-center gap-3 hover:text-primary font-medium px-3 py-2 rounded-md hover:bg-[#F7F7F7] transition-all duration-500"
          >
            <Users className="w-5 h-5" />
            <span>Patients</span>
          </Link>
          <Link
            to="/detect"
            className="flex items-center gap-3 hover:text-primary font-medium px-3 py-2 rounded-md hover:bg-[#F7F7F7] transition-all duration-500"
          >
            <Microscope className="w-5 h-5" />
            <span>Detection</span>
          </Link>

          {/* Settings */}
          <div className="pt-10 mt-10">
            <Link
              to="/settings"
              className="flex items-center gap-3 hover:text-primary font-medium px-3 py-2 rounded-md hover:bg-[#F7F7F7] transition-all duration-500"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* Bottom Section - User Info */}
      <div className="pt-4 mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/profile.jpg"
            alt="User"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="text-sm">
            <p className="font-medium text-gray-800">Clinick Name</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
        <button title="Logout" className="hover:text-red-600">
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </aside>

        {/* Main content area, padded to accommodate sidebar width */}
        <main className="ml-64 flex-1 p-8 overflow-y-auto h-screen bg-[#F7F7F7]">
          <Routes>
            {/* <Route path="/register" element={<Registration />} /> */}
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
    </Router>
  );
};

export default App;
