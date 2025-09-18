import React from 'react';

interface Challenge { id: string; title: string; description: string; month: string; createdAt: string; }

export function ChallengeList({ challenges }: { challenges: Challenge[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {challenges.map(c => (
        <div key={c.id} className="group relative border border-slate-800 rounded-lg p-4 bg-slate-900/50 hover:bg-slate-900 transition-colors overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500 opacity-60" />
          <h3 className="font-semibold mb-2 text-indigo-300 group-hover:text-indigo-200 transition-colors">{c.title}</h3>
          <p className="text-sm text-slate-300 whitespace-pre-wrap line-clamp-5">{c.description}</p>
          <div className="mt-3 text-xs text-slate-500 flex items-center justify-between">
            <span>{c.month}</span>
            <time dateTime={c.createdAt}>{new Date(c.createdAt).toLocaleDateString(undefined,{ month:'short', day:'numeric'})}</time>
          </div>
        </div>
      ))}
    </div>
  );
}
