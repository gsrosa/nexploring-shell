import type { LucideIcon } from 'lucide-react';
import { BrainIcon, MessageSquareIcon, RotateCcwIcon } from 'lucide-react';

export type HomeHowStep = {
  n: string;
  icon: LucideIcon;
  title: string;
  body: string;
};

export const HOME_HOW_STEPS: HomeHowStep[] = [
  {
    n: '01',
    icon: MessageSquareIcon,
    title: 'Describe your trip',
    body: 'Destination, travel dates, style. Rough ideas are fine — Nexploring asks follow-up questions to build your profile.',
  },
  {
    n: '02',
    icon: BrainIcon,
    title: 'AI builds your itinerary',
    body: 'Complete day-by-day plans with routes, accommodation, activities, and estimated costs — in seconds.',
  },
  {
    n: '03',
    icon: RotateCcwIcon,
    title: 'Edit anything, anytime',
    body: 'Change one element and Nexploring reshuffles the rest. Your plan stays coherent even when your plans change.',
  },
];
