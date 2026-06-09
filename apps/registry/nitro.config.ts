import { defineConfig } from 'nitro'
import { buildHooks } from './server/hooks'

// https://nitro.build/config
export default defineConfig({
  compatibilityDate: 'latest',
  serverDir: 'server',
  preset: 'cloudflare_module',
  builder: 'rolldown',
  rolldownConfig: {
    external: ['cloudflare:workers'],
    resolve: {
      mainFields: ['module', 'main'],
    },
  },
  hooks: buildHooks,
  serverAssets: [
    {
      baseName: 'registry',
      dir: './server/assets/registry',
    },
  ],
  cloudflare: {
    nodeCompat: true,
    deployConfig: true,
  },
  unenv: {
    alias: {
      // https://github.com/nitrojs/nitro/issues/3170
      'safer-buffer': 'node:buffer',
    },
  },
})
