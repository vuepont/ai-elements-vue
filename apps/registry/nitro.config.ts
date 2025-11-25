import { defineNitroConfig } from 'nitropack/config'
import { buildHooks } from './server/hooks'

// https://nitro.build/config
export default defineNitroConfig({
  compatibilityDate: '2024-09-19',
  srcDir: 'server',
  preset: 'cloudflare-module',
  hooks: buildHooks,
  serverAssets: [
    {
      baseName: 'registry',
      dir: './assets/registry',
    },
  ],
})
