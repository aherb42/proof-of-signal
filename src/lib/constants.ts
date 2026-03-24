/**
 * Shared application constants used across onboarding, profile, dashboard, and patterns pages.
 * Centralises user-facing strings that appear in multiple locations.
 */

/** Career stage options shown during onboarding and on the profile editor. */
export const CAREER_STAGES = [
  'Aspiring PM',
  'Associate / Junior PM',
  'Product Manager',
  'Senior PM',
  'Group PM / Director',
  'VP of Product / CPO',
] as const;

/** Growth-goal options (max 2 selectable). */
export const GOALS = [
  'Getting promoted',
  'Building executive presence',
  'Navigating stakeholder dynamics',
  'Transitioning into product',
  'Getting better at strategy',
  'Documenting my impact',
] as const;

/**
 * Contextual insight copy keyed by dominant signal tag.
 * Shown on the Dashboard insight card and the Patterns page.
 */
export const THEME_INSIGHTS: Record<string, string> = {
  'Recognition':
    "You're being seen at the right levels. The question now is whether your manager is connecting these moments to your readiness for the next step.",
  'Missed Credit':
    "A pattern worth watching: your contributions are landing, but the attribution isn't always following. That gap is worth naming — especially before a performance conversation.",
  'Manager Signal':
    "Your signals suggest a shift in your manager dynamic. Whether it's positive or concerning, it's worth paying attention to before your next 1:1.",
  'Constructive Feedback':
    "You're getting input. The question is whether you're capturing it in a way that shows growth over time — not just in the moment.",
  'Personal Milestone':
    "You're stepping up. Make sure these moments are on record — they're the evidence your promotion conversation needs.",
  'Org / Political Signal':
    "You're picking up on organizational dynamics early. That awareness is an asset — especially if you're navigating a shift in team or leadership.",
};

/**
 * Definitions for each signal tag, displayed in modals on the Patterns page.
 */
export const TAG_DEFINITIONS: Record<string, string> = {
  'Recognition':
    'Your contribution was acknowledged publicly or privately — a shoutout in a meeting, positive feedback from a stakeholder, or a peer crediting your work.',
  'Missed Credit':
    "Your idea, work, or contribution was attributed to someone else, or went unacknowledged entirely. Can be subtle — worth noting even when you're not sure.",
  'Constructive Feedback':
    'Input you received about an area to develop or improve. Includes formal feedback, informal coaching, or repeated observations from others.',
  'Manager Signal':
    "A shift in your manager's behavior, tone, or attention toward you — shorter 1:1s, change in communication style, new visibility or reduced access.",
  'Org / Political Signal':
    'An organizational dynamic worth tracking — restructuring, budget signals, stakeholder shifts, or changes in team direction that affect your position.',
  'Personal Milestone':
    'A meaningful moment in your own career progression — first time leading something, a stretch assignment, a door that opened.',
};
