import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link2, CheckCircle, AlertCircle, Loader2, ExternalLink, Sparkles } from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

type IndexingStatus = 'idle' | 'loading' | 'success' | 'error';

interface IndexedPage {
  url: string;
  name: string;
  dealsFound: number;
  indexedAt: Date;
}

const Dashboard = () => {
  const { t } = useTranslation();
  const [pageUrl, setPageUrl] = useState('');
  const [status, setStatus] = useState<IndexingStatus>('idle');
  const [indexedPages, setIndexedPages] = useState<IndexedPage[]>([
    {
      url: 'https://facebook.com/techhub',
      name: 'TechHub Store',
      dealsFound: 24,
      indexedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      url: 'https://facebook.com/stylevault',
      name: 'StyleVault NYC',
      dealsFound: 18,
      indexedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pageUrl.trim()) return;
    
    // Validate URL
    if (!pageUrl.includes('facebook.com')) {
      toast({
        title: t('toast.invalidUrl'),
        description: t('toast.invalidUrlDesc'),
        variant: 'destructive',
      });
      return;
    }

    setStatus('loading');

    // Simulate indexing
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const newPage: IndexedPage = {
      url: pageUrl,
      name: pageUrl.split('/').pop() || 'Unknown Page',
      dealsFound: Math.floor(Math.random() * 30) + 5,
      indexedAt: new Date(),
    };

    setIndexedPages((prev) => [newPage, ...prev]);
    setStatus('success');
    setPageUrl('');

    toast({
      title: t('toast.pageIndexed'),
      description: t('toast.pageIndexedDesc', { count: newPage.dealsFound, name: newPage.name }),
    });

    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {t('dashboard.title')}
            </h1>
            <p className="text-muted-foreground">
              {t('dashboard.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Add Page Form */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Link2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">{t('dashboard.addPage.title')}</h2>
                  <p className="text-sm text-muted-foreground">
                    {t('dashboard.addPage.subtitle')}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="page-url">{t('dashboard.addPage.label')}</Label>
                  <Input
                    id="page-url"
                    type="url"
                    value={pageUrl}
                    onChange={(e) => setPageUrl(e.target.value)}
                    placeholder={t('dashboard.addPage.placeholder')}
                    className="h-12"
                    disabled={status === 'loading'}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 gap-2"
                  disabled={status === 'loading' || !pageUrl.trim()}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t('dashboard.addPage.indexing')}
                    </>
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      {t('dashboard.addPage.success')}
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      {t('dashboard.addPage.startIndexing')}
                    </>
                  )}
                </Button>
              </form>

              {/* Benefits */}
              <div className="pt-4 border-t border-border space-y-3">
                <p className="text-sm font-medium text-muted-foreground">
                  {t('dashboard.benefits.title')}
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-verified mt-0.5 shrink-0" />
                    {t('dashboard.benefits.instant')}
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-verified mt-0.5 shrink-0" />
                    {t('dashboard.benefits.ai')}
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-verified mt-0.5 shrink-0" />
                    {t('dashboard.benefits.badge')}
                  </li>
                </ul>
              </div>
            </div>

            {/* Indexed Pages */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">{t('dashboard.indexedPages.title')}</h2>
                <span className="text-sm text-muted-foreground">
                  {t('dashboard.indexedPages.count', { count: indexedPages.length })}
                </span>
              </div>

              {indexedPages.length > 0 ? (
                <div className="space-y-4">
                  {indexedPages.map((page, index) => {
                    const daysAgo = Math.floor(
                      (Date.now() - page.indexedAt.getTime()) / (1000 * 60 * 60 * 24)
                    );
                    return (
                      <motion.div
                        key={page.url}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-foreground truncate">
                            {page.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {t('dashboard.indexedPages.dealsFound', { count: page.dealsFound })} • {t('dashboard.indexedPages.indexedDaysAgo', { days: daysAgo })}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => window.open(page.url, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {t('dashboard.indexedPages.empty')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
