import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import footerLogo from '../../assets/footer-logo.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <Link to="/">
                        <img src={footerLogo} alt="IIC Logo" className="footer-logo" />
                    </Link>
                    <h3 className="footer-title">INNOVATION & INCUBATION CELL</h3>
                    <p className="footer-tagline">
                        Empowering the next generation of entrepreneurs through innovation, mentorship, and community.
                    </p>
                </div>
                <div className="footer-links">
                    <div className="footer-column">
                        <h4 className="footer-heading">QUICK LINKS</h4>
                        <ul className="footer-list">
                            <li><Link to="/">HOME</Link></li>
                            <li><Link to="/about">ABOUT US</Link></li>
                            <li><Link to="/events">EVENTS</Link></li>
                            <li><Link to="/startups">STARTUPS</Link></li>
                            <li><Link to="/internships">INTERNSHIPS</Link></li>
                            <li><Link to="/announcements">ANNOUCEMENT</Link></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4 className="footer-heading">CONTACT INFO</h4>
                        <ul className="footer-list">
                            <li>ecell@college.edu</li>
                            <li>+91 12345 67890</li>
                            <li>PNB Building, RTU</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-line"></div>
                <div className="footer-bottom-content">
                    <p className="footer-copyright">© 2025 E-Cell. All rights reserved.</p>
                    <div className="footer-legal">
                        <a href="#privacy">Privacy Policy</a>
                        <a href="#terms">Terms of Service</a>
                        <a href="#cookies">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

