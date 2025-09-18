import { getChallenges } from '@/lib/data';
import { ChallengeList } from '@/components/ChallengeList';
import { ChallengesAdminPanel } from '@/components/ChallengesAdmin';

export const dynamic = 'force-dynamic';

export default async function ChallengesPage() {
  const challenges = await getChallenges();
  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-3xl font-bold mb-2 gradient-header">Challenges</h1>
        <p className="text-slate-400 text-sm">Complete monthly and special challenges to earn points.</p>
      </header>
      <ChallengeList challenges={challenges} />
      <ChallengesAdminPanel />
    </div>
  );
}
