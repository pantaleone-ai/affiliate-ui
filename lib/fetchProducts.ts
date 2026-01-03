import { unstable_cache } from 'next/cache';

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  affiliateLink: string;
}

// Simulated database/API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Internal function that performs the "expensive" fetch
async function _fetchRawProducts(keyword: string): Promise<Product[]> {
  await delay(500); // Simulate network latency

  // Generate 4 deterministic mock products based on the keyword
  return Array.from({ length: 4 }).map((_, i) => ({
    id: `${keyword.toLowerCase().replace(/\s/g, '-')}-${i + 1}`,
    title: `Premium ${keyword} - Model ${String.fromCharCode(65 + i)}`,
    price: Math.floor(Math.random() * 200) + 50 + (i * 20),
    image: `https://placehold.co/600x400/222/FFF?text=${encodeURIComponent(keyword)}+${i + 1}`,
    affiliateLink: `https://example.com/buy?k=${encodeURIComponent(keyword)}&ref=affiliate_tag`,
  }));
}

// Public cached function (ISR)
// The 'revalidate' option in the third argument sets the ISR duration (in seconds).
export const getProductsByKeyword = unstable_cache(
  async (keyword: string) => {
    return _fetchRawProducts(keyword);
  },
  ['product-keywords'], // Cache key parts
  {
    revalidate: 86400, // 24 Hours in seconds
    tags: ['products'], // For on-demand revalidation if needed later
  }
);
