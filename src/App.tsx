import { useEffect, useMemo, useState } from "react";

/* ---------- tiny inline icon set (no extra packages) ---------- */
const Icon = {
  dashboard: (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 13h8V3H3v10zm10 8h8v-6h-8v6zM3 21h8v-6H3v6zm10-8h8V3h-8v10z" />
    </svg>
  ),
  tasks: (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 11l3 3L22 4M2 7h6M2 13h6M2 19h6" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V22a2 2 0 01-4 0v-.07a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 005 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.07A1.65 1.65 0 005 8a1.65 1.65 0 00-.33-1.82l-.06-.06A2 2 0 017.44 3.3l.06.06A1.65 1.65 0 009.32 3h.07A1.65 1.65 0 0011 1.49V1a2 2 0 014 0v.07A1.65 1.65 0 0016.68 3h.07a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9c.94 0 1.6.76 1.6 1.7V13.3c0 .94-.66 1.7-1.6 1.7z"/>
    </svg>
  ),
  chevronDown: (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9l6 6 6-6" />
    </svg>
  ),
};

/* ---------- theme toggle with localStorage ---------- */
function useDarkMode() {
  const [dark, setDark] = useState<boolean>(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return { dark, toggle: () => setDark((d) => !d) };
}

/* ---------- reusable UI bits ---------- */
function Badge({ tone, children }: { tone: "success" | "warning" | "muted"; children: React.ReactNode }) {
  const cls = {
    success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
    warning: "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300",
    muted: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  }[tone];
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${cls}`}>{children}</span>;
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/40 backdrop-blur px-5 py-4 shadow-sm hover:shadow-md transition">
      <div className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</div>
      <div className="mt-1 text-3xl font-semibold tracking-tight">{value}</div>
    </div>
  );
}

/* ---------- layout ---------- */
function Navbar() {
  const { dark, toggle } = useDarkMode();
  const link =
    "px-3 py-2 rounded-md text-sm font-medium text-white/90 hover:bg-white/10 transition";
  return (
    <header className="sticky top-0 z-40 shadow-sm">
      <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
          <div className="font-extrabold tracking-tight text-white">AMS Frontend</div>
          <nav className="ml-auto flex items-center gap-1">
            <a className={link} href="#/dashboard">{Icon.dashboard}</a>
            <a className={link} href="#/tasks">{Icon.tasks}</a>
            <a className={link} href="#/settings">{Icon.settings}</a>
            <button onClick={toggle} className="ml-2 rounded-md bg-white/15 px-3 py-2 text-sm font-semibold text-white hover:bg-white/25">
              {dark ? "Light" : "Dark"}
            </button>
            <button className="ml-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-indigo-600 hover:bg-slate-100">
              Sign in
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

function Sidebar() {
  const item =
    "flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 transition";
  return (
    <aside className="hidden md:block border-r border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/30 backdrop-blur">
      <div className="sticky top-[64px] p-3">
        <div className="text-[11px] uppercase tracking-wide font-semibold text-slate-500 dark:text-slate-400 mb-2">Navigation</div>
        <nav className="space-y-1">
          <a className={item} href="#/dashboard">{Icon.dashboard}<span>Overview</span></a>
          <a className={item} href="#/tasks">{Icon.tasks}<span>My Tasks</span></a>
          <a className={item} href="#/reviews">{Icon.settings}<span>Review Queue</span></a>
          <a className={item} href="#/teams">{Icon.settings}<span>Teams</span></a>
        </nav>
      </div>
    </aside>
  );
}

/* ---------- page ---------- */
export default function App() {
  const rows = useMemo(
    () => [
      { user: "Alice", action: "Submitted report", when: "2h ago", status: "Pending" as const },
      { user: "Bob", action: "Reviewed task #431", when: "4h ago", status: "Approved" as const },
      { user: "Zara", action: "Commented on AMS UI", when: "yesterday", status: "—" as const },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <div className="mx-auto grid max-w-6xl md:grid-cols-[240px,1fr]">
        <Sidebar />
        <main className="p-4 md:p-8 grid gap-8">
          {/* hero strip */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/70 bg-white/70 dark:bg-slate-900/40 backdrop-blur p-6 shadow-sm flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Welcome back 👋</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">Here’s an overview of what’s happening today.</p>
            </div>
            <button className="hidden md:inline-flex items-center gap-1 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-2 text-sm font-semibold shadow hover:shadow-md transition">
              Create Task {Icon.chevronDown}
            </button>
          </div>

          {/* stats */}
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Stat label="Submissions" value={12} />
            <Stat label="Pending Reviews" value={4} />
            <Stat label="On-time Rate" value="92%" />
          </section>

          {/* activity */}
          <section className="rounded-2xl border border-slate-200/80 dark:border-slate-800/70 bg-white/70 dark:bg-slate-900/40 backdrop-blur shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200/80 dark:border-slate-800/70">
              <h2 className="text-sm font-semibold">Recent Activity</h2>
            </div>
            <div className="p-5 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-500 dark:text-slate-400">
                    <th className="py-2 pr-4">User</th>
                    <th className="py-2 pr-4">Action</th>
                    <th className="py-2 pr-4">When</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {rows.map((r, i) => (
                    <tr key={i} className={i % 2 ? "bg-slate-50/60 dark:bg-slate-900/20" : ""}>
                      <td className="py-2 pr-4">{r.user}</td>
                      <td className="py-2 pr-4">{r.action}</td>
                      <td className="py-2 pr-4">{r.when}</td>
                      <td className="py-2">
                        {r.status === "Approved" ? (
                          <Badge tone="success">Approved</Badge>
                        ) : r.status === "Pending" ? (
                          <Badge tone="warning">Pending</Badge>
                        ) : (
                          <Badge tone="muted">—</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
