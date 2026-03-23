import { useApp } from '@/contexts/AppContext';
import { Badge } from '@/components/ui/badge';
import EmptyState from '@/components/illustrations/EmptyState';
import { SIGNAL_TAGS } from '@/lib/signalTagger';

const Patterns = () => {
  const { signals, user } = useApp();

  const tagCounts = SIGNAL_TAGS.reduce((acc, tag) => {
    acc[tag] = signals.filter(s => s.tag === tag).length;
    return acc;
  }, {} as Record<string, number>);

  const topTags = Object.entries(tagCounts)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);

  const totalSignals = signals.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full px-8 md:px-16 lg:px-24 py-10 max-w-[1600px] mx-auto">
        <h1 className="text-3xl font-serif text-navy mb-2">Patterns</h1>
        <p className="text-muted-foreground text-sm mb-10">
          AI-powered insights based on your signals. The more you log, the clearer the picture.
        </p>

        {totalSignals < 3 ? (
          <EmptyState
            title="Not enough signals yet"
            description={`Log ${3 - totalSignals} more signal${3 - totalSignals > 1 ? 's' : ''} to unlock your first pattern insight.`}
          />
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Tag Distribution */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="text-lg font-serif text-navy mb-4">Signal themes</h2>
              <div className="space-y-3">
                {topTags.map(([tag, count]) => (
                  <div key={tag} className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-rose-soft text-navy border-0 text-xs w-36 justify-center">
                      {tag}
                    </Badge>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-navy rounded-full transition-all"
                        style={{ width: `${(count / totalSignals) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-8 text-right">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Insight */}
            <div className="bg-gradient-to-br from-rose-soft to-blush-light rounded-2xl p-6 border border-blush/20">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary-foreground text-xs font-bold">✦</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-navy mb-1">What your signals suggest</h3>
                  {user.firstName === 'Diana' ? (
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-navy">Your signals from this week</h4>
                      <p className="text-sm text-foreground leading-relaxed">
                        A pattern is emerging: you're generating recognition at the senior level (CPO, VP Design) at the same time you're noticing credit gaps at the peer level. That's worth paying attention to — especially before a promotion conversation.
                      </p>
                      <p className="text-sm text-foreground leading-relaxed font-medium">
                        Suggested next action: Flag your top 3 recognition signals and bring them to your next 1:1. The question isn't whether you've done the work — it's whether your manager has seen it.
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-foreground leading-relaxed">
                      Based on your {totalSignals} signals, your most frequent theme is <strong>{topTags[0]?.[0]}</strong>. 
                      As you continue logging, we'll surface more specific patterns — like whether certain types of moments 
                      cluster around particular meetings, stakeholders, or times of the quarter.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Flagged Review - spans full width */}
            {signals.filter(s => s.flagged).length > 0 && (
              <div className="bg-card rounded-2xl border border-border p-6 lg:col-span-2">
                <h2 className="text-lg font-serif text-navy mb-4">Flagged for review</h2>
                <div className="space-y-3">
                  {signals.filter(s => s.flagged).map(s => (
                    <div key={s.id} className="flex items-start gap-3">
                      <span className="text-xs text-muted-foreground w-20 flex-shrink-0 pt-0.5">{s.date}</span>
                      <p className="text-sm text-foreground line-clamp-1 flex-1">{s.text}</p>
                      <Badge variant="secondary" className="bg-rose-soft text-navy border-0 text-xs flex-shrink-0">
                        {s.tag}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Patterns;
