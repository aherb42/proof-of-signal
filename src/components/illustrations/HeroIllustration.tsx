/** HeroIllustration — animated SVG signal-wave graphic used on the landing page and onboarding welcome. */
const HeroIllustration = () => (
  <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xl">
    <style>{`
      @keyframes ripple1 { 0% { r: 55; opacity: 0.9; } 50% { r: 65; opacity: 0.5; } 100% { r: 55; opacity: 0.9; } }
      @keyframes ripple2 { 0% { r: 95; opacity: 0.6; } 50% { r: 108; opacity: 0.3; } 100% { r: 95; opacity: 0.6; } }
      @keyframes ripple3 { 0% { r: 145; opacity: 0.4; } 50% { r: 160; opacity: 0.15; } 100% { r: 145; opacity: 0.4; } }
      @keyframes ripple4 { 0% { r: 185; opacity: 0.25; } 50% { r: 200; opacity: 0.08; } 100% { r: 185; opacity: 0.25; } }
      @keyframes corePulse { 0% { r: 10; } 50% { r: 13; } 100% { r: 10; } }
      @keyframes coreGlow { 0% { r: 5; } 50% { r: 7; } 100% { r: 5; } }
      @keyframes nodeFloat1 { 0% { transform: translate(0,0); } 50% { transform: translate(-3px, -4px); } 100% { transform: translate(0,0); } }
      @keyframes nodeFloat2 { 0% { transform: translate(0,0); } 50% { transform: translate(4px, -2px); } 100% { transform: translate(0,0); } }
      @keyframes nodeFloat3 { 0% { transform: translate(0,0); } 50% { transform: translate(-2px, 5px); } 100% { transform: translate(0,0); } }
      @keyframes spinCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes spinCCW { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      .ring1 { animation: ripple1 3s ease-in-out infinite, spinCW 12s linear infinite; transform-origin: 300px 200px; }
      .ring2 { animation: ripple2 3s ease-in-out infinite 0.4s, spinCW 16s linear infinite; transform-origin: 300px 200px; }
      .ring3 { animation: ripple3 3s ease-in-out infinite 0.8s, spinCCW 20s linear infinite; transform-origin: 300px 200px; }
      .ring4 { animation: ripple4 3s ease-in-out infinite 1.2s, spinCCW 24s linear infinite; transform-origin: 300px 200px; }
      .core { animation: corePulse 2s ease-in-out infinite; }
      .core-glow { animation: coreGlow 2s ease-in-out infinite; }
      .float1 { animation: nodeFloat1 4s ease-in-out infinite; }
      .float2 { animation: nodeFloat2 5s ease-in-out infinite 0.5s; }
      .float3 { animation: nodeFloat3 4.5s ease-in-out infinite 1s; }
    `}</style>
    <circle cx="300" cy="200" r="60" stroke="hsl(var(--accent))" strokeWidth="2.5" className="ring1" />
    <circle cx="300" cy="200" r="100" stroke="hsl(var(--accent))" strokeWidth="2" className="ring2" />
    <circle cx="300" cy="200" r="150" stroke="hsl(var(--blush))" strokeWidth="1.5" className="ring3" />
    <circle cx="300" cy="200" r="190" stroke="hsl(var(--blush-light))" strokeWidth="1" className="ring4" />
    <circle cx="300" cy="200" r="10" fill="hsl(var(--primary))" className="core" />
    <circle cx="300" cy="200" r="5" fill="hsl(var(--accent))" className="core-glow" />
    <g className="float1">
      <circle cx="220" cy="140" r="6" fill="hsl(var(--primary))" opacity="0.7" />
      <circle cx="200" cy="260" r="4" fill="hsl(var(--primary))" opacity="0.5" />
    </g>
    <g className="float2">
      <circle cx="380" cy="160" r="5" fill="hsl(var(--accent))" opacity="0.8" />
      <circle cx="420" cy="230" r="5" fill="hsl(var(--accent))" opacity="0.7" />
    </g>
    <g className="float3">
      <circle cx="350" cy="280" r="7" fill="hsl(var(--accent))" opacity="0.8" />
      <circle cx="160" cy="190" r="3" fill="hsl(var(--blush))" opacity="0.5" />
      <circle cx="440" cy="150" r="4" fill="hsl(var(--blush))" opacity="0.4" />
    </g>
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
