import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Building2, LogOut, Menu, ShieldAlert, X } from "lucide-react";
import { useAuth } from "../auth/AuthProvider";
import { COLLECTIONS, COLLECTION_GROUPS } from "../lib/collections";
import { SUBMISSIONS } from "../lib/forms";
import { Button, Card, cn } from "./ui";

type NavItem = { to: string; label: string; end?: boolean };
type NavSection = { title: string; items: NavItem[] };

const NAV_SECTIONS: NavSection[] = [
  { title: "Listings", items: [{ to: "/", label: "Properties", end: true }] },
  ...COLLECTION_GROUPS.map((group) => ({
    title: group,
    items: COLLECTIONS.filter((c) => c.group === group).map((c) => ({
      to: `/c/${c.slug}`,
      label: c.labelPlural,
    })),
  })),
  { title: "Page copy", items: [{ to: "/content", label: "Site content", end: true }] },
  {
    title: "Submissions",
    items: SUBMISSIONS.map((s) => ({ to: `/inbox/${s.slug}`, label: s.labelPlural })),
  },
];

export function Layout() {
  const { session, isAdmin, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const email = session?.user.email ?? "";

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-line bg-surface/85 backdrop-blur">
        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            {isAdmin && (
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="grid size-9 place-items-center rounded-lg border border-line-strong text-muted md:hidden"
                aria-label="Toggle menu"
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            )}
            <span className="flex items-center gap-2 font-semibold">
              <span className="grid size-8 place-items-center rounded-lg bg-purple">
                <Building2 className="size-5 text-white" />
              </span>
              Estatein CMS
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted sm:inline">{email}</span>
            <Button variant="dark" onClick={() => void signOut()}>
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Sign out</span>
            </Button>
          </div>
        </div>
      </header>

      {!isAdmin ? (
        <main className="px-4 py-8">
          <NotAuthorized email={email} />
        </main>
      ) : (
        <div className="flex">
          {/* Sidebar */}
          <Sidebar open={open} onNavigate={() => setOpen(false)} />
          {/* Backdrop for mobile drawer */}
          {open && (
            <div
              className="fixed inset-0 top-[57px] z-10 bg-black/50 md:hidden"
              onClick={() => setOpen(false)}
            />
          )}
          <main className="min-w-0 flex-1 px-4 py-8 md:px-8">
            <div className="mx-auto max-w-5xl">
              <Outlet />
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

function Sidebar({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  return (
    <aside
      className={cn(
        "z-20 w-60 shrink-0 border-r border-line bg-surface",
        "fixed inset-y-0 top-[57px] overflow-y-auto pb-10 transition-transform md:sticky md:top-[57px] md:h-[calc(100vh-57px)] md:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
      )}
    >
      <nav className="flex flex-col gap-6 p-4">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title}>
            <p className="mb-1.5 px-2 text-xs font-semibold uppercase tracking-wide text-muted">
              {section.title}
            </p>
            <div className="flex flex-col">
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    cn(
                      "rounded-[var(--radius-btn)] px-2 py-1.5 text-sm transition-colors",
                      isActive
                        ? "bg-elevated font-medium text-fg"
                        : "text-muted hover:bg-elevated/50 hover:text-fg",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}

function NotAuthorized({ email }: { email: string }) {
  const snippet = `insert into public.admins (user_id, email)
select id, email from auth.users
where email = '${email || "you@example.com"}';`;

  return (
    <div className="mx-auto max-w-xl">
      <Card>
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-elevated">
            <ShieldAlert className="size-5 text-purple-light" />
          </span>
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="text-lg font-semibold">Account not authorized yet</h1>
              <p className="mt-1 text-sm text-muted">
                You are signed in as <span className="text-fg">{email}</span>, but this
                account is not on the admin allowlist, so writes are blocked by Row Level
                Security. Add it once by running this in the Supabase SQL editor:
              </p>
            </div>
            <pre className="overflow-x-auto rounded-[var(--radius-btn)] border border-line-strong bg-bg p-3 text-xs text-purple-light">
              {snippet}
            </pre>
            <p className="text-xs text-muted">Then reload this page.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
