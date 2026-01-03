import { unstable_cache } from 'next/cache';

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice: number; // Added for "Deal" visualization
  image: string;
  rating: number; // 1-5
  reviews: number;
  badge?: string; // e.g. "Best Seller"
  affiliateLink: string;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function _fetchRawProducts(keyword: string): Promise<Product[]> {
  await delay(300); 

  return Array.from({ length: 4 }).map((_, i) => {
    const isSale = Math.random() > 0.5;
    const price = Math.floor(Math.random() * 300) + 50;
    
    return {
      id: `${keyword.toLowerCase().replace(/\s/g, '-')}-${i}`,
      title: `${keyword} - ${['Pro Series', 'Ultra', 'Expedition', 'Lite'][i]} Edition`,
      price: price,
      originalPrice: isSale ? Math.floor(price * 1.2) : price,
      // Using specific Unsplash keywords for better placeholder visuals
      image: `https://source.unsplash.com/600x400/?${encodeURIComponent(keyword.split(' ')[1] || 'outdoor')}&sig=${i}`,
      rating: 4 + Math.random(),
      reviews: Math.floor(Math.random() * 500) + 10,
      badge: i === 0 ? "Top Rated" : isSale ? "Save 20%" : undefined,
      affiliateLink: `https://example.com/buy?k=${encodeURIComponent(keyword)}`,
    };
  });
}

export const getProductsByKeyword = unstable_cache(
  async (keyword: string) => _fetchRawProducts(keyword),
  ['product-keywords-v2'], 
  { revalidate: 86400, tags: ['products'] }
);
