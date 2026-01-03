import { type LucideIcon, Tent, Flame, Compass, Mountain } from 'lucide-react';

export interface SiteConfig {
  nicheName: string;
  siteTitle: string;
  themeColor: 'emerald' | 'blue' | 'rose' | 'amber' | 'indigo'; // Restrict for type safety/Tailwind mapping
  affiliateTag: string;
  keywords: string[];
  heroHeadline: string;
  heroSubheadline: string;
}

export const siteConfig: SiteConfig = {
  nicheName: "Wilderness Gear",
  siteTitle: "Top Camping Equipment Deals",
  themeColor: "emerald",
  affiliateTag: "camping-20",
  keywords: ["Tents", "Sleeping Bags", "Camping Stoves", "Hiking Backpacks"],
  heroHeadline: "Survive the Wild in Comfort",
  heroSubheadline: "Curated deals on the best camping and hiking gear, updated daily.",
};
