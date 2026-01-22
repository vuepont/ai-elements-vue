import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  pnpm: true,
  ignores: [
    '**/.nitro/**',
    'apps/registry/server/assets/**',
  ],
}, {
  // Without `files`, they are general rules for all files
  rules: {
    'pnpm/json-enforce-catalog': 0,
  },
}, {
  files: ['packages/examples/**/*.vue', 'packages/examples/**/*.ts'],
  rules: {
    'no-console': 'off',
  },
})
