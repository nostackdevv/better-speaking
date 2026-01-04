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
  if (score >= 90) return "#22c55e"; // green-500
  if (score >= 80) return "#3b82f6"; // blue-500
  if (score >= 70) return "#eab308"; // yellow-500
  if (score >= 60) return "#f97316"; // orange-500
  return "#ef4444"; // red-500
}
