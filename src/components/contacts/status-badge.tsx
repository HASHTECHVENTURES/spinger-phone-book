import type { SpingerStatus } from "@/data/contacts";

const labels: Record<SpingerStatus, { text: string; className: string }> = {
  on: {
    text: "On Spinger",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
  off: {
    text: "Not on Spinger",
    className: "bg-orange-50 text-orange-700 ring-orange-200",
  },
  invited: {
    text: "Invite sent",
    className: "bg-amber-50 text-amber-700 ring-amber-200",
  },
};

export function StatusBadge({ status }: { status: SpingerStatus }) {
  const label = labels[status];

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${label.className}`}
    >
      {label.text}
    </span>
  );
}
