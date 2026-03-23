# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

AI Elements Vue is a Vue.js component library monorepo (pnpm + Turborepo) with no external service dependencies (no databases, Docker, etc.). See `README.md` for the full component list and user-facing docs.

### Services

| Service | Command | Port | Notes |
|---------|---------|------|-------|
| Registry (Nitro) | `pnpm dev:registry` | 3001 | Builds registry JSON assets on startup from `packages/elements` |
| Docs (Nuxt 3) | `pnpm dev:www` | 3002 | Documentation site; fetches examples from registry |

`pnpm dev` at root starts both via Turborepo (uses `turbo run dev`). The Turbo TUI can be noisy; starting them separately is fine for debugging.

### Lint / Test / Build

- **Lint:** `pnpm lint` (ESLint with `@antfu/eslint-config`); `pnpm lint:fix` to auto-fix.
- **Test:** `pnpm test` runs Vitest browser tests in `packages/elements` via Playwright (headless Chromium). Playwright browsers must be installed first: `pnpm exec playwright install --with-deps chromium`.
- **Build:** `pnpm build` runs Turborepo production build for all packages/apps.

### Gotchas

- The `pnpm-workspace.yaml` sets `shellEmulator: true` — pnpm uses its built-in shell emulator, so native shell features in lifecycle scripts may behave differently.
- `onlyBuiltDependencies` in `pnpm-workspace.yaml` controls which native packages are allowed to run install scripts. If a new native dependency is added and its install script doesn't run, add it to this list.
- Git hooks use `simple-git-hooks` (not husky). Pre-commit runs `pnpm lint-staged`; commit-msg runs `commitlint` (conventional commits required).
- The Nuxt docs app (`apps/www`) runs `nuxt prepare` as a postinstall step to generate `.nuxt` types. If type errors appear after dependency changes, re-run `pnpm install`.
