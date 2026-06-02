import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { SectionLabel } from "@/components/site/SectionLabel";

const headerLinkStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.875rem",
  color: "#555555",
  textDecoration: "none",
};

const prose: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "1rem",
  lineHeight: 1.75,
  color: "#333333",
  marginTop: "1rem",
};

const sectionStyle: React.CSSProperties = {
  marginTop: "4rem",
};

const LINKEDIN_URL =
  "https://www.linkedin.com/feed/update/urn:li:activity:7454061504393293824/";

function Collapsible({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #e5e2dc" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "transparent",
          border: "none",
          padding: "1rem 0",
          cursor: "pointer",
          fontFamily: "var(--font-sans)",
          fontSize: "1rem",
          fontWeight: 600,
          color: "#111111",
          textAlign: "left",
        }}
        aria-expanded={open}
      >
        <span>{title}</span>
        <span style={{ color: "#888888", fontWeight: 400, fontSize: "1.25rem", lineHeight: 1 }}>
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.95rem",
            lineHeight: 1.75,
            color: "#555555",
            paddingTop: "0.25rem",
            paddingBottom: "1.25rem",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function LinkedInLink() {
  return (
    <a
      href={LINKEDIN_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={headerLinkStyle}
      className="rt-link"
    >
      ↗ Read the post on LinkedIn
    </a>
  );
}

export function ResumeTailoring() {
  return (
    <div style={{ maxWidth: 740, margin: "0 auto", padding: "2.5rem 2rem 4rem" }}>
      <style>{`
        .rt-link { transition: color 0.15s; }
        .rt-link:hover { text-decoration: underline; }
      `}</style>

      <Link to="/" style={headerLinkStyle} className="rt-link">
        ← Back
      </Link>

      <h1
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "2rem",
          fontWeight: 700,
          color: "#111111",
          lineHeight: 1.2,
          marginTop: "1.5rem",
        }}
      >
        AI Resume Tailoring System
      </h1>

      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.9rem",
          color: "#555555",
          fontStyle: "italic",
          marginTop: "0.75rem",
          lineHeight: 1.6,
        }}
      >
        40+ active applications managed. Per-application tailoring time cut from ~2 hours to ~25 minutes.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginTop: "1.25rem" }}>
        <LinkedInLink />
      </div>

      <hr style={{ border: "none", borderTop: "1px solid #4b2e83", marginTop: "2rem" }} />

      {/* Section 1 */}
      <section style={{ marginTop: "3rem" }}>
        <SectionLabel>The problem</SectionLabel>
        <p style={prose}>
          Job searching at volume is a context management problem. Using AI as a chat tool for 20+ applications collapses: context drifts between sessions, the same keyword decisions get re-debated every time, outputs become inconsistent, and the effort of managing it all comes right back. I reframed the problem: instead of using AI as a tool, I would design a system with memory. The result is a structured workflow that maintains full context across sessions, produces consistent quality-controlled outputs, and tracks every application from queue to submission.
        </p>
      </section>

      {/* Stats SVG */}
      <div style={{ marginTop: "2.5rem" }}>
        <svg viewBox="0 0 740 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" style={{ display: "block" }} fontFamily="'Segoe UI', system-ui, sans-serif">
          <rect width="740" height="100" fill="#ffffff"/>
          <line x1="185" y1="20" x2="185" y2="80" stroke="#e5e2dc" strokeWidth="1"/>
          <line x1="370" y1="20" x2="370" y2="80" stroke="#e5e2dc" strokeWidth="1"/>
          <line x1="555" y1="20" x2="555" y2="80" stroke="#e5e2dc" strokeWidth="1"/>
          <text x="92" y="52" textAnchor="middle" fontSize="32" fontWeight="700" fill="#4b2e83" fontFamily="Georgia, serif">40+</text>
          <text x="92" y="72" textAnchor="middle" fontSize="11" fill="#888888">applications managed</text>
          <text x="277" y="52" textAnchor="middle" fontSize="32" fontWeight="700" fill="#4b2e83" fontFamily="Georgia, serif">~25m</text>
          <text x="277" y="72" textAnchor="middle" fontSize="11" fill="#888888">per application</text>
          <text x="462" y="52" textAnchor="middle" fontSize="32" fontWeight="700" fill="#4b2e83" fontFamily="Georgia, serif">3</text>
          <text x="462" y="72" textAnchor="middle" fontSize="11" fill="#888888">core resume variants</text>
          <text x="647" y="52" textAnchor="middle" fontSize="28" fontWeight="700" fill="#4b2e83" fontFamily="Georgia, serif">2hr→25m</text>
          <text x="647" y="72" textAnchor="middle" fontSize="11" fill="#888888">time saved per app</text>
        </svg>
      </div>

      {/* Section 2 */}
      <section style={sectionStyle}>
        <SectionLabel>What I built</SectionLabel>
        <p style={prose}>
          A persistent context architecture built around a single auto-loaded file: CLAUDE.md. It gives Claude full background at the start of every session: who I am, which companies I have applied to, what keyword decisions have been made, what the tailoring rules are, and what is in the queue. Three core resume variants (Master, TPM, PMT) serve as source-of-truth documents. Each tailoring session handles 2 applications, follows a structured workflow (JD analysis, summary rewrite, competency swap, ATS keyword check, cover letter), and ends with a closing checklist. A Python script manipulates Word document XML directly: unpack the docx zip, edit the XML, repack. Formatting is preserved without touching a GUI.
        </p>
        <div style={{ marginTop: "2rem" }}>
          <svg viewBox="0 0 740 300" xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" style={{ display: "block" }} fontFamily="'Segoe UI', system-ui, sans-serif">
            <rect width="740" height="300" fill="#ffffff"/>
            <text x="370" y="24" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="2" fill="#888888">PERSISTENT CONTEXT ARCHITECTURE</text>
            <rect x="290" y="40" width="160" height="60" rx="8" fill="#f0ecfa" stroke="#4b2e83" strokeWidth="1.5"/>
            <text x="370" y="65" textAnchor="middle" fontSize="11" fontWeight="700" fill="#4b2e83">CLAUDE.md</text>
            <text x="370" y="82" textAnchor="middle" fontSize="9" fill="#4b2e83">Auto-loaded every session</text>
            <line x1="370" y1="100" x2="370" y2="128" stroke="#4b2e83" strokeWidth="1.5"/>
            <polygon points="365,125 375,125 370,133" fill="#4b2e83"/>
            <rect x="260" y="133" width="220" height="60" rx="8" fill="#f7f5f2" stroke="#e5e2dc" strokeWidth="1.5"/>
            <text x="370" y="158" textAnchor="middle" fontSize="11" fontWeight="700" fill="#111111">Tailoring Session</text>
            <text x="370" y="175" textAnchor="middle" fontSize="9" fill="#555555">2 applications · closing checklist</text>
            <line x1="480" y1="163" x2="538" y2="163" stroke="#b7a57a" strokeWidth="1.5"/>
            <polygon points="535,158 545,163 535,168" fill="#b7a57a"/>
            <rect x="545" y="133" width="155" height="60" rx="8" fill="#f7f5f2" stroke="#e5e2dc" strokeWidth="1.5"/>
            <text x="622" y="155" textAnchor="middle" fontSize="11" fontWeight="700" fill="#111111">Tailored Output</text>
            <text x="622" y="171" textAnchor="middle" fontSize="9" fill="#555555">Resume v1 → ATS → v2</text>
            <text x="622" y="184" textAnchor="middle" fontSize="9" fill="#888888">Cover letter · JD saved</text>
            <line x1="260" y1="163" x2="202" y2="163" stroke="#b7a57a" strokeWidth="1.5"/>
            <polygon points="205,158 195,163 205,168" fill="#b7a57a"/>
            <rect x="40" y="133" width="155" height="60" rx="8" fill="#f7f5f2" stroke="#e5e2dc" strokeWidth="1.5"/>
            <text x="117" y="155" textAnchor="middle" fontSize="11" fontWeight="700" fill="#111111">TODO.md</text>
            <text x="117" y="171" textAnchor="middle" fontSize="9" fill="#555555">Status queue · handoffs</text>
            <text x="117" y="184" textAnchor="middle" fontSize="9" fill="#888888">Queued → Applied</text>
            <path d="M117 133 C117 40 290 40 290 40" fill="none" stroke="#4b2e83" strokeWidth="1" strokeDasharray="4,3" opacity="0.6"/>
            <text x="185" y="75" textAnchor="middle" fontSize="9" fill="#4b2e83">updates persist</text>
            <text x="370" y="225" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="1.5" fill="#888888">SOURCE-OF-TRUTH CORE RESUMES</text>
            <rect x="90" y="238" width="160" height="44" rx="6" fill="#f7f5f2" stroke="#e5e2dc" strokeWidth="1"/>
            <text x="170" y="258" textAnchor="middle" fontSize="10" fontWeight="700" fill="#111111">MASTER</text>
            <text x="170" y="273" textAnchor="middle" fontSize="9" fill="#888888">TPM + PM combined</text>
            <rect x="290" y="238" width="160" height="44" rx="6" fill="#f7f5f2" stroke="#e5e2dc" strokeWidth="1"/>
            <text x="370" y="258" textAnchor="middle" fontSize="10" fontWeight="700" fill="#111111">CORE TPM</text>
            <text x="370" y="273" textAnchor="middle" fontSize="9" fill="#888888">Program delivery focus</text>
            <rect x="490" y="238" width="160" height="44" rx="6" fill="#f7f5f2" stroke="#e5e2dc" strokeWidth="1"/>
            <text x="570" y="258" textAnchor="middle" fontSize="10" fontWeight="700" fill="#111111">CORE PMT</text>
            <text x="570" y="273" textAnchor="middle" fontSize="9" fill="#888888">Product strategy focus</text>
            <line x1="370" y1="193" x2="370" y2="236" stroke="#e5e2dc" strokeWidth="1" strokeDasharray="3,2"/>
          </svg>
        </div>
      </section>

      {/* Section 3 */}
      <section style={sectionStyle}>
        <SectionLabel>Key engineering decisions</SectionLabel>
        <div style={{ marginTop: "1rem", borderTop: "1px solid #e5e2dc" }}>
          <Collapsible title="Persistent context via CLAUDE.md">
            The core insight was that an AI session is stateless by default: every new chat starts from zero. The fix was a single markdown file that auto-loads at session start with everything Claude needs: my background, the tailoring rules, the full keyword decision log, the active application queue, and the closing checklist. Sessions pick up exactly where the last one ended. No re-briefing. No drift.
          </Collapsible>
          <Collapsible title="Python XML manipulation for docx editing">
            Word documents are zip archives containing XML files. Instead of using a Word GUI or a library that abstracts the XML away, the system unpacks the zip, edits the XML directly with Python string replacement, and repacks. This preserves all formatting: bold program names, table structures, font sizes, all the things higher-level libraries routinely destroy. The tradeoff: you need to probe the XML first to find run boundaries before replacing.
          </Collapsible>
          <Collapsible title="ATS keyword protocol with pre-flight classification">
            Every tailored resume goes through a Jobscan ATS check before submission. Missing keywords are classified as Natural (safe to add), Stretch (needs approval), or Skip (not defensible in an interview) before anything is written. Naturals are auto-injected. Stretches go through an interactive approval step. Skips are logged and never added. The classification is persisted so the same keyword is never re-debated across different applications.
          </Collapsible>
        </div>
      </section>

      {/* What I learned visual */}
      <div style={{ marginTop: "3rem" }}>
        <svg viewBox="0 0 740 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" style={{ display: "block" }} fontFamily="'Segoe UI', system-ui, sans-serif">
          <rect width="740" height="260" fill="#ffffff"/>
          <text x="370" y="24" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="2" fill="#888888">WHAT CHANGED WHEN I BUILT A SYSTEM</text>
          <rect x="40" y="40" width="310" height="200" rx="8" fill="#fff8f8" stroke="#f0d0d0" strokeWidth="1.5"/>
          <text x="70" y="68" fontSize="10" fontWeight="700" letterSpacing="1.5" fill="#cc4444">WITHOUT A SYSTEM</text>
          <circle cx="62" cy="96" r="7" fill="#f0d0d0"/><text x="62" y="100" textAnchor="middle" fontSize="10" fill="#cc4444">✕</text>
          <text x="78" y="94" fontSize="11" fontWeight="600" fill="#333333">Re-briefing Claude every session</text>
          <text x="78" y="110" fontSize="10" fill="#888888">30 min just to rebuild context</text>
          <circle cx="62" cy="136" r="7" fill="#f0d0d0"/><text x="62" y="140" textAnchor="middle" fontSize="10" fill="#cc4444">✕</text>
          <text x="78" y="134" fontSize="11" fontWeight="600" fill="#333333">Outputs drifting across sessions</text>
          <text x="78" y="150" fontSize="10" fill="#888888">Same keywords re-debated every time</text>
          <circle cx="62" cy="176" r="7" fill="#f0d0d0"/><text x="62" y="180" textAnchor="middle" fontSize="10" fill="#cc4444">✕</text>
          <text x="78" y="174" fontSize="11" fontWeight="600" fill="#333333">No status tracking</text>
          <text x="78" y="190" fontSize="10" fill="#888888">Lost track of what was applied</text>
          <circle cx="62" cy="216" r="7" fill="#f0d0d0"/><text x="62" y="220" textAnchor="middle" fontSize="10" fill="#cc4444">✕</text>
          <text x="78" y="214" fontSize="11" fontWeight="600" fill="#333333">Manual docx formatting breaks</text>
          <text x="78" y="230" fontSize="10" fill="#888888">Every edit risked corrupting the file</text>
          <rect x="390" y="40" width="310" height="200" rx="8" fill="#f4faf5" stroke="#c8e6c9" strokeWidth="1.5"/>
          <text x="420" y="68" fontSize="10" fontWeight="700" letterSpacing="1.5" fill="#2e7d32">WITH THE SYSTEM</text>
          <circle cx="412" cy="96" r="7" fill="#c8e6c9"/><text x="412" y="100" textAnchor="middle" fontSize="10" fill="#2e7d32">✓</text>
          <text x="428" y="94" fontSize="11" fontWeight="600" fill="#333333">CLAUDE.md auto-loads every session</text>
          <text x="428" y="110" fontSize="10" fill="#888888">Full context in under 30 seconds</text>
          <circle cx="412" cy="136" r="7" fill="#c8e6c9"/><text x="412" y="140" textAnchor="middle" fontSize="10" fill="#2e7d32">✓</text>
          <text x="428" y="134" fontSize="11" fontWeight="600" fill="#333333">ATS keyword decisions persisted</text>
          <text x="428" y="150" fontSize="10" fill="#888888">Every Natural/Skip/Stretch logged once</text>
          <circle cx="412" cy="176" r="7" fill="#c8e6c9"/><text x="412" y="180" textAnchor="middle" fontSize="10" fill="#2e7d32">✓</text>
          <text x="428" y="174" fontSize="11" fontWeight="600" fill="#333333">TODO.md tracks every application</text>
          <text x="428" y="190" fontSize="10" fill="#888888">Queued → Tailored → Applied in one file</text>
          <circle cx="412" cy="216" r="7" fill="#c8e6c9"/><text x="412" y="220" textAnchor="middle" fontSize="10" fill="#2e7d32">✓</text>
          <text x="428" y="214" fontSize="11" fontWeight="600" fill="#333333">Python edits XML directly</text>
          <text x="428" y="230" fontSize="10" fill="#888888">Formatting preserved, zero corruption</text>
        </svg>
      </div>

      {/* Section 4 */}
      <section style={sectionStyle}>
        <SectionLabel>What I learned</SectionLabel>
        <p style={prose}>
          Three things. First: the bottleneck in AI-assisted work is not the model, it is the structure around it. Claude with no context produces generic output. Claude with a 2,000-word CLAUDE.md that knows my background, my programs, my tailoring rules, and my keyword history produces work that would take a human hours. The system is the product. Second: persistent memory changes what AI can do. Most people use AI as a smarter search engine: one question, one answer, done. Building a system where decisions accumulate and compound across sessions is a fundamentally different capability. Third: interview defensibility is a hard constraint that most ATS optimization ignores. Adding a keyword you cannot defend in an interview is worse than not having it. The Natural/Stretch/Skip classification was designed specifically to enforce this: the ATS score is not the goal, getting through the interview is.
        </p>
      </section>

      {/* Footer */}
      <div style={{ marginTop: "4rem" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "#888888" }}>
          Tools: Claude · Python · MCP · Markdown · Google Drive
        </p>
        <hr style={{ border: "none", borderTop: "1px solid #e5e2dc", marginTop: "1.5rem" }} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginTop: "1.25rem" }}>
          <LinkedInLink />
        </div>
      </div>
    </div>
  );
}