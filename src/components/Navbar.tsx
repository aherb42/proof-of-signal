import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, User, TrendingUp, PenLine } from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/patterns', label: 'Patterns', icon: TrendingUp },
];

const Navbar = () => {
  const { pathname } = useLocation();

  if (pathname === '/' || pathname.startsWith('/onboarding')) return null;

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="text-sm font-serif text-navy font-semibold">
            Proof of Signal
          </Link>
          <div className="flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    active ? 'bg-navy text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
