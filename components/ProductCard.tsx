import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/fetchProducts';
import { siteConfig } from '@/site.config';

interface ProductCardProps {
  product: Product;
}

// Helper to resolve Tailwind classes dynamically safely
const getButtonColorStyles = (color: string) => {
  // In a real app, define these in tailwind.config.ts safelist or use CSS variables.
  // Using style objects guarantees the color works even if PurgeCSS excludes dynamic class names.
  const colors: Record<string, string> = {
    emerald: '#10b981',
    blue: '#3b82f6',
    rose: '#f43f5e',
    amber: '#f59e0b',
    indigo: '#6366f1',
  };
  return colors[color] || colors.emerald;
};

export function ProductCard({ product }: ProductCardProps) {
  const buttonColor = getButtonColorStyles(siteConfig.themeColor);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
      {/* Image Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-lg font-semibold text-gray-900 line-clamp-2">
          {product.title}
        </h3>
        
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 active:scale-95"
            style={{ backgroundColor: buttonColor }}
            aria-label={`Buy ${product.title}`}
          >
            <ShoppingCart className="h-4 w-4" />
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
}
