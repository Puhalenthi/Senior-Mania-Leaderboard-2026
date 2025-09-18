import React from 'react';

interface Row { id: string; name: string; points: number; }

export function LeaderboardTable({ teams, offset = 0 }: { teams: Row[]; offset?: number }) {
  return (
    <div className="overflow-hidden rounded border border-slate-800">
      <table className="w-full text-sm">
        <thead className="bg-slate-800/40 text-slate-300 uppercase text-xs tracking-wide">
          <tr>
            <th className="py-2 px-3 text-left">Rank</th>
            <th className="py-2 px-3 text-left">Team</th>
            <th className="py-2 px-3 text-right">Points</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {teams.map((t, i) => (
            <tr key={t.id} className="hover:bg-slate-800/30">
              <td className="py-2 px-3 font-mono w-16">#{i + 1 + offset}</td>
              <td className="py-2 px-3 font-medium">{t.name}</td>
              <td className="py-2 px-3 text-right font-semibold tabular-nums">{t.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
