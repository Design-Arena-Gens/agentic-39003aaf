type CategoryBreakdownProps = {
  data: { category: string; amount: number; share: number }[];
};

export function CategoryBreakdown({ data }: CategoryBreakdownProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm shadow-neutral-100">
      <header>
        <h3 className="text-sm font-semibold text-neutral-900">
          Category breakdown
        </h3>
        <p className="text-sm text-neutral-500">
          How your spending distributes across categories.
        </p>
      </header>
      <ul className="space-y-3">
        {data.map((item) => (
          <li key={item.category} className="flex items-center gap-4">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-neutral-900/5">
              <div
                className="absolute inset-0 rounded-xl bg-neutral-900/80"
                style={{ opacity: Math.max(0.2, item.share) }}
              />
            </div>
            <div className="flex flex-1 flex-col">
              <span className="text-sm font-semibold text-neutral-800">
                {item.category}
              </span>
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <span>{(item.share * 100).toFixed(0)}%</span>
                <span aria-hidden="true">•</span>
                <span>${item.amount.toFixed(2)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
