const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withBundleAnalyzer = require('@next/bundle-analyzer');
const nextRuntimeDotenv = require('next-runtime-dotenv');
const withImages = require('next-images');
const { i18n } = require('./next-i18next.config');

const withConfig = nextRuntimeDotenv({ public: ['API_URL', 'API_KEY'] });

const nextConfig = {
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html',
    },
  },
  publicRuntimeConfig: {
    PROXY_MODE: process.env.PROXY_MODE,
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
    STATIC_PATH: process.env.STATIC_PATH,
  },
  i18n,
  // reactStrictMode: true,
  webpack5: false,
  swcMinify: true,
  basePath: '/login',
};

module.exports = withConfig(
  withPlugins(
    [[withCSS], [withSass], [withBundleAnalyzer], [withImages]],
    nextConfig
  )
);
// Uncomment the line below to enable basePath, pages and
// redirects will then have a path prefix (`/app` in this case)
//
// basePath: '/app',

// async redirects() {
//   return [
//     {
//       source: '/:p',
//       destination: '/verify-account',
//       permanent: false,
//     },
//   ];
// },
