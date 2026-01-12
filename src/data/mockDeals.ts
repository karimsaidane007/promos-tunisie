import { Deal } from '@/types/deals';

export const mockDeals: Deal[] = [
  {
    id: 'tn-1',
    title: 'TEST TUNISIE',
    description: 'Smartphone performant avec écran Super AMOLED 120Hz. Idéal pour la photo et les réseaux sociaux.',
    originalPrice: 1499,
    discountedPrice: 1249,
    discountPercent: 17,
    category: 'tech',
    shopName: 'Tunisianet',
    shopUrl: 'https://facebook.com/Tunisianet.com.tn',
    location: 'Tunis, Tunisie',
    distance: 0,
    postedAt: new Date(),
    isVerified: true,
    imageUrl: 'https://p1.tunisianet.com.tn/7000-large_default/smartphone-samsung-galaxy-a54-5g-8-go-256-go-noir.jpg',
  },
  {
    id: 'tn-2',
    title: 'PC Portable HP Victus 15',
    description: 'PC Gaming avec processeur i5 et carte graphique RTX 3050. Performance garantie pour le jeu.',
    originalPrice: 3200,
    discountedPrice: 2850,
    discountPercent: 11,
    category: 'tech',
    shopName: 'Mytek',
    shopUrl: 'https://facebook.com/Mytek.tn',
    location: 'Ariana, Tunisie',
    distance: 0,
    postedAt: new Date(),
    isVerified: true,
    imageUrl: 'https://v5.tunisianet.com.tn/82334-large_default/pc-portable-gamer-hp-victus-15-fa0007nk-i5-12e-gen-8-go-rtx-3050.jpg',
  },
  {
    id: 'tn-3',
    title: 'Machine à Café Delonghi EC230',
    description: 'Savourez un espresso italien parfait. Design compact et élégant pour votre cuisine.',
    originalPrice: 850,
    discountedPrice: 680,
    discountPercent: 20,
    category: 'home',
    shopName: 'Géant Tunisie',
    shopUrl: 'https://facebook.com/GeantTunisie',
    location: 'Tunis City',
    distance: 0,
    postedAt: new Date(),
    isVerified: true,
    imageUrl: 'https://v5.tunisianet.com.tn/250280-large_default/machine-a-cafe-delonghi-ec230bk-noir.jpg',
  },
  {
    id: 'tn-4',
    title: 'AirPods Pro 2ème Génération',
    description: 'Réduction de bruit active et son spatial. Le meilleur de l audio sans fil.',
    originalPrice: 999,
    discountedPrice: 799,
    discountPercent: 20,
    category: 'tech',
    shopName: 'iStore Tunisie',
    shopUrl: 'https://facebook.com/iStoreTunisie',
    location: 'Lac, Tunis',
    distance: 0,
    postedAt: new Date(),
    isVerified: true,
    imageUrl: 'https://v5.tunisianet.com.tn/262744-large_default/apple-airpods-pro-2eme-generation-avec-boitier-de-charge-magsafe-usb-c.jpg',
  }
];

export const simulateAIExtraction = (rawText: string): { price: number; category: string; discountPercent: number; confidence: number } => {
  const priceMatch = rawText.match(/\$?(\d+(?:,\d{3})*(?:\.\d{2})?)/);
  const price = priceMatch ? parseFloat(priceMatch[1].replace(',', '')) : Math.floor(Math.random() * 500) + 50;
  
  const categories = ['tech', 'fashion', 'home', 'food'];
  const categoryKeywords: Record<string, string[]> = {
    tech: ['phone', 'laptop', 'computer', 'tablet', 'headphones', 'camera', 'drone', 'gaming'],
    fashion: ['jacket', 'shoes', 'dress', 'shirt', 'pants', 'sunglasses', 'sneaker', 'sweater'],
    home: ['furniture', 'lamp', 'rug', 'vacuum', 'decor', 'patio', 'smart home', 'café', 'coffee'],
    food: ['coffee', 'honey', 'cheese', 'truffle', 'beef', 'organic', 'gourmet'],
  };
  
  let detectedCategory = 'tech';
  for (const [cat, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(k => rawText.toLowerCase().includes(k))) {
      detectedCategory = cat;
      break;
    }
  }
  
  const discountMatch = rawText.match(/(\d+)%\s*off/i);
  const discountPercent = discountMatch ? parseInt(discountMatch[1]) : Math.floor(Math.random() * 40) + 10;
  
  return {
    price,
    category: detectedCategory,
    discountPercent,
    confidence: Math.random() * 0.3 + 0.7,
  };
};
