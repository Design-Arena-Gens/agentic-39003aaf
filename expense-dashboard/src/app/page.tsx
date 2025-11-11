import { BudgetCard } from "@/components/BudgetCard";
import { CategoryBreakdown } from "@/components/CategoryBreakdown";
import { ExpenseTable } from "@/components/ExpenseTable";
import { RecurringList } from "@/components/RecurringList";
import { StatCard } from "@/components/StatCard";
import { budgets, expenses, recurringPayments } from "@/data/dashboard";
import { formatCurrency } from "@/lib/formatters";
import {
  ArrowDownRight,
  Calendar,
  PieChart,
  Plus,
  Wallet,
} from "lucide-react";

export default function Home() {
  const totalSpent = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const clearedSpent = expenses
    .filter((expense) => expense.status === "Cleared")
    .reduce((acc, expense) => acc + expense.amount, 0);
  const pendingAmount = totalSpent - clearedSpent;
  const averagePerDay = totalSpent / 30;

  const budgetLimit = budgets.reduce((acc, item) => acc + item.limit, 0);
  const budgetSpent = budgets.reduce((acc, item) => acc + item.spent, 0);

  const categoryTotals = expenses.reduce(
    (acc, expense) =>
      acc.set(
        expense.category,
        (acc.get(expense.category) ?? 0) + expense.amount,
      ),
    new Map<string, number>(),
  );

  const categoryBreakdown = Array.from(categoryTotals.entries())
    .map(([category, amount]) => ({
      category,
      amount,
      share: totalSpent === 0 ? 0 : amount / totalSpent,
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  const nextRecurring = [...recurringPayments].sort(
    (a, b) => new Date(a.nextDue).getTime() - new Date(b.nextDue).getTime(),
  );

  return (
    <div className="min-h-screen bg-neutral-100 py-12 text-neutral-900">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
        <header className="flex flex-col gap-6 rounded-3xl bg-white p-8 shadow-xl shadow-neutral-200/40 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">
              Dashboard
            </p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Expense overview
            </h1>
            <p className="text-sm text-neutral-500">
              Track monthly spending, stay ahead of recurring payments, and
              watch budget drift in real-time.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:border-neutral-300 hover:text-neutral-900">
              <Calendar className="h-4 w-4" />
              July 2024
            </button>
            <button className="flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800">
              <Plus className="h-4 w-4" />
              Log expense
            </button>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          <StatCard
            label="Month-to-date spend"
            value={formatCurrency(totalSpent)}
            helper="Across all linked accounts"
            icon={<Wallet className="h-4 w-4" />}
          />
          <StatCard
            label="Allocated budget"
            value={`${formatCurrency(budgetSpent)} / ${formatCurrency(budgetLimit)}`}
            helper="Active category budgets"
            tone="positive"
            icon={<PieChart className="h-4 w-4" />}
          />
          <StatCard
            label="Pending clearances"
            value={formatCurrency(pendingAmount)}
            helper={`Avg daily spend ${formatCurrency(averagePerDay)}`}
            tone="warning"
            icon={<ArrowDownRight className="h-4 w-4" />}
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <ExpenseTable items={expenses} />

          <div className="flex flex-col gap-6">
            <CategoryBreakdown data={categoryBreakdown} />
            <RecurringList items={nextRecurring} />
            <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm shadow-neutral-100">
              <header className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900">
                    Budgets at a glance
                  </h3>
                  <p className="text-sm text-neutral-500">
                    Keep critical categories grounded.
                  </p>
                </div>
                <ArrowDownRight className="h-4 w-4 text-neutral-300" />
              </header>
              <div className="space-y-3">
                {budgets.map((budget) => (
                  <BudgetCard
                    key={budget.category}
                    category={budget.category}
                    spent={budget.spent}
                    limit={budget.limit}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
