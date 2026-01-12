import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Laptop, Shirt, Home, UtensilsCrossed, Sparkles } from 'lucide-react';

interface CategoryPillsProps {
  selected: string[];
  onToggle: (category: string) => void;
}

const categories = [
  { id: 'tech', labelKey: 'categories.tech', icon: Laptop, color: 'from-blue-500 to-cyan-500' },
  { id: 'fashion', labelKey: 'categories.fashion', icon: Shirt, color: 'from-pink-500 to-rose-500' },
  { id: 'home', labelKey: 'categories.home', icon: Home, color: 'from-amber-500 to-orange-500' },
  { id: 'food', labelKey: 'categories.food', icon: UtensilsCrossed, color: 'from-green-500 to-emerald-500' },
];

export const CategoryPills = ({ selected, onToggle }: CategoryPillsProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="flex flex-wrap justify-center gap-3 mt-8"
    >
      {categories.map(({ id, labelKey, icon: Icon }, index) => {
        const isSelected = selected.includes(id);
        return (
          <motion.button
            key={id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
            onClick={() => onToggle(id)}
            className={`
              group relative overflow-hidden px-5 py-3 rounded-full font-medium text-sm
              transition-all duration-300 flex items-center gap-2.5
              ${isSelected
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                : 'bg-secondary/80 text-foreground hover:bg-secondary border border-border hover:border-primary/30'
              }
            `}
          >
            <Icon className={`w-4 h-4 transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`} />
            <span>{t(labelKey)}</span>
            {isSelected && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
              </motion.span>
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
};
