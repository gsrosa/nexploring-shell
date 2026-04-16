export const CREDIT_COSTS = {
  PLAN_GENERATION: 5,
  PLAN_MODIFY: 3,
} as const;

export const CREDIT_THRESHOLDS = {
  LOW_BALANCE: 10,
} as const;

export const CREDIT_BUNDLES = [
  {
    id: 'starter',
    credits: 20,
    priceCents: 499,
    label: 'Starter',
    description: '~4 trip plans',
    highlight: false,
  },
  {
    id: 'explorer',
    credits: 75,
    priceCents: 999,
    label: 'Explorer',
    description: '~15 trip plans',
    highlight: true,
  },
  {
    id: 'nomad',
    credits: 200,
    priceCents: 1999,
    label: 'Nomad',
    description: '~40 trip plans',
    highlight: false,
  },
] as const;

export type CreditBundle = (typeof CREDIT_BUNDLES)[number];

export const SIGNUP_BONUS_CREDITS = 20;
