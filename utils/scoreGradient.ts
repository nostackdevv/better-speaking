export function getScoreGradient(score?: number): string {
  if (!score) return "from-slate-400 to-slate-500";
  if (score >= 90) return "from-green-500 to-emerald-600";
  if (score >= 80) return "from-blue-500 to-cyan-600";
  if (score >= 70) return "from-yellow-500 to-amber-600";
  if (score >= 60) return "from-orange-500 to-orange-600";
  return "from-red-500 to-rose-600";
}

export function getScorePillColor(score?: number): string {
  if (!score) return "#64748b"; // slate-500
  if (score >= 90) return "#16a34a"; // green-600
  if (score >= 80) return "#2563eb"; // blue-600
  if (score >= 70) return "#d97706"; // amber-600
  if (score >= 60) return "#f97316"; // orange-500
  return "#dc2626"; // red-500
}
