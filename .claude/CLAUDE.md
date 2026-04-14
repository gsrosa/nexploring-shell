# atlas-shell

MFE host application. Owns routing, layout, auth UI, and loads remote microfrontends.

## Dev
```bash
pnpm dev        # port 3000
pnpm typecheck  # tsc -b --noEmit
pnpm lint       # eslint
pnpm format     # prettier --write
```

## Architecture
- `src/app/router/` — `createBrowserRouter`, dynamically builds routes from `microfrontendRegistry`
- `src/microfrontends/registry/` — registry of all MFEs with feature flags + auth requirements
- `src/features/auth/` — session hook, login modal, auth-gated remote wrapper
- `src/components/` — shell layout, top-nav, bottom-nav, footer
- `src/shared/store/` — Zustand stores (`useShellStore`, `useAuthUiStore`)
- `src/config/feature-flags.ts` — `isFeatureEnabled(flag)` gates each MFE

## Module Federation
Configured in `vite.config.ts` via `@originjs/vite-plugin-federation`.
Remote URLs come from env vars (`VITE_*`), resolved in `module-federation/remotes.ts`.
Build target must be `esnext` for MF to work.

## Auth Pattern
```ts
// Check session anywhere
const { profile, isAuthenticated, isLoading } = useSession();

// Trigger login modal from any MFE
import { requestLogin } from '@/features/auth/auth-ui-store';
requestLogin(); // dispatches 'atlas:request-login' DOM event
```

## Adding a New MFE
1. Add entry to `microfrontendRegistry` in `src/microfrontends/registry/index.ts`
2. Add feature flag to `FeatureFlags` in `src/config/feature-flags.ts`
3. Add remote URL env var + update `module-federation/remotes.ts`
4. Add route constant to `src/shared/constants/shell-routes.ts`

## AI Engineering Infrastructure (.ai/)

See `.ai/README.md` for the full overview. Key sections:

### Rules — read before writing any code
- `.ai/rules/core.md` — non-negotiable rules (imports, naming, YAGNI)
- `.ai/rules/react.md` — React & TypeScript patterns
- `.ai/rules/state.md` — state management decision matrix
- `.ai/rules/naming.md` — naming conventions
- `.ai/rules/structure.md` — folder structure rules
- `.ai/rules/forms.md` — react-hook-form + zod patterns
- `.ai/rules/api.md` — tRPC client usage
- `.ai/rules/styling.md` — tokens, CVA, cn() usage
- `.ai/rules/testing.md` — testing conventions

### Architecture Decisions — read when touching affected areas
- `.ai/decisions/index.md` — table of all ADRs
- `.ai/decisions/001-mf-communication.md` — how MFs communicate via shell
- `.ai/decisions/002-global-state.md` — Trip state ownership
- `.ai/decisions/003-state-per-layer.md` — state solution per layer
- `.ai/decisions/004-bff-ai-orchestration.md` — BFF as AI orchestration layer

### Templates — use when scaffolding new code
- `.ai/templates/feature.md` — new feature checklist + folder scaffold
- `.ai/templates/component.md` — component pattern
- `.ai/templates/hook.md` — hook pattern

### Active Context — read when continuing an in-progress feature
- `.ai/context/current.md` — last session state, next steps, open decisions
