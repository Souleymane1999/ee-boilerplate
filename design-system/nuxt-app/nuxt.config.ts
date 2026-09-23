// https://nuxt.com/docs/api/configuration/nuxt-config
const normalizeBaseURL = (value?: string) => {
  if (!value) return '/'
  const trimmed = value.trim()
  if (!trimmed || trimmed === '/') return '/'
  const path = /^https?:\/\//i.test(trimmed) ? new URL(trimmed).pathname : trimmed
  return `/${path.replace(/^\/+|\/+$/g, '')}/`
}

const normalizeCdnURL = (value?: string) => {
  const base = normalizeBaseURL(value)
  return base === '/' ? '' : base
}

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  // Universal rendering. All browser-API access (canvas game, localStorage auth,
  // hash routing) is deferred to onMounted / event handlers so SSR is safe.
  ssr: true,
  devtools: { enabled: false },
  css: [
    '~/assets/css/colors_and_type.css',
    '~/assets/css/shell.css',
    '~/assets/css/auth.css',
    '~/assets/css/web_app.css',
    '~/assets/css/mobile.css',
  ],
  app: {
    // Use baseURL only when the app server itself is mounted under a subpath.
    baseURL: normalizeBaseURL(process.env.NUXT_APP_BASE_URL || process.env.APP_BASE_URL),
    // Archie strips /api/p/<port> before proxying, so its automatic preview
    // config uses cdnURL to prefix assets without changing the route base.
    cdnURL: normalizeCdnURL(process.env.NUXT_APP_CDN_URL || process.env.APP_CDN_URL || process.env.APP_ASSET_BASE_URL),
    head: {
      title: 'Delta Force · iFutur Design System',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
})
