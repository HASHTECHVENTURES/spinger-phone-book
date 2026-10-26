"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import { contacts as seedContacts, type Contact } from "@/data/contacts";
import { BottomNav } from "./bottom-nav";
import { ContactRow } from "./contact-row";

type SourceTab = "mine" | "network";
type SortTab = "recent" | "az" | "not-on";

export function ContactsScreen() {
  const [contacts, setContacts] = useState<Contact[]>(seedContacts);
  const [source, setSource] = useState<SourceTab>("mine");
  const [sort, setSort] = useState<SortTab>("recent");
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(
    seedContacts[0]?.id ?? null,
  );
  const [toast, setToast] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = contacts.filter((contact) => {
      if (!q) return true;
      return (
        contact.name.toLowerCase().includes(q) ||
        contact.phone.toLowerCase().includes(q) ||
        (contact.company?.toLowerCase().includes(q) ?? false)
      );
    });

    if (sort === "not-on") {
      list = list.filter(
        (contact) => contact.status === "off" || contact.status === "invited",
      );
    }

    if (sort === "az") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    // Network tab: people already on Spinger
    if (source === "network") {
      list = list.filter((contact) => contact.status === "on");
    }

    return list;
  }, [contacts, query, sort, source]);

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 2200);
  }

  function handleInvite(id: string) {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id ? { ...contact, status: "invited" } : contact,
      ),
    );
    const name = contacts.find((c) => c.id === id)?.name ?? "Contact";
    showToast(`Invite sent to ${name}`);
  }

  const notOnCount = contacts.filter(
    (c) => c.status === "off" || c.status === "invited",
  ).length;

  return (
    <div className="relative mx-auto flex h-[100dvh] w-full max-w-md flex-col overflow-hidden bg-[#F7F8FA] text-zinc-900 shadow-xl sm:my-6 sm:h-[min(844px,calc(100dvh-3rem))] sm:rounded-[2rem] sm:border sm:border-zinc-200">
      <header className="shrink-0 bg-white px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-[22px] font-bold tracking-tight text-zinc-900">
              Spinger
            </h1>
            <p className="text-[13px] text-zinc-500">
              Your people, one trusted place
            </p>
          </div>
          <div className="flex items-center gap-2 pt-0.5">
            <button
              type="button"
              aria-label="Search"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-600"
              onClick={() =>
                document.getElementById("contact-search")?.focus()
              }
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <button
              type="button"
              aria-label="Add contact"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm shadow-blue-600/25"
              onClick={() => showToast("Add contact coming soon")}
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 rounded-full bg-zinc-100 p-1">
          <SourceButton
            active={source === "mine"}
            onClick={() => setSource("mine")}
          >
            My contacts ({contacts.length})
          </SourceButton>
          <SourceButton
            active={source === "network"}
            onClick={() => setSource("network")}
          >
            Spinger network
          </SourceButton>
        </div>

        <div className="relative mt-3">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            id="contact-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, number or company"
            className="h-10 w-full rounded-xl border border-zinc-200 bg-zinc-50 pr-10 pl-9 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
          <button
            type="button"
            aria-label="Filters"
            className="absolute top-1/2 right-2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-200/60"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 flex items-center gap-1 overflow-x-auto">
          <SortChip
            active={sort === "recent"}
            onClick={() => setSort("recent")}
          >
            Recent
          </SortChip>
          <SortChip active={sort === "az"} onClick={() => setSort("az")}>
            A–Z
          </SortChip>
          <SortChip
            active={sort === "not-on"}
            onClick={() => setSort("not-on")}
          >
            Not on Spinger
            {notOnCount > 0 ? ` (${notOnCount})` : ""}
          </SortChip>
        </div>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <EmptyState
            query={query}
            sort={sort}
            onInviteSearch={() =>
              showToast(
                query
                  ? `Invite link ready for “${query}”`
                  : "Share an invite link",
              )
            }
          />
        ) : (
          <ul className="bg-white">
            {filtered.map((contact) => (
              <ContactRow
                key={contact.id}
                contact={contact}
                expanded={expandedId === contact.id}
                onToggle={() =>
                  setExpandedId((current) =>
                    current === contact.id ? null : contact.id,
                  )
                }
                onInvite={() => handleInvite(contact.id)}
              />
            ))}
          </ul>
        )}
      </main>

      <BottomNav active="spinger" />

      {toast && (
        <div className="pointer-events-none absolute inset-x-4 bottom-20 z-20 flex justify-center">
          <div className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-lg">
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}

function SourceButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-2 text-[13px] font-semibold transition-colors ${
        active
          ? "bg-blue-600 text-white shadow-sm"
          : "bg-transparent text-zinc-500"
      }`}
    >
      {children}
    </button>
  );
}

function SortChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors ${
        active
          ? "bg-zinc-900 text-white"
          : "bg-transparent text-zinc-500 hover:bg-zinc-100"
      }`}
    >
      {children}
    </button>
  );
}

function EmptyState({
  query,
  sort,
  onInviteSearch,
}: {
  query: string;
  sort: SortTab;
  onInviteSearch: () => void;
}) {
  const isNotOn = sort === "not-on";

  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
        <Plus className="h-7 w-7" />
      </div>
      <h2 className="text-base font-semibold text-zinc-900">
        {query
          ? "No match in Spinger"
          : isNotOn
            ? "Everyone here is on Spinger"
            : "No contacts found"}
      </h2>
      <p className="mt-1.5 max-w-xs text-sm text-zinc-500">
        {query
          ? `“${query}” isn’t on Spinger yet. Invite them — we’ll notify you when they join.`
          : isNotOn
            ? "Invite friends from My contacts when they’re missing from the network."
            : "Try another search or invite someone new."}
      </p>
      {(query || !isNotOn) && (
        <button
          type="button"
          onClick={onInviteSearch}
          className="mt-5 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white"
        >
          Invite to Spinger
        </button>
      )}
    </div>
  );
}
