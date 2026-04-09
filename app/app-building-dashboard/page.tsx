"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Clock,
  FileText,
  Eye,
  Lock,
  Check,
  X,
  MessageSquare,
  Mic,
  MicOff,
  Square,
  Play,
  Pause,
  AlertTriangle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Status = "DONE" | "IN PROGRESS" | "PROPOSAL" | "FOR REVIEW";
type Decision = "approved" | "rejected" | "approved_with_notes";

interface QuestionItem {
  id: string;
  text: string;
}

interface Approval {
  decision: Decision;
  commentary_text?: string;
  audio_base64?: string;
  reviewer_name?: string;
  created_at: string;
  savedToDb?: boolean;
}

interface QuestionResponse {
  answer: "yes" | "no" | "notes" | null;
  commentary?: string;
}

interface Deliverable {
  title: string;
  status: Status;
  content: React.ReactNode;
  questions?: QuestionItem[];
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
        questions: [
          {
            id: "q1",
            text: "Should leads be able to submit receipts, or only admins?",
          },
          {
            id: "q2",
            text: "Should leads be able to approve/attest timecards, or should all approvals require admin sign-off?",
          },
          {
            id: "q3",
            text: "Should the 'foreman' role be retired and replaced with 'lead'?",
          },
          {
            id: "q4",
            text: "Should crew members see coworkers' names/phone numbers on shared jobs?",
          },
          {
            id: "q5",
            text: "Should the Office role be able to export job data?",
          },
        ],
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
        status: "DONE",
        content: (
          <div className="space-y-4">
            <p className="text-sm italic text-slate-400">
              Strategic context document prepared by the Strategy Council
            </p>

            <h4 className="text-base font-bold text-teal-300">
              1. The Thesis Applied to Menton Builders
            </h4>
            <p>
              Joe Menton is the intelligence bottleneck. He knows which jobs are
              profitable, which crews are lagging, which change orders are
              outstanding. None of that knowledge is externalized. The app is
              systematically distributing that intelligence outward:
            </p>
            <ul className="ml-4 list-disc space-y-1 text-slate-300">
              <li>
                <strong>Timecards as intelligence distribution:</strong> Structured
                data replaces Joe&rsquo;s memory. Activity codes make labor costs
                queryable. Attestation creates legal records automatically.
              </li>
              <li>
                <strong>RLS as organizational intelligence:</strong> The 4-tier role
                system (admin/office/lead/crew) enforces who-decides-what at the
                database level &mdash; no manager required.
              </li>
              <li>
                <strong>Offline-first as edge intelligence:</strong> Each crew
                member&rsquo;s device becomes an autonomous node that captures,
                validates, and queues data without any network connection.
              </li>
            </ul>
            <p>
              <strong>Where humans stay essential:</strong> Client relationships,
              craft decisions (&ldquo;engineered lumber or stick frame?&rdquo;),
              and safety judgment. The app externalizes information synthesis, not
              expertise.
            </p>

            <h4 className="mt-4 text-base font-bold text-teal-300">
              2. Artifacting Everything = The Learning System
            </h4>
            <p>
              Every session produces permanent artifacts that compound over time:
            </p>
            <ul className="ml-4 list-disc space-y-1 text-slate-300">
              <li>
                The Architecture Proposal (700 lines) captures every design
                decision and why
              </li>
              <li>
                The feedback table converts unstructured user input into
                queryable, actionable records
              </li>
              <li>
                The audit_log is an append-only record of every data change
                &mdash; patterns emerge over time
              </li>
              <li>
                Memory files persist institutional knowledge across sessions and
                devices
              </li>
              <li>
                This dashboard itself is an artifact &mdash; a living record of
                decisions and rationale
              </li>
            </ul>
            <p>
              <strong>The compounding effect:</strong> Each session builds on an
              increasingly well-documented foundation. The client gets more
              effective hours per hour billed as the engagement matures.
            </p>

            <h4 className="mt-4 text-base font-bold text-teal-300">
              3. Mini AGI at the Core
            </h4>
            <ul className="ml-4 list-disc space-y-1 text-slate-300">
              <li>
                <strong>FeedbackWidget = input layer:</strong> Captures unstructured
                human intelligence and converts to structured records
              </li>
              <li>
                <strong>Audit triggers = passive monitoring:</strong> Always watching,
                always recording, never invoked manually
              </li>
              <li>
                <strong>RLS policies = policy enforcement:</strong> Every operation
                evaluated against role-based rules without human intervention
              </li>
              <li>
                <strong>Sync queue = resilience layer:</strong> System functions even
                when central authority is unreachable
              </li>
              <li>
                <strong>5-agent council = multi-perspective verification:</strong>{" "}
                No single point of failure in quality assessment
              </li>
            </ul>

            <h4 className="mt-4 text-base font-bold text-teal-300">
              4. The Productizable Pattern
            </h4>
            <p>
              What&rsquo;s being built for Menton Builders is a{" "}
              <strong>template for AI-powered small business operations</strong>,
              instantiated in a construction context. The pattern:
            </p>
            <ol className="ml-4 list-decimal space-y-1 text-slate-300">
              <li>Capture all decisions as artifacts</li>
              <li>Use the database schema as the intelligence layer</li>
              <li>Build for the edge, not the center</li>
              <li>Wire a feedback loop</li>
              <li>Dashboard the whole thing</li>
            </ol>
            <p>
              A landscaping company, restaurant group, or property management firm
              all have the same underlying problem: intelligence centralized in the
              owner&rsquo;s head. This package gets sold to the next client in half
              the time at the same price.
            </p>

            <h4 className="mt-4 text-base font-bold text-teal-300">
              5. What&rsquo;s Still Missing
            </h4>
            <ul className="ml-4 list-disc space-y-1 text-slate-300">
              <li>
                <strong>Analytical layer:</strong> Pattern detection, anomaly
                detection, cost variance alerts (requires 6+ months of data)
              </li>
              <li>
                <strong>Generative layer:</strong> AI reading structured data and
                producing natural language recommendations
              </li>
              <li>
                <strong>Weekly AI digest:</strong> Monday 6am synthesis of anomalies,
                corrections, and budget trends
              </li>
              <li>
                <strong>Audit_log as training signal:</strong> Corrections become a
                dataset for operational intelligence
              </li>
            </ul>
            <p className="text-sm text-slate-400">
              The architectural decision to capture everything now &mdash; even
              before the analytical layer exists &mdash; is correct. The data is
              being created. The intelligence layer gets built on top once the
              artifacts exist.
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
  const base =
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide";

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
/*  Audio Recorder                                                     */
/* ------------------------------------------------------------------ */

interface AudioRecorderProps {
  onRecordingComplete: (base64: string) => void;
}

function AudioRecorder({ onRecordingComplete }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const MAX_SECONDS = 300; // 5 minutes

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRecording(false);
  }, []);

