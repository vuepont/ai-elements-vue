// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['shadcn-docs-nuxt'],

  plugins: ['~/plugins/ai-elements'],

  experimental: {
    payloadExtraction: false,
  },

  css: [
    'vue-stream-markdown/index.css',
    'vue-stream-markdown/theme.css',
  ],

  mdc: {
    highlight: {
      shikiEngine: 'javascript',
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
    },
  },

  components: [
    { path: '~/components' },
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
        prefix: 'custom-icon',
        dir: './assets/icons',
      },
    ],
  },

  ogImage: {
    fonts: [
      'Geist:400',
      'Geist:700',
    ],
  },

  build: {
    transpile: ['@repo/examples'],
  },

  compatibilityDate: '2024-09-19',

  sourcemap: false,

  routeRules: {
    '/**': { prerender: true },
  },

  vite: {
    build: {
      sourcemap: false,
      chunkSizeWarningLimit: 1500,
    },
    optimizeDeps: {
      include: [
        'dayjs',
        '@braintree/sanitize-url',
        'mermaid',
      ],
      esbuildOptions: {
        target: 'esnext',
      },
    },
    resolve: {
      dedupe: ['dayjs'],
    },
  },

  nitro: {
    preset: 'cloudflare_pages',
    cloudflare: {
      deployConfig: false,
      nodeCompat: true,
      pages: {
        routes: {
          include: ['/*'],
          exclude: ['/api/_mdc/*'],
        },
      },
    },
    prerender: {
      crawlLinks: true,
      autoSubfolderIndex: false,
      failOnError: true,
    },
    storage: {
      cache: { driver: 'memory' },
    },
  },
})
