import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  variant?: 'hero' | 'compact';
}

export const SearchBar = ({ value, onChange, onSearch, variant = 'hero' }: SearchBarProps) => {
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className="relative w-full max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground rtl:left-auto rtl:right-4" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t('search.searchDeals')}
          className="w-full bg-secondary border border-border rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all rtl:pl-4 rtl:pr-12"
        />
      </form>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative w-full max-w-3xl mx-auto"
    >
      <div
        className={`
          relative flex items-center transition-all duration-300
          ${isFocused ? 'scale-[1.02]' : 'scale-100'}
        `}
      >
        <Search className="absolute left-6 w-6 h-6 text-muted-foreground z-10 rtl:left-auto rtl:right-6" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={t('home.searchPlaceholder')}
          className="search-input pl-16 pr-40 rtl:pl-40 rtl:pr-16"
        />
        <button
          type="submit"
          className="absolute right-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-xl shadow-button transition-all duration-200 flex items-center gap-2 hover:scale-105 rtl:right-auto rtl:left-3"
        >
          <Sparkles className="w-4 h-4" />
          {t('home.searchButton')}
        </button>
      </div>
      
      {/* Search hint */}
      <p className="text-center text-sm text-muted-foreground mt-4 opacity-80">
        {t('home.searchHint')}
      </p>
    </motion.form>
  );
};
