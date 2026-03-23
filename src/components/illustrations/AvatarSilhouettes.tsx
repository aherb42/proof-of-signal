const avatars = [
  { initials: 'DK', bg: 'bg-navy', text: 'text-primary-foreground' },
  { initials: 'SA', bg: 'bg-blush', text: 'text-navy' },
  { initials: 'MR', bg: 'bg-secondary', text: 'text-navy' },
];

const AvatarSilhouettes = () => (
  <div className="flex -space-x-3">
    {avatars.map(a => (
      <div
        key={a.initials}
        className={`w-10 h-10 rounded-full ${a.bg} ${a.text} flex items-center justify-center text-sm font-semibold ring-2 ring-background`}
      >
        {a.initials}
      </div>
    ))}
  </div>
);

export default AvatarSilhouettes;
