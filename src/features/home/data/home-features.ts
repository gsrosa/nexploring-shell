import type { LucideIcon } from 'lucide-react';
import { BrainIcon, MapIcon, RotateCcwIcon, UsersIcon } from 'lucide-react';

export type HomeFeatureAccent = 'primary' | 'auxiliary';

export type HomeFeatureBlock = {
  icon: LucideIcon;
  title: string;
  body: string;
  accent: HomeFeatureAccent;
};

export const HOME_FEATURE_BLOCKS: HomeFeatureBlock[] = [
  {
    icon: BrainIcon,
    title: 'Learns your travel DNA',
    body: 'Your pace, budget, energy levels, and preferences shape every plan. Solo adventurer, couple on a getaway, or family vacation — Nexploring adapts to how you actually travel.',
    accent: 'primary',
  },
  {
    icon: UsersIcon,
    title: 'Built for every traveler',
    body: 'Solo explorers get safety-first intelligence. Couples get romantic hidden gems. Families get kid-friendly logistics. Every plan fits your group.',
    accent: 'auxiliary',
  },
  {
    icon: MapIcon,
    title: 'Real places, no sponsored lists',
    body: 'Trained on traveler communities, not tourist boards. Expect places you will not find in a magazine or a generic top-10.',
    accent: 'primary',
  },
  {
    icon: RotateCcwIcon,
    title: 'Living itineraries',
    body: 'Change a flight, swap a hotel, skip a day — Nexploring recalculates everything downstream. Your plan is always consistent.',
    accent: 'auxiliary',
  },
];
