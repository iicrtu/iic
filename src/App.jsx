import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import EventsPage from './pages/EventsPage/EventsPage';
import StartupsPage from './pages/StartupsPage/StartupsPage';
import Internships from './pages/Internships/Internships';
import Announcements from './pages/Announcements/Announcements';
import Apply from "./pages/Announcements/apply";
import Login from "./pages/Login/Login";
import DashboardStudent from "./pages/DashboardStudent/DashboardStudent";
import DashboardOrganisation from "./pages/DashboardOrganisation/DashboardOrganisation";
import OrgOnboarding from "./pages/OrgOnboarding/OrgOnboarding";
import PostInternship from "./pages/PostInternship/PostInternship";
import StudentOnboarding from "./pages/StudentOnboarding/StudentOnboarding";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import RequireAdmin from "./routes/RequireAdmin";

function App() {
  return (
    <Router>
      <Routes>
        {/* ── Admin routes (no Header / Footer) ── */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <RequireAdmin>
              <AdminDashboard />
            </RequireAdmin>
          }
        />

        {/* ── Public / user routes ── */}
        <Route
          path="*"
          element={
            <div className="App">
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/startups" element={<StartupsPage />} />
                <Route path="/internships" element={<Internships />} />
                <Route path="/announcements" element={<Announcements />} />
                <Route path="/apply" element={<Apply />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard/student" element={<DashboardStudent />} />
                <Route path="/dashboard/organisation" element={<DashboardOrganisation />} />
                <Route path="/onboarding/organisation" element={<OrgOnboarding />} />
                <Route path="/onboarding/student" element={<StudentOnboarding />} />
                <Route path="/post-internship" element={<PostInternship />} />
                <Route path="/edit-internship/:id" element={<PostInternship />} />
              </Routes>
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

