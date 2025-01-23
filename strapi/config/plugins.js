module.exports = ({ env }) => ({
    "users-permissions": {
        config: {
            jwtSecret: env('JWT_SECRET', 'HTw3Twyj0/KemJ8TzK6j5w=='),
        },
    },
    upload: {
        config: {
            provider: '@strapi/provider-upload-aws-s3',
            providerOptions: {
                accessKeyId: env('R2_ACCESS_KEY_ID'),
                secretAccessKey: env('R2_SECRET_ACCESS_KEY'),
                region: 'auto',
                endpoint: `https://${env('R2_ACCOUNT_ID')}.r2.cloudflarestorage.com`,
                params: {
                    Bucket: env('R2_BUCKET_NAME'),
                },
            },
        },
    },
});