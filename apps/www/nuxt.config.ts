// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['shadcn-docs-nuxt'],

  plugins: ['~/plugins/ai-elements'],

  content: {
    markdown: {
      mdc: true,
    },
  },

  components: [
    { path: '~/components' },
    { path: '../../packages/examples/src', pathPrefix: false },
  ],

  i18n: {
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        name: 'English',
        language: 'en-US',
      },
    ],
  },

  icon: {
    customCollections: [
      {
        prefix: 'my-icon',
        dir: './assets/icons',
      },
    ],
  },

  build: {
    transpile: ['@repo/examples'],
  },

  compatibilityDate: '2024-07-06',
})
