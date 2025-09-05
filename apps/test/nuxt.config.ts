import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@repo/shadcn-vue': fileURLToPath(new URL('../../packages/shadcn-vue', import.meta.url)),
        '@repo/elements': fileURLToPath(new URL('../../packages/elements/src', import.meta.url)),
      },
    },
    optimizeDeps: {
      include: [
        '@vueuse/core',
        'lucide-vue-next',
        'clsx',
        'tailwind-merge',
        'class-variance-authority',
        'nanoid',
      ],
    },
  },
})
