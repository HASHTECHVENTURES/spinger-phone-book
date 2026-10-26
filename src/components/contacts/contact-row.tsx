"use client";

import type { ReactNode } from "react";
import { MessageCircle, Phone, UserPlus } from "lucide-react";
import { getInitials, type Contact } from "@/data/contacts";
import { StatusBadge } from "./status-badge";

type ContactRowProps = {
  contact: Contact;
  expanded: boolean;
  onToggle: () => void;
  onInvite: () => void;
};

export function ContactRow({
  contact,
  expanded,
  onToggle,
  onInvite,
}: ContactRowProps) {
  return (
    <li className="border-b border-zinc-100 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-zinc-50 active:bg-zinc-100"
      >
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
          style={{ backgroundColor: contact.avatarColor }}
          aria-hidden
        >
          {getInitials(contact.name)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <p className="truncate text-[15px] font-semibold text-zinc-900">
              {contact.name}
            </p>
            <StatusBadge status={contact.status} />
          </div>
          <p className="mt-0.5 truncate text-[13px] text-zinc-500">
            {contact.phone}
            {contact.company ? ` · ${contact.company}` : ""}
          </p>
        </div>

        {!expanded && (
          <div
            className="flex shrink-0 items-center gap-1.5"
            onClick={(event) => event.stopPropagation()}
          >
            <ActionIcon label={`Call ${contact.name}`} href={`tel:${contact.phone}`}>
              <Phone className="h-4 w-4" />
            </ActionIcon>
            <ActionIcon
              label={`Message ${contact.name}`}
              href={`sms:${contact.phone}`}
            >
              <MessageCircle className="h-4 w-4" />
            </ActionIcon>
            {(contact.status === "off" || contact.status === "invited") && (
              <button
                type="button"
                onClick={onInvite}
                aria-label={
                  contact.status === "invited"
                    ? `Resend invite to ${contact.name}`
                    : `Invite ${contact.name} to Spinger`
                }
                className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100"
              >
                <UserPlus className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </button>

      {expanded && (
        <div className="flex gap-2 px-4 pb-3">
          <a
            href={`tel:${contact.phone}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-zinc-900 px-3 py-2.5 text-sm font-medium text-white"
          >
            <Phone className="h-4 w-4" />
            Call
          </a>
          <a
            href={`sms:${contact.phone}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm font-medium text-zinc-800"
          >
            <MessageCircle className="h-4 w-4" />
            Message
          </a>
          {(contact.status === "off" || contact.status === "invited") && (
            <button
              type="button"
              onClick={onInvite}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-blue-500 bg-white px-3 py-2.5 text-sm font-medium text-blue-600"
            >
              <UserPlus className="h-4 w-4" />
              {contact.status === "invited" ? "Resend" : "Invite"}
            </button>
          )}
        </div>
      )}
    </li>
  );
}

function ActionIcon({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors hover:bg-zinc-200"
    >
      {children}
    </a>
  );
}
