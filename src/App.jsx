import React, { Suspense } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './lib/queryClient';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import RequireAdmin from "./routes/RequireAdmin";

// Lazy-loaded page components
const Home = React.lazy(() => import('./pages/Home/Home'));
const About = React.lazy(() => import('./pages/About/About'));
const EventsPage = React.lazy(() => import('./pages/EventsPage/EventsPage'));
const StartupsPage = React.lazy(() => import('./pages/StartupsPage/StartupsPage'));
const Internships = React.lazy(() => import('./pages/Internships/Internships'));
const Announcements = React.lazy(() => import('./pages/Announcements/Announcements'));
const Apply = React.lazy(() => import('./pages/Announcements/apply'));
const Login = React.lazy(() => import('./pages/Login/Login'));
const DashboardStudent = React.lazy(() => import('./pages/DashboardStudent/DashboardStudent'));
const DashboardOrganisation = React.lazy(() => import('./pages/DashboardOrganisation/DashboardOrganisation'));
const OrgOnboarding = React.lazy(() => import('./pages/OrgOnboarding/OrgOnboarding'));
const PostInternship = React.lazy(() => import('./pages/PostInternship/PostInternship'));
const StudentOnboarding = React.lazy(() => import('./pages/StudentOnboarding/StudentOnboarding'));
const AdminLogin = React.lazy(() => import('./pages/Admin/AdminLogin'));
const AdminDashboard = React.lazy(() => import('./pages/Admin/AdminDashboard'));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <AuthProvider>
      <Suspense fallback={<LoadingSpinner />}>
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
      </Suspense>
      </AuthProvider>
    </Router>
    </QueryClientProvider>
  );
}

export default App;

