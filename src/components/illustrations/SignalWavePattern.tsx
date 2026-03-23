const SignalWavePattern = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="none">
    <path
      d="M0 60 Q150 20 300 60 T600 60 T900 60 T1200 60 V120 H0 Z"
      fill="hsl(var(--rose-soft))"
      opacity="0.5"
    />
    <path
      d="M0 80 Q150 50 300 80 T600 80 T900 80 T1200 80 V120 H0 Z"
      fill="hsl(var(--blush-light))"
      opacity="0.3"
    />
  </svg>
);

export default SignalWavePattern;
