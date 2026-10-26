"use client";

import { BarChart3, BookUser, MessageSquare, Newspaper } from "lucide-react";

const items = [
  { id: "feed", label: "Feed", icon: Newspaper },
  { id: "spinger", label: "Spinger", icon: BookUser },
  { id: "chat", label: "Chat", icon: MessageSquare },
  { id: "insights", label: "Insights", icon: BarChart3 },
] as const;

export function BottomNav({ active = "spinger" }: { active?: string }) {
  return (
    <nav className="shrink-0 border-t border-zinc-200 bg-white px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1.5">
      <ul className="grid grid-cols-4">
        {items.map(({ id, label, icon: Icon }) => {
          const isActive = id === active;
          return (
            <li key={id}>
              <button
                type="button"
                className={`flex w-full flex-col items-center gap-0.5 rounded-lg py-1.5 text-[11px] font-medium transition-colors ${
                  isActive ? "text-blue-600" : "text-zinc-400"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${isActive ? "stroke-[2.25]" : ""}`}
                />
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
