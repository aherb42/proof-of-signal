import HeroIllustration from './HeroIllustration';

const HeroComposition = () => (
  <div className="relative w-full max-w-xl mx-auto">
    {/* Photo in organic blob shape */}
    <div className="relative">
      <div
        className="w-80 h-80 md:w-96 md:h-96 mx-auto rounded-full overflow-hidden shadow-xl"
        style={{
          clipPath:
            'polygon(50% 0%, 80% 5%, 97% 25%, 100% 50%, 95% 78%, 75% 98%, 50% 100%, 25% 95%, 5% 75%, 0% 50%, 3% 25%, 20% 5%)',
        }}
      >
        <img
          src="/hero-photo.jpeg"
          alt="Professional woman in a meeting"
          className="w-full h-full object-cover"
        />
        {/* Soft blush overlay to blend with brand */}
        <div className="absolute inset-0 bg-accent/10 mix-blend-multiply" />
      </div>

      {/* Blush glow behind the blob */}
      <div
        className="absolute inset-0 -z-10 blur-3xl opacity-30 mx-auto w-80 h-80 md:w-96 md:h-96 rounded-full bg-accent"
      />
    </div>

    {/* Signal illustration overlaid */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="opacity-70">
        <HeroIllustration />
      </div>
    </div>
  </div>
);

export default HeroComposition;
