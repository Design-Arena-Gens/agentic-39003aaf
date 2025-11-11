import type { Expense } from "@/data/dashboard";

import { formatCurrency, formatFullDate } from "@/lib/formatters";

type ExpenseTableProps = {
  items: Expense[];
};

const statusStyles: Record<string, string> = {
  Cleared: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Pending: "bg-amber-50 text-amber-700 border-amber-100",
};

export function ExpenseTable({ items }: ExpenseTableProps) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white shadow-lg shadow-neutral-100/30">
      <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
        <div>
          <h2 className="text-base font-semibold text-neutral-900">
            Recent activity
          </h2>
          <p className="text-sm text-neutral-500">
            A snapshot of spending over the last 30 days.
          </p>
        </div>
        <button className="hidden rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-300 hover:text-neutral-900 sm:block">
          Export
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-100 text-sm">
          <thead className="text-xs uppercase tracking-wide text-neutral-400">
            <tr>
              <th className="px-6 py-3 text-left">Merchant</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Method</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-6 py-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {items.map((expense) => (
              <tr key={expense.id} className="hover:bg-neutral-50/80">
                <td className="px-6 py-4">
                  <div className="font-medium text-neutral-900">
                    {expense.merchant}
                  </div>
                  {expense.note && (
                    <div className="text-xs text-neutral-500">
                      {expense.note}
                    </div>
                  )}
                </td>
                <td className="px-4 py-4 text-neutral-600">
                  {expense.category}
                </td>
                <td className="px-4 py-4 text-neutral-500">{expense.method}</td>
                <td className="px-4 py-4 text-neutral-600">
                  {formatFullDate(expense.date)}
                </td>
                <td className="px-4 py-4 text-right font-semibold text-neutral-900">
                  {formatCurrency(expense.amount)}
                </td>
                <td className="px-6 py-4 text-right">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[expense.status]}`}
                  >
                    {expense.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
