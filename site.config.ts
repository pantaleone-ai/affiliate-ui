export interface SiteConfig {
  nicheName: string;
  siteTitle: string;
  themeColor: 'emerald' | 'blue' | 'rose' | 'amber' | 'indigo' | 'stone'; 
  affiliateTag: string;
  keywords: string[];
  heroHeadline: string;
  heroSubheadline: string;
  heroImage: string; // Added for the visual upgrade
}

export const siteConfig: SiteConfig = {
  nicheName: "Wilderness Gear",
  siteTitle: "Premium Outdoor Equipment",
  themeColor: "emerald", // Deep forest green vibe
  affiliateTag: "camping-20",
  keywords: ["Ultralight Tents", "4-Season Sleeping Bags", "Portable Camp Stoves", "Tactical Backpacks"],
  heroHeadline: "Answer the Call of the Wild",
  heroSubheadline: "Equip yourself with professional-grade gear for your next expedition. Curated deals, updated daily.",
  heroImage: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2070&auto=format&fit=crop", // A real stunning camping shot
};
