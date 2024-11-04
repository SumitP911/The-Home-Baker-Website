import { Outlet, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';

function Layout() {
    const location = useLocation();

    // Check if current page is the Home Page
    const isHomePage = location.pathname === "/";

    return (
        <>
            <Navigation showScrollButtons={isHomePage} />
            <Outlet /> {/* This will render the current page's component */}
            <Footer />
        </>
    );
}

export default Layout;
