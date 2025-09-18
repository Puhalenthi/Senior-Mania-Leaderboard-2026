"use client";
import { motion } from 'framer-motion';
import React from 'react';

interface PodiumProps {
  teams: { id: string; name: string; points: number }[]; // expects exactly 3
}

const tierHeights = [140, 180, 110]; // 1st, 2nd, 3rd visual heights baseline

export function Podium({ teams }: PodiumProps) {
  if (teams.length < 3) return null;
  const [first, second, third] = teams;
  const order = [second, first, third]; // visually center winner
  return (
    <div className="flex items-end justify-center gap-6 mt-6">
      {order.map((team, idx) => {
        const rank = team.id === first.id ? 1 : team.id === second.id ? 2 : 3;
        const baseHeight = rank === 1 ? tierHeights[1] : rank === 2 ? tierHeights[0] : tierHeights[2];
        return (
          <motion.div
            key={team.id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: baseHeight, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16, delay: idx * 0.15 }}
            className={`relative w-40 rounded-t flex flex-col items-center justify-end overflow-hidden shadow-lg ring-1 ring-slate-700/60 podium-rank-${rank}`}
            style={{ background: podiumGradient(rank) }}
          >
            <div className="absolute top-2 text-xs uppercase tracking-wide font-semibold drop-shadow">
              {rank === 1 ? 'Champion' : rank === 2 ? 'Second' : 'Third'}
            </div>
            <div className="p-3 text-center select-none">
              <div className="font-bold text-lg leading-tight drop-shadow-sm">{team.name}</div>
              <div className="text-sm text-slate-200/80">{team.points} pts</div>
              <div className="mt-2 text-3xl">{trophy(rank)}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function podiumGradient(rank: number) {
  switch (rank) {
    case 1:
      return 'linear-gradient(140deg,#fcd34d,#fde68a,#fbbf24)';
    case 2:
      return 'linear-gradient(140deg,#d1d5db,#f3f4f6,#9ca3af)';
    case 3:
      return 'linear-gradient(140deg,#d97706,#fbbf24,#92400e)';
    default:
      return 'linear-gradient(140deg,#6366f1,#8b5cf6)';
  }
}

function trophy(rank: number) {
  return rank === 1 ? '🏆' : rank === 2 ? '🥈' : '🥉';
}
