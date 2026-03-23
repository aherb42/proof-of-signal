export const SIGNAL_TAGS = [
  'Missed Credit',
  'Visibility Win',
  'Stakeholder Friction',
  'Leadership Moment',
  'Decision Influence',
  'General Signal',
] as const;

export type SignalTag = typeof SIGNAL_TAGS[number];

const KEYWORDS: Record<SignalTag, string[]> = {
  'Missed Credit': ['credit', 'stole', 'took my idea', 'picked up', 'without credit', 'claimed', 'overlooked', 'ignored'],
  'Visibility Win': ['recognized', 'shoutout', 'praised', 'visibility', 'spotlight', 'acknowledged', 'noticed', 'called out positively'],
  'Stakeholder Friction': ['pushback', 'disagreed', 'conflict', 'tension', 'friction', 'blocked', 'resistant', 'difficult conversation'],
  'Leadership Moment': ['led', 'stepped up', 'facilitated', 'mentored', 'coached', 'took charge', 'initiative', 'drove'],
  'Decision Influence': ['decision', 'influenced', 'persuaded', 'changed direction', 'pivoted', 'convinced', 'shaped', 'strategy'],
  'General Signal': [],
};

export function autoTag(text: string): SignalTag {
  const lower = text.toLowerCase();
  let bestTag: SignalTag = 'General Signal';
  let bestScore = 0;

  for (const [tag, keywords] of Object.entries(KEYWORDS) as [SignalTag, string[]][]) {
    if (tag === 'General Signal') continue;
    const score = keywords.filter(kw => lower.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      bestTag = tag;
    }
  }

  return bestTag;
}
