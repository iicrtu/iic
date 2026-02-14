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
import DashboardOrg from "./pages/DashboardOrg/DashboardOrg";
import OrgOnboarding from "./pages/OrgOnboarding/OrgOnboarding";
import CreateInternship from "./pages/CreateInternship/CreateInternship";
import RequireOrgOnboarding from "./routes/RequireOrgOnboarding";

function App() {
  return (
    <Router>
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
          <Route path="/dashboard/org" element={<DashboardOrg />} />
          <Route path="/onboarding/organisation" element={<OrgOnboarding />} />
          <Route path="/org/internships/new" element={<RequireOrgOnboarding><CreateInternship /></RequireOrgOnboarding>} />
    
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

