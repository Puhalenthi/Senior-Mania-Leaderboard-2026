# Senior Mania Leaderboard 2026

Class of 2026 Senior Mania site – animated leaderboard, challenges, and lightweight admin panel.

## Features

- Animated podium for top 3 teams (rising animation) with trophy emojis
- Full leaderboard table for remaining teams
- Challenges grid (month + created date) – static JSON persistence for now
- Admin login (single shared credential) to:
	- Create challenges
	- Add/Subtract points from teams
- Simple JSON data layer (filesystem). Easy to swap for a DB later.
- Tailwind CSS styling with custom gold/silver/bronze theme accents

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (podium animation)
- JWT (cookie) for quick admin session

## Getting Started

### 1. Install dependencies

```fish
npm install
```

### 2. Configure environment

Create a `.env.local` based on `.env.example`:

```fish
cp .env.example .env.local
```

Update values (choose strong secrets):

```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=superStrongPassword123!
JWT_SECRET=replace-with-random-long-secret
```

### 3. Run dev server

```fish
npm run dev
```

Visit http://localhost:3000

### 4. Admin Login

Use the "Admin Login" button in the navbar. After logging in you can:

- Create a challenge (Challenges page – bottom admin panel)
- Add points to teams

### 5. Data Persistence Note

Data is stored in `data/teams.json` and `data/challenges.json`. In serverless (Vercel) writes may not persist across deployments—consider moving to a database (see Next Steps) for production.

## Project Structure

```
app/                # Next.js routes (App Router)
	api/              # API route handlers
	page.tsx          # Leaderboard page
	challenges/       # Challenges page
components/         # Reusable UI (Podium, tables, auth)
lib/                # auth + data helpers
data/               # JSON seed + mutable data (local dev)
```

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |

## Deployment (Vercel)

1. Push repo to GitHub
2. Import into Vercel
3. Add Environment Variables (same as `.env.local`)
4. Deploy

Because we write to JSON files, point adjustments & new challenges won't persist between deployments. For durability add a database.

## Security Notes

- Single shared admin credential: rotate the password if leaked.
- JWT expires in 12h – adjust in `lib/auth.ts`.
- For stronger security add rate limiting and a dedicated /api/me endpoint.

## Next Steps / Enhancements

- Switch JSON storage to a database (SQLite/PlanetScale/Postgres or even Turso)
- Add optimistic UI updates for challenge + points actions
- Display history / audit log of point changes
- Sorting & filtering challenges (by month, newest, etc.)
- Add images or attachments to challenges (object storage)
- Add pagination if team count grows large
- Add /api/me route for reliable admin detection
- Protect admin forms server-side with server actions + revalidation
- Add unit tests & e2e (Playwright) for admin flows
- Add light/dark toggle

## License

MIT

---

Feel free to request additional features or design tweaks! 🎉

### Additional Enhancement Ideas

Short list (copy into issues if desired):

- Add /api/me endpoint & client hook for reliable admin state
- Server Actions for challenge creation & point updates (atomic + revalidate cache)
- Edge runtime for faster global reads
- Replace JSON with SQLite (Turso) or Postgres (Neon / Supabase)
- Animated sorting transitions on point changes
- Add team logos / avatars
- Add month filter & search box for challenges
- Export leaderboard as CSV
- Public read-only API endpoints with rate limiting
- Add theming (school colors) + dark/light toggle

