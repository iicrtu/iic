import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/logo.png';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 100;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fetch user data
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
                    credentials: "include",
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, [location]);

    // Scroll to top when route changes
    useEffect(() => {
        window.scrollTo(0, 0);
        setMenuOpen(false); // Close menu on route change
        setShowDropdown(false); // Close dropdown on route change
    }, [location]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = async () => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
            setUser(null);
            navigate("/");
        } catch (error) {
            console.error("Error logging out:", error);
        }
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
                    {user ? (
                        <div className="user-menu">
                            <button 
                                className="user-btn"
                                onClick={() => setShowDropdown(!showDropdown)}
                                title={user.name}
                            >
                                {getFirstName(user.name)}
                            </button>
                            {showDropdown && (
                                <div className="user-dropdown">
                                    <button onClick={() => navigate(user.role === 'student' ? '/dashboard/student' : '/dashboard/organisation')}>
                                        Dashboard
                                    </button>
                                    <button onClick={handleLogout}>Logout</button>
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

