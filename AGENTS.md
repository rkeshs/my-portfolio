# Repository guide

## Stack and commands

- Use Bun. Do not use npm, pnpm, or Yarn.
- Run `bun install --frozen-lockfile` after dependency changes.
- Run `bun run format` after editing supported files.
- Before handing off, run `bun run format:check`, `bun run lint`, `bun run typecheck`, and `bun run build`.
- Oxfmt does not format `.astro` files. Keep those files consistent with nearby code and rely on `astro check` for diagnostics.

## Working rules

- Read the affected component and its callers before changing behavior.
- Preserve unrelated working-tree changes and keep diffs narrowly scoped.
- Reuse existing components and data structures before adding helpers or dependencies.
- Keep portfolio content in `src/lib/data.ts`; keep pages focused on composition.
- Keep blog posts in `src/content/blog` and conform their frontmatter to `src/content.config.ts`.
- Do not edit generated `.astro/` or `dist/` files.

## TypeScript and React

- Keep strict TypeScript green. Do not add `any`, `@ts-ignore`, non-null assertions, or unsafe casts to bypass errors.
- Narrow nullable and indexed values before use, and omit optional properties instead of assigning `undefined`.
- Prefer inferred local types; add explicit types at component props, shared data, and external boundaries.
- Keep React components focused, preserve hook ordering, and clean up browser observers and event listeners.
- Preserve accessibility: semantic HTML, keyboard behavior, labels, alt text, and reduced-motion handling.

## Styling

- Prefer Tailwind utilities and existing CSS variables over new one-off CSS.
- Check both light and dark themes and narrow mobile widths for visual changes.
- Avoid utilities that force overflow, especially fixed widths and `whitespace-nowrap`, unless verified on small screens.
