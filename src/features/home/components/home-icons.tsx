import { Brain, Map, RefreshCw, User } from 'lucide-react';

const FEATURE_ICONS = [Brain, User, Map, RefreshCw] as const;

export function FeatureIcon({ index }: { index: number }) {
  const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length];
  return <Icon className="size-5" aria-hidden strokeWidth={1.75} />;
}
