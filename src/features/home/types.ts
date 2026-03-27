export interface HomeDestination {
  name: string;
  country: string;
  hook: string;
  tag: string;
  color: string;
  emoji: string;
  /** Full-bleed card image (Stitch / editorial) */
  imageUrl?: string;
  /** Small chips above title, e.g. duration / vibe */
  badges?: string[];
}

export interface HowItWorksStep {
  num: string;
  icon: string;
  title: string;
  body: string;
}

export interface HomeStat {
  to: number;
  suffix: string;
  label: string;
}

export interface HomeTestimonial {
  quote: string;
  name: string;
  city: string;
}

export interface HomeFeatureItem {
  title: string;
  body: string;
}
