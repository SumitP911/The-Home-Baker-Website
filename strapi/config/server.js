module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'), // Render requires 0.0.0.0 for host
  port: env.int('PORT', 1337), // Render dynamically sets the port
  app: {
    keys: env.array('APP_KEYS'), // Secure keys for app encryption
  },
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'TIk6gFasG/1rKvNYE3a2ww=='), // Secret for admin panel authentication
    },
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false), // Optional: Can stay as false unless needed
  },
});
