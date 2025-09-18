import { getTeams } from '@/lib/data';
import { Podium } from '@/components/Podium';
import { LeaderboardTable } from '@/components/LeaderboardTable';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function LeaderboardPage() {
  const teams = await getTeams();
  const top3 = teams.slice(0,3);
  const rest = teams.slice(3);
  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-3xl font-bold gradient-header">Leaderboard</h1>
        <p className="text-slate-400 text-sm mt-2">Live rankings for the Class of 2026 Senior Mania.</p>
      </header>
      <section>
        <Podium teams={top3} />
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-3">All Teams</h2>
        <LeaderboardTable teams={rest} offset={3} />
      </section>
      <p className="text-sm text-slate-500">See current <Link href="/challenges" className="text-indigo-400 hover:underline">Challenges</Link> to earn more points.</p>
    </div>
  );
}
