module.exports = ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            env("CF_PUBLIC_ACCESS_URL") ? env("CF_PUBLIC_ACCESS_URL").replace(/^https?:\/\//, "") : "",
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            env("CF_PUBLIC_ACCESS_URL") ? env("CF_PUBLIC_ACCESS_URL").replace(/^https?:\/\//, "") : "",
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'http://localhost:3000', // Local frontend
        'http://192.168.1.34:3000', // Local frontend for other device
        'https://thehomebaker.co.in',
        'https://www.thehomebaker.co.in',
        'https://the-home-baker-website.vercel.app/',
        'https://the-home-baker-website-sumit-patwardhans-projects.vercel.app/',
        'https://the-home-baker-website-git-main-sumit-patwardhans-projects.vercel.app/'
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true, // Enable if using cookies or headers
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];