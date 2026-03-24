/**
 * Signal tagger — classifies free-text signals into one of 6 career signal categories.
 *
 * Primary: AI-powered classification via the classify-signal edge function.
 * Fallback: keyword-frequency scoring (used when AI is unavailable).
 */

import { supabase } from '@/integrations/supabase/client';

/** The 6 allowed signal tag values. No other tags should ever be assigned. */
export const SIGNAL_TAGS = [
  'Recognition',
  'Missed Credit',
  'Constructive Feedback',
  'Manager Signal',
  'Org / Political Signal',
  'Personal Milestone',
] as const;

/** Union type of valid signal tags. */
export type SignalTag = typeof SIGNAL_TAGS[number];

/** Keyword lists used for scoring each tag category (fallback only). */
const KEYWORDS: Record<SignalTag, string[]> = {
  'Recognition': ['mentioned by name', 'credited', 'shoutout', 'acknowledged', 'praised', 'thanked', 'recognized', 'positive feedback', 'called out', 'highlighted', 'referenced my work', 'cited my', 'brought up my', 'liked', 'went well', 'presented well'],
  'Missed Credit': ['picked up by someone else', 'without credit', 'without attribution', 'took credit', 'claimed my', 'presented as their own', 'not credited', 'went unacknowledged', 'my idea', "wasn't credited", 'no mention of me'],
  'Constructive Feedback': ['feedback', 'told to', 'needs improvement', 'work on', 'develop', 'executive presence', 'more strategic', 'too tactical', 'coaching', 'areas for growth', 'improve', 'suggestion', 'developmental'],
  'Manager Signal': ['1:1', 'one on one', 'my boss', 'skipped', 'shorter than usual', "didn't follow up", 'changed tone', 'less responsive', 'more responsive', 'pulled me in', 'left me out', 'direct manager', 'reporting to'],
  'Org / Political Signal': ['reorg', 'restructure', 'headcount', 'budget', 'layoff', 'team changes', 'new leadership', 'stakeholder', 'politics', 'org', 'leadership decision', 'company direction', 'priorities shifted', 'strategy changed', 'department'],
  'Personal Milestone': ['first time', 'first cross-functional', 'first roadmap', 'stretch assignment', 'led for the first time', 'took on', 'new responsibility', 'promoted', 'stepped up', 'outside my role', 'beyond my scope'],
};

const POSITIVE_SENTIMENT = ['liked', 'praised', 'acknowledged', 'positive feedback', 'went well', 'presented well', 'thanked', 'recognized', 'credited', 'shoutout', 'highlighted'];

/**
 * Keyword-based fallback classifier.
 */
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

  if (bestTag === 'Manager Signal') {
    const hasPositive = POSITIVE_SENTIMENT.some(kw => lower.includes(kw));
    if (hasPositive) bestTag = 'Recognition';
  }

  return bestTag;
}

/**
 * AI-powered signal classifier. Falls back to keyword tagger on error.
 */
export async function classifySignal(text: string): Promise<SignalTag> {
  try {
    const { data, error } = await supabase.functions.invoke('classify-signal', {
      body: { text },
    });

    if (error) {
      console.warn('AI classification failed, using fallback:', error.message);
      return autoTag(text);
    }

    if (data?.tag && SIGNAL_TAGS.includes(data.tag)) {
      return data.tag as SignalTag;
    }

    console.warn('Unexpected AI response, using fallback:', data);
    return autoTag(text);
  } catch (err) {
    console.warn('AI classification error, using fallback:', err);
    return autoTag(text);
  }
}
