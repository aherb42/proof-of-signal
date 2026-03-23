import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Signal {
  id: string;
  text: string;
  date: string;
  tag: string;
  flagged: boolean;
  context?: {
    meeting?: string;
    attendees?: string;
  };
}

export interface UserProfile {
  firstName: string;
  careerStage: string;
  goals: string[];
  onboardingComplete: boolean;
}

interface AppState {
  user: UserProfile;
  signals: Signal[];
  setUser: (user: Partial<UserProfile>) => void;
  addSignal: (signal: Omit<Signal, 'id'>) => void;
  updateSignal: (id: string, updates: Partial<Signal>) => void;
  toggleFlag: (id: string) => void;
  resetToDemo: () => void;
}

const defaultUser: UserProfile = {
  firstName: '',
  careerStage: '',
  goals: [],
  onboardingComplete: false,
};

const demoUser: UserProfile = {
  firstName: 'Diana',
  careerStage: 'Senior PM (4–10 years)',
  goals: ['Getting promoted', 'Building executive presence'],
  onboardingComplete: true,
};

const demoSignals: Signal[] = [
  {
    id: 'demo-1',
    text: 'Stakeholder review went well — CPO mentioned the roadmap framing by name in the all-hands recap. I didn\'t know she was going to reference it.',
    date: '2025-03-18',
    tag: 'Recognition',
    flagged: true,
  },
  {
    id: 'demo-2',
    text: 'Felt like my idea about the discovery sprint structure got picked up in the PM sync without attribution. Not sure if I\'m reading into it.',
    date: '2025-03-19',
    tag: 'Missed Credit',
    flagged: true,
  },
  {
    id: 'demo-3',
    text: '1:1 with my manager was shorter than usual. He moved through the agenda fast and didn\'t ask follow-up questions. Not sure what to make of it.',
    date: '2025-03-20',
    tag: 'Manager Signal',
    flagged: false,
  },
  {
    id: 'demo-4',
    text: 'Led my first cross-functional roadmap review with design + eng + data. It ran long but nobody left. That felt like something.',
    date: '2025-03-21',
    tag: 'Personal Milestone',
    flagged: true,
  },
  {
    id: 'demo-5',
    text: 'Got feedback in writing from the VP of Design that my framing of the Q2 priorities was \'unusually clear for this stage of planning.\' Saved the email.',
    date: '2025-03-22',
    tag: 'Recognition',
    flagged: true,
  },
];

const AppContext = createContext<AppState | undefined>(undefined);

const STORAGE_KEY = 'proof-of-signal';

function loadState(): { user: UserProfile; signals: Signal[] } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { user: demoUser, signals: demoSignals };
}

function saveState(user: UserProfile, signals: Signal[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, signals }));
}

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState(loadState);

  useEffect(() => {
    saveState(state.user, state.signals);
  }, [state]);

  const setUser = (updates: Partial<UserProfile>) => {
    setState(prev => ({ ...prev, user: { ...prev.user, ...updates } }));
  };

  const addSignal = (signal: Omit<Signal, 'id'>) => {
    const newSignal: Signal = { ...signal, id: crypto.randomUUID() };
    setState(prev => ({ ...prev, signals: [newSignal, ...prev.signals] }));
  };

  const updateSignal = (id: string, updates: Partial<Signal>) => {
    setState(prev => ({
      ...prev,
      signals: prev.signals.map(s => s.id === id ? { ...s, ...updates } : s),
    }));
  };

  const toggleFlag = (id: string) => {
    setState(prev => ({
      ...prev,
      signals: prev.signals.map(s => s.id === id ? { ...s, flagged: !s.flagged } : s),
    }));
  };

  return (
    <AppContext.Provider value={{ ...state, setUser, addSignal, updateSignal, toggleFlag }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
};
