import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import Breadcrumbs from '../Breadcrumbs/Bread-crumbs.jsx';

function Layout() {
    const location = useLocation();

    // Check if current page is the Home Page
    const isHomePage = location.pathname === "/";

    return (
        <>
            <Navigation showScrollButtons={isHomePage} />
            {!isHomePage && <Breadcrumbs />} {/* Show breadcrumbs only if not on Home page */}
            <Outlet /> {/* This will render the current page's component */}
            <Footer />
        </>
    );
}

export default Layout;
