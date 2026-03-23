import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Check, Edit2, RotateCcw } from 'lucide-react';

const CAREER_STAGES = [
  'Aspiring PM', 'Associate / Junior PM', 'Product Manager',
  'Senior PM', 'Group PM / Director', 'VP of Product / CPO',
];

const GOALS = [
  'Getting promoted', 'Building executive presence', 'Navigating stakeholder dynamics',
  'Transitioning into product', 'Getting better at strategy', 'Documenting my impact',
];

const Profile = () => {
  const { user, signals, setUser, resetToDemo } = useApp();
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [careerStage, setCareerStage] = useState(user.careerStage);
  const [goals, setGoals] = useState<string[]>(user.goals);

  const save = () => {
    setUser({ firstName, careerStage, goals });
    setEditing(false);
  };

  const toggleGoal = (g: string) => {
    setGoals(prev =>
      prev.includes(g) ? prev.filter(x => x !== g) : prev.length < 2 ? [...prev, g] : prev
    );
  };

  const firstSignal = signals[signals.length - 1];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-10 max-w-2xl">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-serif text-navy">Your Profile</h1>
          {!editing && (
            <Button variant="ghost" onClick={() => setEditing(true)} className="text-muted-foreground">
              <Edit2 className="w-4 h-4 mr-1" /> Edit
            </Button>
          )}
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 mb-8">
          <div className="space-y-6">
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider">Name</label>
              {editing ? (
                <Input value={firstName} onChange={e => setFirstName(e.target.value)} className="mt-1 rounded-xl" />
              ) : (
                <p className="text-foreground font-medium mt-1">{user.firstName || '—'}</p>
              )}
            </div>
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider">Career Stage</label>
              {editing ? (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {CAREER_STAGES.map(s => (
                    <button
                      key={s}
                      onClick={() => setCareerStage(s)}
                      className={`px-3 py-2 rounded-xl text-sm text-left border transition-colors ${
                        careerStage === s ? 'border-navy bg-navy text-primary-foreground' : 'border-border bg-card text-foreground hover:border-blush'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-foreground font-medium mt-1">{user.careerStage || '—'}</p>
              )}
            </div>
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider">Focus Areas</label>
              {editing ? (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {GOALS.map(g => (
                    <button
                      key={g}
                      onClick={() => toggleGoal(g)}
                      className={`px-3 py-2 rounded-xl text-sm text-left border transition-colors ${
                        goals.includes(g) ? 'border-navy bg-navy text-primary-foreground' : 'border-border bg-card text-foreground hover:border-blush'
                      }`}
                    >
                      {goals.includes(g) && <Check className="inline w-3 h-3 mr-1" />}{g}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex gap-2 mt-1 flex-wrap">
                  {user.goals.length ? user.goals.map(g => (
                    <Badge key={g} variant="secondary" className="bg-rose-soft text-navy border-0">{g}</Badge>
                  )) : <span className="text-muted-foreground">—</span>}
                </div>
              )}
            </div>
          </div>
          {editing && (
            <div className="flex gap-3 mt-6">
              <Button onClick={save} className="bg-navy hover:bg-navy-light text-primary-foreground rounded-xl">Save</Button>
              <Button variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
            </div>
          )}
        </div>

        {/* First Signal */}
        {firstSignal && (
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="text-lg font-serif text-navy mb-4">Your first signal</h2>
            <p className="text-sm text-foreground italic mb-3">"{firstSignal.text}"</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{firstSignal.date}</span>
              <Badge variant="secondary" className="bg-rose-soft text-navy border-0 text-xs">{firstSignal.tag}</Badge>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
