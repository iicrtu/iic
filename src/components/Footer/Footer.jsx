import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import {
  FOOTER_BRAND,
  FOOTER_QUICK_LINKS,
  FOOTER_CONTACT_INFO,
  FOOTER_SOCIAL,
  FOOTER_BOTTOM
} from '../../constants/footerConstants';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <div className="footer-brand-header">
                        <img src={FOOTER_BRAND.logo} alt="IIC Logo" className="footer-logo" />
                        <h3 className="footer-title">{FOOTER_BRAND.title}</h3>
                    </div>
                    <p className="footer-tagline">{FOOTER_BRAND.tagline}</p>
                    
                    {/* Social Icons */}
                    <div className="footer-social">
                        {FOOTER_SOCIAL.links.map((social, index) => (
                            <a
                                key={index}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-social-link"
                            >
                                <img src={social.icon} alt={social.alt} className="footer-social-icon" />
                            </a>
                        ))}
                    </div>
                </div>
                <div className="footer-links">
                    <div className="footer-column">
                        <h4 className="footer-heading">{FOOTER_QUICK_LINKS.heading}</h4>
                        <ul className="footer-list">
                            {FOOTER_QUICK_LINKS.links.map((link, index) => (
                                <li key={index}>
                                    <Link to={link.path}>{link.text}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4 className="footer-heading">{FOOTER_CONTACT_INFO.heading}</h4>
                        <ul className="footer-list">
                            {FOOTER_CONTACT_INFO.items.map((item, index) => (
                                <li key={index} className="footer-contact-item">
                                    {item.icon && <img src={item.icon} alt={item.type} className="footer-contact-icon" />}
                                    {item.type === 'email' ? (
                                        <a href={`mailto:${item.text}`} className="footer-contact-link">{item.text}</a>
                                    ) : item.type === 'phone' ? (
                                        <a href={`tel:${item.text.replace(/\s+/g, '')}`} className="footer-contact-link">{item.text}</a>
                                    ) : (
                                        <span>{item.text}</span>
                                    )}
                        </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-divider"></div>
                <div className="footer-bottom-content">
                    <p className="footer-copyright">{FOOTER_BOTTOM.copyright}</p>
                    <div className="footer-legal">
                        {FOOTER_BOTTOM.legalLinks.map((link, index) => (
                            <Link key={index} to={link.path}>{link.text}</Link>
                        ))}
                    </div>
                </div>
                <div className="footer-credits">
                    <p>Designed by Aditya</p>
                    <p>Made with ❤️ by Somya and Suhani</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

