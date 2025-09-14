import type { Nitro } from 'nitropack'
import { generateRegistryAssets } from '../utils/registry-builder'

export const buildHooks = {
  'build:before': async (nitro: Nitro) => {
    await generateRegistryAssets({
      rootDir: nitro.options.rootDir,
    })
  },
}
