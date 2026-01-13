import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import type { FC } from "react";

// Pages
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Packages from "./pages/Packages";
import Workouts from "./pages/Workouts";
import Announcements from "./pages/Announcements";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import Trainers from "./pages/Trainers";

const App: FC = () => {
  const location = useLocation();

  // 🔑 Login & Unauthorized sayfaları
  const isAuthPage =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/unauthorized";

  return (
    <div className="app-container">
      {/* 🔒 SADECE AUTH DIŞI SAYFALARDA */}
      {!isAuthPage && <Sidebar />}

      <div className="main-content">
        {!isAuthPage && <Topbar />}

        <div className="page-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/members" element={<Members />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
