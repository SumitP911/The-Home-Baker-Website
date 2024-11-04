// Importing the required components
import Home from '../components/Home/Home.jsx';
import Products from '../components/Products/Products.jsx';
import Testimonials from '../components/Testimonials/Testimonials.jsx';
import About from '../components/About/About.jsx';
import Contact from '../components/Contact/Contact.jsx';

function HomePage() {

    return (
        <div>
            <section id="home">
                <Home />
            </section>
            <section id="products">
                <Products />
            </section>
            <section id="testimonials">
                <Testimonials />
            </section>
            <section id="about">
                <About />
            </section>
            <section id="contact">
                <Contact />
            </section>
        </div>
    );

}

export default HomePage;