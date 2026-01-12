import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Fuse from 'fuse.js';
import { SlidersHorizontal } from 'lucide-react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { FiltersSidebar } from '@/components/FiltersSidebar';
import { DealCard } from '@/components/DealCard';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { mockDeals } from '@/data/mockDeals';
import { FilterState, Deal } from '@/types/deals';
import { toast } from '@/hooks/use-toast';

const defaultFilters: FilterState = {
  minPrice: 0,
  maxPrice: 2500,
  locationRadius: 50,
  trustedSellerOnly: false,
  categories: [],
  searchQuery: '',
};

// Initialize Fuse.js for fuzzy search
const fuse = new Fuse(mockDeals, {
  keys: ['title', 'description', 'shopName', 'category'],
  threshold: 0.4,
  includeScore: true,
});

const SearchPage = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(() => {
    const q = searchParams.get('q') || '';
    const categories = searchParams.get('categories')?.split(',').filter(Boolean) || [];
    return { ...defaultFilters, searchQuery: q, categories };
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.searchQuery) params.set('q', filters.searchQuery);
    if (filters.categories.length > 0) params.set('categories', filters.categories.join(','));
    setSearchParams(params, { replace: true });
  }, [filters.searchQuery, filters.categories, setSearchParams]);

  // Filter and search deals
  const filteredDeals = useMemo(() => {
    let results: Deal[] = mockDeals;

    // Fuzzy search
    if (filters.searchQuery.trim()) {
      const searchResults = fuse.search(filters.searchQuery);
      results = searchResults.map((r) => r.item);
    }

    // Apply filters
    results = results.filter((deal) => {
      // Price filter
      if (deal.discountedPrice < filters.minPrice || deal.discountedPrice > filters.maxPrice) {
        return false;
      }

      // Location filter
      if (deal.distance > filters.locationRadius) {
        return false;
      }

      // Trusted seller filter
      if (filters.trustedSellerOnly && !deal.isVerified) {
        return false;
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(deal.category)) {
        return false;
      }

      return true;
    });

    return results;
  }, [filters]);

  const handleSearch = () => {
    // Search is reactive, no additional action needed
  };

  const handleReset = () => {
    setFilters(defaultFilters);
  };

  const handleRequestProduct = () => {
    toast({
      title: t('toast.requestSubmitted'),
      description: t('toast.requestDescription'),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-6">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {filters.searchQuery 
                ? t('search.resultsFor', { query: filters.searchQuery }) 
                : t('search.allDeals')}
            </h1>
            <p className="text-muted-foreground">
              {t('search.dealsFound', { count: filteredDeals.length })}
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <SearchBar
              value={filters.searchQuery}
              onChange={(value) => setFilters({ ...filters, searchQuery: value })}
              onSearch={handleSearch}
              variant="compact"
            />
            <Button
              variant="outline"
              className="lg:hidden gap-2"
              onClick={() => setSidebarOpen(true)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              {t('common.filters')}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Sidebar */}
          <FiltersSidebar
            filters={filters}
            onFiltersChange={setFilters}
            onReset={handleReset}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {/* Results Grid */}
          <main className="flex-1 min-w-0">
            {filteredDeals.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredDeals.map((deal, index) => (
                  <DealCard key={deal.id} deal={deal} index={index} />
                ))}
              </div>
            ) : (
              <EmptyState
                searchQuery={filters.searchQuery}
                onRequestProduct={handleRequestProduct}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
