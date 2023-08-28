/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        forceSwcTransforms: true,
    },
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.mjs/,
            include: /node_modules/,
            type: 'javascript/auto',
        });
        return config;
    },
};

module.exports = nextConfig;
