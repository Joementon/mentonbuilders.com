"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Clock,
  FileText,
  Eye,
  Lock,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Status = "DONE" | "IN PROGRESS" | "PROPOSAL" | "FOR REVIEW";

interface Deliverable {
  title: string;
  status: Status;
  content: React.ReactNode;
}

interface Session {
  date: string;
  label: string;
  deliverables: Deliverable[];
}

/* ------------------------------------------------------------------ */
/*  Session Data — add new sessions by pushing to this array           */
/* ------------------------------------------------------------------ */

const sessions: Session[] = [
  {
    date: "2026-04-09",
    label: "Session: Apr 9, 2026 — P0 Fixes, Proposals & Architecture",
    deliverables: [
      {
        title: "Employee Roster Fix",
        status: "DONE",
        content: (
          <div className="space-y-3">
            <p>
              <strong>Problem:</strong> EmployeesView read from the{" "}
              <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-teal-300">
                profiles
              </code>{" "}
              table (4 users) instead of the{" "}
              <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-teal-300">
                employees
              </code>{" "}
              table (21 people). Melissa reported no employees visible.
            </p>
            <p>
              <strong>Fix:</strong> Created{" "}
              <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-teal-300">
                useEmployees
              </code>{" "}
              hook, switched EmployeesView to the employees table, added{" "}
              <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-teal-300">
                lead
              </code>{" "}
              role badge.
            </p>
            <p className="text-sm text-slate-400">
              <strong>Files changed:</strong>{" "}
              <code>lib/hooks/useEmployees.ts</code> (new),{" "}
              <code>components/ops/EmployeesView.tsx</code>,{" "}
              <code>lib/types.ts</code>
            </p>
          </div>
        ),
      },
      {
        title: "Tyler Aguilar Record Fix",
        status: "DONE",
        content: (
          <div className="space-y-3">
            <p>
              <strong>Problem:</strong> Two duplicate entries &mdash;
              &ldquo;Tyler A.&rdquo; and &ldquo;Ruben T. Aguilar&rdquo; were
              the same person.
            </p>
            <p>
              <strong>Fix:</strong> Updated &ldquo;Tyler A.&rdquo; &rarr;
              &ldquo;Tyler Aguilar&rdquo; with{" "}
              <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-teal-300">
                legal_name
              </code>{" "}
              &ldquo;Reuben Tyler Aguilar&rdquo; for QBO exports. Marked
              duplicate inactive. Added{" "}
              <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-teal-300">
                legal_name
              </code>{" "}
              column to employees table.
            </p>
            <p className="text-sm text-slate-400">
              <strong>Migrations:</strong>{" "}
              <code>20260409180000_add_legal_name.sql</code>,{" "}
              <code>20260409180001_fix_tyler_aguilar_records.sql</code>
            </p>
          </div>
        ),
      },
      {
        title: "Activity Code Icons",
        status: "DONE",
        content: (
          <div className="space-y-3">
            <p>
              <strong>Feedback:</strong> &ldquo;We would like to add an icon for
              job codes to help employees find codes easier.&rdquo;
            </p>
            <p>
              <strong>Fix:</strong> Added Lucide icons to all 62 activity codes.
              Icons appear in CodeSheet, Timecards, and QuickTimecard. Searchable
              code sheet with icon badges.
            </p>
            <p className="text-sm text-slate-400">
              <strong>Files:</strong>{" "}
              <code>lib/activityIcons.tsx</code> (new),{" "}
              <code>components/ops/modules/CodeSheet.tsx</code>,{" "}
              <code>Timecards.tsx</code>, <code>QuickTimecard.tsx</code>
            </p>
          </div>
        ),
      },
      {
        title: "Lunch Break Persistence",
        status: "DONE",
        content: (
          <div className="space-y-3">
            <p>
              <strong>Bug:</strong> Lunch break selection (None / 30 / 60 min)
              was shown in the UI but <strong>never saved to the database</strong>
              . Every submitted timecard lost lunch data.
            </p>
            <p>
              <strong>Fix:</strong> Added{" "}
              <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-teal-300">
                lunch_minutes
              </code>{" "}
              column to timecards table. Updated hooks and both timecard forms to
              persist the value.
            </p>
            <p className="text-sm text-slate-400">
              <strong>Migration:</strong>{" "}
              <code>20260410000001_add_lunch_column.sql</code>
            </p>
          </div>
        ),
      },
      {
        title: "BillingReport Rewrite",
        status: "DONE",
        content: (
          <div className="space-y-3">
            <p>
              <strong>Bug:</strong> BillingReport.tsx showed hardcoded fake data
              (&ldquo;24 hours&rdquo;, &ldquo;Mar 1-14, 2026&rdquo;). Admins
              could mistake it for real numbers.
            </p>
            <p>
              <strong>Fix:</strong> Complete rewrite &mdash; now queries real
              Supabase data filtered by job + date range. Added preset buttons:
            </p>
            <ul className="ml-4 list-disc space-y-1 text-slate-300">
              <li>This Week</li>
              <li>Last Week</li>
              <li>Last 2 Weeks</li>
              <li>This Month</li>
              <li>Last Month</li>
            </ul>
          </div>
        ),
      },
      {
        title: "California Overtime Calculation",
        status: "DONE",
        content: (
          <div className="space-y-3">
            <p>
              <strong>Problem:</strong> Only weekly OT (&gt;40 hrs) was
              calculated. Missing California daily OT (&gt;8 hrs at 1.5x) and
              double-time (&gt;12 hrs at 2x).
            </p>
            <p>
              <strong>Fix:</strong> Created{" "}
              <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-teal-300">
                calculateCaliforniaOT()
              </code>{" "}
              utility. Compares daily vs weekly method, picks whichever benefits
              the employee more. Color-coded bar charts in MyHours
              (green/amber/red). OT breakdown in admin billing.
            </p>
            <p className="text-sm text-slate-400">
              <strong>Files:</strong> <code>lib/overtime.ts</code> (new),{" "}
              <code>components/ops/MyHours.tsx</code>,{" "}
              <code>components/ops/AdminPanel.tsx</code>
            </p>
          </div>
        ),
      },
      {
        title: "Travel / Per-Diem Double-Count Fix",
        status: "DONE",
        content: (
          <div className="space-y-3">
            <p>
              <strong>Bug:</strong> When an employee had multiple activity codes
              per day, travel and per-diem days were counted per row instead of
              per unique date.
            </p>
            <p>
              <strong>Fix:</strong> Deduplicate by date using{" "}
              <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-teal-300">
                Set
              </code>{" "}
              before counting.
            </p>
          </div>
        ),
      },
      {
        title: "Activity Code Enforcement Proposal",
        status: "FOR REVIEW",
        content: (
          <div className="space-y-3">
            <p>
              <strong>Recommendation:</strong> End-of-day entry, NOT clock-in.
              Workers don&rsquo;t know codes at 7 AM.
            </p>
            <p>
              <strong>Key feature:</strong> Lead &ldquo;submit for crew&rdquo;
              mode &mdash; Tyler / Chad / Laban / Logan can batch-enter for their
              whole team.
            </p>
            <p>
              <strong>Enforcement rules:</strong>
            </p>
            <ul className="ml-4 list-disc space-y-1 text-slate-300">
              <li>
                <strong>Hard-enforce:</strong> codes present + hours match
              </li>
              <li>
                <strong>Soft-enforce:</strong> duplicates and late submissions
              </li>
              <li>
                <strong>Never enforce:</strong> specific codes or notes
              </li>
            </ul>
          </div>
        ),
      },
      {
        title: "Offline-First Architecture Proposal",
        status: "FOR REVIEW",
        content: (
          <div className="space-y-3">
            <p>
              <strong>Library:</strong> Dexie.js v4 for IndexedDB
            </p>
            <p>
              <strong>Strategy:</strong> INSERT-only offline (no edit conflicts).
              Cache jobs / employees / codes locally. Queue timecard submissions
              for sync when connection returns.
            </p>
            <p>
              <strong>Ported from:</strong> senior-center-timesheets sync queue
              with Supabase adapter.
            </p>
            <p className="text-sm text-slate-400">
              <strong>Saved to:</strong> <code>OFFLINE_PROPOSAL.md</code>
            </p>
          </div>
        ),
      },
      {
        title: "UX Simplicity Audit",
        status: "FOR REVIEW",
        content: (
          <div className="space-y-3">
            <p>
              <strong>Finding:</strong> 11-15 taps to submit a basic timecard
              (industry standard: 2-6).
            </p>
            <ul className="ml-4 list-disc space-y-1 text-slate-300">
              <li>Touch targets below 44px on almost everything</li>
              <li>62-item dropdown with no search at point of entry</li>
              <li>No progressive disclosure &mdash; 16 form elements shown at once</li>
            </ul>
            <p>
              <strong>Top quick wins:</strong>
            </p>
            <ul className="ml-4 list-disc space-y-1 text-slate-300">
              <li>Auto-fill hours</li>
              <li>Searchable code picker</li>
              <li>48px touch targets</li>
            </ul>
          </div>
        ),
      },
      {
        title: "Permission Tiers Proposal",
        status: "FOR REVIEW",
        content: (
          <div className="space-y-3">
            <p>
              <strong>Based on:</strong> Melissa&rsquo;s email defining who
              should have what access.
            </p>
            <p>
              <strong>4 tiers:</strong>
            </p>
            <ul className="ml-4 list-disc space-y-1 text-slate-300">
              <li>
                <strong>Admin</strong> &mdash; Joe / Melissa / Aimee
              </li>
              <li>
                <strong>Office</strong> &mdash; Miskel
              </li>
              <li>
                <strong>Lead</strong> &mdash; Tyler / Chad / Laban / Logan
              </li>
              <li>
                <strong>Crew</strong> &mdash; everyone else
              </li>
            </ul>
            <p>
              Full permission matrix: 30+ actions across 4 roles. Industry
              research compared to Procore, Buildertrend, and ClockShark. 5 open
              questions for Joe.
            </p>
          </div>
        ),
      },
      {
        title: "Agent Council Design",
        status: "FOR REVIEW",
        content: (
          <div className="space-y-3">
            <p>
              5-agent audit council designed to verify all 22 &ldquo;actioned&rdquo;
              feedback items work in the real world.
            </p>
            <p>
              <strong>Agents:</strong>
            </p>
            <ul className="ml-4 list-disc space-y-1 text-slate-300">
              <li>
                <strong>Construction Specialist</strong> &mdash; domain reality
              </li>
              <li>
                <strong>Playwright Tester</strong> &mdash; technical QA
              </li>
              <li>
                <strong>QA Chief</strong> &mdash; adversarial red-team
              </li>
              <li>
                <strong>Accessibility Auditor</strong> &mdash; mobile / field UX
              </li>
              <li>
                <strong>Data Integrity Auditor</strong> &mdash; data layer
              </li>
            </ul>
            <p>
              Each covers a different angle to ensure nothing slips through the
              cracks.
            </p>
          </div>
        ),
      },
      {
        title: "Employees Without Accounts Design",
        status: "DONE",
        content: (
          <div className="space-y-3">
            <p>
              <strong>Issue:</strong> Not every employee will have an app account.
              Miskel Menton (office) is in the system for scheduling and reporting
              but does not log in or submit timecards.
            </p>
            <p>
              <strong>Design decision:</strong> The{" "}
              <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-teal-300">
                employees
              </code>{" "}
              table is the <strong>permanent</strong> roster. The{" "}
              <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-teal-300">
                profiles
              </code>{" "}
              table is auth-only. The{" "}
              <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-teal-300">
                auth_user_id
              </code>{" "}
              field is nullable by design.
            </p>
            <p>
              <strong>UI:</strong> Employees without accounts show a subtle
              &ldquo;no account&rdquo; badge so admins can see at a glance who
              still needs setup.
            </p>
            <p>
              <strong>Corrected comments:</strong> Removed incorrect &ldquo;switch
              back to profiles later&rdquo; comments. The employees table will
              never be replaced.
            </p>
          </div>
        ),
      },
      {
        title: "App-Building Dashboard",
        status: "DONE",
        content: (
          <div className="space-y-3">
            <p>
              <strong>What:</strong> This page. A password-protected internal
              dashboard at{" "}
              <code className="rounded bg-slate-700 px-1.5 py-0.5 text-sm text-teal-300">
                mentonbuilders.com/app-building-dashboard
              </code>{" "}
              for Joe and Samuel to review all app development deliverables.
            </p>
            <p>
              <strong>Features:</strong> Session date selector, expandable
              accordion sections per deliverable, status badges, dark theme,
              desktop-only layout. Password-protected with case-insensitive gate.
            </p>
            <p>
              <strong>Design:</strong> Easy to extend &mdash; future sessions are
              added by pushing to a single array. All content is structured HTML,
              not markdown.
            </p>
          </div>
        ),
      },
      {
        title: "Hierarchy to Intelligence Strategic Analysis",
        status: "IN PROGRESS",
        content: (
          <div className="space-y-3">
            <p>
              <strong>Concept:</strong> Applying Samuel&rsquo;s &ldquo;Hierarchy
              to Intelligence&rdquo; framework to Menton Builders &mdash; using AI
              agents as middle management, artifacting every decision, and building
              a system that learns and grows.
            </p>
            <ul className="ml-4 list-disc space-y-1 text-slate-300">
              <li>
                Every session produces artifacts (code, proposals, dashboards)
                that compound over time
              </li>
              <li>
                The feedback table captures user input; agent councils verify
                implementation; the dashboard makes it legible
              </li>
              <li>
                Permission tiers enforce organizational structure that used to
                require a manager
              </li>
              <li>
                This pattern is productizable: install AI-powered operations at
                any small business for $160/hr
              </li>
            </ul>
            <p className="text-sm text-slate-400">
              Full analysis being produced by strategy council. Will be added when
              complete.
            </p>
          </div>
        ),
      },
    ],
  },
  // Add future sessions here:
  // {
  //   date: "2026-04-16",
  //   label: "Session: Apr 16, 2026 — ...",
  //   deliverables: [ ... ],
  // },
];

