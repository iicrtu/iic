import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/logo.png';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
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
        setMenuOpen(false); // Close menu on route change
    }, [location]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [menuOpen]);

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="header-container">
                <Link to="/" className="logo-container">
                    <img src={logo} alt="IIC Logo" className="logo" />
                    <div className="line"></div>
                    <div className="logo-text">IIC</div>
                </Link>
                
                {/* Hamburger Menu Icon */}
                <button 
                    className={`hamburger ${menuOpen ? 'active' : ''}`} 
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Desktop Navigation */}
                <nav className="nav-menu desktop-menu">
                    <Link to="/" className="nav-link">
                        HOME
                    </Link>
                    <Link to="/about" className="nav-link">
                        ABOUT US
                    </Link>
                    <Link to="/internships" className="nav-link">
                        INTERNSHIPS
                    </Link>
                    <Link to="/announcements" className="nav-link">
                        ANNOUNCEMENTS
                    </Link>
                    <button className="login-btn">LOGIN</button>
                </nav>

                {/* Mobile Navigation */}
                <nav className={`nav-menu mobile-menu ${menuOpen ? 'open' : ''}`}>
                    <Link to="/" className="nav-link" onClick={toggleMenu}>
                        HOME
                    </Link>
                    <Link to="/about" className="nav-link" onClick={toggleMenu}>
                        ABOUT US
                    </Link>
                    <Link to="/internships" className="nav-link" onClick={toggleMenu}>
                        INTERNSHIPS
                    </Link>
                    <Link to="/announcements" className="nav-link" onClick={toggleMenu}>
                        ANNOUNCEMENTS
                    </Link>
                    <button className="login-btn" onClick={toggleMenu}>LOGIN</button>
                </nav>

                {/* Overlay */}
                {menuOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}
            </div>
        </header>
    );
};

export default Header;

