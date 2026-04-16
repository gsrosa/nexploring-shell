import { BrainIcon, MapIcon, RefreshCwIcon, UserIcon } from 'lucide-react';

const FEATURE_ICONS = [BrainIcon, UserIcon, MapIcon, RefreshCwIcon] as const;

type FeatureIconProps = {
  index: number;
};

export const FeatureIcon = ({ index }: FeatureIconProps) => {
  const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length];
  return <Icon className="size-5" aria-hidden strokeWidth={1.75} />;
};
