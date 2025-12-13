import React from 'react';
import Hero from '../../components/Hero/Hero';
import WhatWeOffer from '../../components/WhatWeOffer/WhatWeOffer';
import Events from '../../components/Events/Events';
import Startups from '../../components/Startups/Startups';
import Contact from '../../components/Contact/Contact';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page">
            <Hero />
            <WhatWeOffer />
            <Events />
            <Startups />
            <Contact />
        </div>
    );
};

export default Home;

