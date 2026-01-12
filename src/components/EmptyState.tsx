import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { SearchX, MessageSquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  searchQuery: string;
  onRequestProduct: () => void;
}

export const EmptyState = ({ searchQuery, onRequestProduct }: EmptyStateProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
        <SearchX className="w-10 h-10 text-muted-foreground" />
      </div>
      
      <h3 className="text-2xl font-semibold text-foreground mb-2">
        {t('emptyState.title')}
      </h3>
      
      <p className="text-muted-foreground max-w-md mb-8">
        {searchQuery
          ? t('emptyState.messageWithQuery', { query: searchQuery })
          : t('emptyState.messageNoQuery')}
      </p>

      <Button
        onClick={onRequestProduct}
        className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
      >
        <MessageSquarePlus className="w-5 h-5" />
        {t('emptyState.requestProduct')}
      </Button>

      <p className="text-sm text-muted-foreground mt-4">
        {t('emptyState.notifyMessage')}
      </p>
    </motion.div>
  );
};
