import type { RecurringPayment } from "@/data/dashboard";

import { formatCurrency, formatShortDate } from "@/lib/formatters";

type RecurringListProps = {
  items: RecurringPayment[];
};

export function RecurringList({ items }: RecurringListProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm shadow-neutral-100">
      <header className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-neutral-800">
            Upcoming payments
          </h3>
          <p className="text-sm text-neutral-500">
            Monitor recurring expenses before they hit.
          </p>
        </div>
        <span className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
          Next 30 days
        </span>
      </header>
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.name}
            className="flex items-center justify-between rounded-xl border border-neutral-100 bg-neutral-50/80 px-3 py-2.5 text-sm"
          >
            <div>
              <p className="font-medium text-neutral-800">{item.name}</p>
              <p className="text-xs text-neutral-500">
                {item.category} · {item.method}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-neutral-900">
                {formatCurrency(item.amount)}
              </p>
              <p className="text-xs text-neutral-500">
                {formatShortDate(item.nextDue)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
