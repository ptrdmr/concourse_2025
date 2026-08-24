let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/back-tv', destination: '/back-tv.html' },
      { source: '/front-tv', destination: '/front-tv.html' },
      { source: '/draft_1', destination: '/draft_1.html' },
      { source: '/draft_2', destination: '/draft_2.html' },
      { source: '/bottles_cans', destination: '/bottles_cans.html' },
      { source: '/wines', destination: '/wines.html' },
      { source: '/bar_rotate', destination: '/bar_rotate.html' },
    ]
  },
  // Permanent (308) redirects preserving SEO equity from the old site's URLs.
  // Every path Google had indexed on the old site maps to its closest page here
  // so crawlers and existing inbound links never hit a 404.
  async redirects() {
    return [
      // --- Bowling / walk-in rates ---
      { source: '/concourse-bowling-walkin-rates', destination: '/bowling', permanent: true },
      { source: '/bowling-only', destination: '/bowling', permanent: true },
      { source: '/walkfaqs', destination: '/bowling', permanent: true },

      // --- Reservations ---
      { source: '/concourse-bowling-reservations', destination: '/reservations', permanent: true },
      { source: '/resfaqs', destination: '/reservations', permanent: true },
      { source: '/lane-reservation-faq', destination: '/reservations', permanent: true },

      // --- Bar & Cafe / menu ---
      { source: '/concourse-bowling-bar-and-grill', destination: '/menu', permanent: true },
      { source: '/happy-hour', destination: '/menu', permanent: true },
      { source: '/bar-faq', destination: '/menu', permanent: true },
      { source: '/catering-menu', destination: '/menu', permanent: true },
      { source: '/pizza-picture', destination: '/menu', permanent: true },

      // --- Events / parties / suites ---
      { source: '/holidayparties', destination: '/events', permanent: true },
      { source: '/holidayprices', destination: '/events', permanent: true },
      { source: '/vip-suites', destination: '/events', permanent: true },
      { source: '/specials', destination: '/events', permanent: true },

      // --- League sign-ups (all funnel to the leagues page) ---
      { source: '/leaguerequest', destination: '/league-bowling', permanent: true },
      { source: '/ebowlasignup', destination: '/league-bowling', permanent: true },
      { source: '/alleycatssignup', destination: '/league-bowling', permanent: true },
      { source: '/cerra-vila-sign-up', destination: '/league-bowling', permanent: true },
      { source: '/rivermagic', destination: '/league-bowling', permanent: true },
      { source: '/river-magic-sign-up', destination: '/league-bowling', permanent: true },
      { source: '/vegas-bound-sign-up', destination: '/league-bowling', permanent: true },
      { source: '/vegas-or-bust-sign-up', destination: '/league-bowling', permanent: true },
      { source: '/vegasbowlingsignup', destination: '/league-bowling', permanent: true },
      { source: '/monday-night-out-sign-up', destination: '/league-bowling', permanent: true },

      // --- Misc / retired pages ---
      { source: '/pro-shop', destination: '/bowling', permanent: true },
      { source: '/faqs', destination: '/contact', permanent: true },
      { source: '/contact-2', destination: '/contact', permanent: true },
      { source: '/new-page', destination: '/', permanent: true },
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
}

mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

export default nextConfig
