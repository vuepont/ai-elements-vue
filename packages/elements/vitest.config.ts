import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue(), vueJsx({})],
  test: {
    browser: {
      headless: true,
      enabled: true,
      provider: playwright(),
      instances: [
        { browser: 'chromium' },
      ],
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        '__tests__/**',
        '**/*.config.{ts,js,mts}',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@repo/shadcn-vue/lib/utils': path.resolve(
        __dirname,
        '../shadcn-vue/lib/utils.ts',
      ),
      '@repo/shadcn-vue/components': path.resolve(
        __dirname,
        '../shadcn-vue/components',
      ),
      'katex/dist/katex.min.css': path.resolve(
        __dirname,
        './__tests__/styleMock.js',
      ),
    },
  },
})
