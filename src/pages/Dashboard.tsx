import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { autoTag, SIGNAL_TAGS } from '@/lib/signalTagger';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Check, CheckCircle2, Star, Lock, ChevronDown, ChevronUp, Filter, Mic } from 'lucide-react';
import { useVoiceInput } from '@/hooks/use-voice-input';
import EmptyState from '@/components/illustrations/EmptyState';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Dashboard = () => {
  const { user, signals, addSignal, updateSignal, toggleFlag } = useApp();
  const [text, setText] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [showContext, setShowContext] = useState(false);
  const [meeting, setMeeting] = useState('');
  const [attendees, setAttendees] = useState('');
  const [justLogged, setJustLogged] = useState(false);
  const [lastTag, setLastTag] = useState('');
  const [showFlaggedOnly, setShowFlaggedOnly] = useState(false);
  const { supported: voiceSupported, listening, toggle: toggleVoice } = useVoiceInput((transcript) => {
    setText(prev => prev ? `${prev} ${transcript}`.slice(0, 500) : transcript.slice(0, 500));
  });

  const handleSubmit = () => {
    const tag = autoTag(text);
    setLastTag(tag);
    const context = (meeting || attendees) ? { meeting, attendees } : undefined;
    addSignal({ text, date, tag, flagged: false, context });
    setText('');
    setMeeting('');
    setAttendees('');
    setShowContext(false);
    setJustLogged(true);
    setTimeout(() => setJustLogged(false), 2000);
  };

  const signalCount = signals.length;
  const checklist = [
    { label: 'Tell us where you are', done: !!user.careerStage },
    { label: 'Log your first signal', done: signalCount >= 1 },
    { label: 'Log 2 more signals to unlock your first insight', done: signalCount >= 3 },
    { label: 'Try a coaching session', done: false, comingSoon: true },
  ];

  const showInsight = signalCount >= 3;
  const displayedSignals = showFlaggedOnly ? signals.filter(s => s.flagged) : signals;

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full px-8 md:px-16 lg:px-24 py-10 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-serif text-navy mb-1">
            {user.firstName ? `Welcome back, ${user.firstName}` : 'Your Dashboard'}
          </h1>
          <p className="text-muted-foreground text-sm">Your signal record at a glance.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column: Checklist + Signal Form */}
          <div className="space-y-8">
            {/* Checklist (OB-06) */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="text-lg font-serif text-navy mb-4">Getting started</h2>
              <div className="space-y-3">
                {checklist.map(item => (
                  <div key={item.label} className="flex items-center gap-3">
                    {item.done ? (
                      <CheckCircle2 className="w-5 h-5 text-navy flex-shrink-0" />
                    ) : item.comingSoon ? (
                      <Lock className="w-5 h-5 text-muted-foreground/40 flex-shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-border flex-shrink-0" />
                    )}
                    <span className={`text-sm ${item.done ? 'text-foreground' : item.comingSoon ? 'text-muted-foreground/40' : 'text-muted-foreground'}`}>
                      {item.label}
                      {item.comingSoon && (
                        <Badge variant="outline" className="ml-2 text-xs border-border text-muted-foreground/40">
                          Coming soon
                        </Badge>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Signal Form (SC-01) */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="text-lg font-serif text-navy mb-4">Log a signal</h2>
              {justLogged ? (
                <div className="text-center py-4 animate-fade-in">
                  <Check className="w-6 h-6 text-navy mx-auto mb-2" />
                  <p className="font-medium text-navy">Logged. ✓</p>
                  <Badge variant="secondary" className="bg-rose-soft text-navy border-0 mt-2">{lastTag}</Badge>
                </div>
              ) : (
                <div className="space-y-4">
                  <Textarea
                    value={text}
                    onChange={e => setText(e.target.value.slice(0, 500))}
                    placeholder="What happened?"
                    className="rounded-xl min-h-[100px]"
                  />
                  <div className="flex items-center justify-between">
                    <Input
                      type="date"
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      className="rounded-xl w-40"
                    />
                    <span className="text-xs text-muted-foreground">{text.length}/500</span>
                  </div>
                  {/* Optional context (SC-06) */}
                  <button
                    onClick={() => setShowContext(!showContext)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showContext ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    Add context (optional)
                  </button>
                  {showContext && (
                    <div className="grid grid-cols-2 gap-3 animate-fade-in">
                      <Input
                        value={meeting}
                        onChange={e => setMeeting(e.target.value)}
                        placeholder="Meeting name"
                        className="rounded-xl text-sm"
                      />
                      <Input
                        value={attendees}
                        onChange={e => setAttendees(e.target.value)}
                        placeholder="Attendees"
                        className="rounded-xl text-sm"
                      />
                    </div>
                  )}
                  <Button
                    onClick={handleSubmit}
                    disabled={!text.trim()}
                    className="w-full bg-navy hover:bg-navy-light text-primary-foreground rounded-xl py-5"
                  >
                    Log signal
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Insight + Timeline */}
          <div className="space-y-8">
            {/* Insight Card (SC-03) */}
            {showInsight && (
              <div className="bg-gradient-to-br from-rose-soft to-blush-light rounded-2xl p-6 border border-blush/20 animate-fade-in">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary-foreground text-xs font-bold">✦</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-navy mb-1">Pattern detected</h3>
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
                        You've logged {signalCount} signals so far. As patterns emerge, you'll see personalized insights here — 
                        themes in your experiences, and prompts to help you reflect and act.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Signal Timeline (SC-04) */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-serif text-navy">Your signals</h2>
                <button
                  onClick={() => setShowFlaggedOnly(!showFlaggedOnly)}
                  className={`flex items-center gap-1.5 text-xs transition-colors ${
                    showFlaggedOnly ? 'text-navy font-medium' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Filter className="w-3.5 h-3.5" />
                  {showFlaggedOnly ? 'Showing flagged' : 'Filter flagged'}
                </button>
              </div>

              {displayedSignals.length === 0 ? (
                <EmptyState
                  title={showFlaggedOnly ? 'No flagged signals' : 'No signals yet'}
                  description={showFlaggedOnly ? 'Flag signals you want to revisit for reviews.' : 'Log your first signal above to start building your record.'}
                />
              ) : (
                <div className="space-y-3">
                  {displayedSignals.map(signal => (
                    <div key={signal.id} className="bg-card rounded-xl border border-border p-5 transition-colors hover:border-blush/40">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground line-clamp-2 mb-2">{signal.text}</p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs text-muted-foreground">{signal.date}</span>
                            {/* Tag with override (SC-02) */}
                            <Select
                              value={signal.tag}
                              onValueChange={val => updateSignal(signal.id, { tag: val })}
                            >
                              <SelectTrigger className="h-auto p-0 border-0 shadow-none w-auto">
                                <Badge variant="secondary" className="bg-rose-soft text-navy border-0 cursor-pointer text-xs">
                                  {signal.tag}
                                </Badge>
                              </SelectTrigger>
                              <SelectContent>
                                {SIGNAL_TAGS.map(t => (
                                  <SelectItem key={t} value={t}>{t}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {signal.context?.meeting && (
                              <span className="text-xs text-muted-foreground">📍 {signal.context.meeting}</span>
                            )}
                            {signal.context?.attendees && (
                              <span className="text-xs text-muted-foreground">👥 {signal.context.attendees}</span>
                            )}
                          </div>
                        </div>
                        {/* Flag (SC-05) */}
                        <button
                          onClick={() => toggleFlag(signal.id)}
                          className="flex-shrink-0 p-1 transition-colors"
                        >
                          <Star
                            className={`w-4 h-4 ${signal.flagged ? 'fill-navy text-navy' : 'text-muted-foreground/30 hover:text-muted-foreground'}`}
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
