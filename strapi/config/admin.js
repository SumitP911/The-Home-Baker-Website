module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'WXA1uhAog/7Ip2WJs9SvYg=='),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'R1JrtzM5DjXns+NvdUwx5g=='),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
