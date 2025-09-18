"use client";
import React, { useState, useEffect } from 'react';

interface Challenge { id: string; title: string; description: string; month: string; createdAt: string; }
interface Team { id: string; name: string; points: number; }

export function ChallengesAdminPanel() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [teams, setTeams] = useState<Team[]>([]);
  const [addingPoints, setAddingPoints] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(()=>{
    setIsAdmin(document.cookie.includes('sm_admin='));
    fetch('/api/teams').then(r=>r.json()).then(d=> setTeams(d.teams || []));
  }, []);

  if(!isAdmin) return null;

  async function submitChallenge(fd: FormData) {
    setSubmitting(true); setError(null); setSuccess(null);
    const payload = {
      title: fd.get('title'),
      description: fd.get('description'),
      month: fd.get('month')
    };
    const res = await fetch('/api/challenges', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    setSubmitting(false);
    if(res.ok){
      setSuccess('Challenge created');
      (document.getElementById('challenge-form') as HTMLFormElement)?.reset();
    } else {
      const j = await res.json().catch(()=>({}));
      setError(j.error || 'Failed');
    }
  }

  async function addPoints(fd: FormData) {
    const teamId = fd.get('teamId');
    const delta = Number(fd.get('delta'));
    if(!teamId || Number.isNaN(delta)) return;
    const res = await fetch('/api/points', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ teamId, delta }) });
    if(res.ok){
      setSuccess('Points updated');
      fetch('/api/teams').then(r=>r.json()).then(d=> setTeams(d.teams || []));
    } else {
      const j = await res.json().catch(()=>({}));
      setError(j.error || 'Failed');
    }
  }

  return (
    <div className="mt-10 space-y-10">
      <div>
        <h2 className="text-xl font-bold mb-3">Create Challenge</h2>
  <form id="challenge-form" onSubmit={(e)=>{ e.preventDefault(); submitChallenge(new FormData(e.currentTarget)); }} className="space-y-3 max-w-lg">
          <input name="title" required placeholder="Title" className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700" />
          <textarea name="description" required placeholder="Description" className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 h-32" />
          <input name="month" required placeholder="Month (e.g. September)" className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700" />
          <button disabled={submitting} className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 font-semibold text-sm disabled:opacity-50">{submitting? 'Creating...' : 'Create'}</button>
        </form>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-3 flex items-center gap-4">Add Points
          <button type="button" onClick={()=> setAddingPoints(a=>!a)} className="text-xs px-2 py-1 rounded bg-slate-700 hover:bg-slate-600">{addingPoints? 'Hide' : 'Show'}</button>
        </h2>
        {addingPoints && (
          <form onSubmit={(e)=>{ e.preventDefault(); addPoints(new FormData(e.currentTarget)); }} className="flex flex-wrap gap-3 items-end">
            <label className="flex flex-col text-xs gap-1">
              <span className="uppercase tracking-wide text-slate-400">Team</span>
              <select name="teamId" className="px-2 py-1 rounded bg-slate-800 border border-slate-700">
                {teams.map(t=> <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </label>
            <label className="flex flex-col text-xs gap-1">
              <span className="uppercase tracking-wide text-slate-400">Delta</span>
              <input name="delta" type="number" defaultValue={5} className="px-2 py-1 rounded bg-slate-800 border border-slate-700 w-24" />
            </label>
            <button className="px-3 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-sm font-semibold">Apply</button>
          </form>
        )}
      </div>
      {(error || success) && (
        <div className="text-sm">{error && <span className="text-red-400">{error}</span>} {success && <span className="text-emerald-400">{success}</span>}</div>
      )}
    </div>
  );
}
