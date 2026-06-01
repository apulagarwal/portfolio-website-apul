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
      className="qv-link"
    >
      ↗ Build story on LinkedIn
    </a>
  );
}

export function Quiver() {
  return (
    <div style={{ maxWidth: 740, margin: "0 auto", padding: "2.5rem 2rem 4rem" }}>
      <style>{`
        .qv-link:hover { text-decoration: underline; }
      `}</style>

      <Link to="/" style={headerLinkStyle} className="qv-link">
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
        Quiver — Automated Job Search Pipeline
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
        103 TPM/PM jobs scraped in 4.1 minutes on first run. 32 with fewer than 50 applicants. Runs every morning at 7am.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginTop: "1.25rem" }}>
        <LinkedInLink />
      </div>

      <hr style={{ border: "none", borderTop: "1px solid #4b2e83", marginTop: "2rem" }} />

      {/* Section 1 */}
      <section style={{ marginTop: "3rem" }}>
        <SectionLabel>The problem</SectionLabel>
        <p style={prose}>
          Manual job searching is noisy and inconsistent. LinkedIn surfaces sponsored posts and already-filled roles alongside real opportunities. Applicant count is visible per posting but never aggregated into a single ranked view. And searches only happen when you remember to run them. I reframed the problem: instead of searching for jobs, I would build a signal pipeline that did it automatically, ranked results by competition, and left the judgment calls to me.
        </p>
      </section>

      {/* Stats SVG */}
      <div style={{ marginTop: "2.5rem" }}>
        <svg viewBox="0 0 740 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" style={{ display: "block" }} fontFamily="'Segoe UI', system-ui, sans-serif">
          <rect width="740" height="100" fill="#ffffff"/>
          <line x1="185" y1="20" x2="185" y2="80" stroke="#e5e2dc" strokeWidth="1"/>
          <line x1="370" y1="20" x2="370" y2="80" stroke="#e5e2dc" strokeWidth="1"/>
          <line x1="555" y1="20" x2="555" y2="80" stroke="#e5e2dc" strokeWidth="1"/>
          <text x="92" y="52" textAnchor="middle" fontSize="32" fontWeight="700" fill="#4b2e83" fontFamily="Georgia, serif">103</text>
          <text x="92" y="72" textAnchor="middle" fontSize="11" fill="#888888">jobs in first run</text>
          <text x="277" y="52" textAnchor="middle" fontSize="32" fontWeight="700" fill="#4b2e83" fontFamily="Georgia, serif">4.1m</text>
          <text x="277" y="72" textAnchor="middle" fontSize="11" fill="#888888">runtime</text>
          <text x="462" y="52" textAnchor="middle" fontSize="32" fontWeight="700" fill="#4b2e83" fontFamily="Georgia, serif">32</text>
          <text x="462" y="72" textAnchor="middle" fontSize="11" fill="#888888">under 50 applicants</text>
          <text x="647" y="52" textAnchor="middle" fontSize="32" fontWeight="700" fill="#4b2e83" fontFamily="Georgia, serif">22</text>
          <text x="647" y="72" textAnchor="middle" fontSize="11" fill="#888888">companies tracked</text>
        </svg>
      </div>

      {/* Section 2 */}
      <section style={sectionStyle}>
        <SectionLabel>What I built</SectionLabel>
        <p style={prose}>
          A two-phase automated pipeline. Phase 1 scrapes 22 target companies via an Apify cloud actor (which handles LinkedIn's bot detection), filters to TPM/PM titles, deduplicates against a running tracker by job ID, and outputs a ranked HTML dashboard sorted by applicant count: lowest competition first. It runs every morning at 7am via Windows Task Scheduler with no human involvement. Phase 2 runs on demand: I pick 10 to 15 high-interest roles from the dashboard, run Selenium-based Jobscan ATS scoring against each, and get a skills_gap.txt per role to use as context when tailoring my resume manually.
        </p>
        <div style={{ marginTop: "2rem" }}>
          <svg viewBox="0 0 740 280" xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" style={{ display: "block" }} fontFamily="'Segoe UI', system-ui, sans-serif">
            <rect width="740" height="280" fill="#ffffff"/>
            <text x="370" y="24" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="2" fill="#888888">TWO-PHASE PIPELINE ARCHITECTURE</text>
            <rect x="40" y="38" width="300" height="22" rx="4" fill="#f0ecfa"/>
            <text x="190" y="53" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="1" fill="#4b2e83">PHASE 1 — DAILY · AUTOMATIC · ZERO LLM DEPENDENCIES</text>
            <rect x="40" y="68" width="120" height="64" rx="8" fill="#f7f5f2" stroke="#e5e2dc" strokeWidth="1.5"/>
            <text x="100" y="92" textAnchor="middle" fontSize="11" fontWeight="700" fill="#111111">22 Companies</text>
            <text x="100" y="108" textAnchor="middle" fontSize="9" fill="#555555">LinkedIn via Apify</text>
            <text x="100" y="122" textAnchor="middle" fontSize="9" fill="#888888">Bot detection bypassed</text>
            <text x="175" y="103" textAnchor="middle" fontSize="16" fill="#4b2e83">→</text>
            <rect x="190" y="68" width="120" height="64" rx="8" fill="#f7f5f2" stroke="#e5e2dc" strokeWidth="1.5"/>
            <text x="250" y="92" textAnchor="middle" fontSize="11" fontWeight="700" fill="#111111">Filter + Dedup</text>
            <text x="250" y="108" textAnchor="middle" fontSize="9" fill="#555555">TPM/PM titles only</text>
            <text x="250" y="122" textAnchor="middle" fontSize="9" fill="#888888">By job ID, not title</text>
            <text x="325" y="103" textAnchor="middle" fontSize="16" fill="#4b2e83">→</text>
            <rect x="340" y="68" width="140" height="64" rx="8" fill="#f0ecfa" stroke="#4b2e83" strokeWidth="1.5"/>
            <text x="410" y="88" textAnchor="middle" fontSize="11" fontWeight="700" fill="#4b2e83">Ranked Dashboard</text>
            <text x="410" y="104" textAnchor="middle" fontSize="9" fill="#4b2e83">Sorted: fewest applicants first</text>
            <text x="410" y="120" textAnchor="middle" fontSize="9" fill="#4b2e83">Runs 7am daily</text>
            <rect x="500" y="78" width="130" height="44" rx="6" fill="#f7f5f2" stroke="#e5e2dc" strokeWidth="1"/>
            <text x="565" y="97" textAnchor="middle" fontSize="10" fill="#555555">Windows Task Scheduler</text>
            <text x="565" y="112" textAnchor="middle" fontSize="9" fill="#888888">7am · run-if-missed</text>
            <line x1="500" y1="100" x2="482" y2="100" stroke="#e5e2dc" strokeWidth="1" strokeDasharray="3,2"/>
            <rect x="40" y="158" width="300" height="22" rx="4" fill="#f4faf5"/>
            <text x="190" y="173" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="1" fill="#2e7d32">PHASE 2 — ON DEMAND · HUMAN PRESENT</text>
            <rect x="40" y="188" width="120" height="64" rx="8" fill="#f7f5f2" stroke="#e5e2dc" strokeWidth="1.5"/>
            <text x="100" y="210" textAnchor="middle" fontSize="11" fontWeight="700" fill="#111111">Select Roles</text>
            <text x="100" y="226" textAnchor="middle" fontSize="9" fill="#555555">10-15 from dashboard</text>
            <text x="100" y="242" textAnchor="middle" fontSize="9" fill="#888888">Under 50 applicants</text>
            <text x="175" y="223" textAnchor="middle" fontSize="16" fill="#2e7d32">→</text>
            <rect x="190" y="188" width="120" height="64" rx="8" fill="#f7f5f2" stroke="#e5e2dc" strokeWidth="1.5"/>
            <text x="250" y="210" textAnchor="middle" fontSize="11" fontWeight="700" fill="#111111">Jobscan ATS</text>
            <text x="250" y="226" textAnchor="middle" fontSize="9" fill="#555555">Selenium + visible Chrome</text>
            <text x="250" y="242" textAnchor="middle" fontSize="9" fill="#888888">skills_gap.txt per role</text>
            <text x="325" y="223" textAnchor="middle" fontSize="16" fill="#2e7d32">→</text>
            <rect x="340" y="188" width="140" height="64" rx="8" fill="#f4faf5" stroke="#c8e6c9" strokeWidth="1.5"/>
            <text x="410" y="210" textAnchor="middle" fontSize="11" fontWeight="700" fill="#2e7d32">Tailored Resume</text>
            <text x="410" y="226" textAnchor="middle" fontSize="9" fill="#2e7d32">Claude + skills_gap context</text>
            <text x="410" y="242" textAnchor="middle" fontSize="9" fill="#2e7d32">Manual · human judgment</text>
            <text x="370" y="272" textAnchor="middle" fontSize="10" fill="#888888">Phase 1 always completes. Phase 2 runs only when you are present.</text>
          </svg>
        </div>
      </section>

      {/* Section 3 */}
      <section style={sectionStyle}>
        <SectionLabel>Key engineering decisions</SectionLabel>
        <div style={{ marginTop: "1rem", borderTop: "1px solid #e5e2dc" }}>
          <Collapsible title="Phase separation by dependency risk">
            Phase 1 has zero LLM, Jobscan, or Gemini dependencies. If any external service is down or rate-limited, Phase 1 still completes and you still have your dashboard. Optional enrichment (ATS scoring, resume tailoring) lives entirely in Phase 2. The constraint was deliberate: automation must always deliver something.
          </Collapsible>
          <Collapsible title="Visible Chrome for Jobscan">
            Headless Selenium was the obvious choice. It failed immediately: Jobscan uses UW SSO for login, and UW SSO's bot detection blocks any headless session at the authentication layer. The fix was counterintuitive: run a visible Chrome window. The user opens Jobscan manually first; the script hooks into the live authenticated session. No SSO fight, no cookie engineering.
          </Collapsible>
          <Collapsible title="React textarea injection">
            Jobscan's resume input is a React controlled component. Setting element.value directly in Selenium does nothing: React intercepts DOM changes only through its own synthetic event system. The fix: JavaScript injection using React's internal value setter plus a dispatched input event with bubbles: true. Standard DOM manipulation simply does not work on React inputs.
          </Collapsible>
        </div>
      </section>

      {/* What I learned visual */}
      <div style={{ marginTop: "3rem" }}>
        <svg viewBox="0 0 740 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" style={{ display: "block" }} fontFamily="'Segoe UI', system-ui, sans-serif">
          <rect width="740" height="260" fill="#ffffff"/>
          <text x="370" y="24" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="2" fill="#888888">WHAT I LEARNED BUILDING QUIVER</text>
          <rect x="40" y="40" width="310" height="200" rx="8" fill="#fff8f8" stroke="#f0d0d0" strokeWidth="1.5"/>
          <text x="70" y="68" fontSize="10" fontWeight="700" letterSpacing="1.5" fill="#cc4444">TOOL THINKING</text>
          <circle cx="62" cy="96" r="7" fill="#f0d0d0"/><text x="62" y="100" textAnchor="middle" fontSize="10" fill="#cc4444">✕</text>
          <text x="78" y="94" fontSize="11" fontWeight="600" fill="#333333">Auto-apply 100+ jobs</text>
          <text x="78" y="110" fontSize="10" fill="#888888">Quantity kills signal</text>
          <circle cx="62" cy="136" r="7" fill="#f0d0d0"/><text x="62" y="140" textAnchor="middle" fontSize="10" fill="#cc4444">✕</text>
          <text x="78" y="134" fontSize="11" fontWeight="600" fill="#333333">One prompt, one resume</text>
          <text x="78" y="150" fontSize="10" fill="#888888">Context collapses at 20+ JDs</text>
          <circle cx="62" cy="176" r="7" fill="#f0d0d0"/><text x="62" y="180" textAnchor="middle" fontSize="10" fill="#cc4444">✕</text>
          <text x="78" y="174" fontSize="11" fontWeight="600" fill="#333333">Headless browser for Jobscan</text>
          <text x="78" y="190" fontSize="10" fill="#888888">UW SSO blocks it every time</text>
          <circle cx="62" cy="216" r="7" fill="#f0d0d0"/><text x="62" y="220" textAnchor="middle" fontSize="10" fill="#cc4444">✕</text>
          <text x="78" y="214" fontSize="11" fontWeight="600" fill="#333333">90s timeout on Apify</text>
          <text x="78" y="230" fontSize="10" fill="#888888">T2/T3 companies silently failing</text>
          <rect x="390" y="40" width="310" height="200" rx="8" fill="#f4faf5" stroke="#c8e6c9" strokeWidth="1.5"/>
          <text x="420" y="68" fontSize="10" fontWeight="700" letterSpacing="1.5" fill="#2e7d32">SYSTEM THINKING</text>
          <circle cx="412" cy="96" r="7" fill="#c8e6c9"/><text x="412" y="100" textAnchor="middle" fontSize="10" fill="#2e7d32">✓</text>
          <text x="428" y="94" fontSize="11" fontWeight="600" fill="#333333">Phase separation by dependency</text>
          <text x="428" y="110" fontSize="10" fill="#888888">Phase 1 always runs, no matter what</text>
          <circle cx="412" cy="136" r="7" fill="#c8e6c9"/><text x="412" y="140" textAnchor="middle" fontSize="10" fill="#2e7d32">✓</text>
          <text x="428" y="134" fontSize="11" fontWeight="600" fill="#333333">Sort by applicant count</text>
          <text x="428" y="150" fontSize="10" fill="#888888">Lowest competition = highest ROI</text>
          <circle cx="412" cy="176" r="7" fill="#c8e6c9"/><text x="412" y="180" textAnchor="middle" fontSize="10" fill="#2e7d32">✓</text>
          <text x="428" y="174" fontSize="11" fontWeight="600" fill="#333333">Visible Chrome session</text>
          <text x="428" y="190" fontSize="10" fill="#888888">Hook into existing auth, no SSO fight</text>
          <circle cx="412" cy="216" r="7" fill="#c8e6c9"/><text x="412" y="220" textAnchor="middle" fontSize="10" fill="#2e7d32">✓</text>
          <text x="428" y="214" fontSize="11" fontWeight="600" fill="#333333">Dedup by job ID</text>
          <text x="428" y="230" fontSize="10" fill="#888888">Same job, different title: still caught</text>
        </svg>
      </div>

      {/* Section 4 */}
      <section style={sectionStyle}>
        <SectionLabel>What I learned</SectionLabel>
        <p style={prose}>
          Three things that shaped how I think about automation. First: the bottleneck is not the AI model, it is how you structure the workflow around it. Treating AI as a chat tool for 20+ applications collapses: context drifts, outputs become inconsistent, and the effort comes right back. A system with memory and structure is a different thing entirely. Second: phase separation is the most underrated design decision in automation. Putting optional enrichment in Phase 2 meant Phase 1 never failed due to someone else's outage. Every automation should have an "always completes" core. Third: real systems hit real walls. UW SSO blocking headless Chrome, React ignoring DOM mutations, Apify timing out silently: none of these showed up in documentation. They only appeared when the system ran against the real world.
        </p>
      </section>

      {/* Footer */}
      <div style={{ marginTop: "4rem" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "#888888" }}>
          Tools: Python · Apify · Selenium · Jobscan · Gemini API · openpyxl · Windows Task Scheduler · Claude
        </p>
        <hr style={{ border: "none", borderTop: "1px solid #e5e2dc", marginTop: "1.5rem" }} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginTop: "1.25rem" }}>
          <LinkedInLink />
        </div>
      </div>
    </div>
  );
}