import React, { useState } from 'react';
import './Contact.css';
import instagramIcon from '../../images/instagram-icon.png';
import linkedinIcon from '../../images/linkedin-icon.png';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <section className="contact-section">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-description">
                Have questions or want to join E-Cell? We'd love to hear from you!
            </p>
            <div className="contact-container">
                <div className="contact-info">
                    <h3 className="contact-subtitle">Contact Information</h3>
                    <p className="contact-text">Reach out to us through any of these channels.</p>
                    <div className="contact-details">
                        <div className="contact-item">
                            <span className="contact-label">Email</span>
                            <span className="contact-value">iicrtu@gmail.com</span>
                        </div>
                        <div className="contact-item">
                            <span className="contact-label">Phone</span>
                            <span className="contact-value">+002828737338</span>
                        </div>
                        <div className="contact-item">
                            <span className="contact-label">Location</span>
                            <span className="contact-value">PTP HALL,PNB BUILDING</span>
                        </div>
                    </div>
                </div>
                <div className="contact-form-section">
                    <h3 className="contact-subtitle">Send us a Message</h3>
                    <p className="contact-text">Fill out the form and we'll get back to you soon</p>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            name="name"
                            placeholder="Name" 
                            className="form-input"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input 
                            type="email" 
                            name="email"
                            placeholder="Email" 
                            className="form-input"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <textarea 
                            name="message"
                            placeholder="Tell us about your idea" 
                            className="form-textarea"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                        <button type="submit" className="send-btn">SEND</button>
                    </form>
                </div>
                <div className="social-section">
                    <h3 className="contact-subtitle">Follow Us</h3>
                    <p className="contact-text">Stay updated with our latest events and activities</p>
                    <div className="social-links">
                        <a href="#" className="social-link" target="_blank" rel="noopener noreferrer">
                            <img src={instagramIcon} alt="Instagram" />
                            <span>Instagram</span>
                        </a>
                        <a href="#" className="social-link" target="_blank" rel="noopener noreferrer">
                            <img src={linkedinIcon} alt="LinkedIn" />
                            <span>LinkedIn</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

