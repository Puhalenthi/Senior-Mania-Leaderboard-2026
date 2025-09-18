import { NextRequest, NextResponse } from 'next/server';
import { addChallenge, getChallenges } from '@/lib/data';
import { isAdmin } from '@/lib/auth';

export async function GET() {
  const challenges = await getChallenges();
  return NextResponse.json({ challenges });
}

export async function POST(req: NextRequest) {
  if(!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  if(!body?.title || !body?.description || !body?.month) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const ch = await addChallenge({ title: body.title, description: body.description, month: body.month });
  return NextResponse.json({ challenge: ch });
}
