const HeroIllustration = () => (
  <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xl">
    {/* Signal wave rings — brighter */}
    <circle cx="300" cy="200" r="60" stroke="hsl(var(--accent))" strokeWidth="2.5" opacity="0.9" />
    <circle cx="300" cy="200" r="100" stroke="hsl(var(--accent))" strokeWidth="2" opacity="0.6" />
    <circle cx="300" cy="200" r="150" stroke="hsl(var(--blush))" strokeWidth="1.5" opacity="0.4" />
    <circle cx="300" cy="200" r="190" stroke="hsl(var(--blush-light))" strokeWidth="1" opacity="0.25" />
    {/* Center dot — the signal origin */}
    <circle cx="300" cy="200" r="10" fill="hsl(var(--primary))" />
    <circle cx="300" cy="200" r="5" fill="hsl(var(--accent))" />
    {/* Constellation nodes — larger, more vivid */}
    <circle cx="220" cy="140" r="6" fill="hsl(var(--primary))" opacity="0.7" />
    <circle cx="380" cy="160" r="5" fill="hsl(var(--accent))" opacity="0.8" />
    <circle cx="350" cy="280" r="7" fill="hsl(var(--accent))" opacity="0.8" />
    <circle cx="200" cy="260" r="4" fill="hsl(var(--primary))" opacity="0.5" />
    <circle cx="420" cy="230" r="5" fill="hsl(var(--accent))" opacity="0.7" />
    <circle cx="160" cy="190" r="3" fill="hsl(var(--blush))" opacity="0.5" />
    <circle cx="440" cy="150" r="4" fill="hsl(var(--blush))" opacity="0.4" />
    {/* Connection lines */}
    <line x1="300" y1="200" x2="220" y2="140" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />
    <line x1="300" y1="200" x2="380" y2="160" stroke="hsl(var(--accent))" strokeWidth="1" opacity="0.35" />
    <line x1="300" y1="200" x2="350" y2="280" stroke="hsl(var(--accent))" strokeWidth="1" opacity="0.35" />
    <line x1="300" y1="200" x2="200" y2="260" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.25" />
    <line x1="220" y1="140" x2="380" y2="160" stroke="hsl(var(--blush))" strokeWidth="0.5" opacity="0.2" />
    <line x1="350" y1="280" x2="420" y2="230" stroke="hsl(var(--accent))" strokeWidth="0.5" opacity="0.2" />
    <line x1="300" y1="200" x2="440" y2="150" stroke="hsl(var(--blush))" strokeWidth="0.5" opacity="0.15" />
  </svg>
);

export default HeroIllustration;
