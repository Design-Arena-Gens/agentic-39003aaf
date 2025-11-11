type BudgetCardProps = {
  category: string;
  spent: number;
  limit: number;
};

export function BudgetCard({ category, spent, limit }: BudgetCardProps) {
  const percent = Math.min(100, Math.round((spent / limit) * 100));

  return (
    <div className="space-y-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm shadow-neutral-100">
      <div className="flex items-center justify-between text-sm font-medium text-neutral-500">
        <span>{category}</span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 rounded-full bg-neutral-200">
        <div
          className="h-full rounded-full bg-neutral-900 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-sm font-medium">
        <span className="text-neutral-900">${spent.toFixed(2)}</span>
        <span className="text-neutral-400">of ${limit.toFixed(2)}</span>
      </div>
    </div>
  );
}
