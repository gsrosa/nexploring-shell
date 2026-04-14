import type { LucideIcon } from 'lucide-react';
import { Brain, Map, RotateCcw, Users } from 'lucide-react';

export type HomeFeatureAccent = 'primary' | 'auxiliary';

export interface HomeFeatureBlock {
  icon: LucideIcon;
  title: string;
  body: string;
  accent: HomeFeatureAccent;
}

export const HOME_FEATURE_BLOCKS: HomeFeatureBlock[] = [
  {
    icon: Brain,
    title: 'Learns your travel DNA',
    body: 'Your pace, budget, energy levels, and preferences shape every plan. Solo adventurer, couple on a getaway, or family vacation — Atlas adapts to how you actually travel.',
    accent: 'primary',
  },
  {
    icon: Users,
    title: 'Built for every traveler',
    body: 'Solo explorers get safety-first intelligence. Couples get romantic hidden gems. Families get kid-friendly logistics. Every plan fits your group.',
    accent: 'auxiliary',
  },
  {
    icon: Map,
    title: 'Real places, no sponsored lists',
    body: 'Trained on traveler communities, not tourist boards. Expect places you will not find in a magazine or a generic top-10.',
    accent: 'primary',
  },
  {
    icon: RotateCcw,
    title: 'Living itineraries',
    body: 'Change a flight, swap a hotel, skip a day — Atlas recalculates everything downstream. Your plan is always consistent.',
    accent: 'auxiliary',
  },
];
