export const HOME_PRECISION_BULLETS = [
  {
    title: 'Terrain-aware routing',
    body: 'Routes factor in elevation, trail conditions, and what is realistic for your timeline and fitness level.',
  },
  {
    title: 'Group-adaptive intelligence',
    body: 'Solo? Safety scores and single-friendly spots. Couple? Romantic hideaways. Family? Kid logistics, stroller access, nap-time buffers.',
  },
  {
    title: 'Live itinerary sync',
    body: 'Update one element — a flight, a hotel, an activity — and Atlas cascades the change through your whole trip.',
  },
] as const;

export const HOME_PRECISION_DAYS = [
  { day: 'Day 1', title: 'Reykjavík arrival', tag: 'Urban' },
  { day: 'Day 2', title: 'Golden Circle route', tag: 'Scenic' },
  { day: 'Day 3', title: 'Landmannalaugar trek', tag: 'Adventure' },
] as const;
