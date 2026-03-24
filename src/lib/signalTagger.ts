export const SIGNAL_TAGS = [
  'Recognition',
  'Missed Credit',
  'Constructive Feedback',
  'Manager Signal',
  'Org / Political Signal',
  'Personal Milestone',
] as const;

export type SignalTag = typeof SIGNAL_TAGS[number];

const KEYWORDS: Record<SignalTag, string[]> = {
  'Recognition': ['mentioned by name', 'credited', 'shoutout', 'acknowledged', 'praised', 'thanked', 'recognized', 'positive feedback', 'called out', 'highlighted', 'referenced my work', 'cited my', 'brought up my'],
  'Missed Credit': ['picked up by someone else', 'without credit', 'without attribution', 'took credit', 'claimed my', 'presented as their own', 'not credited', 'went unacknowledged', 'my idea', "wasn't credited", 'no mention of me'],
  'Constructive Feedback': ['feedback', 'told to', 'needs improvement', 'work on', 'develop', 'executive presence', 'more strategic', 'too tactical', 'coaching', 'areas for growth', 'improve', 'suggestion', 'developmental'],
  'Manager Signal': ['manager', '1:1', 'one on one', 'my boss', 'skipped', 'shorter than usual', "didn't follow up", 'changed tone', 'less responsive', 'more responsive', 'pulled me in', 'left me out', 'direct manager', 'reporting to'],
  'Org / Political Signal': ['reorg', 'restructure', 'headcount', 'budget', 'layoff', 'team changes', 'new leadership', 'stakeholder', 'politics', 'org', 'leadership decision', 'company direction', 'priorities shifted', 'strategy changed', 'department'],
  'Personal Milestone': ['first time', 'first cross-functional', 'first roadmap', 'stretch assignment', 'led for the first time', 'took on', 'new responsibility', 'promoted', 'stepped up', 'outside my role', 'beyond my scope'],
};

export function autoTag(text: string): SignalTag {
  const lower = text.toLowerCase();
  let bestTag: SignalTag = 'Personal Milestone';
  let bestScore = 0;

  for (const [tag, keywords] of Object.entries(KEYWORDS) as [SignalTag, string[]][]) {
    const score = keywords.filter(kw => lower.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      bestTag = tag;
    }
  }

  return bestTag;
}
