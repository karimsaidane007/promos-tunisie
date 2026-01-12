import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wand2, ChevronRight, DollarSign, Tag, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { simulateAIExtraction } from '@/data/mockDeals';
import { AIExtraction } from '@/types/deals';

export const AIExtractionDemo = () => {
  const { t } = useTranslation();
  const [rawText, setRawText] = useState('');
  const [extraction, setExtraction] = useState<AIExtraction | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleExtract = async () => {
    if (!rawText.trim()) return;
    
    setIsProcessing(true);
    setExtraction(null);
    
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const result = simulateAIExtraction(rawText);
    setExtraction(result);
    setIsProcessing(false);
  };

  const sampleTexts = [
    "🔥 SALE! MacBook Pro M3 only $1599 (was $1999) - 20% off! Tech deal of the week!",
    "Beautiful leather jacket 50% OFF - designer quality for just $225! Fashion lovers don't miss out!",
    "Fresh organic honey gift set - normally $65, now $45! Perfect food gift for the holidays!",
  ];

  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Wand2 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{t('aiDemo.title')}</h3>
          <p className="text-sm text-muted-foreground">{t('aiDemo.subtitle')}</p>
        </div>
      </div>

      {/* Sample texts */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">{t('aiDemo.trySample')}</p>
        <div className="flex flex-wrap gap-2">
          {sampleTexts.map((text, i) => (
            <button
              key={i}
              onClick={() => setRawText(text)}
              className="text-xs bg-secondary hover:bg-secondary/80 px-3 py-1.5 rounded-full transition-colors text-left max-w-[200px] truncate"
            >
              {text.slice(0, 40)}...
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="space-y-3">
        <Textarea
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          placeholder={t('aiDemo.placeholder')}
          className="min-h-[100px] resize-none"
        />
        <Button
          onClick={handleExtract}
          disabled={!rawText.trim() || isProcessing}
          className="w-full gap-2"
        >
          {isProcessing ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
              {t('aiDemo.processing')}
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              {t('aiDemo.extract')}
            </>
          )}
        </Button>
      </div>

      {/* Results */}
      <AnimatePresence>
        {extraction && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 pt-4 border-t border-border"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <ChevronRight className="w-4 h-4" />
              {t('aiDemo.extractedInfo')}
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-secondary/50 rounded-xl p-4 text-center">
                <DollarSign className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">${extraction.price}</p>
                <p className="text-xs text-muted-foreground">{t('aiDemo.detectedPrice')}</p>
              </div>
              
              <div className="bg-secondary/50 rounded-xl p-4 text-center">
                <Tag className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold capitalize">{t(`categories.${extraction.category}`)}</p>
                <p className="text-xs text-muted-foreground">{t('aiDemo.category')}</p>
              </div>
              
              <div className="bg-secondary/50 rounded-xl p-4 text-center">
                <Percent className="w-5 h-5 text-accent mx-auto mb-2" />
                <p className="text-2xl font-bold">{extraction.discountPercent}%</p>
                <p className="text-xs text-muted-foreground">{t('aiDemo.discount')}</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-verified" />
              <span>{t('aiDemo.confidence', { value: (extraction.confidence * 100).toFixed(0) })}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
