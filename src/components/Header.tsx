import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tag, LayoutDashboard, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/LanguageSelector';

export const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-button transition-transform group-hover:scale-105">
            <Tag className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">
            Social<span className="text-primary">Deals</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          {!isHome && (
            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">{t('header.search')}</span>
              </Button>
            </Link>
          )}
          <Link to="/dashboard">
            <Button
              variant={location.pathname === '/dashboard' ? 'default' : 'outline'}
              className="gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">{t('common.merchantDashboard')}</span>
              <span className="sm:hidden">{t('common.dashboard')}</span>
            </Button>
          </Link>
          <LanguageSelector />
        </nav>
      </div>
    </header>
  );
};
