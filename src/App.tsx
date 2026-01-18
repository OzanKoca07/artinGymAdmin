import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import type { FC } from "react";

// Pages
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Packages from "./pages/Packages";
import Announcements from "./pages/Announcements";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";
import Trainers from "./pages/Trainers";

/* ================= AUTH LAYOUT ================= */

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="auth-layout">{children}</div>;
};

/* ================= PANEL LAYOUT ================= */

const PanelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

/* ================= APP ================= */

const App: FC = () => {
  return (
    <Routes>
      {/* 🔓 AUTH */}
      <Route
        path="/"
        element={
          <AuthLayout>
            <Register />
          </AuthLayout>
        }
      />
      <Route
        path="/register"
        element={
          <AuthLayout>
            <Register />
          </AuthLayout>
        }
      />
      <Route
        path="/login"
        element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        }
      />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* 🔒 PANEL */}
      <Route
        path="/dashboard"
        element={
          <PanelLayout>
            <Dashboard />
          </PanelLayout>
        }
      />
      <Route
        path="/members"
        element={
          <PanelLayout>
            <Members />
          </PanelLayout>
        }
      />
      <Route
        path="/packages"
        element={
          <PanelLayout>
            <Packages />
          </PanelLayout>
        }
      />
      <Route
        path="/trainers"
        element={
          <PanelLayout>
            <Trainers />
          </PanelLayout>
        }
      />
      <Route
        path="/announcements"
        element={
          <PanelLayout>
            <Announcements />
          </PanelLayout>
        }
      />
      <Route
        path="/reports"
        element={
          <PanelLayout>
            <Reports />
          </PanelLayout>
        }
      />
      <Route
        path="/settings"
        element={
          <PanelLayout>
            <Settings />
          </PanelLayout>
        }
      />
    </Routes>
  );
};

export default App;
