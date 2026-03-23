import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import HeroIllustration from '@/components/illustrations/HeroIllustration';
import FeatureIcon from '@/components/illustrations/FeatureIcons';
import AvatarSilhouettes from '@/components/illustrations/AvatarSilhouettes';
import SignalWavePattern from '@/components/illustrations/SignalWavePattern';

const features = [
  {
    type: 'capture' as const,
    title: 'Capture what matters',
    description: 'Log moments from meetings, decisions, and interactions — the ones that shape your trajectory but rarely make it into a performance review.',
  },
  {
    type: 'patterns' as const,
    title: 'See patterns emerge',
    description: 'Over time, your signals reveal themes: where you lead, where you get overlooked, and where your influence is growing.',
  },
  {
    type: 'growth' as const,
    title: 'Own your narrative',
    description: 'Walk into reviews, 1:1s, and negotiations with a record — not a feeling. Your career story, backed by evidence.',
  },
];

const testimonials = [
  {
    quote: "I used to walk into reviews with nothing but vibes. Now I have a record that speaks for me.",
    name: "Diana K.",
    role: "Senior PM",
  },
  {
    quote: "It took three signals before I saw the pattern — my ideas kept getting credited to someone else.",
    name: "Sarah A.",
    role: "Product Lead",
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 pt-20 pb-24 lg:pt-32 lg:pb-36">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <p className="text-sm font-medium tracking-widest uppercase text-blush mb-4">Proof of Signal</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-navy leading-tight mb-6">
                Your career,<br />on record.
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mb-8 leading-relaxed">
                The professional development tool for women in product management. 
                Capture signals, reveal patterns, and build the evidence your career deserves.
              </p>
              <Button
                size="lg"
                onClick={() => navigate('/onboarding')}
                className="bg-navy hover:bg-navy-light text-primary-foreground px-8 py-6 text-base rounded-xl"
              >
                Get started <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            <div className="hidden lg:flex justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <HeroIllustration />
            </div>
          </div>
        </div>
        <SignalWavePattern className="absolute bottom-0 left-0 w-full h-24" />
      </section>

      {/* Features */}
      <section className="py-24 bg-rose-soft/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-navy mb-4">How it works</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              A simple practice that compounds. Three minutes today becomes months of evidence tomorrow.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {features.map((f, i) => (
              <div key={f.type} className="text-center animate-fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="flex justify-center mb-5">
                  <FeatureIcon type={f.type} />
                </div>
                <h3 className="text-xl font-serif text-navy mb-3">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <AvatarSilhouettes />
              <p className="text-sm text-muted-foreground">Trusted by product managers building their case.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map(t => (
                <div key={t.name} className="bg-card rounded-2xl p-8 border border-border">
                  <p className="text-foreground leading-relaxed mb-6 italic">"{t.quote}"</p>
                  <div>
                    <p className="font-semibold text-navy text-sm">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy to-navy-light" />
        <div className="relative container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-primary-foreground mb-4">
            Start building your record
          </h2>
          <p className="text-primary-foreground/70 max-w-md mx-auto mb-8">
            It takes 60 seconds to log your first signal. Your future self will thank you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/onboarding')}
              className="bg-blush hover:bg-blush-light text-navy px-8 py-6 text-base rounded-xl"
            >
              Get started — it's free <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center justify-center gap-6 text-primary-foreground/60 text-sm">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> No account needed yet</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Takes 2 minutes</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
