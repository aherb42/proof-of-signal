import { BookOpen, Compass, Network } from 'lucide-react';

interface FeatureIconProps {
  type: 'capture' | 'patterns' | 'growth';
  className?: string;
}

const icons = {
  capture: BookOpen,
  patterns: Network,
  growth: Compass,
};

const FeatureIcon = ({ type, className = '' }: FeatureIconProps) => {
  const Icon = icons[type];
  return (
    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary ${className}`}>
      <Icon className="w-7 h-7 text-navy" strokeWidth={1.5} />
    </div>
  );
};

export default FeatureIcon;
