module.exports = [
    {
        method: 'GET',
        path: '/health-check',
        handler: 'api::health.health.index',
        config: {
            auth: false,  // No authentication needed for health check
        },
    },
];