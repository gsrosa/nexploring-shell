export interface HomeCarouselDestination {
  name: string;
  country: string;
  hook: string;
  tags: readonly string[];
  img: string;
}

export const HOME_DESTINATIONS_CAROUSEL: HomeCarouselDestination[] = [
  {
    name: 'Patagonia',
    country: 'Chile / Argentina',
    hook: 'Where the wind writes your itinerary.',
    tags: ['Remote', 'Trekking'],
    img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=70&auto=format&fit=crop',
  },
  {
    name: 'Iceland',
    country: 'Iceland',
    hook: 'Fire, ice, and shoulder-season silence.',
    tags: ['Adventure', 'Wild'],
    img: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=400&q=70&auto=format&fit=crop',
  },
  {
    name: 'Azores',
    country: 'Portugal',
    hook: "Europe's volcanic secret. Still undiscovered.",
    tags: ['Island', 'Authentic'],
    img: 'https://images.unsplash.com/photo-1555629151-5abe5c6b0ad6?w=400&q=70&auto=format&fit=crop',
  },
  {
    name: 'Scottish Highlands',
    country: 'Scotland',
    hook: "Solitude with scenery you can't fake.",
    tags: ['Nature', 'Slow travel'],
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=70&auto=format&fit=crop',
  },
  {
    name: 'Norwegian Fjords',
    country: 'Norway',
    hook: "The world's best argument for slow travel.",
    tags: ['Fjords', 'Scenic'],
    img: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=70&auto=format&fit=crop',
  },
  {
    name: 'New Zealand',
    country: 'South Island',
    hook: 'Adventure that needs no filter.',
    tags: ['Outdoors', 'Epic'],
    img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=70&auto=format&fit=crop',
  },
  {
    name: 'Costa Rica',
    country: 'Central America',
    hook: 'Dense jungle. Zero compromises.',
    tags: ['Nature', 'Bio'],
    img: 'https://images.unsplash.com/photo-1518182170546-07661fd94144?w=400&q=70&auto=format&fit=crop',
  },
  {
    name: 'Kyoto',
    country: 'Japan',
    hook: 'Japan without the queues.',
    tags: ['Culture', 'Off-grid'],
    img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=70&auto=format&fit=crop',
  },
];
