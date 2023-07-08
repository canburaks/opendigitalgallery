/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config'); // eslint-disable-line

const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: ['verxgygbyoarytwtzexz.supabase.co', 'cms.opendigitalgallery.com', 'i0.wp.com'],
  },
};


module.exports = nextConfig;

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs'); // eslint-disable-line

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});


if (process.env.ANALYZE === 'true'){
  module.exports = withBundleAnalyzer(nextConfig);
} else {
  module.exports = withSentryConfig(
    module.exports,
    {
      // For all available options, see:
      // https://github.com/getsentry/sentry-webpack-plugin#options

      // Suppresses source map uploading logs during build
      silent: true,

      org: 'open-digital-gallery',
      project: 'dev',
    },
    {
      // For all available options, see:
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

      // Upload a larger set of source maps for prettier stack traces (increases build time)
      widenClientFileUpload: true,

      // Transpiles SDK to be compatible with IE11 (increases bundle size)
      transpileClientSDK: true,

      // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
      tunnelRoute: '/monitoring',

      // Hides source maps from generated client bundles
      hideSourceMaps: true,

      // Automatically tree-shake Sentry logger statements to reduce bundle size
      disableLogger: true,
    }
  );
}




