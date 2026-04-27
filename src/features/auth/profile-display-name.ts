import type { RouterOutputs } from '@/trpc/types';

type ProfileRow = RouterOutputs['users']['me']['profile'];

export const profileDisplayName = (profile: ProfileRow | null | undefined): string => {
  if (!profile) return 'Account';
  const dn = profile.display_name?.trim();
  if (dn) return dn;
  const parts = [profile.first_name, profile.last_name].filter(Boolean).join(' ').trim();
  if (parts) return parts;
  return profile.email ?? 'Account';
};
