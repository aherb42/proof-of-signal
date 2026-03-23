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
}

const defaultUser: UserProfile = {
  firstName: '',
  careerStage: '',
  goals: [],
  onboardingComplete: false,
};

const AppContext = createContext<AppState | undefined>(undefined);

const STORAGE_KEY = 'proof-of-signal';

function loadState(): { user: UserProfile; signals: Signal[] } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { user: defaultUser, signals: [] };
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
