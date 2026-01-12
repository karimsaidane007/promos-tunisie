import { useTranslation } from 'react-i18next';
import { FilterState } from '@/types/deals';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SlidersHorizontal, X, Laptop, Shirt, Home, UtensilsCrossed } from 'lucide-react';

interface FiltersSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { id: 'tech', labelKey: 'categories.tech', icon: Laptop },
  { id: 'fashion', labelKey: 'categories.fashion', icon: Shirt },
  { id: 'home', labelKey: 'categories.home', icon: Home },
  { id: 'food', labelKey: 'categories.food', icon: UtensilsCrossed },
];

export const FiltersSidebar = ({
  filters,
  onFiltersChange,
  onReset,
  isOpen,
  onClose,
}: FiltersSidebarProps) => {
  const { t } = useTranslation();

  const toggleCategory = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter((c) => c !== categoryId)
      : [...filters.categories, categoryId];
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const activeFiltersCount =
    (filters.minPrice > 0 ? 1 : 0) +
    (filters.maxPrice < 2500 ? 1 : 0) +
    (filters.locationRadius < 50 ? 1 : 0) +
    (filters.trustedSellerOnly ? 1 : 0) +
    filters.categories.length;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen lg:h-auto w-80 lg:w-72 
          bg-card border-r border-border p-6 space-y-6 z-50 
          transition-transform duration-300 ease-out overflow-y-auto
          rtl:right-0 rtl:left-auto rtl:border-r-0 rtl:border-l
          ${isOpen ? 'translate-x-0 rtl:-translate-x-0' : '-translate-x-full rtl:translate-x-full lg:translate-x-0 lg:rtl:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-lg">{t('filters.title')}</h2>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Categories */}
        <div className="filter-section">
          <Label className="text-sm font-medium mb-3 block">{t('filters.categories')}</Label>
          <div className="flex flex-wrap gap-2">
            {categories.map(({ id, labelKey, icon: Icon }) => (
              <button
                key={id}
                onClick={() => toggleCategory(id)}
                className={`category-pill ${filters.categories.includes(id) ? 'active' : ''}`}
              >
                <Icon className="w-4 h-4" />
                {t(labelKey)}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="filter-section">
          <Label className="text-sm font-medium mb-3 block">
            {t('filters.priceRange', { min: filters.minPrice, max: filters.maxPrice })}
          </Label>
          <Slider
            value={[filters.minPrice, filters.maxPrice]}
            min={0}
            max={2500}
            step={25}
            onValueChange={([min, max]) =>
              onFiltersChange({ ...filters, minPrice: min, maxPrice: max })
            }
            className="mt-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>$0</span>
            <span>$2,500</span>
          </div>
        </div>

        {/* Location Radius */}
        <div className="filter-section">
          <Label className="text-sm font-medium mb-3 block">
            {t('filters.locationRadius', { radius: filters.locationRadius })}
          </Label>
          <Slider
            value={[filters.locationRadius]}
            min={1}
            max={50}
            step={1}
            onValueChange={([value]) =>
              onFiltersChange({ ...filters, locationRadius: value })
            }
            className="mt-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>1 {t('common.km')}</span>
            <span>50 {t('common.km')}</span>
          </div>
        </div>

        {/* Trusted Seller */}
        <div className="filter-section">
          <div className="flex items-center justify-between">
            <Label htmlFor="trusted-seller" className="text-sm font-medium cursor-pointer">
              {t('filters.trustedSellersOnly')}
            </Label>
            <Switch
              id="trusted-seller"
              checked={filters.trustedSellerOnly}
              onCheckedChange={(checked) =>
                onFiltersChange({ ...filters, trustedSellerOnly: checked })
              }
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {t('filters.trustedSellersDesc')}
          </p>
        </div>

        {/* Reset Button */}
        <Button
          variant="outline"
          className="w-full"
          onClick={onReset}
          disabled={activeFiltersCount === 0}
        >
          {t('filters.resetAll')}
        </Button>
      </aside>
    </>
  );
};
