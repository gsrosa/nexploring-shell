import type { LucideIcon } from 'lucide-react';
import { Brain, MessageSquare, RotateCcw } from 'lucide-react';

export interface HomeHowStep {
  n: string;
  icon: LucideIcon;
  title: string;
  body: string;
}

export const HOME_HOW_STEPS: HomeHowStep[] = [
  {
    n: '01',
    icon: MessageSquare,
    title: 'Describe your trip',
    body: 'Destination, travel dates, style. Rough ideas are fine — Atlas asks follow-up questions to build your profile.',
  },
  {
    n: '02',
    icon: Brain,
    title: 'AI builds your itinerary',
    body: 'Complete day-by-day plans with routes, accommodation, activities, and estimated costs — in seconds.',
  },
  {
    n: '03',
    icon: RotateCcw,
    title: 'Edit anything, anytime',
    body: 'Change one element and Atlas reshuffles the rest. Your plan stays coherent even when your plans change.',
  },
];
