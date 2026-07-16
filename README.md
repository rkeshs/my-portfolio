# Rishikesh S — Portfolio

Personal portfolio for [Rishikesh S](https://rishikeshs.net/), built with Astro 7, React 19, Tailwind CSS 4, and Framer Motion.

![Portfolio screenshot](https://github.com/user-attachments/assets/4f2466f1-1ebe-4cbe-857c-40eccd63c384)

## Features

- Responsive single-page portfolio
- Light and dark themes
- Reduced-motion support
- Static Astro output with Vercel Analytics
- Content managed from one TypeScript file

## Requirements

- [Bun 1.3.14](https://bun.sh/)
- Node.js 22.12 or newer (required by Astro 7)

## Local development

```bash
git clone https://github.com/rkeshs/my-portfolio.git
cd my-portfolio
bun install
bun run dev
```

Open `http://localhost:4321`.

Copy `.env.example` to `.env` when you need production URL generation locally. Set `ORIGIN=https://rishikeshs.net` in the production deployment environment so Astro can generate canonical URLs correctly.

## Commands

| Command | Purpose |
| --- | --- |
| `bun run dev` | Start the development server |
| `bun run check` | Run Astro and TypeScript diagnostics |
| `bun run build` | Create the production build in `dist/` |
| `bun run preview` | Preview the production build locally |
| `bun run astro sync` | Regenerate Astro types after configuration changes |

## Update portfolio content

Edit [`src/lib/data.ts`](src/lib/data.ts) to update personal details, work experience, skills, projects, awards, and education. Replace [`public/profile.jpg`](public/profile.jpg) to update the portrait.

## Production verification

```bash
bun install --frozen-lockfile
bun run astro sync
bun run check
bun run build
```

Dependencies are pinned to exact versions in `package.json`; update `package.json` and `bun.lock` together with Bun.

## Deployment

The site builds to static files in `dist/` and can be deployed to Vercel or any static host. The canonical site URL comes from the `ORIGIN` environment variable.

## License

MIT © 2026 Rishikesh S.
