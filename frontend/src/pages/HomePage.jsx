// src/components/HomePage.jsx
import React, { useRef } from 'react';

import Home from '../components/Home.jsx';
import Products from '../components/Products';
import Testimonials from '../components/Testimonials';
import About from '../components/About';
import Contact from '../components/Contact';

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




