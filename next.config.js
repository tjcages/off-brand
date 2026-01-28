/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/privacy',
        destination: 'https://docs.google.com/document/d/13fmzpHCpc3MnOUwLLd3jqOkYdHsSBy4tyXSht1RLwjE/edit?usp=drive_link',
        permanent: false,
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
