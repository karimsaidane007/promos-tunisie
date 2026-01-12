import { useTranslation } from 'react-i18next';
import { Deal } from '@/types/deals';
import { ExternalLink, MapPin, Clock, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface DealCardProps {
  deal: Deal;
  index: number;
}

const formatTimeAgo = (date: Date, t: (key: string, options?: { count: number }) => string): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  return t('common.daysAgo', { count: diffDays });
};

export const DealCard = ({ deal, index }: DealCardProps) => {
  const { t } = useTranslation();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="deal-card group"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={deal.imageUrl}
          alt={deal.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Discount Badge */}
        <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3">
          <span className="deal-badge">
            {t('dealCard.discount', { percent: deal.discountPercent })}
          </span>
        </div>

        {/* Verified Badge */}
        {deal.isVerified && (
          <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3">
            <span className="verified-badge">
              <BadgeCheck className="w-3.5 h-3.5" />
              {t('common.verified')}
            </span>
          </div>
        )}

        {/* Category Tag */}
        <div className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3">
          <span className="bg-foreground/80 text-background text-xs font-medium px-2.5 py-1 rounded-full capitalize backdrop-blur-sm">
            {t(`categories.${deal.category}`)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Title & Shop */}
        <div>
          <h3 className="font-semibold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {deal.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {deal.shopName}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {deal.description}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2">
  <span className="text-2xl font-bold text-foreground">
    {deal.discountedPrice.toLocaleString()} <span className="text-lg">DT</span>
  </span>
  <span className="text-sm text-muted-foreground line-through">
    {deal.originalPrice.toLocaleString()} DT
  </span>
</div>

        {/* CTA Button */}
        <Button
          className="w-full mt-2 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-button"
          onClick={() => window.open(deal.shopUrl, '_blank')}
        >
          {t('dealCard.viewOnFacebook')}
          <ExternalLink className="w-4 h-4" />
        </Button>
      </div>
    </motion.article>
  );
};