  useEffect(() => {
    if (isRecording && elapsed >= MAX_SECONDS) {
      stopRecording();
    }
  }, [elapsed, isRecording, stopRecording]);

  async function startRecording() {
    setError(null);
    setAudioUrl(null);
    chunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "audio/mp4";
      const recorder = new MediaRecorder(stream, { mimeType });

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);

        // Convert to base64
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = (reader.result as string).split(",")[1];
          onRecordingComplete(base64);
        };
        reader.readAsDataURL(blob);

        // Stop all tracks
        stream.getTracks().forEach((t) => t.stop());
      };

      recorder.start(250);
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setElapsed(0);

      timerRef.current = setInterval(() => {
        setElapsed((s) => s + 1);
      }, 1000);
    } catch (err) {
      setError("Microphone access denied or unavailable.");
      console.error(err);
    }
  }

  function formatTime(s: number) {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  }

  function togglePlayback() {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }

  return (
    <div className="space-y-3">
      {error && <p className="text-sm text-red-400">{error}</p>}

      {!isRecording && !audioUrl && (
        <button
          type="button"
          onClick={startRecording}
          className="flex items-center gap-2 rounded-lg border border-teal-700/50 bg-teal-900/30 px-4 py-2.5 text-sm font-medium text-teal-300 transition-colors hover:bg-teal-900/50"
        >
          <Mic size={16} />
          Record Audio Note
        </button>
      )}

      {isRecording && (
        <div className="flex items-center gap-3 rounded-lg border border-red-700/40 bg-red-900/20 px-4 py-2.5">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
          <span className="text-sm font-mono text-red-300">
            {formatTime(elapsed)} / {formatTime(MAX_SECONDS)}
          </span>
          <button
            type="button"
            onClick={stopRecording}
            className="ml-auto flex items-center gap-1.5 rounded bg-red-800/60 px-3 py-1.5 text-xs font-medium text-red-200 transition-colors hover:bg-red-700/60"
          >
            <Square size={12} />
            Stop
          </button>
        </div>
      )}

      {audioUrl && (
        <div className="flex items-center gap-3 rounded-lg border border-teal-700/30 bg-teal-900/20 px-4 py-2.5">
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />
          <button
            type="button"
            onClick={togglePlayback}
            className="flex items-center gap-1.5 rounded bg-teal-800/60 px-3 py-1.5 text-xs font-medium text-teal-200 transition-colors hover:bg-teal-700/60"
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            {isPlaying ? "Pause" : "Play"}
          </button>
          <span className="text-xs text-teal-400">Recording ready ({formatTime(elapsed)})</span>
          <button
            type="button"
            onClick={() => {
              setAudioUrl(null);
              setElapsed(0);
            }}
            className="ml-auto flex items-center gap-1 text-xs text-slate-500 transition-colors hover:text-slate-300"
          >
            <MicOff size={12} />
            Re-record
          </button>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Question Item (for individual yes/no decisions)                   */
/* ------------------------------------------------------------------ */

interface QuestionRowProps {
  question: QuestionItem;
  response: QuestionResponse;
  onChange: (r: QuestionResponse) => void;
}

function QuestionRow({ question, response, onChange }: QuestionRowProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-slate-200">{question.text}</p>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() =>
            onChange({ ...response, answer: response.answer === "yes" ? null : "yes" })
          }
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
            response.answer === "yes"
              ? "bg-emerald-700 text-white"
              : "bg-slate-700/60 text-slate-300 hover:bg-emerald-900/40 hover:text-emerald-300"
          }`}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() =>
            onChange({ ...response, answer: response.answer === "no" ? null : "no" })
          }
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
            response.answer === "no"
              ? "bg-red-700 text-white"
              : "bg-slate-700/60 text-slate-300 hover:bg-red-900/40 hover:text-red-300"
          }`}
        >
          No
        </button>
        <button
          type="button"
          onClick={() =>
            onChange({
              ...response,
              answer: response.answer === "notes" ? null : "notes",
            })
          }
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
            response.answer === "notes"
              ? "bg-amber-700 text-white"
              : "bg-slate-700/60 text-slate-300 hover:bg-amber-900/40 hover:text-amber-300"
          }`}
        >
          Comment
        </button>
      </div>
      {response.answer === "notes" && (
        <textarea
          value={response.commentary || ""}
          onChange={(e) => onChange({ ...response, commentary: e.target.value })}
          placeholder="Your notes on this question..."
          rows={2}
          className="w-full rounded-lg border border-amber-700/30 bg-slate-900/60 px-3 py-2 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40"
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Approval Panel                                                     */
/* ------------------------------------------------------------------ */

interface ApprovalPanelProps {
  deliverableTitle: string;
  sessionDate: string;
  storageKey: string;
}

function ApprovalPanel({
  deliverableTitle,
  sessionDate,
  storageKey,
}: ApprovalPanelProps) {
  const [approval, setApproval] = useState<Approval | null>(() => {
    if (typeof window === "undefined") return null;
    const saved = localStorage.getItem(storageKey);
    return saved ? (JSON.parse(saved) as Approval) : null;
  });

  const [showNotesPanel, setShowNotesPanel] = useState(false);
  const [commentaryText, setCommentaryText] = useState("");
  const [audioBase64, setAudioBase64] = useState<string | null>(null);
  const [reviewerName, setReviewerName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function submitApproval(decision: Decision, notes?: string, audio?: string) {
    setSubmitting(true);
    setSubmitError(null);

    const payload = {
      deliverable_title: deliverableTitle,
      session_date: sessionDate,
      decision,
      commentary_text: notes || undefined,
      audio_blob_base64: audio || undefined,
      reviewer_name: reviewerName || undefined,
    };

    const newApproval: Approval = {
      decision,
      commentary_text: notes,
      audio_base64: audio,
      reviewer_name: reviewerName || undefined,
      created_at: new Date().toISOString(),
      savedToDb: false,
    };

    // Optimistic local save
    localStorage.setItem(storageKey, JSON.stringify(newApproval));
    setApproval(newApproval);
    setShowNotesPanel(false);

    // Post to API route
    try {
      const res = await fetch("/api/dashboard-approval", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const updated = { ...newApproval, savedToDb: true };
        localStorage.setItem(storageKey, JSON.stringify(updated));
        setApproval(updated);
      } else {
        const data = await res.json();
        setSubmitError(
          data.detail || data.error || "Database save failed — approval saved locally."
        );
      }
    } catch {
      setSubmitError("Network error — approval saved locally only.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleApprove() {
    submitApproval("approved");
  }

  function handleReject() {
    submitApproval("rejected");
  }

  function handleSubmitWithNotes() {
    submitApproval(
      "approved_with_notes",
      commentaryText || undefined,
      audioBase64 || undefined
    );
  }

  function handleReset() {
    localStorage.removeItem(storageKey);
    setApproval(null);
    setShowNotesPanel(false);
    setCommentaryText("");
    setAudioBase64(null);
    setReviewerName("");
    setSubmitError(null);
  }

  // Already submitted — show status
  if (approval) {
    return (
      <div className="mt-5 border-t border-slate-700/40 pt-5">
        <div className="flex flex-wrap items-start gap-4">
          <div
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
              approval.decision === "approved"
                ? "bg-emerald-900/50 text-emerald-300"
                : approval.decision === "rejected"
                ? "bg-red-900/50 text-red-300"
                : "bg-amber-900/50 text-amber-300"
            }`}
          >
            {approval.decision === "approved" && <Check size={15} />}
            {approval.decision === "rejected" && <X size={15} />}
            {approval.decision === "approved_with_notes" && <MessageSquare size={15} />}
            {approval.decision === "approved"
              ? "Approved"
              : approval.decision === "rejected"
              ? "Rejected"
              : "Approved with Notes"}
            {approval.savedToDb && (
              <span className="ml-1 rounded bg-slate-700/60 px-1.5 py-0.5 text-xs font-normal text-slate-400">
                saved
              </span>
            )}
          </div>

          {approval.reviewer_name && (
            <span className="text-sm text-slate-500">by {approval.reviewer_name}</span>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="ml-auto text-xs text-slate-600 transition-colors hover:text-slate-400"
          >
            Change decision
          </button>
        </div>

        {approval.commentary_text && (
          <div className="mt-3 rounded-lg border border-amber-700/20 bg-amber-900/10 px-4 py-3">
            <p className="text-sm text-amber-200/80">{approval.commentary_text}</p>
          </div>
        )}

        {submitError && (
          <p className="mt-2 text-xs text-amber-400">{submitError}</p>
        )}
      </div>
    );
  }

  // Not yet submitted
  return (
    <div className="mt-5 border-t border-slate-700/40 pt-5 space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Decision
        </span>
      </div>

      {/* Reviewer name (optional) */}
      <input
        type="text"
        value={reviewerName}
        onChange={(e) => setReviewerName(e.target.value)}
        placeholder="Your name (optional)"
        className="w-64 rounded-lg border border-slate-600/60 bg-slate-900/60 px-3 py-2 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-teal-500/60 focus:ring-1 focus:ring-teal-500/40"
      />

      {/* Main action buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleApprove}
          disabled={submitting}
          className="flex items-center gap-2 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600 disabled:opacity-50"
        >
          <Check size={16} />
          Approve
        </button>

        <button
          type="button"
          onClick={handleReject}
          disabled={submitting}
          className="flex items-center gap-2 rounded-lg bg-red-700/90 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-600 disabled:opacity-50"
        >
          <X size={16} />
          Reject
        </button>

        <button
          type="button"
          onClick={() => setShowNotesPanel((v) => !v)}
          disabled={submitting}
          className="flex items-center gap-2 rounded-lg bg-amber-700/80 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-600 disabled:opacity-50"
        >
          <MessageSquare size={16} />
          Approve with Notes
        </button>
      </div>

      {/* Notes panel */}
      {showNotesPanel && (
        <div className="space-y-4 rounded-xl border border-amber-700/30 bg-amber-900/10 p-4">
          <p className="text-sm font-medium text-amber-300">
            Add commentary or record an audio note:
          </p>
          <textarea
            value={commentaryText}
            onChange={(e) => setCommentaryText(e.target.value)}
            placeholder="Type your notes here..."
            rows={3}
            className="w-full rounded-lg border border-slate-600/60 bg-slate-900/60 px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40"
          />
          <AudioRecorder onRecordingComplete={(b64) => setAudioBase64(b64)} />
          <button
            type="button"
            onClick={handleSubmitWithNotes}
            disabled={submitting}
            className="flex items-center gap-2 rounded-lg bg-amber-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-600 disabled:opacity-50"
          >
            {submitting ? "Saving..." : "Submit Approval with Notes"}
          </button>
        </div>
      )}

      {submitError && (
        <p className="text-xs text-red-400">{submitError}</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Decisions Needed Callout                                           */
/* ------------------------------------------------------------------ */

interface DecisionsNeededProps {
  questions: QuestionItem[];
  storageKey: string;
}

function DecisionsNeeded({ questions, storageKey }: DecisionsNeededProps) {
  const qKey = `${storageKey}__questions`;

  const [responses, setResponses] = useState<Record<string, QuestionResponse>>(() => {
    if (typeof window === "undefined") return {};
    const saved = localStorage.getItem(qKey);
    return saved ? JSON.parse(saved) : {};
  });

  function updateResponse(qId: string, r: QuestionResponse) {
    setResponses((prev) => {
      const next = { ...prev, [qId]: r };
      localStorage.setItem(qKey, JSON.stringify(next));
      return next;
    });
  }

  const answeredCount = Object.values(responses).filter((r) => r.answer !== null).length;

  return (
    <div className="mb-5 rounded-xl border-l-4 border-amber-500 bg-amber-950/30 px-5 py-4">
      <div className="mb-3 flex items-center gap-2">
        <AlertTriangle size={16} className="text-amber-400" />
        <span className="text-sm font-bold uppercase tracking-widest text-amber-400">
          Decisions Needed
        </span>
        <span className="ml-auto text-xs text-amber-500/70">
          {answeredCount}/{questions.length} answered
        </span>
      </div>
      <p className="mb-4 text-xs text-amber-300/70">
        The following questions require Joe&rsquo;s input before implementation can proceed.
      </p>
      <div className="space-y-4">
        {questions.map((q) => (
          <QuestionRow
            key={q.id}
            question={q}
            response={responses[q.id] || { answer: null }}
            onChange={(r) => updateResponse(q.id, r)}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Accordion Item                                                     */
/* ------------------------------------------------------------------ */

function AccordionItem({
  deliverable,
  index,
  isOpen,
  sessionDate,
  toggle,
}: {
  deliverable: Deliverable;
  index: number;
  isOpen: boolean;
  sessionDate: string;
  toggle: () => void;
}) {
  const storageKey = `approval__${sessionDate}__${index}`;

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
          {/* Questions callout — shown before content if this deliverable has them */}
          {deliverable.status === "FOR REVIEW" && deliverable.questions && (
            <DecisionsNeeded
              questions={deliverable.questions}
              storageKey={storageKey}
            />
          )}

          {/* Main content */}
          {deliverable.content}

          {/* Approval panel — only for FOR REVIEW items */}
          {deliverable.status === "FOR REVIEW" && (
            <ApprovalPanel
              deliverableTitle={deliverable.title}
              sessionDate={sessionDate}
              storageKey={storageKey}
            />
          )}
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
    setOpenSections(new Set(session.deliverables.map((_, i) => i)));
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
        <p className="text-lg font-semibold text-amber-400">Desktop Only</p>
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
              sessionDate={session.date}
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
