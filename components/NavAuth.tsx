"use client";
import React, { useState, useEffect } from 'react';

export function NavAuth() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // naive check: call /api/teams to warm cookie? Could add /api/me route later.
    fetch('/api/challenges').then(()=>{
      // If we had a dedicated route we could set state. For now rely on cookie existence via document.cookie.
      setIsAdmin(document.cookie.includes('sm_admin='));
    });
  }, []);

  async function login(formData: FormData) {
    setLoading(true); setError(null);
    const res = await fetch('/api/login', { method: 'POST', body: JSON.stringify({
      username: formData.get('username'),
      password: formData.get('password')
    }), headers: { 'Content-Type': 'application/json' } });
    setLoading(false);
    if(res.ok){
      setIsAdmin(true); setShow(false);
    } else {
      const j = await res.json().catch(()=>({}));
      setError(j.error || 'Login failed');
    }
  }

  async function logout() {
    await fetch('/api/logout', { method: 'POST' });
    setIsAdmin(false);
  }

  if(isAdmin === null) return <span className="text-xs text-slate-500">...</span>;

  return (
    <div className="relative">
      {isAdmin ? (
        <button onClick={logout} className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold">Logout Admin</button>
      ) : (
        <button onClick={()=>setShow(s=>!s)} className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold">Admin Login</button>
      )}
      {show && !isAdmin && (
        <form onSubmit={(e)=>{e.preventDefault(); login(new FormData(e.currentTarget));}} className="absolute right-0 mt-2 w-60 p-4 rounded bg-slate-900 border border-slate-700 space-y-2 shadow-xl z-50">
          <div className="text-sm font-semibold">Admin Login</div>
          <input name="username" required placeholder="Username" className="w-full px-2 py-1 rounded bg-slate-800 border border-slate-700 focus:outline-none" />
            <input name="password" type="password" required placeholder="Password" className="w-full px-2 py-1 rounded bg-slate-800 border border-slate-700 focus:outline-none" />
          {error && <div className="text-xs text-red-400">{error}</div>}
          <div className="flex gap-2 justify-end pt-1">
            <button type="button" onClick={()=>setShow(false)} className="text-xs text-slate-400 hover:text-slate-200">Cancel</button>
            <button disabled={loading} className="text-xs px-2 py-1 rounded bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50">{loading? '...' : 'Login'}</button>
          </div>
        </form>
      )}
    </div>
  );
}
