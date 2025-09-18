import { NextRequest, NextResponse } from 'next/server';
import { signSession, cookieName } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const adminUser = process.env.ADMIN_USERNAME || 'admin';
  const adminPass = process.env.ADMIN_PASSWORD || 'password';
  if(username === adminUser && password === adminPass) {
    const token = signSession(username);
    const res = NextResponse.json({ ok: true });
    res.cookies.set({ name: cookieName, value: token, httpOnly: true, path: '/', sameSite: 'lax', maxAge: 60*60*12 });
    return res;
  }
  return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 401 });
}