/* ------------------------------------------------------------------ */
/*  Status Badge                                                       */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status: Status }) {
  const base = "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide";

  switch (status) {
    case "DONE":
      return (
        <span className={`${base} bg-emerald-900/50 text-emerald-300`}>
          <CheckCircle2 size={14} /> Done
        </span>
      );
    case "IN PROGRESS":
      return (
        <span className={`${base} bg-amber-900/50 text-amber-300`}>
          <Clock size={14} /> In Progress
        </span>
      );
    case "PROPOSAL":
      return (
        <span className={`${base} bg-blue-900/50 text-blue-300`}>
          <FileText size={14} /> Proposal
        </span>
      );
    case "FOR REVIEW":
      return (
        <span className={`${base} bg-blue-900/50 text-blue-300`}>
          <Eye size={14} /> For Review
        </span>
      );
  }
}

/* ------------------------------------------------------------------ */
/*  Accordion Item                                                     */
/* ------------------------------------------------------------------ */

function AccordionItem({
  deliverable,
  index,
  isOpen,
  toggle,
}: {
  deliverable: Deliverable;
  index: number;
  isOpen: boolean;
  toggle: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-700/50 bg-slate-800/60">
      <button
        onClick={toggle}
        className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-slate-700/30"
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-700 text-xs font-bold text-slate-300">
          {index + 1}
        </span>
        {isOpen ? (
          <ChevronDown size={18} className="shrink-0 text-teal-400" />
        ) : (
          <ChevronRight size={18} className="shrink-0 text-slate-500" />
        )}
        <span className="flex-1 text-sm font-medium text-slate-100 sm:text-base">
          {deliverable.title}
        </span>
        <StatusBadge status={deliverable.status} />
      </button>
      {isOpen && (
        <div className="border-t border-slate-700/40 px-5 py-4 text-sm leading-relaxed text-slate-300">
          {deliverable.content}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function AppBuildingDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [selectedSession, setSelectedSession] = useState(sessions.length - 1);
  const [openSections, setOpenSections] = useState<Set<number>>(new Set());

  const session = sessions[selectedSession];

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password.toLowerCase() === "321menton!") {
      setAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0F172A]">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl border border-slate-700/50 bg-slate-800/80 p-8 shadow-2xl"
        >
          <div className="mb-6 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-900/50">
              <Lock size={28} className="text-teal-400" />
            </div>
          </div>
          <h2 className="mb-1 text-center text-lg font-bold text-white">
            Menton Builders
          </h2>
          <p className="mb-6 text-center text-sm text-slate-400">
            Enter password to access the dashboard
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(false);
            }}
            placeholder="Password"
            className="mb-3 w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            autoFocus
          />
          {passwordError && (
            <p className="mb-3 text-sm text-red-400">
              Incorrect password. Please try again.
            </p>
          )}
          <button
            type="submit"
            className="w-full rounded-lg bg-teal-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    );
  }

  function toggleSection(idx: number) {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  function expandAll() {
    setOpenSections(
      new Set(session.deliverables.map((_, i) => i))
    );
  }

  function collapseAll() {
    setOpenSections(new Set());
  }

  const doneCount = session.deliverables.filter((d) => d.status === "DONE").length;
  const reviewCount = session.deliverables.filter(
    (d) => d.status === "FOR REVIEW" || d.status === "PROPOSAL"
  ).length;

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100">
      {/* Mobile warning */}
      <div className="block p-8 text-center md:hidden">
        <p className="text-lg font-semibold text-amber-400">
          Desktop Only
        </p>
        <p className="mt-2 text-sm text-slate-400">
          This dashboard is designed for desktop viewing. Please open it on a
          larger screen.
        </p>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:block">
        {/* Header */}
        <header className="border-b border-slate-700/50 bg-slate-900/80 px-8 py-6">
          <h1 className="font-serif text-2xl font-bold tracking-tight text-white lg:text-3xl">
            Menton Builders{" "}
            <span className="text-teal-400">&mdash;</span>{" "}
            <span className="font-sans text-xl font-normal text-slate-300 lg:text-2xl">
              App Development Dashboard
            </span>
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Internal review portal for app development deliverables
          </p>
        </header>

        {/* Session selector */}
        <div className="border-b border-slate-700/30 bg-slate-900/40 px-8 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="mr-1 text-xs font-semibold uppercase tracking-widest text-slate-500">
              Sessions
            </span>
            {sessions.map((s, i) => (
              <button
                key={s.date}
                onClick={() => {
                  setSelectedSession(i);
                  setOpenSections(new Set());
                }}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  selectedSession === i
                    ? "bg-teal-700 text-white shadow-lg shadow-teal-900/40"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Summary bar */}
        <div className="flex items-center gap-6 border-b border-slate-700/20 bg-slate-900/20 px-8 py-3">
          <span className="text-xs text-slate-500">
            <strong className="text-emerald-400">{doneCount}</strong> completed
          </span>
          <span className="text-xs text-slate-500">
            <strong className="text-blue-400">{reviewCount}</strong> awaiting
            review
          </span>
          <span className="text-xs text-slate-500">
            <strong className="text-slate-300">
              {session.deliverables.length}
            </strong>{" "}
            total deliverables
          </span>
          <div className="ml-auto flex gap-2">
            <button
              onClick={expandAll}
              className="rounded bg-slate-800 px-3 py-1 text-xs text-slate-400 transition-colors hover:bg-slate-700 hover:text-slate-200"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="rounded bg-slate-800 px-3 py-1 text-xs text-slate-400 transition-colors hover:bg-slate-700 hover:text-slate-200"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Deliverables */}
        <main className="mx-auto max-w-5xl space-y-3 px-8 py-8">
          {session.deliverables.map((d, i) => (
            <AccordionItem
              key={`${session.date}-${i}`}
              deliverable={d}
              index={i}
              isOpen={openSections.has(i)}
              toggle={() => toggleSection(i)}
            />
          ))}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-700/30 px-8 py-6 text-center text-xs text-slate-600">
          Last updated: April 9, 2026 &mdash; Menton Builders Internal
        </footer>
      </div>
    </div>
  );
}
