// src/components/HomePage.jsx
import React, { useRef } from 'react';

import Home from '../components/Home/Home.jsx';
import Products from '../components/Products/Products.jsx';
import Testimonials from '../components/Testimonials/Testimonials.jsx';
import About from '../components/About/About.jsx';
import Contact from '../components/Contact/Contact.jsx';

function HomePage() {

    const homeRef = useRef(null);
    const productsRef = useRef(null);
    const testimonialsRef = useRef(null);
    const aboutRef = useRef(null);
    const contactRef = useRef(null);

    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            <Home ref={homeRef} />
            <Products ref={productsRef} />
            <Testimonials ref={testimonialsRef} />
            <About ref={aboutRef} />
            <Contact ref={contactRef} />
        </div>
    );

}

export default HomePage;




