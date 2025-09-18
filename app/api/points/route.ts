import { NextRequest, NextResponse } from 'next/server';
import { updatePoints } from '@/lib/data';
import { isAdmin } from '@/lib/auth';

export async function POST(req: NextRequest) {
  if(!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { teamId, delta } = await req.json();
  if(typeof teamId !== 'string' || typeof delta !== 'number') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
  const updated = await updatePoints(teamId, delta);
  if(!updated) return NextResponse.json({ error: 'Team not found' }, { status: 404 });
  return NextResponse.json({ team: updated });
}
