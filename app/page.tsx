import { Metadata } from 'next';
import { siteConfig } from '@/site.config';
import { getProductsByKeyword } from '@/lib/fetchProducts';
import { ProductCard } from '@/components/ProductCard';

// 1. SEO Configuration
export const generateMetadata = (): Metadata => {
  return {
    title: siteConfig.siteTitle,
    description: siteConfig.heroSubheadline,
    keywords: siteConfig.keywords,
    openGraph: {
      title: siteConfig.siteTitle,
      description: siteConfig.heroSubheadline,
      siteName: siteConfig.nicheName,
    },
  };
};

export default async function HomePage() {
  // 2. Parallel Data Fetching
  // We fetch all categories in parallel to minimize TTFB (Time to First Byte)
  const productSections = await Promise.all(
    siteConfig.keywords.map(async (keyword) => {
      const products = await getProductsByKeyword(keyword);
      return { keyword, products };
    })
  );

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <section className="relative bg-gray-900 px-6 py-24 text-center sm:px-12 sm:py-32">
        <div className="absolute inset-0 overflow-hidden">
           {/* Abstract background pattern could go here */}
           <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-90" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-4xl space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            {siteConfig.heroHeadline}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300 sm:text-xl">
            {siteConfig.heroSubheadline}
          </p>
        </div>
      </section>

      {/* Product Sections */}
      <div className="mx-auto max-w-7xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">
        {productSections.map(({ keyword, products }) => (
          <section key={keyword} aria-labelledby={`heading-${keyword}`}>
            <div className="mb-8 flex items-center gap-4">
              <h2 
                id={`heading-${keyword}`}
                className="text-3xl font-bold tracking-tight text-gray-900"
              >
                {keyword}
              </h2>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
