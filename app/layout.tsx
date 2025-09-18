import './globals.css';
import React from 'react';
import Link from 'next/link';
import { NavAuth } from '@/components/NavAuth';

export const metadata = {
  title: 'Senior Mania 2026',
  description: 'Class of 2026 Leaderboard & Challenges'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-slate-800 sticky top-0 z-40 backdrop-blur bg-slate-950/70">
          <nav className="max-w-6xl mx-auto flex gap-6 items-center p-4 text-sm font-medium">
            <span className="text-lg font-extrabold gradient-header">Senior Mania 2026</span>
            <Link href="/" className="hover:text-indigo-400">Leaderboard</Link>
            <Link href="/challenges" className="hover:text-indigo-400">Challenges</Link>
            <Link href="/team" className="hover:text-indigo-400">Meet the Team</Link>
            <Link href="/events" className="hover:text-indigo-400">Upcoming Event</Link>
            <div className="ml-auto"><NavAuth /></div>
          </nav>
        </header>
        <main className="max-w-6xl mx-auto p-4 pb-24">{children}</main>
        <footer className="text-center text-xs text-slate-500 py-8">&copy; {new Date().getFullYear()} Senior Class Council 2026</footer>
      </body>
    </html>
  );
}
