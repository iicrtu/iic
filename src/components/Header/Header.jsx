import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/logo.png';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 100;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll to top when route changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="header-container">
                <Link to="/" className="logo-container">
                    <img src={logo} alt="IIC Logo" className="logo" />
                    <div className="line"></div>
                    <div className="logo-text">IIC</div>
                </Link>
                <nav className="nav-menu">
                    <Link to="/" className="nav-link">
                        HOME
                    </Link>
                    <Link to="/about" className="nav-link">
                        ABOUT US
                    </Link>
                    {/* <Link to="/startups" className="nav-link">
                        STARTUPS
                    </Link>
                    <Link to="/events" className="nav-link">
                        EVENTS
                    </Link> */}
                    <Link to="/internships" className="nav-link">
                        INTERNSHIPS
                    </Link>
                    <Link to="/announcements" className="nav-link">
                        ANNOUNCEMENTS
                    </Link>
                    <button className="login-btn">LOGIN</button>
                </nav>
            </div>
        </header>
    );
};

export default Header;

