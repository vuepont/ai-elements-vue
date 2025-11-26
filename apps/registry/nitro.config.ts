import { defineNitroConfig } from 'nitropack/config'
import { buildHooks } from './server/hooks'

// https://nitro.build/config
export default defineNitroConfig({
  compatibilityDate: 'latest',
  srcDir: 'server',
  preset: 'cloudflare',
  hooks: buildHooks,
  serverAssets: [
    {
      baseName: 'registry',
      dir: './assets/registry',
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
