import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './Contact.css';
import instagramIcon from '../../assets/instagram-icon.png';
import linkedinIcon from '../../assets/linkedin-icon.png';
import whatsappIcon from '../../assets/whatsapp-icon.png';
import { CONTACT_SECTION, CONTACT_INFO, CONTACT_FORM, SOCIAL_SECTION, FORMSPREE_ENDPOINT } from '../../constants/contactConstants';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.name || !formData.email || !formData.message) {
            toast.error(CONTACT_FORM.errorMessage);
            return;
        }
        
        setStatus('sending');
        
        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            if (response.ok) {
                setStatus('success');
                toast.success(CONTACT_FORM.successMessage);
                setFormData({
                    name: '',
                    email: '',
                    message: ''
                });
            } else {
                setStatus('error');
                toast.error('There was an error sending your message. Please try again.');
            }
        } catch (error) {
            setStatus('error');
            toast.error('There was an error sending your message. Please try again.');
        }
    };

    return (
        <>
            <Toaster 
                position="top-center"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#fff',
                        color: '#000',
                        fontFamily: 'Roboto, sans-serif',
                        fontSize: '16px',
                        padding: '16px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    },
                    success: {
                        iconTheme: {
                            primary: '#10b981',
                            secondary: '#fff',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#fff',
                        },
                    },
                }}
            />
            <section className="contact-section">
            <h2 className="section-title">{CONTACT_SECTION.title}</h2>
            <p className="section-description">
                {CONTACT_SECTION.description}
            </p>
            <div className="contact-container">
                <div className="contact-left-column">
                    <div className="contact-info">
                        <h3 className="contact-subtitle">{CONTACT_INFO.subtitle}</h3>
                    <p className="contact-text">{CONTACT_INFO.text}</p>
                    <div className="contact-details">
                        <div className="contact-item">
                            <img src={CONTACT_INFO.email.icon} alt="email" className="contact-icon" />
                            <div className="contact-info-content">
                                <span className="contact-label">{CONTACT_INFO.email.label}</span>
                                <a href={`mailto:${CONTACT_INFO.email.value}`} className="contact-value contact-link">
                                    {CONTACT_INFO.email.value}
                                </a>
                            </div>
                        </div>
                        <div className="contact-item">
                            <img src={CONTACT_INFO.phone.icon} alt="phone" className="contact-icon" />
                            <div className="contact-info-content">
                                <span className="contact-label">{CONTACT_INFO.phone.label}</span>
                                <a href={`tel:${CONTACT_INFO.phone.value.replace(/\s+/g, '')}`} className="contact-value contact-link">
                                    {CONTACT_INFO.phone.value}
                                </a>
                            </div>
                        </div>
                        <div className="contact-item">
                            <img src={CONTACT_INFO.location.icon} alt="location" className="contact-icon" />
                            <div className="contact-info-content">
                                <span className="contact-label">{CONTACT_INFO.location.label}</span>
                                <span className="contact-value">{CONTACT_INFO.location.value}</span>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="social-section">
                        <h3 className="contact-subtitle">{SOCIAL_SECTION.subtitle}</h3>
                        <p className="contact-text">{SOCIAL_SECTION.text}</p>
                        <div className="social-links">
                            {SOCIAL_SECTION.links.map((link, index) => {
                                const icons = [instagramIcon, linkedinIcon, whatsappIcon];
                                return (
                                    <a key={index} href={link.url} className="social-link" target="_blank" rel="noopener noreferrer">
                                        <img src={icons[index]} alt={link.alt} />
                                        <span>{link.name}</span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="contact-form-section">
                    <h3 className="contact-subtitle">{CONTACT_FORM.subtitle}</h3>
                    <p className="contact-text">{CONTACT_FORM.text}</p>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">{CONTACT_FORM.placeholders.name}</label>
                            <input 
                                type="text" 
                                name="name"
                                placeholder={`Your ${CONTACT_FORM.placeholders.name}`}
                                className="form-input"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">{CONTACT_FORM.placeholders.email}</label>
                            <input 
                                type="email" 
                                name="email"
                                placeholder={CONTACT_FORM.placeholders.email}
                                className="form-input"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Message</label>
                            <textarea 
                                name="message"
                                placeholder={CONTACT_FORM.placeholders.message}
                                className="form-textarea"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="send-btn" disabled={status === 'sending'}>
                            {status === 'sending' ? 'SENDING...' : CONTACT_FORM.buttonText}
                        </button>
                    </form>
                </div>
            </div>
        </section>
        </>
    );
};

export default Contact;


