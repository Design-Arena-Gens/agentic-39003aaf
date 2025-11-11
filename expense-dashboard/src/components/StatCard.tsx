import type { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: string;
  helper?: string;
  icon?: ReactNode;
  tone?: "default" | "positive" | "warning";
};

const toneStyles: Record<
  NonNullable<StatCardProps["tone"]>,
  {
    bg: string;
    text: string;
    ring: string;
    muted: string;
    iconBg: string;
    iconRing: string;
  }
> = {
  default: {
    bg: "bg-white",
    text: "text-neutral-900",
    ring: "ring-1 ring-neutral-200",
    muted: "text-neutral-500",
    iconBg: "bg-neutral-900/10",
    iconRing: "ring-neutral-900/10",
  },
  positive: {
    bg: "bg-emerald-50",
    text: "text-emerald-900",
    ring: "ring-1 ring-emerald-100",
    muted: "text-emerald-600",
    iconBg: "bg-emerald-900/10",
    iconRing: "ring-emerald-900/10",
  },
  warning: {
    bg: "bg-amber-50",
    text: "text-amber-900",
    ring: "ring-1 ring-amber-100",
    muted: "text-amber-600",
    iconBg: "bg-amber-900/10",
    iconRing: "ring-amber-900/10",
  },
};

export function StatCard({
  label,
  value,
  helper,
  icon,
  tone = "default",
}: StatCardProps) {
  const styles = toneStyles[tone];

  return (
    <article
      className={`flex flex-col gap-3 rounded-2xl p-6 ${styles.bg} ${styles.text} ${styles.ring}`}
    >
      <div className={`flex items-center gap-3 text-sm font-medium ${styles.muted}`}>
        {icon && (
          <span
            className={`grid h-9 w-9 place-items-center rounded-xl ring-1 ring-inset ${styles.iconBg} ${styles.iconRing}`}
          >
            {icon}
          </span>
        )}
        <span>{label}</span>
      </div>
      <span className="text-3xl font-semibold tracking-tight">{value}</span>
      {helper && (
        <span className={`text-sm font-medium ${styles.muted}`}>{helper}</span>
      )}
    </article>
  );
}
