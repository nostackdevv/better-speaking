export const ARCHETYPES = {
  PRO: { label: 'The Pro Speaker', color: '#16a34a' }, // green-600
  STORYTELLER: { label: 'The Storyteller', color: '#2563eb' }, // blue-600
  CASUAL: { label: 'The Casual Speaker', color: '#d97706' }, // amber-600
  HESITATOR: { label: 'The Hesitator', color: '#f97316' }, // orange-500
  ROOKIE: { label: 'The Rookie', color: '#dc2626' }, // red-500
};

export const getArchetype = (score: number) => {
  if (score >= 90) return ARCHETYPES.PRO;
  if (score >= 80) return ARCHETYPES.STORYTELLER;
  if (score >= 70) return ARCHETYPES.CASUAL;
  if (score >= 55) return ARCHETYPES.HESITATOR;
  return ARCHETYPES.ROOKIE;
};
