"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Mail, Send } from "lucide-react";
import { subscribeNewsletter } from "@/app/actions";

export function NewsletterForm({ placeholder }: { placeholder: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    const res = await subscribeNewsletter(email.trim());
    if (res.ok) {
      setStatus("done");
      setEmail("");
    } else {
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <form
        onSubmit={onSubmit}
        className="flex items-center gap-3 rounded-btn border border-line bg-surface py-1.5 pl-4 pr-2"
      >
        <Mail aria-hidden="true" className="size-5 shrink-0 text-muted" />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Enter your email"
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder-muted outline-none"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          disabled={status === "loading"}
          className="grid size-10 place-items-center rounded-btn text-white transition-colors hover:text-purple-light disabled:opacity-50"
        >
          <Send aria-hidden="true" className="size-6" />
        </button>
      </form>
      {status === "done" && (
        <p className="text-sm text-purple-light">Thanks for subscribing!</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400">Something went wrong. Try again.</p>
      )}
    </div>
  );
}
