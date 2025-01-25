// src/components/AutoPing.js

import React, { useEffect } from 'react';

const AutoPing = () => {
    useEffect(() => {
        const pingInterval = setInterval(() => {
            fetch('https://your-strapi-backend-url/health-check')  // Replace with your health-check endpoint
                .then(response => response.json())
                .then(data => {
                    console.log('Ping successful:', data);
                })
                .catch(error => {
                    console.error('Ping failed:', error);
                });
        }, 10 * 60 * 1000); // Ping every 10 minutes

        // Cleanup the interval on component unmount
        return () => clearInterval(pingInterval);
    }, []);

    return null; // This component doesn’t render anything
};

export default AutoPing;
