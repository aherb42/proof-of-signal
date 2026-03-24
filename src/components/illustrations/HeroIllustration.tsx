/** HeroIllustration — animated SVG signal-wave graphic used on the landing page and onboarding welcome. */
const HeroIllustration = () => (
  <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xl">
    <style>{`
      @keyframes ripple1 { 0% { r: 50; opacity: 1; } 50% { r: 70; opacity: 0.4; } 100% { r: 50; opacity: 1; } }
      @keyframes ripple2 { 0% { r: 88; opacity: 0.75; } 50% { r: 118; opacity: 0.25; } 100% { r: 88; opacity: 0.75; } }
      @keyframes ripple3 { 0% { r: 135; opacity: 0.55; } 50% { r: 168; opacity: 0.12; } 100% { r: 135; opacity: 0.55; } }
      @keyframes ripple4 { 0% { r: 175; opacity: 0.35; } 50% { r: 210; opacity: 0.06; } 100% { r: 175; opacity: 0.35; } }
      @keyframes corePulse { 0% { r: 10; } 50% { r: 16; } 100% { r: 10; } }
      @keyframes coreGlow { 0% { r: 5; } 50% { r: 10; } 100% { r: 5; } }
      @keyframes nodeFloat1 { 0% { transform: translate(0,0); } 50% { transform: translate(-5px, -7px); } 100% { transform: translate(0,0); } }
      @keyframes nodeFloat2 { 0% { transform: translate(0,0); } 50% { transform: translate(7px, -4px); } 100% { transform: translate(0,0); } }
      @keyframes nodeFloat3 { 0% { transform: translate(0,0); } 50% { transform: translate(-4px, 8px); } 100% { transform: translate(0,0); } }
      @keyframes spinCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes spinCCW { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      .ring1 { animation: ripple1 1.6s ease-in-out infinite, spinCW 2s linear infinite; transform-origin: 300px 200px; }
      .ring2 { animation: ripple2 2s ease-in-out infinite 0.2s, spinCW 2.8s linear infinite; transform-origin: 300px 200px; }
      .ring3 { animation: ripple3 2.4s ease-in-out infinite 0.5s, spinCCW 3.5s linear infinite; transform-origin: 300px 200px; }
      .ring4 { animation: ripple4 2.8s ease-in-out infinite 0.9s, spinCCW 4.2s linear infinite; transform-origin: 300px 200px; }
      .core { animation: corePulse 1.2s ease-in-out infinite; }
      .core-glow { animation: coreGlow 1.2s ease-in-out infinite; }
      .float1 { animation: nodeFloat1 2s ease-in-out infinite; }
      .float2 { animation: nodeFloat2 2.5s ease-in-out infinite 0.3s; }
      .float3 { animation: nodeFloat3 2.2s ease-in-out infinite 0.6s; }
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
