// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['shadcn-docs-nuxt'],

  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => tag.startsWith('media-'),
    },
  },

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
        'highlight.js',
        'mermaid',
        '@repo/examples > @lucide/vue',
        '@repo/examples > @vue-flow/core',
        '@repo/examples > nanoid',
        '@repo/examples > vue-sonner',
        '@repo/examples > zod',
        '@repo/elements > @rive-app/webgl2',
        '@repo/elements > @vue-flow/background',
        '@repo/elements > ansi-to-vue3',
        '@repo/elements > media-chrome',
        '@repo/elements > motion-v',
        '@repo/elements > shiki',
        '@repo/elements > tokenlens',
        '@repo/elements > vue-stick-to-bottom',
        '@repo/elements > vue-stream-markdown',
        '@repo/shadcn-vue > class-variance-authority',
        '@repo/shadcn-vue > clsx',
        '@repo/shadcn-vue > embla-carousel-vue',
        '@repo/shadcn-vue > reka-ui',
        '@repo/shadcn-vue > tailwind-merge',
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
