import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './Bread-crumbs.scss';

function Breadcrumbs() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x); // Split path into segments

    // Home page breadcrumb (no breadcrumbs)
    if (pathnames.length === 0) {
        return (
            <Breadcrumb className="breadcrumbs my-3">
                <Breadcrumb.Item active>Home</Breadcrumb.Item>
            </Breadcrumb>
        );
    }

    // Product Category Page breadcrumb (Home > Product Category without link)
    if (pathnames.length === 2 && pathnames[0] === 'productCategory') {
        return (
            <Breadcrumb className="breadcrumbs my-3">
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
                    Home
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Product Category</Breadcrumb.Item>
            </Breadcrumb>
        );
    }

    // Product Page breadcrumb (Home > Product Category > Product)
    if (pathnames.length === 2 && pathnames[0] === 'productCategory' && pathnames[2] === 'products') {
        return (
            <Breadcrumb className="breadcrumbs my-3">
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
                    Home
                </Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/productCategory/${pathnames[1]}` }}>
                    Product Category
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Product</Breadcrumb.Item>
            </Breadcrumb>
        );
    }

    // Default breadcrumb structure for any other pages
    return (
        <Breadcrumb className="breadcrumbs my-3">
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
                Home
            </Breadcrumb.Item>

            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;

                // Capitalize the name of the breadcrumb
                const label = name.charAt(0).toUpperCase() + name.slice(1);

                // Last item is non-clickable
                return isLast ? (
                    <Breadcrumb.Item active key={name}>
                        {label}
                    </Breadcrumb.Item>
                ) : (
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: routeTo }} key={name}>
                        {label}
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    );
}

export default Breadcrumbs;
