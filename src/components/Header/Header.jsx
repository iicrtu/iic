import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import animatedIcon from '../../assets/animated-icon.gif';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

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
        setShowDropdown(false); // Close dropdown on route change
    }, [location]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showDropdown && !event.target.closest('.user-menu')) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showDropdown]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleDropdown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowDropdown(!showDropdown);
    };

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    // Extract first name from full name
    const getFirstName = (fullName) => {
        if (!fullName) return "User";
        return fullName.split(' ')[0];
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
                    <img src={animatedIcon} alt="IIC" className="logo-animation" width="48" height="48" />
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
                    {user ? (
                        <div className="user-menu">
                            <button 
                                className="user-btn"
                                onClick={toggleDropdown}
                                title={user.name}
                                type="button"
                            >
                                {getFirstName(user.name)}
                            </button>
                            {showDropdown && (
                                <div className="user-dropdown">
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            setShowDropdown(false);
                                            navigate(user.role === 'student' ? '/dashboard/student' : '/dashboard/organisation');
                                        }}
                                    >
                                        Dashboard
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            setShowDropdown(false);
                                            handleLogout();
                                        }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button className="login-btn" onClick={() => navigate('/login')}>LOGIN</button>
                    )}
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
                    {user ? (
                        <>
                            <button 
                                className="user-btn-mobile"
                                onClick={() => {
                                    toggleMenu();
                                    navigate(user.role === 'student' ? '/dashboard/student' : '/dashboard/organisation');
                                }}
                            >
                                Dashboard ({getFirstName(user.name)})
                            </button>
                            <button className="logout-btn-mobile" onClick={() => {
                                toggleMenu();
                                handleLogout();
                            }}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <button className="login-btn" onClick={() => {
                            toggleMenu();
                            navigate('/login');
                        }}>LOGIN</button>
                    )}
                </nav>

                {/* Overlay */}
                {menuOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}
            </div>
        </header>
    );
};

export default Header;

