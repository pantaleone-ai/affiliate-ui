import React from 'react';
import { ShoppingCart, Star, ExternalLink } from 'lucide-react';
import { Product } from '@/lib/fetchProducts';
import { siteConfig } from '@/site.config';
import { cn } from '@/lib/utils'; // Assuming you have a utils file, if not I'll inline the logic or use template literals

// Simple utility if you don't have clsx/tailwind-merge set up yet
function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isSale = product.originalPrice > product.price;
  
  // Dynamic color mapping for the button
  const themeColors = {
    emerald: 'bg-emerald-700 hover:bg-emerald-800 text-white',
    blue: 'bg-blue-600 hover:bg-blue-700 text-white',
    rose: 'bg-rose-600 hover:bg-rose-700 text-white',
    amber: 'bg-amber-600 hover:bg-amber-700 text-white',
    indigo: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    stone: 'bg-stone-800 hover:bg-stone-900 text-white',
  };
  
  const btnClass = themeColors[siteConfig.themeColor] || themeColors.emerald;

  return (
    <div className="group relative flex flex-col rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-100">
      {/* Badge Overlay */}
      {product.badge && (
        <div className="absolute left-3 top-3 z-10 rounded-full bg-black/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
          {product.badge}
        </div>
      )}

      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          // Fallback for the demo if Unsplash source is slow
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/e2e8f0/1e293b?text=Product';
          }}
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-5">
        {/* Rating */}
        <div className="mb-2 flex items-center gap-1 text-yellow-500">
          <Star className="h-3.5 w-3.5 fill-current" />
          <span className="text-xs font-medium text-gray-600">
            {product.rating.toFixed(1)} <span className="text-gray-400">({product.reviews})</span>
          </span>
        </div>

        <h3 className="mb-2 text-base font-bold leading-tight text-gray-900 line-clamp-2 group-hover:text-emerald-700 transition-colors">
          {product.title}
        </h3>

        <div className="mt-auto pt-4">
          <div className="mb-4 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
            {isSale && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className={classNames(
              "flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold shadow-sm transition-all focus:ring-2 focus:ring-offset-2",
              btnClass
            )}
          >
            <ShoppingCart className="h-4 w-4" />
            Check Price
          </a>
        </div>
      </div>
    </div>
  );
}
