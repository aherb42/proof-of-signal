import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { autoTag } from '@/lib/signalTagger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

const CAREER_STAGES = [
  'Aspiring PM',
  'Associate / Junior PM',
  'Product Manager',
  'Senior PM',
  'Group PM / Director',
  'VP of Product / CPO',
];

const GOALS = [
  'Getting promoted',
  'Building executive presence',
  'Navigating stakeholder dynamics',
  'Transitioning into product',
  'Getting better at strategy',
  'Documenting my impact',
];

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const { user, setUser, addSignal } = useApp();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user.firstName);
  const [careerStage, setCareerStage] = useState(user.careerStage);
  const [goals, setGoals] = useState<string[]>(user.goals);
  const [signalText, setSignalText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [assignedTag, setAssignedTag] = useState('');

  const next = () => setStep(s => s + 1);
  const prev = () => setStep(s => s - 1);

  const toggleGoal = (g: string) => {
    setGoals(prev =>
      prev.includes(g) ? prev.filter(x => x !== g) : prev.length < 2 ? [...prev, g] : prev
    );
  };

  const submitSignal = () => {
    const tag = autoTag(signalText);
    setAssignedTag(tag);
    addSignal({ text: signalText, date: new Date().toISOString().split('T')[0], tag, flagged: false });
    setUser({ firstName, careerStage, goals, onboardingComplete: true });
    setSubmitted(true);
  };

  const canProceed = [
    true, // welcome
    firstName.trim() && careerStage, // name + career
    goals.length > 0, // goals
    true, // example (read only)
    signalText.trim().length > 0, // first signal
  ];

  const steps = [
    // OB-01: Welcome
    <div key="welcome" className="flex flex-col items-center text-center animate-fade-in">
      <div className="w-24 h-24 rounded-full bg-rose-soft flex items-center justify-center mb-8">
        <div className="w-6 h-6 rounded-full bg-blush" />
      </div>
      <h1 className="text-3xl md:text-4xl font-serif text-navy mb-4">Proof of Signal</h1>
      <p className="text-lg text-muted-foreground mb-10">Your career, on record.</p>
      <Button onClick={next} className="bg-navy hover:bg-navy-light text-primary-foreground px-8 py-6 text-base rounded-xl">
        Get started <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </div>,

    // OB-02: Name & Career Stage
    <div key="name" className="max-w-md w-full animate-fade-in">
      <h2 className="text-2xl font-serif text-navy mb-2">Let's start with you</h2>
      <p className="text-sm text-muted-foreground mb-8">
        This helps us surface what's most relevant to you. You can change it anytime.
      </p>
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">First name</label>
          <Input
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            placeholder="Your first name"
            className="rounded-xl"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Where are you in your career?</label>
          <div className="grid grid-cols-2 gap-2">
            {CAREER_STAGES.map(s => (
              <button
                key={s}
                onClick={() => setCareerStage(s)}
                className={`px-4 py-3 rounded-xl text-sm text-left border transition-colors ${
                  careerStage === s
                    ? 'border-navy bg-navy text-primary-foreground'
                    : 'border-border bg-card text-foreground hover:border-blush'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>,

    // OB-03: Goals
    <div key="goals" className="max-w-md w-full animate-fade-in">
      <h2 className="text-2xl font-serif text-navy mb-2">What's most on your mind?</h2>
      <p className="text-sm text-muted-foreground mb-8">
        Pick up to 2. Not a commitment — just a starting point.
      </p>
      <div className="grid grid-cols-2 gap-2">
        {GOALS.map(g => (
          <button
            key={g}
            onClick={() => toggleGoal(g)}
            className={`px-4 py-3 rounded-xl text-sm text-left border transition-colors ${
              goals.includes(g)
                ? 'border-navy bg-navy text-primary-foreground'
                : 'border-border bg-card text-foreground hover:border-blush'
            }`}
          >
            {goals.includes(g) && <Check className="inline w-3.5 h-3.5 mr-1.5" />}
            {g}
          </button>
        ))}
      </div>
    </div>,

    // OB-04: Signal Example
    <div key="example" className="max-w-md w-full animate-fade-in">
      <h2 className="text-2xl font-serif text-navy mb-2">This is what a signal looks like</h2>
      <p className="text-sm text-muted-foreground mb-8">
        Signals are moments worth remembering. Here's a real one:
      </p>
      <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
        <p className="text-foreground leading-relaxed mb-4 italic">
          "Felt like my idea in the roadmap meeting got picked up by someone else without credit. Wasn't sure if I imagined it."
        </p>
        <Badge variant="secondary" className="bg-rose-soft text-navy border-0">
          Missed Credit
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground mt-6 text-center">
        The product reads what you write and tags it — so patterns become visible over time.
      </p>
    </div>,

    // OB-05: First Signal
    <div key="signal" className="max-w-md w-full animate-fade-in">
      {!submitted ? (
        <>
          <h2 className="text-2xl font-serif text-navy mb-2">Log your first signal</h2>
          <p className="text-sm text-muted-foreground mb-8">
            Something worth remembering from your last meeting or interaction.
          </p>
          <Textarea
            value={signalText}
            onChange={e => setSignalText(e.target.value.slice(0, 500))}
            placeholder="What happened?"
            className="rounded-xl min-h-[120px] mb-2"
          />
          <p className="text-xs text-muted-foreground mb-6 text-right">{signalText.length}/500</p>
          <Button
            onClick={submitSignal}
            disabled={!signalText.trim()}
            className="w-full bg-navy hover:bg-navy-light text-primary-foreground py-6 rounded-xl"
          >
            Log signal
          </Button>
        </>
      ) : (
        <div className="text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-rose-soft flex items-center justify-center mx-auto mb-6">
            <Check className="w-7 h-7 text-navy" />
          </div>
          <p className="text-xl font-serif text-navy mb-3">Logged. ✓</p>
          <Badge variant="secondary" className="bg-rose-soft text-navy border-0 mb-8">
            {assignedTag}
          </Badge>
          <Button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-navy hover:bg-navy-light text-primary-foreground py-6 rounded-xl"
          >
            Go to your dashboard <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      )}
    </div>,
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress */}
      <div className="px-6 pt-6">
        <div className="max-w-md mx-auto flex gap-1.5">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= step ? 'bg-navy' : 'bg-border'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        {steps[step]}
      </div>

      {/* Navigation */}
      {step > 0 && step < steps.length - 1 && (
        <div className="px-6 pb-8">
          <div className="max-w-md mx-auto flex justify-between">
            <Button variant="ghost" onClick={prev} className="text-muted-foreground">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            {step < 4 && (
              <Button
                onClick={next}
                disabled={!canProceed[step]}
                className="bg-navy hover:bg-navy-light text-primary-foreground rounded-xl px-6"
              >
                Continue <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      )}
      {step === 4 && !submitted && (
        <div className="px-6 pb-8">
          <div className="max-w-md mx-auto">
            <Button variant="ghost" onClick={prev} className="text-muted-foreground">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
