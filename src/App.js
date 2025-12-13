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

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<About />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/startups" element={<StartupsPage />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/announcements" element={<Announcements />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

