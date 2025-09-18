import { promises as fs } from 'fs';
import path from 'path';

export interface Team { id: string; name: string; points: number; }
export interface Challenge { id: string; title: string; description: string; month: string; createdAt: string; }

const dataDir = path.join(process.cwd(), 'data');
const teamsFile = path.join(dataDir, 'teams.json');
const challengesFile = path.join(dataDir, 'challenges.json');

async function ensureSeed() {
  try { await fs.mkdir(dataDir, { recursive: true }); } catch {}
  try { await fs.access(teamsFile); } catch { await fs.writeFile(teamsFile, JSON.stringify(defaultTeams, null, 2)); }
  try { await fs.access(challengesFile); } catch { await fs.writeFile(challengesFile, JSON.stringify(defaultChallenges, null, 2)); }
}

export async function getTeams(): Promise<Team[]> {
  await ensureSeed();
  const raw = await fs.readFile(teamsFile, 'utf8');
  const teams: Team[] = JSON.parse(raw);
  return teams.sort((a,b)=> b.points - a.points);
}

export async function getChallenges(): Promise<Challenge[]> {
  await ensureSeed();
  const raw = await fs.readFile(challengesFile, 'utf8');
  const challenges: Challenge[] = JSON.parse(raw);
  return challenges.sort((a,b)=> new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

// Placeholder default seed data
const defaultTeams: Team[] = [
  { id: 'tigers', name: 'Tigers', points: 120 },
  { id: 'eagles', name: 'Eagles', points: 110 },
  { id: 'wolves', name: 'Wolves', points: 95 },
  { id: 'sharks', name: 'Sharks', points: 80 },
  { id: 'lions', name: 'Lions', points: 75 }
];

const defaultChallenges: Challenge[] = [
  { id: 'sep-kickoff', title: 'September Kickoff', description: 'Welcome challenge! Earn points by joining the kickoff meeting.', month: 'September', createdAt: new Date().toISOString() }
];

export async function addChallenge(ch: Omit<Challenge,'id'|'createdAt'> & { id?: string }): Promise<Challenge> {
  const challenges = await getChallenges();
  const newChallenge: Challenge = { id: ch.id || slugify(ch.title), createdAt: new Date().toISOString(), ...ch };
  challenges.push(newChallenge);
  await persist(challengesFile, challenges);
  return newChallenge;
}

export async function updatePoints(teamId: string, delta: number): Promise<Team | null> {
  const teams = await getTeams();
  const idx = teams.findIndex(t=> t.id === teamId);
  if(idx === -1) return null;
  teams[idx].points += delta;
  await persist(teamsFile, teams);
  return teams[idx];
}

async function persist(file: string, data: unknown) {
  try {
    await fs.writeFile(file, JSON.stringify(data, null, 2));
  } catch (e) {
    console.warn('Failed to persist data (likely read-only env):', e);
  }
}

function slugify(input: string) {
  return input.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'').slice(0,40);
}
